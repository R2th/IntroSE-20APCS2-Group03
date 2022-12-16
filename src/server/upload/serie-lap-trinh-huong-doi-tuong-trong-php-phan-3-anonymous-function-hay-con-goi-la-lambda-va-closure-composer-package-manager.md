## Lời mở đầu
Sau một tuần tu luyện tự cảm thầy nội công của mình đã có chút tiến bộ, tại hạ xin được phép luận bàn một chút về vấn đề anonymous function hay còn gọi là lambda và Closure, cộng với một chút ngoài lề về composer package manager tại phần 3 của bài viết với các hạ :). Cảm ơn tất cả mọi người đã đồng hành với mình qua các bài viết đã qua, mong các bạn sẽ tiếp tục đóng góp ý kiến để mình hoàn thiện serie, không dài dòng nữa chúng ta cùng đi vào nội dung thôi.
## Nội dung

### 1. Tìm hiểu về Composer package manager

**Composer là gì?**

**Composer** là một **Dependency Management** trong PHP, bạn chỉ cần khai báo nó, **composer** sẽ tự động tải code của các thư viện, tạo ra các file cần thiết vào project của bạn, và update các thư viện nếu cần. Có thể nói **composer** giúp các bạn quản lý và kiểm soát các thư viện mà bạn sử dụng trong dự án, khi nói đến đây các bạn sẽ dễ liên tưởng đến lệnh npm trong node js hoặc một số lệnh khác. Văng, không sai đây là một công cụ tương tự như thế được sử dụng trong php

**Cài đặt composer**

Bạn chạy lệnh:
```js
curl -sS https://getcomposer.org/installer | php
```
Câu lệnh sẽ tạo cho bạn một file composer.phar, bạn chú đến dường dẫn nhé :) lên truy cập vào thư mục hiện tại của mình bằng câu lệnh: `cd <đường_dẫn_path_của_bạn>`Bạn lên đưa file composer.phar vào thư mục bin để cài đặt một cách global để có thể sử dụng ở bất kỳ folder nào mà bạn muốn, câu lệnh sẽ là:
```js
sudo mv composer.phar /usr/local/bin/composer
```
Đây là câu lệnh trong linux :)) nếu các bạn sử dụng các hệ điều hành khác thì có thể tìm hiểu những cách khác nhé, mình thấy trên mạng hỗ trợ rất nhiều. Ok bây giờ ở bất kỳ thư mục bạn chỉ cần gọi composer là được !!! Nhưng các bạn nhớ chú ý cài đặt php trước nhé :)

**Những điều cần biết về composer.json và composer.lock**

Đây là 2 file quan trọng nhất của **composer**. Đầu tiên ta sẽ đi vào **composer.json**: Là nơi khai báo những dependencies dùng trong project, những thông tin về tên, phiên bản, ...Mình sẽ lấy 1 ví dụ tại project của mình để các bạn dễ hình dung nhé :)
```js
{
"name": "laravel/laravel",
"description": "The Laravel Framework.",
"keywords": ["framework", "laravel"],
"license": "MIT",
"type": "project",
"require": {
   "php": ">=7.0.0",
   "fideloper/proxy": "^4.0",
   "laravel/framework": "5.5.*",
   "laravel/tinker": "~1.0",
   "nicolaslopezj/searchable": "^1.11"
},
...
}
```
Ở đây bạn chú ý phần **require** ở đây mình đã mặc định tải php 7.0 và laravel là 5.5 các bạn nhớ chú ý nhé, vì ví dụ nếu là laravel 6.0 thì các bạn cần cài PHP 7.2. Tiếp theo trong project của bạn thực hiện chạy lệnh `composer install` thì nó sẽ đưa tất cả dependencies vào project và thực hiện các công việc tiếp theo

