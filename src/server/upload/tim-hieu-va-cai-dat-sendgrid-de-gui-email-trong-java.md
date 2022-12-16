# Tìm hiểu và cài đặt SendGrid để gửi email trong java

<br>
<br>
<br>

### 1. SendGrid là gì?

SendGrid là một nhà cung cấp dịch vụ email marketing. Ngoài ra họ cung cấp các dịch vụ máy chủ email để giúp gửi đi các email thông qua hệ thống SMTP miễn phí.

Ưu điểm:
- Sendgrid cung cấp giải pháp email dựa trên nền tảng đám mây thay thế cho hệ thống email truyền thống của bạn, do đó bạn không cần phải xây dựng, quy mô và duy trì các hệ thống mail server.
- Cho phép bạn gửi 12.000 email miễn phí mỗi tháng.
- Tốc độ gửi email rất nhanh, các email của bạn sẽ vào mục inbox và không bao giờ bị vào mục spam
- Dễ dàng mở rộng nâng cấp qui mô hệ thống, cung cấp khả năng đánh giá tính hiệu quả của các chiến dịch mail marketing cũng như 1 kho API với các tính năng hữu ích cần thiết

Nhược điểm:
- Là dịch vụ mất phí, nếu vượt quá giới hạn 12.000 email mỗi tháng, bạn sẽ phải trả 9.95$/tháng để được gửi tới 40.000 email. Nhưng cái này cũng không phải nhược điểm quá lớn.

<br>
<br>

### 2. Tạo tài khoản và tạo một API Key để sử dụng dịch vụ

<br>
<br>

**Bước 1:**
Bạn cần có một tài khoản SendGrid để sử dụng dịch vụ. Hãy truy cập đường link sau và làm các bước đăng ký cơ bản:

https://sendgrid.com/

Đây là giao diện khi đăng ký thành công và vào dashboard

<br>

![](https://images.viblo.asia/c772bcf4-73ba-4cc6-bb7f-d5873b8dbc3e.png)

<br>

**Bước 2:** Tạo API key để sử dụng chức năng.

Trên màn hình dashboard -> Settings -> ApiKeys. Sau đó chọn Create API key

<br>

![](https://images.viblo.asia/a45ca54b-cd56-4fd6-9088-711ebc5c4983.png)

<br>

Điền đầy đủ API Key Name và chọn API Key Permissions. Sau đó click Create and View

<br>

![](https://images.viblo.asia/9e6c80ff-e73b-453e-aefa-b2e192b91933.png)

<br>

Sau khi create xong, bạn nhớ copy lại API key nhé

<br>

![](https://images.viblo.asia/7a36c926-aa85-4dee-877f-a0ad73954108.png)

<br>

Copy xong thì ấn done.

<br>
<br>

### 3. Setting SendGrid trong project java

<br>
<br>

Ở bài này mình sẽ hướng dẫn các bạn cài đặt trong một project Spring boot. Khi bạn call một API sẽ thực hiện gửi mail.

**Bước 1:** Tạo một project spring đơn giản.

<br>

![](https://images.viblo.asia/63287faf-b389-4e2c-9889-c9cc3cdd35e2.png)

<br>

**Bước 2:** Thêm dependency sendgrid vào project

```
<dependency>
            <groupId>com.sendgrid</groupId>
            <artifactId>sendgrid-java</artifactId>
            <version>4.0.1</version>
</dependency>
```

**Bước 3:** Tổ chức project theo cấu trúc sau:

<br>

![](https://images.viblo.asia/b214e814-9cc2-4b17-9e5f-9fa5bb91f0af.png)

<br>

### Các file:

**SendGridExampleApplication**

```
@SpringBootApplication
public class SendGridExampleApplication {

  public static void main(String[] args) {
     SpringApplication.run(SendGridExampleApplication.class, args);
  }

}
```


**SendGridEmailController**

```
@RestController
public class SendGridEmailController {
   @Autowired
   private SendGridMailService sendGridMailService;

   @GetMapping("/test-send-email")
   @ResponseStatus(HttpStatus.NO_CONTENT)
   public void testSendEmail() {
       sendGridMailService.sendMail(
               "Test Send Email",
               "Hello SendGrid",
               Collections.singletonList("example@gmail.com"),
               null,
               null
       );
   }
}
```



**SendGridMailService**

```
public interface SendGridMailService {
   void sendMail(String subject, String content, List<String> sendToEmails, List<String> ccEmails, List<String> bccEmails);
}
```


**SendGridMailServiceImpl**

```
@Service
public class SendGridMailServiceImpl implements SendGridMailService {
   private static final String CONTENT_TYPE_TEXT_PLAIN = "text/plain";

   private static final String KEY_X_MOCK = "X-Mock";

   private static final String SEND_GRID_ENDPOINT_SEND_EMAIL = "mail/send";

   @Value("${send_grid.api_key}")
   private String sendGridApiKey;

   @Value("${send_grid.from_email}")
   private String sendGridFromEmail;

   @Value("${send_grid.from_name}")
   private String sendGridFromName;

   @Override
   public void sendMail(String subject, String content, List<String> sendToEmails, List<String> ccEmails, List<String> bccEmails) {
       Mail mail = buildMailToSend(subject, content, sendToEmails, ccEmails, bccEmails);
       send(mail);
   }

   private void send(Mail mail) {
       SendGrid sg = new SendGrid(sendGridApiKey);
       sg.addRequestHeader(KEY_X_MOCK, VALUE_TRUE);

       Request request = new Request();
       try {
           request.setMethod(Method.POST);
           request.setEndpoint(SEND_GRID_ENDPOINT_SEND_EMAIL);
           request.setBody(mail.build());
           Response response = sg.api(request);
           System.out.println(response.getStatusCode());
           System.out.println(response.getBody());
       } catch (IOException ex) {
           ex.printStackTrace();
       }
   }

   private Mail buildMailToSend(String subject, String contentStr, List<String> sendToEmails, List<String> ccEmails, List<String> bccEmails) {
       Mail mail = new Mail();

       Email fromEmail = new Email();
       fromEmail.setName(sendGridFromName);
       fromEmail.setEmail(sendGridFromEmail);

       mail.setFrom(fromEmail);

       mail.setSubject(subject);

       Personalization personalization = new Personalization();

       //Add sendToEmails
       if (sendToEmails != null) {
           for (String email : sendToEmails) {
               Email to = new Email();
               to.setEmail(email);
               personalization.addTo(to);
           }
       }

       //Add ccEmail
       if (ccEmails != null) {
           for (String email : ccEmails) {
               Email cc = new Email();
               cc.setEmail(email);
               personalization.addCc(cc);
           }
       }

       //Add bccEmail
       if (bccEmails != null) {
           for (String email : bccEmails) {
               Email bcc = new Email();
               bcc.setEmail(email);
               personalization.addBcc(bcc);
           }
       }
       mail.addPersonalization(personalization);

       Content content = new Content();
       content.setType(CONTENT_TYPE_TEXT_PLAIN);
       content.setValue(contentStr);
       mail.addContent(content);
       return mail;
   }
}
```

**application.properties**


```
send_grid.api_key=apikey
send_grid.from_email=demoSendGrid@gmail.com
send_grid.from_name=Demo SendGrid
```




**Sau khi thêm code xong vào project. Các bạn hãy chạy thử để kiểm tra thành quả của chính mình**