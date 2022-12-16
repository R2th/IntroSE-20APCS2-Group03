# Giới thiệu
Chất lượng của phần mềm liên quan rất nhiều đến các hướng bạn tiếp cận kiểm thử khác nhau. Khi thực hiện kiểm thử,  bạn không thể kiểm thử được hết tất cả mọi thứ, nhưng chắc chắn bạn có thể thu hẹp được phạm vi loại kiểm thử sẽ thực hiện với các yêu cầu khác nhau. Để xác định được loại test cases nào được dùng với mục đích gì, bạn cần cân nhắc tất cả các loại test cases và lọc ra những loại phù hợp nhất có thể để giúp bạn thu được sản phẩm có chất lượng cao nhất.
# Các loại kiểm thử
## 1. Functionality Test cases - Test cases Chức năng
* Test cases chức năng thường được dùng để kiểm tra xem một giao diện ứng dụng làm việc với phần còn lại của hệ thống và người dùng như thế nào. Loại kiểm thử này xác định sự thành công hay thất bại của các chức năng hệ thống ứng dụng có như mong đợi hay không.
* Loại cases này là một loại của kiểm thử hộp đen (kiểm thử dựa vào specs hoặc user story của phần mềm để kiểm thử). Với kiểm thử hộp đen, bạn được phép thực hiện kiểm thử mà không cần tiếp cận những hoạt động hoặc cấu trúc bên dưới của phần mềm. Nhóm QA thường là tác giả của test case chức năng bởi vì loại test case này thường có lỗi trong quá trình kiểm thử thông thường. Test case chức năng có thể được viết và chạy sớm nhất có thể khi đội phát triển (dev) làm xong chức năng đầu tiên có thể kiểm thử. Để có thể phát triển tốt hơn, loại case này nên được viết ngay khi dev đang viết code, nếu Tester đủ hiểu các đặc tả yêu cầu (specs) của phần mềm.
* Với những đặc điểm trên, test case chức năng nên được viết và chạy sớm nhất để nó có thể sử dụng và chạy lặp đi lặp lại khi có bất kỳ cập nhật phần mềm, để chắc chắn rằng người dùng có thể sử dụng được phần mềm
* Ví dụ: Kiểm tra xem Người dùng có thể tải ảnh thông tin cá nhân thành công.
## 2. User Interface Test cases - Test cases Giao diện người dùng
* Test case Giao diện người dùng được sử dụng để kiểm tra xác các thành phần của GUI nhìn như thế nào và có làm việc như mong đợi hay không. Loại kiểm thử này có thể xác định mâu thuẫn trong thẩm mỹ, ngữ pháp hoặc lỗi phát âm, đường dẫn hay bất kỳ thành phần nào mà Người dùng tương tác nhìn được.
* Loại case này thường được viết bởi đội kiểm thử, nhưng đội thiết kế cũng có thể tham gia  bởi vì họ là những người quen thuộc nhất với các giao diện của ứng dụn. Test case giao diện người dùng là loại kiêm thử phần mềm thường xuyên kiểm tra trình duyệt chéo. Trình duyệt thường có cách biểu diễn khác nhau, và test case giao diện người dùng hỗ trợ đảm bảo ứng dụng của bạn biểu hiện nhất quán với nhiều loại trình duyệt.
* Những cases này sẽ được thực hiện khi pha phát triển hoàn thành và UI đã được lưu vào cơ sở dữ liệu.
* Ví dụ: Chuyện gì sẽ xảy ra khi một trang web được xem ở chế độ màn hình nhỏ như điện thoại? UI có bị vỡ hay không?
## 3. Perfome Test cases - Test cases Hiệu năng
* Test cases hiệu năng xác minh xem thời gian phản hồi và tính hiệu quả tổng thể của một ứng dụng. Chính là, sau khi thực hiện một hành động (action), mất thời gian bao lâu để hệ thống có thể phản hồi được? Test case hiệu năng nên có một tập các điều kiện thành công rõ ràng trước.
* Đội kiểm thử viết những test case này một cách điển hình và chúng có thể được tự động hóa. Một ứng dụng lơn có thể có đến hàng trăm đến hàng nghìn kiểm tra hiệu năng. Tự động hóa test case hiệu năng và chạy chúng thường xuyên có thể giúp phát hiện các kịch bản ở những chỗ ứng dụng không đạt hiệu quả như yêu cầu.
* Test cases hiệu năng hỗ trợ hiểu được cách một hệ thống ứng dụng sẽ chạy như thế nào trong môi trường thực. Những cases này có thể được viết một lần khi đội kiểm thử có các yêu cầu hiệu năng từ đội sản phẩm. Tuy nhiên, nhiều phát sinh hiệu năng có thể được xác định thủ công mà không có yêu cầu đặc tả.
* Ví dụ: Hệ thống dùng bao nhiêu thời gian để nhận dạng 1 người dùng và tải được trang kế tiếp? Khi có số lượng lớn người dùng đăng nhập vào ứng dụng cùng 1 lúc, ứng dụng có hoạt động ổn định hay không?
## 4.Integration Test cases - Test cases Tích hợp
* Test cases tích hợp được sử dụng để xác định các thành phần khác nhau của ứng dụng tương tác với nhau như thế nào. Mục đích chính để thực hiển kiểm thử tích hợp là để đảm bảo rằng giao diện giữa các thành phần khác nhau hoạt động tốt.
* Đội kiểm thử xác định được vùng nào nên kiểm thử tích hợp, đội phát triển sẽ có đầu vào về cách viết các trường hợp kiểm tra đó. Một trong hai đội có thể viết những case này.
* Kiểm thử tích hợp xác minh xem các thành phần đã hoạt động tốt riêng biệt có hoạt động tốt khi tương tác với nhau không
* Ví dụ: Kiểm tra xem đường dẫn giữa trang Homepage và mục "Favourites". Khi Người dùng thêm một mục mới trong "Favourites", thì ở trang Homepage đã hiển thị nó chưa?
## 5. Usability Test cases - Test cases Hiệu dụng
* Test cases hiệu dụng có thể thường được liên hệ đến như "công việc" hay "kịch bản". Thay vì viết một chỉ dẫn chi tiết từng bước để thực hiện loại kiểm thử này, Tester sẽ chuẩn bị kịch bản/ công việc mức độcao hơn để thực hiện.
* Test case Hiệu dụng giúp xác định xem một người dùng thông thường tiếp cận ứng dụng và sử dụng như thế nào. Chúng hỗ trợ hướng dẫn Tester thông qua đa dạng tình huống và luồng. Không có kiến thức về ứng dụng trước là cần thiết.
* Những case này được đội thiết kế chuẩn bị theo đội kiểm thử. Kiểm thử hiệu dụng nên được hoàn thành trước khi kiểm thử chấp nhận.
* Ví dụ: Người dùng có thể thành công thêm mới một sản phẩm vào giỏ hàng không? Kinh nghiệm ở đây là gì?
## 6. Database Test cases - Test cases Cơ sở dữ liệu 
* Test cases cho kiểm thử cơ sở dữ liệu dùng để kiểm tra những gì xảy ra phía sau của ứng dụng. Giao diện người dùng rất rõ ràng, mọi thứ xuất hiện để hoạt động... nhưng thực sự dữ liệu đi những đâu?
* Để viết được những case này, bạn nên có nền kiến thức chắc chắn về toàn bộ ứng dụng, bảng dữ liệu và những thủ tục. Đội kiểm thử sẽ thường xuyên sử dụng truy vấn SQL để phát triển loại case này.
* Kiểm thử Cơ sở dữ liệu được dùng để kiểm tra xem đội phát triển đã viết code theo cách lưu trữ và xử lý dữ liệu một cách nhất quán, an toàn.
* Ví dụ: Để kiểm tra việc khởi tạo 1 thông tin người dùng. Khi người dùng ấn nút "Xác nhận thông tin cá nhân", những việc dưới đây nên được kiểm thử trong cơ sở dữ liệu:
1. Ứng dụng đã lưu trữ Dữ liệu nhập vào Cơ sở dữ liệu hay chưa?
2. Có dữ liệu vào bị mất trong quá trình Lưu hay không?
3. Một phần dữ liệu hiển thị ra nên không cần lưu lại
4. Những người dùng Không định danh không được quyền xem hoặc truy cập vào Thông tin cá nhân người dùng.
## 7. Security Test cases - Test cases Bảo mật
* Test cases bảo mật giúp đảm bảo được ứng dụng hạn chế những hành động và cấp phép tùy lúc cần thiết hay chưa. Những cases này được viết nhằm bảo vệ dữ liệu và những nơi nó cần được bảo mật
* Cases hiệu năng được sử dụng để thúc đẩy kiểm tra xâm nhập và những loại kiểm thử dựa bảo mật khác
* Định danh và mã hóa là những phần chính tập trung kiểm thử trong kiểm thử bảo mật. Đội bảo mật (nếu có) sẽ thường xuyên chịu trách nhiệm viết và thực hiện loại kiểm thử này.
* Ví dụ: Nếu một Người dùng đăng nhập thất bạn X lần, thì tài khoản đó có bị khóa không? Hay một người dùng có thể tải dữ liệu lên hệ thống mà không cần đăng nhập?
## 8. User Acceptance Test cases - Test cases Chấp nhận người dùng
* Test case chấp nhận người dùng, hay còn gọi là test case UAT, giúp đội kiểm thử có thể kiểm thử trong môi trường khách hàng. Những case này cần phạm vi rộng, bao phủ được tất cả các vùng của ứng dụng.
* Mục đích chính của loại cases này không phải để tìm lỗi (mong muốn lỗi đã được tìm thấy và sửa hết ở bước kiểm thử trước), nhưng dùng để xác minh xem ứng dụng có thể chấp nhận bởi Người dùng hay không. Do đó, khi thực thi những cases này, kết quả của kiểm thử đó và kinh nghiệm của kiểm thử đó có thể chấp nhận được không? 
* Bởi vì những loại kiểm thử khác đã được hoàn thành trước khi UAT bắt đầu, UAT được sử dụng bởi người dùng cuối hoặc khách hàng và do nhóm kiểm thử hoặc người quản lý sản phẩm chuẩn bị. Đây có lẽ là giai đoạn kiểm thử quan trọng nhất vì nó là bước cuối cùng trước khi được đưa lên môi trường thật. 
* Ví dụ: Với một ứng dụng quản lý ảnh cho studio ảnh, khách hàng (người dùng) nên kiểm tra rằng họ có thể tải lên và quản lý ảnh của họ theo cách phù hợp với nhu cầu kinh doanh của họ.
# Kết luận
* Các kiểm thử đều có hình dạng và kích cỡ khác nhau.Tùy thuộc vào loại kiểm thử được viết, bạn có thể cần một nền tảng kỹ thuật nhiều hơn, hoặc một trong UX để có viết một trường hợp thử nghiệm tốt một cách hiệu quả. Mỗi loại kiểm thử phần mềm yêu cầu loại test case khác nhau. Bằng cách xem xét các test case ở trên khi bạn thiết kế kiểm thử của mình, bạn sẽ tối đa hóa phạm vi kiểm thử và đi đến bản phát hành với sự tự tin hơn.

* Nguồn tham khảo : https://blog.testlodge.com/types-of-test-cases-in-software-testing/