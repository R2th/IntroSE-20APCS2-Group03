Xin chào mọi người, 

Hôm nay mình sẽ giới thiệu về kiểu dữ liệu **Boolean** trong Javascript. 
Các khái niệm cơ bản, kèm các keyword và link để mọi người có thể tìm hiểu thêm.
Build-in object Boolean, truthy, falsy, toán tử so sánh(comparison operators), toán tử luận lý(logical operators)

Không để mọi người chờ lâu, cùng mình bắt đầu nào.

### **1. Định nghĩa**

Boolean là kiểu dữ liệu nguyên thủy (primitive) và chỉ có hai giá trị true hoặc fasle

Bạn nào chưa rõ kiểu dữ liệu nguyên thủy là gì thì đọc thêm link này nha: https://developer.mozilla.org/en-US/docs/Glossary/Primitive

### **2. Tìm hiểu về Truthy và Falsy**

- **Truthy** là những giá trị khi chuyển đổi về Boolean thì sẽ có giá trị true.
- **Falsy** là những giá trị khi chuyển đổi về Boolean thì sẽ có giá trị false


 Javascript cung cấp một **build-in object** (những object xây dựng sẵn) là Boolean chứa những function xây dựng sẵn để làm việc với kiểu dữ liệu boolean.
 
Tham khảo về build-in object Boolean tại link này: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean

**Boolean()** function giúp ta kiểm tra một giá trị là true hay false.

**Ví dụ:**
```js
console.log(Boolean("Message")); //true

console.log(Boolean(10 < 9));//true
```

Vậy làm thế nào để biết một giá trị là Truthy hay Falsy.

Bảng bên dưới cung cấp danh sách giá trị **Falsy** trong Javascript: 

(**Note:**  Còn lại các giá trị nằm ngoài bảng này sẽ là **Truthy**)

![image.png](https://images.viblo.asia/74b2934d-98d3-49bc-a65c-dc2902ed9f0c.png)

**Ví dụ:** Các trường hợp có giá trị Falsy và Truthy thường gặp trong câu lệnh rẽ nhánh If
```js

if (false) //Falsy
if('false') //Truthy
if (null) //Falsy
if ('null') //Truthy
if (undefined) //Falsy
if (0) //Falsy
if (-0) //Falsy
if (-10) //Truthy
if (0n)//Falsy
if (NaN) //Falsy
if ("") //Falsy
if (" ") //Truthy
```

### 3. Toán tử so sánh trong javascript (Comparison operation)

Phần này khá rối vậy nên để hiểu rõ mọi người nên thực hành chạy thử code cho các trường hợp so sánh ở ví dụ dưới để hiểu rõ hơn.

Kết quả của phép so sánh trong javascript là Boolean(true/false)
 - So sánh bằng ta dùng toán tử **==** toán tử này giúp ép kiểu dữ liệu khi so sánh.
 ```js
if(9 == 9) //Truthy

if(9 == '9') //Truthy bởi vì '9' kiểu string sẽ ép kiểu thành 9 kiểu số (numeric)

if(9 == '09') //Truthy bởi vì '09' kiểu string sẽ ép kiểu thành 9 kiểu số (numeric)

if(0 == false) //Truthy bởi vì 0 sẽ ép kiểu thành false

if(false == -10) //Falsy bởi vì false sẽ ép kiểu về 0
```
 
 - So sánh bằng ta cũng có thể dùng toán tử **===** toán tử này sẽ không ép kiểu dữ liệu khi so sánh.
 Trả về giá trị true khi **bằng cả giá trị và cùng kiểu dữ liệu**.
  ```js
if(9 === 9) //Truthy

if(9 === '9') //Falsy bởi vì '9' kiểu string sẽ khác 9 kiểu số. ('9' không được ép kiểu)

if(9 === '09') //Falsy bởi vì '09' kiểu string khác 9 kiểu số (numeric)

if(false === 0) //Falsy bởi vì false khác kiểu dữ liệu 0

if(-10 === false) //Falsy bởi vì -10 khác kiểu dữ liệu false
```

- So sánh lớn hơn ta dùng toán tử > (hoặc lớn hơn hoặc bằng ta dùng toán tử >=)

```js
if(10 > 9) //Truthy
```

- So sánh nhỏ hơn ta dùng toán tử < (hoặc nhỏ hơn hoặc bằng ta dùng toán tử <=)
```js
if(9 <= 10) //Truthy
```

**So sánh chuỗi** ta vẫn sẽ dùng các toán tử trên nhưng có 2 quy tắc sau:

- So sánh từng ký tự từ trái sang phải
- Dựa vào bảng mã ASCII để so sánh từng ký tự.

Đọc thêm và tham khảo bản mã ASCII tại link: https://www.w3schools.com/charsets/ref_html_ascii.asp

```js
if('abce' > 'abcd') //Truthy bởi vì e > d

if('j' > 'J') //Truthy bởi vì tra bản mã ASCII J hoa có giá trị 74, 
//còn j thường có giá trị 106

if('A' > 1) //Truthy bởi vì 1 có giá trị 49 còn A có giá trị 65
```

### 4. Toán tử luận lý (Logical operators)

Toán tử luận lý dùng để định nghĩa logic giữa biến và giá trị với nhau. Kết quả của phép luận lý trong javascript là Boolean(true/false)

- And (&&)

![image.png](https://images.viblo.asia/3718c7f0-0de4-434b-b190-66a8e4e92b6c.png)

Ví dụ: 
```js
const x = 6;
const y = 3;

console.log(x < 10 && y > 1); //true

console.log(x > 10 && y > 1); //false
```

- Or (||)

![image.png](https://images.viblo.asia/a504a08d-e1f3-4a1a-8bb0-75239e0a9ed0.png)
Ví dụ: 
```js
const x = 6;
const y = 3;

console.log(x == 5 || y == 1); //false
console.log(x == 6 || y == 1); //true
```

- NOT (!)

![image.png](https://images.viblo.asia/3e8c3077-4ca5-4002-942d-ca67a0905978.png)

Ví dụ: 
```js
const x = 6;

console.log(!(x == 5)); //true
console.log( !(x == 6)); //false
```


**Tham khảo:**

https://www.w3schools.com/js/js_comparisons.asp

https://www.w3schools.com/charsets/ref_html_ascii.asp

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean

https://press.rebus.community/programmingfundamentals/chapter/logical-operators/