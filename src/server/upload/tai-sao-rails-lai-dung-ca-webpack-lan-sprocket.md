Khi Rails 6 được ra mắt, có thể bạn đã từng tự hỏi. WTF, sao **Webpack** đã được add vào rồi, mà **Sprocket** vẫn tồn tại thế kia :|

**Chẳng phải Webpack và Sprocket được dùng để giải quyết chung một công việc hay sao?**

Không phải một mình bạn có thắc mắc như vậy đâu. Câu hỏi này liên tiếp xuất hiện trên các diễn đãn như [Reddit](https://www.reddit.com/r/rails/comments/9zg7fe/confused_about_the_difference_between_sprockets/) hay [StackOverflow](https://stackoverflow.com/questions/55232591/rails-5-2-why-still-use-assets-pipeline-with-webpacker) hay ở [post Reddit](https://www.reddit.com/r/rails/comments/dfww82/best_practice_for_webpacker_in_rails_6_do_i_need/) này nữa.

Hoặc cả đây:

![](https://images.viblo.asia/8a404f6b-dad4-4013-87a0-04663ea153a4.png)

Và đây nữa:

![](https://images.viblo.asia/b8cae0a6-0c77-4b49-b137-770d27361c3a.png)


Rõ ràng rằng, việc Webpacker và Sprockets cùng tồn tại là một điều bất ngờ. Và phải có lý do hợp lý để giải thích cho điều đó.

Bạn không hề sai nếu nghĩ rằng, Sprockets và Webpack cùng giải quyết 1 vấn đề:

**Packaging assets (JavaScript, CSS, images, fonts) cho các browser.**

Cụ thể, cả Sprockets và Webpack sẽ cùng:
- Hợp nhất các source files thành một vài cái bundles.
- Chuyển đổi các source files từ dạng syntax này sang dạng khác.
- Minify và fingerprint các assets khi build ở Production.
- Tự động rebuild source file ở môi trường Development.
- Thực hiện tất cả các việc trên cho cả Javascript lẫn CSS.

Tuy nhiên, Sprockets và Webpack xử lý việc đóng gói assets theo cách rất khác nhau.

Sprockets được ra mắt vào năm 2007, trước khi có Node.js, trước thời kỳ hoàng kim của Javascript, trước thời xuất hiện của một số module như CommonJS, AMD, EcmaScript, trước Webpack, browserify, ...
Tại thời điểm đó, Sprockets là một bước nhảy vọt trong việc quản lý assets.
Nhưng dần dần nó không còn bắt kịp với những cải tiến về tools, browsers như các project khác tới từ cộng đồng Javascripts.

Mặt khác, Webpack bánh bao đầy đủ các concept về Javascript modules. Nó tích hợp được với Babel, PostCSS và các web framework mới nhất.

Nó support một số cú pháp module, kể cả [dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) dùng cho [code splitting](https://webpack.js.org/guides/code-splitting/).

Túm lại, webpack module hóa cực kỳ tốt và rất flexible.

### Vậy tại sao Rails lại vẫn dùng cả 2?

Dưới đây là câu trả lời của DHH vào năm 2016 khi Webpack lần đầu tiên được recommend làm Javascript compiler trong Rails 5.1.

![](https://images.viblo.asia/94c3dd5f-41d7-4a76-a8f7-ca7a1e3c746e.png)

> **We will continue to use the asset pipeline for JavaScript sprinkles, CSS, images, and other static stuff. The two approaches coexist great.**

Để giải thích rõ hơn về quyết định này, DHH đã rep trong PR của ổng trên Github để [đưa Webpacker thành Javascript compiler mặc định ở Rails 6](https://github.com/rails/rails/pull/33079#issuecomment-400140840)

![](https://images.viblo.asia/294331ea-ca8a-4528-a332-69b8711b4203.png)

> @dwightwatson Out of curiousity, what is the argument to continue using Sprockets for CSS/static assets when Webpacker supports them by default out of the box?

> @dhh Webpack’s support is awkward in my opinion and does not offer any benefits over Sprockets. Unlike in the realm of JavaScript compilation.

Khi nói tới việc đóng gói assets, phong cách của Rails sẽ là - **sử dụng Webpack cho Javascript** và **Sprockets cho những thứ còn lại**.

Default trên Rails 6, về cơ bản sẽ giống cách mà Basecamp hiện đang dùng - tiếp tục **compiles CSS, images, fonts bằng Sprockets**.
*(FYI: Basecamp là 1 product mà DHH đang làm co-founder và CTO)*

Nói một cách khác, tất cả các file Javascript của bạn sẽ nằm trong folder `app/javacripts`, còn file CSS, images sẽ ngự tọa tại `app/assets`.

Chạy lệnh `rails assets:precompile` đầu tiên Sprockets sẽ build assets bên trong `public/assets`, sau đó tới Webpack build assets trong `public/packs`.

Tôi phải nói rõ rằng, điều đó KHÔNG có nghĩa bạn phải dùng cả Sprockets lẫn Webpacker để build assets. 
Hai process xử lý assets này hoàn toàn độc lập và không hề share dependencies tý nào. 

Nó được build theo cách có thể dùng chung trong Rails mà không gặp vấn đề gì.

Và tất nhiên, bạn cũng có thể chỉ sử dụng 1 trong 2, Sprockets hoặc Webpacker mà thôi.

### Why?

DHH nói rằng, cách mà Webpack xử lý assets dạng non-Javascript khá củ chuối.

Ổng nói như vậy bởi, để bundle CSS và image bằng Webpack, buộc bạn phải import CSS và images bên trong file JS.

```Javascript

import '../application.css'

import myImageUrl from '../images/my-image.jpg'
```

Nguyên nhân là do Webpack coi **tất cả mọi thứ là Javascript module** - TẤT CẢ đấy.

Để sử dụng CSS bằng Webpack, bạn import nó giống như cách import Javascript module. 
Để dùng image với Webpack, điều tương tự cũng xảy ra.

Tùy thuộc vào quan điểm của bạn, còn tôi thấy điều này có vẻ ... không hợp lý cho lắm, đặc biệt với những Rails developers đã từng sử dụng Sprockets.

Đây không chỉ là quan điểm của người dùng Rails. Hãy xem xét tweet gần đây từ một người có tiếng nói trong cộng đồng React, Ryan Florence:

![](https://images.viblo.asia/2ea0e5f3-a96f-47b8-9f76-cb89b9307512.png)

Tuy hơi củ chuối, nhưng tư duy "Everything is a Module" của Webpack cũng rất lợi hại. Na ná với cái kim chỉ nam "Everything is an Object" trong Ruby.

### Chọn Webpack hay Sprocket (hay cả 2)

Tôi nghĩ việc này không khó quyết định lắm. 
Cách setting mặc định của Rails là phương hướng mà Basecamp đang sử dụng, nhưng điều đó không có nghĩa bó buộc bạn phải làm giống họ.

Bạn có thể sử dụng cả 2, theo cách mà Basecamp đang làm bây giờ, hoặc chỉ dùng một loại thôi. 

Để giúp bạn lựa chọn, dưới đây là bài viết gợi ý: https://github.com/reactjs/react-rails/wiki/Choosing-Sprockets-or-Webpacker

#### Why Sprockets?

- Rails app của tôi không dùng nhiều JS.
- Tôi thích dùng global scripts và JQuery plugin. Tôi không cần tới Javascript module.
- Upgrade hệ thống Rails app sang Webpacker có thể tốn nhiều chi phí.
- Tôi không cần tới các tool cho môi trường local development.
- Rails app của tôi có đủ các assets gem rồi, và không cần tới NPM.

#### Why not Sprockets?

- Sprockets làm chậm local development.
- Tôi cần customize nhiều ở quá trình asset compile.
- App của tôi có nhiều Javascript, và tôi cần phân tách code.
- Tôi lo ngại về việc upgrade hệ thống sau này.

#### Why Webpacker?

- Tôi muốn sử dụng hệ thống Javascript module để quản lý các dependencies, limit các scope.
- Tôi muốn tận dụng các tính năng xịn xò từ ES6+, Babel, PostCSS.
- Tôi muốn phân tách code JS.
- Tôi muốn bộ tool xịn xò cho local development.
- Tôi muốn build Single Page Apps.

#### Why not Webpacker?

- Rails app của tôi không cần nhiều JS.
- Tôi là backend developer, và không biết nhiều về JS.
- Tôi không có thời gian để hiểu rõ về Webpacker.

#### Why use both?

- Tôi thích theo hướng mà Rails đang đề xuất: Webpacker cho Javascript và Sprockets cho CSS, images, font.
- Tôi muốn nâng cấp từ Sprockets lên Webpacker từng bước một.

### Nguồn:

- https://rossta.net/blog/why-does-rails-install-both-webpacker-and-sprockets.html