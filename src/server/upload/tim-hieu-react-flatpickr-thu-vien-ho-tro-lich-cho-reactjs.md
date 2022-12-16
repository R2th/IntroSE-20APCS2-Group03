# I>  Mở đầu
Mình đang tìm thư viện nào hỗ trợ dạng lịch cơ bản như các trang booking thì tìm thấy thư viện này [flatpickr](https://github.com/flatpickr/flatpickr) hỗ trợ rất tốt cho việc lịch, thử tìm hiểu thì nó còn có thư viện cho react [react-flatpickr](https://github.com/haoxins/react-flatpickr). Cùng mình tìm hiểu nó còn những gì hay, mà mình thấy nó đáp ứng tốt như thế

**Cài đặt nào**:
- Cài đặt 1 dự án mới với create-react-app:
```cmd
create-create-app calendar-demo
cd calendar-demo
yarn
yarn start
```
- Cài đặt  thư viện lịch nào
```cmd
yarn add react-flatpickr
```
Mặc định khi cài thư viện này nó đã cài thêm `flatpickr` rồi


# II> Bắt đầu tìm hiểu nào:
## 1> Dạng lịch cơ bản:
Giờ mình muốn có 1 lịch dạng cơ bản, khi chọn lịch thì sẽ thay đổi giá trị ô input:

```js
import React, {useState} from 'react';

// import thư viện và style tương ứng
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";

function Calendar() {
// state lưu trữ ngày tháng hiện tại
  const [date, setDate] = useState(new Date());

  return (
      <Flatpickr
        value={date} // giá trị ngày tháng
        // các option thêm cho thư viện
        options={{
          dateFormat: "d-m-Y" // format ngày giờ
        }}
        // event
        onChange={(dateSelect) => setDate(dateSelect)}
      />
  );
}

```
Thế là qua vài đoạn code đơn giản chúng ta đã có 1 lịch như hình dưới..... 
![](https://images.viblo.asia/c1a24214-e921-4a74-8d1a-d718957af617.PNG)

## 2> Tùy chỉnh với 1 số option hỗ trợ của thư viện 
 ### a> Theme:
- Nếu bạn đã chán theme mặc định của nó, có thể đổi qua các theme dark bằng cách đổi dòng này:
```
import "flatpickr/dist/themes/dark.css";
// import "flatpickr/dist/flatpickr.css";
```
Kết qủa:
![](https://images.viblo.asia/c77b9d3e-d024-4273-82c2-c7c9088a9f7b.PNG)

- Vẫn chưa thích, ta lại đổi qua theme `airbnb`
```
import "flatpickr/dist/themes/dark.css";
// import "flatpickr/dist/flatpickr.css";
```
![](https://images.viblo.asia/f3d59b8d-452c-40b3-a440-b317b2d4c501.PNG)
- Ngoài ra thư viện còn  hỗ trợ các loại theme này:
```
light.css
confetti.css
material_blue.css
material_green.css
material_orange.css
material_red.css
```

Tất nhiên là bạn có thể custom lại theme tùy vào sở thích của mình (bow)
### b> Các option và event của nó:
- dateFormat: như ví dụ ban đầu có định dạng `d-m-Y` tương ứng với ngày-tháng-năm (4 chữ số). Có thể tham khảo thêm tại đây:
https://flatpickr.js.org/formatting/
- Các event của nó: Các event hay dùng nhất vẫn là:
   - onReady: khi khởi tạo sẽ như thế nào
   -  onOpen: khi mở 
   - onClose: khi đóng
   - onDestroy: khi destroy

Tham khảo thêm tại đây
https://flatpickr.js.org/events/

- Các instance của nó (https://flatpickr.js.org/instance-methods-properties-elements/):
Có nhiều method cho bạn tương tấc với lịch như selectedDates dùng để lấy ngày đang chọn, clear dufngn để xóa lịch, jumpToDate nhảy tới ngày nào

- Có 1 option hay dùng khác để chọn ngày giờ là enableTime. Bạn đổi như bên dưới:
```js
<Flatpickr
        value={date}
        options={{
          dateFormat: "d-m-Y H:m",
          enableTime: true
        }}
        onChange={(dateSelect) => setDate(dateSelect)}
      />
```
kết quả:
![](https://images.viblo.asia/67d34928-0d4d-464c-b359-ae8ff6f83fa4.PNG)

### c>  Tùy chỉnh nâng cao với option plugin:
Ngoài ra thư viện còn có thể hỗ trợ tùy biến hơn với option plugin, bạn có thể dùng các plugin đang có của thư viện, tham khảo tại link này:https://flatpickr.js.org/plugins/

Mình chỉ giới thiệu 1 plugin dùng để chọn tháng năm:

```
import React, { useState } from "react";

import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
// import plugin
import MonthSelect from "flatpickr/dist/plugins/monthSelect/index";
import "flatpickr/dist/plugins/monthSelect/style.css";

function Calendar() {
  const [date, setDate] = useState(new Date());

  return (
      <Flatpickr
        value={date}
        options={{
        // import plugin
          plugins: [
            new MonthSelect({
              shorthand: true, //defaults to false
              dateFormat: "m-Y", //defaults to "F Y"
              altFormat: "F Y", //defaults to "F Y"
              theme: "dark" // defaults to "light"
            })
          ]
        }}
        onChange={(date) => {
          setDate({ date });
        }}
      />
  );
}
```

Kết quả:
![](https://images.viblo.asia/babae023-e06d-4f76-a859-7a92e69dc557.PNG)

# III> Kết luận:
Thư viện này hỗ trợ khá tốt các trường hợp datepicker hay gặp và có thể tùy biến được. Hy vọng với phần giới thiệu của mình bạn có thể thêm 1 lựa chọn để áp dụng vào công việc. Cảm ơn các bạn đã đọc

##### Tham khảo:
- Trang chủ flatpickr: https://github.com/flatpickr/flatpickr
- Trang chủ react-flatpickr: https://github.com/haoxins/react-flatpickr