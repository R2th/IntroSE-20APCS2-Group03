Nếu  bạn bắt đầu học javascript trong những năm gần đây, hoặc sử dụng một số font-end frameworks/libraries như `React` thì việc sử dụng `import` và `export` là rất thường xuyên. Cho những bạn không để ý tới cú pháp sử dụng module mới của ES6 thì có thể phân biệt và hiểu được sự khác nhau giữa export by named và export default, nhưng bạn có thể missed cách import bằng `alias` và sử dụng chúng như thế nào cho hiệu quả trong project.

### Tóm tắt cơ bản về `import` và `export`
Javascript module (có thể ví dụ nó như một file js *my-module.js*) có thể export các functions, objects, constants cho những module bên ngoài sử dụng. Đây là những quy ước cơ bản khi làm việc với javascript module (code reuse, separation of concerns). Trong các modules, chúng ta có thể exports bằng 2 cách sau:

1. Sử dụng `export` riêng cho từng functions, objects.
2. Sử dụng `export default` cho một function hoặc object.

Khi một module cần sử dụng các functions, objetcs từ một module khác, thì có thể sử dụng một số cách import sau:

1. Import tất cả exports vào trong module hiện tại: `import * from "my-module.js"`
2. Import một số function, object cụ thể: `import { func1, obj2 } from "my-module.js"`
3. Import function đã export default: `import func from "my-module.js"`
4. Run global code của module nhưng không import bất cứ thứ gì: `import "my-module.js"`
5. Import dynamic một module: `import("my-module.js").then((module) => { //...do something })`

Hầu hết developers, đặc biệt là React developer thì chúng ta hay sử dụng import một function theo tên và import default. Có một số trường hợp bạn có thể sử dụng import all hay import dynamic (mình sẽ có bài giải thích về những cách import này).

Import alias có thể giải quyết hiệu quả trong trong một số trường hợp, thay vì sử dụng named đã định nghĩa ở exporting module, bạn có thể sử dụng một tên khác tự định nghĩa trong module đang sử dụng export đó.

### Vì sao sử dụng import alias lại quan trọng?
Nhiều trường hợp chúng ta import function từ nhiều module khác nhau nhưng nhưng chúng export cùng một named. Lúc đó javascript báo lỗi như sau:

```js
Failed to compile.
/Users/my_name/Project/One/src/pages/index.js
SyntaxError: /Users/my_name/Project/One/src/pages/index.js: Identifier 'Card' has already been declared (6:9)
  4 | import { Button } from '../components/button'
  5 | import { Card } from '../components/card'
> 6 | import { Card } from 'react-elements'
```

Một trong số những trường hợp hay gặp vấn đề này là chúng ta sử dụng import các component của một library bên ngoài.

Cho ví dụ. Sử dụng trực tiếp component library trong page-level của project thông thường sẽ không được recommended, như vâỵ sẽ khó khăn cho việc update và maintain component sau này. Thay vào đó chúng ta thường tạo ra các custom component cho phù hợp với yêu cầu dự án như sau:

```js
// Card.js in project/src/components/card
import { Card } from "third-library"
const Card = () => (
    // using third-library card 
    // custom something for your project needs
)
const ListCard = () => (
    // like above
)
export { Card, ListCard }
// ---
// Index.js in project/src/pages
import { Card } from '.../components/card'
// ... index page code
```

Ở ví dụ trên thì chúng ta có thể thấy sẽ báo lỗi không thể compile Card.js bởi vì khai báo bị lỗi (có 2 biến cùng tên Card)

### Sử dụng import alias để giải quyết vấn đề
Bây giờ chúng ta sẽ sử dụng cách import alias để giải quyết vấn đề trên, cho phép chúng ta import các component của exporting module có cùng tên.

Khi import một component theo named từ một module:
```js
// my-module.js
// ... code ..
export { Something1, Something2}
```

Chúng ta có thể sử dụng alias với keyword `as`:
```js
import { Something1 as MySomething } from "my-module.js"
```

Khi importing một default export:
```js
// my-module.js
// ... code ..
export default Something
```

Chúng ta có thể sử dụng alias trực tiếp:
```js
import MySomething from "my-module.js"
```

Với những ví dụ ở trên, chúng ta có thể sử dụng import alias để giải quyết error compile import Card của bài toán ban đầu:
```js
// Card.js in project/src/components/card
import { Card as LibCard } from "third-library"
const Card = () => (
    // using third-library card 
    // custom something for your project needs
)
const ListCard = () => (
    // like above
)
export { Card, ListCard }
```

Nếu Button được export default, chúng ta cũng có thể sử dụng alias:
```js
// Button.js in project/src/components/button
import LibButton from "library-button"
const MyButton = () => (
    // code
)
export default MyButton
// ---
// Index.js in project/src/pages
import Button from '.../components/button/Button.js'
// ... index page code
```

### Kết luận
Hy vong các bạn sử dụng hiệu quả import alias trong các projects của mình, ở những bài tiếp theo mình sẽ giải thích về import all và dynamic import, cám ơn mọi người đã theo dõi!