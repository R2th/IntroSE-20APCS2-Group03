Chào mừng các bạn đã quay trở lại với series [học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) của mình. 👋👋

Ở [bài trước](https://viblo.asia/p/nhap-mon-cicd-voi-gitlab-07LKX9WPZV4) chúng ta đã cùng làm qua một số ví dụ đầu tiên về CICD với Gitlab. Ở bài này chúng ta cùng nhau setup automation test cho project Docker và sử dụng Gitlab CI để tự động quá trình này nhé.

# Sao lại phải test?
Câu hỏi này chắc là muôn thuở rồi :D. Thường chúng ta có xu hướng hơi "lười" trong việc viết test mà cứ thế deploy thẳng tay, bao giờ có lỗi thì sập hệ thống hoặc user phàn nàn là biết liền à :rofl::rofl:

Sau một quãng thời gian đi làm cũng "gọi là" có tí kinh nghiệm :-D, mình nhận thấy rằng việc viết test cho project có rất nhiều lợi ích như sau:
- đảm bảo được code của chúng ta chạy đúng, dữ liệu trả về chính xác, bao được các trường hợp lỗi
- code được 1 thời gian dài đầu mình không bị "trệch khỏi đường ray" khi luôn có test đảm bảo mỗi lần commit lên thì code của mình đều đã được test cẩn thận
- Đặc biệt nếu có nhiều người cùng làm project thì có thể đảm bảo được dữ liệu trả về từ các function/api theo chuẩn của cả project, tránh trường hợp API của mỗi người khác nhau trả về dữ liệu cấu trúc/kiểu khác nhau
- Test chính là điểm quan trọng và là mục đích chính của chữ chữ "CI" trong "CICD" (Continuous Integration/Continuous Delivery)
- Việc viết test mình thấy là cũng rèn cho mình được tính cẩn thận và chuyên nghiệp hơn khi viết code. Rèn luyện mài dũa bản thân trước nhỡ ra sau này được vào làm Facebook, Google thì có cái mà chiến luôn :rofl::rofl: (có ước mơ là có động lực ;) )

Mình thấy thì mọi người hay đề xuất là viết test càng sớm càng tốt ngay từ ban đầu. Mình thấy như thế là lí tưởng nhất ;). Nhưng cá nhân khi làm thực tế thì mình thường bắt đầu viết test sau lần deploy đầu tiên, vì mình thấy viết test sớm mất nhiều thời gian mà các function/api chưa chắc đã là cuối cùng, có thể thay đổi liên tục. Tuỳ theo project của công ty các bạn, hoặc tự chọn cho mình 1 cách làm phù hợp nhất nhé :)
# Mục tiêu
Hết bài này chúng ta sẽ đạt được kết quả như sau:
- Setup automation test + coverage test chạy tự động với Gitlab CI
- Build và chạy test cho Docker Image
- Biết cách chia quá trình chạy CICD pipeline ra nhiều stage
- Lưu lại image cho mỗi commit để đảm bảo sau này ta luôn có thể chạy image của 1 commit tại 1 thời điểm bất kì lúc nào (rất hữu ích khi vừa deploy xong thì server thấy ngủm củ tỏi vì code lỗi và phải rollback về commit ngay trước đó khi mà code vẫn chạy băng băng ;))

Nãy giờ dài dòng quá bắt đầu thôi nào ...
# Ôi từ từ đã
<Lại cái gì nữa ông ơi :triumph::triumph:)>

Hôm nay vào Viblo xem thấy reputation lên 10K, tự thẩm du tinh thần và thấy là blog của mình hình như cũng giúp được khá nhiều bạn trong việc học lập trình (chủ yếu là Laravel/Vue và JS nói chung). 

Thời gian trôi nhanh như con :dog2: chạy ngoài đồng, ngày đầu viết blog là cách đây 2 năm, ban đầu cũng chỉ vì yêu Vue và thấy  tài liệu không có nhiều nên muốn viết blog để chia sẻ với mọi người và cũng để rượt lại mớ kiến thức trong đầu + những thứ trải nghiệm trong quá trình làm việc. Về sau thấy blog của mình cũng được một cơ số bạn quan tâm vì hữu ích, cảm thấy "thung thướng" tột độ.

Cảm ơn tất cả các bạn đọc đã theo dõi blog của mình trong suốt thời gian vừa qua, mình vẫn sẽ luôn chia sẻ những gì mình học được ở blog này để mọi người cùng nhau tiến lên

> Dân tộc Việt nam có sánh vai với các cường quốc năm châu được hay không chính là nhờ một phần lớn vào công Debug của các cháu Developer....:joy::joy:

Thôi chúng ta cùng bắt đầu nhé

# Điều kiện tiên quyết
<Nghe như học sinh cấp 3 :nerd_face::nerd_face: >

