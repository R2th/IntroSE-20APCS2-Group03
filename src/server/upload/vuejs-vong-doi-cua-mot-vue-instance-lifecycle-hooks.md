## Lời nói đầu: 
Chào mọi người, đợt này mình có yêu cầu tìm hiểu về Vue để được tham gia dự án. Nhân tiện mình viết  bài viết này dể chia sẻ qua chút kiến thức mà mình tìm hiểu được về Vue. Cụ thể đây về Vue - LifeCycle (vòng đời) của một Instance trong Vue. Mình bắt đầu luôn nhé !! 
## 1. Lifecycle: 
Khi tiếp cận bất kỳ framework nào, chúng ta đều cần phải hiểu rõ **Lifecycle** của chúng, từ lúc khởi tạo ứng dụng, chạy ứng dụng hay kết thúc ứng dụng đấy. Trong Vue cũng vậy, cụ thể dưới đây là sơ đồ vòng đời của một instance trong Vue

 ![](https://images.viblo.asia/9f559384-eeef-41a0-929a-98aaf91eedf5.png)

Sơ đồ phía trên là vòng đời của một instance. Như chúng ta thấy, **Lifecycle** của một instance sẽ gồm 
- Khởi tạo một đối tượng Vue
- Gắn kết vào DOM
- Cập nhật DOM  khi dữ liệu thay đổi
- Hủy instance.


## 2. Lifecycle Hooks 
Với những giai đoạn trong vòng đời của một instance VueJS kể trên, chúng ta sẽ đi vào tìm hiều về **Lifecycle Hooks** tương ứng với từng giai đoạn. Vậy  **Lifecycle  Hooks** là gì : 
- **Lifecycle Hooks** là những phương thức được thực thi trong mỗi giai đoạn trong vòng đời của Vue.
- Với bốn giai đoạn kể trên, lần lượt tương ứng với các hooks: **beforeCreate**, **created**, **beforeMount**, **mounted**, **beforeUpdate**, **updated**, và **beforeDestroy**, **destroyed**.

Chúng ta sẽ lần lượt đi vào chi tiết của mỗi hook.
### Giai đoạn khởi tạo : 
- **beforeCreate** hook chạy mỗi khi khởi tạo một instance. Tại thời điểm này, data, event chưa được thiết lập. 

- **created** hook được chạy khi data, event đã thiết lập thành công. 

Đoạn code dưới sẽ miêu tả về hai function hooks này  

```javascript  
new Vue({
    el: "#app",
    data: {
        content: "Lifecycle Hooks",
    },
    beforeCreate () {
        console.log('before create')
        console.log(this.content) // khi này this.content trả về undefined vì data chưa được nhận (observe).
    },
    created () {
        console.log('created')
        console.log(this.content) // khi này this.content trả về  "Lifecycle Hooks" vì quá trình observe data, thiết lập event đã hoàn thành.
    }
})
```

![](https://images.viblo.asia/f6e347a9-bbee-416d-b374-b6dc5a218381.png)

### Giai đoạn gắt kết DOM:
- **beforeMount** hook sẽ chạy sau khi  data, event được thiết lập và trước khi gắn kết vào DOM. Trong hook này chúng ta vẫn chưa - truy cập được phần tử trong DOM.

- **mounted** hook: giai đoạn này, mounted hook sẽ cho phép chúng ta có thể truy cập vào phẩn tử trong DOM. Tức là khi này, DOM đã được gắn kết.  
```javascript 
new Vue({
    el: "#app",
    data: {
        content: "Lifecycle Hooks",
    },
    beforeMount () {
        console.log('before mount')
        console.log(this.$el.textContent) // lỗi vì chưa gắn kết DOM vì vậy chưa thể truy cập đến các thành phần trong DOM ở console.log sẽ hiển thị ra 
    },
    mounted () {
        console.log('mounted')
        console.log(this.$el.textContent) // khi này this.$el đã gắn kết với DOM, lúc này có thể truy cập được tới các thành phần trong DOM 
    }
})
```
![](https://images.viblo.asia/4aefee5b-794e-4826-b855-2f06e26d89d9.png)

### Giai đoạn cập nhật  DOM khi dữ liệu thay đổi:
![](https://images.viblo.asia/186cbe8a-5f15-4156-b2e3-c1cf31a4c159.png)

- **beforeUpdate** hook : Sau khi đối tượng đã được gắn vào DOM, khi dữ liệu thay đổi, và trước khi render, patch lại và hiển thị ra cho người dùng.  
```javascript
var vm = new Vue({
    el: "#app",
    data: {
        update: ""
    },
    beforeUpdate() {
        alert(this.update)
    },
})
```

![](https://images.viblo.asia/9868b6b8-2bc9-4c31-bbec-d9a1380869bb.gif)

- **updated** hook : Chạy ngay sau khi beforeUpdate . Sử dụng khi bạn cần truy cập DOM sau khi thay đổi thuộc tính. dữ liệu ở beforeUpdate và updated là như nhau

### Giai đoạn hủy instance:
- **beforeDestroy** hook: Là giai đoạn trước khi instance bị hủy. Đây là nơi để quản lý tài nguyên xóa tài nguyên, dọn dẹp các component.
```javascript
var vm = new Vue({
    el: "#app",
    data: {
        content: "Lifecycle Hooks"
    },
    beforeDestroy () {
         this.content = null
         delete this.content
    },
})
```

- **destroyed** hook: Thời điểm này , mọi thành phần đã được hủy bỏ hết. Khi console.log() đối tượng này thì sẽ không nhận được thuộc tính hay dữ liệu gì. 
```javascript
var vm = new Vue({
    el: "#app",
    data: {
        content: "Lifecycle Hooks"
    },
    destroyed () {
        console.log(this) //thời điểm này sẽ không nhận được gì ở console.
    },
})
```

##  Kết thúc: 
Như vậy, qua bài viết này mình đã chia sẻ chút kiến thức mà mình đã tìm hiểu về vòng đời của một Vue Instance. Cảm ơn mọi người đã theo dõi bài viết. Nếu có góp ý về bài viết hãy để lại bình luận bên dưới nhé ! :D Nếu giúp ích được cho mọi người một chút nào đấy thì hãy ấn upvote cho mình nhé .  

### Tài liệu tham khảo: 
https://vuejs.org/v2/guide

https://dzone.com/articles/vuejs-series-lifecycle-hooks