# Giới thiệu chung
BugBountyHunter là 1 trang ứng dụng web miễn phí cho phép ta tìm hiểu về các lỗ hổng bảo mật dựa trên các phát hiện thực tế được phát hiện trên các chương trình BugBoungty. Tại đây sẽ có những challenges từ dễ đến khó để chúng ta khai thác. Những thách thức này nằm trên [BugBountyHunter.com](https://www.bugbountyhunter.com/training/)
Phần này mình sẽ làm về khai thác lỗi XSS từ mức easy đến medium.

# 1. Bug_bounty_training: Can you find any XSS on this "harmless" page?
link: [https://www.bugbountytraining.com/challenges/challenge-8.php](https://www.bugbountytraining.com/challenges/challenge-8.php)

### a. Giới thiệu:
Yêu cầu bài này muốn ta thực hiện khai thác reflected xss trên trang web và chạy lệnh alert().
Vì đây là bài xss đầu tiên nên khá đơn giản. Ta chỉ cần đọc code và suy ra là được

### b. Khai thác:

[![Screenshot-from-2021-01-08-13-55-26.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-13-55-26.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-13-55-26.png)

Vào trang hiện tại thì không thấy có gì. Ta thử vào xem source code xem sao:
[![Screenshot-from-2021-01-08-13-55-31.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-13-55-31.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-13-55-31.png)

Ta thấy có 1 đoạn code javascript. Ta sẽ đi phân tích đoạn code trên. Về cơ bản, trước hết đoạn code trên sẽ lấy giá trị của 4 biến:
`cfpPid, cfpPrBase, cfpClick, cfpOrd` tại các dòng từ 82 đến 85. tạo thành 1 url. Sau đó được truyền vào biến `pr_s` tại dòng 105. Cuối cùng thực hiện đọc ra biến `pr_s` tại dòng 106 với document.write. Vì trang này không thực hiện kiểm tra đầu vào nên ta hoàn toàn có thể sử dụng các biến trên để khai thác xss. Chú ý đoạn document.write sử dụng dấu `'` trong script nên khi thoát thẻ scrip thì ta cũng dùng dấu `'`. Ta có thể sử dụng biến `n` hoặc `clk` đều được:
Thực hiện truyền vào url như sau:
```https://www.bugbountytraining.com/challenges/challenge-8.php#clk='></script><script>alert(1)</script>```
hoặc: 
```https://www.bugbountytraining.com/challenges/challenge-8.php#n='></script><script>alert(1)</script>```

Ta được:

[![Screenshot-from-2021-01-08-14-15-36.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-14-15-36.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-14-15-36.png)

Vậy là khai thác xss thành công.
# 2. Bug_bounty_training: Change the class of our image and pick your favourite!

link: [https://www.bugbountytraining.com/challenges/challenge-2.php](https://www.bugbountytraining.com/challenges/challenge-2.php)
### a. Giới thiệu:
Yêu cầu bài này là muốn ta khai thác được reflected xss và chạy lệnh alert().
Đây là 1 bài xss + csrf. Bài này ta sẽ chạy self xss trước rồi dùng csrf để chuyển sang cho user.
### b. Khai thác:

[![Screenshot-from-2021-01-08-12-57-47.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-12-57-47.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-12-57-47.png)

Trang khai thác là 1 ứng dụng cho phép ta thay đổi style image. Phương thức sử dụng là POST. Nên ta sẽ dùng burp suite để bắt request.

[![w2LScreenshot-from-2021-01-08-12-59-23.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/w2LScreenshot-from-2021-01-08-12-59-23.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/w2LScreenshot-from-2021-01-08-12-59-23.png)

Request sử dụng phương thức POST với biến là: `imageClass`. Tại response, giá trị của biến này được truyền vào 1 thẻ img để lấy style ảnh tương ứng. Trước hết ta nghĩ đến việc thoát khỏi thẻ và chạy thử script alert():
Thêm giá trị cho biến `imageClass="><script>alert(1)</script>` ta được:

[![Screenshot-from-2021-01-08-12-59-59.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-12-59-59.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-12-59-59.png)

Để ý tại response ta đã thoát được ra khỏi thẻ img, tuy nhiên ký tự `<` lại bị filter mất, không thể chạy script bên ngoài được. Vậy chỉ còn 1 cách là chạy script bên trong thẻ img. Thử sử dụng onerror để khai thác:
`imageClass=" onerror="alert(1)">` ta được:

[![Screenshot-from-2021-01-08-13-00-48.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-13-00-48.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-13-00-48.png)

Tại response, event `onerror` có vẻ đã bị cho vào blacklist nên không khai thác được. Đến đây ta sẽ sử dụng xss cheat sheet của portswigger để xem thử những even nào dùng được. Bảng cheat sheet của portswigger có thể xem tại: [https://portswigger.net/web-security/cross-site-scripting/cheat-sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)

Vào trang bấm chọn `copy events to clipboard`. Tiếp tục quay lại burpsuit, tại request bấm chuột phải vào intruder. Sang bên Intruder, tại positions bấm `clear` sau đó bôi đen `onerror` và bấm `add`
[![Screenshot-from-2021-01-08-13-01-08.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-13-01-08.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-13-01-08.png)
Chuyển sang tab payloads, tại payload Options bấm paste để paste các events ở bảng cheat sheet vừa chọn sau đó bấm attack. Chờ 1 chút ta được:

[![Screenshot-from-2021-01-08-13-03-03.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-13-03-03.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-13-03-03.png)

Những events có thể sử dụng được sẽ xuất hiện tại respose nên tại bên length sẽ có giá trị nhiều hơn các event khác. Những event nằm trong khung đỏ là những event có thể sử dụng. Tại đây ta chú ý đến 2 events là `onmouseenter` và `onmouseleave`. Trong đó `onmouseenter` kích hoạt khi ta đưa con trỏ chuột vào element còn `onmouseleave` thì ngược lại. Ta sẽ sử dụng `onmouseenter` để khai thác. tại request đặt giá trị: `imageClass=" "onmouseenter=alert(1)">`. Bấm send, sau đó chuột phải chọn `show response in browser` và chọn copy. Dán url vừa lấy được lên trình duyệt ta được:

[![Screenshot-from-2021-01-08-13-05-13.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-13-05-13.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-13-05-13.png)

Vậy là khai thác thành công self xss. Giờ chỉ cần chuyển được khai thác cho user khác là được. Ta sử dụng lỗi CSRF (Cross-site request forgery). Trang trên không sử dụng csrf-token để kiểm tra xác thực người dùng mà chỉ sử dụng cookie nên ta có thể khai thác. Tại request vừa có bấm chuột phải -> Engagement tools -> CSRF POC. Ta có:

[![Screenshot-from-2021-01-08-13-46-05.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-13-46-05.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-13-46-05.png)

Đến đây ta chỉ cần copy đoạn code trên sau đó cho vào 1 trang web khai thác. Gửi url trang web cho các user muốn tấn công là thành công.

Giải thích thêm về đoạn code trên. Đoạn code trên sẽ gửi 1 request chuyển đến trang [https://www.bugbountytraining.com/challenges/challenge-2.php](https://www.bugbountytraining.com/challenges/challenge-2.php) và đính kèm mã độc chứa lệnh alert(). Khi người dùng truy cập vào trang web ta vừa gửi thì sẽ tự động được chuyển đến trang ta muốn khai thác. Tại đây trang khai thác sẽ thực hiện lấy cookie người dùng để xác thực đúng là nạn nhân đã truy cập. Khi nạn nhân thực hiện đưa con trỏ chuột vào trong tấm ảnh thì mã độc thực thi và bắn ra lệnh alert().

# 3. Bug_bounty_training: Can you find any XSS? No HTML tags allowed!

link: [https://www.bugbountytraining.com/challenges/challenge-1.php](https://www.bugbountytraining.com/challenges/challenge-1.php)

### a. Giới thiệu:

Yêu cầu bài này người ta muốn ta khai thác càng nhiều lỗi reflected xss càng tốt.
### b. Khai thác:

[![Screenshot-from-2021-01-08-14-24-15.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-14-24-15.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-14-24-15.png)

Trang cho ta 1 tính năng tìm kiếm. Thử nhập 1 giá trị bất kỳ vào và bắt request bằng burp suite:

[![4ygScreenshot-from-2021-01-08-14-27-37.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/4ygScreenshot-from-2021-01-08-14-27-37.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/4ygScreenshot-from-2021-01-08-14-27-37.png)

Trang này sử dụng phương thức GET để truyền request với biến là `query=aa`. Response trả về báo là không tìm được `aa`. Ta sẽ thử khai thác xss tại đây. Ta sẽ gõ vào url: `url=<script>alert(1)</sctipt>`. Ta được:

[![Screenshot-from-2021-01-08-14-28-04.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-14-28-04.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-14-28-04.png)

Tại response ta thấy trang đã xóa mất thẻ script nên không khai thác được. Từ tiêu đề là `No HTML tags allowed!` ta có thể nghĩ ngay đến thẻ svg. Tuy nhiên ta có thể dùng xss cheat sheet của portswigger để làm. Khai thác tương tự bài: **Bug_bounty_training: Change the class of our image and pick your favourite!**.

Vào [https://portswigger.net/web-security/cross-site-scripting/cheat-sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet) bấm chọn `copy tags to clipboard`. Tại request bấm chuột phải chọn intruder. Tại intruder bên position bấm clear. Sau đó bôi đen chữ script và bấm add:

[![Screenshot-from-2021-01-08-15-03-07.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-15-03-07.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-15-03-07.png)

Bên tab Payloads vào Payloads Options bấm paste để paste các tags vừa copy và sau đó bấm attack:

[![Screenshot-from-2021-01-08-15-04-29.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-15-04-29.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-15-04-29.png)

Ta có thể thấy được tag `svg` có thể khai thác. Thực hiện khai thác với tag `svg`, ở đây sử dụng thuộc tính onload để kích hoạt script. Truyền vào url như sau: 

`https://www.bugbountytraining.com/challenges/challenge-1.php?query=<svg/onload=alert(1)>` 

Ta được:

[![Screenshot-from-2021-01-08-15-07-36.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-15-07-36.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-15-07-36.png)

Ở đây còn 1 tag nữa ta có thể khai thác là img. sau 1 hồi tìm tòi thì cũng ra được. Truyền vào url như sau:

`https://www.bugbountytraining.com/challenges/challenge-1.php?query=<img src=x onerror='alert(1)'`

Ta cũng được:

[![Screenshot-from-2021-01-08-15-11-33.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-15-11-33.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-15-11-33.png)

Thực chất lỗi này là do ta chưa đóng thẻ img nên trang này không filter được. Ta có thể thay `img` bằng `script` vào vẫn được:

`https://www.bugbountytraining.com/challenges/challenge-1.php?query=<script src=x onerror='alert(1)'`

Vậy là khai thác thành công