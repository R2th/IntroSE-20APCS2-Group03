Riverpod -  provider but different . Là 1 package nâp cấp của "provider " mới được release và mình muốn tìm  hiểu về nó. 
Thi thoảng đi đánh đế chế thâu đêm ,  đánh 7C thì tới C thứ 3 là bắt đầu lộn tỉ số , tranh cãi thường xuyên nên mình muốn thử làm app có chức năng khắc phục cái này. Theo tiêu đề mình sẽ thử dùng Rivepod để làm chức năng cập nhật tỉ số.  
Ý kiến cá nhân về state mannager trong Flutter (with out Bloc) : 
provider + changeNotifier => dễ áp dụng , code dễ hiểu.<br>
provider + state_notifier => tốt hơn  provider + changeNotifier khi dễ quản lí performance app hơn.<br>
Riverpod + state_notifier:  Lần này mình sẽ thử dùng cái này để thử hiểu nó.

Bắt đầu : 
```
  hooks_riverpod: ^0.5.1
  state_notifier: ^0.5.0
  uuid: ^2.2.0
```
thêm 3 package trên vào file pubspec.yaml rồi run 'pub get'. Mình dùng hooks nên sẽ hooks_riverpod. Nếu không dùng hooks thì chuyển thành flutter_riverpod.<br>
Tiếp theo tạo file result.dart để quản lý kết quả tỉ số các C 
```

import 'package:flutter/cupertino.dart';
import 'package:state_notifier/state_notifier.dart';
import 'package:uuid/uuid.dart';

class Result {
  Result({
    this.team1Result = 0,
    this.team2Result = 0,
    this.isDisableButton = false,
    String id,

}) : id = id ?? Uuid().v4();

  final int team1Result;
  final int team2Result;
  final  String id;
  final bool isDisableButton;
}

class ResultList extends StateNotifier<List<Result>> {
  ResultList(List<Result> state) : super(state ?? []);

  void add() {
    state = [
      ...state,
      Result(),
    ];
  }

  void toggleButton({@required String id}) {
    state = [
      for (final result in state)
        if (result.id == id)
          Result(
            team1Result: result.team1Result,
            team2Result: result.team2Result,
            id: result.id,
            isDisableButton: true,
          )
        else
          result,
    ];

  }

  void addTeam1Result({@required String id}) {
    state = [
      for (final result in state)
        if (result.id == id)
          Result(
            team1Result: result.team1Result + 1,
            team2Result: result.team2Result,
            id: result.id,
          )
      else
        result,
    ];

  }

  void addTeam2Result({@required String id}) {
    state = [
      for (final result in state)
        if (result.id == id)
          Result(
            team1Result: result.team1Result,
            team2Result: result.team2Result + 1,
            id: result.id,
          )
        else
          result,
    ];

  }

}
```
Class Result để lưu kết quả  các C , nó gồm team1Result là kết quả team 1, team2Result  là kết quả team 2, isDisableButton để check trạng thái button , và  id . Class ResultList để quản lí trạng thái của Result và chứa List<Result > để hiển thị danh sách kết quả các C.<br>
    hàm add(): Để add thêm 1 C mới khi C cũ có 1 team chạm 3 (chạm 3 hay chạm mấy cũng dc. đánh chế thì các C thường chạm 3 )<br>.
    hàm addTeam1Result(): để cộng thêm 1 chạm cho team 1.Do có nhiều C nên phải  theo id của C .<br>
    hàm addTeam2Result(): để cộng thêm 1 chạm cho team 2.Do có nhiều C nên phải  theo id của C .<br>
    hàm toggleButton(): để check xem nếu kết quả 1 team đạt tới 3 thì disable các button chỉnh sửa kết quả.<br>
    
Tiếp theo tạo file 'result_tile'.File này build  1 widget để hiển thị các C, nó tương tự như Row trong TableView bên IOS. Trong widget này chưá Text hiển thị kết quả các team và  button add để công thêm 1 chạm cho 1 team,  tự động add thêm 1 C mới khi có 1 team chạm 3, tự động disableButton add khi có 1 team chạm 3<br>

