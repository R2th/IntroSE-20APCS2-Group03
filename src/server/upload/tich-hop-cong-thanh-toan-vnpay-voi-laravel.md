Với các website thương mại điện tử, mua bán online việc quan trọng nhất là phải tích hợp được phương thức thanh toán online để tạo sự tiện lợi cho người dùng. Ở Việt Nam có rất nhiều cổng thanh toán đã được đưa vào sử dụng trong những năm gần đây: Ngân Lượng, Bảo Kim, VTC pay, OnePay, VNpay. Tuy nhiên VN Pay theo ý kiến cá nhân của mình VNpay hiện tại vẫn là cổng thanh toán có paygate chuẩn và tin cậy.  
Để tích hợp VNpay vào tài liệu bạn đọc có thể tìm hiểu thêm và chi tiết tại đậy: [https://sandbox.vnpayment.vn/apis/](https://sandbox.vnpayment.vn/apis/)
Bài viết sẽ hướng dãn tích hợp code của VNPay với tài khoản Sanbox của VnPay. Để kiểm thử và dùng thử với tài khoản thật. Lập trình viên, hoặc công ty liên hệ với VN Pay để được hỗ trợ.
## I. Quy Trình kết nối thanh toán tại VN PAY
![](https://images.viblo.asia/f922f5d8-266b-41a8-8055-29dbf5143cf4.png) 

* Bước 1: Client thực hiện Thanh toán trực tuyến trên Website.
* Bước 2: Website tạo thông tin thanh toán dưới dạng URL mang thông tin thanh toán và chuyển hướng khách hàng sang Cổng thanh toán VNPAY.
    Cổng thanh toán VNPAY xử lý yêu cầu Thanh toán đó. Client nhập các thông tin được yêu cầu để thực hiện việc Thanh toán.
* Bước 3,4: Client nhập thông tin để xác minh tài khoản Ngân hàng của khách hàng và xác thực giao dịch.
* Bước 5: Giao dịch thành công tại Ngân hàng, VNPAY tiến hành:
     Chuyển hướng khách hàng về Website hiển thị cho người dùng (vnp_ReturnUrl) và
    thông báo cho Website TMĐT kết quả thanh toán của client thông qua vnp_IpnURL.
* Bước 6: Hiển thị kết quả giao dịch tới khách hàng.

## II. Tích hợp code VNPay với PHP - Laravel
Bạn có thể download code mẫu của VNPay  tại [đây](https://goo.gl/4mjkd2).

Để Có thể đăng kí tài khoản test tại [https://sandbox.vnpayment.vn/devreg](https://sandbox.vnpayment.vn/devreg)

![](https://images.viblo.asia/29c3ce28-c891-43d5-a256-ba064f7845d5.png)
 
 Sau đó, VN Pay sẽ gửi cho bạn 02 thông tin cấu hình để định danh website đó trên hệ thống Cổng thanh toán: 
**vnp_TmnCode**: Mã của Website được khai báo tại hệ thống Cổng Thanh toán VNPAY 
**vnp_HashSecret**: Chuỗi bí mật sử dụng để kiểm tra toàn vẹn dữ liệu khi hai hệ thống trao đổi thông tin (checksum) .

Bạn có thể sử dụng tài khoản test của VNPay cung cấp. Các tài khoản test được cấp trên trang hỗ trợ của VNPay :[https://sandbox.vnpayment.vn/apis/vnpay-demo/](https://sandbox.vnpayment.vn/apis/vnpay-demo/)



Khi đã có 2 thông tin cấu hình để truy cập cổng thanh toán của VNPay tạo vnp_url trong function gọi thanh toán tới Vnpay:
```
public function create(Request $request)
    {
        session(['cost_id' => $request->id]);
        session(['url_prev' => url()->previous()]);
        $vnp_TmnCode = "UDOPNWS1"; //Mã website tại VNPAY 
        $vnp_HashSecret = "EBAHADUGCOEWYXCMYZRMTMLSHGKNRPBN"; //Chuỗi bí mật
        $vnp_Url = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://localhost:8000/return-vnpay";
        $vnp_TxnRef = date("YmdHis"); //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
        $vnp_OrderInfo = "Thanh toán hóa đơn phí dich vụ";
        $vnp_OrderType = 'billpayment';
        $vnp_Amount = $request->input('amount') * 100;
        $vnp_Locale = 'vn';
        $vnp_IpAddr = request()->ip();

        $inputData = array(
            "vnp_Version" => "2.0.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . $key . "=" . $value;
            } else {
                $hashdata .= $key . "=" . $value;
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
           // $vnpSecureHash = md5($vnp_HashSecret . $hashdata);
            $vnpSecureHash = hash('sha256', $vnp_HashSecret . $hashdata);
            $vnp_Url .= 'vnp_SecureHashType=SHA256&vnp_SecureHash=' . $vnpSecureHash;
        }
        return redirect($vnp_Url);
    }
```
Danh sách các tham số dùng ở trên để cấp cho VN Pay thông tin của thanh toán:
* vnp_Version:	Phiên bản api mà merchant kết nối. Phiên bản hiện tại là 2.0.0
* vnp_Command:	Mã API sử dụng, mã cho giao dịch thanh toán là pay
* vnp_TmnCode:	Mã website của merchant trên hệ thống của VNPAY. Ví dụ: 2QXUI4J4
* vnp_Amount:	Số tiền thanh toán. Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ. Để gửi số tiền thanh toán là 10,000 VND (mười nghìn VNĐ) thì merchant cần nhân thêm 100 lần (khử phần thập phân), sau đó gửi sang VNPAY là: 1000000
* vnp_BankCode:	Mã Ngân hàng thanh toán. Ví dụ: NCB
* vnp_CreateDate:	Ví dụ: 20170829103111
* vnp_CurrCode:	Đơn vị tiền tệ sử dụng thanh toán. Hiện tại chỉ hỗ trợ VND
* vnp_IpAddr:	Địa chỉ IP của khách hàng thực hiện giao dịch. Ví dụ: 13.160.92.202
* vnp_Locale:	Ngôn ngữ giao diện hiển thị. Hiện tại hỗ trợ Tiếng Việt (vn), Tiếng Anh (en)
* vnp_OrderInfo:	Thông tin mô tả nội dung thanh toán (Tiếng Việt, không dấu). Ví dụ: **Thanh toan hoa don. So tien 2,000,000 VND**
* vnp_OrderType:	Mã danh mục hàng hóa. Mỗi hàng hóa sẽ thuộc một nhóm danh mục do VNPAY quy định. Xem thêm bảng Danh mục hàng hóa
* vnp_ReturnUr:	URL thông báo kết quả giao dịch khi Khách hàng kết thúc thanh toán. Ví dụ: http://localhost:8000/return-vnpay
* vnp_TxnRef:	Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất đùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày. Ví dụ: 23554
* vnp_SecureHashType:	Loại mã băm sử dụng: MD5, SHA256
* vnp_SecureHash	Mã kiểm tra (checksum) để đảm bảo dữ liệu của giao dịch không bị thay đổi trong quá trình chuyển từ merchant sang VNPAY. Việc tạo ra mã này phụ thuộc vào cấu hình của merchant và phiên bản api sử dụng. Phiên bản hiện tại hỗ trợ SHA256 và MD5. Ví dụ:e6ce09ae6695ad034f8b6e6aadf2726f

Sau đó tất cả mọi hoạt động thanh toán sẽ được thực hiện trên VNpay. Khi thực hiện xong, VnPay trả về kết quả theo  vnp_ReturnUrl đã truyền lên trong hàm Create. Lúc này ta viết hàm để  trả lại kết quả cho KH

```
public function return(Request $request)
{
    $url = session('url_prev','/');
    if($request->vnp_ResponseCode == "00") {
        $this->apSer->thanhtoanonline(session('cost_id'));
        return redirect($url)->with('success' ,'Đã thanh toán phí dịch vụ');
    }
    session()->forget('url_prev');
    return redirect($url)->with('errors' ,'Lỗi trong quá trình thanh toán phí dịch vụ');
}
```
Lưu ý:
function này chỉ kiểm tra toàn vẹn dữ liệu (checksum) và hiển thị thông báo tới khách hàng
Không cập nhật kết quả giao dịch tại function này.
Để lưu hoặc cập nhật kết quả cũng như xử lý backend ta xử lý trong ipn_URL mà VNPay trả về, có thể đọc thêm tại [https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop/](https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop/)

Việc tích hợp VNPay và ứng dụng của bạn rất dễ dàng. VNPay đã hỗ trợ demo rất dễ hiểu và dễ tích hợp.