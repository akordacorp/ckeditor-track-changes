Ext.data.JsonP.LITE_LITEPlugin({"tagname":"class","name":"LITE.LITEPlugin","autodetected":{},"files":[{"filename":"plugin.js","href":"plugin.html#LITE-LITEPlugin"}],"members":[{"name":"_cleanup","tagname":"method","owner":"LITE.LITEPlugin","id":"method-_cleanup","meta":{"private":true}},{"name":"_onAfterCommand","tagname":"method","owner":"LITE.LITEPlugin","id":"method-_onAfterCommand","meta":{"private":true}},{"name":"_onAfterSetData","tagname":"method","owner":"LITE.LITEPlugin","id":"method-_onAfterSetData","meta":{}},{"name":"_onBeforeGetData","tagname":"method","owner":"LITE.LITEPlugin","id":"method-_onBeforeGetData","meta":{}},{"name":"_onIceChange","tagname":"method","owner":"LITE.LITEPlugin","id":"method-_onIceChange","meta":{"private":true}},{"name":"_onModeChange","tagname":"method","owner":"LITE.LITEPlugin","id":"method-_onModeChange","meta":{"private":true}},{"name":"_onPaste","tagname":"method","owner":"LITE.LITEPlugin","id":"method-_onPaste","meta":{"private":true}},{"name":"_onReadOnly","tagname":"method","owner":"LITE.LITEPlugin","id":"method-_onReadOnly","meta":{"private":true}},{"name":"_onSelectionChanged","tagname":"method","owner":"LITE.LITEPlugin","id":"method-_onSelectionChanged","meta":{"private":true}},{"name":"_setButtonTitle","tagname":"method","owner":"LITE.LITEPlugin","id":"method-_setButtonTitle","meta":{"private":true}},{"name":"_setCommandsState","tagname":"method","owner":"LITE.LITEPlugin","id":"method-_setCommandsState","meta":{"private":true}},{"name":"_updateTrackingState","tagname":"method","owner":"LITE.LITEPlugin","id":"method-_updateTrackingState","meta":{"private":true}},{"name":"acceptAll","tagname":"method","owner":"LITE.LITEPlugin","id":"method-acceptAll","meta":{}},{"name":"countChanges","tagname":"method","owner":"LITE.LITEPlugin","id":"method-countChanges","meta":{}},{"name":"filterIceElement","tagname":"method","owner":"LITE.LITEPlugin","id":"method-filterIceElement","meta":{}},{"name":"init","tagname":"method","owner":"LITE.LITEPlugin","id":"method-init","meta":{}},{"name":"isTracking","tagname":"method","owner":"LITE.LITEPlugin","id":"method-isTracking","meta":{}},{"name":"isVisible","tagname":"method","owner":"LITE.LITEPlugin","id":"method-isVisible","meta":{}},{"name":"rejectAll","tagname":"method","owner":"LITE.LITEPlugin","id":"method-rejectAll","meta":{}},{"name":"setUserInfo","tagname":"method","owner":"LITE.LITEPlugin","id":"method-setUserInfo","meta":{}},{"name":"toggleShow","tagname":"method","owner":"LITE.LITEPlugin","id":"method-toggleShow","meta":{}},{"name":"toggleTracking","tagname":"method","owner":"LITE.LITEPlugin","id":"method-toggleTracking","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-LITE.LITEPlugin","short_doc":"The LITEPlugin is created per instance of a CKEditor. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/plugin.html#LITE-LITEPlugin' target='_blank'>plugin.js</a></div></pre><div class='doc-contents'><p>The LITEPlugin is created per instance of a CKEditor. This object handles all the events and commands associated with change tracking in a specific editor.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-_cleanup' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-_cleanup' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-_cleanup' class='name expandable'>_cleanup</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Clean up empty ICE elements ...</div><div class='long'><p>Clean up empty ICE elements</p>\n</div></div></div><div id='method-_onAfterCommand' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-_onAfterCommand' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-_onAfterCommand' class='name expandable'>_onAfterCommand</a>( <span class='pre'>event</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Called after the execution of a CKEDITOR command ...</div><div class='long'><p>Called after the execution of a CKEDITOR command</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_onAfterSetData' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-_onAfterSetData' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-_onAfterSetData' class='name expandable'>_onAfterSetData</a>( <span class='pre'>evt</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Callback for the editor's afterSetData event\nRemove tooltips from dom ...</div><div class='long'><p>Callback for the editor's afterSetData event\nRemove tooltips from dom</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>evt</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-_onBeforeGetData' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-_onBeforeGetData' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-_onBeforeGetData' class='name expandable'>_onBeforeGetData</a>( <span class='pre'>evt</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Callback for the editor's beforeGetData event\nRemove tooltips from dom ...</div><div class='long'><p>Callback for the editor's beforeGetData event\nRemove tooltips from dom</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>evt</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-_onIceChange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-_onIceChange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-_onIceChange' class='name expandable'>_onIceChange</a>( <span class='pre'>e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>called when ice fires a change event ...</div><div class='long'><p>called when ice fires a change event</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'><p>jquery event</p>\n</div></li></ul></div></div></div><div id='method-_onModeChange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-_onModeChange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-_onModeChange' class='name expandable'>_onModeChange</a>( <span class='pre'>evt</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Called after the mode of the editor (wysiwyg/source) changes ...</div><div class='long'><p>Called after the mode of the editor (wysiwyg/source) changes</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>evt</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_onPaste' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-_onPaste' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-_onPaste' class='name expandable'>_onPaste</a>( <span class='pre'>evt</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Paste the content of the clipboard through ICE ...</div><div class='long'><p>Paste the content of the clipboard through ICE</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>evt</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-_onReadOnly' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-_onReadOnly' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-_onReadOnly' class='name expandable'>_onReadOnly</a>( <span class='pre'>evt</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Called after the readonly state of the editor changes ...</div><div class='long'><p>Called after the readonly state of the editor changes</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>evt</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_onSelectionChanged' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-_onSelectionChanged' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-_onSelectionChanged' class='name expandable'>_onSelectionChanged</a>( <span class='pre'>event</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Handler for selection change events (caret moved or text marked/unmarked) ...</div><div class='long'><p>Handler for selection change events (caret moved or text marked/unmarked)</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>event</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_setButtonTitle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-_setButtonTitle' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-_setButtonTitle' class='name expandable'>_setButtonTitle</a>( <span class='pre'>button, title</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Sets the title of a button ...</div><div class='long'><p>Sets the title of a button</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>button</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>title</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-_setCommandsState' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-_setCommandsState' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-_setCommandsState' class='name expandable'>_setCommandsState</a>( <span class='pre'>commands</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Set the state of multiple commands ...</div><div class='long'><p>Set the state of multiple commands</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>commands</span> : Object<div class='sub-desc'><p>An array of command names or a comma separated string</p>\n</div></li></ul></div></div></div><div id='method-_updateTrackingState' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-_updateTrackingState' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-_updateTrackingState' class='name expandable'>_updateTrackingState</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Recalculates the tracking state according to the tracking flag, editor mode and editor readonly ...</div><div class='long'><p>Recalculates the tracking state according to the tracking flag, editor mode and editor readonly</p>\n</div></div></div><div id='method-acceptAll' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-acceptAll' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-acceptAll' class='name expandable'>acceptAll</a>( <span class='pre'>options</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Accept all tracked changes ...</div><div class='long'><p>Accept all tracked changes</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-countChanges' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-countChanges' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-countChanges' class='name expandable'>countChanges</a>( <span class='pre'>options</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Return the count of pending changes ...</div><div class='long'><p>Return the count of pending changes</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'><p>optional list of user ids whose changes we include or exclude (only one of the two should be provided,\nexclude has precdence).</p>\n</div></li></ul></div></div></div><div id='method-filterIceElement' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-filterIceElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-filterIceElement' class='name expandable'>filterIceElement</a>( <span class='pre'>e</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>For the CKEditor content filtering system, not operational yet ...</div><div class='long'><p>For the CKEditor content filtering system, not operational yet</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-init' class='name expandable'>init</a>( <span class='pre'>ed, config</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Called by CKEditor to init the plugin ...</div><div class='long'><p>Called by CKEditor to init the plugin</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>ed</span> : Object<div class='sub-desc'><p>an instance of CKEditor</p>\n</div></li><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>a configuration object, not null, ready to be used as a local copy</p>\n</div></li></ul></div></div></div><div id='method-isTracking' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-isTracking' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-isTracking' class='name expandable'>isTracking</a>( <span class='pre'></span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Are changes tracked? ...</div><div class='long'><p>Are changes tracked?</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>true if changes are tracked</p>\n</div></li></ul></div></div></div><div id='method-isVisible' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-isVisible' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-isVisible' class='name expandable'>isVisible</a>( <span class='pre'></span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Are tracked changes visible? ...</div><div class='long'><p>Are tracked changes visible?</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>true if tracked changes are visible</p>\n</div></li></ul></div></div></div><div id='method-rejectAll' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-rejectAll' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-rejectAll' class='name expandable'>rejectAll</a>( <span class='pre'>options</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Reject all tracked changes ...</div><div class='long'><p>Reject all tracked changes</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-setUserInfo' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-setUserInfo' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-setUserInfo' class='name expandable'>setUserInfo</a>( <span class='pre'>info</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Set the name &amp; id of the current user ...</div><div class='long'><p>Set the name &amp; id of the current user</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>info</span> : Object<div class='sub-desc'><p>an object with the fields name, id</p>\n</div></li></ul></div></div></div><div id='method-toggleShow' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-toggleShow' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-toggleShow' class='name expandable'>toggleShow</a>( <span class='pre'>show, bNotify</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Change the visibility of tracked changes for the change editor associated with this plugin ...</div><div class='long'><p>Change the visibility of tracked changes for the change editor associated with this plugin</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>show</span> : Object<div class='sub-desc'><p>if bool, set the visibility state to this value, otherwise toggle the state</p>\n</div></li><li><span class='pre'>bNotify</span> : Object<div class='sub-desc'><p>if not false, dispatch the TOGGLE_SHOW event</p>\n</div></li></ul></div></div></div><div id='method-toggleTracking' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.LITEPlugin'>LITE.LITEPlugin</span><br/><a href='source/plugin.html#LITE-LITEPlugin-method-toggleTracking' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.LITEPlugin-method-toggleTracking' class='name expandable'>toggleTracking</a>( <span class='pre'>track, bNotify</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Change the state of change tracking for the change editor associated with this plugin. ...</div><div class='long'><p>Change the state of change tracking for the change editor associated with this plugin.\nToggles tracking visibility in accordance with the tracking state.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>track</span> : Boolean<div class='sub-desc'><p>if undefined - toggle the state, otherwise set the tracking state to this value,</p>\n</div></li><li><span class='pre'>bNotify</span> : Boolean<div class='sub-desc'><p>if not false, dispatch the TRACKING event</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});