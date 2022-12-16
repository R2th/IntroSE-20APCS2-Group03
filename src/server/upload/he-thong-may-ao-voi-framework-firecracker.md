![](https://images.viblo.asia/d4a2580b-4880-4d3b-9fbd-87ba680e964d.png)


Gần đây, mình được yêu cầu tham gia vào quá trình tuyển dụng và onboarding bạn mới. Khi team và dự án phát triển cả về quy mô và độ phức tạp, tài liệu để chuyển giao giữa các dự án cũng càng thêm phức tạp và chỉ hoạt động trong một số hệ điều hành nhất định.
Vì vậy, để đảm bảo quá trình tích hợp diễn ra nhanh chóng và có thể sử dụng lại, mình phải đưa ra một hướng mới để tạo ra một môi trường cô lập và đơn giản nhất có thể. Mọi người có thể vào [link](https://haicheviet.com/cluster-vm-with-firecracker/) này để xem rõ hơn


## My goal

**An isolate enviroment where every member get their own resource and custom preinstall package**

Dự án hiện tại ở cty [Jobhopin](https://jobhopin.com/) mình đang làm  kết hợp nhiều ngôn ngữ như (Rust, Python, ...) và quá trình dựng virtualenv khá dài dòng với phải thử nhiều cách mới chạy được ở máy của bạn mới. Thông thường thì người mới phải mất đến 2-3 tuần để tìm hiểu về các dự án hiện tại và làm việc một cách hiệu quả


## Why not use containers image?

Bước đầu, mình khuyến khích team sử dụng Docker và docker-compose để code và debug project nhưng AI team thường có cả thành viên là engineer và data scientist. Team data scientist cảm thấy khó debug trong docker và mất rất nhiều thời gian để các thành viên mới tìm hiểu và sử dụng docker's image.
Hơn nữa, tôi muốn tạo một máy ảo (VM) thực sự mà thành viên có quyền truy cập root - mọi người có thể thiết lập sysctls, cài đặt gói mới, tạo quy tắc iptables, cấu hình mạng bằng ip, chạy perf, về cơ bản là bất cứ thứ gì có họ có thể làm như trên personal device của họ.


## Why not use virtual machine?

Mình đã thử một số nhà cung cấp VM (Qemu và Vmware) để tạo cho mỗi VM cho mỗi thành viên nhưng quá nhiều vấn đề gặp phải trong quá trình này:

* Thời gian khởi động VM chậm cộng với kích thước VM quá lớn.
* Thiếu API và VM backup phải được tạo thủ công mà không có cách nào document và sử dụng lại các step đã khởi tạo được.

Mình muốn các thành viên của team chỉ cần cung cấp thông tin đăng nhập của họ và kích thước VM => submit thông tin là sẽ có ngay một con VM hoàn chỉnh.

## Firecracker can start a VM in less than a second with base OCI container

Ban đầu khi mình đọc về việc Firecracker khi nó mới launch, mình nghĩ nó chỉ là một tool cho các cloud vendor sử dụng để cung cấp bảo mật hơn là chạy trên thuần docker, nhưng mình không nghĩ rằng lại có thể sử dụng luôn được để tạo một microVM.

Sau khi đọc một vài thông tin, mình cực kỳ ấn tượng với khả năng tạo VM nhanh chóng và tiện lợi của Firecracker.


**The VMM process starts up in around 12ms on AWS EC2 I3.metal instances. Though this time varies, it stays under 60ms. Once the guest VM is configured, it takes a further 125ms to launch the init process in the guest. Firecracker spawns a thread for each VM vCPU to use via the KVM API along with a separate management thread. The memory overhead of each thread (excluding guest memory) is less than 5MB. [Ref](https://lwn.net/Articles/775736)**

Một vài so sánh giữa Firecracker và QEMU

**By comparison: Firecracker is purpose-built in Rust for this one task, provides no BIOS, and offers only network, block, keyboard, and serial device support --- with tiny drivers (the serial support is less than 300 lines of code).
[Ref](https://news.ycombinator.com/item?id=25883837)**

Firecracker tích hợp với nhiều tool để quản lý container, làm cho việc áp dụng khá dễ dàng và dễ sử dụng. Tôi chọn sử dụng service [Ignite](https://github.com/weaveworks/ignite) mà lệnh CLI rất giống với docker

**With Ignite, you pick an OCI-compliant image (Docker image) that you want to run as a VM, and then just execute `ignite run` instead of `docker run`**

## How to use Firecracker with Ignite

Cài đặt Ignite và khởi động máy ảo mới rất đơn giản, về cơ bản có 3 bước:

`Step 1`: Kiểm tra xem hệ thống của bạn đã bật ảo hóa KVM chưa và cài đặt Ignite tại đây [Installing-guide](https://github.com/weaveworks/ignite/blob/main/docs/installation.md)

```bash
$ ignite version
Ignite version: version.Info{Major:"0", Minor:"8", GitVersion:"v0.10.0", GitCommit:"...", GitTreeState:"clean", BuildDate:"...", GoVersion:"...", Compiler:"gc", Platform:"linux/amd64"}
Firecracker version: v0.22.4
Runtime: containerd
```

`Step 2`: Tạo một con VM mẫu config.yaml

```yaml
apiVersion: ignite.weave.works/v1alpha4
kind: VM
metadata:
  name: haiche-vm
spec:
  cpus: 2
  memory: 1GB
  diskSize: 6GB
  image:
    oci: weaveworks/ignite-ubuntu
  ssh: true
```

`Step 3`: Khởi động máy chủ VM của bạn dưới 125 mili giây

```bash
$ sudo ignite run --config config.yaml

INFO[0001] Created VM with ID "3c5fa9a18682741f" and name "haiche-vm" 
```

Wolla :tada: :tada: :tada: bạn đã tạo thành công một máy ảo mới.
Để liệt kê các máy ảo đang chạy, hãy nhập:

```bash
$ ignite ps
VM ID                   IMAGE                           KERNEL                                  CREATED SIZE    CPUS    MEMORY          STATE   IPS             PORTS   NAME
3c5fa9a18682741f        weaveworks/ignite-ubuntu:latest weaveworks/ignite-kernel:5.10.51        63m ago 4.0 GB  2       1.0 GB          Running 172.17.0.3              haiche-vm
```

Sau khi máy ảo được khởi động, nó sẽ được cấu hình mạng và có thể truy cập được từ máy chủ thông qua SSH không cần mật khẩu và với quyền sudo

## SSH into the VM

### Via ignite cli

```bash
$ ignite ssh haiche-vm
Welcome to Ubuntu 18.04.2 LTS (GNU/Linux 5.10.51 x86_64)
...
root@3c5fa9a18682741f:~#
```

Để thoát khỏi SSH, chỉ cần logout khỏi shell như Ctrl+C hoặc gõ exit.

### Via ssh cli and rsa key

Thêm public key của bạn vào `~/.ssh/allow_keys` trong máy ảo mới được tạo hoặc cập nhập config máy ảo và tạo máy ảo mới với đường dẫn mặc định đến public key

```yaml
spec:
  ...
  ssh: path/your/id_rsa.pub
```

Và cuối cùng sử dụng ssh để truy cập vào máy ảo

```bash
$ ssh -i path/your/id_rsa root@172.17.0.3
Welcome to Ubuntu 18.04.2 LTS (GNU/Linux 5.10.51 x86_64)
...
root@3c5fa9a18682741f:~#
```

### Secure bastion host

Sử dụng bastion host để bảo mật hoàn toàn ssh cho máy chủ VM

`~/.ssh/config`

```apacheconf
Host workstation
    HostName 192.168.1.15
    User haiche
    IdentityFile ~/.ssh/id_rsa

Host haiche-vm
    HostName 172.17.0.3
    ProxyJump workstation
    User root
    IdentityFile ~/.ssh/id_rsa
```

Thêm cấu hình ở trên vào thư mục ssh của bạn và chạy `ssh haiche-vm` để truy cập máy chủ VM từ máy client

[![](https://mermaid.ink/img/pako:eNpdz7EKwjAQgOFXCTfbgo4dBLXdREEFh8bhaE4TahJJU0WavrvRVhBvOvj-4a6DygqCDC4Ob5Ktd9ywOItydVVk_IklyTw0jQxs2R2tqxuPXlnTD9nyw1tDgeWlRFVJmiZ3ffrVw8MGVow6-9c0TQPblNZLcoPBBDQ5jUrEq7p3yyGqJg5ZXAW6mgM3fezam0BPhVDeOsjOeG1oAth6u3-aCjLvWvpGucL4oR6r_gVLnVDt)](https://mermaid.live/edit#pako:eNpdz7EKwjAQgOFXCTfbgo4dBLXdREEFh8bhaE4TahJJU0WavrvRVhBvOvj-4a6DygqCDC4Ob5Ktd9ywOItydVVk_IklyTw0jQxs2R2tqxuPXlnTD9nyw1tDgeWlRFVJmiZ3ffrVw8MGVow6-9c0TQPblNZLcoPBBDQ5jUrEq7p3yyGqJg5ZXAW6mgM3fezam0BPhVDeOsjOeG1oAth6u3-aCjLvWvpGucL4oR6r_gVLnVDt)

## How I extend container to reduce repeatable setup process

Sau khi tạo VM thành công, chủ yếu là tôi sẽ cài đặt conda và một số tool mà tôi hay xài lên đó. Nhưng tôi không muốn cài đặt nhiều lần conda và tạo môi trường mới mỗi lần tạo lại VM. Đây là các bước để mở rộng image base Ubuntu và sử dụng nó để tạo trải nghiệm VM tốt hơn

`Dockerfile`

```Docker
FROM weaveworks/ignite-ubuntu

ENV PATH="/root/miniconda3/bin:${PATH}"
ARG PATH="/root/miniconda3/bin:${PATH}"

RUN apt-get update -qq && \
    apt-get update -y && \
    apt-get install git vim rsync \
        build-essential curl -y

RUN wget \
    https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh && \
    mkdir /root/.conda && \
    bash Miniconda3-latest-Linux-x86_64.sh -b && \
    rm -f Miniconda3-latest-Linux-x86_64.sh

RUN conda create -n haiche python=3.7

SHELL ["conda", "run", "-n", "haiche", "/bin/bash", "-c"]

RUN conda install fastapi

RUN which python && python -c "import fastapi"

RUN conda init bash && echo "source activate haiche" >> ~/.bashrc
```

`miniconda-vm.yaml`

```yaml
apiVersion: ignite.weave.works/v1alpha4
kind: VM
metadata:
  name: haiche-minconda-vm
spec:
  cpus: 2
  memory: 1GB
  diskSize: 6GB
  image:
    oci: haiche/ubuntu-minconda
  ssh: path/your/id_rsa.pub
```

Đây là một số phần phức tạp, version Ignite hiện tại không hỗ trợ xây dựng image docker từ local. Tôi phải đẩy image vào [Docker Hub](https://hub.docker.com/) để import thành công image mới vào Ignite.

Để tạo một máy ảo với Docker image mới

```bash
$ sudo ignite run --config miniconda-vm.yaml
...
INFO[0002] Created image with ID "cae0ac317cca74ba" and name "haiche/ubuntu-minconda" 
INFO[0004] Created VM with ID "c1ab652804e664ed" and name "haiche-minconda-vm" 
```

Nếu bạn sử dụng private registry như ECR, hãy chạy lệnh trên với `--runtime docker` để pull image từ private registry

Kiểm tra máy ảo với môi trường conda mới

```bash
$ ssh -i path/your/id_rsa root@172.17.0.4
...
(haiche) root@c1ab652804e664ed:~# python
Python 3.7.13 (default, Mar 29 2022, 02:18:16)
[GCC 7.5.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import fastapi
>>> fastapi.__version__
'0.74.1'
>>>
```

Tôi thích cách tiếp cận sử dụng config file để tạo VM và có thể xem tất cả mọi config ở một nơi. Bây giờ thành viên của team chỉ cần cung cấp config file và public key, tôi chỉ cần gõ 1 câu lệnh là một máy ảo mới với có sẵn tất cả các môi trường cần thiết. Họ có thể vọc vạc và run code ngay lập tức không cần phải học về cách setup môi trường

## Cloud supports nested virtualization

Một câu hỏi khác mà mình đã nghĩ đến: “được rồi, đã done các con vm thì sẽ deploy ở đâu trong môi trường Production?”. Điều thú vị khi chạy một máy ảo trên cloud là các cloud instances đã là máy ảo. Việc chạy một máy ảo bên trong một máy ảo được gọi là “nested virtualization” và không phải tất cả các nhà cung cấp dịch vụ cloud đều hỗ trợ - ví dụ: AWS chỉ hỗ trợ nested virtualization trong các phiên bản **Bare-metal** có giá cao ngất ngưởng.

GCP hỗ trợ nested virtualization nhưng không hỗ trợ mặc định, bạn phải bật tính năng này trong phần tạo instance. DigitalOcean hỗ trợ nested virtualization mặc định ngay cả trên instance rẻ nhất.

## Some afterthought

Một số điều vẫn tôi còn thấy lấn cấn với cách tiếp cận tạo VM này:

* Hiện tại Firecracker không hỗ trợ khôi phục và backup snapshot nhưng sẽ hỗ trợ trong tương lai gần <https://github.com/firecracker-microvm/firecracker/issues/1184>

* Không thể dễ dàng nâng cấp base image như `docker pull`. Tôi đã giải quyết vấn đề này bằng cách tạo bản copy mới, nhưng điều đó khá chậm và thực sự không hiệu quả. Có một số giải pháp mà tôi tìm được và sẽ thử sau lại sau [Device mapper to manage firecracker images](https://jvns.ca/blog/2021/01/27/day-47--using-device-mapper-to-manage-firecracker-images/)

* Tôi không biết liệu có thể chạy các ứng dụng đồ họa trong Firecracker hay không

* Firecracker với Kubernetes là một trend mới nhưng tôi không thấy hấp dẫn vì việc sử dụng Pod để nhóm các vùng chứa đã nhanh chóng và an toàn. Đây là một thread hữu ích thảo luận về lý do [Tại sao chúng chưa tương thích với nhau](https://twitter.com/micahhausler/status/1238496944684597248?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1238496944684597248%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fhaicheviet.com%2Fvi%2Fcluster-vm-with-firecracker%2F)

Dưới đây là một số links tôi thấy hữu ích khi nghiên cứu về Firecracker:

* [How AWS Firecracker works: a deep dive](https://unixism.net/2019/10/how-aws-firecracker-works-a-deep-dive/) trình bày một số khái niệm về Firecracker

* AWS Fargate và Lambda được tạo bởi [Firecracker serverless computing](https://aws.amazon.com/blogs/aws/firecracker-lightweight-virtualization-for-serverless-computing/)

* So sánh kỹ thuật isolation khác [Sandboxing and Workload Isolation](https://fly.io/blog/sandboxing-and-workload-isolation/)