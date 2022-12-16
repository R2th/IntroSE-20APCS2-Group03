Hooks là một tính năng bạn sẽ sử dụng mỗi ngày trong quá trình phát triển React của mình. React hooks hiện có trong phiên bản React 16.8. Hooks rất tốt bởi vì chúng ta nhận được nhiều tools hơn từ các nhà phát triển React.

# 1. Hooks là gì ?
React hooks là cách để thêm tính năng của React.Component  vào functional components: state và lifecycle. Hooks cho bạn sử dụng tính năng của react không cần class.

# 2. React's state hook
Ví dụ ta có 1 state trong component:
```
import React, { Component } from 'react';

class JustAnotherCounter extends Component {
  state = {
    count: 0
  };

  setCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>

        <button onClick={this.setCount}>Count Up To The Moon</button>
      </div>
    );
  }
}
```
Với Hooks chúng ta có thể viết ngắn gọn hơn như sau:

```
import React, { useState } from 'react';

function JustAnotherCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Count Up To The Moon</button>
    </div>
  );
}
```
Lưu ý rằng functional component sẽ dễ dàng hơn nhiều cho người mới học React.

# 3. useState()
Bạn có thể không quen với cú pháp  useState() , nó sử dụng [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) cho mảng. Điều này gần giống như cách chúng ta pull props ra ngoài một object với object destructuting.
Hãy so sánh object  destructuring và array destructuring để thấy được tại sao cách sử dụng array hiệu quả hơn. Object destructuring yêu cầu viết nhiều hơn để lấy một biến và đổi tên nó.
- Object Destructuring :
```
// object destructuring. lots of writing!
const users = { admin: 'chris', user: 'nick' };

// grab the admin and user but rename them to SuperAdmin and SuperUser
const { admin: SuperAdmin, user: SuperUser } = users;
```
Những dòng trên có thể hơi khó đọc, nhưng với array destrcuturing chúng ta chỉ cần đặt tên biến như chúng ta lấy nó ra khỏi mảng. Biến đầu tiên chính là item đầu tiên của mảng.
- Array Destructuring :
```
// array destructuring
const users = ['chris', 'nick'];

// grab in order and rename at the same time
const [SuperAdmin, SuperUser] = users;
```
Ngắn gọn và dễ hiểu hơn nhiều phải không nào.
- useState() cung cấp cho chúng ta những gì ?

useState() cung cấp 2 biến và chúng ta có thể đặt tên 2 biến đó là gì tùy chúng ta. Chỉ cần thỏa mãn : biến đầu tiên là value, giống với this.state, biến thứ 2 là một function để update value đó, giống như this.setState. Phần cuối cùng truyền vào useState là argument mà chúng ta truyền cho nó. Argument của useState() là giá trị ban đầu của state. Trong ví dụ trên thì giá trị khởi tạo của biến count là 0.
- Điều gì tệ của classes ?

