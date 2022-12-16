# Java

Là ngôn ngữ lập trình hướng đối tượng, hoạt động trên đa nền tảng.

### 1.  Đặc điểm

  - Tính trừu tượng hóa (Abstraction)
  - Tính đa hình (Polymorphism)
  - Tính kế thừa (Inheritance)
  - Tính đóng gói (Encapsulation)
  - Nền tảng độc lập (viết một lần, dùng nhiều lần, dùng ở nhiều nơi)
  - Có tính bảo mật cao
  - Là một ngôn ngữ được biên dịch và thông dịch
  - Tính đa luồng có thể thực thi nhiều tác vụ cùng một lúc (vd: lập trình Game)
  - Hướng đối tượng
  - Có hiệu suất cao nhờ tính năng thu gom rác và giải phóng bộ nhớ cho các đối tượng không sử dụng
  - Có tính linh hoạt thích ứng với nhiều môi trường phát triển khác nhau

### 2.  Ứng dụng

  - Java được sử dụng rất nhiều từ các web thương mại điện tử, hệ thống thương mại điện tử, các ứng dụng android, khoa học, tài chính, trò chơi, ...

### 3.  Ưu điểm java

  - Được hỗ trợ bởi hầu hết các hệ điều hành.
  - Là một ngôn ngữ độc lập
  - Có tính năng như thu gom rác, không sử dụng con trỏ, xử lý ngoại lệ.
  - Nhiều IDE(integrated development environment) hỗ trợ lập trình ngôn ngữ java.
  - Dễ dàng gỡ lỗi bằng cách sử dụng các công cụ biên dịch.
  - Viết một lần, tái sử dụng lại trên toàn bộ project, dự án.
  - Có cộng đồng hỗ trợ đông đảo, nhiều tài liệu phong phú nên dễ học

### 4.  Nhược điểm java

  - Yêu cầu máy ảo java để chạy.
  - Phải viết những đoạn mã code dài phức tạp(khó hiểu cho người đọc).
  - Phải được biên dịch thành mã byte trước khi sử dụng nó.

### 5. Cú pháp

  #### main.java

  ```java
  public class Main{
      public static void mai(string[]args){
          System.out.println("Hello world");
      }
  }
  ```
  - Biến(variable):
    - Quy tắc đặt tên biến tuân theo quy tắc CamelCase vd: helloWorld
    - Để tạo một biến, bạn phải chỉ định kiểu và gán cho nó một giá trị:
    ```java
    type variableName = value;
    ```
    - println() để xuất giá trị hoặc in văn bản và hiển thị các giá trị trong biến System, out và println(). Chỉ cần biết rằng bạn cần chúng cùng nhau để in nội dung ra màn hình.
  - Hằng(Constant)
    - Tên hằng phải được viết hoa, nếu có 2 từ trở lên thì ngăn cách bởi dấu ‘ \ ’
    - Phương thức(method)
    - Tên được đặt theo quy chuẩn camelCase
    - Tạo phương thức

  ```java
  public static int tenPhuongThuc(int a, int b) {
      // phan than phuong thuc
      }
  ```

  - String: chứa một tập hợp các ký tự được bao quanh bởi dấu ngoặc kép
    Nối chuỗi + hoặc concat()
  - Các hàm xử lý chuỗi:

    - length(): xác định độ dài chuỗi ký tự

    - ‘ + ’ hoặc concat(): nối 2 chuỗi ký tự

    - charA()t: trả về mộ ký tự trong chuỗi

    - compareTo(): so sánh 2 chuỗi ký tự

    - substring(): Tạo một chuỗi con từ vị trí index của chuỗi cha

    - trim(): loại bỏ các khoảng trắng thừa ở đầu và ở cuối chuỗi

    - indexOf(): Trả về lần xuất hiện đầu tiên của một chuỗi trong chuỗi khác

    - replace(): Thay thế chuỗi con trong chuỗi ký tự bằng chuỗi khác

    - Mảng:
      - Khai báo mảng một chiều có 2 dạng.
        - _[Kiểu_dữ_liệu] ten_mang[];_
        - _[Kiểu_dữ_liệu][] ten_mang;_
        - Kiểu dữ liệu như int, char, string, double
      - Khai báo mảng 2 chiều
        - _[Kiểu_dữ_liệu] ten_mang[][];_
        - _[Kiểu_dữ_liệu][][] ten_mang;_

# Javascript

Là ngôn ngữ lập trình động, thông dịch được sử dụng để làm cho các trang web và ứng dụng trở nên sinh động hơn
javascript được dùng bên cạnh HTML và CSS. HTML tạo một bộ khung xương của trang Web. CSS tạo ra các layout, trang trí thêm màu sắc, thay đổi màu chữ hoặc bố cục, cấu trúc của trang. Js thay đổi trạng thái của website từ trạng thái tĩnh sang động, giúp sự tương tác và nâng cao trải nghiệm của người dùng tốt hơn.

