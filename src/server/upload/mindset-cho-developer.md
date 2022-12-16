*"Không sửa được kiểu này đâu"*

*"Sửa như này thì còn đâu chức năng cũ nữa"*

*"Fix bug này lại lòi ra bug kia???"*

*"Đoạn code vô dụng @#$#"*

*"Code loằng ngoằng thế này thì thêm chức năng mới kiểu gì"*

*"Sản phẩm @o bao giờ ra lò"*

*"Bỏ hết rồi viết lại từ đầu đi em ei"*


Nghe quen nhở, cứ mỗi phút thì đâu đó trên quả đất này lại có một ông dev *thở* ra một câu bất kỳ như trên. WHY?

Đây là những vấn đề muôn thuở của developer, và cũng là những câu chuyện mà mọi dev team đều trải qua.

Có rất nhiều nhân tố nhỏ nhưng lại dần dần gây hại cho project, hậu quả của chúng không thấy ngay từ đầu mà hầu hết về lâu về dài mới thấy rõ. Một số yếu tố mà bạn còn thấy chẳng có gì nguy hiểm tận hàng năm trời. Thế nên khi một ai đó trình ra thì thoạt đầu chúng có vẻ rất vô hại. Thậm chí khi bạn thực hiện còn thấy tốt cơ. Nhưng khi thời gian trôi qua, và đặc biệt ngày càng nhiều stack chồng lên nhau thì sự phức tạp càng trở nên rõ ràng và phát triển đến mức bạn cũng trở thành nạn nhân của câu chuyện kinh dị vô cùng phổ biến đó.

Để tránh làm nạn nhân, bạn nên nắm vững những quy tắc cơ bản của phần mềm. Bạn nên phát triển một mindset mà mọi developer nên có. Mindset này sẽ giúp bạn ra quyết định tốt hơn, giữ cho phần mềm đơn giản nhất có thể và tránh nó trở thành một hệ thống phức tạp và mất kiểm soát.

Dưới đây là những quy tắc chính cần lưu ý.

### 1. Nhận thức được mục đích của phần mềm
Đầu tiên bạn nên hiểu mục đích của phần mềm. Và thực tế là nó chỉ có một mục đích duy nhất: **hỗ trợ con người**

Mục đích của phần mềm không phải là thể hiện cho người khác biết bạn thông minh như thế nào.

Dev mà không nhận thức được mục đích của phần mềm sẽ viết ra phần mềm tồi. Phần mềm tồi là phần mềm như nào? Đó là một hệ thống phức tạp mà khó hỗ trợ con người.

Thế nên khi bạn ra quyết định về phần mềm thì nên hướng theo cách tiếp cận là: Nó có thể hỗ trợ được gì? Nó làm được gì? Và thậm chí bạn có thể ưu tiên những chức năng được *request* theo hướng này.

### 2. Mục tiêu của thiết kế phần mềm
Mọi lập trình viên đều là designer.

Khi phần mềm khó viết hoặc khó chỉnh sửa, developer dành phần lớn thời gian chỉ để làm cho phần mềm hoạt động, ít thời gian hơn để tập trung vào phần chức năng hỗ trợ người dùng. Thiết kế của phần mềm nên theo hướng giúp công việc của developer trở nên dễ dàng nhất có thể, nhờ đó họ có thể dành thời gian tập trung cho những điều quan trọng hơn. Bạn tạo phần mềm mà giúp đỡ được người dùng thì họ sẽ sử dụng lâu dài.

Ngược lại, nếu bạn thiết kế một hệ thống tồi, thời gian sử dụng phần mềm sẽ rất ngắn.

Tóm lại là có 2 điểm chính: thiết kế dễ cho bạn và hữu ích cho người dùng.

### 3. Hiểu nhầm
Developer mà không hiểu được công việc thì dẫn đến hệ thống phức tạp. Nó trở thành một vòng luẩn quẩn: hiểu lầm dẫn đến phức tạp, phức tạp lại dẫn đến dễ hiểu nhầm...

Một trong những cách tốt nhất để cải thiện khả năng thiết kế là chắc chắn rằng bạn hiểu hệ thống cũng như công cụ bạn đang dùng.

*Hiểu rõ hệ thống chính là sự khác nhau giữa dev tồi và dev tốt.*

Chỉ đơn giản vậy thôi.

### 4. Đơn giản

>> Đỉnh cao của tinh tế là đơn giản. ---------- Leonardo da Vinci
>> 

