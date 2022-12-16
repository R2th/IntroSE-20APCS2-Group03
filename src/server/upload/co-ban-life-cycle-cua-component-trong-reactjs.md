Xin chào mọi người!

Hôm nay mình sẽ giới thiệu cơ bản về **lifecyle** của component trong reactjs, gồm các giai đoạn nào và mỗi giai đoạn sẽ gọi những hàm gì?

 Hy vọng sẽ được thảo luận cùng anh em.

**Life cycle là gì?** Là vòng đời của một sự vật từ khi sinh ra, lớn lên đến khi mất đi.

**Lưu ý: Life cyles trong bài này cho class component, việc hiểu rõ life cycle rất quan trọng để hiểu rõ cách hoạt động component của reactjs.**

### 1. Định nghĩa:

Life cycle của component trong reactjs là quá trình từ khi tạo ra, thay đổi và hủy bỏ component. 

Gồm 3 giai đoạn:

**Tạo ra (Mounting)**

**Thay đổi (Updating)**

**Hủy bỏ (UnMounting)**

![image.png](https://images.viblo.asia/2b676d3a-bba6-48da-9420-76dab87be05f.png)

Nhìn vào diagram ở trên ta sẽ biết được khi Component

-  **Mounting**(tạo ra) sẽ gọi những hàm nào: 
(constructor, render, DidMount). 

- **Updating**(thay đổi) sẽ gọi những hàm nào(render, DidUpdate). 

- **Unmounting**(hủy bỏ) sẽ gọi hàm WillUnmount.

Tiếp theo mình sẽ giới thiệu 1 số hàm thường xài: Constructor, render, DidMount, WillUnmount, DidUpdate

### 2. Constructor

Khi component **mouting**(tạo ra) sẽ đi qua hàm Constructor

Trong constructor sẽ khai báo các state, các properties(thuộc tính) của component.

**Lưu ý:** super(props) để gọi hàm khởi tạo của component cha React.Component mà Component con kế thừa.

![image.png](https://images.viblo.asia/328bb9c8-4bf1-4b07-8eff-4c8eecccc65e.png)

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
}
```
### 3. DidMount()

- Khi component được **Mounting**(tạo ra) sau khi đi qua hàm Constructor và render lần đầu thì sẽ gọi hàm **DidMount**().
- Thường được dùng để gọi api để lấy dữ liệu, setState để cập nhật state

Như ví dụ ở dưới: gọi api để get nội dung comment và sau đó setState để rerender lại 1 lần nữa. (lúc này đã có nội dung comment lấy từ api)

**Lưu ý** hàm DidMount() chỉ chạy 1 lần duy nhất khi component được tạo ra.

```js
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

fetchComments().then(response => {
  this.setState({
    comments: response.comments
  });
});

  }
```
### 4. WillUnMount()

![image.png](https://images.viblo.asia/f8cd5ad4-1955-4719-9ce2-97018b15b9b7.png)

Khi component **unmounting** (hủy bỏ) ta sẽ gọi hàm **WillUnMount**().
Khi ta không render component hoặc chuyển trang thì component sẽ bị hủy bỏ để render nội dung mới lên.
Dùng để hủy timeout, clearInterval. (nếu không hủy bỏ thì sẽ bị chạy hoài liên tục), reset dữ liệu nếu cần thiết.

**Lưu ý**: hàm WillUnMount() chỉ chạy 1 lần duy nhất khi component trong vòng đời của component. Tương tự Mount() chỉ chạy 1 lần duy nhất. Còn DidUpdate() có thể gọi nhiều lần nếu có nhiều update

```js
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```
### 4. DidUpdate()

- Được dùng khi component Updating (thay đổi ) sẽ gọi hàm **DidUpdate**()
- DidUpdate() có thể không được gọi hoặc gọi nhiều lần nếu có update component.(khi có props thay đổi, state thay đổi hoặc bắt buộc update (forceUpdate)
- Khi render sẽ trigger gọi hàm DidUpdate()

**Lưu ý:** Cẩn thận khi xài DidUpdate() cần quản lý chặt chẽ các thay đổi của props, state. Nếu không cẩn thận thì có khả năng bị render nhiều lần gây chậm chương trình. Thậm chí có trường hợp lặp vô tận do thay đổi state bên trong hàm DidUpdate()

![image.png](https://images.viblo.asia/02854c80-2425-437d-82cd-74df77cbb5a6.png)

**Tham khảo :**

https://www.tutorialspoint.com/reactjs/reactjs_component_life_cycle.htm https://reactjs.org/docs/state-and-lifecycle.html