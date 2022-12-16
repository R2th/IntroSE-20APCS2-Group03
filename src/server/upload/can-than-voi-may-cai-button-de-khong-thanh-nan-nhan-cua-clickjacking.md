Nút bấm là  một nhân tố hết sức phổ biến và quen thuộc trong cuộc sống của chúng ta. Có thể là nút bật tắt quạt, nút trên 1 cái điều khiển cho đến nút kích hoạt tên lửa hạt nhân trong vali của tổng thống Mỹ. Có thể nói, rất nhiều công việc của chúng ta được rút gọn, dễ dàng hơn nhờ các nút bấm đó. Trong các website cũng có các nút bấm như vậy. Có thể là nút like trên facebook, nút download ở 1 trang download hay rất nhiều kiểu nút bấm khác. Tuy nhiên, trong không gian mạng, nhìn đâu cũng thấy hacker nên là cứ coi chừng mấy cái nút nhé, có thể đó là cú lừa to đùng cho bạn đó. 
<p align="center">
  <img width="460" height="300" src="https://images.viblo.asia/a05755fe-021d-47c9-9c70-200862042423.png">
</p>


## I. Clickjacking và iframe
Trước hết, nói qua một chút về thẻ ```<iframe>``` trong html. Đây là một thẻ khá thông dụng, cho phép nhúng một trang web vào một trang khác. Có thể nói, đây là kẻ tiếp tay chính, tạo điều kiện cho hacker tạo ra cú lừa đội lốt nút bấm mà mình đang nói tới.Cú lừa đó được gọi là <b>ClickJacking (UI Redressing)</b>.
<br><br>
Vậy Clickjacking thực chất là gì? Clickjacking là một kĩ thuật tấn công dựa trên giao diện người dùng để đánh lừa nạn nhân bấm vào một nút bấm, qua đó thực hiện một hành vi mà nạn nhân không muốn thực hiện. Kĩ thuật này thường sử dụng thẻ ```<iframe>``` để nhúng một trang web (gọi tạm là web A nhé) có 1 chức năng được thực hiện qua 1 nút bấm (như like, delete, follow, download...) vào trang của hacker. Sau đó hắn sẽ điều chỉnh độ tỏ của trang nhúng về gần 0 để người dùng không thấy và tạo một nút bấm khác ngay chỗ nút bấm của web A trên trang của hắn. Thế là người dùng vào web của hacker sẽ thấy 1 nút bấm bình thường mà không biết rằng khi bấm sẽ thực hiện hành vi mình không muốn ở web A. 

Để ví dụ cho dễ hiểu nhé: mình có 1 trang web ngân hàng như thế này:<br>
<p align="center">
  <img width="460" height="300" src="https://images.viblo.asia/9d9e4643-2f32-465a-a643-89218ddcf139.png">
</p>
Bình thường chả ai lại đi bấm vào cái nút đó đúng không? Nhưng mà nếu hacker sử dụng clickjacking thì sao nhỉ?
<br>
<p align="center">
  <img width="460" height="300" src="https://images.viblo.asia/d3d94c99-7fb4-4027-aa37-8ebb88b33378.png" >
</p>
<br>

Trang web này sẽ đè lên banking web(opacity ~ 0.01) và người dùng sẽ chỉ thấy Normal web mà thôi. Mình  nghĩ cơ số người sẽ bấm vào nút  ```goto cat gallery```  đó. Thế nhưng, nếu đằng sau cái nút bấm cute đó lại là ```nút send 1000$``` được nhúng vào và làm mờ đi với opacity 0.01thì sao nhỉ? Nạn nhân sẽ đinh ninh là mình bấm vào  ```goto cat gallery``` nhưng kì thực họ lại bấm vào ```nút send 1000$```.

Vậy đó,  thế là nghiễm nhiên 1000$ sẽ gửi vào tài khoản của hacker mà người dùng không hề hay biết.

