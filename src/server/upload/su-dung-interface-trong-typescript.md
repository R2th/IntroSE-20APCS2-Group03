### Giới thiệu interfaces trong TypeScript
Interfaces trong TypeScript  định nghĩa một tiêu chuẩn trong code của bạn. Chúng cung cấp các tên rõ ràng để kiểm tra loại dữ liệu.<br>
Ví dụ:<br>
```TypeScript
function getFullName(person: {
    firstName: string;
    lastName: string
}) {
    return `${person.firstName} ${person.lastName}`;
}

let person = {
    firstName: 'John',
    lastName: 'Doe'
};

console.log(getFullName(person));

```
Output:<br>
```TypeScript
John Doe
```
Trong ví dụ trên, trình biên dịch sẽ kiểm tra các đối số bạn truyền vào hàm **getFullName()**.<br>
Nếu đối số có hai thuộc tính là kiểu string, thì trình biên dịch sẽ không cảnh báo lỗi. Ngược lại, nó sẽ hiển thị ra lỗi.<br>
Như bạn thấy ví dụ trên làm cho code khó đọc, để giải quyết vấn đề này, TypeScript giới thiệu một khái niệm về **interfaces**.<br>
Ví dụ sau sử dụng một interface gọi là **Person**, cái có 2 thuộc tính là string:<br>
```TypeScript
interface Person {
    firstName: string;
    lastName: string;
}
```
Theo convention, tên của các interface sẽ được viết theo kiểu camel case(quy tắc lạc đà). Quy tắc sử dụng ký tự đầu tiên của từ tiếp theo viết hoa để nối giữa các tến.<br>
Ví dụ, **Person**, **UserProfile**,  **FullName**.<br>
Sau khi định nghĩa interface **Person**, bạn có thể sử dụng nó như một **type**. Bạn có thể chú thích tham số hàm với name interface:<br>
```TypeScript
function getFullName(person: Person) {
    return `${person.firstName} ${person.lastName}`;
}

let john = {
    firstName: 'John',
    lastName: 'Doe'
};

console.log(getFullName(john));
```
Mã code bây giờ dễ đọc hơn trước phải không nào.<br>
Hàm **getFullName()** sẽ chấp nhận bất kỳ đối số nào có hai thuộc tính là string. Và nó không nhất thiết phải có chính xác hai thuộc tính string. Hãy xem ví dụ:<br>
```TypeScript
let jane = {
   firstName: 'Jane',
   middleName: 'K.'
   lastName: 'Doe',
   age: 22
};
```
Vì đối tượng **jane** có hai thuộc tính chuỗi **firstName** và **lastName**, bạn có thể chuyển nó vào hàm **getFullName ()** như sau:<br>
```TypeScript
let fullName = getFullName(jane);
console.log(fullName); // Jane Doe
```
### Optional properties
Một interface có thể có các thuộc tính tùy chọn. Để khai báo một thuộc tính tùy chọn, bạn sử dụng dấu ( **?** ) đặt ở cuối tên thuộc tính trong khai báo, ví dụ:<br>
```TypeScript
interface Person {
    firstName: string;
    middleName?: string;
    lastName: string;
}
```
Trong ví dụ trên, interface **Person** có 2 thuộc tính bắt buộc phải có và một thuộc tính tùy chọn(thuộc tính không bắt buộc).<br>
Ví dụ sử dụng interface **Person** trong hàm **getFullName()** :<br>
```TypeScript
function getFullName(person: Person) {
    if (person.middleName) {
        return `${person.firstName} ${person.middleName} ${person.lastName}`;
    }
    return `${person.firstName} ${person.lastName}`;
}
```
### Readonly properties
Nếu thuộc tính chỉ có thể sửa đổi khi đối tượng được tạo lần đầu tiên, bạn có thể sử dụng từ khóa **readonly** trước tên của thuộc tính:<br>
```TypeScript
interface Person {
    readonly ssn: string;
    firstName: string;
    lastName: string;    
}

let person: Person;
person = {
    ssn: '171-28-0926',
    firstName: 'John',
    lastName: 'Doe'
}
```
Trong ví dụ này, thuộc tính **ssn** không thể thay đổi:<br>
```TypeScript
person.ssn = '171-28-0000';
```
Error:<br>
```TypeScript
error TS2540: Cannot assign to 'ssn' because it is a read-only property.
```
**Tóm tắt.**<br>
- Các Interfaces trong TypeScript định nghĩa một tiêu chuẩn trong code của bạn và cung cấp các tên rõ ràng để kiểm tra kiểu.
- Các Interfaces  có thể có các thuộc tính **optional**  hoặc các thuộc tính **readonly** .