Mỗi khi nhắc đến lập trình mobile đa nền tảng (iOS & Android), hầu hết mọi người sẽ nghĩ đến React Native hoặc Flutter. Có một lựa chọn khác đang bị underrated nhưng thực chất vô cùng tiềm năng, đó chính là Ionic Framework.

Tất nhiên không thể tự dưng mà đem Ionic so sánh với React Native hay Flutter được, vì chúng thuộc 2 loại framework khác nhau: một bên là Hybrid sử dụng WebView để load và chạy HTML, một bên là Cross-platform build toàn bộ app thành các native control tương ứng với platform. Tùy vào mỗi loại nghiệp vụ mà chúng sẽ phát huy thế mạnh khác nhau.

Tuy nhiên, nếu ứng dụng không đặt nặng về việc tương tác phần cứng thiết bị (các tính năng native như GPS, Bluetooth, NFC...), hoặc không yêu cầu quá cao về mặt hiệu suất, thì Ionic là lựa chọn rất đáng xem xét, vì **có lợi về mặt chi phí, hiệu quả cũng như thời gian phát triển sản phẩm**.

# Ionic - CapacitorJS là gì?

Ionic là một framework cho phép bạn viết app mobile bằng phương pháp Hybrid, nghĩa là toàn bộ ứng dụng sẽ được xây dựng trên nền tảng web thông thường (HTML, CSS, JS) nhưng với giao diện & hiệu ứng của di động. Sau đó sử dụng một control WebView để tải và chạy nội dung HTML đó. Do vậy, có thể xem ứng dụng Hybrid tương tự như việc chúng ta chạy website responsive bằng trình duyệt của di động.

