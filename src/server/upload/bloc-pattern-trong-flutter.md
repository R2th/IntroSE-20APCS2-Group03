Trước khi tìm hiểu Fluter BLoC là gì. Các bạn hãy xem qua kiến trúc 1 ứng dụng sử dụng BLoC Pattern.
![](https://images.viblo.asia/e7a2077c-558b-4ba4-83c5-207927b2dd7c.png)

# 1. BLoC Parttern là gì.

Nếu bạn từng là lập trình viên Android, thì chắc các bạn đã quá quen với 2 kiến trúc nổi tiếng là MVP và MVVM được sử dụng rất nhiều trong vài năm gần đây. Nếu bạn nhìn vào sơ đồ trên thì các bạn cũng hình dung ra được BLoC Parttern gần như hoàn toàn tương đồng với 2 kiến trúc nói trên.

Sơ đồ trên cho thấy luồng dữ liệu từ UI đến lớp Data và ngược lại như thế nào. BLOC không có bất kỳ liên kết nào với các Widgets trên UI và UI chỉ lắng nghe sự thay đổi đến từ BLOC class.

BLoC là 1 hệ thống quản lý **state** cho  **Fultter** được đề nghị bởi  **Google developers**. Nó giúp lập trình viên quản lý **state** và luồng dữ liệu trong ứng dụng của bạn. Vậy BLoC sử dụng cái gì để giúp chúng ta thực hiện những công việc trên.

Câu trả lời đó là **"STREAMS" or "REACTIVE"**.  Nói chung dữ liệu được chuyển từ BLOC đến UI hoặc ngược lại từ UI xuống BLOC dưới dạng **STREAMS**.

 Sau đây mình sẽ xây dựng 1 project nhỏ để lấy dữ liệu từ server và hiển thị dưới dạng list  để giúp các bạn hiểu rõ hơn cơ chế của BLOC.
 
# 2. Sử dụng BLoC Parttern
Phần khởi tạo project thì mình sẽ không nói chi tiết ở đây.
![](https://images.viblo.asia/3b93d430-d401-4359-93bc-b986db406364.png)

-  **blocs package** là nơi sẽ chứa các **BLOC implementation** code của ứng dụng.
-  **models package** là nơi chứa các models class tương ứng với file Json được lấy về từ server.
-  **resources package** nơi chứa các class thực hiện chức năng tương tác với server.
-  **ui package** nơi chứa các class UI dể hiển thị lên màn hình cho người dùng.

Thêm nữa ở đây mình cần sử dụng thêm thư viện **RxDart**.  Mở và thêm vào file **pubspec.yaml**

```
dependencies:
  flutter:
    sdk: flutter

  # The following adds the Cupertino Icons font to your application.
  # Use with the CupertinoIcons class for iOS style icons.
  cupertino_icons: ^0.1.2
  rxdart: ^0.18.0
  http: ^0.12.0+1
```

Đồng bộ thư viện với câu lệnh Terminal
```
flutter packages get
```

Sau bước này các bạn cần chắc chắn là đã từng thao thác với [moviedb](http://api.themoviedb.org/3/movie). Còn nếu chưa biết đến cơ sở dữ liệu nổi tiếng này, thì các bạn có thể[ tham khảo thêm ở đây](https://www.themoviedb.org/signup)

Còn nếu bạn nào đã thao tác rồi thì api chúng ta cần sử dụng là đây

http://api.themoviedb.org/3/movie/popular?api_key=“your_api_key”

Điền Api_key và test thử với Postman thì chúng ta sẽ  nhận về 1 chuỗi Json như sau.
```Dart
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
      "overview": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. ...",
      "release_date": "2018-04-25"
    },
```

Quay lại với  **models package**  chúng ta cần tạo mới các class để thực hiện việc convert dữ liệu từ String => Object

```Dart
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
// get set 
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
  
// get set 
}
```

Ở đây các bạn chú ý và function **ItemModel.fromJson()**  nó sẽ thực thi việc chuyển đổi dữ liệu từ  Json => Object với các khóa chính xác.

Bây giờ chúng ta sẽ quan tâm tới việc lấy dữ liệu từ **Server** và **Convert** thành Object để sử dụng được như thế nào. Các bạn quay lại với  **resources package** hãy tạo 1 file **movie_api_provider.dart.** và để các dòng code dưới đây vào.

```Dart
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

Func **fetchMovieList()** sẽ thực hiện công việc mà các bạn mong muốn. Nhưng hãy lưu ý là nó ném ra 1 **Exception** nếu công việc lấy và chuyển đổi dữ liệu thất bại.

```Dart
class Repository {
  final moviesApiProvider = MovieApiProvider();

  Future<ItemModel> fetchAllMovies() => moviesApiProvider.fetchMovieList();
}
```

Khởi tạo **Repository** để chứa các phương thức được cung cấp bởi **MovieApi**. Ở đây chúng ta chỉ demo 1 api nên nó là khá thừa thãi, nhưng hãy hình dung là trong ứng dụng của bạn có rất nhiều Api từ nhiều nguồn khác nhau và bạn cần gom chúng lại theo 1 **Title** nhất định như **UserRepository** hay **MovieRepository** thì nó lại có khá nhiều hiệu quả nhé.

Nào giờ đến phần quan trọng nhất của bài viết. Các bạn quay lại với **blocs package**

```Dart
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


Ở đây, mình khỏi tạo 1 **PublishSubject** nó có trách nhiệm thêm thêm dữ liệu mà nó nhận được từ **Repository** dưươ dạng **ItemModel** và chuyển chuyển dữ liệu tới UI dưới dạng 1 **stream**. Để thực hiện công việc trên, mình tạo ra 1 hàm **fetchAllMovies()** có kiểu trả về là 1 **Observable**. (Nếu các bạn chưa hiểu **Observable** là gì thì có thể tham khảo thêm RxDart và Observable [ở đây](https://pub.dev/packages/rxdart))

Nhìn xuống dòng cuối cùng, mình tạo ra 1 biến để có thể truy cập vào **MoviesBloc**.

Giờ tới phần cuối cùng. Là làm sao để hiển thị những dữ liệu được lấy từ server ở phía trên lên màn hình ứng dụng. Trong   **ui package** các bạn thêm 1 file **movie_list.dart**

```Dart
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
Có sự thú vị ở đây là mình không sử dụng **StatefulWidget**. Nhưng thay vào đó mình sử dụng **StreamBuilder** để thực hiện công việc tương tự **StatefulWidget** là cập nhật lại UI cho ngời dùng.

Như ở phần trên mình có giới thiệu. *Class MoviesBloc* sẽ truyền dữ liệu từ *Network* với UI dưới dạng 1 **STREAMS** nên để nhận được luồng dữ liệu từ *MoviesBloc* truyền lên thì các Class UI cầần sử dụng 1 **StreamBuilder** để lắng nghe sự thay đổi của dữ liệu và cập nhật giao diện người dùng cho phù hợp.

Ở đây **StreamBuilder** đang lắng nghe sự thay đổi của luồng dữ liệu được trả về ở phương thức **bloc.fetchAllMovies()**. Vì vậy khi có dữ liệu đến **StreamBuilder** sẽ hiển thị với người dùng những gì mà nó nhận được. Như các bạn để ý thì **snapshot.data** sẽ là nơi đón nhận và giữ đối tượng **ItemModel** và công việc còn lại với lập trình viên là chỉ việc lấy dữ liệu từ đó ra và hiển thị cập nhật lên UI.

Trên đây mình đã giới thiệu qua cho các bạn tư tưởng, phương thức và cách hoạt động của **BLoC Parttern** , **STREAMS**.  Đây là cách các bạn `implementation` **BLoC Parttern** cơ bản nhất hay mình còn gọi nôm na là bằng `implementation bằng tay` :D :D :D. 

Ngoài ra các bạn có thể tìm hiểu khá nhiều thư viện để thực hiện hỗ trợ **BLoC Parttern**  như `flutter_bloc` vvv. Nhưng để sử dụng thành thạo các  thư viện trên thì bạn cần hiểu về **BLoC Parttern** , **STREAMS** :D :D :D. Hy vọng bài biết trên sẽ giúp ích cho bạn.