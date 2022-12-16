# 1. Unit testing (kiểm thử đơn vị) là gì?
## Định nghĩa UNIT TESTING:
Là một loại kiểm thử phần mềm trong đó thực hiện kiểm thử từng đơn vị hoặc thành phần riêng lẻ của phần mềm. 
Mục đích của việc Kiểm thử đơn vị là để xác nhận rằng của mỗi đơn vị hay mã code của phần mềm thực hiện chức năng của chúng đúng như mong đợi. 
Kiểm thử đơn vị được thực hiện trong quá trình phát triển (giai đoạn thực hiện code) của một ứng dụng và được thực hiện bởi các kỹ sư phần mềm. Kiểm thử đơn vị sẽ thực hiện kiểm thử độc lập một phần code và xác minh tính chính xác của nó. Một đơn vị có thể là một chức năng, một phương thức, thủ tục, mô-đun hoặc đối tượng riêng lẻ.

Trong SDLC (Software Development Life-cycle - Vòng đời phát triển phần mềm), STLC (Software Testing Life Cycle - Quy trình kiểm thử phần mềm), V Model (Mô hình chữ V), kiểm thử đơn vị là cấp độ kiểm thử đầu tiên được thực hiện trước khi kiểm thử tích hợp. Kiểm thử đơn vị là một kỹ thuật kiểm tra WhiteBox thường được thực hiện bởi kỹ sư phần mềm. Mặc dù, trên thực tế do giới hạn về thời gian mà những kỹ sư phần mềm khó có thể thực hiện kiểm thử đơn vị, lúc này việc Kiểm thử đơn vị được thực hiện bởi những QA (Quality Assurance/Tester).