![Hybrid app](https://raw.githubusercontent.com/nambach/viblo/master/posts/04/hybrid.png)

> Nghe lừa đảo vậy cha? Khác nào việc sửa lại responsive của website hiện tại, nhét vào một cái browser, tải lên AppStore và bảo với khách hàng, đây là app di động mà các bạn yêu cầu ("Có khác quái gì website hiện tại đâu!?")

Tuy nhiên, sự khác biệt ở chỗ, Hybrid App vẫn cho phép chúng ta **sử dụng hầu hết các tính năng phần cứng** của thiết bị (điều mà trình duyệt không làm được). Và bởi vì chạy trên WebView nên các component của Ionic đều được tối ưu về mặt hiệu suất, trong khi vẫn đảm bảo UI/UX phù hợp với từng loại platform, một sự tiện lợi về mặt thời gian và công sức dành cho các developer trước giờ vẫn luôn theo lối desktop-driven.

![Capacitor](https://capacitorjs.com/assets/img/blog/how-capacitor-works/zoomed.png)
*Kiến trúc của CapacitorJS - thư viện giúp Ionic truy xuất phần cứng di động (Nguồn: [capacitorjs.com](https://capacitorjs.com/blog/how-capacitor-works))* 

Về bản chất, Ionic là tập hợp các UI component được sử dụng để build codebase HTML. Để build ra platform iOS và Android, chúng ta cần sử dụng 1 thư viện generate ra thư mục project của platform tương ứng. Có 2 lựa chọn là **Cordova** hoặc **CapacitorJS**. CapacitorJS ra đời sau này, được phát triển bởi chính đội ngũ Ionic dựa trên người tiền nhiệm Cordova của Apache.

# Đánh giá
## 1. Learning Curve

Ionic được xem là loại framework "mì ăn liền" dành cho dân front-end để viết app mobile. Bởi cơ chế Hybrid, ứng dụng mobile lúc này không khác gì một ứng dụng web thông thường.

- Đầu tiên cần tìm hiểu bộ CLI và các component có sẵn. Chúng chỉ đơn thuần là các web component, được Ionic hỗ trợ ở cả 3 dạng là Angular, React, Vue, và cả vanilla JavaScript.
- Tiếp theo, cần tìm hiểu về thư viện CapacitorJS để tạo ra thư mục project iOS hoặc Android tương ứng. Khi đã có thư mục project iOS và Android, quá trình clean build ra file `.ipa` và `.apk` là như nhau cho dù chúng ta sử dụng framework nào đi chăng nữa.

Như vậy xét về khả năng lĩnh hội, Ionic tốn ít chi phí nhất để tìm hiểu và biết cách sử dụng, nếu đem so sánh với React Native hoặc Flutter.

>  Hiện tại trên thị trường có rất nhiều khóa đào tạo React Native & Flutter, bởi 2 framework đó cần tốn nhiều thời gian để học và thực hành. Để code React Native, bạn phải biết ReactJS, tuy nhiên những hiểu biết về ReactJS không phải lúc nào cũng đúng 100% với React Native. Hơn nữa, optimize performance cho React Native là một vấn đề khó. Còn với Flutter, bạn phải học Dart, một ngôn ngữ hoàn toàn mới, và hướng tiếp cận, cách tối ưu và các best practices cũng rất khác thông thường.

## 2. UI/UX Customizable

Bản chất của Hybrid là HTML,  nên Ionic cho phép khả năng customize các component ở mức linh hoạt tối đa, như cách chúng ta style và animate HTML thông thường.

<br>

<div align="center">
    <img src="https://github.com/nambach/ionic-form-components/blob/master/wiki/images/gif/full.gif?raw=true" alt="full.gif">
    
*Các components được custom từ Ionic (Nguồn: [ionic-form-components](https://github.com/nambach/ionic-form-components))*

</div>


Trong khi đó, React Native và Flutter biên dịch thành các ***native control***. Native control mang lại ưu thế về mặt hiệu suất, nhưng bù lại việc customize và style không hề đơn giản. Trong hầu hết các trường hợp, việc google một thư viện có sẵn (thay vì đi code lại từ đầu) sẽ hiệu quả hơn về thời gian lẫn độ tối ưu của code. Bên cạnh đó, mỗi framework sẽ có một hệ thống animation riêng, sẽ tốn nhiều công sức để thành thạo chúng.

## 3. Performance

Đây thường là yếu tố có tính quyết định chủ chốt. Phần lớn mọi người sẽ loại bỏ Ionic ra khỏi các lựa chọn khi xây dựng mobile app, bởi cơ chế hoạt động của Hybrid app được cho là *"chậm hơn rất nhiều so với React Native & Flutter"*.
> "Sử dụng WebView để chạy HTML CSS thì làm sao nhanh bằng việc build ra native app như React Native hay Flutter được?"

Tuy nhiên, Hybrid app có thật sự "chuối" như giang hồ vẫn hay đồn đại? 

Bản thân mình trước đây luôn dè bỉu dòng framework này, thời mà PhoneGap vẫn còn nổi tiếng và Ionic vẫn chưa được nhiều người biết đến. Khi dự án ở công ty yêu cầu làm app mobile, mình chọn ngay React Native mà không cần suy nghĩ. Đến app mobile thứ hai, mình chuyển sang Ionic Angular, lý do là để người khác có thể tiếp tục bảo trì dự án sau khi mình rời công ty (team mình có 3 front-end Angular nhưng không ai biết React Native). Khi chạy thử trên virtual device, Ionic có một khoảng lag rõ rệt và chậm hơn React Native, nhưng sau khi build, publish và chạy trên thiết bị vật lí, ***hầu như không nhận ra sự khác biệt của app React Native và app Ionic***, bởi các thao tác scroll, navigate, pan & zoom, các hiệu ứng animation... đều mượt và nhạy như nhau. Nếu không tin, bạn có thể thử.

> "The performance of the Ionic application is not as good as compared to native mobile applications. **However, the performance gap is not noticeable** for most of the average users." - trích từ [javatpoint.com](https://www.javatpoint.com/ionic-vs-phonegap) 👈 đến bây giờ mình mới nhận ra là trang web này nó không nói xạo, 

Như vậy, xét về performance, Ionic *có chậm hơn* so với native app, nhưng nếu được code cẩn thận, biết tận dụng kĩ thuật performance optimization trong front-end, như là việc sử dụng immutable object khi quản lý state,  `PureComponent` trong React hay là `ChangeDetectionStrategy.OnPush` trong Angular, thì hiệu suất của các app Ionic cũng nhanh không thua kém gì native app.

Nếu bạn có ý định tìm hiểu Ionic, hoặc đã làm việc với Ionic nhưng gặp các vấn đề về hiệu suất, thì đây là một bài viết đáng đọc của tác giả Josh Morony: [Ionic Framework Is Fast (But Your Code Might Not Be)](https://eliteionic.com/tutorials/ionic-framework-is-fast-but-your-code-might-not-be/).

> (Có thể bạn đã biết) Tối ưu performance cho React Native là cả **một nghệ thuật** mà không phải ngày một ngày hai là có thể lĩnh hội được. Tổ chức Callstack có xuất bản [một ebook dày 123 trang](https://callstack.com/data/The_Ultimate_Guide_to_React_Native_Optimization_Ebook-Callstack_FINAL.pdf) nói về những quy tắc để tối ưu performance của React Native, phân tích từ những vấn đề bên ngoài rồi đi sâu vào bên trong thiết kế của framework. Bởi thế, nhiều trường hợp app mobile được code bằng React Native, nhưng performance vẫn cực kì tệ hại là chuyện bình thường.


## 4. Native features

Bên cạnh performance thì đây là yếu tố thứ hai khiến nhiều người loại bỏ Ionic ra khỏi cuộc chơi ngay từ đầu.

Thực ra, Ionic chỉ bao gồm các UI components. Khả năng tương tác với phần cứng được quyết định bởi Cordova & CapacitorJS. Các tính năng phần cứng được cung cấp thông qua các plugin Javascript. Số lượng các plugin của Cordova nhiều và ổn định hơn CapacitorJS, nhưng CapacitorJS hiện đang được cộng đồng hỗ trợ mạnh mẽ, và bất kì plugin Cordova nào cũng có thể import để sử dụng trong CapacitorJS.

Như vậy, số lượng tính năng phần cứng của Ionic sẽ bị phụ thuộc vào khả năng hỗ trợ của Cordova & CapacitorJS. Tuy nhiên, tính đến thời điểm hiện tại, số lượng tính năng được hỗ trợ cũng nhiều đủ để xây dựng gần như bất kì ứng dụng mobile nào: *Push Notification, Camera, Storage, GPS, Barcode Scan, Bluetooth, Map...*

## 5. Development

Một điểm trừ là Ionic không hỗ trợ hot-reload trên virtual & physical device. Nếu ứng dụng đặt nặng vấn đề tương tác phần cứng (GPS, bluetooth...) thì việc phát triển sẽ tương đối tốn thời gian. Còn nếu không, tốc độ phát triển ứng dụng chỉ là chuyện nhỏ, bởi Ionic có khả năng **live-reload ngay trên browser** mà không cần mở virtual/physical device để hiển thị.

# Kết

Không có framework nào là "fit-for-all", là tốt nhất cả. Tùy vào các trường hợp nghiệp vụ khác nhau mà mỗi framework sẽ phát huy thế mạnh riêng của mình.

Chỉ là cảm nhận của cá nhân mình, có vẻ Ionic đang bị đánh giá quá thấp so với tiềm năng và lợi ích mà nó mang lại. Hy vọng sau bài viết này, các bạn sẽ có cái nhìn thiện cảm và hấp dẫn hơn với Ionic, để nó có một vị trí xứng đáng trong danh sách các lựa chọn tiếp theo của bạn.

# Liên kết ngoài

- Ionic Framework Tutorial: https://ionicframework.com/docs/developing/starting
- Ionic Framework Is Fast (But Your Code Might Not Be): https://eliteionic.com/tutorials/ionic-framework-is-fast-but-your-code-might-not-be
- Ask a Lead Dev: React Native or Ionic?: https://ionicframework.com/blog/ask-a-lead-dev-react-native-or-ionic/