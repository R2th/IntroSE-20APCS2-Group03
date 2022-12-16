Cùng bắt đầu với nhưng thứ cơ bản trước nhé
# Find
Với kiểu đối số truyền vào như thế nào thì nó sẽ cho kết quả như thế ấy, có 2 kiểu đối số chúng ta có thể truyền vào ở đây là số interger/chuỗi có dạng number(vd: "69") hoặc là mảng các số integer/mảng chuỗi có dạng number(vd: "69","96"). Với trường hợp đối số truyền vào là 1 số thì sẽ trả về 1 object, còn đối số truyền vào là môt mảng số thì kết quả trả về là một mảng các object

`find` sẽ bắn ra một Exception nếu không có bất kỳ một record nào được tìm thấy. Nó chính là nguyên nhân dẫn tới việc server sẽ bị "crash"

```

Client.find(69)
--> SELECT * FROM clients WHERE (clients.id = 10) LIMIT 1
//> #<Client id: 69, first_name: "Tien ong trong cu cai"


Client.find([69, 96]) // Or Client.find(69, 96)
SELECT * FROM clients WHERE (clients.id IN (69,96))
// => [#<Client id: 69, first_name: "Tien ong trong cu cai">, #<Client id: 96, first_name: "Tien ong day xe bo">]
```

# Find_by & find_by!

find_by thực hiện tìm tiếm với điều kiện nào đó, nếu tìm thấy, trả về 1 object, nếu không tìm thấy thì trả về nil.

Nó không bắn ra Exception, nó trả về "nil" nếu không có bản ghi nào và server sẽ không bị gián đoạn nếu không có record nào có giá trị phù hợp được tìm thấy.

`find_by!` thì tương tự với `find_by`, tuy nhiên nếu không tìm thấy thì sẽ trả về "Exception ActiveRecord::RecordNotFound"

# Find_each

Khi mới được vào dự án và bắt đầu xử lý vòng lặp thì điều đầu tiên mình nghĩ tới đó là each, map, ... vì đơn giản là mình dùng nhiều rồi :v. Và đó là lúc mình được mọi người trong team giới thiệu cho cách thực hiện tốt hơn, tối ưu hơn

Thế tại sao dùng each lại là không tối ưu? có thể nói là "tồi". Vì khi dự án của bạn có số lượng bản ghi rất lớn (hơn 1000 thằng records chằng hạn)  thì nó sẽ cố gắng khởi tạo ra tất cả các object và lưu trữ nó trong bộ nhớ - nghe thôi đã thấy nặng vch rồi :)

Còn với find_each thì nó sẽ lấy ra các records theo từng batch sau đó gọi tới từng record trong khối như là một đối tượng riêng. Quá trình này được lặp đi lặp lại cho tới khi tất cả các record được xử lý xong.

bonus thêm một vài options
`find_each(start: nil, finish: nil, batch_size: 1000, error_on_ignore: nil)`. Dễ thấy mặc định của nó sẽ là chạy 1000 records mỗi lần 
* :batch_size - tùy chỉnh kích thước, mặc định 1000

* :start - tùy chỉnh khóa chính để bắt đầu

* :finish - tùy chỉnh khóa chính để kết thúc

* :error_on_ignore - có thể ghi đè lên các lỗi hiển thị khi xảy ra lỗi

option :start vs :finish sẽ đặc biệt hữu ích nếu bạn có nhiều công việc phải xử lý trong 1 vòng lặp. 

Ví dụ: bạn có 6969 records vào có 2 job cần thực hiện
* công việc 1 từ thằng bắt đầu tới thằng 1000
* công việc 2 từ thằng 10001 đến hết

```
# work 1, lest's process untill 1000 records
User.find_each(finish: 1000) do |user|
    user.send "do_work_1"
end

# work 2, let's process from record 10001 and onwards.
User.find_each(start: 1001) do |user|
    user.send "do_work_2"
end
```

# Find_in_batches
Cái nì tương tự `find_each` khi cũng lấy ra batch các records (các options). Nhưng điểm khác ở dây là nó gọi tới các batches rồi đưa vào trong block dưới dạng một mảng các record thay vì đưa lần lượt từ record vào, điều đó cho thấy việc sử dụng find_in_batches là  hiệu quả nhất trong việc thao tác với một số lượng lớn bản ghi (find_each, each, in_batch).

```
# Let's process the next 1000 records
User.find_in_batches(start: 1000, batch_size: 1000) do |group|
  group.each { |user| user.friends }
end
```

Có một vấn đề mà khi làm dự án mình đã gặp:
```
Movie.find_in_batches(batch_size: 1000) do |sub_movie|
    puts Movie.movie_name
end
```
mình muốn sắp xếp các records này theo một trường bất kì trong Movie - giả sử theo tên đi. nhưng với đoạn code trên thì sẽ mặc định là sắp xếp theo `movies.id`. Vậy ta phải làm gì? đặt order ngay sau Movie ntn `Movie.order(:name)` no no - check log nhé
```
Movie Load (0.9ms)  SELECT  `movies`.* FROM `movies`  ORDER BY `movies`.`id` ASC LIMIT 100
```

see? nó vẫn sẽ sắp xếp theo id thôi - vì nó mặc định là z mà :joy::joy::joy:


# Find_or_create_by
Đơn giản như cái tên gọi của nó :)). Nó sẽ tìm kiếm record với tham số được truyền vào, nếu không thấy nó sẽ tạo mới 1 record với attribute tương ứng

```
Movie.find_or_create(movie_name: "Your name")
# => #<Movie id: 1, movie_name: "Your name">
```

Ngoài ra còn có `find_or_initilize_by` cũng có ý nghĩa tương tự, nhưng từ `initialize' ở đây lại giống như việc ta gọi Movie.new, khỏi tạo chứ không phải tạo mới.

Đây là một vài cách dùng về `find` mà mình biết, nếu có bạn thấy thiếu và muốn bổ sung hay comment phía dưới để bài viết mình được hoàn thiện hơn - thanks for reading

`_DaydeV_