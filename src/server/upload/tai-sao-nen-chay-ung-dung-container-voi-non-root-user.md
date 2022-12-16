Hello các bạn lại là mình đây (dù chả ai biết mình ở đây là ai :rofl::rofl::rofl:).

Tiếp tục series [Học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz), hôm nay chúng ta sẽ tìm hiểu lí do tại sao nên chạy ứng dụng Container với non-root User ở production và ví dụ cụ thể cách thực hiện như thế nào nhé ;)


# Mở đầu câu chuyện
Như các bạn thường thấy, các image Docker được build sẵn mà ta thường dùng thì đều chạy với user `root`. Điều này dẫn tới việc user chạy container có toàn quyền thao tác với bất kì nội dung nào trong container: cài system package (`apt install...`), sửa cấu hình của các process chạy trong container hay thậm chí là tác động/xoá bỏ các process trong container đó.

Một process chạy trong container bằng `root` user thực tế là process đó đang chạy với `root` user trên môi trường gốc của nó.

Ồ thật á? Chứng minh hộ tôi cái? :thinking::thinking:

Cách kiểm chứng khá đơn giản, ở môi trường gốc các bạn chỉ cần chạy command `top` để thống kê mức độ sử dụng của các process trong hệ thống. Ví dụ như hình dưới là thông tin 1 server của mình, tất cả project chạy ở server này đều dùng Docker, môi trường gốc mình chả có gì ngoài cài Docker và Docker-compose :):
```
top

---------
130955 systemd+  20   0 5790584 4.613g   1208 D  35.2 29.5   0:12.53 redis-server                                             
 11259 root      20   0  204104 128104   2772 S  17.3  0.8   3542:43 cadvisor                                                 
 11512 nobody    20   0 3745460 140816  16928 S   1.7  0.9 222:57.28 prometheus                                               
  1562 root      20   0 3022560 122828   7528 S   1.0  0.7   5818:14 dockerd                                                  
  1493 root      20   0 2640712  55964  19424 S   0.7  0.3   3703:03 containerd                                               
 38957 root      20   0   11788   5704   3272 S   0.7  0.0  57:14.81 containerd-shim                                          
     8 root      20   0       0      0      0 I   0.3  0.0   1046:38 rcu_sched                                                
  6382 root      20   0  285180  37596   6140 S   0.3  0.2 369:46.06 node                                                     
  7794 omi       20   0 1147036  93888   8992 S   0.3  0.6   1636:06 mongod                                                   
 10512 root      20   0  301092  46028   8276 S   0.3  0.3 377:29.87 node /root/.pm2  
 ....
 ....
```

Ở trên các bạn có thể thấy các container như `cadvisor`, `nodejs` và một số process khác đều đang được chạy với user `root` bởi vì user bên trong chạy container cũng là `root`

Vậy điều này có ảnh hưởng gì?

Như mình đã trình bày ở trên, user `root` có toàn quyền làm bất kì thứ gì trong container. Bất kì ai có quyền truy cập vào container đều có thể chạy các process độc hại mà ta không mong muốn ở trong đó.  Từ đó làm app của chúng ta "yếu hơn"

Khi dev ở Local dùng user `root` thì nom có vẻ tiện vì ta có thể dễ dàng build và chạy image, mount volume,... mà không sợ bị thiếu quyền. Nhưng có thể làm hệ thống của ta thiếu bảo mật khi ta chuyển tới Production. Thậm chí kẻ xấu có thể lợi dụng để thử vọc vạch và có truy cập từ container ngược lại ra môi trường gốc.
 
Nếu các bạn đã từng deploy và bảo trì ứng dụng theo dạng truyền thống ngày xưa, cài trực tiếp các thư viện, các package (PHP, MySQL, NodeJS) và chạy process trực tiếp vào hệ điều hành gốc thì ta luôn biết rằng không nên chạy với user `root` hay cấp cho folder ứng dụng với quyền `777`. Mà mỗi project, mỗi folder/resources của project đều nên được giới hạn bởi user với các quyền vừa đủ để chạy.

Dào ôiiii, có ai rảnh đi hack hủng gì đâu mà tốn thời gian mất công làm chi? :smirk::smirk:

Thì mình thấy Security luôn là `critical problem` mà bất kì hệ thống/ứng dụng/thư viện nào cũng sẽ đặt lên hàng đầu, tính năng có thể không hữu ích, UI có thể xấu, Performance có thể chưa cao nhưng chỉ cần 1 lần bị mang tiếng bị lỗi security thì sẽ mất đi sự tin tưởng từ phía người dùng.

Ở bài này ta cùng tìm hiểu cách chạy ứng dụng Docker với non-root user nhé.
# Chuẩn bị
Đầu tiên các bạn clone source code của mình [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) (branch `master` nhé)

