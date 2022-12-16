Chào mọi người, nội dung  của blog nói về việc **deploy một ứng dụng Machine Learning lên Cloud Foundry bằng Docker.**
Mục đích của blog vẫn sẽ là chia sẻ kinh nghiệm và hệ thống lại kiến thức mình đã làm. 
## Tổng quan một số khái niệm cơ bản:
* `Machine Learning`: một nhánh của trí tuệ nhân tạo, thuộc ngành khoa học máy tính, nó có khả năng tự học hỏi dựa trên dữ liệu đưa vào mà không cần phải được lập trình cụ thể. Học tự động là một phương pháp để tạo ra các chương trình máy tính bằng việc phân tích các tập dữ liệu.
* `Cloud Foundry`: là một nền tảng mã nguồn mở dành cho điện toán đám mây,
nó cung cấp một Platform as a Service (PaaS) giúp giảm tải quá trình phát triển và triển khai các ứng dụng. Là một Paas, Cloud Foundry sẽ quản lý chi tiết tất tần tật về ứng dụng của chúng ta trên môi trường production. Nhiệm vụ của chúng ta là chỉ tập trung vào việc phát triển ứng dụng mà thôi.
* `Docker`: thiết kế để giúp cho việc khởi tạo, deploy, và chạy các ứng dụng được dễ dàng hơn thông qua việc sử dụng containers.
* `Docker Image`: Image là đơn vị cơ bản nhất trong Docker.  Image sẽ định nghĩa cho 1 môi trường và những thứ có trong môi trường đó.
* `Docker Container`: có thể đóng gói một ứng dụng với tất cả các thành phần cần thiết của để ứng dụng có thể chạy được.
* `CI/CD` Continuous Integration/Continuous Delivery - tích hợp liên tục / triển khai liên tục.

## Tổng quan về ứng dụng Machine Learning:
* Ứng dụng được triển khai với mục đích kiểm tra ảnh trùng lặp. Khi người dùng upload một bức ảnh, hệ thống sẽ tìm kiếm những bức ảnh gần giống nhất, trả về kết quả bức ảnh giống nhất và phần trăm xác suất của nó.
* Ứng dụng hiện tại đã hoạt động ổn với trường hợp ảnh trùng lặp hoặc bức ảnh gần trùng lặp như ảnh đã bị cắt góc, xoay, lật, thay đổi hiệu ứng.
* Hướng phát triển tiếp theo kiểm tra với những ảnh gần giống nhau, giả sử cùng nội dung nhưng khác view, background hoặc những ảnh có chất lượng thấp...
* Cuối cùng để ứng dụng hoạt động tốt trên thời gian thực thì cần tối ưu thời gian load model, tạo cron job để tự động training data, sử dụng các thuật toán hoặc hiệu chỉnh parameter để cho kết quả tốt hơn khi phát triển trùng lặp.

## Cấu trúc dự án:
![](https://images.viblo.asia/a8ebbf74-2e4e-47b6-ac4b-fa268cb864c9.PNG)

### Cấu trúc manifest.yml
```
---
applications:
- name: machine
  host: check
  path: .
  disk_quota: 1536M
  memory: 1024M
  command: python /deploy/api.py
  services:
    - myhana
 ```

### Cấu trúc Dockerfile
```
FROM python:3.6-slim
LABEL author.name="Aaron" \
author.email="aaron.pham@laidon.com"
MAINTAINER aaron1508 <aaron.pham@laidon.com>
RUN pip install --upgrade pip
RUN pip install h5py==2.10.0
COPY . ./deploy/
RUN pip install -r deploy/requirements.txt
# Expose the port
EXPOSE 80
# Set the working directory
WORKDIR /deploy/
# Run the flask server for the endpoints
CMD python /deploy/api.py
```
### Lý do sử dụng docker
Khi mình cài đặt thư việc thư viện tensorflow cho việc deploy bị conflict version khiến cho cách deploy thông thường bị lỗi nên mình nghĩ đã việc đến dùng docker để deploy.
Khi build image bằng docker mình có thể push lên Docker Hub hoặc registry gitlab. Vì Docker Hub chỉ cho phép 1 repository private, nên mình ưu tiên dùng registrry gitlab vì nó có thể cho phép lưu nhiều image và nó free cho mình.

![](https://images.viblo.asia/3ee84db9-5471-4fc0-830d-eb747a03df71.jpg)


### Build image và push into registry gitlab local
```
docker login "$GITLAB_REGISTRY" -u "$GITLAB_ACCOUNT" -p "$GTLAB_PASSWORD"
docker build -t $GITLAB_REGISTRY/$PROJECT_NAME:$CI_COMMIT_REF_NAME-$CI_PIPELINE_ID .
docker push $GITLAB_REGISTRY/$PROJECT_NAME:$CI_COMMIT_REF_NAME-$CI_PIPELINE_ID

```

## Deploy local:
* Download cf CLI (Cloud Foundry Command Line Interface), mình sử dụng Windows nên sẽ download trên trang chủ CLoud Foundry for Windows và cài đặt theo hướng dẫn.
* Đăng nhập cloud foudnry:
```
cf login -a API-URL -u USERNAME -p PASSWORD -o ORG -s SPACE
```
Với:
* API-URL: API endpoint
* ORG: org muốn triển khai ứng dụng.
* SPACE: space muốn triển khai ứng dụng.
* 
Các bạn có thể tham khảo trên document của Cloud Foudnry, tên của org, space, api-url có thể xem trên phần overview subaccount trên tài khoản của bạn.
![](https://images.viblo.asia/ee0e350b-b13a-4e09-94a2-687ecddf2320.png)

* Deploy lên cloud foundry:
```
CF_DOCKER_PASSWORD="$GITLAB_PASSWORD" ./cf push machine --docker-image registry.gitlab.com/aaron.pham/deploy_sap:$CI_COMMIT_REF_NAME-$CI_PIPELINE_ID --docker-username "$GITLAB_ACCOUNT"
```

## Deploy by Gitlab CI
Deploy ứng dụng bằng các sử dụng gitlab CI, để ứng dụng có thể tự động triển khai mỗi lần mình push code lên thì mình sử dụng CI-CD để tự động hóa quy trình.
Để sử dụng gitlab CI thì cần tạo file .gitlab-ci.yml, cấu trúc như sau:
```
gitlab-build:
  image: docker:latest
  stage: build
  services:
    - docker:dind
  before_script:
    - docker login "$GITLAB_REGISTRY" -u "$GITLAB_ACCOUNT" -p "$GITLAB_PASSWORD"
  script:
    - docker build -t $GITLAB_REGISTRY/$PROJECT_NAME:$CI_COMMIT_REF_NAME-$CI_PIPELINE_ID .
    - docker push $GITLAB_REGISTRY/$PROJECT_NAME:$CI_COMMIT_REF_NAME-$CI_PIPELINE_ID
  only:
    - master

docker-deploy:
  image: java:8
  stage: deploy
  services:
   - docker:dind
    - java:8
  before_script:
    - apt install curl
    - curl --location "https://cli.run.pivotal.io/stable?release=linux64-binary&source=github" | tar zx
#    - echo "CF_DOCKER_PASSWORD"
#     - echo "CF_ACCOUNT" "CF_PASSWORD" "CF_API"
  script:
    - ./cf login -u "$CF_ACCOUNT" -p "$CF_PASSWORD" -a "$CF_API"
    - CF_DOCKER_PASSWORD="$GITLAB_PASSWORD" ./cf push machine --docker-image $GITLAB_REGISTRY/$PROJECT_NAME:$CI_COMMIT_REF_NAME-$CI_PIPELINE_ID --docker-username "$GITLAB_ACCOUNT"

  only:
    - master
```

* Các biến môi trường được set up ở Variable của phần Settings CI-CD, biến là account và password của bạn thôi, mình không đi sâu vào cấu trúc của gitlab CI hay format file yaml, có thể mình sẽ dành cho bài sau về devops, CI-CD chi tiết hơn.
* Mình để only master, để project chỉ chạy CI tại nhánh master mà thôi.

## Quá trình deploy bằng gitlab CI
### Push lên nhánh master hoặc tạo merge request lên nhánh master, nó sẽ trigger và run pipeline CI.

![](https://images.viblo.asia/aef027fc-470a-40a2-9be6-931c69d1ffd3.PNG)

![](https://images.viblo.asia/2e29b4da-80e6-4ce3-8e70-c60ca8fd2549.PNG)

![](https://images.viblo.asia/f8a46157-ed2e-4c36-aac8-117fdf8a4f1e.PNG)

### Và kết quả cuối cùng:
![](https://images.viblo.asia/d83ff1e7-348b-4c12-af44-ccc2dac930ea.PNG)

![](https://images.viblo.asia/b71a4683-ee20-4d88-a2b1-700b409c70f1.PNG)

![](https://images.viblo.asia/21ac4c6c-bdca-48a7-bf2b-11edd6d03c45.PNG)


Cảm ơn mọi người đã xem, nếu nhận được phản hồi, góp ý thì mình có thể cải thiện kiến thức chuyên môn và kỹ năng viết blog.

----------------------------------------
Thank you and Best regards

Tu Pham.