Như ở Phần 1 mình có trình bày về bước ngoặt chuyển qua làm Tester của mình và các kiến thức cơ bản về:
* Quy trình kiểm thử phần mềm theo tiêu chuẩn CMMI
* Mô hình V-mode trong phần mềm
* Các mức test, kiểu test cơ bản. Hẹn gặp lại các bạn ở các phần sau, chúng ta sẽ tìm hiểu về các phương pháp kiểm thử.

Link: https://viblo.asia/p/toi-da-hoc-de-tro-thanh-tester-nhu-the-nao-p1-4P8566RL5Y3.

Ở phần này mình xin giới thiệu về các phương pháp kiểm thử.

Tùy theo chương trình đào tạo, mà mỗi giáo trình có cách gọi khác nhau đối với khái niệm: các kỹ thuật kiểm thử, các phương pháp kiểm thử, các hình thức kiểm thử, chiến lược kiểm thử:
- Test to pass, test to fail
- Phương pháp kiểm thử hộp đen (Black-Box Testing) 
- Phương pháp kiểm thử hộp trắng (White-Box Testing) 
- Phương pháp kiểm thử hộp nâu (Grey-Box Testing) 
# I. Test to pass, test to fail
Test – to – pass: thực hiện kiểm tra với những chức năng tối thiểu của phần mềm => pass.

Test – to – fail: thực hiện với kiểm tra những trường hợp lắt léo, bí ẩn, cố gắng để bắt lỗi => fail.

Thứ tự này không bắt buộc => đạt được mục đích: bắt lỗi.

Ở đây mình tìm thấy 1 minh họa rất hay cho phương pháp này.