### 1.  Ứng dụng 

- Javascript có thể thiết kế cả backend (thông qua các thư viện NodeJS, ExpressJS) và frontend(Angular, jQuery, ReactJS)
  - Angular: Một thư viện dùng để xây dựng ứng dụng Single Page
  - Nodejs: một nền tảng (Platform) phát triển độc lập được xây dựng ở trên Javascript Runtime của Chrome mà chúng ta có thể xây dựng được các ứng dụng mạng một cách nhanh chóng và dễ dàng mở rộng.
  - Sencha Touch: Một Framework dùng để xây dựng ứng dụng Mobile
  - ExtJS: Một Framework dùng để xây dựng ứng dụng quản lý (Web Applications).
  - jQuery: Một thư viện rất mạnh về hiệu ứng
  - ReactJS: giống với Angular cũng là một thư viện dùng để xây dựng ứng dụng Single Page.
  - JS code snippet lớn

### 2.  Đặc điểm

 - Mã javascript được viết vào trong cặp thẻ đóng - mở <script></script>
  - Có thể viết bất kỳ đâu trong file html nhưng đoạn mã phải được viết trong thẻ script
  - Viết trực tiếp trong thẻ html
  - Tạo một file có đuôi ‘ .js ’ rồi import vào file html (và không cần viết trong thẻ script)
  - Các chuỗi(String) được viết trong dấu ngoặc kép hoặc ngoặc đơn (vd: “hello world”, ‘hello world’)
  - Các quy tắc về tên bắt đầu bằng một chữ cái (AZ hoặc az ), một ký hiệu $ hoặc dấu gạch dưới . Tất cả các mã dạng javascript đều phân biệt chữ hoa chữ thường
  - JavaScript có thể "hiển thị" dữ liệu theo những cách khác nhau:
    - Viết vào một phần tử HTML, sử dụng innerHTML.
    - Viết vào đầu ra HTML bằng cách sử dụng document.write().
    - Viết vào một hộp cảnh báo, sử dụng window.alert().
    - Ghi vào bảng điều khiển của trình duyệt bằng cách sử dụng console.log().
  - Khai báo biến: có 4 cách khai báo biến javascript: sử dụng var, let, const, và không sử dụng gì
    - cú pháp
      - var()
      ```js
      var x = 2;
      var y = 3;
      var z = x + y;
      ```
      - let()
      ```js
      let x = 2;
      let y = 3;
      let z = x + y;
      ```
      - const()
      ```js
      const x = 2;
      const y = 3;
      let total  = x + y;
      ```
    - Nếu bạn muốn một quy tắc chung: luôn khai báo các biến với const, giá trị không đổi và không thể thay đổi

    - Nếu bạn nghĩ rằng giá trị của biến có thể thay đổi, hãy sử dụng let, một giá trị có thể thay đổi đc
    
  - Let:
    Không thể khai báo lại các biến được xác định với 'let'. Các biến được xác định với let có phạm vi khối và phải được khai báo trước khi sử dụng
    
  - Const:
    - Không thể khai báo và gán lại các biến được xác định
    - Các biến javascript const phải được gán một giá trị khi chúng được khai báo
    - Khai báo biến với const khi bạn biết rằng giá trị sẽ thay đổi
    - Sử dụng const khi khai báo: A new Array, Object, Function
    - Không được phép khai báo một biến có var, let, const trong cùng một phạm vi
    - Không được phép gán lại một biến hiện có const, trong cùng một phạm vi
    - Được phép khai báo lại một biến với const, trong một phạm vi khác hoặc trong một khối khác
  - Function:
    - Hàm javascript được định nghĩa bằng từ khóa function theo sau là ten_ham và dấu ()
    - Mã sẽ được thực thi bởi function và được đặt bên trong dấu ngoặc {}, các tham số sẽ được đặt trong dấu ()
    - Khi javascript chạy đến câu lệnh return hàm sẽ ngừng thực thi
    - Cú pháp
      ```js
      function name(parameter1, parameter2, parameter3) {
        // code to be executed
      }
      ```
  - Object:
    - Khai báo một object bằng từ khóa const
    - Các name:value trong object được gọi là properties(thuộc tính)
    - Các object cũng có thể có các method(phương thức)
    - Từ khóa **this** đề cập đến một đối tượng, **this** không phải là một biến. Nó là một từ khóa và bạn không thể thay đổi giá trị của **this**.
  - String: Dùng để lưu trữ và thao tác văn bản
    - Một chuỗi không hoặc nhiều ký tự được viết trong dấu “...” hoặc ‘...’
    - Chuỗi cũng có thể định nghĩa với các đối tượng với từ khóa new
  - Array: Là một biến đặc biệt có thể chứa nhiều hơn một giá trị 
    - Với JavaScript, toàn bộ mảng có thể được truy cập bằng cách tham chiếu đến tên mảng: 
    - JavaScript có một phương thức khởi tạo mảng được tích hợp sẵn new Array().
    - toString() chuyển đổi một mảng thành một chuỗi các giá trị mảng
    - join()thức này cũng nối tất cả các phần tử của mảng thành một chuỗi.
    - push()thức thêm một phần tử mới vào một mảng (ở cuối)
    - ...
    - Cú pháp tạo mạng
      ```js
      const array_name = [item1, item2, ...];     
      ```

