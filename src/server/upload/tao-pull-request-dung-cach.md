# Lời mở đầu

*Pull request hay gọi tắt viết tắt là PR là gì ?*

Thuật ngữ này đã quá quen thuộc với những người làm dev như chúng ta khi mà chúng ta sử dụng nó gần như hằng ngày hằng giờ thậm chí là vài phút một lần cũng có thể nghe những câu đại loại như "Anh êiiiii, review giúp em cái pull request XXX điiiiiii". Tuy nhiên dù là dùng quá thường xuyên như vậy nhưng bạn có thật sự hiểu hết về nó, mục đích tạo PR, tạo PR như thế nào cho thật xịn hay review PR như thế nào là nhanh và đúng cách nhất. Hôm nay, qua bài viết này mình xin được chia sẻ một số sự hiểu của mình về PR mà mình từng có thông qua những trải nghiệm thực tế trong dự án mình từng làm. Mọi người sau khi đọc xong bài viết này hãy cùng chia sẻ những kinh nghiệm với PR với mình và nhé. Bắt đầu thôi nào!

# Mục đích tạo pull request
Pull request hay PR là khái niệm không liên quan đến logic source code và thường được quan tâm sau cùng khi dev đã hoàn tất việc code và sẵn sàng chuyển tiếp sang bước để mọi người review, tuy nhiên *"Last but not least"* - đây gần như là bước cuối cùng quan trọng không kém để đưa source code của mỗi dev chúng ta đến gần với team với khách hàng vì với những dự án có khách hàng trực tiếp review source code thì dù logic và code của bạn có xịn đến mấy nhưng bạn không gởi PR đúng chuẩn đã được define theo rule thì khách hàng cũng sẽ sẵn sàng reject ngay không cho merge vào source code chung đâu đấy nhé :joy: 

Vì sao mình lại dùng câu *"đưa source code của mỗi dev chúng ta đến gần với team với khách hàng"* ? 

Vì thực tế khi bạn làm việc trong team có nhiều người, mỗi một chức năng bạn hoàn thành code và cần được team review, bạn không thể gọi mọi người đến máy tính của bạn và ngồi đấy review từng dòng code cho bạn đâu nhỉ. Bạn cũng không thể gởi từng file source code cho người review để họ download về máy và review được - quá tốn thời gian và thật sự không chuyên nghiệp. Và tất nhiên khi khách hàng (đang ở một nơi nào đấy rất rất xa bạn) muốn tham gia review code của bạn thì chuyện này càng khó khăn hơn. Đó là lúc cần dùng đến Pull request.

Pull request được tạo ra để đưa những file source code của bạn lên 1 host chung nơi mọi người có quyền truy cập sẽ truy cập vào và cùng review, để lại comment trên những file source code đó. Lúc này thời gian review và địa điểm review source code không còn là vấn đề - đó cũng chính là mục đích tạo ra pull request!

# Chuẩn bị pull request như thế nào


