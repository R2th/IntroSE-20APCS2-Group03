Phần 1: [.Net Core API Project With EF6 code first, Responsitory Design Partern](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-GrLZDw0BKk0)

Phần 2: [.Net Core API Project With EF6 code first, Responsitory Design Partern - P2 - Create Repository](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p2-create-repository-djeZ1V2GlWz)

Phần 3: [Net Core API Project With EF6 code first, Responsitory Design Partern - P3 - Create Configuration from database](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p3-create-configuration-from-database-OeVKBywM5kW)

Phần 4:[Net Core API Project With EF6 code first, Responsitory Design Partern - P4 - Sử dụng JWT để thực hiện Authorization.](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p4-su-dung-jwt-de-thuc-hien-authorization-gGJ59jmDKX2)

Phần 5:[Net Core API Project With EF6 code first, Responsitory Design Partern - P5 - Create Dynamic Authorization Policy.](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p5-su-dung-jwt-de-thuc-hien-authorization-part-2-gGJ59jD1KX2)

Phần 6:[Net Core API Project With EF6 code first, Responsitory Design Partern - P6 - Handle midware](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p6-handle-midware-V3m5Woxg5O7)

Như vậy sơ bộ chúng ta đã có đủ 1 API để có thể hoạt động rồi, bây giờ chúng ta sẽ thực deploy nó thôi :D

# Chuẩn bị.
### Server
Chúng ta sẽ thực hiện deploy lên Centos nên đầu tiên là chúng ta sẽ cần chuẩn bị 1 server Censtos với các thống số sau:
 - Centos version >=7
 
 Hiện mình đang sử dụng dịch vụ của OceanDigital để tạo một server, với giá là 5$/ tháng
 
 ![](https://images.viblo.asia/5f23da8e-959d-4c59-a8c9-80be4d8548c7.PNG)
 
 Server sẽ được cấu hình như sau
 
 - Ở mục **Choose an image** thì chúng ta chọn server là Centos 7.5x64
 
 ![](https://images.viblo.asia/44330355-d762-48be-bd3c-b99173bddfad.PNG)
 
 - Ở mục **Choose a size** chúng ta chọn cấu hình cho server, tùy vào mục đích sử dụng mà các bạn sẽ chọn loại nào cho hợp nhé, ở đây là ví dụ nên mình sẽ chọn gói rẻ nhất

 ![](https://images.viblo.asia/5f23da8e-959d-4c59-a8c9-80be4d8548c7.PNG)
 
 - Bỏ qua các mục tiếp theo chúng ta đến với mục **Choose a datacenter region**, ở mục này chúng ta sẽ chọn quốc gia gần chúng ta nhất để có tốc độ cao nhất nhé, trong trường hợp của mình là mình sẽ chọn **Singapore**
 
 ![](https://images.viblo.asia/9c3df2a7-b4c8-44b6-a2d6-d9399e0b6f70.PNG)
 
 - Tiếp theo chúng ta sẽ setup SSH để connect vào server. Để add mới ssh key các bạn click button **New SSH Key** và paste public key vào nhé.
 
 ![](https://images.viblo.asia/e5f20919-b077-461f-bbab-cdfb92746419.PNG)
 
 - Cuối cùng chúng ta đặt tên cho server thôi, đặt sao cho dễ nhớ vì nếu chúng ta quản lý nhiều server thì việc đặt tên là rất quan trọng. Sau khi đặt tên thì các bạn click button **Create** và đợi cho server được tạo.

Kết quả như sau:
![](https://images.viblo.asia/d7fa045d-f22d-4d71-90fe-df163feeae1e.PNG)

### Các tool phục vụ cho Deploy
 - GitBash:
     [Download GitBash tại đây](https://git-scm.com/downloads) do mình quen sử dụng các comand như bên ubuntu nên mình sử dụng GitBash cho dễ thao tác, ngoài sau này mình sẽ sử dụng Git như một tool để việc quản lý các version deploy nên GitBash là một sự lựa chọn tuyệt vời
 - WinSCP:
     [Download WinSCP  tại đây](https://winscp.net/eng/download.php) Nếu bạn nào đang dùng windows thì nên sử dụng tool này, vì nó khá là thuận lợi cho việc remote lên server để xem logs cũng như thao tác bằng chuột hơn
###  Chuẩn bị 1 Git Repository
Vì sao Deploy lại sử dụng Git:
 - Để quản lý các version Deploy một cách đơn giản và nhẹ nhàng nhất, mỗi lần chúng ta Deploy chúng ta chỉ cần push code lên, thêm một message là chúng ta có thể biết thời điểm nào deploy cho vấn đề gì.
 - Việc deploy đơn giản hơn khi chúng ta sử dụng Pull và Push ko phải copy bằng tay giảm tải tối đa việc miss file

     ![](https://images.viblo.asia/1f2c98e8-259a-4230-835e-8d987c6ff96d.PNG)

#  Publish Project
OK Chúng ta giờ sẽ tiến hành publish API để chuẩn bị cho deploy thôi.
Step Publish như sau:
 - Nháy phải vào **SampleNetCoreAPI** 
 - Chọn **Publish**
 - Click **Start**
 - Ở Menu trái chọn **Folder**
 - Chọn folder publish và Click **Publish**

![](https://images.viblo.asia/7cb6be67-0ffe-45c7-a756-b40c78380794.PNG)

# Setup Git Deploy
- Đầu tiên chúng ta sẽ tạo 1 folder để chứa Git Repository, mình đang đặt là **D:\DeploySample**
- Truy cập folder vừa tạo và nháy phải chọn GitBash
```
echo "# NetCoreAPISampleDeploy" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:dattx1/NetCoreAPISampleDeploy.git
git push -u origin master
```
Ok vậy là Git Init thành công

![](https://images.viblo.asia/795ad6cf-02fd-47f3-bb67-603c35dddbf6.PNG)

Tiếp tục chúng ta copy toàn bộ file từ thư mục Publish vào thư mục **D:\DeploySample**

![](https://images.viblo.asia/e6ac43dd-14e3-4fdd-b94f-6c1c0a10b45b.PNG)

thực hiện push code
```
git add .
git commit -m "First Deploy"
git push origin
```

![](https://images.viblo.asia/68165294-3101-4242-a35a-54274ac4e455.PNG)

Ok vậy là mọi thứ đã sẵn sàng, buổi sau chúng ta sẽ cùng setup server để có thể chạy được .Net Core 2.0 nhé cả nhà.