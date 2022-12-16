# Async functions

Như chúng ta đã biết khi sử dụng promise để làm việc với các tác vụ bất đồng bộ, ta thường sử dụng nối với .then() và .catch() để xử lý các giá trị trả về của promise hoặc bắt lỗi xảy ra khi thực hiện promise. Ví dụ

```javascript
	function logFetch(url) {
  		return fetch(url)
	    	.then(response => response.text())
	    	.then(text => {
	      		console.log(text);
	    	}).catch(err => {
	      	console.error('fetch failed', err);
    	});
	}
```

Một mặt nào đó ta tháy cú pháp như trên rất tiện lợi cho lập trình viên trong. Khi cần thêm xử lý về promise thì chỉ cần nối với .then() và nó sẽ đẩy nhanh quá trình code của họ. Tuy nhiên như ta thấy nếu ta cần xử lý một chuỗi dài promise thì việc nối thêm một chuỗi .then() sẽ làm cho code của chúng ta trở nên rất rối, khó để đọc và nếu cần debug ở một promise nào đó thì rất khó khăn.

ES8 giới thiệu đến cho ta một giải pháp cho vấn đề trên là sử dụng async functions. Các async functions được dùng để định nghĩa ra các hàm xử lý cho các tác vụ bất đồng bộ. Thay vì sủ dung promise cùng với các .then(), .catch() thì ta sẽ viết các async functions. Các async function cũng trả về promise khi được gọi, promise này sẽ resolved nếu async functions trả về giá trị cụ thể, và promise bị rejected nếu async functions ném ra một exception. Các async funtions có cấu trúc như sau:

```javascript
	async function myFirstAsyncFunction() {
	  try {
	    const fulfilledValue = await promise;
	  }
	  catch (rejectedValue) {
	    // …
	  }
	}
```

Khi sử dung async trước một định nghĩa function, ta có thể sử dụng await trong function đó. khi await một promise thì function sẽ tạm dừng mà không block luồng xử lý của code cho đến khí promise được hoàn thành. Nếu promise resolved thì giá trị sẽ được trả về, nếu promise bị rejected thì lỗi sẽ được bắn ra.

Viết lại code cho function logFetch() sử dụng async function:

```javascript
async function logFetch(url) {
  try {
    const response = await fetch(url);
    console.log(await response.text());
  }
  catch (err) {
    console.log('fetch failed', err);
  }
}
```

Ta thấy code trên dễ đọc dễ hiểu và gọn hơn. Nó sẽ khai báo một biến lưu giá trị của promise fetch(url). Bằng việc sử dụng await khi promise được resolved thì giá trị sẽ được gán cho response. Sau đó ta sẽ tạo một promise để xử lý kết quá trả về của response, cũng bằng việc sử dụng await khi promise được resolved thì sẽ console.log() kết quả là text ra. Nếu 1 trong 2 promise trên có lỗi nó sẽ được catch().

# Async luôn trả về giá trị

Async function luôn trả về một promise. Promise này resolved nếu async function trả về giá trị và rejected nếu async function ném ra một lỗi nào đó.

```javascript
function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function hello() {
  await wait(500);
  return 'world';
}
```

khi gọi function hello() thì nó luôn trả về một promise đã được resolved với giá trị là *world*

```javascript
async function foo() {
  await wait(500);
  throw Error('bar');
}
```
khi goi function foo() thì nó trả về một promise bị rejected với giá trị là Error('bar').

# Các cú pháp khác của async function.

## Sử dụng với arrow function.

```javascript
const jsonPromises = urls.map(async url => {
  const response = await fetch(url);
  return response.json();
});
```

## Sử dụng với phương thức của đối tượng

```javascript
const storage = {
  async getAvatar(name) {
    const cache = await caches.open('avatars');
    return cache.match(`/avatars/${name}.jpg`);
  }
};

storage.getAvatar('jaffathecake').then(…);
```

## Sử dụng với phương thức của class.

```javascript
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jaffathecake').then(…);
```


# Kết luận

Như vậy async function giúp chúng ta sử dụng promise một cách rõ ràng, gọn gàng và dễ đọc trong quá trình code. Ngoài ra giúp ta chuyển các tác vụ liên quan đến promise vào xử lý ở các hàm và đảm bảo các hàm đó luôn trả về promise. Hiện này hầu hết các browser hiện đại đã hỗ trợ async function nên việc tiếp cận cũng dễ dàng hơn.

# Tài liệu tham khảo.
1.) https://developers.google.com/web/fundamentals/primers/async-functions