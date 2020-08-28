let array = [3, 5, 2, -4, 8, 11];

var addNumbers = function(array, S) {
  let answer = [];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] == S) {
        answer.push(array[i], array[j]);
      }
    }
  }
  return answer;
};

console.log(addNumbers(array, 7));
