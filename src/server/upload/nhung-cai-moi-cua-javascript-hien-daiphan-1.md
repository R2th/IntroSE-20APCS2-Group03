- ECMAScript 2015 (còn được gọi là ES6) là một bản cập nhật lớn cho Javascript kể từ ES5, được chuẩn hóa vào năm 2009. 
- Kể từ đó, Javascript đã đưa ra các bản cập nhật gia tăng hàng năm.
- Các bản cập nhật từ ES6 trở lên thường được gọi là Javascript hiện đại.
-  Hôm nay chúng ta  hãy xem javascript mới có những cái gì? 


## Ký tự
   - Các ký tự  cho phép nhúng các biểu thức vào chuỗi với cú pháp rõ ràng hơn.

   - Các ký tự được bao bởi ký tự backtick thay vì dấu ngoặc kép hoặc đơn.

        ```
        // ES5
        let name = "Yen"
        let msg = "Hello," + " " + name + "." // Hello Yến


        // ES6
        let name = "Yen"
        let msg = `Hello, ${name}.` // 

        ```

## Arrow Functions

- Là một thay thế nhỏ gọn về mặt cú pháp cho một function thông thường. Nó làm cho code của bạn dễ đọc và có cấu trúc hơn.

    ```
    // ES5
    const isEven = function (num) {
     return num % 2 === 0;
    }


    // ES6
    const isEven = num => num % 2 === 0;
    ```

- Ngoài ra, bạn có thể sử dụng Arrow Functions với cái  hàm sau:   **map**, **filter**, **reduce**

    ```
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const odds = nums.filter(n => n % 2 === 1);
    console.log(nums); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    console.log(odds); // [1, 3, 5, 7, 9]
    ```

- Việc xử lý **this** cũng khác ở arrow function  với các hàm thông thường. Ở các hàm thông thường, **this** được đại diện như một object được gọi cho hàm.
- Với arrow function **this** được hiểu là object đã được xác định 

## Default Parameters

   - Nó cho phép các tham số được đặt tên, khởi tạo với các giá trị mặc định nếu không có giá trị nào hoặc undefined

        ```
        // ES5
        function multiply(a, b) {
          b = typeof b !== 'undefined' ? b : 1;
          return a * b;
        }
        console.log(multiply(5, 2)); // 10
        console.log(multiply(5)); // 5
        // ES6
        function multiply(a, b = 1) {
          return a * b;
        }
        console.log(multiply(5, 2)); // 10
        console.log(multiply(5)); // 5
        ```

## Spread (…)

- Nó cho phép một biểu thức có thể lặp lại, chẳng hạn như mảng hoặc chuỗi được mở rộng 

    ### Spread cho function

    ```
        const nums = [1, 3, 2, 7, 5];
        Math.max(nums); // NaN
        // Use spread!
        Math.max(...nums); // 7
    ```

    - Spread(...) đã mở rộngmảng 3 phần tử thành 3 tham số riêng biệt.

    ### Spread cho mảng
    - Tạo một mảng mới bằng cách sử dụng một mảng hiện có.

    ```
    const nums1 = [1, 2, 3];
    const nums2 = [4, 5, 6];
    [...nums1, ...nums2] // [1, 2, 3, 4, 5, 6]
    ```

    ### Spread cho object
    - Sao chép các thuộc tính từ một object này vào một object khác

    ```
    const name = {firstname: "piyush", lastname: "sinha"};
    const fullAddress = {...address, country: "india"};
    // {city: "mumbai", state: "maharashtra", country: "india"}
    const details = {...name, ...fullAddress};
    // {firstname: "piyush", lastname: "sinha", city: "mumbai", state: "maharashtra", country: "india"}
    ```

## Destructuring
- là một cú pháp cho phép tách dữ liệu được lưu trữ bên trong  Objects hoặc Arrays và gán chúng cho các biến riêng biệt.

    ### Array Destructuring

    ```
    const raceResults = ["Jazz", "Ibtesam", "Farhaz", "Kunal"];
    const [gold, silver, bronze] = raceResults;
    gold; // "Jazz"
    silver; // "Ibtesam"
    bronze; // "Farhaz"
    const [fastest, ...everyoneElse] = raceResults;
    fastest; // "Jazz"
    everyoneElse; // ["Ibtesam", "Farhaz", "Kunal"]
    ```

    ### Object Destructuring
    - cho phép chúng ta gán property value của một object cho các biến tương ứng

    ```
    const runner = {
      first: "Piyush",
      last: "Sinha", 
      country: "India"
    }
    const {first, last, country} = runner;
    first; // "Piyush"
    last; // "Sinha"
    country; // "India"
    ```

    ### Parameters Destructuring
    -khi chúng ta thực thi một function với các arguments, trên thực tế các arguments đó sẽ được gán cho các parameters được định nghĩa trong function definition

    ```
    const fullName = ({first, last}) => {
     return `${first} ${last}`
    }
    const runner = {
      first: "Piyush",
      last: "Sinha", 
      country: "India"
    }
    fullName(runner); // "Piyush Sinha"
    ```

