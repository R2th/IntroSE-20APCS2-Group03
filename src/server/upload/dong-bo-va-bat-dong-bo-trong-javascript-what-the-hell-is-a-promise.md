![](https://images.viblo.asia/66798d9a-3213-47e0-92a1-84d76d2554c4.gif)


**Lady and gentlemen!**


Chào mừng quý vị đến với bài viết đầu tay của em, và chủ đề của lần gặp gỡ này sẽ là đồng bộ và bất đồng bộ trong Javascript, Promise là cái chi chi?

Như quý vị đã biết và đã thấy, đồng bộ và bất đồng bộ trong Javascript đã là một chủ đề kinh điển, một câu hỏi kinh điển trong những cuộc phỏng vấn, cũng như các cuộc thảo luận trên các diễn đàn. Nhưng nó cũng là thứ làm tiêu tốn rất nhiều thời gian, công sức để hiểu đối với những người mới bắt đầu với Javascript (như em :sweat_smile:). Nhân cũng vì sự ấy, với lượng kiến thức hạn hẹp, em cũng xin đóng góp một bài nhỏ vào kho tàng tài liệu đồ sộ ấy.

## JavaScript is always synchronous and single-threaded

![](https://images.viblo.asia/80222961-a8af-4365-8200-e1d82e0bfdea.png)

Như một cao nhân nào đó đã viết trên stackoverflow, **Javascript là đồng bộ và đơn luồng**, nghĩa là chỉ có duy nhất một code block được thực thi trong một thời điểm, và sẽ thực thi code block tiếp theo khi block trước kết thúc, một cách tuần tự. Điều này có vẻ khá quen thuộc nếu trước đó chúng ta đã tiếp cận C hoặc Java nhỉ?
> That just means that only one operation can be in progress at a time

```
<script> 
    document.write("Hi"); // First 
  
    document.write("Mayukh") ;// Second 
      
    document.write("How are you"); // Third 
</script> 
```

![](https://images.viblo.asia/4cbff6ef-ebaf-4a2b-a845-87d8bb6ae60a.png)

> Qua ví dụ thì đã quá rõ rồi! Dòng write `Hi` sẽ được thực thi trước vì Javascript thức thi từ trên xuống dưới, sau đó dòng write `Mayukh` thực thi khi write `Hi` hoàn thành, tương tự với dòng write `How are you` sẽ thực thi khi write `Mayukh` hoàn thành.

![](https://images.viblo.asia/cca78142-4315-4963-b470-b34daac08202.jpeg)

> Trên đây là một ví dụ tổng quan hơn về thứ tự thực thi của các funtion, đặc biệt đáng nói là ở function C, vì C thì đang gọi E, E thì gọi F, F gọi G, nên G sẽ được thực thi trước, sau đó tới F rồi tới E cuối cùng mới là C, một cách tuần tự và chỉ một luồng duy nhất. Cái này là hàm lồng hàm ấy quý vị, người đời thường gọi là callback funtion đấy ạ (bow)

Nói không phải giấu, chứ trước đây em cũng đã từng nhầm lẫn Js là một ngôn ngữ bất đồng bộ, và em đã phải trả giá trong một lần phỏng vấn :sweat_smile:

Nhưng rồi mọi chuyện không kết thúc đơn giản như vậy, câu hỏi đặt ra là:
> What if you have to make an expensive database request? You don’t want to be twiddling your thumbs while PG and Postgres grab those 800 songs you need for your music library. Synchronous code makes a programmer’s life very difficult, so the JavaScript community developed some great workarounds.

Đại loại là điều gì sẽ xảy ra nếu request từ database một lượng lớn dữ liệu, và chúng ta sẽ phải đi pha một tách cà phê nhâm nhi để đợi lấy 800 bài hát một cách đồng bộ đơn luồng chậm chạp hay sao? Không thể chấp nhận được, một cộng đồng lập trình viên nào đó đã tạo ra một giải pháp tuyệt vời :100:

Và từ đây khi quý vị nghe một ai nói rằng Js là một ngôn ngữ bất đồng bộ, thì ý của họ có thể hiểu là quý vị có thể điều khiển JavaScript để hoạt động theo cách không đồng bộ.

Điều khiển bằng cách nào? Có các solution như sau: Asynchronous Callbacks, Promises và Async/Await

Như tiêu đề bài viết thì có lẽ chúng ta sẽ nói về Promise, các thằng còn lại có thể là phần sau nhỉ?  :sweat_smile:
## Promise

![](https://images.viblo.asia/341d0b54-e7b3-4e15-ba03-0d546a716fca.png)

Đây là lời giới thiệu trên trang hướng dẫn nổi tiếng W3Schools. Và cái tên đã nói lên tất cả!
>"Tôi hứa một kết quả!"
>
>A JavaScript Promise object contains both the producing code and calls to the consuming code

Promise là một cơ chế để xử lý các tác vụ không đồng bộ mà cuối cùng sẽ hoàn thành.  Bằng cách này, quý vị không phải đợi tính toán hoàn tất.  Thay vào đó, quý vị có thể tạo nhiều "lời hứa" để có thể thực hiện các công việc khác nhau và quý vị có thể xử lý kết quả khi chúng hoàn thành.

Vậy "lời hứa" nó trông ra làm sao?

```
let myPromise = new Promise(function(myResolve, myReject) {
// "Producing Code" (May take some time)

  myResolve(); // when successful
  myReject();  // when error
});

// "Consuming Code" (Must wait for a fulfilled Promise)
myPromise.then(
  function(value) { /* code if successful */ },
  function(error) { /* code if some error */ }
);
```
Trên đó là cái khung sườn của "lời hứa", chúng ta cùng đi rõ hơn nào!
###  A successful promise

>Let's start by looking at a simple promise that finishes successfully.

Tưởng tượng quý vị cần gọi hàm để lấy một số articles - `getArticles`

Và đây là một list articles khá nặng, quý vị không muốn chờ đợi vì nó. Quý vị sẽ sử dụng Promise, làm cho function thực thi một cách bất đồng bộ.
```
new Promise((resolve) => resolve(getArticles()));
```

>As you can see, creating a promise is quite easy

Để hoàn thành Promise chúng ta sẽ sử dụng hàm resolve để trả kết quả.
### Adding callbacks

Và rồi chúng ta sẽ làm gì với kết quả?

Để tiếp tục xử lý bất đồng bộ, chúng ta cần một số cách xử lý kết quả.  

Trong câu chuyện trước, chúng tôi đã `getArticles`, nhưng chúng ta đã không làm gì với chúng.  Bây giờ, chúng ta muốn gửi các articles đến một chức năng khác - `populateUi` - để được hiển thị.

```
new Promise((resolve) => resolve(getArticles()))  
  .then(articles => populateUi(articles));
```

![](https://images.viblo.asia/06f192b2-732e-4fc9-b821-8d26755f3f26.gif)

> Để populateUi được dùng, chúng ta sử dụng then - một hàm trên Promise để thêm function callback xử lý dữ liệu.
### Handling errors

Và rồi chúng ta sẽ làm gì với lỗi?

Như chúng ta đã thấy, `resolve` được sử dụng để thực hiện cho các Promise thành công, vậy làm cách nào để chúng ta xử lý lỗi?  Đơn giản!  Thay vì sử dụng `resolve`, chúng ta sử dụng một function được gọi là `reject` cũng có sẵn trong Promise.

```
new Promise((resolve, reject) => {  
  const articles = getArticles();
  articles ? resolve(articles) : reject ("No articles found");
});
```
Như trên, chúng ta `reject` Promise bằng một message trong trường hợp `getArticles()` trả về empty

### Adding callbacks handling errors
![](https://images.viblo.asia/00276c36-7d57-40e5-a5ec-b881dff4d743.gif)

```
new Promise((resolve, reject) => {  
  const articles = getArticles();
  articles ? resolve(articles) : reject ("No articles found");
})
.then(articles => populateUi(articles))
.catch(err => createError(err));
```

Trong trường hợp này, nếu Promise thành công, `then` callback sẽ được sử dụng, nếu Promise `reject` `catch` callback sẽ được gọi đến.

Bài cũng đã dài, mà ý tưởng thì còn nhiều, xin hẹn quý vị vào lần hội ngộ tới!

> Thanks for reading! Cat tax:

Tham khảo: https://www.deadcoderising.com/being-asynchronous-in-javascript-using-promises/


https://medium.com/better-programming/is-javascript-synchronous-or-asynchronous-what-the-hell-is-a-promise-7aa9dd8f3bfb

https://www.geeksforgeeks.org/synchronous-and-asynchronous-in-javascript/