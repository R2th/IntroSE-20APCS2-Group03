Cũng giống như mọi ngôn ngữ lập trình khác, JavaScript có hàng tá thủ thuật để thực hiện cả các nhiệm vụ dễ và khó. Một số thủ thuật được biết đến rộng rãi trong khi những thủ thuật khác đủ để thổi bay tâm trí của bạn. Chúng ta hãy xem một vài thủ thuật JavaScript mà bạn có thể bắt đầu sử dụng ngay hôm nay!

## 1. Clearing or truncating an array

Một cách dễ dàng để xóa hoặc cắt bớt một mảng mà không cần gán lại nó là bằng cách thay đổi giá trị thuộc tính độ dài của nó:

```
const arr = [11, 22, 33, 44, 55, 66];
```

```
truncantingarr.length = 3; //=> [11, 22, 33]
```

```
// clearingarr.length = 0; //=> []
```

## 2. Object destructuring for array items

Gán các item của mảng cho các biến riêng lẻ bằng object destructuring

```
const str = '1997,John Doe,US,john@doe.com,New York';
const { 0: year, 2: country, 4: state } = str.split(',');
```

```
console.log(year) //=> "1997"
console.log(country) //=> "US"
```

## 3.  Creating pure objects

Bạn có thể tạo một đối tượng thuần túy 100%, nó không được kế thừa bất kỳ thuộc tính hoặc phương thức nào từ Object

```
const pureObject = Object.create(null);
```

```
console.log(pureObject); //=> {}
console.log(pureObject.constructor); //=> undefined
console.log(pureObject.toString); //=> undefined
console.log(pureObject.hasOwnProperty); //=> undefined
```

## 4. Get Unique Values of an Array

lấy ra 1 mảng với các phần tử là duy nhất, mình đã có 1 bài viết về [Set vs Array](https://viblo.asia/p/javascript-sets-vs-arrays-YWOZrBnPZQ0)

```
const j = [...new Set([1, 2, 3, 3])]
//=> [1, 2, 3]
```

## 5. Array and Boolean

Có khi nào bạn cần lọc các giá trị ***falsy*** (0, undefined, null, false, v.v.) ra khỏi một mảng? Bạn có thể chưa biết thủ thuật này:

```
myArray
    .map(item => {
        // ...
    })
    // Get rid of bad values
    .filter(Boolean);
```

## 6. Converting to boolean using !! operator

Đôi khi chúng ta cần kiểm tra xem một số biến có tồn tại hay nếu nó có giá trị hợp lệ, để coi chúng là giá trị true. !! sẽ giúp chúng ta kiểm tra điều này với 1 cú pháp cực kì ngắn gọn. Ví dụ

```
const tmp = 123
```

```
console.log(tmp) //=> 123
console.log(!!tm) //=> true
```

## 7. Converting to number using + operator

```
console.log(+"1234"); // 1234
console.log(+"ACB"); // NaN
```

toán tử + này cũng làm việc với Date

```
console.log(+new Date()) // 1461288164385
```