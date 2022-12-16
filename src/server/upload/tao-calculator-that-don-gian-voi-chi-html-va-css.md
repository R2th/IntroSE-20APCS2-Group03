**Thật ra thì mình có hơi chém gió 1 chút ở phần tiêu đề của bài viết, có 1 "chút chút" rất rất ít code Javascript và cũng khá là đơn giản nên mình viết luôn vào code HTML cho gọn, nên thôi coi như là chỉ có code HTML thôi nhé các bạn** :D

Khi hoàn thiện, nó sẽ trông giống như hình dưới (chính là nó vì mình chụp màn hình lại mà :smile:)

![](https://images.viblo.asia/ff96f0a8-169c-48b7-b737-a267ac571958.png)

**Hãy bắt đầu ngay thôi nào!**

Đầu tiên, ta wrap tất cả các code HTML bên trong với 1 thẻ `form`:

```html
<form name="calculator">
  ...
</form>
```

Attribute trong form trên có thuộc tính `name`, value trong `name` sẽ đóng vai trò như giá trị tham chiếu (biến `this`) của block HTML này.

Trong form ta cần có 1 table để chia hàng và cột chứa kết quả, các số, các phép tính (`+, -, x, /, =`) và reset.

Ở hàng đầu tiên của table sẽ là ô hiển thị các số khi bấm chọn cũng như là kết quả của các phép tính khi thực hiện tính toán. Code HTML phần này sẽ như sau:

```html
<table>
    <tr>
      <td colspan="4">
        <input type="text" name="display" disabled>
      </td>
    </tr>
  </table>
```

Hàng này sẽ chỉ hiển thị kết quả chứ không được edit nên sẽ có thuộc tính `disabled` trong thẻ input.

Hàng thứ 2 sẽ bao gồm phím bấm các số 1, 2, 3 và phép cộng, đương nhiên là vẫn sẽ dùng các thẻ `tr`, `td` và vẫn nằm trong table trên.

```html
<tr>
  <td><input type="button" name="one" value="1" onclick="calculator.display.value += 1"></td>
  <td><input type="button" name="two" value="2" onclick="calculator.display.value += 2"></td>
  <td><input type="button" name="three" value="3" onclick="calculator.display.value += 3"></td>
  <td><input type="button" class="operator" name="plus" value="+" onclick="calculator.display.value += '+'"></td>
</tr>
```

Mỗi thẻ `td` sẽ chứa 1 thẻ `input`, trong mỗi thẻ `input` ta sẽ xử lý việc gửi data lên ô tính toán thông qua thuộc tính `name` của `form` và `input`, tương ứng với mỗi ô sẽ truyền lên 1 giá trị nhất định thông qua sự kiện `onclick`.

Tương tự cho các hàng và cột còn lại, code HTML cũng không khác nhiều, chỉ ngoại trừ value của mỗi ô khác nhau. Toàn bộ code HTML như sau: 

```html
<form name="calculator">
  <table>
    <tr>
      <td colspan="4">
        <input type="text" name="display" disabled>
      </td>
    </tr>
    <tr>
      <td><input type="button" name="one" value="1" onclick="calculator.display.value += 1"></td>
      <td><input type="button" name="two" value="2" onclick="calculator.display.value += 2"></td>
      <td><input type="button" name="three" value="3" onclick="calculator.display.value += 3"></td>
      <td><input type="button" class="operator" name="plus" value="+" onclick="calculator.display.value += '+'"></td>
    </tr>
    <tr>
      <td><input type="button" name="four" value="4" onclick="calculator.display.value += 4"></td>
      <td><input type="button" name="five" value="5" onclick="calculator.display.value += 5"></td>
      <td><input type="button" name="six" value="6" onclick="calculator.display.value += 6"></td>
      <td><input type="button" class="operator" name="minus" value="-" onclick="calculator.display.value += '-'"></td>
    </tr>
    <tr>
      <td><input type="button" name="seven" value="7" onclick="calculator.display.value += 7"></td>
      <td><input type="button" name="eight" value="8" onclick="calculator.display.value += 8"></td>
      <td><input type="button" name="nine" value="9" onclick="calculator.display.value += 9"></td>
      <td><input type="button" class="operator" name="times" value="x" onclick="calculator.display.value += '*'"></td>
    </tr>
    <tr>
      <td><input type="button" class="operator" id="clear" name="clear" value="C" onclick="calculator.display.value = ''"></td>
      <td><input type="button" class="operator" name="zero" value="0" onclick="calculator.display.value += '0'"></td>
      <td><input type="button" class="operator" name="doit" value="=" onclick="calculator.display.value = eval(calculator.display.value)"></td>
      <td><input type="button" class="operator" name="div" value="/" onclick="calculator.display.value += '/'"></td>
    </tr>
  </table>
</form>
```

Tuy nhiên, nếu chỉ có HTML không thôi thì UX/UI thật "đáng thất vọng", các bạn có thể xem qua cô gái `HTML` khi chưa được trang điểm bằng `CSS` thì sẽ xấu xí như thế nào như hình dưới đây.

![](https://images.viblo.asia/fcc37099-b2b9-4936-95bd-7ac9fdc1dd86.png)

Cho nên, hãy làm cho chiếc máy tính của chúng ta thân thiện với người dùng hơn bằng 1 đoạn CSS ngắn dưới đây nhé.

```css
form {
  background: #ccc;
  margin: 0 auto;
  width: 300px;
  padding: 20px;
  border-radius: 5px;
}

form * {
  box-sizing: border-box;
}

form table {
  width: 100%;
  border-collapse: collapse;
}

form table tr, form table td {
  border: 1px solid #eee;
}

form table tr:first-child input {
  height: 50px;
  padding: 0 10px;
  font-weight: 700;
}

form table tr:not(:first-child) td {
  height: 70px;
}

form table tr:not(:first-child) td input {
  height: 100%;
}

form table input {
  width: 100%;
  display: block;
  border: 0;
  font-size: 16px;
}

form table input:focus {
  outline: none;
}

form table input:hover {
  background: #eee;
  transition: all .2s ease-in-out;
}

form table input.operator {
  font-weight: 700;
  color: #fff;
  background: #ffcc00;
}
```

Các bạn có thể xem qua demo của mình trên CodePen ở [đây](https://codepen.io/tranquocy/pen/xoVPBj).

{@embed: https://codepen.io/tranquocy/pen/xoVPBj}

Cảm ơn các bạn đã theo dõi. Xin chào và hẹn gặp lại ở những bài viết tiếp theo.

Tham khảo: [codeburst.io](https://codeburst.io/making-a-calculator-with-basic-html-css-and-javascript-part-1-1e4288f0bea1)