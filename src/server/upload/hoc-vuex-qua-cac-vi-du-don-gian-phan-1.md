# Mở Đầu 
xin chào các bạn hôm nay mình trình bày về `Vuex`, như tiêu đề đã nêu ở trên thì trong series này mình sẽ không tập trung vào lý thuyết mà sẽ tập trung chủ yếu vào ví dụ, làm sao cho từ các ví dụ đó thì mọi người sẽ hiểu và học được vuex luôn, biết khi nào nên dùng vuex khi nào không. OK bắt đầu luôn nhé :D, nhưng muốn học nó thì chúng ta cũng cần phải biết nó là gì, tại sao cần dùng nó  chứ nhỉ, Cùng xem vuex là gì nhé.
# Vuex là gì 
* `Vuex` là một thư viện + mẫu quản lý trạng thái cho ứng dụng Vue.js.  Nó là  nơi lưu trữ tập trung dữ liệu cho tất cả các component  trong một ứng dụng, với nguyên tắc trạng thái chỉ có thể được thay đổi theo kiểu có thể dự đoán." Nó  được sinh ra để quản lí các data mà ít biến đổi trong app, quản lý state và share data cho nhau giữa các Component.
* Nó cũng tích hợp với tiện ích mở rộng devtools chính thức của Vue để cung cấp các tính năng nâng cao khác.
# Sơ đồ kiến trúc của vuex 
![](https://images.viblo.asia/30ffb6cc-5ed8-41c7-a70b-ab3b7d089805.png)
Như các bạn có thể thấy ở đây chúng ta có các thành phần quan trọng đó là: State, Store, Getters, Actions, Mutations. Như đã nói ở trên thì vuex dùng để quản lý state và share data giữa  các component với nhau vì thế các phần data ít thay đổi sẽ  lưu vào store.Khi đã lưu vào store rồi nếu muốn thay đổi các state này các bạn không được thay đổi (change) trực tiếp ở component mà bắt buộc phải thay đổi nó qua một action đến một mutations nào đó, ở đây mutations mới có thể thay đổi state nhé.
Mình sẽ đi qua về  5 thành phần chính trong vuex và sau đó sẽ tạo ứng dụng minh họa thì mình sẽ đi vào chi tiết từng thành phần một.

## State
`State` là nơi lưu giữ data trong từng component. State trong vuex đơn giản là nó không nằm ở từng component riêng rẽ nữa mà nó sẽ được chia sẽ cho các component khác trong hệ thống đều dùng được..
Ngon đấy thế cái gì mình cũng cho vào state của store thích dùng ở component nào thì lấy ra thôi :D, đấy là lúc mới học mình nghĩ thế :D nhưng như đã nói ở trên thì  nó  được sinh ra để quản lí các data là ít biến đổi và được sử dụng ở nhiều component khác nhau, ví dụ như data chỉ được sử dụng ở 1 component thì gọi luôn ở component đó chứ dùng vuex làm gì cho mất công đúng không.
## Store
Store là phần quản lí State, nó sẽ có các phương thức cho phép bạn thay đổi state một cách gián tiếp thông qua dispatch hoặc một commit. Store là duy nhất bên trong một app và sẽ được khởi tạo cùng với root. Nó không thể được truy cập hoặc sửa đổi trực tiếp để đảm bảo trạng thái nhất quán và cho phép theo dõi các thay đổi.
## Getters
Getter, nó sẽ lấy các giá trị của state trong Store. Trong components, nó có thể được truy cập thông qua $store.getters.property . Nó  chỉ có thể dùng để lấy data ra chứ không thể chỉnh sửa.
## Mutations
Mutations dùng để thay đổi  state trong store. Và cách để kích hoạt một mutations đó là ta sẽ commit một chuỗi String chính là tên của hàm mà ta muốn gọi trong mutations, nó sẽ nhận state của store làm tham số đầu tiên và nó chạy đồng bộ. Các hàm trong Mutations thường sẽ không nên chứa logic hay nghiệp vụ business gì, nó chỉ nên có một việc là update state.
## Actions
Trong Action sẽ thường chứa logic liên quan đến nghiệp vụ business nhưng nó không trực tiếp thay đổi state, muốn thay đổi state  thì nó cầm gọi đến commit ở mutations, và nó thường được chạy bất đồng bộ.

##  Cài đặt project
Để có thể học vuex trước tiên chúng ta phải có một project để demo cái đã  chứ nhỉ , mình sẽ tạo một ứng dụng vue cli. Mình xin phép bỏ qua bước cài đặt project nhé, các bạn có thể lên trang chủ của nó để xem cách cài tại [đây](https://cli.vuejs.org/guide/installation.html)
Tiếp theo mình cần sửa lại một chút giao diện để tạo được một TODO list. à quên chúng ta cũng cần phải install vuex nữa chứ nhỉ :v mình dùng yarn nên chỉ cần gõ : `yarn add vuex` là oki :D.

Đầu tiên mình sẽ tạo 1 file index trong folder `store`   import vue, vuex, tạo một biến `storeData` trong đó sẽ có 1 `state`, `state` sẽ có  data là `todos` . cuối cùng là tạo 1 `store` bằng chính cái `storeData` ở trên và export nó ra. đây là file index.js
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storeData = {
    state: {
        todos: [
            { id: 1, title: 'title 1', completed: false },
            { id: 2, title: 'title 2', completed: false },
            { id: 3, title: 'title 3', completed: false }
        ]
    }
}

const store = new Vuex.Store(storeData)

export default store
```
Tiếp theo là thêm `store` vào file `main.js` . Với file main.js của mình như sau
```js
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import store from './store'

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  store
}).$mount('#app')
```
ở đây mình có dùng thêm cả element UI nên có import cả element UI nếu không dùng các bạn có thể bỏ đi. Vậy là cơ bản đã xong phần setup.  Tiếp theo là bắt tay vào làm thôi :D, đầu tiên sẽ làm quen với `State` nhé  :D.
### State
Như đã khai báo ở file index.js mình có 1 list các item nằm trong todos, state nhiệm vụ bây giờ cuả chúng ta là lấy được data đó để hiển thị ra. Ý tưởng là mình sẽ tạo một component là `ListTodo` rồi dùng computed để lấy data và dùng v-for để hiện thị data đó lên, đây là component ListTodo của mình
```js
<template>
	<div class="todo-list">
		<ul>
			<li v-for="todo in todos" :key="todo.id">
				{{ todo.title }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Todos',
    
	computed: {
		todos() {
			return this.$store.state.todos
		}
	}

}
</script>
```
Tiếp theo mình cũng muốn lấy ra số lượng item để  hiện thị trang chủ,  mình cũng tạo thêm 1 component `Navbar` và cũng móc data từ store tương tự như trên nhưng thêm .length để lấy ra được chiều dài của nó. Đây là file Navbar.vue của mình.
```js
<template>
	<div class="navbar">
		<h1>Todos List Demo Vuex</h1>
		<ul>
			<li>Home</li>
			<li>About</li>
			<li>Total item: {{todoCount }} </li>
		</ul>
	</div>
</template>

<script>
	export default {
		computed: {
			todoCount() {
				return this.$store.state.todos.length
			}
		}
	}
</script>
```
ơ chả nhẽ component nào cần data cũng phải gọi theo kiểu `this.$store.state...` à, Câu trả lời là có :v  Vuex cũng cấp cho chúng ta một cái gọi à `helper`. cái `helper` chúng ta cần sử dụng trong trường hợp này sẽ là  `mapState`. Chúng ta chỉ cần import nó vào và sửa lại một chút phần computed là xong, đây là file  ListTodo.vue sau khi viết lại 
```js
<template>
	<div class="todo-list">
		<ul>
			<li v-for="todo in todos" :key="todo.id">
				{{ todo.title }}
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'Todos',
	computed: mapState(['todos'])
}
```
còn đây là file navbar.vue sau khi viết lại 
```js
<template>
	<div class="navbar">
		<h1>Todos List Demo Vuex</h1>
		<ul>
			<li>Home</li>
			<li>About</li>
			<li>Total item: {{todos.length }} </li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex'
	export default {
		computed: mapState(['todos'])
	}
</script>
```
các bạn nhớ là  chuyển phần .lenght lên phía trên nhé vì thực chất đoạn `mapState(['todos'])` sẽ tương đương với `this.$store.state.todos`
Đây là  kết quả :v 
![](https://images.viblo.asia/f6fdbda4-23fa-48d8-b193-402867459450.png)
# Kết luận
Ở bài viết này mình mới chủ yếu giới thiệu vuex là khi nào cần dùng nó và gới thiệu được `State`
 cùng helper `mapState` nên cũng chưa có gì lắm, trong những bài tiếp theo mình sẽ lần lượt đi đến các Getters, Mutations, Actions, Modules, và sẽ có ví dụ cho từng phần cụ thể. Các bạn nhớ ấn theo dõi để nhận được thông báo từ các bài viết tiếp theo của mình nhé, Hẹn gặp lại các bạn