## Các loại kiểm thử phần mềm phổ biến tester cần biết  

“Kiểm thử”- chỉ 2 từ nhưng nó thực ra rất rộng lớn và phức tạp. Tùy theo nhu cầu và mục đích cụ thể, chúng ta sẽ có những loại kiểm thử khác nhau. Trong bài viết này các bạn sẽ hiểu được các loại kiểm thử phần mềm, mục đích sử dụng của từng loại cũng như giá trị của chúng.



### 1. Kiểm thử cài đặt (Installation testing)

Kiểm thử cài đặt, như tên gọi của nó, thường sẽ xoay quanh việc cài đặt, tháo gỡ các ứng dụng trên các môi trường khác nhau.

Kiểm thử cài đặt đóng vài trò rất rất rất quan trọng. Vì sao? Vì nếu sản phẩm của bạn cần phải cài đặt để có thể hoạt động và giả sử người dùng không thể cài đặt (hay có lỗi ở phần cài đặt) thì hậu quả là….chẳng ai sử dụng được sản phẩm của bạn.

Khi nào sử dụng kiểm thử cài đặt?

Bạn nên bắt đầu hoạt động kiểm thử cài đặt càng sớm càng tốt và nếu sản phẩm của bạn cần phải cài đặt thì bạn nên tập trung nhiều vào phần này.

Các câu hỏi trong khi kiểm thử cài đặt:

Ứng dụng có thể cài đặt thành công trên [bạn điền môi trường test của bạn như PC (Windows, Linux), Mobile (Android, iOS)]?
Các bước cài đặt/tháo dỡ có dễ dàng tường minh hay không?
Sản phẩm có thể cài đặt tháo dỡ thành công trên [bạn điền môi trường test của bạn như PC (Windows, Linux), Mobile (Android, iOS)]?
Sản phẩm có thể cài đặt trên những thư mục khác nhau không?
Sản phẩm sau khi tháo gỡ còn sót file hoặc folder nào không?
Sản phẩm có thể cài đặt từ CD/DVD?
Người dùng có thể cập nhật, nâng cấp ứng dụng đã cài đặt? 
### 2. Kiểm thử “khói” (Smoke test)

Thuật ngữ smoke test được bắt đầu trong ngành điện tử, phần cứng. Đây là hoạt động kiểm thử đầu tiên cần phải thực hiện khi kỹ sư bật công tắc hay cắm nguồn điện để xem….có “khói bốc lên cao hay không”. Nếu không có khói (nghĩa là sản phẩm ok để test tiếp), nếu có khói (sản phẩm đã chết) thì phải sửa ngay tức khắc.

Tương tự, trong phát triển phần mềm thì smoke test là loại test nhằm đánh giá xem sản phẩm, build được xây dựng bởi dev có lỗi gì nghiêm trọng hay không để có thể tiếp tục các hoạt động khác.

Loại kiểm thử này chỉ nhằm mục đích đánh giá sơ khởi xem build nhận được có ok để test tiếp hay không. Lí do ta phải sử dụng smoke test là việc phát hiện sớm những lỗi quan trọng sẽ giúp tránh lãng phí khi chúng ta dành thời gian cho những hoạt đông kiểm thử khác.

Smoke test (một số nơi có thể gọi là sanity test, build validation test, build acceptance test) thường là một bộ kiểm thử đơn giản và chứa một số các test case cơ bản đi qua những tính năng quan trọng nhất của sản phẩm. Khi bạn làm việc với sản phẩm bạn sẽ phải biết được những tính năng nào là quan trọng nhất (nghĩa là những tính năng này là giá trị gốc, là sống còn đối với sản phẩm hoặc công ty). Nếu bạn vẫn chưa biết thì tốt nhất là tìm hiểu hoặc hỏi ngay.

Khi nào nên sử dụng kiểm thử “khói”?

Khi dev giao build cho đội test thì việc trước tiên là thực thi bộ smoke test này. Bộ smoke test thường nhỏ nên bạn sẽ thường mất khoảng 1-2 giờ để thực thi. Nếu build fail, bạn báo ngay cho sếp, developer hoặc các bên liên quan để đánh giá tình hình. Trả build về và không nên test tiếp những tính năng khác.

### 3. Kiểm thử tương thích (Compatability test)

Đây là kiểu kiểm thử nhằm mục đích đánh giá sự tương thích giữa ứng dụng với các môi trường, nền tảng khác nhau. Loại kiểm thử này quan trọng vì ngày nay ngày càng xuất hiện nhiều nền tảng công nghệ, hệ điều hành, trình duyệt khác nhau và người dùng luôn mong đợi sản phẩm của họ phải hoạt động tốt trên các môi trường khác nhau này.

Các hoạt động kiểm thử tương thích thường áp dụng cho:

Các trình duyệt web khác nhau như Chrome, FireFox, Safari và các version khác nhau của từng loại
Các hệ điều hành khác nhau như Windows, Linux, Mac OS và các version khác nhau của từng loại
Các nền tảng khác nhau như PC, Mobile, Desktop, Laptop
Dĩ nhiên, tùy theo đặc thù của ứng dụng mà có những loại kiểm thử tương thích cụ thể như kiểm thử tương thích cho các mạng viễn thông khác nhau, kiểm thử tương thích cho các ngôn ngữ chuyển đổi, kiểm thử tương thích cho loại người dùng khác nhau, v.v. Lời khuyên là bạn hãy tìm hiểu về người dùng cuối của sản phẩm như thị hiếu, thói quen, môi trường để từ đó xác định loại kiểm thử tương thích tương ứng.

