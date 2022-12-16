![image.png](https://images.viblo.asia/fd2a283e-d38f-4124-9a54-ef5f7320c77c.png)

Điểm chung của Flutter, React Native đều là Cross-platform Mobile, build native cho cả Android và iOS. Cả 2 có thể giao tiếp với native để viết các Module base on native (gần như bắt buộc).
## 1. Flutter
###      Ưu điểm:
* Mạnh về animation, performance app rất cao. Cơ chế render có thể giao tiếp trực tiếp với GPU.
* Back bởi Google.
* Giao tiếp gần như trực tiếp với native.
* Archive (build production) hoàn toàn là file thực thi native.
* Static language nhưng với syntax hiện đại, compiler linh động giữa AOT (for archive, build prod) và JIT (for development, hot reload).
* Flutter chạy được giả lập mobile ngay trên web, tiện cho development. Các metric measure performance được hỗ trợ sẵn giúp developer kiểm soát tốt performance của app.
* Flutter có thể dùng để build các bundle/framework gắn và app native để tăng performance.
* UI/UX Android và iOS có thể giống hệt nhau (vì không sử dụng tầng UI có sẵn của native).
###      Nhược điểm:
* Bộ render UI được team author Flutter gần như viết lại, không liên quan tới UI có sẵn của Framework native, dẫn đến memory sử dụng khá nhiều.
* Phải học thêm ngôn ngữ DART. Dù dễ và thân thiện nhưng đây cũng là 1 rào cản quan trọng cần cân nhắc.
* Update quá nhanh… ngủ dậy sau một giấc thấy version tăng 2 số là bình thường. Hiện đã stable nhiều hơn, với khi update cũng hiếm bị breaking change (lỗi source cũ).
* Do là một framework có tuổi đời rất trẻ, cộng đồng dù vẫn đang phát triển rất nhanh, nhưng ở Việt Nam thì mới nổi lên 2 năm gần đây.
## 2. React Native
###      Ưu điểm:
* Thiên về development/hotfix nhanh (hot reload, bundle injection). Có cơ chế inject gói js vào app để hotfix cực lẹ.
* Sử dụng JS (quen thuộc với nhiều developer) và có thể share business logic codebase với frontend (js). Từ đó cũng dễ học, dễ tuyển người hơn.
* Back bởi Facebook.
* Hiện tại đã rất nhiều thư viện, gần như đã rất đầy đủ cho các nhu cầu app thông dụng.
###      Nhược điểm:
* Giao tiếp với native thông qua các bridge, dễ bị bottleneck nếu không được kiểm soát tốt. Hiện cơ chế này đã cải thiện đáng kể với V8 engine.
* Dùng JS nên mang theo các đặc điểm của JS: rất dễ làm nhưng về sau sẽ càng khó, sẽ khó maintain nếu không có dev xịn.
* Hiệu năng animation là điểm yếu của RN, muốn làm tốt phải làm từ native, tầng js chỉ call vào, setup views. Tuy nhiên với các interactive animation thì rất đau khổ.
* Không thích hợp cho các app cần năng lực tính toán cao (hash, crypto, etc). Lúc này cần xuống tầng native code nhiều hơn.
Tóm lại:

Flutter cực kì phù hợp với các dự án cần yêu cầu animation phức tạp, mượt mà. Với thế mạnh sử dụng bộ render tự làm, giao tiếp trực tiếp với GPU và một SDK để viết animation dễ dàng, có thể nói viết app như viết game. Các team native có thể dùng Flutter làm thêm các UX có hiệu năng cao vào app native có sẵn. Flutter Developer hiện tại chưa nhiều, sẽ khó tìm người hơn.

React Native phù hợp với các team dùng Javascript là chủ đạo (React, Node,…), app không cần animation phức tạp. RN hiện tại tuyển người khá/rất dễ so với Flutter.

Về quan điểm cá nhân 200Lab, sau 2 năm dùng React Native, cuối cùng chọn Flutter cho toàn bộ các dự án mobile. Bên mình tin rằng Flutter sẽ sớm được ưu chuộng không chỉ với Mobile App mà còn với cả Website.

Hiện đã khá nhiều doanh nghiệp bắt đầu để ý đến Flutter, chuyển các dự án cũ sang Flutter. Rất nhiều học viên của 200Lab vì điều này đã tìm đến 200Lab. Còn các bạn thì sao, hãy comment để cho 200Lab thêm các góc nhìn khác nhé!

Tham khảo thêm tại: https://200lab.io/blog/so-sanh-flutter-vs-react-native/