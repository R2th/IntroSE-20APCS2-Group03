Hôm nay, mình xin với thiệu với các bạn cách sử dụng [Nock](https://github.com/nock/nock) để tạo các request HTTP giả lập trong quá trình test.

Hãy cùng tìm hiểu Nock qua các nội dung:
- Tại sao phải mock các HTTP request trong quá trình testing?
- Nock là gi?
- Ví dụ về việc sử dụng `nock` và `nock.back`

## Tại sao phải mock các HTTP request trong quá trình testing?

Khi xử lý các đoạn mã phụ thuộc vào các hệ thống bên ngoài mà vẫn đảm bảo được mã code đáng tin cậy và độ bao phủ hết được các case của quá trình test thì thật là một thử thách.Thực hiện việc test sẽ phải tạo ra các request HTTP đến các service bên ngoài có thể bị lỗi vì rất nhiều lý do khác nhau.
Thí dụ như dữ liệu được trả về thay đổi theo từng yêu cầu, sự cố kết nối mạng, hoặc thậm chí là sự giới hạn tốc độ truy cập, hoặc giới hạn về số lượng request xử lý.

Trừ khi việc test được thiết kế rõ ràng để kiểm tra tính khả dụng của dịch vụ bên ngoài, thời gian phản hồi, hoặc cấu trúc của dữ liệu, thì nó sẽ không bị lỗi do sự phụ thuộc vào dịch vụ bên ngoài.

Ngăn chặn và kiểm soát hành vi của các request HTTP trả về độ tin cậy cho các thử nghiệm của chúng ta. Đây là lúc mà Nock được sử dụng.

## What is Nock?

 - Nock là thư viện của Node.js dùng để mô phỏng và dự đoán cho các request HTTP.
 - Nock có thể được sử dụng để test các module dùng để kiểm tra việc thực hiện các request HTTP một cách độc lập.
 - Nock hoạt động bằng cách ghi đè hàm `http.request` của Node. Ngoài ra, nó cũng ghi đè `http.ClientRequest` để sử dụng nó một cách trực tiếp.

 [Nock](https://github.com/nock/nock) cho phép chúng ta tránh được những thách thức được đề cập ở trên bằng cách chặn các request HTTP bên ngoài và cho phép chúng ta có thể tùy chỉnh được response trả về trong các trường hợp khác nhau, hoặc là lưu trữ phản hồi giống như các 'fixtures', dữ liệu được đóng gói sẽ được trả về một cách đáng tin cậy.

 Sự dụng dữ liệu đóng gói có thể có rủi ro vì nó dễ bị cũ nếu không được làm mới định kỳ. Nếu có các test bổ sung, hoặc đã giữ lại phiên bản API thì có thể dẫn đến định dạng của dữ liệu mà API trả về bị thay đổi, khó kiểm soát. Nhiệm vụ của developer là phải đảm bảo việc thực thi được thực hiện để tránh điều này.

 Hiện tại, Nock đang được sử dụng chủ yếu theo 2 cách:
 - `nock`: developer chỉ định để giả định các response trả về một cách độc lập.
 - `nock.back`: Ghi, lưu lại và tái sử dụng trực tiếp các response.

Hoặc có thể nằm trong các bài test riêng lẻ. Nếu cả hai được sử dụng trong cùng 1 files test thì hiện tại chế độ `nock.back` phải được đặt rõ ràng, và reset trước và sau khi sử dụng.

## Adding Nock

[Ba function](https://github.com/dominicfraser/NockExamples/blob/master/userQueryHelper/userQueryHelper.js) có trong ví dụ sẽ được test: lấy ra một người dùng ngẫu nhiên, lấy ra ngẫu nhiên người dùng có quốc tịch, và lấy ra ngẫu nhiên một người dùng nhưng giảm về giá trị mặc định nếu không thành công.

```
const getRandomUserOfNationality = n =>
  fetch(`https://randomuser.me/api/?nat=${n}`)
    .then(throwNon200)
    .then(res => res.json())
    .catch(e => console.log(e));
```

### Using `nock`

Các bạn có thể tìm hiểu chi tiết về Nock qua [docs](https://github.com/nock/nock#usage) nhé. Có rất nhiều tùy chọn có sẵn để chỉ định cho thay đổi trong request, mặc dù trong request đã match hoặc response đã được trả về. Hai ví dụ của điều này là response được trả về từ một request thành công, và forcing 1 reponse 500 để kiểm tra option phụ của một hàm.

Tất cả những gì cần phải được thêm vào một tệp file test có sẵn để có thể bắt đầu sử dụng nock là:

  `const nock = require('nock'); / import nock from ‘nock';.`

Trong lần test đầu tiên, chúng ta sẽ sử dụng một chuỗi để [match hostname và path](https://github.com/nock/nock#specifying-hostname), sau đó chỉ định đoạn mã code và nội dung. Tiếp theo đó, chúng ta sẽ thêm xác nhận vào chuỗi Promise của hàm mà chúng ta gọi. Khi một yêu cầu gửi từ `getRandomUser()` được thực hiện, nó match với trình chặn của Nock mà chúng ta vừa thiết lập, và vì vậy câu trả lời chúng ta đã chỉ định sẽ được trả về.

```
it('should return a user', () => {
  
  nock('https://randomuser.me')
    .get('/api/')
    .reply(200, {
      results: [{ name: 'Dominic' }],
    });
  return query
    .getRandomUser()
    .then(res => res.results[0].name)
    .then(res => expect(res).toEqual('Dominic'));
});
```

Tương tự, chúng ta giả định một cuộc gọi với quốc tịch cụ thể, mặc dù lần này chúng ta sử dụng RegExp để match với hostname và path.
```
it('should return a user of set nationality', () => {
  nock(/random/)
    .get(/nat=gb/)
    .reply(200, {
      results: [{ nat: 'GB' }],
    });
  return query
    .getRandomUserOfNationality('gb')
    .then(res => res.results[0].nat)
    .then(res => expect(res).toEqual('GB'));
});
```

Điều quan trọng cần lưu ý là chúng ta đang sử dụng `afterAll(nock.restore)` và `afterEach(nock.cleanAll)` để đảm bảo rằng các phần chặn không ảnh hưởng lẫn nhau.

Cuối cùng, chúng ta sẽ test cho response 500. Đối với điều này, chúng ta sẽ tạo một [hàm](https://github.com/dominicfraser/NockExamples/blob/master/userQueryHelper/userQueryHelper.js#L23) bổ sung trả về giá trị mặc định nếu cuộc gọi API không trả về response. Chúng ta sử dụng Nock để chặn yêu cầu và giả lập một response 500, sau đó kiểm tra kết quả của hàm.

```
it('should return a default user on 500', () => {
  nock(/randomuser/)
    .get(/api/)
    .reply(500);
  return query
    .getRandomUserGuarded()
    .then(res => expect(res).toMatchObject(defaultUser));
});
```

Các bạn có thể giả lập mã trả về của response không phải 200, [delaying the connection](https://github.com/nock/nock#delay-the-connection) và [socket timeout](https://github.com/nock/nock#socket-timeout), cực kỳ hữu ích.

### Using `nock.back`

`nock.back` được sử dụng không chỉ để ngăn chặn một request HTTP, mà còn để lưu các response thực để sử dụng trong tương lai. Các response đã lưu này được gọi là "fixture".

Trong [mode](https://github.com/nock/nock#modes) `record`, nếu có tên là fixture, nó sẽ được sử dụng thay cho các cuộc gọi trực tiếp, và nếu không thì một fixture sẽ được tạo ra để sử dụng cho các cuộc gọi trong tương lai.

Trong project ví dụ, chỉ có một request HTTP được thực hiện cho mỗi thử nghiệm, nhưng các fixture `nock.back` có khả năng ghi lại tất cả các cuộc gọi đi. Điều này đặc biệt hữu ích khi thử nghiệm 1 thành phần phức tạp thực hiện cuộc gọi đển một số dịch vụ hoặc trong quá trình test đầu cuối, nơi một lần nữa có thể thực hiện nhiều cuộc gọi khác nhau. Một lợi thế chính của việc sử dụng fixtures là sẽ truy cập nhanh một khi tạo ra chúng, giảm khả năng bị timeouts. Khi sử dụng dữ liệu thực thì việc mô phỏng cấu trúc dữ liệu là không cần thiết và có thể xác định được bất kỳ thay đổi nào.

Như đã đề cập trước đó, điều quan trọng là phải xóa và làm mới fixtures thường xuyên để đảm bảo chúng không bị cũ.

Một tính năng hiện tại của `nock.back` là khi được sử dụng trong cùng tệp với files test như các trình chặn chuẩn của `nock`, chúng có thể can thiệp lẫn nhau, trừ khi bất kỳ kiểm tra `nock.back` nào đều bị xếp vào mỗi thử nghiệm như sau:

```
nock.back.setMode('record');
// your test
nock.back.setMode('wild');
```

Điều này đảm bảo rằng bất kỳ lần thử nghiệm nào cũng sẽ không vô ý dử dụng các fixtures vừa tạo ra. Nếu không hoàn thành, ví dụ, các response 500 sẽ không được đưa ra trong thử nghiệm trước đó của chúng ta, như các fixtures có chứa một response 200.

Trước tiên chúng ta phải thiết lập một tệp helper `nock.js`. Trong [example](https://github.com/dominicfraser/NockExamples/blob/master/helpers/nock.js) này, thực hiện ba việc:
  - Đặt [đường dẫn](https://github.com/nock/nock#setup) nơi lưu lại các fixtures
  - [Thiết lập chế độ](https://github.com/nock/nock#modes) record để tất cả các `record` và fixtures sử dụng khi được test và chạy, thay vì mặc định là `dryrun` thì sẽ sử dụng các fixtures có sắn nhưng sẽ không có bất kỳ một new record nào.
  - [Sử dụng tùy chọn `afterRecord`](https://github.com/nock/nock#modes) để thực hiện một số hành động trên các fixtures để cho chúng dễ đọc hơn.

Điều này sau đó có thể truy cập trong các tập tin thử nghiệm bằng cách sử dụng:
`const defaultOptions = require('./helpers/nock); / import defaultOptions from './helpers/nock';.`

`nock.back` có thể được sử dụng với cả [Promises](https://github.com/dominicfraser/NockExamples/blob/master/userQueryHelper/userQueryHelper.test.js#L10) hoặc [Async/Await](https://github.com/dominicfraser/NockExamples/blob/master/userQueryHelper/userQueryHelper.test.js#L45), hãy cùng xem ví dụ:

```
it('should return a user', async () => {
  nock.back.setMode('record');
  const { nockDone } = await nock.back(
    'user-data.json',
    defaultOptions,
  );
  const userInfo = await query.getRandomUser();
  expect(userInfo).toEqual(
    expect.objectContaining({
      results: expect.any(Object),
    }),
  );
  nockDone();
  nock.back.setMode('wild');
});
```

Đầu tiên, chúng ta đánh dấu thử nghiệm là không đồng bộ - `async`, để cho phép sử dụng `await`. Chúng ta set chế độ `record`. Chuyển vào tên của tệp tin muốn lưu các fixtures, và các defaultOptions được đặt trong trình trợ giúp của `nock.js` để làm cho chúng dễ đọc hơn. Khi kết thúc, điều này sẽ cung cấp hàm `nockDone`, được gọi sau khi các kỳ vọng được thực hiện.

Sau khi gọi `getRandomUser()`, chúng ta có thể so sánh kết của của nó với mong đợi của chúng ta. Để đơn giản hóa, có thể khẳng định rằng nó sẽ chứa các kết quả, bản thân nó sẽ chứa một đối tượng.

Sau đó, chúng ta thiết lập chế độ `wild`, như trong TH này chúng ta muốn đảm bảo fixture không được sử dụng bởi các test khác.

Các fixtures tự có thể được nhìn thấy trong thư mục được chỉ định trong helper của `nock.js`, và bản thân chúng cũng rất thú vị để xem xét.

**Tổng kết**

* Nock cung cấp công cụ rất mạnh để tăng độ tin cậy cho các cuộc gọi test đến các service bên ngoài và cho phép kiểm thử lớn hơn khi các thử nghiệm trước đây có thể được xem là quá dễ thực hiện có thể được đánh giá lại.

* Như bất kỳ giả định nào, trách nhiệm của nhà phát triển là đảm bảo rằng việc giả định không đi quá xa và vẫn có thể cho thử nghiệm thất bại khi thay đổi chức năng hoặc nó không có giá trị.

**Nguồn tài liệu**:

   - [5-Minute Intro to Nock for Mocking APIs](https://www.youtube.com/watch?v=3G_yyE5GeIk)
   - [Nock documentation](https://github.com/nock/nock#socket-timeout)
   - https://codeburst.io/testing-mocking-http-requests-with-nock-480e3f164851