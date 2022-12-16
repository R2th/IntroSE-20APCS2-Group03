Trong bài viết này mình sẽ chia sẻ với các bạn về những điều mình tìm hiểu được về kiến trúc của serverless, tìm hiểu sâu về những tiện ích cũng như bất cập, các ứng dụng của dịch vụ serverless. AWS đóng vai trò gì trong dịch vụ này? Chúng ta cùng tìm hiểu trong bài viết.

![](https://images.viblo.asia/77ddc1a0-a990-4053-99e5-8f474b5b115e.jpeg)



## Sự nổi lên của dịch vụ serverless
Để trả lời cho câu hỏi serverless là gì, chúng ta hãy cùng nhìn lại lịch sử việc sử dụng kiến trúc máy chủ (server):

"Vào những năm 1990, sự bùng nổ của Internet mang đến cho các công ty những cơ hội kinh doanh mới, họ đầu tư vào việc phát triển những ứng dụng web nhằm mang đến cho khách hàng của họ những trải nghiệm mới lạ và thú vị khi sử dụng dịch vụ của họ. Vào thời điểm này, để một ứng dụng web chạy được họ cần phải làm rất nhiều việc, lấy ví dụ đơn giản nhất là họ cần phải có server để host ứng dụng web của họ, sau đó từ câu chuyện cần có server, họ phải đối mặt với các bài toán về hạ tầng liên quan như hệ thống điện, UPS, hệ thống dây mạng, chuyên viên IT, người giám sát,… đi kèm với đó là những công việc quản lý, vận hành xoay quanh hạ tầng đó, những công việc tốn rất nhiều thời gian và tiền bạc."


 ![](https://images.viblo.asia/d5cfe6b9-4ed4-47a9-b6f2-eb80669a3f4f.jpg)



"Để giải quyết các vấn đề phức tạp liên quan đến hạ tầng, vào năm 2008, các dịch vụ ứng dụng mô hình Cloud Computing – Công nghệ điện toán Đám mây bùng nổ, một nền tảng công nghệ giúp các công ty đơn giản hóa việc phát triển các ứng dụng của mình với việc giảm bớt gánh nặng về xử lý các bài toán liên quan đến hạ tầng cho ứng dụng. Tại thời điểm này, các dịch vụ cloud được cung cấp chủ yếu là các dịch vụ IaaS – Infrastructure as a Service. Với IaaS, mặc dù đã giúp giảm đi rất nhiều gánh nặng về hạ tầng, nhưng vẫn còn khá nhiều công việc liên quan đến quản lý hạ tầng hay cụ thể là quản lý các dịch vụ IaaS mà các công ty cần phải thực hiện như nâng cấp OS cho server hay backup dữ liệu của hệ thống server, …


Một bước tiến khác của Cloud Computing đó là vào khoảng năm 2012, các dịch vụ PaaS – Platform as a Service nở rộ. Với các dịch vụ PaaS, các công việc liên quan đến quản lý hạ tầng ở phía các công ty được giảm nhẹ, việc nâng cấp OS hay backup dữ liệu hệ thống máy chủ được thực hiện bởi các nhà cung cấp dịch vụ cloud và phía công ty chỉ cần tập trung phát triển ứng dụng và lựa chọn cấu hình, kích thước phù hợp của dịch vụ cho ứng dụng của họ. Mặc dù với tính chất “mỳ ăn liền” của các dịch vụ PaaS, tuy nhiên vẫn còn một số vấn đề liên quan đến hạ tầng mà các công ty cần phải quan tâm như tính toán cấu hình hệ thống sao cho phù hợp hay xử lý bài toán scale hạ tầng cho ứng dụng.


Và mô hình serverless ra đời, một mô hình điện toán đám mây được phát triển để giải quyết “gần như” triệt để các vấn đề về phía hạ tầng cho người sử dụng bằng việc cung cấp một dịch vụ cloud đóng gói, lập trình viên chỉ việc đẩy code của mình lên dịch vụ serverless này và nhà cung cấp dịch vụ cloud sẽ lo từ “A đến Z” các vấn đề về phía hạ tầng để chạy được code của họ cũng như giúp xử lý bài toán scale cho ứng dụng."


## Serverless là gì?
Serverless computing được giới thiệu cùng với các dịch vụ như AWS Lambda hay Azure Functions của Microsoft. Chúng không thực sự là một hệ thống ‘không có máy chủ’ mà thực tế máy chủ này không phải là thiết bị do bạn mua hoặc mất chi phí để duy trì. Về mặt lý thuyết, hệ thống này được quảng cáo như là một nguồn tài nguyên bạn có thể sử dụng mà không cần dùng tới máy chủ.
Serverless hay còn được biết đến với một thuật ngữ khác là Function-as-a-Service (FaaS), là một mô hình máy tính trên cloud, giúp thực thi các đoạn code của lập trình viên được đẩy lên trong các máy tính stateless (phi trạng thái/không lưu trữ trạng thái), được xử lý/trigger theo sự kiện, hoạt động tạm thời (có thể chỉ tồn tại cho một lần sử dụng) và hoàn toàn được quản lý bởi bên thứ 3 ở đây là nhà cung cấp dịch vụ cloud. Với kiến trúc serverless, lập trình viên chỉ cần tập trung vào viết các đoạn code logic mà không phải quan tâm về việc vận hành server để đoạn code logic đó chạy được.


## Kiến trúc của ứng dụng Serverless

![](https://images.viblo.asia/8884f40c-41e5-4133-ad09-4b0faa48220c.jpg)
 
     
  Trong phần này chúng ta sẽ phân tích cấu trúc cảu ứng dựng serverless theo hướng phân lớp (Vì khó có từ tiếng việt hợp lý để lý giải, mình xin phép để nguyên tiếng anh)
    
### Presentation và delivery layer

   Làm cách nào để user có thể tương tác với ứng dụng của bạn? Đó là tương tác với giao diện người dùng nhưng với những ứng dụng mà người dùng không thấy được "presentaiion & delivery" layer ví dụ như API thì sao? Những ứng dụng truyền thống không dùng kiến trúc serverless cũng có presentation & delivery layer, chính xác đó là layer mà ở đó người dùng tương tác với ứng dụng của bạn, theo các như duyệt web, cũng có thể sử dụng ứng dụng mobile với API mà bạn xây dựng. Presentation & Delivery thường được gói lại thành 1 layer.

***Presentation technology bao gồm:***

- static website file ( ví dụ như *.html  hay *.css *.js  Những file không thay đổi trong quá trình sử dụng.)
- Frontend framworks 
- Mobile application (apk android )
- DNS configuratoin
- Content delevery networknetwork


***Những điều nổi bật khác biệt ở layer này với kiến trúc truyền thống:***

* Không cần server port config.
* Không cần scale hay setup bandwidth.
* Đáp ứng tất cả yêu cầu về hosting, scaling, delivering của bất cứ outsource nào.



### Application layer
Ở layer này, kiến trúc serverless được thể hiện rõ ràng ở các nhóm dịch vụ sau:
- APIs và HTTP listener 


- Function as Service
Function as Service (FaaS) là một trong 2 dịch vụ chính của nhóm dịch vụ serverless (Backend as Service (BaaS) và Function as Service (FaaS) ), ở mô hình này, bạn sẽ phải viết code ở phần backend, nhưng thay vì deploy lên server, bạn deploy dưới dạng một function. Như vậy cách này bạn sẽ chủ động hơn đối với phần backend và không cần quan tâm đến server. Function này sẽ được gọi dưới dạng RestAPI, bạn sẽ trả tiền theo số lần gọi function của mình. Dịch vụ FaaS khá nổi tiếng là AWS Lambda của Amazon. Khi công bố dịch vụ AWS Lambda nhóm phát triền Amazon đã nói "dịch vụ này cho phép các bạn chạy các đoạn code logic của mình mà không cần cung cấp hoặc phải quản lý một hoặc nhiều máy chủ. Ngoài ra, AWS API Gateway cung cấp các kết nối đầu cuối API có thể kết nối với các chức năng của Lambda function, kết nối giữa một API Gateway với một Lambda tạo ra một API endpoint mà client có thể gọi tới. Sự kết hợp này cho phép client lấy được mã truy cập (token) mà không tiết lộ ClientID và ClientSecret". Tập trung vào ứng dụng chứ không phải cơ sở hạ tầng của bạn.


- Intergration (tích hợp)


 Nổi bật ở dịch vụ tích hợp là Backend as Service. BaaS giúp chúng ta tích hợp thêm nhiều dịch vụ vào trong ứng dụng như Indentity, Email, SMS, monitoring...v...v
 
 
 
**---------Backend as Service--------**

Do nhu cầu về thao tác và lưu trữ dữ liệu mà hầu hết các ứng dụng đều được xây dựng theo mô hình client-server. Ở một ứng dụng chúng ta sẽ có client-side (frontend) và server-side (backend).
Backend sẽ chứa 2 thành phần là application business logic và data processing/management.
Kết quả là Baas ra đời bằng cách đóng gói 2 thành phần trên làm một.

**----------------------------------------------**

### Persistences layer (data layer)
Nhắc tới Data chắc hẳn mọi người cũng đã mường tượng được đa phần của Layer này:
- **Database:**

    Ứng dụng sử dụng kiến trúc serverless thường dựa trên database có thể được quản lý hoàn toàn, ví dụ điển hình ở đây: DynamoDBDB, FaunaDB, Google Firebase hoặc Firestore.  Vài vấn đề đặt ra ở layer này mà bạn có thể gặp phải khi xây dựng:
1.  Chi phí nâng cấp mở rộng dung lương của database
2.  Khó khăn về chi phí và trong thực thi data replication (Hiểu nôm na là back up data, bạn có thể đọc về cơ chế của replica trong bài viết này về mongoDB https://viblo.asia/p/replica-set-mongodb-LzD5dAQ0KjY )
3.  SQL vẫn là tiêu chuẩn trong data analysisanalysis mà không phải là NoSQL
4.  ***ServerFULL*** databases vẫn là tiêu chuẩn, 
    
- **File storage:**
Phụ thuộc hoàn toàn vào các cloud service nhằm đảm bảo được:
1. Tính khả dụng cao
2. Khả năng scaling tối đa
3. Khả năng truy cập dễ dàng
4. Tính bảo mật
Nổi bật lên ở đây là các dịch vụ AWS S3, Azure storage, Google cloud storage.


![](https://images.viblo.asia/154cc5a1-e05e-4e0a-ac74-ac0a34c0ac70.png)


### Multi-layer concerns

1. **Security**
- Vẫn còn những tồn tại gây trở ngại đó chính là cấu hình truy cập để control ứng dụng, Cấp quyền cũng như giới hạn quyền, hạn chế trong quản lý dữ liệu nhạy cảm. 
2. Logging, Monitoring, Debugging 
-  Đây chính là điểm hạn chế nhất của ứng dụng trên nền tảng serverlessserverless. Để fix một issue cần phải hiểu tưởng tận tất cả các component được liên kết với nhau ra sao... Chưa kể tới server được bên thứ 3 quản lý, bạn chưa chắc có quyền truy cập vào.
3. **Deployment**
- Ứng dụng Serverless được thiết kế để tách rời công việc này. Các lập trình viên được giảm thiểu phần nào công việc. Với client-server, bạn phải biết cách build, deploy code lên server, bảo trì và kết nối tới server. Với Serverless, bạn chỉ việc code, mọi việc còn lại sẽ được thực hiện giúp bạn.



## Lợi ích của dịch vụ serverless
* Lợi ích đầu tiên mà có thể thấy rõ ràng được luôn đó chính là giảm được gánh nặng & các vấn đề về việc vận hành, quản lý server. Với việc sử dụng các dịch vụ serverless chuyên nghiệp và cụ thể ở đây làAWS Lambda, Google cloud functions, Azure functions, công việc vận hành, quản lý server sẽ do những người có chuyên môn cao của nhà cung cấp dịch vụ thực hiện, đảm bảo được sự ổn định của hệ thống.


* Giảm thiểu các chi phí: Việc giảm thiểu chi phí này đến từ 3 phía: chi phí điều hành, chi phí phát triển và chi phí sử dụng:
    1. Chi phí điều hành có thể giảm đi thông qua việc sử dụng các dịch vụ Serverless. Với những nhà cung cấp dịch vụ điện toán đám mây lớn như Microsoft hay Amazon, họ có những công nghệ tân tiến và đội ngũ kỹ sư “lành nghề” chuyên tập trung vào việc phát triển & quản lý dịch vụ serverless của họ, ngoài ra, dịch vụ của họ không chỉ cung cấp riêng cho 1, 2 cá nhân sử dụng mà là rất nhiều do vậy số tiền bỏ ra để thuê dịch vụ sẽ rẻ hơn rất nhiều so với việc thuê một người có chuyên môn cao chỉ để vận hành riêng server của bạn.
    2. Chi phí phát triển, với việc tối giản các công việc liên quan đến vận hành đồng nghĩa với việc tối giản thời gian phát triển. Với thời gian phát triển được rút ngắn, chi phí cho việc phát triển cũng được giảm đi theo là điều dễ hiều.
    3. Chi phí sử dụng, với mô hình tính tiền theo số lần function được gọi sẽ giúp tối ưu được rất nhiều về chi phí hoạt động của ứng dụng khi chỉ cần phải trả tiền cho thời gian mà function chạy thay vị trả cố định một khoản tiền hàng tháng cho server.
    
  
* Tập trung vào việc phát triển code logic nghiệp vụ. Khi các yếu tố làm sao nhãng sự tập trung của nhà phát triển để code ra các logic nghiệp vụ như cấu hình server, thiết lập kết nối giữa các dịch vụ liên quan, … được giảm đi thì đồng nghĩa với việc sự tập trung của lập trình viên vào việc code logic được bảo toàn và từ đó phần nào đảm bảo được chất lượng của các đoạn code logic mà lập trình viên viết ra.


* Đưa sản phẩm ra thị trường nhanh hơn. Hiển nhiên rằng khi thời gian phát triển được giảm đi thì đồng nghĩa với việc rút ngắn được thời gian đưa sản phẩm ra thị trường.


* Điều chỉnh được chi phí linh hoạt. Với các nhà cung cấp dịch vụ serverless lớn như Microsoft hay Amazon, họ cung cấp những giải pháp “scaling” linh hoạt, cho phép nhà phát triển có thể thiết lập bằng tay hoặc tự động điều chỉnh cấu hình server của function “giãn nở” theo mức độ sử dụng của function từ đó điều chỉnh được chi phí sử dụng.


* Giảm DevOps("software DEVelopment" và "information technology OPerationS") là một thuật ngữ để chỉ một tập hợp các hành động trong đó nhấn mạnh sự hợp tác và trao đổi thông tin của các lập trình viên). Một điều hiển nhiên đó là serverless giúp lập trình viên không phải lo về hạ tầng đồng nghĩa với việc các vấn đề về quản lý, vận hành hạ tầng sẽ không cần được quan tâm, giảm được các DevOps liên quan.


## Hạn chế 
Serverless là một ý tưởng tuyệt vời nhưng không hoàn hảo, có thể nâng cao về hiệu suất nhưng bản thân mô hình này có thể gây ra độ trễ lớn hơn mô hình server truyền thông ví dụ đơn giản Serverless có thể không nhanh bằng code trên server riêng vì code chỉ chạy mỗi khi có request nên sẽ mất khoảng 20-50ms để start-up.. Nếu khách hàng yêu cầu hiệu suất cao thì việc sử dụng các máy chủ ảo được phân bổ sẽ là một lựa chọn ưu việt hơn.

Monitoring và debugging của Serverless cũng khá khó khăn do tài nguyên (CPU, RAM) được bên thứ 3 quản lý . Việc bạn không sử dụng một máy chủ thống nhất làm cho cả hai hoạt động này gặp nhiều trở ngại. (Tin tốt là sẽ có các công cụ và được để cải thiện xử lý monitoring, debugging tốt hơn trong môi trường Serverless)

***Tuy nhiên ưu điểm vượt trội hơn nhược điểm:***

Vậy bạn có nên sử dụng kiến trúc Serverless? Câu trả lời là có. Dựa trên việc Amazon Web Services, Google, và Microsoft đều đang tập trung phát triển các dịch vụ serverless của họ. Nổi bật với AWS Lambda, Google cloud functions, Azure functions.

Tổng kết lại Serverless vẫn là một giải pháp hiệu quả của ứng dụng điện toán đám mây. Nó không còn quá mới mẻ, đã và đang được ứng dụng rộng rãi trong thời gian tới.



Trong phần tiếp theo của bài viết, mình sẽ giới thiệu lần lượt về  DynamoDB, AWS Lambda, API Gateway, S3 Static để các bạn có cái nhìn tổng quan và hiểu được tổng thể hệ thống serveless. 




***Tài liệu tham khảo:***


http://blog.lionpham.com/2017/05/24/azure-functions-serverless/

https://viblo.asia/p/serverless-typescript-voi-aws-lambda-api-gateway-va-dynamodb-tren-moi-truong-offline-phan-01-3P0lPk7PZox

https://martinfowler.com/articles/serverless.html

https://viblo.asia/p/lan-dau-tien-su-dung-baas-backend-as-a-service-Zzb7vD4nvjKd