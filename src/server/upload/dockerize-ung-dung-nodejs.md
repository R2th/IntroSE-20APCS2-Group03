Chào mừng các bạn quay trở lại với series học Docker của mình. 

Sau [bài đầu tiên](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n) giới thiệu về Docker, các bạn đã có cái nhìn cơ bản về Docker và những thứ Docker mang lại, mình rất mong các bạn có thể dành chút thời gian để đọc (nếu các bạn chưa đọc) trước khi bắt đầu vào bài này ;)

Ở bài đầu tiên này chúng ta sẽ cùng `dockerize` một project NodeJS nhé. Mình chọn bắt đầu với project NodeJS vì NodeJS khá dễ để dockerize, giảm bớt nhiều khái niệm đập vào mắt các bạn ngay từ những bước đầu :D :-D. Ban đầu mình có ý định viết từng bài sẽ là độc lập các chủ đề để các bạn có thể tự do đọc từng bài nhưng sau khi ngồi review lại thì mình thấy có nhiều thứ, mà thứ nào mình cũng muốn đề cập tới các bạn, nên có thể có những bài mình sẽ chia ra thành 1-2 hay 3 phần để các bạn có thể hiểu tường tận nhé ;)

Bắt đầu thôi nào...

# Tiền Setup
Nhớ check là các bạn đã cài `Docker` và `Docker-compose` rồi nhé. Nếu chưa thì nhớ check lại phần cuối [bài trước của mình](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n) để biết cách cài đặt nhé.
# Setup
Các bạn clone source code [ở đây](https://gitlab.com/maitrungduc1410/learning-docker)

Tiếp theo ta mở folder **docker-node**. Ở đây mình đã setup cho các bạn sẵn 1 project NodeJS với Express khá đơn giản. Nếu các bạn đã cài sẵn Node ở hệ điều hành của bạn (môi trường gốc) thì các bạn có thể chạy thử và mở trình duyệt ở **localhost:3000** thì các bạn sẽ thấy màn hình chỉ in ra vài dòng Hello World :sunglasses:

Còn nếu các bạn chưa cài Node thì cũng không sao (quá tuyệt vời) chúng ta đang dùng Docker mà. Ngoài Docker các bạn sẽ không cần cài bất kì cái gì vào hệ điều hành gốc của các bạn, giữ hệ điều hành gốc càng "trong trắng " càng tốt :D :D.
# Build Docker Image
Như ở [bài trước](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n) mình đã đề cập, **Image** là đơn vị cơ bản nhất và là điều kiện tiên quyết để ta có thể chạy được project trong Docker. Image đại diện cho một môi trường trong đó có setup đầy đủ các tool, thư viện để chạy project. Từ **Image** ta mới có thể tạo ra **Container** (1 thực thể của Image, các bạn có thể coi Image như Class còn Container là Object của class đó ;)).

## Cấu hình Dockerfile
Và để tạo ra **Image** chúng ta sẽ viết cấu hình cho **Image** ở trong 1 file gọi là **Dockerfile**, trong đó sẽ đầy đủ chi tiết những thứ như: môi trường gì (ubuntu, win, Centos, debian,...), php mấy, database,....

Bắt tay vào làm thôi nhé.

Vấn ở trong folder **docker-node**, cả bài này chúng ta sẽ chỉ thao tác với folder này nhé. Các bạn tạo 1 file tên là **Dockerfile** với nội dung như sau:
```dockerfile
FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]
```

