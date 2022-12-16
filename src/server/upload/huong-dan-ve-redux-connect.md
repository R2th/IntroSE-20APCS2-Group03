Bài viết được dịch từ bài [React Redux Connect Tutorial — When and How to Use It](https://blog.logrocket.com/react-redux-connect-when-and-how-to-use-it-f2a1edab2013) của tác giả [Glad Chinda](https://blog.logrocket.com/@ohansemmanuel).

-----
![](https://images.viblo.asia/461051d6-a448-4077-a190-2fbc8d04ee54.jpeg)

React cung cấp hai cơ chế chính để cung cấp dữ liệu cho các thành phần là:  props và state. Trong khi các props chỉ đọc và cho phép một parent component chuyển các attributes cho một child component, state là trạng thái local và được gói gọn trong component đó và có thể thay đổi bất cứ lúc nào trong component lifecycle.

Vì statelà một cơ chế rất mạnh để xây dựng các ứng dụng React mạnh mẽ và năng động, nên state đó cần thiết phải được quản lý đúng cách trong ứng dụng. Một số thư viện đã tồn tại, cung cấp kiến trúc có cấu trúc tốt để quản lý state ứng dụng như [Flux](https://facebook.github.io/flux/), [Redux](https://redux.js.org/), [MobX](https://mobx.js.org/).

Redux là một state container có thể dự đoán được cho các ứng dụng JavaScript. Nó có một điểm nhấn rất nhỏ và cho phép bạn viết các ứng dụng một cách nhất quán có thể chạy trong mọi môi trường:
![](https://images.viblo.asia/b3e087b4-c55b-435b-a435-64898eba49e4.png)

*(Đây là cấu trúc một Redux Store đơn giản)*
> Hướng dẫn này dựa trên cách quản lý state trong các ứng dụng React với Redux bằng cách sử dụng React-redux chứ không phải là giới thiệu về React hoặc Redux.

> Đương nhiên rằng bạn đã phải có hiểu biết cơ bản về React và kiến trúc và API Redux. Nếu không, thì bạn có thể kiểm tra tài liệu React [tại đây](https://reactjs.org/docs/getting-started.html) và tài liệu Redux [tại đây](https://redux.js.org/).

## Giới thiệu React Redux Connect
react-redux package cung cấp các ràng buộc React chostate container Redux giúp ứng dụng React được **kết nối** với Redux Store rất dễ dàng. Điều này cho phép bạn tách các component ứng dụng React của mình dựa trên kết nối của chúng với Redux Store như sau:

* *Các **Presentational Components** - Các thành phần này chỉ liên quan đến cách mọi thứ được trình diện và không nhận được Redux state. Chúng lấy data từ các props và có thể kích hoạt các sự kiện callback được chuyển cho chúng thông qua các props.*

* *Các **Container Components** - Các thành phần này chịu trách nhiệm về cách mọi thứ hoạt động và nhận đầy đủ về Redux state. Chúng thường được tạo bằng React Redux và có thể dispatch Redux actions. Chúng cũng thay đổi trong trạng thái Redux.*

Bạn có thể tìm hiểu thêm về [separation of concerns từ bài viết này](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). Trong hướng dẫn này, trọng tâm chính của chúng ta sẽ là các thành phần container được connect với Redux state bằng react-redux.

The react-redux package hiển thị một giao diện rất đơn giản và tất cả những gì bạn nên quan tâm chỉ là như sau:

* `<Provider store> `— Bao hàm  toàn bộ React application and tạo Redux state sẵn để sử dụng trong tất cả hệ thống container components có phân chia cấp bậc 
* connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options]) — Creates a higher-order component for making container components out of base React components
* Tạo component bậc cao hơn (các component container) khỏi các component React cơ sở

Bạn có thể install react-redux trong dự án của bạn như sau:
```nodejs
npm install react-redux --save
```
Hãy chắc rằng bạn đã có thiết lập Redux store  cho ứng dụng React của mình, đây là cách bạn có thể `connect`ứng dụng với Redux store:

https://gist.github.com/gladchinda/f1fe4fcdbfe660fe1b29f205f9b6b3ec

Với thiết lập này, giờ đây bạn có thể tạo các container components, được kết nối với Redux store, trong cấu trúc phân cấp của AppRootComponent bằng API `connect()`.
##  Chú ý khi dùng `connect()`
### 1. Tạo container components.
Như đã nêu trong phần trước, react-redux connect() API được sử dụng để tạo các container element được kết nối với Redux store. Redux store được kết nối đến có nguồn gốc Store trên cùng của component sử dụng  `React context mechanism`. Nó không có nhu cầu connect ()  store nếu bạn chỉ tạo một component trình bày(nghĩa là một component không có gọi API).

Cho dù bạn muốn lấy dữ liệu từ Redux store hay bạn muốn dispatch action trên Redux store hoặc bạn muốn thực hiện cả hai trong component React của mình, bạn có thể biến component này thành một component container bằng cách gói nó theo thứ tự cao hơn component được trả về bởi React-redux connect ():

https://gist.github.com/gladchinda/ad1a4bc803ec1c2caa6c9fe38db1c6ca

### 2.  Tránh `đăng ký` thủ công component với Redux store.
Bạn có thể tự tạo một container component và đăng ký thủ công thành phần vào Redux store bằng store.subscribe (). Tuy nhiên, việc sử dụng React-redux connect () đi kèm với một số cải tiến và tối ưu hóa hiệu suất mà bạn có thể không thực hiện được trong ứng dụng của mình.

Trong đoạn mã sau, chúng ta cố gắng tự tạo một container component và connect với Redux store bằng cách đăng ký vào store, để đạt được chức năng tương tự như với đoạn mã trước đó:

https://gist.github.com/gladchinda/3b952257338163f50ae65db51e1b213c

react-redux connect() cũng cung cấp thêm tính linh hoạt, cho phép bạn định cấu hình các container component để nhận các dynamic props dựa trên các props ban đầu được truyền cho chúng. Điều này hữu ích để chọn một state được tách ra dựa trên props hoặc để liên kết action creator với một biến cụ thể từ props.

Nếu ứng dụng React của bạn sử dụng nhiều Redux store, React-redux connect () cho phép bạn dễ dàng chỉ định store nào nên kết nối container component .
## Tìm hiểu connect()
Hàm connect () được cung cấp bởi React-redux có thể nhận tới bốn đối số, tất cả đều là tùy chọn. Gọi hàm connect () trả về một component bậc cao hơn có thể được sử dụng để bọc bất kỳ React component nào.

Do một thành phần bậc cao hơn được trả về bởi connect (), nên nó phải được gọi lại với React component cơ sở để chuyển đổi nó thành container:
```
const ContainerComponent = connect()(BaseComponent);
```
đây là 4 tham số tùy chọn 
```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
``` 
### mapStateToProps(state, [ownProps]) => stateProps
Cái này để lấy state map vào dùng làm props cho component

https://gist.github.com/gladchinda/fde415b8d5e5715b294c75c4d3b42d2e

đối tượng trả về sẽ **hợp nhất** với props của component:

https://gist.github.com/gladchinda/6fef62c95a95c2b8e20469349c85377c#file-using-state-props-jsx

Tuy nhiên, nếu một khi hàm được trả về, hàm đó sẽ được sử dụng làm mapStateToProps cho từng instance của component. Điều này có thể hữu ích để cải thiện hiệu suất kết xuất và ghi nhớ.

### mapDispatchToProps(dispatch, [ownProps]) => dispatchProps
cái này là một object hoặc một function bất kỳ:

{@embed: https://gist.github.com/gladchinda/d0dd7bc63d440dd34b9095a8321a252e#file-sample-action-creators-js}

**1. Default Implementation**

Nếu bạn không cung cấp hàm hoặc đối tượng mapDispatchToProps của riêng bạn, thì việc triển khai mặc định sẽ được sử dụng:

{@embed: https://gist.github.com/gladchinda/cf54e38e210277f07456c6b183957e4d#file-default-dispatch-to-props-jsx}

**2. Truyền object**

Nếu một đối tượng được truyền cho đối số này, mỗi hàm trong đối tượng sẽ được coi là một action creator và sẽ được gói vào một lệnh gọi đến phương thức lưu trữ props để có thể được gọi trực tiếp. Kết quả đối tượng dispatchProps của action creator sẽ được hợp nhất vào các props của component.

{@embed: https://gist.github.com/gladchinda/1292ba705454128825f33c309bb75685#file-object-dispatch-to-props-jsx}

**3.  Truyền function**
Nếu một function được truyền qua, bạn sẽ trả lại một đối tượng của dispatchProps liên kết action creator bằng cách sử dụng `store’s dispatch method`. Hàm này lấy store’s dispatch method làm tham số đầu tiên của nó. Như với mapStateToProps, nó cũng có thể lấy tham số thứ hai ownProps tùy chọn ánh xạ tới các props ban đầu được truyền cho component.

Nếu hàm này lại trả về trả về một hàm khác nữa, thì hàm trả về được sử dụng như mapDispatchToProps thay vào đó, có thể hữu ích để cải thiện hiệu suất kết xuất và ghi nhớ.

Trình trợ giúp bindActionCreators () do Redux cung cấp có thể được sử dụng trong hàm này để liên kết các action creator với store’s dispatch method.

Đoạn mã sau đây cho thấy cách bạn có thể xác định mapDispatchToProps bằng cách cung cấp một hàm và cách trình trợ giúp bindActionCreators () có thể được sử dụng để liên kết các action creator comment với một component prop:

{@embed: https://gist.github.com/gladchinda/96046bfde7e03d9c840ba4ff48b077a6#file-function-dispatch-to-props-jsx}

### mergeProps(stateProps, dispatchProps, ownProps) => props
nếu truyền đối số này là một function  lây 3 tham số, cụ thể là:
- stateProps —đối tượng prop được trả về từ một lệnh gọi tới mapStateToProps()
- dispatchProps — đối tượng action creators props  từ mapDispatchToProps()
- ownProps —  original props nhận được bởi component.

Hàm này trả về một đối tượng đơn giản của các prop sẽ được truyền cho component được bọc. Điều này rất hữu ích cho việc ánh xạ có điều kiện một phần của trạng thái Redux Store hoặc action creator dựa trên prop.

Khi chức năng này không được cung cấp, việc thực hiện mặc định như sau:

{@embed: https://gist.github.com/gladchinda/9fe07415303d1b3b56cf9747c43d2705#file-default-merge-props-js}

**options**

Đối tượng tùy chọn, nếu được chỉ định, chứa các tùy chọn để sửa đổi hành vi của connect(). connect() là một triển khai đặc biệt của connectAdvanced(), nó chấp nhận hầu hết các tùy chọn có sẵn để kết nối connectAdvanced() với một số tùy chọn bổ sung.
## Làm thế nào để dùng connect()
### Thiết lập store
Trước khi chuyển đổi React component thông thường thành container component dùng connect(), bạn phải chỉ định Redux store cái component sẽ được connect.

Giả sử rằng bạn có một container component có tên là NewComment để thêm nhận xét mới vào bàiost và cũng hiển thị button để gửi nhận xét. The component có thể trông giống như sau:

{@embed: https://gist.github.com/gladchinda/66c11f0d645910cdd84f4238a035a724#file-sample-new-comment-jsx}

Để bạn thực sự sử dụng component này trong ứng dụng của mình, bạn sẽ phải chỉ định Redux store  mà component phải được kết nối, nếu không, bạn sẽ gặp lỗi.

Điều này có thể được thực hiện theo hai cách:

**1. Đặt `store prop` trên `container component`**
The first way is to specify the Redux store on the component by passing a reference to the Redux store as the value of the store prop of the component
Cách đầu tiên là chỉ định lRedux store  trên component bằng cách chuyển tham chiếu đến Redux store  làm giá trị của store prop của component:

{@embed: https://gist.github.com/gladchinda/8a977eda558add9074ce6d70878d27b0#file-component-store-prop-jsx}

**2. Đặt `store prop` trên `<Provider>` component**
Nếu bạn muốn đặt  Redux store một lần cho ứng dụng của mình, thì đây là cách nên làm. Đây thường là trường hợp cho các ứng dụng chỉ sử dụng một  Redux store.

React-redux cung cấp một component `<Provider>`có thể được sử dụng để bọc component ứng dụng gốc. Nó chấp nhận một Store prop dự kiến tham chiếu đến Redux store mà bạn muốn sử dụng cho ứng dụng của mình. store được chuyển xuống các component chứa trong hệ thống phân cấp ứng dụng bằng cách sử dụng `React’s context mechanism`:

{@embed: https://gist.github.com/gladchinda/b576eaa9f351cbc769db89d091017191#file-provider-store-prop-jsx}

### Truy cập ownProps
Như đã nêu trước đó, các hàm mapStateToProps và mapDispatchToProps được truyền cho connect () có thể được khai báo với ownProps của component làm tham số thứ hai.

Tuy nhiên có một lời cảnh báo. Nếu số lượng tham số bắt buộc của hàm khai báo nhỏ hơn 2, thì ownProps sẽ không bao giờ được thông qua. Nhưng nếu hàm được khai báo không có tham số bắt buộc(tức là sử dụng booj tham số mặc định) hoặc ít nhất 2 tham số, thì ownProps được thông qua.

Dưới đây là một vài tình huống:

**1. Khai báo không tham số**

{@embed: https://gist.github.com/gladchinda/581188ccf0a64da60f781ebc039d5082#file-ownprops-no-parameters-js}

Ở đây, ownProps được thông qua vì hàm được khai báo không có tham số bắt buộc. Do đó, những điều sau đây cũng sẽ hoạt động theo cách tương tự, sử dụng cú pháp `ES6 rest parameters` mới:

{@embed: https://gist.github.com/gladchinda/70b2ab4eba2772b8109954f867075bfa#file-ownprops-rest-parameters-js}

**2. Khai báo một tham số**

{@embed: https://gist.github.com/gladchinda/15ad69532c9c48d05e9e839a53cc3c41#file-ownprops-one-parameter-js}

Ở đây, chỉ có một tham số, `state`. Do đó, các đối số [1] không được xác định do `ownProps` không được thông qua.
**3. Khai báo với tham số mặc định**

{@embed: https://gist.github.com/gladchinda/2f5807830348571447023739cbd19020#file-ownprops-default-parameter-js}

Ở đây, chỉ có một tham số bắt buộc, state, bởi vì tham số ownProps thứ hai là tùy chọn vì giá trị mặc định đã được chỉ định cho nó. Do đó, vì chỉ có một tham số bắt buộc, ownProps không được thông qua và kết quả là nó ánh xạ tới giá trị mặc định đã được gán cho nó -  {}.(haiz)
**4. Khai báo đủ 2 tham số**

{@embed: https://gist.github.com/gladchinda/acaec7a0eca8298ed7a1e1f7fc2d51cc#file-ownprops-two-parameters-js}

Cái trường hợp này là chuẩn bài nhất này. ownProps được truyền vào đây vì hàm được khai báo với đầy đủ hai tham số bắt buộc.
##  Kết luận
Trong hướng dẫn này, bạn đã thấy khi nào và làm thế nào để sử dụng API connect () được cung cấp bởi gói package React-redux để tạo các container component được kết nối với State Redux.
Mặc dù hướng dẫn này, bao gồm phần lớn cấu trúc của API connect() và cách sử dụng, nhưng nó không thể hiệnđược hết các ví dụ trường hợp sử dụng.