* Bài viết được lược dịch từ nguồn: [Why I choose CanCanCan](https://medium.com/@coorasse/happy-birthday-cancancan-b7d57e4dbbbd)

![happy 8 year-old birthday cacancan](https://images.viblo.asia/a5aaeb44-6caf-4e7d-b361-ce8297ccb1ed.png)
Cho đến cuối năm 2017, tôi nhận ra rằng tất cả những chủ đề, bài báo, và những sự so sánh CanCanCan với các thư viện cùng loại khác đã trở nên khá cũ kĩ.

CanCanCan đã được 8 tuổi, và ngày nay nó vẫn đang được cộng đồng tích cực bảo trì. Kế hoạch dành cho dự án này là giữ cho thư viện đơn giản như chính nó đang thể hiện, không bổ sung thêm chức năng hay những đặc tính mới. Đối với chúng tôi, những kỹ sư tại công ty [Renuo](https://www.renuo.ch/en), một trong những điều quan trọng ấy là giữ cho thư viện này được cập nhật liên tục, tương thích với phiên bản mới nhất của Rails, tiện dụng với tất cả mọi người.

Theo chúng tôi, CanCanCan là một thư viện dùng để phân quyền dễ hiểu, cài đặt đơn giản, nhanh gọn. Và đến bây giờ, có thể nói nó là cách tiện dụng nhất mà bạn có thể sử dụng để làm việc này.

Nếu so sánh với một gem phổ biến khác là **Pundit**, thì đối với những project đơn giản, CanCanCan cần ít thời gian hơn để cài đặt. Ngoài ra nó còn có cú pháp định nghĩa quyền người dùng gọn gàng, đơn giản, gói gọn trong 1 file `model/ability.rb`.

Dĩ nhiên là chúng tôi vẫn sử dụng Pundit. Trong một vài tình huống, nó là một thư viện rất hữu ích và mạnh mẽ hơn CanCanCan. Tuy nhiên, phần lớn các trường hợp thì nó quá linh hoạt và mạnh mẽ hơn những gì cần thiết.

Sau đây, chúng ta sẽ cùng duyệt qua những bài viết nói về CanCanCan và đính chính lại một số thông tin đã không còn chính xác ở thời điểm bài viết được trình làng.

## 1. Một file ability.rb với kích thước lớn

[Tom Kadwill](https://medium.com/@tomkadwill) đã chỉ ra một nhược điểm của CanCanCan trong [bài viết](https://medium.com/@tomkadwill/is-cancancan-dead-4b25a43306ad) hồi đầu năm 2017 của anh ấy: khi triển khai một file ability.rb với số lượng dòng code lớn, điều đó có thể làm giảm hiệu năng của ứng dụng và làm nó khó bảo trì hơn. Điều này không thực sự đúng, khi mà chính anh ấy đã tự đính chính trong [bài viết sau đó](https://medium.com/kadwill/is-cancancan-dead-revised-9c5fbfba2945) vài tháng của mình.

Khi nào cần thiết, bạn có thể tách file ability.rb thành nhiều file và kết hợp chúng lại để phục vụ cho nhu cầu phân quyền ứng dụng. Bạn có thể xem thêm [tài liệu](https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities%3A-Best-Practices) ở repo github của CanCanCan.

## 2. Helper controller đầy "ma quái"

Một chủ đề mà tôi thấy mọi người cũng thường xuyên nhắc đến, ấy là họ phàn nàn rằng những [helper controller](https://github.com/CanCanCommunity/cancancan/wiki/Authorizing-controller-actions) của CanCanCan quá "ma quái".

Theo đó, bạn chỉ cần thêm một callback `load_and_authorize_resource` vào controller của bạn, CanCanCan sẽ tự động nhận diện model, phân quyền chúng cho từng hành động, đưa ra những ngoại lệ nếu người dùng không có quyền thực hiện những hành động nào đó.

Khi controller trở nên phức tạp hơn, những helper này bắt đầu trở nên khó sử dụng hơn, nhất là đối với những action không tuân theo chuẩn RESTful.

Quan điểm của tôi đó là không có gì kì quái, ma mãnh ở đây. "Ma quái" chỉ là từ được sử dụng khi mà người ta không hiểu cách thức hoạt động, vận hành của cái gì đó.

Tôi yêu thích sử dụng những helper controller của CanCanCan bởi vì chúng giúp không phải viết lại hàng tá code lặp đi lặp lại, tiết kiệm thời gian quý giá, đồng thời giúp tôi có được một kiến trúc hợp lý trong việc tổ chức các controller.

Nếu bạn không hiểu hoặc không thích cách xử lý của những helper này, đơn giản là bạn chỉ cần không sử dụng nó. Chúng là những tùy chọn và bạn có thể quyết định chỉ sử dụng `load_resource` hoặc `authorize_resource` riêng rẽ, hoặc không sử dụng cái nào cả.

Nếu controller của bạn không tuân theo chuẩn RESTful và những helper của CanCanCan không thực sự có thể giúp ích trong trường hợp đó, bạn có thể tham khảo [bài viết này](http://jeromedalbert.com/how-dhh-organizes-his-rails-controllers/) về cách tổ chức code trong controller.

Với CanCanCan, bạn hoàn toàn ổn nếu như chỉ sử dụng file ability.rb để định nghĩa và kiểm tra quyền người dùng, mà không sử dụng đến những helper cho controller. Đó là lý do tại sao thư viện này có thể phù hợp đối với những project không được xây dựng trên nền tảng Ruby on Rails.

## 3. Khó khăn trong việc kiểm tra quyền người dùng

Trong [bài viết](http://dmitrypol.github.io/2016/09/29/roles-permissions.html) này của Dmitry Polyakovsky, dường như tác giả cho rằng nó tương đối khó khăn để có thể kiểm tra quyền người dùng khi làm việc với CanCanCan.

Tôi không rõ bạn có gặp vấn đề tương tự hay không, nhưng tôi thì không, và [tài liệu](https://github.com/CanCanCommunity/cancancan/wiki/Testing-Abilities) này khá hữu ích, trực quan với tôi.

## 4. Không làm việc tốt với strong parameter

Điều này là đúng ở thời điểm năm 2013, khi mà Christian Nelson viết [bài viết](https://blog.carbonfive.com/2013/10/21/migrating-to-pundit-from-cancan/) của anh ấy. Nhưng may mắn là, cộng đồng Ruby đã quan tâm đến CanCanCan, tiếp tục bổ sung và phát triển nó. Ngày nay, strong parameter đã không còn là vấn đề nữa. Bạn có thể đọc ở [bài viết](https://github.com/CanCanCommunity/cancancan/wiki/Strong-Parameters) liên quan trong mục wiki của kho lưu trữ Github.

## 5. Điểm số CodeClimate nghèo nàn

Tôi nghĩ cũng nên đề cập đến điều này. Quay ngược trở lại vào quãng năm 2013, CanCanCanCan đã "được" Christian Nelson bình luận là:

> [...] nó có những dấu hiệu của một project bị bỏ rơi: những commit xuất hiện lẻ tẻ, rất nhiều issue hoặc pull request ở trạng thái open, điểm số Code Climate nghèo nàn, v.v.

Tôi sẽ khẳng định lại một lần nữa là: anh ấy hoàn toàn đúng vào thời điểm năm 2013. Tuy nhiên hiện nay nó không còn đúng nữa, và thâm chí mọi người đã phải thừa nhận rằng: [điểm số CodeClimate của CanCanCan đã đạt đến 4.0](https://codeclimate.com/github/CanCanCommunity/cancancan), mức điểm tối đa! [Tần suất code](https://github.com/CanCanCommunity/cancancan/graphs/code-frequency) cũng rất ấn tượng đối với một thư viện đã phát triển qua 8 năm.

Một điều tuyệt vời nữa, ấy là dung lượng của CanCanCan đã thu nhỏ đáng kể, chỉ khoảng vài chục cho đến một hai trăm kilobyte tùy từng phiên bản, và tương lai nó sẽ còn được thu gọn hơn nữa.

Chúc mừng sinh nhật CanCanCan tròn 8 tuổi! :birthday::birthday::birthday: