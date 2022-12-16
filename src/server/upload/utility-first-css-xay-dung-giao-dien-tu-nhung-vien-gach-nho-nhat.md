### Mở đầu
Là một web developer chắc hẳn ai cũng đã từng phải làm việc với CSS. Tuy nhiên không phải ai cũng có thể viết CSS một cách tốt, dễ dàng maintain khi kích thước dự án tăng dần. Việc viết CSS với một cấu trúc không tốt sẽ là cơn ác mộng trong quá trình maintain sau này, đây là vấn đề thường gặp phải đối với những lập trình viên mới vào nghề 

### Những tồn tại của cách viết CSS truyền thống
#### Xung đột do Specificity
Specificity là trọng số mà trình duyệt sử dụng để quyết định CSS style nào được áp dụng cho element. Mọi người có thể tham khảo [tại đây](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#specificity_2) 

Đây chính là nguyên nhân khiến những developer thiếu kinh nghiệm về `CSS Specificity` gây ra conflict khi làm việc với CSS để rồi `!important` trở thành một "người anh hùng" ra tay giải quyết mọi vấn đề. Bạn tự hỏi: "Ơ sao chỗ này có class rồi mà sao không nhận style" và mạnh dạn thêm dòng code thần thánh `!important` và cười một cách sung sướng khi style đã được áp dụng đúng với ý mình :). Sau một thời gian khi lượng code ngày một lớn dần với việc nhiều thành viên cùng chung tay góp sức, những đoạn mã CSS của bạn sẽ trở thành một cơn ác mộng khi debug cũng như maintain, bạn nhận ra mình càng ngày càng dính vào vòng luẩn quẩn mà không biết làm sao để tháo gỡ.

Đối với những developer có nhiều kinh nghiệm hơn họ hiểu về `CSS Specificity` và biết áp dụng một số phương pháp để hạn chế việc conflict CSS bằng cách sử dụng các CSS methodologies như [BEM (Block__Element--Modifier](http://getbem.com/introduction/). BEM là một phương pháp tốt giúp tránh được những vấn đề trên bằng cách chia nhỏ trang thành từng thành phần và định nghĩa các class theo chuẩn của BEM và sử dụng chúng. Chúng giúp cho việc viết CSS mang tính cấu trúc hơn, thuận lợi hơn trong việc maintain. Tuy nhiên cái gì cũng có 2 mặt của nó, BEM vẫn có những [vấn đề](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/) của riêng nó. Một trong những khó khăn khi làm việc với BEM là `đặt tên cho con`, việc đặt tên tưởng chừng rất đơn giản nhưng nó lại là một bài toán thế kỉ của ngành khoa học máy tính =)). Bạn sẽ phải mất kha khá thời gian để suy nghĩ, xem xét về ngữ nghĩa để có thể đặt được một cái tên tốt.
#### Kích thước CSS file
Kích thước CSS file đối với những trang web nhỏ thường không được quan tâm nhiều khi kích thước CSS file chưa đủ lớn để đáng quan tâm. Tuy nhiên việc tối ưu kích thước CSS file sẽ trở nên quan trọng hơn khi file CSS lớn dần. Đối với cách viết CSS truyền thống chúng ta thường xuyên phải tạo ra các class CSS, số lượng lượng CSS viết ra ngày một nhiều theo kích thước dự án dẫn tới file CSS càng ngày càng phình to. Việc reuse CSS làm sao cho hiệu quả cũng là một bài toán cần được quan tâm. 

### Utility-first CSS
#### Utility-first CSS là gì?
Utility-first (hay có tên gọi khác là Functional CSS hoặc Atomic CSS) là một CSS methodology cho phép chúng ta viết CSS mà không cần viết CSS. Nghe khá là hại não phải không? Thay vì viết CSS chúng ta sẽ sử dụng những class có sẵn trong thư viện Utility-first CSS đã được xây dựng. Một đặc điểm của các class này là chúng chỉ định nghĩa 1 thuộc tính vì vậy chúng còn được gọi là atomic (nguyên tử). Các atomic là những thành phần nhỏ khó thể phân tách nhỏ hơn và được sử dụng để cấu tạo nên một đối tượng lớn hơn. 

Ví dụ:
```html
<h4 class="chat-notification-title">ChitChat</h4>
<style>  
    .chat-notification-title {
        color: #1a202c;
        font-size: 1.25rem;
        line-height: 1.25;
    }
</style>
```

Viết dưới dạng Utility-first CSS sẽ như sau:
```html
<div class="text-xl font-medium text-black">ChitChat</div>
```

Trong ví dụ trên thay vì chúng ta viết CSS để style chúng ta sử dụng các class được cung cấp sẵn trong thư viện Utility-first CSS. Một thư viện Utility-first CSS cung cấp một danh sách các class đã được tạo dựng sẵn, chúng ta chỉ cần kết hợp các class để có thể tuỳ biến trang web của chúng ta theo ý muốn.

#### Ưu nhược điểm của Utility-first
Như đã nói ở trên một vấn đề luôn có 2 mặt Utility-first cũng vậy nó có những ưu và nhược điểm của riêng nó. Utility-first sinh ra nhằm giải quyết các vấn đề của cách viết CSS truyền thống tuy nhiên nó cũng sẽ có những mặt hạn chế của chính nó.

***Ưu điểm:***

- Hạn chế được các vấn đề liên quan đến Specificity do chúng ta chỉ sử dụng class và mỗi class chỉ mô tả 1 tính năng duy nhất giúp hạn chế sự xung đột giữa các thuộc tính CSS ở mức thấp nhất.
- Giảm được sự bùng nổ về kích thước CSS file do chúng ta chỉ sử dụng các class đã được xây dựng sẵn dưới dạng atomic. Khi có giao diện mới được phát triển, chúng ta chỉ cần sắp xếp kết hợp các class đã có với nhau. Do được thiết kế dưới dạng atomic class nên khả năng reuse của các class là rất cao.
- Không phải suy nghĩ nhiều xem đặt tên gì cho class do chúng thường được đặt tên giống với thuộc tính mà chúng mô tả.
- Giúp prototype nhanh chóng không cần chuyển đổi giữa viết HTML file và CSS file.

***Nhược điểm:***

- Mất thời gian để làm quen do cần nhớ tên các class khá nhiều.
- HTML sẽ trở nên dài dòng do có nhiều class
- Nếu viết tràn lan phần tử nào cũng style bằng các atomic class thì sẽ rất khó khi cần tìm và thay đổi => nên kết hợp phát triển giao diện theo hướng component để hạn chế nơi cần sửa khi có thay đổi xảy ra.
#### Utility-first vs Inline style
Như chúng ta đã biết việc viết inline style là một bad practice. Cơ bản về hình thức Utility-first khá giống với Inline style tuy nhiên Utility-first có những ưu điểm vượt trội:

- Utility-first có thể sử dụng các tools Sass, Less, PostCSS, Autoprefixer…  thứ mà không hỗ trợ Inline style
- Các class của Utility-first thường được đặt tên khá ngắn gọn nên sẽ thuận tiện hơn Inline style do phải code ít hơn
- Các class của Utility-first có thể làm những thứ mà Inline style không thể làm như các thuộc tính hover, media query, ...

#### Tailwindcss
Tailwindcss là một CSS framework phổ biến được thiết kế theo phương pháp Utility-first. Tailwindcss cung cấp sẵn các atomic classes cho phép phát triển giao diện một cách nhanh chóng cùng với việc cung cấp khả năng customize các atomic classes một cách linh hoạt, hỗ trợ responsive, ... Tailwindcss sẽ là một framework đáng sử dụng khi bạn muốn sử dụng Utility-first mà không cần phải tự xây dựng một bộ Utility-first cho riêng mình. Các bạn có thể bắt đầu với Tailwindcss theo tài liệu chính thống từ https://tailwindcss.com/docs, tin mình đi nó sẽ không quá khó để tiếp cận đâu :)

Dưới đây là ví dụ về cách viết giao diện truyền thống và việc sử dụng Tailwindcss:

***Kiểu truyền thống***
```html
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

***Tailwindcss***

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
```

### Tài liệu tham khảo
- https://css-tricks.com/growing-popularity-atomic-css/
- https://johnpolacek.github.io/the-case-for-atomic-css/
- https://johnpolacek.medium.com/by-the-numbers-a-year-and-half-with-atomic-css-39d75b1263b4
- https://tailwindcss.com/docs/utility-first