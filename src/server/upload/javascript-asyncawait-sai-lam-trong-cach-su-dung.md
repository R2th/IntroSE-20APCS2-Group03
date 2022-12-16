Bạn đã sử dụng Async / await như thế nào kể từ khi được giới thiệu bới ES7? Hay là code chạy thành công là xem như là thoả mãn? Chúng ta cũng đi một vài ví dụ để thấy có thể bạn đã mắc sai lầm trong khi sử dụng Async / await trong code của bạn? 
## 1 - Async / await là gì?
Async / await được giới thiệu bởi ES7 là một cải tiến từ promise mang đến điều tuyệt vời trong Asynchronous programming với JavaScript. Nó cung cấp cho các developer js viết mã đồng bộ (synchronous) trên những chức năng không đồng bộ (asynchonous), mà không làm gián đoạn code của chính mình. Tuy nhiên không hẳn những developer nào cũng có thể sử dụng chúng một cách hiệu quả và sâu hơn nữa là hiểu cốt lõi của việc sử dụng chúng.

 Sau đây trong bài viết này chúng tôi sẽ cùng các bạn khám phá những điều chưa tốt của async / await khi sử dụng sai trường hợp (có thể chúng tôi chưa lường hết được các trường hợp) nhưng mục đích nhằm giúp các developer sử dụng chúng một cách hiệu quả và chính xác khí sử dụng async/await.
##  2 - Ví dụ sai lầm khi sử dụng Async / await. 
Ví dụ 1:
```
const catIDs = [132, 345, 243, 121, 423]; // id array.
```
Nhiệm vụ của coder tìm ra chủ nhân của của chú mèo thông qua catIDs trên. 

Rất đơn giản, nhưng chúng ta chỉ nói đến async/await thôi 
Chúng ta có thể bị cám dỗ hay theo thói quen để làm một cái gì đó giống như thế này:
```
async function fetchOwners(catIDs) {
    const owners = [];
    for (const id of catIDs) {
        const cat = await fetchCat(id);// get detail object Cat
        const owner = await fetchOwner(cat.ownerID); //find owner via ownerID
        owners.push(owner);
    }
    return owners;
}
```
Điều gì gây sai lầm code ở trên Chúng tôi chạy code này và tất cả dường như đang hoạt động tốt, không sinh ra bug.

 Nhưng ở đây có một vấn đề khi cách sử dụng async/await trên cách làm trên. Vấn đề chính là sử dụng async/awai trong for ... loop. Cụ thể .push trong loop for nó thật sự mang đến vấn đề. Bởi vì await trong for-loop đang tìm kiếm đồng bộ (synchronous-looking) fetchOwners một cách tuần tự. Nghĩa là chúng ta đang tìm kiếm tuần tự, tìm owner với id này xong, lại tìm kiếm owner khác với id khác và có thê sử dụng parallel. Nhưng với async/awai nó giúp ta tìm những owner mà không phụ thuộc vào owner khác và chúng ta nên thay thế bởi map() (chúng ta sẽ nói map() về phần khắc phục sau...). 

Nhưng trong ví dụ trên bạn đang hành động sai hoàn toàn. Mặc dù code ở trên đó hoàn toàn hợp lệ. Nhưng performance của nó thì quá tệ. Tôi nghĩ có rất nhiều devjs vẫn mắc vào những sai lầm đó một cách đáng tiếc. Chúng ta nên làm gì? Đương nhiên dừng lại việc sử dụng await trong for-loop, và đặc biệt là forEach nó sẽ gây ra sai lầm tai hại. 

Trong các code thực tế thì có nhiều cách sử dụng tốt hơn for-loop ngay cả khi nó synchonous trên code của bạn.

Để khắc phục vấn đề trên thì chúng ta nên sử dụng map(). 
Có vẻ như nó thích hợp hơn khi convert array id sang array owner.

Đây là cách chúng tôi sẽ thực hiện bằng cách sử dụng .map() nếu mã được đồng bộ (synchonous).
```
// catIDs -> owners
const owners = catIDs.map(id => {
    const cat = fetchCatSync(id);
    const owner = fetchOwnerSync(cat.ownerID);
    return owner;
});
```
Vì code trên thực sự là synchonous nên chúng ta có thể transform một array ID sang một array promise (cats' owners). Sau đó chúng ta có thể unpack thông qua Promise.all. như sau
```
// catIDs -> ownerPromises -> owners
async function fetchOwners(catIDs) {
    const ownerPromises = catIDs.map(id => {
        return fetchCat(id)
            .then(cat => fetchOwner(cat.ownerID));
    });
    const owners = await Promise.all(ownerPromises);
    return owners;
}
```
Và có thể viết lại code đẹp hơn nếu bạn cảm thấy **.then()** thật sự là nhàm chán =]].
```
async function fetchOwners(catIDs) {
    const ownerPromises = catIDs.map(async id => {
        const cat = await fetchCat(id);
        const owner = await fetchOwner(cat.ownerID);
        return owner;
    });
    const owners = await Promise.all(ownerPromises);
    return owners;
}
```
Tôi nghĩ các bạn nên thay vì đọc xong bài này bỏ đó, thì thay vào đó các bạn thử viết lại và test với console.time() để thấy hiệu quả thế nào? Để giúp bạn chúng tôi có ví dụ tiếp theo 

Ví dụ 2: Chúng ta có đoạn code sau:
```
async getBooksAndAuthor(authorId) {
  const books = await bookModel.fetchAll(); //get object Boonk
  const author = await authorModel.fetch(authorId); // get author via authorId
  return {
    author,
    books: books.filter(book => book.authorId === authorId),
  };
}
```
Function này sẽ get all data thông qua authorId.

Đoạn code trên không hề sai nhưng, nó gặp phải trường hợp như ví dụ 1 là : await bookModel.fetchAll() phải chờ đến khi fetchAll() returns. Thì sau đó await authorModel.fetch(authorId) mới được gọi . Quá lãng phí bởi vì các bạn chú ý rằng authorModel.fetch(authorId) không phụ thuộc kết quả của từng bookModel.fetchAll() trả về mà thay vào đó chúng có thể được gọi parallel trong Promise(). Thay vì việc đó chúng ta có thể viết lại như sau :
```
async getBooksAndAuthor(authorId) {
  const bookPromise = bookModel.fetchAll();
  const authorPromise = authorModel.fetch(authorId);
  const book = await bookPromise;
  const author = await authorPromise;
  return {
    author,
    books: books.filter(book => book.authorId === authorId),
  };
}
```
????? 
## 3 - Kết luận:
Các từ khóa async / await được ES7 giới thiệu chắc chắn là một cải tiến đối với asynchonous programming trong JavaScript. Nó có thể làm cho code của chúng ta dễ đọc và gỡ lỗi hơn. Tuy nhiên, để sử dụng chúng một cách chính xác, người ta phải hoàn toàn hiểu nhiều về Promise(), vì chúng không hơn gì cú pháp, và kỹ thuật cơ bản vẫn Promise() vì thực chất async / await cũng trả vể cho chúng ta một promise() mà thôi. Hy vọng bài đăng này có thể cung cấp cho bạn một số ý tưởng về async / await và có thể giúp bạn ngăn ngừa một số lỗi phổ biến. 

Cảm ơn bạn đã đọc, và nếu bạn thích bài viết này xin hay comment và share chúng cho các devjs khác cùng xem xét vấn đề của họ. 

## Tài liệu tham khảo:
 https://hackernoon.com/javascript-async-await-the-good-part-pitfalls-and-how-to-use-9b759ca21cda

https://medium.com/dailyjs/asynchronous-adventures-in-javascript-async-await-bd2e62f37ffd

https://dev.to/mebble/dont-make-this-asyncawait-mistake-1eao

https://futurestud.io/tutorials/node-js-how-to-run-an-asynchronous-function-in-array-map