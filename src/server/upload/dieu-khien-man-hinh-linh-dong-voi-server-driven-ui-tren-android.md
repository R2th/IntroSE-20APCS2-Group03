![banner](https://miro.medium.com/max/7200/1*WmO7SkQCns-bs64pkRNMGA.jpeg)
> Phát triển native app cho thiết bị di động vẫn là lựa chọn đầu tiên cho các doanh nghiệp đang hoạt động có quy mô và muốn tiếp cận số đông với các sản phẩm hiệu quả. Chúng tôi sẽ không tranh luận về việc nền tảng nào vượt trội hơn nền tảng khác, đó là một cuộc thảo luận hoàn toàn khác.

Theo tôi, hầu hết các nhà phát triển di động phải suy nghĩ về cách các công ty như Flipkart, Swiggy, Amazon, Airbnb, v.v ... thay đổi / cập nhật màn hình ứng dụng chính của họ một cách nhanh chóng và cung cấp cho người dùng trải nghiệm tùy chỉnh hơn. Đa phần mọi người đều đồng ý rằng đó là một WebView, nhưng không phải (ngoại trừ Amazone) tất cả những thứ này đều được triển khai và điều khiển một cách linh động.

![demo](https://miro.medium.com/1*jh7NihoTfk1dvNZ7a6yO_g.jpeg)

Vì vậy, bằng cách so sánh chi tiết hai màn hình này của Flipkart và Amazon, chúng ta có thể thấy cả hai đều có các thành phần tương tự ở các khu vực như Carousel, Images, Cards đếu sử dụng các thành phần cơ bản là Image và Text

## Cái gì là server-driven UI?

Đây là thuật ngữ thông qua đó server chịu trách nhiệm hiển thị và kiểm soát các thành phần (views) trên frontend (trong bài viết này fronend chính là giao diện trên ứng dụng mobile của chúng ta). Nó còn được gọi với thuật ngữ backend-driven UI.
Server xác định các thành phần nào là một phần của màn hình và thứ tự của chúng, các thành phần này được mô tả thông qua dữ liệu trả về từ các API. Ứng dụng sẽ thực hiện xuất hình ảnh lên màn hình thiết bị với việc xử lý các thành phần được điểu khiển linh động từ backend. Điều này cho phép các ứng dụng cung cấp trải nghiệm người dùng chất lượng cao với tất cả các thành phần căn bản của hệ điều thành thiết bị.

![code](https://miro.medium.com/max/2184/1*r8cgVXSQP483ZlY9rYaOVg.png)

## Đâu là lợi ích của việc sử dụng mô hình này?
1. Có thể chạy thử nghiệm được nhiều phương án với mục đích kiểm tra lý thuyết khác biệt nhằm mục đích nâng cao chất lượng của sản phẩm.
2. Dễ dàng cập nhật các thay đổi trên màn hình mà không cần phải thực hiện update ứng dụng.
3. Mang đến các tính năng mới nhanh hơn. Xây dựng được nhiều màn hình mới dựa trên các thành phần đã được định nghĩa.

### Làm thế nào để nó hoạt động?

Để triển khai điều này sẽ có các cách triển khai như sau:

### 1. Định nghĩa View type
Trong cách tiếp cận này, Server sẽ trả về các định nghĩa trước về các kiểu view, Trong đó có tất cả các mục có thể hiện thị được khai báo như trong mẫu bên dưới, chúng tôi có các loại view như thẻ image, title, hành động được thực hiện như mở trang hồ sơ cho Cristiano Ronaldo với một id cụ thể được cung cấp.

![viewtype](https://miro.medium.com/max/2060/1*larYAnpTjHYFIOLg7m_Kxw.png)

### 2. Định nghĩa View

Trong phương pháp này, response từ server chứa tất cả các View, phân cấp, vị trí, chiều rộng, chiều cao, phần đệm, màu sắc, văn bản, v.v. Nó xác định tất cả các thuộc tính cần thiết để bố trí của view.

![view](https://miro.medium.com/max/1624/1*ERLVaFOZd4gGw-BmF2rXXQ.png)

Vậy đâu là điểm khác nhau của hai phương pháp này?

Với phương pháp __Định nghĩa View type__ một chế độ xem cụ thể đã có trong ứng dụng và bạn chỉ có thể thay đổi các thuộc tính nhất định của các yếu tố tùy thuộc vào usecase của bạn.
Ngược lại, Với phương pháp __Đinh nghĩa View__ với đầy đủ các thuộc tính được sử dụng thì bạn có thể thay đổi toàn bộ cách thức hiển thị thông qua server response.

### Parsers/Converters
Chúng ta sẽ chuyển đổi/ánh xạ UI JSON thành các mô hình, sau đó có thể được sử dụng để bố trí các khung nhìn trên màn hình theo JSON. Có rất nhiều trình chuyển đổi Json trong Android để thực hiện tuần tự với Json như Gson, Moshi, Kotlin, v.v.

### Layouting
Bây giờ, ý nghĩ đầu tiên xuất hiện trong đầu để thực hiện điều này là sự lựa chọn rõ ràng của mọi người: RecyclerView. Đó là RecyclerView thực sự có thể giúp chúng ta xây dựng hành vi này, nhưng liệu nó có khả thi hay không với các tùy chọn xuống dòng hoặc chia view theo tỷ lệ, quản lý các loại chế độ xem khác nhau, hiệu suất scroll, tạo ra các view, sử dụng và tối ưu bộ nhớ.

Đúng vậy, bạn có thể sử dụng RecyclerView để triển khai, nhưng có rất nhiều __View Architectures__ tuyệt vời khác có sẵn trong cộng đồng nguồn mở Android có thể giúp xây dựng các khung này một cách hữu hiệu và ghi nhớ tất cả các tối ưu hóa xảy ra bên dưới thư viện.

1. [Epoxy](https://github.com/airbnb/epoxy) from Airbnb
2. [Litho](https://fblitho.com/) from Facebook
3. [Proteus](https://github.com/flipkart-incubator/proteus) from Flipkart
4. [Graywater](https://github.com/tumblr/Graywater) from Tumblr
5. [Groupie](https://github.com/lisawray/groupie)

P.S: Tất cả các thư viện trên đều có chung một mục tiêu cuối cùng cần đạt được. Nhưng cách thức thực thi của chúng là khác nhau.

Có rất nhiều các hướng dẫn sử dụng __Epoxy__ and __Litho__. Và đó là những thư viện đang được nhiều người tin tưởng sử dụng nhất.

Và cuối cùng, chúng ta không thể bỏ qua được đó chính là UI tookit của Google mới giới thiệu gần đây. Do chính Google xây dựng để hỗ trợ việc module hoá UI

[Jetpack Compose](https://developer.android.com/jetpack/compose), bộ công cụ hiện đang được phát triển ở giai đoạn đầu và có rất nhiều sự phát triển mạnh mẽ đang diễn ra. Nhưng bạn có thể thử Jetpack ngay bây giờ mặc dù nó có xu hướng phá vỡ các thay đổi gần đây về cách phát triển và cấu trúc chương trình.

## Case Study:

### Swiggy
Swiggy sử dụng nhiều giao diện người dùng được điều khiển bởi server để kiểm soát các view hiển thị trên màn hình và các vị trí tương ứng của chúng. Ngoài ra, xem xét các thành phần động dựa trên vị trí chỉ có sẵn cho một số vị trí nhất định (xem hình ảnh bên dưới).

![Swiggy](https://miro.medium.com/max/2304/1*ZL0W3sLFquOYYL-A5Odd7A.jpeg)

Swiggy sử dụng Litho (có sẵn cho Android) là một thư viện từ Facebook để thực hiện các view phức tạp trong khi chạy, bằng cách cung cấp các cách thức để làm mịn bổ cục View. Làm phẳng các view và đồng bộ tính toán các layout giúp nâng cao hiệu suất của việc scroll.

Trên iOS, có thể sử dụng [ComponentKit](https://componentkit.org/) của Facebook để thay thế cho Litho.

> Litho sử dụng API khai báo để xác định các thành phần UI. Bạn chỉ cần mô tả bố cục cho UI của mình dựa trên một tập hợp các đầu vào bất biến và khung sẽ xử lý phần còn lại. Trong khi tạo mã, Litho có thể thực hiện tối ưu hóa cho UI của bạn, giữ cho code của bạn đơn giản và dễ bảo trì.

Bài viết dưới đây sẽ giải thích cho bạn chính xác cách thức và lý do Swiggy chọn Litho thay vì sử dụng RecyclerView của Android.

[Optimising scrolling performance with Litho](https://bytes.swiggy.com/optimising-scrolling-performance-with-litho-59db9819c583)

### Flipkart

Flipkart đã thiết kế và bố trí để điều khiển linh hoạt thành phần mà người dùng sẽ nhìn thấy. Điều này giúp Flipkart cập nhật màn hình chính của ứng dụng trong mùa lễ hội để thu được nhiều doanh số sản phẩm hơn.

Flipkart Engineering đã phát triển hệ thống của nó có tên là Proteus để thực hiện việc trên

> Proteus sử dụng cách thức thay thế cho LayoutInflater của Android. Nhưng không giống với cách biên dịch layout xml truyền trống trong Apk, Proteus inflates layout trong quá trình runtime. Bạn có thể điểu kiển được giao diện ứng dụng của mình ngay từ backend (lưu ý, đây không phải là Webview).

Proteus xem xét API JSON được xác định và sau đó chuyển đổi các thành phần tùy thuộc vào loại chế độ xem thành các thành phần native có thể được thêm vào khi runtime.

### Airbnb

Airbnb đã phát triển một thư viện có tên là Epoxy để triển khai tư tưởng server-driven UI trên Android. Họ phát triển view architecture đầu tiên cho ứng dụng của họ, sau đó họ đã tổng hợp nó lại thành một thư viện.

Đọc thêm về cách triển khai nó ở dưới đây
[Epoxy: Airbnb’s View Architecture on Android](https://medium.com/airbnb-engineering/epoxy-airbnbs-view-architecture-on-android-c3e1af150394)

Thay thế của Epoxy trên iOS là [MagzineLayout](https://github.com/airbnb/MagazineLayout) bởi Airbnb.

Nguồn dịch: [Dynamic screens using server-driven UI in Android](https://proandroiddev.com/dynamic-screens-using-server-driven-ui-in-android-262f1e7875c1)