![](https://images.viblo.asia/440aaf74-2598-4d86-8bbc-d68d7f4dd516.jpg)
Hôm nay mình giới thiệu với các bạn cách tạo virtual attribute đơn giản cho rails 

# 1. Giới thiệu:
- Giả sử ta có table user có 2 column là `first_name` và `last_name`, để tạo table user ta chạy câu lệnh migrate như sau:
  ```
  rails g modal user first_name:string last_name:string
   ```
- Khi đó, để đăng ký mới user, người dùng cần điền 2 field trên form đăng ký người dùng ứng với 2 cột first_name và last_name.
- Để tiện cho người dùng, ta sử dụng virtual_attribute `full_name` thay thế cho 2 attribute first_name và last_name

# 2. Cài đặt và validate:
- Trong file model user.rb, ta khai báo các `getter` và `setter` cho virtual_attribute `full_name`
  ```
  class User < ApplicationRecord
    def full_name
      [first_name, last_name].join(" ")
    end!

    def full_name=(name)
      first_name_and_last_name = name.split(" ")
      update_attributes first_name: first_name_and_last_name[0]
      update_attributes last_name: first_name_and_last_name[1]
    end
  end
    ```
- Sử dụng rails console để kiểm tra các setter và getter của virtual_attributes full_name.
- Kết quả như sau:

  Tạo user sử dụng attribute first_name là last_name như bình thường
  ![](https://images.viblo.asia/a1a84379-46e8-402a-8222-ff9523c683df.png)
  
  Tạo user sử dụng virtual attribute full_name
  ![](https://images.viblo.asia/64c9acfc-93db-489e-aefd-b98818371ba9.png)
  
- Để thực hiện `validates` cho virtual_attribute, ta thực hiện tương tự như khi validate cho các attribute bình thường.
- Trong ví dụ như sau, thực hiện validates full_name với min length là 10 kí tự, first_name, last_name phải tồn tại
  ```
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :full_name, length: {minimum: 10}
  ```
- Sử dụng rails console để kiểm tra các validation vừa được tạo
- Kết quả như sau:

   Tạo user không có first_name:
   ![](https://images.viblo.asia/a0d423a5-0f7b-40d1-9962-889eefa13a61.png)
 
  Tạo user không có last_name:
  ![](https://images.viblo.asia/03840a6b-bc05-424f-ae5a-996c17cf204c.png)
 
  Tạo user có full_name ngắn hơn 10 kí tự:
  ![](https://images.viblo.asia/04f006c5-cc8c-448d-bfb5-a3a83ee18cdf.png)
 
- Từ đây ta có thể sử dụng virtual_attribute `full_name` như 1 attribute bình thường trong các hàm `new`, `create`, `update`, `validates` ... như các attribute `first_name`, `last_name`.