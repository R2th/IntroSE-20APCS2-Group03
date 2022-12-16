Bạn thân mến, chắc không ít lần bạn thấy Git xuất hiện khi bạn đang loay hoay tìm kiếm thông tin cần thiết trên Internet. Thế Git là gì và tại sao Git hay được nhắc đến trong các bài viết liên quan đến lập trình đến thế? Git có cần thiết cho bạn, [lập trình viên](http://csc.edu.vn/lap-trinh-va-csdl)  thường xuyên tham gia các dự án không? Trong bài viết này, chúng ta sẽ cùng tìm hiểu về Git để hiểu và mạnh dạn ứng dụng Git khi cần thiết. 

1. Git là gì?
Git là gì? Hướng dẫn Git dành cho người mới bắt đầu
![](https://images.viblo.asia/0fee6ba3-9252-4839-9297-0c401c81ce68.gif)
- Git là một hệ thống kiểm soát phiên bản (version control system - VCS) dùng để theo dõi các thay đổi trong các tập tin và cách phối hợp sao cho nhiều người có thể cùng làm việc trên những tập tin đó. Git được sử dụng chính trong lĩnh vực phát triển phần mềm, nhưng Git cũng có thể được sử dụng để theo dõi các thay đổi trong bất kỳ tập tin nào. Git là hệ thống điều khiển phiên bản phân tán, có tốc độ xử lý khá nhanh, đảm bảo toàn vẹn dữ liệu và hỗ trợ khá hiệu quả cho các workflow phân tán, phi tuyến tính.
- Do Linus Torvalds xây dụng vào năm 2005, ban đầu Git chỉ được áp dụng trong quá trình phát triển Linux kernel nhưng đến nay, Git đã trở thành một trong các phần mềm quản lý mã nguồn phổ biến nhất.  
- Như hầu hết các hệ thống quản lý phiên bản phân tán khác, mọi thư mục Git trên mỗi máy tính đều là một kho chứa (repository) có lịch sử làm việc và khả năng theo dõi phiên bản đầy đủ, độc lập với mạng và máy chủ trung tâm (central server).
- Git có khả năng chạy trên nhiều hệ điều hành khác nhau như Linux, Windows, Mac OSX...
- Git là mã nguồn mở hoàn toàn miễn phí, đăng ký theo giấy phép GNU General Public License. 

2. Đặc điểm của Git:
Logo GitKhi vào trang web chính thức của Git, chúng ta sẽ thấy ngay các đặc điểm chính của Git như: fast-version-control (quản lý phiên bản nhanh), distributed-even-if-your-workflow-isnt (phân tán cho dù quy trình làm việc của bạn không cần đến), distributed-is-the-new-centralized (phân tán cũng là một cách tập trung mới), local-branching-on-the-cheap (phân nhánh local với chi phí thấp), everything-is-local (mọi công việc đều thực hiện local). Hay có thể nói Git có các đặc điểm chính sau:

- Branching & Merging 
Nói về Git là phải nói về mô hình phân nhánh của Git (branching model). Git cho phép và khuyến khích chúng ta nên có nhiều nhánh cục bộ có thể làm việc hoàn toàn độc lập với nhau. Và việc tạo mới, gộp lại hay xóa các kết quả trong quá trình phát triển chỉ mất vài giây.
Đáng chú ý là khi ta đưa vào một kho điều khiển từ xa (remote repository), ta không phải đưa vào tất cả các nhánh. Ta có thể chọn chỉ chia sẻ một, một vài hoặc tất cả trong số các nhánh đó. Điều này giúp cho mọi người cảm thấy thoải mái để tiếp tục thử nghiệm những ý tưởng mới mà không phải lo lắng về việc phải lập kế hoạch làm thế nào và khi nào họ sẽ gộp vào hoặc chia sẻ các nhánh cho người khác. Git làm cho quá trình này trở nên vô cùng dễ dàng. 
- Nhỏ gọn và nhanh chóng – Small & Fast
Hầu hết các hoạt động trên Git được thực hiện cục bộ, điều đó giúp Git có một lợi thế rất lớn về tốc độ xử lý, nhất là trên các hệ thống tập trung thường xuyên phải giao tiếp với một máy chủ ở đâu đó.
Git được xây dựng để làm việc trên Linux kernel, có nghĩa là Git có khả năng xử lý hiệu quả các kho lưu trữ (repository) lớn ngay từ giai đoạn đầu. Tốc độ và hiệu suất là mục tiêu thiết kế chính của Git.
- Phân tán - Distributed
Distributed: Một trong những tính năng hấp dẫn nhất của Distributed SCM mà Git có đó là phân tán. Điều này có nghĩa là thay vì thực hiện “checkout” source code hiện tại, ta có thể “clone” toàn bộ kho lưu trữ (repository).
Nhiều bản sao lưu (Multiple Backups): Điều này có nghĩa là ngay cả khi bạn đang sử dụng quy trình làm việc tập trung, mỗi người dùng đều có một bản sao lưu đầy đủ từ máy chủ. Bản sao này có thể được đẩy lên thay thế cho bản chính trên máy chủ trong trường hợp có sự cố xảy ra. Rõ ràng, nếu bạn có nhiều bản sao thì việc phục hồi sẽ an toàn và dễ thành công hơn rất nhiều. 
Workflow: Vì bản chất của Git là phân tán và có hệ thống nhánh tuyệt vời nên hầu như các quy trình công việc (workflow) nào cũng có thể được thực hiện tương đối dễ dàng trên Git. 
- Bảo đảm dữ liệu – Data Assurance
![](https://images.viblo.asia/d01781c3-ec73-48e5-9e43-a43896d5d47a.png)https://images.viblo.asia/d01781c3-ec73-48e5-9e43-a43896d5d47a.png

Mô hình dữ liệu mà Git sử dụng đảm bảo tính toàn vẹn cho từng bit của dự án. Nó có cơ chế để mỗi tập tin và việc hoàn tất được kiểm tra kỹ lưỡng. Không thể lấy bất cứ thứ gì ra khỏi Git ngoài các bit chính xác mà chúng ta đưa vào.
Chúng ta cũng không thể thay đổi tập tin, ngày tháng, thông điệp hoàn tất (commit message) hay bất cứ dữ liệu nào trong kho của Git mà không thay đổi ID của chúng sau đó. Điều này có nghĩa là nếu bạn có một commit ID, bạn có thể yên tâm là dự án của bạn chính xác như khi nó đã được commit. Trong khi đó hầu hết các hệ thống kiểm soát tập trung đều không mặc định cung cấp tính toàn vẹn như vậy.
-  Staging Area
Không giống như các hệ thống khác, Git có một vùng gọi là "staging area" hay "index". Đây là một khu vực trung gian nơi các giao dịch được định dạng và kiểm tra lại trước khi hoàn tất.
Git có thể nhanh chóng chạy các tập tin và hoàn tất chúng mà không cần phải hoàn tất tất cả các tập tin được sửa đổi trong thư mục làm việc hoặc phải liệt kê chúng trên command line trong quá trình thực hiện.

![](https://images.viblo.asia/f155ad4e-b637-4cda-a790-cb3cff987050.png)

Điều này cho phép ta chỉ thực hiện các phần của một tập tin được sửa đổi, cập nhật các thay đổi trong tập tin khi cần.    
Git cũng có thể không sử dụng tính năng này khi ta không muốn – chỉ cần thêm ‘-a’ vào lệnh commit để thêm tất cả thay đổi của tất cả các tập tin vào “staging area”.

![](https://images.viblo.asia/d7e2fec6-1922-4c2b-bc9a-9ee52fe32bac.png)
- Mã nguồn mở - miễn phí (Free & Open Source)
Git là một phần mềm mã nguồn mở miễn phí được phát hành theo giấy phép GNU General Public License version 2.0

3. Lý do nên dùng Git
Một số lý do cho thấy chúng ta nên dùng Git:
- Tiết kiệm thời gian: Như đã giới thiệu ở trên, Git thực hiện công việc với tốc độ rất nhanh, giúp chúng ta có thêm thời gian để thực hiện các công việc khác.
- Làm việc offline: Với Git, hầu hết mọi việc đều có thể thực hiện trên máy cục bộ: tạo một hoàn tác, xem lịch sử của dự án, tạo ra các nhánh hoặc gộp chúng lại… Git cho phép ta quyết định nơi nào và khi nào muốn làm việc.
- Khôi phục khi gặp lỗi: Khi gặp lỗi, ta có thể “undo” cho công việc đó, thậm chí có thể khôi phục những gì đã xóa thông qua Reflog, bởi vì Git hiếm khi thực hiện việc xóa vĩnh viễn một nội dung nào đó.
- Yên tâm: Với Git ta có thể hoàn toàn yên tâm là mỗi bản sao của ai đó trong nhóm có trên máy tính là một bản sao có thể sử dụng được. Ngoài ra, hầu hết mọi hành động trong Git chỉ là thêm dữ liệu (rất hiếm khi xóa).
- Tạo ra những hoàn tác (commit) hữu ích: Git giúp ta tránh khỏi sự lộn xộn nhờ tạo ra các hoàn tác chi tiết. Với khái niệm “staging area” duy nhất đã nói ở trên, ta có thể xác định chính xác những thay đổi sẽ được đưa vào trong các hoàn tác tiếp theo, dù chỉ là một dòng thay đổi.
- Làm việc theo cách của riêng mình: Khi làm việc với Git, ta có thể sử dụng workflow của riêng mình. Ta có thể kết nối với nhiều kho từ xa, phân nhánh thay vì gộp lại, và làm việc với các module con khi ta cần. Hoặc ta cũng có thể dễ dàng làm việc với một kho trung tâm từ xa. 
- Không trộn lẫn các công việc: chia các nhánh làm việc để dễ dàng theo dõi mọi thứ. Git là một công cụ sử dụng việc chia nhánh một cách nhanh chóng và dễ dàng.
- Cộng đồng người dùng lớn: Git được sử dụng bởi nhiều công ty lớn và các dự án mã nguồn mở như: Ruby On Rails, jQuery, Perl, Debian, Linux… Một cộng đồng lớn là một lợi thế của Git vì nó có rất nhiều tài liệu hướng dẫn, hỗ trợ sử dụng và các dịch vụ tiện ích.

4. Những ai đang dùng Git?
Hiện tại có rất nhiều công ty và dự án lớn đang sử dụng Git, ví dụ như: Google, Facebook, Microsoft, Twitter, Linkedin, NetFlix, PostGreSQL, Android, Linux, Eclipse, Gnome… 
Trong các công ty phần mềm hiện nay, Git cũng được sử dụng khá phổ biến để có thể dễ dàng quản lý phiên bản và giúp phối hợp hiệu quả các công việc trong dự án. 
Vậy thì còn chờ gì nữa, bạn hãy download và cài đặt Git trên máy tính của mình NGAY và LUÔN nhé.

Nguồn: http://csc.edu.vn/lap-trinh-va-csdl