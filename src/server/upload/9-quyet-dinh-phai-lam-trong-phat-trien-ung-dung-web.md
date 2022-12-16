![](https://images.viblo.asia/428c82a1-c1f4-47ed-81ef-79954ea64e7f.jpg)
# Giới thiệu
* Bạn đã quyết định tạo một ứng dụng web? Thật tuyệt, chào mừng bạn đến với một thế giới mà mỗi sự lựa chọn đều không hề dễ dàng. Có một lượng lớn các công nghệ tuyệt vời khác nhau trong mỗi bước bạn sẽ thực hiện. Và với mỗi lựa chọn, bạn sẽ tìm thấy một công ty lớn đã thành công trong việc sử dụng nó.
* Thị trường phát triển web là rất lớn. Đó là không gian lập trình lớn nhất cho đến nay, với các tùy chọn công nghệ đa dạng. Nhìn vào [khảo sát](https://insights.stackoverflow.com/survey/2019#developer-profile-_-developer-type) StackOverflow năm 2019, 52% của tất cả các lập trình viên là lập trình full-stack, 50% là lập trình back-end và 32,8% là lập trình viên front-end. 
![](https://images.viblo.asia/257bc37f-10a8-40ac-8ed9-854b3eae5c70.png)
* Như bạn có thể đoán, 134,8% tất cả các lập trình viên là một thị trường khá lớn. Có nhiều công nghệ, cơ sở dữ liệu, mẫu thiết kế và phương pháp phổ biến trong thế giới phần mềm. Chúng thay đổi mạnh mẽ cứ sau vài năm, nhưng bằng cách nào đó, những thứ cũ dường như không bao giờ chết. Ngôn ngữ lập trình Cobol hay công cụ quản lý cấu hình phần mềm [ClearCase](https://en.wikipedia.org/wiki/Rational_ClearCase) là những ví dụ tuyệt vời về những thứ không nên còn tồn tại nhưng rõ ràng là vẫn có.
* Chúng ta sẽ nói về 9 lựa chọn công nghệ bạn phải thực hiện khi phát triển một ứng dụng web. Một số sẽ không liên quan đến sản phẩm của bạn, nhưng hầu hết là có.
> Bài viết này nói về các ứng dụng Web, không phải trang Web. Sự phân biệt này hơi khó một chút khi diễn giải bằng từ. Blog và các trang Web thương mại điện tử tiêu chuẩn là các trang Web, trong khi các trang Web tương tác như eBay và Facebook là các ứng dụng Web. Khá nhiều thứ bạn không thể xây dựng (dễ dàng) với WordPress. Đó là một ứng dụng Web.
# Các quyết định phải thực hiện
## 1. Mô hình kiến trúc máy khách và máy chủ
* Kể từ khi Internet ra đời, chúng ta đã thấy nhiều cách khác nhau trong xây dựng các ứng dụng Web. Chúng ta có CGI, PHP, ASP, Silverlight, WebForms và nhiều thứ khác. Trong 10-15 năm qua, chúng ta đã thống nhất có 2 mẫu kiến trúc: Model-View-Controller (MVC) ở phía máy chủ hoặc [single-page-application](https://en.wikipedia.org/wiki/Single-page_application) (SPA) ở phía máy khách và Web API ở phía máy chủ . Trong số hai phương pháp đó, cách tiếp cận thứ hai (SPA + Web API) đang có sức hút trong những năm gần đây.
* Quyết định đầu tiên trong xây dựng ứng dụng web của bạn là chọn cách tiếp cận mô hình nào.
### Single Page Application (SPA) và Web API
* Kể từ khi AngularJS được phát hành vào năm 2010, sự kết hợp giữa SPA và Web API dần trở thành cách phổ biến nhất để viết các ứng dụng Web hiện đại. Vì với một số lý do tốt. Với kiến trúc này, toàn bộ các phần của ứng dụng phía máy khách chỉ được tải một lần thay vì tải từng trang từ máy chủ. Việc định tuyến được thực hiện hoàn toàn ở phía máy khách. Máy chủ chỉ cung cấp API cho dữ liệu.
* Có nhiều ưu điểm cho cách tiếp cận này:
    * Vì toàn bộ máy khách chỉ phải tải một lần trong trình duyệt, trang điều hướng là ngay lập tức và trải nghiệm ứng dụng Web trở nên giống như trải nghiệm ứng dụng của máy tính.
    * Sự tách biệt giữa phía máy khách và phía máy chủ. Không còn bắt buộc yêu cầu lập trình viên full-stack mà phải biết cả phía máy chủ và phía máy khách.
    * Việc kiểm tra cả phía máy khách và máy chủ đều dễ dàng hơn vì chúng tách biệt.
    * Máy chủ API Web của bạn có thể sử dụng lại cho mọi loại ứng dụng - Web, máy tính và thiết bị di động.
* Bên cạnh đó còn một số hạn chế:
    * Thiết lập dự án ban đầu chậm hơn. Thay vì tạo một "dự án mới" trong bằng framework MVC yêu thích, giờ đây bạn phải phân tách dự án riêng ra cho phía máy khách và cả phía máy chủ. Bạn sẽ phải sử dụng nhiều công nghệ hơn.
    * Tải trang đầu chậm. Trong SPA, chúng ta đang tải toàn bộ máy khách cho trang đầu tiên.
    * Bạn sẽ phải sử dụng các gói như [Webpack](https://webpack.js.org/) để có trải nghiệm phát triển tốt. Điều này cần thêm một số chi phí như để cấu hình nó. Tuy nhiên, đây cũng là một lợi thế vì trình đóng gói này cho phép dễ dàng thêm nhiều công cụ hơn vào việc xây dựng, như [Babel](https://babeljs.io/) và [Linter](https://en.wikipedia.org/wiki/Lint_(software)).
### Mô hình MVC
* Mô hình MVC trở nên phổ biến vào năm 2005 với sự xuất hiện của các framework [Ruby on Rails](https://en.wikipedia.org/wiki/Ruby_on_Rails) và [Django](https://en.wikipedia.org/wiki/Django_(web_framework)).
* Trong MVC, mỗi yêu cầu định tuyến đến Controller trên máy chủ. Controller tương tác với Model (lấy dữ liệu) và trả lại View (trang HTML/CSS/JavaScript cho máy khách). Điều này có một số lợi thế. Nó tạo ra một sự tách biệt rõ ràng của mối quan hệ giữa máy khách, máy chủ và các thành phần khác nhau. Do đó nhiều lập trình viên có thể làm việc trên cùng một dự án mà không có nhiều xung đột. Nó cho phép tái sử dụng các thành phần. Vì Model là riêng biệt, bạn có thể thay thế nó bằng một bộ dữ liệu thử nghiệm.
* Một số MVC frameworks phổ biến là [Ruby on Rails](https://en.wikipedia.org/wiki/Ruby_on_Rails), [ASP.NET MVC](https://en.wikipedia.org/wiki/ASP.NET_MVC), [Django](https://en.wikipedia.org/wiki/Django_(web_framework)), [Laravel](https://en.wikipedia.org/wiki/Laravel) và [Spring MVC](https://spring.io/).
> Bạn có thể kết hợp một phần giữa MVC và SPA. Một View có thể là single page application. Điều này được thực hiện tốt nhất với các SPA frameworks gọn nhẹ như Vue.js.
### Các mô hình khác
* Có một số cách tiếp cận khác, nhưng không còn được coi là lựa chọn tuyệt vời. Chúng đã là những công nghệ cũ, được thay thế vì một lý do. Một số trong số đó là:
    * [ASP cổ điển](https://www.w3schools.com/asp/)
    * PHP cổ điển (không có MVC)
    * WebForms
    * Các trang tĩnh và Web API (điều này vẫn phù hợp cho nội dung tĩnh, nhưng không dành cho ứng dụng web)
> Bạn có thể đã nghe các thuật ngữ LAMP, MEAN và LYME stack ở đâu đó. Đây là sự kết hợp các công nghệ. LAMP là viết tắt của Linux, Apache, MySQL, PHP và MEAN là MongoDB, Express.js, Angular và Node.js. Đây không hoàn toàn độc quyền các công nghệ với nhau. Ví dụ: bạn có thể sử dụng MongoDB với bất kỳ SPA framework nào và bất kỳ ngôn ngữ lập trình nào. Và Linux là HĐH cho hầu hết các máy chủ hiện đại, không chỉ cho PHP và MySQL.
## 2. Phía máy chủ Web API (khi chọn SPA và Web API)
* Nếu bạn chọn sử dụng single page application (SPA) framework, thì bước tiếp theo là chọn công nghệ phía máy chủ. Giao thức giao tiếp tiêu chuẩn là các yêu cầu HTTP, vì máy chủ sẽ cung cấp HTTP API. Điều này có nghĩa là phía máy chủ và phía máy khách được tách rời. Bạn cũng có thể xem xét sử dụng [RESTful API](https://searchapparchitecture.techtarget.com/definition/RESTful-API).
* Có rất nhiều công nghệ tốt phía máy chủ. Bây giờ, có rất nhiều sự lựa chọn tốt đến nỗi nó ngày càng trở nên khó lựa chọn. Dưới đây là một số công nghệ phổ biến hơn cả:
    * [Node.js](https://nodejs.org/en/) – JavaScript
    * [ASP.NET Web API](https://dotnet.microsoft.com/apps/aspnet) – C#
    * Java – [Spring](https://spring.io/), [Jersey](https://eclipse-ee4j.github.io/jersey/), [Apache CXF](https://cxf.apache.org/), [Restlet](https://restlet.com/)
    * Python – [Flask](https://palletsprojects.com/p/flask/), [Django REST framework](https://www.django-rest-framework.org/)
    * [Go](https://hackernoon.com/how-to-create-a-web-server-in-go-a064277287c9)
    * Ruby – [Sinatra](http://sinatrarb.com/), [Ruby on Rails](https://scotch.io/tutorials/build-a-restful-json-api-with-rails-5-part-one) (Rails chủ yếu là MVC, nhưng Rails core 5 hỗ trợ các ứng dụng chỉ API)
    * Tất cả các khung này là miễn phí và hầu hết là mã nguồn mở.
* Đây không phải là danh sách đầy đủ, nhưng đó là những công nghệ phổ biến nhất. Chọn một framework phổ biến là quan trọng. Vì một vài lý do. Một framework phổ biến sẽ có sự hỗ trợ tốt hơn, tài liệu tốt hơn và các vấn đề được ghi chép nhiều hơn. Có lẽ quan trọng nhất, bạn sẽ tìm thấy nhiều lập trình viên làm việc với framework đó.
* Kiểm tra mức độ phổ biến trên thị trường với Google Trends và Surveys trong danh mục cụ thể này có một chút khó khăn. Thay vào đó, chúng ta có thể thấy sự phổ biến bằng cách xem các Tags trong [StackOverflow](https://stackoverflow.com/tags). Chúng ta có thể thấy tổng thể theo tổng số câu hỏi được hỏi. Và chúng ta có thể thấy các xu hướng theo số lượng câu hỏi được hỏi trong tháng trước. Đây không phải là một chỉ số toàn diện về sự phổ biến, nhưng tôi nghĩ nó khá tốt. Đây là kết quả:
![](https://images.viblo.asia/313a13a6-8a34-4d03-80da-22bd09661a06.jpg)
> Ví dụ, Node.js có 291K câu hỏi, 161K người theo dõi và 5K câu hỏi được hỏi trong tháng này
* 4 công nghệ lớn là Node.js, ASP.NET, Spring và Ruby on Rails. Flask, Django REST và GO ít phổ biến hơn nhiều. Tuy nhiên, đây không phải là sự so sánh cân bằng. Spring, ASP.NET và Ruby on Rails chủ yếu là MVC framework chứ không phải chỉ API, vì vậy giá trị thực của chúng thấp hơn nhiều. Go là một ngôn ngữ lập trình, vì vậy nó cũng được đánh giá rất cao. Mặt khác, Django-rest và Flask chỉ là công nghệ API phía máy chủ, vì vậy giá trị của chúng là "thực". Node.js cũng không phải là một MVC framework, mà là một công nghệ để chạy JavaScript nguyên bản. Nhưng, nó chủ yếu được sử dụng cho Web API với một vài thứ như [Express.js](https://expressjs.com/) framework.
* Hãy nhớ rằng mặc dù Node.js rõ ràng là rất phổ biến, nhưng những công nghệ khác vẫn là các công nghệ phổ biến.
> Việc sử dụng Java Jersey, Apache CXF và Ruby Sinatra ít hơn rất nhiều nên tôi thậm chí không đưa chúng vào biểu đồ. Có lẽ có hàng trăm frameworks khác ít được biết đến cũng không được đề cập.
* Bên cạnh sự phổ biến, đây là một số cân nhắc thêm khi lựa chọn:
    * Đối với các ứng dụng Web cung cấp phân tích dữ liệu lớn, hãy xem xét việc sử dụng back-end với Python.
    * Hãy chắc chắn team lập trình của bạn thoải mái, phù hợp nhất với ngôn ngữ lập trình nào.
    * Với Node.js, bạn làm việc với cùng một ngôn ngữ ở phía máy khách và phía máy chủ. Đó là JavaScript, cả thị trường Web dường như nghĩ rằng đó là một ý tưởng tốt.
    * Những công nghệ phát triển nào phổ biến hơn trong khu vực của bạn? Nên lựa chọn những thứ đó.
    * Nếu bạn có một team đã có kinh nghiệm với một framework hoặc một ngôn ngữ, nên ưu tiên sử dụng công nghệ đã biết của họ. Sự cân nhắc này hơn hẳn những thứ khác.
## 3. MVC phía máy chủ (khi chọn MVC)
* Giống như với Web API, có rất nhiều công nghệ phía máy chủ sử dụng mô hình MVC. Cho đến một vài năm trước, mô hình MVC là cách phổ biến nhất để xây dựng các ứng dụng Web. Các framework đáng chú ý nhất là:
    * C# – [ASP.NET MVC](https://dotnet.microsoft.com/apps/aspnet)
    * Java – [Spring MVC](https://spring.io/), [Apache Struts](https://struts.apache.org/), [Play Framework](https://en.wikipedia.org/wiki/Play_Framework)
    * Groovy – [Grails Framework](https://en.wikipedia.org/wiki/Grails_(framework))
    * Python – [Django](https://www.djangoproject.com/)
    * Ruby – [Ruby on Rails](https://rubyonrails.org/)
    * PHP – [Laravel](https://laravel.com/)
* Và đây là kết quả độ phổ biến theo Stack Overflow:
![](https://images.viblo.asia/9ab20147-0be5-43a5-8ce2-f6d1653954ee.jpg)
> Đây là một biểu đồ chuẩn hóa. ASP.NET MVC , ví dụ, có 183K câu hỏi, 63K người theo dõi và 856 câu hỏi được hỏi trong tháng này.
* Những kết quả này rất thú vị và khá ngạc nhiên đối với tôi. Tôi dự đoán Ruby on Rails, Spring và ASP.NET MVC sẽ đứng đầu. Thay vào đó thì Django, Ruby on Rails và Laravel là những framework phổ biến nhất. Ruby on Rails có nhiều câu hỏi nhất toàn thời gian. Django và Laravel đang nổi nhất tháng với nhiều câu hỏi nhất trong 30 ngày qua.
* Bên cạnh mức độ phổ biến, các cân nhắc khi chọn framework tương tự như framework cho phía máy chủ Web API:
    * Đối với các ứng dụng web cung cấp dữ liệu lớn và số liệu thống kê, hãy xem xét việc sử dụng Python Django.
    * Nếu bạn có một nhóm đã biết và yêu thích một framework hoặc ngôn ngữ nào đó, nên chọn công nghệ đã được biết đến.
### Điểm chuẩn hiệu suất - cho cả Web API và MVC
* Nếu bạn đang xây dựng một ứng dụng Web doanh nghiệp nhỏ, hiệu suất có thể không quan trọng. Nhưng đối với các ứng dụng lớn sẽ cần phục vụ nhiều yêu cầu, thời gian phản hồi là rất quan trọng thì hiệu suất là rất cần thiết. Trang web so sánh điểm chuẩn hiệu suất đáng chú ý nhất là [https://www.techempower.com/benchmarks/](https://www.techempower.com/benchmarks/). Tại đây, bạn có thể tìm thấy một danh sách rất nhiều các framework và các cấu hình máy chủ khác nhau. Tất cả đều có điểm chuẩn và được so sánh thành một cái gì đó như thế này:
![](https://images.viblo.asia/4fc95dd0-4e65-44d9-aedc-ff9766f2b73b.png)
* Các đối tượng trong danh sách trên bao gồm một máy chủ với Web framework, cơ sở dữ liệu và ORM. Trong hệ thống điểm chuẩn, ORM của framework được sử dụng để tìm nạp tất cả các hàng từ bảng cơ sở dữ liệu có chứa một số lượng messages không xác định.
* Nếu chúng ta nhìn vào các ngôn ngữ, nhanh nhất là Rust, tiếp theo là C, Go, Java, C++, PHP, C# và Kotlin. Nếu chúng ta quay lại các frameworks "phổ biến" và tìm kiếm chúng, chúng ta sẽ tìm thấy điều này:
    * ASP.NET Core Web API (42,8% của kết quả tốt nhất)
    * Node.js (17,9% của kết quả tốt nhất)
    * ASP.NET Core MVC (17,2%)
    * Spring (4,4%)
    * Laravel (2,9%)
    * Django (1,9%)
    * Ruby on Rails (1,3%)
* Cuối cùng, [Actix](https://actix.rs/) đứng đầu về hiệu suất, nó là một framework của Rust nhưng tôi không đề cập ở trên vì mức độ phổ biến của nó rất thấp.
## 4. Lựa chọn Single Page Application (SPA) Framework
* Nếu bạn chọn sử dụng Web API và SPA (không phải MVC), thì quyết định tiếp theo là chọn SPA Framework.
* Chỉ vài năm trước, một JavaScript framework mới đã xuất hiện khoảng một lần một tuần. May mắn thay, những ngày đó đã ở sau chúng ta và bây giờ chúng đã ổn định một chút.
* Các SPA frameworks đáng chú ý nhất (tốt, kể từ năm 2010) là:
    * [React](https://reactjs.org/)
    * [AngularJS](https://angularjs.org/)
    * [Angular](https://angular.io/) (2+)
    * [Vue.js](https://vuejs.org/)
    * [Ember.js](https://emberjs.com/)
    * [Polymer](https://www.polymer-project.org/)
    * [Aurelia](https://aurelia.io/)
    * [Backbone.js](https://backbonejs.org/)
* Tiếp tục quan sát sự phổ biến trên StackOverflow:
![](https://images.viblo.asia/70de8d5e-f2ab-498c-b8a8-c71d677a8603.jpg)
* Vì vậy, biểu đồ này cho thấy một vài kết luận nhanh chóng:
    * Tất cả các frameworks trong quá khứ ngoại trừ **React**, **AngularJS**, **Angular** và **Vue.js** đều đã chết. Nếu bạn thường xuyên theo dõi tin tức phát triển Web trong vài năm qua, điều đó sẽ không có gì ngạc nhiên.
    * **AngularJS** có nhiều câu hỏi nhất nhưng ít câu hỏi mới nhất. Mặc dù có thể có một lượng lớn code đã được viết bằng AngularJS, nhưng đó là một framework kế thừa lại. Không nên chọn nó cho các dự án mới.
    * **React** và **Angular** thống trị thị trường với **Vue.js** đứng thứ 3. React được quan tâm tới nhiều nhất.
* Điều này có nghĩa là sự lựa chọn tốt nhất của bạn trong năm 2019 là giữa React, Angular và Vue.js. Các frameworks này có sự hỗ trợ của cộng đồng developer tốt nhất, các vấn đề được ghi chép nhiều nhất và hỗ trợ component/library  tốt nhất. Với React và Angular có sự hỗ trợ nhiều hơn cả.
* Dưới đây là một vài điểm để xem xét:
    * Angular được xây dựng như một khung "doanh nghiệp" xem xét mọi thứ và buộc bạn vào một chế độ làm việc cụ thể. React và Vue.js được tách thành nhiều thành phần hơn và cho phép bạn nhặt ra và chọn các phương pháp phát triển.
    * React đã giành được danh hiệu "Web framework được yêu thích nhất" trong cuộc [khảo sát StackOverflow năm 2019](https://insights.stackoverflow.com/survey/2019#technology-_-most-loved-dreaded-and-wanted-web-frameworks), với Vue.js đứng thứ hai.
![](https://images.viblo.asia/9818cdc4-3dab-4467-ae27-3618aa5b02ca.png)
## 5. Cơ sở dữ liệu
* Mỗi ứng dụng Web hiện đại có một số loại cơ sở dữ liệu. Ngày xưa, chỉ có cơ sở dữ liệu quan hệ và sự khác biệt là về hiệu suất và tính năng. Ngày nay, chúng ta đang ở thời đại "cơ sở dữ liệu chuyên ngành". Chúng ta cần các cơ sở dữ liệu khác nhau cho các mục đích khác nhau, điều này làm cho quyết định này trở nên khá quan trọng. Tôi muốn nói thậm chí còn quan trọng hơn các quyết định trước như chọn công nghệ phía máy chủ và phía máy khách bởi vì những điều đó được cung cấp khá nhiều với những công nghệ khác nhau.
* Điều quan trọng là phải hiểu nhu cầu kinh doanh của bạn khi chọn cơ sở dữ liệu. Nếu sản phẩm của bạn cần khả năng Tìm kiếm hiệu suất cao, hãy cân nhắc sử dụng [Elasctic Search](https://www.elastic.co/blog/found-elasticsearch-as-nosql). Nếu bạn cần tải nhanh với các yêu cầu tương tự nhau, có phản hồi thường xuyên không thay đổi, hãy cân nhắc sử dụng [Redis](https://redis.io/) cho bộ nhớ đệm của nó. Nếu bạn chỉ muốn lưu trữ một loạt các tài liệu JSON mà không quá phức tạp, thì hãy đến với cơ sở dữ liệu lưu trữ tài liệu như [MongoDB](https://www.mongodb.com/).
* Cơ sở dữ liệu có thể được chia thành nhiều loại:
    * Cơ sở dữ liệu quan hệ ([Relational databases](https://en.wikipedia.org/wiki/Relational_database) - Cơ sở dữ liệu dạng bảng cổ điển hoạt động với các truy vấn SQL như [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-2017).
* Cơ sở dữ liệu NoSql:
    * Cơ sở dữ liệu lưu trữ tài liệu như [MongoDB](https://www.mongodb.com/)
    * Lưu trữ các key-value như [DynamoDB](https://aws.amazon.com/vi/dynamodb/) và [Redis](https://redis.io/)
    * Lưu trữ cột rộng như [Cassandra](https://en.wikipedia.org/wiki/Apache_Cassandra)
    * Cơ sở dữ liệu dựa trên đồ thị như [Neo4j](https://neo4j.com/)
* Trước khi chọn một cơ sở dữ liệu cụ thể, tốt nhất là quyết định *loại* cơ sở dữ liệu bạn cần.
* Giống như với các công nghệ khác, việc chọn một cơ sở dữ liệu phổ biến là rất quan trọng. Bạn sẽ có nhiều diễn đàn hơn, cộng đồng lớn hơn và nhiều nhà phát triển quen thuộc hơn với công nghệ. Bên cạnh đó, có lẽ chúng đã trở nên phổ biến vì một lý do. Theo khảo sát của [Stack Overflow 2019](https://insights.stackoverflow.com/survey/2019#technology-_-databases) , các cơ sở dữ liệu phổ biến nhất là:
![](https://images.viblo.asia/b35c220d-241c-48bf-9c6d-6ad3d9b2a27c.png)
* [MySQL](https://www.mysql.com/) là cơ sở dữ liệu phổ biến nhất. Lưu ý rằng tất cả 4 vị trí đầu tiên đều là cơ sở dữ liệu quan hệ. Điều này có thể cho thấy cơ sở dữ liệu quan hệ là lựa chọn tốt nhất trong hầu hết các ứng dụng.
* Dưới đây là một vài điểm cần xem xét khi lựa chọn:
    * Một số cơ sở dữ liệu thương mại như [Oracle](https://www.oracle.com/database/) và [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-2017) có thể khá tốn kém. Cân nhắc sử dụng một trong các cơ sở dữ liệu mã nguồn mở nếu chi phí là một vấn đề và bạn có rất nhiều dữ liệu.
    * Cơ sở dữ liệu quan hệ rất nhanh, đáng tin cậy và có rất nhiều công cụ làm việc với chúng. Bạn cũng sẽ tìm thấy nhiều nhà phát triển quen thuộc hơn với công nghệ.
    * Nếu bạn đang sử dụng một nhà cung cấp đám mây nhất định, hãy xem cơ sở dữ liệu nào chúng hỗ trợ dưới dạng dịch vụ đám mây. Điều này có thể làm giảm thời gian phát triển ban đầu khi bắt đầu. Bạn có thể không thực sự cần nhà cung cấp đám mây vì có những dịch vụ cung cấp dịch vụ cơ sở dữ liệu độc lập như [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    * Đối với các ứng dụng Web nhỏ, các cân nhắc khác với các ứng dụng doanh nghiệp lớn. Bạn sẽ cần cơ sở dữ liệu với khả năng mở rộng quy mô, có thể cho nhiều máy ([sharding](https://searchoracle.techtarget.com/definition/sharding)).
    * Đối với cơ sở dữ liệu phân tán , hãy xem xét [định lý CAP](https://en.wikipedia.org/wiki/CAP_theorem) . Nó tuyên bố rằng một cơ sở dữ liệu chỉ có thể cung cấp tối đa 2 trong số 3 đảm bảo giữa **tính nhất quán**, **tính khả dụng** và **khoảng phân vùng**. Xem xét hai đảm bảo nào là quan trọng nhất đối với nhu cầu của bạn và cơ sở dữ liệu nào cung cấp hai nhu cầu đó.
    * Đối với các ứng dụng lớn hoặc ứng dụng có yêu cầu tần suất cao, bạn sẽ cần xem xét hiệu suất. Một trong những nơi tốt nhất để tìm các so sánh hiệu suất là [DB-ENGINES](https://db-engines.com/en/ranking). Dưới đây là những điểm số mới nhất trong khi viết bài này:
![](https://images.viblo.asia/2703919e-26da-4ce5-b8b7-ba0be0075645.png)
* Lựa chọn cơ sở dữ liệu rõ ràng là một chủ đề lớn và một vấn đề quan trọng. Không giống như các quyết định khác, tôi nghĩ nên tăng thêm trọng lượng khi chọn quyết định nào và thực hiện nghiên cứu bổ sung.
## 6. Triển khai
* Năm 2019, chúng tôi có nhiều dịch vụ **Đám mây** lớn. Tôi tin rằng việc triển khai trên đám mây là phù hợp nhất trong hầu hết các trường hợp. Với một vài ngoại lệ. Vì vậy, trước khi so sánh các nhà cung cấp dịch vụ đám mây, hãy nói về lý do tại sao bạn sẽ triển khai lên đám mây và bạn có những lựa chọn thay thế nào.
* Thực tế có 3 tùy chọn có sẵn:
1. **Triển khai đám mây** - Thay vì bận tâm với việc thiết lập máy chủ của bạn, bạn có thể thuê máy tính mạnh mẽ với khả năng lưu trữ lớn từ một công ty như AWS hoặc Azure. Trên thực tế, kể từ khi AWS được ra mắt vào năm 2006, thế giới phần mềm đang thay đổi theo hướng này. Có nhiều lợi thế cho việc này:
    * Với Cloud, bạn có thể sử dụng tỷ lệ động để cắt giảm chi phí. Trong thời gian hiệu suất thấp, giảm số lượng máy chủ và trong thời gian hiệu suất cao thì tăng chúng. Vì bạn trả tiền mỗi phút hoặc mỗi giờ, bạn có thể giảm đáng kể chi phí.
    * Việc thiết lập và triển khai ban đầu dễ dàng hơn nhiều. Trong một số trường hợp, như với Dịch vụ ứng dụng Azure, việc triển khai đến máy chủ lần đầu tiên thực sự chỉ là một vài cú nhấp chuột.
    * Bạn chỉ cần thuê ít quản trị viên hệ thống hơn (nhưng một vài kỹ sư DevOps).
    * Bạn không còn cần phải mua máy chủ, lưu trữ chúng trong công ty và bảo trì chúng. Tất cả nằm trong đám mây.
2. **Triển khai tại chỗ** - Máy chủ tại chỗ là cách các tổ chức hoạt động đến năm 2006. Bạn có một phòng máy chủ và một đội ngũ quản trị viên để duy trì hoạt động. Năm 2019, chúng ta vẫn thấy có rất nhiều công ty triển khai tại chỗ. Các công ty này hoặc đã bắt đầu tại chỗ và không chuyển sang đám mây hoặc họ có một số lý do tốt để làm điều này. Bạn nên xem xét ở lại tại chỗ nếu:
    * Bạn có một số vấn đề về bảo mật hoặc pháp lý để đặt máy chủ của bạn trên đám mây. Có lẽ đó là phần mềm trong lĩnh vực quân sự và chính phủ.
    * Bạn đã đầu tư rất nhiều công sức vào máy chủ tại chỗ của mình và không còn ý nghĩa gì để chuyển sang đám mây. Nó có thể xảy ra nếu công ty của bạn là một công ty đủ lớn và công ty đã có các giải pháp tự động cho việc bảo trì máy chủ.
    * Bạn đủ lớn rằng nó có ý nghĩa về tài chính khi không trả tiền cho bên trung gian. Một ví dụ là [Dropbox](https://www.dropbox.com/) không ở trong đám mây.
3. **Giải pháp đám mây hỗn hợp** - Các nhà cung cấp đám mây lớn cho phép bạn cài đặt máy chủ đám mây hoạt động đầy đủ tại chỗ. Đó là, bạn sẽ có một cổng thông tin AWS hoặc Azure được cài đặt trong trung tâm dữ liệu của riêng bạn. Khái niệm này khá điên rồ và không dành cho tất cả mọi người, đặc biệt là do chi phí. Cả [Azure Stack](https://azure.microsoft.com/en-us/overview/azure-stack/) và [AWS Outposts](https://aws.amazon.com/vi/outposts/) đều yêu cầu bạn phải mua phần cứng tùy chỉnh mới. Google gần đây đã phát hành [Anthos](https://cloud.google.com/anthos/), không yêu cầu phần cứng tùy chỉnh.
### So sánh các nhà cung cấp dịch vụ đám mây
* Các dịch vụ đám mây được chia thành 3 loại: Cơ sở hạ tầng dưới dạng dịch vụ (**Infrastructure as a Service** - IaaS), Nền tảng dưới dạng dịch vụ (**Platform as a Service** - PaaS) và Phần mềm dưới dạng dịch vụ (**Software as a Service** - SaaS) . Để triển khai ứng dụng Web của chúng ta, chúng ta phải quan tâm đến IaaS. Ba nhà cung cấp đám mây IaaS thống trị là: [AWS của Amazon](https://aws.amazon.com/vi/), [Microsoft Azure](https://azure.microsoft.com/en-us/) và [Google Cloud Platform](https://cloud.google.com/). Bên cạnh đó còn có các nhà cung cấp đáng nói khác là [IBM Cloud](https://www.ibm.com/cloud), [DigitalOcean](https://www.digitalocean.com/), [Oracle Cloud Infrastructure Compute](https://www.oracle.com/cloud/compute/), [Red Hat Cloud](https://www.redhat.com/en/technologies/cloud-computing/cloud-suite), và [Alibaba Cloud](https://www.alibabacloud.com/).
> Bên cạnh AWS, Azure và GCP, đối thủ cạnh tranh thực sự duy nhất có khả năng là Alibaba. Thật không may cho họ, các doanh nghiệp lớn của phương Tây không sẵn lòng hợp tác với một công ty Trung Quốc.
* 3 nhà cung cấp đám mây lớn có một số dịch vụ tương tự. Tất cả họ đều cung cấp các dịch vụ như máy ảo có thể mở rộng, bộ cân bằng tải, bộ điều phối Kubernetes, dịch vụ không có máy chủ, lưu trữ dưới dạng dịch vụ, cơ sở dữ liệu dưới dạng dịch vụ, mạng riêng & cô lập, các dịch vụ big data, các dịch vụ machine learning và nhiều dịch vụ khác.
* Sự cạnh tranh rất khốc liệt. Giá cả có phần tương tự nhau và khi một trong những nhà cung cấp đưa ra một sản phẩm phổ biến mới, các nhà cung cấp khác sẽ điều chỉnh và cung cấp các sản phẩm tương tự.
## 7. Xác thực & Ủy quyền
* Trong thực tế tất cả các ứng dụng Web, chúng ta có cơ chế Đăng nhập. Khi đăng nhập, bạn được xác định trong ứng dụng Web và có thể: Để lại nhận xét, mua sản phẩm, thay đổi cài đặt cá nhân và sử dụng bất kỳ chức năng nào mà ứng dụng cung cấp. Khả năng ứng dụng của bạn xác minh rằng bạn là người thực hiện tác vụ đó được gọi là **Xác thực**. Trong khi **Ủy quyền** có nghĩa là cơ chế cấp phép cho những người dùng khác nhau.
* Có một số cách bạn có thể làm với xác thực và ủy quyền:
1. **Giải pháp thủ công** - Hầu hết các Web framework đều có hỗ trợ xác thực và ủy quyền (thường là với [JWT token](https://en.wikipedia.org/wiki/JSON_Web_Token)). Nếu không, luôn có sẵn thư viện bên thứ 3 miễn phí. Điều này có nghĩa là bạn có thể tự thực hiện các cơ chế xác thực cơ bản.
2.  **Máy chủ nhận dạng bên ngoài** - Có một số nhà cung thương mại và mã nguồn mở nhận dạng bằng cách triển khai [tiêu chuẩn kết nối OpenID](https://en.wikipedia.org/wiki/OpenID_Connect). Điều này có nghĩa là giao tiếp giữa máy khách và máy chủ sẽ liên quan đến một máy chủ nhận dạng chuyên dụng. Ưu điểm là các máy chủ này đã triển khai một loạt các tính năng xác thực cho bạn. Chúng có thể bao gồm:
    * Đăng nhập một lần và đăng xuất với các loại ứng dụng khác nhau
    * Hỗ trợ tích hợp cho các nhà cung cấp nhận dạng bên ngoài (Google, Facebook,...)
    * Vai trò dựa trên sự chấp nhận (ủy quyền)
    * Xác thực bằng nhiều yếu tố
    * Tuân thủ các tiêu chuẩn như ISO, SOC2, HIPAA,...
    * Xây dựng sẵn trình phân tích và lưu nhật ký.
* Nhà cung cấp đám mây của bạn có thể có một máy chủ nhận dạng, như [AWS Cognito](https://aws.amazon.com/vi/cognito/) hoặc [Azure Active Directory B2C](https://azure.microsoft.com/en-gb/services/active-directory-b2c/).
* Các giải pháp nguồn mở đáng chú ý là: [IdentityServer](https://identityserver.io/), [MITREid Connect](https://github.com/mitreid-connect/), [Ipsilon](https://ipsilon-project.org/).
* Các giải pháp thương mại đáng chú ý: [Auth0](https://auth0.com/), [Okta](https://www.okta.com/), [OneLogin](https://www.onelogin.com/).
* Đảm bảo thực hiện một số tính toán giá cả trước khi cam kết giải pháp mang tính thương mại như Auth0. Việc chúng có xu hướng nhận loại đắt tiền và sử dụng việc triển khai mã nguồn mở cũng là một sự lựa chọn tốt.
## 8. Ghi Log
* Ghi log phía máy chủ là khá quan trọng đối với bất kỳ loại phần mềm nào và các ứng dụng Web cũng không phải là ngoại lệ. Có thực hiện ghi log hay không thực sự không phải là một quyết định. Quyết định là nơi để gửi các nhật kí và lưu trữ chúng.
* Dưới đây là một số mục tiêu ghi log để xem xét:
1. Một cơ sở dữ liệu. Ghi log vào cơ sở dữ liệu có nhiều lợi thế
    * Bạn có thể truy xuất các log từ bất cứ đâu mà không cần truy cập vào máy sản xuất.
    * Thật dễ dàng để tổng hợp các log khi bạn có nhiều máy chủ.
    * Không có khả năng các bản ghi log sẽ bị xóa khỏi một máy cục bộ.
    * Bạn có thể dễ dàng tìm kiếm và trích xuất số liệu thống kê từ các log. Điều này đặc biệt hữu ích nếu bạn đang sử dụng việc ghi log có cấu trúc.
    * Có vô số lựa chọn cho cơ sở dữ liệu để lưu trữ log của bạn. Chúng ta có thể phân loại chúng như sau:
        * **Cơ sở dữ liệu quan hệ** luôn là một lựa chọn. Chúng dễ cài đặt, có thể được truy vấn bằng SQL và hầu hết các kỹ sư đã quen thuộc với chúng.
        * **Cơ sở dữ liệu NoSQL** như [CouchDB](https://couchdb.apache.org/). Điều này là hoàn hảo cho các bản ghi log có cấu trúc được lưu trữ ở định dạng JSON.
        * **Cơ sở dữ liệu chuỗi thời gian** như [InfluxDB](https://www.influxdata.com/) được tối ưu hóa để lưu trữ các sự kiện dựa trên thời gian. Điều này có nghĩa là hiệu suất ghi log của bạn sẽ tốt hơn và các log của bạn sẽ chiếm ít khoảng trống lưu trữ hơn. Đây là một lựa chọn tốt cho việc tải các log với cường độ cao.
        * Các giải pháp hỗ trợ tìm kiếm như bộ ELK - [Logstash](https://www.elastic.co/products/logstash) + [Elastic Search](https://www.elastic.co/) + [Kibana](https://www.elastic.co/products/kibana) cung cấp dịch vụ đầy đủ cho các log của bạn. Chúng sẽ lưu trữ, lập chỉ mục, thêm khả năng tìm kiếm mạnh mẽ và thậm chí trực quan hóa dữ liệu từ các log của bạn. Chúng hỗ trợ tốt nhất với việc ghi log có cấu trúc.
2. Các công cụ giám sát lỗi/hiệu suất cũng có thể hoạt động như các mục tiêu ghi log. Điều này rất có lợi vì chúng có thể hiển thị lỗi cùng với các thông điệp log trong cùng một yêu cầu http. Một vài sự lựa chọn là [elmah.io](https://elmah.io/), [AWS Cloudwatch](https://aws.amazon.com/vi/cloudwatch/) và [Azure Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview).
3. Ghi log vào file vẫn là một mục tiêu lưu trữ log tốt. Nó không phải là duy nhất, bạn có thể lựa chọn ghi log vào cả file và cơ sở dữ liệu chẳng hạn.
4. Khi bạn đã ghi log vào một chỗ, tôi khuyên bạn nên chạy thử để truy xuất chúng hoặc tìm kiếm chúng. Sẽ thật xấu hổ khi chờ đợi cho đến khi bạn gặp lỗi trong sản phẩm chỉ để biết rằng bạn có một số vấn đề trong quá trình ghi lại log.
## 9. Bộ xử lý thanh toán
* Trong nhiều ứng dụng Web, bạn sẽ tính phí khách hàng của mình. Đó là, nhận thẻ tín dụng, PayPal hoặc Bitcoin cho các dịch vụ.
* Mặc dù về mặt lý thuyết, bạn có thể tự thực hiện xử lý thanh toán, nhưng điều đó không được khuyến khích. Bạn sẽ phải đối mặt với việc [tuân thủ PCI](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard), các vấn đề bảo mật, các luật khác nhau ở các quốc gia khác nhau (như GDPR), gian lận, hoàn tiền, hóa đơn, tỷ giá hối đoái và hàng triệu thứ khác.
* Có một số đối tác thương mại lớn trong lĩnh vực này như [PayPal](https://www.paypal.com/vn/home), [Stripe](https://stripe.com/), [2checkout](https://www.2checkout.com/) và [BlueSnap](https://home.bluesnap.com/). Chúng có API tốt và bạn có thể tích hợp thanh toán trong trang Web của bạn.
* Dưới đây là một số điều cần xem xét khi chọn một công ty xử lý thanh toán:
    * **Tuân thủ bảo mật và PCI** - Đảm bảo bộ xử lý thanh toán bạn chọn có tuân thủ PCI. Bất kỳ công ty nào xử lý thẻ tín dụng nào cũng phải duy trì tiêu chuẩn này.
    * **Lệ phí** - Phí tiêu chuẩn trong công nghiệp là 2,9% giao dịch + 30 xu. Có thể một số công ty cung cấp một mức giá rẻ hơn.
    * **Tỷ giá hối đoái** - Nếu bạn có khách hàng quốc tế, họ sẽ thanh toán bằng tiền riêng của họ. Kiểm tra tỷ giá hối đoái mà bộ xử lý thanh toán.
    * **API dễ dàng** - Một trong những cân nhắc quan trọng nhất là tính dễ dàng của API. Hãy chắc chắn rằng bạn sẽ có nhiều tương tác với bộ xử lý thanh toán. Bạn sẽ muốn móc nối chúng vào các sự kiện giao dịch, sửa đổi hóa đơn, thêm chiết khấu hoặc nhiều khoản phí, hoàn tiền,...Stripe, được biết đến là một API tuyệt vời.
    * **Mức độ phổ biến** - Các công ty lớn sẽ có nhiều diễn đàn và thảo luận trên internet hơn. Với PayPal hoặc Stripe, điều đó sẽ không thành vấn đề. Với các công ty lớn, bạn cũng sẽ tìm thấy nhiều lập trình viên quen thuộc hơn với framework.
    * **Khả năng di chuyển dữ liệu** - Nếu bạn có ý định muốn thay đổi bộ xử lý thanh toán, bộ xử lý hiện tại cần cho phép tùy chọn đó. Chẳng hạn với PayPal, sẽ không cung cấp cho bạn dữ liệu thẻ tín dụng của khách hàng. Trong khi Stripe [cho phép xuất dữ liệu thẻ](https://support.stripe.com/questions/export-customer-card-data-from-stripe).
# Tổng kết
* Như bạn có thể thấy, phát triển web vào năm 2019 không tiến gần hơn đến sự đồng thuận. Với bất cứ điều gì, chúng ta đều có nhiều công nghệ để lựa chọn và khi đó sẽ có nhiều tranh cãi. Tôi đoán đây là tin tốt cho các nhà phát triển của chúng tôi vì chúng tôi có thể đủ khả năng để có các đặc sản và được trả thêm tiền cho các lĩnh vực hẹp tương ứng của. 
* Trong hầu hết các quyết định, tất cả các lựa chọn đều khá tốt. Điều đó có nghĩa là bạn sẽ không phạm sai lầm khủng khiếp bằng cách chọn cái này hơn cái khác. Mặt khác, bằng cách chọn một bạn thường bị mắc kẹt với chúng. Giả sử bạn đã chọn làm với AWS và sau đó quyết định chuyển sang Azure. Điều đó sẽ không dễ dàng chút nào.
* Có rất nhiều quyết định "Phải" làm mà tôi muốn đưa vào như **giám sát lỗi**, **các công cụ quản lý hiệu suất ứng dụng**, **ORMs**, **hỗ trợ di động + PWAs**,...Sau đó, có một loạt các quyết định phía khách hàng như kiểm soát giao diện người dùng miễn phí hay trả phí, các gói, bộ đệm,...Nhưng tôi sẽ để ở một bài viết khác. Cảm ơn đã đọc bài viết của tôi.
* Nguồn tham khảo [https://michaelscodingspot.com/web-application-development/](https://michaelscodingspot.com/web-application-development/)