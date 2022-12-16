Ở thời điểm này có lẽ tất cả những người quan tâm đến máy tính cá nhân đều đã biết về các máy tính chạy chip Apple M1, và loáng thoáng còn nhớ đâu đó trong tâm trí họ về một thứ gọi là Rosetta. Có người nói nó là máy ảo, có người cũng hiểu qua qua rằng các ứng dụng chưa hỗ trợ M1 sẽ chạy qua Rosetta.

Đấy là trên mạng người ta nói thế, còn tôi thì tôi sẽ nói là đọc bài này đi để biết Rosetta là cái gì nhé!

# Về Rosetta
![](https://huypham.com/wp-content/uploads/2021/07/Rosetta_Stone-875x1024.jpeg)

Vâng các bạn vừa nhìn thấy hình ảnh hòn đá Rosetta. Trên viên đá này có khắc những dòng chữ nhỏ. Đây đại khái là một sắc lệnh được ban hành bởi một vị vua thời cổ ở Ai Cập, điểm đặc biệt ở đây là nó được viết bằng ba thứ tiếng khác nhau, và bởi sự khác biệt rất ít giữa ba phiên bản, viên đá Rosetta trở thành chìa khoá để giải mã các chữ viết của người Ai Cập (*Theo [Wikipedia](https://en.wikipedia.org/wiki/Rosetta_Stone)*).

![](https://huypham.com/wp-content/uploads/2021/07/rosetta-2-1024x552.jpeg)

Còn thứ trên đây không phải là phiên bản thứ 2 của viên đá, mà là logo của một công cụ dịch mã nguồn do Apple làm ra, lấy cảm hứng từ viên đá Rosetta, và lấy luôn cả cái tên Rosetta luôn. Hiện tại, thứ được gắn kèm trong macOS Big Sur là phiên bản Rosetta 2.

Thực tế, Rosetta được ra mắt năm 2006, thời điểm Apple ứng dụng chip Intel thay cho chip IBM trên máy Mac của mình. Nó vốn không phải là một giải pháp lý tưởng cho việc chuyển đổi phần cứng, nhưng cũng khá tốt để giúp các ứng dụng được phát triển trên nền chip PowerPC có thể chạy trên kiến trúc x86 của Intel. Rosetta đã hoàn thành nhiệm vụ của mình khi toàn bộ những ứng dụng cũ trên máy Mac đã hỗ trợ hoàn toàn chip Intel.

Cho đến cuối năm 2020, cả thế giới đón chào sự ra đời của dòng chip Apple silicon, một sự thay thế phần cứng máy Mac lần thứ hai diễn ra, loại bỏ đi tấm vi xử lý Intel chậm chạp thay đổi ra khỏi cơn bão sức mạnh phần cứng hứa hẹn từ chính Apple, Rosetta 2 cũng ra đời để tiếp tục nhiệm vụ trước đây của nó, nhưng lợi hại hơn xưa rất nhiều.

Trong quá trình chuyển đổi phần cứng, một trong những thách thức lớn nhất là hỗ trợ tương thích cho các ứng dụng cũ. Ứng dụng được phát triển cho một kiến trúc chip này không thể cứ thế mà chạy trên kiến trúc của chip khác mà không phải code lại và biên dịch lại. Rosetta 2 chính là thứ vũ khí để Apple vượt qua giai đoạn này.

# Rosetta 2 là gì?
Đây là một tính năng đi kèm với macOS Big Sur với mục đích hỗ trợ cho các máy Mac chạy Apple silicon (từ giờ thay vì gọi là chip M1 thì tôi sẽ gọi là Apple silicon, để đại diện chung cho tất cả các dòng chip được Apple sản xuất), nhằm thực hiện chuyển đổi các *Intel-based Mac apps* giúp cho nó có thể chạy được trên dòng chip Apple silicon mà không cần nhà cung cấp phần mềm phải code hay build lại ứng dụng.

Nó cũng chính là lý do mà bạn chỉ cần mua một chiếc Macbook về, cài các ứng dụng cần thiết như trước đây vẫn làm, và sử dụng nó một cách hết sức bình thường.

Về mặt kỹ thuật, Rosetta là một quá trình chuyển đổi các tập lệnh của kiến trúc *x86_64 (Intel)* sang tập lệnh của kiến trúc *ARM-based Apple silicon*. Mặc dù có performance rất tốt, nhưng Apple nói rằng đây không phải là một giải pháp thay thế cho việc tạo ra một phiên bản native, nó chỉ giúp phận developer chúng ta có thời gian để tạo ra một universal binary cho ứng dụng của mình thôi.

# Rosetta 2 hoạt động như thế nào?
![](https://huypham.com/wp-content/uploads/2021/07/DSC07804.jpg)

Thực tế thì với người dùng cuối, Rosetta gần như không xuất hiện bao giờ. Nó ẩn mình và đứng sau những điều kì diệu.

Nếu một executable (phần mềm, ứng dụng,…) mà chỉ có các tập lệnh của Intel được khởi chạy, macOS sẽ tự động gọi Rosetta và bắt đầu quá trình biên dịch. Khi việc biên dịch kết thúc, hệ thống sẽ chạy phiên bản được dịch ở đúng nơi, đúng chỗ, đúng input mà bản gốc được gọi lên.

Rõ ràng thì việc biên dịch sẽ cần chút thời gian, và dịch ở mức assembly cũng khó mà tối ưu hết được mã nguồn, do đó việc chạy những ứng dụng như vậy có thể khiến user cảm thấy chậm một chút. Đấy là khuyến cáo từ Apple, nhưng thực tế là tôi cảm thấy nó rất nhanh rồi.

Tiếp đó, hệ thống sẽ ưu tiên chạy các tập lệnh *arm64* ở trên Apple silicon. Do đó, nếu binary của ứng dụng có chứa cả phiên bản *arm64* và *x86_64* (hay người ta gọi là universal binary, tức là ứng dụng đó hỗ trợ cả máy Mac Intel và Apple silicon), thì người dùng có thể yêu cầu hệ thống chạy ứng dụng sử dụng Rosetta nhờ vào việc chọn trong cửa sổ Get Info như hình dưới đây:

![](https://huypham.com/wp-content/uploads/2021/07/about-the-rosetta-translation-environment-1@2x.png)

Thường thì người ta hay lựa chọn option này khi phần mềm họ sử dụng có một số plug-in chưa hỗ trợ kiến trúc *arm64*. Với các iOS Developer mà nói, đặc biệt là những người phải làm việc với nhiều thư viện cũ kĩ không chịu update, option này sẽ là một lưu ý để có thể thoát được một cơ số lỗi khi build dự án.

## Điểm đặc biệt

Sự khác biệt lớn nhất của Rosetta 2 với phiên bản cũ đó là nó tự động biên dịch các non-native app khi chúng được cài đặt (hoặc có thể coi là khởi chạy lần đầu) chứ không phải lúc đang chạy như kiểu JIT của JavaScript compiler. Đó chính là lý do mà hiệu suất chung được cải thiện bởi vì không có thêm nhiều quá trình gây tắc nghẽn luồng thực thi của ứng dụng. Cá nhân tôi nghĩ rằng Apple silicon có lẽ mới đủ sức mạnh để có thể triển khai biên dịch toàn bộ mà không tốn quá nhiều thời gian như vậy trong Rosetta 2. Ngoài ra, nếu có trường hợp cần dịch code theo kiểu on-the-fly, Rosetta cũng vẫn hỗ trợ.

Tài liệu của Apple cũng nói rằng nếu Rosetta gặp phải một chương trình con chưa được dịch, nó sẽ tiến hành dịch và tiếp tục việc thực thi chương trình. Quá trình này đảm bảo sự mượt mà và liên tục trong việc chuyển đổi giữa quá trình dịch và thực thi. Rosetta cũng được tối ưu để dịch code sao cho trải nghiệm sử dụng gần với native nhất.

## Giới hạn của Rosetta

Rosetta có thể dịch hầu hết các *Intel-based apps*, bao gồm cả những app có chứa JIT compiler. Tuy nhiên, Rosetta không thể dịch các executable sau:

- Các kernel extension
- Các ứng dụng Máy Ảo dùng để ảo hóa nền tảng máy tính x86_64. Kiểu như ông Parallel hay VMware Fusion chẳng hạn.

Rosetta có thể dịch được tất cả các tập lệnh của x86_64, nhưng nó không hỗ trợ thực thi một vài tập lệnh và tính năng vi xử lý mới như các tập lệnh vector AVX, AVX2 và AVX512. Nếu app của chúng ta mà có chứa lệnh như vậy thì cần phải kiểm tra trước rằng nó có available không vì nếu app chạy trên Mac Intel thì không sao, chứ lúc đấy mà chạy trên Rosetta thì có khả năng là crash rất cao.

-----

*Bài viết gốc của mình đặt tại blog cá nhân: https://huypham.com/2021/07/16/rosetta-2-phia-sau-thanh-cong-cua-apple-silicon/*