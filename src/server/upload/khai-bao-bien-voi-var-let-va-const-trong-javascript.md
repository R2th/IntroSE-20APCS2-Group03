![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/10/var-let-const.png?w=1280&ssl=1)

Ba cách giúp bạn khai báo biến trong JavaScript là sử dụng từ khóa `var`, `let`, `const`.

Bài viết này mình sẽ tóm tắt lại sự khác nhau của ba cách khai báo này và cách sử dụng. 

Đồng thời cũng làm quen với các loại scoped như `local scoped`, `global scoped`, `block scoped`, khái niệm `Temporal Dead Zone`, và một số loại lỗi hay gặp khi làm việc với các từ khóa này như `SyntaxError`,  `ReferenceError`, `TypeError`

## var và let

### var

Thường thì sẽ so sánh `var` và `let` trước, vì cả hai đều dùng để khai báo một biến có thể thay đổi giá trị được.

Ví dụ:

```js
var a = 1;
let b = 2:
```

Khi khai báo với `var`, biến của bạn sẽ được `hoisting` trước khi gán giá trị, tức là biến này được định nghĩa ngay trước khi chương trình thực thi, trong giai đoạn `Memory Creation` trong ngữ cảnh thực thi. 

Nếu chưa rõ bạn có thể đọc bài ["Điều gì xảy ra khi chạy chương trình JS"](https://beautyoncode.com/dieu-gi-xay-ra-khi-chay-mot-chuong-trinh-javascript/) và bài [“Hoisting trong JavaScript”](https://beautyoncode.com/hoisting-trong-javascript/)

```js
1. console.log(a);
2. var a = 1;
3. console.log(a)
```

ở đây chương trình sẽ in ra giá trị `undefined` ở dòng số 1, và in ra số 1 ở dòng số 3

Bên cạnh đó, biến được khai báo với `var` sẽ nằm trong `global scoped`, chỉ khi khai báo với var trong **hàm** mới có scope là `function scoped` hay `local scoped`. 

Đây là lý do vì sao nếu bạn khai báo như trên có thể dùng `window.a` hay `this.a` (với this này là window) để truy cập vào a vì nó nằm ở `global scope`.

### let

Khi khai báo với let, biến của bạn và vẫn được hoisting, tuy nhiên biến này được lưu trong một khu vực gọi là Temporal Dead Zone và làm cho nó không truy cập được trước khi khai báo. 

Ví dụ:

```js
console.log(b);
let b = 3;
```

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/10/let-error-access-tdz-1.png?w=1280&ssl=1)

ở đây chương trình sẽ bị lỗi `ReferenceError` không thể truy cập `b` trước khi được khởi tạo

Và biến được khai báo với `let` sẽ nằm trong `block scoped`

Ví dụ biến b dưới đây nằm trong một `block scoped` của `if` với `{}` và không thể sử dụng ở bên ngoài.

![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2022/10/let-block-scope.png?w=1280&ssl=1)

---

Một điểm khác nhau nữa của `var` và `let` nữa là việc khai báo hai biến cùng tên hay `re-declaration`. Có thể khai báo hai biến cùng tên với `var`, nhưng với `let` làm như thế sẽ báo lỗi `Syntax Error` và không cho phép chương trình thực thi.

Có thể khai báo hai biến cùng tên với `var`:

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/elementor/thumbs/var-re-declare-pw401gsly8iz6e0wwpugd8kqtcsupaxplvqapagwmg.png?w=640&ssl=1)

Nhưng với `let` sẽ báo lỗi `Syntax Error` và không cho phép chương trình thực thi.

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/10/re-declare-let.png?w=1280&ssl=1)

## let, var và const

`let` và `var` cho phép khai báo tên một biến mà không cần giá trị khởi tạo, còn const chỉ cho phép khai báo với một giá trị ban đầu. 

Ví dụ:

```js
var a; 
let b;
const c = 1;
```

Nếu không có giá trị khởi tạo cho const bạn sẽ bị lỗi `SyntaxError`. 
![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/elementor/thumbs/const-missing-init-pw409hd2uavxrdsh53o9x79fie691bdkopk13gk65w.png?w=640&ssl=1)

Thêm nữa, bạn có thể thay đổi giá trị cho biến khai báo với `let` hay `var`, nhưng bạn không thể thay đổi giá trị cho biến khai báo với `const`.

Nếu bạn gán giá trị cho một biến khai báo với const bạn sẽ bị lỗi `TypeError`

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/elementor/thumbs/const-assign-val-pw40dmtf0ykj1drdwe9yfnjpynpm16uw99a8egekyk.png?w=640&ssl=1)

**Cuối cùng let và const là cú pháp của ES6.**


## Cách sử dụng var, let, const

Biết khác nhau thế nào rồi thì bạn sẽ sử dụng chúng như thế nào?

**const**: sử dụng khai báo hằng số, các giá trị không thay đổi trong suốt chương trình, và cố gắng dùng nhiều nhất có thể vì nó chặt chẽ nhất.

**let**: ưu tiên tiếp theo sau `const`, cố gắng sử dụng bất cứ khi nào có thể vì let có `Temporal Dead Zone` giúp bạn không truy cập trước khi khai báo tránh các lỗi về `undefined` như khi dùng với var

**var**: không nên dùng, hạn chế tối đa (hiểu để đọc code những chương trình viết với `ES5`)

### Vậy làm sao để tránh lỗi ReferenceError khi sử dụng let?

Tốt nhất là hãy đặt tất cả các khai báo và khởi tạo về biến lên trên cùng của chương trình, module, hàm, scope. 

Khi đó biến sẽ được khai báo trước khi sử dụng để đảm bảo bạn không truy cập trước khi nó được khai báo sẽ tránh lỗi trên.

```js
let b = 3;
console.log(b);
```

Chúc các bạn hiểu và tự tin khai báo biến mình cần sử dụng nhé.

([Ref](https://www.youtube.com/watch?v=BNC6slYCj50))

[Bài viết gốc](https://beautyoncode.com/khai-bao-bien-voi-var-let-va-const-trong-javascript/) nằm ở blog cá nhân của mình, mời bạn ghé chơi.

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!