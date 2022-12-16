## Lời mở đầu
Trong những dự án mà các bạn phải bắt đầu dự án từ đầu, sau đó nó scale 1 cách rất nhanh chóng thành dự án lớn. Nếu các bạn không bắt đầu với một cấu trúc folder tốt, thì sau đó có thể sẽ trở nên rất khó khăn để giữ cho dự án trong sạch vững mạnh sau này. 

Ở bài viết này mình sẽ giới thiệu một số cách tổ chức cấu trúc folder hiệu quả trong các dự án React  (khi mình nói React có nghĩa bao gồm cả ReactJS và React Native)

## Những thử thách khi xây dựng một dự án React
Những điều sau xảy ra suốt, hầu như với tất cả các developer, và ám luôn suốt sự nghiệp của họ.

* Đầu tiên bạn build cho khách một dự án vừa phải, thành phần team gồm vài developer, mọi thứ diễn ra suôn sẻ mượt mà.
* Khách hàng yêu cầu điểm xuyết thêm vài thay đổi, và ok, bạn xử lý gọn
* Khi hhách hàng tiếp tục đòi bỏ vài tính năng cũ, thêm vào vài cái mới thay thế, mọi việc bắt đầu phức tạp, bạn tặc lưỡi và vẫn code cho nó chạy ổn, mặc dù ko phải là hoàn hảo
* Khách hàng lại đòi thêm vào vài tính năng nữa, hoàn toàn nằm ngoài tiên liệu của bất cứ ai trong team. Đến lúc này, bạn như cầm trên tay 1 xô hồ dán và đi trát xung quanh. Không phải là việc đáng tự hào lắm, nhưng code vẫn chạy, yay.
* Tầm 6 tháng sau, sau vài lần lặp lại các bước trên, code của bạn mất khả năng readability, và mọi thứ trông chả khác gì 1 mớ hổ lốn

… 

Khi bắt đầu học React, tôi tìm thấy vài bài tut rất hay dạy làm vài game nhỏ hay todo list. Nhưng có rất ít bài viết về việc bạn phải tổ chức một dự án React thực sự như thế nào cho hiệu quả, dự án với khoảng vài chục page và đôi trăm component.

Sau vài “nghiên cứu” trên Internet, mình nhận ra là các project mẫu React trên Github có chung một cấu trúc, chia theo type của file. Trông như sau


```
/src
  /actions
    /notifications.js
      
 /components 
    /Header
    /Footer
    /Notifications
      /index.js
  /containers
    /Home
    /Login
    /Notifications
      /index.js
  /images
    /logo.png
  /reducers 
    /login.js
    /notifications.js
  /styles 
    /app.scss
    /header.scss 
    /home.scss
    /footer.scss
    /notifications.scss
  /utils
  index.js  
```

Câu trúc này tương đối ổn. Tuy nhiên nó vẫn chưa phải là cách tốt nhất.

Khi tổ chức file theo type. Khi app lớn dần lên, sẽ tốn thời gian để bạn maintain. Và đến lúc nhận ra điều này thì thường đã quá muộn, và bạn sẽ phải trả giá bẳng rất nhiều thời gian và công sức nếu thay đổi mọi thứ.

React đơn giản là một thư viện js, và nó ko bắt bạn phải theo dúng cấu trúc nào cả.

## Một cách tiếp cận tốt hơn cho dự án của bạn
Có thời gian mình đã làm việc cho một dự án tài chính dùng Ember làm thư viện chính. Và mình học được cách mà Ember tổ chức dự án theo feature, chứ ko phải theo type. 

Sau đó mình làm nhiều thử nghiệm và quyết định nhóm lại các tính năng liên quan, nếu cần thì lồng chúng vào nhau.
```
/src
  /components 
    /Button 
    /Notifications
      /components
        /ButtonDismiss  
          /images
          /locales
          /specs 
          /index.js
          /styles.scss
      /index.js
      /styles.scss
  /scenes
    /Home 
      /components 
        /ButtonLike
      /services
        /processData
      /index.js
      /styles.scss
    /Sign 
      /components 
        /FormField
      /scenes
        /Login
        /Register 
          /locales
          /specs
          /index.js
          /styles.scss
  /services
    /api
    /geolocation
    /session
      /actions.js
      /index.js
      /reducer.js
    /users
      /actions.js
      /api.js
      /reducer.js
  index.js 
  store.js
```

