Chào mọi người, bài này mình xin chia sẻ  với các bạn cách để **export PDF** từ **html, css và javasript**. Và đọc đến đây chắc nhiều bạn nghĩ là chỉ cần **ctrl P** là được thôi mà, *đúng không ạ?*. Vâng, đúng rồi đó ạ, nhưng điều mình muốn nói ở đây là chia sẻ kinh nghiệm từ việc code html, css, javascript cho đến khi **print** ra sẽ có nhiều vấn đề và nếu bạn chưa bao giờ làm thì cùng mình tìm hiểu nhé.

À, bạn nào có đang làm cho mình **personal blog** áp dụng vào thì quá hay luôn, vì bạn có thể tạo một **CV** trên đó và khi xin việc thì chỉ cần **send** cho *HR* thôi, khi đi in ra thì cũng rất dể nữa, chỉ cần truy cập vào **domain** blog của mình **CTRL P** và *HÉT LỚN*:

> Cô ới, in cho con cái CV đi xin việc phát ạ :v

đi nộp CV thôi, **pass** PV ngay lập tức phải hông ạ :v:. Mình đùa thôi, chứ không cần phải hét lớn đâu ạ. Mình cũng đang có một blog mà chưa hoàn thiện nên mình xin chưa chia sẻ ở đây, mình sẽ chia sẻ với các bạn tham khảo ở một bài viết khác nhé. Thôi không *tào lao*
 nữa mình bắt đầu thôi.
 
 Sẽ có rất nhiều *format* khác nhau, sẽ có loại PDF có *content this, content that*, nên hy vọng sẽ **cover** được hết các *cases* mà các bạn cần nhé.
 
###  1. Create folder:
Mình sẽ tạo một folder tên là **pdf-demo**, và lần lượt tạo các file *index.html, styles.scss, script.js* như hình bên dưới.

![image.png](https://images.viblo.asia/12c58b02-1614-4b2e-8e09-020c0729abfb.png)

Tiếp theo mình sẽ code và giải thích thật chi tiết nhé!

### 2. Viết code cho file index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PDF demo</title>
    <link rel="stylesheet" href="styles.css" />
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>
    <script src="./script.js"></script>
  </head>
  <body>
    <div class="wrapper">
      <h1 class="wrapper__title">This is title</h1>
      <div id="question-box-id" class="question-wrapper"></div>
    </div>
  </body>
</html>
```

Ở đây mình đã *import* các files cần thiết vào rồi, và mình có sử dụng thằng **JQuery** này nữa nhé, bạn nào không thích dùng thì có thể dùng **Js thuần**.

### 3. Viết code cho file styles.scss
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 595px;
  margin: 0 auto;
}

.wrapper {
  &__title {
    text-align: center;
    margin-bottom: 30px;
  }
}

.question-box {
  padding: 20px;
  background: rgb(247, 247, 247);

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &__question {
    font-weight: 700;
    margin-bottom: 10px;
  }

  &__answers {
    display: flex;
  }

  &__answer {
    width: 30%;
  }
}
```

![image.png](https://images.viblo.asia/ec25b7d8-f77d-485f-afca-6b16a7c03393.png)

Rồi nó ra như vậy nè, chưa có gì hết cả, giờ mình viết js để *insert* content vào cho nó.

À bạn nào chưa biết làm ntn để mình *run* với localhost này á, thì mình dùng *extension* là **live server** nhé

![image.png](https://images.viblo.asia/5f4deac5-6fdb-427f-b590-b2f8b3fc1c7b.png)

### 3. Viết code cho file script.js
```javascript
$(document).ready(function () {
  window.onload = myApp;

  function myApp() {
    for (var i = 0; i < 10; i++) {
      $("#question-box-id").append(`
        <div class="question-box">
          <div class="question-box__question">Dear developer, our mission is to serve all the best programming news you’ll ever need. Ready?</div>
          <div class="question-box__answers">
            <div class="question-box__answer">abc</div>
            <div class="question-box__answer">abc</div>
            <div class="question-box__answer">abc</div>
            <div class="question-box__answer">abc</div>
          </div>
        </div>
    `);
    }
  }
});
```

Rồi **cú pháp Jquery thần thánh** đây rồi :v:

![image.png](https://images.viblo.asia/452b62ce-ba36-444b-bf20-c753b7e2c8a5.png)

Mình sử dụng **onload event** với mục đích là sẽ chạy hàm này khi mà mọi thứ đã được **loaded**. Để đảm bảo rằng khi **print** sẽ chính xác nhất. **Một lý do nữa tại sao dùng onload** là khi trong **PDF** có các **images** thì chúng ta phải đảm bảo rằng nó phải được tải xong rồi mới thực thi hàm **myApp**. Giờ mình sử dụng **onload** khi nào xong xuôi hết mình sẽ sử dụng thằng **onbeforeprint**, thằng này mục đích là khi *press* **CTRL P** chạy hàm **myApp** trước khi **print** thôi.

![image.png](https://images.viblo.asia/55e41af6-fd34-4ce8-be1e-e1957cfed1a5.png)

Tiếp theo là *insert* content vào cho đẹp nè :v: 

![image.png](https://images.viblo.asia/80de480e-978a-49a1-86ef-bbcc032db8f1.png)

Đẹp rồi, *Giờ mình in được chưa?*, được rồi nè in thử nhé.

![image.png](https://images.viblo.asia/20dc55ed-d4c6-4c6e-bcd2-407d435165e2.png)

Đây bạn có thế nhận ra rằng text hơi nhỏ, và *background* của mỗi câu hỏi thì đã bị mất đi, giờ mình mong muốn khi in ra định dạng là **A4** và không có margin vậy thì mình vào files **styles.scss** *setting* lại nhé.

![image.png](https://images.viblo.asia/5daa8f71-c70d-4960-8edc-2383b230a61e.png)

**-webkit-print-color-adjust: exact;** đảm bảo rằng khi in colors vẫn giữ chính xác

Tiếp theo, mình lại có một lỗi nữa là giữa các page với nhau thì text đang bị cắt đứt, vì lý do là nó đang phân trang mà không cần biết là nội dung trên đó có hiển thị như thế nào! Giờ mình chỉnh lại nhé.

![image.png](https://images.viblo.asia/9d84c795-916c-4e0b-812b-4e1bdd698252.png)

Giờ mình thêm thằng này vào, **page-break-inside: avoid;** thuộc tính này có mục đích là *tránh break page vào bên trong element*

> Avoid page-break inside the element (if possible) (https://www.w3schools.com/cssref/pr_print_pagebi.asp)

![image.png](https://images.viblo.asia/30140f6d-f9ae-4ae3-91f4-c24a9bb975e1.png)

Giờ đẹp hơn rồi, nhưng vẫn còn lỗi là ở page thứ 2 trở đi nó sát lề quá

![image.png](https://images.viblo.asia/c4d54825-6874-46a8-b80b-5230778de439.png)

Nên mình cần thêm css cho nó là khi **print** margin là 20px

![image.png](https://images.viblo.asia/9da58dab-a498-4176-aea4-13704cd16b1f.png)

Giờ thì đẹp rồi phải hông ạ

![image.png](https://images.viblo.asia/1582bebe-c27d-409d-9b78-24a1a843ad3c.png)

### 4. Tổng hết
Các bạn thấy đấy khi mới làm về PDF, khá rắc rối, mặc dù không khó lắm, nhưng có những thứ mình chưa hề biết nên cảm giác khó. Nên dù khó thế nào cũng đừng bỏ cuộc nhé vui vẻ thôi **cuộc sống mà**.
Bài viết đến đây cũng khá dài rồi, nên hôm này mình xin dừng lại, vẫn còn một *feature* nữa đó là đánh số trang (page number), dịp sau mình sẽ cố gắng viết về nó nhé. Cảm ơn mọi người!
[[Sourse code](https://github.com/nxv109/pdf-demo)]