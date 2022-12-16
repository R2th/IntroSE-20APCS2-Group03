**Thành kiến nhận thức trong kiểm thử phần mềm: Bạn đã từng bị ảnh hưởng bởi thành kiến nhận thức chưa?**

Thế giới kiểm thử đang chuyển động với tốc độ rất nhanh với sự tiến bộ của công nghệ để đảm bảo "chất lượng ở tốc độ ánh sáng".

"Tích hợp liên tục, Biến đổi số, tự động hóa chu trình, thay đổi chất lượng sang trái để giảm thiểu chi phí" vv... là một vài thuật ngữ đang được sử dụng nhiều hiện nay. Trong khi nói về các điều này, sẽ có câu hỏi cơ bản vẫn tiếp tục được nhắc đến và không có lời giải đáp như:- "Tại sao và như thế nào mà bị sót bug"


![](https://images.viblo.asia/f74cbf9f-a30b-44de-9387-03d58ea2a672.jpg)

Và vào thời điểm đó cảm tưởng như thể hầu như các lỗi hiển nhiên đều được bỏ qua.

**Nhưng tại sao lại vậy?**

Mặc dù tất cả chúng ta đều có thể nghĩ rằng chúng ta rất logic, cấu trúc và lý trí, nhưng thực tế đáng buồn rằng tất cả chúng ta đang bị ảnh hưởng bởi định kiến nhận thức cái mà ảnh hưởng tới toàn bộ quá trình suy nghĩ của chúng ta trong cuộc sống hàng ngày bao gồm công việc chuyên môn.

### Thành kiến nhận thức - Một mô tả ngắn gọn

- Theo như định nghĩa của Wikipeida - "Thành kiến nhận thức là một sai sót có tính hệ thống trong nhận thức một người do ở trong môi trường nhất định. Việc xây dựng xã hội thực tế của một cá nhân, không phải là đầu vào khách quan, cái mà  có thể quyết định hành vi của họ trong thế giới xã hội. Do đó, các thành kiến nhận thức đôi khi có thể dẫn đến méo cảm nhận, phán đoán không chính xác, giải thích không logic, hoặc phi lý. "
-Được rồi ... Đó là một định nghĩa tốt ... Nhưng nó tác động như thế nào đến suy nghĩ và ý nghĩa của nó đối với những kiểm thử viên trong thế giới kiểm thử?

- Khi kiểm thử viên tiếp cận bất kỳ kiểm thử nào, họ đã bị ảnh hưởng bởi những thành kiến riêng của họ - khung suy nghĩ và những đánh giá dựa trên những gì họ tìm kiếm, nơi mà những lỗi tiềm ẩn có thể xảy ra, ai là người lập trình, toàn bộ lịch sử của chương trình vv... và danh sách tiếp tục.

Chúng ta rất cần thiết phải biết về các loại thành kiến khác nhau để có thể nhận thức rõ hơn và thực sự nghĩ đến việc quản lý chúng một cách hiệu quả.

### Các loại thành kiến nhận thức trong kiểm thử phần mềm

có rất nhiều thành kiến nhận thức khác nhau mà chúng ta cần phải tìm trong chính mình và một số người trong chúng được giải thích dưới đây chi tiết.

![](https://images.viblo.asia/60e620fa-5cff-47af-9186-9778b265aaed.png)

**#1) Thành kiến giống nhau**

Rất dễ dàng cho con người để đánh giá một tình huống dựa trên sự giống nhau của một tình huống tương tự.
Ví dụ, khi là một kiểm thử viên, chúng ta thường có xu hướng nghĩ rằng các ứng dụng web sẽ có loại lỗi tương tự nhau trong khi các ứng dụng client-server sẽ có một tập hợp các lỗi tương tự.

Chúng tôi, khi là kiểm thử viên, tự nhiên sẽ được tìm kiếm những lỗi tương tự tùy thuộc vào bản chất của dự án. Thật không may, vì bản chất này, vào các thời điểm kiểm thử viên có xu hướng bỏ lỡ những lỗi hiển nhiên nhất chỉ vì tâm trí của họ đã không cho phép họ nghĩ ra.
 
**#2)Thành kiến đồng dư**

Đây là hành vi mà tâm trí của chúng ta từ chối suy nghĩ cho các lựa chọn thay thế.
Nó có nghĩa là, các kiểm thử viên chỉ có xu hướng để xác nhận hành vi dự kiến và kết quả là các xác nhận tiêu cực được bỏ qua.

Khi các trường hợp kiểm thử (test case) đang được viết, chúng ta có xu hướng bao phủ hết các yêu cầu mong muốn của khách hàn và bỏ qua các luồng tiêu cực bởi vì không phải tất cả các luồng tiêu cực đều được đề cập cụ thể trong các yêu cầu.

Chúng là các yêu cầu tiềm ẩn và trên thực tế là chúng ta cũng không thể cung cấp tất cả các hành vi của người dùng.

**#3) Thành kiến xác nhận**

“Thành kiến xác nhận” là mẹ của tất cả quan niệm sai lệch. Đó là xu hướng diễn dịch thông tin mới sao cho thông tin ấy trở nên hợp lệ với các lý thuyết, niềm tin (conviction) và tín ngưỡng (belief) có sẵn. Nói cách khác, chúng ta lọc bỏ bất cứ thông tin mới nào mâu thuẫn với quan điểm hiện có của mình. (“chứng cớ phản bác”). Đây là một thực tế nguy hiểm
Thông thường, trong thế giới kiểm thử, chắc chắn rằng chúng ta sẽ có những tình huống mà chúng ta nghĩ rằng một trong những đoạn code của một lập trình viên cụ thể sẽ có nhiều lỗi  hơn khi so sánh với những người khác và do đó chúng ta đã có thể dành rất thời gian để test module của họ.

Trong khi đang chịu ảnh hưởng của những niềm tin này bạn sẽ có xu hướng tăng nguy cơ bị sót các lỗi trong các mô-đun được phát triển bởi những người khác.

![](https://images.viblo.asia/fae7ed0d-0533-4db5-99eb-8bf29ed8d1c9.jpg)

**#4) Hiệu ứng BANDWAGON (Hiệu ứng hùa theo)**

Hiệu ứng bandwagon khẳng định hành vi hoặc niềm tin lan truyền giữa mọi người.

Xác suất một người tin theo một niềm tin tăng lên dựa vào số lượng người tin vào niềm tin đó. Đây là một hình thức mạnh mẽ của tư duy tập thể (groupthink). Điều này xảy ra nhiều lần trong cuộc sống hàng ngày của chúng ta.

Một ví dụ phổ biến nhất là khi chúng tôi mua một số sản phẩm. Thay vì chúng ta độc lập lựa chọn một sản phẩm, chúng ta thường đi với niềm tin của người khác.

Hhành vi tương tự cũng được hiển thị trong thế giới kiểm thử. Trong nhóm của chúng tôi, nếu một số người cảm thấy rằng một mô-đun cụ thể là lỗi không mất tiền, chúng tôi vô tình có xu hướng tin tưởng tương tự và trọng tâm chúng tôi cung cấp cho mô-đun đó trong quá trình xác thực sẽ bị giảm đáng kể.

![](https://images.viblo.asia/419b2bb2-65d9-4f19-9b6a-1dcc00880a4a.jpg)

**#5) Điểm mù trong nhận thức**

Đây là một hành vi trong khi kiểm thử, chúng ta có xu hướng bỏ lỡ những lỗi rõ ràng nhất khi chúng ta không tìm kiếm nó.

Hãy tưởng tượng một tình huống, ở đó, bạn yêu cầu một nhóm người đếm số lượng người đến với một chiếc váy màu đặc biệt, bạn có thể quan sát thấy mọi người sẽ rất hăng say trong việc đếm nó và họ nhớ nhìn thấy bất kỳ điều quan trọng hoặc quan trọng nào khác xung quanh họ .

Để liên kết điều này với thế giới kiểm thử, trong một dự án nâng cao, một trong những màn hình được phát triển mới thì đó là xu hướng tự nhiên của những kiểm thử viên để tập trung vào việc phát triển màn hình mới hơn và bỏ lỡ những tích hợp quan trọng khác.

**#6) Thành kiến tiêu cực**

Xu hướng chú trọng những trải nghiệm tiêu cực hơn là những trải nghiệm tích cực. Người có thành kiến này cảm thấy “cái xấu mạnh hơn cái tốt” và sẽ nhìn thấy những mối đe dọa nhiều hơn cơ hội trong một tình huống nhất định.

Trường hợp nào đi vào thế giới kiểm thử? Rất khó để thuyết phục những kiểm thử viên cung cấp dấu hiệu để tạo ra sản phẩm khi mà sự tập trung của họ chỉ dựa trên những lỗi mà họ đã phát hiện ra.

Không có thời gian khi họ có thể xác nhận rằng hoàn toàn không có lỗi trong sản phẩm. Đây là một trong những lý do chính mà quyết định Go-Live cho một sản phẩm phụ thuộc vào Sản phẩm hoặc người quản lý kinh doanh mặc dù các khuyến nghị sẽ được trích dẫn bởi các test manager.

![](https://images.viblo.asia/68e2fa3f-8b8c-44dd-b14f-f1c3bb8ead6c.png)

### Phần kết luận

Hy vọng bạn sẽ có một ý tưởng tốt hơn về thành kiến nhận thức trong kiểm thử phần mềm, ảnh hưởng của nó, và những gì có thể được thực hiện để loại bỏ ảnh hưởng này.
Và một thực tế quan trọng để nhận ra là chúng ta mù quáng đối với những thành kiến riêng của chúng ta trong khi chúng ta có thể xác định những thành kiến của người khác (điều này tự nó là một sự thành kiến nhận thức điểm mù). Tuy nhiên, chúng ta có thể ý thức hơn và đến một mức độ lớn, chúng ta có thể mở rộng thêm suy nghĩ về những nơi cần thiết.

Nguồn dịch: https://www.softwaretestinghelp.com/cognitive-bias-in-software-testing/