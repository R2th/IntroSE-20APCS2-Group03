![](https://images.viblo.asia/2ed6d10d-a495-4846-867b-854c50eb3a9d.png)

## 1. Giới thiệu
* Facade là một mẫu thiết kế thuộc nhóm cấu trúc (Structural Pattern). 
* Facade Pattern cung cấp cho chúng ta một giao diện chung đơn giản thay cho một nhóm các giao diện có trong một hệ thống con (subsystem). Facade Pattern định nghĩa một giao diện ở cấp độ cao hơn để giúp cho người dùng có thể dễ dàng sử dụng hệ thống con này.
* Facade Pattern cho phép các đối tượng truy cập trực tiếp giao diện chung này để giao tiếp với các giao diện có trong hệ thống con. Mục tiêu là che giấu các hoạt động phức tạp bên trong hệ thống con, làm cho hệ thống con dễ sử dụng hơn.
* Tần suất sử dụng: khá cao
## 2. Mục đích ra đời
### Problem
Khi ta chúng ta có chuỗi các hành động được thực hiện theo thứ tự, và các hành động này lại được yêu cầu ở nhiều nơi trong phạm vi ứng dụng của chúng ta (ví dụ khi làm việc với một số lượng lớn các đối tượng trong hệ thống hay một thư viện phức tạp, chúng ta cần phải tự khởi tạo tất cả đối tượng này, thường xuyên theo dõi các thay đổi của nó, thứ tự logic cũng phải xử lý chính xác với bên thứ 3. Từ đó logic nghiệp vụ của các lớp trở nên gắn kết chặt chẽ với thư viện thử 3)

=> Vậy mỗi lúc bạn cần dùng đến nó bạn lại phải copy/paste hoặc viết lại đoạn code đó vào những nơi cần sử dụng trong ứng dụng. Điều này có vẻ cũng giúp ta nhanh hơn, nhưng nếu chúng ta nhận ra cần phải thay đổi lại cấu trúc và hoặc một đoạn code nào đó trong hầu hết chuỗi hành động đó, vậy chúng ta phải xử lý như thế nào?

![](https://images.viblo.asia/ac5b8b8c-0aad-46c5-94ae-5400c1990d9e.png)

Đây chính là mấu chốt của vấn đề, chúng ta sẽ phải đi lục lại đoạn code đó ở tất cả các nơi, rồi lại sửa nó. Điều này quá tốn thời gian và hơn nữa lại còn mất đi sự kiểm soát các đoạn code của chúng ta và trong quá trình đó còn có nguy cơ phát sinh lỗi. Vậy giải pháp là gì?
### Solution
Chúng ta cần thiết kế một Facade, và trong đó phương thức của Facade sẽ xử lý các đoạn code được sử dụng với nhiều, lặp lại. Với Facade, chúng ta sẽ chỉ cần gọi Facade để thực thi các hành động dựa trên các parameters được cung cấp.

=> Bây giờ nếu chúng ta cần bất kỳ thay đổi nào trong quá trình trên, công việc sẽ đơn giản hơn rất nhiều, chỉ cần thay đổi các xử lý trong façade, mọi thứ sẽ được đồng bộ
![](https://images.viblo.asia/51de245b-2a3a-43d8-b88f-f68e847e032c.png)

## 3. Kiến trúc
![](https://images.viblo.asia/e0ce5777-c04e-4ac4-8303-c44d0901168d.png)

Các thành phần trong mô hình:
* *Facade:* Facade nắm rõ được hệ thống con nào đảm nhiệm việc đáp ứng yêu cầu của client, nó sẽ chuyển yêu cầu của client đến các đối tượng hệ thống con tương ứng.
* *Addition Facade:* có thể được tạo ra để tránh việc làm phức tạp một facade. Có thể được sử dụng bởi cả client và facade.
* *Complex Subsystems:* Bao gồm nhiều object khác nhau, được cài đặt các chức năng của hệ thống con, xử lý công việc được gọi bởi Facade. Các lớp này không cần biết Facade và không tham chiếu đến nó.
* *Client:* Đối tượng sử dụng Facade để tương tác với các subsystem thay vì gọi subsystem trực tiếp

Các đối tượng Facade thường là Singleton bởi vì chỉ cần duy nhất một đối tượng Facade.
## 4. Ưu & nhược điểm
#### Ưu điểm
* Ta có thể tách mã nguồn của mình ra khỏi sự phức tạp của hệ thống con
* Hệ thống tích hợp thông qua Facade sẽ đơn giản hơn vì chỉ cần tương tác với Facade thay vì hàng loạt đối tượng khác.
* Tăng khả năng độc lập và khả chuyển, giảm sự phụ thuộc.
* Có thể đóng gói nhiều hàm được thiết kế không tốt bằng 1 hàm có thiết kế tốt hơn.
#### Nhược điểm
* Class Facade của bạn có thể trở lên quá lớn, làm quá nhiều nhiệm vụ với nhiều hàm chức năng trong nó.
* Dễ bị phá vỡ các quy tắc trong SOLID.
* Việc sử dụng Facade cho các hệ thống đơn giản, ko quá phức tạp trở nên dư thừa.
## 5. Khi nào thì sử dụng 
Dưới đây chúng ta có thể liệt kê một số trường hợp mà khi gặp sẽ phải cân nhắc sử dụng Facade pattern:
* *Muốn gom nhóm chức năng lại để Client dễ sử dụng.* Khi hệ thống có rất nhiều lớp làm người sử dụng rất khó để có thể hiểu được quy trình xử lý của chương trình. Và khi có rất nhiều hệ thống con mà mỗi hệ thống con đó lại có những giao diện riêng lẻ của nó nên rất khó cho việc sử dụng phối hợp. Khi đó có thể sử dụng Facade Pattern để tạo ra một giao diện đơn giản cho người sử dụng một hệ thống phức tạp.
* *Giảm sự phụ thuộc.* Khi bạn muốn phân lớp các hệ thống con. Dùng Façade Pattern để định nghĩa cổng giao tiếp chung cho mỗi hệ thống con, do đó giúp giảm sự phụ thuộc của các hệ thống con vì các hệ thống này chỉ giao tiếp với nhau thông qua các cổng giao diện chung đó.
* *Tăng khả năng độc lập và khả chuyển*
* *Khi người sử dụng phụ thuộc nhiều vào các lớp cài đặt.* Việc áp dụng Façade Pattern sẽ tách biệt hệ thống con của người dùng và các hệ thống con khác, do đó tăng khả năng độc lập và khả chuyển của hệ thống con, dễ chuyển đổi nâng cấp trong tương lai.
* *Đóng gói nhiều chức năng, che giấu thuật toán phức tạp.*
* *Cần một interface không rắc rối mà dễ sử dụng.*

Ví dụ: Khi bạn gọi điện đến shop để đặt hàng. Khi đó tổng đài sẽ là Facade của tất cả dịch vụ và phòng ban của shop. Hệ thống sẽ cung cấp cho bạn một giao diện đơn giản qua điện thoại để đặt hàng, thanh toán, giao hàng hay nhiều dịch vụ khác nhau.
![](https://images.viblo.asia/25947d05-05cc-429b-9547-815ba7edeee3.png)

## 6. Source code minh họa với C#
#### Tạo Subsystem
```
    public class AccountService
    {
        public void GetAccout(string email)
        {
            Console.WriteLine("Getting the account of " + email);
        }
    }
    
    public class EmailService
    {
        public void SendMail(string mailTo)
        {
            Console.WriteLine("Sending an email to " + mailTo);
        }
    }
    
    public class PaymentService
    {
        public void PaymentByPaypal()
        {
            Console.WriteLine("Payment by Paypal");
        }
        public void PaymentByCreditCard()
        {
            Console.WriteLine("Payment by Credit Card");
        }
        public void PaymentByEBankingAccount()
        {
            Console.WriteLine("Payment by E-banking account");
        }
        public void PaymentByCash()
        {
            Console.WriteLine("Payment by cash");
        }
    }
    
    public class ShippingService
    {
        public void FreeShipping()
        {
            Console.WriteLine("Free Shipping");
        }

        public void StandardShipping()
        {
            Console.WriteLine("Standard Shipping");
        }

        public void ExpressShipping()
        {
            Console.WriteLine("Express Shipping");
        }
    }
    
    public class SmsService
    {
        public void sendSMS(string mobilePhone)
        {
            Console.WriteLine("Sending an message to " + mobilePhone);
        }
    }
```
#### Tạo Facade
```
    public class ShopFacade
    {
        private static ShopFacade _instance;

        private AccountService accountService;
        private PaymentService paymentService;
        private ShippingService shippingService;
        private EmailService emailService;
        private SmsService smsService;

        private ShopFacade()
        {
            accountService = new AccountService();
            paymentService = new PaymentService();
            shippingService = new ShippingService();
            emailService = new EmailService();
            smsService = new SmsService();
        }

        public static ShopFacade getInstance()
        {
            if (_instance == null)
                _instance = new ShopFacade();
            return _instance;
        }

        public void buyProductByCashWithFreeShipping(string email)
        {
            accountService.GetAccout(email);
            paymentService.PaymentByCash();
            shippingService.FreeShipping();
            emailService.SendMail(email);
            Console.WriteLine("Done\n");
        }

        public void buyProductByPaypalWithStandardShipping(string email, string mobilePhone)
        {
            accountService.GetAccout(email);
            paymentService.PaymentByPaypal();
            shippingService.StandardShipping();
            emailService.SendMail(email);
            smsService.sendSMS(mobilePhone);
            Console.WriteLine("Done\n");
        }
    }   
```
#### Client gọi Facade
```
    class Client
    {
        static void Main(string[] args)
        {
            ShopFacade.getInstance().buyProductByCashWithFreeShipping("18520282@gm.uit.edu.vn");
            ShopFacade.getInstance().buyProductByPaypalWithStandardShipping("uit@gmail.edu.vn", "0123456789");
        }
    }   
```
## 7. Design Pattern liên quan
* *Abstract Factory:* Facade sử dụng khi muốn ẩn một xây dựng triển khai nào đó mà việc đó cần gọi tới các subsystem. Abstract Factory sử dụng khi muốn ẩn các chi tiết trên các sản phẩm được xây dựng.
* *Adapter:* Hai Pattern này làm việc theo cùng một cách, nhưng mục đích sử dụng của chúng khác nhau. Adapter Pattern chuyển đổi mã nguồn để làm việc được với mã nguồn khác. Nhưng Facade Pattern cho phép bao bọc mã nguồn gốc để nó có thể giao tiếp với mã nguồn khác dễ dàng hơn
* *Singleton:* các đối tượng Facade có thể là các Singleton. Thông thường Facade thường được biến đổi thành Singleton do việc chúng ta chỉ cần 1 đối tượng Facade
* *Flyweight:* Flyweght cho thấy cách tạo ra nhiều đối tượng nhỏ, trong khi Facade cho thấy cách tạo một đối tượng duy nhất đại diện cho toàn bộ hệ thống con.
* *Mediator: *Facade và Mediator có những công việc tương tự nhau: họ cố gắng tổ chức sự hợp tác giữa nhiều lớp được kết hợp chặt chẽ với nhau.
* *Proxy:* Facade tương tự như Proxy ở chỗ cả hai đều đệm một thực thể phức tạp và tự khởi tạo nó. Không giống như Facade, Proxy có giao diện giống với đối tượng dịch vụ của nó, điều này làm cho chúng có thể hoán đổi cho nhau

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern