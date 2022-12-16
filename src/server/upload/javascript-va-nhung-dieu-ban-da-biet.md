JavaScript là ngôn ngữ quá đỗi quen thuộc với chúng ta. Bài viết này mình sẽ không nêu những lý thuyết ví dụ như javaScript là gì bla bla..(cái này bạn nào muốn đọc thì có thể google ra 1 núi ạ :D ) mình chỉ viết ngắn gọn những điều bạn cần phải biết về JavaScript dựa theo kinh nghiệm bản thân mình đúc kết và định nghĩa theo "ngôn ngữ bình dân của mình" :D. 
JavaScript không chỉ làm được trên Frontend (một số framework frontend phổ biến hiện nay: ReactJS, VueJS,...) mà còn làm được cả Backend (Nodejs). Bạn thấy JavaScript lợi hại đúng ko nào :smiley: . Dưới đây mình sẽ liệt kê một số khái niệm mà 1 người JavaScript cần phải nắm và hiểu được nó. Let's go :D

## 1. Đồng bộ (Synchronous) và Bất đồng bộ (Asynchronous) là gì ?
- **Đồng bộ  (Synchronous)** : tức là bạn có 3 công việc "Đánh răng", "Ăn sáng", "Đi học" . Khi đó bạn làm việc "Đánh răng " hoàn thành xong,  bạn mới bạn tay vào làm việc "Ăn sáng", và bạn hoàn tất việc "Ăn sáng" mới bắt tay vào việc "Đi học". Để map với code trong JavaScript thì mình có đoạn code như sau: 
```
console.log("Đánh răng");
console.log("Ăn sáng");
console.log("Đi học");
```
Kết quả trả về theo đúng thứ tự :
```
Đánh răng
Ăn sáng
Đi học
```
- **Bất đồng bộ (Asynchronous)**: tức là bạn có 3 công việc "Đi chợ", "Luộc trứng", "Quét nhà". Khi bạn làm xong việc "Đi chợ" thì đáng lẽ bạn sẽ bắt tay vào việc "Nấu ăn", nhưng bạn nhận thấy việc "Nấu ăn" tốn quá nhiều thời gian để chờ xong để tiết kiệm thời gian thì bạn đi " Quét nhà" luôn đỡ bị má quánh :D nên việc "luộc trứng" để đó, rồi bạn đi thực hiện công việc "Quét nhà" chứ ko chờ trứng luộc chín mới quét nhà, sau khi quét nhà xong bạn "luộc trứng" lúc đó đợi trứng chín vắt chân lên coi tivi trong lúc chờ trứng chín thôi, ko sợ má la rồi nè. :D

   => Vậy trong Javascript xảy ra bất đồng bộ khi thực hiện những tác vụ tốn nhiều thời gian như:  request API đợi API trả về data (tốn 2 phút) , hay khi dùng hàm setTimeout, Ajax, ....những tác vụ này giống như công việc "Luộc trứng" mình ví dụ phía trên vậy đó.
   
```
console.log("Đi chợ");
function cookingEgg() {
  alert('Luộc trứng');
}
setTimeout(cookingEgg, 1000);
console.log("Quét nhà");
```
   Kết quả trả về như sau:
 ```
Đi chợ
Quét nhà
Luộc trứng
```

  Trong quá trình bạn làm việc với JavaScript thì **đồng bộ**   (Synchronous) và **bất đồng bộ**  (Asynchronous) sẽ chắc chắn có xảy ra.  Đọc tới đây các bạn sẽ thắc mắc là " nếu trong JavaScript xảy ra sự bất đồng bộ như vậy thì khi cần dữ liệu từ API trả về để lấy data đó xử lý những việc tiếp theo thì sao? ".  Ví dụ trường hợp dưới đây thì giải quyết như thế nào ?
  
  ```
      // ví dụ lệnh bạn gọi api load list data user
       var dataList =  axios.post('/api/ApiListUser/getList')
       
       // sau đó bạn xem dataList 
         console.log('result:', dataList)
  ```
  
  Đoán xem kết quả trả về là gì nào ? :))))
  Lúc này đợi phản hồi khi request API vô database để lấy data user trả về cho mình tốn khá lâu, và sự bất đồng bộ trong JavaScript xảy ra, nó sẽ ko đợi data trả về mà nó nhảy vô luôn câu lệnh console và ....dĩ nhiên nó ko hiểu dataList là gì để log ra rồi :D
  
  => Đây là lúc 3 thằng (phổ biến nhất)  xử lý sự bất đồng bộ đưa những câu lệnh đúng thứ tự theo ý muốn của mình mà không nhảy tùm lum như ví vụ phía trên trong JavaScript ra đời: 
  - Callback.
  - Promise.
  - Async/await.
  
  Chuyện gì cũng có cách giải quyết mà đúng ko nào các bạn :D
  
