![](https://images.viblo.asia/cb67ce21-ce7f-4fe0-9f6c-626ca20e892d.png)
Lâu rồi không viết bài nào về React, quay đi quay lại thấy 1 đống update, đành phải vào hóng 1 tý không thì vài hôm nữa thành người tối cổ lúc nào không biết. 

Tại React Conf 2018 diễn ra vào ngày 25 - 26 tháng 10 vừa rồi, một tính mới mang tên Hooks được công bố và đưa vào thử nghiệm ở phiên bản 16.7.0-alpha. 
>>> Hooks là một đề xuất tính năng mới cho phép bạn sử dụng `state` và các tính năng React khác mà không cần viết một Class
>>> 

Ơ kìa có gì đó sai sai nhỉ, dùng `state` mà không cần viết Class, thế là Stateless Component sử dụng được state à :confused: 
Thú thực là confused vl các bạn ạ, nhưng chúng ta sẽ cùng tìm hiểu xem cái Hooks kì dị này nó là cái gì trong bài viết này.

### Why Hooks ?
Chúng ta biết rằng các components và luồng dữ liệu từ trên xuống (top-down data flow)  giúp chúng ta tổ chức giao diện người dùng lớn thành các phần nhỏ, độc lập, có thể tái sử dụng.  Tuy nhiên, chúng ta thường không thể chia nhỏ các component phức tạp bởi vì logic là stateful và không thể được trích xuất thành một function hoặc component khác. Và trong vài trường hợp, mọi người vẫn thường nói React không cho họ “separate concerns”.

Những trường hợp này rất phổ biến và xảy ra khi chúng ta muốn xử lý animations, form data, kết nối với nguồn dữ liệu bên ngoài và nhiều thứ khác mà chúng ta muốn thực hiện trong cùng 1 component của chúng ta. Và khi đó chúng kết thúc bằng:
- Components siêu lớn khó refactor và test
- Lặp logic giữa các component khác nhau và các lifecycle
- Sử dụng các pattern phức tạp như render props hay higher-order components...

Và với những động lực trên, nhóm phát triển đã tạo ra Hooks cho phép chúng ta tổ chức logic bên trong một component thành các đơn vị cô lập có thể tái sử dụng được. 

### Do Hooks Make React Bloated?
Trước khi chúng ta xem xét chi tiết về Hooks, bạn có thể lo lắng rằng chúng ta chỉ đang thêm các khái niệm khác vào React. Đây là một sự lo lắng chính xác. Chắc chắn là sẽ phải mất một thời gian ngắn để làm quen với khái niệm mới, nhưng kết quả mang lại sẽ cải thiện đáng kể thời gian mà chúng ta phải tiêu tốn khi làm việc với React. 

Hooks cho phép chúng ta luôn sử dụng các function thay vì phải liên tục chuyển đổi giữa các function, class, higher-order components và render props. Mà các bạn biết rồi đấy higher-order components và render props là những pattern khá là phức tạp để hiểu. 

Xem xét về mặt kích thước ứng dụng khi thêm Hooks vào thì React chỉ tăng thêm ~1.5kB (min+gzip). Trong khi con số này không quá lớn thì khi sử dụng Hooks có thể giảm kích thước bundle đáng kể bởi code sử dụng Hooks - các function component - có xu hướng minify tốt hơn so với code tương đương sử dụng class component.

Đề xuất sử dụng Hooks không bao gồm bất kỳ breaking changes nào.  Code hiện tại sẽ tiếp tục hoạt động ngay cả khi bạn đã sử dụng Hooks trong các component mới.

### What Are Hooks, Exactly?
Lan man mãi, thế chính xác thì Hooks là cái gì  :roll_eyes: 
Nói một cách đơn giản
>>> Hooks là những functions cho phép chúng ta "hook vào" thành phần của React (như state, lifecycle, context...) và sử dụng chúng.
>>> 
Hiểu nôm na là, Hooks giống như một lối tắt cho phép bạn sử dụng các tính năng của React vậy. Ví dụ để sử dụng state, lifecycle ta phải sử dụng class Component, để sử dụng context ta phải gọi sử dụng Provider, Consumer...vân vân và mây mây. Nhưng với Hooks, tất cả sẽ được hoàn thành với 1 function. Ok :ok_hand: 

Vẫn rất khó hiểu đúng không ? Đúng rồi, đọc không mà hiểu thì có mà thánh. Thế thì chúng ta sẽ cùng xem thử 1 cái ví dụ nhé

{@embed: https://codepen.io/ducpv193-the-decoder/pen/rQvOmd}

Trong cái ví dụ bên trên, hãy chú ý tới component của chúng ta:
```javascript
const App = () => {
  const [count, setCount] = useState(0); // Cái dòng này mới là cái cần chú ý này
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};
```
Và như các bạn thấy đấy, nó là 1 cái stateless (function) component, nhưng nó lại hoạt động như một statefull (class) component. Tất cả là nhờ cái `useState`, vâng nó chính là Hooks của chúng ta đấy ạ.  React Hooks cung cấp cho chúng ta một bộ các built-in Hooks (tại sao gọi là built-in thì chúng ta sẽ đề cập sau), giúp chúng ta sử dụng được các thành phần tạo nên React (building block).  Hiện tại các built-in Hooks này đang được chia làm 2 loại:
- Basic Hooks: 
    - `useState`: giúp chúng ta sử dụng được State
    - `useEffect`: giúp chúng ta xử lý các side effects, tác vụ được truyền cho useEffect sẽ được thực hiện sau quá trình *browser pain* ( chú ý là pain chứ không phải render), trong một deferred event.  
    - `useContext`: giúp chúng ta sử dụng Context
- Additional Hooks
   - `useReducer`: một phiên bản nâng cao hơn của useState (thực ra ở [implement code](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberHooks.js#L336) thì useState sẽ trả về một phiên bản đơn giản của useReducer :confused: ), giúp chúng ta xử lý các state nhiều phần và phức tạp, nếu bạn đã từng làm việc với Redux hay một vài thư viện quant lý state khác thì chắc hẳn bạn sẽ biết nó hoạt động thế nào.
   - `useCallback`: trả về một callback (function) đã được memoized. useCallback được sử dụng với mục đích tối ưu hóa ngăn chặn sự render dư thừa của các component con cần sử dụng callback.
   - `useMemo`: memoized một value (có thể là một function render child component), mục đích tương tự với useCallback.
   - `useRef`: giúp chúng ta sử dụng ref. Một điều đáng nói là useRef được giới thiệu là hữu dụng hơn so với sử dụng thuộc tính ref thông thường. 
   - `useImperativeMethods`: cho phép Child component tùy chỉnh instance trả về cho parent khi sử dụng ref. Chú ý là khi child component là một function component cũng có thể sử dụng 
   - `useMutationEffect`: nhiệm vụ tương tự như useEffect nhưng useMutationEffect được gọi đồng bộ (synchronously) trong *cùng* giai đoạn mà React thực hiện các thay đổi DOM của nó.
   - `useLayoutEffect`: nhiệm vụ cũng tương tự useEffect nhưng  được gọi đồng bộ *sau* khi DOM đã được update.
 
 Note: Có thể bạn sẽ cảm thấy rất khó hiểu về 3 thắng `useEffect`, `useMutationEffect` và `useLayoutEffect`. Nhưng như mình đã nói đấy, 3 thằng này có nhiệm vụ tương tự nhau là để xử lý side effects (implement code chúng gọi đến cùng 1 [function](https://github.com/facebook/react/blob/5f06576f51ece88d846d01abd2ddd575827c6127/packages/react-reconciler/src/ReactFiberHooks.js#L477)) và chỉ khác nhau ở thời điểm được xử lý.  Và nếu mình không hiểu nhầm thì nó sẽ có thứ tự tương đương trong lifecyle như hình dưới.
 
 ![](https://images.viblo.asia/f36b2f7c-2c1c-4c1f-886c-f711909f4f87.jpg)
 
 ### Show Me Some Code!
 Số Hooks thì khá là nhiều, mà mục đích bài viết cũng chỉ là giới thiệu thôi, nên chúng ta sẽ cùng nhau xem qua các Basic Hooks thôi nhé, phần còn lại các bạn có thể xem [tại đây](https://reactjs.org/docs/hooks-reference.html).
 #### State Hook
 Vâng quay lại ví dụ ở bên trên. Chúng ta đã có cú pháp sử dụng state hook
 ```javascript
const App = () => {
  const [count, setCount] = useState(0); // Cái dòng này mới là cái cần chú ý này
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};
 ```
 Nếu bạn chưa sử dụng cú pháp `const [var1, var2, ...] = someArray`  thì nó được gọi là [array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) nhé. 
 
 Quay lại với state hook, chúng ta sẽ giải thích từng phần để có thể hiểu nó đang làm gì
 ```javascript
 const [count, setCount] = useState(0);
 ```
 Như các bạn thấy, function `useState` nhận vào 1 giá trị, đây sẽ là giá trị khởi tạo của state. 
 
 Ở vế trái, chúng ta có 2 biến `count` và `setCount`. Như các bạn thấy, `count` chính là giá trị của state hiện tại và `setCount` chính là một function để thay đối giá trị của state. 
 
 Như vậy, function `useState` sẽ nhận vào một giá trị khởi tạo, và trả ra một array chứa 2 phần tử, một value và một mutator của value đó. Nếu các bạn quen với việc sử dụng class component thì viết lại thế này có lẽ sẽ quen hơn 1 chút.
 ```javascript
  const [state, setState] = useState(initialState);
 ```
 
 Ok. Với trường hợp đơn giản state chỉ là string hay số thì như trên rồi, vậy với trường hợp state là các object hay sử dụng nhiều state thì sao:
 
 {@embed: https://codepen.io/ducpv193-the-decoder/pen/VVxbWQ}
 
 ```javascript
const App = () => {
  const [fruits, setFruits] = useState({
    banana: 0,
    apple: 0
  });
  const [anything, setAnything] = useState(0);

  return (
    <div className='container'>
      <p>You clicked banana {fruits.banana} times</p>
      <button onClick={() => setFruits({...fruits, banana: fruits.banana + 1})}>
        Click banana
      </button>
      <p>You clicked apple {fruits.apple} times</p>
      <button onClick={() => setFruits({...fruits, apple: fruits.apple + 1})}>
        Click apple
      </button>
      <p>You clicked anything {anything} times</p>
      <button onClick={() => setAnything(anything + 1)}>
        Click anything
      </button>
    </div>
  );
};
 ```
 
Mọi thứ có vẻ không thay đổi nhiều lắm, nhưng hãy chú ý đoạn này
```javascript
<button onClick={() => setFruits({...fruits, banana: fruits.banana + 1})}>
```
Với state là object hoặc array, khi set state mới hãy luôn nhớ truyền vào toàn bộ state nhé vì mutator sẽ set trực tiếp giá trị nó nhận được thành state mới, chứ không merge giá trị được truyền vào với state cũ như this.setState của classs Component đâu. 

#### Effect Hook
Như đã giới thiệu ở phía trên, Effect Hook giúp chúng ta xử lý các side effects, ví dụ như fetch data, thiết lập một kết nối, đọc DOM...., công việc mà với class component chúng ta sẽ xử lý ở componentDidMount, componentDidUpdate và componentWillUnmount. Đó là lý do mà trong phân giới thiệu về effect hook của documents nói rằng:
>>> you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
>>> 
Mặc dù về về mặt xử lý thì chúng hơi khác nhau, nhưng công việc thì giống nhau nên hiểu như vậy sẽ dễ chấp nhận hơn :roll_eyes:

Để tìm hiểu cách sử dụng effect hook, chúng ta cùng xem ví dụ sau:

{@embed: https://codepen.io/ducpv193-the-decoder/pen/YRvKjL}

```javascript
const App = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const text = `Window width is ${width}`;
    console.log(text);
    document.title = text;
  });
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return function cleanup() {
      window.removeEventListener('resize', handleResize);
    };
  });
  
  return (
    <div className='container'>
      <p>Window width is {width}</p>
    </div>
  );
};
```
Các bạn có thể thấy trong ví dụ trên, để sử dụng effect hook chúng ta cần gọi `useEffect` bên trong component. `useEffect` sẽ nhận vào một `function` và như các bạn thấy function có thể có return hoặc không, nếu có thì nó phải return một function.

`useEffect` có return gọi là Effects With Cleanup, nó xử lý những tác vụ mà cần phải dọn dẹp khi component unmount hoặc props thay đổi để tiết kiệm tài nguyên hoặc loại bỏ các event dư thừa như ví dụ trên.
```javascript
useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
```
Function mà effect trả về sẽ được sử dụng để thực hiện công việc dọn dẹp này. Thực tế thì function này không cần đặt tên, nhưng trong ví dụ vẫn sử dụng để dễ tưởng tượng hơn :ok_hand:

Ngược lại, effect không có return gọi là Effects Without Cleanup, effect này xử lý các tác vụ không cần dọn dẹp vì nó hầu như chả ảnh hưởng đến nhà ai cả.
```javascript
  useEffect(() => {
    const text = `Window width is ${width}`;
    console.log(text);
    document.title = text;
  });
```

Và như các bạn thấy, cũng giống như useState, useEffect có thể sử dụng nhiều lần, điều này giúp chúng ta tách các effect với logic khác nhau ra để dễ xử lý hơn. 

Mặc định useEffect sẽ luôn được gọi sau mỗi lần component render. Nhưng đôi khi để tối ưu hóa hoặc tránh các tác vụ trùng lặp, chúng ta chỉ muốn chạy effect khi một thuộc tính nào đó thay đổi, khi này chúng ta có thể truyền thêm một giá trị thứ 2 cho useEffect, giá trị này sẽ là một array chứa các giá trị mà effect sẽ phụ thuộc vào
```javascript
useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id);
    };
}, [props.friend.id]);
```
Như trong ví dụ trên, chúng ta sẽ chỉ muốn thực thi tác vụ `subscribe` khi friendId thay đổi.

Thêm vào đó nếu chúng ta chỉ muốn effect chạy một lần duy nhất và không bị thuộc vào bất kì giá trị nào, chúng ta có thể truyền một empty array `[]` cho effect giống như trong ví dụ về window resize event phía trên
```javascript
useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
```

Bạn có nhớ bạn đã phải gọi 1 function xử lý ở cả componentDidMount, componentDidUpdate như thế nào không. Thực sự thì điều này xảy ra rất nhiều khiến chúng ta thường xuyên phải copy logic giữa 2 lifecycle. `useEffect` thì đảm nhiệm nhiệm vụ của cả 2, vì thế khi sử dụng `useEffect`chúng ta đã loại bỏ được sự trùng lặp logic giữa các lifecycle một cách tự nhiên luôn.

#### Context Hook
Nếu các bạn đã sử dụng qua Context mới của React thì chắc hẳn bạn không lạ gì với sự đáng sợ khi phải sử dụng nhiều context như thế này
```javascript
const Content = () => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```
Tuy nhiên với hook context thì chúng ta có thể giảm bớt vấn đề này một chút
```javascript
const Content = () => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
    <ProfilePage user={user} theme={theme} />
  );
}
```
Như các bạn thấy, cú pháp sử dụng hook context là `const contextValue = useContext(Context)`. Function `useContext` nhận vào một object context (giá trị được trả về từ React.createContext) và trả về giá trị của context hiện tại. 

Ví dụ:
{@embed: https://codepen.io/ducpv193-the-decoder/pen/gQKMrJ}

Có một điều đáng tiếc là context hook chỉ mới giải quyết vấn đề của Consumer, còn về Provider thì vẫn chưa được hỗ trợ. Hi vọng tương lai context hook sẽ giải quyết nốt vấn đề này, khi đó thì việc sử dụng Context sẽ đơn giản hơn rất nhiều.

### Custom Hooks
Ở phần trên, chúng ta có nhắc tới việc hooks giúp chúng ta xử lý vấn đề lặp logic giữa các component. Trước đây chúng ta thường chuyển các logic trùng lặp vào bên trong một HoCs, điều này buộc chúng ta phải add thêm các component vào tree render. 

Vậy với hooks chúng ta sẽ giải quyết vấn đề này như thế nào, chúng ta sẽ cùng xem lại ví dụ về window resize:

{@embed: https://codepen.io/ducpv193-the-decoder/pen/QJxGQX}

```javascript
const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return width;
};
const ComponentA = () => {
  const width = useWidth();
  console.log(`ComponentA width: ${width}`);
  
  return (<p>Window width is {width}</p>);
}
const ComponentB = () => {
  const width = useWidth();
  console.log(`ComponentB width: ${width}`);
  
  return (<p>Window width is {width}</p>);
}
const App = () => {  
  return (
    <div className='container'>
      <ComponentA />
      <ComponentB />
    </div>
  );
};
```

Trong trường hợp này, có 2 component cần sử dụng logic về window resize, vì vậy phần logic này đã được tách ra một function có tên `useWidth` . Function sử dụng các built-in hook để xử lý state và side effect như chúng ta đã làm ở trên và khi component sử dụng chỉ cần gọi `useWidth` và mọi thứ lại hoạt động như bình thường. Lúc này `useWitdth` được gọi là một custom Hook.

Bạn có thể tùy ý lựa chọn xem custom hook nhận tham số gì, có cần phải return gì không... bởi vì cũng giống như built-in hooks nó cũng chỉ là một javascript function thông thường. 
### Rule Of Hooks
Hooks cung cấp cho chúng ta một hướng viết component mới ngắn gọn hơn, ít duplicate hơn và hạn chế phải sử dụng các pattern phức tạp hơn. Nói chung Hooks là một tính năng thú vị đáng mong đợi trong phiên bản sắp tới. 

Tuy nhiên, Hook không hẳn là một ma thuật gì đó, Hook vẫn cần phải tuân thủ những rule khá khắt khe để có thể hoạt động chính xác.

1. Chỉ gọi ở  Top Level của component
2. Chỉ gọi ở React Functions

Giải thích: Updating...
### Future of Hook
Trong phiên bản tiếp theo, nếu được chấp thuận đưa vào sử dụng, Hooks sẽ là một hướng đi mới, chúng ta sẽ viết Function Component nhiều hơn bởi sự tiện lợi của Hooks.

Có thể bạn sẽ lo lắng việc Class Component sẽ bị khai tử bởi sự ra đời của Hooks và chúng ta sẽ phải viết lại tất cả component trong phiên bản mới. Nhưng các bạn yên tâm React chưa hề có kế hoạch nào cho việc này. Thêm vào đó ở FB người ta có cả chục ngàn class component, có lẽ họ cũng không hề muốn viết lại toàn bộ số component đó chút nào đâu.

Một điều cuối cùng là hiện tại, Hooks cũng vẫn đang là tính năng thử nghiệm, việc nó có được đưa vào ở phiên bản tiếp theo hay không thì cũng chưa chắc chắn. Thế cho nên là chớ có dại mà đem nó vào production bây giờ. Hiện tại thì Hooks vẫn đang được thảo luận [tại đây](https://github.com/reactjs/rfcs/pull/68), nếu trong quá trình dùng thử, bạn có tưởng gì hay ho thì có thể vào đó đóng góp.

### Kết
Thực sự thì Hooks là một tính năng đáng mong đợi, qua bài viết này hi vọng mọi người có thể hiểu một chút về Hooks và sẵn sàng sử dụng nó trong tương lại.

Bài viết này được viết trong quá trình Hooks vẫn đang được thử nghiệm, rất có thể những điều trong bài viết sẽ không còn đúng khi Hooks chính thức được sử dụng. Vì vậy để thông tin được chính xác nhất mọi người hãy cập nhập tại [official documentation](https://reactjs.org/docs/hooks-intro.html) nhé.

Cảm ơn mọi người đã đọc bài.

 ## Source
 https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889
 https://reactjs.org/docs/hooks-intro.html
 https://medium.com/the-guild/under-the-hood-of-reacts-hooks-system-eb59638c9dba
 https://twitter.com/dan_abramov/status/981712092611989509