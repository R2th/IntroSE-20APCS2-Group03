Có rất nhiều thư viện tốt để tạo drag and drop list, ví dụ như: [dragula](https://github.com/bevacqua/dragula), [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd), [react-dnd](https://github.com/react-dnd). Chúng giúp bạn dễ dàng đạt đc mục đích mà ko cần phải lo nghĩ gì nhiều. Tuy nhiên, việc sử dụng thư viện cũng có một số cái giá của nó, chúng làm tăng bundle size của app, có thể làm giảm performance và bạn trở nên phụ thuộc vào tương lai của thư viện đó nữa. Vậy nên trc' khi sử dụng những thư viện trên, bạn nên nhìn vào vấn đề trc' xem mình có thể giải quyết nó một cách đơn giản hay ko. Và đó chính là lý do tôi viết bài này để hướng dẫn các bạn sử dụng API drag and drop của HTML5 để tạo ra một list có thể drag and drop đc.

Kết quả
![](https://images.viblo.asia/ef759cec-f343-46aa-be0b-b20f11f0dafe.gif)

Source code có thể xem [ở đây](https://github.com/siffogh/drag-and-drop-article)

### Bước 1: Tạo list
Ở bước 1, chúng ta sẽ tạo ra một list đồ ăn trc'. List này sẽ đc lưu vào state của App, mỗi item trong list đều khác nhau nên chúng ta có thể sử dụng chúng để làm key cho từng phần tử thẻ ```<li>```.
Style cũng chỉ đơn giản là thêm màu padding và đổi cursor thành move để người dùng biết đc rằng item đó có thể drag đc.

```
class App extends React.Component {
  state = {
    items: ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"]
  };

  render() {
    return (
      <div className="App">
        <main>
          <h3>List of items</h3>
          <ul>
            {this.state.items.map(item => (
              <li key={item}>
                <div className="drag">
                  <Hamburger />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }
}
```

```
.App {
  font-family: sans-serif;
  font-size: 1.5rem;
  text-align: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.App main {
  background-color: #383838;
  color: #fff;
  padding: 10px;
}

.App ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.App ul li {
  background-color: #383838;
  padding: 10px 20px;
  position: relative;
  display: flex;
  align-items: flex-start;
  line-height: 1;
}

.App li .drag {
  margin-right: 15px;
  cursor: move;
}

.App li svg {
  height: 2rem;
  color: #fff;
}
```

Kết quả
![](https://images.viblo.asia/b07c767b-7448-44b0-b5c7-1aaf6c836509.png)

### Bước 2: Làm cho list item có thể drag đc.
Để các item có thể drag đc, ta thêm props ```draggable``` vào thẻ div như sau:

```
class App extends React.Component {
  state = {
    items: ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"]
  };

  render() {
    return (
      <div className="App">
        <main>
          <h3>List of items</h3>
          <ul>
            {this.state.items.map(item => (
              <li key={item}>
                <div className="drag" draggable>
                  <Hamburger />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }
}
```

Kết quả sau khi thêm draggable:
![](https://images.viblo.asia/39c5c4b1-1afd-4e78-a2d3-d81862f05f89.gif)

Mặc dù icon có thể drag đc, nhưng nó ko phải thứ mà chúng ta muốn làm. Chúng ta muốn cả item có thể drag đc thông qua icon đó cơ.
Để làm đc việc đấy, chúng ta cần phải chỉ rõ ra thứ chúng ta muốn drag ở event ```onDragStart```:

```
class App extends React.Component {
  state = {
    items: ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"]
  };

  onDragStart = e => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  render() {
    return (
      <div className="App">
        <main>
          <h3>List of items</h3>
          <ul>
            {this.state.items.map((item, idx) => (
              <li key={item}>
                <div
                  className="drag"
                  draggable
                  onDragStart={this.onDragStart}
                >
                  <Hamburger />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }
}
```

Set drag effect là move để có đc hiệu ứng di chuyển item.
```e.dataTransfer.setData("text/html", e.parentNode)``` để set item đc drag là node cha của icon đó,  ở đây là chính là list item. Cái này là cần thiết để firefox có thể chạy đc.
```e.dataTransfer.setDragImage(e.parentNode, 20, 20)``` tương tự như dòng trên, nhưng là để dành cho chrome.

Kết quả:
![](https://images.viblo.asia/d5086cfd-9d70-4514-9e71-82d3f49a7b09.gif)

Item của chúng đã có thể drag, tuy nhiên, chúng cần phải đc sắp xếp lại sau mỗi lần drag.

### Bước 3: Đổi thứ tự của item
Khi một item bị một item khác drag qua nó, chúng ta cần phải sắp xếp lại list item. Nếu item A đc drag qua item B, thì A phải đc đặt sau B.
Đầu tiên, chúng ta phải lưu lại item đang đc drag khi drag bắt đầu (ở event ```onDragStart```) và lưu item đang được drag là null khi drag kết thúc (ở event ```onDragEnd```).
Tiếp theo, chúng ta viết logic sắp xếp lại ở event ```onDragOver``` của từng item, event đc gọi mỗi khi item đc một element khác drag qua nó.

```
class App extends React.Component {
  state = {
    items: ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"]
  };

  onDragStart = (e, index) => {
    this.draggedItem = this.state.items[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onDragOver = index => {
    const draggedOverItem = this.state.items[index];

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = this.state.items.filter(item => item !== this.draggedItem);

    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem);

    this.setState({ items });
  };

  onDragEnd = () => {
    this.draggedIdx = null;
  };

  render() {
    return (
      <div className="App">
        <main>
          <h3>List of items</h3>
          <ul>
            {this.state.items.map((item, idx) => (
              <li key={item} onDragOver={() => this.onDragOver(idx)}>
                <div
                  className="drag"
                  draggable
                  onDragStart={e => this.onDragStart(e, idx)}
                  onDragEnd={this.onDragEnd}
                >
                  <Hamburger />
                </div>
                <span className="content">{item}</span>
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }
}
```

Nếu item đc drag qua là chính item chúng ta đang drag thì sẽ ko làm gì cả, còn nếu ko phải thì chúng ta sẽ đặt item đang đc drag ở ngay sau item bị drag qua.

Kết quả cuối cùng
![](https://images.viblo.asia/ef759cec-f343-46aa-be0b-b20f11f0dafe.gif)

Bài viết đc dịch lại từ: https://medium.freecodecamp.org/how-to-make-and-test-your-own-react-drag-and-drop-list-with-0-dependencies-6fb461603780
Tác giả: Seif Ghezala