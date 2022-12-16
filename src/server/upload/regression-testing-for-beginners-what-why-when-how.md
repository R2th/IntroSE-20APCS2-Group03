Regression testing (kiểm thử hồi quy) là một trong những chủ đề thú vị nhất để nói về. Một số người thích nó, một số ghét nó nhưng mọi nhân viên kiểm thử đều thực hiện trong bất kỳ dự án nào.

Mặc dù kiểm thử hồi quy là phổ biến và mọi người thực hiện rất nhiều, có những bạn không biết làm thế nào cho đúng, hoặc cũng có thể là họ chưa bao giờ nghe về nó.

### Kiểm thử hồi quy là gì?
Kiểm thử hồi quy là quá trình kiểm tra các thay đổi trên ứng dụng để đảm bảo rằng những chức năng cũ vẫn hoạt động khí có các thay đổi mới.\
Nói một cách đơn giản, kiểm thử hồi quy để đảm bảo rằng trong ứng dụng của bạn, những gì hoạt động trong quá khứ vẫn hoạt động ổn vào lúc này.

### Nhưng tại sao chúng ta cần kiểm thử hồi quy?

Ứng dụng ngày nay quá lớn và phức tạp để làm cho nó đúng ngay lần đầu tiên. Không khả thi khi nhóm phát triển có thế xây dựng một ứng dụng lớn bao gồm tất cả các chức năng và phát hành cho khách hàng một lần.\
Thay vào đó, nhóm phát triển sẽ hoàn thiện từng chức năng nhỏ và mỗi phiên bản chỉ bao gồm một chức năng nhất định của ứng dụng. Như bạn có thể tưởng tượng, phiên bản sau này sẽ là phiên bản lớn hơn so với phiên bản trước vì các chức năng trong bản trước cũng sẽ có trong phiên bản sau.

