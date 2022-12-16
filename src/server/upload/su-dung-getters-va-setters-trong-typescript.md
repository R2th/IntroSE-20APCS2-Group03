Ví dụ bên dưới là một class **Person** có 3 thuộc tính: **age**, **firstName**, và **lastName**:<br>
```TypeScript
class Person {
    public age: number;
    public firstName: string;
    public lastName: string;
    
}
```
Để truy cập các thuộc tính của class **Person**, bạn có thể làm như sau:<br>
```TypeScript
let person = new Person();
person.age = 26;

```
Giả sử bạn gán một giá trị, cái giá trị được người dùng nhập từ form input  để gán đến thuộc tính **age**:<br>
```TypeScript
person.age = inputAge;

```
Dó là giá trị nhập từ form input của người dùng, nên inputAge có thể là bất kỳ số nào. Để đảm bảo tính hợp lệ của tuổi, bạn có thể kiểm tra trước khi gán giá trị như sau:<br>
```TypeScript
if( inputAge > 0 && inputAge < 200 ) {
    person.age = inputAge;
}

```
Nếu sử dụng đoạn kiểm tra này ở khắp nơi trong dự án, code của chúng ta sẽ bị lặp lại nhiều lần và trở nên cồng kềnh, khó bảo trì.<br>
Để tránh lặp lại việc kiểm tra này, bạn có thể sử dụng setters và getters. Các setters và getters cho phép bạn kiểm soát quyền truy cập vào các thuộc tính của lớp.<br>
chú ý:<br>
- Một phương thức getter trả về giá trị của thuộc tính
- Một phương thức setter thì cập nhật giá trị của thuộc tính

Một phương thức getter bắt đầu với từ khóa **get**, một phương thức setter bắt đầu với từ khóa **set**.<br>
```TypeScript
class Person {
    private _age: number;
    private _firstName: string;
    private _lastName: string;

 
    public get age() {
        return this._age;
    }

    public set age(theAge: number) {
        if (theAge <= 0 || theAge >= 200) {
            throw new Error('The age is invalid');
        }
        this._age = theAge;
    }

    public getFullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }
}

```
Cách hoạt động:<br>
- Đầu tiên chúng ta thay đổi mức truy cập các thuộc tính **age**, **firstName**, và **lastName** từ **public** đến **private**.
- Thứ hai, thay đổi thuộc tính **age** đến **_age**.
- Thứ ba, tạo phương thức getter và setter  cho thuộc tính **_age**. Trong phương thức setter, hãy kiểm tra tính hợp lệ của độ tuổi đầu vào trước khi gán nó cho thuộc tính **_age**.

Bây giờ, bạn có thể truy cập phương thức setter **age** như sau:<br>
```TypeScript
let person = new Person();
person.age = 10;
```
Lưu ý rằng lệnh gọi tới setter không có dấu ngoặc đơn như một phương thức thông thường. Khi bạn gọi **person.age**, phương thức setter với **age** sẽ được gọi. Nếu bạn chỉ định giá trị **age** không hợp lệ, setter với **age** sẽ gây ra lỗi:<br>
```TypeScript
person.age = 0;
```
Error:<br>
```
Error: The age is invalid
```
Khi bạn truy cập vào **person.age**, getter với **age** sẽ được gọi.<br>
Phần sau thêm getters và setters vào thuộc tính firstName và lastName.<br>
```TypeScript
class Person {
    private _age: number;
    private _firstName: string;
    private _lastName: string;

    public get age() {
        return this._age;
    }

    public set age(theAge: number) {
        if (theAge <= 0 || theAge >= 200) {
            throw new Error('The age is invalid');
        }
        this._age = theAge;
    }

    public get firstName() {
        return this._firstName;
    }

    public set firstName(theFirstName: string) {
        if (!theFirstName) {
            throw new Error('Invalid first name.');
        }
        this._firstName = theFirstName;
    }

    public get lastName() {
        return this._lastName;
    }

    public set lastName(theLastName: string) {
        if (!theLastName) {
            throw new Error('Invalid last name.');
        }
        this._lastName = theLastName;
    }

    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

```

Tóm tắt:<br>
- Sử dụng TypeScript getters/setters để kiểm soát các thuộc tính truy cập của một class