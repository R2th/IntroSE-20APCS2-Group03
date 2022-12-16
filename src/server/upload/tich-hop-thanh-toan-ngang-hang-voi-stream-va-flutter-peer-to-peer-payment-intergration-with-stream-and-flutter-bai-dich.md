![image.png](https://images.viblo.asia/511157a6-a2f1-47b5-b605-37f6be738a78.png)
Tích hợp thêm thanh toán ngang hàng (P2P Payment) vào ứng dụng Flutter tạo ra trải nghiệm in-app phong phú hơn cho người dùng cuối của bạn. Tuy nhiên, bạn cần đảm bảo quá trình thanh toán của mình diễn ra nhanh chóng và an toàn. <br>
Trong hướng dẫn này, bạn sẽ học cách làm thế nào để tích hợp giải pháp thanh toán ngang hàng cho ứng dụng Chat Stream Flutter sử dụng ví điện tử in-app cung cấp cả tốc độ và bảo mật. <br>
Hướng dẫn sẽ đi vào chi tiết những phần sau:<br>
* Dịch vụ thanh toán ngang hàng là gì?
* Cài đặt môi trường cho app Stream Flutter của bạn : <br>
1.Cài đặt Stream<br>
2.Cài đặt Rapyd
* Tạo app Flutter 
* Thêm một Tiện ích hành động tùy chỉnh
* Thêm một chức năng đầu vào thanh toán
* Thêm bản xem trước hình thu nhỏ của tệp đính kèm
* Tạo một ví điện tử với ứng dụng Rapyd phía khách:<br>
1.Tạo một chữ ký<br>
2.Chuyển tiền<br>
3.Xác nhận một giao dịch
* Thực hiện một giao dịch
* Tạo bản xem trước tệp đính kèm tủy chỉnh
* Kết thúc
## Dịch vụ thanh toán ngang hàng là gì?
Dịch vụ thanh toán ngang hàng (P2P payment services) cung cấp một nền tảng an toàn để người dùng cuối thực hiện các giao dịch tài chính in-app với người dùng hoặc với doanh nghiệp khác (Venmo, Zelle hay PayPal, ở Việt Nam có ví Momo, ZaloPay, ViettelPay, Moca và rất nhiều).<br>
Để những giao dịch di động này khả thi, người dùng phải liên kết thẻ tín dụng hoặc chi tiết tài khoản ngân hàng vào tài khoản ứng dụng của họ. Khi bạn gửi cho một người dùng khác một khoản thanh toán, họ có thể giữ tài khoản thanh toán P2P trong ví điện tử để sử dụng trong tương lai hoặc chuyển khoản đó vào tài khoản ngân hàng của họ.<br>
## Cài đặt môi trường cho ứng dụng chat Stream Flutter
Trước khi bắt đầu, bạn cần có:
* Tài khoản stream để truy cập Stream Chat Messaging API.
* Tài khoản Rapyd để tạo các thanh toán P2P sử dụng Rapyd Wallet API.
### Cài đặt Stream
Nếu bạn chưa có tài khoản Stream nào, bạn có thể bắt đầu bản dùng thử Stream's Chat Messaging (1 tháng).<br>
> Nếu bạn đang làm dự án cá nhân hoặc làm chủ một doanh nghiệp nhỏ, bạn có thể đăng kí một tài khoản [Stream Maker Account](https://getstream.io/maker-account/) và truy cập Stream Chat miễn phí vô thời hạn <br>
Sau khi tạo xong tài khoản Stream, bạn có thể xem bảng điều khiển và ứng dụng đầu tiên của bạn.<br>![image.png](https://images.viblo.asia/422d93b9-4726-4146-b972-847507d9f50f.png)
App của bạn sẽ có: <br>
* **API Key **
* **Secret**<br>
**API Key** của bạn chỉ là định danh app thôi và nó an toàn để chia sẻ công khai. **Secret** giúp bạn sinh ra những chuỗi token xác thực người dùng và nên giữ riêng tư.<br>
Từ bảng điều khiển này, bạn cũng có thể chỉnh sửa tên app và tạo những app mới khác.<br>
###Cài đặt Rapyd
Bạn sẽ cần một tài khoản Rapyd để tạo giải pháp thanh toán P2P sử dụng API của ví Rapyd<br>
Sau khi đăng ký, bạn sẽ được điều hướng về **Rapyd Client Portal (*Cổng khách hàng Rapyd* )***<br>
Trong cổng khách hàng:
1. Bật nút  **Sandbox**(điều này cung cấp cho bạn dữ liệu mẫu để làm việc, để bạn có thể kiểm tra các giao dịch bằng ví thử nghiệm của họ) ![image.png](https://images.viblo.asia/1eb6d996-ce11-449e-bb02-b57f71efede7.png)
2. Đến trang **Developers** và lưu lại **Secret Key** và **Access Key** (cả hai đều yêu cầu để truy cập vào API của Rapyd từ app của bạn). ![image.png](https://images.viblo.asia/3452987b-a23a-43eb-99d2-b3e70b79c03a.png)
## Tạo app Flutter của bạn
Trong cửa sổ terminal, tạo một project Flutter bằng lệnh sau:<br>
```
flutter create stream_payment
```
**⚠️Lưu ý:** Hướng dẫn thử nghiệm này dùng Flutter bản 2.2.3<br>
Mở project trong IDE mà bạn ưa thích, và thêm các pakages sau vào file `pubspec.yaml` :
```
dependencies:
  stream_chat_flutter: ^2.0.0-nullsafety.8
  http: ^0.13.3
  loading_overlay: ^0.3.0
```
Thay thế code trong file `main.dart` bằng dưới đây:
```
import 'package:flutter/material.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

import 'screens/channel_list_page.dart';
import 'secrets.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final client = StreamChatClient(
    STREAM_KEY,
    logLevel: Level.OFF,
  );

  const USER_ID = 'sbis04';

  await client.connectUser(
    User(
      id: USER_ID,
      extraData: {
        'name': 'Souvik Biswas',
        'image': '<https://i.pravatar.cc/150?img=8>',
      },
    ),
    USER_TOKEN,
  );

  final channel = client.channel('messaging', id: 'p2p-payment');
  await channel.watch();

  runApp(MyApp(client, channel));
}

class MyApp extends StatelessWidget {
  final StreamChatClient client;
  final Channel channel;

  MyApp(this.client, this.channel);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      builder: (context, widget) {
        return StreamChat(
          child: widget!,
          client: client,
        );
      },
      debugShowCheckedModeBanner: false,
      home: ChannelListPage(channel),
    );
  }
}
```
*Giải thích code:* Trong đoạn code trên, bạn đã:
1.  Khởi tạo một **StreamChatClient** dùng Flutter SDK của Stream.
2.  Kết nối người dùng và cài đặt kênh bằng **StreamChatClient**.
3.  Gọi công cụ khởi tạo **StreamChat** bên trong `MyApp` và hiển thị **ChannelListPage**, cái mà chứa một danh sách kênh cho app Stream của bạn.
**STREAM_KEY** và **USER_TOKEN** được định nghĩa trong `secrets.dart`, như sau:<br>
```
// Stream secrets
const STREAM_KEY = 'key-here';
const USER_TOKEN = 'user-token-here';
```
Để lấy **STREAM_KEY** và **USER_TOKEN**:
1. Copy **API Secret** của bạn từ bảng điều khiển Stream.
2. Đi đến Stream's User JWT Generator.
3. Trong trường **Your secret**, dán **API Secret** vào.
4. Trong trường **User ID**, nhập chuỗi duy nhất để định danh người dùng của bạn.
 ![image.png](https://images.viblo.asia/8bf939b1-2781-48f7-b480-4662601bdece.png)
<br>
**⚠️Lưu ý:** Trong kịch bản production, bạn phải sinh token dử dụng server của bạn và server SDKs của Stream. Bạn đừng bao giờ nên hardcode token trong ứng dụng production.<br>
Kế tiếp, bạn sẽ hiển thị một danh sách kênh nơi mà người dùng hiện tại là một thành viên. Sẽ tốt hơn khi chia code thành nhiều file để dễ maintain hơn khi khối lượng code lớn lên.<br>
Tạo file mới lấy tên là `channel_list_page.dart` và thêm vào code sau:
```
import 'package:flutter/material.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

import 'channel_page.dart';

class ChannelListPage extends StatelessWidget {
  final Channel channel;

  const ChannelListPage(this.channel);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Stream Chat'),
      ),
      body: ChannelsBloc(
        child: ChannelListView(
          filter: Filter.in_('members', [StreamChat.of(context).user!.id]),
          sort: [SortOption('last_message_at')],
          pagination: PaginationParams(limit: 30),
          channelWidget: Builder(
            builder: (context) => ChannelPage(channel),
          ),
        ),
      ),
    );
  }
} 
```
Để hiển thị màn hình danh sách tin nhắn, tạo file mới tên là `channel_page.dart` và thêm vào code sau:
```
import 'package:flutter/material.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

class ChannelPage extends StatelessWidget {
  final Channel channel;
  const ChannelPage(this.channel);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: ChannelHeader(),
      body: Column(
        children: <Widget>[
          Expanded(
            child: MessageListView(),
          ),
          MessageInput(),
        ],
      ),
    );
  }
}
```
Chú ý rằng bạn đã truyền biến `channel` vào như là một đối số của hàm tạo ; bạn sẽ cần nó cho những phần sau này.<br>
Nếu bạn chạy app lúc này, bạn sẽ nhận thấy rằng - chỉ mới một lượng nhỏ code - bạn đã có một app nhắn tin tương đối mạnh mẽ và hoàn thiện bởi các chức năng cần thiết 😎.<br>
https://i.imgur.com/tU2p2pO.gif?auto=format&fit=clip&ixlib=react-9.0.3&w=798
## Thêm một Công cụ Tùy chỉnh Hành động (Custom Action Widget)
Tiếp theo, thêm một công cụ tùy chỉnh hành động để thuật tiện hơn cho người dùng khi kích hoạt một thanh toán. Ví dụ, trong **MessageInput** bạn có thể thêm một **IconButton** như dưới đây:<br>
![image.png](https://images.viblo.asia/d6147768-3374-4678-a261-86056a4a87c9.png)
Để thêm một **IconButton**, thêm đối số tùy chỉnh `actions` vào `channel_page.dart`:
```
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: ChannelHeader(),
    body: Column(
      children: <Widget>[
        Expanded(
          child: MessageListView(),
        ),
        MessageInput(
          actions: [
            IconButton(
              icon: Icon(Icons.payment),
              onPressed: _onPaymentRequestPressed,
            ), // custom action
          ],
        ),
      ],
    ),
  );
}
```
Tiếp theo, định nghĩa điều gì sẽ xảy ra khi người dùng chọn vào icon thanh toán. Để xử lí logic này, ta làm như sau:<br>
1.  Tạo phương thức **_onPymentRequestPressed()**
2.  Trong phương thức này, tạo một màn **TransactionPage** mà cho phép người dùng nhập vào số tiền mà họ sẽ gửi.
3.  Tạo một phương thức **PageRouteBuilder** mà bao quanh tiện ích bằng một hình nền bán trong suốt (semi-transparent background).
```
Future<void> _onPaymentRequestPressed() async {
  final String? amount = await Navigator.of(context).push(
    PageRouteBuilder(
      opaque: false,
      pageBuilder: (_, __, ___) => TransactionPage(
        destinationWalletAddress: 'ewallet-123',
      ),
    ),
  );
}
```
**⚠️Lưu ý:** Vào thời điểm này, bạn dùng một placeholder cho ví đích. Bạn sẽ update cái placeholder này sau khi định nghĩa Rapyd khách.<br>
Sau khi nhận được số lượng:<br>
1. Tạo một **Attachment (*file đính kèm*)** Stream Chat.
2. Phân loại **type *(loại*)** để thanh toán **(payment)**.
3. Đặt **extraData** là key của **amount** và value đặt thành **amount** mà người dùng vừa nhập vào.
```
Future<void> _onPaymentRequestPressed() async {
  // ...

  if (amount != null) {
    _messageInputKey.currentState?.addAttachment(
      Attachment(
        type: 'payment',
        uploadState: UploadState.success(),
        extraData: {"amount": int.parse(amount)},
      ),
    );
  }
}
```
Để làm điều này, tạo một **GlobalKey**:
```
class _ChannelPageState extends State<ChannelPage> {
  GlobalKey<MessageInputState> _messageInputKey = GlobalKey();
  // ...
}
```
Sau đó, đặt **key** cho `MessageInput`:
```
MessageInput(
  key: _messageInputKey, // add key here
  actions: [
    IconButton(
      icon: Icon(Icons.payment),
      onPressed: _onPaymentRequestPressed,
    ),
  ],
)
```
## Thêm đầu vào cho chức năng thanh toán
Tiếp theo, bạn sẽ tạo hàng loạt các elements cho tất cả chức năng thanh toán.<br>
Đầu tiền, tạo **TransactionPage** nơi mà người dùng có thể nhập vào số tiền giao dịch.<br>
Màn hình này sẽ chứa một `TextField` để lấy input từ người dùng và xem trước địa chỉ ví đích sẽ truyền vào.<br>
![image.png](https://images.viblo.asia/88543976-a11e-4345-8a18-7c4f74b26695.png)
Tạo một file lấy tên là `transaction_page.dart`, và thêm vào code sau:
```
import 'package:flutter/material.dart';

class TransactionPage extends StatelessWidget {
  final String destinationWalletAddress;

  TransactionPage({required this.destinationWalletAddress});

  final TextEditingController _amountTextController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black26,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.only(left: 16.0, right: 16.0),
          child: Container(
            width: double.maxFinite,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20.0),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: double.maxFinite,
                  decoration: BoxDecoration(
                    color: Color(0xFF4161ff),
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(20.0),
                      topRight: Radius.circular(20.0),
                    ),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Sending To',
                          style: TextStyle(
                            color: Colors.white70,
                            fontSize: 16.0,
                          ),
                        ),
                        SizedBox(height: 4),
                        Text(
                          destinationWalletAddress,
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 14.0,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Container(
                    width: 150,
                    child: TextField(
                      // textAlign: TextAlign.center,
                      controller: _amountTextController,
                      decoration: InputDecoration(
                        isDense: true,
                        prefixIcon: Padding(
                          padding: const EdgeInsets.only(right: 4.0),
                          child: Text(
                            '\\$',
                            style: TextStyle(fontSize: 40.0),
                          ),
                        ),
                        prefixIconConstraints:
                            BoxConstraints(minWidth: 0, minHeight: 0),
                      ),
                      keyboardType: TextInputType.number,
                      style: TextStyle(fontSize: 80.0),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Container(
                    width: double.maxFinite,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        primary: Color(0xFF4161ff),
                      ),
                      onPressed: () {
                        if (_amountTextController.text != '') {
                          Navigator.pop(context, _amountTextController.text);
                        }
                      },
                      child: Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Text(
                          'Pay',
                          style: TextStyle(color: Colors.white, fontSize: 24.0),
                        ),
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```
## Tạo một tệp đính kèm xem trước thu nhỏ
Để hiển thị tệp đình kèm xem trước thu nhỏ tùy chỉnh, bạn phải dùng thuộc tính `attachmentThumnailBuilders` bên trong công cụ `MessageInput`. Điều này để bạn tạo ra một  công cụ tùy chỉnh để hiển thị thanh toán xem trước trong khi người dùng nhập đang soạn trong tin nhắn mà họ muốn gửi kèm nó.<br>
```
MessageInput(
  key: _messageInputKey,
  attachmentThumbnailBuilders: {
    'payment': (context, attachment) => TransactionAttachment(
          amount: attachment.extraData['amount'] as int,
        )
  },
  actions: [
    IconButton(
      icon: Icon(Icons.payment),
      onPressed: _onPaymentRequestPressed,
    ),
  ],
)
```
Chèn code vào công cụ **TransactionAttachment**:
```
class TransactionAttachment extends StatelessWidget {
  final int amount;

  const TransactionAttachment({required this.amount});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Color(0xFF4161ff),
      width: double.maxFinite,
      height: 300,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.payment,
            color: Colors.white,
            size: 40,
          ),
          SizedBox(width: 8),
          Column(
            children: [
              Text(
                '$amount USD',
                style: TextStyle(color: Colors.white, fontSize: 20.0),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
```
Dưới đây là ví dụ đính kèm với số tiền **5$**:
![image.png](https://images.viblo.asia/0d654477-e267-4e13-99fc-f8f5e5abb49a.png)
Với những cài đặt UI căn bản để xử lí thanh toán, bạn có thể tích hợp thanh toán P2P với ví Rapyd<br>
## Tạo một ví điện tử với Rapyd Client của bạn
Bạn phải dùng ví để xử lí thanh toán và kích hoạt giao dịch giữa những người dùng. Khi đã bật **Sandbox** trong **Rapyd Client Portal**, bạn có thể truy cập số lượng ví mẫu với số lượng **Account Balance *(số dư tài khoản*
)** mặc định.<br>
![image.png](https://images.viblo.asia/97c8c4f3-2f1b-4235-91f4-25543393f051.png)
Bạn có thể chọn 2 ví bất kì. Bạn sẽ chọn một ví là ví nguồn **source wallet** (ví gửi thanh toán) và ví kia là ví đích **destination wallet**(ví nhận thanh toán).<br>
Vì địa chỉ ví là duy nhất cho mỗi user, bạn có thể lưu địa chỉ ví là **extra data** trong tài khoản người dùng Stream.<br>
Trong file `main.dart`, truyền vào địa chỉ ví nguồn trong `extraData` của **User**:
```
// replace with your source wallet address
const String _myWalletId = 'ewallet_3d63cc520dff85b043914de569390fd1';
const USER_ID = 'sbis04';

await client.connectUser(
  User(
    id: USER_ID,
    extraData: {
      'wallet_id': _myWalletId, // pass it here
      'name': 'Souvik Biswas',
      'image': '<https://i.pravatar.cc/150?img=8>',
    },
  ),
  USER_TOKEN,
);
```
Điều này sẽ lưu địa chỉ ví được chỉ định, cho người dùng này, trong cơ sở dữ liệu của Stream. Một cách tương tự, bạn có thể tạo một người dùng khác với địa chỉ ví riêng trên Stream. Dưới đây là demo hiển thị nhiều người dùng và thông tin của họ:<br>
Để xem người dùng của bạn:<br>
1. Đi đến **Stream Dashboard**.
2. Chọn **Options**.
3. Chọn **Open in Chat Explorer**.
Để tạo **Rapyd Client**, tạo một file tên là `apyd_client.dart` và định nghĩa lớp `RapydClient` bên trong nó như sau:<br>
```
class RapydClient {
  final _baseURL = '<https://sandboxapi.rapyd.net>';
  final _accessKey = RAPYD_ACCESS_KEY;
  final _secretKey = RAPYD_SECRET_KEY;

  // ...
}
```
Lấy **Access Key** và **Secret Key** Rapyd của bạn trong Rapyd Client Portal và lưu chúng bên trong file `secrets.dart`:
```
// Rapyd secrets
const RAPYD_ACCESS_KEY = 'access-key-here';
const RAPYD_SECRET_KEY = 'secret-key-here';
```
### Sinh một chữ ký (Generate a signature)
Để sử dụng Rapyd API, bạn phải tính toán và truyền vào một chữ kí trong request headers. Công thức được cung cấp bởi Rapyd để tính toán chữ ký như sau:
```
signature = BASE64 ( HASH ( http_method + url_path + salt + timestamp + access_key + secret_key + body_string ) )
```
**⚠️Lưu ý:** Vui lòng xem [Rapyd documentation](https://docs.rapyd.net/build-with-rapyd/docs) để biết thêm các ví dụ và cân nhắc về bảo mật.<br>
Quá trình này sẽ có một chút khó khăn để thực thi chính xác bằng cách sử dụng Dart, nhưng đây là toàn bộ quá trình sinh chữ ký:
```
Map<String, String> _generateHeader({
  required String method,
  required String endpoint,
  String body = '',
}) {
  int unixTimetamp = DateTime.now().millisecondsSinceEpoch;
  String timestamp = (unixTimetamp / 1000).round().toString();

  var salt = _generateSalt();

  var toSign = method + endpoint + salt + timestamp + _accessKey + _secretKey + body;

  var keyEncoded = ascii.encode(_secretKey);
  var toSignEncoded = ascii.encode(toSign);

  var hmacSha256 = Hmac(sha256, keyEncoded); // HMAC-SHA256
  var digest = hmacSha256.convert(toSignEncoded);
  var ss = hex.encode(digest.bytes);
  var tt = ss.codeUnits;
  var signature = base64.encode(tt);

  var headers = {
    'Content-Type': 'application/json',
    'access_key': _accessKey,
    'salt': salt,
    'timestamp': timestamp,
    'signature': signature,
  };

  return headers;
}

String _generateSalt() {
  final _random = Random.secure();
  // Generate 16 characters for salt by generating 16 random bytes
  // and encoding it.
  final randomBytes = List<int>.generate(16, (index) => _random.nextInt(256));
  return base64UrlEncode(randomBytes);
}
```
 Phương thức `_genetateHeader` được dùng để tạo ra các headers đúng, đặc biệt là chữ ký **signature**. Điều này yêu cầu phương thức `HTTP`, **endpoint**, và **JSON data** (nếu có) để tạo chữ kí chính xác.<br>
 ### Giao dịch tiền
 Với một phần khó khăn, bạn có thể tạo một phương thức giao dịch tiền từ một ví sang ví khác.<br>
 Điều này yêu cầu địa chỉ ví nguồn, địa chỉ ví đích, và số tiền giao dịch.
 ```
 Future<Transfer?> transferMoney({
  required String sourceWallet,
  required String destinationWallet,
  required int amount,
}) async {
  Transfer? transferDetails;

  var method = "post";
  var transferEndpoint = '/v1/account/transfer';

  final transferURL = Uri.parse(_baseURL + transferEndpoint);

}
```
Lớp `Transfer` là một mô hình định nghĩa người dùng mà chp phét bạn lưu chi tiết của một giao dịch Rapyd, để có mô hình `Transfer`, copy+paste code từ [Peer-to-Peer Github repo.](https://github.com/sbis04/stream_payment/blob/main/lib/models/transfer.dart)<br>
Định nghĩa JSON data mà bạn sẽ gửi như là một phần của yêu cầu giao dịch:
```
Future<Transfer?> transferMoney({
  required String sourceWallet,
  required String destinationWallet,
  required int amount,
}) async {
  // ...

  var data = jsonEncode({
    "source_ewallet": sourceWallet,
    "amount": amount,
    "currency": "USD",
    "destination_ewallet": destinationWallet,
  });

}
```
Lấy headers bằng cách sử dụng phương thức `_generateHeader()` được định nghĩa sớm hơn:
```
Future<Transfer?> transferMoney({
  required String sourceWallet,
  required String destinationWallet,
  required int amount,
}) async {
  //...

  final headers = _generateHeader(
    method: method,
    endpoint: transferEndpoint,
    body: data,
  );

}
```
Bây giờ, dùng phương thức `http_post()` để gửi request đến API:
```
Future<Transfer?> transferMoney({
  required String sourceWallet,
  required String destinationWallet,
  required int amount,
}) async {
  //...

  try {
    var response = await http.post(
      transferURL,
      headers: headers,
      body: data,
    );

    print(response.body);

    if (response.statusCode == 200) {
      print('SUCCESSFULLY TRANSFERRED');
      transferDetails = Transfer.fromJson(jsonDecode(response.body));
    }
  } catch (e) {
    print('Failed to transfer amount');
  }

  return transferDetails;
}
```
Nếu gửi request thành công (mã trạng thái 200), body trả về sẽ có chứa chi tiết của giao dịch:
```
{
    "status": {
        "status": "SUCCESS",
        "operation_id": "1845c31a-c1e6-4df4-8cb2-002d2dab250b"
    },
    "data": {
        "id": "bf61f300-dc1d-11eb-b38b-02240218ee6d",
        "status": "PEN",
        "amount": 5,
        "currency_code": "USD",
        "destination_phone_number": "+611868065687",
        "destination_ewallet_id": "ewallet_3d63cc520dff85b043914de569390fd1",
        "destination_transaction_id": "",
        "source_ewallet_id": "ewallet_b57a9c68acfea31b35990d215ba0eb8c",
        "source_transaction_id": "wt_2d00834757d8255cd656379926f1ea21",
        "created_at": 1625330588
    }
}
```
Bạn có thể dán chuỗi JSON trả về và lưu nó lại ở bên trong đối tượng `Transfer`. Ví dụ, `final transfer = Transfer.fromJson(json)`.<br>
JSON trả về sẽ chứa một `transaction ID` với trạng thái **PEN** (đang chờ - pending). Để xác nhận giao dịch, bạn phải thực hiện thêm một POST request.<br>
### Xác nhận giao dịch
Để xác nhận giao dịch, bạn phải gửi một `Transfer` request đến endpoint `/v1/account/transfer/response`.<br>
Để làm vậy, bạn phải định nghĩa một phương thức mới mà lấy những tham số sau:<br>
* **ID** giao dịch *(`"id": id)
* **Status** (*"status"*: response)
```
Future<Transfer?> transferResponse({
  required String id,
  required String response,
}) async {
  Transfer? transferDetails;

  var method = "post";
  var responseEndpoint = '/v1/account/transfer/response';

  final responseURL = Uri.parse(_baseURL + responseEndpoint);

  var data = jsonEncode({
    "id": id,
    "status": response,
  });

}
```
JSON data mà bạn sẽ gửi nên chứa **ID** và **status**. Dùng phương thức `_generateHeader()` để sinh ra các header, và dùng phương thức `http.post` để gửi đi request:
```
Future<Transfer?> transferResponse({
  required String id,
  required String response,
}) async {
  // ...

  final headers = _generateHeader(
    method: method,
    endpoint: responseEndpoint,
    body: data,
  );

  try {
    var response = await http.post(
      responseURL,
      headers: headers,
      body: data,
    );

    print(response.body);

    if (response.statusCode == 200) {
      print('TRANSFER STATUS UPDATED: $response');
      transferDetails = Transfer.fromJson(jsonDecode(response.body));
    }
  } catch (e) {
    print('Failed to update transfer status');
  }

  return transferDetails;
}
```
Sau khi xác nhận giao dịch, trạng thái của nó sẽ được update thành một trong những cái sau:
* `CLO` (hoặc **closed**), nghĩa là bạn đã hoàn thành giao dịch thành công
* `DEC` (hoặc **declined**), nghĩa là bạn đã từ chối giao dịch.
Bây giờ bạn đã định nghĩa xong **Rapyd Client**, bạn có thể dùng các phương thức  trong phần tiếp theo để tạo ra một giao dịch thành công.<br>
## Thực hiện một giao dịch
Bạn nên thực hiện giao dịch trước khi gửi đi hoặc hiển thị tin nhắn bên trong `MessageListView`. Nơi tốt nhất để làm điều này là callback `preMessageSending`.
Trước khi thực hiện giao dịch, bạn phải lấy các địa chỉ ví nguồn và ví đích.<br>
Định nghĩa một phương thức tên là `getWallets()` bên trong lớp `_ChannelPageState`:
```
late final String _sourceWalletId;
late final String _destinationWalletId;

getWallets() async {
  var members = await widget.channel.queryMembers();
  var destId = members.members[1].user!.extraData['wallet_id'] as String;
  var sourceId = members.members[0].user!.extraData['wallet_id'] as String;

  _sourceWalletId = sourceId;
  _destinationWalletId = destId;
}

@override
void initState() {
  super.initState();
  getWallets();
}
```
Code này dùng `channel` để lấy các member, và lưu địa chỉ ví riêng của mỗi member tương ứng.<br>
Thực hiện giao dịch trong callback `preMessageSending`:
```
MessageInput(
  key: _messageInputKey,
  preMessageSending: (msg) => _performTransaction(msg), // this
  attachmentThumbnailBuilders: {
    'payment': (context, attachment) => TransactionAttachment(
          amount: attachment.extraData['amount'] as int,
        )
  },
  actions: [
    IconButton(
      icon: Icon(Icons.payment),
      onPressed: _onPaymentRequestPressed,
    ),
  ],
)
```
Trong phương thức `_performTransaction()`, kiểm tra xem tin nhắn có chứa tệp đính kèm với `amount` như là extra data hay không.<br>
Bằng cách này, bạn có thể xác minh là tệp đính kèm liên quan đến thanh toán.<br>
Boolean `_isSending` cho biết liệu giao dịch có đang diễn ra hay không. Nếu giao dịch đang diễn ra, không cho phép người dùng gửi bất kì tin nhắn nào, thay vào đó, hiển thị một chỉ báo tiến trình.<br>
Lấy `amount` từ tệp đính kèm và thực thi giao dịch sử dụng `RapydClient`. Nếu giao dịch thành công, cập nhật tin nhắn file đính kèm.<br>
```
RapydClient _rapydClient = RapydClient();

Future<Message> _performTransaction(Message msg) async {
  if (msg.attachments.isNotEmpty &&
      msg.attachments[0].extraData['amount'] != null) {
    setState(() {
      _isSending = true;
    });

    // Retrieve the amount
    int amount = msg.attachments[0].extraData['amount'] as int;

    // Process the transaction
    var transactionInfo = await _rapydClient.transferMoney(
      amount: amount,
      sourceWallet: _sourceWalletId,
      destinationWallet: _destinationWalletId,
    );

    // Confirm the transaction
    var updatedInfo = await _rapydClient.transferResponse(
        id: transactionInfo!.data.id, response: 'accept');

    // Update the attachment
    msg.attachments[0] = Attachment(
      type: 'payment',
      uploadState: UploadState.success(),
      extraData: updatedInfo!.toJson(),
    );

    setState(() {
      _isSending = false;
    });
  }

  return msg;
}
```
Khi giao dịch hoàn tất, gửi tin nhắn với tệp đình kèm tùy chỉnh sẽ hiển thị trong danh sách tin nhắn.<br>
## Tạo chức năng xem trước tệp đính kèm tùy chỉnh
Bạn có thể tạo tệp đính kèm tùy chỉnh và truyền nó vào `MessageListView` sử dụng thuộc tính `customAttachmentBuiders`<br>
```
MessageListView(
  customAttachmentBuilders: {'payment': _buildPaymentMessage},
)
```
Công cụ tùy chỉnh được định nghĩa trong phương thức `_buildPaymentMessage()`<br>
```
Widget _buildPaymentMessage(
  BuildContext context,
  Message details,
  List<Attachment> _,
) {
  final transaction = Transfer.fromJson(details.attachments.first.extraData);
  final transactionInfo = transaction.data;

  int amount = transactionInfo.amount;
  String destWalletAddress = transactionInfo.destinationEwalletId;
  String status = transactionInfo.status;

  return wrapAttachmentWidget(
    context,
    TransactionWidget(
      transaction: transaction,
      destWalletAddress: destWalletAddress,
      amount: amount,
      status: status,
    ),
    RoundedRectangleBorder(),
    true,
  );
}
```
Bây giờ, bạn lấy ra các thuộc tính yêu cầu của giao dịch lưu ở trong lớp `Transfer`.<br>
`TransactionWidget` sẽ hiển thị tệp đính kèm giao dịch. Lấy code cho công cụ này trong [Peer-to-peer Github repo](https://github.com/sbis04/stream_payment/blob/main/lib/widgets/transaction_widget.dart).<br>
![image.png](https://images.viblo.asia/a026749b-016b-46bd-b71d-e5c0c05d30f3.png)
Gói lại nội dung của `TransactionWidget` bằng một `InkWell` và điều hướng đến `DetailPage`.<br>
```
class TransactionWidget extends StatelessWidget {
  // ...

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.of(context).push(
          PageRouteBuilder(
            opaque: false,
            pageBuilder: (_, __, ___) => DetailPage(
              transaction: transaction,
            ),
          ),
        );
      }
      // ...

    );
  }
}
```
`DetailPage` chứa thông tin giao dịch. Bạn có thể tìm thấy UI code ở trang [Peer-to-Peer GitHub repo](https://github.com/sbis04/stream_payment/blob/main/lib/widgets/transaction_widget.dart).<br>
![image.png](https://images.viblo.asia/6d8c1d2b-cf19-4b2c-a20f-2a0266b2f04e.png)
Bước cuối cùng yêu cầu cờ Boolean (`_isSending`) bạn dùng để chỉ ra tiến trình giao dịch.<br>
Dùng cờ Boolean để cập nhật UI bằng cách hiển thị chỉ báo tiến trình với sự trợ giúp của gói `loading_overlay`.<br>
Gói lại nội dung của `Scaffold` với công cụ `LoadingOverlay` và sử dụng Boolean để chỉ ra liệu giao dịch có đang trong quá trình hay không.
```
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: ChannelHeader(),
    body: LoadingOverlay(
      isLoading: _isSending,
      color: Colors.black,
      // ...
    ),
  );
}
```
Xem quá trình giao dịch trong hành động: [tại đây](https://i.imgur.com/AzSZtwd.gif?auto=format&fit=clip&ixlib=react-9.0.3&w=798) <br>

## Tóm lại
Chúc mừng🎉, bạn đã triển khai thành công một giải pháp thanh toán ngang hàng sử dụng Fluuter SDK của Stream và API của ví Rapyd.<br>
Người dùng hiện nay có thể gửi và nhận thanh toán bên trong ứng dụng nhắn tin của bạn.
Link bài viết gốc: https://getstream.io/blog/p2p-integration-with-flutter/