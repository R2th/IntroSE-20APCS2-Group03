![image.png](https://images.viblo.asia/30282d12-9b72-471c-98dd-436c5a83f3d4.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

**Dễ dàng giải quyết các vấn đề về các Interface không tương thích bằng cách sử dụng Adapter Pattern**

Các Design Patterns rất quan trọng đối với các Web Developer và chúng ta có thể code tốt hơn hơn bằng cách thành thạo chúng. Trong bài viết này, mình sẽ sử dụng **TypeScript** để giới thiệu **Adapter Pattern.**

Kịch bản thường gặp
=========

Trong hệ thống web, mail service là một dịch vụ được sử dụng rất phổ biến. Trên nền tảng Node.js, chúng ta có thể sử dụng mô-đun [nodemailer](https://github.com/nodemailer/nodemailer) để dễ dàng implement chức năng gửi email. Sau khi cài đặt thành công mô-đun [nodemailer](https://github.com/nodemailer/nodemailer), bạn có thể làm theo các bước bên dưới để gửi email:

```javascript
let transporter = nodemailer.createTransport(transport[, defaults]);
transporter.sendMail(data[, callback])
```

Để tránh ràng buộc **mail service** với một **service provider** cụ thể, trước khi phát triển **mail service**, chúng ta xác định Interface liên quan đến **mail provider**:

```javascript
interface EmailProvider {
  sendMail(options: EmailOptions): Promise<EmailResponse>;
}
interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  text?: string;
}
interface EmailResponse {}
```

Với các Interface này, chúng ta có thể dễ dàng tạo một **mail service**:

```javascript
class EmailService {
  constructor(public emailProvider: EmailProvider) {}
  async sendMail(options: EmailOptions): Promise<EmailResponse> {
    const result = await this.emailProvider.sendMail(options);
    return result;
  }
}
```

Hiện tại, giải pháp này không phải không có vấn đề, nhưng nếu một ngày nào đó chúng ta cần sử dụng **email cloud service provider** của bên thứ ba. Chẳng hạn như **sendgrid** hoặc **mailersend**,v.v. Bạn sẽ thấy tên của hàm mà SDK sử dụng để gửi thư là `send`. Vì vậy, chúng ta tiếp tục và xác định một Interface `CloudEmailProvider`:

```javascript
interface CloudEmailProvider {
  send(options: EmailOptions): Promise<EmailResponse>;
}
```

So sánh Interface được xác định trước đó `EmailProvider`, bạn sẽ thấy vấn đề sau:

![Screenshot 2022-12-02 at 23.31.59.png](https://images.viblo.asia/10abeff3-49f4-487d-a4c9-e4aa6ff7e6b2.png)

Do đó, chúng ta không thể trực tiếp sử dụng `EmailService` để truy cập các **email cloud service provider** của bên thứ ba. Để giải quyết vấn đề này, có nhiều cách. Hãy xem cách sử dụng **Adapter Pattern** để giải quyết vấn đề trên.

Adapter Pattern
======

Mục đích của Adapter Pattern là cho phép hai đối tượng không hoạt động cùng nhau được do Interface không khớp với nhau. Nó giống như chất keo, biến đổi những thứ khác nhau để chúng có thể làm việc cùng nhau.
Hoặc giễ hình dung nhất là khi bạn qua **Nhật** tất cả ổ cắm đều là đầu dẹt => chúng ta cần một Adapter tương ứng để xử lý việc này.

Trong ví dụ trên Adapter Pattern chứa các vai trò sau:

*   **Client(EmailService)** : Đối tượng cần sử dụng  Target interface;
*   **Target(EmailProvider)** : Xác định Interface mà Client mong đợi;
*   **Adapter(CloudEmailAdapter)** : Điều chỉnh Adapter Interface thành Target interface;
*   **Adapter(CloudEmailProvider)** : Xác định Interface cần được điều chỉnh.

Sau khi lướt qua một số thứ cần tạo để apply **Adapter Pattern** vào ví dụ này, trước tiên hãy tạo class `CloudEmailAdapter`:

```javascript
class CloudEmailAdapter implements EmailProvider {
  constructor(public emailProvider: CloudEmailProvider) {}
  async sendMail(options: EmailOptions): Promise<EmailResponse> {
    const result = this.emailProvider.send(options);
    return result;
  }
}
```

Trong đoạn code trên, vì hai Interface của `EmailProvider` và `CloudEmailProvider` không khớp nhau, chúng ta tạo một class `CloudEmailAdapter` để giải quyết vấn đề tương thích.

Tiếp theo, chúng ta lấy service `sendgrid` làm ví dụ để implement `SendgridEmailProvider`:

```javascript
import { MailService } from "@sendgrid/mail";
class SendgridEmailProvider implements CloudEmailProvider {
  private sendgridMail: MailService;
  constructor(
    private config: {
      apiKey: string;
      from: string;
    }
  ) {
    this.sendgridMail = new MailService();
    this.sendgridMail.setApiKey(this.config.apiKey);
  }
  async send(options: EmailOptions): Promise<EmailResponse> {
    const result = await this.sendgridMail.send(options);
    return result;
  }
}
```

*Hint: Đoạn code trên chỉ để show cho các bạn thấy cách dùng apply Pattern và cần được điều chỉnh cho phù hợp khi được sử dụng trong các project thực tế.*

Bây giờ các lớp `SendgridEmailProvider` và `CloudEmailAdapter` đã được định nghĩa, hãy xem cách sử dụng chúng:

```javascript
const sendgridMail = new SendgridEmailProvider({
  apiKey: "******",
  from: "bytefer@gmail.com",
});
const cloudEmailAdapter = new CloudEmailAdapter(sendgridMail);
const emailService = new EmailService(cloudEmailAdapter);
emailService.sendMail({
  to: "******",
  subject: "Adapter Design Pattern",
  html: "<h3>Adapter Design Pattern</h3>",
  from: "bytefer@gmail.com",
});
```

=> bay giờ thì cho dù là service nào thì các bạn cũng có thể sử dụng hàm `sendMail`. 

**VD ngoài lề: Máy tình thường có Adapter sac => qua Nhật 110V hay về VN 220V... cứ có Adapter sạc thì mọi thứ đều giống nhau chỉ cần thực hiện hành động cắm nó vào ổ điện là xong.**

Cuối cùng, các kịch bản sử dụng của Adapter Pattern:

*   Hệ thống cần sử dụng một class hiện có và Interface của class này không đáp ứng nhu cầu của hệ thống, nghĩa là Interface không tương thích;
*   Sử dụng service do bên thứ ba cung cấp, nhưng định nghĩa Interface của dịch vụ này lại khác với định nghĩa Interface của bạn.

Roundup
========================================
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
========================================
* https://tuan200tokyo.blogspot.com/2022/12/blog59-design-patterns-adapter-pattern.html