Chào mừng các bạn quay trở lại với series học VueJS với Laravel của mình, ở bài trước mình đã hướng dẫn các bạn cách [tạo component là truyền dữ liệu giữa chúng](https://viblo.asia/p/bai-9-chia-ung-dung-thanh-component-va-giao-tiep-giua-cac-component-trong-vuejs-jvEla4WNZkw). Tiếp theo bài này chúng ta sẽ tìm hiểu về vòng đời của một Vue instance để có thể hiểu rõ hơn và sử dụng vào thực tế nhé. 

> Bạn nào đang dùng Vue 3 thì để ý xem phần cuối cùng trong bài này nhé
# Giới thiệu
Trong bài này mình lấy nhiều ý tưởng từ bài [post](https://alligator.io/vuejs/component-lifecycle/) này vì mình thấy nó khá là ổn, mình sẽ thêm ví dụ thực tế mình áp dụng để các bạn hiểu rõ hơn nhé.

Trong quá trình phát triển ứng dụng bạn sẽ thường xuyên phải quan tâm tới những việc kiểu như khi nào thì component được tạo, khi nào thì được thêm vào DOM, khi nào được cập nhật hay khi nào thì nó bị huỷ đi. Bằng cách hiểu rõ hơn về vòng đời của Vue instance sẽ giúp chúng ta hiểu rõ được bản chất Vue hoạt động ra sau đằng sau vẻ ngoài hào nhoáng nhé :-D.

Chúng ta cùng xem qua bức ảnh "kinh điển" dưới đây (ảnh được lấy từ [trang chủ Vue ](https://vuejs.org/)): 

![Vue_lifecycle](https://images.viblo.asia/e9438f46-f91b-4384-ab5e-2d64d866a15c.png)

# Creating
Quá trình khởi tạo là quá trình diễn ra trước nhất trên component, ở quá trình này chúng ta có thể thực hiện các hành động với dữ liệu của component trước khi chúng thực sự được thêm vào DOM. Trong quá trình này chúng ta có thể thiết lập các thông số, thực hiện thao tác lấy dữ liệu trước khi component được đưa vào DOM. 

Ví dụ như mình hay làm các thao tác lấy dữ liệu từ backend bên Laravel ở giai đoạn này (sử dụng `created`). Các thao tác lên các phần tử trong DOM lúc này sẽ không thực hiện được, điều đó lý giải cho việc chúng ta dùng JQuery trong `created` và bị báo lỗi `$ is not defined`.

Sử dụng ví dụ từ các bài trước, ở bài này chúng ta tạo mới một file tên là `LifeCycle.vue`, sau đó các bạn khai báo nó trong `app.js` và `welcome.blade.php`. Nhớ luôn chạy `php artisan serve` và `npm run watch` nhé:
```html
<template>
    <div id="my-text">
        This is my text
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
</style>
```
### beforeCreate
Hàm `beforeCreate`(mình sử dụng từ này cho các bạn dễ hình dung, chuẩn hơn nên dùng là `hook`) chạy ngay trước quá trình mà một component được khởi tạo. Trong quá trình này các `data` mà chúng ta khai báo chưa `reactive` (tự thay đổi khi có cập nhật) đồng thời các `events` cũng chưa được khởi tạo. 
```html
<template>
    <div id="my-text">
        This is my text
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'Hello World'
            }
        },
        beforeCreate() {
            console.log(this.message)
        }
    }
</script>

<style lang="scss" scoped>
</style>
```

Ví dụ trên khi các bạn chạy sẽ thấy báo lỗi  `undefined` vì lúc này ta chưa thể tương tác với dữ liệu trong `data`
### created
Ngay khi component được tạo, hàm `created` có thể được sử dụng để thao tác với các dữ liệu trong `data` và các sự kiện mà các bạn thiết lập đã có thể được kích hoạt. Nhưng `template` và DOM ảo chưa được `mount` và `render`, tức là nếu các bạn truy cập đến các phần tử trong DOM lúc này sẽ không được và báo lỗi.
Chúng ta sửa lại file ví dụ như sau:
```html
<template>
    <div id="my-text">
        This is my text
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'Hello World'
            }
        },
        created() {
            console.log(this.message)

            console.log(document.getElementById('my-text').innerHTML)
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Khi chạy sẽ báo lỗi sau: 

![error_created_Vue](https://images.viblo.asia/535f7e84-a311-41c7-9191-4d068c4dcee8.png)

Chỉ có dòng in ra `message` trong `data` được thực hiện, còn việc truy cập vào phần tử `my-text` trên `template` sẽ báo lỗi. Mình hay sử dụng created để fetch data từ phía backend ngay lúc khởi tạo.

> Thường chúng ta sẽ gọi API tới backend để lấy dữ liệu ở `created`, để đến khi component được mount (được render ra DOM thật - có thể nhìn thấy trên trình duyệt) là đã có dữ liệu ngay. Phần mounting mình sẽ trình bày ở phần tiếp

> Nếu bạn nào dùng React thì `created` tương tự như `componentWillMount` nhé ;) (mặc dù giờ `componentWillMount` chuẩn bị bị xoá rồi :))
# Mounting
Quá trình `mounting` xảy ra ngay trước và sau khi component của các bạn được khởi tạo. Thường được sử dụng khi các bạn cần truy cập vào các phần tử trong DOM, ví dụ điển hình là chúng ta đã có thể dùng JQuery tại quá trình này. Và `không nên` sử dụng nếu các bạn muốn fetch data cho các thiết lập ban bởi vì `mounting` chỉ chạy trong quá trình `client side rendering` nên nếu các bạn sử dụng `server side rendering` sẽ báo lỗi, `created` thì có thể chạy trên cả 2 loại.

Bài viết về server và client side rendering các bạn có thể xem ở [đây](https://medium.freecodecamp.org/what-exactly-is-client-side-rendering-and-hows-it-different-from-server-side-rendering-bd5c786b340d)
### beforeMount
`beforeMount` được gọi sau khi component đã được compile và trước lần render đầu tiên. Ở giai đoạn này khi các bạn truy cập đến các phần tử trong DOM vẫn sẽ báo lỗi:
```html
<template>
    <div id="my-text">
        This is my text
    </div>
</template>

<script>
    export default {
        beforeMount() {
            console.log(this)
            console.log(document.getElementById('my-text').innerHTML)
         }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ở đây khi chạy các bạn có thể thấy đã có thể in ra `this` là component hiện tại nhưng truy cập vào Virtual DOM thì vẫn báo lỗi null
### mounted 
Ở quá trình này chúng ta đã có đầy đủ quyền truy cập vào `data`, `template`, DOM (bằng cách gọi `this.$el`). Mình thường dùng `mounted` khi dùng chung với Jquery để tác động vào các phần tử DOM, như ở ví dụ bên dưới ta đã có thể truy cập vào các phần tử trong DOM:
```html
<template>
    <div id="my-text">
        This is my text
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log(this.$el)
            console.log(document.getElementById('my-text').innerHTML)
         }
    }
</script>

<style lang="scss" scoped>
</style>
```
Giải thích nghe hơi khó hiểu nhỉ :-D

Một cách hiểu đơn giản hơn: `mounted` là khi mà chúng ta đã nhìn thấy nội dung ở trên trình duyệt. :)

Ở phần trước mình có nói là nên gọi API tới backend lấy dữ liệu ngay từ `created` lí do bởi vì nếu ta gọi ở `mounted` thì có thể lúc ta F5 ở trình duyệt sẽ thấy 1 khoảng màn hình trắng trong trường hợp component của chúng ta to, cần nhiều thời gian để render khi dữ liệu được lấy về

> Mounted ở Vue giống như ComponentDidMount ở bên React
# Updating
Quá trình này được gọi bất cứ khi nào các dữ liệu `reactive` bị thay đổi hoặc ta tác động khiến cho component phải re-render.

Các hàm sử dụng trong quá trình này thường sử dụng trong debug xem khi nào component re-render, còn nếu các bạn muốn debug với các dữ liệu `reactive` thì nên dùng `computed` hoặc `watch`
### beforeUpdate
Quá trình này được gọi ngay sau khi dữ liệu trên component bị thay đổi và trước khi component re-render, ví dụ bên dưới sẽ log ra màn hình liên tục các giá trị của `counter` sau khi nó bị thay đổi và trước khi DOM được re-render:
```html
<template>
    <div id="my-text">
        {{ counter }}
    </div>
</template>

<script>
    export default {
      data() {
        return {
          counter: 0
        }
      },
      beforeUpdate() {
        console.log(this.counter) // Logs the counter value every second, before the DOM updates.
      },
      created() {
        setInterval(() => {
          this.counter++
        }, 1000)
      }
}
</script>

<style lang="scss" scoped>
</style>
```
**Chú ý**: 
Ở đầu bài post mình có nói là bài này mình lấy ý tưởng từ một bài post khác (link mình có đính kèm trên đầu), nhưng ở phần này họ chỉ đưa ra code phần `script`, khi chạy thì ta không thấy log ra console gì cả.

Mấu chốt là ta không render nó mà mới chỉ thay đổi nó nên mỗi khi thay đổi dữ liệu ta không re-render cái gì cả nên hàm `beforeUpdate` không được gọi.
### updated
Quá trình này xảy ra sau `beforeUpdate`, ở đây DOM đã được cập nhật lại, ở ví dụ dưới ta có thể so sánh giá trị ngay sau khi ta set ở mỗi vòng `interval` và giá trị sau khi `updated` đều bằng nhau, chứng tỏ DOM đã được re-render thành công:
```html
<template>
    <p ref="dom-element">{{counter}}</p>
</template>
<script>
export default {
    data() {
        return {
          counter: 0
        }
    },
    updated() {
        // Fired every second, should always be true
        console.log(+this.$refs['dom-element'].textContent === this.counter)
    },
    created() {
        setInterval(() => {
          this.counter++
        }, 1000)
    }
}
</script>

<style lang="scss" scoped>
</style>
```

> `Updated` ở Vue giống như `ComponentDidUpdate` bên React ;)
# Destroy
> Ở Vue 3 thì **beforeDestroy** và **destroyed** được đổi tên thành **beforeUnmount** và **unmounted** các bạn nhé.
### beforeDestroy
Quá trình này xay ra ngay trước khi component của chúng ta bị huỷ đi (ví dụ như lúc chúng ta chuyển từ component này sang component khác, hay như lúc ta chuyển route,...). Tại đây component vẫn còn đầy đủ những yếu tố như `data`, `events`,... Ta thường dùng hàm này để xoá đi các sự kiện không cần thiết sau khi component bị huỷ

Với mình đó là khi mình làm chức năng chat realtime, khi khởi tạo component mình sẽ lắng nghe sự kiện khi có một người dùng gửi tin nhắn đến sẽ có tiếng "Bíp", nếu chúng ta để nguyên thì khi chuyển route, qua component khác, khi có người dùng nhắn tin đến vẫn thấy tiếng kêu "Bíp", bởi vì mình vẫn đang tiếp tục lắng nghe sự kiện, do đó mình đã phải dùng tới `beforeDestroy` để huỷ lắng nghe khi chuyển trang.

Ví dụ phần này thì cũng không có gì khác biệt nên các bạn có thể tự làm nhé.

> `beforeDestroy` ở Vue giống như `componentWillUnmount` ở bên React ;)
### destroyed
Tại quá trình này thì hầu như mọi thứ trên component đã bị huỷ đi: các directives bị huỷ, các event lắng nghe bị bỏ đi, các component con cũng đã bị destroy, watchers cũng đã bị huỷ,... nhưng ở ta vẫn có thể làm một số việc như thông báo với remote server là component vừa bị huỷ chẳng hạn.
> Note: tại đây ta `data` vẫn còn và ta vẫn có thể truy cập được.

## errorTriggered
Hook này được gọi khi có lỗi xảy ra trong quá trình render 1 component: truy cập vào biến không tồn tại, throw lỗi không mong muốn...
```js
export default {
  created() {
    throw new Error('test')
  },
  errorTriggered(error) {
    console.log(error)
  }
};
```
> Hook này nom tác dụng na ná như Error Boundary bên React ;)
# activate và deactivate
Ngoài ra Vue còn có 2 quá trình nữa là `activate` và `deactivate` các bạn có thể xem trên trang chủ của Vue nhé.

# DOM, DOM ảo và Re-render là gì?
Ở trong bài mình có hay nhắc tới khái niệm DOM, và re-render. Chắc sẽ có nhiều bạn đã biết 2 khái niệm này là gì, nhưng mình nghĩ cũng có nhiều bạn vẫn còn mập mờ. Ở đây mình sẽ giải thích theo cách mình cho là dễ hiểu, chứ không dùng trực tiếp định nghĩa gốc vì nghe nó khá là khó hiểu :D (nếu có gì thắc mắc cứ comment bên dưới cho mình nhé)

**DOM** (Document Object Model): DOM là thứ thể hiện cho những dữ liệu và cấu trúc của toàn bộ trang HTML, những thứ bạn nhìn thấy ở trình duyệt: thẻ `<a>` ở chỗ này, thẻ `<h1>` đứng sau thẻ `<h2>` ở chỗ kia, chỗ này chữ phải màu vàng, chỗ này nội dung thẻ `div` là Hello World,...


**DOM ảo** (Virtual DOM): như các bạn đã biết Vue hay React được xây dựng với pattern là dùng DOM ảo. DOM ảo là một **khái niệm lập trình** mà ở đó những ý tưởng, design về UI của các bạn còn là "ảo", được lưu ở trong bộ nhớ :-D, và sẽ được đồng bộ với DOM thật (mình đã trình bày ở trên). Chú ý là những thứ ta nhìn thấy ở trình duyệt là DOM thật nhé các bạn ;)

Nghe lại hơi khó hiểu :-D :-D. Cho ví dụ cái coi 

Ở Vue, DOM ảo các bạn có thể hiểu nó chính là phần `template` của chúng ta:
```html
<template>
    <div>Hello world</div>
</template>
```
Ở trên ta định nghĩa ra DOM ảo với dòng text Hello World, khi chạy Vue sẽ hiểu "à ông này muốn in ra thẻ `div` với dòng text kia", từ đó Vue sẽ đồng bộ với DOM thật và ta sẽ nhìn thấy ở trình duyệt

**Lí do vì sao không dùng JQuery được ở created**: Vì ở created là ta mới chỉ có DOM ảo được tạo ra, mà jquery thì chỉ thao tác được với DOM thật, do đó nên nếu muốn dùng JQuery ta cần làm ở `mounted` (khi DOM ảo đã được đồng bộ với DOM thật)

**Re-render** là gì: từ **render** tiếng anh dịch ra tiếng Việt có khá là nhiều nghĩa, nhưng ở trong HTML mình nghĩ phù hợp nhất ý nghĩa của nó là **tô, vẽ**. 1 lần render là 1 lần ta nhìn thấy nội dung được "tô, vẽ" hoàn chỉnh ở trên trình duyệt. Với Vue mỗi lần ta thay đổi 1 giá trị của 1 biến được khai báo ở `data`, hay `computed` thay đổi,... thì Vue sẽ render lại nội dung trên trình duyệt, quá trình render lại này ta gọi là **re-render** 

> Tốt nhất từ **render** các bạn đừng dịch ra tiếng Việt, cứ để nguyên tiếng anh nhé ;)

Qua phần giải thích này mong là các bạn đã hiểu hơn được về 1 vài khái niệm rất hay gặp khi làm việc với HTML, Vue hay React,..
# Những hooks nào thường dùng và cần quan tâm

Mặc dù Vue cung cấp cho chúng ta khá nhiều hooks trong toàn bộ vòng đời của 1 component, nhưng thực tế thì chúng ta hầu như chỉ sử dụng một số hooks như sau:
- `created`: thường dùng để gọi API lấy dữ liệu từ server, khởi tạo websocket, lắng nghe event Laravel Echo,... miễn là ta không động gì vào DOM thật là được
- `mounted`: thường dùng khi ta muốn sử dụng JQuery hoặc truy vấn tới 1 phần tử HTML cụ thể, ví dụ: `document.getElementById('id')`,...
- `beforeDestroy`: thường dùng khi ta muốn huỷ lắng nghe các sự kiện: như sự kiện `onscroll`, hay các sự kiện lắng nghe `socket.io`, `larave-echo`,...

> Vue 3 sắp ra sẽ có thêm nhiều hooks hay ho và cần quan tâm lắm nhé các bạn, mình sẽ update sớm nhất ;)

# Với những bạn đang dùng Vue 3
> Update: 10/4/2022

Ở Vue 3 thì `beforeDestroy` và `destroyed` được đổi tên thành `beforeUnmount` và `unmounted` các bạn nhé.

