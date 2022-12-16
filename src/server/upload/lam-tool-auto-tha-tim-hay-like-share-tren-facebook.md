# Mở đầu
Đúng như tiêu đề bài viết, mình làm chỉ để nghịch cho thỏa mãn cơn thú tính thả reaction của mình trên new feed thôi =))

Để làm được điều này, chúng ta đơn giản là cần 2 graph API là `user home` và `object reactions`.

## User home
Chi tiết tại đây [Graph API Reference /{user-id}/home](https://developers.facebook.com/docs/graph-api/reference/v3.1/user/home)

Chú ý: Kể từ 6/10/2015 thì cái api này không còn available nữa, thay vào đó là `/user-id/feed`. Nhưng mà cái feed thì không phải là thứ mà chúng ta muốn dùng, vì `feed` chỉ trả về trang cá nhân, còn chúng ta muốn dùng là trang home, chứa status của cư dân mạng cơ.

Nhưng mà mình vẫn dùng được: 

![](https://images.viblo.asia/dc5d202e-0a6b-4147-961e-08fe0a9520d2.png)

## Object reactions
Chi tiết tại đây [Graph API Reference /{object-id}/reactions](https://developers.facebook.com/docs/graph-api/reference/v3.1/object/reactions)

Và facebook có nói là "Creating: You can't perform this operation on this endpoint." Tức là chỉ dùng để GET data về cái post đó thôi.

Nhưng đây là mình đã thả tim vào 1 bài post: :D :D

![](https://images.viblo.asia/db63123b-74c0-48c5-91c8-bd0a20bc6e62.png)

## Token
Mọi người thử vào lại cái graph explorer tool của Facebook mà xem, mấy cái quyền giờ chỉ toàn là view vớ vẩn, token được sinh ra từ đấy cũng không thể làm được 2 điều mà mình nói ở trên.

Do đó quan trọng nhất để làm được 2 việc trên là phải có được token có permission để thực hiện 2 api trên. :D

Hiện giờ thì mình tìm ra được 2 cách:
- Cách thứ 1 đó chính là lấy token mà Facebook cấp cho cái trình duyệt của bạn đó, token đó có thừa quyền hạn để làm việc này, lấy thế nào thì các bạn tự nghĩ :D vì cách này không làm tự động hóa được nên bỏ qua.
- Cách thứ 2 là dùng 1 server gọi là `restserver.php` của Facebook, nhưng mà lại chú ý :D :
> The Facebook's legacy REST API does not work for new Facebook apps registered after Apr/2013. However, REST API is still supported for existing Facebook app created before Apr/2013.

Tức là nếu bạn kiếm được 1 cái app nào đó được tạo trước 4/2013, bạn hoàn toàn có thể lấy được token "full quyền" từ cái api này.

![](https://images.viblo.asia/0949cabd-f024-468e-b1aa-c8827a7ff66b.png)

Cái này các bạn tự tìm hiểu tiếp nhé :3 chi tiết tại [đây](https://jdc.io/archive/wetwareconz/2009/03/how-do-i-use-facebooks-restserverphp/)

# Xây dựng tool
Để cho các bạn khỏi bảo mình chỉ biết mỗi PHP, nay mình làm bằng nodejs cho khác bọt tý.

## Chuẩn bị

Chúng ta dùng `express` để xử lý vấn đề này:

```
$ mkdir facebook_project
$ cd facebook_project
$ npm init
// điền thông tin
$ npm install express --save
```

Tạo file `index.js`

```javascript
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.NODE_PORT || 3000;

app.listen(port, function () {
    console.log('App listening on port: ' + port);
});
```

À mà phải cài thêm `dotenv` để dùng được config từ file `.env` nhé.

## Gọi graph API của Facebook

Mình chẳng tìm thấy cái package nào để hỗ trợ việc này, có cái [node-facebook](https://github.com/node-facebook/facebook-node-sdk) này nhưng mà không ưng lắm, kiểu sdk js ở frontend hay php sdk ở backend ý, thế nên là dùng tay cho nhanh.

Cài request package

```
$ npm install request request-promise --save
```

Tạo 1 file khác `facebook_sdk.js` chứa function:

```javascript
const request = require('request-promise');
require('dotenv').config();
const access_token = process.env.ACCESS_TOKEN;
const endpoint = 'https://graph.facebook.com/v3.1/';
```

### User home

Trong file function vừa tạo, chúng ta làm 1 hàm lấy dữ liệu home. Chú ý đây là Promise nhé :v: 

```javascript
exports.home = function (q) {
    q = typeof q == 'undefined' ? {} : q;
    const options = {
        method: 'GET',
        uri: endpoint + 'me/home',
        qs: Object.assign({}, {
            access_token: access_token,
        }, q),
    };

    return request(options);
};
```

Đây là function mà chúng ta sẽ dùng để lấy `home` chứa các status.

Quay lại file `index.js`, chúng ta sẽ require cái function này là được:

```javascript
const { home } = require('./functions/facebook_sdk');

home(next).then(function (res_home) {
    console.log(JSON.parse(res_home));
}
```
Chúng ta sẽ thấy được thứ cần tìm :pensive: 

Chú ý là trong phần kết quả (xem ảnh bên trên) có chứa phần `paging`, dùng nó để chúng ta next được sang trang tiếp (vì đó nên hàm home kia của mình có đầu vào là next đó)

### Thả reactions

Lại quay lại file function, thêm hàm thả reaction:

```javascript
exports.reactions = function (ids, reaction) {
    const options = {
        method: 'POST',
        uri: endpoint + '/' + ids + '/reactions?type=' + reaction,
        qs: {
            access_token: access_token,
        },
    };

    return request(options);
};
```

Và implement ở `index.js` như thế này:
```javascript
const {
    home,
    reactions
} = require('./functions/fb_sdk');

home(next).then(function (res_home) {
        res_home = JSON.parse(res_home);
        if (res_home.data && res_home.data.length > 0) {
            for (let i in res_home.data) {
                reactions(res_home.data[i].id, 'LIKE').then(function (res_reactions) {
                    res_reactions = JSON.parse(res_reactions);
                    console.log('Drop ' + reaction + ' to ' + res_home.data[i].id +
                        (res_reactions.success ? ' success.' : ' failed.') + ' At: ' +
                        moment().format('YYYY-MM-DD HH:mm:ss'));
                })
            }
        }

        if (res_home.paging && res_home.paging.cursors && res_home.paging.cursors.after != res_home.paging.cursors.before) {
            // gọi đệ quy để sang trang sau;
        }
    });
```

Để dùng moment bạn cần cài moment:

```
npm install moment --save
```

### Nâng cao hơn
- Mình đã thêm 1 đoạn tính toán trước khi thả reaction, đó là lấy thống kê về tổng số reaction của bài post này:
```javascript
calculate_reactions(res_home.data[i].id).then(function (res_calculate_reactions) {
    let data = JSON.parse(res_calculate_reactions)[res_home.data[i].id];
    let reaction = 'LIKE';

    if (data.reactions_sad.summary.total_count > 0) {
        reaction = 'LIKE';
    } else if (data.reactions_wow.summary.total_count > 0) {
        reaction = 'WOW';
    } else if (data.reactions_love.summary.total_count > 0) {
        reaction = 'LOVE';
    } else if (data.reactions_haha.summary.total_count > 0) {
        reaction = 'HAHA';
    }

    dropReactions(res_home.data[i].id, reaction);
});
```
để cho việc thả reaction nó không quá lố lăng, status buồn lại HAHA hay status vui lại SAD.
- Thêm cron cho cái việc chạy này, trong node js bạn dùng node-cron
```
npm install node-cron --save
```
Và chạy mỗi tiếng 1 lần thì làm thế này:
```javascript
var cron = require('node-cron');

cron.schedule('0 * * * *', function () {
    // checkHome();
});
```
- Việc thả reaction thì nên thả từ từ, mình có thể sleep bằng cách set timeout theo random timeout:
```javascript
function dropReactions(id, reaction) {
    setTimeout(function () {
        reactions(id, reaction).then(function (res_reactions) {
            res_reactions = JSON.parse(res_reactions);
            console.log('Drop ' + reaction + ' to ' + id +
                (res_reactions.success ? ' success.' : ' failed.') + ' At: ' +
                moment().format('YYYY-MM-DD HH:mm:ss'));
        })
    }, getTime() * 1000);
}

function getTime() {
    let time = [
        10,
        50,
        80,
        120,
        150,
    ];

    return time[Math.floor(Math.random() * time.length)];
}
```

Chúng ta phải lấy thời gian timeout cách xa nhau nhất có thể, để không bị thả reaction gần nhau quá, đó là lý do tại sao mình không lấy rand từ 1 đến 60 mà phải set cái array như thế này :D

## Kết quả
Và đây là thành quả:

![](https://images.viblo.asia/ca15b62f-a68a-4318-be45-289eb9607ef6.png)

Do đoạn trước mình test nhiều quá, nên là dòng chữ trắng không được bao nhiêu, tiếp theo là dòng chữ đỏ, do facebook của mình bị block =))

## Hậu quả

Và đây là hậu quả:

![](https://images.viblo.asia/af515985-bc4d-4612-b2eb-901e2455935c.png)

# Kết luận
- Bỏ ra chút thời gian tìm tòi bạn sẽ thấy nhiều điều thú vị
- Ngoài ra còn là nghịch ngu nữa :-<