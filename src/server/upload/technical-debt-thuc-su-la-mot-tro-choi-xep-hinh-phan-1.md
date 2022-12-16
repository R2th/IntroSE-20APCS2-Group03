### I. Mở đầu
* Chắc hẳn nhiều người mới nghe đến thuật ngữ "Technical Debt" - dịch nôm na là nợ kĩ thuật (trong bài viết này mình xin phép để nguyên định nghĩa tiếng anh vì nghĩa tiếng việt không thể hiện thực sự chính xác về nó.

* Và lần đầu tiền mình biết đến nó trong một bài viết trên mạng mà mình vô tình đọc được. Ban đầu minh không hiểu gì và nghĩ đơn giản rằng Technical Debt là một khoản nợ của bản thân khi mà bạn không kịp nắm bắt những công nghệ mới, không update bản thân để nâng cao khả năng code của bản thân so với nhu cầu lẫn yêu cầu của dự án, xã hội. Nhưng thực chất ra thì không phải.

* Trong bài viết dưới đây mình sẽ nói rõ hơn về Technical Debt, và để dễ hiểu hơn thì chúng ta sẽ lấy một case study về game Tetris (game xếp hình) - chắc hẳn là một phần trong những tuổi thơ của các bạn đều đã gắn liền với nó.

###  II. Technical Debt là gì?

Mình đã mày mò search trên mạng, có một số bài viết giải thích rất rõ về nó, nhưng mình xin qoute lại định nghĩa tiếng anh mà mình đã search đc trên [techopedia](https://www.techopedia.com/definition/27913/technical-debt)

> Technical debt is a concept in programming that reflects the extra development work that arises when code that is easy to implement in the short run is used instead of applying the best overall solution
> 

* Dịch ngắn gọn sẽ là: Technical debt là việc bạn code/giải quyết một vấn đề một cách ngắn gọn, nhanh (giải quyết phần ngọn) thay vì việc apply cách xử lý tốt nhất (có thể cách này khó về kĩ thuật và tốn nhiều thời gian)

* Có vẻ vẫn hơi khó hiểu, và khái niệm này được đưa ra và giải thích dễ hơn bởi Ward Cunningham - ông được biết đến như là người đầu tiên phát triển ra Wiki. Ông đã có một giải thích về một concept như sau 

> Thử tưởng tượng rằng, project của bạn có 2 lựa chọn khả dĩ để giải quyết vấn đề. 
> 1. Một là nhanh, và dễ dàng, tuy nhiên sẽ phải modify trong tương lai. 
> 2. Phương án còn lại là, một cách giải quyết chắc chắn và triệt để hơn, tuy nhiên chúng lại tốn nhiều thời gian để implement hơn. 
> 
> 3.  Trong phát triển phần mềm, việc release code càng nhanh càng đơn giản giống như là phát sinh một khoản nợ, cái mà chúng ta sẽ phải trả kèm với với lãi suất (vay thì phải có lãi), và nó được xuất hiện dưới hình thức là làm thêm trong tương lai (để giải quyết trực tiếp vấn đề đó). 
> 4. Bỏ thời gian để refactor cũng chính là việc chúng ta trả nợ. Mặc dù điều này có thể giải quyết được trong ngắn hạn nhưng trong dài hạn thì sẽ làm giảm hiệu suất trong tương lai.
> 

* Các bạn nào đã tham gia các dự án thực sự thì chắc chắn đến đây chúng ta đã hiểu được phần nào về Technical Debt. Nhưng với những bạn trẻ, hoặc sinh viên mới ra trường, chưa thực sự tiếp cận nhiều với môi trường thực sự thì có vẻ như là có một cái gì đó hơi trìu tượng. Nên mình sẽ diễn tả thêm về Technical Debt thông qua một ví dụ sau đây

* Chắc hẳn các bạn đều đã chơi tựa game xếp hình trên những máy điện tử cần tay hay điện tử 4 nút ngày xưa. 
* Hãy tưởng tượng rằng, chúng ta đang phát triển phần mềm và phải bàn giao cho khách hành những chức năng mà chúng ta đã hoàn thành. Việc chúng ta code cũng giống như chúng ta xếp hình vậy, lắp ghép các mảng miếng để có thể tạo ra một chức năng/sản phẩm hoàn chỉnh. 
* Coi mỗi dòng là một chức năng mà chúng ta đã hoàn thành và deliver. Thì những chức năng khó sẽ tương đương với việc nhiều dòng được giải quyết cùng một lúc vậy. 

![Ban đầu thì các task khá là đơn giản khi mà tốc độ phải hoàn thành không quá nhanh và chúng ta có nhiều thời gian để xử lý](https://images.viblo.asia/d186212a-b87f-4118-97ae-1fd316d8dd5d.png)*Ban đầu thì các task khá là đơn giản khi mà tốc độ phải hoàn thành không quá nhanh và chúng ta có nhiều thời gian để xử lý*

* Và với những yêu cầu đến từ khách hàng (feature mới, sản phẩm mới) thì chúng ta sẽ phải đánh đổi giữa việc code và deadline bàn giao với khách hàng. Hoặc thay đổi "product strategy" để có thể phù hợp với design trước đó, để tránh phải thay đổi nhiều, tuy nhien chúng ta vẫn cần phải có thời gian để migrate giữa hệ thống (logic) cũ, mới với nhau.
*  Và Technical debt sẽ xảy trong lúc chúng ta code giống khi chơi xếp hình có những lúc chúng ta tạo ra các khoảng trông không đáng có khi chơi vậy.

![](https://images.viblo.asia/727b37fa-ca39-4446-a84b-e0e0ed75cff0.png)

*Vậy technical debt có tốt hay không? Thực ra thì tất cả code đều có technical debt. Đó là một điều bình thường, giống như bạn vẫn có thể chơi Tetris với rất nhiều khoảng trống phía dưới *
### III. Technical debt thường bắt nguồn và xuất hiện ở đâu?

Giống như khi chơi tetris, thời điểm ban đầu chúng ta sẽ rất ít khi gặp phải technical debt, nhưng theo quá trình code thì nó ngày càng nhiều lên và trở nên nhiều. Ví dụ như các trường hợp sau
* Do khách hàng thay đổi requirement liên tục, kiến trúc dự án không kịp thay đổi cho phù hợp
* Do bị dealine dí/manager gây áp lực nên developer code ẩu để hoàn thành task.
* Do bản thân developer làm biếng, code không có comment, không viết document.
* Do team không có technical lead giỏi, hoặc các thành viên không đủ nền tảng kĩ thuật tốt.
* Để tái sử dụng code đã viết, thay vì tách thành module riêng thì ta copy và paste code sửa đôi chút. Cách này nhanh, nhưng khi có bug thì sửa sẽ rất nhiều và sẽ khó triệt để, kèm theo đó là rất khó để có thể tìm ra chỗ gây ra bug.
* Có thêm một số requirement mới, thay vì việc chúng ta design lại cho phù hợp với requirement mới thì chúng ta sẽ vá víu thêm vào logic hiện tại ví dụ như thêm If v.v.. Từ đó có thể gây ra những bug không đáng có từ những feature cũ, hoặc làm giảm performance của hệ thống.
* Có bug khủng liên quan tới kiến trúc hệ thống, thay vì fix bug và refactor thì ta try/catch nuốt lỗi và fix tạm ở phần ngọn, gọi là hotfix.![](https://images.viblo.asia/c5dad266-c949-4165-a232-35e38340874e.jpg)

* Tuy nhiên, những ví dụ trên trong nhiều trường hợp không phải là xấu. Vì đôi khi chúng ta phải đánh đổi (trade-off) giữa deadline (delivery time) và coding quality. Đôi khi để đảm bảo deadline, và đảm bảo business có thể hoạt động được trong thời gian gần nhất thì chúng ta cần phải làm như vậy. 
* Rõ ràng là người dùng họ không quan tâm ta code ra sao, hay, đẹp như thế nào, mà chỉ quan trọng là có tính năng mới không, có sản phẩm không và nó không có lỗi gây ức chế. 
* Tuy nhiên mỗi quyết định trong lúc code đều làm tăng số nợ này lên, vấn đề là tăng nhiêu hay ít. 
* Đồng thời chúng ta cần phải hiểu rằng, đã vay đã nợ thì phải trả, do đó cần phải có thời gian và kế hoạch cụ thể cho việc "trả nợ" Không thì chúng ta sẽ mãi nằm trong một vòng luẩn quẩn mà mình sẽ phân tích ngay sau đây.

### IV. Tác hại của Technical Debt

Quá nhiều technical debt sẽ cản trở việc phát triển feature và bug fixes và kéo theo đó là tốn thêm nhiều thời gian. 
![](https://images.viblo.asia/b04985ab-4096-4739-9240-441ea70735a9.png)
* Tưởng tượng với game xếp hình hình chúng ta đã có quá nhiều chỗ trống, do đó chúng ta phải đẩy dần lên phía trên và xếp lại (bỏ qua những technical debt ở dưới) tuy nhiên, thời gian sẽ bị ngắn lại và kèm theo đó là rất dễ mắc sai lầm, và cảm xúc của người chơi lúc đó, có thể căng thẳng hơn ban đầu, lo lắng hơn v...v

* Nếu không trả nợ, cả vốn lẫn lãi sẽ dần chồng chất trong quá trình phát triển. Quá nhiều technical debt làm chậm tốc độ của team, đồng thời ảnh hưởng đến tinh thần làm việc của các thành viên trong nhóm.

![](https://images.viblo.asia/4d8921d6-702f-468b-bbba-ba051b383456.png)

*Và kết quả là game over.*

* Trong nhiều dự án, vì ban đầu bị trễ deadline nên team phải code ẩu, sinh ra technical debt. Nợ làm cho tốc độ phát triển chậm dần lại, dẫn tới trễ dealine -> code ẩu -> thêm nợ, thành 1 vòng lẩn quẩn. Một tính năng  có thể chỉ mất 1 ngày để hoàn thành, nhưng nếu technical debt quá nhiều sẽ mất tới 1 tuần.

* Tới một mức nào đó, khi không trả được lãi nữa, ta sẽ bị “phá sản”. Lúc này, code hiện tại đã nát tới mức cực kì khó mở rộng hay bảo trì, phải đập đi viết lại. Đây cũng là nguyên nhân gây trễ deadline/thất bại cho nhiều dự án.

![](https://images.viblo.asia/6f100c60-2b7a-4cfb-aed3-89d14c190ba2.png)

* Nhìn về góc độ kinh tế, trong góc nhìn ngắn hạn thì Technical debt không gây ra quá nhiều rủi ro, mặt khác lại còn đem đến lợi thế đối với các business. 
* Tuy nhiên, nợ càng lâu thì cái giá phải trả lại càng lớn. Do đó nếu không có kế hoạch trả nợ rõ ràng thì chi phí phát triển và maintain sẽ càng ngày càng lớn, thậm chí lớn hơn rất rất nhiều lần nếu không sử dụng technical debt ngay từ ban đầu.

![](https://images.viblo.asia/8f9a2fbf-5ced-4fd4-acaa-7b97d12ae748.png)

Giống như vận hành một business,
* Tetris sẽ khó hơn trong thời gian bạn chơi càng dài. Các miếng sẽ di chuyển nhanh hơn và trở nên khó khăn hơn.

* Có một điều đáng buồn là, bạn sẽ không bao giờ có thể thắng được game Tetris. Nó không có một kết thúc thực sự, chỉ là bạn phải control được việc bao giờ bạn thua mà thôi. 

* Việc bạn chấp nhận quá nhiều lỗ hổng khi chơi Tetris chính là nguyên nhân làm bạn thua cuộc

### V. Tạm kết 
Có vẻ như trong bài viết này mình đã đem đến một cái nhìn khá sâu về Technical Debt, và để tránh các bạn cảm thấy mệt mỏi thì mình sẽ dành riêng một bài viết về việc Trả nợ, cách vượt qua nó, và khi nào thì chúng ta nên trade-off giữa delivery time và technical debt.