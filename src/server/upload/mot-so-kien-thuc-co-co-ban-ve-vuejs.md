# 1. Giới thiệu
![](https://images.viblo.asia/d7bedcd9-237a-47c5-b937-cbbb74d2b6d1.png)

Hello mọi người!
Chắc hẳn, nếu các bạn đang sử dụng ngôn ngữ Javascript thì **Vue.js** là một framework không thể không nghe qua. Đặc biệt khi các bạn từng sử dụng qua ReactJS thì việc tiếp cận với Vue.js lại càng dễ dàng hơn. Vậy với kiến thức của một người mới tiếp cận với **Vue.js**, mình xin phép chia sẻ đôi chút về Vue.js. 
 
 Vue.js là gì? 
 
 **Vue.js** là một framework Javascript được tạo bởi Evan You, giúp chúng ta xây dựng giao diện người dùng cũng như xây dựng **Single Page Application** thân thiện với người dùng, chúng xây dựng từ các thư viện, cách triển khai component, các chức năng đặc trưng của nó như SFC (Single File Component). Phiên bản ổn định mới nhất hiện tại của Vue.js là 2.6.10. Nào chúng ta cùng đi vào những kiến thức cơ bản nhất của Vue. 

# 2. Kiến thức cơ bản
### 2.1. Vue Instance, vòng đời một instance
- Trước khi đi vào những kiến thức nền tảng khi học Vue.js thì chúng ta cần nắm rõ được instance là gì. 

Mỗi Instance hay là một đối tượng trong Vue.js. Để khởi tạo một đối tượng trong Vue.js ta sử dụng cú pháp: 
```javascript
    var vm = new Vue({
        //options
    })
```
Ví dụ đầy đủ để khởi tạo đối tượng Vue gồm dữ liệu và DOM vào HTML : 
```javascript
    var vm = new Vue({
        el: '#demo',
        data: {
            message: "Đây là ví dụ khởi tạo một đối tượng trong Vue"
        }
    })
```
Ở trên Vue đã thực hiện với selector có id là ```demo``` cùng với việc khởi tạo một dữ liệu ```message``` để có thể truy xuất và render chúng.

Một ứng dụng trong Vue.js sẽ bao gồm một node gốc. Tương tự việc chia node của HTML,  từ node gốc này chúng ta sẽ chia thành các node component con để tái sử dụng được những tùy chọn, dữ liệu trong đối tượng vừa khởi tạo này. Về component cơ bản sẽ được giải thích phía dưới.

#### Vòng đời của một Instance
Vòng đời của một Instance cơ bản gồm 4 giai đoạn chính: 
- Khởi tạo (creating)
- Gắn kết DOM (mounting)
- Cập nhật DOM khi có dữ liệu thay đổi (updating)
- Hủy instance (destroying) 

Mỗi giai đoạn sẽ có những function hooks tương ứng.  Hook ở đây nghe có vẻ khó hiểu với người mới, các bạn cứ hiểu đơn giản nó là một function để móc vào những thời điểm cụ thể, thực hiện những công việc cụ thể ngay tại thời điểm đó. Ví dụ muốn lấy dữ liệu từ serve để in ra màn hình thì các bạn sẽ viết hook ở giai đoạn mounting. Với hook function là mounted tức là khi đã gắn kết DOM và dữ liệu đã thiết lập xong xuôi. Chúng ta có thể chèn dữ liệu mà mình mong muốn vào trang ở trong giai đoạn này. Còn khi các bạn viết ở giai đoạn trước đó, nó sẽ không thực hiện được vì khi đấy chưa được gắn kết DOM xong nên việc sử dụng DOM là không thể. 

Tạm thời chưa hiểu thì mọi người có thể vừa làm và cảm nhận nhé =)))

Dưới này mình có viết một bài riêng về vòng đời của một instance, mọi người vào link này tham khảo  :D 


