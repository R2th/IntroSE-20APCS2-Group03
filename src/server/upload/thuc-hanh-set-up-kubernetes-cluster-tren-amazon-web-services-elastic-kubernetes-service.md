![](https://images.viblo.asia/a016a711-0686-4183-8c69-5a2c163dfc37.jpg)

Article đi kèm với **Youtube Video**. Mong các bạn **Subcribe** và **Share** để giúp mình có động lực hơn nữa nha :laughing:
Nếu bạn cảm thấy bài blog có ích hãy Vote nha!

Mấy video đầu tiên thường nhiều lỗi nên mình rất mong các bạn góp ý để mình cải thiện nha.

{@youtube: https://www.youtube.com/embed/iIj2im5evgc}


-----

Hôm nay, mình sẽ hướng dẫn cài đặt một **Kubernetes Cluster** đơn giản trên **AWS EKS** (**Elastic Kubernetes Service**). Sau đó, mình sẽ deploy **NGINX Web Server** trên cluster này.

Các command mà mình sử dụng trong video này được chạy trong môi trường máy ảo **Vagrant Ubuntu 18**.
Tuy nhiên, bạn hoàn toàn có thể tham khảo để cài đặt trên các môi trường khác Macbook và Windows.

Amazon cũng có document hướng dẫn trên trang chủ nhưng viết cách hơi rườm rà và khó hiểu. Bạn có thể tham khảo [ở đây](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html).

Elastic Kubernetes Service (EKS) là một dịch vụ trên AWS để deploy, quản lý và scale các application chạy bằng container sử dụng Kubernetes. Nếu bạn hoàn toàn chưa biết gì về Kubernetes, bạn có thể đọc [bài đầu tiên](https://viblo.asia/p/ly-thuyettim-hieu-co-ban-ve-kubernetes-cac-thanh-phan-chinh-trong-mot-kubernetes-cluster-va-cac-khai-niem-co-ban-kem-video-WAyK8D7EKxX) của mình hoặc thử google về Kubernetes nha .

Okay vậy chúng ta hãy cùng nhau bắt đầu !!!


-----

# Trước khi bắt đầu
Để sử dụng AWS EKS, bạn sẽ cần phải chuẩn bị và cài đặt những thứ sau:

* Tài khoản AWS
* kubectl
* AWS CLI
* eksctl

##  Tài khoản AWS
Bước đầu tiên mà bạn cần làm là đăng ký một tài khoản AWS mới.
Nếu bạn đã có tài khoản AWS thì bạn có thể sử dụng luôn.
Để tạo tài khoản AWS, bạn có thể đăng nhập vào [trang chủ](https://aws.amazon.com/vi/) của **Amazon Web Services** và đăng ký.

![AWS](https://images.viblo.asia/946cf6b2-5891-4434-b824-e6f120719520.png)

**Có một điểm duy nhất mà bạn cần lưu ý**:  
Khi đăng ký thì sẽ cần điền ***thông tin thẻ ghi nợ quốc tế (Credit Card hay Debit Card).***  
Tuy nhiên, bạn cũng đừng lo lắng quá bởi vì bạn sẽ chỉ bị tính phí với các dịch vụ mà bạn sử dụng. 
Nếu bạn không dùng gì cũng bạn sẽ không mất tiền.

**Tài khoản mới còn được sử dụng Free Plan nên cứ thoải mái lên nhé.**

## kubectl

**kubectl** là  command line tool để thao tác, giao tiếp với kubernetes cluster.
Để cài đặt **kubectl**, bạn có thể làm theo hướng dẫn trên [document của AWS](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html). (Bạn cũng có thể làm theo hướng dẫn trên[ trang chủ của kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl/))

Nếu làm theo hướng dẫn trên **AWS EKS** thì sẽ như sau:

Đầu tiên là tải Binary File **kubectl** từ **Amazon S3**

``` 
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.18.8/2020-09-18/bin/linux/amd64/kubectl
```

Tiếp theo, thêm quyền thực thi cho binary file kubectl sử dụng command chmod.
```
chmod +x ./kubectl
```
Trong hướng dẫn của AWS, thì họ hướng dẫn cài đặt kubectl vào HOME directory, nhưng mình không thích cách cài đặt này lắm. Thay vào đó mình sẽ cài vào `/usr/local/bin` .  (Bởi vì mặc định` /usr/local/bin` đã nằm trong biến môi trường **PATH** rồi). Để dời vào `/usr/local/bin` thì sẽ cần **sudo**.
```
sudo mv ./kubectl /usr/local/bin
```
Cuối cùng, để kiểm tra, mình sẽ chạy `kubectl version`:
```
kubectl version --short --client
```
Okay, vậy là chúng ta đã cài đặt xong **kubectl**.

## AWS CLI
Mặc dù bạn có thể sử dụng giao diện quản lý AWS để tạo EKS Cluster, nhưng tốt nhất bạn hãy tập sử dụng AWS CLI.
Để cài đặt phiên bản AWS CLI mới nhất bạn có thể tham khảo document hướng dẫn trên AWS.
(Tham khảo: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.htmll).

Cài đặt khá đơn giản, đầu tiên là tài file zip của AWS CLI sau đó giải nén và cài đặt.
```
 curl https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscliv2.zip
 unzip awscliv2.zip
 sudo ./aws/install
```

Để kiểm tra, sử dụng command aws version
```
 aws --version
```
## eksctl
Bạn có thể tham khảo cách cài đặt trên [trang chủ](https://eksctl.io/) của eksctl
**eksctl** là một tiện ích command line để tạo và quản lý Kubernetes Cluster trên **Amazon EKS**.

Để cài đặt, mình sẽ tải phiên bản **eksctl** mới nhất bằng command sau:]
```
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
```

Tiếp theo  là di chuyển **eksctl** binary file vào `/usr/local/bin`.
```
mv /tmp/eksctl /usr/local/bin
```

Cuối cùng, để kiểm tra xem, mình sẽ chạy thử
```
eksctl version
```

**Sau khi đã chuẩn bị xong nếu bạn sẽ chạy đc như sau thì bạn có thể làm tiếp bước tiếp theo:**

![](https://images.viblo.asia/fbf87bf7-257e-496f-93f4-3fd1ec5efaf7.png)


-----

# 1. Configure AWS CLI
Để configure **AWS CLI**, thì bạn sẽ cần phải chuẩn bị 3 thứ:
* Access Key ID 
* Secret Access Key
* IAM Permission

IAM (Identity and Access Management): được sử dụng để quản lý quyền truy cập các resources trên AWS và xác thực người dùng

Để setup 3 thông tin này mình mở giao diện AWS Management Console. 
Đầu tiên mình sẽ cần phải tạo một **user** mới.

![](https://images.viblo.asia/498cad3b-6de4-4aa3-a0e1-5bf25fdcf030.png)


Ở thanh sidebar bên trái, click vào "Users" > Sau đó click "Add user"
Username mình sẽ lấy là k8s-demo và phần access type thì chọn Programmatic access 

![](https://images.viblo.asia/c8ecf4ff-d8f8-4684-a5d7-16889895e202.png)

Để làm đơn giản nội dung, mình sẽ gán quyền **Administrator Access** cho User này 
**Lưu ý**: Đối với môi trường **production** thì bạn không nên làm gán quyền admin như này mà phải giới hạn permission của từng User.

![](https://images.viblo.asia/5418a3f4-ad84-48d2-835e-26a4ab32df2c.png)

Sau khi hoàn thành, bạn sẽ có **Access Key ID** và **Secret Access Key**

![](https://images.viblo.asia/cba133d2-7365-4250-b88a-936dfea1d5de.png)

Tiếp theo mình sẽ chuyển qua Terminal để chạy command aws configure
```
aws configure
```
![](https://images.viblo.asia/99aa7ce3-1aff-48e5-98a0-634f9a5462bf.png)

- Đầu tiên là nhập **Access Key ID**, sau đó là **Secret Access Key**
- Mình đang ở **Tokyo** nên phần **Default Region** thì mình sẽ điền là **ap-northeast-1** tương ứng với Tokyo. Nếu bạn ở VN thì bạn cũng có thể dùng region này.
- Output Format thì mình sẽ dùng **json**.

Để kiểm tra xem mình configure thành công hay chưa thì mình sẽ sử dụng command:
```
aws eks list-clusters
```

OK vậy là mình đã configure xong **AWS CLI**.

# 2. Tạo EKS Cluster với managed EC2 Nodes
Trước khi tạo **EKS Cluster**, mình cần phải lưu ý các bạn một chút
>  AWS sẽ tính phí khoảng 0,3$/mỗi giờ cho mỗi EKS cluster (Thực tế iền phí sẽ thay đổi tùy thuộc vào số lượng và type của **ec2 node**  chạy trong cluster). Sau khi làm theo video này bạn hãy nhớ xóa hết tất cả các resources đã sử dụng trên AWS để tránh bị tính phí.

**Amazon Web Services** cung cấp ba option để deploy Kubernetes vào EKS:
* Option 1: Fargate - Linux
* Option 2: Managed Node - Linux
* Option 3: Self-Managed Node - Windows

Trong video này, mình sẽ sử dụng **Option 2**.

Để tạo EKS cluster, trước tiên chúng ta sẽ phải tạo **SSH key** để có thể access vào **EC2 Node** trong Cluster khi cần thiết
(Đây cũng là **best practices** mà **Google** khuyên các bạn làm theo). 

Mình sử dụng lệnh `create-key-pair`:
```
aws ec2 create-key-pair --key-name k8s-demo --query 'KeyMaterial' --output text> k8s-demo.pem
```

Command này sẽ tạo một KeyPair có tên là **k8s-demo** và sẽ lưu kết quả vào **k8s-demo.pem** file.

File **k8s-demo.pem** sẽ trông tương tự như sau:

![](https://images.viblo.asia/2e5f43d3-54b2-4cef-8d19-647b62125978.png)

Tiếp theo, mình sẽ thay đổi permission của file **k8s-demo.pem** bằng command `chmod`
```
chmod 400 k8s-demo.pem
```

Để tạo EKS  Cluster và các EC2 Node mình sử dụng command sau:
```
eksctl create cluster --name k8s-demo --region ap-northwest-1 --nodegroup-name k8s-demo --nodes 2 --ssh-access --ssh-public-key k8s-demo --managed
```
Khi bạn chạy command này, thì eksctl sẽ sử dụng **AWS CloudFormation** để tạo các infrastructure cần thiết và setup **Master Node** (Control Plane). Khi **Master Node** đã đi vào hoạt động, thì `eksctl` sẽ  tiếp tục tạo một Node Group để chạy các EC2 Instance. Sau đó các EC2 Instance này sẽ được config và tự động tham gia vào cluster.

Mặc định: `eksctl` sẽ tạo 2 **Worker Node** `m5.large` để tạo EKS Cluster (`m5.large` khá rẻ và phổ biến)
**Command này chạy khá lâu, sẽ tốn tầm 10-15 phút. **

Trong quá trình chờ, Bạn có thể sử dụng giao diện quản lý AWS CloudFormation kiểm tra trạng thái.
![](https://images.viblo.asia/dcadb789-5454-4c0d-95cb-d251a48f8e8a.png)

Sau khi thành công mình sẽ có một **EKS Cluster** có tên là **k8s-demo**.
![](https://images.viblo.asia/c1f54c1a-09ad-46b5-9879-30ccf26e0afe.png)


Để kiểm tra,, mình sẽ sử dụng kubectl:
```
kubectl cluster-info
```
![](https://images.viblo.asia/6c280ad1-80fa-4908-801f-d498235d9794.png)

Vậy là mình đã tạo thành công một **EKS cluster**!!!


# 3. Deploy NGINX Web Server vào EKS Cluster

Tiếp theo, mình sẽ deploy **NGINX Web Server** vào **EKS Cluster** mình vừa tạo.
Để deploy, đầu tiên mình sẽ chạy command sau:
```
kubectl create deployment nginx --image=nginx
```

Deployment này mặc định sẽ chỉ chạy 1 Pod NGINX. Mình sẽ scale lên thành 5 Pod NGINX như sau:
```
kubectl scale deployments nginx --replicas=5
```

![](https://images.viblo.asia/5ebbeb92-778b-4c31-86a8-3ae938a566c4.png)


Để có thể truy cập **NGINX** từ bên ngoài EKS cluster, chúng ta sẽ phải deploy một **LoadBalancer** Service vào cluster bằng command sau:
```
kubectl expose deployments/nginx --type=LoadBalancer --port=80
```

> **LoadBalancer Service**  sẽ giao tiếp với AWS API để tạo một **Elastic Load Balancing** mới và tự động hướng traffic tới 5 Pod NGINX của chúng ta.

Để xem thông tin về **LoadBalancer** trên, mình sẽ chạy command sau:
```
kubectl get service nginx
```

Nếu bạn chạy command này sớm quá, Bạn sẽ thấy cột **EXTERNAL-IP** hiện là `<pending>`. 
Bạn sẽ phải chờ một vài phút để [ELB](https://aws.amazon.com/vi/elasticloadbalancing/) được tạo. Sau đó bạn sẽ thấy một URL khá dài như sau (URL của bạn sẽ khác so với hình nhé)
![](https://images.viblo.asia/96781a7f-cfba-492f-acdd-6419e87de993.png)


Đây sẽ là URL để bạn truy cập **NGINX Web Server** mà bạn vừa deploy.
Okay, mình sẽ mở browser và truy cập thử vào URL đó:

![](https://images.viblo.asia/621cf872-806b-4018-b0e7-4e1880292ea7.png)

Browser sẽ hiển thị: `<title> Welcome to Nginx! </title>`.
Okay, vậy là mình đã deploy thành công NGINX Web Server vào **EKS Cluster.**

# 4. Dọn dẹp AWS Resources
Bước cuối cùng, để tránh bị mất phí sử dụng, mình sẽ phải xóa các **AWS resources** đã sử dụng. 

Đầu tiền là xóa **EKS Cluster** bằng command:

```
eksctl delete cluster --region=ap-northeast-1 --name=k8s-demo
```

> Thực tế khi chạy command này sẽ tốn tầm 5 phút.

Và, tiếp theo là xóa **EC2 KeyPair** **(EC2 Keypair** thì không tốn tiền những mà mình cũng sẽ xóa luôn)
```
aws ec2 delete-key-pair --key-name k8s-demo
```

Sau khi xóa, thì mình sẽ vào **AWS Management Console** để kiểm tra 
- các EC2 Instance đã dừng hoạt động hay chưa (Terminated Status)
- EKS xem cluster đã được xóa hay chưa
- Cuối cùng là vào AWS Cost Explorer để check. 0.33$ là lần chạy thử EKS Cluster trước của mình.
Nếu các bạn follow video này thì cũng sẽ chỉ mất tầm 0.33$
**(Nếu bạn đang còn Free Tier thì không cần lo)**

![](https://images.viblo.asia/be2533f2-35d0-4147-83cb-979a99d28426.png)



# Kết thúc
Okay, vậy là chúng ta đã cùng nhau cài đặt một Kubernetes Cluster trên **Elastic Kubernetes Service (EKS)**.
Đối với những bạn mới bắt đầu sử dụng **AWS** thì mình thấy để deploy một Kubernetes Cluster trên **Amazon EKS** khá rắc rối vì có nhiều thứ phải làm. 

Nếu bạn mới bắt đầu tìm hiểu Kubernetes, thì bạn có thể thử cài đặt trên localhost bằng **minikube**. 
Khi bạn đã sẵn sàng sử dụng Kubernetes trong môi trường production giải pháp tối ưu nhất là sử dụng Kubernetes Services từ các Cloud Provider.

Trong bài tiếp theo, mình sẽ tiếp tục hướng dẫn cài đặt Kubernetes Cluster trên  hai Cloud Provider khác là - **Microsoft Azure** và **Google Cloud Platform**

### Hãy **Subscribe** Youtube Channel của mình và **Share** để ủng hộ mình nha ! :heart_eyes:
Nếu bạn muốn mình làm thêm content nào về Kubernetes thì cứ để lại comment, mình sẽ cố gắng làm sớm nhất có thể.


![](https://images.viblo.asia/9cbf7567-01e6-4dbe-9312-4dfd1035970c.jpg)
![](https://images.viblo.asia/5d618271-ff1e-4a72-b4c9-34526713502a.jpg)
![](https://images.viblo.asia/7665fb18-905b-40bd-a1d2-51ee0a1cf20a.jpg)

-----
* [Youtube](https://www.youtube.com/c/FullstacKAGE)