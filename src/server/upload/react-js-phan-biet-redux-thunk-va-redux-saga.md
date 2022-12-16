Chào các bạn, hiện tại mình đang được training về React js và cũng khá vất vả với hàng loạt những khái niệm trong React Js. Hôm nay mình xin viết một bài  về các vấn đề cũng hơi chuyên sâu trong React Js.  Nếu là người mới học về React, các bạn nên nắm những vấn đề này trước như: Component, props, state, life cycle,...

Trước khi đi vào 2 khái niệm Redux thunk và Redux-saga. Mình sẽ đi qua về Redux, nó là gì và nó được dùng để làm gì?
# Redux
Lúc  redux chưa ra đời,   muốn truyền  data từ một Component sang Component khác thì tại component đó mình sẽ get nó thông qua props, và nếu mình gán giá trị của cho state của component là  props mình truyền vào thì nó render lại UI.  Trong trường hợp mình truyền data từ component ông nội đến component cháu thì phải thông qua component cha. Điều này trong các ứng dụng phức tạp sẽ rất khó để quản lý trong việc quản lý các state, chưa kể nếu có bug xảy ra thì việc debug để tìm ra vấn đề cũng không hề đơn giản, kèm theo nhiều vấn đề khác thì Redux đã xuất hiện để giải quyết vấn đề này:

