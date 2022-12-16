# 1. Định nghĩa Yield
The yield là một phương thức cho phép truy cập vào khối code. Phương thức cho phép chúng ta điều khiển Yield bằng 1 cách khác.
# 2. Cách sử dụng
Ví dụ: Truyền vào một phương thức cho Yield
```
def block_test
puts "Chúng ta đang ở đây"
puts "Chúng ta đang code"
yield
puts "Đây là A"
end
block_test { puts "Còn đây là B." } # Truy cập vào block_test và sử dụng yield
```
Output:
```
"Chúng ta đang ở đây"
"Chúng ta đang code"
"Còn đây là B"
"Đây là A"
```
Kết quả: Code sẽ chạy phần block_test và sử dụng lại yield puts ” Còn đây là B.”

Bạn cũng có thể truyền tham số cho lệnh yield. 

Ví dụ: Truyền vào tham số cho Yield.
```
def yield_name(name)
puts "Chúng ta đang ở đây."
yield("Anh")
puts "Ở giữa 2 yield."
yield(name) # truyền tham số vào cho Yield
puts "Kết thúc."
end
yield_name("Phong") { |n| puts "Đây là #{n}." }
```
Output:
```
"Chúng ta đang ở đây."
"Đây là Anh."
"Ở giữa 2 yield."
"Đây là Phong"
"Kết thúc."
```
Kết quả: Khi chạy đến yield(“Anh”) thì n bây giờ sẽ là Anh và sẽ in ra đây là Anh. Khi chạy đến yield(name) thì bây giờ n sẽ là Phong và in ra kết quả.