- Bài này sẽ tiếp tục giới thiệu về những mẹo hay và những chú ý khi chúng ta làm css như 2 [bài trước](https://viblo.asia/p/nhung-meo-hay-va-nhung-chu-y-khi-chung-ta-lam-css-phan-2-924lJxBmKPM). Rất mong những chia sẻ của mình sẽ giúp được các bạn mới làm css hay những bạn đã có kinh nghiệm lâu năm.


##  Sử dụng Em, Rem và Pixel


- Em, Rem và Pixel là các đơn vị được sử dụng để thiết lập kích thước của các element và text. Cả 3 đơn vị đều có thể sử dụng, và tuỳ vào hoàn cảnh mà chúng ta sẽ lựa chọn đơn vị để sử dụng. Đây là một số mẹo sử dụng tốt cho mỗi đơn vị:

- **Em**: Giá trị của 1 em liên quan đến font-size của parent, thường được sử dụng trong các *media-query*. **Em** rất tuyệt vời trong responsive, nhưng nó lại gây khó khăn khi chuyển đổi từ Em sang Pixel

- **Rem**: Liên quan đến kích thước font-size của element <html>. Rem làm cho việc phân chia các heading và paragraph trong trang web trở nên rất dễ ràng. Chúng ta thiết lập thẻ <html> với một font-size mặc định, và với tất cả các element còn lại, sử dụng rem là một cách tiếp cận tuyệt vời

- **Pixel**: Sử dụng pixel cung cấp cho chúng ta độ chính xác cao nhất nhưng lại không cho chúng ta biết về tỉ lệ trong responsive design.

- Tóm lại, đừng ngại thử nghiệm, hãy sử dụng cả 3 loại đơn vị và tìm ra loại đơn vị mà bạn thích nhất và phù hợp với bạn nhất. Đôi khi Em và Rem có thể giúp bạn tiết kiệm rất nhiều việc phải làm, nhất là khi các bạn xây dựng các trang web responsive.


## Sử dụng Preprocessor trong các project lớn


- Các bạn có thể đã từng nghe qua về [Sass](http://sass-lang.com/), [Less](http://lesscss.org/), [PostCSS](https://postcss.org/), [Stylus](http://stylus-lang.com/), chúng là các CSS Preprocessor.

- Preprocessor là bước kế tiếp trong sự phát triển của CSS, nó cung cấp các tính năng như biến, hàm CSS, selector tổ hợp, và nhiều thứ thú vị khác. Sử dụng Preprocessor làm code CSS dễ quản lý hơn, đặc biệt là trong các dự án lớn.

- Dưới đây là một ví dụ về sử dụng biến và hàm trực tiếp trong file CSS với Sass:

    ```CSS
        $accent-color: #2196F3;

        a {
            padding: 10px 15px;
            background-color: $accent-color;
        }

        a:hover {
            background-color: darken($accent-color,10%);
        }
    ```

- Điểm yếu duy nhất của preprocessor là nó cần được biên dịch thành CSS, nhưng nếu bạn đã sử dụng một build script trong project, thì việc biên dịch này không quá phức tạp.

- Để tìm hiểu kĩ hơn về preprocessor, các bạn có thể xem hướng dẫn của tôi qua bài [tìm hiểu về sass](https://viblo.asia/p/hoc-sass-trong-15-phut-wjAM7y0LvmWe)


## Sử dụng Autoprefixers cho khả năng tương thích tốt hơn


- Việc viết tiền tố cho một browser cụ thể là một trong những điều khó chịu nhất trong CSS. Các tiền tố cho mỗi browser cụ thể là không nhất quán, bạn sẽ không bao giờ biết chính xác cái nào bạn cần, và việc viết tiền tố cho các browser trong CSS là một việc làm nhàm chán.

- Rất may cho chúng ta vì có các công cụ có thể giúp chúng ta thực hiện việc này, thậm chí các công cụ này còn cho chúng ta quyết định các browser nào chúng ta cần được hỗ trợ.

- Dưới đây là list một số công cụ các bạn có thể dùng:

	-	Công cụ online: [Autoprefixer](https://autoprefixer.github.io/)
	-   Plugin cho Text editor: [Sublime Text](https://github.com/sindresorhus/sublime-autoprefixer), [Atom](https://atom.io/packages/autoprefixer)
	-   Thư viện: [Autoprefixer](https://github.com/postcss/autoprefixer) (PostCSS)
    
    
## Sử dụng code rút gọn trong Production


- Để cải thiện tốc độ tải trang và ứng dụng, các bạn nên sử dụng code rút gọn. Code rút gọn là một phiên bản code của bạn, trong đó tất cả các khoảng trắng đều bị xoá đi để giảm kích thước tập tin. Tất nhiên việc xoá hết các khoảng trắng trong file code sẽ làm cho việc đọc code là vô cùng khó khăn, nhưng chúng ta sẽ không đọc code trong file rút gọn này. Các bạn hãy giữ 1 phiên bản code bình thường khi phát triển, và khi cần thì chúng ta sẽ tạo 1 bản rút gọn cho server production.

- Có rất nhiều công cụ chúng ta có thể sử dụng để tạo file code rút gọn từ file code CSS:

	-	Công cụ online - [CSS Minifier](https://cssminifier.com/) (API included), [CSS Compressor](https://csscompressor.com/)
	-	Plugin cho Text editor: [Sublime Text](https://packagecontrol.io/packages/Minify), [Atom](https://atom.io/packages/atom-minify)
	-	Thư viện: [Minfiy](https://github.com/matthiasmullie/minify) (PHP), [CSSO](https://github.com/css/csso) và [CSSNano](https://cssnano.co/) (PostCSS, Grunt, Gulp)

- Tuỳ thuộc vào quy trình làm việc của mình, các bạn có thể sử dụng bất kỳ công cụ nào bên trên, nhưng tôi khuyên các bạn nên sử dụng làm sao để tự động hoá việc tạo file code rút gọn này.


## Sử dụng Caniuse


- Hiện tại, các browser khác nhau vẫn có nhiều mâu thuẫn về tính tương thích. Sử dụng [Caniuse](https://caniuse.com/) hoặc một dịch vụ tương tự để kiểm tra xem cái bạn đang sử dụng có được hỗ trợ rộng rãi không, kiểm tra xem nó có cần thêm tiền tố không, hoặc xem nó có tạo ra bug trên một browser nào đó không.

- Chỉ sử dụng Caniuse là không đủ. Các bạn cũng cần phải test (test thủ công hoặc thông qua các công cụ test) xem thỉnh thoảng layout có bị vỡ bởi các lý do không rõ ràng không. Việc biết được các browser ưa thích của người dùng cũng giúp ích cho chúng ta rất nhiều, chúng ta sẽ biết được nên chú trọng vào browser nào.


## Validation trong css


- Validation CSS code có thể không quan trọng như việc validation code HTML hay JavaScript, nhưng việc validation code CSS cũng rất có ích. Thông qua việc validation code, chúng ta có thể tìm ra các sai lầm, cảnh báo chúng ta về các bad practices, và cung cấp cho chúng ta lời khuyên để cải thiện code.

- Có rất nhiều công cụ để validation code css cho chúng ta lựa chọn:

  - Công cụ online: [W3 Validator](https://jigsaw.w3.org/css-validator/), [CSS Lint](http://csslint.net/)
  - Plugin cho Text editor: [Sublime Text](https://packagecontrol.io/packages/W3CValidators), [Atom](https://atom.io/packages/csslint)
  - Thư viện: [stylelint](https://stylelint.io/) (Node.js, PostCSS), [css-validator](https://www.npmjs.com/package/css-validator) (Node.js)



## Kết luận


- Còn rất nhiều những mẹo hay và những chú ý khi chúng ta làm css. Qua 3 bài giới thiệu về những mẹo hay và những chú ý khi chúng ta làm css là những cái chung nhất mà trong quá trình làm mình đúc kết ra. Rất mong giúp đỡ được các bạn. Trong quá trình các bạn làm, các bạn có thể thấy những mẹo hay và những chú ý có thể chia sẻ với mình và bạn đọc dưới bình luận của bài viết. Những phần nào mình chia sẽ chưa đúng vui lòng để lại bình luận. Cảm ơn các bạn đã đọc bài viết này.