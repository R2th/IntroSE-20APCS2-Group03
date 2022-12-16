![](https://images.viblo.asia/715c285b-41cb-4fac-89b9-091a442f47db.jpeg)
# Mở đầu 
Tuổi trẻ như cơn mưa rào, thằng chạy nhanh thì ướt ít mà thằng không có áo mưa thì ướt sũng =)). Thất bại sẽ giúp chúng ta học hỏi được thêm kinh nghiệm và biết cách xử lý chúng phải không nào ?! Bài viết này chúng sẽ thảo luận về một số lỗi phổ biến của các web developer mới(hoặc cũ :v) thường hay mắc phải và cách tránh chúng. Vậy hãy cũng nhau bắt đầu nhé.

> P/s: Mình có đọc được 1 câu như sau: "*Không ai tắm hai lần trên một dòng sông*" :D
# Validation input chưa đầy đủ
Như nhiều chàng trai mộng mer khác mình cũng từng nghĩ rằng: "*Chỉ cần chân thành sẽ đổi lại được chân lý*". Nhưng không đou, cuộc sống nó **Khác** lắm. Giống như việc ô input sđt nhưng người dùng lại nhập vào số tk ngân hàng vậy :D
Đấy! Khách hàng họ cũng chỉ là người giống chúng tar thôi. Mà đã là người thì sẽ có lúc sai lầm. Và validation ra đời.

