### Intro
Trong bài viết sẽ giới thiệu về cách sử dụng [Retrofit](https://square.github.io/retrofit/) trong spring boot kotlin.

### Requirement
- `IDEA 2020.3`
- `Docker 19.xx`
- `docker-compose 1.28.x`
- `external api resource` ở đây được viết bằng `golang` bạn có thể tham khảo ở bài viết [https://viblo.asia/p/restful-web-api-crud-using-gorm-in-golang-4P856nRA5Y3](https://viblo.asia/p/restful-web-api-crud-using-gorm-in-golang-4P856nRA5Y3)

### Spring boot Kotlin setup
Các bạn có thể khởi tạo bằng 2 cách: 
- Tham khảo bài viết trước [Spring boot Kotlin Auto Build on Docker Compose Runtime](https://viblo.asia/p/spring-boot-kotlin-auto-build-on-docker-compose-runtime-RnB5pj7YZPG) 
- Sử dụng https://start.spring.io/ với config như sau

![](https://images.viblo.asia/f92e4915-6661-4ab9-b191-94c16617c585.png)

- Thêm dependency vào `build.gradle.kts`

``` kotlin
implementation("com.squareup.retrofit2:retrofit:2.9.0")
implementation("com.squareup.retrofit2:converter-gson:2.9.0")
```

### Code implement

#### Kotlin
- Tạo controller với path `/` để check server đã chạy, nếu nhận được như hình trong trình duyệt là đã chạy.

![](https://images.viblo.asia/c367ee31-fd63-4f8a-a841-14b197affdb5.png)  ![](https://images.viblo.asia/fcf6ac13-25c1-42f4-aa92-510a2763c7b9.png)

- Tạo DAO

![](https://images.viblo.asia/6a1968fc-984e-4c45-85d0-42f03429fe92.png)

- API interface: Tạo 2 request `GET`  

![](https://images.viblo.asia/ede1ce24-847d-4e6e-820f-8e27009c9bf7.png)

- Service: External api resource cập tại http://localhost:8081

![](https://images.viblo.asia/1003f98d-56e7-4669-b40b-76ec770b7654.png)

- Controller: Thêm 2 routes để xử lý request đến external api resource thông qua service

![](https://images.viblo.asia/a43a1e21-f505-4281-8785-2844ea16af9f.png)

#### Golang

- Model và các hàm trả về thông tin cho handler

![](https://images.viblo.asia/97aded5c-c5fc-4ad0-a55c-fa98373199b9.png)

- Handler xử lý request

![](https://images.viblo.asia/50df74a6-73bc-408c-8612-5f07e96e3a79.png)


### Kết quả

- Test external api resource đã chạy http://localhost:8081

![](https://images.viblo.asia/b095a499-d580-4500-b498-771e4994afa6.png)
![](https://images.viblo.asia/4a7294a2-61dd-44f1-adcc-f1121a3eb94b.png)

- Test spring boot kotlin http://localhost:8080

![](https://images.viblo.asia/10168b6e-d522-485f-a9ef-4ff6f99f5a9f.png)
![](https://images.viblo.asia/60d92357-7df7-446f-87af-7f12fe22c690.png)

### References
- [Retrofit](https://square.github.io/retrofit/)