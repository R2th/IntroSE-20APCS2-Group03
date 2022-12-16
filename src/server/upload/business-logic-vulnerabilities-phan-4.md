## III. Phân tích khai thác một số lỗ hổng Business logic (Tiếp)

### 6. Lỗ hổng logic trong tính năng sử dụng voucher

Để thu hút thêm khách hàng mua sắm sản phẩm, các cửa hàng thường tổ chức các hình thức khuyến mại như chương trình giảm giá, mua một tặng một. Đối với các trang web mua sắm online, có một từ khóa không còn lạ lẫm với chúng ta - voucher. Voucher được biết đến là một loại phiếu mua hàng, phiếu quà tặng có thể quy đổi sang sản phẩm hoặc giảm giá trực tiếp trên hóa đơn thanh toán. Nó có giá trị bằng một khoản nhất định và được chi trả cho một mặt hàng, dịch vụ cụ thể nào đó. Chẳng hạn một món hàng có giá trị $100, và chúng ta có một voucher giảm giá 15%, khi đó chúng ta chỉ mất $100 - 100\times 15\% = 75$ đô la để mua món hàng đó.

![image.png](https://images.viblo.asia/cf62953a-23bb-4ba2-a8ed-0dbb0e7108dd.png)

Thường các cửa hàng sẽ quy định cần có một "điều kiện" nào đó để có thể sử dụng voucher giảm giá, có thể thông qua hình thức tích điểm, hoặc giá trị đơn hàng tối thiểu cần đạt ngưỡng nào đó. Xét ví dụ sau: đoạn code thể hiện chức năng xử lý giảm giá khi áp dụng voucher cho đơn hàng với điều kiện tổng giá trị đơn hàng đạt tối thiểu $100.

```php=
<?php

$discount = false;
$discount_value = 100;
if (isset($_POST['voucher']) {
	if ($total >= $discount_value) {
		$discount = true;
	}
}
if (isset($_POST['pay']) {
	if ($discount) {
		// process with discount
	} else {
		// process
	}
}

?>
```

Đoạn code quy định biến `$discount` thể hiện quyết định giảm giá của đơn hàng. Khi tổng giá trị đơn hàng `$total` đạt từ điều kiện giảm giá `$discount_value` trở lên thì `$discount` sẽ nhận giá trị `true`. Tuy nhiên, nếu chức năng không được cài đặt chặt chẽ, kẻ tấn công có thể thêm sản phẩm vào giỏ hàng tới khi đạt giá trị tối thiểu, áp dụng voucher để lấy giá trị biến `$discount` bằng `true`, sau đó bỏ đi một số sản phẩm. Lúc này nếu thiếu bước kiểm tra lại giá trị đơn hàng trước khi thanh toán, hệ thống sẽ "cho phép" giảm giá đơn hàng dù không đạt điều kiện (Do `$discount=true` không được sửa lại thành `false`).

Mở rộng hơn nữa, với cơ chế gồm nhiều voucher, xét đoạn code sau:

```php=
<?php

$voucher1 = 0.15; // for sale: 15%, code: VOUCHER1
$voucher2 = 10; // 10$ off, code: VOUCHER2
$checkVoucher1 = false;
$checkVoucher2 = false;

voucherApply() {
    $voucher = $_POST['voucher'];
    if ($voucher === "VOUCHER1") {
    	if ($checkVoucher1 == false) {
            $checkVoucher1 = true;
            $checkVoucher2 = false;
        } else {
            echo "you can not apply this voucher again!";
        }
    }
    if ($voucher === "VOUCHER2") {
        if ($checkVoucher2 == false) {
            $checkVoucher2 = true;
            $checkVoucher1 = false;
        } else {
        	echo "you can not apply this voucher again!";
        }
    }
    if ($checkVoucher1 == true) {
        $total = $total * (1 - $voucher1);
    }
    if ($checkVoucher2 == true) {
        $total = $total - $voucher2;
    }
}


?>
```

Hàm `voucherApply()` có nhiệm vụ giảm giá đơn hàng dựa trên mã voucher người dùng nhập. Ở đây chúng ta có 2 voucher tương ứng với giảm $15\%$ và giảm $10$ đô. Hàm sử dụng hai biến `$checkVoucher1` và `$checkVoucher2` để phân biến hình thức giảm giá, và có cơ chế kiểm tra để người dùng không được phép nhập lại voucher đã sử dụng. Ngoài ra khi người dùng áp dụng voucher này, biến check của voucher kia sẽ được đặt lại giá trị `false` để tránh trường hợp hệ thống giảm giá 2 lần liên tiếp.

Tuy nhiên, một ngày đẹp trời, hệ thống cho phép người dùng sử dụng nhiều loại voucher cho cùng một đơn hàng, cứ mỗi khi người dùng áp dụng voucher sẽ gọi hàm `voucherApply()` để tính toán lại tổng giá tiền. Chúng ta có thể thấy, vấn đề đã xảy ra: Tuy người dùng không thể áp dụng lại voucher giống nhau liên tiếp, nhưng họ có thể "lách luật" bằng cách áp dụng xen kẽ các voucher khác nhau. Do mỗi khi sử dụng voucher này thì biến check của voucher kia được đặt lại bằng `false` nên người dùng lại có thể sử dụng tiếp voucher còn lại.

#### Phân tích lab **[Flawed enforcement of business rules](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-flawed-enforcement-of-business-rules)**

![image.png](https://images.viblo.asia/498b31aa-e6ac-486e-ae97-84d14b393bbc.png)

**Miêu tả:** Trang web mua sắm chứa lỗ hổng logic trong chức năng thanh toán với voucher. Chúng ta cần khai thác lỗ hổng để mua sắm sản phẩm "Lightweight l33t leather jacket". Tài khoản hợp lệ được sử dụng: `wiener:peter`.

Trước khi đăng nhập, chú ý chúng ta có thể nhận được hai voucher khác nhau sau:

- Voucher 1: **NEWCUTST5** dành cho khách hàng mới.
- Voucher 2: Tại cuối trang chủ, cho người dùng mới khi đăng ký tài khoản: **SIGNUP30**

![image.png](https://images.viblo.asia/6447e2b6-9874-43e1-b959-80f02b9a587f.png)

![image.png](https://images.viblo.asia/6128b204-1134-4d08-a77b-26656d5af164.png)

Đăng nhập với tài khoản `wiener:peter`. Sử dụng ý tưởng từ phân tích trong đoạn code mẫu phía trên, chúng ta liên tục thêm xen kẽ cả hai voucher vào đơn hàng "Lightweight l33t leather jacket" cho đến đủ tiền mua được đơn hàng này:

![image.png](https://images.viblo.asia/449bbbc6-84c4-449f-a025-ecd45a7c9191.png)

Đặt hàng và hoàn thành bài lab:

![image.png](https://images.viblo.asia/df9ac638-6988-4013-b856-8bb3c38a6b4e.png)

#### Phân tích lab **[Infinite money logic flaw](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-infinite-money)**

![image.png](https://images.viblo.asia/d34f8d0b-acde-4eda-834e-786eb40cdca9.png)

**Miêu tả:** Trang web mua sắm chứa lỗ hổng logic trong chức năng thanh toán với voucher. Chúng ta cần khai thác lỗ hổng để mua sắm sản phẩm "Lightweight l33t leather jacket". Tài khoản hợp lệ được sử dụng:` wiener:peter`.

Giống với lab trên, tình huống này chúng ta cũng có voucher **SIGNUP30** giảm giá $30\%$ đơn hàng, lấy voucher tại cuối trang chủ:

![image.png](https://images.viblo.asia/19b89409-cb87-4293-b9c3-43695a61213c.png)

![image.png](https://images.viblo.asia/f598fd45-2936-47d6-be8f-29437025df54.png)

Ngoài ra, trang web có một món hàng đáng chú ý là **Gift card**:

![image.png](https://images.viblo.asia/58323129-0eb7-43a7-a264-a78f307330a4.png)

Có thể mua sản phẩm **Gift card** với giá \$$10$:

![image.png](https://images.viblo.asia/f5de1b05-9a29-4b8a-88d4-5f9f5d60148c.png)

Chúng ta thu được một mã code, khi nhập code này tại trang đặt hàng sẽ được hoàn trả \$$10$ vào tài khoản.

![image.png](https://images.viblo.asia/859e8d3d-1cd6-4dca-ae42-07107907f681.png)

Để ý rằng chúng ta có voucher **SIGNUP30** sử dụng sẽ giảm giá $30\%$ giá trị sản phẩm. Như vậy chúng ta có thể sử dụng nó trong việc mua sản phẩm **Gift card** (với giá \$$7$), sau đó nhập code để được hoàn trả \$$10$, dẫn đến mỗi lần thực hiện chúng ta được tặng miễn phí \$$3$. Nếu voucher **SIGNUP30** có thể được sử dụng lại nhiều, thì tài khoản của chúng ta sẽ tăng vĩnh viễn.

![image.png](https://images.viblo.asia/e707f509-2072-4d12-b8fe-6f26ddfbf84c.png)

Do khối lượng request lặp lại lớn nên chúng ta sẽ thao tác bằng tính năng **macro** trong Burp Suite. Ở đây, chúng ta cần lấy được mã code **Gift card** trong mỗi lượt thực hiện.

- Bước 1. Chọn request GET `/cart/order-confirmation?order-confirmed=true`, chọn **configure item**, đặt tên code cần note lại là **gift-card** và đánh dấu code cần lấy.

![image.png](https://images.viblo.asia/f4da6498-fcbd-4638-949e-921f3c174eee.png)

- Bước 2. Chọn request POST `/gift-card`, chọn **Configure item**, Sửa thành tính năng **derived from the prior response (response 4)** trong mục **Parameter handling** của từ khóa **gift-card**.

![image.png](https://images.viblo.asia/8ffa38c7-d86b-46ed-8e9c-ba75c3f3fc70.png)

- Bước 3. Test lại macro kiểm tra kết quả chính xác.

![image.png](https://images.viblo.asia/ee7374b5-3768-4e80-859c-58cb72e7d812.png)

- Bước 4. Thực hiện tấn công qua tính năng **Burp Intruder** với **Null payload**.

![image.png](https://images.viblo.asia/cb6be154-43b1-4d3e-a55e-c534ee23bd89.png)

![image.png](https://images.viblo.asia/3e0d65e7-9ded-4c10-9287-933f2d7f46d7.png)

![image.png](https://images.viblo.asia/c3936f5d-0c60-4b84-a2e8-f4f067ddf397.png)

Và chúng ta chỉ cần đợi tới khi số dư trong ví lớn hơn \$$1337$ là có thể đặt hàng (hoặc chỉ cần \$$935.90$ do có thể sử dụng voucher **SIGNUP30**)

![image.png](https://images.viblo.asia/d2abbc73-b9bd-455f-8fe5-c97b78eb020f.png)

### 7. Lỗ hổng logic trong cơ chế mã hóa dữ liệu

Chúng ta thường sử dụng các tham số (chẳng hạn như cookie, token, ...) nhằm thể hiện cho một yếu tố nào đó, và tất nhiên sẽ cần tới sự hỗ trợ của việc mã hóa dữ liệu. Phép mã hóa được xây dựng cần phù hợp với mục đích mã hóa dữ liệu, đồng thời có đủ độ phức tạp nhằm phòng tránh các cuộc tấn công từ kẻ xấu. Xét ví dụ nếu một trang web sử dụng một thuật toán mã hóa đủ mạnh có thể chống được tấn công, tuy nhiên, tồn tại chức năng đóng vai trò "mã hóa", đồng thời có một chức năng khác đóng vai trò "giải mã". Hai chức năng này hoạt động song song dẫn tới kẻ tấn công có thể lợi dụng hai cơ chế "mã hóa và giải mã miễn phí" này nhằm tìm kiếm dạng **plaintext** của một số tham số mã hóa. Từ đó họ có thể dựa vào một số đặc trưng của **plaintext** xây dựng các payload tấn công, mã hóa các payload này bằng cơ chế mã hóa sẵn có trong trang web. Cùng xem xét trường hợp sau để hiểu rõ hơn.

#### Phân tích lab **[Authentication bypass via encryption oracle](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-authentication-bypass-via-encryption-oracle)**

![image.png](https://images.viblo.asia/13c9fa1e-ffcc-4257-9245-0fb08fbc560b.png)

**Miêu tả:** Trang web chứa lỗ hổng logic dẫn tới tiết lộ cơ chế mã hóa encryption oracle. Để hoàn thành bài lab, chúng ta cần khai thác lỗ hổng này và truy cập tới trang quản trị, xóa tài khoản người dùng Carlos. Tài khoản hợp lệ được sử dụng: `wiener:peter`.

Tại trang đăng nhập có tính năng **Stay logged in**, đăng nhập cùng với ghi nhớ mật khẩu:

![image.png](https://images.viblo.asia/f3250e87-49fa-4f34-8dd5-081be6064dbd.png)

Hệ thống xác nhận tính năng ghi nhớ đăng nhập của người dùng thông qua cookie `sta-logged-in`:

![image.png](https://images.viblo.asia/ef40c32c-c203-48da-9ca9-279e96f78253.png)

Sau khi thử và đoán nhiều lần thì ... chúng ta chưa thể biết đây là dạng encode nào.

Tại chức năng comment, quan sát source code nhận thấy trường email không yêu cầu thuộc tính **type**:

![image.png](https://images.viblo.asia/1b29785a-c0d5-4783-ae8b-4c6e4fc09a73.png)

Bình luận với một email sai định dạng `wrongemail`, nhận được thông báo cùng với cookie `notification`:

![image.png](https://images.viblo.asia/d022bea2-cc36-49ae-8985-06ffff037ff2.png)

![image.png](https://images.viblo.asia/463151bd-44e7-45ff-9d71-4856c329ffd2.png)

So sánh hai request chứa cookie `notification` và không chứa nó.

- Request chứa cookie `notification`, response chứa dòng thông báo lỗi.

![image.png](https://images.viblo.asia/97ad8c1e-c0a5-47a7-994c-27170b77a5b4.png)

- Request không chứa cookie `notification`, response không còn dòng thông báo lỗi.

![image.png](https://images.viblo.asia/5aaf57b8-0dbb-4824-8baf-9123af1dd3b3.png)

Từ đây suy ra dòng thông báo lỗi trong response được quy định xuất hiện dựa vào cookie `notification`, hay giá trị cookie `notification` chính là mã hóa của dòng thông báo `Invalid email address: wrongemail`. Và dòng thông báo trả về cho người dùng chính là giá trị sau khi giải mã cho cookie `notification`.

Dự đoán trang web sử dụng cùng một kiểu mã hóa trong các cookie `stay-logged-in` và `notification`. Để kiểm tra điều này, chúng ta có thể thay giá trị cookie `notification` bằng giá trị `stay-logged-in`. Khi đó thông báo trong phản hồi sẽ chính là kết quả sau khi giải mã của giá trị `stay-logged-in`. Response tại trang comment blog đóng vai trò như một "máy giải mã".

![image.png](https://images.viblo.asia/055f2c56-72f2-4a8a-963a-a07e3276a1be.png)

Giá trị của cookie thể hiện cho tính năng ghi nhớ đăng nhập người dùng có định dạng: `username:timestamp`

Như vậy cookie `stay-logged-in` có liên hệ với tên đăng nhập của người dùng. Chúng ta có ý tưởng sau: nếu có thể encode giá trị chuỗi `administrator:timestamp` theo cơ chế encode của hệ thống sẽ có thể giả mạo tài khoản administrator.

Tuy nhiên, ở đây chúng ta gặp một vấn đề là không biết cơ chế mã hóa của hệ thống, nên ta sẽ cần mã hóa gián tiếp chuỗi `administrator:timestamp`, lựa chọn `timestamp` giống với tài khoản `wiener` vừa đăng nhập, chúng ta cần mã hóa chuỗi `administrator:1661759417904`. Chú ý rằng trường email đóng vai trò như một bộ máy mã hóa. Nhập giá trị `administrator:1661759417904` cho trường email, thu được cookie `notification` mới cùng thông báo mới `Invalid email address: administrator:1661759417904`

![image.png](https://images.viblo.asia/f7c054cc-7db4-4414-8f92-fb606ddf60a1.png)

Không khó để nhận ra rằng nhiệm vụ của chúng ta bây giờ là đưa thông báo `Invalid email address: administrator:1661759417904` về thông báo có định dạng mong muốn `administrator:1661759417904`.

Xóa thử ký tự đầu tiên của cookie `notification` nhận được thông báo:

![image.png](https://images.viblo.asia/af25728b-7067-4b16-89bf-d6a9abea6cfd.png)

Như vậy chúng ta có thể thao tác xóa các bits. Sử dụng tính năng Decoder trong Burp Suite, đầu tiên decode URL, tiếp theo decode Base64, để dạng hex thu được:

![image.png](https://images.viblo.asia/2d2aef07-d17d-484c-b1f4-748853e272fc.png)

Xóa thử bit đầu tiên, mã hóa trở lại theo quy trình trên, thay trở lại giá trị `notification`, nhận được thông báo:

![image.png](https://images.viblo.asia/75300104-8159-42ac-86ee-7927edfabc44.png)

![image.png](https://images.viblo.asia/7748aad7-774e-4b53-a406-f1e4839221cf.png)

Ta có độ dài bit input (hay độ dài bit `notification`) phải là bội của $16$. Lúc này chúng ta xóa cả một dòng đầu tiên (16 bits), mã hóa trở lại và thu được response:

![image.png](https://images.viblo.asia/0c9483b7-fe17-4465-9207-2481ef2ac93b.png)

![image.png](https://images.viblo.asia/ffa9bc9b-8842-49fd-aac6-142fef9ec29f.png)

Chúng ta được phép tăng hoặc giảm một bội số của $16$ bits, với $16$ bits vừa xóa thì chuỗi thông báo từ `Invalid email address: administrator:1661759417904` trở thành `dress: administrator:1661759417904`, nếu tiếp tục xóa thêm $16$ bits nữa sẽ thu được:

![image.png](https://images.viblo.asia/125c93bc-b0c1-4845-9eb4-84c60a024dad.png)

Bởi vậy, chúng ta cần thêm một lượng ký tự trước `xx...xadministrator:1661759417904` để sau khi xóa $32$ bits thì chỉ còn lại `administrator:1661759417904`. Sau khi thử nhiều lần, thì $9$ ký tự là vừa đủ `123456789administrator:1661759417904`. Sau khi xóa đi $32$ bits và mã hóa ngược lại, chúng ta thu được kết quả như mong muốn:

![image.png](https://images.viblo.asia/08257136-15db-442f-818d-04e5af3d28b7.png)

![image.png](https://images.viblo.asia/9978fef3-bb52-4829-a596-1d9b17161a4d.png)

Như vậy chúng ta thu được payload là cookie xác nhận tính năng tự động ghi nhớ đăng nhập của tài khoản `administrator`. Thay giá trị này vào cookie `stay-logged-in` (lưu ý cần xóa cookie `session` đi vì nó đang tương ứng với người dùng `wiener`), chúng ta truy cập thành công vào `administrator`:

![image.png](https://images.viblo.asia/910ca4ce-e558-4fa2-85af-586bde4ef580.png)

Xóa tài khoản người dùng Carlos và hoàn thành bài lab:

![image.png](https://images.viblo.asia/e4b70374-b915-4be1-8117-4704b698744b.png)

![image.png](https://images.viblo.asia/451f7f18-8a88-4cd5-8198-856f8a7e555c.png)

## Các nguồn tài liệu tham khảo

- [https://portswigger.net/web-security/logic-flaws](https://portswigger.net/web-security/logic-flaws)
- [https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability](https://owasp.org/www-community/vulnerabilities/Business_logic_vulnerability)
- [https://viblo.asia/p/lo-hong-business-logic-trong-bao-mat-ung-dung-website-1VgZvAQpKAw](https://viblo.asia/p/lo-hong-business-logic-trong-bao-mat-ung-dung-website-1VgZvAQpKAw)
- [https://en.wikipedia.org/wiki/Business_logic](https://en.wikipedia.org/wiki/Business_logic)