Sâu bọ gây hại nông sản, cũng như bug là kẻ thù trong các phần mềm 
Con người đã nghĩ ra rất nhiều giải pháp trong công cuộc tìm và diệt những mối nguy hại ấy nhưng điều đáng lo ngại nhất lại không phải sâu nhiều hay ít, mà là nó có thể "kháng thuốc". Ở đây, đối với kiểm thử phần mền chính là sự vắng mặt của bug.

![](https://images.viblo.asia/605a1ef6-1d40-49e6-a107-1ebe9dc05cd8.jpg)

Khi còn học Đại học, chúng tôi không được thầy giáo dạy về vấn đề nan giải này. Mục đích của kiểm thử ở trường chỉ gói gọn chỉ bày cho chúng tôi cách thức lập test planing và quản lý test, viết testcase theo chuẩn, 1 số phương pháp điển hình để test, function và 1 số tool test auto thông dụng. 

Khi tiếp xúc và buộc phải test trong thời gian đầu chính chúng tôi cũng không hề quan tâm đến vấn đề này. Điều đó cũng giống như nhân loại tìm ra .. thuốc trừ sâu vậy, họ chưa cần quan tâm đến vấn đề sâu có thể kháng thuốc vì lúc đó chưa xuất hiện sâu kháng thuốc. Đối với tester hạng thường thì việc test đạt chỉ tiêu của testcase ban đầu viết ra là đã cảm thấy bản thân xuất sắc rồi, cũng có thể là do chúng tôi chưa phải đổi mặt với cơn ác mộng hiện tiền, vào một ngày đẹp chúng tôi không phát hiện ra 1 bug nào qua bộ case cũ kĩ đi kèm với một cái mặt thẫn thờ.

Và sau đó tôi mới nhận ra một vấn đề :
"À hóa ra không phải lúc nào một bộ testcase có thể dùng được trọn đời trong vòng đời dự án".
Nhiều lúc, tôi cũng quên đi việc phải tiếp cận vấn đề từ nhiều hướng tiếp cận, nhiều góc nhìn, từ những tư duy stupid cho đến những tư duy siêu quái dị. 

Sự thật là các bộ testcase  đòi hỏi phải bảo trì và cập nhật liên tục, bất kể chúng là tự động hay thủ công.
Có một số lý do khiến một bộ testcase sẽ ngừng hiệu quả theo thời gian:

**1. Không thể thực hành trong việc kiểm tra tất cả các tình huống có thể xảy ra.**

Ngay cả các ứng dụng đơn giản cũng yêu cầu số lượng thử nghiệm lớn để xác minh tất cả các tình huống có thể xảy ra và kết hợp dữ liệu. Đây là lý do tại sao phải sử dụng sự trợ giúp của các công cụ phương pháp như phân vùng tương đương và thử nghiệm dựa trên mô hình, nhưng điều này vẫn chưa đủ.
Hầu hết sẽ sử dụng phương pháp thử nghiệm dựa trên rủi ro để tạo một tập hợp con các kịch bản và tập dữ liệu
Điều này không có nghĩa là chúng ta lường trước được hết tất cả các trường hợp phát sinh.

**2. Chức năng của ứng dụng thay đổi theo thời gian.**

Ứng dụng được cải thiện, năng cấp theo từng ngày 
Nên nếu chúng ta giới thiệu các tính năng mới cho sản phẩm, chúng ta cần phải viết thử nghiệm cho chúng.  

**3. Nguyên tắc vàng của test : 80/20**

Nguyên tắc này được đội ngũ tester áp dụng khá triệt để do tính đặc thù của chúng là tiết kiệm thời gian và bao quát các "điểm nóng" về lỗi. Chính vì thế mà những lỗi còn lại (20%) dễ bị bỏ xót hơn do việc chỉ test qua loa các khu vực này.
 
![](https://images.viblo.asia/033902e5-ce95-4463-ae10-6e88cba20c48.jpg)

**4. Chúng ta (con người) có xu hướng đặc biệt chỉ cẩn thận ở những nơi mà chúng ta cảm thấy nguy hiểm sắp xảy ra**

Điều đó có nghĩa là gì?
Đơn giản là các nhà phát triển sẽ hết sức cẩn thận ở những nơi mà người kiểm tra đã tìm thấy lỗi trước đó, nhưng mặt khác, họ có thể không cẩn thận ở những nơi mà họ cảm thấy hầu như không có lỗi. Đây là vấn đề khá chủ quan.
Vậy chúng ta phải làm gì với điều này? Làm thế nào để chúng tôi đảm bảo chúng tôi đang kiểm thử 1 cách hiệu quả nhất?
Nguyên tắc chính là phải khách quan và liên tục xem xét tình trạng của ứng dụng toàn diện. Trong thực tế tôi khuyên bạn nên như sau:

**1. Theo dõi các thay đổi sản phẩm và tác động gián tiếp của chúng trong ứng dụng của bạn.**

Những thay đổi trực tiếp là không đáng kể, nhưng hãy nỗ lực và thực hiện tất cả các kết nối chức năng và cấu trúc, sau đó nghĩ đến các kịch bản mới bạn cần viết để bao quát các thay đổi này.

**2. Ngừng các xét nghiệm không hiệu quả.**

Nguyên tắc nhỏ của tôi là nếu thử nghiệm không báo cáo lỗi trong 5 lần chạy trước, tôi thêm nó vào danh sách đánh giá của mình và tôi bắt đầu xác minh tầm quan trọng của nó và cân nhắc xem tôi nên tiếp tục không.

**3. Sửa đổi dữ liệu kiểm thử của bạn.**

Điều này rất bình thường nhưng chúng ta có xu hướng quên nó.
Nhiều lỗi trong các sản phẩm là chỉ riêng cho 1 loại dữ liệu, điều này có nghĩa là chúng ta nên liên tục tăng hoặc sửa đổi dữ liệu thử nghiệm của mình. Mục đích để tăng thêm tính ngẫu nhiên vào các thử nghiệm của bạn.

**4. Đánh giá vấn đề tìm nguyên nhân**

Mỗi người đều là những nhà nghiên cứu tiềm năng. Luôn đặt ra câu hỏi: "Cách test này còn hiệu quả không? Bộ testcase này đang tồn tại vấn đề gì?..." Bằng cách đặt ra các câu hỏi, chúng ta phải động não để tìm cho ra các câu trả lời mà mình cần.
Khi đã xác định testcase hay cách test không còn mang lại thế mạnh hay có khả năng tìm ra bug nữa cũng như nguyên nhân gây ra .

**Tóm lại:**

Thật là nguy hiểm khi cho rằng bạn có thể tạo ra kiểm thử duy nhất, một thứ sẽ phát hiện ra tất cả các lỗi một lần và mãi mãi.
Ngay cả khi bạn tạo một bộ đồ có tỷ lệ bao phủ rất cao và tỷ lệ thành công phát hiện lỗi rất lớn bạn cũng phải update thường xuyên.