![](https://images.viblo.asia/e0e8bd3d-b03a-4ab5-977f-7eb981a91d9d.jpg)

Hôm nay, mình sẽ làm tutorial về setup một GitHub Action Workflow để tự động build source code của bạn thành Docker Image khi bạn push lên branch master. 
Sau đó, sẽ tự động deploy Docker Image lên Docker Hub.
Ok, chúng tay hãy cùng nhau bắt đầu.

**Nếu các bạn chưa biết về mình, thì mình xin được giới thiệu. Mình tên là Phú và mình hiện đang làm kỹ sư IT tại Tokyo Nhật Bản.**

{@youtube: https://www.youtube.com/embed/33Ttv3taz7I}

Mình sẽ có một hỏi nhỏ dành cho bạn:

**Bạn đã sử dụng CI/CD chưa? Nếu bạn đang sử dụng thì hãy để lại comment ở phía dưới về tên công cụ bạn đang dùng: Jenkins, CircleCI hay TravisCI v.v..**

Overview về pipeline:
![](https://images.viblo.asia/dd9d42c0-3482-4e32-ac8d-3c63eb1c72de.png)
> Lưu ý: Đây chỉ là một pipeline mà mình đã đơn giản hoá đi với mục đích học tập. Các CI/CD Pipeline ở môi trường Production sẽ phức tạp hơn rất nhiều.

Full GitHub Workflow file (mình sẽ giải thích từng bước ở phía dưới): 
```
name: flask-helloworld
on:
  push:
    branches: [ master ]
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Login Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_ACCESS_TOKEN }}

      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v1
        id: buildx

      - name: Cache Docker Image Layers
        uses: actions/cache@v2
        with:
          path: /tmp/.buildx-cache
          key: ${{ runner.os }}-buildx-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-buildx-
      - name: Build and Push Docker Image
        uses: docker/build-push-action@v2
        id: docker_build
        with:
          context: ./
          file: ./Dockerfile
          builder: ${{ steps.buildx.outputs.name }}
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/flask-helloworld
          cache-from: type=local,src=/tmp/.buildx-cache
          cache-to: type=local,dest=/tmp/.buildx-cache

      - name: Verify
        run: echo ${{ steps.docker_build.outputs.digest }}
 ```
# Giới thiệu về Repository được sử dụng
Git Repository:  https://github.com/p-le/flask-helloworld

Để bắt đầu mình sẽ giới thiệu một chút về repository mà mình sử dụng trong hôm nay.

Đây là một microservice Hello World đơn giản mình viết bằng Python 3 sử dụng Flask Framework.
Nếu bạn không quen sử dụng Python thì có thể viết lại bằng Node.JS hoặc PHP. 
Nhưng bạn sẽ phải viết lại file Dockerfile.

> Tutorials này mình muốn tập trung vào giới thiệu GitHub Actions nên sẽ dùng một code sample đơn giản nhất có thể


Trong repository này, source code sẽ nằm trong file main.py. 
Mình đã viết một API sử dụng Flask và Flask Restful library. 
API này sẽ trả về một  JSON Response: `{"hello":  "world"}`.

```
import os

from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
  def get(self):
    return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
```


# Bước 1: Checkout

## Bước 1.1: Tạo Workflow cùng với Environment
Để setup Github Actions Workflow, 
- Chúng ta sẽ cần phải tạo folder: `.github`.
- Trong folder `.github`, chúng ta sẽ cần phải tạo tiếp một folder là `workflows`. 

Workflow file sẽ được đặt tại: `.github/workflows` 
> (Đây là đường dẫn mặc định của github chứ không phải do mình nghĩ ra đâu nha)

Github Workflow sẽ được định nghĩa bằng file YAML. 
Cách viết của file YAML rất dễ hiểu, bạn sẽ chỉ mất tầm 5-10 phút để làm quen thôi nha.

Để tạo workflow của ngày hôm nay thì mình sẽ tạo file: `.github/workflows/build.yaml`.

```
name: flask-helloworld
on:
  push:
    branches: [ master ]
```
Đầu tiên mình sẽ định nghĩa 1 workflow `flask-helloword`.

Tiếp theo là `on: push` cùng với branches là `master`. 
Tức là Workflow sẽ chạy khi bạn push vào branch master.

Trong một **Workflow** sẽ bao gồm nhiều **Jobs**. 

Mình sẽ tạo một **Job** có tên là **docker**. 
Tiếp theo là định nghĩa môi trường chạy của Job **docker**.

```
jobs:
  docker:
    runs-on: ubuntu-latest
```
Tại đây, `ubuntu-latest` tức là phiên bản Ubuntu 18.04


## Bước 1.2: Setup Checkout
Để định nghĩ các steps trong một Job, chúng ta sử dụng `steps`. Sau đó là một list (theo cách viết của YAML)
```
    steps:
      - name: Checkout
        uses: actions/checkout@v2
```

Step đầu tiên mình cần định nghĩa là step check out 
(tức là checkout source code từ repository về máy ubuntu). 

Ở đây, chúng ta sẽ sử dụng một **Github Action** có tên là: [**actions/checkout@v2**](https://github.com/actions/checkout).


## Bước 1.3: Kiểm tra
Để kiểm tra, mình sẽ push lên branch `master`.
Ở thanh menu bạn sẽ thấy một tab có tên là **Actions**
![](https://images.viblo.asia/4879498c-551a-4ea3-93bf-8917750baf4b.png)

Sau khi nhấp vào, phía bên trái sẽ là list các Workflow đã tạo.

Bạn sẽ thấy Workflow `flask-helloworld`.
![](https://images.viblo.asia/12c02945-4bef-4069-8e50-a62fedb67fd3.png)

Ở phía bên phải sẽ là commit đầu tiên mà mình vừa Push lên có message là: ***"ADD workflow***".

Sau khi click vào commit, ở phía bên trái sẽ hiện một danh sách các **Jobs** thuộc vào Workflow **đấy**.

Các bạn sẽ thấy Job có tên "***docker***" mà chúng ta định nghĩa.
![](https://images.viblo.asia/2b155ac6-1df0-4d1c-b64e-851ee939f833.png)

Sau khi click vào Job Docker, màn hình sẽ hiện Output Log của Job và bạn có thể kiểm tra.
- Tại step Setup, Môi trường chạy là **Ubuntu 18.04**. và **action/checkout@v2** được tải về tại thời điểm này
- Step Checkout chạy và clone Git Repository của mình.
![](https://images.viblo.asia/3c01241e-c559-4209-9c3f-fb98734503bb.png)

Vậy là chúng ta làm quen xong cách viết, và kiểm tra GitHub Workflow ở giai đoạn đơn giản nhất!

# Bước 2: Login Docker Hub

> Lưu ý: Để làm bước này Bạn sẽ cần tạo một tài khoản Docker Hub.

Link Đăng ký: https://hub.docker.com/signup


## Bước 2.1: Tạo Docker Hub Personal Access Token
Sau khi đã có tài khoản Docker Hub. 
Bạn sẽ cần phải tạo một Personal Access Token. Cách làm như sau:
Bạn sẽ click vào ảnh đại diện của bạn, và mở phần **Account Settings**.
![](https://images.viblo.asia/f170743c-ea22-4b98-be96-690142fe7060.png)

Sau khi đã hiện ra giao diện Account Setting, bạn sẽ kéo xuống một chút và mở phần **Security**.
![](https://images.viblo.asia/588af95c-96ad-42bc-b9eb-8ea967def428.png)

Sau khi nhấp vào, màn hình sẽ hiển thị nút "**New Access Token**". 

Bạn sẽ click và tạo một Personal Access Token, sau đó Copy sẵn để sử dụng cho bước 2.2.


## Bước 2.2: Tạo GitHub Secrets
Ở trên **Github Menu**, bạn sẽ thấy **Tab Settings**. 

Sau khi nhấp vào, phía bên trái sẽ có menu Secrets. Bạn sẽ tạo 2 GitHub Secrets như sau:

* `DOCKERHUB_ACCESS_TOKEN`: Ở đây bạn sẽ Copy > Paste Personal Access Token đã tạo ở Bước 2.1 vào.

![](https://images.viblo.asia/352a823f-3ddb-4e36-8516-43db3237d15a.png)


* `DOCKERHUB_USERNAME`:
Giá trị của Secrets thì bạn sẽ điền `username` của **Docker Hub** của bạn.

![](https://images.viblo.asia/8a2bfd19-4af2-4e16-9065-ffeb102c1cf9.png)

## Bước 2.3: Setup Docker Login
Step này sẽ dụng Github Action có tên là: [**docker/login-action@v1**](https://github.com/marketplace/actions/docker-login)

Đây là **Github Actio**n chính thức của **Docker**.

**Github Action** này sẽ cần 2 thông tin: 
* `username`
* `password`


```
- name: Login Docker Hub
    uses: docker/login-action@v1
    with:
      username: ${{ secrets.DOCKERHUB_USERNAME }}
      password: ${{ secrets.DOCKERHUB_ACCESS_TOKEN }}
```

Để inject Github Secret vào Github Workflow.
Chúng ta sẽ sử dụng syntax
* **${{ secrets.DOCKERHUB_USERNAME }}**
* **${{ secrets.DOCKERHUB_ACCESS_TOKEN }}**

Vậy là chúng ta đã setup xong step: **Docker Hub** Login!

## Bước 2.4: Kiểm tra
Cũng tương tự như Bước 1.3, mình sẽ push commit lên GitHub.

Sau khi push xong, mình sẽ mở giao diện Output Log của Docker Job.

Và  chờ step ***Login Docker Hub*** chạy xong.

Bạn sẽ thấy có output là "***Login Succeeded***" tức là đã thành công.

![](https://images.viblo.asia/4b153999-db1b-46d3-af53-44a58241dfde.png)

# Bước 3: Build và Push lên Docker Hub

## Bước 3.1: Setup Docker BuildX

Ở step này mình sử dụng một **Github Action** có tên là [**docker/setup-buildx-action@v1**](https://github.com/docker/setup-buildx-action)

[**>> Docker Buildx**](https://docs.docker.com/buildx/working-with-buildx/) 

Là một CLI Plugin mở rộng của Docker Build dựa trên Moby Buildkit. Buildx là một tính năng thử nghiệm của Docker và được cài đặt cùng với docker từ phiên bản 19.03 trở đi.

```
- name: Setup Docker Buildx
    uses: docker/setup-buildx-action@v1
    id: buildx
```

## Bước 3.2: Setup Docker Build - Push
Tiếp theo, mình sẽ tạo một step có tên là Build and Push Docker Image.
Step này sẽ sử dụng GitHub Action có tên là: [**docker/build-push-action@v2**](https://github.com/docker/build-push-action) với tham số là
* context: path đến folder chạy Docker Build (ở đây sẽ là `./`)
* file: path đến file Dockerfile
* builder: sử dụng output từ bước `3.1`
* push: true (sau khi build sẽ push Image)
* tags: sử dụng `DOCKERHUB_USERNAME` cùng với tên image là `flask-helloworld`.

```
      - name: Build and Push Docker Image
        uses: docker/build-push-action@v2
        id: docker_build
        with:
          context: ./
          file: ./Dockerfile
          builder: ${{ steps.buildx.outputs.name }}
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/flask-helloworld
```
Step này mình cũng sẽ gán `id` là: `docker_build` để sử dụng trong step tiếp theo.

## Bước 3.3: Setup Verify
Và mình sẽ thêm một step để kiểm tra kết quả build có tên là "***Verify***".
**Step** này sẽ chỉ đơn thuần chạy command `echo` (đẻ chạy command thì mình sẽ dùng config là **run**) 
Ở đây sẽ là `echo` cùng với output của ***step: build and push***

```
- name: Verify
run: echo ${{ steps.docker_build.outputs.digest }}
```

`.digest` là output của Git Hub Action : [**docker/build-push-action@v2**](https://github.com/docker/build-push-action)

## Bước 3.4: Kiểm tra
Để kiểm tra, mình sẽ Push lên branch `master` và mở sang Tab **Actions** trên Github.

* **Step: Build and Push**: Các bạn sẽ thấy Push time là 5.7s.

![](https://images.viblo.asia/0b2b1e78-bcd8-4748-931b-89b2018d9208.png)


* **Step: Verify**: digest output của Docker Image được in ra (một đoạn string khá dài)

![](https://images.viblo.asia/417fa962-65f3-4862-b922-2fa4bbec4296.png)


* **Docker Hub**: Kiểm tra xem Docker Image đã được push lên Docker Hub hay chưa.

![](https://images.viblo.asia/f677716f-1696-474e-b221-82194841cdd8.png)


-----


# Bước 4: Tối ưu hóa Docker Build Cache

##  Bước 4.1: Setup Cache
Bước cuối cùng, mà chúng ta sẽ phải làm  là tối ưu hóa Docker Build Cache. 
Chúng sẽ dụng một Github Action có tên là [**action/cache**](https://github.com/actions/cache)

`action/cache` được sử dụng để cache các dependencies và build outputs của các Github Actions khác.

Về cách sử dụng, chúng ta có 3 thông tin cần định nghĩa là:
* `path`: danh sách các files, folder để cache và đọc. Ở đây mình sẽ giá trị là` /tmp/.buildx-cache` 
* `key`:  là string sử dụng để đọc và lưu cache
* `restore-keys`: nếu sử dụng key không tìm ra cache, thì sẽ tiếp tục sử dụng các key trong restore-keys

```
      - name: Cache Docker Image Layers
        uses: actions/cache@v2
        with:
          path: /tmp/.buildx-cache
          key: ${{ runner.os }}-buildx-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-buildx-
```

Tiếp theo ở step Build and Push mình sẽ thêm 2 config key là:

* `cache-from`: sẽ đọc từ local folder có tên là` /tmp/.buildx-cache`
* `cache-to`: sẽ ghi cache vào local folder `/tmp/.buildx-cache`

```
      - name: Build and Push Docker Image
        uses: docker/build-push-action@v2
        id: docker_build
        with:
          context: ./
          file: ./Dockerfile
          builder: ${{ steps.buildx.outputs.name }}
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/flask-helloworld
          cache-from: type=local,src=/tmp/.buildx-cache
          cache-to: type=local,dest=/tmp/.buildx-cache
```

##  Bước 4.2: Kiểm tra
Tương tự, để kiểm tra, mình sẽ push lên master branch và mở giao diện **Actions** trên **GitHub**,

Bạn sẽ thấy có một **commit** mới có tên là "***MODIFY add docker cache layer action***"
![](https://images.viblo.asia/ee140cdc-07aa-474e-935e-10726b43ba94.png)


Tạm thời vì là lần chạy đầu tiên nên 
"***Step:  Cache Docker Image Layer***" sẽ có output báo không tìm thấy cache ("*Cache not found*").

Nhưng về cơ bản thì các steps trong pipelines của mình đã chạy ngon lành.

**Vậy là chúng ta đã hoàn thành setup Github Actions Workflow với Docker Hub!**


-----

Để ủng hộ mình tiếp tục ra các content tốt hơn nữa,

các bạn có thể qua kênh Youtube Channel để Like và Subcribe các video của mình nha. :heart_eyes:



**[ >> Kênh Youtube: Phú Lê IT <<](https://www.youtube.com/channel/UCRWDR9vuoRny63i464-pZrg?sub_confirmation=1)**
![](https://images.viblo.asia/e0e8bd3d-b03a-4ab5-977f-7eb981a91d9d.jpg)

Ngoài ra, các bạn có thể liên lạc mình qua các Social Channels:
* [Facebook](https://www.facebook.com/Phu-Le-100780911794532/)
* [Linked In](https://www.linkedin.com/in/phuquangle/)
* [Twitter](https://twitter.com/PhuLeDev)

**Cảm ơn các bạn! Arigatou Gozaimasu!**