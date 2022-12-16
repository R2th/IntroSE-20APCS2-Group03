Optional chaining là một kỹ thuật giúp ta làm việc với Javascript dễ dàng hơn. Nó cũng cần thiết như Fat Arrow Functions hoặc 'let' và 'const'. Thế Option Chaining hoạt động ra sao? nó giải quyết những vấn đề gì? Hãy cùng mình nghiên cứu để hiểu rõ hơn nhé.

## Đặt vấn đề
Hãy tưởng tượng:
Bạn lấy data từ API, và object trả về dạng Deeply Nested Objects, lúc này ta cần phải thông qua rất nhiều object properties để lấy được properties trong cùng.

```js
// API response object
const person = {
    details: {
        name: {
            firstName: "Michael",
            lastName: "Lampe",
        }
    },
    jobs: [
        "Senior Full Stack Web Developer",
        "Freelancer"
    ]
}
// Getting the firstName
const personFirstName = person.details.name.firstName;
```

Với cách trên thì việc lấy firstName thật sự không tốt. Một giải pháp tốt hơn có thể như thế này:

```js
// Checking if firstName exists
if( person &&
    person.details &&
    person.details.name ) {
        const personFirstName = person.details.name.firstName || 'stranger';
}
```

Như bạn thấy trong ví dụ trên, thậm chí những việc đơn giản như get firstName của một người sao lại phức tạp đến thế. 
Vì vậy, đây là lý do tại sao chúng ta có các frameworks như `lodash` để dễ dàng thực hiện những việc này.

```js
_.get(person, 'details.name.firstName', 'stranger');
```

`lodash` làm cho code dễ đọc hơn, nhưng cũng khiến bạn phụ thuộc nhiều vào codebase của bạn. Bạn cần updated nó, và nếu làm việc trong team thì bạn cần phải giải thích và hướng dẫn cách sử dụng nó cho team bạn. Vì vậy, đây cũng không phải là giải pháp hợp lý.

## Giải pháp
Optional chaining là giải pháp cho tất cả vấn đề đó.

### 1. Cách thức hoạt động

Optional chaining giới thiệu cú pháp mới mà thoạt nhìn sẽ lạ đối với bạn, nhưng chỉ sau vài phút bạn sẽ quen với nó.

```js
const personFirstName = person?.details?.name?.firstName;
```

Như ở ví dụ bên trên, ta thấy xuất hiện cú pháp `?.` Nếu có một cú pháp `?.` đặt trước person, tức là ta đang kiểm tra xem person đó có tồn tại hay không? Hoặc trong nhiều trường hợp person có giá trị null hoặc undefined thì sao? Lúc này sẽ không return về error mà chỉ trả về undefined. Vì thế, personFirstName sẽ có giá trị undefined. Câu hỏi cũng tương tự cho detail? và name?  Nếu có bất kì thuộc tính cha nào có giá trị null hoặc undefined, thì personFirstName sẽ trả về undefined. Đây được gọi là Short-circuiting. Khi javascript tìm thấy null hoặc undefined, nó sẽ short circuit và ngừng đi sâu hơn.

### 2. Default values

Chúng ta cần tìm hiểu về `Nullish coalescing operator` . Nghe có vẻ khó học đây. Hi thật sự không khó lắm đâu. Hãy xem ví dụ bên dưới:

```js
const personFirstName = person?.details?.name?.firstName ?? 'stranger';
```

Cú pháp `Nullish coalescing operator`  biểu diễn dưới dạng `??` Nó cũng khá dễ đọc. Nếu bên vế trái có giá trị undefined, khi đó personFirstName sẽ có giá trị bên phải `??` tức là 'stranger'.

### 3. Dynamic properties

Đôi khi ta muốn truy cập đến một dynamic value. Nó có thể là array hoặc là dynamic property của một object.

```js
const jobNumber = 1;
const secondJob = person?.jobs?.[jobNumber] ?? 'none';
```

Ở ví dụ bên trên có thể hiểu `jobs?.[jobNumber]`  tức là `jobs[jobNumber]` nhưng nó sẽ không trả về error mà thay vào đó sẽ return về `none`.

### 4. Function or method call

Thỉnh thoảng ta làm việc với object mà không biết nó có phải là method hay không. Ở đây ta có thể sử dụng cú pháp `?.()`
hoặc với arguments `?.({ some: 'args'})` .  Nếu method này không tồn tại trên object, nó sẽ return undefined.

```js
const currentJob = person?.jobs.getCurrentJob?.() ?? 'none';
```

Nếu không có function getCurrentJob thì currentJob sẽ có giá trị none.

### 5. Bắt đầu sử dụng

Hỗ trợ cho những version Browser mới, cụ thể https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#browser_compatibility

## Lời kết

Mình nghĩ với Option Chaining sẽ làm cho code javascript dễ đọc hơn rất nhiều và cũng ít bị lỗi hơn nữa. Bạn cũng có thể tìm hiểu kĩ hơn về Option Chaining tại [proposal](https://github.com/tc39/proposal-optional-chaining) . 

Trên đây là phần chia sẻ về Option Chaining được mình tham khảo từ [bài viết](https://dev.to/lampewebdev/the-most-outstanding-new-feature-in-javascript-you-need-to-know-about-optional-chaining-2pg2?fbclid=IwAR25ZrSVwpEmGNgdT_Ma-BLz3HrGn6wG3bvGjnY1f9pAN4JtAX9ItlBsqOg) của  lampewebdev và [Optional chaining
](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) . Hy vọng sẽ có ích cho bạn trong quá trình code với javascript.