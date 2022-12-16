Bài gốc: https://blog.bitsrc.io/11-javascript-animation-libraries-for-2018-9d7ac93a2c59

Trong quá trình lướt net tìm kiếm một thư viện animation Javascript tốt, tôi đã phát hiện ra nhiều thư viện được đề  cử đã không còn được duy trì.
Thế nên tôi nghiên cứu thêm 1 lượt nữa và tập hợp 11 thư viện tốt nhất để bạn dùng cho app. Tôi cũng cho vào bộ sưu tập này một số thư viện hữu dụng tuy nhiên phần lớn đã không còn được duy trì.

Lời khuyên: Bạn có thể dùng công cụ bit.dev để pack, publish và share các JS component ở nhiều dự án và app khác nhau. Như vậy team của bạn có thể build nhanh hơn cùng nhau. Bạn cũng có thể dùng nó để có thể công bố các function/ component từ bất kì thư viện nào.

Mọi component có thể được phát hiện và thử trong một playground trực tiếp, và cài đặt vào nhiều dự án khác nhau. Team của bạn có thể đề cử update và đồng bộ với nhau, kiểm soát những thay đổi với component và sự phụ thuộc của chúng xuyên suốt các dự án khác nhau.

Trước khi đi vào giới thiệu các thư viện, tôi muốn nhắc bạn đừng quên dùng CSS thuần. Tại sao? Vì nó là tiêu chuẩn rồi. Và nó có thể cải thiện performance (GPU), cung cấp sự tương thích thuận và ngược, cũng như nó có lẽ là cách hiệu quả nhất để tạo animation. 
Bạn có thể vào link sau để xem 10 ví dụ về animation bằng CSS thuần: https://webdesign.tutsplus.com/articles/pure-css-animation-inspiration-on-codepen--cms-30875

OK, đi vào phần giới thiệu thư viện thôi nào:

1. Three.js
Được vote hơn 43 nghìn sao, thư viện phổ biến này là một cách tốt để tao 3D animatioon trên trình duyệt, sử dụng WebGL theo một cách tài tình. Thư viện này cung cấp renderer cho <canvas>,<svg>,CSS3D và WebGL, thế nên nó giúp chúng ta tạo ra những trải nghiệm tương tác pphong phú trên nhiều thiết bị và trình duyệt. Lần đầu xuất hiện vào tháng 4 2010, thư viện này vẫn đang được phát triển bởi gần 1000 người đóng góp.

2.Anime.js
Với trên 20k sao, Anime là một thư viện animation JavaSCript hoạt động tốt với CSS Properties, chuyển đổi CSS cá nhân, attribute cho SVG hay DOM, và các JavaScript Objects. Thư viện này giúp bạn gắn chuỗi các properties của animation, đồng bộ hóa nhiều instance cùng nhau, tạo timeline và hơn thế nữa.

3.Mo.js
Được vote 14 nghìn sao, thư viện này là một công cụ hữu ích về đồ họat ảnh động cho web, với APIs được tuyên bố đơn giản, tính tương thích đa thiết bị và trên 1500 unit test. Bạn có thể chuyển mọi thứ qua lại giữ DOME hay SVG DOME hay tạo những object đặc trưng của mo.js.
Tuy tài liệu hơi ít nhưng có nhiều sample và ba5an có thể xem một trong số đó tại đây:
https://css-tricks.com/introduction-mo-js/

4. Velocity
Điểm số: 15 nghìn sao. Velocity là một engine tạo Javascript animation có cùng API với $.animate() của jQuery. Nó cho phép tạo animation màu, chuyển đổi, lặp, đơn giản hóa, hỗ trợ SVG, và scroll. Bạn có thể xem thêm về enginge này tại đây:
https://www.sitepoint.com/incredibly-fast-ui-animation-using-velocity-js/
https://davidwalsh.name/svg-animation

5.Popmotion
Điểm số: 14 nghìn sao. Thư viện hoạt động tốt và có tính tương tác cao này chỉ tốn 11kb. Nó cho phép developer tạo animation và sự tương tác từ những hành động, vốn là những streams của các giá trị có thể được khởi động và ngừng lại và được tạo bởi CSS,SVG,React, three.js và bất kì API nào chấp nhận những con số làm giá trị nhập.

6. Vivus
Điểm vote: trên 10 nghìn sao. Vivus là một class  JS có tính chất zero-dependency cho phép bạn animate SVGs, và tạo nên vẻ ngoài như tranh vẽ cho chúng. Bạn có thể dùng những animation có sẵn hoặc tự code ra script để vẽ SVG. Bạn có thể xem qua 1 số mẫu Vivus ở đây: https://maxwellito.github.io/vivus-instant/

7. GreenSockJs
GSAP là một thư viện JavaScript dùng để tạo những animation có performance cao, zero dependency, đa trình duyệt và được cho là sử dụng bởi những websites có trên 4 triệu view. GSAP rất linh hoạt và tương thích với React, Vue, Angular và vanilla JS. GSDevtools (https://greensock.com/gsdevtools) cũng hỗ trợ những bản build dubug animations sử dụng GSAP.

8.Scroll Reveal
Với 15 nghìn sao và zero depedency, thư viện này cung cấp animation scroll dễ dàng cho web và trình duyệt mobile, hiển thị mọi thứ khi scroll bằng animation. Nó cũng hỗ trợ nhiều loại effect đẹp đẽ, thậm chí cho phép bạn định nghĩ animation bằng ngôn ngữ tự nhiên.
Bạn có thể xem tutorial tại đây: https://www.sitepoint.com/revealing-elements-scrollreveal-js/

9. Hover (CSS)

Thư viện CSS này có 20 nghìn sao vote. Hover cung cấp bộ sưu tập gồm những effect dạng hover tạo bởi CSS3 để áp dụng vào links, button, logo, svg, hình ảnh hiển thị và những món khác nữa. THư viện này có trong CSS,Sass, và LÉSS. Bạn có thể copy paste effect bạn muốn dùng vào stylesheet hoặc reference cái stylesheet.

10. Kute.js

Một engine native dùng để tạo JavaScript animation với đầy đủ tính năng quan trọng để làm những animation đa trình duyệt. Engine này được tập trung vào giá trị code, tính thích ứng, performance và kích cỡ ( core engine chỉ có 17k và 5.5k nếu zip). Bạn có thể xem demo tại đây:
http://thednp.github.io/kute.js/performance.html.
Thư viện này cũng có tính mở rộng nên bạn có thể thêm tính năng của bạn vào.

11.Type.js
Thư viện này được vote 6 nghìn sao, cho phép bạn tạo animation đánh chữ cho các chuỗi kí tự trong tốc độ đã chọn. Bạn có thể thêm [.div] của HTML trên page và đọc từ nó để cho phép acces với những search engine và những user đã vô hiệu hóa JavaScript.
Thư viện này được dùng bởi cả Slack và những nơi khác nên rất phổ biến và vô cùng hữu dụng.