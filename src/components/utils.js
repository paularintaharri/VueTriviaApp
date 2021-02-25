const isArray = array => {
  if (!array || !Array.isArray(array)) {
    return false;
  }
  return true;
};

export const shuffle = (array) => {
  if (!isArray(array)) {
    console.log("Can't shuffle, not an array!");
    return array;
  }
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  let currentIndex = array.length;
  let randomIndex, temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const addOrReplaceAnswerInArray = (array, answerObj) => {
  if (!isArray(array) || !answerObj || !answerObj.question) {
    return false;
  }
  const answerIndex = array.findIndex(({ question }) => question === answerObj.question);
  answerIndex === -1
    ? array.push(answerObj)
    : array.splice(answerIndex, 1, answerObj);
  return true;
};
