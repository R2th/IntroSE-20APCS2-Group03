### Phân trang.
- Một style phân trang đơn giản trong single page application, theo khuynh hướng giao diện bootstrap, rất đơn giản về mặt sử dụng, mình xin đề xuất: [vuejs-paginate](https://github.com/lokyoung/vuejs-paginate)
### Cách khởi tạo.
- Có 3 cách để import vào:
NPM
Dùng npm package.

```
$ npm install vuejs-paginate --save
Register the component.
```

Theo ES5
```
var Paginate = require('vuejs-paginate')
Vue.component('paginate', Paginate)
```
Theo ES6
```
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)
```
Theo cách import source file:
`Vue.component('paginate', VuejsPaginate)`
### Cách dùng:
- Quá đơn giản phải không nào, các props đều rất rõ ràng ý nghĩa:
```
<paginate
  :page-count="20"
  :click-handler="functionName"
  :prev-text="'Prev'"
  :next-text="'Next'"
  :container-class="'className'">
</paginate>
```
- Cách dùng đầy đủ hơn:
```
<template>
  <paginate
    :page-count="20"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'">
  </paginate>
</template>

<script>
export default {
  methods: {
    clickCallback (pageNum) => {
      console.log(pageNum)
    }
  }
}
</script>

<style lang="css">
.pagination {
}
.page-item {
}
</style>
```
- Ngoài ra còn có thể dùng v-model để binding value tự động change page:
```
<template>
  <paginate
    v-model="page"
    :page-count="20"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'">
  </paginate>
</template>

<script>
export default {
  data() {
    return {
      page: 10
    }
  }
}
</script>
```
### Toàn bộ props:
```
page-count	Number	Total count of pages. required
page-range	Number	Range of pages which displayed. default: 3 
(Note: It is recommended to use an odd number, so that the same number of pages are displayed before and after the active page. If using an even number, there will be one more page number before the active page than after the current page)
margin-pages	Number	The number of displayed pages for margins. default: 1
prev-text	String	Text for the previous button. You can use HTML here. default: Prev
next-text	String	Text for the next button. You can use HTML here. default: Next
break-view-text	String	Text for the break view indicator. default: ...
initial-page 
Deprecated after v2.0.0	Number	The index of initial page which selected. default: 0
force-page	Number	The page number of overridden selected page.
click-handler	Function	The method to call when page clicked. Use clicked page number as parameter.
container-class	String	CSS class name for the layout.
page-class	String	CSS class name for tag li of each page element.
page-link-class	String	CSS class name for tag a of each page element.
prev-class	String	CSS class name for tag li of previous element.
prev-link-class	String	CSS class name for tag a of previous element.
next-class	String	CSS class name for tag li of next element.
next-link-class	String	CSS class name for tag a of next element.
break-view-class	String	CSS class name for tag li of break view element.
break-view-link-class	String	CSS class name for tag a of break view element.
active-class	String	CSS class name for active page element. default: active
disabled-class	String	CSS class name for disabled page element. default: disabled
no-li-surround	Boolean	Support no li tag surround a tag. default: false
first-last-button	Boolean	Support buttons to turn to the first and last page. default: false
first-button-text	String	Text for first button. (Not visible when first-last-button is false. You can use HTML here.) default: 'First'
last-button-text	String	Text for last button. (Not visible when first-last-button is false. You can use HTML here.) default: 'Last'
hide-prev-next	Boolean	Hide prev/next button when there is no previous or next page. default: false
```

### Happy coding :D