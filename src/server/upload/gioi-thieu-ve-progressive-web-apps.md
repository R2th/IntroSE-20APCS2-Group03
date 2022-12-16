Progressive Web App (**PWA**) là xu hướng mới nhất trong phát triển ứng dụng di động sử dụng công nghệ **Web**. Đã được ứng dụng khá phổ biến trên thiết bị **Android**, tuy nhiên phải mãi đến phiên bản 11.3, Apple mới cho phép **PWA** trên hệ điều hành **IOS**.  
Thực chất **PWA** không phải là một công nghệ mới, mà là một khái niệm để chỉ một nhóm các kĩ thuật với mục đích tạo ra trải nghiệm tốt hơn đối với các ứng dựa trên nền **web** (web-based application).  
### 1. Khái niệm cơ bản về Progressive Web Application.  
Một ứng dụng **PWA** có thể cung cấp các tính năng bổ sung dựa trên thiết bị hỗ trợ, cung cấp khả năng ngoại tuyến (**offline**), đẩy thông báo (**push notification**), giao diện và tốc độ tương đương ứng dụng **Native** và lưu trữ cục bộ các nguồn tài nguyên (**local caching**).  
PWA được giới thiệu lần đầu bởi **Google** vào năm 2015, với mục đích mang lại thật nhiều lợi ích cho cả người dùng và các nhà phát triển.  

Các Nhà phát triển (**Devs**) có thể xây dựng những ứng dụng tốt nhất chỉ với nền tảng **Web**. Đây là phương pháp luôn được quan tâm, bởi nó dễ dàng, và rẻ hơn so với xây dựng ứng dụng **Native**, đặc biệt khi xây dựng các ứng dụng đa nền tảng.  

Một ứng dụng **PWA** là một **website** được phát triển bởi những công nghệ cho phép tối ưu trải nghiệm người dùng trên thiết bị **mobile** so với một **website** bình thường. Nó sẽ cho bạn cảm giác gần như đang sử dụng ứng dụng **Native**, bởi những tính năng sau:  
* Hỗ trợ **Offline**  
* Tải ứng dụng nhanh  
* Bảo mật tốt hơn  
* Có khả năng đẩy **notification**  
* Trải nghiệm full màn hình, không hề có thanh **URL**  

Các nền tảng di động ngày càng hỗ trợ nhiều hơn đối với **PWA**, đã hỗ trợ đặt câu hỏi tới người dùng về việc thêm ứng dụng vào màn hình **HOME** khi họ ghé qua một website.  
Nhưng trước hết, cần phân tích rõ tên gọi **Progressive Web App** bởi nó có thể gây ra nhầm lẫn. Có một định nghĩa khá chính xác cho tên gọi này: "**PWA** là các **Web App**, ứng dụng các tính năng hiện đại của các trình duyệt, giúp cho thiết bị **Mobile** có thể **_nâng cấp_** chúng  tương đương với những ứng dụng thuần, hay ta quen gọi là ứng dụng **native**".  

### 2. **Progressive Web App** với những công nghệ khác.  

#### **Ứng dụng Native**  
Phát triển **Native Apps** là phương pháp hiển nhiên bạn sẽ nghĩ tới khi xây dựng ứng dụng **mobile**. Với phương pháp này, chúng ta sử dụng ngôn ngữ lập trình **Objective-C** hay **Swift** cho **IOS**, **Java/Kotlin** đối với Android hoặc là **C#** đối với Window Phone.  
Mỗi nền tảng lại có quy ước riêng, bao gồm các công cụ (**widgets native**) giúp mang lại trải nghiệm như mong đợi cho người dùng. Chúng có thể được xây dựng và phát hành thông qua các **App Store** riêng của mỗi nền tảng.  

