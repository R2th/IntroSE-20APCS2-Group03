- Hôm nay mình tình cờ có 1 task phải dùng tới lên lịch cho job, cụ thể là mình đang tạo một chat bot và cần nó gửi message thông báo cho người dùng sau mỗi 20 phút, có khá nhiều pakage hỗ trợ cho nodejs nhưng sau một hồi mày mò mãi thì mình quyết định chọn Agenda, cùng lướt qua xem có gì đặc biệt nhé.
# Giới thiệu Angenda JS
- Trang chủ: https://github.com/agenda/agenda
- Ưu điểm: Đúng như trong phần giới thiệu, "A light-weight job scheduling library for Node.js" Agenda lượt bỏ đi các tính năng hầm hố, và thật sự rất nhẹ. Điểm thứ 2 mình muốn dùng vì Agenda backed là MongoDB.
- Tất nhiên cũng không gọi là ưu điểm, mà tùy vào nhu cầu sử dụng các bạn có thể chọn các backage khác nhé.
- So sánh với 1 số pakage khác:
- ![](https://images.viblo.asia/26e5bfba-3844-45a1-b7bc-7df3af131c41.png)
# Sử dụng
- Cài đặt:  `npm install agenda`
- Config
* Như mình đã nói thì agenda sử dụng MongoDb nên bạn cần connect tới mongodb và khai báo collection để agenda sử dụng và lưu các job.
```
const Agenda = require('agenda');

const connectionString = 'mongodb://127.0.0.1/our-app-db';

const agenda = new Agenda({
    db: {address: connectionString, collection: 'Tên-Collection'},
    processEvery: '30 seconds'
});
module.exports = agenda
```
* Tiếp theo thì khai báo các task sẽ sử dụng, ở đây mình sẽ tạo job có tên là console log và sẽ thực hiện console.log('Agenda successfully worked"), bạn nhớ phải gọi done() để kết thúc job nhé.
```
    agenda.define('console log', function(job, done) {
        console.log('Agenda successfully worked");
        done();
    };
```
* Sử dụng, chạy lên lịch cho các job 
Ta có thể chạy job one time như sau, ở đây mình sẽ chạy job console log sau 20 phút
```
(async function() {
  await agenda.start();
  await agenda.schedule('in 20 minutes', 'console log');
})();
```
Hoặc có thể lên lịch lặp đi lặp lại console log mỗi 20p như sau:
(async function() {
  const consoleLog = agenda.create('console log');
  await agenda.start();
  await consoleLog.repeatEvery('20 minutes').save();
})();
* Điểm mình thích nữa ở agenda là nó hoàn toàn có thể sử dụng ngôn ngữ tự nhiên để mô tả thời gian.
# Một số chức năng khác:
- Truyền param cho task, chẳng hạn bạn muốn gửi mail cho một người thì tất nhiên phải truyền địa chỉ mail của người đó chẳng han:
Hàm agenda.schedule hay agenda.create đều hỗ trợ ta có thể truyền param, nhưng không hỗ trợ object hay array nhé, muốn truyền bạn cũng có thể convert sang Json.
VD: agenda.schedule('in 20 minutes', 'send mail',{ to: 'test@mail.com' }) để sử dụng bạn sử dụng job.attrs.data.to nhé.

- Tìm kiếm các job đang chạy, cũng như cancel 1 job đã lên lịch.
* Để cancel toàn bộ các job console log đang được lên lịch, với kết quả trả về sẽ là số lượng job đã bị cancel.
```
const numRemoved = await agenda.cancel({name: 'console log'});
```
* Tìm kiếm, cancel job chỉ định, trong trường hợp bạn  muốn cancel 1 task cụ thể nào đó bạn có thể query nó qua data bạn đã truyền vào chẳng hạn, và cancel:
```
// tìm kiếm job console.log với data ta truyền vào là data: 1, hoàn toàn là query từ mongodb
const jobs = await agenda.jobs({name: 'printAnalyticsReport'}, {id:1});
// Sau đó chỉ việc loop qua jobs và gọi method cancel.
```
- Còn rất nhiều các tác vụ khác mà agenda hỗ trợ cho bạn, nó hoàn toàn có thể đáp ứng được nhu cầu cơ bản của mình và đặc biệt đơn giản, dễ config, dễ sử dụng :3 
# Tổng kết:
- Hi vọng bài viết của mình giúp ích cho các bạn, mọi thắc mắc hoặc trao đổi các bạn có thể cmt mình sẽ cố gắng reply lại nhé. Thanks
Related: https://github.com/agenda/agenda