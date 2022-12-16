Ngày nay thì việc doanh nghiệp hay cá nhân sử dụng nhiều thiết bị hay server, việc cài đặt môi trường thủ công trên từng thiết bị qua CLI mất nhiều thời gian và nhân lực. Vậy chúng ta có thể cài đặt môi trường một lúc trên nhiều thiết bị, server? hay với một command chúng ta có thể thực hiện điều đó? Thì trong bài viết này mình giới thiệu với các bạn về Ansible
# Ansible là gì?
- Ansible là một công cụ `automation` và `orchestration` phổ biến, giúp cho chúng ta đơn giản tự động hóa việc triển khai ứng dụng. Nó có thể cấu hình hệ thống, deploy phần mềm
- Ansible có thể tự động hóa việc cài đặt, cập nhật nhiều hệ thống hay triển khai một ứng dụng từ xa
# Ưu điểm của Ansible
Sau đây là một số ưu điểm của Ansible:
- Clear: Ansible sử dụng cú pháp đơn giản (YAML) và dễ hiểu đối với bất kỳ ai (developers, sysadmins, managers).
- Fast: học nhanh, cài đặt nhanh chóng và không phải cài đặt phần mềm hay daemon nào khác trên server của chúng ta
- Complete: phương pháp tiếp cận `batteries included` của Ansible, chúng ta có mọi thứ chúng ta cần trong một package hoàn chỉnh
- Efficient: việc không có phần mềm bổ sung trên máy chủ của chúng ta sẽ giúp chúng ta tiết kiệm tài nguyên và dành nhiều tài nguyên hơn cho các ứng dụng. Ngoài ra, vì các modules của Ansible hoạt động thông qua JSON, Ansible có thể mở rộng với các modules được viết bằng ngôn ngữ lập trình mà chúng ta đã biết.
- Secure: Ansible sử dụng SSH và không yêu cầu thêm mở port hoặc daemon nên tránh bị truy cập vào máy chủ của bạn qua port hay daemon.
- Ansible nhẹ và nhất quán, không có bất kỳ ràng buộc nào liên quan đến hệ điều hành hay phần cứng cơ bản nào
# Các thuật ngữ quan trọng trong Ansible
Dưới đây là các thuật ngữ trong Ansible mà mình đã tìm hiểu:
- Ansible server:  là nơi ansible được cài đặt và từ đó tất cả các tasks và playbooks sẽ được chạy
- Module: là một lệnh hoặc tập hợp các lệnh tương tự được thực thi ở client-side. Khi chúng ta giao tiếp với Ansible sẽ thông qua module
- Task: một task xác định một công việc đơn lẻ được hoàn thành, là những công việc nhỏ trong playbooks
- Role: Một tập hợp các Playbook, các file liên quan được tổ chức theo cách được xác định trước để tạo điều kiện tái sử dụng và chia sẻ
- Fact: các biến toàn cục chứa các thông tin về hệ thống
- Playbook: một file YAML chứa một tập các công việc cần tự động hóa
- Inventory: một file INI chứa các thông tin về các server từ xa mà bạn quản lý.
- Play: một lần thực thi một Playbook
- Handler: sử dụng để kích hoạt thay đổi trạng thái các service
- Tag: tên được đặt cho một task, có thể được sử dụng sau này có nhiệm vụ chỉ cụ thể task hoặc một nhóm các task
# Ansible hoạt động như thế nào
Dưới đây là hình ảnh mô tả hoạt động của Ansible:

![](https://images.viblo.asia/882a114c-5ea4-431d-8a09-08a67331e6ea.jpg)

Như trong hình thì `Management Node` là `Ansible server` mình nói ở trên, là nơi quản lý các nodes điều khiển toàn bộ quá trình thực thi của playbook. 

Playbook sẽ chứa chi tiết tất cả những gì chúng ta muốn thực hiện với các server mà chúng ta muốn quản lý và cách thức thực hiện chúng

Ở đây, các tệp `Inventory` cung cấp cho chúng ta danh sách các máy chủ mà các `module Ansible`  cần để chạy

Sau khi đọc được các host mà chúng ta cần chạy ở `Inventory` thì `Management Node` sẽ thực hiện việc connect tới các host này thông qua SSH connection và thực thi các modules

# Cài đặt Ansible
Trong phần này thì mình sẽ giới thiệu cài đặt Ansible trên ubuntu:
- Thực hiện update packages:
```
sudo apt update
```
- Cài đặt software-properties-common package
```
sudo apt install software-properties-common
```
- Thực hiện cài đặt:
```
sudo apt-add-repository ppa:ansible/ansible
sudo apt update
sudo apt install ansible
```
- Sau khi cài đặt chúng ta có thể kiểm tra bằng cách thực hiện lệnh sau trên terminal:
```
ansible --version
```
# Tạo file inventory
Ansible sử dụng một file `inventory` (danh sách các server) để kết nối với server của chúng ta. Giống như với file `hosts`(/etc/hosts) để trỏ địa chỉ IP tới tên domain, thì một file `Ansible inventory` sẽ trỏ các server (địa chỉ IP hoặc tên domain) tới groups. File Inventory này có thể sẽ được tạo sẵn sau khi chúng ta cài đặt xong Ansible. Trong trường hợp chưa có file này thì chúng ta có thể làm như sau:

```
sudo mkdir /etc/ansible
sudo touch /etc/ansible/hosts
```

Sau đó, chúng ta edit file này như sau:
```
[example]
www.example.com
192.168.100.9
```

Ở đây thì `example` là group của các server mà chúng ta quản lý. `www.example.com` và `192.168.100.9` là domain và địa chỉ IP của server ở trong group. Nếu chúng ta sử dụng port 22 cho việc SSH tới server, chúng ta có thể cần add `:2222` vào địa chỉ, ví dụ: `www.example.com:2222`, vì Ansible mặc định là port 22 và sẽ không nhận được giá trị này từ file config của chúng ta

# Chạy Ad-Hoc Ansible command
Ad-Hoc commands là các lệnh có thể được chạy riêng lẻ để thực hiện các chức năng nhanh chóng. Chúng có thể được sử dụng khi chúng ta muốn đưa ra một lệnh trên một server hoặc nhiều server. 

Như ở phần trên thì chúng ta đã tạo file `inventory` chứa các hosts mà chúng ta đã định nghĩa.

Chúng ta có thể kiểm tra việc truy cập vào các hosts từ `ansible server`, chúng ta sử dụng lệnh sau:
```
ansible -i hosts all -m ping
```

Sau khi thực hiện lệnh này thì trên terminal của chúng ta sẽ hiển thị trạng thái của lệnh, các hosts trong file `inventory`

Chúng ta cũng có thể chỉ định cụ thể `host` nào mà chúng ta muốn chạy command:
```
ansible -i hosts all -m ping --limit example
```

Trong ví dụ này mình chỉ chạy lệnh trên host `example`. Ở lệnh này chúng ta có param --limit để chỉ định hosts nào trong file host

# Kết luận
Trong phần này mình giới thiệu với các bạn các kiến thức cơ bản, các thuật ngữ thường xuyên được sử dụng trong ansible và cách hoạt động của nó. Trong phần tiếp theo chúng ta cùng nhau tìm hiểu về `playbook`. Cảm ơn các bạn đã theo dõi bài viết

Tài liệu tham khảo:
- https://www.guru99.com/ansible-tutorial.html
- https://www.tutorialspoint.com/ansible
- Book: ansible-for-devops