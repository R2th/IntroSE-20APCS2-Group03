Chào mọi người, hôm nay nhân dịp lên đọc được một bài phân tích trên Medium khá hay đã trả lời thắc mắc của mình bấy lâu, đó là "không biết kích cỡ của file apk khi build bằng một số các framework như React Native, Flutter thì có khác gì so với việc sử dụng cách truyền thống dùng code native như Java hay Kotlin không?". Mình xin dịch lại bài viết này cho mọi người cùng đọc nhé.

Bạn có thể đọc bài viết gốc tại đây: https://android.jlelse.eu/comparing-apk-sizes-a0eb37bb36f


![](https://cdn-images-1.medium.com/max/2000/1*kTOVK9nX68CV2xkUwNlGbg.jpeg)

Như các bạn đã biết, hiện nay có rất nhiều cách để có thể tạo ra một ứng dụng mobile ngoài việc sử dụng các công cụ và ngôn ngữ chính thức của hệ điều hành đó (Java, Kotlin cho Android, Obj-C hay Swift cho iOS) như sử dụng [React Native](https://facebook.github.io/react-native/) của Facebook, [Electrode Native](http://www.electrode.io/site/native.html) của Walmart, [Ionic Framework](https://ionicframework.com), Unity, và mới nhất là [flutter.io](https://flutter.io) framework vừa được chính [Google công bố](https://medium.com/flutter-io/announcing-flutter-beta-1-build-beautiful-native-apps-dc142aea74c0). 

Có bao giờ bạn thắc mắc là những thư viện và frameworks này có ảnh hưởng như nào đến kích thước ứng dụng của bạn? 

Ta hãy cùng phân tích các file apk sau khi được build bằng các công cụ này nhé. Ứng dụng ta sử dụng để test sẽ khá đơn giản, chỉ chứa một title ở phía trên và một đoạn text ở giữa màn hình như ảnh dưới đây:

![](https://cdn-images-1.medium.com/max/1600/1*nS-7Ji11bTmO5HIkmoYA-g.png)

- Trong bài test này, tôi sẽ build ứng dụng này bằng 4 cách đó là sử dụng Java, Kotlin, React Native và Flutter. (Android API 27) 
- File apk này được build release sử dụng Android Studio với Java và Kotlin, sử dụng cli (dòng lệnh) với React Native và Flutter.
- Sử dụng cấu hình proguard mặc định.
- Các file apk này sẽ được phân tích sử dụng thông qua chức năng `Analyze APK` của Android Studio.

## Java (539 KB)

Bắt đầu với cách đơn giản nhất - `Java`. 

Như bạn cũng có thể đoán được, đây là kích thước nhỏ nhất với chỉ có Java, Android framework và với chỉ một dependency là `Android Support Library` để tạo ra ứng dụng. 

Bạn có thể thấy ở dưới đây phần android support chiếm khá nhiều dung lượng trong file: 

![](https://cdn-images-1.medium.com/max/2000/1*etBFAARt0K4yBa7d-nL0iQ.png)

Ta cũng có thể giảm dung lượng của file này hơn nữa bằng cách bỏ phần dependency này đi và sử dụng `Activity` thay vì `AppcompatActivity`.

## Kotlin (550 KB)
Tiếp theo đó là `Kotlin`. 

Một file apk dùng Kotlin sẽ chứa toàn bộ những thành phần mà chúng ta đã thấy ở file apk build bằng Java, ngoài ra thêm một phần nhỏ chứa các câu lệnh của Kotlin.

![](https://cdn-images-1.medium.com/max/2000/1*9Qo6ULUNQJtiHOHme_sFMg.png)

## React Native (7 MB)
Nếu bạn là một web developer và muốn làm một ứng dụng mobile sử dụng javascript thì React Native chính là sự lựa chọn cho bạn. 

Ngoài ra nó cũng khá là hữu ích nếu bạn muốn làm lại một tính năng mà không cần phải release lại app cho những thay đổi nhỏ.

File apk tạo ra bởi React Native có một vài class trong file `classes.dex` chưa tới 12193 referenced methods

![](https://cdn-images-1.medium.com/max/2000/1*VkAuQM-fi3Fe7yKBiwKC6w.png)

Nó cũng thêm vào một vài native dependencies trong thư mục `lib` cho `x86` hoặc `armeabi-v7a`. Tổng dung lượng 2 phần đó lên tới 6.4MB.

![](https://cdn-images-1.medium.com/max/2000/1*IiScBxnU_MhURFzFYnDsug.png)

## Flutter.io (7.5 MB)

App được build bởi Flutter có chứa phần C/C++ và Dart VM chiếm phần lớn file apk. 

Ứng dụng chạy trực tiếp bằng tập lệnh này và không dùng trình phiên dịch.

![](https://cdn-images-1.medium.com/max/2000/1*JqPvjrCDx4ShWNR10aP1UA.png)

## Tổng Kết
Trong mỗi cách viết ứng dụng thì đều có ưu và nhược điểm, việc chọn cách nào thì phụ thuộc vào từng trường hợp và tuỳ thuộc vào công ty của bạn. 

Bạn cũng có thể kết hợp các framework này lại để tạo là một phần riêng cho ứng dụng của bạn.

Ví dụ, nếu bạn muốn thử sử dụng React Native và bạn muốn nó có thể chạy được trên cả Android và iOS thì bạn có thể sử dụng React Native hoặc Flutter. Và nếu bạn chỉ muốn tập trung vào Android và làm cho kích cỡ của ứng dụng của mình nhỏ nhất có thể thì Java hoặc Kotlin là một sự lựa chọn đúng đắn

Cảm ơn các bạn đã theo dõi bài viết!