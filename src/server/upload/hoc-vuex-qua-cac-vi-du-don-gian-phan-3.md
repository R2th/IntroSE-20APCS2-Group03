# Mở đầu 
Xin chào các bạn để tiếp tục với series học vuex qua các ví dụ đơn giản, ở phần trước mình đã giới thiệu vuex là gì, vì sao cần dùng vuex và State ,  Getters. Hôm nay mình sẽ tiếp tục series với Mutations. Theo như trên doc viết thì `Mutations` là cách duy nhất để thay đổi trạng thái của State thông qua các thao tác mà người dùng tác động lên trang web của mình. Thôi không nói dài nữa bắt đầu luôn nhé 😄
# Mutations
Thì như đã nói ở trên `Mutations` là cách duy nhất để thay đổi State, vậy để xem nó hoạt động như thế nào và cách dùng của nó ra làm sao thì mình sẽ đi vào một ví dụ. Ở các phần trước thì mình có đang xây dựng  một todo list các công việc kèm theo progress của nó, hôm nay mình sẽ làm thêm chức năng để ẩn hiện thanh progress đó. Vậy thì mình cần phải có 1 biến để lưu trạng thái bật tắt của thanh progress đó (State đó  :D ) và làm sao để thay đổi được trạng thái bật tắt đó :D thì đây chính lúc này chúng ta cần dùng `Mutations` để thay đổi trạng thái. Tóm lại là sẽ cần các công việc sau : 
* Thêm một State để lưu trạng thái của thanh progress
* Sửa lại một chút  điều kiện để thanh progress sẽ hiển thị theo state vừa khai báo ở trên
* Thêm `Mutations` để thực hiện thay đổi ở trên 
* Thêm nút và gọi đến Mutations để bật tắt thanh progress

#####  Thêm một State để lưu trạng thái của thanh progress
Đầu tiên mình sẽ khái báo một showProgress với giá trị là true ở trong State như  sau 
```js
    state: {
        todos: [
            { id: 1, title: 'title 1', completed: false },
            { id: 2, title: 'title 2', completed: true },
            { id: 3, title: 'title 3', completed: false }
        ],
        showProgress: true
    },
```
##### Sửa lại một chút  điều kiện để thanh progress sẽ hiển thị theo state vừa khai báo ở trên
Tiếp theo là mình sẽ cần sửa lại điều kiện hiển thị của thanh progress để nó follow theo cái state mình vừa khai báo ở trên, đơn giản thôi chỉ cần sửa lại một chút như thế này 
```html
  <div id="app">
    <Navbar />
    <div class="body-list">
      <ListTodo />
    </div>
    <Progress v-if="showProgress" />
  </div>
```
À các bạn nhớ import `mapState` vào để gọi được thằng `showProgress` ra nhé 
#####  Thêm `Mutations` để thực hiện thay đổi ở trên 
Đến phần trọng tâm nhất đây rồi :D , đó là thêm một `Mutations` để thực hiện  thay đổi State 
```js
    mutations: {
        changleStateProgress(state) {
            state.showProgress = !state.showProgress
        },
    }
```
Trong Mutations mình có một hàm là changleStateProgress với tham số đâù vào là State . Ở đây  hàm này của mình có nhiệm vụ là sẽ thay đổi lại State của showProgress từ true thành false và ngược lại, vậy là đã xong phần Mutations bây giờ đến lúc gọi nó ra ở components thôi :D

#####  Thêm nút và gọi đến Mutations để bật tắt thanh progress

