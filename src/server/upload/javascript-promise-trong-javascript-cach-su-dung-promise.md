**Promise** được sử dụng để xử lý các hoạt động bất đồng bộ trong JavaScript. Chúng dễ quản lý khi xử lý nhiều hoạt động bất đồng bộ trong đó các lệnh callback có thể tạo **callback-hell** lại dẫn đến code không thể quản lý được.

Trước khi có Promise event, callback function đã được sử dụng nhiều nhưng chúng có các chức năng hạn chế và tạo ra mã code không thể quản lý được.
Nhiều callback function lồng nhau sẽ tạo ra **callback hell** dẫn đến code không thể quản lý được.
Các events không xử lý tốt các hoạt động bất đồng bộ.
```
firstFunction(args, function() {
  secondFunction(args, function() {
    thirdFunction(args, function() {
      // And so on…
    });
  });
});
```

**Promise** là sự lựa chọn lý tưởng để xử lý các hoạt động bất đồng bộ một cách đơn giản nhất. Chúng có thể xử lý nhiều hoạt động bất đồng bộ một cách dễ dàng và cung cấp khả năng xử lý lỗi tốt hơn các *callbacks function* và *events*.

* Các lợi ích của **Promises**:
    1. Giúp callback function trở nên rỏ ràng hơn
    2. Xử lý tốt các hoạt bất đồng bộ 
    3. Định nghĩa tốt hơn các luồng xử lý trong các hoạt động bất đồng bộ 
    4. Quản lý các lỗi một các tốt hơn

* Các trạng thái của **Promises**:
    1. **fulfilled**: các xử lý liên quan khi promise đã thành công
    2. **rejected**:  các xử lý liên quan khi promise đã thất bại
    3. **pending**: Promise đang chờ xử lý, tức là không có fulfilled hoặc rejected trã về
    4. **settled**: Promise đã thực hiện fulfilled hoặc rejected

* Một **Promise**  có thể được khỏi tạo bởi **Promise constructor**
    ```
    var promise = new Promise(function(resolve, reject){
         //do something
    });
    ```
 *  **Parameters**
       * Hàm tạo Promise chỉ nhận một đối số là một callback function.
       * Callback function nhận hai đối số, resolve và reject.
       * Thực hiện các thao tác bên trong callback function và nếu mọi thứ suôn sẻ thì hãy gọi resolve.
       * Nếu các hoạt động mong muốn xảy ra lỗi thì hãy gọi reject.
     
    **Đây là 1 ví dụ:**
    ```
    var promise = new Promise(function(resolve, reject) { 
      const a = 'Okay'; 
      const b = 'Okay'
      if(a === b) { 
        resolve(); 
      } else { 
        reject(); 
      } 
    }); 

    promise. 
        then(function () { 
            console.log('Success.'); 
        }). 
        catch(function () { 
            console.log('Failed.'); 
        }); 
    ```

    **Output**
    ```
    Success.
    ```

* **Promise** được dùng như thế nào?
    Promise có thể được sử dụng bằng cách sử dụng phương thức .then và .catch.

     **1. then()**
    
    - then() được gọi khi promise trả về resolved hoặc rejected.
    
      **Parameters:**
    
      Phương thức .then() nhận hai hàm làm tham số.
    
      * Hàm đầu tiên được thực thi nếu promise được giải quyết và nhận được kết quả.    
      * Hàm thứ hai được thực thi nếu promise bị rejected và nhận được lỗi. *(Có một cách tốt hơn để sửa lỗi bằng cách sử dụng phương thức .catch() )* 
    
      **Về cú pháp:**
    
        ```
            .then(function(result){
                    //handle success
                }, function(error){
                    //handle error
                })
       ```
   
      **Ví dụ Promise Rejected:**
    
        ```
              var promise = new Promise(function(resolve, reject) { 
                  resolve('Handle success.'); 
              }) 

              promise 
                  .then(function(successMessage) { 
                      //success handler function is invoked 
                      console.log(successMessage); 
                  }, function(errorMessage) { 
                      console.log(errorMessage); 
                  })
        ```
    
      **Output**
        ```
            Handle success.
        ```
   
         **Ví dụ Promise Rejected:**

        ```
              var promise = new Promise(function(resolve, reject) { 
                  reject('Handle error.'); 
              }) 

              promise 
                  .then(function(successMessage) { 
                      console.log(successMessage); 
                  }, function(errorMessage) {
                      //error handler function is invoked 
                      console.log(errorMessage); 
                  })
        ```

        **Output**
        ```
            Handle error.
        ```
       
    **2. catch()**
    
    - *catch()* được gọi khi promise reject hoặc có lỗi xảy ra khi thực thi.
    
      **Parameters:**

        catch() nhận một function làm tham số. Đó là function xử lý lỗi hoặc là một promise reject.

        **Cú pháp thực thi:**
        ```
            .catch(function(error) {
                // Handler error
            })
        ```

        **Ví dụ về Promise Rejected**
        ```
             var promise = new Promise(function(resolve, reject) { 
                  reject('Promise Rejected.'); 
              }) 

              promise 
                  .then(function(successMessage) { 
                      console.log(successMessage); 
                  }, function(errorMessage) {
                      //error handler function is invoked 
                      console.log(errorMessage); 
                  })
        ```

        **Output**
        ```
            Promise Rejected.
        ```

       **Hay là:**
        ```
             var promise = new Promise(function(resolve, reject) { 
                  throw new Error('Some error has occured.')
              }) 

              promise 
                  .then(function(successMessage) { 
                      console.log(successMessage); 
                  }, function(errorMessage) {
                      //error handler function is invoked 
                      console.log(errorMessage); 
                  })
        ```

        **Output**
        ```
            Some error has occured.
        ```
    
**Vậy Promise được ứng dụng như thế nào?**
- Đó là khi bạn muốn xử lý các event bất đồng bộ.
- Là một giải pháp tốt để tránh **callback hell**.