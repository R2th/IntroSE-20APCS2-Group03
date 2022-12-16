# I. Styled-Components là gì và nó có những lợi ích nào?
## 1. Giới thiệu Styled components?
### 1.1 Styled components là gì?
**Styled-Components** là một thư viện giúp bạn có thể tổ chức và quản lý code CSS một cách dễ dàng trong các project React. Nó được xây dựng với mục tiêu giữ cho các styles của các components trong React gắn liền với chính các components đó. Nó cung cấp một interface rõ ràng và dễ sử dụng cho cả React và React Native. Nó không chỉ thay đổi việc implement các components trong React mà còn thay đổi cả lối tư duy trong việc xây dựng styles cho các component đó.
Styled-Components có thể được installed từ npm hoặc yarn với cú pháp:
```
npm install styled-components
```
hoặc
```
yarn add styled-components
```
Và có thể được sử dụng qua việc import như sau:
```
import styled from 'styled-components';
```
### 1.2 Ví dụ một Styled-Components đơn giản
```
class Application extends React.Component {
  render() {
    return (
      <Wrapper>
        <Title>
          Hello World, this is my first styled component!
        </Title>
      </Wrapper>
    )
  }
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;
```

## 2. Lợi ích của Styled Components
### 2.1 Đóng gói style vào trong component trong js
Styled component cho phép chúng ta encapsulate (đóng gói) style vào trong component trong js nhưng vẫn giữ được những tính năng của css như nesting, media query, pseudo-selectors, v.v...
Điều này giải quyết vấn đề global scope của css bởi vì chúng ta không còn phải viết các selector cho class hay id. Styled component làm được điều này nhờ việc generate tên class ngẫu nhiên và truyền vào component thông qua property className.
![](https://images.viblo.asia/ed21aebd-f982-4d11-ae0f-6b1fe4fc9554.PNG)
### 2.2. Thay đổi style dựa trên thuộc tính hoặc trạng thái của component dễ dàng hơn
Với Styled-Components, chúng ta cũng có thể truyền props vào cho các components:
```
class Application extends React.Component {
  render() {
    return (
      <div>
        <Input placeholder="@input_placeholder" type="text" />
        <Input value="@nvtcp9x" type="text" />
      </div>
    )
  }
}

const Input = styled.input`
  padding: 5px;
  margin: 5px;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;
```
Chúng ta cũng có thể sử dụng props để quy định các css cho component:
```
class Application extends React.Component {
  render() {
    return (
      <div>
        <Button>Normal</Button>
        <Button primary>Primary</Button>
      </div>
    )
  }
}

const Button = styled.button`
  background: ${props => props.primary ? 'red' : 'white'};
  color: ${props => props.primary ? 'white' : 'red'};
  
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
```
Để định nghĩa các animations, Styled-Components cung cấp cơ chế sinh ra các unique name cho các keyframes ở mỗi components, bởi vậy chúng ta sẽ không cần lo lắng về việc tên của keyframes có bị trùng hay không nữa:
```
class Application extends React.Component {
  render() {
    return (
      <div>
        <Rotate>&lt; ? &gt;</Rotate>
      </div>
    )
  }
}

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;
```
# II. Kết luận
### Một số nhược điểm và hạn chế
* Tên class được generate ngẫu nhiên nên sẽ gây khó chịu cho người quen debug css bằng tên class.
* Còn khá non trẻ nên chưa được kiểm duyệt tính scale trong các project lớn
* Nhiều người vẫn không thích css trong js
* Không được dùng ref trên component phải chuyển sang innerRef bởi vì ref sẽ được truyền vào wrapper của styled component thay vì component mình muốn.
### Tổng kết
Như vậy trên đây mình đã giới thiệu tổng quan về styled-components và cách implement cơ bản của nó, qua đó, chúng ta cũng phần nào thấy được những lợi ích mà Styled-Component đem lại trong việc styled css cho các components trong react, một lựa chọn thú vị để quản lý code css trong project React phải không nào?
Bạn cũng có thể tìm hiểu thêm về Styled-Components tại đây nhé:

https://www.styled-components.com/

Thank for reading!