Đây là bài viết thứ 3 và cũng có thể là phần cuối cùng  của chủ đề này. Mong rằng bài viết này sẽ giúp ích được các bạn phần nào trong việc làm quen và tìm hiểu ReactJS

* xem phần 1 tại [đây](https://viblo.asia/p/mot-so-tip-tricks-se-giup-ban-kiem-soat-reactjs-de-dang-hon-phan-1-3P0lP2w8Kox)
* xem phần 2 tại [đây](https://viblo.asia/p/mot-so-tip-tricks-se-giup-ban-kiem-soat-reactjs-de-dang-hon-phan-2-yMnKM9MjK7P)

## Sử dụng Error Boundaries
Lỗi Javascript trong một phần của UI không nên ảnh hưởng toàn bộ ứng dụng. Để giải quyết vấn đề này cho người dùng React, React 16 giới thiệu một khái niệm mới gọi là “Error Boundary"
Error Boundaries là những React component được bọc ở ngoài để hứng lỗi của những component con

```
function MainPage(){
    return (
       <ErrorBound>
          <Home/>
        </ErrorBound>
    )
}
```

Khi bất kì lỗi xảy ra tại component `<Home /> `đều được component `<ErrorBound/>` hứng lại. Vì vậy thay vì render ra trang trắng và quăng ra UnCatch error, thì lúc `<ErrorBound/>` sẽ catch lại lỗi, báo lỗi tại console và render ra một component thay thế.

`<ErrorBound/>`  component:

```
class ErrorBound extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error(error,errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

Function getDerivedStateFromError() update lại state khi có lỗi, để trigger re-render ra một element | component thay thế.

method componentDidCatch() để catch lại error và log ra console để trace bugs từ error stack.

![](https://images.viblo.asia/7566acc9-8dd0-4f9f-bc0d-406b54a9c4e9.png)

## React & Typescript
Typescript là một hot topic và là một trong những lựa chọn hàng đầu của các nhà phát triển để tìm hiểu trong tương lai gần. Với những phiên bản mới của create-react-app ( CRA ), nó đã đi kèm với hỗ trợ cho Typescript. Chúng ta chỉ cần gắn thêm typescript flag khi tạo một project mới vs CRA:

```
npm create-react-app my-app --typescript
```

Một số lợi ích khi tích hợp Typescript với react có thể kể đến như: Các tính năng mới nhất của Javascript được tích hợp, readability và validation để giảm thiểu lỗi trong quá trình phát triển, ...

Dưới đây là một ví dụ đơn giản trong việc sử dụng Typescript trong một function component:

```
import * as React from 'react';

const MyComponent: React.FunctionComponent<{
  name: string
}> = (props) => {
  return <h1>{props.name}</h1>
}

export default myComponent;
```

hoặc với một interface:

```
interface Props {
  name: string
}

const MyComponent: React.FunctionComponent<Props> = (props) => {
  return <h1>{props.name}</h1>
}
```

Nếu bạn muốn thử một thứ gì đó mới trong năm 2020, hãy bắt tay vs Typescript thử xem.

## Jest + Enzyme for Testing
Kiểm tra các ứng dụng của bạn là điều mà mọi nhà phát triển nên làm và nó là bắt buộc trong nhiều dự án. Jest + Enzyme là 2 thư viện được sử dụng rộng rãi viết unit test cho React.

Jest đi kèm với create-react-app. Nó cung cấp một snapshot testing để so sánh xem có sự thay đổi nào trong component hiện tại so với trạng thái trước đó của nó không. Nếu chúng không khớp, kết quả sẽ là fail.

Enzyme là một tiện ích dùng trong kiểm thử Javascript cho React. Nó được phát triển bởi Airbnb và là một đối tác lý tưởng cho Jest.

Với các thư viện này, chúng ta có thể thực hiện các bài kiểm thử gọn gàng như:

```
it("will render correctly", () => {
  const wrapper = shallow(
    <MyComponent />
  )
  expect(wrapper).toMatchSnapshot();
})
```

để kiểm tra hành vi kết xuất cơ bản của một component. Nhưng chúng ta có thể làm nhiều thứ hơn nữa, ví dụ như testing for props:

```
// We need to mock zum props first

const user = {
  name: 'ThePracticalDev',
  email: 'TPD@dev.to',
  username: 'tpd',
  image: null
}

// Then the tests

describe ('<UserProfile />', () => {
  it ('contains h3', () => {
    const wrapper = mount(<UserProfile user={user} />)
    const value = wrapper.find('h3').text()
    expect(value).toEqual('ThePracticalDev')
  })
  it ('accepts user props', () => {
    const wrapper = mount(<UserProfile user={user} />);
    expect(wrapper.props().user).toEqual(user)
  })
})
```

Thật hữu ích, phải không? Và còn rất nhiều thứ bạn có thể làm với chúng như chế độ mocking API or testing lifecycle methods ...

## Lời kết
Trên đây là bài viết về một số tip tricks có thể giúp ích các bạn trong việc làm quen và sử dụng ReactJS. Hi vọng các bạn sẽ có những niềm yêu thích để chuyển hoá nó thành đam mê vs ReactJS

tham khảo:
- https://dev.to/simonholdorf/10-tips-tricks-that-will-make-you-a-better-reactjs-dev-4fhn
- https://codefun.dev/@lythanhnhan27294/tang-su-tu-tin-cho-ung-dung-react-voi-error-boundaries-1482174216