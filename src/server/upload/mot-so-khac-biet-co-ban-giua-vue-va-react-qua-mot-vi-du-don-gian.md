Mình đã có một thời gian làm việc với React và còn nhiều rất nhiều những vấn đề nâng cao mình vẫn chưa có thể nắm rõ hết. Mình cũng hơi có hứng thú tìm hiểu một ít về Vue. Và hôm nay mình sẽ viết về một số so sánh cơ bản giữa việc dùng React và Vue.

Trong bài viết này mình sẽ thực hiện ví dụ đơn giản là To Do App mà ta vẫn thường thực hiện với các chức năng thêm và xóa item với cả React và Vue.

Về cấu trúc thư mục thì cả 2 đều tương đối giống nhau. Style CSS là giống nhau tuy nhiên ở React thì sẽ được viết trong file CSS riêng rồi nhúng vào còn đối với Vue chúng ta sẽ khai báo ngay trong component của nó.

![](https://images.viblo.asia/9966a4a7-8ad7-4fce-bd85-67880797ab89.png)

![](https://images.viblo.asia/27f916f8-43b4-4281-ae3e-9b28ddec808a.png)
# Thay đổi dữ liệu
Nó đơn giản có thể hiểu rằng là các tác động đến dữ liệu mà chúng ta đã lưu trữ. Bắt đầu từ sự khác biệt về khởi tạo dữ liệu cũng như cách mà chúng ta thay đổi dữ liệu. Trong khi Vue tạo một đối tượng dữ liệu, ở trong đó dữ liệu có thể cập nhật được một các tự do. Còn với React thì là tạo đối tượng state, và việc cập nhật state thì không thể đơn gian như trong Vue. 

Dưới đây là cách khởi tạo dữ liệu ở React vs Vue:
```js
// React
constructor(props) {
        super(props);

        this.state = {
            list: [
                {
                    todo: 'fix bugs'
                },
                {
                    todo: 'write reports'
                }
            ],
            todo: '',
            buttonState: false
        };
    }
```
```js
// Vue
data() {
        return {
            list: [
                {
                    todo: 'fix bugs'
                },
                {
                    todo: 'write reports'
                }
            ],
            todo: '',
            buttonState: false
        }
    },
```
Bạn có thể thấy rằng, chúng ta khởi tạo dữ liệu giống nhau ở cả 2. Việc khởi tạo như trên thì tất nhiên rất là đơn giản nhưng vấn đề chúng ta so sánh ở đây sẽ là làm cách nào để có thể thay đổi dữ liệu.

Ở đây mình sẽ chỉ xét đến trường dữ liệu đơn giản hơn là `buttonState`.  Nó chỉ chứa dữ liệu là trạng thái `true` hay `false` của phần tử button. Gía trị này sẽ được đưa vào hiển thị là `On` (nếu `true`) hay `Off` (nếu `false`).

Trong React để tham chiếu đến 1 thành phần trong dữ liệu thì ta sử dụng `this.state.buttonState`. Tuy nhiên, ta muốn thay đổi giá trị của state thì cần dùng đến `setState` thay vì gọi trực tiếp tham chiếu đến phần tử. Và cách thực hiện đúng sẽ là `this.setState({buttonState: !this.state.buttonState})`.

Còn đối với Vue thì có vẻ đơn giản hơn. Để tham chiếu đến dữ liệu ta cũng có thể dùng là `this.buttonState`. Và để thực hiện thay đổi giá trị thì sẽ là `this.buttonState = !this.buttonState`.

# Tạo một item
## React
Trong React, trường input có thuộc tính là `value`. Giá trị này được cập nhật tự động bằng cách thêm prop là `onChange` vào trường input.
```js
<input type="text" value={todo} onChange={this.handleInput} onKeyPress={this.handleKeyPress}/>
```
Hàm `handleInput` thực thi bất kỳ khi nào mà giá trị của trường input thay đổi. Nó sẽ cập nhật state tên là `todo`. Còn với prop tên `value` trong input ở trên chính là giá trị của state. Chỗ đấy bạn nên hiểu tường mình là `value={this.state.todo}` do ở trên mình có khai báo 1 đoạn gán biến như sau: `const {todo} = this.state;`.
```js
handleInput(e) {
    this.setState({
        todo: e.target.value
    });
};
```
Ở input trên có 1 prop khác là `onKeyPress={this.handleKeyPress}` đây đơn giản là bắt sự kiện người dùng Enter thì tương đương với việc tạo mới một item.
```js
handleKeyPress(e) {
    if (e.target.value !== '') {
        if (e.key === 'Enter') {
            this.createNewToDoItem();
        }
    }
};
```
Để thực hiện việc tạo mới item thì ở trong đây còn có một cách khác là click vào nút `+` sau đây:
```js
<button className="todo-add" onClick={this.createNewToDoItem}>+</button>
```
Hàm `createNewToDoItem` sẽ thực thi `setState` và truyền vào nó 1 hàm. Hàm này có 2 tham số truyền vào là mảng `list` từ đối tượng state và `todo`. Hàm trả về một đối tượng mới chứa toàn bộ `list` từ trước và thêm `todo` vào cuối danh sách. Và cũng không quên rằng đặt `todo` về chuỗi rỗng để có thể cập nhật `value` trong trường input cũng như phục vụ cho việc thêm các item sau.
```js
createNewToDoItem() {
    if (!this.state.todo) {
        alert("Please enter a todo!");

        return;
    }

    this.setState(({ list, todo }) => ({
        list: [
            ...list,
            {
                todo
            }
        ],
        todo: ''
    }));
};
```
## Vue
Ở Vue, trường input sử dụng `v-model` cho phép chúng ta thực hiện `two-way biding`
```js
<input type="text" v-model="todo" v-on:keyup.enter="handleKeyPress" />
```
`todo` ở đây cũng tương tự như state của React ở trên. Việc gán `v-model` ở input sẽ làm cho dữ liệu `todo` trong đối tượng data được cập nhật liên tục với giá trị của input. 

Còn với phương thức `createNewToDoItem()` cũng có nhiệm vụ là thêm giá trị `todo` mới được gửi đi thêm vào mảng `list` hiện tại.
```js
createNewToDoItem() {
    if (!this.todo){
        alert("Please enter a todo!");

        return;
    }

    this.list.push({todo: this.todo});
    this.todo = '';
},
```
# Xóa item
## React
Hàm `deleteItem` được khai báo ở trong `<ToDo />` với mục đích là thay đổi state. Tuy nhiên, chúng ta không gọi hàm này ở ngay component cha mà là truyền nó vào component con `<ToDoItem />` với một prop là `deleteItem` như sau: 
```js
<ToDoItem
        key={key}
        item={item.todo}
        deleteItem={this.deleteItem.bind(this, key)}
/>
```
Ở component con `<ToDoItem />` nó sẽ sử dụng prop là `onClick` và gọi đến prop của cha `deleteItem`:
```
<button className="todo-item__delete"
        onClick={deleteItem}>-
</button>
```
## Vue
Trước tiên, trong phần tử button chúng ta gọi đến hàm:
```js
<button class="todo-item__delete" @click="deleteItem(todo)">
    -
</button>
```
Tiếp đến, chúng ta tạo 1 hàm **emit** như là phương thức ở trong component con.
```js
deleteItem(todo) {
    this.$emit('delete', todo);
}
```
Cùng với đó là tại component cha chúng ta tham chiếu đến hàm `delete` vào component con.
```js
<ToDoItem v-for="item in list"
        :todo="item"
        @delete="deleteItem"
        :key="item.todo"/>
```
# So sánh một số vấn đề khác
Từ trên ta sẽ tổng hợp cách dùng cơ bản của React và Vue để tương tác với prop và lắng nghe sự kiện như sau:

|  | React | Vue |
| -------- | -------- | -------- |
| Event Listener (Lắng nghe sự kiện)     |Ex: `onClick`, `onKeyPress`...      | Sử dụng @ cho cách viết rút gọn hoặc sử dụng `v-on`. Ex: `@click`, `v-on:keyup`    |
| -------- | -------- | -------- |
| Truyền dữ liệu từ component cha xuống component con     |Ex: `<ToDoItem key={key} item={item.todo} />` |  Truyền trực tiếp: `<ToDoItem v-for="item in list" :todo="item" :key="item.todo"/>` hoặc truyền vào mảng `props` trong component con: `props: ['todo']`|

# Kết luận
Bài viết đơn giản chỉ là đưa ra một ví dụ đơn giản về To Do App để so sánh một số khác biệt cơ bản trong việc sử dụng React và Vue. Theo mình thì cả 2 đều có vẻ tương đối giống nhau về luồng thực hiện và ngay cả cách viết có những điểm tương đồng. Kiến thức trong bài vẫn đang ở mức cơ bản nhất do mình chưa có thời gian sử dụng Vue nhiều. Mong rằng ở những bài viết sau mình sẽ có thể đưa ra kiến thức hay hơn về Vue.
# Repo
Đây là 2 repo mà mình thực hiện trong bài viết này. Mọi người nên clone về và xem chi tiết code để hiểu rõ hơn vì trong bài viết mình đưa ra các đoạn code ngắn để giải thích và nếu xem như vậy thì sẽ rời rạc. Về style CSS thì mình sẽ cập nhật sau :smile: .
* https://github.com/hieubui1195/react-todoapp
* https://github.com/hieubui1195/vue-todoapp