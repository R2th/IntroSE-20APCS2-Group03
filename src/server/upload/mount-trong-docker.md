### Storage Trong docker là gì ?

- Storage trong docker là một tính năng quản lý data của docker. Data ở đây có thể hiển là các file trong quá trình chạy ứng dụng như file log, file data …
- Khi chạy một container, data trong quá trình vận hành được chưa ở writeable layer và sẽ bị mất đi khi container bị xóa. Để giải quyết được vấn đề này, Docker đã đưa ra một cơ chế để quản lý data của các container đó là Docker Storage.
- Về bản chất, Docker storage là một cơ chế cho phép lưu trữ các data của container và docker host bằng cách mount mot folder từ Docker Container vào Docker Host.
- Bằng việc mount này, data trong Container giờ đây sẽ được an toàn hơn, dễ dàng chia sẻ giữa các container với nhau hơn. Một số chứa setting hay log có thể được đọc dễ dàng hơn trong quá trình troubleshoot các Container.

### Các kiểu mount của Docker Storage

![](https://images.viblo.asia/c064ce00-2765-4f32-a2a7-df58ecd8e391.png)
Có 3 kiểu mount trong Docker Storage là :

* **Volumes:** Mount-point sẽ nằm /var/lib/docker/volumes/ của Docker Host và được quản lý bằng Docker.
* **bind mounts:** Mount-point có thể nằm ở bất kỳ đâu Docker Host không được quản lý bởi Docker.
* **tmpfs mounts:** Data sẽ được lưu vào memory của Docker host và sẽ mất đi khi khởi động lại hoặc stop Container.

**- v và -mount flag**

Ban đầu -v hoặc -mount flat được dùng cho standalone container và -mount flag được dùng cho swarm service. Tuy nhiên phiên bản Docker 17.06 bạn có thể sử dụng -mount flag cho standalone container. Nói chung điểm khác biệt duy nhất chính là cú pháp. Trong khi -v flag, các option được làm một thì -mount flag lại phân chia chung rõ ràng hơn với từng option các nhau bởi dấu phẩy. Trong bài viết này minh sử dụng option là -v và -mount.

### Volumes

* Về hoạt động Volumes tưng tự như Bind Mounts, những Volume được quản lý bời Docker. Trong khi Bind Mounts, file hoặc thư muc cần mount phải tồn tại trên docker host.
* Volume khi tạo ra sẽ nằm ở thư mục /var/lib/docker/volumes/Volume khi tạo sẽ nằm ở thư mục.
* Volume cũng support cơ chế của volume drivers, cho phép lưu trữ dữ liệu tới một server remote hoặc Cloud …
* Bạn có thể quản lý volume sử dụng CLI hoặc API.
* Volume hoạt động trên cả Linux và Windows container

**Sử dụng Volume khi nào ?**

* Khi chia sẻ dữ liệu giữa nhiều container đang chạy.
* Lưu dữ liệu tới một server remote hoặc cloud.
* Khi cần backup, restore hoặc migrate dữ liệu từ Docker Host này sang Docker Host khác.
* Cần quản lý dễ dàng và thuận tiện hơn so với bind mounts.

**Ví dụ**

Tạo một volume và chạy container mount với volume đó
1. Tạo Volume
```
docker volume create my-volume    ## Tạo một volume
docker volume ls                  ## List danh sách volume
docker volume inspect my-volume   ## Hiển thị thông tin của Volume
ll /var/lib/docker/volumes        ## Kiểm tra volume được tạo ra
```
2. Chạy container với volume
```
docker run -itd -v my-volume:/opt/mount_point/ centos
# Hoặc 
docker run -itd --mount type=volume,src=my-volume,dst=/opt/mount_point/ centos
# Hoặc
docker run -itd --mount type=volume,source=my-volume,target=/opt/mount_point/ centos
```
3. Kiểm tra lại
```
docker exec my-container bash -c "echo 'This is test file' > /opt/mount_point/test.txt"
docker exec my-container bash -c "cat /opt/mount_point/test.txt"
cat /var/lib/docker/volumes/my-volume/_data/test.txt
```

**Một số chú ý với volume**

* Nếu bạn mount một volume vào trong một thư mục của container, mà thư mục của container này đã có dữ liệu thì dữ liệu từ container sẽ được copy vào volume mount-point của docker host
* Thông thường nếu bạn không tạo volume từ trước mà chạy container với volume mount thì Docker sẽ tự động tạo một volume và dữ liệu sẽ vẫn tồn tại ngoài vòng đời của container.
Ví dụ:
```
docker run -itd --name webapp --mount source=webapp-vol,destination=/var/ centos
```
* Volume thường là sự lựa chọn tốt hơn là sử dụng wriable layer của Container. Bởi vì sử dụng Volume không làm tăng dung lượng của container sử dụng.

**bind mounts**

Bind mounts trong Docker xuất hiện trước Volume. Bind mounts bị giới hạn một số các tính năng hơn so với volume. Binds mount có hiệu năng tốt nhưng bị phụ thuộc vào cấu trúc filesystem của Docker host.
Khi sử dụng bind mount thì một file hoặc một folder trong docker host được mount vào trong container. File hoặc Folder này yêu cầu đường dẫn tuyệt đối. Vậy nên, trong trường hợp file hoặc folder này không tồn tại trên docker host, thì quá trình mount sẽ bị lỗi.

**Sử dụng bind mounts khi nào ?**

* Khi chia sẻ file cấu hình từ docker host với container.
* Chia sẻ thư mục source code hoặc môi trường từ docker host với container.
* Khi cấu trúc filesystem của docker host là rõ ràng và phù hợp với các yêu cầu của bind mount.

**Ví dụ**

Chạy một container với **bind mounts** theo hai cách:
1. Sử dụng flag -v
Khi sử dụng flag -v nếu source folder trên docker host chưa tồn tại, Docker sẽ tự động tạo mới folder
```
docker run -itd --name my_contanier -v /opt/docker_host_folder/:/opt/ centos
docker exec my_contanier bash -c "touch /opt/duckhang"
ll /opt/docker_host_folder
```
2. Sử dụng flag –mount
Khi sử dụng flag –mount, thì đảm bảo folder trên docker host đã được tồn tại, nếu không sẽ bị lỗi
```
mkdir -p /opt/docker_host_folder
docker run -itd --name my_contanier --mount type=bind,src=/opt/docker_host_folder,dst=/opt/ centos
docker exec my_contanier bash -c "touch /opt/duckhang"
ll /opt/docker_host_folder
```

**Một số chú ý với binds mount**

* Khi sử dụng bind mounts và flag –mount thì phải đảm bảo file hoặc folder từ docker host đã được tồn tại.
* Không giống như volume, nếu folder trong Container “không trống” và được mount với folder của docker host thì tất cả các file trong folder của container sẽ bị ẩn đi. Điều này giống với khi bạn save dữ liệu của mình trong /mnt, sau đó cắm USB và mount USB với thư mục /mnt thì những file dữ liệu có từ trước sẽ bị ẩn đi đến khi USB được umount. Để test trường hợp này mình có một ví dụ sau:
1. Tạo một Image từ Dockerfile đảm bảo rằng có một folder “không trống” khi chạy container.
```
cd ~
mkdir create_image && cd create_image
cat <<EOF > Dockerfile FROM centos:centos7

  LABEL "image-type"="duckhang-test"
  MAINTAINER duckhang
  RUN mkdir /opt/test_folder && \
      touch /opt/test_folder/test_file.txt
EOF
docker build -t image-test .
docker images
```
2. Chạy một container và đảm bảo image tạo ra một container có một folder “không trống”
```
docker run -itd --name test_container image-test
docker exec test_
container bash -c "ls /opt/test_folder/"
```
3. Chạy contaier sử dụng chính image đó với bind mounts và kiểm tra thư mục mount
```
mkdir /opt/docker_host_folder
docker run -itd --privileged --name another_container --mount type=bind,src=/opt/docker_host_folder,dst=/opt/test_folder/ image-test
docker exec another_container bash -c "ls /opt/test_folder/"
```
4. Unmount thư mục trong container và kiểm tra lại
```
docker exec another_container bash -c "umount  /opt/test_folder/"
docker exec another_container bash -c "ls /opt/test_folder/"
```
> test_file.txt

### tmpfs

Volumes và bind mounts cho phép bạn chia sử dữ liệu giữa docker host và container kể cả khi container bị stop hoặc xóa đi. Nếu bạn sử dụng Docker trên Linux thì bạn có một option thứ ba là **tmpfs mounts**

**Sử dụng tmpfs mounts khi nào ?**

* Khi bạn không muốn giữ data trên docker host hoặc trong container.
* Khi muốn bảo mật, hoặc muốn đảm bảo hiệu suất container khi ứng dụng cần ghi một số lượng lớn dữ liệu không liên tục.
* tmpfs mount sẽ lưu dữ liệu tạm thời trên memory. Khi container stop, tmpfs mount sẽ bị xóa bỏ.

**Ví dụ**

```
docker run -itd --name tmp_mount --mount type=tmpfs,dst=/opt/ centos
docker exec tmp_mount bash -c "touch /opt/test.txt"
docker exec tmp_mount bash -c "ls /opt/"
```
> test.txt

Restart container và kiểm tra lại
```
docker container restart tmp_mount
docker exec tmp_mount bash -c "ls /opt/"
```
Kết quả trả về là trắng tinh

### Tổng kết

Như vậy trong bài viết này mình đã giới thiệu một thành phần quan trọng trong Docker đó là Docker Storage. Docker Storage có 3 option cho bạn lựa chọn là volumes, bind mounts, tmpfs mounts. Nếu có vấn đề gì thì comment ở dưới để cùng trao đổi nhé.

### Tài liệu tham khảo
https://docs.docker.com/storage/