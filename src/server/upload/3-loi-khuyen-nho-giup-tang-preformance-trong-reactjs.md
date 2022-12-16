`ReactJS`, một từ khóa đã quá quen thuộc với tất cả chúng ta. Khi bắt đầu với nó thì chúng ta hầu như không để ý nhiều đến việc performance như thế nào cả! Kiểu nó chứ chạy là được rùi hoặc là "uk thì mình cứ cho nó chạy trước đã rùi performance gì gì đó thì tính sau, mà thấy nó vẫn nhanh mà" :blush:. Để rồi những suy nghĩ như vậy có thể sẽ mang lại những hậu quả không nhỏ. Nếu app của chúng ta chỉ là app nhỏ hoặc đơn giản dùng để test thôi chẳng hạn thì việc performance cũng không quá quan trọng. Nhưng khi app của chúng ta lơn hơn theo từng ngày thì việc xử lý performance mang lại hiệu quả không ngờ. Sau đây mình xin phép chia sẻ một số lời khuyên nhỏ giúp chúng ta cải thiện performance trong `ReactJS`.

# 1. Sử dụng những kỹ thuật mà ReactJS cung cấp cho chúng ta.
Khi viết framework `ReactJS` thì những nhà phát triển đã luôn lường trước những vấn đề liên quan đến performance. Nên đi kèm với việc hướng dẫn chúng ta làm sao sử dụng `ReactJS` thì song song đó họ cũng khuyển cáo chúng ta là nên sử dụng cái gì và như thế nào để đạt performance cao nhất.

Dưới đây là 3 kỹ thuật đó:

- `React.PureComponent`
- `shouldComponentUpdate`
- `memo`

Trong đó thì `React.PureComponent` có thể được sử dụng trong class-based component, `shouldComponentUpdate` trong lifecycle hook và `memo` là một HOC (Higher-Order Component) dùng khi wrap function component. Nếu sử dụng những kỹ thuật trên thì bạn có thể làm cho component của mình chỉ update khi mà props của nó thay đổi (state mình chưa đề cập ở đây).

Và khi sử dụng 3 kỹ thuật trên hãy tạo thói quen là chia component của mình nhỏ nhất có thể (theo ý của từng người nhé, nhỏ quá thì có thể bỏ qua vụ performance), chính xác và linh hoạt. Mặc dù chỉ là một ít của một ít thôi nhưng khi gom lại chúng ta sẽ có 1 nền tảng vững chắc. Cũng giống như việc xây nhà vậy, để bạn xây nên một căn nhà bền đẹp thì những thành phần nhỏ cấu thành ngôi nhà đó cũng phải như vậy.

```javascript
// Desk.js
export default function Desk(props) {
    return (
        <div>
            <Book amount={props.bookAmount} />
            <Pen amount={props.penAmount} />
            <DeskLamp amount={props.deskLampAmount} />
        </div>
    )
}

// Book.js
export default class Book extends React.PureComponent {
    render() {
        return <div>Book: {this.props.amount}</div>
    }
}

// Pen.js
export default class Pen extendx React.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.amount !== nextProps.amount
    }

    render() {
        return <div>Pen: {this.props.amount}</div>
    }
}

// DeskLamp
export default memo(function DeskLamp(props) {
    return <div>DeskLamp: {this.props.amount}</div>
})
```

Một chú ý nhỏ nữa là hãy dùng một là `React.PureComponent` khi bạn sử dụng class-based component và `memo` cho function component. Còn `shouldComponentUpdate` thì chúng ta dùng `React.PureComponent` thay thế luôn sử dụng `shouldComponentUpdate` để handle có thể gây bug không mong muốn.

# 2. Tránh sử dụng `inline object`.
`inline object` trong `ReactJS` thì đúng là như cơm bữa vậy =)). Vì vậy hãy tránh sử dụng nó.

Việc sử dụng `inline object` khi trong lúc truyền vào props sẽ khiến cho `React` hiểu là nó sẽ là một thể hiện mới vào mỗi lần render. Việc đó khiến mỗi lần component mà nhận được object prop thì là một lần nhận được một prop hoàn toàn mới, nó sẽ làm 3 kỹ thuật chúng ta nói ở trên chở nên vô nghĩa (`React` chỉ sử dụng shallow compare giữa props và nextProps). 

Nó giống kiểu chúng ta muốn truyền một object style xuống chẵng hạn
```javascript
<Component style={{ color: 'white' }} />
```

```javascript
// Đừng dùng như dưới
function Foo(props) {
    return <Bar style={{ color: 'white' }} />
}

// Hãy dùng như dưới
function Foo(props) {
    const style = { color: 'white' }
    
    return <Bar style />
}

memo(function Bar(props) {
 return <div style={props.style}>Bar</div>
})
```

# 3. Tránh sử dụng anonymous function.

Việc sử dụng `anonymous function` cũng có giải thích tương tự như việc sử dụng `inline object`. Nó cũng khiến `React` hiểu rằng nó là một thể hiện hoàn toàn mới.

Trong trường hợp này hãy định nghĩa function đó rồi đưa vào props khi bạn sử dụng class-based component và sử dụng `useCallBack` khi bạn sử dụng function component.

Dĩ nhiên là sẽ có những lúc mà nó rất hữu dụng khi sử dụng hoặc chỉ đơn giản vì nó nhanh gọn thôi. Nhưng hãy chú ý là linh hoạt việc sử dụng `anonymous function` đối với component nhẹ và component nặng.

```javascript
// Đừng dùng như dưới
function Foo(props) {
    return <Bar onClick={() => console.log(props.message)} />
}

// Hãy dùng như dưới
class Foo extends React.Component {
    handleClick = () => console.log(props.message)

    return <Bar onClick={handleClick} />
}

function Foo(props) {
    const handleClick = useCallback(() => console.log(props.message), [props.message]);

    return <Bar onClick={handleClick} />
}

memo(function Bar(props) {
 return <button onClick={props.onClick}>Click me to show message!</button>
})
```

Ở trên mình đã trình bày 3 lời khuyên nhỏ để giúp chúng ta tăng performance trong ReactJS. Sẽ còn nhiều tình huống nữa, nhiều cách để cover những tính huống đó nữa. Mình sẽ giới thiệu trong bài sau nếu có thể. Mong là với 3 lời khuyên của mình sẽ giúp các bạn phần nào trong khi làm việc với `ReactJS`. Dù chỉ là những chú ý nhỏ nhưng hãy áp dụng từ bây giờ vì nó không chỉ tăng performance cho bạn mà còn tạo thói quen giúp bạn code đẹp hơn, dễ nhìn hơn và nhất quá hơn.

Bài chia sẽ của mình đến đây là hết rồi. Cảm ơn bạn đã đọc bài viết. Hẹn gặp lại các bạn trong những bài viết kế tiếp! :relaxed: