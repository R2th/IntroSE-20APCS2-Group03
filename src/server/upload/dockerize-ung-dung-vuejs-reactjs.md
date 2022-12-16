Chào mừng các bạn đã quay trở lại với [series học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) của mình 👋👋

Ở bài trước chúng ta đã cùng nhau [dockerize một ứng dụng Python](https://viblo.asia/p/dockerize-ung-dung-python-flask-bWrZnxbY5xw) cùng với đó là tìm hiểu về cách tạo biến môi trường trong Docker (một thứ rất hay dùng) và các để ta đẩy image ở local lên một registry (nơi lưu trữ Docker image, tựa như Github/Gitlab lưu code), đồng thời các mà ta download image về và chạy ở bất kì nơi nào ta muốn. 

Ở bài này ta sẽ tiếp tục series bằng cách thực hành dockerize ứng dụng VueJS và ReactJS nhé.

Tại sao lại dockerize 2 project trong 1 bài, vì cách Dockerize VueJS và ReactJS khá là giống nhau (nếu không nói là y như nhau :-D). Nên mình sẽ gộp vào 1 bài luôn. Cùng với đó là một số kiến thức về Docker sẽ có ở trong bài.

Các bài trước dù đã cố gắng nhưng mỗi bài vẫn có khá nhiều khái niệm gửi tới các bạn, nếu có gì vẫn còn vương vấn thắc mắc thì các bạn cứ comment ở các bài đó cho mình được biết nhé.

Bài này sẽ đơn giản hơn đỡ đau mắt hơn đó :joy::joy:

Chúng ta cùng bắt đầu nhé ;)

# Tiền Setup
Nhớ check là các bạn đã cài Docker và Docker-compose rồi nhé. Nếu chưa thì nhớ check lại [phần cuối bài trước](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n#_setup-docker-va-docker-compose-14) của mình để biết cách cài đặt nhé.

# Setup
Các bạn clone source code [ở đây nhé](https://gitlab.com/maitrungduc1410/learning-docker)

Ở bài này ta sẽ chỉ cần quan tâm tới 2 folder trong source code bên trên đó là **docker-vue** và **docker-react** nhé ;)

Ở 2 thư mục đó với tên tương ứng mình đã tạo sẵn cho các bạn 1 project VueJS và một project ReactJS
# Dockerize Project VueJS
Đầu tiên chúng ta sẽ tiến hành dockerize project VueJS nhé ;)
## Build Image
Và vẫn như các bài trước để dockerize một project trước hết chúng ta cần phải cấu hình Dockerfile để định nghĩa Image với môi trường và những thứ cần thiết cho project
### Cấu hình Dockerfile

Ở folder **docker-vue** các bạn tạo file tên là **Dockerfile** với nội dung như sau:
```dockerfile
# build stage
FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
## các bạn có thể dùng yarn install .... tuỳ nhu cầu nhé

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
```
Ồ bài này sao lại có 2 cái FROM vậy nhỉ? 

