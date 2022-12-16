# Giới thiệu
Chào mọi người, hôm nay mình sẽ lại tiếp tục với `VueJs`. Và trong bài viết này mình sẽ giới thiệu cho các bạn về `vue-virtual-scroller`, một package của `VueJs` giúp cho việc tạo các virtual scroller để loading dữ liệu một cách đơn giản, dễ dàng. Chúng ta bắt đầu tìm hiểu về em nó thôi :D
# Cài đặt
### Npm
Bạn cần copy và paste lệnh sau vào terminal để cài đặt `vue-virtual-scroller`:
```
npm install --save vue-virtual-scroller
```
### CDN
Hoặc bạn có thể nhúng trực tiếp link Cdn dưới đây vào ứng dụng:
```
<script src="https://cdn.jsdelivr.net/npm/vue-virtual-scroller@1.0.0-rc.2/dist/vue-virtual-scroller.umd.min.js"></script>
```
# Sử dụng
Để sử dụng `vue-virtual-scroller`, bạn chỉ cần import và khai báo nó với Vue:
```
import Vue from 'vue'
import VueVirtualScroller from 'vue-virtual-scroller'

Vue.use(VueVirtualScroller)
```
Hoặc sử dụng với từng component cụ thể của `vue-virtual-scroller`:
```
import Vue from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'

Vue.component('RecycleScroller', RecycleScroller)
```
Lưu ý: Đừng quên import cả file css của nó nhé:
```
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
```

`vue-virtual-scroller` cung cấp cho chúng ta các component để sử dụng, đó là: `RecycleScroller`, `DynamicScroller`, `DynamicScrollerItem` và `IdState`

### 1. RecycleScroller
`RecycleScroller` là một virtual scroller mà chỉ render các item đang hiển thị trên danh sách của bạn. Khi người dùng scroll danh sách thì `RecycleScroller` sẽ render lại dữ liệu và sử dụng lại tất cả các component và DOM nodes để có hiệu suất (performance) tốt nhất có thể.
```
<template>
  <RecycleScroller
    class="scroller"
    :items="list"
    :item-size="32"
    key-field="id"
    v-slot="{ item }"
  >
    <div class="user">
      {{ item.name }}
    </div>
  </RecycleScroller>
</template>

<script>
export default {
  props: {
    list: Array,
  },
}
</script>

<style scoped>
.scroller {
  height: 100%;
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
```
**Một số lưu ý:**
* Bạn cần thiết lập kích thước cho **virtual-scroller element** và các **items element** (Vd: thiết lập bằng CSS). Tất cả các item nên có cùng chiều cao (hoặc cùng chiều rộng ở **horizontal mode**) hoặc trừ khi bạn đang sử dụng **variable size mode** (mình sẽ nói đến ở dưới) để tránh các lỗi về hiển thị.
* Nếu item là một object thì scroller cần một trường (Mặc định là `id`) để xác định item đó, nếu bạn muốn dùng một trường khác thì bạn có thể thiết lập lại với thuộc tính `keyField`.
* Bạn không nên sử dụng các component chức năng bên trong `RecycleScroller` vì các component này sẽ được sử dụng lại (performance sẽ bị chậm đi).
* Các list item components cần được reactive tới thuộc tính `item` khi tiến hành update mỗi item mà không tạo lại list item (sử dụng **computed** hoặc **watchers** để theo dõi sự thay đổi này).
* Bạn không cần thiết phải thiết lập `key` trên các list content (nhưng bạn nên làm điều đó trên tất cả các vòng lặp lồng nhau của`<img> element` để tránh các lỗi về loading).
* Các trình duyệt có giới hạn kích thước đối với các thành phần DOM, nghĩa là hiện tại virtual scroller không thể hiển thị hơn ~500k item (tùy thuộc vào trình duyệt).
* Do các DOM element được sử dụng lại cho các item, bạn nên xác định các hover styles bằng các class thay vì sử dụng `:hover` (Vd: `.vue-recycle-scroller__item-view.hover` hay `.hover .some-element-inside-the-item-view`).

