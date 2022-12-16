![](https://images.viblo.asia/e4763126-af41-4024-8418-6531431ee483.jpg)

Rails là một framwork rất tiện lợi và tuyệt vời. Nó giúp cho việc xây dựng một project nhanh hơn rất nhiều. Rails khiến chúng ta mê mẩn bởi nhưng cú pháp thanh lịch và cả sự phát triển nhanh không tưởng của nó. Tuy nhiên, hiệu suất của Rails từ lâu đã là một bài toán lớn, nhất là khi phải xử lý một khối lượng data khổng lồ. Liêu Rails có trở thành một "nút cổ chai" khi bạn đang cố gắng xử lý dự liệu của hàng triệu người dùng? Sau đây sẽ là một số lwoif khuyên để bạn có thể tránh khỏi trường hợp tồi tệ này.

# 1. Tránh sử dụng ActiveRecord nếu có thể.
ActiveRecord khiến cho mọi thứ có vẻ trở nên dễ dàng hơn khá nhiều, nhưng nó không được thiết kế cho dữ liệu thô. Khi bạn cố ap dụng m,ột số cú pháp đơn giản cho hàng triệu dòng data, tốt nhất là bạn nên sử dụng những cú pháp thuần SQL. Nếu bạn thực sự cảm thấy cần một công cụ ORM để giúp bạn hình dung mọi thứ thì hãy xem các phần tiếp theo.

# 2. Cập nhật toàn bộ records.
Đây là một lỗi cơ bản, chúng ta đôi khi thấy mọi người cố gắng lặp lại toàn bộ bảng và chỉ cập nhật một thuộc tính duy nhất:
```
#ruby
  User.where(city: “Houston”).each do |user|
    user.note = “Houstonian”
    user.save
  end
```
Đoạn code trên thực sự dễ đọc, dễ hiểu nhưng độ hiệu quả lại thấp đến bất ngờ. Nếu có 100 nghìn người dùng tại thành phố "Houston", việc cập nhật này có thể diễn ra cả ngày. Một giải pháp nhanh hơn và hiệu quả hơn sẽ là:
```
 User.update_all({note: "Houstonian}, {city: "Houston"})
```
Câu lệnh trên chỉ tốn chừng 30s cho cùng một khối lượng data.

# 3. Chỉ load cột mà bạn cần.
Đoạn code *User.where(city: "Houston")* sẽ load toàn bộ thông tin của users từ database. Nếu bạn chỉ đơn giản là không quan tâm đến các thông tin khác như tuổi tác, giới tính hoặc nghề nghiệp, bạn không nên bao gồm chúng ngay từ đầu. Hãy thử sử dụng select_column khi bạn có nhiều bản ghi.
```
 #ruby
 User.select(“city”, “state”).where(age: 29)
```

# 4. Thay thế Model.all.each bằng find_in_batches
Rất có thể là với các ứng dụng nhỏ điều này thậm chí sẽ không được chú ý, nhưng vấn đề này thực sự quan trọng. 100 nghìn records users có thể dễ dàng chiếm trọn hơn 5 GB bộ nhớ. Máy chủ của bạn có thể sẽ gặp sự cố. Do đó, chúng tôi luôn khuyên bạn nên sử dụng find_in_batches, giải pháp này hoàn toàn giải quyết vấn đề nêu trên.
```
  #ruby
  User.find_in_batches(conditions: ‘grade = 2', batch_size: 500) do |students|
    students.each do |student|
      student.find_or_create_by_class_name(‘PE’)
    end
  end
```

# 5. Giảm việc sử dụng transactions
```
  (0.2ms) BEGIN
  (0.4ms) COMMIT
```
Transactions xảy ra mỗi khi chúng ta lưu đối tượng. Nó vẫn sẽ xảy ra hàng triệu lần. Ngay cả khi chúng ta sử dụng find_in_batches, cách duy nhất để giảm tần suất của transactions là nhóm các cú pháp thực thi lại. Ví dụ trước vẫn có thể được tối ưu hóa thêm
```
  #ruby
  User.find_in_batches(conditions: ‘grade = 2', batch_size: 500) do |students|
    User.transaction do
      students.each do |student|
        student.find_or_create_by_class_name(‘PE’)
      end
    end
  end
```
Bằng cách này, thay vì commit sau mỗi bản ghi, bây giờ nó chỉ commit mỗi 500 records, điều này sẽ giúp tăng hiệu suất lên nhiều lần.

# 6. Đừng quên index.
Luôn tạo index cho các cột hoặc cột kết hợp quan trọng mà bạn truy vấn thường xuyên nhất.

# 7.Destroy một cách cẩn thận.
Destroy thông qua ActiveRecord là một cú pháp cần được thực hiện một cách cẩn thận. Hãy chắc chắn rằng bạn biết những gì bạn đang làm. Một điều bạn muốn chắc chắn là: mặc dù "destroy" và "delete" đều loại bỏ các record, nhưng "destroy" sẽ đi qua tất cả các callbacks, điều này có thể thực sự rất tốn thời gian. Tương tự với “destroy_all” và “delete_all”. Vì vậy, nếu bạn là khá chắc chắn bạn chỉ muốn xóa các hồ sơ mà không cần chạm vào bất cứ điều gì khác, bạn có thể chỉ cần sử dụng "delete_all".
Một trường hợp khác là nếu bạn muốn làm sạch toàn bộ một model. Giả như bạn muốn xóa tất cả users, bạn có thể sử dụng "TRUNCATE":
```
  #ruby
  ActiveRecord::Base.connection.execute(“TRUNCATE TABLE users”)
```
Nhưng dù sao, xóa trong cấp độ cơ sở dữ liệu vẫn thực sự tốn thời gian. Đây là lý do tại sao chúng ta đôi khi thực hiện phương pháp "xóa mềm". Chỉ cần tạo thêm thuộc tính cho các records cần xóa “deleted = 1” để làm cho nó nhanh hơn.

# 8. Sử dụng background job
Đối với việc thao tác với khối kuowngj dữ liệu lớn, không nhất thiết bạn phải thực hiện các thao tác này trực tiếp mà có thể đẩy chúng xuống background job. Resque hay Sidekiq sẽ hỗ trợ rất nhiều cho bạn trong cách này. Bạn có thể đẩy một thông báo cho người dùng rằng thao tác đang được thực hiện rồi đưa việc import, export, delete data xuống background job thực hiện sau đó khi các thao tác xong chúng ta lại thông báo cho users một lần nữa sẽ rất tiết kiêm thời gian cho người dùng.

Trên đây là những phương pháp mà bạn có thể sử dụng để cải thiện hiệu suất của ứng dụng khi bắt buộc phải làm việc với khối lượng data lớn, giúp cải thiện hiệu suất của ứng dung.

Nguồn: https://chaione.com/blog/dealing-massive-data-rails/