Như ở bài [dockerize ứng dụng NodeJS](https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG#_toi-co-the-from-nhieu-lan-duoc-khong--22https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG#_toi-co-the-from-nhieu-lan-duoc-khong--22) phần những câu hỏi liên quan mình cũng đã giải thích là chúng ta có thể FROM nhiều lần trong 1 file Dockerfile nhé.

Thế tại sao bài này lại có. Bắt nguồn từ điều này: đối với project Vue hoặc React là dạng full frontend, không có tí backend nào, chúng chỉ được chạy trên trình duyệt. Mà khi ra tới trình duyệt, thì thứ trình duyệt hiểu chỉ là **HTML, CSS, JS**.

Do đó để Dockerize ứng dụng Vue/React việc của ta là chỉ cần lấy được những file build cuối cùng cần thiết để chạy ở trình duyệt còn những thứ khác có hay không có, không quan trọng :-D, làm như thế thì Image của chúng ta sẽ giảm được size xuống, giảm thiểu tối đa những thứ không cần thiết bên trong Image

Mình sẽ cùng nhau phân tích file Dockerfile trên để thấy những điều mình huyên thuyên bên trên nó là thế nào nhé ;):
- Ở file Dockerfile chúng ta chia làm 2 stage (giai đoạn) khi build image: **build stage** và **production stage**
- Ở **build stage** ta bắt đầu từ image tên là **node:16-alpine**, nếu các bạn không biết nó là gì thì đọc bài [dockerize ứng dụng NodeJS](https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG) của mình nhé. Để đặt tên cho từng giai đoạn ta dùng từ khoá **as** nhé ;)
- Trong build stage ta bắt đầu từ đường dẫn **/app**, sau đó copy toàn bộ file ở folder hiện tại ở môi trường ngoài, tức folder **docker-vue** vào bên trong đường dẫn ta set ở WORKDIR tức **/app** bên trong image.
- Tiếp theo ta chạy **npm install** như thường lệ để cài dependencies và cuối cùng là build project
- Ok build xong giờ tiến tới **production stage**: nơi ta định nghĩa cách chạy project
- Ở **production stage** ta bắt đầu với image tên là **nginx....** đặt tên stage này là **production-stage** với từ khoá **as**
- Thế **nginx** ở đây là cái gì thế ???? Project VueJS hay ReactJS khi chạy sẽ cần một webserver để có thể chạy được nó, và Nginx ở đây chính là webserver. Ở local có cần Nginx gì đâu nhỉ? Vì ở local khi chạy **npm run dev** thì các nhà phát triển VueJS đã thiết lập sẵn cho chúng ta 1 local webserver rồi nhé, nhưng khi chạy thật thì **không** nên dùng nhé, phải có 1 webserver xịn, và Nginx thì rất là xịn nhé :D :-D
- Sau đó, phần này quan trọng nè, ta COPY từ **build-stage** lấy folder ở đường dẫn **app/dist** chính là "những file build cuối cùng cần thiết để chạy ở trình duyệt", ta lấy folder đó và copy vào đường dẫn **/usr/share/nginx/html**, đây chính là nơi Nginx sẽ tìm tới và trả về cho user khi user truy cập ở trình duyệt
- Và cuối cùng ta có CMD khởi động Nginx

Bài này có sự xuất hiện thêm của đối tượng lạ tên là Nginx có thể sẽ làm cho các bạn khó hiểu ngay từ bước đầu, nhưng "take it easy", cứ bình tĩnh và tạm coi nó là "1 anh bạn nào đó" cần thiết để làm nhiệm vụ phục vụ VueJS đến user, vì tự bản thân Vue không "show hàng" cho user xem được nhé ;)

### Build Image
Và để build image thì vẫn như một cái thường lệ từ các bài trước :-D, ta chạy command sau:
```
docker build -t learning-docker/vue:v1 .
```

Nếu các bạn có thắc mắc command trên làm gì thì xem lại các bài trước trong series này nhé
### Chạy project
Để chạy project ta lại "rất như thường lệ các bài trước" lại tại một file tên là **docker-compose.yml** với nội dung như sau:
```yaml
version: "3.7"

services:
  app:
    image: learning-docker/vue:v1
    ports:
      - "5000:80"
    restart: unless-stopped
```
Những thứ bên trên cũng được mình đã giải thích ở các bài trước rồi nhé các bạn ;), Lại "rất như thường lệ" nếu các bạn không hiểu thì các bạn xem lại các bài trước nhé :-D :-D

"TỪ! Ở trên 80 lấy ở đâu ra vậy anh zai viết blog hê"

Thì mặc định của Nginx khi bạn ý chạy thì bạn ý sẽ lắng nghe ở cổng 80 nhé các bạn ;) , dù trong Dockerfile ta không có, cái đó được setup ở trong Nginx rồi nhé ta chưa cần quan tâm.

Cuối cùng là chạy project lên thôi nào. Lại "rất như thườ....." (thôi không nói nữa), ta chạy command sau:
```
docker-compose up -d

# Năm 2022 rồi thì dùng:
docker compose up -d
```
Sau đó mở trình duyệt ở địa chỉ **localhost:5000** và xem nhé:

