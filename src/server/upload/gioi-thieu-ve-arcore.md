## Giới thiệu về ARCore

ARCore là một nền tảng của Google dùng để trải nghiệm thực tế ảo tăng cường. ARCore sử dụng các API khác nhau, giúp điện thoại của bạn có thể cảm nhận được môi trường xung quanh, hiểu được thế giới thực và tương tác với các thông tin trong thế giới thực. Một số API đã có sẵn trên Android và iOS để cho phép chia sẻ trải nghiệm về AR.

ARCore sử dụng 3 khả năng chính để tích hợp nội dung ảo với thế giới thực thông qua camera điện thoại:
* **Motion tracking** giúp điện thoại hiểu được và theo dõi được vị trí của nó so với thế giới thực.
* **Environmental understanding** giúp điện thoại phát hiện được kích cỡ và vị trí của tất cả các bề mặt: ngang, dọc và các góc cạnh bề mặt như mặt đất, mặt bàn hay bức tường...
* **Light estimation** giúp điện thoại ước lượng được điều kiện ánh sáng của môi trường.

### Các thiết bị đc hỗ trợ

ARCore được thiết kế để có thể hoạt động được trên nhiều loại điện thoại Android chạy Android 7.0 (Nougat) trở lên. Xem list đầy đủ tại [đây](https://developers.google.com/ar/discover/supported-devices).

### ARCore hoạt động như thế nào?

Về cơ bản, ARCore sẽ làm 2 việc: theo dõi vị trí của thiết bị khi di chuyển và xây dựng hiểu biết sự hiểu biết riêng của nó về thế giới thực.

Công nghệ motion tracking của ARCore sử dụng camera của điện thoại để xác định các điểm quan trọng và theo dõi các điểm đó di chuyển theo thời gian. Với sự kết hợp sự chuyển động của các điểm và đọc nó từ cảm biến quán tính của điện thoại, ARCore xác định cả vị trí hướng của điện thoại khi di chuyển qua các bề mặt.

Ngoài việc xác định các điểm chính, ARCore có thể phát hiện các bề mặt phẳng ví dụ như mặt đất hoặc mặt bàn, và cũng có thể ước lượng được ánh sáng của khu vực xung quanh nó. Kết hợp 2 khả năng này giúp ARCore xây dựng nên hiểu biết riêng của nó về thế giới xung quanh.

Sự hiểu biết của ARCore về thế giới thực giúp chúng ta có thể đặt các đối tượng, chú thích hoặc nhưng thông tin khác mà nó có thể tích hợp hoàn hảo với thế giới thực. Motion tracking có nghĩa là bạn có thể di chuyển xung quanh và nhìn thấy các đối tượng này ở bất kì góc độ nào, và thậm chí nếu bạn quay đi và rời khỏi phòng, khi quay lại, các đối tương, chú thích và thông tin vẫn ở nguyên vị trí mà bạn đặt nó.

## Các khái niệm cơ bản

Trước khi đào sâu vào ARCore, sẽ rất hữu ích nếu hiểu một chút về các khái niệm cơ bản. Các khái niệm này kết hợp với nhau minh họa cho cách ARCore cho phép trải nghiệm có thể làm cho các nội dung ảo xuất hiện trên các bề mặt thực hoặc gắn liền với các vị trí thực tế.

### Motion tracking

Khi điện thoại của bạn di chuyển trong thế giới thực, ARCore sẽ đo đạc đồng thời ánh xạ, hoặc COM, để hiểu được rằng điện thoại có liên quan như thế nào với thế giới xung quanh nó. ARCore phát hiện các tính năng riêng biệt trực quan thông qua camera, gọi là **feature points** và sử dụng các điểm này để tính toàn sự thay đổi về vị trí. Thông tin về thị giác được kết hợp với các phép đo quán tính từ IMU sẽ ước tính được **pose** (vị trí và hướng) của camera liên quan đến thế giới thực theo thời gian.

Bằng cách căn chỉnh tư thế của camera ảo sẽ hiển thị nội dung 3D của bạn với **pose** của camera được cung cấp bởi ARCore, lập trình viên sẽ có thể kết xuất các nội dung ảo từ một phối cảnh chính xác. Hình ảnh ảo được kết xuất có thể phủ lên trên của hình ảnh thu được từ camera, làm cho nó xuất hiện như thể nội dung ảo là một phần của thế giới thực.

![](https://images.viblo.asia/fc1ad89d-0f9a-4f2f-ae3c-28b335887322.jpg)

### Environmental understanding

ARCore không ngừng nâng cao hiểu biết của nó về thế giới thực bằng cách phát hiện các điểm và mặt phẳng đặc trưng.

ARCore tìm kiếm các cụm **feature points** xuất hiện nằm trên các bề mặt ngang hoặc dọc, ví dụ như bàn hay tường và làm các bề mặt này xuất hiện trong ứng dụng như là các mặt phẳng. ARCore cũng có thể xác định được ranh giới của các mặt phẳng và truyền các thông tin đó đến ứng dụng. Chúng ta có thể sử dụng thông tin đó để đặt các vật thể ảo trên bề mặt phẳng.

Vì ARCore sử dụng **feature points** để xác định mặt phẳng, mặt phẳng không có các kết cấu như tường trắng, có thể không được xác định chính xác.

![](https://images.viblo.asia/3fcb555d-bf3b-4e68-97a5-606bbc0a56a6.jpg)

### Light estimation

ARCore có thể phát hiện thông tin về ánh sáng của môi trường và hiệu chỉnh màu sắc của hình ảnh camera. Những thông tin này cho phép bạn chiếu sáng các đối tượng ảo của mình trong cùng điều kiện như môi trường xung quanh chúng, làm nó trở nên thực hơn.

![](https://images.viblo.asia/0221ae48-7ab3-4347-85de-994e5fddba0d.jpg)

### Tương tác người dùng

ARCore sử dụng hit testing để thu tọa độ tương ứng (x,y) với màn hình điện thoại và chiếu một tia vào camera vào view của thế giới, nhận về bất kì mặt phẳng hay feature points mà tia đó chạm vào, cùng với pose của góc giao cắt đó trong không gian. Điều này cho phép người dùng có thể chọn hoặc tương tác với các đối tượng trong môi trường.

### Các điểm định hướng

Các điểm định hướng cho phép chúng ta đặt các vật thể ảo trên các góc của bề mặt. khi thực hiện hit test sẽ trả về một feature point, ARCore sẽ tìm kiếm các feature point xung quanh điểm đó và dùng các điểm đó để ước lượng các góc cạnh của bề mặt tại feature point đã nhận. ARCore sau đó sẽ trả về một pose tính đến góc đó.

Vì ARCore sử dụng các cụm feature points để phát hiện ra các góc cạnh của bề mặt, các bề mặt không có kết cấu, ví dụ như một bức tường trắng, có thể sẽ không được phát hiện chính xác.

### Anchors và Trackables

Poses có thể thay đổi khi ARCore cải thiện sự hiểu biết của nó về môi trường xung quanh. Khi muốn đặt một vể thể ảo, chúng ta cần phải định nghĩa một **andchor** để đảm bảo rằng ARCore theo dõi vị trí của vật thể đó theo thời gian. Thông thường, anchor được tạo ra dựa trên pose được trả về bởi hit test như trong mô tả ở phần **Tương tác người dùng**.

Thực tế là pose có thể thay đổi, nghĩa là ARCore có thể cập nhật vị trí của các vật thể môi trường như mặt phẳng và feature points theo thời gian. Mặt phẳng và các điểm là một loại đặc biệt của vật thể gọi là trackable - là một vật thể mà ARCore sẽ theo dõi qua thời gian. Bạn có thể neo các đối tượng ảo và theo dõi cụ thể để đảm bảo rằng mối liên quan giữa vật thể ảo và trackable vẫn ổn định ngay cả khi thiết bị di chuyển. Ví dụ như đặt một bức tượng ảo trên bàn, nếu ARCore điều chỉnh tư thế của mặt phẳng với bàn, bức tượng ảo đó vẫn xuất hiện trên mặt bàn.

### Tăng cường hình ảnh

Tăng cường hình ảnh cho phép chúng ta xây dựng ứng dụng AR có thể tương tác với những bức ảnh 2D cụ thể như bao bì của các loại đồ đạc, hay poster phim. Người dùng có thể trải nghiệm AR khi họ sử dụng camera để thu hình ảnh từ các poster phim và nhân vật sẽ nổi lên như thật.

Những hình ảnh có thể xuất ra mà không cần mạng để tạo nên một cơ sử dữ liệu hình ảnh, hay những ảnh đơn lẻ có thể thêm vào trong thời gian thực từ thiết bị. Một khi đã được đăng kí, ARCore sẽ phát hiện những ảnh đó, viền của ảnh và sẽ xuất ra các pose tương ứng.

Dưới đây là một số khái niệm cũng như giới thiệu sơ qua về ARCore của Google. Cảm ơn mọi người đã đọc bài của mình :D