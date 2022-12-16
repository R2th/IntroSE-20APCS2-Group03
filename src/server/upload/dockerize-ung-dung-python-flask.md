Chào mừng các bạn đã quay trở lại với series [học Docker và CICD](https://viblo.asia/s/series-hoc-docker-cicd-tu-co-ban-den-ap-dung-vao-thuc-te-jeZ103QgKWz) của mình 👋👋

Ở bài trước mình đã hướng dẫn các bạn cách [**dockerize** một ứng dụng NodeJS](https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG), đồng thời cùng với đó là một số khái niệm và câu hỏi liên quan trong bài.

Ở bài này chúng ta sẽ tiếp tục series bằng cách thực hành dockerize một ứng dụng Python Flask nhé. ;)

"DỪNG DỪNG DỪNG, NEXT, NEXT, chuyển bài ông ơiiiii... Tôi dev NodeJS PHP chứ có phải Python đâu mà care" :D :D

Mục đích của series này là mình sẽ hướng dẫn các bạn học Docker, trong bài này mình nghĩ các bạn hoàn toàn có thể hiểu được dù bạn chưa bao giờ code Python. Do đó mình hi vọng rằng các bạn vẫn sẽ theo sát được series này, từng bài từng bài, vì trong mỗi bài sẽ có những vấn đề liên quan đến Docker mình muốn gửi tới các bạn.

Bắt tay vào làm thôi nào

# Tiền Setup

Nhớ check là các bạn đã cài Docker và Docker-compose rồi nhé. Nếu chưa thì nhớ check lại [phần cuối bài trước](https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n) của mình để biết cách cài đặt nhé.

# Setup
Các bạn clone source code [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) về nhé.

Ở bài này ta sẽ chỉ quan tâm tới folder **docker-python** sau khi clone nhé ;). Ở đó mình có setup cho các bạn một ứng dụng Python dùng Flask framework nhé (bạn nào dev PHP có thể coi nó như Laravel của PHP vậy ;))

Nếu các bạn có cài Python ở máy thì có thể chạy command sau để chạy project nhé:
```
pip install -r requirements.txt
python app.py
```
Mở trình duyệt ở địa chỉ **localhost:5000** và các bạn sẽ thấy dòng Hello World

Còn nếu máy các bạn không có Python, thì vẫn tuyệt vời ô sờ kê nhé. Chỉ cần các bạn đã cài Docker và Docker compose, những thứ khác có hay không có, không quan trọng :rofl::rofl:

# Build Docker Image
Vẫn như ở [bài trước](https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG), đầu tiên ta cần tạo file cấu hình Dockerfile và định nghĩa môi trường chúng ta mong muốn, sau đó ta sẽ build image và chạy nhé :)
## Cấu hình Dockerfile
Ở thư mục **docker-python** các bạn tạo file tên là **Dockerfile**, bên trong có nội dung như sau:
```dockerfile
FROM python:3.6-alpine

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["python", "app.py"]
```
Giải thích:
- Dòng đầu tiên **FROM**: ta bắt đầu từ 1 Image có môi trường Alpint và đã cài sẵn Python phiên bản 3.6. Xem danh sách Image Python ở đâu, các bạn check ở [link chính thức](https://hub.docker.com/_/python) này nhé
- Lí do sao lại chọn Alpine mà không phải Ubuntu hay Debian, CentOS,.... Thì ở [bài trước ở mục này](https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG#_cac-ban-phan-phoi-linux-va-cach-chon-image-sao-cho-dung-8) mình đã phân tích rồi nhé. Đồng thời xuyên suốt series này mình sẽ luôn dùng môi trường hệ điều hành Alpine Linux nhé
- Tiếp theo trong file Dockerfile ta có **WORKDIR**: ý là ta sẽ chuyển đến đường dẫn là **/app** bên trong Image, nếu đường dẫn này không tồn tại thì sẽ tự động được tạo luôn nhé
- Tiếp theo ta **COPY** toàn bộ file từ folder ở môi trường gốc (bên ngoài - folder **docker-python**) và đưa vào trong đường dẫn **/app** bên trong Image
- Tiếp tới là ta cài đặt dependencies, cần cài những thứ gì thì ta đề cập sẵn ở file **requirements.txt** rồi (câu lệnh này các bạn có thể xem nó xêm xêm như **npm install** trong NodeJS nhé)
- Cuối cùng là ta dùng **CMD** để chỉ command mặc định khi một container được khởi tạo từ Image: ở đây ta sẽ khởi động file **app.py**

## Build Docker Image
Sau khi cấu hình nhiễn nhặn ngon rồi, bước tiếp theo là ta build Image thôi. Các bạn chạy command sau để build Image nhé:
```
docker build -t learning-docker/python:v1 .
```
Ở [bài trước](https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG#_build-docker-image-4) mình đã giải thích cho các bạn command trên làm gì rồi, các bạn có thể xem lại nhé.

Giải thích nhanh: command trên sẽ build 1 image tên là **learning-docker/python** với tag là **v1**, cả tên và tag ta đều có thể chọn tùy ý, nếu ta không để tag thì sẽ tự động được lấy là **latest**. Dấu "chấm" ở cuối ý bảo Docker là "tìm file Dockerfile ở thư mục hiện tại và build" nhé ;)

Sau khi quá trình build Image thành công, các bạn có thể kiểm tra bằng command:
```
docker images
```
Sẽ thấy hiển thị như sau nhé:

![Docker python](https://images.viblo.asia/7959921d-db8f-406e-a2c5-de145d8be96c.png)

# Chạy Project
Sau khi ta đã build thành công Image rồi thì bước tiếp theo là chạy project lên và xem thành quả thôi nhé ;).

Vẫn ở folder **docker-python**, các bạn tạo file **docker-compose.yml**, với nội dung như sau:
```yaml
version: "3.7"

services:
  app:
    image: learning-docker/python:v1
    ports:
      - "5000:5000"
    restart: unless-stopped
```
Ở [bài trước phần chạy project](https://viblo.asia/p/dockerize-ung-dung-nodejs-RnB5pxEG5PG#_chay-project-tu-docker-image-5) mình đã giải thích cho các bạn những thứ bên trên. Nếu các bạn chưa đọc thì nên xem qua nhé ;).

Giải thích nhanh:
- Ta định nghĩa 1 service tên là **app**, service này khi chạy sẽ tạo ra 1 container tương ứng, container được tạo từ image với tên chúng ta đã chọn.
- Ta **map port** từ cổng 5000 ở máy gốc (bên ngoài) vào cổng 5000 bên trong container, vì project của chúng ta được chạy ở cổng 5000 (mặc định của Flask)

Nom chừng cách setup chả khác cho bài trước làm với NodeJS là mấy nhỉ :-D.

Để khởi động project các bạn chạy command sau:
```
docker-compose up
```
Sau đó các bạn sẽ thấy ở terminal hiển thị như sau

![docker compose python flask](https://images.viblo.asia/6519e1f4-1c9a-4045-8884-d617f681a0fb.png)

Quá ổn, test thử thôi nào. Các bạn mở trình duyệt ở địa chỉ **localhost:5000** nhé.

Và BÙM :boom: 

![Docker python](https://images.viblo.asia/706737fb-1422-4846-aa64-4b61e016c989.png)

Không có gì xảy ra :sob::sob:

Thử review lại code xem nhé:
- File app.py khá đơn giản, không có gì đáng gờm
- Đã có command chạy app ở file Dockerfile
- Port cũng đã map ở file docker-compose.yml

Thế vấn đề là ở đâu nhỉ??

Rõ ràng nếu mình chạy trực tiếp từ môi trường ngoài, máy gốc của mình (nếu ở máy gốc các bạn có cài Python), không dùng Docker nữa, thì mọi thứ vẫn oke mà nhỉ... :confounded::confounded:

Thử review lại [docs của Flask ở đây](https://flask.palletsprojects.com/en/1.1.x/quickstart/), và ta đã tìm ra chân lý, chúng ta để ý mục **Externally Visible Server**. Mình sẽ dịch luôn cho các bạn:
```
Nếu bạn chạy ứng dụng lên thì bạn sẽ để ý thấy rằng ứng dụng của bạn chỉ có thể truy cập được trong phạm vi máy của bạn (localhost), điều này được cài đặt mặc định
```
Do đó khi chạy project của chúng ta trong container thì chỉ môi trường trong container mới truy cập được vào project, project của chúng ta coi môi trường đó mới là **localhost**, còn từ môi trường gốc (bên ngoài) truy vấn thì sẽ không được gọi là localhost nữa.

> Note: các bạn chú ý điều này vì sau này khi dockerize project Nuxt cũng sẽ bị tương tự

Do đó để fix điều này ta làm như sau.

Các bạn sửa lại file app.py một chút như sau nhé:
```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html', title='Docker Python', name='James')

if __name__ == "__main__":
    app.run(host="0.0.0.0")
```
Ở trên ta chỉ thêm vào duy nhất **host=0.0.0.0** để nói với project chúng ta là "chấp nhận cho tất cả mọi IP truy cập"

Ổn rồi đó chúng ta build lại image nhé:
```
docker build -t learning-docker/python:v1 .
```
Sau khi build xong thì ta cần khởi động lại project nhé, các bạn chạy command sau:
```
docker-compose down
docker-compose up
```

Và cuối cùng là mở trình duyệt và test thôi nào:

![Docker python](https://images.viblo.asia/cff7d79a-228b-485e-875e-e9a16d0d6b36.png)

Tuyệt vời :clap::clap:
# Biến môi trường (ENV)
Bài trước và bài các bạn có thể thấy là project khi chạy đều được fix cứng 1 cổng (bài trước là 3000, bài này là 5000), thế nếu ta muốn container chạy ở một cổng khác thì ta lại phải sửa code hay sao??

Lúc đó ta sẽ nghĩ tới **biến môi trường (environment variable)**, trong quá trình dev và khi chạy thật tế sử dụng biến môi trường sẽ giúp ta rất nhiều trong việc giảm tối thiểu việc phải sửa code
## Biến môi trường ở Dockerfile
Đầu tiên là ta sẽ thử dùng biến môi trường khai báo ở Dockerfile để thiết lập Port(cổng) cho project chạy trong container nhé (ý là container sẽ không chạy ở port 5000 nữa)

Ở file **app.py** ta sửa lại như sau:
```python
from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('index.html', title='Docker Python', name='James')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.environ['PORT']) # Chạy project ở PORT nhận vào từ biến môi trường
```
Sau đó ở file Dockerfile ta sửa lại như sau:
```dockerfile
FROM python:3.6-alpine

WORKDIR /app

# Tạo ra biến môi trường tên là PORT với giá trị 5555
ENV PORT 5555

COPY . .

RUN pip install -r requirements.txt

CMD ["python", "app.py"]
```
Ở file **docker-compose.yml** ta sửa lại chút như sau nhé:
```yaml
version: "3.7"

services:
  app:
    image: learning-docker/python:v1
    ports:
      - "5000:5555"
    restart: unless-stopped
```

Các bạn để ý ở trên khi ta map port ta chỉ chuyển mỗi vế bên phải, vế bên phải là port của project chạy **ở trong container** nhé, vế bên trái là port ở môi trường gốc (bên ngoài, ta có thể chọn tùy ý, và đây, port 5000 chính là port mà user sẽ dùng để truy cập ở trình duyệt)

Tiếp theo ta tiến hành build lại image nhé:
```
docker build -t learning-docker/python:v1 .
```
Và khởi động lại project:
```
docker-compose down
docker-compose up
```
Mở trình duyệt ở địa chỉ **localhost:5000** (vẫn như cũ), các bạn sẽ thấy mọi thứ chạy bình thường, nhưng ngó qua Terminal thì sẽ thấy như sau:

![Docker python](https://images.viblo.asia/9046e9a7-299b-4f0e-a788-9ff9b048d796.png)

Ở hình trên ta thấy rằng ở bên trong container, project của chúng ta đã được chạy ở port 5555 rồi nhé ;)

Thế nếu bây giờ ta muốn đổi port của project trong container thành 6666 thì sao, ta lại phải build lại Image?

Với những dạng biến môi trường mà dễ thay đổi thì ta có sự lựa chọn khác đơn giản hơn đó là khai báo ở file **docker-compose.yml** nhé

## Biến môi trường ở docker-compose
Để không phải build lại image mỗi lần ta đổi port, ta sẽ khai báo biến môi trường ở **docker-compose.yml** nhé. Tại sao:
- Biến môi trường ở file Dockerfile sẽ được khai báo khi ta build image
- Biến môi trường ở file docker-compose.yml sẽ được khởi tạo **khi container được khởi tạo**, tức là khi ta chạy **docker-compose up**. Do đó để thay đổi biến môi trường ta chỉ cần **down và up** là xong ;)

Thử nghiệm thôi nào...

Ở file Dockerfile ta xóa dòng **ENV PORT 5555** đi nhé.

Sau đó ở file **docker-compose.yml** ta sửa lại như sau:
```yaml
version: "3.7"

services:
  app:
    image: learning-docker/python:v1
    ports:
      - "5000:6666"
    restart: unless-stopped
    environment:
      PORT: 6666
```

Bây giờ ta vẫn cần build lại image 1 lần để cập nhật mới được áp dụng:
```
docker build -t learning-docker/python:v1 .
```
Sau đó ta khởi động lại project nhé:
```
docker-compose down
docker-compose up
```
Sau đó F5 lại trình duyệt để chắc chắn mọi thứ vẫn ổn, và xem ở terminal:

![Docker python](https://images.viblo.asia/53cfd224-ea10-4b3c-99a2-890d8ede9d10.png)

Vậy là ta đã có thể dễ dàng thay đổi cổng của project trong container khi dùng biến môi trường rồi. Các bạn thử đổi lại thành 7777 thử xem (nhớ **down và up** docker-compose nhé ;))

## Cách tốt hơn để tạo biến môi trường
Ở ví dụ trên nếu ta muốn đổi PORT thành 7777 chẳng hạn, ta phải sửa ở 2 nơi trong file **docker-compose.yml**, vậy nếu biến đó dùng ở 100 nơi trong file **docker-compose.yml** thì sao?

**docker-compose** support ta một cách đơn giản hơn, tiện hơn để khởi tạo biến môi trường, đó là đặt ở file **.env** (giống y như Laravel :sunglasses:, cũng đồng nghĩa với việc nếu ta dockerize project Laravel thì ta chỉ cần duy nhất 1 file chung là **.env**). Khi chạy project thì **docker-compose** sẽ tự tìm xem có file **.env** hay không và load các biến trong đó.

Cùng thử nhé :)

Ở folder **docker-python** ta tạo file **.env** với nôi dung như sau:
```
PORT=8888
PUBLIC_PORT=9999
```
Giải thích:
- biến **PORT**: chỉ port của project chạy **bên trong** container
- biến **PUBLIC_PORT**: chỉ port mà "thế giới bên ngoài" dùng để truy cập vào project ;) (ý là port ta gọi ở trình duyệt)

Ta sửa lại file **docker-compose.yml** như sau:
```yaml
version: "3.4"

services:
  app:
    image: learning-docker/python:v1
    ports:
      - "${PUBLIC_PORT}:${PORT}"
    restart: unless-stopped
    environment:
      PORT: ${PORT}
```
Sau đó ta khởi động lại project nhé:
```
docker-compose down
docker-compose up
```
Check ở terminal ta sẽ thấy:

![Docker python](https://images.viblo.asia/0650dba4-55bd-4b0c-88a2-ff54738d1f89.png)

Tuyệt vời, project đã chạy thành công ở cổng 8888 trong container. Giờ check trên trình duyệt thôi nào.

Ta mở trình duyệt ở địa chỉ **localhost:xxxx** (các bạn tự điền xxxx xem là gì nhé ;))

# Push Image lên registry
Ở bài trước dài quá mình chưa nói thêm vào các đưa image lên registry và làm người khác có thể chạy được project của bạn từ image như thế nào. Ở bài này thì ta có đất diễn rồi ;)

Docker build chạy ngon nghẻ ở máy của ta rồi thì thử đưa cho người khác xem họ chạy thế nào chứ nhỉ :-D

> **registry** là nơi ta lưu Docker image (giống như github để lưu code, nhưng đây là lưu Docker image), có rất nhiều registry, có public có private.

Ở trong series này ta sẽ dùng Gitlab để lưu code và cả lưu image trên registry của họ nhé. Gitlab cho ta unlimited image ở private registry cho **từng** repository (quá tuyệt vời mà còn free lại còn private)

## Tạo account và repository trên Gitlab
Đầu tiên các bạn cần tạo 1 tài khoản trên Gitlab.com (nếu chưa có). Sau đó ta tạo một repository tên là **learning-docker** cho toàn bộ series này nhé ;)

Sau đó click chọn repository ta vừa tạo, để ý ở phần sidebar bên tay trái, hover chuột vào **Packages**, sau đó click chọn **Container Registry**, đây chính là nơi ta sẽ dùng để lưu trữ image nhé ;)

Các bạn sẽ thấy hiển thị như sau:

![Gitlab registry](https://images.viblo.asia/fe79e055-bfa2-4205-a529-b12965d3350f.png)


## Bắt đầu
Giờ ta sẽ cùng thực hành đẩy image registry của gitlab nha :)

Đầu tiên như ở hình trên, ta cần login vào registry của Gitlab trước (vì registry này là private mà ;)). Ta chạy command sau để login:
```
docker login registry.gitlab.com
```
Ta sẽ thấy ở terminal hỏi email và password tài khoản gitlab, các bạn nhập thông số của các bạn vào nhé. 

