# Mở đầu
Trong một dự án iOS, nếu chúng ta muốn dễ dàng viết code thì ngay từ ban đầu, các class phải chia nhỏ ra độc lập với nhau. Và sau đó chúng ta sẽ dễ dàng viết test cho từng phần một. Từ đó, sẽ có những trường hợp mà chúng ta  cần phải có đầy đủ các phần liên quan để test, hoặc là muốn test một phần, nhưng các phần liên quan lại chưa làm xong, hay là dữ liệu chưa được hoàn thiện .... Thì tất cả những vấn đề đó sẽ được giải quyết dựa vào Test Double

Có rất nhiều loại Test Double, nhưng để hiểu rõ hơn, bạn có thể hình dung nó cũng là một module nhưng đã bị lược gọn đi, chỉ để lại các thành phần cốt yếu, sử dụng để hỗ trợ test các module khác. Tuỳ thuốc vào mục đích test, chúng ta sẽ tạo ra các mudule giản lược đó.

# Dummy
Dummy là việc bạn tạo ra một objective nhưng không dùng đến, ngoại trừ việc để combile code.

Ví dụ:

![](https://images.viblo.asia/70438db6-085f-4aeb-906b-992fd82f5112.png)

Giả sử bây giờ chúng ta sẽ test tính đúng đắn của biến area:

![](https://images.viblo.asia/17f51971-b979-47ca-8d01-d610ee092e07.png)

Tuy nhiên, việc khởi tạo yêu cầu bạn bắt buộc phải có 1 protocol là SaverProtocol, mặc dù ở test case này, bạn chẳng dùng cái protocol đấy để làm gì cả. Vì vậy chúng ta sẽ tạo ra một cái DummySaver() chỉ để đủ thành phần để chạy function test mà thôi.

# Fake
Fake là một object đã được implement, nhưng giản lược so với cái gốc. Chúng ta chỉ để lại cái mà chúng ta dùng trong test case đó, còn những phần khác sẽ lược bỏ. Nhằm tăng tốc độ test và giảm độ phức tạp khi test.

Ví dụ:

![](https://images.viblo.asia/9828e011-7d57-4281-8896-001a25dab144.png)

Test tính đúng đắn của countMessage()

![](https://images.viblo.asia/ce864954-1345-4f5a-b297-14ffce615b08.png)

Thay vì thực hiện gọi truy vấn data như thực tế, chúng ta sẽ fake giá trị trả về trong fetchUsers của fakeUserService. Đó chính là cách để chúng ta làm đơn giản đi mà vẫn đạt hiệu qủa như bình thường.

# Stub
Stub là object được tạo ra để thay thế một chức năng cụ thể để chúng ta gọi và sử dụng khi test.

Ví dụ:

![](https://images.viblo.asia/1153222c-87dc-4b5c-ad64-29571aa11419.png)

Bây giờ chúng ta sẽ test usersCountMessage(), sử dụng UsersServiceProtocol. Để thực hiện, chúng ta sẽ tạo ra một StubUsersService: 

![](https://images.viblo.asia/00dd9472-7891-463e-9fcf-9bdd9716931a.png)

Thoạt đầu, nhìn có vẻ giống fake, nhưng điểm khác biệt của stub là nó là một chức năng cụ thể hoàn chỉnh, không có hard code bên trong mà dữ liệu sẽ truyền từ ngoài vào.

# Spy

Spy là một phiên bản mạnh mẽ hơn Stub, nó sẽ cung cấp thông tin về cách thức hàm được gọi và gọi bao nhiêu lần.

Dùng lại ví dụ của Dummy:

![](https://images.viblo.asia/70438db6-085f-4aeb-906b-992fd82f5112.png)

Bây giờ chúng ta sẽ test xem hàm save() được gọi bao nhiêu lần, và giá trị saveValue có đúng không:

![](https://images.viblo.asia/200bd073-efad-4f7d-b298-cbae1ae3accc.png)

# Mock

Nhìn lại ví dụ về Spy, sẽ có lúc trong hàm test của bạn sẽ có rất nhiều biến cần test. Việc test sẽ trở nên khó khăn và bạn phải tạo ra nhiều cái SpySaver()

Vì vậy, Mock sẽ làm sạch code của bạn trong trường hợp nâng cao này.

Từ ví dụ của Spy,

![](https://images.viblo.asia/200bd073-efad-4f7d-b298-cbae1ae3accc.png)

Chúng ta đưa assert vào trong hàm verify():

![](https://images.viblo.asia/ec3f7ed6-7c14-4e43-8f05-cab806dfadb6.png)

Trên đây là bài chia sẻ của mình về Test Double trong iOS,  hi vọng sẽ giúp ích cho các bạn. Cảm ơn các bạn đã đọc bài viết của mình !