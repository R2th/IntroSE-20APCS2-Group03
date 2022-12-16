# Mở đầu
6 tháng gần đây, tôi chính thức join 1 team phát triển sản phẩm. Công việc hàng ngày: code và gửi pull request.
Trong quá trình làm việc, tôi được các anh em trong team chỉ daỵ rất nhiều: từ những phần kiến thức cơ bản cho đến những phần áp dụng được vào task...v.v
Thông qua việc review code, tôi nhận được các quan điểm đa chiều của các anh em. Việc này giúp tôi học hỏi rất nhiều.

Tuy nhiên, cũng phải nói thật là: Vì là ma mới, chân ướt chân ráo vào nghiệp coder, nên tôi cũng bị ăn hành nhiều lắm. Có những review rát đến mức, đã để lại trong tôi những vết thương không thể chữa lành.
Tất nhiên những review đó hoàn toàn không có ý xấu. Chỉ là, do khoảng cách skill một trời một vực giữa reviewer và tôi - newbie, nên mới vô tình sinh những comment như vậy.  
Từ kinh nghiệm của bản thân mình, trong bài viết này tôi đã đúc rút, tổng hợp lại những cách comment, giao tiếp có thể gây tổn thương, làm giảm sự tự tin của các bạn lập trình viên mới vào nghề.
Hy vọng rằng, bài viết này sẽ phần nào có ích trong việc training new dev.
![](https://images.viblo.asia/1ec8b855-22df-4260-af18-cc61c552b3c1.png)

# Điều kiện tiền đề
Đối tượng của bài viết này là「New dev」- tức là những người có dưới 1 năm kinh nghiệm làm việc trong dự án.

Túm lại là những bạn như sau: Đã có kinh nghiệm lập trình mang tính cá nhân (tự mò tự học, tự code) nhưng vừa mới tốt nghiệp, chưa có kinh nghiệm khi làm việc với team; những bạn intern; những bạn sinh viên tốt nghiệp chuyên ngành không phải CNTT nhưng đã trang bị cho mình kĩ năng lập trình...v.v

Lưu ý
※ Cách tiếp nhận review: sẽ có sự khác biệt tùy theo từng cá nhân.

※ Các ví dụ về review trong bài viết này đều là fiction (giả tưởng).

※ Các ví dụ trong bài viết không liên quan tới tổ chức mà người viết đang trực thuộc.

※ Tuyệt đối các bạn không được dùng các ví dụ xấu trong bài viết này.

# Những kiểu review/comment code dễ gây tổn thương
Nếu người review hay dùng những câu như dưới đây thì new dev đi đời rồi.
![](https://images.viblo.asia/6d2e2768-8825-4586-b4c4-ccce67c2c523.png)


## Ném cho new dev tài liệu official
Với cá nhân tôi, thì đây là cách review (commet) gây sát thương cao nhất - gây vết thương chí mạng.

> Trong tài liệu official này có ghi chi tiết về Controller, em tham khảo rồi sửa nhé.
https://readouble.com/laravel/5.7/ja/controllers.html

Nội dung review thì chính xác rồi, không có sai sót gì. Tuy nhiên điểm chí mạng của cách review này nằm ở chỗ:
Đối với reviewer, những điều ghi trong tài liệu hiển nhiên đọc là phải hiểu được. Tuy nhiên với new dev thì việc đọc hiểu nội dung là cả 1 vấn đề.

Lý do: trong tài liệu chính thức thường chỉ mô tả những trường hợp cơ bản. Còn việc áp dụng nội dung ghi trong đó vào bài toán thực tế thì khó hơn nhiều.

Ngoài ra, do new dev thường không nắm bắt được tổng thể của framework, nên dù có bảo họ đọc 1 điểm trong tài liệu, thì họ cũng chả hiểu gì cả.
Với những trường hợp này, trong thực tế thường thì new dev sẽ nói rằng "Vâng, em sẽ đọc và cố gắng ạ" và tự mình tìm tòi thêm. Với cách này, nếu bản thân new dev học được và tiến bộ thì tốt quá rồi. Tuy nhiên trong đa số các trường hợp, họ vẫn không hiểu, gây lãng phí thời gian cần thiết.

Vì vậy, các anh các chị reviewer ơi, xin hãy bỏ ngay việc: Ném cho new dev đống tài liệu gọi là: official document đi ạ (please)


### Ví dụ về cách cải thiện
> Trong tài liệu này có ghi chi tiết về Controller. Chúng ta cùng đọc và sửa nhé.
> https://readouble.com/laravel/5.7/ja/controllers.html

Việc tạo thói quen đọc tài liệu official là rất tốt, nhưng ở giai đoạn đầu, tôi nghĩ sẽ tốt hơn nữa nếu training new dev theo cách: Vừa cùng pair programming, vừa chỉ dạy "cách đọc tài liệu"

## Comment vô tâm

Việc comment vô tâm rất có hiệu quả trong việc làm new dev tụt mood. Lưu ý, đôi khi việc comment vô tình này chỉ đơn giản là "tai nạn" thôi.
Ví dụ
> Anh chưa từng biết có cách viết như này luôn. Chú tham khảo từ đâu thế?
> <a link="example.co.jp" target="_blank">
 
Haizz, trong ví dụ này, việc đưa ra đoạn code  <a href="example.co.jp" target="_blank"> thì đúng rồi, nhưng có lẽ do reviewer không để ý, nên thành ra câu cú như vậy.

Tuy nhiên,  việc comment vô tình như vậy dễ khiến cho new dev bị tổn thương. Cá nhân tôi nghĩ rằng: reviewer nên chỉ rõ lỗi cho new dev được biết.

Nếu cứ tiếp tục cách viết review như vậy, tôi e rằng reviewer sẽ khiến cho new dev trở nên cực kỳ sợ thất bại. Việc "khiến cho new dev ý thức được lỗi của mình" nên được áp dụng ở mức độ vừa phải.

### Ví dụ về cách cải thiện
    
> Tag a không có thuộc tính link, nên dùng <a href="example.co.jp" target="_blank"> mới đúng. Các thuộc tính khác của tag a đã được tổng hợp tại tài liệu dưới đây. Khi viết code em hãy tham khảo nhé.
> https://developer.mozilla.org/ja/docs/Web/HTML/Element/a

Trong ví dụ trên, reviewer vừa làm rõ lỗi của new dev, vừa chỉ cho new dev cách thức để tránh tái diễn lần sau => Đây là kiểu comment giúp new dev học hỏi được rất nhiều.

Bản thân tôi nghĩ rằng: "Cách review giúp new dev không gây ra lỗi tương tự" sẽ tốt hơn "cách review giúp dev nhận thức được lỗi lầm của mình"

## Em đã check kĩ chưa?
Dù đã check rồi, nhưng vẫn có những lúc phần mình check chưa được đầy đủ. Lúc ấy mình chỉ biết nói rằng "Em xin lỗi, em vẫn chưa check kỹ".
Ví dụ
> Về việc implement phần này, em đã check cẩn thận chưa vậy? Hình như vẫn có phần cần phải xem xét lại đấy.
> const xyz = Object.assign(xy, {z: 3})

Đối với new dev, khi gửi 1 pull request chắc chắn họ cũng đã cố hết sức trong khả năng của mình để check kỹ rồi.
Reviewer chỉ đơn giản hỏi 1 câu "đã check chưa?" - không có thêm manh mối nào, thì dù new dev có điều tra, tốn thêm thời gian tìm hiểu thì cũng chưa chắc đã đưa ra được câu trả lời.

Tương tự như vậy, việc bị hỏi "Em đã search google chưa?" cũng dễ gây cho new dev bị down tinh thần.
Lúc bị hỏi như vậy, new dev sẽ bị hoang mang: không biết nên check phần nào, nên google cái gì..v.v. 


### Ví dụ về cách cải thiện
> Object.assign là một hàm hủy, vì vậy sau này sẽ không thể sử dụng giá trị xy ban đầu được.
> Tham khảo：https://qiita.com/yujilow1220/items/978b811a9910a9516bb4
 . Tôi nghĩ là nên kết hợp với toán tử spread - phần đã được thêm vào  ES2018 thì hay hơn.
> const xyz = {...xy, z: 3}

Nếu code vẫn chạy, nhưng có vấn đề trong chất lượng code sẽ rất khó để check.
 Đầu tiên, reviewer cần nắm được thực lực của new dev để có thể đưa ra các review, comment khuyến khích new dev trưởng thành hơn.

# Review mang tổn thương mức độ vết xước

## Mở rộng phạm vi của Pull request
Sẽ thật tuyệt vời nếu sau khi gửi pull, pull đó sớm được merge. Và sẽ khá là khó chịu nếu bạn bị yêu cầu mở rộng phạm vi sửa.

> Do phần này được dùng chung trong phần danh sách các sản phẩm, nên em có thể sửa luôn giúp anh được không?

Tôi hiểu mong muốn "vì tiện nên sửa luôn" này của reviewer. Tuy nhiên nếu phần sửa không ảnh hưởng tới chất lượng code, thì các bạn nên tổng hợp vào thành issue, rồi sửa trong một pull request khác.

Trong 1 pull request, nếu bị dây dưa sang nhiều ngày chỉ để lặp đi lặp lại việc review & sửa comment sẽ khiến cho tinh thần của new dev đi xuống.

Việc chia nhỏ pull request, và được merge nhiều lần, sẽ giúp new dev đạt được các archivement (thành quả), tăng thêm sự tự tin, giúp nâng cao motivation của new dev.
    
### Ví dụ về cách cải thiện
> Tôi nghĩ là phần này có thể dùng chung với phần trong màn danh sách sản phẩm, nên đã tổng hợp vào thành 1 issue.  Sau khi merge xong pull này, nhờ em làm tiếp phần kia nhé.

Hãy cố gắng để tăng số pull request lên. Điều này sẽ giúp new dev tăng cảm giác đạt được thành quả hơn.


## Đưa ra những thuật ngữ khó hiểu
Lập trình là một ngành đặc thù, nhiều từ chuyên môn nên sẽ có trường hợp: New dev không hiểu bạn đang nói về vấn đề gì.

> Để đảm bảo chất lượng code, hãy bỏ magic number ra khỏi hằng số đi. Ngoài ra, file này khá trừu tượng, nên hãy đào sâu thêm 1 tầng nữa.
> 
Ui ông anh này đang muốn nói cái gì vậy? Tôi chả hiểu gì cả.

Những review như này, người đọc có thể lờ mờ hiểu được và tiếp tục làm task. Nhưng cũng nhiều trường hợp, new dev hiểu sai ý, dẫn tới sửa bị sai.
Vì vậy, reviewer nên sử dụng các cách viết đơn giản, dễ hiểu. Điều này sẽ có hiệu quả cho đôi bên: người review và người nhận review.

### Ví dụ về cách cải thiện
> Để dễ đối ứng trong trường hợp có thay đổi, thì chúng ta cần tránh magic number - nhập số trực tiếp. Hãy set hằng số rồi sử dụng nhé. Ngoài ra, file này cũng đang được dùng trong trường hợp đặc thù, nên hãy tạo directory "profile" rồi đặt vào đó nhé.
>     
Tuy review có hơi dài một chút, nhưng việc đánh giá cần sửa gì sẽ clear hơn nhiều so với việc comment lòng vòng.

Các từ như magic number...v.v, cần phải giải thích ý nghĩa trong lần đầu tiên, thì người đọc sẽ dễ hiểu hơn.
 giống như bạn hội thoại vậy, trước tiên phải giải thích qua ý nghĩa thì về sau khi lặp lại từ này, người nghe sẽ dễ hiểu hơn.
    
##     Các vấn đề cần xem xét trước khi review
Sẽ có nhiều người nghĩ là: Có mỗi việc review thôi mà, có cần tốn công tốn sức đến vậy không? Why so serious?
    
 Tất nhiên, nếu trước khi review, bạn đã nói chuyện, trao đổi với new dev rồi, thì không có vấn đề gì. Về mặt tâm lý, newdev cũng sẽ cảm thấy yên tâm khi đọc review của bạn.
 Khi đọc review, dù ít nhiều cảm thấy khó chịu, nhưng nhờ có giao tiếp trực tiếp, new dev cũng sẽ ít bị chịu áp lực về tinh thần hơn.  

Tuy nhiên chắc chắn cũng sẽ có những công ty mà việc chào hỏi giao tiếp với người mới đều diễn ra qua các kênh chat, giao tiếp với nhau bằng text, message.
Trong trường hợp này, new dev sẽ không nắm bắt được bầu không khí giao tiếp, style làm việc của những người đồng nghiệp của mình. Trong môi trường chưa quen thân nhưng phải tiếp cận với những kỹ thuật mới. Điều này sẽ khiến cho new dev cảm thấy bị áp lực.

Sẽ có người nghĩ theo kiểu:「Tôi muốn các bạn newdev có thể học được những cái mới, dù gian khó nhưng từ đó các bạn sẽ trưởng thành hơn」
Tuy nhiên, quá nhiều áp lực sẽ khiến cho người mới từ bỏ, bỏ việc. Kết cục là, team bạn, công ty bạn bị thiếu người, tình trạng sẽ còn thảm hơn.

# Kết bài
   Hy vọng bài viết sẽ giúp các bạn teamlead, các bạn đã làm dự án lâu sẽ có được bài học cho riêng mình khi review code.
Hy vọng các bạn new dev sẽ không vì những review code mà down mood. 
Hãy cùng nhau cố gắng để đạt được win-win "Dev cũ đỡ bận - dev mới trưởng thành"
    
    
   Link bài gốc: 
    
    https://qiita.com/hiraike32/items/32840b11536fa1b78621?utm_source=Qiita%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9&utm_campaign=68a75e9155-Qiita_newsletter_472_07_28_2021&utm_medium=email&utm_term=0_e44feaa081-68a75e9155-33433141