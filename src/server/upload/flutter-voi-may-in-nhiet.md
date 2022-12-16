### I. Giới thiệu:
- Chắc flutter cũng không xa lạ gì với mọi người, nên thôi mình không giới thiệu nữa
- Xin phép vào thẳng luôn chủ đề =))
### II. Máy in:
Đây là hình ảnh máy in mình sài, nó là máy in nhiệt
![](https://images.viblo.asia/820abfd2-4540-4415-bcfb-be75a5e2e058.JPEG)
### III. Flutter:
- Để sử dụng được bluetooth printer này mình sử dụng thư viện [bluetooth_print](https://pub.dev/packages/bluetooth_print)
- Dưới đây là code
```
import 'package:bluetooth_print/bluetooth_print.dart';
import 'package:bluetooth_print/bluetooth_print_model.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  BluetoothPrint bluetoothPrint = BluetoothPrint.instance;

  bool _connected = false;
  BluetoothDevice _device;
  String tips = 'Không có thiết bị được kết nối';

  @override
  void initState() {
    super.initState();
    if (_connected) tips = 'Đã kết nối'; // Khi vào trang sẽ check xem đã kết nối trước đó hay chưa

    WidgetsBinding.instance.addPostFrameCallback((_) => initBluetooth());
  }

  Future<void> initBluetooth() async {
    bluetoothPrint.startScan(timeout: Duration(seconds: 4)); // scan trong 4s, tìm device

    bool isConnected = await bluetoothPrint.isConnected;

    bluetoothPrint.state.listen((state) {
      print('cur device status: $state');

      switch (state) {
        case BluetoothPrint.CONNECTED:
          setState(() {
            _connected = true;
            tips = 'Kết nối thành công';
          });
          break;
        case BluetoothPrint.DISCONNECTED:
          setState(() {
            _connected = false;
            tips = 'Ngắt kết nối thành công';
          });
          break;
        default:
          break;
      }
    });

    if (!mounted) return; // nếu chưa kết nối thì không làm gì

    if (isConnected) {
      setState(() {
        _connected = true;
      });
    }
  }

  void _onConnect() async {
  // chỗ này đọc lệnh chắc mọi người cũng hiểu được :v
    if (_device != null && _device.address != null) {
      await bluetoothPrint.connect(_device);
    } else {
      setState(() {
        tips = 'Vui lòng chọn thiết bị';
      });
      print('please select device');
    }
  }

  void _onDisconnect() async {
    await bluetoothPrint.disconnect();
  }

  void _sendData() async {
    Map<String, dynamic> config = Map();
    List<LineText> list = List();
    list.add(LineText(
        type: LineText.TYPE_TEXT,
        content: 'MAY IN EXAMPLE',
        weight: 1,
        align: LineText.ALIGN_CENTER,
        linefeed: 1));
    list.add(LineText(
        type: LineText.TYPE_TEXT,
        content: 'Dia chi: Da Nang',
        weight: 0,
        align: LineText.ALIGN_CENTER,
        linefeed: 1));
    list.add(LineText(linefeed: 1));
    list.add(LineText(
        type: LineText.TYPE_TEXT,
        content: 'HOA DON',
        align: LineText.ALIGN_CENTER,
        weight: 1,
        linefeed: 1));
    final DateTime now = DateTime.now();
    list.add(LineText(
        type: LineText.TYPE_TEXT,
        content: 'Ngay in: ' + now.toString(),
        align: LineText.ALIGN_LEFT,
        linefeed: 1));
    list.add(LineText(linefeed: 1));
    list.add(LineText(type: LineText.TYPE_TEXT, content: 'In cho vui'));

    await bluetoothPrint.printReceipt(config, list);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Máy in')),
        body: RefreshIndicator(
          onRefresh: () =>
              bluetoothPrint.startScan(timeout: Duration(seconds: 4)),
          child: SingleChildScrollView(
            child: Column(
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Padding(
                      padding:
                          EdgeInsets.symmetric(vertical: 10, horizontal: 10),
                      child: Text(tips),
                    ),
                  ],
                ),
                Divider(),
                StreamBuilder<List<BluetoothDevice>>(
                  stream: bluetoothPrint.scanResults,
                  initialData: [],
                  builder: (c, snapshot) => Column(
                    children: snapshot.data
                        .map((d) => ListTile(
                              title: Text(d.name ?? ''),
                              subtitle: Text(d.address),
                              onTap: () async {
                                setState(() {
                                  _device = d;
                                });
                              },
                              trailing: _device != null &&
                                      _device.address == d.address
                                  ? Icon(
                                      Icons.check,
                                      color: Colors.green,
                                    )
                                  : null,
                            ))
                        .toList(),
                  ),
                ),
                Divider(),
                Container(
                  padding: EdgeInsets.fromLTRB(20, 5, 20, 10),
                  child: Column(
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          OutlineButton(
                            child: Text('Kết nối'),
                            onPressed: _connected ? null : _onConnect,
                          ),
                          SizedBox(width: 10.0),
                          OutlineButton(
                            child: Text('Ngắt kết nối'),
                            onPressed: _connected ? _onDisconnect : null,
                          ),
                        ],
                      ),
                      OutlineButton(
                        child: Text('In hóa đơn'),
                        onPressed: _connected ? _sendData : null,
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
        // phần dưới là button scan để tìm kiếm device
        floatingActionButton: StreamBuilder<bool>(
          stream: bluetoothPrint.isScanning,
          initialData: false,
          builder: (c, snapshot) {
            if (snapshot.data) {
              return FloatingActionButton(
                child: Icon(Icons.stop),
                onPressed: () => bluetoothPrint.stopScan(),
                backgroundColor: Colors.red,
              );
            } else {
              return FloatingActionButton(
                  child: Icon(Icons.search),
                  onPressed: () =>
                      bluetoothPrint.startScan(timeout: Duration(seconds: 4)));
            }
          },
        ),
      ),
    );
  }
}
```
- Khi chạy build bạn sẽ nhận được 1 đoạn mã lỗi như sau

![](https://images.viblo.asia/7cf0a2f3-26b5-4a44-b2ae-14ba407885a1.PNG)

- Đây là mã lỗi android yêu cầu sdk của nó phải ít nhất là bản 21, trong khi hiện tại là bản 16
- Chỗ này thì bạn vào file `build.gradle` trong đường dẫn sau: `android/app/build.gradle`
- Tìm tới `defaultConfig`, sửa `minSdkVersion` thành 21

![](https://images.viblo.asia/1eb230b8-dbf3-441d-9039-b24c663bc49a.PNG)

- Chạy như bình thường, à mà sau này có thể nó sẽ nâng cao version nên hãy đọc kĩ lỗi xem nó cần version nào
- Code này đã khá clear rồi nên mình cũng chẳng có gì để giải thích nhiều nên thôi show giao diện và hình ảnh khi in cho mọi người coi
- Giao diện trên máy ảo

![](https://images.viblo.asia/191bfe8b-79b8-4571-8a98-1cd8391d7ef0.PNG)

- Hóa đơn khi in

![](https://images.viblo.asia/b951036e-27bc-4d29-a551-6ee552b05512.JPEG)

### IV.  Kết
- Cái bất cập của máy in nhiệt đó là sẽ có máy hỗ trợ in tiếng Việt và máy không
- Không may máy mình đang không hỗ trợ
- Mình đã tìm hiểu nhiều trang trên mạng nhưng lại không có cái nào thành công cả
- Nhưng trong cái khó ló cái gần khôn
- Đó là convert những kiểu chữ này thành hình ảnh và sau đó sẽ in hình ảnh ra :v 
- Mình không biết nó sẽ thành công hay không vì mấy ngày này bận việc quá nên chưa thử được, không biết bạn nào đã thử làm chưa, nếu rồi cho mình xin ít kinh nghiệm
- À với lại bạn thấy bài viết của mình coi example cũng được thì vâng, đúng là vậy :v
- Vì mình viết bài này chỉ để rút gọn những cái đơn giản dễ nhìn trước khi đào sâu vào trong đó
- Cái cực khổ khi một người mới bắt đầu tìm hiểu gì đó như mình đó là tìm được một example nhưng lại có quá nhiều thứ bên trong, và nhiều khi nó còn gây ra lỗi, mình phải đi tìm để fix @@, và đọc chẳng hiểu cái gì trong cả, chán :v 
- Mong sao bài viết tiếp theo của mình sẽ chia sẻ cho mọi người cách in Tiếng Việt bằng hình ảnh :v