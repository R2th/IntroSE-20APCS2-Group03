/* eslint-disable */

/**
 * returns x, y coordinates for absolute positioning of a span within a given text input
 * at a given selection point
 * @param {object} input - the input element to obtain coordinates for
 * @param {number} selectionPoint - the selection point for the input
 */
export const getCursorXY = (input, selectionPoint) => {
  const {
    offsetLeft: inputX,
    offsetTop: inputY,
  } = input;
    // create a dummy element that will be a clone of our input
  const div = document.createElement('div');
  // get the computed style of the input and clone it onto the dummy element
  const copyStyle = getComputedStyle(input);
    for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop];
  }
  // we need a character that will replace whitespace when filling our dummy element
  // if it's a single line <input/>
  const swap = '.';
  const inputValue = input.tagName === 'INPUT' ? input.value.replace(/ /g, swap) : input.value;
  // set the div content to that of the textarea up until selection
  const textContent = inputValue.substr(0, selectionPoint);
  // set the text content of the dummy element div
  div.textContent = textContent;
  if (input.tagName === 'TEXTAREA') div.style.height = 'auto';
  // if a single line input then the div needs to be single line and not break out like a text area
  if (input.tagName === 'INPUT') div.style.width = 'auto';
  // create a marker element to obtain caret position
  const span = document.createElement('span');
  // give the span the textContent of remaining content so
  // that the recreated dummy element is as close as possible
  span.textContent = inputValue.substr(selectionPoint) || '.';
  // append the span marker to the div
  div.appendChild(span);
  // append the dummy element to the body
  document.body.appendChild(div);
  // get the marker position, this is the caret position top and left relative to the input
  const { offsetLeft: spanX, offsetTop: spanY } = span;
  // lastly, remove that dummy element
  // NOTE:: can comment this out for debugging purposes
  // if you want to see where that span is rendered
  document.body.removeChild(div);
  // return an object with the x and y of the caret.
  // account for input positioning so that you don't need to wrap the input
  return {
    x: inputX + spanX,
    y: inputY + spanY,
  };
};

/**
 * shows a position marker that highlights where the cursor is
 * @param {object} e - the input or click event that has been fired
 */
export const showPositionMarker = (e) => {
  // grab the input element
  const { currentTarget: input } = e;
  // create a function that will handle clicking off of the input and hide the marker
  const processClick = (evt) => {
    if (e !== evt && evt.target !== e.target) {
      toggleMarker();
    }
  };
  // create a function that will toggle the showing of the marker
  const toggleMarker = () => {
    input.__IS_SHOWING_MARKER = !input.__IS_SHOWING_MARKER;

    if (input.__IS_SHOWING_MARKER && !input.__MARKER) {
      // assign a created marker to input
      input.__MARKER = createMarker('Here I am! 😜', 'position');
      // append it to the body
      document.body.appendChild(input.__MARKER);
      document.addEventListener('click', processClick);
    } else {
      document.body.removeChild(input.__MARKER);
      document.removeEventListener('click', processClick);
      input.__MARKER = null;
    }
  };
  // if the marker isn't showing, show it
  if (!input.__IS_SHOWING_MARKER) toggleMarker();
  // if the marker is showing, update its position
  if (input.__IS_SHOWING_MARKER) {
    // grab the properties from the input that we are interested in
    const {
      offsetLeft,
      offsetTop,
      offsetHeight,
      offsetWidth,
      scrollLeft,
      scrollTop,
      selectionEnd,
    } = input;
    // get style property values that we are interested in
    const { lineHeight, paddingRight } = getComputedStyle(input);
    // get the cursor X and Y from our helper function
    const { x, y } = getCursorXY(input, selectionEnd);
    // set the marker positioning
    // for the left positioning we ensure that the maximum left position is the width of the input minus the right padding using Math.min
    // we also account for current scroll position of the input
    const newLeft = Math.min(
      x - scrollLeft,
      (offsetLeft + offsetWidth) - parseInt(paddingRight, 10),
    );
    // for the top positioning we ensure that the maximum top position is the height of the input minus line height
    // we also account for current scroll position of the input
    const newTop = Math.min(
      y - scrollTop,
      (offsetTop + offsetHeight) - parseInt(lineHeight, 10),
    );
    input.__MARKER.setAttribute('style', `left: ${newLeft}px; top: ${newTop}px`);
  }
};
