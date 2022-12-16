Hôm trước lướt trên một group về React Native, mình thấy có một bài thảo luận về `componentWillReceiveProps` và `getDerivedStateFromProps` khá sôi nổi. Có rất nhiều quan điểm đưa ra, `componentWillReceiveProps` đang dùng thoả mái, `getDerivedStateFromProps` lạ quá mà có vẻ khó dùng,... tự dưng khiến mình nổi hứng viết một bài bàn về chủ đề này :D.

![](https://images.viblo.asia/1317854c-cf25-4e4e-bcc9-13de6a63e0e9.png)
# 1. Update component
Như ta đã biết, khi props hoặc state thay đổi vì bất cứ lí do gì, thì lúc đó component được update lại.

Các hàm được gọi khi có sự thay đổi đó là 
1. componentWillReceiveProps ( function mới thay thế là getDerivedStateFromProps)
2. shouldComponentUpdate
3. componentWillUpdate
4. render
5. componentDidUpdate

Hôm nay mình sẽ đi sâu và phân tích về hàm `componentWillReceiveProps` và hàm mới thay thế cho nó là hàm `getDerivedStateFromProps`

# 2. Giới thiệu

- React 16.3 đã giới thiệu 1 function mới trong vòng đời đó là `getDerivedStateFromProps`
-  Nó thay thế `componentWillReceiveProps`, bắt đầu từ React 17 sẽ không còn hỗ trợ nữa bởi đôi khi bị sử dụng sai và không phù hợp với [rendering đồng bộ](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html).

# 3. So sánh
1. Cách sử dụng
Ví dụ: 
```
 componentWillReceiveProps(nextProps){
  if(nextProps.someValue!==this.props.someValue){
    //Perform some operation
    this.setState({someState: someValue });
    this.classMethod();
  }
}
```

```
static getDerivedStateFromProps(nextProps, prevState){
   if(nextProps.someValue!==prevState.someValue){
     return { someState: nextProps.someValue};
  }
  else return null;
}
```

Ở `getDerivedStateFromProps`, bạn có thể access cả với nextProps và prevState trước đó mà với `componentWillReceiveProps` bạn chỉ có thể so sánh với nextProps.
Khi có sự thay đổi, sau khi đã handle return newState, bạn có thể dùng hàm `getDerivedStateFromProps` để handle thêm việc sau khi update new state.

2. Một chút kinh nghiệm cá nhân

Theo kinh nghiệm của mình khi làm việc với hàm cũ nhận thấy: 
- Đôi khi, trong component đó có quá nhiều props, sự so sánh props (đặc biệt là so sánh array) đó không chuẩn cho nhiều TH, dẫn tới handle sai. Như ví dụ trên, nếu so sánh 2 array như thế ( !==) sẽ k chuẩn 
- Không chỉ thế, càng nhiều props, nhiều trường hợp check khi props thay đổi, code càng nhiều lên và khi maintain thì ôi thôi... (khóc thầm...).


Còn đối với hàm mới thì: 
- Có vẻ clear hơn, dễ nhìn hơn, tuy nhiên lúc đầu tiếp cận còn hơi lạ.
- Nhưng việc check nextProps với this.props và cả state có vẻ dễ dàng hơn nhưng ta vẫn phải chắn chắn đang handle đúng case, bởi có nhiều nguyên nhân dẫn tới change props và state ta không nghĩ tới.
Vì vậy, hãy dùng đến hàm này khi cần thiết nhất.

# 4. Kết luận
Trên đây là một vài chia sẻ của mình về điểm mới ở vòng đời của component.
Theo cá nhân mình thì react native thi thoảng lại có chút biến đổi, tuy nhiên cũng là một điều tốt để hoàn thiện hơn những phiên bản cũ nhưng đôi khi cũng là trở ngại cho những người tiếp cận nó. Vì vậy, chúng ta hãy luôn luôn cập nhật, so sánh, đánh giá để sử dụng sao cho hợp lí nhất, tốt nhất trong bài toán, project của mình.

Chúc các bạn happy coding :D