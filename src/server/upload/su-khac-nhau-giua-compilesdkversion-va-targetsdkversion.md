Trong bài viết này, ta cùng tìm hiểu kĩ hơn về `compileSdkVersion` và `targetSdkVersion` trong file `build.gradle` nhé.

![](https://images.viblo.asia/4c8c4850-2301-400f-ac4d-77ec3d91f070.png)
Thông thường chúng ta sẽ cập nhật cả 2 giá trị API level này khi có phiên bản mới của Android SDK được phát hành. Nhưng tại sao việc này lại quan trọng? và tại sao lại có 2 giá trị này mặc dù chúng ta thường thiết lập cho chúng cùng một giá trị?

Cả `compileSdkVersion` và `targetSdkVersion` đều rất quan trọng để xử lý khả năng tương thích trong Android, do vậy cả hai đều được kết nối với những thứ cần thực hiện khi có phiên bản Android SDK mới. Nhưng chúng hoạt động như thế nào?
# compileSdkVersion
`compileSdkVersion` xác định phiên bản Android SDK nào sẽ được gradle sử dụng để biên dịch ứng dụng.
### Ví dụ: 
Trong Android 12, phiên bản Android SDK là **31**, đã có một API mới được cung cấp, cho phép chúng ta dễ dàng triển khai một Splash Screen. Trong API mới này, Splash Screen có thể được tùy chỉnh bằng cách sử dụng các thuộc tính:
![](https://images.viblo.asia/a9099f50-05b6-489d-8744-a971c9bf8f43.png)

Nếu ta muốn sử dụng API này trong ứng dụng thì chúng ta phải thực hiện:
* **download** **SDK phiên bản 31** trong Android Studio
* **cập nhật** `compileSdkVersion` **thành 31** trong file gradle

### Với những device cũ thì sao?
Tất nhiên khi ta đã thực hiện những điều trên thì không có nghĩa là ta chỉ có thể sử dụng API mới này và quên đi những user có phiên bản Android cũ hơn mà API này không khả dụng.

Nếu `minSdkVersion` được thiết lập thấp hơn **31**, ta phải cung cấp một cách thay thế để hiển thị Splash Screen cho những đời máy cũ hơn không có quyền truy cập vào API mới này.

Tương tự, một số phương thức hoặc thuộc tính có thể sẽ bị deprecated (không được dùng nữa) trong phiên bản Android SDK này và một số phương pháp hoặc thuộc tính thậm chí còn bị xóa luôn. Đó là lý do tại sao khi ta cập nhật `compileSdkVersion`, ta sẽ thường thấy một số **warning và error** trong quá trình biên dịch mà ta phải giải quyết.

![](https://images.viblo.asia/460c2f24-9d7a-41af-9d30-3b88964b5428.png)

Nhưng chỉ thay đổi  `compileSdkVersion` thì sẽ không thực sự thay đổi hành vi của ứng dụng. Vậy làm cách nào để hệ thống Android biết được liệu nó có thể sử dụng các chức năng mới với ứng dụng của ta hay không? Đó là lúc `targetSdkVersion` phát huy tác dụng.
# targetSdkVersion
`targetSdkVersion` xác định cho hệ thống biết phiên bản Android mà ứng dụng đã được thiết kế và kiểm thử.

Nếu người dùng chạy ứng dụng trên thiết bị có phiên bản Android cao hơn `targetSdkVersion` được xác định, đối với các tính năng android mới, hệ thống có thể đưa ra một số hành vi tương thích ngược để đảm bảo ứng dụng vẫn hoạt động theo cách mà ta đã thiết kế ra nó.
### Ví dụ:
Trong Android 12, giao diện của các custom notification đã được thay đổi. Trước đây ta có thể sử dụng toàn bộ khu vực thông báo, nhưng trong Android 12 áp dụng template tiêu chuẩn cho tất cả các custom notification để chúng trông nhất quán hơn.

![](https://images.viblo.asia/cf2fc1a3-257d-41e8-9701-9733ae0362c6.png)

Nếu `targetSdkVersion` được thiết lập dưới **31**, hệ thống sẽ cho rằng ta chưa test tính năng đó và sẽ hiển thị thông báo theo cách cũ để giảm thiểu nguy cơ thông báo không được hiển thị đúng cách. Chỉ sau khi ta cập nhật `targetSdkVersion` lên **31**, giao diện notification mới sẽ được sử dụng.

![](https://images.viblo.asia/06e1ae62-3420-4797-b9fd-8651ca1f3793.png)

# Mối quan hệ giữa compile và target SDK version
Ta thấy `compileSdkVersion` và `targetSdkVersion` có ý nghĩa hoàn toàn khác nhau,nhưng chúng rõ ràng là không độc lập, mà liên quan đến nhau.

`targetSdkVersion` không thể cao hơn `compileSdkVersion`, đơn giản vì chúng ta không thể nhắm được những thứ mà chúng ta không biết gì trong quá trình biên dịch.

Lý tưởng nhất, `compileSdkVersion` và `targetSdkVersion` phải bằng nhau và cả hai đều trỏ đến SDK mới nhất. Nhưng tất nhiên chỉ sau khi ta đã test thì những sự thay đổi được giới thiệu trong phiên bản đó mới hoạt động trơn tru được!
# Source
Bài viết được dịch từ [https://proandroiddev.com/compilesdkversion-and-targetsdkversion-what-is-the-difference-b4227c663ba8](https://proandroiddev.com/compilesdkversion-and-targetsdkversion-what-is-the-difference-b4227c663ba8)