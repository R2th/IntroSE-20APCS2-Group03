# 1.  Hằng số.
Vấn đề đặt constant không chỉ liên quan đến js, mà cả lập trình nói chung. Bất kì ngôn ngữ nào đều có thể sử dụng.
```js
$(elem).on('keydown', function (e) { 
  if (e.keyCode == 27) { 
    // ...
   } 
});
```
Số 27 ở đây là gì, chắc hẳn nhiều người sẽ thắc mắc. đây là từ khóa keycode của phím ESC. Nhưng hầu hết các developer, đặc biệt là người mới bắt đầu, không nhớ các mã này hoặc hoàn toàn không biết và khi gặp phải mã, họ buộc phải tìm kiếm một lần nữa và lãng phí thời gian. 
Tất nhiên bạn có thể thêm một nhận xét trong mã nhưng việc nhập hằng số sẽ hiệu quả hơn nhiều, ví dụ: KEY_ESC = 27.
Hẳn sẽ không ai thắc mắc về số 27 nếu chúng ta khai báo hằng số cho nó.
# 2. Định danh
Thông thường chúng ta cần lấy mã định danh của một yếu tố (bình luận, bài đăng, người dùng, v.v.) để thực hiện một số hành động (ví dụ: đánh giá nhận xét bằng ajax) và thường bạn có thể tìm thấy phương pháp này:
```js
var id = $(this).attr('id').substring(8);
```
Như trong ví dụ trước, chúng ta lại phải đoán - số 8 này là gì.
Chúng ta có thể sử dụng dữ liệu của các data-id="" trên mã html, việc làm này trông code rõ ràng dễ hiểu hơn nhiều phải không nào.
```html
<div class="comment" data-id="123"></div>
```
=> Bây giờ dễ dàng hơn nhiều để có được định danh:
```js
var id = $(this).data('id');
```
# 3. $.post, $.get
Chúng ta đều biết một phương thức jQuery để làm việc với ajax - $ .ajax. Có một số hàm tốc ký như $ .get, $ .load, $ .post, v.v.

Các hàm này đã được thêm vào một cách cụ thể để tạo điều kiện cho các hành động được thực hiện thường xuyên (tải lên tập lệnh, json, thực hiện yêu cầu bài đăng), nhưng trong quá trình thực hiện, tất cả các phương thức này đều đề cập đến $ .ajax.
Nên thay vì sử dụng 
```js
$.post(url, data, function(data) { 
  data = $ .parseJSON (data);              
  // ...
 });
 ```
 chúng ta hãy dùng
 ```js
 $.ajax({
  type: "POST",
  url: url,
  data: data,
  dataType: "json",
  success: function(data) {
    //...
  },
  error: function() {
    //...
  }
});
 ```
 Theo mình, cách tiếp cận này dễ đọc hơn và dễ bảo trì hơn.
 # 4. Xử lý event
 Đôi khi, cần phải thêm trình xử lý sự kiện vào các thành phần của trang (ví dụ: nút xóa tin nhắn xóa xóa). Và thường thì bạn có thể bắt gặp cách tiếp cận này:
 ```js
 $('.comment a.delete').click(function(){
  //...
});
```
Bây giờ vấn đề là thêm trình xử lý tương tự vào một phần tử mới (ví dụ: vào một comment được load động). comment mới sẽ không có event này.
=> chúng ta nên sử dụng on đối với các phần tử load động
```js
$('body').on('click', 'a.external', function(e) {  
  // The function will be called when you click on any link with the external class
});
```
# 5. Quy ước
Sử dụng quy ước đặt tên là một cách tuyệt vời để bắt đầu - nó giúp mọi thứ rõ ràng và cho bạn biết chính xác những gì bạn đang làm việc.
Một quy ước đặt tên về cơ bản có nghĩa là bạn quyết định bạn sẽ gọi các biến của mình bằng các tên tuân theo một bộ quy tắc nhất định.
Nó có thể là một cái gì đó đơn giản như tiền tố tên biến với kiểu dữ liệu của họ, như thế này:

```js
int iMyinteger = 10;
float fMyfloat = 10.6f;
```
# 6. Phạm vi biến
Mỗi người có 1 cách khác nhau. Tuy nhiên hãy nhất quán trong code của dự án mình đang tham gia.
Ví dụ:
```js
// private
int _iWindowSize = 10;

// public
int _iWindowSize = 100;

// constanct
int I_WINDOW_SIZE = 1000;
```
# 7. Tự động hóa sau 3 lần trùng lặp
Thay vì khai báo từng biến 1 trông thật dài dòng
```js
box1 = 10;
box2 = 20;
box3 = 30;
box4 = 40;
box5 = 50;
```
Và đây là một cách tiếp cận để trông code chuyên nghiệp hơn.
```js
boxArray = [box1, box2, box3, box4];
for(int i = 0; i < boxArray.length; i ++) {
    boxArray[i] = i * 10;
}
```
# 8. Sử dụng === thay vì ==
== (hoặc !=) thực hiện một chuyển đổi kiểu tự động nếu cần thiết. == hoặc !== sẽ không thực hiện bất kỳ chuyển đổi. Nó so sánh giá trị và loại, có thể được coi là nhanh hơn ==.
Ví dụ sau mọi người sẽ hiểu hơn về nó
```js
[10] === 10    // is false
[10]  == 10    // is true
'10' == 10     // is true
'10' === 10    // is false
 []   == 0     // is true
 [] ===  0     // is false
 '' == false   // is true but true == "a" is false
 '' ===   false // is false 
```
# 8. Làm trống một mảng
```js
var myArray = [12 , 222 , 1000 ];  
myArray.length = 0; // myArray will be equal to [].
# 9. Sử dụng logic && / || cho các điều kiện
```
```js
var foo = 10;  
foo == 10 && doSomething(); // is the same thing as if (foo == 10) doSomething(); 
foo == 5 || doSomething(); // is the same thing as if (foo != 5) doSomething();
```

# 9. Đặt tên cho event
```js
$ ('a'). on ('click', function () { 
  // Handler 1
 });$ ('a'). on ('click', function () { 
  // Handler 2
 });
 ```
 Bây giờ, ví dụ, chúng ta cần loại bỏ trình xử lý thứ hai khỏi các liên kết. Nhưng $ ('a'). off ('click') sẽ xóa cả hai trình xử lý.
 Chúng ta có thể đặt tên cho từng xử lý.
 ```js
 $ ('a'). on ('click.namespace1', function () { 
  // Handler 1
 }); 
$ ('a'). on ('click.namespace2', function () { 
  // Handler 2
 });
 ```
 Bây giờ có thể loại bỏ trình xử lý thứ hai bằng cách gọi
```js
$ ('a'). off ('click.namespace2');
```