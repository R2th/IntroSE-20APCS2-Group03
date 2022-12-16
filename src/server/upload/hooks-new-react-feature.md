# I. What is Hooks
* Chắc các bạn cũng đã biết React vừa ra mắt tính năng hết sức nổi bật có thể nói là thay đổi bộ mặt của React trong năm nay đó là Hooks. Một tính năng mới được thêm vào trong phiên bản React 16.8. 

##  Vậy tại sao Hooks nổi bật vậy? 

* Trước giờ chúng ta vẫn thường quen với cách viết React là viết component bằng cách khai báo một class và sử dụng function render để render ra các thẻ html. Và team React Core cảm thấy việc sử dụng class trong React gây ra không ít khó khăn cho các lập trình viên trong việc mở rộng components, cũng như kế thừa các logic trong components nên Hooks đã được ra mắt nhằm khắc phục các vấn đề này cũng như tăng hiệu quả trong việc sử dụng cũng như dễ dàng maintaince. Chúng ta sẽ đi vào các phần tiếp theo để tìm hiểu xem vì sao Hooks được ủng hộ trong thời gian gần đây đến vậy.

# II. State in Hook

```
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

* Đoạn code trên đây là ví dụ về cách dùng state trong hook mình lấy trên  trang chủ của React. 

* Như các bạn thấy giờ đây ta không còn phải sử dụng class để tạo ra các component thay vào đó hook sẽ đưa ra giải pháp mới đó là tạo component từ function. Thay vì trước đây ta dùng function render() thì giờ đây ta sẽ bỏ qua render và return trả về JSX. Hơn thế nữa thay vì sử dụng state như trước kia

```
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }
```

* Thì giờ đây đơn giản ta chỉ cần ```import { useState } from 'react'``` và sau đó chỉ đơn giản khai báo như sau: 

 ```const [count, setCount] = useState(0)```

* với tham số thứ nhất ```count ```là name state, ```setCount``` là function để thay đổi state của count tương tự như ```this.setState({count: 0});``` 
* Hơn thế nữa ta cos thẻ set giá trị mặc định cho state bằng cách khai báo tham số trong function```useState```

* Vậy nếu muốn set nhiều state thì sao đơn giản ta sẽ khai báo nhiều const với các tham số khác nhau như ví dụ sau: 

```
    const [age, setAge] = useState(42);
    const [fruit, setFruit] = useState('banana');
    const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
 ```


##  Vậy lợi thế của cách viết này là gì? 

* Thứ nhất code các bạn sẽ gọn hơn rất nhiều và mỗi lần thay đổi state các bạn chỉ đơn giản là gọi tên function các bạn đặt trước đó thay vì gọi this.setState

* Thứ hai với cách viết này các bạn có thể share logic dễ dàng, các bạn có thể gộp chung các state vào một file sau đó chỉ cần import vào nơi nào cần dùng. 
* Việc này giúp chúng ta tái sử dụng logic và làm code chúng ta dễ dàng bảo trì hơn. Thay vì mỗi chỗ chúng ta phải sửa từng state thì các components có logic dùng chung, chúng ta chỉ cần sửa ở một nơi chứa các state dùng chung đó. Thật hiệu quả đúng không nào

# III. Side Effect with Hooks
## What is Side Effect in React ?
* Vậy side effect trong react là gì. Bạn có thể hiểu đơn giản side effect là những hành động event có thể làm thay đổi DOM trong react components. Đơn giản như bạn nhập click vào một button thì dữ liệu sẽ fetching về làm thay đổi components bên trong đó hay khi bạn tạo tài khoản thì dữ liệu của bạn sẽ được update và tạo mới trên server chẳng hạn. 

* Khác với việc không có side effect bạn nhập vào gì thì sẽ hiển thị ra như vậy và không có tác động gì tới bên ngoài. Hay bạn cũng có thể hiểu đơn giản bạn có một thẻ input khi bạn thay đổi giá trị input nó sẽ không những thay đổi giá trị bên trong nó mà còn thay đổi giá trị của những biến giá trị hay components khác ngoài nó 

* Vậy hooks liên quan gì tới side effect. Nếu bạn nào theo dõi thì cũng đã biết một tính năng mới mà hooks giới thiệu đó chính là useEffect một function kết hợp 3 trạn thái life cycle trong react là mount, update và unmount và mình tin đây cũng là tính năng làm hooks hết sức nổi bật trong mắt các lập trình viên theo dõi React cũng như Front End 
## Features of useEffect
### 1.  Code bạn sẽ gọn hơn hẳn khi dùng useEffect

* Vì sao mình nói vậy. Vì useEffect được thực thi bất cứ khi nào bạn render một components và với những lifecycle update hay mount có các actions giống nhau thì ta chỉ cần viết 1 lần thay vì phải tách ra làm 2 function riêng biệt componentDidUpdate và componentDidMount. Bạn có thể xem ví dụ sau để hiểu rõ hơn useEffect đã làm thế nào để rút gọn code cho lifecycle có các actions tương tự nhau. 

* Đây là code khi không dùng Hooks hay nói cách khác là theo kiểu class components: 
```
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

