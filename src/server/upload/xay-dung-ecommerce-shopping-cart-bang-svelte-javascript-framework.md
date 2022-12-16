### Introduction
Svelte JavaScript framework là miễn phí và là open-source. Đuợc tạo bởi Rich Harris và được duy trì bởi các thành viên cốt lõi của Svelte.
Các ứng dụng Svelte không bao gồm các tham chiếu framework khác. Thay vào đó, việc xây dựng một ứng dụng Svelte sẽ tạo ra mã để thao tác DOM,
điều này có thể làm giảm kích thước của các tệp được chuyển cũng như mang lại hiệu suất khởi động và thời gian chạy của ứng dụng tốt hơn. 
Svelte có trình biên dịch riêng để chuyển đổi code ứng dụng thành JavaScript phía máy client tại thời điểm xây dựng.
Nó được viết bằng TypeScript.  Mã nguồn Svelte được cấp phép theo Giấy phép MIT và được lưu trữ trên GitHub.

### Build Svelte ecommerce cart.
  Chúng ta sẽ bắt đầu tạo ứng dụng svelte.
  Chúng ta sẽ tạo 1 thư mục `sveltecart` trong thư mục home sử dụng command sau.
  ```
 npx degit sveltejs/template sveltecart
 ```
Cấu trúc thư mục
![](https://images.viblo.asia/c9b75e2b-e2e3-43bb-bcdf-02cff8a228cf.png)


Các file quang trọng nhất trong ứng dụng này là:
* src/main.js
* src/App.svelte
* public/index.html


File `public/index.html` có nội dung sau:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1'>
    <title>Svelte app</title>
    <link rel='icon' type='image/png' href='/favicon.png'>
    <link rel='stylesheet' href='/global.css'>
    <link rel='stylesheet' href='/build/bundle.css'>
    <script defer src='/build/bundle.js'></script>
</head>
<body>
</body>
</html>
```

Lưu ý: Ở đoạn html trên có gọi 2 file `css` và 1 file `js` trong cùng một thư mục. File  `global.css` nắm giữ css có thể ảnh hưởng đến bất kỳ component nào.
File  `build/bundle.css` được tạo từ css trong mỗi `component`. File build/bundle.js được tạo từ JavaScript and HTML trong mỗi `component` và bất kỳ javascript nào khác trong ứng dụng.

File `src/main.js` có nội dung như sau:
```
import App from './App.svelte';
const app = new App({
    target: document.body,
    props: {
        name: 'world'
    }
});
export default app;
```
Điều này tạo ra `App` `component`, thuộc tính `target` có thể chỉ nơi `component` được tạo ra.
Đối với hầu hết các ứng dụng, đây là phần nội dung của tài liệu. name prop  được pass đến App component.

File `src/App.svelte` chưa nội dung sau:
```
<script>
    export let name;
</script>
<main>
    <h1>Hello {name}!</h1>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
```
Các biến được xuất trông thẻ script là giá trị nhận được từ  file `src/main.js`. Dấu ngoặc `{}` dùng để xuất giá trị của một biểu thức javascript.
Thẻ `style` để lưu trữ tất cả styles css được áp dụng cho ứng dụng này. 

#### Building the Svelte eCommerce shopping cart
Đầu tiên là sẽ tạo thư mục và file và bắt đầu ứng dụng. Để tạo các thành phần bắt buộc, hãy thực hiện các lện sau trong `terminal`
```
cd src
mkdir CartComponents
mkdir Stores
cd CartComponents
touch card.svelte
touch cardwrapper.svelte
touch checkout.svelte
touch checkoutitem.svelte
touch navbar.svelte
cd ..
cd Stores
touch stores.js
cd..
touch items.js
```
Trong `src` thư mục, chúng ta có thể tạo `CartComponents` thư mục và bên trong `CartComponents` thư mục sẽ tạo file:
```
card.svelte
cardwrapper.svelte
checkout.svelte
checkoutitem.svelte
navbar.svelte
```
Giống như, Trong thư mục `src` chúng ta có thể tạo `Stores` thư mục và bên trong `Stores` thư mục, chúng ta có thể tạo `stores.js`. Tiếp theo trong `src` thư mục. Chúng ta sẽ tạo 1 file Item.js.


Chúng ta sẽ sử dụng Bootstrap CSS cho ứng dụng, đầu tiên chúng ta sẽ thêm Bootstrap cdn vào file index.html. Đến 
file `public/index.html`và thêm bootstrap cdn.
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Svelte app</title>
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="stylesheet" href="/global.css" />
    <link rel="stylesheet" href="/build/bundle.css" />
   <!-- boostarp cdn starts here  -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    
    <!-- bootstrap cdn ends here  -->
    <script defer src="/build/bundle.js"></script>
    <style>
      body {
        background: #f2f4f8;
      }
    </style>
  </head>
  <body></body>
</html>
``` 
Cập nhật file `stores/stores.js`
```
import { writable } from 'svelte/store'

export const cart = writable({})
```
Ở đoạn code trên, chúng ta import  `writable()` function từ `svelte/store` và sử dụng nó để tạo
một store gọi `cart`. Mở file `src/items.js` và cập nhật như sau:
```
export default [
	{
		name: 'laptop',
		price: '500',
		img: 'laptop1.png'
	},
	{
		name: 'Latest PC',
		price: '1,000',
		img: 'mobile1.png'
	},
	{
		name: 'Latest laptop',
		price: '1000',
		img: 'laptop2.png'
	},
	{
		name: 'latest smart watch',
		price: '5,000,000',
		img: 'smartwatch.png'
	},
	{
		name: 'Monitor',
		price: '2000',
		img: 'display.png'
	},
	
	{
		name: 'playstation',
		price: '2,670',
		img: 'playstation.png'
	}
]
```
#### Building the Cards Components

Mở file `src\CartComponents\card.svelte` và update nộ dung.
```
<script>
  import { get } from "svelte/store";
  import { cart } from "../Stores/stores.js";
  export let item;
  let { img, name, price } = item;
  img = `img/${img}`;
  const cartItems = get(cart);
  let inCart = cartItems[name] ? cartItems[name].count : 0;
  function addToCart() {
    inCart++;
    cart.update(n => {
      return { ...n, [name]: { ...item, count: inCart } };
    });
  }
</script>

<div class="card">
  <img  class="card-img-top" width="200" src={img} alt={name} />
  <div class="card-body">

  <h5 class="card-title">{name}</h5>
  

  <b class=alert alert-info > $ {price}</b>
  <p class=alert alert-info >{#if inCart > 0}
      <span>
        <em>({inCart} in cart)</em>
      </span>
    {/if}</p> </div>
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-primary" on:click={addToCart}>
      <object
        aria-label="shopping cart"
        type="image/svg+xml"
        data="img/svg/shopping-cart.svg" />
      Add to cart
    </button>
  </div>

  
</div>
```

Ở đoạn mã trên chúng ta đã import `get()` từ `svelte/store`. Nó sử dụng `get` và `set` một cách thủ công.
Cập nhật file `src\CartComponents\CardWrapper.svelte`
```
<script>
  import Card from "./Card.svelte";
  import items from "../items.js";
</script>

<div class="container">
  <div class="row">
  

    {#each items as item}
    <div class="col-md-4">

    <Card {item} /> 
  </div> 
  {/each} 
 </div> </div> 

```
Trong đoạn mã trên chúng ta đã import `Card.svelte` & `item.js` đã tạo trước đó để sử dụng và hiển thị cho các thẻ sử dụng Bootsrap class.
### Working with the Checkout Components
Cập nhật file `src\CartComponents\CheckoutItem.svelte`
```
<script>
  import { cart } from "../Stores/stores.js";
  export let item;
  let { name, price, img, count } = item;
  const countButtonHandler = (e) => {
    if (e.target.classList.contains("add")) {
      count++;
    } else if (count >= 1) {
      count--;
    }
    cart.update((n) => ({ ...n, [name]: { ...n[name], count } }));
  };
  const removeItem = () => {
    cart.update((n) => {
      delete n[name];
      return n;
    });
  };
</script>

<div class="row">
  <img
    class="img-fluid img-thumbnail"
    width="300"
    src={`img/${img}`}
    alt={name}
  />
  <div class="item-meta-data">
    <h3 class="title">{name}</h3>
    <p class="price">Price: $ {price}</p>
    <div class="col">
      <button
        type="button"
        class="btn btn-success add"
        on:click={countButtonHandler}>+</button
      >
      {" "}
      <span>{count}</span>
      {" "}
      <button
        type="button"
        class="btn btn-warning"
        on:click={countButtonHandler}>-</button
      >
      {" "}
      <button type="button" class="btn btn-danger" on:click={removeItem}>
        <object
          aria-label="remove"
          type="image/svg+xml"
          data="img/svg/cancel.svg"
        />
        Remove
      </button>
    </div>
  </div>
</div>


```
Trong đoạn code trên chúng ta đã viết 1 logic đơn giản trả lại các `Items` cho `cart`. Kiểm tra checked-out cho mỗi `cart` và hiển thị message theo điều kiện thảo mãn.

Tiếp theo chúng ta cập nhật file `src\CartComponents\Navbar.svelte`
```
<script>
    import { cart } from "../Stores/stores.js";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    let cart_sum = 0;
    const unsubscribe = cart.subscribe(items => {
      const itemValues = Object.values(items);
      cart_sum = 0;
      itemValues.forEach(item => {
        cart_sum += item.count;
      });
    });
    function goToHome() {
      dispatch("nav", {
        option: "home"
      });
    }
    function goToCheckout() {
      dispatch("nav", {
        option: "checkout"
      });
    }
  </script>
  


  <nav class="navbar navbar-dark bg-primary navbar-expand-lg navbar-dark ">
    <div class="container">

      <a class="navbar-brand logo-font" id="brand" on:click={goToHome}> SvelteCart </a>  
      
        <!-- links toggle -->
        <button class="navbar-toggler order-first" type="button" data-toggle="collapse" data-target="#links" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-bars"></i>
        </button>
        <!-- account toggle -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#account" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-shopping-cart fa-1x" aria-hidden="true"></i>
            <span class="badge badge-light">88</span>
        </button>
        
        <div class="collapse navbar-collapse" id="links">
            <ul class="navbar-nav mr-auto">
              
                <li class="nav-item">
                    <a class="nav-link" href="#"> Electronics</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">customer care</a>
                </li>

            </ul>
        </div>
        <div class="collapse navbar-collapse" id="account">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active"><a class="nav-link" on:click={goToCheckout}>Items in Cart
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart-dash-fill" viewBox="0 0 16 16">
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z"/>
                  </svg>
                </a></li>
                <li class="nav-link active"> {#if cart_sum > 0} {cart_sum}
                  {/if} </li>
            </ul>
        </div>
    </div>
</nav>

<br>

```
Trong đoạn mã trên chúng ta đã `import` `createEventDispatcher` funtion từ svelte package và gọi một event dispatcher.
Cuối cùng update file   `App.svelte`
```
<script>
	import CardWrapper from "./CartComponents/CardWrapper.svelte";
	import Navbar from "./cartComponents/Navbar.svelte";
	import Checkout from "./CartComponents/Checkout.svelte";
	let nav = "home";
	function navHandler(event) {
	  nav = event.detail.option;
	}
  </script>
  
  <Navbar on:nav={navHandler} />
  {#if nav === 'home'}
	<CardWrapper />
  {:else}
	<Checkout />
  {/if}
```
Ở trên đoạn mã trên chúng ta đã nhập tất cả các thành phần cần thiết để tạo ra App.svelte file.
### Conclusion

Svelte là một sự thay thế xứng đáng cho các tùy chọn phổ biến hiện nay của React, Vue và Angular. Nó có nhiều lợi ích, bao gồm kích thước gói nhỏ, định nghĩa thành phần đơn giản, quản lý trạng thái dễ dàng và khả năng phản ứng mà không cần DOM ảo.
Qua bài hướng dẫn này bạn đã học được cách để xây dụng một ứng dụng giỏ hàng đơn giản bằng Svelte.
Bạn có thểm tham khảo source code tại đây: [GitHub](https://github.com/Dunebook/SvelteEcommercecart/). 


### References

https://en.wikipedia.org/wiki/Svelte

https://svelte.dev/docs

https://codesource.io/building-an-ecommerce-shopping-cart-with-svelte/