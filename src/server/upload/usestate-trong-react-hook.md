**useState()** là một hook cơ bản giúp sử dụng state trong Functional Component. Hook này nhận vào input là một giá trị hoặc function và output là một mảng có hai phần tử tương ứng cho state và setState. Khi useState được gọi, nó khai báo một biến state. Đây là cách để "lưu giữ" các giá trị giữa các lần gọi hàm — useState là một cách mới để sử dụng như là cách this.state được dùng trong class. Thông thường, các biến này "biến mất" khi hàm kết thúc nhưng các biến state này được React giữ lại.
## Khai báo một State
Chúng ta cùng xem cách khai báo state count với giá trị khởi tạo bằng 0 trong class và function khác nhau như thế nào.

Trong một class, state được khởi tạo bằng cách sử dụng this.state trong constructor:
```
constructor {
    super(props);
    this.state = {
        count: 0
    }
 }
```
Nhưng trong function component thì không có this nên không thể sử dụng state bằng this.state được. Chính vì vậy để sử dụng được state trong functional component thì chúng ta sử dụng useState. Khai báo useState khá đơn giản và ngắn gọn hơn so với khai báo trong class. Không giống như khai báo ở class, state không nhất thiết phải là object mà có thể là số, chuỗi...
```
const [count, setCount] = useState(0);
```

## Sử dụng State
Khi muốn hiển thị giá trị hiện tại của state trong class ta sử dụng this.state.count, còn trong function ta sử dụng trực tiếp biến count:
```
//Sử dụng state trong class component
<p>Current number: {this.state.count}</p>

//Sử dụng state trong functional component
<p>Current number: {count}</p>
```
## Cập nhật State
Trong class thì để cập nhật state thì ta sử dụng this.setState() để cập nhật lại count. Còn trong function ta đã có biến setCount và count nên không cần this nữa:
```
//Cập nhật state trong class component
 <button onClick={() => this.setState({ count: this.state.count + 1 })}>Click</button>
 
//Cập nhật state trong funtional component
<button onClick={() => setCount(count + 1)}>Click</button>
```
## Lưu ý khi sử dụng useState
### useState sử dụng Replacing chứ không phải Merging
Không như trong class component sử dụng Merging khi dùng setState, khi thay đổi state thì chỉ cần đưa vào state cần thay đổi khi setState thì nó sẽ giữ nguyên giá trị và cập nhật lại những state được thay đổi:
```
this.state = {
    name: "Hung",
    age: 23
};
this.setState({ age:24 });
// => { name: "Hung", age: 24 }
```
Còn useState khi cập nhật sẽ lấy state được cập nhật thay thế cho state cũ luôn. Chính vì vậy ta cần clone state sau đó mới sử dụng.
```
const [people, setPeople] = useState({ name: "Hung", age: 23});
setPeople({ age: 24 });
// => { age: 24}

// Clone trước khi sử dụng
setPeople({ ...people, age: 24})
// => { name: "Hung", age: 24 }
```

### Initial State chỉ được sử dụng cho lần đầu render
```
const initState = getState();
const [state, setState] = useState(initState);
```
Ở đây initState chỉ được sử dụng cho lần đầu render, những lần sau không được dùng nữa nên việc chạy getState() trở nên vô nghĩa. Vậy làm thế nào để chỉ chạy getState() đúng một lần duy nhất. Để giải quyết việc này thì ta có thể sử dụng callback thay cho một giá trị, như vậy nó sẽ chỉ được chạy duy nhất một lần và sau đó sẽ không được chạy nữa.
```
const [state, setState] = useState(() => {
    const initState = getState();
    return initState;
});
```

## Kết luận
* useState() giúp functional component có thể sử dụng state.
* useState() trả về mảng 2 phần tử [state, setState].
* useState() sử dụng replacing thay vì merging khi setState.
* initState callback chỉ chạy duy nhất một lần đầu tiên.

Tài liệu: https://reactjs.org/