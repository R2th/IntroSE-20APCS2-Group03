Trong quá trình kiểm thử, bạn có thường xuyên nhận ra việc mình thiếu thời gian để kiểm thử hay không? Mặc dù lúc bắt đầu thì có vẻ như tất cả nằm trong tầm kiểm soát thế nhưng chẳng mấy chốc bạn sẽ phải dùng tới kế hoạch dự phòng là **“Làm gì khi không đủ thời gian để kiểm thử?”**

Tôi đã ở trong tình huống này và nó thật chả vui chút nào cả? :)

Tôi đã nghĩ về điều đó trong một thời gian dài. Làm thế nào mà 1 số thứ là bắt đầu suôn sẻ nhưng mà sau đó tụt dốc rất nhanh và thảm hại như vậy? Và đây là phân tích của tôi.

# Thời gian kiểm thử của tôi đã đi đâu mất?

![](https://images.viblo.asia/d50a378a-a12b-41d2-b932-25e1919741e9.jpg)

Đầu tiên, tại sao việc này lại xảy ra? Có rất nhiều lý do - sau đây sẽ là 1 số lý do chính:

1. Ước lượng sai: 
Nếu bạn bắt đầu với một kỳ vọng không chính xác, mọi thứ chắc chắn sẽ thất bại. Một ước lượng chính xác phải tính tới các yếu tố sau:

    - Thời gian cho các task chuẩn bị: đó là các task như
       * Xác định và kết hợp một bộ hồi quy
       * Tạo dữ liệu test
       * Thời gian để xác định việc sẵn sàng kiểm thử

   - Sự bảo trì các test case: Các test case là các tài sản sử dụng dài hạn. Trong quá trình kiểm thử, đôi lúc Testcase sẽ được cập nhật không nhiều thì ít các chi tiết nhỏ nhặt (chắc chắn luôn là dự án nào cũng sẽ có những thay đổi trong quá trình kiểm thử và việc cập nhật bổ sung test case là việc tất nhiên phải làm rồi đúng không ạ :D ). 

     Một lời khuyên cho bạn là nên phân bổ tối đa 30% thời gian thực hiện kiểm thử cho các task bảo trì này. Tất cả các nhóm và dự án có thể không cần tới 30%, nhưng hãy phân bổ một số thời gian và công sức cho task này. (Thực tế là update testcase của mình đã thấy hơi nản rồi, nhưng nhiều khi phải update cả testcase của người khác viết nữa thì nói thật là muốn đập cả đi viết lại cho nhanh ý).

    - Kiểm thử Ad-hoc/Thăm dò: Số lượng kiểm thử theo kịch bản là mẫu số chính cho các con số ước lượng kiểm thử. Tuy nhiên, không có nhóm kiểm thử nào trên thế giới sẽ từ chối việc khám phá phần mềm của bạn ngay cả khi mô hình kịch bản chi phối 1 cách rõ rệt.
    - Báo cáo/giao tiếp: bao gồm việc phân chia, các cuộc họp đứng (kiểu như daily meeting), việc cập nhật các công cụ quản lý công việc, vân vân và mây mây...
    - Các yếu tố bất ngờ: Các tiêu chuẩn thì đề nghị khoảng 25-30% cho ước lượng ban đầu của bạn. Nhưng mà các nhóm hiếm khi có khả năng như thế. Thậm chí sau đó, nếu có thể thì hãy để một chút thời gian để thở (kiểu như khi ước lượng thì nên bớt ra một chút thời gian đề phòng trường hợp bất trắc xảy ra thì còn thời gian mà kịp trở tay). 
    - Team và năng lực của Team: Nếu bạn có 1 team mới hoặc là họ đang sử dụng một công cụ mới lần đầu tiên thì bạn cần thêm một chút thời gian cho việc đào tạo. Điều chỉnh ước lượng của bạn dựa vào cái team bạn đang làm việc cùng. 

2. Các bản build không ổn định và các vấn đề công nghệ khác:

   - Kiểm thử Smoke/Sanity thất bại: Khi các kiểm thử cơ bản trên môi trường UAT thất bại sau khi deploy vào môi trường QA, thì có không quá nhiều thứ để cho đội QA có thể thực hiện việc kiểm thử. Đúng ra thì bạn vẫn có thể làm task khác khi điều này xảy ra, thế nhưng nó sẽ không thể lấp đầy được thời gian của chu kỳ kiểm thử phần mềm. Vì vậy, đây là một yếu tố gây lãng phí thời gian khá lớn.
   - Dữ liệu kiểm thử không sẵn sàng: Dữ liệu giống với môi trường Production là một điều bắt buộc đối với mọi dự án. Việc không đưa dữ liệu này vào môi trường QA đúng giờ cũng là một yếu tố cản trở. Một số tester có thể xử lý được điều này bằng cách tạo vào quản lý riêng bộ dữ liệu kiểm thử của họ, nhưng việc này tốn thời gian và có thể nó sẽ không luôn đúng. 
   - Vấn đề môi trường: Việc build lỗi hay Server time out, có nhiều lý do làm thời gian của chu kỳ kiểm thử của bạn. Điều này có lẽ xuất phát từ sự thật là, một số công ty (không phải là tất cả) làm giảm tầm quan trọng của môi trường kiểm thử tốt và giống với môi trường thật để tăng hiệu quả đối với QA. Họ thường cố gắng tránh xa các server và thiết định có dung lượng thấp. Điều này thực sự là một sửa chữa trong thời gian ngắn và không ai ủng hộ cả. Thực tế thì, nó có thể làm giảm chất lượng kiểm thử và làm mất đi thời gian kiểm thử có giá trị.
 
3. Thiếu sự thỏa thuận giữa các bên liên quan

   Điều này có vẻ hiếm khi xảy ra với các team thực hiện theo mô hình Agile hoặc là Safe vì họ làm trong các chu kỳ khép kín, tuy nhiên nhiều team vẫn phải chịu đựng sự bất đồng hoặc thông tin sai lệch khi Dev, Ops và QA giao nhận các sản phẩm với nhau. Do đó, dẫn đến tình trạng bị chậm trễ.
 
Well, chúng ta đã biết được các vấn đề, giờ thì sẽ là 1 số cách để sửa chữa nó.

# Làm sao để Tester có thể có đủ thời gian để kiểm thử?

1. Ước lượng đúng: 
    
    Khi nghi ngờ ước lượng quá một mức hợp lý, hãy xem xét lại. Đừng quên điều chỉnh các ước lượng dựa trên quy trình, công cụ và nhóm của bạn. Khi hoàn tất, hãy cho mọi người biết và đảm bảo rằng ai cũng nằm trong vòng lặp. 
3. Hãy xem xét các lịch sử dữ liệu - Công cụ quản lý kiểm thử là người bạn tốt nhất
   * Chu kỳ kiểm thử bản release trước đó mất bao lâu?
   * Loại vấn đề nào là nguyên nhân của việc gián đoạn chu kỳ kiểm thử trước đó? 
   * Hầu hết các test case phải chạy bao nhiêu lần mới trước khi chúng pass?
   * Nhược điểm nào được báo cáo?
   * Nhược điểm nào là nguyên nhân dẫn tới việc gián đoạn việc kiểm thử?

3. Hỏi những câu dưới đây và lên kế hoạch theo thời gian khủng hoảng
    * Tìm ra chức năng quan trọng của dự án là chức năng nào?
    * Tìm ra module có rủi ro cao của dự án là cái nào? 
    * Chức năng nào dễ thấy nhất đối với người dùng?
    * Chức năng nào có tác động an toàn nhất?
    * Chức năng nào có tác động về mặt tài chính lớn nhất đối với người dùng?
    * Những khía cạnh nào của ứng dụng là quan trọng nhất đối với khách hàng?
    * Phần nào của code là phức tạp nhất và gây ra lỗi nhiều nhất?
    * Phần nào của ứng dụng được phát triển vội vàng hay trong thời gian khủng hoảng?
    * Các dev nghĩ gì về các khía cạnh rủi ro cao nhất của ứng dụng?
    * Loại vấn đề nào là nguyên nhân gây ra dư luận tồi tệ nhất?
    * Loại vấn đề nào là nguyên nhân gây ra hầu hết các khiếu nại dịch vụ khách hàng? 
    * Loại kiểm thử nào có thể bao quát được nhiều chức năng 1 cách dễ dàng?
   
  Xem xét những điểm này có thể giúp bạn giảm đáng kể rủi ro của việc release dự án trong thời gian hạn chế. 
  
4. Sử dụng một công cụ quản lý kiểm thử: nó sẽ giảm lượng thời gian đáng kể chuẩn bị, báo cáo và bảo trì và nỗ lực.
5. Chúng ta không thể làm gì nhiều đối với các vấn đề về công nghệ hay bản build lỗi, nhưng có một thứ có thể giúp chúng ta đó là nhìn vào các kết quả kiểm thử Unit. 

   Điều này sẽ cho chúng ta ý tưởng liệu bản build có thành công hay không và loại kiểm thử nào đã làm nó thất bại.
Nếu công cụ quản lý kiểm thử của bạn hỗ trợ tích hợp CI ([Continuous integration](https://www.softwaretestinghelp.com/continuous-integration/)), bạn có thông tin luôn sẵn sàng mà không gặp chút phiền phức nào, vì vậy bạn có thể hiểu về ứng dụng rõ hơn.

6. Đo lường năng suất và tiến độ của bạn thường xuyên:
 
   Đừng để trạng thái của các báo cáo là deliverable chỉ vì lợi ích của các team bên ngoài. Hãy chắc chắn rằng bạn đang theo dõi các mục tiêu hàng ngày và khả năng của bạn 1 cách sát sao để hoàn thành chúng.

   Ngoài ra, cũng chắc chắn rằng bạn không tham gia vào câu hỏi hóc búa cổ điển ‘Vận tốc so với Chất lượng. Bởi vì, khi bạn báo cáo, giả sử nói là có 50 lỗi 1 ngày, có thể có cảm giác như bạn đạt được năng suất rất cao. Nhưng nếu hầu hết những bug này trở thành không hợp lệ, thì có vẻ như chính bạn đang có vấn đề rồi.
   
   Chính vì thế, cần theo dõi, theo dõi và theo dõi nhiều hơn chút nữa =))

# Kết luận:

Cuối cùng, Nếu mà bạn đã làm tất cả các biện pháp phòng ngừa mà vẫn thấy mình bị khủng hoảng về thời gian kiểm thử thì hãy yêu cầu giúp đỡ nhé. Cái này là sure rồi, không thì làm sao mà kịp tiến độ khách hàng, chậm deadline thì thôi tập xác định. 

Thực tế là làm một dự án không chỉ có đội QA mà còn là sự kết hợp của nhiều đội khác nữa. Nếu đội QA mà lụt thì cũng chẳng thể release đúng hạn được. Dẫn tới ảnh hưởng tới nhiều đội khác nữa. Chính vì thế khi có vấn đề, hãy raise lên vì hầu hết các đội sẽ sẵn sàng đưa mọi thứ trở lại đúng hướng. Bởi tất cả mọi người là một team bự mà! ^^

Bài viết được dịch từ link: https://www.softwaretestinghelp.com/what-if-there-isnt-enough-time-for-thorough-testing/