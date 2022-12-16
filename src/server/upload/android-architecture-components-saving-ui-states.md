# Lưu giữ trạng thái UI
Dù bạn làm cách nào, giữ trạng thái UI là một phần quan trọng trong trải nghiệm người dùng. Cho dù người dùng xoay thiết bị, người dùng khởi động lại ứng dụng hay hệ thống tắt ứng dụng thì điều quan trọng là hoạt động của bạn sẽ duy trì trạng thái mà người dùng mong đợi.

Trong trường hợp dữ liệu giao diện người dùng cần lưu giữ đơn giản và nhẹ, bạn có thể sử dụng onSaveInstanceState() để lưu dữ liệu trạng thái của mình. Trong trường hợp bạn có dữ liệu phức tạp mà bạn muốn lưu giữ, bạn có thể sử dụng kết hợp các đối tượng ViewModel , phương thức onSaveInstanceState() và lưu trữ local.

Bài này thảo luận về từng phương pháp.

## Các trường hợp đơn giản: onSaveInstanceState ()
onSaveInstanceState() được thiết kế để lưu trữ một lượng dữ liệu tương đối nhỏ cần thiết để dễ dàng tải lại trạng thái của bộ điều khiển giao diện người dùng, chẳng hạn như một Activity hoặc Fragment, nếu hệ thống dừng lại và sau đó tái tạo bộ điều khiển đó. Callback này có nghĩa là để xử lý hai tình huống:

* Do hạn chế về bộ nhớ, hệ thống sẽ hủy quá trình của ứng dụng trong khi ứng dụng đang ẩn.
* Thay đổi cấu hình , chẳng hạn như xoay màn hình hoặc thay đổi sang ngôn ngữ khác xảy ra.

Vì cả hai trường hợp đều ngụ ý, onSaveInstanceState() được gọi ra trong các tình huống trong đó Activity bị dừng lại, nhưng không kết thúc bởi hệ thống. Ví dụ: nếu người dùng rời ứng dụng trong vài giờ và hệ thống sẽ đẩy quá trình có liên quan khỏi bộ nhớ, hệ thống sẽ gọi việc thực hiện mặc định của onSaveInstanceState() để lưu từng bộ điều khiển UI có ID. Sau đó, khi người dùng quay lại ứng dụng, hệ thống sẽ khôi phục hoạt động từ trạng thái lưu lại.

***Lưu ý***: onSaveInstanceState() không được gọi khi người dùng đóng Activity một cách cố ý hoặc trong các trường hợp khác khi finish() được gọi.

Hệ thống sẽ tự động lưu lại và khôi phục rất nhiều dữ liệu UI cho bạn: Việc thực hiện mặc định của onSaveInstanceState() lưu thông tin về trạng thái của phân cấp chế độ xem của Activity, chẳng hạn như văn bản trong một EditText hoặc vị trí cuộn của một ListView . Bạn cũng có thể lưu dữ liệu tùy chỉnh bằng cách override onSaveInstanceState(). Nếu bạn ghi đè lên phương thức này, bạn nên gọi thực hiện mặc định (super) để lưu trữ những thông tin mà hệ thống mặc định sẽ lưu rồi thêm vào các dữ liệu tùy chỉnh của bạn, trừ khi bạn không cần những thông tin mặc định đó.

onSaveInstanceState() không được thiết kế để lưu trữ số lượng lớn dữ liệu, chẳng hạn như bitmap, hoặc các cấu trúc dữ liệu phức tạp đòi hỏi phải serialization dài hoặc deserialization. Việc tuần tự hoá (serialization) có thể tiêu tốn rất nhiều bộ nhớ nếu các đối tượng đang được tuần tự hóa phức tạp. Bởi vì quá trình này xảy ra trên main thread trong quá trình thay đổi cấu hình, việc tuần tự hóa có thể gây ra lag nếu mất quá nhiều thời gian. Do đó, thay vì sử dụng onSaveInstanceState() cho các cấu trúc dữ liệu phức tạp, hãy đảm bảo lưu trữ các cấu trúc đó trong bộ nhớ local; bạn nên lưu trữ dữ liệu ngay khi nó được tạo ra để giảm thiểu nguy cơ mất nó. Sau đó, sử dụng onSaveInstanceState() để lưu trữ ID duy nhất cho mỗi đối tượng này.

Phần tiếp theo của tài liệu này cung cấp thêm chi tiết về việc lưu trữ các dữ liệu phức tạp hơn.

## Quản lý các trạng thái phức tạp hơn: chia để trị (divide and conquer)
Khi bạn có các cấu trúc dữ liệu phức tạp hơn mà bạn cần phải lưu giữ khi một Activity kết thúc, bạn có thể lưu và khôi phục trạng thái giao diện người dùng một cách hiệu quả bằng cách phân chia công việc giữa nhiều loại cơ chế lưu trữ.

Có hai cách chung mà người dùng có thể rời khỏi một Activity, dẫn đến hai kết quả khác nhau mà người dùng có thể mong đợi:

* Người dùng hoàn toàn đóng Activity. Người dùng có thể đóng toàn bộ Activity nếu họ vuốt Activity khỏi màn hình Recents, điều hướng lên từ Activity hoặc quay lại Activity. Giả định trong những trường hợp này là người dùng đã vĩnh viễn rời khỏi Activity, và nếu họ mở lại Activity, họ sẽ bắt đầu từ một trạng thái mới.
* Người dùng xoay điện thoại hoặc đưa Activity xuống nền và sau đó quay trở lại. Ví dụ: người dùng thực hiện tìm kiếm và sau đó bấm nút home hoặc trả lời cuộc gọi điện thoại. Khi họ trở lại Activity tìm kiếm, họ mong đợi tìm kiếm từ khóa và kết quả tìm kiếm ở đó, chính xác như trước.

