Kiểm tra hồi quy là một trong những chủ đề thú vị. Một số người thích loại kiểm thử này và cũng có số người lại không nhưng mọi người dường như đều làm trong bất kỳ dự án kiểm thử. Vì vậy với người mới bắt đầu thì chúng ta sẽ tìm hiểu Kiểm thử hồi quy ( Regression testing ) thông qua các key word: What ( là gì), Why ( tại sao ), When ( khi nào ), How ( như thế nào ).

# 1. Kiểm tra hồi quy là gì? (What)

![](https://images.viblo.asia/ebc3b386-6798-4b61-a44e-aff107491c6f.png)

Kiểm thử hồi quy là quá trình kiểm tra các thay đổi đối với các chương trình để đảm bảo rằng chương trình cũ hơn vẫn hoạt động với các thay đổi mới.

(Nguồn: http://searchsoftwarequality.techtarget.com/definition/regression-testing )

và từ Wiki:

Kiểm thử hồi quy là một loại  kiểm thử phần mềm  xác minh rằng phần mềm được phát triển và kiểm tra trước đó vẫn thực hiện theo cách tương tự sau khi được thay đổi hoặc giao tiếp với phần mềm khác.

**Nói một cách đơn giản, kiểm tra hồi quy là một kiểm tra để đảm bảo rằng trong phần mềm của bạn, những gì hoạt động trong quá khứ vẫn hoạt động ở hiện tại.**
# 2. Tại sao chúng ta cần kiểm tra hồi quy? (Why)

Phần mềm ngày nay quá lớn và phức tạp để làm cho nó đúng lần đầu tiên. Việc các nhà phát triển xây dựng một bản dựng lớn bao gồm tất cả các tính năng và phát hành cho khách hàng là không thực tế. Thay vào đó, các nhà phát triển xây dựng các bản dựng nhỏ và mỗi bản dựng chỉ bao gồm một tính năng nhất định của phần mềm. Như bạn có thể tưởng tượng, bản dựng sau này cũng sẽ là bản dựng lớn hơn so với bản dựng trước vì các tính năng trong bản dựng trước cũng sẽ được đưa vào bản dựng sau.

Họ tiếp tục làm điều đó cho đến khi có bản dựng cuối cùng với tất cả các tính năng hoàn thành và sau đó phát hành cho khách hàng

![](https://images.viblo.asia/7fadf68e-d8ec-43a4-8726-b4b2f8c2b3e4.jpg)

Các nhà lập trình về cơ bản sẽ làm hai việc trong một bản dựng:

- Viết code để triển khai các tính năng mới cho bản dựng đó

- Đảm bảo rằng viết code cho các tính năng mới không phá vỡ các tính năng hoạt động trước đó

Trong khi hầu hết các lập trình viên có thể xử lý nhiệm vụ số 1 là viết code mới để triển khai một tính năng độc đáo và dễ dàng, thì ho thường bỏ qua nhiệm vụ số 2 để đảm bảo mã mới không phá vỡ mã cũ.
Như người ta nói, những gì có thể sai sẽ xảy ra sai, vì vậy để tránh tác động không mong muốn và tác dụng phụ của thay đổi code, mọi bản dựng cần phải được kiểm tra để xác minh các tính năng mới hoạt động và các tính năng cũ cũng hoạt động tốt. mà test “ kiểm thử hồi quy “.

# 3. Khi nào cần kiểm tra hồi quy? (When)

Kiểm tra hồi quy thường được thực hiện bất cứ khi nào có thay đổi trong hệ thống, điều này bao gồm:

- Bất cứ khi nào một tính năng mới được thực hiện
- Bất cứ khi nào một tính năng cũ được sửa đổi / thay đổi
- Bất cứ khi nào một lỗi được sửa trong hệ thống
- Bất cứ khi nào môi trường thay đổi
- Bất kỳ thay đổi nào khác mà bạn biết
Tuy nhiên, trong thực tế, người tester không phải chạy kiểm tra hồi quy cho bất kỳ thay đổi nào. Một nhóm cần đánh giá rủi ro và xem những thay đổi nào xứng đáng với nỗ lực kiểm tra hồi quy.

Có những ưu và nhược điểm của kiểm tra hồi quy:

## Ưu điểm của kiểm tra hồi quy:

- Giúp phát hiện các lỗi không mong muốn gây ra do những thay đổi mới được thêm vào hệ thống.
- Giảm số lượng lỗi thoát cho người dùng cuối
- Quan trọng hơn, giúp phát hành sản phẩm với sự tự tin.
- 
## Nhược điểm của kiểm tra hồi quy:

Mặc dù kiểm tra hồi quy là rất quan trọng và được coi là phải có trong bất kỳ vòng đời kiểm thử phần mềm nào, nhưng cũng có những nhược điểm. Có nhiều lý do khác nhau, nhưng nó hiểu rõ điều này:

### Chi phí

- Điều này là đơn giản, chạy lại toàn bộ bộ test case về các test case được xây dựng sẵn và sau khi xây dựng là thời gian, hoạt động kiểm thử tiêu tốn tài nguyên. Điều này đặc biệt đúng nếu bạn có hàng ngàn test case cần được chạy lại thủ công. Ngay cả khi kiểm tra hồi quy được thực hiện bằng cách chạy kiểm thử tự động thì nó vẫn tốn thời gian của team, công cụ và tài nguyên có kỹ năng để kiểm thử tự động. Tuy nhiên nó vẫn tốn chi phí.
-  Duy trì bộ kiểm tra hồi quy ngày càng lớn hơn theo thời gian. Mỗi khi có một tính năng mới được thêm hoặc sửa đổi, các test case sẽ được thêm hoặc cập nhật tương ứng. Về lâu dài, bộ kiểm tra hồi quy của bạn sẽ trở nên lớn hơn khiến việc cập nhật chúng cũng gặp nhiều khó khăn
-  Truy nguyên nguồn gốc (ví dụ: biết kiểm tra cái gì, không nên kiểm tra), nếu bạn không làm tốt việc theo dõi bạn sẽ dễ dàng bỏ lỡ các trường hợp kiểm tra hoặc không thể theo dõi phạm vi của nó.
Bên cạnh chi phí, còn có một mặt tiêu cực khác của kiểm thử hồi quy. Kiểm tra hồi quy là một trong những hoạt động kiểm tra ít thú vị nhất. Nói cách khác, thực hiện kiểm tra hồi quy sau khi thay đổi yêu cầu là một điều kinh khủng. Tôi chưa bao giờ thấy một người tester nhảy lên vì niềm vui khi kiểm thử hồi quy :)

![](https://images.viblo.asia/bccb4908-498f-4c82-8249-41f3de9bd4e1.jpg)

Sự thật thì luôn phũ phàng...

Ngoài ra, chạy cùng một ngàn trường hợp kiểm thử là không vui chút nào. Kết quả là bạn bị bất cẩn và điều này rất nguy hiểm. Một khi bạn thờ ơ và không chú ý 100% vào công việc của mình, bạn sẽ dễ dàng bỏ lỡ một bước hoặc tệ hơn là bạn có thể bỏ lỡ lỗi đó

### *Cách xử lý:

- Thường xuyên cập nhật bộ kiểm tra hồi quy của bạn. Bất cứ khi nào bạn có một trường hợp kiểm thử mới hoặc yêu cầu thay đổi, bạn cần cập nhật các test case của mình cho phù hợp.
- Thêm các lỗi cố định / đóng như là một phần của bộ kiểm tra hồi quy. Xem lại cơ sở dữ liệu lỗi của bạn và thêm chúng vào bộ kiểm tra hồi quy của bạn nếu không có trường hợp kiểm tra nào bao gồm kịch bản lỗi đó
- Phân loại và ưu tiên các test case để bạn biết các trường hợp kiểm thử quan trọng của những thành phần nào cần được chạy trước. Bạn có thể phân loại chúng thành Quan trọng, Cao, Thấp hoặc đánh số chúng 1, 2, 3 hoặc bất cứ thứ gì bạn thích.

# 4. Làm thế nào để kiểm tra hồi quy? (How)

Mặc dù mỗi dự án là khác nhau, đây là quá trình kiểm thử hồi quy cơ bản:

## Bước 1: Tạo bộ kiểm tra hồi quy

Bỏ qua các dự án hoặc các công cụ bạn đang có, có một bộ kiểm tra hồi quy là điều kiện tiên quyết.

Bộ kiểm tra hồi quy là gì? Bộ kiểm tra hồi quy là một tập hợp các test case mà bạn đã viết chúng cho các sản phẩm của mình. Nếu bạn không có thời gian cho viết bộ test case chi tiết thì bộ kiểm tra hồi quy của bạn có thể là một checklist các ý tưởng kiểm tra mà bạn muốn kiểm tra. Về cơ bản, bộ kiểm tra hồi quy sẽ bao gồm tất cả các trường hợp bạn dự định chạy lại để phục vụ một mục đích: đảm bảo những gì vẫn hoạt động.

Khi bạn có bộ kiểm tra hồi quy, các bước tiếp theo của bạn là:

- Phân loại các test case của bạn thành các thành phần hoặc tính năng của hệ thống của bạn (Ví dụ: Đăng nhập, Tạo đơn hàng, Xóa đơn hàng, Báo cáo, v.v.)
- Ưu tiên các test case của bạn dựa trên mức độ quan trọng của các trường hợp thử nghiệm (Ví dụ: Quan trọng, Cao, Thấp, v.v.). Test case ưu tiên cao nhất sẽ là test case bao gồm các tính năng quan trọng nhất của hệ thống và cần được thực hiện trước tiên (test case thông luồng)

![](https://images.viblo.asia/7d4e6a09-c049-4551-9669-f53b11579744.jpg)

Bằng cách phân loại và ưu tiên các test case trong bộ kiểm tra hồi quy , bạn luôn có thể nhóm test case và biết test case nào cần được chạy trước, cái nào có thể chạy sau khi bạn không có đủ thời gian hoặc không có ý nghĩa cho bài kiểm tra hồi quy đầy đủ.

## Bước 2: Chạy test case

![](https://images.viblo.asia/310b27b8-8540-48b6-a9f1-a52895781637.jpg)

Bây giờ bạn đã có bộ kiểm tra hồi quy tại chỗ, vì vậy bất cứ khi nào bạn có bản dựng mới, bạn sẽ khởi động bài kiểm tra hồi quy của mình, phải không?

Chờ đợi! Bạn sẽ chạy chúng nhưng trước khi làm điều đó, hãy tự hỏi mình những câu hỏi sau:

Bản dựng của bạn có đủ tốt để kiểm thử thêm không?
Tại sao chúng ta cần phải biết điều đó? Vấn đề là như thế này:

Điều gì sẽ xảy ra nếu bạn đang lập kế hoạch cho bộ kiểm tra hồi quy của mình và giao nhiệm vụ cho các thành viên trong nhóm để chạy thử nghiệm hồi quy, nhưng vào cuối ngày, bạn nhận ra rằng một trong những tính năng quan trọng nhất của hệ thống đã bị hỏng hoàn toàn. Bây giờ bạn và nhóm của bạn đã lãng phí thời gian để kiểm tra bản dựng thất bại.

Vì vậy, trước khi chạy bộ kiểm tra hồi quy, hãy đảm bảo rằng bản dựng đủ tốt để kiểm thử. Bạn có thể đạt được điều này bằng cách thực hiện kiểm tra chấp nhận xây dựng, kiểm tra smoke. Một kiểm thử smoke thường là một tập hợp con nhỏ của bộ thử nghiệm hồi quy bao gồm các tình huống quan trọng của hệ thống đang được thử nghiệm. Bài kiểm tra này thường là một bài kiểm tra ngắn (thường mất 1-2 giờ để thực hiện). Nếu bất kỳ ttrường hợp kiểm thử nào trong kiểm thử smoke không thành công, bạn có thể cho rằng bản dựng không đủ tốt để thử nghiệm thêm và thông báo cho các lập trình viên và người quản lý phù hợp. Điều này có thể giúp bạn và nhóm của bạn tiết kiệm rất nhiều thời gian.

Kiểm tra hồi quy đầy đủ cần thiết?
Mặc dù hồi quy hoàn toàn là một công cụ tuyệt vời, nhưng trong một số trường hợp, không cần thiết phải chạy tất cả các trường hợp kiểm thử nếu bạn biết các thay đổi rất tách biệt và bạn biết chính xác các tính năng / thành phần nào sẽ bị ảnh hưởng và những gì không. Khi biết điều này, bạn có thể lọc các test case của mình và chọn đúng các test case được kiểm thử hồi quy. Tương tự, trong một số bối cảnh mà bạn không có nhiều thời gian để kiểm thử hồi quy hoàn toàn, bây giờ bạn có thể biết trường hợp kiểm thử nào bạn cần chạy trước và trường hợp kiểm thử nào bạn có thể bỏ qua.

Khi bạn có một danh sách các trường hợp kiểm thử cần phải được hồi quy, bây giờ bạn có thể bắt đầu kiểm tra.

## Bước 3: Thu thập kết quả kiểm tra và báo cáo

![](https://images.viblo.asia/0f83486b-f59f-4285-902c-7c4c81476e0b.jpg)

Khi bạn hoàn thành bài kiểm tra hồi quy của mình, bước cuối cùng là xem xét kết quả kiểm tra trước khi gửi báo cáo cho người quản lý. Về cơ bản, bạn cần xem lại các nội dung sau:

- Hãy chắc chắn rằng các trường hợp kiểm tra đã thất bại trong các liên kết với ID lỗi hoặc ít nhất là có một số ghi chú mô tả trong khi case thất bại
- Hãy theo dõi các bài kiểm tra bất thường với tất cả các case đã passed

# Tóm lại:

Kiểm tra hồi quy là một trong những hoạt động kiểm thử mạnh mẽ nhất , nó có thể giúp bạn tăng cường kiểm tra và tạo ra phần mềm tốt hơn nhưng cũng có thể rất tốn kém. Vì vậy, khi bạn làm điều đó, bạn nên tập trung vào giá trị từ hoạt động đó. Ngoài ra, nếu có thể, hãy cân nhắc để tự động hóa nó để tận dụng tối đa nó.

### Tham khảo: 
https://www.asktester.com/regression-testing-what-why-when-how/