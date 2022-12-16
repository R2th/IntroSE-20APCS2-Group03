Bài viết này sẽ gồm rất nhiều những ví dụ nhỏ, và sẽ được thể hiện qua hai phong cách code React đó là `Class Component` và `Function Component` hay còn gọi `Stateful` và `Stateless`.

Với `Stateful` ta vẫn sẽ sử dụng các `lifecycle events` bình thường

Còn với `Stateless` thì sẽ được sử dụng kèm với các `hooks`

Không nhiều lời nữa, Let's (go)

![](https://images.viblo.asia/7333e796-7df0-43d7-9c7d-343b73a2eefd.png)

## 1. Thinking in React Hooks

* *Class component*


Với `class components`, chúng ta luôn bị trói buộc phải cập nhật chính xác các  `lifecycle events`

```
class Chart extends Component {
  componentDidMount() {
    // when Chart mounts, do this
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data == props.data) return
    // when data updates, do this
  }
  componentWillUnmount() {
    // before Chart unmounts, do this
  }
  render() {
    return (
      <svg className="Chart" />
    )
  }
}
```

* *Fuction component*

Trong `function components`, tôi sẽ sử dụng hook `useEffect` để chạy code

```
const Chart = ({ data }) => {
  useEffect(() => {
    // when Chart mounts, do this
    // when data updates, do this
    return () => {
      // when data updates, do this
      // before Chart unmounts, do this
    }
  }, [data])
  return (
    <svg className="Chart" />
  )
}
```

Chúng ta có thể nhìn phần comment để có thể hiểu được cơ chế của hook `useEffect` trong `function components` cũng như sự tương đồng trong comment  trong các `lifecycle events`

Hmm, hãy xem xét một ví dụ cụ thể khác để làm rõ hơn. 

Ví dụ: điều gì sẽ xảy ra nếu chúng ta có hàm `getDataWithinRange()` trả về một tập dữ liệu đã lọc (`filtered dataset`) , dựa trên một **dateRange** được chỉ định?

Bởi vì `getDataWithinRange()` mất một khoảng thời gian để chạy, chúng tôi sẽ muốn lưu trữ nó trong đối tượng **state** của `component` và chỉ cập nhật nó khi **dateRange** thay đổi.

* *Class component*

Với **lifecycle events**, chúng ta cần xử lý tất cả các thay đổi tại một điểm. Suy nghĩ của chúng tôi sẽ là:

> Khi component load xong và khi `props` thay đổi (cụ thể là `dateRange`), thì `data` sẽ được cập nhật 

```
class Chart extends Component {
  state = {
    data: null,
  }
  componentDidMount() {
    const newData = getDataWithinRange(this.props.dateRange)
    this.setState({data: newData})
  }
  componentDidUpdate(prevProps) {
    if (prevProps.dateRange != this.props.dateRange) {
      const newData = getDataWithinRange(this.props.dateRange)
      this.setState({data: newData})
    }
  }
  render() {
    return (
      <svg className="Chart" />
    )
  }
}
```

* *Function component*

Trong `function component`, chúng ta cần suy nghĩ về **những giá trị nào luôn được đồng bộ hóa**. 

Mỗi cập nhật sẽ giống như câu lệnh:

> Giữ cho `data` đồng bộ với `dateRange`

```
const Chart = ({ dateRange }) => {
  const [data, setData] = useState()
  useEffect(() => {
    const newData = getDataWithinRange(dateRange)
    setData(newData)
  }, [dateRange])
  return (
    <svg className="Chart" />
  )
}
```

* *Class component*

```
class Chart extends Component {
  state = {
    data: null,
  }
  componentDidMount() {
    const newData = getDataWithinRange(this.props.dateRange)
    this.setState({data: newData})
  }
  componentDidUpdate(prevProps) {
    if (prevProps.dateRange != this.props.dateRange) {
    const newData = getDataWithinRange(this.props.dateRange)
      this.setState({data: newData})
    }
  }
  render() {
    return (
      <svg className="Chart" />
    )
  }
}
```

* *Function component*

Trên thực tế, ví dụ với suy nghĩ của`class component`, chúng ta đang lưu trữ `data` trong `state` để ngăn việc tính toán lại mỗi khi component được update

Nhưng chúng ta không cần sử dụng `state` nữa,  giải pháp ở đây là `useMemo()`, sẽ chỉ tính toán lại `data` khi `dataRange` thay đổi. [Tìm hiểu thêm](https://viblo.asia/p/han-che-re-render-khi-su-dung-react-hook-voi-memo-va-usecallback-yMnKMdjA57P)

```
const Chart = ({ dateRange }) => {
  const data = useMemo(() => (
    getDataWithinRange(dateRange)
  ), [dateRange])
  return (
    <svg className="Chart" />
  )
}
```

> Lưu ý rằng chúng ta luôn có thể xác định các biến ngay bên trong hàm của chúng ta.

```
const Chart = ({ dateRange }) => {
  const newData = getDataWithinRange(dateRange)
  return (
    <svg className="Chart" />
  )
}
```

> Tôi sử dụng `useMemo()` rất nhiều, đặc biệt là khi xử lý các tập dữ liệu lớn, để giữ cho mọi thứ nhanh chóng, không phải render quá nhiều lần

## 2. Thinking about updates in-context

* *Class component*

Hãy tưởng tượng rằng chúng ta có nhiều giá trị cần tính toán, nhưng chúng phụ thuộc vào các `props` khác nhau. Ví dụ, chúng ta cần tính toán:

* `data` khi `dateRange` thay đổi,
* `dimensions` của biểu đồ khi `margin` thay đổi, và
* `scales` khi `data` thay đổi

```
class Chart extends Component {
  state = {
    data: null,
    dimensions: null,
    xScale: null,
    yScale: null,
  }
  componentDidMount() {
    const newData = getDataWithinRange(this.props.dateRange)
    this.setState({data: newData})
    this.setState({dimensions: getDimensions()})
    this.setState({xScale: getXScale()})
    this.setState({yScale: getYScale()})
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dateRange != this.props.dateRange) {
      const newData = getDataWithinRange(this.props.dateRange)
      this.setState({data: newData})
    }
    if (prevProps.margins != this.props.margins) {
      this.setState({dimensions: getDimensions()})
    }
    if (prevState.data != this.state.data) {
      this.setState({xScale: getXScale()})
      this.setState({yScale: getYScale()})
    }
  }
  render() {
    return (
      <svg className="Chart" />
    )
  }
}
```

* *Function component*

Trong `function component`, chúng ta có thể tập trung vào các câu lệnh đơn giản của mình, như:

> Giữ `dimensions` đồng bộ với `margins`

```
const Chart = ({ dateRange, margins }) => {
  const data = useMemo(() => (
    getDataWithinRange(dateRange)
  ), [dateRange])
  const dimensions = useMemo(getDimensions, [margins])
  const xScale = useMemo(getXScale, [data])
  const yScale = useMemo(getYScale, [data])
  return (
    <svg className="Chart" />
  )
}
```

Hãy xem **class component** của chúng ta khó sử dụng như thế nào, ngay cả trong ví dụ đơn giản?

Điều này là do chúng ta có rất nhiều code khai báo giải thích làm sao để giữ các biến đồng bộ với `props` và` state`, và trong **function component**, chúng ta chỉ tập trung vào **cái gì** để tiếp tục đồng bộ hóa.

Lưu ý cách chúng ta có thể sử dụng nhiều hook `useMemo()` như chúng ta muốn

## 3. Looser definition of state

Chúng ta sẽ thử tiếp tục ví dụ - điều gì sẽ xảy ra nếu `scales` của chúng tôi cần thay đổi dựa trên `dimensions` của `chart`?

* *Class component*

Trong `class component`, chúng ta sẽ cần so sánh trạng thái `prevState` và `state` hiện tại.

```
class Chart extends Component {
  state = {
    data: null,
    dimensions: null,
    xScale: null,
    yScale: null,
  }
  componentDidMount() {
    const newData = getDataWithinRange(this.props.dateRange)
    this.setState({data: newData})
    this.setState({dimensions: getDimensions()})
    this.setState({xScale: getXScale()})
    this.setState({yScale: getYScale()})
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dateRange != this.props.dateRange) {
      const newData = getDataWithinRange(this.props.dateRange)
      this.setState({data: newData})
    }
    if (prevProps.margins != this.props.margins) {
      this.setState({dimensions: getDimensions()})
    }
    if (
      prevState.data != this.state.data
      || prevState.dimensions != this.state.dimensions
    ) {
      this.setState({xScale: getXScale()})
      this.setState({yScale: getYScale()})
    }
  }
  render() {
    return (
      <svg className="Chart" />
    )
  }
}
```

* *Function component*

Our hooks' **dependency arrays** don't care whether our `margins` or `dimensions` are in our `props`, `state`, or neither - a value is a value, as far as they're concerned.

Với `Hooks` thì không quan tâm đến việc `margins` hoặc `dimensions` có ở trong `props`,` state` hay không

Chúng ta có thể để nhiều biến bên trong `[]` ở `useMemo()`

```
const Chart = ({ dateRange, margins }) => {
  const data = useMemo(() => (
    getDataWithinRange(dateRange)
  ), [dateRange])
  const dimensions = useMemo(getDimensions, [margins])
  const xScale = useMemo(getXScale, [data, dimensions])
  const yScale = useMemo(getYScale, [data, dimensions])
  return (
    <svg className="Chart" />
  )
}
```


## 4. Custom hooks that I ♥

Ngoài ra, sẽ là một vài custom hooks hay được sử dụng

- `useIsMounted`

> Để đảm bảo kiểm tra xem `component` của mình đã được `mount` hay không trước khi thực hiện bất kỳ điều gì như cập nhật trạng thái của nó.

```
export const useIsMounted = () => {
  const isMounted = useRef(false)
  useEffect(() => {
      isMounted.current = true
      return () => isMounted.current = false
  }, [])
  return isMounted
}
```

- `useIsInView`

> For triggering animations that start when a user scrolls to an element. I used this a lot for the 

> Để trigger các animationskhi người dùng cuộn đến một phần tử

```
const useIsInView = (margin="0px") => {
  const [isIntersecting, setIntersecting] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver(([ entry ]) => {
      setIntersecting(entry.isIntersecting)
    }, { rootMargin: margin })
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.unobserve(ref.current)
    }
  }, [])
  return [ref, isIntersecting]
}
```

Tìm hiểu thêm về [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

- `useHash`

> Để giữ các `hash` của url, giúp đồng bộ hóa thành một biến cục bộ. Điều này hữu ích cho việc lưu trữ, chẳng hạn như chế độ xem được filter của biểu đồ trong url, để khách truy cập có thể chia sẻ chế độ xem cụ thể đó.

```
const useHash = (initialValue=null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.location.hash
      return item ? item.slice(1) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })
  const setValue = value => {
    try {
      setStoredValue(value)
      history.pushState(null, null, `#${value}`)
    } catch (error) {
      console.log(error)
    }
  }
  return [storedValue, setValue]
}
```

Ngoài ra còn rất nhiều custom hook mà các developer đang chia sẻ hàng ngày để việc viết code của chúng ta trở nên dễ dàng hơn.
[Tìm hiểu thêm](https://usehooks.com/)

## 5. Conclusion

- Trên đây là một số tìm hiểu của mình về `hooks` và `function component`, mong là sẽ giúp ích được nhiều trong việc tìm hiều và áp dụng `Hooks`

## 6. Reference document

- [Hạn chế re-render trong React](https://viblo.asia/p/han-che-re-render-khi-su-dung-react-hook-voi-memo-va-usecallback-yMnKMdjA57P)

- [Thinking in React Hooks](https://wattenberger.com/blog/react-hooks?ref=hackernoon.com)

- [List custom hook](https://usehooks.com/)