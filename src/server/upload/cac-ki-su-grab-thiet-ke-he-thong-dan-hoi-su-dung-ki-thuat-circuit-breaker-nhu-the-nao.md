1 hệ thống cũng giống như thời tiết xấu vậy. Nó không thể đoán trước và cũng không thể tránh khỏi. Và điều quan trọng nhất đối với 1 software engineer là lập kế hoạch và giải quyết các vấn đề lỗi đó.

Trong bài viết này, mình sẽ giới thiệu cho các bạn 1 kĩ thuật có độ tin tưởng khá cao, hạn chế gây ra lỗi hệ thống mà các kĩ sư Grab đang dùng. Đó là Circuit Breaker (Dịch sang tiếng việt nghĩa là bộ ngắt mạch, mình thì hay gọi nó là cái cầu giao).

Hiện tại, Grab đang sử dụng cơ chế Circuit Breaker trong toàn bộ hệ thống của họ. Để đảm bảo rằng khi có sự cố xảy ra đi chăng nữa thì service vẫn không bị chết, và vẫn tiếp tục phục vụ request của người dùng.

Đây có lẽ là điều mà nhiều engineer đang muốn biết phải không nào?

Vậy hãy cùng đi xem cơ chế Circuit Breaker là gì? Và nó được áp dụng trong hệ thống của Grab như thế nào nhé.

## Nguyên nhân gây ra lỗi hệ thống
Trước tiên chúng ta hãy thử xem xét đâu là nguyên nhân thường xuyên gây ra lỗi nhé.

Do service hay phải truyền thông với các tài nguyên bên ngoài, nên về cơ bản, thì lỗi có thể là do:

* Vấn đề về mạng
* Quá tải hệ thống
* Cạn kiệt tài nguyên (ví dụ như out of memory …)
* Cấu hình, deploy lỗi
* Bad request (ví dụ như missing request data …)

Vậy khi có lỗi xảy ra, làm thế nào để tiếp tục xử lý được request thì chúng ta xem tiếp phần tiếp theo nhé.

## Circuit Breaker là gì?
Điện nhà bạn đã bao giờ tự nhiên đang dùng thì bị ngắt cầu giao chưa? Ví dụ như vừa bật nồi lẩu, vừa cắm nồi cơm, vừa bật máy giặt thì quá tải, cầu giao bị ngắt. Và cả nhà tối om như mực.

Thế nhưng điều đó ít nhiều vẫn còn an toàn hơn việc nhà không có cầu giao. Nếu không có cầu giao thì điều gì sẽ xảy ra?

Dùng quá tải, không có bộ phận ngắt điện kịp thời sẽ đẫn đến cháy nổ ở bộ phận nào đó trong nhà, gây chập điện… Khá là nguy hiểm.

Cơ chế Circuit Breaker mà Grab áp dụng trong hệ thống cũng hoạt động theo cách tương tự.

Circuit Breaker sẽ nằm giữa 2 đoạn code, và theo dõi luồng dữ liệu chảy qua nó. Tuy nhiên thay vì ngắt điện khi có sự cố, thì nó sẽ block request lại.

Để dễ hiểu hơn, các bạn có thể xem hình bên dưới:

