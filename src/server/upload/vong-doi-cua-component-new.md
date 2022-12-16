Gần đây, vấn đề mình thường thấy rất khó khăn nhất khi làm project đó chính là performance. Vì vậy, mình có tìm hiểu lại vấn đề và thấy việc sử dụng vòng đời của Component là một vấn đề không hề nhỏ.  Vậy nên, trong bài viết này, mình sẽ trình bày kĩ về vòng đời và từng lưu ý khi sử dụng chúng. 

Dưới đây là sơ đồ về vòng đời Component được cập nhật mới nhất, mình xem được ở [link](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).
![](https://images.viblo.asia/1317854c-cf25-4e4e-bcc9-13de6a63e0e9.png)


Đầu tiên, mình sẽ đi sơ qua về từng method: 
# 1. constructor 
```
constructor(props) {
  super(props);
  // Don't call this.setState() here!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```
- Hàm này có vẻ rất quen thuộc và không có gì thay đổi.
- Hàm này có 2 mục đích chính đó là : 
1. Khởi tạo state
2. Binding event handler 
- Nên call super(props) trước khi khởi tạo các state hay binding action.
- Lưu ý, một số bạn code như thế này: 
```
constructor(props) {
 super(props);
 // Don't do this!
 this.state = { color: props.color };
}
```
Việc viết như thế này có thể gây ra lỗi, vì vậy hãy sử dụng this.props.color. 
Bạn chỉ dùng props.color nếu bạn muốn bỏ qua bản cập nhật khác về props.

# 2. getDerivedStateFromProps
- Có lẽ bạn nào có cũng thắc mắc như mình, hình như hàm getDerivedStateFromProps có vẻ như thay thế hàm componentWillReceiveProps.
- Tuy nhiên, hàm này có đôi chút khác biệt, hàm này được gọi trước khi render bao gồm cả lúc khởi tạo và cập nhật, nó sẽ trả về một đối tượng để cập nhật trạng thái hoặc return null nếu không muốn cập nhật trạng thái.
```
static getDerivedStateFromProps(nextProps, prevState){
   if(nextProps.someValue!==prevState.someValue){
     return { someState: nextProps.someValue};
  }
  else return null;
}
```

# 3. shouldComponentUpdate
```
shouldComponentUpdate(nextProps, nextState)
```
- Hàm này được gọi trước khi state hoặc props mới được nhận.
- Hàm không được gọi khi khởi tạo render hay khi sử dụng forceUpdate().
- Nếu hàm này return true thì re-render và ngược lại. Defaults là true.
- Nhiều trường hợp, dựa và nextProps, nextState để check state và props hiện tại, để tránh việc re-render lại nhiều lại gây ra khá nhiều lỗi không lường trước được, nếu component đó có khá nhiều state và props mà bạn không check được hết các trường hợp đó.Việc sử dụng hàm này là khá thận trọng và dùng tốt hơn đối với trường hợp component có ít state và props, và thường kiểu của state và props và number và string. Mình cũng dính vào vấn đề check đối với props kiểu object, mặc dù props có thay đổi, nhưng khi so sánh props new và old thì giá trị như nhau, do lúc đó, nó đều trỏ đến cùng 1 reference. 
- Vì vậy, hãy thận trọng khi sử dụng hàm này để sử dụng chúng được tốt nhất.
- Hoặc có thể cân nhắc việc sử dụng PureComponent thay thế việc viết hàm này, nếu bạn không chắc chắn cho việc compare các props , state của mình.
- Ngoài ra, không nên sử dụng JSON.stringify() để so sánh vì nó sẽ gây ảnh hưởng tới hiệu suất.

# 4. render 
```
render(){
  return <View/>
}
```
- Đây là hàm cần thiết duy nhất để render ra view của một component.
- Hàm này sẽ không được gọi lại nếu hàm shouldComponentUpdate() return false.
- Không được setState ở hàm này vì sẽ gặp ra vòng lặp vô hạn.

# 5. getSnapshotBeforeUpdate
```
 getSnapshotBeforeUpdate(prevProps, prevState)
```
- Hàm này chạy ngay trước khi hàm componentDidUpdate chạy.
- Hàm này sử dụng ít phổ biến, nó có thể sử dụng trong trường hợp màn Chat cần cuộn tới vị trí đặc biệt nào đó.
- Hàm này phải return về một giá trị snapshot hoặc null.

# 6. componentDidUpdate
```
componentDidUpdate(prevProps, prevState, snapshot)
```
 - Hàm này được gọi ngay sau khi việc update xảy ra. 
 - Hàm này không gọi cho việc khởi tạo.
 - Ở hàm này, có thể lấy được props và state trước đó để so sánh với props và state hiện tại. 
 - Hàm này có thể dùng được setState, tuy nhiên nếu sử dụng setState thì nên đặt trong một điều kiện, nếu không, nó sẽ trở thành vòng lặp vô hạn: 

```
componentDidUpdate(prevProps) {
  //Don't forget use wrapped in a condition
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```
# 7. componentDidMount
```
componentDidMount()
```
 - Hàm này gọi ngay sau khi component được hiển thị. 
 - Hàm này thường được dùng để đăng kí ( Tuy nhiên, nếu đăng kí thì trong hàm componentWillUnmount thì phải huỷ đăng kí) , fetch data... 
 - Ngoài ra, ta có thể setState, tuy nhiên, một số state khởi tạo thì hãy viết ở constructor,ngoài một số trường hợp ngoại lệ để tránh ảnh hưởng về performace.
 

- Có một lưu ý là, hàm này sẽ không được gọi nếu hàm shouldComponentUpdate() return false.

# 8. componentWillUnmount 
```
componentWillUnmount()
```
- Hàm này được gọi trước khi component destroy.
- Thực hiện bất kì việc dọn dẹp trước khi component destroy : huỷ đăng kí sự kiện, cancel request, cancel time,...
- Không gọi setState trong hàm này vì hàm này được gọi tức là component được destroy nên không còn việc re-render được gọi lại.


Trên đây là những chia sẻ của mình về vòng đời của component được update mới nhẩt và những lưu ý khi sử dụng các hàm, mong có thể giúp bạn tham khảo phần nào và rất mong có những ý kiến đóng góp để mình hoàn thiện hơn bài viết.

Cám ơn các bạn đã đọc!

Tài liệu tham khảo : https://reactjs.org/docs/react-component.html