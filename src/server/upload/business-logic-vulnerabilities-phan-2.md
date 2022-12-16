## III. Phân tích khai thác một số lỗ hổng Business logic (Tiếp)

### 2. Xử lý các đầu vào không hợp lệ (unconventional input) từ người dùng

Một trong những hậu quả mang lại từ những đầu vào không hợp lệ là khả năng tiết lộ các thông tin nhạy cảm trong hệ thống (đã được chúng ta bàn tới trong chủ đề **Information disclosure vulnerabilities**). Bên cạnh đó, chúng còn có thể khiến quy trình hoạt động của trang web bị thay đổi, dẫn đến kết quả xử lý cũng sai lệch. Chúng ta xem xét một số dạng nhỏ sau:

- **Dạng 1**: Phạm vi giới hạn dữ liệu không chặt chẽ - Thiếu giới hạn dưới

Việc thiếu giới hạn dưới thường dẫn tới người dùng có thể yêu cầu giao dịch với những số liệu âm, dẫn đến xử lý sai lệch của hệ thống. Xem xét đoạn code thực hiện kiểm tra trước quy trình chuyển tiền sau:

```php=
$transferAmount = $_POST['amount'];
$currentBalance = $user->getBalance();

if ($transferAmount <= $currentBalance) {
    // Complete the transfer
} else {
    // Block the transfer: insufficient funds
}
```

Đoạn code chỉ kiểm trả số lượng tiền chuyển `$transferAmount` có nhỏ hơn số dư hiện tại `$currentBalance` hay không. Điều đó dẫn người dùng A có thể yêu cầu chuyển một số lượng giá trị âm số tiền tới người dùng B. Khi `$transferAmount` nhận giá trị âm thì vẫn thỏa mãn điều kiện `$transferAmount <= $currentBalance`, bởi vậy giao dịch được thông qua và thực hiện. Chẳng hạn, người dùng A yêu cầu chuyển $-100 tới B, hệ thống sẽ xử lý tài khoản của người dùng A trừ đi $-100, còn người dùng B được thêm $-100, hay có nghĩa là người dùng B "bị chuyển" $100 đến A.

#### Phân tích lab **[High-level logic vulnerability](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-high-level)**

