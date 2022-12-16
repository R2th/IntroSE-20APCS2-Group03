## Giới thiệu về Fuchsia
Như các bạn cũng đã biết, Google đang phát triển 1 hệ điều hành mới mang têm **Fuchsia OS**
Để biết thông tin kỹ hơn về hệ điều hành này, các bạn có thể tham khảo bài viết này: https://viblo.asia/p/google-fuchsia-co-thay-the-duoc-android-L4x5xpLO5BM. Hôm nay mình sẽ không giới thiệu về fuchsia nữa, mình có tin quan trọng hơn đó là Google đã phát hành Fuchsia SDK và một "thiết bị" Fuchsia  đã được thêm vào Android Open Source Project. Hôm nay Hôm nay chúng ta sẽ đi sâu vào SDK Fuchsia và xem những gì nó cung cấp cho chúng ta - những developer hoặc những người có thể muốn bắt đầu với Fuchsia.
## Giới thiệu về Fuchsia SDK
Nói chung, một bộ công cụ phát triển phần mềm (hoặc SDK) được sử dụng để hỗ trợ các nhà phát triển tạo ứng dụng. Ví dụ như Android SDK, được thiết kế đặc biệt cho một platform và những platform khác, như Google Flutter SDK, có thể tạo ứng dụng cho nhiều platform. Và Fuchsia SDK cũng như thế, nó được sinh ra để hỗ trợ phát triển các ứng dụng cho Fuchsia OS.

Hiện tại, chúng ta không thể đơn giản là tải xuống SDK Fuchsia và bắt đầu sử dụng được ngay, bởi vì Google chưa công khai nó. Tuy nhiên, vì phần lớn của Fuchsia đều là mã nguồn mở, cũng giống như Android vậy, SDK có thể được xây dựng và sử dụng tương ứng.

Nếu bạn là một người tò mò thì tôi sẽ để link tải xuống ở cuối bài viết này, nhưng rõ ràng tôi không khuyến khích sử dụng nó cho bất kỳ dự án lớn nào vì nó sẽ nhanh chóng trở nên lỗi thời hoặc có thể nó hoàn toàn sai. Các công cụ trong phiên bản đi kèm được thiết kế để sử dụng với Linux 64 bit, do đó, nếu bạn đang đọc bài viết này trên OS X, bạn có thể sử dụng được nó.

