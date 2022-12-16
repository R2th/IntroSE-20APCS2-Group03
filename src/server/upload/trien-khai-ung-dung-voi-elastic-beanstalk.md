Bạn đang tìm kiếm 1 nơi để triển khai ứng dụng của bạn mà vẫn chưa biết lựa chọn ở đâu? Việc chọn các host trong nước thì lại lo sợ việc kết nối hoặc chết bất cứ lúc nào? Tìm Cloud thì lại khó sử dụng? Tại sao không sử dụng service của amazon nhỉ? Với Elastic Beanstalk, bạn chỉ cần up code lên, việc còn lại cứ để amazon lo, đảm bảo đơn giản và dễ dàng như việc thuê host trong nước vậy.

## 1. Elastic Beanstalk là gì?
Khi bạn muốn triển khai 1 ứng dụng của mình, bạn sẽ phải phân vân lựa chọn từng tiêu chí, chi tiết từ server, cân bằng tải, database, domain, mô hình kết nối ra sao, cách thức hoạt động, việc build môi trường hay việc deploy như thế nào cho đảm bảo được ứng dụng. Lại còn phải có người maintain hệ thống. Nói chung là rất mất công sức và thời gian.
Để đơn giản hóa tất cả công việc trên thì amazon đưa ra service Elastic Beanstalk (EB). Thay vì phải tự mình build môi trường hay maintain hệ thống, Elastic Beanstalk sẽ giúp mình làm tất cả các công việc kể trên. 


