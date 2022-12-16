# `Enhance your component with Filters and Custom Directives`
Thông thường, một design parttern tốt sẽ làm cách phát triển các component của bạn luôn đi theo một hướng thống nhất, clean và simple. Trong một hoàn cảnh nào đó, nếu file component bạn để phình to đến 200, 300 dòng, đó chính là dấu hiện của việc component đó đang có vấn đề. Một là component đó quá phức tạp, khi bạn quá tham làm muốn hắn làm rất nhiều việc, khiên component quá tải và overload. Hai có thể là code đang bị lặp lại nhiều chỗ. Chẳng hạn khi bạn muốn lọc ra các danh sách customer theo từng tiêu chí một như last_updated, create_date, ... bạn lại viết cho mỗi chỉ số đó một hàm. Rồi đến các component khác, khi cũng có tính năng tương tự như này, bạn lại copy and paste and paster again, khiến code vừa dài vừa khó maintain. Chính vì vậy Vue có một số api hay ho như filter hay custom directive giúp bạn sử lý những vấn đề đó.
![](https://images.viblo.asia/fce18c5c-31d1-4352-98c3-4828c635f657.png)

## Filter
Filter sẽ dựa vào các input, đi qua bộ lọc và đưa ra output tương ứng với bộ lọc đó. Ở đây, mình sẽ ví dụ với trường hợp là lấy ra các số chẵn trong dãy số
```html
[JS]
{
  ...
  filters: {
    evenNumber() {
      return this.numbers.filter(number => number % 2 === 0)
    },
    ...
  }
}

[HTML]
...
  <p>{{ numbers | eventNumber }}</p>
...
```
Thông qua directive pipe, number sẽ output tướng ứng với filter đó. Bạn có thể áp dụng pipe chain khi muôn áp dụng nhiều filter cùng lúc.
```html
...
  <p>{{ numbers | eventNumber | newFilter }}</p>
...
```
Tuy nhiên, điểm yếu của một filter là nó giống với một methods hơn là một computed. Tức là, mỗi một lần update, giá trị output này sẽ được tính toán lại mỗi lần đó. Như vậy khi xử lý dữ liệu lớn, bạn nên cân nhắc sử dụng với computed hay filter để có performance tối ưu hơn.

## Custom directive
Khái niệm này khá quen thuộc nếu bạn đã từng xử dụng `v-html` `v-if` ... Đây là nhưng build in directive mà vue đã hộ trợ. Vậy để tạo ra một directive cho riêng mình sẽ như thế nào? Giả dụ bạn muốn có một input, ngay khi nó được mounted vào trang, nó sẽ được focus để user có thể tương tác ngay
```js
...
directives: {
  focus: {
    inserted: function (el) {
      el.focus()
    }
  }
}
...
```

Directive có một số hook như sau
* bind: được gọi duy nhất một lần, ngay khi component được bind với directive. Đây thường là nơi để triển khai các setup
* inserted: Khi element được insert vào parent node
* update: gọi mỗi khi component parent cha được update
* componentUpdated: khi mà cả cha và com đã update
* unbind: gọi duy nhất một lần khi mà directive unbind
```html
<input v-focus>
```
## Conclusion
Trên đây là là một số cách có thế giúp bạn viết component gọn đẹp hơn. Refactor và improve code sẽ giúp bạn hình thành thói quen để có thể nâng cao skill và quality của bạn thân.

## `References`
1. https://vuejs.org/v2/guide/custom-directive.html
2. https://medium.com/@j_lim_j/summary-of-vuejs-by-sarah-drasner-part-6-of-7-filters-mixins-custom-directives-6677a3e4d2fa