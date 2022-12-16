Trong Rails, đôi khi chúng ta cần lặp một số bản ghi lớn từ model để thực hiện các chức năng như update, gửi mail,...thì chúng ta hay sử dụng all.each. Điều này có thể dẫn đến việc tràn bộ nhớ nếu có hàng triệu bản ghi trong bảng.

Giả sử có một model User. Chúng ta sẽ cùng nhau đi so sánh việc sử dụng each, find_each và find_in_baches để thấy được sự khác nhau và nên sử dụng loại nào để tối ưu hơn.

# 1. each
```
User.all.each do |user|
  // do something
end
```

Câu query sẽ được thực hiện như dưới đây:

```
User Load (1.2ms)  SELECT "users".* FROM "users"
```

Khi sử dụng **.each** với số lượng bản ghi lớn thì nó sẽ cố gắng khởi tạo ra tất cả các object và lưu trữ tất cả chúng trong bộ nhớ. Nếu số lượng bản ghi vượt quá giới hạn của bộ nhớ thì có thể dẫn đến tràn bộ nhớ vì không có **limit** hoặc **offset**. Để khắc phục nhược điểm này thì chúng ta có thể dùng batch processing (find_each, find_in_batches).

# 2. find_each

```
User.find_each do |user|
  puts "User: #{user.name}, Age: #{user.age}"
end
```

Sử dụng **find_each** sẽ tăng hiệu năng so với **each** hơn là bởi vì **find_each** nó sẽ lấy ra các records theo từng **batch** sau đó gọi tới từng record trong khối như là một đối tượng riêng. Quá trình này được lặp đi lặp lại cho tới khi tất cả các record được xử lý xong.

Một số option hỗ trợ trong **find_each** như

* batch_size - Số lượng bản ghi khi được query và để vào batch. Mặc định sẽ là 1000 bản ghi
* start - giá trị của khóa chính khi bắt đầu truy vẫn
* finish - giá trị của khóa chính để kết thúc truy vẫn

```
User.find_each(start: 10, batch_size: 2000) do |user|
  puts "User: #{user.name}, Age: #{user.age}"
end
```

# 3. find_in_batches

```
User.find_in_batches do |users|
   users.each do |user|
      puts "User: #{user.name}, Age: #{user.age}"
   end
end
```

Cũng giống như **find_each** là lấy ra các records theo từng **batch**. Nhưng nó có một điểm khác biệt đó là chúng sẽ lấy ra các records theo từng **batch** nhưng được đưa vào trong block dưới dạng một mảng các record thay vì đưa lần lượt từng record vào. Điều đó cho thấy việc sửa dụng **find_in_batches** có lẽ là hiệu quả nhất trong việc thao tác với một số lượng lớn các bản ghi.

Một số option hỗ trợ trong **find_in_batches** cũng tương tự như các option có trong **find_each**


```
User.find_in_batches(batch_size: 5000) do |users|
   users.each do |user|
      puts "User: #{user.name}, Age: #{user.age}"
   end
end
```

## Lưu ý khi sử dụng find_in_batches

```
User.select('user.name').find_in_batches do |group|
  group.each {|user| puts user.name}
end
```

Đoạn code trên sẽ chạy êm ru nếu trong db của bạn có ít hơn 1000 users. Đến khi bảng users của bạn có record thứ 1001, lỗi sẽ được raise lên ngay khi gọi. 

```
RuntimeError: Primary key not included in the custom select clause
```

Nguyên nhân ở đây là do bạn chưa có primary key trong câu lệnh select. Và để khắc phục lỗi này thì chúng ta chỉ cần them primary key vào trong select là được

```
User.select('user.id, user.name').find_in_batches do |group|
  group.each {|user| puts user.name}
end
```

Bạn có thể xem chi tiết [tại đây](https://apidock.com/rails/ActiveRecord/Batches/find_in_batches#1535-Be-careful-with-select)

Bài viết mình kết thúc tại đây. Hy vọng bài viết sẽ giúp ích cho các bạn!

# Tham khảo

https://rubyinrails.com/2017/11/16/use-find-each-instead-of-all-each-in-rails/
https://rubyinrails.com/2019/09/17/rails-find-in-batches-vs-find-each/
https://apidock.com/rails/ActiveRecord/Batches/find_in_batches#1535-Be-careful-with-select