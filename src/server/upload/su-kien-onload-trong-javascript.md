# Sự kiện onload trong Javascript
* Trong Javascript có một sự kiện được sử dụng khá nhiều đó là sự kiện onload. Nếu như bạn đã từng xem qua jQuery thì bạn cũng sẽ thấy thường trước khi viết người ta sẽ dùng cú pháp $(document).ready() thì bản chất đó chính là sự kiện onload trong Javascript.

* Trước khi vào tìm hiểu về onload thì ta sẽ điểm qua một vài ý về quá trình biên dịch của Javascript đã nhé.


## 1. Quá trình biên dịch code Javascript

Cũng như các ngôn ngữ lập trình khác, Javascript sẽ chạy biên dịch từ trên xuống dưới và từ trái qua phải. Chính vì vậy khi bạn sử dụng một hàm mà phía trên nó không tồn tại hàm đó thì sẽ bị bái lỗi undefined ngay. Và để giải quyết vấn đề này thì ta sẽ dùng sự kiện onload trong javascript.

Giả sử bạn có hàm A nằm trong file a.js và trong file b.js có sử dụng hàm A thì bắt buộc file a.js phải đặt trên file b.js, nó tuan theo nguyên tắc load theo thứ tự.
 ### Ví dụ:
* Đoạn code này sai vì hàm do_validate() mặc dù đã định nghĩa nhưng nó lại nằm dưới đoạn code gọi tới nó (giả sử hàm do_validate() nằm trong 1 file khác).

```
// Sai vì hàm do_validate chưa được định nghĩa
var flag = do_validate();
 
function do_validate()
{
    // return TRUE/FALSE;
```

Nhưng nếu sửa lại như thế này thì sẽ đúng:

```
function do_validate()
{
    // return TRUE/FALSE;
}
 
var flag = do_validate();
```

Một lưu ý quan trọng nữa khi các bạn gán một hàm nào đó cho một sự kiện nào đó trong HTML thì cũng phải tuân theo quy luật trên, nghĩa là nếu bạn gán một hàm mà phía trên thẻ HTML đó không có thì nó sẽ thông báo lỗi là undefined.

### Ví dụ: 
Đoạn code này cũng sai vì hàm do_validate() ở phía trên thẻ HTML chưa được định nghĩa

```
<html>
  <body>
    <button onclick="do_validate()">Click me</button>
    <script language="javascript">
      function do_validate()
      {
        // return TRUE/FALSE;
      } 
    </script>
  </body>
</html>
```

Nhưng nếu bạn sửa lại như thế này thì sẽ đúng:

```
<html>
  <body>
    <script language="javascript">
      function do_validate()
      {
        // return TRUE/FALSE;
      } 
    </script>
    <button onclick="do_validate()">Click me</button>
  </body>
</html>
```

## 2. Sự kiện onload trong Javascript

* Sự kiện onload có ý nghĩa rằng khi trình duyệt đã load xong mọi thứ (image, js, css) thì những đoạn code nằm bên trong đó mới được chạy. Có một lưu ý rằng nếu bạn sử dụng onload cho một thẻ HTML nào đó thì nó sẽ có tác dụng với thẻ HTML đó thôi nhưng nếu bạn dùng cho window thì nó sẽ có tác dụng cho toàn trang.

* Hay nói cách khác những đoạn code nằm bên trong sự kiện onload sẽ được chạy sau cùng khi mà trình JS đã được biên dịch 1 lần. Chính vì vậy nếu trong sự kiện onload bạn gọi tới một hàm nào đó thì dù bạn đặt hàm đó phía trên hay phía dưới thì đều đúng, lý do là trình biên dịch đã thực hiện dịch 1 lần rồi nên hàm đó đã tồn tại.

### Ví dụ 1: 
Trong đoạn code này mình gọi hàm do_validate() bên trong  sự kiện window.onload nên mặc dù hàm validate được đặt phía dưới nhưng vẫn đúng.

```
window.onload = function()
{
    do_validate();
};
 
function do_validate()
{
    alert(1);
}
```
### Ví dụ 2:
Nếu vẫn chưa tin thì bạn làm ví dụ sau đây, trong ví dụ này ta thực hiện alert lên thứ tự của quá trình biên dịch

```
alert(1);
 
window.onload = function()
{
    alert(3);   
};
 
alert(2);
```

Mặc dù đoạn code alert(3) nằm ở vị trí thứ hai nhưng nó lại xuất hiện cuối cùng.
## 3. Lời kết

Như vậy sự kiện onload trong Javascript được sử dụng khá nhiều bởi nó được xử lý sau cùng nên sẽ tránh được khá nhiều lỗi undefined, tuy nhiên không phải lúc nào sử dụng nó đều tốt mà bạn phải cân nhắc nhé. Và đáng lẽ ra bài này mình viết ở những bài đầu tiên nhưng mình sợ khó giải thích bởi vì nó liên quan đến hàm trong javascript, sự kiện trong javascript.