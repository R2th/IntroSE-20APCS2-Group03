## Lời mở đầu 
Đối với nhiều người, việc viếc những dòng CSS chỉn chu, chính xác có vẻ như vô cùng khó khă. Một số người còn nói rằng: "Bảo tôi làm cái gì cũng được, miễn là không phải đụng vào CSS'. Tuy nhiên, nếu như không có CSS thì trang web của bạn sẽ trông như...một bãi rác lổm ngổm, bạn không thể tránh được việc phải viết CSS để trang web trông ra dáng hơn. 

Bắt đầu từ lúc xây dựng CSS, công việc của bạn khi định nghĩa style cho các phần tử là sử dụng class, tag và id  để gán style cho các thành phần trong trang web, sử dụng các selectors đơn giản như `.title`, `input`, `#app`

Nhưng khi trang web của bạn mở rộng với nhiều thành phần và tính năng mới, cấu trúc CSS trở nên vô cùng rối rắm và phức tạp. Bạn sẽ mất hàng giờ để nghĩ cách đặt tên cho một thành phần mới trong trang web vì nó có vẻ giống như một selector bạn đã sử dụng, hay viết một selector dài dằng dặc như `div#app .list li.item a`. Sau đó đoạn code này sẽ lặp đi lặp lại nhiều lần, đối với cả những thành phần nhỏ hơn nữa,.... Và thế là càng ngày code CSS của bạn càng khó có thể maintain. Tưởng tượng nếu dự án cần thêm một người dể làm việc CSS và đọc đống code của bạn thì sẽ kinh khủng như thế nào? 

Bài viết này sẽ hướng dẫn các bạn làm thế nào để có thể viết CSS mà sau này có thể bảo trì và mở rộng được, tránh gặp phải những vấn đề đâu đầu.

## Sử dụng SCSS 

SCSS là một loại công cụ tiền xử lý cho css, hỗ trợ cho việc viết CSS dễ dàng hơn với `variables`, `nesting`, `imports` và `mixin`

### Variables

Bạn có thể sử dụng biến trong scss, từ đó có thể tái sử dụng một biến nào đó nhiều lần mà không phải lặp lại một giá trị nào đó. Một ứng dụng hữu ích nhất trong việc sử dụng biến là đặt tên cho màu bạn cần sử dụng nhiều lần.
Giả sử, màu chủ đạo trong trang web của bạn là `#c2f3e`, được sử dụng trong rát nhiều chỗ trong trang web như màu background, màu button, màu title,.... Tuy nhiên vào một ngày đẹp trời sau khi tham khảo ý kiến từ người dùng về trải nghiệm web, bạn thấy mà xanh lá sẽ hợp với trang web của bạn hơn, thế là bạn phải thay đổi màu chủ đạo ở rất nhiều chỗ. Thay vì tìm đến từng thành phần và đổi màu từ mã này sang mã kia thì với việc sử dụng biến bạn chỉ cần đổi giá trị biến đó là toàn bộ màu trang web của bạn sẽ thay đổi theo:

```
// Khai báo một biến
$primary-color: #0099ff;

// Sử dụng biến:
h1 {
  color: $primary-color;
}

```


### Nesting

SCSS cho phép bạn lồng style giữa các class lại với nhau:

```
h1 {
  font-size: 5rem;
  color: blue;
}
h1 span {
  color: green;
}
```

Đoạn CSS trên có thể thay được bằng đoạn SCSS sau: 
```
h1 {
  font-size: 5rem;
  color: blue;
  
  span {
    color: green;
  }
}
```

Điều này giúp cho việc đọc CSS cũng như thêm style cho các thành phần của bạn dễ dàng hơn.

### Partials và Imports 

Để chắc chắn rằng sau này bạn có thể bảo trì và đọc lại code css một cách dễ dàng, bạn không nên để hết toàn bộ code trong một file CSS. Giai đoạn đầu phát triển một ứng dụng prototype, hoặc là một trang web nhỏ thì bạn có thể làm như vậy, nhưng trong một dự án lớn và mở rộng với nhiều trang khác nhau và các thành phần phức tạp thì đừng bao giờ thử làm điều đó. 

SCSS có thể giúp bạn phân chia code thành nhiều file, sau đó import lại vào trong một file lớn. Bằng cách thêm các đấu `_` đằng trước tên file, đó sẽ là một partials để có thể import vào chỗ nào đó, chẳng hạn như `_animations.scss`, `_base.scss`, `_variable.scss`...

Để import các đoạn code CSS từ các file trên, bạn phải sử dụng từ khóa `@import` như sau:

```
// _animations.scss
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
// header.scss
@import "animations";
h1 {
  animation: appear 0.5s ease-out;
}
```

Với những hỗ trợ như trên, SCSS giúp việc code CSS của chúng ta dễ bảo trì hơn rất nhiều.

## Thiết kế CSS class theo phương thức BEM

Nếu không được định nghĩa theo một cách thức cụ thể, các class trong file CSS của bạn có thể có những cái tên rất là loạn và khó kiểm soát, như `.button`, `.page-1`, `.page-2`, `.custom-input`.

Đặt tên luôn là một vấn đề nan giải đối với bất kỳ developer ở bất kỳ ngôn ngữ nào, trong khi việc đặt tên đóng vai trò quan trọng trong quá trình phát triển ứng dụng. N

BEM là một cách thức đặt tên, viết tắt của **Block Element Modifier**

### Blocks

