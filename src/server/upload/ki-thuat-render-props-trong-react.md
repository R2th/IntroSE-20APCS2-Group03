> Ngày xửa ngày xưa khi React mới ra đời, người ta miệt mài truyền state từ component này sang component khác và ca tụng nó. Nếu một component cần state của một component khác, ta chỉ việc cho chúng lồng vào nhau, thằng to hơn sẽ giữ state. Hoặc là bọc cả hai vào một component khác lớn hơn và để nó làm người giữ state.
> Ngày nay, người ta dần cảm thấy khó chịu khi các component bị lệ thuộc chặt chẽ vào nhau như vậy.
> 
> - Giá như một component có thể thay thế các component bên trong của nó một cách dễ dàng.
> - Giá mà hai component có thể chia sẻ state với nhau mà không cần phải dựa vào một component trung gian bọc bên ngoài. 
> 
> `Render Props` chính là kĩ năng làm những điều trên trở thành hiện thực...

### Vấn đề

Ôn lại một chút căn bản, có 2 thứ ta có thể truyền vào 1 component, hoặc là state (thông qua props), hoặc là jsx (thông qua children props).
```
// truyền state
<Animal hungryState={hungryState} />

// truyền jsx
<LionPack>
    <Lion />
    <Lion />
</LionPack>
```


Tuy nhiên là ta không dừng lại ở đó, vì đời là phải phức tạp, người ta lại thích **truyền cả state của component đc truyền, vào trong jsx mà nó chuẩn bị được truyền.** :expressionless:
```
const Dad = props => {
    const firstName = 'foo' // cha muốn truyền họ cho con, nhưng bó tay
    const lastName = 'fizz'
    return <p>{props.children}</p>
}

const Child = props => { // con này sẵn sàng nhận họ, nhưng ko cha nào truyền cho
    const lastName = 'bar'
    return <p>{props.firstName} {lastName}</p>
}

const App = () => (
    <Dad> 
        <Child />
    </Dad>
)
```

### Cách giải quyết: lift state up

Nếu cứ cách cơ bản mà táng, thì ta có thể đẩy state `lastName` lên component chứa cả cha lẫn con (trong trường hợp này là thằng <App />), như vậy thì cha con share state thoải mái.
Nhưng đồng nghĩa với việc, việc chia sẻ state giữa cha và con bị phụ thuộc vào thằng <App />. Tức mỗi lần cặp cha con này xuất hiện, logic truyền `lastName` lại lặp lại...

```
const Dad = () => { // thật nực cười kẻ ko tên lại muốn truyền tên cho người khác
    const lastName = 'fizz'
    return <p>{props.children}</p>
}

const Child = ...

const App = () => {
    const firstName = 'foo' // giờ App lại là người phải chịu trách nhiệm ...
    return (
        <Dad>
            <Child firstName={firstName} />
        </Dad>
    )
}
```

### Cách giải quyết: render props

Việc của phụ huynh thì trẻ con không có lỗi, nên để sửa vấn đề này, ta chỉ cần sửa thằng cha như sau:

*Đầu tiên là thay thế property children bằng function children, ta truyền thẳng state cần thiết vào trong*
```
const Dad = () => {
    const lastName = 'fizz'
    
    // giờ thì là method children(state) chứ ko chỉ là property children nữa
    return <p>{props.children(lastName)}</p>
}
```

*Ta giữ nguyên component con, do nó chỉ nhận state và render ra chứ không chứa chút logic nào cả*
```
const Child = ...
```

*Sau đó, ta truyền state qua prop bằng cách thông thường, tuy nhiên thay vì viết một đoạn jsx thì ở đây ta có một function trả về một jsx*
```
const App = () => (
    <Dad>
        {name => <Child name={name} />}
    </Dad>
)
```

### Kết

Như vậy, `render props` là một kĩ năng tuyệt vời cho phép chúng ta chia sẻ state giữa các component một cách vô cùng linh hoạt và không bị lệ thuộc.
Nó tối giản việc chia sẻ state chỉ còn hai bước:

- định nghĩa các state mà children có thể nhận ở trong code của parent component, lưu ý là thay thế property children thành function children.
- truyền children vào parent component, lưu ý là thay thế jsx bằng một function trả về jsx.

Ở bài sau, chúng ta sẽ đi ngược lại dòng lịch sử, đến với `Higher Order Component (HOC)` để tìm hiểu vì sao người ta lại chối bỏ kĩ thuật này và tạo ra `render props` (to be continue)