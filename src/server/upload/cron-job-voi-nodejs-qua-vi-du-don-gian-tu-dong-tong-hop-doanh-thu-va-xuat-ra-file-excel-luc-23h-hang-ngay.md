### Giới thiệu
Ngày hôm nay mình xin được viết bài về vấn đề tạo `cron job` với  `Nodejs` qua việc tạo một ứng dụng đơn giản. Ví dụ, chúng ta có một trang web bán hàng, và chúng ta muốn web app của chúng ta sẽ tự động tổng hợp doanh thu cũng như tình hình kinh doanh trong ngày, rồi xuất ra một `file excel` báo cáo và lưu vào hệ thống lúc `23h30p hằng đêm`. Và cứ đến ngày 25 hằng tháng, chúng ta muốn hệ thống tự động tổng hợp tình hình kinh doanh trong tháng như tổng doanh thu, số lượng sản phẩm bán ra, những sản phẩm nào bán chạy nhất..v..v. <br/>
Mục đích để tối giản hóa công sức của chủ cửa hàng, đỡ phải ngồi tổng kết sổ sách chi cho mệt. Và cũng là thêm một kênh lưu trữ dữ liệu bán hàng cho cửa hàng. <br/>
Ta bắt tay vào làm thử nhé...

### Tạo project
Không có gì đặc biệt cả mình sẽ tạo một project bằng `express-generator`. Mình lười nên mỗi khi bắt đầu project nodejs mình toàn dùng `express-generator` để sinh tự động thôi. Mặc dù việc sử dụng `express-generator` cũng mang đến chút xíu phiền toái vì khi config để sử dụng socket chẳng hạn. Nó config có hơi lằng nhằng hơn chút xíu so với các ví dụ ứng dụng realtime mà chúng ta thường bắt gặp như khi tự config project. Nhưng nhìn chung mình khoái cái `express-generator` này. Tại project của mình toàn mấy cái be bé, linh ta linh tinh gì đâu không, nên dùng nó cho tiện...
```shell
$ npm install express-generator -g // Để cài đặt global nếu bạn chưa có express-generator
$ express --view=pug project_name // Tạo một project với tên bạn tự đặt và view engine là pug. Nếu bạn dùng jade hay ejs thì sửa tham số nhé, còn nếu dùng chỉ viết api thì điền bừa... :D
```
Sau đấy, bạn sẽ có một project với tổ chức thư mục như sau, và đã được config sẵn nhiều thứ:

