Một câu hỏi được rất nhiều anh em dev quan tâm đó là nên dùng Javascript hay Typescript. Trong dự án thì viết Typescript nhưng mọi người lại hay viết Javascript vậy thì nên sử dụng cái nào bây giờ ??? 

JavaScript là ngôn ngữ lập trình phổ biến nhất trên thế giới trong suốt 20 năm qua, vẫn được rất nhiều anh em dev tin dùng vậy tại sao Typescript đang ngày càng phổ biến dù xuất hiện sau, được rất nhiều lời khuyên sử dụng Typescript và nhiều thư viện lớn đã refactor lại mã nguồn JavaScript bằng Typescript.
### **TypeScript là gì?**

TypeScript làm một ngôn ngữ lập trình mã nguồn mở được phát triển bởi Microsoft. Cha đẻ của TypeScript là Anders Hejlsberg, một kiến trúc sư trưởng (Lead Architect) của ngôn ngữ C# và là cha đẻ của ngôn ngữ lập trình Delphi và Turbo Pascal.

Khác với sự đơn giản của JavaScript, dù TypeScript cũng đồng thời kế thừa nhiều định nghĩa, khái niệm của các ngôn ngữ như C#, Java,… nhưng TypeScript lại có yêu cầu cao về trật tự rõ ràng. 

TypeScript được xem là một phiên bản nâng cao hơn của JavaScript vì nó được thiết kế thêm nhiều chức năng tiện lợi hơn, cải tiến hơn từ những điểm yếu của JavaScript như các lớp hướng đối tượng và Static Structural typing, bên cạnh đó TypeScript còn có thể hoạt động rộng rãi cho các ứng dụng của ngôn ngữ Angular2 và Nodejs.

### **Typescript với JavaScript khác nhau thế nào?**

Có thể nói TypeScript là một phiên bản nâng cao của JavaScript vì nó bổ sung những kiểu dữ liệu tĩnh và các lớp hướng đối tượng, đồng thời nó bao gồm luôn các phiên bản ES mới nhất .

* Các file TypeScript có phần mở rộng là *.ts . Trong khi các file JS là *.js

* Code TypeScript sẽ được biên dịch thành JavaScript thuần. Trong TypeScript có tích hợp sẵn một trình biên dịch được viết bằng TypeScript luôn.

* Các biến trong code TypeScript được dùng với kiểu dữ liệu rõ ràng hơn trong code JavaScript.

```markdown
Ví dụ 1: Khai báo biến trong TypeScript

var name: string = "Thanh Hung";
var age: number = 23;
```

```sql
Ví dụ 2: Khai báo biến trong JavaScript

var name = "Thanh Hung";
var age = 23;
```
* TypeScript kiểm tra kiểu của các biến khi biên dịch còn Javascript kiểm tra lúc chạy

```javascript
Ví dụ 3: Kiểm tra kiểu dữ liệu trong Typescript

function Addition(number1: number, number2: number){
    return number1 + number2;
}
Addition(1, 2); //3
Addition(1, "hai"); //error
```
```javascript
Ví dụ 4: Kiểm tra kiểu dữ liệu trong JavaScript

function Addition(number2, number2){
    return number2 + number2;
}
Addition(1, 2); //3
Addition(1, "hai"); //1hai
```
Dù có những sự khác nhau nhưng cả hai vẫn có những ưu nhược điểm riêng.

**Javascript: Dynamic Type**

Ưu điểm:

* Thoải mái khi sử dụng, không bị ràng buộc kiểu dữ liệu.

* Không tốn thời gian setup ban đầu.

Nhược điểm:

* Lâu lâu quay lại, ko nhớ tên thuộc tính hay phương thức phải tra cứu lại. 

* Cần phải hiểu cách hoạt động của Javascript.

**Typescript: Optional Static Type**

Ưu điểm:

* Nhắc code tốt 

* Truyền sai kiểu dữ liệu là báo lỗi ngay

* Lâu lâu quay lại code hoặc người khác code cho mình thì đều được nhắc tên thuộc tính, phương thức nên không phải tra cứu lại

Nhược điểm:

* Phải tốn thời gian setup ban đầu + khai báo kiểu dữ liệu.

* Ðôi khi việc khai báo kiểu dữ liệu nhiều quá khiến code trở nên rườm rà.

### **Vậy có phải TypeScript tốt hơn JavaScript?**

* Dù có những điểm tối ưu hơn Javascript nhưng TypeScript không thể nào có thể thay thế hoặc làm cho JavaScript lỗi thời.

* Và khẳng định rằng, JavaScript vẫn là ngôn ngữ kịch bản phía máy khách được yêu thích nhất ở thời điểm hiện tại (và trong tương lai).

* Đối với các dự án nhỏ hơn, sử dụng TypeScript có thể làm gia tăng chi phí không cần thiết.

* Ngay như bước biên dịch TypeScript thành JavaScript thôi cũng đã tốn chi phí, tài nguyên rồi.

* Và vì JavaScript được chạy trực tiếp trên trình duyệt, vì vậy đối với các đoạn mã nhỏ, việc làm mới và gỡ lỗi sẽ dễ dàng hơn.

* Còn đối với TypeScript, chúng ta cần một IDE thích hợp để có thể viết, thử nghiệm và gỡ lỗi nó.

### **Vậy khi nào thì nên sử dụng TypeScript, khi nào thì sử dụng Javascript?**

Typescript nên dùng cho:

* Dự án lớn.
* Team size lớn (>5 người)
* Chưa quen làm việc với kiểu dynamic type của Javascript.

Javascript nên dùng cho:

* Dự án vừa và nhỏ.
* Team size nhỏ (1-5 người)
* Có kinh nghiệm làm việc với Javascript.
### Kết luận
Như vậy tùy vào tính chất của dự án, thói quen, kinh nghiệm làm việc mà có thể chọn Typescript hay JavaScript sao cho phù hợp nhất với dự án cũng như team của mình.