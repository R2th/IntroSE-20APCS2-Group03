![](https://images.viblo.asia/906be540-8e66-46bd-99d4-3ff4965f2ef5.jpg)

#### Thử nghiệm alpha là gì?
Thử nghiệm alpha là một hoạt động trước release và là một loại Acceptance Testing. Ở đây, hoạt động thử nghiệm này được kiểm soát và không thể truy cập được bởi end-users trên thị trường.

Một sản phẩm mới được phát triển hoặc sản phẩm được update trải qua Alpha Testing trong môi trường test. Test được thực hiện để mô phỏng hành vi thời gian thực để phù hợp với việc sử dụng sản phẩm của end-users trên thị trường.

Thử nghiệm alpha thực sự là một phương pháp để đánh giá chất lượng và tính ổn định của một sản phẩm được thử nghiệm trong môi trường thử nghiệm.

Giai đoạn này chủ yếu tập trung vào:

- Các vấn đề về khả năng sử dụng
- Những thiếu sót, sai lệch về  feature
- Sự tương thích / Các vấn đề liên quan đến khả năng hoạt động

Feedback từ nhóm có liên quan đến Thử nghiệm Alpha được thu thập để đánh giá chất lượng và độ ổn định của Sản phẩm và mọi đề xuất để cải thiện sản phẩm đều được xem xét.

#### Alpha Testing trong SDLC
Sơ đồ dưới đây giải thích sự phù hợp của thử nghiệm Alpha trong vòng đời phát triển phần mềm. Thử nghiệm này xảy ra khi một sản phẩm hoàn thành 70% - 90%,  trước giai đoạn thử nghiệm beta.
![](https://images.viblo.asia/4217c7c7-7467-43fa-b6ea-8806e38ff803.jpg)

#### Mục đích

Thử nghiệm Alpha  luôn luôn là cần thiết cho các sản phẩm được lên kế hoạch trải qua thử nghiệm beta.

**Những lý do đằng sau tiến hành kiểm tra này là:**

- Xảy ra bug trực tiếp đến  giai đoạn sau (giai đoạn thử nghiệm beta / sau khi khởi động sản xuất) để lại một nhận xét xấu về sản phẩm và danh tiếng bị mất trên tổ chức phát triển sản phẩm. Ngoài ra, các bugs này có thể gây ra sự chậm trễ trong việc khởi chạy Sản xuất, cần nhiều nỗ lực hơn (cả thời gian và kinh phí) để sửa chúng.
- Khuyến khích các lĩnh vực khác nhau (như bán hàng, quản lý, vv) để sử dụng sản phẩm và trải nghiệm nó. Họ cũng được khuyến khích cung cấp phản hồi, đề xuất để cải thiện sản phẩm giúp thực sự nâng cao chất lượng sản phẩm.
- Vì giai đoạn này sẽ nắm bắt những mối quan ngại sắp tới mà end-users có, chúng ta có thể xây dựng một hệ thống Hỗ trợ mạnh mẽ cho sản phẩm ngay sau khi khởi chạy Production.
- Những sai sót của feature có thể được cover hoặc lên kế hoạch cho các bản realses tiếp theo.


**Thử nghiệm này xảy ra trong các giai đoạn:**

- **Pre-Alpha Testing:** Giao diện người dùng của sản phẩm đã sẵn sàng nhưng các tính năng chưa được triển khai hoàn toàn. Giai đoạn này thường là nơi quyết định về những tính năng đi vào sản phẩm vẫn đang được tiến hành. Proto-type của một sản phẩm được liên tục xem xét và phân tích để tăng cường hơn nữa.
- **Alpha Testing:** Sản phẩm làm việc đã sẵn sàng để thử nghiệm khi vòng QA ban đầu đã gần hoàn tất.


Thử nghiệm alpha thường diễn ra trong các chu kỳ mà thường được gọi là chu kỳ kiểm tra, mỗi chu kỳ sẽ khoảng 1 - 2 tuần. Số chu kỳ phụ thuộc vào các tính năng được bao gồm để kiểm tra và số lượng các vấn đề được phát hiện trong giai đoạn thử nghiệm này.

Thông thường, Acceptance Tests và vài trường hợp System test để hỗ trợ Kiểm tra chấp nhận được xem xét để thực thi.

#### Các bên liên quan và người tham gia
Các bên liên quan của giai đoạn Thử nghiệm Alpha thường sẽ là developers, QA Team và Nhóm Quản lý Sản phẩm.

**Những người tham gia thử nghiệm này sẽ là người thử nghiệm (thường là):**

- Chuyên môn về vấn đề trong lĩnh vực domain.
- Một người biết rõ Sản phẩm.
- Những người đã tham gia vào Giai đoạn Thử nghiệm Hệ thống .
- Từ các môi trường kỹ thuật liên quan khác nhau (chuyên gia kỹ thuật)

Đôi khi, khách hàng hoặc end-users được xác định có thể tham gia thử nghiệm Alpha version của sản phẩm.

Các kỹ thuật kiểm tra back-box hoặc white-box hoặc kết hợp cả hai đều có thể được áp dụng. Ngoài ra, các Acceptance tests có thể được ưu tiên để được tự động vì điều này liên quan đến nhiều chu kỳ và các kiểm thử có thể lặp lại trong mỗi chu kỳ. Acceptance tests chạy trong chu kỳ này được gọi là Thử nghiệm Alpha.

#### Chiến lược thử nghiệm alpha

Giống như bất kỳ giai đoạn thử nghiệm nào khác, ngay cả loại thử nghiệm này cũng có Chiến lược nơi các mục tiêu và kế hoạch được xác định rõ ràng.

- Phương pháp tiếp cận để thực hiện hoạt động kiểm tra này được quyết định và các thủ tục được ghi lại trong Kế hoạch thử nghiệm.
- Các tính năng và kiểm tra chính xác của nó được thực hiện được xác định và đánh dấu cho chu kỳ.
- Kỹ thuật kiểm tra - Hộp đen, hộp trắng vv được quyết định thực hiện một cách phù hợp.
- Các thử nghiệm được Tự động hóa được xác định và làm việc.
- Cách báo cáo lỗi, các vấn đề về khả năng sử dụng, trạng thái được lưu giữ như là các mẫu sẵn sàng và được xem xét về tính chính xác.


#### Thủ tục
**Trình tự theo quan điểm của Tester:**
- Thu thập và xem xét các yêu cầu chức năng từ tất cả các tài liệu có thể có.
- Clear spec sớm nhất về các yêu cầu chức năng.
- Thiết kế Kế hoạch thử nghiệm Alpha và xem xét nó cho đầy đủ, đúng đắn.
- Thiết kế thử nghiệm Alpha cho các tính năng được xác định - Để nó trở thành một công cụ toàn diện và chính xác.
- Xem xét Thử nghiệm Alpha để biết mức độ phù hợp , sự cần thiết, truy xuất nguồn gốc.
- Xác định Alpha test cho mỗi chu kỳ kiểm tra.

- **Cycle-wise:**

    - Thực thi Alpha Tests khi phiên bản Alpha của sản phẩm có sẵn để kiểm tra.
    - Log các bugs - Cả functional và UI.
    - Retest lại các bug sau khi đã fix.


**Tiêu chí để bắt đầu thử nghiệm alpha:**
- Yêu cầu tài liệu đặc điểm kỹ thuật nên được fixed và không sửa đổi.
- System Testing nên được hoàn thành và sign-off nếu Alpha Testing bắt đầu
- System Testing nên được hoàn thành70% - 90% và đảm bảo để tiếp tục thử nghiệm Alpha.
- Những người tham gia cần được xác định và đào tạo cho sản phẩm (nếu họ mới sử dụng sản phẩm).
- Alpha Testing phải được design và review.
- Hoàn thành cho tất cả các chức năng yêu cầu.
- Môi trường thử nghiệm nên được thiết lập và có sự ổn định.
- Bản build cho phiên bản Alpha của sản phẩm phải sẵn sàng  với Ghi chú cho bản release đầy đủ.


**Tiêu chí để kết thúc thử nghiệm alpha:**
- Tất cả các bug chức năng lớn cần được sửa.
- Tất cả các test cycles ( chu kỳ kiểm thử) phải được hoàn thành.
- Tất cả các Thử nghiệm Alpha được xác định để test phải được thực hiện và pass.
- Các tính năng được fixed ở cuối  Alpha test (nghĩa là không có các tính năng bổ sung, không có sửa đổi đối với các đối tượng hiện có, không làm giảm các tính năng hiện có).
- Báo cáo tóm tắt thử nghiệm alpha.
- Alpha Test chính thức Sign-Off để chuyển sang Beta Testing


#### Lợi ích của Alpha Testing
Có một số lợi ích của thử nghiệm này. Một vài trong số đó được đưa ra dưới đây:

**Nội bộ,**

- Một team hay tổ chức tiếp xúc với sản phẩm sớm để trải nghiệm và tận dụng nó.
- Nó giúp để đạt được sự tự tin trong sản phẩm và đem dĩ nhiễn sẽ đem đến sự tự cho bản Beta testing ngay sau đó.
- Những sai lầm và thiệt hại có thể tránh được trước khi ra mắt sản phẩm với lượng end-users trên thị trường rộng hơn.
- Giúp chúng ta hiểu thêm về các yếu tố tác động đến việc realse thành công sản phẩm.

#### Kết luận
Việc sử dụng Thử nghiệm alpha ở giai đoạn đầu trong Vòng đời phát triển phần mềm cung cấp một cái nhìn sâu sắc hơn về sản phẩm. Nó luôn giúp chúng ta có thêm quan điểm và trải nghiệm của người dùng khi sử dụng sản phẩm.

Thực hiện thử nghiệm alpha một cách  nghiêm túc giúp đạt được mục tiêu của nó thành công và có sự hài lòng từ khách hàng. Tôi hy vọng bài viết này sẽ cung cấp cho bạn thông tin bổ sung về Thử nghiệm alpha.

*Bài viết được tham khảo tại: https://www.softwaretestinghelp.com/alpha-testing/*