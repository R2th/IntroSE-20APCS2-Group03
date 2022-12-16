Trong Javascript có nhiều cách để tìm kiếm phần tử trong Array. Cách đơn giản nhất là dùng vòng lặp. Nhưng với ES6+ có nhiều methods để lặp trong Arrray và tìm kiếm trong các phần từ dễ dàng hơn.

Dưới đây sẽ là những methods Array có thể sử dụng:

* Array.includes
* Array.find
* Array.indexOf
* Array.filter

## includes

```js
const alligator = ["thick scales", 80, "4 foot tail", "rounded snout"];

alligator.includes("thick scales"); // returns true
```



Method `.includes()`  trả về giá trị `boolean` là cách hoàn hảo dùng để kiểm tra phần tử có tồn tại trong array hay không, gía trị trả về của hàm này sẽ là `true` hoặc `false`. Cú pháp đơn giản như sau
```
arr.includes(valueToFind, [fromIndex]);
```


Bây giờ như bạn thấy trong ví dụ trên, ta chỉ có một tham số - valueToFind ở dạng `Array`. Tùy chọn từ `Index` là một số, cho biết chỉ số nào bạn muốn bắt đầu tìm kiếm (mặc định là 0, nên sẽ tìm kiếm toàn bộ phần tử trong mảng). Vì vậy, trong ví dụ trên,item `thick scales` có chỉ số 0, nên sau đây sẽ là `false`: `alligator.includes ('thick scales', 1);` kể từ khi nó bắt đầu tìm kiếm từ chỉ số 1 trở đi.


Có một vài điều quan trọng cần chú ý. Methdod `.includes()` này sử dụng so sánh rất nghiêm ngặt. Điều đó có nghĩa là, từ ví dụ trên, sau đây sẽ trả về `false`: `alligator.includes ('80');` Điều đó bởi vì mặc dù 80 == '80' là `true`, 80 === '80' là `false`

## find

Method .find () khác với .include () như thế nào? Nếu trong ví dụ trên, ta chỉ thay đổi văn bản, trong đó có văn bản, trong đó có thể tìm thấy lỗi, ta sẽ gặp lỗi này:

```
Uncaught TypeError: thick scales is not a function
```

Bởi vì phương thức `find` yêu cầu một `function` được truyền vào. Vì phương thức `find` không phải là sử dụng toán tử so sánh đơn giản như `includes()`. Thay vào đó, nó sẽ chuyển từng phần tử vào hàm của bạn và kiểm tra rồi trả về giá trị `true` hay `fasle`. Vì vậy, mặc dù điều này hoạt động: `alligator.find (() => 'thick scales');`, bạn có thể muốn đưa toán tử so sánh của riêng mình vào hàm để nó trả về bất cứ điều gì có liên quan.

```
const alligator = ["thick scales", 80, "4 foot tail", "rounded snout"];

alligator.find(el => el.length < 12); // returns '4 foot tail'
```

Hàm đơn giản này trong method `find` chúng ta xem xét từng phần tử của mảng, với `alias` của `el`, ta đã gán nó và dừng lại khi nó tìm thấy phần tử đầu tiên là đúng. Trong trường hợp `true` có thuộc tính độ dài nhỏ hơn 12 (`numbers` không có thuộc tính độ dài). Tất nhiên bạn có thể làm cho chức năng này phức tạp khi cần thiết, làm cho điều kiện thực sự của bạn đáp ứng nhu cầu của bạn.

Trong ví dụ trên, ta chỉ sử dụng cuộc gọi lại với một tham số. Bạn cũng có thể thêm các tham số để tham chiếu `index` phần tử hiện tại. Một tham số khác có thể là `array`, nhưng tôi thấy điều này hiếm khi được sử dụng. Dưới đây là một ví dụ sử dụng `index`:

```
alligator.find((el, idx) => typeof el === "string" && idx === 2); // returns '4 foot tall'
```

Có 3 `elements` khác nhau đáp ứng điều kiện đầu tiên `(typeof el === 'string')`. Nếu đây là điều kiện duy nhất, nó sẽ trả lại cái đầu tiên` ‘thick scales’`. Nhưng sự khác biệt là, chỉ có một người có chỉ số là 2 và đó là `4 foot tall`


Nói về `indexs`, một phương thức mảng tương tự là .findIndex (). Phương thức này cũng nhận được một hàm, nhưng như bạn có thể đoán được, nó trả về chỉ số phần tử phù hợp thay vì chính phần tử đó.

## indexOf

```
const alligator = ["thick scales", 80, "4 foot tail", "rounded snout"];

alligator.indexOf("rounded snout"); // returns 3
```

Giống như phương thức `.includes()`, `indexOf ()` sử dụng so sánh nghiêm ngặt, không phải là hàm như chúng ta đã thấy với phương thức `.find()`. Nhưng không giống với `incluldes()`, nó trả về `index` của phần tử, thay vì `boolean`. Bạn cũng có thể chỉ ra `index` nào trong mảng để bắt đầu tìm kiếm.

Mình thấy `indexOf()` rất hữu ích. Nó nhanh chóng và dễ dàng, có thể cho bạn biết phần tử nằm trong mảng và có thể cho bạn biết phần tử có tồn tại hay không. Làm thế nào để nó cho bạn biết nếu các yếu tố tồn tại? Về cơ bản, chúng ta có thể biết phần tử tồn tại nếu nó trả về một số dương và nếu nó trả về `-1`thì chúng ta biết phần tử đó không tồn tại.

```
alligator.indexOf("soft and fluffy"); // returns -1
alligator.indexOf(80); // returns 1
alligator.indexOf(80, 2); // returns -1
```

Và như bạn có thể thấy, mặc dù chúng ta có thể lấy các phương thức `find()` hoặc `findIndex()` để cung cấp cho chúng ta cùng một thông tin, nhưng điều này ít hơn rất nhiều để viết. Chúng tôi không phải viết ra một hàm để so sánh, vì nó đã nằm trong phương thức `indexOf`.

Bây giờ, giống như những cái khác, `indexOf ()` cũng trả về `index` của phần tử khớp đầu tiên mà nó tìm thấy. `JavaScript` cung cấp cho chúng ta một phương thức thay thế `.lastIndexOf()`. Như bạn có thể đoán được là  điều này thực hiện tương tự như `indexOf()` nhưng bắt đầu từ `index` cuối cùng của mảng và hoạt động ngược. Bạn cũng có thể chỉ định một tham số thứ hai, nhưng hãy nhớ các chỉ số không thay đổi, chỉ vì bạn đang sử dụng một phương thức khác.

```
const alligator = ["thick scales", 80, "4 foot tail", "rounded snout", 80];

alligator.indexOf(80); // returns 1
alligator.lastIndexOf(80); // returns 4
alligator.indexOf(80, 2); // returns 4
alligator.lastIndexOf(80, 4); // returns 4
alligator.lastIndexOf(80, 3); // returns 1
```

## Bonus: filter

```
const alligator = ["thick scales", 80, "4 foot tail", "rounded snout", 80];

alligator.filter(el => el === 80); //returns [80, 80]
```

Phương thức `filter()` giống như phương thức `find()`, trong đó nó yêu cầu một `function` được truyền và một điều kiện cho những gì sẽ được trả về. Sự khác biệt chính là `filter()` luôn trả về một `array`, ngay cả khi chỉ có một phần tử phù hợp. Nhưng nó sẽ trả về tất cả các phần tử khớp, trong khi `find()` chỉ trả về kết quả đầu tiên.