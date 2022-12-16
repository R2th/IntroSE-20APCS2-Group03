### Giới thiệu
Chào các bạn tới với series về kubernetes. Đây là bài thứ hai trong series của mình, trong bài này mình sẽ nói về Kubernetes Pod. Để thực hành được bài này thì yêu cầu các bạn đã có cài môi trường docker, kubernetes local và có kiến thức cơ bản về docker, nếu chưa cài các bạn có thể cài [ở đây](https://kubernetes.io/vi/docs/tasks/tools/install-minikube/). Nếu các bạn chưa biết kubernetes là gì thì có thể đọc ở bài viết trước của mình [ở đây](https://viblo.asia/s/kubernetes-series-part-1-kubernetes-la-gi-Am5yqPkA5db)
### Kubernetes Pod là gì?
Pod là thành phần cơ bản nhất để deploy và chạy một ứng dụng, được tạo và quản lý bởi kubernetes. Pod được dùng để nhóm (group) và chạy một hoặc nhiều container lại với nhau trên cùng một worker node, những container trong một pod sẽ chia sẻ chung tài nguyên với nhau. **Thông thường chỉ nên run Pod với 1 container** (mình sẽ giải thích về việc khi nào nên chạy một pod một container và một pod nhiều container ở bài khác)

![image.png](https://images.viblo.asia/0cad0b26-579b-45f8-8eb0-4018755cb20e.png)
Vậy tại sao là lại dùng Pod để chạy container, sao không chạy container trực tiếp? Kubernetes Pod như một wrapper của container, cung cấp cho chúng ta thêm nhiều chức năng để quản lý và chạy một container, giúp container của ta chạy tốt hơn là chạy container trực tiếp, như là group tài nguyên của container, check container healthy và restart, chắc chắn ứng dụng trong container đã chạy thì mới gửi request tới container đó, cung cấp một số lifecycle để ta có thể thêm hành động vào Pod khi Pod chạy hoặc shutdown, v...v... Và kubernetes sẽ quản lý Pod thay vì quản lý container trực tiếp

![image.png](https://images.viblo.asia/3fa6159b-da0d-4ffa-91ed-ce947d060f9c.png)
### Chạy ứng dụng đầu tiên bằng Pod
Bây giờ ta bắt tay vào thực hành bài đầu tiên nào. Đầu tiên ta tạo một folder và tạo một file index.js, copy đoạn code sau vào:

```
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello kube\n")
});

server.listen(3000, () => {
  console.log("Server listen on port 3000")
})
```

Tạo file Dockerfile và copy đoạn code sau vào:
```
FROM node:12-alpine
WORKDIR /app
COPY index.js .
ENTRYPOINT [ "node", "index" ]
```
Run câu lệnh build image:
```
docker build -t hello-kube .
```
Test container xem chạy có đúng không bằng câu lệnh :
```
docker run -d --name hello-kube-container -p 3000:3000 hello-kube 
```
![Screen Shot 2022-05-18 at 15.49.41.png](https://images.viblo.asia/2c82aa87-4e89-47d5-bb75-503ec20d09fe.png)
Nếu in ra được chữ hello kube là container của chúng ta đã chạy được. Xóa container đi nhé
```
docker rm -f hello-kube-container
```
Bây giờ chúng ta sẽ dùng Pod để chạy container, các bạn có thể sử dụng image hello-kube của mình hoặc tạo image của riêng các bạn theo hướng dẫn [ở đây](https://www.pluralsight.com/guides/create-docker-images-docker-hub)
Tạo một file tên là hello-kube.yaml và copy config sau vào:
```
apiVersion: v1 # Descriptor conforms to version v1 of Kubernetes API
kind: Pod # Select Pod resource
metadata:
  name: hello-kube # The name of the pod
spec:
  containers:
    - image: hello-kube # Image to create the container
      name: hello-kube # The name of the container
      ports:
        - containerPort: 3000 # The port the app is listening on 
          protocol: TCP

```
> Thường thì ta sẽ không chạy Pod trực tiếp như thế này, mà sẽ sử dụng các resource khác của kube để chạy Pod, mình sẽ nói ở các bài viết sau
Dùng kubectl CLI (nếu bạn đã cài kubernetes local thì kubectl CLI sẽ có sẵn) để chạy file config của Pod

`kubectl apply -f hello-kube.yaml`

![Screen Shot 2022-05-18 at 16.23.22.png](https://images.viblo.asia/735aeea6-5615-43f5-b66c-4b896e1a5a15.png)
Kiểm tra pod đã chạy hay chưa

`kubectl get pod`

![Screen Shot 2022-05-18 at 16.24.59.png](https://images.viblo.asia/1de19ad3-5021-4e0d-b0d6-0c49170b1c3f.png)

Nếu cột status hiện Running là Pod của bạn đã được chạy thành công, status ContainerCreating là Pod đang được tạo. Tiếp theo chúng ta sẽ test pod xem nó chạy đúng hay không. Trước hết để test Pod, ta phải expose traffic của Pod để nó có thể nhận request trước, vì hiện tại Pod của chúng ta đang chạy trong local cluster và không có expose port ra ngoài

![image.png](https://images.viblo.asia/41cee805-48a7-4a9a-acab-d790151a4369.png)

Có 2 cách để expose port của pod ra ngoài, dùng Service resource (mình sẽ nói về Service ở bài sau) hoặc dùng kubectl port-forward. Ở bài này chúng ta sẽ dùng port-forward, chạy câu lệnh sau để expose port của pod
`kubectl port-forward pod/hello-kube 3000:3000`

![Screen Shot 2022-05-18 at 16.30.42.png](https://images.viblo.asia/bed250d5-3d12-4f5e-80e7-0f6a2f64de1c.png)

![image.png](https://images.viblo.asia/4e6911bd-747c-464d-880c-956e77f1b011.png)

Test gửi request tới pod

![Screen Shot 2022-05-18 at 16.38.28.png](https://images.viblo.asia/08e842f8-0d4c-4395-8ae4-dcb044ca8f25.png)

Nếu in ra được chữ hello kube thì pod của chúng ta đã chạy đúng. Sau khi chạy xong để clear resource thì chúng ta xóa pod bằng câu lệnh
`kubectl delete pod hello-kube`

### Tổ chức pod bằng cách sử dụng labels
Dùng label là cách để chúng ta có thể phân chia các pod khác nhau tùy thuộc vào dự án hoặc môi trường. Ví dụ công ty của chúng ta có 3 môi trường là testing, staging, production, nếu chạy pod mà không có đánh label thì chúng ta rất khó để biết pod nào thuộc môi trường nào

![image.png](https://images.viblo.asia/dffb951f-aa43-4aad-b785-1a4af7ef37b0.png)

Labels là một thuộc tính cặp key-value mà chúng ta gán vào resource ở phần metadata, ta có thể đặt tên key và value với tên bất kì. Ví dụ:
```
apiVersion: v1
kind: Pod
metadata:
  name: hello-kube-testing
  labels:
    enviroment: testing # label with key is enviroment and value is testing
    project: kubernetes-series
spec:
  containers:
    - image: hello-kube
      name: hello-kube
      ports:
        - containerPort: 3000
          protocol: TCP

---
apiVersion: v1
kind: Pod
metadata:
  name: hello-kube-staging
  labels:
    enviroment: staging # label with key is enviroment and value is staging
    project: kubernetes-series
spec:
  containers:
    - image: hello-kube
      name: hello-kube
      ports:
        - containerPort: 3000
          protocol: TCP

---
apiVersion: v1
kind: Pod
metadata:
  name: hello-kube-production
  labels:
    enviroment: production # label with key is enviroment and value is production
    project: kubernetes-series
spec:
  containers:
    - image: hello-kube
      name: hello-kube
      ports:
        - containerPort: 3000
          protocol: TCP

```
`kubectl apply -f hello-kube.yaml`
Ta có thể list pod với labels như sau
`kubectl get pod --show-labels`

![](https://images.viblo.asia/56b35d57-a51e-4257-ac13-03af0f26e2ca.png)

Ta có thể chọn chính xác cột label hiển thị với -L options

`kubectl get pod -L enviroment`

![Screen Shot 2022-05-18 at 16.52.51.png](https://images.viblo.asia/ceb6e009-a7db-49aa-8681-f0f009a4cbd1.png)

Và ta có thể lọc pod theo label với -l options

`kubectl get pod -l enviroment=production`

![Screen Shot 2022-05-18 at 16.54.16.png](https://images.viblo.asia/c4874240-e5a1-4e85-a280-b54370077367.png)

Label là một cách rất hay để chúng ta có thể tổ chức pod theo chúng ta muốn và dễ dàng quản lý pod giữa các môi trường và dự án khác nhau. Để clear resource thì chúng ta xóa pod đi nhé

`kubectl delete -f hello-kube.yaml`
### Phân chia tài nguyên của kubernetes cluster bằng cách sử dụng namespace
Tới phần này ta đã biết cách chạy pod và dùng labels để tổ chức pod, nhưng ta chưa có phân chia tài nguyên giữa các môi trường và dự án khác nhau. Ví dụ trong một dự án thì ta muốn tài nguyên của production phải nhiều hơn của testing, thì ta làm thế nào? Chúng ta sẽ dùng **namespace**

Namespace là cách để ta chia tài nguyên của cluster, và nhóm tất cả những resource liên quan lại với nhau, bạn có thể hiểu namespace như là một sub-cluster. Đầu tiên chúng ta list ra toàn bộ namespace

`kubectl get ns`

Ta sẽ thấy có vài namespace đã được tại bởi kube, trong đó có namespace tên là default, kube-system. Namespace default là namespace chúng ta đang làm việc với nó, khi ta sử dụng câu lệnh kubectl get để hiển thị resource, nó sẽ hiểu ngầm ở bên dưới là ta muốn lấy resource của namespace mặc định. Ta có thể chỉ định resource của namespace chúng ta muốn bằng cách thêm option --namespace vào

`kubectl get pod --namespace kube-system`

![Screen Shot 2022-05-18 at 16.56.54.png](https://images.viblo.asia/533383de-49fd-4f62-99bf-a73db20a9cd9.png)

Bây giờ ta sẽ thử tạo một namespace và tạo pod trong namespace đó. Cách tổ chức namespace tốt là tạo theo `**<project_name>:<enviroment>**`. Ví dụ: mapp-testing, mapp-staging, mapp-production, kala-testing, kala-production. Ở đây làm nhanh thì mình sẽ không đặt namespace theo cách trên

`kubectl create ns testing`

Sửa lại file hello-kube.yaml
```
apiVersion: v1
kind: Pod
metadata:
  name: hello-kube-testing
  namespace: testing # namespace name
spec:
  containers:
    - image: 080196/hello-kube
      name: hello-kube
      ports:
        - containerPort: 3000
          protocol: TCP

```

Tạo pod

![Screen Shot 2022-05-18 at 17.01.24.png](https://images.viblo.asia/125e6f49-bf84-499d-826a-0229c9caeb9e.png)

Bây giờ nếu ta list pod mà không chỉ định namespace testing, ta sẽ không thấy pod nào cả

![Screen Shot 2022-05-18 at 17.01.53.png](https://images.viblo.asia/80c7eec5-ad1d-476e-ad69-a1ee75591710.png)

Để list pod, ta phải chỉ định thêm namespace chúng ta muốn lấy

`kubectl get pod -n testing`

![Screen Shot 2022-05-18 at 17.03.12.png](https://images.viblo.asia/25ecb19b-0a25-422e-839c-fde0ffa09d1c.png)

Vậy là ta đã tạo pod trong namespace testing thành công, xóa pod đi nhé, khi xóa thì ta cũng cần chỉ định namespace chứa resource của chúng ta

`kubectl delete pod hello-kube-testing -n testing`
Bạn cũng có thể xóa namespace bằng cách dùng câu lệnh delete, chú ý là khi xóa namespace thì toàn bộ resource trong đó cũng sẽ bị xóa theo

`kubectl delete ns testing`

![Screen Shot 2022-05-18 at 17.06.01.png](https://images.viblo.asia/f19c9069-6fc5-4eac-9d2c-64e810ff377e.png)

Sử dụng namespace ta có thể tổ chức, quản lý việc phân chia tài nguyên giữa các môi trường và dự án khác nhau dễ dàng hơn

### Kết luận
Vậy là ta đã thành công chạy ứng dụng đâu tiên trên kubernetes bằng cách sử dụng Pod. Pod là thành phần đơn giản nhất và là một thành phần chính của kubernetes để chạy container, những thành phần khác của kubernetes chỉ đóng vai trò hỗ trợ để chạy Pod, giúp pod chạy ngon hơn trong việc deploy. Cảm ơn các bạn đã đọc bài của mình. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp lại các bạn ở bài tiếp theo mình sẽ nói về **Kubernetes ReplicationController, ReplicaSet hoặc Kubernetes Services**.