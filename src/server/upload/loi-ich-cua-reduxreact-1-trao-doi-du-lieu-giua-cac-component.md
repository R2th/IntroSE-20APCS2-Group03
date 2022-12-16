Khi đã làm quen được với React và có thể dùng React để viết các website đơn giản, thông thường bước tiếp theo chúng ta sẽ học đến Redux.
Nhiều người do thấy người ta bảo nên học, hay xem mấy code trên Github thấy người ta dùng Redux nên cũng học dùng thử thôi, chứ cũng chẳng hiểu tại sao phải học nó nữa.
Mình cũng vậy. (Haha)

Bài viết này, và cả những bài viết sau nữa mình sẽ nói về các lợi ích của Redux, để các bạn mới học hay dự định học Redux sẽ có cái nhìn tổng thể hơn về nó.
Để không giống mình, học làm một thời gian rồi mới nghiệm ra được. Tự mình nghiệm ra thì là tốt nhất, nhưng mà tốn thời gian. Giá hồi đó có người chỉ cho mình thì tuyệt.

 # Redux là gì?
 Hiểu một cách đơn giản, Redux là thư viện dùng để quản lí dữ liệu tồn tại trong application.
 
# Tại sao cần Redux?
Khi bạn tham khảo các tài liệu về Redux, bạn sẽ thấy rất nhiều lợi ích từ Redux. Tuy nhiên thật sự mà nói, đối với người mới làm quen với React và Redux thì thật khó để mà hiểu và lĩnh hội được.

Application càng lớn, thì những lợi ích của nó càng lớn hơn. Những lợi ích "xa xôi" ấy mình sẽ phân tích ở những bài sau.
Bài viết này mình chỉ nói về lợi ích trước mắt của việc dùng Redux. Đó là việc trao đổi dữ liệu giữa các Component.

## Nếu không dùng Redux
Như mọi người đều biết, cách truyền dữ liệu duy nhất trong React là truyền từ cha sang con qua props. Khi muốn truyền ngược từ con sang cha, chỉ còn cách truyền một callback từ con sang cha.
Ví dụ.
 ```javascript
//fromParentToChildren
class Parent extends React.Component {
  constructor(props){
    this.state = {
      parentData : 1
    }
  }
  render() {
    return (
      <Children childrenData={this.state.parentData} >
    );
  }
}

class Children extends React.Component {
  render() {
    return (
      <div>{this.props.childrenData}</div>
    );
  }
}
```

```javascript
//fromChildrenToParent
class Parent extends React.Component {
  constructor(props){
    this.state = {
      parentData : 1
    }
  }
  render() {
    return (
      <Children updateData={(data) => {this.setState({ parenData : data })}}/>
    );
  }
}

class Children extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.updateData(3)}>Click to update data</button>
    );
  }
}
```

Chúng ta có thể truyền dữ liệu như thế này. Nhưng bạn thử tưởng tượng xem khi application phức tạp thì nó sẽ như thế nào.
Ví dụ như khi cấu tạo của application là C -> B -> A <- D <- E, thì để truyền dữ liệu từ E đến C, bạn phải truyền đường vòng từ E => D => A => B => C.

Truyền dữ liệu như này thì chịu thôi.

## Dùng Redux thì thế nào?
Khi dùng Redux, chúng ta sẽ có một State chung mà bất cứ Component nào cũng có thể access được. Vì vậy, những dữ liệu nào muốn truyền đi cho Component khác,
ta có thể chuyển vào State đó.

Ví dụ, trong một application có cấu tạo C -> B -> A <- D <- E, khi muốn truyền dữ liệu từ E sang C, ta chỉ cần đơn giản làm như sau.
```javascript
//EComponent
class E extends React.Component {
  increment(){
    // Kích hoạt Action làm thay đổi biến chung commonData 
  }
  render() {
    return (
      <button onClick={this.increment}>Click to increment</button>
    );
  }
}
```

```javascript
//CComponent
class C extends React.Component {
  render() {
    return (
      <div>{this.props.commonData}</div>
    );
  }
}

// Map biến chung commonData vào props
const mapStateToProps = state => ({
    commonData: state.reducer.commonData
});

export default connect(mapStateToProps,null)(C);
```

Việc truyền dữ liệu trở nên đơn giản hơn rất nhiều, và dòng dữ liệu trong application sẽ trở nên clean hơn.

Khi hệ thống càng lớn, lợi ích của việc dùng Redux sẽ trở nên rõ ràng hơn. Mình sẽ phân tích ở những bài tiếp theo.(:0)