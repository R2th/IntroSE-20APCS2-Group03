## Chuyển đổi JSX là gì?

Browsers không hiểu được mã JSX, vì vậy hầu hết người dùng React dựa vào trình biên dịch như Babel hoặc TypeScript để chuyển đổi mã JSX thành JavaScript thông thường. Nhiều bộ công cụ được cấu hình sẵn như Create React App hoặc Next.js cũng bao gồm một biến đổi JSX.

Ở bản release React 17, đã có vài cải tiến đối với chuyển đổi JSX, nhưng không phá vỡ các thiết lập hiện có. 

Việc nâng cấp bản chuyển đổi mới đem lại những lợi ích như sau:

* Với biến đổi mới, bạn có thể sử dụng JSX mà không cần import React.
* Tùy thuộc vào thiết lập của bạn, đầu ra đã biên dịch của nó có thể cải thiện một chút kích thước gói.
* Nó sẽ cho phép các cải tiến trong tương lai giúp giảm số lượng các khái niệm bạn cần để học React.

Nâng cấp này sẽ không thay đổi cú pháp JSX và không bắt buộc. Chuyển đổi JSX cũ sẽ tiếp tục hoạt động như bình thường và không có kế hoạch loại bỏ hỗ trợ cho nó.

Bây giờ chúng ta hãy xem xét kỹ hơn sự khác biệt giữa chuyển đổi JSX cũ và mới.

## Điều gì khác biệt trong biến đổi JSX mới 

Khi bạn sử dụng JSX, trình biên dịch sẽ chuyển nó thành các lệnh gọi hàm React mà trình duyệt có thể hiểu được. Biến đổi JSX cũ đã biến JSX thành các lệnh gọi `React.createElement (...)`.
Ví dụ, hãy nhìn vào đoạn code sau đây:

```
import React from 'react';

function App() {
  return <h1>Hello World</h1>;
}
```

Thì ở biến đổi JSX cũ sẽ chuyển thành mã JavasScript thông thường:

```
import React from 'react';

function App() {
  return React.createElement('h1', null, 'Hello world');
}
```

Tuy nhiên, điều này không hoàn hảo:

Vì JSX đã được biên dịch thành `React.createElement`, nên React cần phải có trong phạm vi nếu bạn sử dụng JSX.
Có một số cải tiến và đơn giản hóa hiệu suất mà React.createElement không cho phép.
Để giải quyết những vấn đề này, React 17 giới thiệu hai điểm mới cho gói React được sử dụng bởi các trình biên dịch như Babel và TypeScript. Thay vì chuyển đổi JSX thành React.createElement, chuyển đổi JSX mới sẽ tự động import các functions đặc biệt từ các React pakage và gọi chúng.

Giả sử rằng mã nguồn của bạn trông giống như sau:
```

function App() {
  return <h1>Hello World</h1>;
}
```

Và đây là những gì ở biến đổi JSX biên dịch nó:

```
// Inserted by a compiler (don't import it yourself!)
import {jsx as _jsx} from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}
```

> Lưu ý rằng mã gốc không cần phải import React để sử dụng JSX nữa! (Nhưng chúng ta vẫn cần import React để sử dụng Hooks hoặc export khác mà React cung cấp.)

Thay đổi này hoàn toàn tương thích với tất cả mã JSX hiện có, vì vậy bạn sẽ không phải thay đổi các components của mình. Nếu tò mò, bạn có thể xem kỹ thuật [RFC](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#detailed-design) để biết thêm chi tiết về cách hoạt động của biến đổi mới.

> Các hàm bên trong `react/jsx-runtime` và `react/jsx-dev-runtime` chỉ được sử dụng bởi biến đổi trình biên dịch. Nếu bạn cần tạo thủ công các elements trong code của mình, bạn nên tiếp tục sử dụng `React.createElement`. Nó sẽ tiếp tục hoạt động và không biến mất.

## Làm thế nào để nâng cấp lên biến đổi JSX mới?

Nếu bạn chưa sẵn sàng nâng cấp lên chuyển đổi JSX mới hoặc nếu bạn đang sử dụng JSX cho một thư viện khác, đừng lo lắng. Chuyển đổi cũ sẽ không bị xóa và sẽ tiếp tục được hỗ trợ.

Nếu bạn muốn nâng cấp, bạn sẽ cần hai thứ:

* Một phiên bản của React hỗ trợ chuyển đổi mới (React 17 RC trở lên hỗ trợ nó, ngoài ra cũng có bản phát hành React 16.14.0, React 15.7.0 và React 0.14.10 cho những người vẫn đang sử dụng các phiên bản chính cũ hơn) .
* Một trình biên dịch tương thích (xem hướng dẫn cho các công cụ khác nhau bên dưới).

### Create React App
Create React App 4.0.0+ sử dụng biến đổi mới cho các phiên bản React tương thích.

### Next.js
Next.js v9.5.3+ sử dụng biến đổi mới cho các phiên bản React tương thích.

### Gatsby
Gatsby v2.24.5+ sử dụng biến đổi mới cho các phiên bản React tương thích.

> Lưu ý: Nếu bạn gặp lỗi [Gatsby](https://github.com/gatsbyjs/gatsby/issues/26979) sau khi upgrade lên React 17 RC thì chạy lệnh: `npm update` để fix nó.

### Manual Babel Setup

Hỗ trợ cho biến đổi JSX mới có sẵn trong Babel v7.9.0 trở lên.
Trước tiên, bạn cần update Babel và plugin mới nhất.

* Nếu bạn đang sử dụng  `@babel/plugin-transform-react-jsx`:

```
# for npm users
npm update @babel/core @babel/plugin-transform-react-jsx
```

```
# for yarn users
yarn upgrade @babel/core @babel/plugin-transform-react-jsx
```

* Nếu bạn đang sử dụng `@babel/preset-react`:

```
# for npm users
npm update @babel/core @babel/preset-react
```

```
# for yarn users
yarn upgrade @babel/core @babel/preset-react
```

Hiện tại, biến đổi cũ `{"runtime": "classic"}` là tùy chọn mặc định. Để bật chuyển đổi mới, bạn có thể chuyển `{"runtime": "automatic"}` dưới dạng tùy chọn cho `@babel/plugin-transform-react-jsx` hoặc `@babel/preset-react`:

```
// Nếu bạn sử dụng @babel/preset-react
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "automatic"
    }]
  ]
}
```

```
// Nếu bạn sử dụng @babel/plugin-transform-react-jsx
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "runtime": "automatic"
    }]
  ]
}
```

Bắt đầu từ Babel 8, `"automatic"` sẽ là thời gian chạy mặc định cho cả hai plugin. Để biết thêm thông tin, hãy xem tài liệu Babel cho [@babel/plugin-biến đổi-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) và [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react).

> Ghi chú
Nếu bạn sử dụng JSX với một thư viện không phải React, bạn có thể sử dụng tùy chọn importSource để import từ thư viện đó thay thế - miễn là nó cung cấp các điểm cần thiết. Ngoài ra, bạn có thể tiếp tục sử dụng biến đổi cổ điển vẫn tiếp tục được hỗ trợ.
> 
> Nếu bạn là tác giả thư viện và bạn đang triển khai `/jsx-runtime` cho thư viện của mình, hãy lưu ý rằng có một trường hợp mà ngay cả biến đổi mới cũng phải quay lại createElement để tương thích ngược. Trong trường hợp đó, nó sẽ tự động import `createElement` trực tiếp từ điểm root do importSource chỉ định.

### ESLint

Nếu bạn đang sử dụng `[eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)`, thì các rule `react/jsx-uses-react` và `react/react-in-jsx-scope` không cần thiết nữa, bạn có thể tắt hoặc xóa nó đi.

```
{
  // ...
  "rules": {
    // ...
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  }
}
```

### TypeScript
TypeScript supports biến đổi JSX mới ở vesion v4.1 trở lên.

### Flow
Flow supports biến đổi JSX mới cho version v0.126.0 trở lên, bằng cách thêm `react.runtime=automatic` vào Flow configuration options.

## Xóa các React Imports không được sử dụng

Bởi vì biến đổi JSX mới sẽ tự động nhập các hàm `react/jsx-runtime` cần thiết, React sẽ không cần phải nằm trong phạm vi khi bạn sử dụng JSX. Điều này có thể dẫn đến việc import React không được sử dụng trong code của bạn. Giữ chúng không có hại gì, nhưng nếu bạn muốn xóa chúng, bạn nên chạy tập lệnh “codemod” để xóa chúng tự động:

```
cd your_project
npx react-codemod update-react-imports
```

> Lư ý: 
> Nếu bạn gặp lỗi khi chạy `codemod`, hãy thử chỉ định một phương ngữ JavaScript khác khi `npx react-codemod update-react-import` yêu cầu bạn chọn một. Đặc biệt, tại thời điểm này, cài đặt “JavaScript với Flow” hỗ trợ cú pháp mới hơn cài đặt “JavaScript” ngay cả khi bạn không sử dụng Flow. [Gửi vấn đề](https://github.com/reactjs/react-codemod/issues) nếu bạn gặp sự cố.
>
>  Hãy nhớ rằng đầu ra codemod không phải lúc nào cũng khớp với kiểu mã hóa của dự án, vì vậy bạn có thể muốn chạy Prettier sau khi codemod kết thúc để có định dạng nhất quán.

Chạy codemod này sẽ:

* Xóa tất cả các lần import React không sử dụng do nâng cấp lên chuyển đổi JSX mới.
* Thay đổi tất cả các defaults import React (tức là import React từ "react") thành các destructured named imports (ví dụ: `import {useState} from "react"`) là kiểu được ưa thích trong tương lai. Bộ mã hóa này sẽ không ảnh hưởng đến các lần import namespace hiện có (tức là `import * as React from "react"`), đây cũng là một kiểu hợp lệ. Các default imports sẽ tiếp tục hoạt động trong React 17, nhưng về lâu dài, thì bạn nên thay đổi chúng.

Ví dụ,

```
import React from 'react';

function App() {
  return <h1>Hello World</h1>;
}
```

sẽ thay đổi thành:

```
function App() {
  return <h1>Hello World</h1>;
}
```

Nếu bạn import from React khác — ví dụ, một Hook — khi chạy codemod sẽ convert thành một named import.

Ví dụ:

```
import React from 'react';

function App() {
  const [text, setText] = React.useState('Hello World');
  return <h1>{text}</h1>;
}
```

sẽ thay đổi thành:

```
import { useState } from 'react';

function App() {
  const [text, setText] = useState('Hello World');
  return <h1>{text}</h1>;
}
```

Ngoài việc dọn dẹp những import không sủ dụng, thì điều này sẽ giúp bạn chuẩn bị cho một phiên bản React chính trong tương lai (không phải React 17)-nó sẽ hES Modules và không có bảndefault export.

Trên đây là bài giới thiệu và hướng dẫn sử dụng biến đổi JSX mới, được tham khảo từ bài [Introducing the New JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) của tác giả Luna Ruan, hy vọng bài viết sẽ giúp ích cho anh chị em.