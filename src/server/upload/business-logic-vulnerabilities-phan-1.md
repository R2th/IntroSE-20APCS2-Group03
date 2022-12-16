## I. Mở đầu
### 1. Giới thiệu

![image.png](https://images.viblo.asia/402eac8c-be11-4d3d-992c-5e4b313b289b.png)

Chắc hẳn ai ai trong số chúng ta đều đã quá quen thuộc với những cái tên như Shopee, Lazada, Tiki, ... - các trang web bán hàng, kinh doanh online. Tiếp nối sự phát triển của thời đại, những hành động mang tính "trực tiếp" như giao dịch, mua sắm, thanh toán, ... đều được thực hiện trên mạng internet. Chỉ cần ngồi tại nhà chúng ta cũng có thể lựa chọn, đặt hàng cho mình những món đồ trên khắp miền đất nước, thậm chí là toàn thế giới. Để xây dựng nên từng trang web kinh doanh, mua sắm với đa dạng các tính năng như: lựa chọn sản phẩm, sử dụng các loại voucher, thanh toán giỏ hàng, ... sẽ khó tránh khỏi những sai sót về mặt logic, dẫn tới sự sai sót trong giao dịch. Chúng ta thường gọi dạng lỗ hổng này là **Business logic vulnerabilities**.

### 2. Hậu quả mang lại từ các lỗ hổng Business logic

![image.png](https://images.viblo.asia/f5a06cbb-5390-411a-ad80-18dbfbc2a5b3.png)

Bên cạnh các hậu quả dẫn tới leo thang đặc quyền, kẻ xấu thường lợi dụng các lỗ hổng Business logic để trục lợi cho bản thân, mang lại hậu quả khôn lường cho các doanh nghiệp. Nếu ảnh hưởng của lỗ hổng nhỏ, kẻ tấn công có thể chỉ lợi dụng nó để mua sắm sản phẩm miễn phí. Nếu đó là một lỗ hổng nghiêm trọng, kẻ tấn công có thể khai thác với mục đích phá hoại quy trình hoạt động của toàn hệ thống, chuyển tiền trái phép với số lượng lớn, dẫn tới tổn thất lớn lao đến doanh nghiệp cũng như khách hàng.

## II. Các phương pháp ngăn ngừa lỗ hổng Business logic

Để phòng chống các dạng lỗ hổng Business logic, chúng ta thường tập trung vào phía nhà cung cấp dịch vụ. Qua đó, chúng ta có một số điều cần lưu ý sau:

- Các nhà phát triển sản phẩm cũng như đội ngũ kiểm tra, bảo trì sản phẩm cần hiểu rõ từng cơ chế hoạt động trong mỗi tính năng.
- Mã nguồn cần được viết rõ ràng, rành mạch, mỗi đoạn mã với vai trò riêng cần được comment chi tiết, dễ hiểu.
- Xử lý đầy đủ, chặt chẽ các trường hợp ngoại lệ xảy ra từ phía đầu vào người dùng.
- Khi phát triển các tính năng mới cho sản phẩm, cần xem xét các trường hợp đặc biệt, sự xung đột ngoại lệ có thể xảy ra khi kết hợp với tính năng cũ.
- Thường xuyên cập nhật các phiên bản mới nhất của công nghệ sử dụng, thực hiện các công việc kiểm thử, bảo trì sản phẩm đầy đủ.

## III. Phân tích khai thác một số lỗ hổng Business logic

Cái tên Business logic vulnerabilities có vẻ còn khá lạ lẫm, nhưng thực ra dạng lỗ hổng này khá gần gũi với chúng ta. Chúng thường xảy ra do các lỗi logic trong quá trình lập trình. Khác với các bài viết trước, với dạng lỗ hổng này, chúng ta sẽ trực tiếp đi vào phần phân tích và khai thác với từng dạng nhỏ hơn của loại lỗ hổng này.

### 1. Tin tưởng tuyệt đối vào các tham số có thể bị thay đổi bởi người dùng

Luôn phải ghi nhớ rằng kẻ tấn công cũng đóng vai trò là người dùng trong sản phẩm. Họ có thể chỉnh sửa các tham số trao đổi giữa server và client bằng một số công cụ (chẳng hạn như Burp Suite). Bởi vậy, chỉ nên cho phép người dùng có quyền thay đổi các tham số trong phạm vi "an toàn". Một trong những số liệu quan trọng là giá bán sản phẩm nên lấy từ trong cơ sở dữ liệu, không nên lấy giá trị từ phía client truyền lên, bởi đó có thể một giá trị đã bị chỉnh sửa.

#### Phân tích lab **[Excessive trust in client-side controls](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-excessive-trust-in-client-side-controls)**

![image.png](https://images.viblo.asia/1a99e41d-94be-4abe-8af7-3d8a6616b71b.png)

**Miêu tả:** Trang web mua sắm trên không có quá trình kiểm tra đối với tham số truyền lên từ client, dẫn đến lỗ hổng có thể mua sắm sản phẩm với giá tùy ý. Để vượt qua bài lab, chúng ta cần mua sản phẩm "Lightweight l33t leather jacket". Tài khoản hợp lệ được cung cấp: `wiener:peter`.

Đăng nhập với tài khoản `wiener:peter`.

![image.png](https://images.viblo.asia/57df8bee-b9c7-42b5-b6c8-1b76b48414c7.png)

Tài khoản có số dư trong ví là $100.00, sản phẩm "Lightweight l33t leather jacket" có giá là $1337.00. Quy trình mua một sản phẩm như sau:

- Bước 1: Vào xem chi tiết một sản phẩm (chọn **View details** dưới sản phẩm tương ứng).
- Bước 2: Thêm sản phẩm vào giỏ hàng bằng cách chọn **Add to cart**.
![image.png](https://images.viblo.asia/0fa97a88-b0d2-4a88-919a-f1e1585b9340.png)
- Bước 3: Vào giỏ hàng đặt hàng với tùy chọn **Place order**.
![image.png](https://images.viblo.asia/f8c25d49-6989-4a1d-8086-5a308d001417.png)

Vào xem chi tiết sản phẩm "Lightweight l33t leather jacket", quan sát source code, lưu ý đoạn code sau:

![image.png](https://images.viblo.asia/6ab7474e-959b-4b64-a3c2-87abbed6873a.png)

Ở đây có bốn thẻ `<input>`, trong đó có ba thẻ có thuộc tính `type=hidden`, một thẻ có `type=number` có thể thay đổi số lượng bởi người dùng. Khi chúng ta chọn **Add to cart**, các tham số kèm giá trị trong ba thẻ ẩn (hidden) cũng sẽ được truyền tới server từ client qua phương thức POST. Chúng ta có thể quan sát điều này kĩ hơn qua request trong Burp Suite:

![image.png](https://images.viblo.asia/4ae42b77-9e17-4356-aedb-673d261051e3.png)

Lưu ý rằng một trong ba tham số ẩn này chính là giá trị của sản phẩm đã chọn. Điều này có nghĩa là, trang web thiết lập giá trị sản phẩm trực tiếp trong source code front-end gắn liền với từng sản phẩm. Tại bước xử lý đơn hàng sẽ trực tiếp lấy giá trị sản phẩm từ client. Bởi vậy chúng ta có thể thay đổi giá trị tham số này để mua sản phẩm "Lightweight l33t leather jacket" với giá tùy ý, chẳng hạn mua với giá $0.01 (Tham số price có đơn vị tính là cent, trong đó 1 đô la = 100 cent)

![image.png](https://images.viblo.asia/133200ac-4a8f-4b76-ac0b-597d196ae3d2.png)

Đơn đã được thêm vào giỏ hàng:

![image.png](https://images.viblo.asia/5dbc3bb2-0880-4dff-a5fc-43fd1ae9c528.png)

Ngoài ra, chúng ta cũng có thể sửa giá trị tham số `price` trong công cụ DevTool, nguyên lý hoạt động tương tự:

![image.png](https://images.viblo.asia/f5c8a17c-b5b9-4269-ba92-077f3ccf6154.png)

Chọn **Place order** để đặt hàng sẽ hoàn thành bài lab.

Một trường hợp khác của dạng lỗ hổng này còn được thể hiện trong quá trình xác thực đăng nhập 2FA.

#### Phân tích lab **[2FA broken logic](https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-broken-logic)**

(Bài lab đã được phân tích trong chủ đề **Authentication vulnerabilities**)

## Các tài liệu tham khảo

- [https://portswigger.net/web-security/logic-flaws](https://portswigger.net/web-security/logic-flaws)
- [https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability](https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability)