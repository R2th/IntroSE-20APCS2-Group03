Đôi khi, QA phải đối mặt với một tình huống khó khăn khi thời gian bị hạn chế và việc kiểm thử cần phải có sự ưu tiên.
Trong trường hợp ứng dụng di động, việc kiểm thử rất khó khăn để có thể đưa ra quyết định nên kiểm thử những gì và bỏ qua những gì.

Khi có một sản phẩm mới như: Nexus, iPhone hoặc Note mới được tung ra, chắc chắn nó sẽ đi kèm với các tính năng tiên tiến, giao diện người dùng thể thao để thu hút người dùng mua điện thoại. Nó giống như một cuộc chạy đua nếu một công ty cung cấp một loạt các tính năng nâng cao, sau đó công ty kia cố gắng tạo ra thứ gì đó cao cấp hơn với mức giá hợp lý để chiếm lĩnh thị trường.

Các ứng dụng có giao diện người dùng hấp dẫn chắc chắn sẽ cần phải được kiểm thử trên nhiều thiết bị để xác minh xem giao diện người dùng đó có sống động không. Không thể kiểm thử (thậm chí không cần thiết) trên mọi kiểu điện thoại nhưng các điện thoại như Nexus, iPhone và Note chắc chắn phải được kiểm tra.

![](https://images.viblo.asia/df658a62-464b-4bab-9878-837c2dd5d662.jpg)

Tôi đưa ra hướng dẫn này bởi vì tôi và nhóm phát triển đã phải đối mặt với một tình huống khó khăn vào năm 2014 khi Nexus 6, iPhone 6 và Lollipop đều được tung ra vào những ngày khá gần nhau. Đó là một tình huống khó khăn cho nhóm chúng tôi vì có những lần chạy nước rút bị ràng buộc về thời gian và chúng tôi không thể yêu cầu thêm thời gian thử nghiệm, chúng tôi chỉ có một tháng để thực hiện công việc này. Trong khi có quá nhiều vấn đề cần được xem xét.

![](https://images.viblo.asia/a5b27ad5-0b88-4f88-99e4-1d348e520c4c.jpg)

# Mẫu điện thoại và phiên bản hệ điều hành: Cái nào nên kiểm thử trước?
Đây là một lựa chọn khó khăn mà không ai có thể quyết định thay cho bạn, mà chỉ có bạn và nhóm của mình phải thảo luận và quyết định xem cái nào sẽ được ưu tiên hơn hoặc chủ sở hữa sản phẩm của bạn đưa ra quyết định từ trước.

Bạn có thể hỏi chủ sở hữu sản phẩm về đầu vào nhưng chưa chắc chắn có câu trả lời vì nó cũng mới đối với họ. Tôi không thể đưa ra câu trả lời trực tiếp cho câu hỏi này nhưng tôi có thể đưa ra cho bạn một vài điểm gợi ý để bạn có thể đưa ra quyết định của mình.

Các gợi ý bao gồm:

Điều đầu tiên và quan trọng nhất là phải dành thời gian (không quá 2 ngày) để tìm hiểu những điểm mới trong hệ điều hành và các mẫu điện thoại. Chia nhỏ công việc nghiên cứu với các QA khác và điều đó sẽ tiết kiệm thời gian của bạn.
Thu thập tất cả các phát hiện và chia sẻ tương tự với nhóm phát triển.
Có một cuộc thảo luận với nhóm phát triển, BA để tìm hiểu điều gì sẽ có tác động nhiều đến ứng dụng của bạn.
Đưa ra một bản kế hoạch cụ thể và chi tiết về mục đích kiểm thử trước khi lựa chọn giữa điện thoại và hệ điều hành mới nhất.
Nếu ứng dụng của bạn là một ứng dụng thương mại như ứng dụng mua sắm, thì việc kiểm tra giao diện người dùng trở nên quan trọng. Trong trường hợp này, bạn nên ưu tiên kiểm tra giao diện người dùng điện thoại.
Nếu ứng dụng của bạn giống với ứng dụng chuyên nghiệp được cá nhân hóa như ứng dụng Email, thì giao diện của chúng chỉ cần nhìn và cảm nhận, bởi vì nó không quan trọng lắm, hãy chọn thử nghiệm hệ điều hành mới nhất trong trường hợp đó.
Nếu ứng dụng của bạn đang sử dụng các ứng dụng của bên thứ 3 như Bản đồ, trình quay số điện thoại, ứng dụng nhắn tin điện thoại,… thì nên thử nghiệm trên hệ điều hành mới nhất vì các ứng dụng không thay đổi với điện thoại.
Nhưng ngược lại, nếu việc giới thiệu các tính năng mới như LTE ảnh hưởng đến hiệu suất của ứng dụng thì bạn chắc chắn nên thử nghiệm trên điện thoại mới nhất. Giống như công nghệ mạng di động Jio cần một tính năng LTE để thực hiện cuộc gọi.
Nó cũng có thể xảy trường hợp điện thoại mới nhất được phát hành với hệ điều hành mới nhất, có thể giải quyết vấn đề của bạn ở một mức độ nào đó. Nhưng cuối cùng, sự hỗ trợ hệ điều hành mới nhất là quyết định của khách hàng. Họ có thể không muốn hỗ trợ ngay lập tức HĐH mới nhất.
Để nói về trải nghiệm của tôi, chúng tôi chọn Nexus và iPhone mới nhất trên HĐH Lollipop vì khách hàng của chúng tôi không vội vàng ra mắt hỗ trợ cho HĐH mới nhất.

Nexus đi kèm với KitKat và chúng tôi đã thử nghiệm điều đó bởi vì ứng dụng của chúng tôi tập trung vào việc lưu lại thành công lịch sử các sự kiện liên quan đến việc giao hàng trọn gói. Các tính năng của Lollipop sẽ không ảnh hưởng nhiều đến ứng dụng của chúng tôi nhưng chúng tôi đã muốn xem hiệu suất hoạt động trên điện thoại mới nhất.

# Làm Thế Nào Để Kiểm Thử Và Chiến Lược Kiểm Thử Như Thế Nào?
Để một chiến lược được lên kế hoạch tốt bạn cần đưa ra được danh sách các kiểm thử mà bạn cần tiến hành và có mức độ ưu tiên cụ thể.

Sau đây là danh sách mà bạn có thể tham khảo:

# 1) Ma trận chức năng
Tạo một tài liệu với ma trận của các tính năng của điện thoại hoặc hệ điều hành sẽ ảnh hưởng đến ứng dụng của bạn so với các chức năng sẽ bị ảnh hưởng.

# 2) Giao diện người dùng, chủ đề và ngoại hình
Đó là một sự chắc chắn 100% rằng giao diện người dùng, chủ đề và ngoại hình sẽ khác nhau.

Do đó, cần tạo một bộ testcase cụ thể để kiểm thử giao diện.  Giống như tôi có Redmi Note 4 có cài đặt chủ đề thay đổi mỗi ngày, nếu hôm nay bảng màu là xanh nhạt, ngày mai là xanh hoặc đỏ,… và do đó, cách phối màu của ứng dụng và biểu tượng của chúng cũng thay đổi.

Tạo một tài liệu ma trận tương tự cho UI, theme,… có ảnh hưởng đến giao diện ứng dụng của bạn.

# 3) Các vật phẩm thử nghiệm
Có thể là thử nghiệm hệ điều hành hoặc thử nghiệm thiết bị, cho dù bạn chọn loại nào, đều có các trường hợp thử nghiệm được tạo theo các ma trận đã đề cập ở trên. Tạo một bộ riêng cho thử nghiệm này vì nó sẽ được đặt riêng cho điện thoại hoặc HĐH.

# 4) Gắn thẻ
Gắn thẻ các trường hợp thử nghiệm, lỗi và nếu có thể có các tài liệu liên quan. Điều này sẽ giúp bạn lọc ra từ một tập hợp lớn các trường hợp thử nghiệm hoặc các vấn đề của người dùng và dễ dàng chia sẻ đến nhóm của mình.

# 5) Sử dụng Trình giả lập hoặc Trình mô phỏng
Để kiểm tra hệ điều hành, bạn có thể kiểm tra giao diện người dùng trên trình giả lập hoặc trình mô phỏng mặc dù cá nhân tôi không thích thử nghiệm trên các giao diện đó, nhưng giao diện người dùng, chủ đề,… có thể được kiểm tra để tiết kiệm thời gian. Tránh sử dụng trình giả lập hoặc mô phỏng để thực hiện kiểm thử với điện thoại mới nhất.

# 6) Tự động hóa
Trong những tình huống như vậy, tự động hóa sẽ giúp ích rất nhiều vì nó giúp tiết kiệm rất nhiều thời gian mà bạn dành cho việc thưc hiện các testcase test chức năng. Có rất nhiều công cụ tuyệt vời sẽ làm giảm bớt thời gian cũng như công sức của bạn và bạn có thể tập trung kiểm thử vào các phần quan trọng hơn.

Sau đây là một số mục tiêu từ kinh nghiệm của tôi về cách kiểm thử:

Tạo bộ testcase: Lọc và thêm các trường hợp kiểm thử mới theo yêu cầu và phải hoàn thành nó trước khi việc kiểm thử của bạn bắt đầu.
BVT: Cố gắng có các trường hợp kiểm tra tự động để tiết kiệm thời gian và điều này sẽ giúp có được kết quả nhanh chóng trước khi chấp nhận bản dựng để thử nghiệm.
Kiểm tra ứng dụng điện thoại hoặc hệ điều hành: Chức năng, giao diện người dùng, tính năng của điện thoại hoặc kiểm tra hệ điều hành cho điện thoại hoặc hệ điều hành. Bạn có thể không cần xác minh tất cả các trường hợp kiểm thử mà chỉ cần xác minh những trường hợp có ảnh hưởng đến các tính năng mới.
Xác minh lỗi/ Test hồi quy: Tập trung nhiều hơn vào (các) tính năng của điện thoại trong kiểm thử hồi quy.
Kiểm tra thực địa: Để chắc chắn thực hiện ít nhất một BVT, để xác minh các chức năng của ứng dụng hoạt động trơn tru từ đầu đến cuối.

Bạn có thể tham khảo quy trình kiểm thử như hình vẽ dưới đây:

![](https://images.viblo.asia/ed744094-e00b-48a7-889b-4f75123fd22d.jpg)

# Kết Luận
Nếu chủ sở hữu sản phẩm không có ưu tiên nào rõ ràng nên kiểm thử giao diện hoặc hệ điều hành, thì đó là quyết định của nhóm nội bộ cần được trao đổi kĩ lưỡng. Khi truyền đạt quyết định của bạn cho chủ sở hữu sản phẩm, hãy đưa ra các lí do rõ ràng về lựa chọn của bạn.

Trong các tình huống thì việc quyết định đúng đắn sẽ quan trọng hơn là việc bạn bắt tay vào kiểm thử luôn. Vì nếu bạn lựa chọn sai mức độ ưu tiên kiểm thử thì dự án của bạn có thể sẽ không có kết quả tốt. Một kiến ​​thức toàn diện là vô cùng quan trọng vì điều đó sẽ xác định ảnh hưởng đến quyết định của bạn. Do đó, hãy làm tất cả các cuộc khảo sát trước khi lựa chọn giữa điện thoại và hệ điều hành.Tốt nhất nên tạo một bảng tính năng sẽ ảnh hưởng đến chức năng ứng dụng của bạn.

Cố gắng sử dụng các công cụ tự động hóa nhiều hơn vì nó sẽ tiết kiệm rất nhiều thời gian và cũng giúp bạn dành thời gian cho các hoạt động khác.

Nguồn tham khảo: https://www.softwaretestinghelp.com/phone-model-vs-os-version-test/