Giải thích file cấu hình bên trên:
- Ở đầu mỗi file Dockerfile ta luôn phải có FROM. FROM ý chỉ ta bắt đầu từ môi trường nào, môi trường này phải đã được build thành Image. Ở đây ta bắt đầu từ môi trường với Image có tên là `node:latest`, đây là Image đã được build sẵn và chính thức (official) từ team của NodeJS, Ở môi trường này ta có sẵn phiên bản NodeJS mới nhất (latest), hiện tại là 13.2. Làm sao để lấy thông tin của Image thì mình lấy ở [Docker hub](https://hub.docker.com/_/node/) nhé.
- Tiếp theo ta có từ khoá **WORKDIR**. Ý chỉ ở bên trong image này, tạo ra cho tôi folder tên là `app` và chuyển tôi đến đường dẫn `/app`. WORKDIR các bạn có thể coi nó tương đương với câu lệnh **mkdir /app && cd /app** (đường dẫn này các bạn có thể đặt tuỳ ý nhé, ở đây mình chọn là `app`)
- Tiếp theo ta có câu lệnh COPY và các bạn để ý thấy ta có 2 dấu "chấm", trông kì ta. :-D. Ý dòng này là: Copy toàn bộ code ở môi trường gốc, tức ở folder **docker-node** hiện tại vào bên trong Image ở đường dẫn **/app**. (chắc bạn sẽ thắc mắc vậy nếu muốn copy chỉ một hoặc một vài file thì sao, xem ở cuối bài nhé ;))
- Tiếp theo ta có câu lệnh RUN. RUN để chạy một câu lệnh nào đó khi build Docker Image, ở đây ta cần chạy `npm install` để cài dependencies, như bao project NodeJS khác. Các bạn thật chú ý cho mình là RUN chạy khi BUILD thôi nhé, và vì chạy khi build nên nó chỉ được chạy 1 lần trong lúc build, chú ý điều này để thấy sự khác biệt với CMD mình nói phía dưới nhé.
- Tiếp theo là câu lệnh CMD. CMD để chỉ câu lệnh **mặc định** khi mà 1 container được khởi tạo từ Image này. CMD sẽ luôn được chạy khi 1 container được khởi tạo từ Image nhé ;). CMD nhận vào 1 mảng bên trong là các câu lệnh các bạn muốn chạy, cứ 1 dấu cách thì ta viết riêng ra nhé. Ví dụ như: **CMD ["npm", "run", "dev"]** chẳng hạn
- Chú ý là một Dockerfile CHỈ ĐƯỢC CÓ DUY NHẤT 1 CMD. Ô vậy nếu tôi muốn có nhiều CMD thì làm thế nào?? Lát nữa đọc cuối bài nhé ;)

Ô xờ kê đã xong, vậy là ta đã có cấu hình môi trường để chạy project như chúng ta mong muốn, rất rõ ràng phải không, nhìn vào là biết môi trường có gì và làm gì ;)
## Build Docker Image
Tiếp theo có cấu hình rồi bây giờ chúng ta cần phải build image. các bạn chạy command sau để build image nhé:
```
docker build -t learning-docker/node:v1 .
```
Giải thích câu lệnh trên:
- Để build Docker image ta dùng command **docker build...*
- Option **-t** để chỉ là đặt tên Image là như thế này cho tôi, và sau đó là tên của image. Các bạn có thể không cần đến option này, nhưng như thế build xong ta sẽ nhận được 1 đoạn code đại diện cho image, và chắc là ta sẽ quên nó sau 3 giây. Nên lời khuyên của mình là LUÔN LUÔN dùng option -t này nhé. Phần tên thì các bạn có thể để tuỳ ý. Ở đây mình lấy là **learning-docker/node** và gán cho nó tag là **v1**, ý chỉ đây là phiên bản số 1. Nếu ta không gán tag thì mặc định sẽ được để là **latest** nhé.
- Cuối cùng mình có 1 dấu "chấm" ý bảo là Docker hãy build Image với **context** (bối cảnh) ở folder hiện tại này cho tôi. Và Docker sẽ tìm ở folder hiện tại Dockerfile và build.

Chạy command đó và xem có gì xảy ra nhé:

![Docker build image](https://images.viblo.asia/270d9799-6708-4ea5-83cd-5979244635b6.png)

Khi chạy command các bạn sẽ thấy là Docker sẽ duyệt từng dòng lệnh ở file Dockerfile và chạy qua chúng, mỗi câu lệnh là 1 **Step**, ở Step 1 Docker sẽ tìm Image tên là node:latest ở máy của bạn, vì không có nên Docker sẽ tự tìm ở trên một public Registry (Registry là nơi lưu trữ Docker image, các bạn tưởng tượng nó như Github lưu code, nhưng đây là lưu Image). Sau đó Docker sẽ tải Image này về và build, chi tiết từng bước các bạn có thể thấy rõ. 

Ok vậy là đã build Image xong. Để check danh sách các image có ở máy của bạn. Các bạn chạy command sau nhé ;):
```
docker images
# (show tên image, tag, Mã của Image,....)
```
Để xoá image thì các bạn dùng command:
```
docker rmi <Mã của Image>
```

