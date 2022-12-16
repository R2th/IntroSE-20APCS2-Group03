### I. Giới thiệu  
**Typescript** đang ngày càng phổ biến, rất nhiều lời khuyên sử dụng **Typescript**, nhiều thư viện lớn đã **refactor** lại mã nguồn **JS** bằng **Typescript**, **Angular** từ lâu đã sử dụng **TS** làm "ngôn ngữ" chính, **Editor** mạnh mẽ và phổ biến nhất hiện nay - **VSCode** được phát triển gần như 100% bằng **Typescript**. Mình tự đặt ra câu hỏi phải chăng tất cả chúng ta cũng nên chuyển hết sang dùng **TS** thay cho sử dụng **Javascript** ?  
Và cuối cùng thì mình cũng đã không thoát khỏi cơn bão đó, mình không học được **Angular** vì ngại làm **Typescript**, quanh năm dùng **JS** với **dynamic type** quen rồi, giờ nghe thấy việc phải **type check** như mấy ngôn ngữ "truyền thống" có vẻ ngại ngại. Rồi một ngày **project React** gần đây của mình được yêu cầu sử dụng **Typescript**, đành vậy thôi. Và sau đây là một số chia sẻ của mình sau một thời gian phát triển ứng dụng **web** với **TS + React**.  
### II. Cài đặt ứng dụng
Theo đúng tư tưởng **don't revinvent the wheel**, mình sử dụng **[create-react-app](https://create-react-app.dev/docs/adding-typescript/)**, có sẵn lựa chọn **typescript** rồi, hihi.  
```
npx create-react-app app --template typescript
```
Xong, giờ thì **code** thôi. Có một lưu ý là đối với các **file** chứa **component** cần có phần mở rộng **.tsx**, ví dụ đối với **App.tsx**  
```tsx
import React, { FC } from 'react'

interface PropTypes {
  title: string;
}

const DemoComponent:FC<PropTypes> = ({ title }) => {
    return (
      <div>{title}</div>
    )
}

const App:FC = () => {
  return (
    <DemoComponent title="Hello World" />
  )
}
```
### III. Type ở mọi nơi. 
Vì là **Typescript** nên tất cả mọi thứ chúng ta khai báo đều cần định nghĩa **type**. Các **dependencies** chúng ta cài đặt cũng cần có phần định nghĩa **type**, và trên **npm** đã có sẵn các **dependencies** đi kèm với tên tiền tố là "**@types/{name}**" như **@types/lodash**, **@types/react**,...  chỉ cần **install** là có thể sử dụng.
Về bản chất thì **Code TS** cần biên dịch sang **JS**, trong quá trình biên dịch, nếu việc **type check** không được đảm bảo, ứng dụng sẽ báo lỗi ngay và không thể hoạt động được với một màn hình **đỏ thân thương**. Ở ví dụ trên nếu **DemoComponent** nhận vào **props** không chính xác như sau:
```tsx
const App:FC = () => {
  return (
    <DemoComponent title={5} />
  )
}
```
Ta sẽ nhận được kết quả là:
![](https://images.viblo.asia/1aa5d8f5-2a22-43b9-9ff6-081afc29eb69.png)
OK vậy là cần khai báo đủ **type** và cũng luôn luôn cần phải dùng đủ **type** ở mọi nơi. Việc này ban đầu rất tốn thời gian, do mình làm **JS** quen rồi, nhiều lúc rất bực mình vì phải đi dò lỗi.  
Nhưng sau một thời gian quen dần thì mình cũng không thấy mất thời gian cho lắm, ngược lại việc check **type** này còn giúp mình giảm thiểu các lỗi do tính **dynamic** của **JS** gây ra. Một ví dụ đơn giản nhé.  
```tsx
import React, { FC } from 'react'

interface PropTypes {
  data?: {
    id: number;
    title: string;
    content: string;
  };
}

const DemoComponent:FC<PropTypes> = ({ data }) => {
    return (
      <div>
       <p>{data.title}</p>
       <p>{data.content}</p>
      </div>
    )
}
```
Trong ví dụ này, ta khai báo **prop data** có thể là một **object** chứa các thuộc tính **id**, **title**, **content**, tuy nhiên khi khởi tạo **component**, giả sử khi chưa gọi **api** thì nó là một giá trị **undefined**.   
Khi **code** tới đây, **TS** sẽ nhắc nhở ta kiểm tra điều kiện khi **data** không tồn tại.
![](https://images.viblo.asia/a756240f-b85e-496c-ad6f-bb217b337303.png)  
Ở đây ta có thể sửa bằng cách thêm điều kiện như sau:
```tsx
const DemoComponent:FC<PropTypes> = ({ data }) => {
    if (!data) return null;
    return (
      <div>
       <p>{data.title}</p>
       <p>{data.content}</p>
      </div>
    );
}
```
**Code** mà luôn có người kiểm tra nhắc nhở thì kiểu gì cũng ít lỗi hơn phải không? Và sau một thời gian thì bạn **TS** ngày càng ít phải nhắc nhở mình hơn, mình cũng cảm thấy tự tin hơn khi **code** so với dùng **JS** trước đây.  
### IV. Nhưng không có Type cũng không sao  
Đừng hiểu lầm mình, phần này sẽ không **conlict** gì với phần trước cả. Có thể hiểu bạn vẫn có thể giữ được tính **dynamic** như bạn vốn có với **JS**, vì **type check** trong **TS** hoàn toàn không bắt buộc. Ba cách viết sau đây đều hợp lệ đối với **TS**.  
```ts
const a = 5
const a: number = 5
const a: any = 5
```
**TS** giúp **code** an toàn hơn nhưng vẫn cho bạn sự tự do nhất định, đối với những giá trị cố định, hay những giá trị khó có thể xác định **type** một cách chính xác, như **response** của **api** chẳng hạn, vẫn có cách để bạn không gặp khó khăn gì với **type check** cả. Tuy nhiên lưu ý là chỉ dùng **any** khi thực sự cần thiết thôi nhé.
### V. Hệ sinh thái đầy đủ
Đã là 2020 và mình gần như không gặp bất kỳ khó khăn gì đối với các **third-party denpendencies** khi sử dụng **typescript**. **React-Router**, **Redux**, **Lodash**, **Moment**, **Axios**, **Styled-components** hay các thư viện khác đều hỗ trợ **typescript** đầy đủ. Đôi khi sẽ có một vài thư viện nho nhỏ chưa hỗ trợ **typescript** nhưng chúng đều không đáng kể.   
**Eslint** cho **typescript** cũng rất đơn giản để sử dụng, gần như không khác gì so với bình thường cả.  
Về **Tool** phát triển, mình dùng **VSCode** và **Editor** này hỗ trợ **typescript** rất tốt, vì như mình đã nói ở trên, bản nó còn được **microsoft** sử dụng **typescript** để viết lên cơ mà.
### VI. Redux sẽ trở nên phức tạp
Tại sao mình lại nói phức tạp, vì bản thân **redux** đã bị nhiều người ghét vì nó phức tạp rồi, để tạo một chức năng đơn giản, chúng ta khai báo một **action types**, sau đó khai báo **actions**, rồi khai báo **reducer**, sau đó khai báo hàm **mapStateToProps** và đưa **component** vào hàm **connect** của **react-redux**,...   
Mình đã thử thêm **redux** vào ứng dụng **react + typescript**, mình làm theo hướng dẫn trên **document** của **[redux](https://redux.js.org/recipes/usage-with-typescript/)**, và mình đã bỏ cuộc vì việc khai báo **type** cho từng **action** và kiểm tra **type** của **action** trong **reducer** khiến **code** rườm rà hơn rất nhiều. Có thể mình đã làm sai ở đâu đó, chắc sau này sẽ có dịp thử lại, nhưng hiện tại thì mình khá là **happy** với **mobx**.
### VII. Mọi thứ vẫn như vậy 
Có một điều là sau khi quen với cú pháp của **TS** rồi, mình không cảm thấy có gì khác giữa **React + JS** và **React + TS** cả, mọi thứ vẫn vậy, **TS** không phải là ngôn ngữ lập trình mới, được sinh ra để thay thế **JS** mà nó chỉ đơn thuần là một công cụ hỗ trợ giúp phát triển ứng dụng **JS**. Khi phát triển ứng dụng **web** bằng **React** thì thứ chúng ta quan tâm hằng ngày là **component, prop, state, html, css v.v...** còn **typescript** chỉ như một thứ gia vị được thêm vào mà thôi. Mình thấy rằng **TS** thực sự tốt cũng như **JS** không gặp bất lợi gì quá lớn cả, nó vẫn đáng để chúng ta tin tưởng.