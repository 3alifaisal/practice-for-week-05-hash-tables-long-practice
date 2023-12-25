function anagrams(str1, str2) {
 let arr1 = str1.split("")
 let arr2 = str2.split("")

  
  if(arr1.length !== arr2.length){
    return false;
  }
  let set = new Set(arr1)

  for(let i = 0; i < arr2.length; i++ ) {
    if(!set.has(arr2[i])){
      return false;
    }
  }
  return true;
}


function commonElements(arr1, arr2) {

 let set = new Set(arr1);
 let commonElementsArr = [];

 for(let i = 0; i < arr2.length; i++) {
  if (set.has(arr2[i])) commonElementsArr.push(arr2[i])
 }
 return commonElementsArr;
}


function duplicate(arr) {
  // Your code here
  let arrMap = {};
  for( let i = 0 ; i <arr.length; i++) {
    let num = arr[i]
    if (arrMap.hasOwnProperty(num)) {
      return num;
    }
    arrMap[num] = 1;
  }
  return -1;
}


function twoSum(nums, target) {
 let shortOfTargetMap = {};
 for( let i = 0; i < nums.length; i++) {
  let num = nums[i];
  if(shortOfTargetMap.hasOwnProperty(num)) return true;

  shortOfTargetMap[ target -num] =1; 
 }
 return false;
}
// const mapForPatterns = function (pattern, strings) {
//   let map = {};
//   for(let i = 0; i < strings.length; i++) {
//     let currentChar = pattern[i];
//     let currentStr = strings[i];
//     map[currentChar] = currentStr;
//   }
//   return map;
// }

function wordPattern(pattern, words) {
  const patternToWord = {};
  const wordToPattern = {};

  if (pattern.length !== words.length) {
    return false; // Different lengths mean the pattern cannot match the array
  }

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    if (!patternToWord.hasOwnProperty(char) && !wordToPattern.hasOwnProperty(word)) {
      patternToWord[char] = word;
      wordToPattern[word] = char;
    } else if (patternToWord[char] !== word || wordToPattern[word] !== char) {
      return false; // Mismatch between pattern and word
    }
  }

  return true;
}


function kth(s, k) {
  // Step 1: Count character frequencies
  const charCount = {};
  for (const char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Step 2: Sort characters by frequency in descending order
  const sortedChars = Object.keys(charCount).sort((a, b) => charCount[b] - charCount[a]);

  // Step 3: Return the kth character
  return sortedChars[k - 1];
}


console.log(kth('aaabbc', 1)) // expected => 'a'
console.log(kth('aaabbc', 2)) //expected => 'b'
console.log(kth('aaabbc', 3)) //expected => 'c'
wordPattern("ABBA", ['dog', 'dog', 'dog', 'dog'])

function newAlphabet(word, alphabet) {
  
  let charIndicesInAlphabet = new Map()
  for(let i =0 ; i< word.length; i++){
    let char = word[i]
    charIndicesInAlphabet.set(char, 0)
    
  }

  for( let i = 0; i < alphabet.length; i++){
   
    let letter = alphabet[i]
    if(charIndicesInAlphabet.has(letter)){
      charIndicesInAlphabet.set(letter,i)
    }
  }
  let orderOfLetters = charIndicesInAlphabet.values();
  const arrOrderOfLetters = Array.from(orderOfLetters);
  for(let i = 0; i < arrOrderOfLetters.length; i++) {
    if(arrOrderOfLetters[i] > arrOrderOfLetters[i+1]){
      return false;
    }
  }
  return true;
}

console.log(newAlphabet('leetcod', 'labefghijkmnpqrstucvowxdyz'))










function longestPalindrome (str) {
  debugger;
  let objCountOfCHAR = {}
  for( let i =0; i< str.length; i++) {
    let char = str[i];
    if(objCountOfCHAR.hasOwnProperty(char)) {
      objCountOfCHAR[char]++;
    } else {
      objCountOfCHAR[char] = 1;
    }

  }
  let instancesOfCharValues = Object.values(objCountOfCHAR);
  let palindromeCenterLess = 0;
  let highestOdd = 0
  for(let i = 0; i < instancesOfCharValues.length; i++ ){
    let number = Number(instancesOfCharValues[i]);
    if( number % 2 === 0) {
      palindromeCenterLess += number;
    } else {
      if(highestOdd < number) {
        highestOdd = number;
      }
    }
  }
  let palindromeLength = palindromeCenterLess + highestOdd;
  return palindromeLength;
}


console.log(longestPalindrome("abccccdd,"));//  => 7 because the palindrome "dccaccd"
// can be built.

// function longestSubstr (str) {
//   let strMap = new Map();
//   let substringsLengths = [];
//   let subStringLengthStreak = 0;
//   for(let i = 0; i < str.length; i++){
//     let char =  str[i]
//     if(strMap.has(char)){
//      substringsLengths.push(subStringLengthStreak);
//      subStringLengthStreak = 1;
//      strMap.clear()
//     } else {
//       strMap.set(char,null);
//       subStringLengthStreak++;
//     }
//   }
//   let longestSubstrLength = 0;
//   for(let i = 0; i < substringsLengths.length; i++) {
//     let substringLength = substringsLengths[i];
//     if(longestSubstrLength < substringLength){
//       longestSubstrLength = substringLength;
//     }
//   }
//   return longestSubstrLength;
// }
function longestSubstr(str) {
  let charMap = new Map();
  let currentSubstringLength = 0;
  let maxLength = 0;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (charMap.has(char)) {
      currentSubstringLength = Math.min(i - charMap.get(char), currentSubstringLength + 1);
    } else {
      currentSubstringLength++;
    }

    charMap.set(char, i);
    maxLength = Math.max(maxLength, currentSubstringLength);
  }

  return maxLength;
}




