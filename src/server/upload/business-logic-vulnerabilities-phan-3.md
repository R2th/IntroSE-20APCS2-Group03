## III. Phân tích khai thác một số lỗ hổng Business logic (Tiếp)

### 3. Cho phép thay đổi địa chỉ mail tùy ý

Một trường hợp phổ biến trong lỗ hổng Business logic là cho phép người dùng thay đổi địa chỉ email của họ thành bất kì một địa chỉ email khác. Chẳng hạn khi đăng ký trang web không cho phép người dùng đăng ký với email dạng `@special.gmail.com` do đây là địa chỉ email nội bộ, nhưng lại cho phép người dùng thay đổi thành loại email này trong tính năng đổi email. Đây có thể coi là một lỗi vô cùng "ngớ ngẩn", song nó không phải chưa từng xuất hiện trong thực tế!

#### Phân tích lab **[Inconsistent security controls](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-inconsistent-security-controls)**

![image.png](https://images.viblo.asia/54631378-0dee-4a38-adac-2c82fe6e4b13.png)

**Miêu tả:** Giống với lab trên, trang web xác thực danh tính quản trị viên với email nội bộ. Tuy nhiên đang có một lỗ hổng logic flaw khiến người dùng thông thường có thể truy cập trang quản trị. Chúng ta cần truy cập vào trang quản trị và xóa đi tài khoản người dùng Carlos.

Trang quản trị administrator tại thư mục `/admin` (sử dụng tool Dirsearch hoặc Discover Content trong Burp Suite).

![image.png](https://images.viblo.asia/52343d29-8894-42f6-937a-b79e4ae90d2a.png)

Trang web yêu cầu chúng ta cần có vai trò là **DontWannaCry** user.

Thông qua trang đăng ký, để trở thành người dùng có vai trò **DontWannaCry**, email cần có địa chỉ **@dontwannacry.com**.

![image.png](https://images.viblo.asia/e332b53d-f220-4101-bd79-81a578ce8e9d.png)

Thử với các bước như trong lab trên, phát hiện trang web không còn chứa lỗ hổng logic flaw trong đăng ký tài khoản. Tuy nhiên, sau khi đăng nhập, lưu ý chức năng đổi email cho người dùng:

![image.png](https://images.viblo.asia/6bc9ac87-f479-4d32-be22-a99f71c841d3.png)

Chúng ta có thể đổi email tùy ý mà không bị ràng buộc bởi điều kiện gì. Thực hiện đổi email có địa chỉ **@dontwannacry.com**, có được vai trò quản trị viên:

![image.png](https://images.viblo.asia/847dd412-0e19-4d72-b0c6-8bb1fa83aee7.png)

Xóa tài khoản người dùng Carlos và hoàn thành bài lab:

![image.png](https://images.viblo.asia/9f2b057a-1ac1-4505-a378-240916fa04e0.png)

### 4. Lỗ hổng logic trong cơ chế đặt lại mật khẩu

Trong chức năng đặt lại mật khẩu, bên cạnh mật khẩu mới, hệ thống thường yêu cầu người dùng hoàn thiện thêm trường mật khẩu hiện tại để xác thực người đang thực hiện chức năng đổi mật khẩu có phải chủ tài khoản hay không. Một người dùng thông thường tất nhiên sẽ hoàn thiện đầy đủ các trường yêu cầu (và những trường này cũng thường được đặt thuộc tính required - bắt buộc). Tuy nhiên, nếu cơ chế hoạt động của chức năng này tại back-end không được cài đặt chặt chẽ, kẻ tấn công hoàn toàn có thể lợi dụng công cụ chỉnh sửa giá trị các tham số, thậm chí có thể bỏ qua một vài trong số các tham số này.

Để hiểu được cách thức hoạt động của những dòng code tại back-end server, chúng ta thường thay đổi giá trị từng tham số riêng lẻ, hoặc thực hiện xóa bỏ từng tham số để so sánh phản hồi từ server, xem xét các cách xử lý với những trường hợp khác nhau, từ đó có thể dự đoán được một phần hoặc toàn bộ cơ cấu hoạt động.

Thật vậy, xét đoạn code `php` sau:

```php=
<?php
$username = '';
$current_password = '';
if (isset($_POST['username']) {
	$username = $_POST['username'];
}
if (isset($_POST['current_password']) {
    // get value of $current_password from database with $username
    if ($current_password !== $_POST['current_password']) {
        echo "Current password is incorrect";
        exit();
    }
}
// change the current password - exception: echo "User does not exist"
?>
```

Đoạn code trên thực hiện chức năng đặt lại mật khẩu, đối với một người dùng thông thường, tất nhiên đoạn code trên sẽ không có vấn đề gì. Hai điều kiện `isset($_POST['username']` và `isset($_POST['current_password']` luôn đúng, bởi vậy các dòng code hoạt động bình thường: `$username` là biến chỉ username được người dùng nhập vào, từ đó được sử dụng để lấy `$current_password` là mật khẩu ứng với username người dùng, đem so sánh `$current_password` và `$_POST['current_password']` (là mật khẩu hiện tại cần người dùng xác thực), nếu thỏa mãn sẽ đặt lại mật khẩu.

Tuy nhiên, dưới góc nhìn bảo mật, đoạn code trên đang tồn tại nhiều lỗ hổng. Nếu kẻ tấn công có thể "bỏ qua" không truyền giá trị cho biến `$_POST['current_password']`, dẫn đến điều kiện `isset($_POST['current_password']` sai, có nghĩa là cả đoạn code kiểm tra mật khẩu không được thực hiện, như vậy có thể đặt lại mật khẩu của bất kì user nào trong database (chỉ cần user đó tồn tại).

Chúng ta cùng phân tích kỹ hơn lỗ hổng này trong các bài lab sau.

#### Phân tích lab **[Weak isolation on dual-use endpoint](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-weak-isolation-on-dual-use-endpoint)**

![image.png](https://images.viblo.asia/61cc7a69-33d8-434b-b6a4-7b7955c06816.png)

**Miêu tả:** Trang web chứa lỗ hổng logic trong việc xử lý input người dùng. Chúng ta có thể khai thác nó dẫn tới việc truy cập được tài khoản `administrator`. Xóa tài khoản người dùng Carlos để hoàn thành bài lab. Tài khoản hợp lệ được cung cấp `wiener:peter`.

Sau khi đăng nhập với tài khoản `wiener:peter`, tại hồ sơ người dùng có chức năng đặt lại mật khẩu:

![image.png](https://images.viblo.asia/2e924d90-da34-4c41-a55d-644f5d90f389.png)

Rất "khả nghi" khi chức năng có trường **username** cho người dùng nhập!

Chúng ta cần hoàn thiện thông tin các trường `username`, `current password`, `new passwrod`, `confirm new password`, và quan sát source biết rằng tất cả các trường này đều là bắt buộc:

![image.png](https://images.viblo.asia/9f4b3dce-2a68-46b8-8fb5-2d00b8a7ce97.png)

Xét request trong Burp Suite:

![image.png](https://images.viblo.asia/e8105d2f-7edf-4585-9306-a5c8718406fc.png)

Mặc dù ở front-end server, các tham số này đều mang tính bắt buộc, nhưng chúng ta có thể bỏ đi một vài tham số tại back-end server. Ở đây, các bạn nên tự thử và viết lại đoạn code hoạt động của trang web. Phần code phía trên gần tương ứng với cơ chế đặt lại mật khẩu của bài lab này do tôi cố gắng mô tả lại:

```php=
<?php
$username = '';
$current_password = '';
if (isset($_POST['username']) {
	$username = $_POST['username'];
}
if (isset($_POST['current_password']) {
    // get value of $current_password from database with $username
    if ($current_password !== $_POST['current_password']) {
        echo "Current password is incorrect";
        exit();
    }
}
// change the current password - exception: echo "User does not exist"
?>
```

Đến đây, việc khai thác trở nên đơn giản, chúng ta chỉ cần không truyền tới hệ thống tham số `current-password`. Bỏ trực tiếp tham số `current-password`, ta thấy rằng mật khẩu được thay đổi thành công:

![image.png](https://images.viblo.asia/1bd8db73-a68c-4283-9ea0-420328bf64a9.png)

Bởi vậy, chỉ cần thay đổi giá trị `username`, sẽ có thể đổi được mật khẩu của tài khoản tùy ý, đổi mật khẩu tài khoản `administrator` thành 1:

![image.png](https://images.viblo.asia/d1267278-7e84-4940-bafb-924d887d6a59.png)

Đăng nhập với tài khoản `administrator:1` và xóa tài khoản người dùng Carlos để hoàn thành bài lab:

![image.png](https://images.viblo.asia/591fbfcb-c193-43da-a824-cc3887a2c84f.png)

![image.png](https://images.viblo.asia/789f0dd3-dff9-4f7f-802a-eac2e6de678a.png)

### 5. Không kiểm soát các bước trong quy trình giao dịch

Lab **[2FA simple bypass](https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-simple-bypass)** (đã được chúng ta phân tích trong chủ đề **Authentication vulnerabilities**) là một ví dụ rõ ràng cho việc kiểm soát các bước trong quy trình xác thực với 2FA. Trong các cuộc giao dịch mua sắm thường có nhiều bước hơn, dẫn đến tỉ lệ xảy ra lỗ hổng tăng lên, kẻ tấn công có thể "xuống tay" trong bất kì bước nào để lộ yếu điểm.

Xét đoạn code **php** sau:

```php=
<?php
    if (isset($_POST['buy'])) {
        if ($total <= $wallet) {
            header("location:process.php?check=1");
        } else {
            header("location:process.php?check=0");
        }
    }
?>
```

Đoạn code trên được thực thi khi người dùng click vào tùy chọn **Buy**. Khi đó hệ thống so sánh giá trị đơn hàng `$total` với số dư ví hiện tại `$wallet`. Sau đó chuyển hướng tới `process.php` cùng với tham số `check` có giá trị bằng `1` nếu người dùng đủ điều kiện mua hàng, ngược lại có giá trị bằng `0`. Còn ở `process.php`:

```php=
<?php
    if ($_GET['check'] === "1") {
        // xu ly va giao hang
    } else {
        // nguoi dung khong du dieu kien mua hang
    }
?>
```

`process.php` sẽ quyết định giao hàng cho người dùng thông qua tham số `$_GET['check']`.

Quy trình hoàn toàn không có vấn đề khi người dùng giao dịch thông thường. Tuy nhiên, kẻ tấn công có thể bỏ qua bước kiểm tra so sánh số dư ví và tổng số tiền đơn hàng bằng cách trực tiếp truy cập `/process.php` và cung cấp tham số `?check=1`. Lỗ hổng dẫn đến việc mua hàng tùy ý. Chúng ta cùng phân tích kỹ hơn trong lab dưới.

#### Phân tích lab **[Insufficient workflow validation](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-insufficient-workflow-validation)**

![image.png](https://images.viblo.asia/dc76b660-08ee-42b1-84c0-cd8b21523614.png)

**Miêu tả:** Trang web chứa lỗ hổng logic trong các bước của quá trình mua hàng. Để giải quyết bài lab, chúng ta cần khai thác lỗ hổng để mua sản phẩm "Lightweight l33t leather jacket". Tài khoản hợp lệ được cung cấp: `wiener:peter`.

Đăng nhập với tài khoản `wiener:peter`. Để hiểu được cách hoạt động của trang web khi người dùng đặt hàng, chúng ta thử mua một sản phẩm trong giới hạn ví tiền và một sản phẩm ngoài giới hạn ví tiền, rồi so sánh các request trong Burp Suite.

- Sản phẩm trong giới hạn ví:

![image.png](https://images.viblo.asia/34d58bf5-f26e-41f4-a2b2-bf7309183eb2.png)

Khi tiến hành đặt hàng, trang web truy cập tới `/cart/checkout` (kiểm tra ở bước này), sau đó chuyển hướng người dùng tới `/cart/order-confirmation?order-confirmed=true` (kiểm tra thành công). Từ đó thực hiện đặt hàng.

![image.png](https://images.viblo.asia/4a9093b6-6596-4f6f-a9cb-ee4075f285d3.png)

![image.png](https://images.viblo.asia/52da6719-8e81-4628-a160-e6735df362d3.png)

- Sản phẩm ngoài giới hạn ví:

![image.png](https://images.viblo.asia/bdf2887d-7b86-4eb0-9eb2-92a54bc47594.png)

Khi tiến hành đặt hàng, trang web truy cập tới `/cart/checkout` (kiểm tra ở bước này), sau đó chuyển hướng người dùng tới `/cart?err=INSUFFICIENT_FUNDS` (kiểm tra thất bại). Đưa ra thông báo giao dịch thất bại.

![image.png](https://images.viblo.asia/8e64e380-bb57-43eb-b4c9-baee48a9fa04.png)

![image.png](https://images.viblo.asia/70415ec0-3cdc-4004-a2d9-ec64082546be.png)

Chúng ta thấy được điểm khác biệt trong hai cuộc giao dịch này là ở tham số `order-confirmed=true`. Khi kiểm tra số dư ví thỏa mãn điều kiện mua hàng, tại `/cart/order-confirmation` dựa vào giá trị tham số `order-confirmed=true` thực hành giao dịch. Bởi vậy, chúng ta có thể thêm sản phẩm "Lightweight l33t leather jacket" vào giỏ hàng, truy cập `/cart/order-confirmation` với tham số `order-confirmed=true` sẽ có thể thực hiện đặt hàng mà không cần bước kiểm tra số dư ví!

![image.png](https://images.viblo.asia/93a71cd6-e554-402a-a4a1-3ba7684f6c46.png)

Bài lab được giải quyết:

![image.png](https://images.viblo.asia/58c951ec-94b6-4a27-8cb7-9b92b34fe735.png)

Cùng dạng lỗ hổng này còn có một ví dụ khác trong trường hợp sau.

```php=
if (isset($_POST['role']) {
	if ($_POST['role'] === "user") {
    	// config with user role
    }
    if ($_POST['role'] === "content_author") {
    	// config with content author role
    }
} else {
	// config with administrator role
}

?>
```

Đoạn code trên miêu tả chức năng lựa chọn vai trò cho người dùng sau khi đăng nhập (là bước bắt buộc), và người dùng có hai lựa chọn là **User** hoặc **Content author**. Do tính bắt buộc của bước lựa chọn sau khi đăng nhập và giới hạn vai trò cho phép người dùng lựa chọn, nên đoạn code trên không có vấn đề gì với người dùng thông thường. Tuy nhiên kẻ tấn công có thể bỏ qua bước lựa chọn bằng một số công cụ như Burp Suite, dẫn đến trực tiếp có vai trò admin.

#### Phân tích lab **[Authentication bypass via flawed state machine](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-authentication-bypass-via-flawed-state-machine)**

![image.png](https://images.viblo.asia/12a06993-fe4f-4252-9391-7842092d540f.png)

**Miêu tả:** Trang web chứa lỗ hổng logic trong các bước của quá trình xác thực. Để giải quyết bài lab, chúng ta cần khai thác lỗ hổng để truy cập tài khoản admin, từ đó xóa tài khoản người dùng Carlos. Tài khoản hợp lệ được cung cấp: `wiener:peter`.

Đăng nhập với tài khoản `wiener:peter`, sau khi đăng nhập chúng ta được lựa chọn vai trò là **User** hoặc **Content author**:

![image.png](https://images.viblo.asia/60249fdc-2255-4959-a5fc-6c31ec7c5184.png)

Giống như đã miêu tả trong đoạn code phía trên, chúng ta cần tìm cách "bỏ qua" bước lựa chọn vai trò này.

Bật tùy chọn bắt trực tiếp các request:

![image.png](https://images.viblo.asia/d9cb48ae-0341-42a9-acfc-a878bd14dab2.png)

Thực hiện đăng nhập lại, chọn **Forward** tới khi màn hình xuất hiện request tương ứng với chức năng lựa chọn vai trò:

![image.png](https://images.viblo.asia/c4ee7a19-483c-466a-a51a-63a45e11c99e.png)

Chọn **DROP** để bỏ qua request này, tại thanh URL truy cập tới `/my-account`:

![image.png](https://images.viblo.asia/18272347-f744-455a-8184-dfa240d4e1be.png)

Chọn **Forward** request, lúc này chúng ta có thể tắt việc bắt proxy, hiện tại tài khoản của chúng ta đã có quyền admin:

![image.png](https://images.viblo.asia/e83c9d5b-8b50-4f4f-8bef-f310feb39267.png)

Xóa tài khoản người dùng Carlos và hoàn thành bài lab:

![image.png](https://images.viblo.asia/c8c20b4e-f8f1-400e-b953-5373da3b6636.png)

## Các tài liệu tham khảo

- [https://portswigger.net/web-security/logic-flaws](https://portswigger.net/web-security/logic-flaws)
- [https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability](https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability)