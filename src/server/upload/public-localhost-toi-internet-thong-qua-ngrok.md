# Mở đầu: 
Chào mọi người, như tiêu đề. Hôm nay mình sẽ giới thiệu với các bạn một công cụ hữu ích, giúp cho chúng ta có thể public port trên máy local để người dùng mạng khác trên internet có thể truy cập vào được localhost thông qua domain của ngrok.

Vậy tại sao chúng ta cần sử dụng ngrok ? 
- Ngrok là một công cụ rất dễ cài đặt
- Từ việc cung cấp tunnel giúp tạo con đường tới máy local. Chúng ta có thể dễ dàng phát triển webhook với cấu hình dễ dàng. (Điều này mình đã thử trải nghiệm thực tế. Chả là hôm mình có phát triển một website và lấy dữ liệu thông qua webhook từ một website khác. Tuy nhiên vì để trong docker ở 2 container khác nhau và cùng không 1 mạng, thay vì mình config chung vào 1 network thì mình đã sử dụng ngrok để public trang kia lên và mình có thể truy cập và chèn dữ liệu thông qua webhook)
- Ngrok có giao diện dashboard thân thiện dễ sử dụng với mọi người
- Chúng ta có thể sử dụng custom domain, tạo config chạy tự động mà không cần tới command line



![ngrok.width-808.png](https://images.viblo.asia/2a66aa00-7331-4a02-90f7-cc2b3a1d2cc1.png)
# 1. Cài đặt:
Việc cài đặt rất dễ dàng, trước hết chúng ta truy cập vào https://ngrok.com/download để tải về bản ngrok phù hợp với hệ điều hành của bạn. 

**Với Windows**, chúng ta có thể tải về file zip ngrok và giải nén ra  để có thư mục như hình bên dưới.
![image.png](https://images.viblo.asia/eb29302c-91bf-4300-b79a-8fd4c8c1bba2.png)
**Với Linux**, chúng ta cài đặt thông qua command line:
tar: 
https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
Giải nén và đưa vào thư mục bin: 
```sh
sudo tar xvzf ~/Downloads/ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin
```
qua apt: 
```sh
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee
              /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb
              https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee
              /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt
              install ngrok
```

qua snap:
```sh
snap install ngrok
```
        
Then extract ngrok from the terminal


Chúng ta bật file ngrok lên và trước hết chúng ta sẽ config auth key cho ngrok. Ở đây mình dùng bản free.
Đăng nhập và vào link sau: 
https://dashboard.ngrok.com/get-started/your-authtoken
![image.png](https://images.viblo.asia/be937800-2d16-463b-ae5e-1a193732eb46.png)
Và config authtoken như hình: 
```
ngrok config add-authtoken ${your_authtoken}
Authtoken saved to configuration file: C:\Users\pviet\AppData\Local/ngrok/ngrok.yml
```
# 2. Sử dụng

![image.png](https://images.viblo.asia/b6a188dd-8e98-4b92-904d-98c6afc08d86.png)
Ở phía trên chúng ta có thể gõ lệnh: 
```sh
ngrok.exe http ${PORT}
```

Ở trên mình sẽ public port 3000 của localhost (172.0.0.1) lên internet. Nếu thành công chúng ta sẽ thấy hiển thị như dưới đây
![image.png](https://images.viblo.asia/28a0e903-b2d2-4f36-a8d9-dc0737df4b86.png)
Ngoài ra chúng ta có thể vào http://localhost:4041 để sử dụng ngrok 
![image.png](https://images.viblo.asia/10622f72-3035-4985-bb46-7225659bb01b.png)

Truy cập vào đường link 
https://3d81-42-115-113-199.ap.ngrok.io/ đã được ngrok public sẵn: 

![image.png](https://images.viblo.asia/966d7a49-a831-4ed2-8d2a-76d6664cea6a.png)
Thử truy cập từ thiết bị khác: (chưa kịp làm reponsive :(() 
![279854716_353384753523689_6510618584131091047_n.jpg](https://images.viblo.asia/105eb4eb-3ef4-4a3b-bcb0-8d4bc94ce3e8.jpg)


Như vậy chúng ta đã public thành công port dưới local tới internet với https. Từ đây chúng ta có thể test nhanh qua ứng dụng, lỗi reponsive trên điện thoại, hay test webhook... rất tiện lợi.  Và xem được các request, response trực tiếp trên dashboard của ngrok
![image.png](https://images.viblo.asia/9dc4dfdb-0939-466e-bdef-6d23d5ef3560.png)

Ngoài ra nếu bạn sử dụng docker: Chúng ta sẽ thêm đoạn command sau vào file docker-compose.yml : 
```yml
ngrok:
    image: shkoliar/ngrok:latest
    networks:
      - your_network
    ports:
      - 4551:4551
    environment:
      - PARAMS=http -authtoken=${NGROK_AUTH_TOKEN} your_ip:your_port
```
# Kết bài:
Trong phạm vi bài viết mình chỉ đưa ra những cái cơ bản nhất để  sử dụng ngrok. Nếu mọi người muốn tìm hiểu sâu hơn về ngrok chúng ta có thể vào trang chủ của ngrok để tham khảo. Hãy tận dụng công cụ hữu ích này để phục vụ cho công việc của bạn. Chào mọi người, hẹn gặp lại vào những bài viết sau và đừng quên để lại ý kiến hay upvote cho bài mình nhé. Thank you everyone! :D