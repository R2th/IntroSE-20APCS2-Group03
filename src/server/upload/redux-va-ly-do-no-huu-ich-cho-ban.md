`Redux` đã được công bố và ra đời từ khá lâu rồi, tháng 5/2015. Và trong vòng hơn 3 năm cùng sự phát triển như vũ bão của các frameworks thì redux đã trở nên rất phổ biến ở thời điểm hiện tại, đặc biệt trong giới React developers.

Tuy nhiên thì không phải React dev nào cũng sử dụng redux trong ứng dụng của mình. Lý do thì có rất nhiều: có thể là với React thuần đã đáp ứng đầy đủ các tính năng của ứng dụng, ngại thay đổi cách tổ chức và code đã có, hoặc đơn giản là có nghe nói đến keyword `redux` nhưng chưa có nhu cầu,... Dù với lý do gì thì đến một thời điểm nào đó trong quá trình làm việc với React thì bạn cũng nên cần biết và hiểu về redux cùng sự hữu ích của nó. 

Vậy `Redux` là gì? Nó sinh ra để giải quyết vấn đề nào? Khi nào thì nên sử dụng nó? Dưới đây là những gì mình đã thu lượm được:


-----


## 1. Redux là gì?

Redux là một tool quản lý state cho các ứng dụng Javascript. Mặc dù nó thường được sử dụng với React, nhưng nó cũng tương thích với nhiều frameworks giống React khác như Preact, Inferno, hay Angular và thậm chí chỉ là JavaScript thuần.

=> Theo khái niệm trên thì redux giúp `quản lý state`, nhưng  `quản lý state` **không phải là vấn đề** mà redux giải quyết, React đã tự làm điều đó rồi. Đến đây chúng ta thấy có vẻ hơi confuse và mơ hồ đúng không? :D (tạm lưu thắc mắc này lại đã nhé)

## 2. Tại sao nên sử dụng Redux.
### * Về data flow:
Nếu bạn đã sử dụng React ít nhiều, bạn có thể biết về `props` và luồng dữ liệu một chiều. Dữ liệu được truyền xuống các components con thông qua các `props`. Ví dụ chúng ta có 1 component như này:

