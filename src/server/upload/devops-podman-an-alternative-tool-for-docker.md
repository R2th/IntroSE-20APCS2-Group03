Docker là công cụ dùng để quản lý và tương tác với containers, Docker chắc không quá xa lạ với mọi người. Tuy nhiên, ở trong mảng quản lý containers này cũng còn rất nhiều công cụ khác có thể thay thế Docker được, Podman là một trong những công cụ đó.

![](https://images.viblo.asia/9ab9f6b9-2cfa-4315-a321-229448c81284.png)

Docker được ra mắt vào năm 2013 là phiên bản mã nguồn mở hoàn toàn miễn phí. Tuy nhiên trong năm 2022 thì Docker đã không còn hoàn toàn miễn phí nữa mà đi kèm với nó là một số phiên bản Personal, Pro, Team, Business. Nếu ta xài bản miễn phí thì sẽ bị giới hạn một số thứ, ví dụ như *"image pull rate limit"*. Thì đa số mọi người đều có thói quen là hễ cái gì đang miễn phí mà tự nhiên không miễn phí nữa thì sẽ kiếm cái khác miễn phí để xài =))). Nên ở bài hôm nay chúng ta sẽ tìm hiểu về Podman.

## Podman
Podman là một mã nguồn mở được phát triển bởi Redhat, là một công cụ dùng để quản lý, xây dựng và chạy containers.

Nếu bạn biết Kubernetes thì Redhat đã thiết kế Podman để làm việc với K8S, nên nếu ta xài K8S thì Podman là lựa chọn tốt hơn so với Docker.

## Installing Podman
Để cài Podman trên khá đơn giản.

MacOS.

```
brew install podman
```

```
podman machine init
podman machine start
podman info
```

Centos.

```
sudo yum -y install podman
```

Nếu bạn xài Centos7 thì gõ thêm vài câu lệnh sau dưới quyền root.

```
sudo -s
```

```
echo "user.max_user_namespaces=10000" > /etc/sysctl.d/42-rootless.conf
sysctl --system
```

Ubuntu 20.10 trở lên.

```
sudo apt-get -y update
sudo apt-get -y install podman
```

Còn với môi trường Windows thì các bạn xem ở đây [Podman for Windows guide](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md).

## Getting Started
Nếu bạn đã xài Docker thì thao tác với Podman sẽ rất đơn giản, vì Podman có toàn bộ câu lệnh của Docker. Nếu bạn đang xài Docker trên Linux và muốn chuyển sang Podman thì chỉ đơn giản thêm đoạn `alias docker=podman` vào file `~/.bashrc`.

Bạn dùng các câu lệnh của Podman như cách bạn dùng Docker, ví dụ, tìm kiếm images.

```bash
sudo podman search httpd --filter=is-official
```

Cách *pull image* của Podman cũng giống như cách ta dùng Docker, nhưng khác biệt ở một điểm là bạn sẽ chỉ định tên của *registry* khi *pull* luôn, nếu không mặc định nó sẽ pull từ registry `registry.access.redhat.com` xuống, ví dụ nếu ta gõ.

```bash
sudo podman pull library/httpd
```

Thì nó sẽ pull từ `registry.access.redhat.com/library/httpd`, nên nếu bạn muốn pull từ docker hub xuống thì chỉ định registry là `docker.io` vào.

```bash
sudo podman pull docker.io/library/httpd
```

Sau khi pull xong để kiểm tra các images trên máy thì ta gõ.

```bash
sudo podman images
```

## Running a container
Để chạy container bằng Podman cũng rất đơn giản.

```bash
sudo podman run -d -p 8080:80 docker.io/library/httpd
```

Kiểm tra container đã chạy chưa.

```
sudo podman ps
```

```bash
CONTAINER ID  IMAGE                           COMMAND           CREATED         STATUS             PORTS                 NAMES
d7c79f9f2916  docker.io/library/httpd:latest  httpd-foreground  14 seconds ago  Up 13 seconds ago  0.0.0.0:8080->80/tcp  magical_khorana
```

Vậy là ta đã chạy thử container bằng Podman thành công, gọi vào nó xem nó có trả về kết quả không.

```bash
curl localhost:8080
```

```
<html><body><h1>It works!</h1></body></html>
```

Ngon 😁. Nếu các bạn cần coi *logs* của container các bạn gõ.

```
sudo podman logs -f d7c79f9f2916
```

```
10.88.0.1 - - [19/Oct/2022:15:09:08 +0000] "GET / HTTP/1.1" 200 45
10.88.0.1 - - [19/Oct/2022:15:09:09 +0000] "GET / HTTP/1.1" 200 45
```

Ngưng một container đang chạy.

```
sudo podman stop d7c79f9f2916
```

