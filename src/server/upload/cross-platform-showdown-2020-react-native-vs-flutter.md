Vậy là đã được gần 2 năm từ khi Airbnb public series nói về việc [họ quyết định từ bỏ React Native](https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c). Đây là 1 series gồm 5 phần, và nếu các bạn chưa đọc nó thì tôi recommend các bạn hãy đọc. 

Airbnb là 1 công ty khá lớn ở Mỹ. Tại thời điểm họ đăng series này, đã có nhiều lo ngại về việc sử dụng các cross-platform framework để phát triển ứng dụng trên điện thoại thay vì những SDK official như Android hay iOS SDK. Đương nhiên rồi, trong khi React Native còn chưa được đón nhận rộng rãi, một công ty lớn ra mặt thông báo rằng họ sẽ không dùng React Native để phát triển ứng dụng nữa sẽ gây nên hiệu ứng ái ngại cho những công ty nhỏ hơn. 

Tuy nhiên, chúng ta cũng cần phải thành thực rằng, native và cross-platform framework hướng đến những đối tượng khác nhau. Chúng ta chọn sử dụng cross-platform framework vì nó mang lại tốc độ phát triển vượt trội bằng việc sử dụng một codebase cho nhiều nền tảng, từ đó sẽ giảm thiểu được số lượng developer ở trong mỗi dự án. Đó là 1 trong những nguyên nhân cross-platform phù hợp hơn cho những startup thay vì công ty lớn như Airbnb - nơi mà họ có đủ nguồn lực về tài chính/nhân sự/thời gian để đưa ra được những sản phẩm tốt nhất.

Tính đến thời điểm hiện tại, có 3 cross-platform framework chính mà chúng ta có thể sử dụng: Xamarin.Forms (2014), React Native (2015) và Flutter (2017). Tôi sẽ không nhắc đến những framework như Cordova, Ionic hay Phonegap vì những framework này chỉ là những webapp được nén lại trong 1 webview và release như 1 app native, nên performance của chúng cực kỳ tệ. Trong 3 framework chính đó, Xamarin gần như là yếu thế nhất và ở thời điểm hiện tại không ai chọn sử dụng nó cả, vậy nên trong bài này chúng ta sẽ nói về React Native và Flutter.

## How they work

Để có thể đưa ra được những đánh giá chuẩn xác nhất, chúng ta cần phải biết được cách thức hoạt động của React Native và Flutter. Để nói chi tiết về nó thì chắc phải viết bài khác mất, nên mọi người muốn tìm hiểu kỹ hơn thì Google nhé. Tôi sẽ tóm tắt lại như sau:

### React Native  

