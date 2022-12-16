Hello các bạn lại là mình đây... :D :D

Lâu lắm rồi mới lại được ngồi viết blog, hơn nửa năm rồi ;(.  Có ai nhớ mình ko, các bạn hãy nói là có đi cho mình đỡ cảm thấy quê :laughing::laughing:

Thời gian vừa rồi mặc không được viết blog để chia sẻ với các bạn nhiều nhưng bù lại thì trong quá trình làm việc và giúp đỡ nhiều bạn chập chững làm quen với Docker mình nhận thấy có nhiều vấn đề các bạn chưa thực sự hiểu để có thể áp dụng vào project riêng hoặc cho công việc của từng người. 

Ở bài này chúng ta sẽ cùng nhau tìm hiểu các để viết build được một Docker image tối ưu, production-ready cùng với đó là tăng tốc độ build image ở các môi trường khác nhau (local và CI) nhé.

> Bài này bạn có thể xem nó như là 1 bài chi tiết và cụ thể thực tế hơn của bài [Tối ưu Docker image](https://viblo.asia/p/toi-uu-docker-image-Eb85o9D4Z2G) ;)

# Setup
Đầu tiên các bạn clone source code của mình [ở đây](https://gitlab.com/maitrungduc1410/learning-docker). Ở bài này chúng ta chỉ quan tâm tới folder **docker-optimize-image** thôi nhé.

Tổng quan, bài này mình có setup sẵn cho các bạn 1 project lấy từ source code của [NextJS Ecommerce](https://github.com/vercel/commerce). Mình muốn tìm 1 project nào đó nặng nặng chút giống giống thực tế chút mà tìm mãi ko thấy cái nào thực sự ưng ý (project thật thì ko share lên đây đc rồi :joy::joy::joy:), nên chọn project này vậy.

Sau khi clone về các bạn chạy `yarn install` sau đó chạy `yarn dev` để start project mình kiểm tra trước là mọi thứ vẫn chạy ổn định nhé. Khi mở trình duyệt các bạn sẽ thấy nó show như sau:

![](https://images.viblo.asia/3ed2fb67-d4c1-400b-856b-fad38913c6e8.png)

Web "nhà người ta" làm nom chất lượng nhỉ, nổi bật, hiện đại, mượt, màu sắc đẹp. Ôi mà thôi mình lại chuẩn bị lan man đấy :D
# Dockerize project
Đầu tiên chúng ta sẽ cùng nhau "dockerize" project này nhé.

> Cho bạn nào chưa biết thì "dockerize" (động từ) ý chỉ việc bạn **đóng gói (package), deploy và chạy app trong môi trường container**

Đầu tiên các bạn tạo cho mình `Dockerfile` ở trong folder hiện tại (`docker-optimize-image`) nhé:

```dockerfile
FROM node:14-alpine

# Đặt đường dẫn trong container nơi ta sẽ đưa code vào
WORKDIR /app

# Copy toàn bộ code ở thư mục hiện tại trên môi trường gốc -> vào đường dẫn hiện tại trong container (/app)
COPY . .

# Cài dependencies cho project -> build project -> start project
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
```
Trông có vẻ tương đối đơn giản và dễ hiểu phải ko các bạn, toàn kiến thức cũ ko à :D

Tiếp theo trước khi build các bạn thêm cho mình file `.dockerignore` nhé (ta ko muốn copy cả folder `node_modules` to tổ bố từ môi trường ngoài lúc build image đâu phải ko ;)):
```
node_modules

# .next là folder build do Next tạo ra
# (nếu trước đó bạn đã chạy thử ở môi trường ngoài thì sẽ thấy)
.next
.vscode
```
Âu cây nom có vẻ ổn rồi đó tiến hành build image thôi nào:
```
docker build -t test-nextjs .
```
Trong thời gian ngồi chờ hít đất đôi chục cái lấy sức khoẻ vượt qua dịch bệnh nàooooo 💪 💪💪

Sau vài phút quay trở lại kiểm tra terminal để đảm bảo mọi thứ đã thành công hay chưa nhé:

![](https://images.viblo.asia/c2c2e6af-96fc-469c-893d-030c4b52122c.png)

Ta chạy thử image mới build lên thôi nào:
```
docker run -it -p 3000:3000 test-nextjs
```
> ở bên trên khi chạy mình thêm option `-it`mục đích là muốn chạy container như 1 interactive process (1 tiến trình có thể tương tác được) để lát nữa ta có thể stop container bằng cách bấm CTRL-C (hoặc CTRL-Z, CTRL-D), không thì lát nữa container nó sẽ "ko chịu" tắt kể cả khi ta tắt terminal  :D

Sau đó ta mở trình duyệt ở `http://localhost:3000` sẽ thấy điều tương tự ta đã làm ở phần setup đầu tiên trong bài này nhé

Bắt đầu vào chủ đề chính của bài hôm nay thôi nào ;)

# Tăng tốc độ build image
## Tận dụng docker layer caching
Đầu tiên các bạn thêm vào cuối file `pages/_app.tsx` 1 dòng `console.log` bất kì như sau:
```js
console.log('Hello world')
```
Sau đó ta tiến hành build lại image:
```
docker build -t test-nextjs .
```
Quan sát ở cửa sổ Terminal ta sẽ thấy như sau:

![](https://images.viblo.asia/bd0780ee-b634-4b3e-9b48-95722381851a.png)

Docker đã vừa thực hiện lại toàn bộ các bước ta định nghĩa trong Dockerfile: copy, install, build, run... mất vài phút mới chạy xong được

Ta lại tiếp tục thêm vào file `pages/_app.tsx` 1 dòng console.log nữa:
```js
console.log('Hello world')
console.log('Nice to meet you')
```
Sau đó ta lại tiếp tục build image, và lại để ý terminal thấy rằng ta vẫn phải chờ mất phút lận để Docker làm đi làm lại những công việc ta khai báo ở Dockerfile.

Điều này hết sức mất thời gian đặc biệt là trong các dự án thực tế khi codebase lớn, dependencies nhiều, cài lâu, build lâu có khi tới cả 20-30' , 1 tiếng mới xong. Làm tốn resource, tăng thời gian chờ, đặc biệt nếu ta đang muốn test cái gì đó ở local chẳng hạn, cứ thêm 1 dòng `console.log` lại chờ vài phút :cry::cry:

Và để khắc phục điều này thì Docker mang lại cho chúng ta 1 tính năng cực hữu ích gọi là **Docker layer caching**. Docker coi mỗi dòng lệnh ta khai báo ở trong Dockerfile  như là 1 instruction - chỉ dẫn, các instruction `RUN, COPY, ADD`  tạo ra các **layer**.

Khi ta build image, docker sẽ đọc từng dòng trong Dockerfile, nếu thấy layer nào ko thay đổi, đã có từ những lần build trước thì Docker sẽ tận dụng luôn chứ ko chạy lại nữa, do vậy nếu ta biết cách tổ chức Dockerfile, **đưa các thành phần ít thay đổi lên trên, thành phần hay thay đổi xuống dưới** thì sẽ tạn dụng được tính năng tuyệt vời này và giảm đáng kể thời gian ngồi chờ build image.

Và để làm được điều này thì sẽ thật tuyệt vời nếu ta có sự hiểu biết về project mà chúng ta đang dockerize (đây là lí do vì sao mình thấy application developer - frontend/backend mà biết thêm docker thường viết Dockerfile "có vẻ" xịn hơn mấy a chuyên Devops, vì họ thực sự hiểu cái họ đang làm, app của họ cần gì, cái gì có thể lược bỏ..., sorry các a Devops e ko có ý kì thị :D).

Ta cùng phân tích 1 chút nhé: 
- bài này project của chúng là NextJS - cũng là project javascript như bao project khác, thành phần hay thay đổi nhất đó là source code, còn dependencies (trong `package.json` sẽ ít thay đổi hơn nhiều, không phải lúc nào ta cũng cài thêm package (đâu nhỉ :D). 
- thế nhưng khi nhìn lại Dockerfile, ta thấy rằng bước `COPY . .` copy toàn bộ source từ bên ngoài vào trong container lại được đặt ngay trên đầu. Dẫn tới việc khi có bất kì thay đổi nào trong source code thì toàn bộ các bước từ đó trở về sau phải chạy lại, mà các bạn biết đấy, project frontend càng to thì `npm install (yarn install)`sẽ càng ngày càng nặng nề, mất rất nhiều tgian, đặc biệt các bạn trên windows nữa, chạy rất lâu

Từ những quan sát đó ta tổ chức lại Dockerfile 1 chút như sau:
- Ban đầu chỉ cần copy file `package.json` và `yarn.lock` vào trong container để chạy `yarn install` là đủ để ta có `node_modules`
- Sau đó ta hẵng copy source code vào.
- Vì bước build và start luôn cần làm sau bước copy source code nên ta không thể thay đổi sự tình hơn được nữa :D

Âu cây ta bắt đầu làm thôi, đầu tiên các bạn thêm vào `pages/_app.tsx` 1 dòng `console.log` nữa nhé:
```js
console.log('Hello world')
console.log('Nice to meet you')
console.log('My name is James') // -> thêm dòng này vào, đổi thành tên của bạn nhé ;)
```

Sau đó các bạn update lại Dockerfile với nội dung như sau nhé:
```dockerfile
FROM node:14-alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "start"]
```
Phần code bên trên chắc mình không cần giải thích lại đâu nhỉ ;)

Sau đó ta tiến hành build lại image thôi nhé:
```
docker build -t test-nextjs .
```
Các bạn để ý rằng vì ta vừa sửa gần như toàn bộ Dockerfile nên lần đầu tiên build này thì tốc độ vẫn chậm.

Tiếp theo đó, ta quay lại code (`pages/_app.tsx`)
, tiếp tục sửa:
```js
console.log('Hello world')
console.log('Nice to meet you')
console.log('My name is James')
console.log('How are you') // thêm dòng này
```
Sau đó ta build lại image và để ý terminal sẽ thấy như sau:

![](https://images.viblo.asia/319aecaf-b524-44ef-aaed-edf7db7cdd2b.png)

Như các bạn thấy trên hình, Docker đã tận dụng `CACHED` cho tất cả các `instruction` phía trước dòng `COPY`, nhờ thế ta không cần phải chờ để chạy lại những thứ mà không thực sự thay đổi nữa. 🤩🤩

Vì đây là project demo nên trong Dockerfile cũng ko có gì nhiều lắm, nhưng ở các project thật, khi mà ta có hàng loạt thứ phải làm trong Dockerfile, thời gian build hoàn chỉnh rất lâu, đó là khi docker layer caching lên tiếng ;)

Mình luôn khuyến khích các bạn luôn chú trọng việc tổ chức Dockerfile sao cho quá trình build được tối ưu, cho ra những image chất lượng, thay vì chỉ "làm cho nó chạy là được". Ta sẽ cùng thảo luận tiếp ở các phần sau trong bài này nhé.

## Tận dụng cache từ image có sẵn
Lấy 1 ví dụ cụ thể xảy ra chính với mình:

1. khi mình build docker image trên github action, bởi vì mỗi lần build là 1 môi trường mới hoàn toàn, nên docker layer caching trở nên vô dụng, vì trước đó trên môi trường đó ta đã build image được lần nào đâu mà có cache
2. hoặc khi mình setup github Runners trên Kubernetes (K8S), cũng để build image thì vì 1 Kubernetes Cluster nó bao gồm nhiều node, nên nếu giữa 2 jobs của mình ko được chạy trên cùng 1 node thì docker layer caching cũng ko đc tận dụng. nếu "may mắn" 2 job liên tục chạy trên cùng 1 node thì mới được. Tỉ lệ đó càng ít hơn nếu như ta có càng nhiều node.

> Việc lựa chọn build image trên K8S cluster về sau còn giúp mình nhận ra đó là 1 thảm hoạ vì các vấn đề râu ria nó gây ra cho cluster của mình luôn ấy. Thôi mình ko chia sẻ vào đây vì hơi lan man, bạn nào muốn tìm hiểu thêm thì ping mình nhé :D

Ở cả 2 ví dụ trên ta thấy rằng, trong các môi trường CICD thì việc tận dụng được docker layer caching có vẻ ít khả thi vì trong môi trường CICD thường ta luôn làm sao để có được môi trường clean - sạch sẽ nhất cho mỗi lần chạy.

> Việc chờ đợi này sẽ thật sự gây khó chịu trong các project lớn dần, nhiều người, code push liên tục.

Và thật may Docker support cho chúng ta một tính năng cũng rất hữu dụng nữa đó là truyền vào option `--cache-from` khi build Docker image, ở đó ta có thể chỉ định rõ 1 image nào đó làm "gốc" để khi build Docker sẽ dựa vào đó và bỏ qua các phần nào ko cần thiết.

Okay ta cùng bắt đầu thôi nhé. Đầu tiên các bạn giúp mình tạo 1 repo mới trên Gitlab, bạn nào chưa có tài khoản gitlab thì tạo 1 cái nhé. Đặt tên repo là **docker-cache-from** cho dễ gợi nhớ tới những gì ta sắp làm (dù nghe hơi chuối :D)

Sau đó ta copy folder **docker-optimize-image** ra một nơi nào đó bất kì trên máy của các bạn để push lên repo mới nhé.

Ta chạy lần lượt các command sau để commit folder kia lên repo gitlab:
```bash
git init
git add .
git commit -m "first commit"

# thay tên username của các bạn vào nhé
git remote add origin https://gitlab.com/maitrungduc1410/docker-cache-from.git

git push -u origin master
```
Sau khi push xong nhớ quay lại gitlab kiểm tra là code của các bạn đã có trên đó rồi nhé (branch **master** nhé, nhiều lúc nó show branch `main` đó :))

Tiếp theo đây ở local, ta tạo file `.gitlab-ci.yml` để cấu hình gitlab CICD và build image trên đó nhé:
```yaml
image: docker:20

services:
  - docker:20-dind

stages:
  - build

build:
  stage: build
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_NAME || true
    - >
      docker build
      --cache-from $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_NAME
      --tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

    # Tag thêm 1 image với tag là branch hiện tại để làm cache cho các lần build sau ($CI_COMMIT_REF_NAME = branch hiện tại)
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_NAME
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_NAME
```
Ở trên trông có vẻ khá quen thuộc ở các bài về CICD mình đã làm trước đó phải không các bạn ;)

Về cơ bản những thứ có trong file cấu hình bên trên là: trước khi build image thì pull image từ registry về trước (nếu có), sau đó lúc build thì `cache-from` cái image mình vừa pull về để đỡ phải chạy lại các layer nếu không có sự thay đổi gì, cuối cùng là push image lên lại registry (của Gitlab)

Nom có vẻ ổn rồi đó, ta commit code lên và ngồi xem thôi 😎 😎
```
git add .
git commit -m "ci: add gitlab cicd"
git push origin master
```
Đảm bảo là sau khi commit các bạn thấy pipeline đang chạy rồi nhé:

![](https://images.viblo.asia/cb332178-a20b-416f-9f27-0099b137d543.png)

Chờ vài phút, các bạn sẽ thấy job báo hoàn tất:

![](https://images.viblo.asia/431993bd-73fa-457d-b37f-c98e6b5372d2.png)

Click vào xem chi tiết ta để ý thấy rằng, vì đây là lần build đầu tiên, chưa có image nào được push lên registry trước đó, nên bước ta pull image trước khi build về không có tác dụng gì cả

![](https://images.viblo.asia/30219b0c-6ce7-428e-a81e-f7be0a412790.png)

và Docker phải thực hiện chạy qua toàn bộ tất cả các layer:

![](https://images.viblo.asia/1b340b15-3855-4fef-ba18-e06400536369.png)

Tiếp tục ta bấm vào nút **Retry** phía góc trên bên phải màn hình để chạy lại job này:

![](https://images.viblo.asia/06b0cc48-5f84-4b6b-8df0-6b25f9fa2caf.png)


Lại chờ cho job chạy xong, ta để ý kết quả như sau:

![](https://images.viblo.asia/b5f44c85-b289-465c-9764-b9cb46a1910d.png)

Ta để ý thấy rằng thời gian để build job thứ 2 đã giảm đi đáng kể. Click vào job thứ 2 đó và xem thì ta sẽ thấy rằng là Docker đã dùng lại các layer của image ta pull về ngay trước đó làm cache, và không tính toán lại các layer đó nữa:

![](https://images.viblo.asia/c9ff601c-c4a8-4aa7-b261-e1763a35c3c5.png)

Nhờ đó thời gian build đã được rút ngắn đi :heart_eyes::heart_eyes::heart_eyes:

Giải pháp này áp dụng được cho tất cả các môi trường dù là Gitlab, Github hay Jenkins, Circle CI,... và thường mình luôn dùng cách này để giảm thời gian chờ đợi chạy CICD cả.

## Note nếu bạn đang dùng BUILDKIT
Thời điểm hiện tại (tháng 9 - 2021) khi cài Docker về máy thì mặc định khi chạy `docker build...` là Docker sẽ dùng BUILD KIT để build với nhiều tính năng mới, mình khuyến khích các bạn luôn dùng BUILDKIT để build image để image được tối ưu hơn và thời gian build giảm đi hơn nữa.

Nhưng cũng có 1 note nhỏ các bạn cần lưu ý nếu muốn dùng `--cache-from` với BUILDKIT.

Đó là khi build image thì các bạn phải thêm tham số (argument) `BUILDKIT_INLINE_CACHE=1` vào thì image của bạn mới có thể được dùng làm "gốc" cho các lần build tiếp theo nếu như bạn muốn dùng BUILDKIT. Nghe khó hiểu nhỉ :D :D.

Đơn giản là bạn update lại command build image như sau giúp mình là được:
```yaml
# gitlab-ci.yml
...

    - >
      DOCKER_BUILDKIT=1 docker build
      --build-arg BUILDKIT_INLINE_CACHE=1
      --cache-from $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_NAME
      --tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      .
```
# Tối giản size của Docker image
Mình để ý thấy rất nhiều ae thường chỉ viết Dockerfile để... cho nó chạy được 😅. Nhiều khi chỉ chỉ dừng lại ở ngay bước đầu tiên trong bài này là dừng lại và roll ra production

Làm vậy cũng chạy được app rồi, nhưng mình nghĩ là mình luôn có thể tạo được image optimize hơn rất nhiều, là tốt nhất để chạy production thì tại sạo lại ko làm chứ nhỉ? phải ko các bạn ;)

Vấn đề size của image lớn có thực sự ảnh hưởng tới performance của app hay không thì mình thấy đây là vấn đề khá là gây tranh cãi :D. Nhưng từ thực tế của bản thân thì mình thấy một số điều như sau nếu image của bạn có size lớn:
- Tốn nhiều bộ nhớ lưu trữ (đương nhiên rồi ;))
- Thời gian startup time (khởi động container) và shutdown time (tắt container) khá lâu, thậm chí lắm lúc treo luôn, rất khó chịu. Mình cảm nhận thấy rõ rệt khi chạy các image 4-5GB
- Build image sẽ lâu hơn, push image lên registry cũng lâu hơn. Lúc build dễ bị failed xảy ra lỗi `No space left on device` mặc dù check thì còn cả mấy trăm GB bộ nhớ
- Thi thoảng "không may" mình có để ý thấy sự chậm chạp nếu so sánh với các image size nhỏ 300-400MB

Nói chung mình thấy cái gì lớn quá cũng không tốt ;) (yo, đầu óc sáng lên nhé các bạn, mình ko nghĩ đen tối gì đâu :D). Và nếu mình có thể build được 1 image nhỏ gọn nhẹ thì tại sao lại không?

Ta cùng bắt đầu nhé. :rocket::rocket::rocket:

Đầu tiên ta kiểm tra size của image hiện tại xem nó đang dư lào, các bạn chạy command:
```
docker images
```
Ta thấy in ra như sau:

![](https://images.viblo.asia/fede4e3d-165b-4fa1-ac0b-813ed5675c5a.png)

Hiện tại size image của mình cỡ 700MB cũng "tương đối" :)
> khi push lên registry thường nó sẽ được nén lại size thực tế trên registry cỡ bằng 1/2->1/3 (250MB)

giờ ta cùng ngồi phân tích lại 1 chút app của chúng ta cái gì thực sự cần khi chạy production nhé:
- mở `package.json` ta thấy rằng có rất nhiều packages ở đó, nhưng thực tế, sau bước `yarn build` thì số package ta thực tế cần không nhiều như thế, nhiều package -> node_modules sẽ to, thậm chí rất to -> size image to
- Sau khi đã `yarn build` project thì cái ta thực tế cần chỉ là folder `.next` hay `public` và `node_modules` mà thôi, các folder khác như `pages`, `lib`... và các file râu ria (.eslint, .prettier...) không cần nữa
- Ta chỉ cần full node_modules tại thời điểm trước lúc `yarn build` thôi, sau đó thì vì ko cần nhiều package nữa nên ta chỉ cần `node_modules` dạng tí hon thôi :D

Âu cây, với những phân tích như vậy thì ta sẽ tiến hành 1 số bước như sau để tổ chức lại Dockerfile:
- Hiện tại tất cả mọi package trong `package.json` đang được đặt ở `dependencies`, ta tách ra cái nào cần cho lúc dev ở local thì đưa nó vào `devDependencies`, lát nữa `yarn build` xong thì loại bỏ nó khỏi `node_modules`
- chia Dockerfile ra thành nhiều stages, giữa các stage ta chỉ COPY những thứ thật cần thiết của stage trước đó làm "gốc" cho stage hiện tại

Ô xờ kê, đầu tiên ta xử lý em `package.json` trước nhé, các bạn update lại với nội dung như sau:
```json
{
  "name": "nextjs-commerce",
  "version": "1.0.0",
  "scripts": {
    "dev": "NODE_OPTIONS='--inspect' next dev",
    "build": "next build",
    "start": "next start",
    "analyze": "BUNDLE_ANALYZE=both yarn build",
    "lint": "next lint",
    "prettier-fix": "prettier --write .",
    "find:unused": "npx next-unused",
    "generate": "graphql-codegen",
    "generate:shopify": "DOTENV_CONFIG_PATH=./.env.local graphql-codegen -r dotenv/config --config framework/shopify/codegen.json",
    "generate:vendure": "graphql-codegen --config framework/vendure/codegen.json",
    "generate:definitions": "node framework/bigcommerce/scripts/generate-definitions.js"
  },
  "sideEffects": false,
  "license": "MIT",
  "engines": {
    "node": ">=14.x"
  },
  "dependencies": {
    "@react-spring/web": "^9.2.1",
    "@vercel/fetch": "^6.1.0",
    "autoprefixer": "^10.2.6",
    "body-scroll-lock": "^3.1.5",
    "classnames": "^2.3.1",
    "cookie": "^0.4.1",
    "email-validator": "^2.0.4",
    "immutability-helper": "^3.1.1",
    "js-cookie": "^2.2.1",
    "keen-slider": "^5.5.1",
    "lodash.debounce": "^4.0.8",
    "lodash.random": "^3.2.0",
    "lodash.throttle": "^4.1.1",
    "next": "^11.0.0",
    "next-seo": "^4.26.0",
    "next-themes": "^0.0.14",
    "postcss": "^8.3.5",
    "postcss-nesting": "^8.0.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-fast-marquee": "^1.1.4",
    "react-merge-refs": "^1.1.0",
    "react-use-measure": "^2.0.4",
    "swell-js": "^4.0.0-next.0",
    "swr": "^0.5.6",
    "tabbable": "^5.2.0",
    "tailwindcss": "^2.2.2",
    "uuidv4": "^6.2.10"
  },
  "devDependencies": {
    "@graphql-codegen/cli": "^1.21.5",
    "@graphql-codegen/schema-ast": "^1.18.3",
    "@graphql-codegen/typescript": "^1.22.2",
    "@graphql-codegen/typescript-operations": "^1.18.1",
    "@next/bundle-analyzer": "^10.2.3",
    "@types/body-scroll-lock": "^2.6.1",
    "@types/cookie": "^0.4.0",
    "@types/js-cookie": "^2.2.6",
    "@types/lodash.debounce": "^4.0.6",
    "@types/lodash.random": "^3.2.6",
    "@types/lodash.throttle": "^4.1.6",
    "@types/node": "^15.12.4",
    "@types/react": "^17.0.8",
    "deepmerge": "^4.2.2",
    "eslint": "^7.31.0",
    "eslint-config-next": "^11.0.1",
    "eslint-config-prettier": "^8.3.0",
    "graphql": "^15.5.1",
    "husky": "^6.0.0",
    "lint-staged": "^11.0.0",
    "postcss-flexbugs-fixes": "^5.0.2",
    "postcss-preset-env": "^6.7.0",
    "prettier": "^2.3.0",
    "typescript": "4.3.4"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "eslint",
      "prettier --write",
      "git add"
    ],
    "**/*.{md,mdx,json}": [
      "prettier --write",
      "git add"
    ]
  },
  "next-unused": {
    "alias": {
      "@lib/*": [
        "lib/*"
      ],
      "@assets/*": [
        "assets/*"
      ],
      "@config/*": [
        "config/*"
      ],
      "@components/*": [
        "components/*"
      ],
      "@utils/*": [
        "utils/*"
      ]
    },
    "debug": true,
    "include": [
      "components",
      "lib",
      "pages"
    ],
    "exclude": [],
    "entrypoints": [
      "pages"
    ]
  }
}
```
Chắc các bạn đang thắc mắc cái nội dung trên làm sao mình biết được cái nào nên đặt vào `devDependencies` cái nào không, thì nội dung file trên là nội dung gốc lấy từ Github của Next Commerce :D, ban đầu mình chủ ý đưa hết nó vào `dependencies` để giải thích cho các bạn phần này

Như các bạn thấy việc đặt cái nào vào `devDependencies`, cái nào vào `dependencies` nó cần có sự chú ý sắp xếp của người install cái package đó, thường ngay tại thời điểm install nó là ta đã có thể biết nó được dùng cho dev hay dùng cho cả production mode rồi đúng ko nào ;). Và cái này thì ai không thực sự code trong project khó mà biết được. Do vậy mình mới bảo vừa code được frontend/backend vừa biết deploy thì nó lợi thế nào :D

Tiếp theo ta tổ chức lại Dockerfile nhé:
```dockerfile
# Install dependencies only when needed
FROM node:14-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:14-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

CMD ["yarn", "start"]
```
Ta cùng xem bên trên có gì nhé:
- Ta có tất cả 3 stages: deps, builder và runner.
- **deps** là stage ta chả làm gì khác ngoài chạy `yarn install` mục đích là để ta có được folder `node_modules` (full node_modules đầy đủ mọi package ở cả `devDependencies` và `dependencies`).
- **builder**: ở đây ta sẽ lấy folder `node_modules` từ stage **deps** và tiến hành build project, ngay sau khi build ta cũng chạy lại `yarn install` 1 lần nữa với option `--production` ý bảo yarn là chỉ giữ lại những package nào được khai báo ở `dependencies` còn cái nào thuộc `devDependencies` thì loại hết nó ra khỏi `node_modules` (bước này giảm size đi đáng kể đó ;))
- **runner**: ở bước này thì đơn giản là ta COPY lấy các thành phần thật sự cần thiết cho production từ stage **builder** và chạy project lên. Ở đây ta cũng tạo user `nextjs` với `UID:GID=1001:1001` để chạy project, mục tiêu là luôn dùng user non-root để chạy app production nhé các bạn ;). Xem bài trước mình đã giải thích [lí do vì sao](https://viblo.asia/p/tai-sao-nen-chay-ung-dung-container-voi-non-root-user-jvEla3VNKkw) nhé

Có vẻ ổn rồi đó ta tiến hành build lại image thôi, ta để tag là `production` để lát ta so sánh với image hiện tại nhé:
```
docker build -t test-nextjs:production .
```

Chờ 1 lúc cho image build xong, lên Tiktok quét tranh thủ xem các idol trên đó có clip mới hay chưa :heart_eyes::heart_eyes::heart_eyes:

Sau khi image build thành công, ta cùng check lại size image mới xem nhé:
```
docker images
```
Và đây là kết quả:

![](https://images.viblo.asia/dedac90f-b380-4176-aaff-6544469d4bb8.png)

Size chỉ còn 1/3 :sunglasses::sunglasses::sunglasses:, quá tuyệt vời

Chỉ sau 1 vài "đường quyền" ta đã biến quả Dockerfile nặng nề ban đầu ra được 1 Dockerfile tốt hơn hẳn cho production, tối giản, nhẹ nhàng, vẫn tận dụng được docker layer caching, chia thành nhiều stages (chạy được cho cả lúc dev ở local luôn - stage `deps`)

> các bạn nhớ chạy thử image `production` lên và truy cập từ trình duyệt để đảm bảo là nó chạy ngon nhé ;)
# Kết bài
Qua bài này hi vọng rằng các bạn có được cái nhìn kĩ hơn về cách để build được những image chất lượng cho production.

Cùng với đó ta thấy được ích lợi nếu như các bạn đang là frontend/backend/fullstack developer và phải dockerize cho project mà các bạn đang làm, các bạn có lợi thế rất lớn vì bạn là người trực tiếp làm, hiểu rõ project của các bạn làm gì, cần gì, cái nào cần khi dev cái nào có thể lược bỏ cho production build,...Nếu chỉ đưa project cho bên DevOps deploy và đưa họ cái README đi chăng nữa thì đôi khi họ không có đủ context và họ không thể đưa ra solution tốt nhất được (cái này mình gặp thường xuyên luôn khi mình đưa project team mình cho bên devops deploy :D)

Chúc các bạn cuối tuần ngủ ngon và hẹn gặp lại ^^

P/s: source code kết quả cho bài này mình để ở branch [complete-tutorial](https://gitlab.com/maitrungduc1410/learning-docker/-/tree/complete-tutorial) nhé