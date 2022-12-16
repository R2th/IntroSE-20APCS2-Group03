### TypeScript Number
Tất cả các số trong TypeScript đều là giá trị floating-point(dấu phẩy động) hoặc số nguyên lớn. Các số dấu phẩy động có kiểu **number**  trong khi số nguyên lớn có kiểu là **big int**.<br>
Cú pháp khai báo:<br>
```TypeScript
let price: number;
```
Bạn cũng có thể khởi tạo cho biến price một số:<br>
```TypeScript
let price = 9.95;
```
Trong JavaScript, TypeScript hỗ trợ các ký tự số cho các ký tự decimal, hexadecimal, binary, and octal literals. <br>
### TypeScript String
Giống như JavaScript, TypeScript cũng sử dụng cặp dấu nháy kép ( " )  hoặc dấu nháy đơn ( ' ) để bao quanh các chuỗi ký tự:<br>
```TypeScript
let firstName: string = 'John';
let title: string = "Web Developer";
```
TypeScript  cũng hỗ trợ [template strings](https://viblo.asia/p/5-su-dung-template-literal-bWrZnAEnKxw) cái sử dụng cặp dấu nháy ngược ( \` ) để bao quanh các chuỗi ký tự.<br>
Template strings cho phép bạn tạo một chuỗi nhiều dòng và cung cấp các tính năng nội suy chuỗi.<br>
Ví dụ sau đây sẽ tạo một chuỗi có nhiều dòng và sử dụng cặp dấu nháy ngược ( \` ) để bao quanh chuỗi ký tự nhé:<br>
```TypeScript
let description = `This TypeScript string can 
span multiple 
lines
`;
```
Chuỗi nội suy cho phép bạn nhúng các biến vào trong chuỗi như bên dưới:<br>
```TypeScript
let firstName: string = `John`;
let title: string = `Web Developer`;
let profile: string = `I'm ${firstName}. 
I'm a ${title}`;

console.log(profile);
```
Output:<br>
```TypeScript
I'm John. 
I'm a Web Developer.
```
Tóm tắt:
- Trong TypeScript, tất cả các strings đều có kiểu **string**.
- Giống như JavaScript, TypeScript sử dụng 2 cặp dấu nháy kép ( " ), dấu nháy đơn ( ' ), và dấu nháy ngược (  \` ) để bao quanh chuỗi.
### TypeScript Boolean
Trong TypeScript, type **boolean** cho phép 2 giá trị: **true** và **false**. Đây là một trong những kiểu nguyên thủy trong TypeScript, Ví dụ:<br>
```TypeScript
let pending: boolean;
pending = true;
// after a while
// ..
pending = false;
```
JavaScript có type **Boolean**. Type **Boolean** có ký tự **B** viết hoa và khác với type **boolean**. Bạn nên tránh sử dụng kiểu **Boolean**.