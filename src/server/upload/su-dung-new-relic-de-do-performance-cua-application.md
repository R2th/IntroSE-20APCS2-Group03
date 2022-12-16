Nguồn bài viết :  [アプリ固有のパフォーマンス計測をしよう](https://qiita.com/kumatronik/items/0fef174d896fcfc7236c)



Trong các bài viết trước đây tôi đã giới thiệu cách phân tích performance không cần sử dụng đến code mà chỉ sử dụng dữ liệu thu thập được từ New Relic Agent.


Lần này bằng việc thêm các measurement point vào code, tôi sẽ giới thiệu cách phân tích và điều tra performance 1 cách hiệu quả hơn, cụ thể thì đó là thuộc tính custom và đo lường custom.
Dù tên của chúng có vẻ giống nhau nhưng chức năng lại hoàn toàn khác.


Thuộc tính custom là chức năng gửi đến New Relic những dữ liệu(key/giá trị) ngoài những dữ liệu default được thu thập bởi New Relic.


Ví dụ như nếu là EC store của multi tenant thì bằng việc thêm store ID vào thuộc tính custom ta có thể so sánh được throughput và response theo từng store.

Đo lường custom sẽ thêm measurement point vào trace detail, ví dụ như thêm vào method có ở trace detail thì ta sẽ có thể đo lường được trên đơn vị method (sẽ có ví dụ cụ thể phía dưới)

# Thuộc tính custom

Để thêm các giá trị tùy chọn vào dữ liệu có sẵn của New Relic thì không thể dùng APM mà cần sử dụng New Relic Insights.

Bằng việc thêm thuộc tính custom, như ví dụ phía trên ta có thể có được list transaction của những user đặc biệt, so sánh được performance theo từng store, xác định được những điều kiện tìm kiếm chậm... là những phân tích từ nhiều góc độ mà ta không thể làm được nếu chỉ sử dụng dữ liệu data default. 
## Cách thêm

Để thêm thuộc tính custom ta sử dụng API của New Relic cho application, dưới đây tôi sẽ giới thiệu ví dụ về API của Ruby. Những API của ngôn ngữ khác có thể xem được ở trang document của New Relic.

`::NewRelic::Agent.add_custom_attributes({ store_name: current_store.name })`

## Phân tích performance sử dụng New Relic Insights 
Như đã có lần tôi giới thiệu về NRQL trong các bài viết trước, NRQL có thể coi tương tự như SQL.

Trường hợp thêm thuộc tính custom là store_name như ví dụ phía trên thì ta sẽ có thể viết được NRQL như dưới đây
1. Thời gian xử lí trung bình của từng store:

`select average(duration) from Transaction facet store_name`

![](https://images.viblo.asia/08b1b589-7419-4666-bcd5-57b68807c1bc.png)


2. Tỉ lệ transaction theo từng store

`select count(*) from Transaction facet store_name`

![](https://images.viblo.asia/8dc578d3-c4dd-43ba-a9ea-fecd4d2fad1b.png)

3. Thông tin performance theo từng store đặc biệt


`select max(duration), max(databaseDuration), average(duration), average(databaseDuration) from Transaction where store_name = 'ストア名'`


![](https://images.viblo.asia/f639fb8c-62ec-41b6-88e8-2616bff4b78f.png)

**Bảng thời gian xử lí trung bình theo từng store
![](https://images.viblo.asia/cbd0c16f-5cc6-4f09-9f82-b38e81629757.png)

Như ta có thể thấy chỉ cần thêm 1 thuộc tính custom như trên là có thể lấy được rất nhiều thông tin hữu ích cho việc phân tích.


## Sử dụng cho NRQL alert 

NRQL là chức năng dùng NRQL để tạo ra các điều kiện cho alert. Cụ thể là nếu như cho kết quả của NRQL là 1 giá trị thì giống như các alert khác, nếu chỉ số setting vượt quá kết quả của NRQL thì sẽ có alert.

Ở đây cần chú ý khi tạo NRQL là nó phải trả về số trị đơn lẻ chứ không thể dùng những NRQL trả về nhiều số trị hay bảng biểu thời gian như phía trên được.

Ví dụ như dưới đây.

NRQL trả về response time trung bình của store A
`select average(duration) from Transaction where store_name = 'ストアA' `

Giống như các alert khác, NRQL alert có thể setting được ở New Relic Alerts .

## Nơi có thể check được thuộc tính custom trong APM 
Đó là 2 nơi dưới đây

1. Cột thuộc tính transaction trong trace detail

Thứ nhất là cột thông tin request của trace detail, ta có thể xem được nội dung của request (user agent...). Những thông tin thêm vào như là thuộc tính custom có thể xem ở đây
![](https://images.viblo.asia/3d6f35e5-5a37-4ac9-a630-f139ba7a7a6f.png)

2. Error profile

Error profile là 1 chức năng phân tích error, sử dụng khác biệt giữa những transaction phát sinh ngoại lệ và transaction thông thường để hỗ trợ điều tra nguyên nhân sâu xa của error.
![](https://images.viblo.asia/99ae6dc6-831b-456b-9912-a838a7264800.png)

Nếu thêm thuộc tính custom thì thuộc tính đó cũng sẽ trở thành đối tượng để so sánh khác biệt, do đó nếu thêm store ID là thuộc tính custom thì có thể ta sẽ có được thông tin về xu hướng dễ phát sinh ngoại lệ của các store đặc biệt.

# Đo lường custom(Custom instrumentation)

Nếu nhìn vào trace detail thì khá khó để biết được xử lí DB này cụ thể đang gọi method nào, đặc biệt là trường hợp xử lí sâu, gọi method nhiều lần. 
Trong trường hợp này bằng cách sử dụng đo lường custom ta có thể thêm các point đo lường vào trace detail từ đó sẽ giải quyết được vấn đề khó hiểu trên.

Cụ thể các bạn hay xem ảnh dưới đây, là so sánh trước và sau khi thêm đo lường custom, ta có thể thấy sau khi thêm thì dễ dàng nhìn thấy được performance của custom

![](https://images.viblo.asia/04349ab8-4358-4f47-b2b9-791ee31c8e4e.png)

Tiếp theo là trace detail

![](https://images.viblo.asia/28724954-d794-4d0e-a866-caa81b4eec86.png)


Trước khi thêm đo lường custom thì xử lí DB sau khi gọi từ controller rất nhiều, nên khó hiểu không biết xử lí nào gọi method nào. Nhưng khi định nghĩa 3 method là đo lường custom thì có thể thấy được cấu trúc nest của từng method đó.

 Theo đó, đo lường custom đã làm cho việc debug dễ dàng hơn bằng cách phân tầng các xử lí gọi method của hệ thống.
 
 ## Cách thêm đo lường custom
  Như ví dụ phía trên ta chỉ cần thêm  method : next、update_totals、update!  của model Spree::Order là được.

```
Spree::Order.class_eval do 
  add_method_tracer :next
  add_method_tracer :update_totals
  add_method_tracer :update!
end
```

Có 1 điểm cần chú ý là nếu càng thêm nhiều đo lường custom thì càng dễ hiểu nhưng cũng sẽ làm tăng tải cho hệ thống.