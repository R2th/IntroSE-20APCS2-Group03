### I. Tạo project
Ở đây mình tạo ra 3 project, trong đó:
- OcelotGateway: project API Gateway
- WebAPI.Cart: project service Giỏ hàng
- WebAPI.Product: project service Sản phẩm
![](https://images.viblo.asia/e909bf5b-a5bf-4fba-a691-bb598bf1b17b.png)

### II. Tạo api cho các service
Ở WebAPI.Cart, mình tạo các api cho cart
![](https://images.viblo.asia/6d122609-40f3-4fc7-8a1c-8fd13c2c6b70.png)

Config port cho WebAPI.Cart
![](https://images.viblo.asia/038480f5-ad3d-4bf1-a6f1-0a7836e21f0e.png)


Ở WebAPI.Product, mình tạo các api cho product
![](https://images.viblo.asia/ceb5301d-3658-4365-9c60-d5c65cbcb595.png)

Config port cho WebAPI.Cart
![](https://images.viblo.asia/74436a50-c80a-46fe-8460-de1d3610872a.png)


### III. Config API Gateway 
#### 1. Install package
Install package Ocelot trong project OcelotGateway
![image.png](https://images.viblo.asia/f1b467d9-ed95-4c35-9b78-97fc4d48e53b.png)

#### 2. Config
Tạo file ocelot.json và cấu hình như sau
![image.png](https://images.viblo.asia/92da68d9-a5a1-4846-8114-31633e3cb529.png)

Thêm Ocelot vào project
![image.png](https://images.viblo.asia/c54fbf5a-d574-4c57-b956-ea6d9fe2a54a.png)

### IV. Tính năng
#### 1. Routing
**Chức năng**
Ocelot sẽ nhận những request đầu vào và điều hướng đến service đích.
Config các route bằng cách tạo các route dưới dạng array json tại file ocelot.json:
![image.png](https://images.viblo.asia/0a6daec9-00af-43a0-97d4-2aba371be2bb.png)

Cấu trúc mỗi route:
![image.png](https://images.viblo.asia/a573c2d1-9a41-4b10-a830-f4b3c2cf636f.png)
* DownstreamPathTemplate, Downstreamscheme và DownstreamHostAndports xác định URL mà request sẽ được chuyển đến
* UpstreamPathTemplate là URL mà Ocelot sẽ sử dụng để xác định DownstreamPathTemplate sẽ sử dụng cho một request.
Ví dụ: theo config ở trên, khi client vào url */posts/{postId}* sẽ được map đến service tại *localhost:80/api/post/{postId}*

**Demo**
Ban nãy ta có tạo 2 web api service là:
* WebAPI.Cart: https://localhost:6001
* WebAPI.Product: https://localhost:7001
Giờ ta sẽ config API Gateway tại file ocelot.json trong project OcelotGateway
![image.png](https://images.viblo.asia/45e5c02e-1e08-4808-b4c7-046af659e87d.png)

**Kết quả**
Run 3 project WebAPI.Cart (port 6001), WebAPI.Product (port 5001), OcelotGateway (port 7141)
Khi truy cập https://localhost:7141/cart-gateway/Cart/First, request đã được map tới https://localhost:6001/cart-api/Cart/First
![image.png](https://images.viblo.asia/06d56774-c5c0-4f03-99b0-3e668ad9d446.png)
![image.png](https://images.viblo.asia/6ace9f67-9fcd-4fde-a1dc-a5e979d93377.png)

Tương tự với product-api, khi truy cập /product-gateway/Product/First, request đã được map tới: https://localhost:7001/product-api/Product/First
Tìm hiểu thêm một số tính năng khác của Routing độ ưu tiên, query string, dynamic route,... tại https://ocelot.readthedocs.io/en/latest/features/routing.html

#### 2. Aggregation
Ocelot cho phép map 2 hay nhiều request thành một request duy nhất
Ví dụ ta có 1 tính năng trước đây cần gọi 2 api riêng biệt là:
https://localhost:51881/laura: trả về {“Age”: 19}
https://localhost:51882/tom: trả về  {“Age”: 25}

Khi sử dụng Request Aggregation, ta có thể biến nó thành 1 request duy nhất. Khi đó response sẽ trả về {"Tom":{"Age": 19}, "Laura":{"Age": 25}}
![image.png](https://images.viblo.asia/52f78b5b-28ab-4ab7-a1ea-240672381ed0.png)

### Tài liệu tham khảo
[1] https://ocelot.readthedocs.io/en/latest/introduction/bigpicture.html

[2] https://www.c-sharpcorner.com/article/building-api-gateway-using-ocelot-in-asp-net-core/