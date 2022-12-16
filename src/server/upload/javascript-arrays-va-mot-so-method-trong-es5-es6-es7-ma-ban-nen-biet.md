Là một lập trình viên web thì chắc hẳn bạn cũng thường xuyên phải làm việc với JS, và một trong những chủ đề thường xuyên được nhắc đến trong JS là `Array`. Có khá nhiều điều để nói về `Array` trong ES5, ES6 và ES7. Và trong bài viết này mình sẽ giới thiệu cho các bạn 14 method mới và khá thú vị của `Array` trong JS
## Quick Preparation
Trước khi bắt đầu, chúng ta cần phải tạo một vài array và lưu trữ nó trong các biến để sử dụng trong suốt bài viết này. Đầu tiên, chúng ta sẽ khởi tạo 3 array: array thứ nhất chứa các số, array thứ hai chứa các string và array cuối cùng chứa các object. 
```
// Create array of numbers.
let arrOfNumbers = [53, 14, 85, 66, 67, 108, 99, 10]

// Create array of words.
let arrOfWords = ['mathematics', 'physics', 'philosophy', 'computer science', 
'engineering', 'biology', 'nano technology']

// Create array of objects.
let arrOfObjects = [
  {
    name: 'Aristotle',
    living: false
  },
  {
    name: 'Al-Khwarizmi',
    living: false
  },
  {
    name: 'Leonardo da Vinci',
    living: false
  },
  {
    name: 'Sir Isaac Newton',
    living: false
  },
  {
    name: 'Bertrand Russell',
    living: false
  },
  {
    name: 'Herbert Simon',
    living: false
  },
  {
    name: 'John von Neumann',
    living: false
  },
  {
    name: 'Franklin Story Musgrave',
    living: true
  },
  {
    name: 'Hamlet Isakhanli',
    living: true
  }
]
```
### find()
Method `find()` sẽ lặp lại các phần tử trong mảng và thực thi các function mà bạn truyền vào như là một `callback`. Nó thực hiện function đó ngay lập tức khi tìm thấy phần tử đầu tiền làm `callback function` trả về `true`. Sau đó, câu lệnh `return` được gọi và trả về giá trị, và method `find` lúc này sẽ dừng lại. Tóm tắt lại thì `find` sẽ chỉ tìm phần tử đầu tiên thỏa mãn điều kiện thực hiện `callback function`
```
// Find the first even number and store it inside a variable.
let firstEvenNumber = arrOfNumbers.find((number) => number % 2 !== 1)

// Find the first odd number and store it inside a variable.
let firstOddNumber = arrOfNumbers.find((number) => number % 2 === 1)

// Find the first number bigger than 5 and store it inside a variable.
let firstNumberBiggerThanFiftyFive = arrOfNumbers.find((number) => number > 55)

// Find the first number smaller than 1 and store it inside a variable
let firstNumberSmallerThanOne = arrOfNumbers.find((number) => number < 1)

// Find the first living person.
let firstLivingPerson = arrOfObjects.find((person) => person.living)

// Log firstEvenNumber, firstNumberBiggerThanFiftyFive, firstNumberSmallerThanOne variables in console.
console.log(firstEvenNumber) // 14

console.log(firstOddNumber) // 53

console.log(firstNumberBiggerThanFiftyFive) // 85

console.log(firstNumberSmallerThanOne) // returns nothing

// Log first living person from the array object.
console.log(firstLivingPerson) // { living: true, name: 'Franklin Story Musgrave' }
```
### filter()
Method `filter` cho phép ta lặp xuyên suốt mảng và trả về tất cả item thỏa mãn điều kiện mà bạn cung cấp thông qua `callback function`
```
// Create an array with all even numbers from arrOfNumbers.
let evenNumbers = arrOfNumbers.filter((number) => number % 2 !== 1)

// Create an array with all odd numbers from arrOfNumbers.
let oddNumbers = arrOfNumbers.filter((number) => number % 2 === 1)

// Create an array with all living people from arrOfObjects.
let livingPeople = arrOfObjects.filter((person) => person.living)

// Create an array with all dead people from arrOfObjects.
let livingPeople = arrOfObjects.filter((person) => !person.living)

// Log results.
console.log(evenNumbers) // [14, 66, 108, 10]

console.log(oddNumbers) // [53, 85, 67, 99]

console.log(livingPeople) // { living: true, name: "Franklin Story Musgrave" }, { living: true, name: "Hamlet Isakhanli" }

console.log((deadPeople)) // { living: false, name: "Aristotle" }, { living:  false, name: "Al-Khwarizmi" }, { living: false, name: "Leonardo da Vinci" }, { living: false, name: "Sir Isaac Newton" }, { living: false, name: "Bertrand Russell" }, { living: false, name: "Herbert Simon" }, { living: false, name: "John von Neumann" }
```
### map()
Method `map` hoạt động tương tự như `filter`. Nó cũng cho phép chúng ta lặp toàn bộ phần tử trong mảng. Tuy nhiên `map` được dùng phổ biến hơn `filter` bởi lẽ nó không chỉ tìm kiếm mà còn cho phép ta làm bất cứ việc gì với các item tìm được
```
// Create an array with modulus of 4 for all numbers.
let modulus = arrOfNumbers.map(number => number % 4)

// Log the result.
console.log(modulus) // [1, 2, 1, 2, 3, 0, 3, 2]

// Create an array with all subjects to learn.
let toLearn = arrOfWords.map((word) => `I have to learn: ${word}`)

// Log the result.
console.log(toLearn) // ["I have to learn mathematics", "I have to learn physics", "I have to learn philosophy", "I have to learn computer science", "I have to learn engineering", "I have to learn biology", "I have to learn nano technology"]

// Create an array with reversed version of items in arrOfWords.
let reversedWords = arrOfWords.map((word) => word.split('').reverse().join(''))

// Log the result.
console.log(reversedWords) // ["scitamehtam", "scisyhp", "yhposolihp", "ecneics retupmoc", "gnireenigne", "ygoloib", "ygolonhcet onan"]
```
### reduce()
Method `reduce` làm việc với 2 params: `accumulator` và `currentValue`. Thực ra là 4 params nhưng 2 params còn lại chỉ là `optional` nên ta có thể bỏ qua. Nó sẽ trả về một giá trị dựa trên `reducer function` mà bạn cung cấp như là một `callback`. Params `accumulator` sẽ lưu trữ giá trị trước được trả về bởi `reducer function`, còn `currentValue` sẽ lưu giá trị của item hiện tại.
```
// Create an array with total sum of all numbers in arrOfNumbers.
let sumTotal = arrOfNumbers.reduce((accumulator, currentValue) => accumulator + currentValue)

// Log the result.
console.log(sumTotal) // 502

// Create another array but now subtract all numbers in arrOfNumbers.
let subtract = arrOfNumbers.reduce((accumulator, currentValue) => accumulator - currentValue)

// Log the result.
console.log(subtract) // -396
```
### forEach()
`forEach` hoạt động vô cùng đơn giản. Nó thực thi `callback` mà bạn cung cấp với từng phần tử trong mảng. Bản thân mình thường dùng nó kết hợp với `querySelectorAll`
```
// Get all buttons on the website.
let buttons = document.querySelectorAll('button')

// Create a simple function for handling clicks.
let handleClick = (e) => {
  e.preventDefault()

  ... do something ...

  console.log(`Button with id ${e.currentTarget.id} has been clicked.`)
}

// Add event listener to all buttons.
buttons.forEach((button) => {
  button.addEventListener('click', handleClick)
})

// Create new empty array.
let randoms = []

// Iterate over arrOfNumbers array, increase every value by adding a random number and push it to new randoms array.
arrOfNumbers.forEach((number) => {
  randoms.push(number + Math.floor(Math.random() * 10))
})

// Log the result.
console.log(randoms) // [56, 23, 93, 74, 67, 109, 101, 17] (well, maybe)
```
### some()
Hàm `some` sẽ check nếu có ít nhất một phần tử trong mảng thỏa mãn điều kiện. Vậy nếu bạn sử dụng `some` với một mảng rỗng? `some` sẽ chỉ đơn giản trả về `false`
```
// Is any number in arrOfNumbers array even?
console.log(arrOfNumbers.some((number) => number % 2 === 0)) // true

// Does the arrOfWords contains word 'mathematics'?
console.log(arrOfWords.some((word) => word === 'mathematics')) // true

// Is any person in arrOfObjects array still alive?
console.log(arrOfObjects.some((person) => person.living)) // true

// Is any person in arrOfObjects array dead?
console.log(arrOfObjects.some((person) => !person.living)) // true

// Test an empty array.
console.log([].some((item) => item % 2 === 0)) // false
```
### every()
`every` cũng hoạt động một cách tương tự với `some`. Sự khác nhau là tất cả các phần tử trong mảng đều phải thỏa mãn điều kiện trong `callback function`. Vậy với mảng rỗng thì sao? Một điều thú vị là khi bạn dùng `every` với mảng rỗng thì kết quả trả về sẽ là `true`
```
// Are all items in arrOfNumbers array numbers?
console.log(arrOfNumbers.every((number) => typeof number === 'number')) // true

// Are all items in arrOfWords array strings?
console.log(arrOfWords.every((subject) => typeof subject === 'string')) // true


// Are all items in arrOfWords array strings?
console.log(arrOfWords.every((subject) => typeof subject === 'string')) // true

// Are all items in arrOfWords array objects?
console.log(arrOfObjects.every((person) => typeof person === 'object')) // true

// Are all persons in arrOfObjects array still alive?
console.log(arrOfObjects.every((person) => person.living)) // false

// Are all persons in arrOfObjects array dead?
console.log(arrOfObjects.every((person) => !person.living)) // false

// Test an empty array.
console.log([].every((item) => item > 0)) // true
```
### includes()
`includes` giúp chúng ta kiểm tra nếu trong mảng có chứa một phần tử xác định. Và bạn hãy ghi nhớ một điều là `includes` không hoạt động với `callback function`
```
// Is one of the numbers in arrOfNumbers array 108?
console.log(arrOfNumbers.includes(108)) // true

// Is one of the subjects in arrOfWords array 'engineering'?
console.log(arrOfWords.includes('engineering')) // true
```
### Array.from()
method `from` cho phép chúng ta lấy một vài object và tạo một mảng mới từ đó. Một ví dụ đơn giản là `string maniipulating` với các kí tự và tạo một mảng mới từ kết quả. Nếu bạn nghĩ về nó thì `from` hoạt động tương tự như `split`, ngoại trừ việc `split` phổ biến hơn vì nó cho phép tách theo điều kiện xác định.