![Docker vue](https://images.viblo.asia/54ab595c-bf90-4bf4-83d9-9899676c60d9.png)

Cho bạn nào xem luôn bài này và không hiểu cổng 80 và 5000 nó là cái gì thì các bạn nên xem các bài trước trong series này nhé ;)
# Dockerize project ReactJS
Với project ReactJS thì sự giống nhau là 96,69% so với VueJS nhé, điều duy nhất khác biệt đó là React khi build sinh ra project tên là **build** chứ không phải **dist** như Vue, nên file Dockerfile nom sẽ như sau nhé:
```dockerfile
# build stage
FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
```

Phần này các bạn thử tự làm và xem kết quả có ra được ngon lành như Vue không nhé ;)
# Có cách nào để không phải chia Dockerfile thành 2 stage?
Thì câu trả lời là có, về sau khi mình hiểu được cách này thì mình toàn dùng cách này cả :-D.

Bắt đầu thôi nào....:clap::clap:

Trước hết ta sẽ cần lắc não một chút:
- Như ở trên mục đích của chúng ta là cần phải build được project, sau đó lấy "những file build cuối cùng" tức là lấy được folder **dist** ở Vue hoặc **build** ở bên React và gửi nó tới Nginx và bảo "Nginx cậu show hàng hộ tớ nếu có user hỏi thăm đến tớ" :joy::joy:
- Vậy vấn đề ở đây là làm cách nào có thể build được project mà không cần dùng thêm một stage như ở Dockfile, sau đó chuyển nó tới cho anh bạn thân Nginx là ok rồi ;)

## Setup
Docker hỗ trợ chúng ta có thể tạo ra một "container tạm thời" (intermediate container, từ này dịch ra phải là trung gian mới đúng như nghe nó không hay :-D).

Container này sau khi làm xong nhiệm vụ thì sẽ tự được xoá đi.

Ta sẽ dùng container này để build project nhé ;)

Bắt đầu thôi nào...

Trước hết các bạn tắt project nếu đang chạy bằng docker-compose đi nhé:
```

docker-compose down

# năm 2022 rồi nên đổi qua dùng:
docker compose down
```

Vẫn ở folder **docker-vue** chạy command sau:
```
docker run --rm -v $(pwd):/app -w /app node:16-alpine npm install && npm run build
```
Giải thích nè:
- Ở câu lệnh trên ta chạy câu lệnh docker tạo ra 1 container với option **--rm** ý bảo "chạy xong chú tự xoá đi nhé"
- Tiếp theo ta có option **-v** tức là **volume**, ồ volume là gì mới à nha. Ở [bài đầu tiên](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n#_volume-11) mình đã nói tới rồi nhé, các bạn cứ bình tĩnh dần dần ta sẽ học nó nhiều hơn
- Sau **-v** là `$(pwd):/app`, ở đây ý ta bảo là đưa toàn bộ file ở folder hiện tại ở môi trường gốc ánh xạ vào trong đường dẫn `/app` trong Image ( `$(pwd)` trả về đường dẫn hiện tại) , việc này gọi đúng thuật ngữ thì là **mount**
- Tiếp theo ta có option **-w** chính là WORKDIR nhé
- Tiếp theo ta có **node:16-alpine**: tương đương với **FROM node:16-alpine**
- Sau đó là các command ta cần chạy để build project.

Các bạn chạy command trên nhé, có thể 1 lúc không thấy terminal in ra gì, đừng hoang mang nhé, 1 chút thôi là in ra cả một đống log đó :-D

Sau khi command trên chạy thành công thì các bạn sẽ thấy ở folder **docker-vue** xuất hiện cả folder **node_modules** và folder **dist**. Đây chính là điều mà **volume** trong Docker mang lại.

Volume giúp ánh xạ file ở môi trường ngoài vào trong Docker container, và ánh xạ này là ánh xạ 2 chiều, ngoài thay đổi thì trong thay đổi, trong thay đổi thì ngoài thay đổi theo. Đó là lí do vì sao khi command trên chạy xong ở bên ngoài ta lại có kết quả như vậy. Dần dần các bạn sẽ hiểu **volume** nó là gì nhé ;)

Ok vậy là giờ ta đã có folder **dist** rồi, nhiệm vụ tiếp theo là gửi nó tới nginx.

