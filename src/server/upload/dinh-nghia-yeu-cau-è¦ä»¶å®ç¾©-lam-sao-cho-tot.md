## Mở đầu:

Trong quá trình tìm hiểu về Định nghĩa yêu cầu (要件定義) với vai trò là 1 BrSE, mình tìm được 1 bài viết khá hay, muốn dịch ra và chia sẻ cho những ai quan tâm cùng đọc.

Đây là link gốc bài viết: https://www.atmarkit.co.jp/ait/articles/1507/02/news009.html

Nếu có gì sai sót, mong mọi người góp ý.

Sau đây là bài dịch của mình.

### Vốn dĩ, định nghĩa yêu cầu là cái gì?

Trong phát triển hệ thống, định nghĩa yêu cầu (要件定義) chính là bước đầu tiên. Rút ra các yêu cầu từ phía khách hàng và thực hiện tổ chức sắp xếp các chức năng cần phải thực hiện trong hệ thống.

Dựa vào nội dung đã sắp xếp, thực hiện tạo flow nghiệp vụ, kịch bản nghiệp vụ, mô hình dữ liệu,... kiểm tra xem có bất kỳ sự khác biệt nào so với nhận thức của phía khách hàng hay không. Xét theo từ ngữ thì  định nghĩa yêu cầu trông có vẻ đơn giản, nhưng thực tế lại khó khăn hơn nhiều.

Vậy thì, làm thế nào để có thể thực hiện được việc định nghĩa yêu cầu một cách suôn sẻ nhất? 
Mấu chốt ở đây là phải xác định được 2 điểm:  **「Điều kiện để hoàn thành định nghĩa yêu cầu là gì」** và **「Cách để lấy ra yêu cầu」**. Trước tiên, chúng ta cùng xem xét về điều kiện hoàn thành định nghĩa yêu cầu là gì

### Mục tiêu của định nghĩa yêu cầu chính là phải quyết định được các phương án giải quyết yêu cầu.

Theo như bên dưới, khi phát triển hệ thống, chúng ta sẽ bắt gặp các khái niệm khá gây nhầm lẫn, đó là  **「Yobou」(要望)**,  **「Yōkyū」(要求)**  và **「Yōken」 (要件)**. (Cả 3 chữ khi dịch sang tiếng Việt đều có thể dịch là yêu cầu). Tuy nhiên, ý nghĩa thực sử của 3 chữ thì lại hoàn toàn khác nhau. Có khá nhiều người hiểu đơn thuần việc định nghĩa yêu cầu là *"Công việc làm rõ các yêu cầu của khách hàng"*. Tuy nhiên, cách hiểu này không hoàn toàn đúng. Việc làm rõ các yêu cầu của khách hàng là việc đương nhiên rồi. Định nghĩa yêu cầu còn là việc suy nghĩ trước về các giải pháp giải quyết yêu cầu đó

|  | Giải thích | Ví dụ|
| -------- | -------- | -------- |
| 「Yobou」(要望)|Những điều mơ hồ chưa biết thực sự muốn làm gì. Những mong muốn xét từ quan điểm user. Lý tưởng. Hiệu quả chưa rõ. Có thể được thể hiện bằng câu "Thật tốt khi đó là abc, xyz|Hiện tính toán hoá đơn hàng tháng đang được  count lại ở form nhập. Muốn thay đổi form này vì gây tốn thời gian |
| 「Yōkyū」(要求)|Những gì muốn làm là rõ ràng, nhưng chưa quyết định chi tiết. Tài liệu đã được cấu trúc. Có thể được thể hiện bằng câu "Tôi muốn thực hiện abc, xyz |Thông tin hoá đơn muốn nhập vào là A, B, C, D|
| 「Yōken」(要件)|Có thể chỉ ra được làm cách nào để thực hiện được việc muốn làm. Kể cả việc không làm được cũng có thể chỉ ra được.     |A là doanh thu mỗi tháng của mỗi cửa hàng, B được tính bằng cách nhân A với 1 hệ số cố định ứng với mỗi cửa hàng|.


