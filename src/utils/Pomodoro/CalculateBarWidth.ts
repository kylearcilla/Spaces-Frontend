export function calcProgressWidthInSession(
  isInSession: boolean,
  currentWidth: number,
  isLeft: boolean,
  isRight: boolean
): number {
  if (!isInSession) {
    return calcProgressWidthEmptySession(currentWidth, isLeft, isRight);
  }

  // when left and right side bars are both minimized
  if (isLeft && isRight) {
    if (currentWidth > 1000 && currentWidth <= 1130) {
      return 0.6;
    } else if (currentWidth > 650 && currentWidth <= 1000) {
      return 0.5;
    } else if (currentWidth > 530 && currentWidth <= 650) {
      return 0.3;
    } else if (currentWidth > 200 && currentWidth <= 530) {
      return 0.6;
    } else {
      return 0.5;
    }
  }

  // when left or right side is minimized
  if ((!isLeft && isRight) || (isLeft && !isRight)) {
    if (currentWidth > 1130 && currentWidth <= 1330) {
      return 0.35;
    } else if (currentWidth > 1130 && currentWidth <= 1130) {
      return 0.32;
    } else if (currentWidth > 950 && currentWidth <= 1130) {
      return 0.4;
    } else if (currentWidth > 700 && currentWidth <= 950) {
      return 0.45;
    } else if (currentWidth > 200 && currentWidth <= 700) {
      return 0.3;
    } else {
      return 0.38;
    }
  }

  // when left and right side bars aren't minimized
  if (currentWidth > 1130 && currentWidth <= 1600) {
    return 0.35;
    // session details disappears
  } else if (currentWidth >= 1045 && currentWidth < 1130) {
    return 0.45;
  } else {
    return 0.3;
  }
}

// when there is no session
export function calcProgressWidthEmptySession(
  currentWidth: number,
  isLeft: boolean,
  isRight: boolean
): number {
  // when left and right side bars are both minimized
  if (isLeft && isRight) {
    if (currentWidth > 590 && currentWidth <= 700) {
      return 0.6;
    } else if (currentWidth > 230 && currentWidth <= 590) {
      return 0.5;
    } else {
      return 0.7;
    }
  }

  // when left or right side is minimized
  if ((!isLeft && isRight) || (isLeft && !isRight)) {
    if (currentWidth > 660 && currentWidth <= 950) {
      return 0.55;
    } else if (currentWidth > 560 && currentWidth <= 660) {
      return 0.42;
    } else if (currentWidth > 300 && currentWidth <= 560) {
      return 0.6;
    } else {
      return 0.5;
    }
  }

  // when left and right side bars are both hidden
  if (currentWidth > 1180 && currentWidth <= 1600) {
    return 0.42;
  } else if (currentWidth >= 750 && currentWidth < 950) {
    return 0.55;
  } else if (currentWidth >= 622 && currentWidth < 750) {
    return 0.45;
  } else {
    return 0.4;
  }
}
