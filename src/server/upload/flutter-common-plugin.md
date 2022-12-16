# Giới thiệu
Nếu bạn đang hoặc sẽ lập trình flutter, thì plugin là một thành phần không thể thiếu. cũng giống như các nền tảng khác. Không phải lúc nào tự chúng ta cũng có thể hoàn thành một công việc nào đó một cách tốt nhất, hay một vài công việc sẽ tốn rất nhiều effort để hoàn thành. Những lúc như thế này thì plugin chính là cứu cánh cho bạn. Plugin về cơ bản cũng như  3rd library của các nền tảng khác.  Hôm nay mình sẽ giới thiệu các plugin đang phổ biến và hữu dụng nhất khi lập trình flutter
# [shared_preferences](https://pub.dev/packages/shared_preferences)
Plugin này sử dụng cơ chế lưu trữ data dưới local dựa trên Wraps NSUserDefaults (on iOS) và SharedPreferences (on Android)
Cách sử dụng cũng cực kỳ đơn giản
```
void main() {
  runApp(MaterialApp(
    home: Scaffold(
      body: Center(
      child: RaisedButton(
        onPressed: _incrementCounter,
        child: Text('Increment Counter'),
        ),
      ),
    ),
  ));
}

_incrementCounter() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  int counter = (prefs.getInt('counter') ?? 0) + 1;
  print('Pressed $counter times.');
  await prefs.setInt('counter', counter);
}****
```

# [url_launcher](https://pub.dev/packages/url_launcher)
Plugin dùng để launching một URL 
```
void main() {
  runApp(Scaffold(
    body: Center(
      child: RaisedButton(
        onPressed: _launchURL,
        child: Text('Show Flutter homepage'),
      ),
    ),
  ));
}

_launchURL() async {
  const url = 'https://flutter.dev';
  if (await canLaunch(url)) {
    await launch(url);
  } else {
    throw 'Could not launch $url';
  }
}
```

 Scheme |Action |
 -------- | -------- |
 http:<URL> , https:<URL>, e.g. http://flutter.dev	     | Open URL in the default browser     |
 mailto:<email address>?subject=<subject>&body=<body>, e.g. mailto:smith@example.org?subject=News&body=New%20plugin	     |Create email to     |
 tel:<phone number, e.g. tel:+1 555 010 999	     | Make a phone call to     |
 sms:<phone number, e.g. sms:5550101234     | Send an SMS message to     ||

# [cached_network_image](https://pub.dev/packages/cached_network_image)
   Một plugin với tính năng tương tự như Glide hoặc Picasso trên Android
    
   Sử dụng
```
With a placeholder:

CachedNetworkImage(
        imageUrl: "http://via.placeholder.com/350x150",
        placeholder: (context, url) => CircularProgressIndicator(),
        errorWidget: (context, url, error) => Icon(Icons.error),
     ),
Or with a progress indicator:

CachedNetworkImage(
        imageUrl: "http://via.placeholder.com/350x150",
        progressIndicatorBuilder: (context, url, downloadProgress) => 
                CircularProgressIndicator(value: downloadProgress.progress),
        errorWidget: (context, url, error) => Icon(Icons.error),
     ),
Image(image: CachedNetworkImageProvider(url))
```
    
# [image_picker](https://pub.dev/packages/image_picker)
   
   Plugin thực hiện picking một hoặc nhiều image from gallery
    
   Sử dụng
   ```
class _MyHomePageState extends State<MyHomePage> {
  File _image;

  Future getImage() async {
    var image = await ImagePicker.pickImage(source: ImageSource.camera);

    setState(() {
      _image = image;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Image Picker Example'),
      ),
      body: Center(
        child: _image == null
            ? Text('No image selected.')
            : Image.file(_image),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: getImage,
        tooltip: 'Pick Image',
        child: Icon(Icons.add_a_photo),
      ),
    );
  }
}
```
    
# [permission_handler](https://pub.dev/packages/permission_handler)
    
  Nếu bạn gặp khó khăn trong việc handle permission trên cả android và ios thì plugin này chắc chắn không thể bỏ qua
   
  Sử dụng
```
There are a number of Permissions. You can get a Permission's status, which is either undetermined, granted, denied, restricted or permanentlyDenied.

var status = await Permission.camera.status;
if (status.isUndetermined) {
  // We didn't ask for permission yet.
}

// You can can also directly ask the permission about its status.
if (await Permission.location.isRestricted) {
  // The OS restricts access, for example because of parental controls.
}
Call request() on a Permission to request it. If it has already been granted before, nothing happens.
request() returns the new status of the Permission.

if (await Permission.contacts.request().isGranted) {
  // Either the permission was already granted before or the user just granted it.
}

// You can request multiple permissions at once.
Map<Permission, PermissionStatus> statuses = await [
  Permission.location,
  Permission.storage,
].request();
print(statuses[Permission.location]);
Some permissions, for example location or acceleration sensor permissions, have an associated service, which can be enabled or disabled.

if (await Permission.locationWhenInUse.serviceStatus.isEnabled) {
  // Use location.
}
You can also open the app settings:

if (await Permission.speech.isPermanentlyDenied) {
  // The user opted to never again see the permission request dialog for this
  // app. The only way to change the permission's status now is to let the
  // user manually enable it in the system settings.
  openAppSettings();
}
On Android, you can show a rationale for using a permission:

bool isShown = await Permission.contacts.shouldShowRequestRationale;
``` 
    
# [video_player](https://pub.dev/packages/video_player)
    
 Nếu bạn làm function nào có liên quan đến việc stream video thì đây chắc hẳn là thứ bạn cần rồi
  
 Sử dụng
 ```
class VideoApp extends StatefulWidget {
  @override
  _VideoAppState createState() => _VideoAppState();
}

class _VideoAppState extends State<VideoApp> {
  VideoPlayerController _controller;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.network(
        'http://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4')
      ..initialize().then((_) {
        // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
        setState(() {});
      });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Video Demo',
      home: Scaffold(
        body: Center(
          child: _controller.value.initialized
              ? AspectRatio(
                  aspectRatio: _controller.value.aspectRatio,
                  child: VideoPlayer(_controller),
                )
              : Container(),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            setState(() {
              _controller.value.isPlaying
                  ? _controller.pause()
                  : _controller.play();
            });
          },
          child: Icon(
            _controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    _controller.dispose();
  }
}
```