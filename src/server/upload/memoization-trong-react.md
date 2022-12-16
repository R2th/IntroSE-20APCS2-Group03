![](https://images.viblo.asia/2fd54944-83d5-4eff-a36b-e9fc0dcb54ab.png)

### 1.Introduction

`Memoization` có liên quan mật thiết đến bộ nhớ đệm, và dưới đây là một ví dụ đơn giản:

```js
const cache = {}
function addTwo(input) {
  if (!cache.hasOwnProperty(input)) {
    cache[input] = input + 2
  }
  return cache[input]
}
```

Ý tưởng cơ bản là: kiểm tra đầu vào và sẽ `return` đầu ra trước đó nếu được gọi với cùng một đầu vào.

Vấn đề là tránh tính toán lại một giá trị mà bạn đã có kết quả được lưu trong bộ nhớ cache. Trong ví dụ trên, chúng ta đang tránh tính toán lại `input + 2`

```js
addTwo(3) // 5
addTwo(3) // 5, but this time we got it from the cache 🤓
// (we didn't have to recalculate it)
// I'll show up when we've memoized something
```

Một khía cạnh thú vị khác của `memoization` là trong thực tế, giá trị được lưu trong bộ nhớ cache mà bạn nhận lại giống với giá trị bạn nhận được lần trước. Vì thế:

```js
// let's imagine we have a function that returns an array of matching
// "post" objects:

// assuming getPostsNoMemo is not memoized
const posts1 = getPostsNoMemo('search term')
const posts2 = getPostsNoMemo('search term')
posts1 === posts2 // false (unique arrays)

// but if we memoize
// assuming getPostsMemo is memoized
const posts1 = getPostsMemo('search term')
const posts2 = getPostsMemo('search term')
posts1 === posts2 // true (identical array) 
```

Điều này có ý nghĩa thú vị đối với React mà chúng ta sẽ nói tiếp đó

### 2.React's memoization

React có 3 API để ghi nhớ: `memo`,` useMemo` và `useCallback`. 

`memo` hay `React.memo` là một `higher order component`, giúp tăng hiệu suất trong một số trường hợp bằng cách ghi nhớ kết quả. Điều này có nghĩa là React sẽ bỏ qua việc render component và sử dụng lại kết quả được render cuối cùng.
- https://reactjs.org/docs/react-api.html#reactmemo

`useMemo` là một hook của `React`, giữ cho một hàm không cần phải thực thi lại nếu nó không nhận được một tập hợp các tham số sử dụng trước đó. Nó trả về kết quả là một function. Sử dụng nó khi bạn muốn ngăn một thao tác nặng và tốn kém tài nguyên mỗi lần `render`

`useCallback` cũng là một hook của `React`, giữ cho một function không được tạo lại nữa dựa vào mảng các phần phụ thuộc. Sử dụng khi muốn truyền function vào `component` và chặn không cho một hàm nòa đó tiêu tốn thời gian, tài nguyên phải tạo lại.



- [Đọc thêm: useMemo vs useCallback](https://viblo.asia/p/react-hooks-su-khac-nhau-giua-usememo-va-usecallback-gDVK24jwlLj)

Chiến lược bộ nhớ đệm mà `React` đã áp dụng có kích thước là 1. 

Nghĩa là, chúng chỉ giữ lại giá trị gần đây nhất của đầu vào và kết quả.

Có nhiều lý do cho quyết định này, nhưng nó đáp ứng trường hợp sử dụng chính để ghi nhớ trong `React context`.

Vì vậy, đối với ghi nhớ của React, nó giống như thế này:

 ```js
let prevInput, prevResult

function addTwo(input) {
  if (input !== prevInput) {
    prevResult = input + 2
  }
  prevInput = input
  return prevResult
}
```

Và:

```js
addTwo(3) // 5 is computed
addTwo(3) // 5 is returned from the cache
addTwo(2) // 4 is computed
addTwo(3) // 5 is computed
```

Để rõ ràng, trong trường hợp của `React`, nó không phải là một phép so sánh thông lượng trước `!==` .

Nó kiểm tra sự thay đổi của từng `props` và từng phụ thuộc riêng lẻ. Hãy kiểm tra từng phần một nào:

```js
// React.memo's `prevInput` is props and `prevResult` is react elements (JSX)
const MemoComp = React.memo(Comp)

// then, when you render it:
<MemoComp prop1="a" prop2="b" /> // renders new elements

// rerender it with the same props:
<MemoComp prop1="a" prop2="b" /> // renders previous elements

// rerender it again but with different props:
<MemoComp prop1="a" prop2="c" /> // renders new elements

// rerender it again with the same props as at first:
<MemoComp prop1="a" prop2="b" /> // renders new elements
```

```js
// React.useMemo's `prevInput` is the dependency array
// and `prevResult` is whatever your function returns
const posts = React.useMemo(() => getPosts(searchTerm), [searchTerm])
// initial render with searchTerm = 'puppies':
// - getPosts is called
// - posts is a new array of posts

// rerender with searchTerm = 'puppies':
// - getPosts is *not* called
// - posts is the same as last time

// rerender with searchTerm = 'cats':
// - getPosts is called
// - posts is a new array of posts

// rerender render with searchTerm = 'puppies' (again):
// - getPosts is called
// - posts is a new array of posts
```

```js
// React.useCallback's `prevInput` is the dependency array
// and `prevResult` is the function
const launch = React.useCallback(() => launchCandy({type, distance}), [
  type,
  distance,
])
// initial render with type = 'twix' and distance = '15m':
// - launch is equal to the callback passed to useCallback this render

// rerender with type = 'twix' and distance = '15m':
// - launch is equal to the callback passed to useCallback last render

// rerender with same type = 'twix' and distance '20m':
// - launch is equal to the callback passed to useCallback this render

// rerender with type = 'twix' and distance = '15m':
// - launch is equal to the callback passed to useCallback this render
```

### 3.The value of memoization in React

Có hai lý do bạn có thể muốn ghi nhớ một cái gì đó:

1. Cải thiện hiệu suất bằng cách tránh tính toán lại các thành phần cũng như các hàm phức tạp
2. Giá trị bất biến

Trong `React context`, sự bất biến của giá trị này rất quan trọng đối với việc ghi nhớ các giá trị khác cũng như các `side-effect`. Hãy xem một ví dụ đơn giản:

```js
function App() {
  const [body, setBody] = React.useState()
  const [status, setStatus] = React.useState('idle')
  const fetchConfig = {
    method: 'POST',
    body,
    headers: {'content-type': 'application/json'},
  }
  
  const makeFetchRequest = () => (body ? fetch('/post', fetchConfig) : null)
  
  React.useEffect(() => {
    const promise = makeFetchRequest()
    
    // if no promise was returned, then we didn't make a request
    // so we'll exit early
    if (!promise) return
   
    setStatus('pending')
    promise.then(
      () => setStatus('fulfilled'),
      () => setStatus('rejected'),
    )
  }, [makeFetchRequest])
  
  function handleSubmit(event) {
    event.preventDefault()
    // get form input values
    setBody(formInputValues)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form inputs and other neat stuff... */}
    </form>
  )
}
```

Hãy đoán những gì sẽ xảy ra. 

Nếu bạn đoán "vòng lặp `side-effect`chạy liên tục" thì bạn đã đúng. 

Lý do là vì `React.useEffect` sẽ kích hoạt lệnh gọi đến `effect callback` bất cứ khi nào các phần tử riêng lẻ của mảng phụ thuộc thay đổi.

Phần phụ thuộc duy nhất của chúng ta là `makeFetchRequest` và `makeFetchRequest` được tạo trong `component` và điều đó có nghĩa là nó luôn mới mỗi lần `render`.

Vì vậy, đây là nơi mà tính bất biến giá trị của `memoization` đóng một vai trò quan trọng trong `React`. Vì vậy, hãy ghi nhớ `makeFetchRequest` với `useCallback`:

- [Đọc thêm: Hạn chế re-render khi sử dụng React hook với memo và useCallback](https://viblo.asia/p/han-che-re-render-khi-su-dung-react-hook-voi-memo-va-usecallback-yMnKMdjA57P)

```js
const makeFetchRequest = React.useCallback(
  () => (body ? fetch('/post', fetchConfig) : null),
  [body, fetchConfig],
)
```

Bây giờ `makeFetchRequest` sẽ chỉ trả về một hàm mới khi các phần phụ thuộc thay đổi. 

Thật không may, `fetchConfig` cũng được tạo trong `component` và điều đó có nghĩa là nó cũng mới mỗi khi `render`. Vì vậy, hãy ghi nhớ điều đó với giá trị bất biến:

```js
const fetchConfig = React.useMemo(() => {
  return {
    method: 'POST',
    body,
    headers: {'content-type': 'application/json'},
  }
}, [body])
```

Bây giờ `fetchConfig` và `makeFetchRequest` đều sẽ bất biến và sẽ chỉ thay đổi khi `body` thay đổi theo ý chúng ta:

```js
function App() {
  const [body, setBody] = React.useState()
  const [status, setStatus] = React.useState('idle')
  
  const fetchConfig = React.useMemo(() => {
    return {
      method: 'POST',
      body,
      headers: {'content-type': 'application/json'},
    }
  }, [body])
  
  const makeFetchRequest = React.useCallback(
    () => (body ? fetch('/post', fetchConfig) : null),
    [body, fetchConfig],
  )
  
  React.useEffect(() => {
    const promise = makeFetchRequest()
    // if no promise was returned, then we didn't make a request
    // so we'll exit early
    if (!promise) return
    
    setStatus('pending')
    promise.then(
      () => setStatus('fulfilled'),
      () => setStatus('rejected'),
    )
  }, [makeFetchRequest])
  
  function handleSubmit(event) {
    event.preventDefault()
    // get form input values
    setBody(formInputValues)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form inputs and other neat stuff... */}
    </form>
  )
}
```

Tính bất biến của giá trị được cung cấp bởi `useCallback` cho `makeFetchRequest` giúp chúng ta đảm bảo rằng có thể kiểm soát khi `side-effect` chạy.

Và sự bất biến của giá trị được cung cấp bởi `useMemo` cho `fetchConfig` giúp chúng ta duy trì các đặc điểm ghi nhớ cho `makeFetchRequest` để có thể hoạt động.

Bước cuối sẽ là refactor lại đoạn code cho pro hơn (y):

```js
function App() {
  const [body, setBody] = React.useState()
  const [status, setStatus] = React.useState('idle')
  
  React.useEffect(() => {
    // no need to do anything if we don't have a body to send
    // so we'll exit early
    if (!body) return
    
    setStatus('pending')
    const fetchConfig = {
      method: 'POST',
      body,
      headers: {'content-type': 'application/json'},
    }
    
    fetch('/post', fetchConfig).then(
      () => setStatus('fulfilled'),
      () => setStatus('rejected'),
    )
  }, [body])
  
  function handleSubmit(event) {
    event.preventDefault()
    // get form input values
    setBody(formInputValues)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form inputs and other neat stuff... */}
    </form>
  )
}
```

Và bây giờ chúng ta không cần phải lo lắng về việc ghi nhớ bất cứ điều gì.

Như chúng ta đã nói trước đó, chúng ta không cần phải ghi nhớ mọi thứ quá thường xuyên, nhưng khi chúng ta làm điều đó, thật tuyệt khi biết tại sao nó tồn tại và những gì chúng ta thực sự đang cần phải làm.

### 4. Don’t misuse these hooks!

Có phải lúc nào việc sử dụng `useCallback` và `useMemo` cũng đều mang lại kết quả tốt đẹp, câu trả lời là không

Ví dụ, nếu chúng ta không ngăn hàm gọi lại hàm tính toán (ví dụ trên), lạm dụng `useMemo`

`useMemo` lưu trữ các các quả vào bộ nhớ (`memoization`), điều này lớn dần lên và nó sẽ khiến hiệu năng ứng dụng của bạn bị giảm

với `useCallback` thì càng tồi tệ hơn, nếu dùng `useCallback` nó cũng sẽ lưu lại trong bộ nhớ, trong một số trường hợp, các phần tử trong array phụ thuộc `useCallback`sẽ hoạt động trở lại để lấy lại version cũ, hiệu năng ứng dụng cũng sẽ bị ảnh hưởng đáng kể

> Performance optimizations are not free. They ALWAYS come with a cost but do NOT always come with a benefit to offset that cost.


Việc tối ưu hóa hiệu suất luôn phải đánh đổi bởi một giá trị nào đó, và điều đó có đáng để chúng ta đánh đổi hay không

Vậy khi nào thì nên dùng `useCallback`, khi mà bạn cảm thấy thật sự không dùng nó thì hiệu suất ứng dụng của bạn sẽ rất tồi tệ hoặc kết quả của việc thực thi một hàm là không cần thiết

Ngoài ra, trong một vài trường hợp, ví dụ trước đây mình cần `debounce`, mình cũng có sử dụng `useCallback` để xử lí việc đó
- [debounce and throttle in React](https://rajeshnaroth.medium.com/using-throttle-and-debounce-in-a-react-function-component-5489fc3461b3)

### 5. Conclusion 

Trên đây là tìm hiểu của mình về `Memoization` của `React`

Hi vọng đã giúp ích cho mọi người

### 6. References

- [useMemo vs useCallBack](https://viblo.asia/p/react-hooks-su-khac-nhau-giua-usememo-va-usecallback-gDVK24jwlLj)

- [Hạn chế re-render khi sử dụng React hook với memo và useCallback](https://viblo.asia/p/han-che-re-render-khi-su-dung-react-hook-voi-memo-va-usecallback-yMnKMdjA57P)

- [Memoization and React](https://epicreact.dev/memoization-and-react/)

- [debounce and throttle in React](https://rajeshnaroth.medium.com/using-throttle-and-debounce-in-a-react-function-component-5489fc3461b3)