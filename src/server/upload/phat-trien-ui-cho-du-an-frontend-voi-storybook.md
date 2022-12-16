![](https://images.viblo.asia/16b69ae9-bc85-4876-a8f0-06817d1c2495.png)

### 1. Intro

**Storybook** là một công cụ thiết kế và phát triển những UI Components cho ứng dụng của bạn trên một môi trường hoàn toàn biệt lập. **Storybook** mang lại trải nghiện mới khi thiết kế những UI components tưởng chừng chỉ dừng lại ở khâu design trước khi chuyển sang giai đoạn code Frontend.

![](https://images.viblo.asia/176f6963-0240-4fc6-a166-57a260e1bd0d.jpg)

Ngày nay khi phát triển một dự án, chúng ta dành rất nhiểu thời gian để xây dựng những UI Components. Hơn hết, chúng ta cần chú trọng làm rành mạch các thuộc tính cũng như hiển thị hết các tính năng cần có (props and states) của những Components này...ngay từ **điểm khởi đầu**...Không thể phủ nhận đó là cái khó trong một dự án Frontend!

Dựa vào design ta có thể hoàn thiện một Component, hay thậm chí hoàn thành cả một Page. Nhưng bạn có chắc chắn chất lượng code vừa hoàn thiện đã cover toàn bộ các trường hợp? Những người đồng hành có tái sử dụng được hay bạn không viết lại một cái đã có 80% rồi?... Tất cả liệu đã tường minh?...

**Storybook** đã có ~28k star ở thời điểm này và nó được sử dụng rộng rãi bởi những ông lớn như Airbnb, Coursera, LonelyPlanet. Hãy bắt đầu khai thác lợi ích mà **Storybook** có thể mang lại.

### 2. Concept of Storybook

[**Storybook**](https://storybook.js.org/basics/quick-start-guide/) được phát triển dựa trên concept **UI Harness** của PhilCockfield (nay đã deprecated) mới đầu chỉ phát triển cho các ứng dụng **React**, sau đã mở rộng cho Vue và Angular. Các bạn có thể theo dõi Start guide Docs chính thức của package ở trên tương ứng từng framework.

Trong giới hạn của mình ở bài viết này (và có thể những bài sau) mình sẽ nói riêng về [**React Storybook**](https://storybook.js.org/basics/guide-react/).

Hãy lấy ví dụ trực quan, hãy tưởng tượng bạn đối mặt với một trong hai trường hợp sau trong dự án Frontend:

  - **Trường hợp lý tưởng**: Design đã xong 98%, đã có StyleGuide, gần như các phần core là cố định sẽ không có thay đổi lớn nào.
  - **Trường hợp éo le**: Design mới chỉ hoàn thành 60%, dự án lên kế hoạch làm những phần chính Frontend song song với design, vừa làm vừa cập nhật.

Trong cả hai trường hợp trên, mặc dù có được đưa vào **bất cứ hoàn cảnh nào**, chúng ta cũng sẽ chọn một cách làm 'chưa đúng', tôi sẽ nói rõ điều 'chưa đúng' này ở dưới đây:

Trường hợp éo le, bạn hoàn toàn có lý do để chia nhau ra code những page đã hoàn thành trước, làm được gì hay được đó, đơn giản vì chưa có StyleGuide cover toàn bộ dự án. Nhưng thực tế là dù có được đưa vào trường hợp lý tưởng, chúng ta cũng bỏ qua bước thiết kế từng Component mà thường bắt tay ngay vào từng page cụ thể, và chỉ xem StyleGuide như một tài liệu tham khảo, người trước làm chưa đủ thì người sau xem lại và bổ sung.

Cách này có nhiều rủi ro nhưng lại được áp dụng, lời lý giải có thể chấp nhận được:
  - Các task hoàn thành page cụ thể mang lại 'cảm giác' value lớn hơn và dự án đang đi nhanh hơn.
  - Thiết kế từng UI Component xong show ra như thế nào cho ổn? Rất khó có thể có một Template sẵn để áp dụng. Tạo riêng một route trong dự án để show UI Components?
  - Ai làm phần này? Một người làm thì quá nặng, chia ra cả team làm thì quá rối.

**Storybook** sẽ là một lời giải cho bài toán này...
- Chúng ta sẽ gọi các UI Components vừa thực hiện ra và gán cho nó một 'câu chuyện' - Đó chính là hiển thị toàn bộ các props và state. Bất cứ ai khi viết xong Components của mình đều có thể tạo ra câu chuyện của mình được, hoàn toàn không conflict.

- Những câu chuyện này hiển thị đầy đủ và **độc lập** - **Storybook** chạy ở một port riêng, có thể chạy song song với dự án. Việc này giúp ích chúng ta rất nhiều khi chỉnh sửa và theo dõi trạng thái của các elements, rất trực quan và nhanh chóng.

Khi run **Storybook** sẽ chạy một web server riêng ở port 6006 và có giao diện như dưới đây:
```
npm run storybook
```

![](https://images.viblo.asia/73ceed38-7d5a-4d65-b0f6-a7284e505871.png)

Một Component được đưa vào kịch bản rất đơn giản dưới đây:

```js
import React from 'react'
import YourComponent from '../YourComponent'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

storiesOf('YourComponent', module)
  .add('state 1: active', () => (
    <YourComponent onClick={action('clicked')}>
      This component is activated
    </YourComponent>
  ))
  .add('state 2: disabled', () => (
    <YourComponent disabled>
      This component has been disabled
    </YourComponent>
  ))
```

Một ví dụ cụ thể bạn viết stories cho **MainSection** của TodoMVC huyền thoại:

```js
import React from 'react'
import MainSection from '../MainSection'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

storiesOf('MainSection', module)
  .add('all active', () => {
    const todoItems = [
      { id: 'one', text: 'Item One', completed: false },
      { id: 'two', text: 'Item Two', completed: false },
    ];

    return getMainSection(todoItems)
  })
  .add('some completed', () => {
    const todoItems = [
      { id: 'one', text: 'Item One', completed: false },
      { id: 'two', text: 'Item Two', completed: true },
    ];

    return getMainSection(todoItems)
  })
  .add('all completed', () => {
    const todoItems = [
      { id: 'one', text: 'Item One', completed: true },
      { id: 'two', text: 'Item Two', completed: true },
    ];

    return getMainSection(todoItems)
  });

function getMainSection(todos) {
  const actions = {
    clearCompleted: action('clearCompleted'),
    completeAll: action('completeAll')
  };

  return (
    <div className="todoapp">
      <MainSection todos={todos} actions={actions} />
    </div>
  )
}
```

Đây là output trên **Storybook**!!!

![](https://images.viblo.asia/16277b40-916d-4f6e-be6d-0f388b1ab0a6.gif)

**Concept của Storybook luôn luôn đòi hỏi** chúng ta phải hoàn thành, bổ sung Styleguide trước tất cả các công việc còn lại. Đây là cách tốt nhất để phát triển và document ứng dụng. Hãy xem những Styleguide ví dụ điển hình từ [Coursera](https://building.coursera.org/coursera-ui/) hay [GumGum](http://gumdrops.gumgum.com/index.html)

### 3. Storybook is powerful

**Storybook** sẽ là một trợ lực đáng giá từ những ngày dự án còn trong trứng nước với những features được khẳng định:

- Được build với những lib/framework lớn đương đại: Angular, React, Vue.
- Môi trường phát triển cho từng Component riêng biệt, tách rời, base trên rất nhiều iframe. Giao diện đơn giản, thống nhất, dễ tiếp cận.
- Suport **HMR**, bất kể Component của bạn là gì.
- Chạy bên trong dự án của bạn và có thể sử dụng server static.
- Extendable với đa dạng plugin (phong phú và chi tiết cho stories của bạn, cũng như có thể đặt hoàn cảnh test...)

Mình rất hi vọng đây sẽ là một giải pháp mới khi tiếp cận những dự án Frontend SPA!

### 4. Ref
- [Official docs](https://storybook.js.org/basics/guide-react/)
- [Introducing React Storybook](https://medium.com/kadira-voice/introducing-react-storybook-ec27f28de1e2)
- [LearnStoryBook](/www.learnstorybook.com/)