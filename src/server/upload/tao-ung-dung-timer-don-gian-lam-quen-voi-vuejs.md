# Html
Đầu tiên, chúng ta tạo html để thể hiện timer:
```
<div id="timer" class="text-center">
    <span id="minute">20</span>
    <span id="colon">:</span>
    <span id="seconds">00</span>
</div>
```
Tiếp theo, tạo điều khiển bằng các button:
```
<div id="buttons" class="justify-content-center">
    <!--  START BUTTON    -->
    <button id="start" class="btn btn-lg btn-primary" >
        <i class="far fa-play-circle" aria-hidden="true"></i>
    </button>

    <!--   PAUSE BUTTON   -->
    <button id="stop" class="btn btn-lg btn-warning" >
        <i class="far fa-pause-circle"></i>
    </button>

    <!--  RESET BUTTON   -->
    <button id="reset" class="btn btn-lg btn-default" >
        <i class="fas fa-undo"></i>
    </button>
</div>
```
# CSS
Css cơ bản để style cho timer. Ứng dụng có sử dụng Bootstrap và Fontawesome
```
    #timer{
        font-size: 200px;
        color:gray;
    }
    #buttons{
        display: flex;
    }
    button{
        margin: 2px;
    }
```

# Tạo ứng dụng vue

Mô tả sơ về ứng dụng.. app là 1 bộ đếm ngược thời gian, countdown từ 20 phút 00. App có thêm các điều khiển như play, pause, reset timer

Đầu tiên, chúng ta tạo 1 instance của vue và truyền vào DOM element với id  app sử dụng Vue property el. Trong Vue instance, chúng ta định nghĩa các lifecycle methos và các property cần thiết
```
const app = new Vue({
  el: '#app',
  // ========================
  data: {

  },
  // ========================
  methods: {

  },
  // ========================
  computed: {

  }
})
```

Property data giữ các state dữ liệu cũng như dữ liệu động cần thiết để truyền tới DOM. Property methods chứa các method cần thiết cho ứng dụng timer, giữ các điều khiển timer. Property computed giữ các thao tác đến dữ liệu.
# Data

Ở data property, chúng ta tạo các dữ liệu cơ bản cần thiêt cho timer cũng như các state của timer
```
timer: null,
totalTime: (20 * 60),
resetButton: false,
```
totalTimer là là tổng thời gian chạy của timer được tính bằng giây. property timer giữ state của timer và resetButton giữ state bật  tắt của button

# Methods

Chúng ta cấu hình các điều khiển timer  bằng các funcion trong methods
```
startTimer: function() {
    this.timer = setInterval(()=>this.countdown(), 1000);
    this.resetButton = true;
},
stopTimer: function() {
    clearInterval(this.timer);
    this.timer = null;
    this.resetButton = true;
},
resetTimer: function() {
    clearInterval(this.timer);
    this.totalTime = (20 * 60);
    this.resetButton = false;
    this.timer = null;
},
padTime: function(time) {
    return (time < 10 ? '0' : '') + time;
},
countdown: function() {
    this.totalTime--;
}
```

function setInterval() để bắt đầu timer thực hiện coundown method, giảm totalTimer mỗi 1 giây. Methode stopTimer gọi clearInterval để xóa timer đang chạy.
Method resetTimer để thiết lập lại các giá trị ban đầu. Methode padTimer để thêm số 0 vào khi phút hoặc giây nhỏ hơn 10.Ở property computed chúng ta tính toán minutes và seconds từ totalTime. Các giá trị này sẽ được truyền tới DOM
# Đưa các method và biến tới DOM

Chúng ta đã tạo xong các biến, các state values và các methode điều khiển. Để truyền dữ liệu minutes và seconds ta là như sau
```
<div id="timer">
    <span id="minutes">{{ minutes }}</span>
    <span id="middle">:</span>
    <span id="seconds">{{ seconds }}</span>
</div>
```

Chúng ta có 3 button nhưng không hiển thị tất cả. Ban đầu button reset sẽ không được hiển thị, cho đến khi play hoặc pause button được nhấn. Để làm được điều này ta sử dụng **v-if** của Vue
```
<div id="buttons">
<!--     Start TImer -->
    <button id="start" class="button is-dark is-large" v-if="!timer" @click="startTimer">
        <i class="far fa-play-circle"></i>
    </button>
    <!--     Pause Timer -->
    <button id="stop" class="button is-dark is-large" v-if="timer" @click="stopTimer">
        <i class="far fa-pause-circle"></i>
    </button>
    <!--     Restart Timer -->
    <button id="reset" class="button is-dark is-large" v-if="resetButton" @click="resetTimer">
        <i class="fas fa-undo"></i>
    </button>
</div>
```

Điều khiển **v-if**  sẽ render phần tử tùy thuộc vào giá trị true or false của value. **@click** là viết tắt của **v-on:clcick** sẽ gán method được gọi khi click. Ngoài ra vue còn có các điều khiển khác như v-bind, v-for..
# Tổng kết
Ở trên là ứng dụng đơn giản sử dụng các syntax cơ bản của vue, hi vọng giúp bước dầu các bạn làm quen với vue..

Tài liệu tham khảo https://vuejs.vn/
# Run
[https://codepen.io/trangianhuan/pen/aYYQvy](https://codepen.io/trangianhuan/pen/aYYQvy)