![](https://images.viblo.asia/b27c747c-e57f-4f63-857c-0a2e72d79e7b.png)

Đầu tiên, “Main” (để dễ hiểu có thể coi nó như người dùng) sẽ call đến Circuit Breaker (cái này cũng nằm trong code của service). Sau đó từ Circuit Breaker sẽ gửi 1 request đến Upstream Service (Có thể hiểu nó như là 1 api server).

Khi đó Upstream Service sẽ xử lí request và trả về response đến Circuit Breaker. Nếu response đó không có lỗi gì thì sẽ được trả lại ngay “Main”.

Điều gì xảy ra nếu như Upstream Service bị lỗi?
![](https://images.viblo.asia/44023a5f-ac9d-4ea2-a968-ec4751ec3ec4.png)

Nếu có lỗi xảy ra phía Upstream Service thì nó sẽ trả về lỗi cho Circuit Breaker, và Circuit Breaker sẽ trả lại lỗi cho Main.

Nhìn vào đây chắc hẳn các bạn cũng đang nghĩ: cho thằng Circuit Breaker vào giữa này chưa thấy có ưu điểm gì?

Vậy để mình giải thích nhé.

Giả sử như có 1000 request gửi đến Circuit Breaker và nó đang nhận được cả 1000 response lỗi từ Upstream Service.

Circuit Breaker sẽ ở giữa monitor những request đó và tracking xem có bao nhiêu request thành công và bao nhiêu request thất bại.

Nếu như số lượng request thất bại vượt qúa số lượng cho phép, khi đó nó sẽ phán đoán Upstream Service đang có vấn đề. Và nó sẽ ngắt mạch lại. Không cho request chảy sang bên Upstream Service nữa.

Ở trong trạng thái đó mà có gửi request sang đi chăng nữa thì response bạn nhận được cũng bị timeout hoặc lại càng làm cho Upstream Service “gánh tạ” nhiều hơn mà thôi.

Và flow bây giờ sẽ thành thế này:
![](https://images.viblo.asia/df572710-a41b-47b1-8ff4-32ef9615f385.png)

Đến đây chắc các bạn cũng hình dung được phần nào ý nghĩa của thằng Circuit Breaker đúng không ak?

Nhưng mà cũng có người đang thắc mắc, nếu cứ trả về lỗi như thế thì nó không có ý nghĩa gì cho người dùng lắm.

Ví dụ như mình muốn tìm kiếm xem từ điểm A đến điểm B sẽ đi mất bao lâu. Nhưng mà server của Grab lại toàn trả về lỗi. Khi đó bạn có suy nghĩ gì về trải nghiệm người dùng? Chắc chắn là không tốt rồi.

Chúng ta cùng đi xem tiếp xem Grab đã xử lý trường hợp này như thế nào nhé?

## Fallback processing (xử lý dự phòng)
Để giải quyết bài toán này, Circuit Breaker đã định nghĩa ra 1 tính năng gọi là Fallback processing. Chúng ta cùng đi xem flow bên dưới xem nó hoạt động thế nào nhé.

![](https://images.viblo.asia/1fdba489-927d-4fef-97d3-9194fb12ce1b.png)

Giả sử như các bạn đang xây dựng 1 chương trình tính khoảng cách giữa 2 điểm. Chúng ta gọi service đó là “distance calculator service”.

Nếu như service hoạt động bình thường, khi đó nó sẽ trả về cho chúng ta khoảng cách giữa 2 điểm.

Tuy nhiên, nếu “distance calculator service” đang quá tải, không thể xử lý thêm request.

Khi đó, Circuit Breaker sẽ thực hiện fallback processing request của người dùng và thực hiện tính toán thay cho “distance calculator service” bằng việc sử dụng hàm lượng giác tính toán đơn giản.

Đương nhiên là tính toán khoảng cách sử dụng cách này sẽ không cho kết quả chính xác. Nhưng bằng cách này đã giúp Grab xử lý yêu cẩu của khách hàng tốt hơn rất nhiều so với việc không trả về kết quả gì.

Trong hình thức fallback processing, thì ví dụ mình đưa ra bên trên chỉ là 1 cách thôi. Ngoài ra còn 1 số cách khác nữa. Ví dụ như:

* Retries request đến 1 con upstream service khác
* Lưu request đó vào queue và sẽ xử lý lại vào thời gian khác.

Tuy nhiên, có 1 số trường hợp thì sử dụng fallback processing vẫn không hợp lý. Nhưng ít nhiều trong những hoàn cảnh như này, thì việc sử dụng 1 Circuit Breaker vẫn là có lợi.

## Circuit Breaker có nên tracking mọi error?
Câu trả lời ngắn gọn là không.

Grab chỉ tracking những lỗi không phải do người dùng, mà do phía infrastructure hoặc network (Ví dụ với HTTP error code là 503 hoặc 500).

(Lỗi người dùng là lỗi thế nào? Chủ yếu là lỗi có HTTP error code là 400 hoặc 401.)

Lí do mà Grab không tracking lỗi do người dùng là do nếu như có phần tử hacker nào đó. Họ cố tình gửi thật nhiều request lỗi (ví dụ request thiếu parameter) đến Circuit Breaker. Khi đó Circuit Breaker sẽ tự động ngắt mạch kết nối đến Upstream Service, và dẫn đến service bị down và không xử lý request của người khác được nữa.

## Phục hồi Circuit Breaker như thế nào?
Sau khi Circuit Breaker đã ngắt mạch kết nối để không gửi request đến Upstream Service nữa. Vậy khi nào Circuit Breaker sẽ thực hiện đóng mạch lại và tiếp tục gửi request đến Upstream Service?

Câu trả lời rất đơn giản. Nó sẽ đợi sau 1 thời gian nào đó (ví dụ như 1 phút), Grab gọi nó là Sleep Window.

Rồi sẽ test lại mạch bằng cách gửi 1 vài request nào đó đến Upstream Service. Nếu như nhận được response OK, khi đó nó sẽ tiến hành đóng mạch và cho hệ thống hoạt động như bình thường.

Nếu như vẫn bị lỗi, thì nó lại tiếp tục lặp lại quá trình trên cho đến khi ok thì thôi.

# Bulwark (tường thành)
Grab đang sử dụng 1 thư viện có tên là  [Hystrix-Go](https://godoc.org/github.com/afex/hystrix-go/hystrix) để implement thằng Circuit Breaker. Và trong thư viện này có bao gồm 1 chức năng khá quan trọng đó là Bulwark (bức tường thành).

Bulwark có nhiệm vụ sẽ monitor toàn bộ các request đến đồng thời được gửi đến Circuit Breaker và nó sẽ block nếu như số lượng request đồng thời vượt quá số lượng cho phép.

Hình thức này người ta hay gọi là rate-limiting.

Tại sao nó quan trọng? Như mình đã nói ở trên, 1 trong những lý do khiến service của bạn bị down đó là do nhận quá nhiều request cùng 1 lúc.

Chẳng hạn như service của bạn chỉ xử lý được 1000 request đồng thời. Nếu như có hacker nào đó thực hiện DDos service của bạn bằng cách gửi 1 triệu request cùng 1 lúc đến server của bạn. Mình khẳng định service của bạn sẽ bị down và ko thể làm việc tiếp được.

Đó là lí do tại sao mà Bulwark đã được tích hợp vào [Hystrix-Go](https://godoc.org/github.com/afex/hystrix-go/hystrix).

## Implement Circuit Breaker
Hiện tại Grab đang sử dụng  Hystrix-Go để implement thằng Circuit Breaker. Và thằng [Hystrix-Go](https://godoc.org/github.com/afex/hystrix-go/hystrix) này có 1 vài setting chính mà mọi người nên để ý:

1. Timeout

Là khoảng thời gian tối đa thực hiện request.

2. Max Concurrent Requests (số request đồng thời lớn nhất)

Đây chính là phần Bulwark mà mình đã đề cập ở bên trên.

Giá trị mặc định của nó là 10. Nhưng chú ý là hằng số này không phải biểu thị “per second” đâu nhé. Vì có thể số request đồng thời nó gửi quá nhanh, chỉ tính bằng mili second chẳng hạn.

Nếu giá trị này quá lớn sẽ khiến service của bạn ko đủ tài nguyên để xử lý.

3. Sleep Window

Đây là khoảng thời gian mà Circuit Breaker sẽ đợi trước khi nó gửi request đến Upstream Service để check xem đã hoạt động bình thường hay chưa.

Nếu cái này đặt quá thấp sẽ không có hiệu quả vì Circuit Breaker sẽ phải open/check thường xuyên. Còn nếu nó đặt quá cao thì sẽ hạn chế thời gian phục hồi.

4. Error Percent Threshold

Đây là giá trị biểu thị tỉ lệ phần trăm số request thất bại trước khi bị ngắt mạch.

Và còn rất nhiều các setting nữa, các bạn tự tìm hiểu ở trên trang chủ Hystricx-Go nhé.

## Kết luận
Đến đây chắc các bạn cũng biết được cách xây dựng 1 Circuit Breaker là như nào, và nó có tác dụng gì cho hệ thống.

Xây dựng xong hệ thống là 1 chuyện, nhưng để hệ thống “không chết” là 1 chuyện hoàn toàn khác.

Hi vọng qua bài này sẽ cung cấp cho các bạn chút solution trong việc thiết kế hệ thống có tính availability cao.

==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

👉👉👉 [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)

Chúc các bạn 1 tuần thật vui vẻ.