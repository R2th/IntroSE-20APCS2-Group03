Chào các bạn. :)

Dòng đời xô đẩy mình lại tập tành code Vuejs. Cũng không có gì đặc biệt nếu không gặp phải 3 cái thứ Methods, Computed, Watchers này ngay từ mấy phần đầu tiên. Lúc mới đọc lần đầu, mình kiểu "wth, sao cái này cũng giống cái vừa nãy mà, khác có tý xíu à? Sao sinh ra tận 3 cái zị?". Và mình quyết định đi tìm thêm tài liệu để đọc.
Bài viết này rất đơn giản, mình muốn chia sẻ cho các bạn mới học và cũng là cách mình ghi lại kiến thức của mình thôi. Các bạn đọc vui nha :))

Bài viết này mình sẽ không hướng dẫn các bạn code mà sẽ tập chung vào phân biệt 3 thành phần này. Có gì chưa đúng, các bạn góp ý cho mình nhé.

## 1. Methods
Methods là tập hợp những functions, giống những functions bình thường trong JS. Mình nghĩ nó sẽ được dùng nhiều nhất trong project, vì nó dễ hiểu nhất. Methods thường được dùng để **xử lý khi bắt sự kiện** với DOM (ví dụ như khi click vào 1 button hoặc sự kiện change 1 ô input) hoặc đơn giản là để **tái sử dụng code** (khi 1 đoạn code logic được dùng đi dùng lại ở nhiều chỗ).  Methods cho **phép truyền vào tham số.**

Có 2 cách dùng methods:

1. Dùng khi bắt sự kiện (VD: `@click="doSomething(data)"`)
2. Dùng để thực thi khi data thay đổi (VD: `{{ printSomething }}`) 

Với cách 1 thì không có vấn đề gì, còn cách thứ 2 thì có 1 chút vấn đề. Khi chúng ta click 1 button (cách 1), method biết chắc chắn rằng khi đó nó phải thực thi. Nhưng khi dùng cách 2, method không biết được nó cần thực thi khi nào, khi nào thì data liên quan đến nó thay đổi. Vì vậy, nó sẽ **luôn thực thi khi re-render HTML** để kiểm tra.

Ví dụ: Bạn có 2 ô input, khi change ô input 1 thì method được thực thi. Nhưng thực ra, khi bạn change ô input 2, method cũng sẽ thực thi nhé.

Điều này sẽ ảnh hưởng đến perfomance!! Đây chính là lý do sinh ra **Computed**.

Vì vậy, chúng ta sẽ dùng Methods khi:
* Thực thi logic khi bắt các sự kiện (cách 1).
* Chỉ sử dụng cách 2 khi bạn thực sự muốn thực thi method đó mỗi khi re-render HTML.
* Dùng khi đoạn logic lặp lại nhiều lần trong project, không thể dùng 2 thành phần còn lại

## 2. Computed
Computed rất hữu dụng khi thao tác với các dữ liệu đã tồn tại. Nó sẽ định nghĩa ra 1 dữ liệu động, thay đổi khi dữ liệu khác thay đổi. Vì vậy, tên của 1 computed là danh từ chứ không phải động từ giống như methods, và sẽ trả về giá trị (return value). **Computed không cho phép truyền tham số** (vì nó dựa trên các data đã tồn tại mà). 

Cách dùng: computed được dùng như 1 data bình thường trong Vue: `{{ data }}`. Khi đó, Vue sẽ tìm ở methods trước, nếu không có method phù hợp, nó sẽ dùng ở computed.

Như trên mình có nói, computed sẽ khắc phục nhược điểm của methods. Nó sẽ chỉ thực thi khi cần thiết. Thứ đứng sau việc này chính là **cache**. Vì vậy, computed biết chính xác khi nào data liên quan đến nó thay đổi để thực thi, không cần phải check lại mỗi khi re-render HTML nữa.

Vậy chúng ta dùng computed khi:
* Muốn tạo 1 data mới dựa trên các data đã có trước đó
* Muốn thực thi chỉ khi data cụ thể được thay đổi
* Muốn xử lý hoặc sắp xếp nhiều data cùng 1 lúc

## 3. Watcher
Watcher hơi khác với 2 thành phần kia. 
Nếu bạn muốn xử lý khi data thay đổi nhưng lại không muốn trả về 1 dữ liệu nào cả thì watcher là 1 lựa chọn tốt. 

Watcher dùng khi bạn muốn lắng nghe sự thay đổi của 1 data và thực thi khi data đó thay đổi, nhưng không làm thay đổi giá trị data đó. Mình nghĩ nó sẽ hữu ích khi chúng ta validate dữ liệu người dùng nhập vào. 
Trong guide có viết:
> This is most useful when you want to perform asynchronous or expensive operations in response to changing data.

Cách dùng: tên của watcher sẽ **trùng với tên của 1 data** mà nó "theo dõi", không cho phép truyền tham số. Vì vậy nên watcher không được dùng "công khai" ở HTML và 1 watcher không thể "theo dõi" nhiều data cùng lúc được. :)

Vậy watcher nên dùng khi:
* Muốn lắng nghe, theo dõi sự thay đổi của 1 data cụ thể
* Muốn thực thi 1 đoạn logic nào đó khi data đó thay đổi, hoặc thay đổi đến 1 giá trị nào đó (ví dụ như khi validate)

# Tổng kết
Qua các phần trên, mình đã nói qua về sự khác nhau giữa 3 thành phần methods, computed, watcher trong Vuejs. Mình đã cố gắng viết thật ngắn gọn để các bạn nắm được, phân biệt được chúng, và các bạn tự làm thử các ví dụ để thấy rõ ràng hơn sự khác nhau đó nhé. Có gì sai xót, mọi người góp ý cho mình nhé.

Thank you!!

# Tài liệu tham khảo
https://medium.com/notonlycss/the-difference-between-computed-and-watchers-in-vue-js-3579bf91063a

https://medium.com/notonlycss/the-difference-between-computed-and-methods-in-vue-js-9cb05c59ed98

https://css-tricks.com/methods-computed-and-watchers-in-vue-js/