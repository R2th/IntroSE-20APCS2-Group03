# Đo lường và biểu đồ hoá kích thước bundle

Để tiến hành đo lường và có một cái nhìn tổng quan về kích thước và những thành phần của bundle, chúng ta có thể dùng tool [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) để làm được việc này. Tool này sẽ sinh ra một biểu đồ khá chi tiết và dễ hiểu về các thành phần và kích thước của chúng trong bundle của chúng ta.

Cách dễ dàng nhất để setup và sử dụng là sinh ra một file `stats.json` bằng webpack và bật tool ấy lên với `npx`. 

```bash
webpack --profile --json > stats.json
# ví dụ đống file bundle của chúng ta để trong thư mục dist
npx webpack-bundle-analyzer stats.json dist/ 
```

`webpack-bundle-analyzer` sẽ mở một tab trình duyệt và hiển thị một biểu đồ như sau:

![](https://images.viblo.asia/ac89124e-9f5a-479d-ba9f-87fb6276585a.jpeg)

Để hiểu được biểu đồ này, ta cần hiểu một vài định nghĩa về kích thước ở đây:

- `Stat size` là kích thước của input, sau khi được webpack bundle nhưng trước các bộ tối ưu như Minify, Uglifier.
- `Parsed size` là kích thước của file trên bộ nhớ (sau khi đã tối ưu). Đây chính là kích thước của code JavaScript được trình duyệt parse.
- `gzip size` là kích thước sau khi nén bằng gzip (Đây là kích thước của file truyền qua network).

# 1, Tránh import toàn bộ library (global import)

*Mức độ tối ưu: Cao*

Với một số thư viện lớn, chúng ta hoàn toàn có thể chỉ import phần mà mình cần thay vì import cả thư viện. Nếu làm đủ và đúng thì chúng ta có thể giảm được tương đối kích thước của bundle do đã bỏ đi những thành phần không dùng đến.

Những thư viện có thể import từng phần gồm có: `lodash`, `react-bootstrap`, `antd`, ... 

Tuy nhiên nếu không làm đủ các chỗ thì chỉ cần một chỗ sử dụng nhầm câu import toàn bộ thư viện sẽ dẫn đến việc app của chúng ta bundle thêm cả thư viện với những phần không dùng đến.

Ví dụ về Lodash khi import toàn bộ thư viện: 

![](https://images.viblo.asia/b965832f-2504-452e-a106-ae9761f23895.jpeg)

Như bạn có thể thấy, `lodash` bị bundle tới 3 lần (1 lần ở `lodash.js`, 1 lần ở `lodash.min.js` và một lần ở những chỗ import từng phần). Đây sẽ là case tệ nhất chúng ta có thể gặp phải. Thử tưởng tượng với 3-4 thư viện như này thì bundle của chúng ta sẽ bị trương phình đến mức nào.

Có hai cách để đảm bảo phải import từng phần. Lưu ý rằng đây là cách code chứ không áp dụng cho một thư viện cụ thể nào.

## Sử dụng plugin babel

plugin [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports) có khả năng thay thế việc import destructured của cả thư viện bằng import từng phần. 

Config như sau:

```javascript
# .babelrc
"plugins": [
  ["transform-imports", {
    "lodash": {
      "transform": "lodash/${member}",
      "preventFullImport": true // sẽ báo lỗi nếu phát hiện việc import cả thư viện
    }
  }]
]
```

Sẽ có tác dụng sau:

```javascript
import { map, some } from 'lodash'
// sẽ được thay thế thành
import map from 'lodash/map'
import some from 'lodash/some'
```

## Sử dụng ESLint

Chúng ta có thể dùng rule [no-restricted-imports](https://eslint.org/docs/rules/no-restricted-imports) để báo lỗi nếu gặp câu import cả thư viện.


```javascript
// .eslintrc
"no-restricted-imports": [
  "error",
  {
    "paths": [
      "lodash"
    ]
  }
]
```

ESLint sẽ báo lỗi nếu gặp câu import như thế này: 

```javascript
import { map } from 'lodash'
```

Và sẽ pass câu này

```javascript
import map from 'lodash/map'
```

# 2, Sử dụng code-splitting

*Mức độ tối ưu: Tuỳ từng hệ thống*

Bằng cách sử dụng dynamic import hay Suspense, chúng ta có thể tách code của chúng ta ra thành các async chunk và chỉ load tới khi cần đến chúng. Việc này cho phép chúng ta giảm kích thước của bundle lúc ban đầu, tuy nhiên sẽ không giảm được kích thước tổng thể (có thể khiến bundle nặng hơn 1 chút).

Config: 

```javascript
// webpack.config.js
optimization: {
  splitChunks: {
    // chứa đủ các thể loại chunk
    chunks: 'all',
  }
}
```

Mặc đính sẽ tạo ra một `vendor` chunk, tách code ứng dụng ra khỏi các thư viện. Điều này khá ổn khi có update từ phía app, chỉ có code của app thay đổi, mà không thay đổi gì đến các thư viện (chỉ đúng khi các resource được cache một cách hợp lý) thì phía client sẽ giảm thời gian tải về các file `vendor`. 

Tuy nhiên cần nghiên cứu và xem xét nên dùng hay không, vì đôi khi code splitting sẽ làm chậm thao tác của người dùng do chúng ta phải download, parse và thực thi nhiều code hơn. Còn tuỳ vào cấu trúc từng hệ thống, code splitting có thể làm cho trình duyệt phải download nhiều file cùng một lúc. (với HTTP/1.1, có giới hạn về số lượng kết nối song song tới cùng một domain - [xem thêm](https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser/14768266#14768266))

Cách nên dùng đó là chia một chunk cho một route. Tuy nhiên đây không phải là bắt buộc nhé.

Cách lazy load một component:

```javascript
// MyComponent.jsx
import React, { Suspense } from 'react'
import Loading from '..'

// Tạo một lazy component bằng React.lazy
export const MyLazyComponent = React.lazy(() =>
 import(/* webpackChunkName: "my-component" */ './MyComponent'),
)

const MyComponent = props => (
 <Suspense fallback={<Loading />}>
   <MyLazyComponent {...props} />
 </Suspense>
)

export default MyComponent
```

Ở đây chúng ta sử dụng cú pháp dynamic import để báo cho Webpack tách riêng một chunk cho `MyComponent` và đồng bọn dependency của nó.

Setting `webpackChunkName` không bắt buộc, nó giúp chúng ta quản lý được tên của file được spit (xem [hướng dẫn config](https://webpack.js.org/configuration/output/#outputchunkfilename)). Nếu 2 lazy component có cùng tên thì chúng sẽ được đẩy chung vào một chunk.

`React.lazy` được dùng để cho phép các lazy component được render như một component bình thường. `Suspense` cung cấp một component fallback (sẽ được render nếu việc import chưa thành công). `Suspense` có thể dùng để bọc ở bất cứ đâu tuỳ vào việc bạn cho phép user có thể nhìn thấy gì trong khi loading.

Đọc thêm về `lazy` và `Suspense` ở [đây](https://en.reactjs.org/docs/code-splitting.html)

# 3, Không include source map

*Mức độ tối ưu: Tuỳ từng hệ thống*

Source map là liên kết giữa source code và file bundle. Nó khá hữu dụng khi debug, tuy nhiên không nên xuất hiện ở môi trường production.

Với JS source-map, option [devtool](https://webpack.js.org/configuration/devtool/#root) sẽ quản lý việc sinh ra source-map.

Ở development, `eval-source-map` sẽ giúp chúng ta xem được nguồn gốc của file và tăng tốc độ rebuild

Ở production, chúng ta nên đặt là `false` để tắt việc sinh ra source-map

Đối với source-map của CSS, Less hoặc Sass, các config phụ thuộc vào từng loader được sử dụng. Khi sử dụng  css-loader, sass-loader and less-loader, chúng ta nên setting `options: { sourceMap: true }` và `false` ở production trong config của loader. Ở production mặc định đã là false nên chúng ta không cần phải thêm setting này.

# 4, Loại bỏ các thư viện có thể thay thế
*Mức độ tối ưu: Tuỳ từng hệ thống*

Đôi khi để xử lý một yêu cầu nào đó từ spec, chúng ta thêm hẳn một thư viện mới để xử lý, tuy nhiên thực tế thư viện này có thể làm được rất nhiều việc khác nữa. Đơn giản là vì nghĩ là sau này có thể sẽ cần dùng, hoặc đơn giản là chưa nghĩ được cách xử lý nên add thư viện cho nhanh :D

Thêm cả đống thư viện dư thừa sẽ ảnh hưởng rất lớn tới việc bundle file. 

Đôi khi mình còn sử dụng `lodash` chỉ để sử dụng vài function của nó như `isEmpty` hay `filter` , ... Đừng hiểu lầm mình, `lodash` cực kì xịn xò, tuy nhiên trong trường hợp này thật sự không cần thiết phải làm vậy.

Viết lại những function trên với JS thuần chỉ tốn cùng lắm là 1-2 tiếng và kết quả là sẽ giảm được cả một bộ thư viện khổng lồ trong bundle.

Với mỗi một thư viện, chúng ta cần phân tích:

- Chúng ta chỉ dùng một phần nhỏ của nó thôi đúng không ?
- Chúng ta có thể viết lại những function chúng ta cần trong khoảng thời gian hợp lý không ?

Nếu cả hai câu hỏi trên đều là YES, thì việc tự viết lại các function cần thiết sẽ là một lựa chọn sáng suốt hơn.

# 5, Loại bỏ `prop-types`
*Mức độ tối ưu: Cao*

Với React, khai báo `prop-types` sẽ đảm bảo kiểu dữ liệu cho các props truyền vào một component. Đúng là chúng cực kì có hiệu quá trong quá trình development, chúng cũng đã được disable ở môi trường production (vì lý do performance). Tuy nhiên các câu khai báo vẫn nằm trong các file bundle. 

Plugin Babel [transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types#readme) sẽ loại bỏ hoàn toàn khai báo `prop-type` ra khỏi các file bundle. Tuy nhiên những prop-types của các dependency sẽ không được loại bỏ.

```javascript
// .babelrc
{
  "env": {
    "production": {
      "plugins": [
        [
          "transform-react-remove-prop-types",
          {
            "removeImport": true
          }
        ]
      ]
    }
  }
}
```

Lưu ý: chỉ nên bật plugin này ở môi trường production.

# 6, Hướng đến những browser hiện đại
*Mức độ tối ưu: Trung bình*

Để include polyfills, các bạn chắc đã nghe đến [core-js](https://github.com/zloirock/core-js) và [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) rồi nhỉ ?

Mặc định, tất cả polyfill đều được include và core-js nặng xấp xỉ 154KiB trong khi regenerator-runtime chỉ nặng 6.3KiB.

Bằng việc chỉ chấp nhận những browser hiện đại và các phiên bản gần đây của chúng, chúng ta có thể giảm được kích thước của các polyfill.

Plugin [Babel-preset-env](https://babeljs.io/docs/en/babel-preset-env) có khả năng thay thế việc import toàn bộ core-js bằng cách lựa chọn cụ thể các browser sẽ support.

Config:

```javascript
// .babelrc
"presets": [
  [
    "@babel/preset-env",
    {
      "useBuiltIns": "entry", // config này giúp ta chỉ việc import 2 dependency regenerator-runtime và core-js một lần 
      "corejs": "3.6" // phải cung cấp version của core-js
    }
  ],
],
```

```javascript
import 'regenerator-runtime/runtime'
import 'core-js/stable'
```

Để khai báo các browser hỗ trợ, chúng ta sử dụng cú pháp [browserlist](https://github.com/browserslist/browserslist)

```javascript
"browserslist": "last 2 Chrome versions, last 2 Firefox versions, last 2 safari versions",
```

# Kết

Cảm ơn các bạn đã đọc, nếu có cách hoặc tip nào khác thì hãy comment phía dưới nhé (bow)