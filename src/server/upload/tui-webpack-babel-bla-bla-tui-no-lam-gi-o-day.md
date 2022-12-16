## Tại sao nên đọc bài này?

- Nâng cao skill làm frontend, biết được tụi webpack, babel,… nó đang làm gì trong project của mình
- Một số solution thay thể để có một trải nghiệm tốt hơn

## Frontend bắt đầu quá fuk tạp!?!

Có bao giờ các bạn tự hỏi:

- Webpack
- Babel
- ESlint
- ES5, ES6, ESNext
- Package.json, package.lock
- SCSS, LESS, Styled Component
- TSconfig
- Lerna, turborepo,…

Làm gì trong đống project của mình không? Rồi lâu lâu có lỗi gì đó mà chọc ngoáy vào một xíu là cả prj toang luôn không run lại được nữa.

Cùng tìm hiểu công dụng của tụi nó trong Frontend là gì nhé

### Cài một plugin/package mới

Hồi trước khi code frontend thì chỉ có HTML, CSS, JavaScript đồ thôi ha. Sau đó một thời gian thì có jQuery, cùng một đống plugin dựa trên jQuery, khi đó thì muốn thêm một plugin gì đó thì mình sẽ phải lên trang chủ của nó download code về, bỏ vào trong project, hoặc ngắn hơn là import thẳng file js của tụi nó vào trong HTML.

Giờ đây mọi việc đơn giản hơn:

```bash
npm install react-query # or yarn add react-query
```

Là bạn đã cài được thằng `react-query` vào trong project của mình rồi. Nó sẽ thay bạn

- Truy cập thư viện packages
- Download version tương ứng
- Bỏ vào trong prj mà bạn cài
- Lưu lại thư viện đã cài vào prj để sau này qua máy khác họ biết đã cài những package gì để có thể cài lại

![image.png](https://images.viblo.asia/2cb754f1-a694-4f98-bc5f-a36e1e098124.png)

Vậy là `NPM` là một công cụ để cài package vào prj giúp cho mình, nhiệm vụ của dev là nằm chờ cài xong rồi dùng thôi

Một số giải pháp thay thế

- Yarn
- PNPM

### Lỡ quá nhiều packages thì sao?

![image.png](https://images.viblo.asia/401ce821-4205-4be8-bed9-5045c2edea2b.png)

Giả sử giờ mình dùng một thư viện làm Carousel để viết code cho trang chủ, tuy nhiên mấy trang khác lại không dùng Carousel. Do đó khi code phải có cách làm sao chỉ để import mỗi nó vào trang chủ thôi, như vậy mới tôn trọng tiền mạng của user chứ. Mà thằng Carousel thì còn khá đỏng đảnh, dùng nó thì còn phải import cả js, cả css nữa, mỗi lần làm vậy phiền chết.

Vậy là thằng Webpack ra đời để giải quyết vấn đề này. Nó sẽ gom hết code của mình + packages, và generate ra những file phù hợp tùy theo nhu cầu của bản thân.

Như ví dụ trên, thì bên trang chủ nó sẽ gom **JS = Code của bạn + package Carousel + các packages khác, css tương ứng**

![image.png](https://images.viblo.asia/5dd0c39d-179d-4602-847b-49ebe94fe817.png)

Do đó khi bạn đang làm việc với Webpack là mình đang giải quyết các câu hỏi

- Bundle lại tụi package như thế nào, kết hợp ra sao
- Phân chia code ra sao sau
- Ngoài ra nó còn support việc tiền xử lý code nữa

Một số giải pháp thay thế

- Vite - Thằng này chạy nhanh vkl, webpack ngửi khói luôn
- Rollup - dùng khá nhiều khi viết thư viện
- SWC
- esbuild

### TypeScript, CoffeeScript, SCSS, LESS,…

Cũng lại cũng lý do vì tụi Browsers củ chuối 🍌 , tụi nó chỉ hiểu HTML, CSS và JS thôi. Và tụi nó thì cũng có một vài hạn chế, nên nhiều ông bất mãn mới đẻ ra một số ngôn ngữ mới để fix vụ đó nên mới có TypeScript, Sass đồ,… nhưng mà dùng ngôn ngữ nào thì tới cuối mình cũng phải compile nó ra HTML, CSS và JS thôi.

Trong đống đó thì mình thấy TS là cực kì tiềm năng, nên học càng sớm càng tốt, đọc thêm bài tương lai về Frontend của mình ở đây

[Tương lai của frontend](https://thanhle.blog/en/blog/tuong-lai-cua-frontend)

Giải pháp thay thế thì gần như không có, nó đi theo bundle tool nên gần như chỉ có 1 lựa chọn cho khúc chỗ này thôi

### Rổi covert thành code dạng gì?

Ok, mình đưa code các thể loại khác nhau, vậy cụ thể mình covert thành kiểu gì?

ES là viết tắt của **E**CMA**S**cript một chuẩn đặc tả tiêu chuẩn cho JavaScript. Tưởng tượng là bạn bảo bún đậu là phải đi với mắm tôm, nhưng người nước ngoài bảo bún đậu thì ăn vs tương ớt cũng OK. Hai loại định nghĩa đó khác nhau dẫn tới việc làm món bún đậu cũng khác nhau, dẫn tới mấy thằng chế biến món ăn đó khóc thét vì không biết thực khách này là người VN hay là người nước ngoài, hoặc là người VN nhưng không ăn được mắm tôm. Thấy khổ đau chưa?

Do đó JS cũng cần chuẩn hóa để không phải suffer những vấn đề như trên, và tụi ECMA này là tụi đứng ra define những tiêu chuẩn như vậy.

{@embed: https://www.youtube.com/watch?v=9A_jkh2AKR8&ab_channel=LevelUpTuts}

Và tụi nó cũng có nhiều version khác nhau, do đó bạn sẽ thấy có ES5, ES6 hay ESNext. Tuy tụi này đã define được một standard cho JS tuy nhiên tụi browser có làm theo hay không còn tùy vào sở thích của tụi nó nữa, do đó thường người ta sẽ output ra JS ở version khá cũ đó là ES5.

CSS cũng gặp vấn đề như trên nha, nhưng đỡ hơn xíu, do đó đời nào thì cũng có… “hận trời sinh ra Firefox còn sinh ra IE”

Babel sẽ là tool giúp bạn có thể code ở chuẩn ES6 và vẫn build ra js ở chuẩn ES5 được, hoặc có thể lấy mấy feature xịn xịn ở ESNext dùng mà vẫn đảm bảo code build ra được ở chuẩn ES5

![image.png](https://images.viblo.asia/80e4bfce-0cf7-4165-a231-f90c8c9a67d9.png)

Một số giải pháp thay thế

- SWC
- sucrase

### Đã có ngôn ngữ mạnh để code rồi, mà giờ mỗi thằng code một kiểu thì sao?

Thì đá vào disss nó :)) hoặc là nhân văn hơn, thằng nào code không theo style chung thì hiện warning/error vào mặt nó rồi không cho nó commit lên được luôn.

![image.png](https://images.viblo.asia/afeb54ab-abb2-4b87-9c81-ceb59fcb2737.png)

Chỗ này sẽ có những tool liên quan như

- ESlint/TSLint - define chuẩn style cho prj
- Prettier - giúp code mình khi ấn `Save` thì auto format lại theo chuẩn
- Husky - đứa nào commit code xấu lên thì nó nói “Hok bé ơi!”

Rồi giờ thì code không theo style thì không bao giờ lên được repo nữa rồi, thằng nào code mà không commit lên được thì cà khịa sao hoài không xong task thôi 😃

## Tổng kết

Những tool trên bạn sẽ thấy nó có mặt ở hầu hết các stack frontend hiện tại (Nextjs, CRA, Vuejs, Svelte,…). Sẽ khá ít khi cần đụng vô tụi nó, tuy nhiên đụng vô rồi thì sẽ hơi khó có đường ra nếu các bạn ko hiểu bản chất tụi nó làm gì.

Mọi thứ đều tiến hóa lên, công nghệ là case study mà bạn sẽ thấy mọi thứ tiến hóa nhanh tới thế nào. Công nghệ giải quyết những vấn đề cũ nhưng đồng thời cũng introduce những vấn đề mới, do đó kĩ năng learning, thích nghi với những thứ mới mẻ. Đồng thời hiểu được những vấn đề đang tồn đọng và cách các công cụ mình đang dùng giải quyết vấn đề gì giúp bạn có thể optimize trong việc làm frontend, có thể là

- Làm cho workflow khi dev hiệu quả, nhanh hơn
- Làm cho output code khi bundle tối ưu hơn
- Làm cho dev code thoải mái, vui vẻ hơn

Bài gốc: https://thanhle.blog/blog/webpack-babel-tui-no-lam-gi-o-day