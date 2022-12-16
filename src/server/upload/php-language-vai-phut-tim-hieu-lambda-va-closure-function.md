Do mình đang ngồi viết Unit Test, gặp trúng mấy hàm <strong>Callback</strong> này nọ nên dành thời gian tìm hiểu luôn về <strong>Closure</strong> và <strong>Lambda</strong> function. Sẵn tiện viết một bài chia sẽ cho các anh em một tí về <strong><a href="https://hungphamdevweb.com/category/coding-tips/back-end">Backend</a></strong>  :stuck_out_tongue:

Thật ra bài viết nói về chúng thì có rất nhiều trên mạng rồi, ở đây mình chỉ tóm tắt và giới thiệu cách sử dụng chúng trong chương trình thực tế mà thôi.

Các anh em có thể xem bài viết gốc của mình ở đây nhé:
**[https://hungphamdevweb.com/php-language-vai-phut-tim-hieu-lambda-va-closure-function.html](https://hungphamdevweb.com/php-language-vai-phut-tim-hieu-lambda-va-closure-function.html)**

<h2>Lambda là gì ?</h2>
<strong>Lambda</strong> hay còn gọi là hàm ẩn danh (anonymous function), chúng có thể lưu dưới dạng một giá trị của biến và được truyền như một tham số cho một hàm hoặc một phương thức khác.

Cú pháp hàm <strong>Lambda</strong> function:
```
function (argument)
{
    //code
}
```
<h2>Closure là gì ?</h2>
<strong>Closure</strong> là một anonymous function và nó có thể truy cập các biến bên ngoài phạm vi mà nó được tạo ra. Một đặc điểm nhận dạng <strong>Closure</strong> function là nó sẽ có từ khoá <code>use</code> phía sau tên của hàm.

Cú pháp hàm <strong>Closure</strong> function:
```
function (argument) use (scope) {
    //code
}
```
<h2>Ví dụ về Closure và Lambda function</h2>
Để hiểu rõ hơn vấn đề thì chúng ta sẽ cùng nhau làm rõ qua vài ví dụ sau:
```
$input = array(1, 2, 3, 4, 5);
$output = array_filter($input, function ($v) { return $v &gt; 2; });
```
Ở trên chúng ta có một ví dụ về Filter Input bằng việc loại bỏ những phần tử lớn 2.

<code>function ($v) { return $v &gt; 2; }</code> ở đây là một <strong>Lambda</strong> function và nó được lưu dưới dạng như một giá trị đầu vào.
```$max_comparator = function ($v) { return $v &gt; 2; };

$input = array(1, 2, 3, 4, 5);
$output = array_filter($input, $max_comparator);
```
<em>Giả sử mình có một hàm ở trên làm thế nào để chuyển nó thành Closure function?</em>
```$max_comparator = function ($max)
{
  return function ($v) use ($max) { return $v &gt; $max; };
};

$input = array(1, 2, 3, 4, 5);
$output = array_filter($input, $max_comparator(2));
```
Ở đây mình dùng <code>use($max)</code> để biến anonymous function của mình thành <strong>Closure</strong> function và biến <code>$max</code> sẽ được truyền tham khảo khi mình gọi <code>$max_comparator(2)</code>
<h2>Kết Luận</h2>
OK thì 2 cái này hàm này nó chỉ có nhiêu đây, tuỳ mỗi trường hợp mà chúng ta sẽ áp dụng phù hợp. Đây là một kiến thức cơ bản mà các anh em nên trang bị cho mình vì nó sẽ giúp ích rất nhiều trong việc phỏng vấn.

Ngoài ra thì các anh em có thể tham khảo các nguồn bên dưới để hiểu thêm nhé:
<ul>
 	<li>https://www.php.net/manual/en/class.closure.php</li>
 	<li>https://php100.wordpress.com/2009/04/13/php-y-combinator/</li>
</ul>
Thân chào và quyết thắng hẹn gặp lại trong một bài viết khác vào một ngày không xa