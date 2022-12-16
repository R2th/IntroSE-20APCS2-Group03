Một trong những điều mình thích nhất ở Cloud Providers là chỉ cần khai báo 1 vài dòng lệnh còn lại mình không phải care :sunglasses:

Cloud Build - the serverless CI/CD product of Google Cloud là một trong những thứ hay ho nhất. Đơn giản bởi vì nó dễ apply, thông minh mà hiệu quả :kissing_heart:

Các bạn đã sẵn sàng chưa. Bắt đầu thôi :muscle:

![](https://images.viblo.asia/6a2a12ac-a930-40f2-bf0b-78819bca3dc2.png)
# Google Cloud Build là gì?

Đây là một sản phẩm của GCP nhằm build mã nguồn của tất cả ngôn ngữ lập trình.

* Tăng tôc độ build với VMs trên Cloud và không tốn tài nguyên của máy cá nhân.
* Mã nguồn được đặt ở Local, Github, Cloud Source Repositories hoặc Bitbucket  đều sử dụng được Cloud Build
* Cloud Build hỗ trợ nhiều sự lựa chọn để build mã nguồn: Docker container,Maven, Gradle, webpack, Go hoặc Bazel.
* Kết quả sau khi thực hiện build sẽ được đẩy lên Docker Hub hoặc Container Registry.
* Có thể tùy chỉnh luồng xử lý build theo ý muốn của bạn.
* Miễn phí cho thời gian build là 120 phút/ 1 ngày.



# The trigger functionality of Cloud Build
### 1. Chuẩn bị 
+ Cài đặt firebase-tools CLI  ==>> https://github.com/firebase/firebase-tools
+ Cài đặt gcloud CLI  ==>> https://cloud.google.com/sdk/gcloud/
+ Bật thanh toán trên Google Cloud, dịch vụ Google Cloud Build miễn phí trong 120 phút thời gian build mỗi ngày.(nếu quá thì 0.003$ cho mỗi phút nhé)
+ Chuẩn bị source code nữa nhé

### 2. Phân quyền và kích hoạt Cloud Build API

2.1 Search IAM & Admin và cấp cho user .....@cloudbuild.gserviceaccount.com các quyền này nhé : 

![](https://images.viblo.asia/a806c4c8-eba2-48e2-b595-b2cd5d761d6d.png)

2.2 kích hoạt cloud build api. Bạn vào link này vào chọn project ![](https://images.viblo.asia/26a8e765-6300-4b8a-b532-38a01eaf8876.png)

https://console.cloud.google.com/flows/enableapi?apiid=cloudbuild.googleapis.com&redirect=https:%2F%2Fcloud.google.com%2Fcloud-build%2Fdocs%2Fquickstart-docker&_ga=2.170700775.-618198222.1566810450

2.3 Kích hoạt Cloud KMS API 
https://console.cloud.google.com/flows/enableapi?apiid=cloudkms.googleapis.com&redirect=https:%2F%2Fconsole.cloud.google.com&_ga=2.143835250.-618198222.1566810450

![](https://images.viblo.asia/645cab4b-855c-4e6c-ad70-4f7e91eff5ba.png)

2.4 Kích hoạt Service Account User permissions  và Cloud KMS CryptoKey Decrypter
https://console.cloud.google.com/cloud-build/settings?project={Id project của bạn}

![](https://images.viblo.asia/13cfc5c6-b83b-4724-89e8-93f915dfa606.png)

### 3. Tạo file cloud-build.yaml 
Mình cần tạo file cloud-build.yaml và đẩy lên source nhé
Trong file này mình sẽ viết các step mà cloud build cần thực hiện để deploy nhé
bạn có thể tham khảo cách viết tại đây
https://cloud.google.com/cloud-build/docs/build-config

### 4.  Connect repository và tạo Build Trigger
Chú ý: Để có thể connect đến một repo private, cần thêm các config trong file cloudbuild.yaml. Xem hướng dẫn chi tiết tại link dưới: https://cloud.google.com/cloud-build/docs/access-private-github-repos

Tiếp theo bạn vào link 
https://console.cloud.google.com/cloud-build/triggers?orgonly=true&project={project id của bạn}
chọn Connect repository. Ở đây mình chọn là GitHub (Cloud Build GitHub App) nhé

![](https://images.viblo.asia/8f2b01ac-e840-437c-83ee-042704e21d23.png)

Tiếp theo bạn cần chọn git cần connect nhé, Ví dụ như bên dưới:
> Lưu ý quan trọng là để chọn được git thì bạn phải có quyền owner nhé 

![](https://images.viblo.asia/05f792ae-55c2-43f1-b39a-c8b6c06f0c9d.png)

Sau khi mình hoàn thành các bước mình sẽ có 1 cái trigger như này nhé
![](https://images.viblo.asia/a7833b20-2b3e-40db-af5f-0d17c136c3c0.png)

Tiếp theo các bạn chọn edit trigger này nhé. Ở mục build configuration mình chọn 
`Cloud Build configuration file (yaml or json)` và điền tên file .yaml mình tạo bên trên vào đây nhé

![](https://images.viblo.asia/a3a5e33b-c0f5-4b53-84ff-4289e52195bc.png)

Mục Event và Source  bạn có thể chọn các option khác nhau. Ở đây mình config là có push vào branch master thì sẽ trigger cloud build nhé
![](https://images.viblo.asia/e7e0175c-0b52-4516-8dea-e20f0ecee317.png)

Đến đây đây là mình đã hoàn thành việc cài đặt rồi nhé
Ngoài ra bạn cũng có thể run thủ công với branch mà mình chọn nhé

![](https://images.viblo.asia/0fb04cbb-713b-43ab-9e4a-b1e5b172ff50.png)

Chúc các bạn thành công :pray: