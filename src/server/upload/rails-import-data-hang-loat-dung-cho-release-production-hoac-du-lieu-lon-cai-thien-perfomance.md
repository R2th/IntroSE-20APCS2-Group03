Hi,

Chào các bạn! Hôm nay mình xin giới thiệu các bạn một giải pháp khá đơn giản trong Rails để giải quyết vấn đề tạo dữ liệu hàng loạt(vài trăm ngàn records trên một bảng) đạt hiệu quả cao nhất và thời gian ngắn nhất.

Những bài toán đặt ra ở đây cụ thể là việc bạn cần phải tạo một khối lượng dữ liệu rất lớn trong database để đáp ứng release của dự án. Hay bạn đang thao tác với các bảng cần khởi tạo nhiều record. Thông thường chúng ta sẽ dùng Active Record của Rails cho việc này. Nhưng cơ chế cho việc tạo dữ liệu theo kiểu này bằng ActiveRecord là rất chậm. Chính vì thế nên nó có thể gây ra một số rủi ro nhất định chưa tính tới việc gây khó chịu cho nhà phát triển. Vậy nên hôm nay mình xin giới thiệu tới các bạn một giải pháp rất hữu ích cho tác vụ này, nó tiêu tốn ít thời gian hơn, coding cũng ngắn gọn hơn. Và với bài toán ban đầu đặt ra thì đây là một giải pháp rất hữu ích để các bạn tham khảo. Giải pháp đây chính là activerecord-import

# Bài toán ban đầu

Quay trở lại với bài toán ban đầu đặt ra. Ví dụ ta cần import 100000 record users với table column như dưới đây:

```
create_table :users do |t|
  t.column :name, :string, null: false
  t.column :description, :string
end
```

Nếu dùng Active Record, chúng ta có một function ngắn gọn để tạo list record user từ một list data được đọc ra từ file csv.

```
convert_csv_to_user_attributes.each do |attrs|
    User.create!(attrs)
end
```

Đoạn code trên có vẽ khá đơn giản, nhưng để ý kỹ, bạn sẽ thấy nó thực hiện lần lượt từng lệnh create và save vào database cho mỗi item attrs. Điều này có nghĩa sẽ mất khá khá thời gian cho tác vụ này với 100000 item user trong file csv: ~115s

Lý giải cho performance của đoạn này, ta thấy với mỗi lệnh create thì một câu lệnh ```INSERT``` được tạo ra. Nếu dùng đoạn code trên cho 100000 record thì sẽ có 100000 câu lệnh ```INSERT``` được tạo ra, cộng thêm 100000 lần data thực hiện việc đóng-mở bảng ```USER``` để thêm dữ liệu, cập nhật index 100000 lần nữa. Đây chính là lý do chúng ta phải chờ hơn 100s để nhận được response.



## Giải pháp

Bây giờ chúng ta sẽ sử dụng một GEM cho tác vụ này: ```activerecord-import```

## Cài đặt

Rất dễ dàng để cài đặt một gem với RubyGems, bạn có thể chạy lệnh 

```
gem install activerecord-import
```

hoặc thêm vào Geemfile:

```
gem 'activerecord-import'
```

sau đó ```bundle install```


## Sử dụng

Bây giờ thay vì ```create!```, chúng ta tạo một instance User trong memory và pass vào data bằng method ```import```-một method của ```activerecord-import```.

### Import data với validate

```
users = convert_csv_to_user_attributes.map do |attrs|
    User.new(attrs)
end

User.import users
```

Ta phân tích kỹ hơn về hiệu năng đoạn code này một chút. Theo mặc định, phương thức ```import``` ở đây vẫn sẽ thực validation, nhưng nó sẽ sắp xếp các công việc như validate, save data... một cách hợp lý nhất, và điều quan trọng là nó chỉ thực thi đúng 1 câu SQL duy nhất. Điều này làm giảm đi đáng kể thời gian so với ví dụ ban đầu.

Cụ thể, nếu dùng import validate cho 100000 record users như trên chỉ mất ~5s(ban đầu là ~115s)

### Import data không validate(validate: false)

Nếu dữ liệu bạn đang có là dữ liệu đã được qua sàng lọc trước, đồng nghĩa với việc nó có thể tin tưởng được về độ đúng đắn. Bạn có thể sử dụng kỹ thuật import như trên nhưng không thực thi validation. Điều này sẽ làm tăng đáng kể performance và giảm thời gian thực thi import dữ liệu. Ta cùng xem qua ví dụ:

```
users = convert_csv_to_user_attributes.map do |attrs|
    User.new(attrs)
end

User.import users, validate: false
```

Đoạn code trên aply cho 100000 record users chỉ mất ~4,6s và không check bất cứ một validate nào của model User. 

Mình lưu ý chổ validate này một chút. Nó default true nên nếu bạn muốn import data with validate thì không cần set ```validate: true``` nhé.

### Import theo cột và validate

Kỹ thuật này dùng cho trường hợp chúng ta có dữ liệu của từng record được group theo mảng. Việc bây giờ cần làm là matching các mảng dữ liệu ấy với các field có trong database. Bây giờ ta không tạo instance User nữa và sẽ import theo cách dưới.

```
columns = [:name, :description]

# Ví dụ [ ['User #1', 'Lanka'], ['User #2', 'Petter'], ...]
array_of_user_attrs = convert_csv_to_user_attributes

User.import columns, array_of_user_attrs, validate: true
```

Ở đây mình đang import list data của user dùng validate.  Hiệu suất ở trường hợp này ứng với 100000 record tấm khoảng 7,5s.

### Import theo cột và không check validate

```
columns = [:name, :description]

# Ví dụ [ ['User #1', 'Lanka'], ['User #2', 'Petter'], ...]
array_of_user_attrs = convert_csv_to_user_attributes

User.import columns, array_of_user_attrs, validate: false
```

Với kỹ thuật import data theo cột và không check validate, chúng ta chỉ mất ~2,5s. So với ban đầu, hiểu quả và thời gian thực hiện tăng lên đáng kể.

## Tham khảo
Mình có tìm hiểu được một số kết quả so sánh việc import này ở những database khác nhau. Bạn có thể xem qua để tham khảo


### MySQL

![](https://images.viblo.asia/0aed4adf-0242-451b-9dd2-ba83c27c52fd.png)

### SQLite3

![](https://images.viblo.asia/d8200871-377d-4eeb-ad71-b8cf02720dd5.png)

### PostgreSQL

![](https://images.viblo.asia/5d5c8058-d366-4a8e-b021-e61abbd1341c.png)


Trên đây là một số tìm hiểu của mình về Gem import của RubyGems. Bài việt có tham khảo tài liệu từ những tutor khác, chúc các bạn thực hành thành công!

[nguồn tham khảo](https://www.mutuallyhuman.com/blog/2016/06/28/importing-data-quickly-in-ruby-on-rails-applications)