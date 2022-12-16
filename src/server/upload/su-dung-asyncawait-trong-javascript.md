Chào mọi người, ES7 đã ra mắt được 1 thời gian rồi, một trong những chức năng nổi bật mình muốn giới thiệu hôm nay đó là `async`/`await`, chức năng cực kỳ tiện dụng khi dùng callback dựa trên nền tảng promise trước đây.
## Async/await là gì?
Trước tiên cùng tìm hiểu async/await qua những giới thiệu ngắn gọn này nhé:
* Async/await là cách mới để viết code bất đồng bộ. Các phương pháp làm việc với code bất đồng bộ trước đây là sử dụng callback và promise.
* Async/await là khái niệm được xây dựng ở tầng trên promise. Do đó nó không thể sử dụng với callback thuần.
* Async/await cũng giống như promise, là non-blocking.
* Async/await làm cho code bất đồng bộ nhìn và chạy gần giống như code đồng bộ.
## Async
* Khi một hàm async được gọi là nó trả về một lời hứa.
* Khi hàm async trả về một giá trị, lời hứa ban đầu sẽ được giải quyết với giá trị trả về.
* Khi hàm async ném một giá trị lỗi, lời hứa ban đầu sẽ bị từ chối với giá trị đó.
```
async function name([param[, param[, ... param]]]) {
   statements
}
```
## Await
* Khi được đặt trước một Promise, nó sẽ đợi cho đến khi Promise kết thúc và trả về kết quả.
* Await chỉ làm việc với Promises, nó không hoạt động với callbacks.
* Await chỉ có thể được sử dụng bên trong các function async.
```
async function asyncFunction() {
  var y = await 20;
  console.log(y); // 20
}
asyncFunction();
```
## Ví dụ về async/await
```
const axios = require('axios'); // promised based requests - like fetch()

function getCoffee() {
  return new Promise(resolve => {
    setTimeout(() => resolve(Coffe'), 2000); // it takes 2 seconds to make coffee
  });
}

async function asyncFunction() {
  try {
    // Try easy way with coffe
    const coffee = await getCoffee();
    console.log(coffee); // Coffe
    
    // Send request to API
    const wes = await axios('https://api.github.com/users/wesbos');
    console.log(wes.data); // mediocre code
    
    // Fire off three requests and save their promises
    const wordPromise = axios('http://www.setgetgo.com/randomword/get.php');
    const userPromise = axios('https://randomuser.me/api/');
    const namePromise = axios('https://uinames.com/api/');
    // Wait all promise and return 3 availables
    const [word, user, name] = await Promise.all([wordPromise, userPromise, namePromise]);
    console.log(word.data, user.data, name.data); // cool, {...}, {....}
  } catch (e) {
    console.error(e); //...
  }
}

asyncFunction();
```
## Lưu ý
### Quên khai báo từ khóa async
Dĩ nhiên là trường hợp này có thể xảy ra, không khai báo từ khóa này thì ta không có hàm async được, không sử dụng await được rồi. Ví dụ như với trường hợp khai báo một hàm trong một hàm async. Hàm khai báo trong hàm async cũng bắt buộc phải được khai báo với từ khóa async nếu như bạn muốn sử dụng như một hàm async.
```
async function main() {
   await wait(1000)
   let arr = [100, 300, 500].map(val => wait(val))
   arr.forEach(func => await func)
   // ??? error
}
```
### Quên xử lý lỗi
Cũng như với việc quên catch lỗi khi sử dụng Promise, việc quên try catch để bắt lỗi với hàm async cũng có thể xảy ra. Nếu bạn quên không bắt lỗi, thì khi đoạn mã bất đồng của bạn xảy ra lỗi có thể làm chương trình của bạn bị dừng lại.
```
function wait(ms) {
   if (ms > 2015) throw new Error(ms)
   return new Promise(r => setTimeout(r, ms))
}

async function main() {
   console.log('sắp rồi...')
   await wait(2007)
   console.log('chờ tí...')
   await wait(2012)
   console.log('thêm chút nữa thôi...')
   await wait(2016)
   console.log('xong rồi đấy!')
}
```
### Trình duyệt hỗ trợ
Hầu hết các browser hiện tại đã support `async`/`await` nhưng vẫn còn IE và Opera Mini là không support nhé. Bạn có thể tham khảo link này:
![](https://images.viblo.asia/35f7fe71-1b92-4052-9705-4744796e7229.jpg)
## Tổng kết
Tóm lại Async/await thực sự rất thuận tiện cho việc viết code và xử lý callback, nhưng bạn nên hiểu về Promise trước khi dùng để code cho pro hơn nhé :))
Chào thân ái :))