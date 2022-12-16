Màn hình cần kiểm tra có nhiều layout (cả PC và mobile) phải check, chức năng cần test có logic phức tạp. Trong trường hợp này khi viết testcase ít nhiều tester sẽ bị thiếu một vài trường hợp test. Để đảm bảo testcase cover hầu hết các case test và dễ dàng hơn trong việc đọc hiểu các yêu cầu hãy sử dụng *Bảng quyết định - Decision Table* sẽ giúp cho việc liệt kê các case test trở nên đơn giản và dễ dàng hơn.
## Bảng quyết định là gì?
Bảng quyết định là một kỹ thuật test được sử dụng để kiểm tra các hành vi hệ thống (system behavior) với các cách kết hợp input đầu vào khác nhau. Đây là một cách tiếp cận có hệ thống, kết quả của các kết hợp đó và hành vi hệ thống tương ứng của chúng (output) sẽ được ghi lại dưới dạng bảng. Đó cũng là lý do tại sao bảng quyết định còn được gọi là *Bảng hiệu ứng nguyên nhân - Cause-Effect table*.

Hãy xem cách mà bảng quyết định mô tả các yêu cầu dưới dạng bảng với các ví dụ sau:
### Ví dụ 1:
Chúng ta có một form đăng nhập như sau:

![](https://images.viblo.asia/9830a39e-12e0-4efb-bed6-9f581dddc25c.png)

 ***Hình 1**. Form đăng nhập.*

Với các yêu cầu của form đăng nhập:   
- Người dùng nhập đúng email và mật khẩu khi đăng nhập thành công sẽ được điều hướng sang trang chủ của website.
- Nếu nhập email hoặc mật khẩu không đúng khi đăng nhập hệ thống sẽ hiển thị thông báo lỗi tương ứng.

Chúng ta sẽ có được bảng quyết định các hành vi hệ thống cho form đăng nhập như sau:

| Điều kiện | Quy tắc 1 | Quy tắc 2 | Quy tắc 3 |Quy tắc 4 |
| -------- | -------- | -------- |-------- |-------- |
| Email (T/F)     | T     | T     |   F   |      F     |
| Mật khẩu (T/F)     | T     | F     |  T    |       F    |
| Kết quả (E/H)    | H     | E     |     E |     E      |
***Bảng 1.** Bảng điều kiện cho form đăng nhập.*

**❁ *Chú thích:***
- **T - True:** Nhập đúng email và mật khẩu.
- **F - False:** Email hoặc mật khẩu bị sai.
- **E - Error:** Hiển thị lỗi.
- **H - Home:** Hiển thị trang chủ. 

**❁ *Diễn giải:***
- Trường hợp 1: Email và mật khẩu đúng, người dùng sẽ được chuyển hướng đến trang chủ. 
- Trường hợp 2: Email đúng, mật khẩu sai; người dùng sẽ nhận được thông báo lỗi.
- Trường hợp 3: Email sai, mật khẩu đúng; người dùng sẽ nhận được thông báo lỗi.
- Trường hợp 4: Email và mật khẩu sai, người dùng sẽ nhận được thông báo lỗi.

Khi chuyển các trường hợp trên thành testcase, chúng ta có thể tạo ra hai kịch bản,

- Một là điền email đúng - mật khẩu đúng -> click nút đăng nhập => Kết quả mong muốn là hệ thống sẽ chuyển hướng người dùng đến trang chủ.

và kịch bản thứ hai là:

- Nhập email sai - mật khẩu sai -> click nút đăng nhập => Kết quả mong muốn là hệ thống sẽ hiển thị lỗi cho người dùng.
- Nhập email đúng - mật khẩu sai -> click nút đăng nhập => Kết quả mong muốn là hệ thống sẽ hiển thị lỗi cho người dùng.
- Nhập email sai - mật khẩu đúng -> click nút đăng nhập => Kết quả mong muốn là hệ thống sẽ hiển thị lỗi cho người dùng.
### Ví dụ 2:
Ở ví dụ 2 này chúng ta sẽ tạo bảng quyết định cho form upload hình ảnh.
![](https://images.viblo.asia/b6e486b7-fae9-4c58-9999-0150e07b17b3.png)

***Hình 2.** Form upload hình ảnh.*

Điều kiện upload thành công là:
- Hình ảnh phải có định dạng .JPG.
- Kích thước của file hình ảnh từ 32kb trở xuống.
- Độ phân giải: 137*177.

Nếu có điều kiện nào không thỏa việc upload ảnh sẽ không thành công và hệ thống sẽ gửi thông báo tương ứng đến người dùng. Ngược lại hình sẽ được upload thành công.

Từ các yêu cầu trên chúng ta có được bảng quyết định cho form upload ảnh như sau:



| Điều kiện | Trường hợp 1 | Trường hợp 2 | Trường hợp 3 | Trường hợp 4 | Trường hợp 5    | Trường hợp 6 | Trường hợp 7 | Trường hợp 8 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
|  Định dạng    |    .jpg |.jpg   |.jpg | .jpg | Không phải .jpg | Không phải .jpg |Không phải .jpg  | Không phải .jpg |
|  Kích thước    |    < 32 Kb  |  < 32 Kb    | >= 32 Kb |>= 32 Kb  | < 32 Kb | < 32 Kb | >= 32 Kb |>= 32 Kb  |
|  Độ phân giải  |   137*177   |   Không phải 137*177   |  137*177|  Không phải 137*177| 137*177 | Không phải 137*177 | 137*177 |  Không phải 137*177|
|  Kết quả  |Upload ảnh thành công| Thông báo lỗi "Độ phân giải chưa đúng"|Thông báo lỗi "Kích thước chưa đúng"|Thông báo lỗi "Kích thước và Độ phân giải chưa đúng"|Thông báo lỗi "Định dạng chưa đúng"|Thông báo lỗi "Định dạng và Độ phân giải chưa đúng"| Thông báo lỗi "Định dạng và Kích thước chưa đúng"|Thông báo lỗi "Định dạng, Kích thước và Độ phân giải chưa đúng"|
***Bảng 2.** Bảng quyết định cho form upload hình ảnh.*

Với những điều kiện trên, chúng ta có thể tạo ra 8 case test:
1. Upload hình ảnh với định dạng .jpg, kích thước bé hơn 32 Kb và độ phân giải là 137*177 -> click nút upload. Kết quả mong muốn là hình ảnh được upload thành công.
2. Upload hình ảnh với định dạng .jpg, kích thước bé hơn 32 Kb và độ phân giải không phải là 137*177 -> click nút upload. Kết quả mong muốn là hiển thị thông báo lỗi "Độ phân giải chưa đúng".
3. Upload hình ảnh với định dạng .jpg, kích thước lớn hơn hoặc bằng 32 Kb và độ phân giải là 137*177 -> click nút upload. Kết quả mong muốn là hiển thị thông báo lỗi "Kích thước chưa đúng".
4. Upload hình ảnh với định dạng .jpg, kích thước lớn hơn hoặc bằng 32 Kb và độ phân giải không phải là 137*177 -> click nút upload. Kết quả mong muốn là hiển thị thông báo lỗi "Kích thước và Độ phân giải chưa đúng".
5. Upload hình ảnh với định dạng không phải là .jpg, kích thước bé hơn 32 Kb và độ phân giải là 137*177 -> click nút upload. Kết quả mong muốn là hiển thị thông báo lỗi "Định dạng chưa đúng".
6. Upload hình ảnh với định dạng không phải là .jpg, kích thước bé hơn 32 Kb và độ phân giải không phải là 137*177 -> click nút upload. Kết quả mong muốn là hiển thị thông báo lỗi "Định dạng và Độ phân giải chưa đúng".
7. Upload hình ảnh với định dạng không phải là .jpg, kích thước lớn hơn hoặc bằng 32 Kb và độ phân giải là 137*177 -> click nút upload. Kết quả mong muốn là hiển thị thông báo lỗi "Định dạng và kích thước chưa đúng".
8. Upload hình ảnh với định dạng không phải là .jpg, kích thước lớn hơn hoặc bằng 32 Kb và độ phân giải không phải là 137*177 -> click nút upload. Kết quả mong muốn là hiển thị thông báo lỗi "Định dạng, Kích thước và Độ phân giải chưa đúng".
## Mức độ quan trọng của bảng quyết định khi viết testcase?
Kỹ thuật test này sẽ trở nên quan trọng khi yêu cầu test trở nên phức tạp, phải kết hợp nhiều điều kiện khác nhau. Nó cũng giúp cho việc test các business logic phức tạp một cách dễ dàng hơn.

*Giá trị biên - Boundary value* và *phân vùng tương đương - Equivalence partition* là các kỹ thuật được sử dụng nếu hệ thống hiển thị cùng một kết quả đầu ra của một tập hợp lớn các input - đầu vào. Tuy nhiên, trong một hệ thống với mỗi bộ giá trị đầu vào khác nhau, kết quả đầu ra của hệ thống khác nhau thì kỹ thuật giá trị biên và phân vùng tương đương không hiệu quả trong việc đảm bảo phạm vi test. 

Trong trường hợp này, bảng quyết định là lựa chọn tốt nhất. Vì kỹ thuật này có thể đảm bảo được độ bao phủ của test case với cách trình bày đơn giản và dễ sử dụng. 

Bảng quyết định có thể được sử dụng làm tài liệu tham khảo, tài liệu ghi lại các yêu cầu của dự án hoặc được dùng để phát triển các chức năng.
## Cách tính số lượng các cột trường hợp
Số lượng các cột trường hợp trong bảng được tính bằng công thức **2^n** . Trong đó n là số lượng các input đầu vào.

***Ví dụ 3:***

Với form login ở *ví dụ 1* chúng ta có 2 input đầu vào (email và mật khẩu) -> Số lượng cột trường hợp sẽ là **2^2** = **4** cột.

***Ví dụ 4:***

Ở ví dụ 3 form đăng nhập chỉ có 2 input đầu vào nên việc tạo bảng quyết định và cover các case test sẽ đơn giản hơn. Nhưng giả sử khi test một form lấy ý kiến người dùng với số lượng các field input đầu vào là 10 field. Lúc này với n= 10 -> số lượng các cột trường hợp sẽ là **2^10** = **1024** cột. 

Với số lượng lớn 1024 (cột) trường hợp việc test vẫn có thể thực hiện nhưng để tránh các case trùng nhau và việc dành thời gian để test các case đó, tester sẽ dựa vào các yêu cầu, điều kiện của form để lọc, chọn ra một tập các trường hợp cần test dựa trên bảng quyết định đã có. Lúc này sẽ giảm thiểu được số lượng các case test đáng kể. 
## Ưu và khuyết điểm của bảng quyết định
### Ưu điểm
- Dễ dàng xây dựng và chuyển đổi thành một bộ quy tắc. Có thể được sử dụng trong quá trình tạo và test các case test hoặc kiểm tra logic của hệ thống dựa trên knowledge-based của hệ thống.
- Dựa vào bảng quyết định có thể phát hiện ra một số case test mà khi xây dựng test case theo cách thông thường tester sẽ dễ bị thiếu.
- Được dùng làm tài liệu khi làm việc với stakeholders - các bên liên quan và các thành viên nontechnical trong team dự án vì bảng quyết định trình bày, minh họa các vấn đề dưới dạng bảng giúp cho mọi người dễ hiểu hơn.
### Khuyết điểm
- Khi số lượng cái input đầu vào tăng thì bảng quyết định sẽ trở nên phức tạp hơn.
- Không có các bước chi tiết step by step để thực hiện test.
## Kết Luận 
Bảng quyết định là một trong những công cụ mô tả quy trình, yêu cầu. Nó được sử dụng để mô hình hóa các logic phức tạp, kiểm tra sự tương tác giữa các điều kiện, kiểm tra sự đúng sai khi kết hợp các điều kiện này với nhau để đảm bảo rằng tất cả các yêu cầu, mối quan hệ và các ràng buộc đã được xử lý trên hệ thống, phần mềm hay chưa? và đưa ra các kết quả tương ứng với từng input đầu vào. Nó thường được sử dụng bởi các analyst nhằm mô tả quy trình, các yêu cầu của dự án.

---------------------------------------------------------------------------------------------------------------------------------------------
*Link tham khảo:*
- https://www.stickyminds.com/article/using-decision-tables-clear-well-designed-testing 
- https://www.guru99.com/software-testing-techniques-1.html