## II. Clickjacking trong thực tế
Thực tế, clickjacking là một kĩ thuật khá phổ biến, ngay cả với các trang web lớn. Mình sẽ nêu ra một vài ví dụ nhé:
### 1. Google YOLO (You only login once)
Google YOLO là một dịch vụ của Google, cho phép người dùng đăng nhập bằng tài khoản google trên website chỉ với 1 click. Tuy nhiên, tính năng này lại khá dễ dàng để khai thác clickjacking. Qua đó hacker có thể lấy được các thông tin như tên, ảnh đại diện và email của người dùng. Ngay sau khi được report, google đã kiểm soát việc frame thông qua whitelist do google kiểm soát để ngăn chặn tấn công kiểu này.
### 2. Tweeter follow button
Twitter là một mạng xã hội phổ biến. Và có nhiều người follow sẽ rất có ích cho nhiều mục đích như nổi tiếng nè, mua bán nè, tạo quan hệ vân vân và mây mây. Trước đây, từng có 1 trick để kiếm follow từ twitter rất đơn giản, chỉ cần khai thác clickjacking trên nút follow của trang là xong. Thế là chỉ cần làm sao lừa càng nhiều người click vào thì mình càng nhiều follow. (Lỗi này đã được twitter khắc phục sau  khi có report nên bây giờ bạn biết cũng muộn rồi :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:)
## III. Ngăn chặn clickjacking
Thẻ iframe khiến cho clickjacking được sử dụng, vậy thì cấm cái thẻ iframe là xong. Đáng tiếc rằng rất nhiều dịch vụ, đặc biệt là quảng cáo sử dụng iframe nên rất khó có thể cấm sử dụng thẻ này. Thế nên người ta phải tìm các giải pháp khác để xử lí clickjacking.

### 1. Frame busting
Frame busting là kĩ thuật sử dụng javascript để phát hiện trang web có bị frame hay không. Một đoạn code điển hình của kĩ thuật này: ![](https://images.viblo.asia/9fd769d4-8d4c-40bf-bc29-ca5fa014c34d.png)
<br>
Các điều kiện thường dùng trong kĩ thuật này:<br><br>![](https://images.viblo.asia/aa4ca590-908c-4994-888f-f45df97c4140.png)

Theo một thống kê từ <a href="https://crypto.stanford.edu/~dabo/pubs/papers/framebust.pdf">một nghiên cứu</a> mình tìm được, frame busting được sử dụng khá phổ biến. Tuy nhiên, nó có các hạn chế là không detect được hết các trường hợp, có thể bypass, kiểm tra ở client site... Các kĩ thuật có thể dùng để bypass kiểm tra bằng frame busting có thể kể tới như:
- Disable javascript
- Double framing
- onBeforeUnload event
- onBeforeUnload – 204 Flushing<br>
...
### 2. X-Frame-Option
Một giải pháp khác được đưa ra bởi Microsoft là sử dụng Http header để browser xử lí thay vì javascript ở phía client. Theo đó, browser sẽ quyết định xem có render 1 trang web trong 1 thẻ `<frame>`,` <iframe>`, `<embed>`  hay `<object>`. Đây là một giải pháp khá hiệu quả để ngăn chặn clickjacking.

Có 2 lựa chọn cho header này là:
```
X-Frame-Options: deny
X-Frame-Options: sameorigin
```

với deny là ngăn browser render page còn sameorigin sẽ cho phép các trang trong cùng origin render. Tuy nhiên, sameorigin option chỉ kiểm tra top windows nên nếu trang web có tính năng cho phép frame page thì có thể bị khai thác khi hacker frame trang của hắn vào trang web.
### 3. Samesite cookie
Để thực hiện được clickjacking, nạn nhân cần được xác thực trước tại trang được nhúng. Tuy nhiên, request được gửi từ iframe là cross-origin request nên sẽ bị reject nếu có samesite cookie và tấn công clickjacking sẽ không thực hiện được. Tuy nhiên, tấn công vẫn có thể xảy ra với các trang sử dụng Single Page Applications (SPAs) mà  session ID/access tokens được lưu tại `localStorage`/`sessionStorage`

## IV. Lời kết
Người ta nói: "Trăm nghe không bằng một thấy" nhưng không phải cái gì thấy trước mắt cũng là bản chất thật của nó. Thứ chúng ta thấy có thể là thứ người khác muốn chúng ta thấy, thế nên hãy cẩn thận trước khi tin vào mắt mình nhé. Đừng dễ dãi với bất cứ cái nút bấm nào nếu không muốn một ngày là nạn nhân của click jacking nhé.

**References**:
- https://blog.innerht.ml/google-yolo/
- https://portswigger.net/web-security/clickjacking