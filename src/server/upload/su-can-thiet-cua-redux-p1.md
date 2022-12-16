>Có thể bạn đã nghe qua khái niệm về `redux`, `redux-saga` quá nhiều lần mà đã bao giờ bạn tự hỏi nó là gì và tại sao chúng ta lại sử dụng redux trong các dự án,  và có phải khi nào cũng nên sử dụng `redux` ?. 

>Bài viết sẽ không đi quá chuyên sâu về cấu trúc code và cách sử dụng nó. Nếu bạn muốn đi sâu hơn vào chi tiết, mình xin giới thiệu bài viết của tác giả @ta.duy.anh với series [Học Redux bằng hướng dẫn dễ dàng nhất thế giới](https://viblo.asia/s/hoc-redux-bang-huong-dan-de-dang-nhat-the-gioi-W65GEpBjZDO) được dịch từ cuốn Understanding redux, có nguồn tài liệu tiếng anh trên [Medium](https://medium.freecodecamp.org/understanding-redux-the-worlds-easiest-guide-to-beginning-redux-c695f45546f6). 

Nào bắt đầu thôi :D

### 1. Tại sao chúng ta cần tới redux ?
Điều đầu tiên chúng ta cần biết, redux không phải là một ngôn ngữ, redux là một trình quản lý trạng thái của ứng dụng và redux thường xuyên được sử dụng trong các ứng dụng React do các ưu điểm vượt trội của nó mang lại để có thể quản lý và sử dụng trong các ứng dụng React.

Dĩ nhiên là React có thể tự quản lý trạng thái của nó. Nhưng nếu bạn đã từng làm qua 1 ví dụ đơn giản về việc tạo ra 1 ứng dụng React thì vấn đề về việc quản lý trạng thái ( mà chúng ta quen gọi là state và props) của component là một vấn đề nan giải. Và khi gặp vấn đề thì ngay cả người viết ra nó cũng cần khá nhiều thời gian để có thể hiểu được cái `thứ` mà mình đã viết ra.
Dễ hiểu hơn chúng ta sẽ làm một ví dụ đơn giản để quản lí trạng thái trong các component bằng ví dụ `Tạo note` đơn giản.

Để dễ hình dung ta sẽ xem kết quả trước nhé :D . 

![](https://images.viblo.asia/70ae3b29-7a83-4b09-acf4-912234608300.png)

> Có thể bạn chưa biết, đây chỉ là hình ví dụ, kết quả thực tế không đẹp như thế này :v

Dễ thấy các component cần thiết:
1. App ( Thằng to nhất, chứa các component con bên trong nó)
2. List item (Chứa danh sách các item con)
3. Item (Nội dung note của chúng ta)
4. Search bar (Tìm kiếm đơn giản)

Tư tưởng chính của React là chia ứng dụng thành các component để có thể thuận tiện trong việc quản lý và xử lý cũng như hoạt động maintain sau này sẽ dễ dàng hơn. Chúng ta sẽ bắt đầu với từng component một.

Việc đầu tiên: Tạo các component.

**1. App Component**
```
import React, { Component } from 'react';
import ListItem from './ListItem';
import Item from './Item';
import ItemForm from './ItemForm';

class App extends Component {
  constructor() {
    super()
    this.sate = {
      items: [],
      currentItem: {text:'', key:''},
    }
  }
  handleInput = e => {
    console.log('Hello Input')
  }
  addItem = () => {
    console.log('Hello Add Item')
  }
  render() {
    return (
      <div className="App">
        <ItemForm/>
        <ListItem />
        <Item />
      </div>
    )
  }
}

export default App;


```
**2. ItemForm Component**
```
import React, { Component } from 'react';

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {currentItem: { text: '', key: '' },}
  }
  handleInput(e) {
    const itemText = e.target.value
    const currentItem = { text: itemText, key: Date.now() }
    console.log(currentItem)
    this.setState({
      currentItem,
    })
  }
  addItem(e) {
    e.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.text !== '') {
      console.log(newItem)
      this.setState({
        currentItem: { text: '', key: '' },
      })
    }
  }
  render() {
    return (
      <div className='todoListMain'>
        <form onSubmit={this.addItem.bind(this)}>
          <input placeholder='Item' type='text' name='item'
            value={this.state.currentItem.text}
            onChange={this.handleInput.bind(this)}
          />
          <button type='submit'> Add Item </button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
```
**3. Item Component**
```
import React, { Component } from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '1', key: '1' }
  }

  render() {
    return (
      <>
        <li>{this.state.text}</li>
      </>
    );
  }
}

export default Item;

```
**4. List Item Component**
```
import React, { Component } from 'react';
import Item from './Item';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {listItems: [{ text: '1', key: '1' }, { text: '2', key: '2' }, { text: '3', key: '3' }]}
  }

  renderItem(item) {
    console.log(item.text)
    if (item) {
      return <li key={item.key}>{item.text}</li>
    }
  }

  render() {
    let listItems = this.state.listItems
    listItems = listItems.map(this.renderItem)
    return (
      <div className="listItem">
        {listItems}
      </div>
    );
  }
}

export default ListItem;

```

> Done bước 1. Mất gần 30 phút mới viết lại được cái đống hồi còn gà mình hay làm =)). Tham khảo code tại pull request:
> https://github.com/Hungnv950/reactApp/commit/be4294f849b9fc8f83a2b026929a2ef06a4b5020

> Tiếp theo chúng ta tiến hành kết nối các component trong ứng dụng lại với nhau sử dụng trình quản lý trạng thái mặc định mà React cung cấp.
> 

Chúng ta sử dụng một state chung để lưu tất cả các items trong ứng dụng tại Component App và truyền xuống component con bằng cách sử dụng props(chú ý phần chú thích).
```
import React, { Component } from 'react';
import ListItem from './ListItem';
import Item from './Item';
import ItemForm from './ItemForm';

class App extends Component {
  constructor() {
    super()
    this.state = {
      items: [{ text: 'Ăn sáng', key: '1' }, { text: 'Ăn trưa', key: '2' }, { text: 'Ăn tối', key: '3' }],  //Tạo state ban đầu làm ví dụ
      currentItem: {text:'', key:''},
    }
  }
  handleInput = e => {
    console.log('Hello Input')
  }
  addItem = () => {
    console.log('Hello Add Item')
  }
  render() {
    return (
      <div className="App">
        <ItemForm/>
        <ListItem listItems={this.state.items} /> //Truyền items từ App xuống LisItem sử dụng props lisItems
        <Item />
      </div>
    )
  }
}
export default App;
```
Ta tiến hành sửa một chút trong component ListItem và Item:
```
import React, { Component } from 'react';
import Item from './Item';

class ListItem extends Component {

  renderItem(item) {
    if (item) {
      return <Item item={item}/> // Truyền từng item xuống Item component
    }
  }

  render() {
    let listItems = this.props.listItems // Nhận listItem từ App Component. Kiểm tra bằng đoạn console.log phía dưới
    consoloe.log("Props at List Item component",this.props)
    listItems = listItems.map(this.renderItem)
    return (
      <div className="listItem">
        {listItems}
      </div>
    );
  }
}

export default ListItem;
```
> Và cuối cùng là việc hiển thị từng Item được truyền từ ListItem xuống.
```
import React, { Component } from 'react';

class Item extends Component {
  render() {
    if(this.props.item) {
      const item = this.props.item
      return (
        <>
          <li key={item.key}>{item.text}</li> 
        </>
      );
    }
    else {
      return(<></>)
    }
  }
}

export default Item;

```

>  Bây giờ dữ liệu trong ứng dụng React của chúng ta đã được thống nhất, truyền từ component App -> ListItem -> Item.
> Tiếp theo chúng ta sẽ xử lý việc thêm các Item từ ItemForm component.

