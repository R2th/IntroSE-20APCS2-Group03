# Regular Expression là gì?
Biểu thức chính quy (tiếng Anh: regular expression, viết tắt là regexp, regex hay regxp) là một chuỗi miêu tả một bộ các chuỗi khác, theo những quy tắc cú pháp nhất định.
Đơn giản thì nếu bạn cần validate các trường nhập vào ô input bạn có thể dùng regex, bạn muốn tìm kiếm một chuỗi với các điều kiện tùy chỉnh bạn có thể dùng regex,....
# Học cách sử dụng Regular Expression?
Mình thường sử dụng trang [regex101.com](https://regex101.com/) để học, và test các đoạn regex, ngoài ra còn một số trang khác như:
1. [https://regexr.com/](https://regexr.com/)
2. https://www.regexpal.com/
3. http://rubular.com/

Bạn có thể chọn 1 trang phù hợp để thực hành.
# Các quy tắc cơ bản
| Quy tắc | Mô tả | Ví dụ |
| -------- | -------- | -------- |
| [abc]     | Tìm và so sánh tất cả các ký tự trong dấu ngoặc vuông và trùng với 1 trong các ký tự trong dấu ngoặc  |viblo => vi**b**lo     |
|[a-z]|Tìm và so sánh theo khoảng giá trị, a-z sẽ trùng với các ký tự từ a đến z hoặc [A-C] sẽ trùng với các ký tự hoa từ A đến C tương tự với [0-9] |viblo => **viblo**|
|[^abc]|So sánh không trùng khớp, dấu ^ giống như dấu phủ định vậy|viblo => **vi**b**lo**|
|^v| Trùng khớp với phần đầu của chuỗi|viblo => **v**iblo|
|o$|Trùng khớp với phần cuối của chuỗi|viblo => vibl**o**|
|*|Cho phép kí tự trước nó lặp lại 0 lần hoặc nhiều lần |viblooooo* => **viblooooo**|
|+|Cho phép kí tự trước nó lặp lại 1 lần hoặc nhiều lần |o+ => vibl**oooo**|
|?|Cho phép kí tự trước nó lặp lại 0 lần hoặc 1 lần duy nhất |o? => vibl**o**|

Ngoài ra còn nhiều quy tắc khác bạn có thể tham khảo ở đây https://developer.mozilla.org/vi/docs/Web/JavaScript/Guide/Regular_Expressions

# Ví dụ thực hành
## Validate email
Đầu tiên thì mình có một số yêu cầu đối với một email hợp lệ là:
* Địa chỉ email phải bắt đầu bằng 1 ký tự
* Địa chỉ email là tập hợp của các ký tự a-z, 0-9 và có thể có các ký tự như dấu chấm, dấu gạch dưới
* Độ dài tối thiểu của email là 5, độ dài tối đa là 32
* Tên miền của email có thể là tên miền cấp 1 hoặc tên miền cấp 2

Từ các yêu cầu trên ta có thể đi viết mã regex để so khớp:
* Địa chỉ email phải bắt đầu bằng 1 ký tự
```
^[a-z]
```
* Địa chỉ email là tập hợp của các ký tự a-z, 0-9 và có thể có các ký tự như dấu chấm, dấu gạch dưới
```
^[a-z][a-z0-9\.\_]
```
* Độ dài tối thiểu của email là 5, độ dài tối đa là 32
```
^[a-z][a-z0-9\.\_]{5,32}
```
* Tên miền của email có thể là tên miền cấp 1 hoặc tên miền cấp 2
```
^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$
```
Bạn có thể xem demo ở đây https://regex101.com/r/MVUhMV/1
## Lấy link ảnh khi crawl dữ liệu
Mình có một đoạn text sau để test:
```
<img src="http://abc.png">
<img src='http://abc.png'>
<img src='https://abc.png'>
<img src='http://abc.png'/>
<img src='http://abc.jpg'>
<img class="abc" src='http://abc.jpeg'>
```
Mục tiêu của mình chỉ là lấy tất cả ký tự bên sau src= và mình có mã regex sau:
```
<img.*src='?"?(.*?)'?"?\/?>
```
Nhìn nó hơi cùi ^^. Bạn có thể xem demo ở đây https://regex101.com/r/A0yt4i/1/
# Kết luận
Ứng dụng của Regular Expression có rất nhiều và việc tìm hiểu nó sẽ giúp bạn dễ dàng hơn rất nhiều khi cần xử lý chuỗi, bạn có thể tự đặt ra các yêu cầu để thực hành và làm chủ được Regular Expression tốt hơn, chúc bạn học tập làm việc thật tốt ^^