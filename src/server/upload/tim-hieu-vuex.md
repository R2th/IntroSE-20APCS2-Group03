Xin chào mọi người, hôm nay chúng ta cùng tìm hiểu kiến thức về vuex trong vue.js nhé.
Nội dung bài viết sẽ gồm các phần sau
* Vuex là gì ?
* Các khái niệm cơ bản của vuex
* Lưu ý  khi sử dụng Vuex
# Vuex là gì ?
- VueX là thư viện giúp quản lý trạng thái các component trong VueJS, đây là nơi lưu trữ tập trung dữ liệu cho tất cả các component trong một ứng dụng, với nguyên tắc trạng thái chỉ có thể được thay đổi theo kiểu có thể dự đoán.
- Vuex còn được xem như là một thư viện dùng để quản lý state cho các ứng dụng của Vue bằng cách sử dụng store toàn cục.
- Vue hoạt động theo mô hình "Luồng dữ liệu một chiều" với các thành phần sau:<br>
**State:** Trạng thái, là nơi khởi nguồn để thực hiện ứng dụng.<br>
**View:** Khung nhìn, là các khai báo ánh xạ với trạng thái.<br>
**Action:** Hành động, là những cách thức làm trạng thái thay đổi phản ứng lại các nhập liệu của người dùng từ View<br>
![](https://images.viblo.asia/004484eb-b380-4c76-b630-a278fc93eab3.png)

Tuy nhiên, mô hình này bị phá vỡ khi chúng ta có rất nhiều các component cùng chia sẻ một trạng thái: Nhiều view cùng phụ thuộc vào một trạng thái nào đó. Các hành động từ các view khác nhau cần thay đổi cùng dữ liệu trạng thái. Vuex nhìn thấy tại sao không đưa các trạng thái được chia sẻ của các component ra và quản lý chúng trong một bộ máy toàn cục, và đó chính là lý do cho sự ra đời của Vuex. 
# Các khái niệm cơ bản của vuex
**State (trạng thái)**<br>
Vuex có thể giúp bạn dễ dàng hơn trong việc xác định các trạng thái và tạo ra các snapshot trạng thái một cách đơn giản? Chính là vì nó chỉ sử dụng một cây trạng thái duy nhất để chứa tất cả các trạng thái của ứng dụng. Sử dụng một state duy nhất như thế này sẽ giúp ta đồng bộ được dữ liệu giữa các componet một cách nhanh chóng và chính xác.<br>
```
const state = {
  count: 0
}
```
Lấy ra giá trị của một biến trong state, thì cũng giống như cách lấy ta giá trị của một attribute trong đối tượng vậy.<br>
```
export default {
    computed: {
        result() {
            return this.$store.state.result;
        }
    }
};
```
**Getters (lọc trạng thái)**<br>
Điều mang đến sự khác biệt giữa Vuex và Redux chính là việc ta có thể điều chỉnh dữ liệu trước khi trả về state. Đôi khi chúng ta cần lấy các trạng thái dựa vào việc tính toán, lọc bỏ các trạng thái được cung cấp bởi kho lưu trữ, ví dụ:<br>
```
const state = {
  getEvenNumbers: state => {
    return state.numbers.filter(item => item%2 === 0)
  }
  hasNumber : state => num => {
    return state.numbers.include(num)
  }
}
```
Nếu muốn sử dụng trong component thì bạn có thể gọi trực tiếp `this.$store.getters.getEvenNumbers` hoặc sử dụng mapGetter<br>
**Mutations**<br>
Theo như Docs thì mutations là cách duy nhất mà ta có thể thay đổi thực sự state trong store. Và cách để kích hoạt một mutations đó là ta sẽ commit một chuỗi String chính là tên của hàm mà ta muốn gọi trong mutations, nó sẽ nhận state của store làm tham số đầu tiên:
```
const store = new Vuex.Store({
    state: {
        count: 1
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
 })
```
`store.commit('increment')`<br>
**Actions (Hành động)**<br>
Action cũng tương tự như mutation, tuy nhiên có một vài điểm khác biệt. Thay vì thay đổi trạng thái thì các action commit thay đổi, nó có thể chứa các hoạt động không đồng bộ.
Đây chính là nơi thể hiện bussiness logic, được gọi là API, save vào database, thực hiện các commit (gọi mutation) để thay đổi state…<br>
VD: Thêm một số, nếu số đó đã tồn tại trong state thì xoá rồi thêm lại.<br>
```
const actions = {
  updateNum({commit, state}, num){
    if (state.includes(num)) {
      commit('remove', num)
    }
    commit('add', num)
  }
 
  foo ({dispatch}, num) {
    dispatch('updateNum', num)
  }
}
```
**Module**<br>
Vuex sử dụng cây trạng thái duy nhất, tất cả các trạng thái của ứng dụng được đưa vào một đối tượng, như vậy khi ứng dụng phát triển lên, store có thể phình lên rất nhiều. Vuex cho phép chia nhỏ store thành các module nhỏ hơn, mỗi module cũng có state, mutation, action, getter và thậm chí còn cho phép các module lồng nhau.<br>
```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> `moduleA`\'s state
store.state.b // -> `moduleB`\'s state
```
# Lưu ý  khi sử dụng Vuex
Điều quan trọng nhất khi bạn sử dụng Vuex đó chính là xác định cái nào là state sẽ lưu trữ trong store, cái nào chỉ là local state nằm trong component. Bạn hoàn toàn có thể đưa tất cả vào trong store, tuy nhiên đến khi quy mô của ứng dụng càng lớn kéo theo store cũng sẽ to ra dẫn đến việc khó khăn trong việc quản lý state.
# Kết luận
Trên đây là những điều căn bản về Vuex. mn có thể tìm hiểu thêm trên trang chủ Vuex [Tại đây](https://vuex.vuejs.org/)<br>
một số tình ảnh và tài liệu tham khảo: https://vuex.vuejs.org/