Để có 1 trải nghiệm người dùng tốt nhất, hoặc cũng có thể là do được support tận răng của các framework front-end mà chúng ta thường viết chức năng validation với HTML và Javascript. Nhưng như cái chữ khác mà mình vừa bôi đậm ở trên thì...Chức năng này hoàn toàn có thể bị bỏ qua chỉ với 1 dòng code js. Và hệ thống sẽ bị tấn công bởi các tin tặc. Điển hình là lỗi SQL Injection, đứng đầu trong [Top 10 Rủi ro Bảo mật Ứng dụng Web ](https://owasp.org/www-project-top-ten/).

Nhiều developer mới mắc sai lầm khi nghĩ rằng chỉ cần xác thực HTML và JavaScript là đủ để xác thực input của người dùng.
> Always do both Client-side and Server-side Input Validation

Vì vậy, nếu bạn đang sử dụng bất kỳ loại input nào của người dùng, hãy luôn đảm bảo xác thực nó ở cả phía client và server sides. A good practice là chia sẻ cách validators của bạn giữa backend và fondent.
# Tính không tương thích giữa nhiều trình duyệt
Hầu hết các quy trình phát triển sản phẩm đều có một deadline cố định. Và để tiết kiệm thời gian, các developer có xu hướng chỉ sử dụng duy nhất một trình duyệt trong khi phát triển để test ứng dụng. Điều đó là hoàn toàn hợp lý nếu bạn có thời gian sau đó để test sản phẩm của bạn trên nhiều trình duyệt và khắc phục sự cố (nếu có).
> Test your web application on multiple browsers. Better to use a tool.

Nhưng nếu bạn không có được khoảng thời gian như vậy? Bạn nên thử nghiệm ứng dụng trên nhiều trình duyệt trong khi đang phát triển. Đó không phải là một cái gì đó mà bạn có thể được bỏ qua được. Bạn cần test ứng dụng của mình ít nhất trong ba trình duyệt chính, chẳng hạn như Chrome, Firefox và Microsoft Edge. Có nhiều vấn đề về giao diện người dùng có thể xuất hiện trong Firefox mà không có trên Chrome.

Cố gắng làm cho các ứng dụng web mà bạn phát triển thân thiện với nhiều trình duyệt nhất có thể. Tránh sử dụng mã dành riêng cho trình duyệt và lưu ý rằng mã tương thích với nhiều trình duyệt có thể tồn tại hầu hết thời gian.

> Bạn có thể sử dụng các công cụ như [CrossBrowserTesting](https://crossbrowsertesting.com/) hoặc [LambdaTest](https://www.lambdatest.com/?utm_source=Sitepoint&utm_medium=blog&utm_campaign=SitepointAd1&utm_term=Sitepoint) để kiểm tra nhiều trình duyệt hiệu quả hơn.
# Sử dụng quá nhiều thư viện

![](https://images.viblo.asia/e2451c69-6342-437c-9b38-07d3a7444752.jpeg)

Sử dụng nhiều thư viện trong ứng dụng của bạn sẽ tăng kích thước ứng dụng và tăng thời gian xây dựng ứng dụng. Và hệ lụy của nó là sẽ làm tăng thời gian tải trang. Do đó, hãy cẩn thận khi thêm nhiều packages vào ứng dụng web của bạn. Tránh sử dụng thư viện nếu bạn có thể viết code của mình với ít thời gian để làm những gì thư viện làm.

> Bạn có thể kiểm tra kích thước gói của gói npm trước khi thêm gói đó vào ứng dụng của mình bằng cách sử dụng trang web [BundlePhobia](https://bundlephobia.com/).


Khi sử dụng thư viện, hãy lưu ý về ngày của commit cuối cùng và số lượng start GitHub mà nó có. Sử dụng thư viện không chính thống sẽ tạo ra 1 nguy cơ lớn về bảo mật .Nó có thể là một lỗ hổng bảo mật lớn cho ứng dụng của bạn. Do đó, bạn có thể cần phải đổi thư viện hoặc tìm các giải pháp khác.

> Lưu ý về việc bảo trì thư viện, các vấn đề hiện có của thư viện và các ngôi sao GitHub

Mình thích dùng từ *con dao hai lưỡi* để nói về thư viện. Hầu hết các thư viện đều làm cho cuộc sống của chúng ta trở nên dễ dàng hơn. Nhưng đôi khi chúng lại là thứ làm cho chúng ta thất bại. Vì vậy hãy chọn chúng một cách khôn ngoan nhé :D.

# Không tuân Responsive Design ngay từ đầu

Các developer mới thường mắc sai lầm khi ngay từ đầu họ đã không nghĩ đến responsive design cho ứng dụng web.
Điều quan trọng là bạn phải xác định ứng dụng đang phát triển được sử dụng trên những thiết bị nào. Từ đó xác định các `breakpoints` tương ứng.

> Mobile-first development is also important for responsive design because it can make the website load faster on small devices.

Với mobile-first, bạn đang xây dựng một nền tảng vững chắc(Lan man 1 tý thì vững chắc là gì ? Đơn giản là không **bị vỡ layout** khi mà bạn chuyển từ thiết bị có kích thước màn hình to sang nhỏ và ngược lại). Nền tảng này sẽ giúp củng cố các thiết kế máy tính bảng và máy tính để bàn. Thiết kế Mobile-first cho phép bạn tập trung và duy trì sự rõ ràng bằng cách loại bỏ mọi trang trí giao diện người dùng không cần thiết và cải thiện trải nghiệm người dùng.

> Bạn có thể tìm hiểu cách viết các truy vấn media trong Sass cho thiết kế đáp ứng của ứng dụng web của bạn từ [đây](https://css-tricks.com/approaches-media-queries-sass/)!

# Bỏ qua tối ưu hóa hình ảnh
![](https://images.viblo.asia/a2668c43-4cb0-4e97-94c9-e10051335418.gif)
Tối ưu hóa kích thước hình ảnh là điều cần thiết để giảm mức sử dụng băng thông của ứng dụng web của bạn. Hãy tưởng tượng rằng trang chủ của bạn có năm hình ảnh và mỗi hình ảnh trong số đó có dung lượng từ 5MB trở lên (5 * 5MB = 25MB ez =)) ). Và tất nhiên, người dùng sẽ chẳng muốn đợi đến khi trang tải xong. Vì nó chậm v~.

Sử dụng định dạng SVG cho logos, icons, và hình ảnh đơn giản thay vì sử dụng JPG hoặc PNG. Có rất nhiều công cụ trực tuyến miễn phí mà bạn có thể sử dụng để tối ưu hóa hình ảnh JPG và PNG, vì vậy hãy ngừng bỏ qua việc tối ưu hóa hình ảnh.
> Bạn có thể tìm hiểu về các phương pháp tối ưu hóa hình ảnh tốt nhất từ [đây](https://kinsta.com/blog/optimize-images-for-web/)!

# Bỏ qua kỹ thuật SEO
![](https://images.viblo.asia/20c5cdb1-d98b-4e9e-b90a-06b56f79e79f.jpeg)

Dân ta phải biết sử ta, nếu mà không biết thì tra Gu Gồ :v 
Thật vậy, Ngày nay chúng ta có thể tìm kiếm gần như mọi thứ ở trên Google, nói 1 cách bao quát hơn là công cụ tìm kiếm.
Nhiều developer mới bỏ qua việc thực hiện Tối ưu hóa **Công cụ Tìm kiếm** (SEO) của các trang web hoặc ứng dụng web mà họ phát triển. Đó có thể là do thiếu kiến ​​thức kỹ thuật SEO hoặc thiếu thời gian phát triển. Nhưng thật là một sai lầm lớn nếu bỏ qua nó.
> Hãy suy nghĩ về tối ưu hóa SEO ngay từ đầu

Do đó, SEO rất có giá trị theo quan điểm của khách hàng. Vì vậy, nếu bạn đã bỏ qua tối ưu hóa SEO, trang web sẽ bị xếp hạng dưới trong kết quả tìm kiếm và khách hàng sẽ không hài lòng.

Là một web developer, bạn cần phải nghĩ về SEO ngay từ khi bạn bắt đầu xây dựng ứng dụng web của mình, chứ không phải kết thúc nó. Nếu không, bạn có thể phải làm lại rất nhiều lần những thứ không cần thiết. Dưới đây là một số mẹo để các bạn làm theo khi phát triển.

* Đảm bảo rằng kiến ​​trúc trang web có thể thu thập thông tin được
* Tối ưu hóa trang web để có thời gian tải hiệu quả
* Sử dụng liên kết ngược thông minh
* Giữ  code  [W3C](https://www.w3.org/standards/) của bạn được xác thực (Bạn có thể sử dụng [Dịch vụ xác thực đánh dấu W3C](https://validator.w3.org/) )
* Loại bỏ nội dung trùng lặp
* Sử dụng thẻ alt hình ảnh

> Bạn có thể tìm hiểu thêm về các phương pháp SEO tốt nhất mà các nhà phát triển web cần tuân theo từ [đây](https://moz.com/learn/seo/seo-cheat-sheet) !

# Manual Testing quá nhiều
Các developer không nên lãng phí thời gian phát triển quý báu của họ để thực hiện `kiểm thử thủ công`. Các bài kiểm tra thủ công không thể sử dụng lại được, chúng rất nhàm chán và tốn thời gian. Là một người mới, khả năng cao là bạn có thể thực hiện quá nhiều thử nghiệm 
thủ công. Tin mình đi, bạn sẽ nhanh chóng cảm thấy nhàm chán, thất vọng khi lần này đến lần khác điền vào những biểu mẫu giống nhau.

> Bạn có thể tìm hiểu thêm về cách viết các bài kiểm tra tự động cho các ứng dụng web từ [đây](https://devops.com/10-rules-for-writing-automated-tests/)!

# Không tuân theo các tiêu chuẩn web
Có các tiêu chuẩn để đảm bảo rằng mọi thứ được thực hiện một cách chính xác theo cách chung. Các tiêu chuẩn web giúp các developer tạo ra các ứng dụng có chất lượng như nhau cho tất cả mọi người.

Ngày nay, hầu hết chúng ta đều tự học từ các hướng dẫn trực tuyến. Nhưng những hướng dẫn này lại không đề cập đến các tiêu chuẩn chính xác, vì vậy có thể bạn sẽ không biết về chúng.

> Ví dụ, khi viết HTML, bạn cần sử dụng các [yếu tố ngữ nghĩa](https://www.w3schools.com/html/html5_semantic_elements.asp) để cấu trúc trang web của bạn theo tiêu chuẩn web

Từ whatwg.org , bạn có thể tìm hiểu tất cả các tiêu chuẩn HTML mới nhất. Tuân theo các tiêu chuẩn chính xác cũng giúp ứng dụng của bạn dễ tiếp cận hơn.

> Bạn có thể tham khảo [Nguyên tắc hỗ trợ tiếp cận nội dung web](https://www.w3.org/WAI/standards-guidelines/wcag/) (WCAG) do W3C xuất bản để đảm bảo rằng ứng dụng của bạn có thể truy cập đúng cách.

Các tiêu chuẩn này đã được áp đặt để làm cho nội dung web dễ tiếp cận hơn với người dùng và các loại nhu cầu khác nhau ở cấp độ quốc tế. Vì vậy, hãy đảm bảo rằng bạn tuân theo các tiêu chuẩn này.

# Viết CSS Vanilla
Bây giờ là năm 2021 và bạn không cần phải viết CSS Vanilla nữa. Bắt đầu sử dụng các bộ tiền xử lý CSS như Sass, Stylus hoặc Less. Hoặc sử dụng các thành phần được tạo kiểu (CSS-in-JS) nếu bạn đang sử dụng React. Các developer mới thường mắc sai lầm khi bỏ qua chúng. Vì có thể nó được xem như css nâng cao :v

> Hãy bắt đầu sử dụng  CSS preprocessor như Sass/Stylus/Less

Có nhiều lợi thế khi sử dụng CSS preprocessors hoặc styled-componentsso với CSS thuần trong các ứng dụng web. Cả CSS preprocessors và styled-components đều cho phép bạn duy trì một kiến trúc code sạch. Bạn có thể tạo nhiều styling với ít code hơn, do đó tăng hiệu quả phát triển của bạn.

Nếu chúng ta lấy Sass làm ví dụ, nó cung cấp tính năng lồng nhau. Bạn có thể sử dụng cú pháp lồng nhau và các hàm hữu ích như thao tác màu, hàm toán học, v.v. Bạn cũng có thể tùy chỉnh Bootstrap với Sass vì nó cũng được viết bằng Sass. Ngoài ra, styled-components  đã nâng cao khả năng tái sử dụng và tính nhất quán cao. Styled-components sẽ loại bỏ những lo lắng của bạn về việc ghi đè các global scope selectors. Vì vậy, đã đến lúc chuyển từ bỏ việc viết CSS thuần.

# Writing CSS and JS in HTML Files
Đây là một trong những lỗi lâu đời nhất, nhưng các developer vẫn mắc phải. Đôi khi đó là bởi vì nó là điều dễ dàng hơn để làm vào thời điểm đó. Nhưng những thứ dễ ăn thì chỉ có thể là bánh mì và mì gói thôi. Chẳng thể no lâu :v. Đó là một hành vi không tốt và sẽ làm cho code của bạn lộn xộn và rất khó để kiểm tra và gỡ lỗi. Các lỗ hổng bảo mật và nhiều vấn đề khác có thể xảy ra.
# Bỏ qua Code Formatting và Commenting
Nếu bạn thấy một tập hợp các dòng code JavaScript không có thụt lề, những khoảng trống, dòng mới vô lý và quy ước đặt tên kém, thì khả năng cao là một developer mới đã viết nó. Sẽ không một developer có kinh nghiệm nào sẽ làm điều đó vì họ biết rằng việc đọc lại code sẽ đau đầu như thế nào (trầm cảm luôn ấy chứ).

Tìm hiểu về quy ước đặt tên chính xác cho ngôn ngữ bạn sử dụng, sử dụng cách viết đúng khi đặt tên hàm hoặc biến và sử dụng công cụ định dạng code tự động với IDE của bạn.

Như một thói quen thì chuyện nay nhớ mai quên là chuyện rất đỗi bình thường. Bạn không thể chắc rằng bạn đã bước chân ra cửa bằng chân nào. Và chắc chị hàng xóm của bạn cũng không chắc về điều đó. Nên việc comment nó lại để dễ dàng nhận ra là 1 điều cần thiết.

> Bạn có thể tìm hiểu cách định dạng đúng và bao gồm các nhận xét trong mã HTML, CSS, JS và PHP tại [đây](https://torquemag.io/2019/07/code-formatting-guide/) !

# Dựa vào jQuery
Lý do chính để ngừng dựa dẫm vào jQuery là bất cứ điều gì jQuery có thể làm được, JavaScript thuần hoặc TypeScript có thể làm tốt hơn và nhanh hơn. Bạn chắc chắn sẽ sử dụng một framework và libraries như Vue, React hoặc Angular ngày nay, vì vậy bạn không cần jQuery. Thêm jQuery sẽ chỉ làm cho ứng dụng của bạn nặng hơn.

Một lý do khác để không dựa vào jQuery là bạn sẽ gặp khó khăn trong việc điều chỉnh frameworks mới vì nó không sử dụng một cú pháp chung và có các cách triển khai DOM hơi khác nhau.

Mình không nói rằng bạn không nên học jQuery vì nhiều dự án vẫn sử dụng nó. Nhưng bạn chắc chắn nên ngừng dựa vào nó.

# Lời kết 
Trong bài viết này, chúng ta đã thảo luận về 12 lỗi phổ biến mà các developer mới thường mắc phải. Mong rằng thông qua bài viết có thể giúp các bạn tránh những sai lầm trên. Và tạo ra các ứng dụng tốt hơn. Cảm ơn bạn đã đọc. 

Link tham khảo: https://blog.bitsrc.io/12-mistakes-newbie-web-developers-make-beafb9d8a497