Nhóm phát triển tiếp tục làm điều này cho đến khi có phiên bản cuối cùng với tất cả các chức năng hoàn thiện và sau đó phát hành cho khách hàng như thế này:
![](https://images.viblo.asia/3b5e09ae-12fa-4883-8fa0-55d052bb5b83.jpg)
Hầu như lúc nào nhóm phát triển thường phải đối ứng qua các phiên bản bàn giao. Nhóm phát triển về cơ bản sẽ làm hai việc trong một phiên bản:

1. Code để hoàn thành các chức năng mới 
1. Đảm bảo rằng code của chức năng mới không ảnh hưởng đến các chức năng đã hoạt động trước đó

Hầu hết các bạn Dev có thể xử lý nhiệm vụ số 1 là code để triển khai một chức năng xịn một cách dễ dàng, tuy nhiên các bạn Dev thường bỏ qua nhiệm vụ số 2 để đảm bảo code mới không gây ảnh hưởng code cũ.

Mọi thứ ổn ấp cho đến khi các bạn Dev có một số thay trong code...
![](https://images.viblo.asia/b7326a3d-3e9f-46c2-96eb-0a6ad55d70d5.jpg)

Và đây là một vài lý do:
* Tôi chỉ thêm / xóa một dòng code, không vấn đề gì cả đâu
* Tôi chỉ thực hiện một thay đổi nhỏ ở đây ... và ở đó

Trong vài trường hợp, các bạn Dev không nhận thức đầy đủ về tác động của các dòng code của họ đối với toàn bộ hệ thống. Nó không thực sự vì năng lực của cá bạn Dev không tốt, nhưng thường thì đó là vì hệ thống quá lớn và phức tạp để chỉ ra rõ ràng về những gì mà code mới tác động lên.\
Để tránh các tác động không mong muốn của thay đổi code, mọi phiên bản cần phải được kiểm thử để xác minh các chức năng mới hoạt động và những chức năng cũ cũng hoạt động tốt. 

### Khi nào cần kiểm thử hồi quy?

Khi phát triển ứng dụng, sẽ có những thay đổi để phù hợp với hệ thống cũng như yêu cầu của khách hàng, các chức năng mới được tích hợp, do đó luôn có những phiên bản mới thay thế phiên bản cũ. Việc kiểm thử sẽ phải thực hiện lại và tốn nhiều thời gian. Trong trường hợp này, ta sẽ áp dụng kiểm thử hồi quy.\
Kiểm thử hồi quy thường được thực hiện bất cứ khi nào có một thay đổi trong hệ thống, bao gồm:
* Bất cứ khi nào một chức năng mới được thực hiện
* Bất cứ khi nào có sửa đổi / thay đổi trên chức năng cũ  
* Bất cứ khi nào môi trường thay đổi
* Bất kỳ thay đổi nào khác mà bạn biết

Tuy nhiên, trong thực tế, nhân viên kiểm thử không phải chạy thử nghiệm hồi quy khi có bất kỳ thay đổi nào. Nhóm phát tiển cần đánh giá rủi ro và xem những thay đổi nào cần được thực hiện kiểm thử hồi quy. \
Không phải luôn thực hiện kiểm thử hồi quy khi có thấy đổi, bên cạnh ưu điểm đảm bảo chất lượng dự án nó cũng có nhược điểm:

**Ưu điểm của kiểm thử hồi quy**
* Giúp phát hiện các lỗi không mong muốn gây ra do những thay đổi mới được thêm vào hệ thống
* Giảm số lượng lỗi lọt đến người dùng cuối
* Giúp phát hành sản phẩm với sự tự tin

**Nhược điểm của kiểm thử hồi quy**\
 Mặc dù kiểm thử hồi quy là rất quan trọng và được coi là phải có trong  vòng đời kiểm thử phần mềm, nhưng cũng có những nhược điểm. Đặc biệt là: **CHI PHÍ**
*  Việc chạy lại toàn bộ các ca kiểm thử của kiểm thử hồi quy là hoạt động tiêu tốn tài nguyên (con người và cả chi phí). Ngay cả khi kiểm thử hồi quy được thực hiện bằng cách chạy automation test, chúng ta vẫn tốn thời gian của nhóm/ công cụ/ tài nguyên để viết kịch bản automation test (nó vẫn là vấn đề của chi phí).
*  Mỗi khi có một chức năng mới được thêm hoặc sửa đổi, các trường hợp thử nghiệm sẽ được thêm hoặc cập nhật tương ứng. Về lâu dài, các kịch bản của kiểm thử hồi quy ngày càng lớn hơn theo thời gian, chúng ta sẽ trở nên lớn hơn khiến việc duy trì, cập nhật chúng là một thách thức không hề nhỏ.
*  Kiểm thử hồi quy là một trong những hoạt động kiểm thử ít thú vị nhất hiện có. Nói cách khác, thực hiện kiểm thử hồi sau mỗi phiên bản để bàn giao là rất chán, không có gì thú vị. Chạy cùng các kịch bản thử nghiệm sau mỗi phiên bản sẽ nhàm chán, chúng ta sẽ dễ thờ ơ, một khi mất tập trung và không chú ý 100% vào công việc của mình thì dễ dàng bỏ lỡ một bước bất kì dẫn đến kết quả không còn chính xác hoặc tệ hơn là bạn có thể bỏ lỡ những lỗi, điều này rất tệ.
 
###  Làm thế nào để kiểm thử hồi quy?
**Bước #1: Tạo kịch bản kiểm thử hồi quy**

Kịch bản kiểm thử hồi quy là gì? Kịch bản kiểm thử hồi quy là một tập hợp các trường hợp kiểm thử mà chúng ta đã viết chúng cho ứng dụng của mình. Kịch bản kiểm thử hồi quy có thể là một danh sách các trường hợp kiểm thử, các ý tưởng kiểm tra mà muốn kiểm tra. Về cơ bản, kịch bản kiểm thử hồi quy sẽ bao gồm tất cả các trường hợp thử nghiệm chúng ta dự định chạy lại để phục vụ một mục đích: đảm bảo những chức năng đã hoạt động vẫn sẽ hoạt động tốt.

Khi chúng ta có các kịch bản kiểm thử hồi quy, tiếp theo là:
* Phân loại các trường hợp thử nghiệm (Ví dụ: Đăng nhập, Tạo đơn hàng, Xóa đơn hàng, Báo cáo, ...)
* Đánh độ ưu tiên (High/ Normal/ Low) cho nó dựa vào mức độ quan trọng của các trường hợp hợp kiểm tra. Trường hợp thử nghiệm có độ ưu tiên cao nhất sẽ là trường hợp thử nghiệm bao gồm các chức năng quan trọng nhất của hệ thống và cần được thực hiện trước tiên.

Bằng cách phân loại và đánh độ ưu tiên các trường hợp kiểm thử trong các kịch bản kiểm thử hồi quy chúng ta có thể nhóm trường hợp kiểm thử/ kiểm tra nào cần được chạy trước, kiểm tra nào có thể chạy sau khi chúng ta không có đủ thời gian hoặc không nhất thiết phải chạy đầy đủ tất cả kịch bản kiểm thử hồi quy.

**Bước #2: Chạy kịch bản kiểm thử hồi quy**

Trong một số trường hợp không cần thiết phải chạy tất cả các kịch bản thử nghiệm nếu chúng ta biết được các chức năng/ thành phần nào sẽ bị ảnh hưởng bởi thay đổi trong phiên bản này. Khi biết điều này, chúng ta có thể lọc các trường hợp thử nghiệm của mình và chọn đúng và đủ các trường hợp cần thiết cho kiểm thử hồi quy. \
Tương tự, trong một số bối cảnh mà chúng ta không có nhiều thời gian để thực hiện kiểm thử hồi quy toàn bộ hệ thống, bây giờ bạn có thể biết trường hợp kiểm tra nào bạn cần chạy trước và trường hợp kiểm tra nào bạn có thể bỏ qua.

Nếu bạn đang sử dụng Google spreadsheet hoặc file Excel để theo dõi kết quả kiểm thử hồi quy của mình, hãy đảm bảo bạn có các cột sau trong bộ kiểm tra hồi quy:
* Kết quả kiểm tra: Đạt / Không thành công / Không kết luận
* Lưu ý: Nơi bạn có thể ghi chú hoặc ID / mô tả về lỗi nếu trường hợp này thử nghiệm thất bại
* Phiên bản thực hiện kiểm thử: Nơi bạn có thể note phiên bản nào bản được thực hiện kiểm thử hồi quy

**Bước #3: Thu thập kết quả và báo cáo**

Khi chúng ta hoàn thành kiểm thử hồi quy trên ứng dụng bước cuối cùng là kiểm tra lại kết quả kiểm thử trước khi gửi báo cáo cho người quản lý. Về cơ bản, chúng ta cần xem lại các nội dung sau:
* Hãy chắc chắn rằng các trường hợp kiểm tra đã thất bại có chỉ rõ ID bug liên quan hoặc là ghi chú mô tả thông tin thất bại
* Hãy chắc chắn rằng những trường  hợp kiểm thử không được chạy cũng có ghi chú mô tả lý do tương ứng
###  Kết luận

Kiểm tra hồi quy là một trong những hoạt động kiểm thử mạnh mẽ, nó có thể chúng ta tăng cường chất lượng để có ứng dụng tốt hơn nhưng cũng có thể rất tốn kém. Một chiến lược kiểm thử hồi quy hiệu quả sẽ tiết kiệm cả thời gian và tiền bạc. Ngoài ra, nếu có thể, có thể cân nhắc để tự động hóa (automation test).

Theo những trường hợp nghiên cứu trong lĩnh vực ngân hàng, kiểm thử hồi quy tiết kiệm tới 60% thời gian trong việc sửa lỗi (có thể đã phát hiện bởi kiểm thử hồi quy) và 40% chi phí cho kiểm thử phần mềm.

>  Bài viết đươc tham khảo từ nguồn **[AskTester](https://www.asktester.com/regression-testing-what-why-when-how/)**