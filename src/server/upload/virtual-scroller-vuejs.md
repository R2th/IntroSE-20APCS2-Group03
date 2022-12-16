## **1. Giới thiệu**
Virtual Scroll hiển thị một danh sách ảo, "vô hạn". Một mảng bản ghi được chuyển tới cuộn ảo chứa dữ liệu để tạo mẫu cho. Mẫu được tạo cho mỗi bản ghi, được gọi là ô, có thể bao gồm các mục, đầu trang và chân trang.
Vì lý do hiệu suất, Virtual Scroll sẽ chỉ tạo các phần tử DOM hiển thị cho người dùng. Khi người dùng cuộn lên hoặc cuộn ngược lại, nó sẽ tự động thêm và hủy các phần tử, dẫn đến chỉ tạo ra các phần tử DOM hiển thị cho người dùng. Điều này chắc chắn sẽ cải thiện hiệu suất trang web của bạn tăng lên đáng kể.
Xin chào mọi người nay em/mình sẽ giới thiệu một package của Vuejs `vue-virtual-scroller` giúp cho việc tạo các virtual scroller để loading dữ liệu một cách đơn giản, dễ dàng.
## 2. Cài đặt
* npm : npm install --save vue-virtual-scroller
* Link cdn : https://cdn.jsdelivr.net/npm/vue-virtual-scroller@1.0.0-rc.2/dist/vue-virtual-scroller.umd.min.js
## 3. Sử dụng
Để sử dụng vue-virtual-scroller, bạn chỉ cần import và khai báo nó với Vue:
```
import Vue from 'vue'
import VueVirtualScroller from 'vue-virtual-scroller'

Vue.use(VueVirtualScroller)
```

Hoặc sử dụng với từng component cụ thể của vue-virtual-scroller:
```
import Vue from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'

Vue.component('RecycleScroller', RecycleScroller)
```

Lưu ý: Đừng quên import cả file css của nó nhé:
```
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
```

vue-virtual-scroller cung cấp cho chúng ta các component để sử dụng, đó là: RecycleScroller, DynamicScroller, DynamicScrollerItem, IdState

## 4. Demo
Bạn có thể xem các ví dụ demo sử dụng vue-virtual-scroller : https://akryum.github.io/vue-virtual-scroller/#/recycle

## 5. Hạn chế của Vitual Scroll
* Thay đổi kích thước cột, đặt chiều rộng cho các cột riêng lẻ, điều này ảnh hưởng đến phép tính được sử dụng để chọn đúng trang khi cuộn.
* Phân nhóm, mất thêm thời gian để tách các mục thô thành định dạng được cung cấp.
* Định dạng ngày, cần thêm thời gian để chuyển đổi định dạng ngày.
* Định dạng ngày với sắp xếp, ở đây, định dạng ngày giờ đầy đủ bổ sung nên được đóng khung để thực hiện sắp xếp cùng với định dạng ngày được cung cấp làm chậm hiệu suất.

## 6. Tài liệu tham khảo
https://vi.vuejs.org/v2/guide/render-function.html#Node-tree-va-virtual-DOM
https://github.com/Akryum/vue-virtual-scroller
https://viblo.asia/p/tim-hieu-ve-virtual-scroll-YWOZrVENZQ0
https://viblo.asia/p/tao-virtual-scroller-loading-du-lieu-trong-vuejs-voi-vue-virtual-scroller-ORNZq4oqK0n