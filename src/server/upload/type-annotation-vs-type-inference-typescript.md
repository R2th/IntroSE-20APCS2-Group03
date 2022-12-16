Trong bài viết này, chúng ta sẽ tìm hiểu kỹ về TypeScript bằng cách tìm hiểu sự khác biệt giữa kiểu chú thích và kiểu suy luận. Tôi sẽ cho rằng bạn có một số kinh nghiệm về JavaScript và biết về các kiểu cơ bản, như chuỗi, số và boolean. Nếu bạn không quen với các loại, hãy xem tài liệu bên dưới để bắt đầu.

- [Typescript basic types](https://www.typescriptlang.org/docs/handbook/basic-types.html)

> #### Type annotation: cho Typescript biết rõ ràng kiểu của biến

> #### Type inference: Typescript sẽ âm thầm xác định kiểu của biến 

## Type Annotation

Kiểu chú thích có nghĩa là chúng ta đang cho TypeScript biết loại giá trị. Để gán một kiểu cho một giá trị một cách rõ ràng, chúng ta sẽ thêm dấu hai chấm và kiểu sau khi khai báo biến. Đoạn mã dưới đây chỉ định biến color có kiểu String.

```
let color: string = 'blue';
```

![](https://images.viblo.asia/8446d6b5-616f-4624-9bbc-54941fada8ba.png)

Bây giờ, nếu muốn gán lại giá trị cho biến color bằng bất kể thứ gì không phải là 1 chuỗi, chúng ta sẽ nhận lại lỗi.

```
// We manually assign the type to string
let color: string = 'blue';
// This will cause an error since color must be a string
color = 10;
```

![](https://images.viblo.asia/ae2680f2-4ad9-4cd4-bce4-d2c648535fb2.png)

Chúng ta có thể làm tương tự đối với các kiểu dữ liệu khác như số hay boolean.

## Type Inference

Kiểu suy luận là hệ thống mà Typescript sử dụng để phán đoán kiểu dữ liệu. Nếu bạn khai báo 1 biến và khởi tạo nó trong cùng một biểu thức mà không khai báo kiểu dữ liệu, Typescript sẽ tự suy luận được.

Trong đoạn code bên dưới, tôi không gán kiểu dữ liệu cho biến color. Bởi vì chúng ta đã khởi tạo cho nó một giá trị là 'blue', cho nên Typescript đã biết được rằng biến color phải là 1 chuỗi và gán kiểu dữ liệu đó cho nó. Đó chính là Type Inference
```
let color = 'blue';
```

Bây giờ, nếu ta lại gán lại cho biến color một giá trị không phải là chuỗi, ta sẽ nhận lại lỗi giống như đã làm đối với type annotation.

## Vậy, khi nào thì cần sử dụng 'type annotation'?

Type inference giúp chúng ta dễ dàng sử dụng typescript hơn, nhưng không phải lúc nào bạn cũng có thể dựa vào nó để làm việc như ý muốn. Vậy khi nào chúng ta cần sử dụng type annotation?

### Khởi tạo trễ

Một ví dụ là nếu chúng ta khai báo một biến trên 1 dòng, sau đó khởi tạo nó trên một dòng khác. Nếu bạn khai báo một biến không có kiểu dữ liệu, Typescript sẽ gán cho nó kiểu **any**. Đây là điều mà chúng ta nên tránh.

```
let color; // color typeOf any
```

Để sửa điều này, chúng ta sẽ khai báo biến cùng với kiểu dữ liệu của nó. Bây giờ, Typescript sẽ biết được rằng giá trị của biến phải là 1 chuỗi, nếu chúng ta cố gắng gán một kiểu dữ liệu khác, nó sẽ hiển thị lỗi.

```
// We manually assign the type to string
let color: string;
color = 'blue'
```

### Gán nhiều kiểu dữ liệu

Một ví dụ thứ hai là khi chúng ta muốn một biến có thể chấp nhận nhiều kiểu dữ liệu, Type Annotation sẽ giúp chúng ta bằng cách sử dụng thêm kí tự **|**

```
let color: (string | number) = 'blue';
```

Lúc này ta có thể gán số hoặc chuỗi cho biến color mà không gặp vấn đề gì.

### Kiểu hàm

Một ví dụ khác nữa là khi sử dụng function. Hàm cũng có kiểu suy luận, nhưng đôi khi kiểu trả về lại không phải là thứ mà chúng ta muốn.  Xử lý các kiểu trong hàm là một chủ đề khác mà chúng ta sẽ đi sâu vào trong một bài viết trong tương lai. Hiện tại, chỉ cần biết rằng khi xử lý các hàm, có thể là một ý tưởng không tồi khi chú thích kiểu dữ liệu cho nó một cách trực tiếp.