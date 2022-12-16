Như chúng ta đã biết, trước khi một app được public trên Store thì bên phát triển phải đóng gói sản phẩm đã phát triển kèm theo mô tả về chức năng được phát hành và gửi tới Apple hoặc Google. Tại đây, luôn có một đội ngũ review lại sản phẩm của bạn và quyết định sẽ public hay reject. Để đảm bảo, app được cam kết release đúng thời hạn và được chấp nhận một cách nhanh chóng từ Apple hoặc Google thì bạn cần hiểu được những nguyên nhân phổ biến hay bị reject. Từ đó, đảm bảo được app đáp ứng được yêu cầu trước khi gửi review. Sau đây, tôi xin trình bày checklist nguyên nhân hay gặp khi bị reject:


|Mục | Nguyên nhân | Ví dụ |
| -------- | -------- | -------- |
 | Chức năng  |  Vừa mở app hoặc thực hiện thao tác chính là bị crash   | |
||App có bug khá lộ| Giả sử: App chơi trò chơi, vừa thực hiện thao tác hiển thị thông báo lỗi, người dùng không thể chơi được|
||App có chức năng không giống hoặc thiếu chức năng như trong mô tả gửi tới review| |
||App làm giống hệt các app khác đã tồn tại trên Store| Ko chỉ giống hệt chức năng mà sao chép lại giống design là chắc chắn sẽ bị reject  |
||App chứa nội dung không lành mạnh, bất hợp phát, khiêu khích hoặc kích thích hay đe doạ người sử dụng làm những hành động vi phạm pháp luật|  |
||App quá đơn giản, chỉ giống như link bài hát, bộ phim, hoặc hiển thị các app khác không phải của mình để bán hoặc quảng cáo | |
|Metadata: name, descriptions, ratings, ranking,...|App có tên tính năng, mô tả tính năng, screenshot hoặc preview không liên quan đến nội dung và tính năng gửi tới để phát hành trong lần này| |
||App chứa danh mục và thể loại không phù hợp với nội dung của App | |
||Developer có trách nhiệm chọn đúng rating cho App. Rating không phù hợp hoặc có hành động gian dối sẽ bị report bởi đội ngũ review | |
||Developer có hành động gian lận dành cho kết của vote của end-user khiến thứ hạng của app trên Store thay đổi sẽ nhận được báo cáo lập tức từ đội review | Có thể là xoá taì khoản developer, App sẽ bị gỡ và nghiêm trọng hơn là cty đó sẽ phải bồi thường vì vi phạm điêù khoản |
||Khi App có IAP mà chưa thống nhất về % hoa hồng giữa bên cty gia công sản phẩm và Apple thì khi gửi review tính năng IAP sẽ bị từ chối| |
||App hiển thị thông tin cá nhân của người dùng khi chưa được sự đồng ý| |
||App có các tính năng vi phạm bản quyền |Sử dụng nhạc trong các chức năng chưa được mua bản quyền, hoặc chỉ mua bản quyền ở một vài quốc gia cũng sẽ bị giới hạn. Thông thường với những app có phạm vi toàn thế giới thì bản quyền cũng sẽ phải theo phạm vi lãnh thổ |
|Push Notifications|App dùng Push Notifications để gửi các tin nhắn với các mục đích khác  | Ví dụ: đe doạ, khủng bố, lừa đảo, spam, công khai thông tin cá nhân mà chưa được phép, thông tin bảo mật vi phạm bản quyền, pháp luật |
||Sử dụng dịch vụ Apple Push Notification (APN) API mà không có Push Notification ID hoặc có tính năng Push Notifications mà ko sử dụng APN API cũng sẽ bị từ chối | |
||Nội dung Push Notifications chứa những đường link, chương trình hoặc gián tiếp truyền tải virus với mục đích làm tổn hại tới người dùng hoặc làm gián đoạn các hoạt động của dịch vụ APN cũng sẽ bị từ chối||
|Game Center|Sử dụng dịch vụ Game Center với mục đích khác không giống trong điều khoản như gửi thông điệp đe doạ, lừa đảo, spam người sử dụng||
||App sử dụng quá mức dung lượng mạng hoặc băng thông của Game Center cũng sẽ bị từ chối||
||Vi phạm các điều khoản của Game Center|App dùng Player ID cho mục đích khác, hoặc public thông tin của người chơi tới người khác. Ngoài ra có hành vi nghiêm trọng hơn là Developer tìm cách khai thác thông tin sử dụng cho mục đích lừa đảo từ Game Center cũng sẽ bị xoá tài khoản |
||App truyền tải virus, tập tin hoặc chương trình có thể làm tổn hại hoặc gián đoạn tới hoạt động của dịch vụ Game Center nếu bị phát hiện ra cũng sẽ bị từ chối||
|Purchasing and currencies|App sử dụng In-App Purchase (IAP) để mua hàng hoá vật lý physical goods hoặc mặt hàng và dịch vụ sử dụng bên ngoài App||
||Đăng ký nội dung (content subcription) sử dụng IAP phải kéo dài và có hiệu lực đối với người dùng trên tất cả thiết bị IOS của họ đúng theo quy định |Thông thường sẽ có hiệu lực khoảng 7 ngày|
||App dùng IAP với mục đích lừa đảo người dùng cũng sẽ bị từ chối|Ví dụ: Dùng IAP để mua quyền truy cập các tính năng được cung cấp sẵn có bởi IOS, watchOS, tvOS: camera, thiết bị ngoại vi, Pencil, Keyboard , ...|
||App sử dụng IAP nhằm các mục đích rửa tiền, kinh doanh tiền ảo không được cho phép trên quốc gia sử dụng cũng sẽ bị từ chối||
||App cung cấp subcriptions phải sử dụng IAP, Apple sẽ chia sẻ doanh thu đã được quy định trong Program License Agreement||
|Privacy|App bao gồm các thông tin cá nhân phải có chính sách riêng tư đi kèm. Nếu ko cam kết sẽ bị từ chối||
||App không được truyển tải dữ liệu về người dùng mà không xin phép sự chấp thuận trước và cung cấp cho người dùng quyền truy cập vào thông tin về cách và nơi dữ liệu được sử dụng||
||App mà thu thập, truyền tải, hoặc có khả năng chia sẻ thông tin cá nhân (ví dụ: tên, địa chỉ, email, địa điểm, hình ảnh, video, bức vẽ, khả năng chat, thông tin cá nhân khác, hoặc liên tục định danh sử dụng kết hợp với bất kỳ thông tin trên) từ một trẻ vị thành niên phải tuân thủ với luật bảo mật trẻ em, và phải bao gồm một chính sách riêng tư||
|Religion, culture, and ethnicity|App chứa tài liệu tham khảo hoặc bình luận về một tôn giáo, văn hóa hoặc nhóm dân tộc mà phỉ báng, xúc phạm, thiếu thiện cảm hoặc có khả năng hướng tới nhóm mục tiêu nhằm gây hại hoặc bạo lực sẽ bị từ chối||
||App có thể chứa hoặc trích dẫn văn bản tôn giáo với điều kiện trích dẫn hoặc bản dịch phải chính xác và không gây hiểu lầm. Bình luận nên nhằm mục đích giáo dục hoặc thông tin hơn là khiêu khích||
|TestFlight|App chỉ có thể dùng TestFlight cho những beta test app cho mục đích phân phối công khai và phải tuân thủ đầu đủ App Review Guidelines||
||App dùng TestFlight phải được submit để review ngay khi có một build chứa thay đổi về nội dung hoặc tính năng||
||App dùng TestFlight không được phân phối đến tester như là trao đổi bồi thường dưới bất kỳ hình thức nào||
|Apple Pay|App dùng Apple Pay như là 1 cơ chế thanh toán không được cung cấp sản phẩm hoặc dịch vụ vi phạm luật pháp của bất kỳ lãnh thổ nào mà sản phẩm hay dịch vụ được giao nhận và không được sử dụng cho bất kì mục đích trái phép nào||
||App dùng Apple Pay phải cung cấp một chính sách riêng tư nếu không sẽ bị từ chối||
||App dùng Apple Pay chỉ có thể chia sẻ dữ liệu người dùng thu thập được từ Apple Pay với bên thứu 3 nhằm mục đíhc tạo thuận lợi hoặc cải thiện việc giao nhận hàng hóa và dịch vụ hoặc để tuân thủ yêu cầu pháp lý||
||App dùng Apple Pay phải cung cấp tất cả tài liệu thông tin mua sắm với người dùng trước khi bán bất cứ sản phẩm hoặc dịch vụ nào nếu không sẽ bị từ chối; App dùng Apple Pay để cung cấp thanh toán định kỳ phải ít nhất cho biết thời gian của thời hạn gia hạn, và sự thật là nó sẽ tiếp tục cho đến khi hủy bỏ, những gì được cung cấp suốt mỗi gian đoạn,  những chi phí sẽ được thu từ khách hàng, và cách hủy bỏ.||
> P/S: Trên đây là xuất phát từ kinh nghiệm bản thân và kiến thức tích luỹ, tham khảo. Có thể chưa hoàn toàn đúng. Nhưng tôi sẽ update và bổ sung khi bản thân có thêm kinh nghiệm cho phần này. Xin cảm ơn!