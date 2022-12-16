## 1. Sử dụng Base Image nhỏ nhẹ
Đôi khi chúng ta hay bắt đầu một dự án với một Docker image chung chung ví dụ như là sử dụng `FROM node` khi phát triển một ứng dụng JavaScripts. Tuy nhiên, khi sử dụng `node` image như vậy, chúng ta nên chú ý rằng `node` image cũng sử dụng một image nền từ Debian Stretch. Nếu ứng dụng của bạn không cần đến các thư viện hệ thống hay các ứng dụng hệ thống (system libraries và system utilities) thì chúng ta không nên dùng một image sử dụng cả một HDH như vậy.

<br/>
Theo như báo cái của Synk năm 2019, rất nhiều các containers hay được sử dụng trên Docker Hub được xây dựng dựa trên các image có chứa những lỗ hổng đã biết. Ví dụ như khi sử dụng một generic `node` image, bạn đã tải về một image có chứa 580 lỗ hổng trong thư viện hệ thống bên trong image đó.

![Báo cáo bảo mật 2019 của Synk](https://images.viblo.asia/adcccae7-cea0-4389-8836-83a5775451dc.png)

Theo như báo cáo bảo mật năm 2019, như bạn có thể thấy, mỗi image trong top 10 Docker image mà Synk theo dõi trên Docker Hub có chứa các lỗ hổng bảo mật. Bằng việc sử dụng base image nhỏ, chúng ta có thể hạn chế các bề mặt tấn công cho ứng dụng của bạn.

## 2. Người dùng ít quyền nhất
Khi một Dockerfile không nêu rõ mục `USER`, nó sẽ mặc định sử dụng người dùng root để thực hiện các lệnh trong container. Trên thực tế, có rất ít lý do để một container phải sử dụng quyền root để thực hiện lệnh trong khi Docker lại mặc định sử dụng người dùng root để chạy các lệnh trong container. Điều này mở rộng bề mặt tấn công cho ứng dụng và tạo cợ hội cho việc nâng quyền truy cập khi ứng dụng bị tấn cống.

<br/>
Để giảm thiểu khả năng này, chúng ta nên tạo một người dùng chuyên biệt cho việc chạy Docker image, sử dụng lệnh `USER` trong Dockerfile để đảm bảo rằng Docker sẽ luôn chạy lệnh bằng quyền của người dùng được đặt trong lệnh `USER` nói trên.

Một user có thể không có sẵn trong một image, ta có thể tạo một người dùng mới bằng các lệnh trong ví dụ như bên dưới đây:

```
FROM ubuntu
RUN mkdir /app
RUN groupadd -r dockeruser && useradd -r -s /bin/false -g dockeruser dockeruser
RUN chown -R dockeruser:dockeruser /app
WORKDIR /app
COPY . /app
USER dokeruser
CMD node index.js
```


## 3. Sign image để giảm thiểu tấn công người đứng giữa (MITM)
Tính xác thực trong Docker Image là một vấn đề lớn. Chúng ta lụy thuộc vào các image này khi chúng ta pull chúng về và sử dụng chúng để chạy ứng dụng của chúng ta trong môi trường production. Vì thế, việc đảm bảo image mà chúng ta pull về là các image chuẩn và chưa bị thay đổi gì là một điều vô cùng quan trọng. Việc bị thay đổi hay hỏng trong quá trình pull về hay nguy hiểm hơn Docker Registry bị tấn công có thể gây ảnh hưởng ngiêm trọng đến quá trình vận hành và  bảo mật của ứng dụng của bạn.

### Xác thực docker image
Theo mặc định, Docker pull image về mà không cần xác thực, điều này có thể làm cho bạn bị ảnh hưởng khi sử dụng image mà có nguồn gốc và tác giả không được xác thực.

<br/>
Chúng ta nên tạo thói quen luôn xác thực image trước khi pull chúng về, bất kể policy là như thế nào. Để thử nghiệm với khả năng xác thực của Docker, tạm thời bật chức năng Docker Content Trust bằng các thực hiện lệnh sau:

```
export DOCKER_CONTENT_TRUST=1
```
Bây giờ khi bận thực hiện một lệnh pull mà bạn biết chưa được sign, request này sẽ bị hủy và image đó sẽ không được kéo về.

### Sign docker image
Prefer Docker Certified images that come from trusted partners who have been vetted and curated by Docker Hub rather than images whose origin and authenticity you can’t validate.
Nên sử dụng những image được Docker chứng thực được publish bằng các công ty hoặc tổ chức có danh tiếng trên Docker Hub hơn là sử dụng một image mà nguồn gốc và tính xác thực của nó không được đảm bảo. Docker cho phép bạn sign image, để đảm bảo tính xác thực và đúng đắn của một image, điều này cũng giúp tạo thêm một lớp bảo vệ cho ứng dụng của bạn. Để sign docker image, sử dụng Docker Notary. Notary sẽ xác thực chữ ký image cho bạn và sẽ chặn sử dụng các image mà chữ ký (sign) đã hết hạn hoặc chưa được ký.

<br/>
Khi Docker Content Trust được bật, như đã trình bày ở trên, khi build một docker image, image đó sẽ được ký bởi chữ ký (signature) của bạn. Khi một image được ký lần đầu tiên, Docker sẽ tạo và lưu private key tạo thư mục `$HOME/docker/trust`. Private key này sẽ được sử dụng để sign các image tiếp theo mà được bạn build.

## 4. Không để lộ thông tin nhạy cảm trong image
Sometimes, when building an application inside a Docker image, you need secrets such as an SSH private key to pull code from a private repository, or you need tokens to install private packages. If you copy them into the Docker intermediate container they are cached on the layer to which they were added, even if you delete them later on. These tokens and keys must be kept outside of the Dockerfile. 
Đôi lúc khi ta build một ứng dụng trong docker image, ta cần phải thêm một số thông tin nhạy cảm ví dụ như SSH private key để pull code từ một private repository, hay như ta cần token để cài đặt một package nào đó. Nếu ta copy các token hay các key này vào Docker sẽ gây ra lỗ hổng bảo mật nghiêm trọng kể cả khi xóa chúng sau khi sử dụng. Các token và key này phải được giữ ***NGOÀI*** Dockerfile.

### Sử dụng multi-stage build
Bằng việc sử dụng tính băng multi-stage build, việc quản lý các thông tin nhạy cảm trong một image nằm giữa (intermediate image) mà khi sau khi build sẽ dễ dàng hơn rất nhiều, mà không làm lộ những thông tin nhạy cảm vào trong image sau khi build xong. Sử dụng code để thêm những file nhạy cảm vào một image nằm giữa như sau:
```
FROM: ubuntu as intermediate

WORKDIR /app
COPY secret/key /tmp/
RUN scp -i /tmp/key build@acme/files .

FROM ubuntu
WORKDIR /app
COPY --from intermediate /app .
```

### Sử dụng Docker Secret
Docker cung cấp một giải pháp để quản lý thông tin nhạy cảm đó là Docker Secret. Image có thể truy cập vào các file nhạy cảm này mà không sợ bị lộ thông tin do Docker trực tiếp quản lý và bảo dưỡng những file này.

```
# syntax = docker/dockerfile:1.0-experimental
FROM alpine

# shows secret from default secret location
RUN --mount=type=secret,id=mysecret cat /run/secrets/mysecre

# shows secret from custom secret location
RUN --mount=type=secret,id=mysecret,dst=/foobar cat /foobar
```


Bạn cũng nên chú ý khi copy file vào trong image khi build. Vì dụ khi sử dụng command `COPY . .`, bạn có thể sẽ copy một số file, thư mục nhạy cảm vào bên trong image. Để tránh việc này, sử dụng file `.dockerignore` để ra hiệu cho Docker phải loại bỏ file hay thư mục nào trong quá trình build.

<br/>
Nguồn: https://snyk.io/blog/10-docker-image-security-best-practices/