### 3.  Ưu điểm javascript

  - Dễ học, free style, cộng đồng hỗ trợ đông đảo, tài liệu phong phú.
  - Có thể sử dụng để phát triển cho nhiều nền tảng, trình duyệt, server, mobile.
  - Có thể hoạt động trên nhiều trình duyệt, nhiều nền tảng khác nhau như Mac, Windows và các hệ điều hành trên mobile
  - Là một ngôn ngữ không cần phải thiết lập quá nhiều phần mềm
  - Tạo ra các giao diện đa dạng, có nhiều tính năng, giúp website tương tác tốt hơn với khách hàng truy cập

### 4.  Nhược điểm javascript

  - Dễ bị khai thác. Có thể được dùng để thực thi mã độc trên máy tính của người dùng
  - Vì tính bảo mật nên Client-side không cho phép đọc và ghi các file
  - Javascript vẫn có cơ chế xử lý bất đồng bộ để giải quyết bài toán chạy nhiều task 1 lúc. Tuy nhiên không có cơ chế xử lý đa luồng.
  - Do tính linh hoạt của khai báo và sử dụng biến nên dễ bị hiểu nhầm cho nên nhà phát triển đã sinh ra typescript để giải quyết vấn đề này của javascript

# Golang (Go)

Được Google thiết kế và phát triển vào năm 2009 là một ngôn ngữ lập trình nguồn mở và được thiết kế dựa trên tư duy lập trình hệ thống

### 1.  Ứng dụng

- Phân phối các dịch vụ mạng: Các chương trình ứng dụng mạng có tồn tại được hay không là phụ thuộc hoàn toàn vào các tính năng native concurrency và native concurrency của golang. Vì vậy mà Golang có rất nhiều dự án cho nhà mạng với các chức năng phân phối và dịch vụ đám mây như API, web server và minimal frameworks.
- Xây dựng và phát triển các cloud-native: Golang có các tính năng là network và concurrency với tính linh hoạt cao khiến nó phù hợp với việc xây dựng và phát triển các ứng dụng cloud-native. Trên thực tế, golang đã được áp dụng trong việc thiết lập một trong những nền tảng  bằng cách ứng dụng hệ thống containerization Docker và dựa trên cloud-native.
- Thay thế cơ sở hạ tầng: Phần lớn các phần mềm đều phụ thuộc vào những cơ sở hạ tầng internet đã trở nên lỗi thời, lạc hậu. Cho nên, khi viết lại và thay thế cơ sở hạ tầng bằng Go thì các nền tảng sẽ được triển khai nhiều hơn, bộ nhớ được giữ an toàn tốt hơn, mang lại nhiều lợi ích hơn và có một codebase sạch để hỗ trợ bảo trì.

### 2.  Đặc điểm

- Go là một ngôn ngữ được biên dịch, nhập tĩnh, nhanh chóng, có cảm giác giống như một ngôn ngữ được thông dịch và nhập động
- Các IDE phổ biến bao gồm Visual Studio Code (VS Code), Vim, Eclipse và Notepad
- File của Go kết thúc bằng ‘’ .go ’’
- Comment:
  - Theo hàng: //...
  - chung : /* ... */
- String:
  - Raw string gồm các kí tự unicode và newline được ngăn cách bởi dấu’’
  - Interpreted string gồm các giá trị unicode và giá trị byte được ngăn cách bởi dấu” ”.
- Biến:

  - Khai báo biến bằng từ khóa ‘’var’’ hoặc ‘’ := ’’
  Cú pháp var:

  ```go
  var variablename type = value
  ```

  - Luôn phải chỉ định một trong 2 ‘’type’’ hoặc ‘’value’’ hoặc cả 2
  - Có thể sử dụng cả bên ngoài và bên trong function - Khai báo biến và gán giá trị có thể được thực hiện riêng biệt
  - Cú pháp :=
  ```go
  variablename := value
  ```
  - Không thể khai báo biến khi sử dụng := mà không gán giá trị cho nó
  - Có thể sử dụng bên trong function
  - Khai báo biến và gán giá trị không thể được thực hiện riêng biệt mà phải thực hiện trên một dòng
  - Go có thể khai báo nhiều biến trên một dòng
  - Nhiều khai báo biến cũng có thể được nhóm lại với nhau thành một khối
  - Đặt tên biến: tên biến bắt đầu bằng ( a-z, A-Z, 0-9và \_ ), có phân biệt chữ hoa và chữ thường, không giới hạn độ dài tên biến, không chứa khoảng trắng
  - Từ khóa const() khai báo biến là hằng số không thể thay đổi và chỉ đọc.

