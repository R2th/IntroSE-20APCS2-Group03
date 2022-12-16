![](https://images.viblo.asia/41de9c70-c128-4f10-927b-b270698f843e.png)

## 1. Giới thiệu
* Abstract Factory (Kit) là một design pattern thuộc nhóm Creational Pattern Design – những mẫu thiết kế cho việc khởi tạo đối tượng của lớp
* Được xây dựng dựa trên Factory Pattern và nó được xem là một factory cao nhất trong hệ thống phân cấp. Pattern này sẽ tạo ra các factory là class con của nó và các factory này được tạo ra giống như cách mà factory tạo ra các sub-class.
* Mục đích: Cung cấp một interface cho việc khởi tạo các tập hợp của những object có đặc điểm giống nhau mà không cần quan tâm object đó là gì
* Tần suất sử dụng: cao    	

## 2. Mục đích ra đời
![](https://images.viblo.asia/f1ec9d4d-4733-46ce-accc-cf2832686105.png)

* Abstract Factory Pattern giúp đảm bảo rằng các product mà bạn nhận được từ một factory đều tương thích với nhau.
* Abstract Factory Pattern giúp hạn chế sự phụ thuộc giữa creator và concrete products.
* Abstract Factory Pattern giúp gom các đoạn code tạo  ra product vào một nơi trong chương   trình, nhờ đó giúp dễ theo dõi và thao tác.
* Với Abstract Factory Pattern, chúng ta có thể thoải mái thêm nhiều loại product mới vào chương trình mà  không làm thay đổi các đoạn code nền tảng đã có trước đó.
* Ví dụ, lấy trường hợp của một người quản lý điện thoại, người quản lý các số điện thoại. Số điện thoại tuân theo một quy tắc tạo mã cụ thể theo khu vực cho từng quốc gia. Nếu tại một thời điểm nào đó, ứng dụng phải được thay đổi để hỗ trợ thêm số tạo thành một quốc gia mới, mã của ứng dụng sẽ phải được thay đổi và nó sẽ ngày càng trở nên phức tạp hơn. Để ngăn chặn nó, Abstract Factory được sử dụng
## 3. Kiến trúc
![](https://images.viblo.asia/842436c5-bd66-4d15-a18d-f92d99f76739.png)

Các thành phần trong mô hình:
* AbstractFactory: Khai báo dạng interface hoặc abstract class chứa các phương thức để tạo ra các đối tượng Abstract Product.
* ConcreteFactory: Xây dựng, cài đặt, thực hiện các phương thức được tạo nên từ Abstract Factory. Mỗi ConcreteFactory tương ứng với một biến thể khác của product và  chỉ tạo ra những biến thể của sản phẩm đó. Ví dụ: AbstractFactory là Document thì ConcreteFactory sẽ là FancyDocument, MordernDocument.
* AbstractProduct: Khai báo dạng interface hoặc abstract class cho một tập hợp các product riêng biệt nhưng có liên quan đến nhau. Ví dụ: AbstractProduct của AbstractFactory Document là CreateLetter, CreatePage, CreateResume
* ConcreteProduct: Là các cách triển khai khác nhau của AbstractProduct gồm nhiều các biến thể. Mỗi nhóm AbstractProduct phải được thực hiện cùng các biến thể nhất định. Ví dụ ở trên ta có:
    - AbstractFactory là Document thì ConcreteFactory sẽ là FancyDocument, MordernDocument
    - AbstractProduct của AbstractFactory Document là CreateLetter, CreatePage, CreateResume
    Thì ConcreteProduct sẽ là FacyCreateLetter, FancyCreatePage, FancyCreateResume
* Client: là đối tượng sử dụng AbstractFactory, AbstractProduct và client cũng có thể làm việc với bất kỳ biến thể nào của ConcreteFactory, ConcreteProduct, miễn là nó có giao tiếp với đối tượng (object) thông qua abstract interface

## 4. Ưu & nhược điểm
#### Ưu điểm
* Có thể đảm bảo các đối tượng product nhận được từ factory sẽ tương thích với nhau.
* Tránh được những ràng buộc chặt chẽ giữa concrete products và client code.
* Nguyên tắc đơn lẻ: có thể trích xuất code tạo product vào một nơi và hỗ trợ code dễ dàng.
* Nguyên tắc mở/ đóng: có thể khởi tạo những bản mới của product mà không cần phá vỡ client code hiện có.
#### Nhược điểm
* Code có thể trở nên phức tạp hơn mức bình thường, vì có rất nhiều interfaces và classes được khởi tạo cùng với mẫu.
## 5. Khi nào thì sử dụng 
Sử dụng Abstract Facotry khi cần làm việc với các product có tính chất gần giống nhau và liên quan đến nhau và không cần phụ thuộc vào các định nghĩa có sẵn trong class đó:
* Phía client sẽ không phụ thuộc vào việc những sản phẩm được tạo ra như thế nào.
* Ứng dụng sẽ được cấu hình với một hoặc nhiều họ sản phẩm.
* Các đối tượng cần phải được tạo ra như một tập hợp để có thể tương thích với nhau.
## 6. Source code minh họa với C#
#### Tạo Abstract Factory
```
interface MonAnFactory
    {
        HuTieu LayToHuTieu();
        My LayToMy();
    }
```
#### Abstract Product A
```
    interface HuTieu
    {
        string GetModelDetails();
    }
```
#### Abstract Product B
```
    interface My
    {
        string GetModelDetails();
    }
```
#### Client
```
    class Client
    {
        HuTieu hutieu;
        My my;
    
        public Client(MonAnFactory factory)
        {
            hutieu = factory.LayToHuTieu();
            my = factory.LayToMy();
        }

        public string GetHuTieuDetails()
        {
            return hutieu.GetModelDetails();
        }

        public string GetMyDetails()
        {
            return my.GetModelDetails();
        }
    }
```
#### Concrete Factory 1
```
    class LoaiGioFactory : MonAnFactory
    {
        public HuTieu LayToHuTieu()
        {
            return new HuTieuGio();
        }

        public My LayToMy()
        {
            return new MyGio();
        }
    }
```
#### Concrete Factory 2
```
    class LoaiNacFactory : MonAnFactory
    {
        public HuTieu LayToHuTieu()
        {
            return new HuTieuNac();
        }

        public My LayToMy()
        {
            return new MyNac();
        }
    }
```
#### Product
```
    class HuTieuNac : HuTieu
    {
        public string GetModelDetails()
        {
            return "HU TIEU NAC cua em day";
        }
    }
    
     class HuTieuGio : HuTieu
    {
        public string GetModelDetails()
        {
            return "HU TIEU GIO cua em day";
        }
    }

    class MyNac : My
    {
        public string GetModelDetails()
        {
            return "MY NAC cua em day";
        }
    }
    
    class MyGio : My
    {
        public string GetModelDetails()
        {
            return "MY GIO cua em day";
        }
    }
```
#### Hàm main
```
    class Program
    {
        static void Main(string[] args)
        {
            MonNuocFactory loaiNac = new LoaiNacFactory();
            Client NacClient = new Client(loaiNac);
            MonNuocFactory loaiGio = new LoaiGioFactory();
            Client GioClient = new Client(loaiGio);

            Console.WriteLine("********* HU TIEU **********");
            Console.WriteLine(NacClient.GetHuTieuDetails());
            Console.WriteLine(GioClient.GetHuTieuDetails());

            Console.WriteLine("******* MY **********");
            Console.WriteLine(NacClient.GetMyDetails());
            Console.WriteLine(GioClient.GetMyDetails());

            Console.ReadKey();
        }
    }
```
## 7. Design Pattern liên quan
* Factory Method: Abstract Factory class thường dựa trên một số phương thức Factory, nhưng cũng có thể sử dụng Prototype để kết hợp các phương thức trong Abstract class đó
* Builder: Builder tập trung vào việc xây dựng các đối tượng phức tạp theo từng bước. Abstract Factory chuyên tạo các family đối tượng liên quan. Abstract Factory trả lại product ngay lập tức, trong khi Builder cho phép bạn chạy một số bước xây dựng bổ sung trước khi tìm nạp product.
* Prototype: Abstract Factory thường dựa trên một tập hợp Factory Method, nhưng cũng có thể sử dụng Prototype để soạn các phương thức trên các lớp này.
* Singleton: Abstract Factory, Factory và Prototype đều được triển khai dưới dạng Singleton.

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern