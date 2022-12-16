## 1. Dịch vụ Mail - SendGrid API là gì?

![](https://images.viblo.asia/e15ec6fb-45f3-4d82-a03b-e0dc5f505bd5.jpg)

SendGrid là 1 trong những dịch vụ nổi tiếng trong việc cung cấp email giao dịch (transaction email). Sendgrid cung cấp giải pháp email dựa trên nền tảng đám mây thay thế cho hệ thống email truyền thống của bạn, do đó bạn không cần phải xây dựng, quy mô và duy trì các hệ thống mail server.

Sử dụng SendGrid giúp giảm bớt lượng mail gửi đến thư mục rác (junk folder), dễ dàng mở rộng nâng cấp qui mô hệ thống, cung cấp khả năng đánh giá tính hiệu quả của các chiến dịch mail marketing cũng như 1 kho API với các tính năng hữu ích cần thiết.

## 2. API Reference
### Send Mail
SendGrid cung cấp các thư viện để giúp bạn tích hợp nhanh chóng và dễ dàng với API Web v3 bằng 7 ngôn ngữ khác nhau: C # , Go , Java , NodeJS , PHP , Python và Ruby.
```
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"personalizations": [{"to": [{"email": "emailTo@gmail.com"}]}],"from": {"email": "emailFrom@gmail.com"},"subject": "Hello, World!","content": [{"type": "text/plain", "value": "Welcom to SendGrid!"}]}'

```
Tất cả các yêu cầu đối với API Web v3 phải được thực hiện thông qua HTTPS. Cách tốt nhất là sử dụng Content-Type: application/json tiêu đề trong tất cả các yêu cầu của bạn.
Web API v3 cho phép RESTful và chấp nhận các yêu cầu GET, POST, PUT và DELETE, tùy thuộc vào data.
SendGrid có thể phân tích cú pháp nội dung email và tệp đính kèm từ email đến và gửi chúng lên ứng dụng web của bạn.
Đôi khi việc send mail của bạn tạo ra lỗi. Mọi phản hồi đối với lệnh gọi API tạo lỗi sẽ bao gồm mã lỗi, lý do lỗi và thông báo lỗi để giúp bạn gỡ lỗi yêu cầu của mình.


| Mã số | Lý do | Sự miêu tả |
| -------- | -------- | -------- |
| 4xx     | Phản hồi 4xx cho biết lỗi với yêu cầu của bạn     | Yêu cầu của bạn có vấn đề.  |
| 400     | BAD YÊU CẦU     |   |
| 401     | KHÔNG ĐƯỢC PHÉP    | Bạn không có quyền thực hiện yêu cầu.  |
| 403     | FORBIDDEN     |   |
| 404     | KHÔNG TÌM THẤY	   |  Không thể tìm thấy hoặc không tìm thấy tài nguyên bạn đã cố định vị trí. |
| 405     | PHƯƠNG PHÁP KHÔNG ĐƯỢC PHÉP     |   |
| 413     | PAYLOAD QUÁ LỚN	     | Tải trọng JSON mà bạn đã bao gồm trong yêu cầu của bạn quá lớn.  |
| 429     | QUÁ NHIỀU YÊU CẦU     |  Số lượng yêu cầu bạn đã thực hiện vượt quá giới hạn tốc độ của SendGrid. |
| 5xx     | Câu trả lời 5xx cho biết lỗi do SendGrid thực hiện     |  Yêu cầu bạn đã thực hiện hợp lệ, nhưng đã xảy ra lỗi khi SendGrid cố gắng xử lý yêu cầu đó. |
| 500     | LỖI MÁY CHỦ     |  Đã xảy ra lỗi trên máy chủ SendGrid. |
| 400     | DỊCH VỤ KHÔNG CÓ S AVN     | API Web SendGrid v3 không khả dụng.  |

### Marketing Campaigns API

![](https://images.viblo.asia/76962866-296f-4afb-abea-6f292c01cf74.png)

API gửi email tiếp thị của SendGrid cung cấp cho nhà phát triển khả năng quản lý email tiếp thị , danh sách , danh tính và sự kiện phân phối lịch biểu.
Đây là một tính năng nâng cao của việc gửi Mail khi bạn là 1 nhà cung cấp các sản phẩm hay là 1 mạng lưới người dùng, việc gửi mai cho một list người dùng cụ thể và theo những template khác nhau được thực hiện một cách dễ dàng và nhanh chóng, cùng với các cơ chế quản lý, lọc, đính kèm tập tin rất hiệu quả.

### SMTP
Đây là một giao thức chứ không phải là một API. SMTP được hỗ trợ rộng rãi bởi các ứng dụng và thường là cách nhanh nhất để tích hợp với SendGrid.
SendGrid cung cấp hai cách để gửi email: thông qua SMTP relay hoặc thông qua API Web.
Bạn có thể tích hợp SendGrid với một ứng dụng hiện có, việc thiết lập ứng dụng để sử dụng relay SMTP của SendGrid là dễ nhất, vì nó chỉ yêu cầu sửa đổi cấu hình SMTP.
* Change your SMTP username and password to your SendGrid credentials
* Set the server host name to smtp.sendgrid.net
* Use ports 25 or 587 for plain/TLS connections and port 465 for SSL connections

### Thông báo sự kiện thời gian thực Webhook
SendGrid có thể gửi thông báo thời gian thực về các sự kiện xảy ra trên hệ thống SendGrid tới một URL. Những sự kiện này bao gồm nhấp chuột, mở, hủy đăng ký, bị trả lại và nhiều sự kiện khác. Những sự kiện này bao gồm nhiều dữ liệu hơn so với những gì SendGrid ghi lại và cho phép khách hàng tùy chỉnh báo cáo của riêng họ. Điều làm cho API này mạnh mẽ hơn nữa là khả năng bao gồm các tham số do người dùng xác định trong mỗi sự kiện. Thông qua API SMTP của chúng tôi, khách hàng có thể nhúng các thông số duy nhất trong mỗi email mà họ gửi. Các thông số này sau đó được chuyển đến từng thông báo sự kiện để ứng dụng của bạn có thể liên kết các sự kiện này với khách hàng của bạn. Đọc thêm về Event Webhook . Ví dụ về các ứng dụng bao gồm:
* Liên kết báo cáo spam với một chiến dịch và người dùng cụ thể trong ứng dụng của bạn
* Biết thời gian thực khi người dùng đã nhấp vào email xác nhận
* Nhận liên kết cụ thể được nhấp vào một email
* Tải phiên bản trình duyệt được khách hàng sử dụng
* Biết đáp ứng MTA cụ thể cho khách hàng
![](https://images.viblo.asia/d0b497f0-e4e4-4aa2-a02c-e4a4b68a8b78.png)

## 3. Sử dụng SendGrid trong JAVA
Tiến hành get API key.
![](https://images.viblo.asia/fd54f347-0990-48e8-b450-cd20d7b09121.png)

Send Mail:
```
package com.sendgrid;

// using SendGrid's Java Library
// https://github.com/sendgrid/sendgrid-java
import java.io.IOException;

import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

public class SendMailExample {
  public static void main(String[] args) throws IOException {
	  	Email from = new Email("mailFrom@gmail.com");
	    String subject = "SendGrid send mail test";
	    Email to = new Email("mailTo@gmail.com");
	    Content content = new Content("text/plain", "and easy to do anywhere, even with Java");
	    Mail mail = new Mail(from, subject, to, content);

	    SendGrid sg = new SendGrid("Your API Key");
	    Request request = new Request();
	    try {
	      request.setMethod(Method.POST);
	      request.setEndpoint("mail/send");
	      request.setBody(mail.build());
	      Response response = sg.api(request);
	      System.out.println(response.getStatusCode());
	      System.out.println(response.getBody());
	      System.out.println(response.getHeaders());
	    } catch (IOException ex) {
	      throw ex;
	}
  }
}
```

![](https://images.viblo.asia/deda9954-144d-4715-8fea-2f25d705d501.png)

### Truy xuất các hoạt động Mail
GET /access_settings/activity
```
 try {
    SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
    Request request = new Request();
    request.setMethod(Method.GET);
    request.setEndpoint("access_settings/activity");
    request.addQueryParam("limit", "1");
    Response response = sg.api(request);
    System.out.println(response.getStatusCode());
    System.out.println(response.getBody());
    System.out.println(response.getHeaders());
  } catch (IOException ex) {
    throw ex;
  }
```

Ở phần get thông tin activity ta có thể tracking thông tin mail như Open, Click, Timestamp ... để kiểm soát thông kê hoạt động mail của người dùng.

Nguồn tham khảo: https://sendgrid.com/docs/index.html