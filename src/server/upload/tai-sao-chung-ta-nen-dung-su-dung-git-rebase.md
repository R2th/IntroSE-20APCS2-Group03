Sau một thời gian sử dụng Git, dần dần thì các câu lệnh nâng cao của Git được bạn sử dụng nhiều hơn, giống như một phần trong quy trình làm việc hàng ngày. Ngay sau khi tôi phát hiện ra `git rebase`, tôi đã nhanh chóng kết hợp nó vào quy trình làm việc hàng ngày của mình. Những người làm việc có kinh nghiệm, thì công cụ này khá là mạnh và thực sự hấp dẫn hay có thể nói là được ưu tiên sử dụng. Tuy nhiên, tôi mới phát hiện ra rằng `rebase` đưa ra một số thách thức cho những người bắt đầu sử dụng nó. Trước khi trình bày về chúng, tôi sẽ tóm tắt ngắn gọn sự khác biệt giữa `merging` và `rebasing`.

Trước tiên, chúng ta hãy xem xét ví dụ đơn giản: bạn muốn tích hợp một nhánh tính năng vào nhánh master. Bằng `merging`, chúng ta sẽ tạo ra 1 commit mới là `g` - thể hiện sự kết hợp của hai nhánh trên. Biểu đồ commit cho chúng ta thấy rõ những điều gì xảy ra.

