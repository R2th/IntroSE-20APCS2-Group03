Chắc hẳn khi bắt tay vào viết code CSS vào một dự án bắt đầu lớn một chút, sẽ không ai tránh khỏi việc bạn có 1 file CSS hàng ngàn dòng code, và điều đó sẽ là một nỗi kinh hãi cho bạn 1 năm sau đọc lại và phải maintain hàng đống dòng code lộn xộn đó. Vì vậy, trong bài viết lần này, mình sẽ giới thiệu tới các bạn một công cụ hỗ trợ tuyệt vời giúp cho các bạn viết code CSS có cấu trúc, dễ đọc và dễ maintain hơn - mang tên `SASS`.

## Tại sao dùng Sass ? Sass có những tính năng gì ?
Như phần giới thiệu mình đã nói ở trên, sử dụng Sass thay vì trực tiếp viết code CSS sẽ giúp bạn dễ dàng quản lí cấu trúc code của mình hơn, dễ maintain và đương nhiên, bạn sẽ cảm thấy mình chuyên nghiệp hơn khi viết code :)))

**Vậy những đặc điểm gì của Sass khiến chúng ta phải dành thời gian phải học vậy ???**

Trên Viblo đã có khá nhiều bài giải thích chi tiết về Sass, vậy nên mình sẽ chỉ nói tóm gọn những đặc tính đáng chú ý của Sass và lấy ví dụ cho các bạn dễ hiểu . Link tìm hiểu chi tiết hơn về chúng mình sẽ để ở dưới phần references nhé.

* **Variables (Khai báo biến )** : Sass cho phép các bạn **sử dụng biến khai báo một giá trị** nào đó để sử dụng nhiều lần trong code. Lấy ví dụ bạn muốn tone màu chủ đạo trong web của mình là xanh dương. Bạn sẽ đặt một biến $color mang giá trị "xanh dương"  và bạn sử dụng chúng trong code của mình.  Rồi khi sắp hoàn thành dự án ông khách ẩm ương lại thích web có màu cam hơn thì sao ?????? Ez =))) Thay vì phải tìm từng dòng code để thay đổi màu như khi viết CSS thì bạn chỉ cần đổi giá trị biến $color từ xanh dương sang cam thôi. Tiết kiệm kha khá thời gian đấy chứ =)))
*    **Nesting (Viết code lồng nhau)** : **Tránh lặp** lại việc phải viết lại nhiều lần các thẻ lồng nhau như khi viết CSS --> Tiết kiệm thời gian hơn khi viết code và code sẽ clean hơn . Đặc biệt hữu ích hơn khi dùng chung với `'BEM methodology'`.
*  **Partials** : **Chia nhỏ code** thành các file thành phần nhỏ và cuối cùng import chúng vào một file chung. 
*  **Mixin, Function** : Hơi giống như việc bạn viết function trong các ngôn ngữ khác như C hay JS vậy --------> *Tìm hiểu kĩ hơn: link trong phần references.* :point_down:
*  **Một số đặc tính khác** : Control Directives (`@if`, `@for`, `@while`,...), Extends (Tính kế thừa), ....

## Cài đặt và biên dịch Sass

* Sử dụng Applications (hiểu là phần mềm đi) : Có rất nhiều applications dễ cài đặt và giúp bạn chạy code Sass nếu bạn không quen sử dụng command line như `CodeKit`, `Compass.app`, `Hammer`, `Koala`,... Các bạn có thể search gg để hiểu thêm, tuy nhiên mình thấy khá nhiều người sử dụng Koala vì nó là open source có thể chạy được trên cả Mac, Linux và Windows. 
* Sử dụng trên Command Line: 
    
    1. Install on Windows sử dụng Chocolatey :  Chocolatey về cơ bản là một package manager giúp bạn có thể nhanh chóng và dễ dàng insatll một ứng dụng với command line trên Windows nhé. Install :  `choco install sass`
    2. Install on Mac OS X sử dụng Homebrew : `brew install sass/sass/sass `
    
    Với những bạn nào sử dụng Node.js như mình, các bạn cũng có thể cài đặt Sass bằng npm package manager. Đây là cách thức hiện tại mình đang sử dụng nên toàn bộ phần sau sẽ là về cài đặt và biên dịch Sass với npm nhé.  
    -> ***Install Npm***: `apt-get install npm `  -> `sudo apt-get update`
    
    -> ***Install Node-sass***: `npm install -g node-sass`. Nếu không sử dụng flag `-g` node-sass sẽ chỉ được cài đặt trong thư mục hiện tại của bạn (current folder). 
    
    -> ***Compile Sass files***: `node-sass "input file's direct path" "output file's direct path"`. Ví dụ : `"node-sass sass/main.scss css/style.css"` (`main.scss` là file Sass chính sau khi đã import tất cả partials, `style.css` là file css sau khi đã biên dịch Sass file). 
    
    Tuy nhiên nếu sử dụng câu lệnh compile trên, thì mỗi lần thay đổi Sass file bạn lại phải chạy lại lệnh đó 1 lần. Lại quay lại bài toán tiết kiệm thời gian code =))), hãy sử dụng lệnh này thay thế nhé : `"node-sass sass/main.scss css/style.css -w"`. Ta thêm flag `-w` (watch) để khiến cho npm "trông chừng" file cho mình, mỗi khi file Sass thay đổi thì chúng sẽ lập tức tự động được compile. 
    
##     Lời kết
Bài viết này cũng khá dài rồi. Hi vọng mình đã giúp các bạn hiểu thêm nhiều về công cụ hỗ trợ CSS tuyệt vời này. Hãy bỏ việc viết CSS thuần và chuyển ngay sang Sass đi và bạn sẽ thấy mình nói không sai đâu, nó cực kì tuyệt vời đấy =)))). 
Nếu có bất kì góp ý hay câu hỏi gì hãy comment phía dưới ủng hộ mình nhé :grin:
## References 
**About Sass**: 

https://viblo.asia/p/sass-can-ban-QWkwGnNEG75g

https://viblo.asia/p/sass-nguoi-ban-vo-cung-huu-dung-khi-su-dung-css-L4x5xNmaZBM

 **Sass Documentation**:
 
https://sass-lang.com/install

https://sunlightmedia.org/using-node-sass-to-compile-sass-files-in-an-npm-script/