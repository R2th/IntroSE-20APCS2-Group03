Bài viết được dịch từ: https://www.freecodecamp.org/news/how-to-set-unique-interchangeable-index-constraint-in-rails/

------------------

## Lỗ hổng của Rails `validates uniqueness: true`
Nếu làm việc với framework Rails, chắc hẳn nhiều lần bạn đã phải sử dụng uniqueness validation cho một model nào đó khi xây dựng model. Tuy nhiên, những validation này 

Vì vậy, chỉ sử dụng unique validation của Rails để đảm bảo sự duy nhất của dữ liệu là chưa đủ. Việc validate qua Rails chỉ giúp ích cho việc tạo ra trải nghiệm và giao diện người dùng tốt hơn mà thôi, khi mà người dùng sẽ được thông báo về những lỗi input khiến cho dữ liệu không thể cập nhật vào trong hệ thống máy chủ.

Vậy tại sao validate uniqueness trong Rails là không đủ ? 
Vì ngay cả khi đã chạy qua validation này thì có những trường hợp, dữ liệu không mong muốn cũng vẫn sẽ được lưu vào trong database khiến cho hệ thống gặp những lỗi không mong muốn. Hãy thử xem qua ví dụ về model User sau: 

```
class User
  validates :username, presence: true, uniqueness: true
end
```

Để validate cho cột `username`, Rails truy xuất dữ liệu từ database bằng câu truy vấn SELECT để kiểm tra xem `username` đã tồn tại hay chưa. Nếu đã tồn tại thì sẽ trả về lỗi "username already exists" , nếu không thì sẽ chạy câu lệnh `INSERT` để thêm dữ liệu cột `username` vào trong database.

