import ice from './ice';
import dom from './dom';

/*
Copyright 2015 LoopIndex, This file is part of the Track Changes plugin for CKEditor.

The track changes plugin is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License, version 2, as published by the Free Software Foundation.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU Lesser General Public License along with this program as the file lgpl.txt. If not, see http://www.gnu.org/licenses/lgpl.html.

Written by (David *)Frenkiel - https://github.com/imdfl
*/
/**
 * @class LITE
 * @singleton
 * The LITE namespace
 */
const LITE = {
    /**
     * @class LITE.Events
     */
    Events: {
      /**
       * @member LITE.Events
       * @event INIT
       * string value: "lite:init"
       * @param {LITE.LITEPlugin} lite an instance of a lite object associated with a ckeditor instance
       */
      INIT: 'lite:init',
      /**
       * @member LITE.Events
       * @event ACCEPT
       * string value: "lite:accept"
       * @param {LITE.LITEPlugin} lite an instance of a lite object associated with a ckeditor instance
       * @param {Object} options filtering options
       */
      ACCEPT: 'lite:accept',
      /**
       * @member LITE.Events
       * @event REJECT
       * string value: "lite:reject"
       * @param {LITE.LITEPlugin} lite an instance of a lite object associated with a ckeditor instance
       * @param {Object} options filtering options
       */

      REJECT: 'lite:reject',
      /**
       * @member LITE.Events
       * @event SHOW_HIDE
       * string value: "lite:showHide"
       * @param {LITE.LITEPlugin} lite an instance of a lite object associated with a ckeditor instance
       * @param {Boolean} show indicates the new change tracking show status
       */
      SHOW_HIDE: 'lite:showHide',
      /**
       * @member LITE.Events
       * @event TRACKING
       * string value: "lite:tracking"
       * @param {LITE.LITEPlugin} lite an instance of a lite object associated with a ckeditor instance
       * @param {Boolean} tracking indicates the new tracking status
       */
      TRACKING: 'lite:tracking',

      /**
       * @member LITE.Events
       * @event CHANGE
       * string value: "lite:change"
       * @param {LITE.LITEPlugin} lite an instance of a lite object associated with a ckeditor instance
       */
      CHANGE: 'lite:change',

      /**
       * @member LITE.Events
       * @event HOVER_IN
       * string value: "lite:hover-in"
       * @param {LITE.LITEPlugin} lite an instance of a lite object associated with a ckeditor instance
       * @param {Object} node The DOM node hovered
       * @param {String} changeId The relevant change id
       */
      HOVER_IN: 'lite:hover-in',

      /**
       * @member LITE.Events
       * @event HOVER_OUT
       * string value: "lite:hover-out"
       * @param {LITE.LITEPlugin} lite an instance of a lite object associated with a ckeditor instance
       * @param {Object} node The DOM node hovered
       * @param {String} changeId The relevant change id
       */
      HOVER_OUT: 'lite:hover-out',
    },

    Commands: {
      TOGGLE_TRACKING: 'lite-toggletracking',
      TOGGLE_SHOW: 'lite-toggleshow',
      ACCEPT_ALL: 'lite-acceptall',
      REJECT_ALL: 'lite-rejectall',
      ACCEPT_ONE: 'lite-acceptone',
      REJECT_ONE: 'lite-rejectone',
    },
  },
  LITEConstants = {
    deleteTag: 'del',
    insertTag: 'ins',
    deleteClass: 'ice-del',
    insertClass: 'ice-ins',
    attributes: {
      changeId: 'data-id',
      userId: 'data-userid',
      userName: 'data-username',
      sessionId: 'data-session-id',
      changeData: 'data-changedata',
      time: 'data-time',
      lastTime: 'data-last-change-time',
      revertInfo: 'data-akorda-revert-info',
    },
    stylePrefix: 'ice-cts',
    preserveOnPaste: 'p',
    css: 'css/lite.css',
  },
  IS_LITE_CLASS_RE = new RegExp(
    '(?:^|s)(?:' + LITEConstants.deleteClass + '|' + LITEConstants.insertClass + ')(?:s|$)'
  ),
  _emptyRegex = /^[\s\r\n]*$/, // for getting the clean text
  _cleanRE = [
    { regex: /[\s]*title=\"[^\"]+\"/g, replace: '' },
    { regex: /[\s]*data-selected=\"[^\"]+\"/g, replace: '' },
  ],
  _pluginMap: any = [],
  cutKeystrokes = [
    CKEDITOR.CTRL + 88, // CTRL+X
    CKEDITOR.CTRL + 120,
    CKEDITOR.SHIFT + 46,
  ],
  isOldCKEDITOR = false;

function isLITENode(node: HTMLElement) {
  return node && node.className && IS_LITE_CLASS_RE.test(node.className);
}

function cleanNode(node: any) {
  var ret, i, child;
  if (node.nodeType === dom.ELEMENT_NODE) {
    var children = node.childNodes;
    for (i = 0; i < children.length; ++i) {
      child = children[i];
      cleanNode(child);
      if (isLITENode(child)) {
        while (child.firstChild) {
          node.insertBefore(child.firstChild, child);
        }
        node.removeChild(child);
      }
    }
  }
  if (isLITENode(node)) {
    ret = jQuery.makeArray(node.childNodes);
  } else {
    ret = [node];
  }
  return ret;
}

function cleanClipboard(nodes: any[]) {
  if (!nodes || !nodes.length) {
    return [];
  }
  var ret: any[] = [];
  nodes.forEach(function(node) {
    ret = ret.concat(cleanNode(node));
  });

  return ret;
}

function isCutKeystroke(code: any) {
  return cutKeystrokes.indexOf(code) >= 0;
}

function nodeToDOMNode(node: any) {
  if (node && node.$ && typeof node.getDocument === 'function') {
    return node.$;
  }
  return node;
}

function _findPluginIndex(editor: any) {
  for (var i = _pluginMap.length; i--; ) {
    var rec = _pluginMap[i];
    if (rec.editor === editor) {
      return i;
    }
  }
  return -1;
}

function _findPluginRec(editor: any) {
  var ind = _findPluginIndex(editor);
  return ind >= 0 ? _pluginMap[ind] : null;
}

function _findPlugin(editor: any) {
  var rec = _findPluginRec(editor);
  return rec && rec.plugin;
}

function addPlugin(editor: any, plugin: any) {
  _pluginMap.push({
    plugin: plugin,
    editor: editor,
  });
}

/**
 * returns true if the element matches one of the patterns
 */
function elementMatchesSelectors($el: any, patterns: any) {
  var i,
    len = patterns && patterns.length;
  if (!$el || !len) {
    return false;
  }
  for (i = 0; i < len; ++i) {
    if ($el.is(patterns[i])) {
      return true;
    }
  }
  return false;
}

/**
 * @class LITE.AcceptRejectOptions
 * A map of options for filtering changes before they're accepted/rejected.
 */

/**
 * @member LITE.AcceptRejectOptions
 * @property {Array} include
 * An array of user ids to include. Only changes made by users in the include list will be accepted/rejected
 */

/**
 * @member LITE.AcceptRejectOptions
 * @property {Array} exclude
 * An array of user ids to exclude. Changes made by users in the exclude list will be not accepted/rejected
 */

/**
 * @member LITE.AcceptRejectOptions
 * @property {Function} filter
 * a filter function of the form function({userid, time, data}):boolean . Only changes for which the function
 * returns true are accepted/rejected
 */

/**
 * @class LITE.configuration
 * The configuration object for the {@link LITE.lite} and the {@link LITE.LITEPlugin} objects
 * This object is usually created in the CKEditor configuration file. It can also be created/modified
 * in the callback for CKEditor's <strong>configLoaded</strong> event
 * <p>In the config file, create this object with code such as:
 * <pre>
 * CKEDITOR.editorConfig = function( config ) {
 * // ... your own configuration
 *		var lite = config.lite = (config.lite || {});
 * // now assign values to properties: lite.xxx = yyy;
 * </pre>
 * And here's an example for configuring lite in the <strong>configLoaded</strong> event:
 * <pre>
 * 		function onConfigLoaded(e) {
 *  		var conf = e.editor.config;
 *  		var lt = conf.lite = (conf.lite || {});
 *  		lt.isTracking = false;
 *  	}
 *  </pre>
 */

/**
 * @member LITE.configuration
 * @property {Boolean} isTracking
 * Initial tracking state of the plugin. Default: <code>true</code>
 */

/**
 * @member LITE.configuration
 * @property {Object} debug
 * set debug.log to true for LITE to print error messages in the browser console
 */

/**
 * @member LITE.configuration
 * @property {Array} includes
 * sets the javascript include files to be included in LITE instead of the default. Use only for debugging or extending the plugin
 */

/**
 * @member LITE.configuration
 * @property {Object} userStyles
 * A map of user id=>user style index
 * Normally LITE will assign a style number for each user id it encounters in the markup. If you want to maintain consistent
 * style per users (e.g. Melixon is always colored green, Thierry in chartreuse), assign a value to this property, e.g.
 * <pre>
 * 	lite.userStyles = {
 * 		15: 1,
 * 		18:2,
 * 		21:3
 * 	};
 * </pre>
 */

/**
 * @member LITE.configuration
 * @property {String} jQueryPath="js/jquery.min.js"
 * the path (relative to the LITE plugin.js file) to jQuery
 */

/**
 * @member LITE.configuration
 * @property {Boolean} contextMenu
 * If false, don't add LITE commands to CKEditor's context menu
 */

/**
 * @member LITE.configuration
 * @property {Array} ignoreSelectors
 * Array of CSS selector strings. When LITE processes insertion of html (e.g. clipboard paste or some other plugin
 * invoking CKEditor's <code>insertHtml()</code>, it will skip nodes that match any of these selectors plus
 * those that contain a non-empty value for the attribute <code>data-track-changes-ignore</code>. Note that mixing ignore
 * and unignored nodes in the same insertion is not very useful, since the insertion will be handled entirely by
 * LITE if at least one node is not ignored.
 */

/**
 * @class LITE.lite
 * The plugin object created by CKEditor. Since only one plugin is created per web page which may contain multiple instances of CKEditor, this object only handles
 * the lifecycle of {@link LITE.LITEPlugin} the real plugin object.
 *
 */
CKEDITOR.plugins.add('liter', {
  lang: ['en', 'de', 'fr', 'pt-br'],
  _scriptsLoaded: null, // not false, which means we're loading

  /**
   * Called by CKEditor to init the plugin
   * Creates an instance of a {@link LITE.LITEPlugin} if one is not already associated with the given editor.
   * @param ed an instance of CKEditor
   */
  init: function(ed: any) {
    const global: any = window;

    var rec = _findPluginRec(ed);
    if (rec) {
      // should not happen
      return;
    }

    var path = this.path,
      // @ts-ignore
      plugin: any = new LITEPlugin(path),
      liteConfig = CKEDITOR.tools.extend({}, ed.config.lite || {});

    addPlugin(ed, plugin);

    plugin.init(ed, liteConfig);

    ed.on('destroy', (editor: any) => {
      var ind = _findPluginIndex(editor);
      if (ind >= 0) {
        _pluginMap.splice(ind, 1);
      }
    });

    if (this._scriptsLoaded) {
      plugin._onScriptsLoaded();
      return;
    } else if (this._scriptsLoaded === false) {
      // still loading, initial value was null
      return;
    }

    this._scriptsLoaded = false;
    var jQueryLoaded = typeof jQuery === 'function',
      self = this,
      jQueryPath = liteConfig.jQueryPath || 'js/jquery.min.js',
      scripts: any[] = [];

    if (!jQueryLoaded) {
      scripts.splice(0, 0, this.path + jQueryPath);
    }

    var load1 = function() {
      if (scripts.length < 1) {
        self._scriptsLoaded = true;
        if (!jQueryLoaded) {
          jQuery.noConflict();
        }
        jQuery.each(_pluginMap, function(i: any, rec: any) {
          rec.plugin._onScriptsLoaded();
        });
      } else {
        var script = scripts.shift();
        CKEDITOR.scriptLoader.load(
          script,
          function() {
            load1();
          },
          self
        );
      }
    };
    load1();
  },

  /**
   * returns the plugin instance associated with an editor
   * @param {Object} editor A CKEditor instance. Each ckeditor instance has its own instance of a LITE plugin
   * @returns {LITE.LITEPlugin} A LITE plugin instance
   */
  findPlugin: function(editor: any) {
    return _findPlugin(editor);
  },

  /**
   * starts a new session in the plugin instance associated with an editor
   * @param {Object} editor a CKEditor instance, in which the associated LITE plugin will start the session
   */
  startNewSession: function(editor: any) {
    var plugin = _findPlugin(editor);
    if (plugin) {
      plugin.startNewSession();
    } else {
      // @ts-ignore
      _logError('startNewSession: plugin not found');
    }
  },
});

/**
 * @class LITE.LITEPlugin
 * The LITEPlugin is created per instance of a CKEditor. This object handles all the events and commands associated with change tracking in a specific editor.
 */
// @ts-ignore
var LITEPlugin = function(path: any) {
  // @ts-ignore
  this.path = path;
};

LITEPlugin.prototype = {
  /**
   * Called by CKEditor to init the plugin
   * @param ed an instance of CKEditor
   * @param {LITE.configuration} config a LITE configuration object, not null, ready to be used as a local copy
   */
  init: function(ed: any, config: any) {
    var lang = ed.lang.liter;
    this._editor = ed;
    this._domLoaded = false;
    this._editor = null;
    this._tracker = null;
    this._isVisible = true; // changes are visible
    this._liteCommandNames = [];
    this._canAcceptReject = true; // enable state for accept reject overriding editor readonly
    this._removeBindings = [];

    ed.ui.addToolbarGroup('lite');
    this._setPluginFeatures(ed, LITEConstants);
    this._changeTimeout = null;
    this._notifyChange = this._notifyChange.bind(this);
    this._notifyTextChange = this._notifyTextChange.bind(this);

    this._config = config;

    var allow = config.acceptRejectInReadOnly === true;
    var commandsMap = [
      {
        command: LITE.Commands.TOGGLE_TRACKING,
        exec: this._onToggleTracking,
        title: lang.TOGGLE_TRACKING,
        trackingOnly: false,
      },
      {
        command: LITE.Commands.TOGGLE_SHOW,
        exec: this._onToggleShow,
        title: lang.TOGGLE_SHOW,
        readOnly: true,
      },
      {
        command: LITE.Commands.ACCEPT_ALL,
        exec: this._onAcceptAll,
        title: lang.ACCEPT_ALL,
        readOnly: allow,
      },
      {
        command: LITE.Commands.REJECT_ALL,
        exec: this._onRejectAll,
        title: lang.REJECT_ALL,
        readOnly: allow,
      },
      {
        command: LITE.Commands.ACCEPT_ONE,
        exec: this._onAcceptOne,
        title: lang.ACCEPT_ONE,
        readOnly: allow,
      },
      {
        command: LITE.Commands.REJECT_ONE,
        exec: this._onRejectOne,
        title: lang.REJECT_ONE,
        readOnly: allow,
      },
    ];

    this._isTracking = config.isTracking !== false; // user preference for tracking state
    this._trackingState = null; // reflects the real tracking state, not just the user pref
    this._eventsBounds = false;

    ed.on(
      'contentDom',
      function(dom: any) {
        // @ts-ignore
        this._onDomLoaded(dom);
      }.bind(this)
    );
    ed.on(
      'dataReady',
      function(evt: any) {
        // @ts-ignore
        this._onAfterSetData(evt);
      }.bind(this)
    );

    var commands = config.commands || [
      LITE.Commands.TOGGLE_TRACKING,
      LITE.Commands.TOGGLE_SHOW,
      LITE.Commands.ACCEPT_ALL,
      LITE.Commands.REJECT_ALL,
      LITE.Commands.ACCEPT_ONE,
      LITE.Commands.REJECT_ONE,
    ];

    var self: any = this;

    function add1(rec: any) {
      ed.addCommand(rec.command, {
        exec: rec.exec.bind(self),
        readOnly: rec.readOnly || false,
      });

      if (rec.title && commands.indexOf(rec.command) >= 0) {
        // configuration doens't include this command
        var name = self._commandNameToUIName(rec.command);
        ed.ui.addButton(name, {
          label: rec.title,
          command: rec.command,
          //						icon : path + "icons/" + rec.icon,
          toolbar: 'lite',
        });
        if (rec.trackingOnly !== false) {
          self._liteCommandNames.push(rec.command);
        }
      }
    }

    for (var i = 0, len = commandsMap.length; i < len; ++i) {
      add1(commandsMap[i]);
    }
  },

  /**
   * Change the state of change tracking for the change editor associated with this plugin.
   * Toggles tracking visibility in accordance with the tracking state.
   * @param {Boolean} track if undefined - toggle the state, otherwise set the tracking state to this value,
   * @param {Object} options an optional object with the following fields: <ul><li>notify: boolean, if not false, dispatch the TRACKING event</li>
   * <li>force: if true, don't check for pending changes and just toggle</li></ul>
   */

  toggleTracking: function(track: any, options: any) {
    if ('boolean' === typeof options) {
      options = {
        notify: options,
      };
    }
    options = options || {};

    var tracking = undefined === track ? !this._isTracking : track,
      e = this._editor,
      lang = this._editor.lang.liter,
      force = options && options.force;
    if (!tracking && this._isTracking && !force) {
      var nChanges = this._tracker.countChanges({ verify: true });
      if (nChanges) {
        return window.alert(lang.PENDING_CHANGES);
      }
    }
    this._isTracking = tracking;
    this._setCommandsState(
      this._liteCommandNames,
      tracking ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
    );

    this._updateTrackingState();
    this.toggleShow(tracking, false);

    this._setCommandsState(
      LITE.Commands.TOGGLE_TRACKING,
      tracking ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF
    );
    var ui = e.ui.get(this._commandNameToUIName(LITE.Commands.TOGGLE_TRACKING));
    if (ui) {
      this._setButtonTitle(ui, tracking ? lang.STOP_TRACKING : lang.START_TRACKING);
    }
    if (options.notify !== false) {
      e.fire(LITE.Events.TRACKING, { tracking: tracking, lite: this });
    }
  },

  /**
   * Change the visibility of tracked changes for the change editor associated with this plugin
   * @param {Boolean} [show=undefined] if show is a boolean value, set the visibility state to this value, otherwise toggle the state
   * @param {Boolean} [bNotify=true] if not false, dispatch the TOGGLE_SHOW event
   */

  toggleShow: function(show: any, bNotify: any) {
    var vis = typeof show === 'undefined' ? !this._isVisible : show,
      lang = this._editor.lang.liter;
    this._isVisible = vis;
    if (this._isTracking) {
      this._setCommandsState(
        LITE.Commands.TOGGLE_SHOW,
        vis ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF
      );
    }
    this._tracker.setShowChanges(vis && this._isTracking);

    var ui = this._editor.ui.get(this._commandNameToUIName(LITE.Commands.TOGGLE_SHOW));
    if (ui) {
      this._setButtonTitle(ui, vis ? lang.HIDE_TRACKED : lang.SHOW_TRACKED);
    }
    if (bNotify !== false) {
      this._editor.fire(LITE.Events.SHOW_HIDE, { show: vis, lite: this });
    }
  },

  /**
   * Are tracked changes visible?
   * @returns {Boolean} true if tracked changes are visible
   */
  isVisible: function() {
    return this._isVisible;
  },

  /**
   * Are changes tracked?
   * @returns {Boolean} true if changes are tracked
   */
  isTracking: function() {
    return this._isTracking;
  },

  /**
   * Accept all tracked changes
   * @param {LITE.AcceptRejectOptions} options for matching changes to accept
   */
  acceptAll: function(options: any) {
    this._tracker.acceptAll(options);
    this._cleanup();
    this._editor.fire(LITE.Events.ACCEPT, { lite: this, options: options });
  },

  /**
   * Reject all tracked changes
   * @param {LITE.AcceptRejectOptions} options for matching changes to accept
   */
  rejectAll: function(options: any) {
    this._tracker.rejectAll(options);
    this._cleanup();
    this._editor.fire(LITE.Events.REJECT, { lite: this, options: options });
  },

  /**
   * Set the name & id of the current user
   * @param {Object} info an object with the fields `name`, `id`
   */
  setUserInfo: function(info: any) {
    info = info || {};
    this._config.userId = String(info.id);
    this._config.userName = info.name || '';
    if (this._tracker) {
      this._tracker.setCurrentUser({ id: this._config.userId, name: this._config.userName });
    }
    /*			if (this._editor) {
				var lite = this._editor.config.lite || {};
				this._editor.config.lite = lite;
			}; */
  },

  /**
   * Returns a copy of the properties of the current user: id, name
   * @returns {Object} an object with the properties <strong>id</strong> and <strong>name</strong>
   */
  getUserInfo: function() {
    return this._tracker ? this._tracker.getCurrentUser() : { name: '', id: '' };
  },

  /**
   * Return the count of pending changes
   * @param {LITE.AcceptRejectOptions} [options=null] optional filtering for the changes we want to count.
   */
  countChanges: function(options: any) {
    return (this._tracker && this._tracker.countChanges(options)) || 0;
  },

  /**
   * Creates an (ice) tracked changes element (either insert or delete)
   */
  createTrackedChangeElement: function(isInsert: boolean, childNode?: any, changeId?: any) {
    const changeType = isInsert ? 'insertType' : 'deleteType';
    const iceNode = this._tracker && this._tracker._createIceNode(changeType, childNode, changeId);
    return new CKEDITOR.dom.element(iceNode);
  },

  /**
   * Enable or disable the accept changes ui. This does not affect the availabibility of the accept/reject api
   * @param {Boolean} bEnable
   */
  enableAcceptReject: function(bEnable: any) {
    this._canAcceptReject = Boolean(bEnable);
    this._onIceChange();
  },

  /**
   * For the CKEditor content filtering system, not operational yet
   */
  filterIceElement: function(e: any) {
    if (!e) {
      return true;
    }
    try {
      if (e.hasClass(LITEConstants.insertClass) || e.hasClass(LITEConstants.deleteClass)) {
        return false;
      }
    } catch (e) {}
    return true;
  },

  /**
   * Create a new session. The change tracker unifies adjacent changes from the same user id, unless they are
   * from different sessions
   */
  startNewSession: function() {
    var now = new Date();
    this._sessionId =
      String.fromCharCode(65 + Math.round(Math.random() * 26)) +
      now.getDate() +
      now.getDay() +
      now.getHours() +
      now.getMinutes() +
      now.getMilliseconds();
    if (this._tracker) {
      this._tracker.setSessionId(this._sessionId);
    }
  },

  /**
   * returns the provided html, or the html content of the editor, without change tracking markup and without deleted changes
   * @param {String} text optional html to clean up
   * @returns {String}
   */
  getCleanMarkup: function(text: any) {
    if (null === text || undefined === text) {
      text = (this._editor && this._editor.getData()) || '';
    }
    for (var i = _cleanRE.length - 1; i >= 0; --i) {
      text = text.replace(_cleanRE[i].regex, _cleanRE[i].replace);
    }
    return text;
  },

  /**
   * Returns the text content of the editor, without deleted changes
   * @returns
   */
  getCleanText: function() {
    var doc = this._getDocument();
    if (!doc) {
      return '';
    }
    var data = this._editor.getData(),
      root = doc.createElement('DIV');
    root.innerHTML = data;
    var textFragments = [];
    textFragments.push('');
    var deleteClass = this._tracker.getDeleteClass();
    this._getCleanText(root, textFragments, deleteClass);
    var str = textFragments.join('\n');
    str = str.replace(/&nbsp(;)?/gi, ' ');
    return str;
  },

  /**
   * Accept the change associated with a DOM node
   * @param node either a DOM node or a CKEditor DOM node
   */
  acceptChange: function(node: any) {
    node = nodeToDOMNode(node);
    if (node && this._tracker) {
      this._tracker.acceptChange(node);
      this._cleanup();
      this._editor.fire(LITE.Events.ACCEPT, { lite: this });
      this._onSelectionChanged(null);
    }
  },

  /**
   * Reject the change associated with a DOM node
   * @param node either a DOM node or a CKEditor DOM node
   */
  rejectChange: function(node: any) {
    node = nodeToDOMNode(node);
    if (node && this._tracker) {
      this._tracker.rejectChange(node);
      this._cleanup();
      this._editor.fire(LITE.Events.REJECT, { lite: this });
      this._onSelectionChanged(null);
    }
  },

  /**
   * get a map of the pending changes. The keys are the change ids,
   * the values are objects with the type, time, lastTime, session id, user id, user name, data (arbitrary string associated with the change)
   * @param {LITE.AcceptRejectOptions} [options=null] filtering options for the returned changes
   */
  getChanges: function(options: any) {
    return (this._tracker && this._tracker.getChanges(options)) || {};
  },

  ////////////// Implementation ///////////////

  _getCleanText: function(e: any, textFragments: any, deleteClass: any) {
    // assumed never to be called with a text node
    var cls = e.getAttribute('class');
    if (cls && cls.indexOf(deleteClass) >= 0) {
      return;
    }

    var isBlock;
    if (
      (isBlock =
        (e.nodeName && e.nodeName.toUpperCase() === 'BR') || 'block' === jQuery(e).css('display'))
    ) {
      if (_emptyRegex.test(textFragments[textFragments.length - 1])) {
        textFragments[textFragments.length - 1] = '';
      } else {
        textFragments.push('');
      }
    }
    for (var child = e.firstChild; child; child = child.nextSibling) {
      var nodeType = child.nodeType;
      if (3 === nodeType) {
        textFragments[textFragments.length - 1] += String(child.nodeValue);
      } else if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
        this._getCleanText(child, textFragments, deleteClass);
      }
    }
    if (isBlock) {
      textFragments.push('');
    }
  },

  _onDomLoaded: function(evt: any) {
    this._domLoaded = true;
    this._editor = evt.editor;
    var ed = this._editor.editable();
    ed.attachListener(ed, 'keypress', this._onKeyPress, this, null, 1);
    this._onReady();
  },

  _onScriptsLoaded: function(/*completed, failed */) {
    this._scriptsLoaded = true;
    this._onReady();
  },

  _loadCSS: function(doc: any, options: any) {
    var head = doc.getElementsByTagName('head')[0],
      cssPath = options.cssPath,
      pathPrefix = this.path;
    function load(path: any, id: any) {
      if (!path) {
        return;
      }
      var style = jQuery(head).find('#' + id);
      if (!style.length) {
        style = doc.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('type', 'text/css');
        style.setAttribute('id', id);
        style.setAttribute('href', pathPrefix + path);
        head.appendChild(style);
      }
    }
    if (cssPath !== false) {
      load(cssPath || options.defaultCssPath, '__lite__css__');
    }
  },

  _onReady: function() {
    if (!this._scriptsLoaded || !this._domLoaded) {
      return;
    }
    // leave some time for initing, seems to help...
    setTimeout(this._afterReady.bind(this), 5);
  },

  _getBody: function() {
    try {
      return this._editor.editable().$;
    } catch (e) {
      return null;
    }
  },

  _getDocument: function() {
    return this._editor && this._editor.document && this._editor.document.$;
  },

  _afterReady: function() {
    var e = this._editor,
      doc = e.document.$,
      body = this._getBody(),
      config = this._config,
      debug = (config && config.debug) || {};

    this._loadCSS(doc, { cssPath: config.cssPath, defaultCssPath: 'css/plugin.css' });

    if (!this._eventsBounds) {
      this._eventsBounds = true;
      var paste = this._onPaste.bind(this);
      e.on('afterCommandExec', this._onAfterCommand.bind(this));
      e.on('beforeCommandExec', this._onBeforeCommand.bind(this));
      if (this._config.handlePaste) {
        e.on('paste', paste, null, null, 1);
      }
      e.on('insertHtml', paste, null, null, 1);
      e.on('insertText', paste, null, null, 1);
      e.on('insertElement', paste, null, null, 1);
      e.on('mode', this._onModeChange.bind(this), null, null, 1);
      e.on('readOnly', this._onReadOnly.bind(this));
    }

    if (this._tracker) {
      if (body !== this._tracker.getContentElement()) {
        this._tracker.stopTracking(true);
        jQuery(this._tracker).unbind();
        this._tracker = null;
      }
    }

    if (this._tracker) {
      return;
    }
    var iceprops: any = {
      editor: this._editor,
      styleColorsNumber: 1,
      element: body,
      mergeBlocks: false,
      currentUser: {
        id: config.userId || '',
        name: config.userName || '',
      },
      userStyles: config.userStyles,
      changeTypes: {
        insertType: {
          tag: LITEConstants.insertTag,
          alias: LITEConstants.insertClass,
          action: 'Inserted',
        },
        deleteType: {
          tag: LITEConstants.deleteTag,
          alias: LITEConstants.deleteClass,
          action: 'Deleted',
        },
      },
      hostMethods: {
        getHostRange: this._getHostRange.bind(this),
        getHostRangeData: this._getHostRangeData.bind(this),
        makeHostElement: function(node: any) {
          return new CKEDITOR.dom.element(node);
        },
        getHostNode: function(node: any) {
          return node && node.$;
        },
        setHostRange: this._setHostRange.bind(this),
        hostCopy: this._hostCopy.bind(this),
        beforeEdit: this._beforeEdit.bind(this) /*,
					notifyChange: this._afterEdit.bind(this)*/,
      },
    };
    if (debug.log) {
      iceprops.hostMethods.logError = _logError;
    }

    jQuery.extend(iceprops, LITEConstants);
    // @ts-ignore todo: fix once converted the ice.js to ts
    this._tracker = new ice.InlineChangeEditor(iceprops);
    try {
      this._tracker.startTracking();
      this.toggleTracking(this._isTracking, false);
      this._updateTrackingState();
      jQuery(this._tracker)
        .on('change', this._onIceChange.bind(this))
        .on('textChange', this._onIceTextChanged.bind(this));
      e.fire(LITE.Events.INIT, { lite: this });
      this._onSelectionChanged(null);
      this._onIceChange(null);
    } catch (e) {
      // @ts-ignore
      _logError('ICE plugin init:', e);
    }
  },

  _onToggleShow: function(/*event */) {
    this.toggleShow();
  },

  _onToggleTracking: function(/*event */) {
    this.toggleTracking();
  },

  _onRejectAll: function(/*event */) {
    this.rejectAll();
  },

  _onAcceptAll: function(/*event */) {
    this.acceptAll();
  },

  _onAcceptOne: function(/*event */) {
    var node = this._tracker.currentChangeNode();
    return this.acceptChange(node);
  },

  _onRejectOne: function(/*event */) {
    var node = this._tracker.currentChangeNode();
    return this.rejectChange(node);
  },

  _isInsert: function(element: any) {
    return !!element && element.getName() === 'ins';
  },

  _isDelete: function(element: any) {
    return !!element && element.getName() === 'del';
  },

  _isTrackedChange: function(element: any) {
    return this._isInsert(element) || this._isDelete(element);
  },

  _isMyTrackedChange: function(element: any) {
    let isMyTrackedChange = false;
    if (this._isTrackedChange(element)) {
      const changeUserId = element.getAttribute(this._tracker.attributes.userId);
      isMyTrackedChange = !!changeUserId && changeUserId === this._config.userId;
    }
    return isMyTrackedChange;
  },

  /**
   * Clean up empty ICE elements
   * @private
   */
  _cleanup: function() {
    const body = this._getBody();
    const empty = jQuery(body).find(ice.insertSelector + ':empty,' + ice.deleteSelector + ':empty');
    empty.remove();
    this._onSelectionChanged(null);
  },

  /**
   * Sets the title of a button
   * @private
   * @param button
   * @param title
   */
  _setButtonTitle: function(button: any, title: any) {
    var e = jQuery('#' + button._.id);
    e.attr('title', title);
  },

  /**
   * Called after the execution of a CKEDITOR command
   * @private
   * @param event
   */
  _onAfterCommand: function(event: any) {
    var name = this._tracker && this._isTracking && event.data && event.data.name;
    if ('undo' === name || 'redo' === name) {
      this._tracker.reload();
    }
  },

  _onBeforeCommand: function(event: any) {
    var name = this._tracker && this._tracker.isTracking() && event.data && event.data.name;
    if ('cut' === name) {
      if (testClipboardCommand(this._editor, 'copy')) {
        this._tracker.prepareToCut();
      }
    } else if ('copy' === name) {
      if (testClipboardCommand(this._editor, 'copy')) {
        this._tracker.prepareToCopy();
      }
    }
  },

  /**
   * Called after the mode of the editor (wysiwyg/source) changes
   * @private
   * @param ignore The event
   */
  _onModeChange: function(ignore: any) {
    this._updateTrackingState();
    setTimeout(this._onIceChange.bind(this), 0);
  },

  _onKeyPress: function(evt: any) {
    var code = evt && evt.data && evt.data.getKeystroke();
    if (isCutKeystroke(code)) {
      evt.stop();
    }
  },

  _onKeyDown: function(evt: any) {
    if (!this._tracker || !this._tracker.isTracking()) {
      return;
    }

    var code = evt.data.keyCode;
    /*
 * 				case CKEDITOR.CTRL + 86: // CTRL+V
				case CKEDITOR.SHIFT + 45: // SHIFT+INS
 */

    if (isCutKeystroke(code)) {
      if (this._tracker.tryToCut()) {
        evt.stop();
      }
    }
  },

  /**
   * Callback for the editor's afterSetData event
   * Remove tooltips from dom
   * @private
   */
  _onAfterSetData: function(/*evt*/) {
    this._processContent();
    if (this._tracker /* && this._tracker.isTracking() */) {
      this._tracker.reload();
    }
  },

  /**
   * Called after the readonly state of the editor changes
   * @private
   */
  _onReadOnly: function(/*evt*/) {
    this._updateTrackingState();
  },

  /**
   * Recalculates the tracking state according to the tracking flag, editor mode and editor readonly
   * @private
   */
  _updateTrackingState: function() {
    if (this._tracker) {
      var track = this._isTracking && this._editor.mode === 'wysiwyg' && !this._editor.readOnly;
      if (track === this._trackingState) {
        return;
      }
      this._trackingState = track;
      this._tracker.toggleChangeTracking(track);
      for (var i = this._removeBindings.length - 1; i >= 0; --i) {
        this._removeBindings[i].removeListener();
      }
      this._removeBindings = [];
      this._tracker.unlistenToEvents();
      if (track) {
        var handler = this._onSelectionChanged.bind(this),
          editable = this._editor.editable();
        if (isOldCKEDITOR) {
          this._tracker.listenToEvents();
        } else {
          this._removeBindings.push(
            this._editor.on(
              'key',
              function(e: any) {
                // @ts-ignore
                if (this._tracker) {
                  var event = e.data.domEvent && e.data.domEvent.$;
                  // onkeydown returns true to prevent, so return false it it returns true
                  // @ts-ignore
                  return event ? this._tracker.handleEvent(event) : true;
                }
                return true;
              }.bind(this),
              null,
              null,
              9
            )
          );
        }
        this._removeBindings.push(
          editable.on('keyup', this._onSelectionChanged.bind(this, null, false))
        );
        this._removeBindings.push(editable.on('click', handler));
        this._removeBindings.push(this._editor.on('selectionChange', handler));
      }
    }
  },

  /**
   * Paste the content of the clipboard through ICE
   * @private
   */
  _onPaste: function(evt: any) {
    /* Test data
     * "<ins><div>man</div><p><del><div><ins>who is this guy</ins><del>this is deleted</del></div><div><del><span>text1</span><ins><div>calling all nature</div><del>inner del</del></ins></del></div><span>going again</span><h2>the thing</h2></del></p></ins>"
     */
    if (!this._tracker || !this._isTracking || !evt) {
      return true;
    }
    var data = evt.data || {},
      toInsert = null,
      selectors = ['[data-track-changes-ignore]'].concat(this._config.ignoreSelectors || []),
      $ = window.jQuery,
      node = evt.name === 'insertElement' && data.$;
    if (!data) {
      return;
    }
    if ('string' === typeof data) {
      data = {
        dataValue: data,
        type: 'text',
      };
    }
    if (data.dataValue && 'html' === (data.type || data.mode)) {
      try {
        node = jQuery(data.dataValue);
      } catch (e) {}
    }

    if ('string' === typeof data.dataValue) {
      try {
        var doc = this._editor.document.$,
          container = doc.createElement('div');
        container.innerHTML = String(data.dataValue);
        container = this._tracker.getCleanDOM(container);
        if (!container.innerHTML) {
          return true;
        }
        toInsert = jQuery.makeArray(container.childNodes);
      } catch (e) {
        // @ts-ignore
        _logError('ice plugin paste:', e);
      }
    } else if (node) {
      toInsert = [node];
    } else {
      return true;
    }
    if (toInsert && selectors.length) {
      toInsert = toInsert.filter(function(e: any) {
        return !elementMatchesSelectors($(e), selectors);
      });
    }
    if (toInsert && toInsert.length) {
      toInsert = cleanClipboard(toInsert);
      var focused = this._editor.focusManager.hasFocus;
      this._beforeInsert();
      this._tracker.insert({ nodes: toInsert });
      this._afterInsert();
      if (focused) {
        this._editor.editable().focus();
      }
      evt.stop();
      //				this._onIceTextChanged();
    }

    return true;
  },

  /**
   * Set the state of multiple commands
   * @param commands An array of command names or a comma separated string
   * @param state CKEDITOR command state
   * @private
   */
  _setCommandsState: function(commands: any, state: any) {
    if (typeof commands === 'string') {
      commands = commands.split(',');
    }
    for (var i = commands.length - 1; i >= 0; --i) {
      var cmd = this._editor.getCommand(commands[i]);
      if (cmd) {
        cmd.setState(state);
      }
    }
  },

  /**
   * Handler for selection change events (caret moved or text marked/unmarked)
   * @param event
   * @param cleanupDOM flag passed to the tracker's isInsideChange method. Must be false to avoid cleaning up dom
   * @private
   */
  _onSelectionChanged: function(event: any, cleanupDOM: any) {
    var inChange =
        this._isTracking && this._tracker && this._tracker.isInsideChange(null, null, cleanupDOM),
      state =
        inChange && this._canAcceptReject ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
    this._setCommandsState([LITE.Commands.ACCEPT_ONE, LITE.Commands.REJECT_ONE], state);
  },

  /**
   * called when ice fires a change event
   * @param e jquery event
   * @private
   */
  _onIceChange: function(e: any) {
    var hasChanges = this._isTracking && this._tracker && this._tracker.hasChanges();
    var state =
      hasChanges && this._canAcceptReject ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
    this._setCommandsState([LITE.Commands.ACCEPT_ALL, LITE.Commands.REJECT_ALL], state);
    this._onSelectionChanged();
    if (e) {
      //otherwise it's just a ui update
      this._triggerChange();
    }
  },

  /**
   * @ignore
   * @param ignore event
   */
  _onIceTextChanged: function(ignore: any) {
    this._editor.fire('change');
    this._editor.fire('saveSnapshot');
  },

  /**
   * @ignore
   */
  _triggerChange: function() {
    if (!this._changeTimeout) {
      this._changeTimeout = setTimeout(this._notifyChange, 1);
    }
  },

  /**
   * @ignore
   */
  _notifyChange: function() {
    this._changeTimeout = null;
    this._editor.fire(LITE.Events.CHANGE, { lite: this });
  },

  /**
   * @ignore
   */
  _notifyTextChange: function() {
    this._changeTimeout = null;
    this._editor.fire('change', { lite: this });
  },

  /**
   * @ignore
   */
  _processContent: function() {
    var body = this._getBody(),
      //				$ = window.jQuery,
      $body = $(body),
      insTag = LITEConstants.insertTag,
      delTag = LITEConstants.deleteTag,
      nodes,
      doc: any;
    if (!body) {
      return;
    }
    doc = body.ownerDocument;
    function replaceNode(node: any, tag: any) {
      var parent = node.parentNode,
        newNode = doc.createElement(tag);
      $.each(node.attributes, function(index, attr) {
        newNode.setAttribute(attr.name, attr.value);
      });
      newNode.className = node.className || '';
      $(node)
        .contents()
        .appendTo(newNode);
      parent.insertBefore(newNode, node);
      parent.removeChild(node);
    }

    if (insTag !== 'span') {
      nodes = $(body).find('span.' + LITEConstants.insertClass);
      nodes.each(function(i, node) {
        replaceNode(node, insTag);
      });
    }
    if (delTag !== 'span') {
      nodes = $body.find('span.' + LITEConstants.deleteClass);
      nodes.each(function(i, node) {
        replaceNode(node, delTag);
      });
    }
  },

  /**
   * @ignore
   * @param command
   * @returns
   */
  _commandNameToUIName: function(command: any) {
    return command.replace('.', '_');
  },

  /**
   * @ignore
   * @param editor
   * @param props
   */
  _setPluginFeatures: function(editor: any, props: any) {
    function makeClasses() {
      return [props.deleteClass, props.insertClass, props.stylePrefix + '*'];
    }

    function makeAttributes() {
      var attrs = ['title'];
      for (var key in props.attributes) {
        if (props.attributes.hasOwnProperty(key)) {
          var value = props.attributes[key];
          if (typeof value === 'string' && value.indexOf('data-') === 0) {
            attrs.push(value);
          }
        }
      }
      return attrs;
    }

    function makeFeature(arr: any) {
      var ret: any = {};
      arr.forEach(function(member: any) {
        ret[member] = true;
      });
      return ret;
    }

    if (!editor || !editor.filter || !editor.filter.addFeature) {
      return;
    }

    try {
      var feature: any, fields: any;

      feature = {};
      fields = {};
      fields.classes = makeFeature(makeClasses());
      fields.attributes = makeFeature(makeAttributes());
      feature[props.insertTag] = fields;
      feature[props.deleteTag] = CKEDITOR.tools.clone(fields);

      feature['br'] = CKEDITOR.tools.clone(fields);
      feature['br'].propertiesOnly = true;

      // prepare to clean up legacy data
      feature.span = CKEDITOR.tools.clone(fields);

      editor.filter.addFeature({
        name: 'lite-features',
        allowedContent: feature,
      });
    } catch (e) {
      // @ts-ignore
      _logError(e);
    }
  },

  /**
   * @ignore
   * @param range
   */
  _setHostRange: function(range: any) {
    var selection = this._editor && this._editor.getSelection();
    if (selection) {
      selection.selectRanges([range]);
    }
  },

  _beforeEdit: function() {
    CKEDITOR.iscutting = true;
    var e = this._editor,
      f = function() {
        e.fire('saveSnapshot');
      };
    f(); // Save before cut
    setTimeout(function() {
      CKEDITOR.iscutting = false;
    }, 100);
    //			setTimeout(f, 30);
  },

  _hostCopy: function() {
    try {
      if (CKEDITOR.env.ie) {
        testIECommand(this._editor, 'copy');
      } else {
        // Other browsers throw an error if the command is disabled.
        this._editor.document.$.execCommand('copy', false, null);
      }
    } catch (e) {
      // @ts-ignore
      _logError(e);
    }
  },

  /**
   * @ignore
   * @returns {Boolean}
   */
  _getHostRange: function() {
    var selection = this._editor && this._editor.getSelection(),
      ranges = selection && selection.getRanges(),
      range = ranges && ranges[0];
    return range || null;
  },

  _getHostRangeData: function(hostRange: any) {
    hostRange = hostRange || this._getHostRange();
    if (!hostRange) {
      return null;
    }
    return {
      startContainer: hostRange.startContainer && hostRange.startContainer.$,
      endContainer: hostRange.endContainer && hostRange.endContainer.$,
      startOffset: hostRange.startOffset,
      endOffset: hostRange.endOffset,
    };
  },

  /**
   * Copied from ckeditor
   * @ignore
   */
  _beforeInsert: function() {
    this._editor.fire('saveSnapshot');
  },

  /**
   * Copied from ckeditor
   * @ignore
   */
  _afterInsert: function() {
    var editor = this._editor;
    editor.getSelection().scrollIntoView();
  },
};

/**
 * @ignore
 */
function _logError() {
  var console = window.console;
  if (console && console.error) {
    // @ts-ignore
    console.error.apply(console, [].slice.call(arguments));
  }
}

function testClipboardCommand(editor: any, command: any) {
  if (CKEDITOR.env.ie) {
    return testIECommand(editor, command);
  }

  // non-IEs part
  try {
    // Other browsers throw an error if the command is disabled.
    return editor.document.$.execCommand(command, false, null);
  } catch (e) {
    return false;
  }
}

/**
 * Tries to execute any of the paste, cut or copy commands in IE. Returns a
 * boolean indicating that the operation succeeded.
 * Copied from ckeditor
 * @param editor instance of CKEditor
 * @param {String} command *LOWER CASED* name of command ('paste', 'cut', 'copy').
 * */
function testIECommand(editor: any, command: any) {
  var doc = editor.document,
    body = doc.getBody(),
    enabled = false,
    success,
    onExec = function() {
      enabled = true;
    };

  // The following seems to be the only reliable way to detect that
  // clipboard commands are enabled in IE. It will fire the
  // onpaste/oncut/oncopy events only if the security settings allowed
  // the command to execute.
  body.on(command, onExec);

  // IE7: document.execCommand has problem to paste into positioned element.
  success = (CKEDITOR.env.version > 7 ? doc.$ : doc.$.selection.createRange())['execCommand'](
    command,
    false
  );

  body.removeListener(command, onExec);

  return success || enabled;
}

export {};
