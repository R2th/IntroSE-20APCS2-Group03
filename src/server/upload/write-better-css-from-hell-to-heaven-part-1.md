# Write Better CSS: From Hell to Heaven (Part 1)
![](https://images.viblo.asia/2a35653e-a0c9-4e35-994b-e3215541414f.png)

#### introduce
* Thông qua kinh nghiệm của mình, qua nhiều dự án làm việc với front-end mình gặp rất nhiều đồng nghiệp cảm thấy khá khó khăn trong việc viết CSS, chỉnh sửa và bảo trì, với 1 số người viết CSS là việc vặt, 1 trong những lý do để lý giải cho điều đó có thể là họ chưa bao giờ được dạy các làm thế nào để viết tốt CSS ngay từ đầu hoặc chưa biết CSS tốt là gì, điều đó ảnh hưởng đến hiệu quả và chất lượng code, cái mà chúng ta không mong muốn, chính vì vậy mình mong muốn chia sẻ tới các bạn 1 số kinh nghiệm để viết CSS tốt hơn, vì có khá nhiều thứ muốn chia sẻ nên mình sẽ viết Part1 trước, vậy trong Part này chúng ta sẽ đi tìm hiểu về Code CSS tốt là gì? (chính xác hơn là những gì là CSS không tốt), tôi sẽ forcus vào những mẹo và thủ thuật để tránh tạo ra 1 mớ CSS lộn xộn :D.  
**chú ý**: đây là những hướng dẫn mà tôi thu thập được qua kinh nghiệm của mình và nó hoạt động tốt cho nhiều dự án tôi đã làm. Cuối cùng, hãy áp dụng những phương pháp phù hợp với bạn.

#### Yêu cầu
* Tôi giả sử rằng bạn đang tìm kiếm lời khuyên để cải thiện kỹ năng viết CSS, do đó bạn đã có kiến thức cơ bản về CSS và biết nó hoạt động ra sao, bên cạnh đó, bạn sẽ cần thêm:
    * ##### Định nghĩ của sự hoàn thành  
    Bạn nên hiểu rõ về browser/devices mà bạn muốn làm việc, đây là 1 ví dụ về những gì có thể là 1 định nghĩa của việc thực hiện: 
        - Browsers: Chrome >= 63, Firefox >= 57, Edge >= 12
        - Devices: Laptops với độ phân giải >= 1366*768  
        Đây là [website](https://caniuse.com/) bạn có thể xem tính năng nào của CSS được hỗ trợ trên các trình duyệt:
        ![](https://images.viblo.asia/7e8e134e-1534-406b-aacb-4f2d11b03d22.png)

    * ##### Một sự hiểu biết tốt về sự ưu tiên là gì  
    Dưới đây là những rule cơ bản về sự ưu tiên:  
    Đặc điểm để xác định quy tắc CSS nào được trình duyệt áp dụng, nêú 2 selector được áp dụng cho cùng 1 phần tử thì cái có đặc tính cao hơn sẽ được áp dụng

    * Dưới đây là 1 số rule mà đặc tính sẽ được ưu tiên:

        - Style nội tuyến (inline style) sẽ được ưu tiên hơn ID selectors, ID selectors sẽ được ưu tiên hơn Classes và các attributes (::hover, ::before, ::after). Classes sẽ được ưu tiên hơn các phần tử.

        - Một selector cụ thể sẽ tốt hơn là bất kỳ sô lượng selector ít cụ thể hơn, ví dụ: .list sẽ cụ thể hơn là div ul li

        - Tăng số lượng của selectors sẽ dẫn đến độ ưu tiên cao hơn, ví dụ: .list .link sẽ được ưu tiên hơn .list và .link

        - Nếu 2 selectors có cùng 1 đặc tính, selector cuối cùng được đọc bởi browser sẽ được áp dụng

        - Mặc dù `!important` không liên quan gì đến đặc tính của selector, nhưng thật tốt để biết rằng 1 khai báo sử dụng `!important` sẽ ghi đè bất kỳ khai báo thông thường nào, khi có xung đột giữa 2 keyword `!important` thì khai báo sau cùng sẽ được áp dụng

    Đây là 1 [website](https://specificity.keegan.st/) rất tốt để tính toán đặc tính của 1 selector

    * ##### Một vài kiến thức về tiền xử lý  
    Tiền xử lý giúp chúng ta viết mã CSS nhanh hơn, chúng cũng giúp tạo ra những dòng code dễ hiểu và dễ tuỳ chỉnh bằng cách sử dụng biến. Ở đây tôi dùng [SCSS syntax](https://sass-lang.com/guide) (bộ tiền xử lý ưa thích của tôi nhưng cũng có những bộ khác giống vậy như [LESS/stylus](http://lesscss.org/)) trong ví dụ.
    
    1 ví dụ về việc bạn có thể làm những gì với trình xử lý:
    ```
    // vars.scss
    $messageColor: #333;

    // message.scss
    @import "vars";
    %message-shared {
        border: 1px solid black;
        padding: 10px;
        color: $messageColor;
    }

    .message {
        @extend %message-shared;
    }
    .success {
        @extend %message-shared;
        border-color: green;
    }
    ```
    Các biến trong CSS bây giờ có thể được thực hiện bằng CSS gốc nhưng các bộ tiền xử lý vẫn chiếm ưu thế về khả năng đọc / khả năng sử dụng.
* ##### Bạn không nên làm gì

    Tôi sẽ chỉ ra cho bạn những gì bạn KHÔNG muốn làm và giải thích tại sao việc làm như vậy sẽ dãn tới nhiều vấn đề theo thời gian.

    * Đừng viết CSS mà không có comment  
    Tôi đặt điểm này đầu tiên bời vì tôi tin rằng nó là điều ảnh hưởng nhất mà bạn có thể hành động ngay lập tức, giống những ngôn ngữ khác, CSS cần được comment. Hầu hết stylesheets đều không có comments, và khi tôi khuyên bạn bạn viết comment, tôi không nói về điều này:
    ```
    // Header style
    .header {
    }
    ```
    Đó là comment tệ vì chúng không có mục đích và không truyền đạt được thông tin bổ xung. 1 comment CSS tốt sẽ giải thích được những ý định phía sau 1 selector/rule, đây là 1 ví dụ của 1 vài comment tốt:

    ```
    input:checked {
        /* Adds "selected" indicator to this element */
        border-bottom: 5px solid green;
    }
    ```
    
    * Vậy, bạn nên comment những gì?
        * [CSS hacks](https://en.wikipedia.org/wiki/CSS_hack)
        * Mỗi dòng bạn không viết hoặc bạn đã viết 6 tháng trước hoặc hơn, trong đó bạn cần hơn 10 giây để hiểu mục đích dự định của nó.
        * Magic values: nói bên dưới này.

    * Đừng sử dụng giá trị ma giáo (magic value)
    
        Điều làm cho các developers khi đọc hoặc maintain CSS bực nhất là cảm giác chung về `black magic`, có nghĩa là bạn đặt 1 rule ở đây và 1 `!important` ở đó, với 1 giá trị `width` trong thì rất tốt và nó hoạt động, bạn cảm thấy rất `ma giáo`, nhưng ma thuật không tồn tại, bận cần tiếp cần có 1 cách tiếp cận khoa học hơn để làm sáng tỏ CSS, viết comment tốt là 1 việc, dừng việc viết giá trị 1 cách không khoa học là 1 việc khác.


        Dưới đây là ví dụ:
        ```
        .mb-t-5 {
            left: 157px;
            height: 328px;
            z-index: 1501;
            font-size: 0.785895rem;
        }
        ```
        Tại các giá trị trên có vấn đề? bời vì 1 lần nữa chúng ko truyền đạt được ý định, vậy điều tốt hơn là gì?

        * Sử dụng các biến tiền xử lý để bổ sung nghĩa cho những giá trị không rõ ràng

        * Hãy đưa ra những tính toán chính xác, sau khi test chán chê mê mỏi trên Chrome dev tools bạn có thể tìm ra rằng giá trị khởi tạo ban đầu của bạn chưa phải là chính xác nhất

        * Commenting để giải thích tại sao giá trị này lại ở đó

        * Tìm cách thay đổi giá trị đó để hợp lý hơn

    Ví dụ:
    ```
    .understandable-class-name {
        left: calc(50% - ($width / 2));
        // An item have a 41px height:
        // 2*10px from padding+20px from line-height+1px from one border.
        // So to get 8 items in height:
        height: 8 * 41px;
        z-index: 1501; // Needs to be above .navbar
        font-size: 0.75rem;
    }
    ```
    
    * Không sử dụng đơn vị `px` ở mọi nơi  
    Đối với các bạn không main về CSS thì nghe có vẻ không đúng lắm phải không ạ, nhưng trong thực tế bạn không nên sử dụng chúng. Nhưng trong hầu hết các trường hợp, pixels chưa bao giờ là đơn bị tốt nhất để sử dụng. Tại sao ư? Bởi vì chúng không chia tỉ lệ kích thước phông chữ hoặc độ phân giải thiết bị. Đây là [website](http://thenewcode.com/775/Which-CSS-Measurements-To-Use-When) tốt để bạn biết hơn về những đơn nào sẽ được sử dụng trong ngữ cảnh nào, nhắc lại nhanh 1 tý nhé:
        * px: Không mở rộng quy mô, dùng cho borders và base font size trong phần tử `html` .hết
        * em, rem (> IE8): Mở rộng với font size. 1.5em là 150% cỡ chữ của phần tử hiện tại. 0.75rem là 75% cơ chữ của phần tử `html`. Sử dụng `rem` cho kiểu chữ và mọi thứ theo chiều dọc như `margins` và `paddings`. Sử dụng `em` 1 cách khôn ngoan cho các yếu tố liên quan đến phông chữ và sử dụng nó cho [media query breakpoints](https://zellwk.com/blog/media-query-units/)
        * %, vh, vw (IE >8): Mở rộng với độ phân giải. `vh` và `vw`là tỉ lệ phần trăm của chiều cao và chiều rộng khung hình, những đơn vị này là hoàn hảo cho layouts hoặc tính toán để tính toán căn chỉnh không gian có sẵn (min-height: calc(100vh - #{$appBarHeight}))
    
    * Không sử dụng `!important`  
        -    Bạn nên giữ cho độ ưu tiêu của selectors là thấp nhất có thể. Nếu không thì bạn sẽ ghi đè lên các khai báo trước đó. Nếu bạn có xu hướng ghi đè styles của mình, thời gian dần trôi sẽ hình thành phong cách style nội tuyến và thường xuyên sử dụng `!important` và sau đó sẽ là 1 cơn ác mộng để tạo ra những quy tắc CSS cụ thể hơn.  
    

        -  Việc sử dụng `!important` là dấu hiệu cho thấy bạn đang làm việc chống lại mình =)). Thay vào đó, bạn nên tìm hiểu tại sao bạn phải làm điều này. Có thể cấu trúc lại những lớp bị ảnh hưởng sẽ giúp bạn hoặc tách CSS dùng chung ra 1 lớp khác sẽ cho phép bạn không cần phải sử dụng đến `!important` và giữ cho độ ưu tiên của selectors là thấp nhất.

        - Bạn chỉ nên sử dụng nó khi mà chắc chắn không có cách nào khác cụ thể hơn là việc sử dụng thử viện bên ngoài.

    * Không sử dung IDs như selectors

        - Nếu sử dụng ID thay vì Class thì sẽ làm mất đi tính reuseable của code.
        - Thay vì sử dung IDs, hãy cố gắng viết code để có thể tái sử dụng trong tương lai, nếu bạn cần độ ưu tiên cho các phần tử hãy thêm 1 Class trong level thấp nhất của cây DOM, ít nhất hãy dùng Class với tên mà bạn định đặt cho ID.
        - Dưới đây là ví dụ:
        ```
        // Don't
        #app-navbar {
        }

        // Slighlty better
        .app-navbar {
        }

        // Better (pattern that you could reuse)
        .horizontal-nav {
        }
        ```
      
     * ##### Không sử dụng các phần tử HTML như selectors

        * 1 lần nữa hãy nhớ: Giữ độ ưu tiên thấp nhất có thể. Việc sử dụng thẻ HTML như 1 selector sẽ đi ngược lại với điều này bời vì bạn sẽ phải thêm các selector có độ ưu tiên cao hơn để ghi đè lên chúng sau này. Sẽ rất bất tiện khi bạn dùng nó trong ngữ cảnh khác. Ví dụ:
        * ##### Không nên:
        ```
        <a>Link</a>
        <a class="button">Call to action</a>
        <nav class="navbar"><a>Navbar link</a></nav>
        ```
        
        ```
        a { ... }
        .button { ... }
        // Because you will have to create more specific selectors
        a.button { ...overrides that have nothing to do with the button style... }
        .navbar a { ...same... }
        ```
        * ##### Tốt hơn:
        ```
        <a class="link">Link</a>
        <a class="button">Call to action</a>
        <nav class="navbar"><a class="navbar-link">Navbar link</a></nav>
        ```
        
        ```
        .link { ...style of a link, can be used anywhere... }
        .button { ...style of a button, idem... }
        .navbar-link { ...style of a navbar link, used only in navbars... }
        ```
        
        * Tuy nhiên, có 1 vài trường hợp bạn có thể sử dụng chúng, ví dụ khi 1 người dùng đã viết 1 cái gì đó giống như 1 bài đăng trên blog có đầu ra ở dạng HTML thuần tuý (do đó ngăn cản bạn thêm các class tuỳ biến).
        ```
        // Don't
        ul { ... }

        // Better
        %textList { ... }
        .list { @extends %textList; }
        .user-article {
            ul { @extends %textList; }
        }
        ```
        
    * ##### Vậy, bận cần làm những gì sau khi đọc tới đây?

        * Cố gắng hiểu cách khai báo CSS thực sự hoạt động
        
            * Có 1 vài khai báo bạn thực sự muốn để  hiểu chúng, bời vì nếu bạn không làm vậy thì bạn vẫn sẽ có cảm giác `ma giáo` trong những dòng code, ví dụ: vertical-align: middle; margin: 0 auto; all the things!

            * Những gì bạn nên biết (nhắc nhỏ: nếu bạn nghĩ mình không có khả năng giải thích cho ai đó rõ ràng, click vào links):

                * [The box model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model) (width, height, padding, margin, border, box-sizing, display: block/inline/inline-block).

                * [Positioning and positioning contexts](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning) (position: static/relative/absolute/fixed, z-index).

                * [Typography](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals) (font-size, font-weight, line-height, text-transform, text-align, word-break, text-overflow, vertical-align)

                * [Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#Selectors) (*, >, +, ::before, ::after, :hover, :focus, :active, :first-child, :last-child, :not(), :nth-child())

            * Bonus thêm 1 vài cái:

                * [A complete guide to tables](https://css-tricks.com/complete-guide-table-element/)
                
                * [Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
                
                * [Shadows & filters](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Advanced_styling_effects)
                
                * [Floats](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Floats)

        * Tập cách làm việc với Flexbox and Grid

            * Nếu định nghĩa XONG của bạn mà không bao gồm việc test trên các trình duyệt cũ và bạn không dùng hoặc không biết về mô hình `flexbox` hoặc `grid` thì bạn nên xem xét lại, chúng có thể giải quyết cho bạn rất nhiều vấn đề về bố cục đấy. Bạn có thể học chúng ở đây:
                * [A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) (Chrome ≥ 21, Firefox ≥ 28, IE ≥ 10, Safari ≥ 6.1) 
                * [A complete guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) (Chrome ≥ 57, Firefox ≥ 52, IE ≥ 10, Safari ≥ 10.3), [ví dụ ngắn về cách sử dụng grid](https://blog.theodo.com/2018/03/stop-using-bootstrap-layout-thanks-to-css-grid/)


        * Và quan trọng nhất là TỰ LÀM

            * Các frameworks giống Bootstrap hoặc framework khác: chúng rất hữu dụng cho dự án nhỏ và nhanh chóng khi bạn không có thời gian dành cho việc thiết kế style. Nhưng trong nhiều dự án vừa và lớn, đừng dùng chúng

            * Theo thời gian, bạn sẽ cần ghi đè chúng và việc đó sẽ rất mất thời gian hơn là bạn tự làm bời gì nó sẽ tạo ra 1 những đoạn code phức tạp và cụ thể hơn.

            *  Bên cạnh đó, Tự làm sẽ khiến bạn học được rất nhiều, UI designer là toàn bộ công việc tạo ra 1 UI từ đầu đến cuối, nó thực sự là 1 thách thức. Đầu tiên, bạn hãy cố gắng tạo lại giao diện của các trang web bạn thích (bạn có thể xem mã bằng các công cụ hỗ trợ). Kinh nghiệm cá nhân mà mình có được là khoảnh khắc mình ném Bootstrap vào thùng rác cho cái dự án cá nhân và bắt đầu tự code CSS theo style của mình.

---
Mình hi vọng rằng với những best practices trên bạn sẽ cảm thấy thoải mái hơn khi viết CSS và củng cố thêm chất lượng code của bạn.