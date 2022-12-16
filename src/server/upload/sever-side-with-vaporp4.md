# 1.Giới thiệu và chuẩn bị cho quá trình deploy:
* Vapor Cloud là một platform as a Service(PaaS) được phát triển bởi Vapor team với mục đích hosting cho Vapor app. Nó được thiết kế cho việc dễ dàng config với server và quản lý việc deploy nên bạn có thể tập trung vào việc viết code.
* Việc đầu tiên trong quá trình deploy app của bạn lên vapor cloud là bạn phải đăng ký account cho quá trình này.Hãy cùng truy cập trang web: https://dashboard.vapor.cloud/login và làm theo tiến trình đăng ký:
![](https://images.viblo.asia/e2ab13ba-8def-4bac-8fac-d3573627bba9.png)
* Trước khi có thể sử dụng Vapor Cloud, chúng ta sẽ phải configure app . Vapor Cloud sẽ được config trong file cloud.yml trong cùng folder project của các bạn. Chúng ta sẽ config file cloud.yml như sau:
```swift
# 1
type: "vapor"
# 2
swift_version: "4.1.0"
# 3
run_parameters: "serve --port 8080 --hostname 0.0.0.0"
```
* Đây là tác dụng của những config sau:
1. Chỉ rõ target vapor app.
2. Chỉ rõ version swift để build project.
3. Chỉ rõ parameters cần thiết để chạy app.
# 2.Deploying to Vapor Cloud:
* Giờ chúng ta sẽ cùng deploy application. Mở terminal lên và add dòng lệnh sau:
```swift
vapor cloud login
```
* Quá trình này sẽ yêu cầu chúng ta đăng nhập account đã đăng ký ở Vapor Cloud:
![](https://images.viblo.asia/4000016c-ad63-4dc4-bf27-8f86daae36ee.png)
* Tiếp đến sẽ là quá trình deploy, chúng ta sẽ add thêm dòng lệnh sau vào terminal:
```swift
vapor cloud deploy
```
**(Lưu ý ở đây là chúng ta sẽ dùng ssh url)**
* Vapor Cloud sẽ đọc local responsitory của bạn đầu tiên. Bởi vì app được xây dựng từ template, không có remote respository được config.Vapor sẽ hỏi nếu bạn muốn set up remote nên hãy ấn y và Enter:
![](https://images.viblo.asia/e1d63537-007f-4ce3-ba83-e0c48054acd8.png)
* Tiếp đó hãy tạo repository trên github cá nhân của bạn với tên là vapor-til và copy github origin url ssh của bạn:
![](https://images.viblo.asia/4fa0bd1b-ffd4-46f4-b6ca-aff685f5dc57.png)
* Điều này sẽ xác nhận việc bạn sẽ push lên remote github mới.
# 3. Khởi tạo project và app trong deploy:
* Tiếp đến Vapor Cloud sẽ hỏi bạn việc tạo application. Ấn y và Enter.* * Trước khi bạn tạo một application, bạn phải tạo project cho app đó.Ví dụ: TIL project bao gồm TIL API application và TIL website application. Khi được hỏi tạo một project hãy ấn y và Enter:
![](https://images.viblo.asia/7d28967e-1c50-49a3-a632-e79feff4cc4c.png)
* Ngay sau đó, Vapor Cloud sẽ hỏi bạn chọn organization để sở hữu project. Đây là organization mà bạn đã đăng ký. Chọn organization và ấn 1 + Enter:
![](https://images.viblo.asia/5e029606-4453-43af-af1a-51571e8c85e6.png)
* Sau khi chọn xong, Vapor Cloud sẽ hỏi bạn tên của project. App chúng ta đã đặt tên TIL vậy hãy xác nhận tên app này trong terminal. Gõ y + Enter:
![](https://images.viblo.asia/b208b1ff-4af4-41f3-9016-33ed3ef4b16e.png)
![](https://images.viblo.asia/22eb67fc-313a-46a7-b23a-2ee4602ded7a.png)
# 4. Setting up hosting:
* Công việc tiếp theo Vapor sẽ hỏi bạn có muốn add hosting service không? Hosting servier sẽ cho phép bạn deploy code đến Vapor Cloud. Vậy nên hãy ấn y + Enter:
![](https://images.viblo.asia/a599b4c0-2d3d-4225-9a42-ed1d22bb0070.png)
(Chú ý: Nếu bạn sử dụng private git repository, bạn phải add SSH key vào Vapor Cloud. Bạn có thể tham khảo: https://docs.vapor.cloud/advanced/general/using-private-git/)

# 5. Setting up enviroments:
* Một khi bạn đã config hosting xong, Vapor Cloud sẽ yêu cầu bạn set up enviroments. Một application có thể có nhiều enviroment sử dụng với nhiều mục đích khác như test, product....Trong Vapor Cloud thì production sẽ là default.Vậy khi Vapor hỏi thì chúng ta sẽ xác nhận bằng cách gõ y + Enter:
![](https://images.viblo.asia/3848ff4a-8679-403f-b788-b8b68256cec6.png)
* Mỗi enviroment có thể sử dụng những git branch khác nhau. Ở đây chúng ta sẽ sử dụng branch master.
* Khi bạn đã config enviroment xong, bạn phải chọn replica size cho enviroment đó. Replicas là hardware cho aoo của bạn. Replica càng lớn thì hiệu suất và memory càng lớn. Ở đây chúng ta sẽ chọn Free. 
![](https://images.viblo.asia/408d8081-012d-4f6c-bb7b-480707ee8b3c.png)
* Tiếp theo, Vapor Cloud sẽ hỏi bạn có muốn config database không? Application chúng ta đang sử dụng SQLite database nhưng database chưa bắt buộc vào thời điểm này nên chúng ta gõ n + Enter:
![](https://images.viblo.asia/66f220bb-1fc4-43a9-bc15-2c919d325503.png)
* Ở phần cuối cùng là build type. Vapor Cloud sẽ đề nghị chúng ta 3 lựa chọn. Ở đây chúng ta sẽ chọn 3 + Enter:
![](https://images.viblo.asia/8c72f86a-443b-4ad9-8997-ee2e4b2e712d.png)
# 6. Build, deploy và test:
* Cuối cùng, Vapor Cloud sẽ hỏi bạn những xác nhận trên có đúng không? Gõ y + Enter:
![](https://images.viblo.asia/70b2feef-56a8-4a09-a1f4-b7e977fdd896.png)
* Việc còn lại cứ việc giao cho Vapor Cloud lo, chúng ta nên trà bánh và đợi chờ trong ít phút này. Khi hoàn thành chúng ta sẽ có những xác nhận sau từ terminal:
![](https://images.viblo.asia/8a93b556-ffd7-41b1-abe4-636b90a22c0f.png)
* Ở ví dụ này chúng ta sẽ sử dụng slug = userchoice nên url của application là https://ueserchoice.vapor.cloud
* Để test chúng ta sẽ tiếp tục sử dụng phần mềm RESTed với thiết lập như sau:
![](https://images.viblo.asia/44a3464b-c11d-4bbf-ac24-71f0683b89ab.png)
* Vậy là chúng ta đã cùng nhau trải nhiệm công việc deploy trên Vapor. Đây là công việc không quá khó nhưng rất dễ nhầm lẫn do đó với những ví dụ này chúng ta sẽ cùng nhau đi chậm để có thể thu được kết quả tốt nhất.