Vue 3 cũng cung cấp cho chúng ta các event mới để ta có thể bắt được các mount, unmount, updated,... để tiện hơn cho chúng ta nữa, công dụng thì cũng giống như các hooks `mounted/unmounted`,...
```js
import { onMounted, onUnmounted, onErrorCaptured } from "vue";

export default {
  setup() {
    onMounted(() => {
      console.log("mounted");
    });

    onUnmounted(() => {
      console.log("unmounted");
    });
    
    // tác dụng giống errorTriggered
    onErrorCaptured((err) => { 
      console.log(err)
    })
    
    //...và các event khác
  },
};
```
> Các bạn chú ý là các event sẽ luôn được gọi trước hooks nhé, ví dụ onMounted được gọi trước mounted, và onUnmounted gọi trước unmounted,...

Ủa `setup()` kia là gì vậy??? Mình sẽ nói ở 1 bài riêng nhé :)

Thế mình nên dùng cái nào `mounted` hay `onMounted`??🧐🧐

Câu trả lời là tuỳ vào hoàn cảnh nhé. Theo như mình thấy thì onMounted nó linh động hơn chút, có thể đặt ở bất kì đâu, đặt nhiều lần cũng được, nhưng như các bạn thấy thì nó phải được đặt ở 1 nơi nào đó (trong 1 function nào đó). Thực tế thì mình dùng `mounted` nếu project vue 2, và thường dùng `onMounted` nếu mình dùng Vue 3 hoặc dùng hook `setup`. Mình có người đồng nghiệp dùng Vue 3 nhưng vẫn chỉ thích dùng `mounted`, cũng không sao cả :)
# Kết luận
Qua bài này mong rằng các bạn có thể hiểu được về vòng đời của một component, qua đó sử dụng đúng đắn trong các ứng dụng/dự án thật của riêng các bạn.  Đồng thời hiểu thêm một vài khái niệm như DOM, DOM ảo hay re-render mà rất hay được nhắc tới khi chúng ta làm việc với Vue hay React.

Ở bài tiếp theo chúng ta sẽ tìm hiểu về `$forceUpdate` để re-render lại DOM khi cần thiết nhé.

Cám ơn các bạn đã theo dõi, nếu có gì thắc mắc các bạn có thể comment bên dưới nhé ^^!