![](https://images.viblo.asia/3e7b9331-8308-437b-912b-70d59c8bec82.jpg)


Article đi kèm với **Youtube Video** của mình. Mong các bạn **Subcribe** và **Share** để giúp mình có động lực hơn nữa nha :laughing:
{@youtube: https://www.youtube.com/embed/kFDyPt0QMRQ}

-----

Hôm nay thì mình sẽ tiếp tục hướng dẫn cài đặt một **Kubernetes Cluster** trên **Microsoft Azure - Azure Kubernetes Service** (**AKS**).
Sau đó, mình sẽ deploy **Sample Application**  trên AKS cluster.

Các command mà mình sử dụng trong video này được chạy trong môi trường máy ảo **Vagrant Ubuntu 18**.
Tuy nhiên, bạn hoàn toàn có thể tham khảo để cài đặt trên các môi trường khác Macbook và Windows.

Okay vậy chúng ta hãy cùng nhau bắt đầu !!!

-----

# 1. Cài đặt Azure CLI
Bước đầu tiên,  là cài đặt **Azure CLI** (CLI - Command Line Interface). 

Link hướng dẫn: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli.

Vì mình cài đặt ở máy ảo **Vagrant Ubuntu** nên mình sẽ chọn **“Install - Linux with apt”**.

Microsoft cung cấp cung cấp một script để tự động  cài đặt Azure CLI chỉ bằng một command. 
```
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

Sau khi cài đặt xong, để kiểm tra bạn có thể sử dụng command:
```
az version
```

-----

# 2. Configure Azure CLI
Trước khi configure **Azure CLI**, bạn sẽ cần phải đăng ký tài khoản **Microsoft Azure**.  
Trong quá trình đăng ký sẽ cần nhập thông tin thẻ credit hoặc debit card. 

Bạn sẽ được Free **150$** để tìm hiểu **Microsoft Azure** trong vòng 1 tháng.

Ok, Để configure Azure CLI với tài khoản bạn vừa tạo. Bạn sẽ chạy command:
```
az login
```

![](https://images.viblo.asia/a9f5d2e2-efc3-4496-8b79-0d06d0803d14.png)

Terminal sẽ hiển thị một đoạn text bao gồm **một URL** và **một đoạn code**. 
Trong đó URL sẽ là:  https://microsoft.com/devicelogin

Sau khi mở URL, browser sẽ yêu cầu bạn nhập một đoạn code (Bạn chỉ cần copy paste)

Bạn sẽ dùng tài khoản vừa tạo để đăng nhập. 
Sau khi đăng nhập thành công bạn có thể đóng browser.

Terminal sẽ hiện một số thông tin như này tức là bạn đã configure thành công.
![](https://images.viblo.asia/ed8b22d4-22ef-4a1e-be05-74533956baf1.png)


# 3. Tạo AKS Cluster
Để tạo một **AKS Cluster**, đầu tiên chúng ta sẽ phải tạo **Azure Resource Group**.

**Resource Group** được sử dụng để deploy và quản lý các Resources trên Azure.

Để tạo một Resource Group, bạn sử dụng command:
```
az group create --name k8sResourceGroup --location japanwest
```
Location là vị trí mà metadata của Resource Group được lưu giữ.
Vì mình ở Nhật Bản nên location mình sẽ lấy là **japanwest**.

Mình sẽ tạo một Resource Group có tên là **k8sResourceGroup**.

Bạn có thể mở giao diện quản lý của Azure để kiểm tra Resource Group vừa tạo.
![](https://images.viblo.asia/bdedea94-9214-4cd8-afad-1e12b47187ff.png)

![](https://images.viblo.asia/cc43302d-b387-43b5-ac21-cd167cd6e617.png)

Tiếp theo, chúng sẽ tạo **AKS Cluster** bằng command:
```
az aks create --resource-group k8sResourceGroup --name k8sCluster --node-count 3 --generate-ssh-keys
```
**--node-count**: 3 (Số instance chạy trong cluster)

Chúng ta cần chờ  **3-5 phút** để command chạy xong.

Sau khi thành công, terminal sẽ hiển thị thông tin của cluster dưới dạng JSON.

![](https://images.viblo.asia/957ddabf-290c-4329-ae01-020536e2f00c.png)

Cuối cùng, để thao tác với Kubernetes Cluster chúng ta sẽ cài **kubectl** bằng command:
```
sudo az aks install-cli
```
**Lưu ý**: command này cần quyền sudo

Để configure **kubectl** với AKS Cluster, chúng ta sẽ chạy command:
```
az aks get-credentials
```

**(Bạn xem youtube để biết cách kiểm tra trên giao diện của Azure)**

Sau configure thành cộng, Để kiểm tra, chúng ta sẽ dùng command:
```
kubectl get nodes
```

Terminal hiển thị như này tức là đã thành công.
![](https://images.viblo.asia/35c04803-b11c-494d-abdc-9c29e759c99c.png)

Chúng ta có thể làm bước tiếp theo.

# 4. Deploy Sample Application: azure-voting-app-redis

Tiếp theo, Mình sẽ deploy một sample application có tên là **azure-voting-app-redis**.
(Đây là application được sử dụng trong tutorial của **Azure Kubernetes Service**).

Github: https://github.com/Azure-Samples/azure-voting-app-redis

Trước khi deploy lên **Kubernetes Cluster**, chúng ta phải chạy thử ở môi trường development xem application hoạt động như thế nào.

Đầu tiên, chúng ta sẽ clone repository:
```
git clone https://github.com/Azure-Samples/azure-voting-app-redis.git
```

Trước khi deploy lên Kubernetes Cluster, mình sẽ sử dụng `Docker-compose` để kiểm tra application trước. 
Docker-compose của **azure-voting-app** sẽ có 2 service là **azure-vote-back** và **azure-vote-front**. 

Để chạy file docker-compose này mình sẽ dùng command: 
```
docker-compose up -d
```

Sau khi chạy thì docker sẽ tải docker image về máy của bạn, tùy vào tốc độ network của thì quá trình tải sẽ tồn từ 3-5 phút.

![](https://images.viblo.asia/faa909a6-1289-4b8f-b402-dcb44c2aa217.png)

Ở phần azure-vote-front được setup ports là **8080:80**. Có nghĩa là để truy cập vào **azure-vote-front** chạy trên port 80, mình sẽ phải sử dụng port **8080** trên máy ảo Vagrant.

Máy ảo Vagrant của mình có IP: **192.168.33.10**
Vì vậy mình sẽ truy cập vào: **192.168.33.10:8080**
Ok Vậy đây là giao diện của azure-voting-app
![](https://images.viblo.asia/14f37453-9123-4a0b-837c-5264fad605dc.png)

Tiếp theo mình sẽ kiểm tra Docker images hiện có trên máy ảo Vagrant của mình.
Chúng ta sẽ có một image là: mcr.microsoft.com/azuredocs/azure-vote-front. 
![](https://images.viblo.asia/82091aa7-36d5-45b9-8987-be0fb1738938.png)

Sau khi kiểm tra ở môi trường development không có vấn đề gì. 
Mình sẽ tắt `docker-compose` bằng command:
```
docker-compose down
```

Để deploy **azure-voting-app** lên AKS cluster, thì chúng ta sẽ tạo một **Azure Container Registry** (bạn cũng có thể dùng Docker Hub)
Chúng ta chạy command sau:
```
az acr create --resource-group k8sResourceGroup --name phulek8s --sku Basic
```

**Azure Container Registry** có 3 tier là Basic, Standard và Premium. Basic là tier rẻ nhất phù hợp sử dụng với development và production quy mô nhỏ.

Trong đó có 2 thông tin quan trọng là SKU và LoginServer. 
![](https://images.viblo.asia/67815fa1-75ce-4306-8563-ae90a19a67be.png)

**Login Server** sẽ được sử dụng khi bạn `pull` hoặc `push` Docker Image nha.

**Bạn có thể kiểm tra trên giao diện Azure.  (Xem Youtube)**

Để configure **docker** với **Azure Container Registry**, bạn sử dụng command:
```
az acr login --name phulek8s
```
Terminal hiển thị Login Succeed tức là ok nha.

**Có một điểm cần lưu ý là:** Tại thời điểm mình tạo **AKS Cluster** ở bước 3, mình chưa chỉ định **Azure Container Registry** nào. Do đó, chúng ta cần chạy command sau để configure **AKS Cluster** với **Azure Container Registry** vừa tạo.
```
az aks update --name k8sCluster --resource-group k8sResourceGroup --attach-acr phulek8s
```

Sau khi tạo và configure **Azure Container Registry** với **AKS Cluster**.  Chúng ta cần push docker image lên **Azure Container Registry**.
Đầu tiên là tạo tag mới cho docker image auzre-vote-front sử dụng command: 
```
docker tag mcr.microsoft.com/azuredocs/azure-vote-front:v1 phulek8s.azurecr.io/azure-vote-front:v1
```
Sau đó kiểm tra lại bằng 
```
docker images
```
![](https://images.viblo.asia/70556c44-b004-4b73-9497-8ba1e0456d56.png)


Tiếp theo sử dụng
```
docker push phulek8s.azurecr.io/azure-vote-front:v1
```
để push lên Azure Container Registry.
Thực tế `docker push` sẽ tốn tầm 3-5 phút.

Sau khi push thành công, bạn có thể trên giao diện quản lý Azure (Xem Youtube)
Ngoài ra, bạn cũng có thể sử dụng **Azure CLI** để kiểm tra:
```
az acr repository list --name phulek8s --output table
```
Sau khi đã push **azure-vote-front** Docker Image lên **Azure Container Registry**, chúng ta sẽ deploy vào AKS Cluster. 
Trong  **azure-voting-app-redis**, chúng ta sẽ có một file có tên là: **azure-vote-all-in-one-redis.yaml**.
Đây là **manifest file** của Kubernetes (nói đơn giản là config file để deploy vào b). 

Trong hướng dẫn hôm nay chúng ta sẽ sửa Docker Image trong  định nghĩa Deployment object của **azure-vote-front**  thành login Server của Azure Container Registry.

![](https://images.viblo.asia/e16ccaaf-04a4-4882-93cf-a9dbcefd66fa.gif)


Sau khi thay đổi xong, để deploy thì chúng ta sẽ dùng `kubectl apply`:
```
kubectl apply -f azure-vote-all-in-one-redis.yaml
```
Terminal sẽ hiển thị 4 Kubernetes Object được tạo. **2 Deployment** và **2 Service**.
![](https://images.viblo.asia/79f631ec-e9b1-4229-bf0e-c0ea64437e54.png)

Để kiểm tra, mình sẽ sử dụng:
```
kubectl get pods
```
Sau tầm 1-2 phút thì Pods sẽ có Status là **Running**.
![](https://images.viblo.asia/b3073562-936a-4684-b134-86e60fa01365.png)

Để trùy cập Kubernetes Cluster từ bên ngoài, bạn sẽ cần một **Service Object** có type là **LoadBalancer**. Mình sẽ kiểm tra bằng:
```
kubectl get svc
```
![](https://images.viblo.asia/536ea5b0-cc36-42e8-800c-250023a2be07.png)

Bạn sẽ thấy có một Service có tên **azure-vote-front**,  copy **EXTERNAL-IP** và mở thử trên Browser.

![](https://images.viblo.asia/67a4c5d2-2364-4fce-aea9-f4c9447116f2.gif)


Vậy là, chúng ta đã deploy thành công **azure-voting-app-redis** lên **AKS Cluster**.


# 5. Dọn dẹp Resources
Và bước cuối cùng, là xóa tất cả các **Azure Resources** đã sử dụng để tránh bị tính phí.
Chúng ta sẽ dùng command
```
az group delete --name k8sResourceGroup --yes
```
Các bạn có thể thêm option: **--wait** để không phải chờ.

Sau khi command chạy xong bạn có thể mở giao diện quản lý Azure và kiểm tra. **(Xem youtube)**
* Resource Group
* Cost Management

# Kết thúc


Nếu bạn có bất kì câu hỏi nào hãy để lại comment nha.

Hẹn gặp lại các bạn ở bài blog tiếp theo.


![](https://images.viblo.asia/9cbf7567-01e6-4dbe-9312-4dfd1035970c.jpg)
![](https://images.viblo.asia/5d618271-ff1e-4a72-b4c9-34526713502a.jpg)
![](https://images.viblo.asia/7665fb18-905b-40bd-a1d2-51ee0a1cf20a.jpg)

-----
* [Facebook](https://www.facebook.com/trendfxdojo)
* [Youtube](https://www.youtube.com/channel/UCRWDR9vuoRny63i464-pZrg)