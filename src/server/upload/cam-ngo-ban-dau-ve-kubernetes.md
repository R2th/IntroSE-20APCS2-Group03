![](https://images.viblo.asia/7c0b0386-3492-4b3f-945d-8d9e4640ad88.jpg)

Mục tiêu bài viết giúp các bạn có cái nhìn tổng quan về một hệ thống Kubernetes về lý thuyết và thông qua thực hành để nắm chắc hơn. Yêu cầu người đọc cần có một chút kiến thức cơ bản về Docker (Khái niệm image, container). 

## 1. Sự xuất hiện của Kubernetes

Với sự ra đời của công nghệ ảo hóa (container) mà điển hình là [Docker](https://www.docker.com/) vơi nhiều lợi ích mang lại, các sản phẩm được triển khai ở dạng container ngày một nhiều hơn.

Chúng ta cùng so sánh một chút cách triển khai ứng dụng dạng container so với các cách triển khai khác vốn đã được áp dụng từ lâu.

![](https://d33wubrfki0l68.cloudfront.net/26a177ede4d7b032362289c6fccd448fc4a91174/eb693/images/docs/container_evolution.svg)

**Triển khai ứng dụng dạng truyền thống**: Các ứng dụng được triển khai trên các server vật lý. Trong trường hợp nhiều ứng dụng được triển khai trên cùng một server, có thể xảy ra trường hợp các ứng dụng xung đột tài nguyên. Cách khắc phục phần nào là chạy từng ứng dụng trên mỗi server vật lý khác nhau, nhưng điều này gây tốn kém chi phí server.

**Triển khai ứng dụng trên máy ảo**: Trên một server vật lý chạy nhiều máy ảo khác nhau, mỗi ứng dụng sẽ được trên khai trên các máy ảo độc lập, điều này tránh được việc xung đột tài nguyên xảy ra, tiết kiệm chi phí, thuận lợi hơn cho việc mở rộng ứng dụng.

**Triển khai ứng dụng trên container**: Cũng là môi trường ảo hóa tương tự như máy ảo, nhưng cách thức triển khai ứng dụng với container sẽ nhẹ hơn, tiết kiệm tài nguyên hơn so với máy ảo. Lý do là các ứng dụng chạy trên các máy ảo độc lập thì cần tiêu tốn thêm tài nguyên cho mỗi hệ điều hành ở máy ảo đó, còn các container khác nhau sẽ chia sẻ chung một hệ điều hành. 

![](https://images.viblo.asia/b29f6351-6ecd-4a2b-8ddf-b7f7cf2e29ad.png)

![](https://images.viblo.asia/46692f95-485c-4c15-bd9a-b8dc8abe555f.png)

Tuy nhiên, việc triển khai các sản phẩm trên môi trường production với Docker gặp nhiều khó khăn, nhất là với những ứng dụng, hệ thống lớn:
- Việc quản lý hàng loạt docket host
- Container Scheduling
- Rolling update
- Scaling/Auto Scaling
- Monitor vòng đời và trạng thái của container (container có thể bị shutdown hay lỗi đột ngột).
- Self-hearing trong trường hợp có lỗi xãy ra. (Có khả năng phát hiện và tự correct lỗi)
- Service discovery
- Load balancing (cân bằng tải)
- Quản lý data
- Quản lý log
- Sự liên kết và mở rộng với các hệ thống khác

Và Kubernetes xuất hiện giúp giải quyết các vấn đề nêu trên.

**Kubernetes**: là một nền tảng mã nguồn nguồn mở, giúp cho việc quản lý, triển khai, mở rộng các ứng dụng ở dạng *container* một cách tự động, dễ dàng hơn.

**Kubernetes** là một từ có nguồn gốc từ tiếng Hy Lạp có nghĩa là thủy thủ, được Google giới thiệu năm 2014 dựa trên các dự án nội bộ đã sử dụng nhiều năm để triển khai ứng dụng dạng container trên hàng ngàn, chục ngàn máy chủ khác nhau ( Dự án Borg và sau đổi tên thành Omega).

![](https://images.viblo.asia/14ca488e-e9bb-4f4c-9ee3-b51279c1811f.png)
 **Logo của Kubernetes là hình bánh lái tàu của thủy thủ**

Hình bên dưới thể hiện mô tả cơ bản nhất về một hệ thống **Kubernetes**. Khi một ứng dụng được triển khai bằng **Kubernetes**, nó sẽ tạo ra một hoặc nhiều cụm (cluster). Một cụm sẽ có ít nhất một master nodes và một worker nodes (một node là một máy vật lý hoặc máy ảo).

Vậy cụm thực sự là cái gì, worker nodes, master nodes có vai trò như thế nào ? Chúng ta sẽ cùng tìm hiểu ở phần tiếp theo.

![](https://images.viblo.asia/4b3baa11-3178-4bb3-a527-f4df61ec828f.png)

## 2. Kiến trúc của một cụm trong Kubernetes

Như đã giới thiệu qua ở phần trên, một cụm trong **Kubernetes** sẽ có 2 thành phần chính:
- Master node: Nơi điều phối, quản lý toàn bộ hệ thống **Kubernetes**.
- Worker node: Chịu trách nhiệm chạy các container của ứng dụng.

![](https://images.viblo.asia/7f122200-965b-44b1-86ed-e4e2b6fc4bcf.png)

Đi chi tiết hơn vào các thành phần của master node và worker node, ta sẽ thấy

### Master node:
- Kubernetes API Server: Là thành phần trung tâm của một cụm kubernetes.
- Controller Manager: Thực hiện các chức năng như theo dõi tình trạng (đang chạy hay bị shutdown) của các container, cũng như các worker node, chịu trách nhiệm xử lý khi lỗi xảy ra.
- Scheduler: Bộ điều phối, chọn các worker nodes để chạy các container.
- etcd: Là một công cụ lưu trữ dữ liệu phân tán key-value, giúp master nodes lưu trữ các thông tin, trạng thái trong cluster. 

### Worker node:
- Kubelet: Chạy trên các worker node, thực hiện giao tiếp với API Server của master node và quản lý các container chạy trên node đó.
- Kube-proxy: Thực hiện chức năng cân bằng tải (load-balances )
- Container Runtime: Là các phần mềm ảo hóa container như  [Docker](https://www.docker.com/) , [rkt](https://coreos.com/rkt/), v.v

## 3. Chạy ứng dụng trên Kubernetes

Để chạy ứng dụng trên **Kubernetes**, chúng ta cần đóng gói các thành phần của ứng dụng dưới dạng container images, push images lên các máy chủ lưu trữ (ví dụ như [Docker Hub](https://hub.docker.com/)). Và cuối cùng là post các `app description` của ứng dụng tới  Kubernetes API server.

Chúng ta xem hình bên dưới để hiểu rõ hơn về cách các ứng dụng được triển khai trên Kubernetes. Phần `app descriptor` liệt kê 4 container, được gom thành 3 nhóm. Hai nhóm đầu tiên chỉ chứa một container, trong khi nhóm cuối cùng chứa hai. Điều đó có nghĩa là cả hai container này cần chạy cùng nhau. Bên cạnh mỗi nhóm, chúng ta cũng thấy thông tin về số lượng các bản sao của mỗi nhóm cần được deploy. Sau khi submit `descriptor` đến Kubernetes, thành phần `Schedule` của master node sẽ chỉ định vị trí của từng nhóm tại các nút worker có sẵn. `Kubelets` trên các worker node sau đó sẽ yêu cầu Docker kéo image container Docker hub và chạy các container lên.

![](https://images.viblo.asia/b329994d-3dce-4e87-9c71-d4a276be9632.png)

### Duy trì trạng thái ổn định của các container

Khi ứng dụng đang chạy, Kubernetes liên tục đảm bảo rằng trạng thái được triển khai của ứng dụng luôn đúng với mô tả bạn cung cấp. Ví dụ: nếu bạn chỉ định rằng bạn luôn muốn có 5 phiên bản của một máy chủ web chạy, Kubernetes sẽ luôn giữ chính xác năm phiên bản đang chạy. Nếu trong những trường hợp bất ngờ, như khi quá trình container gặp sự cố hoặc ngừng phản hồi, Kubernetes sẽ tự động khởi động lại.

Tương tự, nếu toàn bộ worker node chết hoặc không thể truy cập, Kubernetes sẽ chọn các nút mới cho tất cả các container đang chạy  và chạy chúng trên nút mới được chọn.

### Mở rộng (Scaling)

Trong khi ứng dụng đang chạy, chúng ta có thể quyết định tăng hoặc giảm số lượng bản sao container. Thậm chí nếu chung ta muốn, Kubernetes có thể đảm nhận luôn công việc này. Nó có thể tự động điều chỉnh số lượng, dựa trên các số liệu thời gian thực, chẳng hạn như tải CPU, mức tiêu thụ bộ nhớ, truy vấn mỗi giây hoặc bất kỳ số liệu nào khác mà ứng dụng của bạn hiển thị.

## 4. Demo Kubernetes trên local

Ở phần này chúng ta sẽ thử deploy một ứng dụng đơn giản viết bằng Node.js với **Kubernetes** trên với [Minikube](https://github.com/kubernetes/minikube) là một công cụ implement Kubernetes ở local. Nếu muốn sử dụng trên môi trường production thì các bạn nên tham khảo [Rancher](https://rancher.com/) hay [Helm](https://helm.sh/).

Chúng ta viết 1 ứng dụng Node.js cơ bản nhất:

File `app.js`

```javascript:js
const http = require('http');
const os = require('os');

console.log("Kubia server starting...");

let handler = function(request, response) {
 console.log("Received request from " + request.connection.remoteAddress);
 response.writeHead(200);
 response.end("You've hit " + os.hostname() + "\n");
};

let www = http.createServer(handler);
www.listen(8080);
```

Cùng với đó là `Dockerfile` cùng thư mục với `app.js`

```html
FROM node:10
ADD app.js /app.js
ENTRYPOINT ["node", "app.js"]
```

### B1: Build docker image

Chúng ta build image có tên là **kuber**

```bash
docker build -t kuber .
```

### B2: Chạy docker container từ image

Ta mapping cổng 8080 trong container với cổng 8080 ở máy vật lý

```bash
 docker run --name kuber-container -p 8080:8080 -d kuber
```

### B3: Cài đặt Minikube

Trên Linux (Các bạn có thể tham khảo cách cài đặt minikube trên các nền tảng khác tại [đây](https://minikube.sigs.k8s.io/docs/start/))

```bash
 curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
 sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

### B4: Khởi động minikube

```bash
$ minikube start
Starting local Kubernetes cluster...
Starting VM...
SSH-ing files into VM...
...
Kubectl is now configured to use the cluster. 
```
Quá trình khởi động sẽ tốn một vài phút

### B5: Cài đặt kubernetes client (kubectl)

Trên Linux (Các bạn có thể tham khảo cách cài đặt kubectl trên các nền tảng khác tại [đây](https://kubernetes.io/docs/tasks/tools/install-kubectl/))

```bash
sudo apt-get update && sudo apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
```

### B6: Deploy

Deploy ứng dụng bằng cách sử dụng `kubectl` là một cách nhanh chóng, đơn giản hơn và bù lại sẽ không thể đẩy đủ, chi tiết bằng cách sử dụng file `json` hay `yaml` để config. Tuy nhiên, mới bắt đầu học thì chúng ta dùng `kubectl` sẽ là lựa chọn tốt hơn. 

```bash
 kubectl run kuber --image=kuber --port=8080 --generator=run/v1
```

### B7: Cài đặt thêm service LoadBlance

Để có thể access đến các container trong cluster kubernetes, chúng ta cần cài thêm service. `LoadBlance` là một service giúp chúng ta có thể làm được điều đó.

```bash
 kubectl expose rc kuber --type=LoadBalancer --name kuber-http
```

### B8: Get các service

```bash
kubectl get svc
```

![](https://images.viblo.asia/e7f233ee-4dce-4df8-9276-fb74e125cdfd.png)

### B9: 

Bây giờ, thông qua service, chúng ta có thể truy cập đến server của container đã deploy

```bash
curl -v http://$(minikube ip):30863
```

![](https://images.viblo.asia/b663dd03-5e43-4c8a-bdad-fe5ac8e6a90a.png)

## Tài liệu tham khảo
- https://kubernetes.io/docs/concepts/
- https://blog.vietnamlab.vn/2018/08/08/nhap-mon-kubernetes/
- [Kubernetes In Action](https://www.manning.com/books/kubernetes-in-action)