[Vòng đời của một Vue Instance ](https://viblo.asia/p/vuejs-vong-doi-cua-mot-vue-instance-lifecycle-hooks-Ljy5Vmazlra)

### 2.2 Cú pháp template
Cú pháp là điều rất quan trọng khi học một ngôn ngữ hay framework nào đó. Với Vue.js chúng ta cũng có những cú pháp giúp hiển thị, xuất dữ liệu ra trang người dùng. 
Để hiển thị một đoạn đơn giản lên màn hình. Thông qua việc dùng hai ngoặc nhọn để render dữ liệu ra màn hình : 
```html
<p> {{ message }} </p>
``` 

Kết hợp với việc khởi tạo đối tượng ở trên, chúng ta sẽ có được câu ```Đây là ví dụ khởi tạo một đối tượng trong Vue``` được hiển thị ra màn hình.  Vậy nếu chúng ta muốn render ra một vài thẻ HTML thì phải làm thế nào. Ví dụ muốn chữ ```Vue``` được nằm trong thẻ ```<b></b>``` để in đậm câu này lên. Đơn giản, chúng ta sẽ sử dụng  directive của Vue. với cú pháp ```v-```
Cụ thể : 

```html
<p v-html="message"> </p> 
```
Ngoài ra để sử dụng các thuộc tính của HTML, chúng ta không thể sử dụng cú pháp ngoặc nhọn để hiển thị bên trong thẻ html mà chúng ta sử dụng ```v-bind:parameter="value"```. Với ```parameter``` ở đây là tham số được gắn với ```value``` 
Ví dụ:
```html
<button v-bind:disabled="isDisabled"> </button>
``` 
chúng ta có thể truyền vào một function return về giá trị cụ thể cho thuộc tính đó. 
Modifier: Modifier là một bổ nghĩa, bổ sung cho một directive để răng buộc nó. Ví dụ dưới đây để rằng buộc mỗi khi ấn submit cho một form và không muốn đưa form này sang trang khác. 
```html
<form v-on:submit.prevent="method"> ... </form>
``` 
Ngoài ra còn một số cách rút gọn directive :   ``` v-bind:href ``` thành ```  :href```, ``` v-on:click``` thành ``` @click```. 

### 2.3. Methods
 Như ở trên chúng ta có tìm hiểu về việc viết template để render ra như thế nào. Một số đoạn mình có nhắc tới method. Vậy method cài đặt như thế nào ta cùng tìm hiểu nhé.
 Method là phần xử lý khi chúng ta muốn làm việc gì đấy, ví dụ như gửi dữ liệu update khi submit chẳng hạn. Việc tính toán lại dữ liệu có sẵn cũng có thể đưa vào method để trả về dữ liệu nhưng điều này ít khi dùng (xem phần computed và watchers ở dưới) . Để khởi tạo một đối tượng cùng với method, chúng ta làm như sau: 
 ```javascript
    var vm = new Vue({
        el: '#demo',
        data: {
            message: "Đây là ví dụ khởi tạo một đối tượng trong Vue",
            number: 0
        }, 
        methods: {
           updateNumber (newNumber) {
               this.number = newNumber
           }
        }
    })
```
Method trên trả về cho chúng ta số mới mỗi khi gọi  ```updateNumber()``` tương ứng với tham số khac nhau. Việc này sẽ thực thi mỗi lần gọi tới method. 
### 2.3 Thuộc tính computed và watchers, so sánh với methods
  #### Computed properties: 
Trước tiên mọi người hãy đọc đoạn code sau: 
  
   ```javascript
    var vm = new Vue({
        el: '#demo',
        data: {
            message: "Đây là ví dụ khởi tạo một đối tượng trong Vue",
            number: 0
        }, 
        methods: {
           x2Number () {
              return this.number = this.number * 2
           }
        }
        computed: {
           x2Number () {
              return this.number = this.number * 2
           }
        }
    })
```
Ở trên **methods**, **computed** đều có function x2Number với kết quả trả về đều như nhau. Vậy chúng ta nên sử dụng cái nào trong trường hợp này? 

Mọi người chắc cũng như mình khi mới bắt đầu học và trong đầu luôn thắc mắc tại sao trời sinh ra **method** lại còn **computed** để làm gì =))) Nhưng khi đọc đến lần thứ hai trong tài liệu chính của Vue thì mình mới nhận ra rằng, computed đều không có tham số truyền vào cũng như khi gọi computed thì sẽ không có thêm cặp dấu ngoặc tròn ```x2Number``` như method ```x2Number()```, đó là một sự khác biệt lớn nhất khi sử dụng. 

