Tiếp tục với loạt bài hướng dẫn tìm bug wodpress plugin thì trong phần 3 này mình sẽ chia sẻ cách mình tìm lỗi SQL injection. Ngoài lỗi này ra mình còn tìm các lỗi khác nữa và sẽ viết bài chia sẻ nếu có dịp :v. Nếu đây là lần đầu tiên biết đến wordpress mình khuyên nên bổ sung kiến thức trước khi đọc tiếp.

+ [Phần 1](https://viblo.asia/p/LzD5dabeKjY): Tổng quan wordpress và cách sử dụng cơ bản.
+ [Phần 2](https://viblo.asia/p/Qpmley7Vlrd): Tổng quan wordpress plugin. 

Khi xem các báo cáo trên trang [wpscan.com](https://wpscan.com) mình thấy rằng hầu hết là lỗi XSS.

![](https://images.viblo.asia/b9f2c7c2-e6f2-4ddb-9eba-225ed821119e.png)

Trên hình là giao diện mới của wpscan nhìn đẹp so với giao diện trước đây. Nhưng giao diện trước đây lỗi được hiển thị theo thời gian nên dễ dàng biết được các lỗi mới được submit. Còn như bây giờ thì lỗi được nhóm theo chữ cái nên không tiện cho việc theo dõi các lỗi mới.

Để kiếm ví dụ cho bài viết này mình lấy lại những lỗi mình đã tìm được trước đây. Mình vào trang wpscan và tìm kiếm với tên của mình.

![](https://images.viblo.asia/cc043295-69da-4a98-9478-054694520342.png)

Các lỗi mình tìm chủ yếu là SQL injection, XSS và bypass upload file. Ngoài danh sách lỗi ở trên thì mình còn nhiều lỗi khác nữa mà không submit lên trên wpscan :v. Các bạn có thể xem video khai thác và từ đó thực hành tìm lỗi và POC lại :>.

+ Link POC: https://drive.google.com/drive/folders/1RYdxffPVSgIBOCWGwb94Ul2DKdKYVvYI?usp=sharing

Sau khi xem lại các lỗi mình đã tìm, mình quyết định chọn **Ajax Load More < 5.3.2 - Authenticated SQL Injection** làm ví dụ cho bài hôm nay. Có lẽ sẽ có một vài bạn thắc mắc là tại sao mình lại chọn cái này?

Lý do đơn giản là đây là lỗi đầu tiên mình tìm được =)). 

Đầu tiên mình vào xem chi tiết của lỗi.

![](https://images.viblo.asia/e6bee61c-57ac-453b-a0fd-7ff85037c784.png)

Phần mô tả cũng không có gì nhiều mà chỉ nói khai thác ở param nào và có 2 video POC là hết. Sau khi xem lại mình cũng đã nhớ mang máng nó là cái gì rồi. Giờ đến phần bắt tay đi vào tìm lỗi thôi.

# Tải source code
Do wordpress plugin là open source nên mình có thể tải về để nghiên cứu. Với tiêu đề lỗi là **Ajax Load More < 5.3.2 - Authenticated SQL Injection** có nghĩa là plugin **Ajax Load More** bị lỗi **SQL injection** ở version nhỏ hơn **5.3.2**. Với những thông tin như trên mình sẽ tải source code tương ứng về.

Đầu tiên mình vào [wordpress.org](https://wordpress.org/) và vào mục **[Plugins](https://wordpress.org/plugins/)**,

![](https://images.viblo.asia/89d5111f-462e-4e8e-ad37-17a45448a261.png)

Và tìm kiếm với từ khóa **Ajax Load More** sẽ được kết quả như hình dưới.

![](https://images.viblo.asia/e0a2e817-1e94-494a-9961-c20db056f62f.png)

Chọn vào plugin đó sẽ ra trang tải plugin mới nhất.

![](https://images.viblo.asia/5ff3fa6a-4b15-4fd2-825f-a53c986299e2.png)

Nhưng mình sẽ không tải plugin mới nhất này về vì nếu tải về thì đồng nghĩa với việc lỗi đã được vá rồi. Nên mình sẽ xuống phía dưới một chút và có nút **Advanced View** từ đây mình sẽ tải phiên bản có lỗi mình đã tìm được.

![](https://images.viblo.asia/b2625965-afea-471f-87e2-716131c482d7.png)

Sau khi chọn vào **Advanced View** xuống dưới cùng của trang chọn phiên bản có lỗi và tải về.

![](https://images.viblo.asia/c6a03ffa-df66-4ed6-ac8c-91ca4a43fc55.png)

Tải source code về và giải nén ra ta được folder như hình dưới.

![](https://images.viblo.asia/7acf0e1b-f0e5-4bb3-a941-db2d3a56022c.png)

Cuối cùng là mở folder vừa giải nén được với **visual code**. Nếu chưa có **visual code** thì có thể thay thế bằng sublime text cũng được hay bất cứ cái gì có thể cho phép tìm kiếm REGEX trong một folder.

![](https://images.viblo.asia/ab78f036-abe2-4f54-ba62-bbdfbfc09f86.png)

# Tìm lỗi
Sau khi đã chuẩn bị đầy đủ các thứ cần thiết bây giờ đã đến lúc tìm bug rồi. Trước khi đi vào các bước cụ thể mình sẽ chia sẻ về phương pháp tìm bug của mình trước để các bạn có thể nắm được tổng quan.

> Phương pháp tìm bug của mình là sử dụng **REGEX** để tìm ra các hàm có khả năng bị lỗi. Sau đó trace ngược lại xem hàm đó được gọi từ đâu và làm cách nào gọi hàm đó từ giao diện web.

## REGEX tìm lỗi SQL injection
REGEX để tìm lỗi SQL injection thì có khá nhiều và hiệu quả cũng khác nhau tùy từng trường hợp. Không có REGEX nào là tốt nhất nên dùng cái nào thì do mình chọn cho phù hợp với hoàn cảnh. Dưới đây mình có liệt kê và đoạn REGEX, trong đó có cái của mình có cái mình xin được từ người anh TL của mình :v.

```php
(?<!prepare)\(('|")SELECT.+FROM.+('|").*\..*
```

```php
(?<!prepare)\([\s\n'"]*(SELECT|UPDATE|DELETE)\s*([^;]+\n)*.*\$_(POST|GET|REQUEST)
```

```php
(SELECT|UPDATE|DELETE)\s([^;]+\n)*.*\$_(POST|GET|REQUEST)
```

```php
\([\s\n'"`]*(SELECT|UPDATE|DELETE)\s([^;]+\n)*.*\$_(POST|GET|REQUEST)
```

Ngoài những đoạn này ra vẫn còn nhiều nhiều nữa tùy cách mọi người chế biến. Với mình, để giảm số lượng kết quả tìm kiếm mình sẽ chia `SELECT`, `INSERT`, `DELETE` riêng ra để đọc cho dễ.

Từ ý tưởng đó mình viết riêng cho mình đoạn REGEX sau:
```php
('|")[\s\n]*SELECT[^;]+\$_(POST|GET|REQUEST)
('|")[\s\n]*SELECT[^;]+\$
```

## Tiến hành tìm lỗi
Đầu tiên mình tìm lỗi mà khi REGEX có kết quả thì khả năng bị lỗi là cáo nhất. Đó là sử dụng đoạn REGEX
```php
('|")[\s\n]*SELECT[^;]+\$_(POST|GET|REQUEST)
```

![](https://images.viblo.asia/fe47b368-6608-4466-ba10-1d321cac39d3.png)

Với đoạn này không cho ra kết quả gì. Không sao cả, các cụ có câu: *Thua keo này ta bày keo khác*. Đoạn REGEX trên không được ta sử dụng tiếp đoạn thứ 2.
```php
('|")[\s\n]*SELECT[^;]+\$
```

![](https://images.viblo.asia/9b2d4a9e-0690-4882-898d-3f9d599f7109.png)

Với đoạn REGEX này ta thu được 6 kết quả, đây là số lượng rất ít từ đó giảm thời gian đọc và phân tích của mình. Khi nhìn vào các kết quả vừa thu được mình nhận ra rằng thực ra chỉ có một kết quả cần phải kiểm tra. Các bạn có nhìn thấy không? Đó là kết quả mà trong câu truy vấn có chứa biến (chứa biến thì mới có khả năng người dùng kiểm soát được giá trị của câu truy vấn).

![](https://images.viblo.asia/4c553157-4019-42da-873f-0b6e4e063bfc.png)

Chính là câu truy vấn này là câu ta cần phân tích kỹ càng.

Đến đây, chắc sẽ không ít bạn thắc mắc tại sao 3 kết quả đầu cũng chưa biến mà không phân tích?

Đây là câu hỏi rất hay, mình không phân tích là do biến `$wpdb` là object của wordpress core nên mình không phân tích nó nữa.

Chắc sẽ có bạn nói tiếp: nhỡ đâu... :v. Cái này dành cho bạn =))

Rồi, tiếp tục mình sẽ đi vào kết quả cuối cùng để phân tích xem nó có thực sự bị lỗi không.

![](https://images.viblo.asia/b76c81e0-9296-408a-a4e4-2d4803e0da27.png)

Đầu tiên, khi nhìn vào đoạn code được high light thì nghĩ rằng có thể có lỗi. Mình đặc biệt vào biến `$n` và tìm xem biến này được lấy từ đâu. Nhìn lên trên một tí tại dòng **1244** trong `ajax-load-more/admin/admin.php` thì biến `$n` được gán bằng `Trim(stripslashes($_POST["repeater"]))`.

+ `stripslashes`: Loại bỏ dấu `\`.
+ `Trim`: Loại bỏ khoảng trắng.

Đây thì thì mình rất chắc chắn và tin rằng lỗi có thể xảy ra. Tiếp theo là làm sao để gọi được hàm này trên web. Lên trên một tí mình thấy rằng code được bao bởi hàm `alm_update_repeater`. Mình lại tìm cum từ này trong source code xem có nơi nào gọi đến không.

![](https://images.viblo.asia/0856774f-f7e4-4850-8bd4-c144ce603a80.png)

Nếu các bạn đã đọc [phần 2](https://viblo.asia/p/Qpmley7Vlrd) thì các bạn cũng biết trong wordpress sử dụng hook để tương tác qua lại giữa các thành phần. Phần khoanh đỏ trong ảnh trên là đăng ký một sự kiện **ajax**.

![](https://images.viblo.asia/12e7e3d7-9010-471a-ba6c-6518c1563167.png)

Mỗi khi có ajax được gọi với ajax là **alm_update_repeater** thì hàm `alm_update_repeater` sẽ được kích hoạt.

OK! Vậy là mình đã hiểu sơ sơ về cách gọi hàm này ra. Bây giờ mình sẽ copy folder này vào thư mục `/var/wwww/html/wordpress/wp-content/plugins/` để chạy trên mội trường mình đã cài đặt từ [phần 1](https://viblo.asia/p/LzD5dabeKjY).

![](https://images.viblo.asia/01783843-b330-4e6a-bc22-8b57cb3a4b0e.png)

Sau khi copy xong vào mục plugins trên web để kiểm tra và bật nó lên.

![](https://images.viblo.asia/5fd3371a-0d2c-4bf4-9d21-bdd596f6c4fa.png)

Sau khi bật lên bên trái sẽ có menu của plugin.

![](https://images.viblo.asia/27a37086-e47e-46cf-8c25-6f088c42cbd6.png)

Đến đây, mình phát hiện có dòng chữ quen quen **Repeater Templates**. Trong khi hàm mình cần tìm là `alm_update_repeater` vậy là mình đã vào xem thử có tính năng nào liên quan đến **update** không. Và mình phát hiện ra trong phần **Options** có update :v.

![](https://images.viblo.asia/1fc022d1-de62-4070-91da-6647141bf929.png)

Tiếp đến mình kiểm tra lại xem đó có phải đúng là endpoint mình cần tìm không.

![](https://images.viblo.asia/76890090-083f-4d31-9e51-8a322aa21909.png)

Đúng nơi mình cần tìm đây rồi. Việc còn lại là tiến hành khai thác thôi. :')

Có một điểm cần lưu ý đó là tại dòng **1252** nếu biến `$t` có giá trị là **default** thì biến `$n` được gán lại bằng **default** dẫn đến việc không khai thác được.

![](https://images.viblo.asia/4715706e-4d77-4a35-82ab-45013c776e3a.png)

Kết quả sau khi khai thác với **sleep(5)**

![](https://images.viblo.asia/be4804b8-3941-4ace-8fd7-b3e84e0693c1.png)

Phần 3 hướng dẫn tìm bug wordperss plugin xin dừng ở đây. Nếu có dịp mình sẽ viết tiếp loạt bài này với các lỗi khác và các chú ý khi tìm bug.

Cảm ơn các bạn đã theo dõi!