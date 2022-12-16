Series Vue Tips vẫn tiếp tục nha mn
link bài trước mn nếu có hứng thú thì đọc [tại đây n](https://viblo.asia/p/10-vue-tips-ORNZqXQLK0n)ha

## 11. Looping Over a Range in Vue
Lệnh `v-for` cho phép chúng ta lặp qua một Mảng, nhưng nó cũng cho phép chúng ta lặp qua một dải 
```html
<template>
  <ul>
    <li v-for="n in 5">Item #{{ n }}</li>
  </ul>
</template>
```
Output:
```html
Item #1
Item #2
Item #3
Item #4
Item #5
```
Khi chúng ta sử dụng `v-for` với một phạm vi, nó sẽ bắt đầu từ 1 và kết thúc trên số mà chúng ta chỉ định.
## 12. watch bất cứ thứ gì trong component
Bất kỳ thứ gì trong component của bạn có phản ứng đều có thể được đặt trong watch:
```js
export default {
  computed: {
    someComputedProperty() {
      // Update the computed prop
    },
  },
  watch: {
    someComputedProperty() {
      // Do something when the computed prop is updated
    }
  }
};
```
Bạn có thể:

* computed props
* props
* giá trị lồng nhau
 
Nếu bạn đang sử dụng API tổng hợp, bạn có thể xem bất kỳ giá trị nào, miễn là đó là một `ref` hoặc `reactive` object.

## 13. Stealing Prop Types
Thường thì tôi thấy rằng tôi đang sao chép các loại prop từ một component con, chỉ để sử dụng chúng trong một component cha. Nhưng tôi đã phát hiện ra rằng stealing các loại prop đó tốt hơn nhiều so với việc chỉ sao chép chúng.

Ví dụ: Có một Icon thành phần đang được sử dụng trong thành phần này:
```html
<template>
  <div>
    <h2>{{ heading }}</h2>
    <Icon
      :type="iconType"
      :size="iconSize"
      :colour="iconColour"
    />
  </div>
</template>
```
Để làm cho điều này hoạt động, chúng ta cần thêm các loại prop types chính xác, sao chép từ Icon component:
```js
import Icon from './Icon';
export default {
  components: { Icon },
  props: {
    iconType: {
      type: String,
      required: true,
    },
    iconSize: {
      type: String,
      default: 'medium',
      validator: size => [
        'small',
        'medium',
        'large',
        'x-large'
      ].includes(size),
    },
    iconColour: {
      type: String,
      default: 'black',
    },
    heading: {
      type: String,
      required: true,
    },
  },
};
```

Và khi các loại prop types của Icon component được cập nhật, bạn có thể chắc chắn rằng mình sẽ quên quay lại component này và cập nhật chúng. Theo thời gian, các chiếc bug sẽ xuất hiện khi các loại prop types cho compnent này bắt đầu biến mất khỏi các loại prop types trong Icon component.

Vì vậy, đó là lý do tại sao chúng ta sẽ steal chúng thay vào đó:
```js
import Icon from './Icon';
export default {
  components: { Icon },
  props: {
    ...Icon.props,
    heading: {
      type: String,
      required: true,
    },
  },
};
```
Nó không cần phải trở nên phức tạp hơn thế!

Ngoại trừ trong ví dụ của chúng ta, có thêm "biểu tượng" vào đầu mỗi tên prop. Vì vậy, chúng ta sẽ phải làm thêm một số công việc để điều đó xảy ra:
```js
import Icon from './Icon';

const iconProps = {};

// Do some processing beforehand
Object.entries(Icon.props).forEach((key, val) => {
  iconProps[`icon${key.toUpperCase()}`] = val;
});

export default {
  components: { Icon },
  props: {
    ...iconProps,
    heading: {
      type: String,
      required: true,
    },
  },
};
```
Bây giờ, nếu các loại prop types trong Icon component được sửa đổi, thành phần của chúng ta sẽ luôn cập nhật.

Nhưng điều gì sẽ xảy ra nếu một loại prop types được thêm vào hoặc loại bỏ khỏi Ico component Để giải quyết những trường hợp đó, chúng ta có thể sử dụng `v-bind` và một phương án được tính toán để giữ cho mọi thứ luôn dynamic.

## 14. Phát hiện các click bên ngoài một phần tử (hoặc bên trong)
Thỉnh thoảng, ta cần phát hiện xem một lần click xảy ra bên trong hay bên ngoài của một phần tử cụ thể. Đây là phương pháp thường được sử dụng :
```js
window.addEventListener('mousedown', e => {
  // Get the element that was clicked
  const clickedEl = e.target;

  // `el` is the element you're detecting clicks outside of
  if (el.contains(clickedEl)) {
    // Clicked inside of `el`
  } else {
    // Clicked outside of `el`
  }
});
```
## 15. Recursive slots

Một lần, tôi quyết định xem liệu tôi có thể tạo một componentn `v-for` chỉ bằng cách sử dụng template hay không. 

Đây là thành phần trông như này :

```js
<!-- VFor.vue -->
<template>
    <div>
        <!-- Render the first item -->
    {{ list[0] }}
        <!-- If we have more items, continue!
                 But leave off the item we just rendered -->
    <v-for
      v-if="list.length > 1"
            :list="list.slice(1)"
        />
    </div>
</template>
```
Nếu chúng ta muốn làm điều này với các scoped slots - và tại sao chúng ta lại không ?! - chỉ cần một vài chỉnh sửa:
```html
<template>
  <div>
    <!-- Pass the item into the slot to be rendered -->
    <slot v-bind:item="list[0]">
      <!-- Default -->
      {{ list[0] }}
    </slot>

    <v-for
      v-if="list.length > 1"
      :list="list.slice(1)"
    >
      <!-- Recursively pass down scoped slot -->
      <template v-slot="{ item }">
        <slot v-bind:item="item" />
      </template>
    </v-for>
  </div>
</template>
```
Đây là cách thành phần này được sử dụng:
```html
<template>
  <div>
    <!-- Regular list -->
    <v-for :list="list" />

    <!-- List with bolded items -->
    <v-for :list="list">
      <template v-slot="{ item }">
        <strong>{{ item }}</strong>
      </template>
    </v-for>
  </div>
</template>
```

## 16. Component Metadata
Không phải mọi thông tin bạn thêm vào một component đều là state. Đôi khi bạn cần thêm một số metadata để cung cấp thêm thông tin cho các thành phần khác.

Ví dụ: nếu bạn đang xây dựng một loạt các tiện ích con component cho một trang tổng quan phân tích như Google Analytics:

Nếu bạn muốn layout biết mỗi tiện ích con sẽ chiếm bao nhiêu cột, bạn có thể thêm cột đó trực tiếp trên thành phần dưới dạng metadata:
```js
export default {
  name: 'LiveUsersWidget',
  // 👇 Just add it as an extra property
  columns: 3,
  props: {
    // ...
  },
  data() {
    return {
      //...
    };
  },
};
```
Bạn sẽ tìm thấy metadata này dưới dạng thuộc tính trên thành phần:
```js
import LiveUsersWidget from './LiveUsersWidget.vue';
const { columns } = LiveUsersWidget;
```
Bạn cũng có thể truy cập siêu dữ liệu từ bên trong thành phần thông qua thuộc tính đặc biệt `$options`:
```js
export default {
  name: 'LiveUsersWidget',
  columns: 3,
  created() {
    // 👇 `$options` contains all the metadata for a component
    console.log(`Using ${this.$options.metadata} columns`);
  },
};
```
Chỉ cần lưu ý rằng metadata này giống nhau đối với mỗi phiên bản của thành phần và không mang tính phản ứng.

Các mục đích sử dụng khác cho việc này bao gồm (nhưng không giới hạn):

* Giữ số phiên bản cho individual components
* Flag tùy chỉnh cho các tool xây dựng để xử lý các thành phần khác nhau
* Thêm các tính năng tùy chỉnh vào các thành phần ngoài các đạo cụ được props, data, watchers, ...
* và nhiều hơn nữa mà mình chưa nhớ ra


## 17. Multi-file single-file components
Đây là một tính năng ít được biết đến của SFC.

Bạn có thể nhập tệp giống như cách bạn làm với tệp HTML thông thường:
```html
<!-- A "single" file component -->
<template src="./template.html"></template>
<script src="./script.js"></script>
<style scoped src="./styles.css"></style>
```
Nếu bạn cần chia sẻ styles, tài liệu hoặc bất kỳ thứ gì khác, điều này có thể thực sự hữu ích. Cũng hoàn hảo cho tệp thành phần siêu dài đó khiến ngón tay của bạn bị mất khỏi tất cả các thao tác cuộn =))

