## 1. Mở đầu
<hr>

Xin chào tất cả các bạn mặc dù `Hooks` của `React` đã ra mắt được một thời gian rồi tuy nhiên gần đây mình mới có cơ hội sử dụng thử nó nhiều hơn trong project nên bài viết này mình xin chia sẻ lại với các bạn về một số điều mà mình tìm hiểu được về một số hàm `Hooks` mà mình tìm hiểu được

## 2. React Hook

<hr>

### a. useState

Có lẽ đối với các bạn đã đọc qua về `Hook` trong `React` thì đây là 1 trong 2 `Hook` cơ bản nhất được giới thiệu trong số các `Hook`. `useState` như trong document của `React` giới thiệu thì nó có tính năng tương tự giống như `state` trong `class Component`. Đối với mình thì `Hook` này khá là hữu dụng vì từ khi dùng nó thì mình hầu như không còn cần tạo `class Component` nữa. Nếu trước kia bạn có một component sidebar như sau:

```js
const Sidebar = () => (
    <div>
        <ul>
            <li>Menu 1</li>
            <li>Menu 2</li>
        </ul>    
    </div>
)
```

Với mục đích bạn đầu là phần `Sidebar` này sẽ luôn hiển thị thì bạn chỉ cần viết như trên và import nó vào sử dụng. Tuy nhiên về sau bạn lại muốn có thể thu gọn `Sidebar` này lại để có nhiều diện tích màn hình hơn cho phần nội dung chính thì chúng ta sẽ cần cập nhật lại. Trước thời kì của `Hooks` thì chúng ta sẽ phải refactor lại component này về `class Component` như sau:

```js
class Sidebar extends Components {
    state = {
        isCollapsed: false
    }
    
    const handleToggleSidebar = () => {
        this.setState(prevState => ({
            isCollapsed: !prevState.isCollapsed
        }));
    }

    render() {
        const { isCollapsed } = this.state; 

        return (
            <div className={`${isCollapsed ? 'hide' : 'display'}`}>
                <button onClick={this.handleToggleSidebar}>Collapse</button>
                <ul>
                    <li>Menu 1</li>
                    <li>Menu 2</li>
                </ul>    
            </div>
        )
    }
}
```

Trước thời kì có `Hook` thì mình rất hay phải làm việc này vì mỗi khi code mình vẫn đi theo "lý tưởng" mà mình đọc được đâu đó trên mạng là luôn ưu tiên `function component` :joy::joy::joy: . Tuy nhiên từ khi có `Hooks` thì thay vì phải sửa lại nhiều như trên thì mình chỉ cần đơn giản làm như sau:

```js
const Sidebar = () => {
    const [isCollapsed, setCollapse] = useState(false);

    function handleToggleSidebar() {
        handleToggleSidebar(!isCollapsed);
    }

    return (
        <div className={`${isCollapsed ? 'hide' : 'display'}`}>
            <button onClick={handleToggleSidebar}>Collapse</button>
            <ul>
                <li>Menu 1</li>
                <li>Menu 2</li>
            </ul>    
        </div>
    )
}
```

Như bạn có thể thấy nó ngắng gọn hơn rất nhiều so với phiên bản trước đó mà vẫn đạt được mục đích chúng ta mong muốn.

### b. useReducer

<hr>

Nếu bạn đã từng sử dụng `Redux` thì cũng không còn lạ với khái niệm này. Một trong những người phát triển ra `Redux` là `Dan Abramov` hiện tại cùng là thành viên trong team phát triển `React` cho nên có thể `Dan` đã mang cái tên này vào trong `Hook` của `React`. `useReducer` hoạt động tương tự như `Reducer` mà bạn  thấy trong `Redux`. `useReducer` cũng nhận vào 2 tham số đó là `state` hiện tại của chúng ta và một `action` để có thể quyết định state của chúng ta sẽ thay đổi ra sao. Để hiểu rõ hơn chúng ta sẽ xét ví dụ sau:

```js
const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    function loadUser() {
        setLoading(true)
        axios.get('some-post-url')
            .then(response => {
                const { data } = response;
                setPosts(data);
                setError(false);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setError(true);
            })
    }

    return (
        // Some UI
    )
}
```

Nói qua về kịch bản phía trên ta sẽ có một function mà khi gọi vào nó sẽ thự hiện việc gọi lên API lấy danh sách bài viết và hiển thị ra cho chúng ta. Và để có trải nghiệm tốt nhất thì trong khi đợi kết quả từ API chúng ta sẽ hiển thị một cái UI là đang loading được quyết định bằng `state loading` như bạn thấy ở trên. Trong trường hợp lấy được dữ liệu thành công thì `loading` sẽ trở lại `false` và ẩn cái UI loading đó đi để hiển thị danh sách bài viết cho bạn. Còn trong trường hợp có lỗi thì `error` sẽ thành `true` và bạn có thể hiển thị ra thông báo lỗi nào đó. Với kịch bạn như trên khi mà `state` của bạn có nhiều các thuộc tính và các thuộc tính sẽ cùng thay đổi theo một nhóm hành động như trên thì ta có thể dùng `useReducer` như sau:

```js
const postReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {posts: [], loading: true, error: false};
        case 'LOAD_SUCCESS':
            return {posts: action.posts, loading: false, error: false};
        case 'LOAD_ERROR':
            return {posts: [], loading: false, error: action.error};
    }
}

const PostList = () => {
    const [state, dispatch] = useReducer({
        posts: [],
        loading: false,
        error: false,
    });

    function loadUser() {
        dispatch({ type: "LOADING" });
        axios.get('some-post-url')
            .then(response => {
                const { data } = response;
                 dispatch({ type: "LOAD_SUCCESS", users: data });
            })
            .catch(error => {
                dispatch({ type: "LOAD_ERROR", error });
            })
    }

    return (
        // Some UI
    )
}
```

Với ví dụ trên thì bạn có  thể thây tại sao nó có tên gọi là `useReducer` vì nó theo mình giống như là anh em họ với `Reducer` của `Redux`. Với ví dụ trên bạn có thể nghĩ là việc sử dụng `useReducer` có vẻ sẽ mất nhiều công code hơn so với `useState` như ban đầu. Tuy nhiên trong trường hợp `state` của bạn là một object phức tạp chứa nhiều tầng lớp và các action của bạn chỉ thay đổi một phần trong đó thì lúc ấy `useReducer` chính là thứ bạn cần thay cho việc tạo ra cả chục cái `useState`. Điều này cũng dễ hiểu vì đến `Redux` cũng sử dụng nó để thực hiện việc thay đổi `store` mà :D :D :D

### c. useEffect

<hr>

Khi mới đọc về những dùng mà `Hook` này có thể làm được thì mình thấy nó khá là "ma mị" vì nghe nói nó sẽ thay thế cho cả `componentDidMount`, `componentDidUpdate` lẫn `componentWillUnmount`. Nhưng trên thực tế khi làm việc bạn không nên nghĩ đến nó sẽ thay thế cho các hàm trên mà hãy hiểu đơn giản là hàm là "useEffect sẽ chạy sau mỗi lần component của bạn re-render nếu thỏa mãn điều kiện bạn đặt ra hoắc khi component bị unmount". Đó là tất cả những gì bạn cần nhớ đến chứ không phải việc thay thế cho các lifecycle nói trên. Xét ví dụ sau:

```js
const UserInfo = () => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        axios.get(`user-info-${someUserId}`)
            .then(response => setUser(response.data));
    }, [someUserId]);
    
    return (
        // User info UI
    )
}
```
Với ví dụ trên ta thây bên trong `useEffect` sẽ có một function dùng để gọi lên API để lấy thông tin của user có id là `someUserId`. Ngoài ra `useEffect` còn nhận vào một mảng khác dưới  tên gọi là `dependancy` hay bạn có nhiều bài viết gọi tắt là `deps`. Về cơ bản đúng như tên gọi của nó là cái function mà bạn truyền vào trong `useEffect` sẽ được gọi là nếu 1 trong các thành phần trong `deps` của bạn thay đổi. Đó chỉ đơn giản như vậy thôi. Tuy nhiên bạn cần chú ý nếu `deps` của bạn là một object thì rất có thể dẫn đến việc `useEffect` của bạn bị gọi liên tục vì với object nó sẽ so sánh tham chiếu chứ không phải giá trị. Thêm một tips nữa cho bạn khi sử dụng `useEffect` như sau. Giả sử ta sửa lại code trên thành:

```js
const SomeRemoteList = () => {
    const [data, setData] = useState(null);
    function fetchData() {
        // So something to fetch data
    }
    
    useEffect(() => {
           fetchData();
    });
    
    return (
        // User info UI
    )
}
```

Nếu bạn có ý định viết tách hẳn hàm gọi API ra khỏi `useEffect` và gọi lại nó trong `useEffect` thì mình khuyên là không nên. Những hàm bạn sử dụng trong `useEffect` thì bạn nên định nghĩa nó luôn trong đó như này:

```js
const SomeRemoteList = () => {
    const [data, setData] = useState(null);
    
    useEffect(() => {
            function fetchData() {
                // So something to fetch data
            }
           fetchData();
    });
    
    return (
        // User info UI
    )
}
```
Tại sao nên làm như trên vì thứ nhất trong trường hợp hàm của bạn có sử dụng hay phụ thuộc vào một tham số nào đó khác thì rất có thể bạn sẽ bị miss mất việc khai báo nó trong `deps` dẫn đến các bug khó hiểu. Thêm nữa việc di chuyển hàm vào trong `useEffect` như nói trên còn giúp cho bạn sau này khi nhìn vào `effect` này sẽ nhanh chóng nắm được toàn bộ những gì nó làm vì nó như viết được đóng gói toàn bộ thành một module nhỏ trong component của bạn vậy.

## 3. Kết bài

<hr>

Bài viết của mình đến đây là kết thúc. Vì thực tế `Hook` còn khá mới mẻ và cũng chưa thực sự có best practies guide nào cả nên toàn bộ những gì mình chia sẽ ở trên cũng là từ trải nghiệm cá nhân của mình kết hợp với một số tại liệu đọc được. Nếu bạn thấy chỗ nào không hợp lý hoặc không đúng hãy comment ngay ở dưới để mình có thể cập nhật lại kiến thức. Cuối cùng, cám ơn các bạn đã đọc bài viết và nhớ để lại 1 upvote nhé :D