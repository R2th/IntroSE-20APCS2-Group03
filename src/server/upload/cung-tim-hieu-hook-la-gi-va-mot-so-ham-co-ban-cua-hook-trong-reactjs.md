# Mở đầu:
Xin chào mọi người mình đã quay trở lại rồi đây trong bài này chúng ta sẽ cùng tìm hiểu về Hooks trong reactjs. Các bạn chú ý khi setup môi trường thì vì phiên bản react 16.8 là phiên bản đầu tiên hỗ trợ Hook, nếu các bạn đang ở phiên bản thấp hơn thì chú ý update nhé. Các bạn có thể thực hiện đơn giản như sau: Tìm đến file `package.json` rồi tìm đến đoạn `"react": "...",` trong `"dependencies": {` và cập nhập đến phiên bản mình muốn, song đừng quên chạy lệnh `npm update` trên terminator nhé :). Vậy là setup song giời chúng ta cùng đi tìm hiểu hook là gì, tại sao chúng ta lên sử dụng hook và cùng một ví dụ nho nhỏ để thấy được tác dụng của hook nhé !!!
# 1, Hook là gì
Nếu trước đây các thường thấy chủ yếu reactjs sử dụng `class component ` vì nó có thể sử dụng được state, và có thể custom được lifeCycle mặc dù tương đối khó khăn nhưng mang về hiệu quả. Để khắc phục được điều này và cũng như mở ra thời đại của function component,tại phiên bản 16.8  Hooks được ra đời - nghe hơi giống chuyện thần thoại (yaomi).

Dành cho một số bạn đang tìm hiểu xem state và lifeCycle là gì thì đây là một phạm trù mà các bạn lên tìm hiểu kỹ, để các bạn có thể hiểu qua nó là gì và để chúng ta có đầy đủ hành trang nhất đề khám phá Hook thì mình sẽ giải thích đơn giản như sau: react là một Single-page Application và để thực hiện việc này nó cần có đến các state - các trạng thái của các thẻ html, vậy khi chúng ta thực hiện một tác vụ làm thay đổi giao diện thì chúng ta đồng thời update lại state này, dựa vào state này mà react có thể biết được bạn đang làm cái gì và nó có thể thay đổi giao diện theo ý của bạn. Còn nhắc đến lifeCycle thì đúng như tên gọi nó là một vòng đời của một component, từ khi các bạn truy cập hoặc thực hiện load trang, cho đến khi các bạn xuất kết quả về là thành công hoặc thất bại, các bạn có thể hiểu đơn giản là như vậy.

Mình sẽ tạm chia ra làm hai kiểu Hooks mà mình thấy hợp lys: Basic Hooks hay như mình hiểu đây là các hooks hỗ trợ state và lifeCycle, và Additional Hooks đây là các hook thực hiện các chức năng nâng cao trong project như useReducer thay thế cho switch case trong `reduce`.

# 2, Basic Hooks

### useState

**useState** cho phép chúng ta khai báo local state trong Function Component cách mà trước để chỉ dùng cho Class Component.
> const [state, setState] = useState(initialStateValue)


**state**: định nghĩa tên của state nó có thể là đơn giá trị hoặc object

**setState**: định nghĩa tên function dùng cho việc update state

**initialStateValue**: là giá trị default của state

Như mình đã đề cập ở trên một trong những lý do mà các phiên bản cũ ưa truộng class component vì nó hỗ trợ state, và giờ đây tại function component cũng đã được support thì cũng dễ hiểu tại sao function component đang nhanh tróng lấy lại vị thế. Các bạn chú ý hàm useState nhận vào hai tham số,phần tử đầu tiên là state hiện tại, phần tử thứ 2 là 1 function dùng để update state (giống như hàm setState cũ vậy) VD:

```
import React, { useState } from 'react';

function Example() {
  // Khai báo 1 biến số đếm, gọi là "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Bạn đã bấm {count} lần</p>
      <button onClick={() => setCount(count + 1)}>
        Click
      </button>
    </div>
  );
}
```
Bây giời khi muốn update state cho `count` thì bạn chỉ cần gọi đến `setCount(count + 1)` là được. 

**Thế bây giời mình muốn khai báo nhiều state cho Function Components thì sao ?**

Các bạn có thể đi theo hướng bao nhiêu state thì bấy nhiêu useState:
```
const [state, setState] = useState(initialStateValue)
const [state, setState] = useState(initialStateValue)
.....
```
Thật ra thì hàm useState của laravel đã hỗ trợ cho việc này rồi, chẳng có lý do gì để chúng ta làm thủ công như trên cả :). VD:
```
function UserInfoFunction() {
  const [userInfo, setUserInfo] = useState({ 
    firstName: 'John', lastName: 'Doe',
  });

  return (
    <div>
      <p>userInfo: {JSON.stringify(userInfo)}</p>
      <button onClick={() => setUserInfo(prevState => ({
        ...prevState, firstName: 'Jason' }))}>
        Update name to Jason
      </button>
    </div>

```

### useEffect

useEffect tương đương với việc bạn sử dụng các hàm **componentDidMount**, **componentDidUpdate** lẫn **componentWillUnmount** trong **lifeCycle** , nhưng thật ra thì các bạn cũng không cần quan tâm lắm xem trong trường hợp này nó đang thay thế cho thằng nào mà chỉ cần hiểu đơn giản: **useEffect** sẽ chạy sau mỗi lần component của bạn **render** nếu thỏa mãn điều kiện bạn đặt ra hoặc khi component bị unmount.

**Cú pháp:**
```
useEffect(effectFunction, arrayDependencies)
```
Chúng ta cùng đến với một ví dụ để hiểu dõ hơn nhé:
```
import React, { useState, useEffect } from "react";

const App = () => {
  const [name, setName] = useState("Ceci");
  
  useEffect(() => {
    document.title = name;
  }, [name]);

  return (
    <input value={name} onChange={event => setName(event.target.value)} />
  );
}
```
Như trên các bạn có thể thấy useEffect được sử dụng để gán name cho `document.title`. Và các bạn nhận vào một mảng [name] tương đương với **arrayDependencies** trên cú pháp, các bạn có thể hiểu với mỗi lần các bạn thay đổi name thì cái name này sẽ được gán cho `document.title` và đương nhiên nếu bạn không làm thay đổi cái name này thì hàm useEffect sẽ không được thực hiện. Tuy nhiên các bạn cần chú ý nếu **arrayDependencies** của bạn là một object thì rất có thể dẫn đến việc **useEffect** của bạn bị gọi liên tục vì với object nó sẽ so sánh tham chiếu chứ không phải giá trị.
```
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source], // giá trị được subcrive
);
```
Các bạn cần chú ý là không lên viết tách hàm ra rồi gọi trong useEffect vì nó sẽ dẫn đến một số bug không đáng có. Và lên **return** về một function vì function này sẽ thực thi trước khi mà component đó được unmounted.
# 3, Kết Bài:
Đọc tới đây chắc các bạn cũng đã hình dung được **hooks** và một số hàm cơ bản trong hooks là gì đúng không ạ, trong bài tiếp theo chúng ta sẽ cùng tìm hiểu về **Additional Hooks** . Cảm ơn bạn đã đọc bài của mình, nếu các bạn có thắc mắc, hay có phần nào chưa hiểu các bạn có thể bình luận dưới phần comment để chúng ta cùng tìm hiểu dõ hơn nhé. Và đặc biệt đừng quên cho mình một like và một share nhé :)!