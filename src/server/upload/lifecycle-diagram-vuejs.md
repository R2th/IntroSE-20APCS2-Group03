Vòng đời của VueJS hay còn gọi là cách thức, cơ chế hoạt động của VueJS. Khi tạo 1 đối tượng, cập nhật, hay hủy bỏ ... đều được đưa vào vòng đời của VueJS.  Ở đây mình xin nhắc tới khái niệm `Hooks`. `Hooks` có thể được hiểu là các phương thức, các hàm được cung cấp sẵn, có thể can thiệp vào từng giai đoạn của vòng đời.
Để hiểu rõ hơn, chúng ta cùng xem qua sơ đồ:
    ![](https://images.viblo.asia/e8852dab-3080-40f8-8e29-4271165e5f75.png)

Vòng đời VueJS gồm 4 phần chính:
- Khởi tạo Component
- Mounting (Chèn phần tử DOM)
- Updating (Diff & Re-render)
- Destruction (Hủy bỏ)


## 1. Khởi tạo Component
-  `Component` là 1 trong những tính năng mạnh mẽ nhất của VueJS bởi `khả năng tái sử dụng` của nó.
-  Khi `Component` chạy, `Hook` khởi tạo sẽ thiết lập những gì liên quan đến `component` trước khi được đưa vào `DOM`. Bạn sẽ không thể truy xuất vào `DOM` hoặc phần tử đã được hook khởi tạo mounting (**this.$el**).
-  Có 2 phương thức được sử dụng khi khởi tạo: **beforeCreate()** và **created()**.

### beforeCreate()
- Hook `beforeCreate` sẽ được gọi đồng bộ ngay sau khi Vue được khởi tạo. Các `dữ liệu (data)` và `sự kiện (event)` chưa được thiết lập.

```
   export default {
        data() {
            return {
            content: 'Dữ liệu trong beforeCreate'
            }
        },
        beforeCreate() {
            console.log('beforeCreate Hook')
            console.log(this.content)
        }
    }
```
- Mở `console` của trình duyệt, ta thu được kết quả:
    ![](https://images.viblo.asia/82757b19-d752-474f-8a82-d1576e60f966.png)
    + Dễ dàng nhận thấy `this.content` không nhận được giá trị từ `data` và `log` hiển thị ra `undefined`.

### created()
 - Lúc này, các `dữ liệu (data)` và `sự kiện (event)` đã được thiết lập.

 ```
   export default {
        data() {
                return {
                content: 'Dữ liệu trong Created'
                }
        },
        beforeCreate() {
                console.log('Create Hook')
                console.log(this.content)
        }
   }
```

- Mở `console` của trình duyệt, ta thu được kết quả:
    ![](https://images.viblo.asia/ec8c96b9-dd23-4311-9e6f-bb53efbc2d6b.png)


## 2. Mounting (Chèn phần tử DOM)
- Hook `Mounting` được sử dụng rộng rãi khi làm việc với các `component`. Nó cho phép truy xuất vào các `component` ngay lập tức trước và sau khi nó được hiển thị lần đầu tiên. Và nó cũng được sử dụng khi bạn muốn sửa đổi `DOM` trước và sau khi render.
- `Chú ý:` Trong quá trình reder từ phía máy chủ, Hook `Mounting` không nên được sử dụng để tìm nạp dữ liệu cho các `component` khi khởi tạo.

### beforeMount()
 - Hook này khá ít dùng. Nó sẽ thực hiện sau khi render function hoàn tất và trước khi render chính thức phần tử `DOM` của lớp Vue. Tại đây bạn vẫn chưa thể truy cập đến **$el**. Cũng giống như **created()** ở trên, tuy nhiên mọi thứ như `template` và các `DOM ảo (Virtual DOM)` đã sẵn sàng để render vào **$el**.

### mounted()
 - Trong hook `Mounted`, ta đã có thể hoàn toàn truy cập đến các `component`, `template` và `DOM` thông qua **this.$el** (hoặc **vm.$el**)
```
   export default {
        mount() {
                console.log('This $el:')
                console.log(this.$el)
        }
   }
```
- Nếu như ở trên `created()` không thể truy cập được **this.$el** thì hook `mounted()` hoàn toàn có thể:
    ![](https://images.viblo.asia/1e9a392b-b576-4917-810a-7b59768c501c.png)

## 3. Updating (Diff & Re-render)
- Hook `Updating` sẽ được gọi khi có sự thay đổi trong `component`. Nó sẽ khiến `component` re-render. Hook này sẽ đưa `component` của bạn vào chu kỳ `watch - compute - render`.

### beforeUpdate()
 - Hook này được gọi ngay khi có sự thay đổi đổi `dữ liệu (data)` trên `component`. Và được thực hiện trước khi `DOM` re-render. Bạn có thể lấy được `dữ liệu mới (new data)` ở đây.
```
<template>
    <div class="pull-right">{{ count }}</div>
</template>
<script>
    export default {
        data() {
            return {
                count : 0
            }
        },
        created() {
            setInterval(() => {
                this.count++
                console.log("Change data count of component: " + this.count)
            }, 1000)
        },
        beforeUpdate() {
            console.log(this.count)
        }
    }
</script>
```
- Ở đây mình sẽ cho `count` tăng dần sau mỗi 1 giây. Mở `log` trên trình duyệt ta nhận được:
    ![](https://images.viblo.asia/426240ef-704f-4722-995a-416a373bdb1e.png)

### updated()
 - Hook `Updated` được chạy ngay lập tức sau khi dữ liệu thay đổi trên `component`. Và dữ liệu truy xuất được là dữ liệu sau khi được thay đổi của `component`, cũng là dữ liệu lấy được trên `beforeUpdate()`.
 - `Chú ý:` Nên tránh việc thay đổi data khi sử dụng hook này. Mà thay vào đó hãy sử dụng các thuộc tính `watcher` hoặc `computed`.
   ```
   <template>
        <div class="pull-right">{{ count }}</div>
    </template>
    <script>
        export default {
            data() {
                return {
                    count : 0
                }
            },
            created() {
                setInterval(() => {
                    this.count++
                    console.log("Change data count of component: " + this.count)
                }, 1000)
            },
            updated() {
                console.log("Data updated: " + this.count)
            },
            beforeUpdate() {
                console.log("Data beforeUpdate: " + this.count)
            }
        }
    </script>
   ```
   
 - Kết quả thu được:
     ![](https://images.viblo.asia/e0e8d65f-513c-4ea2-a46d-2a5f0bfa4542.png)
## 4. Destruction (Hủy bỏ)
- Hook `Destruction` dùng để thực hiện các hành động khi `component` của bạn bị hủy bỏ. Hay nói cách khác là xóa khỏi `DOM`. 

### beforeDestroy()
  - Được gọi ngay trước khi hủy bỏ `component`. Đây là giai đoạn thích hợp nhất để xóa bỏ `dữ liệu (data)`, các `sự kiện (events)` để dọn dẹp.

### destroyed()
  - Được gọi khi `component` đã bị xóa bỏ khỏi `DOM`.

    ```
    <template>
        <div id="root" class="pull-right">
            <test-component v-if="show"></test-component>
            <button class="btn btn-default" @click="show = !show">Action</button>
        </div>
    </template>
    <script>
        import Vue from 'vue'
        Vue.component('test-component', {
            template: '<div>VueJS {{ content }}</div>',
            data() {
                return {
                    content : 'QuanTien',
                    interval : ''
                }
            },
            beforeDestroy() {
                this.content = null
                delete this.content
                clearInterval(this.interval)
                console.log('beforeDestroy')
            },
            destroyed() {
                console.log('destroyed && content = ' + this.content)
            },
            created() {
                this.interval = setInterval(() => {
                    console.log('not removed')
                },1000)
            }
        })
        export default {
            data() {
                return {
                    show : true
                }
            }
        }
    </script>
    ```
   - Kết quả thu được:
   ![](https://images.viblo.asia/67b2e29c-b5a5-46d5-8ae6-073955aeb5c2.png)
   

## Tài liệu tham khảo:
https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram

https://www.9spl.com/blog/4-main-categories-vuejs-lifecycle/