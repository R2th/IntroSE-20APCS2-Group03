# Mở Đầu
Xin chào các bạn, hôm nay mình sẽ quay trở lại với series "Học vuex qua các ví dụ đơn giản" để tổng kết cho series này mình sẽ giới thiệu về `Modules` trong vuex. Vậy `Modules` là gì và vì sao lại cần dùng đến nó.  Như ở những bài viết trước thì mình đang viết tất cả các  State , Getters, Mutations, Action ở cùng một file dù cho các State, Getters, Mutaions hay Action đó không liên quan gì đến nhau cho lắm. Vấn đề đặt ra là khi ứng dung của chúng ta phát triển to ra đồng nghĩa với việc số lượng các State , Getters, Mutations, Action cũng tăng lên, như thế sẽ rất khó để quản lý một file to như thế. `Modules` sẽ giúp cho chúng ta chia store của mình thành các mô-đun - module. Mỗi module có thể chứa state, mutation,action, getters và thậm chí các module lồng nhau. Không nói nhiều nữa bắt đầu luôn nhé.

# Modules
Các bạn có thể thấy đây là State của mình trong file index.js
```js
    state: {
        todos: [],
        showProgress: true
    },
```
Công việc của mình bây giờ sẽ là tách cái `todos` và `showProgress` ra thành 2 file riêng biệt. Đầu tiên mình sẽ tách `showProgress` cùng các getters, mutations, actions liên quan đến nó ra trước rồi `todos` cũng sẽ tương tự. Trong folder `store` mình tạo thêm 1 folder `modules` cùng với file `progress.js` như sau: 
```js
const state = {
    showProgress: true
}

const getters = {}

const actions = {}

const mutations = {
    changleStateProgress(state) {
        state.showProgress = !state.showProgress
    },
}

export default {
	state,
	getters,
	actions,
	mutations
}
```
Ở đây mình khai báo state, getters, mutations, actions rồi cóp từ bên file index sang những phần nào không có thì mình để trống, và cuối cùng là export tất cả chúng nó ra. Tiếp theo là sẽ cần import chúng vào trong file index như sau. Đầu tiên là import file progress.js vào 

    import progress from '../store/modules/progress'
   tiếp theo ở const storeData  mình sẽ thêm modules progress nữa là xong 
   ```js
   const storeData = {
    modules: {
        progress,
    },

    state: {
        todos: [],
    },
    ...
   }
   ```
   Rồi ra trình duyệt xem có có chạy không nhé :v. Chắc là không chạy rồi :D. Mình sẽ show State của `showProgress` trước và sau khi sửa để mọi người biết vì sao nó không chạy nhé :v. Đây là State `showProgress` trước khi sửa 
   
![Screenshot from 2021-07-02 16-01-11.png](https://images.viblo.asia/957beeb7-a597-457d-80eb-d54f6958021c.png)
   
  Và State `showProgress` sau khi sửa : 
  
  ![Screenshot from 2021-07-02 16-04-30.png](https://images.viblo.asia/1c1ebdd1-ffb1-42cd-816a-5a7eb1ac51e2.png)
   
   
Lúc trước là `showProgress` còn bầy giờ là `progress.showProgress` vì thế chúng ta cần sửa lại ở các phần gọi đến State `showProgress` như sau. 

             ...mapState(['showProgress']) =>  ...mapState(['progress']),
             
  và cũng cần sửa lại ở phần hiển thị thanh progreess và button  ẩn hiện thanh progress ở navbar lại 
  
        v-if="showProgress" =>  v-if="progress.showProgress"
        
còn một cách khác nữa đó là chúng ta sẽ không gọi trực tiếp bằng State nữa mà chúng ta sẽ gọi thông qua `Getters`, Lúc này cần sửa lại phần `getters` trong file progress.js như sau: 
```
const getters = {
    showProgress: state => state.showProgress
}
```
 Rồi bây giờ ở bên  thanh progreess và button  ẩn hiện thanh progress ở navbar chúng ta sẽ không gọi `showProgress` qua State nữa mà sẽ gọi qua Getters.
 
 Tương Tự mình có file `todos.js` như sau : 
 ```js
 import axios from 'axios'

const state = {
    todos: [],
}

const getters = {
    dotos: state => state.todos,
    doneTask: state => state.todos.filter(todo => todo.completed),
    progress: (state, getters) => {
        const doneTask = getters.doneTask
        return Math.round((doneTask.length / state.todos.length) * 100)
    }
}

const actions = {
    async getLists({ commit }) {
        try {
            const reponse = await axios.get('https://5f0c7a5911b7f60016055e6c.mockapi.io/Api/ahihi')
            commit('setLists', reponse.data)
        } catch (e) {
            console.log(e)
        }
    },

    async removeItem({ commit }, id) {
        try {
            await axios.delete(`https://5f0c7a5911b7f60016055e6c.mockapi.io/Api/ahihi/${id}`)
            commit('removeItem', id)
        } catch (e) {
            console.log(e)
        }
    },

    async addItem({ commit }, newItem) {
        try {
            await axios.post('https://5f0c7a5911b7f60016055e6c.mockapi.io/Api/ahihi/', newItem)
            commit('addItem', newItem)
        } catch (error) {
            console.log(error)
        }
    },
}

const mutations = {
    markCompleted (state, id) {
        state.todos.map(itemTodo => {
            if(itemTodo.id === id) {
                itemTodo.completed = !itemTodo.completed

                return itemTodo
            }
        })
    },
    setLists (state, listsTodo) {
        state.todos = listsTodo
    },
    removeItem (state, id) {
        state.todos = state.todos.filter(todo => todo.id !== id)
    },
    addItem(state, newItem) {
        state.todos.unshift(newItem)
    },
}

export default {
	state,
	getters,
	actions,
	mutations
}
 ```
 
 Và file index.js của mình bây giờ chỉ gọn nhẹ như thế này 
 ```js
 import Vue from 'vue'
import Vuex from 'vuex'

import progress from '../store/modules/progress'
import todos from '../store/modules/todos'

Vue.use(Vuex)

const storeData = {
    modules: {
        progress,
        todos,
    },
}

const store = new Vuex.Store(storeData)

export default store
 ```
 À các bạn nhớ đổi lại dùng mapGetters thay cho mapState trong  phần lấy ra list todos nhé.
 
 # Kết Luận
 Như vậy là mình đã giới thiệu nhưng thức cơ bản của vuex thông qua các ví dụ đơn giản để mọi người có thể dễ dàng hiểu được từng thành phần cũng như cách dùng chúng. Hy vọng thông qua series này các bạn sẽ có thể hiểu và vận dụng nó vào các dự án thực tế. Cảm ơn các bạn đã theo dõi nếu thấy series hữu ích thì hãy cho mình 1 up vote nhé. Mọi thắc mắc hoặc góp ý vui lòng comment xuống phía dưới để mình có thể giải đáp hoặc bổ sung. Một lần nữa cảm ơn các bạn