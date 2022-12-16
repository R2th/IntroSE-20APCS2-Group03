**Giới thiệu**

Bằng cách sử dụng phương pháp Cloud Native cho các quy trình này, bạn có thể tận dụng các API cơ sở hạ tầng phù hợp để đóng gói và triển khai ứng dụng một cách tự động .

.. Hai blocks xây dựng để thực hiện tự động hóa bao gồm images container và container orchestrators. Trong năm qua, Kubernetes đã trở thành sự lựa chọn mặc định cho container orchestration. Trong bài viết này sẽ nói về :

Xây dựng images container với Docker, Buildah và Kaniko.
Thiết lập một cụm Kubernetes với Terraform, và tạo Deployments and Services.
Mở rộng chức năng của một cụm Kubernetes với Tài nguyên tùy chỉnh.
Đến cuối hướng dẫn này, bạn sẽ có images container được xây dựng với Docker, Buildah, và Kaniko, và một cluster với triển khai, dịch vụ Kubernetes, và Tài nguyên Custom.


**Điều kiện tiên quyết**

Một máy chủ Ubuntu 16.04 với một tài khoản người dùng không phải root.
Cài đặt Docker trên Ubuntu 16.04 .
Quen thuộc với các container và Docker.
Quen thuộc với các khái niệm Kubernetes.

**Bước 1 - Tạo images container bằng Docker và Buildah**

Bạn có thể sử dụng các công cụ khác nhau để tạo ra images container và trong bước này, bạn sẽ xây dựng các trình xây dựng với : Docker và Buildah.

Xây dựng images container với Dockerfiles

Docker xây dựng images container một cách tự động bằng cách đọc hướng dẫn từ một Dockerfile, một file văn bản bao gồm các lệnh cần thiết để lắp ráp một images container. Sử dụng images Docker build lệnh, bạn có thể tạo một build tự động sẽ thực hiện các hướng dẫn dòng lệnh cung cấp trong các Dockerfile. Khi xây dựng images, bạn cũng sẽ vượt qua xây dựng bối cảnh với Dockerfile, trong đó có các thiết lập của file cần thiết để tạo ra một môi trường và chạy một ứng dụng trong images container.

Thông thường, bạn sẽ tạo một thư mục dự án cho Dockerfile của bạn và xây dựng bối cảnh Tạo một thư mục có tên demo để bắt đầu:

```
mkdir demo
cd demo
```

Tiếp theo, tạo một Dockerfile bên trong thư mục demo:

`nano Dockerfile`

Thêm nội dung sau vào tệp:

```
~/demo/Dockerfile
FROM ubuntu:16.04

LABEL MAINTAINER neependra@cloudyuga.guru

RUN apt-get update \
    && apt-get install -y nginx \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx"]
```

Sử dụng lệnh CMD, bạn cũng đã cấu hình nginx (16.04 sẽ hoạt động như image cơ bản và gói nginx sẽ được cài đặt. là lệnh mặc định khi container bắt đầu.

Chuyển tùy chọn -t cho lệnh này đặt tên cho image là nkhare / nginx: mới nhất:

`sudo docker image build -t nkhare/nginx:latest .`

Bạn sẽ thấy kết quả sau:

```
Output
Sending build context to Docker daemon  49.25MB
Step 1/5 : FROM ubuntu:16.04
 ---> 7aa3602ab41e
Step 2/5 : MAINTAINER neependra@cloudyuga.guru
 ---> Using cache
 ---> 552b90c2ff8d
Step 3/5 : RUN apt-get update     && apt-get install -y nginx     && apt-get clean     && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*     && echo "daemon off;" >> /etc/nginx/nginx.conf
 ---> Using cache
 ---> 6bea966278d8
Step 4/5 : EXPOSE 80
 ---> Using cache
 ---> 8f1c4281309e
Step 5/5 : CMD ["nginx"]
 ---> Using cache
 ---> f545da818f47
Successfully built f545da818f47
Successfully tagged nginx:latest
```

Bạn có thể liệt kê image docker của bạn bằng cách sử dụng lệnh sau đây:

```
docker image ls
Output
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
nkhare/nginx        latest              4073540cbcec        3 seconds ago       171MB
ubuntu              16.04               7aa3602ab41e        11 days ago     
```

Bây giờ bạn có thể sử dụng nkhare / nginx: image mới nhất để tạo container.

**Xây dựng Container Images với Atomic-Buildah**

Buildah là một công cụ CLI, được phát triển bởi Project Atomic, để nhanh chóng xây dựng Open Container Initiative (OCI)-compliant images. OCI cung cấp chi tiết kỹ thuật cho runtimes container và images với chuẩn tốt nhất.

Trong bước này, bạn có thể xây dựng một images của daemon Docker, và có thể thực hiện images. biên dịch Buildah từ nguồn và sau đó sử dụng nó để tạo Container Images.

Để cài đặt Buildah, bạn sẽ cần:

 ```
cd
 sudo apt-get install software-properties-common
 sudo add-apt-repository ppa:alexlarsson/flatpak
 sudo add-apt-repository ppa:gophers/archive
 sudo apt-add-repository ppa:projectatomic/ppa
 sudo apt-get update
 sudo apt-get install bats btrfs-tools git libapparmor-dev libdevmapper-dev libglib2.0-dev libgpgme11-dev libostree-dev libseccomp-dev libselinux1-dev skopeo-containers go-md2man
```

Bởi vì bạn sẽ biên dịch mã nguồn buildah để tạo gói của nó, bạn cũng sẽ cần phải cài đặt Go:

```
sudo apt-get update
sudo curl -O https://storage.googleapis.com/golang/go1.8.linux-amd64.tar.gz
sudo tar -xvf go1.8.linux-amd64.tar.gz
sudo mv go /usr/local
sudo echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.profile
source ~/.profile
go version 
```

Bạn sẽ thấy đầu ra sau, cho biết cài đặt thành công:

```
Output
go version go1.8 linux/amd64
```

Bây giờ bạn có thể lấy mã nguồn buildah để tạo gói của nó, cùng với nhị phân runc. Runc là việc thực hiện thời gian chạy chứa OCI, mà bạn sẽ sử dụng để chạy container Buildah của bạn.

Chạy các lệnh sau để cài đặt runc và buildah:

```
mkdir ~/buildah
cd ~/buildah
export GOPATH=`pwd`
git clone https://github.com/projectatomic/buildah ./src/github.com/projectatomic/buildah
cd ./src/github.com/projectatomic/buildah
make runc all TAGS="apparmor seccomp"
sudo cp ~/buildah/src/github.com/opencontainers/runc/runc /usr/bin/.
sudo apt install buildah 
```

Tiếp theo, tạo tệp /etc/containers/registries.conf để  cấu hình đăng ký container của bạn:

`sudo nano /etc/containers/registries.conf`

Thêm nội dung sau vào tệp để chỉ định đăng ký của bạn:

```
/etc/containers/registries.conf

# This is a system-wide configuration file used to
# keep track of registries for various container backends.
# It adheres to TOML format and does not support recursive
# lists of registries.

# The default location for this configuration file is /etc/containers/registries.conf.

# The only valid categories are: 'registries.search', 'registries.insecure',
# and 'registries.block'.

[registries.search]
registries = ['docker.io', 'registry.fedoraproject.org', 'quay.io', 'registry.access.redhat.com', 'registry.centos.org']

# If you need to access insecure registries, add the registry's fully-qualified name.
# An insecure registry is one that does not have a valid SSL certificate or only does HTTP.
[registries.insecure]
registries = []

# If you need to block pull access from a registry, uncomment the section below
# and add the registries fully-qualified name.
#
# Docker only
[registries.block]
registries = []
```

Tệp cấu hình registries.conf chỉ định sổ đăng ký nào cần được tham khảo khi hoàn tất các tên image không bao gồm phần đăng ký hoặc phần tên miền.

. Bây giờ hãy chạy lệnh sau đây để xây dựng một image, sử dụng kho https://github.com/do-community/rsvpapp như việc xây dựng bối cảnh kho này cũng chứa các Dockerfile liên quan:

`sudo buildah build-using-dockerfile -t rsvpapp: buildah github.com/do-community/rsvpapp`

Lệnh này sẽ tạo ra một image mang tên rsvpapp: buildah từ Dockerfille có sẵn trong kho https://github.com/do-community/rsvpapp.

Để liệt kê các image, sử dụng lệnh sau:

`sudo buildah images`

Bạn sẽ thấy kết quả sau:

```
Output
IMAGE ID             IMAGE NAME                                               CREATED AT             SIZE
b0c552b8cf64         docker.io/teamcloudyuga/python:alpine                    Sep 30, 2016 04:39     95.3 MB
22121fd251df         localhost/rsvpapp:buildah                                Sep 11, 2018 14:34     114 MB
```

Cái khác, docker.io / teamcloudyuga / python: alpine, là image cơ sở từ Dockerfile.

Trước tiên, bạn cần phải đăng nhập vào tài khoản Docker Hub của mình từ dòng lệnh:

`docker login -u your-dockerhub-username -p your-dockerhub-password`

Khi đăng nhập thành công, bạn sẽ nhận được một tệp, ~ /. Docker / config.json, sẽ chứa thông tin đăng nhập của Docker Hub của bạn.

Ví dụ: nếu bạn muốn đẩy image bạn vừa tạo, bạn có thể chạy lệnh sau:

`sudo buildah push --authfile ~ /. docker / config.json rsvpapp: buildah docker: // your-dockerhub-username / rsvpapp: buildah`

Bạn cũng có thể đẩy image kết quả vào trình nền Docker cục bộ bằng cách sử dụng lệnh sau:

`sudo buildah push rsvpapp: buildah docker-daemon: rsvpapp: buildah`

Cuối cùng, hãy xem các image Docker bạn đã tạo:

```
sudo docker image ls
Output
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
rsvpapp             buildah             22121fd251df        4 minutes ago       108MB
nkhare/nginx        latest              01f0982d91b8        17 minutes ago      172MB
ubuntu              16.04               b9e15a5d1e1a        5 days ago          115MB
```

Như mong đợi, bây giờ bạn sẽ thấy một image mới, rsvpapp: buildah, đã được xuất bằng buildah.

Hãy tiếp tục thảo luận cách thiết lập một cụm container với Kubernetes trong phần tiếp theo.