Các bạn sửa lại file **docker-compose.yml** như sau:
```yaml
version: "3.4"

services:
  app:
    image: nginx:1.17-alpine
    volumes:
      - ./dist:/usr/share/nginx/html
    ports:
      - "5000:80"
    restart: unless-stopped
```
Ở trên ta đã thay tên image bằng tên của image của Nginx, đồng thời ta dùng từ khoá **volumes** để ánh xạ nội dung **bên trong** folder **dist** vào trong folder **/usr/share/nginx/html** nơi Nginx cần. (nhớ là nội dung bên trong **dist** chứ không có folder **dist** đâu nhé)

Các bạn chú ý trong docker khi ta ánh xạ (hay gọi chính xác là **mapping** dùng cho port hay **mount** dùng cho volume), biêủ thức sẽ chia làm 2 vế thì vế trái luôn là ở môi trường gốc (bên ngoài), vế phải là bên trong container nhé

Và chú ý là khi ánh xạ volumes thì vế bên phải (nơi container) đường dẫn phải là **đường dẫn tuyệt đối** nhé.

Cuối cùng là ta chạy lại project xem sao nào:
```
docker compose up -d
```

Các bạn mở trình duyệt và sẽ lại thấy điều tương tự như trước đó ta đã thấy nhé :-D

Ta thử chui vào container xem có gì nhé, các bạn mở terminal khác tại folder **docker-vue** và chạy command sau:
```
docker-compose exec app sh
cd /usr/share/nginx/html
ls -l
```
Và các bạn sẽ thấy như sau
![Docker](https://images.viblo.asia/e5e5e65e-4891-44fa-8db8-6ad0ce6db71d.png)

## Review
Tại sao với Vue hay React mình lại chọn cách này??

Các bạn để ý thấy là cuối cùng ở file **docker-compose** khi chạy ta dùng image **nginx** là image đã được build sẵn, chứ không còn dùng image **learning-docker:vue** nữa. Mà image **learning-docker:vue** cần phải build mới có thể dùng được. Do đó mỗi khi code Vue của ta thay đổi thì ta cần build lại Image. Tức là ta không cần dùng đến file Dockerfile nữa ;)

Còn bây giờ dùng cách này ta không cần build lại image nữa. Chạy **npm install** thì hiển nhiên dù có hay không có Docker ta vẫn phải chạy để cài dependencies rồi, chạy **npm run build** thì cũng là hiển nhiên phải chạy để build project dù có hay không có Docker rồi. Điều khác biệt chút chút là giờ ta chạy nó với command:
```
docker run --rm -v $(pwd):/app -w /app node:16-alpine npm install && npm run build
```

Và cuối cùng là khởi động project được luôn

----------
KHÔNGGGGGGG :sob::sob:, dùng cách này tự nhiên ở môi trường gốc bên ngoài của tôi lại có **node_modules** và **dist**, nó làm môi trường gốc của tôi không còn "trinh trắng" nữa. Cái gì bên trong Docker thì hay cứ ở bên trong đó đi...

Nếu việc ta **mount** từ folder bên ngoài vào trong container làm bên ngoài xuất hiện thêm nhiều file làm các bạn thấy không muốn thì các bạn có thể quay lại cách build Image với 2 stages như đầu bài ta đã làm.

Các bạn tuỳ chọn cách làm mà các bạn thấy thích hợp nhất nhé.

> Nhưng các bạn ạ, cái gì "trong trắng" quá chưa hẳn tốt, vì thế mà có một số bộ phận thanh niên hiện nay có khẩu vị mặn đó là "fall in love" với các chị hơn tuổi từng trải :joy::joy:
## Lúc nào cũng dùng cách này có được không?
Thì cách này theo mình thấy dùng được cho các project khi chạy hoặc build không cần cấu hình nhiều, các project chuyên về frontend, không dính dáng tí backend nào, kiểu react, vue, angular, ember,... đều chơi được

Còn các project có backend thì thường ta sẽ cần setup nhiều bước và nhiều thứ lằng nhằng nên cách này sẽ khó đáp ứng được
# Thay đổi code bên ngoài F5 trình duyệt không thấy thay đổi????
Như các bạn có thể thấy ở trong bài khi build image, trong Dockerfile chúng ta chỉ chạy `npm run build` để build app duy nhất 1 lần và dùng kết quả đó để chạy, do đó khi các bạn thay đổi code bên ngoài thì bên trong không đổi dẫn tới F5 trình duỵệt không thấy gì.

