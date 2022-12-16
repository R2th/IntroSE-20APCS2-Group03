Xin chào tất cả các bạn. Chúng ta lại gặp lại nhau trong bài post này =)).[ Bài trước](https://viblo.asia/p/lets-hooks-in-react-E375zWQRKGW) mình có giới thiệu qua về Hooks trong ReactJS và thử nghiệm một số basic hooks. Thì trong bài này mình sẽ giới thiệu một số hooks khác mà ReactJS cung cấp cho chúng ta. Ngoài ra song song với việc sử dụng hooks thì sẽ có một số lưu ý cho chúng ta để việc áp dụng nó một cách chính xác và trơn tru nhất.
Thôi không luyên thuyên nữa hãy cùng tìm hiểu nào!

# I. Tìm hiểu một số hooks ngoài những hooks cơ bản.
Ở bài post trước chúng ta đã biết được các hooks cơ bản như là `useState` dùng để giống như `setState`, `useEffect` dùng trong việc đưa xử lý đưa side effects và handle trong function sau mỗi lần render.

## #useReducer

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

Chúng ta sử dụng  `useReducer` như một cách khác thay thế cho việc sử dụng  `useState`. Nếu các bạn làm về `Redux` thì chắc hẳn sẽ thấy nó rất quen thuộc. `useReducer` nhận vào một reducer dạng `(state, action) => newState`. Khi sử dụng chúng ta sẽ nhận được một cặp bao gồm current state và dispatch function.

`useReducer` hướng đến việc khi chúng ta sử dụng hook `useState` trong trường hợp để xử lý các logic phức tạp hoặc trong trường hợp next state dựa vào previous state(vd đơn giản khi chúng ta xử lý tăng giảm một số vậy thì input sẽ phải là giá trị trước đó). Và khi sử dụng cùng với `useContext` thì chúng ta sẽ tránh được việc truyền call xuống những `DeepComponent`
```javascript
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // Note: `dispatch` won't change between re-renders
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```
```javascript
function DeepChild(props) {
  // If we want to perform an action, we can get dispatch from context.
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo</button>
  );
}
```
## #useCallback
```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
`useCallback` trả về một [memoized](https://en.wikipedia.org/wiki/Memoization) callback(Các bạn có thể vào link để hiểu thêm về Memoization nhé). 

`useCallback` nhận vào 1 callback và một mảng các phụ thuộc giá trị. Và sẽ trả về một version của inputed callback, chỉ thay đổi khi một trong các giá trị trong mảng các giá trị phụ thuộc thay đổi. Nó rất hữu dụng trong việc sử lý rerender component, giống với `useMemo(() => fn, deps)`

## #useMemo
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
Giống như mình đã nói ở trên nó khá giống với `useCallback`. Nó trả về một giá trị [memoized](https://en.wikipedia.org/wiki/Memoization). Dùng trong việc xử lý optimize performance khi rerender component.

Lưu ý là function truyền vào `useMemo` phải ở trong quá trình render.
## #useRef
```javascript
const refContainer = useRef(initialValue);
```
`useRef` trả về một ref object và sẽ được giữ trong suốt vòng đời của component.
```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
Chắc hẳn các bạn đã quen với việc sử dụng refs để access vào DOM. Nhưng đó mới chỉ là 1 khía cạnh sử dụng của `useRef` thôi. Nó hoạt động như một `instance field` trong class.
```javascript
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```
Ở trên là một vì dụ dùng `useRef` để lưu trữ id của một setInterval và chúng ta có thể clear id đó khi unmount component.

Trên đây mình đã giới thiệu một số hook ngoài những hook cơ bản. Thì cơ bản thì chúng ta sẽ sử dụng nhưng hook cơ bản hoặc là những customize hook nhiều hơn. Nhưng trong một số trường hợp những hook trên sẽ rất hữu dụng. Vì vậy chúng ta hãy cân nhắc các trường hợp và sử dụng đúng lúc, đúng chỗ nhé! Tiếp theo mình sẽ collect một số lưu ý(gọi là rule đấy) khi sử dụng hook.
# II. Một số rule khi sử dụng hooks.
Thực chất hooks là một javascript function. Nhưng khi sử dụng nó thì chúng ta cần lưu ý một số rule như dưới:

=> Chỉ được gọi hooks tại top level. Đừng sử dụng hook trong vòng lặp, if/else, nested function.

=> Chỉ được gọi hooks trong react component. Đừng gọi hooks trong một function javasript thông thường.

Thì chỉ có hai lưu ý lớn nhất như trên thôi. Và để chúng ta có thể sử dụng hooks một cách hiệu quả nhất thì hãy tuân thủ hai rule ở trên nhé!  Và trong quá trình sử dụng nó thì mỗi người chúng ta sẽ có những lưu ý cho riêng mình. 

Thì bài post của mình đến đây là hết rồi. Cảm ơn các bạn đã đọc. Mong rằng các bạn sẽ có những khoảng thời gian vui vẻ khi sử dụng hooks. Hẹn gặp lại trong bài post gần nhất! :grinning: