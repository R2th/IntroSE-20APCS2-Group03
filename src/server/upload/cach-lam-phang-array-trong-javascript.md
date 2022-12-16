> Hello mọi người, bài viết lần này mình xin chia sẻ chút kiến thức về cách làm phẳng `array` trong `javascript`. Hy vọng sẽ giúp được gì đó cho những ai đang cần tìm hiểu. Mình bắt đầu nhé.
-----

Giả sử mình có `data` trả về như sau:
```js
const array = [
  { id: 1, name: "Trần" },
  { id: 2, name: "Nữ" },
  [
    { id: 3, name: "Như" },
    [
      { id: 4, name: "Quỳnh" },
    ]
  ]
]
```
Và yêu cầu bây giờ là muốn nhận được kết quả như dưới:
```js
const array = [
  { id: 1, name: "Trần" },
  { id: 2, name: "Nữ" },
  { id: 3, name: "Như" },
  { id: 4, name: "Quỳnh" },
]
```

Vậy giờ mình sẽ phải làm như thế nào ?
Câu trả lời là hãy đọc hết bài viết này xem có những cách xử lý nào hay ho không nhé.

###  1. Sử dụng flat() ES6
`Flat() `sẽ trả về một `array` mới với các phần tử của mảng con nằm trong nó.

**Cú pháp:**
```js
var newArray = arr.flat([depth]) // depth: mức độ mà bạn muốn làm phẳng và mặc định của phương thức này là 1
```

VD1: 
```js
const newArray = array.flat()
```
Kết quả trả về:
![](https://images.viblo.asia/014fde05-41e8-4dea-a6b3-31cf06d53b98.png)


Như vậy vẫn chưa thể đáp ứng được yêu cầu đầu bài viết của mình. Vì `array` gốc của chúng ta có 2 mảng con, vậy hãy thử đổi 1 chút như dưới xem nhé:

VD2:
```js
const newArray = array.flat(2)
```
![](https://images.viblo.asia/486d1a56-8fc7-470f-b603-0a9a41f4d641.png)

Okay, thế là đã đúng như mình mong muốn, nhưng với những `data` chưa biết chắc có bao nhiêu mảng con bên trong như `array` trên thì thật khó để xử lý đúng không nào? Đừng lo vì `ES6` cũng đã cung cấp cho chúng ta một tham số đó là `Infinity` (không dưới hạn):

VD3:
```js
const newArray = array.flat(Infinity) // kết qủa sẽ trả về tương tự như ví dụ thứ 2 nhé
```

### 2. Sử dụng thuật toán đệ quy
Nhắc đến thuật toán đệ quy là bản thân mình lại nhớ về những ngày đầu nhập môn tin học của năm 1 đại học, chắc hẳn những bạn nào học ngành `CNTT` thì không còn xa lạ gì đúng không nào. Cùng mình ôn lại chút qua `demo` bên dưới nhé:

```js
const result = []

const getFlatten = (arr) => {
  arr.forEach(data => {
    if (Array.isArray(data)) {
      getFlatten(data)
    } else {
      result.push(data)
    }
  })
  return result
}

console.log(getFlatten(array))
```
Kết quả trả về:
![](https://images.viblo.asia/3f877b45-f6e7-42c1-90cf-0769a3a9fd49.png)

Không quá khó đúng không nào. Chúng ta cùng đi tiếp cách khác xem như nào nhé.
### 3. Sử dụng reduce javascript
`Reduce` có thế làm được rất nhiều điều, các bạn có thể tìm hiểu tại [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) này. Trong phạm vi bài viết này thì mình xin chia sẻ về cách làm phẳng `array` của `reduce` thôi nhé.

```js
const getFlatten = (arr) => {
  return arr.reduce((result, value, i) => {
    return result.concat(Array.isArray(value) ? getFlatten(value) : value)
  }, [])
}
console.log(getFlatten(array))
```
Kết quả trả về:
![](https://images.viblo.asia/3f877b45-f6e7-42c1-90cf-0769a3a9fd49.png)

### 4. Tổng kết
Trên đây là những chia sẻ mình tìm hiểu được, qua những cách làm trên hy vọng bạn có thể chọn được cách làm mà bạn cảm thấy phù hợp với dự án của mình nhé.

Và nếu bạn có cách làm khác hãy chia sẻ bên dưới comment để mọi người cùng tham khảo nhé. Cảm ơn mọi người đã bớt chút thời gian để đọc những chia sẻ của mình.

![](https://images.viblo.asia/2e26fa15-6d36-4b2a-b0a1-3ac7b93e1eca.jpg)