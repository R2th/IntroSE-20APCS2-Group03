![](https://images.viblo.asia/b79eb09e-a988-4f55-b8b0-a14a1ef7f19d.png)


Xin chào các bạn, cũng khá lâu rồi mới quay lại với series React JS của mình. Ngày hôm nay mình sẽ chia sẻ về Redux. Một công cụ giúp chúng ta quản lý state trong ứng dụng của mình. (Redux không chỉ sử dụng với ReactJS đâu nhé mà có thể sử dụng với React Native, Angular hay các thư viện framework khác của Javascript... ). Chúng ta cùng đi vào bài viết ngay thôi !

# 1. Tại sao dùng Redux. 
Chắc hẳn các bạn cũng biết, chúng ta có thể quản lý state thông qua việc sử dụng useState() ở trong các bài viết về ReactJS mình cũng đã có nói. ([xem ở đây](https://viblo.asia/p/reactjs-hooks-trong-functional-components-OeVKBnxyKkW#_usestate-2) ). Vậy tại sao chúng ta lại cần tới một thư viện Redux để quản lý state làm gì cho mệt mỏi. 

Tưởng tượng bạn có một ứng dụng với nhiều Components cha conlồng nhau. Muốn thay đổi state của Component con,  thì chúng ta phải truyền xuống thông qua props. Nhưng vấn đề là đối với một ứng dụng lớn , khi chúng ta có quá nhiều Components phải truyền xuống nhiều cấp như thế, hay việc truyền state cho các Components họ hàng =))  thì việc quản lý state thực sự là một cách khó khăn, rối rắm hay phát sinh ra bugs. Vậy redux sinh ra để giúp chúng ta để giải quyết vấn đề đó. Với việc chúng ta sẽ có riêng một kho lưu trữ dùng chung cho các Component.


Với redux, có 3 nguyên lý chính theo tài liệu chính thức có ghi : 

> 1. Single source of truth
> 
> 2. State is read-only
> 
>3.  Changes are made with pure functions


**Single source of truth:** Với redux, mỗi ứng dụng sẽ có một nguồn state tin cậy duy nhất đấy là store. Với cách triển khai này, việc quản lý state trở nên đơn giản hơn khi state được tập trung lưu trữ tại store và lấy ra một cách dễ dàng. Không chỉ việc lấy ra dễ dàng mà việc debug khi phát sinh lỗi cũng nhanh chóng hơn. 

**State is read-only**: Với redux, nhà phát triển đã có một cái nhìn giống với cách lập trình hướng đối tượng triển khai (tính đóng gói) đấy là việc state chỉ có thể đọc chứ không thể trực tiếp thay đổi. Một khi chúng ta muốn thay đổi state phải thông qua việc emit (phát ra) một action để thay đổi state. 

   **Changes are made with pure functions**: Các thay đổi được tạo bởi những function  thuần túy. Pure functions (các hàm thuần tuý) là những hàm mà không phụ thuộc vào biến bên ngoài, chỉ phụ thuộc vào biến được truyền vào nó. Với pure functions dùng trong redux, theo mình hiểu nó cũng thể hiện việc ```single source of truth``` khi chúng ta có thể đảm bảo state thay đổi và chúng ta có thể biết chính xác được kết quả thay đổi của chúng chứ không phụ thuộc vào biến bên ngoài. 
   
 # 2. Những khái niệm chính : 
Với redux, chúng ta sẽ đi vào từng khái niệm dưới đây : 
![](https://images.viblo.asia/5c4fcefb-886d-4048-b164-3e781dcc813f.gif)

Nhìn trên hình trên các bạn cũng có thể thấy chúng ta có Actions, Store, State , Reducers, ngoài ra có thêm phần middlewares tuy nhiên ở mức cơ bản nhất chúng ta sẽ cần học 4 thứ trên đầu tiên.  Với views chính là phần hiển thị UI tương tác với người dùng. 
Flow sẽ là : 

### State: 
State thì chắc chẳng còn xa lạ gì, nó chính là những trạng thái trong ứng dụng. Có thể là trạng thái của loading, hay dữ liệu để hiện thị ra view ...
VD Code : 

```js 
    const notiState = [{
        id: 1, 
        noti: 'Example notification',
        read: false,
    }, {
        id: 2, 
        noti: 'Example notification',
        read: true,
    }]
```


### Action 
Với mỗi khi muốn thay đổi state hay việc người dùng tương tác qua view để thực hiện một hành động (VD như đọc thông báo rồi đánh dấu nó đã đọc), khi đấy từ Views sẽ thực hiện bằng cách dispatch một action có nhiệm vụ là báo cáo cho store để biết được đây là hành động đánh dấu thông báo là cái đã click vào và store sẽ đưa qua Reducer xử lý, Ok vậy  chúng ta có thể khai báo actions bằng cách : 
```js
const markRead = (payload) => { 
    type : 'noti/MARK_READ',
    payload : payload
};
```

Thực hiện dispatch action :
```js 
store.dispatch(
    markRead({ id: 1})
); 
```
### Reducer
Thông qua việc dispatch action trên chúng ta sẽ tới Reducer. Reducer có nhiệm vụ xử lý  match action và thay đổi state như thế nào . Ở dưới đây mình tạo ra một reducer cho notify. Khi đó khi action được dispatch có type trùng với từng case của reducer thì sẽ thực hiện những thay đổi cho state tương ứng. Dưới đây là việc thay đổi thông báo chưa đọc thành đã đọc.

```js
const notifyReducer = (state = notiState, action) => {
    switch (action.type) {
    case 'noti/MARK_READ':
        let newState = state;
        objIndex = newState.findIndex((obj => obj.id === action.payload.id));
        newState[objIndex].read = true
        
      return newState
    default:
      return state
  }
}
```
CUối cùng chúng ta sẽ tạo ra store : 

### Store: 
Store là nơi lưu trữ tập trung của tất cả các state trong ứng dụng sử dụng Redux.  Như chúng ta thấy trong hình trên store sẽ chứa state, với một store chúng ta có thể lấy state ra bằng cách sử dụng getState() để hiển thị ra Views; Để tạo một store chúng ta sử dụng ```createStore``` của Redux.  
```js
const store = createStore(notifyReducer)
```
Vậy chúng ta có thể thực hiện được chức năng đánh dấu đã đọc cho thông báo thông qua việc sử dụng redux để hiểu được cách hoạt động của redux. 

# 3. Kết luận : 
Như vậy thông qua bài viết, mình đã trình bày một số khái niệm quan trọng hay cốt lõi của Redux. Với kiến thức cơ bản đó hi vọng có thể giúp ích cho mọi người sử dụng được trong việc phát triển hay xây dựng ứng dụng của mình . Ngoài những phần trên cũng có một phần rất quan trọng của redux là middleware, đây là phần để tương tác với API trong redux. Hy vọng nếu có thời gian mình sẽ viết tiếp về middleware trong redux. Hẹn gặp lại mọi người trong những bài viết tiếp theo. Xin cảm ơn mọi người đã theo dõi đến hết bài viết !!