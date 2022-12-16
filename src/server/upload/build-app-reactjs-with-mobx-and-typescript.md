Nếu đã từng làm việc hoặc tìm hiểu qua về React chắc các bạn cùng không còn lạ gì về khái niệm "state manager" rồi đúng không. Hiện nay đã có một số thư viện phục vụ cho việc quản lý trạng thái rất tốt cho ứng dụng, có thể kể đến ông lớn như Redux. Đối với những bạn mới làm quen với React thì "state manager" giống như việc quản lý toàn bộ dữ liệu của một ứng dụng  hay còn gọi là một kho chứa những dữ liệu tĩnh hoặc nhưng dữ liệu được call đến api và trả về cho ứng dụng của bạn. Nó phục vụ cho các function xử lý hoặc render ra màn hình người dùng. Các thư viện như redux đã được sinh ra giúp việc quản lý dữ liệu trở lên dễ dàng hơn và hạn chế được những phức tạp trong việc quản lý và phát triển ứng dụng của chúng ra. Nhưng trong bài viết này sẽ không phải là Redux nữa mà sẽ là Mobx. Vậy Mobx là gì?  Xây dựng một dự án React với Mobx như thế nào? Mời các bạn cùng tìm hiểu với mình bên dưới đây nhé.

**1. Mobx là gì?**

- Bên trên mình có nhắc đến Redux và khái niệm "State manager" vậy chắc hẳn bạn đã đoán ra được Mobx là gì rồi đúng không. Mobx là một giải pháp phục vụ việc "state manager" cho ứng dụng React của bạn. 
- Mobx ích hỗ trợ rất tốt trong việc scale ứng dụng và nó hoàn toàn độc lập với React.
- Không chỉ với React, Mobx càng hỗ trợ các framework khác trong việc quản lý trạng thái ứng dụng như AgularJS, VueJS,..

**2. Concepts của Mobx?**

![](https://images.viblo.asia/7f540fc8-9306-4423-94b2-69346d2d8121.png)

**Store**

Khônh giống như Redux là only store  và chứa nhiều `reducer`, Mobx có thể tạo ra multiple store  tuỳ vào bussiness model trong ứng dụng của bạn. Ví dụ bạn có một app xem film và app của bạn chứa các dữ liệu như user, film, history, comment thì bạn có thể tạo ra các store như UserStore, HistoryStore, FilmStore và CommentStore. Tuy nhiên khi ứng dụng của bạn scale quản lý các store không tốt thì dữ liệu trong ứng dụng của bạn ngày càng trở lên phức tạp và thậm trí có thể gây ảnh hưởng xấu đến Component như việc Re-render chẳng hạn. Vậy nên hãy tham khảo cách tổ chức các store phù hợp với app của bạn tại [Link](https://mobx.js.org/best/store.html) này nhé.

**Observable**

Mobx có ý tưởng là cho phép bạn sử dụng observable để ứng dụng có thể quan sát được sự thay đổi của các state trong store của bạn. Bằng cách đặt @observable trước các thuộc tính của bạn trong object, mỗi khi thuộc tính có sự thay đổi nó sẽ thông báo cho component đang quan sát nó để render lại. Với cách này bạn chỉ cần quan sát những thuộc tính nào thực sự cần render lại trong component.  Ví dụ:
```
import { observable } from "mobx"

class User {
  id = Math.random()
  @observable name = "Nguyễn Văn A"
  @observable age = 20
}
```

hoặc

```
import { decorate, observable } from "mobx"

class UserStore {
  id = Math.random()
  name = "Nguyễn Văn A"
  age = 20
}
decorate(UserStore, {
  name: observable,
  age: observable,
})
```

**Computed**

Hãy tưởng tượng computed trong mobx là một công cụ tính toán tự động cho phép bạn tính toán lại các giá trị được quan sát mỗi khi chúng có sự thay đổi. Ví dụ mình muốn lấy lại fullname của user mỗi khi first name hoặc last name thay đổi. Hãy đặt @computed trước các thuộc tính mà bạn muốn được tính toán tự động mỗi khi giá trị @observable thay đổi. Ví dụ:

```
class UserStore {
  @observable firstName = "Sun"
  @observable lastname = "Asterisk"

  @computed get fullname() {
    return `${this.firstName} ${this.lastname}`
  }
}
```

**Action**

Mỗi ứng dụng đều có các action, nó cho phép bạn thay đổi các thái trong ứng dụng của mình. Trong mobx, action cho phép thay đổi những thuộc tính được quan sát với @observable. Nếu bạn muốn update lại fullname trong UserStore, bạn chỉ cần định nghĩa function đó mà gắn @action trước nó để thực hiện việc update lại fullname.  Ví dụ:

```
class UserStore {
  @observable fullname = "Sun Asterisk"

  @action.bound
  changeFullName(fullname) {
    this.fullname = fullname
  }
}
```

Ngoài ra bạn có thể define action của mình theo nhiều cách khác nhau bằng cách sử dụng:
```
action(fn)
action(name, fn)
@action classMethod() {}
@action(name) classMethod () {}
@action boundClassMethod = (args) => { body }
@action(name) boundClassMethod = (args) => { body }
@action.bound classMethod() {}
```

**Observer**

Observer là thành phần trong Mobx giúp lắng nghe các `observable` mỗi khi chúng có sự thay đổi. Nhiệm vụ của `observer` là subscribes các đối tượng cần quan sát với các `component`, mỗi khi các `observable` có sự thay đổi nó sẽ thông bảo để `component` được render lại. Nó cũng sẽ đảm bảo rằng `component` sẽ không re-render nếu các `observable` mà chúng sử dụng không có sự thay đổi nào.

```
import { observer } from "mobx-react"

class UserStore {
  @observable fullname = "Sun Asterisk"

  @action.bound
  changeFullName(fullname) {
    this.fullname = fullname
  }
}

const userStore = new UserStore()

setTimeout(() => {
  userStore.changeFullName("Sun Asterisk Vietnam")
}, 1000)

// Alternatively, a class based component:
@observer
class Profile extends React.Component {
  render() {
    return <span>Fullname: {this.props.userStore.fullname} </span>
  }
}

ReactDOM.render(<Profile userStore={userStore} />, document.body)
```

Lưu ý: observer chỉ có thể subscribes các đối tượng observable mà component đang sử dụng chúng. Nếu truyền các đối tượng observable vào component con thì các component con này cũng cần phải đăng kí với observer để theo dõi sự thay đổi của các đối tương observable đã được truyền vào. Hơn nữa observer chỉ tracking những observable mà component đăng kí với nó đang sử dụng, nếu có một observable khác được thay đổi trong store mà component này không dùng đến thì nó cũng sẽ không thực hiện việc re-render component.

**3. Xây dựng project React với Mobx và Typescript**

Trong phần này mình sẽ hướng dẫn các bạn xây dựng project React với Mobx và Typescript từ đầu. Nếu bạn nào mà chưa biết về Typescript có thể tham khảo ở [Link](https://www.typescriptlang.org/) này nhé. Mình sẽ không nói thêm trong phần này nữa. Mình sẽ tạo một app demo nhỏ để hiển thị và update tên nhé.

Ngoài ra trong phần này mình sẽ hướng dẫn các step cơ bản để build nhanh một project Mobx với Typescript. Nếu bạn nào muốn xây dựng project structure thì có thể tham khảo qua [atomic-design](https://github.com/danilowoz/react-atomic-design) hoặc [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) để thực hành nhé.

React cũng đã hỗ trợ chúng ta trong việc xây dựng dự án react với typescript rồi nhé. Bạn chỉ việc chạy câu lệnh sau là có thể tạo nhanh được một project react với typescript:

```npx create-react-app my-app --template typescript```

hoặc bạn có thể yarn:

`yarn create react-app my-app --template typescript`

Tiếp theo, chúng ta sẽ cài đặt các pakage liên quan đến Mobx là `mobx` và `mobx-react`. Navigate vào project của bạn và chạy cậu lệnh dưới đây

`npm install mobx mobx-react --save`

Trong folder src của project, mình sẽ tạo ra thư mục `stores` và các file như sau:

![](https://images.viblo.asia/c0b626c0-35ac-4a86-9eb9-e46178ed2fa9.png)

Đầu tiên là index.ts, nó có nhiệm vụ là export toàn store ra cho các file khác có thể đọc được:

```
export * from './RootStore'
export { default as UserStore } from './UserStore'
```

Tiếp đến là RootStore.ts, nó sẽ là nơi khởi tạo tất cả các store trong ứng dụng của bạn để các component có thể truy cập được. Trong hàm constructor, mỗi khi khởi tạo store mình đều truyền RootStore vào vì mục đích là để các store khác có thể truy cập đến nhau thông qua RootStore mà không  gây ra sự phụ thuộc trong quá trình khởi tạo các store. Mình ví dụ, có 2 store A và store B, store A muốn truy cập trực tiếp để store B để làm một số nhiệm vụ nào đó thì có thể gọi store B từ RootStore mà không phải truyền vào store B mỗi khi khởi tạo store A. 

```
import UserStore from './UserStore'

declare const window: any;

export class RootStore {
  userStore: UserStore

  constructor(){
    this.userStore = new UserStore(this)
  }
}

const rootStore = new RootStore()

window.__store = rootStore

export const stores = {
  userStore: rootStore.userStore
};
```
Tiếp đến là UserStore, trong store này mình đã khai báo một số thuộc tính là các state và action mà component sẽ sử dụng đến

```
import { action, observable, computed} from 'mobx'
import { RootStore } from './RootStore'

class UserStore {
  id: number = Math.random();
  @observable fullname: string = 'Sun Asterisk';
  @observable age = 9

  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @computed get info(): string {
    return `Name: ${this.fullname} and Age: ${this.age}`;
  }

  @action.bound
  changeName(fullname: string) : void {
    this.fullname = fullname
  }
}

export default UserStore
```

Cuối cùng là App.tsx, đây là nơi mà store được component truy cập tới. Trong component này mình sẽ sử dụng @inject để truy cập tới các store cần sử dụng đến. Lưu ý rằng bạn phải luôn luôn define @observer trước component để theo dõi sự thay đổi của state nhé. Tại component này, mình sẽ truy cập đến UserStote để lấy thuộc tính `fullname` và action `changeName` để mỗi khi người dùng nhập tên mới và click vào button` Change Name` thì `fullname` sẽ được update lên trên màn hình.

```
import React from 'react';
import './App.css';
import { observer, inject } from 'mobx-react'
import { UserStore } from './stores';

type IProps = {
  userStore?: UserStore
}

type IState = {
  name: string
}

@inject('userStore')
@observer
class App extends React.Component<IProps, IState> {

  constructor(props: IProps){
    super(props)
    this.state = {
      name: ''
    }
  }

  changeName = () => {
    const userStore = this.props.userStore
    if(userStore) {
      userStore.changeName(this.state.name)
    }
  }

  onChangeText = (e: any) => {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    const userStore = this.props.userStore
    return(
      <div className="App">
        <p>this is {userStore?.fullname}</p>
        <input
          placeholder="enter name"
          type="text"
          value={this.state.name}
          onChange={this.onChangeText}
        />
        <button onClick={this.changeName}>Change Name</button>
      </div>
    )  
  }
}

export default App;
```

Ngoài ra, để component có thể truy cập được đến các store thì trong file index.tsx bạn cần sử dụng đến Provider của package mobx-react nhé.

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import { stores } from '../src/stores'

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

**Tổng kết**

Cho dù là Redux hay Mobx thì đều có những ưu nhược điểm khác nhau. Bạn hãy phân tích xem lựa chọn giải pháp quản lý state nào hợp lý cho dự án của mình nhé. Cảm ơn các bạn đã đọc bài viết của mình.