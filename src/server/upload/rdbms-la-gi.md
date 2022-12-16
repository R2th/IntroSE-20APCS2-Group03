RDBMS là viết tắt của Relational Database Management System có nghĩa là hệ quản trị cơ sỡ dữ liệu quan hệ. RDBMS là cơ sở cho SQL, và cho tất cả các hệ thống cơ sở dữ liệu hiện đại như MS SQL Server, IBM DB2, Oracle, MySQL và Microsoft Access.

# 1. Bảng (Table) là gì?
RDBMS Database sử dụng các bảng để lưu trữ dữ liệu. Một bảng là một tập hợp các dữ liệu có liên quan và chứa các hàng và các cột để lưu dữ liệu.
    Một bảng là một kho lưu trữ (Storage) dữ liệu đơn giản nhất trong RDBMS.
    ![](https://images.viblo.asia/5d7c1c6e-259d-43c3-b3a9-53af15395afd.png)
    

# 2. Field (Trường) là gì?
   Trường, là một thực thể nhỏ nhất của bảng, chứa thông tin cụ thể về mỗi bản ghi trong bảng. 
    Trong ví dụ trên, các trường trong bảng KHACH_HANG bao gồm ID, TEN, TUOI, DIA_CHI VÀ LUONG.
    
# 3. Hàng hoặc bản ghi là gì?
    
   Một hàng của một bảng cũng được gọi là bản ghi. Nó chứa thông tin cụ thể về một entry riêng rẽ trong bảng. Hàng là một thực thể nằm ngang trong bảng.
![](https://images.viblo.asia/6cf0aa61-8355-4fa8-9b52-aeb68f92a8d9.png)

# 4.  Column (cột) là gì?

   Một cột, là một thực thể dọc trong bảng, chứa tất cả thông tin được liên kết với một trường cụ thể trong một bảng. 
    Ví dụ: một cột trong bảng KHÁCH HÀNG là DIA_CHI, mô tả vị trí và sẽ như dưới đây:
    ![](https://images.viblo.asia/fb0df512-0fad-4b89-a01a-f98624474951.png)

# 5. Giá trị NULL là gì?

   Giá trị NULL của một bảng xác định rằng trường đã bị để trống trong khi tạo bản ghi. 
    Nó là khác hoàn toàn với giá trị 0 hoặc một trường mà chứa khoảng trống (space).
# 6. Ràng buộc (Constraint) trong SQL

   Ràng buộc (Constraint) là các qui tắc cho các cột dữ liệu trong bảng. Chúng được sử dụng để giới hạn kiểu dữ liệu mà có thể nhập vào một bảng. 
    Điều này đảm bảo tính chính xác và tính đáng tin cậy cho dữ liệu trong Database.
    
   Ràng buộc (Constraint) có thể là ở cấp độ cột (column level) hoặc cấp độ bảng (table level). Ràng buộc cấp độ cột chỉ được áp dụng cho một cột,
    trong khi ràng buộc cấp độ bảng được áp dụng cho cả bảng.
    Dưới đây là các Ràng buộc (Constraint) được sử dụng phổ biến có sẵn trong SQL:
    Ràng buộc NOT NULL trong SQL: Bảo đảm một cột không thể có giá trị NULL.
    
   Ràng buộc DEFAULT trong SQL: Cung cấp một giá trị mặc định cho cột khi không được xác định.
    
   Ràng buộc UNIQUE trong SQL: Bảo đảm tất cả giá trị trong một cột là khác nhau.
    
   Ràng buộc PRIMARY Key trong SQL: Mỗi hàng/bản ghi được nhận diện một cách duy nhất trong một bảng.
    
   Ràng buộc FOREIGN Key trong SQL: Mỗi hàng/bản ghi được nhận diện một cách duy nhất trong bất kỳ bảng nào.
    
   Ràng buộc CHECK trong SQL: Bảo đảm tất cả giá trị trong một cột thỏa mãn các điều kiện nào đó.
    
   Ràng buộc INDEX trong SQL: Sử dụng để tạo và lấy dữ liệu từ Database một cách nhanh chóng.
    
#     Tổng kết
   Qua bài viết này mình hy vọng những người bắt đầu học cơ sở dữ liệu có thể nắm được RDBMS hơn.
    Happy codding