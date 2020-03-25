
export const AKORDA_CLASS_NAMES = {
  COMMENT_START: 'comment-start',
  COMMENT_END: 'comment-end',
  CONCEPT_START: 'lc-start',
  CONCEPT_END: 'lc-end',
  UNSELECTABLE: 'unselectable'
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
export const hasClassFrom = (element: Node, classNames: string[]) => {
  if (!isElementNode(element) || !classNames) {
    return false;
  }
  return !!classNames.find(className => (element as HTMLElement).classList.contains(className));
}

/**
 * Returns true if the provided element is a comment marker (start or end)
 * @param element
 */
export const isAkordaComment = (element: HTMLElement) => {
  const { COMMENT_START, COMMENT_END } = AKORDA_CLASS_NAMES;
  return hasClassFrom(element, [COMMENT_START, COMMENT_END]);
}

/**
 * Returns true if the provided element is a concept marker (start or end)
 * @param element
 */
export const isAkordaConcept = (element: HTMLElement) => {
  const { CONCEPT_START, CONCEPT_END } = AKORDA_CLASS_NAMES;
  return hasClassFrom(element, [CONCEPT_START, CONCEPT_END]);
}

/**
 * Returns true if the provided element is a marker (start or end) element used to demarcate a range of content
 * @param element
 */
export const isAkordaMarkerElement = (element: HTMLElement) => {
  return isAkordaComment(element) || isAkordaConcept(element);
}

/**
 * Returns true if the element (or one of its parents) has a class indicating that it is not selectable/editable.
 * @param element
 */
export const isAkordaUnselectable = (node: Node) => {
  const { UNSELECTABLE } = AKORDA_CLASS_NAMES;
  return !!($(node).closest(`.${UNSELECTABLE}`).length);
}
