Tính tới ngay tại thời điểm tôi viết bài viết này thì việc để phát triển game đã thực sự dễ dàng hơn rất nhiều so với khoảng thời gian rất lâu trước kia . Với sự bá đạo của các công cụ và frameworks khác nhau, chắc giờ gần như chẳng có ngôn ngữ lập trình phổ biến nào mà không làm được game cả. Tôi sẽ kể tên 1 số cái tên như Unreal Engine hỗ trợ C ++, Godot có nguồn mở sử dụng Python, với libGDX bạn có thể viết mã bằng Java và thực hiện Unity C# ; sự lựa chọn của bạn chưa bao giờ dễ dàng đến thế. Thế nhưng, cũng chính bởi có quá nhiều lựa chọn mà với 1 người mới chân ướt chân ráo tìm hiểu, chắc chắn sẽ gặp không ít khó khăn và hiểu lầm. Vậy nên trong bài viết này, tôi sẽ chọn ra 2 ứng viên sáng giá là libGDX và Unity để so sánh chúng ở nhiều khía cạnh bắt đầu từ cài đặt ban đầu và tất cả các bước đi trong suốt quá trình phát triển sản phẩm game.

Trước khi bắt đầu so sánh, hẳn tôi nên giới thiệu qua về mình để các bạn nghĩ xem có nên tin tôi hay không nhé. Tôi đã bắt đầu sự nghiệp phát triển phần mềm chuyên nghiệp vào năm 2014, chủ yếu (nhưng không giới hạn) chuyên về Java. Phát triển game luôn là niềm đam mê của tôi và cho đến nay tôi đã phát hành 3 trò chơi 2D cho Android. Cái đầu tiên đưa tôi khoảng 2 năm và được phát triển trong libGDX. Trong hai lần tiếp theo, tôi đã quyết định chuyển sang Unity và từ giữa năm 2017 đến nay, đây là tool duy nhất mà tôi đã và đang sử dụng. Đáng nói là bài viết này tập trung chủ yếu vào các developers vì sử dụng libGDX đòi hỏi các kỹ năng lập trình cụ thể. Nếu bạn là game designner hoặc artist, tôi sẽ tiết kiệm thời gian đọc của bạn bằng 1 câu rất rõ ràng: **Hãy sử dụng Unity!**

## **Cài đặt**

### 1. LibGDX

