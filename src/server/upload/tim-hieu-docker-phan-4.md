![](https://images.viblo.asia/bd5da56f-5a53-4911-ae6b-d1a719f2cce2.png)

Một câu hỏi đặt ra là chúng ta làm thế nào để sử dụng nhiều Docker image và container.

Giả sử chúng ta có một container web server cần kết nối với container database. Với mỗi container sẽ giữ chức năng riêng biệt của nó và chúng sẽ làm việc riêng biệt với nhau. Vậy làm cách nào để chúng ta có thể cho chúng kết nối và làm việc với nhau. Có 2 từ khóa để giải quyết vấn đề này `Legacy Linking` và `Bridge Network`.

![](https://images.viblo.asia/eb462e33-d3ac-4ce6-8145-06eb79955a5d.png)

# Linking Containers by Name
Đây là một cách khá đơn giản, trong môi trường phát triển chúng ta có thể dễ dãng để thiết lập cũng như sử dụng. Chúng ta chỉ cần đặt cho container một cái tên là sau đó các container khác có thể link tới nó bằng cách sử dụng name đó. Sau đây mình sẽ làm một số các bước để cho các bạn có thể hiểu rõ hơn nhé.

* Bước đầu tiên chúng ta run container với một cái tên nào đó.
* Kết nối đến một running container

Rồi ok, đầu tiên để định nghĩa một cái tên cho container thì chúng ta sẽ sử dụng câu lệnh sau

`docker run -d --name my-mongodb mongo`

tham số `--name` ở đây có nghĩa là định nghĩa ra một cái tên cho container. Nó cho phép chúng ta có thể chạy container với một tên tùy ý chúng ta đặt. Ở đây chúng ta đã đặt custome name cho `mongo` là `my-mongodb`.

Bước tiếp theo chúng ta muốn link `node` container tới `mongo` container thì chúng ta sẽ sử dụng câu lệnh sau:

`docker run -d -p 3000:3000 --link my-mongodb:mongo node`

* `--link`: Link tới container được đặt tên
*  `mongo`: alias container được link tới
*  `my-mongodb`: tên của container được link, là custome name cái mà muốn ám chỉ trỏ tới `postgres` container

# Container network
  ![](https://images.viblo.asia/7a47ea8d-f0ce-4f54-bb51-030a9bb520ca.png)
  
 Đầu tiên chúng ta cần biết Docker Host nó là cái gì. Thì các bạn cứ tưởng tượng nó như là một Linux host, nó có thể là virtualbox, môi trường local của mình. Bất cứ ở đâu thì chúng ta có nhưng container cần được giao tiếp kết nối với nhau để làm việc chung với nhau. Để làm được điều đó, chúng ta có thể sử dụng bằng cách sử dụng `naming` như cách trên mình vừa giới thiệu. Nhưng có một vấn đề ở đây là nếu bất cứ ai biết tên của container đó đều có thể tự động lấy nó. Và một điều nữa là một khi bạn chạy một loạt các container đang running, bạn muốn cô lập các container đó, vì vậy bạn cần nhóm chúng vào trong một nhóm. Đó chính là lý do tại sao chúng ta dùng `bridge` network. Điều này là rất tốt bởi vì chúng ta có thể nhóm những container vào những isolated network khác nhau và chỉ ra những container nào là đang trong chung một network. Và để tạo ra container network cũng khá là đơn giản.
  
*   Đầu tiên chúng ta sẽ tạo ra một custome bridge network
*   Sau đó run container trong network vừa tạo

Trước hết thì `bridge network` là cái gì ? Như các bạn đã biết đấy nó là một `default network` mà sau khi bạn cài đặt Docker xong, nó sẽ được tự động tạo ra. Chúng ta có thể xem bằng câu lệnh `docker network ls`.  Khi bạn run một container, thì có thể sử dụng flag: --network để chỉ định loại network mà muốn container chạy trên đó khi run.

`bridge` network được hiện diện trên tất cả các Docker hosts nếu như chúng ta không chỉ ra container sẽ chạy trên network nào. Chúng ta có thể xem thông tin bằng câu lệnh `docker network inspect`

![](https://images.viblo.asia/10bfdec7-5da3-4eea-bab9-db75bde29b2a.png)


Rồi ok, đầu tiên chúng ta sẽ tạo ra một custome container network bằng câu lệnh như sau:

`docker network create --drive bridge isolated_network`

Trong đó:

*  `create` : tạo một custome network
*  `bridge`: Sử dụng nền tảng là bridge network để build lên một custome network mới.
*  `isolated_network`: tên của network mới tạo ra. 

Vậy mỗi container mà chúng ta muốn link up thì chúng ta sẽ phải có một cái tên

`docker run -d --net=isolated_network --name mongodb mongo`

Trong trường hợp này đó là `mongodb`
  
  
# Demo Container Network in Action
Mình sẽ làm một ví dụ nho nhỏ sau, kết nối web server với database 

Đầu tiên chúng ta tạo một network với tên là `isolated_network`

`docker network create --driver bridge isolated_network`

Chúng ta có thể kiểm tra xem network được tạo thành bằng cách

`docker network ls`

![](https://images.viblo.asia/58c11815-2750-4f42-898c-97e3d02da28c.png)

`docker network inspect `

![](https://images.viblo.asia/e8c3f718-d4e1-49a6-bcf4-d13f08ae08a8.png)

Bạn có thể thấy thấy chúng ta chưa có bất cứ container nào trong network này.

Tiếp theo chúng ta sẽ add `mongodb` vào network

`docker run -d --net=isolated_network --name mongodb mongo`

![](https://images.viblo.asia/32ef0801-3559-44cb-874e-64db1f6fe9d7.png)
Tiếp theo thêm `node express` vào network

`docker run -d --net=isolated_network --name nodeapp -p 3000:3000 node`

Bây giờ 2 container trên đã có thể giao tiếp với nhau. 

Bây giờ giả dụ mà chúng ta muốn xóa network này đi thì chúng ta sẽ làm thế nào. Chúng ta sẽ phải xóa hết các container trong network này đi nhé rồi mới xóa được network này. Các bạn hãy làm theo các câu lệnh sau đây nhé

`docker ps -a -q`

`docker stop ${docker ps -a -q}`

`docker rm ${docker ps -a -q}`

`docker rm isolated_network`

# Summary
Qua một số các mục trên mình đã đưa ra thêm cho bạn các thông tin về `Legacy Linking` và `Bridge Network`. Cảm ơn các bạn đã đọc bài chia sẻ của mình
# Reference
https://docs.docker.com/network/