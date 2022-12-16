Hôm nay chúng ta tiếp tục series `AWS Use Case` với một chủ đề cũng khá hay liên quan đến Kubernetes AWS mà người ta biết đến nó với cái tên `AWS Elastic Kubernetes Service (AWS EKS)`.

Kubernetes chắc cũng không còn xa lạ với chức năng `Container Orchestration` - một nền tảng cho phép quản lý, triển khai các ứng dụng dưới dạng container một cách linh hoạt, đảm bảo tính sẵn sàng của dịch vụ.

Với nền tảng K8S tự triển khai, chúng ta có toàn quyền quản trị từ hạ tầng vật lý đến hạ tầng ảo hóa; việc tích hợp với các hệ thống bên ngoài sẽ hoàn toàn phụ thuộc vào các plugin sẵn có hỗ trợ cho nền tảng này.
Tuy nhiên, đối với `AWS EKS` khách hàng và AWS sẽ chia sẻ trách nhiệm theo `Shared Responsibility Model` (theo ảnh dưới) và việc tích hợp với các services khác trong hệ sinh thái AWS Cloud là hoàn toàn tự động (CloudWatch, IAM, AutoScaling, SQS, Kinesis...).

![image.png](https://images.viblo.asia/bf3413b9-2e88-40c1-a0dc-502feefb6b98.png)

Theo đó, `AWS EKS` sẽ đem lại cho người dùng sự tiện lợi và triển khai nhanh chóng. Khách hàng cũng sẽ phải chịu trách nhiệm bảo mật cho các cụm EKS mà ở đó ứng dụng của khách hàng được triển khai.

Bài viết sẽ gồm 2 phần:
- Tím hiểu tổng quan về Kubernetes (K8S) - nhằm mục đích gợi nhớ.
- Security Best Practice đối với `AWS EKS`.

## Tìm hiểu tổng quan về Kubernetes

### Kiến trúc cơ bản K8S Cluster

![image.png](https://images.viblo.asia/0e3b519b-6585-4bfb-9b91-7a6ecfde36fb.png)

Kiến trúc của K8S tương tự như kiến trúc Cloud Platform, thông thường sẽ bao gồm 3 `Node Types` chính:
- Master Node (Mandatory): Control Plane
- Worker Node (Mandatory): Workload
- Infrastructure Node (Optional): Đây là một dạng node đặc biệt thường có trong nền tảng `OpenShift` phục vụ tách biệt các workload phục vụ infrastructure: Router, Container Registry... Thông thường các workload này sẽ nằm trên Master Node luôn, tuy nhiên với các Cluster siêu to khổng lồ thì chúng sẽ được quy hoạch ra node riêng để dễ dàng `maintain`, `operation`.

Bản thân K8S cũng đã có nền tảng SDN của riêng nó, do đó `Networking` trong K8S cũng hoàn toàn tự động và tính `Availability` rất cao.

### Kiến trúc AWS EKS
Cách thức triển khai trên AWS có khá nhiều và AWS cũng có những Services hỗ trợ triển khai K8S nhanh nhất có thể. Khách hàng có thể linh hoạt lựa chọn cách triển khai để đảm bảo những yêu cầu về `Security`, `Compliance`, `Business`. Chúng ta sẽ có một số lựa chọn như sau:
- Khách hàng tự cài cắm từ A-->Z trên cụm EC2.
- Sử dụng EKS với lựa chọn AWS quản lý cả `Master Nodes` và `Worker Nodes`
- Sử dụng EKS với lựa chọn AWS chỉ quản lý `Master Nodes` (còn biết đến với tên gọi `Self-managed Nodes`)

![image.png](https://images.viblo.asia/465c2326-9282-4277-bdc9-2f96bed6e332.png)

## AWS Security Best Practices
Gọi là `Best Practices` cho sang thế thôi, tuy nhiên mỗi tổ chức tùy theo nhu cầu cũng như hoàn cảnh thì việc cân bằng giữa `Security`, `Operation`, `Business Requirement` là thực sự cần thiết. Khi đó, tự mỗi tổ chức sẽ có `Best Practice` của riêng mình.

Việc chuyển dịch lên Cloud sẽ hướng đến 2 mục tiêu:
- Cắt giảm độ phức tạp của công tác vận hành.
- Cắt giảm chi phí Capex/Opex

Khi mà `Security` ảnh hưởng đến 2 vấn đề này thì `Security` chưa chắc đã tồn tại được =)).

### Phân chia trách nhiệm security giữa AWS và Customer
- Trách nhiệm AWS:
    - Chịu trách nhiệm bảo mật cho `Control Plane`: `Master Nodes` và `etcd` database (`etcd` là nơi lưu trữ toàn bộ `Secret` phục vụ cho container).

- Trách nhiệm của Customer:
    - Worker Nodes Security: 
        - Node's OS (Patching, Update)
        - Hardening Configuration OS
    - Network Security: IN/OUT Worker Nodes (NACL, SecurityGroup)
    - Container Security (Pod Security - đơn vị nhỏ nhất trong K8S là Pod nên tôi gọi là Pod thực chất nó cũng là Container thôi): **Phần này tôi chỉ đưa ra ở đây thôi, còn phần này là một bầu trời rộng lớn trình bày thêm vào bài này miên man lắm =))**
    - Data Security.
    - Access Control
    - Monitoring and Analysis

Giờ chúng ta sẽ đi từng phần để xem có thể làm được gì để bảo mật cho EKS Cluster. Thực ra, nếu viết dưới dạng `Checklist` thì sẽ dễ mường tượng hơn nhưng viết bài mà phệt mỗi cái `Checklist` vào đây thấy cũng kỳ.

Ngoài ra, tôi cũng sẽ bỏ qua phần `Container Security` nhé! Lý do thì tôi đã nói ở trên rồi =))

### Access Control - IAM (Identity and Access Management)
Đối với các tổ chức sử dụng AWS thì IAM không xa lạ, việc phân quyền truy cập `AWS Services` cũng hoàn toàn dựa vào IAM.
- IAM có thể `federated` với 3rd IdP (Identity Provider) như Azure AD, AD... cung cấp nền tảng IAM liền mạch với `Source of Trust` duy nhất.
- IAM có nhiều dạng Policy cho phép quản lý linh hoạt truy cập vào service/data.

EKS cung sẽ tận dụng IAM để thực hiện phân quyền `Role-based Access Control` dựa vào IAM Role. Chúng ta sẽ có một số ý ở phần này như sau:
- Nếu cần cấp quyền cho User riêng lẻ, hãy sử dụng `aws-auth ConfigMap` để map User với `K8S RBAC Role` cụ thể.
- Nếu số lượng User cần cấp quyền lớn, hãy sử dụng `aws-auth ConfigMap` để map IAM Role  với `K8S RBAC Role` cụ thể. IAM Role sẽ liên kết trực tiếp với `User Group`.
- Định nghĩa rõ `User Group` và `IAM Role` duy nhất trước khi tạo `EKS Cluster` phục vụ `Audit`.
- Sử dụng `IAM Roles` cho `Service Accounts` - `Service Accounts` phục vụ truy cập vào các `AWS Services` (S3, SQS, DynamoDB....)

--> Tất cả các task này nên được định nghĩa rõ thành baseline và chuyển hóa thành `AWS Cloudformation Template`.

### Access Control - EKS API (EKS Cluster Endpoint)
Khi `EKS Cluster` được `provision` thì mặc định `EKS API` là `Public`. Theo đó, bản ghi DNS sẽ được khai báo tự động trên `public hosted zone` ở `AWS Route 53`.

Chúng ta sẽ phải làm những việc sau:
- Cấu hình `EKS API` sang `private mode` sử dụng `VPC Endpoint`. Lúc này bản ghi DNS public sẽ bị xóa và khai báo bản ghi DNS mới trên `private hosted zone` tại `AWS Route 53`. Theo đó, `EKS API` có thể được truy cập từ:
    - Connected Network
    - Bastion Host
    - Cloud9 IDE (phục vụ debug)
