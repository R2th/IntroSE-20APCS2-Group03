Chào mừng các bạn đã quay trở lại với series [học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) của mình. 😊

Kể từ bài trước đã 1 khoảng thời gian dài mình chưa tiếp tục viết bài được và mỗi lần nhìn vào series này mình lại "đau đáu" vì đứa con cưng vẫn còn dở dang chưa hoàn chỉnh :rofl::rofl:

Từ bài này chúng ta sẽ cùng nhau tìm hiểu về các lợi ích CICD mang lại để tự động hoá toàn bộ quá trình build, test và deploy giúp tăng năng suất công việc, giảm thiểu các tác vụ lặp đi lặp lại nhé :)

# Câu chuyện là...
Một trong những trend mới những năm gần đây trong quá trình tích hợp và triển khai phần mềm là:
  1. Tạo ra 1 image cho app của chúng ta
  2. Chạy tất cả các test dựa vào image vừa được tạo
  3. Đẩy image lên registry. Registry là nơi lưu trữ Docker image, các bạn tượng tượng nó giống như Git nhưng Git để lưu code còn Registry để lưu Image :)
  4. Deploy vào server của chúng ta

Và bằng việc tận dụng nhưng công cụng được cung câp sẵn của các nền tảng (Gitlab) hỗ trợ CICD, thì toàn bộ quá trình trên sẽ được làm tự động, code xong ta chỉ cần commit thôi, ta không cần phải tự chạy test, xem đúng hay sai, sau đó tự build, tự đẩy image rồi tự deploy. 

Thử tưởng tượng một project có nhiều người cùng tham gia, mỗi ngày hàng chục, hàng trăm commit. Thì những công đoạn nhàm chán kia tốn thời gian biết chừng nào :-D. Thay vào đó mọi thứ được làm tự động, đảm bảo code của chúng ta chạy đúng, test đủ và ra production càng sớm càng tốt để user được trải nghiệm tính năng mới.

CI/CD (Continuous Integration/Continuous Delivery - tích hợp liên tục / triển khai liên tục):
- CI: là quá trình mà code của chúng ta được build, test trước khi tích hợp vào repository chung. Áp dụng với bất kì commit nào vào repository
- CD: là quá trình xảy ra sau CI, đó là khi ta triển khai code ra môi trường thật (`staging`, `production`,...)

Và 1 quá trình từ khi code của chúng ta bước vào CICD và kết thúc người ta thường gọi là 1 **pipepline**, trong pipeline này chúng ta sẽ có nhiều **job**,  mỗi job làm 1 công việc cụ thể (build image, test image,....)

