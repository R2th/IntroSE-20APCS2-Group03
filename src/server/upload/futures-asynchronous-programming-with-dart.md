## Futures
"Futures" là Future object đại diện cho hoạt động bất đồng bộ.  Hoạt động bất đồng bộ không block thread và quá trình của chúng sẽ kết thúc sau đố. Các chức năng thực hiện các công việc nặng nên sử dụng mô hình bất đồng bộ để thực hiện công việc. Future object được đại diện kiểu **Future<T>**, trong đó kiểu T là kiểu của kết quả trả về từ những công việc nặng.
    
   Hoạt động bất đồng bộ có thể thực hiện được bằng 2 cách : 
   
   1. Dùng **await** and **async**.
   2. Dùng **Future** API
    
##     await and async
   **await** và  **async** là 2 từ khoá thường được dùng cùng nhau.Function được cho là thực hiện công việc với tác vụ nặng sẽ được đánh dấu bằng từ khoá **async**. Trong function ,task vụ nặng được đánh dấu là wait. Chương trình tạm dừng khi **await** được gọi hoặc hàm  trả về hoặc chương trình chạy đến cuối hàm.
    
   Hãy  xem đoạn mã sau cách sử dụng từ khoá **await** và **async**. Từ khoá **Future** được đặt trước function **makeDataCall**() có nghĩa function này sẽ thực hiện bất đồng bộ và sẽ tạm dừng khi chạy qua **await**.
    
    
```
// Expensive function could be a function that takes
// long time to process data and return results.
// Assume this function takes long time to return in real-world
String getExpansiveData() {
  return "I'm expansive data";
}

// This is the asynchronous function that makes the expensive
// data call and prints the results.
Future<void> makeDataCall() async {
  var data = await getExpansiveData();
  print(data);
}
//----END----//

//Entry point function
void main() {
  //Run Example#1.
  makeDataCall();
}
```
    
   Hàm makeDataCall() trả về kiểu void, hàm này chỉ đơn giản chỉ là in ra kết quả trả về. 
    
   **Output**: 
    
 ` I'm expansive data`
    
##     Error Handling (Try/Catch Block)
    
   Trong phần này, chúng ta sẽ xem cách xử lý ngoại lệ khi chạy hoạt động bất đồng bộ. Khi từ khoá wait được dùng thì hoạt động bất đồng bộ được thực hiện giống như 1 cuộc gọi đồng bộ. Trong trường hợp như vậy cuộc gọi bất đồng bộ được bao bọc trong khối try/catch. Thêm try/catch vào đoạn code trước và đặt tên cho hàm này là makeDataCallWithException(). Function này sẽ ném ra 1 ngoại lệ trong khối try :
    
 ```
    //Example#2. Demonstrating handling exception thrown in asynchronous operations
//Expansive operations ended up throwing exception
String getExpansiveDataWithException() {
  throw Exception("Error occurred in fetching data");
}

//Asynchronous function that makes the expensive data call
Future<void> makeDataCallWithException() async {
  try {
    await getExpansiveDataWithException();
  } catch (e) {
    print(e.toString());
  }
}
//----END----//

//Entry point function
void main() {
  //Run Example#2.
  makeDataCallWithException();
}
```
    
   Output: 
    
   `Exception: Error occurred in fetching data`
    
##     Sequencing Function Calls
    
   Có thể kiểm soát thực hiện các hàm bất đồng bộ bằng các dùng sequencing với sự trợ giúp của **await** và **async**. Hãy xem các nó thực hiện trong ví dụ dưới đây. Trong ví dụ này có 3 func: **getDataA()**, **getDataB()**, **getDataC()**. Mình muốn nó thực hiện lần lượt, từ khoá **await** sẽ giúp thực hiện chính xác điều đó. Nó sẽ thực hiện 1 cách đồng bộ cho đến khi gặp await và đợi nó thực hiện xong thì mới chạy đến dòng code tiếp theo.
    
  ```//Example#3. Sequencing order of asynchronous calls

void getDataA() {
  print("dataA");
}

void getDataB() {
  print("dataB");
}

String getDataC() {
  return "dataC";
}

//Entry point function
Future<void> sequencingOperations() async {
  //Order matters.
  //Functions will execute in the order they were called.
  await getDataA();
  await getDataB();

  //getDataC() will execute first and will
  //pass its data into print() function
  print(await getDataC());
}
//----END----//

//Entry point function
void main() {
  //Run Example#3.
  sequencingOperations();
}
 ```

Output: 
    Mỗi phương thức trên sẽ được thực hiện bắt đầu từ getDataA() và kết thúc thực thi getDataC()
   
