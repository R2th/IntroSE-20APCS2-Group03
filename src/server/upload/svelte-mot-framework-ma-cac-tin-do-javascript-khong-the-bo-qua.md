# 1. Giới thiệu
Khi nói về các framework hay library của Javascript ắt hẳn có 3 cái tên đình đám sẽ được mọi người nhắc tới là React, Vue và Angular, kể ra cũng đúng khi mà các framework/library này đứng top, đằng sau chúng là cả một cộng đồng rất lớn để support. Nhưng trong bài viết này mình sẽ giới thiệu một framework mới là **Svelte**.

Svelte - hay còn đọc theo kiểu vietsub là "Sờ veo", đây là một client-side Javascript framework được xây dựng bởi [Rich Harris](https://github.com/Rich-Harris) . Đây có lẽ là một framework còn khá mới đối với nhiều người, và ở VIệt Nam mình nghĩ là chưa được sử dụng quá rộng rãi.

![](https://images.viblo.asia/611f21f0-df56-4664-80e7-7cf5538d159f.png)


**Sơ qua về lịch sử ra đời**:

Rich Harris đã cho release phiên bản đầu tiên của **svelte** vào cuối năm 2016, sau đó 2 năm thì vào năm 2018 đã cho ra mắt phiên bản thứ 2. Vào năm 2019 đã cho ra mắt version thứ 3 - cũng là version hiện tại, tại thời điểm mà mình viết bài này (2021). Trên github của **svelte** các developer vẫn tích cực đóng góp phát triển cho dự án open source này. Repository của **Svelte** trên github hiện đang nhận được hơn 40.000 star và hơn 2000 lượt fork về.

# 2. Ưu / nhược điểm của Svelte
Svelte là một lựa chọn khá phù hợp đối với các project có quy nhỏ, đơn giản. Có thể đối với những project phức tạp hơn thì chúng ta nên có những cân nhắc cẩn thận vì đây là framework còn khá mới và cộng đồng support chưa nhiều.
## Ưu điểm
* Dễ dàng tiếp cận nếu như ai đã từng làm việc với VueJS hay ReactJS vì Svelte cũng có các khái niệm tương tự.
* Code nhanh, gọn, lẹ
* Không dùng Virtual DOM, theo như quan điểm của người phát triển Svelte - Rich Harris việc sử dụng Virtual DOM không thực sự nhanh, nên Svelte đã không sử dụng virtual DOM, thay vào đó Svelte đã cập nhật thẳng những sự thay đổi trên DOM thật, bỏ qua bước trung gian là sử dụng Virtual DOM như các framework/library khác của Javascript thường làm.
* Sử dụng cơ chế reactive rất dễ sử dụng
* Có document khá đầy đủ
* Có hỗ trợ Server side rendering - [Sapper](https://sapper.svelte.dev/)
* Tự xây dựng được cấu trúc riêng
## Nhược điểm
* Cộng đồng sử dụng chưa nhiều
* Chưa có nhiều các thư viện thứ 3 hỗ trợ (package, component...)
* Chưa thật sự ổn định do vẫn còn khá mới
# 3. Khởi tạo project Svelte
Khởi tạo một project Svelte rất đơn giản, chỉ cần chạy lệnh
```bash
npx degit sveltejs/template PROJECT_NANE
```
sau đó cài các dependency ta chạy lệnh
```bash
npm install
```
Để chạy chương trình
```bash
npm run dev
```
Mặc định cổng của **Svelte** là 5000. Truy cập vào [http://localhost:5000/](http://localhost:5000/) các bạn sẽ thấy giao diện mặc định của **Svelte** trông như thế này

![](https://images.viblo.asia/ee191ff6-7e2a-4362-931f-6b074376cded.png)

Mở project lên chúng ta sẽ thấy một vài các folder và file được xây dựng sẵn trong **Svelte**. Trong đó
* `src`: đây là thư mục chứa code chính của project. 
* `src/main.js`: Đây là file đầu vào của ứng dụng được đặt tên mặc định là main.js, nếu như muốn thay đổi tên file cần phải cấu hình lại
* `src/App.svelte`: Mỗi file `.svelte` được coi như là một `component`. `.svelte` cũng là cách để xác định một file trong **svelte**.
* `rolllup.config.js`: File này dùng để tùy chỉnh cài đặt source code. **Svelte** dùng **rollup** để bundle source code thay vì sử dụng **webpack** mà chúng ta thường thấy
* `package.json`: Chứa các dependency của dự án.
# 4. Tìm hiểu
Dài dòng hơi nhiều, bây giờ mình sẽ giới thiệu các syntax trong **Svelte**.
## 4.1. Component
Để mà nói về các client-side javascript framework như VueJS hay ReactJS, khái niệm `component` là rất phổ biến. Thì trong **Svelte** khái niệm này cũng được sinh ra. Một file component trong **Svelte** được kết thúc bằng đuôi `.svelte`.

Cấu trúc của file cũng có chút tương đồng với VueJS (nếu như ai đã tiếp xúc với Vue). Một file có dạng như thế này
```html
<!-- HTML code ở đây -->
<h1>Hello {name}!</h1>

<!-- javascript code ở đây -->
<script>
	export let name;
</script>

<!-- css code ở đêy -->
<style>
</style>
```
Chúng ta có thể gói gọn code của HTML, CSS và Javascript vào trong một component. Muốn sử dụng lại các component đã khai báo chỉ cần import vào file cần dùng là được.
Giả sử
```html:Product.svelte
<h1>This is my product page</h1>

<style>
    h1 {
        color: red;
    }
</style>
```

Muốn sử dụng file `Product.svelte` trong file `App.svelte` chỉ cần import 
```html:App.js
<script>
	import Product from './Product.svelte'; 
</script>

<!-- Gọi đến component -->
<Product />
```
Trong rất đơn giản và ngắn gọn. Nó trong khá là giống VueJS, nếu như trong VueJS chúng ta cần phải khai báo sử dụng nữa nên sẽ dài dòng hơn như thế này
```javascript
<script>
	import Product from './Product.svelte'; 
    
    export default {
        components: {
            Product,
        }
    }
</script>
```
Tuy nhiên **Svelte** đã rút ngắn code lại khi mà chỉ cần import thôi là đã sử dụng được luôn component rồi. Rất nhanh và gọn gàng :D
## 4.2. Data
Một component không đơn giản chỉ có những `static markup` mà đôi khi còn cần sử dụng đến các `data`. Để định nghĩa một `data` trong component chúng ta đặt trong cặp thẻ `script` là được.
```html
<script>
	let name = "Quang Phu";
</script>
```
Để in `data` ra chúng ta chỉ cần đặt trong cặp ngoặc nhọn `{}` để in ra giá trị
```html
<script>
	let name = "Quang Phu";
</script>

<h1>Hello { name }</h1>
```
## 4.3. Dynamic attributes
Giống như cách mà chúng ta in `data` như ở trên, đối với các `attributes` chúng ta cũng sẽ sử dụng dấu ngoặc nhọn để in giá trị của attrubutes ra. 
Ví dụ
```html
<script>
    let src = 'img/logo.png';
</script>

<img src={src} alt="this is alt"  />
```
**Svelte** còn cung cấp cho chúng ta cách viết ngắn gọn nếu như thuộc tính trùng tên với tên biến bạn đặt như trường hợp trên là `src={src}` thì có thể viết ngắn gọn lại chỉ còn `{src}`
```html
<img {src} alt="this is alt"  />
```
## 4.4. Props
Khi làm việc với component, chắc hẳn đôi khi chúng ta sẽ cần tới truyền dữ liệu từ component cha xuống các component con thì chúng ta sẽ sử dụng tới **props**. Đây cũng là khái niệm mà quá quen thuộc với các VueJS và ReactJS developer rồi.

Để định nghĩa `props` chúng ta khai báo cùng với keyword `export`. Ví dụ 
```html
<script>
    export let a;
</script>
```
Để dễ hiểu hơn với những người chưa làm việc với Vue hay React mình có ví dụ con con như thế này.

Khai báo component con
```html:Calc.svelte
<script>
    export let a, b;
</script>

Kết quả của {a} + {b} là { a + b }
```
Trong component cha chúng ta truyền giá trị xuống component con
```html
<script>
    import Calc from './Calc.svelte';
</script>

<Calc a={1} b={2} />
```
Kết quả khi chạy chương trình sẽ là
```
Kết quả của 1 + 2 là 3
```
## 4.5. Logic
Đối với HTML thông thường sẽ không hỗ trợ cách các viết logic trong code ví dụ như câu lệnh điều kiện hoặc là vòng lặp. Trong **svelte** sẽ giúp chúng ta làm công việc này. Cú pháp thì sẽ khác so với VueJS hoặc ReactJS, thế nhưng mình thấy cách viết của **Svelte** làm mình liên tưởng tới cách viết của Django -  framework nổi tiếng của Python.
### Câu lệnh điều kiện if-else
Để áp dụng câu lệnh điều kiện này vào trong code chúng ta cần nhớ qua cú pháp của nó
```html
{#if condition}
...
{:else if}
...
{:else}
....
{/if}
```
Trong đó, chúng ta sử dụng ký tự `#` để bắt đầu câu lệnh điều kiện và các câu lệnh else hay else if sẽ bắt đầu bằng ký tự `:` ví dụ như `:else`. Và cuối cùng sử dụng ký tự `/` để nhận biết thẻ đóng câu điều kiện.

Ví dụ 
```html
<script>
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
</script>

{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{/if}

{#if !user.loggedIn}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```
### Vòng lặp
Để sử dụng vòng lặp trong **Svelte** chúng ta có thể sử dụng `each` để lặp, cú pháp thì cũng tương tự với câu lệnh điều kiện `if..else`, trong đó ký tự `#` để bắt đầu câu lệnh vòng lặp và `/` để kết thúc vòng lặp.

Ví dụ
```html
<ul>
	{#each cats as cat}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
			{cat.name}
		</a></li>
	{/each}
</ul>
```
## 4.6. Event
Một trong những tính năng mạnh mẽ nhất của Javascript đó chính là Event, thay vì viết như kiểu Javascript thuần thì trong **Svelte** cũng có kiểu viết cho riêng mình. Để lắng nghe một sự kiện trong **Svelte** chúng ta bắt đầu với directive `on:`.

Ví dụ
```html
<script>
    function handleClick() {
        console.log('clicked');
    }
</script>

<div on:click={handleClick}>
	Click me
</div>
```
Chúng ta cũng sẽ làm tương tự với các event khác. Ngoài ra **Svelte** cũng hỗ trợ chúng ta đầy đủ các `modifier` như
* `preventDefault`: Khi sử dụng modifier này nó sẽ gọi tới `event.preventDefault()` như cách chúng ta viết với Jquery hay Javascript đơn thuần, dùng để hủy bỏ event
* `stopPropagation`: gọi tới `event.stopPropagation()`, ngăn cản sự lan rộng của event tới các thẻ khác
* `passive`: sử dụng để cải thiện hiệu suất của các event như `touch` hay `wheel`.
* `capture`: Trigger event lần lượt từ DOM parent đến DOM đã đăng kí event
* `once`: Xóa event sau khi đã thực hiện 1 lần

....
Về cách sử dụng thì tương đối dễ dàng 
```html
<button on:click|once={handleClick}>
	Click me
</button>
```
Hoặc là chúng ta có thể sử dụng đồng thồi nhiều modifier khác nhau
```html
<button on:click|once|stopPropagation={handleClick}>
	Click me
</button>
```
## 4.7. Binding
Khái niệm này tương tự như khái niệm trong VueJS, hiểu đơn giản sẽ là chúng ta có 1 ô input, dữ liệu được nhập từ ô input sẽ binding với `data` mà chúng ta khai báo.

Cú pháp là `bind:binding_name`.

Ví dụ 
```html
<script>
	let name = 'world';
</script>

<input bind:value={name}>

<h1>Hello {name}!</h1>
```
Kết quả
![](https://images.viblo.asia/37b3a194-893b-4214-9cf1-bf8405f01248.gif)

Ngoài ra chúng ta cũng có thể binding với `checkbox`, `select`... và rất nhiều cái khác nữa.
## 4.8. Lifecycle
Cũng giống như Vue hay React, Svelte cũng có lifecycle riêng cho bản thân nó. Cụ thể ở đây là các method lifecycle 
* `onMount`: phương thức này được gọi sau khi component được render, tại phương thức này chúng ta có thể gọi tới api.
* `onDestroy`: phương thức này được gọi khi một component bị destroy (hủy) 
* `beforeUpdate`: phương thức này được gọi khi trước khi DOM được update
* `afterUpdate`: ngược lại so với `beforeUpdate`, phương thức này được gọi sau khi DOM đã được update

Ví dụ 
```html
<script>
  onMount(() => {
      console.log('onMount')
  })
  beforeUpdate(() => {
    console.log('beforeUpdate')
  })
  afterUpdate(() => {
    console.log('afterUpdate')
  })
  onDestroy(() => {
    console.log('onDestroy')
  })
</script>
```
## 4.9. Slot
Giống như Vue, Svelte cũng có khái niệm Slot. Khái niệm này hiểu đơn giản chúng ta sẽ "để dành" một chỗ trống ở component, khi nào cần sử dụng khoảng trống đó thì sẽ gọi tới slot.

Ví dụ mình có component con  là `ProductDetail`
```html:ProductDetail.svelte
<div class="box">
	Hello, this is product detail page
    <slot></slot> <!-- tạo 1 khoảng trống -->
</div>
```
Và có component `Product` gọi tới
```html:Product.svelte
<script>
    import ProductDetail from './ProductDetail.svelte'
</script>

<ProductDetail />
```
Kết quả trên màn hình sẽ là 
```
Hello, this is product detail page
```
Bây giờ muốn thêm nội dung cho component `ProductDetail` thì thay vì vào `ProductDetail.svelte` để sửa, chúng ta có thể thêm nội dung tại component `Product.svelte` nơi mà chúng ta gọi tới `ProductDetail` với điều kiện đã tạo `slot`(khoảng trống) ở `ProductDetail.svelte`.
```html:Product.svelte
<script>
    import ProductDetail from './ProductDetail.svelte'
</script>

<ProductDetail>
    Nội dung thêm mới
</ProductDetail>
```
Kết quả
```
Hello, this is product detail page
Nội dung thêm mới
```
# 5. Tái bút
Bài viết cũng hơi dài dài rồi, mình cũng giới thiệu được những khái niệm quan trọng của **Svelte** rồi, hy vọng nó sẽ giúp ích được các bạn. Đây có thể nói là những kiến thức nền tảng.

Qua các khái niệm trên chúng ta cũng thấy được việc sử dụng **Svelte** hoàn toàn dễ dàng và ngắn gọn, và có thể đáp ứng đủ nhu cầu đối với những trang web đơn giản. Tuy nhiên vẫn có những hạn chế nhất định về thư viện hỗ trợ cũng như cộng đồng chưa nhiều nên **Svelte** chưa thật sự bùng nổ như các framework khác. Nhưng chắn hẳn trong tương lại một ngày nào đó **Svelte** lại phát triển như Vue hay React thì sao =))

Nếu các bạn thấy bài viết hữu ích hãy tặng mình một upvote để lấy cảm hứng viết tiếp nhé =)) Thân ái