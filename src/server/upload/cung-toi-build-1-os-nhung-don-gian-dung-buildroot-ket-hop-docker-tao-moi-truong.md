Trong quá trình học tập trên trường, mình có được tiếp xúc với môn **lập trình nhúng**.
Ở môn học này, mình được giao một assignment liên quan đến buildroot. Cho nên hôm nay mình xin phép được chia sẻ một chút hiểu biết của mình, mọi người cùng tham khảo.
## Buildroot là gì và dùng để làm gì ?
> Là một build-system Linux hệ nhúng  
> Một tập các `makefile` và các `bản vá (patches)` để nó có thể dễ dàng tạo ra một `cross-compilation toolchain` và hệ thống tập tin gốc (`root filesystem`) cho hệ thống linux đích mà chúng ta muốn xây dựng

Tóm lại thì Buildroot giúp chúng ta có thể làm ra 1 OS nhúng với kích thước nhỏ gọn, có thể dễ dàng tích hợp vào các thiết bị **IoT** sau này.  
## Cấu trúc của buildroot 
![Cấu trúc](https://www.researchgate.net/profile/Mariano-Ruiz-2/publication/261329190/figure/fig5/AS:392467775016964@1470583017437/Schematic-representation-of-the-Buildroot-tool-Buildroot-generates-the-root-file-system.png)
Trong buildroot có 1 số thành phần giúp ta chạy thiết lập 1 OS
- Makefile: Chứa sẵn các script để build các OS với các config khác nhau 
- Config.in: Chứa các option giúp t config một cách dễ dàng
- .config: Giống như file log của hệ thống, các option cài đặt được lưu lại vào đây  

Sau khi build, ta có được đầy đủ các thành phần cơ bản của 1 Hệ điều hành
- Kernel 
- Root filesystem
- Bootloader
- Các thành phần phụ trợ khác
## Cài đặt buildroot dùng Docker
### Các bước chính
- Setup môi trường dùng Docker
- Configure Buildroot
- Build Image
- Chạy thử 1 ví dụ đơn giản
### Tiến hành cài đặt
#### Setup môi trường dùng docker
- Yêu cầu: Máy tính đã cài đặt Docker  
	Tham khảo link: [How to install Docker](https://docs.docker.com/docker-for-mac/install/)
- Tạo `Dockerfile`  
	Tham khảo [Dockerfile](https://github.com/learnraspberry/buildroot-docker)  
    ```
    FROM debian:jessie
    RUN apt-get update && apt-get install -y -q \
    bash \
    bc \
    binutils \
    build-essential \
    bzip2 \
    ca-certificates \
    cpio \
    debianutils \
    file \
    g++ \
    gcc \
    git \
    graphviz \
    gzip \
    libncurses5-dev \
    locales \
    make \
    patch \
    perl \
    python \
    python-matplotlib \
    rsync \
    sed \
    tar \
    unzip \
    wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
    
    RUN sed -i "s/^# en_US.UTF-8/en_US.UTF-8/" /etc/locale.gen && locale-gen && update-locale LANG=en_US.UTF-8 
    ENV BR_VERSION 2020.02.8

    RUN wget -qO- http://buildroot.org/downloads/buildroot-$BR_VERSION.tar.gz \
    | tar xz && mv buildroot-$BR_VERSION /buildroot
    ```
	Nội dung gồm các phần chính:  
	- Lấy từ môi trường gốc là `Debian:jessie`  
	`FROM debian:jessie`  
	- Chạy 1 số yêu cầu cần thiết như:
	`RUN apt-get update && apt-get install -y -q \...`
	- Thiết lập locale và gán biến môi trường:  
	
		```
		RUN sed -i "s/^# en_US.UTF-8/en_US.UTF-8/" /etc/locale.gen && locale-gen && update-locale LANG=en_US.UTF-8
		ENV BR_VERSION 2020.02.8
		```
	- Tải và giải nén buildroot

		```
		RUN wget -qO- http://buildroot.org/downloads/buildroot-$BR_VERSION.tar.gz \
        | tar xz && mv buildroot-$BR_VERSION /buildroot
		```
- Build Image Docker  
Command `docker build –tag rpi-buildroot:1.0 .`   
Kết quả:  
![Image Docker](https://images.viblo.asia/9459564d-5438-49ef-95d7-3576701741f5.png)
- Run Container  
Command: `docker run -it rpi-buildroot:1.0`  
Kết quả:  
![Docker Container](https://images.viblo.asia/eb3a126c-7295-4177-9980-255ff589a5ba.png)
- Sau khi tắt máy tính, muốn chạy vào container buildroot  
Command: `docker exec -it modest_bose bash`

#### Configure Buildroot
Vào trong thư mục buildroot: `cd buildroot`  
Ở đây mình sử dụng bản cài đặt môi trường có sẵn  
Virtual machine: `make qemu_x86_64_defconfig`  
Ngoài ra chúng ta có thể tạo các bản cài đặt từ bên ngoài, sau đó thêm vào menuconfig, rồi tiến hành chạy trên giao diện cài đặt `make menuconfig`  
Ví dụ: Dùng [Conan](https://blog.conan.io/2019/08/27/Creating-small-Linux-images-with-Buildroot.html) để việc cài đặt sau này tiết kiếm thời gian (từ 1 vài tiếng xuống còn 1 vài phút)
#### Build Image
Command: `make`  
Sau khi chạy xong, chúng ta kiểm tra kết quả ở `output/images`   
![output_images](https://images.viblo.asia/c1c335d5-b58e-45a2-85c7-f261b56e7259.png)  
- `bzImage`: File Linux Kernel  
-  `rootfs.ext2`: File drive   

Việc tiến hành cài đặt mất khá nhiều thời gian, trong thời gian chờ chúng ta có thể tiến hành cài đặt môi trường khởi chạy lại máy ảo `qemu` 
Tạo file `run_qemu.sh` với nội dung:

```
#!/bin/sh
(
BINARIES_DIR="${0%/*}/"
cd ${BINARIES_DIR}

if [ "${1}" = "serial-only" ]; then
    EXTRA_ARGS='-nographic'
else
    EXTRA_ARGS='-serial stdio'
fi

export PATH="/buildroot/output/host/bin:${PATH}"
exec qemu-system-x86_64 -M pc -kernel bzImage \
-drive file=rootfs.ext2,if=virtio,format=raw \
-append "rootwait root=/dev/vda console=tty1 console=ttyS0" \
-net nic,model=virtio -net user  ${EXTRA_ARGS}
)
```
Cấp quyền thực thi cho file `run_qemu.sh` và chạy, ví dụ:  

```
chmod 770 run_qemu.sh
./run_qemu.sh
```
#### Chạy thử 1 ví dụ đơn giản
- Tìm trình biên dịch file `.c` trong folder `output/host/bin`  
Ở đây sử dụng `x86_64-buildroot-linux-uclibc-gcc`  
- Export `$PATH` ra home để có thể chạy comamnd  `export PATH="/buildroot/output/host/bin:${PATH}"`   
Kiểm tra:  
![export_path](https://images.viblo.asia/8078b375-3f9f-46e1-92c7-96d76ae2ab67.png)
- Tạo 1 file `hello.c` và tiến hành biên dịch

	```
	cd
	touch hello.c --> edit file tạo 1 chương trình helloworld
	x86_64-buildroot-linux-uclibc-gcc hello.c -o hello
	```

    Kết quả:   
    ![hello](https://images.viblo.asia/e8517b16-8730-4811-82da-29289baf8005.png)  
    ![run](https://images.viblo.asia/66b066f7-d9aa-4b8f-9f70-164e0d7e0805.png)
## Tạm kết
Trên đây là 1 số kiến thức mình tìm hiểu được khi làm việc với buildroot, mong các bạn đánh giá và nhận xét để mình cải thiện bài viết được tốt hơn  
Link tham khảo từ Doc của buildroot: https://buildroot.org/downloads/manual/manual.html