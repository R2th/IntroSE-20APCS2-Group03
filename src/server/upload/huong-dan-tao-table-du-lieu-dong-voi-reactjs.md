- Trong bài viết này, tôi sẽ hướng dẫn các bạn cách tạo một table với dữ liệu động trong **ReactJs**.
- Tôi biết nó khá đơn giản với một số bạn, nhưng hướng dẫn này dành cho người mới bắt đầu để họ biết cách làm chúng

## Bắt đầu: 

- Chúng tôi có dữ liệu dưới dạng mảng các đối tượng giống như API. Bạn cũng có thể sử dụng API.

- Đầu tiên tạo component đơn giản và lưu trữ dữ liệu ở trong ** state**


```JS
class Table extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         students: [
            { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
            { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
            { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
            { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
         ]
      }
   }

```

- Ở đây chúng tôi có 4 sinh viên với id, tên, tuổi và địa chỉ email. Vì bảng của chúng tôi với dữ liệu động nên không có vấn đề gì nếu chúng tôi có 4 hoặc 100 sinh viên ...

##  Tạo dữ liệu cho tbody 

- Bây giờ chúng tôi muốn in ra dữ liệu **students** trong DOM. Chúng tôi thường sử dụng function map trong react để lặp lại trên mảng( kiểu như vòng lặp for)
- Viết hàm mới và gọi nó ra bằng phương thức render. Với cách này chúng ta sẽ thấy code gọn hơn và dễ đọc hơn

```JS
renderTableData() {
    return this.state.students.map((student, index) => {
      const { id, name, age, email } = student
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{age}</td>
          <td>{email}</td>
        </tr>
      )
    })
  }
  
  render() {
      return (
         <div>
            <h1 id='title'>React Dynamic Table</h1>
            <table id='students'>
               <tbody>
                  {this.renderTableData()} // Gọi hàm đó ra ở đây
               </tbody>
            </table>
         </div>
      )
   }

```

- Bạn có thể nhận thấy phương thức *renderTableData* của chúng tôi chỉ trả về *tr* chứ không phải *tr* bên trong table. Vì *tr* không thể là con của *div* nên chúng ta phải bọc *tr* bên trong *tbody* 

## Tạo dữ liệu cho header

- Bây giờ chúng ta viết 1 function mới cho phần header như trên

```JS
renderTableHeader() {
      let header = Object.keys(this.state.students[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }
<thead>
{this.renderTableHeader()}
</thead>
```

- Object.Keys cung cấp cho chúng ta tất cả keys của sinh viên dưới dạng mảng và chúng tôi đã lưu trữ nó dưới dạng biến của header. Vì vập chúng ta có thể lặp lại header bằng sử dụng map()
- Bạn có thể nghĩ tại sao chúng ta không sử dụng forEach, nó cũng làm như vậy. Lý do là khi chúng tôi muốn là map() vì  nó sẽ trả về một mảng mới .Nên chúng tôi sử dụng phương thức map(), trong khi forEach không trả về bất cứ thứ gì, nó chỉ lặp lại trên các phần tử của mảng.

## Kết quả:

```JS
import React, { Component } from 'react'

class Tables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [
        { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
        { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
        { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
        { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' },
      ],
    }
  }

  renderTableData() {
    return this.state.students.map((student, index) => {
      const { id, name, age, email } = student
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{age}</td>
          <td>{email}</td>
        </tr>
      )
    })
  }

  renderTableHeader() {
    const header = Object.keys(this.state.students[0])
    return header.map((key, index) => <th key={index}>{key.toUpperCase()}</th>)
  }

  render() {
    return (
        <table>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
    )
  }
}

export default Tables

```

- Đó là tất cả, chúng tôi đã hoàn thành với bảng đơn giản.[ Link demo ](https://codepen.io/ngc-yn/pen/YzXNdxQ)


  {@codepen:https://codepen.io/ngc-yn/pen/YzXNdxQ}
  
##   Kết Luận

- Link tham khảo bài viết: https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg