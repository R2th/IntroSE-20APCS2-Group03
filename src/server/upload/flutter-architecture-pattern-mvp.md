## Tổng quan
Trong bài đăng này, tôi sẽ được giải thích cách phát triển một ứng dụng theo pattern MVP, tôi sẽ được hướng dẫn cách tạo UI layer,  Presenter layer và một layer khác chưa tất cả data repository.

- UI layer sẽ chưa tất cả những widgets cần thiết 
- Presenter sẽ được sử dụng để link UI layer với tất cả dữ liệu từ trong data repository.
- Data repository sẽ có 2 nguồn dữ liệu: 1 là đã được tạo và được sử dụng làm dữ liễu giả để kiểm tra ứng dụng và một nguồn khác lấy từ server.

## Data repository
Chúng ta sẽ bắt đầu tạo data source client. Tạo folder mới là `data` trong `lib`. Bước tiếp theo tạo `**contact_data.dart**` trong folder `**data**`.
Trong file này, sẽ tạo class Contract và interface cung cấp function get contracts và exception sẽ thông báo trong trường hợp fetch dữ liệu xảy ra lỗi.
```java
import 'dart:async';

class Contact {
  final String fullName;
  final String email;

  const Contact({this.fullName, this.email});
}


abstract class ContactRepository {
  Future<List<Contact>> fetch();
}

class FetchDataException implements Exception {
  String _message;

  FetchDataException(this._message);

  String toString() {
    return "Exception: $_message";
  }
}
```
Như đã nói ở trên, file này chưa Contract class, interface ContractRepository xác định phương thức fetch data trả về Future<ContractList> và FetchDataException.
Để sử dụng Future ta phải import thư viện `**dart:async**`, Future cho phép làm việc với [promises in Dart](https://www.dartlang.org/tutorials/language/futures).

## Mock Repository
Triển khai interface ContractRepository, đầu tiên chúng ta sẽ  implement ContractRepository. Tạo một file `**contact_data_mock.dart**` trong folder `data` .
```java
import 'dart:async';
import 'contact_data.dart';

class MockContactRepository implements ContactRepository{

  Future<List<Contact>> fetch(){
    return Future.value(kContacts);
  }

}

const kContacts = const <Contact>[
    const Contact(
      fullName: 'Romain Hoogmoed',
      email:'romain.hoogmoed@example.com'
    ),
    const Contact(
      fullName: 'Emilie Olsen',
      email:'emilie.olsen@example.com'
    )
];
```
Xem bên trên, khi class implement ContactRepository được tạo và sẽ override phương thức trong interface.

## Random User Repository

Việc implement thứ 2 sẽ sử dụng `RandomUser` service, phần này sẽ trình bày làm thế nào có thể fetch data từ service sử dụng Dart.
Trong data folder, tạo file `**contact_data_impl.dart**` và thêm đoạn mã sau:
```java
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

import 'contact_data.dart';

class RandomUserRepository implements ContactRepository {

  static const _kRandomUserUrl = 'http://api.randomuser.me/?results=15';
  final JsonDecoder _decoder = new JsonDecoder();

  Future<List<Contact>> fetch() async {
    final response = await http.get(_kRandomUserUrl);
    final jsonBody = response.body;
    final statusCode = response.statusCode;

    if(statusCode < 200 || statusCode >= 300 || jsonBody == null) {
      throw new FetchDataException("Error while getting contacts [StatusCode:$statusCode, Error:${response.reasonPhrase}]");
    }

    final contactsContainer = _decoder.convert(jsonBody);
    final List contactItems = contactsContainer['results'];

    return contactItems.map( (contactRaw) => Contact.fromMap(contactRaw) )
                         .toList();   
  }

}
```
Trong trường hợp này, class implement ContactRepository interface là RandomUserRepository.
Trong fetch method, thực thi get function để query URL chứa ** _kRandomUserUrl **. Phương thức sau đó lấy lambda làm tham số để thông báo phản hồi. Nó trả về phần thân và một statusCode để kiểm tra xem mọi thứ có ổn hay không, nếu không **FetchDataException** sẽ bị ném ra .
Bước cuối cùng là đọc một Json, để làm như vậy, sử dụng `dart:convert` và JsonDecoder
```css
{  
 “results”: [  
   {  
     “gender”: “female”,  
     “name”: {  
        “title”: “mrs”,  
        “first”: “aubrey”,  
        “last”: “ennis”  
     },  
     “email”: “[aubrey.ennis@example.com](mailto:aubrey.ennis@example.com)”,  
   }  
 ]  
}
```
Tạo một, tạo new Contact constructor cho phép convert từ Json sang Object
```java
class Contact {
  final String fullName;
  final String email;

  const Contact({this.fullName, this.email});

  Contact.fromMap(Map<String, dynamic>  map) :
                    fullName = "${map['name']['first']} ${map['name']['last']}",
                    email = map['email'];

}
```

## Dependency Injection
Để hoán đổi giữa cả hai phương thức triển khai ContactRepository, một số nội dung phụ thuộc là cần thiết. Tạo folder mới trong folder lib và sau đó tạo `**dependency_ịneccttiionn.dart**` file và paste đoạn code dưới đây: 
```java
  
import '../data/contact_data.dart';
import '../data/contact_data_impl.dart';
import '../data/contact_data_mock.dart';


enum Flavor {
  MOCK,
  PRO
}

/// Simple DI
class Injector {
  static final Injector _singleton = Injector._internal();
  static Flavor _flavor;

  static void configure(Flavor flavor) {
    _flavor = flavor;
  }

  factory Injector() {
    return _singleton;
  }

  Injector._internal();

  ContactRepository get contactRepository {
    switch(_flavor) {
      case Flavor.MOCK: return MockContactRepository();
      default: // Flavor.PRO:
       return RandomUserRepository();
    }
  }
}
```
Injector class là singleton, nó có private constructor class ** _internal**, một configure method để lựa chọn môi trường làm việc:
```java
Injector.configure(Flavor.PRO);
```

## Presenter

Sau khi Data repository được tạo, chúng ta sẽ tạo Presenter Layer. Tạo folder `contacts` in `lib` folder. Sau đó, tạo `contact_presenter.dart` file.
```java
abstract class ContactListViewContract {

void onLoadContactsComplete(List<Contact> items);

void onLoadContactsError();

}
```
Bước tiếp theo sẽ tạo presenter implement:

```java
class ContactListPresenter {
  ContactListViewContract _view;
  ContactRepository _repository;

  ContactListPresenter(this._view){
    _repository = new Injector().contactRepository;
  }

  void loadContacts(){
    assert(_view != null);

    _repository.fetch()
              .then((contacts) => _view.onLoadContactsComplete(contacts))
              .catchError((onError) {
                print(onError);
                _view.onLoadContactsError();
              });
  }

}
```
## View
Sử dụng `contact_view.dart` file và implement contact_view đã được tạo trong folder contacts.
```java
import 'package:flutter/material.dart';
import '../../data/contact_data.dart';
import 'contact_presenter.dart';

class ContactsPage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Contacts"),
        ),
        body: ContactList()
      );
  }

}


///
///   Contact List
///

class ContactList extends StatefulWidget{
  ContactList({ Key key }) : super(key: key);

  @override
  _ContactListState createState() => _ContactListState();
}


class _ContactListState extends State<ContactList> implements ContactListViewContract {

  ContactListPresenter _presenter;

  List<Contact> _contacts;

  bool _isSearching;

  _ContactListState() {
    _presenter =  ContactListPresenter(this);
  }

  @override
  void initState() {
    super.initState();
    _isSearching = true;
    _presenter.loadContacts();
  }


  @override
  void onLoadContactsComplete(List<Contact> items) {

    setState(() {
      _contacts = items;
      _isSearching = false;
    });

  }

  @override
  void onLoadContactsError() {
    // TODO: implement onLoadContactsError
  }

  @override
  Widget build(BuildContext context) {

    var widget;

    if(_isSearching) {
      widget = Center(
        child: Padding(
          padding: EdgeInsets.only(left: 16.0, right: 16.0),
          child: CircularProgressIndicator()
        )
      );
    }else {
      widget = ListView(
            padding: EdgeInsets.symmetric(vertical: 8.0),
            children: _buildContactList()
          );
    }

    return widget;
  }

  List<_ContactListItem> _buildContactList() {
    return _contacts.map((contact) => _ContactListItem(contact))
                    .toList();
  }

}


///
///   Contact List Item
///

class _ContactListItem extends ListTile {

  _ContactListItem(Contact contact) :
    super(
      title : Text(contact.fullName),
      subtitle: Text(contact.email),
      leading: CircleAvatar(
        child: Text(contact.fullName[0])
      )
    );

}
```

## Kế quả
[Click xem kết quả](https://cdn-images-1.medium.com/max/1600/1*WDPxL6h6X4Mwpe3Nb-iXiA.gif)
## Tóm lại
Khi xay dựng ứng dụng theo mô hình MVP biến ứng dụng thành một ứng dụng dễ bảo trì hơn, nó cũng giúp quá trình thử nghiệm một số thức khác. Bài viết này cho thấy cách Flutter cho phép xây dụng ứng dụng mạnh mẽ một cách dễ dàng.
Bài đăng này có liên quan đến [step 3 GitHub.](https://github.com/fabiomsr/Flutter-StepByStep)