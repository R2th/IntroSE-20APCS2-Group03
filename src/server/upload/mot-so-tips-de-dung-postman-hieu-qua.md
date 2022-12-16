Postman là một loại ứng dụng để giúp các developer làm việc với API một cách dễ dàng và nhanh chống. Bạn có thể cài đặt Postman trên tất cả OS: ubuntu, window, Mac, và có cả extension cho browser nữa. 
Tuy nhiên để sử dụng nó càng hiệu quả, trong bài này mình sẽ giới thiệu một số tip có thể giúp bạn làm việc vớ nó càng dễ dàng.

# History
![](https://images.viblo.asia/933b5e98-8a26-41de-9691-76c3591ff4b8.png)
Mỗi khi chúng ta request các API, Postman đã log nó vào tab history. Bạn có thể tìm các request mình đã request ở đây. Nó sẽ group theo ngày, có thể giúp mình tìm history dễ dàng.

# Collections
![](https://images.viblo.asia/eb46b919-6346-46fb-9eb6-dba944a3751a.png)

Collections là tập hợp / thư mục các API mình có thể lưu vào. Nó cũng tương tự với folder trong pc của mình. Ví dụ chúng ta có project API khác nhau, vậy chúng ta có thể lưu nó vào từng collection khác nhau. 

Để save request API, bạn chỉ cần click => "Save", sau đó form "save request" sẽ hiện lên để bạn có thể đổi tên và chọn lưu vào collections naò.

![](https://images.viblo.asia/b48ba95d-1904-4061-a4dc-dfa70e76b847.png)

Trong đó bạn có thể export / share collection với các member khác trong team.

![](https://images.viblo.asia/4105c969-d360-4048-9c8d-905e86ac2271.png)

![](https://images.viblo.asia/061bca0c-fbcf-4b38-808c-977425157d31.png)


# Collections for documentation
Khi làm việc trong team với API, việc tạo documentation là rất quan trọng. Postman cũng đã kết hợp săn chức năng documentation cho các collections của bạn. 
Bạn cần update các description cho collection, folder trong collection, và từng request để nó sẽ hiển thị trong documentation. 
![](https://images.viblo.asia/1a95322d-ad3d-415f-88b5-0f4b7d2856a1.png)

Sau đó, để preview documentation đó, bạn click trên "view in web", nó sẽ preview trên browser. Sau đó bạn cũng có thể publish documentation đó.

![](https://images.viblo.asia/58005adf-b93b-4667-9f1c-2e536caa5941.png)

# Environments
![](https://images.viblo.asia/9cb790fa-4a41-4f5b-8a32-da60b093272f.png)
Cái này là rất quan trọng. Gia sử bạn làm API có 3 môi trường: local, staging, production. Từng môi trường này sẽ có url, hoặc account login (email, password) , ... khác nhau. Nếu cần switch từ một môi trường sang môi trường khác, bạn cũng phải đổi lại các variable đó. 

Postman có chức năng Manage Environment giúp bạn tạo các variables đó vào trong từng môi trường, sau đó khi sử dụng môi trường nào chỉ cần switch đi switch lại environment là được.

![](https://images.viblo.asia/4ad0b93b-23ff-4176-8e8e-2d0d9af71f23.png)

Để dùng variable đó, bạn viết {{TEN_BIẾN}} là được. 
![](https://images.viblo.asia/275a9639-230a-470f-a933-1c7c14c65822.png)


Bạn có thể xem thêm ở những link sau:

https://www.guru99.com/postman-tutorial.html

https://blog.getpostman.com/2018/03/08/the-good-collection/

https://raygun.com/blog/postman-best-practices/