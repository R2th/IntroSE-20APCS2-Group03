# 1. Mở đầu : 
Như chúng ta đã biết , Hooks mới được thêm vào ở phiên bản React 16.8. Cho phép chúng ta sử dụng state và các chức năng khác của React mà không cần tạo class.

Trong đó` useState()`  là một hook cho phép bạn thêm React state vào function components. Và câu hỏi được đặt ra của chúng ta hôm nay đó là liệu React có cập nhật trạng thái ngay lập tức không ( synchronously ) hay sẽ lên một schedule để update ( asynchronously ). Vậy thì hôm nay chúng ta cùng tìm hiểu câu hỏi này ha :laughing::laughing::laughing:

# 2. Cập nhật trạng thái bằng useState() :
Cùng xem qua ví dụ này nhé :

```javascript
import React, {useState} from "react";
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    const doubleIncreaseWhenClick = () => {
        setCount(count + 1);
        setCount(count + 1);
    };

    return (
        <div style={{margin: '0 auto', width: '50%', padding: '100px'}}>
            <button onClick={doubleIncreaseWhenClick}>Click Here</button>
            <div>Count: {count}</div>
        </div>
    );
}

export default App;
```

Ban đầu chúng ta thấy như sau : `const [count, setCount] = useState(0)` nghĩa là chúng ta đang xác định state của component đó, trong đó count là biến state chứa giá trị state hiện tại, còn `setCount()` sẽ được sử dụng để cập nhật state.

Sau đó, khi chúng ta click vào button Click here thì sẽ thực hiện xử lí thằng `doubleIncreaseWhenClick()` với hai lần set lại state đó là  `setCount(count + 1)` và  `setCount(count + 1)`.

Vậy thì câu hỏi của chúng ta là kết quả khi ấn vào sẽ là 1 hay 2 ???:sweat_smile::sweat_smile::sweat_smile:

Và câu trả lời của chúng ta là 1. Tại sao lại như vậy nhỉ ?

Theo mình, khi `setCount(count + 1)` thực hiện việc cập nhật state, sự thay đổi không được show ra ngay lập tức trong biến count. Trong lần hiển thị tiếp theo `const [count, setCount] = useState(0)`, hook sẽ gán cho count một new state.

Ví dụ nhé : Ban đầu thì biến count có giá trị bằng 0, thì việc gọi `setCount(count + 1)`  `setCount(count + 1)` sẽ trở thành `setCount(0 + 1)`  `setCount(0 + 1)`- làm cho state trong lần hiển thị tiếp theo là 1.

> Ta rút ra được một điều như sau : thằng `setValue(newValue)` của `[value, setValue] = useState()` là không đồng bộ (asynchronously) .

Vậy thì để giải quyết vấn đề này, ta làm như thế nào ???

Thằng `setValue(newValue)` chấp nhận cho chúng ta gọi lại biến để cập nhật state, chúng ta có thể làm như sau nhé :

```javascript
 const doubleIncreaseWhenClick = () => {
        setCount(count => count + 1);
        console.log(count, '1')
        setCount(count => count + 1);
        console.log(count, '2')
    };
```
Kết quả như sau :

![](https://images.viblo.asia/b58e15de-6266-4cc3-8ee7-a624cd0c6069.gif)

log sẽ được như thế này : 
```
0 "1"
0 "2"
2 "1"
2 "2"
4 "1"
4 "2"
6 "1"
6 "2"
8 "1"
8 "2"
```

Khi cập nhật trạng thái bằng việc  `setCount(count => count + 1)`, thì count sẽ chứa giá trị thực của state.

# 3. Biến state sẽ là immutable và readonly :
Có bao giờ mọi người dã thử log biến state ngay sau khi thay đổi nó chưa nhỉ ? Cùng xem ví dụ sau nhé :

```
import React, {useState, useEffect} from "react";
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchListPost = async () => {
            const response = await fetch('/posts');
            const fetchedPosts = await response.json();

            setPosts(fetchedPosts);
            console.log(posts);        // => []
            console.log(fetchedPosts); // => ['Post 1', 'Post 2', 'Post 3']
        };
        fetchListPost();
    }, []);

    return (
        <ul>
            {posts.map(item => <li>{item}</li>)}
        </ul>
    );
}

export default App;

```
 Khi mounting thì chúng ta bắt đầu thực hiện việc fetch request, khi fetch thành công `setPosts(fetchedPosts)`  cập nhật state cho biến `posts`. Tuy nhiên, khi chúng ta log biến posts ngay sau đó thì kết quả nhận được lại là [ ].

Bởi vì biến state `posts` là immutable và readonly. Chỉ khi` useState()` gán giá trị cho `posts`. Chúng ta không thể gán theo cách thủ công cho biến state và cũng thể thay đổi được nó:

```javascript
      posts = fetchedPosts;       // Nope! bởi vì posts hiện tại đang readonly
      posts.push(..fetchedPosts); // Nope! bởi vì posts hiện tại đang immutable
      setPosts(fetchedPosts);     // Được nè
```

# 4. Ồ , vậy thế còn với Class thì sao nhỉ ?

```javascript
import React, {Component} from "react";
import './App.css';

class App extends Component {
    state = {
        count: 0
    };

    render() {
        return (
            <>
                <button onClick={this.doubleClick}>
                    Click me
                </button>
                <div>Count: {this.state.count}</div>
            </>
        );
    }

    doubleClick = () => {
        //Ok ne
        this.setState(({ count }) => ({
            count: count + 1
        }));
        this.setState(({ count }) => ({
            count: count + 1
        }));

        // Tương tụ như trên nhé không được đâu
        // this.setState({ count: this.state.count + 1 });
        // this.setState({ count: this.state.count + 1 });
    }
}

export default App;

```

Trong ví dụ trên, chúng ta cũng có thể thấy ngay được ` this.state `cũng không được cập nhật ngay lập tức. Chỉ khi gọi `this.setState(newState)`, React lại lên shcedule hiển thị lại và  trong lần hiển thị tiếp theo sẽ `this.state` sẽ chứa giá trị mới.

> Do đó : `this.setState(newState)` khi thực hiện việc cập nhật `this.state` là không đồng bộ ( asynchronously ).

# 5. Kết bài :

Bài viết của mình đến đây là kết thúc rồi :sunglasses::sunglasses::sunglasses:

Nếu mọi người thây hay hãy LIKE, SHARE và UPVOTE cho mình liên tay để mình có nhiều động lực viết bài nhé.

Many thanksssss :100::100::100::100: