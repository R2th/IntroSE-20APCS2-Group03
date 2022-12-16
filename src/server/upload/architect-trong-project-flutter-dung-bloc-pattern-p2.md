Trong bài viết hôm nay, mình sẽ giải quyết 1 số vấn đề mà kiến trúc  của [bài trước](https://viblo.asia/p/architect-trong-project-flutter-dung-bloc-pattern-p1-3P0lP0Nvlox)  bao gồm : 
1. Giải quyết của các vấn đề hiện tại . 
2. Single Instance và Scoped Instance (BLoC access)
3. Navagation.
4. RxDart’s Transformers.

# 1. Giải quyết của các vấn đề hiện tại . 
Trong bài trước lỗi đầu tiên là mình tạo method dispose() trong class MoviesBloc , hàm này có tác dụng close hoặc dispose tất cả các luồng stream để tránh rò rĩ bộ nhớ. nhưng nó không được gọi ở bất cứ đâu cả, điều này có thể gây rò rĩ bộ nhớ.  Một lỗi khác là tôi đang thực hiện call network bên trong hàm build. 

Class MovieList trong code hiện tại đang dùng StatelessWidget, hàm **build** sẽ được  gọi bất cứ khi nào  nó được thêm vào cây Widget . Do mình đặt hàm bloc.fetchAllMovies() (xem code [phần 1](https://viblo.asia/p/architect-trong-project-flutter-dung-bloc-pattern-p1-3P0lP0Nvlox)) bên trong hàm build cho nên nó bị gọi nhiều lần . Vì sao mình nói như vậy  vì class MovieList là class được kế thừa từ StatelessWidget, mà các bạn đã biết 1 class StatelessWidget sẽ call lại hàm build khi class đó phụ thuộc vào thằng class chứa nó, nếu thằng class cha Update UI  thì thằng class MovieList sẽ thực hiện call lại hàm build.
Class MovieList nó không có các hàm **initState** and **dispose** như class StatefulWidget. Method **initState** chỉ gọi lần đâu khi cấp phát resource còn method  **dispose**  nó call disposing đã cấp phát resource . Bây giờ mình sẽ chuyển class MovieList kế thừa từ StatefulWidget . 
Trong class movie_list.dart thay đoạn code sau : 
```
import 'package:flutter/material.dart';
import '../models/item_model.dart';
import '../blocs/movies_bloc.dart';

class MovieList extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return MovieListState();
  }
}

class MovieListState extends State<MovieList> {
  @override
  void initState() {
    super.initState();
    bloc.fetchAllMovies();
  }

  @override
  void dispose() {
    bloc.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
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
          return GridTile(
            child: Image.network(
              'https://image.tmdb.org/t/p/w185${snapshot.data
                  .results[index].poster_path}',
              fit: BoxFit.cover,
            ),
          );
        });
  }
}
```
Trong đoạn code trên tôi gọi bloc.fetchAllMovies() trong method initState còn bloc.dispose() trong method dispose của class MovieListState.

**Note**: Không bao giờ thực hiện call network or xử lý db ở trong hàm build và đảm bảo rằng bạn đã dispose hoặc close luồng stream. 

##   2. Thực hiện  tính năng mới
Mình sẽ thực hiện thêm tính năng detail movile khi người dùng click vào 1 bộ phim , các bạn xem video dưới đây : 
https://www.youtube.com/embed/krXb9CzGRxU?feature=o

## 3. Lập Kế hoạch cho luồng app
Trước khi thêm 1 màn hình nào thì  cách tốt nhất bạn viết trước ra giấy để hình dung được luồng của bạn đi như thế nào. Ví dụ : 
![](https://images.viblo.asia/6a32c754-7c95-457e-85bc-b155413e1612.png)

Mình sẽ giải thích về flow của hình trên : 
1. Movie List Screen:  sẽ hiển thị list các bộ phim theo dạng grid list. 
2. Movie List Bloc: đây là cầu nối để lấy dữ liệu từ repository và truyền nó đến màn Movie List Screen.
3. Movie Detail Screen: đây là màn bạn sẽ xem thông tin chi tiết của bộ phim . 
4. Repository: đây là trung tâm từ đó luồng data được controller.
5. API provider: Triển khai việc call api . 

## 2. Single Instance và Scoped Instance
Trên màn hình Movie List Screen các bạn có thể lấy bloc theo 2 cách Single Instance ,  Scoped Instance. Single Instance có thể được truy cập ở bất cứ đâu trên app còn Scoped Instance có quyền truy cập hạn chế , nó chỉ được truy cập ở màn hình mà nó liên kết. 

![](https://images.viblo.asia/52241cb6-b8dc-43af-bfcf-ec68f46b4b6a.png)

Nhìn trên diagram, **Bloc** chỉ có thể truy cập vào màn hình và 2 widget bên dưới màn hình. Chúng ta có thể dùng InheritedWidget để giữ Bloc trong nó . InheritedWidget sẽ wrap Screen widget,  cho phép Screen và widget dưới nó có thể truy cập .
Single Instance  là cách truy cập **Bloc** đối với app nhỏ nhưng làm việc với app lớn thì  dùng Scoped Instance là cách tuyệt vời. 

## 3. Adding the detail screen
Thêm màn hình detail cho app. Khi user click vào 1 bô phim sẽ hiển thị màn detail và show các thông tin  về bồ phim. Tạo file movie_detail.dart , thêm đoạn code sau : 
```
import 'package:flutter/material.dart';

class MovieDetail extends StatefulWidget {
  final posterUrl;
  final description;
  final releaseDate;
  final String title;
  final String voteAverage;
  final int movieId;

  MovieDetail({
    this.title,
    this.posterUrl,
    this.description,
    this.releaseDate,
    this.voteAverage,
    this.movieId,
  });

  @override
  State<StatefulWidget> createState() {
    return MovieDetailState(
      title: title,
      posterUrl: posterUrl,
      description: description,
      releaseDate: releaseDate,
      voteAverage: voteAverage,
      movieId: movieId,
    );
  }
}

class MovieDetailState extends State<MovieDetail> {
  final posterUrl;
  final description;
  final releaseDate;
  final String title;
  final String voteAverage;
  final int movieId;

  MovieDetailState({
    this.title,
    this.posterUrl,
    this.description,
    this.releaseDate,
    this.voteAverage,
    this.movieId,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        top: false,
        bottom: false,
        child: NestedScrollView(
          headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
            return <Widget>[
              SliverAppBar(
                expandedHeight: 200.0,
                floating: false,
                pinned: true,
                elevation: 0.0,
                flexibleSpace: FlexibleSpaceBar(
                    background: Image.network(
                  "https://image.tmdb.org/t/p/w500$posterUrl",
                  fit: BoxFit.cover,
                )),
              ),
            ];
          },
          body: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(margin: EdgeInsets.only(top: 5.0)),
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 25.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Container(margin: EdgeInsets.only(top: 8.0, bottom: 8.0)),
                Row(
                  children: <Widget>[
                    Icon(
                      Icons.favorite,
                      color: Colors.red,
                    ),
                    Container(
                      margin: EdgeInsets.only(left: 1.0, right: 1.0),
                    ),
                    Text(
                      voteAverage,
                      style: TextStyle(
                        fontSize: 18.0,
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(left: 10.0, right: 10.0),
                    ),
                    Text(
                      releaseDate,
                      style: TextStyle(
                        fontSize: 18.0,
                      ),
                    ),
                  ],
                ),
                Container(margin: EdgeInsets.only(top: 8.0, bottom: 8.0)),
                Text(description),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

Bạn có thể hàm khởi tạo của class này cần thêm 1 vài tham số . Mình sẽ thêm logic để đưa màn hình danh sách sang màn hình detail . 
# 1. Navigation
Trong Flutter  nếu bạn muốn chuyển từ màn hình này sang màn hình khác  bạn dùng [Navigator](https://api.flutter.dev/flutter/widgets/Navigator-class.html) . Hãy triển khai logic điều hướng bên trong file movie_list.dart . 
Khi bạn tap 1 bộ phim thì sẽ mở ra màn hình detail screen và sẽ show data truyền từ màn list movie sang màn hình detail . 

```
import 'package:flutter/material.dart';
import '../models/item_model.dart';
import '../blocs/movies_bloc.dart';
import 'movie_detail.dart';

class MovieList extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return MovieListState();
  }
}

class MovieListState extends State<MovieList> {
  @override
  void initState() {
    super.initState();
    bloc.fetchAllMovies();
  }

  @override
  void dispose() {
    bloc.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
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
          return GridTile(
            child: InkResponse(
              enableFeedback: true,
              child: Image.network(
                'https://image.tmdb.org/t/p/w185${snapshot.data
                    .results[index].poster_path}',
                fit: BoxFit.cover,
              ),
              onTap: () => openDetailPage(snapshot.data, index),
            ),
          );
        });
  }

  openDetailPage(ItemModel data, int index) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) {
        return MovieDetail(
          title: data.results[index].title,
          posterUrl: data.results[index].backdrop_path,
          description: data.results[index].overview,
          releaseDate: data.results[index].release_date,
          voteAverage: data.results[index].vote_average.toString(),
          movieId: data.results[index].id,
        );
      }),
    );
  }
}
```

Bây giờ , tại màn movie detail hãy show đoạn intro lấy từ API : 
```
https://api.themoviedb.org/3/movie/<movie_id>/videos?api_key=your_api_key
```
Trong api trên chúng ta thay thế đoạn <movie_id> và your_api_key. 
Response của api trả về là : 
```
{
  "id": 299536,
  "results": [
    {
      "id": "5a200baa925141033608f5f0",
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "key": "6ZfuNTqbHE8",
      "name": "Official Trailer",
      "site": "YouTube",
      "size": 1080,
      "type": "Trailer"
    },
    {
      "id": "5a200bcc925141032408d21b",
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "key": "sAOzrChqmd0",
      "name": "Action...Avengers: Infinity War",
      "site": "YouTube",
      "size": 720,
      "type": "Clip"
    },
    {
      "id": "5a200bdd0e0a264cca08d39f",
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "key": "3VbHg5fqBYw",
      "name": "Trailer Tease",
      "site": "YouTube",
      "size": 720,
      "type": "Teaser"
    },
    {
      "id": "5a7833440e0a26597f010849",
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "key": "pVxOVlm_lE8",
      "name": "Big Game Spot",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser"
    },
    {
      "id": "5aabd7e69251413feb011276",
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "key": "QwievZ1Tx-8",
      "name": "Official Trailer #2",
      "site": "YouTube",
      "size": 1080,
      "type": "Trailer"
    },
    {
      "id": "5aea2ed2c3a3682bf7001205",
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "key": "LXPaDL_oILs",
      "name": "\"Legacy\" TV Spot",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser"
    },
    {
      "id": "5aea2f3e92514172a7001672",
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "key": "PbRmbhdHDDM",
      "name": "\"Family\" Featurette",
      "site": "YouTube",
      "size": 1080,
      "type": "Featurette"
    }
  ]
}
```

Đối với đoạn response trên chúng ta cần tạo class POJO. Tạo file **trailer_model**.dart trong package model. 

```
class TrailerModel {
  int _id;
  List<_Result> _results = [];

  TrailerModel.fromJson(Map<String, dynamic> parsedJson) {
    _id = parsedJson['id'];
    List<_Result> temp = [];
    for (int i = 0; i < parsedJson['results'].length; i++) {
      _Result result = _Result(parsedJson['results'][i]);
      temp.add(result);
    }
    _results = temp;
  }

  List<_Result> get results => _results;

  int get id => _id;
}

class _Result {
  String _id;
  String _iso_639_1;
  String _iso_3166_1;
  String _key;
  String _name;
  String _site;
  int _size;
  String _type;

  _Result(result) {
    _id = result['id'];
    _iso_639_1 = result['iso_639_1'];
    _iso_3166_1 = result['iso_3166_1'];
    _key = result['key'];
    _name = result['name'];
    _site = result['site'];
    _size = result['size'];
    _type = result['type'];
  }

  String get id => _id;

  String get iso_639_1 => _iso_639_1;

  String get iso_3166_1 => _iso_3166_1;

  String get key => _key;

  String get name => _name;

  String get site => _site;

  int get size => _size;

  String get type => _type;
}
```

Trong file movie_api_provider.dart hãy page đoạn code sau : 
```
import 'dart:async';
import 'package:http/http.dart' show Client;
import 'dart:convert';
import '../models/item_model.dart';
import '../models/trailer_model.dart';

