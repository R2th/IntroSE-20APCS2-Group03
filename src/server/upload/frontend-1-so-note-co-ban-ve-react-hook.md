Đây là 1 số note cơ bản về Reactjs Hook mình đang học, những kiến thức cản bản thui nhưng hy vọng sẽ giúp ích gì đó cho mọi người. Có gì mới thì mình sẽ update vào bài này luôn, có những chỗ sai sót ý mong các bạn góp ý ạ, mình cảm ơn nhiều lắm.... hii chúc mọi người buổi tối vui vẻ ạ
# I> Khái niệm cản bản về React Hook
React hook đã được lên bản chính thức kể từ phiên bản 16.8. Trước đó, vào React Conf 2018 ở Cali đội ngũ phát triển đã giới thiệu nó và bắt đầu bản beta cho các phiên bản kế và nay đã là bản chính thức. Nếu ta vào https://reactjs.org/docs/hooks-intro.html bản đã thấy nó từ beta sang new


Hook cho phép ta không cần thiết phải tạo class component, chỉ cần tạo function less component vẫn có thể có thể sử dụng state và các features. Điều này khiến các component nhẹ nhàng hơn hơn nhiều, giảm số lượng code cần thiết phải code, đồng thời dễ hiểu ít nhầm lẫn hơn về một số khái niệm như livecycle với 1 lập trình viên mới

## 1. Lợi ích từ hook:
### a. Giảm số lượng code đáng kể
Có thể giảm số lượng đáng kể, theo thống kê khoảng 90% với 1 project trung bình do:
- Nhờ việc quản lý state dễ dàng và hiệu quả hơn với hook, ta có thể tránh lỗi wrapper hell
![alt text](https://miro.medium.com/proxy/1*SU5_ws88Kh_Oio_L4Myhvg.png "image")
- Đồng nghiệp không thấy chán nản khi reivew code

Here's our logo (hover to see the title text):


### b. Không bắt buột phải dùng
Việc sử dụng hook hoàn toàn không bắt buột, không cần thiết phải học kiến thức mới vẫn có thể áp dụng cách viết class component với es6 từ phiên bản cũ. Hook chỉ cung cấp các cách viết ngắn gọn và tương tác dễ dàng và hiệu quả hơn với props, state, context, refs, và các lifecycle
### c. Dễ dàng hiểu hơn:
Việc ra đời hook, sẽ làm dễ dàng dễ hiểu hơn việc dùng các lifecycle
Cũng như việc project càng mở rộng, thay đổi api khi maintain thì code reacjs phải thay đổi tương ứng trong các component như `componentDidMount` hay `componentDidUpdate` ,vv ứng dụng ngày càng nặng nề và khó hiểu


---

# II> UseState Hook:

### 1> VÍ dụ: hiển thị số lượng bấm vào nút button:
``` javascript
import React, { useState } from 'react';

function Example() {
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

Ví dụ này tương đương với nếu viết class component

``` javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
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
### 2.phân tích ví dụ:
Ở ví dụ này:
 `[count, setCount] = useState(0); `
- useState là 1 function nhận 0 là giá trị sẽ setState cho biến count trong lần render đầu tiên
Nó trả về state(ở đây là count), và setState(setCount) là function cập nhật state.
- cách sử dụng : `{count}` thay vì `{this.state.count}`
- update state: setState có thể được gọi trong event của component:
setCount tương ứng với setState({count: this.state.count+1 })



_**Chú ý:**_

- việc khai báo hook đặt trên đầu tiên trong nội dung component (theo rule: https://reactjs.org/docs/hooks-rules.html )
- cặp state và setState phải là 1 cặp(tiền tố bắt đầu bằng set)

- Có thể khai báo nhiều useState, đặt tên phù hợp và khai báo theo kiểu array destructuring
``` javascript
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState("banana");
  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);

```

- function của nó là useState mà không phải createState, vì state lun cập nhật lên tục, dùng từ create chỉ ý nghĩa tạo trong lần đầu tiên rùi thui

## 3> Chú ý:
- Điểm khác biệt so với setState là nó không thể tự động auto merged cập nhật object/array.

Có thẻ dùng spread operator để giải quyết:
``` javascript
setState(prevState => {
  // Object.assign would also work
  return {...prevState, ...updatedValues};
});

```
hoặc `useReducer` có thể dùng cho cả nested object



---

# III> useEffect
## 1> Định nghĩa và ví dụ
- được thực thi ngay  khi cập nhật Dom,
là function giúp làm thay đổi bên trong component,
useEffect tương đương với `componentDidMount`, `componentDidUpdate` và `componentWillUnMount`

Ví dụ: về việc khi cập nhật số lượng của biến count(ví dụ ở useState), ta sẽ lưu nó vào localstorage

``` javascript
import React, { useState, useEffect } from 'react';

export function Test() {
  const [count, setCount] = useState(()=> JSON.parse(localStorage.getItem("count")));

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    localStorage.setItem("count", JSON.stringify(count));
  });

  return (
    <div>
      <div>count: {count}</div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

```

``` javascript
import React from 'react';

export default class Test extends React.Component{

  componentDidMount() => {
    document.title = `You clicked ${count} times`;
    localStorage.setItem("count", JSON.stringify(count));

  }
  componentDidUpdate() => {
    document.title = `You clicked ${count} times`;
    localStorage.setItem("count", JSON.stringify(count));
  }

  render() {

    return (
      <div>
        <div>count: {count}</div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    );
  }
}

```


## 2> Phân tích ví dụ:
- useEffect được khai báo trong component
- Cách khai báo
``` javascript
useEffect(() => {
   ......
  });
```
- Tuy cách khai báo khác nhau, hoạt động khác nhau nhưng ví dụ phía trên tương đương với  2 lifecycle `componentDidMount`, `componentDidUpdate`


## 3> Cách thức hoạt động:
### a. Cơ bản:
 - useEffect: khi component cần cập nhật lại sau khi render, nó sẽ gọi useEffect
 - useEffect nằm trong component để mà khi có props pass hay state trong trong component update thì sẽ gọi nó và có thể truy cập các biến ấy

 - useEffect sẽ chạy khi mà mỗi khi render: đó là mặc định. Ta có thể customize lại:
Lấy ví dụ ở trên ta có:
``` javascript
useEffect(() => {
    document.title = `You clicked ${count} times`;
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);
```
### b. Tối ưu chỉ gọi lại khi cần thiết:
+ Ví dụ trên, ta pass [count] như là tham số thứ 2 trong useEffect. Ở lần cập nhật , nó sẽ so sánh giá trị kế với giá trị trươc đó: nếu là giá trị biến count giống như giá trị biến count trước đó nó sẽ không render lại.
+ Việc này giống như trong lifecycle `componentDidUpdate` :
``` javascript
componentDidUpdate(prevStates, prevProps) {
  if( this.sate.count !== prevStates.count ) {
    document.title = `You clicked ${count} times`;
    localStorage.setItem("count", JSON.stringify(count));
  }
}

```
Ta chỉ thực hiện viện thay đổi title của trang và set vào localStorage khi biến count thay đổi giá trị.

Xem thêm : https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
_**Chú ý**_: Trường hợp nó là 1 array/object thì vẫn bị render lại


+
``` javascript
useEffect(() => {

  }, []);

```
trường hợp này chỉ dùng khi effect nầy không sử dụng bất kỳ biến nào trong component scope, nó sẽ dùng init props/state nếu có (nếu muốn effect này chỉ chạy 1 lần và clean đi(mount và unmount)) --> không cần phải re-render lại

### c.trường hợp nhiều effect:
``` javascript
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState('Mary');

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState('Poppins');

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}

```
Thứ tự gọi sẽ là
``` javascript
// ------------
// First render
// ------------
useState('Mary')           // 1. Initialize the name state variable with 'Mary'
useEffect(persistForm)     // 2. Add an effect for persisting the form
useState('Poppins')        // 3. Initialize the surname state variable with 'Poppins'
useEffect(updateTitle)     // 4. Add an effect for updating the title

// -------------
// Second render
// -------------
useState('Mary')           // 1. Read the name state variable (argument is ignored)
useEffect(persistForm)     // 2. Replace the effect for persisting the form
useState('Poppins')        // 3. Read the surname state variable (argument is ignored)
useEffect(updateTitle)     // 4. Replace the effect for updating the title

// ...
```

### d. [Cleaning up an effect](https://reactjs.org/docs/hooks-reference.html#cleaning-up-an-effect) :
Những effect mà có return nhằm để dọn dẹp những tác vụ không cần thiết khi unmount hoặc dọn dẹp các event không dùng nữa. Tham số thứ 2 của useEffect là [] : chạy 1 lần duy nhất

``` javascript
useEffect(() => {
  // almost same as componentDidMount
  console.log('mounted!');
  return () => {
    // almost same as componentWillUnmount
    console.log('unmount!');
  };
}, []);

_Ví dụ_:
useEffect(() => {
    const clicked = () => console.log('window clicked')
    window.addEventListener('click', clicked)

    // return a clean-up function
    return () => {
      window.removeEventListener('click', clicked)
    }
  }, [])
```

## 4> Tóm lại:
- constructor: không cần thiết. Nếu cần thiết khai báo state, có thể dùng useState, còn nếu muốn tính toán và set cho state, ta có thể sử dụng function trong useState

- shouldComponentUpdate: có thể dùng React.memo thay thế (nhưng nó chỉ shallowly so sánh props)

- render: nằm trong return
- componentDidMount, componentDidUpdate, componentWillUnmount:== useEffect

- componentDidCatch và getDerivedStateFromError : chưa phát triển
- getDerivedStateFromProps



**Nguồn:**
* [How do lifecycle methods correspond to Hooks](https://reactjs.org/docs/hooks-faq.html#how-do-lifecycle-methods-correspond-to-hooks)

* [How do I implement shouldComponentUpdate](https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate)

---

# IV> Rules of Hooks:
Các phần trước đó ta đã trình bày sơ qua, nhưng phần này trình bày tổng quan laị

## 1> Chỉ gọi hook ở đầu function
- Điều này chắc chắn rằng hook có thể được gọi đúng thứ tự khi render cũng như khi re-render lại
- run đúng khi sử dụng nhiều useState hay useEffect

## 2> Chỉ nên gọi hook trong function component hay custom của hooks


---
# V> Các api khác:
## 1> useMemo:
### a. Why?
 Tương tự như các cách để tránh re-render lại khi không cần thiết(shouldComponentUpdate, memo, pureComponent), react hook có hỗ trợ useMemo để làm việc.
(
   dùng để memorize tất cả mọi thứ (string, array, function, vv), trả về 1 gía trị cụ thể (string, array, function, vv), thường đề truyền xuống các child component (pure) để nó không render lại khi không cần thiết và lưu các kết quả mà yêu cầu tính toán phức tạp mới ra được kết quả.
)
### b. Cú pháp
``` javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
### c.Dùng trong các trường hợp:
- Referential equality (so sánh)
Ví dụ trong trường hợp này:
``` javascript
export const Word2 = () => {
  const [text, setText] = useState('A!');

  const ChildComponent = ({ text }) => {
    console.log('rendered again!');
    return (
      <div>
        {text.toUpperCase()}
      </div>
    );
  }

  const MemoizedComponent = useMemo(() => <ChildComponent text={text} />, [text]);

  return (
    <div>
      <h3>useMemo</h3>
      <button onClick={() => setText("A")}>A! </button>
      <button onClick={() => setText('B!')}>B!</button>
      {MemoizedComponent}
    </div>
  )
  ```
  Nếu click lại cùng 1 button, nó sẽ so sánh state trước đó giống với state hiện tại--> ko render lại

- Computationally expensive calculations (tính toán giá trị phức tạp):
Ví dụ với những tính toán phức tạp, nó chỉ nên tính toán lại khi cần thiết(value thay đổi)

``` javascript
function calculate(iterations,multiplier) {
  var result = 0;
  for(var i=0;i<iterations;i++>){
    result += iterator*multiplier;
  }
  return result;
}

function RenderIfNeed({iterations, multiplier}) {
  //render if props change
  const number =  React.useMemo(() => calculate(iterations, multiplier), [
    iterations,
    multiplier,
  ])
  return <div>Primes! {number}</div>
}

function NumberLarge(){
  ...
  return(
    <div>
    ....
    <RenderIfNeed iterations={a} multiplier={b}/>
    </div>
  )
}
```
### d. Chú ý:
- Không nên lạm dụng việc dùng useMemo hay useCallBack, vì nó cũng sẽ tốn 1 khoảng chi phí tính toán để xác định có nên thực hiện lại việc render hay lưu giá trị tính toán cũ. React cũng đủ nhanh trong hầu hết tất cả trường hợp đủ thực hiện mà không cần phải dùng đến chúng

## 2> useCallBack
``` javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);

```

- Thay vì return 1 value như useMemo, useCallBack return 1 fucntion
- Được dùng để chống sự re-render lại khi không cần thiêt của các thành phần con khi các sự phụ phụ thuộc có liên quan thay đổi (ví dự giống như `shouldComponentUpdate`)
(
   dùng để memorize handler, trả về 1 function, thường đề truyền xuống các child component (pure) để nó không render lại khi không cần thiết
)
- useCallback(fn, deps) sẽ tương đương với useMemo(() => fn, deps).
_**Ví dụ:**_

```javascript
const CountButton = React.memo(function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
})
function DualCounter() {
  const [count1, setCount1] = React.useState(0)
  const increment1 = React.useCallback(() => setCount1(c => c + 1), [])
  const [count2, setCount2] = React.useState(0)
  const increment2 = React.useCallback(() => setCount2(c => c + 1), [])
  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  )
}
```

## 3> useRef:
- Ta có thể tạo ref cho component thay vì dùng createRef():

_Ví dụ:_ ta tạo ref cho input
``` javascript
const inputNameRef = useRef();
```
- Sau đó chỉ ref cho đối tượng cần gán và sau đó sử dụng như bình thường như với ref ta từng dùng với class component
``` javascript
form onSubmit={e => e.preventDefault()}>
  <input
  ...
    ref={inputNameRef}
  />
  <button onClick={
    () => {
      setName("");
      inputNameRef.current.focus();
    }
  }>
    ok
  </button>
</form>
```

**sự khác nhau useRef và createRef**:(createRef render lại mỗi khi component update 
- Different between useRef and createRef
https://stackoverflow.com/questions/54620698/whats-the-difference-between-useref-and-createref

**useRef   đi kèm với useLayoutEffect**:

Google : useRef with uselayouteffect (https://linguinecode.com/post/when-to-use-useref-and-uselayouteffect)

**fowardRef**
+ foward ref —> gắn ref vào component con —> cha sử dụng gắn ref vào component (<Component ref=“” />)
https://reactjs.org/docs/forwarding-refs.html

Nó còn sử dụng kết hợp với useImperativeHandle : https://reactjs.org/docs/hooks-reference.html#useimperativehandle
(xem thêm: https://gist.github.com/danhdv-0883/b45ab32ddb63cd2f3775d7cc2f6cb03c#7-useimperativehandle)


## 4> useReducer:
- Đây như là một bảng nâng cấp của useStae hỗ trợ để xử lý state mạnh mẽ hơn.
Giúp việc xử lý nested object và update object(useState không làm được),


- **_Ví dụ_** : ta muốn thêm mới ghi chú, ta thực hiện chức năng thêm mới.

Ban đầu: ta có initState có mảng notes không có note nào cả. Việc reducer cũng tương tự như cách viết thư viện reducer, nhận vào state và action để trả về state tương ứng
``` javascript
const initState = {
  notes: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return {
        notes: [
          ...state.notes, { text: action.text }
        ]
      }
    case 'removeAll':
      return {
        notes: [],
      }
    default:
      throw new Error();
  }
}
```

- Ta khai báo useReducer:
``` javascript
 const [state, dispatch] = useReducer(reducer, initState)