```
import 'package:chottiso2/main.dart';
import 'package:chottiso2/state_manager/result.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'constants.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class ResultTile extends HookWidget{
   ResultTile({Key key, this.i, this.result}) : super(key: key);
  final int i;
  final Result result;
  @override
  Widget build(BuildContext context) {
    final results = useProvider(resultListProvider.state);

    return Column(
      children: <Widget>[
        Padding(
          padding: EdgeInsets.only(left: 20, right: 20),
          child: Container(
            decoration: BoxDecoration(
              color: kBackgroundColor,
              boxShadow: [kDefaultShadow],
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Container(
                  padding: EdgeInsets.all(10),
                  width: MediaQuery.of(context).size.width / 2 - 30,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Text(useProvider(resultListProvider.state)[i].team1Result.toString(),
                        style: TextStyle(
                          fontWeight: FontWeight.w900,
                          fontSize: 24,
                        ),
                      ),
                      Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.all(Radius.circular(5)),
                        ),
                        child: IconButton(
                          onPressed: result.isDisableButton ? null :  () {
                            resultListProvider.read(context).addTeam1Result(id: result.id);
                             if (results[i].team1Result >= 2) {
                               resultListProvider.read(context).toggleButton(id: result.id);
                               resultListProvider.read(context).add();
                           }
                          },
                          icon: Icon(Icons.add, size: 30,),
                        ),
                      ),
                    ],
                  ),
                ),

                SizedBox(width: 3,
                  height: 30,
                  child: Container(
                    color: Colors.blueGrey,
                  ),
                ),
                Container(
                  padding: EdgeInsets.all(10),
                  width: MediaQuery.of(context).size.width / 2 - 30,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Text(useProvider(resultListProvider.state)[i].team2Result.toString(),
                        style: TextStyle(
                          fontWeight: FontWeight.w900,
                          fontSize: 24,
                        ),
                      ),
                      Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.all(Radius.circular(5)),
                        ),
                        child: IconButton(
                          onPressed: result.isDisableButton ? null :  ()  {
                            resultListProvider.read(context).addTeam2Result(id: result.id);
                            if (results[i].team2Result >= 2) {
                              resultListProvider.read(context).toggleButton(id: result.id);
                              resultListProvider.read(context).add();
                            }
                          },
                          icon: Icon(Icons.add,
                            size: 30,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        SizedBox(height: 3,),
      ],
    );
  }
}

```
    
   
   
   
    
  Quay trở lại file main.dart , trong file này mình tạo màn Home, có action là button "add" , sẽ show dialog để điền tên team . Để truy cập dc các provider từ Rivepod , chúng ta phải wrap root tree vào 'ProviderScope'
```

import 'package:chottiso2/result_tile.dart';
import 'package:chottiso2/state_manager/result.dart';
import 'package:chottiso2/state_manager/team_name.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import 'constants.dart';
import 'input_team.dart';

// khai báo các provider cần dùng.
final resultListProvider = StateNotifierProvider((ref){
  return ResultList([]);
});
final teamNameProvider = StateNotifierProvider((ref) => TeamNameProvider(TeamName())
);

// hàm main phải wrap App vào ProviderScope.
void main() {
  runApp(ProviderScope(child: App()));
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Chot Ti So',
      home: Home(),
    );
  }
}



class Home extends HookWidget {
   Home({Key key}) : super(key: key);


  _showDialog(BuildContext context) {
    final TextEditingController team1Controller = TextEditingController();
    final TextEditingController team2Controller = TextEditingController();
    return showDialog(
        context: context,
        barrierDismissible: false,
        builder: (context) {
          return AlertDialog(
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(12.0))),
            content: Container(
              height: 250,
              decoration: BoxDecoration(
                color: Color(0xFFFDFFF5),
              ),
              child: Column(
                children: <Widget>[
                  Text('Set Team',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  InputTeam(controller: team1Controller,),
                  InputTeam(controller: team2Controller,),
                  Container(
                    margin: EdgeInsets.all(kDefaultPadding / 2),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Container(
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.9),
                            borderRadius: BorderRadius.circular(12),
                            boxShadow: [kDefaultShadow],
                          ),
                          child: FlatButton(
                            highlightColor:  Colors.white.withOpacity(0.9),
                            onPressed: () {
                              Navigator.pop(context);
                            },
                            child: Text('Cancel', style: TextStyle(fontWeight: FontWeight.bold),),
                          ),
                        ),
                        Container(
                          decoration: BoxDecoration(
                           color: Colors.white.withOpacity(0.9),
                            borderRadius: BorderRadius.circular(12),
                            boxShadow: [kDefaultShadow],
                          ),
                          child: FlatButton(
                            highlightColor:  Colors.white.withOpacity(0.9),
                            onPressed: () {
                                teamNameProvider.read(context).addTeamName(team1Controller.text, team2Controller.text);
                                resultListProvider.read(context).add();
                                Navigator.pop(context);
                            },
                            child: Text('OK', style: TextStyle(fontWeight: FontWeight.bold),),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        }
    );
  }

  @override
  Widget build(BuildContext context) {

    final results = useProvider(resultListProvider.state);
    final teamName = useProvider(teamNameProvider.state);

    return Scaffold(
      appBar: AppBar(
        title: Text('Chot Ti So'),
        actions: <Widget>[
          IconButton(
            onPressed:() => _showDialog(context),
            icon: Icon(Icons.add),
            iconSize: 24,
          ),
        ],
      ),
      body: Column(
        children: <Widget>[
          Padding(
            padding: EdgeInsets.all(20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Text(teamName.team1.toUpperCase()),
                teamName.team1 != '' ? Text('vs') : Text(''),
                Text(teamName.team2.toUpperCase()),
              ],
            ),
          ),
          Expanded(
            child: ListView.separated(
                itemCount: results.length,
                itemBuilder: (context, i) => ResultTile(i: i, result: results[i],),
                separatorBuilder: (context, _) => const Divider(height: 0),
            ),
          ),
        ],
      ),


    );
  }
}


```
  run app sẽ cho kết quả như sau <br>
                                  
![](https://images.viblo.asia/9162bd37-7dfd-4a8e-bdad-787db7b52715.gif) <br>
    Mình có dùng firebase  để làm  chức năng live tỉ số , mọi người ở có thể theo dõi tỉ số trực tiếp , nhưng quán game hay chơi nó ở tầng hầm, mạng 4G ở đấy nhiều khi không vào dc, không upload tỉ số lên firebase dc nên tạm dừng chức năng ở đây.
    
 Nếu có thắc mắc thì bạn có thể phản hồi bên dưới, hoặc vào mail qmanh.kct1123@gmail.com.