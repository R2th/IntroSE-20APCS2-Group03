Chả là thời gian gần đây mình mới được giao một công việc mới ở dự án là review và merge code cho mọi người trong team, công việc mà thường chỉ dành cho leader hay một senior... nghe thì khá oai =)) nhưng lại chẳng dễ chút nào, và chỉ đến khi trực tiếp bắt tay vào làm, bạn mới hiểu để đọc hiểu được code của người khác, để comment hay refactor lại nó, không hề đơn giản, và đôi khi, việc comment sao cho họ vui vẻ sửa cũng là cả 1 nghệ thuật. Trong bài này mình sẽ chia sẻ 1 vài kinh nghiệm trong quãng thời gian làm reviewer của mình.

### Xây dựng quy trình, điều kiện cho team trước khi to review
Review code thường là một trong những phần khó khăn và mất thời gian nhất trong quá trình phát triển.

Sau khi đã code xong, mọi người có thể đã phải chờ nhiều ngày cho đến lúc code được review xong. Rồi sau đó khi lại bắt đầu quá trình comment, fix comment giữa người review và người được reivew, có khi tiêu tốn của bạn hàng tuần liền. Bạn mắc kẹt giữa những tính năng mới và những tính năng cũ cần được sửa lại.

Đó là lý do tại sao việc xây dựng một quy trình chi tiết để tránh mất thời gian cả 2 bên, phía dưới là 1 vài công việc anh em dev bên mình cần phải thực hiện trước khi to review.
* Đảm bảo rằng code chạy đúng logic theo spec (quan điểm của dev và QA phải giống nhau).
* Code phải chú thích đầy đủ.
* Chạy unit test (nếu có) và đảm bảo code chạy được với dữ liệu cũ (trường hợp maintain code hoặc làm change request).
* Tìm kiếm và test lại cẩn thận đoạn code mình sửa có sử dụng ở chỗ khác không (code base, common)
* Với những pull có migration cần chạy không có lỗi và rollback thành công, viết sql update cho dữ liệu cũ nếu cần thiết
* Tuân thủ các chuẩn code trong dự án (coding convention)
* Chọn 1 vài test case của QA để chạy thử nếu có
* Chú thích đầy đủ thông tin vào pull request như: gắn ticket, lý do vì sao sửa, sửa như thế nào, các màn hình ảnh hưởng,...
* Kiểm tra lại danh sách các file thay đổi, thêm mới, xoá... xem có đúng những nội dung mình mong muốn push lên hay không, nếu hoàn thành các mục phía trên thì sẽ tiến hành gửi thông báo để mọi người vào review

### Trách nhiệm của người được review
1. Đặt mình vào vị trí người review: tự hỏi "Liệu code thế này đã được chưa, tối ưu chưa hay chỉ dừng lại ở mức chạy được"
1. Tạo các pull request nhỏ: các pull request nhỏ là cách tốt nhất để tăng tốc độ review. Giữ cho các pull request đủ nhỏ để bạn có thể thực hiện vòng lặp review - fix comment nhanh chóng và chính xác. Nhìn chung, các thay đổi code nhỏ sẽ dễ test hơn và các reviewer có thể hiểu cấu trúc và logic hơn.
2. Tránh kí gửi: kí gửi các đoạn code không liên quan đến nội dung ticket vào pull sẽ khiến reviewer khó khăn trong việc đọc logic.
3. Tránh thay đổi trong khi review code: các thay đổi lớn trong quá trình review code về cơ bản sẽ khiến quá trình review phải review lại từ đầu. Nếu bạn cần thực hiện các thay đổi lớn sau khi submit review, bạn có thể sẽ phải đưa review hiện có và cùng với các thay đổi bổ sung. Nếu bạn muốn tạo các thay đổi lớn sau khi bắt đầu quá trình review code, hãy đảm bảo đã trao đổi với reviewer về vấn đề này càng sớm càng tốt.
4. Phản hồi tất cả các comment của reviewer: kể cả khi bạn không thực hiện comment của họ, hãy phản hồi và giải thích lý do. Nếu có gì đó bạn không hiểu, hãy đưa ra các câu hỏi.
5. Review code là những cuộc thảo luận, không phải sự sai khiến - bạn có thể nghĩ hầu hết comment như một đề xuất hơn là một yêu cầu. Việc không đồng ý với comment của reviewer cũng không phải là vấn đề, nhưng bạn cần giải thích lý do và cho họ một cơ hội để phản hồi.

### Reviewer
1. Thấu hiểu đồng đội: Thấu hiểu người mà đã dành thời gian để viết những đoạn code mà bạn sẽ review. Họ cũng muốn những đoạn code này trở nên hoàn thiện. Đồng nghiệp của bạn đã làm hết sức mình và không ai muốn đưa ra những đoạn code tệ hại cả.
2. Mỗi Pull Request đều có điểm khúc mắc trong giao tiếp. Cố gắng hiểu và thông cảm với đồng đội của bạn và cùng nhau cải thiện những dòng code. Thay vì nói `Bạn viết hàm này khó hiểu quá` hãy dùng `Hàm này làm cho tôi hơi khó hiểu một chút. Liệu chúng ta có thể tìm được một tên biến phù hợp hơn được không ?`
3. Đọc yêu cầu trong ticket, đảm bảo hiểu hết code
4. Chia bình luận làm 3 loại: Bắt buộc, không bắt buộc và tích cực, gắn link document framework nếu bạn muốn tác giả hiểu rõ hơn về tác dụng của đoạn code
5. Tránh comment với cùng một nội dung: thay vì lặp lại cmt với 1 lỗi trên nhiều dòng bạn chỉ cần cmt 1 chỗ và note lại sửa các phần khác tương tự