```
    dataA 
    
    dataB
  
    dataC
```
## Future API
    
   Một cách khác để chạy bất đồng bộ  là  dùng  Future API. Trong  Future API, method được dùng để register một callback, sẽ thực hiện đoạn code nào đó khi hàm bất động chạy xong. Hãy xem 2 biến thể của  Future API.
    
   Future<String>: Future trả về type String 
    
   Future<void>: Future  về void.
    
###     Future<String>
Ví dụ dưới đây sẽ biến đổi mã ví dụ trước đó dùng await và async thành Future API. Bạn hãy để ý việc dùng **then()** trong function **mainWithFutureAPI()**. Trong ví dụ này Future sẽ trả về String.
    
   ```//Using Future API (Future is returning String type)

//Future with String data is being returned.
//This function returns the instance of
//Future and not the actual data.
Future<String> makeDataCallFutureString() async {
  return await getExpansiveData();
}

// Assume this function takes long time to return in real-world.
String getExpansiveData() {
  return "I'm expansive data";
}


void mainWithFutureAPI() {
  var theFuture = makeDataCallFutureString();

  //then() is called at the instance of Future
  theFuture.then((value) {
    print(value);
  });
}
//----END----//


//Entry point function
void main() {
  //Run Example#4.
  mainWithFutureAPI();
} 
 ```
    
  Output: 
    
   `I'm expansive data`
    
###  Future<void>
    
   Cũng giống với Future<String> chỉ khác nó sẽ không trả về bất cứ điều gì :
    
```
    //Example#5. Using Future API (Future is returning void type)

//Future doesn't return anything
Future<void> makeDataCallFutureVoid() async {
  await getExpansiveData();
}

// Assume this function takes long time to return in real-world.
String getExpansiveData() {
  return "I'm expansive data";
}

void mainWithFutureAPIVoid() {
  var theFuture = makeDataCallFutureVoid();
  //then() uses underscore as unused argument.
  theFuture.then((_) {
    //_ is not used
    print("There's nothing to be printed here. Work is already done.");
  });
}
//----END----//

//Entry point function
void main() {
  //Run Example#5.
  mainWithFutureAPIVoid();
}
```
    
   Output:  `There's nothing to be printed here. Work is already done.`
   
##     Error Handling — Future API
    
   Future API dùng móc xích để handle ngoại lệ. Lỗi được bắt và handle trong bloc  **catchErrror()**.The catchError() là 1 móc xích cùng với phương thức **then()**.
    
   
   ```
    // Example#6. Future API - Error Handling

// Future with String data is being returned.
// This function returns the instance of
// Future and not the actual data.
Future<String> makeDataCallFutureAPIError() async {
  var data = await getExpansiveData();
  throw Exception("Error occurred in making data call: $data");
}

// Assume this function takes long time to return in real-world.
String getExpansiveData() {
  return "I'm expansive data";
}

void mainWithFutureAPIError() {
  var theFuture = makeDataCallFutureAPIError();

  //Error is caught and handled in catchError block
  theFuture.then((value) {
    print(value);
  }).catchError((error) {
    print(error);
  });
}
//----END----//

// Entry point function
void main() {
  //Run Example#6.
  mainWithFutureAPIError();
}
   ```
    
   Output: `Exception: Error occurred in making data call: I'm expansive data`
    
##   Usage of Future.wait()
Future.wait() được sử dụng khi nhiều hàm không đồng bộ cần được thực hiện trước khi thực hiện một hàm khác. Điều này có thể hữu ích khi cần dữ liệu từ nhiều source/function trước khi thực hiện step tiếp theo. Bạn có thể xem ví dụ dưới đây :
    
 ```
    //Example#7. Using `Future.wait()`

Future<String> getData(data) {
  return data;
}

Future<String> getDataAFuture() async {
  return await getData("dataA");
}

Future<String> getDataBFuture() async {
  return await getData("dataB");
}

Future<String> getDataCFuture() async {
  return await getData("dataC");
}

mainWithFutureAPIWait() async {
  //Chaining Futures in order
  await Future.wait([
    getDataAFuture(),
    getDataBFuture(),
    getDataCFuture(),
  ])
      .then(
        (List responses) => print(responses),
      )
      .catchError((error) => print(error));
}
//----END----//

//Entry point function
void main() {
  //Run Example#7.
  mainWithFutureAPIWait();
}
   ```
    
   Output:  [dataA, dataB, dataC]
    
##     Tổng quát
   Trong bài viết này, mình đã giới thiệu cách dùng Futures  để thực hiện các hoạt động không đồng bộ trong Dart. Chúng ta đã khám phá cách tiếp cận **await**/**async**  và **Future API** để thực hiện chúng. Tuy nhiên có 1 cách  khác để truy cập bất đồng bộ bằng cách dùng **Stream** mình giới thiệu ở bài viết tiếp theo nhé. 
    
##     Tài liệu tham khảo

https://medium.com/flutterpub/futures-asynchronous-programming-with-dart-47ff3f58c539