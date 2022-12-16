![](https://images.viblo.asia/84dfeb78-3009-4808-971c-065310bc18a6.jpg)

Trong bài viết này mình xin giới thiệu về cách dùng `localStorage`, `sessionStorage` và `cookies` để lưu data ở browser và sự khác nhau giữa chúng. Mỗi cách lưu trữ sẽ có những ưu điểm, nhược điểm riêng, và dựa vào yêu cầu của mỗi bài toán chúng ta sẽ chọn một phương pháp phù hợp.

## Đầu tiên chúng ta so sánh `localStorage` và `sessionStorage`
#### Điểm giống nhau:

`localStorage` và `sessionStorage` thuộc về web storage API, chúng có một số điểm chung sau:
* Lưu data theo cặp key/value ở local browser và phía server không access được các data này.
* Có cùng APIs: `setItem`, `getItem`, `removeItem`, `clear`.
* Cho phép lưu trữ nhiều data(khoảng 10MB).


##### Cách sử dụng
`localStorage` và `sessionStorage` có cú pháp API giống nhau, những ví dụ sau đây sử dụng `localStorage` và cũng tương tự cho `sessionStorage`. Một cặp **key/value** gọi là một **entry**.

**1. Check browser support**
```js
if (window.localStorage) {
  // localStorage supported
}
```

**2. Create entry**
```js
let key = 'Item 1';
localStorage.setItem(key, 'Value');
```

**3. Read entry**
```js
let key = 'Item 1';
let myItem = localStorage.getItem(key);
```

**4. Update entry**

Giống với cách tạo mới entry, nhưng với key đã tạo trước đó
```js
let key = 'Item 1';
localStorage.setItem(key, 'New Value');
```

**5. Remove entry**
```js
let key = 'Item 1';
localStorage.removeItem(key);
```

**6. Remove all entries**
```js
localStorage.clear();
```

**7. Cách lưu object**

Do `localStorage` và `sessionStorage` chỉ lưu được `string` nên chúng ta cần convert `object` sang `string` sử dụng hàm `JSON.stringify`, sau đó khi get data thì sử dụng `JSON.parse` để convert `string` data về `object`
    
```js
let key = 'user';

// Create entry:
let myObj = { name: 'Nam', age: 20 };
localStorage.setItem(key, JSON.stringify(myObj));

// Read entry:
let item = JSON.parse(localStorage.getItem(key));
```

**7. Get tất cả entries**

`localStorage` và `sessionStorage` không có hàm `forEach` nên chúng ta sẽ sử dụng vòng lặp `for`
    
```js
for (let i = 0; i < localStorage.length; i++){
  let key = localStorage.key(i);
  let value = localStorage.getItem(key);
  console.log(key, value);
}
```

#### Điểm khác nhau:
Khi close tab hay close browser thì data ở `localStorage` vẫn tồn tại, và chỉ bị mất khi user xoá cache hoặc clear web data. Còn đối với `sessionStorage` thì data sẽ bị mất ngay khi close tab hoặc close browser.

Để demo cho điểm khác nhau này chúng ta vào 1 page bất kì, bật *Console* lên và set data
```js
sessionStorage.setItem("sessionData", "I am set in session storage.");    
localStorage.setItem("localData", "I am set in local storage."); 
```
Sau đó close tab, rồi access vào lại page đó và check `localStorage`, `sessionStorage` ở *Console* (lưu ý là ctrl+shift+T ở chrome sẽ còn cache data, nên chúng ta phải gõ url trực tiếp)
```js
localStorage.localData
// > "I am set in local storage."
sessionStorage.sessionData
// > undefined
```

## Local Storage và Cookies
Một số điểm khác nhau giữa `localStorage` và `cookies`
* `localStorage` chỉ access được trên browser client; còn `cookies` thì có thể access được ở browser client và cả phía server (khi tạo một http request thì `cookies` của browser sẽ được attach vào header `Cookie`, từ đó phía server có thể parse header này và get được data cookie).
* `cookies` có thời gian hết hạn `expires`, sau thời gian này thì cookies sẽ biến mất khỏi browser.
* `cookies` chỉ cho phép lưu tối đa khoảng 4 KB, vì vậy ta nên sử dụng `cookies` với mục đích save những loại data simple ví dụ như token cho authentication,...

Để demo `cookies` được send lên server khi tạo một http request: chúng ta vào 1 page bất kì (google.com), bật *Console* lên và chạy đoạn code sau
```js
document.cookie = "greeting=Hello World";
fetch('https://www.google.com/')
```

Sau đó qua tab *Network*, check request vừa tạo sẽ thấy `cookies` được attach vào header `Cookie`

![](https://images.viblo.asia/73e5ff09-2e1c-4fc9-bc46-13cb0168ac26.png)

## Kết luận
Trong bài viết này mình đã so sánh về  `localStorage`, `sessionStorage` và `cookies`, hy vọng mọi người nắm rõ và áp dụng một cách linh hoạt trong các projects của mình, xin cám ơn!