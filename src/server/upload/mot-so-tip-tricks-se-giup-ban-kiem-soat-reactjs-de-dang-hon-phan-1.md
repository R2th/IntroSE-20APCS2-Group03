## Giới thiệu
Bài viết dưới đây chia sẻ một số kiến thức bạn có thể sử dụng ngay để nâng cao skill React của bản thân, thành một React developer tốt hơn cũng như giúp bản thân chúng ta được đánh giá cao hơn trong mắt các nhà tuyển dụng

## Sử dụng React Hook trong Function Components
Hooks được giới thiệu trên phiên bản React v16.8 và là một bước tiến dành cho functional programming với React. Với Hooks, giờ đây bạn có thể sử dụng các function component thay vì các class component. Nghe đến đây, ta đặt câu hỏi: Vậy còn state, các  lifecycle methods?

Đừng lo, vì React Hooks tính trước cho chúng ta rồi. Hãy cùng xem ví dụ:

```
class myComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  
  onChange = event => {
    this.setState({ value: event.target.value });
  };
 
  render() {
    return (
      <div>
        <h1>This is a random class component</h1>
        <input
          value={this.state.value}
          type="text"
          onChange={this.onChange}
        />
        <p>{this.state.value}</p>
      </div>
    );
  }
}
```

Đây là cách truyền thống với việc sử dụng class component. Với Hooks, chúng ta có thể làm được điều tương tự bằng:

```
const myComponent = () => {
  const [value, setValue] = React.useState('');
  const onChange = event => setValue(event.target.value);
  
  return (
    <div>
      <h1>This is a random functional component with state!</h1>
      <input value={value} type="text" onChange={onChange} />
      <p>{value}</p>
    </div>
  );
};
```

Trông nó đơn giản hơn nhiều đúng không? Ở đây, chúng ta sử dụng `useState` để khởi tạo giá trị ban đầu của state value là một chuỗi rỗng (" ") và một array chứa current state ( value ) và phương thức để thay đổi state đó ( setValue ).

Fucntion component không có quyền truy cập vào các licycle method. Nhưng giờ chúng ta đã có Hooks và `useEffect` để làm điều đó. Hãy cùng xem ví dụ dưới đây:

```
class myComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: localStorage.getItem('someRandomValue') || '',
    };
  }
  
  componentDidUpdate() {
    localStorage.setItem('someRandomValue', this.state.value);
  }
  
  onChange = event => {
    this.setState({ value: event.target.value });
  };
  
  render() {
    return (
      <div>
        <h1>Just some random class component!</h1>
        <input
          value={this.state.value}
          type="text"
          onChange={this.onChange}
        />
        <p>{this.state.value}</p>
      </div>
    );
  }
}
```

 Và đầy là một đoạn code đơn giản hơn với useEffect Hooks:
 
 ```
 const myComponent = () => {
  const [value, setValue] = React.useState(
    localStorage.getItem('someRandomValue') || '',
  );
  React.useEffect(() => {
    localStorage.setItem('someRandomValue', value);
  }, [value]);
  const onChange = event => setValue(event.target.value);
  return (
    <div>
      <h1>Some random functional component with state and side Effects!</h1>
      <input value={value} type="text" onChange={onChange} />
      <p>{value}</p>
    </div>
  );
};
 ```
 
 useEffect sẽ luôn chạy khi một trong các giá trị trong mảng [value] được truyền thay đổi.
 
 
##  Styled-Components
Styled-Components là một thư viện giúp bạn có thể tổ chức và quản lý code CSS một cách dễ dàng trong các project React. Nó được xây dựng với mục tiêu giữ cho các styles của các components trong React gắn liền với chính các components đó. Styled-component giúp developer dễ dàng hơn trong việc tổ chức các component cũng như thay đổi tư duy trong việc style trong React.

```
// install styled components with npm install styled-components

import styled from 'styled-components';

const MyButton = styled.button`

  background: ${props => props.primary ? "green" : "white"};
  color: ${props => props.primary ? "white" : "green"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 3px;
`;

render(
 return {
  <div>
    <MyButton>Normal</MyButton>
    <MyButton primary>Primary</MyButton>
  </div>
 }
)
```

Bây giờ, bạn đã có một component MyButton và có thể sử dụng thay thế cho các button HTML thông thường. Tất cả style này đã được đóng gói và sẽ không can thiệp đến các style khác trong DOM. Thật dễ dàng phải không?

## React Fragments
Trong một thời gian dài, bạn phải đóng gói mọi thứ trong câu lệnh return bằng một `div` duy nhất hoặc sử dụng một ký hiệu mảng để hiển thị chính xác vào DOM . Ví dụ:

```
const myComponent1 = () => {
  return 
   <div>
    <Card key="1" />,
    'Some Text',
    <Card key="2" title="someTitle" content="Just some Content" />
   </div>
}

const myComponent2 = () => {
  return [
    <Card key="1" />,
    'Some Text',
    <Card key="2" title="someTitle" content="Just some Content" />
  ]
}
```

Với việc giới thiệu React Fragment, bạn có thể không cần sử dụng 2 phương pháp trên nữa, thay vào đó chúng ta sẽ làm như thế này:

```
const myComponent1 = () => {
  return 
   <Fragment>
    <Card key="1" />,
    'Some Text',
    <Card key="2" title="someTitle" content="Just some Content" />
   </Fragment>
}
```

or

```
const myComponent1 = () => {
  return 
   <>
    <Card key="1" />,
    'Some Text',
    <Card key="2" title="someTitle" content="Just some Content" />
   </>
}
```

Thật dễ dàng!!

## Lời kết
Trên đây là một số tip trick nhỏ giúp chúng ta có thể làm chủ được React dễ dàng hơn. Mong bài viết này sẽ giúp đỡ phần nào các bạn trong việc học và bỏ túi ReactJS.

tham khảo: https://dev.to/simonholdorf/10-tips-tricks-that-will-make-you-a-better-reactjs-dev-4fhn