Bây giờ mình sẽ thêm 2 button để thực hiện việc bật tắt thanh progress, 2 nút này sẽ gọi đến 1 method để thực hiện việc bật tắt đó, ở file Navbar mình sẽ sửa lại như sau: 
```html
	<div class="navbar">
		<h1>Todos List Demo Vuex</h1>
		<div class="flex menu">
			<ul class="flex menu ul-menu">
				<li>Home</li>
				<li>About</li>
				<li>Total items: {{todos.length }} </li>
				<li>Total completed items: {{ doneTask.length }} </li>
			</ul>
			<el-button type="primary" class="button" v-if="!showProgress" @click="changleState">Show Progress</el-button>
			<el-button type="danger" class="button" v-else @click="changleState">Close Propress</el-button>
		</div>
	</div>
```
Ở đây  cả 2 button mình đều gọi đến một method là `changleState`  đơn giản vì chức năng của chúng giống nhau chỉ để thay đổi trạng thái của  `showProgress`. Tiếp theo là method `changleState` sẽ gọi đến `Mutations` để thay đổi lại state như sau: 
```js
		methods: {
			changleState() {
				this.$store.commit('changleStateProgress')
			}
		}
```
Ở đây mình có dùng $store.commit thì `commit` ở đây được dùng để gọi ra các hàm trong `mutations` cụ thể ở đây là mình đã  gọi ra `changleStateProgress`. Thì cũng giống như State, Getter ở phần trước thôi chúng ta cũng có `helper` để gọi `Mutations` ra  đó là `mapMutations`.  Các bạn cũng chỉ cần import tương tự như ở State và Getters  rồi gọi nó đơn giản ở method như sau 
```js
		methods: {
			...mapMutations(['changleStateProgress'])
		}
```
Ở trên thì cũng gọi thẳng đến nó luôn 
```html
<el-button type="primary" class="button" v-if="!showProgress" @click="changleStateProgress">Show Progress</el-button>
<el-button type="danger" class="button" v-else @click="changleStateProgress">Close Propress</el-button>
```
OK cùng xem kết quả nhé 
![](https://images.viblo.asia/9513fe28-b33e-4fd6-8213-bc9e073b76b2.gif)




Tiếp theo là mình sẽ làm một ví dụ nữa về Mutations có sử dụng payload, Ở đây mình đang có 1 list các công việc và trạng thái của nó là đã hoàn thành hay chưa, bây giờ mình sẽ xây dựng thêm một chức năng để có thể cập nhật được trạng thái của công việc là đã hoàn thành hay chưa. Các bước thì cũng tương tự như ở trên thôi nhưng vì trước mình đã khai cáo  trường `completed` ở trong state rồi nên bây giờ mình chỉ cần thêm hàm đánh dấu công việc đã hoàn thành trong mutations và sửa lại giao diện một chút rồi gọi mutations đó ra là được

Đầu tiên là mình sẽ thêm hàm để đánh dấu hoàn thành công việc như sau 
```js
        changleStateProgress(state) {
            state.showProgress = !state.showProgress
        },
        markCompleted (state, id) {
            state.todos.map(itemTodo => {
                if(itemTodo.id === id) {
                    itemTodo.completed = !itemTodo.completed

                    return itemTodo
                }
            })
        }
```
Ở đây mình có 2 tham số đầu vào đó là State như ở trên và tham số thứ 2 là id, mục đích là để cái id mình truyền vào này sẽ bằng cái id trong listTodo để từ đó nó biết cần cập nhật trạng thái cho thằng nào. id đó chính là cái payload mình nói ở trên đó :D. Tiếp theo là sửa một chút bên giao diện và gọi nó ra thôi. file listTodo của mình :
```html
	<div class="todo-list">
		<ul >
			<li v-for="todo in todos" :key="todo.id"
				class="list-task"
			>
				{{ todo.title }}
			<el-checkbox :checked="todo.completed" @change="markCompleted(todo.id)"/>
			</li>
		</ul>
		<DoneTask />
	</div>
```
ở đây trong mỗi item todo mình sẽ thêm một checkbox nó sẽ đươc check khi  công  việc đã hoàn thành và khi checkbox thay đổi nó sẽ gọi đến mutation để thực hiện thay đổi đó. Còn đây là method gọi đến mutations của mình 
```js
	methods: {
		...mapMutations(['markCompleted'])
	}****
```
các bạn k thích thì có thể dùng this.$store.commit như trên cùng được :D. Còn đây là kết quả 
![](https://images.viblo.asia/32eae9dc-9c50-42cc-b487-a7047b797f4b.gif)



Và đây khi các bạn gọi đến `markCompleted` thì sẽ thấy payload của nó tương ứng như này 
![](https://images.viblo.asia/900d0ed0-6fca-4ce1-b172-74a51421e719.gif)



# Kết Luận 
Như vậy là mình đã giới thiệu đến các bạn Mutations trong vuex, Mong là thông qua các ví dụ trên thì các bạn phần nào đã nắm được Mutations dùng để làm gì rồi đúng không, Trong phần tiếp theo mình sẽ nói đến Actions và cũng làm một số ví dụ hay ho với nó nhé. Cảm ơn các bạn đã theo dõi nếu thấy bài viết hữu ích thì hãy cho mình 1 up vote nhé. Một lần nữa cảm ơn các bạn