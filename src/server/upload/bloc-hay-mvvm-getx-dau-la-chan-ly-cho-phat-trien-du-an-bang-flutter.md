Trước khi đi vào tìm kiếm và so sánh giữa các Kiến trúc khi triển khai trên Flutter – Dart để xem Kiến trúc nào sẽ phù hợp, tối ưu, thuận tiện, dễ triển khai … hơn thì mình xin phép kể về hành trình và lý do mình viết bài viết này để chia sẻ và mong muốn nhận được góp ý của mọi người.
Với nền tảng đã làm Android/IOS Native nên Team mình tự tin nhận 1 dự án A phát triển bằng Flutter – Dart để vừa làm và vừa học. Do Team mình ít người và cũng không có ai có kinh nghiệm với Flutter trước đó nên team chọn hướng tiếp cận theo phong cách Free Style. Sau khi hoàn thành dự án A, mình cũng nhận thấy rất nhiều nhược điểm của Free Style ảnh hưởng trực tiếp đến chất lượng sản phẩm, trải nghiệm người dùng, khả năng fix bug và maintain …. Nên mình mới tìm kiếm 1 Kiến trúc nào đó tối ưu và phù hợp với Flutter. Mình tìm thấy 2 gợi ý được nhiều người nhắc đến:  Bloc, MVVM (Nếu còn cái nào hay hơn nhờ mọi người góp ý giúp mình nhé :D ).
Chính vì thế mình đã nghiên cứu và cùng chia sẻ với mọi người về những gì mình đọc và hiểu được trong quá trình nghiên cứu. Ở bài viết này mình sẽ nói đến BLoC và MVVM + GetX (2 cái mà mình được nghe nhiều nhất trong các diễn đàn)

## BLoC và MVVM là gì?
1. BLoC Pattern (Business Logic Component) mục đích là tách code business logic ra khỏi UI thay vì code gộp chung cả logic và UI vô cùng 1 file, để sau này spec mới có yêu cầu sửa code business logic hay sửa UI sẽ dễ dàng sửa hơn.
2. MVVM (Model – View – View Model) xây dựng một mô hình mà View Model tương tác với Model  để cung cấp dữ liệu cho View.

Sau khi đọc xong lý thuyết thì mình thấy MVVM và BLoC khá giống nhau về bản chất (đều tách logic ra view) vậy chúng khác nhau ở điểm nào?
Mình có làm sample và tìm đọc 1 số bài so sánh giữa BLoC & MVVM + GetX thì thấy điểm mấu chốt khác nhau chủ yếu là Tương tác giữa BLoC/Controller và View:
* BLoC và View giao tiếp với nhau thông qua các State và Event. BLoC không để lộ bất kỳ phương thức nào ra ngoài.
    * BLoC thông báo cập nhật cho View qua emit()
        `emit(SuccessState(data));`
    *  View thông báo cập nhật data cho BLoC qua add()
        `BlocProvider.of<LoginBloc>(context).add(LoginUsernameChanged(text)`
* Controller và View giao tiếp trực qua instance của Controller
    * View đăng kí lắng nghe thay đổi của Controller để cập nhật View
        `var userName = Constants.EMPTY.obs; userName.value = text;`
    *  View thông báo cập nhật data cho Controller qua api của Controller
        `controller.setUserName(value);`
        
Một điểm khác biệt thú vị như là BLoC giao tiếp thông qua các Event không chỉ với UI mà còn với các phần khác nhau của ứng dụng. ví dụ: nó sẽ nhận được một Event sau khi nhận được thông báo về firebase hoặc khi data trong DB thay đổi.

=> Sau khi nghiên cứu và demo BLoC (sử dụng Flutter Bloc Plugin) và MVVM + GetX thì thực sự có cảm tình với BLoC hơn, nhưng nếu để nên bàn cân mình cũng không thấy giữa MVVM và BLoC có gì khác biệt nhiều. 

## GetX liệu có "Hoàn Hảo" không?
Nhân tiên, Mình cũng có đọc và nghe mọi người bảo GetX chỉ nên dùng với những dự án nhỏ, làm nhanh còn những dự án lớn hơn cần maintain liên tục thì nên sử dụng BLoC. Mình cũng đã tìm hiểu và thấy 1 số lý do sau khiến 1 số người ngại sử dụng GetX:
* GetX chứa rất nhiều thứ như State Management, DI, Navigate, Internationalization, Change Theme, Network, Database … chính vì thế nó lại là nhược điểm vì lắm ứng dụng bạn không cần nhiều module đến thế và chúng cũng dễ bị out of date.
* GetX sử dụng Static Context
* Module get_connect hỗ trợ cả API REST và GraphQL trong khi một dự án thự tế không cần nhiều như thế
* Thỉnh thoảng sẽ gặp vấn đề với Hot Reload do cơ chế Dependency Injection bên trong của GetX dẫn đến việc GetXController có thể bị remove khi chúng t Hot Reload
* Nhiều Code không có hoặc thiếu tài liệu
* Khó khăn trong việc code UnitTest
* Tỉ lệ Unit Test và Widget Testing trong source code thấp

## BLoC Base Source
Mình có để link chia sẻ về Demo Base BLoC [tại đây](https://github.com/ElChengLee/base_bloc)
* State Management: [flutter_bloc](https://pub.dev/packages/flutter_bloc)
* Dependence Injection: [GetIt](https://pub.dev/packages/get_it)
* Network: [Dio](https://pub.dev/packages/dio), [Retrofit](https://pub.dev/packages/retrofit)
* Mock Network: [http_mock_adapter](https://pub.dev/packages/http_mock_adapter)
* Database: [floor](https://pub.dev/packages/floor)
* Router: [auto_route](https://pub.dev/packages/auto_route)

**Nếu mình có nhận xét cái gì sai hoặc thiếu sót thì nhờ mn góp ý nhé.**

## Tài liệu tham khảo
- https://flutteragency.com/which-pattern-to-choose-from-mvvm-and-bloc/
- https://stackoverflow.com/questions/54942977/mvvm-vs-bloc-patterns
- https://pub.dev/packages/flutter_bloc
- https://www.raywenderlich.com/31973428-getting-started-with-the-bloc-pattern
- https://www.didierboelens.com/2018/08/reactive-programming-streams-bloc/
- https://blog.logrocket.com/state-management-flutter-bloc-pattern/
- https://github.com/felangel/bloc/issues/2526
- https://medium.com/flutter-community/flutter-bloc-for-beginners-839e22adb9f5
- https://bloclibrary.dev/#/
- https://github.com/vuitv/flutter_clean_architecture
- https://medium.com/@CodingWithImran/flutter-bloc-v8-0-1-pattern-to-load-api-data-with-freezed-and-autoroute-ab88a27ce273