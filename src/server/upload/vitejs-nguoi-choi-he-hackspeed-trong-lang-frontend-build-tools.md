Chào mọi người, chủ để mình muốn chia sẻ với mọi người hôm nay đó là về công cụ được gọi là ViteJS anh em cùng cha khác mẹ của VueJS. 
Tại sao mình lại nói như vậy, dễ hiểu thôi vì cha đẻ của Vite là Evan You - người sáng lập ra Vue.

## ViteJS là gì ?
![](https://vitejs.dev/logo.svg)

Tổng quan 1 chút Vite là 1 công cụ build frontend mang một ý nghĩa hơn cả về TỐC ĐỘ của nó.
- Repository của Vite: https://github.com/vitejs/vite

Chắc ai trong chúng ta khi làm việc với Vue đều không xa lạ gì Vue-CLI, nó cũng là 1 build tool trong quá trình development, và khi ViteJS ra mắt được giới thiệu là có tốc độ nhanh gấp 10~100 lần so với Vue-CLI ( trong tiếng pháp Vite có nghĩa là nhanh - Khá thú vị :laughing::laughing:
Vậy trước tiên chúng ta hãy xem lại Vue-CLI có gì nhé? Liệu Vue-CLI có phải đã trở thành "tro bụi" khi ViteJS ra đời hay không?

## Tổng quan về Vue-CLI

Trước kia khi làm việc với Laravel, Laravel support Vue khá tốt và thứ để giúp mình build phần Vue là webpack built-in Laravel.
Việc đó khiến cho khi chúng ta không làm việc với Laravel, thì việc xây dựng 1 cấu trúc dự án Vue nói riêng và Frontend nói chung sẽ mất thời gian vì phải cấu hình lại build tool.

![](https://cli.vuejs.org/ui-analyzer.png)

Mọi việc trở nên đơn giản hơn khi [Vue-CLI](https://cli.vuejs.org/) ra đời với các tính năng như sau:

- Project scaffolding
- Dev server with hot-module reloading
- Plugin system
- User interface

Với các tính năng trên thì việc chúng ta tạo 1 cấu trúc dự án của Vue nó trở lên đơn giản bao giờ hết nào là:
- 1 Lệnh generate
- Generate với UI
- Tự động reload module trong quá trình dev

Lúc mới sử dụng mình thật sự thấy thích trải nghiệm của nó, dễ dàng và tiện lợi. Nhưng có 1 vài điều sau đó, lúc mà mình phát triển các dự án vue nó phình to ra, quá trình dev & build nó mất khá nhiều thời gian kiểu các case sau đây mình gặp phải
- Run build dev lâu 
- Run watch lâu, nhiều khi mình cứ phân vân không biết nên dùng dev hay watch kiểu nếu mà scope sửa code nó nhỏ, hoặc trong lúc code mình sửa 1 chút chút thôi là lại phải đợi nó chạy chạy .... progress progress.. ( mặc dù bản chất nó đã cố gắng optimize lắm rồi )
- Run serve cũng lâu =)) ( thực ra mình vẫn đợi được chỉ là sau khi thấy thằng Vite nhanh quá nên mình tạm coi thằng này lâu thôi )

Và tóm lại phần overview này mình chỉ muốn đề cập đến là 
<b>Vue-CLI được xây dựng based trên Webpack</b>

## Thế còn Vite thì thế nào?

Về các chức năng theo mình được biết thì nó cũng na ná thằng Vue-CLI, cũng project scaffold, dev server with HMR
<b>Tuy nhiên có vài thông tin mình muốn chia sẻ thêm sự khác nhau là:</b>

- Vite không based trên Webpack
- DevServer sử dụng native ES modules trên trình duyệt. ( các bạn có thể tìm hiểu hoặc lúc khác mình sẽ đào sâu về nó và chia sẻ với các bạn sau, bài viết này mình chỉ mong muốn PR trá hình cho các tính năng của thằng Vite thôi =)) ) 
- Vite build sử dụng [Rollup](https://rollupjs.org/guide/en/), thằng này cũng được đánh giá khá nhanh

## Vite đã hack speed như thế nào

Đợt tết vừa rồi nghỉ ở nhà chán quá mình cũng đã nghiền ngẫm quả Vue Toronto 2020 mục Vite do anh Evan You cầm mic =)))
Giới thiệu sơ bộ thì có cho ra 1 thống kê về tốc độ giữa Vue-CLI ( Based on webpack ) với Vite như dưới ảnh sau

![](https://images.viblo.asia/8b6635dc-fc30-4250-93e4-11658b7d5326.png)

Theo mình đang hiểu Vite sẽ tạm gọi các modules cần bundle làm 2 thể loại 
- <b>Dependencies</b> chủ yếu là JavaScript đơn giản không thay đổi thường xuyên trong quá trình phát triển. Với thằng này Vite tiến hành [pre bundle](https://vitejs.dev/guide/dep-pre-bundling.html#the-why) sử dụng [esbuild](https://esbuild.github.io/) được viết bằng Go và nghe nói khá nhanh =))
- <b>Source Code</b> cái này là các thằng con lại =))) bao gồm cả code của bạn, cơ bản nó dùng native ESM ở trên mình nói và đá bớt việc sang cho browser xử lý ( cái này cũng là một nhược điểm của Vite, vì nó cần browser support native ESM do vậy khi lựa chọn các bạn vui lòng để ý kỹ version browser hoặc sử dụng các plugin )