Tuy nhiên để có thể xây dựng ứng dụng đa nền tảng với phương pháp **Native** đòi hỏi quá trình học tập, nghiên cứu và cập nhật rất nhiều kiến thức cũng như quá trình thực chiến dài hơi. Giả sử bạn có một đội nhỏ hoặc bạn thích lập trình **solo** chẳng hạn, sẽ cần rất nhiều thời gian để học tập, cập nhật kiến thức công nghệ, môi trường phát triển trước khi bạn có thể xây dựng được ứng dụng cho cả 3 nền tảng trên. Bạn cũng sẽ phải dành thêm rất nhiều thời gian nữa cho việc quản lý các thư viện và sử dụng các **workflows** khác nhau giữa các nền tảng (ví dụ **iCloud** chỉ chạy trên **IOS** chứ không có trên **Android**).  

#### **Ứng dụng Hỗ hợp - Hybrid** 
Ứng dụng **Hybrid** được phát triển dựa trên nền tảng **Web**, nhưng sẽ được phát hành trên các **App Store** như ứng dụng **Native**. Công nghệ này có thể được hiểu là một **FrameWork** hay là một cách để đóng gói **ứng dụng**  để nó có thể được gửi lên các **App Store**.  

Một vài nền tảng phổ biến như là **Phonegap** hay **Ionic**. Và bản chất những gì bạn thấy sẽ là một trang website được tải và đọc cục bộ trên nền tảng **WebView**.  

Kỳ vọng đặt ra khi xây dựng các **Hybrid App** là **Viết một lần, chạy ở mọi nơi**. Bạn sẽ phát triển ứng dụng của mình với HTML/CSS/Javascript, thật tuyệt vời phải không?. Các thành phần của thiết bi (microphone, camera, network, GPS,...) được kết nối thông qua các **JavaScript API**.  

Điểm trừ của việc phát triển ứng dụng **Hybrid** giống như việc thay vì bạn cố gắng làm thật tốt một công việc, bạn lại làm ở mức vừa phải nhiều công việc khác nhau. Vì vậy bạn sẽ tạo ra một ứng dụng chẳng tối ưu với nền tảng nào, bởi vì ứng dụng đó bỏ qua các đặc tính về tương tác với người dùng của từng nền tảng. Vì vậy, sẽ thật khó để xây dựng các ứng dụng phức tạp mà vẫn đạt hiệu suất cao.  

#### Xây dựng ứng dụng với **React Native** 

**React Native** đưa ra các phương pháp giao tiếp **_native_** đối với thiết bị **di động** thông qua **Javascript API**, tuy nhiên ứng dụng của bạn sẽ là ứng dụng **Native**, khác với việc bạn nhúng một **website** bên trong một **WebView**.  

Vì vậy, để phân biệt với **Hybrid App**, khẩu hiệu của **React Native** sẽ là **_Học một lần, viết code ở mọi nơi_**. Có nghĩa là bạn vẫn sẽ xây dựng ứng dụng đa nền tảng, nhưng bạn vẫn có khả năng tạo ra những ứng dụng riêng biệt, cung cấp những trải nghiệm tuyệt vời đối với mỗi nền tảng.  

Hiệu năng của ứng dụng sẽ tương đương với ứng dụng **native**, bởi những gì bạn xây dựng, về bản chất là một ứng dụng **native**, được phát hành trên **App Store**.  

### 3. Các đặc điểm của Progressive Web App.  

Trước hết thì **PWA** chỉ được hỗ trợ trên Android và IOS >=11.3.  

**PWA** có một đặc điểm khác hoàn toàn với các công nghệ được nhắc đến ở phần trước, đó là nó sẽ không được phát hành trên **App Store**.  
Đây là một ưu điểm quan trọng. **App Store** chỉ thực sự tốt khi bạn có thể tiếp cận hoặc may mắn được trở nên nổi bật và được nhiều người biết tới. Tuy nhiên, trừ khi bạn nằm trong top 0.001%, còn lại sẽ rất khó để bạn thu được lợi ích khi có một vị trí nhỏ nhoi trong **App Store**.  

**PWA** có thể được tìm thấy thông qua các công cụ tìm kiếm (**Search Engines**), và mỗi khi người dùng ghé thăm một **PWA-website**, trình duyệt sẽ phối hợp với thiết bị mà họ sử dung và đưa ra đề nghị cài đặt ứng dụng. Điều này thật sự mang lại lợi ích lớn, bởi vì chúng ta có thể áp dụng **SEO** vào ứng dụng của mình, dẫn đến việc sẽ ít phụ thuộc hơn vào việc trả tiền cho quảng cáo.  

