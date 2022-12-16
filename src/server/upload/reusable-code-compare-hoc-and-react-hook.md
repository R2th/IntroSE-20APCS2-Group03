# `Reusable code compare HOC and React Hook`
Vào một ngày đẹp trời, khách hàng yêu cầu bạn phải sửa một số chi tiết nhỏ về tính năng infitity scroll chẳng hạn. Khách hàng của bạn là một người rất tin vào phong thủy, mỗi lần cuộn trang xuống cuối bạn sẽ gọi API và lẩy thêm ra 9 item thay vì 10 item như hiện tại. Tin vui là bạn đã viết tính năng đo thành function và truyền params kia vào. Nhưng đáng tiếc tay, có 5 6 trang như vậy, bạn đã copy func này cho mỗi trang đó. Giờ bạn hối hận vì đã làm như vậy.
Là một lập trình viên đầy nghị lực và khao khát trở thành một developer tuyệt vời, bạn quyết định đi refactor chúng. Bạn tìm được 2 cách giải quyết và phân vân không biết nên dùng cách nào
![](https://images.viblo.asia/094fdb91-8eeb-4e80-9c3d-5d6373b7ffd1.jpg)
## Bài toán
Mình lấy vì dụ vậy thôi, quay trở lại với bài toán, mình sẽ giói thiệu function đó trước sau đó sẽ đi theo và so sánh 2 cách làm, một là dùng HOC và còn lại là custom hook mới của React.

```js
state = { start: 30 }

componentDidMount() {
   window.addEventListener('scroll', this.setupInfiniteScroll)
}

componentWillUnmount() {
   window.removeEventListener('scroll', this.setupInfiniteScroll)
}

setupInfiniteScroll = (pace = 10) => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.setState({ start: this.state.start + pace })
    }
}
```

Ở đây mình  có các tham số như start: số lượng item sẽ đươc render xử lý loading lần đâu tiên
Pace: Số item sẽ được render thêm mỗi lần
Để giữ tính đơn giản cho ví dụ, mình sẽ giả dụ bài toàn chỉ là thực hiện infinity scroll không có lazy load hay partial load ở đây. Toàn bộ data đã được load đủ khi vào component
## Custom Hook
Refactor với custom hook
```js
export const useInfiniteScroll = (start = 30, pace = 10) => {
  const [limit, setLimit] = useState(start);
  window.addEventListener('scroll', () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLimit(limit + pace);
    }
  });
};

Sử dụng custom hook

const App = () => {
  let infiniteScroll = useInfiniteScroll();
  ...
}
```
## HoC
Vậy với sử dụng HoC thì sao
```js
withInfifityScroll = (WrapperComponent) => class extends React.Component {
    state = { start: 30 }

    componentDidMount() {
       window.addEventListener('scroll', this.setupInfiniteScroll)
    }

    componentWillUnmount() {
       window.removeEventListener('scroll', this.setupInfiniteScroll)
    }

    setupInfiniteScroll = (pace = 10) => {
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          this.setState({ start: this.state.start + pace })
        }
    }
    
    render() {
        return <WrapperComponent {...this.state} {...this.props} />
    }
 }
 
 sử dụng HoC
const App = withInfifityScroll(() => {
  let infiniteScroll = useInfiniteScroll();
  ...
})
```
Tuy nhiên bạn có thể để ý thấy custom hook chưa handle case là componentWillUnmount sẽ bỏ event kia đi, lý do là function thì đâu có lifecycle. Bạn có thể khắc phục bằng cách như sau
```js
export const useInfiniteScroll = (start = 30, pace = 10) => {
  const [limit, setLimit] = useState(start);
  const infinityScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLimit(limit + pace);
    }
  }
  window.addEventListener('scroll', infinityScroll);
  return window.removeEventListener(infinityScroll)
};
```
## Conclusion

Bạn thấy như thế nào với hai cách trên. Nhìn chung đây là một ví dụ đơn giản giúp các bạn có thể tiếp cận nhanh nhất đến bài toán. Tùy vào trường hợp  mà bạn có   thể sử dụng chúng sao cho hợp lý. Trước đây HoC là cách tiêu chuẩn giúp bản giảm thiêu số lượng code bị lặp. Nhưng với sử xuất hiện với React Hook, chúng đang trở nên thú vị và đơn giản hơn, giảm được những magical khó hiểu trong code.

## `References`
1. https://reactjs.org/docs/getting-started.html
1. https://medium.com/javascript-in-plain-english/creating-useful-custom-react-hooks-2ad125e36a32