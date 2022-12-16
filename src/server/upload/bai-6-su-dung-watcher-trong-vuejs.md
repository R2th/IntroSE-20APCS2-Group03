Chào mừng các bạn quay trở lại series học VueJS với Laravel của mình. Ở bài trước mình đã hướng dẫn các bạn về [Computed](https://viblo.asia/p/bai-5-su-dung-computed-trong-vuejs-su-khac-nhau-giua-computed-va-methods-Do754MMQKM6). Ở bài này chúng ta sẽ chuyển qua tìm hiểu về `watcher`, một các rất hữu hiệu để quan sát và xử lý khi có một thay đổi trên dữ liệu.
# Giới thiệu và cách sử dụng
Cùng với `computed` có thể xử lý việc chỉ tính toán lại khi có sự thay đổi trên dữ liệu, giúp tiết kiệm được nhiều chi phí thì Vue cung cấp cho chúng ta một cách tổng quan hơn để xử lý những dữ liệu bị thay đổi

Với việc sử dụng `watch` có thể giúp chúng ta theo dõi sự thay đổi và sau đó thực hiện những tính toán phức tạp.

Chúng ta sẽ cùng làm một vài ví dụ để hiểu hơn về `watch` nhé. Quay trở lại với ví dụ ở các bài trước. 
```html
<template>
    <div class="my-component">
        <div>{{ message }}</div>
        <div><button @click="changeMessage">Click me</button></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'This is my first component using binding data'
            }
        },
        methods: {
            changeMessage() {
                this.message = 'this is new message'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Ở đây khi chúng ta click vào button thì giá trị của message sẽ bị thay đổi. Chúng ta sẽ thêm `watcher` cho `message` để mỗi lần giá trị của nó thay đổi thì ta sẽ in ra cửa sổ console một thông báo nhé. Ta sửa lại code như sau
```html
<template>
    <div class="my-component">
        <div>{{ message }}</div>
        <div><button @click="changeMessage">Click me</button></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'This is my first component using binding data'
            }
        },
        methods: {
            changeMessage() {
                this.message = 'this is new message'
            }
        },
        watch: {
            message() {
                console.log('message changed')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Các bạn mở ứng dụng lên, click vào button và xem kết quả nhé:

![](https://images.viblo.asia/e4b8de93-1355-4ca7-94c6-2085e016ac43.png)

Các bạn có thể thấy khi message thay đổi thì trên cửa sổ console đã xuất hiện thông báo. Vì computed cũng sử dụng giống như những property trong `data` nên chúng ta cũng có thể `watch computed`, cùng xem thử đoạn code sau:
```html
<template>
    <div class="my-component">
        <div>{{ reverseMessage }}</div>
        <div><button @click="changeMessage">Click me</button></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: ''
            }
        },
        methods: {
            changeMessage() {
                this.message = 'this is new message'
            }
        },
        computed: {
        	reverseMessage() {
        		return this.message.split('').reverse().join('')
        	}
        },
        watch: {
            reverseMessage() {
                console.log('Computed changed')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Ở đây khi click vào button thì `message` thay đổi dẫn đến `computed` thay đổi theo, khi watcher sẽ nhận biết và làm các công việc cần thiết.

Tiếp theo, một trường hợp khá phổ biến là khi các bạn muốn watch khi có sự thay đổi của các thuộc tính bên trong một object. Cùng xem ví dụ sau.
```html
<template>
    <div class="my-component">
        <div>{{ message.text }}</div>
        <div><button @click="changeMessage">Click me</button></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: {
                    type: 'greeting',
                    text: 'How are you?'
                }
            }
        },
        methods: {
            changeMessage() {
                this.message.text = 'this is new message'
            }
        },
        watch: {
            message: {
                handler: function () {
                    console.log('something changed')
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Ở trên chúng ta có đối tượng message với 2 thuộc tính và giá trị tương ứng. Khi muốn watch sự thay đổi của bất kì dữ liệu nào bên trong `message` thì chúng ta cần sử dụng đến `deep watch`. Các bạn thử load lại trình duyệt và test kết quả nhé.

Vậy có bạn sẽ thắc mắc: "thế muốn chỉ watch với một thuộc tính cụ thể thì làm thế nào, chẳng hạn muốn watch với chỉ `type` hoặc `text` thì sao?". Khi đó chúng ta sử dụng một chút thủ thuật sau nhé, cùng xem qua code nào các bạn:
```html
<template>
    <div class="my-component">
        <div>Message type: {{ message.type }}</div>
        <div>Message text: {{ message.text }}</div>
        <div><button @click="changeType">Change type</button></div>
        <div><button @click="changeText">Change text</button></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            	message: {
            		type: 'greeting',
            		text: 'How are you?'
            	}
            }
        },
        methods: {
            changeType() {
                this.message.type = 'this is new type'
            },
            changeText() {
                this.message.text = 'this is new text'
            }
        },
        computed: {
            getType() {
                return this.message.type
            },
            getText() {
                return this.message.text
            }
        },
        watch: {
            getType() {
            	console.log('type changed')
            },
            getText() {
            	console.log('text changed')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Chúng ta tạo ra `computed` với giá trị trả về là thuộc tính mong muốn `watch` của đối tượng. sau đó ở `watch` chúng ta áp dụng lên các `computed` đó.

Các bạn thử load lại trình duyệt và xem kết quả xem thế nào ;).
# Kết luận
Qua bài này hi vọng rằng các bạn đã hiểu được phần nào đó những tác dụng bằng cách sử dụng `watcher` để có thể theo dõi sự biến đổi của dữ liệu, từ đó áp dụng vào công việc thực tế của chính mình.

Bài tiếp theo chúng ta sẽ cùng tìm hiểu về `Conditional Rendering` (giống như các toán từ điều kiện `if`, `else`, mà chúng ta thường dùng).

Cám ơn các bạn đã theo dõi, có gì thắc mắc các bạn comment bên dưới nhé ^^!