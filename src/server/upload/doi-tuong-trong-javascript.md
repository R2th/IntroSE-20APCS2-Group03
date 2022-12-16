## Mục tiêu bài viết

- Cú pháp khai báo đối tượng
- Sử dụng object trong Javascript

## Nội dung bài viết

Trong cuộc sống thực, mọi thứ đều là một đối tượng. Ví dụ : ô tô, xe máy, đàn, máy tính....

Một chiếc ô tô có các thuộc tính như trọng lượng và màu sắc, và các phương thức như bắt đầu và dừng.

Tất cả các ô tô đều có các thuộc tính giống nhau, nhưng các giá trị thuộc tính khác nhau giữa các ô tô.

Tất cả các xe đều có các phương pháp giống nhau, nhưng các phương pháp được thực hiện ở những thời điểm khác nhau.

### Định nghĩa một đối tượng

Đối tượng cũng là biến. Nhưng các đối tượng có thể chứa nhiều giá trị. Ví dụ:

```js
var car = { type: "Fiat", model: "500", color: "white" };
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_objects_object" target="_blank">Click để xem kết quả</a>
</div>

Các giá trị được viết dưới dạng cặp **name: value** (_tên thuộc tính và giá trị_ được phân tách bằng dấu hai chấm).

### Thuộc tính đối tượng

Các cặp **name: value** trong các đối tượng JavaScript được gọi là thuộc tính. Ví dụ:

```js
var person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue",
};
```

Thì các thuộc tính sẽ là:

| Thuộc tính | Giá trị |
| ---------- | ------- |
| firstName  | John    |
| lastName   | Doe     |
| age        | 21      |
| eyeColor   | black   |

### Truy cập thuộc tính đối tượng

Có 2 cách để truy cập vào thuộc tính đối tượng

- Cách 1: `objectName.propertyName`
- Cách 2: `objectName["propertyName"]`

Ví dụ:

```js
person.lastName;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_objects_properties_1" target="_blank">Click để xem kết quả</a>
</div>

```js
person["lastName"];
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_objects_properties_2" target="_blank">Click để xem kết quả</a>
</div>

### Phương thức đối tượng

Phương thức là các hành động có thể được thực hiện trên các đối tượng.

Các phương thức được lưu trữ trong các thuộc tính dưới dạng định nghĩa hàm. Ví dụ:

```js
var person = {
  firstName: "John",
  lastName: "Doe",
  id: 5566,
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};
```

| Thuộc tính | Giá trị                                                   |
| ---------- | --------------------------------------------------------- |
| firstName  | Nguyễn                                                    |
| lastName   | Thiên                                                     |
| age        | 21                                                        |
| eyeColor   | black                                                     |
| fullName   | function() {return this.firstName + " " + this.lastName;} |

### Từ khóa `this`.

- Trong định nghĩa hàm, điều này đề cập đến đối tượng sở hữu hàm.
- Trong ví dụ trên đối tượng **person** sở hữu hàm **fullName**.
- Nói cách khác, `this.firstName` có nghĩa là thuộc tính `firstName` của đối tượng này.

### Truy cập phương thức

Chúng ta cũng có thể truy cập vào một hàm qua phương thức:

```js
objectName.methodName();
```

Ví dụ:

```js
name = person.fullName();
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_objects_method" target="_blank">Click để xem kết quả</a>
</div>

Nếu bạn truy cập một phương thức không có dấu ngoặc (), nó sẽ trả về định nghĩa hàm. Ví dụ:

```js
name = person.fullName;
```

<div class="result">
  <a href="https://www.w3schools.com/js/tryit.asp?filename=tryjs_objects_function" target="_blank">Click để xem kết quả</a>
</div>

### Không khai báo chuỗi, số và Boolean là các đối tượng!

Khi một biến JavaScript được khai báo với từ khóa `new`, biến này sẽ được tạo dưới dạng một đối tượng

```js
var x = new String(); // Khai báo x như một đối tượng String
var y = new Number(); // Khai báo y như một đối tượng Number
var z = new Boolean(); // Khai báo z như một đối tượng Boolean
```

Chúng làm phức tạp mã code chúng ta và làm chậm tốc độ thực thi.