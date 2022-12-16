Ở bài viết trước mình đã giới thiệu một vài service cơ bản nhất của AWS. Tiếp tục chuỗi tìm hiểu về series học AWS. Ở bài viết này mình sẽ tiếp tục giới thiệu với các bạn hệ thống Continuous Delivery (CD) mà mình thấy khá đơn giản.
Lần này chúng ta sẽ cùng deploy một Webapp in hello world ra màn hình (Hello world được vẫn là cảm giác rất tuyệt vời :100:).
Trước tiên chúng ta cần có 1 source code trên github, source code hello world đơn giản thôi, các bạn có thể tham khảo source code của mình tại [đây](https://github.com/duongtt-1061/test-ci-cd). Ở bài viết này mình tập trung vào hệ thống auto deploy nên sẽ bỏ qua bước tạo mới project và đẩy lên github nhé. Mình đã có sẵn 1 source code nên sẽ sử dụng luôn. 

Tuy nhiên các bạn cần lưu ý ở ngoài cùng Project các bạn thêm cho mình các file sau
1. File Appspec, dùng để mô tả script và endpoint cho service AWS CodeDeploy.

![image.png](https://images.viblo.asia/0b4232c2-d316-46e8-bbbe-a14342564aff.png)

```css
version: 0.0
os: linux
files:
  - source: /index.html
    destination: /var/www/html/
hooks:
  BeforeInstall:
    - location: scripts/install_dependencies
      timeout: 300
      runas: root
    - location: scripts/start_server
      timeout: 300
      runas: root
  ApplicationStop:
    - location: scripts/stop_server
      timeout: 300
      runas: root
```

Như ở file này các bạn sẽ thấy source và destination.
- Source: nguồn để lấy code (như ở đây mình chỉ lấy trang index.html để demo cho các bạn xem).
- destination: Nơi lưu trữ code trên server.

Ngoài ra các bạn còn thấy 3 đường dẫn **script/...**, thì ở folder con này mình sẽ định nghĩa 1 vài file để sử dụng, các bạn có thể đọc code và tìm hiểu dần. Ở đây mình sẽ sử dụng Nginx làm server listening request

- scripts/install_dependencies.sh, dùng để install các dependencies nếu cần

![image.png](https://images.viblo.asia/8a3a5334-6a91-4ca5-a4a1-0d83466dbda7.png)

- scripts/start_server.sh: dùng để chạy các command start server

![image.png](https://images.viblo.asia/41ed91c9-4b6c-4e08-a240-244092496bbf.png)

- scripts/stop_server.sh: chạy command stop server

![image.png](https://images.viblo.asia/6f5f65f3-1aa4-496c-bffe-1fbe0e9457bc.png)
## Bước 1: Thiết lập role
Đầu tiên chúng ta cần tạo ra role phù hợp để cho hệ thống có đủ quyền thao tác.
Ở màn console AWS, ta truy cập vào IAM, vào feature Roles.

![image.png](https://images.viblo.asia/47a2b417-89e8-4b4a-ac3b-0ccd429c32c4.png)

Tiếp đến ta click "Create role", chọn "EC2", click "Next: Permissions".

![image.png](https://images.viblo.asia/0eb8cecb-6aaf-49c2-8a78-2da06570036f.png)

### Phân quyền cho EC2 có quyền truy cập vào S3 
Ở thanh tìm kiếm các permission, ta search keyword "S3", tìm và chọn "AmazonS3FullAccess" rồi nhấn "Next", đến mục đặt tag ta cũng sẽ next tiếp.

![image.png](https://images.viblo.asia/cc653d01-5292-4246-86b4-456dd5e5f9b1.png)

Ở đoạn review này, ta sẽ nhập tên của Role (bắt buộc). Các bạn nên đặt tên theo một quy tắc dễ nhớ, ví dụ như cách mình đặt cũng là do mình học hỏi được, mình thấy cách này rất rõ ràng, mạch lạc.

![image.png](https://images.viblo.asia/8609c872-d2ba-44e0-8673-9bc0ad1c2d4a.png)

Tiếp theo đó nhấn "Create role", ta đã hoàn thành tạo một role rồi.

![image.png](https://images.viblo.asia/dc6e92a0-3141-4aa6-b09a-98064c0cff6c.png)

Chắc hẳn các bạn sẽ thắc mắc quyền này dùng để phục vụ cho việc gì cho hệ thống CD của chúng ta. Sau này code của chúng ta mỗi lần deploy sẽ được lưu lên S3 trước đó, rồi từ S3 mới kéo code vào instance EC2, vì vậy chúng ta cần cấp quyền cho EC2 có quyền truy cập vào đó.

### Tạo role cho service CodeDeploy
Tương tự như các bước trên, chúng ta cần tạo thêm một role nữa cho service CodeDeploy. Các bạn nhấn vào "Create role", tìm và chọn "CodeDeploy" rồi nhấn "Next" cho đến màn Review rồi đặt tên và next tương tự như trên

![image.png](https://images.viblo.asia/1d1f6dcd-2708-4399-adcf-02c8b152df30.png)

![image.png](https://images.viblo.asia/219db587-03ac-49de-876a-d9af0cd80937.png)

## Bước 2: Khởi tạo instance EC2
### Run instance
Ta cần khởi tạo một server để deploy code lên và vận hành code của chúng ta.
Ta vào service EC2 và làm các bước dưới đây.
Chọn Launch Instance.

![image.png](https://images.viblo.asia/d1db939e-e4f9-4a88-9741-a41ee43d1119.png)

Mình sẽ sử dụng Ubuntu 20.04.

![image.png](https://images.viblo.asia/382d87fe-7074-4e3c-88d8-fbc23d18273f.png)

Chọn "Next: Configure Instance Details".

![image.png](https://images.viblo.asia/64c93d3b-f843-4a7a-9c39-21d9f85e1482.png)

Ở bước này ta sẽ chọn Role "EC2FullAccessS3" ban nãy ta đã tạo và chọn "Next: Add Storage", rồi nhấn "Next: Add tags".

![image.png](https://images.viblo.asia/c92fcc86-10af-4e19-b62c-aa1d32cf4ea1.png)

Ở màn Add tag này ta sẽ gắn tag name cho instance EC2 này. Ta chọn "Add tag".

![image.png](https://images.viblo.asia/e3d20342-8432-4ebd-981d-a9238f98eaab.png)

Ở input "key" ta sẽ gõ "Name", "value" thì ta sẽ nhập tên tùy ý, mình sẽ đặt là "HelloWorldInstace". Sau đó nhấn "Review and Launch" rồi nhấn tiếp "Launch" để khởi chạy instance.

![image.png](https://images.viblo.asia/68c235b0-cccd-4593-a047-bd60a5aacfef.png)

![image.png](https://images.viblo.asia/b4075e6b-97a1-41c8-b813-a1e2f19caa45.png)

### Edit rule inbound security group
Ta cần cho phép server sử dụng các cổng http, https, ssh, ... Ở bài demo này nên để tránh mất thời gian mình sẽ sử dụng all traffic (tất cả cổng) cho security group được gắn vào EC2 trên.

![image.png](https://images.viblo.asia/1c8dd27d-b8af-4d35-9808-b4bb1a0f2bdc.png)

### Install Nginx
Bài này mình sẽ sử dụng Nginx làm server, để cài đặt ta sẽ ssh vào instance đã khởi chạy bên trên (Có những cách khác để không phải làm thủ công như này, nhma thôi cứ vào cho quen tay nhé các bạn).

```shell
sudo apt-get update
sudo apt-get install nginx -y
sudo service nginx status
```

Khi chạy xong câu lệnh cuối ta đc màn hình như này là được nhé các bạn
![image.png](https://images.viblo.asia/262d1832-8c38-48c7-bd93-12716edc7825.png)

Còn nếu nó chưa hiện status active thì ta gõ lệnh

```c
sudo service nginx start
```

### Install CodeDeploy Agent
Các bạn có thể vào [link](https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install-ubuntu.html) này để tham khảo nhé
```shell
sudo apt-get update
sudo apt install ruby-full
sudo apt install wget
cd /home/ubuntu
```

Ở command tiếp theo này các bạn chú ý giúp mình 2 cái là "bucket-name" và "region-identifier", 2 cái này bạn vào link này và tìm vào region của mình và thay thế
```shell
wget https://bucket-name.s3.region-identifier.amazonaws.com/latest/install
```

Như của mình đang sử dụng region Asia Pacific (Singapore) nên sẽ là

```javascript
wget https://aws-codedeploy-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/latest/install
```

Ta cần kết quả trông như này.

![image.png](https://images.viblo.asia/07e63188-e01f-4011-ae81-578c3c311d7a.png)

Tiếp theo
```shell
chmod +x ./install
sudo ./install auto > /tmp/logfile
sudo service codedeploy-agent status
```

Kết quả như này là thành công rồi.

![image.png](https://images.viblo.asia/95002bea-51f2-4e41-9e08-665177a3eb6b.png)

## Bước 3: Tạo application và pipeline
Ta sẽ tìm và vào console service AWS CodeDeploy.

![image.png](https://images.viblo.asia/af9d0847-b160-4e82-a550-a6003a0ae669.png)

### Tạo Application
Đầu tiên ta chọn vào feature "Application".

![image.png](https://images.viblo.asia/432dbe14-4620-4f41-9573-f68064dfa853.png)

Nhấn "Create Application", nhập tên cho application và compute platform là EC2/On-promises rồi nhấn create.

![image.png](https://images.viblo.asia/38f66cc2-c0ca-4e98-a285-e7d00a16cf4d.png)

![image.png](https://images.viblo.asia/560a54a6-076c-4cb0-8025-35aa1b9d9703.png)

Tiếp tục ở màn này ta chọn "Create deployment group". Ta nhập tên cho group và chọn role "CodeDeployRole" mà ban nãy ta đã tạo.

![image.png](https://images.viblo.asia/ef47ee53-810b-462b-b122-abfd635f1340.png)

Ở mục "Environment configuration" ta sẽ chọn Amazon EC2 instances và nhập key "Name" như ban nãy ta tạo ở EC2

![image.png](https://images.viblo.asia/02d88dd3-1b51-4c77-a3e5-0b481e91d6bf.png)

Chúng ta sẽ không sử dụng đến Load Balancer nên sẽ bỏ chọn service này ở bên dưới và nhấn "create deployment group".

![image.png](https://images.viblo.asia/5a45a554-cf81-4512-ae61-9580baa96d60.png)

### Tạo Pipeline
Tiếp đến ở menu bên tay trái, ta tìm chọn feature "Pipelines" rồi nhấn Create, đặt tên cho piple line và nhấn "Next".

![image.png](https://images.viblo.asia/eae5ed42-77ef-4dad-af7a-922635f41da6.png)

![image.png](https://images.viblo.asia/864d5b8b-027b-4146-916c-01aa75c2fb8e.png)

Ở Source Provider, ta chọn "GitHub ( Version 1 )", rồi nhấn connect to github, tiếp đó nhấn "confirm".

![image.png](https://images.viblo.asia/c360e168-e2f7-465c-a573-12b519ebec1a.png)

Chọn Repository và branch các bạn muốn deploy rồi nhấn "Next". Ở phần "Add build stage" ta sẽ bỏ qua, ta chọn "Skip build stage".
Ở "Add deploy stage" ta cần chọn Deployment Provider là "AWS CodeDeploy", chọn region (hoặc để mặc định), chọn "application name" và "deployment group" là 2 cái ban nãy ta tạo bên trên rồi nhấn "Next", rồi nhấn "Create pipeline" ở màn tiếp theo

![image.png](https://images.viblo.asia/1db73d20-d94d-44ad-8089-e54ecc8bb3ea.png)

![image.png](https://images.viblo.asia/7f6c39e7-dddb-4a17-9a84-bf947db7f256.png)

Ở bước này ta sẽ được chuyển đến màn monitor quá trình deploy code rồi.

![image.png](https://images.viblo.asia/6810ce5c-d28e-494c-804f-0164586042ad.png)

Quá trình này có 2 bước, bước 1 là kéo code về S3, bước 2 là lấy code từ S3 về server.

Đợi 1 hồi thấy xanh cả 2 bước như này là vào việc r đó các bạn.

![image.png](https://images.viblo.asia/0149c12a-0c8d-421b-85ad-cb9bcff08df7.png)

Để kiểm tra ta vào http://public_ip_v4_of_instance nhé.

![image.png](https://images.viblo.asia/886794cf-46f4-4866-a7d9-7426134f957c.png)

Vậy thì CD ở đâu nhỉ ? Giờ ta cùng thử thay đổi source code => đẩy lên git => xem kết quả nhé.

Ở file index.html của source code mình sẽ thay text "Finally i can do it" thành "Hello World".

![image.png](https://images.viblo.asia/cd9eac4b-a0bb-4a9b-bf40-639e1262091d.png)

Ta sẽ lại thấy quá trình deploy đang chạy, nó đang deploy lại đó các bạn.

![image.png](https://images.viblo.asia/7a96809e-d378-4424-a3dc-5120781cb574.png)

Quá trình deploy xong thì ta quay lại check webapp của ta nhé.

![image.png](https://images.viblo.asia/d81fd2b7-ca6d-4188-ad11-066f6ea942b4.png)

Webapp của chúng ta giờ đã in ra màn hình "Hello World" như code mới rồi, việc chúng ta cần làm chỉ là merged code mới vào nhánh chúng ta đã chọn trước đó, github sẽ tự trigger deploy code lên server cho chúng ta, đó chính là "Continuous Delivery" (CD) đó các bạn.
Cảm ơn các bạn đã đọc bài viết của mình, bài viết sau có lẽ mình sẽ demo việc sử dụng Passenger + Nginx + viết script auto run mỗi lần deploy để có 1 con server hòm hòm nhé.
Chúc các bạn thực hành thành công !

Bài viết này mình học hỏi từ https://www.youtube.com/watch?v=KoNWlnx6E1I&t=1109s