Một người bạn của tôi đã từng hỏi, tại sao tôi lại lại thích microk8s hơn minikube?… Kể từ đó, chúng tôi không bao giờ nói chuyện nữa.

Đó là một câu hỏi khó, đặc biệt là đối với một kỹ sư. Câu trả lời không quá rõ ràng, vì nó phải tự trải nghiệm và sở thích cá nhân. Để tôi chỉ cho bạn hiểu vì sao.

# **MicrroK8s là gì?**
MicroK8S là một gói hổ trợ cài đặt và vận hành Kubernetes một cách nhanh chóng và hiệu quả. Được phát triển bởi [Canonical](https://canonical.com/) (Ubuntu)


## **Lợi ích khi sử dụng Microk8s**
1. Dễ cài dặt, chỉ cần máy của bạn hổ trợ [snap](https://snapcraft.io/)
2. Hỗ trợ cho hơn 42 HĐH Linux, Windows,Mac OS
3. Hỗ trợ nhanh các cài đặt nhanh các addon Kubernetes cốt lõi như dns và dashboard
4. Kiểm soát cụm của bạn bằng công cụ kubectl CLI
5. Triển khai nhanh các container trong cụm

> Trong bài viết này mình sẽ hướng dẫn các bạn cài đặt cụm 3 node theo mô hình HA (High Availability ) có tính khả dụng cao

Bạn cần chuẩn bị 3 máy chủ  cấu hình như sau:

| IP       | Hostname| vCPU | RAM | DISK |
| -------- | -------- | -------- | -------- | -------- |
| 10.19.2.92 | stg-02 | 6 core     | 12G     | 100G     |
| 10.19.2.93 | stg-03     | 6 core     | 12G     | 100G     |
| 10.19.2.94 | stg-03     | 6 core     | 12G     | 100G     |


{@embed: https://www.youtube.com/watch?v=yQegrOjKS3U&t=22s}


 **Giờ chúng ta bắt đầu thôi :**

### Bước 1 : ssh vào từng node và đổi lại hostname giống như trên 

```
sudo hostnamectl set-hostname "stg-02"   // 1st node
sudo hostnamectl set-hostname "stg-03"   // 2nd node
sudo hostnamectl set-hostname "stg-04"   // 2nd node
```
### Bước 2: Update và upgrade tất cả các node
```
sudo apt update && apt upgrade -y
```

### Bước 3: Thêm các trường vào file hosts

- Mở file: /etc/hosts
```
nano /etc/hosts
```
- Thêm vào cuối file : 
```
10.19.2.92 stg-02
10.19.2.93 stg-03
10.19.2.94 stg-04
```
![image.png](https://images.viblo.asia/86abffbd-3be1-41f4-9cbc-8fece03a5ae4.png)

### Bước 4: Cài đặt microk8s

```
sudo snap install microk8s --classic --channel=1.25
```
![image.png](https://images.viblo.asia/09132167-e327-47f2-a94e-9671f855684a.png)

Microk8s tạo ra một nhóm để kích hoạt sử dụng các lệnh liền mạch yêu cầu đặc quyền root. Để thêm người dùng hiện tại của bạn vào nhóm và có quyền truy cập vào thư mục bộ đệm Kube, hãy chạy hai lệnh sau:
```
sudo usermod -a -G microk8s $USER
sudo chown -f -R $USER ~/.kube
su - $USER
```
Kiểm tra trạng microk8s  của stg-02,stg-03,stg-04
```
microk8s status --wait-ready
```
### Bước 5: Thêm các node vào cụm 

-  Tạo token add-node : 
```
microk8s add-node 
```
![image.png](https://images.viblo.asia/4e4b3feb-9a7e-408f-8fd9-29e9822077a9.png)

Lưu ý : Có 2 loại join 
- join master 
 ![image.png](https://images.viblo.asia/3ce9ca0b-5014-4ac7-bd9b-a8326c0308de.png)
- join worker
![image.png](https://images.viblo.asia/a96b3821-0840-4ddd-8dc8-3145cfc6e1c3.png)

Ở bài này thì mình join 3 máy làm master luôn

Khi join thành công ta dùng lệnh ```microk8s status``` để kiểm tra xem 3 node đã join vào làm master chưa

![image.png](https://images.viblo.asia/2012da5f-1389-4992-b483-66ec92fe0eb6.png)


### Bước 6: Kích hoạt addon dashboard dns storage
```
microk8s enable dns dashboard storage
```
sau khi thành công bạn dùng lệnh **microk8s dashboard-proxy** để mở dashboard

```
microk8s dashboard-proxy
```
![image.png](https://images.viblo.asia/82abd9be-9684-46df-b8cd-e7cc02168952.png)

Các bạn có thể tham khảo thêm ở trang chủ : https://microk8s.io/docs/high-availability

Cảm ơn mọi người đã theo dõi bài viết!