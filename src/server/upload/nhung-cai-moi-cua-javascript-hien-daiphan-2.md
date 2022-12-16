-  JavaScript đã phát triển rất nhanh trong những năm gần đây. Đặc biệt là sau khi phát hành ES6 vào năm 2015, mọi thứ đã trở nên rất tuyệt vời.
-  Trong bài viết này, chúng tôi sẽ thảo luận về các tính năng được giới thiệu trong phiên bản ES2020.

## Toán tử optional chaining

- Toán tử optional chaining : Cung cấp một cách để đơn giản hóa việc truy cập các giá trị thông qua các đối tượng
- Cho phép xử lý short-circuiting nếu tham chiếu bị null hoặc undefined thì trả về giá trị undefined thay vì ném ra lỗi từ đó biểu thức không thể tiếp tục. 
- Điều này giúp các biểu thức ngắn và đơn giản hơn khi truy cập các thuộc tính của đối tượng mà khả năng tồn tại mà tham chiếu là chưa được đảm bảo.

xem ví dụ dưới đây: ta có 1 object là **blog**:

    ```
    const blog = {
      title: "My Blog",
      author: {
        name: "Yen",
        links: {
          website: "https://viblo.asia/",
        },
      },
    };

    const linkToWebsite =
      blog &&
      blog.author &&
      blog.author.links &&
      blog.author.links.website;
    ```
    
  -  Bằng cách sử dụng dấu?. toán tử, JavaScript biết kiểm tra ngầm để đảm bảo các tham chiếu ở giữa **null** hoặc **undefined** trước khi cố gắng truy cập thêm
  -  Nếu tham chiếu là null hoặc undefined, biểu thức sẽ tự động dừng và trả về undefined. Dưới đây là ví dụ tương tự bằng cách sử dụng chuỗi tùy chọn:

    ```
    //ES2020
    const linkToWebsite = blog?.author?.links?.website;
    ```
    
##    Toán tử Nullish Coalescing (??)

- Toán tử Nullish Coalescing (??) là một toán tử logic trả về toán hạng bên phải của nó khi toán hạng bên trái của nó là null hoặc undefined và ngược lại

Kết quả của a ?? b là:

Chọn a nếu nó không null hoặc undefined
Chọn b cho trường hợp ngược lại ở trên

    ```
    const res = (a !== null && a !== undefined) ? a : b;

    //ES2020
    const res = a??b;
    
    ```
    
  tương tự ví dụ dưới đây
  
    ```
    let firstName = null;
    let lastName = null;
    let nickName = "Yen xinh gai";
    console.log(firstName ?? lastName ?? nickName ?? "Anonymous"); // nếu firstName null hoặc undefine thì lấy lastName. nếu lastName null thì chọn nickname nấu nickName null thì là 'Anonymous' ở đây first và last đều null nên kết quả sẽ là Yen xinh gai
    
    ```
    
  ![](https://images.viblo.asia/262c2a2e-59f9-4620-9faa-70dc39fd652b.png)

##  Dynamic Imports

- Import là Cho phép chúng ta import các function từ các module khác

- Để dynamic import một module là ta có thể được gọi là một hàm và tự động trả về Promise, Await

```
//ES2020
import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });
  
  //ES2020
let module = await import('/modules/my-module.js'); 
```

## BigInt 

- Integer trong Javascript giới hạn đến giá trị 2^53- 1
-  Number.MAX_SAFE_INTEGER đại diện cho số nguyên an toàn tối đa trong JavaScript (2^53 - 1).

```
    const x = Number.MAX_SAFE_INTEGER + 1;
    const y = Number.MAX_SAFE_INTEGER + 2;

    console.log(Number.MAX_SAFE_INTEGER);
    // expected output: 9007199254740991

    console.log(x);
    // expected output: 9007199254740992

```
- Để xử lý các giá trị lớn hơn nhiều lần với hiệu năng cao, ta có thể sử dụng thư viện Big Integer sau. 
- Big integer cho phép thực hiện các phép toán cộng, trừ, nhân, chia, so sánh, … với các số Integer không giới hạn, miễn sao bạn có đủ RAM.

```
const previouslyMaxSafeInteger = 9007199254740991n

const alsoHuge = BigInt(9007199254740991)
// ↪ 9007199254740991n

const hugeString = BigInt("9007199254740991")
// ↪ 9007199254740991n
```

## Promise.allSettled()

- Phương thức Promise.allSettled () sẽ trả về mảng tất cả các Promise đã thực hiện hoặc bị từ chối
- Nó thường được sử dụng khi bạn có nhiều tác vụ không đồng bộ không phụ thuộc vào nhau để hoàn thành thành công hoặc bạn luôn muốn biết kết quả của mỗi promise.

    ```
      //ES2020
    const promise1 = Promise.resolve(3);
    const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'Something went wrong'));
    const promises = [promise1, promise2];

    Promise.allSettled(promises).
      then((results) => results.forEach((result) => console.log(result.status)));

    // expected output:
    // "fulfilled"
    // "rejected"
    ```