Như trong một bài [blog](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props) của React có một số  ` lifecycle methods` sẽ bị `deprecation` . Trong số đó có các method như ở dưới đây : 

```
componentWillMount

componentWillReceiveProps

componentWillUpdate
```

Nếu các bạn đã từng dùng React từ version 16.3 trở xuống thì chúng ta sử dụng rất nhiều method `componentWillReceiveProps` .

Nói  sơ qua về method  `componentWillReceiveProps` thì mục đích chính là để `Updating state based on props` với param truyền vào của method  là `nextProps` 

VD :
```

componentWillReceiveProps(nextProps){
  if(nextProps.someValue!==this.props.someValue){
    //Perform some operation
    this.setState({someState: someValue });
    // ....
  }
}
```
Logic của đoạn code trên chúng ta sẽ compare `nextProps.someValue` với  `this.props.someValue` nếu cả 2 khác nhau thì sẽ lấy data của nextProps set lại cho `state` , sau đó sẽ xử lý logic ở dưới tiếp .

Về bản chất thì  chức năng và cách hoạt động của `componentWillReceiveProps`  không có gì sai , nhưng sai ở chỗ chúng ta dùng param của function đó sai mục đích . 

Một số nguyên nhân dưới đây : 
 +  `componentWillReceiveProps`  sẽ không được gọi khi  initial render . Việc  `setState` cần được set trong contructor khi component được init . 
 +  `componentWillReceiveProps`  sẽ call mỗi khi nhận được `new Props` . Vì thế nó sẽ `setState` lại bất cứ khi nào có `props` thay đổi mặc dù có thể data của props để `setState` không thay đổi
 +  `componentWillReceiveProps` là **synchronous** nhưng `setState()` **asynchronous**  . Điều gì sẽ xảy ra khi một hàm **synchronous** call nhiều lần để xử lý hàm **asynchronous** 
 
 Vì thế `getDerivedStateFromProps` sinh ra để xử lý nhưng problem trên 
 
`getDerivedStateFromProps` là một `static` method  **asynchronous** , nó sẽ không cần bất cứ điều kiện render nào  .
Nó sẽ call mỗi khi  `component created `hoặc mỗi lần khi thay đổi  `props` hoặc `state` . 

`getDerivedStateFromProps` sẽ return `new state ` ngược lại nếu  `state` không thay đổi sẽ return `null` 

Nói thêm do `getDerivedStateFromProps` là `static` method nên bạn không thể call `this` bên trong method này  hay đơn giản là bạn không thể call function `setState() `ở đây do không có `this` .
Vì thế bạn cần kết hợp với `componentDidUpdate` để `setState` 

 VD  : 
 ```
static getDerivedStateFromProps(nextProps, prevState){
   if(nextProps.someValue!==prevState.someValue){
     return { someState: nextProps.someValue};
  }
   return null;
}

componentDidUpdate(prevProps, prevState) {
  if(prevProps.someValue!==this.props.someValue){
    //Perform some operation here
    this.setState({someState: someValue});
  
  }
}
```

Một câu hỏi đặt ra tại sao trong `getDerivedStateFromProps` không truyền thêm param 
`previous props` ? 
 
 Bởi vì 2 lý do sau : 
 + Khi lần đầu tiên `getDerivedStateFromProps` invoke thì `previous props` khi đó sẽ null , nhưng `getDerivedStateFromProps` requiring check   `if-not-null`
 + Là bước để `freeing up memory` trong React . Nếu không truyền `previous props` vào trong param thì React sẽ không cần để keep `props` trong memory  .

Trên đây mình đã giới thiệu về `getDerivedStateFromProps` 

Cảm ơn các bạn đã theo dõi ! 

Ref : 

https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
https://medium.com/hackernoon/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607