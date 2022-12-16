Trước đây, mình từng có một bài viết về việc thiết lập project Xcode sao cho khi build app thì hệ thống sẽ tự nhận biết sẽ sử dụng file **GoogleService-Info.plist** tương ứng. 
Tuy nhiên, bài viết trước đây của mình đang sử dụng cách là sử dụng script để thực hiện copy file vào trong app trong khi compile code (Chi tiết hơn là sẽ copy khi chạy vào run scripts). Tuy nhiên, sau một thời gian sử dụng và triển khai thì mình thấy có 1 số bất cập.

Ví dụ như khi sử dụng với thằng Firebase Crashlytics thì việc copy file như vậy dù copy thành công, nhưng Crashlytics luôn báo rằng không thể tìm thấy GOOGLE_APP_ID do không tìm thấy file  **GoogleService-Info.plist** 
Bài viết trước mình có để ở [đây](https://viblo.asia/p/xcode-thiet-lap-googleservice-cho-cac-moi-truong-khac-nhau-RnB5pxod5PG)

Nhìn ra được bất cập đó nên mình đã chuyển sang một cách thiết lập mới.
Trong bài viết này mình sẽ chỉ ra cách mình mới chuyển sang. Có thể nhiều bạn đã biết cách này trước đây, nhưng mình vẫn muốn viết bài này.

### Tạo xcode project
Ở đây, mình sẽ tạo ra project có tên : "**ConfigApp**"
Cũng tương tự như trước đây, mình cũng sẽ vẫn tạo ra các **Scheme** để giúp thiết lập sẵn sẽ chạy các **Configurations** nào.
Tuy nhiên, mình sẽ không sử dụng một **Target** duy nhất như trước đây, mà mình sẽ tạo thêm 1 Target nữa.
Ở project này, mình sẽ tạm thiết lập cho môi trường **Dev** và **Staging**. Như hình dưới đây 

![](https://images.viblo.asia/4635e309-5de0-4428-a0f8-abe239387527.png)

Sau khi tạo xong Target, thì Xcode sẽ tạo ra cho chúng ta thêm 1 Scheme tương ứng với Target vừa xong:

![](https://images.viblo.asia/6cb4ccd9-d662-4e4e-85f8-4cfb8b0e8d8f.png)
Sau đó, chúng ta sẽ đặt bundle id tương ứng cho 2 môi trường.
### Tạo Firebase App
Tiếp theo, mở **Firebase** Console lên và tạo cho mình 2 app với bundle id tương ứng với 2 Target trong project.
Và download 2 file GoogleService-Info.plist 

![](https://images.viblo.asia/6fc51852-4eff-45b0-baf9-036619856d4b.png)

Sau khi đã download được 2 file về rồi, chúng ta sẽ copy vào trong Xcode project.

![](https://images.viblo.asia/7cf0415d-a7b7-47cb-a7bb-312116aac093.png)

### Thiết lập target cho 2 file plist
![](https://images.viblo.asia/611e1798-1c72-4808-bfec-5fa97f9469d0.png)
Như trong ảnh phía trên, thì sau khi copy  file  **GoogleService-Info.plist**  vào, thì nó đang được tích vào cho cả 2 Target.
Lúc này nếu như chúng ta build code thì sẽ nhận được một lỗi tương tự như sau: 
![](https://images.viblo.asia/9201e156-afee-4f7c-b7bc-0adbc5c7e21d.png)

Vậy để xử lý lỗi này, rất đơn giản, chúng ta chỉ cần bỏ chọn Target còn lại.
Với file dành cho môi trường Dev thì chúng ta sẽ bỏ chọn Target Staging, và ngược lại.

![](https://images.viblo.asia/5f973f75-33e8-4da5-adc4-7e656680b1f6.png)

Lúc này, chúng ta build code sẽ không thấy có lỗi xảy ra nữa.

### Thử thêm Firebase Crashlytics 
Tiếp theo, mình sẽ thử thêm **Firebase Crashlytics** vào xem có lỗi nữa không?

![](https://images.viblo.asia/3847c4ea-87c1-4531-94a7-d68b38dd007e.png)

Sau khi compile, thì log báo rằng chạy script FirebaseCrashlytics success.

![](https://images.viblo.asia/4014ca49-e6bc-40b4-b523-9d3ba06dfded.png)

### Kết bài
Bài viết này của mình đến đây là kết thúc, đây là cách mà mình mới dùng để cấu hình project cá nhân. Cách này thì thiết lập sẽ dễ dàng hơn so với cách trước đây. Tuy nhiên, mình thấy nó có một vấn đề đó là với mỗi Target chúng ta sẽ cần phải thiết lập riêng các scripts.....
Nếu các bạn có cách khác thì có thể chia sẻ với mình. Xin cảm ơn

Link github: https://github.com/dungkv-1044/ConfigApp