Đây là bản demo hoạt động của nó trong hoạt động: https://codesandbox.io/s/interesting-rosalind-9wwmr?file=/src/components/HelloWorld.vue

## 18. Các component có thể được tái sử dụng
Các thành phần có thể tái sử dụng không cần phải là những thứ lớn hoặc phức tạp.

Có thể thường sử dụng cho các thành phần nhỏ và ngắn có thể tái sử dụng.

Vì tôi không viết lại mã này khắp nơi nên việc cập nhật nó trở nên dễ dàng hơn nhiều và tôi có thể đảm bảo rằng mọi OverflowMenu đều trông và hoạt động hoàn toàn giống nhau - bởi vì chúng giống nhau!
```html
<!-- OverflowMenu.vue -->
<template>
  <Menu>
    <!-- Add a custom button to trigger our Menu -->
    <template #button v-slot="bind">
      <!-- Use bind to pass click handlers,
           a11y attributes, etc. -->
      <Button v-bind="bind">
        <!-- Use our own "..." icon and no text
             for this button -->
        <template #icon>
          <svg src="./ellipsis.svg" />
        </template>
      </Button>
    </template>
  </Menu>
</template>
```

Ở đây chúng tôi đang sử dụng một Menu thành phần, nhưng thêm '...' vào nút kích hoạt nó mở.

