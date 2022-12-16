Rails là một framework tuyệt vời, nó đã giúp cho các các cá nhân và các doanh nghiệp xây dựng được những sản phẩm của họ trong một khoảng thời gian rất ngắn. Rails được dùng làm backend cho nhiều dự án web hoặc làm server API cho các app di động  của các startup. Bản thân mình cũng thích cú pháp và tốc độ dev dự án bá đạo của rails.

![](https://images.viblo.asia/638d4380-c04e-4db4-b31b-b55e7b37cc0c.png)


Tuy nhiên, một câu hỏi được đặt ra là, tốc độ xử lý của Rails khi phải đương đầu với một lượng dữ liệu lớn sẽ như thế nào? Chắc hẳn bạn đã đọc câu truyện "How We Went from 30 Servers to 2: Go", nếu chưa thì hãy đọc thử ở [đây](https://blog.iron.io/how-we-went-from-30-servers-to-2-go/). Đại khái câu truyện là một công ty xây dựng một hệ thống backend bằng Rails để chạy các sản phẩm mà họ làm cho các khách hàng và dùng 30 server để duy trì nó. Khi số lượng khách hàng tăng, lượng dữ liệu trở nên quá tải đối với hệ thống và công ty này buộc phải chuyển từ Rails sang Go, và kết quả là họ thành công, nhưng đặc biệt là họ chỉ cần dùng có 2 server để duy trì hệ thống thôi. 

Liệu rằng Rails có bị nghẽn cổ chai khi chúng ta cố gắng xử lý một lượng dữ liệu khổng lồ hay không ? Có lẽ không, nếu như chúng ta sử dụng các mẹo sau.

## 1. Đừng dùng ActiveRecord nếu có thể

ActiveRecord làm cho mọi thứ trở nên rất dễ dàng, nhưng nó không được tạo ra dành cho dữ liệu thô. Khi bạn muốn dùng một loạt các tiến trình đơn giản vào hàng triệu bản ghi, bạn nên dùng lệnh SQL thuần thì hơn. Nếu bạn cảm thấy bạn cần một công cụ ORM để giúp bạn có thể dễ làm việc hơn, hãy thử SEQUEL.

## 2. Dùng update_all để cập nhật tất cả bản ghi

Dưới đây là một lỗi cơ bản thường thấy ở những người muốn lặp lại toàn bộ bảng và cập nhật từng phần tử một:

```ruby
  User.where(city: “Houston”).each do |user|
    user.note = “Houstonian”
    user.save
  end
```
Đoạn code khá dễ hiểu nhưng lại có nhược điểm chí mạng. Nếu có 100000 user có trường city là "Houston" thì đoạn code sẽ chạy tầm 24 tiếng. Lâu phết nhỉ? Có một giải pháp nhanh gọn và hiệu quả hơn nhiều:

```ruby
  User.update_all({note: “Houstonian”}, {city: “Houston”})
```
Và đoạn code này chạy chỉ trong vòng 30 giây với cùng một lượng dữ liệu với đoạn ở trên.

## 3. Chỉ lấy dữ liệu ở những cột cần thiết

Đoạn code `User.where(city: “Houston”)` sẽ lấy tất cả thông tin từ các user trong database. Nếu bạn không cần dùng những thông tin phụ như tuổi tác, giới tính, tính trạng hôn nhân,... thì bạn không nên lấy tất cả đống thông tin đó ngay từ đầu làm gì cả. Hãy dùng `select_column` khi bạn muốn lấy dữ liệu của vài cột:
```ruby
  User.select(“city”, “state”).where(age: 29)
```

## 4. Thay thế lệnh Model.all.each với find_in_batches

Với những hệ thống nhỏ thì thay đổi như thế này không quan trọng cho lắm. Nhưng với hệ thống có 100000 bản ghi thì lệnh trên có thể dễ dàng chiếm từ 5 GB bộ nhớ trở lên. Server sẽ dễ dàng bị sập. Vì vậy, mình cho rằng nên dùng `find_in_batches` để giải quyết vấn đề này:
```ruby
  User.find_in_batches(conditions: ‘grade = 2', batch_size: 500) do |students|
    students.each do |student|
      student.find_or_create_by_class_name(‘PE’)
    end
  end
```

## 5. Đừng dùng transaction quá nhiều
```ruby
  (0.2ms) BEGIN
  (0.4ms) COMMIT
```

![](https://images.viblo.asia/8cab1532-a24e-48c5-891c-1d5c802b877e.png)

Transaction được chạy mỗi khi object được lưu. Nó sẽ chạy hàng triệu lần trong suốt quá trình chạy hệ thống. Kể cả chúng ta có dùng find_in_batches, cách duy nhất để hạn chế transaction một cách hiệu quả là nhóm các tiến trình lại. Đoạn code ở phần 4 vẫn có thể được tối ưu như sau:

```ruby
  User.find_in_batches(conditions: ‘grade = 2', batch_size: 500) do |students|
    User.transaction do
      students.each do |student|
        student.find_or_create_by_class_name(‘PE’)
      end
    end
  end
```

Bằng cách này, thay vì phải `commit` từng bản ghi một, bây giờ chỉ cần `commit` sau mỗi 500 bản ghi thôi, hiệu quả hơn nhiểu.

## 6. Đừng quên đánh index

Luôn luôn đánh index những cột hoặc nhóm cột quan trọng mà bạn hay truy vấn nhất. Bằng không, lệnh của bạn sẽ mất cả đời để chạy đấy.

## 7. Destroy chiếm rất nhiều tài nguyên

`Destroy` trong ActiveRecord là một tiến trình rất nặng. Hãy đảm bảo bạn biết bạn đang làm gì. Một điều mà bạn phải biết đó là: mặc dù `destroy` và `delete` đều xóa các bản ghi, `destroy` sẽ chạy tất cả các hàm callback, điều này rất tốn thời gian. Tương tự với `destroy_all` và `delete_all`. Vì thế, nếu bạn chỉ muốn xóa các bản ghi mà không động chạm vào bất kì thứ gì khác, bạn nên chỉ dùng `delete_all`. 
Trong trường hợp khác là nếu bạn muốn xóa toàn bộ một bảng. Ví dụ như bạn muốn xóa hết user, bạn có thể dùng `TRUNCATE`:
```ruby
  ActiveRecord::Base.connection.execute(“TRUNCATE TABLE users”)
```
Dù sao đi nữa, `delete` ở mức database vẫn rất tốn thời gian. Đây là lí do vì sao đôi khi chúng ta nên dùng "soft delete" hay còn gọi là "xóa mềm", chỉ cần thay đổi trường “deleted = 1″ của bản ghi muốn xóa là được.

## 8. Không nhất thiết phải chạy lệnh ngay lập tức

Hãy dùng "Background job". Resque  và Sidekiq luôn bên bạn, hãy dùng chúng để thực thi lệnh ngầm và đặt lịch thực thi lệnh, mọi thứ sẽ trở nên dễ thở hơn nhiểu.

![](https://images.viblo.asia/5b52f036-5950-4e2a-8750-0d0df7688624.png)


Tóm lại, nếu bạn có một khối lượng lớn dữ liệu, hãy cố gắng hết mức có thể để tối ưu hóa hiệu suất hệ thống. Mặc dù rất tiện nghi, nhưng chúng ta phải thừa nhận rằng ActiveRecord làm chậm hệ thống đi đôi chút. Tuy nhiên, qua những mẹo trên, bạn vẫn có thể giữ được những điểm mạnh khác của Rails mà không lãng phí quá nhiều hiệu suất. Hãy tận hưởng Rails càng nhiều càng tốt!

Tham khảo: https://chaione.com/blog/dealing-massive-data-rails/