Lập trình là hành trình đơn giản hóa vấn đề phức tạp. Dev tồi chỉ là người thất bại trong việc giảm độ phức tạp, vậy thôi. Dev tốt thì biết cách làm mọi thứ trong khả năng để code đơn giản hơn cho các lập trình viên khác.

Dev tốt tạo ra những điều dễ hiểu và dễ check bug.

Thông thường thì developer đều là những người thông minh và chẳng ai muốn bị đối xử như một thằng ngu cả. Trớ trêu là điều này dẫn đến hệ lụy là đôi khi họ tự tạo ra sự phức tạp. Về cơ bản họ nghĩ như này:

*"Như này thì ai cũng hiểu tớ đang làm gì mất. Không được, tớ phải viết code kiểu khó hiểu tí thì bọn nó mới biết được sự lợi hại và thông minh của tớ, ahihi"*

Lỗi có thể bắt nguồn từ cách tư duy sai chứ không nhất thiết là từ việc thiếu kỹ năng lập trình. Hầu hết thất bại của việc lập trình là vì tinh thần như trên.

Thể hiện mình thông mình chẳng giúp gì được người khác cả.

Developer mới đọc code của bạn sẽ không biết điều đó, họ phải học.

Bởi vậy, bạn nên tự hỏi như sau: *"Tôi muốn mọi người hiểu đoạn code này hay tôi muốn họ khó chịu và chán nản?"*

Sự thật là nếu người khác đọc code của bạn mà thấy dễ hiểu thì chứng tỏ là bạn đang làm ổn rồi đấy.

>> Đơn giản mới là thứ liên quan đến trí thông minh, còn phức tạp thì không. ---- Larry Bossidy
>> 

Vậy đơn giản đến mức nào?

Bạn còn nhớ quy tắc này không: *KISS - Keep it simple, stupid*

### 5. Phức tạp

>> Bản chất của lập trình là kiểm soát sự phức tạp. -- Brian Kernighan
>> 

Nguồn cơn mà nhiều phần mềm thất bại chính là sự phức tạp. Bạn bắt đầu một project mà áng chừng hoàn thành trong 1 tháng. Rồi sau đó bạn thêm vào nhiều chi tiết, và mất thêm 3 tháng. Bạn lại tiếp tục thêm chức năng nhằm phục vụ các yêu cầu khác. Cuối cùng mọi thứ trở nên phức tạp chỉ vì bạn mở rộng phần mềm vô tội vạ. Task mất 6 tháng để hoàn thành.

Chưa hết. Với mỗi phần chức năng, bạn lại làm nó phức tạp hơn, lại thêm 3 tháng nữa. Sau đó nhiều bug mới sinh ra do code phức tạp quá. Đương nhiên là bạn bắt đầu fix lỗi mà không nghĩ đến ảnh hưởng của nó. Cuối cùng những thay đổi nhỏ trở nên lớn dần, và rồi bạn tự dẫn mình đến một trong những câu chuyện kinh dị nhất của thế giới lập trình: *đập đi xây lại*

Làm thế nào mà bạn lại trở thành nạn nhân của câu chuyện kinh dị đó? Hừm, ai biết. Tốt hơn thì nên hỏi: *"Làm sao để tránh được lỗi này?"*

Ồ, rất đơn giản. Đầu tiên phải biết mục đích của phần mềm. Tiếp nữa là viết code đơn giản. Thứ 3 là khi có request mới, bạn phải đánh giá dựa trên mục đich của phần mềm.

Là một developer, việc đầu tiên bạn phải làm là luôn từ chối những thay đổi không cần thiết.

Túm lại mục tiêu của bạn là kiểm soát sự phức tạp chứ không phải tạo ra nó.

### 6. Maintain
Maintain (bảo trì) là một trong những điều quan trọng nhất của phát triển phần mềm. Không may thay, develoepr thường phớt lờ tầm quan trọng này. Code nhanh trông có vẻ quan trọng hơn là maintain code. Đây là nơi họ mắc sai lầm - thiếu kiến thức về việc maintain code sau này.

Sẽ luôn có thay đổi trong việc cài đặt mã nguồn. Không chỉ là viết code, bạn còn phải maintain dài dài, nghĩ về việc bảo trì những thay đổi này chỉnh là một trong những trách nhiệm của một developer:

>> All changes require maintenance.
>> 

Đơn giản và phức tạp là hai nhân tố chính ảnh hưởng đến việc maintain. Các component càng đơn giản thì maintain càng dễ dàng. Effort dành cho maintain tỷ lệ thuận với sự phức tạp của phần mềm.

