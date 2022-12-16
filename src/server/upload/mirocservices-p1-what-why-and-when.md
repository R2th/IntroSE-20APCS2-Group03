# Lời mở đầu

Chào, vẫn là mình và lần này thì không phải là về docker nữa. Tại vì chưa hài lòng lắm với nội dung docker hiện tại nên là mình chuyển sang một nội dung khác, mang tính thử thách hơn. Đó chính là microservices. 

Một trong những lý do mình tìm hiểu docker cũng chính là để sử dụng trong việc triển khai ứng dụng theo microservices. Đây cũng là thứ mà mọi người nói nhiều trong thời gian gần đây. Cũng là điều dễ hiểu khi mà thời điểm microservices ra đời gặp rất nhiều vấn đề về mặt kĩ thuật cũng như công nghệ triển khai. Tuy nhiên bây giờ, mọi chuyện đã khác, sau gần 15 năm nỗ lực nghiên cứu cùng với sự phát triển vượt bậc về mặt công nghệ, micrservices không còn là thứ không thể tiếp cận nữa. Và bài viết này, mình xin giới thiệu những gì mà mình đã tìm hiểu thông qua những câu hỏi cơ bản nhất: nó là gì, tại sao phải là microservices và khi nào thì cần microservices.

Bắt đầu thôi.


# Microservices là gì

> In short, the microservice architectural style is an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API. These services are built around business capabilities and independently deployable by fully automated deployment machinery. There is a bare minimum of centralized management of these services, which may be written in different programming languages and use different data storage technologies.
> 
> — James Lewis and Martin Fowler (2014)

Định nghĩa của Martin Fowler và James Lewis theo mình là chuẩn nhất. Về cơ bản, microservices - hay microservice architecture - là một cách phát triến hệ thống theo kiến trúc hướng dịch vụ (Service Oriented Architecture), trọng tâm sẽ là phát triển một ứng dụng từ nhiều services nhỏ, mỗi service sẽ có các đặc điểm chính:
- triển khai từ các lĩnh vực business
- Triển khai độc lập và tự động
- liên kết lỏng lẻo
- có yêu cầu cao về test cũng như maintain.
Ngoài ra các service sẽ giao tiếp với nhau bằng một cơ chế nhẹ như HTTP API, được phát triển từ các team có size nhỏ (thường từ 4-9 người).


# Đặc điểm của microservices

Định nghĩa cũng dễ hình dung, tuy nhiên thì cũng cần phải nắm thêm một số đặc điểm để xác định một ứng dụng có phải là microservices hay không. Đây cũng là phần để trả lời cho câu hỏi khi nào mà một ứng dụng được phát triển theo kiến trúc mircoservices. Mình sẽ cố gắng phân tích để thông qua các đặc điểm này, các bạn cũng có nắm được thế nào là microservices