**Props**: Các thuộc tính của `RecycleScroller`:
* `items`: danh sách các items mà bạn muốn hiển thị trong scroller.
* `direction` (mặc định là `vertical`): hướng scroll dữ liệu, chiều dọc (`vertical`) hoặc ngang (`horizontal`).
* `itemSize` (mặc định là `null`): thiết lập chiều cao hiển thị (hoặc chiều rộng ở **horizontal mode**). Mặc định là `null`, tức là đang sử dụng `variable size mode`.
* `minItemSize`: kích thước tối thiểu được sử dụng nếu không xác định được chiều cao (hoặc chiều rộng ở **horizontal mode**) của item.
* `sizeField` (mặc định là `size`): thiết lập tên trường được sử dụng để lấy kích thước item trong `variable size mode`.
* `typeField` (mặc định là `type`): thiết lập tên trường được sử dụng để phân biệt các loại component khác nhau trong danh sách. Đối với mỗi loại khác nhau, một nhóm các `recycled items` sẽ được tạo ra.
* `keyField` (mặc định là `id`): thiết lập tên trường được sử dụng để định danh cho một item là object.
* `pageMode` (mặc định là `false`): thiết lập bật/tắt `page mode`.
* `prerender` (mặc định là `0`): thiết lập số lượng item được render trên server bên trong virtual scroller (Server-Side Rendering - SSR).
* `buffer` (mặc định là `200`): thiết lập kích thước đệm (pixel) để render dữ liệu, nghĩa là số item được render sẽ nằm trong vùng hiển thị scroll + buffer.
* `emitUpdate` (mặc định là `false`): thiết lập có lắng nghe `update event` mỗi khi nội dung của virtual scroller được updated không (có thể ảnh hưởng đến performance).

**Events**:
* `resize`: xảy ra khi kích thước của scroller thay đổi.
* `visible`: xảy ra khi scroller hiển thị trên trang.
* `hidden`: xảy ra khi scroller bị ẩn trên trang.
* `update (startIndex, endIndex)`: xảy ra mỗi khi view đc update, để sử dụng thì cần phải thiết lập thuộc tính `emitUpdate` là `true`.

**Default scoped slot props**:
* `item`: item được hiển thị trên view.
* `index`: vị trí của item trong mảng.
* `active`: cho biết view có đang active hay không. Một active view được xem là đang hiển thị và có thể được xác định bởi `RecycleScroller`. Một inactive view không được xem là đang hiển thị và được xem là bị ẩn với người dùng.

**Other Slots**: Bạn có thể sử dụng `RecycleScroller` với các Slot component khác
```
<main>
  <slot name="before"></slot>
  <wrapper>
    <!-- Reused view pools here -->
  </wrapper>
  <slot name="after"></slot>
</main>
```
```
<RecycleScroller
  class="scroller"
  :items="list"
  :item-size="32"
>
  <template #before>
    Hey! I'm a message displayed before the items!
  </template>

  <template v-slot="{ item }">
    <div class="user">
      {{ item.name }}
    </div>
  </template>
</RecycleScroller>
```
**Variable size mode**:
Chế độ này có thể sẽ làm giảm performance khi số lượng item hiển thị nhiều, vì vậy bạn nên cẩn thận khi sử dụng nó. Nếu thuộc tính `itemSize` không được thiết lập hoặc thiết lập là `null` thì virtual scroller sẽ chuyển sang `variable size mode`. Sau đó bạn cần thêm 1 trường size cho item object để thiết lập kích thước cho item đó.
```
const items = [
  {
    id: 1,
    label: 'Title',
    size: 64,
  },
  {
    id: 2,
    label: 'Foo',
    size: 32,
  },
  {
    id: 3,
    label: 'Bar',
    size: 32,
  },
]
```
**Buffer**:
Bạn có thể thiết lập thuộc tính `buffer` (pixel) trên virtual-scroller để mở rộng viewport - vùng được dùng để xác định các item đang hiển thị. Giá trị mặc định của buffer là 200.
```
<RecycleScroller :buffer="200" />
```
**Server-Side Rendering**:
Với thuộc tính `prerender` bạn có thể thiết lập số lượng item được render trên server bên trong virtual scroller:
```
<RecycleScroller
  :items="items"
  :item-size="42"
  :prerender="10"
>
```
### 2. DynamicScroller
`DynamicScroller` hoạt động tương tự như `RecycleScroller`, tuy nhiên nó còn có thể render item mà không cần biết trước kích thước.
```
<template>
  <DynamicScroller
    :items="items"
    :min-item-size="54"
    class="scroller"
  >
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[
          item.message,
        ]"
        :data-index="index"
      >
        <div class="avatar">
          <img
            :src="item.avatar"
            :key="item.avatar"
            alt="avatar"
            class="image"
          >
        </div>
        <div class="text">{{ item.message }}</div>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>

<script>
export default {
  props: {
    items: Array,
  },
}
</script>

<style scoped>
.scroller {
  height: 100%;
}
</style>
```
**Một số lưu ý:**
* Thuộc tính `minItemSize` là bắt buộc để khởi tạo render items.
* `DynamicScroller` sẽ không tự phát hiện sự thay đổi kích thước của mình được, tuy nhiên bạn có thể đặt các giá trị mà có thể ảnh hưởng đến kích thước item với thuộc tính `sizeDependencies` trong `DynamicScrollerItem`.
* Bạn không cần thêm trường `size` trong item.

**Props**: Các thuộc tính của `DynamicScroller` cũng tương tự như `RecycleScroller`.

**Events**: Các event của `DynamicScroller` cũng tương tự như `RecycleScroller`.

**Default scoped slot props**: tương tự như `RecycleScroller`.

**Other slots**: tương tự như `RecycleScroller`.
### 3. DynamicScrollerItem
Component này sẽ bao bọc các item trong `DynamicScroller`và được dùng để xử lý các tính toán về kích thước (size).
**Props**:
* `item` (bắt buộc): thiết lập item sẽ được render trong scroller.
* `active` (bắt buộc): thiết lập view active trong `RecycleScroller`. Nó sẽ ngăn chặn các tính toán kích thước không cần thiết.
* `sizeDependencies`: các giá trị có thể ảnh hưởng đến kích thước của item. Thuộc tính này sẽ theo dõi và nếu một giá trị thay đổi thì kích thước (size) sẽ được tính toán lại. Bạn nên sử dụng thuộc tính này hơn là `watchData`.
* `watchData` (mặc định là `false`): theo dõi sâu các item để tính toán lại kích thước (không khuyến khích sử dụng vì nó sẽ ảnh hưởng đến performance)
* `tag` (mặc định là `div`): element được dùng để render component.
* `emitResize` (mặc định là `false`): thiết lập có lắng nghe `resize event` mỗi khi kích thước được tính toán lại không (có thể ảnh hưởng đến performance).

**Events**
* resize: xảy ra mỗi khi kích thước được tính toán lại, để sử dụng thì cần phải thiết lập thuộc tính `emitResize` là `true`.

### 4. IdState
Đây là một mixin giúp quản lý  dễ dàng các trạng thái cục bộ (local state) trong các component được tái sử dụng lại bên trong `RecycleScroller`, nó có thể thay thế dữ liệu trong các component đã được redenr trong `RecyclScroller`.  `IdState` sẽ cung cấp một đối tượng `idState` tương tự như `$data`, nhưng nó được liên kết với một item theo một trường định danh của item đó (bạn có thể thay đổi trường định danh này bằng `idProp param`).
Một ví dụ về sử dụng `IdState`:
```
<template>
  <div class="question">
    <p>{{ item.question }}</p>
    <button @click="idState.replyOpen = !idState.replyOpen">Reply</button>
    <textarea
      v-if="idState.replyOpen"
      v-model="idState.replyText"
      placeholder="Type your reply"
    />
  </div>
</template>

<script>
import { IdState } from 'vue-virtual-scroller'

export default {
  mixins: [
    IdState({
      // You can customize this
      idProp: vm => vm.item.id,
    }),
  ],

  props: {
    // Item in the list
    item: Object,
  },

  // This replaces data () { ... }
  idState () {
    return {
      replyOpen: false,
      replyText: '',
    }
  },
}
</script>
```
**Parameters**:
* `idProp` (mặc định là `vm => vm.item.id`): thiết lập trường định danh cho item trong component.
# Demo
Bạn có thể xem các ví dụ demo sử dụng `vue-virtual-scroller`[ở đây](https://akryum.github.io/vue-virtual-scroller/#/recycle).
# Kết luận
Qua bài viết này mình đã giới thiệu cho các bạn về `vue-virtual-scroller`, một package dùng để tạo các virtual scroller trong ứng dụng VueJs một cách nhanh chóng, đơn giản, dễ sử dụng và tùy biến.

Hi vọng bài viết này sẽ có ích cho các bạn :D
# Tham khảo
https://github.com/Akryum/vue-virtual-scroller