Các bạn hãy nhìn vào sơ đồ bên dưới:
![](https://images.viblo.asia/3fd50f2c-c410-4428-96b2-aa7b024086f6.png)

Đầu tiên redux có 3 thành phần chính:
- action:  Khi người dùng thực hiện một hành động hay một sự kiện nào đó như là submit một form hoặc call một api, thì action đó sẽ phải được gửi đến redux store bởi method store.dispatch() và mình sẽ truyền action vào.
ví dụ:
```
export const listAll = () => {
    return {
        type: Types.LIST_ALL
    };
}
store.dispatch(listAll());
```

- Reducer:  Reducer sẽ lấy các action, sau đó phân tích và trả về các state mới cho store
- Store: Là thành phần rất quan trọng, nó sẽ chứa các state của các component. Thông qua đó từ một component mình sẽ kết nối với store để lấy, cập nhật các state cho các component

Đến đây thì chắc các bạn đã hình dùng được, thay vì truyền data từ component ông nội sang component cháu và phải thông qua thằng component cha. thì bây giờ mình sẽ không truyền kiểu đó nữa. Mà mình sẽ đem tất cả các data lưu vào state trên một cái store của redux thôi. sau đó thằng component nào muốn dùng thì cứ việc truy cập đến store lấy về mà dùng.
# Middleware library
ok vậy mình đã hiểu vai trò của redux trong ứng dụng react js, trên thực tế thì việc thao tác với các state ở redux store có nhiều vấn đề khác, ví dụ mình muốn gọi api, hoặc sử dụng các hàm setTimeout để thao tác các state thì sao, tất cả những việc đó được gọi chung là side effects, vậy làm thế nào để mình handle được những side effect đó. Thì lúc này  middleware library sẽ giúp xử lý những vấn đề này.
Các bạn có thể hiều đơn gian middleware library là thành phần đứng giữa các action và reducer. Khi một action được dispatch vào reducer, thì nó sẽ kiểm tra xem action đó có thực thiện bất đồng bộ hay không, nếu có nó sẽ chờ cho action bất đồng bộ thực hiện xong rồi mới đưa action vào trong reducer.
![](https://images.viblo.asia/3fd50f2c-c410-4428-96b2-aa7b024086f6.png)

Một số library middleware thường sử dụng:
- Redux-thunk
- Redux-saga
- Redux-promise
# Redux-thunk
Ở trong phạm vi của bài viết này mình sẽ chỉ nói về redux thunk và redux saga.
Redux thunk:
Chắc các bạn cũng biết là action thường trả về dạng object, người ta hay gọi là **plain Javascript object**. Trong trường hợp mình muốn gọi một api để trả về một list trending thì action của mình không thể trả về một plain Javascript object thông thường được, mà mình sẽ phải trả về một function, action như vậy được gọi là async action. Đây là code cho ví dụ của mình:
```
export const fetchTrendingRequest = () => {
  return (dispatch) => {
    callAPI().then(({data})=>{
      dispatch(fetchTrending(data.data));
    })
  }
}

export const fetchTrending = (trendings) => {
  return {
    type: Types.FETCH_TRENDING,
    trendings
  }
}
```
Các bạn hãy quan sát action đầu tiên của mình, ở đây mình trả về một function và function này sẽ tiến hành call api để lấy về listTrending, lúc này redux thunk nó sẽ cho phép chương trình dừng lại cho đến khi api gọi xong và trả về kết quả. Tiếp đến mình gọi đến một action bên dưới truyền data vừa mới get được vào và lúc này redux thunk nó sẽ kiểm tra action này không thực hiện async nên nó sẽ đưa đến cho reducer để xử lý.
Đây cũng là một quy trình cơ bản mà redux thunk thực hiện. Khá là đơn giản, còn về làm thế nào để set up redux thunk thì các bạn có thể xem ở đây:
https://github.com/reduxjs/redux-thunk
# Redux saga
Về mặt cơ chế hoạt động thì nó cũng tương tự như thunk, dùng để handle các side effect. Redux saga cung cấp các hàm helper effect, các hàm này sẽ trả về một effect object chứa đựng thông tin đặc biệt chỉ dẫn middeware của Redux có thể thực hiện tiếp các hành động khác. Các hàm helper effect sẽ được thực thi trong các generator function.  Generator function  là một tính năng mới trong ES6, nó cũng là một function. Tuy nhiên điểm đặc biệt của function này là có thể tạm dừng để thực thi một việc khác, hoặc có thể gọi đến một Generator function khác. Chi tiết về Generator function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

Một số helper của  generator function được redux saga sử dụng:
- takeEvery() : thực thi và trả lại kết quả của mọi actions được gọi.
- takeLastest() : có nghĩa là nếu chúng ta thực hiện một loạt các actions, nó sẽ chỉ thực thi và trả lại kết quả của của actions cuối cùng.
- take() : tạm dừng cho đến khi nhận được action
- put() : dispatch một action.
- call(): gọi function. Nếu nó return về một promise, tạm dừng saga cho đến khi promise được giải quyết.
- race() : chạy nhiều effect đồng thời, sau đó hủy tất cả nếu một trong số đó kết thúc
![](https://images.viblo.asia/76449a1c-8d1c-4690-9424-e43bacc6983d.png)
# Tóm lại:
Đối với redux thunk nó có những ưu nhược điểm như sau: 

|| Redux Thunk | Rudux-saga |
| -------- | -------- | -------- |
| Ưu điểm   | Đơn giản, mạnh mẽ, dễ sử dụng , dễ tiếp cận đối với các bạn là mới học React  |  Đối với những dự án phức tạp sử dụng redux-saga code sẽ clean và dễ test hơn so với redux-thunk, giải quyết được những vấn đề về chains of promises|
| Nhược điểm    |Chỉ phù hợp với các dự án nhỏ, xử lý logic đơn giản. Còn đối với những dự án phức tạp sử dụng redux-thunk sẽ  phải tốn nhiều dòng code và gây khó khăn cho việc test các action  | Phức tạp, tốn thời gian cho member mới vào team, nặng về xử lý logic, không dành cho những ứng dụng đơn giản  |
Trên đây là mình đã chia sẻ về redux-thunk và resux-saga.  Đây là 2 middleware library được dùng nhiều trong Reactjs, việc lựa chọn redux-thunk hay redux-saga còn tùy thuộc vào project.  Nếu bài viết có những vấn đề sai xót, mong mọi người đóng góp ý kiến để bài viết được hoàn thiện.
# Tài liệu tham khảo
https://medium.com/@shoshanarosenfield/redux-thunk-vs-redux-saga-93fe82878b2d