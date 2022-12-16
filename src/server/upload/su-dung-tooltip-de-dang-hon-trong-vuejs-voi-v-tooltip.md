# Giới thiệu
Chào mọi người, mình lại trở lại đây :D

Như mọi người cũng đã biết `Tooltip` là một thứ đã quá quen thuộc và quan trọng đối với lập trinh web. Đặc biệt là khi dùng để hiển thị các chú thích, các tiêu đề, hay nội dung dài mà bạn không thể hiển thị đầy đủ trên UI để tránh việc vỡ UI của website khi responsive. Với `Html` bạn chỉ cần đưa nội dung  hiển thị vào thuộc tính `title` của thẻ là bạn đã có một tooltip đơn giản và nội dung này sẽ hiển thị ra khi bạn hover vào thẻ đó. Tuy nhiên dùng mặc định như vậy thì Ui sẽ không được đẹp cho lắm, nhiều lúc người dùng sẽ yêu cầu hiển thị `tooltip` với UI đẹp hơn, đó chính là lúc bạn cần custom lại. Tuy nhiên việc custom bằng tay sẽ gây tốn thời gian không đáng có, nhất là đối với các dự án yêu cầu gấp, chính vì vậy các thư viện hỗ trợ việc custom `tooltip` đã ra đời như `JqueryUI`, `Bootstrap`,... hỗ trợ tối đa cho các lập trình viên.

Trong `VueJs` cũng vậy, bạn có thể sử dụng các thư viện kể trên. Tuy nhiên có một package dành riêng cho `VueJs` để sử dụng `Tooltip` một cách dễ dàng, tiện lợi, dễ tùy biến hơn, đó là `v-tooltip`. Trong bày viết này chúng ta cùng tìm hiểu nó nhé.

