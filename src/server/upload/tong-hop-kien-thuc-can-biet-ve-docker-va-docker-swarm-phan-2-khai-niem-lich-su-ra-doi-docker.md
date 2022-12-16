## I. Lý do ra đời
* Trước đây, việc setup và deploy application lên một hoặc nhiều server rất vất vả từ việc phải cài đặt các công cụ, môi trường cần cho application đến việc chạy được ứng dụng chưa kể việc không đồng nhất giữa các môi trường trên nhiều server khác nhau. 
* Vì lý do đó, Docker ra đời để giải quyết vấn đề này.
* Docker cho phép các developers tạo các môi trường độc lập và tách biệt để khởi chạy và phát triển ứng dụng và môi trường này được gọi là container. Khi cần deploy lên bất kỳ server nào chỉ cần run container của Docker thì application của bạn sẽ được khởi chạy ngay lập tức.

### Ví dụ
Hãy tưởng tượng bạn code 1 cái ứng dụng, có 1 cái web server được viết bằng NodeJs, có database là PostgreSQL, sử dụng Redis để lưu trữ message,... Mỗi cái như này các bạn phải cài rất là nhiều thư viện, dependencies, đi kèm theo đó là những cái config.. Và khi các bạn code xong, muốn cho người dùng sử dụng thì các bạn phải deploy nó.
![](https://images.viblo.asia/9ea299d1-6434-40f0-868b-3038f146ca9c.png)

Trong môi trường deploy đó thì các bạn cũng phải cài đặt tất cả những cái này kèm với thư viện, config, dependencies của nó. Chỉ cần thiếu 1 thư viện hay 1 dependencies nhỏ thôi thì ứng dụng của các bạn cũng sẽ bị lỗi và k sử dụng được. Và nội cái việc set up và cài đặt tất cả những cái này thôi nó cũng đã mất rất nhiều thời gian rồi. 

Thì đấy là cái vấn đề, làm sao mình có thể code 1 chỗ mà đưa nó được tới người dùng hay tới nhiều chỗ, nhiều môi trường khác nhau mà vẫn đảm bảo các thư viện, config, dependencies được cài đúng đắn.

Vấn đề này sẽ được giải quyết bởi Docker.
* Docker nó sẽ gom những cái như là NodeJS, PostgreSQL, Redis, Ansible, cài nó khá là phức tạp và làm sao để nó đúng version thì Docker nó gom những cái này lại thành 1 cái container.
* Docker **đóng gói phần mềm** vào các đơn vị tiêu chuẩn hóa được gọi là container. Các container cho phép nhà phát triển đóng gói một ứng dụng với tất cả các phần mà ứng dụng đó cần, chẳng hạn như thư viện và các phần phụ thuộc khác, và chuyển tất cả nó ra dưới dạng một gói.
* Giống như 1 cái xe container, ở trong có hàng hóa và bạn chỉ bỏ lên xe, chạy đến nơi khác. Tới nơi thì họ sẽ dỡ hàng hóa xuống và sử dụng là được. Docker nó cũng hoạt động với cơ chế như vậy. Nó sẽ gom từng thằng này thành những cái container. 
![](https://images.viblo.asia/1208a928-418d-4b1a-a38a-26b71456820b.png)

* Khi các bạn viết code thì mỗi container nó sẽ bao gồm cả phần cài đặt nodejs, các thư viện, dependencies, code lại thành 1 container. Khi cần chạy thì bạn chỉ cần chạy cái container này lên thì nó sẽ có sẵn tất cả nodejs, thư viện, code... mà bạn không cần phải cài thêm bất kỳ cái gì, Docker nó sẽ lo hết tất cả những việc đó.
* Ứng dụng sau khi được đóng gói có thể hoạt động một cách nhanh chóng và hiệu quả trên các môi trường điện toán khác nhau
* Tóm lại thì Docker nó tách biệt và đóng gói phần mềm thành những đơn vị chuẩn hóa gọi là container để dễ quản lý, dễ di chuyển, share. Từ đó giúp ứng dụng có thể hoạt động một cách nhanh chóng và hiệu quả trên các môi trường điện toán khác nhau.
### Công nghệ sử dụng
Để đạt được sự nhanh chóng và hiệu quả ở đây thì Docker đã sử dụng công nghệ Containerization với các container chung nhân OS với máy chủ host.
![](https://images.viblo.asia/5cb88569-7749-4ac1-a2f4-d1455f89907b.png)

Container sẽ hoạt động giống như một application bình thường, khi cần tài nguyên để hoạt động, nó sẽ trực tiếp lấy từ máy host như một phần mềm bình thường chạy trên máy host 
## II. Lịch sử ra đời
Để hiểu rõ được công nghệ Containerization đem lại những lợi ích gì thì ta sẽ mang câu chuyện deployment quay ngược trở lại thời điểm lúc chúng ta chưa có công nghệ Containerization. 
![](https://images.viblo.asia/a3d6fc9b-19bb-40fb-877d-cf5fb619b65f.png)
### 1. Thời đại Deploy theo cách truyền thống
* Ban đầu, các ứng dụng được chạy trên các máy chủ vật lý. Không có cách nào để xác định ranh giới tài nguyên cho các ứng dụng trong máy chủ vật lý  **=> gây ra sự cố phân bổ tài nguyên. **
* Ví dụ, nếu nhiều ứng dụng cùng chạy trên một máy chủ vật lý, có thể có những trường hợp một ứng dụng sẽ chiếm phần lớn tài nguyên hơn và kết quả là các ứng dụng khác sẽ hoạt động kém đi. 
* Một giải pháp cho điều này sẽ là chạy từng ứng dụng trên một máy chủ vật lý khác nhau. Nhưng giải pháp này không tối ưu vì tài nguyên không được sử dụng đúng mức và rất tốn kém cho các tổ chức để có thể duy trì nhiều máy chủ vật lý như vậy.

### 2. Thời đại deploy ảo hóa
* Ảo hóa ra đời như một giải pháp cho phương pháp truyền thống. 
* Nó cho phép bạn chạy nhiều Máy ảo (VM) trên CPU của một máy chủ vật lý. Ảo hóa cho phép các ứng dụng được cô lập giữa các VM và cung cấp mức độ bảo mật vì thông tin của một ứng dụng không thể được truy cập tự do bởi một ứng dụng khác.
* Ảo hóa cho phép sử dụng tốt hơn các tài nguyên trong một máy chủ vật lý và cho phép khả năng mở rộng tốt hơn vì một ứng dụng có thể được thêm hoặc cập nhật dễ dàng, giảm chi phí phần cứng và hơn thế nữa. 
* Với ảo hóa, bạn có thể có một tập hợp các tài nguyên vật lý dưới dạng một cụm các máy ảo sẵn dùng.
* Mỗi VM là một máy tính chạy tất cả các thành phần, bao gồm cả hệ điều hành riêng của nó, bên trên phần cứng được ảo hóa.

### 3. Thời đại triển khai Container
Các container tương tự như VM, nhưng chúng có tính cô lập để chia sẻ Hệ điều hành (HĐH) giữa các ứng dụng. Do đó, container được coi là nhẹ (lightweight). 
Tương tự như VM, một container có hệ thống tệp (filesystem), CPU, bộ nhớ, process space, v.v. Khi chúng được tách rời khỏi cơ sở hạ tầng bên dưới, chúng có thể khả chuyển (portable) trên cloud hoặc các bản phân phối Hệ điều hành.

Nói chung, sự khác biệt chính giữa VM và Container là:
**Virual Machine:** chiếm luôn phần cứng máy host ngay từ khi cài.
=> ngốn tài nguyên, tốn thời gian thực thi, cồng kềnh
**Container:** sử dụng các container như sử dụng application, chỉ lấy tài nguyên khi cần 
=> nhanh, dễ dàng thiết lập và tránh lãng phí tài nguyên từ máy ảo khi không sử dụng 

## Tài liệu tham khảo
[1]. [How node works ](https://docs.docker.com/engine/swarm/how-swarm-mode-works/nodes/)

[2]. [Docker docs](https://docs.docker.com/get-started/overview/)

[3]. [Docker là gì?](https://topdev.vn/blog/docker-la-gi/)

[4]. [Docker - chưa biết gì đến biết dùng](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0)