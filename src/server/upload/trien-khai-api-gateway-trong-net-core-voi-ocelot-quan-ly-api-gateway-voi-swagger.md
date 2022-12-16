Trước đây, để quản lý các API, ta có công cụ là Swagger, tuy nhiên đối với API Gateway như Ocelot thì sao?
Trong bài viết này, mình sẽ hướng dẫn cách setup Swagger để quản lý tài liệu API Gateway với SwaggerForOcelot - tổng hợp các service swagger

### a. Install package MMLib.SwaggerForOcelot

### b. Config tại program
![image.png](https://images.viblo.asia/6d023e27-c178-4a48-9eae-b9e362255fdc.png)

### c. Cấu hình lại từng route bằng cách thêm swagger key và *{everything}* ở path
![image.png](https://images.viblo.asia/3f3fa69c-52c0-4f26-9394-7f157fb98f25.png)

### d. Config swagger endpoints
![image.png](https://images.viblo.asia/670be801-b2b0-4594-b8e7-f37e2870ad80.png)

### e. Kết quả
![image.png](https://images.viblo.asia/b108b61b-da3f-4623-bfce-e362523134e9.png)

### Tài liệu tham khảo
[1] https://ocelot.readthedocs.io/en/latest/introduction/bigpicture.html

[2] https://www.c-sharpcorner.com/article/building-api-gateway-using-ocelot-in-asp-net-core/