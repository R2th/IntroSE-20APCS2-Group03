Bài viết này mình sẽ sử dụng mô hình MVVM làm kiến trúc cho một ứng dụng thời tiết chạy trên mobile, được viết bằng ngôn ngữ Dart thông qua Flutter SDK. Trước hết hãy xem qua Flutter là gì đã nhé.
## Flutter
Chắc hẳn với dân moblie dev, [Flutter SDK ](https://flutter.io/) không còn là một cái tên xa lạ. Flutter là một bộ công cụ phát triển phần mềm mã nguồn mở được phát triển bởi Goolge. Nó được sử dụng để phát triển các ứng dụng mobile chạy được cả trên Android, IOS và [Fushia](https://viblo.asia/p/google-fuchsia-co-thay-the-duoc-android-L4x5xpLO5BM). Flutter được viết bằng [Dart](https://www.dartlang.org/) một ngôn ngữ lập trình cũng do Google phát triển và rất được các kỹ sư của Google tin dùng.<br><br>
![Logo của Flutter](https://images.viblo.asia/7a955656-d6f4-4c3c-8d75-efd8b81ef34d.png)
Flutter cũng giống với React Native được lấy cảm hứng từ [React](https://reactjs.org/) - được đánh giá là một kiến trúc lập trình hiện đại và dễ sử dụng. Do bài viết này đi sâu vào việc kết hợp giữa Flutter và MVVM nên mình sẽ không nói quá nhiều về Flutter nữa. Bắt đầu code thôi.
## Viết ứng dụng thời tiết với Flutter và MVVM
### Xây dựng tầng Model
Để bắt đầu viết ứng dụng này, tôi sẽ xây dựng từ phần core trở lên, nghĩa là xây dựng tầng Model trước, sau đó là repository, ViewModel và cuối cùng là View. Do đây là ứng dụng về thời tiết, nên ta cần một class Weather 
```java
class Weather {
  int id;
  String location;
  String main;
  String des;
  num temp;
  num pressure;
  num humidity;
  num tempMin;
  num tempMax;
  int lastUpdated;

  Weather(this.id, this.location, this.main, this.des, this.temp, this.pressure,
      this.humidity, this.tempMin, this.tempMax, this.lastUpdated);
}
```
Nhìn đoạn code trên rất giống với Java, nhưng thực sự nó được viết bằng Dart, với anh em dev đã từng viết code Java, Swift, Kotlin... sẽ cảm thấy cú pháp của Dart rất quen thuộc và dễ hiểu, chỉ cần thêm một hai ngày làm quen là sẽ nắm được cú pháp cũng như tư tưởng của Dart. Để lấy dữ liệu về thời tiết (Weather) ta cần một WeatherRepo
```cpp
abstract class WeatherRepo {

  Future<Weather> getWeatherByLocation(String location);

  Future<List<Weather>> getWeathers();

  Future<void> removeWeather(Weather weather);

}
```
Dart là một ngôn ngữ lập trình hướng đối tượng, kể cả null cũng là một đối tượng trong Dart, nhưng nó không có interface giống với Java mà chỉ có class, abstract class và mixin. Các phương thức của WeatherRepo trả về một đối tượng Future. Future là một class của Dart, được sử dụng để phục vụ lập trình đa luồng, ví dụ phương thức getWeathers() có thể phải đợi rất lâu mới lấy được dữ liệu, sử dụng Future giống như một dạng callback, nó sẽ trả về dữ liệu khi dữ liệu lấy được thành công (xem chi tiết về [Dart](https://www.dartlang.org/) ).
WeatherRepo sẽ được sử dụng trong ViewModel và dùng để thao tác với các cơ sở dữ liệu (từ database hoặc api). Thử xem lớp triển khai của WeatherRepo xem có gì,
```javascript
class WeatherRepoImpl with WeatherRepo {
  WeatherApi weatherApi = WeatherApi();
  WeatherDao weatherDao = WeatherDao();

  @override
  Future<Weather> getWeatherByLocation(String location) async {
    Weather weather = await weatherApi.findWeatherByLocation(location);
    if (weather == null) {
      weather = await weatherDao.getWeatherByLocation(location);
    } else {
      await weatherDao.saveWeather(weather);
    }
    return weather;
  }

  @override
  Future<List<Weather>> getWeathers() {
    return weatherDao.getWeathers();
  }

  @override
  Future<void> removeWeather(Weather weather) {
    return weatherDao.removeWeather(weather);
  }
}
```
Cũng giống với các mô hình Repository thông thường, WeatherRepoImpl sẽ mang theo WeatherApi để truy vấn dữ liệu của api, và WeatherDao để thao tác với dữ liệu trong database. Dart hỗ trợ async await pattern, phương thức getWeatherByLocation(String location) là một phương thức bất đồng bộ, nó sẽ chạy trên một luồng khác với luồng gọi nó (tuy hai luồng này cùng chung một thread, giống với [Coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html) trong Kotlin). Khi gọi await ví dụ như
```javascript
    Weather weather = await weatherApi.findWeatherByLocation(location);
```
Dart sẽ đợi weatherApi.findWeatherByLocation(location) trả về kết quả, sau đó gán giá trị vào biến weather rồi mới thực hiện các câu lệnh bên dưới, nếu không có từ khóa await, Dart sẽ chạy luôn câu lệnh bên dưới mà không cần quan tâm đến weatherApi.findWeatherByLocation(location) đã thực hiện xong hay chưa. Chi tiết về asyn và await các bạn có thể xem [ở đây](https://www.dartlang.org/articles/language/await-async).
### Xây dựng tầng data
Để thao tác với dữ liệu trong database ở đây tôi sử dụng sqlite, tuy nhiên Flutter lại không hỗ trợ sqlite mặc định mà ta cần sử dụng thư viện [sqflite](https://pub.dartlang.org/packages/sqflite) được cung cấp thông qua Dartlang Package. Xem thêm về cách bổ sung thư viện vào dự án Flutter [ở đây](https://flutter.io/docs/get-started/codelab). class WeatherDao sẽ như sau:
```markdown
class WeatherDao {
 ...
  Database database;

  Future<Database> open() async {
    if (database == null) {
      var databasePath = await getDatabasesPath();
      String path = join(databasePath, 'weathers.db');

      database = await openDatabase(path, version: 1,
          onCreate: (Database db, int version) async {
        await db.execute(
            "CREATE TABLE IF NOT EXISTS $tableName ($id INTEGER PRIMARY KEY, "
            "$location TEXT, $main TEXT, $des TEXT, $temp REAL, $tempMax REAL,"
            "$tempMin REAL, $pressure REAL, $humidity REAL, $lastUpdated INTEGER);");
      });
    }
    return database;
  }

  Future<int> saveWeather(Weather weather) async {
    Database db = await open();

    var map = Map<String, dynamic>();
    map[id] = weather.id;
    map[location] = weather.location;
    map[main] = weather.main;
    map[des] = weather.des;
    map[temp] = weather.temp;
    map[tempMax] = weather.tempMax;
    map[tempMin] = weather.tempMin;
    map[pressure] = weather.pressure;
    map[humidity] = weather.humidity;
    map[lastUpdated] = weather.lastUpdated;

    var result = await db.insert(tableName, map,
        conflictAlgorithm: ConflictAlgorithm.replace);
    return result;
  }
  ...
}
```
### Xây dựng tầng ViewModel
Với các ứng dụng Android Native, ViewModel sẽ giao tiếp với View thông qua Databinding và LiveData, tuy nhiên Flutter chưa support Databinding hay LiveData, do đó mình sẽ sử dụng một plugin có tên [Scoped Model](https://pub.dartlang.org/packages/scoped_model). Plugin này hỗ trợ việc truyền model từ Widget cha đến các Widget con, khi model cập nhật trạng thái, các Widget con sẽ tự động được build lại, cũng giống với khả năng của LiveData tuy nhiên chúng ta phải tự thông báo trạng thái đến View thay vì để model tự cập nhật chúng. Thử xem ViewModel trong Flutter hoạt động thế nào, dưới đây mình có class HomeViewModel, class này có nhiệm vụ cập nhật favorite Weather, thêm hoặc xóa favorite Weather khỏi danh sách:
```cpp
class HomeViewModel extends Model {

  ...

  WeatherRepo weatherRepo = WeatherRepoImpl();
  List<Weather> weatherFavorite = [];

  HomeViewModel() {
    updateWeatherFavorite();
  }

  void updateWeatherFavorite() async {
    weatherFavorite = await weatherRepo.getWeathersFavorite();
    notifyListeners();
  }

  void updateFavorite(Weather weather) async {
    weather.favorite = !weather.favorite;
    await weatherRepo.saveWeather(weather);
    updateWeatherFavorite();
  }

  void deleteWeather(Weather weather) async {
    await weatherRepo.removeWeather(weather);
    updateWeatherFavorite();
  }

}
```
Các function đánh dấu async sẽ thực hiện bất đồng bộ so với luồng chính để đảm bảo UI không bị block, việc lập trình bất đồng bộ theo async await pattern rất dễ dàng do đã được Dart support sẵn, không cần tạo thêm luồng mới, quản lý luồng... Ví dụ với function deleteWeather(Weather weather), khi View gọi đến function này từ luồng chính, nó sẽ được thực hiện tách biệt với luồng chính, cú pháp await weatherRepo.removeWeather(weather); sẽ block luồng phụ này lại, đợi khi thực hiện xong việc xóa Weather ưa thích trong database thì mới thực hiện câu lệnh tiếp theo, đó là gọi đến function cập nhật danh sách Weather ưa thích. Do chưa hỗ trợ LiveData nên chúng ta phải thực hiện việc cập nhật bằng tay, hy vọng trong tương lai gần, Google sẽ phát triển thêm về LiveData cho Flutter. <br><br>
Trong function updateWeatherFavorite(), chúng ta thực hiện notifyListeners() (là function của plugin Scoped Model). Đúng với tên gọi của function notifyListeners(), nó sẽ thông báo đến View rằng data đã thay đổi, hãy cập nhật UI. Vậy hãy xem tầng View hoạt động thế nào nhé.
### Xây dựng tầng View
Nếu bạn chưa bao giờ code thử Flutter, thì [Flutter Docs](https://flutter.io/docs) là nơi tuyệt vời để bắt đầu. Tài liệu về Flutter do Google thiết kế rất đầy đủ, rõ ràng và chi tiết (tốt hơn rất nhiều so với tài liệu của React Native). Ở đây mình không lấy ví dụ đơn giản về Widget như là hiển thị một text hay một button (giống với nhiều bài viết demo về Flutter trên Viblo :D) mà mình sẽ code một màn hình đầy đủ chức năng hơn.
```rust
class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ScopedModel(
      model: HomeViewModel.getInstance(),
      child: Scaffold(
        appBar: AppBar(
          title: Text("Weather"),
          actions: <Widget>[
            searchWidget(context),
            historyWidget(),
          ],
        ),
        body: listFavoriteWeatherWidget(),
      ),
    );
  }

  ...

}
```
class HomeScreen là một Widget cũng chính là một ScopedModel (Widget này hộ trỡ việc cập nhật dữ liệu giữa View và ViewModel), ScopedModel này lắng nghe dữ liệu từ HomeViewModel. Để sử dụng Material Design, child của ScopedModel mình sẽ sử dụng Scaffold (tạm dịch là bộ khung hay dàn giáo), Scaffold là một class đã được xây dựng sẵn trong package:flutter/material.dart, hỗ trợ nhiều component như AppBar, Drawer, Floating Button, BottomNavigation... Phần AppBar mình có đặt searchWidget() và historyWidget(), đây là hai hàm trả về hai icon search và history cùng action click, cụ thể như sau:
```cpp
Widget historyWidget() {
    return ScopedModelDescendant<HomeViewModel>(
      builder: (BuildContext context, Widget child, HomeViewModel model) {
        return IconButton(
          onPressed: () async {
            var result = await Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) {
                  return HistoryScreen();
                },
              ),
            );
            if (result != null) {
              model.updateWeatherFavorite();
            }
          },
          icon: Icon(Icons.history),
        );
      },
    );
  }

  Widget searchWidget(BuildContext context) =>
      ScopedModelDescendant<HomeViewModel>(
        builder: (BuildContext context, Widget child, HomeViewModel model) {
          return IconButton(
            icon: Icon(Icons.search),
            onPressed: () async {
              var result = await Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => SearchScreen(),
                ),
              );
              if (result != null) {
                //update home view model
                model.updateWeatherFavorite();
              }
            },
          );
        },
      );
```
Kết quả ta có một AppBar đúng chuẩn theo các quy tắc của Material Design: <br>
![](https://images.viblo.asia/0be64f79-f8a4-4654-b4fe-5a1babef2508.png)
<br>Để hiểu được chức năng của hai nút này có thể cần nhiều thời gian luyện tập, nhưng do giới hạn của bài viết nên mình chỉ mô tả qua về hoạt động của chúng. Khi click vào widget history, màn hình sẽ chuyển đến HistoryScreen() (là một Widget khác chứa danh sách Weather người dùng đã tìm kiếm), tương tự với widget search sẽ mở ra màn  SearchScreen() có chức năng tìm kiếm Weather.<br><br>
Trong body của HomeScreen, mình có đặt function listFavoriteWeatherWidget(), function này hiển thị danh sách Weather ưa thích trong HomeViewModel.
```javascript
Widget listFavoriteWeatherWidget() => ScopedModelDescendant<HomeViewModel>(
        builder: (BuildContext context, Widget child, HomeViewModel model) {
          return ListView.builder(
            itemCount: model.weatherFavorite.length,
            itemBuilder: (context, index) {
              return WeatherItem(
                weather: model.weatherFavorite[index],
                onClick: (weather) {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) {
                        return WeatherScreen(
                          model.weatherFavorite.indexOf(weather),
                          model.weatherFavorite,
                        );
                      },
                    ),
                  );
                },
                onFavorite: (weather) {
                  model.updateFavorite(weather);
                },
                onDelete: (weather) {
                  model.deleteWeather(weather);
                },
                deleteAble: true,
              );
            },
          );
        },
      );
```
Ở đây, ListView.builder sẽ phụ trách việc hiển thị từng Widget item tương ứng với mỗi item Weather trong HomeViewModel, cơ chế hoạt động của ListView.builder rất giống với RecyclerView trong Android Native. WeatherItem là một class mình custom để hiển thị Weather item, bao gồm cả các action click, favorite, delete. Nếu muốn tìm hiểu thêm, bạn có thể xem thêm source code [ở đây](https://github.com/tungtd95/weather-flutter/blob/mvvm/lib/ui/WeatherItem.dart). Kết quả của màn Home: <br>
![ádfsdf](https://images.viblo.asia/adec0a0e-c214-44a5-8426-12b9345029b0.png)
### Kết quả
Kết quả demo của ứng dụng Thời tiết:
![](https://images.viblo.asia/75ebd706-c360-413a-b457-4994331e8c8b.gif)
## Kết luận
Ứng dụng Thời tiết chạy rất mượt mà ngay cả trên Android hay IOS (nhớ chạy ở chế độ release nhé :D), việc tiếp cận với Dart hay Flutter cũng rất dễ dàng, mọi người đều có thể làm quen kể cả chưa bao giờ thử phát triển ứng dụng trên mobile.<br><br>
Sau một thời gian làm quen với Flutter, mình thấy tiềm năng của Framework này rất lớn, hơn nữa với tham vọng của Google, Flutter không chỉ dừng lại ở Android, Fushia hay IOS, họ còn phát triển riêng các bộ SDK để phát triển trên các môi trường khác như Web, Embedded... Hãy chờ đợi Google IO 2019 để thấy thêm nhiều điều bất ngờ hơn nữa.<br><br>
Mọi ý kiến đóng góp các bạn cứ thoải mái comment và gửi Merge Request để chúng ta cùng thảo luận nhé! Happy Coding!
## Tham khảo
#### [All source code](https://github.com/tungtd95/weather-flutter/tree/mvvm) of this project
#### [Dart](https://www.dartlang.org/) programming language
#### [Fluter](https://flutter.io/)
#### [Flutter Live Keynote Recap](https://www.youtube.com/watch?v=D-o4BqJxmJE)
#### [React](https://reactjs.org/)