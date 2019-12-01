/**
   * Check animation gleam (no more than 3 times per 1 sec) - nightmareLib
   */
function checkAnimation({ animate }: {animate: Array<string>}): Array<RaportModel> {
  const checkerResult: Array<RaportModel> = [];

  if (animate[0] === 'blocker') {
    checkerResult.push({
      what: 'animacja',
      category: 'animation',
      type: 'error',
      code: 'A1',
      message: '',
    });
  } else if (animate.length > 0) {
    animate.forEach((element) => checkerResult.push({
      what: 'animacja',
      category: 'animation',
      type: 'error',
      code: 'A2',
      message: `${element}`,
    }));
  }

  return checkerResult;
}

export default checkAnimation;
