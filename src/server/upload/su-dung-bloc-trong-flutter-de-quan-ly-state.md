Bloc là một lib để quản lý state cho Flutter application. B.L.o.C nghĩa là **Business Logic Component**. Nhận 'Event' như là input và trả về  output là 'State'. Bloc được xây dựng dựa trên RxDart.

Chúng ta có thể chia Flutter application architecture thành 3 lớp sau:
1. Biển diễn của View Layer.
2. Bloc
3. Data Layer

Vậy có nghĩa là Bloc đứng giữa 2 lớp View và Data.

### 1. Data Layer

Có nhiệm vụ cung cấp data từ bất kể nguồn nào. **Data Provider** cung cấp data tho và **repository** sẽ là trình đóng gói một hoặc nhiều data providers.

### 2. Bloc hay Bussiness Logic

Có nhiệm vụ nhận event từ lớp biểu diễn và trả về state mới. Hoạt động như một cầu nối giữa lớp data và lớp presentation.

### 3. Presentation Layer

Có nhiệm vụ render chính nó dựa trên một hoặc nhiều state của bloc. Nó cũng xử lý các sự kiện input của user và lifecycle event của application.

## Một số concept cho Bloc

### 1. Events

Event được truyền vào một Bloc. Nó giống như concept **action** trong Redux. Trong lớp presentation, event được tạo ra bởi tương tác của user như button click và truyền vào Bloc. Một event có thể bao gồm vài data được thêm vào.

### 2. States

State là một phần của application state. Nó là output của Bloc. Khi state thay đổi, thành phần UI sẽ được thông báo và dựa vào current state, nó sẽ tự render lại.

### Transition

Thay đổi từ một state sang state khác gọi là transition. Nó bao gồm current state, event và state tiếp theo.

Tóm lại:

* Một **Bloc** phải extend base class **Bloc** của core **bloc** package.
* Một **Bloc** phải định nghĩa initial state (state ban đầu).
* Phải implement function **mapEventToState**. Function này nhận event vào như là tham số. Nó trả về output là **stream** của **state** mới.
* Để truy cập vào current state của bloc, chúng ta có thể sử dụng thuộc tính **currentState**.
* Một bloc phải có phương thức **dispatch**. **Dispatch** nhận một **event** và trigger **mapEventToState**. **Dispatch** có thể gọi trong lớp presentation trong bloc.
* **onTransition** được gọi trước khi update state bloc được update.
* **onError** có thể override để biết được exception của bloc.

Dưới đây là một số code demo về Bloc:

### Bước 1: Tạo Events

```dart
part of 'settings_bloc.dart';
@immutable
abstract class SettingsEvent {
  final dynamic payload;
  SettingsEvent(this.payload);
}
class FontSize extends SettingsEvent {
  FontSize(double payload) : super(payload);
}
class Bold extends SettingsEvent {
  Bold(bool payload) : super(payload);
}
class Italic extends SettingsEvent {
  Italic(bool payload) : super(payload);
}
```

### Bước 2: Tạo State

```dart
part of 'settings_bloc.dart';
@immutable
abstract class SettingsState {
  final double sliderFontSize;
  final bool isBold;
  final bool isItalic;
SettingsState({this.sliderFontSize, this.isBold, this.isItalic});
double get fontSize => sliderFontSize * 30;
}
class InitialSettingsState extends SettingsState {
  InitialSettingsState()
      : super(sliderFontSize: 0.5, isBold: false, isItalic: false);
}
class NewSettingState extends SettingsState {
  NewSettingState.fromOldSettingState(SettingsState oldState,
      {double sliderFontSize, bool isBold, bool isItalic})
      : super(
          sliderFontSize: sliderFontSize ?? oldState.sliderFontSize,
          isBold: isBold ?? oldState.isBold,
          isItalic: isItalic ?? oldState.isItalic,
        );
}
```

### Bước 3: Tạo Bloc

