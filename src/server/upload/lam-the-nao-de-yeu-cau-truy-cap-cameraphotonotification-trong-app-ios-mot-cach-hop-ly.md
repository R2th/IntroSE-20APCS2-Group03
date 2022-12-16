# Làm thế nào để yêu cầu truy cập Camera/Photo/Notification,.. trong app iOS một cách hợp lý

[Cluster](https://cluster.co/) là một ứng dụng mạng xã hội cho phép người dùng chia sẻ Ảnh/Video/Note với nhau hoặc với từng nhóm. Khác với việc xây dựng ứng dụng trên nền web chỉ cần chú trọng vào giao diện người dùng, đối với một ứng dụng mobile, như bao ứng dụng mạng xã hội khác, Cluster không những cần người dùng tải xuống các nội dung từ Internet mà còn yêu cầu truy cập một số dữ liệu như location hay dữ liệu cá nhân khác (contacts, photos, videos).

Tôi đặc biệt ấn tượng với cách mà họ nghiêm túc dành thời gian để làm sao có thể nhận được lượng tương tác dữ liệu lớn nhất từ người dùng, giảm thiểu đến mức thấp nhất số người dùng nhấn nút "Don't Allow" cho mọi request access của họ.

Và sau đây là bài học rút ra: Không bao giờ hỏi người dùng quyền truy cập dữ liệu cá nhân của họ khi mà bạn chưa thực sự cần chúng và hãy đảm bảo rằng người dùng nhận thấy việc chia sẻ dữ liệu là cần thiết đối với họ.

Hãy cùng tìm hiểu xem cách mà Cluster tiếp cận người dùng cùng một số dữ liệu cá nhân của họ một cách tự nhiên như thế nào:

## Yêu cầu quyền truy cập dữ liệu cá nhân ngay lần đầu khởi động là một ý tưởng tồi
Đối với rất nhiều app, việc không được phép truy cập vào cảm biến (GPS) hoặc dữ liệu có thể ảnh hưởng đến toàn bộ trải nghiệm người dùng. Ví dụ đối với một ứng dụng phụ thuộc vào vị trí người dùng đang đứng (tìm quán ăn, cafe, xe bus, tìm bạn,...) việc người dùng không cho phép ứng dụng truy cập location có thể khiến ứng dụng trở nên vô dụng. 

Hoặc việc sử dụng Push notification một cách hợp lý có thể giúp tăng thói quên sử dụng ứng dụng của bạn, tuy nhiên nếu không việc người dùng không cho phép nó sẽ khiến chúng ta vĩnh viễn mất đi cơ hội này.

Mọi việc sẽ thực sự tồi tệ khi người dùng nhấn vào nút "Don't Allow", vì sau đó chúng ta sẽ không dễ dàng để khiến người dùng thay đổi quyết định đó. Phải mất đến 5 bước làm cho người dùng có thể vào tận sâu bên trong Setting và tiến hành cấp lại quyền:

![](https://images.viblo.asia/99ce2331-422d-4f6e-814f-6fcdffe6d6b0.jpeg)

Nói cách khác, nếu người dùng đã nhấn vào "Don't Allow", ứng dụng sẽ hoạt động không đúng cách và gần nhưng không còn cách để sửa sai. Và việc cần làm là chúng ta phải làm mọi cách để người dùng nhấn vào nút Allow ngay lần đầu popup ấy xuất hiện.

## Hai phương pháp tiếp cận người dùng thường thấy

### Lời tỏ tình bất ngờ (Không khuyến khích)
Chắc hẳn ai cũng đã thấy ít nhất một ứng dụng kiểu này. Bạn mở một app vừa tải về từ Apple Store và "Bộp" - một popup hiện ra - "Bạn có muốn nhận Notification?" - và ngay sau đó - "Bạn có cho phép ứng dụng sử dụng Camera?" - sau đó là - "Bạn có cho phép ứng dụng sử dụng Contacts?".

Trừ phi người dùng đã sử dụng ứng dụng này từ trước (Facebook, Instagram, WhatsApp có thể không gặp vấn đề này) thì thông thường người dùng sẽ nhấn "Don't Allow". Nó giống như kiểu bạn đang đi trên phố, và có một anh chàng/cô nàng lạ mặt từ đâu chạy lại hỏi bạn có muốn hẹn hò với anh ta/cô ta không?

Version đầu tiên của Cluster tiếp cận người dùng theo hướng này, và theo như thống kê của họ, chỉ có khoảng 30-40% người dùng nhấn nút "Allow"

### Giãi bày trước, tỏ tình sau (Tối ưu hơn)
Phương pháp này tốt hơn đáng kể so với cách "Tỏ tình bất ngờ" kể trên, nhưng đáng buồn là nó vẫn không thực sự hiệu quả như mong đợi.

![](https://images.viblo.asia/8dee53e6-8bcd-42e9-b011-5ea5df57b771.jpeg)

Hình ảnh trên là cách mà ứng dụng HeyDay giãi bày với người dùng những lợi ích của người dùng sẽ nhận được bằng cách cấp quyền truy cập cho ứng dụng. Sau khi người dùng được học hết về những điều trên, ứng dụng sẽ đưa ra lời "tỏ tình". Sử dụng cách này, theo như Cluster, phần trăm người dùng nhấn nút Allow tăng từ 40% lên 66%.

Qua đây ta có thể thấy việc giải thích cho người dùng thấy sự cần thiết của việc cấp quyền truy cập quan trọng hơn là chỉ yêu cầu họ quyền truy cập.

## Cách tiếp cận mà Cluster đang thực hiện

Theo thời gian, Cluster nhận thấy rằng họ cần phải học cách khi nào thì cần yêu cầu quyền truy cập thì hợp, và yêu cầu quyền truy cập như thế nào thì sẽ dễ nhận được sự cho phép từ người dùng nhất.

Và sau đây là cách họ thiết kế ứng dụng để hộp thoại yêu cầu quyền truy cập sẽ hiển thị lên khi và chỉ khi họ biết chắc chắn rằng người dùng có ý định nhấn "Allow".

### Dialogs "giả" xuất hiện trước Dialog hệ thống thật

Như đã nói ở trên, điều tồi tệ nhất là để người dùng nhấn từ chối cho phép truy cập, bởi vì việc đảo lộn quyết định đó ở iOS là cực kì phức tạp. Nhưng với cách này, chúng ta hỏi trước khi dialog hệ thống hiện lên thì cho dù người dùng có "say no" thì ta vẫn còn cơ hội để hỏi "cô ấy" ở một thời điểm nào đó khi mà rất có thể khi ấy cô ta sẽ "say yes".

Riêng đối với quyền truy cập Photos, có đến 46% người dùng nhấn từ chối trước đó đã thay đổi ý định và nhấn Allow khi được hỏi vào một thời điểm thích hợp hơn sau đó.

#### Thật giả lẫn lộn
Trong phiên bản Cluster trước đây, khi yêu cầu truy cập ảnh, về cơ bản chúng họ sẽ yêu cầu người dùng hai lần.
![](https://images.viblo.asia/11901fd3-2b47-4ba7-9129-88107f539bf0.jpeg)

Hộp thoại đầu tiên - hộp thoại giả (ảnh thứ 2) được thiết kế theo style mặc định, một giá trị cho biết người dùng không đồng ý nếu người dùng nhấn Not now. Và như vậy Cluster không phung phí một cơ hội duy nhất của mình nếu người dùng chưa thực sự sẵn sàng tại thời điểm đó. 

Chỉ có 3% người dùng nhấn vào "Don't Allow" sau khi đã nhấn "Give Access", điều đó có nghĩa là ít hơn 2% người dùng không cho phép quyền truy cập tại dialog của hệ thống.

Tuy có vẻ hơi khó chịu khi hỏi người dùng những hai lần, tuy nhiên với cách này Cluster đã loại bỏ gần như hoàn toàn khả năng người dùng nhấn không đồng ý, và mở ra cánh của để có thể yêu cầu lần hai đối với những người dùng khó tính.


#### Đưa ra hộp thoại hướng dẫn trước
Khi yêu cầu quyền truy cập Danh bạ, Cluster sẽ đưa ra một hộp thoại hướng dẫn trước giải thích đầy đủ những gì đang diễn ra, và sau đó là hộp thoại của hệ thống.

![](https://images.viblo.asia/d282e618-6530-4c5a-8e14-4255255a0a22.jpeg)

Trước tiên họ hiển thị cho người dùng một hộp thoại giải thích lý do vì sao ứng dụng cần sử dụng sổ địa chỉ và cho phép người dùng lựa chọn hoặc cho phép quyền truy cập hoặc tự nhập liên hệ bằng tay. Và tất nhiên dialog hệ thống yêu cầu quyền truy cập Contacts chỉ hiện thị khi người dùng lựa chọn "Use Address book".

Như đã nói ở trên, tuy hơi phiền khi hỏi người dùng hai lần, nhưng kết quả thu được là không người dùng nào nhấn "Don't Allow" ở hộp thoại hệ thống. Và khi người dùng đã "nếm mùi đau khổ" với lựa chọn "nhập liên hệ bằng tay", thì một lần nữa, Cluster đưa ra một lời nhắc khác cho phép họ import Contact tại thời điểm thích hợp đó. 

Với cách này, gần như việc người dùng nhấn "Don't Allow" không còn xuất hiện nữa, rất ít người dùng nhấn vào lựa chọn này khi hộp thoại hệ thống xuất hiện. Rất thành công phải không nào?

### Hộp thoại do người dùng tự kích hoạt (Cách thành công nhất)

Mặc dù với phương pháp kể trên, người dùng đã không còn nhấn “Don’t Allow” để từ chối quyền truy cập ở dialog của  hệ thống. 

Tuy nhiên cách này vẫn chưa thực sự hiệu quả đối với những người không thực sự muốn cấp quyền truy câp cho app, khi mà họ nhấn từ chối ngay ở hộp thoại đầu tiên app đưa ra.

Hộp thoại đầu tiên chỉ góp phần làm giảm khả năng người dùng chọn “Don’t Allow” chứ vẫn chưa giúp làm tăng khả năng người dùng chấp nhận việc chia sẻ dữ liệu riêng tư của mình.

Có vẻ như người dùng sẽ không phản hồi một cách tích cực khi được hỏi, thay vào đó, nếu là một lời nhắc hay gợi ý thì kết quả sẽ khác. Thực tế là đối với Cluster, một luồng thử nghiệm trên một số lượng user nhất định cho thấy tỉ lệ nhấn “Allow” đã gần như đạt 100%. (Tôi sẽ có bài viết khác viết về làm sao để có thể tiến hành một số tính năng thử nghiệm trên một nhóm user nhất định, đón đọc nhé)

#### Đối với quyền truy cập Photo

Ở một version cũ hơn, bước đầu tiên để tạo một tài khoản trên Cluster đó là thêm một hình ảnh. Điều đó có nghĩa là ứng dụng sẽ yêu cầu quyền truy cập Photos ngay sau khi người dùng nhấn  “Create Cluster”.

Kết quả là số lượng người dùng cho phép ứng dụng sử dụng quyền truy cập Photo đạt 67%, nhưng vẫn còn có thể cải thiện được.

![](https://images.viblo.asia/e1e66db3-612e-4d78-94fc-e2de9fee83db.jpeg)

Cluster đã tiến hành một bước cải tiến đáng kể, chức năng upload hình ảnh được dời về phía sau bước tạo tài khoản Cluster. 

Khi mà người dùng đã có được một số hiểu biết đáng kể về ứng dụng, và họ cảm thấy cần phải nhấn vào nút Camera để tải một hình ảnh lên cho tài khoản của mình, sẽ không khó khăn để lựa chọn “Allow” khi hộp thoại hệ thống xuất hiện đúng không nào?

Kết quả là tỉ lệ người dùng nhấn “Allow” quyền truy cập Photo đã tăng từ 67% lên 89%.

#### Contacts

Đặt mình vào phương diện người dùng, hẳn chúng ta luôn tự hỏi “tôi sẽ được hưởng lợi gì nếu nhấn vào nút cho phép ứng dụng sử dụng Contacts của mình?” 

Như cách mà tôi đã đề cập ở bên trên, trong những version trước, khi mà Cluster cho phép người dùng chọn lựa giữa việc sẽ nhập danh sách liên hệ một cách thủ công và nhập danh sách liên hệ một cách tự động (cấp quyền truy cập). 

Với cách này khi người dùng cảm thấy khốn khổ khi phải nhập thủ công, họ sẽ được hỏi có muốn nhập Danh bạ tự động không? Tuy nhiên lợi ích tại thời điểm đầu tiền được hỏi là không rõ ràng, nên vẫn sẽ có một số người dùng nhấn Từ chối.

![](https://images.viblo.asia/d3cf195b-2a3a-4ab3-91d3-4da400b8d8cd.jpeg)

Cluster đã làm gì để thay đổi? Họ vẫn cho phép dùng tìm kiếm bạn bè, nhưng hiển thị ra một danh sách rỗng, và một gợi ý được xuất hiện hỏi người dùng có muốn hiển thị danh sách bạn bè dựa trên Danh sách liên hệ trên iPhone của họ không?

Người dùng thường sẽ lựa chọn gợi ý này vì trước đó không thể tìm được bạn bè nào để tương tác. Lợi ích quá hiển nhiên nên không quá ngạc nhiên khi tỉ lệ người dùng đồng ý đạt 100% mỗi khi được hỏi quyền truy cập Danh bạ.


#### Push Notifications
Giống như câu hỏi đặt ra ở trên, người dùng nhận được lợi ích gì khi cung cấp quyền Push Notification cho ứng dụng. Đối với Cluster, họ sẽ biết được các hoạt động cũng như tương tác từ bạn bè.

![](https://images.viblo.asia/dbc92c58-b4f6-4e4a-980e-2188a2db7336.jpeg)

Cluster đã làm gì? Khi người dùng đã tạo tải khoản thành công và kết nối được với một số bạn bè, một lời gợi ý về Notification mới được đưa ra “Bạn có muốn nhận được thông báo từ bạn bè không?”.

Nếu họ nhấp “Notify me” thì app mới thực sự yêu cầu quyền Push Notification, nếu họ nói “No, thanks” thì không sao cả, họ vẫn có thể tiếp tục và ứng dụng sẽ hỏi lại tại một thời điểm thích hợp khác.

Kết quả là tỉ lệ người dùng nhấn “Allow” đạt 100% khi người dùng chọn “Notify me”


# Tổng kết

Trên đây chúng ta vừa tìm hiểu cách mà ứng dụng Cluster đã làm để nhận được tỉ lệ đồng ý cao nhất cho mỗi request quyền truy cập các dữ liệu nhạy cảm liên quan đến người dùng. Bài học rút ra là:

- Không bao giờ hỏi quyền truy cập dữ liệu người dùng khi mà ta chưa thực sự cần đến nó

- Hãy làm cho người dùng thấy được ngay tức thì lợi ích của họ khi nhấn chọn Đồng ý cho mỗi yêu cầu của ứng dụng.

Bạn đã/đang/sẽ thử áp dụng những cách như thế nào để tăng lượng tương tác dữ liệu từ người dùng trong app của mình? Đừng ngại để lại comment/chia sẻ/góp ý bên dưới bài viết.

Thanks for reading!