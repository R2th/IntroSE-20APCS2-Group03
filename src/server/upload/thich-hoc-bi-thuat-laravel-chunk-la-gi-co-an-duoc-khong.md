# Facade DB
Trong Laravel, khi muốn lấy dữ liệu hoặc xây dựng query thì chúng ta có thể sử dụng facade DB. Khi đi kèm với `table` thì facade này sẽ trả về instance của query builder thuộc về bảng mà chúng ta gọi đến. Ví dụ như `DB::table('posts')` thì sẽ tạo ra một instance của query builder thuộc về bảng `posts`. Với việc trả về instance của query builder như vậy, thì dev có thể thêm nhiều câu query nữa vào trong cái instance đó như là lọc bởi lượt người xem lớn hơn hoặc bằng năm, sắp xếp theo cột title theo thứ tự Z-A, .... Và cuối cùng, chúng ta sẽ có được kết quả khi gọi đến hàm `get`, hàm này sẽ trả về instance là kiểu Collection và dev có thể viết function hoặc dùng những hàm có sẵn trong Collection để làm những việc mình mong muốn như map data, duyệt từng record. 

# Vấn đề
Với facade DB thì mọi chuyện sẽ khá là dễ dàng và vui vẻ. Như vậy, nếu muốn lấy tất cả dữ liệu của bảng `posts` thì chúng ta sẽ gọi facade DB như sau `DB::table('posts')->get()`. Nice, chỉ với một dòng đơn giản như vậy, mà chúng ta đã có thể lấy hết tất cả dữ liệu của bảng post, sau đó làm gì tùy thích. Chúng ta có thể duyệt từng record, map, filter, tính sum, count, vân vân và mây mây. Tuy nhiên, khi gọi như vậy, dữ liệu sẽ được load vào memory một lúc. Thử tưởng tượng, nếu dữ liệu không phải là vài chục, vài trăm, vài ngàn mà là vài chục ngàn, vài trăm ngàn hay có thể lên đến 1 triệu thì sao? Thì chúng ta sẽ tốn khá là nhiều memory để load và nếu memory không đủ thì ngủm củ tỏi. Vậy có cách nào để cải thiện không?
# Chunk
Giải pháp cũng khá đơn giản, nếu như mà dữ liệu nhiều quá, load một lần như vậy hao tốn memory quá thì chúng ta sẽ load từ từ, từ từ mà tốn chứ không tốn một lần quá nhiều. Laravel cung cấp cho một giải pháp với tên gọi là Chunk. Ý tưởng khá đơn giản, có một trăm ngàn dữ liệu, thay vì load hết vô memory thì chia nhỏ ra. Có thể chia nhỏ ra thành 100 records mỗi lần, như vậy cứ load 100 records, xong giải phóng dữ liệu rồi sau đó tiếp tục load 100 records tiếp theo. Như vậy, memory chúng ta cần sử dụng sẽ ít hơn khá là nhiều. Thay vì cần dùng 8GB RAM thì với chunk đôi khi chúng ta chỉ cần dùng đến tầm 4GB hoặc 5GB RAM là đẹp.

Cách dùng chunk cũng khá đơn giản, viết câu query builder, gọi hàm chunk, pass số lượng record muốn chunk và closure để thực hiện công việc cần thiết vào. Lấy ví dụ mình muốn lấy tất cả post, chunk 100 records mỗi lần và in ra title của post đó thì mình sẽ làm như thế này: 
```
DB::table('posts')->chunk(100, function ($posts) {
    foreach($post as $post) {
        echo $post->title;
    }
}
```
Ngoài ra, chúng ta cũng có thể dừng chunk lại nếu có gì đó sai sai. Giả sử đến record thứ 1000 mình dừng chunk thì mình chỉ cần return false.
```
DB::table('posts')->chunk(100, function ($posts) {
    if ($post->id >= 1000) {
        return false;
    }
}
```
Nếu mình cần update dữ liệu trong database thì cân nhắc dùng chunkById sẽ an toàn hơn vì phương thức này sẽ dựa vào primary key của record để mà chunk
# Bonus thêm streaming lazy
Ngoài chunk ra, thì còn có streaming lazy, nó cũng hoạt động na ná. Với phương thức này thì nó sẽ thực thi những câu query ở trong những chunks. Chỉ cần thêm phương thức lazy vào là được và khi thêm lazy thì sẽ trả về kiểu `LazyCollection` do đó bạn có thể dùng những phương thức của `LazyCollection` để thao tác với dữ liệu như `each`, `map`, .... Cũng như chunk, nếu cần update dữ liệu trong DB thì nên cân nhắc dùng `lazyById` hoặc `lazyByIdDesc`, laravel sẽ tách kết quả dựa trên primary key của record đó.