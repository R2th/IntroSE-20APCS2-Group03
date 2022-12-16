# Mở đầu
Xin chào mọi người, do sắp tới ,mình sắp được join vào một dự án về React js, và đây cũng là lần đầu tiên mình mới tiếp xúc với React js , nên cũng khá là nhiều bỡ ngỡ với những khái niệm mới như: Component, lifecycle methods, redux, ...đặc biệt là 3 khái niệm : Props, State, và Global State. Vậy thì hôm nay , nhân cơ hội mình sẽ cũng tìm hiểu kĩ hơn về 3 khái niệm này và khi nào thì dùng chúng nhé, vì cũng quá nhiều bài viết đã nói về vấn đề này, nên mình sẽ nói theo cách hiểu của mình để mọi người dễ hình dung nhé. Bắt đầu nào !!!
Và để tìm hiểu về cái gì thì trước tiên chúng ta cần phải hiểu về nó đã.
# Props
Props là một dữ liệu mà được truyền từ thằng Component cha xuống cho Component con, props không thể nào tự động thay đổi trong component hiện tại, nếu như muốn thay đổi , bắt buộc phải có sự thay đổi từ Component cha (do cha truyển xuống), chính điều này sẽ giúp chúng ta tạo ra sự đa dạng cho Component, cụ thể sự đa dạng này ra sao thì chúng ta cùng xem ví dụ này nhé:
![](https://images.viblo.asia/dea47a5c-0ae7-4db0-97dd-461b4f32dcad.png)
Mình có một Component tên Box và có một props tên color, props này nó sẽ nhận các màu tương ứng do Component cha truyền vào, tiếp đến App mình có hai Component Box và truyền vào đó 2 color khác nhau.Như vậy cùng với một Component nhưng với hai props khác nhau, sẽ cho hai giao diện khác nhau.

# State và Global State
Ngược lại với props, props thì không thay đổi được nhưng với State và Global State thì lại thay đổi được, tuy nhiên làm sao để chúng ta biết khi nào thì xài State, khi nào thì xài Global State.
Ví dụ : - Dữ liệu API chỉ dùng trong component.
            - currentSecond trong count down.
            ...
### State
Đơn giản thôi, đối với State, mình sẽ sử dụng các dữ liệu mà chỉ dùng cho đúng **Một** Component hiện tại mà thôi, nó được tạo ra, xử lí và quản lí ở trong duy nhất Component đang sử dụng mà thôi.
### Global State
Đây là khái niệm mà chúng ta thường được gặp nhiều nhất khi sử dụng Redux, thì nó chỉ sử dụng khi dữ liệu đó được sử dụng ở **Nhiều** Component khác nhau, nhớ là phải **Nhiều** Component khác nhau, chứ không phải **Một** Component nhé. Khi mới học Redux thì mình thường suy nghĩ phải apply theo mọi thứ của Redux, rồi mọi thứ từ dữ liệu trả về đều phải đẩy lên redux, mặc dù có nhiều dữ liệu chỉ sử dụng cho đúng một Component. Mình thường hay sử dụng **componentWillReceiveProps** hoặc **componentDidUpdate** và trong đó các bạn kiểm tra dữ liệu và điệu kiện để biết bước tiếp mình sẽ làm những gì, đó là một trong các lỗi sai mình gặp. Hãy tưởng tượng cái Global State là một cái box nhỏ nhỏ chứa các State, nó sẽ chạy vô cùng hiệu quả nếu với các State, nếu bạn đẩy tất cả các thứ lên Redux luôn, thì Global State càng ngày sẽ càng bự lên, cái box càng cồng kềnh và hiệu suất nó càng giảm đi.
Ví dụ : - Thông tin logged in của user.
            -  Thông tin của giỏ hàng.
            ...
            
Cùng xem qua ví dụ nhé:

Mình có một ứng dụng nhỏ như sau: 

![](https://images.viblo.asia/b06d2218-cccf-4470-962a-e7c4f6d97556.png)

Có hai component là ColorBox Và Count Down

![](https://images.viblo.asia/e7cede4e-de5f-4da3-b088-0f796d59d7cf.png)

Ở đây mình có một Colobox có props color được truyền từ Compononet Cha và có type là String. Component cha truyền vào màu gì thì nó sẽ ra màu đó.

![](https://images.viblo.asia/27f29137-32ee-44ea-92e2-6325fbea8433.png)
![](https://images.viblo.asia/54121102-42d5-4a89-a6fb-68c4be4dfdc5.png)

Tiếp theo là component Countdown,mỗi lần reset trang sẽ chạy lại đồng hồ, nhận vào props seconds : con số đầu tiên mình bắt đầu, nó không biết mình cần đếm từ bao nhiêu, mọi thứ sẽ do Component cha chỉ định. Trong Countdown này mình tiếp tục sử dụng state  là currentSecond : render giá trị hiện tại, trong Countdown này có đúng một giá trị cần thay đổi và chỉ sử dụng trong Countdown thôi, các Component khác không sử dụng State này.

![](https://images.viblo.asia/77054d9d-f254-4897-b3dd-bef057696cf7.png)

Và cuối cùng App để làm Component cha cho Count down và Colobox.

# Tổng kết
Qua bài viết náy của mình, mong rằng ý kiến của mình sẽ giúp ích cho mọi người nhiếu hơn.