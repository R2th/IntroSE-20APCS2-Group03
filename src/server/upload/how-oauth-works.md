### I. Cách hoạt động của OAuth
![](https://images.viblo.asia/6513eebb-4fb4-4561-931c-b8d1a6966371.png)

**OAuth** là một trong những **công nghệ** hầu như bị hiểu nhầm rất nhiều khi nó được đưa vào sử dụng. Trong bài viết này, chúng ta hãy **làm rõ** những điều còn vướng mắc để thực sự hiểu công nghệ đằng sau **OAuth** hoạt động như thế nào. :ok_hand:

Trước hết, từ cái tên bạn có thể đoán **OAuth** có liên quan gì đó đến **Auth**. Nhưng **auth** có nghĩa là **xác thực hoặc ủy quyền** còn **OAuth** có nghĩa **chỉ có nghĩ là ủy quyền**, không phải xác thực. Quan trọng hơn, **OAuth** ban đầu được tạo ra không phải cho một **dịch vụ** để **ủy quyền** cho **một người**. Nó cho phép một dịch vụ cho phép một **dịch vụ** có thể ủy quyền tới một **dịch vụ khác**.

Tại sao, một **dịch vụ** cần được ủy quyền? :scream::scream:

### II. Khi hai dịch vụ được phát triển
Hãy lấy một **ví dụ** điển hình về dịch vụ in ảnh. Bạn chắc hẳn đã thấy những trang web như thế này. Bạn cung cấp cho họ một tệp hình ảnh và bạn trả tiền cho họ để gửi ảnh đã được in đến địa chỉ của bạn.
Hãy tưởng tượng bạn đang bắt đầu một doanh nghiệp in ảnh mới. Bạn xây dựng một trang web cho phép mọi người tải ảnh lên và đặt in trực tuyến. 
Bây giờ, đây là điều. Không ai giữ ảnh trên máy của họ nữa. Họ sử dụng đám mây! Và vì vậy, bạn tiếp tục nhận được các yêu cầu tính năng để cung cấp cho người dùng khả năng **nhập ảnh của họ từ** một nơi nào đó như **Google Drive** và sau đó in ảnh trực tiếp từ đó mà người dùng **không cần phải tải xuống và tải lên lại**. :disappointed_relieved:

![](https://images.viblo.asia/a8314146-f782-4213-ba28-bffe381edc3a.png)

Được rồi, đó là một yêu cầu chính đáng. Bây giờ bạn phải làm gì để **triển khai tính năng** Đăng Nhập từ **Google Drive** cho ứng dụng của mình? Bạn cần kết nối với tài khoản **Google Drive** của người dùng và truy cập tệp của họ. Nhưng đợi đã! Làm thế nào ứng dụng của bạn có thể làm điều đó? Các tệp của người dùng trên **Google Drive** cần xác thực **Google** của người dùng . Làm cách nào bạn có thể viết mã cho trang web của mình để có thể xác thực với **Google** thay mặt cho người dùng của bạn? :poop::face_with_thermometer:

Đây là điều bạn có thể làm. Bạn có thể yêu cầu người dùng cung cấp **ID và mật khẩu Google** của họ. Ứng dụng của bạn có thể nói:

> “Này người dùng, bạn có muốn tôi in ảnh của bạn trên Google không? Google không cấp cho tôi quyền truy cập. Vì vậy, đây là màn hình nơi bạn nhập ID và mật khẩu Google của mình. Đưa chúng cho tôi, và tôi sẽ đăng nhập vào tài khoản Google của bạn và truy cập vào ảnh của bạn và in chúng ”.

![](https://images.viblo.asia/cc5c1e02-9713-4672-a8a5-c59ac45bd59f.jpeg)

Bạn có nghĩ rằng người dùng sẽ giao cho dịch vụ in ảnh của bạn ID và mật khẩu Google của họ không? Họ không tin bạn! Những gì họ muốn cung cấp cho bạn chỉ là **quyền truy cập vào một số ảnh nhất định**. Họ **không muốn** cấp cho bạn quyền truy cập vào toàn bộ ổ đĩa Google và email của họ và mọi thứ khác . Dịch vụ của bạn có thể hứa rằng nó sẽ chỉ truy cập vào ảnh của họ, nhưng không có gì đảm bảo!

> Vì vậy, trong khi điều này hoạt động trên lý thuyết, điều này không thực tế. :vulcan_salute: 

Bây giờ bạn có thể nói - **Google Drive** có tính năng chia sẻ! Bạn có thể yêu cầu người dùng chia sẻ tệp ra và sau đó cung cấp liên kết được chia sẻ tới dịch vụ của bạn. Nhưng cũng có những vấn đề ở đó. Điều gì sẽ xảy ra nếu người dùng không muốn chia sẻ tệp với bất kỳ ai. Ngoài ra, điều gì sẽ xảy ra nếu đó là một tình huống khác mà chia sẻ không phải là một tùy chọn?

Ví dụ: hãy nghĩ đến một tình huống trong đó dịch vụ của bạn muốn truy cập vào danh bạ của người dùng để gửi lời mời ứng dụng? Không có cách nào bạn có thể yêu cầu người dùng chia sẻ danh bạ của họ. Một tính năng như vậy thậm chí không tồn tại! Vì vậy, làm cách nào để bạn có dịch vụ của **bên thứ ba ủy quyền** với một dịch vụ như **Google** mà **không cần người dùng của bạn cung cấp thông tin đăng nhập của họ?** :grinning:

### III. OAuth

**Để giải quyết vấn đề này** về các dịch vụ cố gắng truy cập lẫn nhau thay mặt cho người dùng, đã có một giao thức chuẩn được tạo ra gọi là **OAuth**. Phiên bản đầu tiên được gọi là **OAuth 1**, không phổ biến như vậy. Nhưng phiên bản hiện tại, **OAuth 2**, được  chấp nhận và sử dụng rất rộng rãi. Ngày nay, khi bất kỳ ai đề cập đến OAuth, họ hầu như luôn đề cập đến **OAuth 2**.

Có một ví dụ như sau:
> Hãy nghĩ về công việc của một nhân viên đỗ xe hoặc người phục vụ. Ý tưởng là một chủ sở hữu ô tô lái xe đến một nhà để xe, và thay vì tranh giành một chỗ đậu xe. họ chỉ cần xuống, đưa chìa khóa của mình cho người trông xe và nói, "Này anh trông xe vụ, làm ơn đỗ xe cho tôi". Người phục vụ lấy chìa khóa, lái xe, tìm một vị trí và đậu xe.

Bây giờ tôi sẽ không lấn cấn gì khi giao chiếc xe cũ nát của mình cho bất kỳ người trông xe nào. Nhưng hãy tưởng tượng nếu một anh chàng giàu có đến với một chiếc xe thể thao triệu đô. Họ sẽ có lý khi do dự một chút khi giao chìa khóa. Điều gì sẽ xảy ra nếu người trông xe cố ý lấy chìa khóa và đưa xe đi một đoạn đường dài, mở cốp hoặc mở ngặn đựng đồ cá nhân.

![](https://images.viblo.asia/78a14519-b69d-43e2-b97a-bb088f8c6810.jpeg)

Đây là lý do tại sao một số ô tô đi kèm với một chìa khóa bổ sung gọi là chìa khóa dành cho người đậu xe. Chìa khóa này giống như chìa khóa chính của ô tô nhưng bị giảm khả năng sử dụng. Nó chỉ có thể khởi động và dừng xe. Nhưng nó không thể mở cốp hoặc ngăn đựng đồ cá nhân. Nếu chủ sở hữu chiếc xe thể thao có chìa khóa như vậy, họ sẽ cảm thấy thoải mái hơn khi giao chìa khóa này cho người đỗ xe. Họ biết người đỗ xe không thể làm nhiều việc với chiếc chìa khóa đó ngoài mục đích của họ.

![](https://images.viblo.asia/6c2f64b2-4c68-46fa-a14b-f5e89433a8ad.jpeg)

### IV. Luồng OAuth

**OAuth** là **cơ chế ủy quyền** nơi các dịch vụ có thể ủy quyền cho nhau thay mặt bạn **sau khi bạn đã cấp quyền cho chúng**. Nó thường được gọi là quyền truy cập được ủy quyền vì lý do này. Nó cũng là một tiêu chuẩn mở - vì rõ ràng nó cần phải như vậy - bởi vì nhiều dịch vụ trên internet cần phải giao tiếp với nhau. Vì vậy, có một đặc điểm kỹ thuật mà tất cả các dịch vụ này cần tuân theo để chúng hiểu nhau. Có một quy trình nhất định cần diễn ra để toàn bộ quy trình này hoạt động.

**OAuth** là cơ chế ủy quyền nơi các dịch vụ có thể ủy quyền cho nhau thay mặt bạn sau khi bạn đã cấp quyền cho chúng. Nó thường được gọi là **quyền truy cập được ủy quyền** vì lý do này.

Quay lại ví dụ in ảnh của chúng tôi. **Đây là tình huống:**

- Bạn có một dịch vụ cần truy cập các tệp Google Drive của người dùng
- Chúng tôi có một người dùng đã đăng nhập vào cả dịch vụ này và vào Google. Cả hai dịch vụ **đều tin tưởng người dùng**. Họ chỉ không **tin tưởng lẫn nhau**.
- Vấn đề chúng tôi muốn giải quyết là để hai dịch vụ này hoạt động với nhau.
Nếu cả hai dịch vụ này đều được triển khai **OAuth**, thì đây là cách tương tác hoạt động

![](https://images.viblo.asia/1e39d85b-8a5f-4cad-843b-d89a971ac6af.jpeg)

- Dịch vụ in ảnh chuyển đến Google và nói, "Này, tôi cần tệp của người dùng này".
- Với việc triển khai **OAuth**, Google sẽ làm được điều gì đó thú vị. Nó chuyển đến người dùng và nói:
> “Hãy xem đây, người dùng. Có dịch vụ này ở đây muốn truy cập một số tệp của bạn. Thế này có hợp pháp không đấy? Đây là danh sách những điều mà dịch vụ này muốn làm. Tôi sẽ tiếp tục và cho phép nó? "

- Bây giờ người dùng nhìn thấy một màn hình chỉ định rõ ràng ( Dịch vụ A đang yêu cầu quyền truy cập vào tài khoản Google của người dùng và B) Danh sách các quyền mà dịch vụ muốn là gì.

- Bây giờ nếu người dùng là người đang cố in ảnh, họ sẽ nhìn vào đó và nói:
> “Được rồi, tất cả đều đúng. Vui lòng cho phép truy cập ”.
- Giờ đây, Google có lý do để tin tưởng dịch vụ, vì vậy nó cấp cho dịch vụ một **mã token** (được gọi là mã thông báo ủy quyền) chứa tất cả các quyền được phép. Một "**mã token**", nếu bạn muốn!
- Và bây giờ mỗi khi dịch vụ in ảnh cần truy cập Google Drive, nó chỉ cần đưa mã thông báo này kèm theo yêu cầu và nói:
> “Này Google, tôi cần quyền truy cập vào tệp đó. Đây là mã thông báo mà bạn đã cung cấp cho tôi có quyền truy cập đã được xác minh của người dùng đối với các quyền này. Cho tôi vào!"
- Và mỗi khi điều này xảy ra, Google sẽ nhìn vào token và nói:
> “Hmm, được rồi, đó là hợp pháp. Bạn có thể truy cập cái này ”. Với mã thông báo, dịch vụ ảnh chỉ có quyền truy cập giới hạn vào các quyền mà người dùng đã phê duyệt trước đó
Bạn có thể đã thấy những màn hình này từ Facebook hoặc Google yêu cầu quyền.

![](https://images.viblo.asia/7d1d0c2e-4fe3-4211-bb9d-f5ae3441814a.png)

Màn hình thông báo cho bạn biết dịch vụ nào đang cố gắng thay mặt bạn truy cập những quyền nào. Nếu bạn chấp nhận, mã thông báo truy cập sẽ được chuyển đến dịch vụ cho phép truy cập trong tương lai để bạn không phải nhấp vào cho phép mỗi lần.

### V. Access token

**Mã token** truy cập này trông như thế nào? Nó phải là một mã thông báo chứa thông tin về tất cả các quyền được phép và cũng cần phải chống giả mạo - điều mà dịch vụ có thể xác minh. Làm cách nào để bạn tạo một **mã token** có thể chứa dữ liệu bên trong nó nhưng cũng an toàn để nó không thể bị sửa đổi? Có một định dạng mã thông báo cụ thể được gọi là JWT hoạt động hoàn hảo. Hãy xem [bài viết này](https://medium.com/swlh/how-json-web-tokens-work-211ce7b705f7) để biết cách hoạt động của **JWT**!
Bây giờ bạn đã biết quy trình này hoạt động như thế nào, cũng rõ ràng là tại sao **OAuth** được sử dụng để ủy quyền chứ không phải xác thực. Trong trường hợp này, người dùng đã thực sự được xác thực với cả hai dịch vụ. Vấn đề đang được giải quyết ở đây là làm thế nào để ủy quyền một dịch vụ này với một dịch vụ khác.
**Giờ bạn đã biết quy trình OAuth**, lần tới khi nhìn thấy các màn hình chấp thuận quyền truy cập **OAuth** này, bạn sẽ biết điều gì đang xảy ra và tại sao! Lần tới mình sẽ đi phân tích cấu trúc của một mã token như thế nào. Hãy folow mình để đón đọc bài viết thú zị nhé!

### VI. Tài liệu tham khảo
- https://medium.com/weekly-webtips/how-oauth-works-87fb582c6a6b
- https://medium.com/swlh/how-json-web-tokens-work-211ce7b705f7