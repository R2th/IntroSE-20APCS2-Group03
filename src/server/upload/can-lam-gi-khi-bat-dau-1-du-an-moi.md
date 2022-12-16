![](https://images.viblo.asia/b25b572b-459a-49c0-b897-ffdb7d6be8e8.jpg)

## Lời nói đầu
Chào mọi người mình là một dev còn trẻ mới loanh quanh 1 năm kinh nghiệm gõ phím dạo. Có lẽ nghe tới đây thì mọi người sẽ nghĩ "thằng dev non tay này thì biết gì mà phán về kinh nghiệm này nọ" :D kể cũng đúng nhưng dưới đây là một số điều nên làm khi bắt đầu join vào một dự án mới do cá nhân mình đúc rút được sau khi tham gia một vài dự án thực tế, tất nhiên đã là "cá nhân" thì nó sẽ mang tính chủ quan nhưng mình hy vọng nó sẽ có ích và nếu có gì chưa hợp lý các bạn có thể cùng chia sẻ bằng cách comment xuống phía dưới nhé!
## 1.Vòng khởi động 
>  Nhất quan hệ, nhì tiền tệ

Người ta hay có câu "nhất quan hệ, nhì tiền tệ", điều đó vẫn đúng khi bạn là 1 dev. Ngày mới ra trường công việc đầu tiên, dự án đầu tiên mình được add vào với thái độ của một dev ngây thơ trong sáng chưa trải sự đời, sau khi được add vào dự án mình lằng lặng bê máy đến khu vực team dự án lằng lặng lắp máy lằng lặng kéo code, build môi trường có lỗi lại lằng lặng fix =)) nghe tự kỷ thật sự sau này mình nhận ra đó là một sự thiệt thòi lớn. Phát triển phần mềm hay bất cứ công việc nào đòi hỏi teamwork thì việc đầu tiên cũng cần phải bắt đầu từ việc xây dựng mối quan hệ với mọi người trong team để ít nhất biết công việc của người A trong team là gì, khi cần hỏi vấn đề B thì mình cần liên hệ với ai... và ở dự án đầu tiên này mình cũng đc nghe một câu "em có giỏi thì cũng không thể tự mình biết hết tất cả, mà em phải quen được nhiều người biết nhiều thứ như thế thì task nào em cũng làm được" túm lại theo cá nhân mình khi bắt đầu một dự án bạn nên bắt đầu bằng 1 câu chào, và hãy thể hiện sự hòa đồng của mình với mọi người trong team, chúng ta đã cùng nhau làm việc cũng học tập ở nhau vậy nên "người đừng lặng im đến thế" =)) 

## 2. Vượt chướng ngại vật
> Chớ nên bắt tay ngay vào code

Chúng ta à ai? chúng ta là dev, dev thì phải làm gì? code! code! code! thôi thế là toang. Chớ nên bắt tay ngay vào code hay cố gắng đọc hiểu code. Hầu như khi mới được add vào dự án các anh PM, leader cũng sẽ nói chuyện riêng với bạn sơ qua về dự án, các tài liệu về dự án và cho các bạn một chút thời gian khoảng vài ngày đến một tuần tùy vào dự án điểu tìm hiểu tổng quan về dự án (không phải để code) hãy tận dụng thời gian đó xem qua một lượt về các tài liệu bạn không cần hiểu hết nội dung bên trong nhưng hãy đảm bảo bạn biết khi muốn tìm spec thì đến đâu, Q&A thì tìm ở file nào, quỹ phạt thì thống kê ở đâu :v... bước tiếp theo mình thấy nên làm là hãy xin suggest từ leader của bạn để thu nhỏ giới hạn tài liệu bạn nên tìm hiểu ví dụ như kế hoạch trong tháng này sẽ làm tính năng nào nó liên quan đến phần nào trong dự án có gì cần chú ý... điều đó sẽ giúp chúng ta tiết kiệm thời gian đọc tài liệu dự án (không biết có nhiều dev ngại đọc doc giống mình không).

Bước tiếp theo mà mình thấy nên làm là tìm hiểu về database. Bắt đầu với việc dự án sử dụng hệ quản trị cơ sở dữ liệu nào chẳng hạn :D thực tế database cho chúng ta khá nhiều thông tin dựa vào các trường trong một bảng và mối quan hệ giữa bảng đó với bảng khác có thể giúp chúng ta mường tượng ra sẽ xây dựng tính năng gì ví dụ chúng ta thấy bảng books và bảng book_histories ồ vậy chắc sẽ có tính năng gì đó để checking lịch sử mượn trả sách chẳng hạn :D việc tìm hiểu trước database cũng sẽ giúp ích chúng ta khi bắt tay vào code biết đâu có thể viết ra vài query mang tầm thế giới =))

Một vài dự án sẽ xây dựng những phần code base được sử dụng lại ở nhiều chỗ ví dụ handle exception, check role... bạn cũng nên chú ý tìm hiểu những phần này để tránh sau này viết lặp code hoặc gặp lỗi kiểu "không hiểu tại sao"

