Jmeter là một công cụ kiểm thử API rất mạnh. 

Nó có đủ các Test elements để thực hiện hầu hết các trường hợp thử nghiệm, ngay cả một kịch bản phức tạp. Tuy nhiên, trong một số trường hợp kiểm thử nhất định không thể thực hiện bằng cách chỉ sử dụng các phần tử và chức năng mặc định của Jmeter. 

Do đó, có thể viết tập lệnh với Jmeter và các phương thức của Java API để vượt qua các giới hạn này. Điều này dẫn đến câu hỏi sử dụng ngôn ngữ nào thì thích hợp?

## Tại sao nên sử dụng Groovy

Apache Groovy là một ngôn ngữ lập trình hướng đối tượng có thể được sử dụng cho nền tảng Java.

Groovy là một trong những ngôn ngữ có thể triển khai Compilable Interface, vì vậy nó rất tốt để thực hiện các phép tính phức tạp bởi vì tập lệnh sẽ chỉ cần biên dịch một lần cho tất cả các luồng và vòng lặp, chúng ta sẽ không cần tốn tài nguyên cho việc này nữa.

Nó có các tính năng nổi bật như:

### 1. Phát triển và hỗ trợ
Ngôn ngữ Groovy luôn không ngừng được phát triển, duy trì và hỗ trợ.

### 2. Khả năng tương thích với Java
- 99% nếu mã java hợp lệ, thì mã Groovy cũng hợp lệ. 

- Nếu mã được phát triển bằng Java 6,7 hoặc 8 sẽ được coi là mã Groovy hợp lệ. Ví dụ nếu bạn sử dụng Beanshell thì bạn sẽ bị giới hạn ở cấp độ ngôn ngữ Java 5, sẽ có một số hạn chế sau:
    - Không có binary literals
    - Không có chuỗi trong câu lệnh "switch"
    - Không có Genrics
    - Không có try-with-sources
    - không có xử lý nhiều ngoại lệ
    
### 3. Hiệu suất

Bắt đầu từ phiên bản 2, các tập lệnh có thể được được biên dịch tĩnh cung cấp hiệu suất gần như mã Java. 

Hãy so sánh hiệu suất của các tập lệnh Groovy  với các tập lệnh của Beanshell bằng cách thực hiện một cái gì đó rất cơ bản, chẳng hạn như in thời gian bắt đầu kiểm tra Jmeter( biến Jmeter có liên quan là TESTSTART.MS thành tệp jmeter.log).

![](https://images.viblo.asia/0e239cc5-15ff-458d-a995-a8b5d266e368.png)

Thoạt nhìn, Beanshell nhanh hơn( thời gian phản hồi 1ms cho Beanshell Sampler so với thời gian phản hồi 5ms cho JSR223 Sampler). Điều này là do kích thước công vụ tạo kịch bản Groovy. Vì kích thước thư viện groovy-all-2.4.7 là gần 7 MB, nên cần nhiều thời gian hơn để tải nó. Vì vậy, nếu bạn sử dụng tập lệnh cho một thứ gì đố rất "nẹh nhàng" và được gọi một lần thì bạn vẫn nên sử dụng Beanshell.

Bây giờ, chúng ta hãy kiểm thử một cái gì đó "nặng hơn", chẳng hạn như tính toán số thứ 36 trong dãy Fibonacci và in nó vào tệp jmeter.log bằng cách sử dụng Beanshell và Groovy.

```
int fibonacci(int i) {
   if (i == 1 || i == 2) {
       return i;
   }
   return fibonacci(i - 1) + fibonacci(i - 2);
}
log.info("Fibonacci number 36: " + fibonacci(36));
```

Mã trên được sử dụng trong cả Beanshell và JSR223 Samplers
![](https://images.viblo.asia/41f45898-e640-4abd-9ba1-56a6e1102e30.png)

Theo như những gì bạn thấy, JSR223 Samplers tính toán và in ra trong 192ms, trong khi Beanshell Samplers cần 36s để làm điều tương tự. Vì vậy, nếu bạn sử dụng tập lệnh để tạo tải hoặc gọi nhiều lần với nhiều luồng thì sự lựa chọn hiển nhiên là Goovy.


### 4. Các tính năng bổ sung

 **a. Viết và đọc file dễ dàng**

- Giả sử bạn muốn khởi tạo một đối tượng tệp, bạn có thể ghi vào nó đơn giản như sau:

     `myFile << "Hello from Groovy"`

- Hay việc đọc tệp chỉ cần truy cập và thuộc tính .text của đối tượng tệp:

     `def fileContent = myFile.text`

* Kết hợp mọi thứ với nhau như ảnh dưới đây: 

![](https://images.viblo.asia/34b071f5-ed32-42fc-aa16-7226c335b67c.png)

**b. Làm việc với các collection dễ dàng và nhanh chóng**

  `props.each { k, v -> log.info( "${k}:${v}") }`

  Và đây là output:
  
  ![](https://images.viblo.asia/45f22fce-9f0b-47e0-9e98-d7f8acdb4ec7.png)

**c. Thực thi các lệnh bên ngoài**

Với Groovy, bạn cso thể quên đi OS Process Sampler, Chạy các lệnh điều hành và các tệp thực thi chỉ cần: 

`"your_command".execute()`

Nếu bạn cần output - thì chỉ cần thêm .text vào cuối câu lệnh:

`"your_command".execute().text`

Dưới đây là một ví dụ về thực thi lệnh jmeter -v và in kết quả ra tệp jmeter.log:

![](https://images.viblo.asia/a2f32eb0-3b12-4ef3-837d-85f1c9f14414.png)

Tài liệu tham khảo: https://www.blazemeter.com/blog/groovy-new-black?utm_source=blog&utm_medium=BM_blog&utm_campaign=the-groovy-templates-cheat-sheet-for-jmeter