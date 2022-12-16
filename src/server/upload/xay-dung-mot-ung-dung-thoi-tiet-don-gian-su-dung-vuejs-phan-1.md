# Tổng quan
Cách tốt nhất để trở nên thuần thục một ngôn ngữ hay một framework là bắt tay vào một project nho nhỏ mà từ đó chúng ta có thể biến đổi những lý thuyết mình vừa học thành thực tiễn. Từ suy nghĩ này, mỗi khi tìm được một framework mới, mình đều bắt tay ngay vào làm. Và dự án lần này mình phát triển trên **VueJS**.

> **Live demo : https://weather-app-210104.firebaseapp.com**

## Vuejs là gì ?
**Vuejs** là một trong những **framework**  frontend javascript cũng đang được ưu chuộng để xây dựng giao diện người dùng.Nó tập trung vào lớp "View" trong mô hình MVC mà chúng ta đang sử dụng. Vue.js được đánh giá là một framework javascript nhỏ gọn hơn các framework javascript khác như Angular. Tuy nhỏ gọn nhưng Vuejs đáp ứng đủ nhưng tiêu chí để xây dựng những ứng dụng một trang (SPA - Single-Page Applications) với độ phức tạp cao.

# Bắt đầu
## Cài đặt Vuejs

Chúng ta sử dụng Vue CLI để tạo một ứng dụng mới sử dụng webpack template. Nếu bạn chưa cài Vue CLI thì sử dụng câu lệnh như sau:
```
$ npm install -g @vue/cli
```

Sau khi cài đặt xong CLI, ta tạo một project mới với webpack template.
```
$ vue create <project-name>
```

Để xây dựng giao diện cho ứng dụng, chúng ta cần 2 packages VueX và GSAP (Thư viện Javascript dùng để xử lý animation)
```
$ npm install --save vuex gsap
```

### Khởi tạo store

Với một dự án bằng Vuejs, chúng ta nên tách các module để lưu giữ các action và mutation. Module sinh ra để quản lý các các state của ứng dụng. Mà bạn chắc tự hỏi ở phần này, cả ứng dụng mà sử dụng có 1 module thì tạo ra làm gì, viết thẳng vào file **main.js** cho nhanh. Như mình đã nói ở trên, chính từ những ứng dụng nhỏ nhỏ ta có thể học được nhiều thứ và đây cũng là cách chúng ta tập luyện để có thể viết được ứng dụng lớn hơn sau này.

> src/store/modules/ui.js
```javascript
const types = {
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR' 
}

// initial state
const state = {
  sidebarOpen: false
}

// getters
const getters = {
  sidebarOpen: state => state.sidebarOpen
}

// actions
const actions = {
  toggleSidebar ({ commit, state }) {
    commit(types.TOGGLE_SIDEBAR)
  }
}

// mutations
const mutations = {
  [types.TOGGLE_SIDEBAR] (state) {
    state.sidebarOpen = !state.sidebarOpen
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
```

UI module nhìn rất dễ hiểu phải không. Ta có một state **sidebarOpen** trang thái mặc định là false. State sẽ được thay đổi khi mutation **TOGGLE_SIDEBAR** được action **toggleSidebar** goi tới. Sau khi ta viết xong ui.js, ta cần khai báo với Vuex.

> src/store/index.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        ui
    },
    strict: debug
})

```
Sau này nếu mở rộng ứng dụng, ta chỉ khởi tạo các moduls và khai báo vào đây, nhìn sạch sẽ hơn nhiều đúng không. Giờ ta cần khai báo Vuex với Vue.

>src/main.js
```javascript
import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: {
    App
  }
})
```


### Khởi tạo component
> src/App.vue
> 
```javascript
<template>
  <div>
    <div :class="$style.container">
    </div>
    <sidebar/>
    <sidebar-toggle/>
  </div>

</template>

<script>
import Sidebar from '@/components/SideBar.vue'
import SidebarToggle from '@/components/SidebarToggle.vue'
export default {
  name: 'app',
  components: {
    Sidebar,
    SidebarToggle
  }
}

</script>

<style>
:root {
  --accent-color: #ffc107;
  --primary-color: #673ab7;
  --dark-color: #2e294e;
}

* {
  box-sizing: border-box;
}
</style>

<style module>
.container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: var(--primary-color);
}
</style>
```

Trong App.vue, ta khai báo 2 component khác là Sidebar và SidebarToggle.
> src/components/SidebarToggle.vue
> 
```javascript
<template>
    <button :class="[open ? $style.active : '', $style.button]" @click="handleClick">
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
        </svg>
    </button>
</template>

<script>
import { TweenMax, Power4 } from 'gsap'
export default {
    name: 'sidebar-toggle',
    computed: {
        open () {
            return this.$store.state.ui.sidebarOpen
        }
    },
    methods: {
        handleClick () {
            this.$store.dispatch('toggleSidebar')
        }
    }
}
</script>

<style module>
.button {
  z-index: 20;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 0;
  height: 50px;
  width: 50px;
  border: 3px solid transparent;
  border-radius: 50%;
  background-color: transparent;
  color: var(--dark-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  transition: transform 300ms ease-out, border-color 300ms ease-out;
}
.button svg {
  height: 100%;
  width: 100%;
  fill: var(--accent-color);
  transition: fill 300ms ease-out;
}
.button:focus {
  outline: none;
  border-color: var(--accent-color);
}
.active {
  transform: rotate(45deg);
}
.active svg {
  fill: var(--primary-color);
}
.active:focus {
  border-color: var(--primary-color);
}
</style>

```

Vậy SidebarToggle sẽ là button có nhiệm vụ bấm để hiện thị Sidebar thông qua việc gọi action **toggleSidebar**.

Như vậy ta được một button như trong hình: 
![](https://images.viblo.asia/93687fe0-d176-4887-9123-f1a265283419.gif)

Và cuối cùng ta tạo thêm SideBar.vue trong thư mục components
```javascript
<template>
    <div :class="$style.sidebar" />
</template>

<script>
import { TweenMax, Power4 } from 'gsap'
export default {
    name: 'sidebar',
    mounted () {
        TweenMax.set(this.$el, {
            x: this.$el.offsetWidth
        })
    },
    computed: {
        open () {
            return this.$store.state.ui.sidebarOpen
        }
    },
    watch: {
        open: function (open) {
            const dX = open ? 0 : this.$el.offsetWidth
            TweenMax.to(this.$el, 0.6, {
                x: dX,
                ease: Power4.easeOut
            })
        }
    }
}
</script>

<style module>
.sidebar {
  z-index: 20;
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  min-height: 100vh;
  max-width: 90vw;
  background-color: var(--accent-color);
}
</style>
```

Khi sidebar được **mounted**, ta sử dụng thư viện GSAP để set thuộc tính x bằng với chiều dài của Sidebar. Và cũng giống như SidebarToggle ta truy cập đến thuộc tính **sidebarOpen** trong store. Để biết thêm về GSAP bạn có thể đọc thêm tại [đây](https://greensock.com/docs) 


Và cuối cùng, ta tạo một watcher, như tên gọi để kiểm tra xem giá trị open có được thay đổi, nếu bị thay đổi sẽ gọi đến function mà ta đã khai báo ở đây. Ta có thể hiểu như sau: "Khi người dùng click vào SidebarToggle, Vue sẽ gọi đến action **toggleSidebar** thực hiện mutation **TOGGLE_SIDEBAR** biến giá trị **sidebarOpen** từ true thành false và ngược lại. Ở Sidebar component, ta luôn theo dõi bất kì hoạt động nào của **sidebarOpen** bằng computed với thuộc tính là *open*. Bất kì thay đổi nào của sidebarOpen đều kích hoạt computed thay đổi thuộc tính *open*. Và với watcher, bất kì thay đổi của thuộc tính thì đều sẽ gọi đến hàm ta đã khai báo".

Ta sẽ được thành quả như sau:
![](https://images.viblo.asia/e7ba1f97-70ad-420c-b255-3458166075b4.gif)

# Tổng kết
Thông qua phần một, chúng ta đã có những bước đi đầu tiên trong việc xây dựng ứng dụng Vuejs của riêng mình thông qua Vuex. Trong phần tới, mình sẽ hướng dẫn việc tạo các component liên qua để có thể hiện thị được thời tiết các thành phố.