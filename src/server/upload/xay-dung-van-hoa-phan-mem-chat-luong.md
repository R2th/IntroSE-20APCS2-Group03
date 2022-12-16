# Trong phát triển phần mềm, chất lượng được đánh giá thế nào?

Có thể các bạn đã từng nghe hay tự có những cách hiểu khác nhau về chất lượng phần mềm. Đó có thể là Thiết kế tối tưu (fitness for use), Mang lại giá trị cho khách hàng,  Chính xác với yêu cầu phần mềm được đặt ra, hay Không có lỗi. Tất cả chúng đều là những khía cạnh về chất lượng, nhưng chúng ta không thể chỉ chọn một khái niệm và xem đó là một định nghĩa đầy đủ về Chất Lượng của Phần Mềm

Chất lượng bao hàm nhiều phương diện. Chúng ta chắc hẳn đã tự tạo ra/ hoặc đã sử dụng nhiều app mà thực hiện đúng/ đầy đủ các chức năng được đặt ra, song lại có những vấn đề phát sinh tại các chức năng: **Phi chức năng (nonfunctional)** chẳng hạn như: hiệu năng (performance), sự ổn định (reliability), hay tính dễ sử dụng (usability). Các yếu tố này thường được gọi là các **Thuộc Tính Chất Lượng**.

Chắc các bạn đã từng trong tình huống cần phải đưa ra sự lựa chọn giữa những **Thuộc Tính Chất Lượng**, ví dụ như giữa _security_ vs _performance hay usability_..

Chúng ta không thể cùng một lúc tối ưu được tất cả các phương diện trên. Do đó, mỗi dự án cần xác định cho riêng dự án của mình thế nào là **Chất Lượng** để cùng nhau hành động vì mục tiêu đó hay có thể đưa ra những quyết định đúng đắn.

# Việc thiếu thói quen đảm bảo chất lượng gây ra hậu quả thế nào?

Dễ thấy nhất có lẽ là gây suy giảm sự hài lòng của khách hàng (KH). 

Nhưng chẳng ai muốn đợi cho đến lúc bàn giao (deliver) xong dự án mới biết KH "yêu quý" có hài lòng về chất lượng hay không? Thế nên Agile mới phát huy thế mạnh của mình ở chỗ, cứ sau một khoảng thời gian định kì, ta sẽ cho ra đời một phần của sản phẩm để thu thập dần các ý kiến của KH để từ đó có những phương án cải thiện cho giai đoạn tiếp theo của dự án.

Ngoài ra, Khối lượng **việc làm lại** cũng có thể chỉ ra sự thiếu hụt trong công tác đảm bảo chất lượng. 

Một số công ty, tổ chức IT tiến hành đo đạc thời gian dành cho lượng **việc làm lại** này trong và sau khi deliver sản phẩm. Các bạn cũng thử làm mà xem, sẽ thấy kết quả sẽ khá "shock". Vì số liệu cho thấy có đến 30 - 50% thời gian phát triển dự án là dành cho việc  **làm lại**. Đây không phải bàn cãi - là con số quá lớn, ảnh hưởng trực tiếp đến năng suất và kế hoạch phát triển hay release. 

> Có thể thấy, chúng ta đang rất hiếm khi plan cho "việc làm lại" trong khi nó là một chuyện luôn luôn xảy ra. 

Khi mà con số là >50% thì khả năng cao những issue đó sinh ra trong những giai đoạn đầu của dự án, song không được phát hiện. *Chẳng hạn như lỗi trong quan hệ DB 1-n chuyển thành n-n... toang*

Nếu cảm thấy mình đang phải dành quá nhiều thời gian *hốt shit* thì hãy **5Whys** để tìm ra được gốc gác của vấn đề.  Những nguyên nhân được xác định sẽ là bài học để chúng ta ngăn chặn được những issue như thế này khi nó còn ở trong trứng. Không thì chúng ta mãi chỉ bực bội vì phải sửa lỗi trong khi chẳng bao giờ tìm cách mà loại bỏ/ giảm thiểu chúng

# Văn hóa và Chất lượng phần mềm, liệu có liên quan?

 Chắc chắn là vậy! 
 
 Trong một nền văn hóa kĩ thuật phần mềm khỏe mạnh, **Chất Lượng** luôn là ưu tiên hàng đầu cho toàn bộ các thành viên dự án và ban lãnh đạo. 
 
 Một cách làm hay mà ta có thể tham khảo (thực tế Sun-astrisk Inc. vẫn đã và đang triển khai), đó là trước khi sản phẩm đến tay khách hàng để UAT/ tìm lỗi thì sẽ có anh em đồng chí khác review phần code của chúng ta. 
 
 Nhiều tổ chức xem đây là một tiêu chuẩn về thực hành với mong muốn góp phần xây dựng một quy trình phát triển phần mềm chất lượng. Chúng ta có thể dễ dàng tưởng tượng, sẽ ra sao nếu không đặt ra tiêu chuẩn này, thì khả năng rất cao là sản phẩm sẽ "ăn rất nhiều hành" từ những vị KH "đáng quý" :smile: 
 
 Chắc các bạn đã nghe câu "You can pay me now or you can pay me later" (tạm dịch: *Ông có thể trả tôi bây giờ hay ông có thể trả tôi sau - kiểu gì thì ông cũng phải trả thui*) khi bàn về chất lượng.  Câu này thậm chí nên được phát biểu thành "You can pay me now, or you can pay me a lot more later.” (tạm dịch: *Ông có thể trả tôi bây giờ, hoặc sẽ phải trả rất nhiều về sau*). Một lỗi hệ thống càng bị phát hiện muộn bao nhiêu thì sẽ càng tốn nhiều tiền để fix bấy nhiêu. Nếu lỗi sản phẩm lọt đến tay người dùng thì rất nhiều chuyện không hay sẽ xảy ra: việc update fix lỗi là chắc chắn, ta sẽ phải nhận cả tá review xấu, hay đánh mất/ sụt giảm niềm tin nhũng KH tiềm năng. 
 
# Lỗi do đâu mà ra?

Mọi công đoạn trong phát triển phần mềm đều có thể phát sinh ra lỗi: từ requirements (làm specs), design, đến coding.

Một vài thống kê đã chỉ ra có đến 50% các lỗi đến từ bước requirements. Lỗi (nhất là lỗi trong yêu cầu/ specs) mà càng chậm trễ phát hiện, thì về sau ta sẽ càng phải làm lại những phần mà đã được tạo ra dựa trên cái yêu cầu lỗi đó. 

Thiếu specs là một nguồn gây ra lỗi phổ biến. Vì thế công tác làm specs tốt là một thói quen tốt mà ta sẽ muốn đầu tư thời gian thỏa đáng.

Tốt nhất, các công ty IT nên có cách để track các lỗi kiểu này để biết được chúng đến từ đâu, từ đó có những kế hoạch cải thiện một cách tập trung hơn. 

# Làm sao để giảm thiểu những lỗi tương tự trong tương lai?

Thông qua những bài học trong quá khứ.
Có nhiều lỗi rất đặc thù, không giống với bất kì lỗi nào, chỉ đơn thuần là do lỗi của con người. Song cũng có những lỗi có chung parttern (khuôn mẫu), chẳng hạn như về kĩ thuật code chưa tối ưu, hay cách viết requirement. Với những trường hợp này, ta nên tìm những nguyên nhân gốc rễ của nó để tìm cách triệt/ hay giảm thiểu những nguồn lỗi này trước khi một lỗi được sinh ra. 

# Peer reviews - có luôn nhất thiết?

Có là tốt nhất! Peer reviews sẽ chỉ mất công một lần (nếu ta làm tốt), người được review sẽ không/ hạn chế mắc phải lỗi tương tự trong những lần sau.

Nhưng đôi khi chúng ta cũng cần đánh giá tổng quan tình hình. Nếu xác xuất xảy ra lỗi được phân tích là thấp, hoặc nếu có lỗi thì mức độ ảnh hưởng cũng rất hạn chế, thì việc cứ review cũng không hiệu quả về giá - và thời gian.

Quản lý dự án nên luôn cân nhắc về những mặt được và mất, điều gì là quan trọng tạo nên thành công, chất lượng của dự án này, để quyết định dành thời gian cho việc gì là hợp lý và thích đáng.

# Nên review nội dung gì? code? 

Xem xét ví dụ: Ta bắt được lỗi trong khâu *Testing*, lần ngược lại ta tìm ra nguyên nhân xuất phát từ specs thiếu hoặc mập mờ. Để xử lý lỗi này phải làm lại từ đầu: từ khâu design, code, rồi test lại. 

Có phải là, sẽ tốt hơn rất nhiều nếu ta có thể phát hiện lỗi này ngay từ bước code, hoặc design, hoặc xịn nhất là ngay tại bước thu thập yêu cầu phải không nào? Đồng nghĩa với việc ta sẽ không phải làm lại một mớ công việc. 

Vậy nên không chỉ review code, mà tại những khâu viết specs hay design, chúng ta cũng nên xem xét tổ chức review nữa.

# Thời gian thích hợp để review?

Nếu bạn đã và đang hay nhờ anh em review một cách chính thức, sau khi hoàn thành một Pull Request.. thì các bạn hãy thử nhờ review khi thậm chí chưa code, hoặc code rất ít nhé.

Có 2 lý do mà ta nên làm việc này.

Thứ nhất: việc review sớm giúp bạn tránh gặp phải những lỗi mang tính về hệ thống, lúc này bạn sẽ có thể nhận được những lời khuyên về cách thức xử lý. Thử tưởng tượng bạn chọn một pattern để code, được cả vài ngàn dòng, rồi có ai đó khuyên bạn nên sử dụng pattern khác... khó mà ta sẽ nghe theo người này...

Thứ hai: nó giúp chúng ta về mặt tinh thần. Khi mà bạn nghĩ một việc gì đó được hoàn thành rồi, thì bạn sẽ có khuynh hướng không muốn ai bảo nó là *chưa hoàn thành*. Con người chúng ta có cơ chế đối kháng kiểu kiểu như vậy, vì lúc đó, ta đang trong tâm thế sẵn sàng sang task mới. Và không muốn thay đổi gì cho những việc mình đã làm. Nếu chúng ta hay có tư duy như thế thì một cách đó là hãy nhờ review khi bạn chưa hoàn thành, như thế sẽ dễ dàng đón nhận hơn.