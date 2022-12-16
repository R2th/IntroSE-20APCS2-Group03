![](https://images.viblo.asia/73203cd0-e903-42f2-89fb-e3d61454d1f1.png)
# Giới thiệu
Trước khi bắt đầu, hãy thử đếm số lượng ứng dụng di động đang có sẵn trong chiếc điện thoại Android của bạn. Mệt mỏi vì đếm số lượng ứng dụng Android trên điện thoại của bạn? Vâng, điều này là phổ biến cho tất cả người dùng Android. Chúng ta có rất nhiều app để phục vụ cho cuộc sống hằng ngày.

Nhưng nếu bạn là một Android developer và cách bạn nhìn vào một app Android nên khác với những người sử dụng Android thông thường. Bạn nên biết mọi thứ về vòng đời của một ứng dụng Android một cách cụ thể. Bạn phải biết rõ về vòng đời của ứng dụng mà bạn đang tạo ra cho người dùng. Nếu bạn không hiểu đúng đắn về lifecycle của application thì cũng sẽ không có bất kỳ ảnh hưởng nào đến hoạt động của ứng dụng nhưng điều này sẽ gây ấn tượng xấu về ứng dụng của bạn đối với người dùng. Nếu bạn muốn tìm hiểu hơn về nó, vậy hãy bắt đầu cùng mình nhé :D

Trong bài này, chúng ta sẽ soi vào vòng đời của một ứng dụng Android. Chúng ta sẽ cố gắng xem điều này sẽ ảnh hưởng như thế nào đến trải nghiệm của người dùng. Vậy nên, let’s get started.

# Android Application life cycle
Android là một ví dụ về việc đa tác vụ, nghĩa là bạn có thể chạy nhiều công việc cùng một lúc. Trên thực tế, chúng ta không thực hiện nhiều nhiệm vụ tại một thời điểm cụ thể, thay vào đó, dường như chúng ta đang thực hiện nhiều nhiệm vụ cùng một lúc. Theo một cách rất đơn giản, tại bất kỳ thời điểm cụ thể nào, chỉ một ứng dụng có thể ở trạng thái chạy và các ứng dụng khác sẽ ở trạng thái nền. Tất cả các quy trình này được quản lý và xử lý theo cách mà dường như chúng ta đang thực hiện nhiều hơn một nhiệm vụ tại một thời điểm.

Nhưng vấn đề nảy sinh ở đây là, một thiết bị Android cụ thể có một số lượng hạn chế về space và tốc độ xử lý, và để có thể vận hàng một cách trôi chảy hoặc cung cấp việc vận hàng trôi chảy cho tất cả các ứng dụng, và để mang lại trải nghiệm tốt hơn cho người dùng , Android đẩy ứng dụng ít được sử dụng nhất trong một số bộ đệm. Bằng cách làm như vậy, ứng dụng không được sử dụng trong một thời gian dài hơn sẽ bị đẩy xuống nền và có thể phương thức onStop() sẽ được gọi để dừng hoạt động của ứng dụng đó.

# LRU Cache
LRU hay Least Recently Used Cache là bộ đệm được HĐH Android sử dụng để đẩy các ứng dụng ít được sử dụng nhất trong thời gian gần. Ví dụ: nếu bạn đang chạy ứng dụng âm nhạc cùng với ứng dụng Email, Facebook, Instagram và Whatsapp thì ứng dụng mà bạn không sử dụng trong một thời gian dài sẽ được đặt ở vị trí đầu của bộ đệm và ứng dụng được sử dụng gần đây sẽ được đặt ở phía sau của hàng đợi bộ đệm LRU.

Ví dụ: nếu ứng dụng Email ít được sử dụng nhất và ứng dụng Facebook là ứng dụng được sử dụng nhiều nhất trên điện thoại di động tại một thời điểm cụ thể, thì ứng dụng Email sẽ được đặt ở phía trước hàng đợi của bộ đệm LRU và ứng dụng Facebook sẽ được đặt ở mặt sau của hàng đợi bộ đệm LRU.

Ngoài ra, nếu ứng dụng được khởi động lại hoặc mở lại, thì nó sẽ được đặt lại ở phía sau trong hàng đợi của bộ đệm.

# Độ ưu tiên của Android Application
Cho đến nay, chúng ta đã thấy rằng, để có một bộ nhớ và quản lý pin phù hợp trong thiết bị Android, Android sẽ đẩy hoặc kill các ứng dụng ít được ưu tiên hơn. Để giải phóng không gian cho thiết bị Android, Android sử dụng một số bộ quy tắc và gán mức độ ưu tiên cho các ứng dụng dựa trên trạng thái chạy hiện tại của ứng dụng. Sau đây là trạng thái quy trình được liên kết với Ứng dụng Android:

Lưu ý: Ưu tiên được xếp theo thứ tự cao hơn đến thấp hơn

1. Foreground process: Một quy trình được cho là ở trạng thái Foreground nếu người dùng đang tương tác với quy trình đó.  Ví dụ: nếu bạn đang xem một số video trên ứng dụng YouTube, thì ứng dụng YouTube sẽ được gọi là ở trạng thái Foreground vì ứng dụng đó hiện đang được người dùng sử dụng. Vì vậy, các ứng dụng ở trạng thái Foreground có mức độ ưu tiên cao nhất.

2. Visible process: Một quá trình được cho là ở trạng thái visible khi hoạt động của ứng dụng có thể nhìn thấy nhưng không phải trong Foreground. :) Hơi khó hiểu nhỉ? Hãy lấy một ví dụ thế này, bất cứ khi nào bạn đang sử dụng một số ứng dụng yêu cầu một số loại quyền thì bạn đang sử dụng quy trình hiển thị. Chẳng hạn, hãy để lấy ví dụ về ứng dụng Instagram, khi bạn muốn tải lên một số hình ảnh từ thiết bị của mình thì ứng dụng sẽ yêu cầu bạn cho phép lưu trữ. Tại thời điểm này, hoạt động trên Instagram của bạn có thể nhìn thấy nhưng không ở phía trước vì, ở phía trước, bạn đang có hộp quyền yêu cầu quyền lưu trữ.

