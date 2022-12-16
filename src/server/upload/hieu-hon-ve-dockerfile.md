![](https://images.viblo.asia/9a2fe9ca-1f83-4ab9-bf4b-179da38c96d9.png)

Đây là chủ đề mình thích nhất, mỗi tuần mình dành ra 1-2h rãnh để viết 1 Dockerfile mình thích, sẵn để sau này có mà dùng không phải viết lại , hiện tại kho repo của mình cũng gần 60 Dockerfile khác nhau các loại . mình sẽ hoàn thiện rồi sẽ public cho mn tham khảo or dùng tùy thích

Một file Dockerfile hiệu quả được định nghĩa là:

* Có cấu trúc được phân tách layer rõ ràng theo thứ tự sau: layer dành cho môi trường, ngôn ngữ, framework; layer dành cho quá trình build, cài đặt các thành phần cần thiết; layer dành cho quá trình run.

* Các layer có tính module tốt, có khả năng dùng lại được cho nhiều Dockerfile khác nhau.

* Layer được tối ưu tốt nhất để đảm bảo dung lượng nhỏ nhất có thể giúp tăng khả năng tái sử dụng của image.

Dưới đây là ví dụ về Dockerfile mà mình đã viết , ngày xưa viết không theo chuẩn lắm =))

**environment layers**

``FROM centos:centos6``

``MAINTAINER "CuongNP2@"``

``LABEL service=Images_sre``

``LABEL version="1.0"``

**build layers**

``RUN yum -y install wget gcc``

``RUN cd /tmp && wget https://dl.fedoraproject.org/pub/epel/epel-release-latest-6.noarch.rpm ``

``RUN cd /tmp && wget https://nagios-plugins.org/download/nagios-plugins-2.1.2.tar.gz && tar xzvf nagios-plugins-2.1.2.tar.gz && cd /tmp/nagios-plugins-2.1.2 && ./configure && 
make && make install``

``RUN cd /tmp && rpm -ivh epel-release-latest-6.noarch.rpm``

``RUN yum install -y tar gcc epel-release xinetd sysstat net-tools openssh-server.x86_64 nload python supervisor htop telnet python-setuptools yum-utils vixie-cron yum-cron.noarch crontabs.noarch iftop iotop nethogs openssh-clients rsync && \ yum clean all && \ easy_install supervisor``

``ADD localtime /etc/localtime``

``COPY check_mk_agent /bin/check_mk_agent``

``COPY check_mk /etc/xinetd.d/check_mk``

``COPY mrpe.cfg /etc/check_mk/mrpe.cfg``

``COPY supervisord.conf /etc/supervisor/supervisord.conf``

``ADD ./authorized_keys /root/.ssh/authorized_keys``

``ADD ./sshd_config /etc/ssh/sshd_config``

``ADD ./ssh_host_rsa_key /etc/ssh/ssh_host_rsa_key``

``ADD ./hosts /hosts``

**run layers**

``RUN echo 'console' |passwd root --stdin``

``RUN echo "console ALL=(ALL) NOPASSWD :ALL" >> /etc/sudoers``

``VOLUME /data``

``EXPOSE 22``

``ADD ./start.sh /start.sh``

``ENTRYPOINT /bin/bash /start.sh``

Note : 

**Dockerfile** chứa một tập hợp các câu lệnh bao gồm cả của Docker và các câu lệnh của OS. Trước hết, cần tìm hiểu rõ các câu lệnh của Dockerfile.

**FROM**: Dựa trên một image có sẵn để tạo ra một image mới. Chỉ thị này phải được đặt ở đầu Dockerfile.

**MAINTAINER**: (Tùy chọn) Điền thông tin của tác giả, người tạo ra image.

**RUN**: Chỉ thị dùng để thực thi câu lệnh ở bên trong image

**ADD**: Dùng để sao chép một file hoặc folder từ Host vào trong image. Có thể sử dụng một URL, Docker sẽ tải về thư mục đích bên trong image.

**ENV**: Khởi tạo một biến môi trường bên trong image.

**CMD**: Sử dụng để thực thi một câu lệnh khi tạo container được tạo từ image.

**ENTRYPOINT**: Chỉ ra một câu lệnh được thực thi khi container chạy.

**WORKDIR**: Chỉ ra thư mục làm việc khi tạo image hoặc khi khởi chạy container

**USER**: Xác định user (UID) thực thi các câu lệnh ở các chỉ thị CMD, RUN, ENTRYPOINT,… được xác định ở phía sau nó.

**VOLUME**: Cho phép truy cập/liên kết thư mục giữa container với host.

**EXPOSE**: Khai báo các Port Container sử dụng.

**ARG**: Khai báo sử dụng tham số khi build image sử dụng câu lệnh docker build với cờ--build-arg <varname>=<value>


Trong Dockerfile chia khá rõ 3 layer là Enviroment Layers, Build Layers, Run Layers mình chỉ nói về Build Layers , 2 Layer thường sẽ không có lỗi xảy ra khi build .

Build Layers là layer xử lý lâu nhất, dễ lỗi nhất và khó debug nhất trong cả quá trình build images bằng Dockerfile, cho nên chúng ta cần 1 chút gọi là Module hóa

Bản thân khi mình viết Dockerfile mà chưa được module hóa , khi có sự thay đổi liên quan tới các thành phần của app, container sẽ khiến cả layer #3 phải build lại , riêng Layer #3 cũng không có tính dùng lại tốt, giả sử cần build 1 con service có kiến trúc tương tự nhưng chỉ khác database thì phải build 1 layer mới.
    
Việc module hóa layer giúp tiết kiệm thời gian build cũng như debug, tăng khả năng caching trong Docker. Đặc biệt trong một hệ thống đi theo kiến trúc Microservice gồm nhiều service có chung môi trường, ngôn ngữ, kiến trúc thì việc module hóa giúp tăng khả năng dùng lại các layer trong Dockerfile, giúp quá trình development cũng như deployment nhiều service cùng lúc trở nên hiệu quả hơn
    
    
**Tối ưu kích thước image**

* Giảm số lượng layer là điều đầu tiên cần nghĩ khi muốn giảm kích thước images.    

* Càng nhiều layer RUN mà đặc biệt là các layer có kích thước lớn khi kết hợp lại sẽ càng làm kích thước images giảm đi đáng kể.    

* Để tối ưu kích thước image ngoài việc giảm số lượng layer còn có 1 cách nữa là loại bỏ hoặc không sử dụng những packages không cần thiết
    
và giải pháp cuối cùng có thể nghĩ tới nhằm tối ưu kích thước images là sử dụng base image có kích thước nhỏ như linux alpine hay minideb chẳng hạn.


**Kết luận**
    
Viết Dockerfile là một công việc thú vị và không kém phần quan trọng trong quá trình development. Một file Dockerfile tốt giúp tăng khả năng tái sử dụng images, tiết kiệm thời gian phát triển phần mềm cho developer, tiết kiệm thời gian cho quá trình CI-CD và rất nhiều hệ quả tích cực khác.

Chúc các bạn vui vẻ không quạo =))    
    
Tham khảo : Techzones.me