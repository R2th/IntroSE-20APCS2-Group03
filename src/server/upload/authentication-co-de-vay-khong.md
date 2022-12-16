Đây là một bài tự truyện về cách mình đã phát triển phương pháp authentication như nào và cũng chỉ dùng phương pháp cơ bản nhất: password.

### Đơn giản nhất, so sánh mật khẩu
Bắt đầu từ lớp 10, lúc này mình implement authentication lần đầu tiên với 1 project cá nhân để học dev web - một trang web xem Doraemon, mình thích xem lắm, đến lúc mình làm xong cái ver đầu tiên của web thì mình cũng xem hết 900 tập lẻ của 3F luôn. Với cách này thì đơn giản lắm, chắc ai cũng từng nghĩ ra rồi:
```php
if ($stored_user->password == $posted_password) {
    // generate authorization
} else {
    // show error
}
```
Cách này thì hay dở thế nào? Cái hay là nó dễ, trẻ con cũng nghĩ ra được nhưng có 2 thứ không ổn lắm với mình. 1 là nó không có hash mật khẩu trong database, 2 là nó gửi trực tiếp mật khẩu qua internet. Ngày đó làm chơi chơi làm gì có tiền mua SSL, dùng domain miễn phí mà thử thôi, password chềnh ềnh trên HTTP request.

Ờ thì trước tiên cứ fix cái hash đã rồi tiến tới cái tiếp theo:
```php
if ($stored_user->password == hash("sha512", $posted_password)) {
    // generate authorization
} else {
    // show error
}
```

### Ẩn cái mật khẩu đi, làm khùng làm điên cho hacker nó sợ
Cách này thì giống cách trên thôi, nhưng mà bạn che password đi, kiểu encode base64 hay asym encrypt (giống kiểu chơi 2 cái SSL cùng lúc ấy nhỉ, cách này facebook dùng này).

### Không biết nữa, tạm gọi là unknown challenge nhé
Sang lớp 11, mình có nhận được từ thầy mình 1 yêu cầu làm web chấm bài cho đội tuyển (sau này cũng không được dùng, giờ mọi người cũng chuyển sang codeforces rồi). Lúc này thì cũng có tí kinh nghiệm, vấn đề bắt đầu phát sinh. Chấm bài cho đội tuyển thì thường là sẽ dùng trong mạng LAN, mạng LAN thì lại tương đối dễ để mọi người nghe lén nhau, ai đấy fake giống SSID wifi rồi bridge sang LAN thì có thể bắt hết HTTP request rồi. Vậy nhưng mà có vẻ như cũng không ai có ý định dùng thêm SSL xong đã thế còn có hôm ông cụ nhà mình trong bữa cơm khoe nay Viettel nó kêu hack được SSL đấy, vậy thôi, nâng cấp thì cũng chả hại ai, coi như bài tập về nhà 🤷‍♂️. Bài toán bây giờ là làm sao để không gửi mật khẩu qua đường truyền mạng.

> Giải pháp là không gửi mật khẩu nữa, mà server gửi một câu hỏi và client trả lời câu hỏi đấy bằng mật khẩu, câu trả lời sẽ ở dạng không thể hiểu được (cơ bản là dùng hash).

Code nè (lúc đó nhảy sang dùng node rồi):
```js
function getQuestion(req, username) {
    let user;
    if ((user = await findUserByName(username)) === null) {
        // throw not found
    }
    
    req.session.userId = user.id;
    req.session.question = crypto.randomBytes(32).toString('hex');
    return req.session.question;
}

function login(req, answer) {
    let user;
    if ((user = await findUserById(req.session.userId)) === null) {
        // throw not found
    }
    
    // cái hàm generate answer này cũng sẽ chạy ở client
    // password truyền vào đều phải hash qua sha256
    const acceptableAnswer = generateAnswer(req.session.question, user.password);
    
    if (answer === acceptableAnswer) {
        delete req.session.question;
        delete req.session.userId;
        // generate and return authorization
    } else {
        // throw error
    }
}
```
Đó và thế là mở devtools/Network ra xem và chỉ thấy 1 đống chữ linh tinh chả hiểu kiểu gì. Cách này sau đấy 1-2 năm thì mình có vô tình cũng thấy Garena áp dụng.

### Ơ thế giờ web hiện đại phải phân tán ai chơi session nữa
Ờ thì đấy, đến năm 2 đại học, mình với mấy thằng bạn học môn lập trình web, mình cũng lại bê cái phương pháp bên trên vào. Nhưng mà giờ mình mới để ý, chạy `npm start` và express báo đừng có dùng session nha bồ không là mem leak đấy. Mình nhớ là cũng có nhiều recommendation khuyên không dùng session, đặc biệt là mình cũng nhắm thiết kế hệ thống stateless để dễ phân tán, tự nhiên dính ông authentication này thì sao nhỉ. Thì bỏ session thôi, tuy nhiên vẫn phải có gì đấy để đảm bảo request lại lần 2 sẽ không có tác dụng và cơ bản thì nó là bất khả thi 😃 (vì cái sự stateless của HTTP). Tuy nhiên trong đa số các tình huống bị tấn công MITM thì hacker sẽ log 1 đống thông tin ra rồi vào đọc sau nên chỉ cần đảm bảo cái request đăng nhập chỉ có thể dùng ngay lập tức mới có hiệu lực là được. Rồi là nàm thế lào, là thêm timestamp.
> Thay vì lưu question, user id trong session, giờ chỉ có 1 request thôi, trong request sẽ có 1 cái cục thông tin được sign bằng hash của password (à nếu như hash mọi người dùng bcrypt chẳng hạn hoặc dùng thêm mắm muối thì có thể thêm 1 request trước đó để lấy phần thông tin đấy) kiểu như jwt ấy mà dùng jwt luôn cũng chả sao, trong payload sẽ chứa username và timestamp client thích điền gì thì điền miễn nó trong khoảng 10s trước khi server xử lý. Như vậy khi hacker nhìn thấy cái payload này và muốn chôm nó về thì cũng chả biết sao mà sửa được timestamp, quăng cái cũ lên thì nó hết hạn lâu rồi.

Code nào:
```js
function login(receivedToken) {
    const { username, timestamp } = await decode(receivedToken);
    if (!username || !timestamp) // throw bad request
    if (Date.now() - bySeconds(10) > timestamp) // throw bad request
    
    const user = await findUserByName(username);
    if (!user) // throw not found
    
    const { password } = user;
    const valid = await verify(receivedToken, password);
    
    if (!valid) // throw bad request
    
    // generate authorization and return
}
```

### Tổng kết
Đây cơ bản chỉ là kể chuyện thôi, mọi người tham khảo nhé, có cách nào hay hơn thì có thể comment cho mình biết, mình vẫn đau đầu vì không nghĩ ra cách nào hoàn thiện hoàn toàn được cái vụ không dùng session (ờ thì có thể lưu session bên ngoài như dùng Redis hay MySQL cơ mà mình muốn ít lệ thuộc các công nghệ khác hơn và đặc biệt là tiết kiệm hơn, có bị DOS thì vẫn sống tốt).