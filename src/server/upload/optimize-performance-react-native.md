Hầu hết các thiết bị điện thoại hiện nay đều rất phát triển, sử dụng CPU đa lõi với nhiều Ram.Các thiết bị này giúp cho việc xử lí ứng dụng nhanh hơn trước đây rất nhiều, nhưng vấn đề về performance là vấn đề khiến cho developer cần chú trọng.

Dưới đây là những chia sẻ của mình tìm hiểu và rút ra được từ những project cá nhân về việc tối ưu hoá performance trong React Native .


# 1.  Đặt key mỗi items trong List
Khi sử dụng List để hiện thị danh sách, nếu bạn không thêm khoá cho mỗi mục trên list, react sẽ re-render tất cả các đầu mục item dù chỉ một hay một vài mục nào đó thêm hay xoá khỏi List. Khi có khoá, react sẽ hạn chế re-render lại nó hơn.

# 2. Show một list dữ liệu lớn
Trong Document của React Native, người ta khuyên dùng, nếu có một mảng dữ liệu lớn, hãy dùng  VirtualizedList, FlatList ,  SectionList.
VirtualizedList là base của FlatList và SectionList. Và nếu bạn có tập dữ liệu bất biến, bạn nên dùng VirtualizedList.

# 3. Sử dụng PureComponent hoặc shouldComponentUpdate
Đã bao giờ bạn sử dụng FlatList cho một danh sách dữ liệu lớn rồi mà vẫn thấy dòng log "xinh đẹp" này xuất hiện trên debugger chưa : 
```
VirtualizedList: You have a large list that is slow to update - make sure shouldItemUpdate is implemented effectively and consider getItemLayout, PureComponent, etc.
```
Mình thì bị mấy lần roài (khoc).

Để tránh được vấn đề này, mình sử dụng  shouldComponentUpdate để check xem khi nào cần re-render lại, để tránh việc render lại quá nhiều lần sẽ bắn ra lỗi đó và force close app.

Tuy nhiên, hãy thận trọng khi sử dụng shouldComponentUpdate trong việc check trường hợp re-render tránh việc ảnh hưởng tới các action khác.

Khác với Component ta vẫn hay dùng, sử dụng PureComponent chúng render view lại khi props thay đổi. Tuy nhiên, hãy linh hoạt và cẩn thận sử dụng chúng để tránh những lỗi liên quan tới props và state.

# 4. Bind sớm hơn và không tạo functions bên trong render
Hồi mới đầu làm việc với React Native, mình đặt các function khá lung tung kiểu thế này 
```
             <TouchableOpacity
              onPress={() => this.onClick()}>
              <Image
                source={Images.on_Click}
                style={{ height: 24, width: 24 }}
              />
            </TouchableOpacity>
```
Hay 
```
            <TouchableOpacity
              onPress={this.onClick.bind(this)}>
              <Image
                source={Images.on_Click}
                style={{ height: 24, width: 24 }}
              />
            </TouchableOpacity>
```

Tuy nhiên, nếu sử dụng như hai cách trên, khi việc render được gọi lại, thì một function mới được tạo.

Vì thế, hãy bind trước và gọi function như sau: 
```
constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    // doing some work here.
  }

  render() {
    return <TouchableOpacity onPress={this.onClick}>onClick</TouchableOpacity>
  }
```

Đối với function có tham số thì dùng như sau: 
```
onClick = (param) => () => {
 console.log(param)
}
<TouchableOpacity onPress={this.onClick(param)}>onClick</TouchableOpacity>
```

# 5. Không update state hoặc dispatch trong componentWillUpdate

Phương thức componentWillUpdate được sử dụng để chuẩn bị cho một sự thay đổi, không kích hoạt một đối tương khác. Nếu bạn muốn set state hoặc dispatch bất kì redux action, hãy viết chúng trong componentWillReceiveProps.

# 6. Tránh sử dụng state bừa bãi
Như đã biết, khi state thay đổi thì component sẽ re-render lại. Vì thế, có những biến chỉ dùng để check thì ta không nên đặt làm state, ví dụ 
```
this.setState({isCheck : true})

if(this.state.isCheck){
//do something
this.setState({isCheck : false})
}
```
Hãy dùng  
```
this.isCheck = true

if(this.isCheck) {
// do something
this.isCheck = false
}
```
Trên đây là chia sẻ của mình về những vấn đề mình gặp phải khi cần tối ưu hoá performance. Cám ơn các bạn đã đọc, rất mong bài viết của mình có thể giúp đỡ phần nào những vướng mắc của các bạn!