Mỗi developer chuyên về bất kỳ ngôn ngữ lập trình nào cũng sẽ cho bạn biết có một công cụ mạnh mẽ mà ngôn ngữ cung cấp mà họ hiếm khi sử dụng và muốn họ biết nhiều hơn về nó. Đối với tôi, đó là Array.prototype.reduce. Tôi khá thích các phương thức Array khác như **map**, **filter** và **find**, nhưng **reduce** là một phương thức mà tôi biết là mạnh mẽ nhưng chưa bao giờ thực sự được sử dụng nhiều.

Mãi cho đến khi tôi tái cấu trúc một số mã Trình gỡ lỗi [Firefox DevTools](https://github.com/firefox-devtools/debugger) mà tôi đã tìm thấy một trường hợp sử dụng tuyệt vời để sử dụng **reduce** - một trong những dự định tôi sẽ sử dụng trong tương lai.

# Array.reduce # 
Các phương thức như **forEach** và **map** được tạo ra để tránh side-effects, và giảm cũng không ngoại lệ. Tuy nhiên, trong trường hợp này, **reduce** có thể trả về một Object khác ngoài Array. Lấy trường hợp này làm ví dụ:

```
const sources = [
  {
    id: "server1.conn13.child1/39",
    url: "https://davidwalsh.name/"
  },
  {
    id: "server1.conn13.child1/37",
    url: "https://davidwalsh.name/util.js"
  }
];

// Return an object of sources with the keys being "id"
const sourcesMap = sources.reduce((map, source) => {
  map[source.id] = source
  return map;
}, {});
```
Trong ví dụ trên, tôi lấy một mảng các đối tượng **Source** và trả về một đối tượng bằng chữ với mỗi id của **Source** làm khóa:
```
{
  "server1.conn13.child1/39": {
    "id": "server1.conn13.child1/39",
    "url": "https://davidwalsh.name/"
  },
  "server1.conn13.child1/37": {
    "id": "server1.conn13.child1/37",
    "url": "https://davidwalsh.name/util.js"
  }
}
```
Lưu ý rằng `{},` là đối số cuối cùng **reduce**, là đối tượng bắt đầu / mặc định được trả về. Nếu không có mục nào trong mảng, `{}` sẽ được trả về. Cũng đánh giá cao rằng một phương thức mảng trả về một đối tượng bằng chữ và không phải là một mảng được sửa đổi!

Thật điên rồ khi tôi không sử dụng **reduce** nhiều hơn, nhưng đó chỉ là cuộc sống trong ngành của chúng tôi - tất cả chúng ta đều có một vài API mà chúng ta chưa sử dụng nhiều. Bạn thường thấy tính năng nào của JavaScript nhưng không được sử dụng?
# For-loop #
**For-loop** có lẽ là một trong những khái niệm đầu tiên các bạn gặp trong lập trình.
Vậy tại sao chúng ta lại cần **reduce** khi đã có **for-loop** là 1 cách tiếp cận đơn giản hơn
Ví dụ sau đây sử dụng 2 cách tiếp cận đã nêu ra để cho bạn hiểu hơn được vấn đề

Sử dụng **reduce**
```
var array = [4,5,6,7,8];
var singleVal = 0;
var singleVal = array.reduce(function(previousVal, currentVal) {
  return previousVal + currentVal;
}, 0);
```

Sử dụng  **for-loop**
```
var array = [4,5,6,7,8];
var singleVal = 0;
for(var i = 0; i < array.length; i++){
  var singleVal = singleVal += array[i];
}
```

**Reduce** sẽ chậm hơn cách tiếp cận **for-loop** thông thường vì:
1. Chúng có một callback lại để thực hiện .
2.  Có nhiều trường hợp các hàm được truyền vào còn phải thực hiện việc validate các tham số nên dẫn đến các chi phí thêm.

Vậy tại sao chúng vẫn cần **reduce**
1. Tính dễ đọc
2. Dễ để code
3. Nếu chúng ta có khả năng tối ưu tốt hàm reduce vẫn có performane tương đương với **for-loop**

Tùy vào mức độ tối ưu, mức độ cần triển khai của bài toán chúng ta sẽ quyết định nên dùng **reduce** hay không. 
Chúc các bạn sẽ có lựa chọn tốt nhất cho mình.


Link tham khảo: https://davidwalsh.name/using-array-reduce