Một quy tắc mà bạn nên tuân theo khi đề cập đến bảo trì:

>> Giảm effort maintain thì quan trọng hơn là giảm effort của việc viết code.
>> 

### 7. Đồng bộ (nhất quán)
Đồng bộ là một phần trong sự đơn giản. Nếu lần này bạn làm cách này, thì lần khác với vấn đề tương tự hãy làm theo cách đó. Chẳng hạn, bạn đặt tên biến *thisIsVariable*, thì tất cả tên biến của bạn nên đặt theo cách đó (*otherVariable*, *anAnotherVariable*, ...)

Code không đồng bộ sẽ rất khó hiểu. Đừng bắt developer phải học lại hệ thống mỗi lần họ đọc một đoạn code mới.

### 8. Ưu tiên
Bạn ra quyết định về phần mềm như thế nào?

Khi bạn đối mặt với nhiều cách giải quyết, làm sao để chọn được giải pháp tốt nhất? Bạn nên cài đặt chức năng nào, nên focus vào phần nào?

Để trả lời cho những câu hỏi trên, có 3 nhân tố quan trọng sẽ giúp bạn ra quyết định tốt hơn.
* Nhu cầu thay đổi: bạn muốn thay đổi chức năng này nhiều đến mức nào?
* Lợi ích của việc thay đổi: thay đổi chức năng có mang lại lợi ích gì cho người dùng?
* Effort cho việc thay đổi: khối lượng công việc cho sự thay đổi này?

Nhu cầu thay đổi tỷ lệ thuận với lợi ích và tỷ lệ ngịch với effort.

Khi bạn muốn sắp xếp mức độ ưu tiên trong công việc, bạn nên theo quy tắc sau:

>> Thay đổi mang lại nhiều giá trị và tốn ít công sức thì tốt hơn những cái ít giá trị và tốn nhiều công sức.
>> 

### 9. Giải quyết vấn đề
Đầu tiên là phải hiểu vấn đề. Vấn đề khó là vì bạn không hiểu nó. Viết vấn đề bạn vương phải ra giấy và thử giải thích cho người khác.

Bước thứ 2 là lập kế hoạch. Đừng hành động vội. Hãy dành thời gian để phân tích vấn đề và xử lý thông tin nhưng cũng đừng dành quá nhiều thời gian chỉ để lập kế hoạch.

**Nghĩ trước khi làm**

Bước thứ 3 là chia vấn đề lớn thành các vấn đề nhỏ hơn, dễ giải quyết hơn.

### 10. Tốt là đủ

>> *"Hoàn hảo là kẻ thù của tốt." -- Voltaire*
>> 

Dù là tạo project mới hay là thêm chức năng mới đến hệ thống đã có, developer thường có xu hướng lên kế hoạch mọi thứ chi tiết từ ban đầu. Họ muốn phiên bản đầu tiên phải hoàn hảo. Họ không tập trung vào vấn đề cần giải quyết. Thực ra họ còn chẳng biết cái gì đang đợi mình và chi phí cho việc theo đuổi *sự hoàn hảo*.

Để tôi cho bạn biết những gì sẽ xảy ra:

* Bạn viết code thừa, không cần thiết
* Bạn tăng sự phức tạp bằng code thừa
* Bạn viết quá chung chung
* Bạn không kịp deadline
* Bạn gặp nhiều bug vì code phức tạp

Vậy bạn nên làm gì?

*Start small, improve it, then extend.*

### 11. Dự đoán
Khi đối mặt với sự thật rằng code sẽ thay đổi trong tương lai, nhiều developer chọn cách là áp dụng một giải pháp tổng quát cho mọi tình huống có thể xảy ra trong tương lai.

***Quá tổng quát sẽ dẫn đến nhiều đoạn code không cần thiết.***

Bạn không thể dự đoán tương lai, thế nên cho dù giải pháp của bạn có tổng quát cơ nào thì cũng không đủ để thỏa mãn những yêu cầu mà bạn sẽ có trong tương lai.

Tốt nhất là đừng dự đoán gì cả, còn nhớ *KISS* chứ, giờ tôi gửi bạn một quy tắc nữa: *YAGNI - You Ain't Gonna Need It*

### 12. Automation
Đừng dành nhiều thời gian với những task lặp đi lặp lại, nếu có thể tự động thì hãy luôn tự động hóa mọi thứ.

