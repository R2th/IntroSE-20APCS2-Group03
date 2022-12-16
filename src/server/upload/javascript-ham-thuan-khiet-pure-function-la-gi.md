![](https://images.viblo.asia/b3dabc39-498c-4b49-b597-8626fac67231.png)

Lần đầu tiên tôi nghe thấy thuật ngữ  "hàm thuần khiết - Pure function", mình đã hơi bối rối, một hàm thông thường thì có gì sai chứ? Tại sao nó lại cần phải thuần khiết? Thậm chí tại sao mình lại cần đến các hàm thuần khiết chứ?

Trừ khi bạn đã biết chúng là gì thì chắc chắn các bạn cũng có những thắc mắc tương tự. Tuy nhiên chúng thật sự rất đơn giản, để mình cho các bạn xem …

## Hàm thuần khiết (Pure function) là gì ?

Định nghĩa hàm thuần khiết: 

1. Hàm luôn trả về cùng một kết quả nếu được truyền vào các tham số không đổi. Nó không hề phụ thuộc vào bất kỳ trạng thái hoặc dữ liệu nào, cũng như những sự thay đổi trong khi chương trình đang được chạy. Nó chỉ phụ thuộc vào các tham số đầu vào của nó.
2. Hàm này không tạo ra bất kỳ ảnh hưởng nào đến các đối tượng khác  , chẳng hạn như các `request`, `input`, `output` hoặc `data mutation`.
Đó là định nghĩa của một hàm thuần khiết. Nếu nó thỏa mãi 2 điều kiện trên thì nó chính là một hàm thuần khiết. Bạn có thể đã tạo ra rất nhiều hàm  thuần khiết trong quá khứ mà không hề nhận ra.

## Các hiệu ứng phụ (Observable Side Effects)

Các hiệu ứng phụ này là bất kì những tương tác nào tới bên ngoài function. Đó có thể là bất cứ điều gì từ việc thay đổi một biến tồn tại bên ngoài hàm, hay gọi một function khác từ bên trong một function.

*Note: Nếu một hàm thuần khiết gọi một hàm thuần khiết thì đây không phải là hiệu ứng phụ và hàm gọi vẫn là thuần khiết.*

Các hiệu ứng phụ bao gồm: 
* Request HTTP
* Thay đổi dữ liệu
* In ra màn hình hoặc console
* Truy vấn / Thao tác DOM
* Math.random()
* Lấy thời gian hiện tại

Bản thân các hiệu ứng phụ không xấu và thường được sự dụng. Nhưng một hàm thuần túy thì không được có bất cứ một hiệu ứng phụ nào. Không phải hàm nào cũng cần thiết phải là thuần khiết. Mình sẽ nói thêm về nó ngay sau đây.

## Pure Function

Sau đây là một ví dụ về hàm thuần khiết để tính toán giá của sản phẩm sau thuế (Thuế 20%): 

```javascript
function priceAfterTax(productPrice) {
 return (productPrice * 0.20) + productPrice;
}
```

Hàm trên thỏa mãn cả hai điều kiện của một hàm thuần khiết như đã nêu ở trên. Hàm này ko phụ thuộc vào bất cứ input nào khác ngoài các tham số được truyền vào, và nó cũng không  hề thay đổi các dữ liệu khác cũng như là các hiệu ứng phụ.

Nếu bạn chạy hàm này với cùng một tham số cả trăm lần thì nó vẫn sẽ luôn luôn trả về cùng một kết quả.

## Impure Function

Cùng mục đích để  tính toán giá sản phẩm sau thuế như ví dụ trên, tuy nhiên ở đây chúng ta sử dụng hàm không thuần khiết:
```javascript
var tax = 20;
function calculateTax(productPrice) {
 return (productPrice * (tax/100)) + productPrice; 
}
```

Bạn có thể thấy được rằng vì sao hàm này lại được gọi là một hàm không thuần khiết.

Hàm này đã sử dụng tới một biến từ bên ngoài. và một hàm thuần khiết không được phụ thuộc vào bất cứ input nào khác ngoài các tham số được truyền vào.

## Tại sao hàm thuần khiết lại quan trọng trong JavaScript

Các hàm thuần khiết được sử dụng rất nhiều trong Functional Programming. Và các thư viện như ReactJS và Redux đều yêu cầu sử dụng các hàm thuần khiết.

Nhưng, các hàm thuần khiết cũng có thể được sử dụng trong JavaScript thông thường mà không phụ thuộc vào một mô hình lập trình nào hết. Bạn có thể kết hợp các hàm thuần khiết và không thuần khiết với nhau 1 cách hoàn toàn bình thường.

Không phải tất cả các chức năng cần phải thuần khiết. Ví dụ, một event handler cho việc nhấn nút để thao tác trên DOM không phải là 1 việc mà các hàm năng thuần túy. Nhưng các event handler có thể gọi tới các hàm thuần khiết khác sẽ làm giảm số lượng các hàm không thuần khiết trong ứng dụng của bạn.

## Khả năng Test và Refactor

Một lý do khác để sử dụng các hàm thuần khiết là chúng có thể test và refactor một cách dễ dàng.

Một trong những lợi ích chính của việc sử dụng các hàm thuần khiết là chúng có thể được test ngay lập tức. Chúng sẽ luôn tạo ra kết quả tương tự nếu bạn pass với cùng một tham số.

Chúng cũng làm cho việc duy trì và refactor mã dễ dàng hơn nhiều. Bạn có thể thay đổi một hàm thuần khiết và không phải lo lắng về các tác dụng phụ ngoài ý muốnm, làm rối tung toàn bộ ứng dụng và kết thúc trong "debugging hell".

Khi được sử dụng đúng cách, việc sử dụng các hàm thuần khiết sẽ tạo ra code chất lượng hơn. Đây là một cách làm việc sạch sẽ hơn với rất nhiều lợi ích.