![](https://images.viblo.asia/4ba7fd6c-182f-4448-bcaf-baec834dd6c5.png)

<div align="center">Mượn tạm cái ảnh trên mạng</div>


Về cơ bản, 1 ứng dụng React Native sẽ có 3 phần: 

- Phần Javascript: Đây là toàn bộ code React Native trong app của bạn, được triển khai bằng JavaScriptCore là 1 máy ảo để chạy code Javascript.
- Bridge (cầu nối): Đây là trái tim của 1 ứng dụng React Native, nó sẽ chuyển những yêu cầu từ phía Javascript sang cho phía Native.
- Phần Native: Đây là nơi tiếp nhận và thực hiện những yêu cầu từ Bridge.

Để tôi nói rõ hơn về luồng chạy của nó nhé. Giả sử chúng ta code 1 cái app React Native (RN) đơn giản show 1 dòng chữ "Hello World", được thể hiện bằng `Text` component như thế này:

```javascript
<Text>Hello World</Text>
```

Đầu tiên, phía Javascript sẽ tiếp nhận đoạn code trên và đưa ra yêu cầu render view trên. Yêu cầu đó được chuyển tới Bridge, nơi nó sẽ phân tích yêu cầu và gửi qua cho phía Native. Khi phía Native nhận được thông tin phải render cái gì, nó sẽ tạo ra view native khi nó đã sẵn sàng. Ví dụ với `Text` trên thì bên Android sẽ render 1 `TextView`, còn iOS sẽ render 1 `UITextView`. Đó chính là lí do cùng một code phía React Native nhưng sẽ hiển thị khác nhau trên Android và iOS, vì đơn giản là phía Javascript chỉ đưa ra yêu cầu view sẽ được render ra như thế nào chứ trực tiếp không render. Phía native sẽ làm điều đó.

TL;DR: Chúng ta có thể coi RN là 1 wrapper của native UI, nó cung cấp cho chúng ta những UI component cơ bản như `Text`, `TextEdit`, `Image` và những component này sẽ được render bởi phía native (Android/iOS) bằng các native view tương ứng.


### Flutter

![](https://images.viblo.asia/6765b4e1-97af-453d-97d3-1426442566f4.png)

Ok, nhìn vào hình trên thì có vẻ hơi bị quá chi tiết, nên tôi sẽ cố gắng tóm tắt lại. Flutter Framework sẽ cung cấp cho chúng ta những widget (tương tự như component của RN) để đẩy nhanh quá trình phát triển app. Ví dụ như ở RN có component `Text` thì bên Flutter cũng có widget `Text`. Tuy vậy, Flutter khác React Native ở chỗ nó render mọi view trên màn hình thông qua rendering engine của chính nó (Skia) chứ không phụ thuộc vào phía native. Nghĩa là khi bạn muốn render 1 text `Hello World` trên màn hình thì Flutter sẽ làm từ a-z những việc như position, layout, draw, và phía native chỉ đóng vai trò là host cả ứng dụng chứ không có tác dụng nào khác. Điều này là một lợi thế nhưng trong vài trường hợp cũng là điểm bất lợi mà tôi sẽ nói ở dưới.

TL;DR: Tôi thích ví Flutter giống như Unity vậy nhưng nếu Unity dùng để làm game thì Flutter lại được dùng để làm mobile app (OK, bạn có thể dùng Unity để làm app, nhưng như thế cũng giống như dùng dao mổ trâu để giết gà vậy, nó quá thừa thãi). Khác với RN thì gần như phía native chỉ đóng vai trò là host chứ gần như có rất ít xử lý tương tác với Flutter. Flutter sẽ tự đảm nhiệm gần như mọi tác vụ trong 1 ứng dụng.


## Performance

Khi nhắc đến 1 ứng dụng crossplatform thì điều đầu tiên người ta sẽ nói đến chính là hiệu năng. Không có một ai làm sản phẩm nghiêm túc lại đánh đổi phần lớn tốc độ sử dụng app của người dùng chỉ để tăng một chút hiệu suất làm việc của dev hoặc để giảm thiểu chi phí cả. Đó là lí do mà những framework như Cordova, Ionic hay Phonegap không được lựa chọn, đơn giản bởi vì chúng đem lại hiệu năng quá tệ. 

Đã có rất nhiều bài viết so sánh về hiệu năng của RN và Flutter ở trên mạng nên trong bài viết này tôi sẽ không thực hiện lại nữa. Thay vào đó, dựa trên những hiểu biết về RN và Flutter của chúng ta ở trên, ta có thể rút ra được một số luận điểm như sau:
- RN sẽ không bao giờ mang lại hiệu năng cao hơn được native. Lí do: là wrapper và sử dụng bridge, Javascript không có khả năng thực hiện các performance như AOT compilation, không hỗ trợ multithread  gây nghẽn cổ chai.
- Flutter thì vẫn có khả năng đem lại hiệu năng cao hơn phía native trong một số trường hợp. Lí do: Ví dụ có 2 app giống nhau hoàn toàn về mặt giao diện, 1 cái được code bằng native sdk, 1 cái được code bằng Flutter, thì tuy là chúng ta thấy nó giống y hệt nhau nhưng thực chất cách chúng hoạt động và phần bên dưới lại khác nhau hoàn toàn. Flutter có một engine riêng và 1 thư viện đồ họa riêng là Skia - Đây là 1 thư viện đồ họa 2D khá phổ biến và được dùng trong Chrome. Do native và Flutter có cách render UI khác nhau nên khó có thể nói là bên nào tốt hơn hẳn được và thực tế là trong một số bài test performance thì Flutter còn cho hiệu năng cao hơn cả app được viết bằng native SDK. Ngoài ra, ngôn ngữ lập trình của Flutter cũng đem lại lợi thế về hiệu năng hơn so với Javascript vì đây là một ngôn ngữ có thể compile trực tiếp sang machine code chứ không cần thông qua máy ảo.

Tuy vậy, trong thực tế, bạn sẽ khó có thể nhận ra một app được viết bởi RN hoặc Flutter chỉ bằng việc nhìn vào tốc độ của nó. 2 framework này có khả năng đáp ứng tốt cho hầu hết các ứng dụng hiện nay - thành thực mà nói thì phần lớn các ứng dụng bây giờ cũng chỉ bao gồm text, ảnh và list thôi, mà những component này đã được optimize rất tốt rồi và nếu bạn sử dụng đúng cách thì việc đạt được 60fps là chuyện thường ở huyện.

## Giai đoạn phát triển

Trong phần này, chúng ta sẽ tìm hiểu sâu hơn một chút về RN và Flutter, xem trong giai đoạn phát triển thì chúng sẽ có lợi thế hoặc khó khăn nào.

### Ngôn ngữ

RN: Javascript, Typescript, JSX

- Typescript thì là ngôn ngữ kiểu mạnh nên có thể check được những lỗi liên quan đến kiểu ở compile time. Javascript thì là kiểu yếu nên nhiều bug chỉ có thể được phát hiện ở runtime, tuy vậy cũng có thể sử dụng PropTypes để check kiểu.
- Là một trong những ngôn ngữ phổ biến nhất, gần như dev nào cũng từng dùng qua.
- Code được parse và execute bởi máy ảo ở runtime nên có khả năng thực hiện OTA update mà không cần thông qua store.
- Performance kém hơn so với ngôn ngữ được compile AOT.
- UI code bằng JSX, dễ đọc hơn.
- Dễ học.

Flutter: Dart

- Là một ngôn ngữ kiểu mạnh nên sau khi compile xong thì đã lọc được một lượng kha khá các bug mà bạn có thể dính nếu dùng Javascript. Cũng có hỗ trợ kiểu động.
- Chạy được trên nhiều nền tảng.
- Compile thành ARM/x64 machine code, mang lại performance rất tốt, JIT compilation là nền tảng cho tính năng Hot Reload.
- Do release app được compile AOT, không thể thực hiện OTA update mà bắt buộc phải thông qua store.
- UI code bằng chính ngôn ngữ phát triển, đôi khi khó đọc.
- Dễ học.

Điểm yếu của Dart nói riêng và Flutter nói chung vẫn là việc người ta có sẵn lòng đón nhận nó hay không. Ở thời điểm hiện tại, nếu bạn học Dart, bạn sẽ chỉ có thể dùng nó cho những project Flutter. Còn nếu bạn đầu tư vào Javascript/Typescript thì gần như chỗ nào bạn cũng có đất diễn cả, và đó là lí do ngôn ngữ sẽ là điểm mạnh để RN có thể lôi kéo nhiều dev mới hơn. Ngoài ra, OTA update cũng là 1 trong những điểm hút khách của RN khi mà bạn có thể đưa ra những bản patch trực tiếp đến máy của người dùng mà không cần phải chờ approve từ store.

### Tooling

Nhờ việc sử dụng Javascript làm ngôn ngữ phát triển, RN hưởng lợi rất nhiều từ những tooling hỗ trợ ngôn ngữ này. Về editor, chúng ta có VSCode, Webstorm, Atom,... package manager có npm, yarn, linting thì có eslint, code format có prettifier,... Do đó, hầu hết developer đã có kinh nghiệm với những tool này và có thể bắt đầu rất nhanh.

Flutter cũng đi theo một con đường tương tự là cài đặt theo dạng plugin lên các IDE phổ biến hiện nay như Android Studio, VSCode. Tuy vậy, những thứ khác như package manager hay lint thì lại phải phụ thuộc vào Dart nên cũng phần nào làm giảm lại tốc độ tìm hiểu ban đầu của những dev mới. Tuy vậy, khi đã làm quen rồi thì cá nhân tôi lại đánh giá cao các tool bên Flutter hơn một chút, đơn cử là phần lớn những gì chúng ta cần đã được cài đặt mặc định rồi nên không cần phải tìm hiểu quá nhiều. Một trong những tính năng tôi thích nhất của Flutter plugin là nó có thể hiển thị được UI code dưới dạng tree view:

![](https://images.viblo.asia/bd2c6934-0d3e-462e-ab4b-294b22969060.png)

Điều này sẽ giúp code UI dễ đọc hơn rất nhiều nhưng cũng là nhược điểm của Flutter. Do có tooling support tốt nên việc Flutter không chọn một ngôn ngữ khác để code UI (như JSX trong RN) sẽ là điểm yếu của nó ở những nơi tooling này không hoạt động như trên Github chẳng hạn:

![](https://images.viblo.asia/9559be07-ce28-4486-bdd8-d5bbdff31306.png)

Đối với những giao diện phức tạp, UI sẽ phải kết hợp thêm rất nhiều layer và vì thế việc review code trên các VCS sẽ rất khó khăn. Tuy vậy, UI code bằng chính ngôn ngữ phát triển lại đang là xu hướng hiện nay trên các platform native, với Android chúng ta có Jetpack Compose, iOS thì có SwiftUI, nên trong tương lai có thể Flutter sẽ có những cải thiện để code có thể dễ theo dõi hơn.

### Debugging

RN support log statement và debugging tool thì chúng ta có `react-native-debugger` (tool của bên thứ 3). Đây là một debugging tool khá tốt và có first class support cho `Redux`. Về breakpoint debug thì RN hoạt động chưa tốt lắm và đôi khi không thể debug được hoặc sẽ bị lỗi nào đó.

Có 1 vấn đề mà các developer cần phải nắm được, đó là việc khi chạy một ứng dụng RN ở chế độ Remote Debugging, code Javascript trong ứng dụng RN sẽ được thực thi bởi V8 engine có trong Chome thay vì JavaScriptCore trên iOS hoặc một phiên bản JavaScriptCore được bundle cùng ứng dụng Android. Điều này dễ dẫn tới một số bug rất khó để phát hiện. Tôi đã từng gặp một trường hợp app RN khi chạy trên Android crash vì không thấy hàm "includes" của array, nhưng khi chạy debug thì lại không gặp lỗi đó. Tìm hiểu sâu hơn mới biết rằng phiên bản JavascriptCore trên Android không có hàm đó, còn trên V8 engine thì có nên không xảy ra lỗi. Ngoài ra còn khá nhiều bug tương tự liên quan đến vấn đề này, bạn có thể xem kỹ hơn tại đây https://medium.com/@suyogkrazz/you-should-not-always-rely-on-remote-debugging-react-native-787a850c7ad8

Flutter cũng support hầu hết các chức năng debug, từ log cho đến breakpoint. Ngoài ra, Flutter còn có thêm Web debug và Inspector để kiểm tra về UI tree. Theo kinh nghiệm của tôi thì việc debug bên Flutter hoạt động ổn định hơn và ít khi xảy ra những lỗi không lường trước được hơn.

### Hot Reload

Đây là lợi thế lớn nhất của các framework cross-platform so với việc phát triển ứng dụng bằng native SDK. Dù ở thời điểm hiện tại, build time của Android và iOS đã được cải tiến để giảm đi đáng kể, Android thậm chí còn phát triển tính năng Instant Run để đẩy nhanh quá trình phát triển hơn, tuy vậy bạn vẫn chưa thể có được trải nghiệm như các Web developer khi họ chỉ cần F5 là trang web đã có những thay đổi mới nhất. Thử tưởng tượng nếu bạn thay đổi màu background của một màn hình trong ứng dụng mà cần phải chờ vài phút mới có thể thấy được kết quả thì thật sự không hiệu quả chút nào. Nhờ vào Hot Reload, tốc độ phát triển app cross-platform vốn đã rất nhanh với 1 codebase, nay còn nhanh hơn gấp bội vì build time được giảm xuống gần như bằng 0 và thậm chí app vẫn giữ được state trước khi thay đổi xảy ra.

Ở những phiên bản cũ, RN cung cấp chức năng Hot Reload và Live Reload, tuy nhiên những chức năng này hoạt động tương đối bất ổn định và thường xảy ra lỗi làm mất state của app, do đó developer RN thường chỉ sử dụng chức năng reload nhanh mà thôi (cũng nhanh hơn rất nhiều so với chờ build app native rồi). Ở phiên bản 0.61 trở đi, RN đã giới thiệu một chức năng mới là Fast Refresh, cho phép phản ánh ngay lập tức những thay đổi trong code lên app. Chức năng này tuy chỉ là cải tiến của Hot Reload và nó cũng có những hạn chế nhất định (như việc state của class component sẽ không được giữ lại) nhưng những hạn chế đó hầu như đều có thể khắc phục được bằng việc sử dụng functional component, vốn đang là hot trend hiện tại để thay thế class. Bạn có thể xem video trực quan về Fast Refresh tại [đây](https://reactnative.dev/blog/2019/09/18/version-0.61).

Flutter cũng có chức năng Hot Reload và chức năng này hoạt động tốt và ổn định hơn rất nhiều so với RN. State của app được giữ lại hoàn toàn và chỉ những thành phần thay đổi mới được render lại, ngay cả trong trường hợp app gặp lỗi. Ví dụ bạn đang ở màn hình số 3 trong app, bạn thay đổi màu của chữ chẳng hạn, thì màu chữ mới sẽ được phản ánh ngay và bạn vẫn giữ được vị trí hiện tại là màn hình số 3. Flutter team thậm chí đã tạo ra những bài benchmark tính năng này và kết quả là tới hơn 90% số lần Hot Reload thành công và phần lớn trong số đó hoàn thành trong chưa tới 1s. Đây là những con số rất ấn tượng và nó góp phần không nhỏ trong việc làm quá trình phát triển ứng dụng trở nên mượt mà và nhanh chóng hơn.

![](https://images.viblo.asia/226ae918-f5db-4b2d-b681-787b780fe2be.gif)


### Nguyên tắc xây dựng UI

Như chúng ta đã biết, RN hoạt động dựa trên việc đóng gói các native view trên từng nền tảng khác nhau. Ví dụ, `Text` trong RN sẽ được render thành `TextView` trên Android và `UITextView` trên iOS. Điều này giúp cho các app RN có giao diện thuần native và sẽ hoạt động y hệt như 1 app native. Điểm mạnh của cách tiếp cận này là việc các UI component này sẽ được "tự động" update khi có phiên bản mới. Ví dụ, nếu `TextView` trong Android 9 được update sang một style mới thì những app RN sử dụng `Text` khi chạy trên Android 9 sẽ tự động được cập nhật style mới đó mà developer không cần phải làm thêm bất cứ việc gì. Tuy nói đây là điểm mạnh nhưng cũng chính là điểm yếu của 1 app RN, khi việc đảm bảo design thống nhất trên tất cả các phiên bản hệ điều hành là điều không thể. Vì cũng tương tự như với phiên bản mới, app RN chạy trên máy có phiên bản cũ cũng sẽ chỉ được thừa hưởng các UI component của phiên bản cũ.

Flutter có cách tiếp cận trái ngược, khi những widget của nền tảng này được xây dựng để bắt chước một cách giống nhất có thể các UI component của các hệ điều hành khác nhau. Flutter team chia sẻ họ đã nghiên cứu từng component một cách chi tiết và thậm chí chi tiết đến mức độ họ đo cả chuyển động của `ScrollView` trên từng nền tảng để cho ra được một bộ widget hoạt động chính xác và giống phiên bản gốc đến từng pixel. Với một bộ widget đồ sộ được build sẵn bởi Google, việc xây dựng UI bằng Flutter cũng sẽ mang đến tốc độ phát triển app cực kỳ nhanh, có thể nói còn nhanh hơn cả RN vì lượng widget built-in lớn hơn rất nhiều. Với cách làm này, nhược điểm của nó chính là việc khi có thay đổi ở những phiên bản mới thì chúng ta sẽ phải chờ Flutter update widget của mình tương ứng với phiên bản đó chứ không thể "ăn xổi" như app RN được. Tuy vậy, đây cũng có thể coi là điểm mạnh của Flutter, khi các widget sẽ có giao diện và cách hoạt động y hệt nhau dù chạy ở phiên bản nào của hệ điều hành đi chăng nữa, và điều đó giúp cho design có một sự thống nhất và như Flutter mô tả, "pixel-perfect".

Theo tôi, đây chính là một trong những điểm quan trọng nhất mà bạn cần phải nắm được nếu còn đang phân vân không biết lựa chọn nền tảng nào cho app của mình. Nếu app của bạn cần có giao diện tương ứng với nền tảng mà nó chạy trên đó thì React Native có vẻ sẽ là lựa chọn đơn giản hơn, do các view sẽ được render bằng native view. Còn nếu app của bạn yêu cầu có design thống nhất và giống nhau trên cả 2 nền tảng thì Flutter sẽ là lựa chọn tốt hơn.

### Ecosystem

RN với ngôn ngữ phát triển là Javascript có lợi thế lớn về mặt support khi ngôn ngữ này số lượng package hỗ trợ thuộc top đầu trong tất cả các loại ngôn ngữ. Về các package hỗ trợ cho RN nói riêng thì số lượng cũng rất lớn do RN được release trước và có lượng developer lớn hơn. Gần như mọi thứ bạn cần trong app như routing, state management hay UI component đều có đủ và điều này làm cho chúng ta không cần mất nhiều thời gian mà có thể dùng quỹ thời gian đó để tập trung phát triển những logic riêng của app.

Flutter ra đời sau, số lượng các package hỗ trợ không nhiều như RN nhưng cũng sẽ đáp ứng hầu hết những gì bạn cần. Điểm khác biệt ở đây là hầu hết các package phổ biến của RN thì được tạo ra bởi cộng đồng, còn những package phổ biến của Flutter thì được tạo ra bởi Google. Đây là một khác biệt khá quan trọng mà bạn nên cân nhắc khi lựa chọn 1 trong 2 framework này. RN có community lớn hơn ở thời điểm hiện tại, ngược lại Flutter được Google support kỹ lưỡng hơn với việc họ tự đầu tư phát triển các Widget với đầy đủ chức năng giúp đẩy nhanh quá trình phát triển app Flutter. Lấy ví dụ về Shared Element Transition - một chức năng đem lại hiệu quả về mặt hình ảnh rất lớn; chức năng này không có trong RN (hoặc chỉ được support bởi package của bên thứ 3) nhưng lại được Flutter hỗ trợ và cách sử dụng nó cũng rất dễ dàng, thậm chí dễ hơn cả việc bạn implement ở phía native.

{@embed: https://www.youtube.com/embed/Be9UH1kXFDw}

### Testing

Cả React Native và Flutter đều hỗ trợ các phương thức testing cơ bản như Unit test, UI test và Integration test. Về unit test và UI test, React Native có hỗ trợ test framework chính chủ đi kèm là Jest. Với Jest, bạn có thể thực hiện hầu hết các loại assertion và matching, ngoài ra Jest còn support trực tiếp React với Snapshot test - một hình thức để test UI component đặc trưng. Với Integration test, RN chưa có phương án chính thức để hỗ trợ mà hiện tại đang phụ thuộc vào package của bên thứ 3.

Như đã nói ở trên, hệ sinh thái của Flutter chưa phong phú bằng RN do được phát triển bằng một ngôn ngữ kém phổ biến hơn Javascript, nên bạn sẽ không có nhiều lựa chọn để thay thế những test framework mặc định. Tuy vậy, Flutter đã chứng minh là họ rất ít khi cần phụ thuộc vào bên thứ 3 khi họ đã phát triển một test framework hỗ trợ đầy đủ tất cả các loại hình testing và nếu bạn đã làm Android rồi thì việc làm quen với những công cụ này sẽ rất nhanh.

## Tài liệu, cộng đồng, tương lai

Nếu nói về tốc độ phát triển của công nghệ hiện nay thì có thể coi RN và Flutter là những framework khá "trưởng thành". RN được ra mắt từ 2015 và đến nay đã có 5 năm tích lũy kinh nghiệm. Trong thực tế, họ đang thực hiện khá nhiều cải tiến để giải quyết nhiều vấn đề đang gặp phải cũng như để cải thiện hơn nữa về mặt hiệu năng, từ việc [tái cấu trúc framework để giúp nó trở nên linh hoạt và có tính tương thích cao hơn](https://reactnative.dev/blog/2018/06/14/state-of-react-native-2018) đến việc rewrite và tách các module support ra khỏi core framework làm nó nhẹ hơn ([project Lean Core](https://github.com/facebook/react-native/issues/23313)). Có thể nói Facebook đã đầu tư một lượng lớn cả nhân sự, thời gian và tiền bạc để làm RN trở thành một trong những framework tốt nhất và là thứ người ta nghĩ đến đầu tiên nếu muốn phát triển app mobile, và ở thời điểm hiện tại thì họ đã thành công phần nào. React Native đã và đang được rất nhiều ông lớn lựa chọn như Skype, Pinterest, Uber, Discord,... đây đều là những app rất lớn và phục vụ cả trăm triệu người dùng hàng ngày. Facebook cũng dùng RN trong những sản phẩm quan trọng của họ như chính trong app Facebook, Ad Manager hay Analytics.

Flutter ra đời sau nhưng nếu so về lượng tài nguyên đổ vào thì Google đầu tư hơn Facebook rất nhiều. Họ tự phát triển ra một ngôn ngữ mới, một bộ engine riêng và rất nhiều nhân sự để convert các view từ native sang framework của họ. Không chỉ vậy, họ còn đầu tư mạnh về mặt hình ảnh khi mà các tài liệu của Flutter cực kỳ chi tiết và trực quan (tôi đánh giá documentation của Flutter tốt hơn RN rất nhiều), họ tổ chức nhiều hội thảo công nghệ về Flutter, nhiều series giới thiệu và thảo luận trên Youtube. Một trong những series khá hay của Flutter là "Widget of the week", là những video ngắn giới thiệu về Widget nổi bật theo tuần, hay "The Boring Flutter Development Show", nơi bạn sẽ được ngồi pair-programming với các lập trình viên của Flutter team để implement những bài toán quen thuộc. Những điều này sẽ góp phần giúp các developer mới vượt qua những ái ngại ban đầu trong việc phải học một ngôn ngữ mới và có hứng thú hơn vì họ được tận mắt chứng kiến sự dễ dàng và tiện lợi đến thế nào để làm ra một app Flutter trên video hoặc hình ảnh thay vì những dòng chữ khô khan. Google cũng trực tiếp chứng minh họ nghiêm túc thế nào bằng việc phát triển Google Ads và Google Assistant bằng Flutter cũng như đem Dart vào nhiều project quan trọng khác. Nhờ sự hậu thuẫn đó, Flutter cũng được lựa chọn bởi nhiều công ty lớn như Grab, Baidu, Tencent hay eBay.

Nói đi cũng phải nói lại, Facebook và Google đều được biết đến như những công ty sẵn sàng khai tử sản phẩm của mình nếu không đạt được mục đích mà họ đặt ra. Đối với Facebook là trường hợp của Parse - một backend platform rất nổi cách đây khoảng gần chục năm - đã bị shutdown ngay khi Facebook thấy nó không mang lại value cho họ, mặc dù có một cộng đồng rất lớn. Google còn tệ hơn vậy, khi họ có tiền lệ trong việc phát triển một lúc nhiều dự án tương tự nhau để chọn ra những sản phẩm tốt nhất, mặc cho việc các sản phẩm bị hủy bỏ khác đôi lúc được cho là còn tốt hơn sản phẩm gốc (như trường hợp Inbox bị khai tử để nhường lại chỗ cho Gmail). Tuy vậy, đối với 2 framework RN và Flutter thì cả 2 ông lớn này đều đã đầu tư quá nhiều để có thể dễ dàng trở mặt rồi, nên chắc chắn trong tương lai gần bạn sẽ không phải lo việc họ "đem con bỏ chợ" đâu.


## Kết luận

Nếu bạn là 1 developer đang tìm kiếm thêm cơ hội việc làm thì React Native có vẻ là lựa chọn phổ biến hơn ở thời điểm hiện tại, khi nhu cầu về dev Flutter chưa thực sự cao tại Việt Nam. Ngoài ra, những kiến thức về RN của bạn có thể được chuyển qua để làm web frontend như Reactjs vì chúng khá tương đồng nhau. Tuy vậy, Flutter cũng chứng minh mình là một đối thủ đáng gờm khi Dart đứng top #1 ngôn ngữ phát triển nhanh nhất và Flutter cũng đứng thứ #2 trong số những open source repo được đóng góp nhiều nhất bởi các contributor trong năm 2019 theo report của [Github](https://octoverse.github.com/). Không chỉ vậy, Flutter còn được Linkedin mô tả là [kỹ thuật trending nhất](https://learning.linkedin.com/blog/tech-tips/the-fastest-growing-skills-among-software-engineers--and-how-to-) trong giới lập trình viên và đang được săn đón bởi nhiều nhà tuyển dụng lớn trên thế giới.

Nếu bạn là một chủ sản phẩm thì việc lựa chọn framework nào sẽ tùy thuộc vào nội dung và mục đích mà app của bạn hướng đến. Nếu app của bạn đặt nặng vấn đề design/animation/theming thì Flutter chắc chắn là lựa chọn tốt hơn. Nếu design không phải là vấn đề quá lớn mà bạn cần chú trọng hơn business logic/tích hợp với system cũ hoặc thư viện tự phát triển/cần những chức năng đặc biệt như OTA update/cần có cộng đồng lớn hỗ trợ thì bạn có thể chọn React Native.


|  | React Native | Flutter |
| -------- | -------- | -------- |
| App của bạn cần có design khác nhau phụ thuộc vào platform     | ✅     |      |
| App của bạn cần có design được tự update theo OS mới nhất của hệ thống     | ✅     |      |
| App của bạn cần có một design thống nhất trên tất cả các platform |  | ✅ |
| Sử dụng nhiều Material design |  | ✅ |
| Sử dụng nhiều animation |  | ✅ |
| Có hệ thống theme |  | ✅ |
| Cần OTA update |  ✅|  |
| Cần sử dụng kết hợp với thư viện tự phát triển/ít phổ biến |  ✅|  |
| Cần có nhiều option trong việc lựa chọn package hỗ trợ |  ✅|  |
| Hạn chế sử dụng package của bên thứ 3 |  | ✅ |