### 13. Code measurement
Nhiều developer đo chất lượng phần mềm dựa theo số dòng code. Họ nghĩ rằng càng nhiều code có nghĩa là họ đang làm tốt. Phần mềm mà có hàng trăm nghìn dòng code có nghĩa là phần mềm lớn.

Câu hỏi đặt ra là nó có thật sự lớn không, có gì đó sai ở đây hay không?

Câu trả lời hầu như là có gì đó sai trong cách thiết kế. Những giải pháp đơn giản thì khong cần nhiều code.

Tôi cũng không có ý nói rằng ít code thì luôn luôn là tốt. Bạn có thể rơi vào cái bẫy cố gắng viết ít code, dẫn đến khó hiểu cho người khác. Tốt hơn hết là phải học cách cân bằng.

Một đoạn code tối ưu là đoạn code dễ hiểu, dễ đọc.

### 14. Tính hiệu quả
Bạn đo lường mức độ hiệu quả như thế nào?

Bằng cách viết nhiều hơn hay là ít hơn?

Mục tiêu của bạn nên là giữ đoạn code bé nhất có thể. Một câu hỏi hợp lý hơn nên là làm sao để bỏ bớt code đi.

### 15. Estimate
Developer thường có xu hướng estimate ít hơn so với thời gian họ thực sự cần, điều đó dẫn đến việc họ thường bị chậm deadline.

Giải pháp là chia nhỏ vấn đề ra, càng nhỏ thì càng dễ estimate. Tất nhiên là bạn sẽ vẫn estimate sai thôi, nhưng rõ ràng là ít sai hơn nếu bạn estimate nguyên một project lớn.

Ghi nhớ:

***Mọi thứ mất nhiều thời gian hơn bạn nghĩ.***

### 16. Docs và comment
Một trong những nhầm lẫn tai hại về comment là developer thường thêm comment để mô tả đoạn code này đang làm gì. Điều này hoàn toàn sai. Mục đích sẽ được hiểu rõ khi người khác đọc code, nếu họ không hiểu được thì chứng tỏ bạn viết chưa đơn giản.

Khi bạn không thể viết code đơn giản hơn thì bạn mới nên thêm comment để giải thích tại sao lại phải viết phức tạp như vậy.

Mục đích của comment là giải thích tại sao bạn làm thế, chứ không phải bạn đang làm gì. Nếu bạn không giải thích thì lập trình viên khác có thể bị nhầm lẫn và khi họ sửa code có thể họ sẽ xóa mất phần quan trọng đi.

Về docs, tốt hơn hết là nên có docs để trình bày về kiến trúc phần mềm và những module cũng như component của nó. Điều này nhằm nhìn bức tranh tổng quát về phần mềm của bạn. Khi một developer mới join team, họ sẽ dể hiểu và dễ tiếp cận hệ thống hơn.

### 17. Don't be a hero
Chẳng hạn, bạn nghĩ task này làm mất 2 giờ. Nhưng sau 4 giờ bạn vẫn chỉ đi được 1/4 chặng đường. Bản năng tự nhiên là nghĩ, *"Nhưng tớ không thể bỏ cuộc được, tớ đã mất 4 giờ cho nó cơ mà!"*. Rồi xong, bạn bật *hero mode*, và quyết tâm làm cho nó chạy và tất nhiên là nó chả chạy.

Hãy biết khi nào nên từ bỏ và đừng ngại khi nhờ giúp đỡ.

### 18. Đừng hỏi mà hãy nhờ giúp đỡ
Khi bạn code mà không chắc chắn lắm về giải pháp, đừng hỏi người khác cách làm ... ít nhất là không hỏi ngay. Thay vì đó hãy thử mọi thứ và mọi cách bạn có thể nghĩ ra.

Khi bạn không nghĩ được nữa thì *search*. Tìm câu trả lời và thử, chỉnh sửa và tự đọc xem có hiểu được hay không.

... nhưng hãy nhớ là luôn luôn tìm kiếm những lời khuyên.

Khi bạn đã thử hết cách rồi thì đây là lúc tốt nhất để tìm lời khuyên. Hỏi đồng nghiệp hoặc pro trong công ty review code.

OK, thanks for reading mah friend.....

Nguồn: [https://medium.freecodecamp.org/learn-the-fundamentals-of-a-good-developer-mindset-in-15-minutes-81321ab8a682](https://medium.freecodecamp.org/learn-the-fundamentals-of-a-good-developer-mindset-in-15-minutes-81321ab8a682)