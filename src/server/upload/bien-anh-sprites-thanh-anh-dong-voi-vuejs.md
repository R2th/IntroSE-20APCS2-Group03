# Ảnh sprites là gì?

Sprites là một hình ảnh lớn được tạo ra bằng cách gộp nhiều ảnh nhỏ lại với nhau theo một cách được định trước sao cho có thể tái sử dụng lại từng ảnh nhỏ mà không bị ảnh hưởng bởi các ảnh khác. 

Kiểu như thế này : 

![](https://images.viblo.asia/a28b8126-1298-4ca7-a507-53865b32238d.png)

Hoặc các sticker của fb:

![](https://scontent.fhan2-4.fna.fbcdn.net/v/t39.1997-6/p235x165/67539452_1159079340882542_8277748228300996608_n.png?_nc_cat=110&_nc_eui2=AeH2-OIUf83EPlhM5IGEZi74aLkSeDNWcKSrvRdsOkqEdn3BNjMAWULBFwWtEiXn2yNSrbycS4k812lEytZ8Cs1KgJWfxxNuQanFl3Rebv049Q&_nc_oc=AQnPO6loogCDtjBqtK6O4Jh5Fa_pXVGnqJ4JXcFkziKXFGDDnsEyRYuP15shcqg1TjQ&_nc_ht=scontent.fhan2-4.fna&oh=c43b6be170ac16f2e449bc149d1a2099&oe=5DFECA0E)

![](https://scontent.fhan2-4.fna.fbcdn.net/v/t39.1997-6/s851x315/67530709_1159072887549854_2673552395128012800_n.png?_nc_cat=110&_nc_eui2=AeEylH9tKEBvrL0-otkHUeAQkmsPgTx2No0kxgYubflSqwvBbxD5OJjEeAVxNM3gVQOySKyaQWiSruhLdbMcVjmHS3RRhVYTaDE8zCvzLWQ8gQ&_nc_oc=AQnrfyZgqePF4bC4Fq_DjZUjfPoFyKMRd0FwqvYrQEsMxtXcZBAA1BnnYF9OkZlceRM&_nc_ht=scontent.fhan2-4.fna&oh=53889069282914a6029d4927539cf96d&oe=5E104D7F)
# Mục tiêu của bài viết
* Qua bài viết này mình muốn chuyển các ảnh sprites đứng yên kia thành anh động bằng cách viết 1 **component vuejs**. 

*  Các bạn cũng có thể tham khảo cách khác bằng **canvas** của HTML5 qua bài viết này : https://viblo.asia/p/cach-tao-anh-giong-gif-bang-javascript-khong-phai-ai-cung-biet-YWOZr6xrZQ0

# Ưu điểm so với việc dùng ảnh gif
1. Tôi ưu hơn performance web vì thay vì load ảnh gif thì thay vào đó là anh png.
2.  Có thể tương tác với ảnh (vd: có thể cho ảnh dừng lại hoặc tiếp tục chuyển động, hoặc chuyển động vs số lần nhất định rồi ngừng).
3.  Tùy chỉnh chuyển động nhanh chậm của ảnh.
# Xây dựng component vuejs
## Hướng giải quyết
Đơn giản chỉ là dùng js để thay đổi `background-position` qua từng phần của bước ảnh và lặp lại khi đến ảnh cuối vậy là mình đã có 1 ảnh tương tự gif.

## Viết component
Khởi tạo các props và style cho component: 

```js
<template>
  <div :style="style">
  </div>
</template>

<script>
import { clearInterval } from 'timers';
export default {
  props: {
    image: String, // Url image
    height: Number, // chiều cao của component
    width: Number, // chiều rộng của component
    loop: Number, // số lần lặp của ảnh
    frame: Number, // số hình chạy qua trên 1 giây
    max: Number, // số hình của ảnh
    column: Number, // số cột
    row: Number, // số dòng
  },

  data(){
  // khởi tạo style ban đầu
    return {
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        background: `url(${this.image})`,
        backgroundSize: `${this.width * this.column}px ${this.height * this.row}px`,
        backgroundPosition: '0px 0px'
      }
    }
  },
```

Tiếp theo chúng ta viết function để ảnh có thể chuyển động.

```js
 methods: {
    play() {
      let i = 0
      let position = {
        x: 0,
        y: 0,
        loop: 0,
      } // khởi tạo vị trí ban đầu
      const playTimer = setInterval(() => {
        i++;
        if(i % this.column) {
          position.x -= this.width; 
        } else {
          position.y -= this.height; 
          position.x = 0;
        }

        if (i == this.max) {
          i = 0
          position.y = 0; 
          position.x = 0;
          position.loop++;
          if(position.loop >= this.loop) {
            clearInterval(playTimer)
          }
        }
        
        this.$set(this.style, 'backgroundPosition', `${position.x}px ${position.y}px`) // set lại style
      }, 1000/this.frame);
    }
  }
```

Gọi hàm play() 

```js
mounted() {
    this.play()
  },
```

Vậy là chúng ta đã viết xong component để ảnh chuyện động. full code :

```js
<template>
  <div :style="style">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    image: String,
    height: Number,
    width: Number,
    loop: Number,
    frame: Number,
    max: Number,
    column: Number,
    row: Number,
  },

  mounted() {
    this.play()
  },

  data(){
    return {
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        background: `url(${this.image})`,
        backgroundSize: `${this.width * this.column}px ${this.height * this.row}px`,
        backgroundPosition: '0px 0px'
      }
    }
  },
  
  methods: {
    play() {
      let i = 0
      let position = {
        x: 0,
        y: 0,
        loop: 0,
      }
      const playTimer = setInterval(() => {
        i++;
        if(i % this.column) {
          position.x -= this.width; 
        } else {
          position.y -= this.height; 
          position.x = 0;
        }

        if (i == this.max) {
          i = 0
          position.y = 0; 
          position.x = 0;
          position.loop++;
          if(position.loop >= this.loop) {
            clearInterval(playTimer)
          }
        }
        
        this.$set(this.style, 'backgroundPosition', `${position.x}px ${position.y}px`)
      }, 1000/this.frame);
    }
  }
}
</script>

```

Việc tiếp theo là chúng ta gọi component này ra và sử dụng thôi.

Mình test thử với ảnh này nhé: 
![](https://images.viblo.asia/a28b8126-1298-4ca7-a507-53865b32238d.png)

```js
<template>
  <div id="app">
    <ImageGif
      image = "https://images.viblo.asia/a28b8126-1298-4ca7-a507-53865b32238d.png"
      :width="100"
      :height="100"
      :column="7"
      :row="4"
      :max="27"
      :frame="20"
      :loop="10"
    />
  </div>
</template>

<script>
import ImageGif from './components/image-gif.vue'

export default {
  name: 'app',
  components: {
    ImageGif
  }
}
</script>

```

Thành quả : 

![](https://images.viblo.asia/6161d4d6-de76-4b2d-8ecf-b5034b503b11.gif)

https://codesandbox.io/s/vue-template-znn3p
# Kết luận

Các bạn cũng có thể tham khảo thêm github: 
https://github.com/tuananhp-1844/image-gif