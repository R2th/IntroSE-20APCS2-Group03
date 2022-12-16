# Giới thiệu

Đây là bài viết thứ 3 trong series Kubernetes from zero to hero của mình. Trong hai bài viết trước mình đã giới thiệu tổng quan về **Kubernetes** và một số khái niệm hay component quan trọng của nó. Bạn nào quan tâm có thể tìm lại ở mụa servies ở phía bên phải. Trong bài viết này mình và các bạn sẽ tìm hiểu về minikube, kubectl, một số command chính của **Kubernetes** và cùng setup chúng ở dưới local.

# Minikube

![kubernetes-p3.png](https://images.viblo.asia/f43e957d-519b-4fb7-a1e6-be996c209e63.png)

Ta sẽ đi vào một ví dụ về production cluster setup. Giả sử trên production ta có rất nhiều **master node** và rất nhiều **worker node**. Nếu ta muốn test ứng dụng ở môi trường local hoặc thử deploy một application mới lên **cluster** được setup như production thì ta có thể không có đủ `resource` như memory, CPUm, ... Lúc này ta sẽ cần đến **minikube**.

![a.PNG](https://images.viblo.asia/e08ceb5f-f2ef-44ce-b5bd-aa8681c81683.PNG)

Ta có thể hiển đơn giản **minikube** là **cluster** bao gồm một **master processes** và một **worker processes** chạy trên cùng một **node**. **Minikube** sẽ tạo một virtual box trong máy và **node** như hình bên trên sẽ được chạy trong virtual box. Hay đơn giản là **minukube** là một **node K8s cluster** chạy trong virtual box ở máy tính local dùng cho mục đích kieemr thử (testing).

# Kubectl

Khi ta setup một **cluster** hoặc **mini cluster** ở máy local ta sẽ cần cách đẻ tương tác với **cluster** ví dụ như tạo cấu hình, **pod**, component, ... Lúc này ta sẽ cần **kubectl**.

**Kubectl** là một command line tool cho **K8s cluster**. **Kubectl** có thể tương tác được với **cluster** vì trong **master process** cung cấp cho ta **Api server** là entry point của **K8s cluster**. Vì vậy khi muốn làm bất cứ thứ gì với **Kubernetes** như cấu hình, tạo bất kỳ component nào trong **K8s**, ... ta cần tương tác với **API server**. Ta có thể tương tác với nó bằng nhiều cách khác nhau qua UI như dashboard, **K8s API** hoặc command line tool **kubectl**. Với **kubectl** ta có thể làm bất cứ thứ gì với **K8s**. Ta có thể dùng nó để tương tác với bất cứ **K8s cluster** setup nào (minikube cluster, cloud cluster, ...).

# Cài đặt

## Kubectl

Việc cài **kubectl** khá đơn giản và cũng có đầy đủ hướng dẫn trên trang chủ của **K8s** nên trong phần này mình sẽ chỉ hướng dẫn các bạn cài trên Ubuntu. Đối với những hệ điều hành khác các bạn có thể xem ở [đây](https://kubernetes.io/docs/tasks/tools/). Ở đây mình sẽ dùng `curl` để tiến hành tải package của **kubectl** về máy bạn chưa có `curl` thì tiến hành cài đặt nó trước.

1. Vào terminal chạy câu lệnh:
```terminal
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

> Đề cài đặt một version nào đó của **kubectl** ta có thể tiến hành thay thế phần `$(curl -L -s https://dl.k8s.io/release/stable.txt)` trong câu lệnh với version cụ thể.
> 
> Ví dụ để tải version v1.24.0 ta viết như sau:
> `curl -LO https://dl.k8s.io/release/v1.24.0/bin/linux/amd64/kubectl`

2. Để kiểm tra binary t làm như sau:
* Tải **kubectl** checksum file với câu lệnh:
```
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
```
* Tiến hành kiểm tra **kubectl** binary với checksum file:
```
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
```
 Nếu kết quả ở terminal hiện ra dòng chữ `kubectl: OK` thì là đúng. Còn nếu kiểm tra không thành công thì ta sẽ nhận được output.
 ```
 kubectl: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
 ```

Lưu ý là khi kiểm tra thì ta cần tải checksum file cùng version với package.

3. Cài đặt **kubectl**:
```
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

4. Sau khi chạy xong ta có thể kiểm tra xem cài đặt thành công hay chưa bằng câu lệnh:
```
kubectl version --client
```
Output như sau là thành công:
![Screenshot from 2022-05-30 14-23-31.png](https://images.viblo.asia/eccd235a-676a-48fb-8c7d-6b09126ab4f0.png)

Hoặc bạn cũng có thể gõ:
```
kubectl
```

## Minikube

Tương tự như trên trong phần này mình sẽ hướng dẫn cài đặt trên hệ điều hành Ubuntu. Đối với những hệ điều hành khác các bạn có thể tham khảo ở [đây](https://kubernetes.io/vi/docs/tasks/tools/install-minikube/).

1. Vào terminal chạy câu lệnh:
```terminal
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
  && chmod +x minikube
```

2. Thêm **minikube** vào biến môi trường:
```terminal
sudo mkdir -p /usr/local/bin/
sudo install minikube /usr/local/bin/
```

3. Để kiểm tra xem đã cài đặt thành công hay chưa bạn tiến hành gõ câu lệnh:
```
minikube
```

Output ta sẽ có như sau:
![Screenshot from 2022-05-30 14-37-00.png](https://images.viblo.asia/d09994d3-3f6b-4eaf-a7c3-44d643426339.png)
 
Như bạn có thể thấy hình trên là một số command của **minikube**. Ta có thể sử dụng command `start` để tạo **cluster**, `stop`, `delete` để dừng hoặc xóa **cluster** và rất nhiều command khác. Mình sẽ thử tiến hành khởi tạo và chạy **cluster** vói command start.

Cú pháp:
```
minikube start --vm-driver=<hypervisor>
```
Bạn có thể thêm flag `--vm-driver` để tùy chọn hypervisor cho `minikube cluster`. Sau khi chạy command ta có kết quả.

![Screenshot from 2022-05-30 22-22-52.png](https://images.viblo.asia/17daa280-1856-4987-9b34-6c48f456c0d0.png)

**Minikube** đã có sẵn `docker pre-installed` nên ta có thể tạo docker container bên trong **cluster**. Bây giờ ta đã có thể dùng command của **kubectl** để tương tác với **K8s cluster**. Ta thử chạy câu lệnh sau:
```
// Xem trạng thái của các nodes của cluster
kubectl get nodes
```

![Screenshot from 2022-05-30 22-28-32.png](https://images.viblo.asia/a3aea893-e489-4757-8a1d-3f1bc5a83f1a.png)

Ta có thể thấy trên hình `minikube` nodes có trạng thái `Ready` và vì chỉ có một node nên nó sẽ chạy trong `Master process`. Ngoài ra ta cũng có thể lấy ra trạng thái của **minikube** bằng command:
```
minikube status
```

![Screenshot from 2022-05-30 22-31-41.png](https://images.viblo.asia/dfc1984c-602e-4e99-8de6-3492c0a0cbf0.png)

# Một số command cơ bản Kubernetes

Trong phần này mình sẽ giới thiệu với các bạn những command dùng để `Create` và `debug` **pod** trong minikube cluster. CRUD **deployment** command. Xem `status` của những **K8s** component khác nhau.

## CRUD commands

* `kubectl get nodes`: như bên trên mình đã giải thích command này dùng đề xem trại thái của các **nodes**
* `kubectl get pod`: danh sách tất cả **pod** của namespace
* `kubectl get services`: danh sách tât cả **service** của namespace
* 
![Screenshot from 2022-05-30 22-40-56.png](https://images.viblo.asia/a85f9b90-2dd6-43f5-81f0-e48979944d18.png)

Tương tự như vậy ta cũng có thể lấy ra component khác với command `kubectl get`.

* `kubectl create deployment <NAME> --image=image [--dry-run] [options]`: dùng để tạo **deployment**. Vì **deployment** là bản vẽ (blueprint) của **pod** nên tạo **depoyment** chính là tạo **pod**. Cấu hình cơ bản nhất của **pod** là tên và image của nó.
* 
 ![Screenshot from 2022-05-30 22-45-53.png](https://images.viblo.asia/77725ea0-fb75-481e-98aa-ca17d431e8c9.png)
 
 Như trong hình bạn có thể thấy ta có deployment là nginx-deploy và pod với trạng thái là `Running`. Giờ ta thử chạy command `kubectl get replicateset` ta có thể thấy `state` của nó. Để ý thấy phần tên replicateset có phần prefix là tên của deployment cộng với hash id và tên của pod thì prefix của replicateset cộng với hash id của pod.
 
 ![Screenshot from 2022-05-30 22-54-23.png](https://images.viblo.asia/98df052a-cc21-4d24-af28-ce5aab0dcbe7.png)

 => Replicateset quản lý `replicate` của **pod**. Với command trên ta chỉ tiến hành tạo một **pod** và một **replicate** nếu ta muốn tạo nhiều **replicate** hơn ta có thể thêm vào `options`.
* `kubectl edit deployment <NAME>`: dùng để sửa **deployment**. Khi chạy lệnh này thì file cấu hình của **deployment** sẽ được hiện ra để ta có thể sửa.

![Screenshot from 2022-05-30 23-06-00.png](https://images.viblo.asia/fddfe7b8-1941-450f-a361-59357164414a.png)

Phần chi tiết về YAML config file của **K8s** mình sẽ giải thích ở bài viết khác, ở đây bạn hoàn toàn có thể sửa cấu hình của depoyment theo ý mình rồi tiến hành lưu file. Sau khi lưu file thì **K8s** sẽ tiến hành xóa pod cũ và khởi tạo pod mới với đúng với cầu hình của deployment vừa sửa.

* `kubectl delete deployment <NAME>`: dùng để xóa **deployment**(pod và replicateset cũng bị xóa theo).
* `kubectl apply -f <FILE_NAME>`: nếu ta có YAML config file thì ta có thể tiến hành tạo `resource` trong **K8s** bằng command này. Mọi cấu hình trong file sẽ được **K8s** áp dụng. **K8s** sẽ biết khi nào cần tạo mới hoặc cập nhật `resource` khi chạy command này.
* `kubectl delete -f <FILE_NAME>`: tương tự như command trên nhưng ta dùng để xóa **pod** với `type` và `name` được cấu hính trong file.

## Debugging pods command

* `kubectl logs <POD_NAME>`: xem logs của **pod**
* `kubectl describe pod <POD_NAME>`: ta có xem thêm nhiều thông tin khác của **pod** bằng lệnh này.
* `kubectl exec -it <POD_NAME> -- bin/bash`: ta sẽ inject conatiner của **pod** để tiến hành chạy command trong đó.

# Lời kết
Đây đã là bài viết thứ 3 trong series **Kubernetes - from zero to hero** của mình. Trong bài viết này mình đã giới thiệu cho các bạn về **monikube**, **kubectl**, một số command cơ bản và cách cài đặt chúng ở dưới local. Mình hy vọng các bạn có thế hiểu và thực hành được ở dưới máy cá nhân vì phần này cũng không có kiến thức nào quá mới và khó. Nếu trong bài viết có phần nào chưa được đúng và đầy đủ mong được các bạn góp ý để bài viết được đầy đủ hơn. Cảm ơn các bạn đã theo dõi đến hết bài viết ❤️.

# Tham khảo
[Kubectl cheat sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

[Minikube](https://minikube.sigs.k8s.io/docs/start/)

[Kubectl](https://kubernetes.io/docs/reference/kubectl/)