Chả xa lạ gì ghi nói đến RESTful API nữa nhưng với newbie khi tiếp cận thì học cũng không biết cách viết API như thế nào để thuận tiện cho việc xử lý, đó chính là câu hỏi mà mình tự đặt ra cho mình trong quá trình xây dựng API cho mini app của mình. Giai đoạn đầu mình chưa biết cách viết thế nào cho chuẩn với tiện nên cách đơn giản nhất là mình load tất nhưng gì của record ra và đặt những method riêng ra sau khi code xong nhìn lại! ***wtf? những cái kia để làm gì!*** và mình bắt đầu thấy việc trả về toàn bộ các thuộc tính của record là một điều ngớ ngẩn! nó quá thừa dữ liệu và gây nặng nề cho quá trình server phải gửi data về. Bài viết này mình muốn đề cập tới những chú ý trong quá trình tìm hiểu về cách thiết kế RESTful API.

**1.Sử dụng danh từ, tránh sử dụng động từ**

cái này thì đơn giản vì nếu vạn dùng route cho request đúng với route chuẩn RESTful rồi thì không phải nghĩ tới nó nữa! cần tránh là khi bạn xây dựng những route riêng thì cần tránh việc đặt những động từ vào trong nó như thế này nè:
```
/getAllUsers
/removeUser
/updateUser
```
hãy sử dụng đúng chuẩn là có thế thiết kế 1 api ngon rồi bạn nhé!
đơn giản như này là đủ:


| | GET | POST | PUT | DELETE |
| - | -------- | -------- | -------- | -------- |
| /users | trả về tất cả người dùng | tạo mới người dùng | Cập nhật người dùng hàng loạt | Xóa tất cả người dùng |
| /users/1 | trả về 1 người dùng cụ thể |(phương thức này không được phép -> 405) | Cập nhật thông tinngười dùng cụ thể | Xóa 1 người dùng cụ thể|

**2.Sử dụng danh từ số nhiều**

tương tự như trên, nếu dùng route chuẩn RESTful rồi thì ngon, còn nếu muốn custom lại thì dùng danh từ số nhiều theo chuẩn.
ví dụ:

```
/user -> /users
/order -> /orders
```
**3.Nếu có các quan hệ giữa các resource thì nên gọi resource đó theo parent resource**

các này sẽ có route như sau:
```
GET /orders/1/products
```
một đơn hàng thì có nhiều sản phẩm, muốn lấy tất cả các sản phẩm thuộc đơn hàng đó thì dùng như trên, đơn giản là bạn sẽ không cần thêm 1 params[:order_id] bên trong danh sách params nữa :wink:.

**4.Sử dụng HTTP-header để chuẩn hóa lại định dạng request và reponse**

Cả server và client cần phải được quy định rõ ràng về định dạng gửi và nhận. định dạng đó phải được gắn kèm theo HTTP-header.

Content-Type: xác định định dạng dữ liệu gửi đi (request).

Accept: danh sách những định dạng được chấp nhận khi có dữ liệu trả về (respone).

**5.version cho api của bạn**

bạn nên tạo cho API của bạn có version xác định chứ đừng nên sử dụng chung làm một. Dùng số nguyên chứ không nên dùng dạng 1.1, 4.0, ...

mình hay sử dụng định dạng kiểu như sau
```
/api/v1
```

**6.Xử lý lỗi nhớ dùng HTTP status code**

đừng bao giờ trả về lỗi dưới dạng
```
{
mesage: "user not found!"
},
status: 200
```
hay dùng HTTP status code:

```
{
mesage: "user not found!"
},
status: 404
```
**7.thêm phân trang**

khi load nhiều bản ghi thì cần thêm phân trang để tiện cho người dùng api đó hơn, bạn cứ thử hỏi dưới frontend làm phân trang cho page user của một app có 10k users, chả nhẽ họ lại cứ lấy 10k users đó rồi xử lý mảng à! quá dư giả nhỉ, nên hãy thêm phân trang cho những request như thế nhé.

sử dụng limit và offset, nhớ gắn thêm liên kết tới next page và previous page nhé!

**8.giới hạn field trả về**

Khi mình thiết kế api đã gặp trường hợp khi load các sản phẩm liên quan tới đơn hàng mình thấy có một số thuộc tính không cần thiết như creator, hay created_at. những field sẽ gây thừa dữ liệu và làm rối docs api, câu nói mà mình hay dùng cho trường hợp này là "vừa đủ xài" - chỉ cần những field thiết yếu nhất.

Trên đây là những chú ý nhỏ mình tìm hiểu và tham khảo được trong quá trình xây dựng api. bạn có thể tham khảo thêm ở [đây](https://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/)