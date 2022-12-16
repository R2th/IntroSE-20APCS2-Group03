Gần đây thấy VueJs có vẻ đang hot nên thử tìm hiểu xem thực sự nó như thế nào.

Mình cũng thử đọc code của 1 vài sample, tutorial thì thấy chỗ call API đa số đều dùng axios ở Component hay là ở bên trong Vuex.

Nếu mà áp dụng những cái đó vào trong dự án thực tế thì sẽ xảy ra những vấn đề sau:

* Việc viết API trực tiếp trong component sẽ rất khó cho việc viết unit test.
* Tính mở rộng của Vuex(actions) (đối với những xử lý không dùng lại thì không nên viết ở trong Store)
* Việc module hoá phần giao tiếp API với PureJS không làm giảm đi độ phụ thuộc. Vì API được định nghĩa trong component nên muốn thay đổi API hay logic sẽ phải sửa trong nhiều file khác.

Và còn rất nhiều vấn đề nữa…

Sau khi tìm hiểu thì mình thấy có rất nhiều design pattern có thể áp dụng cho việc gọi API. Nhưng có 1 design pattern mà mình thấy tốt nhất đó là **RepositoryFactory.**

Quả thực mình rất thích cái pattern này vì nó scale khá là dễ.

**Mục đích bài viết:**

* Biết cách áp dụng design pattern vào việc call API. Đặc biệt làRepositoryFactory pattern.
* Mặc dù bài viết lấy ví dụ là VueJS nhưng mà Angular, ReactJS mình thấy đều có thể áp dụng được.
    
    
    
#     Tại sao lại dùng nó?
Đầu tiên mình sẽ dùng repository pattern để truy cập vào tài nguyên theo cách độc lập, không có bất kì logic nào ngoài việc trả về dữ liệu.

Cái thứ 2 là sẽ sử dụng factory pattern để khởi tạo logic của môi trường hay repository cần thiết cho từng case. Factory có 1 lợi thế là có thể khởi tạo 1 mock repository hoặc là production repository nếu cần thiết.

Chắc hẳn mọi người đọc example hay tutorial cũng đều thấy axios luôn được sử dụng trong component. Vậy có vấn đề gì xảy ra chỗ này:

*    Điều gì sẽ xảy ra nếu chúng ta muốn tái sử dụng việc call api?
*    Điều gì xảy ra nếu endpoint thay đổi?
*    Điều gì xảy ra nếu muốn tái sử dụng việc call api cho dự án khác?
*    Điều gì xảy ra nếu muốn refactor 1 vài lời gọi hàm hoặc muốn di chuyển nó đến Vuex actions?
*    Mình có nhiều hơn 1 cái resource, thế bây giờ phải định nghĩa tận 4 cái endpoint?
*    Làm thế nào có thể dùng 1 cái mock api cho việc test?

Đương nhiên là thay đổi 1 file sẽ dễ dàng hơn là thay đổi 30 file rồi đúng không?


# Phương pháp đúng
Trong case này, để đơn giản hoá code và có thể định nghĩa được 1 vài loại resource khác nhau thì mình sẽ sử dụng **POJO (Plain Old JavaScript Objects)**. Đương nhiên có thể sử dụng Class nếu bạn muốn.

Bây giờ cùng bắt đầu đi định nghĩa asxios nhé.

Mình sẽ đặt tên file là **Repository.js** vì nó đảm nhiệm việc kết nối đến các resources.

Cũng có 1 vài người thích cái tên Service hay là API, nhưng trong hoàn cảnh này mình thấy cái tên Repository có vẻ hợp lí hơn.
![](https://images.viblo.asia/22f77732-db09-4497-ae0a-ef4d40dfa46b.png)


Tiếp theo chúng ta sẽ đi định nghĩa cho từng Entity của project.

Ví dụ như bạn có 1 blog. Khi đó chúng ta sẽ có 1 Entity là posts. Và bây giờ chúng ta sẽ đi định nghĩa tất cả các thao tác **CRUD (Create Update Delete).**

Và khi đó **postsRepository.js** sẽ trở thành như sau:
![](https://images.viblo.asia/b78e5303-96a2-47ed-a5e6-21fc3172cf97.png)


Tiếp theo chúng ta sẽ đi tạo **Factory**.
![](https://images.viblo.asia/fc0be7fa-df67-48a3-ae07-50293029698b.png)


Nhìn vào trên ta thấy việc tạo Repository từ Factory trở nên thật **simple** phải không?

Hơn nữa ở đây ta cũng dễ dàng tạo **mock repository (phù hợp với từng môi trường ví dụ develop, staging, production)** hay thêm 1 vài logic vào trong hàm **get** ở trên cũng đều được hết.

Còn đây là cách áp dụng vào trong component:


![](https://images.viblo.asia/cb2c7952-c552-4552-afcc-adcd9f2b186c.png)


Nhìn vào chúng ta thấy nó simple phải không nào? Vì phần logic đã được tách ra ở 1 chỗ khác nên việc dùng 1 endpoint khác như GraphSQL cũng hoàn toàn có thể.
# Kết luận
Theo mình thấy thì pattern này có 1 số ưu điểm sau:

*    Có thể dễ dàng test 1 đoạn code nào đó 1 cách đơn giản
*    Code của component trông đẹp hơn
*    Có thể dễ dàng mở rộng (Đúng không ta?)
*    Có thể đảm bảo tính DRY (Donot repeat your self)

Hãy thử xem pattern này có phù hợp với dự án của các bạn không nhé!.