```dart
import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';
part 'settings_event.dart';
part 'settings_state.dart';
class SettingsBloc extends Bloc<SettingsEvent, SettingsState> {
  @override
  SettingsState get initialState => InitialSettingsState();
@override
  Stream<SettingsState> mapEventToState(SettingsEvent event) async* {
    if (event is FontSize) {
      yield NewSettingState.fromOldSettingState(currentState,
          sliderFontSize: event.payload);
    } else if (event is Bold) {
      yield NewSettingState.fromOldSettingState(currentState,
          isBold: event.payload);
    } else if (event is Italic) {
      yield NewSettingState.fromOldSettingState(currentState,
          isItalic: event.payload);
    }
  }
}
```

### Bước 4: Tạo BlocProvider trong **main.dart**

```dart
import 'package:flutter/material.dart';
import 'package:states_bloc/home.dart';
import 'package:states_bloc/about.dart';
import 'package:states_bloc/settings.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:states_bloc/bloc/settings/settings_bloc.dart';
void main() {
  final BlocProvider<SettingsBloc> blocProvider = BlocProvider<SettingsBloc>(
    builder: (_) => SettingsBloc(),
    child: MyApp(),
  );
runApp(blocProvider);
}
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/',
      routes: {
        '/': (context) => Home(),
        '/about': (context) => About(),
        '/settings': (context) => Settings(),
      },
    );
  }
}
```

### Bước 5: Sử dụng state Bloc và dispatch events

```dart
import 'package:flutter/material.dart';
import 'package:states_bloc/drawer_menu.dart';
import 'package:states_bloc/bloc/settings/settings_bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
class Settings extends StatelessWidget {
  double _value = 0.5;
  bool isBold = false;
  bool isItalic = false;
@override
  Widget build(BuildContext context) {
    final SettingsBloc settingsBloc = BlocProvider.of<SettingsBloc>(context);
return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.teal,
        title: Text('Settings'),
      ),
      drawer: DrawerMenu(),
      body: BlocBuilder<SettingsBloc, SettingsState>(
        builder: (context, state) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Padding(
                padding: EdgeInsets.only(left: 20, top: 20),
                child: Text(
                  'Font Size: ${state.fontSize.toInt()}',
                  style: TextStyle(
                      fontSize: Theme.of(context).textTheme.headline.fontSize),
                ),
              ),
              Slider(
                  min: 0.5,
                  value: state.sliderFontSize,
                  onChanged: (newValue) {
                    settingsBloc.dispatch(FontSize(newValue));
                  }),
              Container(
                margin: EdgeInsets.symmetric(horizontal: 8),
                child: Row(
                  children: <Widget>[
                    Checkbox(
                      value: state.isBold,
                      onChanged: (newVal) {
                        settingsBloc.dispatch(Bold(newVal));
                      },
                    ),
                    Text(
                      'Bold',
                      style: getStyle(state.isBold, false),
                    ),
                  ],
                ),
              ),
              Container(
                margin: EdgeInsets.symmetric(horizontal: 8),
                child: Row(
                  children: <Widget>[
                    Checkbox(
                        value: state.isItalic,
                        onChanged: (newVal) {
                          settingsBloc.dispatch(Italic(newVal));
                        }),
                    Text(
                      'Italic',
                      style: getStyle(false, state.isItalic),
                    ),
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }
TextStyle getStyle([bool isBold = false, bool isItalic = false]) {
    return TextStyle(
      fontSize: 18,
      fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
      fontStyle: isItalic ? FontStyle.italic : FontStyle.normal,
    );
  }
}
```

Bài viết này mình đã có viết ngắn gọn và dễ hiểu nhất về Bloc và cách sử dụng nó. Cảm ơn các bạn đã đọc bài của mình :D 

Tham khảo: https://medium.com/@mahmudahsan/how-to-use-bloc-in-flutter-to-manage-state-d0e66c0b47f1