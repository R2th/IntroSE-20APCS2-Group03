## 1.Giới thiệu
- Trong lần trước mình có giới thiệu cũng như có chia sẽ nhưng gi mình biết về react Hook cụ thể là `useState` trong reactJS. Link bài trước [Đôi chút về useState](https://viblo.asia/p/doi-chut-ve-usestate-trong-react-hooks-07LKXpVeKV4) thì trong bài này mình cũng muốn chia sẻ thêm cái nữa trong react Hook đó là `useEffect`. Sẽ tìm hiểu cơ bản khái niệm cũng như cách dùng của nó.  `useEffect` mục đích để quản lý vòng đời của của một component và nó phục vụ chúng ta sử dụng trong `function component` thay vì các `lifecycle` như trước đây trong `class component` (về cơ bản là giống nhau)
## 1.Nội dung
Vậy ý nghĩa khi sinh ra `useEffect` thì mình nói ở trên thì cụ thể nó sẽ được dùng như sau:
```
#syntax
useEffect(effectFunction, arrayDependencies)
```
Vậy cú pháp thì như vậy ! Thực tế nó sẽ tương đương như thế nào so các `lifecycle` trong `class component`
* ### componentDidUpdate:
Khi chúng ta muốn dùng `componentDidUpdate` trong `function component` chúng ta sẽ dùng như sau:
```
useEffect(function)
```
Như vậy thì `function` sẽ được gọi mỗi khi component được render xong (giống componentDidUpdate).Cùng xem ví dụ về nó nhé.
```ruby
() => {
  const [count, setCount] = useState(0)
  const handleClick = () => setCount(count + 1)

  useEffect(() => {
    document.title = 'Count is: ' + count
  })

  return <div>
    <p>Để title trang web để nhận thấy thay đổi</p>
    <button onClick={handleClick}>Increment Count</button>
  </div>
}
```
```
NOTE:
Như trong ví dụ trên thì bạn thấy hàm `function` hay chính là `setCount` luôn được gọi mỗi khi component được render xong vậy làm thế nào để ta có thể xử lý hàm này được gọi tới theo điều kiện của mình thì chính là đối số thứ 2 mà ta có đề cập trong syntax ban đầu `arrayDependencies` đối số này được hiểu là mỗi lần mảng này thay đổi và component render xong thì hàm `setCount` mới được gọi tới. :D
```
* ### componentDidMount:
Ở trên mình có nói tới  đối số thứ 2 là `arrayDependencies` khi thay đổi thì đối số thứ nhất mới thực thi `(function)` vậy nếu `arrayDependencies` không thay đổi tức ta gán bằng `[]`  thì điều này có nghĩa nó tương đương với `componentDidMount` vì khi này function trong `useEffect` chỉ gọi 1 lần.Cùng xem ví dụ dưới:
```
() => {
  const [count, setCount] = useState(0)
  const handleClick = () => setCount(count + 1)

  useEffect(() => {
    document.title = 'Count is: ' + count
  }, [])

  return <div>
    <p>Để title trang web để nhận thấy thay đổi</p>
    <button onClick={handleClick}>Increment Count</button>
  </div>
}
```
* ### componentUnWillMount:
Và một lifecycle nữa mình mình chia sẽ với mọi người nữa là `componentUnWillMount` thì thực tế khi sử dụng `useEffect` nó sẽ như thế nào? Thì như các bạn đã biết thì `componentUnWillMount` chạy mỗi khi một component chuẩn bị remove khỏi tree dom. Cùng xét ví dụ sau:
```ruby
() => {
  useEffect(() => {
    const clickWindow = () => console.log('1')
    window.addEventListener('click', clickWindow)

    // return 1 function, sẽ được gọi ngay trước khi component unmount
    return () => {
      window.removeEventListener('click', clicked)
    }
  }, [])

  return <div>F12 check log của trình duyệt!</div>
}
```
Thì thực tế thì `useEffect` cho phép chúng ta return 1 function, function này sẽ thực thi trước khi mà component đó được unmounted.
## 3.Tổng kết
Trêm đây là một chút hiểu biết của mình cảm ơn các bạn đã đọc.
## 5.Refers
https://reactjs.org/docs/hooks-effect.html