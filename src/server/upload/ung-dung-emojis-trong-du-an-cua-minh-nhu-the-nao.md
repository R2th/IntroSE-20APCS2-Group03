### Đặt vấn đề
Có khi nào bạn muốn làm một notification có nhiều icon dễ thương hay một đoạn email gởi đi đầy màu sắc không. Nếu có thì hẳn các bạn đã sử dụng emojis cho dự án của mình rồi. Hy vọng bài viết sau giúp các hiểu hơn 
### Hướng dẫn sử dụng plugin emojionearea để nhập dữ liệu
Có rất nhiều plugin của jquery hỗ trợ cho chức năng này nhưng mình thấy **EmojiOne Area** hỗ trợ những icon thông dụng mà trang mạng xã hội lớn nhất đã dùng đó là FaceBook. Các bạn truy vào [GitHub EmojiOne Area](https://github.com/mervick/emojionearea) download plugin này về.
Ngoài ra bạn có thể download thông qua
```
bower install emojionearea#^3.0.0
# or
npm install emojionearea@^3.0.0
# or
composer require mervick/emojionearea ^3.0.0
```

Sau khi download xong bạn chỉ cần làm như sau:
```
<link rel="stylesheet" href="{{ asset('/css/emojionearea.min.css') }}">
<script type="text/javascript" src="{{ asset('/js/emojionearea.min.js') }}"></script>
```

Bạn nên nhớ nó chỉ phục vụ cho thẻ **textarea** mà thôi
```
<textarea id="emojis"></textarea>
<script type="text/javascript">
  $(document).ready(function() {
    $("#emojis").emojioneArea();
  });
</script>
```

Sau khi thêm đầy đủ các phần trên bạn đã có thể chạy ra giao diện sau:
![](https://images.viblo.asia/b4c353c5-4d03-431b-b801-e242fbe2cf24.PNG)

> Thật easy đúng không các bạn. Muốn tìm hiểu kỹ hơn các bạn có thể tham khảo ở đây [EmojiOne Area](https://github.com/mervick/emojionearea). Đó mới chỉ là công đoạn tạo dữ liệu để insert vào, việc lưu như thế nào mới khó. Nào hãy cùng đọc phần tiếp theo.


-----


### Làm thế nào để lưu emojis trong Database
Nhiều bạn đọc tới ngang đây chắc hẳn sẽ suy nghĩ là: `Dùng plugin thì dễ mà lưu vào DB sẽ lấy ra thì khó`. Để lưu được emojis trong DB sau đây mình xin giải thích lại cho các bạn về utf8 và utf8mb4. 

 **1. Utf8**

   UTF-8 đưa ra cho chúng ta 4 mẫu (template) để lựa chọn: mẫu 1 byte, mẫu 2 byte, mẫu 3 byte, mẫu 4 byte  Đối với mỗi template sẽ có những phần header giống nhau (đánh dấu bằng màu đỏ trong hình trên) và những vị trí mà ta có thể điền dữ liệu codepoint vào (đánh dấu bằng "x" ở phần trên). 
Template 4 byte cho phép ta lưu trữ 21 bit, tương đương với 2,097,151 giá trị khác nhau, quá dư đủ so với 128,000 codepoint hiện tại. Nên là, tương lai nếu có thêm nhiều Unicode codepoint nữa thì UTF-8 cũng dễ dàng mã hoá được.

 **2. Utf8mb4**
 
 Là một loại encoding có các đặc tính đúng UTF-8 và do đó hỗ trợ đầy đủ Unicode, bao gồm các biểu tượng astral được đặt làm charset cho Mysql thay cho Utf8 từ Mysql 5.3 trở đi.

### Hướng dẫn config Mysql để lưu emojis
Để lưu được emojis trong Database thì nó phải được charset utf8mb4. 

* **Bước 1:** Bạn nên backup lại toàn bộ data base dành cho dự án nếu nó đã hoạt động để tránh lúc bạn setting không đúng dẫn đến mất hết dữ liệu. Có rất nhiều cách để backup data. Nếu bạn dùng Wordbench thì việc đó thật easy. Bạn tự tìm hiểu nhé!
* **Bước 2:**
     - Thay đổi charest và collation database sang utf8mb4
           `ALTER DATABASE `emojis` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;`
     - Thay đổi charest và collation table sang utf8mb4
     ALTER TABLE `emojis`.users DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;
     - Thay đổi charest và collation cho column sẽ lưu emojis sang utf8mb4
     ALTER TABLE `emojis`.users MODIFY name text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL;
* **Bước 3**
   Thay đổi config về connection, client và server character 
   `SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci`
   Kiế tra xem file my.cnf
   `[client]
    default-character-set = utf8mb4

    [mysql]
    default-character-set = utf8mb4

    [mysqld]
    character-set-client-handshake = FALSE
    character-set-server = utf8mb4
    collation-server = utf8mb4_unicode_ci`
* **Bước 4:**
Restart Mysql
```
 service mysqld restart
```
* **Bước 5**: Kiểm tra config đã đúng chưa
`SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';`
![](https://images.viblo.asia/5738d8f5-6814-4929-89f7-27669d8bb738.PNG)

Nếu bạn nhập những icon shau:
![](https://images.viblo.asia/3c42f1bc-ccce-4527-9d5d-98d9dd6715ce.PNG)



-----


### Hướng dẫn lấy dữ liệu từ Database để show emojis
Đến bây giờ chắc hẳn bạn sẽ đặt ra câu hỏi thế làm sao nó show ra được những icon xinh xắn đó. Nếu ai đã biết về endcoding thì chắc cũng biết rằng nó sẽ được các brower định dạng các emojis được lấy trong DB ra và chuyển nó về những icon xinh xắn. Shau đây là thống kê về những brower nào có thể display emojis

![](https://images.viblo.asia/5a1ac58d-f202-40f0-9c05-4a2b3b629850.PNG)
-----

### Kết thúc
Tuy chủ đề này khá quen thộc với một vài người nhưng nó cũng là một bài viết hay cho người mới bắt đầu. Hy vong bạn đã hiểu và làm những trang web thật tốt.