Vì vậy nếu các bạn lên [trang chủ](https://vuejs.org/v2/guide/computed.html) của **Vue** để đọc tài liệu sẽ thấy ghi là computed properties. Theo mình hiểu đấy cũng xuất phát từ cách gọi **computed**  để render dữ liệu. 
Ở 2 trường hợp này mình ưu tiên dùng **computed** hơn. Vì **computed** có khả năng Cache lại dữ liệu khi gọi function này lần đầu tiên để những lần tiếp theo nó sẽ lấy ra dữ liệu ở trong **cache** đã được xử lý qua **computed**. Ngược lại method thì không. 
  
  
  Cuối cùng **Computed** thường thực hiện với dữ liệu có trong instance để hạn chế việc tính toán và lấy dữ liệu ở trong cache. 
   ####  Watchers: 
Okay, và tiếp theo đấy là watchers. Nghe cái tên chúng ta cũng có thể hiểu được watcher là gì rồi đúng không. Dịch qua tiếng Việt là người theo dõi :))) hơi chuối nhỉ nhưng chính xác nó thực hiện công việc như một người theo dõi. 

Những function trong watcher thực hiện việc theo dõi thay đổi của thuộc tính của một đối tượng.  Chúng ta sẽ khai báo như methods và computed. Ở đây mình muốn giám sát cả đối tượng khi bất kì thành phần nào thay đổi nên mình khai báo thêm thuộc tính deep: true.
``` javascript 
watch: {
    toDos: {
      deep: true,
      handler (newValue) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue)) 
      } //hàm này chỉ là lấy dữ liệu mới nhất khi thuộc tính toDos có thay đổi để cập nhập lại vào localStorage
    }
  }
```
**Tổng kết : cả methods, computed properties, watchers đều có thể khai báo function bên trong nhưng tùy vào mục đích sử dụng cụ thể mà chúng ta sẽ áp dụng chúng một cách tối ưu nhất.**
### 2.4 Binding, Render, Xử lý sự kiện.
#### Binding: 
 Khi đọc phần cú pháp template ở trên chắc hẳn mọi người đều nhìn thấy một cú pháp directive ```v-bind``` và nó chính là rằng buộc cụ thể dữ liệu vào một phần tử web. Chúng ta có thể binding class, binding style bằng cách sử dụng v-bind:class hoặc v-bind:style. Dưới đây mình chỉ nói về binding class, với style cũng tương tự
 
 Ví dụ binding một classs: 
 ```html
 <div class="static"
     v-bind:class="{ 'error': hasError }">
</div>
```
với dữ liệu 
```
data: {
  hasError: true
}
```
chúng ta sẽ nhận được kết quả là:
 ```html
 <div class="static error">
</div>
```
#### Render: 
Để render dữ liệu theo điều kiện , chúng ta có 2 cách:
```javascript
data: {
  show: true
}
```
- Sử dụng v-if: 
```html 
    <div v-if="show">Div này hiển thị</div>
```


- Sử dụng v-show
```html 
    <div v-show = "show" >Div này hiển thị</div>
```

Hai cách trên đều giúp hiển thị dữ liệu ra màn hình nhưng điểm khác nhau là khi sử dụng v-if, Vue sẽ không render nếu điều kiện sai. Còn v-show vẫn sẽ render ra bất kể đúng hay sai và sẽ cho phép hiển thị hay không thông qua thuộc tính **display** trong CSS .

