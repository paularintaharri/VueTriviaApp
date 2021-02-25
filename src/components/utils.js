const isArray = array => {
  if (!array || !Array.isArray(array)) {
    return false;
  }
  return true;
};

const randomNumber = (max) => Math.floor(Math.random() * max);

const switchRandomArrayObjects = (array, firstIndex, secondIndex = randomNumber(firstIndex)) => {
  const temporaryValue = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temporaryValue;
};

export const shuffle = (array) => {
  if (!isArray(array)) {
    console.log("Can't shuffle, not an array!");
    return array;
  }
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    currentIndex -= 1;
    switchRandomArrayObjects(array, currentIndex);
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

const parseArray = array => array.map(item => parseString(item));

const parseString = (string) => string; // replace &#039; &ldquo; &quot;

export const parseApiQuestionObj = (questionObj) => ({
  category: parseString(questionObj.category),
  correct_answer: parseString(questionObj.correct_answer),
  difficulty: parseString(questionObj.difficulty),
  incorrect_answers: parseArray(questionObj.incorrect_answers),
  question: parseString(questionObj.question),
  type: parseString(questionObj.type),
});
