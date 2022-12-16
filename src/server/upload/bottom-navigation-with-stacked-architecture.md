***Note***: Tuyển tập bài viết được dịch từ trang **[filledstacks.com](https://www.filledstacks.com/)** về chủ đề ứng dụng **Stacked State Management** vào một ứng dụng Flutter.

***Mã nguồn sample khác mình đang apply stacked state management architecture các bạn có thể tìm thấy ở đây: [Stacekd State Management](https://github.com/DanhDue/stacked_state_mamagement)***

Một câu hỏi thường gặp rất nhiều đó là làm thế nào để thiết lập bottom navigation trong khi sử dụng Stacked Architecture. Hướng dẫn này sẽ trình bày các thiết lập bottom navigation cái thường được sử dụng trong các ứng dụng cũng như xử lý các loại hành vi nhất định cái mà bạn muốn view của mình phụ trách. Chúng ta sẽ bắt đầu bằng giả định bạn biết BottomNavBar hoạt đọng như thế nào và những thứ cơ bản như:

### 1. Sự kiện tap sẽ cập nhất giá trị cái theo dõi selected index(chỉ số được chọn).
### 2. Chúng ta sẽ rebuild UI và lấy widget theo selected index.
### 3. Chúng ta sẽ xử lý việc widget được hiển thị ra như thế nào bằng cách sử dụng một transition.

Đó cũng chính xác là những gì nó được xử lý trong Stacked. Một số vấn để mở rộng chúng ta đã nói như làm thế nào để chỉ gọi **onModelReady** chỉ một lần, đảm bảo cho view cái đang được gói lại không bị huỷ, sử dụng lại cùng ViewModel nhằm tránh mọi thứ bị tải lại. Với ví dụ này chúng ta cần tránh quá trình build cho bất cứ views tính năng. Để không phải tạo lại các view, chúng ta sẽ sử dụng view có sẵn trong thư mục **posts_example** và **todo** ở [đây](https://firebasestorage.googleapis.com/v0/b/filledstacks.appspot.com/o/tutorials%2F053%2F053-starting.zip?alt=media&token=8b3aec95-dd63-43de-a59b-51bda4b67f64).

## Bottom Nav Setup
Trên thư mục views có thư mục gọi là **home**. Mở file **home_view** cái chúng ta sẽ thêm vào bottom navigation bar với 2 items. Ngoài ra để thiết lập cho 2 items này, chúng ta cũng sẽ gán **currentIndex** và **setTabIndex** từ model(Cái chúng ta vẫn có từ lúc tạo).

```
class HomeView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<HomeViewModel>.reactive(
      builder: (context, model, child) => Scaffold(
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.grey[800],
          currentIndex: model.currentIndex,
          onTap: model.setIndex,
          items: [
            BottomNavigationBarItem(
              title: Text('Posts'),
              icon: Icon(Icons.art_track),
            ),
            BottomNavigationBarItem(
              title: Text('Todos'),
              icon: Icon(Icons.list),
            ),
          ],
        ),
      ),
      viewModelBuilder: () => HomeViewModel(),
    );
  }
}
```

Tiếp theo, mở file **HomeViewModel** nơi chúng ta sẽ tạo tính năng theo dõi index. Nó rất là đơn giản. Kế thừa **IndexTrackingViewModel**. Vậy đó.

```
class HomeViewModel extends IndexTrackingViewModel {}
```

Giờ đây thêm tính năng nhằm chuyển đổi giữa các views. Vào HomeView nơi chúng ta sẽ thêm vào một function nhằm tổ chức các views của mình và trả về chúng dựa vào index. Chúng ta sẽ sử dụng function này và thiết lập body cho scaffold để view được trả về theo index.

```
class HomeView extends StatelessWidget {
  const HomeView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<HomeViewModel>.reactive(
      builder: (context, model, child) => Scaffold(
        body: getViewForIndex(model.currentIndex),
        bottomNavigationBar: BottomNavigationBar(
          ...
        ),
      ),
      viewModelBuilder: () => HomeViewModel(),
    );
  }

  Widget getViewForIndex(int index) {
    switch (index) {
      case 0:
        return PostsView();
      case 1:
        return TodoView();
      default:
        return PostsView();
    }
  }
}
```

Nếu bạn chạy mã nguồn này, giờ đây chúng ta sẽ thấy rằng có một bottom navigation được thiết lập và bạn có thể chuyển đổi giữa các trang. Bạn sẽ chú ý tới một vài vấn đề khi chuyển đổi giữa các views đó:
**1. Quá trình khởi tạo logic được chạy mỗi khi chúng ta chạy qua một view.**
**2. View không giữ lại state.**
**3. Không có transition giữa các views.**

Hãy tìm các chỉnh sửa chúng.

## Initialise logic run every time view is shown.
Đây là những gì chúng ta dự định làm. Chúng ta cần giữ cho stacked được đóng với Flutter lifecycle nhất có thể nhằm tránh mọi rắc rối có thể. Khi một view được thêm vào widget tree phương thức **initState** được gọi. Nếu widget không có một model nó sẽ tạo ra một cái và rồi chạy phương thức **initialise**(các ViewModels cụ thể). Nhằm tránh điều này chúng ta cần phải thực hiện một số việc.
### 1. Thiết lập **disposeViewModel** thành false
Mở file **PostsView** và trong khối lệnh **reactive/nonReactive** của ViewModelBuilder thiết lập **disposeViewModel** thành **false**.
Điều này giúp cho Stacked không dispose ViewModel khi widget của nó bị xoá khỏi widget tree.
### 2. Làm cho ViewModel trở thành một singleton
Đăng kí ViewModel của bạn với get_it locator và yêu cầu nó từ locator nơi bạn cần tới nó. Một singleton có nghĩa là mỗi khi bạn yêu cầu loại đối tượng này từ locator bạn sẽ nhận được cùng một thể hiện của loại đó trong suốt quá trình chạy của ứng dụng. Nếu bạn sử dụng **injectable** thêm [cái này](https://pub.dev/packages/injectable) vào.

```
@singleton // Add decoration
class PostsViewModel extends FutureViewModel<List<Post>> {
...
}
```

Và rồi sinh ra mã nguồn cho quá trình injection bằng câu lệnh:

```
flutter pub run build_runner build --delete-conflicting-outputs
```

Nếu bạn sử dụng get_it mà không sử dụng injectable thì đăng kí nó như bên dưới:

```
locator.registerLazySingleton(() => PostsViewModel());
// or
locator.registerSingleton(PostsViewModel());
```

Trong **PostView** lấy ViewModel từ locator.

```
class PostsView extends StatelessWidget {
  const PostsView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<PostsViewModel>.reactive(
      disposeViewModel: false,
      builder: (context, model, child) => Scaffold(
        ...
      ),
      // Get the viewmodel from the locator to get the singleton instance
      viewModelBuilder: () => locator<PostsViewModel>(),
    );
  }
}
```

### 3. Thiết lập initialiseSpecialViewModelsOnce thành true
Trong khối **reactive/nonReactive** thiết lập **initialiseSpecialViewModelsOnce** thành **true** nhằm nói với **ViewModelBiulder** bạn chỉ cần khởi tạo ViewModel cụ thể này một lần duy nhất.

```
class PostsView extends StatelessWidget {
  const PostsView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<PostsViewModel>.reactive(
      disposeViewModel: false,
      // Inidicate that we only want to initialise a specialty viewmodel once
      initialiseSpecialViewModelsOnce: true,
      builder: (context, model, child) => Scaffold(
        ...
      ),
      viewModelBuilder: () => locator<PostsViewModel>(),
    );
  }
}
```

Nếu bạn chạy mã nguồn bây giờ, di chuyển tới todo tab rồi trở lại posts bán sẽ không thấy posts được tải lại. Bạn cũng có thể thấy trong debug console các posts không được lấy lại và in ra logs. Điều tương tự có thể được thực hiện cho lời gọi **onModelReady**. Nếu bạn cần nó được thực thi chỉ một lần theo bước 1, 2, rồi 3 thì thiết lập **fireOnModelReadyOnce** thành **true** thay vì **initialiseSpecialViewModelsOnce** thành **true**.

## The view does not maintain state
Nếu bạn chuyển đổi giữa các views. Mặc dù ViewModel giữ lại trạng thái của nó. Nhưng View vẫn không. Chúng ta có thể thấy điều này vì quá trình cuộn trang bị thiết lập lại. Di chuyển posts, cuộn xuống dưới, chuyển sang Todos, trở lại. Rõ ràng là các posts không ở cùng một vị trí với thời điểm cũ. Điều này là không đúng, hãy tìm cách chỉnh sửa nó. Mở **PostsView** và trong phần khởi tạo **ListView.separated** thiết lập **key** thành **PageStorageKey('storage-key')**.

```
ListView.separated(
  key: PageStorageKey('storage-key'),
  ...
)
```

Vậy đó. Giờ danh sách của chúng ta sẽ được giữ lại ví trị của nó bởi vì nó đã được thêm vào và xoá bỏ từ widget tree.

## There is no transition between views

Hiện tại khi chúng ta chuyển đổi giữa các views chúng ta nhận được một sự chuyển đổi đột ngột của các widgets cái nhìn có vẻ không thân thiện cho lắm. Để chỉnh sửa điều này chúng ta sẽ thêm vào một transition giữa quá trình hiển thị các widgets. Để làm được điều đó chúng ta sử dụng gói **[animation](https://pub.dev/packages/animations)** cái được cung cấp bởi flutter dev team.

```
dependencies:
  ...
  animations: ^1.1.1
```

Rồi, trong **HomeView**, chúng ta cần đóng gói lời gọi phương thức **getViewForIndex** trong một **PageTransitionSwitcher** cái được cung cấp bởi gói animations. Chúng ta sẽ thiết lập duration(khoảng thời gian) thành 300 mili giây cũng như thiết lập thuộc tính reverse(đảo ngược) bằng với thuộc tính reverse trong model của mình.

```
class HomeView extends StatelessWidget {
  const HomeView({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<HomeViewModel>.reactive(
      builder: (context, model, child) => Scaffold(
        body: PageTransitionSwitcher(
          duration: const Duration(milliseconds: 300),
          reverse: model.reverse,
          transitionBuilder: (
            Widget child,
            Animation<double> animation,
            Animation<double> secondaryAnimation,
          ) {
            return SharedAxisTransition(
              child: child,
              animation: animation,
              secondaryAnimation: secondaryAnimation,
              transitionType: SharedAxisTransitionType.horizontal,
            );
          },
          child: getViewForIndex(model.currentIndex),
        ),
        ...
    );
  }
}
```

Và nó nên được thực hiện. Nếu thuộc tính reverse không được thiết lập, trasition sẽ được thực hiện một cách tương tự cho mọi tabs. Chúng ta tính toán giá trị reverse cho bạn do đó chúng ta có thể chạy transition animation cho đồng thời cả tiến/lùi phụ thuộc vào hướng mà bạn đang thao tác. Chạy app, chuyển đổi giữa các tabs và bạn sẽ thấy animation được chạy như thế nào.

## Source
https://www.filledstacks.com/post/bottom-navigation-with-stacked-architecture/

## Reference

**[Stacekd State Management](https://github.com/DanhDue/stacked_state_mamagement)**.

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))