![](https://images.viblo.asia/97557b1b-3005-4f88-aacb-1a85a27645a8.png)

Giá trị `count` được lưu giữ trong `state của App` và sẽ được truyền xuống component `Count` thông qua `props`:

![](https://images.viblo.asia/5d070fc7-1ade-4ad8-90b0-30d1f53149cd.png)

Để dữ liệu này quay lên trên `App`, chúng ta cần thông qua callback function, vì vậy callback function phải được truyền xuống bất kỳ component nào muốn truyền dữ liệu lên:

![](https://images.viblo.asia/5748b997-b05d-4b6a-83d4-9512595520e7.png)

Trên đây chỉ là 1 ví dụ đơn giản để chúng ta đi dạo lại React một chút. Nếu các bạn chưa hiểu về những thứ ở ví dụ trên thì nên tìm hiểu về [React](https://reactjs.org/docs/getting-started.html)  trước đã nhé. Bởi nếu không biết React hoạt động như nào thì bạn sẽ không thể hiểu được ý nghĩa của Redux.

### * Sự luân chuyển data giữa các tầng (layers):
Nếu app của bạn chỉ đơn giản ở mức có 2 layers như ở ví dụ trên thì chẳng có gì đáng để nhắc đến. Tuy nhiên, khi app thực tế trở nên phức tạp hơn, có nghĩa là cần 2, 3, 4 layers và thậm chí nhiều hơn nữa cho đến khi chúng ta truyền được dữ liệu cần thiết đến tầng cuối có component cần sử dụng dữ liệu đó.


-----


- Ví dụ 1: Avatar twitter

![](https://images.viblo.asia/61de55e2-e8f6-4240-92ca-817f053b1e3c.png)

`App` là component gốc có state chứa thông tin `user`. Để truyền được `user` xuống 3 component Avatar con thì `user` cần đi qua các components trung gian mà ở đó không cần sử dụng đến dữ liệu này:

![](https://images.viblo.asia/c5e3515a-625e-47b7-8c7e-767ac928f009.png)

- Ví dụ 2: Master/Detail

Một số components có thể cần truy cập vào cùng **một state** nhưng hiển thị nó theo những **cách khác nhau**. Chế độ xem "master/detail" cổ điển là một ví dụ điển hình, trong đó bạn có một danh sách các mục hiển thị một vài giá trị tóm tắt từ mỗi item (master) và cũng là component để hiển thị tất cả các chi tiết cho item hiện được chọn (detail):

![](https://images.viblo.asia/b741f662-47d6-4dfb-b75b-4a9eb8b03903.png)


Vấn đề chúng ta gặp phải ở master/detail là câu hỏi data nên được "sống" ở đâu?. Có 2 components chia sẻ cùng một data có thể khiến nó trở nên rắc rối khi muốn đồng bộ hóa dữ liệu. Lý tưởng nhất là data chuẩn chỉ ở một nơi.
 Trong case này, React docs khuyến khích bạn "[lift state up](https://reactjs.org/docs/lifting-state-up.html)", nghĩa là đưa dữ liệu vào tổ tiên gần nhất của 2 thành phần:
 
 ![](https://images.viblo.asia/2ad56140-0397-4e11-93b9-9ef108f3f420.gif)
 
 Trong ví dụ đơn giản này, 2 components là 2 anh em trực tiếp. Tuy nhiên, nếu chúng cách nhau rất xa trong tree thì **"component tổ tiên gần nhất" có thể nằm ở layer cao nhất của tree component**. Điều này có nghĩa là tổ tiên sẽ phải truyền data xuống dưới bằng `props`, thông qua một số component trung gian khác trên đường đi . (Giống ví dụ 1)
 
 


-----


=> Tóm lại là việc luân chuyển `data` như vậy khá rối rắm như các bạn thấy, và dễ phát sinh nhiều vấn đề khi số layer ngày càng tăng. 

Đó chắc chắn không phải là một software design tốt. Các components trung gian bắt buộc phải nhận vào các `props` mang data cho các components con khác mà chúng không hề cần tới các data này, đồng nghĩa với việc khó refactor và tái sử dụng component. 

Sẽ thật tuyệt vời nếu các components không cần nhận vào các data mà nó không sử dụng đến đúng không nào? :)

### * Redux để giải cứu:

**Plug Any Data Into Any Component** - Đây mới chính là **vấn đề Redux giải quyết**.

Redux giúp chúng ta trong những tình huống khó khăn này, nơi nhiều components muốn chia sẻ một số hoặc tất cả cùng một dữ liệu, nhưng không liên quan chặt chẽ với nhau. Redux cung cấp một `store` có thể chứa dữ liệu từ **mọi nơi** trong app.

Sử dụng `connect` function mà Redux cung cấp, bạn có thể kết nối bất kỳ component nào vào data store của Redux, và component này có thể lấy ra dữ liệu mà nó yêu cầu. Một số developers đưa tất cả dữ liệu của app của họ vào Redux store, nhưng bạn vẫn có thể giữ một số dữ liệu ở local state nếu bạn muốn - tùy thuộc vào bạn quyết định.

![Ví dụ 2](https://images.viblo.asia/0530383d-c6a7-43c2-87b2-4f727b9dce76.gif)

Ngoài ra, nó cũng cung cấp một số thứ thú vị khác, như giúp debugging dễ dàng hơn ([Redux DevTools](https://github.com/reduxjs/redux-devtools) cho phép bạn kiểm tra từng thay đổi của state), time-travel debugging (bạn có thể khôi phục các thay đổi state và xem app của bạn trông như thế nào trong quá khứ) và nó có thể làm cho code của bạn dễ maintain hơn trong thời gian dài. Nó cũng sẽ dạy bạn nhiều hơn về functional programming.


=> Tác dụng chính của `Redux` là cho phép bất kỳ component nào kết nối tới bất kỳ dữ liệu nào. Nếu bạn không cần điều này thì bạn có thể không cần tới `Redux`. :)

### * Trở lại ví dụ 1:

![Ví dụ 1](https://images.viblo.asia/da3fc6bb-560d-4f31-99ff-d18efa93aa7e.png)

Chúng ta có thể implement Avatar component như sau:

```
import React from 'react';
import { connect } from 'react-redux';

const Avatar = ({ user }) => (
  <img src={user.avatar}/>
);

const mapStateToProps = state => ({
  user: state.user
});

export { Avatar };
export default connect(mapStateToProps)(Avatar);
```

Bản thân component nó không biết đến Redux - nó chỉ sử dụng prop `user` và render thẻ image. Và `connect` function là thứ thực sự cung cấp dữ liệu từ Redux thông qua `mapStateToProps` function và vào Avatar.

Bạn sẽ nhận thấy có 2 câu lệnh `export`  ở cuối cùng  -  một cái mặc định, một cái sử dụng `connect`. Điều này là không bắt buộc, tuy nhiên sẽ hữu ích nếu chúng ta có một bản default component và một bản “Redux hóa”.

Ví dụ, bản default được dùng khi viết unit test và tăng tính tái sử dụng. Hay một nơi nào trong ứng dụng có thể muốn dựng `Avatar`  cho user khác, thay vì user đang đăng nhập. Trong trường hợp này, bạn có thể "export"  bản Redux hóa thành `CurrentUserAvatar`  cho user đang đăng nhập, bản default cho các users khác.

## 3. Khi nào nên sử dụng Redux

- Nếu bạn có một cấu trúc các components như trên  - dữ liệu được luân chuyển xuống nhiều layers.
- Nếu bạn muốn cache dữ liệu giữa các view. Ví dụ, tải về dữ liệu khi người dùng click vào trang chi tiết và lưu dữ liệu lại để lần sau vào lại trang đó nhanh hơn.
- Nếu ứng dụng đang lớn lên, lưu trữ nhiều dữ liệu . Nhưng, tránh lạm dụng Redux, cân nhắc việc sử dụng nó khi thích hợp.



-----

Nhìn chung, chắc chắn bạn có thể viết toàn bộ app mà không cần sử dụng gì ngoài component state của React. Dan Abramov, người tạo ra Redux, nói rằng mọi người thường nhảy vào Redux quá sớm và đã viết một bài báo có tên "[You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)" để khuyến khích mọi người nghĩ về lý do tại sao họ muốn sử dụng Redux. Điều đó nói rằng, có một số lý do tuyệt vời để sử dụng Redux trong React app (hoặc thậm chí với các frameworks khác, như Angular). Như với bất kỳ công nghệ nào thì đều có sự đánh đổi tương ứng, nhưng theo quan điểm của tôi, sử dụng Redux là hoàn toàn xứng đáng.

Đến đây các bạn đã có thể tự giải đáp thắc mắc ban đầu của mình rồi đúng không? :D

-----

Refer link: [Redux and Why it's Good For You](https://www.fullstackreact.com/articles/redux-with-mark-erikson/), [What Does Redux Do?](https://daveceddia.com/what-does-redux-do/)