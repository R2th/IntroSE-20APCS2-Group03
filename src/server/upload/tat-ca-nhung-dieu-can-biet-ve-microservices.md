![image.png](https://images.viblo.asia/fef4ba6d-8cd5-4115-bdeb-8f01799fe8f3.png)

Ở nhiều nơi, các tổ chức đang áp dụng kiến ​​trúc microservices và đầu tư rất nhiều tiền vào việc chuyển đổi các monolith củ kĩ thành các dịch vụ mới mẻ như microservices.

Một số người nói rằng đó chỉ là xu hướng thôi. Không phải tất cả các monolith đều cần trở thành microservices. Cho dù đó là một xu hướng thì tôi cũng chả phàn nàn gì. Xu hướng xuất hiện và biến mất trong thế giới phần mềm về cơ bản giúp tôi học được nhiều thứ hơn.

Và đây là một điều thú vị, vì vậy chúng ta hãy phân tích một chút nhé?
Khi tôi nghĩ về microservices, tôi  lại nghĩ đến con người.

Microservices là một cách để giữ cho domain knowledge (kiến thức chuyên ngành) và các business rules (quy tắc nghiệp vụ) ở cùng một nơi. Bằng cách này, mỗi service (hoặc người) có một task mà họ biết cách làm tốt nhất thay vì dùng một service (hoặc người) biết tất cả mọi thứ. Đây là cách tiếp cận theo chiều sâu để xây dựng hệ thống.

Điều gì đó nổi bật với tôi là sự tập trung đáng kinh ngạc vào việc phân tách boundaries (ranh giới). Boundaries này phải xuất phát từ business domain. Ví dụ: nếu bạn có một phần nhỏ logic từ Dịch vụ A sẽ được thực hiện trong Dịch vụ B, bạn không thể sao chép mã đó trong Dịch vụ B! Bạn phải hỏi Dịch vụ A, nhận câu trả lời, và sau đó tiếp tục.

Vì vậy, bằng cách giữ business domain ở một nơi, chúng tôi đã đơn giản hóa việc duy trì các rules và knowledge trong ứng dụng. Nhưng cuối cùng chúng tôi đã làm cho ứng dụng trở nên phức tạp hơn một chút. Như chúng ta thường nói, được cái này thì sẽ mất cái khác.

Điều này làm cho microservices phát triển tuyệt vời với tổ chức mà họ đang làm việc. Khi hoạt động kinh doanh thay đổi, điều tương tự cũng phải phản ánh trong các dịch vụ nhỏ hỗ trợ nó.

Bây giờ có vẻ là thời điểm thích hợp để tìm ra định nghĩa.
Microservices - còn được gọi là kiến ​​trúc microservice - là một kiểu kiến ​​trúc cấu trúc một ứng dụng thành tập hợp các dịch vụ:

* Có thể bảo trì và dễ test
* Giảm lệ thuộc hay còn gọi là lệ thuộc thấp
* Có thể triển khai độc lập
* Được tổ chức quanh quanh khả năng phục vụ cho business
* Thuộc sở hữu của một team nhỏ

Hãy cùng tìm hiểu cụ thể một chút nữa.

Xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/tat-ca-ve-microservice/).

## Tại sao nó tốt hơn?

### Tập trung vào SOC

Tôi đã tìm hiểu về những mối quan tâm đang được phân tách bằng cách sử dụng microservices. Separation of concerns (SOC) (phân tách tính năng hay mối quan tâm) là trọng tâm của kiến ​​trúc này. Mọi quyết định về các cải tiến về sau sẽ xuất phát từ cách xác định mối quan tâm của bạn trong ứng dụng.

Kiến thức trừu tượng về một chức năng / mối quan tâm cụ thể từ người dùng của một microservice làm cho nó trở nên phù hợp. Cho đến khi contract (cách dịch vụ tương tác với thế giới bên ngoài) thay đổi, bất kỳ thay đổi nào bên trong dịch vụ đều có tính độc lập cao. Điều này về lý thuyết đảm bảo rằng bất kỳ thay đổi nào được thực hiện bên trong dịch vụ là độc lập.

Đây là một tin tốt cho các nhà phát triển đang làm việc trên ứng dụng, vì nó có nghĩa là kiểm tra tích hợp hạn chế là đủ. Yay!

### Triển khai nhanh hơn