- Chỉ cho phép truy cập `EKS API` từ `Bastion host` (là một EC2 nằm trong VPC) và việc kiểm soát truy cập vào `Bastion host` sẽ sử dụng `AWS System Manager Session Manager`. Về lý tưởng, việc truy cập `EKS API` chỉ cho phép CI/CD Tools truy cập do đó việc truy cập thủ công là không cần thiết và ít khi sử dụng --> việc chặn truy cập từ Workstation/Device của người dùng là cần thiết.
- Disable toàn bộ `Anonymous User`, theo đó sẽ có User/Group dạng Anonymous được tạo ra khi `EKS Cluster` được `provisioning`:
    - system:anonymous (User)
    - system:unauthenticated (Group)
**NOTES**: Với trường hợp cần thiết phải public `EKS API` thì hãy giới hạn IP Public có thể truy cập. Có thể kết hợp cả `private mode` và `public mode` và giới hạn IP Public có thể truy cập.

### Network Security
Đối với lớp `Network` chúng ta nên kiểm soát những phần sau:
- Sử dụng ALB cho `Pod Services` và thiết lập `Security Group` cho ALB.
- Sử dụng `Security Group` để kiểm soát:
     - Lưu lượng giữa `Control Plane` và `Data Plane` (`Worker Nodes`).
     - Lưu lượng giữa `Worker Nodes` và `VPC Resources` khác và `External IP`.
- Kiểm soát lưu lượng nội tại `EKS Cluster`. Theo đó, nếu `EKS Cluster` được sử dụng cho nhiều `Project` chúng ta cần:
    - Giới hạn truy cập giữa các Project bằng cách sử dụng `NetworkPolicies` EKS Native.
    - Thiết lập `EgressIP` cho từng `Project` phục vụ kiểm soát một cách chính xác `Outbound Connection` của từng `Project` (mặc định tất cả Project sẽ sử dụng chung `EgressIP`).
    - (Nếu có thể) Giới hạn truy cập giữa các Pod trong một Project bằng cách sử dụng `NetworkPolicies` EKS Native. (lựa chọn này sẽ tăng tải cho vận hành nên thường sẽ không sử dụng)

### Worker Nodes Security (Data Plane Security)
Đối với `Worker Nodes` chúng ta sẽ có một số điểm chú ý sau:
- AMI Hardening/Update tùy thuộc vào OS Distro sử dụng.
- Enable `node restriction admission controller` cho phép thiết lập `baseline` cho `cluster` và ngăn chặn việc chỉnh sửa các thông số này.
- Kiểm soát truy cập SSH bằng `AWS System Manager Session Manager`, khuyến nghị nên sử dụng `Bastion Host` cho các kết nối quản trị.
- Liên tục `scan vulnerabilities` phục vụ vá lỗi bảo mật, có thể sử dụng `AWS native Service` như  `Amazon Inspector`.

### Data Security
Đối với bảo mật dữ liệu, chúng ta sẽ có 2 phần:
- Data at rest: mã hóa toàn bộ dữ liệu được lưu trữ trong EBS, EFS, S3, SQS... bằng cách sử dụng `AWS KMS`.
- Secret Management: `etcd database` lưu trữ toàn bộ `secret` mà `pod` sử dụng, điểm yếu là `etcd` lưu trữ secret dưới dạng base64 và có thể dễ dàng truy cập.
     - Sử dụng `AWS Secret Manager` hoặc `3rd Vault` để lưu trữ `Secret`.
     - Mount secret vào `EKS Pods` dưới dạng file hoặc `environment variable` (ENV).
     - Định kỳ `rotate secret` nếu có thể.

### Security Monitoring and Analysis
Chúng ta có một số `AWS Native Services` phục vụ logging, monitoring sau:
- Enable `GuardDuty` phục vụ monitor `Kubernetes audit logs`, cho phép phát hiện hành vi bất thường của user và application.
- Ngoài lựa chọn `GuardDuty`, chúng ta còn có thể sử dụng `EKS Audit Policy` để đẩy `Audit logs` đến `Cloudwatch` cho phép tích hợp với các `AWS Service` khác phục vụ `automation`, `alerting`, `backup logs`, `internal audit`...

