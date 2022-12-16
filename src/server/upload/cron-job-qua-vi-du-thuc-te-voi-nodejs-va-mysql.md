# Giới thiệu
Trong thực tế, để tối giản hóa công sức của người quản lí ứng dụng trong việc thống kê, xuất báo cáo, ranking, ... ta thường nghĩ đến việc tạo một trình tự động để ứng dụng có thể  xử lí những công việc một cách tự động. Phương pháp tạo trình tự động có tên là cron job.Trong bài viết ngày hôm này mình xin giới thiệu các bạn cách tạo trình tự động xử lí công việc trong ứng dụng nodejs + mysql
# Cài đặt package
**Ta sử dụng package node-cron**
```php
$ npm install --save node-cron
```
**Cú pháp cron**
```shell
# ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```

**Trong đó:**
* second: 0-59
* minute:0-59
* hour:0-23
* day of month:1-31
* month:1-12 (or names)
* day of week:0-7 (or names, 0 or 7 are sunday)

# Tạo ứng dụng nodejs
Follow bài viết sau https://viblo.asia/p/form-validation-in-nodejs-bJzKmG3wl9N
# Ví dụ thực tế:
**Bài toán**: Giả sử đăng kí lớp dạy. Một lớp dạy có thể được đăng kí bởi nhiều giáo viên, nhưng chỉ có 1 giáo viên được chấp nhận để đứng lớp. Yêu cầu bài toán sau khi 1 giáo viên bất kì được chấp nhận thì các giáo viện đã đăng kí lớp này và chưa được chấp nhận sẽ bị xóa khỏi danh sách đăng kí.

**Viết model connect với mysql:**

**Hàm list ra danh sách  đăng kí lớp dạy thành công**
```javascript
function listAvtiveUserJob() {
    var defer = q.defer();
    var query = conn.query('SELECT job_id as jobId FROM user_job WHERE active=1', function (err, result) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });
    return defer.promise;

}
```

**Hàm xóa lớp đăng kí không thành công**
```javascript
function deleteUserJobByJobId(jobId) {
    if (jobId) {
        var defer = q.defer();
        var query = conn.query('DELETE FROM user_job WHERE job_id=? AND active=0', [jobId], function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}
```

**Tạo file cronjob.js**
Sẽ tiến hành xóa toàn bộ các đăng kí lớp dạy không thành công vào 23h59p mỗi ngày
```javascript
var cron = require('node-cron');
var user_job = require("../models/userjob");

function deleteUserJobNonRegestered() {
    cron.schedule('* 59 23 * * *', async () => {
        try {
            var listJobId = await user_job.listAvtiveUserJob();
            for (var i = 0; i < listJobId.length; i++) {
                user_job.deleteUserJobByJobId(listJobId[i].jobId).then(function(result){
                    if(result){
                        console.log("------------DELETE SUCCESS------------------")
                    }else{
                        console.log("------------DELETED FAIL------------------")
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }

    });
}

module.exports = {
    deleteUserJobNonRegestered: deleteUserJobNonRegestered
}
```

**Tiền hành gọi hàm deleteUserJobNonRegestered trong file app.js**
```javascript
var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var cronjob = require("./apps/cron-job/cronjob");

var app = express();
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

cronjobRank.deleteUserJobNonRegestered();

app.listen(port, host, function () {
  console.log("Server is running port:", 3000);
})
```
Cảm ơn mọi người đã theo dõi bài viết của mình!