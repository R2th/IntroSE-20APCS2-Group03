# Mở đầu
Các biến là phần thiết yếu của mọi ngôn ngữ lập trình. Vì vậy, bạn phải hiểu những điều cơ bản của biến trước khi bạn đi sâu vào ứng dụng. Nên hôm nay mình xin trình bày đôi nét về biến Javascript.
# 1. Biến là gì ?
Giống như nhiều ngôn ngữ lập trình khác, JavaScript có các biến. Các biến có thể được coi là các thùng chứa có tên. Bạn có thể đặt dữ liệu vào các vùng chứa này và sau đó tham khảo dữ liệu chỉ bằng cách đặt tên vùng chứa.

# 2. Biến JavaScrip được lưu ở đâu.

Các biến JavaScript được lưu trữ trong bộ nhớ của browser  process  ( tiến trình trình duyệt) hiểu nôm na 1 cách đơn giản là biến được lưu trong phần Ram mà trình duyệt đang sử dụng.
# 3. Khai báo biến
Để khai báo một biến ta sử dụng từ khóa  `const, let, var `.

***const*** được sử dụng để khai báo 1 hằng số, và giá trị của nó không thay đổi trong suốt chương trình.

***let***   khai báo biến chỉ có thể truy cập được trong block bao quanh nó được xác định bằng cặp {}.

***var***  khai báo biến có thể truy cập ở  phạm vi hàm số hoặc bên ngoài hàm số, toàn cục.
<br>
<br>
Giống như ngôn ngữ khác, cách đặt tên biến của JS cũng phải tuân theo 1 số quy tắc sau  :

- Tên biến phải là các chữ không dấu viết  hoa hoặc viết thường, các chữ số từ 0-9 và dấu gạch dưới () và kí hiệu $.
- Tên biến bắt đầu phải là chữ hoặc dấu gạch dưới (_), nếu bắt đầu bằng số là sai.
- Không thể sử dụng các từ dành riêng (như từ khóa JavaScript) làm tên.
- Các tên có phân biệt chữ hoa chữ thường

một số ví dụ về khai  báo  biến 

``` javascript

*// Đúng*

var person;
 
*// Đúng*

var _person;
 
*// Đúng*

var __person;
 
*// Đúng*

var person1;
 
*// SAI*

var 10persion;
```

# 4.  Kiểu dữ liệu của  biến 

Khi khai báo biến ta  không cần phải khai báo kiểu của  biến đó trước khi dùng. Kiểu sẽ được tự động xác định trong lúc chương trình được thực thi. Điều đó cũng có nghĩa là một biến có thể chứa giá trị của các kiểu dữ liệu khác nhau.

```javascript
var test = 123 ; // test là một số

var test = "variable of js "; //test là một chuỗi

var test = true;  // test là một boolean
```
Theo tiêu chuẩn ECMAScript xác định bảy kiểu dữ liệu  như sau :
> Kiểu boolean 
> 
> Kiểu null
> 
> Kiểu undefined
> 
> Kiểu số
> 
> Kiểu chuỗi
> 
> Kiểu Symbol (mới trong ECMAScript 6)
> 
> Kiểu đối tượng

# 5. Phạm vi của biến 

 Có hai loại phạm vi trong JavaScript. `biến cục bộ (local scope)` và `biến toàn cục  (global scope)`. Biến toàn cục được khai báo ngoài hàm , trong khi đó biến cục bộ được lưu  khai báo bên trong một hàm.(Nên với cùng một tên biến, ta có thể khai báo ở những hàm khác nhau).
 <br>
 <br>
 Một biến toàn cục có thể được truy cập từ bên ngoài của hàm cũng như bên trong của hàm nhưng, một biến cục bộ chỉ có thể được truy cập bên trong hàm. Nếu truy cập từ bên ngoài của hàm, bạn sẽ nhận được lỗi 'undefined variable' (biến không xác định).
 
 ví dụ đơn giản :
 
 ```javascript
var foo = 50;  //<= biến toàn cục 

 function test() {
         var bar = 100; //<= biến cục bộ 
 }
 ```
Ví dụ nâng cao :

``` javascript
 function sum(a, b) { 
     var sum = (a + b) ; // sum là biến cục bố
     return sum;
 }
  
 var result  = sum(10, 20); //result là biến toàn cục
  
  //và chúng ta có thể sử dụng biến result ở khắp nơi
 function showResult(result) {
     alert('sum is: ' + result);
 }
  
 showResult();
```

Trước hết, hàm sum được gọi là truyền hai biến trả về giá trị tổng của biến được truyền. Sau đó, giá trị trả về được lưu trữ trong biến result là biến toàn cục . Sau đó, hàm showResult () được gọi để hiển thị giá trị được lưu trữ trong biến toàn cục.
# 6. Một số vấn đề hay gặp phải khi làm việc với  biến.
***1. Sử dụng toán tử gán (=), thay vì toán tử so sánh (==) trong câu lệnh if.***

```javascript
var x = 0;
if (x = 10)
câu lệnh này sẽ trả về giá trị true vì 10 là true
```

```javascript
var x = 0;
if (x = 0) 
câu lệnh này sẽ trả về giá trị false vì 0 là false
```

```javascript
để so sánh chính xác chúng ta phải sử dụng như sau
var x = 0;
if (x == 10)
```

**2. Nhầm lẫn giữa việc bổ sung và thêm số**

```javascript
Cả 2 phép  tính toán trên đều sử dụng toán tử cộng giống nhau.

var x = 10;
var y = 5;
var z = x + y;           // kết quả của z là  15.

var x = 10;
var y = "5";
var z = x + y;           // kết quả của z là "105".
```

**3. Phá vỡ chuỗi JavaScript**

javascript cho phép chúng ta chia chuỗi thành 2 dòng  nhưng nếu khai báo như : 

```javascript
var x = "Hello
World!";
biến sẽ không hoạt động.
```

 để biến họat động chúng ta cần khai báo như sau :
```javascript
 var x = "Hello \
World!";
```
# Kết thúc
Đây là một số kiến thức mình học được vào tham khảo từ nhiều nguồn (w3schools ..) trong quá trình học javascript. Rất mong nhận được nhiều ý kiến góp ý của mọi người.