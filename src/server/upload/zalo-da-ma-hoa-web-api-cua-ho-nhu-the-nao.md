Câu chuyện về Alizalo và 40 tên cướp.

Ngày xửa ngày xưa ở một vùng quê nọ có một thị trấn nhỏ tên là Zola. Nơi ấy là một vùng quê yên bình, thơ mộng. Xung quanh thị trấn là những người nông dân chất phác chuyên chăn rau, trồng bò chăm chỉ. Rau ở thị trấn Zola là loại rau có tiếng trên thị trường. Nó nổi tiếng bởi vì sự đa dạng, từ những ngọn rau xanh mướt thon thả cho tới loại quá lứa lỡ thì dai nhách đều có đủ cả. Tối tối, từng hàng từng hàng xe rau từ khắp các nông trường quanh Zola nườm nượp trảy về phía thị trấn, quả là một cảnh tượng náo nhiệt nhưng cũng không kém phần yên bình. 

Cuộc sống vốn dĩ đã có thể ngày ngày bình yên trôi qua như vậy, nếu không tự nhiên có 40 tên cướp hung tợn tới rình rập trên con đường chuyên chở rau củ. Chúng cướp bóc rau quả, hàng hóa, tiền bạc của những người nông dân, đôi khi còn giả mạo nông dân mang rau giả vào thành nữa. 

Trước tình hình ấy, bỗng một hôm xuất hiện một người bí ẩn có tên Alizalo xuất hiện với tuyên bố sẽ bảo vệ con đường của nông dân, tránh kẻ cướp có thể đụng được tới rau củ và phòng chống giả dạng nông dân. Mọi người ban đầu không tin, nhưng vì lũ cướp quá hoành hành nên cũng đành thử một phen xem sao. Và thật không thể ngờ, một thời gian sau số vụ cướp đã giảm hẳn. Và Alizalo đã được tôn vinh trở thành một anh hùng...

Vậy chàng Alizalo đã làm thế nào để chống trộm trên con đường vận chuyển của Zola? Chúng ta cùng theo dõi tiếp nhé.

## First things first

Mình là **Minh Monmen**, người kể chuyện của các bạn hôm nay. Nếu các bạn tưởng tượng ứng dụng web của các bạn là 1 tòa thành kiên cố, vậy thì API chính là con đường ra vào tòa thành ấy rồi. Để có thể lĩnh hội được câu chuyện hôm nay, vui lòng tìm hiểu 1 số khái niệm:

- Web API
- Client - server connection, HTTP request
- Man In The Middle (MITM)
- Cross-origin resource sharing (CORS)
- Web Crawler

Okay, let's begin.

## Câu chuyện về 40 tên cướp

Nói tới 40 tên cướp, không thể không nói tới những thủ đoạn tàn độc của chúng. Hãy cùng điểm qua:

- Là kẻ trên đường chặn xe rau củ (Man In The Middle). Kẻ này sẽ chặn Web API thông qua việc can thiệp vào con đường vận chuyển là mạng máy tính.
- Là bọn cướp trên núi nhưng giả dạng nông dân để dùng hàng hóa từ thị trấn (CORS). Những kẻ này tới từ 1 trang web **fakezola.com** nhưng vẫn có thể gọi API tới trang web chính chủ qua trình duyệt của người dùng. Do đó truy cập được dữ liệu người dùng (nếu người dùng đã đăng nhập trên trang web chính chủ)
- Là bọn làm hàng nhái chuyên thu thập hàng hóa xịn từ thị trấn, sau đó làm giả hoặc sử dụng cho mục đích riêng (Web crawler)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/qep8dob2wm_1%2Apy6MxHdEKs20Kqm3kU7r8Q.jpeg)

## Những gì họ đã làm

Vậy làm cách nào để chống Web API không bị can thiệp hay sử dụng sai mục đích? Hãy xem cách mà chàng trai Alizalo đã làm:

### Set Access-Control-Allow-Origin header 

Đây là 1 header được **Server trả về** để báo cho trình duyệt biết: "Tao chỉ cho phép trang web có domain này gọi tới tao thôi". Như mình đã nói trong bài viết về authentication. Phương thức lưu giữ phiên đăng nhập sử dụng cookie sẽ có đặc điểm của cookie đó là **tự gắn cookie vào request khi gọi tới domain gốc**. Do vậy nếu bạn vào trang web **hellohacker.com**, trang web này hoàn toàn có thể gọi lên API của Zalo để lấy thông tin người dùng đang đăng nhập hiện tại của bạn (do khi gọi API của Zalo sẽ tự có cookie của Zalo). `Access-Control-Allow-Origin` header sinh ra là để phòng chống việc này.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/864gljrhnw_Screenshot%20from%202019-06-13%2023-13-44.png)

> Nên nhớ CORS không chống việc bất kỳ ai đó gọi API của bạn. CORS header chỉ có tác dụng với **request từ trình duyệt**

### Mã hóa API response

