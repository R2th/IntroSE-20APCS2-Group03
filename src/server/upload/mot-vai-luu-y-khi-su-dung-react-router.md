**React-router** là thành phần quan trọng bậc nhất trong hệ sinh thái **React**, vì hầu như ứng dụng **React-Single-Page** nào cũng đều cần điều hướng (**routing**) và tương tác với **Browser history** cả. **React-router** thật sự mạnh mẽ và là lựa chọn tốt nhất cho nhiệm vụ này. **React-router** cũng hoàn toàn dễ để sử dụng và nắm bắt, bạn sẽ chẳng tốn nhiều công sức để áp dụng ngay vào ứng dụng của mình. Bài viết này xin được chia sẻ một vài lưu ý nhỏ khi sử dụng và làm việc với **React-router**, hi vọng sẽ hữu ích.  
## **React-router** và **React-router-dom**  
Kể từ phiên bản V4, bạn sẽ được hướng dẫn **import** các **API** từ **module** __**react-router-dom**__ phục vụ cho việc điều hướng trong ứng dụng của mình, tuy nhiên đây chỉ là một bước nâng cấp của **react-router** chứ không hề có sự xuất hiện của một cái tên mới. **react-router** trở thành nơi cung cấp toàn bộ các **API** nền tảng cho các giải pháp về **routing**, từ đó phát triển các **sub-module** phục vụ cho các chức năng cụ thể. **react-router-dom** dựa trên nền tảng **react-router** cung cấp các **API** làm việc với **Browser**, hay **react-router-native** cung cấp giải pháp cho ứng dụng **react-native**, vì vậy có thể hiểu là ta vẫn sẽ sử dụng **react-router** như bình thường nhé!.  
## Hiểu rõ hơn về các "Props" trong Router

### Exact
Cùng xem qua **sample** sau đã nhé:
```js
import { Switch, Route } from 'react-router-dom'

...

const RouteComponent = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
        </Switch>
    </div>
)
```
Ở trên đưa ra một vài cách sử dụng thông thường với **Router**, ta khai báo **component** mà **RouteComponent** sẽ **render** với đường dẫn **path** tương ứng. Thuộc tính **exact** sẽ quy định **path** có cần tuyệt đối hay không, nghĩa là nếu không thêm thuộc tính **exact** vào **Route** thứ nhất, **RouteComponent** sẽ luôn **render** ra **component** **Home** với bất kể đường dẫn nào vì chỉ cần path="/*". Tuy nhiên với các **component** sẽ còn chia ra các **sub-router** bên trong, thuộc tính **exact** nếu thêm vào sẽ gây ra lỗi, giả sử trong **component** con tiếp tục chia ra các **sub-route** như __"/about/detail"__, __"/about/content"__,... vì vậy sẽ không thể thêm thuộc tính **exact** vào trong **Route** tương ứng.  

### render và component 
Giả sử cần truyền thêm **props** vào các **component** **Home** và **About**, chúng ta có một vài giải pháp khác vì các khai báo trên sẽ không thực hiện được, ví dụ:
```js
    <Route
        exact
        path="/"
        component={Home}
        customProps={5}
    />
```
Nhìn có vẻ hợp lý nhưng cách này sẽ không chính xác, **react-router** sẽ không truyền **customProps** vào bên trong **Home** mà chỉ đơn giản là lờ nó đi mà thôi.  

Chúng ta cần sử dụng "**inline-function**"
```js
    <Route
        exact
        path="/"
        component={() => <Home customProps={5} />}
    />
```
Mọi thứ sẽ hoạt động bình thường, nhưng ở trên vẫn chưa phải phương tối ưu, bởi vì khi chúng ta sử dụng **inline function** bên trong thuộc tính **component**, **<Route />** sẽ sử dụng **React.createClass** tạo ra một **Element** mới từ **component** **Home** mỗi khi **render**, hiểu đơn giản là **Home** sẽ **unmount** và được khởi tạo lại nhiều lần không cần thiết trong quá trình sử dụng thay vì chỉ cần **update** những thay đổi cần thiết.  

Giải pháp nên dùng là sử dụng thuộc tính **render** thay cho thuộc tính **component** bên trong **<Route />**
```js
    <Route
        exact
        path="/"
        render={() => <Home customProps={5} />}
    />
```
sử dụng **render** sẽ tránh việc component **Home** bị **unmount** và **re-mount** khi không cần thiết bởi giá trị của **render** nhận sẽ là một **functional component**.  
Ngoài ra mỗi **React Component** được **render** qua **Route** sẽ nhận được 3 props giúp tương tác với **Browser History** cũng như truyền dẫn dữ liệu một cách linh hoạt và mạnh mẽ.
* **match**
* **location**
* **history**  

### Query-string và query-parameters  
Với phiên bản v4, **react-router** không còn hỗ trợ đầy đủ **query-string** như những phiên bản trước nữa, đa số trường hợp bạn nên sử dụng **query-parameters**, giả sử ta có một **router**:
```js
  <Route path="/detail/:id" component={Detail} />
  // ==> props.match.params.id
```
Nếu bạn cố gắng truyền **query-string** trong quá trình điều hướng, giả sử
```js
  props.history.push('/detail/?id=14')
  // ==> props.location.search = '?id=14'
```
như vậy ta sẽ cần một bước chuyển đổi để nhận được dữ liệu mong muốn, phương pháp này không thật sự tối ưu. Lưu ý là ta cũng có thể truyền thêm **state** khi điều hướng như sau:
```js
  history.push({
    pathname: '/detail',
    state: { id: 14 },
  })
  // ===> props.location.state.id = 14
```
## Prompt  
Sử dụng **API Prompt** giúp chúng ta ngăn chặn việc điều hướng trực tiếp, giả sử một tác vụ đang được thực hiện, **user** muốn điều hướng sang màn hình khác hay thoát khỏi ứng dụng sẽ cần thông qua thêm một bước xác nhận, **Promp** được **render** như một element bên trong **React Component**.
```js
import { Prompt } from 'react-router'

<Prompt
  when={userIsDoingSomething}
  message="Are you sure you want to leave?"
/>
```
* **when**: Điều kiện sử dụng **Promp**, giá trị mặc định luôn là **True**
* **message**: Tuỳ chỉnh thông báo tới người dùng 

Trên đây là một vài chia sẻ qua kinh nghiệm làm việc với **React** và **React-router** của mình, hi vọng sẽ giúp ích cho các bạn trong quá trình tìm hiểu và làm việc.