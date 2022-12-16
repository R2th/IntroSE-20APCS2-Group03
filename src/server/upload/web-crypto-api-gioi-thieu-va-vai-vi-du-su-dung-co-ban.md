# Giới thiệu
## Lịch sử
Đã từ lâu, Javascript ra đời giúp các nhà phát triển có thể xây dựng những trang web với nhiều logic phức tạp, thực hiện đủ thứ xử lý ở ngay client side, không cần nhờ server. Tuy nhiên, số lượng các thư viện Javascript cung cấp tính năng mã hóa/giải mã khá giới hạn, và cũng dẫn đến các ứng dụng web cung cấp khả năng mã hóa nội dung ngay trên trình duyệt chưa phổ biến. Ít nhất là cho tới thời gian gần đây, với sự xuất hiện của Web Crypto API.

Đặc tính động, tính đơn luồng, bất đồng bộ và hiệu năng thấp (so với các ngôn ngữ như C, Rust), tất cả đều khiến cho Javascript không phù hợp với các thuật toán liên quan đến mã hóa/giải mã. Bản thân Javascript cũng thiếu tính năng tạo ra *dữ liệu giả ngẫu nhiên đủ an toàn* (**CSPRNG**, hay viết tắt của *Cryptographically-secure pseudorandom number generator*). Vì vậy, **Web Crypto API** được ra đời nhằm cung cấp các tính năng mã hóa/giải mã đủ an toàn ngay trên trình duyệt.
## Tại sao cần WebCrypto API?
Trong thế giới web, người dùng thường xuyên phải "tin tưởng server". Người dùng nhập password đăng ký tài khoản, khả năng đó cũng là password chúng ta dùng cho email và nhiều tài khoản trên mạng khác (vì lười nhớ nhiều mà), và sau đó phải hy vọng server của website sẽ bảo vệ password trên đủ tốt (qua sử dụng hàm băm một chiều chẳng hạn). Người dùng cũng phải cầu mong các nội dung khác bạn lưu vào server sau đó như như hộp thư đến, số thẻ tín dụng,... được giữ bảo mật và không có vụ rò rỉ dữ liệu nào xảy ra.

Gần đây quyền riêng tư đang là vấn đề nóng. Nhiều trang web ngày càng lạm dụng dữ liệu của người dùng nhiều hơn cho mục đích riêng. Gmail sử dụng nội dung email phục phụ cho quảng cáo được cá nhân hóa, hay Evernote tuyên bố sẽ cho nhân viên đọc các đoạn trích ngắn trong ghi chú của người dùng để phục vụ cho machine learning. Chưa kể, nếu chủ nhân trang web tuyên bố sẽ tôn trọng quyền riêng tư của người dùng, thì trường hợp éo le như chủ web đó bị đe dọa hay chính phủ yêu cầu, dữ liệu người dùng vẫn bị xâm phạm như thường, tiêu biểu như vụ Edward Snowden và dịch vụ email an toàn Lavabit.

