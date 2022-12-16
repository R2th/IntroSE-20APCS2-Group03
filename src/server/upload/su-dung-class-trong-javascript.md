Bài viết này mình sẽ chia sẻ cách định nghĩa và sử dụng class trong ES6, Ví dụ:<br>
```Javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
```
Code ở trên sử dụng từ khóa class để định nghĩa lớp Person, trong lớp Person có phương thức constructor() là nơi khởi tạo các thuộc tính của lớp.<br>
Javascript sẽ tự động gọi phương thức  constructor() khi bạn khởi tạo một đối tượng của lớp.<br>
Ví dụ:<br>
```Javascript
let john = new Person("John Doe");
console.log(john);
```
Output:<br>
```
Person {name: 'John Doe'}
```

Hàm getName() được gọi là một phương thức của lớp Person, cũng giống như phương thức constructor() bạn cũng có thể gọi phương thức getName() bằng cú pháp như dưới.<br>
```
objectName.methodName(args)
```
Ví dụ:<br>
```Javascript
let name = john.getName();
console.log(name);
```
Output:<br>
```
John Doe
```
Trong ES6 các lớp còn có thể gọi là các hàm đặc biệt, bạn có thể dùng toán tử typeof để kiểm trả loại của lớp Person nhé.<br>
```Javascript
console.log(typeof Person); // function
```
Đối tượng john cũng là một thể hiện của Person và kiểu Object:<br>
```Javascript
console.log(john instanceof Person); // true
console.log(john instanceof Object); // true
```