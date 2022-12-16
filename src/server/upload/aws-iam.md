![](https://images.viblo.asia/c7de95d6-bb00-47c5-b7e5-a7a49bc1171a.png)

---

**Cloud Computing** (công nghệ điện toán đám mây) là mô hình sử dụng các công nghệ máy tính và phát triển dựa vào mạng Internet.

Dịch vụ cloud (điện toán đám mây) cung cấp công nghệ cho các công ty thuê, phục vụ qua kết nối Internet và chỉ phải trả cho những gì họ sử dụng, trái ngược với phương pháp truyền thống là mua phần cứng và phần mềm rồi tự cài đặt và bảo trì.

## AWS là gì ?
**AWS** (Amazon Web Services) là một hệ thống các dịch vụ điện toán đám mây cung cấp cho doanh nghiệp các giải pháp về: Storage(`S3`, `EBS`, ...), computing power(`EC2`), databases(`DynamoDB`, `RDS`), networking, analytics, developer tools, sercurity, virtualization, … (các **AWS Resources**).

Trong đó 2 service quen thuộc với chúng ta nhất là `AWS EC2`(dùng để lưu trữ, vận hành máy chủ server) và `AWS S3`(với mục đích lưu trữ dữ liệu).

## What is IAM?
**AWS** cung cấp **IAM**(AWS identity and Access Management), là một dịch vụ `web service` bảo mật,  giúp ta kiểm soát các truy cập tới `AWS Resources`.

Ta sử dụng **IAM** để xác định mỗi truy cập (`request`) tới các `AWS Resources` là của ai ? (`authentication`) và người đó có quyền truy cập tới `Resources` chỉ định này hay không ? (`authorization`).

## How IAM work?
### Resources

Là những `AWS resources` do **AWS** cung cấp, 1 EC2, 1 S3 bucket, ...

### Principal

Là một người hoặc một application nào đó với mục đích thực hiện các `action`/`operation` lên các `AWS resources`.

Để làm được điều này, `principal` cần được cấp một **IAM identities** và gửi **Request**  tới **AWS**.

### IAM identities

Khi muốn cấp quyền cho người khác hoặc một ứng dụng nào đó được phép access **AWS** account, ta sẽ tạo ra các `IAM identities` cung cấp cho người/application sử dụng để access **AWS** account.

#### IAM users

Đại diện cho một `user` hoặc `application` muốn interact với **AWS**.

Mỗi `IAM users` được tạo ra sẽ được cấp thông tin về `username`, `accountID`,  `password`, `access_key`,  `secret_key` (cái này sẽ chỉ được download 1 lần duy nhất khi tạo account):
* `username`, `accountID`,  `password` được dùng để đăng nhập tới `AWS Console`

![](https://images.viblo.asia/4131d77f-4adc-4db3-bf05-8b1776ea5d56.PNG)


* `access_key`,  `secret_key` dùng trong `AWS CLI`, sử dụng trong mỗi `request` tới **AWS**

#### IAM groups

`IAM groups` là tập hợp của các `IAM Users` lại và quản lý như 1 unit.

Được dùng khi muốn assign `policy` cho 1 loạt user cùng 1 lúc																							
Ví dụ, khi muốn các user có quyền admin thì tạo group admin đưa các user đó vào	group, sau đó tạo `policy admin`  và gán cho group.

#### IAM roles

IAM roles có đơn giản hiểu nó như 1 IAM user nhưng không có password hay access key


### Policy

Khi tạo ra các `IAM identities`, ta sẽ gán cho chúng những `policy`. `Policy` chỉ ra những `action`, `resouces` nào mà `IAM identities` được gán được phép hoặc không được phép (`allow`/`deny`) thực hiện:

```
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "dynamodb:*",
    "Resource": "arn:aws:dynamodb:us-east-2:123456789012:table/Books"
  }
}
```

Có 2 loại `policy`:

* **Identity-based Policy** được gán cho `IAM identities` (`IAM Users`,  `IAM Groups`, `IAM Roles`) chỉ định những `action/operation` và những `resources` tương ứng mà `IAM identities` được phép hoặc không được phép thực hiện.
* **Resouce-based policy** được gán thẳng tới từng `AWS Resource` chỉ ra `Pricipal` nào có thể thực hiện hoặc không được phép các `action/operation` lên chúng.

### Request

`Principal` được cấp `IAM identities` sẽ đăng nhập tới **AWS Console** hoặc dùng **CLI** để gửi các **Request** tới **AWS**.

Một `Request` bao gồm:
* `Action/Operation`: xác định hành động muốn thực hiện
* `Resouces`: **AWS** resources muốn tác động tới
* `Principal`: xác thực người/application nào gửi `request`
* `Environment data`: Thông tin thêm như IP address, SSL enable status, time of day ...				* * `Resource data`: Data liên quan tới resource được yêu cầu. Ví dụ như chi tiết hơn Database là chỉ ra table nào

### Authentication

`Request` được `Principal` gửi cần qua một bước `authen` (xác thực). Để xác thực với **AWS**, `Principal` cần phải đăng nhập tới `AWS Console` với thông tin `email`, `password` (với **Root user**, người lập **AWS account**) hoặc với **IAM user**  thì cần `Account ID` cộng với `username` và `password`. Còn để xác thực với `AWS CLI`,  `Principal` cần cung cấp `Access key` và `Secret key` trong một `Request` gửi tới **AWS**.

### Authorization

Sau khi qua bước `authentication`, **AWS** sẽ kiểm tra xem `Princial` có quyền để thực hiện các `Action/Operation` tới `Resources`được chỉ định hay không ? . 

Trong quá trình Author, **AWS**  sẽ check `policy` để xem quyền thế nào để `allow` hay `deny`.

**AWS**  sẽ check các `policy`, nếu có 1 `policy` là `deny` thì **AWS** sẽ deny luôn và không kiểm tra tiếp các `policy` kế sau:
* Default, tất cả request là `deny` ( trừ root)																							
* Nếu có 1 `policy` là `Allow` thì nó sẽ ghi đè lên quyền default
* Nếu có 1 `policy` mà ghi rõ là `deny` thì nó sẽ ghi đè toàn bộ các `allow`

### Action/Operation																								

Sau quá trình `Authentication`và `Authorization` **AWS** sẽ approved/reject các `ction/Operation`của `Request`.

Các action thường được ghi rõ trong `policy`.