Mặc dù HTTPS là giao thức HTTP đi kèm mã hóa đầu cuối để phòng chống MITM. Tuy nhiên các nhà phát triển Zalo thấy đây vẫn là chưa đủ, và họ đã đi thêm 1 bước nữa trên con đường phòng chống những kẻ tò mò. Hãy mở firefox, bật F12 và bắt đầu xem thử API của Zalo có gì hay nào?

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/abvsbwccru_Screenshot%20from%202019-06-13%2023-14-51.png)

Một chuỗi data loằng toằng ngoằng. Nhìn không hiểu cái mô tê gì hết trơn luôn. Tuy nhiên sau khi thực hiện một vài thao tác đơn giản nhưng hơi lag máy để inspect file code js nặng **7.6MB** của zalo web (đã minify), mình tìm được đoạn code sau được thực thi để giải mã mỗi khi có request:

```javascript
function decodeAES(input) {
    var count = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    try {
        var a = void 0;
        input = decodeURIComponent(input);
        var secretKey = i.default.enc.Base64.parse(this.getSecretKey());
        return a = i.default.AES.decrypt({
            ciphertext: i.default.enc.Base64.parse(input),
            salt: ""
        }, secretKey, {
            iv: i.default.enc.Hex.parse("00000000000000000000000000000000"),
            mode: i.default.mode.CBC,
            padding: i.default.pad.Pkcs7
        }).toString(i.default.enc.Utf8), w && (w = 0), a
    } catch (err) {
        return count < 3 ? this.decodeAES(input, count + 1) : (console.error("Error decodeAES " + err), f.default.doCheck(w, function(key) {
            t.logCoreInfo("[w]Change zkey"), t.setDecryptKey(key), w++
        }), null)
    }
}
```

> Thực ra file js này đã được minify, trên đây là hàm mình đã chỉnh sửa 1 số biến quan trọng để các bạn có thể hiểu được nó đang làm gì

Hóa ra là zalo đã sử dụng mã hóa AES để mã hóa toàn bộ response trả về. Trong đoạn code trên, các bạn có thể dễ dàng nhận thấy cái chúng ta cần để decrypt được response từ API là **secretKey** khi mà các thành phần khác đã fix cứng.

Đầu tiên là ý tưởng **secretKey** được giấu trong code đến với mình. Mặc dù đây là cách tù tội nhất để lưu secretKey. Bởi khi ấy secretKey sẽ tồn tại quá lâu, và mỗi khi thay đổi sẽ khiến file js phải cập nhật lại. Tuy nhiên ngay sau đó mình nhìn thấy phần catch error xuất hiện log: `Change zkey`. Vậy là có thể loại trừ việc secretKey được giấu trong code mà sẽ là được lấy từ API. 

Quay trở lại inspect network, và mình nhìn thấy có 1 vài API không bị mã hóa:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/doh8jtdphe_Screenshot%20from%202019-06-13%2023-33-21.png)

Trong mấy cái đó, thì API `getLoginInfo` này có vẻ có triển vọng chứa secretKey nhất. Mình tiếp tục nhận thấy secretKey được **giải mã Base64** trước khi dùng: `var secretKey = i.default.enc.Base64.parse(this.getSecretKey());`. 

Vậy tức là secretKey sẽ có dạng Base64. Và `sự chú ý của ta đã va phải vào cái key của nàng`, mình thử với `zpk_enk: U0hHcmksxATNSMjEJ/RGiQ==` trong response trả về từ API này và... VIOLA, mình đã bắt trúng bài:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/qya98x7l3u_Screenshot%20from%202019-06-13%2023-39-09.png)

Chung quy lại là phương pháp này bao gồm các bước:

- **Tạo 1 Secret Key trên server.**
- **Chia sẻ Secret Key giữa client và server (Qua fix cứng trong code, file config, API).**
- **Dùng Secret Key với mã hóa AES (hoặc bất kỳ thuật toán mã hóa tin cậy nào đó) mã hóa response trả về từ server.**
- **Dùng Secret Key để giải mã trở lại lấy thông tin từ Response.**

Về cơ bản thì nó không khác gì concept của HTTPS, tức là mã hóa và giải mã đầu cuối để người ở giữa không đọc được. Cái khác ở đây chính là HTTPS được trình duyệt thực hiện tự động, còn ở đây ta phải tự thực hiện trong code client.

Như vậy, khi ai đó inspect hay bắt các request tới Zalo thì cũng sẽ chỉ thấy các đoạn dữ liệu đã được mã hóa và không hiểu gì. Điều này giúp **hạn chế** việc các ứng dụng hay bên thứ 3, web crawler không phải client web Zalo sử dụng trái phép API của Zalo. Nhưng các bạn thấy đó, chỉ sau khoảng chục phút mình đã có thể mô phỏng lại quá trình giải mã dưới client. Do vậy phương pháp này được dùng để **chống người ngay** thôi nhé =))

## Tổng kết 

Qua câu chuyện hoàn toàn hư cấu phía trên, mình rút ra 3 điều:

- Mọi thứ trên client đều không thể tin tưởng.
- Bạn **không thể ngăn chặn** kẻ thứ 3 sử dụng API của bạn. Nhưng bạn **có thể hạn chế** nó. Làm nó mất thời gian mày mò code của bạn như phía trên là 1 ví dụ.
- Hết rồi :D