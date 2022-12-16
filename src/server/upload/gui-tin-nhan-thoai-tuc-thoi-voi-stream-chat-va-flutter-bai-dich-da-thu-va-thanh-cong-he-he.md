Hiện nay có rất nhiều ứng dụng nhắn tin cho phép chúng ta gửi những ghi chú thoại như là những tin nhắn. Trong hướng dẫn này, bạn sẽ học được cách gửi các ghi chú thoại, hoặc tệp audio đính kèm, trong ứng dụng Stream Chat Flutter của bạn. Đến cuối cùng, ứng dụng của bạn sẽ có tính năng trải nghiệm trò chuyện như ở [đây](https://www.youtube.com/watch?v=aPso8biCl6s) <br> Hướng dẫn này sẽ có những phần chi tiết sau:
* Cài đặt tài khoản Stream
* Tạo tài khoản người dùng demo
* Tắt xác thực cho sự phát triển (*Disable Authentication for Development*)
* Cài đặt tài khoản flutter
* Tạo một trang danh sách kênh (*Channel List Page*)
* Tạo một trang kênh để xem các tin nhắn
* Tạo một tiện ích hành động tùy chỉnh để ghi lại ghi chú bằng giọng nói (*Custom Action Widget*)
* Thêm trình tạo tệp đính kèm tùy chỉnh
## Cài đặt tài khoản Stream của bạn
Để bắt đầu, bạn sẽ cần một [tài khoản Stream](https://getstream.io/try-for-free/) để truy cập vào Strean Chat Messaging API. Nếu chưa có sẵn tài khoản Stream nào, bạn có thể đăng kí để có 30 ngày dùng thử miễn phí 
> *Nếu bạn đang làm dự án cá nhân hoặc làm chủ một doanh nghiệp nhỏ, bạn có thể đăng kí một [tài khoản Stream Maker](https://getstream.io/maker-account/) và truy cập Stream Chat miễn phí vô thời hạn*<br> 

![image.png](https://images.viblo.asia/65d2d214-1707-48fc-865a-4f0ee9f97ae1.png)
Sau khi tạo xong tài khoản, tạo mới 1 app và đặt tên cho nó:
1. Vào [Stream Dashboard](https://dasboard.getstream.io/) của bạn
2. Chọn **Create App**
3. Đặt tên **App Name** (như **Audio Attachment Demo** trong ví dụ)
4. Cài đặt **Feeds Server Location**
5. Chọn **Development** ở **Environment**
6. Bấm **Create App**<br>
![image.png](https://images.viblo.asia/8df51a24-5fb8-4c6e-9f40-3397fa457426.png) <br>
Sau khi tạo app, bạn sẽ thất nó được liệt kê trong bảng điều khiển Stream của bạn cùng với **API KEY** và **Secret** tương ứng.
![image.png](https://images.viblo.asia/c81e9ef1-d462-443a-bc1b-cfcedee5463e.png) <br>
**API Key** của bạn chỉ là cái để định danh app và nó an toàn để chia sẻ công khai. **Secret** của bạn giúp sinh ra những tokens người dùng được xác thực và nên giữ riêng tư. <br>
Từ bảng điều khiển này, bạn có thể sỉnh sửa app, truy cập dữ liệu, và tạo những app mới.<br>
## Tạo những tài khoản người dùng Demo
Stream cung cấp rất nhiều phương thức tạo tài khoản người dùng. Trong môi trường production, bạn nên lí tưởng hóa việc quản lí tạo người dùng và sinh token ở phía server. <br>
Tuy nhiên, vì mục đích là làm demo, nên nó dễ dàng hơn để tạo các tài khoản trên bảng điều khiển Stream của bạn (*Stream Dashboard*) <br>
Để tạo một tài khoản demo mới cho Stream app:
1. Vào **Audio Attachment Demo** (*vừa tạo*).
2. Trong menu bảng điều khiển nav, chọn **Open in Chat Explorer**. (Cái này sẽ dẫn bạn đến bảng điều khiển **Explorer**, nơi mà có thể tạo các kênh và người dùng) <br> ![image.png](https://images.viblo.asia/3359ecc0-70b3-4ae8-b87a-440a683c7bb8.png)
3. Chọn **Users**, sau đó **Create New User**.
4. Trong cửa sổ **Create New User**, nhập **User Name** và **User Id**.
5. Trong dropdown menu **User Application Role**, chọn **User** <br>
<br>
![image.png](https://images.viblo.asia/6feb1111-1736-4f6b-9ff2-da478185da19.png)![image.png](https://images.viblo.asia/b03c99b8-f00a-4084-9e42-cbc687854562.png)
Bạn có thể tạo bao nhiêu tài khoản mà bạn thích cho app demo của bạn
## Tắt Xác thực cho Phát triển (*Disable Authentication for Development*)
Bất cứ tài khoản nào bạn tạo ra sẽ yêu cầu mã token xác thực để truy cập được vào Stream API. Vì ta đang làm demo thoi, nên là bạn nên tắt những kiểm tra xác thực này đi và thay vào đó là dùng tokens của developer <br>
Để tắt xác thực cho tài khoản của bạn:
1. Vào **Audio Attachment Demo** app.
2. Trong menu bảng điều khiển nav, chọn **Chat**.
3. Từ dropdown **Chat**, chọn **Overview**.
4. Lăn xuống phần **Authentication**.
5. Bật nút toggle **Disable Auth Checks**.
6. Đừng quên bấm **Save** nhé.
![image.png](https://images.viblo.asia/8de56545-1f2b-4bdc-9d7a-68cf0f77edc2.png)
Nếu bạn không muốn tắc xác thực, bạn có thể dễ dàng sử dụng sinh những mã token bằng [Stream’s User JWT Generator](https://getstream.io/chat/docs/react/token_generator/).
![image.png](https://images.viblo.asia/e380c10e-e6ea-4dd7-9f55-51d9f62e96b0.png)<br>
⚠️**Ghi chú**: Trong kịch bản production, bạn bắt buộc phải sinh một token cho server của bạn và một trong các máy chủ SDKs của Stream. Bạn đừng bao giờ nên hardcode mã token người dùng cho một ứng dụng production, việc này giống như đi chơi gái mà không dùng bao vậy, sida lúc nào không ai biết đâu, anh Hoàng Code dạo đã từng nói vậy đấy 🤣.
## Cài đặt Flutter App của bạn
Nếu bạn mới làm quen Stream (*như mình*), hãy xem qua [Stream Flutter Chat tutorial](https://getstream.io/chat/flutter/tutorial/) để có những giới thiệu kĩ lưỡng với tất cả các components căn bản có sẵn cho bạn.<br>
Không thì, tiếp tục và tạo nột ứng dụng Flutter từ terminal hoặc IDE ưa thích của bạn bằng câu lệnh sau: <br>
```
flutter create audio_attachment_tutorial
```
**Ghi chú**: Bài hướng dẫn này dùng Flutter version 2.2.3 <br>
Mở dự án và thêm những dòng này vào trong file `pubspec.yaml` của bạn?<br>
```
just_audio: ^0.9.6
record: ^3.0.0
stream_chat_flutter: ^2.2.0
```
**Ghi chú**: Những phiên bản trong tương lai có thể có những thay đổi đột phá.<br>
Tạo file `config.dart` và thêm code sau:
```
// Stream config
import 'package:flutter/material.dart';

const streamKey = 'p64gqrwac8k4';

const userGordon = DemoUser(
  id: 'gordon',
  name: 'Gordon Hayes',
  image:
      'https://pbs.twimg.com/profile_images/1262058845192335360/Ys_-zu6W_400x400.jpg',
);

const userSalvatore = DemoUser(
  id: 'salvatore',
  name: 'Salvatore Giordano',
  image:
      'https://pbs.twimg.com/profile_images/1252869649349238787/cKVPSIyG_400x400.jpg',
);

@immutable
class DemoUser {
  final String id;
  final String name;
  final String image;

  const DemoUser({
    required this.id,
    required this.name,
    required this.image,
  });
}
```
*Giải thích code* -Trong đoạn trích trên, bạn đã:<br>
1. Set key duy nhất **App key** cho hằng `streamKey`. (Bạn có thể lấy key duy nhất này từ bảng điều khiển của app trong Stream.)
2. Tạo một model **DemoUser** để lưu thông tin người dùng.
3. Tạo mới 2 demo user. Cái này nên dùng giống với **ids** mà bạn đã set trong bảng điều khiển Stream. (Lưu ý là bạn đang hardcode cho **name** và **image**; lí tưởng lên, những giá trị này nên được set dùng server của bạn và một server SDKs của Stream.)<br>
Thay thế code trong `main.dart` bằng những dòng sau:<br>
```
import 'package:flutter/material.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

import 'channel_list_page.dart';
import 'config.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  final client = StreamChatClient(streamKey);

  runApp(MyApp(client: client));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key, required this.client}) : super(key: key);

  final StreamChatClient client;

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
      home: const SelectUserPage(),
    );
  }
}

class SelectUserPage extends StatelessWidget {
  const SelectUserPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  'Select a user',
                  style: TextStyle(fontSize: 24),
                ),
              ),
              SelectUserButton(user: userGordon),
              SelectUserButton(user: userSalvatore),
            ],
          ),
        ),
      ),
    );
  }
}

class SelectUserButton extends StatelessWidget {
  const SelectUserButton({
    Key? key,
    required this.user,
  }) : super(key: key);

  final DemoUser user;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        final client = StreamChat.of(context).client;
        await client.connectUser(
          User(
            id: user.id,
            extraData: {
              'name': user.name,
              'image': user.image,
            },
          ),
          client.devToken(user.id).rawValue,
        );
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => const ChannelListPage()),
        );
      },
      child: Text(user.name),
    );
  }
}
```
*Giải thích code* -Trong đoạn trích trên, bạn đã:<br>
1. Khởi tạo một **StreamChatClient** sử dụng Flutter SDK của Stream.
2. Tạo một tiện ích **MyApp** vơi thuộc tính **home** được set thành **SlectUserPage**, và gói ứng dụng bằng một trình tạo mà tạo ra một tiện ích con **StreamChat**, tiện ích này xử lí rất nhiều logic phần chat.
3. Tạo các tiện ích **SelectUserPage** và **SelectUserButton**, 2 cái này hiển thị 2 tài khoản demo để chọn.
4. Tạo một trình xử lí **onPressed** để kết nối với một người dùng Stream khách. (Bạn chỉ có thể gọi đến `client.devToken(user.id)` - `devToken` nếu bạn đã tắt trình xác thực (Authentication)
5. Điều houowngs người dùng đến **ChannelListPage** sau khi kết nối chúng. Cái **ChannelListPage** này liệt kê ra tất tần tật các kênh (channel) cho app Stream của bạn.<br>![image.png](https://images.viblo.asia/d110feec-f573-47a1-8f9d-adf515848967.png)
## Tạo một trang để liệt kê tất cả các kênh (Channel)
Tiếp theo, bạn sẽ hiển thị một danh sách các kênh nơi mà người dùng hiện tại là một member. Nó sẽ tốt hơn nết chia code thành nhiều file để dễ maintain hơn khi khối lượng code lớn.<br>
Tạo một file tên là `channel_list_page.dart` and thêm những dòng sau vào:<br>
```
import 'package:audio_attachment_tutorial/main.dart';
import 'package:flutter/material.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

import 'channel_page.dart';

class ChannelListPage extends StatelessWidget {
  const ChannelListPage({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Stream Chat'),
        actions: [
          GestureDetector(
            onTap: () async {
              await StreamChat.of(context).client.disconnectUser();
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) => const SelectUserPage()),
              );
            },
            child: const Padding(
              padding: EdgeInsets.all(8.0),
              child: Center(
                child: Text('Switch user'),
              ),
            ),
          )
        ],
      ),
      body: ChannelsBloc(
        child: ChannelListView(
          emptyBuilder: (conext) {
            return Center(
              child: ElevatedButton(
                onPressed: () async {
                  final channel = StreamChat.of(context).client.channel(
                    "messaging",
                    id: "test-gordon",
                    extraData: {
                      "name": "Flutter Chat",
                      "image":
                          "https://flutter.dev/assets/images/shared/brand/flutter/logo/flutter-lockup.png",
                      "members": [userGordon.id, userSalvatore.id]
                    },
                  );
                  await channel.create();
                },
                child: const Text('Create channel'),
              ),
            );
          },
          filter:
              Filter.in_('members', [StreamChat.of(context).currentUser!.id]),
          sort: const [SortOption('last_message_at')],
          pagination: const PaginationParams(limit: 30),
          channelWidget: const ChannelPage(),
        ),
      ),
    );
  }
}
```
*Giải thích code* -Trong đoạn trích trên, bạn đã:<br>
1. Tạo một **Scaffold** với **body** được set là một dánh sách các kênh và một nút trong thuộc tính **actions** để ngắt kết nối với user hiện tại và điều hướng cho nó back lại **SelectUserPage**.
2. Tạo 2 tiện ích (*Widget*) **ChannelsBloc** và **ChannelListView** (được cung cấp bởi các gói Stream) mà 2 tiện ích này sẽ hiển thị tất cả các kênh cho app Stream.
3. Tạo một **emptyBuilder**, bạn trả về một nút (*button*) mà nó tạo ra một kênh và đặt các members là các user bạn đã tạo.)
4. Chỉ định trang mở ra khi một kênh được chọn trong thuộc tính **channelWidget**, đặt nó thành **ChannelPage** (một tiện ích tùy chỉnh mà bạn sẽ tạo tiếp).
5. Thêm một **filter** để chỉ hiển thị những kênh nơi mà người dùng hiện tại là member.
6. Thêm **sort** (*sắp xếp*) và **pagination** (*phân trang*), cái mà bạn có thể tùy chỉnh khi cần thiết.<br>
 ![image.png](https://images.viblo.asia/0fc1a831-367d-483f-bb0b-98e058311135.png)
## Tạo một trang kênh để xem các tin nhắn
Để hiển thị danh sách tin nhắn, tạo một file mới có tên là `channel_page.dart` và thêm code sau vào: <br>
```
import 'package:flutter/material.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

class ChannelPage extends StatefulWidget {
  const ChannelPage({
    Key? key,
  }) : super(key: key);

  @override
  _ChannelPageState createState() => _ChannelPageState();
}

class _ChannelPageState extends State<ChannelPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const ChannelHeader(),
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
```
*Giải thích code* -Trong đoạn trích trên, bạn đã:<br>
1. Tạo một **Scaffold** cho trang mới.
2. Đặt **appBar** thành **ChannelHeader** (điều này để hiển thị tên kênh và hình ảnh).
3. Tạo một **Column** với một **MessageListView** được mở rộng (một danh sách mà hiển thị tất cả các kênh nhắn tin, hình ảnh, và file đính kèm tùy chỉnh).
4. Tạo một **MessageInput** ở dưới **Column**, cái mà sẽ được dùng để gửi những tin nhắn mới và các tệp đính kèm cho kênh.<br>
Nếu bạn chạy app lúc này, bạn sẽ tìm thấy - chỉ với một ít code - là bạn đã có một ứng dụng nhắn tin khá mạnh với đầy đủ các chức năng cần thiết.<br>
Bây giờ, bạn đang ở điểm mà có thể thêm các chức năng để hỗ trợ tin nhắn thoại. 
## Thêm một tiện ích hành động tùy chỉnh (*Custom Action Widget*) để ghi lại ghi chú bằng giọng nói
Để hỗ trợ tin nhắn thoại, bạn sẽ thêm một tiện ích hành động tùy chỉnh để người dùng có thể ghi lại một ghi chú bằng giọng nói và gửi nó như là một tin nhắn. Kết thúc phần này, tiện ích của bạn trông như thế này:<br>
![image.png](https://images.viblo.asia/f376ba64-9ce0-4ef6-8f9a-b2a4d9ee30bf.png)
Trong `MessageInput` của bạn cung cấp hành động tùy chỉnh sau:<br>
```
MessageInput(
  actions: [
    RecordButton(
      recordingFinishedCallback: _recordingFinishedCallback,
    ),
  ],
),
```
Bạn sẽ tạo phương thức **_recordingFinishedCallback** sau. Trước tiên, tạo một file tên là `record_button.dart` và thêm vào code sau: <br>
```
import 'package:flutter/material.dart';
import 'package:record/record.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

typedef RecordCallback = void Function(String);

class RecordButton extends StatefulWidget {
  const RecordButton({
    Key? key,
    required this.recordingFinishedCallback,
  }) : super(key: key);

  final RecordCallback recordingFinishedCallback;

  @override
  _RecordButtonState createState() => _RecordButtonState();
}

class _RecordButtonState extends State<RecordButton> {
  bool _isRecording = false;
  final _audioRecorder = Record();

  Future<void> _start() async {
    try {
      if (await _audioRecorder.hasPermission()) {
        await _audioRecorder.start();

        bool isRecording = await _audioRecorder.isRecording();
        setState(() {
          _isRecording = isRecording;
        });
      }
    } catch (e) {
      print(e);
    }
  }

  Future<void> _stop() async {
    final path = await _audioRecorder.stop();

    widget.recordingFinishedCallback(path!);

    setState(() => _isRecording = false);
  }

  @override
  Widget build(BuildContext context) {
    late final IconData icon;
    late final Color? color;
    if (_isRecording) {
      icon = Icons.stop;
      color = Colors.red.withOpacity(0.3);
    } else {
      color = StreamChatTheme.of(context).primaryIconTheme.color;
      icon = Icons.mic;
    }
    return GestureDetector(
      onTap: () {
        _isRecording ? _stop() : _start();
      },
      child: Icon(
        icon,
        color: color,
      ),
    );
  }
}
```
*Giải thích code* -Trong đoạn trích trên, bạn đã:<br>
1. Tạo ra một instance của **Record** có tên **_audioRecorder**, cái mà dùng [Record package](https://pub.dev/packages/record) để làm cho nó dễ ghi lại các bản ghi âm trong Flutter. (Gói ghi ân này có yêu cầu một vài cài đặt tối thiểu cho iOS và Android để dùng; đọc docs Flutter Packages để có thêm thông tin chi tiết.)
2. Tạo các phương thức **_start** và **_stop** để điều khiển trình ghi âm.
3. Tạo một phương thức **build** mà nó dùng một **GestureDetector** để bắt đầu/dừng một bản ghi.
4. Sử dụng một định nghĩa kiểu **RecordCallback** để gửi lại chuỗi đường dẫn của file đã ghi âm. (được gọi trong **_stop** method).<br>

Quay trở lại `channel_page.dart` và tạo phương thức **_recordingFinishedCallback** trong lớp **_ChannelPageState**.<br>
```
void _recordingFinishedCallback(String path) {
  final uri = Uri.parse(path);
  File file = File(uri.path);
  file.length().then(
    (fileSize) {
      StreamChannel.of(context).channel.sendMessage(
            Message(
              attachments: [
                Attachment(
                  type: 'voicenote',
                  file: AttachmentFile(
                    size: fileSize,
                    path: uri.path,
                  ),
                )
              ],
            ),
          );
    },
  );
}
```
Khi ghi xong, **_recordingFinishedCallback** sẽ được gọi. Nó làm những cái dưới đây:
1. Dán đường dẫn vào URI.
2. Tạo một file mới từ `uri.path`.
3. Dùng callback **then** trong `file.length` để xử lí độ dài file khi mà nó được lấy ra (độ dài file thì cần để tải lên file đính kèm lên Stream).
4. Lấy ra kênh hiện tại dùng `StreamChannel.of(context).channel`.
5. Gọi **sendMessage** trong kênh và cung cấp một **Message** với một **Attachment** (*tệp đính kèm*).
6. Đặt kiểu cho **voicenote** (có thể là bất cứ định danh nào) và tạo **AttachmentFile** với đường dẫn và kích thước file.
Bây giờ, bạn đã có chức năng cần thiết để ghi file ghi âm và upload nó lên Stream.
## Tạo một Trình tạo tệp đính kèm có thể tùy chỉnh 
Với code hiện tại, **MessageListView** vẫn chưa  biết cách để render ra các file đính kèm với `type: 'voicenote'`. Bạn phải nói với nó làm thế nào với đối số **messageBuilder**<br>
Trong `channel_page.dart`, thay đổi **MessageListView** thành như sau:<br>
```
MessageListView(
  messageBuilder: (context, details, messages, defaultMessage) {
    return defaultMessage.copyWith(
      customAttachmentBuilders: {
        'voicenote': (context, defaultMessage, attachments) {
          final url = attachments.first.assetUrl;
          if (url == null) {
            return const AudioLoadingMessage();
          }
          return AudioPlayerMessage(
            source: AudioSource.uri(Uri.parse(url)),
            id: defaultMessage.id,
          );
        }
      },
    );
  },
),
```
**messageBuilder** ở đây lấy ra **defaultMessage**, cái mà có một phương thức **copyWith** để ghi đè vào **customAttachmentBuilders** cho danh sách view. Bạn tạo ra một trình xây dựng tùy chỉnh cho kiểu của **voicenote** (một kiểu bạn đã chỉ định).<br>
Trong trình tạo, bạn kiểm tra để xem xem **assetUrl** đầu tiên của file đính kèm không phải là `null`. Nếu mà `null`, thì trả về **AssetLoadingMessage**. Nếu không thì, bạn trả về **AudioPlayerMessage** và xác định **AudioSource**. (**AudioSource** này là một class đến từ [gói just_audio](https://pub.dev/packages/just_audio) và dùng URL file đính kèm để load âm thanh.)<br>
Kế tiếp, tạo ra một file có tên `audio_loading_message.dart` và thêm vào code sau:<br>
```
import 'package:flutter/material.dart';

class AudioLoadingMessage extends StatelessWidget {
  const AudioLoadingMessage({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: const [
          SizedBox(
            height: 20,
            width: 20,
            child: CircularProgressIndicator(
              strokeWidth: 3,
            ),
          ),
          Padding(
            padding: EdgeInsets.only(left: 16.0),
            child: Icon(Icons.mic),
          ),
        ],
      ),
    );
  }
}
```
Code này sẽ hiển thị ra đang load khi gửi nội dung.<br>
Cuối cùng, tạo một file tên là `audio_loading_message.dart` và thêm vào code này:<br>
```
import 'dart:async';

import 'package:audio_attachment_tutorial/audio_loading_message.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';

class AudioPlayerMessage extends StatefulWidget {
  const AudioPlayerMessage({
    Key? key,
    required this.source,
    required this.id,
  }) : super(key: key);

  final AudioSource source;
  final String id;

  @override
  AudioPlayerMessageState createState() => AudioPlayerMessageState();
}

class AudioPlayerMessageState extends State<AudioPlayerMessage> {
  final _audioPlayer = AudioPlayer();
  late StreamSubscription<PlayerState> _playerStateChangedSubscription;

  late Future<Duration?> futureDuration;

  @override
  void initState() {
    super.initState();

    _playerStateChangedSubscription =
        _audioPlayer.playerStateStream.listen(playerStateListener);

    futureDuration = _audioPlayer.setAudioSource(widget.source);
  }

  void playerStateListener(PlayerState state) async {
    if (state.processingState == ProcessingState.completed) {
      await reset();
    }
  }

  @override
  void dispose() {
    _playerStateChangedSubscription.cancel();
    _audioPlayer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Duration?>(
      future: futureDuration,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return Row(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              _controlButtons(),
              _slider(snapshot.data),
            ],
          );
        }
        return const AudioLoadingMessage();
      },
    );
  }

  Widget _controlButtons() {
    return StreamBuilder<bool>(
      stream: _audioPlayer.playingStream,
      builder: (context, _) {
        final color =
            _audioPlayer.playerState.playing ? Colors.red : Colors.blue;
        final icon =
            _audioPlayer.playerState.playing ? Icons.pause : Icons.play_arrow;
        return Padding(
          padding: const EdgeInsets.all(4.0),
          child: GestureDetector(
            onTap: () {
              if (_audioPlayer.playerState.playing) {
                pause();
              } else {
                play();
              }
            },
            child: SizedBox(
              width: 40,
              height: 40,
              child: Icon(icon, color: color, size: 30),
            ),
          ),
        );
      },
    );
  }

  Widget _slider(Duration? duration) {
    return StreamBuilder<Duration>(
      stream: _audioPlayer.positionStream,
      builder: (context, snapshot) {
        if (snapshot.hasData && duration != null) {
          return CupertinoSlider(
            value: snapshot.data!.inMicroseconds / duration.inMicroseconds,
            onChanged: (val) {
              _audioPlayer.seek(duration * val);
            },
          );
        } else {
          return const SizedBox.shrink();
        }
      },
    );
  }

  Future<void> play() {
    return _audioPlayer.play();
  }

  Future<void> pause() {
    return _audioPlayer.pause();
  }

  Future<void> reset() async {
    await _audioPlayer.stop();
    return _audioPlayer.seek(const Duration(milliseconds: 0));
  }
}
```
Tiện ích này sẽ điều kiển âm thanh playback cho một ghi chú âm thanh, cho phép bạn phát, dừng, và bỏ qua những phần khác của một file âm thanh với một thanh trượt slider.<br>
Để có thêm thông tin cách dùng package này, xem [tài liệu just_audio package](https://pub.dev/packages/just_audio) <br>
Cuối cùng, `channel_page.dart` của bạn sẽ có phần import trong tương tự thế này:<br>
```
import 'dart:io';

import 'package:audio_attachment_tutorial/audio_loading_message.dart';
import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

import 'audio_player_message.dart';
import 'record_button.dart';
```
## Kết thúc
Hết rồi🎉! Bạn nên xem một trang kênh như thế ở dưới chp phép bạn ghi và gửi các ghi chú giọng nói:<br>![image.png](https://images.viblo.asia/ec99fcbb-2ec6-44a0-b00b-4886a314d3dd.png)
Xem đầy đủ source code cho Stream Chat Flutter app, xem [Stream Audio Attachment Tutorial Github](https://github.com/HayesGordon/stream-audio-attachment-tutorial)<br>
Có rất nhiều packages Stream Flutter khác nhau mà cung cấp đa dạng level của UI và level thấp điều khiển chat, bao gồm hỗ trợ offline và bản địa hóa (localization). Xem [Stream Chat Flutter GitHub](https://github.com/GetStream/stream-chat-flutter) để có nhiều thông tin hơn.<br>
Cuối cùng, theo dõi kênh du túp [Stream Developers](https://www.youtube.com/channel/UC2xOn0xQj1HIpHJpOy5tvpA) để xem nhiều nội dung hấp dẫn hơn.<br>
Happy coding!
Bài được dịch từ bài [này](https://getstream.io/blog/instantly-send-audio-messages-with-stream-chat-and-flutter/) trên getstream.io
Link git mà toi đã làm theooo: https://github.com/trantuyet/flutter-audio-chat-app
Cảm ơn các hạ đã xem đến tận đây, chúc các bạn một đời bình an <33333