![](https://images.viblo.asia/83385dec-be15-461e-b1c4-feba3421ba23.jpg)

Bài viết này được dịch lại từ nguồn sau: https://cheesecakelabs.com/blog/dont-blame-the-framework-angularjs-and-reactjs/

Trong vài năm qua, các trang web đã phát triển thành những ứng dụng web phức tạp hơn, và những trang thông tin kinh doanh đơn giản trước đây, bây giờ đã được thay thế bởi Facebook, Slack, Spotify và Netflix. Chúng đã thay đổi cách bạn giao tiếp, nghe nhạc, hay xem phim. Sự phát triển của Front-end đã đạt đến một level mới và bây giờ nó đòi hỏi nhiều sự chú ý hơn trước đây.

Cũng giống như nhiều front-end developers khác, stack của chúng tôi bao gòm HTML và jQuery. Chúng tôi thực hiện các AJAX requests đến backend, render UI trên javascript và chèn nó vào trong DOM. Những hành động của người dùng sẽ được theo dõi bởi binding events và callback tới mỗi elements. Và điều này được áp dụng trên hầu hết các ứng dụng.

Tuy nhiên, khi một ứng dụng phát triển nhanh chóng, một vài vấn đề bắt đầu xảy ra thường xuyên hơn so với dự kiến ban đầu: bạn quên cập nhật tất cả các vị trí mà một giá trị được hiển thị trong UI, không có events nào được liên kết tới các nội dung được thêm vào bởi AJAX,... Đây là dấu hiệu cho thấy codes của bạn không thể maintain được, đặc biệt là khi phát triển cùng với một team. Sử dụng một front-end framework cung cấp một cách chính thức để viết các đoạn codes phối hợp mà bạn có thể dễ dàng đọc, viết và cập nhật chúng.

### 1. Sự khởi đầu của React
Khi team chúng tôi lần đầu thấy được sự cần thiết của việc áp dụng một front-end framework, chúng tôi đã đưa ra một số lựa chọn để cân nhắc: Angular và React

Angular được xem là ứng cử viên trưởng thành nhất: Angular có một cộng đồng vững mạnh, bạn có thể học hỏi các tình huống thường xảy ra và cách sử dụng từ module bên thứ 3.

React đã có những bước tiến lớn đầu tiên, code Javascript-centric của React hoạt động nhanh chóng, đầy hứa hẹn. Mặc dù còn ở phiên bản beta, nhưng được gán mác "phát triển bởi Facebook" nên React đã được tin tưởng hơn nhiều. Và chúng tôi quyết định chọn React.

Ban đầu, thật sự thỏa mãn khi làm mọi thứ sử dụng Javascript: hiển thị một đoạn HTML hoặc không, render một danh sách bằng cách iterate qua một mảng. React cũng làm tốt việc thay đổi một giá trị của biến và thấy nó lan truyền dến tất cả các phần của codes thông qua `props` (một trong những component attribute của React), chia nhỏ mọi thứ thành các `reusable components`. React đã đem lại tính nhất quán cần thiết để phát triển các đoạn codes có khả năng maintain được.

### 2. React + Flux = ♥
Nhưng khi áp dụng vào thực tế, mọi thứ đều không như màu hồng. Thử thách lớn đầu tiên chúng tôi gặp phải và thực sự khiến chúng tôi suy nghĩ, liệu React có đáng được sử dụng không - hay là mê cung các callback.

Do tính chất luồng dữ liệu một chiều của React, một component con cần phải nhận một callback để kích hoạt thay đổi trạng thái trên component cha. Điều này trông có vẻ không phải là một vấn đề lớn cho đến khi bạn nhận ra rằng component con đó đang đi xuống, bây giờ bạn cần phải cập nhật trạng thái của root component. Bạn phải đi qua tất cả các files và pass `"this.props.updateCallback"`  xuống stream line.

Mặc dù vậy, chúng tôi vẫn thích React và vẫn đang làm việc với nó. Một nỗ lực đã được đền đáp: Chúng tôi gặp `Flux`, một kiến trúc để thực thi và chính thức hóa luồng dữ liệu đơn hướng. Nó bao gồm 4 thành phần chính:
- **Store**: Nơi dữ liệu (trạng thái của ứng dụng) được lưu trữ
- **Action**: Kích hoạt một state change
- **Dispatcher**: quản lí và điều hướng các actions tới đúng nơi lưu trữ
- **View**: Hiển thị dữ liệu trong store và gửi đi các actions 

Với Flux, chúng ta không cần phải giữ trạng thái trên root component, và pass các update callback tới các thành phần con của chúng. Các React components sẽ lấy dữ liệu từ nơi lưu trữ trực tiếp và thay đổi trạng thái bằng cách gọi các actions: nó đơn giản, thanh lịch. Flux thêm một hành vi có thể dự đoán được và một vài tiêu chuẩn để nâng cao tính linh hoạt cho code React.

### 3. Một Angular nổi loạn xuất hiện....
.... Angular sử dụng code HTML tập trung và có vẻ như nó không đạt được hiệu quả tối đa

Gần đây, tôi bắt đầu làm việc trong một dự án Angular. Phần lớn dự án đã được hoàn thành, nên tôi phải hoàn thiện nốt phần còn lại. Là một developer trung thành với React, tôi có chút phàn nàn về Angular. Tôi thậm chí đã nguyền rủa nó - ngay cả khi đó là những đoạn codes Angular đầu tiên tôi đang viết một cách chuyên nghiệp. Sau tất cả, tôi nhận thấy rằng: nếu bạn đã yêu React, bạn sẽ ghét Angular.

Và tôi không thể tự lừa dối bản thân mình, trong thời gian đầu tiên, tôi không thích làm việc với code Angular một chút nào. Nhúng tất cả các thuộc tính cụ thể (directives) vào trong code HTML có vẻ không được ổn. Tôi đã vật lộn để hoàn thành những việc đơn giản, như thay đổi URL mà không reload lại controller hoặc tạo ra template đơn giản.

Sự khó khăn tiếp tục khi tôi gặp một vấn đề trong form của tôi, bởi vì `ngIf` directive tạo ra một phạm vi con mới cho nó. Hoặc khi tôi muốn xóa các field trống rỗng từ một JSON được gửi từ server và nó cũng đồng thời xóa dữ liệu đó khỏi UI - ồ, đó chính là two-way data binding. Hoặc khi tôi muốn sử dụng `ngShow`, `ngHide` để hiện thị HTML block hoặc ẩn các thành phần khác, trong khoản 1/100 giây, cả hai đều được hiển thị đồng thời?? Tôi hiểu phần lớn những vấn đề này đều là do lỗi của tôi - tôi muốn chỉ ra rằng Angular không thể đoán trước được, nó ẩn chứa đầy những điều bất ngờ.

Nhưng dĩ nhiên, cũng có rất nhiều điều đã được thực hiện dễ dàng với Angular. HTTP request module được tích hợp sẵn trong Angular thực sự rất tốt, cũng như những hỗ trợ về Promise. Một điều khác nữa mà tôi không thể phàn nàn được chút nào, đó là: form controller được tích hợp sẵn. Các Input field có cơ chế mặc định để định dạng, phân tích và validate, cũng như một plugin tốt để hiển thị tin nhắn lỗi.

Bằng cách sử dụng Angular, bạn sẽ thấy dễ dàng hơn khi làm việc với một team design. Trong team của chúng tôi, có một kỹ sư chuyên viết HTML và CSS, và Angular cho phép chúng tôi làm việc cùng nhau thực sự liền mạch: anh ấy sẽ phụ trách về HTML và một vài thẻ phụ, trong khi đó tôi sẽ lo việc xử lý logic. Nếu chúng tôi sử dụng React, ít nhất anh ấy sẽ gặp khó khăn trong việc viết các components, vì anh ấy phải học những điều căn bản về JSX (hoặc tôi phải tự mình copy và paste công việc của anh ấy)

Nhớ về vụ thay thế URL và render teamplate tôi đã đề cập lúc nãy không? Đừng bận tâm nữa, tôi phát hiện ra rằng hầu như mọi người thường sử dụng một thư việc routing khác (ui-router), nó hoạt động tót hơn so với thư viện chuẩn (ngRoute). Và cuối cùng, Angular không hề tệ như tôi tưởng. Hầu hết những điều tôi đã phàn nàn lúc trước là bởi vì tôi đã ép buộc cách React làm việc lên code Angular hoặc là do tôi chưa có đủ kinh nghiệm.

### 4. Điểm mấu chốt: Angular và React
React sử dụng các native Javascript functions để cho phép các developers tạo ra các reusable components với vòng đời dự đoán được và luồng dữ liệu một chiều. Kết hợp với kiến trúc Flux (hoặc một trong những biến thể của nó - Redux), nó sẽ trở nên đáng tin cậy hơn, giúp cho một team dễ dàng làm việc với nhau lâu dài. Nhưng nếu bạn có được ai đó chỉ chuyên về HTML và CSS thì sẽ tốn 1 mức phí nào đó bởi vì nó làm thay đổi luồng phát triển truyền thống. Việc này còn tuỳ thuộc vào module bạn chọn để soạn ra các stack.

Mặt khác, Angular tập trung vào sự đơn giản trong thiết kế two-way data binding - những gì bạn thay đổi trong phạm vi của controller sẽ được thể hiện trên UI.  Bản chất ngoan cố của Angular giúp tiết kiệm thời gian setup bằng cách thiết lập 1 số pattern trong cách tổ chức code, khi đó việc lựa chọn core module từ hàng trăm lựa chọn khác không cần thiết nữa. Tuy nhiên, tương tự với two-way data binding, tuy việc lập trình trở nên đơn giản hơn nhưng cũng dễ tạo bug bất ngờ khi thay đổi một số phần của code trong thời gian dài – đặc biệt nếu các đoạn code mà đồng nghiệp của bạn viết chưa được đụng tới trong vài tháng qua.

Vậy sau tất cả, tôi nên chọn framework nào để xây dựng một ứng dụng ngay từ đầu?

Nếu xét về mặt lâu dài, cá nhân tôi sẽ chọn React, sử dụng kiến trúc Redux, Axios cho các requests HTTP và react-router. Nhưng lựa chọn này vẫn phụ thuộc nhiều vào kinh nghiệm của team: nếu có người chuyên về viết HTML và CSS, tôi chắc chắn sẽ chọn Angular. Cả hai framework đều có ưu điểm và khuyết điểm, điều cần nhất để duy trì một dự án là sự cam kết của các developer để viết và quản lý code tốt.