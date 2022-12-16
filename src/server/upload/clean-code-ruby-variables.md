## Giới thiệu

![](https://camo.githubusercontent.com/2050cd696ecddcabad1380b1964c48a60597323e/687474703a2f2f7777772e6f736e6577732e636f6d2f696d616765732f636f6d6963732f7774666d2e6a7067)

 Bài viết này dựa trên các nguyên tắc kỹ thuật trong lập trình từ cuốn sách [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) của Robert C. Martin, được điều chỉnh cho Ruby. Đây không phải là một hướng dẫn cách viết bắt buộc. Đó là một hướng dẫn để sản xuất phần mềm có thể đọc, tái sử dụng và có thể tái cấu trúc trong Ruby.

Không phải mọi nguyên tắc trong tài liệu này đều phải được tuân thủ nghiêm ngặt, cũng như phổ biến trên toàn cầu. Đây là những hướng dẫn và không có gì khác, nhưng chúng là những thứ được rút ra qua nhiều năm kinh nghiệm tập thể của các tác giả của Clean Code.

Nghề kỹ sư phần mềm của chúng tôi chỉ hơn 50 tuổi một chút và chúng tôi vẫn đang học hỏi rất nhiều. Khi kiến trúc phần mềm cũng cũ kĩ như kiến trúc ngoài đời thật, có lẽ sau đó chúng ta sẽ có những quy tắc khó hơn để tuân theo. Hiện tại, hãy để những hướng dẫn này đóng vai trò là nền tảng để đánh giá chất lượng mã Ruby mà bạn và nhóm của bạn tạo ra.

Một điều nữa: biết những điều này sẽ không ngay lập tức giúp bạn trở thành một nhà phát triển phần mềm tốt hơn và làm việc với họ trong nhiều năm không có nghĩa là bạn sẽ không phạm sai lầm. Mỗi đoạn mã bắt đầu như một bản nháp đầu tiên, giống như đất sét ướt được định hình thành dạng cuối cùng của nó. Cuối cùng, chúng tôi loại bỏ những điểm không hoàn hảo khi chúng tôi xem xét nó với các đồng nghiệp của mình. Đừng tự thoả mãn bản thân bởi những bản nháp đầu tiên cần cải thiện. Thay vào đó hãy liên tục cải thiện chúng.

## Variables

### Sử dụng tên biến có ý nghĩa và phát âm được.

Bad:
```ruby
yyyymmdstr = Time.now.strftime('%Y/%m/%d')
```

Good:
```ruby
current_date = Time.now.strftime('%Y/%m/%d')
```

### Sử dụng cùng một từ vựng cho cùng một loại biến

Chọn một từ cho toàn bộ concept và chỉ sử dụng nó.

Bad:
```ruby
user_info
user_data
user_record

starts_at
start_at
start_time
```

Good:
```ruby
user

starts_at
```
### Sử dụng tên có thể tìm kiếm và sử dụng hằng số

Chúng ta sẽ đọc nhiều mã hơn là viết. Điều quan trọng là mã chúng ta viết là có thể đọc và tìm kiếm được. Nếu không đặt tên các biến cuối cùng có ý nghĩa, chúng ta sẽ làm tổn thương người đọc code. Vì vậy hãy làm cho tên biến của bạn có thể tìm kiếm.

Ngoài ra, thay vì các giá trị mã hóa cứng và sử dụng "số ma thuật", hãy tạo các hằng số.

Bad:

```ruby
# What the heck is 86400 for?
status = Timeout::timeout(86_400) do
  # ...
end
```

Good:
```ruby
# Declare them as capitalized globals.
SECONDS_IN_A_DAY = 86_400

status = Timeout::timeout(SECONDS_IN_A_DAY) do
  # ...
end
```

### Sử dụng các biến có ý nghĩa giải thích

Bad:
```ruby
address = 'One Infinite Loop, Cupertino 95014'
city_zip_code_regex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
save_city_zip_code(city_zip_code_regex.match(address)[1], city_zip_code_regex.match(address)[2])
```
Good:
```ruby
address = 'One Infinite Loop, Cupertino 95014'
city_zip_code_regex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
_, city, zip_code = city_zip_code_regex.match(address).to_a
save_city_zip_code(city, zip_code)
```
### Tránh sử dụng các biến mapping không ý nghĩa

Rõ ràng là tốt hơn so với ngầm định.

Bad:
```ruby
locations = ['Austin', 'New York', 'San Francisco']
locations.each do |l|
  do_stuff
  do_some_other_stuff
  # ...
  # ...
  # ...
  # Wait, what is `l` for again?
  dispatch(l)
end
```

Good:
```ruby
locations = ['Austin', 'New York', 'San Francisco']
locations.each do |location|
  do_stuff
  do_some_other_stuff
  # ...
  # ...
  # ...
  dispatch(location)
end
```

### Không thêm vào những nội dung không cần thiết

Đừng lặp lại tên class/object trong biến.

Bad:
```ruby
car = {
  car_make: 'Honda',
  car_model: 'Accord',
  car_color: 'Blue'
}

def paint_car(car)
  car[:car_color] = 'Red'
end
```

Good:
```ruby
car = {
  make: 'Honda',
  model: 'Accord',
  color: 'Blue'
}

def paint_car(car)
  car[:color] = 'Red'
end
```

### Sử dụng đối số mặc định thay vì điều kiện

Đối số mặc định thường sạch hơn so với điều kiện. Xin lưu ý rằng nếu bạn sử dụng chúng, phương thức của bạn sẽ chỉ cung cấp các giá trị mặc định cho các đối số không xác định. Các giá trị "falsy" khác như false và nil sẽ không được thay thế bằng giá trị mặc định.
Bad:
```ruby
def create_micro_brewery(name)
  brewery_name = name || 'Hipster Brew Co.'
  # ...
end
```

Good:
```ruby
def create_micro_brewery(brewery_name = 'Hipster Brew Co.')
  # ...
end
```

## Next
Clean Code Ruby - Methods (comming soon)

## Tài liệu tham khảo
https://github.com/uohzxela/clean-code-ruby#variables