Vì chính sự thay đổi trong hoạt động kinh doanh gây ra sự thay đổi trong ứng dụng, nên việc đặt nó trong các nơi riêng biệt đảm bảo cần có những thay đổi tối thiểu để đạt được kết quả.

Mỗi dịch vụ được quản lý độc lập bởi một nhóm các nhà phát triển (hoặc chỉ một hoặc hai nhà phát triển), do đó, việc triển khai nhanh hơn.

Điều này có thể làm giảm thời gian cho các chu kỳ phát triển để ứng dụng có thể sớm được phát hành.

### Phi tập trung ⇒ khả năng phục hồi và hiệu suất

Vì chúng ta đã nắm bắt được điểm phân tách, hãy tận hưởng lợi ích mà nó mang lại cho các nhà phát triển.

Các nhà công nghệ không còn bị giới hạn bởi công cụ mà toàn bộ ứng dụng sử dụng. Các nhà phát triển có nhiều quyền tự do lựa chọn công cụ phù hợp cho công việc hơn là bị ràng buộc bởi những gì đang được sử dụng trong toàn bộ ứng dụng. Điều này phản ánh từ các lược đồ cơ sở dữ liệu bạn sử dụng đến thi công thực tế. Mọi thứ đều tách biệt.

Từ ngôn ngữ lập trình, framework, các dịch vụ phụ trợ, mọi thứ đều có thể được tối ưu hóa ở mức độ tối đa mà không ảnh hưởng đến chức năng. Đây là ý nghĩa của việc chỉ làm một việc và làm tốt công việc đó!

