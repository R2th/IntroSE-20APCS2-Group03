Ở [bài viết trước](https://viblo.asia/p/tim-hieu-ve-webpacker-o-rails-6-part-1-tong-quan-ve-webpacker-va-packs-trong-rails-6-V3m5WP8QKO7), chúng ta đã nắm được Webpacker là gì và Rails 6 đã tích hợp nó như thế nào. Trong bài viết ngày hôm nay, mình sẽ giới thiệu cho các bạn về cách để sử dụng các `packs` của Webpacker Rails 6.

Một ứng dụng Rails 6 mới sẽ tạo những file sau ở trong thư mục `app/javascript` - *nơi chứa toàn bộ code JavaScript của chúng ta*. 

```
▶ tree app/javascript
app/javascript
├── channels
│   ├── consumer.js
│   └── index.js
└── packs
    └── application.js

2 directories, 3 files
```

Thư mục `packs` sẽ chứa những `entry points` cho webpack tiến hành việc compile. `application.js` ở đây cũng chính là 1  `entry points` mặc định được Rails 6 sinh ra, nó cũng tương ứng với file `app/assets/application.js` được sinh ra bởi asset pipeline. Đối với một app Rails 6 mới thì mặc định file `application.js` sẽ chứa nội dung sau: 

```javascript
require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
```

Câu `require` không chỉ đơn giản là require một files hay package như của asset pipeline. Câu lệnh này có thể require những package NPM cũng như là các module ở chúng ta đã viết ở local. Vì dụ, 3 dòng đầu tiên ở file `application.js` bên trên dùng để require 3 package NPM - Rails UJS, Turbolinks và Active Storage. Trong khi đó dòng cuối require module `app/javascript/channels/index.js`

> Webpack sẽ luôn tìm đến file index.js ở trong thư mục mà chúng ta require

```javascript
// app/javascript/packs/application.js

import React from 'react'
import ReactDOM from 'react-dom'
```

Ở đây chúng ta chỉ việc gọi `require` hoặc `import` với tên package hoặc tên thư mục.

Chúng ta hoàn toàn có thể viết code JS liên quan đến ứng dụng vào file pack nhưng theo mình thì tốt nhất bạn nên giữ những file pack sạch nhất có thể bằng việc chỉ sử dụng `require` hoặc `import` và để code JS ra ngoài thư mục `app/javascript/packs`.

> Giữ file pack tối giản hết mức có thể và chỉ sử dụng để import code.

Đối với một project React, chúng ta chỉ làm việc thêm base component vào DOM ở trong file pack và quản lý toàn bộ component khác ở trong thư mục `app/javascript` và nằm ngoài thư mục `packs`.

```javascript
// app/javascript/packs/application.js
import ReactDOM from 'react-dom'
import HelloWorld from '../components/hello'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <HelloWorld name="Webpack" />,
    document.body.appendChild(document.createElement('div')),
  )
})
```

```javascript
// app/javascript/components/hello.js

import React from 'react'
import PropTypes from 'prop-types'

const HelloWorld = props => (
  <div>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

export default HelloWorld
```

Webpacker khá là tự do trong khoản quản lý và sắp xếp code JavaScript. Chỉ có một rule duy nhất là thư mục `packs` là 1 thư mục đặc biệt, và nó sẽ được coi là `entry points` bởi Webpacker. Còn việc còn lại hoàn toàn phụ thuộc vào bạn. Nếu như hệ thống của bạn có nhiều namespace thì bạn có thể sử dụng pack `application` là pack mặc định và  pack `admin` dùng để chứa toàn bộ phần code liên quan đến namespace `admin`, tương tự với `user`. Trong một ứng dụng React thì bạn cũng nên để 1 thư mục `components` (pack `components`) để chứa toàn bộ các React components

Khi sử dụng Sprockets, chúng ta phải thêm thủ công từng loại file để Rails precompile vào danh sách asset precompile.

```ruby
Rails.application.config.assets.precompile += %w[admin.js]
```

Nhưng vì Webpacker đã coi toàn bộ thư mục `packs` là `entry points` nên chúng ta không cần phải thêm pack mới vào danh sách precompile nữa. Cứ thế là chạy thôi.

Tổng quan lại thì mình có thể nói rằng chúng ta cần coi thư mục `app/javascript` như một ứng dụng nằm trong một ứng dụng khác. Cho nên chúng ta cần sắp xếp thư mục một cách rõ ràng.

Ví dụ về một hệ thống mình đã làm, cấu trúc thư mục `app/javascript` sẽ như sau:

```
app/javascript
├── admin
├── channels
├── user
└── packs
    ├── admin.js
    ├── application.js
    └── user.js
```

Và khi chúng ta compile JavaScript thì output sẽ như sau:

```
▶ ./bin/webpack-dev-server
ℹ ｢wds｣: Project is running at http://localhost:3035/
ℹ ｢wds｣: webpack output is served from /packs/
ℹ ｢wds｣: Content not from webpack is served from /Users/prathamesh/Projects/scratch/better_hn/public/packs
ℹ ｢wds｣: 404s will fallback to /index.html
ℹ ｢wdm｣: Hash: 5387bbdba96d7150c792
Version: webpack 4.39.2
Time: 2753ms
Built at: 20/03/2020 04:23:20 PM
                                     Asset       Size       Chunks             Chunk Names
          js/admin-67dd60bc5c69e9e06cc3.js    385 KiB        admin  [emitted]  admin
      js/admin-67dd60bc5c69e9e06cc3.js.map    434 KiB        admin  [emitted]  admin
    js/application-d351b587b51ad82444e4.js    505 KiB  application  [emitted]  application
js/application-d351b587b51ad82444e4.js.map    569 KiB  application  [emitted]  application
           js/user-1c7b2341998332589ec0.js    385 KiB         user  [emitted]  user
       js/user-1c7b2341998332589ec0.js.map    434 KiB         user  [emitted]  user
                             manifest.json  958 bytes               [emitted]
```

Bên cạnh việc sinh ra nhưng file được đánh dấu (fingerprinted files) và file map, Webpacker cũng sinh ra một file `manifest.json` để liệt kê ra thông tin về tất cả các file đựợc tạo ra trong quá trình compile. Rails dùng file này để tìm và convert  thành file đã được compile tương thích với tên của nó trong câu `javascript_pack_tag`. Ví dụ, `javascript_pack_tag('admin')` sẽ được convert thành `js/admin-67dd60bc5c69e9e06cc3.js`. File `manifest.json` của mình ở đây sẽ có dạng thế này: 

```json
{
  "admin.js": "/packs/js/admin-67dd60bc5c69e9e06cc3.js",
  "admin.js.map": "/packs/js/admin-67dd60bc5c69e9e06cc3.js.map",
  "application.js": "/packs/js/application-d351b587b51ad82444e4.js",
  "application.js.map": "/packs/js/application-d351b587b51ad82444e4.js.map",
  "entrypoints": {
    "admin": {
      "js": [
        "/packs/js/admin-67dd60bc5c69e9e06cc3.js"
      ],
      "js.map": [
        "/packs/js/admin-67dd60bc5c69e9e06cc3.js.map"
      ]
    },
    "application": {
      "js": [
        "/packs/js/application-d351b587b51ad82444e4.js"
      ],
      "js.map": [
        "/packs/js/application-d351b587b51ad82444e4.js.map"
      ]
    },
    "user": {
      "js": [
        "/packs/js/user-1c7b2341998332589ec0.js"
      ],
      "js.map": [
        "/packs/js/user-1c7b2341998332589ec0.js.map"
      ]
    }
  },
  "user.js": "/packs/js/user-1c7b2341998332589ec0.js",
  "user.js.map": "/packs/js/user-1c7b2341998332589ec0.js.map"
}%
```

Bây giờ chúng ta đã sẵn sàng sử dụng `packs`, bây giờ thì chúng ta sẽ sử dụng chúng ở những file layout của Rails. Ở trường hợp bên trên, pack `user`sẽ chỉ được sử dụng ở layout `user` và được tách rời với layout `admin` (sử dụng pack `admin`) và sử dụng chung pack `application`. Để sử dụng pack thì chúng ta chỉ việc include nó trong file layout như sau:

Layout `admin`:
```html
<body>
  <%= javascript_pack_tag "application" %>
  <%= javascript_pack_tag "admin" %>
</body>
```

Layout `user`:
```html
<body>
  <%= javascript_pack_tag "application" %>
  <%= javascript_pack_tag "user" %>
</body>
```

**Tổng kết:**


- Giữ file pack đơn giản, chỉ dùng để import code cần thiết từ file khác
- Chỉ những file pack được ở trong thư mục `app/javascript/packs`
- Bạn có thể thoải mái sắp xếp code JavaScript theo ý bạn ở trong thư mục `app/javascript`
- Hãy để ý đến kích thước của bundle bằng việc theo dõi ouput của Webpack
- Sắp xếp các file pack theo yêu cầu và chức năng của từng file

Cảm ơn các bạn đã đọc. (bow)

*Nguồn: [Master the "packs" in Webpacker - Prathamesh Sonpatki](https://prathamesh.tech/2019/09/24/mastering-packs-in-webpacker/)*