<div align="center">

![](https://images.viblo.asia/c3d7bd91-2a00-4f16-a522-b7e23d6a40ce.png)

</div>

Bạn đang dùng [controlled input components](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/) để làm các loại form. Bởi vì form thì cần phải phản hồi ngay lập tức, bạn muốn trải nghiệm người dùng phải là tốt nhất.

Bạn đang sử dụng Redux để quản lý state của app: những thứ như user hiện tại và dữ liệu của họ và vân vân.

Đúng lúc đó, bạn tự hỏi: Mình có nên cho state của form này vào trong Redux không nhỉ? Hay có nên cho dữ liệu của tất cả các form vào Redux hay không?

### React state vs. Redux state

Như Dan Abramov đã từng nói:

> Dùng React cho những dữ liệu không liên quan đến các thành phần khác của app và không thay đổi một cách phức tạp. Ví dụ như trạng thái tắt bật của 1 cái công tắc, hay input của 1 cái form. Dùng Redux cho những dữ liệu được dùng chung bởi nhiều thành phần trong app và được thay đổi một cách phức tạp. Ví dụ như cache hay bản nháp.

Nói ngắn gọn hơn là: dùng React với những dữ liệu riêng và Redux cho những dữ liệu chung.

Anh ta nói cũng có lí đấy chứ. Nhưng có 1 điều là anh ấy cũng quy dữ liệu input vào dạng dữ liệu không dùng chung, mà trong thực tế thì có lúc nó không phải như vậy.

### Áp dụng với form

Sau đây là một vài lí do mà bạn có thể cần phải cho dữ liệu form vào Redux: 

* **Bạn cần giá trị input tồn tại lâu hơn component.**

Nghĩa là, kể cả khi form đã bị unmount, bạn vẫn muốn có thể truy cập state của nó.

Ví dụ, nếu bạn nhập email của mình vào một form login, sau đó đóng nó lại, sau đó muốn quay lại xem nó. Một ví dụ khác đó là lưu bản nháp tin nhắn khi user chuyển qua xem một cuộc hội thoại khác.

Nếu input cần phải tồn tại sau khi refresh trang, lưu nó vào trong Redux sẽ cũng sẽ là một ý hay (và sau đó bạn có thể dùng một cái gì đó để lưu state này vào localStorage chẳng hạn, ví dụ redux-persist).

* **Bạn cần có nhiều instance của form và được đồng bộ với nhau.**

Giả sử bạn có một form login trong một modal, nhưng cũng có form đấy ở một vài chỗ khác trong app của bạn. Ví dụ như một cái landing page chẳng hạn.

Hoặc, nói tiếp vấn đề về bản nháp tin nhắn, bạn có thể có nhiều cách để nhắn tin. Ví dụ như Facebook có một widget để nhắn tin ở mọi trang, nhưng cũng có một trang nhắn tin riêng. Hiện tại thì nó không lưu tin nháp ở 2 trang này, nhưng nó hoàn toàn có thể.

Trong những trường hợp đó, bạn có lẽ sẽ cần phải đồng bộ input của chúng với Redux, để cho cả 2 form đều có giá trị giống nhau trong cùng một thời điểm

* **Bạn muốn share giá trị input giữa những form với nhau.**

Đây là một case khái quát của case trên. Một ví dụ thường thấy đó là nhập email của bạn vào login form, sau đó ấn vào "Quên password" và đã thấy email của bạn ở màn hình tiếp theo.

* **Bạn muốn state của một form nào đó có tác động đến phần còn lại của app.**

Ví dụ như hiển thị spinner ở navigation bar khi form đang được submit.

Hay làm cho Clippy che mắt nó đi khi user đang nhập password.

<div align="center">

![](https://images.viblo.asia/75924401-11de-4589-8480-6a24cdebad92.gif)

*(Case này thực chất không cần Redux vì con cú mèo cũng là một phần của form rồi. Tuy vậy nhưng nếu app của bạn có 1 con linh vật sống ở chỗ khác như Clippy thì nó sẽ có tác dụng.)*

</div>

Trí tưởng tượng là thứ duy nhất giới hạn bạn mà thôi, nhưng thật sự thì, nếu bất cứ thứ gì của form được cần ở bên ngoài form thì dùng Redux là chuẩn rồi.

Mặt khác, dưới đây là những lí do để giữ state trong React:

* **Form chỉ được dùng một lần.**

Nó không tồn tại lâu và chỉ ở một chỗ duy nhất. Đơn giản vậy thôi, không phải form nào cũng cần giá trị input được lưu lại sau khi đóng.

* **Dữ liệu của form không được sử dụng ở bên ngoài.**

Cũng không phải form nào cũng tác động đến state của toàn app.

* **Dữ liệu của form quá phức tạp, làm cho việc quản lý nó với Redux còn khó hơn.**

Đúng vậy, Redux là để làm cho cuộc sống của chúng ta đơn giản hơn, nhưng trong thực tế thì bạn có thể cảm thấy một số thứ quá lạ lùng và phức tạp trong Redux (kiểu như dùng dao mổ trâu để giết gà vậy).

Nói tóm lại, nếu dữ liệu của form không cần share cho toàn app thì tốt nhất bạn nên giữ nó trong local state.

### Sự mặc định hợp lý

Hầu hết các form trong ứng dụng của tôi ban đầu chỉ sử dụng React state. Tôi thấy đó là việc làm đúng đắn bởi vì không phải form nào cũng cần những chức năng phải dùng đến Redux.

Tuy vậy, khi UX designer đến và yêu cầu những điều mà bạn không thể làm với React state, bạn cần phải sẵn sàng.

Việc cấu trúc state React và component dựa trên nguyên lý [container/presentational component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) sẽ làm cho việc chuyển đổi từ React state sang Redux state trở nên rất dễ dàng.

### Không phải chỉ cái này hoặc cái kia
Kể cả khi bạn quyết định bạn cần phải sử dụng Redux, đừng tự huyễn hoặc bản thân rằng từ giờ bạn cần phải chuyển mọi container state vào trong Redux.

Đó chỉ là trường hợp hãn hữu thôi. Thay vào đó, hãy xác định các state:
- cần tồn tại lâu hơn form, hay
- cần có sẵn trong nhiều instance khác nhau của form, hay
- cần có sẵn trong những phần khác của app (như Clippy)

Khi bạn có những dữ liệu như thế thì hãy cho chúng vào Redux.

Ví dụ, nếu mục đích của bạn là lưu giữ giá trị input như trong ví dụ về login modal thì chỉ có email và password là nên cho vào trong Redux thôi. Những dữ liệu khác thì vẫn để ở trong component state vì nó không được dùng ở chỗ nào khác cả.

### Không có lựa chọn nào là đúng nhất

Cuối cùng thì, không có đáp án nào là "đúng" hay "sai" cả.

Có thể có những cách khác tốt hơn để làm Clippy che mắt đi mà không cần dùng đến Redux.

Có thể cũng có những lí do để dùng Redux kể cả khi form đấy chỉ dùng một lần. Ví dụ như trong trường hợp bạn dùng [time-travel debugging](https://github.com/gaearon/redux-devtools) để debug mọi thứ chẳng hạn.

Mỗi trường hợp đều khác nhau và nên được đánh giá một cách riêng lẻ, với những tiêu chí như:

* Yêu cầu về mặt business và hướng đi của nó trong tương lai gần
* Sở thích cá nhân hoặc team
* Các công cụ hỗ trợ
* Lợi ích mà Redux đem lại
* Vân vân

Và không có ai tốt hơn bạn để đưa ra quyết định đúng cả. Bạn không cần phải làm theo mọi bài viết trên Medium mà bạn từng đọc. Yêu cầu khác = giải pháp khác.

Bài viết được dịch từ [Should you store your form state in Redux?](https://goshakkk.name/should-i-put-form-state-into-redux/) của tác giả **Gosha Arinich**.