3. Service process: Một quy trình được gọi là Service nếu nó hiện đang chạy nhưng nó không thuộc hai loại trên. Điều này hữu ích cho những ứng dụng thực hiện một số tác vụ nền như tải xuống một số dữ liệu hoặc tải lên một số dữ liệu. Một ví dụ về quy trình dịch vụ là tải lên các tệp trong ổ Google, nơi tải lên các tệp được thực hiện ở chế độ nền.


4. Background process: Một quy trình được cho là ở trạng thái background nếu onStop() method được gọi bởi Android. Giả sử bạn đang sử dụng một số ứng dụng và bạn đột nhiên nhấn nút home của điện thoại di động thì tại thời điểm đó, ứng dụng của bạn sẽ chuyển sang trạng thái Background từ trạng thái Foreground. Ngoài ra, ứng dụng sẽ được đặt trong bộ đệm LRU để nó được gọi bất cứ khi nào người dùng mở lại ứng dụng. Điều này được thực hiện vì bắt đầu từ đầu khó hơn với tiếp tục từ trạng thái trung gian.

5. Empty process: Một quy trình được cho là ở trạng thái empty nếu nó không thuộc phạm vi của bốn trạng thái quy trình được đề cập ở trên. Trong empty process, không có thành phần hoạt động nào của ứng dụng, tức là mỗi và mọi thành phần của quy trình sẽ ở trạng thái dừng. Ứng dụng có thể được đưa vào LRU cho mục đích lưu trữ tốt hơn nhưng khi bộ nhớ không có hoặc có dung lượng thấp, thì sau đó ứng dụng đó cũng sẽ bị xóa khỏi bộ đệm.

# Tại sao phải để ý đến Application life cycle?
Ngay từ đầu bài viết, tôi đã nói với bạn rằng nếu bạn không có kiến thức về vòng đời của Ứng dụng thì hoạt động của ứng dụng sẽ không bị ảnh hưởng nhưng trải nghiệm của người dùng sẽ rất tệ. Khoan đã :open_mouth: ! Vậy, tại sao chúng ta  học Application life cycle nếu nó không ảnh hưởng đến hoạt động của ứng dụng?

Trước khi trả lời câu hỏi này, mình. Tôi muốn các bạn mở Power Use của điện thoại di động bằng các ứng dụng di động có trong điện thoại của bạn.

Đây là của mình:
![](https://images.viblo.asia/498b1ddc-ced0-4a71-a279-703d7d012f1a.jpg)
Bạn có thể thấy rằng ngoài hệ thống Android, tại một thời điểm cụ thể, ứng dụng Hotstar là một ứng dụng phát video được sử dụng 12,1% tổng pin. Ngoài ra, ứng dụng YouTube, một lần nữa là ứng dụng phát video được sử dụng 4,7% tổng lượng pin hiện có. Điều này là do cả hai ứng dụng này sử dụng một số loại truyền dữ liệu qua Internet và pin đang được sử dụng để thiết lập, duy trì và ngắt kết nối dịch vụ.

Điều gì sẽ xảy ra nếu ứng dụng của bạn mất hoặc sử dụng nhiều pin? Ứng dụng của bạn sẽ được người dùng ưa thích sử dụng chứ? Câu trả lời là không. Trong khi tạo một ứng dụng Android, bạn nên xử lý từng trạng thái ứng dụng của ứng dụng Android.

Ví dụ: nếu bạn đang sử dụng một số thao tác nhận và gửi dữ liệu trong ứng dụng của mình và bạn muốn quản lý và giữ session bất cứ khi nào ứng dụng chạy thì bạn nên xử lý các thao tác sẽ được thực hiện khi ứng dụng của bạn ở trạng thái background. Nếu ứng dụng của bạn ở trạng thái background thì bạn không nên tổ chức session vì điều này sẽ dẫn đến việc sử dụng tài nguyên nhiều hơn và đến lượt nó, sẽ sử dụng nhiều pin và bộ nhớ hơn. Vì vậy, ở trạng thái onPause (), bạn nên nhả  session và ở trạng thái onResume (), bạn nên xây dựng lại và session và thực hiện các thao tác còn lại.

Bằng cách đó, ứng dụng của bạn sẽ có tác động tốt đến người dùng và người dùng của bạn sẽ giới thiệu ứng dụng cho bạn bè của họ. Vì vậy, vòng đời ứng dụng Android là rất quan trọng để tạo ra một ứng dụng Android.

# Kết luận
Trong bài viết này, chúng ta đã tìm hiểu về vòng đời của Application trong Android. Chúng ta đã thấy các trạng thái khác nhau có thể ảnh hưởng đến hoạt động của các ứng dụng Android trên điện thoại. Chúng ta cũng thấy làm thế nào để có thể  sử dụng vòng đời của Application để tạo một ứng dụng có ấn tượng tốt cho người dùng và sẽ giúp bạn tạo một ứng dụng có thể tiếp cận với hàng tỷ người dùng.

Nguồn tham khảo: https://blog.mindorks.com/understanding-the-application-lifecycle-in-android