* Còn đây là code bạn áp dụng hooks

```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
* Vậy tới đây nhiều bạn sẽ hỏi  vậy là khi render nó luôn chạy vào đây à, vậy tôi chỉ muốn actions đó  thực thi khi tui vừa mới mount components lên thôi còn nó update thì tui không muốn thực hiện actions đó vậy phải làm thế nào ? . Chúng ta cũng có thể customize cho useEffect function và mình sẽ giới thiệu với các bạn về cách customize ra sao để sử dụng hook cho hiệu quả ở phần cuối của bài viết này.

### 2. Tách biệt Logic hơn và giúp code chúng ta dễ maintain hơn
* Một trong những lý do khiến Hooks ra đời cũng chính là việc sử dụng lifecycle methods chứa nhiều logic không liên quan với nhau. Chúng ta có thể xem đoạn code sau để hình dung rõ hơn :
```
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
```
* Ở đây chúng ta thấy logic gọi tới api của browser và chức gọi tới ChatApi được implement trong cùng một function là componentDidMount. Nhưng có thể thấy hai function componentDidUpdate và componentWillUnMount thì code của 2 api này lại được tách biệt. Vậy có cách nào để tách biệt logic của từng api mà không phải phuj thuộc vào life cycle methods. Và Hooks đã giải quyết được vấn đề đó bằng cách sử dụng nhiều effects cùng một lúc. Đoạn code dưới đây sẽ áp dụng hooks để refactor đoạn code phía trên

```
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```
* Như các bạn thấy bằng việc sử dụng useEffect nhiều lần chúng ta có thể tách biệt được code của 2 api và cũng như logic sẽ được rõ ràng hơn. 

### 3. Việc effect clean up giúp hạn chế bug hơn

* Thay vì như thông thường React class chúng ta sẽ thường có những event handle khi componentDidMount và clean nó khi componentWillUnmount như ví dụ sau đây:

```
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

* Thì với hooks tư tưởng bây giờ sẽ là thay vì tách biệt effect clean up, thì bây giờ tất cả sẽ được gọp lại trong useEffect() như mình đã nói ban đầu là sự kết hợp của lifecycle. Vậy điều đó có nghĩa mỗi lần bạn render lại components thì thay vì suy nghĩ lifecycle nào sẽ vào handle cái nào thì chúng ta sẽ mặc định là tất cả sẽ chỉ vào functions useEffect của hooks và chúng ta chỉ việc xử lý trong function đó cũng như customize sao cho hợp lí nhất. 

* Vậy để handle clean up effect thì trong function call back của useEffect chúng ta cần return về một function khác và function này sẽ thực hiện mỗi khi chúng ta unmount component

```
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

* Vì sao chúng ta không tách biệt nó ra như vậy sẽ tối ưu performance hơn chứ nhỉ thay vì cứ chạy đi chạy lại cleanup mỗi lần render vì thật sự components đâu có unmount đâu mà phải chạy vào function này. Nhưng react họ nghĩ rằng việc gọp logic của adding và removing vào chung một effects sẽ giúp cho chúng ta giảm thiểu được bug cũng như tối ưu về logic hơn. Các bạn có thể xem ví dụ sau để hiểu vì sao chạy unmount mỗi lần render lại giúp giảm thiểu bug hơn. 

* Như ví dụ trên chúng ta có component là FriendStatus có 2 life cycle methods là: 

```
componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

* Sẽ thế nào nếu props.friend.id bị thay đổi vậy khi đó unmount method sẽ không còn đúng nữa vì nó không phải là pros ban đầu. Vậy để xử lý bug sau chúng ta sẽ phải thêm một lifecycle method nữa là: 

```
componentDidUpdate(prevProps) {
    // Unsubscribe from the previous friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Subscribe to the next friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

* Nhưng với Hooks chỉ cần viết như sau là chúng ta đã xử lý được con bug này: 
```
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

* Vậy bất cứ khi nào component render lại thì nó sẽ chạy  cả 2 function trên. Như vậy bug sẽ được fix chúng ta cũng không cần phải viết componentDidUpdate như trên vì effect sẽ chạy mỗi khi render nên sẽ hạn chế được việc props bị thay đổi ngoài ý muốn vì nếu props có thay đổi nó sẽ ở effect khác chứ không còn ở effect cũ nữa, nên việc sử dụng effect như vậy sẽ giúp ta handle được tính logic của code và suy nghĩ theo hướng mỗi effect sẽ xử lý một function mà không bị conflict với effect khác.