Mỗi component, scene hoặc service có mọi thứ nó cần để hoạt động riêng biệt, như là styles, image, translation cũng như test riêng. Để hoạt động một cách đúng đắn, chúng phải follow vài quy tắc sau. 
* một component có thể define thêm component hoặc service con lồng trong nó, nhưng ko được dùng hoặc define scene.
* Một Scene có thể define component, scene hoặc service con.
* Một service có thể định nghĩa service con, nhưng ko thể define hoặc dùng component hoặc scene con.
* Một feature con chỉ có thể dùng mở parent của nó

### Component
Các bạn hẳn đã biết component là gì. Nhưng một điều quan trọng đó là khả năng có thể lồng một component vào một component khác. 
Component được define ở root level của dự án của bạn (đúng hơn là trong src), trong thư mục components. nó là global và có thể dùng ở mọi nơi từ app của bạn. Nhưng nếu như bạn định nghĩa một component lồng trong component khác, thì điều đó có nghĩa là bạn chỉ có thể dùng component đó bằng parent của nó.
**Tại sao?**
Khi phát triển một dự án lớn, sẽ có thời điểm mà bạn cần phải tạo ra 1 component, mặc dù bạn biết chắc là sẽ không cần dùng nó ở bất cứ chỗ nào khác, nhưng bạn **cần** nó. Và nếu như cứ cố chấp để nó vào thư mục components chung, nó sẽ lạc trong biển hàng trăm component khác.

Ngoài ra nếu bạn chỉ để ở thư mục component gốc những component chính, thì sau này việc tìm lại chúng cũng dễ dàng hơn rất nhiều

1 chút ví dụ: 
```
/src
  /components
    /Button
      /index.js
    /Notifications 
      /components 
        /ButtonDismiss 
          /index.js
      /actions.js
      /index.js
      /reducer.js
```
* Button có thể được dùng bất cứ đâu
* Notification có thể được dùng bất cứ đâu, nó định nghĩa thêm ButtonDismiss
* Nhưng ButtonDismiss thì chỉ dùng trong Notification
* ButtonDismiss có thể dùng Button, vì Button được định nghĩa ở thư mục component gốc 
### Scenes
Một Scene là một page trong app. Có thể xem Scene như là một component bất kì cũng được. Tuy nhiên tôi chọn chia chúng vào folder riêng. 

Với chung quy tắc với component, bạn cũng có thể lồng scene này vào một scene khác, và cũng có thể define ra component hoặc service con cho scene. Tuy nhiên bạn phải nhớ là nếu bạn định nghĩa thứ gì đó ở trong Scene. Thì bạn chỉ được dùng nó trong scene đó.

```
/src
  /scenes
    /Home 
      /components
        /ButtonShare
          /index.js
      /index.js
    /Sign
      /components
        /ButtonHelp
          /index.js
      /scenes
        /Login
          /components 
            /Form
              /index.js
            /ButtonFacebookLogin
              /index.js
          /index.js
       
        /Register
          /index.js
      /index.js
```

* Home có component  làButtonShare, nút này chỉ được dùng trong Home scene
* Sign có component là ButtonHelp. Component này cũng có thể được dùng trong scene Login hoặc Register. Hoặc bởi bất cứ component nào được define trong những Scene này
* Component Form sử dụng ButtonHelp được, vì ButtonHelp được định nghĩa bởi một parent của nó. 
* Scene Register không được sử dụng bất cứ component nào define ở Login, nhưng nó có thể dùng ButtonHelp.

## Tổng kết
Mình đã áp dụng cấu trúc folder này cho những dự án React Native mơi đây, và thực sự nó tiết kiệm cho mình hàng đống thời gian.
Mình cũng xin khuyến cáo là nên giới hạn các thư mục lồng nhau khoảng 3-4 level thôi, điều này sẽ tránh phức tạp và tăng tính reusability cho code.

Cách mình vừa trình bày chỉ là một cách để tổ chức project React thôi. Mình đã dùng và thấy nó rất hữu ích. Nếu thấy hữu ích có thể thử áp dụng vào các dự án của chính các bạn xem sao nhé

## Tham khảo
https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1
https://github.com/alexmngn/react-native-authentication