![](https://images.viblo.asia/536f3a65-b62f-4bf8-9fc8-c13ec6e3c171.png) 

Thật đau đầu khi phải nghĩ thiết kế hệ thống như thế này phải không?


Hiện tại EB hỗ trợ khá nhiều platform khác nhau như: Go, Java SE, Java with Tomcat, .NET on Windows Server with IIS, Node.js, PHP, Python, Ruby. Nên các bạn cũng có thể cân nhắc khi sử dụng nhé.

## 2. Elastic Beanstalk hoạt động như thế nào?
Elastic Beanstalk sẽ tạo một ứng dụng (application), tải lên một phiên bản ứng dụng (version) dưới dạng một gói nguồn ứng dụng (file .zip hay .war) đến Elastic Beanstalk, và sau đó cung cấp một số thông tin về ứng dụng. Elastic Beanstalk tự động khởi chạy một môi trường và cấu hình các tài nguyên AWS cần thiết để chạy code của bạn. Sau khi môi trường (environment) của bạn được khởi chạy, bạn có thể quản lý môi trường của mình và triển khai các phiên bản ứng dụng mới. Sơ đồ sau minh họa quy trình làm việc
![](https://images.viblo.asia/fcc37f99-12d8-4caf-86fd-b0bca014f0a1.png)

## 3. Các thành phần trong Elastic Beanstalk
- Application: tương tự như 1 thư mục trong Elastic Beanstalk. Ở đó chứa các thành phần của EB như môi trường (environment), phiên bản (vesion) và cấu hình môi trường (environment configuration).
- Application version: Là hệ thống các phiên bản khi người dùng deploy lên. Application version sẽ được chỉ định tới Amazon S3 object tương ứng - nơi mà lưu code được deploy trên đó.  
- Environment: là phiên bản được triển khai trên tài nguyên AWS. Mỗi môi trường chỉ chạy một phiên bản ứng dụng duy nhất tại một thời điểm, tuy nhiên bạn có thể chạy cùng một phiên bản hoặc các phiên bản khác nhau trong nhiều môi trường cùng một lúc. Khi bạn tạo một môi trường, Elastic Beanstalk cung cấp các tài nguyên cần thiết để chạy phiên bản ứng dụng mà bạn đã chỉ định.
- Environment Configuration: là các cấu hình của 1 môi trường. Ở đó sẽ có các thiết lập như dạng EC2, VPC, Load balancing, Auto Scale, monitor ...

Với môi trường, EB sử dụng 2 môi trường chính (Phần này chỉ có khi các bạn chọn tạo mới 1 application mà không dùng Get start từ EB):
- Web server environment: các server sẽ trực tiếp chạy web.
![](https://images.viblo.asia/17c1743c-a50f-4308-bee2-f0d3ad8f6e6e.png)

- Worker environment: các server sẽ xử lý thêm các tác vụ ngầm, được đưa vào SQS và đẩy vào server để xử lý sau đó đẩy dữ liệu lên tầng web app. 
![](https://images.viblo.asia/af0773b0-186d-46d8-8cac-d72fc514afcb.png)

## 4. Sử dụng Elastic Beanstalk
Ở phần này, mình sẽ hướng dẫn các bạn chi tiết các bước để tạo và quản lý EB.
- Chú ý: Trước khi bắt đầu với EB, các bạn cần phải tạo 1 VPC để đẩy application của các bạn vào đấy. Cùng với tạo key để có thể ssh vào server deploy nhé.
VPC là gì thì mình có thể tóm tắt qua nó là 1 hệ thống network của aws. giống như mạng local ở nhà hoặc công ty vậy. Chi tiết thì các bạn tìm hiểu thêm tại [đây](https://aws.amazon.com/vpc/?sc_channel=PS&sc_campaign=Acquisition_VN&sc_publisher=google&sc_medium=english_vpc_b&sc_content=aws_vpc_e&sc_detail=vpc%20aws&sc_category=vpc&sc_segment=208328046174&sc_matchtype=e&sc_Country=VN&s_kwcid=AL!4422!3!208328046174!e!!g!!vpc%20aws&ef_id=Wn227wAAAGuZvTCT:20180603155955:s) nhé.
    - Tạo VPC: Chọn Start VPC Wizard nhé ![](https://images.viblo.asia/cc073aee-6c6e-41c4-b312-4eb780f8424f.png)
    - Select VPC with a single subnet ![](https://images.viblo.asia/f3babcfd-9ada-4e3c-b508-4cf8e6f8c047.png)
    - Tạo VPC với các config ![](https://images.viblo.asia/ca1b4281-e4e3-47b1-81d5-63236e57b394.png)
    - Xong bước tạo VPC đơn giản rồi. Vậy là ta đã có 1 mạng ảo để EB làm việc trong đó.
    - Bước tiếp theo là tạo key để ssh: Vào Service -> EC2  -> Key Pairs -> Create key pairs ![](https://images.viblo.asia/1c13fdac-876e-4098-b9ea-5d6a2cc77133.png) Sau khi tạo xong, các bạn sẽ được down 1 file key **.pem** về. hãy giữ cẩn thận nhé
- OK. Giờ vào việc chính của chúng ta. Tất nhiên đối với các dịch vụ của amazon web service, các bạn phải tạo 1 account để làm việc được trên đó đã. Khi đã có account, các bạn có thể tạo EB với link  [này](https://console.aws.amazon.com/elasticbeanstalk) . Click vào **Get Start** để bắt đầu 
![](https://images.viblo.asia/5245a967-48d5-4c24-a802-55ce696d857f.png)
- Bạn điền tên app, chọn platform tương ứng (node.js, PHP, ruby ...) và upload code của mình lên (nén dưới dạng file zip hoặc war)
![](https://images.viblo.asia/d3c97a7c-2a73-4115-84a4-2b0a312f5ee8.png)
1 chú ý nho nhỏ phần này là: với folder code thì các bạn phải thực hiện nén trực tiếp ở folder root nhé. VD nén file rails-default.zip:
    ```
    ~/eb-rails$ zip ../rails-default.zip -r * .[^.]*
    ```
    Ở đây mình làm demo với PHP, file mình up lên chỉ có 1 file index.php và code đơn giản: **hello world v1!**
- Sau khi upload xong, các bạn có 2 lựa chọn. 1 là **Create application** thì EB sẽ tạo luôn application cho các bạn dựa trên config default. 2 là các bạn chọn tiếp **Configure more options** để tự tùy chỉnh. Ở phần này mình lựa chọn 2 nhé. Lưu ý: có thể thay đổi config sau khi đã tạo xong environment các bạn nhé.
-  Mặc định EB sẽ tạo cho các bạn với option **Low cost (Free Tier eligible)** . Chúng ta sẽ chuyển sang **Custom configuration** để tùy chỉnh nhé. Mình sẽ giới thiệu chi tiết cho các bạn biết về chức năng của từng cấu hình.
    -  Phần **Software** chứa những tham số về phần setting PHP (do mình chọn platform là PHP). Ngoài ra có thêm: 
        -  S3 log storage: cho phép s3 tự cắt log theo ngày/tuần/tháng 
        -  Instance log streaming to CloudWatch Logs: cho phép server stream log ứng dụng lên cloudwatch log
            -  Log streaming: cho phép stream log
            -  Retention: thời gian xóa log
            -  Lifecycle: xóa hay giữ lại log khi terminate environment
    -  ![](https://images.viblo.asia/506b3f1a-a786-4afa-bf2c-45678db3eeba.png)
    -  Phần **Instances** chứa thông tin của server
        -  Instance type: loại server. tham khảo [link](https://aws.amazon.com/ec2/instance-types/)
        -  AMI ID: loại OS của server
        -  Root volume: container / magnetic / SSD 
        -  EC2 security groups: 1 loại firewall của server. mở port nào cho server ... Nếu các bạn không chọn, mặc định EB sẽ tạo ra 1 security group cho phép allow ssh và 80 hoặc 443 (tương ứng với port listen của web)
    - ![](https://images.viblo.asia/512e07ca-24a2-4420-8e80-73aaec5e2298.png)
    - **Capacity** liên quan tới auto scale của server
        - Auto Scaling Group: 
            - Environment type: Single / Load balanced (các bạn nên chọn Load balanced để đảm bảo HA cho ứng dụng)
            -  Instance: số lượng min/max trong auto scale
            -  Availability Zones: số lượng AZ sử dụng
            -  Placement: Chỉ định AZ dùng
        -  Scaling trigger: cho phép scale dựa vào CPU. CPU > 80% trong 5 phút sẽ thêm 1 server. CPU < 20% trong 5 phút thì loại bỏ 1 server.
            -  Metric: CPU
            -  Statistic: Avarage
            -  Unit: Percent
            -  Period: 5 min
            -  Breach duration: 5 min
            -  Upper threshold: 80
            -  Lower threshold: 20
    -  ![](https://images.viblo.asia/b9e912f1-7617-411d-9219-73e75568a8ac.png)
    -  **Load balancer**: có 2 lựa chọn: classic Load balancer (dòng LB cũ - không khuyên dùng) và Application Load Balancer (routing HTTP and HTTPS). Phần này sẽ có port của LB (Application Load Balancer), Health check LB (processes) và route request tới backend server (rules)
    -  ![](https://images.viblo.asia/34cb8832-a546-4ec9-b797-6adfc84e5665.png)
    -  **Rolling updates and deployments**: phần deploy mà nhiều bạn quan tâm. 
        -  All at once: deploy version mới đến tất cả các server cùng 1 lúc [All at once](https://gyazo.com/c736caa3f2828ede5ce0befd19d7f595)
        -  Rolling: deploy version mới ở từng batch [Rolling](https://gyazo.com/91c82ba3dd1fd454d0f29bf3eb21a008)
        -  Rolling with additional batch: deploy ở từng batch và thêm 1 batch mới [Rolling with additional batch](https://gyazo.com/fb1d64b1b0f03c889739fcd436f9998f)
        -  Immutable: deploy tới 1 group server hoàn toàn mới [Immutable](https://gyazo.com/3d2bc8e5da414e9a96bfecb0452fb529)
        -  Configuration updates: Elastic Beanstalk chờ đợi sau khi nó kết thúc cập nhật một loạt các server trước khi chuyển sang batch khác. 
            -  Rolling based on Health - Chờ cho đến khi các server healthy trước khi bắt đầu đợt tiếp theo.
            -  Rolling based on Time - Chỉ định một khoảng thời gian chờ đợi giữa giữa các lần update
            -  Immutable - Áp dụng thay đổi cấu hình cho một nhóm server mới bằng cách thực hiện immutable update
        -  Deployment preferences: việc deploy có thể bỏ qua health check và thời gian timeout mỗi lần deploy
    -  ![](https://images.viblo.asia/d6e98045-8fc4-449a-bae8-ee92d74ee0f4.png)
    -  **Security**
        -  Service role: role mà EB thực hiện để sử dụng các service khác (default)
        -  EC2 key pair: key bạn vừa tạo ở trên
        -  IAM instance profile: Role cho server kết nối tới các service khác (default)
    -  ![](https://images.viblo.asia/e640e7f8-3418-491c-8e5d-0a82d7f36cf6.png)
    -  **Monitoring**
        -  Health reporting: các thông tin cần monitor real time
        -  Health event streaming to CloudWatch Logs: stream các event log về healthy lên cloudwatch log.
    -  ![](https://images.viblo.asia/7dc05947-ca91-46ac-bcbd-a4d9ad67faef.png)
    -  **Notification** mail mà bạn muốn nhận các thông báo mỗi khi có event quan trọng
    -  ![](https://images.viblo.asia/e528e5e8-5466-429a-9d29-ce38b948ed85.png)
    -  **Network** 
        -  VPC muốn sử dụng
        -  Load balancer settings: chọn subnet cho LB (phải là subnet public)
        -  Instance settings: chọn subnet cho server
    -  ![](https://images.viblo.asia/54c0afd1-fe1e-4d5d-abd2-00723f2f89e4.png)
    -  **Database** thông tin chi tiết về DB bạn muốn sử dụng:
        -  Restore a snapshot: nếu bạn có snapshot của DB trước đó. bạn có thể sử dụng tính năng này
        -  Database settings: engine, version, instance type, storage, username, password, retention, AZ
    
        ![](https://images.viblo.asia/846e991a-bc95-4a20-a65e-e16bc4599102.png)
    -  **Tag** ![](https://images.viblo.asia/103a8ef6-80b5-49c6-89fa-89c5015b5dc5.png).
-  OK. Giờ là lúc tiếp tục tạo app.

    ![](https://images.viblo.asia/f0c89af7-8e6b-470f-acd1-e2bc4f79770f.png) Đây là quá trình tạo app. Quá trình này diễn ra tùy thuộc vào config của bạn: loại server chạy, loại DB, LB ... Giờ quay sang đọc báo thôi đợi app của mình tạo xong nhé các bạn. Có 1 điểm đặc biệt nho nhỏ ở đây là không phải EB tự mình đi build tất cả 1 các thành phần như trong config. Mà ở đây, việc dựng môi trường sẽ do Amazon CloudFormation đảm nhiệm. Các bạn có thể check trong hoặc sau quá trình build xong app, vào CloudFormation sẽ thấy 1 stack xuất hiện. Đó chính là tất tần tật môi trường của bạn ở đó đấy :D
-  Quay trở lại với EB, sau 1 thời gian build thì các bạn có thể thấy trạng thái app đã healthy. Check web nào ![](https://images.viblo.asia/8674b181-777b-4ffd-8404-ec84add6c21f.png) 
-  và đây là kết quả 

    ![](https://images.viblo.asia/010601cd-cf13-4f37-80de-adbda6465918.png)
-  Nào giờ deploy tiếp version 2 xem thế nào nhỉ. Các bạn lại nén lại và up code lên thôi 
![](https://images.viblo.asia/0b7708fb-7c9a-4d58-9f97-16fd808310b8.png)
![](https://images.viblo.asia/dac2c701-d49d-4be3-a980-ca9147e404b8.png)
- đợi 1 lúc và status đã OK
![](https://images.viblo.asia/58b9b171-8c0c-481f-b4da-c67037ae143e.png)
- kết quả 

    ![](https://images.viblo.asia/c29cdb85-8862-414a-a0e6-0d7db17a4a28.png)

- Việc control version trên EB rất đơn giản. Các bạn có thể check version của app đã được deploy 

    ![](https://images.viblo.asia/abefd573-c190-4e78-a176-4982b848b862.png)
    
- Trong t/h deploy bị lỗi, các bạn có thể restore lại những version đã deploy lên đó theo environment 

    ![](https://images.viblo.asia/22d5d1ae-7cd0-46b3-a271-ab8a699dd6a1.png)
    
- Lưu ý: 1 số giới hạn trên EB: Application version: 1000, Application: 75, Environments: 200. Các bạn chú ý trong quá trình sử dụng nhé.

1 số nguồn tham khảo: 
- https://www.slideshare.net/AmazonWebServices/deploy-scale-and-manage-your-application-with-aws-elastic-beanstalk
- https://aws.amazon.com/documentation/elastic-beanstalk/