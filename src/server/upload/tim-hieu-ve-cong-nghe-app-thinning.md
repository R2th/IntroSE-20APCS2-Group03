iOS 9 ra mắt với nhiều điều mới mẻ. Chỉ sau vài tuần ra mắt thì hệ thống đã mới đã được cài đặt hơn một nửa số thiết bị iOS, đó là tỉ lệ chấp nhận từ phía người dùng nhanh nhất trong tất cả các phiên bản iOS, nó đã vượt qua kỉ lục của iOS 7 vào năm 2013.

Trong bài viết này chúng ta cùng nhau tìm hiểu về App Thinning, một tính năng mới và rất thú vị trong iOS 9. Chúng ta cùng khám phá, vì sao App Thinning rất quan trọng và cách để tận dụng nó đối với các ứng dụng riêng của bạn.

Nó được công bố tại WWDC, App Thining là một công nghệ mới và thú vị, nó thay đổi toàn bộ quá trình tải ứng dụng xuống từ App Store. Nhiều ý kiến từ phía người dùng đó là họ mất rất nhiều chi phí dung lượng để tải và mất nhiều dung lượng lưu trữ ứng dụng, đặc biệt với các thiết bị có dung lượng lưu trữ nhỏ. App Thining giải quyết các vấn đề đó. Giờ là lúc nên biết về công nghệ này.

# 1. Giới thiệu về App Thining
![](https://images.viblo.asia/51910fc2-686b-49fb-9b51-c40f56bbc1fc.jpg)

- Hiện tại trên thị trường có rất nhiều loại thiết bị iOS khác nhau và nhiều kích thước khác nhau, cùng với nó là độ phân giải khác nhau, vì vậy mà để tất cả các thiết bị đều trở lên tuyệt vời thì phải thực hiện tối ưu hoá assets (ví dụ như ảnh png, jpeg, vector...) tương ứng với mỗi loại màn hình. Điều này dẫn tới một điều tồi tệ khác đó là người dùng phải tải xuống những assets mà thiết bị của họ chả bao giờ sử dụng. Ví dụ như bạn dùng iphone thì các assets liên quan tới ipad thì tất nhiên thiết bị của bạn sẽ chẳng bao giờ sử dụng tới nó. Vì vậy mong muốn ở đây đó là người dùng chỉ cần tải những thứ mà họ sử dụng, quá trình tải nhanh, dung lượng file nhỏ... App Thinning làm điều đó.

- Ngày nay các ứng dụng được tạo ra không chỉ bao gồm là ảnh và các mã. Các ứng dụng hiện đại còn bao gồm không chỉ các mã thực thi mà nó còn bao gồm việc hỗ trợ các phiên bản 32 bit, 64 bit (được tối ưu hoá cho nhiều kiến trúc khác nhau như arm 64, arm 7 và arm7s), công nghệ đồ hoạ 3D, âm thanh và nhiều thứ khác. Tóm lại ứng dụng ngày nay vô cùng phức tạp, App Thinning sẽ giải quyết nó.

- App Thinning sẽ tự động phát hiện loại thiết bị của người dùng (model) và chỉ tải xuống các nội dung liên quan cho thiết bị đó. Nói cách khác nếu bạn sử dụng iPad mini 1 (sử dụng solution 1x thay vì màn hình retina) thì khi đó chỉ tải xuống các tệp 1x của bạn mà không tải các tệp hỗ trợ ipad mini 3 hay 4. Vì bản chất người dùng chỉ sử dụng 1x thôi. Vậy tới đây bạn đã có thể hình dung được vấn đề là cho phép tải nội dung phù hợp với thiết bị, điều đó có nghĩa là nội dung tải ít hơn, thời gian tải rút ngắn và dung lượng lưu trữ ít hơn.

- Nghe có vẻ đơn giản nhưng lượng công việc cần xử lý phần này vô cùng to lớn, may thay Apple thay các developer xử lý phần lớn lượng công việc rồi, các developer sẽ dễ dàng hơn trong việc phát triển ứng dụng. Vì vậy trong bài viết này sẽ phần lớn đi vào quy trình xử lý của App Thinning và các công nghệ biến nó thành sự thật.

- Liên quan tới nó bao gồm 3 khía cạnh:

    - App Slicing
    - Bitcode
    - On Demand Resources

- Chúng ta sẽ cùng khám phá từng thành phần, khía cạnh này nhé.

![](https://images.viblo.asia/a6c531e9-0919-422b-80b9-73be1eefe573.jpg)

# 2. App Slicing

- Theo Apple thì định nghĩa App Slicing là:
> “Slicing is the process of creating and delivering variants of the app bundle for different target devices.

- Ở đây App Slicing là quá trình tạo, phân phối các biến thể của từng app bundle cho các thiết bị khác nhau. Tức là một biến thể chỉ chứa kiến trúc thực thi và tài nguyên cần cho thiết bị đích của chúng ta. Tóm lại App Slicing chỉ cung cấp các nội dung có liên quan tới thiết bị mà bạn tải ứng dụng (nó tuỳ thuộc vào nhiều yếu tố như độ phân giải, kiến trúc...) 

- Khi bạn đã sẵn sàng submit ứng dụng của bạn, bạn upload file ipa hoặc file .app tới iTunes Connect, như thường lệ ở đây bạn sử dụng Xcode 7 vì nó chứa iOS 9 có hỗ trợ App Thinning.

![](https://images.viblo.asia/4ac0ad52-e4f5-4741-8cb8-90d12591115f.png)

# 3. On Demand Resources

- Để hiểu đầy đủ về App Thinning thì bạn cần phải hiểu về **On Demand Resources (ODR)**. ODR là các tệp có thể được tải xuống sau lần cài đặt đầu tiên của ứng dụng. Ví dụ có thể tại xuống các cấp cụ thể của game và các nội dung liên quan tới cấp này khi người chơi mở khoá chúng. Hơn nữa, các mức trước đó mà người dùng sau một khoảng thời gian có thể không sử dụng tới thì có thể xoá để tiết kiệm bộ nhớ trên thiết bị.

- Các bạn có thể xem setting như trong hình ảnh sau:

![](https://images.viblo.asia/c5801edc-95ff-4e9d-a8f2-9290fe411868.png)

# 4. Bitcode

- Đây là khía cạnh thứ 3 của App Thinning. Khái niệm Bitcode hơi trừu tượng, nhưng về bản chất đó là cách tối ưu hoá ứng dụng nhanh và hiệu quả nhất có thể có trên mọi thiết bị mà chúng đang chạy. Bitcode tự động biên dịch ứng dụng cho trình biên dịch mới nhất và tối ưu hoá nó cho các kiến trúc cụ thể. Ví dụ arm64 cho các bộ vi xử lý 64 bit như iphone 6s và ipad air 2.

- Bitcode làm cho file tải xuống nhỏ hơn bằng cách tối ưu hoá thực hiện cho kiến trúc khác nhau và chỉ tải xuống các tối ưu hoá có liên quan và hoạt động với các công nghệ App Thinning. Nó là một tính năng mới cho iOS và cần được bật cho các dự án mới hơn. Điều này có thể được thực hiện thông qua thiết lập **Build Settings** > **Bitcode** > **YES**.

![](https://images.viblo.asia/1e32e783-2cdc-4e4e-a088-0534a04c7c72.png)

# 5. App Thinning trong project

- Mặc dù Xcode và App Store xử lý phần lớn quy trình xử lý ứng dụng, nhưng một số thứ vẫn cần developer thực hiện để đảm bảo ứng dụng của bạn hoạt động với công nghệ mới này.
- Quan trọng nhất là bạn phải sử dụng asset catalogs. Nó được mặc định cho hầu hết các ứng dụng tại thời điểm này. Các bạn có thể kiểm tra lại xem ứng dụng của mình đã sử dụng nó chưa. Nếu chưa hãy sử dụng nó.

![](https://images.viblo.asia/b075ff4e-7944-45af-9c76-473239dbb6aa.png)

# 6. Testing App Thinning

- Như các bạn đã biết bên trên có nói Xcode và App Store của Apple xử lý hầu hết quá trình của công nghệ App Thinning giúp cho việc đưa công nghệ này vào sử dụng ở dự án của bạn trở nên dễ dàng. Nhưng làm thế nào để chúng ta có thể thử nghiệm nó để đảm bảo rằng ứng dụng đã sẵn sàng sử dụng công nghệ này? TestFlight giải quyết vấn đề này.

- Để bắt đầu bạn hãy tải một ứng dụng trống rỗng sau. Giải nén nó và chạy nó trong Xcode. Bạn sẽ thấy rằng nó chả có gì ngoài Asset Catalog (chứa các phiên bản 1x, 2x, 3x của app icon). [EmptyProject](https://www.dropbox.com/s/4uw52dkckp25psb/AppThinning.zip?dl=0)

![](https://images.viblo.asia/68c68d86-2e5b-4fe1-b51f-5eaa1c46d35c.png)

- Việc đầu tiên sau khi tải về là chạy nó lên, sau đó mở ứng dụng Settings > Storage & iCloud Usage > Manage Storage. Các bạn sẽ thấy dung lượng là 17MB. Khi lên App Store thì kích thước này thay đổi.

![](https://images.viblo.asia/9783994e-cd3d-400b-ab95-27f2a608ce42.png)

- Bây giờ thử Archive nó nhé

![](https://images.viblo.asia/d120818b-dd9c-4979-a123-05a943212c24.png)

- Vì nó sẽ đẩy file ipa lên Store nên các bạn cần phải có Bundle Identifier khớp với ứng dụng bạn tạo trên Store nhé. Bạn nào có account thì có thể làm thử, không có thì file sẽ không được đẩy lên đâu nhé.

![](https://images.viblo.asia/6e0581c0-9086-441d-a48b-38a51fc4feb4.png)

- Trước khi submit thì nhớ check vào checkbox **Include Bitcode** nhé
- Tiếp theo lên iTunes Connect chọn version nào.

![](https://images.viblo.asia/e308010a-2e46-4b57-91a9-9fb0cc246e91.png)

- Tới đây thì có 1 quá trình xử lý mất một lúc lâu và bạn phải chờ để có thể tiếp tục quá trình thử nghiệm này. Khi quá trình xử lý sẽ có một email thông báo tới báo cho bạn biết quá trình xử lý thành công và bạn có thể chọn file ipa được rồi. Tới đây bạn có thể thử nghiệm thông qua ứng dụng TestFlight rồi nhé.

![](https://images.viblo.asia/64192ff6-2cde-4121-a266-4d591e72632c.png)

- Tới đây chả hiểu sao trên này lại báo dung lượng là 17.8 MB. Nhưng còn bất ngờ hơn ở bước tiếp theo. Bạn hãy cài đặt nó nhé. Tới đây bạn lại thấy dung lượng ở trên máy của bạn chỉ còn lại có 5.4MB thôi. Bất ngờ quá khi dung lượng giảm rất nhiều.

![](https://images.viblo.asia/c7773178-b274-4f15-b1dc-8c043957a2a0.png)

### Tổng kết

Nói chung lại tới đây bạn đã hình dung ra App Thinning là gì và nó xử lý thế nào, có điểm cộng nào...
Thực sự nó giải quyết bài toán nan giải về dung lượng lưu trữ trên thiết bị iOS, vốn dĩ đã bị kêu nhiều vì quá ít.
Tóm lại là nó giúp cho bạn biết bạn nên sử dụng những nội dung nào mà bạn cần, những nội dung không cần thì bạn không phải tải nó về lưu trữ gây tốn dung lượng thôi. Và để làm điều đó nó tạo ra nhiều version tương ứng với từng loại thiết bị, kiến trúc... Và thiết bị bạn nhận được nội dung tương ứng.

Trong bài có sử dụng một số hình ảnh từ nguồn khác chỉ với mục đích minh hoạ.