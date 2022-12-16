Chào mọi người, vào một ngày đẹp trời mình được đứa "em" nhờ giải thích vài bài code "thiếu nhi" mình chợt nhận ra JavaScript-ngôn ngữ yêu thích của mình thật đẹp nhưng cũng thật "khó tính" đến nhường nào. Nào cùng mình tìm hiểu qua một số ví dụ cụ thể thôi!
## 1. **Closure**
```js
function a(x) {
  x++;
  return function () {
    console.log(++x);
  };
}

a(1)();
a(1)();
a(1)();

let x = a(1);
x();
x();
x();

```
Đoạn code này nhắc chúng ta về `Closure` trong JS. `Closure` cho phép chúng ta tạo một `stateful function` và hàm như vậy có thể truy cập vào biến bên ngoài phạm vi của nó. Tóm lại, `Closure` có thể có quyền truy cập vào biến toàn cục (phạm vi), phạm vi hàm cha và phạm vi riêng của nó.
Chúng ta có kết quả là `3, 3, 3` , `3, 4, 5`bởi vì đầu tiên chúng ta chỉ đơn giản gọi hàm a(). Nó hoạt động giống như một chức năng bình thường và chúng ta không thấy  `stateful` ở đây. Trong trường hợp sau, chúng ta khai báo một biến x và nó lưu giá trị của hàm a (1), đó là lý do tại sao chúng ta nhận được `3, 4, 5` thay vì `3, 3, 3`.

## 2.  **var, let, const**

```js
var tip = 100;

(function () {
  console.log("I have $" + husband());

  function wife() {
    return tip * 2;
  }

  function husband() {
    return wife() / 2;
  }

  var tip = 10;
})();
```
Kết quả: `I have $NaN`


Chúng ta có thể nghĩ rằng `tip = 100` vì nó là một biến toàn cục khi khai báo với từ khóa `var`. Tuy nhiên, giá trị thực sự của nó là `undefined` vì chúng ta cũng có var tip = 10 bên trong hàm hàm.

Điểm khác biệt giữa `var` với `let`, `const` đó chính là tính `hoisting`. Khi dùng từ khoá `var` để khai báo 1 biến thì biến đó sẽ được kéo lên trên cùng trong phạm vi của nó. Do vậy biến `tip` lúc này sẽ có giá trị là `undefined`. Khi thực hiện các phép toán với 1 biến không phải là `number` đương nhiên ta sẽ nhận được giá trị là `NaN` rồi.

Nếu không có dòng `var tip = 10` thì kết quả là gì nhỉ? Chắc chắn ta sẽ có `I have $100`. Thế còn  dùng `const tip = 10` hoặc `let tip = 10` thì sao? Khi đó ta sẽ nhận được lỗi to đùng `ReferenceError: Cannot access 'tip' before initialization` :rofl:

## 3. **Object**
```js
let x = {};
let y = {};
let z = x;

console.log(x == y);
console.log(x === y);
console.log(x == z);
console.log(x === z);
```
Kết quả: `false false true true`

Ta thấy `x` và `y` đều có giá trị là các object rỗng, vậy tại sao `x` lại không bẵng `y`? Nguyên nhân của việc này là array hay object trong JavaScript là kiểu dữ liệu tham chiếu. Khi bạn khai báo một biến là `object` thì biến đó không lưu giá trị của `object` đó là sẽ lưu lại địa chỉ ô nhớ chứa thông tin về `object` mà bạn đã khởi tạo kia. Vì vậy `let x = {}` được hiểu nôn na là bạn khởi tạo một object có giá trị là `{}`, `object` này giả dụ được lưu ở ô nhớ *001. Do đó `x` sẽ có giá trị là *001. Tương tự đối với `let y = {}`. Vì vậy `x==y` hay `x===y` sẽ ra kết quả là `false`.

Còn với `let z = x` thì sao? Dòng lệnh này sẽ gán giá trị của biến `x` (lúc này là *001) cho biến `z`. Do đó `x==z` hay `x===z` sẽ ra kết quả là `true`.

## Lời kết: 
JavaScript là một ngôn ngữ rất dễ học vì cú pháp khá linh hoạt không đòi hỏi tính chặt chẽ cao. Đi cùng với điều đó cũng khiến những người mới học rất dễ gặp một số lỗi logic nếu như không nắm vững kiến thức cơ bản. Hy vọng qua 3 ví dụ đơn giản trên các bạn có thêm một số kiến thức giúp bản thân không gặp những con bug "xinh xắn" mà không hiểu sao chúng lại xuất hiện. Hẹn gặp lại các bạn trong các bài viết sau. Nếu có góp ý xin vui lòng để lại dưới bình luận để mình có thể sửa chữa trong các bài viết sau. Cảm ơn mọi người vì đã đọc!