Về vấn đề version các bạn có thể tham khảo thêm tại các tài liệu sau đây :
- [Browser Support](https://vitejs.dev/guide/#browser-support)
- [ES6 Module dynamic import](https://caniuse.com/es6-module-dynamic-import)
- [Production Build browser compatibility](https://vitejs.dev/guide/build.html#browser-compatibility)


## Webpack dev server architecture:
- Cách hoạt động của Webpack là nó xây dựng toàn bộ ứng dụng thành một JavaScript-based bundle bằng cách giải quyết mọi import và require trong source code của bạn và transform các tệp kiểu nhuw: Sass, TypeScript, SFC
- Tất cả đều được thực hiện ở phía máy chủ và có mối quan hệ gần như tuyến tính giữa dependencies, time build / rebuild mỗi khi thay đổi

![](https://vitejs.dev/assets/bundler.37740380.png)

## Vite dev server architecture
- Đơn giản là nó không làm điều đó phía máy chủ ( native ESM ), nó không gom hết lại không transform hết lại như thằng Webpack, mà kiểu browser yêu cầu cái gì thì mới làm, các bạn có thể hiểu theo cách Lazyload vậy.
- Kiến trúc này cung cấp một dev server nhanh hơn đáng kể bằng cách tránh bundle toàn bộ ứng dụng phía máy chủ và bằng cách tận dụng quá trình xử lý modules hiệu quả của browser

![](https://vitejs.dev/assets/esm.3070012d.png)

## Nhược điểm của Vite
- Như mình đề cập ở trên đó là tính công nghệ hịn hò của nó cũng chính là nhược điểm của nó.
- Kén browser, Kén dependencies, nó tương thích với kiểu modern Package JS hơn là CommonJS ( các package cũ ) , điều này Vite cũng đã cố gắng convert từ CommonJS sang JS Modules tuy nhiên không thể hoàn toàn 100%.
- Vite Không chỉ Support Vue, nó cũng support React tuy nhiên với Vue thì phiên bản chạy ngon hơn cả là Vue3, trong khi mình đang làm việc nhiều với Vue2 =))) mặc dù cũng có các plugin HỖ TRỢ sử dụng Vite ở Vue2 rồi nhưng đằng nào nó cũng không ngon hơn mà .

## Ví dụ
- Mình đã tiến hành dựng 2 con project 1 cái dùng vue-cli và vite để test, về cơ bản nó không có gì chỉ có sử dụng 1 library là lodash để thử import trong lúc dev xem thời gian chủ yếu như nào thôi :D

### Vue-CLI Build
![](https://images.viblo.asia/c7982dc6-d130-42fa-a388-838392740579.gif)

Time done: 5.48 s

### Vite Build
![](https://images.viblo.asia/3f4e5c72-9838-44a0-89aa-a11e9671ca18.gif)

Time done: 4.74s

### Vue-CLI Serve
![](https://images.viblo.asia/c7b1dbd3-3787-48e9-841c-0efe408a746c.gif)

Time done: 1963ms

### Vite Serve
![](https://images.viblo.asia/bf6ebd1d-1b87-48e3-9e46-5727bc65d6fc.gif)

Time done: nháy mắt =))))))

### Vue-CLI Hot reload module with code
![](https://images.viblo.asia/e6d61064-77dd-4305-a5a6-9be85b3ca440.gif)

Time done: 187ms

### Vite Hot reload module with code
![](https://images.viblo.asia/61da58eb-32c0-47a5-b4e5-f41fcfed1a2e.gif)

Time done: nháy mắt =))))

### Vue-CLI Hot reload module with library
![](https://images.viblo.asia/53ce8322-e81e-4ead-a4f4-01190aacff3a.gif)

Time done: 987ms

### Vite Hot reload module with library
![](https://images.viblo.asia/ecb73e26-bc23-46f6-9b04-0c31676d3742.gif)

Time done: Vẫn là nháy mắt <3 

Dự định bài tiếp theo về thằng này chắc mình sẽ demo build, nó vào các dự án đã tồn tại Vue 2 Vue 3 mà sử dụng webpack, vue-cli tiến hành migrate sang vite! Cảm ơn các bạn đã đọc hết <3 <3 <3 Chúc mừng năm mới

## Tài liệu
- Slide vue conf 2020 : [Click here](https://docs.google.com/presentation/d/1X1hrFw18v67bEniTPpaI_DBulLdkKNFEc_3nVEm95mM/edit#slide=id.ga7017d8c1b_0_77)
- Awesome Vite: [Repository](https://github.com/vitejs/awesome-vite)