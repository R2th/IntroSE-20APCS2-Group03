## 1. Yêu cầu

Yêu cầu bài toán là tạo ra hiệu ứng chuyển chữ từ các chữ cho trước, cứ sau 3 giây lại chuyển sang chữ tiếp theo, thời gian chuyển chữ là 0.5 giây, khi đến chữ cuối cùng thì vòng lại chữ đầu tiên.  Đây là một trong những[ bài tập vanilla Javascript](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox) ở mức cơ bản giúp các bạn làm quen, chủ yếu giải thích về Javascript nên phần giao diện sẽ không phân tích nhiều. Hi vọng với bài tập này các bạn sẽ thấy thích thú khi học Javascript.

-----


![](https://images.viblo.asia/970be296-f571-4fbe-b309-92363786f8df.gif)



-----



## 2. Giao diện HTML - CSS
```html:HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vanilla JS Project: Sliding Texts</title>
  <!-- bootstrap css 4.5.0 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" />
  <style>
    .wrapper { display: flex; justify-content: center; }
    .control { display: inline-block; transition: all 0.3s; height: 75px; overflow: hidden; margin-left: 10px; }
    #slider div { height: 75px; line-height: 60px;padding: 0 5px; }
    .animated { transition: all 0.5s; margin-top: -75px; }
  </style>
</head>
<body>
  <div class="wrapper display-4 text-center mt-5">
    Code đêm có thể khiến bạn bị
    <div class="control">
      <div id="slider" class="text-white bg-danger">
        <div>trầm cảm</div>
        <div>căng thẳng</div>
        <div>gay</div>
      </div>
    </div>
  </div>
  <script> // code Javascript </script>
</body>
</html>
```

## 3. Hướng giải quyết chính
* Các hành động này cứ thực hiện liên tục sau 3 giây thì bắt đầu chuyển chữ, thời gian chuyển chữ trong 0.5 giây, sau khi di chuyển xong thì lấy chữ đó move về cuối hàng để tạo ra một vòng tròn mãi mãi.
* Hành động 1 ở đây là đợi 3 giây thì thêm class **animated**, lưu ý là class này mình để transition = 0.5 giây như đề yêu cầu
* Hành động 2 là sau 0.5 giây hiệu ứng thì ta lấy phần tử thứ nhất đó chuyển xuống đằng sau phần tử thứ ba, tiếp theo là xóa luôn class animated đã được thêm ở trên.

Nhằm giúp các bạn dễ hình dung ý tưởng giải quyết thì mình đã làm bức hình bên dưới cho các bạn

-----

![](https://images.viblo.asia/6491a6ad-579b-4948-81b6-81e894eebcf7.gif)


-----

## 4. Javascript
* Tạo biến để tìm các thẻ html mình cần, ở đây là khối **#slider**
* Dùng hàm `setInterval` để sau 3 giây gọi hàm slidingText
* Hàm slidingText làm 2 việc: thêm class animated và đợi 0.5 giây thì gọi hàm loopText
* Hàm loopText làm 2 việc: lấy phần tử đầu tiên bốc nó xuống cuối hàng và xóa class animated

```js:JS
const wrapElement = document.querySelector('#slider')

setInterval(slidingText, 3000)

function slidingText() {
  wrapElement.classList.add('animated')
  setTimeout(loopText, 500)
}

function loopText() {
  const firstElement = document.querySelector('#slider div')
  wrapElement.appendChild(firstElement)
  wrapElement.classList.remove('animated')
}
```

## 5. Kết quả
{@embed: https://jsfiddle.net/trungnt256/qefgdxb2/8/embed/result,html,css,js/dark}

## 6. Yêu cầu nâng cao

Bạn hãy thử làm lại bài này với hiệu ứng và thời gian khác nhau như cho chữ chạy từ dưới lên trên, trên xuống dưới, trái qua phải, phải qua trái hay hiệu ứng làm mờ fadeIn fadeOut. 

Ngoài ra bạn cũng có thể code lại xem có được không? biết đâu các bạn lại có suy nghĩ khác với mình thì sao?

-----


Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

* [Demo online](https://Vanilla-JS-Sliding-Texts.kentrung.repl.co)
* [Code online](https://replit.com/@kentrung/Vanilla-JS-Sliding-Texts)
* [Series vanilla javascript projects](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox)
* Liên hệ: trungnt256