Xin chào các bạn đã quay trở lại với series [Học Docker và CICD](https://viblo.asia/s/jeZ103QgKWz#comment-68Z0qDdyAlk) của mình :loudspeaker::loudspeaker:

Ở [bài trước](https://viblo.asia/p/dockerize-ung-dung-chat-realtime-voi-laravel-nginx-vuejs-laravel-echo-redis-socketio-bJzKmxgY59N) chúng ta đã "mệt bở hơi tai" để Dockerize được một ứng dụng chat realtime với Laravel, VueJS, Laravel Echo, Redis, SocketIO cùng với đó là Laravel Horizon và Schedule Task. Nếu bạn nào chưa thử "hardcore" thì mình khuyến khích các bạn nên thử xem nhé :-D :-D

Ở bài này sẽ nhẹ nhàng và dễ hiểu hơn rất nhiều, chúng ta sẽ cùng nhau tìm hiểu về network trong Docker cùng với đó là cách dùng HEALTHCHECK để "kiểm tra sức khoẻ định kì" project chạy bằng Docker nhé. :)

Bắt đầu thôi nào....

# Tiền setup
Vẫn như thường lệ các bạn cần phải cài đặt Docker và Docker-compose, nếu các bạn chưa làm thì xem ở [bài đầu tiên](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n#_setup-docker-va-docker-compose-14) của mình nhé
# Setup
Các bạn clone source code [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) (nhánh **master**), bạn nào đã clone từ các bài trước thì chạy **git pull origin master** để update source mới về nhé

Ở bài này chúng ta chỉ quan tâm tới folder **docker-network-healthcheck** nhé.

Trong folder này có gì?

Thực chất là mình lấy lại ví dụ hoàn chỉnh từ bài [Dockerize project NodeJS Mongo Redis](https://viblo.asia/p/dockerize-project-nodejs-mongodb-redis-passport-4P856NXW5Y3):
- Có các chức năng cơ bản như login, logout, đăng kí tài khoản, thêm mới sản phẩm
- Project được dockerize chia làm 3 service: **app** (service này chạy ứng dụng với NodeJS), **db** (mongoDB) và **redis** (có Redis)
- Cùng với đó là ta có mount volumes để giữ lại data nếu như container có bị lỗi, bị dừng hay restart,...

Trước khi bắt đầu các bạn test thử project xem chạy được hay chưa đã nhé. Ta chạy command sau:
```
# Build image
learning-docker/docker-node-mongo-redis:production

# Sau đó chạy project
docker-compose up

# Sau đó truy cập trình duyệt ở localhost:3000 để check nhé các bạn
```

Đạn dược đầy đủ rồi chúng ta vào bài thôi nào

**Note cho bạn nào đang dùng Windows**: các bạn xem lại phần chú ý lúc mount volume cho MongoDB mình đã nói ở bài [Dockerize ứng dụng NodeJS, Mongo](https://viblo.asia/p/dockerize-project-nodejs-mongodb-redis-passport-4P856NXW5Y3#_chay-project-11) rồi nhé
# Trước khi bắt đầu
Vì vấn đề về Network và HEALTHCHECK trong Docker có rất nhiều cách ứng dụng và tiếp cận khác nhau tuỳ vào project và cách làm của mỗi người, bài này mình sẽ chia sẻ dựa trên những thứ mình làm và áp dụng. 

Sau bài này các bạn có thể tìm thêm ở trên google nhé ;)
# Network trong Docker
Một trong những lí do các Docker containers và services lại mạnh mẽ như vậy là do chúng có thể giao tiếp được với nhau, kết nối với nhau, và thậm chí là ta có thể kết nối 1 container Docker với một service nào đó ở môi trường bên ngoài (không phải Docker) và tạo nên 1 ứng dụng mạnh mẽ với nhiều thành phần, mỗi thành phần được tách biệt, dễ dàng thêm mới hoặc xoá bỏ 1 thành phần nào đó, .... Một Docker container giao tiêp với 1 container mà không cần quan tâm container kia có phải được deploy (chạy) ở trong Docker hay không. 

Để có được điều này thì Docker cung cấp cho chúng ta một hệ thống network giữa các container rất là mạnh mẽ và chi tiết tới tận "chân răng" mà nhiều khi ta không cần phải để ý tới nó trong quá trình phát triển và vận hành phần mềm của chúng ta (ví dụ như từ đầu series đến giờ vậy).

Nhưng nếu ta biết vận dụng sức mạnh này của Docker mang lại ta có thể giúp ứng dụng của ta cấu trúc tốt hơn, rõ ràng hơn về sự quan hệ giữa các thành phần trong ứng dụng, và quan trọng là cả bảo mật tốt hơn nữa.

## Các container giao tiếp với nhau trong Docker thế nào
Các container trong Docker muốn giao tiếp với nhau thì chúng cần được triển khai (deploy) trong cùng 1 network.

Ví dụ như ở trong Demo bài này, ta có 3 service **app**, **db**, **redis** mặc định chúng được chạy trên cùng 1 network, và các service như **db** hay **redis** đã EXPOSE các port như **27017** và **6379**, nhờ thế mà service **app** có thể gọi tới được.

> Note: 1 container/service EXPOSE 1 port nào đó với mục đích các container khác có thể gọi tới nó tại port này, các bạn cần phần biệt EXPOSE port và mapping port nhé

Ủa mà từ nãy đến giờ toàn nói network network, vẫn chưa hiểu nó là cái gì lắm, mà cũng chưa từng thấy nó ở đâu, cho xem cái ảnh demo coi.  :-D :-D

Ở demo project bài này (folder **docker-network-healthcheck**) các bạn chạy command sau để khởi động project:
```
docker-compose up -d
```

Sau đó ta quan sát ở terminal:

![Docker network](https://images.viblo.asia/9bd16a57-b6e3-40cd-b68c-56b2d2e0c816.png)

Các bạn có thể thấy là, tại thời điểm chúng ta khởi động project, đầu tiên Docker sẽ tạo ra cho chúng ta 1 Network (mạng) với tên  mặc định do Docker chọn. Sau đó Docker sẽ khởi động các service tạo ra các container tương ứng, và cuối cùng (không có ở terminal) là cho các container này join vào network kia.

Nhờ thế mà các container sau này có thể giao tiếp với nhau. Khá đơn giản dễ hiểu phải không nào ;)
## Lí do ta nên cấu hình Network cho Docker
Ở đây mình sẽ không nói dài dòng thêm về khái niệm vì có thể các bạn sẽ ngủ mất trong khi đọc blog của mình mất :-D

MÌnh sẽ nói ra một vài lí do ta nên cấu hình network cho các Docker container của chúng ta:
- Làm rõ sự quan hệ giữa các service/container, nhìn vào network ta có thể thấy được 1 service hoạt động cần có sự tham gia của những service nào. Ví dụ như ứng dụng Demo trong bài này, service **db** có thể hoạt động được tách biệt hoàn toàn so với **redis**, nhưng nhìn vào file **docker-compose** ta lại chưa thấy được điều đó
- Điều thứ 2 và quan trọng hơn theo mình đó là dùng network sẽ giúp ứng dụng của ta bảo mật hơn, 1 service chỉ có thể giao tiếp với 1 số service nhất định (do ta định nghĩa), ví dụ như ở Demo bài này, khi hack chiếm được service **redis** thì hacker cũng có thể truy cập tới service **db** và thực hiện tấn công tiếp service **db**

Trời, nghe hacker kinh khủng thế, ứng dụng của mình có vài chục, vài trăm hay thậm chí cùng lắm là vài nghìn user/lượt truy cập, lợi nhuận thì làm gì có, có gì hay ho đâu làm gì có anh hacker nào rảnh rỗi tấn công thì được cái gì? :-D :-D

Về việc này theo mình bất kì ứng dụng nào dù nhỏ dù to chúng ta cũng nên quan tâm tới vấn đề bảo mật, càng nhiều càng tốt. Từ những ứng dụng nhỏ ví dụ nhỏ sẽ có các vấn đề làm ta phải suy nghĩ và khi làm ở project thật ta sẽ áp dụng vào. 

> Mọi thói quen dù nhỏ nhưng sẽ đóng góp vào thành công lớn sau này ;)

Đồng thời việc cấu hình network sẽ không khó lắm như các bạn nghĩ đâu. Chúng ta cùng bắt tay vào làm nhé 
## Cấu hình
Trước khi cấu hình Network cho các container Docker, chúng ta sẽ phân tích 1 chút sự phụ thuộc của chúng lẫn nhau nhé:
- Trong bài này ta có 3 service **app**, **db**, và **redis**
- Service **app** cần có 2 service **db** và **redis** để có thể hoạt động được (1 cho lưu trữ data, 1 cho lưu trữ session của user)
- Service **db** và **redis** có thể hoạt động độc lập không liên quan gì tới nhau, nên chúng không cần giao tiếp với nhau.

Từ đây để rõ ràng và "scope" (giới hạn) mức độ truy cập giữa các container, ta sẽ tạo ra 2 network:
- **db-network**: dùng cho service **app** và service **db** nhằm mục đích trao đổi dữ liệu trong database
- **redis-network**: dùng cho service **app** và **redis** trong việc lưu session của user

Các bạn sửa lại file **docker-compose.yml** với nội dung như sau:
```yaml
version: "3.4"

services:
  app:
    image: learning-docker/docker-node-mongo-redis:production
    volumes:
      - ./public/images:/app/public/images
    environment:
      - DB_HOST=${DB_HOST}
      - DB_NAME=${DB_NAME}
      - REDIS_HOST=${REDIS_HOST}
      - REDIS_PORT=${REDIS_PORT}
      - PORT=${PORT}
    ports:
      - "${PORT}:${PORT}"
    restart: unless-stopped
    depends_on:
      - redis
      - db
    networks:
      - db-network
      - redis-network
  db:
    image: mongo:4.4
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
    networks:
      - db-network
  
  redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    restart: unless-stopped
      - redis-network
    networks:
      - redis-network


#Docker Networks
networks:
  db-network:
    driver: bridge
  redis-network:
    driver: bridge
```
Nội dung các bạn xem là có thể hiểu ngay khá là rõ ràng như chúng ta đã phân tích đúng không nào ;)

Chú ý 1 điều: **driver** là gì?

**driver** của network trong Docker bạn có thể hiểu nó như một **kiểu** network. Docker cung cấp cho chúng ta 1 số **driver** như:
- **bridge**: driver mặc định, nếu như ta không nói gì tới driver thì Docker sẽ chọn kiểu này. Driver này thường dùng khi ứng dụng của chúng ta cấu thành từ các container riêng biệt và chúng cần phải giao tiếp với nhau (chuẩn bài này rồi, và hầu hết các ứng dụng sau này cũng vậy ;))
- Cùng với đó là các driver như **host**, **overlay**, **macvlan** hay **none** (tắt toàn bộ các kết nối). Các driver này mình ít khi dùng và mình cũng thấy mọi người ít khi dùng vì chúng hầu như dùng cho Docker Swarm, nhưng thực tế mọi người có vẻ chuộng Kubernetes hơn là Docker Swarm :-D :-D. Nếu các bạn muốn tìm hiểu thêm thì có thể search google nhé

