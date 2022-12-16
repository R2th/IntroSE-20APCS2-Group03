Hôm nay , mình sẽ làm một demo nhỏ về architect của project Flutter , bạn có thể maintain, test một cách dễ dàng.
## 1. Tại sạo lại cần architect trong project?
Khi tôi mới bước chân vào nghề lập trình, tôi chỉ quan tâm đến output và hiệu quả của chương trình. Tôi chưa bao giờ cấu trúc chương trình  hoặc dự án mà tôi viết ra.Khi gặp càng nhiều dự án, các dự án cần phát triển thêm tính năng mới, sửa tính năng , thì tôi thường mất thời gian hơn để sửa  và đôi khi còn thêm 1 số bug cho dự án. Nguyên nhân chính của tất cả các vấn đề này là tôi chưa tuân thủ theo 1 mô hình architect nào . Hôm nay, tôi sẽ băt đầu một project để giới thiệu  về architect trong Flutter.
## 2 Mục tiêu
Tôi sẽ xây dựng 1 project  có 1 screen  dạng girl list của các item. Các item đấy sẽ được lấy từ server và lấy từ trạng [Movie](https://www.themoviedb.org/).
## 3. Sơ đồ architect
![](https://images.viblo.asia/c71b1b08-b132-42e1-968e-4615af5222b3.png)
Diagram show cách lấy data tới Data layer và ngược lại.  Bloc sẽ không bao giờ tham chiếu tới Widget in UI Screen. Màn Screen chỉ quan sát những thay đổi  từ Bloc class. Mình sẽ đưa ra một số Q&A để  hiểu rõ hơn về diagram:
1. Bloc Pattern là gì?
TL: Nó dùng  quản lý state và  truy cập data từ một vị trí trung tâm trong Flutter.
2. Kiến trúc này có giống với kiến trúc nào khác không.
TL : Có giống MVP, MVVM. Chỉ khác 1 điều là BLOC sẽ thay thế cho ViewModel trong MVVM.
3. Dưới lớp vỏ của Bloc là cái gì ? Cái gì cốt lõi cho quản lý state trong 1 chỗ.
TL: STREAMS or REACTIVE là 1 cách tiếp cận . Dữ liệu sẽ được chuyển từ BLOC đến UI hoặc từ UI tơi BlOC dưới dạng stream. Nếu bạn chưa nghe về stream , bạn có thể đọc [bài này ](https://stackoverflow.com/questions/1216380/what-is-a-stream/1216397#1216397)
# Bắt đầu project về Bloc pattern.
1. Tạo Project Flutter có tên "myProjectName".
2. Viết mã dưới đây vào file main.dart: 
```
import 'package:flutter/material.dart';
import 'src/app.dart';

void main(){
  runApp(App());
}
```

3 . Tạo file app.dart: 
```
import 'package:flutter/material.dart';
import 'ui/movie_list.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return MaterialApp(
        theme: ThemeData.dark(),
        home: Scaffold(
          body: MovieList(),
        ),
      );
  }
}
```

4. Tạo new  package với tên **resources, blocs, models, ui**.

![](https://images.viblo.asia/b0b3d6ba-5d29-46db-8437-6b65153f869f.png)

* package **blocs** sẽ chứa các file liên quan đến BLOC.
* package **models** sẽ chứa các POJO (Plain Old Java Object) class hoặc  model class của Json response get từ server. 
* package **resources** chứa các class repository  và  thực hiện call network.
* package **ui** chứa list các màn hình hiển thị cho người dùng.

5. Thêm thư viện Rxdart vào trong file pubspec.yaml
```
dependencies:
  flutter:
    sdk: flutter

  # The following adds the Cupertino Icons font to your application.
  # Use with the CupertinoIcons class for iOS style icons.
  cupertino_icons: ^0.1.2
  rxdart: ^0.23.1
  http: ^0.12.0+4

```
và thực hiện cài đặt bằng cách click "Pub get" nếu bạn dùng Android studio hoặc bạn gõ lệnh trong terminal (Mac) , command (Win):
```
flutter packages get
```


6.  Chúng ta đã hoàn thành xong cho bộ khung của project. Giờ sẽ xử lý network layer , hiểu về API endpoint. Bạn thực hiện đăng nhập vào [trang](https://www.themoviedb.org/)  và thực hiện get API key từ Setttings page. Chúng ta sẽ truy cập vào url dưới đây để lấy data: 
```
http://api.themoviedb.org/3/movie/popular?api_key=“your_api_key”
```

Response Data: 
```
{
  "page": 1,
  "total_results": 19772,
  "total_pages": 989,
  "results": [
    {
      "vote_count": 6503,
      "id": 299536,
      "video": false,
      "vote_average": 8.3,
      "title": "Avengers: Infinity War",
      "popularity": 350.154,
      "poster_path": "\/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
      "original_language": "en",
      "original_title": "Avengers: Infinity War",
      "genre_ids": [
        12,
        878,
        14,
        28
      ],
      "backdrop_path": "\/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
      "adult": false,
      "overview": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
      "release_date": "2018-04-25"
    },
```

7. Bây giờ hãy tạo model  hoặc POJO class cho loại response này . Tạo file **item_model.dart** trong package models. Copy đoạn code sau : 
```
class ItemModel {
  int _page;
  int _total_results;
  int _total_pages;
  List<_Result> _results = [];

  ItemModel.fromJson(Map<String, dynamic> parsedJson) {
    print(parsedJson['results'].length);
    _page = parsedJson['page'];
    _total_results = parsedJson['total_results'];
    _total_pages = parsedJson['total_pages'];
    List<_Result> temp = [];
    for (int i = 0; i < parsedJson['results'].length; i++) {
      _Result result = _Result(parsedJson['results'][i]);
      temp.add(result);
    }
    _results = temp;
  }

  List<_Result> get results => _results;

  int get total_pages => _total_pages;

  int get total_results => _total_results;

  int get page => _page;
}

class _Result {
  int _vote_count;
  int _id;
  bool _video;
  var _vote_average;
  String _title;
  double _popularity;
  String _poster_path;
  String _original_language;
  String _original_title;
  List<int> _genre_ids = [];
  String _backdrop_path;
  bool _adult;
  String _overview;
  String _release_date;

  _Result(result) {
    _vote_count = result['vote_count'];
    _id = result['id'];
    _video = result['video'];
    _vote_average = result['vote_average'];
    _title = result['title'];
    _popularity = result['popularity'];
    _poster_path = result['poster_path'];
    _original_language = result['original_language'];
    _original_title = result['original_title'];
    for (int i = 0; i < result['genre_ids'].length; i++) {
      _genre_ids.add(result['genre_ids'][i]);
    }
    _backdrop_path = result['backdrop_path'];
    _adult = result['adult'];
    _overview = result['overview'];
    _release_date = result['release_date'];
  }

  String get release_date => _release_date;

  String get overview => _overview;

  bool get adult => _adult;

  String get backdrop_path => _backdrop_path;

  List<int> get genre_ids => _genre_ids;

  String get original_title => _original_title;

  String get original_language => _original_language;

  String get poster_path => _poster_path;

  double get popularity => _popularity;

  String get title => _title;

  double get vote_average => _vote_average;

  bool get video => _video;

  int get id => _id;

  int get vote_count => _vote_count;
}
```

8. Tạo file **movie_api_provider.dart** trong package **resources**  để thực hiện implement network. Copy và page đoạn code sau vào file : 
```
import 'dart:async';
import 'package:http/http.dart' show Client;
import 'dart:convert';
import '../models/item_model.dart';

class MovieApiProvider {
  Client client = Client();
  final _apiKey = 'your_api_key';

  Future<ItemModel> fetchMovieList() async {
    print("entered");
    final response = await client
        .get("http://api.themoviedb.org/3/movie/popular?api_key=$_apiKey");
    print(response.body.toString());
    if (response.statusCode == 200) {
      // If the call to the server was successful, parse the JSON
      return ItemModel.fromJson(json.decode(response.body));
    } else {
      // If that call was not successful, throw an error.
      throw Exception('Failed to load post');
    }
  }
}
```

Note: Bạn hãy tạo tài khoản từ trang https://www.themoviedb.org/ và lấy **apikey** thay  cho đoạn 'your_api_key'.

Phương thức fetchMovieList dùng để thực hiện call API.Khi cuộc gọi network hoàn tất nó sẽ trả về object  Future ItemModel  nếu cuộc gọi mạng thành công hoặc 1 ngoại lệ . 

9. Tiếp theo chúng ta sẽ tạo **repository.dart** vào trong **resource** . Copy và page đoạn code sau vào trong file : 

```
import 'dart:async';
import 'movie_api_provider.dart';
import '../models/item_model.dart';

class Repository {
  final moviesApiProvider = MovieApiProvider();

  Future<ItemModel> fetchAllMovies() => moviesApiProvider.fetchMovieList();
}
```

Chúng ta sẽ import **movie_api_provider.dart** file và gọi fetchMovieList(). Repository class  là điểm trung tâm mà từ đó dữ liệu sẽ chuyển đến **BLOC**.

10. Bây giờ đến 1 phần phức tạp , implement bloc logic.  Hãy tạo **movies_bloc.dart**  trong package **blocs**. Bạn hãy copy và page vào file  **movies_bloc.dart**  mình sẽ giải thích chi tiết :

```
import '../resources/repository.dart';
import 'package:rxdart/rxdart.dart';
import '../models/item_model.dart';

class MoviesBloc {
  final _repository = Repository();
  final _moviesFetcher = PublishSubject<ItemModel>();

  Observable<ItemModel> get allMovies => _moviesFetcher.stream;

  fetchAllMovies() async {
    ItemModel itemModel = await _repository.fetchAllMovies();
    _moviesFetcher.sink.add(itemModel);
  }

  dispose() {
    _moviesFetcher.close();
  }
}

final bloc = MoviesBloc();
```
Inside the MoviesBloc class, we are creating the Repository class object which will be used to access the fetchAllMovies()

Trong class MoviesBloc, chúng ta tạo  object class Repository dùng để truy cập fetchAllMovies() bằng cách tạo tạo object PublishSubject có trách nhiệm thêm dữ liệu mà nó nhận được từ server dưới dạng đối tượng ItemModel và chuyển đến dạng màn hình UI dưới dạng  luồng . Để chuyển object ItemModel dưới dạng luồng chúng ta tạo method allMovies() có kiểu trả về là Observables. Việc sử dụng RxDart giúp cho việc cập nhật dữ liều từ server sang màn hình được thực hiện 1 cách dễ dàng . Màn hình UI sẽ luôn quan sát class MoviesBloc để lắng nghe sự thay đổi và cập nhật sự thay đổi nếu có. 

11. Phần cuối của bài viết bạn hãy copy đoạn code sau vào file movie_list.dart , file này được tạo từ package   **UI:**

```
import 'package:flutter/material.dart';
import '../models/item_model.dart';
import '../blocs/movies_bloc.dart';

class MovieList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    bloc.fetchAllMovies();
    return Scaffold(
      appBar: AppBar(
        title: Text('Popular Movies'),
      ),
      body: StreamBuilder(
        stream: bloc.allMovies,
        builder: (context, AsyncSnapshot<ItemModel> snapshot) {
          if (snapshot.hasData) {
            return buildList(snapshot);
          } else if (snapshot.hasError) {
            return Text(snapshot.error.toString());
          }
          return Center(child: CircularProgressIndicator());
        },
      ),
    );
  }

  Widget buildList(AsyncSnapshot<ItemModel> snapshot) {
    return GridView.builder(
        itemCount: snapshot.data.results.length,
        gridDelegate:
            new SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2),
        itemBuilder: (BuildContext context, int index) {
          return Image.network(
            'https://image.tmdb.org/t/p/w185${snapshot.data
                .results[index].poster_path}',
            fit: BoxFit.cover,
          );
        });
  }
}
```
Đoạn code trên tôi không sử dụng StatefulWidget, thay vào đó sẽ sử dụng StreamBuilder để thay thế việc cập nhật UI . 

Sau đây là code hoàn chỉnh, các bạn tham khảo nhé: https://github.com/SAGARSURI/MyMovies .

## Tài liệu tham khảo:
https://medium.com/codechai/architecting-your-flutter-project-bd04e144a8f1