##  Vòng lặp trong mảng và object

   ### vòng lặp for... of

   - cách tốt và dễ dàng để lặp lại các mảng.

     ```
        const gamers = ["Piyush", "Jazz", "Ibtesam", "Farhaz", "Kunal"];
        for(const player of gamers) {
          console.log(player);
        }
        // Piyush
        // Jazz
        // Ibtesam
        // Farhaz
        // Kunal
        ```

   ### Vòng lặp for…in

   -  cách tốt và dễ dàng để lặp lại tất cả các thuộc tính có thể liệt kê của một đối tượng.
        ```
        const scores = {
          piyush: 80, 
          jazz: 86, 
          ibtesam: 92,
          farhaz: 90, 
          kunal: 88
        }
        for(const score in scores) {
          console.log(scores[score]);
        }
        // 80
        // 86
        // 92
        // 90
        // 88
        ```

## Promises

- Promise là một đối tượng sẽ  được trả về một giá trị trong tương lai.
- Promise là một cơ chế trong JavaScript giúp bạn thực thi các hàmbất đồng bộ mà không rơi vào callback hell hay pyramid of doom, là tình trạng các hàm callback lồng vào nhau ở quá nhiều tầng.

cú pháp:
    ```
    let promise = new Promise(function(resolve, reject) {  
     // do something
    });
    ```
- Hàm khởi tạo chỉ nhận một đối số là hàm callback. Hàm callback nhận hai đối số, resolve, reject. Khi chạy hàm sẽ thu được kết quả, dù sớm hay muộn

- *resolve*(value):  nếu hàm kết thúc thành công, sẽ trả về  giá trị 
- *reject*(error):  nếu một lỗi xảy ra, sẽ trả về đối tượng lỗi.

**Promise**  được trả về bởi phương thức khởi tạo  **new Promise **có các thuộc tính nội bộ sau:

1. khởi tạo state- ban đầu là pending sau đó chuyển thành resolve(khi thành công và trả về giá trị), *reject* khi call thất bại
2. result(kết qủa) — ban đầu undefined, sau giá trị thay đổi khi call thành công *resolve* và lỗi *reject* khi call thất bại

    ```
    const fakeRequestPromise = (url) => {
      return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random()*(4500)) + 500;
        setTimeout(() => {
          if(delay>4000) {
            reject("Connection Timeout!");
          } else {
            resolve(`Here is your fake data from ${url}`);
          }
        }, delay)
      })
    }
    ```

- Tôi  sử dụng độ trễ ngẫu nhiên bằng setTimeout () để yêu cầu API  trả về thành công hay thất bại.
- Nếu delay lớn hơn 4000 thì reject("Connection Timeout!");
- Và nếu delay nhỏ hơn 4000 thì sẽ trả về giá trị resolve(`Here is your fake data from ${url}`);
- Khi promise ở trạng thái resolved, một hành động .then và .catch

    ```
    const request = fakeRequestPromise("www.viblo.asia");
    request
       .then(() => {
          console.log("Promise Resolved");
          console.log("IT WORKED !!!");
       })
       .catch(() => {
          console.log("Promise Rejected");
          console.log("OH NO, ERROR !!!");
       })
    ```

- Promise là lựa chọn lý tưởng để xử lý các hàm bất đồng bộ một cách đơn giản nhất. Chúng có thể xử lý nhiều hàm bất đồng bộ một cách dễ dàng và cung cấp khả năng xử lý lỗi tốt hơn so với callback 

## Kết luận:
- Còn rất nhiều javascript hiện đại, tôi sẽ giới thiệu ở những bài tiếp theo. cảm ơn các bạn đã đọc

**References**
  -  https://javascript.info/
  - https://dev.to/sinhapiyush/modern-javascript-1jk3