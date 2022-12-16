Seeds trong Rails là một cách hữu ích để đưa vào cơ sở dữ liệu dữ liệu ban đầu cần thiết cho một dự án Rails. 
    
Tệp Rails db/seed.rb chứa code Ruby để sinh ra dữ liệu mẫu cho cơ sở dữ liệu và thực hiện file này bằng cách chạy rails db:seed. 

Tuy nhiên việc này trở nên khó sử dụng khi mình cần sinh ra dữ liệu mẫu cho nhiều bảng hoặc cần các cơ chế nâng cao hơn để truy xuất dữ liệu từ kho dữ liệu khác.

Vì vậy gem Seedbank sinh ra nhằm giải quyết vấn đề về khả năng mở rộng bằng cách cho phép phân tách file seed.rb ra thành nhiều file nhỏ và cung cấp hỗ trợ để các file nhỏ này có thể thực hiện thêm dữ liệu mẫu giống như file seed.rb. Và các file này sẽ được lưu trữ trong folder db/seed/ của dự án.
    
*     Cấu trúc 1 folder seed có dạng:

    ```
    db/seeds/
    courses.seeds.rb
    development/
    users.seeds.rb
    students.seeds.rb
    ```
 
*  Seedbank tạo ra những tasks bao gồm:
 
    ```
    rails db:seed                   # load data from db/seeds.rb, db/seeds/*.seeds.rb, and db/seeds/[ENVIRONMENT]/*.seeds.rb
    rails db:seed:courses           # load data from db/seeds/courses.seeds.rb
    rails db:seed:common            # load data from db/seeds.rb, db/seeds/*.seeds.rb
    rails db:seed:development       # load data from db/seeds.rb, db/seeds/*.seeds.rb, and db/seeds/development/*.seeds.rb
    rails db:seed:development:users # load data from db/seeds/development/users.seeds.rb
    rails db:seed:original          # load data from db/seeds.rb
    ```
    
    Việc tách dữ liệu gốc từ một file thành nhiều file sẽ gây ra một vấn đề tiềm ẩn khi dữ liệu được tạo trong một file gốc phụ thuộc vào dữ liệu từ một file gốc khác. Seedbank giải quyết vấn đề này bằng cách cho phép xác định các phụ thuộc trong các file seed, cho phép nhà phát triển kiểm soát thứ tự chạy các file.
    
    Seedbank chạy các file seed theo thứ tự bảng chữ cái theo mặc định nhưng nhà phát triển có thể thực thi theo cách thủ công thứ tự các tác vụ sẽ được chạy. Ví dụ khi bảng Student phụ thuộc vào bảng Course đã được tạo, file có thể được thiết lập như sau:
    
    ```
    # db/seeds/students.seeds.rb
    after :courses do
      course = Course.find_by_name('Calculus')
      course.students.create(first_name: 'Patrick', last_name: 'Lewis')
    end
    ```
    
   Khối phụ thuộc được thêm vào sẽ đảm bảo rằng file db/seed/Course.seeds.rb được thực thi trước file db/seed/students.seeds.rb, ngay cả khi file Student được chạy trực tiếp khi ta dùng lệnh db:seed:student.
   
   Vì vậy với hệ thống nhiều gồm nhiều bảng và ta cần dữ liệu mẫu được điền đầy đủ trong các bảng thì gem Seedbank thật sự là 1 sự lựa chọn tuyệt vời để bạn có thể sử dụng và phát triển sản phẩm của mình đạt hiệu quả tốt nhất!
   
   Nguồn: https://www.endpoint.com/blog/2016/12/21/seedbank-structured-seed-files-for