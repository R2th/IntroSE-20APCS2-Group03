Async/await là một cặp từ khóa rất "bá đạo" trong Javascript chuẩn ES2017, nó giúp cho code của bạn ngắn gọn, tường minh, dễ bắt lỗi  hơn những dòng lệnh kiểu "callback hell" như thế này: 
```
function one() {
  setTimeout(function() {
    console.log('1. First thing setting up second thing');
    setTimeout(function() {
      console.log('2. Second thing setting up third thing');
      setTimeout(function() {
        console.log('3. Third thing setting up fourth thing');
        setTimeout(function() {
          console.log('4. Fourth thing');
        }, 2000);
      }, 2000);
    }, 2000);
  }, 2000);
};
```
Vây, trước khi giới thiệu sâu hơn về async/await mình xin điểm qua về chút kiến thức cơ bản.
## Từ callback đến async/await 
Như chúng ta đã biết, Javascript là ngôn ngữ single-thread, tức là chỉ có một thread duy nhất để thực thi dòng lệnh.Nếu cứ thực hiện tuần tự từ trên xuống dưới theo từng dòng code, thì giả sử, khi ta load vào app của facebook ở trang chủ, ta phải đợi load hết view, load hết bài post, load hết notification, .... thế thì người dùng đã kịp giỡ xong app của mình rồi @@.

Vậy nên, cơ chế bất đồng bộ ra đời để "cứu vớt"! 

Nhưng trước khi đến với  async/await người ta đã đưa ra cách : callback, promise rồi tới async/await.

Về ví dụ callback thì mình đã nêu ở đầu bài viết, và vấn đề của nó là rơi vào "hell". Cả promise và async/await đều đã giải quyết được vấn đề trên, tuy nhiên, trong một số trường hợp việc sử dụng promise dẫn tới việc code bị dư thừa và khó debug ( Phần này mình xin trình bày vào bài viết sau, trong bài viết này mình xin nói sơ qua). Mặt khác, cả promise và async/await đều có những ưu điểm và nhược điểm khác nhau, vì vậy, tùy từng trường hợp thì sử dụng cho phù hợp.

## Sử dụng linh hoạt async/await trong vòng lặp
### Xét ví dụ sau : 
Mình muốn call một list dữ liệu, các kết quả sau khi call API được lưu vào một mảng, việc call API dữ liệu trả về của từng item phải handle được không phụ thuộc vào việc kết quả call API của thằng trước đó.

### 1. Đầu  tiên, theo logic, có thể mình nghĩ đến ngay việc sử dụng vòng for hay forEach để call API của từng item

Xét đoạn code sau : 
```
async callApiInArray(array) {
    array.forEach(async (item) => {
      item.response = await NetworkManager.request(ApiConfig.register(item))
      console.log('item response ', item.response);
    });
  }

  main() {
    const array = ['102', '103', '104', '105', '106']
    this.callApiInArray(array);
    console.log('Call API Done', array);
  }
```
 Kết quả hiện thị ra sẽ là : 
 Call API Done ['102', '103', '104', '105', '106']
 
Sau đó mới tới kết quả call các item response: 
item response ...

### 2. Trong trường hợp call một list dữ liệu, mình nghĩ đến việc sử dụng Promise all, mình thử xét đoạn code sau nhé : 
Xét đoạn code sau:
```
    array.map(item => this.createItemRegister(item))
    console.log('arrRegister')
    try {
      await Promise.all(array)
      console.log('Promise.all - done')
    } catch (e) {
      console.error('Promise.all:', e)
    }
    console.log('Call API Done')
```
Đoạn code trên sẽ trả về kết quả : 

arrRegister

Promise.all - done or console về fail

Call API Done

Mặc dù, đoạn code trên đã "đợi" việc call API xong rồi mới trả về , nó chỉ trả về một mảng kết quả, tuy nhiên 1 trong số chúng bị lỗi -> kết quả trả về đều lỗi.

### 3. Vậy để làm được như yêu cầu đề bài, ta phải làm gì ? 

Xét đoạn code sau: 
```
for (item of array) {
      item.response = await this.createItemRegister(item)
    }
  console.log('Call API Done', array);
```
Đoạn code trên đã thỏa mãn yêu cầu đề bài, kết quả trả về là một array, mà kết quả call API của một item trước không phụ thuộc vào kết quả của item sau.

Trên đây là chia sẻ của mình về việc sử dụng async/await trong javascript. Cám ơn các bạn đã đọc, mong bài viết của mình phần nào giúp các bạn hiểu hơn về async/await!
Nguồn tham khảo: https://blog.lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795