Vậy là Image đã build xong. Và thường khi bước này xong là đã có thể thở phào nhẹ nhõm rồi vì đây có thể coi là bước khó nhất (tất nhiên ở bài này chưa có gì nên chưa khó :D)
# Chạy project từ Docker Image
Tiếp theo là thời khắc của sự thật, chúng ta sẽ cùng chạy project từ Image chúng ta vừa build nhé.

Để chạy project này ta sẽ tiến hành tạo ra 1 container từ Image vừa build nhé. Ở bài này chỉ 1 container là đủ, ở các ví dụ sau các bạn sẽ thấy 1 project thực tế sẽ cần hơn nhiều hơn 1 container và nhiều hơn 1 image ;)

Như ở bài trước mình đã nói, khi chạy thật (production) thường chúng ta sẽ dùng `docker-compose` để chạy, chứ không chạy trực tiếp bằng câu lệnh `docker run...` vì dùng `docker-compose` cho phép ta chạy cùng lúc nhiều container, monitor (kiểm soát) dễ hơn, trực quan hơn trong việc quản lý các container.

Để chạy project với `docker-compose`, ta tạo một file mới với tên là `docker-compose.yml`, vẫn ở folder `docker-node`nhé, với nội dung như sau:
```yaml
version: "3.7"

services:
  app:
    image: learning-docker/node:v1
    restart: unless-stopped
```
Giải thích:
- đầu tiên ta định nghĩa `version` (phiên bản) của file cấu hình `docker-compose`, lời khuyên là luôn chọn phiên bản mới nhất. Các bạn có thể xem [ở đây nhé](https://docs.docker.com/compose/compose-file/compose-versioning/)
- Tiếp theo là ta có **services**, bên trong **services** ta sẽ định nghĩa tất cả các thành phần cần thiết cho project của bạn, ở đây ta chỉ có 1 service tên là app với image là tên image các ta vừa build 
- Ở trong service **app** ta có trường **restart** ở đây  mình để là **unless-stopped**, ý bảo là tự động chạy service này trong mọi trường hợp (như lúc khởi động lại máy chẳng hạn), nhưng nếu service này bị dừng bằng tay (dừng có chủ đích), hoặc đang chạy mà gặp lỗi bị dừng thì đừng restart nó. Vì khả năng cao khi ta tự dừng có chủ đích là ta muốn làm việc gì đó, hay khi gặp lỗi thì ta cũng muốn tìm hiểu lỗi là gì trước khi khởi động lại ;)

