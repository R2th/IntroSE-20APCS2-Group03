![](https://cdn-images-1.medium.com/max/2000/1*j2n8zzLYxoum1ob-1mjUcw.png)

### Tinder là gì?
> Trong vài thập kỷ qua, hẹn hò trực tuyến đã tạo nên một cuộc cách mạng thay đổi cách con người ta làm quen và hẹn hò với nhau. Bạn không còn phải đi vào quán bar, tìm người bạn thích, mở lời mời và bị từ chối trực tiếp. Thay vào đó, bạn chỉ cần lập một tài khoản trên các ứng dụng hẹn hò, hoàn thành trang cá nhân của mình và cùng tìm kiếm người phù hợp. Vậy Tinder là gì? Tinder chính là ông vua của loại ứng dụng hẹn hò này. Với 20 tỷ lượt kết đôi thành công cho đến nay, Tinder là nhịp cầu kết nối cực kì đáng tin cậy. Tinder hiện đang rất phổ biến tại nước Mỹ.


App Tinder gần đây đã hỗ trợ chạy online ngay trên nền tảng web. Họ đã xây dựng lại trang web [Tinder Online](https://tinder.com/) viết lại dưới dạng [Progressive Web App](https://developers.google.com/web/progressive-web-apps/) - sẵn sàng 100% để người dùng trên máy tính desktop và thiết bị di động dùng được ngon lành. Họ sử dụng các kỹ thuật [tối ưu hóa hiệu suất JavaScript](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e) , [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/) để giúp trang web có thể load nhanh như gió, chạy được offline 100% và hỗ trợ cả [Push Notifications](https://developers.google.com/web/fundamentals/push-notifications/) cho việc nhận thông báo có người Chat với bạn. Hôm nay, chúng ta sẽ đi xem các bài học mà họ đã rút ra được sau lần nâng cấp vừa rồi.

![](https://cdn-images-1.medium.com/max/1000/1*1HmfQhMAQL8kukiNtMZRjA.png)

### Hành trình đi đến ứng dụng web dạng Progressive Web App (PWA)

Tinder Online bắt đầu với mục tiêu là tiếp cận các thị trường mới (các nước khác ngoài Mỹ), phấn đấu các tính năng online cũng hoàn hảo ngang với version 1 của App Tinder ra đời cách đây vài năm.

Họ đã thuê một đội ngũ MVP (Most Valued Person - Nhân sự giỏi nhất) về Progressive Web App (PWA) và đã mất 3 tháng để triển khai sử dụng [ReactJS](https://reactjs.com/) làm thư viện dựng giao diện (UI) và [Redux](https://redux.js.org/) cho quản lý các trang con (state). Kết quả những nỗ lực đã tạo ra một trang PWA mang lại trải nghiệm ngang với Tinder version 1. Và tuyệt vời hơn nữa là dung lượng của App PWA chỉ bằng 10% App Android, rất đáng tiền trong thời đại chạy đua dung lượng bé để tiết kiệm băng thông.

![](https://cdn-images-1.medium.com/max/1000/1*cqYbI-L0zukfYS0ZAwUtqA.png)

Các dấu hiệu theo dõi ban đầu cho thấy thời lượng sử dụng, thời gian nhắn tin đều tốt so với ứng dụng gốc. Với PWA:

-   Người dùng vuốt (swipe) để xem nội dung nhiều hơn trên web so với ứng dụng Tinder mobile.
-   Người dùng nhắn tin trên web nhiều hơn so với ứng dụng mobile.
-   Người dùng mua các vật phẩm ngang với ứng dụng mobile
-   Người dùng chỉnh sửa tiểu sử nhiều hơn trên web so với ứng dụng mobile
-   Thời gian phiên sử dụng trên web dài hơn so với ứng dụng mobile.

### Hiệu suất

Các thiết bị di động mà người dùng Tinder Online thường dùng để truy cập vào web nhất bao gồm:

-   Apple iPhone và iPad
-   Samsung Galaxy S8
-   Samsung Galaxy S7
-   Motorola Moto G4

Sử dụng [báo cáo Trải nghiệm người dùng Chrome](https://developers.google.com/web/tools/chrome-user-experience-report/) (CrUX), chúng ta có thể thấy rằng phần lớn người dùng truy cập trang web đều có kết nối 4G:

![](https://cdn-images-1.medium.com/max/1000/1*gO4n3kBs5Zy1eAkMQqxx7w.png)


Thử kiểm tra loading ứng dụng Tinder Online bằng [WebPageTest](https://www.webpagetest.org/result/171224_ZB_13cef955385ddc4cae8847f451db8403/) và [Lighthouse](https://github.com/GoogleChrome/lighthouse/) (sử dụng Galaxy S7 bật 4G), chúng ta có thể thấy rằng App có thể tải và bắt đầu tương tác dưới 5 giây :

![](https://cdn-images-1.medium.com/max/1000/1*e-EHgbBBNXyuce8Z836Sgg.png)

Có rất nhiều thứ có thể tiếp tục cải tiến, vì theo [phần cứng di động trung bình](https://www.webpagetest.org/lighthouse.php?test=171224_NP_f7a489992a86a83b892bf4b4da42819d&run=3)( thì các thiết bị như Moto G4), có CPU chậm hơn nhiều, dẫn đến trải nghiệm load app bị giảm xuống, thời gian phải chờ đợi bị tăng lên:

![](https://cdn-images-1.medium.com/max/1000/1*VJ3ZbSQtIjxsIW8Feuiejw.png)

Tinder đang nỗ lực tối ưu hóa trải nghiệm người dùng (UX) của họ và chúng ta luôn mong muốn được nghe họ chia sẻ về các cải thiện hiệu suất web trong tương lai gần.

### Tối ưu hóa hiệu suất

Tinder đã có thể cải thiện tốc độ trang của họ có thể tải và trở nên tương tác thông qua một số kỹ thuật. Họ đã triển khai chia tách code dựa trên route, giới thiệu ngân sách hiệu suất và bộ nhớ đệm nội dung dài hạn.

### Chia nhỏ code theo các level Routing

Tinder ban đầu có các bundle (bundles) JavaScript lớn, nguyên khối bundles làm chậm việc tải giao diện về máy người dùng làm người dùng phải đợi rất lâu mới bắt đầu thao tác được trên trang. Các bundle này khi loading lại load cả các đoạn code không cần thiết ngay ở màn hình này (không nằm trong giá trị cốt lõi core của app). Vì vậy cần phải chia nhỏ bằng cách [chia tách code](https://webpack.js.org/guides/code-splitting/). Việc chia tách code này cực kỳ hữu ích khi bạn chỉ tải các code cần cho giao diện người dùng ở màn hình hiện tại, không load code thừa, và sau khi đã hiện được trang chính thì bạn mới lazy-loading toàn bộ các thư viện cần thiết khác.

Để thực hiện điều này, Tinder đã sử dụng [React Router](https://reacttraining.com/react-router/) và [React Loadable](https://github.com/thejameskyle/react-loadable). Bởi vì ứng dụng Tinder hiện tại đang dùng routing tập trung ở 1 file config, họ dễ dàng chia tách các route này vì họ biết họ đang có những route nào và cái nào dùng trong trường hợp nào.

**Nói rõ hơn 1 chút về React Loadable:**

React Loadable là một thư viện nhỏ của James Kyle để làm cho việc tách code component dễ dàng hơn trong React. Loadable là một component bậc cao (một constructor tạo ra một component) giúp dễ dàng phân chia các bundles ở cấp component.

Giả sử chúng ta có hai component "A" và "B". Trước khi chia tách code, Tinder include cố định mọi component (A, B, v.v) vào bundle chính của họ. Điều này không hiệu quả vì chúng ta không cần cả A và B ngay lập tức:

![](https://cdn-images-1.medium.com/max/1000/1*DoTby4l_-A3TNdiUSZ0LmA.png)

Sau khi add thêm tính năng tách code, các component A và B có thể được load khi cần đến. Tinder đã thực hiện điều này bằng cách dùng  React Loadable, [dynamic import()](https://webpack.js.org/guides/code-splitting/#dynamic-imports) , [webpack’s magic comment syntax](https://medium.com/faceyspacey/how-to-use-webpacks-new-magic-comment-feature-with-react-universal-component-ssr-a38fd3e296a) (để đặt tên các khối dưới dạng động) vào các JS riêng biệt:

![](https://cdn-images-1.medium.com/max/1000/1*aPY-1uGEvPV1dNKrrD8z4Q.png)

Đối với khối "vendor" (thư viện), Tinder đã sử dụng webpack [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) để đưa các thư viện hay dùng gộp chung vào một tệp bundle duy nhất để nó có thể được cache lại trong khoảng thời gian lâu hơn:

![](https://cdn-images-1.medium.com/max/1000/1*R-kXPcn937BNoFXLukPJPg.png)

Tiếp theo, Tinder đã sử dụng [hỗ trợ tải trước của React Loadable](https://github.com/thejameskyle/react-loadable#loadablecomponentpreload) để tải trước các tài nguyên sẽ cần đến cho trang tiếp theo ở component gọi nó:

![](https://cdn-images-1.medium.com/max/1000/1*G2JvbNCsm4eBXbGgyW6OmA.png)

Tinder cũng đã sử dụng [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/) để cache trước tất cả các bundle theo từng level route của họ và gồm cả các route mà người dùnghay truy cập nhất trong bundle chính khi chưa chia tách code. Tất nhiên, họ cũng đưa thêm biện pháp tối ưu hóa phổ biến như rút gọn file JavaScript bằng tool UglifyJS:

```js
new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      compress: {
        warnings: false,
        screw_ie8: true
      },
      sourceMap: SHOULD_SOURCEMAP
    }),
```

#### Kết quả đạt được sau các bước vừa rồi

Sau khi chuyển đổi code về dạng tách bundle theo từng level routing (từng màn hình sử dụng), file bundle chính của họ đã giảm từ 166KB xuống 101KB và DCL (DOM Content Load - Thời gian load xong toàn bộ cây HTML DOM) được cải thiện từ 5,46s xuống 4,69s:

![](https://cdn-images-1.medium.com/max/1000/1*1Tt8bnnkyIi8aEw0BjRgMw.png)

### Bộ nhớ đệm lưu trữ lâu dài

Đảm bảo [lưu trữ bộ nhớ đệm thật lâu dài](https://webpack.js.org/guides/caching/) của các file tĩnh bằng cách sử dụng 1 trong các tinh năng của webpack đó là [chunkhash] để thêm bộ nhớ cache-buster (thêm chuỗi hash, chứa giá trị thời gian tồn tại) vào mỗi tệp.

![](https://cdn-images-1.medium.com/max/1000/1*nofQB3Q-8IUo9f1Eipd0xw.png)

Tinder có sử dụng một số thư viện nguồn mở (vendor của bên thứ 3). Thay đổi đối với các thư viện này sẽ khiến [chunkhash] thay đổi và làm mất hiệu lực bộ nhớ cache, trình duyệt sẽ phải tải lại file cache từ server để thay thế. Để giải quyết vấn đề này, Tinder bắt đầu định nghĩa một [danh sách whitelist các dependency bên ngoài](https://gist.github.com/tinder-rhsiao/89cd682c34d1e1307111b091801e6fe5]%28https://gist.github.com/tinder-rhsiao/89cd682c34d1e1307111b091801e6fe5) và tách tệp webpack của chúng riêng ra khỏi file bundles chính (làm tương tự như bên trên đã mô tả) để cải thiện thời gian sống của bộ nhớ đệm. Kích thước của bundle bây giờ là khoảng 160KB cho cả hai file bundles.

### Tải trước các tài nguyên được khám phá muộn

Để tải các file tài nguyên khẩn cấp, [<link rel = preload>](https://developers.google.com/web/fundamentals/performance/resource-prioritization) là một hướng dẫn khai báo cho trình duyệt để tải các tài nguyên quan trọng, được chỉ ra ở bên trên header (tức là trình duyệt đọc và ưu tiên load ngay lập tức). Trong các ứng dụng SinglePage App, các tài nguyên này đôi khi có thể là các file bundle JavaScript.

![](https://cdn-images-1.medium.com/max/800/1*CaObLc_tGJvnllyV3CGD5w.png)

Tinder đã thực hiện bước bên trên để tải trước các bundle JavaScript / webpack của họ, quan trọng cho trải nghiệm UI trên màn hình. Điều này giảm thời gian tải thư viện khoảng bớt đi 1s và màn hình bắt đầu được hiển thị giảm từ đợi 1000ms xuống chỉ phải đợi 500ms.

![](https://cdn-images-1.medium.com/max/1000/1*AtzElAKy_pCvRjZN__YSsQ.png)

### Chiến dịch nâng cao Performance trên mobile mạng yếu

Tinder đã áp dụng một ngân sách hiệu suất (mục tiêu mạng yếu như thế nào thì thời gian load phải đáp ứng ra sao) để giúp họ đạt được mục tiêu hiệu suất của họ trên thiết bị di động. Như Alex Russell đã lưu ý trong " [Bạn có thể chi trả được không? Ngân sách hiệu suất thực tế](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/) ", bạn bị giới hạn thời gian phải hiện ra được UI khi xem trang web trên kết nối 3G chậm, được vào bằng phần cứng di động trung bình.

Để đạt được mục tiêu cố định đó một cách thành công và nhanh chóng. Tinder thực thi một ngân sách giữ bundle size ~ 155KB cho bundles chính và các vendor bên thứ 3 của họ, các khối không đồng bộ (được nạp Lazily loaded) là ~ 55KB và các khối khác là ~ 35KB. CSS có giới hạn 20KB. Tất cả các con số này rất quan trọng để đảm bảo họ có thể tránh được suy giảm mạnh về hiệu suất khi mạng 3G yếu đi.

![](https://cdn-images-1.medium.com/max/1000/1*OgDLsMxsy6IO79NmjQtcng.png)

### Phân tích file bundle bằng Webpack

[Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) cho phép bạn khám phá biểu đồ phụ thuộc cho các file bundle JavaScript. Để bạn có thể khám phá liệu có cách để tối ưu hóa nó thêm không.

![](https://cdn-images-1.medium.com/max/800/1*qsiUA0G50a4p3y2e4p7CyA.png)

Tinder sử dụng Webpack Bundle Analyzer để khám phá các khu vực cần cải thiện:

-   Polyfills: Tinder đang nhắm đến mục tiêu chạy được trên các trình duyệt hiện đại mới nhất, nhưng vẫn phải hỗ trợ IE11 và Android 4.4 trở lên. Để giữ cho polyfills & transpiled code ở mức tối thiểu, họ sử dụng [babel-preset-env](https://github.com/babel/babel-preset-env) và [core-js](https://github.com/zloirock/core-js) .
-   Sử dụng thư viện nhẹ hơn: Tinder thay thế [localForage](https://github.com/localForage/localForage) bằng cách sử dụng trực tiếp IndexedDB của trình duyệt.
-   Phân tách tốt hơn: Chia nhỏ các component khỏi các bundle chính không cần thiết cho lần hiển thị UI / tương tác đầu tiên.
-   Sử dụng lại code: Chuyển các hàm thành async code ở các component cha mà được gọi quá ba lần từ component con.
-   CSS: Tinder cũng đã xóa [CSS quan trọng](https://www.smashingmagazine.com/2015/08/understanding-critical-css/) khỏi các bundle cốt lõi của họ (vì họ đã chuyển sang server-side rendering  và phân phối CSS theo cách này)

![](https://cdn-images-1.medium.com/max/800/1*ZL3i2BRHo8Sq_dv1NyA8Dw.png)

Việc sử dụng phân tích bundle cũng dẫn đến việc tận dụng [Lodash Module Replacement Plugin](https://github.com/lodash/lodash-webpack-plugin) của Webpack . Plugin này tạo ra bản build Lodash nhỏ hơn bằng cách thay thế các tập hợp các mô-đun bằng noop, identity  hoặc các lựa chọn thay thế đơn giản hơn:

![](https://cdn-images-1.medium.com/max/1000/1*of2Mv5ypTySRpTZQZVRj7A.png)

Webpack Bundle Analyzer có thể tích hợp vào cấu hình Webpack của bạn. Thiết lập của Tinder là như thế này:

```
plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        reportFilename: 'report.html',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null
      })
```

Phần lớn các đoạn code JavaScript còn lại vẫn để nằm trên bundle chính vì chia tác code ra chỗ này sẽ ảnh hưởng đến kiến trúc đang được sử dụng bởi Redux Reducer và Saga Register.

### Chiến lược tối ưu CSS

Tinder đang sử dụng [Atomic CSS](https://acss.io/) để tạo các kiểu CSS có thể tái sử dụng cao. Tất cả các kiểu CSS nguyên tử này được inlined trong lần vẽ UI ban đầu và một số phần còn lại của CSS được tải trong stylesheet (bao gồm cả aimation hoặc base/reset). Các styles quan trọng có kích thước tối đa 20KB được nén gziped, với các bản css gần đây có kích thước <11KB.

Tinder sử dụng [thống kê CSS](http://cssstats.com/stats?url=https%253A%252F%252Ftinder.com&ua=Browser%2520Default%0A) và Google Analytics cho mỗi bản phát hành để theo dõi những gì đã thay đổi. Trước khi sử dụng CSS Atomic, thời gian load trang trung bình là ~ 6,75s. Sau khi họ  dùng Atomic CSS, đã giảm còn ~ 5,75s.

![](https://cdn-images-1.medium.com/max/1000/1*Uv_at6Xs7QYHZJ0iy8c7GQ.png)

Tinder Online cũng sử dụng [plugin PostCSS Autoprefixer](https://twitter.com/autoprefixer) để phân tích cú pháp CSS và thêm tiền tố vendor prefixes trên các quy tắc từ [ Can I Use](http://caniuse.com/) :

```
new webpack.LoaderOptionsPlugin({
    options: {
    context: paths.basePath,
    output: { path: './' },
    minimize: true,
    postcss: [
        autoprefixer({
        browsers: [
            'last 2 versions',
            'not ie < 11',
            'Safari >= 8'
        ]
        })
      ]
    }
}),
```

### Tăng hiệu suất khi chạy App

#### Trì hoãn tác vụ không quan trọng với requestIdleCallback ()

Để cải thiện hiệu suất khi chạy app, Tinder đã chọn sử dụng [requestIdleCallback ()](https://developers.google.com/web/updates/2015/08/using-requestidlecallback) để trì hoãn các hành động không quan trọng khi app không hoạt động.

```
requestIdleCallback(myNonEssentialWork);
```

Họ đã đơn giản hóa một số  cấu trúc HTML để giảm bớt số lần vẽ lại giao diện khi người dùng vuốt qua lại.

Sử dụng requestIdleCallback () để theo dõi số lần quét HTML mỗi khi người dùng vuốt qua lại.

trước..

![](https://cdn-images-1.medium.com/max/800/1*oHJ8IjCs7AKdCrt9b28ZPw.png)

và sau..

![](https://cdn-images-1.medium.com/max/800/1*UTQuSSp7MGMY06mwYtQmaw.png)

### Nâng cấp Dependency

**Webpack 3 scope**

Trong các phiên bản webpack cũ hơn, khi bundle mỗi mô-đun trong bundle của bạn sẽ được bao bọc trong các bundle chức năng riêng lẻ. Các hàm bọc này làm cho JavaScript của bạn chạy chậm hơn trong trình duyệt. [Webpack 3](https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b) giới thiệu "scope hoisting" - khả năng kết hợp scope của tất cả các mô-đun của bạn thành một scope và cho phép code của bạn có thời gian thực hiện nhanh hơn trong trình duyệt. Họ sử dụng plugin Module Concatenation:

`new webpack.optimize.ModuleConcatenationPlugin ()`

Webpack 3 theo cách này đã cải thiện thời gian phân tích cú pháp JavaScript Tinder  khoảng 8%.

**Sử dụng React 16**

React 16 đã giới thiệu các cải tiến [làm giảm kích thước bundle của React](https://reactjs.org/blog/2017/09/26/react-v16.0.html#reduced-file-size) so với các phiên bản trước. Điều này một phần là do đóng gói bundle tốt hơn (sử dụng Rollup) cũng như loại bỏ bớt các code không sử dụng.

Bằng cách cập nhật từ React 15 lên React 16, Tinder đã giảm kích thước gzipped của  vendor bên thứ 3 của họ xuống ~ 7%.

Kích thước của react  + react-dom trước kia là ~ 50KB gzipped và bây giờ chỉ là ~ 35KB . Nhờ có [Dan Abramov](https://twitter.com/dan_abramov) , [Dominic Gannaway](https://twitter.com/trueadm)và [Nate Hunzaker](https://twitter.com/natehunzaker) , người đã cắt giảm kích thước bundle của React 16.

### Workbox cho khả năng phục hồi mạng và offline asset caching

Tinder cũng sử dụng [plugin Webbox Workbox](https://developers.google.com/web/tools/workbox/get-started/webpack) để lưu vào bộ nhớ đệm các [Application Shell](https://developers.google.com/web/fundamentals/architecture/app-shell) và các static assets của họ như main, vendor, manifest bundles và CSS. Điều này cho phép không cần tải lại cho các lần truy cập tiếp theo và đảm bảo rằng ứng dụng khởi động nhanh hơn khi người dùng quay lại cho các lần truy cập tiếp theo.

![](https://cdn-images-1.medium.com/max/1000/1*yXpAzyA1ODPk2OSOTA6Lhg.png)

### Còn có thể nâng cấp thêm không?

Đào sâu vào các bundle của Tinder bằng cách sử dụng [source-map-explorer](https://www.npmjs.com/package/source-map-explorer) (một công cụ phân tích bundle khác), ta có thể thấy có thêm các cơ hội để giảm kích thước file cần load. Trước khi đăng nhập, các component như Facebook Photos, thông báo, tin nhắn và captchas được tìm và nạp về từ server. Di chuyển chúng ra khỏi main bundle có thể tiết kiệm tới 20% cho bundle chính:

![](https://cdn-images-1.medium.com/max/1000/1*G1nq7BNZPEo2mFr_my5zjA.png)

Một cái dễ thấy khác trong công cụ phân tích là một script SDK Facebook nặng tới 200KB. Bỏ bớt file này (có thể được lazy-load khi cần) có thể tiết kiệm thời gian load ban đầu nhanh hơn 1 giây.

### Kết luận

Tinder vẫn đang lặp lại các công việc tìm kiếm và tối ưu thời gian tải ứng dụng (performance) ở app dạng Progressive Web App của họ. Như chúng ta thấy, các phân tích cẩn thận đã giúp họ đưa ra được giải pháp chặt chẽ, giảm được đáng kể các thành phần không cần thiết ảnh hưởng đến trải nghiệm người dùng. Chúng ta sẽ còn ghé thăm Tinder.com sắp tới và tiếp tục theo dõi để xem các tiến bộ của họ trong tương lại gần nhé!


Bài này là một bài dịch, các bạn có thể đọc bài gốc ở đây nhé: https://medium.com/@addyosmani/a-tinder-progressive-web-app-performance-case-study-78919d98ece0