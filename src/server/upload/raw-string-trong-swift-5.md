Ở Swift 4.2 về trước thì đối với những string mà chứa ký tự \ (backslash) hoặc “ (quote mark) thì ta phải thêm một ký tự backslash vào phía trước những ký tự đó thì Swift mới nhận dạng chúng dưới dạng string được.
Tuy nhiên, ở Swift 5, điều đó đã trở nên đơn giản hơn với “Raw string”, để khai báo raw string, chỉ cần thêm ký tự # (hash symbol) vào trước và sau cách khai báo string cũ.
Ví dụ :
```
let rain = #"The "rain" in "Spain" falls mainly on the Spaniards."#
```
Các ký hiệu # ở đầu và cuối của chuỗi trở thành một phần của chuỗi, vì vậy Swift hiểu rằng dấu ngoặc đơn độc lập xung quanh “rain” và “Spain” được coi là dấu ngoặc kép chứ không phải là từ cuối cùng của chuỗi
Raw string cho phép bạn sử dụng dấu gạch chéo ngược:
```
let keypaths = #"Swift keypaths such as \Person.name hold uninvoked references to properties."#
```
Điều đó xử lý dấu gạch chéo ngược như là một ký tự chữ trong chuỗi, chứ không phải là ký tự thoát. Điều này có nghĩa là nội bên trong chuỗi hoạt động khác nhau:
```
let answer = 42
let dontpanic = #"The answer to life, the universe, and everything is \#(answer)."#
``` 
Lưu ý cách tôi đã sử dụng #(answer) để sử dụng nội suy chuỗi – một (answer) thông thường sẽ được hiểu là các ký tự trong chuỗi, vì vậy khi bạn muốn nội suy chuỗi xảy ra trong raw string, bạn phải thêm #.

Một trong những tính năng thú vị của các raw string trong Swift là việc sử dụng các ký hiệu hash ở đầu và cuối, bởi vì bạn có thể sử dụng nhiều ký tự trong trường hợp không chắc bạn cần tới. Thật khó để cung cấp một ví dụ điển hình ở đây vì nó thực sự phải rất hiếm, nhưng hãy xem xét chuỗi này: My dog said “woof”#gooddog. Vì không có dấu cách trước mã hash, Swift sẽ thấy “# và ngay lập tức diễn giải nó như là trình kết thúc của chuỗi. Trong trường hợp này, chúng ta cần phải thay đổi dấu phân tách của chúng ta từ #” thành ##”, như sau:
```
let str = ##"My dog said "woof"#gooddog"##
```
Lưu ý số lượng hash ở cuối phải khớp với số ở đầu.

Raw string hoàn toàn tương thích với hệ thống chuỗi nhiều dòng của Swift – chỉ cần sử dụng #””” để bắt đầu, sau đó “””# để kết thúc, như sau:
```
let multiline = #"""
The answer to life,
the universe,
and everything is \#(answer).
"""#
```
Viết một regex đơn giản để tìm các keypath chẳng hạn như \Person.name như sau:
```
let regex1 = "\\\\[A-Z]+[A-Za-z]+\\.[a-z]+"
```
Nhờ raw string, chúng tôi có thể viết cùng một điều như trên với một nửa số lượng dấu gạch chéo ngược:
```
let regex2 = #"\\[A-Z]+[A-Za-z]+\.[a-z]+"#
```