## 2. JavaScript thực thi các tác vụ như thế nào ?

   JavaScript là ngôn ngữ đơn luồng (single thread) - tức là tại thời điểm chỉ xử lý 1 việc. Nếu vậy thì khi có 1 tác vụ tốn thời gian 30 phút, 1 tiếng, hay thậm chí hơn 1 tiếng vì thì phải chờ cho tác vụ này chạy xong à, lúc đó trình duyệt sẽ đơ và block luôn rồi :))).
   Vậy tại sao JavaScript có thể xảy ra được sự bất đồng bộ?  Vậy cơ chế hoạt động của JavaScript như thế nào? Mình cũng tìm hiểu nhé ! 

![](https://images.viblo.asia/e3883bda-6adc-41f7-a869-5852b4b25d22.gif)


   JavaScript đã giới thiệu nó là một ngôn ngữ đơn luồng, cũng có nghĩa là nó chỉ có một Call Stack và một lúc chỉ làm một việc thôi.
   
  **Call Stack** : là một cấu trúc dữ liệu dạng ngăn xếp (stack) dùng để chứa thông tin về hoạt động của chương trình máy tính trong lúc thực thi, nếu các tác vụ tốn nhiều thời gian (call api, ajax, setTimeout, callback, ...) thì các lệnh này sẽ được đưa vào vùng gọi là WebAPIs.
  
  **WebAPIs** : là nơi chứa cái tác vụ như : call api, ajax, setTimeout, callback, ... mình đã nói trên.
  
  **Callback Queue**: Các hàm, tác vụ (all api, ajax, setTimeout, callback, ... ) sẽ được đưa vào hàng đợi Callback Queue.
  
  **Event Loop**:  có Nhiệm vụ của EL là đợi cho Call Stack rỗng rồi sẽ soi Callback Queue xem có gì không, nếu có thì bốc cái đầu tiên bỏ vào Call Stack để chạy.
  
  
  ## 3. Xử lý bất đồng bộ trong JavaScript bằng Callback, Promise và Async/Await 
Mục đích của việc xử lý bất đồng bộ mình đã nêu rõ phần trên bài viết, nếu quên bạn có thể kéo lên đọc lại nè :D


  ### Callback
   Callback là  function có đối số là function -  là một hàm sẽ được thực hiện sau khi một hàm khác đã thực hiện xong. 
   Ví dụ sử dụng callback. 
   ```
    function doHomework(subject, callback) {
        setTimeout( function(){
            console.log(`Bắt đầu làm bài tập ${subject}.`);
            callback();
        }, 5000);
    }

    function alertFinished(){
        console.log('Làm bài tập xong!');
    }
    doHomework('Toán', alertFinished);
   ```
   Kết quả trả về theo đúng ý mình muốn rồi:
   ```
       // Bắt đầu làm bài tập Toán
        // Làm bài tập xong!
   ```
   
   Tới đây một vấn đề xảy ra là sẽ có lúc function lồng function ( callback lồng vào nhau quá nhiều ) như ví dụ dưới đây : 
   ```
       api.getUser('api/listUser', function(err, user) {
             if (err) throw err
                  api.getPostsOfUser(user, function(err, posts) {
                            if (err) throw err
                                api.getCommentsOfPosts(posts, function(err, comments) {
                                  // vân vân và mây mây...
                    })
              })
    })
   ```
   
   => Trường hợp này gọi là Callback hell và để giải quyết vấn đề này Promise ra đời.
   
   
   ### Promise 
   Promise là một cơ chế trong JavaScript giúp bạn thực thi các tác vụ bất đồng bộ mà không rơi vào callback hell hay pyramid of doom. 
   Promise nhận vào hai tham số
   - Resolve : là hàm sẽ được gọi nếu code bất đồng bộ trong promise chạy thành công.
   - reject: sẽ được gọi nếu code bất đồng bộ trong promise chạy thất bại. 

   Để tạo ra một promise object thì bạn dùng class Promise có sẵn trong trình duyệt như sau:
   
``` 
       api.getUser = function(username) {
      // Hàm api.getUser() trả về một promise object
      return new Promise((resolve, reject) => {
        // Gửi AJAX request
        http.get(`/users/${username}`, (err, result) => {
          // Nếu có lỗi bên trong callback, chúng ta gọi đến hàm `reject()`
          if (err) return reject(err)

          // Ngược lại, dùng `resolve()` để trả dữ liệu về cho `.then()`
          resolve(result)
        })
      })
    }
```

Như vậy api.getUser() sẽ trả về một promise object. Chúng ta có thể truy xuất đến kết quả trả về bằng phương thức .then ().Promise cũng cung cấp 2 phương thức :
       - .then()  :  dùng xử lý sau khi Promise được thực hiện thành công ( khi resolve được gọi ).
       - .catch() :  dùng để xử lý sau khi Promise có bất kỳ lỗi nào đó ( khi reject được gọi ).
       
   ```
       promise()
          .then(() => {
            return 'foo'
          })
          .then(result1 => {
            console.log(result1) // 'foo'
            return anotherPromise()
          })
          .then(result2 => console.log(result2)) // `result2` sẽ là kết quả của anotherPromise()
          .catch(err => {})
   ```
   
   Một lỗi chúng ta hay mắc phải khi mới làm quen với Promise, đó là tạo ra "kim tự tháp" promises như thế này.
   ```
       api
          .getUser('pikalong')
          .then(user => {
            api
              .getPostsOfUser(user)
              .then(posts => {
                api
                  .getCommentsOfPosts(posts)
                  .then(comments => {
                    console.log(comments)
                  })
                  .catch(err => console.log(err))
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
   ```
   
   Lý do vì chúng ta quên mất tính chất liên kết (chaining) của promise, cho phép bên trong hàm resolve có thể trả về một giá trị đồng bộ hoặc một promise khác. Do đó cách giải quyết là:
   ```
       api
          .getUser('pikalong')
          // Trả về một promise
          .then(user => api.getPostsOfUser(user))
          .then(posts => api.getCommentsOfPosts(posts))
          .catch(err => {
            throw err
          })
   ```
   
   Ngoài cách đó ra thì cách được dùng phổ biến và được mọi người sử dụng nhiều nhất trong việc xử lý bất đồng bộ là Async/Await.
   
   
   ### Async/Await
   A sync/await là một cơ chế giúp bạn thực hiện các thao tác bất đồng bộ một cách tuần tự hơn. Async/await vẫn sử dụng Promise ở bên dưới nhưng code của bạn sẽ trong sáng và dễ theo dõi hơn. 
   Để sử dụng, bạn phải khai báo hàm với từ khóa async. Khi đó bên trong hàm bạn có thể dùng await.
   
   ```
       async function() {
      try {
        const user = await api.getUser('pikalong')
        const posts = await api.getPostsOfUser(user)
        const comments = await api.getCommentsOfPosts(posts)

        console.log(comments)
      } catch (err) {
        console.log(err)
      }
    }
   ```
   
   Cần lưu ý là kết quả trả về của async function luôn là một Promise.
   
   ```
       async function hello() {
          return 1
        }

        console.log(hello() instanceof Promise) // true
        hello().then(console.log) // 1
   ```
   
   Về bản chất dùng async/await là chạy ngầm Promise. Tuy async/await ngắn gọn hơn, dễ hiểu nhưng có những trường hợp nên dùng Promise tốt hơn dùng async/await. Ví dụ như sau: 
   
   ```
       async function getABC () {
        let A = await getValueA ( ); // getValueA takes 2 seconds to fisnish
        let B = await getValueB ( ); // getValueB takes 4 seconds to fisnish
        let C = await getValueC ( ); // getValueC takes 3 seconds to fisnish
       return A * B * C;
    }
   ```
   
   Lúc này nên dùng Promise vì các hàm (getValueA, getValueB,..) ko phụ thuộc vào nhau nhưng gắn await thì tốn thời gian chờ. => Dùng Promise.all
   Việc sử dụng Promise.all() sẽ đảm bảo chúng ta có tất cả kết quả của các hàm trước khi thực thi code sau đó ( chúng đều thực hiện song song ko chờ đợi tuần tự )
   Viết lại như sau dùng Promise.all( ): 
   
   ```
       async function getABC () {
       // Promise.all ( ) allows  to sned all request at the same time.
        let  results = await Promise.all ( [ getValueA, getValueB, getValueC ]); 
       return results.reduce(( total, value ) => total * value);
    }
   ```
   
   # Kết luận
   Mong rằng bài viết của mình giúp các bạn hiểu thêm một phần nào đó về JavaScript. Nếu bài viết mình có gì sai sót comment mình phía dưới để mình có thể sửa chữa lỗi lầm của mình. Cảm ơn các bạn. Hẹn gặp lại các bạn trong các bài viết tiếp theo nhé !  <3