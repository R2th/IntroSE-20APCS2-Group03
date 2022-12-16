## Tổng quan
**Variable (biến)** là một trong những lý do chính khiến các **Preprocessor( bộ tiền xử lý)** CSS tồn tại. Khả năng đặt một variable cho một cái gì đó như màu sắc, sử dụng variable đó trong suốt quá trình viết CSS của bạn, **DRY (Don't Repeat Your Self)**, và **dễ dàng chỉnh sửa**. Bạn có thể sử dụng các variable mặc định của CSS ( CSS Custom Propreties) với mục đích tương tự. Nhưng cũng có một số khác biệt quan trọng cần được chúng ta làm rõ.

## Ví dụ về sử dụng preprocessor variable 
```
$brandColor: #F06D06;

.main-header {
  color: $brandColor;
}

.main-footer {
  background-color: $brandColor;
}
```

Trên đây là biến thể SCSS của SASS, nhưng tất cả các CSS preprocessorpreprocessor hỗ trợ khái niệm variable như Stylus, Less, PostCSS, ...
Đoạn mã ở trên sẽ không có tác dụng đối với browser bởi vì browser không hiểu những đoạn mã này và bỏ qua chúng. Preprocessors cần phải biên dịch ra mã CSS để browser có thể hiểu được. Đoạn mã trên sẽ được biên dịch ra CSS như sau:
```
.main-header {
  color: #F06D06;
}

.main-footer {
  background-color: #F06D06;
}
```
Đây là đoạn code CSS hợp lệ. Variable là một phần của ngôn ngữ tiền xử lý, không phải CSS. Khi mã được biên dịch ra CSS, các variable sẽ biến mất. HIện tại, CSS đã hỗ trợ variable hay còn gọi là "**CSS Custom Properties**". Nó cho phép bạn làm việc với các biến trực tiếp trong CSS mà không cần phải qua các preprocessors để biên dịch.

## Ví dụ về sử dụng CSS variable 

```
:root {
  --main-color: #F06D06;
}

.main-header {
  color: var(--main-color);
}

.main-footer {
  background-color: var(--main-color);
}
```

Hai ví dụ ở trên đều hướng tới một mục đích tương tự nhau. Chúng tôi có thể định nghĩa variable màu sắc một lần và có thể sử dụng lại nhiều lần.

Vậy thì tại sao chúng ta lại dùng cái này mà không sử dụng cái kia và ngược lại ?

## Vì sao chúng ta sử dụng CSS variable?

- Chúng ta có thể sử dụng chúng mà **không cần preprocessor**.
- Chúng có khả năng **ghi đè**. Chúng ta có thể gán giá trị cho biến trong selector CSS hoặc ghi đè giá trị hiện tại.
- Khi giá trị của biến thay đổi **browser sẽ cập nhật lại**.
- Bạn có thể lấy giá trị và **thao tác sử dụng Javascript**.

Đây là ví dụ về khả năng ghi đè

```
:root {
  --color: red;
}

body {
  --color: orange;
}

h2 {
  color: var(--color);
}
```

Ngoài ra, chúng có thể đặt lại giá trị của các biến bên trong media query và có thể ghi đè những giá trị mới này thông qua media query. Đối với các variable preprocessor chúng ta không thể làm điều này. 

Dưới đây là ví dụ về khi thay đổi kích thước màn hình thì giá trị của biến sẽ được gán lại giá trị.

![](https://images.viblo.asia/cabd1476-dc55-43b2-84b5-1519c16aa532.gif)

{@embed: https://codepen.io/chriscoyier/pen/ORdLvq?editors=0110}

## Vì sao chúng ta sử dụng preprocessor variable?

Về cơ bản thì những ưu điểm mà CSS Variable có thì CSS Variable Preprocessor đều có những tính năng đó. Tuy nhiên các CSS Variable Preprocessor có nhược điểm đó là giá trị của chúng là tĩnh. Bởi vì bản chất của chúng là trình biên dịch sẽ biên dịch các biến này ra CSS. Khi muốn thay đổi giá trị của các biến này chúng ta sẽ phải biên dịch lại.


## Chúng ta có thể kết hợp chúng với nhau?

Có nhiều lý do khá thuyết phục để sử dụng cả hai. Chúng ta hoàn toàn có thể dùng CSS variable làm đầu ra của variable preprocessors.

{@embed: https://codepen.io/vank0/pen/kkGvAb}

Khi chúng ta sử dụng CSS variable mà không phải lo lắng về hỗ trợ trình duyệt, chúng ta chỉ cần sử dụng chúng để thực hiện tất cả các xử lý biến. Chúng tôi vẫn có thể sử dụng tiền xử lý cho các tiện ích khác nhưng việc xử lý biến trong CSS có vẻ rất tốt, có lẽ nó đáng để thực hiện tất cả mà không cần dùng preprocessor.

## CSS variable browser support

Dưới đây là khả năng hỗ trợ trình duyệt của CSS variable thông qua trang [Caniuse](https://caniuse.com/#feat=css-variables)

![](https://images.viblo.asia/3ac37d53-8bd3-49d4-83d6-bc006b5c36bd.png)

## Kết luận
Trên đây mình đã đưa ra quan điểm về việc sử dụng CSS Variable cũng như Variable của CSS Preprocessors. Các bạn có thể tìm hiểu thêm và lựa chọn sử dụng cái nào phù hợp nhất với mình nhé.

Tài liệu tham khảo: https://css-tricks.com/difference-between-types-of-css-variables/