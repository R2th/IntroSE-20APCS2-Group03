Với anh em dev thì chuyện Pull Request và review là chuyện hằng ngày như cơm bữa. Mục đích của review code thì ai trong chúng ta cũng biết, code đẹp, nâng cao chất lượng output ,
anh em new dev được nâng cao kiến thức kĩ thuật...Trong bài viết hôm nay , chúng ta sẽ cùng đề cập đến communication khi review code và cách review code làm sao đạt hiệu quả nhất 
# 1.	Kỹ năng communication cần thiết cho dev 
 Lập trình viên không đơn giản chỉ là âm thầm viết code, mà cần thiết phải có năng lực communication . Năng lực communication được hiểu như một kỹ năng có khá  trừu tượng nhưng nếu xét trong  hoàn cảnh và mục đích nhất định  , chúng ta đều có thể học một cách cụ thể . Trong bài viết này, hoàn cảnh cụ thể là review code . Ở hầu hết các môi trường, công ty phát triển , đều sử dụng Pull request của GitHub  và tiến hành review code của member . Đối với một người lập trình viên , thì có thể nói rằng  kỹ năng communication chiếm tỉ trọng khá cao 
 
Dựa vào đặc trưng  mỗi công ty , của từng team , ở mỗi ngôn ngữ  mà  có những  văn hoá communication review code  khác nhau. Do đó , hoàn toàn không có rule nào là đúng cả nhưng với những người lập trình viên trẻ  thông qua đó có thể tham khảo cách làm khi bắt đầu tham gia  cùng đội phát triển  
# 2.	Nâng cao level thông qua những lần  review 
Điều đầu tiên mà mọi người nghĩ đến đó là mục đích review code là gì ?

Đó là phát hiện ra bug , nhanh chóng fix bug sớm . Để làm được như thế thì chúng ta phải hiểu được đoạn code viết gì , tìm ra được những chỗ không ổn ,có khả năng gây ra bug .
Tuy nhiên, mục đích của review code không chỉ như vây. Mà nó còn cùng trao đổi kiến thức lập trình, chỗ này nên xử lý theo kiểu A , chứ không phải kiểu B ….
Đó là cách nâng cao skill lập trình của từng người trong team , nâng cao chất lượng sản phẩm . Do vậy, không chỉ đơn giản  là chỉ ra những chỗ thiếu sót, bug mà thông qua communication hợp lý, cần phát huy tinh thần teamwork .

Vậy khi pull request /review chúng ta cần chú ý những điều gì 
# 3.	Khi PR
Khi pull request mà chỉ comment  là [Đã thực hiện ABC] thì với người review là quá ít thông tin để hiểu và reivew   code . Khi nào review, tại sao cần đoạn code này … khá nhiều thông tin bị thiếu. Do đó để giúp cho người review nhanh chóng hiểu mục đích, độ quan trọng của task thì chúng ta cùng thực hiện comment code theo template  5W1H bên dưới 

**•	When**   

* Khi nào cần reivew 
* Ngày dự định release 

**•	Where**

* Phạm vi chỉnh sửa, update
* Các bước tái hiện bug 

**•	Who**
*    Phần chỉnh sửa này liên quan đến những ai 
 
**•	What**
*  Đứng trên quan điểm user thì có cái gì thay đổi 
*   Đứng trên quan điểm của người phát triển thì có cái gì thay đổi 

**•	Why**
 *  Lý do chọn cách này để giải quyết 
 
**•	How**

*	Bổ sung phương pháp thực hiện 
    
   
Bằng cách comment theo trật tự như trên sẽ khá hiệu quả trong việc đẩy nhanh tốc độ review. Ưu điểm của phương pháp này là trước khi đọc code người review đã có một image  toàn thể về nội dung xử lý của PR. Trong trường hợp có nhiều cách xử lý sẽ không cần lặp lại các câu hỏi kiểu dạng tại sao lại lựa chọn cách này …

### Bày tỏ suy nghĩ với  những đoạn code  thấy bất ổn 

Với những đoạn code, những phần setting  cảm giác thấy bất ổn hãy yêu cầu sự support từ những người có kinh nghiệm 。Nếu cứ để nguyên phát triển theo phương pháp không được chi tiết , rõ ràng  thì khả năng phải phát triển , làm lại là khá cao 。Trong thực tế, với bất kì ai cũng có những case không thể giải quyết được  vì vậy không có gì đáng xấu hổ mà không hỏi cả . 
Khi đó,trong comment hãy trình bày rõ lý do và phần xử lý mà bản thân thấy có vấn đề .

**•	Trình bày phần thấy bất ổn**

*	Function này  vì viết không được đẹp  nên muốn có lời khuyên 
*	Cần ý tưởng cho những phần xử lý phức tạp  

**•	Lý do tại sao lại thấy xử lý có vấn đề**

*	Có một số phương pháp nhưng không thể đưa ra phương pháp nào  là tốt nhất trong số đó 
* 	Đưa ra ưu điểm, nhược điểm cho mỗi phương pháp 

Với cách thể hiện mong muốn được giải quyết vấn đề  theo teamwork   kiểu như trên thì sẽ tạo đươc thái độ dễ dàng hợp tác, dễ dàng đưa ra ý kiến từ các member khác 

### Pull Request thay đổi thì nhỏ nhưng tần suất là khá lớn 

Trong quá trình team  phát triển thì  phạm vi của Pull Request tuy là nhỏ nhưng tần suất thì càng tăng lên .  Trong trường hợp 1 Pull Request lớn hàng  mấy chục file thì time review sẽ rất lớn 。Trong trường hợp review trên 100 dòng code thì khả năng tập trung đã giảm , nên cũng rất hay dẫn đến tình trạng sót bug 。Do đó , nên Pull những PR nhỏ, giảm tải lượng review 、review chi tiết từng tí một , đến đâu chắc đến đó là một phương án hay 。Nếu phân chia  một PR khoảng 10 dòng code thì tốc độ review cũng nhanh hơn, cũng sẽ nhanh được meger hơn 。

Một điều nữa là , setting khoảng thời gian ngắn để đưa ra PR。Trong nhiều trường hợp chúng ta phải đưa ra quyết đinh ngày release , nếu quyết định muộn thì cả team sẽ thuường phải đổ xô vào cover。Trong tình huống này, nếu người chịu trách nhiệm làm task đó 3 ngày mới PR 1 lần thì khi họ vắng mặt 、thì sẽ không nhìn thấy nội dung phát triển trong 3 ngày đó 、để member khác cover phần chậm trễ đó là rất khó khăn. 

Tóm lại ,nếu đưa PR theo mỗi task theo số giờ không quá dài thì tiến độ đấy member khác đều nhìn thấy được nên việc cover không quá khó khăn 。Ngay cả trong trạng thái tất cả code đang là WIP (Work in Progress) thì cũng nên PR 。Làm như thế này theo kiểu trực quan hoá tiến độ và nội dung phát triển , thì các member khác cũng dễ dàng   support trong trường hợp khẩn cấp .

# 4. Khi review
Tiếp tục, chúng ta cùng tìm hiểu những điểm lưu ý khi review code .Những đoạn code nguy hiểm , dễ gây bug , thông qua review sẽ được  cải thiện .Tuy nhiên, nếu không chú ý khi comment review code dễ gây cảm giác cho người được review là đang bị soi mói, bới lông tìm vết 

### Review code không mang nghĩa tiêu cực là soi mói 

Điều kiện tiền đề đầu tiên phải hiểu rằng mục đích review là sự hợp tác của nhiều người để đưa ra chất lương code tốt nhất có thể 。Chứ không phải là soi mói, mệnh lệnh bắt buộc phải thực hiện 。Cần chỉ ra những đoạn code chưa hợp lý để cải thiện nhưng  không phải là thể hiện ý kiến chủ quan mà hãy truyền đạt theo hướng khách quan .

Bên dưới là một ví dụ .

**Bad**

> Đoạn xử lý này khó hiểu, có nhiều đoạn code phức tạp giống nhau .
> Hãy sửa lại 
> 
Trong ví dụ này , ngừoi đọc sẽ không hiểu cụ thể là cần cải thiện  cái gì 。Những cụm từ  ‘khó hiểu’, ‘phức tạp’ , ‘sửa’  là những từ biểu hiện có tính áp lực trên mức cần thiết 。Đối với những người phát triển đang còn non trẻ  thì sẽ có cảm giác bị khó chịu  không hề nhẹ .

**Good**

> Về phần xử lý , phần xử lý lồng nhau khá sâu dẫn đến sẽ mất nhiều time xử lý . Hãy thử check lại  lại để sau này phần xử lý này maintain được đơn giản hơn. Tôi nghĩ là có thể cải thiện các phần code giống nhau .
> 
Với đoạn comment trên  đã nêu cụ thể ra điểm cần phải cải thiện .Cùng với cách sử dụng những từ positive ,  cách comment này giúp  người đọc  hiểu là  không phải mệnh lệnh là phương án đề xuất để sửa chữa . 

Với cách comment này thì sẽ khá mất thời gian .  Bản thân chúng ta vì không có nhiều thời gian nên hay giữ thói quen comment theo cách không tốt như bên trên . Tuy nhiên nêu cứ duy trì cách comment này , thì nó sẽ làm cho member cảm giác code của mình đang bị soi mói, lặp đi lặp lại nhận feedback  tiêu cực thì  motivation của không chỉ người review mà cả người đc review cũng bị đi xuống .
Review code là communication hằng ngày , nên nếu cứ  dùng mãi những từ ngữ negative thì ngay chính bản thân mình cũng negavite theo. Thế nên , dù ko có thời gian chúng ta cũng tự tạo thói quen communication theo hướng positive .

### Vấn đề  là code khó hiểu chứ không phải con người 

Với người review thì code là đối tượng review chứ không phải con người 。Do đó khi comment chúng ta phải tránh dùng từ để hiểu nhầm thành đang công kích đối tượng viết code .

**Bad**

> Code của anh A  khá nhiều biến state  sau này khó maintain 
> 

**Good**

> Khi biến state khá nhiều thì rất khó để maintain . Nên hãy  cùng tìm hiểu một phương pháp tốt nhất 
> 

Đây có thể là điều chú ý mà mọi người nghĩ là không cần thiết  vì có thể với những người có kinh nghiệm  lâu năm , level cao họ không cần thiết nghĩ  hay quan tâm chi tiết đến như vậy.
Tuy nhiên, trong môi trường phát triển của chúng ta  level kỹ thuật, kinh nghiệm khác nhau cũng có những member không có sự tự tin  ở bản thân mình.Mỗi ngày đều comment, nhận comment review code nếu nhận đươc sự ủng hộ , hơp tác của mọi người thì sẽ nâng cao sự tự tin đồng thời kéo tinh thần team work của cả team lên.

### Trình bày rõ độ ưu tiên với các comment cần xử lý 

Khi review, có thể phát hiện ra những bug  lớn, cũng có thể phát hiện ra những miss indent vặt vãnh .Nếu đề tất cá các bug này độ ưu tiên  xử lý  ngang nhau sẽ không hiểu là cái nào quan trọng 。Do đó ở mỗi comment , chúng ta có thể gán nhãn dưới đây, khi đó thông qua các nhãn sẽ hiểu comment này nhất định phải sửa, comment nào  có thể không sửa cũng được .

*	must：cần phải thay đổi 
*	imo：ý kiến cá nhân đề xuất （in my opinion）
*	nits：các lỗi nhỏ （nitpick、soi sét các điểm nhỏ ）

### Với những phần yêu cầu xử lý khó mà bản thân chưa hiểu thì nên đặt câu hỏi .

Sẽ không có ít trường hơp bản thân người review code không hiểu những đoạn xử lý  phức tạp dẫn đến việc review khó khăn 。Trong trường hợp này, tốt nhất nên đặt câu hỏi cho người code 。 Người review không hiểu có nghĩa là sau này sẽ khó thực thi công đoạn maintain 。Ngay cả bản thân nội dung code không vấn đề gì  thì vẫn cần đặt câu hỏi cho những đoạn mà mình thấy có vấn đề  , để hiểu sâu về cách xử lý, giúp bản thân người review cũng hiểu hơn về dự án .


# 5.	Không nhất thiết phải sửa  tất cả review

 Sau khi nhận comment review  chúng ta sẽ update lại theo  nội dung comment 。Những  điểm cần cải thiện thì đương nhiên cần sửa nhưng không có nghĩa là phải sửa tất cả các comment 。Không phải tất cả comment của người review đều đúng . Do đó trong trường hợp đang đuổi theo dealine , thì phải bỏ qua những phần không cần thiết update.
Nếu không suy luận mà cứ sửa toàn bộ theo comment thì chưa chắc đó phải là cải thiện chất lượng code 。Dựa trên quan điểm khách quan , hãy tích cực trao đổi với người review, để không chỉ đưa ra một chất lượng sản phẩm tốt nhất mà còn nâng dần kỹ năng bản thân .


**Source**

https://employment.en-japan.com/engineerhub/entry/2018/01/24/110000#%E9%96%A2%E9%80%A3%E8%A8%98%E4%BA%8B