console.log(longestSubstr("abcdabcdjeb")); // => 3 

function maxSubarr (arr) {
  let objSubArrs = {};
  for(let i = 0; i < arr.length; i++) {
    let value = arr[i];
    let valueSmallerByOne = arr[i] -1;
    let valueBiggerByOne = arr[i] +1;
    if(objSubArrs.hasOwnProperty(valueSmallerByOne)){
      objSubArrs[valueSmallerByOne]++;
    }
    if(objSubArrs.hasOwnProperty(valueBiggerByOne)){
      objSubArrs[valueBiggerByOne]++;
    }
    objSubArrs[value] = (objSubArrs[value] || 0) + 1;
  }
  let lengthsOfSubArrs = Object.values(objSubArrs);
  let maxLength = 0;
  for(let i =0; i < lengthsOfSubArrs.length; i++) {
    maxLength =Math.max(maxLength,lengthsOfSubArrs[i]);
  }
  return maxLength;
}






console.log(maxSubarr([1, 3, 2, 2,2, 5, 2, 3, 7]));




function coinChange(coins, target) {
  let maxCoin = Math.max(...coins);

  let minCoin = Math.min(...coins);

  let coinsSet = new Set(coins);

  let requiredCoinMap = new Map();


  if(target === 0){
    return 0;
  }


  requiredCoinMap.set(minCoin, minCoin);

  let requiredCoin = minCoin;

  for(let i = minCoin; i <= maxCoin; i++ ){
    if(coinsSet.has(i)){
      requiredCoin = i;
    }
    requiredCoinMap.set(i,requiredCoin)
  }

  


let shortOfTarget = 0;
let counter = 0;

while(shortOfTarget !== target){
  let diff = target - shortOfTarget;
  if(requiredCoinMap.has(diff)){
    shortOfTarget += requiredCoinMap.get(diff);
    counter++;
  }
  else if(target > maxCoin){
    shortOfTarget += maxCoin;
    counter++;
  }
  else{
    // no available coin combination 
    return -1;
  }
  
}

return counter;
}








const coins = [1, 5, 10, 25];
const coins2 = [5];



// console.log(coinChange(coins, 3000000003)); 




function climbingSteps(n, memo = {}) {
  if (n === 0) {
    // There is 1 way to climb zero steps.
    return 1;
  }

  if (n < 0) {
    // Invalid path, return 0.
    return 0;
  }

  if (memo[n] !== undefined) {
    // Return the memoized result if available.
    return memo[n];
  }

  // Calculate the number of ways for the current step.
  const ways = climbingSteps(n - 1, memo) +
    climbingSteps(n - 2, memo) +
    climbingSteps(n - 3, memo);

  // Memoize the result for future use.
  memo[n] = ways;

  return ways;
}

// Test cases
console.log(climbingSteps(0));  // 1
console.log(climbingSteps(1));  // 1
console.log(climbingSteps(2));  // 2
console.log(climbingSteps(3));  // 4
console.log(climbingSteps(4));  // 7
// Add more test cases as needed





module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];