Thế vậy map volume toàn bộ code từ bên ngoài vào là được đúng không............. ;) Khồnggggg, nếu ta chỉ map code từ bên ngoài vào thì khi ta thay đổi, code bên trong container cũng thay đổi, nhưng chúng không được build lại. Chúng ta phải làm sao chạy được `npm run serve` để nó lắng nghe code thay đổi và build lại bất kì khi nào ta đổi code. Các bạn làm như sau nhé.

Ở `Dockerfile` của folder `docker-vue` các bạn sửa lại toàn bộ như sau:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "serve"]
```
Ở đây ta đã bỏ đi chỉ còn 1 chút tí tẹo, để chạy `npm install` và chạy `npm run serve` để theo dõi code thay đổi và tự động build lại nhé.

Tiếp theo ta build lại image nhé:
```
docker build -t learning-docker/vue:v1 .
```

Tiếp đó ở `docker-compose.yml` các bạn sửa lại như sau:
```yaml
version: "3.4"

services:
  app:
    image: learning-docker/vue:v1
    volumes:
      - ./src:/app/src
    ports:
      - "5000:8080"
    restart: unless-stopped
```
Vì `npm run serve` đã tạo sẵn một server dev ở cổng `8080` nên đó là lí do vì sao ta không cần tới `nginx` làm webserver nữa, và như các bạn có thể thấy giờ ta map vào container port `8080` chứ không phải `80` như với `nginx` nữa.

Cùng với đó các bạn thấy là ta mount volume chỉ mỗi folder `src` vào trong. Tại sao ta không mount tất cả như sau:
```yaml
volumes:
      - ./:/app/
```
Tại saooooooooooooooooooooooooooo?
:triumph::triumph:

Lí do nếu ta mount toàn bộ folder bên ngoài vào trong thì vì bên ngoài không có `node_modules` (bên ngoài ta vẫn còn `trinh` :D ), nên tại thời điểm chạy, toàn bộ bên ngoài sẽ overridde bên trong dẫn tới bên trong mất `node_modules`, vậy nên ta chỉ map cụ thể những folder cần thiết vào trong.

Cuối cùng là mở trình duyệt và test thử nhé các bạn ;):

<img src="https://images.viblo.asia/075a09e2-e831-45d9-a37f-371f69e592c3.gif" alt="Vue_docker" width="800"/>

> Cá nhân mình thấy các này khá là rườm rà cho project Vue/React thuần, tức là chỉ có mỗi frontend. Thường project kiểu này mình dev như bình thường không dùng Docker, chỉ khi nào deploy trên server mới chạy Docker. Nhưng nếu bạn muốn giữ "zin" cho môi trường ngoài thì cách này cũng oke luôn ;)
# Kết bài
May quá cũng viết được một bài tạm gọi là đỡ dài dòng :joy::joy:

Ở bài này các bạn đã biết được cách để dockerize project VueJS và ReactJS như thế nào, và cách làm cũng rất là tương tự với những project "chuyên" frontend khác. Các bạn có thể tìm một project nào đó (Angular chẳng hạn) và thử dockerize xem nhé ;)

Qua bài này có một số nội dung quan trong như sau:
- Cách chia quá trình build Image thành nhiều giai đoạn (stage) và cách COPY các tài nguyên giữa các stage đó
- Cách khởi tạo "container tạm thời" để thực hiện một số tác vụ cần ít thao tác cấu hình
- Cơ bản chút chút về **volumes** để **mount** (ánh xạ) tài nguyên giữa môi trường gốc (bên ngoài) vào bên trong container
- Cùng với đó là chút chút về Nginx là gì, sau này ta sẽ dùng Nginx làm webserver/proxy khá là nhiều đó nhé ;)

Cám ơn các bạn đã theo dõi series của mình, nếu có gì thắc mắc các bạn cứ comment cho mình biết nhé.

Source code bài này mình để [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) (nhánh **complete-tutorial** nhé)

Hẹn gặp lại các bạn ở các bài sau ^^