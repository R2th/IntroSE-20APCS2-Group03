Đây là bài viết tổng hợp lại kiến thức của mình khi bắt đầu tìm hiểu về Svelte. Một framework khác để code UI ngoài các thư viện truyền thống như reactjs, vuejs,...

# Cài đặt

Để tạo một dự án với svelte bản có thể dùng codesandbox, repl tạo template rồi tải về. Hoặc cài đặt với lệnh sau:
```
npx degit sveltejs/template my-svelte-project
cd my-svelte-project

npm install
npm run dev # chạy server
```

Sau khi cài đặt xong bản có thể đọc file README.md để biết thêm một số câu lệnh khác có thể sử dụng (typescript, build,...)

# Hello World
Một ứng dụng siêu cơ bản của svelte sẽ giống như sau:

```src/App.svelte
<h1>Hello, world!</h1>
```

```src/main.js
import App from './App.svelte';

const app = new App({target: document.body});

export default app;
```

Chỉ đơn giản là hiển thị `Hello, world!` trên trình duyệt

[Chạy thử trên REPL](https://svelte.dev/repl/4b510aad2a984bfd9a7b853f1ec52b4b?version=3.31.2)

# Cú pháp cơ bản

Để code một component trong svelte thực sự rất đơn giản.

```
<script>
    const name = 'Naruto';
</script>

<h1>Hello, {name}</h1>

<style>
    h1 {
        color: red;
    }
</style>
```

Bạn có thể thấy phần khai báo `script` sẽ dùng code javascript như bình thường, phần HTML có thể nhúng các biểu thức với cặp `{}` (giống JSX), và bạn còn có thể style cho component ngay trong file này nữa.

[Chạy thử trên REPL](https://svelte.dev/repl/1d4e7298053a4638a92f91f4a064389e?version=3)

# Component và props

## Component

Mỗi một file svelte đều là một component, bạn chỉ cần import các component này để sử dụng.

```Naruto.svelte
<h1>
	SASUKE!!!
</h1>

<style>
	h1 {
		color: blue;
	}
</style>
```

```Sasuke.svelte
<script>
	let name = "naruto!!";
</script>

<h1>
	{name.toUpperCase()}
</h1>

<style>
	h1 {
		color: orange;
	}
</style>
```

```App.svelte
<script>
	import Naruto from './Naruto.svelte'
	import Sasuke from './Sasuke.svelte'
</script>

<Sasuke></Sasuke>
<Naruto></Naruto>
```

Cách import gọi ra component cũng tương tự với các thư viện khác `<ComponentName />`

[Chạy thử trên REPL](https://svelte.dev/repl/7ec0100b8f7a49228a60899cf4c72c64?version=3)

## Props

Để khai báo props cho một component, bạn sẽ dùng từ khoá `export`

```Sum.svelte
<script>
	export let a, b;
</script>

<h1>
	{a} + {b} = {a + b}
</h1>
```

```App.svelte
<script>
	import Sum from './Sum.svelte'
</script>

<Sum a={1} b={2} />
```

Ngoài ra bạn cũng có thể truyền vào component với **spread operator** `<Sum {...arr} />`

```App.svelte
<script>
	import Sum from './Sum.svelte'
	
	const arr = {
		a: 1,
		b: 2
	}
</script>

<Sum {...arr} />
```

[Chạy thử trên REPL](https://svelte.dev/repl/4d55d4f458ae487694034b59ac299a71?version=3)

# Lifecycle

Sevelte hỗ trợ một số hàm cho lifecycle như sau:

* onMount: Hàm nay gọi ngay khi component được gắn vào DOM.
* beforeUpdate: Hàm nay sẽ chạy trước khi component được cập nhật vì có thay đổi state.
* afterUpdate: Hàm nay gọi sau khi component được update.
* onDestroy: Hàm nay gọi khi component được tách khỏi DOM.

Bạn có thể xem ví dụ nhỏ sau:

```LifeCycle.svelte
<script>
	import {onMount, beforeUpdate, afterUpdate, onDestroy} from 'svelte';
	let count = 0;
	
	onMount(() => {
		console.log('onMount');
	});
	
	beforeUpdate(() => {
		console.log('beforeUpdate');
	});
	
	afterUpdate(() => {
		console.log('afterUpdate');
	});
	
	onDestroy(() => {
		console.log('onDestroy');
	});
	
	function handleClick() {
		count += 1;
	}
</script>

<div>
	{count}
</div>

<button on:click={handleClick}>
	Click
</button>
```

```App.svelte
<script>
	import LifeCycle from './LifeCycle.svelte';
	
	let show = false;
</script>

{#if show}
<LifeCycle/>
{:else}
Loading...
{/if}

<br>

<button on:click={() => show = !show}>
	Toggle
</button>
```

[Chạy thử trên REPL](https://svelte.dev/repl/753c1267e8c4461dbeedb2a0369836f3?version=3.31.2)

Dưới đây là một hình ảnh mình kiếm trên google có thể giúp bạn dễ hiểu hơn:

![](https://images.viblo.asia/bac1b94b-849a-4978-902d-e63e83236b97.png)

Ngoài ra thì ở ví dụ trên bạn có thể thấy mình sử dụng `on:click` để bắt event click. Mình sẽ gỉai thích thêm ở phần dưới.

# Xử lý sự kiện

Một ví dụ nhỏ để bạn hiểu về cú pháp của svelte

```
<script>
    function click() {
        alert('aho! aho!');
    }
</script>

<button on:click={click}>Click</button>
```

Để bắt một sự kiện trên element bạn sẽ có cú pháp `on:(eventname)`, ví dụ `on:click` `on:change` ...

## Tạo event cho component

Để có thể tạo event cho component ta sẽ dùng hàm `createEventDispatcher` của svelte.

```Crow.svelte
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Aho! Aho'
		});
	}
</script>
	
<button on:click={sayHello}>Click</button>
```

```App.svelte
<script>
 	import Crow from './Crow.svelte';
	
	function handleMessage(event) {
		alert(event.detail.text);
	}
</script>

<Crow on:message={handleMessage} />
```

{@embed: https://codepen.io/hungkq-1724/pen/ZEpZZOR}

[Chạy thử trên REPL](https://svelte.dev/repl/9823d75680dd4907bae86443ba25ea44?version=3)

# Render với điều kiện

Xem ví dụ sau:
```
<script>
	let hover = false;

	function handle() {
		hover = !hover;
	}
</script>

<h1 class:hover on:mouseenter={handle} on:mouseleave={handle}>Hover Me</h1>

{#if hover}
	<h2>
		NO NO NO, Leave me!
	</h2>
{:else}
	<b>
		waiting...
	</b>
{/if}
```

Để dùng `if-else` khi render bạn có thể dùng cú pháp `{#if}...{:else}...{/if}`.

Dấu `#` để mở đầu một điều kiện và các lệnh theo sau sẽ dùng dấu `:` ví dụ `:else` `:else if` để nối tiếp các block

Bạn cũng có thể thấy ở trên có một keyword khác là `class:hover`. Ở đây hover trùng với biến đã khai báo nên có thể viết tắt như vậy, nếu không thì bạn sẽ cần viết đầy đủ như `class:hover={active}`. Sẽ giúp bạn kiểm soát các class trên element dễ dàng hơn.

[Chạy thử trên REPL](https://svelte.dev/repl/a647aba7896b4829988ca115306a4698?version=3)

# each và await
## each

Một phần không thể thiếu khác là hiển thị một danh sách dữ liệu, và bạn trong svelte chúng ta sẽ dùng `#each`.

```App.svelte
<script>
	let menu = ['Gà rán', 'Gà quay', 'Gà hầm ngải cứu', 'Gà nướng mật ong', 'Cánh gà chiên'];
</script>

<h1>Menu</h1>

<ol>
	{#each menu as item}
		<li>{item}</li>
	{/each}
</ol>
```

Ngoài cú pháp đơn giản ở trên, `#each` còn có thể dùng với một số cách khác nhau nữa, bạn có thể tham khảo https://svelte.dev/docs#each

[Chạy thử trên REPL](https://svelte.dev/repl/3b2f3be401f84f0281440644ae3c7140?version=3)

## await

Nghe tên chắc bạn cũng có thể đoán được nó dùng để xử lý với promise rồi, cùng xem ví dụ sau:

```
<script>
	let waiter;
		
	function getPromise() {
		return new Promise((res, rej) => {
			setTimeout(function() {
				if(Math.random() < 0.2) {
					res('Đã có món ăn!!');
				} else {
					rej('Ông bồi bàn ngã rồi, không có đồ ăn đâu!');
				}
			}, 3000);
		});
	}
	
	function start() {
		waiter = getPromise();
	}
</script>

<button on:click={start}>
	Gọi món
</button>

{#if waiter}
	{#await waiter}
		<p>...waiting</p>
	{:then message}
		<p>{message}</p>
	{:catch error}
		<p style="color: red">{error}</p>
	{/await}
{/if}
```

Well =))

[Bạn có thể thử trên REPL](https://svelte.dev/repl/6bbf09062e17462388b4ecf820ef3af7?version=3.31.2)

# ...

Bài viết là tổng hợp kiến thức của mình khi tìm hiểu về svelte và mình cũng mới học thôi, nếu còn gì thiếu sót hy vọng các bạn có thể góp ý thêm. Nếu có link repl nào die thì bạn có thể comment ở dưới, mình sẽ fix lại ngay (bow)