![](https://images.viblo.asia/509e40f1-fcd1-403b-a67a-db7e168709f5.png)

Giả sử bạn đã là developer, libGDX rất dễ bắt đầu và bạn không cần phải cài đặt bất kỳ ứng dụng bổ sung nào. Chỉ cần tải xuống Project Setup App sẽ tạo dự án dựa trên lớp để được nhập vào IDE yêu thích của bạn. Frameworks này JDK 8+.

![](https://images.viblo.asia/1397959b-ba82-475a-9de1-ccd9adece65e.jpg)

### 2. Unity

![](https://images.viblo.asia/559d6dfe-0c06-4874-a668-aff31bfe3a99.png)

Khi tôi mới bắt đầu với Unity, chưa có Unity Hub nào và việc quản lý tất cả các phiên bản khác nhau biến việc phát triển game trở nên khá phức tạp vì bất kỳ phiên bản Unity mới nào cũng được cài đặt dưới dạng một ứng dụng riêng biệt. Hub giảm đáng kể quá trình cho phép bạn cài đặt và gỡ cài đặt các phiên bản hiện có. Giờ đây, để bắt đầu với Unity, bạn sẽ cần cài đặt Unity Hub, chính Unity và IDE để hoạt động với C#. Trước đây, Rider chỉ là một plugin cho Visual Studio, IDE phổ biến nhất. Rất may, những người từ JetBrains đã quyết định cải thiện cuộc sống của các nhà phát triển và phát hành một phiên bản độc lập vào năm 2017.

![](https://images.viblo.asia/004a14b9-75ef-406c-b0f0-2d27f76202a2.jpg)

### 3. Kết luận
Cả libGDX và Unity sẽ yêu cầu các phụ thuộc dành riêng cho nền tảng, ví dụ: đối với Android, bạn sẽ cần SDK Android hoặc thậm chí toàn bộ Android Studio.

...

**Rút cục thì**: libGDX dễ cài đặt hơn một chút vì ít phụ thuộc hơn, nhưng việc giới thiệu Unity Hub đã cải thiện đáng kể quá trình cài đặt Unity.

## **Quá trình làm quen**

### 1. LibGDX

![](https://images.viblo.asia/559d6dfe-0c06-4874-a668-aff31bfe3a99.png)

Nếu bạn đang cân nhắc sử dụng libGDX, bạn có lẽ là developer chuyên nghiệp có kinh nghiệm về Java hoặc các ngôn ngữ OOP khác. Điều đó có nghĩa là bạn biết cách viết code và học frameworks mới rất tốt. Ngoài ra, có rất nhiều hướng dẫn có sẵn trực tuyến. Cộng với một môi trường quen thuộc với IDE ưa thích nên bạn sẽ rất nhanh để bắt đầu.

### 2. Unity

![](https://images.viblo.asia/0e6da3ca-2801-4f5a-8185-f29d27ecf2c4.png)

Unity đòi hỏi thời gian và sự kiên nhẫn đặc biệt là nếu bạn, như hầu hết các developer, thích code thay vì nhấp vào các nút khác nhau và kéo các đối tượng. Màn hình làm việc là một phần mềm khổng lồ với nhiều cài đặt để định cấu hình và thành thật mà nói, sau khi làm việc với Unity trong một vài năm, tôi vẫn tìm kiếm Cách làm thế nào để mở Asset Store. Nó chỉ đơn giản là không thể nhớ tất cả mọi thứ. Mặt khác, C# tương đối dễ sử dụng để phát triển, đặc biệt đối với những người có kinh nghiệm OOP trước đó.

### 3. Kết luận
**Rút cục thì**: Phần ngôn ngữ lập trình có cùng độ khó nhưng sẽ mất thời gian để học và thành thạo màn hình làm việc của Unity.

## **Quá trình làm việc**

### 1. LibGDX

![](https://images.viblo.asia/0e6da3ca-2801-4f5a-8185-f29d27ecf2c4.png)

Không có giao diện người dùng để giúp bạn phát triển game trong libGDX. Bất cứ khi nào bạn muốn đặt một nút, một văn bản hoặc một đối tượng trò chơi bạn thực hiện thông qua code với hy vọng rằng chúng sẽ ít nhất được nhìn thấy trên một cảnh. Chắc chắn, theo thời gian, bạn sẽ xây dựng các lớp trợ giúp để đặt các phần tử vào đúng vị trí nhưng bất cứ khi nào có một phần mới, bạn sẽ cần mở rộng các tiện ích hiện có để bảo vệ nó. Một vấn đề lớn khác mà tôi gặp phải là xây dựng giao diện người dùng hoạt động chính xác với các tỷ lệ khung hình màn hình khác nhau. Tôi đã phải viết lại phần này nhiều lần cho đến khi đạt được kết quả mong muốn. Đáng ngạc nhiên là không có nhiều thông tin hữu ích về vấn đề này trước đó.

### 2. Unity

![](https://images.viblo.asia/559d6dfe-0c06-4874-a668-aff31bfe3a99.png)

Unity mặt khác là một công cụ hướng giao diện người dùng. Một khi bạn nhận đã quen và hiểu nó, sức mạnh phát triển trò chơi thực sự thức tỉnh. Bạn có thể kéo và thả, cuộn và nhấp, xoay và chia tỷ lệ. Thậm chí bạn chẳng cần code chút nào khi thử tạo ra một số trò chơi đơn giản. Tất cả các yếu tố giao diện người dùng trong trò chơi độc đáo, dính vào nhau hoặc các mặt của cảnh và xử lý tỷ lệ đa khía cạnh được hỗ trợ ngoài luồng. Với một vài lần nhấp chuột, bạn có thể sắp xếp một nguyên mẫu với các đối tượng trò chơi khác nhau trên một cảnh. Mặt khác, Unity là một chương trình được tạo bởi các nhà phát triển khác và nó chắc chắn có các lỗi khá đáng lo ngại. Bất cứ khi nào có một bản Unity mới phát hành, phần đầu tiên bạn sẽ thấy sẽ là các gợi ý về những vấn đề đã bị lỗi khi cập nhật bản mới. Đó quả thực là 1 nỗi đau mà nhiều người gặp phải, thậm chí một số người còn không hiểu tại sao lỗi lại phát sinh khi mà mọi thứ vốn đang hoạt động tốt.

### 3. Kết luận
**Rút cục thì**: Giao diện mẫu chắc chắn là nhanh hơn nhiều trong Unity và bản thân màn hình làm việc đã giúp ích rất nhiều trong quá trình làm việc.

## **Quản lý code và dependencies**

### 1. LibGDX

![](https://images.viblo.asia/559d6dfe-0c06-4874-a668-aff31bfe3a99.png)

libGDX được viết bằng Java do đó bạn tạo ra trò chơi của mình hoàn toàn bằng Java. Bản thân frameworks cũng có những tài liệu tuyệt vời, gỡ lỗi rất dễ dàng và tất cả các tính năng Java 8 được Android hỗ trợ có thể được sử dụng. Quản lý dependencies được xử lý bởi Gradle rất thuận tiện để sử dụng. Có rất nhiều thành phần có sẵn trong framworks nhưng vẫn không được nhiều như trong Unity. Như một ví dụ nhìn vào khía cạnh lập trình của xử lý hoạt hình 2D. Trong trò chơi đầu tiên của tôi, tôi đã kết thúc với một lớp người trợ giúp khá phức tạp để tạo ra một hình ảnh động phù hợp. Trong Unity, đây chỉ là vấn đề kéo và thả mà không tốn 1 dòng code nào.

### 2. Unity

![](https://images.viblo.asia/509e40f1-fcd1-403b-a67a-db7e168709f5.png)

Trong Unity, bạn sẽ sử dụng C# vì vào tháng 8 năm 2017 UnityScript và Boo đã chính thức bị ngừng sử dụng. Có nhiều năm kinh nghiệm về Java, tôi không gặp vấn đề gì khi sử dụng C# với kĩ năng OOP thành thạo của mình. Các dependencies được quản lý thông qua Package Manager hoặc plugins của bên thứ 3 được lưu trữ cùng với các tệp dự án của riêng bạn. Phần tốt nhất của coding trong Unity là một tập hợp lớn các thành phần được xây dựng với tất cả các phương thức hữu ích được đưa ra. Như các đối tượng hoạt hình, âm nhạc hoặc hình ảnh - ta không cần thêm mã để làm cho chúng hoạt động. Kết quả là bạn có thể dành nhiều thời gian hơn cho các cơ chế trò chơi thiết yếu thay thế. Nhưng hãy lưu ý sử dụng IDE nào! Lựa chọn duy nhất của tôi là JetBrains Rider, cung cấp cho các nhà phát triển hoàn thành mã thông minh, làm nổi bật hiệu suất, tài liệu và nhiều thứ khác, tuy là nó mất phí nhưng lại rất đáng đồng tiền bát gạo nhé!

### 3. Kết luận
**Rút cục thì**: Coding tốt hơn một chút trong Unity vì có nhiều thành phần được xây dựng.

## **Cộng đồng**

### 1. LibGDX

![](https://images.viblo.asia/509e40f1-fcd1-403b-a67a-db7e168709f5.png)

libGDX phiên bản 1.0 đã được phát hành vào năm 2014 nhưng các developers đã sử dụng frameworksngay cả trước đó. Trong những năm đó, có rất nhiều câu hỏi được hỏi và trả lời trên StackOverflow và hàng trăm video hướng dẫn bằng văn bản và video được tạo ra. Ngoài ra còn có một diễn đàn libGDX chính thức khá tích cực, nơi người ta có thể tìm kiếm sự giúp đỡ của các maintainers. Điều tuyệt vời hơn nữa, libGDX là một dự án nguồn mở được lưu trữ trên Github có nghĩa là bất kỳ ai cũng có thể đóng góp. Cá nhân tôi đã có một PR được sáp nhập ở đó, thế nên những gì tôi nói hoàn toàn có thật!
![](https://images.viblo.asia/bc00e99b-4043-4129-9067-320f5a546e25.jpg)

### 2. Unity

![](https://images.viblo.asia/559d6dfe-0c06-4874-a668-aff31bfe3a99.png)

Cộng đồng đoàn kết là rất lớn, lớn hơn nhiều so với libGDX. Nhưng có một nhược điểm - bạn có thể tìm thấy rất nhiều câu hỏi và câu trả lời nhưng nhiều câu hỏi trong số đó đã lỗi thời hoặc đơn giản là sai. Bạn phải luôn thực dụng và kiểm tra lại giải pháp đã cho trên các tài nguyên và tài liệu chính thức khác. Mặt khác, các nhà phát triển Unity xuất bản nhiều bài đăng và hướng dẫn chất lượng cao trên blog có thể được coi là nguồn đáng tin cậy nhất cùng với codes kèm theo phía sau.

### 3. Kết luận
**Rút cục thì**: Tìm một giải pháp làm việc phù hợp cho libGDX dễ dàng và nhanh hơn.

## **Quá trình release game**

### 1. LibGDX

![](https://images.viblo.asia/559d6dfe-0c06-4874-a668-aff31bfe3a99.png)

Vì tôi chỉ phát triển các trò chơi Android cho đến nay, phần này sẽ mô tả quy trình cho nền tảng đó. Việc phát triển iOS nói chung không đặc biệt dễ dàng vì nó yêu cầu Mac cài đặt Xcode.
Trong các sản phẩm JetBrains - có thể là IDEA hoặc Android Studio - việc phát hành được thực hiện thông qua một cú nhấp chuột duy nhất thực hiện một vài Gradle tasks.

![](https://images.viblo.asia/bc00e99b-4043-4129-9067-320f5a546e25.jpg)

Trong phiên bản IDE mới nhất, có một tùy chọn để xây dựng App Bundle hoặc APK cũ đơn giản.
Về phía bên dưới, bạn vẫn phải biết cách xử lý gradle wrapper, AndroidManifest và các biểu tượng ứng dụng vì tất cả các thành phần bắt buộc phải ở đúng vị trí.

### 2. Unity

![](https://images.viblo.asia/509e40f1-fcd1-403b-a67a-db7e168709f5.png)

Quá trình release của Unity được thực hiện theo cách khá giống nhau, nhưng tất cả các xử lý cơ bản đều bị ẩn khỏi mắt chúng ta.

![](https://images.viblo.asia/bceaa5f8-a919-4516-a1de-6dadfd0ae780.jpg)

Gradle vẫn được thực hiện ngầm, nhưng bạn không cần phải biết về nó.
Điều tôi đặc biệt thích về Unity là một loạt các cài đặt mà người ta có thể định cấu hình cho dự án thông qua cửa sổ Player Settings.

![](https://images.viblo.asia/e3474cdc-3e91-498e-a36a-a06401aa705f.jpg)

Trên một màn hình duy nhất, bạn có thể chọn mức Target Architecture và mức Android min\max API để sử dụng, đặt biểu tượng của mình, thiết lập hướng màn hình được hỗ trợ và nhiều hơn nữa. Sự lựa chọn phong phú như vậy có thể là quá sức nhưng một khi bạn nắm được nó, tất cả các cài đặt được tập hợp ở một nơi sẽ không có gì ngoài sự tiện lợi. Cả App Bundle và APK cũng được hỗ trợ.

### 3. Kết luận
**Rút cục thì**: Quá trình phát hành trong Unity tốt hơn do cấu hình dự án linh hoạt và ít kiến thức về nền tảng nhất định cần biết.

## **Tổng kết lại**
Bây giờ bạn đã biết thêm về chủ đề và có thể đưa ra quyết định của riêng bạn nên sử dụng cái gì. Làm việc với libGDX có thể sẽ cải thiện các kỹ năng code Java của bạn trong khi làm chủ Unity có thể có khả năng mở rộng cơ hội nghề nghiệp tiếp theo.

Làm phát triển game là niềm vui nhưng cũng đầy thách thức, vì vậy hãy để công nghệ được lựa chọn đúng cách mọi thứ trở nên dễ dàng hơn nhé!

*Bài viết được dịch và sửa đổi từ: [**Unity vs libGDX — what to choose in 2020?**](https://medium.com/@pudding_entertainment/unity-vs-libgdx-what-to-choose-in-2020-60254609fef5)*