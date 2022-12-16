# AWS SES là gì

SES là viết tắt của Simple Email Server, là một platform cho phép gửi và nhận email sử dụng email hay domain

Được sử dụng cho việc gửi các marketing emails, email thông báo trong hệ thống như đăng ký, newsletter, order info ..

# Pricing 

Tham khảo AWS SES pricing tại đây
https://aws.amazon.com/ses/pricing/
![](https://images.viblo.asia/18f2e7ac-99d0-4f57-a12b-85b61732c407.png)

Giá cả thì phụ thuộc theo region mà bạn chọn, với mức giá như trên thì bạn có thể thoải mái test mà lo bị charge tiền

Nếu bạn deploy ứng dụng lên EC2 (kể cả Free Usage Tier) và send mail từ đó sử dụng SES thì có thể gửi tới 62k email mà không mất phí

 # Tương thích với các các dịch vụ khác của AWS

* Gửi email từ EC2 sử dụng AWS SDK 
* Tương thích với AWS Elastic Beanstalk
* Cài đặt SNS để thông báo về việc email không gửi đi được hay đã gửi hết thành công tới người nhận
* Kiểm soát được việc người dùng access vào email sending bằng IAM
* Lưu trữ email trên dịch vụ S3
* Trigger email sử dụng AWS Lambda
* Đưa các event email sending sang Amazon Cloudwatch


# Send email từ ứng dụng EC2 và SES

Điều đầu tiên để sử dụng được SES hay bất cứ dịch vụ nào của AWS thì bạn cần có một tài khoản của AWS.
Tham khảo tại đây https://docs.aws.amazon.com/ses/latest/DeveloperGuide/sign-up-for-aws.html

## Tạo một smtp setting
1. truy cập vào ses service chọn region
![](https://images.viblo.asia/e2eccac6-78da-4fae-a24e-a25747943e55.png)

2. chọn SMTP settings
![](https://images.viblo.asia/97cf85be-83d1-4e9e-b4f8-568d228e50f0.png)

3. Và click vào nút create “Create my SMTP credential” button

4. SES sẽ tạo ra một IAM user cho việc authenticate, để default vào click create 
![](https://images.viblo.asia/3f21b1bd-244e-4b18-b88c-24905e3ece49.png)


5. Lấy thông tin credential từ file csv mà bạn có từ step 2 điền vào smtp setting trong ứng dụng của bạn
![](https://images.viblo.asia/9951db34-fef2-4c03-85f4-677b5df63600.png)


```
 config.action_mailer.smtp_settings = {
    :address   => ENV["ADD"],
    :port      => ENV["PORT"],# 587
    :user_name => ENV["USER_NAME"],
    :password  => ENV["PASSWORD"],
    :authentication => 'login',
    :enable_starttls_auto => true
  }
```

Để gửi được email đi bạn cần setup và chứng thực một email 

## Verify email 

1. Access SES service 
2. Click Email Address menu 
![](https://images.viblo.asia/0c6dfb10-6402-4dbe-83c9-3f645c2a6b67.png)

3. Click Verify new email button , Nhập địa chỉ email của bạn 
![](https://images.viblo.asia/c520a386-0583-4f4e-b547-ec5d5bc035cf.png)

4. Một thông báo AWS SES gửi cho bạn email confirm để chứng thực, vào mail box và click vào link confirm
![](https://images.viblo.asia/6029bb99-1f8e-42b3-8ea2-bfe4ad6fb84c.png)

5. Sau khi click vào email link confirmation mà AWS gửi bạn email của bạn sẽ được verify
![](https://images.viblo.asia/2b844d26-9acf-4d0f-a042-7e0f9c00bd06.png)

Như vậy là các bước setting đã hoàn tất, ứng dụng của bạn đã sẵn sàng gửi email tới bất cứ đâu với sender là email mà bạn vừa verify

## Sanbox limitation

Mặc định thì tài khoản SES service của bạn sẽ ở chế độ Sandbox và tài khoản sandbox thì có giới hạn 
* Sending quota: 200 emails / day
* Max send rate: 1 email /s 

Để gửi được nhiều email hơn bạn cần phải request ra khỏi sandbox sang môi trường product 

Detail https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html
# Tham khảo 
https://docs.aws.amazon.com/ses/latest/DeveloperGuide/Welcome.html