# Component adjustments
Chúng ta có một <Button> với thuộc tính padding là 0.5em 2em:

```
const Button = styled.button`
  padding: 0.5em 2em;
  /* …more styles here… */
`;
```

Và chúng ta mong muốn có một  button nhỏ hơn để phục vụ cho các nhu cầu khác nhau

Bằng cách sử dụng interpolated functions, việc tuỳ biến kich cỡ của  button trở nên khá đơn giản:

```
const Button = styled.button`
  /* If it's a small button use less padding */
  padding: ${props => props.small ? '0.25em 1em' : '0.5em 2em'};

  /* …more styles here… */
`;
```

Sau đó, chúng ta có thể dễ dàng quy định kich thước của  <Button>  bằng cách:

```
<Button>This is a normal button!</Button>
<Button small>This is a small button!</Button>
```

# Using JavaScript to our advantage

Khi mà đoạn text dài hơn chiều rộng đoạn container bọc nó, chúng ta cần 3 thuộc tính CSS sau:

```
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```
Chiều rộng của container cũng cần được hardcoding như sau:


```
.truncate {
  /* Needs to be specific width */
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

Bạn có thể tạo một  separate component để truncating, tuy nhiên trong trường hợp này thì việc tái sử dụng CSS không hẳn là một ý kiến tồi ! Thay vì hardcoding đoạn code trên ở những nơi muốn truncate, chúng ta có thể viết đoạn function sau với chức năng tương tự:

```
// style-utils.js
export function truncate(width) {
  return `
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}
```

Sau đó chúng ta chỉ cần import function như sau để sử dụng nó:

```
import { truncate } from '../style-utils';

// Make this div truncate the text with an ellipsis
const Box = styled.div`
  ${ truncate('250px') }
  background: papayawhip;
`;
```

Các bạn có thấy quen thuộc không ạ? Chính xác, nó khá là giống với mixin trong Sass - ngoại trừ việc nó được viết bằng JavaScript!

# Refs to DOM nodes

Việc truyền ref xuống styled component sẽ tạo một ref cho  StyledComponent wrapper, chứ không phải DOM node. Thế nên chúng ta không thể call một DOM method, ví dụ như focus wrapper đó. Để get một ref của DOM node, chúng ta truyền xuống một innerRef prop.

Note: innerRef chỉ hỗ trợ  callback refs (ví dụ ref={comp => this.bla = comp}), string refs (i.e. ref="bla") sẽ không hoạt động. Since string based refs will be deprecated in the future anyway, chúng ta không cần lo lắng quá về việc này chỉ cần sử dụng callback pattern.

```
const StyledInput = styled.input`
  color: paleviolet;
`;

class Form extends Component {
  componentDidMount() {
    this.input.focus()
  }

  render() {
    return (
      <StyledInput innerRef={(comp) => { this.input = comp }} />
    )
  }
}
```
Nguồn: https://github.com/styled-components/styled-components/blob/master/docs/tips-and-tricks.md[](https://github.com/styled-components/styled-components/blob/master/docs/tips-and-tricks.md)