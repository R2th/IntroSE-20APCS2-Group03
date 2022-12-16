## Giới thiệu

Có nhiều cách để tăng cường tính linh hoạt và bảo mật cho ứng dụng NodeJS của bạn. Sử dụng [reverse proxy](https://vi.wikipedia.org/wiki/Reverse_proxy) như Nginx cung cấp cho ứng dụng NodeJS của bạn khả năng cân bằng tải (load balance), cache các nội dung tĩnh và triển khai lớp bảo mật TLS. Và việc kích hoạt mã hóa HTTPS trên máy chủ của bạn đảm bảm an toàn cho các giao tiếp đến và đi từ server của bạn. Trong bài viết này, chúng ta sẽ sử dụng Docker để đóng gói. Bằng việc sử dụng Docker, chúng ta có thể tận dụng được tính mô đun và linh động, giúp cho việc phát triển được nhanh hơn nhiều lần. Chúng ta cũng sẽ sử dụng [CertBot](https://certbot.eff.org/) để tạo ra certificate của [Let's Encrypt](https://letsencrypt.org/). Chúng ta sẽ thực hiện deploy một ứng dụng NodeJS với webserver Nginx bằng cách sử dụng Docker Compose.

## Yêu cầu

Để có thể thực hiện được các nội dung trong bài viết này, chúng ta cần có:
  - Một server Ubuntu 18.04
  - Docker và Docker Compose được cài đặt trong server của bạn
  - Một tên miền đã đăng ký, tên miền này đã được trỏ tới server của bạn. Trong bài viết này, chúng ta sẽ sử dụng tên miền **example.com** để làm ví dụ
  - Kiến thức cơ bản về Docker và Docker Compose

## Step 1: Clone và chạy thử ứng dụng NodeJS

Từ server chúng ta tiến hành clone project bằng dòng lệnh sau:

```cmd
$ git clone https://github.com/do-community/nodejs-image-demo.git node_project
```

Chúng ta có thể nhìn thấy file Dockerfile có nội dung như sau:

```Dockerfile
FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]
```

File Dockerfile sẽ định nghĩa các chỉ dẫn để build một image docker. Chúng ta cùng thực hiện build và tag image bằng lệnh **docker build** và tham số **-t**, sau tham số **-t** sẽ là tên của image.

```cmd
$ docker build -t node-demo .
```

Khi quá trình build hoàn tất, chúng ta thử liệt kê toàn bộ danh sách docker image bằng lệnh 

```cmd
$ docker images
```

bạn có thể thấy image **node-demo** được hiển thị trong danh sách.

Tiếp theo chúng ta cùng thử tạo một container với lệnh **docker run**. Chúng ta cũng sẽ thêm vào lệnh này 3 tham số:

  - **-p**: lệnh này sẽ publish port của container và map nó với port của server host. Chúng ta sẽ để port này là 80, bạn cũng có thể thay đổi nó nếu muốn
  - **-d**: lệnh này sẽ chạy container dưới chế độ detach (chạy ngầm)
  - **--name**: chúng ta có thể thực hiện đặt tên cho container dựa vào lệnh này

Lệnh hoàn chỉnh như sau:

```cmd
$ docker run --name node-demo -p 80:8080 -d node-demo
```

Liệt kê danh sách các container đang chạy, chúng ta sử dụng lệnh **docker ps**, chúng ta có thể nhìn thấy container **node-demo** hiển thị trong danh sách. Bây giờ bạn thử truy cập vào **http://example.com**, chúng ta sẽ thấy trang hiển thị như bên dưới

![node-demo](https://assets.digitalocean.com/articles/docker_node_image/landing_page.png)

`Nếu bạn chưa thể thấy được kết quả như trên, có thể bạn đã làm sai bước nào đó, hãy cùng quay lại và thử lại từng bước nhé`

Bây giờ chúng ta đã kiểm tra được ứng dụng, bạn có thể tắt nó bằng cách dừng container, lại sử dụng lại lệnh **docker ps** để hiển thị danh sách container đang chạy, sau đó lấy **CONTAINER ID** của container **node-demo** và tắt nó với lệnh

```cmd
$ docker stop [CONTAINER_ID]
```

Ví dụ **CONTAINER ID** là *4133b72391da*, chúng ta có lệnh

```cmd
$ docker stop 4133b72391da
```

Chúng ta có thể xóa tất cả các container đã dừng hoặc tất cả những images không dùng và không có tag với lệnh **docker system prune** và thêm tham số **-a**

```cmd
$ docker system prune -a
```

sau khi chạy lệnh này, ấn **"y"** để xác nhận xóa. Một lưu ý nữa là lệnh này cũng xóa toàn bộ cache của quá trình build phía trên.

## Step 2: Khởi tạo và cài đặt Web Server

Chúng ta cùng bắt đầu khởi tạo configuration cho webserver nginx từ khởi tạo domain name, thư mục gốc, thông tin proxy, và một thư mục để chuyển hướng những request của CertBot đến thư mục **.well-known**. Thư mục đó chứa file để validate DNS từ domain đến server.

Đầu tiên, hãy tạo một thư mục để chưa file config

```cmd
$ mkdir nginx-conf
```

Mở file với **nano**

```cmd
$ nano nginx-conf/nginx.conf
```

và thêm những thông tin dưới đây vào file nginx.conf vừa tạo. Hãy nhớ thay thế **example.com** bằng tên miền của bạn

```conf
server {
  listen 80;
  listen [::]:80;

  root /var/www/html;
  index index.html index.htm index.nginx-debian.html;

  server_name example.com www.example.com;

  location / {
    proxy_pass http://nodejs:8080;
  }

  location ~ /.well-known/acme-challenge {
    allow all;
    root /var/www/html;
  }
}
```

File này chứa toàn bộ thông tin configuration của nginx và cho phép chúng ta chạy container nginx như là một reverse proxy, nó sẽ chuyển toàn bộ request sang cho container **nodejs**. Nó cũng cho phép chúng ta sử dụng CertBot để tạo certificate cho server.

Khi đã khởi tạo xong configuration cho nginx, chúng ta có thể sang bước tiếp theo là tạo file **docker-compose.yml**, nó cho phép chúng ta tạo các service và container CertBot

## Step 3: Tạo docker-compose.yml

File **docker-compose.yml** sẽ khởi tạo các server cho chúng ta, các service này bao gồm ứng dụng Node và webserver. Nó sẽ chỉ định các thông tin như volume, giúp cho việc chia sẻ các file SSL credentials giữa các container. File **docker-compose.yml** cũng sẽ chỉ định các thông tin về network, port, và chạy các dòng lệnh khi các container được tạo.

Chúng ta cùng khởi tạo file với lệnh sau

```cmd
$ nano docker-compose.yml
```

Đầu tiên, khởi tạo service cho ứng dụng Node

```docker-compose.yml
version: '3'

services:
  nodejs:
    build:
      context: .
      dockerfile: Dockerfile
    image: nodejs
    container_name: nodejs
    restart: unless-stopped
    networks:
      - app-network
```

Service Nodejs sẽ định nghĩa những thông tin sau:

  - **build**: trường này sẽ định nghĩa các thông tin như context và dockerfile. Trường này sẽ thực hiện xác định vị trí và load file Dockerfile để build. Trong đó context là vị trí thư mục chứa file Dockerfile cần build, trường dockerfile là xác định tên của file Dockerfile. Mặc định thì trường build sẽ luôn load file với tên là Dockerfile nhưng trong một số trường hợp bạn sẽ phải đặt tên khác cho file Dockerfile vì sẽ định nghĩa thông tin build cho một service khác, lúc này bạn sẽ cần trường dockerfile để xác định tên file đó.
  - **image** và **container_name**: 2 trường này định nghĩa tên của image và container
  - **restart**: xác định container có tự động restart hay không, bạn có thể xem thêm thông tin về trường restart tại [đây](https://docs.docker.com/compose/compose-file/#restart)
  - **networks**: định nghĩa và khởi tạo một network với tên được chỉ định. Network này có mục đích là tạo ra giao tiếp giữa các container nằm trong cùng một docker daemon. Giao tiếp này nằm hoàn toàn bên trong ứng dụng của bạn, nó sử dụng toàn bộ các cổng giữa các container trong cùng một network, trong khi không expose một cổng nào ra bên ngoài.

Tiếp tieo cùng định nghĩa webserver service trong file **docker-compose.yml**

```docker-compose.yml
...
webserver:
  image: nginx:mainline-alpine
  container_name: webserver
  restart: unless-stopped
  ports:
    - "80:80"
  volumes:
    - web-root:/var/www/html
    - ./nginx-conf:/etc/nginx/conf.d
    - certbot-etc:/etc/letsencrypt
    - certbot-var:/var/lib/letsencrypt
  depends_on:
    - nodejs
  networks:
    - app-network
```

Một vài trường giống như trong service nodejs bên trên, nhưng cũng có những trường mới

  - **image**: trường này định nghĩa image cần để tạo container, docker sẽ thực hiện pull image này từ docker hub nếu image này chưa được tải về
  - **ports**: trường này định nghĩa cổng bên trong và bên ngoài của container
  - **volumes**: trường này thực hiện share các file và folder giữa các container với nhau và giữa container với host, bạn có thể xem thêm thông tin volume tại [đây](https://docs.docker.com/compose/compose-file/#volumes)

Tiếp theo, chúng ta cùng thêm configuration cho service Certbot. Hãy nhớ thay thế email và domain của bạn vào nhé

```docker-compose.yml
...
certbot:
    image: certbot/certbot
    container_name: certbot
    volumes:
      - certbot-etc:/etc/letsencrypt
      - certbot-var:/var/lib/letsencrypt
      - web-root:/var/www/html
    depends_on:
      - webserver
    command: certonly --webroot --webroot-path=/var/www/html --email youremail@example.com --agree-tos --no-eff-email --staging -d example.com  -d www.example.com 
```

Trong đoạn trên, chúng ta có thấy một trường là **depends_on**. Chúng ta sử dụng trường này để chỉ định container certbot sẽ được chạy chỉ khi service webserver đã chạy. Chúng ta cũng có thêm một trường **command** để chỉ định dòng lệnh sẽ được chạy khi container bắt đầu xong. Nó thực hiện chạy lệnh **certonly** với các tham số sau:
  - **--webroot-path**: tham số này xác định đường dẫn đến webroot
  - **--webroot**: tham số này giúp Certbot sử dụng webroot plugin để đặt các file xác thực trong thư mục đường dẫn được định nghĩa ở tham số trên
  - **--email**: xác định email của bạn để đăng ký
  - **--agree-tos**: tham số này xác nhận bạn đã đồng ý với [ACME's Subscriber Agreement](https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf)
  - **--no-eff-email**: tham số này xác nhận rằng bạn không muốn chia sẻ email với [Electronic Frontier Foundation](https://www.eff.org/)
  - **--staging**: tham số này xác định rằng bạn muốn sử dụng **Let's Encrypt** ở môi trường staging để test các certificate
  - **-d**: tham số này chỉ định chỉ định tên miền bạn muốn áp dụng cho yêu cầu của bạn. Các bạn nhớ thay thế bằng domain của mình

Và bước cuối cùng là thêm định nghĩa cho các volume và network như sau:

```docker-compose.yml
volumes:
  certbot-etc:
  certbot-var:
  web-root:
    driver: local
    driver_opts:
      type: none
      device: /home/sammy/node_project/views/
      o: bind

networks:
  app-network:
    driver: bridge
```

hãy thay thế đường dẫn */home/sammy/node_project/views/* với đường dẫn trong host của bạn.

Khi chúng ta thêm xong các định nghĩa cho volume và network như trên, chúng ta sẽ có một file docker-compose.yml như sau:

```docker-compose.yml
version: '3'

services:
  nodejs:
    build:
      context: .
      dockerfile: Dockerfile
    image: nodejs
    container_name: nodejs
    restart: unless-stopped
    networks:
      - app-network

  webserver:
    image: nginx:mainline-alpine
    container_name: webserver
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - web-root:/var/www/html
      - ./nginx-conf:/etc/nginx/conf.d
      - certbot-etc:/etc/letsencrypt
      - certbot-var:/var/lib/letsencrypt
    depends_on:
      - nodejs
    networks:
      - app-network

  certbot:
    image: certbot/certbot
    container_name: certbot
    volumes:
      - certbot-etc:/etc/letsencrypt
      - certbot-var:/var/lib/letsencrypt
      - web-root:/var/www/html
    depends_on:
      - webserver
    command: certonly --webroot --webroot-path=/var/www/html --email sammy@example.com --agree-tos --no-eff-email --staging -d example.com  -d www.example.com 

volumes:
  certbot-etc:
  certbot-var:
  web-root:
    driver: local
    driver_opts:
      type: none
      device: /home/sammy/node_project/views/
      o: bind

networks:
  app-network:
    driver: bridge
```

Với file docker-compose như trên, chúng ta đã sẵn sàng để chạy các container và kiểm tra các request certificate. Chúng ta sẽ cùng làm những điều này ở phần sau, cảm ơn các bạn đã theo dõi.

**Bài viết tham khảo**: [How To Secure a Containerized Node.js Application with Nginx, Let's Encrypt, and Docker Compose](https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose)