![](https://images.viblo.asia/3687c8a1-3b4b-44b6-a99d-baab0e7cf96e.png)

## 1. Giới thiệu
* Phân loại: Behavior Pattern
* Mục đích: Template Method xây dựng một bộ khung thuật toán trong một toán tử, để lại việc định nghĩa một vài bước cho các subclass mà không làm thay đổi cấu trúc chung của thuật toán.
* Tần suất sử dụng: trung bình
## 2. Mục đích ra đời
### Problem
Giả sử khi tạo một ứng dụng khai thác dữ liệu để phân tích các tài liệu của công ty. Người dùng cung cấp các tài liệu ứng dụng ở nhiều định dạng khác nhau (PDF, DOC, CSV) và ứng dụng trích xuất dữ liệu có ý nghĩa từ các tài liệu này ở một định dạng thống nhất.

Phiên bản đầu tiên chỉ có thể đọc được file DOC, sau này dần dần có thể đọc thêm file CSV và file PDF.
![](https://images.viblo.asia/af016746-5300-4d04-8a98-a344d1ec17a9.png)
Sau khi tạo ra ba lớp như hình, ta nhận ra ba lớp có các đoạn code xử lý rất giống nhau. Có thể nói chỉ có đoạn code để xử lý các định dạng dữ liệu khác nhau hoàn toàn khác nhau ở tất cả các lớp, còn code để xử lý và phân tích dữ liệu gần như giống hệt.

Có một vấn đề khác liên quan đến client code sử dụng các lớp này. Nó có rất nhiều điều kiện chọn một quá trình hành động thích hợp tùy thuộc vào lớp của đối tượng xử lý. Nếu cả ba lớp xử lý đều có một interface chung hoặc một lớp cơ sở, ta có thể loại bỏ các điều kiện trong client code và sử dụng tính đa hình khi gọi các phương thức trên một đối tượng xử lý.
### Solution
Mẫu Template Method đề xuất nên chia nhỏ một thuật toán thành một loạt các bước, chuyển các bước này thành các phương thức và đặt một loạt các lệnh gọi đến các phương thức này bên trong một template method duy nhất. Các bước có thể là trừu tượng hoặc có thể có vài triển khai mặc định.

Như ví dụ trên, ta có thể tạo một lớp cơ sở cho cả ba thuật toán phân tích cú pháp. Lớp này định nghĩa một phương thức khuôn mẫu bao gồm một loạt các lệnh gọi đến các bước xử lý tài liệu khác nhau.
![](https://images.viblo.asia/b6919f30-009a-4d25-9a60-caee23c7b937.png)
Đầu tiên, ta có thể khai báo tất cả các bước là trừu tượng, buộc các lớp con cung cấp các triển khai riêng của chúng cho các phương thức này. Trong trường hợp này, các lớp con đã có tất cả các triển khai cần thiết, vì vậy điều duy nhất cần làm là điều chỉnh các phương thức để phù hợp với các phương thức của lớp cha. Như này đã có thể loại bỏ trùng lặp code.

## 3. Kiến trúc
![](https://images.viblo.asia/fe5adb04-e933-40d9-9dd6-3846e2fe9525.png)

Các thành phần trong mô hình:
* *AbstractClass* khai báo các phương thức hoạt động như các bước của một thuật toán, cũng như template method thực tế gọi các phương thức này theo một thứ tự cụ thể. Các bước có thể được khai báo là trừu tượng hoặc có một số triển khai mặc định.
* *Các lớp Concrete* có thể ghi đè tất cả các bước, nhưng không phải chính template method.
## 4. Ưu & nhược điểm
#### Ưu điểm
* Tái sử dụng code (reuse), tránh trùng lặp code (duplicate): đưa những phần trùng lặp vào lớp cha (abstract class).
* Cho phép người dùng override chỉ một số phần nhất định của thuật toán lớn, làm cho chúng ít bị ảnh hưởng hơn bởi những thay đổi xảy ra với các phần khác của thuật toán.
#### Nhược điểm
* Template method có càng nhiều bước để override càng khó bảo trì.
## 5. Khi nào thì sử dụng 
* Khi có một thuật toán với nhiều bước và mong muốn cho phép tùy chỉnh chúng trong lớp con.
* Mong muốn chỉ có một triển khai phương thức trừu tượng duy nhất của một thuật toán.
* Mong muốn hành vi chung giữa các lớp con nên được đặt ở một lớp chung.
* Các lớp cha có thể gọi các hành vi trong các lớp con của chúng một cách thống nhất (step by step).
## 6. Source code minh họa với C#
Bài toán: Giả sử khi tạo một ứng dụng khai thác dữ liệu để phân tích các tài liệu của công ty. Người dùng cung cấp các tài liệu ứng dụng ở nhiều định dạng khác nhau (PDF, DOC, CSV) và ứng dụng trích xuất dữ liệu có ý nghĩa từ các tài liệu này ở một định dạng thống nhất.
#### Tạo Abstract Class
```
        abstract class DataMiner
        {
            string file;
            public string File { get => file; set => file = value; }

            string rawData;
            public string RawData { get => rawData; set => rawData = value; }

            public virtual void openFile(string path)
            {
                Console.WriteLine("Open " + path);
            }
            public virtual void closeFile()
            {
                Console.WriteLine("Close file\n");
            }
            public abstract void extractData();
            public abstract void parseData();

            public void mine(string path)
            {
                openFile(path);
                extractData();
                parseData();
                closeFile();
            }

        }   
```
#### Tạo Concrete Classes
```
    class CSVDataMiner : DataMiner
    {
        public override void extractData()
        {
            Console.WriteLine("Extract CSV");
        }

        public override void parseData()
        {
            Console.WriteLine("Parse CSV");
        }
    }   
    
    class PDFDataMiner : DataMiner
    {
        public override void openFile(string path)
        {
            base.openFile(path);
            this.File = "PDF";
        }
        public override void extractData()
        {
            Console.WriteLine("Extract " + this.File);
            this.RawData = "PDF";
        }

        public override void parseData()
        {
            Console.WriteLine("Parse " + this.RawData);
        }
    }
```
#### Sử dụng
```
    class Program
    {
        static void Main(string[] args)
        {
            PDFDataMiner pdfDataMiner = new PDFDataMiner();
            pdfDataMiner.mine("pdf path");

            CSVDataMiner csvDataMiner = new CSVDataMiner();
            csvDataMiner.mine("csv path");
        }

    }   
```
## 7. Design Pattern liên quan
* Factory Method: là một chuyên môn hoá của Template Method, có thể đóng vai trò như một bước trong Template method.
* Template Method dựa trên kế thừa: nó cho phép bạn thay đổi một phần thuật toán bằng cách mở rộng chúng trong subclass. Strategy dựa trên thành phần: bạn có thể thay đổi một phần của hành vi của object bằng cách cung cấp các chiến thuật khác nhau để phản hồi cho hành vi đó. Template Method làm việc ở lớp, nên nó “static”. Strategy làm việc ở đối tượng, cho phép thay đổi hành vi ngay trong runtime

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern