Khái niệm `Promise` đã khá quen thuộc với chúng ta rồi. Khi muốn tạo hoặc nhận xử lý bất đồng bộ (xử lý chờ) trong javascript chúng ta thường sẽ nghĩ đến và sử dụng `Promise`. Nhưng đó mới chỉ là những cách sử dụng cơ bản của `Promise` thôi. Hôm nay chúng ta hãy thử biến đổi nó một chút và hy vọng sau khi biến đổi xong thì nó sẽ mang lại nhiều lợi ích cũng như tiện lợi trong xử lý tình huống hơn.
# I. Promise
Hãy quay lại với khái niệm `Promise`. Nếu để hiểu theo nghĩa đen  thì `Promise` như một lời hứa vậy và thực chất cách hiểu này là đúng chứ không sai. `Promise` là một đối tượng đại diện cho một xử lý bất động bộ (xử lý chờ). Và khi một đối tượng `Promise` được khởi chạy thì sẽ có 2 trường hợp có thể xảy ra. Một là `Promise` xử lý thành công và trả về kết quả mong muốn sau khi thành công, hai là `Promise` xử lý thất bại vì một số lý do nào đó, đồng thời cũng trả về mã lỗi/nguyên nhân gây ra lỗi. Thì cũng giống ngoài đời thực vậy, chúng ta đã hứa một điều gì đó thì sẽ chỉ có 2 kết quả nhận được cùng với lời hứa đó hoặc là lời hứa được thực hiện hoặc là thất hứa.

Quay lại với `Promise` trong javascript. Khi khởi tạo 1 đối tượng `Promise` thì đầu vào sẽ là một function với 2 tham số là `resolve` và `reject`. Chúng ta có thể tuỳ ý đổi tên của 2 tham số để có thể phù hợp hơn với tình huống gặp phải. Một ví dụ như dưới:
```javascript
const give1000dollars = new Promise(function(give, ungive) {
    give(1500); // bonus 500$
    // ungive('Not enough money')
})
```
Khi một đối tượng `Promise` được khởi tạo vào chạy thì tương ứng sẽ có 3 trạng thái lần lượt là `pending`, `fulfilled`, `rejected`. 
* Trạng thái `pending` sẽ được gắn vào khi đối tượng `Promise` đó được khởi tạo và trong quá trình chạy.
* Trạng thái `fulfilled` sẽ được gắn vào khi đối tượng `Promise` đó đã khởi chạy và thành công trả về kết quả.
* Trạng thái `rejected` sẽ được gắn vào khi đối tượng `Promise` đó đã khởi chạy nhưng thất bại vì một lý do nào đó đồng thời trả về mã lỗi/nguyên nhân lỗi.

Khi một đối tượng `Promise` xử lý xong (không còn ở trạng thái `pending` nữa mà sẽ là `fulfilled` hoặc là `rejected`) và để chúng ta có thể kiểm tra đối tượng `Promise` vừa chạy là thành công hay thất bại thì chúng ta sẽ dùng `.then`, `.catch`.
* `.then` sẽ nhận một callback function, function này sẽ nhận một tham số. Callback function sẽ được gọi khi đối tượng `Promise` xử lý thành công và kết quả sẽ được đưa vào tham số đầu vào của callback function.
* `.catch` cũng sẽ nhận một callback function, function này cũng sẽ nhận một tham số. Callback function sẽ được gọi khi đối tượng `Promise` xử lý thất bại và tương ứng mã lỗi/nguyên nhân lỗi sẽ được đưa vào tham số đầu vào của callback function.

Một cách nữa để kiếm tra kết quả của một đối tượng `Promise` là dùng `async`, `await`.

`Promise` cũng cung cấp cho chúng ta một số phương thức hữu ích giúp chúng ta tận dụng hết chức năng của nó. Như là `Promise.all`, `Promise.race` dùng để thao tác với nhiều đối tượng `Promise` theo các cách khác biệt. `Promise.resolve`, `Promise.reject` dùng để điều khiển một đối tượng `Promise` thành công trả về kết quả hay thất bại trả về mã lỗi/nguyên nhân lỗi.

Những cách thức bên trên khá cơ bản và dễ áp dụng. Tiếp đến hãy cùng đi xa hơn cùng `Promise`, hãy thử biển đổi cách sử dụng của một đối tượng `Promise`.
# II. Biến đổi đối tượng Promise
Thì `biến đổi` ở đây có nghĩa là gì? `Biến đổi` một đối tượng `Promise` có nghĩa là chúng ta cơ bản vẫn dùng `Promise` để xử lý những tác vụ bất đồng bộ (tác vụ chờ) bằng những cách thức thông thường, nhưng kèo theo đó chúng ta sẽ kết hợp thêm một số logic để điều khiển đối tượng `Promise` đó.

Nghe `Biến đổi` có vẻ cao siêu, nhưng thực chất chúng ta sẽ chỉ đơn giản kết hợp `Promise`với một số tính năng khác của javascript để sinh ra một kết hợp có nhiều chức năng hơn và mang lại hiệu quả hơn.

Ở bài này mục đích của chúng ta sẽ là dùng `Promise` và `callback` để tạo ra một kết hợp.

Trong quá trình làm việc với javascript chúng ta thao tác rất nhiều với `callback`, chúng ta dùng `callback` rất nhiều và thậm chí những thư viện bên thứ ba cũng dựa vào `callback` để cung cấp cho chúng ta nhiều tuỳ biển hơn khi sử dụng thư viện của họ.

Đến với một ví dụ về load image. Đầu tiên thì việc load image sẽ cần một khoảng thời gian vì thế hãy xác định nó là một xử lý chờ (vì khi load xong chúng ta cẩn phải làm gì đó với nó nữa).
```javascript
// Dùng để load image từ đầu vào và thêm vào thẻ `body`
function loadImage(imageSrc, callback) {
    // Tạo thẻ `img` mới dùng để chứa image chuẩn bị load lên
    const image = document.createElement('img')
    image.src = imageSrc // Gán `imageSrc` để bắt đầu load image
    
    image.onload = () => callback(null, image) // Xử lý khi load thành công
    image.onerror = () => callback(new Error('Load script error')) // xử lý khi load gặp lỗi
    
    // Thêm image vừa load vào thẻ `body` dù lỗi hay không lỗi.
    document.body.append(image)
}
```

Ở trên là một function `loadImage` đơn giản dùng để load 1 image sau đó thêm vào trong thẻ `body` của file html. Function này sẽ nhận 2 tham số:
* `src` là source của image muốn load
* `callback` là function dùng để gọi sau khi image được load hoặc khi có lỗi.

Tiếp theo hãy cũng đưa `Promise` vào trong để xử lý.
```javascript
// Dùng để load image từ đầu vào và thêm vào thẻ `body`
function loadImage(imageSrc, callback) {
    // Tạo thẻ `img` mới dùng để chứa image chuẩn bị load lên
    const image = document.createElement('img')
    image.src = imageSrc // Gán `imageSrc` để bắt đầu load image
    
    image.onload = () => callback(null, image) // Xử lý khi load thành công
    image.onerror = () => callback(new Error('Load script error')) // xử lý khi load gặp lỗi
    
    // Thêm image vừa load vào thẻ `body` dù lỗi hay không lỗi.
    document.body.append(image)
}

// Dùng `Promise` để tạo một xử lý chờ load image
function loadImageUsingPromise(imageSrc) {
    // `resolve`, `reject` sẽ được gọi ở `callback` của function `loadImage`
  return new Promise(function (resolve, reject) {
    // Gọi function `loadImage` để bắt đầu load image
    loadImage(imageSrc, function (error, image){
      if (error) reject(error)
      resolve(image)
    })
  })
}

// Gọi function `loadImageUsingPromise` để bắt đầu load image
// Sau đó tương ứng dùng `.then`, `.catch` để bắt phần xử lý thành công hay thất bại
loadImageUsingPromise('aaa')
  .then(image => console.log(image))
  .catch(error => console.log(error))
```
Ở đoạn code trên chúng ta đã tạo một function `loadImageUsingPromise` cho phép nhận một tham số đầu vào là  `imageSrc` và sau đó khởi tạo và chạy một đối tượng `Promise` để gọi function `loadImage` xử lý load image tương ứng với `imageSrc`. Sau đó sẽ trả về thẻ `img` được load thành công hoặc trả về lỗi.

Ở đây tham số đầu vào `callback` của function `loadImage` sẽ được xử lý ngay trong phần xử lý của đối tượng `Promise` để chúng ta có thể nhận được function `resolve` và `reject` dùng cho xử lý thành công, thất bại trong việc load image.

Tiếp đến hãy thử cho phép function `loadImageUsingPromise`  được tạo tuỳ biến. Những functon xử lý như `loadImage`, `loadFile`, `loadSource` sẽ là đầu vào. Chúng ta sẽ tạo nhiều xử lý khác nữa chứ không đơn thuần là `loadImage`.
```javascript
// Dùng để load image từ đầu vào và thêm vào thẻ `body`
function loadImage(imageSrc, callback) {
    // Tạo thẻ `img` mới dùng để chứa image chuẩn bị load lên
    const image = document.createElement('img')
    image.src = imageSrc // Gán `imageSrc` để bắt đầu load image
    
    image.onload = () => callback(null, image) // Xử lý khi load thành công
    image.onerror = () => callback(new Error('Load script error')) // xử lý khi load gặp lỗi
    
    // Thêm image vừa load vào thẻ `body` dù lỗi hay không lỗi.
    document.body.append(image)
}

// TẠM ẨN function `loadImageUsingPromise` này và sẽ dùng function `promisify` để tạo
// Dùng `Promise` để tạo một xử lý chờ load image
// function loadImageUsingPromise(imageSrc) {
//    // `resolve`, `reject` sẽ được gọi ở `callback` của function `loadImage`
//  return new Promise(function (resolve, reject) {
//    // Gọi function `loadImage` để bắt đầu load image
//    loadImage(imageSrc, function (error, image){
//      if (error) reject(error)
//      resolve(image)
//    })
//  })
//}

// Tạo một function gắn với xử lý function đầu vào `func`
// Function sau khi được tạo sẽ dùng `Promise` để xử lý cho function đầu vào `func`
function promisify(func) {
  // Ở ví dụ load image thì function này sẽ là `loadImageUsingPromise`
  return function (...args) {
    // Logic trong function sẽ gần giống như function `loadImageUsingPromise`
    // Khác ở phần gọi xử lý `func` hay chính là `loadImage`
    // Vì `func` ở đây có thể là bất kỳ xử lý gì như là `loadFile`, `loadSource`, ...
    return new Promise(function(resolve, reject) {
      function callback(error, result) {
        if (error) reject(error)
        resolve(result)
      }

      func.call(null, ...args, callback)
    })
  }
}

// Tạo function `loadImageUsingPromise`
// Giống như function `loadImageUsingPromise` đã được ẩn đi
const loadImageUsingPromise = promisify(loadImage)

// Gọi function `loadImageUsingPromise` để bắt đầu load image
// Sau đó tương ứng dùng `.then`, `.catch` để bắt phần xử lý thành công hay thất bại
loadImageUsingPromise('aaa')
  .then(image => console.log(image))
  .catch(error => console.log(error))
```

Rất thú vị đúng không nào. Bây giờ với function `promisify` chúng ta có thể tạo function trung gian cho rất nhiều xử lý khác nữa chứ không đơn thuần là function `loadImage`.
# III. Kết luận
Vậy là chúng ta đã đi qua về cách `biến đổi` đổi một đối tượng `Promise`, hay còn có thể nói là kết hợp `Promise` với những tính năng khác để tăng hiệu quả trong xử lý tình huống. Sẽ còn rất nhiều cách kết hợp khác nữa chứ không chỉ là `Promise` kết hợp với `callback`. Có thể là tính năng A kết hợp với tính năng B, C, ... Và độ phức tạp cũng sẽ tăng lên, nhưng bên cạnh đó thì lợi ích của sự kết hợp mang lại sẽ rất lớn.

Bài viết của mình đến đây là hết rồi. Cảm ơn mọi người đã đón đọc. Hy vọng nó sẽ mang lại lợi ích dù lớn hay nhỏ cho tất cả chúng ta. Còn bây giờ thì xin chào và hẹn gặp lại các bạn trong những bài viết tiếp theo.