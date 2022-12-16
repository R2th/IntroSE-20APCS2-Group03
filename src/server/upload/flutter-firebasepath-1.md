# Giới thiệu
Firebase là một thành phần không thể thiếu trong hầu hết cách mobile application. Flutter đã support hầu hết các tiện ích của firebase với khá nhiều Plugin trên Pub.dev. Hôm nay mình sẽ giới thiệu với các bạn các Plugin hữu ích này
Đầu tiên để sử dụng được các Plugin này các bạn cần phải config file google_json cho dự án IOS và Android: Chi tiết quá trình config các bạn vui lòng truy cập vào link của của từng Plugin để đc hướng dẫn chi tiết nhé, đơn giản thôi
# [Firebase Auth](https://pub.dev/packages/firebase_auth)
Đây là plugin để sử dụng Firebase Authentication API.
Để sử dụng được Firebase Auth bạn cần phải config plugin [Google sign-in](https://pub.dev/packages/google_sign_in#-installing-tab-)
Thêm Firebase Auth plugin vào file  pubspec.yaml sau đó chạy lện `$ flutter pub get` để get plugin về. Các bạn vào link phía trên để cập nhật version mới nhất của plugin nhé
```
dependencies:
    firebase_auth: ^0.16.1
```

Sử dụng Firebase Auth

Add the following imports to your Dart code:

```
import 'package:firebase_auth/firebase_auth.dart';
```

Initialize GoogleSignIn and FirebaseAuth:

```
final GoogleSignIn _googleSignIn = GoogleSignIn();
final FirebaseAuth _auth = FirebaseAuth.instance;
```

You can now use the Firebase _auth to authenticate in your Dart code, e.g.

```
Future<FirebaseUser> _handleSignIn() async {
  final GoogleSignInAccount googleUser = await _googleSignIn.signIn();
  final GoogleSignInAuthentication googleAuth = await googleUser.authentication;

  final AuthCredential credential = GoogleAuthProvider.getCredential(
    accessToken: googleAuth.accessToken,
    idToken: googleAuth.idToken,
  );

  final FirebaseUser user = (await _auth.signInWithCredential(credential)).user;
  print("signed in " + user.displayName);
  return user;
}
```
Then from the sign in button onPress, call the _handleSignIn method using a future callback for both the FirebaseUser and possible exception.

```
_handleSignIn()
    .then((FirebaseUser user) => print(user))
    .catchError((e) => print(e));
Register a user 

final FirebaseUser user = (await _auth.createUserWithEmailAndPassword(
      email: 'an email',
      password: 'a password',
    ))
        .user;
```

Các phương thức  authentication đang được hỗ trợ 
* Google
* Email and Password
* Phone
* Anonymously
* GitHub
* Facebook
* Twitter
# [Firebase Analytics](https://pub.dev/packages/firebase_analytics)

Tương tự ta cũng thêm Firebase Analytics plugin vào file  pubspec.yaml sau đó chạy lện `$ flutter pub get` để get plugin về. Các bạn vào link phía trên để cập nhật version mới nhất của plugin nhé
```
dependencies:
  firebase_analytics: ^5.0.15
```

Sử dụng analytics thì cực kỳ đơn giản rồi phải không

Track PageRoute Transitions
```
FirebaseAnalytics analytics = FirebaseAnalytics();

MaterialApp(
  home: MyAppHome(),
  navigatorObservers: [
    FirebaseAnalyticsObserver(analytics: analytics),
  ],
);
```
Cách sử dụng chi tiết
```
class MyApp extends StatelessWidget {
  static FirebaseAnalytics analytics = FirebaseAnalytics();
  static FirebaseAnalyticsObserver observer =
      FirebaseAnalyticsObserver(analytics: analytics);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Firebase Analytics Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      navigatorObservers: <NavigatorObserver>[observer],
      home: MyHomePage(
        title: 'Firebase Analytics Demo',
        analytics: analytics,
        observer: observer,
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title, this.analytics, this.observer})
      : super(key: key);

  final String title;
  final FirebaseAnalytics analytics;
  final FirebaseAnalyticsObserver observer;

  @override
  _MyHomePageState createState() => _MyHomePageState(analytics, observer);
}

class _MyHomePageState extends State<MyHomePage> {
  _MyHomePageState(this.analytics, this.observer);

  final FirebaseAnalyticsObserver observer;
  final FirebaseAnalytics analytics;
  String _message = '';

  void setMessage(String message) {
    setState(() {
      _message = message;
    });
  }

  Future<void> _sendAnalyticsEvent() async {
    await analytics.logEvent(
      name: 'test_event',
      parameters: <String, dynamic>{
        'string': 'string',
        'int': 42,
        'long': 12345678910,
        'double': 42.0,
        'bool': true,
      },
    );
    setMessage('logEvent succeeded');
  }

  Future<void> _testSetUserId() async {
    await analytics.setUserId('some-user');
    setMessage('setUserId succeeded');
  }

  Future<void> _testSetCurrentScreen() async {
    await analytics.setCurrentScreen(
      screenName: 'Analytics Demo',
      screenClassOverride: 'AnalyticsDemo',
    );
    setMessage('setCurrentScreen succeeded');
  }

  Future<void> _testSetAnalyticsCollectionEnabled() async {
    await analytics.setAnalyticsCollectionEnabled(false);
    await analytics.setAnalyticsCollectionEnabled(true);
    setMessage('setAnalyticsCollectionEnabled succeeded');
  }

  Future<void> _testSetSessionTimeoutDuration() async {
    await analytics.android?.setSessionTimeoutDuration(2000000);
    setMessage('setSessionTimeoutDuration succeeded');
  }

  Future<void> _testSetUserProperty() async {
    await analytics.setUserProperty(name: 'regular', value: 'indeed');
    setMessage('setUserProperty succeeded');
  }

  Future<void> _testAllEventTypes() async {
    await analytics.logAddPaymentInfo();
    await analytics.logAddToCart(
      currency: 'USD',
      value: 123.0,
      itemId: 'test item id',
      itemName: 'test item name',
      itemCategory: 'test item category',
      quantity: 5,
      price: 24.0,
      origin: 'test origin',
      itemLocationId: 'test location id',
      destination: 'test destination',
      startDate: '2015-09-14',
      endDate: '2015-09-17',
    );
    await analytics.logAddToWishlist(
      itemId: 'test item id',
      itemName: 'test item name',
      itemCategory: 'test item category',
      quantity: 5,
      price: 24.0,
      value: 123.0,
      currency: 'USD',
      itemLocationId: 'test location id',
    );
    await analytics.logAppOpen();
    await analytics.logBeginCheckout(
      value: 123.0,
      currency: 'USD',
      transactionId: 'test tx id',
      numberOfNights: 2,
      numberOfRooms: 3,
      numberOfPassengers: 4,
      origin: 'test origin',
      destination: 'test destination',
      startDate: '2015-09-14',
      endDate: '2015-09-17',
      travelClass: 'test travel class',
    );
    await analytics.logCampaignDetails(
      source: 'test source',
      medium: 'test medium',
      campaign: 'test campaign',
      term: 'test term',
      content: 'test content',
      aclid: 'test aclid',
      cp1: 'test cp1',
    );
    await analytics.logEarnVirtualCurrency(
      virtualCurrencyName: 'bitcoin',
      value: 345.66,
    );
    await analytics.logEcommercePurchase(
      currency: 'USD',
      value: 432.45,
      transactionId: 'test tx id',
      tax: 3.45,
      shipping: 5.67,
      coupon: 'test coupon',
      location: 'test location',
      numberOfNights: 3,
      numberOfRooms: 4,
      numberOfPassengers: 5,
      origin: 'test origin',
      destination: 'test destination',
      startDate: '2015-09-13',
      endDate: '2015-09-14',
      travelClass: 'test travel class',
    );
    await analytics.logGenerateLead(
      currency: 'USD',
      value: 123.45,
    );
    await analytics.logJoinGroup(
      groupId: 'test group id',
    );
    await analytics.logLevelUp(
      level: 5,
      character: 'witch doctor',
    );
    await analytics.logLogin();
    await analytics.logPostScore(
      score: 1000000,
      level: 70,
      character: 'tiefling cleric',
    );
    await analytics.logPresentOffer(
      itemId: 'test item id',
      itemName: 'test item name',
      itemCategory: 'test item category',
      quantity: 6,
      price: 3.45,
      value: 67.8,
      currency: 'USD',
      itemLocationId: 'test item location id',
    );
    await analytics.logPurchaseRefund(
      currency: 'USD',
      value: 45.67,
      transactionId: 'test tx id',
    );
    await analytics.logSearch(
      searchTerm: 'hotel',
      numberOfNights: 2,
      numberOfRooms: 1,
      numberOfPassengers: 3,
      origin: 'test origin',
      destination: 'test destination',
      startDate: '2015-09-14',
      endDate: '2015-09-16',
      travelClass: 'test travel class',
    );
    await analytics.logSelectContent(
      contentType: 'test content type',
      itemId: 'test item id',
    );
    await analytics.logShare(
        contentType: 'test content type',
        itemId: 'test item id',
        method: 'facebook');
    await analytics.logSignUp(
      signUpMethod: 'test sign up method',
    );
    await analytics.logSpendVirtualCurrency(
      itemName: 'test item name',
      virtualCurrencyName: 'bitcoin',
      value: 34,
    );
    await analytics.logTutorialBegin();
    await analytics.logTutorialComplete();
    await analytics.logUnlockAchievement(id: 'all Firebase API covered');
    await analytics.logViewItem(
      itemId: 'test item id',
      itemName: 'test item name',
      itemCategory: 'test item category',
      itemLocationId: 'test item location id',
      price: 3.45,
      quantity: 6,
      currency: 'USD',
      value: 67.8,
      flightNumber: 'test flight number',
      numberOfPassengers: 3,
      numberOfRooms: 1,
      numberOfNights: 2,
      origin: 'test origin',
      destination: 'test destination',
      startDate: '2015-09-14',
      endDate: '2015-09-15',
      searchTerm: 'test search term',
      travelClass: 'test travel class',
    );
    await analytics.logViewItemList(
      itemCategory: 'test item category',
    );
    await analytics.logViewSearchResults(
      searchTerm: 'test search term',
    );
    setMessage('All standard events logged successfully');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Column(
        children: <Widget>[
          MaterialButton(
            child: const Text('Test logEvent'),
            onPressed: _sendAnalyticsEvent,
          ),
          MaterialButton(
            child: const Text('Test standard event types'),
            onPressed: _testAllEventTypes,
          ),
          MaterialButton(
            child: const Text('Test setUserId'),
            onPressed: _testSetUserId,
          ),
          MaterialButton(
            child: const Text('Test setCurrentScreen'),
            onPressed: _testSetCurrentScreen,
          ),
          MaterialButton(
            child: const Text('Test setAnalyticsCollectionEnabled'),
            onPressed: _testSetAnalyticsCollectionEnabled,
          ),
          MaterialButton(
            child: const Text('Test setSessionTimeoutDuration'),
            onPressed: _testSetSessionTimeoutDuration,
          ),
          MaterialButton(
            child: const Text('Test setUserProperty'),
            onPressed: _testSetUserProperty,
          ),
          Text(_message,
              style: const TextStyle(color: Color.fromARGB(255, 0, 155, 0))),
        ],
      ),
      floatingActionButton: FloatingActionButton(
          child: const Icon(Icons.tab),
          onPressed: () {
            Navigator.of(context).push(MaterialPageRoute<TabsPage>(
                settings: const RouteSettings(name: TabsPage.routeName),
                builder: (BuildContext context) {
                  return TabsPage(observer);
                }));
          }),
    );
  }
}
```

# [Cloud Firestore](https://pub.dev/packages/cloud_firestore)
Tương tự ta cũng thêm Firebase Analytics plugin vào file  pubspec.yaml sau đó chạy lện `$ flutter pub get` để get plugin về. Các bạn vào link phía trên để cập nhật version mới nhất của plugin nhé
```
dependencies:
    cloud_firestore: ^0.13.7
```
Sử dụng

```
import 'package:cloud_firestore/cloud_firestore.dart';
```
Adding a new DocumentReference:

```
Firestore.instance.collection('books').document()
  .setData({ 'title': 'title', 'author': 'author' });
```

Binding a CollectionReference to a ListView:
```
class BookList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<QuerySnapshot>(
      stream: Firestore.instance.collection('books').snapshots(),
      builder: (BuildContext context, AsyncSnapshot<QuerySnapshot> snapshot) {
        if (snapshot.hasError)
          return new Text('Error: ${snapshot.error}');
        switch (snapshot.connectionState) {
          case ConnectionState.waiting: return new Text('Loading...');
          default:
            return new ListView(
              children: snapshot.data.documents.map((DocumentSnapshot document) {
                return new ListTile(
                  title: new Text(document['title']),
                  subtitle: new Text(document['author']),
                );
              }).toList(),
            );
        }
      },
    );
  }
}
```

Performing a query:
```
Firestore.instance
    .collection('talks')
    .where("topic", isEqualTo: "flutter")
    .snapshots()
    .listen((data) =>
        data.documents.forEach((doc) => print(doc["title"])));
```

Get a specific document:
```
Firestore.instance
        .collection('talks')
        .document('document-name')
        .get()
        .then((DocumentSnapshot ds) {
      // use ds as a snapshot
    });
```
Running a transaction:

```
final DocumentReference postRef = Firestore.instance.document('posts/123');
Firestore.instance.runTransaction((Transaction tx) async {
  DocumentSnapshot postSnapshot = await tx.get(postRef);
  if (postSnapshot.exists) {
    await tx.update(postRef, <String, dynamic>{'likesCount': postSnapshot.data['likesCount'] + 1});
  }
});
```