## Tại sao phải Kiểm thử đơn vị?
Đôi khi các kỹ sư phần mềm cố gắng tiết kiệm thời gian bằng cách thực hiện kiểm tra đơn vị một cách tối thiểu nhất. Việc bỏ qua kiểm tra đơn vị dẫn đến chi phí sửa lỗi cao hơn (nếu xảy ra lỗi) trong quá trình Kiểm thử hệ thống, Kiểm thử tích hợp và Kiểm thử Beta khi ứng dụng được hoàn thành. Việc kiểm thử đơn vị một cách thích hợp được thực hiện trong giai đoạn phát triển phần mềm giúp tiết kiệm cả thời gian và tiền bạc. Đây là những lý do chính để thực hiện kiểm tra đơn vị.
![](https://images.viblo.asia/5f076045-c900-49bf-bdd7-5fd6aff29ced.png)
1. Kiểm thử đơn vị giúp sửa lỗi sớm trong chu kỳ phát triển phần mềm, từ đó giúp tiết kiệm thời gian và chi phí.
2. Giúp các kỹ sư phần mềm hiểu cơ sở code và cho phép họ thực hiện các thay đổi nhanh chóng
3. Kiểm thử đơn vị có thể được dùng như tài liệu dự án
4. Kiểm thử đơn vị hỗ trợ việc sử dụng lại code. Khi có dự án mới, các mã code và cách Kiểm thử đơn vị của dự án cũ có thể được tái sử dụng, chỉ cần điều chỉnh các mã code và cách test sao cho phù hợp.
# 2. Cách thực hiện Kiểm thử đơn vị
## Kiểm thử đơn vị có hai loại:
- Manual (thủ công) 
- Automated (Tự động)

Kiểm thử đơn vị thường là tự động nhưng vẫn có thể được thực hiện thủ công. Thường thì việc tự động hóa Kiểm thử đơn vị được ưa thích hơn. Khi kiểm thử đơn vị thủ công, có thể sử dụng những tài liệu hướng dẫn mà trong đó đã ghi rõ các bước thực hiện.

## Kỹ thuật kiểm thử đơn vị:
Các kỹ thuật bao gồm kiểm thử các đoạn mã code được tổng hợp ở dưới đây:
- Statement Coverage (Bao phủ dòng lệnh)
- Decision Coverage (Bao phủ quyết định)
- Branch Coverage (Bao phủ các nhánh)
- Condition Coverage (Bao phủ điều kiện)
- Finite State Machine Coverage (Bao phủ trạng thái hữu hạn)

## Ví dụ về kiểm thử đơn vị: Đối tượng ảo (Mock objects)
Kiểm thử đơn vị dựa trên các đối tượng mock được tạo ra để kiểm tra các phần code chưa hoàn chỉnh. Các đối tượng này giúp điền vào các phần còn thiếu của chương trình.

Ví dụ: bạn có thể có một hàm cần các biến hoặc đối tượng chưa được tạo. Trong kiểm thử đơn vị, những thứ đó sẽ được tính dưới dạng các đối tượng mock được tạo ra chỉ nhằm mục đích thử nghiệm đơn vị được thực hiện trên phần mã đó.

# 3. Công cụ kiểm thử đơn vị
Hiện nay có một số công cụ tự động có sẵn để hỗ trợ kiểm thử đơn vị, bài viết này sẽ đề cập tới một số công cụ như sau:

**Junit:** Junit là một công cụ kiểm tra sử dụng miễn phí, được sử dụng cho ngôn ngữ lập trình Java. Nó cung cấp các xác nhận giúp xác định được phương pháp kiểm thử. Công cụ này kiểm tra dữ liệu trước và sau đó chèn vào các đoạn code.

**NUnit:** NUnit được sử dụng rộng rãi trong Kiểm thử đơn vị và với tất cả các ngôn ngữ .net. Nó là một công cụ mã nguồn mở, cho phép viết các kịch bản một cách thủ công. Nó cũng hỗ trợ việc test dựa trên các dữ liệu macó thể chạy song song.

**PHPUnit:** PHPUnit là một công cụ kiểm thử đơn vị cho lập trình viên PHP. Nó lấy một phần nhỏ của mã code mà được gọi là các đơn vị và kiểm tra từng mã riêng biệt. Công cụ này cũng cho phép các nhà phát triển phần mềm sử dụng các phương thức xác nhận được xác định trước để khẳng định rằng một hệ thống phải được hoạt động theo một cách nhất định.

# 4. Lợi thế kiểm tra đơn vị
Kiểm thử đơn vị cho phép lập trình viên cấu trúc lại code và đảm bảo mô-đun vẫn hoạt động chính xác (ví dụ: Kiểm tra hồi quy). Quy trình là viết các trường hợp kiểm thử cho tất cả các hàm và các phương thức để mỗi có khi thay đổi gây ra lỗi thì có thể được phát hiện và sửa chữa một cách nhanh chóng.
Do tính chất mô-đun của Kiểm thử đơn vị, có thể kiểm tra từng phần của dự án mà không cần phải chờ tới khi toàn bộ dự án được hoàn thành.

# 5. Nhược điểm kiểm thử đơn vị
Việc mong đợi Kiểm thử đơn vị sẽ tìm ra mọi lỗi trong một chương trình là điều không thể. 
Bản chất của việc kiểm thử đơn vị là tập trung vào một đơn vị mã code. Do đó, nó không thể bắt lỗi tích hợp hoặc lỗi cấp hệ thống rộng.
Kiểm thử đơn vị thường được sử dụng cùng với các hoạt động kiểm tra khác.

# 6. Cách để thực hiện Kiểm thử đơn vị một cách tốt nhất
Các trường hợp kiểm thử đơn vị phải độc lập. 
Trong trường hợp có bất kỳ cải tiến hoặc thay đổi trong yêu cầu, các trường Kiểm thử đơn vị không nên bị ảnh hưởng.
Chỉ kiểm tra một mã tại một thời điểm.
Thực hiện theo các quy ước đặt tên rõ ràng và nhất quán cho các bài kiểm thử đơn vị 
Trong trường hợp thay đổi mã code của bất kỳ mô-đun nào, hãy đảm bảo có kế hoạch cho việc kiểm thử đơn vị tương ứng và mô-đun đó phải vượt qua bài kiểm thử đơn vị trước khi được triển khai.
Những lỗi được xác định trong quá trình kiểm thử đơn vị phải được sửa trước khi chuyển sang giai đoạn tiếp theo trong SDLC

Tài liệu tham khảo: https://www.guru99.com/unit-testing-guide.html