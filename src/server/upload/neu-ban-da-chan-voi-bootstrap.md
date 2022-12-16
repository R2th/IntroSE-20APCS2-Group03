<div align="center">
    
# Lời mở đầu
    
</div>

Nếu là một web developer, dù chỉ mới bắt đầu hay đã làm việc lâu dài thì chắc hẳn bạn sẽ không còn lạ lẫm gì với Bootstrap- một css framework mà [họ](https://getbootstrap.com/docs/4.5/getting-started/introduction/) tự tin khẳng định rằng phổ biến nhất trên thế giới để thực hiện responsive và xây dựng template. Đơn giản mà nói thì Bootstrap được sử dụng phổ biến, cộng đồng rộng lớn thì sẽ giúp cho bạn có thể dễ dàng tìm kiếm tài liệu, sự trợ giúp khi có vấn đề. 

>Get started with Bootstrap, the world’s most popular framework for building responsive, mobile-first sites, with jsDelivr and a template starter page.

Tuy nhiên, cái gì nhiều quá cũng sẽ gây ra nhàm chán, và nếu bạn đã chán với Bootstrap, thì bài viết này sẽ giới thiệu đến bạn một CSS framework khác "mới mẻ" hơn, đó chính là "**[Tailwind](https://tailwindcss.com/docs/installation)**".

<div align="center">
    
# Nội dung 
    
</div>

- Bài viết sẽ được chia ra làm 2 phần chính, đó là giới thiệu khái quát về framework Tailwind, và phần 2 là đưa ra những ưu điểm, nhược điểm để người dùng (chính là các bạn) quyết định xem có lựa chọn tìm hiểu sâu hơn và sử dụng [**Tailwind**](https://tailwindcss.com/docs/installation) hay vẫn sẽ trung thành với [**Bootstrap**](https://getbootstrap.com/docs/4.5/getting-started/introduction/).

<div align="center">
    
## Giới thiệu về Tailwind
    
</div>

- Trước tiên cần làm rõ một điều rằng, dù đều là css framework, tuy nhiên [**Tailwind**](https://tailwindcss.com/docs/installation) và [**Bootstrap**](https://getbootstrap.com/docs/4.5/getting-started/introduction/) về cơ bản là khác nhau. Nói đơn giản thì **Bootstrap** cung cấp cho bạn những bộ khung dựng sẵn, đến mức mà bạn có thể nhìn cái là nhận ra nó là của **Bootstrap**, còn **Tailwind** thì cung cấp cho bạn những class nhỏ hơn, để bạn có thể tự lắp ghép customize theo ý muốn của bản thân mình.

### Installation
- Cài đặt **Tailwind** thì cực kì đơn giản, cũng giống như **Bootstrap** thì bạn sẽ có 2 option là sử dụng CDN hoặc cài đặt vào project:
    - **CDN**:
        ```html
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
        ```
       Tuy nhiên, nếu sử dụng CDN thì bạn sẽ không thể sử dụng những tính năng sau:    
        - Custom theme mặc định của Tailwind 
        - Sử dụng các directives như @apply, @variants, ...
        - Sử dụng tính năng ví dụ như `group-hover` (Pseudo-class variants)
        - Cài đặt plugins bên thứ ba 
       
   - Vì vậy, để sử dụng được đầy đủ tính năng, hãy cài đặt tailwind vào project thông qua câu lệnh:
       ```bash
       # Using npm
       npm install tailwindcss

       # Using Yarn
       yarn add tailwindcss
       ```
       - Tiếp theo là thêm tailwind vào trong CSS bằng 1 trong 2 cách: `import` hoặc `thêm-trực-tiếp`
           ```css
           #them-truc-tiep (directive)
           @tailwind base;
           @tailwind components;
           @tailwind utilities;    

           #import (nên sử dụng cách này)
           @import "tailwindcss/base";
           @import "tailwindcss/components";
           @import "tailwindcss/utilities";
           ```
       - Tạo file config bằng câu lệnh
           ```bash
           npx tailwindcss init #sinh ra file tailwind.config.js
           npx tailwindcss init -p # thêm flag -p để tạo thêm file postcss.config.js
           ```
      - Cuối cùng, tùy thuộc vào công cụ quản lý css mà bạn sử dụng (webpack, gulp, laravelMix ...) sẽ cần config khác nhau, bạn có thể tìm thêm ở [đây](https://tailwindcss.com/docs/installation#build-tool-examples). Ở đây mình sử dụng webpack thì sẽ có 2 cách:
          - Thêm vào file `postcss.config.js`
              ```postcss.config.js
              module.exports = {
                  plugins: [
                    // ...
                    require('tailwindcss'),
                    require('autoprefixer'),
                    // ...
                  ]
                }
              ```
          - Thêm vào file `webpack.config.js`
              ```webpack.config.js
               module.exports = {
                  // ...
                  module: {
                    rules: [
                      {
                        // ...
                        use: [
                          // ...
                          {
                            loader: 'postcss-loader',
                            options: {
                              postcssOptions: {
                                ident: 'postcss',
                                plugins: [
                                  require('tailwindcss'),
                                  require('autoprefixer'),
                                ],
                              },
                            }
                          },
                        ],
                      }
                    ],
                  }
                }
              ```
- Và như vậy là bạn đã có thể sử dụng được Tailwind cho project của mình rồi. Sau đây là một số tính năng nổi bật mà mình muốn giới thiệu cho các bạn!
### Pseudo-Class Variants 
- Cái này là mình lấy tên trên doc của tailwind, không biết phải dịch ra thế nào cả, còn giải thích đơn giản thì nó cho phép bạn có thể dễ dàng đặt css cho các sự kiện như `hover, focus, active, disabled, ...`
- Cách sử dụng thì rất đơn giản, bạn chỉ cần để tiền tố `event:` đứng trước những class mà bạn muốn.
- Ví dụ: như đoạn code ở phía dưới đây, thì khi `hover` vào button phía dưới thì nó sẽ nhận 2 class là `bg-blue-500` và `text-white`, những event khác cũng sẽ làm tương tự như vậy. Và như các bạn có thể tưởng tượng là nếu có n-class thì bạn sẽ phải viết n-lần `event:`, cái này khá là confused :grinning::grinning::grinning::grinning:
    ```html
   <button class="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white">
         Button
    </button>
    ```
### Customize
 - Để có thể tự customize các class cho project của mình, bạn chỉ cần chạy câu lệnh:
     ```bash
     npx tailwindcss init
    ```
    để sinh ra file `tailwind.config.js` và bạn sẽ khai báo những giá trị custom theo ý muốn của mình giống như bên dưới
    ```tailwind.config.js
    module.exports = {
      important: true,
      theme: {
        extend: {},
        fontSize: {
          xs: '.75rem',
          sm: '.875rem',
          tiny: '.875rem',
          base: '1rem',
        },
        colors: {
          black: '#000000',
          white: '#FFFFFF',
          'white-secondary': '#FEFEFE',
          'white-gradient': '#FBFBFC',
          text: '#1A1A1A',
          secondary: '#848486',
        },
      },
      variants: {},
      plugins: [],
    }
    ```
    
<div align="center">
    
## Ưu, nhược điểm của tailwind
    
</div>

- **Ưu điểm**:
    - Những class của tailwind đã bao gồm sẵn những giá trị tùy biến, việc cảu người dùng là gọi class tương ứng, nhờ vậy mà người dùng có thể không cần phải viết css nữa
    - Style, màu sắc, font chữ hiện đại, phù hợp với phong cách web hiện đại
    - Tuy số class sử dụng trong tailwind là rất nhiều, tuy nhiên cách đặt tên class lại rất dễ hiểu và gợi nhớ (*`VD: padding-top = pt, margin-left = ml, ...`*)
    - Sử dụng Flex nên rất dễ chia Layout
    - Dễ cài đặt, dễ sử dụng, document của Tailwind rất dễ hiểu, có thể xây dựng nhanh giao diện và khả năng customize tốt hơn so với Bootstrap.
     - Đối với những thuộc tính font-size, color, nếu giá thị mong muốn của bạn không có sẵn thì bạn vẫn sẽ phải viết css để tự customize (có nhiều người coi đây là nhược điểm vì vẫn phải tự viết css, tuy nhiên mình thấy đây là một ưu điểm để người dùng có thể tự do customize theo ý muốn cá nhân của mình).
     - 
- **Nhược điểm**:
    - Như có nói ở trên thì bạn sẽ sử dụng số class cực kì nhiều, số class sẽ tương ứng với với số thuộc tính mà bạn muốn cài đặt
    - Chưa có những bộ mixin khi muốn set nhiều thuộc tính cần thiết. 

- Trên đây là những ý kiến của mình về ưu điểm cũng như là nhược điểm của tailwind, nếu các bạn muốn bổ sung hoặc đóng góp ý kiến cá nhân, đừng ngần ngại mà comment xuống dưới bài viết này nhé!

<div align="center">
    
# Tổng kết
    
</div>

- Hi vọng sau bài viết này, mọi người đã có thể có thêm một option mới khi cần phải lựa chọn sử dụng framework CSS cho dự án của mình. Rất cảm ơn các bạn đã dành thời gian theo dõi bài viết.
    -  nếu thấy bài viết hay và hữu ích, hãy upvote bài viết ủng hộ mình hoặc clip để lưu sau này xem lại nhé
    -  còn nếu có vấn đề gì về kiến thức, cách diễn đạt, hãy comment nhận xét xuống dưới để mình giải đáp, chỉnh sửa để những bài viết sau ngày càng chất lượng hơn nhé

<div align="center">
    
# Tài liệu tham khảo
    
</div>

- Trang chủ tailwind: https://tailwindcss.com/docs/installation
- Viblo: 
  + tailwind: https://viblo.asia/tags/tailwind
  + bootstrap: https://viblo.asia/tags/bootstrap
- Google: https://www.google.com/search?q=tailwind+framework&oq=tailwind+frame&aqs=chrome.1.69i57j0l6j69i60.4734j0j7&sourceid=chrome&ie=UTF-8