Chuẩn bị PR hay nói chính xác hơn là chuẩn bị branch để thực hiện pull request. Việc chuẩn bị một branch tốt giúp cho mọi thứ trở nên dễ dàng hơn. Nếu bạn lỡ có quên tạo branch mới mà update source trên branch cần merge thì hãy yên tâm, Git có sẵn chức năng để giúp bạn chuyển những thay đổi này sang branch mới, đó là stash. Nếu bạn chưa biết gì về stash thì có thể xem tại [đây](https://git-scm.com/book/en/v1/Git-Tools-Stashing)


Vậy như thế nào là một branch tốt?

Thứ nhất, chắc chắn là naming. Tên branch phải thể hiện mục đích của việc update. Cái tên nói lên tất cả, nó sẽ giúp cho reviewer có thể nắm bắt nhanh chóng bạn đang làm gì. Thông thường mình sẽ tạo tên format sau:

`<type>_<issue id>_<tên issue>`


Trong đó:
-	Type: thể hiện mục tiêu của branch. Type có thể là Feature, Fix, Refactor, Test… 
-	issue id (hoặc task id, story id…) đã được define trên git hay trên các trình quản lý project như redmine, trello... Chỉ cần biết issue id là có thể xác định được các yêu cầu, từ đó có thể nắm được cần review cái gì
-	tên issue: mô tả ngắn gọn mục đích của issue. Vì nhìn vào issue ID không thể biết ngay bạn đang làm gì nhưng chỉ cần nhìn thêm tên issue hẳn ai cũng nắm được cơ bản công việc của bạn


Ví dụ như
Fix_B223_ CSV_Download_Wrong_Date: nhìn vào cũng đoán được đây là branch để fix bug 223 về lỗi file csv download nhầm ngày.


Nếu bạn có lỡ đặt tên branch sai cách thì đừng lo việc đổi tên branch rất dễ dàng với 2 command sau:
```
# nếu ở tại branch muốn đổi tên
git branch -m newName
# nếu đang ở branch khác
git branch -m oldName newName
```


Thứ hai, đảm bảo rằng branch của bạn phải update dựa trên lastest source của branch cần merge. Việc này sẽ giúp tránh những conflict không cần thiết. Đôi khi task bạn đang làm mất vài ngày mới hoàn thành thì trong khoảng thời gian đó có tới hàng chục commit đã được merge. Bạn có đảm bảo rằng sẽ không có ai conflict với bạn không. Chính vì thế việc phát triển source code dựa trên lastest source là điều cần thiết. Để làm được điều này, bạn cần thiết phải rebase source code thường xuyên. Không nhất thiết phải rebase mỗi khi có một commit mới nhưng bạn phải chắn chắc mình không được để lỡ quá nhiều commit. Mặc dù việc này khá là phiền phức nhưng lợi ích của nó đem lại cao hơn nhiều:

-	phát hiện conflict và resolve nó ngay lập tức. Việc này giúp tiết kiệm khá nhiều thời gian vì chỉ resolve dựa trên số ít commit. 
-	tăng tính khả dụng của source code, code của bạn có thể hoạt động ngay lập tức khi được merge


Và để rebase source code, rất đơn giản, làm theo các bước bên dưới nhé
-	commit source code ở branch của bạn
-	di chuyển sang branch chính bằng `git checkout <branch>,` fetch (`git fetch`) và pull lastest source về (`git pull`)
-	di chuyển về branch của bạn
-	thực hiện lệnh sau `git rebase <branch-origin>`
-	Resolve conflict nếu có


Thứ ba, đây cũng là bước cuối cùng của việc chuẩn bị PR, đó chính là squash commit. Việc bạn push commit lên branch của bạn là điều hết sức bình thường, như mình cứ mỗi lần code xong cái gì mình lại push lên branch, việc này tránh bị mất code nếu như có sự cố gì xảy ra. Tuy nhiên khi thực hiện xong, nhìn lại branch, thì hàng tá commit như thế có thể khiến mọi thứ trở nên rối tung lên. Vì khi merge vào branch chính thì nó sẽ merge từng commit của bạn. Càng nhiều commit thì khả năng phát sinh conflict giữa các commit càng cao. Sau khi merge, nhìn vào graph trên Git thì ôi thôi cái đống gì thế này.
    
Chẳng hạn bạn thích cái nào hơn khi xem history trên branch develop
```
1256556316... Merge pull request #423 from jrandom/add-slideshows
7hgf8978g9... Added new slideshow feature, JIRA # 848394839
85493g2458... Fixed slideshow display issue in ie
gh354354gh... wip, done for the week
789fdfffdf... minor alignment issue
56556316ad... Merge pull request #324 from ahacker/fix-android-display
787g8fgf78... hotfix for #5849564648
f56556316e... Merge pull request #28 from somwhere/select-lang-popup
9080gf6567... implemented feature # 65896859
gh34839843... minor fix (typo) for 3rd test
```

hay
```
1256556316... Merge pull request #423 from jrandom/add-slideshows
7hgf8978g9... Added new slideshow feature
56556316ad... Merge pull request #324 from ahacker/fix-android-display
787g8fgf78... Hotfix for android display issue
f56556316e... Merge pull request #28 from somwhere/select-lang-popup
9080gf6567... Implemented pop-up to select language
```

hay
```
1256556316... Merge pull request #423 from jrandom/add-slideshows
56556316ad... Merge pull request #324 from ahacker/fix-android-display
f56556316e... Merge pull request #28 from somwhere/select-lang-popup
```

Việc squash commit từ nhiều commit thành ít commit hơn hoặc thành 1 commit chẳng những giúp graph trở nên đẹp hơn mà còn có thể giúp phát hiện lỗi dễ dành hơn bởi vì càng ít commit càng dễ xác định được đâu là nguyên nhân gây lỗi.
Về cách squash commit, bạn có thể tham khảo tại [đây](https://www.internalpointers.com/post/squash-commits-into-one-git). 

    
# Tạo pull request cần chú ý những gì

    
 Sau khi chuẩn bị branch cần merge thì tiếp theo chúng ta sẽ tạo một PR. Giai đoạn chuẩn bị cũng là giai đoạn tốn nhiều công sức nhất và vất vả nhất. Và một khi chuẩn bị tốt các giai đoạn tiếp theo sẽ đơn giản hơn rất nhiều. Như tạo PR, bạn chỉ cần chú ý đến các vấn đề sau. 
    
Commit message
    
Khi tạo PR, đầu tiên bạn cần check lại các commit của mình. Như khâu chuẩn bị đã đề cập ở trên, thì lúc này bạn chỉ có 1 commit duy nhất sau khi squash các commit. Lúc này, bạn muốn thể hiện sự thay đổi trong source code ở commit đấy thì chỉ có thể thông qua commit message. Mặc dù tên branch thể hiện được mục đích của việc thay đổi nhưng việc làm sao để đạt được mục đích thì nó phải cần đến commit message. Điều này giúp cho reviewer hoàn toàn hình dung được bạn thực hiện thay đổi như thế nào thông qua các thông tin được viết trong commit message. Khi tạo pull request, những thông tin ở commit message cũng sẽ tự động fill vào phần description nên bạn không cần tốn thời gian để viết thêm thông tin bởi vì như thế là quá đủ.
    
Để viết commit message một cách rõ ràng thì bạn nên tham khảo tại [đây](https://viblo.asia/p/ban-dang-viet-commit-message-nhu-the-nao-gDVK22A0KLj) 
    
    
Review các thay đổi trên source
    
Mặc dù đã review ở bước chuẩn bị nhưng khi tạo pull request, bạn cũng cần xem các thay đổi của mình với source hiện tại. Hãy xem lại một cách kĩ lưỡng vì có thể bạn sẽ nhận ra những lỗi mà trước đây mình lại bỏ qua.
    
    
Add reviewer
    
Và công đoạn cuối cùng trước khi tạo pull request đó là xác định reviewer. Việc thêm họ vào pull request giúp cho reviewer nhanh chóng nhận được các thông báo liên quan đến pull request. Tuy nhiên đừng quên share PR cho các dev khác để họ có thể nắm được các thay đổi nhằm tránh các conflict phát sinh và họ hoàn toàn có thể trở thành reviewer giúp cho PR của bạn trở nên tốt hơn.


# Review pull request 

 Cuộc đời dev đâu phải lúc nào cũng căm mặt code rồi tạo PR. Đôi lúc chúng ta cũng phải review vài cái PR để trở nên xịn xò. Vậy review PR là review cái gì? Và review như thế nào cho đúng?
    
 Đầu tiên chắc chắng là review code rồi. Nhìn chung thì đối với updated source code, mình thường chú ý các điểm sau:
 
- Coding convenstion, đảm bảo việc naming, format phải đúng với quy định đã đặt ra từ trước.
- Kiểm tra trong code có còn xót các xử lý dư thừa như comment pseudo code, debugger hay là những khối lệnh bị comment out
- Check một số vấn đề về clean code: code xử lý trùng lặp, logic phức tạp, xử lý exception ko tốt... dựa trên các principle như SOLID, DRY, KISS...
- Đặc biệt cần chú ý đến unit test. Với mình thì mọi dòng code cần phải được test. Điều đó giúp bản thân dev có tránh nhiệm hơn với chất lượng code của mình.

Thứ hai, đó là có đúng requiment hay không. Code ngon mà chạy ko đúng thì hẳn là một chuyện gì đó rất xàm. Việc này đòi hỏi bạn có khả năng đọc code tốt, từ đó nắm được logic và thuật toán xử lý. Và tất nhiên là để đảm bảo nó có đúng hay không thì bạn phải checkout branch đó về và thực hiện run test các kiểu trên local dựa trên requiment của khách hàng.
    
Cuối cùng là kiểm tra nó có ảnh hưởng đến những bộ phận khác hay không? Việc này đòi hỏi phải có sự review kết hợp của những bên liên quan và trên hết là hệ thống integration test để đảm bảo mọi thứ liên quan đến update trong PR sẽ vẫn hoạt động tốt. 
    
Tuy nhiên, hiện nay thì reviewer hầu hết đều không có thời gian cho việc test. Thậm chí việc review code và logic xử lý cũng đã lấy hết thời gian rồi. Cho nên việc tạo unit test và integration test hay automation test trở thành yêu cầu bắt buộc. Từ đó chúng ta có thế giao phó cho hệ thống CI build và run test để tiết kiệm thời gian hơn trong khâu review PR. Chúng ta chỉ cần dành thời gian cho việc review code và các testcase của unit test, integration test...
 

# Hoàn thành pull request

Yeah, sau tất cả chính là complete PR. Và việc này tưởng chừng đơn giản như thực tế lại không hề đơn giản chút nào. Trước hết bạn cần phải resolve toàn bộ comment của reviewer để PR được approve merge. Việc update chắc chắn sẽ tạo ra những commit mới và cần phải được review. Vì thế chúng ta cũng nên thực hiện toàn bộ cái thao tác đề cập ở trên để đảm bảo PR của bạn luôn trong trạng thái sẳn sàng hoạt động và tất nhiên là hoạt động tốt là đằng khác. Cho đến khi tất cả comment đều được giải quyết ổn thỏa thì lúc này là lúc mà bạn quyết định cách thức merge branch của bạn để hoàn thành PR. Đây là điều không dễ. Nó đòi hỏi bạn phải nắm rõ sự khác nhau giữa các cách merge PR. Tuy tất cả đều là merge nhưng bản chất merge là khác nhau và việc hiển thị trên graph cũng khác nhau. Ai trong chúng ta cũng đều thích một graph đẹp và dễ dàng quản lí, nên việc lựa chọn cách nào để merge sao cho phù hợp là vấn đề lớn.
    
 Về các cách merge PR các bạn tham khảo tại [đây ](https://help.github.com/en/articles/about-pull-request-merges)
    
Sau khi merge PR thì lúc này branch của bạn đã được xóa. Tuy nhiên trên local vẫn còn nên hãy lưu ý là xóa cả nó luôn nhé. Nếu cẩn thận bạn có thể tạo bản backup trước khi xóa tuy nhiên thì việc backup hoàn toàn thừ thải. Mặc dù branch của bạn đã được xóa tuy nhiên nó vẫn được lưu thành một commit trên branch chính và bạn hoàn toàn có thể revert những thay đổi trong commit đó nếu có lỗi xảy ra và có thể thực hiện cherry pick những commit quan trọng trong quá trình sửa lỗi sau đó.
    
Và điều cuối cùng mình muốn nói là dù cho bạn đã hoàn thành PR của mình, branch của bạn đã được xóa thì không có nghĩa là bạn hết trách nhiệm với nó. Hãy test sau khi merge và thậm chí cả khi lên product. Luôn chú ý đến các bug phát sinh sau khi bạn merge source vì rất có thể nó liên quan đến PR của bạn. PR xong nhưng bạn thì chưa xong. Nhớ điều này nhé.
    
    

# Lời kết

Thật sự đối với một số bạn có thể nghĩ "pull request ấy mà, chỉ là hình thức thôi, quan trọng là logic là code xịn". Tuy nhiên, với bản thân mình, mình nghĩ khi làm việc cùng team thì việc giúp cho công việc của nhau hoàn thành trôi chảy mới là thứ quan trọng nhất. Việc tạo ra 1 pull request "xịn" sẽ góp phần giúp cho việc làm việc với team trở nên nhanh chóng và mượt mà hơn đấy.
    
Trên đây là những hiểu biết thực tế của mình về pull request, còn các bạn thì sao, các bạn có những kinh nghiệm và tip gì khi làm việc với pull request không, hãy comment cho mình học tập thêm nhé!

# Tham khảo
https://help.github.com/en/articles/about-pull-requests