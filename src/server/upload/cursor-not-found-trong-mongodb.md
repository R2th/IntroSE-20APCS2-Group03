# Cursor là gì ?
> A pointer to the result set of a query. Clients can iterate through a cursor to retrieve results.

Khi bạn truy vấn dữ liệu, thay vì phải load tất cả documents về client thì cursor sẽ giúp bạn fetch dữ liệu về theo từng batch để xử lý. Cơ chế này giúp ích rất nhiều trong trường hợp collection có số lượng lớn documents, chúng ta không phải lo lắng về việc chúng sẽ tốn quá nhiều bộ nhớ nữa.

Kể từ MongoDB bản 3.4 trở đi, **find()** và **aggregate()** sẽ có một init batch với size mặc định là 101 documents, những batch tiếp theo không có giới hạn mặc định số documents trả về nhưng tối đa là 16MB trên 1 batch (tương đương với Document Size Limit của MongoDB).

Khi ta thực hiện truy vấn MongoDB sẽ lưu lại cursor id, sau đó **getMore** cùng với cursor id để lấy về batch dữ liệu tiếp theo. Tuy nhiên mặc định nếu như sau 10 phút mà không có query **getMore** nào đến cursor id, cursor đó sẽ bị xóa. Đây cũng là nguyên nhân chính dẫn đến lỗi Cursor not found.

# Một số nguyên nhân gây ra lỗi Cursor not found
### Cursor bị kill do vượt quá cursor timeout
như chúng ta đã biết nếu quá 10 phút mà không có query **getMore** đến cursor, nó sẽ bị kill.

Xử lý với init batch hiếm khi tốn đến 10 phút vì nó chỉ có 101 documents, có nghĩa là để gây ra lỗi Cursor not found mỗi vòng lặp phải mất đến gần 6 giây để xử lý. Thay vào đó nhiều khả năng nó sẽ xảy ra ở những batch tiếp theo, với limit 16MB một batch có thể có số lượng lên đến hàng chục nghìn hay thậm chí hàng trăm nghìn documents và nó sẽ có thể tốn đến hàng chụp phút để xử lý. 

Tuy nhiên trong nhiều trường hợp xử lý tốn hơn 10 phút nhưng Cursor not found không xảy ra bởi vì với những collection có số lượng document không quá lớn, 1 batch với 16MB là đủ để lấy toàn bộ dữ liệu về hay đồng nghĩa với việc chỉ cần duy nhất một lần **getMore** để lấy dữ liệu. Tuy nhiên nếu dữ liệu không ngừng tăng lên và đến một ngày 16MB là không đủ để lấy hết dữ liệu, ta cần phải **getMore** thêm một lần nữa, lỗi sẽ xảy ra.

### Toàn bộ cursor trong session bị kill do session timeout
Kể từ version 3.6 MongoDB cập nhật tính năng session, các bạn có thể tìm hiểu thêm [ở đây](https://docs.mongodb.com/manual/reference/method/Session/)

Mặc định nếu như session inactive (không có query nào đến DB) trong 30 phút thì toàn bộ được tạo trong session cũng sẽ bị kill. Điều này sẽ xảy ra ngay cả khi bạn set cursor no timeout.

### Bug của MongoDB khi getmore trong session
MongoDB phiên bàn 3.6 trở đi có một bug khiến cho cusor bị kill sớm hơn bình thường khi được thực hiện biên trong session:

https://jira.mongodb.org/browse/SERVER-36332

### Primary Replica gặp sự cố
Cursor id sẽ được lưu tại primary replica, vậy nên nếu như trong thời gian xử lý mà primary gặp sự cố và một secondary được vote lên thay thế thì cursor id hiện tại sẽ không được tìm thấy ở lần **getMore** tiếp theo dẫn đến lỗi Cursor not found.

# Một số cách khắc phục lỗi Cursor not found
### Upgrade MongoDB lên phiên bản 3.6.8
Nếu như bạn muốn sử dụng session trong mongoDB hãy chắc chắn rằng bạn đã update lên MongoDB ít nhất version 3.6.8 để tránh tình trạng gặp phải bug như trên dẫn đến gặp phải Cursor not found không mong muốn.

### Set batch size cho query
Thay vì để mặc định batch size là 16MB ta có thể set số lượng documents tối đa cho mỗi batch:
```
# ruby
Collection.batch_size(1000).each do |document|
    # xử lý ...
end
```

Batch size nhỏ hơn thì sẽ tốn ít thời gian để xử lý cho mỗi batch hơn hay nói cách khác chúng ta sẽ query **getMore** thường xuyên hơn lên DB. Việc này giúp reset timout counter của cả cursor timeout và session timeout, giúp chúng ta tránh khỏ tình trạng Cursor not found.

Tuy nhiên chúng ta cần chú ý set batch size hợp lý vì nếu quá lớn thì sẽ dễ dẫn đến việc cursor bị timeout còn nếu quá nhỏ thì sẽ ảnh hưởng nhiều đến peformance vì tốn nhiều request hơn để lấy về cùng một lượng dữ liệu.

### Set cursor no_timeout
Chúng ta có thể set no_timeout cho cursor để đảm bảo cusor không bao giờ bị kill do time out:
```
# ruby
Collection.no_timeout.each do |document|
    # xử lý ...
end
```

Việc này sẽ đảm bảo cursor sẽ không bị time out nếu xử lý quá 10 phút, tuy nhiên nếu xử lý quá 30 phút mà không có query lên DB thì cusor vẫn sẽ bị kill do session timeout.

Trong trường hợp xử lý gặp lỗi thì cursor sẽ không được kill tự động, chúng ta có thể khắc phục bằng cách rescue exception và kill cursor một cách thủ công.

### Sử dụng limit và skip để chia batch 
```
# ruby
per_batch = 1000
0.step(Collection.count, per_batch) do |offset|
    Collection.limit(per_batch).skip(offset).each do |document|
        # Xử lý ...
    end
end
```

Tương tự như việc set batch size, việc chia batch sẽ giúp chúng ta tránh khỏi bị cursor timeout cũng như session timeout, tuy nhiên MongoDB đã có sẵn option để set batch size rồi nên thay vì chia batch một cách thủ công hãy sử dụng batch_size.

### Load all data trước khi cursor bị kill
Việc này đi ngược lại lợi ích của cursor là giúp chúng ta giảm thiểu memory sử dụng khi xử lý một lượng lớn dữ liệu, tuy nhiên trong một vài trường hợp chúng ta vẫn có thể sử dụng:
```
# ruby
Collection.pluck(:id).each do |document_id|
    # xử lý với id ...
end
```

thay vì:
```
# ruby
Collection.only(:id).each do |document|
    # xử lý với document.id ...
end
```

### Create một truy vấn mới nếu như xảy ra lỗi
chúng ta có thể rescue exception, skip những document đã được xử lý và tiếp tục:
```
# ruby
begin
  count = 0
  Collection.each do |document|
       # xử lý ...
       count++
  end
rescue
   Collection.skip(count).each do |document|
       # xử lý ...
  end
end
```

Việc này sẽ giúp chúng ta trong trường hợp primary replica gặp sự cố.