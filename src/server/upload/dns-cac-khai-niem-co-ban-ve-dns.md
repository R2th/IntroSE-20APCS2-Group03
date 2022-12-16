# DNS là gì?
**DNS-Domain Name System** là một cơ sở dữ liệu phân tán được các ứng dụng **tcp/ip** sử dụng để ánh xạ giữa hostname và địa chỉ IP và routing email. Gọi là phân tán bởi vì không có một site đơn lẻ nào quản lý toàn bộ thông tin. Mỗi site sẽ quản lý cơ sở dữ liệu của riêng nó trên server và xử lý các truy vấn từ Internet hoặc từ các clients.

![](https://images.viblo.asia/d36d2a24-9356-48e7-b832-12784f4d4ec1.jpeg)

 DNS là một cây ngược giống như hệ thống file trong **Linux**. Trong “cây” này có một gốc gọi là **root**, được ký hiệu bằng một dấu chấm-dot(.)
 
##  1. Domain namespace
Một domain **namespace** sẽ chứa một “cây” các domain names. Mỗi node trong cây sẽ giữ thông tin đại diện cho domain name. Mỗi một tổ chức có thể tạo riêng cho mình một domain namespace để tự quản lý các host trong mạng của họ. Trong một domain thì tên dành cho một host là duy nhất, không với nhau.

![](https://images.viblo.asia/386294b3-8933-456f-9ebc-b86501218fe9.png)

## 2. Domain names
Mỗi node trong cây có một nhãn riêng. Một nhãn rỗng đại diện cho root. Một domain name đầy đủ của bất kỳ một node nào trong “cây” là thứ tự các nhãn trong đường dẫn từ node đó đến root, tên mỗi node được phân chia bằng các dấu chấm (.) Việc đánh tên này sẽ xác định được vị trí của node đó trong “cây”. Mỗi node trong cây được xác định bằng một **FQDN** – tên đầy đủ chỉ đường dẫn đến node trong cây.

![](https://images.viblo.asia/cd5d9666-03b2-4195-9339-2e1b087315a8.png)

## 3. Domains
Một domain là một nhánh của **namespace**. **Domain** là tập các node có cùng một node cha, các node này tạo nên một domain. Tên của domain này cũng chính là tên của node cha. Một domain có thể có các nhánh con của nó. Các nhánh này được gọi là **subdomain** – domain con.

![](https://images.viblo.asia/8dc858d5-4a75-4f85-8090-2064ab0ad9be.png)

## 4. Resource records
Dữ liệu ứng với domain names được chứa trong các **resource record**- bản ghi. Các records được chia thành các **classes**, mỗi class chứa các **types**(kiểu) chịu trách nhiệm phân giải cho từng dịch vụ trong **namespace**. Các **class** khác nhau có thể định nghĩa các kiểu record khác nhau. Một số **RRs** thông dụng:

* **SOA**(Start of Authority): Chỉ ra rằng server này là nơi tốt nhất để cung cấp dữ liệu và thông tin cho toàn zone. Name server được đánh giá có quyền lực nhất trong zone thông qua SOA record này.
* **NS**(Name Server): Record này chỉ ra đâu là nameserver cho toàn zone.
* **A**(Address): record này chịu trách nhiệm phân giải tên sang IP
* **PTR**(Pointer): record này chịu trách nhiệm phân giả IP sang tên
* **MX**(Mail Exchangers): record này chỉ ra đâu là mail server cho domain.
## 5. Delegation
Một trong những mục đích của **DNS** đó là quản trị phân tán. Ta có thể chia nhỏ việc quản lý thành nhiều phần khác nhau. Một **domain** có thể có nhiều **subdomains**.

![](https://images.viblo.asia/9bb77c48-2dd0-464c-b830-6261f498759e.png)

Mỗi **subdomain** có thể đại diện cho một tổ chức và tổ chức đó có toàn quyền để điều khiển **DNS** của tổ chức đó. Việc phân quyền này làm cho **DNS** trở nên nhẹ hơn, ko phải quản lý tập trung bởi dữ liệu là rất lớn.
## 6. Nameserver and Zones
Các chương trình lưu trữu toàn bộ thông tin về **domain namespace** gọi là **nameserver**. **Nameserver** thông thường sẽ có thông tin hoàn chỉnh về một phần nào đó của domain **namespace** gọi là **zone**, **zone** này load từ file hoặc từ **nameserver** khác.

![](https://images.viblo.asia/983b7591-2064-4584-8de2-76972238a9e6.png)

Hình trên cho ta thấy một **domain edu** được chia ra thành nhiều **zone**. Mỗi **zone** được phân quyền quản lý riêng.

Có 2 kiểu nameserver: **primary master** và **secondary master**:
* Primary: chứa tất cả các thông tin cho domain
* Secondary: hoạt động dự phòng, đề phòng trường hợp Primary fail.
Quá trình **Primary** gửi bản sao của nó đến **Secondary** gọi là **zone transfer**.
## 7. Resolvers
Dành cho các **clients** truy cập vào **nameservers**. Các chương trình chạy host nếu cần thông tin từ domain namespace sẽ sử dụng **resolver**.
Resolver quản lý:
* Truy vấn nameserver
* Quản lý các trả lời từ nameserver
* Trả thông tin về cho chương trình yêu cầu

# Lời kết
Trên đây là các khái niệm cơ bản về **DNS**. Hi vọng sẽ giúp bạn hiểu rõ hơn về **DNS** là gì? Chúc các bạn thành công!