### Pod Security
Như đã nói ở trên, phần này là một khía cạnh khá rộng nhưng cũng sẽ ảnh hưởng rất lớn đến `EKS Security`. Nó sẽ bao gồm những phần sau (người đọc có thể tự tìm hiểu thêm):
- Sử dụng `Security Group` phục vụ giới hạn truy cập IN/OUT (như đã nói ở mục `Network Security`).
- Sử dụng `PodSecurityPolicy` để xây dựng `security baseline` cho Pods, theo đó phải đảm bảo đủ các `security baseline` đã định nghĩa thì Pods mới được khởi tạo. Tuy nhiên, `PodSecurityPolicy` (PSPs) không còn được sủ dụng từ phiên bản Kubernetes version 1.21. Chúng ta có thể thay thế bằng các phương án sau:
    - Policy-as-code (PAC) và `admission controllers` với các giải pháp 3rd: Open Policy Agent (OPA), Kyverno...
    - Pod Security Standards (PSS) - Pod Security Admission (PSA): tính năng `built-in` của Kubernetes.
- `Container Security`: Phần này khá rộng nên tôi sẽ không đi chi tiết mà chỉ đưa ra các hạng mục cần thực hiện
    - Secure Supply Chain (CI/CD Pipeline & DevSecOps)
    - Secure Container Registry
    - Secure Container Runtime
    - Secure Infrastructure (Host Security)
    - Secure Data
    - Secure Workload (Running Containers)

## Apendix: Deployment Method & Tools
Hiện tại có khá nhiều giải pháp thương mại với rất nhiều tính năng cho phép bảo mật `Container Platform` nói chung và `Kubernetes` nói riêng.

Với các nền tảng Security truyền thống cho `Server/VM`, thường có 2 dạng triển khai:
- Agentless
- Agent-based

Với `Container Platform` chúng ta cũng có thể triển khai theo 2 dạng trên. Tuy nhiên, `agent-based` sẽ không được ưu tiên vì một số lý do:
- Tăng dung lượng `Container Images` kéo theo đó tăng thêm `container overhead` và có thể sẽ làm giảm hiệu năng `container`, qua đó phá vỡ quan điểm thiết kế và mục tiêu của `container`.
- Tăng độ phức tạp cho `CI/CD Pipeline`, đặc biệt là với các ứng dụng release hàng trăm lần mỗi ngày.
- `Agent-based` thường dựa vào `AssetID` để giám sát và thực hiện các tác vụ liên quan, tuy nhiên `container` liên tục thay đổi, liên tục triển khai dẫn đến `AssetID` thay đổi liên tục làm cho `agent-based` không còn phù hợp nữa.

Với `agentless`, chúng ta có thể triển khai bằng cách cài đặt `agent` trực tiếp lên `Worker Nodes` (Host) và tương tác trực tiếp với `Container Runtime` (containerd, dockerd, CRI-O, Mirantis...). Theo đó, `agent` ở mức Host có thể:
- Hoạt động như IDS/IPS giám sát lưu lượng IN/OUT Container.
- `Container Inventory Management` 

Một số giải pháp khá hiệu quả cho phần này bao gồm:
- [Stackrox (Redhat)](https://www.redhat.com/en/technologies/cloud-computing/openshift/advanced-cluster-security-kubernetes)
- [Sysdig](https://sysdig.com/)
- [Qualys](https://www.qualys.com/apps/container-security/)
- [Aqua](https://www.aquasec.com/)
- [Prisma Cloud (Palo Alto)](https://www.paloaltonetworks.com/prisma/cloud)

Bạn đọc có thể tự tìm hiểu thêm nhé!

Phần này kết thúc ở đây! Rất hi vọng có thể nhận được các comment đóng góp để bài viết được hoàn thiện hơn.
Xin chân thành cảm ơn!