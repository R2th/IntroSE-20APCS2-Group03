Hiện tại có hơn ba triệu ứng dụng (2017) có sẵn trong các cửa hàng ứng dụng của các nhà cung cấp lớn nhất. Đó là một con số thực sự khủng khiếp để cho biết về nhu cầu phát triển và thị hiếu người dùng hiện nay. Thuật ngữ smart phone hầu như đã chiếm sóng khắp mọi nơi, đi theo đó là việc kiểm tra các ứng dụng phát triển trên Mobile, nói cách khác là Mobile testing. Vậy Mobile Testing là gì, trước tiên hãy cùng tôi tìm hiểu những điều đặc biệt về Mobile testing nhé!
![](https://images.viblo.asia/8944e3b6-202b-4151-af24-440854e9007e.jpg)

**I. Mobile Testing là Software Testing:**

 Theo cuộc khảo sát thì gần 80% người dùng xóa một ứng dụng sau khi sử dụng nó cho lần đầu tiên!
 
Bốn lý do hàng đầu để xóa luôn là xấu thiết kế và khả năng sử dụng, thời gian tải và sự cố ngay lập tức sau khi cài đặt.

Gần 60% người dùng sẽ xóa một ứng dụng yêu cầu đăng ký, trong khi hơn một nửa số người dùng mong đợi một ứng dụng sẽ khởi động chạy dưới hai giây.

Đó là một thử thách dành cho các nhà phát triển phầm mềm, phải luôn luôn đảm bảo được chất lượng sản phẩm của mình, cho nên mobile testing cũng là software testing, luôn đảm bảo được các yếu tố sau đây:

 • Làm sao kiểm tra các ứng dụng di động một cách có hệ thống.
 
 • Cách chọn công cụ, thiết bị kiểm tra di động phù hợp.
 
 • Các khái niệm khác nhau của thử nghiệm di động
 
 • Cách tìm chiến lược thử nghiệm di động phù hợp.
 
 • Phương pháp thử nghiệm di động bổ sung.
 
 • Kỹ năng cần thiết cho người thử nghiệm di động.

**II. Kỳ vọng của người dùng:**

Hiện tại , rất nhiều các ứng dụng thực hiện cùng một nhiệm vụ, cùng một chức năng (Vd: Strava app hoặc samsung health app - cùng thực hiện chức năng tracking vận động, đo quãng đường di chuyển...) 
Nghĩa là luôn có ít nhất một ứng dụng của đối thủ cạnh tranh khi bạn phát hành ra 1 sản phẩm, thì khi kiểm thử, bạn cần phải xác định được các mục tiêu sau:

 • Thu thập thông tin về nhóm mục tiêu có thể của bạn (Những người mà sẽ có khả năng sử dụng sản phẩm của bạn).
 
 • Hỏi khách hàng của bạn về nhu cầu của họ.
 
 • Ứng dụng của bạn cần giải quyết vấn đề cho người dùng.
 
 • Khả năng sử dụng là rất quan trọng.
 
 • Ứng dụng của bạn cần đáng tin cậy và mạnh mẽ.
 
 • Hiệu suất ứng dụng thực sự quan trọng.
 
 • Ứng dụng cần phải đẹp và phù hợp với người dùng.
 
 Tôi sẽ đưa ra một ví dụ rất thực tiễn: Nếu bạn phát hành ra ra 1 ứng dụng về đo lường sức khỏe, mục tiêu của bạn nhắm vào nhóm đối tượng cho người cao tuổi. Nhưng ứng dụng của bạn lại quá rườm rà, có rất là nhiều chi tiết và các thông số liên quan đến các thuật ngữ chuyên ngành, hoặc ứng dụng có màu sắc sặc sỡ... thì tôi đảm bảo các bạn sẽ chắc chắn sẽ thất bại.
 
Thực chất các mục tiêu trên có hơi khá bao quát, nhưng đối với 1 người kiểm thử, nó cũng là những target chúng ta cần phải chú ý đến trong quá trình test.

**III. Di động và dữ liệu mạng:**

Bạn đang phát triển một ứng dụng và sẽ thế nào khi mạng lưới kết nối internet cực kỳ tệ khi bạn ở trên núi hoặc ở một nơi xa xôi nào đó. Chuyện gì xảy ra nếu bạn có kết nối internet yếu hoặc không thể kết nối được nữa trong khi sử dụng ứng dụng? Ứng dụng sẽ sụp đổ hay nó vẫn hoạt động? Chuyện gì xảy ra nếu thiết bị di động thay đổi nhà cung cấp mạng trong khi sử dụng ứng dụng?
Như bạn có thể thấy, điều đó rất quan trọng để kiểm tra ứng dụng của bạn trong thực tế - môi trường sống và để thực hiện các thử nghiệm trong mạng dữ liệu
với các băng thông khác nhau vì băng thông có thể có tác động lớn đến ứng dụng của bạn, ví dụ: Có nhiều ứng dụng sẽ bị sụp đổ khi chuyển từ kết nối mạng wifi sang 3G

**IV. Các thiết bị di động:**

Bạn không thể kiểm tra ứng dụng của mình với mọi thiết bị, mọi phần cứng và phần mềm. Và bạn nhớ rằng bạn nếu kiểm tra ứng dụng của bạn trong môi trường thực, điều này thực sự rất khó,
thậm chí là không thể. Người thử nghiệm di động cần tìm một chiến lược giảm quy mô thử nghiệm trên các thiết bị khác nhau và tìm cách kiểm tra trên các thiết bị phù hợp

Trước khi xác định chiến lược, bạn nên ghi nhớ rằng mỗi ứng dụng là duy nhất, có các yêu cầu riêng, khác vấn đề cần giải quyết và mỗi ứng dụng có một người dùng duy nhất căn cứ. Với những điểm này trong tâm trí, bạn có thể tự hỏi mình theo các câu hỏi sau để tìm các thiết bị di động bên phải thử nghiệm:

 • Cơ sở người dùng của bạn là ai?
 
 • Người dùng trung bình bao nhiêu tuổi?
 
 • Tỷ lệ nam giới và phụ nữ trong nhóm mục tiêu của bạn?

 • Nền tảng nào được sử dụng nhiều nhất trong số các cơ sở người dùng đó?

 • Thiết bị nào được sử dụng nhiều nhất?

 • Phiên bản phần mềm nào được cài đặt trên hầu hết điện thoại?

 • Ứng dụng của bạn sử dụng loại cảm biến nào?

 • Trường hợp sử dụng ứng dụng chính của bạn là gì?

Một ví dụ đơn giản mà tôi đưa ra cho luận điểm trên: Bạn phát hành một ứng dụng Tivi, thì chắc chắn bạn sẽ không thể nào đảm bảo rằng tất cả các thiết bị đều chạy ứng dụng đó một cách trôi chảy được. Khi đó, bạn sẽ loại bỏ các phiên bản phầm mềm "cổ lỗ sỉ" như Android 4.0 trở xuống.

**V. Chu kỳ phát hành di động:**

Công nghệ hiện nay đang phát triển cực kỳ nhanh, và những người kiểm thử cũng phải đảm bảo các ứng dụng ra đời sẽ đảm bảo hoặc động tốt trên các thiết bị di động mới nhất cũng như các hệ điều hành mới nhất.

Để xử lý tốc độ nhanh của chu kỳ phát hành di động, bạn nên ghi nhớ những điều sau đây:

 • Luôn theo dõi thị trường phần mềm và thiết bị di động.

 • Biết khi nào điện thoại mới sẽ được tung ra.

 • Tìm hiểu về các tính năng mới của hoạt động hệ thống.

 • Theo dõi nhóm mục tiêu của bạn để xem có các thiết bị mới đang hiển thị trong số liệu thống kê của bạn hay không.

 • Suy nghĩ hai lần trước khi cập nhật điện thoại mới nhất phiên bản hệ điều hành.

 • Mua điện thoại mới hoặc cập nhật các hệ điều hành mới nhất

 • Nếu mua không phải là một lựa chọn, hãy thuê các thiết bị.
 
 Một ví dụ kinh điển cho quan điểm trên: Năm 2017, khi iPhoneX ra đời, hàng loạt các ứng dụng đã bị lỗi liên quan đến màn hình "tai thỏ" đặc biệt của nó. Một vài ứng dụng sẽ bị mất 1 góc màn hình hoặc một số game bị lỗi cũng liên quan đến tai thỏ khi chơi trong chế độ full screen.
 
 >>> Ở trên là các điểm đặc biệt về kiểm thử di động mà tôi tìm hiểu được trong quá trình làm việc và đọc tài liệu, hy vọng bài viết sẽ giúp các bạn có thêm nhiều điều thú vị hơn về Kiểm thử di động (Mobile testing).
 
 #Bài viết có sử dụng tư liệu trong cuốn sách : "Hands-on Mobile App Tesing" của Daniel Knott