Tiếp theo là **composer.lock** là nơi lưu trữ thông tin về dependencies đã được cài đặt. Ví dụ khi bạn dùng lệnh install để cài đặt lần đầu thì **composer** sẽ đọc thông tin về dependencies ở trong file **composer.json**, sau đó cài đặt và tạo ra file **composer.lock** để lưu thông tin cụ thể về những dependencies đó. Giả sử bạn commit cả 2 file **composer.json** và **composer.lock** vào version control của mình, rồi bất cứ người nào tải code về thì dù có cài đặt vào thời điểm khác nhau đi chăng nữa thì vẫn sẽ nhận được những dependencies với những version giống nhau, do nó được đọc từ file** composer.lock**, chứ không phải file **composer.json**
## 2, Thế nào là anonymous function hay còn gọi là lambda

**Lambda là gì ?**

**Lambda** là một **anonymous function** (hàm ẩn danh) nó có thể khai báo,định nghĩa ở bất kỳ đâu và không có khả năng tái sử dụng. **Lambda** chỉ tồn tại trong phạm vi của biến mà nó được định nghĩa, vì vậy nếu như biến đó vượt ra ngoài phạm vi thì hàm này cũng không còn tác dụng nữa, nó thường được dùng để gán vào biến, hay được gán vào hàm, class như một tham số.
Hay được định nghĩa một cách đơn giản là một hàm không có tên, ví dụ cú pháp của nó đơn giản như sau:
```js
function (){
   echo "hello";
}
```
Vậy nếu một hàm mà không có tên thì chúng ta phải gọi hàm này ra như thế nào. Thực ra ta có thể gán nó với một biến
```js
$hello = function () {
   return "Hello world";
};

// gọi hàm ẩn danh
echo $hello();
```
hoặc có thể truyền vào như một tham số
```js
function show($mess)
{
   echo $mess();
}
echo show(function (){
   return "Hello word!!!";
});
```
**Vậy tại sao chúng ta cần dùng lambda?**

Thông thường, chúng ta sẽ cần một hàm để làm một công việc, nhưng nó không có nghĩa là chúng ta sẽ dùng nó trong phạm vi global. Thay vì có một hàm sử dụng một lần và sau đó bỏ đi để nó ở đó, chúng ta có thể sử dụng một Lambda để thay thế
tất nhiên, chúng ta có thể sử dụng chức năng create_function trong PHP. Điều này về cơ bản là giống nhau:
```js
// tạo một create_function
$hello = create_function('', 'echo "Hello World!";');

// gọi function ra
$hello();
```
Chú ý !!!: Khi các bạn gọi một hàm ẩn danh nhớ chú ý đến dấu () sau nó nhé, như ở trên mình có gọi $mess(). Các bạn sẽ đặt câu hỏi tại sao một biến lại cần có dấu ngoặc giống 1 method vậy phải không nào !!!, thực ra dù chúng ta có gán nó cho một biến thì bán chất nó vẫn là 1 object các bạn có thể sử dụng `var_dump()` để thấy rõ điều này vì thế nên nếu bạn cố gắng hiển thị thông thường thì sẽ không được nhé :)
## 3. Tìm hiểu về Closure

**Closure là gì?**

Thực ra thì một **closure** cũng là một **lambda**, nhưng **closure** có thêm chức năng là có thể sử dụng các biến bên ngoài phạm vi mà nó được tạo ra


Cú pháp để khai báo một closure là:
```js
function (argument) use (scope)
{
	//code
}
```
Trong đó: **argument** là các biến bạn muốn truyền vào một **closure** và **Scope** là danh sách các biến phía ngoài **closure** mà bạn muốn sử dụng trong **closure**. Ví dụ
```js
$use = "Mr.bin";

$closure = function ($hero = "supper man") use ($use){
   echo "$hero Xin chao $use";
};

$closure();
```
Ví dụ sẽ trả về kết quả `supper man xin chao Mr.bin`. Nếu giả sử bạn thay đổi giá trị của `$use` trong **closure** thì nó sẽ không thay đổi giá trị gốc. Vậy trường hợp bạn muốn cập nhập giá trị gốc thì sao nhỉ, ok chúng ta cùng tìm hiểu bằng ví dụ nào. 

