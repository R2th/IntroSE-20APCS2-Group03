## I. Tổng quan về kiến trúc phần mềm

![image.png](https://images.viblo.asia/e0c5df7a-f5d4-4ff9-aeaf-d448ab3ce76a.png)

<div align="center">Application without architecture (nguồn: Internet)</div>

![image.png](https://images.viblo.asia/3c7ace06-77d5-4598-bac7-e1884896fa18.png)

<div align="center">Application with clean architecture (nguồn: Internet)</div>

## II. Tại sao chúng ta cần kiến trúc hoá ứng dụng
- Tạo ra ứng dụng dễ mở rộng, maintain
- Không bị ảnh hưởng từ framework/library
- Dễ dàng sharing cho team members, stakeholders
- Giảm thời gian triển khai giữa các team (FrontEnd/Backend/MobileApp)

## III. Hexagonal Architecture là gì?
![image.png](https://images.viblo.asia/ec50a3d3-a046-4901-a4fd-96fff35363a3.png)
<div align="center">Hexagonal Architecture</div>

- Hexagonal Architecture (tên gọi khác là ports and adapters architecture), là một mẫu kiến trúc được dùng trong thiết kế phần mềm. Nó hướng tới việc xây dựng ứng dụng xoay quanh business/application logic mà không ảnh hưởng hoặc phụ thuộc bởi bất kì thành phần bên ngoài, mà chỉ giao tiếp với chúng qua ports/adapters.
- Vì tính không phụ thuộc nên chúng ta dễ dàng chuyển đổi giữa các data sources (libs/frameworks) mà không ảnh hưởng đến business/application logic. Inputs/Outputs của data sources đều được đặt ở các cạnh của hình lục giác (hexagonal)
- Có thể implement business logic trước khi lựa chọn library hay framework
- For fun: **Tại sao lại là hexagonal (6 cạch) mà không phải bất kì hình khác?** 
     -> Lục giác chỉ là tên gọi, trên thực tế chúng là đa giác và với vô số ports/adapters dùng để kết nối với data sources bên ngoài.

## IV. Tại sao hexagonal được sinh ra
1. Chúng ta cùng xem qua một đoạn code rất hay gặp: 

![image.png](https://images.viblo.asia/713b97a9-b067-4a0f-84ac-2b1c130da953.png)
<div align="center">Nguồn: Internet</div>

2. Review: 
- Đoạn code trên nằm trong 1 file có tên functions/**.php
- Có cả code Javascript, Jquery, Html trong cùng 1 file
- Ngăn cách logic với nhau bằng 1 hàng trống
- Số dòng trong file vô cùng lớn
- Cùng chứa cả business logic, UI logic

## V. Giải pháp của Hexagonal Architecture
- Tách bạch phần code xử lý liên quan về business/application ra khỏi thành phần khác

![image.png](https://images.viblo.asia/8c076cf1-bcbb-4a76-b2fb-1577104ccae2.png)

![image.png](https://images.viblo.asia/0bd08043-2f7a-430d-b806-0779393710ed.png)

- Phân chia business code ra thành Domain và Use cases

![image.png](https://images.viblo.asia/17d14827-73d5-4fd6-bff2-017f9f7410ef.png)

- Các thành phần bên ngoài (có thể) phụ thuộc bên trong nó **nhưng không ngược lại**

![image.png](https://images.viblo.asia/17cd7fb6-59a4-4214-a8fd-b4f695b404af.png)

![image.png](https://images.viblo.asia/ee2152a8-1d18-4b4d-8744-1c665080c1dc.png)

## V. Triển khai
Chúng ta chia logic code thành 2 thành phần 
![image.png](https://images.viblo.asia/4531b5d0-f02d-4ace-91bf-8f953511d6ee.png)
* **Domain**

`- models: Khởi tạo những models cần thiết, types or interfaces`
 
![image.png](https://images.viblo.asia/197e2642-de52-4805-a361-8f92a4061b82.png)

`- repositories: tất cả types và interfaces liên quan đến repository (một repository chịu trách nhiệm lấy data từ nhiều nơi khác nhau về, như web services, database, hay một file bất kì...)`
    
![image.png](https://images.viblo.asia/2efe91d4-f46f-4f29-92d9-31fae35561d6.png)

`- services: chịu trách nhiệm tương tác với models và thực thi những hành động liên của chúng. Ví dụ: implement method kiểm tra cho phép thêm sản phẩm vào giỏ hàng nếu tồn kho sản phẩm > 0`
    
![image.png](https://images.viblo.asia/84fa2df5-f49c-41b2-9d56-2b47c6eab832.png)

* **Infrastructufre**

`- http: Lưu trữ những thứ liên quan đến phía client`, (e.g. DTO nhận từ một repository)

![image.png](https://images.viblo.asia/b3532df2-add5-439f-9646-42fdc8773bb9.png)

`- instances: instance của client và repositories. Được xem như là entry point của hệ thống`

![image.png](https://images.viblo.asia/c61dbcf5-dc87-4e53-a926-6ea395f8725b.png)

![image.png](https://images.viblo.asia/a0918927-d15f-43ba-8d30-6449105329b6.png)
<div align="center">Nếu phải chuyển đổi axios sang sử dụng fetch hay ajax, chúng ta vẫn dễ dàng thay đổi bằng cách tạo 1 instance mới cho chúng.</div>
    
    
    
`- repositories: Implement repositories đã được define ở domain`

![image.png](https://images.viblo.asia/baa4903a-29fc-4f32-b76b-2ac83856f622.png)


**- Ví dụ với VueJs**

![image.png](https://images.viblo.asia/9d30f34b-630e-4432-93f7-dc532524d225.png)

## VI. Tổng kết
- Ưu điểm của Hexagonal Architecture
    + Tổ chức code xoay quay business rules, không phải framework hay library
    + Dễ kiểm soát bởi nguyên tắc phụ thuộc chỉ cho phép các layer phụ thuộc các layer bên trong nó
    + Hỗt trợ tốt triển khai testing, maintain
    + Code base dễ dàng mở rộng
    + Ứng dụng miễn phụ thuộc với sự phát triển của công nghệ (library/framework)
    + Hạn chế việc tốn thời gian trong việc lựa chọn công nghệ cho dự án
    + Codebase có thể dùng chung cho frontend, backend hay mobile app
- Nhược điểm
    + Tổ chức code phức tạp, tốn thời gian hơn
## VII. Reference
- https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749
- https://on.notist.cloud/pdf/deck-dbe66987d567dd16.pdf
- https://jmgarridopaz.github.io/content/hexagonalarchitecture.html


### Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `kha.le@hoang-phuc.net`. 

Cảm ơn các bạn đã đọc.