# Fragments
Fragments một trong những thành phần gọi là cơ bản nhất của React, nó cho phép Component có thể trả về nhiều element một lúc bằng cách gom tất cả các thành phần con trong một node của DOM.
```Javascript
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```
# Motivation
Chúng ta sẽ cùng đi tới một ví dụ cụ thể như sau
```Javascript
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

Với ví dụ trên thì Component `<Column />` sẽ có nhiệm vụ trả về một lúc nhiều element `td` cùng một lúc và nếu không sử dụng Fragment thì chúng ta sẽ xử lý như thế nào, vốn dĩ function render của React chỉ trả về 1 element cho một Component
```Javascript
class Columns extends React.Component {
  render() {
    return (
        <td>Hello</td>
        <td>World</td>
    );
  }
}
```
Nếu chúng ta render như vậy thì sẽ bị React báo lỗi và không thể chạy được.


Để giải quyết vấn đề này thì chúng ta sẽ nghĩ tới phương án bọc toàn bộ thành phần con vào trong 1 thẻ `Div` giống như component  `<Column />` 

```Javascript
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```

Nhìn có vẻ ok rồi các bạn nhỉ, nhưng có gì đó không đúng ở đây phải ko nhỉ.

Chúng ta sẽ có kết quả trả về như sau:

```Javascript
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```

Quả này mà chạy thật thì toang nhỉ, đơn giản là vì chúng ta đã bị sai cấu trúc của `Table`, nó sẽ không nhận thẻ `Div` ở trong thẻ `tr`.

Trong những trường hợp như thế này thì Fragment chính là giải pháp giúp chúng ta giải quyết vấn đề này.

# Usage

Chúng ta có thể sử dụng Fragment để bọc các thành phần con như sau:

```javascript
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

Hoặc có thể import vào như này

```javascript
import {Fragment} from React;

class Columns extends React.Component {
  render() {
    return (
      <Fragment>
        <td>Hello</td>
        <td>World</td>
      </Fragment>
    );
  }
}
```

Và kết quả khi sử dụng Fragment sẽ khác so với chúng ta sử dụng thẻ `Div`

```Javascript
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>

```

# Short Syntax
Để thuận tiện hơn trong việc code chúng ta có thể sử dụng Short Syntax, và nó trông giống như một thẻ trống

```Javascript
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```
Nhưng cần lưu ý một chút, khi các bạn sử dụng short syntax thì sẽ không được hỗ trợ các attribues và keys, cho nên cần cân nhắc khi sử dụng.

# Keyed Fragments
Với Fragment được khai báo với đầy đủ syntax thì sẽ được hỗ trợ key và một số attributes. Nếu các bạn sử dụng trong mapping collection thì nên sử dụng Fragment với đầy đủ syntax để apply key, điều này sẽ làm cho performance của app được tăng lên


```Javascript
class UserList extends React.Component {
  users = [
    {
      id: 1,
      name: "Jack Bauer",
      email: "jack.bauer@ctu.gov",
      phone: "+358509283928"
    },
    {
      id: 2,
      name: "Tony Almeida",
      email: "tony.almeida@ctu.gov",
      phone: "+358508829378"
    },
    {
      id: 3,
      name: "Chloe O'brian",
      email: "chloe.obrian@ctu.gov",
      phone: "+358508899012"
    }
  ];
  render() {
    return (
      <React.Fragment>
        {this.users.map(user => (
          <React.Fragment key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}
```

# Conclusion
trong bài viết này thì chúng ta đã tìm hiểu được về vấn đề của React khi render nhiều phần tử con cùng một lúc và cách giải quyết vấn đề đó bằng cách sử dụng Fragment.