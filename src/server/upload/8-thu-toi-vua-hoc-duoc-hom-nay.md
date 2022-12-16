# Array.sort() có kết quả khác nhau giữa các trình duyệt
  Khi bạn cần `sort` một `array`, bạn nghĩ ngay đến việc sẽ sử dụng *callback* như thế này **sort((x, y) => x < y)**, tuy nhiên đây là kết quả từ *Chrome* và *Firefox*
![](https://images.viblo.asia/ff573a97-6f6d-4069-a373-cb6e77f303a4.png)

  Hàm `callback` chúng ta truyền vào phải `return` một trong ba giá trị 1, 0, -1, vì chúng ta đang return một giá trị `boolean`, nên sẽ tùy vào trình duyệt quyết định.
# Sử dụng JSON.stringify với tham số
**JSON.stringify** cho phép ta truyền thêm một tham số thú 2 nữa, nó giống như một *whitelist* khi hàm này được thực thi (`parse`) mà chỉ có các giá trị trong *whitelist* mới được *parse* 
![](https://res.cloudinary.com/practicaldev/image/fetch/s--1m2M-1nL--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2mot0de4qunp1jz9drti.png)
Ngoài truyền vào một mảng, ta có thẻ truyền một *function* để thực hiện các chức năng nâng cao hơn như *validate*, *replace*, *parse* các tham số,...
![](https://res.cloudinary.com/practicaldev/image/fetch/s--LKLRzNjN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/87gpt399syw126i3lnw5.png)
# Array.filter() không làm việc với Promise
Đôi khi chúng ta cần thực thiện mộ số xử lý ở các *async* trên các phần tử trong mảng, lặp qua các phần tử để xử lý data rồi filter các phần tử mong muốn.
Ví dụ: Kiểm tra xem *user* có quyền thực hiện một chức năng nào đó hay không, chúng ta cần *loop* qua tất cả các phần tử
![](https://images.viblo.asia/cacdc2c2-56f7-41a1-bdc9-0804541bf7a8.png)

Code trên sẽ chạy hoàn hảo, tuy nhiên trong hoàn cảnh khác, nếu là một hàm *async* thì sẽ như thế nào ?
![](https://images.viblo.asia/c98e403e-cfc0-40ac-8fdc-a9090d356496.png)
Sai rồi, nó sẽ không chạy đúng, sửa lại chúng ta phải dùng map trước khi dùng dến `filter`
# Nullish và toán tử OR
Ai là dev cũng biết tới OR
```js
const foo = baz || "fallback"
```
Nếu `bar = 0`, thì `foo = "fallback"`, nhưng bạn lại không muốn như thế, cho dù `bar = 0` thì `foo = bar` (`0` vẫn là giá trị hợp lệ) vậy hãy thử cái này
![](https://res.cloudinary.com/practicaldev/image/fetch/s--QoLPcQ4s--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ai8rwv56h5ymun1vpi6h.png)
# Console.table()
`console.log(...)` một object khó nhìn đối với bạn ?

![](https://images.viblo.asia/0fe3d297-8c1f-4852-ae9b-d7540a96252f.png)

Thử ngay với `console.table(...)` đi

![](https://res.cloudinary.com/practicaldev/image/fetch/s--WI13r1Iz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bcbc43zrcmt1fpvjpsp7.png)
# The Promise constructor anti-pattern

Nếu bạn có một xử lý `async function` thì bản chất nó đã `return` một `promise` rồi, việc bạn `return new Promise` như bên dưới chẳng có tác dụng gì cả.
![](https://res.cloudinary.com/practicaldev/image/fetch/s--C-1fI-Bz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/98tp5ldyr4065np0skt5.png)
Chỉ cần `return` về hàm `async` đó là đủ (*fetchThing* là *async function*)
![](https://res.cloudinary.com/practicaldev/image/fetch/s--pHlwjR8x--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jpyxc4hrmvepkthp1wyb.png)
# Catch await error
Đối với một *Promist* chúng ta dùng *then/catch*, còn với *async/await* thì dùng *try/catch* như thế này;
![](https://res.cloudinary.com/practicaldev/image/fetch/s--xRTdGBFG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w77xvropho5fnzjr3lzq.png)
Nhưng thần kỳ là chúng ta có thể dùng *.catch* đối với *await* được  (Thực tế thì *await* cũng chỉ là một cách viết từ *Promise* mà ra) 
![](https://res.cloudinary.com/practicaldev/image/fetch/s--9_RtvCXJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k4sca69yg3cn1t2w3q1e.png)
# Optional chaining với function
`Optional chaining` trên `function `dùng cũng giống như đối với `object` thôi các bạn ạ 
![](https://res.cloudinary.com/practicaldev/image/fetch/s--GS_uEqqr--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/57rtruthopibgpvl5pcz.png)
Hay ví dụ một tình huống trong *React* như thế này
```js
  ...
  <button onClick={onClick && (() => onClick(params))}>
  
  // With Optional chaning
  ...
  <button onClick={() => props?.onClick(params)}>
```