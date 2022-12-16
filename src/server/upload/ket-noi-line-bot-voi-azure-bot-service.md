# Khái niệm
## Tìm hiểu Azure Bot Service
Là 1 **Bot Service** được deploy sẵn trên Azure, cung cấp 1 môi trường tích hợp sẵn cho mục đích phát triển Bot dựa trên **Bot Framework SDK** và hỗ trợ cho các ngôn ngữ như: **CSharp**, **Node.js**. Các nhà phát triển dịch vụ AI có thể tạo ra các bot sử dụng lời nói, xử lý ngôn ngữ tự nhiên, hiểu được các câu hỏi và câu trả lời. Nó còn rất dễ dàng tích hợp với các channel khác nhau như: Line, Slack, Facebook, Skype, Twilio và các kênh khác.

Ngoài Azure Bot Service và Bot Framework, Microsoft còn cung cấp các dịch vụ mở rộng chức năng của Bot như:
* **LUIS - Xử lý ngôn ngữ tự nhiên**: Cho phép con Bot của bạn hiểu được ngôn ngữ tự nhiên, hiểu lỗi chính tả, sử dụng lời nói và nhận định ý định người dùng
* **QnA Maker - Hỏi đáp**: Cung cấp một nền tảng kiến thức để trả lời các câu hỏi mà người dùng hỏi theo cách tự nhiên hoặc hướng người dùng đến một cuộc hội thoại đã được thiết lập sẵn.
* **Dispatch tool - Quản lý nhiều models**:  Cho phép sử dụng nhiều hơn một models như: LUIS và QnA Maker, xác định được khi nào nên sử dụng cái nào trong cuộc hội thoại với con Bot.
* **Add card**: Gắn thẻ & nút: Nhằm nâng cao trải nghiệm người dùng với các loại văn bản đa phương tiện như: menus và card.

## Kết nối với Channels Azure
Channels được hiểu là một dạng kết nối con bot của bạn với các ứng dụng giao tiếp. Bạn có thể cấu hình một con bot tới các channel mà bạn muốn thông qua **Azure portal**, kết nối bot của bạn với các channel này và tạo điều kiện giao tiếp giữa bot của bạn và người dùng. Bạn có thể kết nối tới nhiều dịch vụ phổ biến như: **Cortana, Facebook Messenger, Kik, Slack** hay **LINE** - chủ đề mà hôm nay chúng ta sẽ tìm hiểu tới.

# Tiến hành cài đặt và cấu hình
Trong bài viết này, chúng ta sẽ tìm hiểu tạo một Bot Service trước để mọi người có thể hiểu hơn về cách thức tạo một ứng dụng Chatbot đơn giản cho mình. Sau đó, sẽ tiến hành cài đặt kết nối giữa ứng dụng LINE Bot và Azure Bot.
## Tạo Web App Bot
1. Đăng nhập vào [Azure Portal](https://portal.azure.com/)
2. Click **Create new resource** link ở bên trái của Azure portal và chọn **AI + Machine Learning > Web App bot**.

![](https://images.viblo.asia/ba589f6a-9cb6-4c90-ac03-d3fd541ce055.jpg)

4. Một cửa sổ mới sẽ được mở với thông tin của **Web App bot**
5. Trong thông tin **Bot Service**, cung cấp thông tin được yêu cầu về bot của bạn như sau:

![](https://images.viblo.asia/6f9a56f2-0556-4a6c-a38e-70b7b87b7e12.jpg)

Ở đây, chúng ta sẽ lựa chọn **bot template** là **Basic Bot (NodeJS)**.  Bot template này sẽ bao gồm các dịch vụ sau: **[Language Understanding](https://docs.microsoft.com/vi-vn/azure/cognitive-services/luis/what-is-luis)** **(LUIS)** và **Bot Analytics** .

**Lưu ý:** Nếu chúng ta chưa có LUIS Account thì có thể tìm hiểu thêm hướng dẫn tạo LUIS App qua LUIS portal tại đây nhé:
https://docs.microsoft.com/vi-vn/azure/cognitive-services/luis/get-started-portal-build-app

Tài liệu liên quan đến LUIS có thể xem thêm [tại đây](https://docs.microsoft.com/vi-vn/azure/cognitive-services/luis/what-is-luis).

6. Nhấn **Create** để tạo dịch vụ và triển khai Bot Service của bạn lên Cloud. Quá trình này có thể diễn ra trong vài phút.
Để xác nhận được Bot Service của mình đã được deploy thành công hay chưa trong hộp thông báo Notifications.  
7. Chọn **Go to resource** để kiểm tra ngày sau khi con bot của bạn đã được tạo.
![](https://images.viblo.asia/683ec992-027a-4aba-920f-e2abc62f5aaa.jpg)
## Tạo kết nối LINE Channel với Azure bot
Để chuẩn bị cho bước này, chúng ta cần có sẵn một **Line Channel** - **Messaging API** để có thể kết nối với Azure Bot Service. Có thể tham khảo tại: https://developers.line.biz/en/docs/messaging-api/getting-started/

![](https://images.viblo.asia/904f4c2f-8097-455e-b1ec-fb228c2069bc.jpg)

1. Lựa chọn **Web App Bot** vừa tạo và chọn **Channels**

![](https://images.viblo.asia/96823278-ee8e-4bce-99c3-3599f977bcf8.jpg)

2. Ở đây, lựa chọn Line Channel và dán **Channel Secret**, **Access Token** từ trên vào các trường thích hợp và copy Webhook URL.

![](https://images.viblo.asia/38208442-6c24-4bb6-a780-0adb59404d3d.jpg)

## Cấu hình LINE Webhook
Tiếp theo, chúng ta quay lại [LINE Developer Console](https://developers.line.biz/console) và dán Webhook URL từ Azure Service vào **Message settings > Webhook URL** và chọn **Verify** để xác nhận kết nối. 

![](https://images.viblo.asia/d62b9cbc-c421-4551-a467-a70f94d0b615.jpg)

**Lưu ý:**  Trong LINE Developer Console, bạn phải thiết lập webhook URL đầu tiên và chỉ khi **Use webhooks = Enabled** thì mới có thể kết nối thành công.
## Kiểm tra hoạt động
Khi bạn đã hoàn thành các bước trên, bot của bạn sẽ được cấu hình để giao tiếp với người dùng trên LINE và sẵn sàng cho việc thử nghiệm.
Ngay lúc này chúng ta đã có thể thêm con Bot của bạn trên ứng dụng LINE và trải nghiệm. Còn đây là thành quả của mình.
![](https://images.viblo.asia/167adfa9-d2c1-4947-8a9f-bd0a5c599525.jpg)

# Kết luận
Như vậy, qua bài viết này chúng ta có thể hiểu thêm về ứng dụng của Azure Bot Service cũng như Bot Framework Microsoft. Hi vọng bài viết này sẽ hữu ích với các đồng chí đang nghiên cứu về Chatbot.
> Nguồn tham khảo:
> 
> * https://docs.microsoft.com/vi-vn/azure/bot-service/bot-service-channel-connect-line?view=azure-bot-service-4.0
> * https://docs.microsoft.com/vi-vn/azure/cognitive-services/luis/what-is-luis