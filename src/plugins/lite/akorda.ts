
export const AKORDA_CLASS_NAMES = {
  COMMENT_START: 'comment-start',
  COMMENT_END: 'comment-end',
  COMMENT_MARKER: 'comment-marker',
  MARKER_IMAGE: 'marker-image',
  MARKER_COMMENT: 'marker-comment',
  CONCEPT_START: 'lc-start',
  CONCEPT_END: 'lc-end',
  UNSELECTABLE: 'unselectable',
  ACCEPTED: 'accepted',
  REMOVED: 'removed'
}

/**
 * Returns true if the provided node is an element
 * @param node
 */
export const isElementNode = (node: Node): boolean => {
  return !!node && node.nodeType === Node.ELEMENT_NODE;
}

/**
 * Returns true if the provided element has a class from any of the provided class names
 * @param element
 * @param classNames An array of class names to test against
 */
export const hasClassFrom = (element: Node, classNames: string[]): boolean => {
  if (!isElementNode(element) || !classNames) {
    return false;
  }
  return !!classNames.find(className => (element as HTMLElement).classList.contains(className));
}

/**
 * Returns true if the provided element is a comment marker (start or end)
 * @param element
 */
export const isAkordaCommentMarker = (element: HTMLElement): boolean => {
  const { COMMENT_START, COMMENT_END, COMMENT_MARKER, MARKER_IMAGE } = AKORDA_CLASS_NAMES;
  return hasClassFrom(element, [COMMENT_MARKER, MARKER_IMAGE, COMMENT_START, COMMENT_END]);
}

/**
 * Returns true if the provided element is the start marker for a comment
 * @param element
 */
export const isAkordaCommentStartMarker = (element: HTMLElement): boolean => {
  return hasClassFrom(element, [AKORDA_CLASS_NAMES.COMMENT_START]);
}

/**
 * Returns true if the provided element is the end marker for a comment
 * @param element
 */
export const isAkordaCommentEndMarker = (element: HTMLElement): boolean => {
  return hasClassFrom(element, [AKORDA_CLASS_NAMES.COMMENT_END]);
}

/**
 * Returns true if the element contains commented content
 * @param element
 */
export const isAkordaComment = (node: Node): boolean => {
  return hasClassFrom(node, [AKORDA_CLASS_NAMES.MARKER_COMMENT]);
}

export const isAkordaCommentIcon = (node: Node): boolean => {
  return hasClassFrom(node, [AKORDA_CLASS_NAMES.MARKER_IMAGE]);
}

/**
 * Returns true if the provided element is a concept marker (start or end)
 * @param element
 */
export const isAkordaConceptMarker = (element: HTMLElement): boolean => {
  const { CONCEPT_START, CONCEPT_END } = AKORDA_CLASS_NAMES;
  return hasClassFrom(element, [CONCEPT_START, CONCEPT_END]);
}

/**
 * Returns true if the provided element is a marker/boundary (start or end) element used to demarcate a range of content
 * @param element
 * TODO: Determine if accepted/removed is really a marker/boundary element class name
 */
export const isAkordaMarkerElement = (element: HTMLElement): boolean => {
  const { ACCEPTED, REMOVED } = AKORDA_CLASS_NAMES;
  return isAkordaCommentMarker(element) || isAkordaConceptMarker(element) || hasClassFrom(element, [ACCEPTED, REMOVED]);
}

/**
 * Returns true if the element (or one of its parents) has a class indicating that it is not selectable/editable.
 * @param element
 */
export const isAkordaUnselectable = (node: Node): boolean => {
  const { UNSELECTABLE } = AKORDA_CLASS_NAMES;
  return !!($(node).closest(`.${UNSELECTABLE}`).length);
}

/**
 * Returns true if the first child element of the provided node is a comment
 * @param element
 */
export const isFirstElementAComment = (element: HTMLElement): boolean => {
  return !!element && !!element.firstElementChild && isAkordaComment(element.firstElementChild);
}

/**
 * Copies important comment attribute info from one element to another
 * @param element
 * @param newElement
 */
export const copyCommentData = (element: HTMLElement, newElement: HTMLElement) => {
  if (!!element && !!newElement && !!newElement.classList) {
    newElement.classList.add("marker-comment");
    newElement.setAttribute("data-c-id", element.getAttribute("data-c-id") || "s" + element.getAttribute("data-w-id"));
  }
}

/**
 * Moves a comment start marker before the provided second element
 * @param commentStartMarker
 * @param beforeElement
 */
export const insertCommentStartBefore = (commentStartMarker: HTMLElement, beforeElement: HTMLElement): void => {
  const commentStart = commentStartMarker.cloneNode(true) as HTMLElement;
  copyCommentData(commentStart, beforeElement);
  beforeElement.insertAdjacentElement("beforebegin", commentStart);
  const commentStartParent = commentStartMarker.parentNode;
  if (commentStartParent) {
    commentStartParent.removeChild(commentStartMarker);
  }
}

/**
 * Moves a comment end marker (and a comment icon element, if relevant) after the provided second element
 * @param commentEndMarker
 * @param afterElement
 */
export const insertCommentEndAfter = (commentEndMarker: HTMLElement, afterElement: HTMLElement ): void => {
  const commentEnd = commentEndMarker.cloneNode(true) as HTMLElement;
  copyCommentData(commentEnd, afterElement);
  afterElement.insertAdjacentElement('afterend', commentEnd);
  const commentEndParent = commentEndMarker.parentNode;
  if (commentEndParent) {
    commentEndParent.removeChild(commentEndMarker);
    const lastChild = commentEndParent.lastElementChild;
    if (!!lastChild && isAkordaCommentIcon(lastChild)) {
      const commentIcon = lastChild.cloneNode(true) as HTMLElement;
      afterElement.insertAdjacentElement('afterend', commentIcon);
      commentEndParent.removeChild(lastChild);
    }
  }
}

export const isBookmarkStart = (node: Node): boolean => {
  return isElementNode(node) && (node as HTMLElement).classList.contains('iceBookmark_start');
}

export const getBookmarkStart = (element: HTMLElement) => {
  return element.querySelector(".iceBookmark_start");
}

export const getBookmarkEnd = (element: HTMLElement) => {
  return element.querySelector(".iceBookmark_end");
}

export const getCommentStart = (documentElement: HTMLElement, element: HTMLElement) => {
  const dataCid = element.getAttribute("data-c-id");
  if (!documentElement || !element || !dataCid) {
    return null;
  }
  return documentElement.querySelector(`.comment-start[data-w-id="${dataCid.slice(1)}"]`);
}

export const getCommentEnd = (documentElement: HTMLElement, element: HTMLElement) => {
  const dataCid = element.getAttribute("data-c-id");
  if (!documentElement || !element || !dataCid) {
    return null;
  }
  return documentElement.querySelector(`.comment-end[data-w-id="${dataCid.slice(1)}"]`);
}
