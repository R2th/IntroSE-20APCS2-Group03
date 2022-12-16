Async and Await cách hợp lý nhất để xử lý các promises và bất đồng bộ trong Javascript. Vậy thì ngay sau đâu chúng ta sẽ cùng tìm hiểu về hai keyword này nhé.

Có thể anh em khi code đều fall in love with **async**-**await**. Đây là cách đơn giản nhất để chúng ta có thể xử lý được các bất đồng bộ trong Javascript. Nếu như làm một cuộc khảo sát nho nhỏ về việc sử dụng cú pháp **async**-**await** với **promise**.**then**()...**then**().**catch**(), thì mình chắc chắn rằng **async**-**await** sẽ dành chiến thắng :smile:

Không chỉ là về cú pháp mà chúng ta còn cần so sánh về khả năng sử dụng của chúng với nhau. Tuy nhiên chúng ta không nên so sánh giữa async/await  với cách xử lí promise cũ. Có rất nhiều trường hợp chúng ta nên suy nghĩ và chọn ra được cách sử dụng hợp lí nhất.

# 1. Keyword async/await 
JavaScript cung cấp cho chúng ta hai từ khóa, **async** và **await** để làm cho việc sử dụng các promises trở nên dễ dàng hơn một cách đáng kể. Các từ khóa **async** và **await** góp phần nâng cao syntax ngôn ngữ JavaScript hơn là giới thiệu một khái niệm lập trình mới.

Thông thường theo lý thuyết :
* async được sử dụng để return một promise.
* await được sử dụng để chờ đợi và xử lí một promise

Cùng mở rộng ra một chút nào :
* Các **async** là từ khóa  dành cho một function mà nhiệm vụ của nó là phải thực hiện một hoạt động bất đồng bộ. Nó có nghĩa là function này có thể mất một khoảng thời gian để thực hiện trước khi nó kết thúc, nó có thể return một kết quả hoặc gặp lỗi.

Chúng ta sử dụng **async** như một function :

```javascript
async function fetchUserDetails(userId) {
   return {'name': 'Robin', 'likes': ['toys', 'pizzas']};
}
```

Cùng với arrow function thì sao nhỉ :

```javascript
const fetchUserDetails = async (userId) => {
  return {'name': 'Robin', 'likes': ['toys', 'pizzas']};
}

```

Vậy thì thằng async fetchUserDetails return về gì khi chúng ta call nó? Tất nhiên là một Promise rồi :
![](https://images.viblo.asia/1a8fa876-1622-469b-93d7-b75e9876f0ae.jpeg)

Sự khác biệt giữa một function thông thường và một async function đó chính là luôn trả về một Promise. Nếu chúng ta không trả về một promise từ async function, JavaScript sẽ tự động bao bọc giá trị trong một promise và trả về nó.

* Keyword await là khi JavaScript function thực hiện và chờ đợi cho đến khi một promise được giải quyết (giải quyết hoặc từ chối) và giá trị / lỗi được return/thrown. Khi async function fetchUserDetails trả về một promise, thì chúng ta sử dụng await :

```javascript
const user = await fetchUserDetails();
console.log(user)
```

Bây giờ khi console.log() ra thì chúng ta sẽ thấy :

![](https://images.viblo.asia/84f28aaf-d187-4776-8fbf-3e4f9bbec870.jpeg)

Có thể sử dụng .**then**() để xử lí promise đó mà ko cần **await**.

```javascript
fetchUserDetails().then((user) => console.log(user));
```

# 2. Một vài quy tắc khi sử dụng async/await 

Có một vài quy tắc mà chúng ta cần ghi nhớ khi sử dụng async/await nhé 

* Chúng ta không thể sử dụng await trong một function thông thường, non-async function. JavaScript engine sẽ tạo ra một syntax error nếu chúng ta cố tình làm như vậy.

```javascript
function caller() {
 // Using await in a non-async function.
 const user = await fetchUserDetails();
}

// This will result in an syntax error
caller();

```

*  Function mà chúng ta sử dụng sau await có thể là một async hoắc không. Chúng ta không có quy tắc bắt buộc nó phải là một function bất đồng bộ nhé. 
Ví dụ :

```javascript
function getSynchronousHi() {
  return 'Hi';
}
```

Chúng ta vẫn có thể sử dụng await trong khi gọi function trên :

```javascript
async function caller() {
  const messageHi = await getSynchronousHi();
  console.log( messageHi);
}

caller(); // Output la Hi
```

Như đã thấy ở trên chúng ta có thể sử dụng await cùng một non-async function, nhưng chúng ta lại ko thể sử dụng nó bên trong được.

Để sử dụng cấp cao nhất await trong môi trường không được hỗ trợ, giải pháp là đưa nó vào một hàm ẩn danh, như thế này :

```javascript
(async () => {
   const user = await fetchUserDetails();
})();
```

# 3. Xử lí Errors cùng async/await 

Trươc thì chúng ta hay xử lí errors trong thằng .**catch**() . Nếu promise bị rejects , nó sẽ trả về một error, và chúng ta dùng catch để xử lí nó.

Cùng với việc sử dụng async/await, chúng ta lại xử lí theo cách truyền thống đó là dùng **try**...**catch** . Khi xảy ra lôi, thì nó sẽ được đưa đến catch block.

Cùng xem ví dụ nhé, chúng ta có một function đang thực hiện viếc validate userId và password. Nếu không thành công thì promise sẽ bị reject và ngược lại :

```javascript
const validateUser = ({userId, password}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId && password) {
                resolve(`${userId} you have been authenticated successfully!!!`);
            } else {
                reject({message: 'userId or Password could be blank!'});
            }

        }, 2000);
    });
}
```

Vì method trên trả về một promise, chúng ta có thể sử dụng await để xử lí, tập trung vào case userId và password là empty strings :


```javascript
const app = async () => {
    const data = {
        userId: '',
        password: ''
    };

    try {
        console.log('Initializing...');
        const result = await validateUser(data);
        console.log(result);
    } catch (e) {
        console.error(e.message);
    }
}

app();

```


Khi chúng ta call thằng app(), validateUser(data) sẽ xuât hiện lỗi. Chúng ta xử lí bằng cách sử dụng try...catch trong app(). Chúng ta sẽ nhận được như sau :

![](https://images.viblo.asia/3b03673e-83a9-411b-bbdd-e1d6d2df7ea2.jpeg)

Nếu giá trị của chúng ta hợp lệ, thì sẽ cập nhật kết quả success.

Chúng ta cùng làm một ví dụ về order pizza nhé :

```javascript
async function orderPizza(type, name) {
    try{
        // Get the Nearby Pizza Shop
        const shopId = await fetch("/api/pizzahub/shop", {
            'lang': 38.8951 , 
            'lat': -77.0364});
        // Get all pizzas from the shop  
        const allPizzas = await fetch("/api/pizzahub/pizza", {
            'shopId': shopId});
        // Check the availability of the selected pizza
        const pizza = await getMyPizza(allPizzas, type, name);
        // Check the availability of the selected beverage
        const beverage =  await fetch("/api/pizzahub/beverages", {
            'pizzaId': pizza.id});
        // Create the order
        const result = await create("/api/order", {
                beverage: beverage.name,
                name: name,
                type: type,
            });
        console.log(result.message);
    } catch(error){
        console.error(error.message);
    };
}

```

# 4. Kết bài 

Vậy là bài viết đến đây là kết thúc rôi.
Nếu thấy hay hãy like, share và upvote cho mình nhé.

Cảm ơn mọi ngươi thật nhiều :100::100::100: