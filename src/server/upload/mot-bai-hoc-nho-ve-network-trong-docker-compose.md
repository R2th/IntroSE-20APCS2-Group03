*Bài viết nhằm mục đích note lại kinh nghiệm trải qua để sau này có gặp phải còn nhớ mà làm.*

*Tóm tắt issue, mình có 1 con server, trên đó chạy vài container. Một ngày đẹp trời lên đó deploy, restart lại docker qua lệnh `docker-compose down && docker-compose up -d` và thế là bùm, thấy treo màn hình terminal không hiểu vì sao. Thử mở terminal mới và ssh lại thì bị báo timeout, không thể ssh được nữa.*
### 1. Điều tra nguyên nhân
Ssh còn không được nên nhờ ngay đội infa check thôi, bên đó báo do container mình vừa restart nó tạo ra một ip trùng với ip máy mình nên không ssh vào được.

Tìm hiểu sâu xa nguyên nhân hơn thì do đoạn lệnh `docker-compose down` là nó xóa cả container và network sử dụng bởi container đó, sau đó thì khi mình up lại thì vô tình nó tạo ra một ip cho container đó trùng với đúng cái của mình luôn.

### 2. Khắc phục
Theo những gì research được thì mình tạo ra một mạng và setting Subnet cho nó. Sau đó mình có chỉnh lại config cho nó như sau:
```
networks:
  default:
    ipam:
      config:
        - subnet: 172.177.0.0/16
```
Nhưng mình có thử restart lại container qua lệnh `docker-compose stop && docker-compose up -d` (sợ down lắm rồi nên mới dùng stop) thì lại thấy subnet của mạng sử dụng bởi container đó không giống setting. Lại thử xóa network bằng tay rồi start lại docker thì mới được. Lúc này mới ngộ ra là dùng stop rồi up lại thì nó không update config mới của network, nó vẫn dùng network cũ (network này tạo ra sau khi mình ssh vào lại đc và start lại ngay trước khi tìm hiểu root cause)
Vậy là fix xong cái issue củ chuối này, ngu đúng là mệt thiệt

### 3. Tổng kết bài học
1. `docker-compose down` xóa cả container và network. Nó còn có 1 số tùy chọn xóa cả images, volumes...
2. Không restart network của container qua lệnh `stop` rồi `up`
3. Nên chỉ định rõ network của một docker, tránh để default
4. (Bài học quan trọng nhất) Tạo riêng một network sẵn cho toàn bộ container dự định sẽ có thể dùng chung mạng và config cho chúng chui vào đó, tránh issue như vừa rồi.
5. Nếu không config gì về network trên mỗi file docker-compose thì khi start nó sẽ tạo ra một network riêng biệt