Chúng ta cũng có v-else-if, v-else để thực hiện nếu muốn sử dụng  để so sánh với nhiều giá trị khác nhau
```html 
    <div v-if="show === 0">Div này hiển thị</div>
    <div v-else-if="show === 1">Div 1 này hiển thị</div>
    <div v-else="show === 2">Div 2 này hiển thị</div>
```

**Render ra một danh sách**

Khi render ra một danh sách từ mảng hoặc object chúng ta cũng có directive ```v-for```. chứng năng hoàn toàn giống với vòng lặp ở trong các ngôn ngữ lập trình.
```javascript
    var vm = new Vue({
        el: '#demo',
        data: {
            items: [
                { content: 'Hôm nay thứ 6' },
                { content: 'Sắp được nghỉ rồi' },
                { content: 'Về nhà đi thôi' }
            ]
        }
    })
```
```html
<ul id="demo">
    <li v-for="item in items">
        {{ item.content}}
    </li>
</ul>
```
#### Form Input Binding: 
Thao tác với form là một phần rất quan trọng trong việc lập trình web. Và với Vue.js chúng ta có những rằng buộc với form nào. Cùng đi qua một vài thứ cơ bản nhé. 


- Chúng ta sử dụng directive v-model để rằng buộc dữ liệu với form. 

Ví dụ để nhận dữ liệu từ ô input và cập nhật vào thuộc tính data của vue instance : 
```javascript
    var vm = new Vue({
        el: '#demo',
        data: {
           email: ''
        }
    })
```
```html
<input v-model="email" placeholder="Nhập email">
```
- Ngoài ra có thể sử dụng modifiers cho v-model :
```html
<input v-model.trim="email" placeholder="Nhập email">
v-model.trim sẽ xóa bỏ và return về chuỗi được khoảng trắng ở 2 đầu khi nhập email vào ô input này
```
#### Xử lý sự kiện: 
Tương tác với HTML, xử lý sự kiện đã quá quen thuộc với người lập trình javascript. Ở Vue.js đã tận dụng và xây dựng lên một hệ thống xử lý khá tiện dụng, Ví dụ đơn giản với sự kiện click chuột: 

```html 
<div id="demo"> 
    <button v-on:click="sayOhYeah"> Say Oh YEAH </button>
</div>
  ```
```javascript
    var vm = new Vue({
        el: '#demo',
        methods: {
           sayOhYeah() {
               alert('say oh yeah')
           }
        }
    })
```
Ngoài ra chúng ta có thể xử lý sự kiện khi thao tác từ bàn phim.  Xem thêm tại : https://vi.vuejs.org/v2/guide/events.html

### 2.5. Component
 Tương tự với cách chia từng node ở trong HTML các node có thể lồng nhau thành một cây như phả hệ. thì ở Vue.js đã xây dựng lên tính năng Component giúp chúng ta có thể sử dụng chúng như HTML. Với kiểu lồng nhau như vậy, có những cách truyền dữ liệu từ component cha xuống component con . Hay gửi thông tin từ component con đến cha thông qua sự kiện, sử dụng slot hay có thể sử dụng v-model trong component. Rất tiện lợi cho việc xây dựng một Single Page Application. 
 
Mọi người đọc bài riêng về Component ở đây nhé: https://viblo.asia/p/vuejs-component-ly-thuyet-va-cach-su-dung-Eb85oLbOK2G
# 3. Tổng kết
Như vậy, qua 2 phần trên chúng ta đã có thể nắm được những kiến thức cơ bản về Vue.js biết được cách khởi tạo một Vue Instance, những cú pháp cơ bản để render, render có điều kiện, phân biệt Computed Propertites, Methods và Watchers . Ngoài ra còn một số kiến thức thêm hơn như  Filter, Plugin, Routing... mình sẽ tiếp tục vào những phần sau. Cảm ơn mọi người đã theo dõi bài viết và  nếu thấy hay thì upvote cho mình nhé :D