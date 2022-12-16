![](https://images.viblo.asia/75612e48-d2eb-4165-ba8b-5d376c379437.jpg)

# 1. Giới thiệu
Chào tất cả các bạn, có lẽ dù bạn đang làm việc với ngôn ngữ lập trình nào, framework nào đi chăng nữa thì ít nhiều cũng đều từng làm việc với MVC, mô hình thiết kế cấu trúc project 3 lớp, ngày MVC ra đời và ai học hiểu được nó thì cảm thấy như hổ thêm cánh vậy, nó làm cho code của bạn gọn gàng dễ hiểu, dễ maintain hơn. Và không hề mờ nhạt theo thời gian, MVC vẫn theo chúng ta đến ngày nay và vẫn gần như giữ nguyên giá trị. Trong bài viết này mình không có ý khuyên các bạn nên dùng parttern này hay pattern kia, mà chỉ giới thiệu đến các bạn một pattern mà gần đây được đánh giá là khá hay, phù hợp cho những dự án lớn, đó là  Domain Driven Design hay gọi tắt là DDD ,lần đầu tiên được đưa ra bởi Eric Evans vào năm 2005.
# 2. Domain model là gì
Domain model là cách chúng ta hiểu biết về thế giới thực và những vấn đề mà phần mềm của chúng ta cần giải quyết, là cách thiết kế kiến trúc ở mức độ hệ thống chứ không phải mức độ class như MVC hay những design pattern khác. Ví dụ như bạn không thể xây dựng một hệ thống ngân hàng nếu bạn không có một chút hiểu biết gì về nghiệp vụ ngân hàng. Với cách làm thông thường khi xây dựng một hệ thống là chúng ta có có 1 bản thiết kế có thể là psd hay picture hay là một file spec, sau khi phân tích từ file design chúng ta xác định mình cần làm gì và bắt đầu code. Tuy nhiên với mô hình DDD lại ngược lại, chúng ta phải đi từ domain, hay nói cách khác là đi từ tổng quát nghiệp vụ của project sau đó mới đến phần design.
 Trong đó ứng dụng sẽ được chia thành 4 layer như sau:
 
 ![](https://images.viblo.asia/8b99ac1f-2ae4-4fd9-ae3c-230cc8b0b39d.PNG)
 
 **User  Interface Layer**:  làm nhiệm vụ biểu diễn thông tin trực quan cho user và dịch các user command ( ở đây chúng ta có thể hiểu là các event xảy ra trên giao diện khi được trigger ( nhấn nút trên các UI input control ) là các sẽ được dịch thành các command xử lý ở các tầng dưới.
 
**Application Layer**: Tầng này được thiết kế khá mỏng ( thin ) với ít logic xử  lý chỉ để làm nhiệm vụ coordinate các Activity của Application và không chứa Business Logic, nó không chứa state của các Business Object mà chỉ chứa state của Application Task Progress. Chúng ta có thể hình dung phần này gần giống với các Controller trong mô hình MVC chỉ làm nhiệm vụ forward các task đến nơi cần xử lý.

**Domain Layer**: Đây là trái tim của ứng dụng ( Business Software ), các  state của Business Object đều nằm ở đây. Việc lưu trữ ( persistence ) các Business Object và các state của nó được chuyển giao cho tầng Infrastructure ở dưới. Trái tim của mô hình này chính là ở phần Domain Layer, các nghiệp vụ sẽ được mô tả tại đây, và cấu trúc source code cũng được tổ chức theo tên các nghiệp vụ chứ không để kiểu view, controller như truyền thống

**Infrastructure Layer**:  Đóng vai trò cung cấp thư viện ( supporting libraries )cho các tầng khác. Nó cung cấp cơ chế giao tiếp ( communication ) giữa các Layer  với nhau, cũng như cung cấp các chức năng khác như lưu trữ ( persistence ) các Business Object của tầng Domain.

# 3. Xây dựng kiến thức domain
Để xây dựng kiến thức về `domain` bạn phải là người trực tiếp ở trong lĩnh vực đó, nhưng nếu thế thì bạn lại không phải là coder nữa. Vấn đề là bạn cần ngồi xuống bàn bạc với những người liên quan có kinh nghiệm và kiến thức trong lĩnh vực đó.

Ví dụ: Khi bạn muốn xây dựng hệ thống quản lý đường bay, rõ ràng là chỉ những người trong ngành hàng không mới đủ kiến thức, và mỗi khi họ nói về một khái niệm mới nào bạn liên tưởng ngay đến một object, properties hay method trong lập trình, cách máy bay cất cánh, đường bay như thế nào làm bạn liên tưởng đến` driven` cách điều hướng của từng class cũng như cách mà một máy bay có thể bay từ địa điểm này đến địa điểm khác. 

Tuy nhiên mỗi người một lĩnh vực, để chuyển hóa từ thông tin mà những người trong ngành hàng không nói sang những thực thể trong lập trình chúng ta cần có một ngôn ngữ chung hay còn gọi là `Ubiquitous language`.
# 4. Ubiquitous Language

![](https://images.viblo.asia/0ff7f8bc-c39b-4893-94e9-855b46014908.PNG)

Ví dụ về nghiệp vụ chuyển tiền thì domain expert sử dụng từ remittance, thì anh dev cũng phải sử dụng từ khóa này phản ánh trong source code của mình. Remittance trở thành 1 Ubiquitous language.
Tóm lại khi code, developer phải thể hiện Ubiquitous language trong source code của mình để domain expert khi đọc có thể hình dung ra được.
# 5. Entity
![](https://images.viblo.asia/27a98ac5-3703-4e8c-a10a-dc275e2829ad.PNG)

Nếu bạn hay lập trình hướng đối tượng thì sẽ hiểu rõ khái niệm về Object. Entity trong DDD thực chất là một object như vậy, tuy nhiên nó có thêm 1 thuộc tính là ID để định danh. Hiểu đơn giản theo ví dụ sau. Khi bạn là nhân viên của Sun* bạn sẽ có thông tin trên hệ thống wsm và có mã nhân viên B****** , tên tuổi vv.. và khi bạn nghỉ công ty thì mọi thông tin của bạn sẽ bị xóa bỏ. Như vậy khái niệm nhân viên chính là 1 Entity.
# 6. Value object
Value Object thức chất vẫn là 1 Object nhưng không cần định danh. Đặc tính của object là Immutable, tạo ra rồi thì không thể thay đổi được.  Một value object sẽ không có ý nghĩa gì nếu không được gắn vào một entity nào đó.

Ví dụ: bạn là một thực thể nhân viên, rõ ràng bình thường bạn không cần phải quan tâm mã nhân viên của mình, nhưng công ty lại quan tâm để lưu trữ thông tin và trích xuất thông tin về bạn thông qua mã nhân viên, và mã nhân viên ấy thực sự vô nghĩa nếu không được gán vào một nhân viên cụ thể, ở đây chính là bạn. Và đương nhiên mã nhân viên của bạn thì không thay đổi đúng không nào.

# 7. Tính đồng bộ (Aggregate)
Khá là trừu tượng, tuy nhiên bạn có thể hiểu đơn gian đó là khi một thực thể bị xóa bỏ nó sẽ kéo theo xóa bỏ những thực thể khác. Chẳng hạn bạn có 1 bài viết trên facebook, bài post ấy là  1 entity post, một post lại có rất nhiều entity comment và entity like, nếu bạn xóa bài post ấy đi thì kéo theo comment và like cũng bị xóa bỏ.

# 8. Kết luận
Trên đây là một số khái niệm quan trọng trong DDD, đây thực sự là một mô hình rất hay nhưng lại khó tiếp cận vì quá khó hiểu, mình cũng đang trong quá trình tìm hiểu cũng như cố gắng áp dụng nó trong một dự án gần nhất. Hy vọng những chia sẻ này sẽ giúp ích cho các bạn trong quá trình làm việc hay đơn giản chỉ là áp dụng một mô hình mới trong quá trình xây dựng dự án. Cảm ơn mọi người đã theo dõi :)