![](https://images.viblo.asia/955fdb48-881d-443e-94b9-4fb3596e3abf.gif)  

Những lợi ích của **SVG** đã có rất nhiều bài viết nói đến một cách chi tiết. Mình chỉ dẫn chứng 3 tính chất tối ưu nhất để so sánh **SVG** với Raster types (.png, .gig, .jpeg) đó là
- **Scalable** (width/height nào cũng chiến được)
- **Size nhỏ gọn **(đơn vị byte cùng lắm là 1 hay 2 **kb** chứ đừng nói đến trăm **kb** hay **mb** như các raster types)
- **Tùy biến cao** (hmm... cái này... đúng không ta???)

>Với những đặc tính trên, **SVG** được sử đụng tuyệt đối hiệu quả cho các element đơn giản đặc biệt như các icon... Tuy nhiên ta thường chỉ mới khai thác được một phần sức mạnh của **SVG** khi rất ít khi tùy biến chúng. Thường các **SVG** được đưa vào trong dự án qua thẻ `<img />`, điều đó đã giảm thiểu khả năng tùy biến của **SVG** đơn cử như styling với CSS ở những trạng thái khác nhau. Với React chúng ta hoàn toàn có thể tạo ra những **SVG** Component rất linh động, khai thác toàn bộ thế mạnh của **SVG**

### 1. A pure SVG
Dưới đây là phần code của một file **SVG** chúng ta có thể xuất ra từ bất cứ phần mềm tạo **SVG** nào

```js
const SVG = () =>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
      <path d="some path here" fill="black" />
  </svg>
```

### 2. Promote to a Component

Với React, đơn giản khi thêm vào những `props` sẽ biến **SVG** thành một **Component** có thể render nhiều trạng thái màu sắc, kích thước hay có những custom classes...

```js
const SVG = () =>
  const SVG = ({
  style = {},
  fill = '#fff',
  width = '100%',
  className = '',
  height = '100%',
  viewBox = '0 0 32 32',
}) =>
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
      <path d="some path here" fill={fill} />
  </svg>
```
Hãy theo dõi [Ví dụ này](https://codesandbox.io/s/rm9nlk0k4n) để theo dõi sự tùy biến với Component trên. Giờ ta có thể fill màu hay fill stroke, set height, width... xả láng

Okie vậy ý tưởng chung khá là dễ hiểu, giờ ta chỉ cần giải quyết việc render nhiều file **SVG** khác nhau cũng như tạo một file SVG có thể tùy biến hiệu quả (fill đúng space, color đúng stroke, nở nang thì đúng dự tính) là như thế nào. Đó cũng là mục đích đơn giản của bài viết này...

### 3. A good looking SVG
Đầu tiên chúng ta cần hiểu là SVG nào được coi là tối ưu để promote lên làm React Component. Hãy theo dõi ảnh dưới đây và đối chiếu với [ví dụ]((https://codesandbox.io/s/rm9nlk0k4n)) phía trên để hiểu rõ tại sao ta có thể quản lý được các thuộc tính của một path.

![](https://images.viblo.asia/d8969504-42a7-4d48-a860-832874e77ca1.png)

Hãy so sánh hai hình ảnh icon Truck.svg được mở ra bởi phần mềm đồ họa. Icon được tối ưu ở phía trên, icon chưa được tối ưu phía dưới.

>Icon tối ưu **đã được united (composed) thành một path duy nhất dưới dạng outline**.

Điều này có ảnh hưởng rất lớn khi quản lý file svg này với code, chúng ta chỉ có một path duy nhất, việc fill sẽ fill vào bên trong path, nếu có stroke (ở đây stroke của file trên bằng 0) thì cũng có một thuộc tính cho stroke duy nhất. Đó là lý do icon này được coi là tối ưu.

Hiển nhiên bạn vẫn có thể vẽ một icon như hình bên dưới. Icon này được cấu thành từ **5 paths** và chúng ở dạng stroke path hoặc fill hỗn tạp. Code svg của file này sẽ có 5 elements, thuộc tính fill của path sẽ fill lên các element bên dưới một cách không kiểm soát được (Thực ra bạn cũng vẫn có thể kiểm soát bằng cách truyền vào nhiều props, path nào dạng stroke thì truyền các props stroke1, stroke2; path nào cần fill thì truyền props fill1, fill2... ra bên ngoài. Nhưng như vậy thì icon của chúng ta...không còn simple nữa)

Ta đã hiểu như thế nào là một icon tốt, bây giờ hãy xử lý đến practice sao cho cấu trúc một file SVG như thế nào là hiệu quả.

### 4. A well-structured SVG Component
Chúng ta sẽ cấu trúc folder như sau:
```css
./icons
--/Phone.js
--/Trash.js
--/Messages.js
--/Envelope.js
--/Wifi.js
--/...
--/index.js
```

**index** là file trả về các Component qua một prop name, **index.js** sẽ có dạng như dưới đây:

```
import React from 'react';
import Phone from './Phone';
import Messages from './Messages';
const Icon = props => {
  switch(props.name) {
    case "phone":
      return <Phone {...props} />;
    case "messages":
      return <Messages {...props} />;
    default:
      return <div />;
  }
}
export default Icon;
```

Các bạn có thể theo dõi đầy đủ practice trên theo [link sau](https://codesandbox.io/s/vvzkzwvp10)

### 5. Final
Hi vọng dù đơn giản nhưng bạn cũng có thể tự xây dựng những icon SVG nhỏ mà đa năng trong ứng dụng React của mình.
Bài viết tham khảo: https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91