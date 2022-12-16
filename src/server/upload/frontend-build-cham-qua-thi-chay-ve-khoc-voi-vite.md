# ■ Intro.

*Thời gian này không biết anh chị em mình có theo dõi `SEA Games 31` không nhỉ ^^ Hai ngày cuối tuần vừa rồi có ai "đi bão" không =))) Chưa bao giờ chiến thắng và tinh thần thể thao cao đẹp lại thổi mạnh mẽ trên khắp con phố như vậy! Quả là một kỳ thi đấu thành công cho đoàn thể thao Việt Nam, khép lại một mùa `SEA Games` quá trọn vẹn 🙌 &nbsp;🙌 &nbsp;🙌*

![](https://images.viblo.asia/ccbfb04b-e806-42de-9448-27daf5692551.gif)

*Xin chúc mừng tất cả các tuyển thủ một lần nữa!!!*

Bởi vậy mới mới nói:
```JS
- Chút thay đổi chiến thuật có thể viết nên cả một lịch sử;
  Và tỉ số thì chẳng thể nào được khẳng định cho đến phút 90 của trận đấu 😌😌
```

Ấy là câu chuyện về trái bóng bên sân cỏ. Còn với lập trình viên chúng ta thì sao 😸😸 Chút thay đổi trong `code` đôi khi cũng có thể làm thay đổi cả luồng `logic` rồi ấy nhỉ, và tính đúng đắn cũng chẳng thể nào khẳng định được cho tới khi chương trình đã chạy xong =)))

Vậy đó giờ anh chị em đã tham gia dự án nào có `build time` hệ  *&nbsp;s l o w  &nbsp;m o t i o n*  &nbsp;chưa? Phải chờ tận vài giây *(hoặc nhiều hơn thế =)))* để chờ `hot-reload` sau khi chỉnh sửa vài dòng mã chẳng hạn? Hoặc thậm chí có thể mất tới `20 - 45'` để có thể `deploy "xong"` một tiến trình - dù chỉ là lần sửa một lỗi nho nhỏ? 🥲🥲 

Phím với chiếc `Buddy` trong `team` về vấn đề này, mình được gợi ý từ khoá **`Vite`** - một `build tool` được cộng đồng ví von là **`Next Generation Frontend Tooling`**.

*Nom "chất lượng" quá nhỉ, cơ mà tìm hiểu một mình thì *"buồn ơi là buồn"*, đồng hành cùng mình trong bài viết này nhé!*

