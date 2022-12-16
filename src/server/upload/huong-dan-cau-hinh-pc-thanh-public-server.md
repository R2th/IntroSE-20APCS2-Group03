Chào mọi người,
Mình đã từng gặp trường hợp phía FE không thể access vào server công ty (vì authen, policy ,.. nên bị chặn request), giờ làm cách nào để bên FE có thể gọi API phía BE để test nhỉ ? Tất nhiên là ta phải tạo 1 cái server rồi và tìm cách để thiết bị bên FE có thể gọi được server bên phía BE. Bài viết này mình sẽ hướng dẫn 2 cách host server, server nội bộ nếu dùng chung mạng (làm ở trên văn phòng) hoặc server public (làm remote nên không cùng chung mạng được)

# Server local
Với server nội bộ thì cách config khá đơn giản, bao gồm 2 bước:
1. Start server
Như mình hay làm việc với rails thì khi không set gì thì default nó sẽ start với port 3000, tuy nhiên các bạn lưu ý là phải binding với address 0.0.0.0 thay vì 127.0.0.1. Lý do là vì địa chỉ 127.0.0.1 không thể truy cập từ bên ngoài.
Vd: Trong rails ta sẽ dùng lệnh` rails s -b 0.0.0.0` thay vì `rails s` như bình thường
![image.png](https://images.viblo.asia/d2896e10-6f5e-4398-b554-35f8e7bcafd2.png)
2. Bỏ chặn firewall port để cho phép truy cập từ bên ngoài
- Với ubuntu ta chỉ đơn giản là gõ lệnh `sudo ufw allow <port>` 
- Với window thì sẽ rườm rà hơn một chút bạn sẽ phải vào Window Firewall để set rule mở port
![image.png](https://images.viblo.asia/212e9530-95dc-4324-a9a0-dfabcd6be4ad.png)

Hoàn thành 2 bước trên thì ta chỉ cần tìm IP Private của máy trong mạng nội bộ là đã có thể truy cập vào server rồi
![image.png](https://images.viblo.asia/9dd41326-e0c2-419b-8f41-c851ce86971c.png)
# Server public
Tương tự với việc host 1 server nội bộ, ta cũng thực hiện 2 bước ở trên, sau đó thực việc port forwarding tới port đang chạy server. Mục đích là để forward request 
1. Tìm default gateway cũng là địa chỉ IP của router. Ở đây mình dùng lệnh `ipconfig /all`
![image.png](https://images.viblo.asia/7311d539-d7f1-4886-8319-c9f556f3affd.png)
2. Truy cập vào router thông qua địa chỉ vừa tìm được và login (hầu hết username và password mặc định để đăng nhập đều được dán ở phía mặt sau router)
![image.png](https://images.viblo.asia/a8367516-6162-4c11-b8bf-268350d68985.png)
3. Tìm đến chức năng port forwarding và config. Tuỳ theo router mà cách config sẽ có đôi chỗ khác nhau nhưng các bạn chỉ cần để ý các giá trị là địa chỉ IP private (địa chỉ IP của máy host server), port cần forward và giao thức sử dụng
![image.png](https://images.viblo.asia/eb4f88aa-93c5-4de4-9e85-62e71755bd46.png)
4. Tìm địa chỉ IP public
![image.png](https://images.viblo.asia/0909db66-e1fe-4067-bcaf-34d3d3c2ac61.png)
Tới đây thì bạn đã có thể truy cập server bằng public IP rồi.
![image.png](https://images.viblo.asia/c1fafd3e-4474-4a66-828b-f2b2d6ade53d.png)
Kiểm tra bằng website canyouseeme.org
![image.png](https://images.viblo.asia/96f556b3-6518-4327-bb56-df0975566caf.png)

# Lưu ý: 
Bạn có thể phải cần setting cho router cấp phát IP private tĩnh cho máy host server để tránh trường hợp phải setting lại khi host server được cấp một địa chỉ IP tự động bằng DHCP. Như hình minh hoạ dưới đây
![image.png](https://images.viblo.asia/f5c29c92-392f-44e5-99bb-48145f91028c.png)
Và bạn cũng không nên dùng cách ở hình dưới để setting IP private tĩnh vì đôi khi sẽ xảy ra conflict khi router đã cấp địa chỉ IP mình mong muốn cho một thiết bị khác
![image.png](https://images.viblo.asia/ba0f0ccf-05e8-4dbe-9e38-2d11f5b6c4fc.png)

# Kết
Đây là phương pháp mà mình tự mày mò và nghiên cứu ra, có đôi chỗ giải thích có lẽ không chính xác hoặc khó hiểu mong mọi người đóng góp ý kiến. Chúc các bạn áp dụng thành công!