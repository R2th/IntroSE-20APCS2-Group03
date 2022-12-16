## Đặt vấn đề
Gần đây rất nhiều người hay nói đến Docker, Kubernetes (K8s) làm cho một thằng chỉ code backend như mình để ý. Sau một thời gian tìm hiểu và mất tiền cho AWS, cuối cùng cũng cho ra được bài viết dưới đây. 

Trong bài viết này mình sẽ nói về việc tự động deploy một ứng dụng lên AWS EKS (Elastic Kubernetes Service) sử dụng Gitlab-CI, docker images sẽ lưu trữ tại ECR( Amazon Elastic Container Registry ). 

Nội dung gồm các phần:
* Setup Kubernetes cluster
* Dockerize
* Push image to ECR
* Kubernetes deployments
* Auto deploy via Gitlab-CI
* Clean up


Các bước mình triển khai: tạo k8s cluster => dockerize => push image lên ECR => deploy app bằng EKS => Gitlab auto deploy. 
![](https://images.viblo.asia/5de598bc-ff7f-42c9-bda3-deb22b314951.png)


-----


## Setup Kubernetes cluster
Có nhiều cách để tạo một K8s cluster, bạn có thể vào AWS console để tạo thông qua giao diện trực quan. Còn với mình, mình sẽ tạo thông qua `eksctl`, đây là một CLI do AWS cung cấp.

Lưu ý một chút là do mình dùng macOS nên các câu lệnh dưới đây là cho macOS. Các bạn có thể truy cập [AWS guide](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html) để cài đặt cho hệ điều hành mình đang dùng.
### Install the AWS CLI
```
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg" sudo installer -pkg AWSCLIV2.pkg -target /
```

### Configure your AWS CLI credentials
Để sử dụng được CLI này bạn cần Access keys của AWS bao gồm access key ID và secret access key. Truy cập [IAM](https://console.aws.amazon.com/iam/home) của AWS để generate nhé.
Tiếp đó dùng lệnh:
```
aws configure
```
sau đó nhập thông tin Access keys đã lấy từ AWS. 

Ví dụ:
```
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: ap-southeast-1
Default output format [None]: json
```
### Install eksctl
Mình cài bằng brew
```
brew install weaveworks/tap/eksctl
```
Kiểm tra xem cài đặt thành công chưa bằng lệnh:
```
eksctl version
# 0.25.0
```
### Create Kubernetes cluster
Câu lệnh tạo một cluster như sau:
```
eksctl create cluster --name=app-demo
```
Trên đây mình tạo một cluster tên là `app-demo`. Nếu không có flag --node-type thì eksctl sẽ mặc định là `m5.large` với chi phí là $0.12 một giờ.
Nghe thì tưởng chừng ít nhưng bạn thử để  vài ngày xem, nó sẽ là: 

![](https://images.viblo.asia/bb0a5f49-03bf-4452-870a-b6c1b59bec1e.png)

Thời gian tạo cluster thường mất từ 15–20 phút. Bạn muốn theo dõi xem khi chạy lệnh `eksctl create cluster` thì AWS sẽ tạo những resource nào thì có thể truy cập vào http://console.aws.amazon.com/, tìm kiếm service tên là CloudFormation.
![](https://images.viblo.asia/4e0b15ba-cec8-4351-8858-0cd38283aaca.png)

Bạn đợi khi status chuyển sang CREATE_COMPLETE hoặc ở terminal hiển thị như sau có nghĩa là quá trình tạo đã xong.
```
[✔]  EKS cluster "app-demo" in "ap-southeast-1" region is ready
```
Sau khi xong, chạy lệnh:
```
kubectl get nodes
```
Kết quả:
![](https://images.viblo.asia/3746d661-84ab-4b38-bbd8-b197c2a14b65.png)

 là thành công.
 
 Nếu có vấn đề gì về credentials, bạn nên kiểm tra lại config aws bằng lệnh bên trên `aws configure`.
## Dockerize
Bước tiếp theo, ta cần dockerize ứng dụng. Tuỳ ứng dụng của bạn mà bạn viết Dockerfile cho phù hợp. Nếu bạn nào chưa có thì dùng app của mình. App viết bằng Vuejs, clone tại [link](https://gitlab.com/phuocvubk/vue-app).
```
# Dockerfile
FROM node:lts-alpine
# install simple http server for serving static content
RUN npm install -g http-server
# make the 'app' folder the current working directory
WORKDIR /app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
# install project dependencies
RUN npm install
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# build app for production with minification
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]

```
Build docker images bằng lệnh:
```
docker build -t demo-app .
```
Output của việc dockerize là bạn phải chạy được app qua docker. Ta chạy app bằng lệnh:
```
docker run -p 8080:8080 demo-app
```
Truy cập `localhost:8080` nếu app hiển thị bình thường là ta đã thành công.

## Push image to ECR
Bước tiếp theo ta sẽ push images lên ECR
Đầu tiên cần login:

```
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
```
Thay thế region, aws_account_id bằng thông tin tài khoản AWS của bạn.

Tiếp đến tạo một responsitory
```
aws ecr create-repository \
    --repository-name demo-app \
    --image-scanning-configuration scanOnPush=true \
    --region <region>
   ```
  Bạn cũng có thể tạo responsitory qua giao diện tại [ECR responsitory](https://console.aws.amazon.com/ecr/repositories)

Cuối cùng ta add tag và push image lên ECR via:
```
docker tag demo-app aws_account_id.dkr.ecr.<region>.amazonaws.com/demo-app:latest
docker push aws_account_id.dkr.ecr.<region>.amazonaws.com/demo-app:latest
```

Lưu ý rằng gói Free Tier sẽ free cho bạn 500Mb khi lưu trên ECR. Nếu tổng dung lượng các file images của bạn > 500Mb thì nên cân nhắc xoá bớt đi.
## Kubernetes deployments
Giờ là thời điểm để deploy app vào cluster ta đã tạo trước đó.
Tạo một file tên là `deployment.yaml` có nội dung như sau:
```
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo-app
  template:
    metadata:
      labels:
        app: demo-app
    spec:
      containers:
        - name: demo-app
          image: <aws_account_id>.dkr.ecr.<region>.amazonaws.com/demo-app:latest
          ports:
            - containerPort: 8080

```

Ta chỉ cần chú ý đến các mục chính:
+ Kind là Deployment
+ Tên của deployments này là demo-app
+ Số lượng replicas là 3.
+ Image được lấy từ `<aws_account_id>.dkr.ecr.<region>.amazonaws.com/demo-app

Tiếp đến chạy lệnh:

```
kubectl apply -f deployment.yaml
```
Kiểm tra bằng lệnh:
```
kubectl get deployments
```
Kết quả là như này là thành công:
    
  
Lúc này code đã được deploy lên các node, tuy vậy ta vẫn chưa truy cập được từ internet. Tiếp đến ta cần expose một External IP để truy cập vào app từ internet.  Sử dụng một ELB( Elastic Load Balancer). Tạo mới file `service.yml` như sau:
```
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: elb
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: demo-app
```
Lưu ý phần selector, điền vào đúng tên của app, chạy lệnh để tạo:
```
kubectl apply -f service.yaml
```
Kiểm tra thông tin ELB bằng lệnh:
```
kubectl get services elb
```
Kiểm tra tại `EXTERNAL-IP` ta sẽ có một `domain`. Truy cập `domain` để kiểm tra xem app đã được deploy chưa.

![](https://images.viblo.asia/97467fef-e128-49a7-b704-6e001a21ffae.png)

##  Auto deploy via Gitlab-CI
### Tạo file .gitlab-ci.yml
Sau tất cả ta đã deploy được một ứng dụng lên EKS. Bước tiếp theo là cần tự động deploy khi có commit mới, việc này ta đã quen ở bài trước. Đó là sử dụng Gitlab-CI. Ngoài Gitlab-CI thì có rất nhiều tool phục vụ việc này như Jenkins, Github actions.

 Tạo mới file `.gitlab-ci.yml` 
```
variables:
  REPOSITORY_URL: <aws_account_id>.dkr.ecr.<region>.amazonaws.com
  REGION: <region>

stages:
  - build
  - deploy

build:
  stage: build
  script:
    - docker build -t demo-app -f ./Dockerfile .
    - docker tag demo-app $REPOSITORY_URL/demo-app:${CI_COMMIT_SHORT_SHA}
    - docker push $REPOSITORY_URL/demo-app:${CI_COMMIT_SHORT_SHA}
  only:
    - master

deploy:
  stage: deploy
  environment: production
  script:
    - kubectl set image deployment/demo-app demo-app=$REPOSITORY_URL/demo-app:${CI_COMMIT_SHORT_SHA} --record
  ```
  
Giải thích:
+ Trong file này mình định nghĩa ra 2 stage: build và deploy. Stage build có nhiệm vụ dockerize và push image lên ECR, còn stage deploy có nhiệm vụ cập nhật lại image đó lên các node của k8s
+ Để chạy được các dòng lệnh này, Gitlab dùng Runner để thực hiện. Mình sẽ nói kỹ hơn về Runner ở phần dưới đây.
### Gitlab-runner
Hiểu nôm na là khi bạn commit  code lên gitlab mà trong thư mục gốc có file .gitlab-ci.yml, thì Gitlab-CI sẽ được trigger. Gitlab-CI sẽ sử dụng Runner (được cài đặt trong mục Setting => CI-CD => Runner) để chạy các dòng lệnh trong file .gitlab-ci.yml.
    ![](https://images.viblo.asia/4682259e-3044-4d02-88c1-23b29f56b6c5.png)

Có 2 loại Runner là: Share Runners và Specifics Runner
#### Share Runners
Là runner đã cài đặt sẵn các chương trình ví dụ docker, shell, kubernetes ... mà mọi người đều có thể dùng được. Chỉ cần chọn Enable shared Runners như hình bên trên.
    
Ưu điểm: Không cần cài đặt gì thêm, plug and play.
    
Nhược điểm: Mình không thể custom cho Runner này, ví dụ muốn cài thêm biến môi trường chẳng hạn.
####  Specifics Runner
Có 2 cách để setup Specifics Runner là cài tự động và thủ công. Cách cài tự động là cài trên k8s mình sẽ nói sau, trong bài này mình sẽ chỉ các bạn cách cài đặt thủ công trên máy local. 

 Output của bước này là khi Gitlab-CI chạy nó sẽ chạy con runner lên chính con máy của các bạn ( các bạn cũng có thể cài gitlab-runner lên một con server bất kỳ). Do các biến môi trường đã cài sẵn trên máy các bạn rồi nên nhìn file .gitlab-ci.yml rất gọn.
    ![](https://images.viblo.asia/46f2819e-584d-4cbe-b5fb-0018b4c0ed00.png)

    
Các bước cài đặt:
+ Tuỳ theo hệ điều hành, bạn chọn cách cài đặt phù hợp tại [link](https://docs.gitlab.com/runner/install/)
+ Khi cài xong bạn cần register với gitlab bằng lệnh
    ```
    gitlab-runner register
    ```
+  Làm theo [hướng dẫn](https://docs.gitlab.com/runner/register/). Lưu ý rằng gitlab-runner có nhiều loại executor (docker, k8s, shell, ssh ..) nhưng theo cách mình đang làm thì bạn chọn là `shell`.
Sau đó chạy gitlab-runner lên:
```
gitlab-runner run
```
Bạn vào Setting => CI-CD => Runners để kiểm tra, nếu có chấm màu xanh là thành công
    ![](https://images.viblo.asia/730e6dc2-8316-4acd-9b8f-c76adb4459b8.png)

**Lưu ý quan trọng**: bạn ấn vào hình cái bút để edit runner và tick vào **Run untagged jobs**. Nếu không tick chọn vào đây, thì executor chỉ chạy với các stage có cùng tag với nó. Mà ở trên file .gitlab-ci.yml mình không định nghĩa cho các stage, nên kết quả là executor này sẽ không chạy.
    
Khi có một commit mới, gitlab-CI sẽ trigger đến gitlab-runner trên máy bạn và chạy các script trong file .gitlab-ci.yml
![](https://images.viblo.asia/6892665f-4dab-4701-8101-e7d3d3dc2230.png)

Trong file gitlab-ci.yml bạn để ý sẽ thấy có biến {CI_COMMIT_SHORT_SHA}. Đây là ID của một commit, ta dùng short ID của commit để đánh tag cho image ( thay vì image nào cũng là latest). Một commit đươc push lên sẽ tương ứng có 1 file docker image được sinh ra. Việc này sẽ phục vụ cho việc rollback nếu có lỗi xảy ra.

Sửa code một chút rồi commit lại để tận hưởng thành quả nhé.
    ![](https://images.viblo.asia/aae9535c-9498-48a3-856c-b78f64dd14f4.png)


## Cleaning Up
Sau khi đạt được thành quả, bạn có thể ngắm nhìn một lúc, take a screenshot nhưng đừng quên xoá nó đi nếu không có ý định sử dụng lâu dài.
```
eksctl delete cluster --name=demo-app
```
## Kết luận
Bài viết trên đây là một hành trình đến Docker, k8s, AWS với học phí 21.53$ của mình. Các bạn có thắc mắc gì thì comment nhé.
Tài liệu tham khảo:
+ https://kubernetes.io/docs/tutorials/stateless-application/expose-external-ip-address/
+ https://kubernetes.io/docs/concepts/workloads/controllers/deployment/