# Cài đặt
### Npm
Bạn cần copy và paste lệnh sau vào terminal để cài đặt `vue-tooltip`:
```
npm install --save v-tooltip
```
### CDN
```
<script src="https://unpkg.com/v-tooltip"></script>
```
# Sử dụng
Sau khi cài đặt `v-tooltip`, bạn chỉ cần import nó vào ứng dụng của bạn.
```
import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
```
Hoặc có thể sử dụng trực tiếp trong từng `component`:
```
import Vue from 'vue'
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

Vue.directive('tooltip', VTooltip)
Vue.directive('close-popover', VClosePopover)
Vue.component('v-popover', VPopover)
```
Sau đó bạn chỉ cần truyền nội dung vào thuộc tính `v-tooltip` là bạn đã có một tooltip đơn giản như sau:
{@embed: https://jsfiddle.net/amjsrgux/1/}
### Thay đổi vị trí tooltip 
Bạn có thể thay đổi vị trí của `tooltip` một cách dễ dàng bằng cách thêm các thuộc tính nối sau `v-tooltip`, ví dụ như: `v-tooltip.bottom`, `v-tooltip.bottom-start`, `v-tooltip.left`,...

Các thuộc tính khả dụng: `auto`, `auto-start`, `auto-end`, `top`, `top-start`, `top-end`,
`right`, `right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`.

### Sử dụng Object
Bạn có thể dùng Object để thiết lập cho `v-tooltip`:
```
<button v-tooltip="{ content: 'You have ' + count + ' new messages.' }">
```
Với việc sử dụng Object bạn có thể thêm các class custom vào để có thể thay đổi css mặc định của `tooltip`:
```
<button v-tooltip="{ content: 'You have ' + count + ' new messages.', classes: ['custom-1', 'custom-2'] }">
```
Một số tùy chọn nổi bật của `v-tooltip`:
```
<button v-tooltip="options">
```
* `content`: Nội dung hiển thị của `tooltip`. Có thể là một function trả về một nội dung (text) hoặc trả về một Promise.
* `classes`: Thêm các class custom vào tooltip.
* `html`: Boolean - Cho phép hiển thị Html trên tooltip hay không.
* `delay`: Thiết lập độ trễ cho việc hiện/ẩn tooltip (`{ show: 500, hide: 100 }`), đơn vị là ms.
* `trigger`: Định nghĩa các sự kiện kích hoạt tooltip (`hover`, `click`, `focus` hoặc `manual`). Có thể thiết lập nhiều sự kiện bằng cách ghi liên tiếp các sự kiện cách nhau bởi 1 khoảng trắng (Ex: `'focus hover'`). Lưu ý rằng `manual` không thể kết hợp với các sự kiện khác.
* `show`: Boolean - Ẩn/hiện tooltip khi sử dụng sự kiện manual (`{trigger: 'manual'}`)
* `autoHide`: Boolean - Tự động đóng tooltip khi mouseover.
* `loadingClass`: Thêm class cho tooltip khi nội dung đang được tải.
* `loadingContent`: tương tự như `content`, nội dung ở tùy chọn này sẽ được hiển thị khi tooltip đang được tải.
* ... (bạn có thể xem thêm các tùy chọn khác ở [đây](https://github.com/Akryum/v-tooltip#other-options))

### Async content
Như mình đã nói ở trên, tùy chọn `content` có thể là một Promise để tải nội dung hiển thì cho `tooltip` từ một server nào đó về:
```
<button
  v-tooltip="{
    content: asyncMethod(),
    loadingContent: 'Please wait...',
    loadingClass: 'content-is-loading',
  }"
>Hover me!</button>
```
### Manual trigger
Bạn có thể giữ cho tooltip luôn hiển thị bằng cách sử dụng tùy chọn `trigger` và `show`:
{@embed: https://jsfiddle.net/amjsrgux/2/}
### Tooltip auto-hiding
Mặc định khi bạn hover hay click vào bên trong `tooltip` thì nó sẽ tự động ẩn đi, để tắt chức năng này bạn cần thiết lập tùy chọn `autoHide` thành `false`:
{@embed: https://jsfiddle.net/amjsrgux/3/}

### Component của v-tooltip
Bạn có thể hiển thị các `components` bên trong `tooltip` bằng cách sử dụng `v-popover component` như sau:
{@embed: https://jsfiddle.net/amjsrgux/6/}

**Một số thuộc tính của `Popover Component`:**
* `open`: Boolean - Cho phép ẩn hoặc hiện `popover`
* `delay`: tương tự như `v-tooltip` ở trên
* `trigger`: tương tự như `v-tooltip` ở trên
* `autoHide`: Ẩn `popover` nếu click ra bên ngoài
* `openGroup`: Nếu tùy chọn này được thiết lập thì sẽ đóng tất cả các `popover` có giá trị `open-group` khác hiện tại hoặc các `popover` chưa thiết lập tùy chọn này.
* `penClass`: Thêm class vào `popover` khi nó được mở
* `handleResize`: Tự động cập nhật vị trí của `popover` khi kích thước của element bị thay đổi
* ... (bạn có thể xem thêm các tùy chọn khác ở [đây](https://github.com/Akryum/v-tooltip#popover-component-reference))

**Một số sự kiện (event) của `Popover Component`:**
* `update:open`(Boolean): Cho phép bạn sử dụng `.sync` modifier trên thuộc tính `open`
* `apply-show` - Emitted sau khi `delay` 
* `apply-hide` - Emitted after the hide delay hiển thị `popover`
* `auto-hide` - Emitted khi `popover` bị đóng nếu click ra ngoài.
* `close-directive` - Emitted khi `popover` bị đóng bằng `Close directive`.
* `close-group` - Emitted khi `popover` bị đóng  bởi một `popover` có giá trị `open-group` khác được mở.
* `resize` - Emitted khi kích thước của `content` thay đổi, bạn cần thiết lập thuộc tính `handleResize` thành `true`.
* ....  (bạn có thể xem thêm các sự kiện khác ở [đây](https://github.com/Akryum/v-tooltip#popover-component-reference))

### Close directive
Sử dụng `v-close-popover` directive trên một phần tử bên trong `popover` để đóng `popover` khi click phần tử đó:
{@embed: https://jsfiddle.net/amjsrgux/7/}

Bạn có thể thiết lập `v-close-popover` thành `true` hoặc `false` để bật hoặc tắt directive này (mặc định là `true`):
```
<button v-close-popover="false">Close</button>
<button v-close-popover="true">Close</button>
```
Bạn có thể đóng tất cả `popover` trong trang với modifier `all`:
```
<a v-close-popover.all>Close All</a>
```

Ngoài ra, các bạn có thể xem thêm nhiều ví dụ khác về `v-tooltip` [ở đây](https://akryum.github.io/v-tooltip/#/)
# Kết luận
Qua bài viết mình đã giới thiệu cho các bạn `v-tooltip`, đây lại là một package đơn giản nhưng cực kì hữu dụng nữa trong `VueJs`, package này sẽ giúp cho các bạn khi làm việc với `tooltip` và `popover` sẽ trở nên đơn giản hơn rất nhiều. 

Hi vọng bài viết này sẽ có ích cho các bạn, nhất là những bạn mới tìm hiểu về `VueJs` :D
# Tham khảo
https://github.com/Akryum/v-tooltip