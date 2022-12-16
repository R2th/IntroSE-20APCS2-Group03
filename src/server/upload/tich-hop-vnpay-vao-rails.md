Xin chào 500 ae năm mới nhé! :hugs::hugs:

Hôm nay là ngày đẹp nên mình đã chọn làm ngày khai bút cho năm 2021 luôn. :heart_eyes::heart_eyes:

Tiếp nối câu chuyện về **Thanh toán online** mà mình có chia sẽ ở 2 bài trước, mọi người chưa đọc thì có thể vào xem [ở đây](https://viblo.asia/p/tich-hop-thanh-toan-online-vao-ung-dung-rails-RQqKLQbbZ7z) nhé. Lần trước mình có chia sẻ về 2 cổng thanh toán online quốc tế lớn hiện nay đó là **Paypal** và **Stripe**, trong quá trình làm việc với 2 ông lớn này thì mình thấy rằng nó chưa thực sự hỗ trợ nhiều cho Việt Nam mình đặc biệt là về mặt đăng kí tài khoản bussiness, hỗ trợ giao dịch với VNĐ. Thế nên mình quyết định dùng hàng nội địa để phục vụ cho người nội địa xem thế nào.

Sau một hồi tìm hiểu thì thấy có 2 cổng nội địa có thể tích hợp vào rails app đó là **momo** và **vnpay**. Thế là mình tiến hành liên hệ với cả 2, sau một vài hôm thì vnpay đã liên hệ mình trước và thế là mình đã chọn luôn vnpay để tiến hành tích hợp vào ứng dụng. Vậy quá trình mình tích hợp **vnpay** vào rails như thế nào và đã gặp được những hố gì nào?

Bài viết tập trung chủ yếu vào cách thức tích hợp vnpay nên mình xin phép bỏ qua phần giới thiệu về VNPAY nhé, mn có thể đọc hiểu thêm ở gg.
## 1. Chuẩn bị
- Trước hết để có thể tích hợp được VNPAY thì mình phải có account test do bên VNPAY cung cấp. Mn truy cập https://sandbox.vnpayment.vn/devreg để đăng kí account test VNPAY, sau khi đăng kí xong thì bên VNPAY sẽ gửi mail cho mình những thông tin về acc test như sau:
    - Thông tin cấu hình:
        + Tên Website kết nốt
        + Mã website
        + Secret key: Chuỗi bí mật dùng để tạo checksum
        + Url thanh toán môi trường TEST
        + URL QueryDR/Refund 
    - Thông tin truy cập Merchant Admin để quản lí giao dịch:
    - Tài liệu:
        - Tài liệu Hướng dẫn tích hợp: https://sandbox.vnpayment.vn/apis/docs/gioi-thieu/
        - Kịch bản test (SIT): https://sandbox.vnpayment.vn/apis/downloads/#tài-liệu-đặc-tả-kỹ-thuật
        - Code demo tích hợp: https://sandbox.vnpayment.vn/apis/downloads/#code-demo-tích-hợp
    - Thẻ test: Thông tin tài khoản test

=> Sau khi có được thông tin tài khoản test, ta bắt tay vào tích hợp thôi nào

## 2. Tiến hành tích hợp
Về cách thức tích hợp thì bên VNPAY cũng có viết document cũng khá là chi tiết, mn có thể xem ở đây https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop/.
Hiên tại code mẫu tích hợp không có ruby thế nên để tích hợp mình phải convert code mẫu từ php sang ruby.

Có 3 endpoint mình cần thực thi:
- URL thanh toán: URL này sẽ do bên VNPAY cung cấp cho chúng ta, khi tiến hành thanh toán thì mình sẽ gửi các thông tin mua hàng  đến URL này và việc còn lại sẽ do vnpay xử lí , URL có dạng như sau:
    ```
    http://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=10000000&vnp_BankCode=NCB&vnp_Command=pay&vnp_CreateDate=20170829103111&vnp_CurrCode=VND&vnp_IpAddr=172.16.68.68&vnp_Locale=vn&vnp_Merchant=DEMO&vnp_OrderInfo=Nap+tien+cho+thue+bao+0123456789.+So+tien+100%2c000&vnp_OrderType=topup&vnp_ReturnUrl=http%3a%2f%2fsandbox.vnpayment.vn%2ftryitnow%2fHome%2fVnPayReturn&vnp_TmnCode=2QXUI4J4&vnp_TxnRef=23554&vnp_Version=2&vnp_SecureHashType=SHA256&vnp_SecureHash=e6ce09ae6695ad034f8b6e6aadf2726f
    ```
    
     - Danh sách tham số:
     ![](https://images.viblo.asia/0ace1aa2-8f03-4a70-8edd-61b76b40f1a8.png)


- URL Return: URL này do mình tạo ra và sẽ gửi kèm qua URL thanh toán với key là *vnp_ReturnUrl*, mục đích của URL này là dùng để nhận thông tin giao dịch từ phía VNPAY trả về để hiển thị ra cho END_USER và không dùng cho việc cập nhật dữ liệu. Và có dạng sau:
    ```ruby
    https://mypage/return_url?vnp_Amount=1000000&vnp_BankCode=NCB&vnp_BankTranNo=20170829152730&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+don+hang+thoi+gian%3A+2017-08-29+15%3A27%3A02&vnp_PayDate=20170829153052&vnp_ResponseCode=00&vnp_TmnCode=2QXUI4J4&vnp_TransactionNo=12996460&vnp_TxnRef=23597&vnp_SecureHashType=SHA256&vnp_SecureHash=20081f0ee1cc6b524e273b6d4050fefd
    ```
- URL IPN: URL này bên mình sẽ tạo ra và gửi sang VNPAY để họ config ở phía server VNPAY, sau khi VNPAY tiếp nhận thông tin thanh toán từ **thanh toán URL** và xử lí các thông tin giao dịch hoàn thành thì đầu VNPAY sẽ gửi thông tin giao dịch như mã giao dịch, trang thái giao dịch,... về **URL IPN** do mình cung cấp. URL này mình sẽ dùng để cập nhật thông tin giao dịch vào DB. URL có dạng sau
    ```ruby
    http://mypage/vnpay_ipn?vnp_Amount=1000000&vnp_BankCode=NCB&vnp_BankTranNo=20170829152730&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+don+hang+thoi+gian%3A+2017-08-29+15%3A27%3A02&vnp_PayDate=20170829153052&vnp_ResponseCode=00&vnp_TmnCode=2QXUI4J4&vnp_TransactionNo=12996460&vnp_TxnRef=23597&vnp_SecureHashType=SHA256&vnp_SecureHash=20081f0ee1cc6b524e273b6d4050fefd
    ```
 
Dưới dây là work flow thanh toán bên phía VNPAY(nguồn vnpay):
![](https://images.viblo.asia/48083a21-5dd4-426b-b824-6d902b03031f.jpeg)

**a)  URL thanh toán**
   
   - Dựa vào document của VNPAY mình sẽ có được code mẫu, từ code mẫu mình tiến hành convert sang RUBY như dưới
      ```ruby
      # checkouts_controller.rb
      def execute
         order = Order.new
         ...
         vnp_url = get_payment_url(order, fallback_checkouts_url)

         redirect_to vnp_url
      end

      def fallback
         # this is URL return
         # todo here
      end

      private

          def get_payment_url(order_object, return_url)
              # Mã website bên VNPAY cung cấp ban đầu cho mình
              vnp_tmncode = ENV["VNP_TMNCODE"]
              # Chuỗi kí tự dùng cho việc mã hóa tham số do bên VNPAY cung cấp
              vnp_hash_secret = ENV["VNP_HASH_SECRET"]
              vnp_url = ENV["VNP_URL"]
              vnp_txnref = order_object.id
              vnp_order_info = "Thanh toan mua hang"
              vnp_order_type = "190000"
              vnp_amount = order_object.total_price_cents * 100
              vnp_local = "vn"
              vnp_ipadd = request.remote_ip

              input_data = {
                "vnp_Amount" => vnp_amount,
                "vnp_Command" => "pay",
                "vnp_CreateDate" => DateTime.current.strftime("%Y%m%d%H%M%S"),
                "vnp_CurrCode" => "VND",
                "vnp_IpAddr" => vnp_ipadd,
                "vnp_Locale" => vnp_local,
                "vnp_OrderInfo" => vnp_order_info,
                "vnp_OrderType" => vnp_order_type,
                "vnp_ReturnUrl" => return_url,
                "vnp_TmnCode" => vnp_tmncode,
                "vnp_TxnRef" => vnp_txnref,
                "vnp_Version" => "2.0.0",
              }
              original_data = input_data.map do |key, value|
                "#{key}=#{value}"
              end.join("&")

              vnp_url = vnp_url + "?" + input_data.to_query
              vnp_security_hash = Digest::SHA256.hexdigest(vnp_hash_secret + original_data)
              vnp_url += '&vnp_SecureHashType=SHA256&vnp_SecureHash=' + vnp_security_hash
              vnp_url
            end
      ```
  
  - Ở trên mình có tạo hàm **get_payment_url(order_object, return_url)** dùng để tạo ra URL thanh toán với các tham số ứng với yêu cầu của VNPAY. Dựa vào các thông tin liên quan đến website và bảo mật do bên VNPAY cung cấp, cộng với các thông tin khách hàng mình có thể dễ dàng tạo ra được các params thông tin mua hàng cần thiết đó là **input_data**.  Sau khi có được input_data mình sẽ đem nó đi tạo chuỗi mã hóa **vnp_security_hash**. Cuối cùng mình kết hợp **input_data** và **vnp_security_hash** để tạo nên **vnp_url**.
  - Một điểm lưu ý quan trọng là **các tham số có trong URL** trước khi đưa vào **mã hóa** piải được **sort theo thứ tự Alphabet**, ở bài viết của mình thì chính là các key-value có trong biến **input_data**. Vì đã bỏ qua điểm nhỏ này mà mình đã tốn kha khá thời gian để giải quyết được.
 
**b) URL return**
   
  - Khi tiếp nhận thông tin từ VNPAY bước đầu tiên mình cần làm đó phải **validate** xem giữ liệu có trong param có hợp lệ hay không. Bằng cách lấy các thông tin params: "vnp_Amount", "vnp_BankCode", "vnp_BankTranNo", "vnp_CardType", "vnp_OrderInfo", "vnp_PayDate", "vnp_ResponseCode", "vnp_TmnCode", "vnp_TransactionNo", "vnp_TxnRef"  có trong URL đem đi tạo chuỗi mã hóa, sau đó đem đi so sánh với chuỗi mã hóa trong params : **params["vnp_SecureHash"]**. Nếu 2 chuỗi này giống nhau thì là valid.
  - Như mình đã nói ở trên URL này chỉ dùng để hiển thị thông tin giao dịch cho END_USER biết chứ không dùng để cập nhật thông tin vào cơ sở dữ liệu.
  
      ```ruby
      # checkouts_controller.rb
       def fallback
        if checksum_valid!
          if params["vnp_ResponseCode"] == "00"
            current_user.cart.clear
            flash[:success] = t('.payment_success')
            redirect_to books_path
          else
            flash[:error] = t('.payment_failed')
            redirect_to checkouts_path
          end
        else
          flash[:error] = t('.payment_failed')
          redirect_to checkouts_path
        end
      end

      private
          def checksum_valid!
          vnp_secure_hash = params["vnp_SecureHash"]
          data = response_params.to_h.map do |key, value|
            "#{key}=#{value}"
          end.join("&")

          secure_hash = Digest::SHA256.hexdigest(ENV["VNP_HASH_SECRET"] + data)
          vnp_secure_hash == secure_hash
        end

        def response_params
          params.permit("vnp_Amount", "vnp_BankCode", "vnp_BankTranNo", "vnp_CardType", "vnp_OrderInfo", "vnp_PayDate", "vnp_ResponseCode", "vnp_TmnCode", "vnp_TransactionNo", "vnp_TxnRef")
        end
      ```
  
 **c) URL IPN**
 - Cũng tương tự Return URL, URL IPN cũng cần phải check thông tin hợp lệ trước khi tiếp tục xử lí
 - URL này sẽ dùng vào mục đích cập nhật dữ liệu vào db, khi implement mn cần thực thi đủ 8 case bên dưới. 8 case này do bên VNPAY cung cấp và sau mình tích hợp xong họ cũng sẽ cùng mình tiến hành test đủ 8 case, nếu pass hết thì sau đó mới tiên hành đưa lên mt production.
  ```ruby
  def vnp_ipn
    logger = Logger.new("#{Rails.root}/log/payment_#{Date.today.to_s}.log")
    response_data = []
    if checksum_valid!
      permit_params = response_params
      order_object = Order.find_by_id(permit_params["vnp_TxnRef"])
      if order_object
        if order_object.total_price_cents == (permit_params["vnp_Amount"].to_i / 100)
          if order_object.pending?
            if permit_params["vnp_ResponseCode"] == "00"
              order_object.set_paid
            else
              order_object.set_failed
            end
            # save vnp_TransactionNo
            order_object.transaction_id = permit_params['vnp_TransactionNo']
            order_object.save!

            code = "00"
            message = "Confirm Success"
          else
            code = "02"
            message = "Order already confirmed"
          end
        else
          code = "04"
          message = "Invalid amount"
        end
      else
        code = "01";
        message = "Order not found"
      end
    else
      code = "97";
      message = "Invalid Checksum"
    end

    logger.info("VNPAY with params: " + permit_params.to_s + ", code: #{code}, message: #{message}")

    render json: { "RspCode": code, "Message": message }
  rescue => e
    logger.error("VNPAY with params: " + permit_params.to_s + ", " + e.message)
    render json: { "RspCode": "99", "Message": "Unknow error" }
  end
  ```
  
=> Tổng kết:
- Cần 3 URL: URL thanh toán, URL Return, URL IPN
- Check thông tin valid dựa vào chuỗi bảo mật trước khi tiếp tục xử lí cho URL Return và URL IPN
- Cần sắp xếp thứ  tự các key trong params theo thứ tự ALPHABET trước khi tạo chuỗi bảo mật
- Implment đủ các case do bên VNPAY cung cấp.
## 3. Tài liệu tham khảo
- Tài liệu từ trang chủ VNPAY: https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop/
- Tài khoản ngân hàng test: https://sandbox.vnpayment.vn/apis/vnpay-demo/#th%C3%B4ng-tin-th%E1%BA%BB-test
- Một số thông tin có trong bài viết được lấy từ VNPAY.