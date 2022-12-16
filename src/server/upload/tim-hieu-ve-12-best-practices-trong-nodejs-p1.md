Dù tuổi đời chỉ hơn 11 năm nhưng Node.js trở thành một trong những web frameworks được sử dụng phổ biến nhất trong thập kỉ. Node.js hiện nay được sử dụng rất đa dạng với những tính năng, ưu điểm của nó. Bài viết sẽ tìm hiểu về một số cách để sử dụng Node.js một cách hiệu quả nhất. Bài viết sẽ không giới thiệu về Node.js nữa mà hướng đến đối tượng các lập trình viên đã sử dụng nó trước đó nên mình sẽ bỏ qua phần giới thiệu sơ lược và đi thẳng đến các cách sử dụng luôn. Để tìm hiểu về nó có thể tham khảo thêm các link tại đây <br>
- https://nodejs.dev/learn <br>
- https://nodejs.org/en/ <br>

Note: bài viết sẽ dùng từ viết tắt BP tương ứng với Best Practice <br>
## Best Practice 1: Take a Layered Approach
Package rất nổi tiếng của Node.js là Express.js cho phép ta định nghĩa các route như một callback funtion khi client nhận một request. Với sự tiện lợi cũng như tính mềm dẻo của nó thì chúng ta rất dễ dàng định nghĩa các funtion này. Tuy nhiên, nó cũng sẽ dễ dàng dẫn đến việc implement các logic phức tạp trong các hàm này, dẫn đến việc hàm bị phình to ra, khó bảo trì và đặc biệt là khó khăn trong việc viết test. Do đó, ở BP này khi tuân theo, chúng ta nên chia các module khác nhau thực hiện các công việc khác nhau trong ứng dụng của. Thông thường, luông chính thường là: <br>
```
Client request ➡️ Some business logic + some data(base) manipulation ➡️ Returning the response
```
Dựa vào đây ta có thể chia ứng dụng thành 3 layer chính như hình dưới đây: <br>
![](https://images.viblo.asia/4de8f5b2-4747-4a7c-a953-476a709b6eb1.png)
- Controller (cho API routes và endpoints)
- Service layer (Cho các logic nghiệp vụ)
- Data access layer (phục vụ cho việc làm việc với database) <br>
### Controller
Phần này sẽ có nhiệm vụ là nơi API routes sẽ được định nghĩa, và chỉ được khai báo các API routes. Trong các route function, ta sẽ thực hiện lấy các data và truyền chúng xuống tầng service để xử lý.
### Service 
Phần này sẽ là nơi thực hiện các logic nghiệp vụ. Nó sẽ chứa các class, method thực hiện các nhiệm vụ khác nhau của ứng dụng (có thể follow SOLID principles). Tầng này sẽ tách rời những logic xử lý nghiệp vụ với các phần routes mà ta đã khai báo.
### Data access layer
Đây là nơi xử lý các tác vụ liên quan đến database như lấy dữ liệu, ghi dữ liệu hoặc update dữ liệu vào database. Tất cả những câu query SQL, thực hiện connect với database, ORM... sẽ được khai báo ở tầng này.
## Best Practice 2: Folder structure
Ở BP trước chúng ta tìm hiểu về cách chia logic code thành các module riêng biệt với các layer khác nhau để tách biệt riêng từng phần ra. Ở phần này chúng ta sẽ tìm hiểu việc chia folder sao cho hợp lý với từng module trong từng folder khác nhau. Dưới đây là common folder của dự án khi setup với Node.js project
![](https://images.viblo.asia/8563cfbe-36c4-418f-b93c-da230e1c779b.png)
Như hình trên đã mô tả, các folder /API (controller layer), /services và /models (data access layer) sẽ tương ứng với 3 layer mà chúng ta đã tìm hiểu ở trên. Tại folder /scripts sẽ được dùng để lưu các scripts build tự động như deploy,... Folder /test sẽ được sử dụng để lưu các đoạn code test của dự án. Chúng ta sẽ tìm hiểu về các folder /config và /subscriber ở mục sau. <br>
Là một developer thì chúng ta nên chia code theo các folder sao cho hợp lý nhất để code dự án sẽ được sáng sủa và dễ dàng cho việc bảo trì sau này. <br>
## Best Practice 3: Publisher Subscriber Models
Đây là một model rất phổ biến trong việc trao đổi data với nhau, trong trường hợp chúng ta có 2 thực thể liên quan là publisher và subscriber. Publisher (là người gửi message) sẽ gửi message tới các channel mà không cần quan tâm đến thực thể nào nhận message đó. Trong khi đó Subscriber (người nhận message) sẽ quan tâm đến các thực thể này. Chúng ta sẽ đi vào ví dụ sau để hiểu hơn về model này <br>
Ví dụ, trong ứng dụng của ta, khi thực hiện việc sign up cho user, chúng ta sẽ thực hiện một loạt các hành động nhuw: tạo một bản ghi user cho database, sinh ra authorization key, gửi email confirm và có thể nhiều hành động khác nữa. Nếu tất cả những điều này được thực hiện vởi một function service sẽ dẫn đến việc bị phình to và khó bảo trì cũng như test. Ví dụ như đoạn code dưới đây <br>
``` javascript
    export default class UserService() {		

      async function signup(user) {

        // 1. Tạo bản ghi user
        // 2. Sinh ra auth key
        // 3. Gửi email confirmation
        // ...  

      }
      
    }
```
Chúng ta có thể thực hiện việc đơn giản hóa module trên bằng cách sử dụng pub/sub model trong Node.js. Pattern này có thể được setup bằng cách sử dụng Event API như sau: <br>
``` javascript
      var events = require('events');
      var eventEmitter = new events.EventEmitter();		

      export default class UserService() {

        async function signup(user) {
          // emit 'signup' event
          eventEmitter.emit('signup', user.data)
        }

      }
```
Để handle event, chúng ta có thể có rất nhiều các subscriber khác nhau như là một event listerner. Các subscriber này có thể được tổ chức trong các file riêng biệt khác nhau tùy thuộc vào mục đích sử dụng và lưu vào trong thư mục /subscriber <br>
``` javascript
    // email.js

    // ...

    eventEmitter.on('signup', async ({ data }) => {  // event listener 
      // send email 
    })

    // ...
```
``` javascript
    // auth.js

    // ...

    eventEmitter.on('signup', async ({ data }) => {	// event listener
      // generate auth key
    })

    // ...
```
## Best Practice 4: Clean Code & Easy Readability
BP này đề cập đến việc fomat code sao cho dễ đọc và sử dụng comment một cách hợp lý <br>
### Linting & Formatting
Ta có thể sự dụng các linter phổ biến của javascript như ESLint, JSLint hoặc JSHint. Đối với format thì có thể sử dụng Prettier. Các extension này sẽ được dễ dàng cài đặt nếu ta sử dụng IDE code là visual studio code <br>
### Style Guides
Bên cạnh đó thì chúng ta có thể quan tâm đến việc coding style theo chuẩn của các công ti lớn như [Google](https://google.github.io/styleguide/jsguide.html) hoặc [Airbnb](https://github.com/airbnb/javascript) Các chuẩn này đề cập đến các coding covention như đặt tên biến, files, classs, format code... sẽ giúp ta code một cách sáng sủa nhất <br>
![](https://images.viblo.asia/71d19069-c2a8-4335-80dd-8a05f135a045.png)
Khi viết code thì việc thêm các comment với những đoạn code khó hiểu cũng là một cách để giúp cho code dễ đọc hơn với người khác. Với việc viết API thì việc viết document là việc gần như bắt buộc và một tool hữu ích để giúp trong việc này là [JSDoc](https://jsdoc.app/)
## Best Practice 5: Viết các đoạn code bất đồng bộ
Sử dụng Promises và async, await để tránh các callback hell như sau: <br>
``` javascript
    <script>
        function get_data() {
            $.get('https://url.com/one', () => {
                $.get('https://url.com/two', () => {
                    $.get('https://url.com/three', (res) => {
                        console.log(res)
                    })
                })
            })
        }
    </script>
```
Viết với async, await: <br>
``` javascript
    <script>
        async function get_data() { // async function
            await $.get('https://url.com/one')
            await $.get('https://url.com/two')
            let res = await $.get('https://url.com/three')
            console.log(res)
        }
    </script>
```
Có thể tìm hiểu sâu hơn về việc viết các đoạn code bất đồng bộ tại bài viết [này](https://scoutapm.com/blog/async-javascript) <br>
## Best Practice 6: Config các files và biến môi trường
Khi app mở rộng và phình to ra thì các biến config và file sẽ được sử dụng ở nhiều chỗ dẫn đến khó kiểm soát, đây là lúc chúng ta sẽ cần phải config các file và biến này vào một chỗ để khi sửa đổi sẽ được thực hiện một cách dễ dàng hơn. Chúng ta có thể config như file dưới đây <br>
``` javascript
    /config			
        ├── index.js
        ├── module1.js		 
        └── module2.js	
```
Các file config này có thể bao gồm các API keys, data connection URL... và có thể chứa trong một file .env <br>
```
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=my_password_123
```
Trong Node.js ta có thể quản lý việc này bằng cách sử dụng package [dotenv](https://www.npmjs.com/package/dotenv) Khi sử dụng có thể dễ dàng sử dụng như đoạn code dưới đây <br>
``` javascript
    // app.js

    require('dotenv').config()      

    console.log(process.env.DB_HOST) 
    console.log(process.env.DB_USER)
```
Có thể sử dụng trong từng file riêng biệt <br>
``` javascript
    // config/database.js

      require('dotenv').config()

      export default {
        host: process.env.DB_HOST,		
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
      }
```

Như vậy bài viết đã tìm hiểu một số phần để giúp viết code Node.js sáng sủa, dễ đọc dễ bảo trì hơn. Ở phần tiếp theo chúng ta sẽ tìm hiểu về các Best Practice còn lại. Hi vọng bài viết giúp ích cho mọi người. See you! <br>