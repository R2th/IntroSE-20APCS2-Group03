# Local state trong component 

Local state là một phần không thể thiếu khi nói đến React

```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  render() {
    return (
      <div>
        Counter: {this.state.counter}
        <button
          type="button"
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        />
      </div>
    );
  }
}
```
Một React component có initial state được khởi tạo bên trong constructor, bạn có thể update state thông qua phương thức `this.setState()`. 
Thực ra việc update state là việc merge. Do đó bạn có thể update local state theo từng phần và nó sẽ giữ lại những properties khác của state trước đó. 
Mỗi khi state được update thì component sẽ tự động re-render. Ở ví dụ trên nó sẽ hiển thị giá trị counter của state được update. 

Về cơ bản thì phương thức `this.setState()` sẽ cập nhật local state không đồng bộ, do đó bạn ko thể dựa trên thời gian khi khi update state
```
this.setState({ counter: this.state.counter + 1 });
```
Local state `this.state.counter` được sử dụng cho việc tính toán ở một khoảng thời gian ngắn, khi bạn update state với method `this.setState()` nhưng local state thay đổi trước khi việc thực thi không đồng bộ xảy ra dẫn tới việc có thể bạn sẽ nhận được giá trị cũ.
```
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
this.setState({ counter: this.state.counter + 1 }); // this.state: { counter: 0 }
```
kết quả là couter không được update, nó chỉ có giá trị cuối cùng là `{counter: 1}` thay vì `{counter: 3}`
Như bạn thấy không thể dựa trên local state đang được được update để update chính nó, nó có thể dẫn đến bugs, Do đó có một cách khác để update local state
Bạn có thể gọi callback trong `this.setSate()`, bạn có thể lấy được local state trong callback function này khi `this.setState` thực hiện không đồng bộ, callback này sẽ thực thi đúng state tại thời điểm.
```
this.setState(previousState => ({ counter: previousState.counter + 1 }));
```
callback funtion này cũng nhận một tham số thứ 2 nữa là props của component 
```
this.setState((prevState, props) => ({ counter: prevState.counter + props.addition }));t
```
Bạn cũng có thể viết tách callback ra một hàm riêng và gọi. Nó cũng dễ dàng cho việc viết test hơn
# React state và props
State được quản lý ở bên trong component, nó có thể được truyền truyền xuống tới các component khác như là props. Các component này có thể dùng các props hoặc truyền nó xuống các component con. 
Thêm nữa là các component con có thể nhận các  callback function trong props từ các component cha, Những functions này có thể được sử dụng để chỉnh sửa local state của component cha. 
Thế nhưng, những component con không biết được nguồn gốc cũng như chức năng của các function nhận trong props, các function này có thể update state trong component cha hay làm một số nhiệm vụ khác, các component con chỉ việc thực thi chúng. Cũng tương tự đối với props, component props đó là props hay state hay các properties khác từ component cha. Component con chỉ việc sử dụng chúng. 

# Lifting React's State
Là việc quản lý truy cập state tới các component khác. 

**Lifting state down:**

![](https://images.viblo.asia/4556988b-92e4-4132-b3c9-8a4658a2dd6a.png)

Giả sử bạn có một component A là cha của B và C, trong đó B, C là 2 con cùng cấp. A là component duy nhất có thể quản lý được state và truyền nó xuống B,C như là props, thêm nữa nó có thể truyền các funtions xuống B, C để update state của chính A.

![](https://images.viblo.asia/7ca5085b-3502-4322-b389-aee6be5148f4.png)

Bây giờ một nửa local state của A được sử dụng như props ở component C, nhưng không sử dụng ở B, thêm nữa là C nhận được funtions từ props để chỉnh sửa update state của A được dùng trong C.

Như vậy bạn có thể thấy A quản lý state thay cho C.

Trong hầu hết các trường hợp thì một component quản lý  tất cả state của các component con. 

Nhưng hay thử tưởng tượng rằng giữa A và C có nhiều component khác , tất cả các props phải được truyền qua các component trung gian trước khi truyền tới component cuối cùng C. Component A vẫn quản lý state thay cho component C

**Lifting state up:**

![](https://images.viblo.asia/fbb7769e-8b1c-4dd1-b3ed-362cd8dea7f1.png)

Hãy thử tưởng tượng rằng bạn có một component A là component cha của B, C. Giữa A và B , A và C có thể có nhiều component trung gian, thế nhưng component C quản lý state của chính nó.

Giờ B có thể dùng state được quản lý bởi C không ?

Câu trả lời là không bởi vì state chỉ có thể được truyền xuống, nhưng nếu dùng lifting state up thì ta có thể dùng share được state của C cho B thông qua A. 
Nếu state được quản lý bởi C được sử dụng ở B, thì C trở thành stateless component. State có thể được sử dụng ở A nhưng có thể được share thông qua B và C


to be continue ...
### nguồn tham khảo 
https://www.robinwieruch.de/learn-react-before-using-redux/