Trong phần giới thiệu React hooks cung cấp một điều rất hay: [Classes confuse both people and machines](https://reactjs.org/docs/hooks-intro.html#classes-confuse-both-people-and-machines)
Điều này có nghĩa là các class có thể đôi khi gây nhầm lẫn và có thể được viết bởi bất kì cách nào. Đi sâu vào dự án của người khác và bạn có thể tham gia vào một thế giới của các lựa chọn cú pháp và style khác nhau.
Không có kế hoạch để loại bỏ class hỗ trợ. Chúng tôi có một cách khác để code. Bằng cách cho phép các class được chuyển đổi thành các functional components, chúng ta thậm chí có thể chia nhỏ các phần trong ứng dụng thành các thành phần nhỏ hơn và tập trung hơn.
- Sử dụng nhiều state hooks :
Chúng ta có thể sử dụng useState nhiều lần trong cùng 1 function:
```
import React, { useState } from 'react';

function AllTheThings() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([{ name: 'Surfboard', price: 100 }]);
  const [coupon, setCoupon] = useState(null);

  return <div>{/_ use all those things here _/}</div>;
}
```
# 3. Effect Hook
State hook cho phép chúng ta sử dụng state trong React functional components. Điều này giúp chúng ta tiến một bước gần hơn việc sử dụng functional components trên class components. Phần tiếp theo của việc chuyển sang functional components là lifecycle method.

Effect tương tự như các thành phần componentDidMount, componentDiaUpdate, componentWillUnmount.

Đây là những gì mà Effect hook rất hiệu quả. Side-effects là những gì bạn muốn app của mình thực hiện :
- fetching data
- thay đổi DOM
- thiết lập đăng ký

Effect sẽ chạy sau mỗi lần render, bao gồm cả lần render đầu tiên.
Hãy cùng so sánh class vs functional component:
```
import React, { Component } from 'react';

class DoSomethingCrazy extends Component {
  componentDidMount() {
    console.log('i have arrived at the party!');
    document.title = 'preesent';
  }

  render() {
    return <div>stuff goes here</div>;
  }
}
```

```
function DoSomethingCrazy() {
  useEffect(() => {
    console.log('i have arrived at the party!');
    document.title = 'preesent';
  });

  return <div>stuff goes here</div>;
}
```
Chỉ chạy Effect hook khi có gì đó thay đổi :
Vì useEffect() chạy mỗi khi một component được render, làm thế nào để nó chỉ chạy một lần ? Effect hook có thể lấy một argument thứ hai là một mảng. Nó sẽ xem qua mảng và chỉ chạy effect nếu một trong những giá trị đó thay đổi. Ví dụ :
- (componentDidMount) : chỉ chạy 1 lần 
```
// only run on mount. pass an empty array
useEffect(() => {
  // only runs once
}, []);
```
- componentDidUpdate : chạy khi có sự thay đổi
```
// only run if count changes
useEffect(
  () => {
    // run here if count changes
  },
  [count]
);
```
- Vậy còn componentWillUnmount :
Để chạy gì đó trước khi component unmounts, chúng ta chỉ cần return một function trong useEffect():
```
useEffect(() => {
  UsersAPI.subscribeToUserLikes();

  // unsubscribe
  return () => {
    UsersAPI.unsubscribeFromUserLikes();
  };
});
```
# 4. Kết hợp useEffect và state
Không có vấn đề gì nếu kết hợp sử dụng chúng. Chúng có thể cùng nhau tạo ra các functional component hoạt động như các class component. 
Đây là một ví dụ thực tế về một component fetch một danh sách người dùng từ Github API với useEffect() và useState(). Chúng ta sẽ bắt đầu bằng cách sử dụng useState() cho users:
```
import React, { useState } from 'react';

function GitHubUsers() {
  const [users, setUsers] = useState([]);
}
```
Chúng ta set users như một mảng rỗng vào `useState([])`. Tiếp theo chúng ta cho vào useEffect() và sử dụng [fetch](https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data) để lấy data từ API về :
```
import React, { useState } from 'react';

function GitHubUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data); // set users in state
      });
  }, []); // empty array because we only run once
}
```
Lưu ý rằng chusgn ta đang set argument thứ 2 của useEffect là một mảng rỗng nên nó chỉ chạy 1 lần. Cuối cùng, chúng ta sẽ hiển thị danh sách đó lên
```
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function GitHubUsers() {
  // ...other stuff here...

  return (
    <div className="section">
      {users.map(user => (
        <div key={user.id} className="card">
          <h5>{user.login}</h5>
        </div>
      ))}
    </div>
  );
}
```
# Kết luận
Reat state và Effect hook rất tuyệt vời và sẽ là công cụ giúp việc học React dễ dàng hơn cho newbie. Rất nhiều thành công của Vue là ở sự đơn giản trong việc tạo ra các component. Nó chỉ là một object. Bây giờ với React. bạn không cần phân biệt  giữa "nó có phải là class không " hay "tôi nên sử dụng functional component không " ?

Nguồn : https://scotch.io/tutorials/getting-started-with-react-hooks#toc-what-is-this-usestate-syntax-