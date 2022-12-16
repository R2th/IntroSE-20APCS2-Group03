## Giới thiệu

Ruby là một ngôn ngữ hướng đối tượng thuần túy, bởi vậy tất cả các giá trị (values) đều là objects và không có sự phân biệt giữa kiểu nguyên thủy (primitive types) và kiểu objects như trong nhiều ngôn ngữ lập trình khác.

Trong Ruby, tất cả các object kế thừa từ class ```Object``` và chia sẻ các methods được định nghĩa bởi class đó. Trong loạt bài này, chúng ta sẽ khám phá các tính năng chung của tất cả các object trong Ruby.

Những thông tin sau đây đều là những kiến thức nền tảng về object, chúng ta cùng tìm hiểu nhé. Let's go!

## 1. Tham chiếu object (Object References)

Trong Ruby, chúng ta chỉ thao tác với các object thông qua các tham chiếu đến nó. Khi ta gán một giá trị cho biến, chúng ta chỉ đơn thuần lưu trữ một tham chiếu đến object vào biến đó. 

Đoạn code sau sẽ làm rõ hơn về điều này:

```
s = "Ruby" # Tạo một String object, lưu trữ một tham chiếu đến nó trong biến s
t = s # Copy tham chiếu vào biến t. Bây giờ s và t đều có chung tham chiếu đến cùng object.
t[-1] = "" # Chỉnh sửa object thông qua tham chiếu trong biến t
print s # Truy cập object đã chỉnh sửa thông qua s. In ra "Rub"
t = "Java" # Bây giờ t tham chiếu đến một object khác
print s,t # Dòng này in ra "RubJava"
```

Khi bạn truyền một object tới method trong Ruby, bạn chỉ đang truyền một tham chiếu object đến đó, không phải là chính object đó.

Nói cách khác, các đối số của methods nhận vào giá trị (value) thay vì tham chiếu (reference), nhưng các giá trị được truyền ở đây chính là các tham chiếu object.

Bởi vì các tham chiếu object được truyền vào method, method có thể sử dụng các tham chiếu để sửa đổi các object được tham chiếu.

### 1.1. Immediate values (các giá trị trực tiếp)

Chúng ta đã biết rằng: tất cả các giá trị trong Ruby là object và tất cả các object được thao tác thông qua reference (tham chiếu). Tuy nhiên, ```Fixnum``` và ```Symbol``` object thực sự là các giá trị trực tiếp thay vì các tham chiếu. 

Cả 2 class này đều không có methods biến đổi, vì vậy các object ```Fixnum``` và ```Symbol``` là bất biến (không thay đổi - immutable). Nghĩa là thực sự không có cách nào để nói rằng: chúng được thao tác qua giá trị thay vì tham chiếu.

Sự tồn tại của các giá trị trực tiếp (immediate values) nên được xem xét một cách chi tiết. Khác biệt duy nhất giữa các giá trị immediate values và reference values đó là: các giá trị immediate không có các singleton methods được định nghĩa trong chúng. 

(Singleton methods được giải thích trong §6.1.4 trang 179 - The Ruby Programming Language book).

## Kết bài

Những kiến thức về Objects trong Ruby còn rất nhiều, ta sẽ tìm hiểu về chúng trong các bài viết tiếp theo, cảm ơn các bạn đã theo dõi bài viết.

Nếu bạn đọc phát hiện ra sai sót về kiến thức, hay chưa hiểu nội dung nào đó. Các bạn có thể để lại comment phía dưới, tôi sẽ xem xét và giải đáp mọi thắc mắc.

## Tài liệu tham khảo

https://theswissbay.ch/pdf/Gentoomen%20Library/Programming/Ruby/The%20Ruby%20Programming%20Language%20-%20Oreilly.pdf (trang 72, 73)

https://gaacode.github.io/blog/2019/ruby-objects-trong-ruby-1/