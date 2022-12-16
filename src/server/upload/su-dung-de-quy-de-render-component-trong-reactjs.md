## Giới thiệu
Đệ quy là gì?

Hiểu 1 cách đơn giản nó là 1 cái gì đó có thể sử dụng chính nó, ví dụ hay gặp nhất trong lập trình là hàm gọi chính nó.
![](https://images.viblo.asia/e927cd45-f188-434b-aa45-182e7487344d.jpeg)

Vậy sử dụng với component trong React thì sao, khi nào thì ta nên sử dụng đệ quy render component trong React ?
Đây là hình ảnh ví dụ của 1 bài toán đệ quy trong Reactjs:

![](https://images.viblo.asia/cd22d3f6-bf46-4718-b23d-695e15df733c.png)

Thử tưởng tượng nếu không dùng đệ quy thì trình tự các bước phải làm sẽ như thế nào?

Đầu tiên tạo 1 component Person, hiển thị thông tin, ảnh của người dùng đó. Sau đó, từ data sẵn có, duyệt qua từng từng mảng ở từng lớp con đến hết chiều sâu của cây, việc này làm cho hướng giải quyết trở nên phức tạp và tốn thời gian hơn.

Giờ thử tiếp cận bài toán với hướng giải quyết = đệ quy xem sự khác biệt nhé:
## Khởi tạo ứng dụng tham khảo
Khởi tạo data recursive
```
const recursiveData =
{
  name: 'Name1-1',
  partner: 'Name1-2',
  birthDay: '01/02/1803',
  dob: '02/03/1874',
  childrens: [
    {
      name: 'Name2-1',
      partner: 'Name2-2',
      birthDay: '05/04/1823',
      dob: '06/05/1904',
      childrens: [
        {
          name: 'Name3-1',
          partner: 'Name3-2',
          birthDay: '19/07/1841',
          dob: '22/03/1924',
          childrens: [
            {
              name: 'Name4-1',
              partner: 'Name4-2',
              birthDay: '15/09/1873',
              dob: '21/06/1954',
            }, {
              name: 'Name4-3',
              partner: 'Name4-4',
            }
          ]
        }, {
          name: 'Name3-2',
          partner: '3-4',
          birthDay: '01/02/1803',
          dob: '02/03/1874',
          childrens: [

          ]
        }
      ]
    }, {
      name: 'Name2-3',
      partner: 'Name2-4',
      birthDay: '01/02/1803',
      dob: '02/03/1874',
      childrens: [
        {
          name: 'Name3-3',
          partner: 'Name2',
          birthDay: '01/02/1803',
          dob: '02/03/1874',
          childrens: [

          ]
        },
      ]
    }
  ]
}
```

Tạo Component Member.js chỉ để hiển thị tên và ảnh:
```
import React, { Component } from 'react'

class Member extends Component {
  render() {
    const { name } = this.props
    const style = {
      width: '3rem',
      height: '3rem',
      background: '#c3c3c3',
      borderRadius: '50%'
    }
    return (
      <div className='card'>
        <div style={style}/>
        {name}
      </div>
    )
  }
}

export default Member

```

Tạo tiếp component FamilyTree trong đó nhận personalData là prop đầu vào = với dữ liệu recursiveData  khởi tạo ban đầu.

Chú ý: Hàm render sẽ render component **Member** và component **FamilyTree** là chính nó, lần này props **personalData** = giá trị childrens trong object **recursiveData**, Và đệ quy sẽ dừng lại khi **personData.childrens** không tồn lại
```
import React, { Component } from 'react'

import Member from './Member'

class FamilyTree extends Component {
  render() {
    const { personData } = this.props
    const style={
      display: 'block',
    }
    return (
      <div style={style} className="main-container">
        <Member name={personData.name} />
        {personData.childrens && personData.childrens.map((person, index) => <FamilyTree personData={person} />)}
      </div>
    )
  }
}

export default FamilyTree
```

Và đây là kết quả:
![](https://images.viblo.asia/40a41fb2-f6ce-4ba1-a428-b745cde123c3.png)

## Chú ý và Kết luận

Note: Chỉ nên thực hiện render đệ quy component khi mà cấu trúc data là cây, và lá của cây có cấu trúc tương tự nhau.

 Tài liệu tham khảo: https://medium.com/@swatisucharita94/recursive-rendering-in-react-42666102eae2