```
 Nó nhận vào 2 tham số: reducer để xử lý, initState là state ban đầu. Tương ứng như các hook khác, ở đây trả về state, và dispatch
- Cách dispach cũng rất đơn giản, ta dispatch type và value. Việc sử lý sẽ do reducer dựa vào type và value vừa mới dispatch này


``` javascript
export const AddTodo = () => {
  const [text, setText] = useState();
  const [state, dispatch] = useReducer(reducer, initState)

  return(
    <div>
      <ul>
        {state.notes.map((note, index) => <li key={index}>{note.text}</li>)}
      </ul>

      <form onSubmit={e=> e.preventDefault()}>
        <input type="text" onChange={(e)=> setText(e.target.value)}>
        </input>
        <button onClick={() => { dispatch({ type: 'add', text }) }}>ok</button>
      </form>
    </div>
  );

}
```

## 5> useLayoutEffect:
- gần giống useEffect, khác it fires synchronously after all DOM mutation(được gọi đồng bộ sau khi DOM đã được update.)
Nên nó được dùng để đọc tính toán layout, style sau khi dom đã thay đổi, nhưng trước khi phase painted vẽ layout mới

( useEffect sẽ chạy khi render commit : sau khi browser vẽ xong thì nó mới chạy cái này. useLayoutEffect sẽ chạy đồng bộ sau khi tất cả dom cập nhật --> nó cập nhật trước khi browrer vẽ ra)
- flow
![](https://raw.githubusercontent.com/donavon/hook-flow/master/hook-flow.png)
https://github.com/donavon/hook-flow)

- chú ý: không sử dụng nó nếu ta server render, chỉ dùng với trường hợp client render

-
1. useEffect không chặn người dùng thao tác (non block), nên chỉnh sửa DOM sẽ k nên làm ở đây, ở đây kiểu như làm những gì chạy ngầm k thao tác trực tiếp đến DOM
2. useLayoutEffect chặn người dùng thao tác (hiểu nôm na là nó block), thằng này chính xác là componentDidMount, componentDidUpdate ở các phiên bản Trước
render => Update DOM => useLayoutEffect cập nhật vài chi tiết trên DOM => browser vẽ ra cho người dùng thấy

Cụ thể hơn 1 tí là useLayoutEffect sẽ xem DOM lần cuối, nếu có sửa hay thêm gì thì làm ở đây, trước khi vẽ.

`useLayoutEffect ` chỉ tốt về mặt thao tác với DOM thôi. các việc khác, thông thường như là API, attach ref các kiểu thì nên thao tác nên sử dụng `useEffect ` (Đây là lời khuyên đến từ react team).

- Nếu animation cần thêm, sửa, xoá element của DOM : `useLayoutEffect`

## 6> useContext:
- Đơn giản hóa việc dùng context hơn so với trước đây
- Cú pháp dùng:
```javascript
 const value = useContext(MyContext);
 ```
Trong cú pháp này: useContext sử dụng context object được tạo ra từ React.createContext và sẽ trả về giá trị của context đó. Và giá trị context đó được lấy từ <MyContext.Provider> gần nhất.

- Ví dụ: ta tạo ra context và provider
``` javascript
const UserContext = createContext();

const UserProvider = (props) => {
  const [state, setState] = useState({
    backgroundColor: "blue"
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
}

export {
  UserContext,
  UserProvider,
}
```

Tương ứng:

``` javascript
<UserProvider>
  <TestUseContext />
</UserProvider>
````
Ta sử dụng context:

``` javascript
  export function TestUseContext() {
    const [state,setState] = useContext(UserContext);

    return (
      <>
        <p style={{ background: state.backgroundColor}}>xin chào</p>
        <input type="color" onClick={(e) => setState({backgroundColor,e.target.value)}/>
      </>
    )
```





## 7> useImperativeHandle:
- useImperativeHandle: Component child có thể tùy chỉnh các trả về ref cho Component cha.
useImperativeHandle phải đi kèm với forwardRef

- Việc sử dụng nó bản chất hỗ trợ thêm cho ref, cần tránh hạn chế dùng trong tất cả các trường hợp

- Ví dụ:
Đây là component con:
``` javascript
import React, { useRef, useImperativeHandle, forwardRef} from 'react';

function ChildInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => inputRef.current);

  return <input type="text" ref={inputRef} />;
}

export default forwardRef(ChildInput);
```
ở Component cha

``` javascript
import React, {useEffect, useRef} from "react";
import ChildInput from "./ChildInput";

export function ImperativeHandle () {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <ChildInput ref={inputRef} />
    </div>
  );
}
```




## 8> useDebugValue:
- Được sử dụng với DevTools, để hiển thị các nhãn với các custom hooks

- Cách dùng rất đơn giản:
```javascript
useDebugValue(label)
```

- Chú ý: Không được khuyến khích dùng, chỉ dùng 1 phần cho các shared library

# VI> Custom your hook:
- Giúp xử lý các vấn đề trùng lặp về logic, ta sẽ tách thành 1 component riêng và tái sử dụng. Thay vì trước đây phải dùng HOCs, điều đó khiến ta phải chuyển những gì trùng lặp vào HOCs


Ví dụ với useStae,Ta viết 1 component form:
``` javascript
import { useState } from "react";

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }
  ];
}
```
=> Sau đó sử dụng:
``` javascript
import React from "react";
import { useForm } from "./useForm";

const App = () => {
  const [values, handleChange] = useForm({ email: "", password: "" });

  return (
    <div>
      <>
        <input name="email" value={values.email} onChange={handleChange} />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </>
    </div>
  );
};
```


- Custom Hooks nó là convention theo như  design of Hooks, chứ không phải là một tính năng

- Việc custom : tên của component đó phải bắt đầu bằng từ khóa use, nó giúp việc kiểm tra tự động vi phạm theo như rule của hooks

- Các state của các component này là độc lập với nhau



Nguồn xem thêm: https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook

---



# VII> Các custom hook hay dùng:
https://usehooks.com/

https://www.hooks.guide/