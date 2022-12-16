# 1. Docker là gì?
Docker là một ứng dụng đơn giản hóa quá trình quản lý các quy trình ứng dụng, giúp building, deploying và running ứng dụng một cách dễ dàng. Docker container cho phép bạn chạy các ứng dụng của mình trong các quy trình phân lập tài nguyên. Chúng giống như các máy ảo, nhưng Docker có tính di động cao hơn, thân thiện với tài nguyên hơn và phụ thuộc nhiều hơn vào hệ điều hành máy chủ.

Vì sao Docker phát triển nhanh chóng và được sử dụng phổ biến?
- Dễ dàng sử dụng: Developer, tester ... mọi người rất dễ sử dụng Docker để build, test một cách nhanh chóng. Chỉ cần config một lần duy nhất.
- Tốc độ: Docker container rất nhẹ và nhanh. Không giống như máy ảo khác, Docker start và stop nhanh chóng chỉ trong vài giây
Một số khái niệm liên quan đến Docker
- Images: là một “read-only template”. Chúng ta có thể tạo 1 image riêng cho bản thân dựa trên 1 image khác, và có thể tùy chỉnh thêm tùy vào mục đích sử dụng.
- Containers: là một instance của image. Hoạt động giống như một thư mục, chứa  tất cả những thứ cần thiết để một ứng dụng có thể chạy được. Mỗi một docker container được tạo ra từ một docker image. Có thể create, start, stop, move or delete container.
- Dockerfile: là một file chứa các lệnh để Docker đọc và build image
- Docker registries: là kho chứa các images. Người dùng có thể tạo image và sử dụng nó như các image được chia sẻ khác.

# 2. Cài đặt Docker
Docker có gói cài đặt có sẵn trong repository chính thức của Ubuntu, tuy nhiên nó có thể không phải là phiên bản chính thức. Để đảm bảo cài đặt được phiên bản mới nhất, chúng ta sẽ cài đặt Docker từ repository của Docker.
Đầu tiên, cần update list packages:
```
sudo apt update
```
Tiếp theo, cài đặt một vài package điều kiện tiên quyết cho phép apt sử dụng các gói qua HTTPS:
```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```
Sau đó thêm khóa GPG cho kho Docker  vào hệ thống của bạn:
```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
```
Tiếp theo, update lại list packages với các package Docker từ repo mới được thêm vào:
```
sudo apt update
```
Đảm bảo bạn sắp cài đặt từ repo Docker thay vì repo Ubuntu mặc định:
```
apt-cache policy docker-ce
```
Chúng ta sẽ thấy đầu ra như thế này, mặc dù version cho Docker có thể khác:
```
docker-ce:
  Installed: (none)
  Candidate: 18.03.1~ce~3-0~ubuntu
  Version table:
     18.03.1~ce~3-0~ubuntu 500
        500 https://download.docker.com/linux/ubuntu bionic/stable amd64 Packages
```
Cuối cùng, cài đặt Docker:
```
sudo apt install docker-ce
```
Kiểm tra xem Docker đã được cài đặt và có chạy hay không
```
sudo systemctl status docker
```
Output:
```
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2018-07-05 15:08:39 UTC; 2min 55s ago
     Docs: https://docs.docker.com
 Main PID: 10096 (dockerd)
    Tasks: 16
   CGroup: /system.slice/docker.service
           ├─10096 /usr/bin/dockerd -H fd://
           └─10113 docker-containerd --config /var/run/docker/containerd/containerd.toml
```

Theo mặc định, lệnh docker chỉ có thể được chạy bởi người dùng root hoặc bởi người dùng trong group docker, được tạo tự động trong quá trình cài đặt Docker. Nếu bạn cố chạy lệnh docker mà không có tiền tố với sudo hoặc không có trong group docker, bạn sẽ nhận được một đầu ra như thế này:
```
docker: Cannot connect to the Docker daemon. Is the docker daemon running on this host?.
See 'docker run --help'.
```
Nếu bạn không muốn gõ sudo bất cứ khi nào bạn chạy lệnh docker, hãy thêm tên người dùng của bạn vào nhóm docker:
```
sudo usermod -aG docker ${USER}
```
```
su - ${USER}
```
Nhập mật khẩu để tiếp tục thực hiện.
Xác nhận bạn đã được thêm vào nhóm docker:
```
id -nG
```
Output:
```
sammy sudo docker
```
Bây giờ chúng ta sẽ kiểm tra việc thiết lập trên có ok không và sẵn xem những command của Docker bao gồm những gì.
```
docker
```
Ouput:
```
attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes
```
Để xem các tùy chọn có sẵn:
```
docker docker-subcommand --help
```
Để xem thông tin toàn hệ thống về Docker
```
docker info
```
# 3. Tổng kết
Như vậy, chúng ta đã tìm hiểu sơ qua các khái niệm và cài đặt thành công Docker. Để tìm hiểu cách sử dụng Docker như thế nào, hãy chờ những bài viết tiếp theo nhé. Cảm ơn mọi người đã đọc bài viết. :D