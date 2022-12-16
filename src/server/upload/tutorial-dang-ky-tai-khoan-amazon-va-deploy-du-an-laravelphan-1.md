# Mở đầu
- Để đăng ký tài khoản Amazon web service (Google cloud platform, azure cloud services, Digital ocean ...) đều yêu cầu phải có thẻ visa hoặc master card các bạn có thể tham khảo [tại đây](https://services.amazon.vn/seller-education/siv.html)
- Hôm nay mình sẽ chỉ cho các bạn cách sở hữu master card nhanh hơn đó là sử dụng app viettel pay để đăng ký.
# Đăng ký tài khoản Viettle Pay
- Bước 1: Đăng nhập tài khoản vào ứng dụng [ViettelPay](https://play.google.com/store/apps/details?id=com.bplus.vtpay&hl=en) trên máy.

    ![](https://images.viblo.asia/9baa8832-c7f7-4f5d-8374-ac0b3510cfbf.jpg)
- Bước 2: Chọn biểu tượng cá nhân ở góc dưới bên phải.
    ![](https://images.viblo.asia/50fe018f-e5bb-4b70-b91e-8915b1148f5a.jpg)
- Bước 3: Trong danh sách tùy chọn của ViettelPay hãy nhấp chọn Thẻ
    ![](https://images.viblo.asia/7cf82391-2c53-4b7c-a903-0b1b8b680662.jpg)
- Bước 4: Chọn thẻ MasterCard
    ![](https://images.viblo.asia/547d7bb6-9852-4b83-b02e-d2e93daf99b2.jpg)
    
- Bước 5: Đăng ký phát hành thẻ
    - Tiếp đó nhập mật khẩu tài khoản ViettelPay của bạn vào, sau đó bạn sẽ thấy, một thông báo sẽ hiện ra với điều khoản phát hành thẻ MasterCard trên website của MBBank, phí tạo chỉ là 22.000 đồng. Bấm Trả lời để tiếp tục.
    
    ![](https://images.viblo.asia/cf7e822e-edab-412e-88ea-058b00a6a63f.jpg)
    - Lưu ý: Tiền trong ViettelPay của bạn phải đủ để trả phí tạo thẻ thì thẻ MasterCard mới tạo được. 
    
    ![](https://images.viblo.asia/daede233-9e8c-4fa4-bd16-c18e2d375171.jpg)

- Bước 6: Sau khi đăng ký thành công
    ![](https://images.viblo.asia/875b810f-8a70-4bb7-9309-02546ae91a2e.jpg)

# Đăng ký tài khoản Amazon web service
- Chi phí đăng ký tài khoản amazon là 1$ do đó cần phải nạp vào thẻ viettle pay để thanh toán lúc xác nhận.
- Bước 1: Truy cập vào [địa chỉ](https://portal.aws.amazon.com/billing/signup#/start) và nhập thông tin tài khoản AWS
    ![](https://images.viblo.asia/f7c41ea9-fd8f-4d1b-992e-09126f768d00.png)
- Bước 2: Nhập thông tin cá nhân của bạn
    - Account Type: Chọn loại tài khoản là “Personal”
    - Full name: Tên đầy đủ
    - Phone number: Số điện thoại
    - Country/Region: Quốc gia
    - Address: Địa chỉ hiện tại
    - City: Thành phố
    - State / Province or region: Bang (Đối với nước Mỹ) / Tỉnh thành (Đối với Việt Nam)
    - Postal code: Mã bưu điện, tham khảo mã bưu điện [tại đây](https://povietnam.com/zip-code-postal-code-viet-nam/)
    - Bấm [Create Account and Continue] để tiếp tục
    ![](https://images.viblo.asia/bcd99636-bfea-4ddb-881d-25916915d1a0.png)
- Bước 3: Nhập thông tin thẻ tín dụng Visa/MasterCard
    - Credit/Debit card number: Số thẻ Credit/Debit
    - Expiration date: Tháng/ Năm hết hạn
    - Cardholder’s name: Tên chủ thẻ
    - Bấm [Verify and Add] để tiếp tục
    ![](https://images.viblo.asia/4b29089e-59f4-4788-8377-a8e9fa8deece.png)
- Bước 4: Xác minh số điện thoại
    - Sau khi thẻ của bạn được chấp nhận, thì chuyển sang bước xác mình số điện thoại.
    - Lưu ý phải điền số bỏ số 0 ở đầu đi và điền giống trong hình, thay số điện thoại bằng số của bạn, nhớ chọn +84 là đầu số quốc gia của Việt Nam.
    ![](https://images.viblo.asia/18a8df5d-2c7f-4e3e-9b31-96d18b910459.png)
    - Sau khi xác nhận thành công sẽ ra màn hình sau
    ![](https://images.viblo.asia/c81c9fa1-8b8e-473e-8fe1-81b7b0562749.png)
- Bước 5: Chọn gói hỗ trợ cho tài khoản của bạn.
    - Chọn gói Basic (Free), sinh viên nghèo với mục đích học tập nên chỉ chọn gói free thôi.
    - Các bạn nếu có điều kiện, hoặc xây dựng hệ thống cho doanh nghiệp thì có thể chọn gói support mất phí.
    - Nếu gặp sự cố về hạ tầng AWS thì sẽ được nhân viên của AWS hỗ trợ.
    ![](https://images.viblo.asia/076f708d-daaa-4c56-9fab-58f40cca7218.png)
- Lưu ý: Thời gian để amazon xác thực thông tin tài khoản có thể mất 24h tùy vào từng tài khoản do đó nếu làm xong tất cả các bước mà chưa vào được thì vui lòng chờ để amazon xác thực.
# Tạo instance chạy EC2
- Bước 1: Sau khi đăng nhập vào tài khoản Amazon, chọn dịch vụ EC2(Amazon Elastic Compute Cloud)
        ![](https://images.viblo.asia/9d3a2d8e-e8fb-4d5b-9e84-31e48e85d4ab.png)
- Bước 2: Run một instance
        ![](https://images.viblo.asia/15cd6faa-eb81-4e81-b50f-91e9b849323a.png)
- Bước 3: Chọn hệ điều hành cho server, ở đây mình chọn ubuntu18.04 
        ![](https://images.viblo.asia/8aff8fa6-3af2-4552-a199-5e31aa846a37.png)
- Bước 4: Chọn loại Free-Tier và nhân Review and Launch
        ![](https://images.viblo.asia/f669eb65-12f5-4915-aa25-dd8b6c976961.png)
- Bước 5: Nhập Key pair name sau đó nhấn Download Key Pair(File key này dùng để ssh từ máy local lên server). Sau đó nhấn Launch instances
        ![](https://images.viblo.asia/f07df643-5240-49dd-af1f-f89eb9c3b430.png)
- Bước 6: Sau khi Luunch xong nhấn chuột phải vào instance và connect
        ![](https://images.viblo.asia/08b6aaec-d32e-4b54-8e99-215f22640775.png)
- Bước 7: Cấp quyền 400 cho file .pem vừa tạo ở bước 5. /home/ten_file.pem
        ![](https://images.viblo.asia/99b0e054-8afa-4cfd-ac3d-f0ebb526d459.png)
- Bước 8: SSH lên server(pwd tại thư mục chứa file .pem)
```bash
ssh -i "linhdn1198_demo.pem" ubuntu@ec2-3-14-12-188.us-east-2.compute.amazonaws.com
```
# Kết luận
- Trên đây là những hướng dẫn giúp bạn sở hữu master card phục vụ cho việc thanh toán quốc tế.
- Sở hữu một  web server free trong 12 tháng, phục vụ việc học tập, tìm hiểu.
- Bài viết sau mình sẽ chia sẽ cách deploy dự án laravel lên server.