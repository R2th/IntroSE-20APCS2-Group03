Vấn đề về hiệu năng các ứng dụng viết bằng React Native là một vấn đề khá lớn. Vì nếu bị giật lag, chậm trong quá trình sử dụng chắc chắn người dùng sẽ ko muốn động vào ứng dụng của chúng ta lần thứ 2. Trong bài viết lần này chúng ta sẽ cùng nhau tìm hiểu một số cách cải thiện hiệu năng của app nhé :D


### Không xử lý một công việc tốn nhiều thời gian ở constructor
Nếu bạn thực hiện một công việc gì đó quá tốn thời gian ở constructor thì việc khởi tạo class component sẽ lâu, do đó việc render view cũng bị chậm lại => đương nhiên app của chúng ta trông sẽ bị giật rồi :D
```javascript
class MyFavoriteComponent extends Component {

    constructor(props) {
        super(props)
        performSomeLongRunningOperation();
    }
    
}
```

Chú ý: Không chỉ trong constructor, mà chúng ta cũng ko nên thực hiện một công việc quá lâu trong `componentWillMount`, chúng ta nên để chúng vào trong `componentDidMount` nhé, khi mà các view đã được render xong :D


### Không nên sử dụng functional props
Chúng ta xem xét ví dụ sau
```javascript
class MyComponent extends Component {
    
    render() {
        return (
            <SomeComplexComponent
                prop1="Hey, I'm prop1"
                prop2="Hey, I'm prop2"
                onPress={(id) => doSomething(id)}/>
        );
    }
    
}
```

Chúng ta nhìn đoạn code trên có thể rất bình thường, tuy nhiên khi mỗi lần render lại MyComponent trên, thì SomeComplexComponent cũng sẽ bị render lại, mặc dù các props của chúng ko thay đổi. Nguyên nhân chính là trong `onPress` đang có một `arrow function`. Mỗi lần `render()` của MyComponent được gọi, thì một reference mới của `onPress` sẽ được tạo ra, điều này dẫn đến  SomeComplexComponent sẽ bị render lại. Rõ ràng điều này là ko cần thiết.

Để tránh điều đó, chúng ta sẽ làm như sau
```javascript
class MyComponent extends Component {
    
    render() {
        return (
            <SomeComplexComponent
                prop1="Hey, I'm prop1"
                prop2="Hey, I'm prop2"
                onPress={this.doSomething}/>
        );
    }

    doSomething = (id) => {
        this.setState({selectedId: id});
    }
}
```
Rất đơn giản phải không các bạn :D


###  Sử dụng PureComponent hoặc shouldComponentUpdate
Khi sử dụng `PureComponent` thì mỗi lần state hoặc props không có sự thay đổi nào thì sẽ không render lại component.

Còn nếu bạn muốn kiểm soát được các props và state thì hãy sử dụng `shouldComponentUpdate` 

```javascript
shouldComponentUpdate(nextProps, nextState){
    return (nextProps.title !== this.props.title || nextProps.description !== this.props.description || nextProps.imageUrl !== this.props.imageUrl)
}
```

Như ví dụ ở trên, component sẽ được render lại khi một trong 3 props `title, description, imageUrl` thay đổi.

Chú ý: Bạn chỉ có thể sử dụng 1 trong hai cách trên cho cùng 1 component thôi nhé :D


### Sử dụng Native Drive cho các Animations trong ứng dụng
Trong react chúng ta có 2 kiểu animations:
1. JS based: chúng ta sẽ thực hiện mọi việc qua JS thread và chỉ dispatch frame cuối cùng cho native.
2. Purely Native: chúng ta sẽ đưa hết thông tin về animation cho native, do đó việc xử lý sẽ do trực tiếp qua native => như vậy chắc chắn sẽ mượt hơn rồi :D

Ví dụ:
```javascript
Animated.timing(zoom, {
            toValue: 1,
            duration: ScoreConst.DURATION.OUT / 2,
            easing: Easing.ease,
            useNativeDriver: true // thêm dòng này nhé
          })
```


### Một số chú ý khác
1. Chúng ta hãy sử dụng `Flatlist` thay cho `ListView`
2. Remove console khi release, các bạn có thể sử dụng [transform-remove-console](https://www.npmjs.com/package/babel-plugin-transform-remove-console)  để có thể tự động xoá tất cả các log, bao gồm cả log trong thư viện.
3. Chỉ import thư viện kiểu khi cần sử dụng.
4. Thỉnh thoảng chúng ta hãy sử dụng các công cụ cho native để xem các vấn đề về CPU, memory, Flow View,... của app mình nhé :D

#### Cảm ơn các bạn đã đọc bài viết. Happy coding!