Mới đây mình có nhận được một yêu cầu làm một extension nhỏ cho chatwork từ một người anh, mình có kết hợp với một bạn khác để làm extension này. Chức năng rất đơn giản, thông báo notification mỗi khi có message mới xuất hiện trên group chat của chatwork.

# 1. Cài đặt
Vì hiện tại extension này chưa được đưa lên trên store của chrome nên muốn sử dụng thì phải bật chức năng develop extension của chrome. Mở rất đơn giản, chọn Window/Extensions, ở góc trên bên phải sẽ xuất hiện một switch là "Developer mode", bạn hãy enable nó lên.

- Bước đầu tiên để sử dụng, bạn hãy lấy project về từ link github sau: [ChatworkNotificationExtension](https://github.com/oNguyenTheHien/ChatworkNotificationExtension).
- Mở cửa sổ extension của chrome, sau đó ấn vào tab "Load Unpacked". 
![](https://images.viblo.asia/6d7308df-2fcc-49fe-aaa1-726f5f125418.png)

- Chọn đường dẫn đến thư mục của project mà bạn đã lấy về từ github.
- Sau khi chọn xong thì kết quả sẽ được như sau : 
![](https://images.viblo.asia/d5a979d5-3ed7-4d29-afe0-c9bb34d52ac8.png)
- Mở tab chrome thông thường, ở góc trên bên phải, bạn sẽ thấy có biểu tượng của extension sáng màu, không bị xám có nghĩa là đã cài đặt thành công, còn nếu không thì bạn hãy lập lại các bước trên.

![](https://images.viblo.asia/225da2d9-0236-46af-ad29-4a39e46fa1f7.png)

# 2. Sử dụng
Ấn vào biểu tượng extension ở góc trên bên phải, sẽ có một của sổ được mở ra như sau : 

![](https://images.viblo.asia/36baf6cf-3f5a-4cc3-8062-356ce276f194.png)

Để sử dụng được extension này, trước hết bạn cần phải có api token của chatwork, nếu như bạn là tài khoản premium, hãy liên lạc với admin để lấy token này. Để lấy được api token hãy làm các bước sau.

- Ấn vào phần Setting, chọn API setting.

![](https://images.viblo.asia/66021157-59b1-4e4e-88f0-24f04ee87749.png)

- Ở phần API, chọn API Token, gõ password của bạn vào, sau đó api token sẽ hiện lên.

![](https://images.viblo.asia/3eead909-2b14-4910-b5b6-3d8755afa8f8.png)

Sau khi bạn lấy được API Token, hãy copy/paste đoạn đó vào trong phần load của extension. Sau đó ấn nút Load.

![](https://images.viblo.asia/7fc058a2-ecbd-4a71-856c-0251d985b9b3.png)

Đợi khoảng 2-3s các group bạn đã follow trên chatwork sẽ được hiện ra, ở đây bạn có thể tuỳ chọn xem sẽ nhận notification từ những group nào. Sau khi chọn xong hãy ấn Save settings.

Demo: 
![](https://imgur.com/u1DFzpq.png)

Vậy là phần hướng dẫn sử dụng đã xong, bạn có thể nhận notification mỗi khi có message mới, cảm ơn em Nguyễn Xuân Thành đã giúp đỡ. 

Cảm ơn đã đón xem, hãy cho tôi biết ý kiến của bạn và nếu bạn có đề xuất gì hãy đừng ngại ngần comment giúp cho tôi.