![](https://images.viblo.asia/5db25023-d291-47c2-ba09-536b85f377e8.png)
Link extension: https://github.com/ththth0303/unipos-.git
# Giới thiệu
Unipos là một ứng dụng  để mọi người có thể bày tỏ những lời khen gợi, cảm ơn chân thành đến nhau.

Nhiều công ty sử dụng nó để tạo dựng và phát triển kênh thông tin giúp mọi người có thể bày tỏ những lời khen gợi, cảm ơn chân thành đến nhau!
Mình có làm một extension cho nó
# Tính điểm unipos
Trong quá trình sử dụng, mình phát hiện ra unipos thiếu mất một tính năng quan trọng, đó là xem tổng điểm unipos của người khác :))))))).

Nên mình đã tìm tòi  cách tính tổng điểm unipos để bổ sung tính năng còn thiếu này của unipos :)))))))

Tiếp theo mình sẽ chia sẻ với các bạn cách tính điểm unipos nhé!
## Cách tính điểm
Cơ bản bạn chỉ cần vào timeline của người cần xem và cộng tổng điểm mà người đó được nhận + lượt vỗ tay là sẽ ra tổng điểm rồi. 

Nhưng cách này chỉ hợp với người đang max rảnh và kiên nhẫn thôi :)))))

Các của mình cũng dựa trên nguyên tắc trên, nhưng không cần làm thủ công mà sẽ viết 1 đoạn script để thực hiện điều đó

Code thì đơn giản thôi, sử dụng API có sẵn để lấy toàn bộ timeline của người khác, sau đó thực hiện cộng point thôi.

Toàn bộ code chỉ có thế này thôi
```
let count = 500;
// gửi request đến API của unipos
function makeRequest(type, member_id, offset_card_id) {
    return new Promise(function (resolve, reject) {
        let data = {
            "jsonrpc": "2.0",
            "method": "Unipos.GetCards2",
            "params": {
                offset_card_id,
                count,
            },
            "id": "Unipos.GetCards2"
        };
        switch (type) {
            case 'clapped':
                data.params.praised_member_id = member_id;
                break;

            case 'received':
                data.params.from_member_id = member_id;
                break;

            case 'sent':
            default:
                data.params.to_member_id = member_id;
                break;
        }

        data = JSON.stringify(data);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://unipos.me/q/jsonrpc");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("x-unipos-token", localStorage['authnToken']);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response).result);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(data);
    });
}

//Láy tất cả timeline của người dùng 
async function getReceived(type, member_id) {
    let sent = { point: 0, clap: 0, time: 0 };
    let offset_card_id = '';
    while (true) {
        let result = await makeRequest(type, member_id, offset_card_id);
        offset_card_id = result.length > 0 && result[result.length - 1].id;
        for (const key in result) {
            sent.point += result[key].point;
            sent.clap += result[key].praise_count;
            sent.time++;
        }
        if (result.length < count) {
            return sent;
        }
    }
}

// lấy id của người dùng trên url
function matchUrl() {
    let url = window.location.href;
    let matches = url.match(/https:\/\/unipos.me\/.*?i=(.*)/);

    if (matches !== null && matches[1]) {
        return matches[1];
    } else {
        return false;
    }
}


//thực hiện tính point và in ra console
async function getPoint() {
    let userId = matchUrl();
    if (userId) {
        let sent = getReceived('send', userId);
        let received = getReceived('received', userId);
        let clapped = getReceived('clapped', userId);
    
        let sumReceive = 0;
        let sumSent = 0;
        let value = await Promise.all([sent, received, clapped]);
        sumReceive = value[0].point + value[0].clap + value[1].clap;
        sumSent = value[1].point + value[2].clap * 2;
        console.log('Name:', document.getElementsByClassName('ownProfile_displayName')[0].outerText);
        
        console.log('Total Cumulative:', sumReceive);
        console.log('Total Sent:', sumSent);
    } else {
        console.log('Not find user');
    }
};
getPoint();
```
Các bạn copy đoạn js trên, mở trang profile của người bạn muốn xem điểm,  bật dev tool lên và paste vào tab console, sẽ thấy kết quả được in ra như sau
```
Name: Nguyen Van A
Total Cumulative: 2905
Total Sent: 3942
```

việc paste doạn csript chỉ cần thực hiện 1 lần, nếu bạn muốn xem điểm của bất kì ai thì vào trang profile của người đó, và chạy lại câu lệnh
```
getPoint();
```

## Viết extension
Việc cứ phải past đoạn js vào trình duyệt khá là bất tiện, nên mình có làm 1 cái extension xem cho tiện.

Link gitbub mình để cuối bài, các bạn clone về, và load extension ở thư mục build, tổng số point sẽ được hiển thị bên cạnh thông tin cá nhân của người dùng
![](https://images.viblo.asia/51ae91f3-9662-4fee-8bf6-42fc7b390647.png)

Extension còn nhiều bug nhưng chưa muốn fix, các bạn thấy hay thì dùng tạm nha :)))))))

Link extension: https://github.com/ththth0303/unipos-.git