Không cần phát hành trên **App Store** cũng có nghĩa là bạn sẽ không cần sự chấp thuận của **Google** hay **Apple** để ứng dụng mình tạo ra đến với người dùng. Phát hành các bản cập nhật bất cứ khi nào mà không cần làm theo các tiêu chuẩn, tiến trình phát hành gò bó của nền tảng.  

**PWA** về cơ bản là một ứng dụng web **HTML5/responsive**, với một vài công nghệ chủ chốt được giới thiệu gần đây, giúp hiện thực hoá những thuộc tính chủ chốt, tạo nên một **mobile-web-application**. Nếu bạn còn nhớ, thiết bị iPhone đầu tiên không hề cho phép phát triển ứng dụng **native**. Các **Devs** lúc đó được bảo rằng hãy phát triển ứng dụng **HTML5** có thể cài đặt ngoài màn hình **Home**, tuy nhiên công nghệ lúc đó vẫn chưa sẵn sàng cho việc này.  

**PWA** có thể chạy ở chế độ **Offline**.  

Sự ra đời của **Service workers** cho phép ứng dụng luôn luôn có thể làm mới nội dung, bằng cách tải chúng xuống dưới **background**, đồng thời cung cấp khả năng hỗ trợ **push notifications**.  

Khả năng chia sẻ của ứng dụng **PWA** cũng mang lại trải nghiệm tuyệt vời cho người dùng, khi họ sẽ chỉ cần chia sẻ đường dẫn **URL** mà thôi.  

### 4. Ưu điểm của Progressive Web App.  

* Ứng dụng **PWA** khá là nhẹ. Nếu như dung lượng của Native có thể lên đến 200MB hoặc hơn, thì một ứng dụng **PWA** có thể chỉ ở mức KBs.
* Không cần có mã nguồn **native** trong ứng dụng.  
* Nỗ lực ứng dụng để tiếp cận với người dùng mới giảm rất nhiều (thay vì phải vào **appstore**, tải ứng dụng về cài đặt thì bây giờ chỉ cần mở một website để trải nghiệm).
* Giảm đáng kể thời gian cho việc phát triển và phát hành cập nhật.  
* Hỗ trợ **Deep Links** tốt hơn với ứng dụng **native** thông thường.  

### 5. Các khái niệm cơ bản  
* **Responsive**: Giao diện tương thích với kích thước của màn hình thiết bị.  
* **App-like feel**: Trải nghiệm **Web** gần giống với trải nghiệm **App**.
* **Offline support**: sử dụng bộ nhớ của thiết bị để cung cấp trải nghiệm offline.  
* **Re-engaging**: Đẩy thông báo (**notification**), giúp người dùng khám phá lại ứng dụng một khi được cài đặt.  
* **Discoverable**: Các công cụ tìm kiếm và việc tối ưu hoá SEO có thể mang nhiều người dùng đến với ứng dụng của bạn hơn.  
* **Fresh**: Ứng dụng tự động cập nhật một khi **online**.  
* **Safe**: Ứng dụng sử dụng HTTPS
* **Progressive**: Ứng dụng hoạt động trên mọi thiết bị, ngay cả các thiết bị cũ, mặc dù có thể chúng có ít tính năng hơn.  
* **Linkable**: Dễ dàng để chia sẻ, kết nối đến tới ứng dụng chỉ với đường dẫn **URL**

Trên đây là những tìm hiểu cơ bản về **PWA**, được mình tham khảo từ bài viết **_[An introduction to Progressive Web Apps](https://medium.freecodecamp.org/an-introduction-to-progressive-web-apps-6aa75f32816f)_**. Có khá nhiều điều đang chờ đợi từ phương pháp này phải không? Ở phần tiếp theo mình sẽ chia sẻ phần tìm hiểu về các công nghệ chủ chốt để xây dựng ứng dụng **PWA**.