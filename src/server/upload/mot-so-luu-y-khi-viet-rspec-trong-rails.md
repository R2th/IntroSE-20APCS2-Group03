### 1. Các trường hợp cần lưu ý
* Cover không kỹ các trường hợp (cover case và cover code)
* Viết RSpec cho file mình thay đổi, không chạy tổng
* Lạm dụng quá nhiều query tới DB
* File .env không thống nhất
* Viết RSpec cho email
### 2. Cover không kỹ các trường hợp
Ở đây ta chia ra làm 2 trường hợp là cover case và cover code. Vậy chúng là gì?
1. Cover code: là chỉ cover những trường hợp có trong code, ví dụ
    ```
    boy = params.boy
    girl = params.girl
    if ((boy.age + girl.age) == 30) {
        "#{girl.name} love #{boy.name}"
     }
     else {
         "Dislike"
     }
    ```
    Ở đoạn code trên, thì thông thường khi viết test ta sẽ tạo ra 2 object là girl và boy trong đó có age của cả 2 cộng lại bằng 30 và không bằng 30, đây được gọi là cover code.
1. Cover case: là cover về các trường hợp có thể xảy ra, kể cả khi không có trong code. Cũng là đoạn code ở trên nhưng thay vì chỉ tạo 2 object có age cộng lại bằng 30 và không bằng 30, ta còn có thêm các trường hợp như, nếu age đó là kiểu string hoặc kiểu boolean, ... thì đây được gọi là cover case
### 3. Viết Rspec cho file mình thay đổi, không chạy tổng
Việc chạy tổng ở đây mình nói chính là chạy lại tất cả các file test có trong project. Nếu bạn chưa từng chạy tổng, vậy bây giờ bạn thử mở một project rồi chạy tất cả file test, mình chắc chắn rằng có những file bạn chạy riêng lẻ thì không lỗi nhưng chạy tổng thì lỗi  rất là vi diệu sẽ xuất hiện =)). Vì vậy sau khi thay đổi code hoặc tạo ra code mới, ngoài việc phải sửa file rspec bạn thay đổi bạn còn phải chạy tổng lại các file để xem đoạn code của mình có ảnh hưởng gì tới các code khác nữa không?
### 4. Lạm dụng quá nhiều query tới Database
Khi test các giá trị của một object, ta phải có một object tương ứng trong database. Nhưng một số trường hợp có cần nhất thiết phải tạo record trong db, ta vẫn có thể thay thế nó bằng việc mock hoặc stub. Ví dụ:
```
let!(:boy) {create :boy, age: 12, name: :James}
describe "#get_days" do
    puts "boy's name: #{boy.name}, boy's age: #{boy.age}"
end
```
thay vì tạo một record boy ta có thể
```
let!(:boy) {build_stubbed :boy, age: 12, name: :James}
describe "#get_days" do
    puts "boy's name: #{boy.name}, boy's age: #{boy.age}"
end
```
như vậy vừa tránh việc lỗi có thể phát sinh khi chạy tổng mà còn có thể giúp ta giảm thiểu performace khi chạy tổng
### 5. File .env không thống nhất
Vì sao lại nói file .env không thống nhất. Đơn giản là vì file này sẽ không được đẩy lên github hay bitbucket, ... thay vào đó là một file env.example làm mẫu chung nên để có giá trị trong file, một là ta đi hỏi những người đi trước, hai là tự tìm và lắp vào. Và như vậy khi chạy test, ta sẽ thấy tại sao một số function thì bên mình lỗi bên đồng nghiệp lại không
### 6. Viết RSpec cho email
Nếu ở đây bạn viết không cẩn thận, nó sẽ là một incident khá là nghiêm trọng. Vì sao mình lại nói như vậy, đơn giản là khi chạy test nó sẽ chạy các function trong code, tức là code gửi mail sẽ được thực hiện nên nếu như bạn dùng một email có đuôi "@gmail.com" hay "@yahoo.com" thì hãy cẩn thận, vì biết đâu bất ngờ, mail đó đã tồn tại. Như vậy nó sẽ dẫn tới làm lộ thông tin Khách Hàng và cũng là chạy test nên việc chạy đi chạy lại file để test là điều thường xuyên xảy ra, điều đó sẽ dẫn tới spam email.
Cách khác phục cũng rất đơn giản:
* đọc nhiều về các incident có thể xảy ra khi gửi mail
* Trong môi trường test thay vì gửi mail thực đổi lại thành mail catcher
* Đổi các đuôi "@gmail.com", "@yahoo.com", ... thành "@example.com"
### 7. Kết
Đây là một số vấn đề mình gặp phải khi test, còn bạn thì sao, nếu có hãy viết viblo và chia sẽ cho mọi người cùng biết :D