Nếu bạn nào chưa có tài khoản Gitlab thì các bạn [đăng kí](https://gitlab.com/) trước đã nhé.

# Setup
Đầu tiên các bạn clone code của mình [ở đây](https://gitlab.com/maitrungduc1410/learning-docker). Ở bài này ta chỉ quan tâm tới folder **cicd-automation-test** nhé.

Tiếp theo, các bạn copy folder đó ra 1 nơi nào đó riêng bên ngoài nhé. Vì nếu để như vậy lát nữa các bạn commit sẽ vào repo của mình chứ không phải của riêng các bạn mất.

Sau đó các bạn quay trở lại Gitlab, tạo cho mình 1 repository với tên là **cicd-automation-test**

# Tổng quan
Ở bài này mình đã setup sẵn cho các bạn một project NodeJS đơn giản có thể chạy được, và mình cũng đã Dockerize nó cho các bạn luôn, nếu bạn nào chưa hiểu các Dockerize project NodeJS thì xem lại các bạn trước trong series của mình nhé:

![](https://images.viblo.asia/fff6efe5-5b31-4a2a-8765-c41f11a0e11b.png)

- Ở đây ta có một project NodeJS + Express cơ bản (mình tạo bằng [express-generator](https://github.com/expressjs/generator)). Dùng MongoDB làm database
- Các bạn mở file `routes/index.js` có thể thấy ta có 2 routes là `/login` và `/register` (cái tên nói lên tất cả :D), dùng để tạo tài khoản mới và login user nhé.
- Ở folder `__tests__` mình có 1 file là `routes.test.js`, file này dùng để test 2 route bên trên của chúng ta. Test API là một trong nhưng loại test mình hay dùng nhất vì nó là cái mà user sẽ tương tác trực tiếp sau này nên phải đảm bảo là nó chạy ngon ;).

Ở bài này để test thì mình dùng [Jest](https://jestjs.io/) - một framework để test rất hot hiện nay, do Facebook phát triển (cái gì của Facebook với Google nó cũng hot luôn :stuck_out_tongue_winking_eye:). Cùng với đó mình dùng thêm 1 thư viện là `supertest` để ta có thể test với HTTP request nhé.

Về cơ bản ở bài này, trong `package.json` mình có định nghĩa 1 `script` là `test` để lát nữa khi chạy `npm run test` thì Jest sẽ đọc file cấu hình `jest.config.js` lên sau đó sẽ tự động detect folder `__tests__` và chạy tất cả các file test trong đó (mặc định tự tìm tới folder này luôn nhé).

Các bạn mở file `__tests__/routes.test.js`sẽ thấy trong đó mình test 2 route là Login và Register, với mỗi route mình test một số trường hợp cơ bản. Ví dụ với Register thì test khi user nhập thiếu email có trả về đúng hay không, password rỗng thì kết quả trả về có đúng mong đợi hay không,.... Cái tên nói lên tất cả, mỗi test đều rất cơ bản luôn các bạn tự sướng phần này nhé ;) (nếu có gì thắc mắc comment cho mình biết nhé)

# Bắt đầu
Đầu tiên chúng ta cùng chạy thử test ở local xem mọi thứ có ổn không đã nhé.

Thì để chạy test, ta có 2 cách:
- Chạy trực tiếp từ môi trường ngoài: ta cần chạy npm install + có cài MongoDB -> môi trường ngoài mất zin -> không thích :D
- Chạy trong Docker container: giữ zin cho môi trường gốc, cùng với đó là ở production ta chạy với Docker (giả sử vậy), do đó test trong môi trường Docker sẽ oke hơn (nhỡ bằng 1 phép màu nào đó test ở 2 môi trường lại cho kết quả khác nhau chẳng hạn :rofl::rofl:)

> Nếu các bạn thích test trực tiếp từ môi trường ngoài cũng oke luôn nhé.

## Build Docker image và test ở local
Bây giờ ta cùng tiến hành build Docker image và chạy thử ở local xem test ổn không đã nhé.

Các bạn chạy command sau:
```
docker build -t learning-docker:cicd-automation-test .
```

Sau khi hoàn tất ta cùng chạy project lên xem nhé:
```
docker-compose up -d
```
**Note cho bạn nào đang dùng Windows**: các bạn xem lại phần chú ý lúc mount volume cho MongoDB mình đã nói ở bài [Dockerize ứng dụng NodeJS, Mongo](https://viblo.asia/p/dockerize-project-nodejs-mongodb-redis-passport-4P856NXW5Y3#_chay-project-11) rồi nhé

Tiếp theo ta thử đăng kí tài khoản mới xem đã oke chưa nhé. Các bạn mở [Postman](https://www.postman.com/) cho tiện nhé (Postman là tool để test API rất tiện các bạn có thể dùng nó để test cho nhanh thay vì dùng CURL nhé ;)):

![](https://images.viblo.asia/f89d5848-e12c-419f-97e2-7eb481c879f0.png)

Sau đó các bạn thử luôn login xem ok chưa nhé (route login thì chỉ cần email + password không cần displayName nhé), phần này mình để các bạn tự sướng.

Sau khi check và thấy 2 route chúng ta đã chạy ổn định, thì ta tiến hành chạy Test nhé ;). Vì test trong môi trường Docker vì thế ta có 2 cách để chạy command test như sau:
- Chui vào container và chạy test
```
docker-compose exec app sh
npm run test
```
- Đứng ở bên ngoài và chạy trực tiếp:
```
docker-compose exec -T app npm run test
```
Các bạn chọn cách nào cũng được nhé, ở đây mình chọn cách 1 để kết quả in ra nó màu mè rõ ràng hơn, nhưng lát nữa khi setup CICD thì mình dùng cách 2 cho nhanh nhé. Ta tiến hành với cách 1:
```
docker-compose exec app sh
npm run test
```
Các bạn sẽ thấy kết qủa in ra như sau:

![](https://images.viblo.asia/a7d41c23-b70e-44de-9176-9004829b991d.png)

Ở trên các bạn thấy kết quả in ra ta có 1 test suite pass bài test (1 test suite ở đây = 1 file test), tổng cộng 13 test cases đã test thành công. 

Oke nom ổn rồi đó nhỉ, ta đã chạy test trong Docker container và các test của ta đều ổn, code của ta giờ đã có thể commit được rồi. Ta tiến hành commit code vào repo **cicd-automation-test** mà các bạn tạo ở đầu bài nhé, nhớ thay `username` bên dưới bằng username của các bạn nhé (xem trên Gitlab):
```
git add .
git commit -m "first commit"
git remote add origin https://gitlab.com/<username>/cicd-automation-test.git
git push -u origin master
```
Sau khi commit  code thì ta sẽ push Docker image hiện tại lên Gitlab registry để lưu lại image tương ứng với lần commit này nhé (nhớ thay username thành username của các bạn nhé):
```
docker tag learning-docker:cicd-automation-test registry.gitlab.com/<username>/cicd-automation-test:latest

docker push registry.gitlab.com/<username>/cicd-automation-test
```

Sau khi push xong các bạn quay trở lại Gitlab -> Chọn `Packages and Registries` -> Container Registry kiểm tra image được push thành công hay chưa nha:

![](https://images.viblo.asia/8959158d-e5ea-4af8-9497-a52753bdc2ef.png)

Âu cây, xong 1 lần commit, code và image đã sẵn sàng cho production (một cảm giác tự hào không hề nhẹ :muscle::muscle:)

Có điều là, lần nào code xong cũng phải tự build image rồi tự chạy test thì mệt quá nhỉ, nhỡ mình quên test mà commit thẳng thì sao? Hay team có 1 dev vừa bị người yêu chia tay đang code trong nước mắt và hình như chuẩn bị bấm commit code mà không test, cùng không màng tới hậu quả sau này (còn gì đau hơn người yêu bỏ :joy:)

Ở bước tiếp theo ta sẽ setup CICD để có thể chạy test một cách tự động, ta chỉ cần commit code, mọi thứ còn lại không phải nghí luôn ;)

## Cấu hình Gitlab CI
Các bạn tạo cho mình file tên là `.gitlab-ci.yml` nhé, chi tiết về file này [ở bài trước](https://viblo.asia/p/nhap-mon-cicd-voi-gitlab-07LKX9WPZV4#_bat-dau-voi-gitlab-cicd-4) mình đã giải thích kĩ rồi nhé. Về cơ bản là lần tiếp theo khi ta commit, Gitlab sẽ "nhìn" thấy file này và khởi động quá trình CICD cho chúng ta nhé.
```yaml
image: docker:19

services:
  - docker:dind

stages:
  - build
  - test
  - release

before_script:
  - docker version
  - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY

build:
  stage: build
  script:
    - docker pull $CI_REGISTRY_IMAGE:latest || true
    - docker build --cache-from $CI_REGISTRY_IMAGE:latest --tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

test:
  stage: test
  before_script:
    - apk add --no-cache py3-pip py3-setuptools python3 python3-dev libffi-dev openssl-dev gcc libc-dev make
    - pip install docker-compose
    - docker-compose version
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
  script:
    - docker-compose up -d
    - sleep 15
    - docker-compose exec -T app npm run test

release:
  variables:
    GIT_STRATEGY: none
  stage: release
  script:
    - docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:latest
```
Ở bài này ta đã có 1 pipeline phức tạp hơn nhiều bài trước rồi, giải thích chút nhé:
- Pipeline của chúng ta có 3 stage (giai đoạn): build Docker image, chạy Test và stage cuối cùng là test image là `latest` nếu như vượt qua được bài test.
- Chú ý ở bài này mỗi stage ta chỉ có 1 job, trùng tên với stage luôn. Thực tế ta có thể chạy nhiều job trong 1 stage.
- Ở job `test` đoạn `before_script` sẽ override (ghi đè) đoạn `before_script` trên đầu file. Ở đây mục ta tiến hành cài `docker-compose`
- Command `sleep 15`ý bảo "chờ 15 giây" rồi hẵng chạy test nhé, vì tại thời điểm khởi động project với Docker thì mất một chút thời gian để MongoDB hoàn tất quá trình khởi động của nó.
- Ở job `release` ta có khai báo biến môi trường `GIT_STRATEGY` với giá trị `none`, ý bảo là không cần clone source code vào bên trong Gitlab Runner

Có bạn thắc mắc là ở job `test`   đưa `before_script` thay vào đoạn `before_script` trên đầu được không, thì câu trả lời là được, nhưng vì cài `docker-compose` khá lâu trong khi 2 job là `build` và `release` không cần tới `docker-compose` nên ta chỉ nên đặt nó ở trong phạm vi job `test`

Nếu các bạn để ý thì thấy ở job `test` đoạn `before_script`chúng ta tag image vừa pull về thành `latest`, lí do bởi vì trong file `docker-compose.yml` chúng ta fix sẵn giá trị là `latest` nên chúng ta cần tag trước để bước sau đó chúng ta có thể chạy image lên.

> Note: tại bất kì job nào nếu có lỗi xảy ra thì các job ở stage sau đó sẽ không được thực hiện (ta sẽ nhận được mail báo về)

> Ở 2 jobs `test` và `release` ta đều pull image về trước, lí do bởi vì không có gì đảm bảo 2 job cùng được chạy trên 1 Gitlab Runner, nên để đảm bảo ta luôn phải pull image về trước.

Sau đó ta sửa lại tên image của service `app` trong `docker-compose.yml` cho khớp với repo trên Gitlab trước khi commit nhé:
```yml
app:
    image: registry.gitlab.com/maitrungduc1410/cicd-automation-test:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
    env_file: .env
```

Tiếp theo ta commit lại code và xem kết quả thôi nào:
```
git add .
git commit -m "add CICD"
git push origin master
```

Sau đó ta quay lại Gitlab, F5 trình duyệt và sẽ thấy icon như sau tức là CICD đang chạy rồi nhé:

![](https://images.viblo.asia/ed8f23e0-11f5-4543-af75-6531a33a5ab8.png)

Click vào icon đó chúng ta sẽ thấy chi tiết pipeline như sau:

![](https://images.viblo.asia/1da002f8-de95-47fa-9ff2-04fd67fb694d.png)

Các bạn có thể click vào từng job để xem chi tiết realtime quá trình chạy như thế nào nhé. Vì ở đây ta có tới 3 stage, nên sẽ mất một lúc để pipeline hoàn thành đó. Làm ngụm cà phê :coffee::coffee: cho tỉnh táo hoặc nhắn tin dỗ dành người yêu đang đòi chia tay cũng được :rofl::rofl:

Sau khi người yêu hết giận thì các bạn quay lại Gitlab F5 trình duyệt thấy như sau là cuộc đời tươi sáng rồi nhé:

![](https://images.viblo.asia/534aa50b-8c5f-4517-aef7-ec43b7611cd5.png)

Như các bạn thấy trên hình pipeline của chúng ta đã hoàn thành, 3 jobs đều success trong 7 phút (cũng lâu ấy chứ nhỉ :D)

Tiếp theo chúng ta check thử xem image đã có ở Registry chưa nhé:

![](https://images.viblo.asia/950e3e32-28e3-4c46-8613-1d617b3d4580.png)

Pằng pằng chíu chíu :fireworks::fireworks:. Vậy là ta đã có 2 image 1 image có tag là hash của commit đại diện cho code tại 1 thời điểm và 1 image là `latest` đại diện cho code mới nhất của chúng ta. Sau này khi deploy thì ta sẽ dùng tag `latest`, và bất kì khi nào có lỗi ta có thể ngay lập tức đổi về 1 commit trước đó khi mà code vẫn chạy ổn định

> Registry ta được cấp free, private unlimited storage nên đừng ngần ngại khi lưu nhiều image nhé các bạn ;)

Giờ đây mỗi khi code xong chúng ta chỉ cần commit, mọi chuyện còn lại hãy để Gitlab lo <3, việc của chúng ta là chỉ làm sao code cho thiệc là tốt ;)

# Coverage test
Tiếp theo mình muốn chia sẻ cho các bạn 1 loại test nữa mà mình rất hay dùng có tên là `coverage test` (tạm dịch là kiểm thử độ phủ). Trong test này chúng ta sẽ kiểm tra xem các test case có chạy qua tất cả code của chúng ta: các đoạn if/else, các đoạn try/catch, các đoạn xử lý lỗi,.... mục đích là để đảm bảo ta có hiểu và biết được code có chạy vào chỗ này chỗ kia hay không. Vì nếu có đoạn if mà code chẳng bao giờ chạy vào thì cũng hơi vô nghĩa đúng không nào ;) 

Jest cung cấp luôn cho chúng ta option để test độ phủ luôn, tiện lợi không cần phải dùng thêm thư viện nào khác. Ta bắt tay vào làm nhé.

Các bạn sửa lại file `package.json` đoạn script `test` như sau:
```json
"test": "jest --coverage --detectOpenHandles --forceExit",
```
Ta chỉ cần thêm option `coverage` và khi chạy test thì Jest sẽ đọc file `jest.config.js` trong đó mình có 3 dòng cấu hình cho coverage test ở dòng 24,27 và 32 các bạn đọc có gì không hiểu thì search google hoặc comment cho mình biết nhé.

Lần tới khi chạy test thì Jest sẽ sinh cho chúng ta 1 folder tên là `coverage` bên trong có rất nhiều thông tin, có cả file HTML hiển thị giao diện đẹp lun.

Chúng ta thử chạy ở local xem oke không đã nhé. Các bạn tiến hành build lại image:
```
docker build -t registry.gitlab.com/maitrungduc1410/cicd-automation-test:latest .
```
Tiếp theo trước khi chạy project, vì lát nữa ta muốn xem folder `coverage` ở môi trường ngoài cho tiện nhìn vì thế ta sửa lại 1 chút ở `docker-compose.yml` và map volumn cho service `app` nhé:
```yaml
app:
    image: registry.gitlab.com/maitrungduc1410/cicd-automation-test:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
    env_file: .env
    volumes: 
      - ./coverage:/app/coverage
      # chỉ cần map folder coverage là đủ
```
Sau đó ta tiến hành chạy project lên nhé:
```
docker-compose up -d
```
Tiếp theo chờ 1 chút (~30s) để MongoDB khởi động hoàn toàn thì ta tiến hành chạy test nhé:
```
docker-compose exec app sh
npm run test
```

![](https://images.viblo.asia/dc886243-18f3-4000-a39e-f77fda5ee6de.png)

Như ở trên các bạn thấy Jest show cho chúng ta kết quả khi test độ phủ: độ phủ của statement (if/else), của nhánh, của các functions, độ phủ dựa trên dòng code.

Thử check lại folder `coverage` thì ta thấy bên trong có một số file. Các bạn mở trình duyệt, sau đó kéo thả file `coverage/lcov-report/index.html` vào và ta cùng xem nhé:

![](https://images.viblo.asia/2ff495b3-f6c0-42a4-a91f-f17766e354b2.png)

Như các bạn thấy trên hình thì độ phủ của chúng ta cũng khá là cao (hay phải nói là rất cao :3), vì bây giờ code của chúng ta chưa có gì mấy nên phủ dễ, sau này code nhiều có khi xuống còn 40-50% không biết chừng :joy::joy:. Các bạn có thể click vào để xem chi tiết từng file nhé.

Âu cây vậy sau này khi commit hàng trăm hàng nghìn lần, mà muốn check lại độ phủ tại 1 thời điểm nào đó không lẽ phải lưu folder `coverage` cho từng commit hay sao :thinking::thinking:

Điều tuyệt vời là Gitlab đã hỗ trợ chúng ta điều đó ;) (đấy bạn nào lại không thích Gitlab nữa đi, all in one :laughing:). Cùng xem thế nào nhé.

Các bạn mở lại file `.gitlab-ci.yml` ở job `test` các bạn sửa lại như sau nhé:
```yaml
test:
  stage: test
  before_script:
    - apk add --no-cache py3-pip py3-setuptools python3 python3-dev libffi-dev openssl-dev gcc libc-dev make
    - pip install docker-compose
    - docker-compose version
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
  script:
    - docker-compose up -d
    - sleep 15
    - docker-compose exec -T app npm run test
  coverage: /All files[^|]*\|[^|]*\s+([\d\.]+)/ # Thêm vào dòng này
```
Ở trên ta thêm vào duy nhất dòng `coverage....`, đoạn sau ta truyền vào Regex ý bảo là "sau khi test xong ở kết quả in ra thì ông bắt lấy đoạn như Regex này (All files....) làm kết quả Coverage test cho tôi nhá" :D.

Sau đó ta tiến hành commit và xem kết quả nhé:
```
git add .
git commit -m "add Coverage test"
git push origin master
```
Quay lại Gitlab F5 để check xem CICD đã bắt đầu chạy chưa nhé. Tiếp theo trong thời gian chờ CICD chạy xong thì ta lại dành thời gian tập dăm ba bài gập bụng giảm mỡ hoặc lại quay lại nhắn tin với người yêu dỗ dành gạ kèo cuối tuần đi chơi ;).

Và khi vừa setup được kèo đi chơi với ngừi eo ta quay lại Gitlab F5 là cũng vừa kịp pipeline chạy xong. Chúng ta mở page `CICD -> Jobs` để check kết quả nhé:

![](https://images.viblo.asia/57b1669a-de8f-469d-9da7-e3ab2d28aa69.png)

Như các bạn thấy ở đây ta đã có kết quả là `92.42%` :+1::+1:.

Ngon rồi đó, có kết quả coverage test thì ta show nó cho thuận tiện dễ nhìn hơn chút bằng Badge chứ nhỉ. Các bạn chọn Settings->CICD->General Pipelines, kéo xuống copy Markdown của `Pipeline status` và `Coverage report` nhé

Các bạn tạo file `README.md`  paste 2 giá trị các bạn vừa copy vào nhé (bên dưới là kết quả của mình các bạn thay vào cho khớp với của các bạn nhé):
```md
# My Project

[![pipeline status](https://gitlab.com/maitrungduc1410/cicd-automation-test/badges/master/pipeline.svg)](https://gitlab.com/maitrungduc1410/cicd-automation-test/-/commits/master)

[![coverage report](https://gitlab.com/maitrungduc1410/cicd-automation-test/badges/master/coverage.svg)](https://gitlab.com/maitrungduc1410/cicd-automation-test/-/commits/master)
```
Giờ ta tiến hành commit lại và xem kết quả nhé.

Từ...................... dừng......Như ở trên khi test ở local chúng ta có cả folder `coverage` với bao nhiêu là loại thông tin khác nữa, bỏ đi thì phí quá, Gitlab CI của chúng ta bây giờ mới chỉ lưu lại mỗi kết quả cuối cùng là con số `92.42%`, nếu như lưu lại được cả folder `coverage` để sau này phân tích thì tuyệt vời quá nhỉ :thinking::thinking:

Thì Gitlab CI cung cấp cho chúng ta 1 option tên là `artifacts` (tạm dịch là `tài sản`), dùng để lưu lại 1 file/folder nào đó và có thể download được chỉ bằng 1 cú click ;).

Chúng ta sửa lại file `.gitlab-ci.yml` đoạn job `test` như sau nhé:
```yaml
test:
  stage: test
  before_script:
    - apk add --no-cache py3-pip py3-setuptools python3 python3-dev libffi-dev openssl-dev gcc libc-dev make
    - pip install docker-compose
    - docker-compose version
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
  script:
    - docker-compose up -d
    - sleep 15
    - docker-compose exec -T app npm run test
  coverage: /All files[^|]*\|[^|]*\s+([\d\.]+)/
  artifacts: # Thêm vào phần này
    paths:
    - coverage/
```
Ở trên các bạn có thể thấy là ta thêm vào `artifacts` với path là `coverage` ý bảo là "giữ lại folder `coverage` tôi với nhé :D". Các bạn có thể xem kĩ hơn về `artifacts` [ở đây](https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html) nhé.

Cuối cùng là ta tiến hành commit và chờ xem kết quả nhé:
```
git add .
git commit -m "add README, artifacts"
git push origin master
```
Và vẫn như thường lệ, để tranh thủ thì ta tập hít đất giải lao hoặc quay lại nhắn tin xin lỗi người yêu vì nãy giờ mải ngồi code bỏ quên em mà chưa confirm là cuối tuần sẽ đi đâu chơi :joy::joy:

Và vừa lúc tìm được địa điểm ăn chơi đàn đúm cuối tuần với em yêu thì cũng là lúc pipeline của chúng ta chạy xong. Các bạn lại mở lại page `CICD->Jobs` và ta cùng xem kết quả nhé:

![](https://images.viblo.asia/1df8525c-b5c0-459e-95c1-73f4e8025299.png)

Như các bạn thấy ở trên, ngoài việc show kết quả test coverage ta còn có thêm 1 nút bên cạnh chính là `artifacts`, các bạn có thể bấm Download về và xem nhé.

À quay lại trang chủ của repository xem Badge show hàng coi sao nào:

![](https://images.viblo.asia/fae371ba-1a76-4bb3-b62c-f10e53ccc2f1.png)

Pằng pằng chíu chíu :fireworks::fireworks:, nom xịn mà chuyên nghiệp phết rồi ý nhờ. :D :D

# Những thứ hữu ích bạn nên biết
## Chia repository thành nhiều branch
Các bạn có thể nhận thấy là giờ CICD pipeline của chúng ta sẽ được chạy bất kì khi nào ta commit, và tương ứng sẽ sinh ra 2 Docker image: 1 cho commit hiện tại, và 1 cho `latest`. Nhưng khi làm thật thì ta thường có nhiều branch (master, dev, staging, test,.....) và với cách setup CICD như hiện tại thì image `latest` sẽ liên tục bị các branch ghi đè lên nhau mỗi khi CICD pipeline hoàn tất, trong khi ta muốn `latest` chỉ dành cho master để deploy ra production.

Giờ đây ta sửa lại 1 chút file `.gitlab-ci.yml`, xoá job `release` đi và thay thế đoạn sau vào nhé:
```yaml
release-tag:
  variables:
    GIT_STRATEGY: none
  stage: release
  except:
    - master
  script:
    - docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_NAME
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_NAME

release-latest:
  variables:
    GIT_STRATEGY: none
  stage: release
  only:
    - master
  script:
    - docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:latest
```
Giờ đây ở stage `release` ta có 2 jobs:
- `release-tag`: sẽ chạy ở các branch **không** phải `master` do ta có `except: master`. Chúng ta sẽ tag image với commit hiện tại thành tên của branch.
- `release-latest`: chạy **duy nhất** khi push code vào `master` do ta có `only: master`.

Ở cả 2 job này ta đề thiết lập `GIT_STRATEGY: none` ý bảo không cần clone code vào Gitlab Runner, vì ở đây ta không làm gì liên quan tới source code nữa.

Sau đó ta checkout ra branch mới tên là `dev` và thử commit nhé:
```
git checkout -b dev
git add .
git commit -m "add release tag and latest"
git push origin dev
```
Quay trở lại Gitlab chuyển qua branch `dev` kiểm tra xem CICD pipeline đã chạy hay chưa nhé các bạn. Sau đó thì lại tiếp tục tranh thủ tập squat 30 cái cho một bờ mông săn chắc hoặc quay trở lại nhắn tin với người yêu về lịch đi chơi mùng 2/9 sắp tới nhé.

Và sau khi tìm ra được địa điểm hú hí với bạn gái dịp 2/9 thì ta quay trở lại Gitlab, F5 sau đó mở `CICD->Pipelines` sẽ thấy rằng pipeline của chúng ta đã xong nhé:

![](https://images.viblo.asia/40ecbe4d-53e1-44d9-909c-fbb0084d7e3f.png)

Tiếp theo ta kiểm tra `Packages & Registries -> Container Registry` ta sẽ thấy như sau nhé:

![](https://images.viblo.asia/7776ec6c-0025-4900-a80a-a263d22419fc.png)

Như các bạn thấy ta đã có image với tag `dev`, và image này sẽ đại diện cho code mới nhất trên branch `dev` nhé :)

Tiếp sau đó các bạn quay trở lại code, ta sẽ tiến hành merge `dev` vào `master` và commit lại nhé:
```
git checkout master
git merge dev
git push origin master
```
Sau đó ta lại chờ pipeline xong và xem kết quả nhé, đoạn này các bạn tự sướng nhé ;)


## Refactor cấu hình Gitlab CI
Như các bạn thấy ở trong file cấu hình `.gitlab-ci.yml`, ở job `test` hiện tại ta đang tự cài `docker-compose` do đó sẽ tốn khá nhiều thời gian. Để loại bỏ việc này ta đơn giản là sử dụng image `docker/compose` có sẵn `docker-compose` thay vì image `docker:19` (chỉ có mỗi Docker) nhé:
```yml
# ----->>> Chú ý ở đây
image: docker/compose:alpine-1.27.4

services:
  - docker:dind

.......

test:
  stage: test
  before_script: #--------> Ở đây ta đã xoá đi đoạn cài docker-compose
    - docker-compose version
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
  script:
    - docker-compose up -d
    - sleep 15
    - docker-compose exec -T app npm run test
    
....
```
Sau đó các bạn commit và quan sát pipeline đã build nhanh hơn nhiều rồi nhé ;)
> Xem các tag của image Docker compose [ở đây](https://hub.docker.com/r/docker/compose)
## Chỉ chạy job khi một số file thay đổi
Đôi khi ta muốn chỉ chạy CICD khi code ở trong folder `src` thay đổi hoặc một số file nào đó thay đổi thì mới chạy CICD, trường hợp này ta làm như sau nhé:
```yaml
build:
  stage: build
  only:
    changes:
      - Dockerfile
      - src/*
      - test/*
      - package.json
      ...
```
Ở trên ta có job `build` chỉ chạy nếu file `Dockerfile` hoặc các file trong folder `src`, ... thay đổi
## Extend job
Trong trường hợp chúng ta có nhiều job mà chúng cùng share cấu hình thì vì lặp đi lặp lại viết cấu hình cho từng job ta có thể định nghĩa 1 job "tổng" chứa các cấu hình chung, rồi tạo các job "con" `extend` từ job tổng, ví dụ như sau:

```yaml
.tests:
  stage: test
  before_script: # this before script will overwrite the parent's one
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA # pull the image we just push to register
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest # tag this image as latest because in our docker-compose file we specify it with tag latest
    - cp .env.example .env

start-up-test:
  extends: .tests
  script:
    - docker-compose up -d
    - sleep 15
    - docker-compose exec -T app pm2 status

api-test:
  extends: .tests
  script:
    - docker-compose up -d
    - sleep 15
    - mkdir .docker && mkdir .docker/data && mkdir .docker/data/db && mkdir .docker/data/redis
    - docker-compose exec -T app npm run test
```
Ở trên các bạn thấy ta có 2 job là `start-up-test` và `api-test`, cả 2 job này trước khi chạy đều cần `docker login` rồi `docker pull`... do vậy ta định nghĩ 1 job "tổng" là `tests` rồi cho 2 job kia extend từ nó.
## Tăng tốc chạy pipeline với cache
Nhiều khi, trong quá trình chạy CICD ta muốn cache lại một số thứ để tái sử dụng cho các jobs khác nhau, ví dụ ta có nhiều jobs cần `node_modules`, bình thường ta sẽ cần chạy `npm install` cho tất cả các job đó, và thời gian chạy thì như các bạn cũng biết là khá lâu. Do vậy thay vì chạy đi chạy lại ta có thể chạy 1 lần sau đó cache lại cho các jobs sau sử dụng luôn:
```yaml
# do not use "latest" here, if you want this to work in the future
image: docker/compose:alpine-1.27.4

services:
  - docker:19.03.13-dind

# cache khai báo ở top-level nên sẽ áp dụng cho tất cả các job trong tất cả stages
cache:
  key: ${CI_COMMIT_REF_SLUG} # cache này chỉ áp dụng cho branch hiện tại
  paths:
  - node_modules/

stages:
  - install
  - linting
  - build

.linting:
  stage: linting
  image: node:12.18-alpine

# install npm dependencies so it'll be cache in subsequent jobs
# note: we can't do this in linting stage as in that stage, 2 jobs run concurrently and both need node_modules
install_dependencies:
  stage: install
  image: node:12.18-alpine
  script:
    - npm install

# this job make sure commit message is conventional
lint-commit-msg:
  extends:
    - .linting
  script:
    - echo "$CI_COMMIT_MESSAGE" | npx commitlint

# this job make sure code is linted
lint-code:
  extends:
    - .linting
  script:
    - npm run lint

# this job is to build Docker image and push to registry
build:
  ....LET'S BUILD SOMETHING AMAZING :) .....
```
Ở trên ta có 1 pipeline, ta có định nghĩa thuộc tính `cache` ở `top-level`, ở đây ta sẽ cache folder `node_modules`để tái sử dụng cho tất cả các jobs trong tất cả stage khi CICD pipeline chạy ở branch hiện tại.

Ta có 3 stage:
- stage `install` chỉ có 1 job là `install_dependencies`, ở đây ta sẽ chạy `npm install` sau đó 
- stage `linting` có 2 jobs là `lint-commit-msg` để check commit message theo chuẩn và `lint-code` để check code có theo chuẩn hay không, vì 2 jobs này đều cần tới `node_modules` để chạy, và nó sẽ lấy từ cache ra. Và ở đây ta không cần chạy `npm install` nữa
- stage `build` thì không có gì đặc sắc :D

> Note: Để clear cache các bạn mở repository trên Gitlab, vào `CICD->pipelines` và bấm click `Clear Runner Caches`
# Đóng máy
Vậy là đến cuối bài ta đã có 1 pipeline cũng khá là xịn xò rồi nhỉ. Qua đây chúng ta có thể thấy được những điều tuyệt vời ta có thể làm khi áp dụng CICD vào project để tự động hoá những thao tác lặp đi lặp lại, tiết kiệm thời gian, ta chỉ cần commit, mọi thứ còn lại từ lint, test, build release,... Gitlab lo hết <3. Ví dụ như bên dưới là 1 pipeline trong project thật của mình ;)

![](https://images.viblo.asia/4f25b162-e6a1-4e7f-b69d-ca3a6844825d.png)

Viết xong bài này vã quá mình đi ngủ đây :last_quarter_moon_with_face::last_quarter_moon_with_face:, nếu có gì thắc mắc các bạn để lại comment cho mình nhé. Hẹn gặp lại các bạn ở các bài sau ^^.

Source code bài này các bạn xem [ở đây](https://gitlab.com/maitrungduc1410/learning-docker/-/tree/complete-tutorial) nhé.