![](https://images.viblo.asia/e99f8b4a-d5de-40d7-a5a9-80a013705704.png)

### Package node-cron
Một điều mà mình yêu Nodejs, đó là kho package của nó. Ta nói cần thứ gì là vô npm kiếm, kiểu gì cũng có, thượng vàng hạ cám đủ cả. Nên cứ lựa cái nào mà nó nhiều lượt install với nhiều star trên git mà chôm chỉa thôi. Tuy rằng, điều này đồng nghĩa với việc bạn đọc document khá nhiều, vì mỗi package lại có một document của nó. 
Cái package `node-cron` này trông cũng xìn xịn, nên mình quyết định xài thử nó. Link github của package [ở đây](https://github.com/kelektiv/node-cron). Bạn có thể xem qua một chút... <br/>
Việc sửa dụng package này cũng khá đơn giản, bạn có thể vào link trên để xem qua doccument của package, không có gì khó cả. Ngay trang readme ta thấy một ví dụ khá rõ ràng:
```javascript
var CronJob = require('cron').CronJob;
var job = new CronJob('00 30 11 * * 1-5', function() {
  /*
   * Runs every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not run on Saturday
   * or Sunday.
   */
  }, function () {
    /* This function is executed when the job stops */
  },
  true, /* Start the job right now */
  timeZone /* Time zone of this job. */
);
```
Hết sức rõ ràng và dễ hiểu....
### Package excel4node
Tương tự như trên, chúng ta sẽ lại dùng một package nữa để `ghi và xuất file excel`. Cái này ít star hơn cái trên, nhưng mình dùng thử cũng thấy ôn ổn. Nên mình quyết định chọn nó, [đây](https://github.com/natergj/excel4node) là link repo của `excel4node`. Bạn có thể cũng cần xem qua một chút xíu...
Tương tự như trên, readme của `excel4node`, cũng có một ví dụ trông khá dễ dàng 
```javascript
// Require library
var xl = require('excel4node');

// Create a new instance of a Workbook class
var wb = new xl.Workbook();

// Add Worksheets to the workbook
var ws = wb.addWorksheet('Sheet 1');

// Set value of cell A1 to 100 as a number type styled with paramaters of style
ws.cell(1,1).number(100).style(style);

// Set value of cell B1 to 300 as a number type styled with paramaters of style
ws.cell(1,2).number(200).style(style);

wb.write('Excel.xlsx');
```
Tạo mới một file `Excel.xlsx` tại `sheet 1`, ghi vào `dòng 1 cột 1` số `100`. Tương tự, `dòng 1 cột 2` ghit vào đó số `300`. <br/>
Ái chà, dễ ẹt...
### Kết hợp  node-cron, excel4node
1. Đầu tiên, chúng ta tạo một file tên là `excel_report_today` chẳng hạn, trong đó chúng ta sẽ viết và xuất ra một module tên là `todayReport`. Module này thực hiện trách nhiệm truy vấn và lấy ra `tổng doanh thu` cũng như `số sản phẩm bán ra trong ngày`, ở đây mình dùng `MongoDB` nên truy vấn có phần khác lạ chút xíu, chỉ làm tham khả, nên chắc cũng không quá quan trọng. `Bill Model` mà mình truy vấn [ở đây](https://github.com/dangminhtruong/havana/blob/master/model/bill.js) nếu bạn muốn xem rõ hơn:
```javascript
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const moment = require('moment');
const _ = require('lodash');
const Bill = require('../model/bill');
const xl = require('excel4node');
const config = require('../config/config');

const todayReport = () => {
    new Promise((resolve, reject) => {
        let startDay = new Date(moment().startOf('day'));
        let endDay = new Date(moment().endOf('day'));
        
        mongoose.connect('mongodb://172.18.0.2:27017/havana', {
            useMongoClient: true,
            promiseLibrary: require('bluebird')
        });

        Bill.aggregate(
            { $unwind: '$detais' },
            {
                $match: {
                    createdOn: {
                        $gt: startDay,
                        $lt: endDay
                    }
                }
            },
            {
                $group: {
                    _id: '$detais.product_name',
                    total: { $sum: '$detais.quantity' },
                    earned: { $sum: '$detais.price' }
                }
            },
            { $sort: { total: -1 } }
        )
            .exec((err, records) => {
                if (err) {
                    return reject(err);
                }
                mongoose.connection.close();
                return resolve({
                    daySum: _.sumBy(records, function (o) { return o.total; }),
                    dayEarn: _.sumBy(records, function (o) { return o.earned; }),
                });
            });
    })
        .then((data) => {
            let wb = new xl.Workbook();
            let ws = wb.addWorksheet('Sheet 1');
            let style = wb.createStyle({
                font: {
                    color: '#FF0800',
                    size: 12
                },
                numberFormat: '$#,##0.00; ($#,##0.00); -'
            });

            // Hàng đầu tiên trong file excel
            ws.cell(1, 1).string('Tổng doanh thu hôm nay').style(style);
            ws.cell(1, 2).string('Số sản phẩm bán ra').style(style);

            // Hàng thứ 2
            ws.cell(2, 1).number(data.daySum).style(style);
            ws.cell(2, 2).number(data.dayEarn).style(style);

            // Xuất file và lưu vào public/report 
            wb.write(`public/report/${Date.now()}.xlsx`);
        })
        .catch((err) => {
            throw new Error('Lỗi truy vấn');
        });
}

module.exports = todayReport;
```
2. Tiếp theo chúng ta tạo một file `cron_job.js` để thực thi `cron job` của chúng ta như sau 
```javascript
const cron = require('cron');
const todayReport = require('./excel_report_today'); // require module xuất báo cáo

const job = new cron.CronJob({
  cronTime: '00 30 23 * * 0-6', // Chạy Jobs vào 23h30 hằng đêm
  onTick: function() {
    todayReport();
    console.log('Cron jub runing...');
  },
  start: true, 
  timeZone: 'Asia/Ho_Chi_Minh' // Lưu ý set lại time zone cho đúng 
});

job.start();
```
Bạn nhớ là sửa `time zone ` cho đúng nhé, bạn có thể tham khảo `time zone` tại [đây](http://momentjs.com/timezone/)
### Chạy thử
Vậy là chúng ta đã làm xong, việc còn lại chỉ là chạy thử. Chúng ta chạy file `cron_job.js` như bình thường 
```javascript
node cron_job.js
```
Trước khi chạy bạn chỉnh lại thời gian về 1-3 phút sau nhé. Không là ngồi đợi cả ngày luôn không chừng :D :D :D Khi đến thời gian mà chúng ta ấn định sẵn, `cron job` sẽ chạy và xuất ra một file trong folder `public/report` như mình mong muốn

![](https://images.viblo.asia/5c6750a5-3eba-4907-aaf9-b112bb480925.png)

Và nội dung là hai dòng báo cáo như thế này

![](https://images.viblo.asia/f39eddcb-9ef5-4697-b36f-2494aec612d3.png)

Bugs nè ! Hình như mình ghi nhầm dòng rồi hay sao ấy. Bán ra 2 sản phẩm và thu về 19k chứ nhỉ ? -_-

### Kết luận
Mình định làm thêm phần xuất báo cáo vào ngày 25 hằng tháng. Tuy nhiên, câu truy vấn hơi dài và cũng không có thêm nhiều[ ý nghĩa](https://truyencotich.top/), vì nó cũng tương tự như đã làm ở trên thôi. Nên mình xin kết thúc bài viết ở đây.  <br/>
Nếu muốn chạy nhiều hơn một `cron job` nữa thì bạn có thể tham khảo tại document của package. Ví dụ cũng không có gì khó cả.  <br/>
Bài viết của mình chỉ mang tính chất giới thiệu. Hơn nữa mình cũng không có nhiều kinh nghiệm nên rất mong sự góp ý của mọi người ở cuối bài viết. Cảm ơn mọi người đã dành thời gian đọc và ủng hộ bài viết của mình ^^