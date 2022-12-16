# I. Mở đầu
Thời gian trôi nhanh, đặc biệt là trong ngành phát triển phần mềm. MVP là một trong những kiến trúc nổi tiếng trong phát triển Android vài năm trước, nhưng ngày càng có nhiều người bắt đầu chuyển sang mô hình MVVM. Trong bài viết này, tôi sẽ mô tả lý do tại sao tôi chuyển từ MVP sang MVVM sau 2 năm kinh nghiệm trong MVP và nói lên quan điểm của mình.

# II. Quan điểm
## 1. Sử dụng nhiều Interface
Quá nhiều sự phụ thuộc trong contract interface, và interface sẽ thay đổi nếu view thay đổi. Điều này gây ra sự phiền toái nếu như view có sự thay đổi, và nó cũng phá vỡ một số nguyên tắc SOLID như Single responsibility, Open/closed Principle và Interface Segregation Principle

## 2. Vô nghĩa
Có nhiều method được thêm vào contract interface là vô nghĩa, bất cứ khi nào bạn muốn trích xuất một số login từ View vào Presenter, bạn sẽ cần thêm nhiều chức năng vào contract interface. Tương tự khi bạn muốn gọi cái gì đó từ Presenter đến view. Do đó contract interface sẽ ngày càng lớn theo thời gian và nhin giống như một bảng các phương thức public của Presenter và View. Nó không phải là một ngôn ngữ lập trình hướng đối tượng, Nó giống một header file trong C.

## 3. Tính tái sử dụng
Vì contract không được thiết kế theo tư duy hướng đối tượng nên nó khó sử dụng lại. Nếu bạn muốn tạo mới một View và sử dụng cùng một interface, bạn có thể sẽ làm rối contract. Ví dụ bạn muốn test A/B trên một số View hiện có trên MVP pattern và mỗi View khác nhau thì sẽ có các method public Presenter cần gọi khác nhau. Làm sao để xử lý vấn đề đó một cách "ngon nghẻ" nhất?

## 4. Độ chi tiết
Nó luôn là một cách tốt để hiểu business logic từ View, nhưng đôi khi bạn sẽ tự hỏi bản thân rằng làm sao để cần và làm nó như thế nào khi nó chẳng có một tiêu chuẩn nào cả. Nếu bạn ở trong một team lớn với nhiều dev có nhiều ý kiến khác nhau, điều này cũng sẽ là một vấn đề khi review code

## 5. Phụ thuộc xoay vòng
Một vấn đề khác là phụ thuộc xoay vòng lẫn nhau. Có thể nó không đúng hẳn là một cái tên phù hợp để mô tả. Presenter và View chỉ phục thuộc với nhau bằng interface contract chứ không phải một triển khai thực sự. Sự thật là interface contract là một tập hợp các methods chúng ta cần từ mỗi bên. Không ai đủ thông minh để thiế kế interface trước và thực hiện chi tiết sau mà không gặp vấn đề gì. Interface là tốt để giúp tôi thực hiện test đơn giản và dễ dàng, nhưng tôi vẫn coi chúng là liên kết chặt chẽ với nhau.

## 6. Module hoá
Modularization không phải là điều bắt buộc cần thiết cho mọi ứng dụng, nhưng bạn sẽ thấy một số vấn đề của ứng dụng khi bạn thử tách module và bạn thấy không thể. Nói về module hoá tốt, nó thường tốt hơn khi để module phụ thuộc vào ít phụ thuộc hơn và mối quan hệ giữa các module cũng là vấn đề . Kiến trúc tốt được mô tả trong  The Clean Architecture, nơi mỗi clas chỉ có thể phụ thuộc vào một lớp bên trong, nhưng thật khó để MVP tuân theo quy tắc này

![](https://images.viblo.asia/ab4b259a-253c-4c12-92ed-0557bac39e8c.jpg)

# III. Tổng kết
Phần mềm thực sự là một ngành công nghiệp phát triển rất nhanh, ai có thể tưởng tượng mô hình MVC một ngày nào đó sẽ trở nên lỗi thời từ rất lâu rồi?

Tôi nghĩ MVP vẫn là một kiến trúc tốt trong lịch sử và một ngày nào đó chắc chắn sẽ có một mô hình mới tốt hơn MVVM.

Tham khảo: [Medium](https://proandroiddev.com/why-mvp-is-outdated-in-android-187083eeb4e6)