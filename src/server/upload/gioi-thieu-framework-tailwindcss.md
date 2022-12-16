## Giới thiệu
Hiện nay, khi tạo một trang web mới trong một khoảng thời gian ngắn hoặc với một nhóm phát triển nhỏ, hầu hết mọi người đều hướng tới sử dụng Framework [Bootstrap](https://getbootstrap.com/) để giúp quá trình phát triển nhanh hơn. [Bootstrap](https://getbootstrap.com/) dễ sử dụng, sự phong phú của tài liệu và nhiều thành phần CSS được định nghĩa trước, đó là lý do tại sao Bootstrap lại phổ biến đến vậy.

Tuy nhiên, khi dự án trở nên lớn hơn và nhiều người dùng bắt đầu sử dụng, các mối lo ngại việc tải trang và hiệu suất của nhà phát triển sẽ phát sinh. Trong khi sử dụng Bootstrap, rất có thể tất cả các lớp tiện ích có sẵn sẽ được sử dụng dẫn đến một số lượng đáng kể CSS tăng lên cũng như các thành phần không được sử dụng. Có một giải pháp đưa ra đó là sử dụng Framework [Tailwind](https://tailwindcss.com/) CSS.

![](https://images.viblo.asia/62ce7f43-e7bb-4de8-870a-eb5b71584997.gif)

Tailwind là Framework CSS để phát triển UI nhanh chóng. Khi đề cập đến các Framework CSS, điều đầu tiên bạn nghĩ đến là Bootstrap, Material Design hoặc Bulma. Tuy nhiên, mặc dù Tailwind được coi là một Framework CSS, nó không phù hợp với triết lý tương tự như các Framework CSS khác. Tailwind chủ yếu là một khung công cụ tiện ích hay đúng hơn là một gói tiện ích. Tailwind không cung cấp chủ đề mặc định hoặc bất kỳ thành phần UI nào được định nghĩa trước.


Tailwind cung cấp các công cụ để phát triển nhanh chóng, đồng thời cho phép nhà phát triển maintain. Mặc dù không có giới hạn đối với trí tưởng tượng với Tailwind, thiết kế được cấu trúc theo cách để nhà phát triển có thể tạo một quy tắc tự áp đặt để tránh tăng size của CSS hoặc các thuộc tính lặp đi lặp lại.

Có ba cách tiếp cận chính khi thiết kế CSS và UI được đề cập. Mỗi người trong số họ đều có ưu và nhược điểm được hiển thị dưới đây:


![](https://images.viblo.asia/fe86fbfd-ce0a-4dc2-9eaf-5ea0e3ab248b.png)


## Utility classes

Khi tính đến mục tiêu chính của Tailwind không phải là cung cấp cho người dùng các thành phần được định nghĩa trước mà là các công cụ để phát triển thành phần nhanh chóng, rõ ràng lý do tại sao chúng ta sẽ không tìm thấy lớp `.btn` như trong Bootstrap. Thay vào đó, chúng ta sẽ tìm thấy các utility classes ( lớp tiện ích ). Tất cả các lớp tiện ích được định nghĩa trước có thể được tìm thấy trong [Offical Document](https://tailwindcss.com/) và trong **tệp Javascript cấu hình ** `tailwind.config.js` trong **thư mục gốc** của dự án sau khi cài đặt. Mỗi lớp có sẵn có thể được cấu hình cho các mục đích riêng lẻ hoặc cho các mục đích của một dự án lớn hơn. Đây là một ví dụ về style một button bằng cách sử dụng **Tailwind**:


```
<!DOCTYPE html>
<html>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body>
    <div class="flex h-screen justify-center items-center">
      <button type="button" class="bg-green-500 p-3 border-2 outline-none border-black rounded">
        Adam
      </button>
    </div>
  </body>
</html>
```

Đây là sử dụng Bootstrap:

```
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  </head>
  <body>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
      <button type="button" class="btn btn-primary">Adam</button>
    </div>
  </body>
</html>
```

Đây là kết quả:

![](https://images.viblo.asia/ff30127b-08cc-44ad-a959-2a44cd3c29fd.png)


Sử dụng Bootstrap một style cho button được định nghĩa trước là điều chúng ta đạt được. Để custom lại button này, chúng ta cần phải **viết thêm** **CSS để custom**. Trong khi sử dụng các lớp tiện ích, có thể đạt được bất kỳ giao diện nào của button mà **không cần viết bất kỳ CSS để custom**.

Điều này rất quan trọng vì những lý do dưới đây:

- Sẽ không có 10 màu khác nhau trông giống nhau.
- Ứng dụng sẽ có giao diện thống nhất.
- Khả năng tạo thiết kế giao diện người dùng cá nhân, nhận dạng, xây dựng thương hiệu mà không cần viết một loạt CSS tùy chỉnh ( chúng ta không phải là chuyên gia CSS).
- Tốc độ.

## Utility first
Trong ví dụ trên, một số lượng lớn các lớp được thêm vào để đạt được giao diện mong muốn. Phương pháp này đạt được mục tiêu chính của Tailwind: Phát triển giao diện người dùng nhanh. Điều này có nghĩa là làm cho các thành phần UI trông như dự định mà không cần thêm bất kỳ Custom CSS nào. Tất nhiên, đôi khi không thể tránh khỏi việc viết CSS, nhưng với cách tiếp cận này, nó được giảm đến mức tối thiểu. Nhìn vào ví dụ style button được đề cập ở trên:

```
<button type="button" class="bg-green-500 p-3 border-2 outline-none border-black rounded">
  Adam
</button>
```

Ngay lập tức chúng ta có thể nhận ra là **số lượng các** **class** cần thiết để tạo nút này. Đôi khi nó trông khó đọc và có vẻ như lộn xộn. Đây là một vấn đề khi được tính đến các tình huống thực tế trong đó có thể có nhiều nút hoặc các thành phần lặp lại khác trên cùng một trang.

## Extracting components

Extracting components là một quá trình trích xuất các **class tiện ích** thành các **class mới** , được xác định rõ ràng và có thể đọc được. Hai điều có ý nghĩa cho quá trình này:
- Vấn đề cồng kềnh HTML với các class tiện ích.
- CSS có thể tái sử dụng được.

Làm thế nào để chúng ta trích xuất các class tiện ích? Tailwind cung cấp cho chúng ta một chức năng rất hữu ích cho việc này: `@apply`. Trong ví dụ dưới đây, chúng ta có CSS ​​cho cùng một nút như trên nhưng với các class được trích xuất:
```
<button type="button" class="btn-wizard">Adam</button>

<style>
  .btn-wizard {
    @apply bg-green-500 p-3 border-2 outline-none border-black rounded;
  }
</style>
```

Kết quả như sau:

![](https://images.viblo.asia/674adf5e-0f88-40cf-8948-f821b1571eab.png)


Như bạn có thể thấy kết quả giống như trước đây, nhưng HTML sạch hơn và dễ đọc hơn. Class` .btn-wizard` hiện có thể được sử dụng nhiều lần trên trang web.

## Responsive
Mỗi lớp tiện ích Tailwind có hành vi responsive của nó. Điều này cho phép dễ dàng tạo ra các thành phần responsive mà không cần viết CSS bổ sung. Tailwind cung cấp một phương thức đơn giản để đưa các lớp tiện ích đã có vào một bối cảnh resposive. Sử dụng tiền tố `{screen}:{class}`. Chúng ta xem ví dụ trên của button và muốn thay đổi màu của nó tùy thuộc vào kích thước màn hình (màn hình, máy tính xách tay hoặc màn hình di động), chúng ta phải thêm vào như sau:
```
<button type="button" class="bg-green-500 sm:bg-red-500 p-3 border-2 outline-none border-black rounded">
  Dagi
</button>
```

Khả năng responsive của Tailwind là trang sẽ được tạo cho màn hình di động trước tiên. Thêm `sm: bg-red-500` cho biết nền của phần tử thay đổi thành màu đỏ nếu kích thước của màn hình lớn hơn giá trị được xác định trước (có thể định cấu hình). Nếu kích thước của màn hình nhỏ hơn kích thước mà `sm:` đại diện cho màu nền trở về mặc định, trong trường hợp này là màu xanh lá cây.

Có một vài tùy chọn kích thước màn hình được xác định trước trong Tailwind:

![](https://images.viblo.asia/96d49685-91d2-4ffc-a561-f40e4c718ecc.png)



## Flexbox
Khi so sánh khả năng resposive của Tailwind và Bootstrap, có một tiện ích thiếu ở Tailwind. Đó là chức năng `Grid` mà chúng ta đã quen với Bootstrap. Tailwind không đi kèm với các **class grid** được xác định trước nhưng cung cấp các công cụ để đạt được điều tương tự bằng cách sử dụng [**Flexbox**](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).  Ví dụ về grid sử dụng kết hợp Flexbox và Tailwind:
```
<!DOCTYPE html>
<html>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body>
    <div class="flex h-64">
      <div class="w-1/2 bg-grey-500"></div>
      <div class="w-1/2 bg-pink-500"></div>
    </div>
    <div class="h-16"></div>
    <div class="flex h-64">
      <div class="w-1/3 bg-grey-500"></div>
      <div class="w-1/3 bg-pink-500"></div>
      <div class="w-1/3 bg-grey-500"></div>
    </div>
  </body>
</html>
```

Kết quả như sau:

![](https://images.viblo.asia/64f0bfc0-1420-47d2-bd5c-7d62e9d3d9be.png)


Các div ở trên là hoàn toàn responsive. Có thể tạo vô số cột trong khi lưới Bootstraps bị giới hạn ở mức 12. 

Các yếu tố bên trong div có hiển thị: flex; theo trục x hoặc y cho hướng (x là mặc định). Điều này có nghĩa là hướng của các phần tử bên trong `div `có thể được thay đổi bằng cách thêm một lớp `flex-col` đơn giản. Điều này thay đổi ví dụ trên để trông như thế này:

```
<!DOCTYPE html>
<html>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body>
    <div class="flex h-64">
      <div class="w-1/2 bg-grey-500"></div>
      <div class="w-1/2 bg-pink-500"></div>
    </div>
    <div class="h-16"></div>
    <div class="flex flex-col">
      <div class="p-6 bg-grey-500"></div>
      <div class="p-6 bg-pink-500"></div>
      <div class="p-6 bg-grey-500"></div>
    </div>
  </body>
</html>
```

Kết quả như sau:

![](https://images.viblo.asia/98dcec9c-4d46-4cac-a8be-825032eaaf1a.png)


## Configurability

Một trong những điểm mạnh lớn nhất của Tailwind là khả năng cấu hình của nó. Ở trung tâm của mọi dự án Tailwind là tệp JavaScript tailwind.config.js nằm trong thư mục gốc của dự án (theo mặc định). Nó chứa tất cả cấu hình các lớp tiện ích và màu sắc. **Tập tin này không tồn tại trừ khi người dùng chọn tạo nó.**  Nếu không có tệp cấu hình, các lớp tiện ích giống như được đề cập trong tài liệu chính thức.

Mặc định, Tailwind cung cấp một cấu hình rất hữu ích với các giá trị được xác định trước để bắt đầu. Các giá trị này có thể cấu hình đầy đủ và không bắt buộc phải sử dụng. Document chính thức cũng như người tạo ra Tailwind, khuyến khích thay đổi các giá trị mặc định để phù hợp với nhu cầu thiết kế riêng.

**Lưu ý:** *Không giống như các Framework CSS khác, cấu hình Tailwind là không phụ thuộc. Điều này có nghĩa là bất kỳ lớp tiện ích nào cũng có thể bị xóa mà không ảnh hưởng đến phần còn lại của cấu hình.*


Tệp cấu hình được chia thành các phần tùy thuộc vào các tùy chọn CSS mà nó ảnh hưởng. Ví dụ dưới đây cho thấy một tập hợp các lớp tiện ích tìm thuộc tính chiều cao và cách sử dụng nó trong HTML:

```
 /*
  |-----------------------------------------------------------------------------
  | Height                                  https://tailwindcss.com/docs/height
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your height utility sizes. These can be
  | percentage based, pixels, rems, or any other units. By default
  | we provide a sensible rem based numeric scale plus some other
  | common use-cases. You can, of course, modify these values as
  | needed.
  |
  | Class name: .h-{size}
  | CSS property: height
  |
  */

  height: {
    'auto': 'auto',
    'px': '1px',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '24': '6rem',
    '32': '8rem',
    '48': '12rem',
    '64': '16rem',
    'full': '100%',
    'screen': '100vh',
  },
```

Trên cùng của cấu hình cho thuộc tính chiều cao có một ví dụ ngắn về cách sử dụng tiện ích. Để đặt chiều cao thành **4rem** trong HTML, chúng tôi sẽ thêm lớp **h-16** vào phần tử. Trong cấu hình chúng ta không có giá trị mong muốn, giả sử **1.75rem** chúng ta có thể thêm nó và đặt tên theo ý mình. Theo mẫu đã được đặt, sẽ rất hợp lý khi gọi giá trị này là **7'**, nhưng bạn có thể sử dụng bất cứ thứ gì bạn muốn:

```
 /*
  |-----------------------------------------------------------------------------
  | Height                                  https://tailwindcss.com/docs/height
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your height utility sizes. These can be
  | percentage based, pixels, rems, or any other units. By default
  | we provide a sensible rem based numeric scale plus some other
  | common use-cases. You can, of course, modify these values as
  | needed.
  |
  | Class name: .h-{size}
  | CSS property: height
  |
  */

  height: {
    'auto': 'auto',
    'px': '1px',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',

    '7': '1.75rem', //<------This was added

    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '24': '6rem',
    '32': '8rem',
    '48': '12rem',
    '64': '16rem',
    'full': '100%',
    'screen': '100vh',
  },
```

## Kết luận

Tailwind là một Framework đơn giản, được thực hiện chuyên nghiệp, tài liệu tốt và đáng để bạn thử. Nó chắc chắn làm cho công việc của chúng ta nhanh hơn, làm cho giao diện người dùng của tôi đồng đều hơn và giảm lượng CSS chúng ta phải viết trong quá trình sử dụng nó. Ngoài ra, người tạo ra Tailwind là một người có kinh nghiệm trong ngành và đang tiếp tục cải tiến Tailwind.

Tài liệu tham khảo:
- [https://tailwindcss.com/docs/](https://tailwindcss.com/docs/)
- [https://dev.to/wizardhealth/tailwind-css-29p3](https://dev.to/wizardhealth/tailwind-css-29p3)