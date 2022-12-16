Khi mới học Flutter và dùng thư viện Provider để quản lý state, mình có gặp đoạn code : 
```
Selector<CounterProvider, int>(
                  builder: (context, data, child) {
                    print("getCount");
                    return Text('${data}');
                  },
                  selector: (buildContext, countPro) {
                    return countPro.getCount;

                  },
                ),
```

Vậy Selector dùng để làm gì? => Dùng để update UI khi gọi hàm notifyListeners()
Ủa vậy dùng Consumer cũng update được UI mà cần gì phải dùng Selector? => Thì hôm nay mình sẽ giải thích Consumer và Selector nó khác nhau như thế nào ?

Mình sẽ giải thích  các vấn đề trên thông qua 1 ví dụ  tăng giảm số : Cho màn hình có 2 label và 2 nút button .

![](https://images.viblo.asia/a1bcd0a4-900b-4d18-821a-4516853e38b3.png)





Hầu hết các vấn đề khi update UI bằng cách dùng Consumer nhưng tôi sẽ giới thiệu với bạn vấn đề khi dùng consumer. Các bạn hãy implement đoạn code  sau : 
```
class CountScreen extends StatefulWidget {
  @override
  _CountScreenState createState() => _CountScreenState();
}

class _CountScreenState extends State<CountScreen> {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => CounterProvider(),
      builder: (BuildContext context, _) {
        final counterProvider = Provider.of<CounterProvider>(context, listen: false);
        return Scaffold(
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Consumer<CounterProvider>(
                  builder: (context, data, child) {
                    print('Update UI Consumer 1');
                    return Container(
                      height: 40,
                      color: Colors.red,
                      child: Center(child: Text('Consumer1: ${data.getCount}')),
                    );
                  },
                ),
                SizedBox(
                  height: 30,
                ),
                Consumer<CounterProvider>(
                  builder: (context, data, child) {
                    print('Update UI Consumer 2');
                    return Container(
                      height: 40,
                      color: Colors.blue,
                      child: Center(child: Text('Consumer2: ${data.getCount1}')),
                    );
                  },
                )
              ],
            ),
          ),
          floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
          floatingActionButton: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              FloatingActionButton.extended(
              backgroundColor: Colors.red,
                onPressed: () {
                  counterProvider.incrementCounter();
                },
                label: Text('Consumer 1'),
                icon: Icon(Icons.add),
              ),
              Expanded(child: SizedBox()),
              FloatingActionButton.extended(
                 backgroundColor: Colors.blue,
                onPressed: () {
                  counterProvider.incrementCounter1();
                },
                label: Text('Consumer 2'),
                icon: Icon(Icons.minimize),
              ),
            ],
          ),
        );
      },
    );
  }
}

```

```
class CounterProvider extends ChangeNotifier {
  int count = 0;
  int count1 = 0;

  int get getCount1 => count1;

  int get getCount => count;

  incrementCounter() {
    count++;
    notifyListeners();
  }

  incrementCounter1() {
    count1--;
    notifyListeners();
  }
}
```

Khi bạn click nút button **Consumer 1** . Kết quả : 
```
flutter: Update UI Consumer 1
flutter: Update UI Consumer 2
```

Việc bạn nhấn nút button sẽ thực hiện gọi hàm notifyListeners() dẫn đến việc các Widget  được bọc trong các Consumer1 và Consumer2 được build lại, điều này thật sự ko tốt cho perfomance hoặc làm các chức năng có logic phức tạp dễ sinh ra bug.

![](https://images.viblo.asia/9a6477e1-71e2-4d40-8760-3aa6763ae4b2.png)

 Để tránh việc phải build lại cả 2 Consumer 1, 2 bạn dùng Selector để thay thế, thay thế đoạn code ở trên thành : 
 
 ```
 Selector<CounterProvider, int>(
                  builder: (context, data, child) {
                    print('Update UI Consumer 1');
                    return Container(
                      height: 40,
                      color: Colors.red,
                      child: Center(child: Text('Consumer1: $data')),
                    );
                  },
                  selector: (buildContext, countPro) {
                    return countPro.getCount;
                  },
                ),
                SizedBox(
                  height: 30,
                ),
  Selector<CounterProvider, int>(
                  builder: (context, data, child) {
                    print('Update UI Consumer 2');
                    return Container(
                      height: 40,
                      color: Colors.blue,
                      child: Center(child: Text('Consumer2: $data')),
                    );
                  },
                  selector: (buildContext, counterProvider) => counterProvider.getCount1,
                ),
 ```
 
  Bạn tap lại nút "Consumer1" , kết quả: 
  
  `flutter: Update UI Consumer 1`
  
  Việc dùng Selector sẽ giải quyết vấn đề ở trên và nó chỉ render các widget con của nó  khi có sự thay đổi của  các giá trị  trong biến countPro.getCount trong hàm : 
```
   selector: (buildContext, countPro) {
   return countPro.getCount;
   }
```

## Tài liệu tham khảo : 
https://medium.com/@ggcsriram/flutter-provider-with-selector-4b469e6539a5