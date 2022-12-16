### Lời mở đầu
![](https://images.viblo.asia/d1503bf1-3ca9-4e24-9464-4a9e538b73e4.png)

Các bạn có thể biết ReactJS ngày càng trở thành 1 thư viện, framework cần thiết, và được các Frontend Developer rất ưu chuộng. React có lẽ là framework được nhắc đến nhiều nhất trong thế giới front end vì nó có một cộng đồng vô dùng lớn. Ngoài ra, vì nó là anh em với React Native, nên sẽ dễ dàng hơn rất nhiều khi cần đến sự di động. 

Cá nhân mình cũng biết đến và sử dụng react từ khá lâu khi mà react còn là **v16.0.1**. Hồi đầu chuyển từ js thuần với jquery sang học reactJS cũng thấy khá đau đầu về cái LifeCycle của react =)). Nào là ```componentDidMount()```,  ```componentWillMount()```, ```componentWillUnMount```, ... Giời đất một đống Lifecycle với các cú pháp khác nhau, mình nhớ điên đên cả đầu. May thay cuối cùng cũng hoàn thành một dự án với reactjs, cũng có chia sẻ một số bài viết nhỏ nhỏ như:

[Học reactjs và redux 2018](https://viblo.asia/s/hoc-reactjs-va-redux-2018-nB5pXJp65PG)

1. [Hướng dẫn sử dụng package react-validation trong Reactjs](https://viblo.asia/p/huong-dan-su-dung-package-react-validation-trong-reactjs-naQZR1J0Kvx)

1. [Sử dụng redux có khó không?](https://viblo.asia/p/su-dung-redux-co-kho-khong-vyDZOzJaKwj)

Sau đó, do 1 số lý do dự án nên mình có chuyển qua làm vài dự án với vueJS cho nhẹ nhàng =)). Ngoài lề, các bạn quan tâm đến VueJS cũng có thể tham khảo một số bài viết:
[2018 - Cùng nhau học VueJS](https://viblo.asia/s/2018-cung-nhau-hoc-vuejs-b85ogvV252G)
### React hooks được ra đời như thế nào?
React hooks được release vào phiên bản **v16.8.0** lúc này thì mình đang sử dụng vueJS để làm dự án nên cũng không được áp dụng cái hooks xem có gì mới không. Thật là lạc hậu mà =((. 
React hooks cung cấp các function hooks mặc định như:
* useState: tạo ra đối tượng  giống như state trong class Component
* useEffect: thay thế cho các function Lifecycle
* useReducer: Thay thế cho useState, tương tự redux
* useContext
* useCallback
* useRef
* useLocation
* ......
* 
Các function hook này đã được https://reactjs.org/docs/hooks-intro.html hướng dẫn chi tiết cách sử dụng và không hề khó khăn gì. Mục đích chính mà mình muốn chia sẻ đó chính là tại sao react lại tạo ra các function hook tương tự như vậy.
Cụ thể như mình tìm hiểu được thì react hooks được ra đời khi mà:
* Trước đây chúng ta thiết kế component dựa rất nhiều vào component lifecycle. Chúng ta đặt để logic vào trong các từng lifecycle này, thí dụ như chúng ta cần phải gọi cùng một hàm bên trong cả 2 phương thức lifecycle componentDidMount, componentDidUpdate
```js
class posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            posts: []
        };
    }

    componentDidMount () {
      this.updatePosts(this.props.id)
    }
    componentDidUpdate (prevProps) {
      if (prevProps.id !== this.props.id) {
        this.updatePosts(this.props.id)
      }
    }
    updatePosts = (id) => {
      fetchPost(id)
        .then((posts) => this.setState({
          posts,
          loading: false
        }))
    }
    
    render() {
        return (
            .....
        )
   }
}
```
Đây là đoạn code react khá quen thuộc từ phiên bản v16.8.0 trở về trước. Đến thời điểm hiện tại thì mình vẫn còn thấy khá nhiều người, nhiều dự án sử dụng React component như thế này. Bài toán cũng là một ví dụ đơn giản, chúng thực hiện ```updatePosts``` khi component render lần đầu và tiếp tục update khi props ```id``` có sự thay đổi.
Ta có thể dễ dàng nhận ra rằng, với việc sử dụng LifeCycle như ở trên và cách code ở đây đang gặp vấn đề:
* Logic trùng lặp: Việc sử dụng hàm ```updatePosts``` đang bị lặp lại code ở 2 hàm Lifecycle, tưởng tượng rằng 1 ngày chức năng này được mở rộng ra thì code sẽ bị lặp bao nhiều dòng :(
* Việc chia sẻ logic (state, props) giữa các component cho các đối tượng khác nhau: Thường thì khi dùng react component người ta sẽ nghĩ đến việc sử dụng Higher-Order Component (HOC) để giải quyết vấn đề chia sẻ này, tránh việc phải copy-paste lại code vào các component khác. Nếu bạn chưa biết về HOC có thể tham khảo tại đây: https://reactjs.org/docs/higher-order-components.html#use-hocs-for-cross-cutting-concerns. Tuy nhiên khi sử dụng HOC lồng nhau quá nhiều dễ sinh ra wrapper hell
 ```js
 export default withViblo(
  withPage(
    withAuth(
      withPost(id)
    )
  )
)
```

Do có thể đã quá quen với việc sử dụng LifeCycle, và có lẽ một dự án đã sử code trong một thời gian dài nên khó có thể thay đổi code cho chúng, nhưng khi hỏi về react hooks thì ai cũng muốn refactor nếu có thời gian và hoàn toàn áp dụng cho dự án mới.
Còn với react hooks, ta có thể tạo ra một function hook để sử dụng ở nhiều nơi khác nhau nhưng chung 1 chức năng.
```js
function useUpdatePost ({ id }) {
  const [ posts, setPosts] = React.useState([])
  const [ loading, setLoading ] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)

    updatePosts(id)
      .then((post) => {
        setPosts(post)
        setLoading(false)
      })
  }, [id])

  return [ loading, posts ]
}
```
Sau khi đã tạo thành công function hook ta dùng tại các nơi khác nhau: Ví dụ mình tạo 1 function hook trong folder có tên là hooks/useUpdatePost.js
```js
import useUpdatePost from './hooks/useUpdatePost'
function ListPost() {
    const [posts] = useUpdatePost(id);
    ...
}
```
### Các phản hồi về react hooks
– John Carmack. Oculus VR CTO nói rằng:

>Sometimes, the elegant implementation is just a function. Not a method. Not a class. Not a framework. Just a function.
>
>Tạm hiểu là: Function là một sự thực thi đầy không ngoan, không phải là một method, 1 class, hay một framework. Chả có lý do gì không dùng function cả =))
>

Vậy tại sao chúng ta không bỏ ngay react component để sử dụng react hooks cơ chứ :D

Một số Developer phản hồi tích cực về react hooks

![](https://images.viblo.asia/3a87b2e0-b3fb-46e2-b8f8-8a3e1aa89431.png)

###  React hooks mang lại điều gì
- Hiệu năng tốt hơn: Tốc độ xử lý khi dùng hooks nhanh hơn, code gọn hơn, sạch hơn
- Khả năng tái sử dụng code, chia sẻ logic
- Code được viết hoàn toàn bằng functional component
### Tạm kết
Qua bài viết chắc hẳn các bạn có cái nhìn rõ hơn về react hooks và những điều tuyệt vời mà nó mang lại. Rồi rồi hãy refactor dự án với react hooks đi nhé :D :D :D

![](https://images.viblo.asia/b67bf6ec-fa7f-475b-8173-6e09f9e5d848.gif)