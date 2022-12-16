Tiếp nối bài viết trước, bài viết này mình sẽ giới thiệu các tính năng của Ocelot API Gateway. 
### 1. Authentication
a. Install package JwtBearer
![image.png](https://images.viblo.asia/6e8664c4-5a86-47e9-b774-7466187a58c9.png)

b. Tạo 3 project
* **OcelotGateway**: API Gateway
* **WebAPI.Authen**: Authen Server
* **WebAPI.Private:** API được authen
![image.png](https://images.viblo.asia/9e0965f6-4166-4df0-872b-e4b59489a01f.png)

c. Tạo Authen API để lấy quyền authen trong project WebAPI.Authen
![image.png](https://images.viblo.asia/02a5fb15-597f-4b1e-9e99-021516bd7213.png)

d. Tạo authen cho service WebAPI.Private
![image.png](https://images.viblo.asia/b953121d-cc91-4efb-9515-7b720eeb34c4.png)
![image.png](https://images.viblo.asia/cccb2180-a8fc-416f-8508-f8079f4be6a6.png)

e. Tạo authen trong program.cs của project OcelotGateway
![image.png](https://images.viblo.asia/00961ddf-625a-402d-92ff-943cb4d4ba72.png)

f. Map route vào Gateway
![image.png](https://images.viblo.asia/bc89120c-bdef-438e-b7be-fb5db3eff230.png)

g. Tại route đến Service được authen, thêm config authen 
![image.png](https://images.viblo.asia/22c073b3-8998-4886-ad07-91d34a6b72d8.png)

**Kết quả:**
Run 3 project WebAPI.Private, WebAPI.Authen, Ocelot Gateway
=> Khi gọi API từ service WebAPI.Private sẽ trả về code 402: https://localhost:7141/private-gateway/Private/First
=> Phải xác thực bằng cách gọi đến serive WebAPI.Authen để lấy token: https://localhost:7141/authen-gateway/Authen/Get?name=vonhatnam&pwd=1
=> Gửi kèm token trong Header để có thể truy cập api từ service WebAPI.Private

### 2. Rate limiting
**Chức năng**
Ocelot hỗ trợ giới hạn số lượng, tỉ lệ các request để các service không bị quá tải. 
![image.png](https://images.viblo.asia/86b37fe9-7ec6-491c-ac8d-00bf13391d19.png)

**Config**
![image.png](https://images.viblo.asia/4e0e7a62-b1aa-46e8-8873-24842b53de50.png)
* **ClientWhitelist** - Client có ip trong mảng này sẽ không bị ảnh hưởng bởi rate limiting. 
* **EnableRateLimiting** - bật tính năng rate limiting 
* **Period** - chỉ định khoảng thời gian mà rate limitting áp dụng, chẳng hạn như 1S, 5M, 1H, 1D, v.v. Nếu bạn thực hiện nhiều yêu cầu hơn trong khoảng thời gian hơn giới hạn cho phép thì bạn cần phải đợi thời gian trôi qua trước khi bạn đưa ra yêu cầu khác. 
* **PeriodTimespan** - sau số giây này chúng ta có thể gửi lại request
* **Limit** - xác định số lượng yêu cầu tối đa mà client có thể thực hiện trong một khoảng thời gian xác định.
* **DisableRateLimitHeaders** - chỉ định xem các X-Rate-Limit và Retry-After headers có bị vô hiệu hóa hay không.
* **QuotaExceededMessage** - mô tả lỗi khi xảy ra rate limit
* **HttpStatusCode** - mô tả mã code khi xảy ra rate limit
* **ClientIdHeader** - xác định tiêu đề được sử dụng để xác định khách hàng. Theo mặc định, nó là "clientid"

### 3. Caching
**Chức năng**
Ocelot tự động cache lại các api request để không gọi lại lần sau

**Config**
a. Install package Ocelot.Cache.CacheManager
![image.png](https://images.viblo.asia/eef12af2-4683-4191-a070-fd37043b4540.png)

b. Config trong program.cs
![image.png](https://images.viblo.asia/e1742c27-6359-4a42-b468-6449c98258b2.png)

c. Config trong route tại ocelot.json
![image.png](https://images.viblo.asia/3466e5f6-ae1b-4963-9be8-960d6b8a808b.png)

**TtlSeconds**: thời gian cache
**Region**: đặt tên nhóm cache để xoá cache khi cần thiết

### 4. Quality of Service
**Chức năng**
Mục đích sử dụng: tự động ngắt request và quăng ra exception khi timeout.

**Config**
a. Install package Ocelot.Provider.Polly
![image.png](https://images.viblo.asia/3369558b-0c0e-4a31-8518-0ad2c91ef23e.png)

b. Config trong program.cs
![image.png](https://images.viblo.asia/6548ca5f-1b06-4a42-aad8-c8b970881761.png)

c. Config trong route tại ocelot.json
![image.png](https://images.viblo.asia/96bd028e-06a2-4849-95f4-3d298439b809.png)

Khi truy cập http://localhost:5001/product-gatewaye/{controller}/{action}: 
* Nếu server không trả về response trong 2 giây, nó sẽ ném một exception. 
* Nếu server ném ra một exception thứ hai, máy chủ sẽ không thể truy cập được trong 5 giây.

**ExceptionsAllowedBeforeBreaking**: số lần exception cho phép trước khi break
**DurationOfBreak**: thời gian break khi exception
**TimeoutValue**: set timeout để ném ra exception 

### 5. Load Balancing
**Chức năng**
Tự động cân bằng, điều hướng các request để tối ưu hệ thống

**Config**
![image.png](https://images.viblo.asia/5d144612-36ab-4660-b724-9da0733d91a0.png)
* **DownstreamHostAndPorts**: Listing các host để ocelot điều hướng giúp cân bằng tải
* **LoadBalancer**: thuật toán ocelot sử dụng để điều hướng:
        **RoundRobin**: luân phiên 
        **LeastConnection**: chuyển request đến server có ít kết nối nhất
        **NoLoadBalancer**: lấy service đầu tiên khả dụng
        **CookieStickySessions**: sử dụng cookie để gắn tất cả các request vào một server cụ thể.
        
### Tài liệu tham khảo
[1] https://ocelot.readthedocs.io/en/latest/introduction/bigpicture.html

[2] https://www.c-sharpcorner.com/article/building-api-gateway-using-ocelot-in-asp-net-core/