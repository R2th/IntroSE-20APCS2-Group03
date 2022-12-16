*Tiêu đề bài viết này hơi `gạch đá` một chút nhỉ* 🤣🤣

*Vào một ngày nọ mình lướt `facebook` dạo trong một group IT và có vô tình đọc được bài viết của một bác bàn luận về khả năng `Context API`  liệu có thể hoàn toàn thay thế được `Redux` hay là không? Nên đó là lý do mình chọn chủ đề này* 😄

*Cùng nhau tìm hiểu xem nó có gì `hot` mà người ta lại đặt ra giả thiết đó nhé !*

![](https://images.viblo.asia/a19b9b0e-365f-4834-92b3-3b83c68e4ae5.gif)


## Đối tượng
Bài viết này sẽ hướng tới `2 đối tượng`:
* Những bạn đã có kiến thức cơ bản về `React`, tìm hiểu qua `Redux` và ` Context API` nhưng *vì nhận đa dạng thông tin từ nhiều nguồn:  nghe anh A nói cái này tốt, chị B lại bảo cái kia tối ưu, trong khi thằng C lại nói cái abcxyz gì đó nữa* 😵😵  nên còn chút `bối rối`  và muốn có cái nhìn bao quát về chúng 😺
* Những anh chị `developer` gạo cội **để em có thể được lắng nghe `review` bài viết, nhận được những đánh giá, góp ý giúp em `mau lớn hơn`** ạ 😊😊

<br/>

*Cùng bắt đầu thoyyyy !!!*

## Ý tưởng
**Vẫn là câu chuyện quản lý `state` trong ứng dụng muôn thuở.**  

Nếu một ứng dụng nhỏ thì chưa có gì phải `xoắn` cả, chúng ta vẫn có thể lưu mỗi `state` một nơi và khi `component` nào cần dùng thì thực hiện *truyền qua truyền lại, truyền lên truyền xuống* giữa các `component cha - con`, `anh - em`.

*Vẫn easy game đúng không nào* 😎😎 *!!!*

<br/>

Song, nếu ứng dụng đó được `scale` lớn dần lên, việc quản lý `state` theo cách làm như vậy sẽ khó khăn hơn cũng như người anh em trong `team` khó mà hiểu luồng `code` của thằng bên cạnh mình nữa.

Do đó người ta mới nghĩ về việc **tập trung dữ liệu vào một nơi, cung cấp cơ chế cho phép mỗi component có thể lấy state cũng như cập nhật state trực tiếp** mà không cần qua các `component` trung gian.

Ý tưởng sơ khai của cả `Redux` và `Context API` là như vậy 😸😸

## Concept 

#### Redux
* `Store`:
    * Là đơn vị lưu trữ của `Redux`
    * Để thay đổi store chúng ta có thể dùng` store.dispatch({ type: action })` 
* `Reducer` của `store` nhận `action` được `dispatch` và sẽ thay đổi `state` của `store` tùy theo loại `action`.

    Sau khi `state` thay đổi thì `Store` sẽ thông báo đến những `listener` nào đã được đăng ký bằng `subscribe()`
* `Provider` là một `element` gốc, nó như một vật chứa, sử dụng `Context API` để đẩy `store` xuống các `component` con và cháu.

    Hàm `connect(mapStateToProps, dispatchToProps)(targetComponent)` tạo 1 `wrapper component` bọc lại `target component`. `Wrapper` lấy thông tin `store` từ `Context API`, sau đó đăng ký 1 `listener` với `store` đó. `mapStateToProps` để nhận biết `target component` cần những `data` gì từ `store`. Việc tối ưu này làm giảm tần suất `re-render` của `target component` đến mức thấp nhất.

#### Context API
<br/> 

##### Context API là một công nghệ mới?

*Ouhhh noooo* 🙀🙀

Thực ra `Context API` đã xuất hiện từ khá lâu trong các phiên bản `ReactJS` trước đó rồi, có chăng việc tạo ra được một cú `lội ngược dòng` là ở  `ReactJS version 16.3` thì `React Context API` đã `chính thức` được `support`.
<br/>

> Trước đây việc sử dụng `Context API` không được khuyến khích vì nó còn đang trong giai đoạn phát triển, chưa hoàn thiện nên để tránh sự cố có thể xảy ra, trên `Documents` của `ReactJS` luôn nói rõ không nên dùng trong thời điểm đó.

<br/>

Như đã nói ở phần `Redux Concept` phía trên, `React Context API` đã được sử dụng trong các thư viện như *`react-redux`, `MobX-react`, `react-router`, hay `glamorous`, etc*.

<br/>

##### Context API Concept

* **`React.createContext()`**:
    * Đầu tiên, chúng ta khởi tạo giá trị ban đầu cho `Context API` bằng `React.createContext()`, hàm này trả về một `object` bao gồm là `Provider` và `Consumer`
    * Khi một `component` đăng ký sử dụng `Context` này thì nó sẽ đọc giá trị `context` từ `Provider` gần nhất 

* **`Context.Provider`**:
    * `Provider` là một `HOC`, truyền vào giá trị qua `prop` ( `value` – giá trị của `Context`)
    * Khi `value` thay đổi (`state` thay đổi), thành phần bên trong `Provider` này sẽ bị `re-render`
* **`Context.Consumer`**:
    * Có thể sử dụng ở bất cứ đâu bên dưới `Provider`
    * `Consumer` `get` được giá trị của `prop value` của `Provider` thông qua `prop children` để sử dụng trong `component`
    
        Ngoài ra còn có thể sử dụng  `Class.contextType` để truy cập vào giá trị `context` này nữa.

<br/>

*Bạn có thể tham khảo chi tiết cách sử dụng `Context API`* [*tại đây*](https://haodev.wordpress.com/2019/12/01/react-context-api/) 🤗🤗

## Context API vs. Redux

Chúng ta đã đi qua `Ý tưởng` và `Concept`, có một điều cần được nhấn mạnh: **`Redux` là thư viện** để quản lý `state`, chia sẻ `state` giữa những `component` trong cùng 1 `app`. 

`Redux` bản thân nó cũng dựa trên `Context API`. Về mặt nào đó thì `Context API` có thể làm phần việc của `Redux` nhưng không tất cả, và chúng ta phải xử lý khá nhiều để có thể tối ưu được như `Redux` nếu dùng `Context API thô`. 

Chính vì điểm này nên cũng có nhiều ý kiến rằng, việc `lưu/lấy` ra được `state` từ `Context API` nghĩa là thay thế được `Redux`.

Nhưng suy cho cùng thì:

> Để quản lý `state` của `app` thì đa số các thư viện đều sử dụng `Context API`, còn việc gọi `connect()`, `useContext()` chỉ là `mặt ngoài` để xử lý `binding` giữa `app state/context` với `component` thôi.
> 

## Cái kết hòa bình

Mỗi `app` mỗi khác, việc tùy theo nhu cầu và tình hình của từng `app`, việc chọn `Redux` hay `Context API` phụ thuộc vào nhiều yếu tố: con người và tính chất của dự án.  Câu trả lời đúng nhất chắc là phải để thực nghiệm sử dụng mới có thể có kết luận.

<br/>

##### Vậy khi nào dùng `Redux`, khi nào thì dùng `Context API`?
*Hmmm...*

*Theo cá nhân mình thấy `Context API` sẽ chưa thay thể được `Redux`.
Trong một `app`, tránh truyền `props` xuống các `component` phía dưới , thì mình hoàn toàn có thể chọn `Redux` hay `ContextAPI`.*

*Mặt khác, nếu bạn đang sử dụng `Redux` cho một mục đích khác (như bộ chứa trạng thái có thể dự đoán được, xử lý logic của ứng dụng bên ngoài các thành phần của bạn, giữ lịch sử cập nhật trạng thái, sử dụng `Redux DevTools` , `Redux Undo` , `Redux Persist` , `Redux Form` , `Redux Saga` , `Redux Logger` ,etc), thì hoàn toàn không có lý do gì để bạn thay thế `Redux` bằng `ContextAPI`.*

*Tất nhiên đó là ý kiến chủ quan của mình, phần là trải nghiệm qua các công nghệ đó và phần là cảm tính một chút nữa 😽😽.*

Rõ ràng đây là một câu hỏi về **`sự-quen-thuộc`**. Không có lý do rõ ràng để chọn cái này hơn cái kia vì chúng tương đương nhau. Với các vấn đề cần xử lý, `Context API` sử dụng bằng cách này thì `Redux` cũng có thể biến tấu xử lý nó bằng cách kia và ngược lại. Hay thậm chí mở một lối đi riêng là sử dụng một thư viện khác như `MobX` mà không phải 2 ứng cử viên phía trên 😸😸

![](https://images.viblo.asia/1b06fdcd-2cb0-4795-a67a-3d98e2e05e8f.gif)


Cảm ơn vì đã đọc bài viết của mình. Tặng mình `1 upvote` để có động lực cho các bài viết tiếp theo nhé 🥰🥰

Bạn thấy `React Context API` thế nào? Liệu nó có thể thay thế hoàn toàn cho các thư viện quản lý `State` trong `React` được không?

Cùng chia sẻ phía dưới nào 😋😋

<br/>

Tham khảo thêm các bài viết về công nghệ [tại đây](http://haodev.wordpress.com/).


Chúc các bạn cuối tuần vui vẻ 😺😺 !!!
<br/>

*Reference: [Medium](https://medium.com/@linqtojs/redux-context-api-hooks-c%C3%B3-th%E1%BB%B1c-s%E1%BB%B1-gi%E1%BB%91ng-nhau-4a0afc0b90ee), [Personal Blog](https://haodev.wordpress.com/2019/12/12/context-api-danh-bay-redux-trong-1-not-nhac/)*.