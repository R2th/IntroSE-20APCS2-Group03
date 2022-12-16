Khi lập kế hoạch kiểm thử xung quanh một dự án phần mềm, chúng ta có xu hướng chỉ nghĩ về các chức năng chính và mục tiêu cuối cùng, giảm thiểu các trường hợp về những gì dự án phần mềm thực sự cần để đạt được.

Những yêu cầu phi chức năng và trường hợp abnormal thường không được dự tính, hoặc được đánh giá thấp hoặc được tự động chấp thuận.

Tuy nhiên trong nhiều trường hợp, điều không tốt của sản phẩm có thể xảy ra và nó thường tiềm ẩn trong các yêu cầu phi chức năng, các trường hợp abnormal.

Vì vậy, việc đưa các kịch bản kiểm thử phi chức năng và trường hợp abnormal trở thành một phần trong quá trình lập kế hoạch và ước tính là điều cần thiết. 

### 1.  Non_Functional case (phi chức năng):

| Non_Functional | Mô tả |
| - | -|
| Security <br>(Bảo mật) | Ứng dụng có cần kiểm soát người truy cập và session hay không?<br>Có cần lưu trữ dữ liệu ở vị trí an toàn, với định dạng an toàn không?<br>Có yêu cầu đảm bảo đường dẫn kết nối cho dữ liệu không? |
| Concurrency and Capacity <br>(Đồng thời và chịu tải) | Hệ thống có thể xử lý đồng thời và có khả năng tương tác với hệ thống khác không?<br> Số lượng người dùng đồng thời tối thiểu, trung bình, tối đa là bao nhiêu?<br> Bao nhiêu dữ liệu có thể lưu trữ trên hệ thống và lưu trữ trong bao lâu? <br>Có mức độ tối đa cho việc truyền dữ liệu không? |
|Performance <br>(Hiệu năng)| Giá trị mong muốn hệ thống đáp ứng là bao nhiêu? <br>Hiệu năng thường được đánh giá bằng thời gian. |
| Reliability <br>(Độ tin cậy)| Có cần phải đảm bảo và thông báo về các giao dịch và xử lý hệ thống? <br>Dữ liệu được chuyển giao một cách đáng tin cậy và sử dụng các giao thức đáng tin cậy hay không?|
| Maintainability <br>(Khả năng bảo trì) | Bảo trì có thể biểu hiện khả năng mở rộng để phát triển và cải thiện các tính năng hệ thống và chức năng. |
| Usability <br>(Tính khả dụng) | Áp dụng các yêu cầu trải nghiệm người dùng vào dự án <br>(Để tiết kiệm được rất nhiều thời gian khi phát hành dự án vì người dùng sẽ không yêu cầu thay đổi hoặc thậm chí là không gây ra hiểu lầm) |
| Documentation <br>(Tham khảo) | Cuối cùng nhưng không kém phần quan trọng, tất cả các dự án đều yêu cầu tối thiểu tài liệu ở các cấp độ khác nhau. Trong nhiều trường hợp, người dùng thậm chí có thể cần được đào tạo về nó, vì vậy việc duy trì các tiêu chuẩn và thực hành tài liệu tốt sẽ làm nhiệm vụ này lan truyền dọc theo phát triển dự án; nhưng điều này cũng phải được thiết lập kể từ khi lập kế hoạch dự án để bao gồm nhiệm vụ này trong danh sách |

### 2. Abnormal case:

*P/S: áp dụng cho các dự án application trên mobile*

| Abnormal case | Mô tả |
| -------- | -------- |
| Disconncet internet | Ví dụ: Khi đang sử dụng chức năng [Chia sẻ] thì bị mất mạng <br>=> App không bị crash |
| Pin yếu/ Đang sạc pin | Ví dụ: Sử dụng app trong tình trạng pin yếu/ đang sạc pin <br>=> App hoạt động bình thường |
| Tương tác <br>(Incoming call/ notification message/ Alarm/ Play music) | Ví dụ: Khi đang sử dụng app thì có cuộc gọi/ tin nhắn đến/ chuông báo thức/ play music <br>=> Sau khi kết thúc cuộc gọi/ kết thúc tin nhắn, quay trở lại app hoạt động bình thường |
| Switch ứng dụng | Ví dụ: Khi đang sử dụng app thì chuyển sang ứng dụng khác ròi quay trở về app <br>=> App hoạt động bình thường |
| Rotate màn hình | Ví dụ: Bật chết độ rotate trên mobile, xoay màn hình ngang, dọc <br>=> App không bị xoay theo |
| Long tap/ multi tap | Ví dụ: Giữ chặt tay trên ứng dụng/ tap liên tục lên ứng dụng <br>=> App không bị crash |
| Tap vào vị trí bất kỳ khi đang load dữ liệu | Ví dụ: Khi dữ liệu đang load thì tap vào vị trí bất kỳ trên app <br>=> App không bị crash |
| Thay đổi ngôn ngữ/ font size | Ví dụ: Đổi ngôn ngữ sang JP hoặc VN, đổi hiện thị font size thành lớn hơn hoặc nhỏ hơn <br>=> Hiển thị trên App bình thường, không bị chồng chéo lên nhau |
| Phím cứng <br>(Home, Back, lock screen, volumn) | Ví dụ: Đang sử dụng App thì press các phím cứng<br> (Home, Back, lock screen, volumn) <br>=> Tác vụ hoạt động tương ứng, không gây lỗi |
| Install app khi bộ nhớ đầy/ bộ nhớ đầy thì có notification | Ví dụ: Bộ nhớ điện thoại gần đầy thì thực hiện install app |

Hi vọng bài viết đã cung cấp cho bạn những test viewpoint cần thiết khi thực hiện kiểm thử phi chức năng, abnormal cho một dự án phần mềm.

*Tài liệu tham khảo:*

*https://www.startxconsulting.com/en/articles/7-non-functional-requirements-you-should-always-keep-into-account/?gclid=Cj0KCQjw-uzVBRDkARIsALkZAdnm1c6i9pr46QSKJSohjZpvKpfY5pIuDiX5QnJonyUeUIkDzJfDIzoaAqVtEALwwcB*