Tuy nhiên, kiểm thử tương thích cũng có những khó khăn riêng của nó trong đó nổi bật là 2 khó khăn sau:

Chuẩn bị cho môi trường test: Việc phải kiểm thử trên nhiều môi trường test khác nhau sẽ khiến việc chuẩn bị, setup gặp nhiều khó khăn về mặt chi phí, thời gian, kỹ thuật. Giải pháp là có thể sử dụng máy ảo để hỗ trợ việc chuẩn bị môi trường nhanh hơn hoặc các dịch vụ cung cấp các browser có sẵn.
Độ bao phủ kiểm thử rất rất lớn. Giả sử bạn có 500 test case cần phải thực thi và bạn phải chạy 500 test case này trên các trình duyệt Chrome, FireFox, Safari, IE và mỗi trình duyệt lại có những version khác nhau. Bạn tự nhân và có thể thấy khối lượng test case cần phải chạy là “khổng lồ”. Giải pháp là giảm số lượng môi trường test hoặc tăng nguồn nhân lực hoặc cũng có thể tự động hóa bộ kiểm thử để giảm thời gian thực thi.
### 4. Kiểm thử hồi quy (Regression test)

Đây có thể được coi là loại test phổ biến nhất và hầu hết tester đều biết qua loại test này.

Kiểm thử hồi qui nhằm mục đích kiểm tra xem những thay đổi trong một build ở một tính năng (như thêm mới tính năng, thay đổi một tính năng, sửa lỗi) không làm ảnh hưởng đến những tính năng khác hay tạo thêm lỗi mới.

Loại kiểm thử này quan trọng và gần như là không thể thiếu trong hoạt động kiểm thử vì chúng ta không thể (hoặc khó) đoán được liệu những thay đổi dù là nhỏ nhất có thể ảnh hưởng đến những module khác hay không. Dĩ nhiên một số thay đổi có thể đoán được, một số thay đổi thì không. Do đó việc chạy hồi qui được coi là giải pháp an toàn nhất.

Kiểm thử hồi qui được thực thi như sau:

Giả sử bạn có 1000 test case cho toàn bộ sản phẩm của bạn, sau khi developer đưa ra 1 build mới, bạn phải thực thi toàn bộ 1000 test case này trên buiild mới và cứ mỗi lần ra build mới bạn sẽ phải thực thi lại 1000 test case này.

Những khó khăn thường gặp phải đối với loại kiểm thử này? Do phải thực thi với số lượng lớn test case sau mỗi đợt build nên kiểm thử hồi qui thường tốn kém (thời gian, nhân lực) và “boring”. Giải pháp cho vấn đề này thường thì kiểm thử hồi qui được tự động hóa để tăng độ bao phủ hay có thể giảm số lượng trường hợp kiểm thử (chỉ chọn những trường hợp quan trọng) hoặc có thể tăng nhân lực. Còn tùy những điều kiện khác nhau sẽ quyết định giải pháp nào là phù hợp.

### 5. Kiểm thử nghiệm thu (Acceptance test)

Kiểm thử nghiệm thu là loại kiểm thử được thực hiện bởi khách hàng hay chủ sản phẩm để đánh giá chất lượng của sản phẩm liệu xem có chấp nhận sản phẩm hay không. Loại kiểm thử này thường thấy ở các dự án outsource.

Bộ kiểm thử nghiệm thu thường chứa những test case cơ bản quan trọng của sản phẩm và thường được thực thi độc lập bởi khách hàng hoặc một bên thứ 3. Trong thực tế, một số dự án thì kiểm thử nghiệm thu cũng thường được sử dụng như là kiểm thử smoke test để đánh giá build từ developer để xem có chấp nhận để có thể test tiếp hay không.

### 6. Kiểm thử hiệu năng

Kiểm thử hiệu năng là một loại hình kiểm thử nhằm đánh giá khả năng hoạt động của hệ thống cũng như độ ổn định của hệ thống. Có 2 loại test cơ bản trong kiểm thử hiệu năng:

Stress test: Là một dạng của kiểm thử hiệu năng trong đó hệ thống được đẩy lên ngưỡng cao nhất đến khi nào hệ thống “die” thì thôi. Mục đích là tìm được ngưỡng của hệ thống.
Load test: Kiểm thử chịu tải là loại kiểm thử nhằm đánh giá xem liệu hệ thống có thể hoat động khi hoạt động dưới 1 lượng tải nhất định (thường là lượng user truy cập)
Loại test này cực kỳ quan trọng vì nó giúp chúng ta đánh giá được khả năng chịu tải của hệ thống của mình tới đâu để có kế hoạch nâng cấp, sửa chữa kịp thời. Loại kiểm thử này thường được áp dụng trên những hệ thống đòi hỏi load dữ liệu lớn hay số lượng truy cập lớn mà việc tải chậm, chập chờn hoặc ngưng trệ có thể ảnh hưởng đến sự sống còn của sản phẩm. Loại test này thường được áp dụng cho các website hoặc ứng dụng thương mại điện tử, tin tức, v.v

Một số tool hỗ trợ cho loại test này như LoadUI, JMeter, LoadComplete.