Một block giống như một component, cấu thành nền toàn bộ phần 
Đặt tên cho block chính bằng màn hình mà bạn đang sử dụng, ví dụ như `post`, `home-page`,...

### Elements

Element là một phần của block. Giả sử như trong một block `post` có nhiều thành phần như `title`, `description`, `image` thì các element này sẽ được định nghĩa style riêng.
Cách đặt tên cho các elements của block như sau:
```
// Tên block + __ + tên element : .block__element

// Ví du: Block **post** có các element "author", "date", "text"
.post__author {
  ...
}
.post__date {
  ...
}
.post__text {
  ...
}
```


### Modifiers

Modifier là các đặc điểm, tính chất riêng của một thành phần mà bạn muốn sử dụng. Giống như các option, nhiệm vụ của modifier là miêu tả style cụ thể của một block/element, ví dụ như màu xanh, căn giữa,... 
Cách dặt tên class cho modifier: Tên block hoặc tên element + "--" + tên modifier
```
.block__element--modifier
.block--modifier

// Ví dụ: 

.post--important {
  ...
}
.post__btn--disabled {
  ...
}
```

### Một vài chú ý 

* Khi sử dụng BEM, bạn nên chỉ sử dụng **class** để style, không sử dụng ID cũng như tags
* Block/elements có thể lồng trong các blocks/elements khác, nhưng chúng phải hoàn toàn độc lập với nhau. 
* Với sự hỗ trợ của SCSS thì việc thiết kế các class theo cách BEM này sẽ trở nên dễ dàng hơn rất nhiều:

```
.post {
  font-size: 14px;
  padding: 10px 0;
  text-align: center;
  
  &__author {
    font-weight: bold;
    color: $yellow;
  }
  
  &__title {
    color: $black;
    
    &--bold {
      font-weight: bold;
    }
  }
}
```

Chúng sẽ được dịch ra như sau:

```
  .post {...}
  .post__author {...}
  .post__title {...}
  .post__title--bold {...}
```


## Cấu trúc các file CSS theo phương thức "7-1"

Phương thức này giúp chúng ta tiết kiệm thời gian trong việc lần mò lại các đoạn code CSS trong hàng đống file mà bạn tạo ra. Bạn chỉ cần quan tâm đến 2 thứ:
* Viết toàn bộ các file partials trong 7 thư mục khác nhau 
* Import toàn bộ các file partials vào một file `main.scss` ở thư mục làm việc chính của project.

7 folders này bao gồm:
* `base`: chứa toàn bộ boilerplate code của bạn, tức là những dòng CSS bạn sử dụng mỗi khi tạo một project mới. Chẳng hạn như kiểu font chữ sử dụng cho toàn trang web, `padding`, `margin` cho các thẻ `body`, `header`, các loại ảnh, icon, biến sử dụng trong các partials khác, ....
* `layout`: Dùng để sử dụng làm layout cho các phần khác nhau của một trang. Trong này sẽ là partials style cho các thành phần header, footer, navigation, seciton, grid,...
* `pages`: Chứa những trang khác nhau trong một ứng dụng web của bạn. Ví dụ như `_home`, `_about`, `_contact`, ...
* `themes`: Nếu như trang web của bạn có nhiều theme khác nhau, thì hãy đặt file CSS cho từng loại vào trong này.
* `abstract`: Thư mục chứa các file định nghĩa hàm, biến và các mixins
* `vendors`: Thư mục chứa các đoạn code từ thư viện bên ngoài. Chẳng hạn như bạn muốn sử dụng thư viện từ Font Awesome, Bootstrap thì code thư viện sẽ được đặt trong này 

Còn "1" ở đây là main file, nơi import toàn bộ các partials đã liệt kê:

```
@import abstracts/variables;
@import abstracts/functions;

@import base/reset;
@import base/typography;
@import base/utilities;

@import components/button;
@import components/form;
@import components/user-navigation;

@import layout/header;
@import layout/footer;

@import pages/home;
@import pages/about;

...
```

Tùy trường hợp mà bạn có thể không cần sử dụng đến thư mục `vendors` và `themes`

## Từ SCSS đến CSS

Còn một điều nữa là trước khi kết thúc, đó là trình duyêt đương nhiên không thể hiểu được những đoạn SCSS bạn viết ra. Vì vậy cần một công cụ để biên dịch từ SCSS thành một file CSS. 
Đã có sẵn thư viện hỗ trợ cho chúng ta xử lý việc này, đó là package `node-sass`:

`node-sass <input> <output> [options]`

Chạy lệnh này với input là file `main.scss` mà chúng ta vừa viết ở trên với toàn những dòng `@import`, chúng ta sẽ được một file main.css hoàn chỉnh (theo output) chứa toàn bộ đoạn code mà bạn đã phân bổ ra nhiều file. Vậy là trình duyệt có thể đọc và hiểu được.

## Kết luận
Bài viết này hi vọng giúp bạn phần nào đỡ đau đầu khi phải suy nghĩ đến việc viết CSS sao cho "có tâm" để sau này có thể mở rộng và bảo trì. Thực tế còn nhiều phương pháp và kỹ thuật nữa giúp bạn viết code CSS tốt hơn, lựa chọn phương pháp nào phù hợp với bạn mới là tốt nhất
Cảm ơn đã theo dõi!

Nguồn: 
https://medium.freecodecamp.org/how-to-get-better-at-writing-css-a1732c32a72f