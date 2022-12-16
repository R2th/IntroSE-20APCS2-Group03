Khi làm việc với `javascript` chắc hẳn các bạn đã quá quen với việc dùng biến mà không cần phải quan tâm đến kiểu dữ liệu của nó là gì phải không? Đúng là mới đầu tiếp cận với `Typescript` mình cũng cảm thấy nó khá là phiền vì cần phải khai báo đủ type để nó chặt chẽ hơn. Lúc đó mình còn nghĩ: " `JavaScript` đã đủ tốt liệu có thực sự cần học TypeScript?". Hầu hết mọi người đều vẫn ổn khi không có nó. Nhưng khi đã quen với nó rồi các bạn sẽ nhận ra được một số lợi ích như là:

* Với việc đặt type cho từng biến code của bạn sẽ dễ đoán và debug hơn.
* Dễ dàng tổ chức code cho các dự án lớn, hỗ trợ OOP mạnh mẽ.
* TypeScript có một bước biên dịch thành JavaScript, sẽ bắt tất cả các loại lỗi trước khi chúng chạy.
* Typescript là mã nguồn mở vì vậy nó miễn phí và có cộng đồng hỗ trợ rất lớn.
    
Trong bài viết này, chúng ta sẽ làm quen với TypeScript bằng cách hiểu sự khác biệt giữa `Type Annotation` và `Type Inference`. Mình sẽ cho rằng bạn là người đã hiểu biết ít nhiều về `Javascript` và về các kiểu cơ bản, như string, number và boolean. Nếu bạn không quen với các loại, hãy xem tài liệu [ở đây](https://www.typescriptlang.org/docs/handbook/basic-types.html) để bắt đầu.

## Type Annotation

`Type Annotation` có nghĩa là chúng ta sẽ cho `typescript` biết được biến đó sẽ có kiểu dữ liệu là gì. Để gán cho biến đó giá trị một cách chính xác, Chúng ta sẽ thêm dấu hai chấm và kiểu vào sau khai báo biến như này nè:

```javascript
let color: string = 'blue';
```

Điều này có nghĩa là biến `color` sẽ nhận kiểu dữ liệu là `string` và nó chỉ được phép gán 1 chuỗi vào biến đó thôi. Nếu ta cố tình gán cho nó 1 dữ liệu là `number` thì nó sẽ có error như sau:
![](https://images.viblo.asia/149f329d-553e-4fb0-87c5-737ab0979a82.png)

## Type Inference

`Type inference` có nghĩa là `typescript` sẽ tự động đoán kiểu dữ liệu của biến đó là gì. Nếu bạn khai báo và khởi nó cùng với 1 giá trị cụ thể hoặc là một biểu thức nhất định.

```javascript
let color = 'blue';
```

Ở đoạn code trên chúng ta chỉ khai báo biến và khởi tạo cho nó 1 giá trị là `string` và không hề khai báo kiểu dữ liệu cho nó. Nhưng `typescript` vẫn sẽ hiểu và tự động khai báo cho `color` có kiểu là `string`. Và nếu muốn thay đổi giá trị của `color` thì bắt buộc phải truyền vào đó một chuỗi. Nếu ta cố tình gán cho nó giá trị number thì sẽ gặp phải lỗi tương tự như trên.

![](https://images.viblo.asia/4a9c4e4b-13a3-4005-b565-ef737c2ddbf6.png)

## Khi nào thì sử dụng Type Annotation

Type Inference giúp ta dễ dàng hơn khi sử dụng `typescript` nhưng không phải lúc nào cũng có thể dùng được nó. Vậy thì khi nào chúng ta sẽ sử dụng Type Annotation?

### Delayed initialization

```js
// TypeScript will assign the type to any
let color;
```

Đúng như vậy trong trường hợp này `typescript` vì chưa nhận được giá trị khởi tạo nào cả nên lúc này nó sẽ tự động gán cho kiểu dữ liệu là `any`.

![](https://images.viblo.asia/33948687-1eae-460d-917f-92e461f16a2d.png)

Chẳng ai muốn khi đã dùng  `typescript` mà vẫn phải nhận kiểu là `any` cả. Để khắc phục việc này thì chúng ta cần phải gán cho nó 1 kiểu dữ liệu mà mình mong muốn. Vậy lúc này chính là lúc cần phải sử dụng `Type Annotation`.

```js
let color: string;
color = 'white'
```

### Assigning multiple types

Đôi lúc chúng ta cũng cần 2 kiểu dữ liệu bên trong 1 biến đúng không? Ví dụ như mã màu chẳng hạn (000) hoặc (white). Lúc này chúng ta sẽ dùng thêm ký tự `|` ở giữa 2 kiểu dữ liệu như sau:

```js
let color: (string | number) = 'white';
```

![](https://images.viblo.asia/4e873ed8-9afd-44b5-a3dc-8b3a4d5c52af.png)

Trên đây là một chia sẻ nhỏ của mình về `typescript` hi vọng nó sẽ giúp bạn phần nào hiểu được `typescript` là gì và nó có gì đáng để theo đuổi hay không. 

Cảm ơn bạn đã đọc bài viết của mình :blush::blush::blush:

Link tham khảo tại [đây](https://levelup.gitconnected.com/type-annotation-vs-type-inference-in-typescript-85ba2194ebe1).