### Enact là gì?
Đơn giản là một framework cho ReactJS để xây dựng ứng dụng cho cả webApp. Nó xây dựng các component dễ sử dụng cho phép có thể customize.

Easy to Use - Perfomance - Custominze
Bạn có thể đọc nó tại đây nhé. https://enactjs.com/
Đơn giản làm framework nào cũng sẽ chém gió đôi chút về nó :D

### Tại sao chúng tôi lại chọn? Xài vào việc gì?
Nhược điểm:
Hoàn toàn là một framework mới, cộng đồng contribute ít, start github nghèo nàn. 
![](https://images.viblo.asia/d796f74a-8ad9-4df0-b90c-cad168fd18dd.png)
Bạn có sợ hãi khi sử dụng nó không?

Thực ra chúng tôi đang phát triển dự án cho dòng smartTV của LG và Samsung, đây là hai dòng smart TV với hệ điều hành không hề cũ và sự support về framework lẫn công nghệ gần như rất ít.
Và đây là suggest từ phía trang phát triển của WebOS. EnactJS được suggest như là framework gạch đầu dòng đầu tiên cho các thế hệ version mới của SmartTV LG chạy trên hệ điều hành WebOS.
![](https://images.viblo.asia/41a71039-84c2-420e-89e8-e364ce65c06b.png)

### Sử dụng EnactJS như thế nào
Trước tiên khuyến cáo khi sử dụng Framework này đấy là: bạn phải đủ bình tĩnh và việc lục hết thư viện nó ra để đọc là một điều tiên quyết. Bởi vì Doccument "khá" sơ sài, gần như không hề đủ và public lắm. Example là đơn thuần Example chứ không hề như một dạng guildline của những Lib, SDK, Framework lớn.

![](https://images.viblo.asia/c50e6d85-899c-4537-8663-77f2020348df.png)
Đây là toàn bộ code và thư mục của "Framework" này.

Core: Chứa phần xử lí chính của framework: xử lí các dispatch, lắng nghe sự kiện, handle các sự kiện, check platform, ... Hãy đọc nó như thể bạn đang viết framework, ở đâu đấy bạn sẽ hiểu Framework được viết từ chính những basic mà bạn đã được học được nghe từ trường :D
i18n: Nghe thì hiểu thằng này xử lí cái gì rồi đúng ko, (mặc dùng trong dự án hiện tại mình xài kiểu khác)
spotlight: Đây theo mình là thú vị và được anh em mình handle nhiều nhất khi phát triển dự án, nó hỗ trợ lập trình viên về việc tính toán và focus/select vào component tiếp theo khi xử lí các sự kiện di chuyển trên bàn phím  hoặc remote.
ui: Chứa "full" các compoment được dựng sẵn để chúng ta dùng xây dựng ứng dụng, ví dụ: BodyText, Button, Icon, IconButton, Image....
webOS: chứa một số function đặc biệt để sử dụng riêng cho nền tảng webOS, ví dụ như check list application của hệ thống hiện tại, check bàn phím ảo, "speech" chức năng quan trong để xử lí Voice trên remote magic.
moonstone: thư viện này dùng khá nhiều trong app, nó sẽ tích hợp default cả ui và spotlight tạo thành dạng component default (cả về css, behavior) để làm một ứng dụng default.

### Điều cần lưu ý là gì
Adding CSS
Doccument nói về cái này được note tại đây: https://enactjs.com/docs/tutorials/tutorial-hello-enact/adding-css/
Vì sao mình lại đề cập vấn đề này, bởi vì đa phần hiện tại khi chúng ta lựa chọn apply ReactJS làm một dự án thường lựa chọn luôn cách apply css theo kiểu gì. Và với Enact kỹ thuật "CSS-Modules" đôi khi không quen lắm với mọi người và chính team mình đã miss đôi lần làm tốn khá nhiều effort.
CSS-Modules là một đặc tính kỹ thuật cho phép người viết viết CSS bằng (CSS, LESS..) một cách ngắn gọn, tường minh về className mà không cần lo lắng về việc xung đột tên className, điều mà có thể phát sinh khi sử dụng nhiều global stylessheets. (Ở đây tôi không biết bạn sẽ nghĩ tốt hay xấu :D)

Tất cả class định nghĩa trong CSS Modules được default ở local. Nó sẽ được rename trong giai đoạn compile trở thành chuỗi duy nhất.