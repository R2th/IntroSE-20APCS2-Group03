# 1 Giới thiệu: 
Hello mọi người, ngày hôm  nay chúng ta sẽ đi vào vấn đề chính luôn nhé
![](https://images.viblo.asia/43897b7e-1397-4f4d-a8c1-d126c9f851fa.png)

Tiếp tục với series Vue.js, hôm nay mình sẽ giới thiệu với các bạn một công cụ rất mạnh mẽ để quản lý các state trong Vue.js.



Như các bạn đã biết, Vue sử dụng những Component để cấu thành một ứng dụng hoàn chỉnh. 
Trong Vue. khi tạo ra một component độc lập sẽ có những thành phần sau: 
- State : Nơi chứa trạng thái của ứng dụng
- View: Ánh xạ của trạng thái .
- Action: các hành động hay funcion thay đổi state để đáp ứng lại nhập liệu từ View. 

![](https://images.viblo.asia/352cca4f-5803-43d6-9597-aa5e4f4fc83c.png)

**Đây là một vòng tròn hoạt động của Component, Khi có một action sẽ thay đổi state và cuối cùng hiển thị ra view, từ view người dùng có thể nhập dữ liệu đầu vào để kích hoạt action, và vòng tròn đấy lặp lại**

Điều gì sẽ xảy ra nếu việc ứng dụng có thêm nhiều component sử dụng chung state. Khi đấy chúng ta cần tới một phương pháp để chia sẻ dữ liệu

Việc chia sẻ dữ liệu sẽ có nhiều hạn chế khi việc truyền và nhận trạng thái từ Component cha xuống Component con. Trong ứng dụng lớn chỉ sử dụng cách chia sẻ state giữa các Component thông qua việc truyền dữ liệu từ Component Cha -> Component Con liệu có khả thi. Tưởng tượng khi đấy, việc truyền dữ liệu sẽ khá là rối rắm :(( lúc đấy sẽ không thể quản lý cũng như bao quát hết các thay đổi của state.


Hiểu đơn giản , khi một ứng dụng lớn thì việc các Component lồng nhau là rất dễ xảy ra. Nếu như chỉ có 2 cấp cha  - con thì việc thay đổi state của cha là điều khá đơn giản khi chỉ cần phát ($emit) ra một sự kiện và sử dụng sự kiện đấy để lấy dữ liệu và thay đổi trong Component cha . Nhưng nếu cây Component có nhiều cấp ông - cha - con - cháu... rồi từ trong Component ông lại có thêm Component chú thì khi muốn thay đổi state từ phía dưới lên tới cấp cao nhất thì khá mất thời gian cũng như phức tạp. 

VueX tạo ra cho chúng ta một kho lưu trữ các state, mà ở đây các Component có thể sử dụng chung và khi có thay đổi từ bất kì Component nào thì nó đều xảy ra trên toàn cục. Tức là khi đấy dữ liệu chung trong VueX sẽ thay đổi giúp đồng nhất cũng như dễ dàng trong việc thay đổi hay lấy dữ liệu ra.

![](https://images.viblo.asia/886ce548-c10a-497b-ae1d-3c2a82bf4558.png)


Như hình trên,  VueX là một kho lưu trữ các state, action, mutation cho việc dùng chung của các Component. Sau đây chúng ta sẽ đi vào những nội dung chính của VueX. Với những khái niệm quan trọng để sử dụng VueX.

# 2. Sử dụng

Đầu tiên là cách cài đặt VueX trong project sử dụng Vue của các bạn: 
Bài viết này mình sẽ sử dụng npm (node package manager) để cài đặt cho VueX. 

Để cài đặt vuex vào npm ta sử dụng câu lệnh 
```
npm install vuex --save
```
Tiếp theo để sử dụng , chúng ta sẽ import nó vào Component nhé: 
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

Đến đây chúng ta đã có thể sử dụng được VueX rồi. 
Có 5 thứ cốt lõi, thành phần trong VueX mà chúng ta sẽ đi vào chi tiết ngay sau đấy đấy chính là : 

- State
- Getters
- Mutations
- Actions
- Modules

### State  
- Là nơi lưu trữ trạng thái. VueX sẽ chia sẻ trạng thái cho toàn bộ ứng dụng qua thông qua state. Đây là nguồn trạng thái xác thực duy nhất của ứng dụng. Để sử dụng chúng ta khai báo : 
```js
export default new Vuex.Store({
    state: {  
        toDos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {},
        count: 0
    }
})
```
Để lấy  state ra chúng ta sử dụng
```js
this.$store.state.newTodo
```
### Getter
- Khi muốn sử dụng để lọc state họặc tính toán trước khi lấy state ra, chúng ta sử dụng getter để tránh việc lặp code không cần thiết mỗi khi phải tính toán và phục vụ cho những Component khác. 
```js
export default new Vuex.Store({
    state: {  
        toDos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {},
       count: 0
    },
    getter: {
        doneToDos: (state) => {
            return state.toDos.filter(m => m.completed == true)
        }
    }
})
```
Để nhận dữ liệu từ getter chúng ta sử dụng
```js
this.$store.state.newTodo
```
Ngoài ra chúng ta cũng có thể sử dụng lại getter bên trong getter: 
```js
export default new Vuex.Store({
    state: {  
        toDos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {},
        count: 0
    },
    getter: {
        doneToDos: (state) => {
            return state.toDos.filter(m => m.completed == true)
        }
        doneToDosCount: (state, getters) => {
            return getters.doneToDos.length 
        } // sử dụng lại getter doneToDos
    }
})
```

### Mutations
- Chủ ta không thể thay đổi trực tiếp state mà để thay đổi state trong VueX, chỉ có duy nhất một cách đấy chính là sử dụng Mutations  .
```js
    mutations: {
        increment (state, param){
           state.count += param.number
        }
    }
```
- Để sử dụng mutation chúng ta sử dụng thông qua commit : 
```js
this.$store.commit('increment', 9)
```
### Actions

- Action tương tự với mutation nhưng thay vì thay đổi trạng thái, actions sẽ commit mutations: 

```js
    action: {
       increment ({ commit }) {
           commit('increment')
       }
    }
```
- Để kích hoạt action chúng ta sử dụng dispatch : 
 ```js
    this.$store.dispatch('increment')
```
- Action có thể chứa các hoạt động bất đồng bộ. 

### Modules: 

Khi ứng dụng phát triển ngày càng lớn, tất cả mọi thứ đều lưu vào store, điều này làm cho store phình to và khó quản lí. Để giúp chúng ta chia nhỏ store thì Modules trong VueX sẽ giải quyết vấn đề đó. Các component được chia sẻ chung state sẽ có cùng modules riêng biệt. 
Mỗi module sẽ có được đầy đủ các thành phần store: state, getters, mutations, actions. và được import vào một file store root như sau: 
```js
import Vue from 'vue';
import Vuex from 'vuex';
import ModuleA from './modules/ModuleA.js';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ModuleA
    }
})
```


# 3. Kết luận 
Với VueX có thể sẽ giúp chúng ta trong phần xử lý đồng bộ dữ liệu của các Component khi có nhiều hơn 2 Component sử dụng chung dữ liệu. VueX sử dụng khi bạn muốn xây dựng một ứng dụng Single Page Application với quy mô lớn. Và chúng ta cũng nên xem xét kĩ việc phát triển ứng dụng của mình liệu có cần thiết để dùng VueX hay không. 

Cảm ơn mọi người đã theo dõi bài viết. Hy vọng bài viết có thể giúp ích cho mọi người phần nào đấy trong việc sử dụng Vue.js cũng như VueX.

# Tài liệu tham khảo: 
- https://vuex.vuejs.org/