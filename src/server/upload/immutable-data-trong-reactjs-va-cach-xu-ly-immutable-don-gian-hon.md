### I. Mở đầu
Khi mới làm quen với **React** hay **Redux**, khái nhiệm **Immutable** ít nhiều đều gây cho chúng ta một chút bối rối, hiểu đơn giản thì **Immutable** ám chỉ việc không thay đổi trực tiếp **state** của **app** mà thay vào đó, chúng ta luôn **return** giá trị mới của **state** mỗi khi cần **update** một phần hay toàn bộ **state**.  **Immutable** ít nhiều đã khiến mình bối rối khi làm quen với **React**, điều đó cũng tương tự khi ta làm việc với **state** trong **Redux**.  
```js
function reducer(state = initialState, action) {
    switch(action.type) {
        case INCREASE:
            return {
                ...state,
                value: state.value + action.payload
            }
    }
}
```
Tuy nhiên **Immutable** khá là quan trọng và cần thiết để ứng dụng **React** hoạt động trơn tru và tối ưu được **performance**. Giả sử ta có ví dụ sau:  
```js
class Child extends React.PureComponent {
    render() {
        const { fatherName } = this.props;
        return <div>My father name is: {fatherName}</div>
    }
}

class Father extends React.Component {
    state = {
        name: 'Father',
    }
    render() {
        <Child fatherName={this.state.name} />
    }
 }
```
**props** của **Child** là một **Object**, và chắc hẳn bạn đã biết rồi, khi ta so sánh 2 biến **Object** trong **Javascript** thì sẽ là một so sánh tham chiếu:
```js
a = {};
b = a;
c = {};
// a == b --> true
// a === b --> true
// a == c --> false
// a === c --> false
```
Vì vậy nếu **props** của **Child** là **Immutable**, sẽ rất dễ dàng để **Child** biết khi nào **props** của mình được **cập nhật (updated)** và **render** lại, ngược lại **Child** sẽ rất vả, dùng các tính toán phức tạp để có thể xác định được **props** của mình bị thay đổi và tiến hành **render**, mức độ tính toán sẽ trở nên khổng lồ khi **state** của ứng dụng lớn dần, và sẽ khiến nó bị **tê liệt**.  Vậy đơn giản là **return** giá trị **state** mới, sử dụng so sánh tham chiếu là được phải không ?    
### II. Vấn đề  
Tất nhiên thì **Immutable** cũng có giá của nó, việc cập nhật **state** sẽ trở nên khó hình dung và khó code hơn, đặc biệt là đối với **state** là **object** có chứa nhiều **lớp (layer)**, ngay cả khi ta sử dụng cú pháp **ES6+** đi chăng nữa.  
```js  
// mutable code
this.state.user.attributes.name = 'New Name'
// Immutable code
this.setState(({ prevState }) => ({
    user: {
        ...prevState.user,
        attributes: {
            ...prevState.attributes,
            name: 'New Name',
        }
    }
}))
```  
### III. Giải pháp
Và với vị thế ngôn ngữ lập trình năng động nhất, tất nhiên chúng ta có nhiều lựa chọn trên **npm** giúp đỡ phần **vất vả** của **immutable**. Trước đây mình thường sử dụng thư viện **[immutablejs](https://github.com/immutable-js/immutable-js)** do chính chủ **facebook** phát triển, thư viện này mình thấy thật sự mạnh mẽ, tuy nhiên cách viết giống với **OOP** hơi khó làm quen một chút.
```js
import React from "react";
import { Map } from 'immutable';

class App extends React.Component {
  state = {
    user: Map({
      name: 'initial Name',
    })
  }

  handleChange = (e) => {
    const { value: newName } = e.target
    this.setState(({ user }) => ({
      user: user.set('name', newName)
    }))
  }

  render() {
    const name = this.state.user.get('name')
    return (
      <div className="App">
        <input value={name} onChange={this.handleChange} />
        <h1>Hello {name}</h1>
      </div>
    );
  }
}
```  
Thật sự thì mất khá nhiều thời gian mình mới hiểu hết cú pháp của **immutable**, khi đã quen thì thấy nó khá là mạnh mẽ, ví dụ như khi ta cập nhật một **Object** nhiều lớp:  
```js
const state = fromJS({
    user: {
        id: 1,
        attributes: {
            friends: [
                {
                    id: 1,
                    name: 'Friend 1',
                },
                {
                    id: 2,
                    name: 'Friend 2',
                }
            ]
        }
    }
});
// update name of Friend 2
newState = state.setIn(['user', 'attributes', 'friends', 1], 'New Friend 2 Name');
```  
**Immutable** sẽ làm đúng điều mà bạn mong muốn, miễn là sử dụng đúng theo cú pháp mà nó quy định, thật sự thì hay thật, nhưng hơi phức tạp một chút phải không ?  
Vậy hãy cùng trải nghiệm một lựa chọn mới hơn và đơn giản hơn nào, như mình đã nói **Javascript** là ngôn ngữ năng động nhất mà.  
Giải pháp thứ hai mà mình muốn giới thiệu trong bài viết này đó là **[ImmerJs](https://github.com/immerjs/immer)**, tại sao ư, nó đã được trao giải **Giải pháp đột phá của năm 2019** tại **[React open source award](https://osawards.com/react/)** cơ đấy, mặc dù chỉ mới sử dụng nhưng mình đã yêu nó luôn rồi, mà nói chung bạn chẳng cần thời gian làm quen nữa cơ, vì cứ như mình đang **Mutable** **data** luôn rồi vậy.  
```js
import { produce } from 'immer';

const initialState = {
    name: 'Initial Name',
    content: {
        attributes: {
            job: 'worker',
        }
    }
}

function reducer(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case 'UPDATE_NAME':
              draft.name = action.payload;
              break;  
            case 'UPDATE_JOB':
              draft.content.attributes.job = action.payload;
              break;
        }
    })
}
```
Xong rồi đó, chỉ cần nhớ vậy là đủ dùng hàng ngày rồi phải không :D. Hiểu đơn giản là **Immer** tạo ra một bản **draft**, chúng ta **mutate** trực tiếp bản **draft** đó và **Immer** sẽ làm công việc còn lại, trả về **state** mới chính xác như chúng ta mong muốn. Sử dụng **Immer** với **setState** sẽ như sau:  
```js
import React from "react";
import { produce } from 'immer';

class App extends React.Component {
  state = {
    user: {
      name: 'initial Name',
    }
  }

  handleChange = (e) => {
    const { value: newName } = e.target
    this.setState(produce(draft => {
        draft.user.name = newName
    }))
  }

  render() {
    const name = this.state.user.name
    return (
      <div className="App">
        <input value={name} onChange={this.handleChange} />
        <h1>Hello {name}</h1>
      </div>
    );
  }
}
```
### IV. Tổng kết  
Mình thấy rằng khi hiểu được lợi ích đem lại cho ứng dụng **React - Redux** thì sẽ thấy **Immutable** không hề xấu xí và sẽ **yêu** nó hơn, hi vọng  bài chia sẻ lan man này của mình thì các bạn sẽ mang lại điều bổ ích cho các bạn, cảm ơn đã theo dõi nhé.