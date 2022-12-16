Trong đợt cách ly xã hội vừa rồi, trường Kinh Tế Quốc Dân đã thiết kế một [hệ thống phát gạo dựa trên nhận diễn khuôn mặt](https://nld.com.vn/thoi-su/clip-phat-gao-mien-phi-voi-cong-nghe-nhan-dien-khuon-mat-20200416164432509.htm) mà mình thấy rất hay và có ích. Tiện Viblo có đợt tổ chức MayFest này mình cũng làm nhanh hệ thống này, chỉ tiếc do mình chwua có đầu tư thiết bị nên tạm thời, chúng ta phải  upload ảnh thôi :sweat_smile:. Tuy đây là một bài toán không quá mới mẻ với dân AI, nhưng với các bạn mới học về AI hoặc muốn tích hợp AI vào các service của mình thì đây là series dành cho bạn. Series này mình xin phép được phép chia ra làm 3 phần:
- Phần hệ thống AI.
- Phần Backend.
- Phần Frontend. 

**Đây là series bài viết coding follow nên mình sẽ chỉ giải thích qua về phần AI. Bạn cũng không nhất thiết phải hiểu quá sâu về các kiến thức AI như mạng tích chập, FPN, ... để thực hiện project này. Chỉ cần có chút kiến thức toán ma trận đại cương thôi là đủ rồi .^_^**

Các công nghệ mà mình sẽ sử dụng bao gồm:
- Flask
- Torch
- Hnswlib
- ReactJs
- Docker
## Cài đặt môi trường
Mình đã viết sẵn file `docker-compose.yml` để mọi người sử dụng cho tiện:
```
version: '3'

networks: 
  app-networks:
    driver: bridge
services:
  react:
    container_name: FaceForRice-react
    build:
      context: frontend/
      dockerfile: Dockerfile
    volumes:
      - ./frontend:/app/frontend
    ports:
      - '3000:3000'
    networks:
      - app-networks
    tty: true
  flask:
    container_name: FaceForRice-flask
    build:
      context: backend/
      dockerfile: Dockerfile
    volumes:
      # Sync here
      - ./backend:/app/backend
    ports:
      - '3500:3500'
    networks:
      - app-networks
    tty: true
```
## Demo trước sản phẩm
![demo.png](https://images.viblo.asia/e6767646-5b08-41ee-a6c2-7722168eee0f.png)

Link project tại [github](https://github.com/tienthegainz/Face_for_Rice).

[Phần 1](https://viblo.asia/p/he-thong-phat-gao-nhan-dien-khuon-matphan-1-Qbq5Q0gwlD8).<br />
[Phần 2](https://viblo.asia/p/he-thong-phat-gao-nhan-dien-khuon-matphan-2-gDVK2JkjKLj).<br />
[Phần 3](https://viblo.asia/p/he-thong-phat-gao-nhan-dien-khuon-matphan-3-ORNZqDPbK0n).