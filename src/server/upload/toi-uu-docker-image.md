Chào mừng mọi người đã quay trở lại với series [Học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) của mình. :grinning: :grinning:

Ở bài trước chúng ta đã cùng nhau build 1 CICD pipeline cho [automation test](https://viblo.asia/p/automation-test-voi-docker-va-gitlab-ci-yMnKMv2DZ7P) với Docker bằng Gitlab CI. Ở bài này ta cùng nhau dừng lại CICD một chút để tìm hiểu về những cách để tối ưu Docker image, trước khi quay trở lại với những bài cuối cùng về auto deploy với CICD nhé.
  
  Bắt đầu thôi nào :rocket::rocket:
  # Mở đầu
Trong thế giới container thì Dockerfile chính là khởi nguồn, là điểm bắt đầu để ta tạo ra những image là thứ cốt yếu để có thể chạy được các ứng dụng với đa đạng các môi trường (Ubuntu, Alpine, Debian, Centos,...).

Và việc hiểu cách Dockerfile hoạt động, cách tổ chức các thành phần ở Dockerfile, hiểu được `build context` sẽ giúp chúng ta build ra được những image tối ưu, giảm thời gian mỗi lần ta phải chờ khi build image. Một `context` lớn hơn sẽ làm tăng thời gian build, thời gian `pull` và `push` và làm tăng size image.

Dưới đây mình sẽ chia sẻ với các bạn những cách mà mình đã áp dụng và thấy hiệu quả để tối ưu Docker image, ta cùng nhau bắt đầu nhé ;)
# Bắt đầu
## Chuẩn bị
Đầu tiên các bạn clone source code của mình [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) (branch `master`) nhé.

Ở bài này chúng ta cùng lấy folder `secure-docker-node-mongo-redis` để làm ví dụ nhé.

Vào nội dung chính thôi nào :nerd_face::nerd_face:
## Hiểu về build context
Đầu tiên chúng ta sẽ cùng nhau build image từ code có sẵn nhé, các bạn chạy command sau:
```bash
docker build -t learning-docker:node .
```
Thì ngay sau khi ta bấm `Enter` để chạy, quan sát ở Terminal/Command line ta sẽ thấy như sau:
```
Sending build context to Docker daemon  1.303MB
Step 1/6 : FROM node:12.18-alpine
 ---> 18f4bc975732
Step 2/6 : WORKDIR /app
 ---> ce509cea9c52
Step 3/6 : COPY . .
 ---> 348c85ddb14a
Step 4/6 : RUN npm install
 ---> Running in 9f0e6ced2fb4
```
Ta nhận thấy rằng việc đầu tiên xảy ra đó là `build context` (ngữ cảnh) hiện tại sẽ được gửi tới `Docker daemon` - bạn có thể hiểu Docker daemon nó là thứ chạy trên hệ điều hành gốc mà quản lý Docker images, networks, volumes,....

Vậy `build context` ở trên của chúng ta là gì?

Ở command `docker build` bên trên, phía cuối ta có đặt dấu `.` (dấu chấm), đây chính là `build context`, ta đang nói với Docker rằng: context là folder hiện tại - folder mà chúng ta chạy command. 

Và nếu ta không nói gì thì Docker mặc định tự tìm Dockerfile ở trong context và tiến hành build image. Chúng ta có thể đặt Dockerfile và code riêng rẽ ở các folder khác nhau sau  đó ở command build ta chỉ định cụ thể Dockerfile ở đâu và build context là gì thì Docker sẽ hiểu, ví dụ như sau:
```
docker build -t learning-docker -f /a/Dockerfile /b
```
Ở trên ta nói với Docker là: tới folder `/a/Dockerfile` để tìm Dockerfile và đọc folder `/b` để làm build context nhé ;)

Việc hiểu không đúng `build context` có thể dẫn tới lỗi khi build image, image chứa nhiều thành phần thừa không dùng tới và từ đó làm tăng size image

## dockerignore
Ở output Terminal bên trên ta để ý thấy con số `1.303MB`, đây chính là size của `build context` hiện tại bao gồm tất tần tật tất cả các file và folder ở trong build context.

