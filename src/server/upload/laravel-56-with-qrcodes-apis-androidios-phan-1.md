## I. Giới thiệu:

### 1. Kiến thức sau khi thực hành:

- Tìm hiểu về Laravel 5.6

- Tìm hiểu về database relationships

- Tìm hiểu tích hợp QRCodes vào trang web

- Tìm hiểu cách xây dựng ứng dụng  bằng QRCodes

- Tìm hiểu tích hợp thanh toán vào trang web

- Tìm hiểu cách xây dựng nền tảng thương mại điện tử

- Tìm hiểu cách xây dựng nền tảng API và Microservices 

- Tìm hiểu cách ghi lại các API và các dịch vụ nhỏ

- Tìm hiểu cách xây dựng trang web với các cấp và quyền người dùng nhiều người dùng

- Tìm hiểu cách xây dựng các chương trình phụ trợ quản trị

### 2. Nội dung chính:

- QRcodes- Cách tích hợp quét QRCodes và truy xuất thông tin vào nền tảng của bạn.

- Tích hợp thanh toán - Cách tích hợp các nền tảng thanh toán như paypal, mã vạch để cho phép người dùng thực hiện và nhận thanh toán trên nền tảng của bạn.

- API và microservices - cách xây dựng nền tảng dịch vụ microservice mạnh mẽ sẽ giúp các nhà phát triển khác có thể kết nối với nền tảng của bạn bằng cách sử dụng các packages như larravel passport.

- Phát triển ứng dụng dành cho thiết bị di động (Android và iOS) - Hoàn thành hướng dẫn về cách xây dựng các ứng dụng dành cho thiết bị di động và giúp chúng giao tiếp với các API và các dịch vụ nhỏ

## II. Mô tả cơ chế

![](https://images.viblo.asia/09999794-0709-4535-a62f-b85426d9a112.jpg)

- Website thương mại (Laravel): Các website thương mại điện tử như: Amazon, Alibaba

- Admin các website trên sẽ đến một secret platform (QRCode Processor) và đăng kí một list website của họ và sử dụng API được secret platform cung cấp .

- Khi có người shopping vào các website được đăng ký, trước khi đưa trang thanh toán, website sẽ gửi 1 QRCode Request và hệ thống secret platform gửi generate QRCode và trả lại website.

- Khi người đó vào trang thanh toán của website, họ sẽ thấy một QR code như là một tùy chọn. Khách hàng mở App trên điện thoại và quét Qrcode, chúng sẽ gửi một payment request đến secret platform (QRCode Processor) mà website đăng ký.

- Lúc này người dùng sẽ nhìn thấy một trang payment trên điện thoại, họ điền các thông tin thẻ thanh toán hoặc thông tin Paypal và thực hiện thanh toán trên điện thoại.

- Lúc này secret platform (QRCode Processor)gửi một “Payment Notification” sang Website thương mại với nội dung thông tin chi tiết của người thanh toán  ( họ trả bao nhiêu, trả cho mặt hàng nào ), và Website thương mại hiển thị lại nội dung thanh toán cho người mua, gửi emails hay .

## III. Cài đặt Laravel

1. Ở đây mình sử dụng wampserver 3.1.3 để chạy.

2. Chỉnh lại version PHP trong wampserver.

    B1: Bạn kích đúp biểu tượng wampserver.

    B2: Sau khi biểu tượng wampserver bật xanh, bạn kích chuột trái vào wampserver.

    B3: Đưa chuột đến dòng PHP-> đưa sang bảng vừa hiện dòng version -> Chọn version
    
    
    ![](https://images.viblo.asia/3acf28a7-d923-42d0-ad25-fa63ded9897f.png)
    
  
  3. Các bạn cài đặt composer theo hướng dẫn : https://getcomposer.org/download/

4. Tải Laravel về máy:

    B1: Chuyển đường dẫn hiện thời trong cmd về thư mục www của wamp 
    ![](https://images.viblo.asia/4d3d5db0-899c-4720-a473-50da82675e6e.png)
    
    B2: Gõ “ composer create-project --prefer-dist laravel/laravel laravel-qrcode-admin "5.6.*" , ấn enter và chờ đến khi tải xong project Laravel.
    
    ![](https://images.viblo.asia/c2d8c333-d79a-429e-a8a1-5db34cc3b60e.png)
    
    Thông báo thành công:
    
    ![](https://images.viblo.asia/c802bcf1-850a-4ad5-adef-c94b13f9188d.png)