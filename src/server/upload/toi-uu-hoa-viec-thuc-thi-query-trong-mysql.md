![](https://images.viblo.asia/7fb1530c-7fb0-4acc-82de-f3d5686d0fdd.jpeg)

Trong bài trước chúng ta đã tìm hiểu khái niệm và cơ chế vận hành của B-tree, một dạnh đánh chỉ mục để việc thực thi truy vấn dữ liệu được nhanh hơn, tuy nhiên đó là chưa đủ. Trong bài hôm nay chúng ta sẽ cùng tìm hiểu một vấn đề rất quan trọng đó là làm sao viết query cho đúng cho tối ưu và tăng tốc độ xử lý.
Có thể trong quá trình làm việc hiện nay chúng ta thường quen với framework, ví dụ Laravel. Việc tự viết một query gần như là ít phải làm vì đã có framework hộ trợ, tuy nhiên nếu dự án đủ lớn bạn sẽ thấy việc hiểu về những câu lệnh truy vấn trong mysql thực sự cần thiết. Và nếu xử lý không thực sự khôn khéo sẽ làm chết cả một hệ thống trong tương lai, vì khi dữ liệu database đủ lớn sẽ làm query của chúng ta có vấn đề và phải tối ưu lại ngay cả khi dùng laravel hay sql thuần.
Chúng ta cùng bắt đầu nhé.
## Tại sao query lại chậm?
Chúng ta cần biết rằng query là các tác vụ (task) và việc thực hiện các task này cần tiêu tốn thời gian. Việc chúng ta cần làm để tối ưu một query là làm cho nó đơn giản ít task đi tức là thời gian thực thi sẽ giảm, hoặc là làm cho chúng chạy nhanh lên.

Thực thi là một trong những giai đoạn quan trọng trong vòng đời của một query. Nó liên quan đến rất nhiều lần gọi để lấy dữ liệu từ storage engine, truy vấn theo các hàng hoặc đơn giản là các công việc sau truy vấn như gom nhóm hay sắp xếp. Đương nhiên những công việc này sẽ làm tiêu tốn tài nguyên mạng và CPU.
Trong một số trường hợp việc thực thi quá nhiều lần, quá lâu hay những truy vấn không cần thiết sẽ làm tiêu tốn thời gian, đây là mục tiêu chúng ta cần thực hiện là loại bỏ những truy vấn kiểu như vậy để làm thời gian response nhanh hơn.
Trong bài này chúng ta cần tìm hiểu và trả lời một số câu hỏi dưới đây.
## Bạn đã thực sự lấy những dữ liệu mình cần chưa?
Dưới đây là một số trường hợp về việc query bừa bãi
### Fetch nhiều row dữ liệu hơn cần thiết
Đây là một sai lầm thường xuyên xảy ra trong hầu hết các ứng dụng và hầu hết các kiểu cơ sở dữ liệu, đó là lấy ra N records bằng câu lệnh `select` nhưng sau đó chỉ dùng một số lượng nhất định trong số ấy. Ví dụ rất điển hình là lấy các bài viết thỏa mãn điều kiện nào đó nhưng lại chỉ dùng top 10 bài đầu tiên.
### Fetch quá nhiều column từ câu lệnh join giữa các bảng.
Một ví dụ cụ thể, nếu bạn muốn lấy tất cả thông tin những diễn viên trong bộ phim `Mắt Biếc`, đừng làm thế này nhé:
```
mysql> SELECT * FROM actors
-> INNER JOIN film_actors USING(actor_id)
-> INNER JOIN films USING(film_id)
-> WHERE films.title = 'Mat Biec';
```

Rõ ràng chúng ta chỉ cần lấy thông tin actor nhưng query trên sẽ trả về tất cả actor, file_actor, đến films. Rõ ràng là quá dư thừa. Hãy làm theo cách dưới đây
```
mysql> SELECT actors.* FROM actors...;
```

### Fetch tất cả column
Khá giống trường hợp trên, trường hợp này là điển hình hơn vì thường chúng ta làm gì cũng `select *` thay vì chỉ định rõ trường cần lấy.
### Fetch dữ liệu trùng nhau nhiều lần
Nếu chúng ta không cẩn thận, việc get những dữ liệu giống nhau một cách nhiều lần sẽ làm giảm hiệu năng của ứng dụng. Ví dụ thường thấy là việc loop qua một mảng dữ liệu sau đó fetch cùng một dữ liệu khác để hiển thị lên web.
## Mysql có đang kiểm tra quá nhiều dữ liệu hay không?
Sau khi đã đảm bảo bạn chỉ lấy những dữ liệu cần thiết, tiếp theo bạn cần tìm kiếm xem query của bạn có đang phải kiểm tra quá nhiều dữ liệu hay không. Có 3 yếu tố để đánh giá
1.  Thời gian phản hồi
2.  Số row đã kiểm tra
3.  Số row trả về

### Thời gian phản hồi
Thời gian phản hồi (Response time) là một yếu tố quan trọng để đánh giá mức độ hiệu năng của ứng dụng mysql. Tuy nhiên yếu tố này không phải lúc nào cũng rõ ràng. Thời gian phản hồi này bao gồm 2 thành phần : Thời gian xử lý và thời gian chờ
`Thời gian xử lý` là thời gian thực sự mà server xử lý truy vấn để lấy dữ liệu
`Thời gian chờ` Là một phần của thời gian xử lý nhưng nó không xử lý ngay mà còn chờ một điều gì đó, như một thao tác I/O hoàn thành, hay một row lock.
### Row đã kiểm tra và row trả về
Việc hiểu được dữ liệu đã tìm kiếm và dữ liệu trả về rất hữu ích giúp chúng ta biết dữ liệu mà ta cần được tìm kiếm như thế nào, tuy nhiên đây không phải là dữ liệu hoàn hỏa để biết đâu là một truy vấn xấu, vì những row ngắn hơn sẽ cho kết quả khác, hoặc tìm kiếm các row trong bộ nhớ sẽ nhanh hơn nhiều từ ổ đĩa.

Thông thường chúng ta luôn mong muốn số lượng row kiểm tra sẽ bằng với số lượng kết quả trả về, tuy nhiên không phải lúc nào cũng vậy, khi dữ liệu cần lấy join từ nhiều bảng máy chủ phải truy cập từng hàng trong từng bảng để tạo ra một hàng kết quả. Tỷ lệ hàng được kiểm tra so với hàng được trả về thường từ 1: 1 đến 1: 10 và còn có thể lớn hơn.

## Cách để tối ưu lại query
Khi bạn cần tối ưu lại query có vấn đề, tức là bạn cần tìm một cách khác để lấy kết quả mà bạn mong muốn nhưng không nhất thiết phải trả về cùng một tập dữ liệu mà bạn có thể chuyển đổi dữ liệu sang một kiểu tương đương sao cho tối ưu hơn, tuy nhiên chúng ta phải chắc chắn rằng việc thay đổi query sẽ đem lại hiệu quả cao hơn, Việc tập dữ liệu thay đổi sẽ kéo theo việc phải sửa lại web, tuy nhiên đây là thứ đang để đánh đối vì nếu không sửa query, web của bạn sẽ chậm hoặc thậm chí là `die`. Chúng ta cùng xem một vài cách để làm điều này.
### Một query phức tạp so với nhiều query thì sao nhỉ?
Tôi thường có sở thích gộp nhiểu query vào thành 1 cục query to vì nghĩ rằng điều đó sẽ tăng hiệu suất của ứng dụng nhưng thực tế liệu có như thế không.
Điều này không hẳn, vì Mysql được thiết kế có khả năng kết nối và ngắt kết nối rất tốt đáp ứng được việc xử lý những truy vấn nhỏ và rất nhanh. Mysql có thể xử lý hơn 100k truy vấn mỗi giây cho nên việc tách 1 query to ra thành nhiều query nhỏ cũng không hẳn là vấn đề. Tuy nhiên không phải vì thế mà chúng ta cứ cho phép ứng dụng chạy nhiều query chỉ để làm một công việc mà đáng ra chúng ta có thể làm nó bằng 1 query không quá phức tạp. Việc tách query lớn ra nhiều query chỉ phù hợp khi query được xem là quá phức tạp trong phạm vi hiểu biết của developer và tốc độ xử lý của server không quá mạnh.
### Có thể tách Join ra nhiều query
ong một ứng dụng để lấy dữ liệu từ nhiều bảng chúng ta thường join các bảng lại với nhau 
```
mysql> SELECT * FROM tag
-> JOIN tag_post ON tag_post.tag_id=tag.id
-> JOIN post ON tag_post.post_id=post.id
-> WHERE tag.tag='mysql';
```
Chúng ta có thể viết cụ thể hơn như thế này 
```
mysql> SELECT * FROM tag WHERE tag='mysql';
mysql> SELECT * FROM tag_post WHERE tag_id=1234;
mysql> SELECT * FROM post WHERE post.id in (123,456,567,9098,8904);
```
Tuy nhiên đây chỉ là trong điêu kiện cụ thể cho việc biết trước các tham số cần truyền vào, còn cách trên có thể coi là tổng quát hóa và thường được lựa chọn nhiều hơn.
## Kết luận
Trên đây là một vài kiến thức về việc tối ưu hóa query ở mức độ basic, chưa thật sự sâu rộng, tuy nhiên có thể giúp các bạn hiểu hơn về việc thiết kế database và query sao cho phù hợp và tăng hiệu năng của ứng dụng. Kiến thức trọng bài viết còn khá trừu tượng do tác giả cũng đang trong quá trình tự tìm hiểu mong các bạn có thể hiểu được. Thanks.