![image.png](https://images.viblo.asia/26837138-ec72-44fd-a57f-f3a4bacc8604.png)

**Miêu tả:** Trang web mua sắm trên có một quá trình kiểm tra không chặt chẽ đối với tham số từ người dùng, dẫn đến lỗ hổng có thể mua sắm sản phẩm với số lượng ngoài mong muốn. Để vượt qua bài lab, chúng ta cần mua thành công sản phẩm "Lightweight l33t leather jacket". Tài khoản hợp lệ được cung cấp: `wiener:peter`.

Đăng nhập với tài khoản `wiener:peter`. Tại phần xem chi tiết sản phẩm "Lightweight l33t leather jacket", chúng ta có thể thêm món hàng vào giỏ với số lượng tùy ý, tuy nhiên trang web thiết lập trị nhỏ nhất bằng 0.

![image.png](https://images.viblo.asia/1112510c-0422-48a6-aa5e-985618715fe7.png)

Nghĩa là trong front-end server chúng ta không thể thêm sản phẩm vào giỏ với số lượng nhỏ hơn 0:

![image.png](https://images.viblo.asia/e822defe-306b-4f6d-89b0-d169d9463a9f.png)

Tuy nhiên, dự đoán điều này chỉ được quy ước ở front-end server, rất có thể back-end server không kiểm tra điều này. Thử thay đổi giá trị tham số `quanlity` qua Burp Suite, chúng ta nhận được phản hồi mong muốn:

![image.png](https://images.viblo.asia/e0204e3d-10ba-485a-96b3-7ffa7260e407.png)

Sản phẩm với số lượng `-1` đã được thêm vào giỏ hàng, khi đó giá mua cũng sẽ có giá trị âm:

![image.png](https://images.viblo.asia/16d437f7-ae17-4bf6-b219-861f412d31e4.png)

Chúng ta cũng có thể thay đổi thuộc tính `min` của số lượng sản phẩm bằng công cụ DevTool, nguyên lý hoạt động tương tự:

![image.png](https://images.viblo.asia/4655841e-b260-41fb-9346-79c8b6da03be.png)

![image.png](https://images.viblo.asia/c9c21177-85ee-4909-936a-9beb0fb29826.png)

Đặt hàng với tùy chọn **Place order** để hoàn thành bài lab.

- **Dạng 2**: Phạm vi giới hạn dữ liệu không chặt chẽ - Thiếu giới hạn trên

Bên cạnh việc thử giá trị tham số nằm dưới giới hạn thông thường, chúng ta cũng có thể thử nhập các giá trị tham số vượt ngoài ngưỡng giới hạn, điều này có thể dẫn tới sự "quay vòng" dữ liệu. Ví dụ trong đoạn code `C++` sau:

```cpp=
#include <iostream>
using namespace std;

int main()
{
    int a = 2147483647, b = 1;
    int c = a + b;
    cout << c;

    return 0;
}
```

Chúng ta thu được `-2147483648`. Là do kết quả phép tính `a + b` thực tế bằng `2147483648` đã vượt qua phạm vi kiểu dữ liệu `int` trong C++ là **2147483647**. Bởi vậy giá trị kết quả được quay ngược trở lại giá trị nhỏ nhất trong kiểu dữ liệu `int`.

#### Phân tích lab **[Low-level logic flaw](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-low-level)**

![image.png](https://images.viblo.asia/858e5f81-a607-44b4-ba3f-8c4b5b38cca5.png)

**Miêu tả:** Trang web mua sắm trên có một quá trình kiểm tra không chặt chẽ đối với tham số từ người dùng, dẫn đến lỗ hổng có thể mua sắm sản phẩm với số lượng ngoài mong muốn. Để vượt qua bài lab, chúng ta cần mua thành công sản phẩm "Lightweight l33t leather jacket". Tài khoản hợp lệ được cung cấp: `wiener:peter`.

Source code quy định giá trị tối thiểu và tối đa của tham số `quantity`:

![image.png](https://images.viblo.asia/fb514485-c613-4ea9-85ed-6a874c6ff08b.png)

Trong trường hợp này, trang web không cho phép số lượng món hàng nhận giá trị âm ở cả front-end server và back-end server:

![image.png](https://images.viblo.asia/b5ea1bbe-fc64-478d-be00-9e1d19a797d3.png)

![image.png](https://images.viblo.asia/1366d429-9d9f-4da4-a044-42eea947b7b0.png)

Trang web chỉ cho phép tăng số lượng đơn hàng tối đa bằng 99, nếu vượt quá 99 sẽ nhận về thông báo lỗi

![image.png](https://images.viblo.asia/40047a89-b8f4-4ad5-a7d2-ea2aca14da6e.png)

Như vậy tham số `quantity` có giới hạn, chúng ta có thể dự đoán giá trị **total price** cũng tồn tại giới hạn. Giả sử hệ thống sử dụng biến kiểu `int` đặt cho total price, giới hạn của biến `int` trong khoảng
**[-2 147 483 648; 2 147 483 647]**. Như vậy ta có thể tăng số lượng đơn hàng liên tục, mục đích để tổng giá trị sản phẩm vượt ngưỡng giới hạn trên, khi đó bộ đếm sẽ quay vòng và bắt đầu từ giá trị âm.

Sử dụng Burp Intruder với Null Payloads:

![image.png](https://images.viblo.asia/b0402f69-3c00-4d7e-b06d-2eeba8346e09.png)

Thử liên tục các payloads cho tới khi thu được kết quả âm:

![image.png](https://images.viblo.asia/9123d60c-fbf5-4da8-8662-86ac03df8828.png)

Mua thêm món hàng khác để **total price** trở về giá trị dương và nhỏ hơn $100.

![image.png](https://images.viblo.asia/c7ae01e4-e1c1-4340-8cdd-ec0166ac2b1d.png)

Lúc này chúng ta có thể thực hiện đặt hàng:

![image.png](https://images.viblo.asia/b498920c-0649-45da-9991-d118d37cb72f.png)

Một trường hợp khác cho việc xử lý tràn dữ liệu trong việc xác thực mail:

#### Phân tích lab **[Inconsistent handling of exceptional input](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-inconsistent-handling-of-exceptional-input)**

![image.png](https://images.viblo.asia/30ce3f67-c806-44dc-bf4f-b1cab3288d3e.png)

**Miêu tả:** Trang web có một quá trình kiểm tra không chặt chẽ đối với tham số từ người dùng. Chúng ta cần khai thác để có thể truy cập vào trang quản trị và xóa tài khoản người dùng Carlos.

Trang quản trị administrator tại thư mục `/admin` (sử dụng tool Dirsearch hoặc Discover Content trong Burp Suite).

![image.png](https://images.viblo.asia/c024ed67-8ebe-4ff7-ab75-a8e365c51cce.png)

Trang web yêu cầu chúng ta cần có vai trò là **DontWannaCry** user.

Thông qua trang đăng ký, để trở thành người dùng có vai trò **DontWannaCry**, email cần có địa chỉ **@dontwannacry.com**.

![image.png](https://images.viblo.asia/970ce370-a8ed-4bcf-adef-a910bda7c11d.png)

Chú ý giá trị email trang web yêu cầu chúng ta nhập vào chỉ cần thỏa mãn điều kiện dạng `A@B`:

![image.png](https://images.viblo.asia/3392ac40-112e-4868-b7cf-75e9983fac52.png)

Thử khai thác lỗi logic flaw với tham số email, đăng ký với một email có chuỗi ký tự lớn:

![image.png](https://images.viblo.asia/fd16ef80-bed5-4b2c-9b49-3732f35b101c.png)

Sau khi đăng nhập, trang web hiển thị email chúng ta đăng nhập nhưng chỉ có 255 kí tự, điều này chứng tỏ hệ thống có bộ đọc giới hạn ở 255 kí tự

![image.png](https://images.viblo.asia/32941aef-b146-4319-bc8b-2cae425051f1.png)

![image.png](https://images.viblo.asia/8e85ad69-7d91-4fa6-b12e-97750f980ec8.png)

Đăng kí một email có dạng `A@dontwannacry.com.exploit-ac771f1f1f9f88cfc027167b018600eb.web-security-academy.net` với điều kiện
`A@dontwannacry.com` có đúng 255 kí tự, như vậy khi đăng kí, hệ thống sẽ gửi link xác nhận tài khoản vào email của chúng ta, nhưng đối với cơ chế xác thực danh tính admin thì chỉ đọc được 255 kí tự đầu nên email chúng ta chỉ dừng lại ở **dontwannacry.com** phù hợp với tiêu chí xác thực.

![image.png](https://images.viblo.asia/88ad7207-99c2-4c14-bb2c-7c189d36570b.png)

![image.png](https://images.viblo.asia/ef92d1b5-7fb3-4b72-962b-521dd4ac2a6b.png)

## Các tài liệu tham khảo

- [https://portswigger.net/web-security/logic-flaws](https://portswigger.net/web-security/logic-flaws)
- [https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability](https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability)