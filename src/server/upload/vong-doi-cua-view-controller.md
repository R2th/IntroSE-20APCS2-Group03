Chào các bạn bài viết hôm nay sẽ về vòng đời của View Controller
![](https://images.viblo.asia/6ba96aa6-9d5b-4781-9089-37c64d57f016.png)
# init(coder:)
### Khi được gọi/ khi được sử dụng:
- ViewController thường được tạo từ storyboards. Trong trường hợp này, init(coder:) là initializer được gọi và bạn phải override.
- Nó cung cấp một NSCoder instance như một parameter. Nó không thường được sử dụng, nên bạn có thể bỏ qua parameter này. Nếu bạn tò mò, thì serialization chuyển đổi một object trong byte stream mà bạn có thể lưu trên đĩa hoặc có thể gửi qua mạng.
### Application:
- Trong quá trình initalization của một ViewController, bạn thường phân bổ các resource mà ViewController sẽ cần trong suốt vòng đời của nó. Chúng bao gồm các model object hoặc các bộ điều khiển phụ trợ khác, như bộ điều khiển mạng.
- ViewController trước cũng có thể truyền những object này sang object hiện tại. Nên không phải lúc nào bạn cũng cần khởi tạo trong tất cả ViewController.
### Những việc cần quan tâm:
- Lưu ý rằng view của ViewController vẫn chưa được khởi tạo tại thời điểm này. Nếu bạn thử truy cập thông qua view property của UIViewController thì sẽ thấy method loadView() sẽ được gọi. Nó có thể tạo ra những bug không ngờ :v. Vậy nên để an toàn thì không nên truy cập vào view cho đến khi xong bước này.
# init(nibName:bundle:)
### Khi được gọi/ khi được sử dụng:
- Thỉnh thoảng bạn quyết định đặt ViewController vào nib file thay vì storyboard. Ví dụ để làm việc trong 1 team lớn nơi mà nhiều thành viên cần thay đổi ViewController mà không làm ảnh hưởng đến người khác. Bạn cũng có thể có một dự án nhưng lại không có storyboards, vì vậy mọi ViewController đều có tệp nib riêng. Hãy nhớ rằng nếu storyboard chính của bạn bắt đầu trở nên quá lớn, bạn có thể chia nó thành nhiều storyboard hơn. Bạn không cần phải di chuyển mọi ViewController trong một file nib riêng.
- Nếu bạn tạo một ViewController từ file nib, init(nibName:bundle:) được gọi thay vì init (coder:).
# loadView()
- Đây là method để tạo view cho ViewController. Bạn override method này chỉ khi bạn muốn build lại toàn bộ interface cho ViewController bằng code. Không sử dụng nó trừ khi có lý do chính đáng.
- Nếu bạn làm việc với storyboard hoặc nib file bạn không cần phải làm bất cứ điều gì với method này và bạn có thể bỏ qua nó. Nó được implement trong lúc UIViewController load interface từ interface file và connect tất cả outlet và action.
# viewDidLoad()
- Khi method này được gọi thì view của ViewController đã được tạo và bạn chắc chắn rằng tất cả outlet đã được xếp chỗ.
### Application:
- Người ta sử dụng method này để điền data vào ViewController trước khi người dùng nhìn thấy nó.
- Đây cũng là nơi tốt để bắt đầu một vài hành động background mà cần phải có user interface.
- Một trường hợp phổ biến là các network call mà bạn chỉ cần thực hiện một lần khi màn hình được tải.
- Là nơi để khởi tạo và cài đặt object được sử dụng trong ViewController.
### viewDidLoad với viewDidAppear:
- Nếu bạn muốn gọi lại nhiều lần các hành động (background, đổi UI, network call) để cập nhật data trong ViewController, viewDidAppear(: ) thích hợp để làm việc này.
### Điều quan trọng cần ghi nhớ:
- Method này chỉ được gọi duy nhất 1 lần trong suốt lifetime của một ViewController. Vậy nên bạn sử dụng nó cho những thứ chỉ cần chạy 1 lần. Nếu bạn cần thực hiện một số tác vụ mỗi khi ViewController xuất hiện trên màn hình, thì bạn cần theo các method trên.
- Hãy nhớ rằng trong vòng đời này, bước view bounds không phải là cuối cùng.
# viewWillAppear(\_: )
-  Bạn override method này cho các tác vụ mà bạn cần lặp lại mỗi khi ViewController xuất hiện trên màn hình. Method này được gọi nhiều lần cho cùng một instance của ViewController.
-  Thông báo cho ViewController rằng view này chuẩn bị được thêm vào view hierarchy.
### Application:
- Thường thì bạn sử dụng method này cho việc cập nhật user interface với data có thể thay đổi trong khi ViewController không ở trên màn hình.
- Bạn cũng có thể chuẩn bị interface cho animation bạn muốn kích hoạt khi mà ViewController xuất hiện.
### viewDidLoad với viewDidAppear:
- Đoạn code mà bạn cần thực thi 1 lần nên cho vào initializer hoặc viewDidLoad()
- Trong bước này view đã có bounds nhưng orientation thì chưa được áp dụng.
# viewWillLayoutSubViews
- Được gọi để thông báo cho ViewController rằng view chuẩn bị được layout subview
- Method này được gọi mỗi khi frame có sự thay đổi, ví dụ khi quay hoặc nó được đánh dấu nếu cần layout. Nó là bước đầu tiên trong đó view bound là cuối cùng.
- Nếu bạn không sử dụng autoresizing masks hoặc constraints và view size có thay đổi và bạn muốn cập nhật subview ở đây.
# viewDidLayoutSubviews
- Được gọi để thông báo cho ViewController rằng view vừa layout lại subview.
- Thực hiện các thêm các thay đổi ở đây sau khi view layout subview của nó.
# viewDidAppear(\_: )
- Method này được gọi sau khi mà ViewController đã hiển thị trên màn hình.
- Bạn có thể sử dụng nó để bắt đầu animation trong user interface, để bắt đầu play video hay audio, hoặc bắt đầu sưu tập data từ network.
# viewWillDisappear(\_: )
- Method này được gọi trước khi quá trình chuyển đổi sang ViewController tiếp theo xảy ra và ViewController gốc chuẩn bị được gỡ bỏ khỏi màn hình.
- Bạn hiếm khi cần override method này vì có một số task phổ biến cần được thực hiện tại thời điểm này, nhưng bạn có thể cần nó.
# viewDidDisappear(\_: )
- Sau khi ViewController được gỡ bỏ khỏi màn hình thì method này được gọi.
- Bạn thường override method này để dừng những task mà nó không chạy khi ViewController không ở trên màn hình.
- Ví dụ, bạn dừng việc nhận thông báo, giám sát những object khác, giám sát các cảm biến thiết bị hoặc cuộc gọi network là không còn cần thiết nữa.
# deinit()
- Giống với những object khác, trước khi ViewController được remove khỏi memory, nó sẽ được deinitialized.
### Application:
- Bạn thường override deinit() để làm sạch tài nguyên mà ViewController đã cung cấp mà ARC không thể tự động làm.
- Bạn cũng có thể dừng những task mà bạn không thể dừng bằng những method bên trên bởi vì bạn muốn nó chạy trên background.
### Cẩn thận:
- Một ViewController đi ra khỏi màn hình không có nghĩa là nó được giải quyết sau đó. Nhiều container giữ ViewController trong memory. Ví dụ, khi bạn đi sâu hơn trong navigation controller, thì tất cả ViewController trước đó được giữ trong memory. Một navigation controller giải phóng ViewController chỉ khi điều hướng trở lại. Vì lý do này, bạn hãy nhớ rằng một ViewController không ở trên màn hình thì nó vẫn hoạt động bình thường và nhận notification. Nên bạn cần nhớ khi developing app của bạn.
# didReceiveMemoryWarning()
- Thiết bị iOS thì giới hạn về memory và power. Khi memory bắt đầu đầy, iOS không sử dụng không gian limited hard disk của mình để di chuyển dữ liệu ra khỏi memory như máy tính. Vì vậy, bạn cần giữ dụng lượng của app ở mức thấp. Nếu app của bạn sử dụng quá nhiều memory, iOS sẽ thông báo về việc này.
- Vì các ViewController thực hiện việc quản lý bộ nhớ, nên những thông báo sẽ được gửi đến nó thông qua method này. Bằng cách này bạn có thể thực hiện việc giải phóng memory. Hãy nhớ rằng nếu bạn bỏ qua các cảnh báo bộ nhớ và bộ nhớ được sử dụng bởi ứng dụng của bạn vượt quá một ngưỡng nhất định, iOS sẽ kill ứng dụng của bạn. Điều này trông giống việc crash và cần tránh nó.

Nguồn: https://github.com/codepath/ios_guides/wiki/View-Controller-Lifecycle