Bài đăng này giúp bạn học và tìm hiểu về Pilot testing, mục tiêu của nó cũng như các bước thực hiện, so sánh với các loại kiểm thử khác,...

Pilot Testing là một loại Kiểm thử phần mềm được thực hiện bởi một nhóm người dùng cuối trước khi triển khai phần mềm ra thị trường.

1 số chức năng nhỏ hoặc toàn bộ hệ thống sẽ được cài đặt ở giai đoạn cuối để khách hàng thực hiện test. Ở giai đoạn này, khách hàng sẽ thực hiện thử nghiệm liên tục và thường xuyên trong thời gian thực để tìm ra lỗi.

Nhóm người dùng cuối sau khi thực hiện kiểm thử sẽ cung cấp danh sách lỗi cho nhà phát triển để sửa trong bản phát hành tiếp theo. Điều này cho phép người dùng tìm ra lỗi trước khi nó đi lên môi trường Production. Vì được kiểm thử ở thời gian thực nên loại thử nghiệm này còn được gọi là bản sao của môi trường thực hay bản xác minh trước khi hệ thống được đưa vào sử dụng. 

## Pilot Testing là gì 

Pilot Testing là giai đoạn nằm giữa UAT (User Acceptance Test ) và Deploy lên Production. Mục đích của việc thực hiện thử nghiệm này là xác định chi phí, rủi ro, tính khả thi, thời gian và hiệu quả của dự án.

![](https://images.viblo.asia/3116a0b5-5f4a-4900-bc85-ccb1dbefb1e1.png)
## Mục tiêu của Pilot Testing 

Để xác định chi phí dự án, tính khả thi, rủi ro, thời gian, v.v.

Để kết luận cho sự thành công hay thất bại của phần mềm.

Để xác định hành vi của người dùng cuối.

Để tạo cơ hội cho các lập trình viên sửa lỗi.


### Vì sao Pilot Testing lại quan trọng ? 

Pilot Testing rất quan trọng vì nó đóng vai trò : 

Quyết định rằng phần mềm đã sẵn sàng để đưa vào sử dụng hay chưa.

Phát hiện lỗi của phần mềm.

Các quy trình kiểm tra được tuân thủ.

Đưa ra quyết định về việc phân bổ thời gian và nguồn lực.

Kiểm tra phản hồi của người dùng cuối

Là thông tin phản ánh về tiến độ tổng thể của dự án. 


Ví dụ về Pilot Testing : 

Microsoft chạy Windows Insider Programs cho Windows 10 Pilot testing.

Google: Để Pilot Testing Hệ điều hành Android cho người dùng Nexus, Google chạy Chương trình Android Beta.

## Các bước để thực hiện thử nghiệm thí điểm
Quá trình Pilot Testing bao gồm 5 bước:

1. Lập kế hoạch cho quá trình Pilot Testing

2. Chuẩn bị cho Pilot Testing
3. Deploy và Test
4. Đánh giá
5. Deploy lên Production

Cùng phân tích các bước được liệt kê ở trên : 

**1) Lập kế hoạch**: Bước cụ thể đầu tiên là lập kế hoạch cho các quy trình thử nghiệm sẽ được tuân theo. Kế hoạch này sau khi được lập và phê duyệt sẽ được tiếp tục thực hiện sau đó và tất cả các hoạt động sẽ chỉ tuân theo kế hoạch này.

**2) Chuẩn bị**:  Khi kế hoạch được hoàn thành, bước tiếp theo là chuẩn bị cho thử nghiệm, tức là phần mềm sẽ được cài đặt cho phía khách hàng, lựa chọn đội thực hiện các thử nghiệm, đối chiếu dữ liệu cần thiết cho thử nghiệm. Trước khi thử nghiệm bắt đầu, tất cả các môi trường thử nghiệm phải sẵn sàng.

**3) Deploy và test**: Sau khi chuẩn bị xong, việc Deploy phần mềm sẽ được thực hiện tại cơ sở của khách hàng. Thử nghiệm được thực hiện bởi một nhóm người dùng cuối được chọn trước đó, những người được coi như là những đối tượng khách hàng mà sản phẩm muốn nhắm tới.

**4) Đánh giá:** Sau khi hoàn tất việc triển khai, thử nghiệm sẽ được thực hiện và đánh giá bởi nhóm người dùng cuối, những người sẽ kết luận tình trạng của phần mềm. Họ tạo một báo cáo và gửi các lỗi cần sửa cho các nhà phát triển để sửa trong lần triển khai tiếp theo. Dựa trên đánh giá của họ, việc triển khai thêm trong sản xuất có được thực hiện hay không sẽ được quyết định.

**5) Triển khai sản xuất**: Việc triển khai sản xuất chỉ được thực hiện nếu kết quả đánh giá của người dùng cuối giống như sự mong đợi của người dùng về sản phẩm, tức là đáp ứng được yêu cầu của khách hàng.


## Các điểm cần suy nghĩ trong Pilot Testing:

Để thực hiện loại kiểm thử này, cần phải xem xét và lưu ý một số điểm dưới đây:

**1) Môi trường thử nghiệm**: Việc thiết lập môi trường thử nghiệm thích hợp đóng một vai trò quan trọng.  Thử nghiệm này yêu cầu một môi trường thời gian thực mà người dùng cuối sẽ thực sự phải đối mặt. Mọi thứ cần được bảo đảm, bao gồm cả phần cứng / phần mềm được sử dụng và cài đặt.

**2) Nhóm người thử nghiệm**: Để thực hiện loại thử nghiệm này, việc chọn nhóm người thử nghiệm làm đối tượng mục tiêu là rất quan trọng vì người thử nghiệm phải đại diện cho đối tượng người dùng được nhắm tới và nếu không được chọn đúng có thể dẫn đến kết quả không chính xác. Những người thử nghiệm cũng cần được đào tạo thích hợp để có hiệu quả tốt.