class MovieApiProvider {
  Client client = Client();
  final _apiKey = '802b2c4b88ea1183e50e6b285a27696e';
  final _baseUrl = "http://api.themoviedb.org/3/movie";

  Future<ItemModel> fetchMovieList() async {
    final response = await client.get("$_baseUrl/popular?api_key=$_apiKey");
    if (response.statusCode == 200) {
      // If the call to the server was successful, parse the JSON
      return ItemModel.fromJson(json.decode(response.body));
    } else {
      // If that call was not successful, throw an error.
      throw Exception('Failed to load post');
    }
  }

  Future<TrailerModel> fetchTrailer(int movieId) async {
    final response =
        await client.get("$_baseUrl/$movieId/videos?api_key=$_apiKey");

    if (response.statusCode == 200) {
      return TrailerModel.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to load trailers');
    }
  }
}
```

Update đoạn code sau vào file **repository.dart **: 
```
import 'dart:async';
import 'movie_api_provider.dart';
import '../models/item_model.dart';
import '../models/trailer_model.dart';

class Repository {
  final moviesApiProvider = MovieApiProvider();

  Future<ItemModel> fetchAllMovies() => moviesApiProvider.fetchMovieList();

  Future<TrailerModel> fetchTrailers(int movieId) => moviesApiProvider.fetchTrailer(movieId);
}
```

Bây giờ hãy triển khai  **Scoped Instance BLoC** .Tạo file movie_detail_bloc.dart trong **blocs** package, tạo file **movie_detail_bloc_provider.dart** cũng trong **blocs** package. 
Đoạn code của file **movie_detail_bloc_provider.dart** : 
```
import 'package:flutter/material.dart';
import 'movie_detail_bloc.dart';
export 'movie_detail_bloc.dart';

