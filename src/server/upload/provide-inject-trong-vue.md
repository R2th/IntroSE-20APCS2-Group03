Với những bạn đã có thực hiện dự án với Vuejs thì chúng ta đều biết một cách để truyền dữ liệu từ component cha xuống component con chính là sử dụng prop (prop này thì ở bên React cũng tương tự :smiley: ). Tuy nhiên, trong trường hợp mà các component con được lồng nhau nhiều lớp thì bạn phải truyền prop đến từng component trung gian để nó đến được với component mà mình mong muốn. Điều này thật sự là tồi tệ vì chỉ cần chúng ta quên định nghĩa prop ở một component nào đấy thì ta sẽ nhận được thông báo lỗi kiểu `xxx is not defined` :worried: . Và lúc này, ta chỉ có thể ngồi tra lại xem mình đã bỏ lỡ "chiếc" prop ở đoạn nào trên bước đường dài ngằng của chúng ta. Nhưng mà, các bạn cũng không cần buồn quá lâu nếu ta biết đến thứ mà mình chuẩn bị sẽ đưa đến trong bài hôm nay. Nó chính là `provide/inject`. Thực ra thì cái này mình cũng mới được giác ngộ sau khi được người anh xử lý hộ tính năng chuyển trang khi mà tất cả các form con (mỗi form là một component) ở trong nó đều được validate.

Tìm doc của Vue thì thấy ở doc của v2 thì nó chỉ được nhắc đến trong phần API, còn ở v3 (đang là beta ở thời điểm viết bài) thì nó đã được tách ra thành một phần riêng rồi. Chúng ta hãy cùng tìm hiểu chi tiết hơn về nó nhé.
![](https://images.viblo.asia/153cca68-5700-4c87-8584-63477fa66d2e.png)

## Sử dụng provide/inject như thế nào ?
Component cha đóng vai trò là dependency provider cho tất cả các component con của chính nó. Nó khi bị ảnh hưởng bởi cấu trúc phân cấp của các component. Nó được chia làm hai phần là: 
* `provide`: định nghĩa ở component cha, nơi cung cấp dữ liệu.
* `inject`: định nghĩa ở component con, sử dụng dữ liệu được cung cấp từ component cha.

`provide` nên là object hoặc là function trả về một object. Object này bao gồm các property có sẵn để inject vào các component con. Bạn có thể sử dụng ES2015 làm key trong object này, nhưng chỉ với các môi trường hỗ trợ `Symbol` và `Reflect.ownKeys`.

```js
// parent component providing 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}
```

`inject` nên là:
* Một mảng các chuỗi
* Một object trong đó key là tên local binding, giá trị là key để có thể tìm kiếm trong các inject đã định nghĩa.

```js
// child component injecting 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```

{@embed: https://jsfiddle.net/BuiHiu/8459obqp/38/embed/js,html,result/dark} 

Với việc sử dụng `provide/inject` cho phép ta tiếp tục phát triển component một cách an toàn hơn mà không làm thay đổi sự phụ thuộc của component con. Giao diện giữa các component vẫn được xác định một cách rõ ràng giống như cách mà chúng ta vẫn sử dụng prop.

## Với reactive
Theo như mô tả chi tiết về `provide` và `inject` thì tính năng này không có reactive. Chúng ta có thể thay đổi nó bằng cách sử dụng `ref` hoặc reactive cho object trong `provide`. Để chi tiết hơn thì chúng ta có thể xem ví dụ từ doc của Vue tại [đây](https://v3.vuejs.org/guide/component-provide-inject.html#working-with-reactivity). Ví dụ này đơn giản là tính độ dài của một mảng. Bằng việc sử dụng thêm reactive thì khi thay đổi danh sách các item thì nó sẽ được tự động tính toán lại số lượng phần tử. Các bạn có thể theo dõi doc và tự thực hiện xem kết quả nhé :smiley: .

Ngoài ra thì mình cũng thử tìm kiếm thì có một bài viết chi tiết về các sử dụng reactive với `provide/inject` ở [đây](https://blog.logrocket.com/how-to-make-provide-inject-reactive/). Bài viết giới thiệu chi tiết một số cách mà bạn có thể sử dụng.

## Khi nào thì sử dụng provide/inject

Như trong doc của Vue có nói thì chúng ta hãy cố gắng không sử dụng `provide/inject` mà hãy sử dụng prop và event. Điều này sẽ làm cho bạn tránh những sự phức tạp không cần thiết và đoạn mã của bạn sẽ dễ hiểu hơn. Tuy nhiên sẽ có một vài trường hợp bạn có thể sử dụng `provide/inject` một cách hợp lý.
* Việc phải truyền prop từ lớp này đến lớp khác, qua nhiều component và những component ở giữa không sử dụng gì đến prop bạn truyền cho nó. 
* Với một tập các component luôn sử dụng cùng nhau thì ta có thể sử dụng `provide/inject`. Tuy vâỵ điều tốt nhất vẫn là sử dụng prop và event để các component khác sẽ sử dụng.
* Trong trường hợp sử dụng Vuex với những state đơn giản thì nó thật sự không cần thiết. Với một nhóm component có thể sử dụng lại thì sử dụng Vuex cũng mang lại sự phức tạp không đáng có.
* Nếu như dữ liệu được truyền xuống được sử dụng bởi một vài component thì sử dụng `provide/inject` là có thể có ý nghĩa. Tuy vậy, với dữ liệu được sử dụng ở cả những nơi khác thì việc để nó ở một component cao hơn hoặc Vuex là giải pháp tốt hơn.

**Lưu ý:** Chúng ta không nên sử dụng `provide/inject` nhưng là một two-way data binding bằng việc thay đổi giá trị từ cả component providing và component injecting. Bởi vì:

* Vue sử dụng hệ thống one-way data binding. Việc sử dụng một mô hình luồng dữ liệu khác làm mất đi sự nhất quán và gây ra những sự nhầm lẫn.
* Việc giữ tất cả các thay đổi trong một component duy nhất giúp cập nhật, cấu trúc lại và theo dõi lỗi trong tương lại một cách dễ dàng hơn. 

## Kết luận
Bằng việc sử dụng `provide/inject` bạn có thể cung cấp dữ liệu cho những component con ở rất xa và điều đó làm cho chúng ta có thể tạo nên một chức năng tuyệt vời. Tuy vậy, như chính tại doc của Vue có nói thì ta không nên sử dụng nó khi không thực sự cần thiết nhé :smiley: Bài viết đến đây là kết thúc. Cảm ơn mọi người đã theo dõi. Nếu có gì sai sót mong mọi người thông cảm.

## Tham khảo
https://vuejs.org/v2/api/#provide-inject

https://v3.vuejs.org/guide/component-provide-inject.html

https://blog.logrocket.com/how-to-make-provide-inject-reactive/