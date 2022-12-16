Nhiều team thường bỏ qua môi trường staging khi phát triển ứng dụng. Họ thường submit một pull request (PR), chạy test bằng CI, merge vào master và rồi deploy lên production. Đây là một quy trình khá nguy hiểm vì không có việc test tích hợp nào được thực hiện. Tệ hơn nữa là nếu có lỗi thì họ tiếp cận bằng cách fix trực tiếp ở môi trường production.

Trong bài viết này, chúng ta sẽ cùng thảo luận về lợi ích của việc sử dụng môi trường staging trong vòng đời phát triển phần mềm, và cách chúng góp phẩn đảm bảo rằng sản phẩm sẽ được deliver đến production đúng như mong đợi.

### I. Môi trường staging là gì?

Môi trường staging là môi trường mà bạn deploy trong quá trình phát triển phần mềm. Bạn deploy đến môi trường staging trước khi deploy lên production.

Môi trường staging thường giống hệt môi trường production. Điều này có nghĩa là chúng có cùng phần cứng, phần mềm và config, tóm lại là càng giống thì giá trị của staging càng cao.

Mức độ giống nhau giữa staging và production đảm bảo rằng việc test trên môi trường staging sẽ phả ánh đúng những gì xảy ra trên production với cùng điều kiện.

Không như môi trường phát triển hoặc tích hợp, môi trường staging sử dụng cùng service back-end cũng như các service khác. Chúng có cùng kiến trúc, cùng một kiểu scale, và các thông số cấu hình.

Tùy vào các nhân tố quy định (chẳng hạn yêu cầu GDPR) và khả năng che giấu dữ liệu của tổ chức, môi trường staging thường ẩn danh hoặc là bộ dữ liệu hoàn chỉnh của production để gần hơn với môi trường production trong thế giới thực. Điều này có nghĩa là môi trường staging không được release hoặc open cho người dùng ở production, mà nó chỉ sẵn có ở nội bộ tổ chức hoặc một số lượng người dùng nhỏ.

Để kiểm soát chi phí, bạn có thể deploy môi trường staging như một phần của vòng đời release và phá bỏ sau khi release được chuyển đến production.

Phương thức này cho bạn khả năng để phát hiện vấn đề về code quality, vấn đề dữ liệu ở mức cao, vấn đề về tích hợp và các vấn đề liên quan mà không thể đơn giản được thể hiện ở môi trường test tích hợp hoặc môi trường thấp hơn như development hoặc local.

Phương thức này cũng cho phép bạn dự đoán ở mức chính xác cao, rằng việc deploy lên production có thành công hay không, cũng như trả lời các câu hỏi dạng "service mới thêm vào có hoạt động trên production hay không?"...

Làm việc với môi trường staging buộc bạn phải kiểm tra tất cả các giả định mà bạn đưa ra trong quá trình phát triển và đảm báo rằng bạn đã xử lý để chắc chắn để deploy thành công.

