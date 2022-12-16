# Question 1: Synchronized trên Swift thì làm như thế nào? 
> Synchronized trên Swift thì làm như thế nào? Nếu dùng synchonized với nhiều luồng trong app thì app rất dễ bị “đơ”, vậy làm thế nào để tránh được điều đó?
> 
Answer: 
Trong Swift đã không còn sử dụng từ khóa “Synchronized” nữa. Để thực hiện đồng bộ giữa các thread thì bạn có thể sử dụng “mutex” hoặc “semaphore”. Trong đó, bạn có thể sử dụng “dispatch” để tạo “semaphore”. Tùy vào mục đích sử dụng mà có thể tạo thêm “queue” thực hiện tuần tự hoặc song song. Để tránh ứng dụng bị “đơ” như trường hợp kể trên thì khi các bạn code, tốt nhất nên tránh xảy ra trường hợp “deadlock” và thực hiện quá nhiều “logic” nặng ở “main thread”.

-----
# Question 2: Về RxJava2
> Em đang tìm hiểu RxJava2 và thấy đây là 1 thư viện rất hay, giúp việc xử lý code trở nên đơn giản hơn rất nhiều nhưng đồng thời nó cũng hơi khó hiểu cho người mới học như em. Các Professor X có thể so sánh Flowable và Observable khác nhau thế nào và được dùng trong những trường hợp nào không ạ?
> 
* Flowable mới chỉ xuất hiện trong Rx2 cùng với định nghĩa BackPressure. Flowable sinh ra để bù đắp lỗ hổng về max element/s mà Observable chưa đáp ứng được. Flowable thường được sử dụng trong những trường hợp số lượng element (ob.onNext) lớn và ngược lại với Observable.
* Observable thường được sử dụng khi có tương tác trực tiếp với giao diện trong khi Flowable thường được dùng hơn trong trường hợp kết thúc quá trình chỉ tương tác với database, network (Ví dụ: tải file dung lượng lớn thì hay sử dụng Flowable).

-----
# Question 3: Kiếm tra năng lực và đánh giá trình độ
> Làm thế nào để tự kiếm tra năng lực của mình và đánh giá trình độ năng lực ở level Fresher, Middle hay Senior?
> 
Answer:
Để kiểm tra năng lực có thể dùng 2 cách:
* Cách 1: truy cập một số trang học tập để thực hiện kiểm tra trình độ hoặc đơn giản nhất là truy cập trang web www.freelancer.com/‎. Tại đây, các bạn có thể kiểm tra xem mình trả lời các hỏi trong thời gian bao lâu và đạt được yêu cầu của bài test hay không. Freelancer là nơi để các bạn tìm việc làm thêm nên các bạn cần thể hiện được trình độ của mình một cách tốt nhất có thể.
* Cách 2: kiểm tra năng lực thông qua làm task trong dự án và có thể nhờ chính leader của mình nhận xét để biết mình ở trình độ nào.

-----
# Question 4: Kiếm tra năng lực và đánh giá trình độ
> Để có thể làm Team Leader 1 dự án cần học tập và trau dồi những kĩ năng và kiến thức gì?
> 
Answer:
Dưới góc độ công ty, các Group Leader và Manager sẽ đánh giá thành viên của mình để xét duyệt lên vị trí Team Leader. Một người đáp ứng được các yêu cầu của vị trí này cần có đủ kỹ năng quản lý và chuyên môn kỹ thuật. Người này cũng cần trải qua ít nhất từ 2 đến 3 dự án khác nhau và chứng minh được năng lực giải quyết vấn đề trong dự án, đưa ra giải pháp và tư vấn “ngược” cho phía khách hàng.

Team Leader không nhất thiết là người giỏi nhất về kỹ thuật chuyên môn nhưng có khả năng bao quát được dự án để đưa ra giải pháp và là người có thể định hướng cả team, có kỹ năng lãnh đạo.

Bên cạnh đó, điều quan trọng nhất của Team Leader chính là khả năng thúc đẩy tinh thần cho cả team, chí ít có thể giải quyết ổn thỏa xung đột nội bộ nếu có. Ví dụ trong một team, mỗi kỹ sư lại có phong cách code khác nhau và đôi khi xảy ra tranh cãi hay bất đồng quan điểm. Nhiệm vụ của Team Leader lúc này là xử lý sao cho đồng nhất quan điểm, hài hòa giữa các thành viên.

![](https://images.viblo.asia/e563b561-39e0-4cbd-bda9-39ae2584dc8e.jpg)
-----
# Question 5: Cross-platform cho Mobile App có thể thay thế cho Native không?  
> Hiện nay có rất nhiều Cross-platform cho Mobile App như React Native, Flutter, VueJS. Em muốn biết định hướng của công ty về những ngôn ngữ mới này? Những ngôn ngữ này có thể thay thế cho Native (Android, iOS) hay không?
> 
Answer: Bản thân Professor X cũng có cơ hội tham gia các dự án React Native tại công ty và phần lớn các dự án sử dụng Cross-platform đều do khách hàng yêu cầu. Từ đó, các Professor X đều nhận thấy những Cross-platform hiện tại chưa đủ “trình” để thay thế Native vì nhược điểm của chúng là chậm và độ xử lý còn “non” so với Native trong khi vẫn phải phụ thuộc vào Native.

Tuy nhiên, hiệu quả mà Cross-platform đem lại ở mức độ nào một phần phụ thuộc vào kỹ năng code của lập trình viên. Bởi vậy, các Cross-platform vẫn có tiềm năng trở thành xu thế công nghệ mới trong tương lai để các kỹ sư học tập, nghiên cứu và ứng dụng vào các dự án.

-----
# Question 6: Triển khai ứng dụng trên store
> Khi có ý tưởng để làm ứng dụng thì cần ưu tiên điều gì hay yếu tố gì để có thể triển khai trên Store?
> 
Answer: Để trả lời câu hỏi này, anh Ngô Đắc Du – iOS Dev đến từ Division 1 đã được mời chia sẻ. Theo đó, kinh nghiệm vui của anh chính là “cần $99 chi phí đưa App lên Store”. Về kỹ thuật, anh Du nhấn mạnh tầm quan trọng của việc viết module và chi tiết những thứ mình cần làm trong App để xây dựng cấu trúc của dự án. Thậm chí control trên màn hình cũng cần được sắp xếp một cách thông minh và hợp lý. Đồng thời, những thứ không nên bỏ qua chính là việc tìm hiểu về Apple Account để đẩy App lên Store đi kèm các reference, policy của Apple. Nếu muốn thêm thông tin chi tiết về những kinh nghiệm của anh Du, mời các bạn liên hệ trực tiếp với anh qua Chatwork nhé.

Các Professor X cũng cùng nhau thảo luận về vấn đề này rất sôi nổi. Ngoài kỹ thuật, đa số những người đưa App lên Store là vì mục tiêu kinh doanh. Mọi người đều nghĩ những yếu tố quyết định đến lợi nhuận nằm ở việc App có sở hữu ý tưởng tốt hay không và tính ứng dụng như thế nào đối với cuộc sống. Tuy nhiên, sự thật là tình hình kinh doanh còn phụ thuộc vào việc quảng cáo, chủ sở hữu App cần chú ý bổ sung quảng cáo một cách hợp lý, thêm analytics để theo dõi chức năng nào trong App hay màn hình nào được người dùng truy cập và yêu thích nhất.

Đối với những người mới bắt đầu làm App, nếu không đặt nặng vấn đề lợi nhuận thì hãy cứ làm App và tự đánh giá sản phẩm của mình dưới cái góc độ của khách hàng để cải thiện số lượng và tính tương tác từ người dùng.

Trên tất cả, dù các kỹ sư đẩy App lên Store với mục đích gì (kinh doanh hay thể hiện sản phẩm cá nhân) thì cũng cần có 1 kế hoạch đầy đủ, chi tiết, hiệu quả và chuyên nghiệp nhất có thể.

-----
# Question 7: Hiển thị dữ liệu trên Facebook, Amazon, Lazada
> Một số ứng dụng về mạng xã hội và thương mại điện tử như Facebook, Amazon, Lazada có những màn hình hiển thị lượng dữ liệu rất lớn với giao diện rất phức tạp. Vậy có những thủ thuật hoặc cách render view nào để các ứng dụng trên hiển thị dữ liệu mượt mà đến như vậy?
> 
Answer:
Theo nguồn Facebook chia sẻ, họ đã giải quyết các vấn đề cơ bản trong ViewHolder của ListAdapter để xử lý mượt mà phần hiển thị dữ liệu.
* CustomView và phân tách chúng riêng biệt thành từng phần, với mỗi phần có bindModel riêng (giảm việc xử lý trực tiếp cùng 1 lúc với ViewGroup);
* Tách biệt riêng Code Logic khỏi onBind, tạo riêng vòng đời cho việc update data, tái sử dụng view cao;
* Phân chia ViewHolder thành 2 kiểu: Đơn giản, hoặc đầy đủ, nhận biết sự tương tác người dùng để dùng kiểu nào cho phù hợp (Ví dụ: lướt qua chỉ sử dụng kiểu đơn giản);
* Ngoài ra Facebook đã tối ưu rất nhiều những việc khác: load dữ liệu, cache data,…