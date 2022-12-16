## JSX là gì?
JSX là một phần mở rộng cú pháp cho JavaScript. JSX cho ra React "elements". Nếu bạn không quen với JSX, hãy xem qua bài đăng trên [blog React này](https://reactjs.org/docs/introducing-jsx.html) trước khi bạn tiếp tục đọc bài viết này.
Trong bài này, mình sẽ cố gắng giải thích các Fragment trong JSX như một khái niệm cơ bản, nhưng cũng dễ sử dụng trong React.

## Fragments
Như React documentation nói:
> A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.
> 
Chúng ta có thể hiểu nó là 1 parttern chung trong React dùng cho component để trả về nhiều elements mà không cần tạo thêm các nodes vào DOM.

## Ví dụ đơn giản nhất
Các Fragments được sử dụng để thay thế thẻ JSX "parent" khi chúng ta không muốn nó. Ở dưới đây, các bạn có thể thấy ví dụ đơn giản nhất về  sử dụng Fragments. Trong ví dụ này, chúng ta có 3 thẻ divs trong component, và chúng ta chỉ muốn 3 thẻ divs được hiển thị khi user render đến component này:

```
class ThreeDivsFragments extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </React.Fragment>
    );
  }
}
```

Như bạn thấy, chúng ta đang sử dụng React.Fragment làm thẻ bao cho 3 divs đó. Nếu bạn biết một số nội dung cơ bản liên quan đến JSX thì bạn biết rằng JSX phải chứa một element cha để giữ tất cả các con và thường trông giống như sau:
```
class ThreeDivsOrdinary extends React.Component {
  render() {
    return (
      <div>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </div>
    );
  }
}
```
chứ không thể như này:
```
class ThreeDivsOrdinary extends React.Component {
// Báo lỗi ngay vì không có element cha
  render() {
    return (
      <div>First</div>
      <div>Second</div>
      <div>Third</div>
    );
  }
}
```
Bây giờ, hãy xem xét việc rendering component này (được gọi là ThreeDivs) trong cả hai trường hợp và xem kết quả output trông như thế nào nhé:
```
<ThreeDivsFragments />
/* This returns ->
---------------------------------------
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
---------------------------------------
*/

<ThreeDivsOrdinary />
/* This returns ->
--------------------------------------
<div>
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</div>
--------------------------------------
*/
```

Và như bạn có thể thấy, việc sử dụng JSX thông thường sẽ yêu cầu thêm một thẻ div cha. Nếu chúng ta không muốn thì nên sử dụng React.Fragment. Tuy nhiên, động lực lớn nhất để React develops tạo ra Fragments chính xác là việc trả về list các thành phần con mà không bao gồm bất kỳ elements cha nào. Trong React documentation có 1 ví dụ khá hay về sử dụng Fragments:

```
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

Và chỉ với việc sử dụng Fragment, chúng ta có thể thực hiện markup table HTML chính xác 100% như sau:
```
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```

Cú pháp ngắn cho Fragments là `<>`, vì vậy component Columns cũng có thể viết như sau:
```
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
Ngoài ra, Fragments có thể có key attribute. Một trường hợp sử dụng cho việc này là mapping một collection tới một mảng các fragments. Có một ví dụ trong React documentation - tạo 1 mảng description list:

```
function Glossary(props) {
    return (
      <dl>
        {props.items.map(item => (
          // Nếu không có `key`, React sẽ báo warning về key
          <React.Fragment key={item.id}>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
          </React.Fragment>
        ))}
      </dl>
    );
}
```

## Kết luận
Bằng cách sử dụng Fragments, bạn có thể tránh tạo các elements parent (cha mẹ) không cần thiết cho list child (con). Ngoài ra, nó có thể giúp bạn tránh được nhiều vấn đề về CSS liên quan đến CSS selectors. Nó thực sự đơn giản để sử dụng, và bạn có thể tiết kiệm rất nhiều thời gian bằng cách sử dụng khái niệm này. Vì vậy tôi khuyên bạn nên sử dụng nó.

Refer: [React JSX](https://reactjs.org/docs/introducing-jsx.html), [React Fragment blog](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html), [Fragment in short](https://medium.com/@RistaSB/jsx-in-depth-fragments-in-short-68ff8197d0bd)