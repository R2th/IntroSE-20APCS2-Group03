Trong lúc mày mò thí nghiệm công nghệ và đi nghe ngóng khắp nơi để xem có gì hay, tại GDG tháng 12-2018 vừa rồi, mình đã được giới thiệu qua về AutoML Vision và được làm thí nghiệm với nó! Và bài viết này mình sẽ mày mò lại xem sau 1 tháng mình còn nhớ cái gì không ngoài hiệu năng của nó, đồng thời cũng giới thiệu cho các bạn 1 công cụ để tham khảo khi làm Machine Learning.
# Chuẩn bị tài khoản qwiklab
Đây là bước làm khá nhanh vì qwiklab có thể đăng nhập với google không cần qua bước nào cả. Sau khi đăng nhập xong các bạn bấm "Start Lab". Hiện ra pop-up thì chỉ cần nhập mã(hoặc mua credit)

![](https://images.viblo.asia/04ce5f18-56d3-4c74-807f-e4fe64de38f4.jpg)

Sau khi nhập mã và enter, ở bên tay trái của các bạn sẽ hiện các thông tin tương tự như sau:

![](https://images.viblo.asia/b115b59b-20a8-43bc-a55a-aa59b2ba434a.png)

Các bạn sẽ đăng nhập vào Google Cloud Platform dựa vào tài khoản được khởi tạo trong bảng trên.

![](https://images.viblo.asia/529e4a08-050d-43cd-b9a0-2fab7685d579.png)

Sau khi đăng kí xong thì hãy click để: 
- Chấp nhật các điều khoản.
- KHÔNG đặt lựa chọn khôi phục tài khoản và xác thực 2 lớp(đây là tài khoản ảo được tạo. Sau 1 tiếng sẽ tự động xóa).
- KHÔNG đăng kí thử miễn phí.
Làm đúng những bước trên thì tab Console sẽ hiện ra
![](https://images.viblo.asia/dab14eb0-515a-42e3-8f76-24c5872e0982.png)

(Phần khoanh đỏ là các sản phẩm khác của GCP. Nếu có dịp mình sẽ nghịch tiếp sau)
# Sử dụng shell
Đây là bước quan trọng thứ 2 vì sắp tới chúng ta sẽ phải dùng rất nhiều các câu lệnh.

Trước hết, ở phía bên phải của toolbar, click vào nút sau:

![](https://images.viblo.asia/0d77cd1d-2c93-4647-996c-531141f6a9d3.png)

Sau khi cửa sổ sau bật ra, click vào "Start Cloud Shell": 

![](https://images.viblo.asia/d841320e-97a3-44a1-b5f9-4f071fe5f813.png)

Khi việc connect đã thành công, bạn sẽ thấy hình ảnh sau đây:

![](https://images.viblo.asia/ae1597e6-beed-4712-aaf3-2693b20ec6d4.png)

Tên dự án sẽ mặc định là ID project của bạn,

`gcloud` đã được tích hợp sẵn ở command-line của GCP. Bạn có thể thử nó với command kiểm tra các tài khoản hoạt động:
```
gcloud auth list
```
Kết quả trả về sẽ có dạng sau
```
Credentialed accounts:
 - <myaccount>@<mydomain>.com (active)
```
Cụ thể hơn:
```
Credentialed accounts:
 - google1623327_student@qwiklabs.net
```
Cách để kiểm tra ID của project:
```
gcloud config list project
```
Dạng của kết quả trả về:
```
[core]
project = <project_ID>
```
Ví dụ
```
[core]
project = qwiklabs-gcp-44776a13dea667a6
```
# Chuẩn bị AutoML Vision
Tại thanh Navigation menu, chọn **APIs & Services > Library**. Tại phần tìm kiếm gõ "Cloud AutoML API" và enter. Click để lựa chọn và enable.

![](https://images.viblo.asia/e0460e19-67a5-4846-902c-2ab660ec7352.png)

Khi hiện ra thông báo ở trên là các bạn có thể tới bước tiếp theo.

Mở tab mới và vào [AutoML UI](https://cloud.google.com/automl/ui/vision). Bạn sẽ được yêu cầu đăng nhập. Hãy dùng account được tạo bởi qwiklab ở bên trên.

Sau đó bạn sẽ được yêu cầu chọn project. Chọn cái tên project của bạn và bấm "Continue".

![](https://images.viblo.asia/93e452f8-2c78-4b51-b96d-ff42d78caa69.png)

Sau đó bấm "Set up Now". 1 lúc thôi là sẽ xong

Quay lại cửa sổ console của GCP, hãy sử dụng các command sau, thay thế <PROJECT_ID> và <QWIKLABS_USERNAME> bằng ID project của bạn và tên đăng nhập mà qwiklab đã tạo
```
gcloud projects add-iam-policy-binding <PROJECT_ID> \
    --member="user:<QWIKLABS_USERNAME" \
    --role="roles/automl.admin"
```
```
gcloud projects add-iam-policy-binding <PROJECT_ID> \
    --member="serviceAccount:custom-vision@appspot.gserviceaccount.com" \
    --role="roles/ml.admin"
```
```
gcloud projects add-iam-policy-binding <PROJECT_ID> \
    --member="serviceAccount:custom-vision@appspot.gserviceaccount.com" \
    --role="roles/storage.admin"
```
```
gsutil mb -p <PROJECT_ID> \
    -c regional    \
    -l us-central1 \
    gs://<PROJECT_ID>-vcm/
```
# Nhập ảnh vào Google Cloud Storage 
Vì chúng ta chỉ có 1 tiếng thí nghiệm nên chúng ta theo ví dụ này sẽ nhập 1 cái storage khác vào storage của chúng ta. Tính ra hiện tại là còn 30 phút trước khi hết giờ. Thế nên không có thời gian để custom model.

Ở GCP console, mở navigation menu và chọn **Storage > Browser**:

![](https://images.viblo.asia/352bd654-a2be-4273-aa14-d3b6e3b1fac7.png)

Và đây sẽ là cái kho ảnh của bạn

![](https://images.viblo.asia/5853786e-0895-4de9-b245-4f9409c6fc6b.png)

Tiếp, tạo 1 biến môi trường
```
export BUCKET=YOUR_BUCKET_NAME
```
Với `YOUR_BUCKET_NAME` là tên cái kho ảnh 

Tiếp tới, dùng lệnh `gsutil` để nhập ảnh từ kho
```
gsutil -m cp -r gs://automl-codelab-clouds/* gs://${BUCKET}
```
Khi đã sao chép xong, hãy bấm Refresh. Các folder sẽ xuất hiện

![](https://images.viblo.asia/9ffc5540-dee7-4d59-b398-08c27f3c7793.png)

# Tạo dataset
Thực chất là khởi tạo 1 file CSV.

Chạy các câu lệnh sau:
```
gsutil cp gs://automl-codelab-metadata/data.csv .
```
```
sed -i -e "s/placeholder/${BUCKET}/g" ./data.csv
```
```
gsutil cp ./data.csv gs://${BUCKET}
```
`{BUCKET} `là tên cái kho ảnh của các bạn nhé

Quay lại [AutoML VisionUL](https://cloud.google.com/automl/ui/vision). Giao diện mong đợi sẽ như này

![](https://images.viblo.asia/32911e99-b22c-4cf6-8552-8f283207be40.png)

Ở trên cùng của console, click **+ NEW DATASET**. Đặt tên dataset với "clouds". Chọn **Select a CSV file on Cloud Storage** và điền link file bạn vừa tạo `gs://your-project-name-vcm/data.csv`
![](https://images.viblo.asia/b591f9d2-6f57-4018-8196-b1b16a0d86f6.png)

Với ví dụ này thì để ô này trống nhé

![](https://images.viblo.asia/075af1a3-43da-410b-bc2c-ca4412a923aa.png)

Sau đó bấm nốt để tạo

![](https://images.viblo.asia/7ea5e939-a11b-4ffb-b42d-e1ef684f9baf.png)
# Xem dữ liệu
Vì đây là dữ liệu mây nên chúng ta sẽ có 3 loại mây, mỗi loại có 20 ảnh 

![](https://images.viblo.asia/0699dd09-2fdf-44b9-934e-07e34b3bf70c.png)

![](https://images.viblo.asia/1f772a8d-861e-433d-b8c7-5fc5ae5bb461.png)

Nếu có ảnh nào có cảm giác sai sai, bạn có thể xóa đi

![](https://images.viblo.asia/fd978ef1-f3b8-4a99-bba4-91f5fe3643b0.png)

# Train model
Làm sao mà gọi là ML khi không có vụ dạy học cho model =))  Hãy chuyển đến tab **Train** và bấm **Start Training**

![](https://images.viblo.asia/50298a32-4c11-48a3-83b4-bf10fa6e8d0c.png)

Thôi cũng sắp hết thời gian nên các bạn để model mặc định cho mình nhờ

![](https://images.viblo.asia/47e3897e-702f-40dd-9fb7-70d1c78d5681.png)

Vì đây là data nhỏ nên sẽ chỉ mất tầm **~~5 phút~~** để train xong.

-> **HƯ CẤU, TẤT CẢ LÀ HƯ CẤU!** Y như lần trước thực hành thì mình còn còn 16 phút để bắt đầu train. Và train xong thì mình còn đúng 1 phút để thử kết quả. Ở DevFest GDG thì người ngồi cạnh mình còn hết thời gian cơ! Cảm giác của các nhân vật của phim In Time là đây(quảng cáo: Justin Timberlake đóng phim cũng hay phết các bạn ạ)!

# Đến lúc nhận diện!
Thôi nhé. 1 phút còn lại mình chỉ chơi 1 ảnh thôi. Oải rồi.

Chuyển tới tab **Predict** và tải ảnh lên

![](https://images.viblo.asia/06325ef5-904a-48b8-be94-abecf9d0a687.png)

Đây là ảnh thí nghiệm của mình

![](https://images.viblo.asia/e952467c-9ca5-409e-ad98-ae235e86916e.jpg)

Và đây là kết quả

![](https://images.viblo.asia/f8d2c4d8-7add-49bb-9033-c67c65d46d34.png)

Trông có vẻ đúng phết! 

À cơ mà lượng dữ liệu này nhỏ nên việc đúng cũng là dễ hiểu.
# Kết luận
Như diễn giả hướng dẫn mình đánh giá thì nó khá là lâu. Cộng với qwiklab chỉ cho thí nghiệm trong vòng 1 tiếng thì chúng ta cũng cần vận may để ra được kết quả. Và diễn giả ở GDG cũng đánh giá là dùng MLKit còn hiệu quả hơn. Tuy nhiên công nghệ luôn phát triển nên dù sao đây cũng là cái option đáng cân nhắc.

Bài viết khá là giống dịch vì thực sự hướng dẫn tại trang gốc khá là chi tiết. Với chút tiếng Anh cũng có thể tự thực hành được. Tuy nhiên thì tới GDG mình mới biết đến nó nên cần có hướng dẫn.

Chúc mọi người có trải nghiệm thú vị! Viblo đi muôn nơi!

![](https://images.viblo.asia/de95a3a3-c01b-4f43-9e2e-28759b610505.jpg)

# Tham khảo

https://www.qwiklabs.com/focuses/1779?locale=en&parent=catalog