![](https://images.viblo.asia/7790891f-bceb-4556-827b-87bc8148d091.png)

*Đầu tiên, chúng ta ngó lại [`Module Bundler`](https://viblo.asia/p/frontend-build-cham-qua-thi-chay-ve-khoc-voi-vite-djeZ1E2GZWz#_-module-bundler--1) một chút!*

*Bạn nào rành đoạn này rồi thì có thể chuyển qua [Mục tiếp theo](https://viblo.asia/p/frontend-build-cham-qua-thi-chay-ve-khoc-voi-vite-djeZ1E2GZWz#_-vite-2) luôn nhaa ^^*

# ■ Module Bundler (*)

Để bắt đầu xây dựng một `website` theo phong cách "kinh điển" đó giờ, tất cả những gì chúng ta cần là `HTML`, `CSS` và đôi dòng `JavaScript`.

Nâng cấp hơn xíu xiu, khi muốn sử dụng những thư viện ngoài *(`Bootstrap`, `lodash` chẳng hạn)*, chúng ta sẽ `download` chúng về và nhúng vào `HTML/CSS`.

Điều này thì chẳng còn xa lạ gì đối với các anh chị em `web developer` rồi nhỉ 😸😸

Cơ mà nếu dự án có nhiều `dependencies` quá thì chúng ta quản lý như thế nào đây? Luôn phải `manually download` mãi hay sao? Kể cả khi chúng có các bản cập nhật mới?

![](https://images.viblo.asia/ad9ce24a-fd26-4a7d-ba09-1f15c9b136f3.gif)

Đó là lý do các `Package Manager` như *`Bower`, `NPM`, `Yarn`*... được sinh ra "cho đời bớt khổ" =))

Với `NPM` chẳng hạn, chúng ta sẽ có một `package.json` lưu thông tin dự án, một thư mục `node_modules` chứa tất cả các `packages` - cái dễ dàng được cài đặt thông qua dòng lệnh:

```js:Terminal
$ npm i PACKAGE_NAME
```

và rồi đính kèm chúng vào `HTML/CSS`:

```html:index.html
<script src="node_modules/.../package_1.js"></script>
<script src="node_modules/.../package_2.js"></script>
...
<script src="main.js"></script> 

<!-- Mỗi script X được định nghĩa bởi 01 global variable
=>   X có thể được dùng ở bất kì script nào được-load-sau-nó -->
```

Việc phải đào sâu vào `node_modules` để tìm vị trí của từng `package`  và lần lượt thêm thủ công gây ra bất tiện quá!!! *(sad)*

Để phá vỡ nguyên tắc này, [`CommonJS`](https://en.wikipedia.org/wiki/CommonJS) - dự án đưa ra các đặc tả về `modules` - đã cho phép `JavaScript` được `import/export`:

```js:main.js
const lodash = require('lodash');
// FYI, NodeJS là một trong những implementation phần modules của CommonJS
```

Nhưng `Browser` không có quyền truy cập đến các `file` hệ thống, nên để dùng `module` theo cách này, chúng cần được `load động`, bằng cách đồng bộ *(sẽ làm chậm quá trình thực thi)* hoặc bất đồng bộ *(có thể có vấn đề về thời điểm load)*.

Đó là chưa kể trong quá trình phát triển, chúng ta còn cài đặt thêm các `pre-processor` *(như `Pug`, `SCSS`,..)*; sử dụng `ES6`; tích hợp `TypeScript`; hay là `React` với `JSX`; rồi thì áp dụng một số phương pháp `performance optimization` như *`Code-spliting`, `Lazy-loading` theo `modules`*... với mục đích nâng cao `developer experience`. Trong khi đó, `browser` lại chỉ cần `HTML`, `CSS`  và `JavaScript` thôiii!?!

Với tất cả các vấn đề kể trên, một chiếc **`Module bundler`** sẽ giúp chúng ta *compile, transform, optimize, minify...* rồi đóng gói các `modules` này lại, tạo ra kết quả cuối cùng tương thích với `browser`.

![](https://cdn-media-1.freecodecamp.org/images/0*WwDTeWwIRxVPg5jK.png)

***(\*)** Nội dung này được tóm lược trong bài viết [`Giải thích về Javascript thời hiện đại cho khủng long`](https://viblo.asia/p/giai-thich-ve-javascript-thoi-hien-dai-cho-khung-long-Eb85oBM2l2G) siêu-hayyy siêu-chi-tiếttt của anh **`Tạ Duy Anh`** (respect)x10 👍️ 👍️*

Có thể kể tới một vài công cụ `module bundler` phổ biến mà bạn có thể đã từng nghe qua như: *`Webpack`, `Parcel`, `Rollup`, `Browserify`...* này, và bây giờ là `Vite`mà chúng ta sẽ tìm hiểu ngay trong phần tiếp theoo!

# ■ Vite

*Theo *[Trang chủ](https://vitejs.dev/guide/)*:*
> `Vite` is `a build tool` that aims to provide `a faster and leaner development experience` for modern web projects.

Tương tự các `build tools` phổ biến hiện nay, `Vite` có các chức năng cốt lõi như:
- `Project scaffolding` thông qua các `CLI generators`
- `Hot Reload Module` *(HRM)* - tự động `reload modules` trong quá trình `dev`
- `Plugin system` cho phép `config`, `custom` thêm một số chức năng
- ...

<br />

___

####  🐾  Chút Fun fact, có thể bạn ...thừa biết =)))

*`Vite` được đọc là *`/vit/`🔊*, trong tiếng Pháp có nghĩa là "nhanh chóng".*

*`Build tool` này được phát triển bởi [anh **`Evan You`**](https://evanyou.me/) - cha đẻ của `VueJS`. Bảo sao mà có`V-prefix` và phong cách viết `document` của `Vue` và `Vite` "da same" thế (LOL).*

*Bên cạnh mảng `Coding`, anh này học cả `Art`, `Design` và `UI/UX` nữa nên cũng nghệ lắm anh chị em ạ (yaoming) =='*
___

<br />



Ban đầu, `Vite` được tạo ra để phục vụ cho "gà cưng"  [`VueJS`](https://vite.new/vue), về sau thì hỗ trợ thêm [`React`](https://reactjs.org/), [`Preact`](https://vite.new/preact) và  [`Svelte`](https://stackblitz.com/edit/vitejs-vite-6m6vng?file=index.html&terminal=dev) nữa 😸😸 .

*Điều khiến `Vite` nhận được sự đón nhận tích cực từ cộng đồng là về tốc độ nổi bật của nó. Để lý giải tại sao `Vite` lại "nhanh" như vậy? Chúng ta cùng tìm hiểu cách hoạt động của nó trong `Development build` và `Production build` nhé!*

# ■ How Vite is faster?

### ■  Unbundled dev build
Khi chúng ta bắt đầu khởi chạy ứng dụng, `Vite` phân loại các `modules` thành `02 categories`:

- **Dependency modules**:
    - Chủ yếu là các `plain JavaScript` hoặc các `modules` được `import` từ `node_modules`, không thay đổi thường xuyên trong quá trình phát triển.
    - Ví dụ: *Một số `libraries`, `packages` như `Antd`, `Bootstrap`, etc.*
    - Các `modules` này sẽ được `pre-bundle` bằng [**`esbuild`**](https://esbuild.github.io/) - một **`JavaScript bundler`** được viết bằng `Golang`, hứa hẹn nhanh hơn người anh `Webpack` khoảng từ `10–100x` về mặt tốc độ.

- **Application modules**:
    - Là các `non-plain JavaScript` - cần được *chuyển đổi, biên dịch,...* và thường được chỉnh sửa thường xuyên.
    - Ví dụ: *`Component.jsx`, `styles.scss`, etc.* 
    - Dùng **[Native ES Modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) *(ESM)***.

Với tôn chỉ `On-demand compilation`, `Vite`  không-gói-tất-cả các `modules` lại với nhau *(điều này giảm được một khối lượng công việc đáng kể)*. `Vite` chỉ cung cấp các`modules` mà trình duyệt cần. Chúng có thể là **Application modules** kèm **Dependency modules** - cái mà đã được `pre-compile` bằng `esbuild` ở lần chạy đầu tiên.

![](https://miro.medium.com/max/1400/1*Lkud6S3RwVTLhgaeeIyvTw.png)

*[Anh  **`Evan You`**](https://evanyou.me/)  cũng đã chia sẻ về hiệu quả của `Native ESM dev build` trong `show` [`The Open Source Friday` của `Github`](https://www.youtube.com/watch?v=UJypSr8IhKY), bạn xem thêm nhé ^^*


### ■  Bundled prod build

Ngược lại với `no-bundle dev build` phía trên, `Vite` tiếp cận `prod build` vẫn theo hướng `bundle` thông qua một `module bundler` có tên là **[`Rollup`](https://rollupjs.org/guide/en/)**.

![](https://images.viblo.asia/ecf33b5e-87fb-4130-83fc-2bc55103b0bf.PNG)

*Hmmm...*

*Tới đây thì một vài câu hỏi được đặt ra...*

**(?) `Dev build` phía trên sử dụng `ESM` rồi sao `Production build` không dùng luôn?**

Theo chia sẻ của [anh **`Evan You`**](https://evanyou.me/), dù hiện tại, các `ESM` đã được hỗ trợ ở tất cả các trình duyệt chính, song, việc gom một `bundle.js` kèm các kĩ thuật `performance optimization`: *`tree-shaking`, `lazy-loading`, `chunk splitting`,...* vẫn mang lại hiệu suất tổng thể tốt hơn là hình thức `unbundled` - cái mà sẽ tạo ra nhiều `extra HTTP requests` hơn.

*Okayy, câu tiếp theo =)))*

**(?) Bảo `esbuild` nhanh, thế tại sao sang `Production build`, `Vite` còn dùng thêm `Rollup` chi vậy?**

Vẫn theo lời [anh **`Evan You`**](https://evanyou.me/) =)) Có một số tác vụ khó thực hiện hơn khi dùng `esbuild` như *`CSS code-splitting`, tự động tối ưu các đoạn mã không đồng bộ,...* nên dù thời gian `prod build` chậm hơn chút, nhưng sẽ có `performance` tốt hơn cho `end user`. Nom như là một sự đánh đổi  😹😹

*Chi tiết về bài phỏng vấn này, bạn có thể đọc thêm [tại đây](https://portal.gitnation.org/contents/vite-rethinking-frontend-tooling) nhé!*

*Giờ thì đặt `Vite` cạnh `Webpack` - một "tượng đài" `module bundler` được tin dùng và sử dụng rộng rãi - để so sánh chút nào!*
# ■  Vite vs. Webpack

### ■  Operating mechanism

Ngay chính trên *[Trang chủ](https://webpack.js.org/)*, `Webpack` đặt nhẹ một `slogan`:

> Bundle your scripts; Bundle your images; Bundle your styles; Bundle your assets.

*Quả là một người anh `bundle` "cả thế giới" (J4F) =))*

Theo `workflow`, trước một `browser request`, `Webpack` sẽ thu thập, xử lý, gom góp, đóng gói các `modules` lại thành `01 bundle.js` để sử dụng như hình mô tả dưới:

![](https://miro.medium.com/max/1400/1*n9Svn3juqhsoQ-B0B9vpvw.png)

So sánh với `Vite` ở phía trên một chút:

| Scope | Webpack | Vite |
| -------- | -------- | -------- |
| **Supported modules**     | `ES Modules`, `CommonJS`, `AMD Modules`     | `ES Modules`     |
| **Dev Server** | `Bundled modules` served via `webpack-dev-server` using `Express.js`| `ES-Modules` served via `Vite` using `Koa` - a lightweight node web server |
| **Production build** | `Webpack` | `Rollup` |

<br/>

*Vậy còn về `tốc độ` thì sao?*

### ■  Speed

Trong trận "battle" này, chúng ta sẽ so sánh một ứng dụng `ReactJS` lần lượt sử dụng `Vite` và `Webpack` nhé!

*FYI, nếu đã tiếp cận với `ReactJS`, hẳn bạn đã từng dùng qua `Create-React-App` *(CRA)* để khởi tạo dự án rồi nhỉ? `CRA` nhà mình sử dụng `Webpack` như `01 build tool` nha. Bạn có thể ghé qua bài viết ***[Điều React luôn giữ kín trong tim](https://haodev.wordpress.com/2021/01/22/dieu-react-luon-giu-kin-trong-tim/)*** nếu muốn tìm hiểu thêm về nó.*

Xem kết quả về tốc độ cho một `sample app` với `02 routes`, `06 components`trên cùng một máy tính:

| Scope | React with Webpack in CRA | React with Vite |
| -------- | -------- | -------- |
| **Server start duration**     | 12s     | 298ms     |
| **Build duration**     | 16.66s     | 9.11s     |


Thật ra,  với ví dụ bé con phía trên, từ `ms` tới vài `s`, chúng ta vẫn có thể dễ dàng hài lòng và chấp nhận được. Song, nếu tính tỉ lệ %, giả sử quá trình `build` ứng dụng hiện tại của bạn đang là `30'`, giờ có thêm `Vite`, đời bỗng vui với thời gian chờ còn lại chỉ còn khoảng `~12-15'`. Nghe vẻ ấn tượng quá nhỉ!

*Bạn có thể xem thêm một ví dụ khác về *`Creation time`, `Project size`, `Build time`, `Build size`* của một anh Ấn tại [video này](https://www.youtube.com/watch?v=nKfzcLPXl0s) 😸😸*.

<br />


#### 🐾   Đừng hiểu nhầm nhé !!!
Mình không cố "dìm" `Webpack` và "ca tụng" `Vite` đâu 😺😺

Chẳng phải tự nhiên mà `Webpack`được tin dùng và sử dụng rộng rãi như vậy đúng không nào ^^ Bản thân nó đã và đang làm rất tốt rồi. Bắt đầu như một `JavaScript-focused bundler`, `Webpack` có các `default configurations` vô cùng đơn giản, cho phép chúng ta `customize` rất-rất-đa-dạng.

Chính vì có tính `configurable` linh hoạt như vậy, đa phần `90%` các công cụ sử dụng `Webpack` đều phải `config` các `conventions` thường hay được sử dụng trong một hệ sinh thái nào đó *(giả sử như việc `compile ES6, JSX` trong `React` chẳng hạn, chúng ta có `Create React App`)*.

Mục-đích-chính [anh **`Evan You`**](https://evanyou.me/) tạo ra `Vite` là xây dựng những `default configurations` tương ứng với các `libraries`, giúp chúng ta tập trung vào nghiệp vụ quan trọng hơn. Bên cạnh đó, vì không phải `default configurations`nào cũng phù hợp nên `Vite` cũng cho phép chúng ta `customize` chút thông qua các `plugins`. 

Thế nhưng `Vite` không-có-mục-tiêu-thay-thế-hoàn-toàn `Webpack` nha. Việc lựa chọn `Vite`, `Webpack`, `Parcel` hay bất kì một `build tools` nào cho dự án cũng tương tự như việc lựa chọn công nghệ để theo đuổi vậy. **Không có công nghệ nào là tốt nhất, quan trọng hơn cả vẫn là sự phù hợp.**

![](https://cdn130.picsart.com/308580741189211.gif?to=crop&r=256)

*Quay lại bài viết của chúng ta, với ưu điểm về tốc độ của `Vite` như vậy, có anh chị em nào đã nghĩ tới việc đề xuất ý kiến `migrate` `build tool` của dự án hiện tại sang `Vite` trong buổi `Daily` sắp tới của `team` chưaaa ạ?*

*Trước khi đưa ra quyết định thì chúng ta cùng xem việc chuyển đổi như vậy có tốn nhiều công sức không nhé! Mình sẽ lấy ví dụ với `ReactJS`.*

# ■ React with Vite

### ■  Init a React app with Vite

Để khởi tạo một dự án `ReactJS` sử dụng `Vite` như một `build tool`, chúng ta chạy dòng lệnh:

```js:Terminal
$ npm init vite PROJECT_NAME --template react
```

Xem qua chút `folder structure` thì có vài điểm khác biệt so với `CRA`:


| Scope | CRA boilerplate | Vite boilerplate |
| -------- | -------- | -------- |
| **Entry point**      | `index.js`     | `index.html`     |
| **Dependencies**    | `react-scripts`     |   `@vitejs/plugin-react`   |
|  **Bundler config**     | `Webpack`     |   `Vite`   |

<br />

*Từ sự khác biệt này, chúng ta có các bước để `migrate` từ một dự án `CRA` đang phát triển qua dùng `Vite` như  sau:*

### ■  Migrate CRA to Vite

Đầu tiên, bỏ/thêm một số `dependencies`:

```js:Terminal
$ npm remove react-scripts
$ npm install --save-dev @vitejs/plugin-react vite 
// Vite không dùng react-scripts mà dùng chính plugin của nó
```

`Config` chút:

```js:vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => defineConfig({
    plugins: [react()],
    define: {
        "process.env.NODE_ENV": `"${mode}"`,
    }
});
```

Di chuyển `index.html` ra ngoài:

```html:root/public/index.html->root/index.html
...
<link rel="icon" href="/favicon.ico" />             <!-- Bỏ "%PUBLIC_URL%" --> 
...
<div id="root"></div>
<script type="module" src="/src/index.js"></script> <!-- Đính thêm script --> 
```

Cập lại chút `script` với `vite`:

```js:package.json
{
    ...
    "scripts": {
        "start": "vite",
        "build": "vite build"
    },
}
```


Ngoài ra, với các `.env` *(nếu có)*:
```js:.env
// Change
REACT_APP_ENV = https://haodev.wordpress.com
// To
VITE_ENV = https://haodev.wordpress.com
```

Cuối cùng thì:

```:Terminal
$ npm start 
```

và trải nghiệm thôiii!  😸😸

# ■ Sumup

Như vậy là chúng ta đã cùng nhau *Có cái nhìn tổng quan về `Module Bundler`; Tìm hiểu và khám phá cách hoạt động của `Vite`; So sánh chút với người anh `Webpack` và Tích hợp `Vite` vào ứng dụng `ReactJS`* rồi nè!!!

Mặc dù `Webpack` vẫn là một `build tool` được `Next.js`, `Create React App`,... ưa chuộng nhưng chúng ta cũng chẳng thể nào phủ nhận `Vite` - một ứng cử viên sáng giá trong tương lai - với những ưu điểm vượt trội về tốc độ.

*Bạn nghĩ sao về `build tool` này, hãy chia sẻ ý kiến xuống phía dưới `comments` nhé!*

![](https://cdn140.picsart.com/289323672011202.png)

Hy vọng rằng bài viết này có thể giúp ích được các bạn. Cảm ơn các bạn đã đọc bài chia sẻ, mình rất vui nếu được **`ủng hộ 01 upvote`** để có thêm động lực cho những bài viết sắp tới ạ <3

<br />

____

#### 🐾  Dành cho các ace quan tâm tới `Vietnam Mobile Day 2022`

*FYI, `Vietnam Mobile Day` là sự kiện thường niên do `Top Dev` tổ chức. Hai năm sau `COVID-19`, `Vietnam Mobile Day 2022` với chủ đề `WE CONNECT` đã quay trở lại hình thức `offline` tại hai thành phố lớn:*

- ***Hà Nội: `10/06/2022` | CTM Palace***
- ***Hồ Chí Minh: `03/06/2022` | Melisa Center***

*Thông tin chi tiết về sự kiện, mình để [tại đây](https://mobileday.vn/) nhé!*

*Mình cũng có một chiếc Early bird rùi ^^ Các anh chị em đăng ký tham gia sự kiện thì có thể sử dụng thêm 01 Voucher:*
- **`GIAM50K@VMD2022`** để được giảm **`-50k`** *(Số lượng: 05)*
- **`HAODEV@VMD2022`** để được giảm **`-30k`** *(Cập nhật: Mã này đã deactivated)*

*khi mua vé nhaaa ^^*


*Lưu ý chút là các mã không áp dụng đồng thời và số lượng giới hạn ạ ^^*

____


![](https://images.viblo.asia/bcac0ae4-37b9-4f82-a75a-8dc9bbdd51ba.gif)

*Chúc các bạn tuần làm việc hiệu quả! Tiện ghé qua [nhà mình](https://haodev.wordpress.com/) chơi một chút rồi về!*


# ■ Credits

- **Resources: [Vite Document](https://github.com/vitejs/vite), [The Open Source Friday Show](https://www.youtube.com/watch?v=UJypSr8IhKY) , [GitNation](https://portal.gitnation.org/contents/vite-rethinking-frontend-tooling), [Nilanth from Dev.to](https://dev.to/nilanth/use-vite-for-react-apps-instead-of-cra-3pkg), [Keefdrive from Dev.to](https://dev.to/keefdrive/create-react-app-vs-vite-2amn), [Bits and Pieces](https://blog.bitsrc.io/vite-is-better-than-webpack-d5dd59610d56), [Harlanzw](https://harlanzw.com/blog/how-the-heck-does-vite-work/#understanding-webpack), [Ta Duy Anh's post](https://viblo.asia/p/giai-thich-ve-javascript-thoi-hien-dai-cho-khung-long-Eb85oBM2l2G), [Radixweb](https://radixweb.com/blog/webpack-vs-vitejs-comparison), [Freecodecamp](https://www.freecodecamp.org/news/lets-learn-how-module-bundlers-work-and-then-write-one-ourselves-b2e3fe6c88ae/).**
- **Thumbnail: [Asset from May Fest 2022](https://mayfest.viblo.asia/), [Design via Canva](https://www.canva.com).**
- **Policies:**
    - [**This original article from My Make It Awesome blog**](https://haodev.wordpress.com/2022/05/23/frontend-build-cham-qua-thi-chay-ve-khoc-voi-vite%ef%bf%bc/).
    - **Use my contents for sharing purpose, please attached resource linked to [my blog](https://haodev.wordpress.com/2022/05/23/frontend-build-cham-qua-thi-chay-ve-khoc-voi-vite%ef%bf%bc/).**
    - **Use my contents for trading purpose, please [contact me](https://haodev.wordpress.com).**
    - **Support: [Buy me a pizza](https://www.buymeacoffee.com/haolt).**
- **Copyright:** **The posts in a spirit of sharing knowledge. If there is anything with regard to copyright of your contents, please [contact me](https://haodev.wordpress.com).**

<br/>


***Happy coding!***