## Giây phút của sự thật
Cấu hình ngon rồi giờ chúng ta cùng chạy lại project xem như thế nào nhé. Các bạn chạy command sau:
```
docker-compose down

docker-compose up -d
```
Sau đó ta quan sát ở terminal

![Docker network](https://images.viblo.asia/525aaf14-c689-455b-aa11-4bd3c08cc517.png)

Các bạn thấy là tại thời điểm ta khởi động project, Docker sẽ tạo ra 2 network với các tên tương ứng như ta đã định nghĩa, sau đó khởi tạo các container và cho chúng join vào các network này.

Ô, từ từ, sau tên network lại dài loằng ngoằng thế kia????

Thì mặc định Docker sẽ thêm tiền tố là **tên folder chúng ta đang chạy** vào tên của network, nhằm mục đích tránh bị trùng lặp. Nếu các bạn muốn tên chính xác của network thì ta sửa lại chút như sau:
```yaml
networks:
  db-network:
    name: db_network
    driver: bridge
  redis-network:
    name: redis_network
    driver: bridge
```

Nhưng lời khuyên của mình là nên để mặc định vì có thể tương lai các bạn có nhiều project và nếu để tên chính xác thì có thể xảy ra sự trùng lặp và gặp lỗi.

## Test
OK vậy giờ chạy xong rồi, có thực sự là các service như **db** hay **redis** được chạy ở các network khác nhau và không thể giao tiếp được với nhau?

Đầu tiên ta cùng "chui" vào container **app** và thử connect đến 2 service **db** và **redis** xem nhé. Các bạn chạy command sau:
```
docker-compose exec app sh

#Tiếp theo ta cài CURL để tạo request và nhìn cho trực quan nhé
apk add curl
```
Sau đó ta sẽ thử connect đến service **db** xem sao nhé. Các bạn chạy command sau:
```
curl db:27017
```
Và các bạn sẽ thấy ở terminal in ra như sau:

![Docker alpine](https://images.viblo.asia/aae155dd-4040-4686-b795-dbd036757537.png)

Vậy là ta đã kết nối tới service **db** thành công, tiếp theo ta sẽ thử tạo request tới service **redis** nhé. Các bạn chạy command tương tự:
```
curl redis:6379
```
Và ta sẽ thấy ở terminal in ra như sau:

![Docker redis](https://images.viblo.asia/20a4abef-ee3e-424b-a8d1-a83ba3167fad.png)

Response từ redis trả về là không cho phép kết nối trực tiếp bằng cách tạo HTTP request. Các bạn không cần quan tâm tới điều này nhé, cái chính là ta đã kết nối được tới **redis**

Tiếp theo các bạn gõ **exit** để thoát ra khỏi container **app** nhé.

Sau đó ta cùng vào service **redis** để xem có kết nối được tới service **db** hay không nhé, các bạn chạy lần lượt các command sau:
```
docker-compose exec redis sh

apk add curl

curl db:27017
```

Và ta thấy in ra ở terminal

![Docker redis](https://images.viblo.asia/31aa7ea6-80d2-4e45-bcec-37ed5367b181.png)

Lỗi in ra là : không thể tìm thấy host tên là **db** vì 2 service này không ở chung cùng 1 network

Và điều tương tự nếu các bạn "chui" vào **db** và gọi tới **redis**:
```
# Ở đây ta dùng apt bởi vì image mongo này được build trên Ubuntu nhé
apt update
apt install curl

curl redis:6379
```
Phần này các bạn tự làm và xem kết quả nhé ;)

# Docker HEALTHCHECK
Trong quá trình vận hành project, điều ta mong muốn là có thể dễ dàng kiểm tra được xem là các container của chúng ta có vận hành đúng đắn hay không, có lỗi xảy ra hay không, hiển thị trạng thái của các container trực quan hay không.

Docker có hỗ trợ chúng ta **kiểm tra** sức khoẻ của các container định kì với **HEALTHCHECK**, giúp ta có thể quản lý project dễ dàng hơn, nếu có gì "không ổn" ở container nào thì ta cũng dễ dàng sửa hơn.

Chúng ta có thể định nghĩa ra 1 hoặc 1 loạt các điều kiện chúng ta cần kiểm tra định kì các container, và Docker sẽ tự động thực hiện các kiểm tra đó đều đặn và sau này ta có thể truy vấn về tình trạng của các container để biết là "anh có khoẻ hay không" :D :D.

Bắt tay vào làm nhé..

Ở file **docker-compose.yml** các bạn sửa lại như sau:
```yaml
version: "3.4"

services:
  app:
    image: learning-docker/docker-node-mongo-redis:production
    volumes:
      - ./public/images:/app/public/images
    environment: # phần này ta định nghĩa ở file .env nhé
      - DB_HOST=${DB_HOST}
      - DB_NAME=${DB_NAME}
      - REDIS_HOST=${REDIS_HOST}
      - REDIS_PORT=${REDIS_PORT}
      - PORT=${PORT}
    ports:
      - "${PORT}:${PORT}" # phần này ta định nghĩa ở file .env nhé
    restart: unless-stopped
    depends_on:
      - redis
      - db
    networks:
      - db-network
      - redis-network
    healthcheck:
      test: wget --quiet --tries=1 --spider http://localhost:${PORT} || exit 1z
      interval: 30s
      timeout: 10s
      retries: 5
  db:
    image: mongo:4.4
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
    networks:
      - db-network
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongo db:27017/speech-api --quiet
      interval: 30s
      timeout: 10s
      retries: 5
  
  redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    restart: unless-stopped
    networks:
      - redis-network
    healthcheck:
      test: ["CMD", "redis-cli","ping"]
      interval: 30s
      timeout: 10s
      retries: 5

#Docker Networks
networks:
  db-network:
    driver: bridge
  redis-network:
    driver: bridge
```
Giải thích 

Ở service **app** ta định nghĩa **HEALTHCHECK** với nội dung như sau:
- Ta dùng command **wget --quiet --tries=1 --spider http://localhost: ${PORT} || exit 1z** (ở đây ta dùng localhost vì command này được chạy **bên trong** container nhé)
- Mình dùng luôn **wget** được cung cấp sẵn, command trên sẽ tạo 1 request đến app của chúng ta nếu status trả về là 200 là ok coi như "anh khoẻ" :D, nếu status trả về khác 200 thì coi như không khoẻ :). Các bạn có thể dùng **curl** cũng được nhé
- Ta có **interval** là 30 giây, tức là command trên sẽ được chạy lần đầu là 30 giây sau khi container được khởi tạo (nhằm mục đích cho container của ta sẵn sàng cho việc "kiểm tra sức khoẻ", chứ nhiều lúc test ngay thì kết qủa có thể không đúng ;)). Sau đó cứ mỗi 30 giây tiếp theo ta lại "kiểm tra sức khoẻ" tiếp
- Ta có **timeout** là 10 giây, ý là nếu việc kiểm tra sức khoẻ kéo dài quá 10 giây, thì coi như là "anh không còn khoẻ nữa" :-D. Điều này có thể xảy ra khi chúng ta tạo request tới 1 URL nào đó cần nhiều thời gian phản hồi. Nên các bạn cần chọn 1 con số thích hợp nhé
- Cuối cùng là ta có **retries** (thử lại) 5 lần: nếu như 1 container bị test failed (không khoẻ), thì Docker sẽ tiếp tục test thêm liên tục 5 lần để xem có chắc chắn là không khoẻ không, 

Tương tự ở service **db** và **redis** mình cũng check như thế nhé, chỉ khác phần command **test** thôi (các bạn muốn tìm hiểu về các command này thì search ở google nhé)

Sau đó ta khởi động lại project bằng command sau:
```
docker-compose down

docker-compose up -d
```
Và từ đây Docker sẽ tự động định kì "kiểm tra sức khoẻ" các container cho chúng ta. 

Để kiểm tra trạng thái sức khoẻ của các container các bạn chạy command sau:
```
docker-compose ps
```

Và ta sẽ thấy ở terminal in ra như sau:

![Docker healthcheck](https://images.viblo.asia/1645856e-6a3a-4eb4-a860-34c3be086fc8.png)

Như các bạn có thể thấy là các container của mình "đều khoẻ" :-D :-D

> Note: Nếu chạy **docker-compose ps** không thấy hiện thông tin sức khoẻ thì các bạn chạy **docker container ls** là được nhé.

> Note: Nếu các bạn kiểm tra sức khoẻ ngay lập tức sau khi khởi động container thì có thể sẽ thấy trạng thái là **starting**, vì ta định nghĩa là 30 giây sau khi khởi động mới kiểm tra lần đầu tiên

> Nếu trong trường hợp 1 container nào đó không khoẻ thì trạng thái in ra sẽ là **unhealthy** nhé

> Chúng ta có thể cấu hình HEALTHCHECK trong Dockerfile cũng được nhé, nhưng vì cấu hình trong Dockerfile sẽ khó thay đổi hơn là ta cấu hình trong **docker-compose**

> **Note quan trọng**: việc dùng HEALTHCHECK không đảm bảo container thực sự "khoẻ" dù trạng thái có là **healthy**, vì có thể command test của chúng ta không bao được hết những trường hợp lỗi, nhưng nếu trạng thái là **unhealthy** thì ta có thể biết ngay được là có thành phần nào đó đang "không khoẻ". Việc thiết lập command test thế nào là tuỳ ý chúng ta nhé, do đó các bạn có thể thiết lập 1 command test "tinh vi" hơn :-D (Gợi ý: các bạn có thể dùng 1 file shell script với hàng loạt test trong đó nếu muốn có 1 test tổng thể hơn nhé ;))

# Kết bài
Ở bài này mình đã giới thiệu với các bạn 2 công cụ mình thấy rất hữu ích và project nào mình cùng dùng. Một thứ để scope (giới hạn) phạm vi của các container trong việc giao tiếp với nhau, 1 thứ để kiểm tra sức khoẻ các container có chạy ổn hay không. Từ đó tìm hiểu thêm và áp dụng vào project riêng của các bạn nhé.

Cám ơn các bạn đã theo dõi, và nếu có thắc mắc gì thì các bạn cứ để lại comment cho mình nhé

Toàn bộ source code bài này mình để [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) (nhánh **complete-tutorial** nhé)

Hẹn gặp các bạn vào những bài sau