Một điều thú vị là `from` cho phép ta dùng `arrow fucntion` và thao tác với các item bên trong mảng
```
// Take the fourth item (third index) in arrOfWords and convert it into a new array.
console.log(Array.from(arrOfWords[3]) // ['c', 'o', 'm', 'p', 'u', 't', 'e', 'r', ' ', 's', 'c', 'i', 'e', 'n', 'c', 'e']

// Good old split.
console.log(arrOfWords[3].split('')) // ['c', 'o', 'm', 'p', 'u', 't', 'e', 'r', ' ', 's', 'c', 'i', 'e', 'n', 'c', 'e']

// Take all numbers in arrOfNumbers and double them.
console.log(Array.from(arrOfNumbers, number => number * 2)) // [106, 28, 170, 132, 134, 216, 198, 20]

// Convert all characters of the fourth item (3rd index) in arrOfWords to upper case.
console.log(Array.from(arrOfWords[3], (letter) => letter.toUpperCase())) // ["C", "O", "M", "P", "U", "T", "E", "R", " ", "S", "C", "I", "E", "N", "C", "E"]
```
### Array.of()
Method này cho phép chúng ta tạo các mảng từ các giá trị mà bạn chỉ định như là các `arguments` 
```
// Create a new array with '1' as the only item.
console.log(Array.of(1)) // [1]

// Create a new array with '1' as the only item.
console.log(Array.of(1)) // [1]

// Create a new array with 'alpha', 'beta', 'gama', 'delta' as its items.
console.log(Array.of('alpha', 'beta', 'gama', 'delta')) // ['alpha', 'beta', 'gama', 'delta']

// What about undefined or null?
console.log(Array.of(undefined, null)) // [undefined, null]
```
### findIndex()
Khi bạn sử dụng `findIndex` nó sẽ xảy ra 2 khả năng, tùy thuộc vào điều kiên bạn cung cấp thông qua `callback function`. Đầu tiên, nếu có bất kỳ item nào thỏa mãn điều kiện, nó sẽ trả về index của item đó trong mảng. Hãy nhớ rằng `keepIndex` chỉ trả về index của item đầu tiên thỏa mãn điều kiện. Vì thế nếu mảng của bạn có 2 hay nhiều item cùng thỏa mãn điều kiện thì nó cũng sẽ chỉ trả về item đầu tiên mà thôi. Và trong trường hợp nếu không có bất cứ item nào thỏa mãn thì `findIndex` sẽ trả về -1 
```
// Find index of the first occurrence of the number 67.
console.log(arrOfNumbers.findIndex((number) => number === 67)) // 4

// Find index of the first occurrence of the number 1024.
console.log(arrOfNumbers.findIndex((number) => number === 1024)) // -1

// Create new array with some duplicit values.
let duplicates = [97, 3, 51, 3, -85, 102, 5, 3]

// Find index of the first occurrence of the number 3.
console.log(duplicates.findIndex((number) => number === 3)) // 1
```
### fill()
`fill` cho phép chúng ta điền vào mảng các giá trị xác định, bắt đầu và kết thúc với index cụ thể. Argument đầu tiên là giá trị, tiếp theo là index bắt đầu và cuối cùng là index kết thúc. Trong trường hợp bạn bỏ trống index bắt đầu và kết thúc thì `fill` sẽ điền toàn bộ phần tử trong mảng. Còn nếu bạn chỉ điền một trong 2 thì nó sẽ lấy index đó làm giá trị bắt đầu và điền từ index đó đến cuối mảng
```
// Replace the second, third and fourth item in arrOfNumbers with 11.
console.log(arrOfNumbers.fill(11, 1, 5)) // [53, 11, 11, 11, 11, 108, 99, 10]

// Omit the starting and ending indexes.
console.log(arrOfNumbers.fill(33)) // [33, 33, 33, 33, 33, 33, 33, 33]

// Omit one of the indexes.
console.log(arrOfNumbers.fill(768, 5)) // [53, 14, 85, 66, 67, 768, 768, 768]
```
### values() 
Method `value` có hơi khác một chúc so với những method chúng ta đã đề cập đến ở trên. Nó không trả về một giá trị cụ thể nào. Thay vào đó, nó tạo một `Array Iterator` object. Nó sẽ chứa toàn bộ giá trị của mỗi index trong mảng hoặc các mảng. Nếu bạn muốn lặp các item trong object này, bạn có thể dùng `for...of`. Trong trường hợp bạn không muốn lấy tất cả giá trị một lần, bạn có thể dùng `next` kết hợp với `values`
```
// Create new Array Iterator object.
let arrIterator = arrOfWords.values()

// Iterate through arrIterator and log every value.
for (let value of arrIterator) {
  console.log(value)
}

// Result:
// 'mathematics'
// 'physics'
// 'philosophy'
// 'computer science'
// 'engineering'
// 'biology'
// 'nano technology'

// Use next() method and value
console.log(arrIterator.next().value) // 'mathematics'
console.log(arrIterator.next().value) // 'physics'
console.log(arrIterator.next().value) // 'philosophy'
```
### keys()
`keys` cũng hoạt động gần tương tự như `values`, ngoại trừ việc nó sẽ tạo một `Array Iterator` object được điền các keys. Hãy sử dụng lại ví dụ trước với `arrOfWords.values()` được thay thế bằng `arrOfWords.keys()`
```
// Create new Array Iterator object.
let arrIterator = arrOfWords.keys()

// Iterate through arrIterator and log every key.
for (let key of arrIterator) {
  console.log(key)
}

// Result:
// 0
// 1
// 2
// 3
// 4
// 5
// 6

// Use next() method and value
console.log(arrIterator.next().value) // 0
console.log(arrIterator.next().value) // 1
console.log(arrIterator.next().value) // 2
```
Trên đây là một số method với array mà bạn có thể sử dụng với JS. Hi vọng nó có thể giúp ích cho các bạn.

Bài viết được dịch từ: https://hackernoon.com/javascript-arrays-and-es5-es6-es7-methods-you-should-know-81b818bb1a2e