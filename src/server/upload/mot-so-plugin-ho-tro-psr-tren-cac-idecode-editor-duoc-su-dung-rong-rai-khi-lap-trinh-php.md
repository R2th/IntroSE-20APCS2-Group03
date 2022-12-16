Mình đã định chấm dứt vụ [PHP Standard Recomendations](https://viblo.asia/s/chuan-viet-code-php-theo-php-fig-aGK7jNNb5j2) ở sau bài [PSR-17](https://viblo.asia/p/psr-17-cac-http-factory-6J3ZgOOgZmB) rồi, nhưng mà như đã đề cập mô tả series, phần lớn các lập trình viên thì đều dùng đến cùng lắm là 4 cái [PSR-1](https://viblo.asia/p/psr-1-chuan-viet-code-co-ban-1Je5EjJjKnL), [PSR-2](https://viblo.asia/p/psr-2-huong-dan-mau-code-dep-aWj53OpG56m), [PSR-3](https://viblo.asia/p/psr-3-cac-logger-phai-trong-ra-sao-RnB5pXyw5PG) và [PSR-4](https://viblo.asia/p/psr-4-trinh-tai-tu-dong-07LKXNxJlV4)(mình thì mang tiếng dịch đủ thế thôi nhưng cũng chịu chả hiểu mấy chuẩn không phải 4 cái kia(yaoming), cùng lắm là hiểu rõ 1 cái HTTP Message cấu tạo ra sao ở [PSR-7](https://viblo.asia/p/psr-7-interface-cua-cac-thong-diep-http-LzD5dBWYZjY) thôi (yaoming)). Cùng lắm 1 số công ty như Fra.... nào đó xây dựng bộ CI thì chắc là sẽ dùng hết cả 10 chuẩn được chấp nhận ở series mình đề cập trên. Và dù có chỉ là 4 chuẩn nhưng tiểu tiết cũng khá lằng nhằng. thỉnh thoảng code cũng bị tiểu tiết gõ nhầm phát ai mà đúng hết được. Mà gõ sai thì chắc chắn phải sửa. Ôi sửa tay sao? Thật là cảm giác sung sướng :v Và đó là lý do mình lưu lại 1 số plugin dành cho các IDE/Code Editor để code PHP 1 cách nhanh chóng và đúng chuẩn
# Visual Studio Code
Đầu tiên là code editor mình đã và đang sử dụng cho từ Javascript cho tới PHP hay Ruby. Hiện tại thì rất đau đớn cái plugin đc dùng nhiều nhất là cái bug to đùng nhất và đánh giá có 3.5 sao. Và cái ít phổ biến hơn nhưng chắc chắn hoạt động ngon là cái này: 

![](https://images.viblo.asia/653fd2cf-dfce-4dac-9c94-60fd0aa24781.jpg)

Nè mình cài nó ko phải vì em char manga style kia đâu nhá =)) (ôi hay là gọi em ấy là waifu nhỉ =)) có thánh nào muốn lập hội cùng không :v ) Mà thực sự khá rõ ràng về status của plugin(tất cả các mục đều pass, rating cao). Mặc định để format code sau khi cài plugin là ctrl+shift+i. Khá dễ dàng để sử dụng.
# Sublime Text
![](https://images.viblo.asia/dbf6a507-c8ac-41cb-a800-ce027b1142ed.jpg)

Chúng ta sẽ có gói `sublime-phpcs`. Link của gói ở [đây](https://benmatselby.github.io/sublime-phpcs/). Để cài đặt gói này chúng ta sẽ chạy những lệnh sau: 
```
$ cd ~/Library/Application\ Support/Sublime\ Text\ 2/Packages/
$ git clone git://github.com/benmatselby/sublime-phpcs.git Phpcs
```
Và thế là xong.
# Atom
![](https://images.viblo.asia/e9f3868c-eb50-4301-8b45-f51ea62f3f42.jpg)

Atom sử dụng gói `php-fmt`.

Link của gói: https://atom.io/packages/php-fmt.

Hình ảnh tham khảo của gói khá tường minh, rõ ràng và cách cài đặt cũng rất cẩn thận và dễ dàng
# Netbeans và các IDE/Code Editor khác
Tất cả mấy ông đấy đều dùng `php-cs-fixer` cả(mà thực ra mình thấy 2 ông trên cũng dùng được. Cơ mà sau hồi test thử thấy 2 plugin trên tiện hơn). Với Netbeans thì chỉ cần tìm gói ở trang chủ rồi click click là xong. Mỗi IDE/code editor khác nhau sẽ có cách cài khác nhau. Link của plugin ở [đây](https://github.com/FriendsOfPHP/PHP-CS-Fixer).
# Kết
Bài này viết hơi cụt và chỉ là cái tip nho nhỏ. Thế nên nó hơi ngắn và thiên vị 1 vài cái hơi thái quá.... Tuy nhiên thì mình cũng vẫn ghi lại để note và đồng thời cũng để teammate cũng nhóm của mình ghi nhớ trong các trường hợp cần cài lại hoặc cài editor khác. Bài viết này cũng đang đc public vào dịp 20/10 mà nên phải ưu ái teammate nữ.

À chúc các thành viên nữ của cộng đồng Viblo 20-10 vui vẻ và hạnh phúc.