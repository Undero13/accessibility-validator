/*
 * Get backgroung from element
 */
const getStyle = (element, attr) =>
  window.getComputedStyle(element, null).getPropertyValue(attr);

/*
 * Check element is visible
 */
const checkVisible = element =>
  element.offsetWidth > 0 && element.offsetHeight > 0;

/*
 * If element don't have backgroung get this from parent
 */
const getBackground = element => {
  let res = getStyle(element, "background-color");
  while (
    !res ||
    res === "transparent" ||
    res === "#000000" ||
    res === "rgba(0, 0, 0, 0)"
  ) {
    if (element === document.body) res = "#fff";
    else res = getBackground(element.parentNode, "background-color");
  }
  return res;
};

/*
 * Return array of css style
 */
const getAllStyles = elm => {
  const styles = getComputedStyle(elm, null);

  return Array.from(styles).map(style => {
    const obj = {};
    obj[style] = styles.getPropertyValue(style);
    return obj;
  });
};

/*
 * Compare to object
 */
const obiectsAreSame = (x, y) => {
  const keyX = Object.keys(x)[0];
  const keyY = Object.keys(y)[0];

  if (keyX === keyY && x[keyX] !== y[keyY]) {
    return y;
  }
};

/*
 * Get keyframes
 */
const getAnimation = name => {
  let rule;
  const ss = document.styleSheets;

  for (let i = 0; i < ss.length; ++i) {
    for (let x = 0; x < ss[i].cssRules.length; ++x) {
      rule = ss[i].cssRules[x];

      if (rule.name === name && rule.type === CSSRule.KEYFRAMES_RULE) {
        return rule;
      }
    }
  }

  return false;
};

/*
 * Check animation gleam (no more than 3 times per 1 sec)
 */
function checkAnimation(rule, time, counter) {
  const subject = {
    opacity: 0,
    color: 0,
    background: 0
  };

  const keyframes = [...rule.cssRules];

  keyframes.forEach(frame => {
    if (frame.cssText.includes("opacity")) subject.opacity++;
    else if (frame.cssText.includes("color")) subject.color++;
    else if (frame.cssText.includes("background")) subject.background++;
  });

  if (
    time < 1 &&
    (subject.opacity > 3 || subject.color > 3 || subject.background > 3)
  ) {
    return false;
  }
  if (
    time < 1 &&
    counter > 3 &&
    (subject.opacity > 0 || subject.color > 0 || subject.background > 0)
  ) {
    return false;
  }

  return true;
}

/*
 * Get background,color and font-size and few others
 */
function getStyleFormDom(elements, interactive = false) {
  if (elements.length < 1) return;

  const properties = [];

  elements.forEach(elm => {
    const styleFont = getStyle(elm, "font-size");
    const styleColor = getStyle(elm, "color");
    const inspection = [];
    let styleBefore;
    let styleAfterFocus;

    if (interactive && checkVisible(elm)) {
      styleBefore = getAllStyles(elm);
      elm.focus();
      styleAfterFocus = getAllStyles(document.activeElement);

      styleBefore.forEach(x => {
        styleAfterFocus.forEach(y => {
          const value = obiectsAreSame(x, y);
          if (value) {
            inspection.push(value);
          }
        });
      });
    }

    properties.push({
      el: elm.outerHTML,
      textContent: elm.textContent,
      fontSize: styleFont,
      color: styleColor || "#000",
      background: getBackground(elm),
      inputLabel: !!(elm.labels && elm.labels.length > 0),
      correctFocus: !!(inspection.length > 0),
      before: styleBefore,
      after: styleAfterFocus
    });
  });
  return properties;
}

function getAnimationElement() {
  const elements = [...document.body.getElementsByTagName("*")];
  const notValidElements = [];

  elements.forEach(element => {
    const animatedStyle = getStyle(element, "animation-name");
    const animationTime = parseFloat(getStyle(element, "animation-duration"));
    const animationCount =
      getStyle(element, "animation-iteration-count") === "infinite"
        ? 999
        : parseInt(getStyle(element, "animation-iteration-count"), 10);
    const animationName = animatedStyle !== "none" ? animatedStyle : false;
    if (animationName) {
      const rule = getAnimation(animationName);
      const isValid = checkAnimation(rule, animationTime, animationCount);

      if (!isValid) {
        notValidElements.push(element);
      }
    }
  });

  return notValidElements;
}

window.getStyleFormDom = getStyleFormDom;
window.getAnimationElement = getAnimationElement;
