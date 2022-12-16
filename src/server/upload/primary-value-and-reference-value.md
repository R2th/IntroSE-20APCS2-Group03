Trong bài viết này, mình xin giới thiệu tới bạn đọc Khái niệm về  `Variable` và các hoạt động của nó ở trong `Javascript`

## 1. Khái niệm cơ bản
Trong `Javascript`, `variable` được lưu trữ bởi 2 loại giá trị: `Primitive Value` và `Reference Value`

`Primitive Value` (6) : `null`, `undefined`, `number`, `string`, `boolean`, `symbol`

`Reference Value` (1): `object`

Nhìn vào đây thì các bạn sẽ thấy thắc mắc, `NaN` và `Array`. Hai thằng này thường gặp những lại không thấy xếp vào loại nào.

`Primitive Value`:  `NaN` có kiểu là `number`

`Refernce Value` :  `array` có kiểu là `object`

Các bạn có thể kiểm chứng bằng việc dùng câu lệnh `typeof`

```javascript
typeof NaN  // "number"
typeof []   // "object"
```

## 2. Copying Primitive Value
Khi bạn chỉ định một `variable a` lưu trữ `Primitive Value` vào một `variable b`. Value được tạo ở `variable a` sẽ tạo và copy vào `variable b`

Hay xem ví dụ sau:

1. Khái báo một `variable a` và khởi tạo giá trị cho nó là `10`

```javascript
let a = 10
```

2. Khái báo một `variable b` và khởi tạo giá trị cho nó là bằng `a`

```javascript
let b = a
```

3. Chỉ định `varaible b` bằng một giá trị khác

```javascript
let b = 20
```

`variable a` và `variable b` không có quan hệ gì với nhau. Nên khi bạn thay đổi giá trị một trong 2 thằng thì sẽ không làm thay đổi thằng kia

```javascript
a = 30
console.log(b) // 20
```
## 3. Copying reference values
Khi bạn chỉ định `Reference value` từ một `variable` vào một `variable` khác, value được lưu trong `variable` được copy vào vị trí của biến mới

Sự khác nhau là value được lưu ở cả 2 `variable` có cùng address. Cả 2 `varaible` bây giờ tham chiếu tới cùng 1 object

Xem ví dụ sau:

Khai báo biến `x` giữ giá trị là một object có thuộc tính name:

```javascript
let x = {
	name: 'thai 1'
}
```

Khai báo biến `y` = `x`

```javascript
let y = x
```

Bây giờ cả `x` và `y` cùng tham chiếu tới một `object`
Tiếp đến ta thay đổi giá trị của `x` thì `y` sẽ bị thay đổi theo

```javascript
x.name = 'thai 1'

console.log(x) // {name: 'thai 1'}
console.log(y) // {name: 'thai 1'}

```

## 4. Một số ví dụ thường gặp
#### 1. `Reference Value` trong trường hợp tham số truyền vào `function`
```javascript
const user = {name: 'thai'}

function editName(data){
  data.name = "thai 1"
}

editName(user)

console.log(user) // {name: 'thai 1'}
  
```
Ở trường hợp này, nếu:
- `Reference Value` là một tham số truyền vào `function`
- Trong `function` ta muốn biến đổi `data`

=> Ở đây bạn cần cân nhắc khi biến đổi chính `data` vì nó làm thay đổi giá trị gốc

#### 2. Cách khắc phục thằng trên như thế nào ?

Nếu muốn khắc phục thằng trên. Bạn trên dùng một số hàm để tạo ra những data mới. Tạm gọi đó là clonedData đi. Ta có thể sử dụng `Object.assign`, `Spread Operation (ES6)`

```javascript
const user = {name: 'thai'}

function editName(data){
  const clonedData = Object.assign({}, data)
  // const clonedData = {...data}
  clonedData.name = "thai 1"
}

editName(user)

console.log(user) // {name: 'thai'}
```
Đối với `Array` bạn có thể tham khảo ở đây: https://futurestud.io/tutorials/clone-copy-an-array-in-javascript-and-node-js