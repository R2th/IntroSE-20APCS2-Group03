![image.png](https://images.viblo.asia/200d37c6-2751-45c7-b05c-15953566484c.png)

Bài viết được dịch từ [nguồn này](https://medium.com/flutter-community/programming-on-your-phone-a2547f0e293)

> Cái gì? Họ không có máy tính ? Tôi làm cách nào để dạy phát triển ứng dụng dành cho thiết bị di động nếu học sinh không có máy tính?

Khi được hỏi liệu tôi có giảng dạy môn Phát triển ứng dụng dành cho thiết bị di động vào mùa xuân năm 2021 tại Đại học Quốc tế Mông Cổ hay không, tôi vui vẻ đồng ý. Đây sẽ là một cơ hội tuyệt vời để trình bày một cách có hệ thống về Flutter, một framework giao diện người dùng đa nền tảng hiện đại để tạo các ứng dụng native, một công cụ mà tôi rất thích so với việc phát triển Android và iOS đơn thuần.

Khi Covid-19 tiếp tục phát triển trong suốt năm 2020 và đến năm 2021, giống như nhiều trường học trên khắp thế giới, các lớp học tại MIU được dạy trực tuyến. Tuy nhiên, tôi không nghĩ nhiều về điều đó cho đến khi tôi nghe một giáo viên khác đề cập đến việc dạy lập trình khó khăn như thế nào khi học sinh không có máy tính. Tôi đã giả định rằng sinh viên chuyên ngành CS (Computer Science) phải có máy tính để bàn hoặc máy tính xách tay của riêng họ. Hóa ra điều đó không đúng với một số người. Do không thể truy cập được phòng máy tính của trường, các em đang tham dự các lớp học và chỉ làm bài tập trên điện thoại của mình.

Kế hoạch khóa học của tôi là yêu cầu sinh viên cho ra đời ứng dụng của riêng họ trên một trong các app store. Nhưng nếu không có máy tính, điều đó thực sự trở nên rất khó khăn. Hay là dùng cách khác? Tâm trí tôi đang suy nghĩ đến các khả năng có thể giải quyết vấn đề trên.

Liệu có cách nào khác để học sinh có máy tính không? Một số người có thể sẵn sàng tặng chúng. Ví dụ, lập trình viên Flutter nổi tiếng Thomas Burkhart gần đây đã truyền cảm hứng cho nhiều người bằng cách hào phóng gửi một số máy tính cũ của mình cho các lập trình viên ở Nigeria và Ghana.

![image.png](https://images.viblo.asia/902bdf38-b077-4154-99bc-add96175d66b.png)

Tôi biết khá nhiều người tốt bụng và hào phóng, những người có thể sẽ tặng máy tính cũ của họ nếu tôi yêu cầu. Tuy nhiên, giải pháp này có những mặt trái của nó. Bản thân Thomas đã gặp rất nhiều vấn đề vì số lượng người yêu cầu khổng lồ cũng như chi phí vận chuyển quốc tế. Để tìm hiểu thêm, hãy đọc về đề xuất [DevsHelpDevs](https://github.com/DevsHelpDevs/DevsHelpDevs) của anh ấy.

## 1. Một góc nhìn mới

Thay vì khuyến khích người ta quyên góp máy tính, trong bài này, tôi viết cho những người chỉ có điện thoại di động. Phần lớn trong số họ không thể đợi ai đó đưa cho họ một chiếc máy tính xách tay hoặc một máy tính mới.

Bất cứ khi nào có thể, tôi muốn trao quyền cho mọi người và đặt trách nhiệm vào tay họ. Loại giải pháp này có thể mở rộng vì nó ít phụ thuộc vào sự hỗ trợ từ bên ngoài. Điều đó dẫn tôi đến lựa chọn sau: Dạy học sinh lập trình trên điện thoại của họ.

Điều đó nghe có vẻ điên rồ, tôi biết vậy. Không ai làm điều đó cả, phải không? Có thể điện thoại thường được dùng để giải trí hoặc thực hành, nhưng không thực sự để xây dựng một ứng dụng di động.

## 2. Quay trở về những ngày trước

Hãy nhớ lại cách mọi người lập trình trong những ngày đầu. Lần đầu tiên tôi nghe về điều này từ Uncle Bob (Robert Martin), người nói về cách mọi người đã từng viết các chương trình bằng tay trên coding form như thế này. Bạn có thể xem video đó tại [đây](https://www.youtube.com/watch?v=ecIWPzGEbFc&t=1779s):

![image.png](https://images.viblo.asia/d649fe97-fc94-49cf-8369-2b458fc41ae1.png)

Các dòng code được viết tay trên biểu mẫu sau đó được chuyển sang các thẻ đục lỗ như sau:

![image.png](https://images.viblo.asia/09f6157f-0924-4986-acc3-bce62fd01fd4.png)

Bạn cần sử dụng một thẻ cho mỗi dòng code. Ví dụ, thẻ trên là `Z (1) = Y + W (1)`. Toàn bộ chương trình sẽ như thế này:

![image.png](https://images.viblo.asia/4444a4bf-1abe-4f96-896f-5ad553172666.png)

Cuối cùng, bạn sẽ nạp thẻ vào máy tính để bạn có thể chạy chương trình của mình. Và bạn có thể nhận lại kết quả với nhiều thẻ đục lỗ hơn.

Hãy suy nghĩ về nó. Nếu bạn không phải là người thực hiện và chạy chương trình của riêng mình, bạn có thể phải đợi đến ngày hôm sau để biết kết quả! Ngay cả khi chương trình của bạn không có bug, hy vọng rằng không có ai khác trộn lẫn giữa 0 và O hoặc có một thẻ không đúng thứ tự, bởi vì việc sửa lỗi đó sẽ mất một ngày khác.

Bạn có thể tin rằng hàng nghìn hàng nghìn người đã học lập trình bằng cách sử dụng các biểu mẫu mã hóa (coding form) và thẻ đục lỗ?

Với quan điểm đó, nghe có vẻ điên rồ đến mức có thể có một cách để dạy phát triển ứng dụng dành cho thiết bị di động bằng điện thoại di động?

## 3. Yêu cầu

Có hai yêu cầu chính để mọi người có thể phát triển app trên điện thoại của mình. Đầu tiên là toàn bộ quy trình cần có thể thực hiện hoàn toàn trên thiết bị của mình. Thứ hai, dịch vụ trực tuyến (internet) phải có giá cả phải chăng. Những người chưa có khả năng mua máy tính thì khó mua nổi những dịch vụ trực tuyến đắt đỏ.

### 3.1 Những lựa chọn khác

Khi khám phá cách viết code trên điện thoại của một người, tôi đã xem xét một số tùy chọn khác nhau. Đầu tiên bạn nghĩ đến là DartPad, cho phép bạn viết và chạy các chương trình Dart và thậm chí cả các ứng dụng Flutter đơn giản trực tuyến. Điều này làm cho nó trở thành một công cụ tốt để học và kiểm tra mọi thứ một cách riêng biệt. Tuy nhiên, DartPad không hỗ trợ nhiều tệp hoặc nhập thư viện của bên thứ ba, vì vậy, đây không thực sự là giải pháp để tạo một ứng dụng thực mà bạn sẽ xuất bản lên cửa hàng ứng dụng (app store).

Một tùy chọn khác mà tôi đã nghe nói đến là GitHub Codespaces, là một môi trường phát triển dựa trên đám mây và bao gồm một IDE mà bạn có thể sử dụng trong trình duyệt của mình. Về cơ bản, nó trông giống như một phiên bản ứng dụng web của Visual Studio Code. Điều đó rất tuyệt! Thật không may, nó vẫn đang trong giai đoạn thử nghiệm riêng và tôi đã nằm trong danh sách chờ nhiều tháng. Ngay cả khi thời gian lớp học bắt đầu, học sinh của tôi sẽ không thể dùng nó. Một câu hỏi khác là về chi phí. Nó miễn phí trong giai đoạn thử nghiệm, nhưng sẽ rất tốn kém khi sử dụng sau đó phải không?

Tôi cũng đã cân nhắc việc cài đặt một IDE như VS Code hoặc Android Studio (với trình giả lập Android của nó) trên một máy Linux từ xa. Tuy nhiên, vấn đề chính ở đây là chi phí. Chi phí thuê một VPS có đủ RAM để chạy hệ điều hành dựa trên GUI cộng với IDE và trình giả lập sẽ quá cao. Hầu hết mọi người đều khuyên dùng tối thiểu 8GB RAM để phát triển ứng dụng dành cho thiết bị di động. Tôi đã từng sử dụng 4GB trên Mac Mini để tạo ứng dụng iOS và nó rất chậm. Bạn đang xem xét việc trả khoảng $ 40 USD mỗi tháng cho một server có RAM 8GB.

Tuy nhiên, có một con đường dễ dàng hơn những lựa chọn trên đây.

## 4. Triển khai kế hoạch

Đây là một số bước có thể thực hiện được sẽ cho phép bạn xuất bản ứng dụng di động từ điện thoại của mình:

* Cài đặt terminal app trên điện thoại của bạn.
* Thiết lập server Linux từ xa.
* Cài đặt command-line cho Flutter and Dart trên server.
* Phát triển một dự án Flutter.
* Đồng bộ code giữa điện thoại và server bằng GitHub.
* Chạy thử unit test và widget test trên server.
* Xây dựng thử ứng dụng web Flutter để thử nghiệm UI / UX.
* Sử dụng dịch vụ trực tuyến để tạo các phiên bản phát hành cho Android hoặc iOS.
* Submit ứng dụng lên app store.

Làm tất cả những điều này trên điện thoại chắc chắn sẽ không dễ dàng, nhưng đối với một người có đủ động lực và quyết tâm, điều đó sẽ hoàn toàn khả thi.
Các phần sau đây sẽ hướng dẫn chi tiết từng bước này. Tôi thực sự sẽ xuất bản một ứng dụng lên Google Play từ chính điện thoại của mình để chứng tỏ điều đó khả thi.

### 4.1 Cài đặt một terminal app

Bạn sẽ thực hiện hầu hết các testing trên server Linux, vì vậy bạn cần cách để truy cập server từ dòng lệnh.

Lưu ý: Tôi đang viết và thử nghiệm bài viết này dưới góc độ sử dụng điện thoại Android. Tôi sẽ cung cấp một số liên kết cho người dùng iPhone, nhưng bạn sẽ phải thực hiện thử nghiệm của riêng mình.

Trên Android, bạn có thể cài đặt [Termux](https://play.google.com/store/apps/details?id=com.termux). Người dùng iPhone có thể tìm kiếm “ssh client” hoặc xem bài viết này [tại đây](https://techwiser.com/best-ssh-client-ios/) để biết các gợi ý. Đây là một ví dụ về ứng dụng Termux trông như thế nào:

![image.png](https://images.viblo.asia/6b13328c-0329-46da-8aae-89f5fea4a2f2.png)

Mở ứng dụng và thử viết lệnh Linux. Ví dụ, in thư mục làm việc như sau:

```
pwd
```

Nó sẽ hiện ra:

```
/data/data/com.termux/files/home
```

Nếu bạn muốn tìm hiểu thêm về các lệnh Linux, bạn có thể xem [video này](https://www.youtube.com/watch?v=oxuRxtrO2Ag) hoặc đọc [hướng dẫn này](https://ryanstutorials.net/linuxtutorial/).

Lệnh command chính bạn sẽ cần ở điện thoại là `ssh`, lệnh này bạn sẽ sử dụng để đăng nhập vào server Linux từ xa mà bạn sẽ thiết lập trong phần tiếp theo. Lệnh `ssh` không được cài đặt theo mặc định, nhưng bạn có thể cài đặt nó từ bên trong Termux như sau:

```
pkg install openssh
```

`ssh` đã được thiết lập. Tất cả những gì chúng ta cần bây giờ là một server.

### 4.2 Thiết lập một server Linux từ xa

Đối với bước này, yêu cầu quan trọng là tìm server rẻ nhất sẽ chạy Dart và Flutter. Vì bạn sẽ chỉ làm việc với phiên bản dòng lệnh của Flutter và bạn không cần chạy trình giả lập hoặc IDE nặng, server riêng ảo 1GB (VPS) sẽ ổn.

Là một giáo viên, tôi có thể thiết lập một server Linux với các tài khoản mà học sinh của tôi có thể đăng nhập. Tuy nhiên, sau đây là một số ý tưởng cho những bạn đang cần tìm server cho riêng mình.

Tôi đã sử dụng [Digital Ocean](https://www.digitalocean.com/) cho các server của mình hơn một năm và tôi nghe nói rằng [Vulr](https://www.vultr.com/) cũng tốt. Tôi chọn Digital Ocean vì họ có hướng dẫn tốt, đáng tin cậy và không quá đắt. Tuy nhiên, ngay cả Digital Ocean và Vulr cũng tốn khoảng 5 USD mỗi tháng cho một server 1GB, tức là 60 USD một năm. Điều đó vẫn còn đắt đối với sinh viên và một số lập trình viên mới. Đôi khi, bạn có thể tìm thấy các giao dịch thậm chí còn rẻ hơn trên [LowEndBox](https://lowendbox.com/) nếu bạn tìm kiếm các bài viết cũ. Đối với hướng dẫn hôm nay, tôi sẽ sử dụng VPS 1GB mà tôi tìm thấy trên LowEndBox với giá 11 đô la/năm.

Ghi chú: Hãy nhớ rằng nhiều công ty trên LowEndBox kết thúc việc kinh doanh của mình. Tôi đã từng thành công trong nhiều năm, những người khác thì không như vậy. Sao lưu dữ liệu của bạn. Hoặc nếu bạn chọn Digital Ocean, bạn có thể sử dụng [đường link giới thiệu](https://www.digitalocean.com/?refcode=523712b8d418&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=CopyPaste) này. Bạn sẽ nhận được giảm giá và tôi cũng nhận được chút tiền.

Sau khi nhận được VPS, tôi cài đặt hệ điều hành Ubuntu 20.04 trên đó.

## 5. Cài đặt Flutter và Dart

Sau khi có server, bạn có thể đăng nhập từ Termux (hoặc bất kỳ ứng dụng ssh nào bạn đang sử dụng trên điện thoại).

```
ssh root@107.173.555.555
```

Thay đổi IP thành IP của bạn (tìm IP của con VPS). Có một số task quản trị (administrative tasks) bạn nên làm trước khi tiếp tục, nhưng thay vì mô tả những task đó ở đây, tôi sẽ giới thiệu cho bạn bài viết [Thiết lập máy chủ ban đầu với Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04).

### 5.1 Downloading Flutter

Truy cập trang [Cài đặt Linux cho Flutter](https://flutter.dev/docs/get-started/install/linux#install-flutter-manually) trong trình duyệt điện thoại của bạn. Sau đó, nhấp và giữ nút tải xuống để bạn có thể sao chép liên kết tải xuống bản phát hành hiện tại.

Sau đó, quay lại terminal (nơi bạn đã đăng nhập vào VPS của mình) và sử dụng wget để tải tệp:

```
wget https://storage.googleapis.com/flutter_infra/releases/stable/linux/flutter_linux_1.22.6-stable.tar.xz
```

Giải nén bản tải xuống bằng lệnh sau:

```
tar xf flutter_linux_1.22.6-stable.tar.xz
```

Cập nhật tên tệp thành bất kỳ phiên bản ổn định nào hiện có. Bạn có thể xóa tải xuống ngay bây giờ:

```
rm flutter_linux_1.22.6-stable.tar.xz
```

Ghi chú:

* Termux có một phím tab trong thanh menu phía trên bàn phím mà bạn có thể sử dụng để tự động hoàn thành các tên tệp dài để bạn không cần phải nhập tất cả các tên đó trên bàn phím.
* Bạn cũng có thể thử nghiệm với các bàn phím khác nhau giúp nhập dòng lệnh và code dễ dàng hơn.
* Nếu bạn đăng nhập vào server trong một thời gian dài, terminal có thể không phản hồi, trong trường hợp đó, bạn sẽ buộc phải hủy quá trình trong Termux. Để thực hiện việc đó, hãy nhấn và giữ màn hình, chọn More… và sau đó chọn Kill process.

### 5.2 Thêm Flutter vào đường dẫn của bạn

Để chạy các lệnh Flutter và Dart từ command line, bạn cần thêm Flutter (bao gồm Dart) vào đường dẫn của mình. Nơi bạn thực hiện việc này trên các bản phân phối Linux khác nhau là khác nhau.

Trong thư mục chính của bạn (home directory), liệt kê tất cả các tệp ở đó như sau:

```
ls -al
```

Ubuntu sử dụng `.bashrc` để khởi tạo đường dẫn, vì vậy hãy chỉnh sửa tệp đó:

```
nano .bashrc
```

Sau đó, thêm dòng sau vào cuối (giả sử bạn đã giải nén Flutter vào thư mục chính của mình):

```
export PATH="$PATH:$HOME/flutter/bin"
```

Hãy nhớ rằng bạn có thể sao chép và dán trong Termux bằng cách nhấn và giữ màn hình. Lưu tệp và thoát khỏi nano.

Sau đó, làm mới cài đặt bash bằng cách:

```
source .bashrc
```

Bạn có thể tìm thêm hướng dẫn về cách thêm Flutter vào đường dẫn của mình [tại đây](https://flutter.dev/docs/get-started/install/linux#update-your-path).

### 5.3 Hoàn thành việc cài đặt

Bây giờ bạn hãy chạy thử:

```
flutter --version
```

Điều đó có thể không hoạt động vì Flutter có dependencies mà VPS của bạn có thể chưa cài đặt, vì vậy bạn sẽ thấy một thông báo lỗi như sau:

```
Error: Unable or find git in your PATH
Missing "curl" tool. Unable to download Dart SDK
Missing "unzip" tool. Unable to extract Dart SDK
```

Chỉ cần cài đặt lần lượt các công cụ còn thiếu với apt-get cho đến khi bạn không còn gặp bất kỳ lỗi nào khi cố gắng chạy các lệnh `flutter`.

```
sudo apt-get install git
sudo atp-get install curl
sudo apt-get install unzip
```

Cuối cùng, khi bạn chạy `flutter --version`, bạn sẽ thấy một cái gì đó như sau:

```
Flutter 1.22.6 • channel stable
...
Tools • Dart 2.10.4
```

Flutter đã được thiết lập xong!

## 6. Phát triển một dự án Flutter

Bạn có thể làm bất cứ điều gì liên quan đến Flutter trên command line. Trên thực tế, các IDE như Android Studio và VS Code đều sử dụng giao diện dòng lệnh Flutter (CLI) trong nội bộ.

### 6.1 Tạo một dự án mới

Di chuyển đến bất kỳ thư mục nào bạn muốn đưa các dự án của mình vào. Sau đó, tạo một dự án Flutter mới như sau:

```
flutter create my_project
```

### 6.2 Chỉnh sửa file (Editing files)

Tất nhiên, bạn có thể sử dụng nano hoặc vi để chỉnh sửa tệp dự án và viết code của mình. Nếu bạn đi theo con đường đó, tôi sẽ sử dụng vi (hoặc vim). Đó là một con đường dốc nhưng một khi bạn học các phím tắt, nó khá mạnh mẽ. (Dù sao thì đó là những gì mọi người nói - tôi không rõ nữa.)

Một tùy chọn khác là sử dụng ứng dụng IDE trên điện thoại của bạn. Có khá nhiều. Tôi đã thử nghiệm với ba trong số chúng và Acode có vẻ khá tốt. Nó không được thiết kế đặc biệt cho Dart, nhưng nó vẫn giúp chỉnh sửa code dễ dàng hơn nhiều so với thực hiện ở nano hoặc vi.

![image.png](https://images.viblo.asia/81c8a7a3-780c-4a97-8fcb-0a4e6df407df.png)

Nếu bạn thực hiện chỉnh sửa file trên điện thoại của mình, bạn sẽ cần một cách nào đó để chuyển những thay đổi đó đến server. Bạn có thể sao chép và dán giữa Acode và nano / vi đang chạy trong Termux, nhưng sử dụng git có lẽ sẽ dễ dàng hơn. Tôi sẽ mô tả điều đó trong phần tiếp theo.

## 7. Đồng bộ hóa các thay đổi với git

Để viết mã trên điện thoại của bạn và chạy nó trên server, bạn cần phải đồng bộ hóa các thay đổi giữa chúng. Để làm điều đó, bạn có thể sử dụng git với GitHub làm kho lưu trữ trung tâm. Sau khi hoàn thành chỉnh sửa trên điện thoại, bạn sẽ chuyển các thay đổi lên GitHub. Sau đó, trước khi chạy mã trên server, bạn sẽ lấy các bản cập nhật từ GitHub.

![image.png](https://images.viblo.asia/6f8937b9-3c2c-4506-98f8-96cf38a70f91.png)

Tôi sẽ không đi vào chi tiết cách thực hiện điều đó trong bài viết này, nhưng hãy để tôi phác thảo các bước bạn sẽ cần thực hiện với các liên kết để biết cách thực hiện chúng:

* Khởi tạo repository project của bạn trên Github. Có một số điều khó (hoặc không thể?) thực hiện với phiên bản di động của trang GitHub. Tuy nhiên, trong trình duyệt của bạn, bạn có thể yêu cầu xem phiên bản desktop của trang web. Để được trợ giúp thêm về các bước 1–4, hãy đọc How to Push an Existing Project to GitHub.
* Khởi tạo dự án của bạn bằng git trên server.
* Kết nối dự án của bạn với GitHub repository.
* Đẩy code của bạn từ server sang GitHub.
* Cài đặt git trên điện thoại của bạn. Bạn có thể thực hiện việc này trong Termux với pkg install git.).
* Clone the GitHub repository lên điện thoại của bạn. Đừng làm điều đó trong thư mục chính của Termux, nếu không, ứng dụng chỉnh sửa code của bạn sẽ không có quyền truy cập vào nó. Thay vào đó, hãy bật lưu trữ được chia sẻ trong Termux với `termux-setup-storage` và sau đó `cd ~ / shared` để tìm một vị trí clone tốt.
* Thực hiện chỉnh sửa code trên điện thoại của bạn. Bạn có thể sử dụng code A hoặc bất kỳ ứng dụng nào bạn thích.
* Add, commit, và sau đó push những thay đổi đó sang GitHub từ điện thoại.
* Back về server và kéo các thay đổi (pull resquest) từ GitHub.

Giờ đây bạn có thể thực hiện các thay đổi, nhưng bạn thực sự không biết liệu code của mình có bất kỳ bug nào hay không.

## 8. Debug Flutter project

Đảm bảo rằng bạn đang ở trong thư mục gốc của dự án trong server terminal. Bạn hãy chạy lệnh sau:

```
flutter analyze
```

Thao tác này sẽ thực hiện phân tích tĩnh (static analysis) về dự án của bạn và cho bạn biết nếu có bất kỳ lỗi thời gian biên dịch nào. Hy vọng rằng bạn sẽ thấy những thứ như sau:

```
Analyzing my_project...
No issues found! (ran in 9.1s)
```

Tuy nhiên, nếu có bất kỳ lỗi nào, hãy sửa chúng và sau đó chạy lại phân tích. (Tôi thực sự trở thành một người hâm mộ lớn hơn của vi khi thực hiện những thay đổi như thế này. Điều đó dễ dàng hơn so với việc đồng bộ hóa với GitHub và nhảy qua lại.)

Static analysis có thể giúp bạn tìm lỗi thời gian biên dịch, nhưng bạn sẽ cần chạy code để tìm lỗi thời gian chạy.

## 9. Running Dart code with tests

Cuối cùng, bạn sẽ chạy phiên bản web Flutter của ứng dụng để xem toàn bộ ứng dụng đang hoạt động như thế nào. Tuy nhiên, bạn có thể kiểm tra từng đoạn code riêng lẻ của mình bằng cách chạy thử nghiệm. Một điều tuyệt vời khi test các ứng dụng Flutter là các test không yêu cầu giao diện đồ họa. Điều đó có nghĩa là ngoài việc kiểm tra logic Dart thuần túy, bạn cũng có thể kiểm tra các widget giao diện người dùng - tất cả đều từ dòng lệnh.

Nếu bạn đã tạo một dự án Flutter mới, thì đã có sẵn một bài kiểm tra mặc định trong test / widgets_test.dart. Chạy thử nghiệm đó bằng lệnh sau:

```
flutter test
```

Server của tôi đã cho tôi kết quả sau:

```
00:34 +1: All tests passed!
```

Tìm hiểu thêm trong tài liệu [Testing Flutter apps](https://flutter.dev/docs/testing).

Nhiều lập trình viên hoàn toàn không viết test. Họ biết họ nên làm nhưng họ nghĩ rằng viết các bài test sẽ làm họ chậm lại. Vì vậy, họ bỏ qua chúng. Tuy nhiên, đối với các lập trình viên lập trình trên điện thoại, các bài test có thể là cách nhanh nhất để nhận được kết quả. Thành thạo kỹ năng này không chỉ giúp bạn lúc này mà còn giúp bạn phát triển trong tương lai.

## 10. Publish ứng dụng Flutter web

Cách nhanh nhất để toàn bộ ứng dụng của bạn chạy và xem giao diện người dùng thực sự trông như thế nào là xây dựng phiên bản web của ứng dụng Flutter của bạn.

### 10.1 Thêm các hỗ trợ web vào ứng dụng

Tại thời điểm viết bài này, Flutter web vẫn đang trong giai đoạn thử nghiệm (beta version), vì vậy bạn sẽ cần chạy các lệnh sau để bật các web build:

```
flutter channel beta
flutter upgrade
flutter config --enable-web
```

Đi tới thư mục gốc của dự án của bạn. Nếu dự án của bạn không hỗ trợ web trước đây, thì bạn có thể thêm bằng lệnh sau:

```
flutter create .
```

Bây giờ bạn có thể build web như sau:

```
flutter build web
```

Tất cả các tệp cho ứng dụng web của bạn hiện nằm trong thư mục build/web. Bước tiếp theo là tạo một web server để bạn có thể xem ứng dụng của mình trong trình duyệt.

### 10.2 Serving the web app

Bạn đã có một server, vì vậy bạn cũng có thể sử dụng nó như một web server. Để làm điều đó, bạn có thể sử dụng Nginx. Có một lời giải thích dài hơn về cách thiết lập Nginx [ở đây](https://phoenixnap.com/kb/how-to-install-nginx-on-ubuntu-20-04), nhưng tôi sẽ bao gồm các hướng dẫn bên dưới:

Chạy lệnh sau để cài đặt Nginx:

```
sudo apt-get install nginx
```

Nếu bạn đã làm theo lời khuyên trong [liên kết thiết lập server](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04) mà tôi đã cung cấp cho bạn trước đó, thì bạn đã bật tường lửa (firewall). Tuy nhiên, nó hiện đang chặn các kết nối HTTP. Để bỏ chặn chúng, hãy chạy lệnh sau:

```
sudo ufw allow 'Nginx HTTP'
```

Bây giờ, việc đặt địa chỉ IP của bạn vào trình duyệt web của điện thoại sẽ cung cấp cho bạn tệp Nginx index.html mặc định.

![image.png](https://images.viblo.asia/b6c46dbb-ddc1-4817-ad70-5ae8d44f9e2d.png)

Bây giờ tất cả những gì bạn cần làm là trỏ Nginx đến ứng dụng web Flutter của bạn. Tạo tệp cấu hình trang web mới:

```
sudo nano /etc/nginx/sites-available/my_project
```

Nếu nano không hiệu quả với bạn, hãy thử vi. (Termux đã ngăn tôi sử dụng điều hướng mũi tên (arrow navigation) trên bàn phím của tôi, vì vậy tôi phải sử dụng các [phím tắt điều hướng vi](https://ryanstutorials.net/linuxtutorial/cheatsheetvi.php).) Sau đó dán nội dung sau:

```
server {
    listen 80;
    root /home/suragch/my_project/build/web;
    index index.html index.htm;
    location / {
        try_files $uri $uri/ =404;
    }
}
```

Nhưng hãy thay đổi đường dẫn sau khi `root` thành bất cứ nơi nào thư mục build/web của dự án. Lưu và thoát khỏi tệp. Bây giờ, hãy xóa trang mặc định của Nginx:

```
sudo rm /etc/nginx/sites-enabled/default
```

Và thêm ứng dụng của bạn:

```
sudo ln -s /etc/nginx/sites-available/my_project /etc/nginx/sites-enabled
```

Sau đó khởi động lại Nginx:

```
sudo systemctl restart nginx
```

Làm mới trang trình duyệt bằng địa chỉ IP của bạn và bạn sẽ thấy ứng dụng của mình hiển thị:

![image.png](https://images.viblo.asia/2477f07e-ae09-4395-a481-2c39b2701ef2.png)

Bây giờ thực hiện một thay đổi đối với code và chạy lại `flutter build web`. (Ví dụ: tôi đã thay đổi `Colors.blue` thành `Colors.green` trong lib/main.dart.) Sau đó, làm mới trình duyệt web của bạn:

![image.png](https://images.viblo.asia/d037c42e-9b69-4be0-a7a2-ee2c254afd7a.png)

Bây giờ bạn có một cách để chạy và kiểm tra trực quan ứng dụng Flutter của mình! Nó không chính xác là hot reload, nhưng nó tốt hơn rất nhiều so với các code form và thẻ đục lỗ, phải không?

**Lưu ý:** Việc thiết lập Nginx để phục vụ thư mục xây dựng sẽ thuận tiện cho việc phát triển, nhưng trên ứng dụng web sản xuất, bạn nên sao chép nội dung của thư mục build/web ở một nơi khác và trỏ Nginx vào đó.

Sau khi bạn hoàn tất quá trình phát triển, bước tiếp theo là xuất bản ứng dụng của bạn lên app store.

## 11. Publishing your app (Xuất bản ứng dụng của bạn)

Tôi nghĩ rằng tôi có thể gặp sự cố khi xuất bản ứng dụng truy cập mặc định lên Google Play hoặc App Store. Vì vậy, để kiểm tra bước này, tôi sẽ sử dụng một ứng dụng của mình cho một [bài viết tôi đã viết trên raywenderlich.com](https://www.raywenderlich.com/6373413-state-management-with-provider). Thông thường, tôi không thể sử dụng nội dung đó cho một bài viết giáo dục như bài báo này, nhưng Ray cho tôi quyền đặc biệt để sử dụng ứng dụng đó làm ví dụ ở đây. Tôi sẽ không mô tả cách tạo ra chính ứng dụng, vì vậy hãy xem bài viết tôi đã liên kết ở trên nếu bạn muốn biết nó được tạo ra như thế nào.

Ứng dụng đã tồn tại trên GitHub vì vậy tôi sẽ làm theo các bước tương tự như tôi đã mô tả trước đây để làm cho nó chạy dưới dạng ứng dụng web trên server. Ứng dụng này có tên là Moola X và là một tool thu đổi ngoại tệ. Dưới đây là giao diện khi chạy trên trình duyệt điện thoại:

![image.png](https://images.viblo.asia/cdcb78a9-0c70-4c73-b17f-900b8b84b3c7.png)

Lưu ý: Tôi đã tạo ứng dụng này bằng máy tính xách tay của mình hơn một năm trước và ngay cả các bản cập nhật tôi đã thực hiện cho nó vừa rồi cũng được thực hiện trên máy tính của tôi. Bạn có thể gọi đây là gian lận vì tôi không phát triển tất cả trên điện thoại của mình, nhưng tôi đang cố gắng đăng bài viết này trước khi lớp học của tôi bắt đầu, vì vậy tôi cần thực hiện một số phím tắt. Nếu điều đó chưa rõ ràng, thì việc phát triển trên điện thoại chắc chắn sẽ khó hơn so với việc sử dụng một máy tính.

### 11.1 Where to publish (Xuất bản ở đâu)

Xuất bản trên Google Play yêu cầu $ 25 USD phí một lần trong khi xuất bản trên Apple App Store yêu cầu phí $ 99 USD hàng năm. Điều đó khiến Google Play trở thành mục tiêu xuất bản đầu tiên.

Có thể tạo phiên bản phát hành của ứng dụng Android trực tiếp trên server mà không cần Android Studio nếu bạn cài đặt Gradle. Sau đó, tệp APK hoặc AAB kết quả có thể được tải lên tài khoản lập trình viên Google Play của bạn. Tuy nhiên, tôi quyết định theo đuổi một con đường khác.

Tôi đã nghe nói về một nhà cung cấp dịch vụ CI / CD trực tuyến có tên Codemagic sử dụng repo GitHub để tạo file nhị phân (app binary) trong môi trường production trên máy tính của chính họ. Tôi thường muốn tránh các dịch vụ của bên thứ ba và chúng tôi không thực sự cần chúng để tạo ứng dụng Android. Tuy nhiên, một lợi thế chính ở đây là các ứng dụng được biên dịch trên máy tính của Apple. Điều đó có nghĩa là bạn có thể dễ dàng sử dụng chúng để xuất bản phiên bản iOS của ứng dụng Flutter. Đó là điều bạn không bao giờ có thể làm trên server Linux của mình. Về chi phí, Codemagic cung cấp 500 phút xây dựng miễn phí mỗi tháng. Như vậy là quá đủ để xuất bản ứng dụng miễn là bạn thực hiện tất cả thử nghiệm trên server của riêng mình như được mô tả ở trên và sau đó sử dụng Codemagic để tạo phiên bản phát hành cuối cùng của ứng dụng.

Lưu ý: Tôi không có bất kỳ mối liên hệ nào với Codemagic và không nhận được bất kỳ lợi ích nào nếu bạn sử dụng chúng.

### 11.2 Thiết lập với Codemagic

Codemagic, nếu bạn đang đọc phần này, hãy cân nhắc việc nhờ ai đó viết một số hướng dẫn từng bước trình bày chính xác những gì người dùng mới cần làm để xuất bản một ứng dụng. Có một hướng dẫn để xuất bản ứng dụng Flutter Android, một hướng dẫn khác để xuất bản ứng dụng Flutter iOS, v.v. cho tất cả các tùy chọn bạn cung cấp. Bạn có rất nhiều tài liệu hay và tôi thích các bài viết trên blog của bạn, nhưng việc thiết lập lần đầu tiên khá là đáng sợ.

Dưới đây là các bước cơ bản bạn cần làm theo để thiết lập Codemagic:

* Sign up (Đăng ký) tài khoản Codemagic.
* Trong Codemagic, hãy thêm git repository cho ứng dụng của bạn.
* Bạn sẽ cần tạo keystore để sign ứng dụng Android của mình. Để làm điều đó, bạn cần sử dụng keytool từ framework Java Development Kit (JDK). Vì vậy, trên server của bạn cài đặt Java. Có những hướng dẫn tốt ở đây. Sau đó, tạo keystore bằng cách sử dụng keytool như thế này. Đừng quên mật khẩu của bạn, không làm mất tệp keystore và không chuyển tệp vào GitHub. Nếu mất tệp hoặc quên mật khẩu, bạn sẽ không thể cập nhật ứng dụng của mình trong tương lai.
* Tải keystore vào điện thoại của bạn. Bạn có thể sử dụng scp cho điều đó. Dưới đây là một ví dụ về nó có thể trông như thế nào. Tất nhiên, thông tin chi tiết của bạn sẽ khác.

```
scp suragch@107.173.555.555:/home/suragch/moolax_keystore.jks .
```

Làm theo hướng dẫn [tại đây](https://docs.codemagic.io/flutter-code-signing/android-code-signing/) và [tại đây](https://flutter.dev/docs/deployment/android) để chuẩn bị phát hành ứng dụng Android. Có một số ứng dụng chỉnh sửa ảnh hoặc tool thay đổi kích thước ảnh online mà bạn có thể sử dụng để tạo nội dung ảnh có kích thước chính xác.

* Trong Codemagic tải lên tệp keystore và nhập thông tin mật khẩu và bí danh(alias information). Bạn cũng nên đảm bảo rằng cài đặt Android là để tạo một bản phát hành (release). Tôi cũng đã chọn AAB và universal APK làm build output. AAB là những gì bạn sẽ đặt trên Google Play, nhưng APK mà bạn có thể cài đặt trực tiếp trên điện thoại của mình.
* Đảm bảo tất cả các thay đổi cục bộ của bạn được đẩy lên GitHub (cho dù bạn đã thực hiện chúng trên điện thoại hay server). Sau đó nhấp vào Start build trong Codemagic.

Mất khoảng năm phút để build ứng dụng và khi quá trình build hoàn tất, Codemagic đã gửi cho tôi một email có liên kết đến các tệp AAB và APK. Tôi đã tải xuống và cài đặt APK và… nó không hoạt động. Nó gặp sự cố khi tôi cố gắng mở ứng dụng đã cài đặt trên điện thoại của mình. Haizzz...

Ngày hôm sau…

Sau khi khắc phục cảnh báo của `flutter analyzer` mà tôi đã bỏ qua trước đó, tôi đã nhận được bản build ứng dụng Android từ Codemagic đã hoạt động. Trong tương lai, việc thêm integration testing và thêm chúng vào Codemagic build cũng sẽ giúp ta biết được lỗi build.
Dù sao, đây là giao diện của native Android build đang chạy trên điện thoại của tôi:

![image.png](https://images.viblo.asia/9518307f-46dd-4af5-a2c7-285876eaa0fa.png)

Có thể đặt APK dưới dạng tải xuống trực tiếp trên server của chúng ta và gọi là hoàn tất, nhưng để làm cho nó phổ biến rộng rãi hơn và kiếm tiền từ ứng dụng, tốt hơn nên đặt nó trên Google Play.

### 11.3 Publish lên Google Play

Để xuất bản trên Google Play, bạn cần đăng ký tài khoản lập trình viên và đăng nhập vào Google Play Console. [Đây](https://support.magplus.com/hc/en-us/articles/204270878-Android-Setting-up-Your-Google-Play-Developer-Account) là hướng dẫn. Như tôi đã đề cập trước đó, lệ phí là $ 25 USD. Sinh viên hoặc lập trình viên không đủ tiền có thể lập nhóm và chia sẻ tài khoản với nhau.

Sau khi đăng nhập, bạn có thể nhấn nút Create app và bắt đầu điền tất cả các thông tin cần thiết. Hầu hết mọi thứ đều diễn ra khá suôn sẻ và Google đã giúp trang web có thể truy cập được trên điện thoại. Tôi đã tải lên tệp AAB mà tôi nhận được từ email Codemagic. Đối với hình ảnh ứng dụng, tôi đã sử dụng một trang web trực tuyến sẽ thay đổi kích thước ảnh theo kích thước yêu cầu. Tuy nhiên, các yêu cầu khó nhất là ảnh chụp màn hình 7 inch và 10 inch. Cuối cùng, tôi đã tải lên một phiên bản ảnh chụp màn hình điện thoại được cắt xén của mình. Chúng ta sẽ xem liệu điều đó có vượt qua được bài đánh giá hay không.

![image.png](https://images.viblo.asia/32dbdbd6-7b0f-49f0-bd28-0868973624bd.png)

Tôi đã thành công trong việc gửi ứng dụng để review. Không thể làm gì hơn cho đến khi tôi nhận được hồi âm. Tôi sẽ gọi đó là một thành công! Không có phần nào của quy trình phát triển ứng dụng mà bạn không thể thực hiện trên điện thoại của mình.

Cập nhật: Ứng dụng đã được chấp nhận trong lần thử đầu tiên:

![image.png](https://images.viblo.asia/b7e858d2-9238-44b9-bd12-c36a288bd016.png)

Tuy nhiên, sau ba tháng, nó đã kiếm được tổng cộng $ 0 đô la. Không phải là một dấu hiệu đáng hy vọng cho các lập trình viên muốn kiếm tiền để mua một chiếc máy tính. Có lẽ quảng cáo sẽ là một lựa chọn tốt hơn. Tôi đã từ bỏ và làm ứng dụng miễn phí. Và nó [đây](https://play.google.com/store/apps/details?id=com.raywenderlich.moolax&hl=en_US&gl=US).

## 12. Những suy nghĩ kết luận

Lập trình ứng dụng di động trên điện thoại của bạn là một task không hề dễ dàng. Tuy nhiên, một người có động lực hoàn toàn có thể hoàn thành nó. Quy trình bắt buộc thậm chí sẽ giúp lập trình viên “di động” học các kỹ năng mà lập trình viên “laptop” có thể bỏ lỡ, các kỹ năng như quản trị server, kiểm soát source bằng git, kiểm tra unit và quy trình làm việc CI / CD.

Đối với những bạn đang đọc bài viết này, những người chỉ có điện thoại, tôi khuyên bạn nên bắt đầu tạo ứng dụng đầu tiên của mình. Bạn có thể thử bán nó trên Google Play hoặc chạy quảng cáo, nhưng rất có thể bạn sẽ không kiếm được nhiều tiền. Đối với ứng dụng thứ hai, tôi khuyên bạn nên cố gắng kiếm một công việc tự do trên những trang web tìm kiếm lập trình viên ứng dụng. Tiết kiệm tiền của bạn và khi bạn có thể, hãy mua một máy tính xách tay hoặc desktop giá rẻ. Khi bạn nhận được một cuộc phỏng vấn việc làm, hãy nói với nhà tuyển dụng về cách bạn bắt đầu bằng cách lập trình trên điện thoại của mình. Cho họ thấy những gì bạn đã hoàn thành. Điều đó sẽ gây ấn tượng với bất kỳ ai.

Và đối với những người bạn đang đọc bài viết này, những người có kinh nghiệm lập trình, hãy cân nhắc việc cố vấn cho ai đó trong quá trình trở thành lập trình viên. Bước đầu tiên có thể là đi với họ qua các bước được nêu trong bài viết này. Bạn biết nếu họ đủ nghiêm túc để làm điều đó, thì họ sẽ tiến xa hơn rất nhiều.
Với tôi? Tôi hy vọng mình không bao giờ bị mất máy tính, nhưng nếu có, tôi biết cách sử dụng điện thoại của mình!

> Xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/lap-trinh-flutter-tren-dien-thoai/)**