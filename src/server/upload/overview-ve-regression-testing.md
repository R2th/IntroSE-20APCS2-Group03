![](https://images.viblo.asia/9250ecff-45b3-4cc3-8ff5-5117ba7d0d77.jpg)

Kiểm tra hồi quy là một trong những chủ đề thú vị nhất mà mọi người thường nhắc đến. Khi tiếp cận chủ đề này ; một số tỏ ra hứng thú; số khác thì không nhưng mọi người dường như phải dùng đến nó trong bất kỳ dự án thử nghiệm nào. 

Lý do rất đơn giản: kiểm tra hồi quy là bước cực kỳ quan trọng !

Mặc dù kiểm tra hồi quy là phổ biến và mọi người thực hiện rất nhiều, nhưng không phải ai cũng biết làm thế nào cho đúng, hoặc tệ hơn là họ chưa bao giờ biết về nó.

Trong bài đăng hôm nay, mình sẽ chia sẻ với bạn mọi thứ bạn cần biết về kiểm tra hồi quy để bạn có thể bắt đầu với nó hoặc giúp cải thiện việc kiểm tra hồi quy của bản thân .

Let's start!

###  Regression testing là gì?

Có một vài định nghĩa nhưng đây là một trong những cách hiểu mình tâm đắc nhất:

Kiểm thử hồi quy là **quá trình kiểm tra các thay đổi ** đối với các programs máy tính để đảm bảo rằng programs cũ hơn vẫn hoạt động với các thay đổi mới.

Còn theo Wiki thì : 

Kiểm tra hồi quy là một loại kiểm thử phần mềm xác minh rằng phần mềm được phát triển và được tested trước đó vẫn hoạt động theo cách tương tự sau khi được thay đổi hoặc  tương tác với phần mềm khác.

Nói một cách đơn giản, kiểm tra hồi quy là một kiểm tra để đảm bảo rằng trong phần mềm của bạn, những gì hoạt động trong quá khứ vẫn hoạt động vào thời điểm hiện tại . 

### Vậy lý do chúng ta cần kiểm tra hồi quy ?

Phần mềm ngày nay quá lớn và phức tạp để làm cho nó đúng ngay  lần đầu tiên. Thật không thực tế nếu nói các nhà phát triển  chỉ cần build đúng 1 bản bao gồm tất cả các tính năng và release cho khách hàng. Thay vào đó, các developers  build các bản build nhỏ và mỗi build chỉ bao gồm một tính năng nhất định của phần mềm.  Và như thế, bản build sau cũng sẽ là bản lớn hơn so với bản trước vì các tính năng trong bản trước cũng sẽ được đưa vào bản sau.

Công việc này cứ tiếp tục cho đến khi có bản build cuối cùng với tất cả các tính năng hoàn thành và sau đó  release cho khách hàng .

![](https://images.viblo.asia/98cdfadc-8561-4ac3-8a88-d4b37b16fd30.jpg)https://images.viblo.asia/98cdfadc-8561-4ac3-8a88-d4b37b16fd30.jpg

Phần lớn thời gian ,  developers  thường phải giải quyết với các bản "builds "  (có thể là “releases” or “sprints” tùy thuộc vào yêu cầu ). Về cơ bản Developers  sẽ làm hai việc trong một bản build :

# 1: Viết code để triển khai các tính năng mới cho bản build 

# 2: Đảm bảo rằng viết code cho các tính năng mới không phá vỡ các tính năng hoạt động trước đó

Mặc dù hầu hết developers  có thể xử lý nhiệm vụ số 1 là viết code mới để triển khai một tính năng độc đáo và dễ dàng, nhưng các nhà phát triển thường bỏ qua nhiệm vụ số 2 để đảm bảo code mới không phá vỡ code cũ.

Mọi thứ đều hoàn hảo cho đến khi developers bắt đầu thực hiện một số thay đổi code.

![](https://images.viblo.asia/47acd5d1-8530-484a-93eb-d4cbbc37a854.jpg)

Và đây là một số lý do mà developers trấn an chúng ta: 

1. Thôi nào! tôi mới chỉ vừa thêm/ xóa một dòng code thôi mờ !

2. Tôi chỉ thực hiện một thay đổi nhỏ ở đây..đây này ...

Chưa kể, some developers  đánh giá cao bản thân họ.

Mình không nói rằng các developers  đang nói dối (mặc dù một số người có làm vậy), trong nhiều trường hợp, các developers  không nhận thức đầy đủ về tác động của code của họ đối với toàn bộ hệ thống. Nó không hẳn thực sự là do  năng lực của developers và  thường thì đó là vì hệ thống này quá lớn và phức tạp để tạo ra cái nhìn rõ ràng về  những chức năng bị ảnh hưởng - những chức năng không bị ảnh hưởng. 

Người ta có câu  "what can go wrong will go wrong”, vì vậy để tránh tác động không mong muốn và tác dụng phụ của thay đổi code , mọi bản build cần phải được  tested để verify các tính năng mới hoạt động và các tính năng cũ cũng hoạt động tốt - và đó chính là "thử nghiệm hồi quy "

### # Khi nào sử dụng Thử nghiệm hồi quy ?

Việc kiểm tra hồi quy được thực hiện bất cứ khi nào có một sự thay đổi trong hệ thống,  bao gồm:

* Bất cứ khi nào một tính năng mới được thực hiện

* Bất cứ khi nào một tính năng cũ được sửa đổi / thay đổi

* Bất cứ khi nào một lỗi được sửa trong hệ thống

* Bất cứ khi nào môi trường thay đổi

* Bất kỳ thay đổi nào khác mà bạn biết

Tuy nhiên, trong thực tế, tester không phải chạy để test hồi quy cho bất kỳ thay đổi nào. Teams cần đánh giá rủi ro và xem những thay đổi nào cần thiết phải dành effort để kiểm tra hồi quy.

Nhưng kiểm tra hồi quy không phải là hoàn hảo . Vẫn có những ưu và nhược điểm  mà chúng ta cần nhắc đến : 

### Ưu điểm của kiểm tra hồi quy:

*  Giúp phát hiện các lỗi không mong muốn gây ra do những thay đổi mới được thêm vào hệ thống.

* Giảm số lượng lỗi cho người dùng cuối

* Quan trọng hơn, giúp việc phát hành sản phẩm với sự tự tin nhất định.

### Nhược điểm của kiểm tra hồi quy:

Mặc dù kiểm tra hồi quy là rất quan trọng và được coi là phải có trong bất kỳ vòng đời kiểm thử phần mềm nào, nhưng cũng có những nhược điểm. Có nhiều lý do khác nhau, nhưng quan trọng nhất phải nói tới chính là : CHI PHÍ

Mình  sẽ giải thích rõ hơn:

* Có thể hiểu  đơn giản như này : Việc chạy lại toàn bộ các bộ testcase có sẵn sau mỗi bản  build đòi hỏi thời gian,  hoạt động kiểm tra tiêu tốn tài nguyên.  Điều này đặc biệt đúng nếu bạn có hàng ngàn trường hợp thử nghiệm cần được chạy lại thủ công hoặc nếu nhóm của bạn phải build những bản build mới thường xuyên . Ngay cả khi thử nghiệm hồi quy của bạn được thực hiện bằng cách chạy automation , nó vẫn tốn thời gian của team , tools  và  sẽ phải có các thành viên có kinh nghiệm về automation test .  Và để có một bộ tools hoàn hảo ; tất nhiên không thể không nói đến : Chi phí !

* Việc maintain bộ  regression test ngày càng lớn hơn theo thời gian cũng là một thách thức . Mỗi khi có một tính năng mới được thêm hoặc sửa đổi, các trường hợp thử nghiệm sẽ được thêm hoặc cập nhật tương ứng. Về lâu dài, bộ kiểm tra hồi quy của bạn sẽ trở nên lớn hơn khiến việc cập nhật chúng cũng gặp nhiều khó khăn. 

* Việc phải Traceability  ( biết được phần nào cần test - phần nào không ).  Nếu bạn không tracking/tracing tốt ; bạn sẽ phải đối mặt với việc lack các case và thiếu độ bao phủ cho các trường hợp kiểm thử của mình.

Bên cạnh chi phí, còn có một mặt tiêu cực khác của thử nghiệm hồi quy. Mặc dù mình là một người thử nghiệm chuyên nghiệp và đã thực hiện rất nhiều case kiểm tra hồi quy, mình phải thú nhận điều này: Kiểm tra hồi quy là một trong những hoạt động kiểm tra ít thú vị nhất .Nói cách khác, việc test đi test lại sau mỗi bản build là công việc chán ngắt . Mình chưa bao giờ thấy một người thử nghiệm nhảy lên vì niềm vui khi thử nghiệm hồi quy trong sự nghiệp của mình cho tới thời điểm hiện tại .

![](https://images.viblo.asia/d6102f91-20c5-49ae-8974-7b2cf957a140.jpg)

Xin lỗi các bạn, nhưng đó là sự thật đau lòng :

Việc phải chạy cùng với hàng trăm trường hợp thử nghiệm  sau mỗi bản build trong đó phần lớn là các case pass thì time làm việc không funny chút nào.  Kết quả là bạn bị bất cẩn và điều này cực kỳ nguy hiểm. Một khi bạn thờ ơ và không chú ý 100% vào công việc của mình, bạn có thể dễ dàng bỏ lỡ một bước hoặc tệ hơn là bạn có thể bỏ lỡ lỗi mà điều này thực sự tồi tệ.

Vậy solutions ở đây nên có là gì ? Không gì khác - chính là việc Tự động trong kiểm tra hồi quy . Trên thực tế, hồi quy là một loại thử nghiệm hoàn hảo được tự động hóa. Và đây là lý do tại sao:

* Việc tests được lặp đi lặp lại

* Việc tests chủ yếu là checks

* Việc tests  là ổn định

Khi nói đến kiểm tra hồi quy, nếu việc này được thực hiện đúng cách, các công cụ máy móc thường có xu hướng thực hiện công việc tốt hơn (và nhanh hơn) so với con người.

Hãy suy nghĩ về kịch bản trong đó bạn có tất cả các trường hợp kiểm tra hồi quy được thực hiện một cách tự động, vì vậy bất cứ khi nào bạn có bản build mới, bạn sẽ kick off tự động thử nghiệm tự động hóa của mình và sau đó bạn có thể nhận được kết quả thử nghiệm trong vài giờ tiếp theo thay vì 1-2 ngày nếu các thử nghiệm được thực hiện bởi người kiểm tra. Ngoài ra, nếu bộ kiểm tra hồi quy của bạn lớn, bạn có thể thực hiện nó qua đêm trong khi bạn ngủ và bạn có thể nhận được kết quả vào sáng hôm sau . Tiết kiệm time chưa ^^

Điều thú vị ở đây là gì ? Không cần phải nói, máy rất chính xác trong cách nó chạy thử nghiệm và phần hay nhất: nó không bao giờ phàn nàn rằng thử nghiệm hồi quy là nhàm chán.haha

Bằng cách tự động bộ kiểm tra hồi quy của bạn, giờ đây bạn có nhiều thời gian hơn cho các hoạt động kiểm tra khác như kiểm tra thăm dò, báo cáo kiểm tra, báo cáo lỗi, lập kế hoạch kiểm tra...

![](https://images.viblo.asia/25f7492e-6b94-453d-aee5-3f4ecac3dfd4.jpg)

Tất nhiên, tự động hóa thử nghiệm có vấn đề riêng của nó nhưng tin mình đi, nếu bạn có thể tự động kiểm tra hồi quy, bạn đang tối đa hóa lợi ích của nó.


Tips tips tips and tips: 

* Thường xuyên cập nhật bộ kiểm tra hồi quy của bạn. Bất cứ khi nào bạn có một trường hợp thử nghiệm mới hoặc yêu cầu thay đổi, bạn cần cập nhật các trường hợp thử nghiệm của mình cho phù hợp.

* Thêm các bugs fixed/closed như là một phần của bộ kiểm tra hồi quy. Xem lại bug database và thêm chúng vào bộ kiểm tra hồi quy của bạn nếu không có testcase nào cover bug này.

* Phân loại và ưu tiên các trường hợp thử nghiệm của bạn để bạn biết case nào cần ưu tiên test trước.Bạn có thể phân loại thành các mức độ như : Critical, High, Low hoặc các số 1; 2;3 - cách nào cũng được ấy .

### Vậy Regression testing được thực hiện như nào ?

Mỗi dự án có cách tiếp cận khác nhau , nhưng nhìn chung sẽ bao gồm các bước cơ bản sau :

### Bước # 1: Tạo bộ kiểm tra hồi quy

Bỏ qua các dự án hoặc các tools bạn đang có, một bộ kiểm tra hồi quy là điều kiện tiên quyết .

Bộ kiểm tra hồi quy là gì? Bộ kiểm tra hồi quy là một tập hợp các trường hợp kiểm thử mà bạn đã viết chúng cho các sản phẩm của mình. Nếu bạn không có thời gian cho các trường hợp kiểm tra chi tiết, bộ kiểm tra hồi quy của bạn có thể là một danh sách kiểm tra các ý tưởng kiểm tra mà bạn muốn kiểm tra. Về cơ bản, bộ kiểm tra hồi quy sẽ bao gồm tất cả các thử nghiệm bạn dự định chạy lại để phục vụ một mục đích: đảm bảo những gì vẫn hoạt động.

Khi bạn có bộ kiểm tra hồi quy, các bước tiếp theo của bạn là:

### Phân loại các trường hợp thử nghiệm của bạn thành các thành phần hoặc tính năng của hệ thống của bạn (Ví dụ: Đăng nhập, Tạo đơn hàng, Xóa đơn hàng, Báo cáo, v.v.)
Ưu tiên các trường hợp thử nghiệm của bạn dựa trên mức độ quan trọng của các trường hợp thử nghiệm (Ví dụ: Quan trọng, Cao, Thấp, v.v.). Trường hợp thử nghiệm ưu tiên cao nhất sẽ là trường hợp thử nghiệm bao gồm các tính năng quan trọng nhất của hệ thống và cần được thực hiện trước tiên.

![](https://images.viblo.asia/25f7492e-6b94-453d-aee5-3f4ecac3dfd4.jpg)

Bằng cách phân loại và ưu tiên các trường hợp kiểm thử trong bộ kiểm tra hồi quy của bạn, bạn luôn có thể nhóm trường hợp kiểm thử của mình và biết trường hợp kiểm thử nào cần được chạy trước, kiểm tra nào có thể chạy sau khi bạn không có đủ thời gian hoặc không có ý nghĩa cho bài kiểm tra hồi quy đầy đủ.

### Bước # 2: Chạy chúng

Bây giờ bạn đã có bộ kiểm tra hồi quy , vì vậy bất cứ khi nào bạn có bản build mới, bạn sẽ khởi động bài kiểm tra hồi quy của mình, phải không?

Chờ chút!  Bạn sẽ chạy chúng nhưng trước khi làm điều đó, hãy tự hỏi mình những câu hỏi sau:

* Bản build của bạn có đủ tốt để thử nghiệm thêm không?

Tại sao chúng ta cần phải biết điều đó? Vấn đề là như thế này: Điều gì sẽ xảy ra nếu bạn đang lập kế hoạch cho bộ kiểm tra hồi quy của mình và giao nhiệm vụ cho các thành viên trong nhóm để chạy thử nghiệm hồi quy, nhưng vào cuối ngày, bạn nhận ra rằng một trong những tính năng quan trọng nhất của hệ thống đã bị hỏng hoàn toàn. và không có  ý nghĩa để chạy bất kỳ thử nghiệm khác. Bây giờ bạn và teams của bạn đã lãng phí thời gian để kiểm tra bản build thất bại.

Vì vậy, trước khi chạy bộ kiểm tra hồi quy, hãy đảm bảo rằng bản build đủ tốt để thử nghiệm thêm. Bạn có thể đạt được điều này bằng cách thực hiện kiểm tra  acceptance test, smoke test or sanity test. Một smoke test thường là một tập hợp con nhỏ của bộ thử nghiệm hồi quy của bạn bao gồm các tình huống quan trọng của hệ thống đang được thử nghiệm. Việc test này thường chiếm time ngắn (thường mất 1-2 giờ để thực hiện). Nếu bất kỳ trường hợp thử nghiệm nào trong smoke test không thành công, bạn có thể cho rằng bản build không đủ tốt để thử nghiệm thêm và thông báo cho nhà developers/ managers. Việc này giúp tiết kiệm được rất nhiều  time. 

* Có cần thiết thực hiện full Regression test ???

Mặc dù hồi quy hoàn toàn là một công cụ tốt, nhưng trong một số trường hợp, nó không cần thiết phải chạy tất cả các trường hợp thử nghiệm của bạn nếu bạn biết các thay đổi rất tách biệt và bạn biết chính xác các tính năng / thành phần nào sẽ bị ảnh hưởng và những gì không. Khi biết điều này, bạn có thể lọc các trường hợp thử nghiệm của mình và chọn đúng các trường hợp thử nghiệm được regressed. Tương tự, trong một số bối cảnh mà bạn không có nhiều thời gian để regressed hoàn toàn, bây giờ bạn có thể biết trường hợp kiểm tra nào bạn cần chạy trước và trường hợp kiểm tra nào bạn có thể bỏ qua.

Một khi bạn có một danh sách các trường hợp kiểm thử cần phải được regressed, bây giờ bạn có thể bắt đầu kiểm tra. Nếu bạn đã thực hiện các bài kiểm tra của mình một cách tự động, bây giờ bạn có thể bắt đầu bài kiểm tra và đi pha cà phê.kaka

Tips , tips, tips and tips:

Nếu bạn đang sử dụng spreadsheet để theo dõi kết quả kiểm tra hồi quy của mình, hãy đảm bảo bạn có các cột sau trong bộ kiểm tra hồi quy:

* Kết quả kiểm tra: Passed / Failed/ N/A

* Notes : Nơi bạn có thể ghi chú hoặc ID / mô tả về lỗi nếu thử nghiệm thất bại

* Bản ghi bản build : Nơi bạn có thể lưu ý version bản build nào được kiểm tra được thực hiện

### Bước # 3: Thu thập kết quả kiểm tra và báo cáo:

Khi bạn hoàn thành Regression Test; bước cuối cùng là xem lại kết quả kiểm tra trước khi gửi báo cáo cho người quản lý. Về cơ bản, bạn cần xem lại các nội dung sau:

* Hãy chắc chắn rằng các testcase "Failed" đều có link bug ID hoặc ít nhất là có một số ghi chú mô tả trong khi thử nghiệm thất bại

* Hãy chắc chắn rằng bạn có note lý do cho case :  “Not run” or “Inconclusive”

*  Follow các trường hợp kết quả test không bình thường như : toàn Pass or toàn Failed

### Một số câu hỏi thường gặp về kiểm tra hồi quy:

Mục tiêu của regression test là gì?

Giống như tôi đã đề cập ở trên, kiểm tra hồi quy là một hoạt động của các trường hợp kiểm thử chạy lại để đảm bảo các thay đổi mới không phá vỡ các tính năng hoạt động. Như đã nói, mục tiêu của hồi quy không phải là khám phá và phát hiện các lỗi mới. Mục tiêu của kiểm tra hồi quy là xác nhận những gì được sử dụng để làm việc hiện vẫn hoạt động. Nói cách khác, kiểm tra hồi quy có expected kết quả là passed.

Khi thực hiện hồi quy, tôi nên thực hiện đúng các bước hoặc đi chệch khỏi các bước?

Không có quy tắc cài đặt nào về cách chạy bộ kiểm tra hồi quy. Về mặt lý thuyết, bạn cần tuân theo các bài kiểm tra hồi quy nghiêm ngặt từng bước khi chạy chúng. Tuy nhiên, làm theo từng bước là nhàm chán và không hiệu quả trong việc tìm ra các khiếm khuyết mới trong đó phần lớn kết quả là passed . Vì vậy, giải pháp là làm theo các bước nhưng cho bạn thời gian để đi chệch khỏi các bước để khám phá thêm một chút tính năng.

Kiểm tra hồi quy có thể được tự động?
Tất nhiên là có. Trong nhiều trường hợp, nó đã khuyến nghị tự động hóa kiểm tra hồi quy của bạn để làm cho kiểm tra hồi quy của bạn hiệu quả và cho bạn thêm thời gian để thực hiện kiểm tra thăm dò thêm và phát hiện các vấn đề.

Bao nhiêu là kiểm tra hồi quy đủ?
Mình không biết bạn như nào nhưng nó không thể luôn đạt 100% Regression test trừ khi bộ testcase nhỏ hoặc chạy bằng máy. Đôi khi bạn cần chạy tất cả các trường hợp thử nghiệm của mình, đôi khi bạn chỉ cần chạy * các trường hợp thử nghiệm quan trọng mà thôi *. Điều này đặc biệt đúng nếu bạn có nguồn lực hạn chế để thực hiện toàn bộ bài kiểm tra hồi quy. Vì vậy, hãy thông minh và chọn trường hợp thử nghiệm của bạn một cách khôn ngoan.

Nhóm của tôi không có thời gian để kiểm tra hồi quy, tôi nên làm gì?

Đây không phải là điều hiếm gặp trong thế giới thử nghiệm. Ở một số công ty, nhóm thử nghiệm thường được đặt ở cuối vòng đời dự án phần mềm và do đó, thử nghiệm thường bị đặt trong tình trạng không có đủ thời gian để chạy các trường hợp thử nghiệm. Có hai sự lựa chọn cho bạn:

Thay đổi quy trình dự án của bạn

Chiến đấu với những gì bạn có

Mặc dù thay đổi process công ty của bạn hoặc yêu cầu thêm thời gian là cách tốt nhất để làm, nhưng hầu hết thời gian, người kiểm tra thường không ở vị trí để thực hiện các thay đổi đó. Mình không nói rằng bạn không thể thay đổi, nhưng điều đó khó khăn và đòi hỏi nhiều nỗ lực và điều kiện để khiến mọi việc xảy ra. Những gì bạn đã kết thúc sống với những gì bạn có trong tay.

Vậy, bạn sẽ làm gì nếu bạn không còn nhiều thời gian để kiểm tra? Đây là gợi ý:

Chọn các thử nghiệm quan trọng nhất để regressed . Tận dụng đầu mục và mức độ ưu tiên của các trường hợp thử nghiệm của bạn, bạn sẽ có thể sắp xếp các trường hợp thử nghiệm quan trọng nhất để chạy thử nghiệm.

Hãy trung thực và luôn thông báo kịp thời cho các nhà quản lý . Điều này làm cho báo cáo thử nghiệm rất quan trọng. Nói với người quản lý những  bộ regression test đã chạy, chưa chạy và rủi ro của nó. Đừng cố gắng gây ấn tượng với các nhà quản lý ở đây, chỉ cần thực tế.

Tự động kiểm tra hồi quy của bạn. Nếu bạn có người có năng lực tốt , hãy thử tự động hóa kiểm tra hồi quy của bạn. Mặc dù khuyên bạn nên tự động hóa bài kiểm tra của mình trong khi bạn không có nhiều thời gian trong tay nghe có vẻ như lời khuyên nửa vời , nhưng hãy tin mình , nếu bạn đang có ứng dụng lớn (và tiếp tục tăng) và hầu hết chúng đều là việc regression test ổn định  , kiểm tra hồi quy có thể giúp bạn rất nhiều về lâu dài.

Suy nghĩ cuối cùng

Kiểm tra hồi quy là một trong những hoạt động kiểm thử mạnh mẽ nhất và giống như bất kỳ hoạt động nào mạnh mẽ, nó có thể giúp bạn tăng cường kiểm tra và tạo ra phần mềm tốt hơn nhưng cũng có thể rất tốn kém. Vì vậy, khi bạn làm điều đó, nó khuyên bạn nên tập trung vào giá trị (ví dụ: bạn sẽ được lợi gì) từ hoạt động đó. Ngoài ra, nếu có thể, hãy cân nhắc để tự động hóa nó để tận dụng tối đa nó.

Refer link : https://www.asktester.com/regression-testing-what-why-when-how/