Ví dụ, khi làm việc với khách hàng, chúng ta thống nhất được với khách hàng việc form nhập vào sẽ có 4 item từ A~D. Nhìn qua thì tưởng rằng đến đây là đã kết thúc được việc định nghĩa yêu cầu. Tuy nhiên, thực tế thì lúc này vẫn chưa thể thiết kế được hệ thống. Nguyên nhân là vì còn chưa nắm rõ với mỗi item, cần phải tính toàn như thế nào, hay là tổng hợp ra sao. Kết cục, vài ngày sau đó lại phải thực hiện họp với khách hàng thêm 1 lần nữa. Như vậy thì chưa thể nói là đã kết thúc được việc định nghĩa yêu cầu.

> **「Định nghĩa yêu cầu」＝「Việc suy nghĩ về các giải pháp giải quyết yêu cầu」**


Thực tế thì có nhiều ý kiến cho rằng các yêu cầu của khách hàng rất thường xuyên thay đổi nên không có cách nào có thể xác định chính xác. Cho nên cứ vừa làm vừa tổng hợp lại chi tiết thì sẽ hiệu quả hơn.
Phải công nhận là khó để có một hình ảnh cụ thể mô tả chi tiết hệ thống dựa trên các tài liệu như danh sách chức năng và cấu tạo chức năng. Tuy nhiên, việc lao vào quá trình tiếp theo trong khi specification của chức năng chưa rõ ràng thì còn rủi ro hơn. 
Rốt cuộc, việc bỏ ra công sức để làm rõ specification là một việc phải làm. Dành thời gian để nói chuyện với khách hàng, để phía phát triển hiểu được những vấn đề vướng mắc mà khách hàng thực sự cần giải quyết, từ đó có thể đưa ra các đề phù hợp. 

Ngoài ra, việc định nghĩa yêu cầu còn là việc làm rõ những việc không thể làm. Đặc biệt, trong các trường hợp bảo trì các hệ thống đang sử dụng, khách hàng thường có suy nghĩ có 1 vài chức năng là phải đương nhiên follow, và rồi không hề nhắc tới trong các cuộc thảo luận và cứ nghĩ rằng các chức năng đó sẽ được thực hiện. Cần phải chỉ rõ trong trường hợp xóa bớt các chức năng trong hệ thống cũ. Ví dụ có thể tạo 1 bảng so sánh các chức năng cũ và mới trong hệ thống cũng là 1 cách hiệu quả.

Rất đơn giản để xác định được khi nào thì việc định nghĩa yêu cầu kết thúc. **Đó là khi đã chỉ rõ được phương án giải quyết đối với yêu cầu đó**, và có thể thiết kế, tài liệu hóa được nội dung này. Nếu làm được đến vậy thì quá trình thiết kế sẽ smooth hơn. Giúp cho việc estimation cho các công đoạn còn lại được dễ dàng hơn.

### Phương pháp Kakashi khi lấy ra yêu cầu từ khách hàng

Việc kết thúc quá trình định nghĩa yêu cầu là do phía phát triển quyết định. Bởi vì có nhiều trường hợp, cho dù phía phát triển còn cảm thấy yêu cầu mơ hồ, spec chưa tổng hợp được hết thì khác hàng vẫn sẽ nghĩ, "Phía phát triển sẽ điều chỉnh các chi tiết vào thời điểm release, và cuối cùng tất cả các yêu cầu đều được thỏa mãn". 
Cho nên, để tránh những ý kiến phàn nàn không hài lòng khi bàn giao hệ thống, việc thống nhất được các chi tiết nhỏ nhất trong yêu cầu là rất cần thiết.

Để làm được điều đó thì phía phát triển cần phải thực sự đào sâu vào phân tích yêu cầu. Vấn đề là làm thế nào để lấy được những thông tin cần thiết từ phía khách hàng?
Như ví dụ dưới đây, khi khách hàng muốn phát triển 1 chức năng export hóa đơn trên hệ thống. Khi đó bên phía phát triển chắc chắn sẽ phát sinh rất nhiều vấn đề cần xác nhận. Tuy nhiên, phải mất một khoảng thời gian đáng kể để có thể xác nhận được tất cả vấn đề. 
Chưa hết, rất khó để mà điều chỉnh được yêu cầu. Phía khách hàng còn có xu hướng mong muốn nhận được kết quả theo đúng như yêu cầu của họ, bất chấp các vấn đề về kĩ thuật phát sinh. Khi khách hàng không nắm rõ về nghiệp vụ, sẽ rất khó để tranh luận hay giải thích với họ điều này.

Để giải quyết được các vấn đề này, xin giới thiệu 1 phương pháp gọi là phương pháp **Kakashi**. 
=> Hãy hỏi khách hàng **"Cái này thì thấy thế nào ạ?"** Khi được hỏi, người ta thường ngại đưa ra 1 câu trả lời mà không có lý do giải thích. Vậy nên, chúng ta sẽ nhận được nhiều thông tin hơn từ việc đặt câu hỏi như vậy. Nếu ý kiến tồi, khách hàng sẽ cho thấy quan điểm của họ, mong muốn thực sự của họ là gì.

Mấu chốt ở chỗ, chuẩn bị sẵn 1 phương án đề xuất và chấp nhận chịu phản bác về phương án đó của mình. Ví dụ, khi chuẩn bị để quyết định hình thức gửi hóa đơn, đầu tiên, chúng ta đưa ra cho khách hàng đề xuất là sẽ không gửi hóa đơn mà chỉ cho download file PDF trên hệ thống. Khi đó, khách hàng sẽ phản bác "như vậy không ổn rồi, vì chức năng gửi hóa đơn bằng FAX là cần thiết, lý do là vì xyz...", từ đó khách hàng sẽ giải thích rõ bối cảnh của vấn đề. Việc được khách hàng giải thích lý do của yêu cầu chính là điều quan trọng nhất.

Nếu chúng ta chỉ đơn thuần hỏi khách hàng **"Cái này muốn làm như thế nào?"**, thì sẽ khó tìm ra được lý do cốt lõi. Ví dụ, khi chúng ta hỏi "hình thức gửi hóa đơn là gì?", thì khách hàng rất có thể sẽ trả lời "Tôi muốn có thể download PDF", "cũng muốn cả gửi qua mail", sau đó "muốn cả gửi qua FAX nữa"....Tóm lại, nguy cơ sẽ nhận được các câu trả lời kiểu "tôi muốn thế này", "tôi muốn thể kia"...Và kết cục khi không nắm rõ được lý do của yêu cầu thì khó mà xác định được spec.

Con người thường có xu hướng khi cảm thấy "A, cái này sai rồi" thì mới thực sự nhận ra bản thân mình muốn gì. Cho nên, lợi dụng tâm lý đó, chúng ta hãy tìm hiểu lý do từ việc chấp nhận các phản bác khi đưa ra đề xuất. Luôn luôn có 1 lý do ẩn đằng sau mỗi yêu cầu. 

### Ý thức về 5W2H. Trước tiên hãy cứ văn bản hóa yêu cầu. 

Trong các dự án thông thường, flow nghiệp vụ hay là user case thường được xem như là sản phẩm của quá trình định nghĩa yêu cầu. Các loại tài liệu như vậy thường khá dễ nhìn, do đó, dễ khiến cho người ta có cảm giác là các yêu cầu đã đang được điều chỉnh đầy đủ. Thực tế thì việc tạo các hình minh họa hay là vẽ các connection thì sẽ dễ nhìn nhưng rất tốn thời gian, thay vào đó sẽ ko có nhiều không gian cho việc giải thích. Cho nên không ít trường hợp chỉ có người tạo ra tài liệu mới có thể hiểu được ý đồ.

Vậy nên không nên lấy các kiểu tài liệu như vậy (flow nghiệp vụ, user case...) để làm sản phẩm cho việc định nghĩa yêu cầu.  Trước tiên, khuyến khích nên viết ra các câu chữ định nghĩa business specification. Biến mọi thứ thành câu chữ, như vậy sẽ dễ dàng nhận thấy các thiếu sót. Yêu cầu nào mà không được viết ra thì sẽ thấy được không có yêu cầu đó.。

Như ví dụ bên dưới về business specification của 1 yêu cầu liên quan tới chức năng đăng kí cửa hàng thành viên ở site thông tin cho thuê. Tuy rằng ko tạo flow nghiệp vụ nhưng nhìn vào vẫn cố thể nắm được business cũng như flow.

> **Business specification của 1 yêu cầu liên quan tới chức năng đăng kí cửa hàng thành viên ở site thông tin cho thuê**
> * Khi đăng kí thêm cửa hàng thành viên, thì sẽ đăng kí vào DB hệ thống thông tin tên công ty, số bưa điện, số điện thoại, địa chỉ, email liên lạc, tên người đại diện.
> * Sau khi nhận request đăng kí, công ty đó sẽ thực hiện thẩm tra việc thêm cửa hàng. Việc thẩm tra kết thúc sau khi người phụ trách kiểm tra lần 1 và người giám sát approve lần cuối. Người giảm sát cuối cũng có thể đảm nhận vai trò của người phụ trách.
> * Sau khi quá trình thẩm tra được approve thì sẽ tiến hánh cấp ID đăng nhập vào my page cho cửa hành đã được add. ID đăng nhập này được cấp thông qua email của hệ thống vào thời điểm approve.
> * Cửa hàng thành viên có thể đăng ký thông tin store của mình trong my page. Thông tin cửa hàng bao gồm hình ảnh về diện mạo cửa hàng, số điện thoại, số fax, địa điểm cửa hàng, giờ mở cửa, và hình ảnh bản đồ cho biết vị trí.
> * Nếu 1 cửa hàng thành viên được setting là cửa hàng thân quen thì sẽ giảm 5% chi phí sử dụng hàng tháng. Việc setting này chỉ có cửa hàng master được phép thực hiện.
> * Cửa hàng thành viên có thể đăng kí thông tin nhiều store của mình trong my page. Tối đa sẽ được đăng kí liên kết với 100 store. (Có thể đăng kí bằng cách upload csv)
> * Chuẩn bị cho mỗi store 1 my page riêng. Mỗi store cũng được setting 1 account. Không cần thiết phải thẩm tra thông tin store.

Nhìn vào spec trên thì nhiều người sẽ cảm thấy khá là lộn xộn, và có nhiều điểm nghi vấn cần xác nhận. Tuy nhiên, trước mắt hãy cứ viết ra thành những câu mô tả như vậy để đảm bảo điều quan trọng là ghi lại các spec tại thời điểm đó và đảm bảo rằng chúng có thể được xác nhận bởi những người liên quan. Việc sắp xếp điều chỉnh có thể để sau.

Để có thể viết ra được các câu mô tả như vậy, một phương thức rất hữu ích là **5W2H**. Mỗi câu mô tả sẽ trả lời cho các câu hỏi **"When = Khi nào?", "Where = Ở đâu?", "Who = Ai?", "What = Cái gì?", "Why = Tại sao?", "How = Bằng cách nào?" và "Howmuch = bao nhiêu?"**

| 5W2H | Ví dụ |
| -------- | -------- | 
| When = Khi nào?     | Thời hạn, thời điểm như thế nào?|
| Where = Ở đâu?  |Cái này được sử dụng nội bộ hay bên ngoài? Có phối hợp với một hệ thống khác hay không?|
| Who = Ai? |Ai là người dùng? Có giới hạn cho một người dùng nhất định hay không? |
| What = Cái gì? |Xử lý các thông tin kiểu như thế nào?|
| Why = Tại sao?|Vốn dĩ vì sao chức năng này lại cần thiết?|
| How much/How many = bao nhiêu?|Thực hiện mỗi ngày hay là mỗi năm hay 1 lần? Ước lượng khoảng bao nhiêu?|
| How = Bằng cách nào?|Có những cách thức nào để giải quyết vấn đề này?|

Đặc biệt nên chú ý vào **"Who = Ai?", "Why = Tại sao?" và "How much/How many = bao nhiêu?"**
* Đối với **"Who = Ai?**": Phía khách hàng đã quen với bussiness của họ, cho nên nhiều trường hợp không giải thích rõ về vấn đề "Ai". Dẫn đến phía phát triển không nắm được  chủ thể của hành động.
* Về **"Why = Tại sao?"**: Cần biết lý do để đánh giá tính hợp lý của yêu cầu. Phía phát triển thường có suy nghĩ yêu cầu của khách hàng là bắt buộc, mà không xác nhận lý do tại sao yêu cầu là cần thiết khi làm việc với khách hàng.
* Về **"How much/How many = bao nhiêu?"**: Thông số về tần suất sử dụng hay là số lượng thường bị miss khi xác định yêu cầu. Có vẻ nguyên nhân là do phía phát triển có cảm giác rằng việc xác nhận đi xác nhận lại về các thông tin này sẽ gây khó chịu cho khách hàng nên thường e ngại việc này.

Cứ viết rồi confirm, viết rồi confirm, lặp đi lặp lại. Xác nhận với khách hàng xem có điểm sai sót không. Nếu được thì cũng làm cho bên phía confirm có nhận thức về 5W2H khi review.

