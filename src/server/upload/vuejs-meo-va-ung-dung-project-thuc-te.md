### Mở Đầu.

Sau khi làm việc với Vue 1 thời gian với dự án thực tế.Trong thời gian làm việc với nó Tôi cũng gặp rất nhiều các vấn đề nảy sinh. Nó giúp tôi học hỏi được nhiều điều thú vị. <br>
Vì vậy nên Tôi tổng hợp một số trường hợp nhưng lời khuyên hay những mẹo nhỏ nhỏ. Hy vọng trong bài viết này có thể giúp bạn 1 tích kiệm được chút ít thời gian khi gặp phải nó.

### Bắt đầu học Vue.
Nếu bạn là người bắt đầu học và nghiên cứu với vue thì bạn không phải hoang mang khi nó rất dễ hiểu và tiếp cần không như những gì bạn nghĩ.<br>
 Bắt đầu với Vue thì Tôi khuyên bạn nên băt đầu học những thứ cơ bản bản nhất của vue theo trình tự mà Tôi sắp liệt kê dưới đây. 

### Cài đặt VueDevtools
Với Tôi VueDevtools là công cụ không thể thiếu với 1 dev code Vuejs. Đây là tiện ích trên trình duyệt.<br>
Nó có thể giúp bạn kiểm tra những vấn đề bạn gặp phải  như các biến hay event đã được call hay chưa. <br>
[https://github.com/vuejs/vue-devtools](https://github.com/vuejs/vue-devtools) <br>

### Giao tiếp Component 
Với dự án thực thế hầu như 1 screen được tạo bởi nhiều component ghép lại. Vì vậy chúng ta phải tạo mối liên kết data giữa các component  với nhau và nó được chia thành 3 loại chính:<br>
+ Trường hợp 1: chuyền dự liệu từ component cha => component con thì chúng ta phải sử dụng props: <br>
`<my-component :firstProp="someValue"></my-component>` <br>
+ Trường hợp 2: chuyền dữ liệu từ  component con => component cha thì chúng ta phải $emit dữ: <br>
Phía component con emit data: </br>
```
export default {
    methods: {
        onClick() {
            this.$emit('nameOfEvent', someValue);
        }
    }
}
```

phía component cha lắng nghe sự kiện từ component con bằng cách.<br>
`<my-component :firstProp="someValue" @nameOfEvent=”doSomething”></my-component>`

+ Trường hợp 3: sử dụng EventBus Trường hợp 2:Về cơ bản thì thường dùng 2 trường hợp trên nhưng trường hợp này cũng rất hữu ích khi sử dụng số lượng data vừa và nhỏ nó đơn giản và dễ dùng.<br>
 Chúng ta tạo 1 vue để liên kết nhưng component không có mối quan hệ hoăc mối qua hệ nó quá rích rắc. Để tạo nó bạn hay làm theo bài viết chi tiết dưới đây.<br>
[ https://alligator.io/vuejs/global-event-bus/](https://alligator.io/vuejs/global-event-bus/)

### Use Vuex
Với data nho nhỏ thì ta dùng EventBus nhưng còn với dữ liệu lớn phức tạp thì ta dùng gì. Chính vì thế người ta đã sinh ra vueX để sử lý những data phức tạp hơn.<br>

Vuex store được xây dựng theo cách để không thể thay đổi trạng thái của nó từ bất kỳ component nào. Bảo đảm rằng trạng thái chỉ có thể biến đổi theo cách có thể dự đoán được. Do đó store của bạn trở thành một nguồn đáng tin: mỗi yếu tố dữ liệu chỉ được lưu một lần và chỉ cho phép đọc để tránh các component của ứng dụng không làm hỏng trạng thái được truy xuất từ các component khác.<br>

Trạng thái và các thay đổi là cơ sở cho Vuex store bất kỳ. <br>

* state là một đối tượng lưu giữ trạng thái của dữ liệu.
* mulatations cũng là một đối tượng chưa những phương thức tác động đến state.

Getter và actions giống như những dự đoán có tính logic của state và mutation:

* getters có các phương thức được dùng để giả lập việc truy xuất trạng thái, và thực hiện một vài công việc tiền xử lý, nếu cần thiết (tính toán dữ liệu, lọc dữ liệu.v.v).
* actions là các phương thức để kích hoạt mutations và xử lý code không đồng bộ.

do bài viết này là tổng hợp nên để biết chiết hơn bạn có thể vào link sau:[https://vuex.vuejs.org/](https://vuex.vuejs.org/)

### Khai báo component ngắn gọn

thường thì viết như sau:
```python
import MyAwesomeComponent from './my-awesome-component.vue';
...
components: {
    'my-awesome-component': MyAwesomeComponent
}
```

ta có thể viết lại: 
```css

...
components: {
    MyAwesomeComponent,
    MyAwesomeComponentTwo,
    MyAwesomeComponentThree
}
```

### Thay đổi param nhưng không update lại component
Tường trường đơn giản nhưng khi làm dự án thực tế lại gặp nó rất nhiều. Cách đơn giản nhất để Tôi khắc phục nó:
`<router-view :key="$route.fullPath">`

### Tìm Hiểu kỹ các chức năng của Hook

 Vue’s lifecycle hooks theo tôi nó là trái tim của Vue nó đơn giản nhưng nó có thể xử lý hầu như các hoạt đông của người dùng.

 ![](https://images.viblo.asia/050509ac-09f0-4a52-bd2e-659c42d925d9.png)

Đây là sơ đồ lifecycle hooks của Vue. Để biết thêm chi tiết về nó bạn có thể đọc thêm.: 

### Structure
Structure sẽ là ý cuối cùng tôi muốn nhắc đến. Một project có hoạt đông tốt hay không , các file có được quản lý một các khoa học hay không ta nên học các quản lý file của vue. <br>
Một người khác nhìn vào Structure của bạn cũng có thể đánh giá được cái level của bạn ở mức độ nào.<br>
Để có thể biết chi tiết hơn về Structure của vue js bạn có thể xem bài viết trước của Tôi tại link: [https://viblo.asia/p/structure-a-vuejs-project-jvElawWDKkw](https://viblo.asia/p/structure-a-vuejs-project-jvElawWDKkw)

### Lời cuối

Cảm ơn các bạn đã đọc bài chia sẻ của Tôi nó ngắn gọn nhưng Tôi hi vọng nó có thể giúp bạn 1 chút chút gì gì đó cho công việc của bạn.<br>
Hy vọng bạn có thể Upvote bài viết của Tôi.