![](https://images.viblo.asia/b63731fc-5445-4d9b-afac-5421e3221bd5.png)

Khi có hai users cùng một lúc chạy hai tiến trình, thỉnh thoảng database vẫn sẽ lưu dữ liệu ngay cả khi đã có validate của rails. Chính vì thế nên mới cần có thêm điều kiện giới hạn "UNIQUE INDEX" sử dụng ở database

Khi hai user A và B cùng một lúc muốn save một giá trị username giống nhau vào trong database, rails cũng sẽ chạy câu lệnh SELECT vào trong database. nếu như username đã tồn tại thì cả 2 user sẽ được thông báo là giá trị đã tồn tại. Tuy nhiên, nếu như username chưa tồn tại trong database, thì cả 2 sẽ cùng chạy câu lệnh INSERT để đưa giá trị username đã nhập vào trong database cùng một lúc, như trong bức ảnh dưới đây: 

![](https://images.viblo.asia/4105de8a-503c-420c-8182-e7a38dfb7d81.png)

## Thiết lập unique index ở DB để đảm bảo tính chính xác của dữ liệu

Như vậy, nếu như không có unique index bên trong database, cả 2 user sẽ cùng được save vào trong DB.  Vì thế, không nên quá dựa dẫm vào việc validate ở rails mà bạn cũng nên tự mình thiết lập một unique index tương ứng trong database để đảm bảo tính chính xác của dữ liệu. Vậy thì set unique index trong database như thế nào?

Để thiết lập một unique index cho một hoặc nhiều cột, bạn cần phải chạy migrate. Giả sử như ví dụ trên đang có một bảng `users` với cột `username` và cần thiết lập giá trị unique cho cột username trong bảng này, bạn chỉ cần tạo một file migration với dòng code như sau: 

```
add_index :users, :username, unique: true
```

Sau đó chạy migrate, và ngay lập tức là đã có một unique constraint ở tầng database. Khi đó database sẽ đảm bảo không có user nào bị trùng `username`.

Đối với nhiều cột có liên quan đến nhau, hãy giả sử rằng có một bảng `request` với hai cột `sender_id` và `receiver_id`. Tương tự, có thể tạo file migration với đoạn code sau: 

```
add_index :requests, [:sender_id, :receiver_id], unique: true
```

## Vấn đề gặp phải với self-join

Vấn đề gặp phải với file migrate nhiều cột như trên là các trường id trong trường hợp này là có thể thay đổi được. Nếu như có một bản ghi có sender_id = 1 và receiver_id  = 2, bảng `request` vẫn có thể tạo một bản ghi với sender_id = 2 và receiver_id = 1, mặc dù vốn đã có một bản ghi `request` cho trường hợp này rồi.

Vấn để này thường gặp phải ở những model tự join với chính nó, tức là cả **sender** (người gửi) và **receiver** (người nhận) đều là một bảng users: sender_id lẫn receiver_id trỏ quan hệ từ users.id. Một user có sender_id = 1 gửi request tới user khác có id = 2. Nếu người nhận (id = 2) tiếp tục gửi một request khác, khi chúng ta cho phép giá trị này được lưu trong database, thì chúng ta sẽ có hai bản ghi `request` giống nhau từ hai user (sender và receiver || receiver và sender) trong bảng requests.


![](https://images.viblo.asia/b5010a44-7426-46d1-97e8-afbc585652c5.png)

### Cách fix thông thường 

Thông thường vấn đề này sẽ được sửa bằng cách dưới đây:

```
def force_record_conflict
    # 1. Return nếu đã có sẵn request từ sender tới receiver
    # 2. Nếu không thì đảo lộn sender và receiver
end
```

Tuy nhiên phương pháp này lại nảy sinh ra một vấn đề khác, đó là sinh ra thêm một bản ghi với sender_id và receiver_id được đổi chỗ cho nhau mỗi lần lưu vào database. Vì vậy cột receiver_id sẽ phải lưu cả giá trị cột sender_id và ngược lại. 

Ví dụ, nếu như sender_id có giá trị là 1, gửi request tới receiver_id có giá trị là 2, chúng ta sẽ phải lưu thêm một bản ghi có giá trị như sau: 

![](https://images.viblo.asia/332d4c75-1715-4a90-a4a0-7157171ce2a6.png)

Điều này không nên là vì: 

- Số lượng bản ghi bị duplicate, gây ra tình trạng thừa nhiều dữ liệu trong database. Tưởng tượng nếu như mỗi ngày có hàng ngàn request từ các user khác nhau gửi qua gửi lại cho nhau thì DB của bạn sẽ phải lưu rất nhiều dữ liệu không cần thiết. 
- Không nên lưu thừa dữ liệu để tránh gây ra những lỗi logic khi bạn cần xử lý một vấn đề gì đó. Chẳng hạn như nếu cần phải gửi notification tới receiver mỗi khi nhận được request, thì khi đó việc lưu hai bản ghi chứa receiver_id và sender_id có giá trị đảo ngược nhau sẽ gây khó khăn trong việc tìm kiếm bản ghi chính xác.

### Sửa bằng cách hợp lý hơn

Có thể giải quyết vấn đề này bằng cách tương tác trực tiếp với database. Trong trường hợp này là sử dụng PostgreSQL. Khi chạy migrate, phải chắc chắn rằng có điều kiện unique cho cả hai cặp id (1,2) và (2,1) trong request trước khi save vào database

Code cho file migrate:

```
class AddInterchangableUniqueIndexToRequests < ActiveRecord::Migration[5.2]
  def change
    reversible do |dir|
      dir.up do
        connection.execute(%q(
          create unique index index_requests_on_interchangable_sender_id_and_receiver_id on requests(greatest(sender_id,receiver_id), least(sender_id,receiver_id));
          create unique index index_requests_on_interchangable_receiver_id_and_sender_id on requests(least(sender_id,receiver_id), greatest(sender_id,receiver_id));
        ))
      end

      dir.down do
        connection.execute(%q(
          drop index index_requests_on_interchangable_sender_id_and_receiver_id;
          drop index index_requests_on_interchangable_receiver_id_and_sender_id;
        ))
      end
    end
  end
end
```

Giải thích

- Sau khi tạo file migrate, cú pháp `reversible` khai báo nhằm đảm bảo file migrate này có thể rollback lại nếu cần thiết. `dir.up` sẽ chạy khi migrate database, còn `dir.down` sẽ chạy khi rollback (hoặc migrate down) database.
 
- `connection.execute(%q(...))` dùng để thông báo cho Rails biết cơ sở dữ liệu sử dùng là PostgreSQL. 

- Do "ids" là kiểu dữ liệu `integer`, trước khi save vào database sẽ kiểm tra xem hai giá trị lớn nhất và nhỏ nhát (2 và 1) theo thứ tự đó đã tồn tại trong database hay chưa: 
```
requests(greatest(sender_id,receiver_id), least(sender_id,receiver_id))
```

- Sau đó tiếp tục kiểm tra xem giá trị nhỏ nhất và lớn nhất theo thứ tự này (1 và 2) đã tồn tại trong database hay chưa: 

```
requests(least(sender_id,receiver_id), greatest(sender_id,receiver_id)) 
```

Và như vậy, trong database hiện giờ chỉ còn đúng một bản ghi chính xác theo ý muốn được save lại, không cần tạo ra thêm bản ghi khác mà vẫn phục vụ đúng mục đích unique constraint:

![](https://images.viblo.asia/8015f851-1aaa-4b4a-a68a-a13ea1704c99.png)