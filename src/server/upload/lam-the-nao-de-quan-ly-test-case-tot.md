Sau một thời gian dài làm việc trong dự án, kho lưu trữ test case dự án của bạn có thể dễ dàng lớn lên và chứa đầy các test case quá cũ hoặc vô nghĩa nếu không được quản lý thường xuyên. 
Một số test case như vậy sẽ được thực hiện bởi QA, được báo cáo là `failed` và sau đó bị đóng bởi PO, điều này dẫn đến một sự lãng phí không cần thiết về thời gian và tài nguyên. 
Một test case được viết từ một user story, qua một vài sprint, một user story mới sẽ thay đổi quy trình làm việc hoặc chức năng và thế là một test case mới sẽ được viết. 
Nếu test case trước đó không được cập nhật hoặc xóa, nó có thể gây ra một vòng nhầm lẫn từ QA đến Dev sang đến sản phẩm cuối.

Để giúp tránh tình trạng này, tôi sẽ cung cấp một số mẹo để quản lý hiệu quả các test case này trong một môi trường agile. Bằng cách chủ động quản lý test case nhanh trong mỗi sprint, nhóm QA sẽ tránh việc vô tình thực hiện các test case vô nghĩa và tránh gửi các lỗi không hợp lệ, do đó tạo ra một quy trình hiệu quả hơn để đảm bảo test coverage.

![](https://images.viblo.asia/0292bb22-2916-44f9-90bf-f10f0138313a.png)

## 1. Các vấn đề khi quản lý test case Agile

![](https://images.viblo.asia/d5e5debc-b802-4ead-927e-c2b944f4e753.jpg)

Một trong những sai lầm lớn nhất mà nhóm QA có thể mắc phải là để tất cả các test case vào một chỗ để sử dụng cho regression. Tôi đã thấy điều này được thực hiện rất nhiều, điều này không chỉ thêm các test case vô nghĩa vào bộ test regression, mà còn tăng đáng kể các yêu cầu đặt ra đối với việc quản lý các test case trong tương lai.

**Đây là lý do**: 
- Điều thường xảy ra là một tester tạo ra các test case từ một user story trong một sprint. Các test case là hợp lệ và cần thiết để test trong sprint đó, nhưng vào cuối sprint, các test case sẽ được chuyển vào một nơi để chứa tất cả các test case từ tất cả các sprint trước đó. Các test case chồng chất và khi đến lúc phải thực hiện regression hoàn toàn, nhóm phát hiện ra một số lượng lớn các test case, bao gồm các test case trùng lặp và test không hợp lệ. 
- Thông thường, để thực hiện regression đầy đủ là nhóm phải sàng lọc tất cả các test để tìm ra cái nào sẽ thực hiện. Thực hiện các test case sai tại thời điểm này là một kẻ thù với năng suất và sẽ kéo dài thời gian cần thiết để hoàn thành regression. 
- Điều cuối cùng QA muốn là trì hoãn việc release vì chúng không được chuẩn bị đầy đủ tài liệu để hoàn thành test regression.

## 2. Giải pháp quản lý các test case Agile

![](https://images.viblo.asia/09e5161c-05d0-4dcc-b8d3-1d409bda446a.jpg)

Giải pháp thực sự đơn giản, nó chỉ đòi hỏi một mức độ chủ động, để ngăn chặn team tranh giành để cập nhật các test case regression tại thời điểm regression. 
- Đặt lịch trong mỗi sprint để quản lý các test case regression. 
- Các thay đổi cho mỗi user story sẽ thuộc một hoặc nhiều trong bốn loại (Add Tests, Update Tests,Remove Tests, Do Nothing)
 ==>  Đánh giá từng user story và các test được tạo, sau đó quyết định danh mục nào cho các test thuộc vào user story. Có thể một user story sẽ yêu cầu các test được thêm vào, cập nhật và xóa cùng một lúc.

### Add Tests 

- Nếu function chính được giới thiệu, các test được tạo cho test sprint nên được thêm vào bộ regression. Điều này có thể bao gồm thêm test vào bộ  smoke test hoặc sanity test . Ở nơi test case được thêm vào sẽ được xác định bởi tầm quan trọng của function. 
- Nếu đó là một funtion hight level mà phần lớn người dùng sẽ sử dụng, thì nó nên được thêm vào cả regression và smoke/sanity test. 
- Thêm một test thường được thực hiện theo mặc định sẽ gây ra các vấn đề tôi đã đề cập ở trên. Hãy chắc chắn rằng test nên được thêm vào regression để tránh trùng lặp.

### Update test

- Trong trường hợp một business được cập nhật, Ví dụ, không có thay đổi đáng kể nào được thực hiện đối với chức năng, không cần thiết phải tạo các test mới. Chỉ cần chỉnh sửa các test để phù hợp với business mới là đủ và trong trường hợp này, các test cho chức năng này trong bộ regression nên được kéo vào sprint và cập nhật để phù hợp với quy trình hoặc hành vi mới. 
- Nếu tác giả test case chỉ đơn giản là viết một test mới thay vì cập nhật test trước đó, thì bạn có một test case trùng lặp/vô nghĩa trong regression. Nếu điều này xảy ra lặp đi lặp lại, bạn đột nhiên bị đau đầu khi bạn bắt đầu test regression. Hãy nhớ cập nhật test case hiện có trước khi kéo nó vào sprint test plan và original  test nên được cập nhật vào sprint.

### Remove Tests

- Một số user story chỉ cần yêu cầu xóa một tính năng không còn được sử dụng. Điều này dẫn đến nội dung đã được test trước đây không còn phù hợp. Khi nói đến việc cập nhật các test case, điều quan trọng là phải loại bỏ các chi tiết không cần thiết cũng như thêm các trường hợp mới liên quan. 
- Nếu một new tester, họ sẽ không có kiến thức trước đó về lịch sử của sản phẩm. Khi người test được chỉ định một tập hợp các test case regression đã vô nghĩa, họ sẽ khai các lỗi không hợp lệ. Điều này làm lãng phí thời gian của người test mà họ mới join vào/
- Một lỗi không hợp lệ biến thành một sự lãng phí tài nguyên không cần thiết. Tất cả có thể tránh được bằng cách loại bỏ test case khi nó không còn hiệu lực.

### Do Nothing

- Những user story chỉ cần điều chỉnh một hình ảnh, bảng màu hoặc văn bản nên có các test case được tạo trong test sprint. Những test không thuộc về bộ regression. Chúng là các test hợp lệ và có thể cần được thực thi mỗi khi phần mềm được triển khai sang môi trường mới, nhưng sau đó chúng nên được đặt sang một bên. Các yếu tố thay đổi thường xuyên và rất khó gặp phải trừ khi user story khác được tạo ra, không thích hợp trong test regression hoặc smoke/sanity test. Trong trường hợp này, sau khi chạy sprint hoàn thành và thay đổi trong quá trình làm, hãy để các test này trong thư mục chạy sprint cho mục đích ghi nhớ.

## 3. Phần kết luận

- Chìa khóa cho kho test case luôn luôn cập nhật là tính chủ động. Cập nhật nó thường xuyên như user story được giải quyết. Với kho test case được sắp xếp tốt, tester có thể dễ dàng thêm vào các dự án. 
- Bạn đã bao giờ muốn đưa một người test từ một dự án khác nhưng không muốn dành thời gian đào tạo họ? Test case cập nhật mới sẽ giúp traning cho bạn. Chỉ định một thành viên nhóm mới cho một tập hợp các test case hợp lệ và họ sẽ hiểu biết sản phẩm tiếp theo không mất thời gian.
-  Mặt khác, nếu bạn gán nhầm một new tester trong nhóm các test case vô nghĩa với kết quả dự kiến sai, sẽ không có gì ngoài sự nhầm lẫn và lãng phí thời gian. Khi nói đến các test case, một công việc nhỏ trong mỗi lần chạy sprint giúp tiết kiệm rất nhiều công việc trên đoạn đường dài.

## 4. Tham khảo

- [Agile Test Case Management – Keeping Your Test Cases Lean](https://blog.testlodge.com/agile-test-case-management/)