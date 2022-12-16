Một trong những điều quan trọng nhất nhưng thường bị hiểu sai trong lập trình JS là làm sao để diễn đạt và điều khiển hành vi của chương trình trải dài trong một khoảng thời gian.

Vấn đề ở đây không chỉ là nói đến những gì sảy ra trong một vòng lặp `for`. Chúng ta đang bàn đến những gì sảy ra khi một phần của chương trình được thực thi tại thời điểm hiện tại, và một phần khác được thực thì sau -- chương trình sẽ hoạt động như thế nào giữa khoảng trống này.

Trên thực tế, các chương trình được viết ra, bằng cách này hay cách khác phải quản lý khoảng cách này, cho dù đó có thể là việc chờ đợi user input, request data, send data hay là chờ response. 

Điều này được gọi là asynchronous programming - lập trình không đồng bộ.

Asynchronous programming luôn tồn tại khi lập trình bằng JS. Nhưng phần đông lập trình viên JS chưa bao giờ thực sự xem xét một cách cẩn thận là làm thế nào và tại sao nó lại xuất hiện trong chương trình của họ, hay thậm chí là khám phá ra những cách khác để xử lý bất đồng bộ. Cách tiếp cận đủ tốt luôn là callback function. Cho đến nay, nhiều người vẫn sẽ nhấn mạnh rằng callbacks là quá ngon rồi.

Nhưng khi JS tiếp tục phát triển cả về phạm vi và độ phức tạp, việc quản lý asynchrony ngày càng trở nên khó khăn thậm chí là tê liệt, đòi hỏi sự ra đời của những phương pháp tiếp cận khác.

Trong chuỗi bài tìm hiểu về JS Asynchrony này chúng ta sẽ khám phá một loạt các kỹ thuật để lập trình JS không đồng bộ. Nhưng trước tiên, chúng ra sẽ phải hiểu sâu hơn về sự không đồng bộ là gì và cách thức hoạt động của nó trong JS.


### A Program in Chunks (miếng, mảnh nhỏ)

Bạn có thể viết chương trình JS của bạn trong một file .js, nhưng chương trình của bạn khả năng cao là sẽ bao gồm nhiều phần nhỏ (chunks), chỉ một trong số đó sẽ được thực thi bây giờ (now), phần còn lại sẽ được thực thi
sau (later). Đơn vị phổ biến nhất của một chunk là `function`.

Vấn đề mà nhiều lập trình viên JS còn non thường gặp phải đó là `later` không xảy ra một cách tuần tự và ngay lập tức sau `now`.

Xem xét ví dụ sau:

```
var data = ajax( "http://some.url.1" );

console.log( data );
// data không chứa kết quả trả về!!
```

Chú ý rằng Ajax requests không hoàn thành một cách đồng bộ, do đó chưa có giá trị trả về để gán cho biến `data`.

Cách đơn giản để đợi từ `now` đến `later` là sử dụng `callback` function:

```
ajax( "http://some.url.1", function myCallbackFunction(data){

	console.log( data );

} );
```

**Cẩn thận!!** Có thể bạn đã nghe đến việc có thể thực hiện các request Ajax đồng bộ. Về mặt kỹ thuật điều này là đúng, tuy nhiên bạn đừng bao giờ sử dụng cách đó trong mọi tình huống, bởi vì nó sẽ locks browser UI và ngăn chặn mọi tương tác của người dùng. Đây là một ý tưởng kinh khủng và đừng bao giờ nghĩ đến nó.

### Async Console

Không có một mô tả cụ thể nào về cách mà method `console.*` hoạt động, nó không phải là một phần chính thức của JS, thay vào đó, nó được thêm vào JS bởi hosting environment .

Vì vậy, mỗi loại browser và JS enviroment vận hành theo cách riêng của nó.

Do đó, trên một vài môi trường mà `console.log( )` không thực sự xuất ngay lập tức những gì nó nhận.

```
var a = {
	index: 1
};

// later
console.log( a ); // đôi khi show ra { index: 2 }

a.index++;
```

Hãy cẩn thận với điều này khi debug.


*Bài viết đã dài, mình xin tiếp tục ở phần 2*