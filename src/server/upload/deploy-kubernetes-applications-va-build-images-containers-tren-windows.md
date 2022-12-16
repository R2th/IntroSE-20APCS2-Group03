Chắc hẳn ai đã từng cài đặt Docker Desktop trên Windows thì đều không muốn quay trở lại lần thứ 2, chứ đừng nói tới là deploy K8S trên Windows.

# 1. Cài đặt Rancher Desktop trên Windows
Hãy cảm ơn [Rancher Labs / SUSE](https://rancherdesktop.io/) đã giúp chúng ta cài đặt Container Runtime và tạo một cluster Kubernetes trên Windows một cách dễ dàng!

![image.png](https://images.viblo.asia/d3804254-a110-4930-8426-0d908d8c9af7.png)

Sau khi tải về, Rancher Installer sẽ tự động set up hết, chúng ta chỉ cần ngồi chờ thôi!
Đây chính là giao diện chính của Rancher Desktop:

![image.png](https://images.viblo.asia/4c922406-2654-4d75-b8c3-b4870a1b4795.png)

Bạn có thể chọn sử dụng Container Runtime là `docker` hay là `nerdctl`, tập lệnh của cả 2 đều giống như nhau và đều có thể tương tác với [COMPOSE](https://docs.docker.com/compose/)

![image.png](https://images.viblo.asia/67cd3d76-c64e-43c7-9941-e39ce3bd15c6.png)

Tiếp theo hãy chọn enable Kubernetes nếu bạn muốn tạo một cluster K8S trên Windows, Rancher sẽ hỗ trợ cài đặt cho bạn cả tool `kubectl` và `helm`

![image.png](https://images.viblo.asia/16316a58-dd95-482c-b2c3-7a37c37e7709.png)

# 2. Hello World Example
Trong bài viết này mình sẽ hướng dẫn cách bắt đầu đơn giản với Rancher Desktop bằng cách build một image container và deploy một pod lên K8S từ image đã tạo.

### Tạo một folder chứa file index.html với [VSCODE](https://code.visualstudio.com/) 

```
<h1>Hello World from NGINX!!</h1>
```

![image.png](https://images.viblo.asia/a8ad17a4-9317-487d-9f86-341bed6dfb05.png)

### Tạo file Dockerfile với nội dung như sau:

```
FROM nginx:alpine

COPY ./nginx/index.html /usr/share/nginx/html
```

![image.png](https://images.viblo.asia/1c8f1dcb-ac0e-42e9-beca-58621dfabf76.png)

### Build images

```
nerdctl --namespace k8s.io build --tag nginx-helloworld:latest .

docker build --tag nginx-helloworld:latest .
```

![image.png](https://images.viblo.asia/1e845408-b882-4609-a23f-8ca33a32e3b6.png)

Kiểm tra lại images containers đã tạo

```
nerctl -n k8s.io images

docker images
```

![image.png](https://images.viblo.asia/03ac949c-7f9e-48b1-82c4-2565f5e762bd.png)

### Deploy lên Kubernetes

Sử dụng flag --image-pull-policy=Never để K8S sử dụng image ở local thay vì pull images từ một remote repository.

```
kubectl run hello-world --image=nginx-helloworld:latest --image-pull-policy=Never --port=80

kubectl port-forward pods/hello-world 8080:80
```

![image.png](https://images.viblo.asia/e70fa872-fe12-4d73-a488-505230f81b25.png)

Mở web browser ở địa chỉ `localhost:8080`, và bạn sẽ thấy message Hello World from NGINX!!. 

![image.png](https://images.viblo.asia/5d9c7d81-d604-485f-95c8-da9c5f53ce1d.png)