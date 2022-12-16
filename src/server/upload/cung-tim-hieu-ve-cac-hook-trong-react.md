# Cùng tìm hiểu về các hook trong React
* Đối với ai đã từng làm việc với React thì chắc hẳn đã có những lúc cảm thấy bối rối không biết nên dùng stateless (functional) component hay là stateful component. Nếu có dùng stateful component thì cũng sẽ phải loay hoay với đống LifeCycle 1 cách khổ sở 😣 Rất may là những nhà phát triển React đã kịp nhận ra vấn đề này và họ đã cho ra mắt 1 tính năng mới tên gọi là React hooks

## Giới thiệu về React Hooks
* Vậy thì React Hooks thực sự nó là gì!?
> HOOKS CHÍNH THỨC ĐƯỢC GIỚI THIỆU TRONG PHIÊN BẢN REACT 16.8. NÓ CHO PHÉP CHÚNG TA SỬ DỤNG STATE VÀ CÁC TÍNH NĂNG KHÁC CỦA REACT MÀ KHÔNG PHẢI DÙNG ĐẾN CLASS
>
* Điều này có nghĩa là từ phiên bản 16.8 trở đi, chúng ta đã có thể sử dụng state trong stateless (functional) component, việc mà từ trước tới nay ta bắt buộc phải khai báo Class. Có thể thấy, các nhà phát triển React họ đang muốn hướng đến 1 tương lai Functional Programming thay vì sử dụng những Class mà chỉ nghe cái tên thôi là ta đã nghĩ ngay đến OOP. Cộng với việc không sử dụng Class kế thừa từ React Component nữa nên giờ đây kích thước bundle sẽ được giảm đáng kể bởi code sử dụng Hooks.

* Để có thể thay thế được Class thì React Hooks cung cấp cho chúng ta một bộ các built-in Hooks, giúp chúng ta sử dụng được các thành phần tạo nên React, có 2 loại built-in đó là: Basic Hooks và Additional Hooks
## 
##  Basic Hooks
### useState
* Cái tên nói lên tất cả 🤣 hàm này nhận đầu vào là giá trị khởi tạo của 1 state và trả ra 1 mảng gồm có 2 phần tử, phần tử đầu tiên là state hiện tại, phần tử thứ 2 là 1 function dùng để update state (giống như hàm setState cũ vậy)

###  Ví dụ:

Ngày trước dùng Class thì viết như này

```
constructor(props) {
    super(props);
    this.state = { isLoading: false }
 }
 
 onClick() {
     this.setState({
         isLoading: true,
     })
 }
```
Còn bây giờ thì chỉ cần viết ngắn gọn như này

```
const [isLoading, setLoading] = useState(false);
 
onClick() {
     setLoading(true)
 }
```
* Khi muốn update state cho isLoading là true thì chỉ cần gọi đến hàm setLoading(true) là Ok, rất đơn giản và gọn nhẹ phải không nào 😄 Nếu như bạn đang làm việc với React-Redux để quản lý State thì mình khuyên bạn chỉ nên sử dụng useState để quản lý các UI State (là những state có giá trị boolean nhằm mục đích render ra UI) để tránh việc conflict với cả Redux State và maintain sau này.

### useEffect

* Như đã giới thiệu trong phần mở đầu về sự phức tạp trong các hàm LifeCycle thì để thay thế nó chúng ta sẽ có hàm useEffect. Nó giúp chúng ta xử lý các side effects, useEffect sẽ tương đương với các hàm componentDidMount, componentDidUpdate và componentWillUnMount trong LifeCycle.

### Ví dụ:
```
import { callApi } from './actions'
 
const App = ({ callApi, data }) => {
  useEffect(() => {
    callApi('some_payload_')
  }, [])
  return(
    <div>
         {data.map(item => {// do something })}
    </div>
  )
}
 
const mapDispatchToProps = dispatch => ({
  callApi: (keyword) => dispatch(callApi)
})
 
export default connect({}, mapDispatchToProps)(App)
```
* Có thể thấy trong useState ta cũng có thể thực hiện công việc call API giống như hàm ComponentDidMount ngày trước. Để tránh việc hàm useEffect luôn chạy vào mỗi khi có thay đổi State thì ta có thể truyền vào tham số thứ 2 trong useEffect đó là 1 array, trong array này ta có thể truyền vào đó những giá trị mà useEffect sẽ subcribe nó, tức là chỉ khi nào những giá trị đó thay đổi thì hàm useEffect mới được thực thi. Hoặc bạn cũng có thể truyền vào 1 array rỗng thì khi đó nó sẽ chỉ chạy 1 lần đầu tiên sau khi render giống với hàm ComponentDidMount 
### Ví dụ:
```
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source], // giá trị được subcrive
);
 
```

