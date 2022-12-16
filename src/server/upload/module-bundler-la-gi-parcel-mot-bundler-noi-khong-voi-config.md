![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/11/Bundler-Blog-image.png?w=820&ssl=1)
Dạo này mình học lại về bên FE, và đang luôn tiện mentor cho một bạn sinh viên mới ra trường vào công ty. Thật trùng hợp là bạn ấy bắt đầu hành trình này y chang tớ, và tên cũng trùng với một đàn chị đã từng làm việc cùng tớ những ngày đầu tiên.

Nhờ được công ty tin tưởng làm mentor của người ta, tớ được dịp học và ôn lại nhiều kiến thức về thế giới front-end. 

Trong bài viết hôm nay, tớ chia sẻ về “bundler”.

(Image from blog.mallow-tech.com)

## Module bundler đã được sinh ra như thế nào?
Nếu bạn từng làm front-end developer, hẳn bạn đã từng ít nhất một lần làm việc với webpack, rollup, parcel, @babel/core, … và bạn có biết tất cả các bạn này có tên chung là gì hông? là module bundler đó. 

Vậy thì bundler là cái thứ gì? Vì sao lại cần đến nó? Có vẻ dùng phổ biến phải không? 

### Chuyện làm web thời xưa
Thời xưa, người ta chẳng cần bundler gì sất. Câu chuyện này giống như chuyện thời xưa người ta không cần điện thoại ấy.

Để xây dựng một trang web, cần các nguyên liệu chính là HTML, CSS và JS. Điều này nghe đơn giản và dễ hiểu đúng không? 

### Chuyện làm web thời nay

Còn thời nay, chẳng ai build website với chỉ HTML, CSS, JS cả. Ít nhất ấy, thì cũng có một vài thứ khác bổ trợ như html-inspector, jQuery, React, Angular, .. và còn nhiều loại module javascript khác nữa.

Còn chưa kể app script không chỉ một file là xong logic cho cả trang web được, dev cần tách ra nhiều files để dễ quản lý code hơn, như là theo từng phần của trang web chẳng hạn: script-header.js, script-footer.js, script-about-page.js, …

Và thế là, <script> tags trong cái body hay header hay cả hai bắt đầu xếp hàng dài nối nhau như thế này:
```html
<body>
    <script src="script-header.js"></script>
    <script src="script-footer.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html-inspector/0.8.2/html-inspector.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</body>
```
Thêm nữa nếu mấy cái script ở trên mà phụ thuộc vào nhau, không được sắp đúng vị trí thì bạn sẽ gặp các lỗi dạng như “Uncaught ReferenceError: $ is not defined“
    
![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/11/error-require.jpeg?resize=768%2C205&ssl=1)
    
Lỗi này xảy ra khi bạn viết code jquery trong file script-header.js mà load script jQuery ở sau file này. Thì lúc trình duyệt đọc đến file script-header.js nó sẽ báo lỗi là không tìm thấy jQuery.

Để sửa lỗi này thì các mô-đun được sử dụng ở những loại mô-đun cần được sắp xếp đúng thứ tự. Và thử tưởng tượng nếu có nhiều script thì việc sắp xếp chúng theo đúng thứ tự cần ưu tiên script nào load trước, cái nào load sau là cả một vấn đề, chưa nói chuyện nhìn vào cũng hơi hoa mắt.
### Tui - bundler ra đời
Chính vì cái sự đa dạng và phong phú của các modules được sử dụng ngày càng nhiều, và sự dính chùng vào nhau khi mô-đun A dùng code của mô-đun B rồi mô-đun C dùng code của mô-đun D, nên tui – **bundler** mới được ra đời. 

Cám ơn tui đi 🥳

Nhiệm vụ chính của tui là gom hết tất cả các loại script lại cùng nhau theo thứ tự ưu tiên mà bạn đặt cho tụi nó và cho ra một file script duy nhất.
    
![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2021/11/bundler-1.png?resize=768%2C300&ssl=1)
**Chưa kể, nếu bạn:**
– không muốn xài javascript nữa, mà muốn xài typescript? Tui ok luôn

– không muốn xài HTML mà xài React? Tui ok luôn

– không muốn xài CSS mà xài SASS? Tui cũng ok luôn

Chưa hết, tui còn bao trọn gói các loại modules khác như là lodash, firebase, …
![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2021/11/Screen-Shot-2021-11-16-at-22.21.54.png?resize=768%2C474&ssl=1)
Yên tâm, tui sẽ giúp bạn build hết mấy cái đứa ở trên đó về HTML, CSS, JS cho browser có thể hiểu và dựng trang web của bạn lên được.

Quá ngon rồi đúng chưa 😊 

### Cái khó của bundler
Tuy nhiên, vì cái sự rối rắm của bạn – đúng – chính bạn đó 😅, là dùng quá nhiều các thể loại mô-đun như thế. Thì để tui làm đúng theo được ý của bạn, thì bạn cũng cần cực một xíu chớ, đâu có chi dễ ăn như vậy 🥲.

Cái cực ở đây là, bạn cần config tui, để tui biết đàng bạn muốn cái mô-đun mô chạy trước chớ 😹

Dưới đây là một ví dụ đơn giản về file webpack.config.js:

```json
module.exports = {
   entry: "./src/index.js",
   output: {
      filename: "bundle.js",
      path: path.resolve("dist")
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: "/node-modules/",
            use: "babel-loader"

         },
         {
            test: /\.html$/,
            use: "html-loader"
         },
         {
            test: /\.(scss|sass)$/,
            use: ["style-loader", "css-loader", "sass-loader"]
         }
      ]
   }

}
```
    
## Parcel - một bundler nói "không" với config
Không biết bạn có thắc mắc: *“Thế thì bundler nào được dùng phổ biến nhất?”* 
    
Đó là [webpack](https://webpack.js.org/) nha, hem phải [Parcel](https://parceljs.org/), cái mà mình tính giới thiệu đây đâu =))

Thêm câu nữa: *“Tại sao chọn Parcel để giới thiệu đây?“*

Thì theo như cái tựa đề đó, mình muốn giới thiệu một bundler nó không với config, để các bạn mới có thể bắt đầu một cách dễ dàng nhất có thể, và luôn tiện làm quen với bundler luôn nè.

### Xây dựng web app với Parcel

Cái phần này, mình nghĩ nếu bạn muốn thực hành ấy, thì vào thẳng đường link [Building a web app with Parcel](https://parceljs.org/getting-started/webapp/) nha.

Sau khi bạn làm theo hướng dẫn, chỉ cần vào folder project của bạn, gõ `npx start` là có thể run app lên rồi(cái này dễ quá + người ta hướng dẫn đầy đủ lắm rồi nên mình lười ấy).

---
Bài blog hôm nay nội dung chỉ có vậy thôi, chủ yếu mình muốn nói về cái bundler là chủ yếu ấy. Nếu bạn nào thấy mình viết sai sót gì nhớ comment góp ý nha, hiu hiu.

Hi vọng khi các bạn sử dụng các loại bundler có thể hiểu lý do vì sao cần tụi nó và thấy biết ơn khi cần config, và không quạu nhé 💪

[Bài gốc của nội dung này](https://beautyoncode.com/module-bundler-la-gi-gap-parcel-mot-bundler-noi-khong-voi-config/) nằm trên blog cá nhân của mình nhé!

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!