Có vẻ như không đáng để tạo ra một thành phần có thể tái sử dụng từ điều này, bởi vì nó chỉ có một vài dòng. Chúng ta không thể chỉ thêm biểu tượng mỗi khi chúng ta muốn sử dụng một biểu tượng Menu như thế này?

Nhưng điều này OverflowMenu sẽ được sử dụng hàng chục lần, và bây giờ nếu chúng ta muốn cập nhật biểu tượng hoặc hành vi của nó, chúng ta có thể làm điều đó rất dễ dàng. Và sử dụng nó cũng đơn giản hơn nhiều!

```html
<template>
  <OverflowMenu
    :menu-items="items"
    @click="handleMenuClick"
  />
</template>
```

## 19. Calling a Method from Outside of the Component
Bạn có thể gọi một phương thức từ bên ngoài của một thành phần bằng cách cung cấp cho nó một `ref`:
```html
<!-- Parent.vue -->
<template>
  <ChildComponent ref="child" />
</template>
```
```js
// Somewhere in Parent.vue
this.$refs.child.method();
```

Thỉnh thoảng "các phương pháp hay nhất" không phù hợp với những gì bạn đang làm và bạn cần một escape hatch như thế này.

Thông thường, chúng tôi giao tiếp giữa các thành phần bằng cách sử dụng đạo cụ và sự kiện. Đạo cụ được gửi xuống các component con và các sự kiện được phát ngược trở lại các component cha.
```html
<template>
  <ChildComponent
    :tell-me-what-to-do="someInstructions"
    @something-happened="hereIWillHelpYouWithThat"
  />
</template>
```

Tuy nhiên, thỉnh thoảng, bạn có thể rơi vào tình huống mà bạn cần parent của mình kích hoạt một phương thức trong component con. Đây là nơi chỉ chuyển props xuống cũng không hoạt động.

Bạn có thể chuyển một boolean xuống và để thành phần con xem nó:
```html
<!-- Parent.vue -->
<template>
  <ChildComponent :trigger="shouldCallMethod" />
</template>
```
```js
// Child.vue
export default {
  props: ['trigger'],
  watch: {
    shouldCallMethod(newVal) {
      if (newVal) {
        // Call the method when the trigger is set to `true`
        this.method();
      }
    }
  }
}
```
Điều này hoạt động tốt, nhưng chỉ trong lần gọi đầu tiên. Nếu bạn cần kích hoạt điều này nhiều lần, bạn phải clean và đặt lại state. Logic sau đó sẽ như thế này:

Thành phần chính chuyển `true` sang trigger prop
Watch được kích hoạt và component con gọi phương thức
Thành phần con phát ra một sự kiện để cho thành phần chính biết rằng phương thức đã được kích hoạt thành công
Thành phần chính đặt trigger lại trở lại `false`, vì vậy chúng tôi có thể thực hiện lại tất cả
Thay vào đó, nếu chúng ta đặt một `ref` trong thành phần con, chúng ta có thể gọi phương thức đó trực tiếp:
```html
<!-- Parent.vue -->
<template>
  <ChildComponent ref="child" />
</template>
```
```js
// Somewhere in Parent.vue
this.$refs.child.method();
```
Đúng, chúng ta đang phá vỡ quy tắc "props down, event up" và chúng ta đang phá vỡ tính đóng gói, nhưng nó rõ ràng và dễ hiểu hơn rất nhiều nên rất đáng giá!