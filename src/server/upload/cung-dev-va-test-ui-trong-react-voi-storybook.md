![alt](https://raw.githubusercontent.com/storybooks/storybook/master/media/storybook-intro.gif)
Nhìn cái hình gif nguy hiểm quá =)). OK thì hôm này mình sẽ giới thiệu với mọi người về một awesome library dùng để dev và test IU trong React, vue, Angular, ... Vâng như cái tiêu đề đó là [storybook](https://storybook.js.org/). Mình sẽ mô tả nhẹ về library này và sau đó sẽ đi vào setup nhé!<br/>
## 1. Mô tả về storybook
Storybook là một môi trường giúp chúng ta có thể dễ dàng dev và test UI. Với nó chúng ta có thể test UI với những state ảo và test xem UI sẽ hoạt động ra sao. Storybook nó chạy độc lập ngoài app và không cần lo lắng về dependencies và requirements.<br/><br/>

Nó cung cấp cho chúng ta một kho addon cũng như API để chúng ta có thể matching đúng nhất về UI. Hiện tại theo mình thấy được là nó đang support cho React, React Native, Vue và Angular.<br/><br/>


Được rồi phần giới thiệu chỉ có bấy nhiêu thôi. Tiếp theo hãy setup và tận hưởng những tính năng awsome của storybook nào!
## 2. Setup storybook 
Phần này mình sẽ ưu tiên setup cho React nhé mọi người!


Đầu tiên thì chúng ta sẽ cần một simple base React. Mình sẽ dùng [create-react-app](https://github.com/facebook/create-react-app) để create!<br/><br/>

Chúng ta sẽ chạy các lệnh này:
>npx create-react-app my-app
>
>cd my-app
>
>npm start
>
<br />

Xong rồi chúng ta đã có một base react. Khoan hãy start vội nhé vì chúng ta sẽ setup tiếp phần storybook và chạy lệnh của nó để chạy độc lập với app của mình nhé!<br/><br/>
OK tiếp theo là storybook chúng ta sẽ chạy các lệnh này:<br/>

>npm i -g @storybook/cli
>
>cd my-app
>
>getstorybook
>
<br/>

Nhớ là vào đúng cái base react của mình á nhé!<br/><br/>

OK Xong rồi đó mọi người! H chúng ta chỉ việc run lên nữa là ok!<br/><br/>
![alt](https://image.ibb.co/evFNpz/storybook_0.png)
![alt](https://image.ibb.co/c6cfbe/storybook.png)
<br/>
OK giao diện đã lên rồi!
Ở giao diện này chúng ta sẽ có ba view chính là:<br/>
=> 1. Cây component và những case test. Vd như trên hình có node `Button` và có hai case lần lượt là `with test` và `with some emoji`.<br/>
=> 2. View dùng để hiển thị UI và test hoạt động :v cái emoji nó bị lỗi mọi người thông cảm.
=> 3. Khung `Action Logger` đó sẽ hiển thị những action được thực hiện như change, click. Chúng ta sẽ dùng addon `addon-actions` của storybook để log ra.
<br/><br/>
Và để thuận lợi nhất là mỗi một component sẽ có một stories riêng nhé! Chúng ta sẽ config nó trong `.storybook/config.js` như này (thực chất nó đã config sẵn cho chúng ta rồi :v)<br/>
```javascript
import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
```
![alt](https://image.ibb.co/hxf8we/Bestyoucandpoitmeme.jpg)
## 3. Tổng kết
Vậy là mình đã giới thiệu với mọi người về storybook. Trong bài sau mình sẽ setup một base làm với nó, kết hợp sử dụng [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) (vì nó cực thích hợp với storybook =))), và bootstrap 4, ... Chúc mọi người có những trải nghiệm tuyệt vời với storybook nhé! Xin chào và hẹn gặp lại trong bài post tiếp theo.