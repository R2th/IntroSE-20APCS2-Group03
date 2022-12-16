![](https://images.viblo.asia/2fcd15f3-1860-4618-a265-801e28bfebd8.jpg)


Article đi kèm với **Youtube Video** của mình. Mong các bạn **Subcribe** và **Share** để giúp mình có động lực hơn nữa nha :laughing:
{@youtube: https://www.youtube.com/embed/lanrQZimwvw}

-----

Hôm nay, mình sẽ hướng dẫn cài đặt một **Kubernetes Cluster** đơn giản trên **Google Cloud Platform - Google Kubernetes Engine** (**GKE**). Sau đó, mình sẽ deploy **NGINX Web Server** trên cluster này.

Các command mà mình sử dụng trong video này được chạy trong môi trường máy ảo **Vagrant Ubuntu 18**.
Tuy nhiên, bạn hoàn toàn có thể tham khảo để cài đặt trên các môi trường khác Macbook và Windows.

Okay vậy chúng ta hãy cùng nhau bắt đầu !!!

-----

# Trước khi bắt đầu
Để sử dụng GKE, Bạn sẽ cần phải chuẩn bị một vài thứ sau:

* Tài khoản GCP (chung với tài khoản Gmail): Khi đăng ký sẽ cần nhập thông tin thẻ ghi nợ quốc tế. Tuy nhiên GCP free 300$ cho tài khoản mới nên bạn có thể thoải mái tìm hiểu GCP đừng lo lắng quá nhé.
* Tạo GCP Project mới
* Kích hoạt sử dụng 2 dịch vụ: Compute Engine và Kubernetes Engine (mở giao diện Google Cloud Console và lần lượt mở từng giao diện quản lý của từng dịch vụ)


# 1. Cài đặt Google Cloud SDK và kubectl
Để cài đặt Google Cloud SDK, mình sẽ làm theo [hướng dẫn trên trang chủ của GCP](https://cloud.google.com/sdk/docs/install).

Vì Cloud SDK cần Python để chạy nên đầu tiên bạn cần kiểm tra máy tính của bạn đã  cài Python hay chưa:
```
 python --version
```

Tiếp theo, chúng ta sẽ thêm package source của **Cloud SDK**:
```
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
```
Tiếp theo, chúng ta cài đặt các package cần thiết là:  apt-transport-https 
```
sudo apt-get install apt-transport-https ca-certificates gnupg
```
Import Google Cloud Public Key:
```
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
```
Cuối cùng là cài đặt Cloud SDK và kubectl:
```
sudo apt-get update && sudo apt-get install google-cloud-sdk
sudo apt-get install kubectl
```

Sau khi cài đặt xong, để kiểm tra xem, mình sẽ chạy thử
```
gcloud version
```
và
```
kubectl version --short --client
```

**Sau khi đã chuẩn bị xong nếu bạn sẽ chạy đc như sau thì bạn có thể làm tiếp bước tiếp theo:**
![](https://images.viblo.asia/5b8d95d4-ac65-4756-a058-c35760de297f.png)


-----

# 2. Configure Google Cloud SDK
Sau khi cài đặt xong, chúng ta sẽ phải configure Cloud SDK bằng command `gcloud init`:

```
gcloud init
```

Terminal sẽ hiển thị một link và yêu cầu bạn đăng nhập **verification code**. Bạn cần copy và mở URL trên browser.
Sau khi mở link đấy, browser sẽ redirect đến màn hình đăng nhập Gmail. Đăng nhập  bằng Gmail của bạn,  bạn sẽ nhận được một **verification code** như sau.

![](https://images.viblo.asia/a8d04cc0-778f-4ceb-ab1f-44502d48be0f.png)

Copy và Paste vào Terminal

![](https://images.viblo.asia/f68013e3-753b-4b19-8868-bfc81d96c5be.png)

Tiếp theo, Terminal sẽ yêu cầu bạn chọn hoặc tạo mới GCP project.
Và sau đó sẽ yêu cầu bạn chọn **region** và **zone** mặc định.  
Vì mình ở Nhật Bản nên mình sẽ chọn zone: asia-northeast1-a. (Là số 34)

![](https://images.viblo.asia/37708776-3779-4e9c-80e4-6062c18b25df.png)

Sau khi configure Cloud SDK thành công, mình sẽ thử kiểm tra bằng command gcloud auth list
```
gcloud auth list
```

![](https://images.viblo.asia/14a5d958-ae36-491a-aa05-74f09da980e0.png)


OK vậy là mình đã configure xong **Google Cloud CLI**.

# 3. Tạo GKE Cluster
Bước tiếp theo, chúng ta sẽ tạo **GKE Cluster**.
Để tạo GKE cluster cực kì đơn giản, chúng ta chỉ cần chạy command: `gcloud container clusters create`. Mình sẽ tạo một cluster có tên là `k8s-demo` 
```
gcloud container clusters create k8s-demo
```

Khi bạn chạy command: gcloud container cluster mà không có parameter nào. Mặc định, GCP sẽ sử dụng các thông số sau:
> * Machine type: n1-standard-1
* Nodes: 3 
Tức là sẽ có 3 Instance n1-standard-1 được khởi tạo để chạy GKE cluster.
Trong thực tế, command này sẽ mất vài phút để hoàn thành.

![](https://images.viblo.asia/332d4a7c-693d-47f1-898e-7abd38713949.png)

Sau khi command này chạy xong, mình sẽ mở giao diện **Google Cloud Console** để kiểm tra sơ qua.
Đầu tiên là giao diện quản lý **Compute Engine**,  bạn sẽ thấy có 3 VM instance chạy. Khi nhấp một **instance** bất kì bạn sẽ thấy instance type là `n1-standard-1`.

![](https://images.viblo.asia/774ed093-d6e6-4468-8457-392137538abe.png)

Tiếp theo là giao diện quản lý **Kubernetes Engine,** bạn sẽ thấy tên cluster là **k8s-demo**, cluster size = 3 (tức là số node ở trong là cluster là 3)

![](https://images.viblo.asia/09d687d2-5c11-454c-a5b2-ce8c3d318f78.png)

Bạn cũng có thể sử dụng **gcloud** để kiểm tra. Ví dụ như bạn muốn kiểm tra số VM instance đang chạy.
```
gcloud compute instances list
```
![](https://images.viblo.asia/0d54f7dc-655a-41b0-af5e-0ea03df52474.png)



Vậy là mình đã tạo thành công một **GKE cluster**!!!

# 4. Deploy NGINX Web Server

Tiếp theo, mình sẽ deploy  NGINX vào GKE Cluster vừa tạo.
Mình sẽ tạo **Deployment Object** bằng command:

```
kubectl create deployment nginx --image=nginx --replicas=3
```

Deployment này sẽ chạy 3 replicas của NGINX Container.
Tiếp theo mình chạy command `kubectl get pods` để kiểm tra

```
 kubectl get pods
```

Tiếp theo, mình sẽ tạo một **Service object** để có thể truy cập Pod từ bên ngoài Cluster.
Trong trường hợp này, chúng ta sẽ sử dụng **LoadBalancer Service**. 
Để tạo LoadBalancer Service, mình sẽ dùng command:

```
kubectl expose deployment nginx --name=nginx --type=LoadBalancer --port=80 --target-port=80
```

Để xem thông tin về **LoadBalancer** trên, mình sẽ chạy command sau:
```
kubectl get svc nginx
```

Nếu bạn chạy command này sớm quá, Bạn sẽ thấy cột **EXTERNAL-IP** hiện là `<pending>`. 
Bạn sẽ phải chờ một vài phút. Sau đó bạn sẽ thấy một IP ở External IP

Okay, bạn sẽ mở browser và truy cập thử vào IP đó:

![](https://images.viblo.asia/621cf872-806b-4018-b0e7-4e1880292ea7.png)

Browser sẽ hiển thị: `<title> Welcome to Nginx! </title>`.
Okay, vậy là mình đã deploy thành công NGINX Web Server vào **GKE Cluster.**

# 5. Dọn dẹp Resources
Bước cuối cùng, Chúng ta sẽ xoá các resources mà chúng ta đã sử dụng trong hướng dẫn này
Đầu tiên chúng ta sẽ xoá **LoadBalancer Service,** bằng command sau:

```
kubectl delete service nginx
```

Sau khi command chạy xong, bạn có thể mở lại giao diện **Google Cloud Console** và kiểm tra giao diện **Load Balancing** thì sẽ thấy Load Balancer đã được xóa.

Tiếp theo, chúng ta sẽ xóa **GKE** Cluster bằng command:

```
gcloud container clusters delete k8s-demo
```

Cuối cùng, bạn có thể mở giao diện Google Cloud Console để kiểm tra: 
Đầu tiên là giao diện GCP Compute:

![](https://images.viblo.asia/644670b8-e17c-4319-ac6d-8f9982a138f2.png)

Sau đó là giao diện Kubernetes Engine:

![](https://images.viblo.asia/8bef6074-85e1-49ba-80be-536478673a95.png)

Cuôi cùng là Project Billing (Nếu bạn đang có Free Tier 300$ thì thoải mái)

![](https://images.viblo.asia/fb8e4c8e-171f-40e6-8665-28b4d15dd0e6.png)


# Kết thúc
Okay, vậy là chúng ta đã cài đặt thành công một Kubernetes Cluster trên **Google Kubernetes Engine**.

So với **AWS EKS**, mình thấy quá trình setup bằng **gcloud** nhanh hơn nhiều và document cũng viết dễ hiểu hơn nhiều.

Trong bài tiếp theo, mình sẽ cài đặt trên **Azure Kubernetes Service**.

### Hãy **Subscribe** Youtube Channel của mình và **Share** để ủng hộ mình nha ! :heart_eyes:
Nếu bạn muốn mình làm thêm content nào về Kubernetes thì cứ để lại comment, mình sẽ cố gắng làm sớm nhất có thể.


![](https://images.viblo.asia/9cbf7567-01e6-4dbe-9312-4dfd1035970c.jpg)
![](https://images.viblo.asia/5d618271-ff1e-4a72-b4c9-34526713502a.jpg)
![](https://images.viblo.asia/7665fb18-905b-40bd-a1d2-51ee0a1cf20a.jpg)

-----
* [Youtube](https://www.youtube.com/c/FullstacKAGE)