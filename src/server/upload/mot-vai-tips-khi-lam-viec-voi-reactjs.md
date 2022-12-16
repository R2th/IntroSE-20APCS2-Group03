## 1. Mở đầu
<hr>

Ở những bài viết trước liên quan đến `ReactJS` mình đã giới thiệu với các bạn về một số `hook` trong `ReactJS` cũng nhưng ý nghĩa và cách xử dụng của chúng. Còn trong bài viết ngày hôm nay, chúng ta sẽ không tiếp tục tìm hiểu những khái niệm mới hay làm tính năng này tính năng kia nữa mà thay vào đó mình xin chia sẻ với cá bạn một số tips mà mình tích lũy được trong quá trình làm việc với `ReactJS`.

## 2. Tips & Tricks
<hr>

### a. Lấy dữ liệu với ImmutableJS hoặc Lodash

Đâu là 2 thư viện mình thường xuyên sử dụng trong các project liên quan đến `ReactJS` hoặc thậm chí cả `VueJS`. Nếu các bạn chưa biết gì về thư viện này thì có thể tìm đọc trên `Viblo` hoặc trên mạng có rất nhiều bài đề cập đến hoặc có thể comment ngay phía dưới để bài tiếp theo mình sẽ viết về chủ đề này :D. Quay lại với nội dung chính về việc lấy dữ liệu sử dụng hai thư viện trên. Giả sử chúng ta có một danh sách người dùng  và chúng ta sẽ render nó ra màn hình như sau:
```javascript
const users = [
    {
        id: 1,
        name: 'Quach Dai Phuc',
        university: {
            name: 'MTA'
        }
    },
    {
        id: 2,
        name: 'Dao Thai Son',
        university: {
            name: 'PTIT'
        }
    }
];

const UserList = () => (
    <div className="user-list">
        {
            users.map(user => (
                <div className="user-item" key={user.id}>
                    <p>Name: {user.name}</p>
                    <p>University: {user.university.name}</p>
                </div>
            ))
        }
    </div>
)
```

Trên thực tế thì các dạng dữ liệu như mình nói trên thường được lấy về từ server API của chúng ta hoặc một server nào đó và sử dụng như trên. Tuy nhiên chẳn may có một ngày, một user nào đó không có thông tin về `university` hay chính xác là `university = null` điều đó sẽ dẫn tới kết quả như sau khi chúng ta render UI:

![](https://images.viblo.asia/d70af583-7ac7-4bb2-9c18-26050c411af4.png)

Đây là những gì chúng ta thu được trên môi trường dev còn trên sản phẩm thực tế thì người dùng có thể nhận được 1 trang trắng tinh do ứng dụng của chúng ta đã bị crash. Một cách fix khác đơn giản mà bạn có thể áp dụng đó là kiểm trả thử nêu `university` khác `null` thì chúng ta mới lấy. Tuy nhiên cách đó không phải cách hay lắm vì có trường hợp dữ liệu chúng ta sẽ sâu hơn như thế chẳng hạn:
```js
const user = {
     university: {
        name: 'MTA',
        someOtherProperty: {
            value: 'abc'
        }
     }
}
```
Thì ta sẽ phải thực hiện so sánh nhiều lần rất dài dòng. Thay vào đó ta có thể sử dung hàm `.getIn()` trong `ImmutableJS` hoặc `_get()` trong `lodash` như sau:
```js
// ImmutableJS
const UserList = () => (
    <div className="user-list">
        {
            fromJS(users).map(user => (
                <div className="user-item" key={user.get('id')}>
                    <p>Name: {user.get('name')}</p>
                    <p>University: {user.getIn(['university', 'name']}</p>
                </div>
            ))
        }
    </div>
)

// Lodash
const UserList = () => (
    <div className="user-list">
        {
            users.map(user => (
                <div className="user-item" key={user.id}>
                    <p>Name: {user.name}</p>
                    <p>University: {_get(user, 'university.name')}</p>
                </div>
            ))
        }
    </div>
)
```
Cả hai cách làm trên sẽ đều giúp được bạn tránh được lỗi nói trên và tùy dự án mà chúng ta có thể sử dụng thư viện phù hợp.

### b. Sử dụng ImmutableJS với Redux

Đây là bộ đôi mình thường xuyên sử dụng nhất và nó xuất hiện trong tất cả các project React mà mình tham gia. Nếu bạn đã học về Redux cơ bản ở bất cứ trang nào đó hoặc thậm chí trên chính docs của Redux thì chắc hẳn bạn sẽ biết đoạn code về `reducer` như sau (trích từ docs của [Redux](https://redux.js.org/basics/reducers)):
```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      })
    default:
      return state
  }
}
```
Ở reducer trên bạn có thể thấy đang thực hiện 2 việc đó là thêm mới một `task` và todo list và thay đổi trạng thái một `task` từ true sang false hoặc ngược lại. Và như bạn đã biến quy tắc làm việc trong `ReactJS` là tính bất biến hay immutable và nó cũng được dùn trong thư viện `Redux`. Vì vậy thay vi chúng ta có thể thêm mới một `task` bằng cách `state.todos.push(task)` và làm thay đổi trực tiếp store mà chúng ta phải sử dụng `Object.assign()` như bạn thấy ở trên để tạo ra một object hoàn toàn mới. Như bạn thấy đọan code trên khá là lằng nhằng và dài dòng nhưng nếu bạn sử dụng `ImmutableJS` thì đoạn code trên sẽ được thay đổi như sau:
```js
function todoApp(state = fromJS(initialState), action) {
  switch (action.type) {
    case ADD_TODO:
      return state.update('todos', list => list.push(fromJS(action.payload)));
    case TOGGLE_TODO:
      const path = ['todos', index, 'completed'];
      return state.updateIn(path, !state.getIn(path));
    default:
      return state
  }
}
```
Ngắn và gọn hơn rất nhiều đúng không. Ở đây toàn bộ các thao tác liên quan đên việc thay đổi dữ liệu bởi `ImmutableJS` thì nó đều dẫn đến việc tạo mới một object thay vì thay đổi trực tiếp object cũ và đó cũng chính là điều chúng ta mong muốn. Nếu chưa dùng bao giờ thì có thể bạn thấy nó khó nhưng chỉ cần dùng thử 1, 2 lần chắc chắn bạn sẽ thích những gì mà thư viện này mang lại cho chúng ta.

### c.  Thêm rule max-lines cho eslint

Khi làm việc với `ReactJS` nhiều lúc bạn sẽ bị rơi vào tính trạng cố nhồi nhét code vào trong một component chỉ vì đơn giản nếu tách nhỏ ra component con thì chưa chắc nó đã được tái sử dụng hoặc đơn giản bạn chỉ là thêm một chút code cho tính năng mới thôi nên chắc cũng không sao cả. Dần ần đến một lúc nào đó, component của bạn sẽ bị rơi vào trạng thái dài vài trăm dòng và làm cho việc refactor, debug sau nay trở nên rất khó hoặc trở nên rất ngại vì nhiều code quá. Thay vì thế ta có thể thêm một rules vào `.eslintrc` như sau:
```js
"rules": {
    ...
    "max-lines": ["error", 150],
  }
```
Rule trên sẽ trả về error bất cứ khi nào component của bạn vượt quá số dòng mà bạn quy định, ở đây là 150 dòng và nhờ thế bạn có một con số chính xác hơn về việc bạn có nên hoặc có cần tách nhỏ component mình đang code ra không.

### d. Tách biệt logic và UI

Đúng như cái tên thì với việc ra đời của Hook thì chúng ta có thể dễ dàng tách nhỏ code liên quan đến UI của chúng ta và code liên quan đến logic. Gỉa sử chúng ta có một ứng dụng nhỏ bao gồm các chức năng:
- Hiển thị danh sách người todo list
- Xóa task trong todo list
- Thêm mới một task
- Cập nhật một task

THì chúng ta có thể tách riêng phần UI và phần logic với cấu trúc thư mục như sau:
```js
--todoApp/
    --index.js // Chứa phần UI bao gồm danh sách và các button liên quan đến thêm, sửa, xóa
    --style.css // Phần CSS của UI
    --useAddTaskHook.js // Toàn bộ phần logic của việc tạo mới task
    --useUpdateTaskHook.js // Toàn bộ phần logic của việc cập nhật task
    --useDeleteTaskHook.js // Toàn bộ logic của phần xóa task
```
Bằng việc chia nhỏ như trên, logic của bạn sẽ được chia thành các module riêng rẽ nhau và chúng sẽ được import và sử dụng trong file `index.js`. Tất cả những gì nó trả về sẽ chỉ là các function cần thiết để chúng ta gắn vào và sử dụng trên UI, về sau khi bạn muốn cập nhật code ở phần nào thì chỉ cần chỉnh sửa file đó mà thôi. Cách chia trên mình lấy cảm hứng từ `AngularJS` vì mình thấy nó cũng chia các component thành 3 file là:
- file `.html` cho phần UI
- file `.ts` cho phần logic
- và `.css` cho phần css

## 3. Kết bài
<hr>

Bài viết của mình đến đây là kế thúc, cảm ơn các bạn đã đón đọc và như thường lệ các bạn đừng quên để lại 1up vote nhé.