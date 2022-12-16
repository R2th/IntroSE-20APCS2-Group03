Hôm nay mình xin giới thiệu 1 framework(mình viết gọn: fw) của 
frontend là svelte (trang chủ: https://svelte.dev/tutorial/) - nó là 1 fw cũng nổi tiếng không kém cạnh gì React
hay Angular, Vue. 

Bài viết này mình chỉ xin giới thiệu 1 số nét căn 
bản của svelte (dưới góc nhìn của 1 người mới tìm
hiểu), sau đó mình sẽ thử áp dụng viết 1 component 
căn bản

## I > Bắt đầu tìm hiểu nào:
### 1> Cách khởi tạo 1 dự án đơn giản:
Cũng như các fw khác, cách khởi tạo qua npx rất 
đơn giản
```markdown
npx degit sveltejs/template my-svelte-project
# or download and extract 
cd my-svelte-project
# to use  run:
# node scripts/setupTypeScript.js

npm install
npm run dev
```
### 2> Cách tạo 1 component:
Bạn tạo 1 file component có đuôi .svelte , ví dụ Button.svelte
Cấu trúc của 1 component:
```js
<script>

</script>

// Phần hmtl

<style>
</style>
```
Ví dụ mình muốn button hiển thị số lần click
```js
<script>
	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<style>
  button {
  background: gray;
  padding: 20px;
}
</style>
```

==> Khi gọi trong component khác:
```js
<script>
	import Button from './Button.svelte';
</script>

<div>
  <Button></Button>
</div>
```

### 3> Props và state:
Sử dụng lại ví dụ trên, mình thêm 1 props name để 
hiển thị xem ai đã bấm

```js
<script>
   // Props name
  export let name = "" // default props = ""
  
  // count là state
	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
  {name}has	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<style>
  button {
  background: gray;
  padding: 20px;
}
</style>
```

==> Khi gọi trong component khác:
```js
<script>
	import Button from './Button.svelte';
</script>

<div>
  <Button name={"petter join"}></Button>
</div>
```

### 4> Template:
Tương tự như các fw khác như react định nghĩa ra jsx,
svelte cũng định nghĩa ra bộ template của riêng nó

#### a> if - else:
```js
{#if user.loggedIn}
<button on:click={toggle}>
  Log out
</button>
{/if}
```
hoặc if else
```js
{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```
### b> Loop with Each:
```js
<ul>
	{#each cats as cat}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
			{cat.name}
		</a></li>
	{/each}
</ul>
```
hoặc

```js
{#each things as thing (thing.id)}
	<Thing current={thing.color}/>
{/each}
```  
### d> async await:
```js
{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```
### 5> Event
- Event dom: các bạn chỉ cần thêm tiền tố `on:`
Ví dụ như ở ví dụ trước:
```js
<button on:click={handleClick}>
  {name}has	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```  
hoặc với sự kiện mousemove
```js
<div on:mousemove={handleMousemove}>
	The mouse position is {m.x} x {m.y}
</div>
```

- Inline event: 
```js
<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
	The mouse position is {m.x} x {m.y}
</div>
```
6> Other:
Ngoài ra svelte còn có nhiều nội dung khác như lifecycle, data, router,animation,..
trong bài viết này mình chỉ giới thiệu 1 số nét căn bản. Các bạn tìm hiểu thêm tại trang chủ: https://svelte.dev/
và trang turiol : https://svelte.dev/tutorial/

## II> Ví dụ: tạo 1 component đơn giản 
Mình sẽ viết 1 component audio để custom lại thẻ audio
mặc định.

Demo:  ![](https://images.viblo.asia/3b36be1e-2225-4632-bb9d-0d1c65bd52c1.png)



Đầu tiên mình sẽ tạo 1 file tên là Audio.svelte
```js
<script>
export let src
let myAudio
let isLoading = true
let isPlay = false
let currentTime = 0

const endLoading = () => {
  // alert("done")
  isLoading = false
}

const onClickPlay = () => {
  console.log("play")
  isPlay = !isPlay
  if (isPlay) {
    myAudio.play()
  } else {
    myAudio.pause()
  }
}

const onEnd = () => {
  isPlay = falsesvelte
}

const startLoading = () => {
  isLoading = true
}

const onTimeUpdate = () => {
  currentTime = myAudio.currentTime
}

const formatData = () => {
  const timeInt = Math.floor(currentTime)
  const minute = Math.floor(timeInt / 60)
  const second = (timeInt - 60 * minute)

  return `${minute}:${second}`
}
</script>


<div class="player">
<!-- svelte-ignore a11y-media-has-caption -->
<audio controls={false}  on:loadstart={startLoading} on:loadedmetadata={endLoading} on:timeupdate={onTimeUpdate} on:ended={onEnd} bind:this={myAudio}>
  <source src={src}>
  Your browser does not support the audio element.
</audio>

<div class="avatar">
<img alt="" src="https://vcdn1-giaitri.vnecdn.net/2019/04/17/westlifet-1555487554-2581-1555487641.jpg?w=900&h=540&q=100&dpr=1&fit=crop&s=648KLjWO8NyX-qKtELFksg" />
</div>
<p class="time">{formatData(currentTime)}</p>
<div class="control">
<i class="fas fa-backward"></i>
<i class={isPlay ? "fas fa-pause play-icon" : "fas fa-play play-icon"} on:click={onClickPlay}></i>
<i class="fas fa-forward"></i>
</div>

{#if isLoading}
<p>isLoading....</p>
{/if}
</div>

<style>
.player {
  width: 100%;
}

.play-icon {
  margin: 5px 10px;
}

.time {
  width: 100%;
  text-align: center;
  margin: 5px 0 10px;
}

.avatar {
  width: 200px;
  height: 200px;
  border: solid 1px gray;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin: auto;
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}


</style>
```

==> Khi sử dụng, truyền props vào tương ứng

```js
<script>
	import Audio from './Audio.svelte'
</script>

<body>
	<Audio src="https://stitch-statichosting-prod.s3.amazonaws.com/5f646df5e75a6deba2991e77/5f1ec11789cec85775ae470b/audio1.mp3"/>
</body>

<style>

	body {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-self: center;
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		background-color: antiquewhite;
	}
</style>
```

Cảm ơn mọi người đã đọc bài viết của mình

### III> Tham khảo:
Trang chủ:https://svelte.de

Turiol: ![]
https://svelte.dev/tutorial/