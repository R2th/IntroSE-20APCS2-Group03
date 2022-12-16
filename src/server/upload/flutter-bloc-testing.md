Hiện nay Unit test đã được áp dụng rộng rãi và mạnh mẽ, rất nhiều công ty đã coi đây là điều bắt buộc cho mỗi dự án của họ. Trong các dự án mobile nói chung và flutter nói riêng thì việc unit test cũng rất quan trọng. Trong bài viết lần này, chúng ta sẽ cùng nhau tìm hiểu cách viết unit test khi sử dụng thư viện bloc, một thư viện quản lý state rất hiệu quả. 

Để đơn giản, nhanh chóng và dễ hiểu, chúng ta sẽ sử dụng một project mẫu trên https://bloclibrary.dev/#/flutterweathertutorial, các bạn dành chút thời gian đọc project này nhé :D

Trong flutter project, quản lý state là quan trọng, ở giới hạn bài viết, chúng ta sẽ viết unit test cho mỗi bloc của project trên. Mục tiêu của unit test cho bloc chính là tương ứng với mỗi `event`, chúng ta sẽ nhận được các `state` tuần tự tương ứng.

### Add thư viện test cho project
Chúng ta sẽ add 3 thư viện cần thiết sau

```yml
dev_dependencies:
  flutter_test:
    sdk: flutter

  bloc_test: ^3.0.0
  mockito: ^4.1.1
```

1. flutter test sẽ cung cấp các phương thức để có thể test cho dart và flutter
2. bloc_test sẽ cũng cấp các phương thức và cách thức để có thể test và tương tác với bloc
3. mockito sẽ giúp chúng ta mock một số object.

Sau khi add, các bạn nhớ `flutter pub get` nhé :D

### Bloc và các events và states
#### Events

Với project mẫu ở trên, chúng ta sẽ có 2 events chính sau: `FetchWeather` và `RefreshWeather`
```dart
abstract class WeatherEvent extends Equatable {
  const WeatherEvent();
}

class FetchWeather extends WeatherEvent {
  final String city;

  const FetchWeather({@required this.city}) : assert(city != null);

  @override
  List<Object> get props => [city];
}

class RefreshWeather extends WeatherEvent {
  final String city;

  const RefreshWeather({@required this.city}) : assert(city != null);

  @override
  List<Object> get props => [city];
}
```

#### States

Tương ứng chúng ta có các states sau: `WeatherEmpty`, `WeatherLoading`, `WeatherLoaded` và `WeatherError`
```dart
abstract class WeatherState extends Equatable {
  const WeatherState();

  @override
  List<Object> get props => [];
}

class WeatherEmpty extends WeatherState {}

class WeatherLoading extends WeatherState {}

class WeatherLoaded extends WeatherState {
  final Weather weather;

  const WeatherLoaded({@required this.weather}) : assert(weather != null);

  @override
  List<Object> get props => [weather];
}

class WeatherError extends WeatherState {}
```

#### Bloc
Phần xử lý state chính của chúng ta là ở đây `WeatherBloc`

```dart
class WeatherBloc extends Bloc<WeatherEvent, WeatherState> {
  final WeatherRepository weatherRepository;

  WeatherBloc({@required this.weatherRepository})
      : assert(weatherRepository != null);

  @override
  WeatherState get initialState => WeatherEmpty();

  @override
  Stream<WeatherState> mapEventToState(WeatherEvent event) async* {
    if (event is FetchWeather) {
      yield* _mapFetchWeatherToState(event);
    } else if (event is RefreshWeather) {
      yield* _mapRefreshWeatherToState(event);
    }
  }

  Stream<WeatherState> _mapFetchWeatherToState(FetchWeather event) async* {
    yield WeatherLoading();
    try {
      final Weather weather = await weatherRepository.getWeather(event.city);
      yield WeatherLoaded(weather: weather);
    } catch (_) {
      yield WeatherError();
    }
  }

  Stream<WeatherState> _mapRefreshWeatherToState(RefreshWeather event) async* {
    try {
      final Weather weather = await weatherRepository.getWeather(event.city);
      yield WeatherLoaded(weather: weather);
    } catch (_) {
      yield state;
    }
  }
}
```

### Viết unit test

#### Định nghĩa các test case

1. Trường hợp `repository bị null` => expect: `throwsAssertionError`.
2. Trạng thái state lúc khởi tạo bloc => expect: `WeatherEmpty()`.
3. Event `FetchWeather`
+ thành công => expect các states tuần tự là:  `[WeatherLoading, WeatherLoaded]`
+ không thành công => expect các states tuần tự là: `[WeatherLoading, WeatherError]`
5. Event `RefreshWeather`
+ thành công => expect state `[WeatherLoaded]`
+ không thành công => expect không có state nào được trả ra.

Như vậy chúng ta sẽ có tổng cộng `6` testcases.


#### Mock repository class
Vì `WeatherBloc` cần 1 repository thông qua constructor nên chúng ta sẽ mock class này để sử dụng cho test

```dart
class MockWeatherRepository extends Mock implements WeatherRepository {}
```

#### Tạo expect data

Project sẽ get dữ liệu về thời tiết của một địa điểm, nên chúng ta sẽ tạo 1 expect data như sau

```dart
final Weather weather = Weather(
    condition: WeatherCondition.clear,
    formattedCondition: 'Clear',
    minTemp: 15,
    maxTemp: 20,
    locationId: 0,
    location: 'Chicago',
    lastUpdated: DateTime(2019),
  );
```

#### Khởi tạo các object
Chúng ta sử dụng method `setUp` để khởi tạo các object ban đầu

```dart
  group('WeatherBloc', () {
    MockWeatherRepository weatherRepository;
    WeatherBloc weatherBloc;

    setUp(() {
      weatherRepository = MockWeatherRepository();
      weatherBloc = WeatherBloc(weatherRepository: weatherRepository);
    });
 }
```

#### Viết unit test
1. Trường hợp repository null

```dart
 test('throws AssertionError when weatherRepository is null', () {
      expect(() => WeatherBloc(weatherRepository: null), throwsAssertionError);
    });
```

2. Trạng thái khởi tạo
```dart
test('has a correct initialState', () {
      expect(weatherBloc.initialState, WeatherEmpty());
    });
```
3. `FetchWeather`

```dart
group('FetchWeather', () {
      blocTest(
        'emits [WeatherLoading, WeatherLoaded] when weather repository returns weather',
        build: () async {
          when(weatherRepository.getWeather('chicago')).thenAnswer(
            (_) => Future.value(weather),
          );
          return weatherBloc;
        },
        act: (bloc) => bloc.add(FetchWeather(city: 'chicago')),
        expect: [
          WeatherLoading(),
          WeatherLoaded(weather: weather),
        ],
      );

      blocTest(
        'emits [WeatherLoading, WeatherError] when weather repository throws error',
        build: () async {
          when(weatherRepository.getWeather('chicago'))
              .thenThrow('Weather Error');
          return weatherBloc;
        },
        act: (bloc) => bloc.add(FetchWeather(city: 'chicago')),
        expect: [
          WeatherLoading(),
          WeatherError(),
        ],
      );
    });
```

4. `RefreshWeather`

```dart
group('RefreshWeather', () {
      blocTest(
        'emits [WeatherLoaded] when weather repository returns weather',
        build: () async {
          when(weatherRepository.getWeather('chicago')).thenAnswer(
            (_) => Future.value(weather),
          );
          return weatherBloc;
        },
        act: (bloc) => bloc.add(RefreshWeather(city: 'chicago')),
        expect: [
          WeatherLoaded(weather: weather),
        ],
      );

      blocTest(
        'emits [] when weather repository throws error',
        build: () async {
          when(weatherRepository.getWeather('chicago'))
              .thenThrow('Weather Error');
          return weatherBloc;
        },
        act: (bloc) => bloc.add(RefreshWeather(city: 'chicago')),
        expect: [],
      );
    });
```


#### Full test file

```dart
import 'dart:async';

import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:flutter_weather/repositories/weather_repository.dart';
import 'package:flutter_weather/models/weather.dart';
import 'package:flutter_weather/blocs/weather_bloc.dart';

class MockWeatherRepository extends Mock implements WeatherRepository {}

main() {
  final Weather weather = Weather(
    condition: WeatherCondition.clear,
    formattedCondition: 'Clear',
    minTemp: 15,
    maxTemp: 20,
    locationId: 0,
    location: 'Chicago',
    lastUpdated: DateTime(2019),
  );
  group('WeatherBloc', () {
    MockWeatherRepository weatherRepository;
    WeatherBloc weatherBloc;

    setUp(() {
      weatherRepository = MockWeatherRepository();
      weatherBloc = WeatherBloc(weatherRepository: weatherRepository);
    });

    tearDown(() {
      weatherBloc?.close();
    });

    test('throws AssertionError when weatherRepository is null', () {
      expect(() => WeatherBloc(weatherRepository: null), throwsAssertionError);
    });

    test('has a correct initialState', () {
      expect(weatherBloc.initialState, WeatherEmpty());
    });

    group('FetchWeather', () {
      blocTest(
        'emits [WeatherLoading, WeatherLoaded] when weather repository returns weather',
        build: () async {
          when(weatherRepository.getWeather('chicago')).thenAnswer(
            (_) => Future.value(weather),
          );
          return weatherBloc;
        },
        act: (bloc) => bloc.add(FetchWeather(city: 'chicago')),
        expect: [
          WeatherLoading(),
          WeatherLoaded(weather: weather),
        ],
      );

      blocTest(
        'emits [WeatherLoading, WeatherError] when weather repository throws error',
        build: () async {
          when(weatherRepository.getWeather('chicago'))
              .thenThrow('Weather Error');
          return weatherBloc;
        },
        act: (bloc) => bloc.add(FetchWeather(city: 'chicago')),
        expect: [
          WeatherLoading(),
          WeatherError(),
        ],
      );
    });

    group('RefreshWeather', () {
      blocTest(
        'emits [WeatherLoaded] when weather repository returns weather',
        build: () async {
          when(weatherRepository.getWeather('chicago')).thenAnswer(
            (_) => Future.value(weather),
          );
          return weatherBloc;
        },
        act: (bloc) => bloc.add(RefreshWeather(city: 'chicago')),
        expect: [
          WeatherLoaded(weather: weather),
        ],
      );

      blocTest(
        'emits [] when weather repository throws error',
        build: () async {
          when(weatherRepository.getWeather('chicago'))
              .thenThrow('Weather Error');
          return weatherBloc;
        },
        act: (bloc) => bloc.add(RefreshWeather(city: 'chicago')),
        expect: [],
      );
    });
  });
}
```

#### Run test
Các bạn có thể run từng test case, từng group hoặc từng file test. Để chạy all test thì các bạn chạy lệnh sau nhé `flutter test`.


#### Cảm ơn các bạn đã đọc bài viết. Happy coding!