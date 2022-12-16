Bạn là một người thích trở thành một FrontEnd Developer? Vậy bạn đã bao giờ được ai hỏi dùng phương pháp nào để đặt tên cho các class trong project mà bạn đã từng làm chưa. Mình cũng đã từng tập tành tìm các file **.psd** tải về rồi cắt chúng ra thành những file html và rồi kết quả khi nhìn vào file CSS không khác một mớ hỗn độn :sweat_smile: đủ các loại tên mà không có một quy ước gì cả :)))

Và rồi mình được một người gợi ý về một phương pháp đặt tên cho các class giúp mình tiết kiệm rất nhiều thời gian và clear code hơn, đó chính là: BEM (Block Element Modifier) một quy ước đặt tên đơn giản, mạnh mẽ giúp bạn dễ đọc và dễ hiểu hơn rất nhiều. BEM không phải là phương pháp duy nhất nhưng đó là phương pháp hiện giờ mình đang sử dụng - đặc biệt là khi được ghép nối với SASS thì tuyệt vời :kissing_heart: 

![](https://images.viblo.asia/df01b804-c54d-40c8-8b09-161560aef4a6.gif)

## BEM là gì?

*BEM (viết tắt của Block-Element-Modifier) là một tiêu chuẩn quy ước đặt tên cho các tên lớp CSS. Nó được sử dụng khá rộng rãi và vô cùng hữu ích trong việc viết CSS dễ đọc, dễ hiểu và chia tỷ lệ hơn.*

## Tại sao lại phải sử dụng BEM?

Trong những dự án nhỏ có thể BEM chưa không được sử dụng đầy đủ nhưng trong các dự án lớn và làm việc với Team thì BEM như một người cứu cánh vậy. Tại sao lại như vậy? mình sẽ gạch ra mấy ý cơ bản như sau:

* BEM giúp cho Team làm việc cộng tác với nhau dễ dàng: Khi làm Team với nhau, mỗi người sẽ có một cách đặt tên class riêng và sẽ bị conflict với nhau. Sử dụng BEM sẽ loại bỏ vấn đề này, ví nó có cấu trúc rõ ràng và dễ tuân thủ khi sử dụng.
* Tính Modules: Các class của mỗi khối sẽ không bị ảnh hưởng bởi các yếu tố khác, nên bạn sẽ không lo CSS của class này sẽ gây ảnh hưởng lên class khác.
* Khả năng sử dụng lại: Bạn có thể soạn các khối độc lập khác nhau và sử dụng lại chúng một cách thuận tiện, làm giảm số lượng code CSS.
* Cấu trúc: BEM giúp cũng cấp cho CSS của bạn một cấu trúc vững chắc, đơn giản và dễ hiểu.

## Những thành phần cơ bản của BEM

![](https://images.viblo.asia/e30cc787-9ff0-448d-a444-e2cf9cd244f0.jpeg)

* **Block:** Có thể được hiểu là một thành phần của trang web hay ứng dụng đó, các thành phần của DOM cũng có thể là các khối.
```html
HTML: <div class="block">...</div>
CSS: .block { background: red; }
```
* **Elements:** Là một thành phần của một khối và sẽ không tồn tại độc lập mà không có khối vì được đặt bên trong nó, và chúng phụ thuộc vào khối cha mẹ của nó. Trong BEM, các phần tử được biểu thị bằng dấu gạch dưới kép __.
```html
HTML: <div class="block">
          <span class="block__elem"></span>
      </div>
CSS: .block__elem { background: lightgray; }
```
* **Modifers:** Được dùng để thao tác thay đổi cách hiển thị trên khối hoặc phần tử. Ví dụ mình muốn tạo thêm một khối `.block__elem` khác nữa và muốn làm nổi bật nó thì sẽ thêm một class `.block__elem--hightlight` để tạo sự khác biệt đó.
```html
HTML: <div class="block">
	  <span class="block__elem"></span>
          <span class="block__elem block__elem--highlight"></span>
      </div>
CSS: .block__elem--highlight { background: black; }
```

## Quy ước khi làm việc với BEM
* Không được đặt một class con như sau: `.block__parent__eye` mà thay vào đó để miêu tả mỗi quan hệ giữa các khối và phần tử với nhau như sau `.block__parent--eye`.
* Duy trì tính modules
* Tránh sử dụng để viết CSS cho **id**, cụ thể là những trường hợp ưu tiên trong CSS.

## Kết Luận

Như vậy, mình đã giới thiệu qua về BEM cũng như cách sử dụng BEM vào trong làm việc. Ở bài sau ([tại đây](https://viblo.asia/p/bem-va-mot-so-vi-du-QpmlegpmKrd)) mình sẽ đi vào các ví dụ cụ thể hơn để mọi người hiểu hơn về BEM, mọi người cùng chờ đón nhé. Cảm ơn mọi người đã đọc bài của mình! :wink: