# Mở đầu 
Xin chào các bạn để tiếp tục với series học vuex qua các ví dụ đơn giản, ở phần trước mình đã giới thiệu vuex là gì, vì sao cần dùng vuex  và `State`  nếu các bạn chưa đọc thì có thể đọc lại phần 1 của mình tại [đây](https://viblo.asia/p/hoc-vuex-qua-cac-vi-du-don-gian-RQqKLGNz57z). Hôm nay mình sẽ tiếp tục series với `Getters`. Bắt đầu luôn nhé :D

# Getters
Bây giờ t muốn biết được số lượng công việc đã hoàn thành trong danh sách task và hiển thị nó ra thì làm thế nào nhỉ :v , đây là lúc chúng ta cần dùng đến `Getters`, đơn giản thôi chúng ta chỉ cần filer trong đống data đó để lấy ra những cái có completed là true, bạn chỉ cần vào trong file index.js ở folder store viết thêm một đoạn như sau.
```js
  getters: {
        doneTask: state => state.todos.filter(todo => todo.completed),
    },
```
ở đây chúng ta có 1 cái gọi là getters  trong getters có hàm `doneTask` để lấy ra những công việc đã hoàn thành, hàm này bao giờ nó cũng lấy `state` làm tham số đầu tiên, ta lấy todos trong state và dùng hàm filter trong javascrip để lấy ra những item có completed có value là true. Bây giờ chúng ta cần hiển thị ra số lượng item đã completed. Mình sẽ để nó hiện thị cạnh tổng số lượng item nên chúng ta cần sửa lại file Navbar.vue một chút và  file Navbar.vue của mình sẽ như thế này 
```
<template>
	<div class="navbar">
		<h1>Todos List Demo Vuex</h1>
		<ul>
			<li>Home</li>
			<li>About</li>
			<li>Total items: {{todos.length }} </li>
			<li>Total completed items: {{ doneTodo }} </li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex'
	export default {
		computed: {
			...mapState(['todos']),
			doneTodo() {
				return this.$store.getters.doneTask.length
			}
		}
	}
</script>
```
Ở đây mình dùng ` ...mapState(['todos']),` vì mapState   trả lại object nên chúng ta  cần dùng spread operator để móc được những phần tử đó ra.


Cũng tương tự như phần state ở bài trước nhỉ  và ở trên gọi cái `doneTodo` là được. Cũng như mapState thì chúng ta cũng có mapGetters, cùng sửa lại cho ngắn gọn hơn nào :D . Đây là file Navbar.vue sau khi sửa lại :v: 
```js
<template>
	<div class="navbar">
		<h1>Todos List Demo Vuex</h1>
		<ul>
			<li>Home</li>
			<li>About</li>
			<li>Total items: {{todos.length }} </li>
			<li>Total completed items: {{ doneTask.length }} </li>
		</ul>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
	export default {
		computed: {
			...mapState(['todos']),
			...mapGetters(['doneTask'])
		}
	}
</script>
```
Đây là kết quả 
![](https://images.viblo.asia/837c4562-5abe-45e8-9fc3-d1614112956d.png)



Tiếp theo sẽ nâng cao hơn một chút mình sẽ hiển thị tiến độ hoàn thành công việc. Đầu tiên cần có một component để hiển thị tiến độ ,  mình tạo 1 component là Progress, lên element UI kiếm 1 cái component progress nào :v , đấy bài trước mình có install cả element UI là có ý đồ cả đấy  hê hê. Tiếp theo cần thực hiện tính toán phần trăm hoàn thành. trong file index.js mình có như sau 
```js
    getters: {
        doneTask: state => state.todos.filter(todo => todo.completed),
        progress: (state, getters) => {
			const doneTask = getters.doneTask
			return Math.round((doneTask.length / state.todos.length) * 100)
		}
    },
```
Vậy là phần data đã xong tiếp theo là phần nhận data và hiển thị ra mình có file Progress như sau :
```js
<template>
    <div>
        <el-progress :text-inside="true" :stroke-width="24" :percentage="progress" status="success"></el-progress>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters(['progress']),
}
</script>
```
Vì các bạn đã quen rồi nên ở đây mình dùng luôn `mapGetters` nhé. sau đó chỉ cần vứt cái data mình vừa lấy được từ mapGetters cho thuộc tính `percentage` trong component progress của element UI là được.  Đây là kết quả :D 
![](https://images.viblo.asia/0232a4ca-1622-473d-a0e7-2084d2e4ba88.gif)

À  tiện thì  hiển thị  luôn cái danh sách các task đã hoàn thành luôn nhỉ. cái này cũng gần giống lấy ra số lượng task đã hoàn thành. Mình tạo thêm 1 component là DoneTasks như sau:
```js
<template>
	<div >
        <h1> List Task Done </h1>
		<ul>
			<li v-for="item in doneTask" :key="item.id">
				{{ item.title }}
			</li>
		</ul>
	</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
		computed: {
			...mapGetters(['doneTask'])
		}
}
</script>
```
 Kết quả là đây  :D
 
![](https://images.viblo.asia/64e529d1-753b-455d-96bc-94d8ce6da99c.gif)


# Kết Luận
Như vậy là mình đã giới thiệu đến các bạn Getters trong vuex, Mong là thông qua các ví dụ trên thì các bạn phần nào đã nắm được Getters dùng để làm gì rồi đúng không, Trong phần tiếp theo mình sẽ nói đến `Mutations` và cũng làm một số ví dụ hay ho với nó nhé. Cảm ơn các bạn đã theo dõi nếu thấy bài viết hữu ích thì hãy cho mình 1 up vote nhé.  Một lần nữa cảm ơn các bạn