* Đây là vòng lặp của effect các bạn có thể tham khảo nó để hiểu rõ hơn bên trong nó thực sự chạy như thế nào:

```
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Run first effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Run next effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Run next effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect
```

# IV. Optimize Hooks by Skipping Effects
* Những mục trước mình có nhắc tới những bất cập của hooks như việc chạy effects mỗi lần components render lại, vậy với những functions mà chúng ta chỉ muốn nó chạy lần đầu thôi hay chỉ chạy khi thật sự components bị unmount hay hơn thế nữa là chỉ chạy khi một state nào đó thay đổi thôi thì phải làm thế nào. Vậy Hooks hỗ trợ cho ta một chức năng khác trong function useEfffect đó chính là skipping effects ở đây có nghĩa hooks sẽ cho phép ta tùy chỉnh và lược bỏ những effects không cần thiết để tránh tình trạng gây lãnh phí bộ nhớ cũng như ảnh hưởng tới performance.

* Vậy sử dụng skipping effects trong hooks như thế nào. Đơn giản các bạn chỉ cần truyền một array bên trong array có thể là các state hoặc bạn cũng có thể để trống. Chúng ta cùng nhau tìm hiểu cách sử dụng nó như thế nào thông qua một số ví dụ sau đây:

```
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

* Chúng ta có thể thấy cách viết trên khá quen thuộc với các bạn nào đã sử dụng qua life cycle trong React class components chúng ta so sánh giá trị state cũ với giá trị của state hiện tại sau đó thực hiện các actions tương ứng. Trong ví dụ trên chúng ta chỉ thay đổi document.title khi state cũ là ```count``` bị thay đổi. Vậy sẽ như thế nào nếu ta sử dụng hooks vì mỗi lần render thì với hooks là một effects. Vậy nếu ta muốn chạy function theo ý ta muốn trong effect đó ta chỉ cần config trong function useEffect như ví dụ sau đây:
```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```

* Như các bạn thấy đơn giản ta chỉ thêm vào một paramters thứ hai là một mảng. Vậy ở đây nó có ý nghĩa gì. Hooks sẽ thiết lập tham số thứ hai nhận vào các state ở dạng là phần tử của một array. Nếu ta truyền vào một state như trên là count thì effects đó chỉ thật sự chạy lại khi có sự thay đổi của state có tên là count còn không thì function này sẽ không chạy lại. 

* Vậy nếu ta không truyền bất cứ tham số thứ 2 nào trong function useEffect thì React mặc định hiểu rằng với bất kì thay đổi nào của một state nào bất kì thì function này sẽ tự động chạy lại.  

* Vậy có bạn sẽ tự hỏi nếu như ta truyền vào một empty array thì sẽ như thế nào. Đơn giản thì nếu không truyền vào bất cứ phần tử nào cho tham số thứ hai mà chỉ để là một array rỗng React Hooks sẽ tự hiểu là chúng ta sẽ chỉ chạy functions này đúng 1 lần duy nhất vì không truyền vào có nghĩa là effect này không phụ thuộc vào bất kì thay đổi nào mà chỉ chạy lần đầu và lần cuối khi ta return về ( là lúc component unmount). Việc này rất tiện khi ta chỉ muốn chạy một lần như fetch dữ liệu khi render component lần đầu chẳng hạn.

## V. Summary

* Vậy việc update liên tục của các thư viện JS sẽ có những ưu nhược điểm nhất định. Nhưng chúng ta không nên chạy theo nó mà hãy xem nó như một món vũ khí giúp chúng ta trong việc chiến đấu với các dự án khác nhau. Và vũ khí thì sẽ luôn tân tiến nhưng kĩ thuật mới là thứ quyết định vì vậy chúng ta nên nắm chắc phần cốt lõi của React và việc nó cập nhập thì chỉ cần đọc Docs và update skill thôi hay là chém gió như mình cũng là một ý không tồi :D để rèn luyện skill gõ phím thần tốc.

* Qua đây mình cũng xin cảm ơn các bạn đã đọc bài viết của mình. Mình mong các bạn có thể góp ý cũng như nhận xét vì mình cũng mới chỉ là newbie và không có cái nhìn sâu nên những điều mình nói chỉ là trải nghiệm của bản thân chứ không phải là một chuyên gia gì hết :D. Vậy nên mình rất mong chúng ta có thể đóng góp và chia sẻ với nhau những kiến thức hết sức bổ ích trong tương lai.