## 3. Tăng tốc 
> Sống và làm việc có trách nhiệm đừng bao giờ em tưởng

Sau khi đã có một cái nhìn khái quát về dự án, các công việc sắp làm trong dự án thì bắt đầu làm task thôi :D . Nhưng một lần nữa phải nhắc lại "Chớ nên bắt tay ngay vào code". Các bước cá nhân mình nghĩ nên thực hiện:

* **Đọc hiểu yêu cầu của task thật kỹ**: từ tiêu đề task đến spec của task chỗ nào không hiểu hãy note lại và list những thứ chưa hiểu để confirm với team điều này giúp bạn và mn trong team tiết kiệm ược thời gian. Nếu có những spec mập mờ cần đặt Q&A trước đã từng làm bục mặt 1 task rồi thì lại phải xóa đi làm lại vì đơn giản nó chưa đúng 100% ý khách hàng.
* **Ước tính phạm vi ảnh hưởng của task mình đang làm** vì biết đâu một thành viên khác trong team đang làm task có ảnh hưởng đến task của mình, việc thống nhất cách làm của 2 sẽ giúp bạn sau này đỡ bị conflict 
* **Ước tính thời gian hoàn thành của task và cố gắng đảm bảo điều đó** nó giúp cho các thành viên khác có thể sắp xếp công việc của họ và PM dự án tính toán thời gian cần để hoàn thành cả dự án. Và nếu có vấn đề có khả năng làm vượt estimate ban đầu thì hãy cầu cứu những người anh em của bạn chứ đừng im ỉm. Mình đã từng bị leader yêu cầu viết 5W vì tại sao chậm estimate mà lại im ỉm k nói gì :D    
* **hãy cố gắng "trưởng thành" hơn:** Một người anh mình từng nói (chắc là cũng đi copy ở đâu đó) "hãy sống và làm việc có trách nhiệm đừng bao giờ em tưởng":
    *  **Trưởng thành là khi bạn có trách nhiệm với những gì bạn làm** với code bạn viết ra ít nhất hãy đảm bảo nó chạy được sau đó thì đảm bảo cho unit test hoạt động, tránh những lỗi convention, cải thiện hiệu năng, và quan trọng đừng lặp lại nhiều lần cùng một lỗi. Một người anh của mình từng than "mày toàn làm anh mất thời gian không đâu", "sao mày cứ hay lặp lại những lỗi không đáng có" thiếu trách nhiệm với những dòng code sẽ làm người review code của bạn bị chán và có tâm lý cẩn trọng hơn khi review code => pull của bạn sẽ lâu được merge hơn đó! .
    *   **trưởng thành là biết thừa nhận khuyết điểm:** đừng ngại thừa nhận điều mình không biết / làm sai, để học hỏi, để nhờ người khác giúp đỡ, và để tiến bộ hơn và hãy trao đổi với một thái độ tiếp thu lại một người anh khác của mình chia sẻ "khi mày tỏ thái độ ngang ngạnh khi được người khác góp ý thì lần sau có thể người đó sẽ k nhiệt tình góp ý mày nữa đâu".
    *  **Trưởng thành là có thể giúp đỡ người khác:** lúc bắt đầu bạn được người khác giúp đỡ, sau đó thì tới lượt bạn dùng kinh nghiệm của mình giúp đỡ lại những người mới khác. Khi hướng dẫn lại cho người khác, tức là bạn đang học tới 2 lần. Khi một thành viên To bạn vào review code của họ hãy review nghiêm túc, bạn có thể sẽ học được từ code của họ và cũng có thể giúp họ cải thiện code, team bạn mạnh lên bạn cũng đỡ vất hơn. Một người anh khác nữa của mình từng nói "làm task không phải chỉ chăm chăm task của mình hãy cố gắng để giúp nhau hoàn thành task"

## 4. Về Đích
> Quan trọng là ở mindset

![](https://images.viblo.asia/79a01cc5-e103-42dc-8af8-d857939ba726.jpg)

Những điều trên là ý kiến cá nhân của mình. Mình tin là mỗi người cũng sẽ đúc rút được cho cá nhân mình những kinh nghiệm khi làm việc. Nhưng để chốt lại thì mình xin mượn câu của một ông anh mình "quan trọng là ở mindset" bạn có tư duy muốn cản thiện hiệu suất làm việc muốn công việc của mình nhanh hơn, đẹp hơn như vậy là bạn đã có thể tự tìm, sáng tạo cho mình những
tips hay ho khi làm việc r. Đừng quá phụ thuộc hay nghe lời ai cả vì "những ông nói đạo lý thường..." just kidding! :D hy vọng một vài ý kiến cá nhân của mình có thể có ích với ai đó. Bài viết toàn chữ  chắc k ai đọc đến đây nếu đọc đến đây hãy cho mình xin 1 like nhé :D