![](https://images.viblo.asia/919f1d72-6139-441a-bfae-7cd3ebc52698.png)

### II. Nguy cơ của việc deploy mà không có staging

Việc test ở local hoặc chạy unit test không phải là một cách tốt để kiểm trả chất lượng và chức năng sản phẩm. Unit test được viết bởi người, mà người thì luôn có thể mắc lỗi. Nếu bạn chỉ test những vấn đề đã biết trước, thì bạn không thể cover những vấn đề mà bạn không biết.

Người ta thường quên rằng việc thay đổi có thể ảnh hưởng đến các service khác hoặc chức năng khác. Đôi lúc một thư việc bạn sử dụng ở local có thể không hoạt động được ở cloud, và chỉ khi deploy lên production thì bạn mới phát hiện.

Thông thường thì bộ dữ liệu dùng để test ở môi trường cấp thấp đều là giả định về những cái ở production. Một số người nghĩ rằng staging là không cần thiết vì lỗi sẽ được phát hiện sớm, nhưng rõ ràng bạn đang khiến user gặp bug và lỗi cấu hình.

>> Nói chung, việc thay đổi có thể ảnh hưởng dữ liệu ở production, và có thể ảnh hưởng đến cả các service liên quan.

Dựa vào niềm tin và hy vọng như một cách để đảm bảo deploy lên production thành công chắc chắn sẽ có nguy cơ tạo ra nhận thức tiêu cực về chất lượng sản phẩm của bạn và cuối cùng dẫn đến mất doanh số, mất khách hàng và có thể vi phạm điều khoản hợp đồng với khách hàng của bạn.

Chi phí liên quan đến việc deploy hoặc code lỗi bao gồm:
* Phải hotfix
* Rollback release
* Ảnh hưởng đến schedule
* Khả năng mất dữ liệu
* Ảnh hưởng đến người dùng
* Vi phạm hợp đồng
* Rủi ra danh tiếng / thương hiệu
* Mất doanh thu
* Mất khách hàng

Lợi ích bạn nhận được từ việc sử dụng môi trường staging là mức độ đảm bảo chất lượng cao hơn và sự hài lòng của khách hàng. Ngoài ra, bằng cách giảm tác động hoặc số lỗi trong sản phẩm, bạn có thể tiết kiệm rất nhiều chi phí. Ví dụ: bạn có thể giảm lượng thời gian bạn phải bỏ ra để rollback, hoặc giảm thời gian cung cấp các hotfix kịp thời mà có thể ảnh hưởng đến chu kỳ phát triển. Bạn cũng tiết kiệm chi phí cho các sự cố có thể xảy ra trong quá trình sản xuất và thời gian trả lời các câu hỏi của người dùng hoặc viết báo cáo lỗi.

### III. Ba kịch bản thế giới thực
Hãy cùng điểm qua một số kịch bản tiềm tàng có thể tránh được nếu bạn sử dụng môi trường staging. Chúng tôi đang phát triển một ứng dụng gọi là Bitcoin Price Index. Đây là một ứng dụng React đơn giản, kết nối người dùng với CoinDesk API để cung cấp thông tin về xu hướng giá của bitcoin dựa theo đơn vị tiền tệ được lựa chọn.

#### 1. Sai service URLs
Ở kịch bản đầu tiên, trong khi phát triển ở môi trường cấp thấp (local/development), chúng tôi trỏ ứng dụng đến một mock service của CoinDesk API để giảm chi phí và lưu lượng. URL này nên trỏ đến CoinDesk API thực tế trước khi deploy lên production.

![](https://images.viblo.asia/a8b25f38-86ca-458c-b875-45c3d05e6bf5.png)

Như bạn thấy, mock URL bằng cách nào đó đã lẫn vào trong code.

Thay đổi này làm việc trơn tru ở môi trường dev. Trong môi trường staging, service liên quan không nên ở đó, và sự thay đổi này nên được bắt lỗi trước khi lên production.

*Đây là giá trị cơ bản của môi trường staging: giữ các thay đổi không apply trực tiếp lên production bằng cách cung cấp một môi trường để test và validate.*

#### 2. Lỗi ở source control và review
Hãy xem một ví dụ khác: 2 developer commit chức năng mới mà có cùng file, nhưng khác ở dòng CSS. Ở mỗi nhánh riêng của developer, style và sản phẩm đúng như mong đợi.

Thay đổi được merge và deploy lên production.

Tuy nhiên, khi mỗi developer tạo pull request để merge vào development, style bị chèn lẫn sẽ không được show ra trong quá trình review vì chúng nằm ở 2 pull khác nhau. Chúng được merge sai và deploy lên production. Kết quả là sản phẩm có một trạng thái không mong muốn.


#### 3. Các service liên quan
Cuối cùng, hãy cùng đào sâu vào một phát biểu quen thuộc của developer: "nó chạy trên máy em"

Ở đây một developer thêm imagemagick đến stack để xử lý ảnh upload. Những thư viện npm liên quan đến imagemagick được cài đặt và lưu vào package.json, nhưng "imagemagick-cli" chỉ được cài ở máy developer.

Vậy nên khi test ở local thì chức năng hoạt động chính xác, nhưng khi đẩy lên production thì không.

```*Error: Command failed: CreateProcessW: The system cannot find the file specified*```

Không có môi trường staging, những kiểu vấn đề như thế này sẽ rất dễ xảy ra.

Thực tế là  tất cả những ví dụ này đều là những sai lầm hoàn toàn có thể phòng tránh được. Những sai lầm này luôn luôn xảy ra, và có thể không bị bắt trước khi lên production nếu không có một môi trường staging. Khi ứng dụng của bạn trở nên phức tạp, tiềm năng cho các loại lỗi này cũng tăng theo cấp số nhân.

Sử dụng một môi trường staging như một phần của vòng đời deploy có thể giảm nguy cơ xảy ra những lỗi này.

### IV. Môi trường staging không cần phức tạp
Một lý do thường thấy để không sử dụng staging là chúng phức tạp hoặc tốn chi phí. Có một sự thật là nó thêm chi phí, và devops trở nên tốn kém, và môi trường staging rất khó để cài đặt như môi trường production. Tuy nhiên, nó không cần thiết phải như thế.

Các cloud platform hiện đại cho phép bạn sử dụng staging khi cần, và tự động quá trình deploy. Chúng giúp bạn tránh được những lỗi mà ảnh hưởng đến production.

Một cách khác là tự động deploy lên staging bao gồm các chỉ thị về infra và ảo hóa như Kubernetes.

Nếu không có quy trình tự động, ta cũng có thể sử dụng máy móc giống với production để deploy thủ công.

Điều cuối cùng, sử dụng staging giúp bạn nắm bắt được các phương thức phát triển phần mềm hiện đại để cải thiện năng suất của team. Quan trọng hơn, nó giúp cải thiện chất lượng sản phẩm bạn gửi đến cho khách hàng.

Tham khảo: https://hackernoon.com/staging-environments-are-overlooked-heres-why-they-matter-5jp2gm0