class MovieDetailBlocProvider extends InheritedWidget {
  final MovieDetailBloc bloc;

  MovieDetailBlocProvider({Key key, Widget child})
      : bloc = MovieDetailBloc(),
        super(key: key, child: child);

  @override
  bool updateShouldNotify(_) {
    return true;
  }

  static MovieDetailBloc of(BuildContext context) {
    return (context.inheritFromWidgetOfExactType(MovieDetailBlocProvider)
            as MovieDetailBlocProvider)
        .bloc;
  }
}
```

Class có thể mở rộng từ class InheritedWidget và cung cấp truy cập bloc thông qua context. Context này được bọc trong InheritedWidget. 
Viết  thêm đoạn code movie_detail_bloc.dart : 
```
import 'dart:async';

import 'package:rxdart/rxdart.dart';
import '../models/trailer_model.dart';
import '../resources/repository.dart';

class MovieDetailBloc {
  final _repository = Repository();
  final _movieId = PublishSubject<int>();
  final _trailers = BehaviorSubject<Future<TrailerModel>>();

  Function(int) get fetchTrailersById => _movieId.sink.add;
  Observable<Future<TrailerModel>> get movieTrailers => _trailers.stream;

  MovieDetailBloc() {
    _movieId.stream.transform(_itemTransformer()).pipe(_trailers);
  }

  dispose() async {
    _movieId.close();
    await _trailers.drain();
    _trailers.close();
  }

  _itemTransformer() {
    return ScanStreamTransformer(
      (Future<TrailerModel> trailer, int id, int index) {
        print(index);
        trailer = _repository.fetchTrailers(id);
        return trailer;
      },
    );
  }
}
```

Tôi sẽ giải thích cho bạn 1 chút : Để get được data trailer từ server chúng ta sẽ gửi movile id lên và lấy về list danh sách các đoạn trailer . Để thực hiện ý tưởng trên tôi sẽ dùng **RxDart - Transformers**. Tôi sẽ giới thiệu phần này ở bài học . 

# Tài liệu tham khảo : 
https://medium.com/codechai/architect-your-flutter-project-using-bloc-pattern-part-2-d8dd1eca9ba5