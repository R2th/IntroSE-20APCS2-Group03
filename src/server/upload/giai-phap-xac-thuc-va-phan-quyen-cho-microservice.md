Kiến trúc microservices đem đến rất nhiều lợi ích cho phát triển phần mềm, chẳng hạn như đội ngũ phát triển không cần quá lớn, vòng đời phát triển ngắn, linh hoạt trong việc lựa chọn ngôn ngữ, và không thể kể đến khả năng scaling tuyệt vời.

Cùng lúc đó, tồn tại không ít vấn đề phức tạp nảy sinh từ hệ thống phân tán. Một trong những thách thức đặt ra là làm sao để cài đặt một cơ chế xác thực và phân quyền cho kiến trúc microservice. Bài viết này sẽ cung cấp một giải pháp hoàn chỉnh hơn về vấn đề này.

### I. Authentication và Authorization cho ứng dụng Monolithic 
Nhiều người hay nhầm lẫn giữa *authentication* và *authorization*, để đơn giản:

* Authentication (Xác thực): xác nhận bạn là ai, thường thì bạn cần ```username``` và ```password``` để xác thực.
* Authorization (Phân quyền): xác định xem bạn có thể làm gì, chẳng hạn là quyền truy cập, chỉnh sửa hoặc xóa dữ liệu, sau khi bạn xác thực.

Trong kiến trúc monolithic, khi người dùng login, một module của ứng dụng sẽ xác thực định danh của người dùng. Sau đó, thì session sẽ được tạo, để lưu thông tin người dùng đăng nhập. Server trả về session ID cho client. Client sẽ lưu Session Id như cookie và gửi cùng với những request tiếp theo. Ứng dụng sẽ có thể sử dụng Session Id để xác thực người dùng mà không cần đăng nhập lại nữa.

