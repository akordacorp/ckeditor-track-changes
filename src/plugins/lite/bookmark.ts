import dom from './dom';

class Bookmark {
  env: any;
  element: any;
  selection: any;
  start: any;
  end: any;

  constructor(env: any, range: any, keepOldBookmarks?: boolean) {
    this.env = env;
    this.element = env.element;
    this.selection = this.env.selection;

    // Remove all bookmarks?
    if (!keepOldBookmarks) {
      this.removeBookmarks(this.element);
    }

    var currRange = range || this.selection.getRangeAt(0),
      range = currRange.cloneRange(),
      startContainer = range.startContainer,
      startOffset = range.startOffset,
      tmp;

    // Collapse to the end of range.
    range.collapse(false);

    var endBookmark = this.env.document.createElement('span');
    endBookmark.style.display = 'none';
    $(endBookmark)
      .html('&nbsp;')
      .addClass('iceBookmark iceBookmark_end')
      .attr('iceBookmark', 'end');
    range.insertNode(endBookmark);
    if (!dom.isChildOf(endBookmark, this.element)) {
      this.element.appendChild(endBookmark);
    }

    // Move the range to where it was before.
    range.setStart(startContainer, startOffset);
    range.collapse(true);

    // Create the start bookmark.
    var startBookmark = this.env.document.createElement('span');
    startBookmark.style.display = 'none';
    $(startBookmark)
      .addClass('iceBookmark iceBookmark_start')
      .html('&nbsp;')
      .attr('iceBookmark', 'start');
    try {
      range.insertNode(startBookmark);

      // Make sure start and end are in correct position.
      if (startBookmark.previousSibling === endBookmark) {
        // Reverse..
        tmp = startBookmark;
        startBookmark = endBookmark;
        endBookmark = tmp;
      }
    } catch (e) {
      // NS_ERROR_UNEXPECTED: I believe this is a Firefox bug.
      // It seems like if the range is collapsed and the text node is empty
      // (i.e. length = 0) then Firefox tries to split the node for no reason and fails...
      dom.insertBefore(endBookmark, startBookmark);
    }

    if (dom.isChildOf(startBookmark, this.element) === false) {
      if (this.element.firstChild) {
        dom.insertBefore(this.element.firstChild, startBookmark);
      } else {
        // Should not happen...
        this.element.appendChild(startBookmark);
      }
    }

    if (!endBookmark.previousSibling) {
      tmp = this.env.document.createTextNode('');
      dom.insertBefore(endBookmark, tmp);
    }

    // The original range object must be changed.
    if (!startBookmark.nextSibling) {
      tmp = this.env.document.createTextNode('');
      dom.insertAfter(startBookmark, tmp);
    }

    currRange.setStart(startBookmark.nextSibling, 0);
    currRange.setEnd(endBookmark.previousSibling, endBookmark.previousSibling.length || 0);

    this.start = startBookmark;
    this.end = endBookmark;
  }

  selectStartAndCollapse() {
    if (this.start) {
      var range = this.selection.getRangeAt(0);
      range.setStartBefore(this.start);
      range.collapse(true);
      $([this.start, this.end]).remove();
      try {
        this.selection.addRange(range);
      } catch (e) {
        // IE may throw exception for hidden elements..
      }
    }
  }

  remove() {
    if (this.start) {
      $([this.start, this.end]).remove();
      this.start = this.end = null;
    }
  }

  selectBookmark() {
    var range = this.selection.getRangeAt(0),
      startPos = null,
      endPos = null,
      startOffset = 0,
      endOffset = null,
      parent = this.start && this.start.parentNode;

    if (
      this.start.nextSibling === this.end ||
      dom.getElementsBetween(this.start, this.end).length === 0
    ) {
      // Bookmark is collapsed.
      if (this.end.nextSibling) {
        startPos = dom.getFirstChild(this.end.nextSibling);
      } else if (this.start.previousSibling) {
        startPos = dom.getFirstChild(this.start.previousSibling);
        if (startPos.nodeType === dom.TEXT_NODE) {
          startOffset = startPos.length;
        }
      } else {
        // Create a text node in parent.
        this.end.parentNode.appendChild(this.env.document.createTextNode(''));
        startPos = dom.getFirstChild(this.end.nextSibling);
      }
    } else {
      if (this.start.nextSibling) {
        startPos = dom.getFirstChild(this.start.nextSibling);
      } else {
        if (!this.start.previousSibling) {
          var tmp = this.env.document.createTextNode('');
          dom.insertBefore(this.start, tmp);
        }

        startPos = dom.getLastChild(this.start.previousSibling);
        startOffset = startPos.length;
      }

      if (this.end.previousSibling) {
        endPos = dom.getLastChild(this.end.previousSibling);
      } else {
        endPos = dom.getFirstChild(this.end.nextSibling || this.end);
        endOffset = 0;
      }
    }

    $([this.start, this.end]).remove();
    try {
      dom.normalize(parent);
    } catch (e) {}

    if (endPos === null) {
      if (range) {
        range.setEnd(startPos, startOffset);
        range.collapse(false);
      }
    } else {
      range.setStart(startPos, startOffset);
      if (endOffset === null) {
        endOffset = endPos.length || 0;
      }
      range.setEnd(endPos, endOffset);
    }

    try {
      this.selection.addRange(range);
    } catch (e) {
      // IE may throw exception for hidden elements..
    }
  }

  getBookmark(parent: any, type: any) {
    var elem = dom.getClass('iceBookmark_' + type, parent)[0];
    return elem;
  }

  removeBookmarks(elem: any) {
    $(elem)
      .find('span.iceBookmark')
      .remove();
  }
}
export default Bookmark;
