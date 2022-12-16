> Xin chào mọi người bài viết lần này mình xin chia sẻ chút kiến thức về Mobx, hy vọng sau bài viết này mọi người có thể biết khi nào nên sử dụng Mobx hay Rudex trong dự án của mình nhé. Và nếu có gì chưa hợp lý hy vọng mọi người có thể comment bên dưới để cùng nhau học hỏi thêm kiến thức nhé. 

Okay mình bắt đầu bài viết nhé. Let's go!


Sự khác nhau giữa `Mobx` và `Redux`:

 * `Redux` sử dụng 1 `store` để quản lý `state` trong khi `Mobx` có thể sử dụng nhiều `store` sao cho bản thân thấy hợp lý là okay.

* `Redux` là `immuatable` trong khi Mobx chỉ là `mutable` (có thể thay đổi trực tiếp giá trị)

* `Redux` chỉ đơn giản là một nơi để lưu trữ dữ liệu, còn lại muốn `component` `re-render` như thế nào thì ta phải tự tay làm việc đó. Còn `Mobx` sử dụng `observable` để lưu dữ liệu và khi thay đổi giá trị `observable` thì `component` sẽ tự động` re-render` .
* Viết code sẽ ít hơn, ngắn hơn khi sử dụng Mobx thay vì Redux.

Okay giờ chúng ta cùng tìm hiểu sơ qua về `Mobx` nhé:

### 1. Observable
Nói một cách dễ hiểu nhất thì `observable` dùng để khai báo biến (có thể là `number`, `string`, `boolean`, `null`, `array`, `objects`, `function`,...)

```js
@observable userList = [];

@observable totalRecord = 0;
```

### 2. Observer
`Observer` giúp `component` quan sát sự thay đổi của các giá trị `observable` để `re-render` lại `component`.

Có  2 `packages` cho phép sử dụng `observer`: 

* `mobx-react`: chỉ hỗ trợ cho `class component`.

* `mobx-react-lite`: chỉ hỗ trợ cho `functional component` và kích thước cũng nhỏ hơn rất nhiều.

Ví dụ khi muốn component UserList quan sát giá trị của UserStore chúng ta khai báo như sau: 

```js
@inject('UserStore')
@observer
class UserList extends Component {

}
```


### 3. Computed
Cũng tương tự như `computed` trong `Vue` thì `computed` của `Mobx` có nhiệm vụ tính toán lại giá trị khi `observable` thay đổi.

Khi `component` nhận vào một `computed value` mà khi nó thay đổi giá trị thì `component` vẫn sẽ `re-render`.

```js
class UserStore {
   @observable userList = [];   
   
   @computed
   get totalRecord() {    
      return this.userList.length  
   }
}
```

### 4. action
`Action` cho phép bạn thay đổi giá trị `observable`. 
Ví dụ nếu muốn gọi API lấy về danh sách các user thì chúng ta sẽ code như sau:

```js
class UserStore {
   @observable userList = [];  
   
   @action.bound
   async dispatchGetUserList() {
       this.userList = await UserAPI.getUserList()
   }
}
```

### 5. Tổng kết
Và sau khi đang làm dự án gần 2 năm thì mình rút ra răng, việc `Mobx` có thể thay thế `Redux` hay không thì nó còn phụ thuộc vào dự án, đối với mình những dự án nhỏ thì nên sử dụng `Mobx` còn đối với dự án lớn, có nhiều chức năng thì nên sử dụng `Redux` để dễ dàng hơn trong việc maintain, debug.

Trên đây là những chia sẻ của mình, hy vọng có thể giúp ích được cho mọi người. Cảm ơn các bạn.
![](https://images.viblo.asia/2e26fa15-6d36-4b2a-b0a1-3ac7b93e1eca.jpg)