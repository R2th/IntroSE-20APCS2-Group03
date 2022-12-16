Hiện nay có rất nhiều app sử dụng chế độ Offline,  như Facebook là một ví dụ điển hình. Theo bản thân tôi thấy thì họ cache lại các bài viết của người dùng tại máy của họ để sử dụng cho chế độ Offline.
Bài viết này tôi  chỉ chia sẻ những cách mà tôi biết để làm cho app hoạt động ở chế độ Offline. Nếu có cách nào hay hơn thì bạn hãy chia sẻ nhé!
Và các giải pháp đó là:

1. Database như là Realm, SQLite, CoreData
2. Cache không chuẩn hoá như PINCache, NSURLCache, AlamofireCache
3. Mô hình được chuẩn hoá như RocketData
4. Lưu dữ liệu vào file hệ thống

Cũng có nhiều cách khác nhau được sử dụng để implement chế độ Offline và ta sẽ cân nhắc cách nào là phù hợp nhất để sử dụng cho app của mình. Nhưng đến đây bạn có thắc mắc tại sao app của mình cần hoạt động ở chế độ Offline không ?

## Tại sao chế độ Offline lại quan trọng ?
Trước tiên, đó là vấn đề về *tốc độ*. Tại sao ?
Theo một nghiên cứu thì 40% người dùng từ bỏ các trang/màn hình mất 3s để tải. Mọi người dùng, ngay cả bạn cũng mong muốn các trang phải phản hồi ngay lập tức và có sự linh hoạt. Nếu họ thấy quá trình loading quá lâu, hẳn trong đời bạn đã từng gặp 1 app native, 1 webpage hiển thị icon loading gây ức chế. Lúc đó bạn chỉ muốn kill nó đi ngay lập tức và không có thiện cảm với nó, minh chứng là họ sẽ tìm 1 page hoặc 1 app khác có tốc độ nhanh hơn. Nhưng nếu ứng dụng của bạn hoạt động ngay cả khi Offline thì nó sẽ nhanh hơn rất nhiều ngay cả khi kết nối mạng kém.

Thứ hai, theo Business2Community ước tính rằng 15% lượng app sử dụng tại Mỹ là ngoại tuyến, còn với thị trường quốc tế thì nó còn cao hơn nữa. Người dùng có thể đang ở trên máy bay, hoặc ở trong 1 quán cafe có kết nối mạng không ổn định. Nếu ứng dụng không đáp ứng được trong điều kiện này thì ứng dụng của bạn bị điểm trừ khá lớn từ khá nhiều người dùng rồi => Không còn sử dụng ứng dụng của bạn nữa

## Caches vs Databases
Khi áp dụng một giải pháp offline, ta nên quyết định sử dụng giữa cache hoặc database. Database có thể là một sự lựa chọn hợp lý, nhưng lưu ý đừng quá lạm dụng nó. Cache thì đơn giản hơn và phù hợp với nhiều ứng dụng.
Với database thì có một số option tôi đã nêu bên trên như Realm, SQLite, CoreData. Ta phải khai báo các model, load data khi có mạng và "nhét" nó vào database. Sau đó nhiệm vụ của viewcontrollers là lắng nghe các truy vấn và cập nhật lên view mỗi khi dữ liệu thay đổi.

Khi ta sử dụng cache, ta load data từ cache song song với load data từ mạng. Dữ liệu được lưu trong bộ nhớ cache mà không cần cấu trúc chúng, đơn giản là một phiên bản chuyển tiếp của dữ liệu từ mạng. Điều này có nghĩa giống như bạn load data từ 1 API và nó trả ra dữ liệu ngay cả khi bạn Offline. Các phương pháp dùng cache phổ biến là PINCache, NSURLCache, Alamofire Cache (tôi hay sử dụng cái này)

Ưu điểm khi dùng Database:
- Bạn có thể lưu trữ toàn bộ những thông tin bạn muốn của một user mà không sử dụng quá nhiều dung lượng của ổ cứng
- Dễ dàng viết logic giới hạn dữ liệu hiển thị trên thiết bị
- Local search với số lượng bản ghi tương đối lớn với tốc độ nhanh

Ưu điểm khi dùng Cache
- Không thể download toàn bộ dữ liệu của user và cần thu thập dữ liệu đơn giản
- Đã viết cho phần load data khi có mạng mà không cần phải viết lại khi ở chế độ offlint
- Là giải pháp đơn giản, nhẹ nhàng mà linh hoạt

Nhược điểm khi dùng Database
- Dành thời gian để cấu trúc dữ liệu, nếu gặp vấn đề thì lại thêm thời gian để nghiên cứu và đưa ra hướng giải quyết
- Cập nhật model và migrate lại bất cứ khi nào có sự thay đổi dữ liệu
...

Mặc dù có một số nhược điểm và sự lạm dụng database nhưng đối với một số ứng dụng nó là 1 sự lựa chọn khá hữu ích, ví dụ: Database sẽ hoạt động tốt cho trình phát podcast, trò chơi, user sẽ không muốn xoá trò chơi đã lưu(trừ khi xoá thủ công).

