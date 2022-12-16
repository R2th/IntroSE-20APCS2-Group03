### 1. Mô Hình  

![](https://images.viblo.asia/5cb6084e-1bee-4ea9-97a3-4933e076264c.png)

 Sơ lược về luồng hoạt động của mô hình này : 
* Đầu tiên khi developer push code lên repository trên CodeCommit (1) -> CodeBuild sẽ tạo một bản build mới nhất (Image)  (2)  -> Push Image mới nhất sang Elastic Container Registry (ECR) để lưu lại (3)  -> CodeDeploy sẽ triger để build Image Container chạy trên ECS (4).
* Giữa Stage (3) và Stage (4) mình sẽ implement thêm 1 stage APPROVE MANUAL thì mới Deploy lên ECS.

![image.png](https://images.viblo.asia/b0e9c176-e503-48b7-8fef-980646353d37.png)

### 2. AWS CI/CD Service:
![image.png](https://images.viblo.asia/68acc42d-5ec5-46a3-8207-0c4bd5d9d0f9.png)

CI (Continuous Integration) là quá trình tích hợp mã nguồn liên tục lên kho lưu trữ như (GitHub, Bitbucket, v.v.) và mọi tích hợp này đều được build tự động có thể chạy test để phát hiện lỗi nếu có. 
Thực tế nó sẽ như thế này  :
* Developer tạo Pull Request lên Repository trên github
* Con CI nó sẽ luôn (polling) hay giám sát Repository này xem có sự thay đổi code không ( nếu có thì có sẽ tự động lấy source code về server riêng của nó để Build lên -> có thế chạy luôn Unit Test hoặc Loadtest nếu cần).
* Nếu Build thành công sẽ đưa ra kết quả để Developer tham khảo hoặc Fail thì chỉ ra lỗi Build ở chỗ nào.

 -> Giúp phát hiện lỗi sớm hơn, giảm effort self check cho developer.

CD (Continous Delivery) là một phần mở rộng của CI, tức là là quá trình tự động Deploy Source Code  lên các môi trường (Test, Staging, Production) khi đã có 01 bản build ổn định.

Một số service sẽ sử dụng để apply CI CD là : 
* CodeCommit
* CodeBuild
* CodeDeploy
* CodePipeline

-> Step by step để build nhé: 

### 3. Tạo IAM Role:
IAM Role là một Identity ( thực thể ) trong IAM mà bạn tạo trong account có các quyền hạn cụ thể như được phép truy cập vào resource của Service nào đó. ( Ví dụ cho Codebuild có thể pull code từ CodeCommit chẳng hạn ).
* Tìm IAM Service trên bảng điều khiển console AWS sau đó chọn Policy để tạo:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "CloudWatchLogsPolicy",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Sid": "CodeCommitPolicy",
            "Effect": "Allow",
            "Action": [
                "codecommit:GitPull"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Sid": "S3GetObjectPolicy",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Sid": "S3PutObjectPolicy",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Sid": "ECRPullPolicy",
            "Effect": "Allow",
            "Action": [
                "ecr:BatchCheckLayerAvailability",
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Sid": "ECRAuthPolicy",
            "Effect": "Allow",
            "Action": [
                "ecr:GetAuthorizationToken"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Sid": "S3BucketIdentity",
            "Effect": "Allow",
            "Action": [
                "s3:GetBucketAcl",
                "s3:GetBucketLocation"
            ],
            "Resource": "*"
        }
    ]
}
```
- Đưa đoạn policy trên vào để tạo nhé :

![image.png](https://images.viblo.asia/b81d71f9-c1a1-4714-9ee0-77c4412fa908.png)

![image.png](https://images.viblo.asia/628fa4c2-6e85-4685-846b-203d9ba0ac0b.png)

![image.png](https://images.viblo.asia/87356ec0-cb1a-4d49-8031-92c9e11b883f.png)


- Chọn Roles trên thanh taskbar bên trái để tạo Role cho CodeBuild nhé: 
![image.png](https://images.viblo.asia/73fb08e4-6508-4018-8167-37d4073820ab.png)

![image.png](https://images.viblo.asia/20d241cd-df16-4658-aa41-ed591e0ec0cd.png)

![image.png](https://images.viblo.asia/4325b97c-7447-4502-adb4-6ff82f47396e.png)

IAM Role này cho phép Codebuild apply vào sẽ có một số permission nhất định như pull code từ ECR, get object từ S3, hay đẩy object lên S3 Bucket,... blabla 

Tới bước tạo CodeBuild sẽ apply Role này vào nhá 

### 4. Tạo ECR ( Elastic Container Registry )
Đây là service dùng để lưu trữ, quản lý và triển khai các Docker Container Image của các bạn. Nó cũng giống như DockerHub vậy, chỉ khác là được host trên AWS.
* Đầu tiên mọi người tạo 1 repository để lưu Image của mình lên nhé :

![image.png](https://images.viblo.asia/7ee50ced-f4b2-4744-a2f4-3aabfcfd5018.png)

* OK nếu đã tạo xong kho lưu trữ cho các Image Container của mình. Kế tiếp, chúng ta sẽ xây dựng  Image Container và đưa lên kho lưu trữ này.

![image.png](https://images.viblo.asia/6cbdde97-1c12-4add-8989-e6b4d31544b0.png)

* Mọi người chuẩn bị một project đã build  thành công trên Docker rồi nhé, mình sử dụng  [sample app](https://github.com/longnd-1038/docker-reactjs) này, viết thêm Dockerfile, buildspec.yml sử dụng cho CodeBuild. Mở terminal CD đến nơi chứa source code để build các lệnh như AWS suggest trên repo ECR của bạn nhé.

![image.png](https://images.viblo.asia/9e761d99-a0f7-4d8f-97e6-fc7233003c8a.png)


![image.png](https://images.viblo.asia/fb924fd3-a179-4847-8534-9e676fef9449.png)


(Yay) Khi hoàn tất, bạn hãy kiểm tra trong ECR để thấy image đã được đẩy lên.


- Docker file
```
# build environment
FROM node:9.6.1 as builder
ENV APP_HOME /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
COPY . $APP_HOME
RUN npm run build


# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```


### 5. ECS ( Elastic Container Service )
Là dịch vụ của Amazon Web Service, cung cấp khả năng build, quản lý các Container dựa trên các Image có sẵn.

### Tạo Cluster
ECS cluster là một nhóm (hoặc một) máy ảo chứa các container.
* Để tạo ECS Cluster, chúng ta sẽ tiến hành thực hiện:
1. Truy cập vào AWS Management Console. Lựa chọn Services ở thanh điều hướng và tìm kiếm Amazon Container Services.
2. Ở thanh điều hướng, chọn Clusters.
3. Trong trang Clusters, chọn Create Cluster.

![image.png](https://images.viblo.asia/61deef41-c84b-48a0-8c19-1320efa3ace8.png)

![image.png](https://images.viblo.asia/1ae5ecd5-c11c-457d-8bc3-5ba4a5de3f1a.png)

![image.png](https://images.viblo.asia/37a1fb9b-74ab-4bdf-903f-6a9a7595ba78.png)
- Ok đã tạo xong Cluster rồi nhé.

### Tạo Task Definition

Là 1 task được tạo ra để thiết lập các Docker container, có thể định nghĩa các thành phần như CPU, RAM, Port Binding, Network ... sử dụng trong AWS ECS của bạn. 
Để tạo Task Definition thì thực hiện như sau :
1. Truy cập vào AWS Management Console. Tìm kiếm dịch vụ Amazon Container Services.
2. Ở thanh điều hướng, chọn Task Definitions.
4. Trong trang Task Definitions, chọn Create new Task Definition.

![image.png](https://images.viblo.asia/5f4b9d58-0091-4976-923b-70cd83aede36.png)

![image.png](https://images.viblo.asia/eb5cf59f-874c-4aba-8c37-33797f87630c.png)

- Chọn Add Container để thiết lập thông số cho container của mình nhé  ( Chỗ Image thì điền link image bên ECR mới tạo phía trên ):

![image.png](https://images.viblo.asia/71f2b1e6-ffc4-4968-b271-a1c7c93fcf25.png)

Xong rồi thì nhấn Create để tạo nhé (yaoming) 

### Tạo Application Load Balancer ( Cân bằng tải )
Là service giúp bạn điều phối traffic ( lưu lượng truy cập của end-user ) đến các máy chủ khác nhau để giảm tải workload cho một server. 
Để tạo Application Load Balancer thì thực hiện như sau :
1. Truy cập vào AWS Management Console. Tìm kiếm dịch vụ EC2.
2. Ở thanh điều hướng, Chọn Load Balancers rồi tạo một Application Load Balancer nhoé.

- Ở phạm vi bài này mình sẽ sử dụng VPC Default của AWS 
![image.png](https://images.viblo.asia/4d93e3b5-973f-4665-aec8-6325b350da55.png)


- Tạo mới 1 Securety Group và cho phép Inbound port 80 ( Anywhere IP nhé) 
![image.png](https://images.viblo.asia/9ff7ed55-0b8a-4a32-af18-c494a9b2263e.png)


- Tạo mới 1 Targer Group (Dùng để xác định một nhóm EC2 Instances chạy ECS):
![image.png](https://images.viblo.asia/7ddbcd6c-cdfa-4128-a9e4-88419f9d9fbd.png)

- Ok đăng ký con EC2 đang chạy Task Definition vào nhé:
![image.png](https://images.viblo.asia/ce399af8-62b3-4dca-8ab8-624486d0a239.png)

### Tạo Service
Service trong ECS giúp chúng ta cấu hình cho phép chạy một hoặc nhiều các task trong cluster và tự động duy trì chúng. Các task được tạo ra dựa trên các thiết lập của bạn trong Task Definitions. (Các Image Container sẽ được chạy như thế nào ? ví dụ cho 2 container chạy trên 1 EC2)
Bạn bắt đầu tạo Service như sau:
1. Truy cập vào AWS Management Console. Tìm kiếm dịch vụ Amazon Container Services.
2. Ở thanh điều hướng, chọn Clusters và chọn Cluster đã tạo ở trên -> Tạo một Service mới.

![image.png](https://images.viblo.asia/c0a0a413-8a22-4176-b91b-8c43c9219f1e.png)

- Config Load Balancer port 80 nhé

![image.png](https://images.viblo.asia/838d731d-3d53-41ae-8bd4-52f8aa3537e9.png)

- Rồi nhấn Create để tạo service nhóe: 

![image.png](https://images.viblo.asia/d51fdca5-ab92-4489-9286-01b028ae3687.png)

- Ok Tạo thành công thì Task running rồi nè ( tức là Container đã được start trên ECS rồi nhá ).

![image.png](https://images.viblo.asia/de36b733-c9a1-4ffa-ba90-c44df09407c6.png)

### 6. Tạo CodeCommit
CodeCommit là một service dùng để quản lý, lưu trữ các phiên bản Source code dự án của chúng ta tương tự như Github một cách bảo mật, an toàn, độ khả dụng cao và khả năng mở rộng với các service mà chúng ta đang sử dụng trên AWS.
Mọi người xem hướng dẫn [sử dụng CodeCommit](https://viblo.asia/p/cach-deploy-ung-dung-laravel-bang-beanstalk-tren-aws-tich-hop-cicd-L4x5xVWOZBM) của mình ở bài này để push code lên repository của Code Commit nhé: 

Bạn bắt đầu tạo Service như sau:
1. Truy cập vào AWS Management Console. Tìm kiếm dịch vụ CodeCommit tạo một repository rồi đẩy code lên nhé (yay) 

![image.png](https://images.viblo.asia/763eae3b-4e7f-4467-868c-21a0281913fc.png)

![image.png](https://images.viblo.asia/14d34b96-ca78-4fe5-97a2-e28e08a06815.png)

### 7. Tạo CodeBuild
CodeBuild là service quản lý việc build source code của chúng ta.

Bạn bắt đầu tạo Service như sau:
1. Truy cập vào AWS Management Console. Tìm kiếm dịch vụ CodeBuild 

CodeBuild sẽ run file buildspec.yml để build Image Container của chúng ta: 
*  Đầu tiên Codebuild sẽ pull Image mới nhất lưu ở ECR về
*  Sau đó tiến hành build và push Image mới nhất lên lại ECR
*  Cuối cùng sẽ tạo một file artifacts imagedefinitions.json lưu trên S3 mục đích sử dụng cho CodeDeploy ở bên dưới ( nôm na là CodeDeploy sẽ nhìn vào file này để xác định Build chính xác Image mới nhất nào lên môi trường )
```
version: 0.2

phases:
  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - aws --version
      - echo $AWS_DEFAULT_REGION
      - $(aws ecr get-login --region $AWS_DEFAULT_REGION --no-include-email)
      - REPOSITORY_URI=669306211828.dkr.ecr.us-west-2.amazonaws.com/docker-reactjs
      - COMMIT_HASH=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)
      - IMAGE_TAG=${COMMIT_HASH:=latest}
  build:
    commands:
      - echo Build started on `date`
      - echo Building the Docker image...
      - docker build -t $REPOSITORY_URI:latest .
      - docker tag $REPOSITORY_URI:latest $REPOSITORY_URI:$IMAGE_TAG
  post_build:
      commands:
        - echo Build completed on `date`
        - docker push $REPOSITORY_URI:latest
        - docker push $REPOSITORY_URI:$IMAGE_TAG
        - echo Writing image definitions file...
        - printf '[{"name":"reactjs-docker-container","imageUri":"%s"}]' $REPOSITORY_URI:$IMAGE_TAG > imagedefinitions.json
artifacts:
    files: imagedefinitions.json
```

- Chọn Source Code ở CodeCommit rồi chọn branch Master nhé nhé
![image.png](https://images.viblo.asia/10c73004-24c9-4eb6-8f8f-39833e6bb7f3.png)

- Ở Step này mình chọn IAM Role đã được tạo ở trên để CodeBuild có một số permission cần thiết nè
![image.png](https://images.viblo.asia/ff10fa5b-e73c-430e-955b-2de716db3917.png)

- Cho phép Log quá trình Build vào [CloudWatch](https://aws.amazon.com/vi/cloudwatch/) 
![image.png](https://images.viblo.asia/65962fdc-7ee7-4df3-809f-051ffe9d08ee.png)

- Tiếp theo nhấn nút Build, tiến hành Build xem có lỗi gì không nhé
![image.png](https://images.viblo.asia/b40d344d-350d-4064-b3cf-817fa8bbd962.png)

- WOW Build thành công rồi nè nè (xanh lè)
![image.png](https://images.viblo.asia/8798ad01-2694-4af0-8730-f12f6df05e0c.png)

### 8. CodePipeline
CodePipeline là một service giúp chúng ta tổng hợp, xây dựng một quy trình (CI/CD) từ khi đẩy Code lên tới khi Deploy lên các môi trường sẽ như thế nào. Cụ thể mình đang build Pipeline như sau: 
1. Dev đẩy code lên CodeCommit
2. CodeBuild thấy có sự thay đổi source code tiến hành Build Source Code ( Mọi thông tin sẽ bắn về Cloudwatch ).
3. Có người Review Code -> nếu ok Approve thì sẽ tự động Deploy lên môi trường thực thi.

Bạn bắt đầu tạo Service như sau:
1. Truy cập vào AWS Management Console. Tìm kiếm dịch vụ CodePipeline rồi Build các Stage mà mình mong muốn nhé :  

![image.png](https://images.viblo.asia/bb5eca38-ed5c-4689-a223-996b548c3c00.png)

![image.png](https://images.viblo.asia/101ff495-ce73-4fa0-bdb7-4f68ba6be46b.png)

![image.png](https://images.viblo.asia/a2af88d5-65a9-427c-a355-8a4d051930d4.png)

- Nảy trên step Codebuild khi build xong sẽ tạo ra 01 file artifact imagedefinitions.json ( Code Deploy sẽ đọc thông tin từ đây để Build Image Container -> Deploy lên môi trường thực thi )
![image.png](https://images.viblo.asia/bcbe6aac-13af-4a17-8f43-eb05cdb5684d.png)


- Ở đây mình sẽ tạo thêm 1 Stage Manual Approve nữa để Review Code, nếu ok mới merge và Deploy lên môi trường thực thi

![image.png](https://images.viblo.asia/43af47c8-aa48-4021-897e-57c4ffb248ec.png)

![image.png](https://images.viblo.asia/7a81d785-e660-4161-9d3a-18f3a688ea55.png)

- Vậy là sau khi đẩy 1 commit lên thì quá trình của chúng ta sẽ như sau (Source được Build thành công -> Approve bởi Teamlead -> Deploy lên ECS)
![image.png](https://images.viblo.asia/07bae675-d011-42ba-bda0-bc854c777e1d.png)

![image.png](https://images.viblo.asia/c3891149-98b7-4173-a021-640fdf7980ce.png)

### 9. Kết thúc
OK vậy là quá trình Deploy thành công ( xanh lè )
![image.png](https://images.viblo.asia/936bcf83-f6d5-4003-80a8-82c954367c68.png)

Hi vọng ở phạm vi bài viết này mọi người có thể tự build cho Team một môi trường ở mức độ DEV, TEST phục vụ cho dự án của mình. (thanks for reading^^)