Chúng tôi hiếm khi kiểm soát tất cả các phần mềm trong hệ thống của chúng tôi. Đôi khi chúng tôi mua gói của bên thứ ba hoặc sử dụng nguồn mở. Những lần khác, chúng tôi phụ thuộc vào các nhóm trong công ty riêng của chúng tôi để sản xuất các thành phần hoặc hệ thống con cho chúng tôi.
# Using Third-Party Code
Có một sự căng thẳng tự nhiên giữa nhà cung cấp giao diện và người sử dụng giao diện. Các nhà cung cấp các gói và khung của bên thứ ba cố gắng cho khả năng ứng dụng rộng rãi để họ có thể làm việc trong nhiều môi trường và thu hút nhiều đối tượng. Người dùng, mặt khác, muốn một giao diện tập trung vào các nhu cầu cụ thể của họ. Sự căng thẳng này có thể gây ra vấn đề tại các ranh giới của hệ thống của chúng tôi.
```
let sensors = HashMap()
let s = sensors.get(sensorId)
```

```
public class Sensors {
  private let sensors = HashMap()

  public func getById(id: String) -> Sensors {
    return sensors.get(id)
  }
  //snip
}
```

Mã đầu tiên cho thấy việc truyền trong Bản đồ, trong khi mã thứ hai có thể phát triển với rất ít tác động đến phần còn lại của ứng dụng. Việc quản lý kiểu đúc và kiểu được xử lý bên trong lớp Sensors.
Giao diện cũng được điều chỉnh và ràng buộc để đáp ứng nhu cầu của ứng dụng. Nó dẫn đến mã dễ hiểu và khó sử dụng hơn. Lớp Sensors có thể thực thi các quy tắc thiết kế và kinh doanh.
# Exploring and Learning Boundaries
Mã của bên thứ ba giúp chúng tôi nhận được nhiều chức năng hơn được cung cấp trong thời gian ngắn hơn. Chúng ta bắt đầu từ đâu khi muốn sử dụng một số gói của bên thứ ba? Nó không phải là công việc của chúng tôi để kiểm tra mã của bên thứ ba, nhưng chúng tôi có thể có lợi nhất khi viết thử nghiệm cho mã của bên thứ ba mà chúng tôi sử dụng.

Giả sử không rõ cách sử dụng thư viện bên thứ ba của chúng tôi. Chúng tôi có thể dành một hoặc hai ngày (hoặc nhiều hơn) để đọc tài liệu và quyết định cách chúng tôi sẽ sử dụng nó. Sau đó, chúng tôi có thể viết mã của mình để sử dụng mã của bên thứ ba và xem liệu nó có làm những gì chúng tôi nghĩ hay không. Chúng tôi sẽ không ngạc nhiên khi thấy mình bị sa lầy trong các phiên gỡ lỗi dài khi cố gắng tìm hiểu xem các lỗi chúng tôi đang gặp phải nằm trong mã của chúng tôi hay của chúng.

Học mã của bên thứ ba là khó. Tích hợp mã của bên thứ ba cũng khó. Làm cả hai cùng một lúc là khó khăn gấp đôi. Điều gì xảy ra nếu chúng ta thực hiện một cách tiếp cận khác nhau? Thay vì thử nghiệm và thử những thứ mới trong mã sản xuất của chúng tôi, chúng tôi có thể viết một số thử nghiệm để khám phá sự hiểu biết của chúng tôi về mã của bên thứ ba. Jim Newkirk gọi các bài kiểm tra học tập như vậy.

Trong các bài kiểm tra học tập, chúng tôi gọi API của bên thứ ba, vì chúng tôi hy vọng sẽ sử dụng nó trong ứng dụng của mình. Về cơ bản, chúng tôi thực hiện các thử nghiệm có kiểm soát để kiểm tra hiểu biết của chúng tôi về API đó. Các thử nghiệm tập trung vào những gì chúng tôi muốn từ API.

# Learning Tests Are Better Than Free
Dù sao chúng tôi cũng phải học API và viết những bài kiểm tra đó là một cách dễ dàng và tách biệt để có được kiến thức đó. Các bài kiểm tra học tập là những thí nghiệm chính xác giúp tăng sự hiểu biết của chúng tôi.

Không chỉ học kiểm tra miễn phí, họ có lợi tức đầu tư tích cực. Khi có các bản phát hành mới của gói bên thứ ba, chúng tôi sẽ chạy các bài kiểm tra học tập để xem liệu có sự khác biệt về hành vi hay không.

Các bài kiểm tra để xác minh rằng các gói của bên thứ ba mà chúng tôi đang sử dụng hoạt động theo cách chúng tôi mong đợi. Sau khi được tích hợp, không có gì đảm bảo rằng mã của bên thứ ba sẽ tương thích với nhu cầu của chúng tôi. Các tác giả ban đầu sẽ có áp lực để thay đổi mã của họ để đáp ứng nhu cầu mới của riêng họ. Họ sẽ sửa lỗi và thêm các khả năng mới. Với mỗi bản phát hành có rủi ro mới. Nếu gói của bên thứ ba thay đổi theo cách nào đó không tương thích với các thử nghiệm của chúng tôi, chúng tôi sẽ tìm ra ngay lập tức.

Cho dù bạn có cần học do các bài kiểm tra cung cấp hay không, một ranh giới sạch sẽ được hỗ trợ bởi một tập các bài kiểm tra bên ngoài thực hiện giao diện giống như cách mã sản xuất thực hiện. Nếu không có các thử nghiệm ranh giới này để giảm bớt sự di chuyển, chúng tôi có thể tin tưởng ở lại với phiên bản cũ lâu hơn chúng ta nên làm.

