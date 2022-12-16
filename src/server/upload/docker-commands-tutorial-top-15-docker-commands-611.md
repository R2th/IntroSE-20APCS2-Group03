Trong các blog trước đây của tôi, tôi đã đề cập đến Docker là gì và cách bạn có thể sử dụng nó. Hôm nay, trong blog này, tôi sẽ nói về 15 lệnh Docker hàng đầu mà bạn sẽ sử dụng thường xuyên khi làm việc với Docker. Xu hướng của Docker container đang phát triển không ngừng với các tổ chức tích cực tìm kiếm các chuyên gia sở hữu chứng chỉ Docker và kiến ​​thức vững chắc về các lệnh Docker này sẽ cung cấp cho bạn kiến ​​thức chuyên môn cần thiết.

Sau đây là các lệnh đang được đề cập:
* **docker –version**
* **docker pull**
* **docker run**
* **docker ps**
* **docker ps -a**
* **docker exec**
* **docker stop**
* **docker kill**
* **docker commit**
* **docker login**
* **docker push**
* **docker images**
* **docker rm**
* **docker rmi**
* **docker build**

## 1. docker –version
Lệnh này được sử dụng để tải phiên bản docker hiện được cài đặt
![](https://images.viblo.asia/952a9d83-8b14-4c49-80ca-df9abb96b462.png)

## 2. docker pull
Cách sử dụng: 
```
docker pull <image name>
```
Lệnh này được sử dụng để kéo hình ảnh từ kho lưu trữ docker-**docker repository** (hub.docker.com)

![](https://images.viblo.asia/b5f2b8d5-5725-4879-9849-a2f48056c888.png)

## 3. docker run
Cách sử dụng: 
```
docker run -it -d <image name>
```
Lệnh này được sử dụng để tạo container từ một image

![image.png](https://images.viblo.asia/32424059-0f44-4b33-bfc7-d1822a0f3864.png)

## 4. docker ps
Lệnh này được sử dụng để liệt kê các containers đang chạy

![image.png](https://images.viblo.asia/120151b8-767d-45e8-821d-9ad9769647c7.png)

## 5. docker ps -a
Lệnh này được sử dụng để hiển thị tất cả các containers đang chạy và đã thoát

![image.png](https://images.viblo.asia/12c2d98c-407d-4098-98ed-14b29bea1614.png)

## 6. docker exec
Cách sử dụng: 
```
docker exec -it <container id> bash
```
Lệnh này được sử dụng để truy cập container đang chạy

![image.png](https://images.viblo.asia/013decc8-57df-4688-8d98-adbddb2cc803.png)

## 7. docker stop
Cách sử dụng: 
```
docker stop <container id>
```
Lệnh này dừng một container đang chạy

![image.png](https://images.viblo.asia/162ea039-a2df-4144-bc95-3ff8154361a7.png)

## 8. docker kill
Cách sử dụng: 
```
docker kill <container id>
```
Lệnh này sẽ kill container bằng cách dừng việc thực thi nó ngay lập tức. Sự khác biệt giữa "docker kill" và "docker stop" là "docker stop" cung cấp cho container thời gian tắt một cách Gracefully, trong các tình huống mất quá nhiều thời gian để container dừng lại, người ta có thể chọn kill nó.

![image.png](https://images.viblo.asia/b23d4007-a8a4-4308-8250-74713af1543d.png)

## 9. docker commit
Cách sử dụng: 
```
docker commit <conatainer id> <username/imagename>
```
Lệnh này tạo một image mới của container đã chỉnh sửa trên local system

![image.png](https://images.viblo.asia/2226664e-978d-4b58-94cd-3d27e7881903.png)

## 10. docker login
Lệnh này được sử dụng để đăng nhập vào docker hub repository

![image.png](https://images.viblo.asia/f1980339-a070-476d-b1ed-0cded7770cf2.png)

## 11. docker push
Cách sử dụng: 
```
docker push <username/image name>
```
Lệnh này được sử dụng để đẩy một hình ảnh vào docker hub repository

![image.png](https://images.viblo.asia/11b5beb1-b4c1-477a-b815-4f9a4c4ad8a4.png)

## 12. docker images
Lệnh này liệt kê tất cả các docker images được lưu trữ cục bộ

![image.png](https://images.viblo.asia/01288913-8c45-40cf-9ebb-c1629fb3879b.png)

## 13. docker rm
Cách sử dụng: 
```
docker rm <container id>
```
Lệnh này được sử dụng để xóa một container đã dừng

![image.png](https://images.viblo.asia/7f91d24f-0673-4361-921d-4b304cd7f9cd.png)
## 14. docker rmi
Cách sử dụng: 
```
docker rmi <image-id>
```
Lệnh này được sử dụng để xóa image khỏi bộ nhớ cục bộ

![image.png](https://images.viblo.asia/231ad294-28ac-4f57-ad83-2841d38300ce.png)
## 15. docker build
Cách sử dụng: 
```
docker build <path to docker file>
```
Lệnh này được sử dụng để xây dựng một image từ một tệp docker được chỉ định

![image.png](https://images.viblo.asia/a8285b2b-c10d-4a60-9623-3e6e40adf723.png)


*Nguồn: [Edureka](https://www.edureka.co/blog/docker-commands/#version)*