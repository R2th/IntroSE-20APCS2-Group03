Node.js, về cơ bản, là một môi trường đơn luồng (single-threaded) để thực thi các mã code JavaScript ở phía server (server-side). Code JavaScript mà bạn chạy trên Node.js được thực thi trên một luồng duy nhất. Thế làm sao mà Node.js xử lí hàng loạt các kết nối cùng lúc? :grinning: Câu trả lời là `non-blocking asynchronous I/O`. Nói thực lòng thì không phải chỉ đơn giản như thế. Có một `thread pool` của `libuv` (thư viện được viết bằng C, dùng trong lõi của Node.js), nơi tạo ra những thứ blocking như non-blocking. Bằng cách này hay cách khác, ở Node.js chúng ta xử lí mọi thứ một cách bất đồng bộ, điều sẽ giúp hàng ngàn client được phục vụ ngay lập tức. Có rất nhiều bài viết ngoài kia giải thích chi tiết về vấn đề này, nên tui sẽ không dài dòng viết lại nữa, hỏi Google đi nha :relieved:.

Suy cho cùng, `Promises` chính là thứ đại diện cho 1 hành động bất đồng bộ nào đó. Vì `callbacks` có thể dễ dàng được viết lại như 1 `Promise`, tui sẽ không đi sâu vào việc nên xài cái nào ở bài này. Ở bài này tui sẽ tập trung vào thứ cụ thể hơn: "**xử lí các hành động bất đồng bộ một cách song song với nhau trong Node.js một cách tối ưu và đúng đắn**".

Kể từ Node.js 4 (khi sử dụng với args `--harmony`), chúng ta đã có thể sử dụng `native Promise`. MDN mô tả Promise như sau:

> The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.

Có 1 điều cần phải nhớ ở đây: **một khi Promise đã được tạo ra, nó đã thực sự bắt đầu được chạy**, không phụ thuộc vào việc bạn có `.then` hay không. Một khi bạn đã gọi `fetch("https://example.com/")`, một request đã được tạo ra; `.then` hay `.catch` chỉ cần thiết khi bạn cần xử lí response trả về của request đó :neutral_face:. Bằng cách này, nếu một số Promises được tạo ra (ví dụ ta gọi `fetch` nhiều lần, cái này đặt dưới cái kia) thì các request sẽ được gọi một cách song song.

![Parallel Processing](https://images.viblo.asia/6a026113-5909-4fe9-8e67-94a382eb5fbf.jpg)

Hãy bắt đầu với một đoạn thí dụ nhỏ, giả sử các tham số và hàm có ý nghĩa như bên dưới:
- `numberOfOperations`: số lượng hành động bất đồng bộ cần được xử lí
- `listOfArgument`: chứa các arguments được truyền vào hàm `asyncOperation` mỗi lần thực thi.
- `asyncOperation`: một hàm giả lập một hành động bất đồng bộ: trả về một Promise - và sẽ được resolved trong vòng từ 1 đến 10 giây.
- `listOfDelays`: một array chứa số lượng giây để resolve mỗi hàm `asyncOperation` tương ứng.
- `watchCounter`: một hàm để theo dõi số lượng Promise được thực thi trong cùng một thời điểm, in dữ liệu ra console mỗi giây.

```
// Biến này dùng để theo dõi số Promise đang được thực thi tại một thời điểm
let counter = 0;
let interval;
// Tổng số hành động
const numberOfOperations = 25;
// Arguments cho mỗi hành động
const listOfArguments = [];
// Delay các hành động để fake bất đồng bộ
const listOfDelays = [];

// Fill mảng argument và delay cho các hành động được thực thi
// Mỗi giá trị delay được ngẫu nhiên trong khoảng 1000 tới 10000 milisecond
for (let i = 0; i < numberOfOperations; i++) {
  listOfArguments.push(i);
  listOfDelays.push(Math.ceil(Math.random() * 9) * 1000);
}

// Fake bất đồng bộ: resolve một mảng sau một khoảng thời gian tuỳ ý
// Tăng biến counter để theo dõi số promise được thực thi mỗi giây
const asyncOperation = index => {
  counter++;
  return new Promise(resolve =>
    setTimeout(() => {
      console.log('Operation performed:', index);
      counter--;
      resolve(index);
    }, listOfDelays[index]))
};

// Hàm in ra số Promise được thực thi mỗi giây (để theo dõi)
const watchCounter = () => {
  console.log('Promises running in the beginning:', counter);

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => console.log('Promises running:', counter), 1000);
};
```

## Chạy song song - Take 0 (lần thử 0)

Hãy theo dõi các đoạn code dưới đây. Chúng ta chạy hàm `asyncOperation` và trả về list các `results`.

```
async function take0() {
  // Quẩy thôi
  const results = [];
  for (const argument of listOfArguments) {
    const index = await asyncOperation(argument);
    results.push(index);
  }
  return results;
}
```

Thành thực mà nói, nó không hề chạy song song. Chúng ta tuần tự đợi cho mỗi hàm `asyncOperation` được hoàn thành, bởi vì danh sách các `results` được trả về theo đúng thứ tự. Chúng ta tạo ra Promise ở mỗi vòng lặp và đợi nó chạy xong. Ở mỗi thời điểm chỉ có một Promise đang được thực thi.

![take 0](https://cdn-images-1.medium.com/max/800/1*Qbgd2xNI9cbS4W-9hTqMWA.png)

Kiểu thực thi như trên mất tới 142 giây để hoàn thành. Thời gian thực thi là tổng của tất cả những lần thực thi của mỗi Promise được tạo ra. Có vẻ như đây không phải là giải pháp tốt (chạy lâu vl :disappointed:).

## Chạy song song - Take 1

Tui thề là nó sẽ chạy song song được trong lần này, hãy thử thay đổi một chút trong đoạn code ở trên. Thay vì gọi và `await` các hàm `asyncOperation` mỗi vòng lặp, hãy gọi tất cả trước đó luôn thông qua hàm `map`. Nó sẽ trả về list Promise sẵn sàng được `awaited`:

```
async function take1() {
  // Running Promises in parallel
  const listOfPromises = listOfArguments.map(asyncOperation);
  // Harvesting
  const results = [];
  for (const promise of listOfPromises) {
    const index = await promise;
    results.push(index);
  }
  return results;
}
```

Giờ thì chúng ta có tất cả mọi hành động được thực thi một cách song song, kết quả được trả về thông qua `awaiting` mỗi Promise.

Số lượng Promise được thực thi tại một thời điểm giảm dần theo thời gian:

![take 1](https://cdn-images-1.medium.com/max/800/1*krHJUkUPYkpmYviRpcZ2Kg.png)

Kiểu thực thi như này thì chỉ mất 9 giây chạy, có vẻ ngon hơn rồi đó, bây giờ tổng thời gian thực thi bằng với thời gian thực thi của Promise chạy lâu nhất.

## Chạy song song - Take 2

Chúng ta có thể rút ngắn đoạn code ở `take 1` bằng cách xài `Promise.all`. Nó nhận vào một `array` của các `Promise` và sẽ resolve ngay khi tất cả các Promise trong array được resolved hoặc rejected nếu một trong các Promise trong array rejected.

```
async function take2() {
  // Chạy promise song song
  const listOfPromises = listOfArguments.map(asyncOperation);
  // Lấy kết quả trả về
  return await Promise.all(listOfPromises);
}
```

Kết quả y chang như lần chạy của `take 2`, có vẻ mọi thứ đang ổn. Tuy nhiên có một mối đe doạ mà chúng ta cần phải để tâm :confused:.

## Chạy song song - Take 3

Ở các lần thử trước chúng ta đã làm được thứ mà mình muốn: chạy các Promise một cách song song với nhau. Nhưng, nó chạy **tất cả** các Promise mà bạn đưa cho một cách song song và cùng một thời điểm, điều này có thể gây ra một số vấn đề như sau.

Chuyện gì xảy ra nếu `asyncOperation` request tới một API của bên thứ ba, và API này có `rate limiting`? (Rate Limit: là giới hạn số kết nối tại một thời điểm từ phía server). Có lẽ sẽ phụ thuộc vào số Promise bạn muốn gọi.

**Mấu chốt là**: thực hiện các hành động một cách song song sẽ nhanh hơn nhưng bạn nên xem xét kĩ lưỡng về số kết nối song song có thể chạy trong thực tế cũng như những vấn đề tác dụng phụ có thể xảy ra (giới hạn kết nối, giới hạn tài nguyên) khi chạy song song nhiều tác vụ. Tốt hơn hết nên thêm vào logic để kiểm soát số lượng tác vụ chạy song song cùng một thời điểm.

### Subtake - 0

Thứ đơn giản mà chúng ta có thể làm đó là chia số tác vụ chạy song song cùng lúc ra ngay từ đầu. Hãy sét ngưỡng (threhold) là tối đa 5 Promise chạy song song tại một thời điểm, ở đây ta làm giống kiểu phân trang, là chia ra thành các `batches`, `batchesCount` là số lần thực thi làm tròn, ví dụ có 32 promise thì sẽ chạy tổng cộng là 32/5 ~ 7 lần, với lần chạy cuối chạy 2 promise song song.

```
async function take3subtake0() {
  const concurrencyLimit = 5;
  let results = [];
  const batchesCount = Math.ceil(numberOfOperations / concurrencyLimit);

  // Chạy Promise song song trong từng vòng lặp batch
  for (let i = 0; i < batchesCount; i++) {
    const batchStart = i * concurrencyLimit;
    const batchArguments = listOfArguments.slice(batchStart, batchStart + concurrencyLimit);
    const batchPromises = batchArguments.map(asyncOperation);
    // Harvesting
    const batchResults = await Promise.all(batchPromises);
    results = results.concat(batchResults);
  }
  return results;
}
```

Kết quả đúng như mong đợi, có tổng cộng 5 `batches`, các Promise chạy song song không quá 5 cái mỗi thời điểm, và quá trình chạy mất tổng cộng 40 giây, nhiều hơn 9 giây (chạy tất cả 1 lần) nhưng vẫn tốt hơn 142 giây nhiều :relieved:.

![take3-subtake0](https://cdn-images-1.medium.com/max/800/1*f8ilNzozt727klGDflzt_Q.png)

Nhìn vào biểu đồ có thể thấy có khá nhiều "đỉnh" Promise, có nghĩa là việc phân bố tải (load) của các `Batches` chưa được đồng đều và sẽ có một số thời điểm resource được ngồi chơi :neutral_face:, như vậy là chưa tối ưu hoá lắm. Vấn đề ở đây là một `batch` sẽ có thời gian chạy là thời gian chạy của promise lâu nhất trong `batch` đó. Để dễ hiểu hơn, `batch` có thể gồm 5 promises, 4 promise chạy mất 1 giây và 1 cái còn lại chạy mất 10 giây -> `batch` này mất 10 giây để resolved, bởi vì chúng ta đang dùng `Promise.all` và nó sẽ chỉ resolved khi tất cả đã resolved.

### Subtake - 1

Để giải quyết vấn đề này, cần phải có một hướng tiếp cận khác. Thay vì chia array Promise ra thành các `batch` để chạy, hãy xử lí dữ liệu theo kiểu `Promise-by-Promise`. Ở lần subtake trước, logic là:
- Lấy số lượng Promise chia cho ngưỡng (threhold), để ra tổng số `batch` cần chạy
- Tạo một vòng lặp dựa trên số lượng `batch`  và chạy promise song song theo từng đợt `batch`
- Đặt `await` ở mỗi vòng lặp để chạy tuần tự từng `batch`

Giờ ta đổi logic tí nhé:
- Lấy promise tiếp theo từ list (số lượng đúng bằng số tối đa của ngưỡng)
- Gọi hàm `asyncOperation`
- Xâu chuỗi các bước tương tự để return về Promise (nếu có promise để chạy)

Bằng cách này, giải thích ngắn gọn thì khi số Promise đang chạy trong mỗi `batch` nhỏ hơn ngưỡng (threhold) thì ta sẽ đấy thêm một promise vào đó, cứ cái này xong thì cái khác vào, và số tối đa tại một thời điểm đúng bằng ngưỡng. Triển khai bằng code như sau:

```
async function take3subtake1part0() {
  const concurrencyLimit = 5;
  const argsCopy = listOfArguments.slice();
  const promises = new Array(concurrencyLimit).fill(Promise.resolve());
  // Đưa promise liên tiếp vào chuỗi thực thi
  function chainNext(p) {
    if (argsCopy.length) {
      const arg = argsCopy.shift();
      return p.then(() => {
        const operationPromise = asyncOperation(arg);
        return chainNext(operationPromise);
      })
    }
    return p;
  }

  await Promise.all(promises.map(chainNext));
}
```

Xong, bằng cách này ta sẽ tối ưu được thời gian chạy, không còn các `đỉnh` Promise nữa, load sẽ tốt hơn.

![take3-subtake1](https://cdn-images-1.medium.com/max/800/1*9ALZyVsGbX53c_JOrhZ10g.png)

Kết quả là toàn bộ quá trình chạy mất 33 giây, ít hơn lần trước 7 giây -> chạy nhanh hơn rồi còn gì :sunglasses:.

Ngon lành cành đào rồi, ờ mà khoan đã... có vẻ như tui đã quên mất gì đó :joy:. Chưa có cái gì để chứa mảng kết quả trả về :smiley:, có nhiều cách để xử lí việc này. Thực tế là chúng ta đã biết trước có bao nhiêu phần tử trong array kết quả, vậy hãy tạo một mảng rỗng từ đầu và fill vào mảng đó mỗi khi promise được resolved, đơn giản như sau:

```
async function take3subtake1part1() {
  const concurrencyLimit = 5;
  // Tạo index cho array
  const argsCopy = [].concat(listOfArguments.map((val, ind) => ({ val, ind })));
  const result = new Array(listOfArguments.length);
  const promises = new Array(concurrencyLimit).fill(Promise.resolve());
  // Đưa promise liên tiếp vào chuỗi thực thi
  function chainNext(p) {
    if (argsCopy.length) {
      const arg = argsCopy.shift();
      return p.then(() => {
        // Lưu kết quả vào array khi Promise chạy xong
        const operationPromise = asyncOperation(arg.val).then(r => { result[arg.ind] = r; });
        return chainNext(operationPromise);
      });
    }
    return p;
  }

  await Promise.all(promises.map(chainNext));
  return result;
}
```

Cuối cùng cũng xong, vậy là chúng ta đã hoàn thành được những gì đặt ra: **chạy các request bất đồng bộ một cách song song và kiểm soát chúng :smile:**.

*Reference from [@denis.fatkhudinov](https://medium.com/@denis.fatkhudinov/node-js-handling-asynchronous-operations-in-parallel-69679dfae3fc)*