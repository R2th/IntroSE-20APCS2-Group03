# Mở đầu 
Xin chào các bạn để tiếp tục với series học vuex qua các ví dụ đơn giản, ở phần trước mình đã giới thiệu vuex là gì, vì sao cần dùng vuex và State , Getters, Mutations. Hôm nay mình sẽ tiếp tục series với Actions. Sự khác nhau giữa Actions và Mutations là  Actions có thể trả về promise, nó có thể thực hiện các thao tác asynchronous (bất đồng bộ).
 Chúng ta cũng không gọi trực tiếp đến các hàm của Actions mà phải gọi qua dispatch. Mục đích cuối cùng của Actions cũng là commit một mutation , nó cũng không chỉnh sửa gì State (Action gọi đến Mutations để thay đổi State).
 
 # Actions 
 Như đã nói ở trên thì Actions thực hiện các thao tác bất đồng bộ và sẽ gọi lại một Mutations thông qua commit để thực biện thay đổi State. Vì thế ở đây mình sẽ sử dụng Actions lấy data của listsTask từ api. Thế thì đầu tiên phải chuẩn bị api cái đã nhỉ :v , như mọi lần thôi mình lại sử dụng thằng [mockapi](https://mockapi.io/) để tạo api.  [Đây](https://5f0c7a5911b7f60016055e6c.mockapi.io/Api/ahihi)  là api của mình vừa tạo. Ok đã có api rồi bây giờ công việc còn lại của mình sẽ là tạo một Actions để lấy data đó từ api, Actions đó lại gọi đến Mutations, Mutations lại cập nhât lại cái data vừa lấy được ở trên cho State.
 
Mình tạo một hàm `getLists` trong actions  để lấy data từ api như sau
```js
    actions: {
        async getLists({ commit }) {
            try {
                const reponse = await axios.get('https://5f0c7a5911b7f60016055e6c.mockapi.io/Api/ahihi')
                commit('setLists', reponse.data)
            } catch (e) {
                console.log(e)
            }
        }
    }
```
À quên các bạn cần phải add `axios` và import nó vào để có thể call được api nhé.

Ở hàm `getLists` trong actions này mình thực hiện lấy data từ api rồi sẽ commit đến một Mutations đó là `setLists` kèm theo data vừa lấy được ở api. Tiếp theo là khi Mutations `setLists` được gọi thì nó sẽ thực hiện gán giá trị của todos khai báo trong States bằng với data mà nó lấy được từ Actions. đây là Mutations setLists của mình 
```js
        setLists (state, listsTodo) {
            state.todos = listsTodo
        }
```

Một lưu ý nữa là todos ở State của chúng ta bây giờ sẽ lấy data từ api nên mình sẽ sửa lại giá trị ban đầu của todos trong States là một array trống  `todo: []`. Rồi bây giờ chúng ta  muốn lấy tất cả công việc đó ngay khi components LitsTodo được khởi tạo vì thế chúng ta phải gọi Actions đó ngay bên trong  `Ceated` , mình có như sau
```js
	created() {
		this.$store.dispatch('getLists')
	},
```
Để gọi đến Actions thì chúng ta dùng đến $store.dispatch  nó cũng tương tự như commit của Mutatios thôi, và nó cũng có helper để gọi đến Actions đó là `mapActions`. Lúc này trong methods bạn sẽ  dùng `mapActions` để gọi đến  Actions `getLists` và trên Created thì sẽ gọi trực tiếp đến nó như thế này 
```js
	created() {
		this.getLists()
	},
```
 Kết quả  nhé :D 
 ![](https://images.viblo.asia/91263bd2-e598-4c27-bcc7-c7e7fc95853a.png)
 
Cùng làm thêm vài  cái về Actions nữa nhé, bây giờ mình sẽ làm thêm chức năng xóa các item này đi. Đơn giản thôi cũng vào Actions viết một hàm removeItem như sau : 
```js
        async removeItem({ commit }, id) {
            try {
                await axios.delete(`https://5f0c7a5911b7f60016055e6c.mockapi.io/Api/ahihi/${id}`)
                commit('removeItem', id)
            } catch (e) {
                console.log(e)
            }
        }
```
Tiếp theo là Mutations mà Actions trên comit đến 
```js
        removeItem (state, id) {
            state.todos = state.todos.filter(todo => todo.id !== id)
        }
```

Ngoài Component mình thêm button xóa và gọi đến nó như sau : 
```html
<el-button  class="delete-item" type="danger" @click="remove(todo)"> Delete </el-button>
```
Và method remove của mình 
```js
		remove(todo) {
			try {
				this.$store.dispatch('removeItem', todo.id)
				this.$message.success('Removed Success')
			} catch (error) {
				this.$message.error('Something went wrong. Can not remove this item.')
			}
		}
```
Đây là kết quả :D 
\![](https://images.viblo.asia/614ac839-54c4-4e26-b3fa-9ccb8fe55a57.gif)


Có delete rồi thì làm luôn chức năng create nữa nhỉ :D 
Cũng tương tự như ở trên thôi mình cũng tạo 1 Actions addItem cùng với Mutations mà nó commit đến như sau :

Actions 
```js
        async addItem({ commit }, newItem) {
			try {
				await axios.post('https://5f0c7a5911b7f60016055e6c.mockapi.io/Api/ahihi/', newItem)
				commit('addItem', newItem)
			} catch (error) {
				console.log(error)
			}
		},
```

Mutations 
```js
        addItem(state, newItem) {
			state.todos.unshift(newItem)
		},
```

Tiếp theo bên vue mình cần có input để có thể thêm được tiêu đề của công việc. Mình có component FormInput để thêm title và thực hiện gọi Actions addItem như sau : 
```js
<template>
	<form @submit="onSubmit">
		<input type="text" v-model="title" />
		<input type="submit" value="Add" />
	</form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
	name: 'TodoForm',
	data() {
		return {
			title: ''
		}
	},
	methods: {
		onSubmit(event) {
			event.preventDefault()
			try {
				this.$store.dispatch('addItem', {
					id: uuidv4(),
					title: this.title,
					completed: false
				})
				this.title = ''
				this.$message.success('Created Item Success')
			} catch (e) {
				console.log(e);
				this.$message.error('Something went wrong. Can not create item.')
			}
		}
	}
}
```
Ở đây do phần list item mình có để key là  id vì thế ở đây mình đã dùng `uuid` để tạo ra các id khác nhau tránh trường hợp bị trùng id, khi người dùng ấn submit thì sẽ gọi đến method onSubmit để thực hiện têm item vào. Còn đây là kết quả:
![](https://images.viblo.asia/c709f918-c4eb-48b8-8568-500dcd8d8730.gif)

# Kết luận
Như vậy là mình đã giới thiệu đến các bạn Actions trong vuex, Mong là thông qua các ví dụ trên thì các bạn phần nào đã nắm được Mutations dùng để làm gì rồi đúng không, Trong phần tiếp theo mình sẽ nói đến Modules và cũng làm một số ví dụ hay ho với nó nhé. Cảm ơn các bạn đã theo dõi nếu thấy bài viết hữu ích thì hãy cho mình 1 up vote nhé. Một lần nữa cảm ơn các bạn.