![](https://images.viblo.asia/225b29db-6ec4-4181-a562-eb5e53675c4a.PNG)

Ở đây có thể thấy anh chàng lái xe lái rất bình thường ở case Test to Pass, nhưng ở case Test to Fail thì có vẻ anh ta đã phóng nhanh vượt ẩu, tìm ra lỗi của chiếc xe :D.
# II. Kỹ thuật kiểm thử hộp đen (Black-Box Testing) 
## II.1. Định nghĩa: 
- Là phương pháp test dựa trên đầu vào và đầu ra của chương trình để test mà không quan tâm tới code bên trong được viết ra sao. Tester  xem phần mềm như là một hộp đen.
- Nó còn được gọi là kiểm thử hướng dữ liệu hay là kiểm thử hướng in/out.
- Người kiểm thử nên xây dựng các nhóm giá trị đầu vào mà sẽ thực thi đầy đủ tất cả các yêu cầu chức năng của chương trình
## II.2. Các kĩ thuật chính trong kiểm thử hộp đen
### II.2.1. Equivalence partitioning (phân vùng tương đương)
- Chia (partition) đầu vào thành những nhóm tương đương nhau (equivalence). Nếu một giá trị trong nhóm hoạt động đúng thì tất cả các giá trị trong nhóm đó cũng hoạt động đúng và ngược lại.
- Mục đích : Giảm đáng kể số lượng test case cần phải thiết kế vì với mỗi lớp tương đương ta chỉ cần test trên các phần tử đại diện.
- Thiết kế Test-case bằng phân lớp tương đương tiến hành theo 2 bước:
(1). Xác định các lớp tương đương
(2). Xác định các ca kiểm thử.
- Ví dụ: Một textbox chỉ cho phép nhập Zip Code có 5 kí tự số

Chúng ta sẽ phân tách các lớp như sau:

Ký tự số/ Ký tự chữ/ Ký tự đặc biệt.

Không nhập gì/ <5 Ký tự / 5 ký tự / >5 ký tự.

Chúng ta sẽ có những case sau:

![](https://images.viblo.asia/f28fa0cf-2fe0-485c-9697-5bee35d5167f.PNG)

### II.2.2 Boundary value analysis (phân tích giá trị biên)
- Đây là phương pháp test mà chúng ta sẽ test tất cả các giá trị ở vùng biên của dữ liệu vào và dữ liệu ra. Chúng ta sẽ tập trung vào các giá trị biên chứ không test toàn bộ dữ liệu. Kinh nghiệm cho thấy các ca kiểm thử mà khảo sát tỷ mỷ các điều kiện biên có tỷ lệ phần trăm cao hơn các ca kiểm thử khác. Các điều kiện biên là những điều kiện mà các tình huống ngay tại, trên và dưới các cạnh của các lớp tương đương đầu vào và các lớp tương đương đầu ra.
- Theo  như   ISTQB trong phần “Test các giá trị biên” chúng ta chỉ test các phần sau:

![](https://images.viblo.asia/73ba8804-d184-4023-bb0a-6cc1b7022cf8.PNG)
- Bất kỳ một cách chọn thực hiện trong phương pháp “Giá trị biên” ta có thể sử dụng được tốt. Thay vì ta phải test toàn bộ vùng cần test ta có thể test 6 hoặc 4 case và vẫn đảm bảo là hệ thống hoạt động tốt.
- Một số điểm cần lưu ý khi dùng phương  pháp này:

Luôn test trường hợp “0” nếu nó nằm trong vùng kiểm tra và một vài trường hợp nếu nó nằm ngòai vùng bởi vì 0 là giá trị khá đặc biệt.

Luôn test các chuỗi rỗng nếu nó nằm trong vùng test và ngay cả khi nó không nằm trong vùng test.

- Ví dụ: Textbox Tuổi chỉ cho phép nhập tuổi từ 1->100.

Chúng ta sẽ có được giá trị a = 1, b = 100. Từ đó sẽ có những testcase như sau:

![](https://images.viblo.asia/e1fe00d4-8903-40b3-a394-0f2650fa27e0.PNG)

### II.2.3 Cause & Effect Graphing( Đồ thị nguyên nhân – kết quả)
- Cause & Effect Graphing - Đồ thị nguyên nhân kết quả là là phương pháp tạo các ca kiểm thử có hệ thống mô tả sự kết hợp của các điều kiện. Sự thay đổi sẽ là 1 sự lựa chọn kết hợp không thể dự tính trước, nhưng khi thực hiện như vậy, có vẻ như bạn sẽ bỏ sót nhiều ca kiểm thử “thú vị” được xác định bằng đồ thị nguyên nhân – kết quả.
- Tất cả các nguyên nhân (các đầu vào) và các kết quả (các đầu ra) được liệt kê dựa trên đặc tả và được định danh cho mỗi nhân - quả.
- Các quan hệ giữa các nguyên nhân (các đầu vào) và các kết quả (các đầu ra) được biểu diễn trong đồ thị làm rõ ràng các quan hệ logic.
- Từ đồ thị tạo ra bảng quyết định biểu diễn các quan hệ giữa nguyên nhân và kết quả. Dữ liệu kiểm thử được sinh ra dựa trên các qui tắc trong các bảng này.

Về các ví dụ của Đồ thị nguyên nhân kết quả các bạn có thể xem tại: https://viblo.asia/p/mot-so-vi-du-cua-ky-thuat-kiem-thu-cause-effect-graphing-do-thi-nguyen-nhan-ket-qua-bWrZnpnr5xw

### II.2.4. Các kỹ thuật của phương pháp kiểm thử hộp đen khác:
- Specification-based testing (kiểm thử dựa vào chức năng)
- Fuzz testing (cách test: nhập vào các điều kiện sai hoặc data một cách ngẫu nhiên),
- Model-based testing (Kiểm thử dựa trên model)
- Traceability matrix (các chức năng của chương trình được tạo thành một ma trận, các trường hợp test là sự kết hợp các dòng hoặc các cột có liên quan),
- Exploratory testing (kiểm thử chủ yếu dựa vào kinh nghiệm và khả năng focus vào việc test các chức năng của tester) 
- All-pairs testing (kiểm thử tất cả các cặp),

# III. Kỹ thuật kiểm thử hộp trắng (White-Box Testing) 
## III.1. Định nghĩa: 
- Kiểm  thử hộp  trắng hay còn gọi  là kiểm  thử hướng  logic, dựa vào cấu trúc code bên trong của phần mềm với mục đích đảm bảo rằng tất cả các câu lệnh và điều kiện sẽ được thực hiện ít nhất một lần. 
- Người  kiểm  thử  truy  nhập  vào  mã  nguồn chương trình và có thể kiểm tra nó, lấy đó làm cơ sở để hỗ trợ việc kiểm thử. 

Việc kiểm thử bằng kỹ thuật hộp trắng không thể đảm bảo rằng chương trình đã tuân theo đặc tả.  

Một chương trình sai do thiếu đường dẫn. Việc kiểm thử hộp trắng không thể biết được sự thiếu sót này. 

Việc kiểm  thử bằng kỹ  thuật hộp  trắng không  thể phát hiện được  lỗi do dữ liệu. Như vậy, việc kiểm thử chỉ dùng kỹ thuật hộp trắng là không đủ để phát hiện lỗi.

## III.2. Kỹ thuật kiểm thử hộp trắng
Để thực hiện kiểm thử hộp trắng, các Tester sử dụng các phương pháp sau:
- Bao phủ mã lệnh (Code coverage).
- Gán lỗi (Fault injection methods).
- Kiểm thử hoán chuyển (Mutation testing methods).
- Kiểm thử tĩnh (Fuzz testing).
- Kiểm thử giao diện lập trình ứng dụng (API testing- Application programming interface)

# IV. Kiểm thử hộp xám (Gray box testing)
- Là hình thức mới hình thành và đòi hỏi trình độ cao.
- Là kiểu trung gian giữa kiểm thử hộp đen và kiểm thử hộp trắng, trong đó tester phải vận dụng các kiến thức về thuật toán, cấu trúc bên trong chương trình, … như của hộp trắng nhưng để thiết kế testcase theo hương người sử dụng hoặc có testcase như của hộp đen.

# Tổng kết:
Trong phần này mình đã chia sẻ về các kiến thức:
- Test to pass, test to fail
- Phương pháp kiểm thử hộp đen (Black-Box Testing)  và một số kỹ thuật test cơ bản.
- Phương pháp kiểm thử hộp trắng (White-Box Testing) .
- Phương pháp kiểm thử hộp nâu (Grey-Box Testing) .

Ở phần tiếp theo mình sẽ chia sẻ về Kĩ thuật thiết kế testcase hiệu quả. Cám ơn các bạn đã theo dõi.