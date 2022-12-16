Xin chào các bạn, 
Chắc các bạn đã đọc phần 1 của mình tại: https://viblo.asia/p/su-dung-chatfuel-de-lam-chatbot-cap-nhat-tinh-hinh-virus-covid-19-chatfuel-part-1-jvElaAENlkw
thì hôm nay, mình tiếp tục giới thiệu đến các bạn phần 2, sử dụng Chatfuel để gửi ảnh nhé.

Nào, chúng ta bắt đầu thôi :D

Cũng như phần 1, thiết lập cũng khá là đơn giản thôi. Các bạn vào menu **Automate**, tạo 1 block có tên là Gái Xinh nhé, tại hướng dẫn này mình làm với gửi ảnh là gái xinh :D

Sau đó các bạn lại thiết lập trong block là 1 API JSON như phần 1, chỉ có điều là giờ chúng ta thay đổi ở phần URL thôi. 

Để có nguồn ảnh, các bạn có thể tìm ở bất cứ đâu trên mạng, ở đây mình xài Tumblr để lấy nguồn ảnh nhé. Mình đã có nguồn ảnh là ở đây: https://gaixinhchonloc.com/

Tiếp theo, do để lấy url tự động nên mình sử dụng API của Tumblr, sử dụng thì cần tạo app để lấy api key thì các bạn vào đây tạo cho mình 1 app rồi lấy key: https://www.tumblr.com/oauth/apps
![](https://images.viblo.asia/756afb9a-a441-4b0d-8682-19480f1d739e.jpg)

Hiện tại, do API nó lấy post theo phân trang với mỗi trang là 20 post nên khi mình xài api này, nó chỉ trả về 20 kết quả mới nhất theo thời gian bài đăng nên bạn nào có thể phát triển thì nghiên cứu qua phân trang của nó để lấy bài viết nhé.

Rồi, bây giờ chúng ta sẽ viết code để lấy ảnh, code mình đã viết sẵn ở link dưới, bạn nào thích thì lấy về nghiên cứu tiếp nhé :D
https://gist.github.com/quangpro1610/27ebb66b55a4739b1f5a75980d3a9684

Vì đoạn code này chỉ random trả về kết quả ngẫu nhiên mỗi lần 1 ảnh nên mình không thể bỏ vô file json để chạy nên bạn chịu khó chạy đoạn code mình chia sẻ ở trên từ hosting của mình nhé. Cảm ơn vì đã đọc bài viết. Đây là kết quả sau khi chạy :D

![](https://images.viblo.asia/e233b4fc-77de-40a0-84d9-cdc6bb4d0409.jpg)