Vì những lý do trên, nhiều người đã muốn tạo các ứng dụng Web theo kiểu **Zero-Knowledge** hay có khả năng mã hóa phía client (**client-side encryption**) hoặc mã hóa đầu cuối (**end-to-end encryption**). Phía server của các ứng dụng Web này chỉ dùng để lưu hay truyền tải dữ liệu đã mã hóa. Key giải mã không bao giờ được gửi tới server, và quá trình mã hóa/giải mã được thực hiện hoàn toàn offline ở phía client. Như vậy các server này hoàn toàn có Zero-knowledge. Một số trang Web tiên phong theo mô hình này điển hình như bitwarden.com, standardnotes.org hay protonmail.com. Cá biệt có dịch vụ web tận dụng client-side encryption để bảo vệ chính server của họ khỏi những vấn đề liên quan đến pháp luật, ví dụ như trang upload file có mã hóa phía client [mega.nz](https://mega.nz).

Nhưng cũng nên nhớ, dù thế nào, bạn vẫn phải tin tưởng server, ít nhất là để cung cấp cho bạn các đoạn mã client side (như javascript) an toàn. Chỉ có điều server không cần biết quá nhiều!
# Cách sử dụng
Dưới đây mình chỉ hướng dẫn cách sử dụng cơ bản cho mục đích giới thiệu, và rất có thể nhiều chỗ chưa chính xác và không an toàn. Nên nhớ rằng nếu bạn muốn làm một trang Web tận dụng Web Crypto API với yêu cầu bảo mật cao, bạn phải cẩn thận hơn rất nhiều, và có đủ hiểu biết về an toàn thông tin. Một sai lầm nhỏ sẽ khiến việc mã hóa trở nên kém hiệu quả hoặc vô dụng hoàn toàn.

Để hiểu bài viết rõ nhất, bạn cần biết một chút về javascript như *promise* và *async/await*, các kiến thức về `ArrayBuffer` và các khung nhìn của nó `ArrayBufferView`. Ngoài ra, để giảm thiểu thời gian, các ví dụ trong bài được thực hiện bằng thư viện [Vue.js](https://vuejs.org/).

Cũng vì công nghệ Web luôn thay đổi rất nhanh, để có những thông tin chính xác nhất, bạn nên tham khảo [tài liệu của MDN về Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)!
## Sinh ngẫu nhiên với `Crypto.getRandomValues()`
Giúp tạo ra dữ liệu pseudorandom đủ an toàn để dùng với mã hóa (*CSPRNG*). Thường được dùng để tạo ra IV, salt,...
````javascript
// Tạo typed array với 16 byte
let byte = new Uint8Array(16);
// Lấp đầy typed array trên với random value
crypto.getRandomValues(byte);
````
Nhớ rằng máy tính của chúng ta là... máy tính, nó không hề có khái niệm ngẫu nhiên. Hàm random của các ngôn ngữ lập trình chỉ tạo ra dữ liệu "trông có vẻ" random bằng cách phụ thuộc vào trạng thái bên trong nào đó, nên được gọi là pseudorandom. Các hàm random bình thường này (PRNG) cho hiệu năng cao nhưng dễ dàng bị đoán các giá trị random tiếp theo, nên chỉ phù hợp với mục đích thống kê.

Còn CSPRNG chỉ khác PRNG ở hai điểm:
- Không thể phân biệt giá trị tạo ra bởi CSPRNG với giá trị random thực sự (chuyển động của bầu khí quyển chẳng hạn)
- Không thể tiên đoán các giá trị random tiếp theo (giả sử trạng thái bên trong không bị tiết lộ)

Điều đó khiến cho CSPRNG đủ an toàn cho các mục đích mã hóa.
{@embed: https://jsfiddle.net/tranxuanthang/y58xwLa2/20/}
## Hàm băm bằng `SubtleCrypto.digest()`
Giúp "băm" hay *hash* một dữ liệu bất kỳ bằng một loại hàm băm nhanh. Hiện nó chỉ hỗ trợ: SHA-1, SHA-256, SHA-384, SHA-512.
````javascript
const digest = crypto.subtle.digest(algorithm, data);
````
- **`algorithm`**: tên thuật toán, một trong 4 loại: `"SHA-1"`, `"SHA-256"`, `"SHA-384"`, `"SHA-512"`
- **`data`** phải là `ArrayBuffer` hoặc một khung nhìn của `ArrayBuffer`, như typed array `Uint8Array` chẳng hạn.
- **`digest`** sẽ là một promise, fullfill với một `ArrayBuffer` chứa chuỗi kết quả sau khi được băm.

Lưu ý rằng, hàm băm nhanh dùng để xác thực tính toàn vẹn của dữ liệu. Đừng bao giờ dùng hàm băm nhanh như ở trên để bảo vệ hay tạo khóa cho mật khẩu!
{@embed: https://jsfiddle.net/tranxuanthang/a1r6tp29/27/}
## Băm mật khẩu với **PBKDF2**
**PBKDF2** là hàm giúp sinh khóa từ một mật khẩu một cách an toàn (*key-derivation function*). Khóa này có thể được dùng làm khóa trong các thuật toán mã hóa (như AES).

Tuy mục đích ban đầu của PBKDF2 là tạo khóa, PBKDF2 cũng được coi là đủ an toàn ngày nay để tạo *password hash* hay *password digest* (băm password). PBKDF2 được *thiết kế để chậm*, điều này giúp cho tấn công brute force để tìm key được sinh ra qua hàm PBKDF2 khó hơn rất nhiều.

Tạo hash cho mật khẩu với *PBKDF2* cần có những yếu tố sau:
- Password đầu vào cần tạo hash
- Salt là một giá trị độc nhất (và tốt hơn nữa là ngẫu nhiên). Nó để bảo vệ password khỏi rainbow table attack và không cần giữ bí mật. Luôn dùng salt mới sau mỗi lần băm (mình sẽ chọn độ dài là 32 byte, tức 256 bit)
- Iterations: số vòng lặp, càng cao thì quá trình hash càng chậm (mình tạm để là 100000)
- Key length: độ dài của key PBKDF2 được sinh ra theo bit (mình xin dùng tạm là 160)

Chúng ta sẽ sử dụng `SubtleCrypto.deriveBits()` cho việc tạo mã băm trên, nhưng có một vài việc phải làm trước.
### Chuyển chuỗi password cần tạo mã băm sang dạng object `CryptoKey`
`SubtleCrypto.deriveBits()` hơi phiền là không chấp nhận mật khẩu như string thông thường, chỉ chấp nhận mật khẩu ở dạng object `CryptoKey`. Vậy ta phải chuyển mật khẩu định băm thành một object `CryptoKey` trước bằng `SubtleCrypto.importKey()`. Nhưng lại tiếp tục, `SubtleCrypto.importKey()` yêu cầu password phải ở dạng `ArrayBuffer` :(( Túm gọn lại là như sau:
````javascript
const getKeyMaterial = async (passwordString) => {
  const passwordBuffer = new TextEncoder().encode(passwordString);
  return await crypto.subtle.importKey("raw", passwordBuffer, "PBKDF2", false, ["deriveBits"]);
}
````
### Tạo salt
Sử dụng `Crypto.getRandomValues()` như ở phần trên.
````javascript
const getRandomArrayBuffer = bytesNumber => {
  let byte = new Uint8Array(bytesNumber);
  crypto.getRandomValues(byte);
  return byte;
}
````
### Tiến hành tạo mã băm
Sau khi đã có 2 thành phần trên, chúng ta tiến hành tạo mã băm qua `SubtleCrypto.deriveBits()`:
````javascript
const getDerivedBits = async (saltBuffer, keyMaterial, iterations, bitLength) => {
  const params = {
    name: "PBKDF2",
    salt: saltBuffer,
    iterations: iterations,
    hash: "SHA-256"
  };
  return await window.crypto.subtle.deriveBits(
    params,
    keyMaterial,
    bitLength
  );
};
````
### Kết nối lại
Gắn kết 3 hàm trên lại với nhau:
````javascript
let saltBuffer = getRandomArrayBuffer(32);
let keyMaterial = await getKeyMaterial("correcthorsebatterystaple");
let resultBuffer = await getDerivedBits(saltBuffer, keyMaterial, 100000, 160);
````
Nhớ rằng `resultBuffer` sẽ là trả về một `Promise` mà sau một khoảng thời gian sẽ trả về một `ArrayBuffer` chứa kết quả băm.

Bạn nên tham khảo ví dụ ở dưới để hiểu rõ, đồng thời có thể tham khảo thêm tại https://medium.com/coinmonks/fun-times-with-webcrypto-part-1-pbkdf2-815b1c978c9d
{@embed: https://jsfiddle.net/tranxuanthang/7mdtb2j5/125/}

Như đã nói ở trên, PBKDF2 cũng được sử dụng để tạo ra khóa từ một mật khẩu cho thuật toán như AES. Phần dưới đây sẽ đi vào chi tiết hơn.
## Mã hóa đối xứng (và giải mã) với AES-GCM
Hiểu ngắn gọn, mã hóa đối xứng là kiểu mã hóa mà bạn sử dụng cùng một khóa (key) để mã hóa và giải mã dữ liệu. Còn AES là thuật toán mã hóa đối xứng rất an toàn và mạnh mẽ hiện nay, kể cả cho mục đích chính phủ hay quân sự.

AES thường sử dụng khóa với độ dài 256 bit. Nói đơn giản thì không ai có thể tấn công vét cạn (brute force) đoạn khóa này với công nghệ hiện tại. Để tạo ra đoạn khóa dài 256 bit dành cho AES, người ta có thể chọn dùng CSPRNG để sinh ra đoạn khóa bất kỳ, hoặc sinh khóa từ mật khẩu với một hàm sinh khóa (key-derivation function) như PBKDF2.

AES-GCM là kiểu thuật toán AES thông dụng nhất, cho hiệu năng giải mã tốt hơn với CPU đa nhân, đồng thời đảm bảo tính xác thực của dữ liệu, tức nhận biết dữ liệu có còn nguyên vẹn khi giải mã hay không.

Để tránh việc dùng cùng một khóa mã hóa ra các dữ liệu giống nhau cho ra dữ liệu đã mã hóa giống nhau, người ta dùng thêm một giá trị gọi là IV (Initialization Vector). IV là đoạn giá trị độc nhất (ngẫu nhiên thì càng tốt) khá giống như salt. **Ngoài ra đặc biệt với AES-GCM, sử dụng IV/nonce độc nhất cho mỗi lần mã hóa là bắt buộc và vô cùng quan trọng, nhất là trong trường hợp bạn sử dụng cùng một key để mã hóa nhiều dữ liệu khác nhau!** Trong bài viết này mình xin tạm chọn độ dài giá trị IV/nonce là 12 byte (96 bit).

Dưới đây mình sẽ chọn mã hóa bằng cách sinh khóa từ mật khẩu, đồng thời dữ liệu được chọn để mã hóa là chỉ là đoạn chữ UTF-8.
### Tạo khóa từ mật khẩu
Sử dụng PBKDF2. Gần như giống hệt với phần băm mật khẩu bằng PBKDF2 ở phía trên, chỉ khác một chút ở dùng `SubtleCrypto.deriveKey()` thay cho `SubtleCrypto.deriveBits()`.
````javascript
const getKey = async (saltBuffer, keyMaterial, iterations) => {
  let params = {
    name: "PBKDF2",
    salt: saltBuffer,
    iterations: 100000,
    hash: "SHA-256"
  };
  return await crypto.subtle.deriveKey(
    params,
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};
````
### Hàm mã hóa và giải mã
````javascript
const encryptMessage = async (dataBuffer, key, ivBuffer) => {
  return await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: ivBuffer
    },
    key,
    dataBuffer
  );
}

const decryptMessage = async (encryptedDataBuffer, key, ivBuffer) => {
  return await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: ivBuffer
    },
    key,
    encryptedDataBuffer
  );
}
````
### Tiến hành mã hóa và giải mã
````javascript
let saltBuffer = getRandomArrayBuffer(32);
let keyMaterial = await getKeyMaterial("correcthorsebatterystaple");
let key = await getKey(saltBuffer, keyMaterial, iterations);

// Mã hóa
let ivBuffer = getRandomArrayBuffer(12);
let dataBuffer = new TextEncoder().encode("Dữ liệu cần mã hóa ở đây");
let encryptedBuffer = await encryptMessage(dataBuffer, key, ivBuffer);

// Giải mã
let decryptedBuffer = await decryptMessage(encryptedBuffer, key, ivBuffer);
let decryptedString = new TextDecoder("utf-8").decode(decryptedBuffer);
````

Ví dụ hoàn chỉnh, hoạt động được ở dưới đây (trông có hơi kiểu *spaghetti code* một chút).
{@embed: https://jsfiddle.net/tranxuanthang/sptr9g3y/118/}
# Tham khảo
1. [Tài liệu về Web Crypto API trên MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
2. [Fun Times With WebCrypto — Part 1: PBKDF2](https://medium.com/coinmonks/fun-times-with-webcrypto-part-1-pbkdf2-815b1c978c9d)
3. [Building an App with WebCrypto in 2016 – Dos and Don’ts from the Front](https://www.boxcryptor.com/en/blog/post/building-an-app-with-webcrypto-in-2016/)