Những điều này đang được cộng đồng bàn tán, nhóm Chromium hiện đang sử dụng SDK Fuchsia để xây dựng ứng dụng Web Runner cho Fuchsia, bạn có thể tham khảo chúng tại đây:
![](https://images.viblo.asia/2ceb29be-508e-41ab-8f41-fad236539ae3.png)
Lưu ý về Fuchsia SDK và Flutter SDK:
Flutter SDK, chúng ta biết về mối quan hệ của Fuchsia với Flutter. Flutter sử dụng SDK Android để tạo các ứng dụng Android ngày nay, thì có lẽ một ngày nào đó bạn có thể sử dụng SDK Fuchsia thông qua Flutter .

Hiện tại, chúng ta cần sử dụng trực tiếp SDK Fuchsia để tạo các ứng dụng Fuchsia. Nó thực sự có thể xây dựng các ứng dụng Flutter trực tiếp bằng SDK Fuchsia, bởi vì Flutter được Fuchsia hỗ trợ sâu sắc.
## Bazel
Hiện tại Fuchsia SDK có khả năng tạo ra các ứng dụng được viết bằng C ++, Dart và Flutter (về cơ bản cũng là Dart). Bất kể bạn chọn ngôn ngữ hoặc framwork nào để phát triển dự án của mình, bạn sẽ cần sử dụng Bazel để quản lý các dependencies của mình và xử lý bản build cuối cùng.

Bazel là một khung công tác do Google xây dựng để xây dựng và kiểm tra phần mềm nhằm mục đích chỉ xây dựng lại các khía cạnh của chương trình mà bạn thay đổi. Có rất nhiều điều có thể tìm hiểu về sự phức tạp của Bazel, nhưng với mục đích của bài viết này, bạn chỉ cần biết rằng Bazel kết nối ứng dụng của bạn với các thư viện trong SDK Fuchsia và sử dụng các công cụ SDK để tải và cài đặt các gói Fuchsia .
## Có những gì trong Fuchsia SDK?
Các nhà developer tò mò với Fuchsia SDK sẽ tìm thấy quyền truy cập vào nhiều phần của nền tảng này. Ví dụ, bên trong gói Fuchsia_modular của gói Dart , bạn sẽ tìm thấy các khả năng làm việc với [agents](https://github.com/Skylled/fuchsia-sdk/blob/master/dart/fuchsia_modular/lib/src/agent/agent.dart), do [Maxwell](https://9to5google.com/2018/03/23/fuchsia-friday-maxwell/) quản lý, khả năng tạo đề xuất và làm việc với các entities . (Entities  là một thuật ngữ khá chung chung trong Fuchsia, bạn có thể tham khảo thêm [tại đây](https://9to5google.com/2018/02/09/fuchsia-friday-entities/).)

![](https://images.viblo.asia/fc4e7d43-ed9c-41a3-ab4c-0bf7f7c279d9.png)

Nó còn có thể làm việc với [Zircon kernel](https://9to5google.com/2018/03/16/fuchsia-friday-the-four-layers-of-fuchsia/)  từ SDK bằng cách sử dụng Dart. Ngoài ra, còn có gói Fidl liền, cung cấp cho bạn quyền truy cập vào khả năng của Fuchsia, để kết nối các chương trình và chức năng được viết bằng các ngôn ngữ khác nhau.
Đối với các anh/chị developer C ++, có một loạt các  lower-level packages có sẵn để sử dụng, bao gồm[ truy cập trực tiếp vào Vulkan](https://9to5google.com/2018/04/06/fuchsia-friday-graphics-gaming-and-vr-oh-my/) (được sử dụng cho Fuchsia graphics) và các [tài nguyên ](https://github.com/Skylled/fuchsia-sdk/tree/master/pkg/zx)được cung cấp bởi Zircon kernel. FIDL cũng cung cấp cho cả nhà phát triển Dart và C ++ quyền truy cập vào nhiều dịch vụ và tiện ích khác có sẵn trong Fuchsia như mã UI, Bluetooth, WiFi và thậm chí cả khả năng chuyển lời nói thành văn bản.

![](https://images.viblo.asia/94e3041d-d875-486b-bbeb-75d911872973.png)

## Getting the Fuchsia SDK
Đối với các developer, những người chỉ muốn xem kỹ hơn về cách một ngày nào đó họ có thể mang các ứng dụng của họ đến Fuchsia, bạn có thể xem nó trong repo này: https://github.com/Skylled/fuchsia-sdk. Để đảm bảo của kích thước và để chắc chắn rằng chúng tôi tuân thủ các giấy phép, repo này chỉ bao gồm mã và thư viện, không phải bản sao nào của  Fuchsia OS.

Tôi có thể làm gì với nó bây giờ?
Giả sử bạn xây dựng Fuchsia SDK ngày hôm nay, bạn nên mong đợi điều gì hợp lý để có thể làm với nó? Vì chúng ta không có nổi một thiết bị  đang chạy Fuchsia. Tuy nhiên, như chúng ta đã thấy tuần trước, Google đang làm việc với nó, bằng cách [từ từ làm cho Trình giả lập Android chính thức tương thích với Fuchsia](https://9to5google.com/2018/12/05/android-emulator-fuchsia-zircon/).

Nếu bạn tình cờ có một thiết bị Fuchsia trong túi của mình, bạn sẽ có thể sử dụng Bazel và SDK để tạo ứng dụng Fuchsia. Sau một vài cuộc cố gắng ban đầu, tác giả thực sự đã có thể xây dựng một ứng dụng Flutter đơn giản cho Fuchsia.

Tất cả thông tin trong bài viết này là suy đoán dựa trên thông tin có sẵn và có thể thay đổi.|

**Nguồn bài viết:** https://9to5google.com/2018/12/14/fuchsia-friday-sdk-download/

**Người dịch :** Nguyễn Khuyến