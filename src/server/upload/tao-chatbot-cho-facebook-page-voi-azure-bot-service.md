# Giới thiệu
Trong bài viết này, mình sẽ hướng dẫn bạn cách tích hợp **chatbot** vào 1 trang của **Facebook** để tương tác với user.
![](https://images.viblo.asia/05950945-32bc-4a40-92c5-4d237604628f.png)

## Chatbot
**Chatbot** là 1 **ứng dụng AI** chạy ngay trong 1 ứng dụng tương tác, chẳng hạn như Skype, webchat, Facebook, Message, ... Người dùng có thể tương tác với bot bằng cách gửi tin nhắn, chọn các câu lệnh. Và bạn quản lý con bot của bạn bằng cách sử dụng cách handle các HTTPS request mà con bot của bạn gọi đến. Ngày nay, **chatbot** phát triển rất mạnh vì những lợi ích quá lớn của nó, như giảm công sức của con người trả lời các tin nhắn, tính chính xác, trả lời nhanh chóng, thường trực 247,... giúp cho việc bán hàng hay quảng bá sản phẩm đạt hiệu quả vô cùng.
## Microsoft Bot Framework
Là 1 **framework** mà **Microsoft** đưa ra để phát triển các ứng dụng **chatbot** (https://dev.botframework.com/), đương nhiên nó sẽ có tích hợp các công cụ liên quan của **Microsoft** như **Azure** để kiếm tiền, nhưng đừng lo, **Microsoft** cũng free cho user 1 tháng để dùng thử (free $200, chỉ cần tạo account và liên kết 1 thẻ Visa là okie).

![](https://images.viblo.asia/97fcddfc-7315-4c1e-bce7-c2381c1cbeca.png)

Nó cung cấp các công cụ để tăng tốc phát triển các **conversational AI**, nó có thể tương tác liên tục với Cortana, Office 365, Slack, Facebook Messager, ..
**Bot Framework** là 1 platform để build, connect, test và deploy những con bot mạnh mẽ và thông minh. Với sự hỗ trợ của .NET, Node.js và REST, bạn có thể download Bot Builder SDK và nhanh chóng bắt đầu để xây dựng 1 con bot với **Bot Framework**. Thêm vào đó, bạn có thể dễ dàng tương tác với các dịch vụ nhận diện giọng nói hay text của **Microsoft** (Cognitive Services) để thêm các smart feature như việc hiểu các ngôn ngữ tự nhiện, nhận diện hình ảnh, giọng nói, ...

## Azure Bot Service
https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0

Là 1 **Bot Service** được deploy sẵn trên Azure, cung cấp 1 môi trường tích hợp sẵn cho mục địch phát triển bot, cho phép bạn build, connect, test, deploy và quản lý bot, ở 1 nơi duy nhất. **Azure Bot Service** thúc đẩy sự phát triển của **Bot Framework SDK** với sự hỗ trợ của C# và Javascript. 
Nói cho dễ hiểu thì đây chính là 1 con bot được phát triển dựa trên **Bot Framework SDK**, và nó được xây dựng để tích hợp luôn với các dịch vụ của **Microsoft** và deploy lên **Azure**. 
![](https://images.viblo.asia/e2928919-bdda-4ae4-981a-8a5304e90ec8.png)

Bạn có thể tạo 1 con bot bằng **Bot Framework SDK**, sau đó deploy lên 1 con server rồi tích hợp nó với **Facebook Messenger**. 
Nhưng để đơn giản và nhanh chóng có kết quả thì mình sẽ deploy 1 con **Azure Bot Service** này. Cùng bắt đầu nhé.
# Tiến hành
## Tạo facebook app
Chỉ cần vào https://developers.facebook.com/ và tạo 1 ứng dụng

## Tạo Bot Service
Đầu tiên thì bạn phải có 1 tài khoản [Azure](http://portal.azure.com/)
### Tạo 1 bot Service mới
1. Đăng nhập vào Azure Portal
2. Click Create new resource link ở bên trái của Azure portal, chọn Bot Service > Web App Bot > Web App Bot
![](https://images.viblo.asia/dbfdaded-9599-4d77-884e-1a6486af7ece.png)
3.  1 màn hình chạy ra và mở ra những thông tin về Web App bot
4. Trong khung Bot Service, bạn điền những thông tin về con bot đó 
Tham khảo https://docs.microsoft.com/en-us/azure/bot-service/bot-service-quickstart?view=azure-bot-service-4.0
5. Click Create để tạo ra Bot Service và deploy Bot lên cloud, quá trình này có thể tốn vài phút.
6. Chờ 1 chút và chúng ta đã có 1 con bot service. Các bạn có thể Click vào nút Test your bot ở bên trái để thử chat với nó.
![](https://images.viblo.asia/1e9b3efc-e718-46fc-be2f-931f53888904.png)

## Kết nối
Việc kết nối phải được settings từ 2 phía là **App của Facebook** và **Bot Service**
* Bên App của FB cần setting để thêm Endpoint API của Bot Service để gọi đến lấy dữ liệu (message của bot).
Quay về bên  https://developers.facebook.com  chọn app mà bạn vừa tạo, trong setting cho Messenger, chọn **Setup Webhook** để link Endpoint API của bot service.
![](https://images.viblo.asia/b09d5551-24a9-4511-ba4c-d87b4ff86afd.png)

Ở setup ở Messager, chọn page mà bạn muốn chatbot tương tác, sau đó **Subscribe Webhook** ở trên để page có thể sử dụng chatbot. 
![](https://images.viblo.asia/a4457d1b-f6b9-4da3-baee-7803b2e7bcfc.png)

* Bên Bot Service setting thì cần có App ID và APP Secret của app để có thể access vào APP, ngoài ra cần có Page ID và Page Access Token để có quyền tự động gửi tin nhắn page.
![](https://images.viblo.asia/313d0151-dac8-46ab-817c-0718d566a20c.png)
# Test thử
Sau khi app Facebook của bạn được review (thủ tục khá là phức tạp) và đã public, vào trang Facebook page của bạn và thử gửi tin nhắn. Kết quả là chatbot đã tự động phản hồi. Great :D 

![](https://images.viblo.asia/765ae67d-7ffa-4e80-aac3-bb7cd12bb1d8.png)

# Kết
Trên đây là bài viết của mình về **Bot Framework của Microsoft** và cách xây dựng 1 ứng dụng đơn giản sử dụng Azure Bot Service. Hi vọng bài viết có ích cho các bạn mới bắt đầu nghiên cứu về chatbot. Cảm ơn các bạn đã đọc bài.
Bài viết có tham khảo một số nguồn

https://www.codeproject.com/Articles/1110201/Creating-A-Facebook-Bot-Using-Microsoft-Bot-Framew

https://dev.botframework.com/

https://azure.microsoft.com/en-us/services/bot-service/