# Using Code That Does Not Yet Exist
Có một loại ranh giới khác, một ranh giới phân tách cái đã biết từ cái chưa biết. Thường có những nơi trong mã mà kiến thức của chúng ta dường như rơi ra khỏi rìa. Đôi khi những gì ở phía bên kia của ranh giới là không thể biết được (ít nhất là ngay bây giờ). Đôi khi chúng ta chọn nhìn không xa hơn ranh giới.

Một số năm trước, tôi là thành viên của nhóm phát triển phần mềm cho hệ thống thông tin vô tuyến. Có một hệ thống con, Bộ truyền phát, mà chúng tôi biết rất ít và những người chịu trách nhiệm về hệ thống con đã không đi đến điểm xác định giao diện của họ. Chúng tôi không muốn bị chặn, vì vậy chúng tôi bắt đầu công việc của chúng tôi cách xa phần không xác định của mã.

Chúng tôi đã có một ý tưởng khá tốt về nơi thế giới của chúng tôi kết thúc và thế giới mới bắt đầu. Khi chúng tôi làm việc, đôi khi chúng tôi gặp phải ranh giới này. Mặc dù sương mù và đám mây vô minh che khuất tầm nhìn của chúng tôi vượt ra ngoài ranh giới, công việc của chúng tôi khiến chúng tôi nhận thức được những gì chúng tôi muốn giao diện mới. Chúng tôi muốn nói với người phát như thế này:

> Khóa máy phát trên tần số được cung cấp và phát ra biểu diễn tương tự của dữ liệu đến từ luồng này.

Chúng tôi không biết làm thế nào điều đó sẽ được thực hiện vì API chưa được thiết kế. Vì vậy, chúng tôi quyết định làm việc ra các chi tiết sau.
Để tránh bị chặn, chúng tôi đã xác định giao diện của riêng mình. Chúng tôi gọi nó là một cái gì đó hấp dẫn, như Máy phát. Chúng tôi đã cho nó một phương thức gọi là truyền có tần số và luồng dữ liệu. Đây là giao diện mà chúng tôi muốn chúng tôi có.

Một điều tốt khi viết giao diện mà chúng tôi mong muốn là nó nằm dưới sự kiểm soát của chúng tôi. Điều này giúp giữ cho mã khách hàng dễ đọc hơn và tập trung vào những gì nó đang cố gắng thực hiện.

Trong Hình 8-2, bạn có thể thấy rằng chúng tôi đã cách ly các lớp CommunicationsContoder khỏi API máy phát (nằm ngoài tầm kiểm soát của chúng tôi và không được xác định). Bằng cách sử dụng giao diện cụ thể cho ứng dụng của chúng tôi, chúng tôi giữ cho mã CommunicationsContoder của chúng tôi sạch sẽ. Sau khi API máy phát được xác định, chúng tôi đã viết Trình phát Chương trình để thu hẹp khoảng cách. ADAPTER2 gói gọn sự tương tác với API và cung cấp một nơi duy nhất để thay đổi khi API phát triển.

![](https://images.viblo.asia/94414858-bb73-414e-81e2-b2e0cb639225.png)

Thiết kế này cũng cung cấp cho chúng tôi một đường rất thuận tiện trong mã để thử nghiệm. Sử dụng một FakeTransuctor phù hợp, chúng ta có thể kiểm tra các lớp CommunicationsContoder. Chúng tôi cũng có thể tạo các thử nghiệm ranh giới một khi chúng tôi có Bộ phát APAP để đảm bảo rằng chúng tôi đang sử dụng API chính xác.

# Clean Boundaries
Những điều thú vị xảy ra ở ranh giới. Thay đổi là một trong những điều đó. Thiết kế phần mềm tốt phù hợp với sự thay đổi mà không cần đầu tư lớn và làm lại. Khi chúng tôi sử dụng mã nằm ngoài tầm kiểm soát của chúng tôi, phải đặc biệt cẩn thận để bảo vệ khoản đầu tư của chúng tôi và đảm bảo thay đổi trong tương lai không quá tốn kém.

Mã tại các ranh giới cần phân tách rõ ràng và kiểm tra xác định kỳ vọng. Chúng ta nên tránh để quá nhiều mã của chúng tôi biết về các chi tiết của bên thứ ba. Nó tốt hơn là phụ thuộc vào thứ gì đó bạn kiểm soát hơn là thứ bạn không kiểm soát, vì sợ rằng nó sẽ kiểm soát bạn.

Chúng tôi quản lý các ranh giới của bên thứ ba bằng cách có rất ít vị trí trong mã đề cập đến chúng. Chúng tôi có thể gói chúng như chúng tôi đã làm với Bản đồ hoặc chúng tôi có thể sử dụng QUẢNG CÁO để chuyển đổi từ giao diện hoàn hảo của chúng tôi sang giao diện được cung cấp. Dù bằng cách nào, mã của chúng tôi nói với chúng tôi tốt hơn, thúc đẩy việc sử dụng nhất quán trong nội bộ qua ranh giới và có ít điểm bảo trì hơn khi mã của bên thứ ba thay đổi.

# Tài liệu tham khảo:
* https://github.com/JuanCrg90/Clean-Code-Notes#chapter8 
* Clean Code A Handbook of Agile Software Craftmanship - Chapter 8: Boundaries by James Grenning