Xin chào 500 ace, lâu rồi không chi sẻ kiến thức gì, nay mạn phép chia sẻ với ace về service **AWS BATCH** và **Làm thế nào để áp dụng vào dự án RAILS**

### Nội dung gồm 2 phần:
* Phần 1: **Làm quen với Aws Batch**(chúng ta đang ở đây) :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:
* Phần 2: **Ứng dụng vào dự án RAILS**


### 1. Giới thiệu về Aws Batch
Aws Batch là một service giúp chúng ta có thể thực hiện các job mang tính xử lí hàng loạt(ví dụ như background job ta hay gọi) sử dụng EC2 instance và Spot instance. Về mặt nghiệp vụ thì nó cũng có thể giống như các queue backend khác như Sidekiq, Resque hay là Deplayed Job hoặc nhiều hơn nữa. Chỉ khác là Batch nó tự quản lí tất tần tật mọi thứ xung quanh job như resource(RAM, ROM, network,...), scale chứ không chỉ đơn giản là nhận job và xử lí như các queue backend. Để hiểu hơn ta tìm hiểu thêm về các tính năng của **Aws Batch**
* **Tính năng và lợi ích**:
    * Fully managed(Toàn quyền quản lí): Chúng ta không cần phải sử dụng thêm các library xử lí background hay dịch vụ thứ 3 nào khác rườm rà. Không cần cài cắm hay install gì cả, ta chỉ cần submit job còn lại là e Batch nó lo hết từ việc cần bao nhiêu resouce, job chạy ra làm sao, lúc nào thì scale,...
    * Integrate with aws(Tích hợp với AWS): Vì là một service của AWS nên cho phép chúng ta tận dụng được khả năng scaling, networking và khả năng quản lí truy cập của AWS. Và nó giúp cho Job chạy an toàn và bảo mật khi job đó có nhận và ghi dử liệu vào các AWS resource như S3, Amazon DynamoDB
    * Cost optimized resource provisioning: Aws Batch sẽ tính toán tài nguyên và phân phối dựa trên các job đã submit. Nó có thể tự động scale để có thể đáp ứng được resouce cho job thay vi phải fix cứng. Ngoài ra Aws Batch sẽ tận dụng để thể sử dụng Spot instance để giảm thiếu chi phí cho người dùng.
    * Hỗ trợ xử lí job kết hợp hoặc parallel

* **Chi phí**: Việc sử dụng Batch sẽ không tốn thêm bất kì chi phí nào cho service này. AWS chỉ tính phí dựa trên các resource mà job đã sử dụng

### 2. Các thành phần
* **Job**: Job là một đơn vị công việc(như thực hiện một script, thực hiện 1 lệnh linux,..) mà ta đã submit cho AWS Batch. Job đều có tên và chạy giống dưới dạng là một docker container trên AWS Farage hoặc EC2 resources. Ta có thể config các job phụ thuộc lẫn nhau.
* **Job queue**: Khi submit một job thì job đó sẽ được đưa queue tương ứng, ở đây job sẽ được đặt lịch để được run. Tùy vào độ ưu tiên hay tính chất công việc của job để setting job queue phù hợp cho mỗi job. Ví dụ nếu job có độ ưu tiên cao thì setting vào job queue có priority cao và ngược lại.
* **Compute environment**: Dùng để định nghĩa các thứ liên quan đến tài nguyên máy tính mà job sử dụng để thực hiện như sử dụng Farage hay EC2 resource, On-demain hay loại Spot, dụng lượng bộ nhớ bao nhiêu. Các cài đặt về network như VPC, security group. Hình dung đơn giản là bạn chọn tài nguyên kiểu gì(tài nguyên ở đây nôm na như 1 cái máy tính) để đặt job vào đó chạy
* **Job defination**: Dùng để định nghĩa các thứ liên quan đến job như chiến lực retry(khi nào thì retry, ví dụ status code 400), thời gian timeout của job. Các định nghĩa về container như image, role(aws role như role upload ảnh lên S3,...).


=> Lí thuyết khá dài dòng. Ta bắt đầu demo để hiểu hơn nhé!
### 3. Demo - Tạo batch đơn giản
* Tạo Compute enviroment: https://console.aws.amazon.com/batch/home?region=us-east-1#compute-environments/new
    
    ![](https://images.viblo.asia/3db6d6bd-721a-47ed-8809-743bfb1dd921.png)

        
* Tạo Job queue:
    ![](https://images.viblo.asia/c3093280-f07c-46f0-937d-1d679bd0e094.png)

* Tạo Job defination:
    ![](https://images.viblo.asia/3a8feaee-cceb-457a-9bc6-9cac3e8abcf1.png)


* Submit Job:
   ![](https://images.viblo.asia/82804b13-caff-4f46-b538-74c473a6db94.png)

=> Sau khi submit job xong thì quay trở lại trang jobs để kiểm tra trạng thái của job nhé.

* Như hình dưới thì job đã run SUCCESS. Mọi người click vào job để xem chi tiết hơn.
![image.png](https://images.viblo.asia/ff83c116-bc65-477f-bb20-7e75e88a0ee3.png)

* Trang detail: Ở đây ta có thể thấy được thời giạn thực thi job là bao lâu, log được ghi vào file nào.

![image.png](https://images.viblo.asia/5c9b7285-caaa-440a-b9b9-477947ed351f.png)

* Xem log: Truy cập vào Cloud Watch log ở log stream name để xem log job.

![image.png](https://images.viblo.asia/fa2397fc-9aab-4951-90c8-4bac6d6e1394.png)

=> Như vậy là job đã run thành công. :heart_eyes::heart_eyes:

Qua phần 1 hy vọng mọi người có cái nhìn tổng quát hơn về AWS Batch. Phần sau mình sẽ demo vào dự án rails để thấy thực tế hơn. Hẹn mọi người bài sau nhé. :blush::blush:

Happy Coding!!!