Nếu bạn là quản trị viên hệ thống và được giao nhiệm vụ nâng cấp package cho ứng dụng chạy trên EC2, nhưng do một số hạn chế về bảo mật, bạn lại không được phép truy cập vào instance production thông qua SSH hoặc bastion. Trong trường hợp này, bạn có thể sử dụng AWS Systems Manager để chạy các tập lệnh shell hoặc một số lệnh nhất định để cập nhật các package trên các EC2. Trong bài chia sẻ này, mình sẽ trình bày mọi thứ bạn cần biết về AWS Systems Manager và cách sử dụng nó!

![](https://images.viblo.asia/3716d8e0-f35a-496a-a978-ea0d83218592.png)

Trong blog này, chúng tôi sẽ đề cập đến:
* AWS System Manager là gì và nó hoạt động như thế nào?
* Lợi ích của nó là gì?
* SSM Agent, Run Command và SSM Document là gì?
* Các khả năng của AWS System Manager
* Ai có thể sử dụng AWS Systems Manager?
* Các công ty sử dụng AWS System Manager
* Thực hành - Chạy lệnh trên EC2 bằng AWS System Manager
* Phần kết luận

## AWS Systems Manager là gì và nó hoạt động như thế nào?

![](https://images.viblo.asia/722743b4-dc78-42be-ab5c-9ee21bc85d99.png)

AWS Systems Manager cung cấp cho người dùng khả năng hiển thị và kiểm soát cơ sở hạ tầng trên AWS. Nó có giao diện để người dùng có thể xem dữ liệu hoạt động từ nhiều dịch vụ AWS và cho phép người dùng tự động hóa các tác vụ hoạt động trên các tài nguyên AWS. Systems Manager có thể nhóm các tài nguyên, chẳng hạn như Amazon EC2 instance, Amazon S3 bucket hoặc Amazon RDS instance. Chúng ta có thể xem dữ liệu hoạt động ntn, từ đó có thể theo dõi và khắc phục sự cố cũng như  thực hiện các hành động trên các nhóm tài nguyên.

Systems Manager đã đơn giản hóa việc quản lý tài nguyên và ứng dụng, rút ngắn thời gian phát hiện và giải quyết các vấn đề hoạt động, đồng thời giúp dễ dàng vận hành và quản lý cơ sở hạ tầng một cách an toàn trên quy mô lớn.

![](https://images.viblo.asia/1c83cdf1-fb57-4c35-ba3e-d8c215d7d22f.png)

## Lợi ích nó mang lại là gì ?

**Quản lý môi trường hybrid**

AWS System Manager giúp quản lý tài nguyên cho các hệ điều hành Windows, Linux và Mac chạy trên Amazon EC2 hoặc on-premises. Nó cung cấp trải nghiệm quản trị nhất quán trên các máy chủ, giúp dễ dàng cấu hình và kiểm tra logs, thao tác với các khóa đăng ký, điều hướng hệ thống tệp, cập nhật quyền truy cập của người dùng và giám sát các chỉ số quan trọng.

**Nhanh chóng phát hiện sự cố**

Kiểm tra nhanh dữ liệu hoạt động cho các nhóm tài nguyên, cho phép xác định bất kỳ vấn đề nào có thể ảnh hưởng đến các ứng dụng sử dụng các tài nguyên đó. Systems Manager hiển thị dữ liệu hoạt động cho các nhóm tài nguyên trong một bảng điều khiển duy nhất, dễ dàng đọc mà không cần phải điều hướng đến bảng điều khiển AWS khác.

**Security và Compliance Maintenance**

Systems Manager cung cấp store tập trung để quản lý dữ liệu cấu hình, cho dù đó là plain text, chẳng hạn như chuỗi cơ sở dữ liệu hay secrets, chẳng hạn như mật khẩu. Bạn có thể quản lý từ xa các máy chủ của mình trên quy mô lớn mà không cần đăng nhập thủ công vào từng máy chủ. Và xác định cơ sở các phiên bản update, duy trì việc cập nhật các định nghĩa chống vi-rút, và thực thi các chính sách tường lửa.

**Tự động hóa một cách dễ dàng**

Sử dụng tự động hóa được xác định trước có mô tả bằng văn bản, vì vậy bạn có thể giảm thiểu lỗi của con người và đơn giản hóa các tác vụ bảo trì và triển khai trên tài nguyên AWS và xây dựng sổ tay của riêng bạn để chia sẻ cho các tác vụ hoạt động phổ biến như dừng và khởi động lại phiên bản EC2. Quản lý hệ thống cũng có các kiểm soát an toàn tích hợp, cho phép bạn triển khai từng bước các thay đổi mới và tự động tạm dừng triển khai nếu xảy ra lỗi.

**Cải thiện khả năng hiển thị và kiểm soát**

Systems Manager được tích hợp với AWS Config cho phép bạn dễ dàng xem các thay đổi trên các tài nguyên của mình khi chúng xảy ra theo thời gian.

## SSM Agent, Run Command & SSM Document

![](https://images.viblo.asia/84ebf61a-8929-466f-95af-6a1844b69827.jpeg)

### SSM Agent

* Đây là phần mềm có thể được cài đặt và cấu hình trên EC2, máy chủ tại chỗ hoặc máy ảo (VM).
* Giúp System Manager có thể cập nhật, quản lý và cấu hình các tài nguyên này. Nó phải được cài đặt trên mỗi instance để sử dụng với Systems Manager.
* Theo mặc định, SSM Agent được cài đặt sẵn trên các phiên bản được tạo từ Amazon Machine Images (AMI) như: Amazon Linux, Amazon Linux 2, Ubuntu Server 16.04, 18.04 và 20.04 ... Trên các AMI khác, chúng ta phải tiến hành cài đặt chúng theo cách thủ công.

Các tác vụ được SSM thực hiện trên các instances được xác định bởi System Manager.

### Run Command

* Giúp chúng ta quản lý từ xa và an toàn cho cấu hình của EC2 instance. Nó cũng giúp cấu hình các môi trường hybrid như máy chủ tại chỗ, máy ảo (VM) và thậm chí cả VM trong các môi trường cloud khác.
* Cho phép bạn tự động hóa các tác vụ DevOps và thực hiện cập nhật cấu hình đặc biệt, bất kể quy mô của bạn ra sao.
* Chủ yếu được sử dụng để cài đặt hoặc khởi động ứng dụng, capture các tệp logs hoặc tham gia các phiên bản trong Windows.

![](https://images.viblo.asia/411f564f-efad-42ca-a88b-547561f93db9.png)

### SSM Document

SSM Document xác định các action mà System Manager thực hiện trên các instance. Các tài liệu sử dụng định dạng JSON hoặc YAML, chúng bao gồm các bước và tham số cần được chỉ định để thực hiện.

Document cho phép chúng ta thực hiện những điều sau:

* Tạo và lưu các instance khác nhau của tài liệu và chỉ định instance mặc định cho mỗi tài liệu SSM.
* Gắn thẻ các tài liệu SSM để nhận dạng tốt hơn.
* Chia sẻ tài liệu bằng cách đặt chúng ở chế độ công khai hoặc chia sẻ với các tài khoản AWS cụ thể khác.

## Khả năng của AWS System Manager

* Operations Management  - Quản lý tài nguyên AWS CloudWatch Dashboard, OpsCenter, Resource Groups, [Trusted Advisor](https://aws.amazon.com/premiumsupport/technology/trusted-advisor/) và [Personal Health Dashboard (PHD)](https://aws.amazon.com/premiumsupport/technology/personal-health-dashboard/).
* Shared Resources - Liên quan đến tài liệu Quản lý Hệ thống (SSM), thông số lưu trữ (đối với dữ liệu cấu hình)
* Actions and Change - Được sử dụng để tự động hóa và bảo trì.
* Instances and Nodes – Dùng cho EC2: cung cấp cấu hình, compliance, quản lý Inventory; quản lý trạng thái; quản lý các bản sửa đổi.

## Ai có thể sử dụng AWS Systems Manager?

Tính năng chính của Systems Manager là làm cho nhiều vai trò có thể được thực hiện một cách dễ dàng. Do đó, dịch vụ này có thể được sử dụng bởi:

* Quản trị hệ thống
* Nhà phát triển phần mềm
* Kiến trúc sư an ninh
* Kiến trúc sư đám mây
* Các chuyên gia CNTT muốn quản lý tài nguyên AWS.

## Các công ty sử dụng AWS Systems Manager

![](https://images.viblo.asia/2b2a467c-ef25-41ed-82a2-d61e81f4df10.jpeg)

## Sử dụng

Hãy tưởng tượng một tình huống trong đó bạn được giao nhiệm vụ bởi trưởng nhóm của bạn để nâng cấp các gói cho ứng dụng đang chạy trên các phiên bản EC2 của bạn. Do một số hạn chế bảo mật, bạn không được phép truy cập trực tiếp vào các phiên bản sản xuất của mình thông qua SSH và thậm chí không được phép sử dụng các máy chủ pháo đài. Trong trường hợp này, hãy sử dụng Amazon Systems Manager để chạy từ xa các tập lệnh shell của bạn hoặc một số lệnh nhất định để cập nhật các gói trên các phiên bản EC2 của bạn.

**Để thực hiện điều này, chúng tôi sẽ làm như sau**:

* Điều hướng đến bảng điều khiển Amazon IAM và tạo một vai trò mới để cấp quyền cho Người quản lý hệ thống thực hiện các hành động trên các phiên bản của bạn.
* Điều hướng đến bảng điều khiển Amazon VPC và bật tự động gán địa chỉ IPv4 công khai.
* Mở bảng điều khiển Amazon EC2 và tạo một phiên bản được quản lý mới với vai trò IAM mới được tạo.
* Kết nối với phiên bản của bạn thông qua EC2 Instance Connect và kiểm tra xem SSM-agent đã được cài đặt trên phiên bản EC2 của bạn chưa.
* Mở bảng điều khiển Trình quản lý hệ thống Amazon và nâng cấp tác nhân SSM trên ví dụ bằng cách Tự động hóa quá trình nâng cấp thông qua bảng điều khiển Trình quản lý nhóm trong Trình quản lý hệ thống của Amazon và / hoặc Chạy theo cách thủ công lệnh được đóng gói trước được gọi là tài liệu thông qua Chạy lệnh trong Trình quản lý hệ thống của Amazon
* Chạy Tập lệnh Shell từ xa để cập nhật các gói trên các phiên bản EC2 được quản lý thông qua thực thi lệnh Linux trên bảng điều khiển Run Command trong bảng điều khiển Trình quản lý hệ thống Amazon.

Đăng nhập vào tài khoản AWS của bạn trên bảng điều khiển AWS và điều hướng đến bảng điều khiển IAM để bắt đầu.

Nhấp vào “Roles” trong phần “Access management” trên ngăn điều hướng bên trái.

![](https://images.viblo.asia/6a37d641-0db1-4a4f-86e1-287c40c3e0cb.png)

Nhấp vào “Create Role” để tạo một role mới. Bạn sẽ sử dụng vai trò này để cấp cho Người quản lý hệ thống của Amazon quyền thực hiện các hành động trên các phiên bản của bạn.

![](https://images.viblo.asia/f5a8ece6-d118-47f5-b4e2-2cc7bc43837c.png)

Chọn “EC2” trong phần “AWS Service” và sau đó nhấp vào “Next: Permissions”.

![](https://images.viblo.asia/a847c95f-0054-4c50-921b-febe2b7dbb18.png)

Tìm kiếm policy “AmazonEC2RoleForSSM” và tick vào checkbox của policy để thêm policy vào role.

Tiếp đó, chúng ta tiếp tục tìm kiếm policy “AmazonSSMManagedInstanceCore” và click vào checkbox để thêm policy vào role nhé. Sau khi hoàn tất, chúng ta click vào “Next: Tags”.

![](https://images.viblo.asia/89a58fbb-0dfe-4c06-bf99-77a95f4ab5b2.png)

Với phần **Tags** này, thì mình sẽ không thêm tag nào nhé mn.

![](https://images.viblo.asia/e59512fc-a833-49d0-8f8c-bbe8c593c025.png)

Sau khi hoàn tất, chúng ta click vào “Next: Review” và nhập tên và mô tả cho role mới được tạo (nếu có). AWS cũng đã input sẵn cho chúng ta mô tả mặc định. Mọi người xem lại các policy được đính kèm với role đã đủ và chính xác chưa, sau đó mình click vào “Create Role”.

![](https://images.viblo.asia/645a5f06-7837-4839-a4d5-811478b0979f.png)

Khi tạo role xong, chúng ta có thể nhập tên role vào thanh tìm kiếm trên trang Dashboard của Role để xác minh xem role đã được tạo thành công hay chưa.

![](https://images.viblo.asia/e92e881e-7c32-4fc3-bcfe-c5fed52e6f3e.png)

Tiếp theo, chúng ta cần đảm bảo rằng subnet của chúng ta đã được chọn (bật) “Enable auto-assign public IPv4 address”. Điều này phải được đảm bảo vì mình sẽ phải kết nối với EC2 để đảm bảo tác nhân SSM được setup trên instance. Nếu không có địa chỉ IPv4 public, bạn sẽ không được phép kết nối với instance của mình.

Để bật/xác minh nó, chúng ta sẽ di chuyển đến trang tổng quan Amazon VPC.

![](https://images.viblo.asia/e5fcb802-9844-40b9-b306-942f73c4522d.png)

Click vào “Subnet” trên sidebar.

![](https://images.viblo.asia/88bb7893-0cfb-431c-8768-0c32c91c5269.png)

Chọn subnet tạo cho instance và click vào “Actions”.

![](https://images.viblo.asia/fdb010e3-d716-4aec-9715-3a0a25a269f3.png)

Chọn “Modify auto-assign IP settings”. Đảm bảo rằng checkbox cho “Enable auto-assign public IPv4 address” được chọn và click vào “Save”.

![](https://images.viblo.asia/a02e2ebb-8008-4acd-b2de-da4dc53d365b.png)

Khi thành công, chúng ta sẽ nhận được thông báo thành công như trong hình dưới đây.

![](https://images.viblo.asia/7a3a6ebe-dab8-46a7-8908-263accaa13b2.png)

Tiếp theo, chúng tôi EC2 instance sử dụng role mà chúng tôi đã tạo ở trên. Điều này sẽ giúp chúng ta tạo phiên bản EC2 được quản lý bởi Amazon Systems Manager.

Di chuyển đến bảng điều khiển Amazon EC2 và đảm bảo rằng đúng với region được chọn mà bạn muốn tạo instance cho mình nhé.

![](https://images.viblo.asia/1d51a73f-e4e7-405c-bb1f-6e9fcecb6681.png)

Cuộn xuống và chọn vào “Launch instance” để khởi chạy instance mới được quản lý trong region mà mình muốn.

![](https://images.viblo.asia/90e4edbf-7507-4164-b676-72910f8ebeb0.png)

Trong “Choose and Amazon Machine Image (AMI)", chọn“ Amazon Linux 2 AMI (64-bit) ” và click vào“ Select ”.

![](https://images.viblo.asia/3198cb07-0ada-48d7-af12-6f35ad76df37.png)

Tiếp theo, chúng ta có thể chọn type của instance mà mình thích. Ở đây, mình sẽ sử dụng “t2.micro”. Click vào “Next: Configure Instance Details”.

![](https://images.viblo.asia/67043563-e07b-4e7e-a4c8-23db857f7426.png)

Đảm bảo rằng “Subnet” được chọn là mạng mà bạn đã kích hoạt tính năng tự động gán các địa chỉ IPv4 công khai ở phía trên nhé.

![](https://images.viblo.asia/3978d9f7-d209-4367-a94e-3bcb6a0cbb7b.png)

Cuộn xuống phần lựa chọn thông tin cho "IAM role”, chọn role mình đã tạo ở trên và click vào “Next: Add Storage”.

![](https://images.viblo.asia/ad79bdb1-df53-45a4-a332-442d90e2cd5a.png)

Chúng ta cũng có thể thực hiện các thay đổi trong cấu hình cho storage tùy theo yêu cầu của mình. Ở đây, mình sẽ sử dụng cấu hình lưu trữ mặc định. Sau khi hoàn tất, hãy nhấp vào “Next: Add tags”.

![](https://images.viblo.asia/2973b573-c978-47a5-85be-c6413080fed6.png)

Thêm tag (nếu có) cho instance. Ở đây, mình không thêm bất kỳ tag nào. Click vào “Next: Configure Security Group”.

![](https://images.viblo.asia/a2cf0426-23a9-4fbb-af11-ec330d56970a.png)

Đảm bảo setting inbound cho SSH với giao thức TCP trên Cổng 22 đã có nhé mn. Click vào “Review and Launch””.

![](https://images.viblo.asia/a5ffd081-8e43-4ff9-ab46-7ab3800d9b16.png)

Xem lại chi tiết tất cả các cấu hình và click vào “Launch”.

![](https://images.viblo.asia/f66799c4-8c05-445f-b077-f3cb2aeb2038.png)

Tiếp theo là phần chọn keypairs nhé mn, key này sẽ dùng để ssh vào instance. Bạn cũng có thể tiếp tục mà không cần cặp khóa, và bạn chọn keypair mà mình đã tạo từ trước đó. Trong hướng dẫn này, chúng tôi sẽ không tạo một cặp khóa. Sau khi hoàn tất, hãy click vào “Launch Instances”.

![](https://images.viblo.asia/f5be9eda-d713-469a-911c-963e1d0a99ba.png)

Khi thành công, bạn sẽ thấy một màn hình như hình dưới đây. Click vào “View Instances”.

![](https://images.viblo.asia/fd414cd0-a017-4223-9f81-17a2e2a6b1c4.png)

Chúng ta sẽ thấy instance mới được tạo trong danh sách hiển thị bên dưới. Đảm bảo rằng cột “Public IPv4 DNS” có địa chỉ IP cho instance mới tạo nhé.

![](https://images.viblo.asia/f500809e-beae-4ea3-b497-16b403b4f254.png)

Khi “Instance State” chuyển sang trạng thái “Running”, hãy chọn instance mới được tạo và click vào “Actions”. Chọn “Connect” từ dropdown.

![](https://images.viblo.asia/d94a06de-31e7-463a-911b-f93ead28f6bf.png)

Nhập “User name” cho instance và click vào “Connect” để kết nối với EC2 instance vừa tạo nhé.

![](https://images.viblo.asia/3570888a-9208-47bc-b8de-9d8bc1df41be.png)

Một terminal console mới sẽ được mở ra trong một tab mới như hình dưới đây.

![](https://images.viblo.asia/7253e4b3-384b-405c-ae18-3685c1cd8259.png)

Gõ lệnh “sudo systemctl status amazon-ssm-agent” vào terminal và nhấn enter. Lệnh này để kiểm tra xem SSM-agent có được cài đặt đúng cách trên phiên bản EC2 của chúng ta hay không. Id trạng thái Hoạt động hiển thị là "active (running)", có thể yên tâm rằng SSM-agent đã được cài đặt thành công.

![](https://images.viblo.asia/f2320762-5aa3-490d-a5bb-abd602dfb64e.png)

Khi có một phiên bản EC2 đang chạy Systems Manager agent, chúng ta có thể tự động hóa nhiều cấu hình hoặc nâng cấp, bất kỳ tác vụ nào và cả việc quản lý phiên bản nhé. Bây giờ, hãy thực hiện nâng cấp SSM được cài đặt trên instance. Điều này có thể được thực hiện bằng cách chạy một lệnh đóng gói sẵn được gọi là tài liệu hoặc tự động hóa quá trình nâng cấp.

Di chuyển đến bảng điều khiển Amazon Systems Manager trên AWS.

![](https://images.viblo.asia/7f1fdb36-aec2-4065-a7e7-20c1b4d24e6c.png)

**Để tự động nâng cấp SSM agent:**

Nhấp vào “Fleet Manager” trong phần “Node Management” trên sidebar. Chúng ta sẽ tìm thấy EC2 instance đã tạo của mình trong danh sách như hình dưới đây.

![](https://images.viblo.asia/39c9a165-1d68-4c3d-8419-64db1b20a82a.png)

Để tự động nâng cấp, hãy click vào “Account Management” và sau đó click vào “Auto-update SSM agent”.

![](https://images.viblo.asia/3d2585ef-5515-44d5-a441-229da0917d56.png)

Sau khi hoàn tất, một modal sẽ xuất hiện. Click vào “Auto-update SSM agent” và sau một vài phút, quá trình cập nhật sẽ được tự động hóa cho bất kỳ instance hiện có hoặc instance mới nào mà chúng ta tạo.

![](https://images.viblo.asia/83cc1717-bab3-43a9-a12b-c73b9e366187.png)

**Để cập nhật thủ công SSM-agent bằng command:**

Nhấp vào “Run Command” trong phần “Node Management”.

![](https://images.viblo.asia/25fd8dcc-58f3-40b7-be72-15a29dc7ca1c.png)

Bây giờ, chúng ta sẽ click vào “Run command” để nâng cấp SSM-agent theo cách thủ công.

![](https://images.viblo.asia/68a1cdaa-8907-4c7d-a53e-c1c65d79c249.png)

Trong thanh tìm kiếm, nhấp vào đó và chọn “Document name prefix”, sau đó click vào “Equals” rồi nhập “AWS-UpdateSSMAgent”.

![](https://images.viblo.asia/98623faa-c5c6-453d-8a7e-b78b33e90231.png)

Bây giờ, chúng ta click vào button radio ở bên trái của “AWS-UpdateSSMAgent”. Đây được gọi là tài liệu và điều này sẽ nâng cấp Systems Management agent trên instance đã chọn.

![](https://images.viblo.asia/fe94b57a-4f02-4df3-97f3-a2e6d2bd7431.png)

Sau khi hoàn tất, di chuyển xuống phần “Targets” trên cùng trang và chọn button radio ở bên trái của “Choose instances manually”, sau đó chọn phiên bản EC2 được quản lý mà bạn đã tạo ở trên từ danh sách các phiên bản được hiển thị.

![](https://images.viblo.asia/7be15fbd-e1df-4d24-b024-8653546ebca9.png)

Di chuyển xuống và click vào “Run” để thực thi tài liệu.

![](https://images.viblo.asia/acacbb63-c38c-40b9-bdd4-1cf69f022630.png)

Chúng ta có thể nhìn thấy “Overall Status”” là “Inprogress”.

![](https://images.viblo.asia/d03de0ac-a78b-455f-a412-1f7e6a00eb7d.png)

Sau một vài phút, chúng ta click vào refresh và trạng thái sẽ thay đổi thành “Success”.

![](https://images.viblo.asia/678ab3b3-67db-4b2e-ab7d-9c67a4e7372c.png)

Để xem kết quả của việc thực thi lệnh, chúng ta click vào EC2 được quản lý được hiển thị trong phần “Targets and outputs”.

![](https://images.viblo.asia/2243300f-3ca8-4296-941b-2926ba140595.png)

“Bước 1 - Output” -  xem kết quả:

![](https://images.viblo.asia/339bd36e-6b2e-48f1-ba67-28c4b1e1bd7f.png)

Bây giờ, để chạy một tập lệnh để nâng cấp bất kỳ gói nào trên EC2, hãy trở lại bảng điều khiển “Run Command” trong Amazon Systems Manager và nhấp vào “Run Command”. Trong thanh tìm kiếm, nhấp vào đó và chọn “Document name prefix”, sau đó click vào "Equals" rồi nhập “AWS-RunShellScript”.

![](https://images.viblo.asia/a31b6d89-1e3a-4d64-9781-b4c54286ed51.png)

Tiếp đó, hãy click vào button radio ở bên trái của “AWS-RunShellScript”.

![](https://images.viblo.asia/054a8cf4-554d-4059-a977-aecaffcae66d.png)

Sau khi hoàn tất, di chuyển xuống phần “Targets” trên cùng trang và chọn “Choose instances manually”, sau đó chọn phiên bản EC2 mà chúng ta đã tạo ở trên từ danh sách các phiên bản được hiển thị.

![](https://images.viblo.asia/2868921c-0207-480d-8e24-fa8965140b40.png)

Di chuyển lên phần “Command Parameters”” và chèn lệnh sau: “sudo yum update -y”

![insert_cmd.png](https://images.viblo.asia/2e2dbdc6-c0bd-4ead-8381-d1819f1a21a3.png)

Di chuyển xuống và click vào “Run” để thực hiện lệnh.

![](https://images.viblo.asia/66f0bc26-4c97-4fe6-96b1-ab7507fbffa9.png)

Sau một vài phút, refresh và chúng ta sẽ nhìn thấy trạng thái của nó là “Success” sau khi hoàn thành thành công việc thực thi lệnh.

![](https://images.viblo.asia/0c792b0a-4cbd-42cc-b7f0-faf2a6b88c3d.png)

Cuối cùng, để xem kết quả của việc thực thi lệnh, click vào EC2  được hiển thị trong phần “Targets và outputs”.

![](https://images.viblo.asia/ad191fbd-0861-4888-bdca-be2513338471.png)

## Kết luận

Trong bài chia sẻ này, chúng ta đã khám phá ra rằng AWS Systems Manager có khả năng tự động hóa các tác vụ và giúp giữ cho tất cả các instance EC2 của chúng ta hoạt động tốt, các ứng dụng được quản lý, bảo mật và cập nhật. Chúng ta cũng đã thấy cách chúng ta có thể sử dụng System Manager của Amazon để thực thi một loạt lệnh từ xa trên EC2 loại bỏ sự cần thiết của SSH hoặc bastion hosts. Mong ra các kiến thức này sẽ hữu ích cho những ai đang và sẽ tìm hiểu để sử dụng nó.

### Nguồn tài liệu

- https://medium.com/workfall/how-to-run-commands-remotely-on-an-ec2-instance-using-aws-systems-manager-351284decbd4
- https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html