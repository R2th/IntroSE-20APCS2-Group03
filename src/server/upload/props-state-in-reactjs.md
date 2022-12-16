# 1.Mở đầu
Nếu bạn đã học ReactJS hay React Native, bạn sẽ thấy các Props và State được sử dụng rất nhiều.Khi mình mới bắt đầu tiếp xúc với ReactJS mình đã mất khá nhiều thời gian để hiểu được hai khái niệm này. Chúng trông thật giống nhau nhưng lại sử dụng khác nhau.Và bài viết này chúng ta sẽ cùng tìm hiểu Props và State chính xác là gì nhé.

# 2.Props
Props là properties của một component .Về cơ bản props là một đối tượng, nó lưu trữ các giá trị của các attribute (thuộc tính) của một thẻ (Tag).  Chúng ta có thể thay đổi giá trị props của một component bằng cách truyền dữ liệu từ ngoài vào. Khi một props được truyền vào component thì giá trị của nó là không thay đổi .

Chú ý: Khi một props được truyền vào component thì nó là bất biến tức là dữ liệu của nó không được thay đổi kiểu như một "pure" function vậy, sẵn tiện để bài viết thêm dài chúng ta cùng xem qua 2 ví dụ về function "pure" và "not pure"

Ta xét 1 function tính tổng ở dưới
```
function sum(a, b) {
  return a + b;
}
```

Function được gọi là "pure" vì nó không làm thay đổi giá trị đầu vào của nó và luôn trả về một kết quả tương tự cho các đầu vào như nhau. Xét ví dụ ở trên thì title và content chính là props của component Notification Ta lại xét 1 function khác
```
function sum(sum, a) {
  sum += a;
}
```

Ở đây function trên đã thay đổi chính giá trị sum đầu vào của nó và điều này khiến nó không là "pure" function **Tất cả các component của react phải hoạt động như "pure" function**

Bây giờ mình sẽ đề cập đến một props của component đó chính là children Như ví dụ đầu tiên, ở đây ta sẽ truyền content theo children
```
const Notification = (props) => {
  const { title } = props;
  return (
    <div className="notification">
      <h2 className="message__title">{title}</h2>
      <p>{props.children}</p>
    </div>
  );
};
```

Khi sử dụng chúng ta sẽ truyền nó trong cặp thẻ `<Notification></Notification>`
```
<Notification
    title = "title..."
>
Content...
</Notification>
```

Thực chất thì nó cũng chẳng khác gì, khác nhau là ở cách truyền, cách design component theo ý đồ của từng người.

Bạn có thể thay đổi props bằng cách sử dụng **setProps** hay **replaceProps** nhưng nó **không được khuyến khích.**

Kể từ lúc chúng ta truyền `props` vào component thì chúng không được thay đổi. Điều này giúp bạn nghĩ đến sẽ sử dụng props cho bất kì component nào mà luôn hiển thị cùng 1 đầu ra cho cùng 1 đầu vào. Điều này giúp chúng ra dễ dàng kiểm soát nó.

# 3.State
Giống như `props`, `sate` cũng giữ thông tin về component. Tuy nhiên, loại thông tin và cách xử lý nó khác nhau. State hoạt động khác với Props. State là thành phần của component, trong khi các props lại được truyền giá trị từ bên ngoài vào component Có một lưu ý nhỏ là chúng ta không nên cập nhật state bằng cách sử dụng trực tiếp this.state mà luôn sử dụng setState để cập nhật state của các đối tượng. Sử dụng setState để re-renders một component và tất cả các component con. Điều này thật tuyệt, bởi vì bạn không phải lo lắng về việc viết các xử lý sự kiện (event handler) như các ngôn ngữ khác.

Bất cứ khi nào dữ liệu thay đổi trong một component, State đều có thể được sử dụng

Nào, cùng xét qua một ví dụ sử dụng state
```
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'your name'
    }
  }

  onChange(e) {
    this.setState({name: e.target.value});
  }

  render() {
    return (
      <div>
        <input type='text' onChange={this.onChange.bind(this)} />
        <Notification title="hello">{this.state.name}</Notification>
      </div>
    );
  }
}
```

* Ở đây chúng ta khởi tạo state với name: 'your name'
* Hàm onChange được gọi mỗi khi giá trị input thay đổi và nó sẽ setState name bằng giá trị input
* state.name được truyền vào component Notification thông qua props.children
* Mỗi khi state.name thay đổi thì component Notification sẽ được render lại.

Kết quả:
![](https://images.viblo.asia/2bc5a5db-7286-42ac-972f-fd877f88bbe9.gif)


Và chắc chắn sẽ có nhiều bạn thắc mắc về điểm khác nhau giữa props và state:
![](https://images.viblo.asia/8997acaf-9c43-4153-a312-964ce0c2c821.jpg)


# 4.Kết luận
Hi vọng bài viết này sẽ giúp các bạn hiểu thêm về props và state. Cảm ơn các bạn đã theo dõi.

Nguồn tham khảo:

[https://lucybain.com/blog/2016/react-state-vs-pros/](https://lucybain.com/blog/2016/react-state-vs-pros/)

[https://reactjs.org/docs/components-and-props.html](https://reactjs.org/docs/components-and-props.html)

[https://reactjs.org/docs/state-and-lifecycle.html](https://reactjs.org/docs/state-and-lifecycle.html)