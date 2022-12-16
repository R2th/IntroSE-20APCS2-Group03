Một giải pháp lai giữa Flutter và Native. FlutterBoost là một plugin của Flutter cho phép tích hợp kết hợp Flutter cho các ứng dụng gốc hiện có của bạn với những nỗ lực ít nhất. Triết lý của FlutterBoost là sử dụng Flutter dễ dàng như sử dụng WebView. Việc quản lý các UI của Native và các UI của Flutter cùng một lúc là điều không hề ít thấy trong một ứng dụng hiện có. FlutterBoost quản lý các trang cho bạn. Điều duy nhất bạn cần quan tâm là tên của trang (thường có thể là một URL).

### Điều kiện tiên quyết:
1. Trước khi tiếp tục, bạn cần tích hợp Flutter vào dự án hiện có của mình.
2. Phiên bản Flutter SDK được hỗ trợ bởi Boost 3.0 là >= 1.22

### Bắt đầu

#### Thêm dependency vào dự án Flutter của bạn.

Mở pubspec.yaml của bạn và thêm dòng sau vào dependencies:
```
flutter_boost:
    git:
        url: 'https://github.com/alibaba/flutter_boost.git'
        ref: 'v3.0-hotfixes'
```

### Tích hợp FlutterBoost

#### Tích hợp vào Flutter project

1. Initialize ：

```
void main() {
  runApp(MyApp());
}
class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}
class _MyAppState extends State<MyApp> {
   static Map<String, FlutterBoostRouteFactory>
	   routerMap = {
    '/': (settings, uniqueId) {
      return PageRouteBuilder<dynamic>(
          settings: settings, pageBuilder: (_, __, ___)
          => Container());
    },
    'embedded': (settings, uniqueId) {
      return PageRouteBuilder<dynamic>(
          settings: settings,
          pageBuilder: (_, __, ___) =>
          EmbeddedFirstRouteWidget());
    },
    'presentFlutterPage': (settings, uniqueId) {
      return PageRouteBuilder<dynamic>(
          settings: settings,
          pageBuilder: (_, __, ___) =>
          FlutterRouteWidget(
                params: settings.arguments,
                uniqueId: uniqueId,
              ));
    }};
   Route<dynamic> routeFactory(RouteSettings settings, String uniqueId) {
    FlutterBoostRouteFactory func =routerMap[settings.name];
    if (func == null) {
      return null;
    }
    return func(settings, uniqueId);
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FlutterBoostApp(
      routeFactory
    );
  }
```

2. Boost Lifecycle monitoring:
```
class SimpleWidget extends StatefulWidget {
  final Map params;
  final String messages;
  final String uniqueId;

  const SimpleWidget(this.uniqueId, this.params, this.messages);

  @override
  _SimpleWidgetState createState() => _SimpleWidgetState();
}

class _SimpleWidgetState extends State<SimpleWidget>
    with PageVisibilityObserver {
  static const String _kTag = 'xlog';
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print('$_kTag#didChangeDependencies, ${widget.uniqueId}, $this');

  }

  @override
  void initState() {
    super.initState();
   PageVisibilityBinding.instance.addObserver(this, ModalRoute.of(context));
   print('$_kTag#initState, ${widget.uniqueId}, $this');
  }

  @override
  void dispose() {
    PageVisibilityBinding.instance.removeObserver(this);
    print('$_kTag#dispose, ${widget.uniqueId}, $this');
    super.dispose();
  }

  @override
  void onForeground() {
    print('$_kTag#onForeground, ${widget.uniqueId}, $this');
  }

  @override
  void onBackground() {
    print('$_kTag#onBackground, ${widget.uniqueId}, $this');
  }

  @override
  void onAppear(ChangeReason reason) {
    print('$_kTag#onAppear, ${widget.uniqueId}, $reason, $this');
  }

  void onDisappear(ChangeReason reason) {
    print('$_kTag#onDisappear, ${widget.uniqueId}, $reason, $this');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('tab_example'),
      ),
      body: SingleChildScrollView(
          physics: BouncingScrollPhysics(),
          child: Container(
              child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Container(
                margin: const EdgeInsets.only(top: 80.0),
                child: Text(
                  widget.messages,
                  style: TextStyle(fontSize: 28.0, color: Colors.blue),
                ),
                alignment: AlignmentDirectional.center,
              ),
              Container(
                margin: const EdgeInsets.only(top: 32.0),
                child: Text(
                  widget.uniqueId,
                  style: TextStyle(fontSize: 22.0, color: Colors.red),
                ),
                alignment: AlignmentDirectional.center,
              ),
              InkWell(
                child: Container(
                    padding: const EdgeInsets.all(8.0),
                    margin: const EdgeInsets.all(30.0),
                    color: Colors.yellow,
                    child: Text(
                      'open flutter page',
                      style: TextStyle(fontSize: 22.0, color: Colors.black),
                    )),
                onTap: () => BoostNavigator.of().push("flutterPage",
                    arguments: <String, String>{'from': widget.uniqueId}),
              )
              Container(
                height: 300,
                width: 200,
                child: Text(
                  '',
                  style: TextStyle(fontSize: 22.0, color: Colors.black),
                ),
              )
            ],
          ))),
    );
  }
}
```

