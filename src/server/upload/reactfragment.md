## Giới thiệu
Fragment là một common pattern được giới thiệu kể từ khi React 16 ra đời. Nó cho phép bạn return nhiều element từ một component mà không làm sinh ra những DOM element ko cần thiết. 
```JavaScript
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```
Ngoài ra còn có một [short syntax](https://reactjs.org/docs/fragments.html#short-syntax) khác để khai báo fragment, nhưng nó không được hỗ trợ bởi hầu hết các [tool](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html#support-for-fragment-syntax) phổ biến.

## Sự ra đời

Dưới đây là một common pattern của một React component trả về một list các children:

```JavaScript
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

`<Columns />` component sẽ phải trả về nhiều phần tử `<td>` để đầu ra HTML hiển thị hợp lệ. Nếu một `div` cha được sử dụng bên trong `render()` của `<Columns />` component, thì sẽ cho ra kết quả HTML không hợp lệ.

`<Table />` component lúc này sẽ có dạng:
```JavaScript
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```

Chính vì thế, `fragment` được giới thiệu để giải quyết điều này.

## Cách sử dụng

Đơn giản, các bạn chỉ cần wrap list các children bởi `<React.Fragment>`

```JavaScript
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

Sẽ cho ra kết quả là một `<Table />` component chính xác.

```JavaScript
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```

#### Short Syntax

Có một cú pháp mới, ngắn hơn mà bạn có thể sử dụng để khai báo các fragment. Nó trông giống như các thể trống (empty tags)

```JavaScript
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

Bạn có thể sử dụng `<> </>` giống như cách bạn sẽ sử dụng bất kỳ phần tử nào khác ngoại trừ việc nó không hỗ trợ `keys` và `attributes`

Lưu ý rằng nhiều công cụ vẫn chưa hỗ trợ cú pháp này nên bạn được khuyên dùng `<React.Fragment>`.

## Keyed Fragments

Fragments được khai báo với cú pháp rõ ràng `<React.Fragment>` có thể có các `key`. Ví dụ, tạo một list mô tả:

```JavaScript
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
      // Nếu không sử dụng `key`, React sẽ kích hoạt cảnh báo
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

## Live Demo

Demo có tại [CodePen](https://codepen.io/reactjs/pen/VrEbjE?editors=1000)

## Kết luận

Bài viết mình tham khảo tại https://reactjs.org/docs/fragments.html

Chúc các bạn học tốt !!!