* Còn 1 vấn đề nữa đó là trong hàm useState ta có thể return về 1 function (chú ý là bắt buộc phải return về function) thì khi làm điều này nó sẽ tương đương với việc ta sử dụng hàm LifeCycle componentWillUnMount.
* Tổng kết lại thì đây là những gì ta cần nhớ trong hàm useEffect:

```
useEffect(() => {
  // almost same as componentDidMount
  console.log('mounted!');
  return () => {
    // almost same as componentWillUnmount
    console.log('unmount!');
  };
}, []);
```
## Additional Hooks
### useReducer

* Thực tế khi sử dụng useState thì nó sẽ trả về 1 phiên bản đơn giản của useReducer, vậy nên chúng ta có thể coi useReducer như một phiên bản nâng cao hơn dùng để thay thế cho việc sử dụng useState. Nếu đã làm việc với React-Redux thì chắc hẳn bạn sẽ dễ dàng nhận ra flow quen thuộc này phải không nào. Giống như reducer trong Redux thì useReducer cũng nhận vào một reducer dạng (state, action) và trả ra một newState. Khi sử dụng chúng ta sẽ nhận được một cặp bao gồm current state và dispatch function.
### Ví dụ:

```
const initialState = {count: 0}
 
function Reducer(state, action) {
  const [count, setCount] = useState(0);
  switch (action.type) {
    case 'INCREMENT':
      return setCount( count + 1);
    case 'DECREMENT':
      return setCount( count - 1);
    default:
      throw new Error();
  }
}
 
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <StyledLogo src={logo} count={count}/>
      <Count count={count} />
      <div style={{display: 'flex'}}>
        <button onClick={() => dispatch({type: 'DECREMENT'})}> - </button>
        <button onClick={() => dispatch({type: 'INCREMENT'})}> + </button>
      </div>
    </>
  )
}
```
### useMemo
* useMemo giúp ta kiểm soát việc được render dư thừa của các component con, nó khá giống với hàm shouldComponentUpdate trong LifeCycle. Bằng cách truyền vào 1 tham số thứ 2 thì chỉ khi tham số này thay đổi thì thằng useMemo mới được thực thi.
### Ví dụ:
* Không sử dụng useMemo:
```
const NotUsingMemo = ({ products }) => {
  const soldoutProducts = products.filter(x => x.isSoldout === true); // soldoutProducts sẽ luôn luôn thực thi mỗi khi NotUsingMemo được re-render
};
```
* Có sử dụng useMemo:

```
const UsingMemo = ({ products }) => {
  const soldoutProducts = useMemo(
    () => products.filter(x => x.isSoldout === true), // / soldoutProducts sẽ chỉ thực thi khi props products thay đổi
    [products] // watch products
  );
};
```

### useCallback
* useCallback có nhiệm vụ tương tự như useMemo nhưng khác ở chỗ function truyền vào useMemo bắt buộc phải ở trong quá trình render trong khi đối với useCallback đó lại là function callback của 1 event nào đó như là onClick chẳng hạn.
### Ví dụ:

```
const App = () => {
  const [text, setText] = React.useState('');
 
  return (
    <>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <Wrap />
    </>
  );
};
 
const Wrap = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const toggleChecked = useCallback(() => setIsChecked(!isChecked), [
    isChecked
  ]);
 
  return <Checkbox value={isChecked} onClick={toggleChecked} />;
};
 
const Checkbox = React.memo(({ value, onClick }) => {
  console.log('Checkbox is renderd!');
  return (
    <div style={{ cursor: 'pointer' }} onClick={onClick}>
      {value ? '☑' : '□'}
    </div>
  );
});
```

* Trong ví dụ trên ta sử dụng useCallback cho sự kiện onClick, điều này có nghĩa là việc thay đổi giá trị text trong ô Input sẽ không làm component Checkbox bị re-render.

### Kết luận
* Ngoài những hook cơ bản hay được sử dụng mà mình đã giới thiệu ở trên thì vẫn còn 1 số hook khác như là useContext, useRef, useLayoutEffect, useDebugValue, useImperativeHandle các bạn có thể vào trang chủ của react hooks để tìm hiểu thêm nhé.

* Để có thể sử dụng hooks một cách hiệu quả và tối ưu nhất thì mọi người hãy lưu ý rằng hạn chế sử dụng hooks trong các vòng lặp hay nested function bởi vì như vậy nó sẽ làm mất đi tính đúng đắn của hooks. Một điều nữa là bạn chỉ nên gọi hooks trong React component, đừng gọi hooks trong một function javasript thông thường.

* Rồi ok, đó là tất cả những gì mà mình muốn chia sẻ với mọi người trong bài viết lần này. Hy vọng mọi người sẽ cảm thấy thích thú khi làm việc cùng với hooks. Hẹn gặp lại các bạn trong bài viết sắp tới!