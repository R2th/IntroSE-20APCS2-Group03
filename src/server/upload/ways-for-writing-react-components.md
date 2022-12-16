*Có rất nhiều cách tiếp cận để viết một React Component. Bài viết này trình bày một practice khá ổn để viết Component.*

**Class Based Components**

Class based components là các components stateful hoặc chứa các methods.
*Importing Css*
```
import './styles/ProfileContainer.css'
```
Sử dụng inport css là một cách tốt để dễ dàng quản lý component style.

*Initializing State*
```
export default class ProfileContainer extends Component {
  state = { expanded: false }
 }
```
Thay vì cách viết như trên, cũng có thể khởi tạo state trong constructor. Nhưng cách viết trên đẹp và dễ hiểu hơn.
Đừng quên export class làm mặc định.

*propTypes và defaultProps*
```
static propTypes = {
   model: object.isRequired,
   title: string
}
 
static defaultProps = {
   model: {
     id: 0
   },
   title: 'Your Name'
}
```
propTypes và defaultProps là các thuộc tính tĩnh, chúng đúng vai trò như tài liệu của developer.
Mỗi component điều nên có propTypes.

*Methods*
```
handleSubmit = (e) => {
    e.preventDefault()
    this.props.model.save()
  }
  
  handleNameChange = (e) => {
    this.props.model.changeName(e.target.value)
  }
  
  handleExpand = (e) => {
    e.preventDefault()
    this.setState({ expanded: !this.state.expanded })
  }
```
Sử dụng arrow function của ES6 để có cơ chế tự động bind thí vào methods, làm code trở nên dễ đọc và gọn gàng hơn.

*Passing setState a Function*
```
this.setState(prevState => ({ expanded: !prevState.expanded }))
```
Việc thay đổi trực tiếp state trong setState đôi khi gây ra tình trạng không đồng bộ. React thay đổi state hàng loạt để nâng cao hiệu suất, vì vậy state state có thể không thay đổi ngay lập tức sau khi setState được gọi.
Cách để khắc phục điều này là truyền một hàm cho setState, với trạng thái trước đó làm đối số.

*Destructuring Props*
```
render() {
    const {
      model,
      title
    } = this.props
    return (....)
}
```

**Functional Components**

Là các components không có state và methods.

*propTypes*
```
ExpandableForm.propTypes = {
  onSubmit: func.isRequired,
  expanded: bool
}
```
Ở đây, chúng ta gán propTypes trước khi khai báo thành phần, vì vậy chúng có thể được nhìn thấy ngay lập tức. 

*Destructuring Props and defaultProps*
Component này là một hàm, lấy props của nó làm đối số của nó. Chúng ta có thể mở rộng chúng như vậy:
```
function ExpandableForm({ onExpand, expanded = false, children, onSubmit }) {
  const formStyle = expanded ? {height: 'auto'} : {height: 0}
  return (
    <form style={formStyle} onSubmit={onSubmit}>
      {children}
      <button onClick={onExpand}>Expand</button>
    </form>
  )
}
```

*Wrapping*
```
export default observer(ExpandableForm)
```