**Càng nhiều element được đưa vào trang, trình duyệt sẽ mất nhiều thời gian hơn để hiển thị nó và dẫn tới trải nghiệm người dùng sẽ càng tệ. Điều này ta dễ dàng gặp trong trường hợp xử lý hiển thị list record với số lượng lớn, giải pháp ở đây là mình chỉ hiển thị những item cần thiết và lắng nghe sự kiện scroll để load data thích hợp. Trong Reactjs ta có thể sử dụng 2 thư viện hỗ trợ là [react-window](https://react-window.now.sh/#/examples/list/fixed-size)  hoặc [react-virtualized](https://bvaughn.github.io/react-virtualized/#/components/List), nếu bạn sử dựng  Kendo UI’s Grid component thì tính năng này đã được tích hợp sẵn.**

Để hiểu rõ hơn ta đi vào ví dụ thực tế:
### Demo
Tạo một project demo bằng create-react-app và add thêm thư viện tạo dữ liệu mẫu lorem-ipsum.
```
 create-react-app demo
  
 cd demo

yarn add lorem-ipsum

```

### Render element list default
- Trước tiên ta tạo 1000 record và hiển thị list theo cách thông thường:

```
const rowCount = 1000; // Số lượn record cần tạo

class App extends Component {
  constructor() {
    super();
    this.list = Array(rowCount).fill().map((val, idx) => { // tạo data mẫu
      return {
        id: idx, 
        name: 'Data name',
        image: '',
        text: loremIpsum({
          count: 1, 
          units: 'sentences',
          sentenceLowerBound: 4,
          sentenceUpperBound: 8 
        })
      }
    });
  }

  renderRow = (item) => {
      return (
        <div key={item.id} className="row">
          <div className="image">
            <img src={item.image} alt="" />
          </div>
          <div className="content">
            <div>{item.name}</div>
            <div>{item.text}</div>
          </div>
        </div>
      );
    }

  render() {
      return (
        <div className="App">
          <div className="list">
            {this.list.map(this.renderRow)}
          </div>
        </div>
      );
    }
}

```

Kết quả nhận được:
![](https://images.viblo.asia/d4517e89-e543-466b-b1b9-bcfbaceb7eb2.png)

Như ta thấy 1000 element được render trên DOM => quá nhiều element
### Render element with react-virtualized

```
 yarn add react-virtualized
```

Chỉnh sửa code cũ:
```
  ....
 import { List, AutoSizer } from "react-virtualized"; // thêm Component

  const rowHeight = 50;
  ....
   renderRow = ({ index, key, style }) => {
    return (
      <div key={key} style={style} className="row">
        <div className="image">
          <img src={this.list[index].image} alt="" />
        </div>
        <div className="content">
          <div>{this.list[index].name}</div>
          <div>{this.list[index].text}</div>
        </div>
      </div>
    );
  }

render() {
    return (
      <div className="App">
        <div className="list">
          <AutoSizer>
          {
            ({ width, height }) => {
              return <List
                width={width}
                height={height}
                rowHeight={rowHeight}
                rowRenderer={this.renderRow}
                rowCount={this.list.length}
                />
            }
          }
          </AutoSizer>
        </div>
      </div>
    );
  }
 
```

Giá trị hiển thị:
![](https://images.viblo.asia/b4e57397-a29a-461c-b28c-04c144fbadba.png)

Rõ ràng ta nhận thấy số lượng element được render chỉ là 20 element, tối ưu hơn nhiều so với 1000 element như trước.

Ngoài List được sử dụng ở trên ta còn có một số components: [Grid](https://github.com/bvaughn/react-virtualized/blob/master/docs/Grid.md), [Table](https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md), [Masonry](https://github.com/bvaughn/react-virtualized/blob/master/docs/Masonry.md), [Collection](https://github.com/bvaughn/react-virtualized/blob/master/docs/Collection.md)

### Link tham khảo
https://github.com/bvaughn/react-virtualized/tree/master/docs

https://bvaughn.github.io/react-virtualized/#/components/List