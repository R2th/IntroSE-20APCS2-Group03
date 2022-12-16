# Cuộc đời có khi là chuỗi ngày copy-paste
Một ngày nọ, bạn được sếp giao cho 1 dự án mới cần có back-end, front-end cho cả người quản trị viên, người dùng cuối end-user. Do quen tay với việc code React và NodeJS kinh qua cả tỉ project trước đó. Vì vậy không mất nhiều thời gian, bạn mò vào các projects trước đó của công ty, hoặc 1 "boilerplate" có sẵn tự tạo hoặc vừa ngó được trên github. Bạn nhanh chóng "copy-paste" những dòng code mà bản thân đầy tự hào sang project mới. Ví dụ như middlewares, các hàm utils, helper, functions....mà bạn dày công xây dựng. Rồi cho đến Redux-shared, các ui shared như login, register, login, logout...Chả mấy chốc, bạn đã có 1 bộ khung hoàn chỉnh để có thể cùng team bắt tay vào code dự án mới một cách rất nhanh chóng.

Bỗng một ngày đẹp trời, em tester xinh đẹp xà vào bạn và thỏ thẻ những lời: "Anh ơi em thấy cái ấy kia sai sai...". Bằng tất cả lòng tự trọng, bạn ngay lập tức kiểm tra và phát hiện 1 trong các hàm utils của mình code sai. Bạn tá hoả lên và bắt đầu debug và fix nó. Rồi bạn phải vắt óc suy nghĩ, các projects nào của công ty dùng hàm này và đi sửa từng project một, rồi build và deploy từng project lại. Lúc đó bạn tự hỏi: "Mình đã làm gì sai mà số khổ thể này" =))). Bạn nhận ra mình đã tự làm khổ mình, các source code trong công ty có đến 20-30% là giống nhau, và có thể tiếp tục tăng. Lúc này vấn đề cover lỗi có thể trên tất cả projects.

Với tư cách một leader, bạn liền triệu tập võ lâm để tìm cách giải quyết. Một anh dev trẻ đưa cho bạn giải pháp. Đó là tạo các library riêng theo từng chức năng trên, publish lên npm. Các dự án nào cần dùng có thể install về dùng như một 3rd-library khác có trên npm. Lúc này bạn và mọi người thấy hợp lý, vì những dòng code đó chỉ cần viết 1 lần rồi đẩy lên npm mà không còn copy-paste nữa. Bạn nghĩ mình đã tìm ra ánh sáng của cuộc đời, bạn cùng cộng sự hì hục tách code rồi đẩy lên npm. Vấn đề được giải quyết.

# Khoan đã....
Rồi tiếp một ngày, một bạn fresher 2 năm kinh nghiệm sửa library A rồi publish version mới lên trên npm, anh ấy bảo anh em update lại version của library trên project đi. Nhưng mọi người không biết, anh fresher kia sửa output 1 hàm từ string => number. Thế là tất cả project còn lại sau khi update đều fail sạch unit-test(đấy là công ty bạn còn xịn có unit test đấy nhá =))) ). Đen hơn nữa CI/CD chạy, và dự án bạn nguy cơ bị sập trong giây lát... Rồi tất cả đấm anh fresher kia 1 trận tơi bời.

