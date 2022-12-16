Trong bài viết lần này chúng ta sẽ cùng nhau tìm hiểu một method rất tiện lợi và hữu dụng của Array trong JavaScript, đó là `reduce()`.

### How reduce() works?
Method `reduce()` sẽ thực thi một callback function (thường gọi là `reducer` function) do chúng ta cung cấp đối với mỗi item của `array`.

Cú pháp của method `reduce()`
```javascript
array.reduce(callback [, initialValue])
```

`Reducer` function sẽ nhận vào 4 tham số sau:
+ Accumulator (acc): đây là tham số được gán giá trị từ giá trị trả về của `reducer`. Nếu chúng ta cung cấp `initialValue` thì `accumulator` sẽ được gán giá trị của `initialValue`, ngược lại `accumulator` sẽ được gán giá trị của phần tử đầu tiên của mảng. Để rõ hơn chúng ta sẽ xem xét ví dụ ở phần sau nhé :D 
+ Current Value (cur): giá trị item hiện tại.
+ Current Index (idx): chỉ mục của item hiện tại.
+ Source Array (src): mảng chúng ta đang thực hiện `reduce()`.

và trả về một giá trị để gán cho `accumulator` ở item kế tiếp.

Chúng ta sẽ xem xét ví dụ tính tổng của một mảng như sau:
```javascript
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
  return accumulator + currentValue;
});
```
hoặc theo cú pháp ES6
```javascript
[0, 1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => accumulator + currentValue)
```
Để hiểu rõ hoạt động của ví dụ trên, chúng ta sẽ liệt kê từng lần gọi của reduce()


| callback | accumulator | currentValue | currentIndex | array | returnValue |
| -------- | -------- | -------- | -------- | -------- | -------- |
| first call     | 0     | 1     |  1     |  [0, 1, 2, 3, 4]     |  1     | 
| second call     | 1     | 2     |  2     |  [0, 1, 2, 3, 4]     |  3     | 
| third call     | 3    | 3     |  3     |  [0, 1, 2, 3, 4]     |  6     | 
| fourth call     | 6     | 4     |  4     |  [0, 1, 2, 3, 4]     |  10     | 


Qua cái bảng này các bạn đã hiểu rõ hơn về hoạt động của `reduce()` chưa? :D


Chúng ta sẽ tiếp tục với trường hơp có giá trị ban đầu `initialValue`
```javascript
[0, 1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => accumulator + currentValue, 1)
```


| callback | accumulator | currentValue | currentIndex | array | returnValue |
| -------- | -------- | -------- | -------- | -------- | -------- |
| first call     | 1     | 0     |  0     |  [0, 1, 2, 3, 4]     |  1     | 
| second call     | 1     | 1     |  1     |  [0, 1, 2, 3, 4]     |  2     | 
| third call     | 2    | 2     |  2     |  [0, 1, 2, 3, 4]     |  4     | 
| fourth call     | 4     | 3     |  3     |  [0, 1, 2, 3, 4]     |  7     | 
| fifth call     | 7     | 4     |  4     |  [0, 1, 2, 3, 4]     |  11     | 

Qua ví dụ trên, chúng ta thấy `reduce()` hoạt động rất đơn giản phải không nào :D

### Một số ví dụ về reduce()
Trong phần này chúng ta sẽ xem xét một số ví dụ về `reduce()` để hiểu rõ hơn về method này cũng như thấy được lợi ích mà nó mang lại khi lập trình :D

#### Đưa một mảng các mảng về một mảng duy nhất
1. Require
+ Input: [[0, 1], [2, 3], [4, 5]]
+ Output: [0, 1, 2, 3, 4, 5]
2.  Resolve
```javascript
const result = [[0, 1], [2, 3], [4, 5]].reduce((acc, curr) => acc.concat(curr), [])
console.log(result) // [0, 1, 2, 3, 4, 5]
```
####  Đếm số lượng trùng nhau của các item trong một mảng
1. Require
+ Input: ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
+ Output: { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
2.  Resolve
```javascript
const result = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'].reduce((allNames, name) => { 
  if (name in allNames) {
    allNames[name]++
  }
  else {
    allNames[name] = 1
  }
  return allNames
}, {})
console.log(result) // { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```
#### Nhóm các đối tượng trong một mảng theo thuộc tính nào đó của đối tượng
1. Require
+ Input: [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
]
+ Output: { 
   20: [
     { name: 'Max', age: 20 }, 
     { name: 'Jane', age: 20 }
   ], 
   21: [{ name: 'Alice', age: 21 }] 
 }
2.  Resolve
```javascript
const people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
]


const groupBy = (objectArray, property) => objectArray.reduce((acc, obj) => {
    const key = obj[property]
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj)
    return acc
  }, {})
}

const result = groupBy(people, 'age');

console.log(result) 
//  { 20: [ { name: 'Max', age: 20 }, { name: 'Jane', age: 20 } ], 21: [{ name: 'Alice', age: 21 }] }
```
#### Xóa các item trùng nhau của một mảng
1. Require
+ Input: [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4]
+ Output: [1,2,3,4,5]
2.  Resolve 1
```javascript
const arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4]
const result = arr.sort().reduce((accumulator, current) => {
    const length = accumulator.length
    if (length === 0 || accumulator[length - 1] !== current) {
        accumulator.push(current)
    }
    return accumulator
}, [])

console.log(result)
```
3. Resolve 3
```javascript
const arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4]
const result = arr.sort().reduce((accumulator, current) => accumulator.indexOf(current) !== -1 ? accumulator : [...accumulator, current], [])

console.log(result)
```

#### Cảm ơn các bạn đã đọc bài viết. Happy coding!