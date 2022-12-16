Google đã rebranded các thư viện hỗ trợ của họ với tên mới là Jetpack (hay còn gọi là AndroidX). Và các Deveploer cần phải thay đổi để phù hợp với việc này.

Bài này sẽ nói rõ hơn để trả lời cho câu hỏi, nó là cái gì? Làm thế nào để có thể bắt đầu chuyển đổi ứng dụng của bạn để sử dụng thành phần mới này?

![]([https://miro.medium.com/max/600/1*OFJKA8dRYZSb-Kprx-VReg.png)

## Jetpack là gì

[Android Jetpack](https://developer.android.com/jetpack/) là một tập hợp các thư viện, công cụ (tools) và hướng dẫn về kiến trúc, nó được thiết kế để xây dựng một ứng dụng Android một cách dễ dàng. Nó cung cấp code nền tảng chung để nhà phát triển có thể tập trung vào việc viết những thứ làm cho ứng dụng trở nên độc đáo.

Đó là một nỗ lực với phạm vi lớn để cải thiện trải nghiệm của nhà phát triển và tập các các công cụ và nền tảng hữu dụng tạo thành một đơn vị gắn kết chặt chẽ.

Dưới đây là trích dẫn từ [Alan Viverette](https://twitter.com/alanviverette) (Android Framework team) là một tóm tắt hay:

> “Jetpack is a larger-scoped effort to improve developer experience, but AndroidX forms the technical foundation. From a technical perspective, it’s still the same libraries you’d have seen under Support Library and Architecture Components.”

## Tại sao?

Tại sao Google đang trải qua tất cả những rắc rối này (và tạo ra những rắc rối này cho các nhà phát triển)?

- Tạo một namespace nhất quán (androidx.* ) Cho các thư viện hỗ trợ
- Hỗ trợ phân chia các phiên bản một cách tốt hơn (bắt đầu với 1.0.0). Điều này khiến chúng có thể được cập nhật một cách độc lập.
- Phát triển một core chung để hỗ trợ tất cả các thành phần đi theo

Điều rất quan trọng được nhắc tới ở đây là. Version hiện tại của AppCompat (v28.x) là version được release cuối cùng. Trong các version tiếp theo sẽ sử dụng duy nhất Jetpack. Điều này bắt buộc các lập trình viên phải có được nhận thức và chuyển đổi sớm sang sử dụng Jetpack.

Đây là trích dẫn của Alan Viverette

> “There won’t be a 29.0.0, so Android Q APIs will only be in AndroidX” 

## Có những gì trong Jetpack?

Câu trả lời ở đây là: mọi thứ

Jetpack là một tập hợp rất nhiều các thư viện đã có mà chúng ta đa phần phải sử dụng (giống như AppCompat, Permission, Notification and Transitions) và mới hơn là các Architecture Components được giới thiệu trong những năm gần đây (giống như LiveData, Room, WorkManager and ViewModel)

Những nhà phát triển có thể kỳ vọng nhận được cùng một lợi ích tương tự như khi họ sử dụng AppCompat, bao gồm khả năng tương thích ngược và vòng release không bị ảnh hưởng với việc cập nhật các OS.

![Jetpack_components](https://miro.medium.com/max/1400/1*jqDYNqVXgbn8zfC1v6qunQ.png)

## Bạn sẽ nâng cấp ngay bây giờ chứ? Bạn có thể chỉ cập nhật một phần trong code của bạn?

Bạn không cập nhật ngày hôm nay, nhưng bạn sẽ phải cập nhật một vài thứ trong một tương lai gần.

Phiên bản hiện tại của AppCompat (v28.x) hoàn toàn giống với AndroidX (v1.x). Trong thực tế, các thư viện AppCompat là được tạo bằng cách thay đổi địa chỉ maven và package name của AndroidX codebase.

Ví dụ, vị trí và package cũ là
```
implementation “com.android.support:appcompat-v7:28.0.0"
import android.support.v4.widget.DrawerLayout
```

thì bây giờ sẽ là

```
implementation 'androidx.appcompat:appcompat:1.0.2'
import androidx.drawerlayout.widget.DrawerLayout
```

Điều này rất quan trọng để chú ý, bạn không thể mix AppCompat và Jetpack trong cùng một project. **Bạn cần phải chuyển đổi mọi thứ để sử dụng Jetpack nếu như bạn muốn nâng cấp**

## Bước đầu tiên - Nâng cập ứng dụng của bạn tới thư viện Support phiên bản mới nhất

Khi bạn đã sẵn sàng cập nhật lên Jetpack, hãy đảm bảo ứng dụng của bạn được nâng cấp lên phiên bản mới nhất của Gradle và AppCompat. Điều này sẽ đảm bảo bộ tái cấu trúc chỉ thay đổi package name và không phải là vấn đề lớn hơn liên quan đến cập nhật thư viện.

Cập nhật dự án của bạn là vô cùng quan trọng và sẽ cho bạn thấy mọi vấn đề bạn sẽ gặp phải khi tiếp tục phát triển, chẳng hạn như sự phụ thuộc kéo dài vào phiên bản cũ hơn của thư viện. Nếu bạn không thể cập nhật lên các phiên bản mới nhất, bạn sẽ cần khắc phục các sự cố đó trước khi tiếp tục.

Đừng quên kiểm tra [https://maven.google.com/](https://maven.google.com/) để lấy thông tin mới nhất về Gradle dependency.

## Sử dụng Refactor tool để cập nhật project của bạn

Khi bạn đã nâng cấp dự án của mình, bạn sẽ sử dụng tiện ích Android Studio (AS) để thực hiện tái cấu trúc.

Chạy nó từ menu của Android Studio: *Refactor\Refactor to AndroidX*

![AS_AndroidX_refactor_tool](https://miro.medium.com/max/962/1*geyQI-VjQ8KCOk9uFw74iA.png)

Công cụ này sẽ quét ứng dụng của bạn và hiển thị cho bạn bản xem trước các thay đổi cần thiết:

![](https://miro.medium.com/max/1400/1*3W7e5p9xQTnACbN8qw_R3w.png)

Nếu bạn ok với những thay đổi đó thì chọn button **Do Refactor**, và tool sẽ thực hiện theo ba điều sau:

- Cập nhật các imports có liên quan tới package name mới:

![](https://miro.medium.com/max/1400/1*B1-nWakyH4JtiUYZzQsCLg.png)

- Cập nhật các Gradle trong dependencies của bạn:

![](https://miro.medium.com/max/1400/1*O-bGy-pnnowcGUYT21EEPQ.png)

- Thêm 2 flags vào file `gradle.properties`. Flag đầu tiên sẽ nói với Android Plugin để sử dụng AndroidX package thay thế cho AppCompat, và flag thứ hai sẽ bật *Jetifier*, Đây là một tool để hỗ trợ với việc sử dụng các thư viện mở rộng (sẽ được mô tả chi tiết trong phần sau)

```
android.useAndroidX=true
android.enableJetifier=true
```

Nói chung, các thay đổi nên được tách biệt chỉ với 3 lĩnh vực này, nhưng theo kinh nghiệm của tôi, tôi đã thấy công cụ tái cấu trúc cũng thực hiện các thay đổi khác. Trong trường hợp của tôi, công cụ đã thêm code cho Nullability của Kotlin (nó đã thêm một vài !! trong source code của tôi), nhưng có khả năng sẽ có những thay đổi khác. Đó là một ý tưởng thực sự tốt để theo dõi chặt chẽ tất cả các thay đổi mà công cụ thực hiện và đảm bảo bạn cảm thấy thoải mái với chúng.

## Jetifier

AS refactor tool chỉ thay đổi source code trong project của ạn. Nó không thay đổi bất kỳ thư viện và các dependencies ngoài nào cả.

**Để làm điều này, Google đã tạo ra một công cụ có tên Jetifier được thiết kế để tự động chuyển đổi các phụ thuộc bắc cầu để sử dụng các thư viện AndroidX trong thời gian xây dựng. Nếu chúng ta không có công cụ này, chúng ta sẽ phải đợi mọi lib của bên thứ 3 cập nhật, trước khi chúng ta có thể sử dụng nó (và trì hoãn cập nhật của chúng tôi cho đến khi điều này sẵn sàng).**


Khác với việc kích hoạt công cụ này bằng cách sử gradle flag, không có nhiều điều cần biết về việc sử dụng nó, vì đây là một quy trình tự động và không cần cấu hình.

Google gần đây đã công bố một tùy chọn độc lập để chạy Jetifier. Thậm chí, bạn còn có thể chạy một chế độ đảo ngược, một chế độ đảo ngược, mã này sẽ giúp loại bỏ mã lỗi (sẽ rất hữu ích cho việc gỡ lỗi).

## Một vài vấn đề mà bạn có thể gặp phải

Bạn có thể khám phá một thư viện bên thứ 3 cần được cập nhật. Ví dụ, một người nào đó đã phát hiện ra phiên bản hiện tại của SqlDelight yêu cầu một phiên bản cũ của thư viện Room. Họ được yêu cầu cập nhật và Square đã cung cấp phiên bản cập nhật của lib. Nếu bạn phát hiện ra một vấn đề, bạn càng sớm có thể yêu cầu cập nhật từ nhà phát triển càng tốt. Phiên bản mới nhất của Room (v2.1) đã yêu cầu AndroidX, điều này có thể sẽ khiến nhiều người nâng cấp. Khi viết bài này, SDK Facebook không được cập nhật và nhiều khả năng đây sẽ là một công cụ bị chặn đối với nhiều người.

Cập nhật dự án của bạn lên các phiên bản mới nhất của AppCompat có thể không đơn giản. Bạn có thể có cách giải quyết trong code của mình cho các lỗi trước đó hoặc gặp phải các bản nâng cấp yêu cầu sửa lại đáng kể. Cần lên kế hoạch trước để tính cho công việc này.

Source files không bị thay đổi bởi Jetifier, thế nên nó có thể mang lại một số e ngại khi sử dụng tài liệu

Một số tên thay thế không được ánh xạ chính xác (những cái này dường như chủ yếu từ lib design). Công cụ tái cấu trúc đã giành được công việc của Keith trong các trường hợp này và mã của bạn đã giành được phần mềm biên dịch. Để giải quyết những điều này, bạn sẽ cần giải quyết thủ công nhập khẩu. Hy vọng, những vấn đề này sẽ được giảm thiểu theo thời gian, vì các công cụ đã hoàn thiện và các lỗi trong công cụ tái cấu trúc đã được sửa.

### Vài gợi ý hữu ích:

Chuẩn convention đặt tên của Jetpack là trùng với package name trong Maven coordinates. Trong Jetpack, package sẽ luôn đồng nhất với groupid.

Ví dụ, nếu bạn biết package name là `androidx.webkit` thì dependency sẽ map với: `androidx.webkit:webkit:VERSION`

## Tóm lại

Lập kế hoạch trước cho những thay đổi được yêu cầu khi migration sang Jetpack, nó sẽ được yêu cầu thay đổi liên tục. Phần khó nhất của việc nâng cấp có thể sẽ là cập nhật dự án của bạn lên các dependencies mới nhất.

Có khả năng các thư viện của bên thứ 3 đã được cập nhật. Điều quan trọng là xác định sớm những điều này và yêu cầu nhà phát triển cập nhật chúng.

Nguồn: [Converting your Android App to Jetpack](https://medium.com/google-developer-experts/converting-your-android-app-to-jetpack-85aecfce34d3)