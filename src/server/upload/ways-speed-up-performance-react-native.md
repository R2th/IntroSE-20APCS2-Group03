Đối với một số bạn khi mới bắt đầu tìm hiểu hoặc bắt đầu một công nghệ mới thường thường sẽ quan tâm tới performance của ngôn ngữ đó.

Nên nay mình muốn chia sẻ một chút về những cách mà mình đã tìm hiểu được thường dùng để tăng performance ứng dụng React Native, mong là có thể giúp ích được cho các bạn hiểu được performance của React Native app có thể đạt được tới đâu và cũng như có ích giúp các bạn cải thiện performance app hiện tại của các bạn ;), nào cũng bắt đầu nào! 

# 1. Use key attribute on list items 
Đầu tiên mình muốn giới thiệu với các bạn cách đầu tiên đó là sử dụng `Key attribute` trong `list items`(FlatList, ListView, ...). Chắc chắn rồi, bởi vì app nào hầu như cũng đều sử dụng list view vậy nên mình sẽ đưa nó nên đầu tiên. Bạn có bao giờ suy nghĩ là mỗi một item trong list view nên cần có một key riêng biệt để phân biệt không?? Có key trong list view thì có gì khác không?? Sự thật là cần thiết đó nếu bạn không chỉ định một `unique key` cho một item trong list view, React sẽ Rerender tất cả item mỗi khi một item được thêm hoặc xoá đi khỏi list view. Nếu bạn có một unique key cho mỗi item, bạn sẽ không phải tốn tài nguyên để Rerender lại những item không có thay đổi đấy!

```js
class MyComponent extends Component {

    const items = data.map((item) => {
        return <Text key={item.id} style={{color: 'white'}}>item.tile</Text>
    })
    render() {
        return {
            <View style={{flex: 1, backgroundColor: '#6B5B95'}}>
                {items}
            </View>
        }
    }
}
```

# 2. Bind early and don’t create functions inside render.
Nhiều bạn thường viết function trực tiếp trong hàm render() như thế sẽ làm giảm performance của app rất nhiều. Bởi vì render được gọi thường xuyên và mỗi khi bạn gọi một trong hai thứ trên, một hàm mới sẽ được tạo ra => tốn tài nguyên không cần thiết.
```js
<Text onPress={ () => this.doWork() }>Do Some Work</Text>

or

<Text onPress={ this.doWork.bind(this) }>Do Some Work</Text>
```



Thay vì viết như này chúng ta hãy thử những cách sau đây: 

```js
class MyComponent extends Component {

    doWork() {
        //do st
    }
    
    render() {
        return {
            <Text onPress={this.doWork}>Do Some Work</Text>
        }
    }
}
```

hoặc khi bạn muốn truyền params cho function: 

```js
class MyComponent extends Component {

    doWork = (value) => {
        //console.log(value)
    }
    
    render() {
        return {
            <Text onPress={this.doWork(something)}>Do Some Work</Text>
        }
    }
}
```

hoặc sử dụng bind()

```js
class MyComponent extends Component {
constructor(props) {
    super(props)
    
    this.doWork = this.doWork.bind()
}

    doWork = (value) => {
        //console.log(value)
    }
    
    render() {
        return {
            <Text onPress={this.doWork(something)}>Do Some Work</Text>
        }
    }
}
```

# 3. Use VirtualizedList, FlatList and SectionList for large data sets

VirtualizedList, FlatList và SectionList là những API dùng cho việc hiển thị list và sử dụng rất ít bộ nhớ.
Vì vậy khi bạn có hàng trăm item thì bạn sẽ không phải tải 1 lúc tất cả dữ liệu mà hãy nên thiết lập sao khi cuộn xuống cuối màn hình và load thêm item.

Nếu bạn có 1 tập dữ liệu mà sẽ không thay đổi trong khi ứng dụng chạy thì hãy nên sử dụng VirtualizedList thay cho FlastList và SectionList bởi vì cả FlatList và SectionList đều base trên VirtualizedList.

# 4. Don’t update state or dispatch actions in componentWillUpdate

Điều quan trọng nữa đó là bạn nên tìm hiểu về lifecyle của React để nên biết can thiệp vào lúc nào để tăng hiệu suất nhá.

![](https://images.viblo.asia/9799d9ed-7c1c-4e32-a816-f3ac7c6dac70.jpeg)

Chúng ta không nên cập nhật state hoặc dispatch actions bên trong componentWillUpdate bởi vì componentWillUpdate method được sử dụng để chuẩn bị cho bản cập nhật nào đó, không kích hoạt cập nhật khác. Nếu bạn muốn đặt state hoặc gửi bất kỳ actions nào, hãy thực hiện chúng trong componentWillReceiveProps.

# 5. Use PureComponent or shouldComponentUpdate

`PureComponent` trong React không có state, vì vậy chúng chỉ render các component dựa trên dữ liệu được truyền qua props. Nó chỉ được render lại khi và chỉ khi props bị thay đổi.

`shouldComponentUpdate` lại một life-cycle nữa các bạn nên lưu ý, nó được sử dụng trong Component React thông thường để hủy render lại bằng cách trả về false trong các tình huống nhất định.

Các bạn xem qua ví dụ phía dưới để hiểu thêm nhá ;)

```js 
class MyComponent extends React.PureComponent {
    //
}

class MyComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.firstProp === nextProps. firstProp &&
           this.props.secondProp === nextProps.secondProp) {
          return false;
        }
        
        return true
    }
}
```

# 6. Use Perf monitor to watch FPS

FPS(Frames Point Second), các bạn mở developer tools và enable Peft monitor nên và quan sát nhá. Bây giờ khi bạn tương tác với các component như scroll, click, navigation app để xem kết quả nhá, thỉng thoảng bạn sẽ thấy FPS giảm xuống. Chủ yếu là giảm trên javascript thread chứ không phải trên native UI thread.

Vì vậy, hãy bắt đầu tìm kiếm những lỗi khiến FPS đang giảm. Có thể state bị thiết lập sai hoặc gửi các actions ở sai chỗ trong code…. Cũng có thể là bạn đang thực hiện quá nhiều công việc đồng bộ(synchronous) trên JS thread.

![](https://images.viblo.asia/a77d4f26-95fb-49b5-aecf-8efccc31bbc2.png)


# 7. Some Performance Tips
### 1. Eliminate Unnecessary Features
Khi app của bạn có biểu hiện hiển thị chậm, hãy xem xét ngay kiến trúc app của bạn và xoá các dữ liệu không cần thiết, tabs, controls, navigations, or animations ngay nhá, nó quan trọng lắm đấy. `Chỉ nên hiển thị những items có ích cho user`. Những tính năng không cần thiết bạn có thể thêm thời gian hiển thị và làm ảnh hưởng tới trải nghiệm người dùng. Ngoài ra hãy thiết kế app của bạn phù hợp với các thiết kế của các thiết bị khác nhau.


### 2. Avoid Memory Leaks
Bên trong các thiết bị Android, các quá trình chạy bổ xung khi trong background có thể dẫn tới rò rỉ bộ nhớ trong app của bạn. Để dừng những bộ nhớ bị rò rỉ này, hãy tránh sử dụng ListView =)) mà hãy sử dụng FlatList, SectionList, hoặc VirtualListFlatlist, nó sẽ tăng cho ứng dụng của bạn đáng kể hiệu suất đấy.

### 3. Reduce Application Size

Giảm kích thước của ứng dụng có thể cải thiện hiệu suất của ứng dụng đấy. Một vài ứng dụng Javascript yêu cầu sử native component và thirty-party libraries. Nó sẽ làm tăng kích cỡ của ứng dụng nên đáng kể đấy. Để giảm kích cỡ nên sử dụng những component cần thiết, tối ưu lại các component đó, có thể sử dụng ProGuard để làm giảm kích cỡ đồ hoạ của bạn. Mình để ý thì font chữ, font icon rất nặng nên các bạn tránh sử dụng nhiều font nhá.

### 4. Reduce the Load on the Bridge

Trong React native Javascript và code native được kết nối với nhau thông qua Bridge. Vậy để đảm bảo hiệu suất tốt hơn, hãy giảm tải trên Bridge để trao đổi thông tin liên lạc mượt mà hơn. Điều này có thể được thực hiện bằng cách hãy nghiên cứu tính tin cậy của libraries mã nguồn mở trước khi sử dụng chúng và tránh các hành động di chuyển các components trên luồng chính vì việc sử dụng các message queues nặng để kết nối với phía Native.

### 5. JSON Conversion

Trong ứng dụng Javascript, dữ liệu Json được lấy chậm, mà khi devices yêu cầu lấy dữ liệu từ 1 URL(gọi là xa xôi đi) và dữ liệu được truy xuất này trở lại dưới dạng Json. Để tránh tình trạng tải chậm, hãy sử dụng dữ liệu dạng Json.

### 6. Improve App Launch Time
Khi ứng dụng của bạn chạy quá chậm, nó có thể bị dừng và làm trải nghiệm của user giảm xuống. Một yếu tố có thể ảnh hưởng đến thời gian khởi chạy của ứng dụng là Object.finalize. Finalize chạy trên một chuỗi và có thể gây ra thông báo lỗi cho biết ứng dụng của bạn đã hết bộ nhớ khi mà dữ liệu chưa tải xong. Điều này có thể dẫn đến thời gian khởi chạy chậm hơn. Tránh sử dụng Object Finalizers và chạy component chính trên luồng chính.

### 7. Screen Orientation
Một số ứng dụng React sẽ thoát khi định hướng của màn hình bị thay đổi từ portrait sang landscape. Các bạn có thể tưởng tượng như khi chơi game, chụp ảnh, xem phim,.. chúng ta thường hay xoay màn hình từ dọc tới ngang để thích hợp với tình huông nhất. Giải pháp cho vấn đề này là bạn có thể sử dụng `react-native-orientation` nhưng library này lại không support với thiết bị iOS 

### 8. One Thread at a Time
React Native có thể chỉ support 1 thread trong 1 lần. Để tránh crashes hoặc slowdowns, chỉ render 1 service và sau đó xử lý các luồng tiếp theo. Ví dụ, dịch vụ như chat và camera không thể render cùng 1 lúc với nhau trên React Native

### 9. Correct Use of Images
Trong React Native, điều quan trọng là sử dụng image caching để tải hình ảnh nhanh hơn. Mặc dù image caching không có sẵn trong thiết bị Android, nó chỉ hỗ trợ cho iOS. Tuy nhiên tính năng này lại rất tốt để load hình ảnh được nhanh hơn. Thỉnh thoảng khi 1 trang đã refesh những hình ảnh bị lỗi cũng sẽ được refesh lại. Ngoài ra, khi đang caching thì vấn đề đang diễn ra ở bên phía Javascript, ứng dụng sẽ hoạt động chậm hơn. Nó cũng rất cần thiết cho bạn để sử dụng hình ảnh dễ dàng cho ứng dụng của bạn để làm việc hơn. 

Nên convert imgae PNG trước khi sử dụng và đảm bảo chúng là những hình ảnh nhỏ hơn và lưu chúng dưới dạng định dạng WebP. Chỉ với những chi tiết nhỏ này mà sẽ có tác động mạnh đến tốc độ hiệu suất ứng dụng của bạn đó.

### 10. Efficient Use of Maps

Sử dụng Navigation trong React Native có thể sẽ khó sử dụng/di chuyển và làm chậm. Để tăng tốc performance của bạn, hãy xoá hết các console.log khi bạn merge với 1 library maps nào đó từ app. Điều này ngăn ứng dụng tiết kiệm thông tin trong Xcode và tự động cập nhật bản đồ của bạn, dẫn đến làm chậm navigation. 

### 11. Avoid Unnecessary Re-Rendering
Lạm dụng render componet của bạn quá nhiều cũng có thể làm chậm hiệu suất app của bạn. Để làm giảm số lượng hiển thị này, nên sử dung shouldComponentUpdate đê chỉ render khi cần thiết.

### 12. Use Simple Selectors

Các vấn đề về performance có thể nảy sinh khi những lựa chọn của bạn buộc phải thực hiện nhiều phép tính cùng một lúc. Bạn có thể ngăn điều này xảy ra bằng cách lưu trữ dữ liệu chỉ được sử dụng trong kho lưu trữ Redux, sử dụng thư viện và thực hiện phản hồi ngược trong một service. Khi đang request data tránh thực hiện thường xuyên nếu dữ liệu không thay đổi. Điều này có thể làm chậm ứng dụng của bạn. 


### 13. Calculator Performance for speed code Javascript
Tiêu chuẩn cơ bản của hiệu suất là 60 fps (60 khung hình trên giây) cũng giống như (24 khung hình trên giây của video ấy), bạn không thể giữ hiệu suất lúc nào cũng trong tiêu chuẩn này được, cùng tìm hiểu vì sao nhá:

```
1 second = 1000 milliseconds
1000/60 = ~16.6 milliseconds
```

Vì vậy bạn có khoảng ~16,6ms để hiển thị 1 khung hình, để ứng dụng của bạn trở nên mượt mà.
Ứng dụng bắt đầu có vẻ giật lag khi fps giảm xuống dưới 30fps

```
1000/30 = ~ 33,3 mili giây
```

Vậy việc bạn cần làm là làm sao để nó từ 30fps nên tới 60fps. Có thể bạn đang tính toán cái gì đó nên làm chậm tốc độ xử lý.

Bài viết của mình tới đây là hết, mong những tips phía trên có thể giúp app của các bạn chạy được mượt mà hơn :D, Thanks!!!


Tài liệu tham khảo: 

https://medium.com/@jigneshthanki/top-12-performance-tips-for-react-native-application-development-c4452a28af4

https://codeburst.io/6-simple-ways-to-speed-up-your-react-native-app-d5b775ab3f16