Để thực hiện hành vi cho cấu trúc dữ liệu phức tạp trong cả hai tình huống, bạn nên sử dụng bộ nhớ local, lớp ViewModel và phương thức onSaveInstanceState() . Mỗi cách tiếp cận này lưu trữ một loại dữ liệu khác nhau được sử dụng trong hoạt động.

* Local storage: Lưu trữ tất cả dữ liệu bạn không muốn mất nếu bạn mở và đóng hoạt động (local storage có là SharedPreferences, database, file...).
    * Ví dụ: List các bài hát, có thể bao gồm tệp âm thanh và metadata.
* ViewModel : lưu trữ trong bộ nhớ tất cả dữ liệu cần thiết để hiển thị bộ điều khiển giao diện liên quan.
    * Ví dụ: Đối tượng bài hát của tìm kiếm gần đây nhất và truy vấn tìm kiếm gần đây nhất.
* onSaveInstanceState() : Lưu trữ một lượng nhỏ dữ liệu cần thiết để dễ dàng tải lại trạng thái Activity nếu hệ thống dừng lại và sau đó tái tạo bộ điều khiển UI. Thay vì lưu trữ các đối tượng phức tạp ở đây, tồn tại các đối tượng phức tạp trong lưu trữ cục bộ và lưu trữ một ID duy nhất cho các đối tượng này trong onSaveInstanceState() .
    * Ví dụ: Lưu trữ truy vấn tìm kiếm gần đây nhất.

Ví dụ: hãy xem xét một Activity cho phép bạn tìm kiếm thư viện bài hát của mình. Dưới đây là cách xử lý các sự kiện khác nhau:

1. Khi người dùng thêm một bài hát, ViewModel ngay lập tức ủy thác persisting dữ liệu này trong local storage. Nếu bài hát vừa được thêm vào này là một cái gì đó cần được hiển thị trong giao diện người dùng, bạn cũng nên cập nhật dữ liệu trong đối tượng ViewModel để phản ánh việc bổ sung bài hát. Hãy nhớ làm tất cả các query cơ sở dữ liệu ở background thread.

2. Khi người dùng tìm kiếm một bài hát, bất kể dữ liệu bài hát phức tạp nào bạn tải từ cơ sở dữ liệu cho UI Controller phải được lưu trữ ngay lập tức trong đối tượng ViewModel . Bạn cũng nên tự lưu truy vấn tìm kiếm vào đối tượng ViewModel .

3. Khi Activity đi vào background, hệ thống sẽ gọi onSaveInstanceState() . Bạn nên lưu truy vấn tìm kiếm trong onSaveInstanceState() . Số lượng nhỏ dữ liệu này rất dễ lưu. Đó cũng là tất cả thông tin bạn cần để có được Activity trở lại trạng thái hiện tại của nó.

## Phục hồi trạng thái phức tạp: lắp lại các mảnh
Khi đã đến lúc người dùng trở lại Activity, có hai kịch bản cho việc tái tạo Activity:

* Activity được tạo lại sau khi hệ thống ngừng hoạt động. Activity có truy vấn được lưu trong một onSaveInstanceState() và pass truy vấn tới ViewModel . ViewModel thấy rằng nó không có kết quả tìm kiếm được lưu trữ, và tải các kết quả tìm kiếm, sử dụng truy vấn tìm kiếm đã cho.
* Activity được tạo ra sau khi thay đổi cấu hình. Activity có truy vấn được lưu trong onSaveInstanceState() và ViewModel đã có kết quả tìm kiếm được lưu trữ. Bạn pass truy vấn từ onSaveInstanceState() tới ViewModel , xác định rằng nó đã nạp các dữ liệu cần thiết và nó không cần phải truy vấn lại cơ sở dữ liệu.

**Lưu ý**: Khi một Activity ban đầu được tạo, onSaveInstanceState() không chứa dữ liệu, và đối tượng ViewModel trống rỗng. Khi bạn tạo ra đối tượng ViewModel , bạn pass sang một truy vấn rỗng, cho biết đối tượng ViewModel rằng không có dữ liệu nào để tải. Do đó, Activity bắt đầu ở trạng thái rỗng.

Tùy thuộc vào việc thực hiện Activity của bạn, bạn có thể không cần phải sử dụng onSaveInstanceState(). Ví dụ: trình duyệt có thể đưa người dùng quay lại trang web chính xác mà họ đang xem trước khi họ thoát khỏi trình duyệt. Nếu Activity của bạn hoạt động theo cách này, bạn có thể bỏ qua bằng cách sử dụng onSaveInstanceState() và thay vào đó lưu giữ mọi thứ ở local. Trong ví dụ về tìm kiếm bài hát, điều đó có thể có nghĩa là vẫn tiếp tục truy vấn gần đây nhất trong Tùy chọn chia sẻ.

Ngoài ra, khi bạn mở một Activity từ một Intent, Bundle được chuyển đến Activity cả khi cấu hình thay đổi và khi hệ thống khôi phục hoạt động. Nếu truy vấn tìm kiếm đã được thông qua như một mục đích khác, bạn có thể sử dụng extra bundle thêm thay vì bundle của onSaveInstanceState() .

Trong một trong hai kịch bản này, bạn vẫn phải sử dụng một ViewModel để tránh lãng phí các chu kỳ tải lại dữ liệu từ cơ sở dữ liệu trong quá trình thay đổi cấu hình.

Nguồn: https://developer.android.com/topic/libraries/architecture/saving-states.html