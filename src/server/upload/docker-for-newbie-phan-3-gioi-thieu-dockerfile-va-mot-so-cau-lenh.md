## Đôi lời mở đầu
Tiếp nối chủ đề Docker for Newbie, nay mình xin phép hướng dẫn các bạn sử dụng thực hành sử dụng Docker để chạy 1 webserver bằng NodeJS. Mình chọn NodeJS vì thấy là ngôn ngữ phổ biến hiện nay, nếu bạn có khó khăn gì với ngôn ngữ của các bạn hãy comment bài viết này mình sẽ cố gắng giải đáp nếu có thể

## Bắt đầu nào
#### Hãy suy nghĩ theo hướng dockerize
Quay lại series trước mình đã giới thiệu cho các bạn khái niệm Docker Images và Docker Container. Vậy để có thể sử dụng mình hãy cùng nhau cách mạng tư tưởng trước đã. Giả sử, bây giờ mình có 1 source code NodeJS rồi làm như nào để chạy. Trước hết, bạn cần tạo ra máy ảo chạy ubuntu, rồi cài NodeJS vào rồi copy code vào trong đó rồi cài dependency các kiểu con đà điểu rồi chạy `node index.js` đúng không? Đây là cách mấy ông không có docker hay làm như thế trên server. Được rồi, thế bây giờ mình sẽ suy nghĩ theo hướng docker hơn (mình gọi là dockerize). Đầu tiên mình có 1 cái images chạy sẵn NodeJS rồi (Bản chất images chạy NodeJS cũng từ images debian rồi xào nấu cài nodejs rồi npm mà ra) rồi copy code, cài dependency rồi cũng `node index.js`

Nếu như nhìn số cách bạn thấy giảm được bớt mỗi cái phải cài NodeJS vào thôi :D Xong lại nghĩ thà cài trên máy còn hơn cài cả cục docker to đùng. Nếu suy nghĩ xa hơn với docker bạn có thể fix version NodeJS trong file rồi chỉ cần chạy đúng 1 câu lệnh thôi, điều này sẽ giảm tối đa thời gian cho các lần chạy sau (vì chỉ cần run container lên) và giảm tối đa lỗi các lần sau (Vì nó chạy theo 1 file config từ sẵn)

Thôi không lôi thôi nữa, hãy cùng config 1 file docker chạy server NodeJS với express.js nhé

#### Thực hành nào
###### Tạo project cùng với Dockerfile
Trước hết, mình tạo file package.json và cài package `express`
```bash
yarn init -y # Tạo package.json
yarn add express # Cài express
```
Đối với bạn nào không biết sử dụng NodeJS thì package.json cũng giống như `gemfile` của ruby hay `requirement.txt` của python

