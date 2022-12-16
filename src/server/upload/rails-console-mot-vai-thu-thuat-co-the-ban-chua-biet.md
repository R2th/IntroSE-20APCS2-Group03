Với một lập trình viên Ruby on Rails, Rails console có lẽ đã là một công cụ quen thuộc và không thể thiếu trong quá trình phát triển sản phẩm. Console giúp tương tác với ứng dụng Rails, đặc biệt là các model, trong môi trường thời gian thực. Cùng điểm qua 1 vài thủ thuật giúp chúng ta có thể sử dụng rails console một cách hiệu quả hơn nhé.
## --sandbox
Rails console có 1 chế độ gọi là "sandbox". Trong chế độ này, tất cả những thay đổi đối với cơ sở dữ liệu sẽ được khôi phục khi bạn thóat ra khỏi phiên làm việc
```
rails console --sandbox
```
Đây là chế độ tuyệt vời để bạn có thể thoải mái test, update mà không sự ảnh hưởng đến dữ liệu. 

## Lấy ra giá trị của biểu thức vừa thực hiện
Giả sự bạn mở rails console:
```
Job.first(10)
```
kết quả trả về là 10 bản ghi job đầu tiên. Nếu muốn  lấy giá trị này bạn chỉ cần
```
jobs = _
```
và sau đó có thể sử dụng thoải mái:
```
job.size
>> 10
........
```
hoặc cũng có thể sử dụng "_" trực tiếp
```
_.size
>> 10
```

## Tìm kiếm method với grep
Bạn có thể tìm kiếm tên method của một đối tượng nếu bạn nhớ 1 phần tên của nó. Bằng cách sử dụng grep:
```
first.methods.grep(/mail/)
  Job Load (0.7ms)  SELECT  `jobs`.* FROM `jobs` WHERE `jobs`.`active` = 1  ORDER BY `jobs`.`id` ASC LIMIT 1
=> [:company_pic_email, :recruiter_email]
```

## Tìm ra nơi method được khai báo
Method `source_location` của Object class trả về đường dẫn đầy đủ nơi method được khai báo. Kết quả trả về bao gồm đường dẫn đến file và dòng code mà method được khai báo.
method này đặc biệt hữu ích khi chúng ta muốn đào sâu vào thư viện của 1 bên thứ 3

```
"Test".method(:inquiry).source_location
=> ["/usr/local/bundle/gems/activesupport-4.2.1/lib/active_support/core_ext/string/inquiry.rb", 10]
```

## Trả về source code của 1 method
Ở trên chúng ta đã biết cách xác định vị trí chính xác của một method. Nhưng chúng ta còn có thể xem được cả mã nguồn của nó. Điều này có thể được thực hiện thông qua method `source` của Object:
```
"Test".method(:inquiry).source.display
  def inquiry
    ActiveSupport::StringInquirer.new(self)
  end
=> nil
```

## App object
Console cung cấp một đối tượng khá thú vị, đấy là `app object`. Về cơ bản đây là một ứng dụng thu nhỏ của bạn.
Với đối tượng này,  chúng ta có thể tương tác với ứng dụng như 1 HTTP client:

- GET
 ```
 >> app.get('/')
 
Started GET "/" for 127.0.0.1 at 2019-12-20 06:31:23 +0000
DEBUG: Chewy strategies stack: [3] <- atomic @ /usr/local/bundle/bundler/gems/chewy-366cad2a457a/lib/chewy/railtie.rb:17
Processing by DashboardsController#index as HTML
  Rendered public/403.html (0.0ms)
Filter chain halted as :check_access rendered or redirected
Completed 403 Forbidden in 75ms (Views: 17.4ms | ActiveRecord: 0.0ms)
DEBUG: Chewy strategies stack: [3] -> atomic @ /usr/local/bundle/bundler/gems/chewy-366cad2a457a/lib/chewy/railtie.rb:17
=> 403
```

- Tìm kiếm các path với router `game`
```
>> app.methods.grep(/_path/).grep(/game/)
=> [:search_games_path, :game_ownlist_placements_path, :game_ownlist_placement_path, :game_wishlist_placements_path, :game_wishlist_placement_path, :game_path]
```
- Cùng rất nhiều những thứ thú vị bạn cos thể khám phá