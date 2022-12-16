# 1. Giới thiệu qua về Rasa Bot và Slack
**Rasa Bot**

* Ở một số bài viết trước, mình có giới thiệu qua về famrework Rasa Core và Rasa NLU. Đây là 2 thành phần chính cấu tạo nên RasaBot. 
* RasaBot cũng có những đặc điểm cơ bản của ChatBot như trả lời tự động, thực hiện gọi API của bên thứ 3, ...

**Slack**

* Slack có thể coi là một "phòng chat" cho các thành viên trong một công ty, cộng đồng, ...
* Slack được chia thành các kênh nhỏ cho các cuộc hội thảo, thảo luận nhóm,...hoặc bất cứ điều gì bạn muốn.
* Ưu điểm của Slack là sẽ giúp cuộc giao tiếp trong tổ chức hay công ty giảm bớt được số lượng email nội bộ đi
* Slack chạy đa nền tảng từ Máy tính, Androi, IOS,...
* Gói miễn phí của Slack cho phép người ta có thể lưu trữ tới 10.000 tin nhắn mà nhóm đã trao đổi với nhau, 5GB dung lượng lưu trữ và cho phép liên kết 5 dịch vụ của hãng khác.

# 2.Tạo một Rasa Bot và file kết nối 

Mình có một bài hướng dẫn qua về cách xây dựng ChatBot với Rasa ở phần trước nên phần này mình sẽ demo lại kết quả của Bot

Các bạn có thể tìm các nguồn Bot có sẵn trên Github để test hoặc tự tạo ra một ChatBot của riêng mình, điều đó thực sự rất thú vị ^^!

![](https://images.viblo.asia/65613999-91e4-44bf-babb-148baee87d9b.png)

**Sau khi tạo được Rasa Bot, bạn cần tạo file kết nối với Slack API như dưới đây**
![](https://images.viblo.asia/31c1e4b9-7a96-4c52-8293-f6f75b08f6a9.png)

**Trong file này cần lưu ý nhất là 2 thông số slack_token và slack_channel được lấy tương ứng với Slack API của riêng mỗi người.**
![](https://images.viblo.asia/6340393a-beed-434b-adc3-6480cbec19db.png)

**Bot User OAuth Access Token chính là slack_token**
# 3.Tạo link webhook cho Slack API và kết nối với Rasa Bot
Đầu tiên bạn cần deploy server của mình và tạo một link url. Ở đây mình sử dụng Ngrok

Bạn có thể tìm hiểu cách cài đặt Ngrok ở https://ngrok.com/

**Chạy server Rasa Bot có cài đặt thông số cài đặt của Slack API và chạy cổng port 5002**
![](https://images.viblo.asia/62a2cdce-99d7-4661-a9f0-f078cd00dc6c.png)

**Chạy Ngrok cổng port 5002**
![](https://images.viblo.asia/7d09679a-08b1-42a1-ab18-a2c1f3d97471.png)

**Giờ đã có url webhook. Tiếp theo vào Slack API và tạo link webhook để kết nối với local server của Bot**
![](https://images.viblo.asia/cd2c88da-800e-45e9-b6b4-5500ee9c0f83.png)

**Kết quả kết nối thành công với Slack API như hình dưới**
![](https://images.viblo.asia/0ab82582-29b3-4645-90ba-d0c1e00cf21c.png)

**Như vậy đã liên kết xong Rasa Bot với Slack API.**
****************************************
Dưới đây là demo Bot của tutorial

![](https://images.viblo.asia/6d7de9ba-a6c8-42d6-88f3-68df17c4005a.gif)

**Cảm ơn các bạn đã theo dõi bài viết. Xin chào và hẹn gặp lại ^^!**

Link tham khảo: https://towardsdatascience.com/building-a-conversational-chatbot-for-slack-using-rasa-and-python-part-2-ce7233f2e9e7