Một sức mạnh khác của microservices là các thay đổi có thể được thực hiện ở một nơi duy nhất. Quy tắc vàng, như đã đề cập trong cuốn sách của [Sam Newman](https://samnewman.io/books/building_microservices/) về cùng chủ đề:

> “Can you make a change to a service and deploy it by itself without changing anything else?”

Tạm dịch: “Liệu bạn có thể thực hiện thay đổi đối với một dịch vụ và tự triển khai dịch vụ đó mà không cần thay đổi gì không?”

### Dễ dàng gỡ lỗi và kiểm tra các thay đổi

Chúng ta sẽ xoay quanh các boundaries (ranh giới) và separation (sự phân tách) một chút. Bạn sẽ cảm nhận được nó ngay bây giờ. Chúng ta luôn muốn có boundaries chặt chẽ và được xác định rõ ràng.

Nhưng, làm thế nào để bạn thực thi các ranh giới trong code? Bạn viết các trường hợp kiểm thử sẽ bị phá vỡ ngay sau khi một thay đổi vi phạm ranh giới. Điều này có nghĩa là bạn cần một bộ thử nghiệm tự động, kín và được cập nhật liên tục. Điều này sẽ làm cho microservice của bạn cực kỳ linh hoạt và các thay đổi của bạn đáng tin cậy.

Các phần này cũng phải được tài liệu hoá tốt, có thể là dùng code và bằng cách khác để các nhà phát triển mới biết rằng họ cũng phải thực thi nó.

### Scale-up and down theo nhu cầu

Các nhà phát triển mong đợi việc sử dụng sẽ tăng theo thời gian và thiết kế với suy nghĩ đó nên thường thiết kế các sản phẩm tốt hơn. Cách tốt nhất để mở rộng quy mô trong hệ thống phân tách là scale theo chiều ngang.

Việc có các dịch vụ nhỏ, được thiết kế tốt sẽ giúp đạt được kết quả này. Hàm X có tăng lượng truy cập? Chỉ cần thêm các phiên bản khác để xử lý tải. Scale down trở lại khi tải thấp trở lại bình thường. Đây là ma thuật hay gì vậy?

## Những sai lầm to lớn

Tất cả những điểm trên có lẽ đều rất tốt, ít nhất là về mặt lý thuyết.

Nhưng hành trình đến với microservices là một chặng đường dài và gian khổ, đầy rẫy những rào cản và cạm bẫy tiềm ẩn. Điều này có thể gây ra nhiều rắc rối hơn mức đáng có nếu các nhà phát triển không cẩn thận.

### Không được thiết kế để giải quyết sự cố

Điều gì xảy ra khi chúng ta gặp sự cố dịch vụ? Hoặc một server bị lỗi (down)? Hay trung tâm dữ liệu bị sập?

Nếu tất cả các dịch vụ phụ thuộc cũng dừng hoạt động cùng với nó, toàn bộ hệ thống có thể sụp đổ trong vài giây. Điều này không chỉ có nghĩa là thời gian ngừng hoạt động (down-time) đáng kể cho người dùng của bạn mà còn là ảnh hưởng tới  danh tiếng cho tổ chức của bạn.

Hầu hết các vấn đề như thế này có thể được giảm thiểu bằng cách quản lý nhóm luồng (thread pool) thích hợp, cân bằng tải và xử lý lỗi. Mặc dù các kỹ thuật của mỗi kịch bản như vậy sẽ khác nhau, nhưng điều quan trọng là phải thiết kế với câu thần chú: “Thất bại là không thể tránh khỏi”.

Sự cố là khó tránh khỏi. Nhưng một thiết kế có lưu ý sự cố sẽ đảm bảo không chỉ ngăn không cho một dịch vụ bị lỗi sẽ làm mọi thứ khác bị ảnh hưởng, mà còn hoạt động bình thường. Một ví dụ về điều này sẽ là nếu Tìm kiếm không hoạt động trên Netflix, thì phim trên màn hình vẫn có thể xem được.

### API contract không chặt chẽ

Các API contracts hoặc ranh giới API là trung tâm của mô hình kiến ​​trúc này. Nếu ranh giới này bị xói mòn theo thời gian hoặc không được thực thi ngay từ đầu, thì sẽ không có gì tốt đẹp có thể thoát ra khỏi nó.

Việc giao tiếp nội bộ của một microservice không được ảnh hưởng đến khách hàng bên ngoài. Những sự cố như vậy rất khó phát hiện nếu chúng không được bảo vệ đúng cách trong quá trình kiểm tra tự động.

Một loại contract tệ nữa là một loại [contract bị xói mòn theo thời gian](https://www.cio.com/article/3179469/why-adopting-microservices-is-easy-in-theory-but-not-reality.html#tk.cio_rs). Ban đầu, bạn có thể có một contract được lựa chọn tốt, được lập thành văn bản áp dụng cho tất cả các hệ thống bên dưới (downstream system) mà nó phục vụ như nhau. Do đó, contract dễ duy trì → 1: N ⇒ O (N).

Nhưng theo thời gian, khi ứng dụng phát triển, hệ thống bên dưới yêu cầu một tính năng đặc biệt vào dịch vụ. Bạn kết thúc và tùy chỉnh constract cho các hệ thống bên dưới khác nhau theo thời gian. Contract trở thành → N: N ⇒ O (N²)

Do đó, về lý thuyết, một contract có hiệu lực chặt chẽ mà dễ đạt được, thì tổ chức dễ dàng tự động hoá các vai trò thiết yếu trong cách ứng dụng vận hành trong hệ thống.

### Monitoring và văn hóa DevOps

Để có được đầy đủ lợi ích của một kiến ​​trúc microservices, bạn cần phải giám sát có kỷ luật (monitoring). Người ta làm qua loa điều này. Văn hóa xung quanh việc giám sát phải mang tính chủ động hơn là phản ứng. Các vấn đề phải được phát hiện ngay khi chúng xảy ra, không phải khi người dùng báo cáo chúng.

Cùng với việc giám sát, một quy trình triển khai mạnh mẽ giúp cập nhật, tích hợp và phát hành các tính năng nhanh chóng và dễ dàng. Việc chậm triển khai và kéo dài chu kỳ phát hành không bao giờ nên là lý do tại sao chúng tôi làm tắc nghẽn các dịch vụ nhỏ hiện có của mình bằng các tính năng không thuộc về nó. Nếu việc đưa ra các dịch vụ mới khi cần thiết là một vấn đề lớn mà các nhà phát triển không muốn làm, thì kiến ​​trúc sẽ sụp đổ theo thời gian.

## Kết

Microservices luôn tồn tại và chúng đang được ngày càng nhiều tổ chức trên thế giới áp dụng. Những gì 
nó yêu cầu không chỉ là các phương pháp phát triển hàng đầu, mà còn là kỷ luật và sự cam kết. Việc duy trì các dịch vụ này là chìa khóa để chúng duy trì hoạt động và hữu ích trong một thời gian rất dài. Vì vậy, nó không chỉ là một mô hình triển khai công nghệ, nó sẽ xác định cách các nhóm phát triển và điều hành hoạt động trong một tổ chức.

Bài viết được dịch từ [đây](https://betterprogramming.pub/what-are-microservices-all-about-578b563edaef).