Ở bài này chúng ta sẽ chỉ quan tâm tới folder `docker-non-root` nhé. Mình có sẽ setup sẵn cho các bạn một ứng dụng NodeJS có thể chạy được với MongoDB làm database và Redis để lưu session user đăng nhập, và mình cũng đã Dockerize nó luôn :call_me_hand:

> Nếu các bạn có để ý thì thấy mình hay chọn các project Javascript để làm ví dụ với Docker vì mình thấy dockerize chúng khá đơn giản, người đọc cũng dễ hiểu hơn. 

Ở bài này mình hướng tới việc chạy ứng dụng container ở production với non-root user và xử lý các lỗi liên quan tới permission. Do đó chúng ta sẽ thực hành trên môi trường gốc là Linux (Ubuntu), lí do vì sao thì ở bên dưới mình sẽ giải thích kĩ nhé. Bạn nào có Mac/Win vẫn làm theo được bình thường nhé ;)

À trước khi bắt đầu các bạn chạy cho mình command sau để check xem ở môi trường gốc bạn đang là user nào nhé:
```
whoami
```
Như hình dưới thì của mình là `james`:

![](https://images.viblo.asia/2fed717b-565f-4042-a5ba-4d4320653661.png)

Các bạn nhớ lấy giá trị này để lát nữa bên dưới chúng ta tham chiếu tới nhé ;). Bắt đầu thôi nàoooooooooo :rocket::rocket:
# Bắt đầu
## Setup
Đầu tiên chúng ta tiến hành build image và chạy thử xem mọi thứ đã ổn chưa nhé:
```
DOCKER_BUILDKIT=1 docker build -t learning-docker:non-root .
```
Ở trên mình có truyền vào biến môi trường `DOCKER_BUILDKIT=1` để nói với Docker dùng BuildKit để build cho nhanh. Mình đã nói ở bài [tối ưu Docker image](https://viblo.asia/p/toi-uu-docker-image-Eb85o9D4Z2G#_build-image-voi-buildkit-8) rồi nhé :)

Sau đó chúng ta tiến hành chạy project lên nhé:
```
docker-compose up -d
```
Sau đó mở thử trình duyệt ở `localhost:3000` nhé:

![](https://images.viblo.asia/d88620f8-4d5b-4e59-815a-2fb965d0fc60.png)

Các bạn thử đăng kí tài khoản, login và thêm thử vài sản phẩm để đảm bảo mọi thứ hoạt động trơn tru nhé.

Sau đó ta thử check xem các file trong container thuộc sở hữu của user nào (user nào nắm quyền) nhé:
```
docker-compose exec app ls -l
```
Sẽ thấy in ra như sau:

![](https://images.viblo.asia/66178e1f-3272-4a47-bc77-2059c595923f.png)


Ở trên như ta thấy là vì container của chúng ta được chạy với user `root` nên toàn bộ các file trong container đều thuộc sở hữu của user `root` và group là `root` (trong hình, tên user đặt trước, tên group ở sau)

Tiếp theo vẫn ở ngoài ngoài môi trường gốc, chúng ta vào folder `public/images` xem nhé:
```
ls -l
```
Ta sẽ thấy như sau:

![](https://images.viblo.asia/4252d0c7-2a88-4edd-9a56-b175bccd9675.png)

Như các bạn thấy, mặc dù chạy ở trong container, nhưng vì container chạy bằng `root`, nên tất cả các file trong đó đều thuộc sở hữu của `root`, khi ta upload ảnh, ảnh này được mount `volume` ra ngoài và ở môi trường ngoài ta cũng thấy thuộc sở hữu của `root` luôn, mặc dù môi trường ngoài user của mình tên là `james`.

**Note quan trọng** :information_source::information_source::information_source: : nếu bạn nào đang dùng MacOS, thì ta vào xem folder `public/images`ở môi trường ngoài sẽ thấy các ảnh upload lên tự động có quyền bằng với user hiện tại luôn:

![](https://images.viblo.asia/49d36c73-17a0-4a25-ab98-63b825678c65.png)

Đó là lí do vì sao trước kia ở bài [Dockerize ứng dụng Laravel](https://viblo.asia/p/dockerize-ung-dung-laravel-vyDZOao75wj) ban đầu mình có để `USER www-data` ở Dockerfile và chạy trên MacOS vẫn bình thường không lỗi lầm, nhưng vì nhiều bạn dùng Ubuntu thắc mắc bị lỗi Permision Denied mà mình không hiểu tại sao nên mình đành xoá đi. Mình có search google rất nhiều ae dùng Mac cũng ngơ ngác như mình luôn :rofl::rofl:. Và việc chạy với user non-root trên Mac cũng sẽ chẳng gặp phải những vấn đề mình trình bày trong bài này.

Do vậy, cùng với việc thực tế khi deploy thật ở production thì 96,69% chúng ta đều dùng server Linux (Ubuntu) vậy nên ở bài này chúng ta thống nhất với nhau là làm việc trên môi trường gốc là Linux(Ubuntu) nhé. Các bạn dùng MacOS/Win vẫn có thể xem cách mình setup ở bài này từ đó áp dụng vào project riêng của các bạn nhé.

Chúng ta cùng bắt đầu sửa lại image để có thể chạy được với non-root user nhé. Trước đó ta `down` app đi đã nhé:
```
docker-compose down
```
## Cấu hình Dockerfile
Đầu tiên các bạn sửa lại Dockerfile với nội dung như sau nhé:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .

# Create a group and user
RUN addgroup -g 1410 appgroup

RUN adduser -D -u 1410 appuser -G appgroup

RUN chown -R appuser:appgroup /app

USER appuser

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Ở trên các bạn thấy rất rõ là mình thêm vào đoạn tạo group `appgroup` với `Group ID` là `1410`, tương tự tạo `appuser` với `User ID` cũng là `1410`, sau đó mình cho `appuser` join vào `appgroup`. Tiếp đó là mình đổi quyền folder project của chúng ta về thuộc sở hữu của `appuser` và `appgroup`

Và để chỉ định cụ thể user nào chạy container thì ta dùng `USER appuser`, kể từ đây về sau tất cả các command đều được chạy dưới quyền user này.

Sau đó các bạn build lại image nhé:
```
DOCKER_BUILDKIT=1 docker build -t learning-docker:non-root-v2 .
```
Ở trên mình đặt tag là `v2` nhé, sau đó các bạn sửa lại tên image ở `docker-compose.yml` cho khớp nhé.

Sau đó ta khởi động project nhé:
```
docker-compose up -d
```
Sau đó chúng ta F5 lại trình duyệt, thử thêm 1 sản phẩm nữa xem nhé. Và..............BÙMMMM, lỗi :astonished::astonished:

![](https://images.viblo.asia/aee5547b-95bf-45a9-9c85-f07c8a17e0d2.png)

Hừm, lỗi tại sao nhỉ????

Chúng ta thử exec vào container `app` xem nhé:
```
docker-compose exec app sh
cd public
ls -l
```
Ta sẽ thấy in ra như sau:

![](https://images.viblo.asia/42592e0e-78c7-40a7-a474-fa1248ccbff3.png)

Folder `images` đang thuộc sở hữu của user `node` và group `node`. À há, đó là lí do tại sao ta bị lỗi Permission Denied, bởi vì app của chúng ta đang được chạy dưới quyền của `appuser` trong khi folder `images` để upload ảnh sản phẩm thì lại thuộc sở hữu của user khác.

Ôi từ từ... user `node` ở đâu ra vậy?????? :thinking::thinking:

Ở đây chúng ta có điều thú vị đầu tiên :). Folder mà chúng ta mount volume ở `docker-compose` của service `app` sẽ có quyền bằng với user - người mà chạy `docker-compose up` để khởi động project.

Thế tại sao trong container tên user sở hữu folder `images` không phải tên là `james`vì ở ngoài ta chạy `docker-compose up -d` bằng user `james`mà :thinking:?

Đây là điều thú vị tiếp theo ta có :). Lí do có sự khác biệt về tên là do ID của user ở môi trường ngoài - người chạy `docker-compose up` có ID lại trùng với ID của 1 user nào đó có sẵn ở trong container (user `node`).

Để tìm hiểu rõ điều này ta cùng chui vào container và liệt kê danh sách user có trong đó nhé:
```
docker-compose exec app sh
cat /etc/passwd

---> In ra
...
node:x:1000:1000:Linux User,,,:/home/node:/bin/sh
appuser:x:1410:1410:Linux User,,,:/home/appuser:/bin/ash
```
Ở trên các bạn thấy container có sẵn user tên là `node` với UID và GID (userID/groupID) là `1000`. Sau đó ta quay lại môi trường gốc, kiểm tra xem ID của user ở môi trường ngoài là gì nhé:

![](https://images.viblo.asia/88f0cbb9-94fe-4973-b4df-c0ef51c6d711.png)

Các bạn có thể thấy ở môi trường ngoài user của mình cũng có UID:GID là 1000:1000. Do đó ở trong container mới có sự khác biệt về tên (`james` thành `node`) như vậy, nhưng bản chất chỉ là một và như nhau.

Ô kê vậy vấn đề bây giờ là chúng ta đồng bộ user người mà sở hữu `volume` (user `node`) và user chạy app của chúng ta (user `appuser`) là được rồi. Các bạn chú ý, cái tên `node` hay `appuser` nó chỉ là cái tên tượng trưng :D, cái chính đó là User ID và Group ID cần phải giống nhau. Tức là ở đây ta phải đổi `appuser` có ID về thành 1000.

Ở Dockerfile các bạn sửa lại cho mình như sau:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .

# Create a group and user
RUN addgroup -g 1000 appgroup

RUN adduser -D -u 1000 appuser -G appgroup

RUN chown -R appuser:appgroup /app

USER appuser

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```

Sau đó các bạn tiến hành build lại image nhé:
```
DOCKER_BUILDKIT=1 docker build -t learning-docker:non-root-v3 .
```
Và.....................BÙM, build lỗi:

![](https://images.viblo.asia/162bbe02-400a-4cca-ac77-8f458434120b.png)

Ta thấy lỗi in ra là group với ID là 1000 đã được sử dụng. :thinking::thinking: À mà đúng rồi, nó là của user `node` có sẵn trong image mà ta vừa nói ở trên con gì :sob::sob:

Hìu hìu.... Giải quyết như thế nào đây

Dưới đây ta có 2 cách để giải quyết vấn đề này như sau. À nhớ `down` project đi đã nhé các bạn:
```
docker-compose down
```

## Cách 1: đổi user chạy `docker-compose...` ở môi trường gốc

Với cách này ta sẽ tạo 1 user mới ở môi trường gốc với user và group ID khác 1000 (cho khác với user `node` trong container), và dùng user đó để chạy `docker-compose...`.

Ở môi trường gốc các bạn làm như sau:
```bash
sudo adduser mytestuser

# Thêm user vào sudo group để lát nữa ta cần đổi quyền folder project
sudo usermod -aG sudo mytestuser

# Login vào user vừa tạo
su - mytestuser

# Thêm user hiện tại vào docker group để có thể chạy được các command liên quan tới Docker
sudo usermod -aG docker $USER

# Kích hoạt các thay đổi bên trên
newgrp docker
```
Tiếp theo ta kiểm tra user ID và group ID của user `mytestuser` nhé:
```
whoami
->> mytestuser

id -u
->> 1001

id -g
->> 1001
```
Vì khi tạo `mytestuser` ta không chỉ định rõ là user và group ID nào, nên ta sẽ nhận được user với ID được hệ điều hành tự động sinh, ở đây ta có `UID:GID` là `1001:1001`. Khi tạo user các bạn có thể thêm option `-u <user id>` để chỉ định rõ user ID là gì nhé :)

Ổn rồi đó, các bạn `cd` vào folder project, thay đổi quyền toàn bộ project thành user hiện tại:
```
sudo chown -R $USER:$USER .
```
Sau đó ta sửa lại user ID và group ID trong Dockerfile 1 chút như sau:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .

# Create a group and user
RUN addgroup -g 1001 appgroup

RUN adduser -D -u 1001 appuser -G appgroup

RUN chown -R appuser:appgroup /app

USER appuser

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Sau đó ta tiến hành build lại image nhé:
```
DOCKER_BUILDKIT=1 docker build -t learning-docker:non-root-v4 .
```
Sau đó các bạn sửa lại tên image thành `v4` ở trong `docker-compose.yml` cho khớp rồi ta khởi động lại project nhé:
```
docker-compose up -d
```
Sau khi app khởi động xong, ta chui vào container để kiểm tra nhé:
```
docker-compose exec app sh
cd public
ls -l
```
Các bạn sẽ thấy rằng hiện giờ folder `images` đã thuộc quyền sở hữu của `appuser` rồi nhé. Tiếp tục chui vào folder `images` và chạy `ls -l` các bạn cũng sẽ thấy điều tương tự.

Giờ ta thử mở trình duyệt và thêm thử sản phẩm, các bạn sẽ thấy app đã chạy ngon, quay trở lại container vẫn ở folder `public/images` các bạn gõ `ls -l` sẽ thấy file ảnh sản phẩm vừa upload lên cũng sẽ thuộc sở hữu của `appuser` rồi nhé

Đến đây ta đã hoàn thành việc setup để app của chúng ta chạy với non-root user rồi đó. Cùng xem cách 2 đơn giản hơn nhé ;)
## Cách 2: tận dụng user sẵn có trong container
Quay trở lại với vấn đề ban đầu, bởi vì ở môi trường gốc user `james` của ta có UID:GID là 1000:1000 trùng với user `node` trong container, do vậy nên ở môi trường gốc ta phải tạo user mới với ID khác 1000. Sau đó sửa lại Dockerfile để `appuser` có ID bằng với ID của user vừa tạo (`mytestuser` - ID=1001)

Thế vậy tại sao ở Dockerfile ta dùng luôn user `node` để chạy app thay vì `appuser` đi????? :thinking::thinking:

Bạn nói đúng rồi đấy ;)

Ta thử xem qua Dockerfile của image `node` official [ở đây](https://github.com/nodejs/docker-node/blob/41467a844eee86ee6a1aabce12467c6cd72bb322/14/alpine3.10/Dockerfile), sẽ thấy họ tạo sẵn cho chúng ta user `node` với UID:GID là 1000:1000, có quyền chạy `npm` và các thứ liên quan tới NodeJS, vậy nên ta có thể tận dụng luôn user `node` để chạy app NodeJS của chúng ta thay vì ở môi trường gốc phải tạo thêm user mới (`mytestuser`)

Các bạn làm như sau nhé, đầu tiên ta `down` project đi đã:
```
docker-compose down
```
Sau đó ta cần logout khỏi user `mytestuser` ở môi trường gốc để quay trở về user ban đầu (`james`):
```
exit
```
Sau đó ta đổi lại quyền của toàn bộ file trong project về lại user ban đầu (của mình là `james`):
```
# kiểm tra user hiện tại trước khi làm
whoami
-->> james

sudo chown -R $USER:$USER .
```
Sau đó các bạn sửa lại Dockerfile như sau nhé:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .

RUN chown -R node:node /app

USER node   

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Ở trên các bạn thấy là ta dùng user `USER node` để chạy, Dockerfile cũng ngắn gọn hơn rồi đúng không nào ;).

Các bạn tiến hành build lại image nhé:
```
DOCKER_BUILDKIT=1 docker build -t learning-docker:non-root-v5 .
```
Sau đó các bạn update lại tag image là `v5` ở `docker-compose.yml` cho khớp nhé. Và ta tiến hành khởi động lại project:
```
docker-compose up -d
```
Sau đó các bạn lại `exec` vào container app, check permission của folder `public/images`, đồng thời ta quay lại trình duyệt thêm mới vài sản phẩm sẽ cho kết quả tương tự cách 1.

Phần này các bạn hoàn toàn tự sướng 1 mình nhé :rofl::rofl:

# Thế còn Redis và MongoDB?
Chắc các bạn sẽ để ý và thấy rằng ứng dụng của ta chứa 3 services thì mới chỉ có `app` là chạy với non-root user, còn `redis` và `db` vẫn đang chạy với user `root`. 

Ta sẽ "xử" từng cái 1 nhé :D

## Redis
Để chạy container `redis` với non-root user ta đơn giản là ta chỉ định user trực tiếp ở `docker-compose.yml`, vì service này không cần cấu hình nhiều như `app` mà có thể chạy ngay bằng image sẵn có. Các bạn sửa lại `docker-compose.yml` phần service `redis` như sau:
```yaml
redis:
    image: redis:5-alpine
    volumes:
      - .docker/data/redis:/data
    restart: unless-stopped
    user: 1000:1000
```
Ở trên ta chỉ định là chạy `redis` với user có `UID:GID` là `1000:1000` cho giống với user ID và group ID ở môi trường ngoài của ta. Sau đó các bạn khởi động lại project nhé:
```
docker-compose down
docker-compose up -d
```
Sau đó ta chui vào `redis` và check xem nhé:
```
docker-compose exec redis sh

id -u
--->>> 1000

id -g
--->>> 1000

ls -l
--->>>
-rw-r--r--    1 1000    1000         3004 Aug 28 14:34 dump.rdb
```
Vậy là ta đã có Redis chạy với non-root user rồi nhé
## MongoDB
Tương tự như `redis`, các bạn sửa lại `docker-compose.yml` phần service `db` như sau nhé:
```yaml
db:
    image: mongo
    volumes:
      - .docker/data/db:/data/db
    restart: unless-stopped
    user: 1000:1000
```
Sau đó ta tiến hành khởi động lại project nhé:
```
docker-compose down
docker-compose up -d
```
Các bạn chui vào trong container `db` và check thử xem user là gì nhé


Cuối cùng ta quay trở lại trình duyệt thêm thử vài sản phẩm xem sao, phần này mình để các bạn tự sướng :D

> Ô đơn giản nhỉ, nếu vậy service `app` cũng chạy với user `node` ta set ở `docker-compose.yml` cho nhàn đỡ phải để ở Dockerfile xong phải build đi build lại image. Cách này có được hay không các bạn thử xem rồi comment cho mình nhé ;)
# Có một sự hay ho không hề nhẹ
Có thể bạn chưa biết, nếu như ban đầu folder mà ta mount `volume` ở `docker-compose.yml` không tồn tại, thì Docker sẽ tự tạo cho chúng ta và folder đó sẽ được gán dưới quyền user `root`. Và như vậy khi chạy lên, thử thêm mới sản phẩm ta sẽ ngay lập tức bị lỗi Permission Denied.

Để chứng minh điều này ta làm như sau nhé. Các bạn `down` project đi trước:
```
docker-compose down
```
Sau đó chúng ta xoá folder `public` đi
```
rm -rf public
```
Sau đó ta tiến hành khởi động lại project:
```
docker-compose up -d
```
Và khi kiểm tra quyền thì ta sẽ thấy như sau:
```
ls -ls

---->>>

...
...
drwxr-xr-x  3 root  root  4096 Aug 28 15:11 public/
...
```
Các bạn vào folder `public` sẽ thấy rằng cả folder `images` bên trong cũng là của `root` luôn. Sau đó ta quay trở lại trình duyệt, F5, thử thêm mới sản phẩm thì sẽ ngay lập tức báo Permission Denied:

![](https://images.viblo.asia/01b60193-50dd-40f9-8bab-2fef1000ad9c.png)

Vậy nên các bạn lưu ý trước khi chạy project lên thì đầu tiên ta nên tạo trước các folder mà ta sẽ mount `volume` thay vì để lúc chạy Docker tự tạo nhé
# Tăng tốc độ build image
Nếu các bạn để ý, khi build image, đến bước `RUN chown -R ...` sẽ rất lâu, có khi tới cả 5 phút. Ở bước này ta đổi quyền của tất cả các file/folder trong container thành quyền của user trong container đó (user `node`), vì trước đó đoạn chạy `npm install` ta đang là user `root`.

Mà ta đã biết là `node_modules` thì chứa vô vàn thư viện, dẫn tới rất nhiều file cần đổi quyền nên tốn nhiều thời gian.

Giờ ta cùng sắp xếp lại thứ tự các command ở Dockerfile để cải thiện tốc độ build image nhé:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

# Chú ý ở đây
RUN chown -R node:node /app

USER node

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Ở trên các bạn thấy rằng, mình đã đưa 2 command `RUN chown ...` và `USER node` lên ngay dưới command cài PM2. Ta cùng phân tích nhé:
- PM2 ta cần cài với quyền `root` vì ta cài global, nên luôn phải đặt trước `USER node`
- Ngay phía trên command `USER node` ta có command `RUN chown ...` để đổi quyền của folder `/app` về lại thuộc sở hữu của user `node`, vì command `WORKDIR /app` sẽ làm folder `app` thuộc sở hữu của `root`, và `chown` cũng cần được chạy với quyền `root` nên ta cũng phải đặt nó ở trên `USER node`. Tại thời điểm này folder `/app` đang rỗng nên chạy `chown` sẽ chỉ trong nháy mắt ;)
- Còn từ đó trở về sau thì phạm vi làm việc của ta chỉ là ứng dụng nodejs, do vậy ta có thể chuyển về user `node`, lát nữa `npm install` sẽ được chạy với quyền của `node` và khi chạy xong thì `node_modules` sẽ tự có quyền của `node` luôn.

Sau đó các bạn build lại image để xem kết quả nhé.

![](https://images.viblo.asia/1dd52af6-f800-4482-826f-7ef868efe6e7.png)

Hình trên các bạn thấy thời gian chạy CICD của mình đã giảm đi được tới 5 phút :rofl::rofl:
# Note khi chạy với Kubernetes
Nếu bạn nào đang dùng [Kubernetes](https://kubernetes.io/) để deploy mà các bạn làm theo **Cách 1** của mình ở trên, tức là chạy với 1 user môi trường ngoài khác với user `node` có ID là 1000 trong container thì các bạn dùng `SecurityContext` nhé:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo
spec:
  securityContext:
    runAsUser: 1410
    runAsGroup: 1410
    
    ...
```

Hoặc nếu bạn dùng `PersistentVolume` và đang dùng AKS như mình thì có thể tận dụng luôn `mountOptions` nhé:
```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: ...
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteMany
  storageClassName: azurefile
  persistentVolumeReclaimPolicy: Retain
  azureFile:
    ...
  mountOptions:
  - dir_mode=0777
  - file_mode=0777
  - uid=1410
  - gid=1410
  - mfsymlinks
  - nobrl
```

# Ví dụ bài này dễ quá
 Ở bài này chúng ta có ví dụ khá đơn giản, mục đích của mình giải thích và hướng dẫn cho các bạn cách làm sao để chạy container bằng non-root user, từ đó để các bạn tìm hiểu thêm và áp dụng vào công việc của từng người.
 
 Nếu các bạn muốn project gần với những gì thực tế hay làm hơn. Các bạn có thể xem source app Realtime chat của mình [ở đây](https://github.com/maitrungduc1410/realtime-chatapp-laravelecho-socketio/tree/docker-non-root). Project này có khá đầy đủ các components gần với project thật thường có:
 - Laravel, PHP
 - VueJS
 - Laravel Echo, SocketIO
 - Laravel Horizon  + worker
 - MySQL
 - Redis
 - Adminer
 - Nginx
 - Task Scheduling
 
 Và tất cả các container đều được chạy bằng non-root user. Nếu bài này mình đưa ví dụ đó vào thì bài sẽ rất dài và có thể gây khó hiểu, các bạn nào muốn xem thêm có thể vọc vạch ở source code của mình nhé :)
 # Cứ tưởng đến đây là hết bài
 *Hôm nay ngày 07/10*
 
 Sau một thời gian publish bài này, trong 1 buổi chiều mệt vật vã ngồi xe bus trên đường về nhà, thế nào lại nghĩ đến Docker, nhớ tới bài này và tự nhiên làm mình thấy có gì đó hình như không đúng :D
 
 > Có một điều lạ là những ý tưởng hay những phát hiện của mình thường không bắt đầu từ bàn làm việc mà chủ yếu là trên đường đi hoặc trong nhà vệ sinh :joy::joy:

Quay lại phần đầu trong bài mình có viết như sau: "Ở đây chúng ta có điều thú vị đầu tiên 😃. Folder mà chúng ta mount volume ở docker-compose của service app sẽ có quyền bằng với user - người mà chạy docker-compose up để khởi động project."

Câu trên là chưa đúng, chẳng qua đó là sự trùng hợp mà thôi :D (mặc dù sự trùng hợp này thường xuyên xảy ra).

Chính xác phải là, tại thời điểm ban đầu khi chạy lên, nếu folder mount volume ta đã có ở môi trường ngoài thì nó sẽ được map vào trong với quyền bằng với quyền khi ở môi trường ngoài, chứ không bị ảnh hưởng bởi user chạy `docker-compose up`. Và để chứng minh cho điều này ta thử đổi quyền của folder `images` để nó thuộc sở hữu của `mytestuser` nhé (`mytestuser` là user ta đã tạo trong bài, có UID:GID là 1001:1001). 

Đầu tiên ta shutdown project đi đã nhé:
```
docker-compose down
```
Sau đó kiểm tra lại user ta đang dùng ở môi trường ngoài đã nhé:
```
whoami
--->> james

id -u
--->> 1000

id -g
--->> 1000
```
Sau đó các bạn chuyển vào folder `public` và ta đổi quyền của folder `images` về thuộc sở hữu của `mytestuser` như sau nhé
```
sudo chown -R mytestuser:mytestuser images
```
Kiểm tra lại để chắc chắn mọi thứ vẫn ổn:
```
ls -l

drwxr-xr-x  3 james      james      4096 Aug 28 15:11 ./
drwxrwxr-x 11 james      james      4096 Oct  7 14:11 ../
drwxr-xr-x  2 mytestuser mytestuser 4096 Oct  7 14:11 images/
```
Như hình trên các bạn đã thấy mỗi folder `images` là thuộc `mytestuser`(1001:1001) tất cả mọi thứ còn lại vẫn của `james`

Và giờ ta khởi động lại project nhé:
```
docker-compose up -d
```
Và nếu giờ ta quay lại trình duyệt thêm thử sản phẩm sẽ bị lỗi **permission denied**

Thử `exec` vào trong container và check thử xem nhé:
```
docker-compose exec app sh
cd public
ls -l

--->>
drwxr-xr-x    2 1001     1001          4096 Oct  7 14:11 images
```
Ở trên ta thấy rằng mặc dù user - người chạy `docker-compose up` là `james` có UID:GID=1000:1000 và bằng với user ở trong container (user `node` - 1000:1000), nhưng vì folder `images` ở môi trường ngoài thuộc sở hữu của user `1001:1001` nên nó sẽ được map vào trong container với quyền tương ứng.

Và từ đây ta thấy rằng sự "ngộ nhận" của mình ban đầu chẳng qua là 1 sự trùng hợp vì permission của folder môi trường ngoài có quyền bằng với user chạy `docker-compose up` sẵn rồi do đó khi map vào bên trong cũng có quyền bằng user chạy `docker-compose up` là như vậy.

Do vậy tới đây ta rút ra được kết luận: để có thể chạy được ứng dụng container với non-root user và **có mount volume** thì ta cần phải đồng bộ được quyền của folder mount volume và user **ở trong container**, cụ thể ở trường hợp bài này ta là ta cần phải làm sao để folder `images` và user trong container (user chạy app) phải có quyền bằng nhau, như vậy thì app của chúng ta mới có thể đọc/ghi được.

Từ đó ta chỉ cần sửa lại Dockerfile để chạy với user `1001` (như mình đã trình bày ở Cách 1 trong bài), là mọi thứ lại chạy bình thường, folder `images` ở môi trường ngoài có quyền bằng với user trong container, và không cần quan tâm user chạy `docker-compose up` là user nào

Lí do vì sao mình không update trực tiếp lại phần đầu bài luôn: mình thấy việc chạy container với non-root giúp app chúng ta "cứng cáp" hơn, nhưng đi kèm là khá nhiều vấn đề khoai về permission trên Linux. Do đó mình muốn viết riêng phần này ra để ta suy nghĩ và phân tích thêm về permission trong Docker và Linux từ đó hiểu thêm về nó. Hiểu kĩ về permission sẽ giúp ta giảm được rất nhiều lỗi khi deploy project hoặc chạy các process trên Linux đấy ;)

> Đọc blog của mình là 1 chuyện, nhưng mình nghĩ khi thực chiến vào các project riêng của các bạn thì còn nhiều vấn đề nữa cho xem :D

# Lại có một sự hơi bị hay
*Update 21/10/2020*

Đến đây cũng đã gọi là hiểu được ổn ổn rồi, cứ tưởng tươi lắm rồi. Ấy thế khi chạy project lên, thử `exec` vào `app` xem tí thì thấy có điều kì lạ như sau:

![](https://images.viblo.asia/874f334e-2e35-460a-8373-da20e977e036.png)

Chỉ có đúng folder `node_modules`, `package-lock.json` và folder `images` bên trong `public` là có quyền bằng với `node`, còn lại tất cả là của `root`

Từ đây mình mới nhớ ra có 1 điều mà mình chưa bao giờ đề cập tới trong series này, đó là: **command COPY mặc định sẽ luôn copy file vào và đặt dưới quyền `root` mặc dù trước đó ta đã chuyển user sang `node` rồi**.

Mặc dù điều này không ảnh hưởng tới kết quả ở bài này, app của chúng ta vẫn chạy ngon, lý do vì những folder nào cần ghi (`images`) thì thuộc sở hữu của `node` rồi, còn những thứ khác mặc dù của `root` nhưng app của chúng ta không ghi nên không sao, đọc thì thoải mái. Thế nhưng trong tương lai khi áp dụng vào thực tế chẳng may app của chúng ta ghi vào những file thuộc sở hữu của `root` thì chắc chắn sẽ gặp lỗi.

Ta cùng đi phân tích chi tiết lý do vì sao lại có chuyện này và cách fix nhé ;)

Đầu tiên là folder `images` bên trong `public`, như mình đã giải thích ở phần trước, folder `images` được map vào trong với quyền bằng môi trường ngoài do vậy bên trong ta thấy nó có quyền của user `node` (nhưng chú ý là `public` thì vẫn thuộc `root` như ảnh trên nhé)

Tiếp theo, tại sao `node_modules` và `package-lock.json` lại có quyền của `node` trong khi những thứ khác thì không?? :thinking::thinking:. 

Lí do là bởi vì ta đã chuyển qua user `node` trước khi chạy `npm install`, và chính `npm install` sinh ra `node_modules` và `package-lock.json`, đó là lí do vì sao chúng có quyền của `node` là như vậy. Chú ý là mặc dù ở Dockerfile mình viết là `COPY ["package.json", "package-lock.json*", "./"]`, nhưng file `package-lock.json` ban đầu không có mà nó được tạo ra sau khi chạy `npm install` nhé.

Còn tất cả những thứ khác vì ta chỉ dùng `COPY` bình thường nên như mình đã giải thích ở trên chúng sẽ được đặt dưới quyền `root` bất kể ta đã chuyển qua user `node` từ trước. Giờ ta sửa lại Dockerfile 1 chút để khi copy thì đổi luôn quyền về thành của `node` cho đồng bộ nhé:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

RUN chown -R node:node /app

USER node

COPY --chown=node:node ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY --chown=node:node . .

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Ở trên các bạn để ý rằng mình thêm vào `--chown=node:node` lúc COPY ý bảo là đổi luôn quyền về thành của `node` lúc COPY, bạn tưởng tượng nó như là `shorthand` của `chown node:node ....` mà ta vẫn dùng trên Linux vậy.

Sau đó các bạn tiến hành build lại image, khởi động lại project sau đó ta thử `exec` vào lại `app` và check thử:

![](https://images.viblo.asia/7baabf3f-ea53-45dc-8051-ac1e698fe643.png)

Như các bạn thấy, ở trên tất cả mọi thứ trong phạm vi project của chúng ta bây giờ đều đã đảm bảo là có quyền của user `node` rồi ;)
# Đóng máy
Vậy là ở bài này ta đã biết cách cấu hình để chạy ứng dụng của ta với đầy đủ các thành phần NodeJS , MongoDB và Redis, tất cả đều dùng non-root user.

Việc dùng non-root user cũng như là tạo thêm 1 lớp bảo mật cho ứng dụng của chúng ta vậy, giảm đi một mối lo đồng thời tìm hiểu thêm về cách xử lý các lỗi về permission khi chạy với Docker, rèn cho bản thân sự quan tâm tới security trong quá trình deploy và maintain project.

Các bạn cũng thấy là làm việc với Linux vấn đề Permission cũng khá là "đau não" :joy::joy:. Ngày xưa lúc mới vọc server mình toàn sợ bị Permission denied nên cứ phang 777 hoặc chạy bằng `root` cho chắc. Nhưng dần hiểu ra điều đó rất là không nên, đồng thời cái gì cũng có nguyên nhân của nó, nếu hiểu được thì cũng là muỗi thôi :muscle::muscle:

Bài cũng dài rồi, mình đóng máy ở đây. Nếu có gì thắc mắc các bạn để lại comment cho mình nhé. Hẹn gặp lại các bạn vào những bài sau ^^