Những vấn đề tưởng như là đương nhiên, ai cũng hiểu thì cũng cần phải ghi ra. Tốt nhất là để cả 2 bên nhận thức được "Cái gì không viết ra thì sẽ không thực hiện vào hệ thống". Những việc không làm được cũng nên viết ra. Khi các văn bản này được FIX ở một mức độ nào đó, nó sẽ được phát triển thành các sản phẩm khác nhau như business flow hay là use case.

Một số bạn có thể tự hỏi, "Nên viết ra cỡ như thế nào là vừa?" Theo nguyên tắc thông thường, để phát triển ứng dụng có quy mô 100 men/month, tôi đã tạo 1 wiki chuyên dụng 100.000 chữ và maintaince với cả khách hàng. Ngay cả với dự án quy mô nhỏ, ít nhất cũng nên viết ra cỡ 10.000 chữ cái và làm rõ các spec.


### Không phải cứ giao bóng cho đối phương là xong chuyện.

"Bởi vì khách hàng không trả lời cho QA về spec trước thời hạn, cho nên không thể fix được spec cho chỗ này" là một tình huống không ít người phàn nàn trong quá trình định nghĩa yêu cầu. Đó thường là trường hợp khi gửi tài liệu cho khách hàng để nhờ khách hàng quyết định, tuy nhiên lại không nhận được trả lời, cho nên không thể kết thúc công việc được.

Có lẽ chúng ta nên thay đổi mindset ở chỗ này. Thay vì đổ lỗi cho khách hàng thì hãy suy nghĩ là "Việc thu thập đủ câu trả lời của khách hàng trước thời hạn cũng coi như là 1 kĩ năng". Phải nghĩ là nếu không làm được như vậy thì không thể xem là professional được.

Biết đâu chừng ở phía khách hàng cũng có những vấn đề của họ. Ví dụ như nội dung tài liệu mà chúng ta gửi đi khó hiểu, hoặc là bên khách hàng quá bận không có thời gian. Phía phát triển chúng ta có thể chỉ tập trung vào dự án này nhưng thực tế khách hàng có thể đang đảm nhận nhiều công việc khác. Vậy nên, nếu bỏ qua hết sự tình đó mà chỉ nghĩ rằng giao phó toàn bộ trách nhiệm cho khách hàng thì khó tạo được mối quan hệ lâu dài với khách hàng được. 

Có nhiều cách để giải quyết vấn đề này. Giả dụ như cố gắng tạo thời gian để cùng nhau suy nghĩ, hoặc nhờ tới cấp trên của khách hàng đang đảm nhận dự án mình tạo thêm effort cho họ. Project Manager của phía phát triển cần phải ý thức được tải trọng công việc của khách hàng đảm nhận dự án. Tóm lại, phải ý thức được việc giải quyết các yếu tố cản trở công việc là trách nhiệm của cả 2 bên.


### Không nề hà công sức, đối ứng một cảnh cẩn thận.

Mục đích của việc định nghĩa yêu cầu là phải tìm ra và quyết định được các phương án giải quyết cho yêu cầu đó. Không phải chỉ làm rõ các yêu cầu có nghĩa là kết thúc. Ở khâu định nghĩa yêu cầu mà không thể đào sâu phân tích các thông số kĩ thuật thì sau này sẽ mất nhiều thời gian ở quá trình thiết kế. Nhìn vào các dự án thất bại, trong hầu hết các trường hợp, thường thấy là chất lượng của sản phẩm được tạo ra trong quá trình định nghĩa yêu cầu đều không đủ tốt. Để không làm như vậy, thực hiện các hoạt động để gợi ra các yêu cầu mà chính phía khách hàng cũng chưa nắm được.

Dẫu rằng trong lúc định nghĩa yêu cầu, khi đã viết ra rồi, nay mai lại thay đổi là chuyện thường gặp, gây tốn thời gian maintaince. Tuy nhiên nếu có tinh thần viết và tổng hợp ra ngay, đối ứng 1 cách cẩn thận, thì chắc chắn chất lượng hệ thống sẽ tốt hơn. Kĩ năng khai thác thông tin cũng như kĩ năng văn bản hóa không phải là dễ học. Tuy nhiên dù có tốn thời gian thì hãy xem như đây là 1 cơ hội để cải thiện kĩ năng của mình. Những người quản lý rất mong muốn có những nhân viên có suy nghĩ như vậy.

Xin hết.