Mặt khác với cache, với một số ứng dụng về mạng xã hội thì đó là 1 sự lựa chọn phù hợp. Nó không tải xuống toàn bộ nội dung cho user và khi họ xem app(ví dụ xem tin, đọc báo) thì số lượng bản ghi trong database sẽ tăng một cách nhanh chóng. Còn với cache thì nó sẽ xoá các bài cũ đi để dành chỗ cho bài mới nên không lo về độ lớn của dữ liệu khi đọc nhiều. Ngòai ra, cũng không cần quan tâm đến sự thay đổi của dữ liệu để migrate và lỗi dữ liệu

## Chuẩn hoá và không chuẩn hoá dữ liệu
Có 2 cách sử dụng để lưu dữ liệu trong cache
- Dữ liệu không chuẩn hoá
- Dữ liệu chuẩn hoá

Hầu hết các dữ liệu của ứng dụng có thể được hình dung có cấu trúc giống như cây (tree). Khi lưu trữ dữ liệu dạng này, bạn chỉ cần lưu toàn bộ cây dứoi dạng một entry trong cache giống như hình dưới đây
![](https://images.viblo.asia/04863981-57ca-4a13-8fab-8df902342d06.png)

Đây là cách dễ dàng nhất để sử dụng cache. Bạn có thể triển khai nó chỉ bằng một vài dòng code và dễ dàng chọn id duy nhất cho các đối tượng (ví dụ: Ta lưu trữ từng đối tượng với URL dùng để fetch đối tượng đó về)

Tuy nhiên ta thấy rằng Author với id=13 sẽ bị lưu 2 lần vào database với dạng object lồng nhau. Nó có nghĩa là nếu lưu article với id = 3 khi cập nhật author, lần tiếp nếu đọc article với id = 42, ta sẽ lấy ra bản ghi của author cũ. Nếu tính nhất quán này quan trọng, ta có thể xem xét bình thường hoá dữ liệu trước khi lưu trữ. Có nghĩa là tách cây thành mô hình con và lưu trữ từng mô hình dưới một id duy nhất. Ví dụ

![](https://images.viblo.asia/9c09d9f0-339e-4fa6-9b63-ad194528b1bd.png)

Lưu ý răng đây không phải là database. Mỗi entry là một cục dữ liệu phi cấu trúc với khoá chính là một id. 

Lưu ý: Do chi phí lưu trữ với phương pháp bên trên, giải pháp này không thực sự tốt với việc sử dụng dung lượng hơn cache không chuẩn hoá

## Downloading data from a Server

Có một vài tuỳ chọn để lấy dữ liệu từ mạng và bộ đệm hoặc cơ sở dữ liệu.

Đơn giản nhất là luôn lấy dữ liệu từ cache và mạng song song nhau. Nếu cache trả về trước thì gọi completion block với data đã được lưu. Sau đó khi kết thúc quá trình call api thì gọi completion block với dữ liệu mới. Điều này cho phép chứa hầu hết logic bộ nhớ cache trong tầng network và tất cả các viewcontrollers cần làm là hiển thị dữ liệu

Tuy nhiên cách tiếp cận này đôi khi sẽ gọi 2 lần completion. Đối với một số app, nó sẽ có vấn đề, vì thế chỉ có thể xem xét sử dụng dữ liệu được lưu trong cache nếu mạng chậm. Chỉ hiển thị dữ liệu trong cache nếu mạng bị lỗi hoặc timeout. Nên thiết lập timeout ngắn, khi Offline các request thường sẽ hết thời gian chờ sau 1 phút thay vì bắn ra error ngay lập tức

Một giải pháp khác là đặt cache hoặc database giữa viewcontrollers và network. Trong mô hình Reactive, ta lấy các model từ DB và lắng nghe những thay đổi. Khi request network kết thúc, nó sẽ chỉnh sửa DB và viewcontrollers sẽ cập nhật các thay đổi đó.

Cuối cùng, sử dụng giải pháp đồng bộ hoá DB như Realm hoặc Firebase sẽ lưu trữ một phiên bản DB trên server và các thay đổi sẽ được tự động đồng bộ hoá với client

## Uploading data

Khi user thay đổi dữ liệu trên một ứng dụng, nó khó để quyết định cách thức hoạt động của nó trong kết nối mạng kém. Cách đơn giản nhất là hiển thị một icon loading  và chờ yêu cầu kết thúc. Ta có thể chặn UI và nếu cần thì thông báo cho user có lỗi gì đó bằng bằng dialog chẳng hạn. Tuy nhiên đây không phải là cách tốt nhất. Bạn có tin không khi trước đây iMesssage không cho phép gửi tin nhắn khi Offline :(
Giải pháp phổ biến cho vấn đề này là tạo ra 1 queue(hàng đợi) cho các tasks Offline. Nếu 1 request không thành công do kết nối kém thì ta lưu nó vào queue và chạy queue này khi có kết nối mạng. Nghe có vẻ đơn giản nhỉ, trong thực tế thì có khá nhiều vấn đề đó:
1. Thời gian bao lâu thì retry một request?
2. Độ ưu tiên của reuquest như thế nào ?
3. Nếu request cuối cùng thất bại sau nhiều lần retry thì làm sao để thông báo cho người dùng ?
4. Làm cách nào để người dùng biết một yêu cầu đang chờ xử lý và chưa được đồng bộ?

Trên hết, cần revert data nếu upload fails. Chú ý các xử lý sau:

1. User thích một thứ  A gì đó trên phone khi Offline
2. User cũng thích 1 thứ A đó trên laptop khi Online
3. Phone kết nối tới internet và donwload data mới nhất cho item A này
4. Tiếp theo, upload item A lên sẽ không thành công vì một số lý do nào đó
5. Phone sẽ revert item A là không được thích (unlike)

Cách mà điện kết thúc ở trạng thái sai lệch. Vì điện thoại không biết là trạng thái nào phù hợp, nó có thể không làm mới từ network. Vậy cần lưu trữ các trạng thái hiện tại và trạng thái server trả về lần gần nhất

## Tính nhất quán
Ở bên trên tôi đã đề cập đến vấn đề lắng nghe thay đổi dữ liệu để cập nhật lên view. Mỗi lần edit cache hoặc database bạn phải update nhiều màn hình trong app. Ta có thể xem xét một vài solution như sau:
- **Lắng nghe thay đổi của database**: Hầu hết các cơ sở dữ liệu cung cấp khả năng lắng nghe các model. Nếu sử dụng DB thay vì cache thì đây là giải pháp đơn giản nhất. Với Realm bạn có thể tham khảo tại [đây](https://docs.realm.io/sync/)
- **Delegation**: Nếu thay đổi chỉ ảnh hưởng đến một vài view trong app có mối liên hệ với nhau. Chỉ cần sử dụng một delegate để chuyển tải sự thay đổi
- **Event Bus**: Cách đơn giản nhất để thực hiện thay đổi tới cache là sử dụng 1 event bus để thông báo tới những nơi lắng nghe thay đổi. Chỉ cần lắng nghe các thay đổi với một id nhất định và nếu nó thay đổi, hãy load lại data từ cache và refresh lại view. NotificationCenter là một giải pháp. Nhưng trong dự án thực tế hiện nay thì NC sẽ không phải là sự lựa chọn tối ưu nhất, nó sắp bị bài trừ vì có quá nhiều vấn đề với một app lớn và có rất nhiều sự thay đổi đến view. Vậy sử dụng gì bây giờ ?. Hãy thử tìm hiểu thư viện RxSwift với Reactive Programming. 
- **Rocket Data** quản lý tính nhất quán cho các model và được thiết kế đặc biệt để hoạt động tốt với cache, đơn giản là lắng nghe thay đổi trên một số id nhất định và thông báo khi model thay đổi

## Kết luận
Đến đây bạn đã có nhiều giải pháp khác nhau để làm cho app hoạt động ở chế độ Offline. Suy nghĩ kỹ về vấn đề và lựa chọn phương pháp phù hợp với app của bạn.
Có nhiều app, cache là giải pháp tốt vì đơn giản dễ dàng loại bỏ cache, không yêu cầu model hoá, migration và không gặp sự cố. Và linh hoạt nhất là sử dụng kết hợp các phương pháp với nhau. 

Trên đây là quan điểm cá nhân của tôi về vấn đề này. Hãy comment để thể hiện suy nghĩ của bạn về vấn đề này nhé! Chúc bạn thành công! 

## Tips
### Nên lưu data ở đâu?
iOS cung cấp thư mục cache để lưu trữ dữ liệu bộ nhớ cache. Tuy nhiên, thư mục này sẽ bị xoá nếu thiết bị sắp hết dung lượng. Với chức năng cơ bản thì đây không phải là nơi tốt nhất.
### Offline Detection on iOS
Apple cũng cung cấp API để thông báo khi kết nối với internet. Tuy nhiên nó không được ổn định. Vì bản thân nó không thực sự request tới network. Nó chỉ cho biết khi nào phần cứng có thể kết nối với internet. 
Tôi hay dùng [Reachability](https://github.com/tonymillion/Reachability). Còn bạn ?

### The Fastest Cache is SQLite!?
Theo quan điểm của tôi thôi là SQLite. Với model thật đơn giản với 3 fields là `id`, `data`, `timestamp`. Sau khi tạo một index gắn với `id`, việc tìm kiếm và lưu trữ nhanh hơn so với FileManager.


### Refs:

> https://github.com/tonymillion/Reachability
> 
> https://docs.realm.io/sync/
> 
> https://developer.apple.com/documentation/foundation/urlcache 
> 
> https://medium.com/device-blogs/the-many-offline-options-for-ios-apps-2922c9b3bff3