**3) Lập kế hoạch phù hợp**: Đối với bất kỳ dự án thành công nào, việc lập kế hoạch là rất quan trọng ngay từ giai đoạn đầu. Các kịch bản kiểm tra yêu cầu về tài nguyên, thời gian, phần cứng và phần mềm, ngân sách, việc triển khai máy chủ, mọi thứ đều phải được lên kế hoạch tốt.

Các tiêu chí đánh giá cho Pilot testing nên được lập kế hoạch như số lượng người dùng đã tham gia, số lượng người dùng hài lòng / không hài lòng, các yêu cầu hỗ trợ và cuộc gọi, v.v.

**4) Tài liệu**: Tất cả các tài liệu cần thiết phải được chuẩn bị và chia sẻ giữa các bên liên quan. Quá trình cài đặt phải được ghi lại đúng cách trước khi bắt đầu thử nghiệm. Các kịch bản kiểm tra phải có sẵn cho phần mềm được kiểm tra, cùng với danh sách các chức năng sẽ được thực thi.

Danh sách các vấn đề / lỗi cần được chia sẻ với bên phát triển hoặc bên thiết kế một cách kịp thời.

## Các bước sau khi đánh giá thực hiện Pilot Testing

Khi quá trình thử nghiệm đã hoàn thành, bước tiếp theo là hoàn thiện chiến lược tiếp theo cho dự án. Đầu ra/kết quả thử nghiệm sẽ được phân tích và dựa trên đó lựa chọn kế hoạch tiếp theo.

![](https://images.viblo.asia/89c2e6ef-9aa0-4696-94db-2e5b91d7dc20.png)

- Stagger Future: Trong cách tiếp cận này, một tài nguyên mới sẽ được triển khai cho nhóm thử nghiệm.
- Khôi phục: Trong cách tiếp cận này, kế hoạch khôi phục được thực hiện, tức là nhóm thử nghiệm được đưa trở lại các cấu hình trước đó.
- Tạm dừng: Như tên cho thấy thử nghiệm này bị tạm dừng theo cách tiếp cận này.
- Vá lỗi và tiếp tục: Trong cách tiếp cận này, các bản vá được triển khai để khắc phục các sự cố hiện có và quá trình thử nghiệm được tiếp tục.
- Triển khai: Cách tiếp cận này xuất hiện khi kết quả kiểm thử đạt như mong đợi và phần mềm hoặc các chức năng đã được kiểm tra đạt yêu cầu để đưa lên môi trường Production.

## Những lợi ích của Pilot Testing : 

- Thử nghiệm cụ thể này được thực hiện từ quan điểm của người dùng, do đó, do đó biết được nhu cầu thực tế của sản phẩm.
- Giúp xử lý các lỗi trước khi đưa sản phẩm ra thị trường, dẫn đến sản phẩm có chất lượng tốt và ít sai sót hơn.
- Giúp làm cho sản phẩm / phần mềm hấp dẫn hơn đối với người dùng cuối.
- Giúp triển khai phần mềm dễ dàng và nhanh chóng hơn.
- Giúp dự đoán tỷ lệ thành công của sản phẩm.
- Giúp cho sản phẩm trở nên tốt nhất.

## Pilot Testing và Beta Testing
Bảng dưới đây liệt kê sự khác biệt giữa Pilot Testing và Thử nghiệm beta:


|STT |Pilot Testing | Beta Testing |
| -------- | -------- | -------- |
| 1   | Pilot testing được thực hiện bởi nhóm người dùng được chọn làm đại diện cho đối tượng khách hàng mà sản phẩm nhắm tới.    | Beta test được thực hiện bởi người dùng cuối     |
| 2     | Pilot testing được thực hiện trên môi trường thực     | Beta test yêu cầu thực hiện trên môi trường developement    |
| 3   |  Pilot testing được thực hiện trước khi lên môi trường Production     |Beta Test thực hiện sau khi sản phẩm được đưa lên Production
| 4     | Testing được thực hiện giữa giai đoạn UAT và deploy lên Production    | Testing thực hiện sau khi deploy sản phẩm lên Production     |
| 5     | Phản hồi được cung cấp bởi những người được chọn làm đại diện thử nghiệm    | Phản hồi được cung cấp bởi chính khách hàng hoặc end-user của họ   |
| 6| Thử nghiệm được thực hiện trên thành phần của hệ thống hoặc trên hệ thống hoàn chỉnh để xác minh tính sẵn sàng triển khai của sản phẩm.    | Thử nghiệm được thực hiện để giảm thiểu nguy cơ hỏng hóc của sản phẩm |



## Phần kết luận

Pilot Testing là một trong những loại thử nghiệm quan trọng vì nó được thực hiện trong môi trường thực bởi người dùng cuối, những người đưa ra phản hồi có giá trị để cải thiện sản phẩm. Thử nghiệm trong môi trường thực mang lại cái nhìn sâu sắc về chất lượng của sản phẩm và các lỗi có thể được tìm thấy và sửa trước khi hệ thống được đưa vào hoạt động.

Trước khi bắt đầu Pilot Testing, có một số điều cần được quan tâm như tài liệu, lựa chọn nhóm người dùng, lập kế hoạch và môi trường thử nghiệm thích hợp.

Tùy thuộc vào kết quả của thử nghiệm, chiến lược tiếp theo của sản phẩm có thể được quyết định xem có nên tiếp tục các bản sửa lỗi, tạm dừng thử nghiệm, quay trở lại cấu hình trước đó hay triển khai hệ thống trong môi trường sản xuất.