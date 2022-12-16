## Return objects to enable chaining of functions
Khi tạo các hàm trên một đối tượng trong Javascript hướng đối tượng, việc trả về đối tượng trong hàm sẽ cho phép bạn xâu chuỗi các hàm lại với nhau. Vậy code sẽ trông như thế nào.
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;

  this.sayHello = function() {
    console.log(`Hello my name is ${this.name} - ${this.age} years old.`);
    return this;
  };

  this.grow = function() {
    this.age++;
    return this;
  };
}

const nhan = new Person("Nhan", 23);
nhan.sayHello().grow().sayHello();

// Hello my name is Nhan - 23 years old.
// Hello my name is Nhan - 24 years old.
```

## Breaking or continuing loop in functional programming
Một yêu cầu phổ biến của lặp là hủy bỏ. Với vòng lặp `for`, chúng ta có thể `break` để kết thúc sớm quá trình lặp.

```javascript
const arr = [4, 5, 0, 7, 8];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 0) {
    break; // dừng vòng lặp
  }
  console.log(arr[i]);
}

// 4
// 5
```

Vậy có cách nào dể code nhanh chóng và ngắn gọn hơn không,  người anh em `forEach` thì sao nhỉ ?

* Thử với `forEach` xem sao nhé
```javascript
const arr = [4, 5, 0, 7, 8];
arr.forEach(function(val) {
  if (val === 0) {
    // Cách nào để dừng?
    return true;
  }
  console.log(val);
});

// 4
// 5
// 0
// 7
// 8
```
Rất tiếc là không thể break được với `forEach`

Vậy còn `Some` và `Every` thì sao

> Some là một Array prototype. Nó kiểm tra xem một số phần tử trong mảng có vượt qua những điều kiện được cung cấp từ hàm truyền vào hay không.

* Thử với `Some` xem làm thế nào để break nhé
```javascript
const arr = [4, 5, 0, 7, 8];
arr.some(val => {
  if (val === 0) {
    return true;
  }
  console.log(val);
});

// 4
// 5
```
Ngon lành rồi =)) Vậy với `every` ?
> Every cũng giống như Some vậy nhưng ngược lại nó kiểm tra xem tất cả phần tử trong mảng đều đáp ứng được những điều kiện được cung cấp từ hàm truyền vào hay không.

* Code với Every sẽ break như thế nào
```javascript
const arr = [4, 5, 0, 7, 8];
arr.every(val => {
  if (val === 0) {
    return false;
  }
  console.log(val);
  return true;
});

// 4
// 5
```

## Advanced Javascript Properties
Chúng ta có thể cấu hình các thuộc tính đối tượng trong Javascript, chẳng hạn để đặt các thuộc tính là private hoặc readonly, vậy sẽ code như thế nào ?

```javascript
let nhan = {};
Object.defineProperty(nhan, 'cmnd', {
  value: 123456789,
  writable: false
});

nhan.cmnd = 111111111;
console.log(nhan.cmnd); 

// 123456789
```

* Cú pháp:
```javascript
Object.defineProperty(dest, propName, options)
```
Hoặc multiple definitions
```javascript
Object.defineProperties(dest, {
  propA: optionsA,
  propB: optionsB, //...
})
```
Trong đó phổ biến nhất:

* **`value`**: value là một thuộc tính bắt buộc. 
```javascript
{age: 23} === Object.defineProperty(obj, 'age', {value: 23})
```
* **`writable`**: đặt thuộc tính là ***readonly*** ` === writeable: false ` ( Như ví dụ ở trên ). Lưu ý rằng nếu thuộc tính là một đối tượng lồng nhau ( ***nested objects*** ), thì các thuộc tính của nó vẫn có thể chỉnh sửa được
* Ngoài ra còn các Options như: ***enumerable***, ***configurable***..vv.. các bạn có thể tìm hiểu thêm, trong bài này mình sẽ dừng lại ở đây thôi :v
## Lời Kết
Trên đây là một số tips mà mình đã tìm hiểu và chọn lọc ra được, hy vọng có thể giúp ích cho các bạn. 
Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^
Cảm ơn bạn đã ghé thăm :heart_eyes:

Nguồn: [JS_tips](https://www.jstips.co/en/javascript/)