![](https://images.viblo.asia/43fd60a7-bc4f-492b-aece-807ba494ebfd.png)

Componentization via Services: đầu tiên cần làm rõ component ở đây là gì. Nó không phải là một item trên màn hình hay là một object. Component ở đây là một bộ phận, một đơn vị phát triển phần mềm có thể triển khai một cách độc lập. Có thể hiểu nó như là một module cũng đúng. Vậy tại sao phải là services? Microservices mà, nó phải là services. Lý do cho việc này nằm ở việc triển khai component một cách độc lập, nhanh chóng. Như ta cũng biết thì chúng ta có thể sử dụng thư viện để cung cấp các phần logic riêng biệt, dễ dàng triển khai và thay thế. Tuy nhiên việc sử dụng thư viện gặp nhiều hạn chế, chẳng hạn như ngôn ngữ, thậm chí là từng phiên bản cũng có những sự khác biệt. Điều này có thể sẽ là một rắc rối nếu như một thư viện update mà code của bạn lại không đáp ứng được yêu cầu của thư viện đó. Chính vì thế, việc phát triển từng thành phần dưới dạng services làm giảm bớt vấn đề này, và nó cũng phù hợp với nội dung liên kết lỏng lẻo trong định nghĩa (phần liên kết lỏng lẽo nó không chỉ về mặt kĩ thuật mà còn là về business, mọi thứ không nên quan hệ với nhau quá nhiều dẫn đến không thể tách rời ra được). Mặc dù việc đánh đổi đó là việc sử dụng các services phải thông qua các API, nghĩa là nó chậm hơn so với thư viện. Nhưng việc xử lý cơ chế API cũng như các vấn đề về network thì rõ ràng đơn giản hơn các vấn đề mà thư viện đem lại. Chính vì thế, services là cái được chọn


Organized around Business Capabilities: tiếp theo đó là vấn đề về việc chia tách và xác định các services. Như ở nói ở trên, mỗi services hay một component là một đơn vị phần mềm có thể triển khai độc lập. Thế nhưng ranh giới nào để xác định được thế nào là một đơn vị phần mềm. Một chức năng hay một quy trình... việc xác định rõ ranh giới này cho chúng ta một định nghĩa chính xác về những gì service cần. Việc phân tách này không phải là vấn đề đơn giản và người có thể xác định rõ điều này lại không phải là người code như chúng ta mà chính là người làm business. Việc phân tách theo business của chính tổ chức, con người sử dụng hệ thống thì đơn giản hơn rất nhiều. Và những người này, tất nhiên tư duy theo business mà họ tham gia. 


Products not Projects: ya, đây là nội dung thú vị không liên quan nhiều về mặt kỹ thuật mà về mặt tâm lý. Hãy đặt mình trong vị thế là người làm product, có nghĩa là code xong chưa phải là xong. Mà còn là các câu chuyện khác như bảo trì, phát triển sản phẩm để nó ngày một tốt hơn. Chứ không phải chỉ là xong rồi là hết trách nhiệm. Đây cũng là điều giúp cải thiện rất nhiều về mặt chất lượng.


Smart endpoints and dumb pipes: việc sử dụng nhiều service cũng gặp trở ngại nếu như quy trình gọi nhau quá nhiều. Chẳng hạn như service A gọi service B, B lại gọi C, C gọi D... và nếu không may, một trong số chúng crash. Do network hay bất cứ thứ gì. Việc kết nối càng nhiều thi tỉ lệ rủi ro càng cao nên cân nhắc kĩ các biện pháp giao tiếp giữa các services. 


Decentralized all thing: Việc có nhiều services nghĩa là bạn phải phân tán mọi thứ theo từng services. Việc nhiều services dùng chung một resource là một ý tưởng cực kì tồi tệ. Việc phân tách về mặc logic, data là không tránh khỏi, nên hãy chắc chắn bạn quản lý được việc này.


Infrastructure Automation: Như trong định nghĩa, các services cần được triển khai nhanh chóng và tự động nên việc nó nằm trong những đặc điểm của microservices không phải là điều quá ngạc nhiên. Việc chia nhỏ các services giúp cho quá trình tự động hóa trở nên dễ dàng hơn. Bên cạnh đó các nền tảng cloud cũng cung cấp những dịch vụ tốt nhất để chúng ta có thể triển khai mọi thứ một cách tự động.


Design for failure: Đây là điều khác biệt phải nói là mang tính quyết định của microservices. Việc triển khai mọi thử riêng lẽ tất nhiên là sẽ chứa rất nhiều rủi ro và các vấn đề có thể xảy ra. Nên failure là một điều chắc chắn không tránh khỏi. Và dĩ nhiên, đã không tránh khỏi thì ta không cần phải tránh. Phải xử lý cho mọi trường hợp, đặc biệt một service chết không kéo theo một service khác chết theo. Việc triển khai services nhỏ giúp cho việc sửa chữa và triển khai bản vá trở nên nhanh chóng hơn, giảm tốt đa downtime có thể xảy ra.


Evolutionary Design: đặc điểm cuối cùng, đó chính do sự dễ thay thế mà các services đem lại. Việc thay thế một service nhỏ so với thay thế một hệ thống lớn, cái nào dễ thì làm thôi.

Đây là phần giải thích nhanh những gì mình đúc kết được. Nếu bạn quan tâm, có thể tham khảo tại [đây](https://martinfowler.com/articles/microservices.html#ComponentizationViaServices)


# Why microservices?

Đa số mọi người thông thường sẽ so sánh với monolith để chỉ ra lí do lựa chọn microservices nhưng mình thì cố gắng đưa ra những quan điểm không dựa trên sự so sánh này. Đầu tiên phải nhắc đến định luật Conway

![](https://images.viblo.asia/ab6f40eb-cbee-4947-ad11-c1584b78ee6d.jpg)


Như nội dung ở ảnh minh họa. Định luật Conway phát biểu rằng mọi cấu trúc hệ thống của một tổ chức sẽ phản ánh từ chính cấu trúc truyền thông của tổ chức đó. Thực tế, đối với những công ty có quy mô lớn, tất nhiên nó sẽ được chia thành nhiều phòng ban, như kế toán, kinh doanh, kỹ thuật. Mỗi phòng ban chịu một trách nhiệm riêng, có phương hướng hoạt động riêng biệt. Đó chính là nền tảng, ý tưởng để thiết kế nên cấu trúc của microservice, phản ảnh đúng cấu trúc của tổ chức. 

Lí do thứ hai, đó chính là xuất phát từ nhu cầu phần mềm hiện tại. Khách hường có xu hướng yêu cầu cập nhật ứng dụng liên tục, điều đó có nghĩa là phải triển khai ứng dụng một cách nhanh chóng, chất lượng, thường xuyên. Đây là trở ngại lớn nhất khi mà microservice ra đời và cũng là thứ giúp cho microservice có được vị thế hiện tại. Khi một ứng dụng trở nên quá lớn. Việc deploy nó là cả một vấn đề. Rồi khi có lỗi xảy ra, việc sửa lỗi và deploy nhanh nhất có thể lại là một vấn đề lớn hơn nữa. Việc phát triển theo hướng microservice giúp ta tiết kiệm rất nhiều thời gian và công sức cho việc này. Xây dựng cơ chế deploy riêng cho mỗi services, vì nó là một services nên tất nhiên việc deploy sẽ nhanh chóng. Độ phức tạp không lớn, và với sự ra đời của devops, việc tự động hóa quá trình này càng là thứ có thể nằm trong lòng bàn tay. Devops chính là mảnh ghép cuối cùng để đưa microservices lên một tầm cao mới, khiến cho việc triển khai microservices trở nên đơn giản hơn nhiều

![](https://images.viblo.asia/06cc3a09-64cf-4964-8d24-61025e500f22.png)


Và lí do thứ ba, thông qua các đặc điểm, chắc bạn cũng có thể đoán được. Đó là khả năng thích nghi và phát triển. Công nghệ càng lúc càng tiến bộ, source của bạn chắn hẳn ngày càng lỗi thời. Việc thay thế nó dần trở thành cấp bách theo thời gian và nếu như cứ ôm một bộ source quá lớn. Thì công sức bỏ vào để thay đổi chẳng khác nào thiết kế lại một thứ hoàn toàn khác. 

Và tất nhiên mircoservices cũng có những điểm yếu của nó là đây là các lý do tại sao bạn không nên sử dụng microservices?

1. Độ phức tạp: Đây là trở ngại lớn nhất cho những ai muốn tiếp cận microservices. Có quá nhiều thứ phải biết, quá nhiều thứ phải kiểm soát. Nó đòi hỏi bạn phải có đủ năng lực để làm nó, nếu không mọi thứ sẽ biến thành ác mộng. 

![](https://images.viblo.asia/ea501f6b-c750-4720-98ae-c260c3eb9824.png)

2. Chi phí: Khi mà bạn đã đủ năng lực thì một vấn đề khác chính là chi phí cần phải bỏ ra. Đó là tiền bạc, là effort. Việc xây dựng nhiều services, triển khai tự động, sử dụng nhiều dịch vụ đòi hỏi phải có chi phí vận hành cao. Chưa kể ở giai đoạn ban đầu, việc thiết kế và xây dụng các service là một khối lượng công việc khổng lồ mà nếu không có kế hoạch rõ ràng, nó sẽ cản bước bạn trong việc triển khai microservices

3. Microservices không phải là giải pháp để cải thiện chất lượng sản phẩm. Nhiều người vẫn tin rằng sản phẩm của họ tồi tệ là do thiết kế monolith mang lại. Tuy nhiên việc sử dụng microservices không khiến số lỗi hệ thống gặp phải giảm đi, mà còn tăng lên, tăng rất nhiều là đằng khác. Chưa kể việc triển khai microsservices đòi hỏi rất nhiều vào automation test, và nếu bạn bỏ qua, thì tất nhiên nó dần trở thành ác mộng


![](https://images.viblo.asia/4d229b0f-1d57-42f5-802b-53dbcc79ca31.jpg)




# Microservices: khi nào phù hợp?


Vậy khi nào chúng ta có thể sử dụng microservices. Đó là khi mà bạn có một ứng dụng quá lớn không thể nào quản lí bởi monolith, thì bạn hãy nghĩ đến microservices như một giải pháp. Tuy nhiên, nó phải có những yêu cầu thích hợp chẳng hạn như yêu cầu triển khai nhanh chóng, thường xuyên và đảm bảo chất lượng, điều mà là ưu thế của mircoservices. Và trong một trường hợp khác, đó là khi mà tổ chức của bạn phù hợp với microservices 

![](https://images.viblo.asia/21572dc1-9eb4-4d80-871a-24a8d544a435.png)


Hình ảnh trên là điều mình muốn lưu ý với các bạn. Architecture quyết định bởi Organization và Process. Architecture ở đây mà microservices và bạn phải có tổ chức và biện pháp thích hợp với microservices thì mới có thể áp dụng được. Đây cũng là một trong số keynote khi đưa ra quyết định có nên sử dụng microservices hay không. Thì hãy lưu ý về
- Organization: tổ chức gồm các team nhỏ, hoạt động độc lập

![](https://images.viblo.asia/94d838ba-29c8-4f40-9112-3e17f3328ecc.png)

- Process: devops - hệ thống CICD là điều cần thiết đối với microservices


Và tất nhiên không phải lúc nào microservices cũng là một lựa chọn tuyệt vời. Hãy ghi nhớ rằng

> Almost all the cases where I've heard of a system that was built as a microservice system from scratch, it has ended up in serious trouble.
> — Martin Fowler

Chính vì thế hãy xác định rõ khi nào bạn cần microservices. Và tất nhiên khi bạn cần nó rồi thì nội dung cần quan tâm tiếp theo đó chính là làm thế nào để triển khai microservices. 

# Lời kết

Microservices thực sự là một điều tuyệt vờ và tất nhiên bài viết này chưa dừng lại ở đây. Đây chỉ là chương mở đầu cho series về microservices của mình và nội dung tiếp theo đó chính là làm thế nào để triển khai microservices. Rất mong gặp lại bạn trong bài viết tiếp theo

Cảm ơn bạn đã theo dõi đến đây. Have a nice day.

# Tham khảo

https://martinfowler.com/articles/microservices.html#ComponentizationViaServices

https://martinfowler.com/microservices/

https://microservices.io/