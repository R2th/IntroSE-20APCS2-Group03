# Components là gì?
Component là một trong những tính năng quan trọng nhất trong Vue mà mình cần phải biết. Nó giúp cho việc kế thừa các thành phần HTML cơ bản, dễ dàng đóng gói và tái sử dụng code <br>
Việc tổ chức các component cũng giống như một Dom tree, cũng có phân cấp thành phần<br>
![](https://images.viblo.asia/f5120eb0-6019-4012-b66f-f1edb0f15f89.png)
Tạo project VUE, tham khảo link https://medium.com/@danhlam123/vue-js-getting-started-720d305fd019<br>
Cấu trúc Code Demo<br>
![](https://images.viblo.asia/cb437a66-0db2-427d-8135-0bcc8d372b01.png)
Tạo 3 components ParenA, ChildA, ChildB trong folder “components”<br>
ParentA.vue
```
<template>
    <div id="parent-a">
        <h2>Parent A</h2>
        <pre>data {{ this.$data }}</pre>
        <button @click="reRender">Rerender Parent</button>
        <hr/>
        <child-a :score="score" @updateScore="updateScore"/>
        <child-b :score="score"/>
    </div>
</template>

<script>
import ChildA from './ChildA'
import ChildB from './ChildB'
export default {
  name: 'Parent A',
  data () {
    return {
      score: 100
    }
  },
  methods : {
        updateScore(newScore) {
            this.score = newScore;
        },
        reRender() {
            this.$forceUpdate()
        },
  },
  components: {
      ChildA, ChildB
  }
}
</script>
```
ChildA.vue<br>

```

<template>
    <div id="child-a">
      <h2>Child A</h2>
      <pre>data {{ this.$data }}</pre>
      <hr/>
      <button @click="changeScore">Change Score</button>
      <span>Score: {{ score }}</span>
    </div>
</template>

<script>
export default {
  name: 'Child A',
  props: ['score'],
  methods: {
        changeScore() {
            this.score += 100;
        },
  }
}
</script>
```

ChildB.vue

```
<template>
    <div id="child-b">
      <h2>Child B</h2>
      <pre>data {{ this.$data }}</pre>
      <hr/>
      <span> Show Score: {{ score }}</span>
    </div>
</template>

<script>
export default {
  name: 'Child A',
  props: ['score'],
}
</script>
```

Nhớ thay đổi file router/index.js như sau<br>
```
import Vue from 'vue'
import Router from 'vue-router'
import ParentA from '@/components/ParentA'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: ParentA
    }
  ]
})
```

OK, bây giờ cùng xem thành quả của chúng ta như thế nào nhé<br>

![](https://images.viblo.asia/a0af553b-64dd-484f-a113-2da6e111ec87.png)

Bây giờ chúng ta sẽ xem các Components đã “quan hệ” với nhau như thế nào nhé:<br>


**Sử dụng Prop cho parent->child communication**

Mỗi component instance đều có một scope riêng của nó, nghĩa là mình không thể và cũng không nên trực tiếp gọi tới parent data trong child component template. Data có thể gửi xuống từ component cha thông qua một custom attribute là **props**. Trở lại với ví dụ demo mình sẽ truyền data “score” từ component cha ParentA xuống ChildA và ChildB. Sử dụng props trong child component (ChildA.vue)<br>

Để có thể truyền được data từ component cha thì mình sẽ sử dụng v-bind property trong component cha như sau:<br>

```
<child-a :score="score" @updateScore="updateScore"/>
<child-b :score="score"/>
```

Bây giờ mình cần đăng ký property **props** ở child component và có thể dụng score gần giống như data trong child component<br>

```
<template>
       <span>Score: {{ score }}</span>
</template> 
<script>
    export default {   
       props: ['score']  
    } 
</script>
```

Vậy là chúng ta đã hiển thị thành công score ở Child components. Trong trường hợp, child component cần cập nhật score:<br>

```
<template>
    <div id="child-a">
      <h2>Child A</h2>
      <pre>data {{ this.$data }}</pre>
      <hr/>
      <button @click="changeScore">Change Score</button>
      <span>Score: {{ score }}</span>
    </div>
</template>

<script>
export default {
  name: 'Child A',
  props: ['score'],
  methods: {
        changeScore() {
            this.score += 100;
        },
  }
}
</script>
```

Mở trình duyệt và truy cập localhost:8080 để xem kết quả như thế nào. Có vẻ score đã được cập nhật đúng và k có vấn đề gì phải không nào. Tuy nhiên, khi bật bảng điểu khiển, ta sẽ nhận được warning từ Vue:<br>
> [Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop’s value. Prop being mutated: “score”
>
Vue thì thầm bên tai ta rằng prop sẽ bị ghi đè nếu cha mẹ tái xuất hiện. Hãy kiểm tra điều này bằng cách mô phỏng hành vi đó với $forceUpdate()<br>
Bây giờ, khi chúng ta thay đổi điểm số và sau đó nhấn nút Rerender ở Parent A , chúng ta có thể thấy rằng điểm số ở Child A trở về giá trị ban đầu từ Parent A.<br>
Vậy làm sao để tránh bị Vue Warning? Ta sẽ không update trực tiếp props mà thay vào đó ta sẽ xử lý biến local của Child Components<br>
```
<template>
    <div id="child-a">
      <h2>Child A</h2>
      <pre>data {{ this.$data }}</pre>
      <hr/>
      <button @click="changeScore">Change Score</button>
      <span>Score: {{ localScore }}</span>
    </div>
</template>

<script>
export default {
  name: 'Child A',
  props: ['score'],
  data: function() {
      return {
          localScore : this.score
      }
  },
  methods: {
        changeScore() {
            this.localScore += 100;
            //this.$emit("updateScore", this.localScore);
        },
  }
}
</script>
```

Bây giờ cùng vào localhost:8080, bật Ctrl + Shift + I và xem Vue còn báo warning khi click Change Score k nhé? <br>
Ok vậy là ta đã đi được hơn 1 nửa chặng đường rồi. Ta đã biết cách thằng cha truyền dữ liệu cho component con xử lý như thế nào rồi. Bây giờ, nếu muốn thay đổi từ bên trong thằng con cũng sẽ tác động đến thằng cha thì ta cần làm gì?<br>
S ử dụng emit để mình có thể gửi đi một sự kiện ra bên ngoài component, thông báo với cha của nó rằng “hey tao vừa cập nhật điểm số đấy, điểm mới là 200 nhé” từ đó component cha sẽ cập nhật điểm tương ứng. Hàm $emit mình sẽ truyền vào 2 tham số, tham số thứ nhất là định danh của event (để biết là m đổi điểm chứ k đổi tên) và tham số thứ 2 là dữ liệu muốn truyền đi tới hàm nhận xử lý (new Score).<br>
```
changeScore() {
        this.score += 100;
        this.$emit("updateScore", this.localScore);
},
```

Bây giờ tại component cha mình cần bắt lấy cái sự kiên mà child component phát ra <br>

```
<template>
      <child-a :score="score" @updateScore="updateScore"/>
</template>
<script>
updateScore(newScore) {
     this.score = newScore;
},
</script>
```

$event sẽ refer tới tham chiếu tới data mà mình đã truyền lên thông qua hàm $emit Kết quả ok khi mà việc cập nhật dữ liệu ở con hay ở cha đều được đồng bộ sang bên kia. <br>
Woa, giờ cùng tận hưởng thành quả của mình nào. <br>
Khi nhấn Change Score ở childA component, bạn sẽ thấy score ở parentA và childB đã thay đổi theo, thật kỳ diệu phải k :)))) <br>
Link source code: https://github.com/lamnd/hello-vue <br>
#     Kết luận
Qua bài viết mình đã chia sẻ những cách cơ bản nhất có thể sử dụng để giao tiếp, chia sẻ trạng thái giữa các component với nhau mà mình đã tìm hiểu được trong quá trình tìm hiểu về Vuejs.