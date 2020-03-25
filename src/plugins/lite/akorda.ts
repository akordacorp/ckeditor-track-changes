
export const AKORDA_CLASS_NAMES = {
  COMMENT_START: 'comment-start',
  COMMENT_END: 'comment-end'
}

export const hasClassFrom = (element: any, classNames: string[]) => {
  if (!element || !classNames) {
    return false;
  }
  return !!classNames.find(className => element.classList.contains(className));
}

export const isAkordaComment = (element: HTMLElement) => {
  const { COMMENT_START, COMMENT_END } = AKORDA_CLASS_NAMES;
  return hasClassFrom(element, [COMMENT_START, COMMENT_END]);
}