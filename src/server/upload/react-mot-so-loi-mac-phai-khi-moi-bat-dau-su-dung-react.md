## 1. Lỗi "history of undefined”.
- Khi bạn sử dụng React-router-dom cho React Router trong ứng dụng của mình, bạn thường phải đối mặt với lỗi ***history of undefined*** .
- Giải pháp cho lỗi này là sử dụng *withRouter*  như một wrapper (method HOC) bọc bao quanh component.

```javascript
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class App extends Component {
  ...
  render() {
  }
  export default connect(
    (state) => ({ ... }),
    (dispatch) => ({ ... })
  )withRouter(App));
}
```

## 2. Lỗi "Expected an assignment or function call and instead saw an expression”.
Lỗi này xảy ra khi bạn bọc phần thân function bằng bằng dấu ngoặc nhọn ({}) nhưng không trả về bất kỳ giá trị nào.
Ví dụ:

```javascript
const def = (props) => { <div></div> };
```
Cú pháp trên sẽ không trả về bất kỳ giá trị nào.

Hướng giải quyết như sau: 
```javascript
// solution
// Instead of const def = (props) => { <div></div> };
// Change to
const def = (props) => { return (<div></div>); };
// OR
const def = (props) => <div></div>;
```

## 3. Lỗi "Error: Invariant failed: You should not use `<Switch> outside a <Router>”`.
Chắc chắn các bạn đã gặp phải lỗi này ít nhất một lần trong đời khi sử dụng React (đặc biệt là Reac-router-dom). 

Switch tương tự như câu lệnh switch trong JavaScript, được sử dụng để thực hiện các hành động khác nhau dựa trên các điều kiện khác nhau:

```javascript
switch (5) {
  case 0 :
    // do something
  case 1 :
    // do something
  ...
}
```

- Hướng giải quyết:

```javascript
import { Switch, Route } from 'react-router-dom';
<Switch>
  <Route path = '/path1' component={ component1 } />
  <Route path = '/path2' component={ component2 } />
  <Route path = '/path3' component={ component3 } />
  ...
</Switch>
```

## 4. Lỗi "Parsing error: Lexical declaration cannot appear in a single-statement context". 
Lỗi này xảy ra khi bạn sử dụng *let* (let alone) một mình cô độc trong 1 phạm vi nhất định (trong Chrome):

Ví dụ:
```javascript
function TestError() {
    if (true) {
        let k2 = new Object("ss");
    }
}
// phương thức sau khi được tối giản sẽ là:
function TestError()
{
  if (1)
    let k2 = new Object("ss")
}
```

Đoạn code trên khi chạy Chrome sẽ xảy ra lỗi. 

- Hướng giải quyết:
Không sử dụng *let* alone.

```javascript
function TestError()
{
  if (1) {
    let k2 = new Object("ss")
   }
}
// Hoặc
function TestError()
{
  if (1)
    Object("ss")
}
```

## 5. Lỗi Higher-order component (HOC).
Khi bạn cố gắng chuyển một mảng array từ component cha sang component con, bạn thường sử dụng map để gửi một loạt các array của props lặp đi lặp lại (vì React không cho phép props nằm trong một mảng array).

Có một lỗi phổ biến mà nhiều nhà phát triển React mắc phải trong khi chuyển một loạt các array chứa props sang component con. Nhưng, nếu bạn bắt được sự khác biệt giữa hai đoạn code dưới đây, thì bạn đã hiểu được vấn đề và sẽ không có vấn đề gì nữa :D

```javascript
render() {
  {
    organizationData.map(schoolData => {
      <MSCList
        schoolID = {schoolData.schoolID}
        schoolName = {schoolData.schoolName}
        alignment = {schoolData.alignment}
        classList = {schoolData.class}
        />
      })
   }
}
vs.
render() {
  {
    organizationData.map(schoolData => (
      <MSCList
        schoolID = {schoolData.schoolID}
        schoolName = {schoolData.schoolName}
        alignment = {schoolData.alignment}
        classList = {schoolData.class}
        />
      ))
    }
}
```

Bạn có nhận thấy sự khác biệt ở 2 đoạn code trên? Đó là
```
.map (schoolData => {
```
 ngoặc nhọn được thay thế
```
.map (schoolData => (
```
bằng dấu ngoặc đơn.

Sử dụng ngoặc nhọn sẽ gây ra ERROR đấy nhé ^^.

Trên đây mình đã tổng hợp 1 số lỗi hay mắc phải khi bắt đầu tiếp xúc với React. Hy vọng sẽ giúp ích cho các bạn. 

Cám ơn mọi người đã dành thời gian theo dõi!


Nguồn tham khảo:
- [Medium](https://medium.com/javascript-in-plain-english)