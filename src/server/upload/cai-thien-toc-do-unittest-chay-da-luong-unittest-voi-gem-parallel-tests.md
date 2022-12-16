## 1. Giới thiệu
Như các bạn đã biết, Dự án càng phát triển thì số lượng chức năng ngày càng nhiều, đi kèm với nó là số lượng unit test cũng ngày càng lớn, đồng nghĩa với việc thời gian chạy unit test càng ngày càng lâu.
Điều đó làm ảnh hưởng khá lớn tới năng xuất làm việc của developer vì khoảng thời gian chờ đợi chạy xong unit test này mất nhiều thời gian.

Ví dụ như dự án mình đang làm thời gian chạy Rspec tổng của cả dự án mất  tầm **70 phút**, sau khi turning bằng một số phương pháp thì thời gian chạy xuống tầm **50 phút**. Tuy nhiên, 50 phút vẫn còn quá nhiều nên mình quyết định apply thử đa luồng vào thì có được kết quả ban đầu khá khả quan, đó là tổng time chạy còn tầm **20 phút**.  

Thấy cũng khá hay nên hôm nay mình sẽ giới thiệu cho các bạn chạy đa luồng bằng cách sử dụng gem **parallel_tests**.

## 2. Setup môi trường
### 2.1 Cài đặt gem
Thêm dòng sau vào Gemfile rồi chạy chạy `bundle install`
```
gem 'parallel_tests', group: [:development, :test]
```
### 2.2 Config database
ParallelTest sử dụng mỗi process là một database. Nên tương ứng với mỗi process thì nó cần một database riêng. 

Cụ thể, đối với parrallel_test thì số process nó sẽ tính theo core của CPU của bạn, ví dụ CPU có 2 nhân thì số luồng của nó sẽ là **2 x 2core = 4 process** => cần 4 databases

| Process | 1 | 2 | 3 | 4 |
| -------- | -------- | -------- | -------- | -------- |
| ENV['TEST_ENV_NUMBER']	     | "" | "1"     | "2"    | "3"    |


Để tạo các database cho nó thì chỉ cần thêm config sau vào `config/database.yml`:
```
test:
  database: yourproject_test<%= ENV['TEST_ENV_NUMBER'] %>
```

**Sau đó:**
* Để tạo các databases ta chạy lệnh:
    ```
    rake parallel:create
    ```
* Để migration ta copy develop schema ta chạy lệnh:
    ```
    rake parallel:prepare
    ```
    **Note:** Cần đảm bảo schema đối với môi trường develop là mới nhất. Vì ở đây nó sẽ copy schema để dùng cho các database test.
* Sau đó tiến hành migration cho các database test bằng lệnh:
    ```
    rake parallel:migrate
    ```
    
 * Ngoài ra, để tạo db và load schema phù hợp với **CI** hơn 3 step trên ta có lệnh:
     ```
     rake parallel:setup
     ```
    p/s:  Trong DOC nó nói thế chứ mình chưa thử nó phù hợp ntnao (yaoming) 
    
## 3. Sử dụng
### 3.1 Các lệnh để chạy
```
rake parallel:test                 # Dành cho Test::Unit
rake parallel:spec                 # Dành cho RSpec
rake parallel:features             # Dành cho Cucumber
rake parallel:features-spinach     # Dành cho Spinach
```
Mình thì mới chỉ dùng `rake parallel:spec` cho Rspec, còn những cái còn lại thì chưa thử.

### 3.2 Một số lệnh khác
* Chỉ định 1 luồng chạy
    ```
    rake parallel:test[1]
    ```
* Parallel test sử dụng regex để chọn lựa thư mục để chạy
    ```
    rake parallel:test[^test/unit]           # chạy các file TCs trong folder test/unit
    rake parallel:test[user]                 # chạy các file TCs có `user` như: users_controller + user_helper + user tests
    rake parallel:test['user|product']       # chạy các file TCs có `user` và `product`
    rake parallel:spec['spec\/(?!features)'] # chạy các file TCs RSpec ngoại chừ các   TCs trong folder spec/features
    ```
 * **Lưu ý:**
    * Đối với các bạn dùng **ZSH** thì cần có thêm \ trước kí tự đóng mở ngoặc []. Ví dụ: `rake parallel:spec\['spec\/(?!features)'\]`
    * Nên chỉ định folder thay vì tên file. Vì khi chỉ định 1 file thì parallel auto chạy 1 luồng duy nhất, phù hợp với việc viết testcase mới trong qúa trình phát triển tuy nhiên, khi chạy 1 luồng thì nó thường rất mượt, nhưng chuyển sang chạy đa luồng thì nó sẽ gặp một số lỗi mà trước giờ mình ko ngờ tới (yaoming). Nên chỉ định folder để chạy đa luồng, có lỗi thì fix luôn =))
    
 ### 3.3  Kết quả output:
 ParallelTests chia các TCs thành các nhóm chẵn (theo số dòng hoặc thời gian chạy) và chạy mỗi nhóm trong một process duy nhất với cơ sở dữ liệu của riêng nó.
 
 Kết quả sẽ như sau:
 ```
 2 processes for 210 specs, ~ 105 specs per process
... test output ...

843 examples, 0 failures, 1 pending

Took 29.925333 seconds
 ```
 
## 4. Tổng kết
Một số nhược điểm mình thấy khi apply parallel test: 
* Khi apply đa luồng vào thì cũng dẫn đến việc control sẽ phức tạp hơn.
* Việc debug cũng hơn rắc rồi vì khi mình debug ở luồng này nhưng những luồng khác thì vẫn đang chạy.
* Việc phân chia testcase cho các process cũng thường dẫn đến việc phát sinh những lỗi khá dị mà chỉ khi chạy đa luồng mới gặp, còn chạy đơn luồng thì ko thấy (yaoming)
* Đòi hỏi developer cần có kinh nghiệm kha khá liên quan đến luồng chạy của unit test để có thể handle và fix bug khi có lỗi phát sinh trong quá trình apply parallel_test.

Chình vì thế mà mình nghĩ việc apply parallel_test chỉ phù hợp với dự án có số lượng Unit test lớn, thời gian chạy lâu, bắt buộc phải apply nó vào.

**Nguồn tham khảo:** https://github.com/grosser/parallel_tests