![](https://images.viblo.asia/daf4b200-88bc-4994-8ee3-59a20de4223d.gif)

Ngoài ra, chúng ta cũng có thể rebase trước khi hợp nhất 2 nhánh vào với nhau. Các commit được loại bỏ và nhánh tính năng được đặt lại thành nhánh master, sau đó, các commit được áp dụng lại trên đầu feature. Sự khác biệt của các commit được áp dụng lại này thường giống với bản sao ban đầu, nhưng chúng có sự khác biệt với các commit cha, và do đó các key SHA-1 cũng khác nhau.

![](https://images.viblo.asia/b9702adf-fb8e-4184-bdf3-d74b3358d499.gif)

Bây giờ chúng ta đã thay đổi commit base của feature từ b thành c.  Hợp nhất feature vào nhánh master, tất cả các commit trên feature sẽ là những phần nối tiếp cho master.

![](https://images.viblo.asia/e0b63552-ed79-4e60-9bb9-8fcb112f63a4.gif)

So sánh với kết quả sau khi merge, kết quả thu được là một đường thẳng dài ( tuyến tính) không chứa các nhánh khác. Nhờ có nó, mà việc hiểu được lịch sử của các commit dễ dàng hơn, đó là lý do tôi thường thích rebase nhánh trước khi merge, và tôi hy vọng điều này cũng đúng với các bạn.

Tuy nhiên, phương pháp này có một số thách thức.

Hãy xem xét trường hợp một commit vẫn còn được sử dụng trên tính năng đã bị xóa trên master. Khi `feature` được rebase lại với nhánh master, commit đầu tiên được sử dụng lại sẽ phá vỡ bản build của bạn, nhưng miễn là không xảy ra conflict khi tiến hành `merge`, quá trình rebase sẽ tiếp tục mà không bị gián đoạn. Lỗi từ commit đầu tiên sẽ vẫn tồn tại trong tất cả các commit sau, kết quả dẫn đến một chuỗi commit bị lỗi.

Lỗi này chỉ được phát hiện sau khi quá trình rebase kết thúc và thường được sửa bằng cách áp dụng bằng 1 commit fix bug `g` trên đầu nhánh.

![](https://images.viblo.asia/20b58c5f-14f8-4ded-a864-5ebe2a0fa09c.gif)

Tuy nhiên, nếu bạn gặp conflicts trong quá trình rebase, Git sẽ tạm dừng các commit conflict, cho phép bạn khác phục conflict trước khi tiếp tục. Việc giải quyết xung đột ở giữa trong quá trình rebase chuỗi các commit thường gây nhầm lẫn khó có thể đúng và có thể sẽ phát sinh những đoạn code sẽ có những lỗi tiềm ẩn khác.

Giới thiệu lỗi là thêm vấn đề khi nó xảy ra trong quá trình rebase. Bằng cách này, các lỗi mới được đưa ra khi bạn viết lại lịch sử và chúng có thể là tấm lớp ngụy trang cho các lỗi đã diễn ra trong các commit đầu tiên. Đặc biệt, điều này sẽ khiến việc sử dụng Git bisect trở nên khó khăn hơn, đây được cho là công cụ gỡ lỗi mạnh nhất trong các tool của Git. Ví dụ, hãy cùng xem xét nhánh tính năng sau. Hãy cũng xem giới thiệu một lỗi tại cuối nhánh.

![](https://images.viblo.asia/9f8c5b9e-bbcf-4f60-95a0-c9ec69b630a4.png)

Bạn có thể không phát hiện ra lỗi này cho đến vài tuần sau khi nhánh được merged vào master. Để tìm ra commit gây phát sinh bug, bạn có thể phải tìm kiếm qua hàng chục và hàng trăm commit. Quá trình này có thể tự động hóa bằng cách viết một tập lệnh kiểm tra sự hiện diện của lỗi và tự động chạy nó thông qua Git bisect, sử dụng lệnh `git bisect run <yourtest.sh>`.

Bisect sẽ thực hiện tìm kiếm chia đôi trong lịch sử commit, xác định commit gây ra lỗi. Trong ví vụ hiển thị bên dưới, nó thành công trong việc tìm kiếm các kết bị lỗi đầu tiên, vì tất cả các cam kết bị hỏng đều chứa lỗi thực tế mà chúng ta đang tìm kiếm.

![](https://images.viblo.asia/f7a1aed0-e770-41b4-b360-f414639777dd.gif)

Mặt khác, nếu chúng tôi giới thiệu thêm các commit bị hỏng trong quá trình rebase (d và e), thì biscet sẽ gặp rắc rối. Trong TH này, chúng tôi hy vọng rằng Git xác định commit `f` là commit lỗi cần tìm, nhưng thay vào đó nó xác định nhầm thành commit `d`, vì nó có một số lỗi khác phá vỡ bài kiểm tra.

![](https://images.viblo.asia/17c9b8ba-d69a-4959-aca8-1652fab8dd7b.gif)

Vấn đề có lẽ bắt đầu phức tạp hơn lúc đầu rồi đó.

Tại sao tất cả chúng ta đều sử dụng Git? Bởi vì nó là công cụ quan trọng nhất,  dùng để theo dõi nguồn lỗi trong mã của chúng ta. Có thể nói Git là một mạng lưới an toàn. Bằng `rebasing`, chúng ta dành ưu tiên thấp hơn với mong muốn đạt được một lịch sử tuyến tính cho lịch sử commit.

Một thời gian trước, tôi đã phải chia hàng trăm commit để theo dõi một lỗi hệ thống của chúng tôi. Commit bị lỗi nằm ở giữa một chuỗi dài của các commit, không biên dịch được do việc `rebase` bị lỗi mà một đồng nghiệp đã thực hiện. Việc này là không cần thiết và hoàn toàn có thể tránh được nó, vì nó đã làm tôi phải mất thêm gần một ngày để theo dõi các commit.

Vậy làm thế nào để chúng ta có thể tránh được những chuỗi commit bị phá hỏng trong quá trình `rebase`? Một cách tiếp cận có thể cho là giúp kết thúc quá trính `rebase`, kiểm tra mã để xác định bất kỳ lỗi nào và quay lại lịch sử sửa các lỗi mà chúng ta đã thấy. Để kết thúc điều này, chúng ta có thể sử dụng `interactive rebasing` (rebase tương tác).

Một cách tiếp cận khác là tạm dừng Git trong mỗi bước của quy trình `rebase`, kiểm tra nếu có bất kỳ lỗi nào phát sinh và sửa chúng ngay lập tức trước khi tiếp tục.

Đây là một quá trình rườm rà và dễ bị lỗi, và lý do duy nhất để thực hiện nó là để đạt được lịch sử tuyến tính của commit. Có cách nào đơn giản và tốt hơn không?

Có; Git merge. Đó là một quy trình đơn giản, một bước, trong đó tất cả các conflict được giải quyết trong một commit duy nhất. Commit merge kết quả đánh dấu rõ ràng điểm tích hợp giữa các branch và lịch sử của chúng ta mô tả những gì thực sự đã xảy ra và thời điểm nó xảy ra.

Tầm quan trọng của việc giữ cho lịch sử commit của bạn đúng sự thật không nên được đánh giá thấp. Với `rebase`, bạn đang nói dối chính mình và nhóm của bạn. Bạn giả vờ rằng các commit đã được viết ngày hôm nay, nhưng thực sự chúng được viết vào ngày hôm qua, dựa trên một commit khác. Bạn đã đưa các commit ra khỏi bối cảnh ban đầu của họ, ngụy trang những gì đã xảy ra. Bạn có chắc chắn về đoạn code của mình? Bạn có thể chắc chắn rằng các thông điệp commit vẫn có ý nghĩa? Bạn có thể tin rằng bạn đang dọn dẹp và làm rõ lịch sử commit của mình, nhưng kết quả rất có thể ngược lại.

Nó không thể nói những lỗi và thách thức nào trong tương lai mà đoạn code của bạn mang lại. Tuy nhiên, bạn có thể chắc chắn rằng một lịch sử commit thực sự hữu ích hơn một lịch sử commit được viết lại.

Điều gì thúc đẩy mọi người `rebase branch`?

Đã đến lúc tôi đi đến kết luận rằng nó là một sự phù phiếm. Rebasing là một loại hoạt động hoàn toàn mang tính thẩm mỹ. Lịch sử rõ ràng hấp dẫn chúng ta với tư cách là nhà phát triển, nhưng nó không thể được chứng minh là đúng, từ quan điểm kỹ thuật cũng như chức năng.

![](https://images.viblo.asia/5aad6594-d109-459b-b7ad-3231d1a7e56a.png)

Biểu đồ về lịch sử phi tuyến tính, "train tracks", có thể sẽ rất đáng sợ. Họ chắc chắn cảm thấy như vậy giống như tôi, đặc biệt là những người mới bắt đầu, nhưng không có lý do gì để sợ chúng. Có nhiều công cụ tuyệt vời có thể phân tích và trực quan hóa lịch sử Git phức tạp, dựa trên cả GUI và CLI. Những biểu đồ này chứa thông tin có giá trị về những gì đã xảy ra và thời điểm nó xảy ra, chúng ta không đạt được gì bằng cách tuyến tính hóa nó.

Git được tạo ra và khuyến khích lịch sử phi tuyến tính. Nếu điều đó làm bạn thất vọng, bạn có thể sử dụng một VCS đơn giản hơn chỉ hỗ trợ lịch sử tuyến tính.

Tôi nghĩ bạn nên giữ cho lịch sử của bạn luôn đúng. Có được sự thoải mái với các công cụ để phân tích nó, và không rơi vào sự cám dỗ để viết lại nó. Phần thưởng cho việc viết lại là tối thiểu, nhưng rủi ro sẽ là rất lớn. Bạn sẽ cảm ơn tôi với lần xem lại tiếp theo về lịch sử của mình để theo dõi mội lỗi tiềm ẩn.

### Tài liệu tham khảo

https://vimeo.com/182068915

https://medium.com/@fredrikmorken/why-you-should-stop-using-git-rebase-5552bee4fed1