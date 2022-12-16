- Smooth scrolling (sự thay đổi vị trí từ liên kết ban đầu đến vị trí cuối)  là một animation rất tốt cho trang web, mang lại cảm giác trải nghiệm mượt mà bóng bẩy.

- Đây là code thực hiện việc cuộn trang một cách trơn tru đến một điểm trên cùng một page. Nó tích hợp một số logic để xác định các jump link, và không nhắm vào các link khác.

- xét ví dụ dưới đây . Khi ta click vào thẻ  **Go to Section2** nó sẽ chuyển để **section 2** . khi click vào  **Go to Section 3** sẽ chuyển đến **section 3** . CLick vào **top** sẽ quay về đầu trang 

### Tạo HTML

- Tạo list ul có 2 nút click section 2 và section 3. sao cho attribute có href = # +id của thẻ cần scroll đến
- Tạo id khi scroll đến

```
<div id="page-wrap">

  <h1 id="top">Smooth Page Scrolling</h1>

  <ul>
    <li><a href="#two">Go to Section 2</a></li>
    <li><a href="#three">Go to Section 3</a></li>
  </ul>

  <h2 id="one">Section 1</h2>
  <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
    Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus
    lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor,
    facilisis luctus, metus</p>

  <h2 id="two">Section 2</h2>
  <p>quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum
    sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus,
    tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>

  <h2 id="three">Section 3</h2>
  <p>quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum
    sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus,
    tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
  
<p><a href="#top">Top</a></p>
</div>
```

### Tạo Jquery

- Đầu tiên ta xác định thẻ khi ta click vào nó sẽ di chuyển đến 1 vị trí nào trong page ta có. Chẳng hạn như khi click  **Go to Section 2** nó sẽ di chuyển đến **h2** có id là **"two"**


```
var data_id = $(this).attr('href'); // trả ra id mà bạn click. ví dụ Go to Section 2 với href="#two" thì với đoạn này ta sẽ nhận dc #two
```

- Bước tiếp theo là di chuyển đến điểm bạn cần nó scroll. với khoảng thời gian nhất định như ví dụ dưới là 0.5s

```
$('html, body').animate({
    scrollTop: $(data_id).offset().top
  }, '500');
```

Xem demo ở [codepen](https://codepen.io/ngc-yn/pen/YzPpeGx) bên dưới đây :
{@codepen:https://codepen.io/ngc-yn/pen/YzPpeGx}

### Kết Luận

- Qua bài này mình đã hướng dẫn các bạn Smooth scrolling dễ dàng và hiệu quả . Các bạn thấy có nhiều cách hay hơn có thể chia sẻ qua cmt nhé. Cảm ơn
- Link tham khảo :
  + https://css-tricks.com/snippets/jquery/smooth-scrolling/