Trong App component sẽ đảm nhận việc xử lý việc nhận hành động handle và thêm item vào trong state của nó.

```
handleInput = e => {
    const itemText = e.target.value
    const currentItem = { text: itemText, key: Date.now() }
    this.setState({
      currentItem,
    })
  }
  addItem = (e) => {
    e.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.text !== '') {
      console.log(newItem)
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: { text: '', key: '' },
      })
    }
  }
```
 Xóa các hàm xử lý trong ItemForm ta được:
 

 ```
 import React, { Component } from 'react';

class ItemForm extends Component {

  render() {
    return (
      <div className='todoListMain'>
        <form onSubmit={this.props.addItem}>
          <input placeholder='Item' type='text' name='item'
            value={this.props.currentItem.text}
            onChange={this.props.handleInput}
          />
          <button type='submit'> Add Item </button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
```

> Tham khảo code tại pull request: https://github.com/Hungnv950/reactApp/pull/2/commits/50c92c42d685de441c727d864ba53fc1735ec7dd


> Nào cùng nhìn lại chúng ta vừa làm những gì:
> 
1.  Đầu tiên, chúng ta chia ứng dụng thành các component con: App, ListItem, Item, ItemForm
2.  Đưa ra và xử lý các component khi chúng đứng riêng rẽ
3.  Tạo quản lý và truyền xuống các component con thông qua props.

=> Vấn đề:
1. Khi cần thêm 1 giá trị của item ví dụ như thêm trường `mức độ ưu tiên` chẳng hạn. Khi đó ta sẽ phải sửa từ app -> listItem -> Item và form. Khi đó việc mở rộng và chỉnh sửa trong các component con sẽ tốn rất nhiều thời gian để đọc và tìm hiểu luồng hoạt động của ứng dụng.
2. Khi gặp bugs phát sinh ta sẽ phải lần từ app xuống. Gỉa sử ta không chỉ có 3 cấp như ở trên mà thành 6-7 cấp component cha-con-ông-bà-cụ kị. Việc phát triển sẽ trở nên vô cùng khó khăn và rối.
3. Tiếp tục, đang làm việc mà có 1 state tại sao lại không thay đổi mặc dù không hề thấy lỗi gì. Chúng ta sẽ phải tiến hành debug tại từng component một :)))

> Và vân vân, mây mây các thứ chúng ta sẽ gặp phải khi chúng ta chưa biết tới **REDUX**