Thế sao ít vậy nhỉ?? có `1.303MB` à, Tôi có thử chạy project ở môi trường ngoài trước, và có chạy `npm install`, đây folder `node_modules` rành rành có ở đây, "how about node_modules????", vì chắc là tất cả ta đều đã được nghe tới một công trình thực nghiệm về những vật thể nặng nhất trong vũ trụ được mô tả cụ thể như hình bên dưới:

![](https://images.viblo.asia/42f94e2d-112c-4e19-956c-e3b407aa98a9.png)

Vậy nên con số `1.303MB` là quá ít :thinking::thinking:

Thì mở đầu khi ta bắt đầu build image, Docker sẽ tìm file `.dockerignore` ở `build context` hiện tại và nếu tìm thấy Docker sẽ bỏ qua tất cả những thứ ta định nghĩa ở trong đó, cú pháp của `.dockerignore` thì tương tự như `.gitignore`.

Dùng `.dockerignore`, ta có thể bỏ qua copy các thành phàn không cần thiết vào image, chỉ giữ lại các thành phần thiết yếu, từ đó giảm được size.

Cùng tìm hiểu kĩ về những gì mình `ignore` ở project này nhé:
- bỏ qua file `.env` không đưa vào container, vì file này ta đọc và gán giá trị trực tiếp từ `docker-compose.yml` rồi
- bỏ qua `.dockerignore`, Dockerfile, docker-compose.yml, README.MD không copy vào container vì cuối cùng app NodeJS của chúng ta không cần tới những file này làm gì cả
- Nếu các bạn có test project này ở môi trường ngoài thì sẽ phải chạy `npm install`, như thế sẽ sinh ra folder `node_modules`, và ở `.dockerignore` mình bỏ qua node_modules ở môi trường ngoài (nếu có), vì ở Dockerfile ta đã có `npm install` rồi.
- Cùng với đó là mình bỏ qua thêm một số file và folder khác

Những thứ còn lại sau khi `ignore` là tổng size của build context của chúng ta nhé.

Vậy có bạn lại thắc mắc: thôi đừng ignore `node_modules` nữa, ta cứ chạy `npm install` ở bên ngoài, lát nữa `COPY` cả folder `node_modules` từ ngoài vào trong cho nhanh, trong Dockerfile cũng chả cần `npm install` nữa, oke không???

Thì điều này rất là không nên nhé các bạn. Vì các thư viện NodeJS sẽ có thể có những dependencies khác nhau với mỗi môi trường khác nhau, cùng với đó là nếu phiên bản NodeJS ở môi trường ngoài và ở Dockerfile chúng ta để là khác nhau và khi chạy app lên sẽ bị báo lỗi `npm` luôn. Vậy nên lời khuyên của mình là luôn ignore `node_modules` ở môi trường ngoài và chạy `npm install` ở Dockerfile nhé 
## Build image với nhiều stage
Ở bài [Dockerize ứng dụng Vue/React](https://viblo.asia/p/dockerize-ung-dung-vuejs-reactjs-ORNZqxwNK0n#_cau-hinh-dockerfile-4), mình đã giải thích kĩ về việc chia quá trình build image ra thành nhiều stage để giảm đáng kể size của image nhờ được việc lược bỏ `node_modules` - vật thể nặng nhất Vũ Trụ :joy::joy:

Thế nhưng trước khi dùng ta cần phải lắc não xem ta có nên dùng hay không thì mới làm nhé các bạn :).

Ví dụ ở bài này, app NodeJS của chúng ta khi chạy thì sẽ luôn cần tới `node_modules` vì cách thư viện đều nằm ở đây cả, do vậy nếu ta bỏ `node_modules` đi thì app sẽ không chạy được nữa đâu nhé. Vậy nên trường hợp này ta cần phải copy cả `node_modules`.

Ta để ý thấy là ở trong bài này thì mình thấy chia nhiều stage cũng không cải thiện gì lắm vì ta không quá đoạn nào cần build code Javascript gì cả. Nhưng ví dụ với app [NestJS](https://nestjs.com/) (framework nodejs khá hot bây giờ) hoặc các app nodejs mà cần build từ source code ta viết ra thành production code (ví dụ thường thấy là code viết bằng typescript), thì ta vẫn có thể chia thành nhiều stage để giảm tối đa size của image, chỉ giữ lại những thành phần cần thiết:
```Dockerfile
FROM node:12.18-alpine as builder
WORKDIR /app
COPY ["package.json", "package-lock.json", "tsconfig.*", "nest-cli.json", "src", "./"]
RUN npm install
RUN npm run build

FROM node:12.18-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/dist ./
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/main"]
```
## Hiểu về Docker layer
Khi Docker build image, Docker sẽ đọc file Dockerfile, và với mỗi 1 "chỉ dẫn" (instruction) ở trong Dockerfile, thì tương ứng sẽ là 1 layer cho image của chúng ta, cụ thể với Dockerfile của project trong bài này:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

COPY . .

RUN npm install

# Production
RUN npm install -g pm2
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Từ Dockerfile ở trên, khi build Docker sẽ tạo ra những layer sau cho image của chúng ta:
- FROM: tạo ra 1 layer từ image `node:12.18-alpine`
- WORKDIR: tạo ra 1 layer từ thư mục `/app`
- COPY: 1 layer khác để copy toàn bộ `build context` hiện tại vào `WORKDIR` hiện tại trong image
- RUN: 1 layer để chạy `npm install`
- RUN: 1 layer khác để cài PM2
- cuối cùng là 1 layer để chạy CMD

Các layer bên trên có thể được quan sát trong quá trình build image ở Terminal như sau:
```
Sending build context to Docker daemon  1.303MB
Step 1/6 : FROM node:12.18-alpine
 ---> 18f4bc975732
Step 2/6 : WORKDIR /app
 ---> Using cache
 ---> ce509cea9c52
Step 3/6 : COPY . .
 ---> 348c85ddb14a
Step 4/6 : RUN npm install
 ---> Running in 9f0e6ced2fb4
```
Ở trên các bạn có thể thấy mỗi layer là 1 `Step`

Nếu image có nhiều layer sẽ dẫn tới việc build image lâu hơn, size to hơn và thậm chí có thể là performance lúc chạy cũng kém hơn nữa.

Oke vậy tôi gộp tất cả các layer vào 1 là được đúng không? giảm xuống số lượng layer cực ít :thinking::thinking:.

Nếu các bạn gộp nhiều command lại vào thành một, thì khả năng rất cao sẽ không tận dụng được Docker cache và từ đó mỗi lần build image sẽ rất lâu (mình sẽ nói ở phần tiếp). Và nhiều layer hơn một chút cũng không có gì khác biệt

Note: Hiện tại Docker chỉ tạo ra layer với các command: `RUN, COPY, ADD`. Với các command khác (`FROM, LABEL,...`) thì Docker sẽ tạo ra container "tạm thời", từ đó sẽ không làm tăng size image
## Docker layer caching
> Đây là cách giảm rất nhiều thời gian chờ đợi khi build image ;)

Nếu các bạn để ý, với ví dụ project trong bài này mỗi khi ta sửa code, dù chỉ là xíu xiu sau đó build lại image thì quá trình build cũng rất lâu, lí do là 2 layer `npm install` và `npm install -g pm2` cứ phải chạy đi chạy lại.

Mặc định nếu ta không nói gì thì Docker sẽ tự động tìm trong cache và khi trong quá trình build image, Docker sẽ so sánh cache với Dockerfile và nếu tại bất kì layer nào có sự thay đổi thì kể từ đó đến về sau sẽ không còn được cache nữa.

Ở project bài này, vì khi ta sửa code -> layer `COPY . .` thay đổi, do vậy từ đó về sau không còn được cache nữa và build image rất lâu.

Do đó nếu chúng ta biết cách tổ chức Dockerfile, sắp xếp cách thành phần ít khi thay đổi lên trên và thành phần thường xuyên thay đổi xuống dưới, thì quá trình build image sẽ giảm đi đáng kể.

Ta cùng sửa lại Dockerfile ở bài này như sau nhé:
```Dockerfile
FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Ở trên đầu tiên ta nhận thấy là app của chúng ta sẽ cần tới PM2 để chạy dù thế nào, do đó ta đặt nó lên đầu

Tiếp theo ta copy trước 2 file `package.json` và `package.lock.json` vì 2 file này ít khi thay đổi đồng thời chỉ cần 2 file này là đủ để ta có thể chạy `npm install`

Tiếp đó ta nhận thấy là ở trong `package.json` thì chỉ có `dependencies` là thực sự cần để chạy được app của chúng ta, còn `devDependencies` chỉ phục vụ cho mục đích chạy ở local, do vậy ta thêm vào option `--production` ý bảo chỉ cài các thư viện khai báo ở `dependencies` nhé. Mình để thêm option `--silent` để lược bỏ bớt log in ra ở terminal

Sau đó là ta mới copy source code từ ngoài vào trong bằng `COPY . .` vì phần này sẽ thường xuyên thay đổi nên ta đặt gần xuống cuối.

Cuối cùng command `pm2-runtime` thì ta luôn phải đặt dưới cùng rồi.

Oke giờ ta thử test xem nhé ;)

Đầu tiên ta tiến hành build image:
```
docker build -t learning-docker:node .
```
Lần đầu build, tốc độ khá là chậm, vì phải chạy qua tất cả các layer:
```
Sending build context to Docker daemon  1.303MB
Step 1/7 : FROM node:12.18-alpine
 ---> 18f4bc975732
Step 2/7 : WORKDIR /app
 ---> Running in b48ffbaf14a7
Removing intermediate container b48ffbaf14a7
 ---> ff6d226be940
Step 3/7 : RUN npm install -g pm2
 ---> Running in 44e62bfec806
 
 .....
```
Sau khi build xong, ta thử cập nhật lại code một chút, các bạn mở file `app.js`, ở đoạn `connectWithRetry`, ta sửa lại message nếu kết nối tới MongoDB bị lỗi như sau:
```js
const connectWithRetry = function () { // when using with docker, at the time we up containers. Mongodb take few seconds to starting, during that time NodeJS server will try to connect MongoDB until success.
  return mongoose.connect(mongoUrl, { useNewUrlParser: true, useFindAndModify: false }, (err) => {
    if (err) {
      console.error('Hello World - Failed to connect to mongo on startup - retrying in 5 sec', err)
      setTimeout(connectWithRetry, 5000)
    }
  })
}
```
Sau đó ta tiến hành build lại image lần nữa:
```
docker build -t learning-docker:node .
```
Giờ ta quan sát ở Terminal nhé:
```
Sending build context to Docker daemon  1.303MB
Step 1/7 : FROM node:12.18-alpine
 ---> 18f4bc975732
Step 2/7 : WORKDIR /app
 ---> Using cache
 ---> ff6d226be940
Step 3/7 : RUN npm install -g pm2
 ---> Using cache
 ---> f9c7db28a6a6
Step 4/7 : COPY ["package.json", "package-lock.json*", "./"]
 ---> Using cache
 ---> db66cca4a30e
Step 5/7 : RUN npm install --production --silent
 ---> Using cache
 ---> a12e2a9e52d8
Step 6/7 : COPY . .
 ---> 59da94f6d125
Step 7/7 : CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
 ---> Running in 4efd66d38900
Removing intermediate container 4efd66d38900
 ---> 0557c2cd1f46
Successfully built 0557c2cd1f46
Successfully tagged learning-docker:node
```
Các bạn có thể thấy là từ Step 2 tới Step 5 thì Docker đều sử dụng layer từ trong cache, đến Step 6 vì code của ta thay đổi nên layer `COPY . .` cần phải chạy lại. Thời gian build image giảm đột biến cực nhanh.

> Note ở phần trước mình đã nói chỉ `RUN, COPY, ADD` mới tạo ra layer còn các command khác như `FROM` chỉ là tạm thời và không ảnh hưởng nhé

Tiếp tục ta thử thêm 1 thư viện vào `package.json` xem nhé, ở `dependencies` các bạn thêm vào cuối một thư viện như sau:
```
"mime-types": "^2.1.27"
```
Ta lưu lại, sau đó tiến hành build lại image:
```
docker build -t learning-docker:node .
```
Quan sát Terminal và đúng như dự đoán, kể từ đoạn copy `package.json` là đã không còn được cache nữa vì Docker đã thấy có sự thay đổi:
```
Sending build context to Docker daemon  1.303MB
Step 1/7 : FROM node:12.18-alpine
 ---> 18f4bc975732
Step 2/7 : WORKDIR /app
 ---> Using cache
 ---> ff6d226be940
Step 3/7 : RUN npm install -g pm2
 ---> Using cache
 ---> f9c7db28a6a6
Step 4/7 : COPY ["package.json", "package-lock.json*", "./"]
 ---> 55b78ab8aa82
Step 5/7 : RUN npm install --production --silent
 ---> Running in 73e160640019
 
 ...
```
>Note: nếu các bạn không muốn cache thì ở command build image các bạn truyền thêm 1 option là `--no-cache` nhé

## Build image với BuildKit
Từ phiên bản Docker 18.06, Docker đã thêm vào 1 tính năng tên là BuildKit tăng hiệu năng trong quá trình build image, giảm thời gian build.

Để sử dụng BuildKit các bạn đơn giản làm như sau:
```
DOCKER_BUILDKIT=1 docker build -t learning-docker:node .
```
Thời gian build cũng giảm đi được đáng kể đó, các bạn thử so sánh khi build `--no-cache` cách bình thường và với BuildKit để biết rõ nhé 

![](https://images.viblo.asia/d4579ee9-41e3-459b-8341-bfe6fe5e2f02.png)

> Hiện tại 03/2021 ở bản Docker 20.10 thì mặc định khi build image Docker sẽ luôn dùng BUILD KIT, ta không cần  `DOCKER_BUILDKIT=1` nữa (theo quan sát mình thấy tốc độ build khá là bàn thờ :D)

## Không cài thừa thãi package
Ta chỉ nên cài các thư viện/package cần thiết đủ để project của chúng ta chạy được, các bạn không nên cài các thứ khác nếu không thực sự dùng tới ví dụ `ca-certificates`, `git`. Điều này sẽ làm tăng độ phức tạp image, tăng thời gian build, tăng size.

Đừng cài chỉ đơn giản vì "nice-to-have" - "có còn hơn không" ;)
## Tách ứng dụng ra thành các thành phần riêng biệt
Ở ví dụ bài này chúng ta có 1 project NodeJS với MongoDB làm database và Redis để lưu session của user. Các bạn mở file `docker-compose.yml` và ta có 3 services, tương ứng với 3 container sẽ được chạy: `app, db và redis`. Mỗi container có image riêng, volume riêng. Tổng hợp 3 services đó ta có 1 ứng dụng hoàn chỉnh.

Thế nếu bây giờ ta gộp 3 services đó thành 1, tức là ta tạo ra 1 image có cả Nodejs, MongoDB và Redis có được không?? Ví dụ như sau:
```Dockerfile
FROM alpine:3.12

<Cài NodeJS, chạy npm install, cài pm2,....>

<Cài MongoDB, khởi động MongoDB>

<Cài + khởi động Redis>

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```
Về lý thuyết thì việc này hoàn toàn được. Nhưng như thế các thành phần ứng dụng của chúng ta bị phụ thuộc chặt chẽ vào nhau. Khi 1 cái thay đổi dẫn tới cả image phải build lại. Và chỉ riêng cài NodeJS thôi, các bạn có thể thử copy Dockerfile của NodeJS Alpine [ở đây](https://github.com/nodejs/docker-node/blob/afee5ceeb1c4589385223a67bbbdaac3522e31cb/14/alpine3.10/Dockerfile) và tự build, sẽ thấy thời gian build phải nói là hàng thế kỉiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii. :D, chưa nói tới MongoDB và Redis. Một thành phần phía trên thay đổi thì Docker layer caching sẽ không được áp dụng và các bạn sẽ mất đi 1 thế kỉ để đợi :rofl::rofl:

Tiếp nữa, thường thì Database và Redis sẽ là thành phần ít khi bị thay đổi, thường chỉ có App của chúng ta cập nhật liên tục, do vậy gộp chung 3 thành phần lại sẽ làm ảnh hưởng lớn tới quá trình deploy.

Thứ nữa là khi chúng ta scale horizontally, thì toàn bộ các thành phần đều scale, trong khi ta thường chỉ muốn scale 1 thứ, ví dụ request tăng đột biến vào backend `NodeJS` và ta thường chỉ muốn scale backend lên, chứ không muốn scale cả `MongoDB` và `Redis` dẫn tới việc thiếu tài nguyên và khó quản lý. Và những container như MongoDB là dạng `stateful` container, tức là nó vừa có data của riêng nó (mount volume), data của nó lại vừa được đọc bởi những thành phần khác (đọc bởi backend `NodeJS`), việc scale và quản lý khá là khoai, không cẩn thận sẽ `break` cả ứng dụng. Thứ nữa là với MongoDB, nếu ta chỉ scale đơn thuần (tăng số container lên) thì khả năng là không được vì khi chạy MongoDB  `lock` database và chỉ cho 1 instance đảm nhận trách quản trị/đọc/ghi vào database, do vậy nên người ta thường chạy Mongo ở chế độ `replicaset` thì mới dễ scale được.

Vậy nên mình khuyến khích các bạn nên chia các thành phần ứng dụng ra thành các container riêng, mỗi cái tập trung vào 1 nhiệm vụ cụ thể của nó, vừa dễ quản lý, cập nhật/thay đổi, nhìn vào `docker-compose.yml` ta cũng có 1 cái nhìn tổng quát về những thứ làm nên ứng dụng ;).

---
**Bonus**

Nhân tiện bên trên mình có nói tới `scale horizontally`, cho những bạn nào chưa biết hoặc trước giờ nghe tới từ này mà chưa hiểu hoặc bận chưa tìm hiểu nó là gì. Thì `horizontal scale`(danh từ) hoặc `scale horizontally`(động từ) là việc scale mà ở đó chúng ta thêm vào nhiều thực thể của ứng dụng. Ví dụ: khi ta nói scale horizontally cho service `app`, tức là ta sẽ chạy nhiều thực thể của service `app` - đồng nghĩa với việc ta sẽ có nhiều container `app` giống y hệt nhau.

Đối nghịch với `horizontal` thì ta có `vertical`, vertical là kiểu scale mà ta "tăng thêm sức mạnh" cho app của chúng ta. Ví dụ ta cho phép service `app` được truy cập nhiều tài nguyên RAM + CPU hơn để có thể xử lý được nhiều hơn.

> Nếu bạn nào dùng [Kubernetes](https://kubernetes.io/) thì chắc sẽ biết về điều này với [Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) :)

## Dùng official image
Bất kì khi nào nếu có thể thì các bạn cũng nên dùng official Docker image nhé. Vì việc dùng các image được support officially sẽ giúp ta yên tâm về sự an toàn của image, đảm bảo image được build và test cẩn thận, không chứa các thành phần thừa thãi/độc hại. Và nếu có thể nữa thì các bạn nên dùng image thuộc bản phân phối Alpine nhé, size sẽ giảm đi đáng kể, trong khi vẫn hoạt động như 1 image Linux đầy đủ.

Ví dụ dùng python thì lên google gõ `Docker python`, NodeJS thì gõ `Docker node`,.... Rồi chọn kết qủa đầu tiên (thường là official image). 

Các bạn cũng có thể dựa vào số lượt pull của image để "tạm đánh giá" về mức độ tin cậy của nó (như là Star trên Github vậy):

![](https://images.viblo.asia/9524bf41-777b-4d93-90ad-1a075afb2f63.png)

Ví dụ ở trên ta có image NodeJS với hơn 1 tỉ lượt pull về :hushed::hushed:

Một địa chỉ quen thuộc của mình khác đó là các image của [Bitnami](https://hub.docker.com/u/bitnami). Những image của Bitnami phải nói là thực sự chất lượng, được chăm sóc tỉ mỉ đầy đủ, tất cả đều chạy bằng non-root user, được setup sẵn các thông số cụ thể cho development và production, và điều quan trọng đó là họ cập nhật rất đều đặn tất cả các images. 
> Nếu bạn nào dùng Kubernetes và [Helm](https://helm.sh/) chắc đã và đang sử dụng [Chart của Bitnami](https://github.com/bitnami/charts)

![](https://images.viblo.asia/0dd2e3ab-7d34-4630-a364-cabda1d6f935.png)

## Chú ý khi chạy APT-GET / APK add...
Khi ta cần cài các system package với `apt-get` (Debian/Ubuntu) hay `apk add`(Alpine) , `yum install..`(Centos).... thì các bạn nên gộp các package lại để tránh việc có nhiều layer nhé. Ví dụ như sau:
```Dockerfile
RUN apt-get update && apt-get install -y \
  bzr \
  cvs \
  git \
  mercurial \
  subversion
```
Các bạn nhớ để option `-y` vào nhé, để tự Agree khi được hỏi "có chắc chắn muốn cài các package này", nếu không sẽ bị treo lúc build image nhé.

Thứ nữa là ta **luôn luôn** chạy `update` cùng với `install` giống như ở trên nhé. Ví dụ cụ thể như sau, trong Dockerfile ta có:
```Dockerfile
FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install -y curl
```
Sau khi build image, thì tất cả các layer đã được Docker lưu vào cache, và nếu lát nữa ta có nhớ ra là cần cài thêm `nginx` và ta làm như sau:
```Dockerfile
FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install -y curl nginx
```
Thì Docker sẽ thấy  layer `RUN apt-get update` không có gì thay nên sẽ lấy luôn từ cache, mà chỉ chạy lại command sau. Dẫn tới việc các bạn có thể sẽ cài phải `nginx` phiên bản cũ. Để tránh việc này các bạn cũng có thể truyền cụ thể version của package cần cài vào thì khỏi lo bị cài phải package cũ nữa nhé, ví dụ:
```Dockerfile
FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install -y curl nginx=1.14
```
## Chạy container với non-root User
Ứng dụng ta chạy trong container môi trường Linux thì cũng nên được "đối xử" như là môi trường Linux bình thường bên ngoài.

Và đã là Linux thì khi chạy ứng dụng thì luôn nên chỉ dùng user có vừa đủ quyền, thay vì phang permission `777` hoặc chạy với `root`, thì với Docker  ta có thể chỉ định cụ thể 1 user chạy ứng dụng như sau:
```Dockerfile
USER myuser
# các layer kể từ sau layer trên sẽ được chạy dưới quyền "myuser"

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
```

Thế nhưng đời không như là mơ, nếu không cẩn thận và mập mờ áp dụng thì khả năng rất cao ta sẽ bị lỗi "permission denied" khi chạy container, trường hợp hay gặp nhất là khi map volume và làm các files trong container có quyền lung tung cả. Thực ra nếu hiểu vấn đề là gì thì những cái này cũng "là muỗi" thôi :joy::joy:.

Bài tới mình sẽ viết về vấn đề này và ta cũng xem kĩ hơn nhé.
## Vài điểm nữa...
Ngoài ra còn 1 số điểm ta cần lưu ý nữa:
- Luôn dùng `COPY` thay vì `ADD` để làm rõ bạn đang muốn làm gì. Mình đã giải thích kĩ [ở đây](https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG#_toi-search-google-thay-nguoi-ta-dung-add-de-copy-file-19)
- `WORKDIR` nên luôn luôn là đường dẫn tuyệt đối (absolute path), ví dụ `/a/b/c` thay vì tương đối (relative path) ví dụ `./d/e/f`, để làm rõ và không gây mập mờ
- Thêm `LABEL` để mô tả kĩ hơn về image của bạn, ví dụ:
```Dockerfile
LABEL maintainer="Mai Trung Duc (maitrungduc1410@example.com)"
```

# Đóng máy
Qua bài này ta đã có nhiều góc nhìn hơn về việc build image sao cho tối ưu, tiết kiệm thời gian, giảm size image, mong rằng từ đó các bạn có thể hiểu hơn và áp dụng vào cho công việc của riêng mình.

Nếu có gì thắc mắc thì để lại comment cho mình nhé. Hẹn gặp lại các bạn vào những bài sau ^^.