Cuối cùng là chạy project thôi nào. Các bạn dùng command sau:
```
docker-compose up
```
Ta để ý terminal sẽ thấy như sau:
![docker compose](https://images.viblo.asia/a2acb5c9-89c7-41ff-bf8b-7bdc2e2c1f0e.png)
Giải thích:
- Đầu tiên một network mặc định (default) sẽ được tạo ra, và tất cả các services sẽ được join vào chung 1 network này, và chỉ các service ở trong network mới giao tiếp được với nhau. Tên network được mặc định lấy theo tên thư mục, nói chung các bạn chưu cần quan tâm tới phần này, mình sẽ nói các bài sau.
- Tiếp theo 1 container tên là docker-node_app_1 được tạo ra từ Image của chúng ta. Tên container được tự động chọn để không bị trùng lặp, ta có thể thay đổi tên mặc định này, tuỳ nhu cầu.
- Cuối cùng khi container được chạy thì dòng code **CMD ...** ở cuối file Dockerfile mà ta nói ở phần bên trên sẽ được chạy (các bạn xem lại file Dockerfile nhé).

Nom ổn rồi đó, thử mở trình duyệt xem nha..... BÙM :boom:, không thấy gì :disappointed_relieved::disappointed_relieved::sob::sob:

![Not found](https://images.viblo.asia/af18f139-7bed-4f20-b7ae-c421902a21d8.png)

Như ở bài trước phần [các khái niệm cần nắm vững](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n#_cac-khai-niem-can-nam-7), mình có nói tới phần **Mapping port**. Vì container chạy trong Docker là độc lập so với thế giới bên ngoài (ý là môi trường/hệ điều hành gốc) :-D. Mà khi user mở trình duyệt, gõ vào **localhost:3000** là user đang gọi đến cổng 3000 ở hệ điều hành gốc, chứ không phải là cổng của container. Do đó ta cần **map port** tức là dùng 1 port ở hệ điều hành gốc "tham chiếu" vào cổng tương ứng ở container.

Các bạn mở file `docker-compose.yml` và sửa lại như sau nhé:
```yaml
version: "3.7"

services:
  app:
    image: learning-docker/node:v1
    ports:
      - "3000:3000"
    restart: unless-stopped
```
Ở trên mình đã thêm vào 1 thuộc tính là ports để ta map các cổng (port) cần thiết. Ở đây ta chỉ map 1 cặp cổng 3000 (ở hệ môi trường gốc) vào cổng 3000 ở trong container. Chú ý **bên trái** là môi trường gốc (bên ngoài), bên phải là cổng của container. Ở đây cổng ở môi trường gốc ta có thể chọn tuỳ ý, nhưng cổng của container thì phải là 3000, project NodeJS của chúng ta chạy trong container ở cổng 3000. Do đó các bạn có thể thay đổi như: **"3001:3000" hay "5000:3000"**, tuỳ ý nhé, nhưng thường mình sẽ để cổng giống nhau luôn.

Sửa xong thì ta quay lại terminal, CTRL+C để terminate docker-compose đi và chạy command sau:
```
docker-compose down # dừng các container đang chạy
docker-compose up # khởi động lại
```
Và cuối cùng là mở trình duyệt:

![Docker](https://images.viblo.asia/adfc4c59-8d7c-4b81-ae47-2611780a0ac9.png)

Thành công mĩ mãn :muscle::muscle:.

Vậy là các bạn đã dockerize project NodeJS thành công. Các bạn có thể thấy rằng để chạy project NodeJS các bạn không hề cần cài tới NodeJS. Thử xem ở folder `docker-node` các bạn không thấy node_modules. Vì cái thực sự là ta đang chạy ở trong container, folder `docker-node` là ở hệ điều hành gốc, không còn liên quan gì nữa sau khi ta build thành công Image nữa rồi :D :-D

#  Vọc vạch
## Bên trong Container
Để xem thực sự bên trong container trông như thế nào, mở một terminal khác, các bạn chạy command:
```
docker-compose exec app sh
```
Chú ý bên trên **app** là tên của service/container ta muốn xem.

Sau khi chạy command trên là các bạn đã bước vào thế giới của Docker rồi đó ;). thử gõ **pwd** để check đường dẫn hiện tại là gì, thì ta thấy in ra là **/app** chính là WORKDIR ta thiết lập ở Dockerfile nhé

Thử gõ **ls -l** để liệt kệ các file trong đường dẫn hiện tại, các bạn sẽ thấy như sau:

![Docker container](https://images.viblo.asia/fe933978-310e-47ed-b7a3-0c26681e2a50.png)

Đây mới thực sự là những gì được chạy, và những gì trả ra được kết quả mà ta thấy ở trình duyệt nhé ;)

Tiếp theo ta thử check xem phiên bản hiện tại của NodeJS đang chạy là bao nhiêu nhé. Các bạn gõ command sau:
```
node -v
```
Các bạn sẽ thấy in ra như sau:
![Docker node](https://images.viblo.asia/2a44ca0f-5970-4c0b-83f5-485f6b341ae4.png)

> Note: Các bạn để ý lúc chúng ta viết cấu hình cho file Dockerfile, đoạn đầu ta có FROM.... mình có nói là mình lấy Image đó ở [Docker hub](https://hub.docker.com/_/node/), và image chúng ta chọn có tag là latest. Các bạn vào link đó, search **latest** và click vào và các bạn sẽ được dẫn tới 1 [trang github này](https://github.com/nodejs/docker-node/blob/31bd89bbd77709b5dae93c31dbd74bf32b7c4867/13/stretch/Dockerfile). Ở đó, các bạn thấy một file Dockerfile, và file Dockerfile này sẽ dùng để build cho chúng ta một môi trường tên là **node:latest** để chúng ta có thể dùng luôn sau này. Các bạn đọc ở file Dockerfile đó sẽ thấy có biến **NODE_VERSION** chỉ phiên bản NodeJS, và còn rất nhiều thứ khác các bạn có thể xem để biết thêm ;)


**Có thể bạn không thắc mắc**: vậy môi trường trong container này là hệ điều hành nào? ồ từ đầu đến giờ, từ lúc ta build Image ta không hề nói tới điều này, không biết là Ubuntu, Centos, Win hay gì :-D

Để kiểm tra thông tin hệ điều hành trong container các bạn chạy command sau:
```
cat /etc/os-release
```
Chúng ta thấy như sau:

![Docker container](https://images.viblo.asia/d8e6891c-7818-49b0-b90f-50bee16cab74.png)

Thì ra là container đang được chạy dưới môi trường hệ điều hành Debian. WTF Debian, nó là cái gì và ở đâu ra thế này??

## Các bản phân phối Linux và cách chọn Image sao cho đúng
Phần này nghe có vẻ không liên quan nhưng lại rất cần để các bạn hiểu và chọn image sao cho đúng, nên cố gắng dùng nhiều não hơn nha các bạn :rofl::rofl:
### Các bản phân phối Linux
Linus Torvalds là cha đẻ của Linux, người viết ra hệ điều hành theo mình là phổ biến nhất thế giới bây giờ, hầu hết mọi server đều dùng đến nó. Và từ Linux, các tổ chức cá nhân lấy cái kernel, cái core của Linux và viết ra thành các dạng "biến thể" mới với những sự ưu việt riêng, mỗi dạng biến thể đó gọi là một bản phân phối (Distribution). Ta có các bản phân phối như : Ubuntu, Centos, Alpine, Redhat, Debian, Kali,...

Lại từ mỗi bản phân phối ví dụ Debian, người ta lại có những thực thể nhỏ hơn như Debian-Jessie, Debian-Stretch, Debian-Buster,....Các thực thể nhỏ hơn đó có thể coi là phiên bản của bản phân phối Debian, thay vì gọi là 1.0, 2.0 thì họ dùng tên để dễ gợi nhớ. 

Quay trở lại với trang [Docker hub](https://hub.docker.com/_/node/) nơi mình lấy Image NodeJS, các bạn có thể thấy ở đó là bạt ngàn các Image NodeJS được build sẵn, có phiên bản của Node + thêm 1 tag phía sau, phần tag phía sau chính là để chỉ môi trường hệ điều hành mà chúng ta mong muốn.

### Cách chọn bản phân phối thích hợp cho Image
Vậy giờ các bạn thắc mắc là thế phải chọn bản phân phối nào, tôi nhìn thấy nào là **Jessie** nào là **stretch** rồi **alpine**, **buster**,... loạn hết cả.

Thì tùy nhu cầu của các bạn mà ta chọn một bản phân phối phù hợp. Nhưng tiêu chí nên là **nhẹ nhất**, **vừa nhất** (không cần một bản phân phối to đùng, nhiều chức năng trong khi ta chỉ chạy một project bé xíu), và quan trong **bảo mật** phải tốt.

Và lời khuyên của mình là các bạn chọn bản phân phối **Alpine**. Đây là một bản phân phối của Linux rất nhẹ, tối giản và tập trung vào bảo mật cao (Quá tuyệt vời :D), cùng xem so sánh về size của chúng nhé ;):

![Docker image](https://images.viblo.asia/ed5c5f81-1003-4c97-a5bf-f5c420074bba.png)

Việc dùng **alpine** giúp ta giảm được size khi build image, build sẽ nhanh hơn nhiều nữa đó ;)

### Ở đâu quen đó
Dù các bản phân phối của Linux thì bản chất cái Nhân (kernel) của chúng đều là Linux nên phần lớn các command, cách vận hành giống nhau, nhưng vẫn sẽ có những sự khác nhau và khi ta dùng bản phân phối nào thì ta cần làm quen với chúng.

Như ở trên mình khuyên các bạn dùng **Alpine** thì ở alpine để cài package/thư viện ta dùng **apk add** chứ không phải **apt-get** như trên Ubuntu nữa

Cùng với đó là những sự khác biệt khác mà khi chúng ta dùng ta cần lưu ý, và khi search Google cũng thế nhé. Thời gian mới đầu mình dùng Alpine mà solution thì toàn dùng của  Ubuntu xong cài toàn báo lỗi **command not found** :-D

## Review và build lại Image
Ở phần này ta sẽ cùng review lại Image chúng ta vừa build ở trong bài này, và tối ưu, giảm size của image xuống bằng cách chọn bản phân phối phù hợp nhé.
### Review

Như ở trên phần **Vọc Vạch** đoạn check thông tin hệ điều hành ta thấy:

![Docker Debian](https://images.viblo.asia/d8e6891c-7818-49b0-b90f-50bee16cab74.png)

Nhìn vào đây ta thấy à đây là bản phân phối Debian của Linux, tên phiên bản là **stretch**

Tiếp theo chúng ta sẽ cùng check xem size Image của chúng ta là bao nhiêu nhé. Các bạn chạy command sau:
```
docker images
```
Ta sẽ thấy như sau:

![Docker image](https://images.viblo.asia/b447667c-f6df-45c5-ae6c-54bf44ac4fb3.png)

WTFFFFF, **936MB**, thật sự là tôi có làm cái gì đâu, project có mỗi một trang Hello World mà size những tận gần 1GB, thử hỏi sau này project tăng lên, thì size của project còn tăng đến mức nào

### Build lại Image
Như ở trên mình đã có lời khuyên và từ giờ trở đi trong tất cả các bài sau **chúng ta sẽ sử dụng bản phân phối Alpine** cho mọi Image chúng ta build nhé, và Alpine cũng sẽ được dùng để chạy Production (chạy thật) luôn nhé.

Bắt tay vào làm thôi nào. Ta quay lại file Dockfile của chúng ta. Ở dòng đầu tiên chính là nơi ta cần quan tâm.:
```dockerfile
FROM node:13-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]
```
Ở trên sự thay đổi duy nhất đó là dòng đầu tiên **FROM**. Ở đây ta dùng môi trường của bản phân phối Alpine, có cài sẵn NodeJS 13.

Mình khuyên các bạn luôn nói rõ phiên bản của nodejs (hay sau này là php), chứ không dùng **latest**. Vì NodeJS sẽ liên tục được phát triển và cập nhật, nếu ta chỉ để **latest** thì 1 năm nữa cái latest đó có thể đã là phiên bản 20.0, và nhiều hàm/chức năng của NodeJS mà ta sử dụng không còn hoạt động được nữa. Do đó để 10 năm sau code của ta vẫn chạy băng băng thì nên luôn luôn nói rõ phiên bản của Node, PHP, python,... mà chúng ta cần dùng nhé ;)

Tiếp theo ta build lại image nhé. các bạn chạy command sau:
```
docker build -t learning-docker/node:v2 .
```
ở trên ta build lại Image đặt tag là **v2** để lát nữa ta có thể nhìn trực quan hơn và so sánh size với tag **v1** ta build trước đó nhé.

Sau khi build xong Image, ta thử chạy lại project xem chắc chắn mọi thứ vẫn ổn đã nhé. Các bạn sửa lại fie **docker-compose.yml** phần tên Image sửa thành v2. Sau đó ta chạy command sau để khởi động lại project nhé :
```
docker-compose down
docker-compose up
```

Thử mở lại trình duyệt và các bạn sẽ thấy mọi thứ vẫn phải ok nhé ;)

### Giây phút của sự thật
Tiếp theo ta sẽ so sánh xem Image ta mới build là **v2** có nhỏ hơn nhiều bản **v1** trước khi không nhé. Các bạn chạy command sau:
```
docker images
```
Và.............

![Docker image](https://images.viblo.asia/6a612490-85e5-4596-aae2-10985f78427c.png)

Ô mai chuổiiiiiiii, chỉ còn **113MB** mà ta vẫn có một project chạy như trước, thời gian build image cũng nhanh hơn nữa.

Các bạn check thử xem bản phân phối hiện tại có đúng là Alpine không nhé. Chạy command sau:
```
docker-compose exec app cat /etc/os-release
```
Và ta sẽ thấy in ra màn hình thông tin về môi trường hệ điều hành bên trong Container.

> Tip: nếu các bạn để ý, để chạy command trong container ta có 2 cách: 1 là "chui" hẳn vào trong container với command "docker-compose exec app sh", 2 là ta ở ngoài và chạy command "docker-compose exec app <do something>" như bên trên mình làm. Dùng cách nào cũng được nhé các bạn ;)

### Alpine có luôn đem lại hạnh phúc?
    
Việc mình khuyên các bạn dùng Alpine để tối giản hóa Image sẽ áp dụng được cho hầu hết các trường hợp. Nhưng đôi khi sẽ có một số trường hợp củ chuối, mà dùng Alpine ta không thể cài được một số thư viện do chưa support thư viện đó chẳng hạn (mình đã thất bại khi cài một số thư viện python cho xử lý âm thanh), khi đó ta vẫn sẽ buộc phải dùng các bản phân phối như Ubuntu hay Debian để có thể chạy được project. 
    
Và như thế thì ta phải chấp nhận size project rất to, trong khi cái project của ta thực sự làm thì không quá to đến vậy :-D. Nhưng phải chấp nhận các bạn à và chỉ có 1 số rất ít trường hợp (theo mình nghĩ) thôi.
    
# Các câu hỏi liên quan
Xuyên suốt trong bài này có nhiều chỗ mình nghĩ rất có thể các bạn có thắc mắc và cũng đã "phím" trước cho các bạn là đọc ở phần này, và dưới đây là những câu hỏi đó
## Nếu tôi muốn chỉ COPY một hoặc một số file khi build Image
Ở trên khi build Image mình có dùng **COPY . .** ý chỉ copy toàn bộ thư mục hiện tại vào container. Nhưng rất có thể các bạn sẽ chỉ muốn copy 1 hoặc một vài file nào đó. Khi đó ta làm như sau:
```dockerfile
COPY app.js .  # Copy app.js ở folder hiện tại vào đường dẫn ta set ở WORKDIR trong Image
COPY app.js /abc/app.js   ## Kết quả tương tự, ở đây ta nói rõ ràng hơn (nếu ta muốn copy tới một chỗ nào khác không phải WORKDIR)
    
# Copy nhiều file
COPY app.js package.json package-lock.json .
# Ở trên ta các bạn có thể copy bao nhiêu file cũng được, phần tử cuối cùng (dấu "chấm") là đích ta muốn copy tới trong Image
```
## Tôi search Google thấy người ta dùng ADD để copy file
COPY và ADD trong Docker phục vụ chung một mục đích đó là copy file từ một nơi nào đó vào trong Image.
    
COPY nhận vào đối tượng cần copy và đích cần copy tới trong image. Và COPY **chỉ cho phép** ta copy file từ local, từ máy gốc của chúng ta vào trong Image
    
ADD cũng làm được điều tương tự nhưng nó có thêm 2 chức năng đó là:
- ta có thể copy từ một địa chỉ URL vào trong Image 
- ta cũng có thể giải nén một file và copy vào trong Image
    
Hầu hếu các trường hợp khi ta dùng đến URL là ta muốn download file thì ta sẽ dùng câu lệnh **RUN curl/wget ....** để download file hoặc nếu ta muốn giải nén file thì ta cũng sẽ dùng **RUN tar -xvzf ...** để giải nén
    
Do đó lời khuyên của mình là luôn dùng **COPY** để làm rõ bạn đang muốn thực hiện hành động nào nhé ;)
## Nếu cuối file Dockerfile tôi không có CMD có được không?
Khi một container được khởi chạy từ một Image, Docker yêu cầu là trang thái của container lúc đó phải là running, tức là lúc đó nó đang phải chạy một chương trình nào đó. 
    
Ở ví dụ của chúng ta nếu ta bỏ dòng cuối CMD đi, thử build image, vẫn oke, nhưng khi ta khởi động project bằng command **docker-compose up** ngay lập tức ta sẽ thấy có dòng :
    
![Docker](https://images.viblo.asia/f6a93b67-effe-433e-a6c9-71e6442d4c6d.png)

Do đó ở cuối file Dockerfile sau khi setup môi trường xong xuôi ta LUÔN phải chạy một thứ gì đó để khi container khởi động nó luôn ở trạng thái "làm việc" ;)
    
> Đây cũng là lí do nhiều bạn gặp lỗi container bị exit khi dùng **PM2** để chạy project NodeJS với docker, mình sẽ giải thích thêm ở các bài tới nhé ;)

## Mỗi file Dockerfile chỉ cho phép có 1 CMD, vậy nếu tôi muốn có nhiều CMD thì sao?
Thì hiện tại Docker chỉ cho phép chạy 1 `CMD` khi khởi động container, nhưng nếu CMD của các bạn phức tạp thì ta có thể dùng tới `ENTRYPOINT`

ENTRYPOINT, có thể hiểu theo nghĩa đen là "điểm bắt đầu", nó có thể chạy khá giống như `CMD` nhưng cũng có thể dùng để cấu hình cho `CMD` trước khi ta chạy `CMD`. Một trường hợp thường dùng với `ENTRYPOINT` là ta dùng 1 file shell script `.sh` để cấu hình tất tần tật những thứ cần thiết trước khi khởi chạy container bằng `CMD`

```Dockerfile
....
ENTRYPOINT ["sh", "/var/www/html/.docker/docker-entrypoint.sh"]

CMD supervisord -n -c /etc/supervisord.conf
```
    
Phần này tùy trường hợp và cũng nâng cao cần nhiều kĩ năng hơn nên mình sẽ chia sẻ sau, nếu các bạn muốn có thể search google để biết cách sử dụng ngay nhé ;)
    
> Trong Dockerfile có thể vừa có ENTRYPOINT vừa có CMD 
 
## Tôi có thể FROM nhiều lần được không ?
    
Câu trả lời là có nhé, bạn có thể FROM nhiều lần từ nhiều môi trường. Thường dùng trong trường hợp ta chia quá trình build Image thành các giai đoạn (stage), mỗi giai đoạn ta cần 1 môi trường khác nhau. Phần này khi demo với VueJS các bạn sẽ thấy nhé ;)
    
## Tôi muốn chạy docker-compose ở background?

Để khởi động project bằng **docker-compose** ở background, không làm treo terminal nữa thì ta dùng command sau:
```
docker-compose up -d     # thêm option -d nhé
```
"Ôi, chạy ở background tôi không xem được log???"
    
 Để check log khi project đang chạy các bạn có thể dùng command sau:
    
```
docker-compose logs    # check log ở thời điểm command chạy
docker-compose logs -f     # check log realtime
```

# Đôi dòng kết bài
Phù... cha nội hay bốc phét, đầu bài quảng cáo ngắn cuối bài dài quá trời dài :-D
    
Dù ở đầu bài mình nói là bắt đầu với project NodeJS để giảm khái niệm cho các bạn, nhưng đến cuối thì vẫn có 1 tỉ thứ đập vào mắt :-D. Thực ra đây là những khái niệm mở đầu, và ở bài này do mới bắt đầu nên mình muốn làm rõ luôn. Sau này khi quen các bạn sẽ thấy là **dockerize** một project NodeJS sẽ khá là đơn giản (dockerize project Laravel mới thực sự là thách thức nhé ;))
    
Bài này theo mình khá là quan trọng vì nó là bước đầu giới thiệu khi các bạn đến với Docker và những thắc mắc liên quan.
    
Trong bài có những chỗ định nghĩa mình đã đơn giản câu từ theo góc nhìn của mình để các bạn đỡ thấy khó hiểu, nhưng có thể vẫn còn khó hiểu thì comment cho mình biết nhé, hoặc nếu có chỗ nào chưa chính xác cũng cứ để lại comment cho mình nhé.
    
Cám ơn các bạn đã theo dõi. Nhớ đón đọc các bài tiếp của mình nhé ;)
    
Source code bài này mình để [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) (nhánh **complete-tutorial** nhé)
    
.
    
.
    
.
    
BÀI NÀY PROJECT DỄ QUÁ, TÔI MUỐN XEM PROJECT NODEJS CÓ MONGDB, REDIS, ... thì nó mới thực tế chứ. Chúng ta cứ đi dần dần các bạn nhé, mình sẽ cố gắng chia sẻ hết những gì có thể ;)