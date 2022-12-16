### Hướng dẫn cơ bản về Rest Api trong ReactJs

Hôm nay chúng ta tìm hiểu cách sử dụng axios để truy vấn json trong ReactIs. Trong bài viết này tôi cung cấp một số code mẫu cơ bản các bạn  có bước tiếp cận ban đầu với axios.

# Cài đặt axios:
Sử dụng command:
> npm install --save axios

# Các tham số cơ bản:
url: Đường dẫn truy cập dữ liệu json mà bạn muốn hướng tới.
headers: Khai báo nội dung trong request mà bạn muốn đưa vào truy vấn. Ví dụ như 'Content-type', 'Authorization', 'Accept'...
params: Các tham số truy vấn trên url.
data: Dữ liệu bạn muốn đưa vào truy vấn
method: Phương thức truyền dữ liệu truy vấn. Ví dụ POST, GET, PUT...

# Bắt đầu xây dựng truy vấn với axios
Bước 1: Import thư viện sử dụng axios
```
import axios from 'axios';
```

Bước 2: Khai báo config

```
let url = http://jsondev.org/jsondemo;
let config = {
                method: this.state.methodSelected,
                url: url,
                headers: headers,
                params: params,
                data: data
            };
```

Bước 3: Tạo một đoạn code sử dụng axios truy vấn

```
 axios(config)
                .then(function (response) {
                    console.log('Send REST Api result: ');
                    let dataResponse = response.data;
                    if (dataResponse != null) {
                        this.setState({                            
                            codeResult: JSON.stringify(dataResponse),
                        })
                        console.log(JSON.stringify(dataResponse));
                    }
                })
                .catch(function (error) {
                    console.log('error request api');
                    console.log('NetworkStatus: ' + error.toString());
                    let statusText = '';
                    try {
                        statusText = error.response.statusText;
                    } catch (e) {

                    }
                    console.log(error.toString() + ".\n" + statusText);
                });
```

### Kết luận
Bài trên chỉ là những bước đầu cho ai mới tiếp cận tìm hiểu về Reactjs và axios. Cảm ơn các bạn đã đọc và chia sẻ.

### Github:
https://github.com/xuanqh/jsoneditoronline.git

### Online demo:

http://jsondev.org/