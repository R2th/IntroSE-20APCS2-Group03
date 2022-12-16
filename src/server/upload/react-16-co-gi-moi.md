React 16 cũng đã ra mắt được 1 thời gian, đi cùng với nó là rất nhiều sự thay đổi nâng cấp. Hôm nay mình xin phép giới thiệu với các bạn 1 số tính năng hữu ích của React 16 so với React 15.
# Fragments
> Trong React, thông thường các component sẽ trả về nhiều elements khác nhau. Fragments sẽ giúp bạn nhóm các elements con đó lại mà không phải tạo thêm các nodes mới trong DOM.

Hãy cùng đến với 1 ví dụ:
```javascript
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
`Columns` cần trả về nhiều thẻ `td` để HTML được hiển thị hợp lệ.Nếu chúng ta bọc các elements trong `Columns` lại bằng 1 thẻ `div` thì kết quả chắc chắn sẽ không hợp lệ:
```javascript
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```
Output `Table` sẽ ra:
```javascript
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```
Mà đó lại không phải điều chúng ta mong muốn, vì vậy React 16.0 giới thiệu khái niệm mới là `Fragments`. Quay lại ví dụ trên, chúng ta có thể sửa lại thành như sau:
```javascript
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
Output của `Table` sẽ là:
```javascript
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```
Tèn ten, chúng ta đã có được kết quả mình muốn, nhưng mà nếu bạn thắc mắc viết thế kia nhìn dài quá, liệu có thể viết ngắn hơn được không. Câu trả lời là được luôn, từ React 16.2 đã giới thiệu cú pháp mới ngắn gọn hơn:
```javascript
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
Vậy đó, từ giờ bạn chỉ cần `<> </>` là có thể tung hoành khắp nơi rồi, nhưng chú ý là cú pháp này chưa được support rộng rãi lắm nên có lẽ các bạn nên viết cú pháp đầy đủ sẽ tốt hơn, còn nếu lười quá thì cứ yolo đi, fix bug sau (LOL).

Vậy nếu chúng ta cần render 1 dãy elements với `Fragments` thì sao, câu trả lời làm thôi, vì `Fragments` hỗ trợ  thuộc tính `key`(cũng như nó là thuộc tính duy nhất có thể truyền vào `Fragments`)
```javascript
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```
# Render Array, String, Number
Trong React 15, hàm `render` của component luôn luôn trả về 1 React element. Trong React 16 thì lại khác, giờ đây hàm `render` sẽ trả về  cả string, number và array. Cơ bản là bạn có thể viết component như sau:
```javascript
class MyArrayComponent extends React.Component {
  render() {
    return [
      <div key="1">first element</div>, 
      <div key="2">second element</div>
    ];
  }
}
class MyStringComponent extends React.Component {
  render() {
    return "hey there";
  }
}
class MyNumberComponent extends React.Component {
  render() {
    return 2;
  }
}
```
# Nhanh và nhanh hơn nữa
Như các bạn đã biết, React được Facebook xây dựng và phát triển, qua từng phiên bản Facebook luôn cố gắng làm cho React có tốc độ tốt hơn các phiên bản trước. React 16.0 là phiên bản React đầu tiên được xây dựng dựa trên kiến trúc lõi hoàn toàn mới, được đặt tên là "Fiber". Nhờ sử dụng kiến trúc mới mà React 16 giờ đây còn **nhỏ** hơn cả React 15.6.1:
* react: 5.3 kb (2.2 kb gzipped), giảm xuống từ 20.7 kb (6.9 kb gzipped).
* react-dom: 103.7 kb (32.6 kb gzipped), giảm xuống từ 141 kb (42.9 kb gzipped).
* react + react-dom: 109 kb (34.8 kb gzipped), giảm xuống từ 161.7 kb (49.8 kb gzipped).

Không những thế, theo so sánh từ 1 số trang web, hiệu năng của React 16 nhanh hơn React 15.6.1 gần gấp 3 lần trong các bài test, 1 con số khá khủng khiếp đúng không, còn nếu các bạn dùng các phiên bản cũ hơn thì ... khỏi bàn đi. Với nhiều đặc điểm nổi trội như thế còn chờ gì nữa mà không nâng cấp lên ngay React 16 nếu như bạn đang dùng các phiên bản cũ hơn (nếu khách hàng không cho thì đành chịu :joy:). Trong bài viết sau mình sẽ giới thiệu các tính năng mới của React 16.6.0, cảm ơn các bạn đã đón đọc bài viết này.