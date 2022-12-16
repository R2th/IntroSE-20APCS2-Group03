# Lời mở đầu

Hi everyone !!!

Vừa rồi mình đã có một bài về các khía cạnh của của microservices. Nhìn chung thì microservices được sinh ra để đáp ứng các nhu cầu phần mềm hiện tại đó là việc triển khai phải nhanh, liên tục, đảm bảo chất lượng. Nếu chưa xem qua bạn có thể đọc tại [đây](https://viblo.asia/p/mirocservices-p1-what-why-and-when-m68Z0Wk6KkG).  Tuy nhiên việc phát triển ứng dụng theo microservices không phải là điều dễ dàng gì, nó rất phức tạp và nếu không có một sự chuẩn bị tốt, việc nó trở thành một thảm họa chỉ là vấn đề thời gian. Vì vậy mình dự định sẽ viết về một số thách thức khi triển khai microservices cho ứng dụng của bạn. Đây là những bài toán mà bạn cần phải giải quyết để có một sự chuẩn bị đúng đắn trước khi bước vào triển khai microservices cho ứng dụng của bạn. Các thách thức khi triển khai microservices bao gồm
- Application boundary: xác định ranh giới của ứng dụng (cụ thể là việc xác định các thành phần của hệ thống). Đây là thách thức đầu tiên trong khâu thiết kế ứng dụng của bạn. Làm thế nào để định nghĩa đúng một services, và tất cả các services cần thiết cho ứng dụng của bạn. 
- Network latency: việc chia ứng dụng thành nhiều services nhỏ, khiến cho các xử lý phải gọi nhau thông qua các cơ chế giao tiếp bên ngoài (hay remote call, chẳng hạn thông qua API) nên việc giao tiếp giữa các services chắn chắc sẽ có độ trễ nhất định so với in-process call. Làm thế nào để sống chung với nó.
- Data consistency: Đây chính là thách thức lớn nhất và cũng là ác mộng đối với những ai làm microservices. Microservices quản lí dữ liệu phân tán, mỗi service sẽ có database cho riêng nó. Chính vì thế việc đảm bảo tính nhất quán của data trên nhiều service chắc chắn là điều chúng ta phải làm được, và dĩ nhiên điều này cũng chẳng hề đơn giản.

Bài viết này sẽ giới thiệu cho các bạn về thách thức đầu tiên: Application boundary


# Application boundary - What is problem

Như đã giải thích sơ ở trên thì việc xác định ranh giới của ứng dụng là một trong những việc tạo nên sự thành công hay thất bại của sản phẩm mà bạn làm. Chúng ta cần phải nắm rõ ranh giới giữa các thành phần trong hệ thống. Tuy nhiên việc chia ranh giới giữa các phần trong hệ thống (các service) sẽ nên chia như thế nào

- chia theo code - nơi chúng ta xem service là một single unit và không thể phân chia được nữa
- chia theo chức năng và mỗi service sẽ đảm nhận từng chức năng
- chia theo lĩnh vực - mỗi service sẽ đáp ứng cho từng lĩnh vực riêng biệt...

Có hàng tá cách để chia hệ thống của bạn ra thành từng phần nhỏ nhưng hiển nhiên kết quả của mỗi cách sẽ hoàn toàn khác nhau. Và đây chính là vấn đề. Việc nắm rõ bản chất vấn đề sẽ giúp ta rút gọn được kha khá công sức trong việc đưa ra hướng giải quyết. 


# Application boundary - The solution

Mặc dù việc đưa ra vấn đề hơi rườm rà nhưng đó là cách mà mình muốn nhấn mạnh với các bạn, bản chất việc xác định ranh giới ứng dụng chính là việc chúng ta nên bóc tách các service theo hướng nào. Giữa vô vàn cách thì việc tiếp cận theo hướng tự nhiên luôn là cách phù hợp nhất. Những gì phản ánh tự nhiên luôn dễ dàng hơn so với những cách còn lại. Đó chính là lí do vì sao OOP thành công, vì sao chúng ta luôn cần object. Quay trở lại với hệ thống, việc triển khai service dựa trên các lĩnh vực các bộ phận mà nó có là cách tốt hơn so với việc triển khai theo technical và chức năng. Một số nguyên nhân có thể kể đến như:

- Tại sao không phải là technical. Đơn giản vì nó không phải là cái mà nhiều người có thể hiểu và tất nhiên là sẽ không bền vững theo thời gian. Việc bạn chia theo technical này và sau khi nó đã lỗi thời, refactor theo technical khác và lúc này các thành phần có còn như lúc đầu. Việc tiếp cận từ chính bussiness của hệ thống sẽ giúp cho những người làm việc với nó đều có cái nhìn chung và tất nhiên là nó sẽ bền vững theo thời gian (trừ khi tổ chức tái cơ cấu :smirk: mà nhưng vậy là làm mới hệ thống rồi)
- Và tiếp cận theo hướng chức năng có vấn đề gì. Thì với việc chia theo chức năng cũng là một ý tưởng tương đối tốt, một bộ phận có chức năng rõ ràng. Tuy nhiên đối với các mô hình hệ thống hiện tại, chúng ta có khái niệm về cross-function team. Đây chính là các bộ phận đảm nhận nhiều chức năng nhưng hướng về mục tiêu chung thì rõ ràng việc chia theo từng chức năng không còn là ý tưởng tốt nữa. Chẳng hạn như document services đảm nhận việc generator, stored hay bất cứ chức năng nào liên quan đến document. Nó sẽ rõ ràng hơn generator service, stored service

Thực ra việc lí giái đôi khi cũng giống như việc bạn chia các folder trong máy tính. Gom chung các ứng dụng theo chức năng (chẳng hạn như social, entertainment..) hay chia theo nhà phát hành (google app, microsoft app). Cái nào cũng có cái đúng của nó tùy trường hợp. Chính vì thế chúng ta phải xem xét cái bối cảnh hiện tại để xem xem nên chia nhỏ thành các đối tượng hay chia nhỏ thành các chức năng. Và vấn đề lúc này chính là xác định đâu là bối cảnh thích hợp để chúng ta đưa ra giải pháp thích hợp. Hay nói cách khác, cái chúng ta cần là bối cảnh giới hạn hay ngữ cảnh giới hạn (Bounded Context)

Lòng vòng mãi thì cái mình cũng muốn đề cập đến chỉ là **BOUNDED CONTEXT** thôi. Context (ngữ cảnh) là cách setting mà từ ngữ (hay câu lệnh) xuất hiện trong đó sẽ định nghĩa chính nó. Còn Bounded (giới hạn, ràng buộc,..) là các điều kiện mà theo đó các mô hình cụ thể được định nghĩa và áp dụng.

- Ví dụ về min và max. Chúng ta thì chắc ai cũng biết min, max nó là cái gì, nhưng giá trị của nó là bao nhiêu. Rõ ràng nó sẽ được xác định bởi những ngữ cảnh nhất định (ngữ cảnh giới hạn).  Nếu ngữ cảnh giới hạn ở đây là ngày hợp lệ thì min sẽ là 1 max sẽ là 31. 
- Hay ví dụ về câu hát một với một là hai, hai thêm hai là bốn, bốn với một là năm... các câu hát này rõ ràng không hề chỉ định phép tính cụ thể nào trong đó. Nhưng ta vẫn hiểu được nhờ vào tên bài hát "Tập đếm", đó chính là phép cộng. Rõ ràng bài hát sẽ phi lí nếu nó đặt trong ngữ cảnh nói về phép nhân, nhưng hoàn toàn hợp lí nếu nằm trong ngữ cảnh về phép cộng. Thế nhưng tất cả chúng ta đều nhìn nhận nó là phép cộng mặc dù không có từ ngữ nào nói lên đang dùng phép cộng. Chúng ta hiểu thông qua từ đếm, đếm chính là cách diễn đạt cho phép cộng mà ai cũng hiểu. Và đây là ví dụ mà mình muốn đề cập đến một khái niệm khác: ngôn ngữ chung hay  **UBIQUITOUS LANGUAGE** 

Và khi nói đến `BOUNDED CONTEXT`, `UBIQUITOUS LANGUAGE` thì chắc chắn các bạn cũng biết mình đang định nói đến cái gì. Đó chính là những khái niệm cốt lõi của **Domain Driven Design** hay `DDD`. Thấy mình lái hay chưa. Hẳn rồi, đúng như các bạn đang nghĩ, thì DDD chính là giải pháp để giải quyết vấn đề của application boundary. Tất nhiên là sẽ có những giải pháp khác, nhưng DDD chính là giải pháp tối ưu hiện tại. Mình cũng đã có bài viết về khác khái niệm cơ bản trong DDD nếu bạn muốn thì có thể xem tại [đây](https://viblo.asia/p/khai-niem-co-ban-ve-domain-driven-design-ddd-Do754qL4KM6), có nhiều khái nhiệm hơi khó hiểu nhưng mình sẽ cố lồng ghép giải thích vào các bài viết sau, chẳng hạn như bài viết này mình có đề cập lại `BOUNDED CONTEXT` và `UBIQUITOUS LANGUAGE` . 

Vậy làm thế nào DDD có thể giải quyết vấn đề này? Thì đầu tiên hãy nhìn vào bức tranh tổng thể của DDD

![](https://images.viblo.asia/288bf344-43e3-460b-9c36-caac5600750b.png)


Với nhiều người, DDD là một kĩ thuật tập trung vào code, xây dựng hệ thống với aggregate root, entity, value type, ... và đó là sai lầm. Đó không phải là mục đích của DDD, DDD đưa ra các khái niệm đó để làm cơ sở cho ngôn ngữ chung. Mục đích chính của DDD là tạo ra một ngôn ngữ giúp cho domain expert và developer có cùng một quan điểm và không bị hiểu sai ở bất cứ trường hợp nào. Nó giúp cho tất cả mọi người khi thực hiện đều không cần phải phán đoán, xác nhận lại mọi thứ. Nó lí giải việc tại sao bạn phải code thế này, tại sao phải dùng cái kia, bạn hoàn toàn kiểm soát được mình đang code cái gì. 

Như sơ đồ phía trên, chúng ta bắt đầu bằng cuộc trò chuyện giữa domain expert và developer nhằm xác định các vấn đề cần giải quyết, những yêu cầu của hệ thống... và nó phải đưa ra được hệ thống ngôn ngữ chung để trao đổi dựa trên đó. Từ đó sẽ đúc kết được các thông tin, yêu cầu của hệ thống và phân chia thành các domain. Đó là cách mà DDD vận hành.

# Lời kết


Yeah, thách thức đầu tiên khi triển khai microservices chính là xác định giới hạn của nó. Và phương pháp tốt nhất để giải quyết chính là áp dụng DDD vào trong thiết kế. Việc này giúp cho chúng ta có một bức tranh về hệ thống tốt nhất có thể. Việc trình bày chi tiết về DDD mình cũng cân nhắc rất kỹ, mình đã có một bài viết giới thiệu ở phần đầu, tuy nhiên còn khá sơ sài và khó hiểu, nhưng nhiệc nhét vào bài viết này cũng không hoàn toàn là hợp lý. Vì bài viết này chủ yếu nói về vấn đề của mircoservices và DDD là giải pháp chứ bài viết này không hẳn tập trung vào DDD. Mình sẽ có một bài viết khác về DDD rõ ràng hơn, dễ hiểu hơn. Mong các bạn đón xem.

Hẹn gặp lại các bạn ở bài viết sau. Cảm ơn đã đọc bài viết

# Tham khảo

https://martinfowler.com/bliki/ApplicationBoundary.html