**Chú ý !!!** (& là con trỏ tham chiếu trong PHP, nếu bạn thắc mắc tham chiếu là gì thì tham chiếu có thể hiểu là bạn đang truy cập đến vùng nhớ của biến đó chứ không còn là gán đơn thuần)
```js
$use = 1;

$closure = function () use ($use){
   return $use++;
};

$closure();
echo $use;
```
Nếu bạn chạy ví dụ này thì `$use` vẫn dữ nguyên giá trị đúng không ạ. Nhưng nếu
```js
$use = 1;

$closure = function () use (&$use){
   return $use++;
};

$closure();
echo $use;
```
Bây giờ các bạn có thể thấy `$use` đã thay đổi lên 2 rồi đúng không ạ. Các bạn nhớ được từ khóa tham chiếu là thành công rồi :)

Tiếp theo để tăng độ khó lên hơn một chút nữa chúng ta sẽ cùng sử dụng một số hàm callback xem có chuyện gì diễn ra nhé. Ở đây mình sẽ thử với hàm `array_walk()` dành cho một số bạn không biết thì hàm này đi qua tất cả vị trí trong mảng và thực hiện một nhiệm vụ do chúng ta đặt ra
```js
$use = ['Mr.bin','Supper Man','BatMan'];

array_walk($use,function ($name){
  echo "Xin chao $name <br>";
});
```
VÌ **closure** vẫn là một hàm ẩn danh lên nó cũng có thể sử dụng các biến ngoại vi tương tự như một **lambda** bằng cách sử dụng từ khóa `use`
```js
$numbers = [1, 2, 3, 4, 5, 6];
$multiplier = 10;

array_walk($numbers, function ($numbers) use ($multiplier) {
   echo $numbers * $multiplier . "<br>";
});
```
 Như ví dụ trên chúng ta có thể thấy thì các hàm **lambda** và **closure** rất mạnh mẽ đúng không ạ, và bạn biết rằng nếu bạn muốn viết một hàm nhân hay gì đó tương tự mà chỉ muốn sử dụng một lần thì nó rất hữu hiệu. Việc sử dụng **Lambda** và **Closure** để thực hiện các công việc nhỏ mà không làm ảnh hưởng đến **namespace** của dự án và đặc biệt sử dụng rất tốt trong **callback** :)
 
##  4. Tìm hiểu về Callable/Callbacks

Trong php, callback là một function object/reference có kiểu callable. Callable/callbacks có thể hoạt động như một function, object method và class static method. Đầu tiên ở đây mình sẽ cùng tìm hiểu về **standard callback** trước nhé

**standard callback**: Trong php, các hàm có thể được gọi bằng `call_user_func()` trong đó đối số là tên của hàm được gọi, các bạn có thể tham khảo ví dụ ở [đây](https://www.php.net/manual/en/language.types.callable.php)

Hàm `is_callable ()` là một hàm sẵn có trong PHP, Xác minh rằng nội dung của một biến có thể được gọi là một hàm. Điều này có thể kiểm tra xem một biến đơn giản có chứa tên của hàm hợp lệ hay một mảng chứa đối tượng và tên hàm các bạn có thể tham khảo ví dụ ở [đây](https://www.php.net/manual/en/function.is-callable.php)
##  Tạm kết

Bài viết cũng tương đối dài và nhiều từ khóa rồi vậy lên tại hạ xin được phép hẹn lại ở bài sau, chân thành cảm ơn các hạ đã theo dõi. Tới đây đã kết thúc phần 3 mong rằng các hạ đã có những hiểu biết ổn để tu luyện, nếu các hạ có thăng tiến thần kỳ trong nội công hay có gì thú vị đừng ngần ngại chia sẻ cho bần đạo nhé :). Trong phần cuối tại hạ xin được trình bày về magic method mong được sự ủng hộ của các hạ nhé :v