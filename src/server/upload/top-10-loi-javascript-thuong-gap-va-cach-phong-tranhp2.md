### 6. TypeError: ‘undefined’ is not a function

Đây là lỗi xảy ra khi bạn gọi 1 hàm không xác định. 
![](https://images.viblo.asia/4419b9ac-fb8c-494a-b932-832217e7db4a.png)

Khi các kỹ thuật lập trình JavaScript và các mẫu thiết kế ngày càng trở nên tinh vi trong những năm qua, đã có sự gia tăng tương ứng về phạm vi tự tham chiếu trong callbacks và closures, một điều khá phổ biến của sự lỗi này.

Xem xét đoạn mã ví dụ này:

```
 function clearBoard(){ 
 alert("Cleared"); 
 } 
 document.addEventListener("click", function(){ 
 this.clearBoard(); // what is “this” ? 
 }); 
```
 
 Nếu bạn thực hiện đoạn mã trên và sau đó bấm vào trang, nó dẫn đến lỗi sau "Uncaught TypeError: this.clearBoard is not a function". Lý do là hàm ẩn danh đang được thực thi nằm trong ngữ cảnh của document, trong khi `clearBoard` được định nghĩa trong window.
 
 Một giải pháp truyền thống, tương thích với trình duyệt cũ chỉ đơn giản là lưu tham chiếu của bạn vào `this` trong một biến mà sau đó có thể được kế thừa bằng cách đóng. Ví dụ:
 
 ```
 var self=this;  // save reference to 'this', while it's still this!
document.addEventListener("click", function(){
  self.clearBoard();
});
```

Ngoài ra, trong các trình duyệt mới hơn, bạn có thể sử dụng phương thức bind() để chuyển tham chiếu thích hợp:

```
document.addEventListener("click",this.clearBoard.bind(this));
```

### 7. Uncaught RangeError: Maximum call stack

Đây là lỗi xảy ra khi bạn gọi hàm đệ quy không có kết thúc.

![](https://images.viblo.asia/ec1399e3-0f8c-41fb-a92f-52f3c6beb16b.png)
 
 Nó cũng có thể xảy ra nếu bạn chuyển một giá trị cho một hàm nằm ngoài phạm vi. Nhiều hàm chỉ chấp nhận một phạm vi số cụ thể cho các giá trị đầu vào của chúng. Ví dụ, `Number.toExponential(digits)` và `N umber.toFixed(digits)` chấp nhận các chữ số từ 0 đến 20, và Number.toPrecision(digits) chấp nhận các chữ số từ 1 đến 21.
 
 ```
 var a = new Array(4294967295); //OK 
 var b = new Array(-1); //range error 
 var num = 2.555555; 
 document.writeln(num.toExponential(4)); //OK 
 document.writeln(num.toExponential(-2)); //range error! 
 num = 2.9999; 
 document.writeln(num.toFixed(2)); //OK 
 document.writeln(num.toFixed(25)); //range error! 
 num = 2.3456; 
 document.writeln(num.toPrecision(1)); //OK 
 document.writeln(num.toPrecision(22)); //range error! 
 ```
 
 ### 8. TypeError: Cannot read property ‘length’
 
 Đây là lỗi xảy ra do thuộc tính độ dài của biến không xác định
 
 ![](https://images.viblo.asia/0219a3c0-25f7-427f-ac5d-cf76fd6b88c6.png)
 
 Bạn thường tìm thấy chiều dài được xác định trên một mảng, nhưng bạn có thể chạy vào lỗi này nếu mảng không được khởi tạo hoặc nếu tên biến được ẩn trong một ngữ cảnh khác. Hãy hiểu lỗi này với ví dụ sau.

```
 var testArray= ["Test"]; 
 function testFunction(testArray) { 
 for (var i = 0; i < testArray.length; i++) { 
 console.log(testArray[i]); 
 } 
 } 
 testFunction(); 
 ```
 
  Khi bạn khai báo một hàm với các tham số, các tham số này trở thành các tham số cục bộ. Điều này có nghĩa rằng ngay cả khi bạn có các biến có tên testArray , các tham số có cùng tên trong một hàm sẽ vẫn được coi là cục bộ.

Bạn có hai cách để giải quyết vấn đề của mình:

1. Loại bỏ các tham số trong câu lệnh khai báo hàm (nó chỉ ra bạn muốn truy cập vào các biến được khai báo bên ngoài hàm, vì vậy bạn không cần tham số cho hàm của bạn):

```
 var testArray = ["Test"]; 
 
 /* Precondition: defined testArray outside of a function */ 
 function testFunction(/* No params */) { 
 for (var i = 0; i < testArray.length; i++) { 
 console.log(testArray[i]); 
 } 
 } 
 
 testFunction();
 ```
2. Gọi hàm truyền qua mảng mà chúng ta đã khai báo:

```
 var testArray = ["Test"]; 
 
 function testFunction(testArray) { 
 for (var i = 0; i < testArray.length; i++) { 
 console.log(testArray[i]); 
 } 
 } 
 
 testFunction(testArray); 
 ```
 
### 9. Uncaught TypeError: Cannot set property

Khi chúng ta cố gắng truy cập một biến không xác định, nó luôn trả về `undefined` và chúng ta không thể lấy hoặc thiết lập bất kỳ thuộc tính nào của `undefined` . Trong trường hợp đó, một ứng dụng sẽ trả ra "Uncaught TypeError cannot set property of undefined."

![](https://images.viblo.asia/9ca61966-b639-4700-a839-2fbaae056846.png)

Nếu đối tượng test không tồn tại, lỗi sẽ ném “Uncaught TypeError cannot set property of undefined.”

### 10. ReferenceError: event is not defined

Lỗi này được trả ra khi bạn cố gắng truy cập một biến không xác định hoặc nằm ngoài phạm vi hiện tại.

![](https://images.viblo.asia/77d32b04-8059-43fc-9bc7-acd5b550b524.png)

Nếu bạn gặp lỗi này khi sử dụng hệ thống xử lý sự kiện, hãy đảm bảo bạn sử dụng đối tượng sự kiện được truyền vào dưới dạng tham số. Các trình duyệt cũ hơn như IE cung cấp casc biến global và Chrome tự động đính kèm biến sự kiện vào trình xử lý. Firefox sẽ không tự động thêm nó. Các thư viện như jQuery cố gắng bình thường hóa hành vi này. Tuy nhiên, cách tốt nhất là sử dụng phương thức được chuyển vào hàm xử lý sự kiện của bạn.

```
 document.addEventListener("mousemove", function (event) { 
 console.log(event); 
 }) 
 ```