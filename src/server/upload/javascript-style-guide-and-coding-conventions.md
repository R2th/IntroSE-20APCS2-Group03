##  JavaScript Coding Conventions
 
 - Coding conventions là một quy ước chung đặt ra cho lập trình viên. Nó thường bao gồm:
     - Quy tắc đặt tên và khai báo cho các biến và hàm
     - Quy tắc sử dụng khoảng trắng, thụt lề và comment
     - Thực hành viết code và nguyên tắc

   **Ưu điểm của coding conventions**
    - Cải thiện khả năng đọc code
    - Giúp việc bảo trì dễ dàng hơn

    => Coding conventions có thể là một quy tắc được đặt ra cho team hoặc bản thân mình thực hiện theo để việc code có quy tắc và chuyên nghiệp hơn.

## 1. Tên biến

- Tại w3school đang sử dụng `camelCase` cho tên định danh (biến và hàm)
- Tất cả các tên bắt đầu với chữ cái thường (letter)
- Ví dụ như sau:

    ```
    firstName = "John";
    lastName = "Doe";

    price = 19.90;
    tax = 0.20;

    fullPrice = price + (price * tax);
    ```

##  2. Không gian xung quanh các toán tử
 - Luôn luôn đặt khoảng trắng trước sau với các toán tử và sau dấu phẩy

    ```
    var x = y + z;
    var newArray = ["Hi", "Hello", "Goodbye"];
    ```
 
##  3. Khoảng trắng

- Luôn luôn sử dụng hai khoảng trắng để thụt lề một khối code

    ```
    var x = y + z;
    var newArray = ["Hi", "Hello", "Goodbye"];
    ```

- **Note**: Không sủư dụng `tab`để thụt lề

## 4. Các quy tắc khác

- Các quy tắc chung đơn giản:
    - Luôn luôn kết thúc dòng lệnh bằng dấu chấm phẩy

        ````
        var values = ["Volvo", "Saab", "Fiat"];

        var person = {
          firstName: "John",
          lastName: "Doe",
          age: 50,
          eyeColor: "blue"
        }
        ````

- Các quy tắc chung cho những câu lệnh trong một khối:
    - Đặt dấu `{` ở cuối dòng lệnh đầu tiên
    - Sử dụng một dấu cách ở trước dấu `{`
    - Đặt dấu `}`trên một dòng mới và không có khoảng trắng ở đầu
    - Không được kết thúc một khối bằng dấu `;`

        ```
        if (time < 20) {
          greeting = "Good day";
        } else {
          greeting = "Good evening";
        }
        ```

## 5. Các quy tắc của object

- Đặt dấu `{` trên cùng dòng với object
- Sử dụng dấu `:` và khoảng trắng giữa thuộc tính và giá trị của nó
- Sử dụng `""`cho giá trị chuỗi, không phải giá trị số
- Không dùng dấu `,` với cặp thuộc tính và giá trị cuối cùng của object
-  Đặt dấu `}`trên một dòng mới và không có khoảng trắng ở đầu
-  Luôn luôn kết thúc một object bằng dấu `;`

- Ví dụ:

    ```
    var person = {
      firstName: "John",
      lastName: "Doe",
      age: 50,
      eyeColor: "blue"
    };
    ```

- Với các object ngắn, chúng ta có thể viết trên một dòng, chỉ sử dụng khoảng trắng để ngăn cách các thuộc tính. Ví dụ:

    ```
    var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
    ```

## 6. Độ dài dòng nhỏ hơn 80
- Để dễ đọc, tránh độ dài một dòng dài hơn 80 ký tự
- Nếu câu lệnh javascript quá dài, không đủ trên một dòng thì nên ngắt xuống dòng sau một toán tử hoặc dấu phẩy

    ```
    document.getElementById("demo").innerHTML =
    "Hello Dolly.";
    ```

## 7. Quy tắc đặt tên

- Luôn luôn sử dụng quy tắc đặt tên cho tất cả code của bạn. 
- Ví dụ:
    - Tên biến và hàm được viết theo quy tắc `camelCase`
    - Các biến toàn cục viết hoa (không bắt buộc nhưng nó là phổ biến)
    - Hằng số được viết hoa

- Nên sử dụng hyp-hens, camelCase, hay under_scores trong tên biến? 

    => Đây là câu hỏi thường được hỏi và câu trả lời phụ thuộc vào người bạn hỏi.

### 7.1. Hyphens trong HTML và CSS

- Các thuộc tính HTML5 có thể bắt đầu với dữ liệu `-`
- CSS sử dụng dấu `-`trong tên thuộc tính (font-size)

 - Note: Dấu `-`có thể nhầm lẫn thành toán tử trừ nên trong Javascript không có dấu `-` khi đặt tên.
 
###  7.2. Underscores

 - Nhiều lập trình viên thích sử dụng dấu gạch dưới `_` đặc biệt là trong cơ sở dữ liệu.
 - Dấu gạch dưới thường được sử dụng trong tài liệu PHP
 
###  7.3. PascalCase
 
- PascalCase thường được các lập trình viên C ưa thích

### 7.4. camelCase

- camelCase được sử dụng bởi  JavaScript,  jQuery và các thư viện JavaScript khác.

- Note: Đừng bắt đầu tên bằng dấu $. Điều đó sẽ đặt bạn vào cuộc xung đột với nhiều tên thư viện của  JavaScript.

## 8. Loading JavaScript in HTML

- Sử dụng cú pháp đơn giản để tải một file bên ngoài

    ```
    <script src="myscript.js"></script>
    ```

## 9. Truy cập các phần tử HTML

- Hậu quả của việc sử dụng HTML "untidy" có thể dẫn đến lỗi javascript
- Hai câu lệnh JavaScript sau sẽ tạo ra hai kết quả khác nhau

    ```
    var obj = getElementById("Demo")

    var obj = getElementById("demo")
    ```

- Note: Nếu có thể, hãy sử dụng quy ước đặt tên trong HTML tương tự như JavaScript.

## 10. File Extensions

- Các tệp HTML phải có phần mở rộng .html không phải .htm
- Các tệp CSS nên có phần mở rộng .css
- Các tệp JavaScript nên có phần mở rộng .js

## 11. Sử dụng chữ thường để đặt tên cho tệp tin

- Hầu hết các máy chủ web (Apache, Unix) đều phân biệt chữ hoa chữ thường về tên tệp
    - london.jpg khác London.jpg
- Các máy chủ web khác (Microsoft, IIS) không phân biệt chữ hoa chữ thường
    - london.jpg có thể được truy cập như London.jpg

- Nếu bạn sử dụng kết hợp chữ hoa và chữ thường, bạn phải cực kỳ nhất quán.
- Nếu bạn chuyển từ một máy chủ không phân biệt chữ hoa chữ thường sang một máy chủ phân biệt chữ hoa chữ thường, ngay cả những lỗi nhỏ cũng có thể phá vỡ trang web của bạn.

- Note: Để tránh những vấn đề này, luôn luôn sử dụng tên tệp chữ thường (nếu có thể).

## 12. Hiệu suất

- Các quy ước được đặt ra bởi team phát triển trong dự án nên hầu hết ít tác động đến việc thực hiện các chương trình.
- Sự thụt lề và khoảng trắng thừa không đáng kể trong các tập lệnh nhỏ.

### Link tham khảo:
- **W3schools**: https://www.w3schools.com/js/js_conventions.asp