## Các tip giúp tăng năng suất review
### Tìm kiếm file nhanh trong Repository
Đây là 1 trong những phím tắt mà mình thấy hay và tiện lợi nhất trên Github. Nó có thể giúp ta tìm kiếm bất kì file nào trong Repository 1 cách nhanh chóng.

Đầu tiên bạn mở 1 Repository nào đó. Sau đó ấn phím “t” nó sẽ đi đến màn hình tìm kiếm. Ở màn hình này bạn chỉ cần nhập tên file muốn tìm kiếm vào là được.

![](https://images.viblo.asia/a32df970-033f-4216-82b1-42e457df75e5.gif)

### Suggest thay đổi code trong Pull Request
Khi chúng ta comment vào 1 phần code nào đó trong Pull Request. Chúng ta có thể đề xuất thay thế code bằng việc sử dụng tính năng ”Suggested Changes”. Người tạo Pull Request có thể apply trực tiếp phần đề xuất thay đổi code của bạn mà không cần phải dời Github.

Để tạo ra 1 lời đề xuất thì chỉ cần bao quanh đoạn code của bạn bằng thẻ Markdown, với thẻ tag là **suggestion**.

![](https://images.viblo.asia/1d2075ad-fc75-4c27-a786-41669ae78871.gif)

Bây giờ người tạo Pull Request có thể thay đổi file trực tiếp trên Github mà không nhất thiết phải thay đổi bằng tay.

![](https://images.viblo.asia/ea3b0fb8-58c2-4b5f-a0f0-920ba597f7a3.gif)

### Hiển thị Github như trong IDE
Với những người nào quen dùng IDE đều thấy nó tổ chức thư mục theo dạng hình cây (sidebar tree).

Trên Github cũng có thể làm như thế được, nhưng các bạn cần phải cài 1 extension trên Chrome là [Octotree extension](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc)

![](https://images.viblo.asia/91bd3e23-75c9-4056-bda8-12ee36277275.gif)

### Nhẩy đến function khi đang review code
Ai đã từng review code rồi cũng đều biết, khi review 1 đoạn code nào đó. Thì việc xem các function liên quan đến đoạn code đó là điều hoàn toàn không thể tránh khỏi.

Bình thường chắc mọi người sẽ mở ra 1 tab mới trên trình duyệt rồi xem function muốn xem. Cách này cũng được nhưng khá mất thời gian. Có 1 cách nhanh hơn giúp các bạn có thể xem được function liên quan bằng cách ấn phím “t”. Khi đó sẽ hiển thị ra 1 cái dropdown và bạn chọn function muốn xem là được.

![](https://images.viblo.asia/e18e16a4-b991-41a8-b6b6-28470803100f.gif)

### Tạo permalink cho 1 file
Nội dung hoặc đường dẫn đến 1 file trong Github có thể bị thay đổi. Ví du như hôm nay dùng file này. Nhưng đến ngày mai file đó có thể không dùng và bị xoá đi. Vậy làm thế nào có thể share đường dẫn của 1 file đến cho người khác mà không sợ đường dẫn đó bị thay đổi.

Trong Github có thể giúp bạn làm điều này 1 cách rất đơn giản. Đầu tiên bạn mở file đó trên Github.

Ví dụ file của mình có đường dẫn như sau:

https://github.com/nooptr/docker-rails-mysql/blob/master/Dockerfile

Sau đó các bạn ấn phím “y” nó sẽ tự động biến cái đường dẫn trên thành đường dẫn kiểu như này:

https://github.com/nooptr/docker-rails-mysql/blob/34bd44a48b0b66519fcbdfa2165d115a379db84a/Dockerfile

Và đây chính là đường dẫn static và không bị thay đổi. Kể cả file kia của bạn có bị xoá đi chăng nữa.

Thực chất làm được điều này là do cái `34bd44a48b0b66519fcbdfa2165d115a379db84a` chính là mã commit của file lúc đó mà thôi. Nên bạn có xoá file đi thì commit cũ vẫn còn lại nên đương nhiên là vẫn xem được rồi.

### Xem lịch sử thay đổi của 1 file
Nếu bạn muốn xem lịch sử thay đổi của 1 file trên Github bạn có thể làm bằng cách ấn phím “b”. Khi đó nó sẽ hiển thị xem ai đã thay đổi dòng nào trong file vào thời gian nào. Cái này không khác gì git blame cả. Nhưng xem trên giao diện mình thấy nó dễ nhìn hơn nhiều.

![](https://images.viblo.asia/76c814a4-2614-4332-9a04-38ac58372905.gif)

### Powerful code search
Github đánh chỉ mục hầu hết các đoạn code và cung cấp chức năng tìm kiếm mạnh mẽ trên nó. Nếu bạn muốn tìm kiếm 1 đoạn text nào đó trên Github, bạn chỉ cần ấn nút ”/” và nhập từ muốn tìm kiếm là được.

![](https://images.viblo.asia/1498a7bd-1a91-4831-93f0-f591b666ad98.gif)

### Dùng lại reply đã lưu
Nếu bạn muốn comment bằng comment mấy ngày trước đó để tiết kiệm thời gian, đỡ phải gõ. Thì Github cũng cung cấp cho bạn tính năng lưu lại comment trước đó bằng cách tạo 1 saved replies. Lần tới khi muốn dùng lại comment trước đó thì bạn chỉ cần chọn từ dropdown là được.

![](https://images.viblo.asia/5d458d8c-7955-41f0-b4fe-ce66d1a2889d.gif)

## Tài liệu tham khảo
* https://kellysutton.com/2018/10/08/8-tips-for-great-code-reviews.html
* https://medium.com/free-code-camp/code-review-the-ultimate-guide-aa45c358bbf5