Sau đó bước tiếp theo như ở hình trên ta cần build image. Nhưng vì image ta đã có sẵn ở local rồi nên ta không cần thiết build lại nữa.

"Ok vậy là tôi có thể đẩy luôn lên Gitlab rồi ấy gì?" - Chưa ăn ngay được đâu các bạn :-D

Khi đẩy image lên registry của gitlab ta cần phải đặt tên image theo chuẩn của họ, tag có thể đặt tùy ý nhưng tên phải đúng, theo format sau:
```
registry.gitlab.com/<username>/<tên repo>
```
Ở hình trên các bạn copy paste câu lệnh docker push để xem bạn cần phải đặt tên image thế nào nhé

Sau khi biết cần đặt tên như nào rồi thì ta có 2 lựa chọn:
1. Build lại image như command thử 2 ở trong hình trên để được image với tên theo format
2. Đổi tên Image hiện tại đã có ở local 

Ở đây mình sẽ chọn cách số 2 là đổi tên để ta khỏi phải build lại image nhé ;)

Ta chạy command sau để liệt kê danh sách image:
```
docker images
```
ta sẽ thấy như sau:

![docker](https://images.viblo.asia/10862513-49c6-4846-84c1-d1b27b48a2dc.png)

Tiếp theo ta sẽ tiến hành chạy command sau:
```
docker tag learning-docker/python:v1 registry.gitlab.com/maitrungduc1410/learning-docker
```
Note: phần tên image gitlab bên trên các bạn thay cho khớp với của bạn nhé, đồng thời nếu các bạn thử liệt kê danh sách image lại sẽ thấy ta có 1 image mới là bản sao của image cũ, image cũ vẫn còn đó, các bạn có thể xóa image cũ nếu cần nhé

Cuối cùng là ta đẩy image lên registry thôi nào:
```
docker push registry.gitlab.com/maitrungduc1410/learning-docker  ## thay tên image cho khớp với của các bạn nhé
```
Sau khi upload thành công ta quay lại trang Container Registry trên gitlab và check:

![Gitlab registry](https://images.viblo.asia/13885dc1-3668-43d4-ba9a-082f903c1e88.png)

Các bạn có thể thấy là ta đã có 1 image trên registry với tag là **latest** (vì khi nãy lúc đổi tên và khi push ta không nói tag là gì nên docker mặc định tag là **latest**)

## Pull Image về và chạy thử
Lại đến giờ phút của sự thật, không biết khi đem image qua máy khác chạy hoặc một nơi nào đó thì mọi thứ có còn ổn hay  không??

Bây giờ các bạn sẽ dùng một máy khác, hoặc nếu không có thì ta chuyển qua một folder nào đó để test, nếu dùng máy khác thì nhớ là máy đó **phải cài Docker và Docker compose** nhé.

Ta tạo một folder test là **test-docker** ở bất kì đâu bạn muốn. Trong đó ta có các file như sau:
- **.env** để tạo biến môi trường
- **docker-compose.yml** để khởi chạy project

File **.env** ta giữ nguyên nội dung, nhưng file **docker-compose.yml** ta sửa lại như sau:
```yaml
version: "3.4"

services:
  app:
    # đổi tên image ở đây cho đúng với của bạn (không nói gì về tag thì mặc định là 'latest')
    image: registry.gitlab.com/maitrungduc1410/learning-docker 
    ports:
      - "${PUBLIC_PORT}:${PORT}"
    restart: unless-stopped
    environment:
      PORT: ${PORT}
```
Sau đó ta lại chỉ cần chạy command sau để khởi động project:
```
docker-compose up
```
Vì image ta để là ở trên một private gitlab chỉ có ta mới được lấy image về, nên do đó nếu thấy báo lỗi xác thực thì các bạn chạy lại command sau để login nhé:
```
docker login registry.gitlab.com
# Chạy xong ta lại docker-compose up là được nhé
```

Và mọi thứ sẽ chạy như bình thường ;), ta sẽ có kết quả hệt như ở máy gốc của chúng ta, dù ta đưa image đi chạy ở máy nào cũng vậy.

# Kết bài
Mình biết là bài này lại làm cho các bạn đau mắt vì độ dài, vì có nhiều thứ mình muốn nói tới, nhưng dần dần những khái niệm mới sẽ hết và ta sẽ tập trung nhiều vào việc thực hành hơn nhé, sự đau mắt mình hi vọng vì thế cũng giảm đi :rofl::rofl:

Qua bài này các bạn đã thấy được cách để dockerize một ứng dụng Python như nào, khá giống bài trước cho NodeJS phải không ;). Ta vẫn không cần phải cài trực tiếp Python vào môi trường gốc (bên ngoài), vẫn chỉ có duy nhất **docker và docker-compose** <3

Ở bài này có 2 nội dung quan trọng mình muốn nói tới:
- Cách dùng biến môi trường
- Cách đưa image lên registry để sau này ta có thể tải về và cách tải xuống image để chạy như thế nào

Cám ơn các bạn đã theo dõi, nếu có gì thắc mắc các bạn cứ comment bên dưới cho mình được biết nhé ;).

Source code bài này mình để [ở đây](https://gitlab.com/maitrungduc1410/learning-docker) (nhánh **complete-tutorial** nhé)

Hẹn gặp lại các bạn ở các bài sau ^^