- Array: khai báo một mạng cũng dùng từ khóa ‘’var’’ hoặc ‘’ := ’’

  - Cú pháp

  ```go
  var array_name = [length]datatype{values} // here length is defined
  or
  var array_name = [...]datatype{values} // here length is inferred
  ```

  - Để truy cập một phần tử mạng cụ thể có thể tham chiếu đến index number
  - For
  ```go
  for statement1; statement2; statement3 {
  // code to be executed for each iteration
  }
  ```
  - Continue là câu lệnh bỏ qua một hoặc nhiều lần lặp trong vòng lặp
  - Break dùng để ngắt, chấm dứt vòng lặp
  - Continue và Break thường được sử dụng với các điều kiện

### 3.  Ưu điểm Golang

  - Thiết kế tính gọn và tối giản giúp quá trình phát triển phần mềm trở nên đơn giản hơn
  - Có cơ chế xử lý concurrency, chạy đồng thời dựa trên thread của hệ điều hành nhưng chi phí ít hơn
  - Go biên dịch ra mã máy (Machine code) nên có thể chạy ngay với hệ điều hành nó biên dịch ra mà ko cần cài đặt gì thêm
  - Từ máy của mình có thể biên dịch ra các chương trình chạy trên Mac, Window, Linux
  - Phần cứng máy tính có thể mở rộng thêm core, khiến cho Go trở thành ngôn ngữ có thể dễ dàng scale hơn
  - Có khả năng tương thích cao
  - Có tính bảo mật cao
  - Có tính năng thu gom rác tự động
  - Tài liệu rõ ràng dễ đọc

### 4.  Nhược điểm Golang

  - Kích thước dữ liệu vô cùng lớn
  - Không hỗ trợ thao tác trên con trỏ
  - Các version trước không hỗ trợ Generic làm giảm khả năng reusable(có thể tái sử dụng) code và giảm hiệu quả trong quá trình phát triển, nhưng từ V Go1.8 đã có cơ chế này

## **So sánh các ngôn ngữ**

### **Giống**

- Đều là ngôn ngữ lập trình
- Đều sử dụng tính năng Bộ thu gom rác (GC) để ngăn chặn
- Cả java và javascript đều được sử dụng rộng rãi hơn trong các ứng dụng phía máy khách
- Giữa java và Golang : đều là ngôn ngữ họ C

### **Khác**

**Java**

- Là một ngôn ngữ lập trình tĩnh, hướng đối tượng, hoạt động trên nhiều nền tảng
- Là một ngôn ngữ lập trình bậc cao
- Là ngôn ngữ độc lập
- Là ngôn ngữ biên dịch
- Để chạy được chương trình java phải build các file java thành file class
- Phần mở rộng tệp của Java là “.java”,
- Được sử dụng chủ yếu cho các ứng dụng phía máy chủ, được lưu dưới dạng ‘Byte ’
- Phải có máy ảo để chạy, sử dụng nhiều bộ nhớ
- Ngôn ngữ phức tạp khó học
- Yêu cầu một lượng bộ nhớ lớn
- Cú pháp: các kiểu dữ liệu phải được khai báo
- Biến phải được khai báo trước khi sử dụng

**Javascript**

- Là ngôn ngữ lập trình động, được sử dụng để làm cho các trang web và ứng dụng trở nên sinh động hơn
- Hoạt động với HTML và CSS
- Là ngôn ngữ thông dịch
- Chỉ cần viết và chạy
- Phần mở rộng tệp của JavaScript là “.js”
- Trên các trang web để tạo nội dung động
- Ngôn ngữ dễ học
- Không yêu cầu số lượng bộ nhớ
- Các kiểu dữ liệu không được khai báo
- Có thể khai báo luôn ở nơi sử dụng

**Golang**

- Là ngôn ngữ lập trình mã nguồn mở
- Được biên dịch thành mã máy mà được thực thi trực tiếp
- Quy tắc nghiêm ngặt
- Sử tối giản cao
- Khó quản lý bộ nhớ
- Phải thực hiện kiểm tra lỗi rõ ràng, có thể khiến cho việc xử lý lỗi trở nên khó khăn.