3. Page jump

Open the page:
```
String result = await BoostNavigator.of()
                        .push("flutterPage", withContainer: true);
```

Close the page
```
BoostNavigator.of().pop('I am result for popping.');
```

#### Tích hợp vào Android project

1. Initialize

```
public class MyApplication extends FlutterApplication {


    @Override
    public void onCreate() {
        super.onCreate();

        FlutterBoost.instance().setup(this, new FlutterBoostDelegate() {

            @Override
            public void pushNativeRoute(String pageName, HashMap<String, String> arguments) {
                Intent intent = new Intent(FlutterBoost.instance().currentActivity(), NativePageActivity.class);
                FlutterBoost.instance().currentActivity().startActivity(intent);
            }

            @Override
            public void pushFlutterRoute(String pageName, HashMap<String, String> arguments) {
                Intent intent = new FlutterBoostActivity.CachedEngineIntentBuilder(FlutterBoostActivity.class, FlutterBoost.ENGINE_ID)
                        .backgroundMode(FlutterActivityLaunchConfigs.BackgroundMode.opaque)
                        .destroyEngineWithActivity(false)
                        .url(pageName)
                        .urlParams(arguments)
                        .build(FlutterBoost.instance().currentActivity());
                FlutterBoost.instance().currentActivity().startActivity(intent);
            }

        },engine->{
            engine.getPlugins();
        } );


    }
}
```

2. AndroidManifest.xml
```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          xmlns:tools="http://schemas.android.com/tools"
          package="com.idlefish.flutterboost.example">

    <application
        android:name="com.idlefish.flutterboost.example.MyApplication"
        android:label="flutter_boost_example"
        android:icon="@mipmap/ic_launcher">

        <activity
            android:name="com.idlefish.flutterboost.containers.FlutterBoostActivity"
            android:theme="@style/Theme.AppCompat"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize" >
            <meta-data android:name="io.flutter.embedding.android.SplashScreenDrawable" android:resource="@drawable/launch_background"/>

        </activity>
        <meta-data android:name="flutterEmbedding"
                   android:value="2">
        </meta-data>
    </application>
</manifest>
```

3. Open and close Flutter page
```
FlutterBoost.instance().open("flutterPage",params);

FlutterBoost.instance().close("uniqueId");
```

#### Tích hợp vào iOS project
1. AppDelegate
```
@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

    MyFlutterBoostDelegate* delegate=[[MyFlutterBoostDelegate alloc ] init];

    [[FlutterBoost instance] setup:application delegate:delegate callback:^(FlutterEngine *engine) {

    } ];

    return YES;
}
@end
```

2. FlutterBoostDelegate
```
@interface MyFlutterBoostDelegate : NSObject<FlutterBoostDelegate>
@property (nonatomic,strong) UINavigationController *navigationController;
@end

@implementation MyFlutterBoostDelegate

- (void) pushNativeRoute:(FBCommonParams*) params{
    BOOL animated = [params.arguments[@"animated"] boolValue];
    BOOL present= [params.arguments[@"present"] boolValue];
    UIViewControllerDemo *nvc = [[UIViewControllerDemo alloc] initWithNibName:@"UIViewControllerDemo" bundle:[NSBundle mainBundle]];
    if(present){
        [self.navigationController presentViewController:nvc animated:animated completion:^{
        }];
    }else{
        [self.navigationController pushViewController:nvc animated:animated];
    }
}

- (void) pushFlutterRoute:(FBCommonParams*)params {

    FlutterEngine* engine =  [[FlutterBoost instance ] getEngine];
    engine.viewController = nil;

    FBFlutterViewContainer *vc = FBFlutterViewContainer.new ;

    [vc setName:params.pageName params:params.arguments];

    BOOL animated = [params.arguments[@"animated"] boolValue];
    BOOL present= [params.arguments[@"present"] boolValue];
    if(present){
        [self.navigationController presentViewController:vc animated:animated completion:^{
        }];
    }else{
        [self.navigationController pushViewController:vc animated:animated];

    }
}

- (void) popRoute:(FBCommonParams*)params
         result:(NSDictionary *)result{

    FBFlutterViewContainer *vc = (id)self.navigationController.presentedViewController;

    if([vc isKindOfClass:FBFlutterViewContainer.class] && [vc.uniqueIDString isEqual: params.uniqueId]){
        [vc dismissViewControllerAnimated:YES completion:^{}];
    }else{
        [self.navigationController popViewControllerAnimated:YES];
    }

}

@end
```

3. Open and close Flutter page
```
[[FlutterBoost instance] open:@"flutterPage" arguments:@{@"animated":@(YES)}];

[[FlutterBoost instance] open:@"secondStateful" arguments:@{@"present":@(YES)}];
```

### Demo
https://gifyu.com/image/YPHc

Link: https://github.com/alibaba/flutter_boost