Xóa container.

```
sudo podman rm d7c79f9f2916
```

Như bạn thấy, thao tác với Podman rất đơn giản 😁. Và một phần quan trọng nữa là cách build *Container Image*, tất nhiên là Podman cũng hỗ trợ ta build image

## Building images
Cú pháp file build của Podman cũng giống y chang với Docker, chỉ khác là với Docker thì tên mặc định của file build là Dockerfile, còn với Podman thì là Containerfile. Ví dụ ta cần build một *container image* cho Go bằng Podman của một source code viết bằng Go.

```
.
├── go.mod
├── go.sum
└── main.go
```

Tạo một file tên là `Containerfile` nằm cùng cấp với 3 file trên.

```
.
├── Containerfile
├── go.mod
├── go.sum
└── main.go
```

Dán đoạn code sau vào file `Containerfile`.

```Dockerfile
FROM golang:1.19-alpine AS build
RUN apk add --no-cache git

WORKDIR /build
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN go build -o run .

FROM alpine:3.9
WORKDIR /app
RUN apk add ca-certificates
COPY --from=build /build/run .
CMD ["/app/run"]
```

Chạy câu lệnh build.

```bash
sudo podman build . -t golang-by-podman
```


```
STEP 1: FROM golang:1.19-alpine AS build
STEP 2: RUN apk add --no-cache git
...
STEP 3: WORKDIR /build
...
STEP 4: COPY go.mod .
aaeea0e874ee820546f6a36cad027b10b73ddd7e25f7371e68bb4198c682531d
STEP 5: COPY go.sum .
b31cd7f5d036521e7ffdbc19784d1d0f2e2f16493dabcdb9b0debc5513192489
STEP 6: RUN go mod download
go: no module dependencies to download
a086e3c68be924e11d4351f3b2dfac873c55c78feb4008c2bf5c3dd39812cb39
STEP 7: COPY . .
a1223d524435ce959c6897f7ecc4baf5524caa994b9fb447bad9d31f06410d2e
STEP 8: RUN go build -o run .
8270d6bfecfd61e9d7e3189b3098d7b25fa1e35edd30e9f7914734e6d5ce6066
STEP 9: FROM alpine:3.9
Getting image source signatures
Copying blob 31603596830f done
Copying config 78a2ce922f done
Writing manifest to image destination
Storing signatures
STEP 10: WORKDIR /app
1397cd57b17091e200701074128533c5a1c46886b338e057c668ee201b0e4250
STEP 11: RUN apk add ca-certificates
fetch http://dl-cdn.alpinelinux.org/alpine/v3.9/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.9/community/x86_64/APKINDEX.tar.gz
(1/1) Installing ca-certificates (20191127-r2)
Executing busybox-1.29.3-r10.trigger
Executing ca-certificates-20191127-r2.trigger
OK: 6 MiB in 15 packages
2c8132eeb56aaea0af79e622c9cba26a4b1bbfe64e75e29b71088b020583e442
STEP 12: COPY --from=build /build/run .
e33a1665e3445557ae166fab429b0ad96e5c5ece35e2977cd290f11157cfbbb2
STEP 13: CMD ["/app/run"]
STEP 14: COMMIT golang-by-podman
1c62e07f75502a71fdcef2f3a18103a667822a6b737d7bb9b86ac99e7f663793
1c62e07f75502a71fdcef2f3a18103a667822a6b737d7bb9b86ac99e7f663793
```

Kiểm tra container image ta vừa build.

```
sudo podman images
```

```
REPOSITORY                   TAG           IMAGE ID       CREATED              SIZE
localhost/golang-by-podman   latest        1c62e07f7550   About a minute ago   9.82 MB
docker.io/library/golang     1.19-alpine   f9a40cb7e8ec   12 days ago          363 MB
docker.io/library/httpd      latest        d16a51d08814   2 weeks ago          150 MB
docker.io/library/alpine     3.9           78a2ce922f86   2 years ago          5.81 MB
```

Done 😁. Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để cập nhật tin tức về DevOps nhé.

## Kết luận
Vậy là ta đã tìm hiểu xong về Podman, nó cũng rất đơn giản nếu bạn đã từng xài Docker. Đây là câu mà mình cần nhấn mạnh trong bài: **nếu bạn biết Kubernetes thì Redhat đã thiết kế Podman để làm việc với K8S, nên nếu ta xài K8S thì Podman là lựa chọn tốt hơn so với Docker**. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).

Đồng đội [Junior Backend Engineer](https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067).

Đồng đội [Junior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/junior-frontend-engineer-1068).

Đồng đội [Onsite Merchandising (Web Admin)](https://tuyendung.hoang-phuc.com/careers/job/945)