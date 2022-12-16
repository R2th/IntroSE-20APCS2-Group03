Ở bài viết này mình sẽ giới thiệu các bạn một pattern rất hay để gọi API trong các front-end framwork, đó là **RepositoryFactory**. 
### Tại sao bạn nên dùng pattern RepositoryFactory
Chúng ta thường sử dụng repository pattern để lấy dữ liệu nhằm tách rời việc lấy dữ liệu và xử lý logic.
Mặt khác, chúng ta hay sử dụng factory pattern để mock repository và xử lý logic.
Đã bao lần bạn thấy axios được khởi tạo đi khởi tạo lại trong những component?


Mỗi lần như vậy bạn có tự hỏi: 
* Làm sao để tái sử dụng ở component này cũng như ở dự án khác?
* Nếu endpoints bị thay đổi thì sao?
* Làm thế nào để refactor hoặc đưa vào Vuex state?
* Nếu có tới bốn resource chứ không phải một thì sao?
* Viết unit test với những component gọi toàn API như thế nào?
* ...

Bạn có thể sẵn sàng ngồi sửa 30 file hay nhiều hơn không?
### Giải pháp

Trong case này, để đơn giản hoá code và có thể định nghĩa được 1 vài loại resource khác nhau thì mình sẽ sử dụng POJO (Plain Old JavaScript Objects). Đương nhiên có thể sử dụng Class nếu bạn muốn.

Bây giờ cùng bắt đầu đi định nghĩa axios nhé.

Mình sẽ đặt tên file là Repository.js vì nó đảm nhiệm việc kết nối đến các resource.

![](https://images.viblo.asia/7162a5ba-e79c-4a87-9611-3063047a6152.png)

Tiếp theo chúng ta sẽ đi định nghĩa cho từng Entity của project.

Ví dụ như bạn có 1 blog. Khi đó chúng ta sẽ có 1 Entity là posts. Và bây giờ chúng ta sẽ đi định nghĩa tất cả các thao tác CRUD (Create Update Delete).

Và khi đó postsRepository.js sẽ trở thành như sau:
![](https://images.viblo.asia/84d86e14-73e7-4ad9-a4e7-57e1ca1a9cc2.png)

Tiếp theo chúng ta sẽ đi tạo Factory.
![](https://images.viblo.asia/5d05479c-45b1-4fb0-873b-2b69ed4e6991.png)

Nhìn vào trên ta thấy việc tạo Repository từ Factory trở nên thật simple phải không?

Hơn nữa ở đây ta cũng dễ dàng tạo mock repository (phù hợp với từng môi trường ví dụ develop, staging, production) hay thêm 1 vài logic vào trong hàm get ở trên cũng đều được hết.

Còn đây là cách áp dụng vào trong component:
![](https://images.viblo.asia/aa31dc54-c78c-44b7-9353-ca2a893de5de.png)
Nhìn vào chúng ta thấy nó simple phải không nào? Vì phần logic đã được tách ra ở 1 chỗ khác nên việc dùng 1 endpoint khác như GraphSQL cũng hoàn toàn có thể.

### Kết luận
Theo mình thấy thì pattern này có 1 số ưu điểm sau:

* Có thể dễ dàng test 1 đoạn code nào đó 1 cách đơn giản
* Code của component trông đẹp hơn
* Có thể dễ dàng mở rộng 
* Có thể đảm bảo tính DRY (Donot repeat your self)

### Tài liệu tham khảo
https://medium.com/canariasjs/vue-api-calls-in-a-smart-way-8d521812c322