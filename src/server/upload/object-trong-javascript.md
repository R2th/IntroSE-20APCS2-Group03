Xin chào mọi người,

Hôm nay mình sẽ giới thiệu về kiểu dữ liệu Object trong Javascript. 
Các khái niệm cơ bản, kèm các keyword và link để mọi người có thể tìm hiểu thêm. 

Không để mọi người chờ lâu, cùng mình bắt đầu nào.

###  1. Định nghĩa
- Object (đối tượng) là kiểu dữ liệu dùng để thể hiện một đối tượng thực tế trong đời thực.
- Object bao gồm các thuộc tính và hành động được lưu trữ qua cặp key-value trong Javasscript.

Ví dụ: Đối tượng car trong thực tế có các thuộc tính (properties) như: name, model, weight, color,... và các hành động: start, drive, brake, stop...
![image.png](https://images.viblo.asia/88be7c1e-7379-4742-bab9-719e91043056.png)

Code Javascript
![image.png](https://images.viblo.asia/7a78507d-13f8-4e27-a27a-8b4c4d71a73a.png)

###  2. Khai báo object
- Sử dụng {} để khai báo.
- Object nhiều thuộc tính (properties) và phương thức (methods). Được thể hiện qua cặp key-value chứa tên và giá trị.
- Key là tên duy nhất.
- Value là giá trị có thể là kiểu dữ liệu bất kỳ:number, string, boolean, object, array

Ví dụ:

![image.png](https://images.viblo.asia/c007d9f2-032a-433d-a7e4-b1908d35cccb.png)
![image.png](https://images.viblo.asia/ba659ecf-f0b4-48a5-9c42-67386cf26c32.png)

### 3. Truy cập thuộc tính của object

Có 2 cách: 
- objectName.propertyName 
- objectName["propertyName"]

Ví dụ:
![image.png](https://images.viblo.asia/3e17a3da-581a-40b8-b459-411ea90b7dbd.png)

### 4. Truy cập phương thức (method) của object

- objectName.methodName()

Ví dụ:
![image.png](https://images.viblo.asia/878ca9db-b660-48b3-b653-6e1f89cf7aed.png)

### 5. Thêm và sửa thuộc tính(property) trong object

Add: 
- objectName.propertyName = new value 
- objectName["propertyName"] = new value
Update:
- objectName.newPropertyName = value
- objectName[“new property name"] = value

Ví dụ:

![image.png](https://images.viblo.asia/3430ba05-27aa-4d76-bdb0-2979b8e575ff.png)

### 6. Xóa thuộc tính(property) trong object
- Delete objectName. propertyName

Ví dụ:
![image.png](https://images.viblo.asia/2d04552b-0b62-4424-8854-c8739488a9ab.png)

### 7. Phân biệt kiểu tham trị và tham chiếu

- **Tham trị (value type)**: Giá trị của biến được lưu trữ trực tiếp ở một vùng nhớ được gọi là stack
![image.png](https://images.viblo.asia/0556fae8-2975-4676-974d-77915f01a6ad.png)
![image.png](https://images.viblo.asia/13e36175-7dd9-444f-b43d-9b146a43cf41.png)

Ví dụ: biến a và b sẽ được lưu trữ ở 2 vùng nhớ. Nên khi ta thay đổi giá trị của a thì b sẽ không đổi.
![image.png](https://images.viblo.asia/d263120f-7eb6-42de-a6a5-c44c0d380d45.png)

- **Tham chiếu: (Reference type)**: Giá trị của biến được lưu trữ ở một vùng nhớ stack và địa chỉ biến được lưu trữ riêng ở một vùng nhớ Heap. Từ địa chỉ vùng nhớ lưu ở heap ta sẽ tìm được giá trị lưu ở stack.
Hiểu nôm na là địa chỉ và giá trị lưu ở 2 nơi khác nhau.

![image.png](https://images.viblo.asia/a43716c1-34f6-4e6c-908b-6924428fbf13.png)
![image.png](https://images.viblo.asia/32b8de61-ff74-4ecf-b790-4259900efc6d.png)

Ví dụ: person là kiểu object nên thuộc kiểu tham chiếu. Nên khi ta thay đổi giá trị name của object person thì chỉ thay đổi giá trị name lưu ở stack, còn địa chỉ lưu ở heap vẫn không đổi, object person không đổi địa chỉ. Nên sau khi đi qua function change reference thì giá trị name đã thay đổi.
![image.png](https://images.viblo.asia/defe65a0-d1b5-4d76-893b-af3063bdd107.png)

### 8. Object destructuring

![image.png](https://images.viblo.asia/42bbb8fe-a6b7-48cb-a896-96fbc608e5b7.png)

### 9. Sử dụng spread để clone object
Bình thường với kiểu tham trị thì việc tạo ra 1 biến mới và gán giá trị của biến hiện tại rất đơn giản:

```js
const name = 'John';
const name2 = name;
```
Nhưng đối với object là kiểu tham chiếu thì việc clone ra 1 object mới phức tạp hơn. Nếu sử dụng toán tử = để gán giá trị thì object mới sẽ có cùng địa chỉ vùng nhớ với object cũ. Điều này không chính xác. Mục đích ban đầu là tạo ra 1 object mới.
```js
const person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566
};
const person2 = person;
person2.firstName = 'John 2';
console.log(person.firstName ); //John 2
```

Như ở ví dụ trên person 2 và person có cùng địa chỉ vùng nhớ head nên khi ta thay đổi giá trị của person thì person2 cũng thay đổi và ngược lại.

Thay vào đó để clone object ta dùng kỹ thuật spread(…)

```js
const clonePerson = {
...person
};
console.log(clonePerson.firstName);
```

Tham khảo:

https://www.w3schools.com/js/js_objects.asp

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

http://net-informations.com/faq/general/valuetype-referencetype.htm