Ví dụ các bạn xem ở repository của [VueJS ở đây](https://github.com/vuejs/vue-next), ta thấy rằng VueJS có dùng tới CircleCI (1 dịch vụ chuyên về CICD), để chạy một số test (xem hình)

![](https://images.viblo.asia/9165f9ed-1d3e-4f06-b734-d11268f654d1.png)

Và sau khi có 1 ai commit hoặc tạo pull request vào repo này quá trình CICD lại được kích hoạt để kiểm tra code có đạt đủ yêu cầu hay không.

> Các bạn chú ý là CICD chạy sau khi code được commit lên và có sẵn ở repo rồi, và nếu quá trình này mà `FAILED`(thất bại - có lỗi) thì code của lần commit đó vẫn được sáp nhập vào repo chứ không bị huỷ đi nhé. Và trong trường hợp này ta sẽ nhận được thông báo về việc CICD Fail (qua email hoặc trực tiếp qua giao diện)

Ta cùng thử xem qua 1 ví dụ nữa đó là source code của cả hệ thống [Gitlab](https://gitlab.com/gitlab-org/gitlab), với project khủng này thì những quá trình như build và test sẽ chiếm rất nhiều thời gian cho từng commit, đồng thời 1 ngày có biết bao nhiêu người commit vào repo này, vậy nên họ có 1 CICD pipeline khá khủng [như sau](https://gitlab.com/gitlab-org/gitlab/-/pipelines/172887441) (các bạn click vào link để xem hết, đây mình chỉ cap được 1 phần màn hình :)):

![](https://images.viblo.asia/02233cf2-0fcf-49b6-80c8-cdacd74695e2.png)

Các bạn có thể xem chi tiết về từng job sẽ thấy họ làm rất rất nhiều thứ ở đó, để đảm bảo chất lượng cho toàn bộ code của mình

Nãy giờ dài dòng phết rồi, bắt đầu thử xem CICD nó là có gì hay xem nào :)

À từ từ mình muốn nói lí do vì sao mình chọn Gitlab cho hầu hết tất cả các project trong công việc của mình: (vừa bảo không dài dòng lại nói tiếp :rofl:)

Gitlab họ là 1 platform tổng thể với rất nhiều dịch vụ đầy đủ cho toàn bộ quá trình phát triển phần mềm: từ lưu trữ code như Github, đến CICD như CircleCI, có cả Registry như Docker hub, và rất rất nhiều thứ, và điều quan trọng nhất đó là với tài khoản Free chúng ta có gần như hầu hết unlimited các tính năng ;)

Oke bắt đầu thôi nào....

# Setup

> Nếu bạn nào chưa có tài khoản Gitlab thì các bạn [đăng kí](https://gitlab.com/) lấy một cái, các bạn nhớ dùng cái email thật (email nào đó phụ cũng được), để lát nữa đến đoạn demo build fail ta sẽ nhận được thông báo trả về mail nhé.

Sau khi tạo tài khoản xong thì đầu tiên các bạn tạo cho mình 1 repo mới với tên là `cicd-started` để lát nữa để chúng ta push code vào đây và chạy CICD ở đây nhé:

![](https://images.viblo.asia/e804b744-1569-4498-8d5b-e0665f9615d2.png)


Sau đó các bạn clone code của mình [ở đây](https://gitlab.com/maitrungduc1410/learning-docker). Sau khi clone xong thì các bạn copy folder **cicd-started**  ra riêng 1 folder tách biệt bên ngoài nhé, lí do vì lát nữa các bạn sẽ push code lên repository của các bạn vừa tạo, nếu không copy ra ngoài thì lát nữa các bạn sẽ push code lên repo của mình :D.

Sau đó ta mở lên xem tổng quan ví dụ bài này mà mình đã chuẩn bị sẵn cho các bạn nhé:

![](https://images.viblo.asia/7940e37f-bac5-4520-8671-dbf53fc14297.png)

Review lại cho các bạn nếu như có ai chưa xem series này của mình từ đầu nhen:
- Ở đây ta có file `server.js` đơn giản là 1 app NodeJS + Express, khi chạy lên sẽ listen ở port 3000, in ra dòng text `Hello World` mỗi khi ta truy cập
- Ta có `Dockerfile` cấu hình cho môi trường nơi project của ta sẽ chạy
- Vì khi chạy NodeJS với Docker ở đây mình dùng PM2 nên ta có  thêm file `ecosystem.config.js` dành cho PM2
- Cuối cùng là `docker-compose` là file cấu hình để khởi động app của chúng ta sau khi image được build thành công

Về nội dung cụ thể trong các file này thì các bạn xem bất kì bài nào trước trong series của mình cũng sẽ có giải thích đầy đủ nhé.

# Build Docker image
Tiếp theo ta sẽ cùng thử build image và chạy thử ở local trước nhé.

Để build image thì ta chạy command sau:
```
docker build -t learning-docker:cicd-started .
```
Ở trên ta build image với tên `learning-docker` và tag là `cicd-started`

Sau khi build xong ta chạy thử ở local xem mọi thứ đã ổn chưa nhé. Ở đây mình đã viết sẵn file `docker-compose.yml` cho các bạn và ta chi việc chạy lên với command:
```
docker-compose up -d
```
Ta mở thử trình duyệt ở địa chỉ `localhost:3000` thấy như sau là oke đó các bạn:

![](https://images.viblo.asia/a938c329-677c-4597-b50c-1f3029fbc558.png)

# Commit code và push image
Bây giờ chúng ta đã biết là là code của mình đã chạy đúng. Việc tiếp theo chúng ta làm là commit code và đẩy Docker lên registry.

Ta commit code lên repository chúng ta vừa tạo khi nãy trước nhé:
```
git init
git add .
git commit -m "first commit"
git remote add origin <origin_của_bạn>
git push -u origin master
```
> origin ở bên trên các bạn thay đường dẫn tới repo của các bạn nhé. Ví dụ của mình: `https://gitlab.com/maitrungduc1410/cicd-started` (chắc nhiều bạn biết quá thừa mấy câu lệnh Git này :))

Tiếp theo ta sẽ push image ta vừa build ở local lên registry, để sau này ta dùng cho việc deploy trên server thật (sẽ nói rõ ở các bài sau).

Thì đây là 1 điểm hay của Gitlab mà mình rất thích. Gitlab cho chúng ta free private registry cho **mỗi repository** và **unlimited storage** để lưu trữ docker images. Tức là với mỗi repo bạn có thể lưu bao nhiêu image tương ứng tuỳ thích :heart_eyes::heart_eyes:

Và để push Docker image ta vừa build ở trên lên Gitlab thì ta cần đổi tên image của chúng ta cho khớp với tên repository Gitlab thì mới được nhé, để làm việc này ta sẽ `tag` image ta vừa build bằng tên mới là được:
```
docker tag learning-docker:cicd-started registry.gitlab.com/<username_của_bạn>/<tên repo>

# như của mình thì sẽ là:
docker tag learning-docker:cicd-started registry.gitlab.com/maitrungduc1410/cicd-started
```
Note: ở bài này tên repo của chúng ta là **cicd-started**, username thì các bạn xem ở trên thanh URL là thấy nhé:

![](https://images.viblo.asia/29ba9ead-c790-47de-b63a-6628c25ecec9.png)

Sau khi tag xong thì ta  chỉ cần push image với tên mới lên nữa là xong :D:
```
docker push registry.gitlab.com/<username_của_bạn>/cicd-started
```
Note: nếu khi push các bạn bị hỏi login bằng command sau:
```
docker login registry.gitlab.com
# sau đó thì nhập email và password vào
```
Sau khi Docker image được push thành công lên registry trên Gitlab thì ta cùng lên check xem thế nào nhé, các bạn xem hình dưới để biết cách mở Registry xem image nhen:

![](https://images.viblo.asia/05cf28da-aa8e-46fa-a870-df0a1d58ed91.png)

![](https://images.viblo.asia/31463436-1734-4e3e-86a1-ac86119682ec.png)

Ô xờ kê, vậy là đã xong, code chúng ta đã commit, image chúng ta đã build và đẩy lên Registry. 

Hừm, mỗi lần commit mà cũng phải tự build image xong lại chờ push lên registry, ngồi chờ thế này thì vất quá. :joy::joy:

Tiếp theo chúng ta sẽ dùng Gitlab CI để tự động quá trình build image cùng với đó đẩy lên Registry nhé.

# Bắt đầu với Gitlab CI/CD
Các bạn tạo cho mình 1 file tên là `.gitlab-ci.yml`. Đây là 1 file đặc biệt, :-D, khi commit code lên GItlab, Gitlab sẽ phát hiện nếu có file này thì quá trình CICD sẽ được kích hoạt sau khi code được commit.

Chúng ta thêm vào nội dung file này như sau:
```yaml
# do not use "latest" here, if you want this to work in the future
image: docker:19

services:
  - docker:dind

stages:
  - build

before_script:
  - docker version
  - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY

build:
  stage: build
  script:
    - docker pull $CI_REGISTRY_IMAGE:latest || true
    - docker build --cache-from $CI_REGISTRY_IMAGE:latest --tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA --tag $CI_REGISTRY_IMAGE:latest .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker push $CI_REGISTRY_IMAGE:latest
```
Trước khi tìm hiểu về nội dung file này mình sẽ giải thích điều gì sẽ xảy ra ở quá trình CICD nhé:
- Khi các bạn commit code và có chứa file `.gitlab-ci.yml` thì quá trình CICD sẽ được khởi động
- Gitlab sẽ tạo ra 1 **pipeline**, pipeline chính là toàn bộ những gì trong file `.gitlab-ci.yml` của chúng ta,  pipeline này sẽ chứa nhiều jobs, các jobs này sẽ được gửi tới các `Gitlab Runners`, mỗi 1 con runner ở đây có thể hiểu là 1 worker - khái niệm ta vẫn quen thuộc :), chúng sẽ tạo ra 1 môi trường riêng để chạy job của chúng ta và khi kết thúc thì trả kết quả lại về cho Gitlab.
- Mặc định Gitlab họ có nhiều Share Runners dùng chung cho tất cả mọi người, cá nhân mình thấy project vừa và nhỏ thì vẫn đủ để chạy CICD, job của chúng ta không phải `pending` (chờ) nhiều, nhưng nếu các bạn có nhu cầu chạy nhiều CICD pipeline thì các bạn có thể cài Gitlab runner về server riêng của các bạn và không phải share với ai cả, chi tiết [ở đây nhé](https://docs.gitlab.com/runner/#:~:text=GitLab%20Runner%20is%20the%20open,GitLab%20that%20coordinates%20the%20jobs.)

Ô kê quay trở lại với nội dung của file `.gitlab-ci.yml` của chúng ta nhé ;)

Trước khi bắt đầu các bạn có thể thấy trong file này mình có rất nhiều biến môi trường -> lấy ở đâu ra vậy? :), thì trong quá trình chạy CICD, Gitlab sẽ tự `inject` (bơm-tiêm-thêm) vào môi trường các biến này, các bạn xem danh sách các biến và giá trị của chúng [ở đây](https://docs.gitlab.com/ee/ci/variables/)

Mở đầu chúng ta có `image: docker:19` ý là bảo "ê các bạn Runner, toàn bộ pipeline này chạy ở môi trường Docker phiên bản 19 nhé, chú ý ta không để `latest` ở đây, vì 10 năm sau `latest` sẽ rất khác rồi và pipeline của chúng ta có thể không chạy được nữa :-D. Đọc được điều này thì các bạn runner sẽ pull image `docker:19` về làm môi trường trước mỗi khi thực hiện 1 job

Tiếp theo ta có `services`, ở đây ta sẽ định nghĩa nhưng service cần thiết cho pipeline của chúng ta. Nó na ná như `services` ta thường thấy ở `docker-compose.yml`, ở đây ta thêm vào các docker image mà ta dùng tới cho cả pipeline (ví dụ như `mysql`, `redis`,...). các images này sẽ được "link" tới image `image: docker:19` bên trên.

Ở bài này ta chỉ dùng duy nhất 1 service đó là `docker:dind`. What dờ hell cái image là gì đây?? lần đầu tiên nhìn thấy :-D

Vì mục tiêu bài này của chúng ta là ta sẽ tự động hoá quá trình build image và đẩy image lên registry, mà 2 công đoạn này thì đều cần dùng tới Docker cả. Nhưng trong môi trường `docker:19` mà job chúng ta đang chạy, theo lý thuyết là nó có Docker, nhưng để mà chạy được các command với docker trong đó thì ta cần có 1 container để support đó là `docker:dind` đóng vai trò như kiểu cầu nối giữa `docker-cli` và docker daemon (docker server) vậy. (`docker-cli` hay còn gọi là Docker Client chính là thứ mà ta vẫn chạy ở command line: `docker build....`)

Âu mài gótttttttttttt, hư hư thực thực, chả hiểu gì, cái gì mà Docker trong Docker, :angry::angry:

Đừng vội tẩu hoả nhập ma sớm, cố thêm chút nhé các bạn :-D

> Docker Daemon (Docker server) là thứ quản lý tất cả mọi thứ liên quan tới Docker: images, containers, networks,...

Vấn đề này mình mô tả như ở hình dưới (hình vẽ tay hơi xấu :rofl::rofl:):

![](https://images.viblo.asia/47cbb8d8-d241-47c6-b3fb-c7a6b3b8bca0.png)

Mình giải thích kĩ lại lần nữa nhé:
- Đầu tiên runner sẽ pull image `docker:19` về chạy lên tạo môi trường để chạy job của chúng ta trong đó
- Nhưng ở trong cái môi trường "đó" - môi trường bên trong `docker:19` thì mặc định ta sẽ không thể kết nối tới Docker daemon được và phải cần tới sự trợ giúp của `docker-dind`. (chạy Docker command bên trong docker image, docker image ở đây là `docker:19`)

![](https://images.viblo.asia/2ea90edb-12e6-44f8-9dfd-c6abbf128bc5.png)


> Nếu vẫn khó hiểu thì các bạn cố ngồi ngẫm nghĩ cho nó thấm nhe ;)

Vậy giờ ta chỉ cần cài Docker vào trong image `docker:19` là được. Thì để support ta không phải cài bằng tay, Gitlab hỗ trợ ta chỉ cần thêm vào `docker:dind` vào `services` là được và 2 image `docker:19` và `docker:dind` sẽ được "link" với nhau và ta sẽ có thể chạy được các command `docker build...` như bình thường.

Âu cây tiếp theo ta có `stages` (giai đoạn), ở đây ta định nghĩa pipeline của ta sẽ có 1 giai đoạn là `build` để làm công việc là build Docker image và đẩy lên Registry (tên stage ta chọn tùy ý nhé ;))

Tiếp đó ta có `before_script` - ý là trước khi thực hiện script. Ở đây ta khai báo `before_script` ở "root level" nên nó sẽ được áp dụng cho **tất cả** các job
> Sau này mỗi job có thể có before_script và sẽ override before_script ở root level

Tiếp sau đó là ta bước vào job đầu tiên, job này có tên là `build`, nằm ở stage `build`
> Mỗi stage có thể có nhiều job, ta có thể có `build1`, `build2`,....

Trong job `build` này ta có `script`, đây là phần công việc chính mà job này thực hiện
- Đầu tiên ta pull image tag là `latest` về, ta để `true` ý bảo nếu không tìm thấy thì không sao, cứ chạy tiếp
- Lí do ta pull về trước là để ta có thể cache khi build image, để có thể tiết kiệm thời gian build Docker image, 

> Khi ta chạy `docker build...` thì mỗi command trong Dockerfile sẽ tương ứng với 1 layer, những layer này sẽ được Docker giữ ở "1 nơi nào đó" làm cache và sẽ được tái sử dụng nếu không có sự thay đổi. Thay đổi ở 1 layer sẽ làm toàn bộ các layer sau phải chạy lại từ đầu. Ở bài này ta lấy image `latest` làm tham chiếu như cache để khi ta build image mới Docker sẽ so sánh và chỉ build lại các phần cần thiết.

- Tiếp theo ta tiến hành build image với command `docker build...`. Ta dùng --cache-from để cache image như ta vừa nói ở trên. Và khi image được build xong ta `tag` nó để được 2 image với 2 tên khác nhau, 1 tên là `latest`, tên kia là giá trị của `commit hash` tương ứng của lần commit code này
- Sao lại phải tag thêm 1 image với `commit hash` làm gì? Để sau này khi deploy ta có thể nhanh chóng đổi về một image tại thời điểm của 1 commit cụ thể. Ví dụ code vừa deploy xong thì lỗi sập tiệm, thì ta có thể nhanh chóng đổi về image cũ, và chạy lên ngay lập tức :D. Gitlab cho lưu image free mà, tội gì không tận dụng ;)
- Cuối cùng là ta push 2 image ta vừa tag lên Registry

Ô xờ kê rồi đó, ta tiến hành commit và xem điều gì xảy ra sắp tới nhé:
```
git add .
git commit -m "add CICD"
git push origin master
```
Sau đó ta quay trở lại Gitlab và refresh lại ta sẽ thấy như sau (hình dưới ô đỏ):

![](https://images.viblo.asia/649e6baa-64da-4ba0-9e55-0e8930fc10b9.png)

Vậy là CICD Pipeline đã được kích hoạt, các bạn click vào đó và ta thấy như sau:

![](https://images.viblo.asia/df6ddf21-f0b9-4ffb-92e8-23f91110df0d.png)

Vậy là pipeline của ta đã hoàn tất, nhanh quớ, vì giờ ta chỉ có mỗi 1 job nên thế đó ;), các click vào job để xem chi tiết đã có gì xảy ra nhé, phần này toàn log dài nên mình không show các bạn tự xem nhen ;)

Tiếp theo ta vào Registry để check xem image mới build xem có gì hay nào:

![](https://images.viblo.asia/8d21f648-36fe-47c5-9df3-389197986b05.png)

Như các bạn có thể thấy ta đã có 2 image, 1 `latest`, 1 có tag là commit hash của lần ta `git commit` vừa rồi.

Vậy là ta đã hoàn thành việc tự động hoá quá trình build và push image dùng Gitlab CI rồi đó :D

# Lấy phù hiệu trông cho ngầu
Nom các repository khác, sau khi chạy CICD xong họ hay có `badge` (phù hiệu) trông xịn xò, để show hàng cho ae thấy là "ê code của tôi xịn đấy, pass pipeline không lỗi lầm gì đó nhé :-D", mình cũng muốn có 1 cái:

![](https://images.viblo.asia/a5248415-ee6f-4dbb-9f85-4c8c0502df80.png)

Để làm điều này, ở thanh sidebar bên trái các bạn chọn `Settings->CI/CD->General pipelines` kéo xuống phần `Pipeline status`, copy giá trị `Markdown`.

Sau đó ở project của chúng ta, ta tạo file `README.md` sau đó paste giá trị Markdown vào đây:
```
My First CICD Project

<dán vào đây>
```
Sau đó ta commit lại lên code và các bạn sẽ thấy như sau:

![](https://images.viblo.asia/f7f855eb-17ad-4dd8-b50f-c76947d422cc.png)

Ở đây trạng thái là pipeline của chúng ta đang chạy (vì ta vừa commit code xong), khi nào xong ta F5 lại sẽ đổi thành `passed` (nếu pipeline pass).
Gitlab cung cấp cho chúng ta 1 số badge như `Coverage` badge để show hàng cho coverage test (mình sẽ nói ở các bài tới) hoặc các bạn cũng có thể tự tạo badge cho riêng mình ở `Settings->General->Badges`

# Một số câu hỏi liên quan
## Project của tôi không dùng Docker có dùng được CICD không?
Hoàn toàn được nhé, thực tế là có rất nhiều project không dùng Docker vẫn chạy CICD, ví dụ như project `Vue-next` bên trên chẳng hạn :D
## Mỗi lần commit lại chạy CICD, lại build image trong khi chỉ sửa mỗi file README
Mặc định CICD pipeline sẽ được kích hoạt bất cứ khi nào ta commit code, đúng là điều này đôi khi không cần thiết, ví dụ như ở trên ta chỉ sửa file `README` về thực tế nó không ảnh hưởng gì tới code của chúng ta. Ở các bài sau mình sẽ hướng dẫn các bạn cách chỉ định chỉ 1 số trường hợp cần thiết thì mới chạy CICD nhé.
## Tôi không dùng Gitlab có được không?
Hoàn toàn được luôn các bạn à :).

Github có Github Actions, Bitbucket cũng có CICD riêng, hoặc các bạn có thể dùng dịch vụ bên ngoài như CircleCI, TravisCI,...

Nhưng cá nhân mình thấy Gitlab vẫn là all in one nhất, thứ nhất là hệ thống CICD của gitlab mình thấy khá mạnh và có nhiều chức năng: lưu code như Github, Registry như Docker hub lại còn private, unlimited storage để lưu trữ Docker image, support coverage test, performance test, check security của images, auto DevOps (Kubernetes),..... rất nhiều các bạn có thể xem [ở đây](https://about.gitlab.com/stages-devops-lifecycle/), cộng thêm khá nhiều tính năng khác nữa, và vấn đề là tài khoản Free ta có hầu hết những tính năng đó :D

# Đi ngủ
> Vèo cái đến nửa đêm :first_quarter_moon_with_face::first_quarter_moon_with_face:

Vậy là ta đã xong bài mở đầu với CICD, ở bài này pipeline của ta vẫn khá là đơn giản chưa có gì nhiều, ở các bài sau ta sẽ tận dụng CICD cho nhiều thứ hơn nữa nhen ;)

Nếu có gì thắc mắc các bạn cứ comment để lại cho mình nhé, hẹn các bạn ở bài tiếp theo. Chúc các bạn ngủ ngon ^^