# Bắt đầu
![Source: Reddit - Lines of code used](https://images.viblo.asia/2752f1ef-efe2-400d-83ab-61f9bcf43f1d.jpg)

Mình nghĩ vấn đề trên, ắt hẳn chúng ta đã, đang và sẽ có thể mắc phải trong sự nghiệp của bản thân mình. Việc lôi 1 số dòng code từ project nọ sang project kia chắc là không mấy xa lạ phải không? Rồi chúng ta tự nghĩ, không biết các công ty công nghệ hàng đầu như facebook, google, microsoft họ sẽ giải quyết như thế nào với số lượng code khổng lồ như trên, mà có khi chúng ta mất cả sự nghiệp cũng chưa đọc hết được.
Qua lang thang trên mạng, mình đã đọc được 1 số bài viết về cách tổ chức code ở các công ty lớn hàng đầu thế giới. Đó là thuật ngữ **monorepos**.

Các bạn có thể tìm kiếm trên google về thuật ngữ này 1 cách dễ dàng, mình xin phép tóm lược sơ qua về Monorepo: **Monorepos là một cách phát triển phần mềm, mà chúng ta sẽ lưu tất cả codes của rất nhiều projects ở chung 1 repository trên revision control systems.**. Hiện nay rất nhiều công ty công nghệ hàng đầu thế giới đang sử dụng Monorepos để phát triển các ứng dụng của mình, như là Google, Facebook, Microsoft, Uber, Airbnb, Twitter...

# Lợi ích của monorepos:
Có rất nhiều ưu điểm của monorepos so với cách phát triển truyền thống, đó là:
- "Ease of code reuse": Chúng ta có thể sử dụng các thư viện dùng chung mà chúng ta tự phát triển một cách trực tiếp, bằng việc abstract chúng và sử dụng trực tiếp thay vì phụ thuộc vào một package manager như NPM.
- "Simplified dependency management": Khi chúng ta sử dụng nhiều repository để lưu trữ source code, các repository này sẽ sử dụng các thư viện 3rd, và các thư viện này phải được download và build ở tất cả các repository. Khi chúng ta sử dụng monorepos, các 3rd party library này sẽ chỉ được download ở codebase ban đầu. Hơn nữa, các version của các 3rd có thể đồng nhất giữa các dự án. Ví dụ mình sử dụng Angular, nếu chúng ta tách thành các repository, sẽ có trường hợp các version của Angular sẽ khác nhau giữa các dự án: 2,4,9,11...Nếu chúng ta sử dụng monorepos và quản lý tốt, chúng ta sẽ đồng nhất các version Angular thành 1 version latest, như vậy code lúc nào cũng được upgrade version mới nhất ở tất cả các projects kia.
- "Large-scale code refactoring": Mỗi khi chúng ta refactor code ở các dòng codebase, chúng ta đảm bảo được việc sẽ không ảnh hưởng đến các projects khác mà không cần phải update version thư viện như kịch bản mình nêu đầu bài.
- "Atomic commits": Bình thường, chúng ta phải đảm bảo khi dự án hoạt động phải đồng bộ hoá các phiên bản giữa các projects với nhau. Ví dụ library 2.0 update lên 3.0. Những applications cũng phải được update library đó lên 3.0. Khi có quá nhiều projects, việc quản lý sao cho thống nhất và đồng bộ trở thành nỗi lo rất lớn của những leader, team lead. Đối với monorepos, chúng ta có thể thay đổi code ở library và applications khác nhau, và commit cùng 1 lần và có hash commit cụ thể, do đó những người sau có thể nắm bắt được sự thay đổi của các projects.
- "Collaboration across teams": Chúng ta có thể làm việc giữa các team với nhau 1 cách dễ dàng hơn. Giả dụ, một team chuyên phát triển các library utils, một team chuyên phát triển các applications sử dụng libraries kia. Sự giao tiếp giữa 2 team là liên tục và cần thiết.

# Có lợi, ắt phải có hại:
- "Collaboration across teams": Mỗi lần build code chỉ có một version cho tất cả các projects
- "Lack of per-project access control": Phải cấp quyền truy cập toàn bộ source code cho các thành viên trong team. Trong một số trường hợp, điều này không được cho phép bởi vì mỗi thành viên chỉ được truy cập 1 số repository nhất định(trong trường hợp dùng multi repo).
- "More storage needed by default": Chúng ta chỉ cần code trên 1 project mà vẫn phải clone cả repository về

Các nhược điểm trên chắc hẳn các tập đoàn công nghệ lớn họ cũng gặp phải, tuy nhiên theo mình tìm hiểu thì Google hay các công ty lớn họ có các revision control systems của họ và giải quyết được vấn đề trên.

# Lời kết
Việc nên hay không nên sử dụng Monorepo phụ thuộc vào team của bạn. Đối với mình, sẽ có 1 số trường hợp sau.


**Nên:**
- Khi dự án nội bộ, không lo ngại vấn đề quản lý code giữa các members, nên dùng monorepo
- Khi có 1 lượng codebase lớn dùng chung 
- Team tuân thủ quy tắc, viết unit test và check affect đầy đủ

**Không nên:**
- Khi làm dự án cho nhiều khách hàng, có thể dùng monorepo với điều kiện bàn giao source code sau cùng. Lúc này phải xoá tất cả source code dự án khác rồi mới bàn giao. Trong trường hợp khách hàng truy cập được source trong thời gian phát triển thì tuyệt đối không được.

![NxWorkspace](https://images.viblo.asia/bd48ca9c-cc12-432c-ba9a-b5cc363cf386.png)

Hiện tại cũng có một số công cụ hỗ trợ việc tạo monorepos như Lerna, Yarn, NxWorkspace. Tuy nhiên cá nhân mình đánh giá, NxWorkspace hiện tại đang có nhiều ưu điểm hơn các công cụ còn lại. Bài sau mình sẽ viết bài về NxWorkspace nhé. Tạm biệt các bạn!.

# Tham khảo
- https://nx.dev/
- https://en.wikipedia.org/wiki/Monorepo