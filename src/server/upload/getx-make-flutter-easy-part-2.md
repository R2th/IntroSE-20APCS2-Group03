## Giới thiệu
Ở phần trước mình đã giới thiệu qua cơ bản về cách Get quản lý state như thế nào. Bên cạnh việc là công cụ quản lý state cực kỳ mạnh mẽ và an toàn thì Get còn làm được nhiều hơn thế nữa. Hôm nay chúng ta sẽ đi đến phần tiếp theo của Get: Route manager . Sau phần này mình sẽ hướng dẫn các bạn build một project structure sử dụng Getx mà các bạn có thể dùng với các dự án trong thực tế
# Get Route manager
Để sử dụng được Get Route manager bạn cũng cần phải sử dụng GetMaterialApp thay vì MaterialApp như thông thường

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      enableLog: true,
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      initialBinding: DependenciesBinding(),
      initialRoute: '/search',
      getPages: [
        GetPage(
            name: '/search',
            page: () => SearchPage(),
            binding: SearchBinding()),
        GetPage(
            name: '/detail', page: () => DetailPage(), binding: DetailBinding())
      ],
    );
  }
}
```

### Navigation without named routes

**Navigate đến một màn hình**

Để navigate đến một màn hình mới với Get đơn giản chỉ cần gọi như sau
```
// Without GetX

Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => NextScreen()),
  );
  
// With GetX

Get.to(NextScreen());
```

Có thể thấy ở đây chúng ta không cần phải truyền vào Context như cách thông thường, vì vậy bạn có thể đặt những dòng logic code này vào Controller (để hiểu về controller các bạn vui lòng đọc lại phần 1) lúc này code bạn sẽ cực kỳ clear khi phần UI và phần logic được tách ra hoàn toàn.

**Close màn hình hiện tại**

Để close màn hình hiện tại, snackbars, dialogs hoặc bottomsheets
```
// Without GetX

Navigator.pop(context);
  
// With GetX

Get.back();
```

Tất cả hàm xử lý liên quan đến navigator của GetX đều không cần truyền vào tham số context: GetX đủ thông mình để xác định chính xác context của nó

**Những option navigate khác**
```
//To go to the next screen and no option to go back to the previous screen

Get.off(NextScreen());

//To go to the next screen and cancel all previous routes (useful in shopping carts, polls, and tests)

Get.offAll(NextScreen())

//To navigate to the next route, and receive or update data as soon as you return from it:

var data = await Get.to(Payment());

on other screen, send a data for previous route:

//Get.back(result: 'success');

```

### Navigation with named routes
Tương tự GetX cũng hỗ trợ kiểu named routes
```
//To navigate to nextScreen

Get.toNamed("/NextScreen");

//To navigate and remove the previous screen from the tree.

Get.offNamed("/NextScreen");

//To navigate and remove all previous screens from the tree.

Get.offAllNamed("/NextScreen");

```

Support Dynamic urls link
```
//Dynamic urls links

Get.offAllNamed("/NextScreen?device=phone&id=354&name=Enzo");

on your controller/bloc/stateful/stateless class:

print(Get.parameters['id']);
// out: 354
print(Get.parameters['name']);
// out: Enzo

```

Dễ dàng pass parametor với Get named route
```
//You can also receive NamedParameters with Get easily:

GetMaterialApp(
      initialRoute: '/',
      getPages: [
          GetPage(
        name: '/profile/',
        page: () => MyProfile(),
      ),
       GetPage(
        name: '/profile/:userID',
        page: () => UserProfile(),
      )

Send data on route name

Get.toNamed("/profile/34954");

On second screen take the data by parameter

print(Get.parameters['userID']);
// out: 34954

```

Bạn có thể lắng nghe khi một route được gọi đến. Trong case này mình sẽ show ads khi route /second được gọi

```
If you want listen Get events to trigger actions, you can to use routingCallback to it

GetMaterialApp(
  routingCallback: (routing) {
    if(routing.current == '/second'){
      openAds();
    }
  }
)

```

### Show Snackbar
với get việt show Snackbar sẽ cực kỳ đơn giản, bạn không cần quan tâm đến Scaffold như cách thông thường nữa
```
//With Get:

Get.snackbar('Hi', 'i am a modern snackbar');

//With Get, all you have to do is call your Get.snackbar from anywhere in your code or customize it however you want!

Get.snackbar(
  "Hey i'm a Get SnackBar!", // title
  "It's unbelievable! I'm using SnackBar without context!", // message
  icon: Icon(Icons.alarm),
  shouldIconPulse: true,
  onTap:(){},
  isDismissible: true,
  duration: Duration(seconds: 3),
);

```

### Show dialog
```
//To open dialog:

Get.dialog(YourDialogWidget());

//To open default dialog:

Get.defaultDialog(
  onConfirm: () => print("Ok"),
  middleText: "Dialog made in 3 lines of code"
);

```

### Show BottomSheets

```
//Get.bottomSheet is like ModalBottomSheet, but don't need of context.

Get.bottomSheet(
  Container(
    child: Wrap(
      children: <Widget>[
        ListTile(
          leading: Icon(Icons.music_note),
          title: Text('Music'),
          onTap: () => {}
        ),
       ],
    ),
  )
);

```

Bạn có thể đọc thêm về Get Route manager tại đây: 
https://github.com/jonataslaw/getx/blob/master/docs/en_US/route_management.md