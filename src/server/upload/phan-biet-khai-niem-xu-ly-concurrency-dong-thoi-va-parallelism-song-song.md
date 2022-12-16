Hai khái niệm mà mình sắp giới thiệu dưới đây có vẻ khá thân thuộc với nhiều anh em developer. Bản thân mình code java nên cũng khá thân quen trong việc xử lý đa luồng (parallelism). Nhưng sau này, có một vài ngôn ngữ khác nổi lên như một hiện tượng, đơn cử như Go. Nó xử lý đa tác vụ theo một cách khác (concurrency) mà mình cảm thấy đáng để tìm hiểu, nó giúp mình có nhiều lựa chọn hơn khi giải quyết những bài toán có yêu cầu cao về performance trong xử lý đa tác vụ. Bài viết dưới đây mình sẽ trình bày sự khác nhau giữa hai khái niệm Concurrency và Paramllelism.

### 1. Concurrency là gì?
Xử lý concurrency (đồng thời) nghĩa là có khả năng giải quyết nhiều công việc một lúc, và những công việc đó ko nhất thiết phải xảy ra tại cùng một thời điểm. Nó được giải thích rõ ràng qua ví dụ sau:

`Một cậu bạn đang chạy bộ buổi sáng. Trong quá trình chạy bộ anh ta phát hiện mình đã quên chưa thắt dây giày, lúc này anh ta sẽ phải dừng công việc chạy bộ lại và bắt đầu công việc thắt lại dây rồi mới có thể tiếp tục chạy được.`

Đây là một ví dụ cơ bản về xử lý đồng thời. Cậu bạn trên có thể xử lý đồng thời cả hai việc chạy bộ và buộc dây giày, tức là cậu ta có thể xử lý nhiều công việc cùng một lúc :))

### 2. Parallelism là gì và nó khác Concurency thế nào?
Parallelism (song song) nghĩa là có khả năng xử lý nhiều công việc tại cùng một thời điểm. Nghe khá giống concurrency nhưng ko phải.
Quay lại với ví dụ cậu bạn chạy bộ lúc nãy. Giả sử cậu ta vừa chạy bộ và cũng vừa nghe nhạc. Trong trường hợp này, cậu ta có thể làm 2 công việc chạy bộ và nghe nhạc cùng một lúc. Tức là hai hành động này xảy ra song song với nhau.

### 3. Concurrency và Parallelism dựa trên quan điểm kỹ thuật
Đến đây, bạn đã hiểu xử lý song song và xử lý đồng thời diễn ra thế nào qua các ví dụ thực tế, bây giờ chúng ta sẽ trình bày nó dựa trên quan điểm kỹ thuật.

Giả dụ bạn đang phát triển một trình duyệt web. Một trình duyệt web có nhiều thành phần khác nhau. Hai trong số chúng là render nội dung hiển thị trên web và download file từ internet. Giả sử chúng ta tổ chức code của mỗi chức năng được thực thi độc lập. Nếu bạn chạy trình duyệt này trên một bộ xử lý đơn lõi (single core processor). Bộ xử lý có thể chuyển đổi qua lại (switch context) giữa 2 công việc download file và render content web. Trường hợp này được hiểu là bộ xử lý đang xử lý đồng thời (concurrency). Bản chất là các quy trình đồng thời bắt đầu ở các thời điểm khác nhau và chu kỳ thực hiện của chúng đan xen lẫn nhau. Nhưng do quá trình chuyển đổi diễn ra rất nhanh chóng nên ta hầu như ko nhận ra có độ trễ ở đây và cảm tưởng 2 công việc đang diễn ra cùng 1 lúc.

Tiếp theo, giả sử trình duyệt này chạy trên một bộ xử lý đa lõi (multi core processor). Trong trường hợp này 2 công việc download file và render nội dung web có thể diễn ra trên 2 lõi khác nhau. Ở đây chúng ta gọi là xử lý song song.

![](https://images.viblo.asia/11674335-71ad-43b0-9d5b-166b62be92ae.png)

Xử lý song song không phải lúc nào cũng có kết quả thực thi nhanh hơn. Điều này là do các thành phần chạy song song có thể sẽ phải giao tiếp với nhau.
Ví dụ: trong trường hợp trình duyệt trên, sau khi download file hoàn tất sẽ phải hiện lên một thông báo hoàn tất cho người dùng. Giao tiếp này xảy ra giữa 2 thành phần xử lý download và thành phần render thông báo hiển thị trên màn hình web. Chi phí cho tài nguyên này thấp hơn trong những hệ thống xử lý concurrency. Trong khi nếu các thành phần này chạy song song nhiều lõi, việc giao tiếp này sẽ tiêu tốn lượng tài nguyên lớn hơn.