![](https://images.viblo.asia/16182336-d7cf-4091-a3d8-1b937ba6eaa2.png)

Khi client truy cập ứng dụng, Session Id được gửi đến ứng dụng dựa vào HTTP request. Module bảo mật sẽ xử lý tất cả các request được gửi từ client thông qua một cơ chế phân quyền. Cơ chế này trước hết sẽ xác thực người dùng đã đăng nhập hay chưa (dựa vào session id), sau đó nó sẽ kiểm tra xem người dùng có thể truy cập tài nguyên hay không.

![](https://images.viblo.asia/02834592-36ef-49ad-9310-8f0a4746ce34.png)

### II. Vấn đề authentication và authorization của Microservices
Ở kiến trúc microservice, một ứng dụng được chia thành nhiều microservice, mỗi microservice này cài đặt một module nào đó trong business logic của ứng dụng ban đầu. Và sau khi chia nhỏ ứng dụng, mỗi request truy cập đến microservice cần được xác thực và phân quyền. Nếu so sánh với việc cài đặt ứng dụng Monolithic, bạn sẽ thấy những vấn đề sau:

* Logic xác thực và phân quyền cần được xử lý ở mọi service, và một phần logic này cần được cài đặt lặp đi lặp lại ở mọi microservice. Cho dù ta có thể viết code để tái sử dụng, nhưng sẽ dẫn đến một tình trạng là tất cả các microservice sẽ phụ thuộc vào một đoạn code, ảnh hưởng đến tính linh hoạt về việc lựa chọn ngôn ngữ cũng như framework của microservice.
* Microservice nên áp dụng nguyên tắc *single responsibility*, tức là mỗi microservice nên chỉ xử lý một *business logic*. Logic xác thực và phân quyền không nên được cài đặt ở mỗi microservice.
* HTTP là giao thức stateless. Với server thì mỗi HTTP request đều độc lập với nhau, nghĩa là server có thể gửi request của client đến bất kỳ node nào trong cluster server. Với những service mà không yêu cầu xác thực thì không sao. Tuy nhiên, nhiều service như *online shoping* hoặc hệ thống quản lý lơn thì cần xác thực định danh của người dùng. Bởi vậy, một cơ chế để lưu trạng thái login của người dùng là cần thiết để tránh việc xác thực lặp đi lặp lại. Cách truyền thống là dùng session ở phía server để lưu trạng thái người dùng. Nhưng vì server là statefull nên sẽ ảnh hưởng đến khả năng scale.
* Việc xác thực và phân quyền trong kiến trúc microservices có nhiều kịch bản phức tạp hơn, chẳng hạn người dùng truy cập service, ứng dụng của bên thứ ba truy cập service, và các service trao đổi thông tin cho nhau.

### III. Giải pháp kỹ thuật để xác thực và phân quyền cho Microservices
#### 1. Distributed Session Management (Quản lý session phân tán)
Để tận dụng lợi thế của kiến trúc microservice, microservice nên stateless.

Giải pháp này có thế áp dụng theo nhiều cách khác nhau như sau:
* **Sticky session**

Đảm bảo tất cả request từ một user sẽ luôn được gửi đến cùng một server đã xử lý request đầu tiên của user đó, như thế thì có thể đảm bảo được session sẽ luôn chính xác. Tuy nhiên cách này thì yêu cầu load balancer, và nó chỉ đáp ứng được kịch bản *horizontally scaling* cluster, nhưng khi load balancer đột nhiên vì lý do nào đó mà gửi user đến server khác thì tất cả session của user đó sẽ bị mất.

* **Session replication**

Nghĩa là mỗi server lưu hết session, và đồng bộ thông qua mạng. Việc đồng bộ session có thể dẫn đến tắc nghẽn băng thông mạng vì cứ mỗi lần session thay đổi thì dữ liệu lại phải được đồng bộ đến tất cả các server. Càng nhiều server thì băng thông mà việc đồng bộ cần lại càng lớn.

* **Centralized session storage**

Nghĩa là khi user truy xuất một microservice, dữ liệu người dùng có thể được lấy từ một nơi lưu trữ session chung, để đảm bảo tất cả các microservice đọc được  dữ liệu giống nhau. Ở một số trường hợp thì cách này rất là hay. Nhưng bất lợi của nó là việc quản lý session tập trung sẽ yêu cầu một cơ chế bảo mật riêng biệt.

![](https://images.viblo.asia/b39ba98d-3507-45da-8af6-7babba330813.png)

#### 2. Client Token

Cách truyền thống là dùng session ở phía server để lưu lại trạng thái người dùng. Vì server là statefull, nó sẽ ảnh hưởng đến khả năng *horizontal scaling* (nôm na là tăng thêm server, khác với vertical scaling là tăng thêm tài nguyên cho server). Giải pháp ở đây là dùng token để lưu trạng thái đăng nhập của người dùng trong kiến trúc microservice.

Khác biệt giữa token và session là nơi lưu trữ. Session được lưu ở server, token thì được giữ bởi người dùng và được lưu ở trình duyệt theo dạng cookie.

Token được dùng để xác thực định danh của người dùng. Bởi vậy nội dung của token cần được mã hóa để tránh bị giả mạo. JWT (Json Web Token) là một chuẩn (RFC 7519) định nghĩa format, nội dung và mã hóa token.

Cấu trúc của JWT token rất đơn giản, gồm 3 phần:

* **Header**

kiểu cố định là JWT, và giải thuật hash.

```
{
"typ": "JWT",
"alg": "HS256"
}
```


* **Payload**

bao gồm thông tin như *user id*, *expiration date*, *user name*, và cũng có thể chứa thêm thông tin khác do người dùng tự định nghĩa.

```
{ 
"id": 123, 
"name": "Mena Meseha",
"is_admin": true,
"expire": 1558213420 
}
```

* **Signature**

được dùng để xác thực token

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

3 phần này được kết hợp sử dụng *base64 encoding* và trở thành token mà được trả về cho user, format như sau:
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIzLCJuYW1lIjoiTWVuYSBNZXNlaGEiLCJpc19hZG1pbiI6dHJ1ZSwiZXhwaXJlIjoxNTU4MjEzNDIwfQ.Kmy_2WCPbpg-aKQmiLaKFLxb5d3rOC71DHexncH_AcQ
```

Bằng cách sử dụng token thì server sẽ không phải lưu trạng thái của user nữa. Flow xác thực cơ bản như hình dưới đây:

![](https://images.viblo.asia/6ec93785-4b9e-4add-8139-a3def3dcf9cc.png)

#### 3. Single sign-on
Ý tưởng của *single sign-on* rất đơn giản, đó là người dùng chỉ cần đăng nhập 1 lần, và họ có thể truy cập mọi microservice của ứng dụng. Giải pháp này có nghĩa là mỗi service sẽ phải tương tác với *authentication* service như dưới:

![](https://images.viblo.asia/082cfd09-58e5-4d00-966a-134d76b39676.png)

Điều này tạo ra một vấn đề là lặp đi lặp lại một thao tác validate với một lưu lượng mạng rất nhỏ, có thể dẫn đến *single point of failure*. Và khi số lượng ứng dụng micro tăng lên thì điểm yếu của giải pháp này sẽ càng trở nên rõ ràng hơn.

#### 4. Client Token với API Gateway
Quá trình xác thực người dùng tương tự như cách sử dụng token. Khác biệt duy nhất là API Gateway được thêm vào như một cổng chờ các *external request*. Kịch bản này có nghĩa là tất cả các request phải thông qua API Gateway, nhằm mục đích là ẩn đi sự hiện diện của microservice. Với mỗi request thì API Gateway sẽ dịch token của người dùng thành một token riêng mà chỉ nó có thể resolve:


![](https://images.viblo.asia/d5af0ca1-ebed-490c-a33e-d6a9b20fd3d4.png)

Với cách này thì *log off* không còn là một vấn đề bởi vì API Gateway có thể revoke token của người dùng khi *log out* cũng như tránh việc token có thể bị giải mã bằng cách giấu nó khỏi client.

Lưu ý: Tại sao nói *log off* không còn là một vấn đề, bởi vì nếu sử dụng theo cách  thứ 2, tức là client token, thì ta không thể tự revoke token được, nói cách khác là token khi được sinh ra thì chỉ bị vô hiệu hóa khi nó hết thời gian mà thôi, JWT về cơ bản không có cơ chế revoke.
#### 5. Third-party application access
**5.1. API Token**
Ứng dụng bên thứ 3 sử dụng API token để truy cập dữ liệu. Token được sinh bởi người dùng và được dùng bởi ứng dụng bên thứ 3. Trong trường hợp này ứng dụng bên thứ 3 được cho phép truy cập thông tin của chỉ riêng người dùng đó.

Chẳng hạn, Github cung cấp API token. Người dùng tạo token và sử dụng nó để truy cập Github API. Khi tạo token thì bạn có thể cài đặt kiểu dữ liệu mà token có thể truy cập, chẳng hạn như xem thông tin repo, xóa repo, xem thông tin người dùng...

```
curl -u menameseha:f3kdfvf8e882424ed0f3bavmvdl88c01acd34eec https://api.github.com/user
```

Lợi ích của sử dụng API token thay vì dùng username/password là giảm nguy cơ bị lộ mật khẩu của người dùng.

**5.2. OAuth**
Một số ứng dụng bên thứ 3 cần truy cập dữ liệu từ nhiều người dùng, hoặc tích hợp dữ liệu từ nhiều người dùng. Lúc đó bạn có thể xử dụng OAuth. Với OAuth, khi một ứng dụng bên thứ 3 truy cập service, ứng dụng sẽ thông báo người dùng xác thực quyền mà bên thứ 3 có thể sử dụng là gì

Ví dụ như ở Github, một số ứng dụng bên thứ 3 như GitBook hoặc Travis CI, được tích hợp OAuth và Github. OAuth có quy trình xác thực riêng cho từng kịch bản. Một quy trình cụ thể như hình dưới:

![](https://images.viblo.asia/35dfeb5a-c23e-4b54-bb69-2f58c47265c6.png)

>> Trong ví dụ trên, resource server và authorization server đều là Github, client là GitBook hoặc Travis CI, và người dùng là người trực tiếp sử dụng client.
>> 

Một số người thắc mắc tại sao *authorization code* lại dùng để request access token, thay vì trả trực tiếp access toekn cho client. Lý do là OAuth được thiết kế theo cách này để truyền thông qua *user agent* (trình duyệt) trong quá trình redirect đến callback url của client. Nếu mà trả trực tiếp access token thì có thể bị trộm (hãy hình dung với cơ chế attach file và gửi mật khẩu qua mail của Framgia, nó na ná như vậy)

### Tổng kết
Về cơn bản, dưới khía cạnh kiến trúc microservice, tôi thích kết hợp OAuth và JWT. Tất nhiên, trong nhiều trường hợp thì hệ thống session phân tán lại đáp ứng hoàn hảo cho mọi yêu cầu. Thế nên việc chọn giải pháp cài đặt *authentication* còn tùy vào nhu cầu thực sự của hệ thống.

Tổng hợp từ [https://medium.com/tech-tajawal/microservice-authentication-and-authorization-solutions-e0e5e74b248a](https://medium.com/tech-tajawal/microservice-authentication-and-authorization-solutions-e0e5e74b248a)