![](https://images.viblo.asia/a67aa8db-aaeb-4b2d-a79c-f690cb731567.png)
Hiểu đơn giản, Redux giúp chúng ta quản lý trạng thái của ứng dụng và chuyển nó ra một nơi gọi là store tổng, nơi mà chúng ta có thể dễ dàng gọi và cập nhật trạng thái của toàn bộ ứng dụng.

Khi bắt đầu với redux sẽ có một vài khái niệm cần phải nắm bắt, nhưng một khi hiểu được tư tưởng của nó, Redux sẽ giúp bạn giải quyết các vấn đề một các dễ dàng.


### 2. Khi nào chúng ta cần sử dụng Redux ?

- Đối với các ứng dụng trung bình và lớn, việc sử dụng redux khá là cần thiết trong việc quản lý trạng thái của ứng dụng, khi mà bạn phải quan tâm nhiều đến việc xử lý mà việc quản lý các trạng thái trở nên phức tạp và khó khăn.

- Việc sử dụng redux với các ứng dụng đơn giản là không cần thiết. Ví dụ như ở ví dụ trên, tôi có thể hoàn toàn hiểu được luồng của dữ liệu trong ứng dụng và có thể tự thiết kế cũng như sửa đổi nó một cách nhanh chóng.

> Bắt đầu tìm hiểu qua về Redux và các khái niệm của nó nào :D
> 




### 3. IMMUTABLE STATE TREE
> (Có thể hiểu là State của ứng dụng được lưu dưới dạng cây khó thể thay đổi lập tức)
- Trong redux, mọi trạng thái của ứng dụng(state) được đại diện bởi một JavaScript object được gọi với cái tên State hoặc State Tree.

- Sở dĩ gọi là **Immutable State Tree** bởi lẽ State tại đây chỉ đọc, không thể thay đổi nó một cách ngay lập tức được.

- State này chỉ được thay đổi khi mà chúng ta **dispatch** nó thông qua **Action**

### 4. Action
>( Hành động)
> 

>Một `Action` là một JavaScript object mô tả sự thay đổi theo cách đơn giản nhất( với các thông tin đơn giản nhất có thể sử dụng)

Ví dụ:
```
{
  type: 'CLICKED_SIDEBAR'
}

// e.g. with more data
{
  type: 'SELECTED_USER',
  userId: 232
}
```

Yêu cầu duy nhất của một `action` là thuộc tính `type`, thường giá trị là một chuỗi.

#### ACTIONS TYPES SHOULD BE CONSTANTS
> (Kiểu của action nên để là một hằng số)

Ví dụ về một action và định nghĩa CONSTANTS:
```
const ADD_ITEM = 'ADD_ITEM'
const action = { type: ADD_ITEM, title: 'Third item' }
```

>Và để tách các hành động sang các file định nghĩa riêng chúng ta nên sử dụng như ví dụ:
```
import { ADD_ITEM, REMOVE_ITEM } from './actions'
```
### 4. ACTION CREATORS

> Action creator là nơi chứa các functions taih ra các hành động trong ứng dụng.
> 

```
function addItem(t) {
  return {
    type: ADD_ITEM,
    title: t
  }
}
```
Bạn thường chạy các `action creators` kết hợp với `dispatcher`:

```
dispatch(addItem('Milk'))
```

Chúng ta có thể sử dụng chúng như sau:

```
const dispatchAddItem = i => dispatch(addItem(i))
dispatchAddItem('Milk')
```

### 5. REDUCERS
> Khi có một thao tác tới action, phải có một thứ gì đó tác động và thay đổi state của ứng dụng chứ nhỉ. Đó chính là `reducers`

- **Reducer là gì ?**
Một reducer là một `pure function` thực hiện tính toán, thay đổi State Tree dựa trên State Tree cũ, và thực thi hành động.
```
(currentState, action) => newState
```

> Pure function là một hàm thuần, nó nhận đầu vào và trả ra kết quả đầu ra mà không bị ảnh hưởng bởi bất cứ tác động nào khác. Việc sử dụng pure function đảm bảo trả về State Tree mới thay đổi đúng với yêu cầu đầu vào và đầu ra. Trong Pure function, Pure function chỉ thao tác trên tham số truyền vào Ít nhất 1 tham số, Luôn trả về giá trị, Trả về giá trị không đổi khi tham số không đổi, Không có side effects(tác dụng phụ như đẩy thao tác lên server, lấy dữ liệu từ session...)
> 
### 6. THE STORE

adfc
`Store` là một đối tượng:
- Lưu trữ các trạng thái(state) của toàn bộ ứng dụng.
- Hiển thị State thông qua hàm getState()
-  Cho phép cập nhật state thông qua `dispatch()`
> Store là duy nhất trong một ứng dụng
> 
Ví dụ về tạo store trong ứng dụng:

```
import { createStore } from 'redux'
import listManager from './reducers'
let store = createStore(listManager)
```


Trên đây mình đã đưa ra lý do vì sao chúng ta lại cần tới việc sử dụng redux trong ứng dụng react bằng một ví dụ minh họa. Do giới hạn của bài viết mình xin phép làm ví dụ về việc sử dụng redux trong ứng dụng tạo `todo app` trong bài sau. Hi vọng qua bài viết này bạn đã hiểu được phần nào sự cần thiết của redux và khi nào thì nên áp dụng nó. Rất vui khi nhận được trao đổi của các bạn tại comment (bow)