Tiếp theo, mình `index.js` với nội dung như sau
```js
const app = require("express")();
const PORT = 3000;
app.listen(PORT, () => console.log("Server is running"));
app.get("/", (req, res) => res.send("hello world"));
```
với ngôn ngữ khác thì hãy tạo các file tương ứng để dựng server, và hãy thử lại bằng curl như hình bên dưới là được
![](https://images.viblo.asia/98ab82b9-9a53-4afd-9fd7-cb18a55d75fd.png)

Tiếp theo là hãy bê nó vào docker nhé, bạn tạo Dockerfile bằng câu lệnh sau
```bash
touch Dockerfile
```

Trước hết, ở dòng đầu tiên của `Dockerfile`, ta phải chỉ ra rằng chúng ta muốn build từ image nào (Ở đây của mình là [node](https://hub.docker.com/_/node/))
Ở đây mình dùng phiên bản `lts` 
```Docker
# Choose images
FROM node:lts
```

Ở dòng tiếp theo ta sẽ khai báo đường dẫn của code chúng ta trong container, mình sẽ để ở `/usr/src/app`
```Docker
# Create app directory
WORKDIR /usr/src/app
```

Ở dòng tiếp theo ta sẽ copy toàn bộ source của project vào trong image và download các dependencies
```Docker
# Copy source code 
COPY . .
```

- Dấu `.` đầu tiên là đường dẫn đến file của bạn trên máy tính, mình để là chấm vì mình sẽ lấy toàn bộ file cùng context với Dockerfile 
- Dấu `.` thứ 2 chính là `usr/src/app`. Nếu bạn không khai báo `WORKDIR` thì bạn sẽ phải trỏ đến vị trí chứa code của container

Nếu ngôn ngữ bạn sử dụng cần yêu cầu cài packages nếu có thì hãy thêm vào dòng 
```Dockerfile
RUN npm install
```
*Với một số ngôn ngữ có folder package ngay trong chính folder project như node_modules của NodeJS hãy tạo file .dockerignore và ignore node_modeles, giống .gitignore*

Và cuối cùng thêm dòng sau để chạy server
```Dockerfile
CMD [ "node", "index.js" ]
```

Nếu các bạn tinh ý thì `npm install` hay `node index.js` đều là các câu lệnh bash bình thường, vậy tại sao không dùng `RUN node index.js` hay `CMD npm install`
Đó là ví do sự khác nhau về ý nghĩa của các câu lệnh đó như sau

- `RUN`: thực thi (các) lệnh trong một layer mới và tạo một containers mới. Ví dụ: nó thường được sử dụng để cài đặt các gói phần mềm. 
- `CMD`: đặt lệnh và/hoặc là đặt các tham số mặc định trong dockerfile, lệnh hoặc các tham số mặc định này có thể được ghi đè từ dòng lệnh khi docker container chạy
Ngoài ra, còn có 
- `ENTRYPOINT`: cấu hình một container sẽ chạy như một executable

*Tham khảo tại [đây](https://viblo.asia/p/docker-run-vs-cmd-vs-entrypoint-Az45boVgKxY)*

Ngoài ra còn nhiều thứ thú vị hơn ở `Dockerfile` bạn có thể tham khảo tại [đây](https://viblo.asia/p/docker-tao-docker-images-tu-dockerfile-3P0lPORvZox)
###### Build dockerfile
Ta sử dụng câu lệnh để build từ Dockerfile ra images
```bash
docker build -f Dockerfile -t docker-express .
```
Giải thích:
* `-f Tên_file`: Bạn có thể tạo những file như `Dockerfile.development`. Với `-f` bạn có thể custom tên file
* `-t Tên_images_mới`: Ở đây mình đang build images với tên là `docker-express`. Trong thực tế người ta sẽ dùng thêm cả tag như `lastest`, `development` bằng cách thêm `:` và tên tag sau tên images như `docker-express:latest`
* `.`:  Là context của docker. Bạn có thể ngầm hiểu là thư mục chứa Dockerfile cho đơn giản :D

Để kiểm tra images đã được tạo ra chưa hãy sử dụng câu lệnh sau trong Terminal
```bash
docker images 
```
![](https://images.viblo.asia/f75fa3cb-9970-4aec-a3a0-f1fb1ecf425a.png)

###### Chạy container với docker images
Sử dụng câu lệnh sau
```bash
docker run --rm -d -p 3000:3000 --name test docker-express
```
Giải thích:
* `--rm`:  Thường khi bạn stop docker thì docker đó sẽ ở trạng thái stop chứ không được terminate hoàn toàn. Thêm params này sẽ giúp terminate ngay khi stop
* `-d`: Giúp container chạy ở background
* `-p l:c`:  `l` là port của máy tính của bạn và `c` là port của container. Params này sẽ có tác dụng map port. Nếu bạn sử dụng `80:3000` thì sẽ reverse port 3000 của container thành port 80 của máy tính
* `--name tên_container`: đặt tên container giúp bạn có thể dễ dàng thao tác hơn
* `docker-express`: tên images ở trên

Sau  khi chạy ta sẽ được 1 string như sau `e7f5f8b86ee1b4e7a16ef38cc24547c598c9aaafccd1de23efeb668ec33a6c0d`,  đây chính là ID của container để tương tác, bạn có thể thao tác với container bằng 7-8 kí tự đầu của string này (thường mình copy bừa :D Được bao nhiêu thì được) hoặc tên container

#### Một số câu lệnh hữu ích với docker
Ngoài `run` và `build` chúng ta có thể sử dụng một số câu lệnh như sau. Đối với trường `name` có thể thay bằng `id` như lưu ý ở trên
##### List các container đang chạy
```bash
docker ps
```
Sử dụng tham số `-a` để xem những container đã stop. Đối với các container chạy với tham số  `--rm` container sẽ được xoá ngay sau khi stop

##### Stop 1 container
```bash
docker stop name
```

##### Start lại 1 container đã dừng
```bash
docker start name
```

##### Xoá hoàn toàn 1 container
```bash
docker rm name
# Có thể thêm tham số -f với các container đang ch
```

##### Xoá hoàn toàn 1 container
```bash
docker rm name
# Có thể thêm tham số -f với các container đang ch
```

##### Inspect lại 1 container 
```bash
docker inspect name
```

##### Dừng hoặc  xoá tất cả các container (Đối với Windows sử dụng trên Powershell)
```bash
docker rm -f $(docker ps -aq)  
```

##### List các images 
```bash
docker images
```

##### Xoá hoàn toàn 1 images
```bash
docker rmi name
```

##### Dừng hoặc  xoá tất cả các container (Đối với Windows sử dụng trên Powershell)
```bash
docker rmi $(docker images -q)  
```
Đối với images, bạn cần xoá các container đang chạy với images đó

Ở bài sau mình sẽ hướng dẫn chạy nhiều containers với Docker compose và thực hành CRUD với NodeJS nhé :D