Chào mọi người, nếu bạn là người đã biết về React và đang làm quen với Redux chắc hẳn bạn đang rất mơ hồ về các khái niệm cơ bản của Redux như dispatch, store, action creator,... bạn còn đang vật lộn với đống document của Redux để hiểu những khái niệm đó và bạn nghe ai đó trong team nói về Redux Thunk, thế là lại một khái niệm nữa cần phải tìm hiểu và bạn bắt đầu lẫn lộn giữa Redux, Thunk hay thậm chí là Middleware.

Vậy nên hôm nay chúng ta sẽ cùng tìm hiểu về cách hoạt động của Redux Thunk.

### 1.  Nhắc lại về Redux
Redux js là một thư viện Javascript giúp tạo ra thành một lớp quản lý trạng thái của ứng dụng. Được dựa trên nền tảng của ngôn ngữ Elm kiến trúc Flux do Facebook giới thiệu, do vậy Redux thường là bộ đôi kết hợp hoàn hảo với React.

Khi sử dụng Redux trong ứng dụng của mình, trạng thái (State) của toàn bộ ứng dụng được lưu trong một Store duy nhất, khi ta muốn thay đổi một State nào đó, tại một Component, ta cần tạo một Action, Component này sẽ đóng vai trò là Action creator (nói nôm na là bộ tạo Action :laughing: )  thông thường một Action là một `object`, các bạn lưu ý điểm này nhé, Action phải là một `object`. Một Action luôn luôn có giá trị trả về type và giá trị payload có thể có hoặc không. Ở đây ta có ví dụ về một Action đơn giản trả về cho Reducer một đối tượng `song`.
```
export const selectSong = song => {
    return {
        type: "SELECT_SONG",
        payload: song
    };
};
```
Action này sẽ được đưa đến tất cả các Reducer và chỉ những Reducer quan tâm đến `type` của Action này sẽ phân tích Action được gửi lên và sau đó xử lý và cuối cùng trả ra một state mới đưa đến Component như một props.
Tổng quát, vòng đời của Redux được mô tả như hình dưới đây:

![](https://images.viblo.asia/a4ca6206-20ab-4c89-a10f-aa60be341179.png)


### 2. Vậy Redux Thunk là gì?
Đến đây các bạn sẽ thắc mắc vậy Redux Thunk là gì và nó được áp dụng như thế nào. Chúng ta cùng quay lại ví dụ về Action ở bên trên, ta thấy rằng Action này trả về một *plain Javascript object*, object này là hợp lệ để các Reducer có thể tiếp nhận và xử lý nó. Nhưng đôi lúc trong ứng dụng của chúng ta nó lại không đơn giản như vậy :cry: các action cần trả về một function chẳng hạn, các action này được gọi là `Async Action`, thì đây là nơi mà Redux Thunk làm việc, ta lấy một ví dụ về một trường hợp Action không còn là một *plain object* nữa:

```
impport dataUsers from '../api/datausers';

export const getUsers = async () => {
    const response = await dataUsers.get('/users');
    return {
        type: 'GET_USERS',
        payload: response
    }
};    
```

"Đợi đã! Action này cũng là một plain object mà, nó cũng gồm cặp `key` và `value` đấy thôi" - đây là sai lầm của các bạn mới làm quen với javascript hay React. Action này không phải là một plain javascript object mặc dù nó có cú pháp giống với một PJO. Nhờ vào việc sử dụng cú pháp `ES6` mà nó dễ gây nhầm lẫn cho những bạn mới bắt đầu, không tin các bạn cứ thử kiểm tra đoạn code trên với Babel xem, và bạn sẽ thấy phần `return` trả về một đống code dài dòng khó hiểu chứ không còn là một PJO nữa. Do vậy cách tiếp cận ở trên là sai với khái niệm của một Action thông thường.

Quay lại với Thunk, Redux Thunk cho phép trả về các Action là một function thay vì chỉ là một PJO, nó đóng vai trò là một Middleware được đặt trước thời điểm reducer nhận request để nhận biết các action có trả về một PJO hay không, nếu đó là một PJO, Thunk sẽ chuyển action đó đến Reducer như thường lệ, nếu action trả về là một function, Redux Thunk sẽ "chặn" action đó lại và đợi cho đến khi một lệnh asynchronous nào đó trong function hoàn tất và trả về kết quả (như giá trị `response` ở trên).
Đến đây chúng ta đã nhận được một PJO và Redux Thunk sẽ cho action này đến Reducer như bình thường. Do vậy chúng ta có sơ đồ như sau:

![](https://images.viblo.asia/ed9a2e6f-55a4-4ec3-925f-1f368d6bf10f.png)

Ta viết lại Action ở trên, thay vì  `return`, ta sử dụng hàm `dispatch` 

```
impport dataUsers from '../api/datausers';

export const getUsers = () => async dispatch => {
    const response = await dataUsers.get('/users');
     dispatch({
          type: 'GET_USERS',
          payload: response 
     });
};    
```


### 3. Kết luận

* Redux Thunk là một Middleware cho phép bạn viết các Action trả về một function thay vì một plain javascript object bằng cách trì hoãn việc đưa action đến reducer.
* Redux Thunk được sử dụng để xử lý các logic bất đồng bộ phức tạp cần truy cập đến Store hoặc đơn giản là việc lấy dữ liệu như Ajax request.

Đến đây có lẽ các bạn đã hiểu được mục đích của Redux Thunk được sử sụng trong các dự án rồi, ở kỳ tới chúng ta sẽ cùng nói kỹ hơn về Async Action với Redux Thunk, hẹn gặp lại ở bài viết tới.

*Tham khảo*
https://medium.com/@User3141592/understanding-the-redux-thunk-source-code-b3f8b930faf6