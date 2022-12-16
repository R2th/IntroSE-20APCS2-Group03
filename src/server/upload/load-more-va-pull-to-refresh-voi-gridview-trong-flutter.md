Load more và Pull to refresh là hai tính năng gần như không thể thiếu khi chúng ta muốn hiển thị dữ liệu dưới dạng list. Mọi người hẳn đã quá quen thuộc trong việc apply các tính năng này lên ListView rồi. Vậy còn GridView thì sao? Bài này mình xin giới thiệu một trong những phương pháp để có thể đem hai tính năng này vào GridView nhé.

## Chuẩn bị
Project khởi đầu: https://github.com/scitbiz/flutter_gridview_pulltorefresh_loadmore_example (checkout sang branch `starter` nhé)

Sau khi clone về, chuyển qua branch `starter` và chạy app lên thì giao diện sẽ như thế này:

![](https://images.viblo.asia/4600686c-362d-40e4-9f2b-f553641f0e32.png)

Project này tính năng chỉ đơn giản là lấy màu từ kho data (mình có thêm chút delay để giả lập việc lấy data từ server) gồm 255 mã màu và hiển thị tên cũng như mã màu lên GridView. Hiện tại mới chỉ đang lấy và hiển thị 20 mã màu đầu tiên. Công việc của chúng ta là thêm load more để lấy thêm màu và pull to refresh để reload lại dữ liệu.

Các bạn nghía qua code một chút để nắm rõ hơn nhé :D

## Sơ qua về code hiện tại

Chúng ta tập trung vào file `lib/main.dart`, nơi sẽ render GridView ra màn hình chính. Mình có comment bên dưới ý nghĩa các thông số cho bạn nào mới làm quen với GridView 

```dart:lib/main.dart
    ...
    body: GridView.builder(
        padding: EdgeInsets.all(16),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            childAspectRatio: 1.6, // Tỉ lệ chiều-ngang/chiều-rộng của một item trong grid, ở đây width = 1.6 * height
            crossAxisCount: 2,     // Số item trên một hàng ngang 
            crossAxisSpacing: 16,  // Khoảng cách giữa các item trong hàng ngang
            mainAxisSpacing: 16,   // Khoảng cách giữa các hàng (giữa các item trong cột dọc)
        ),
        itemCount: _colors.length, // Số lượng item 
        itemBuilder: _buildColorItem, // Hàm render item
    ),
    ...
```

## Pull to refresh

Pull to refresh của GridView thực chất giống hệt như ListView, chỉ việc bọc Grid/List trong `RefreshIndicator` và thêm hàm chạy khi refresh vào `onRefresh` là xong. Tuy nhiên bài này mình xin giới thiệu một widget nữa cũng khá hay, và đồng thời tiện setup luôn để chúng ta chuẩn bị cho việc implement load more. Widget mình muốn nói tới đó là `CupertinoSliverRefreshControl`. Widget này sẽ hiển thị loading giống như bên iOS, và đặc biệt hơn chúng ta có thể custom icon khi pull và khi refreshing một cách dễ dàng.

Vì Widget này là một Sliver widget, vì vậy chúng ta sẽ bọc GridView trong CustomScrollView

```dart:lib/main.dart
    ...
    body: CustomScrollView(
        slivers: <Widget>[
            GridView.builder(
                padding: EdgeInsets.all(16),
                gridDelegate: ...,
                itemBuilder: _buildColorItem,
                itemCount: _colors.length,
            ),
        ],
    ),
    ...
```

Tuy nhiên lúc này IDE sẽ báo lỗi không thể sử dụng được GridView do GridView không phải là một sliver widget. Vì vậy ta đổi `GridView.builder` sang `SliverGrid`. `SliverGrid` có thay đổi tham số một chút, thay vì truyền thẳng `itemCount`, `itemBuilder`, ta sẽ truyền vào cho nó một `delegate` là `SliverChildBuilderDelegate`. Delegate này cần truyền vào tham số là function để build item (chúng ta đã có `_buildColorItem`) và số lượng item sẽ render `childCount`

```dart:lib/main.dart
    ...
    body: CustomScrollView(
        slivers: <Widget>[
            SliverGrid(
                gridDelegate: ...,
                delegate: SliverChildBuilderDelegate(
                    _buildColorItem,
                    childCount: _colors.length,
                ),
            ),
        ],
    ),
    ...
```

Vậy cái padding đâu mất rồi? SliverList không cho truyền padding, chúng ta cũng không thể đơn giản bọc nó trong `Padding` được vì `Padding` không phải là một sliver widget. Thay vào đó chúng ta có `SliverPadding`, cách dùng tương tự `Padding` thôi:

```dart:lib/main.dart
    ...
    body: CustomScrollView(
        slivers: <Widget>[
            SliverPadding(
                padding: EdgeInsets.all(16),
                sliver: SliverGrid(
                    gridDelegate: ...,
                    delegate: SliverChildBuilderDelegate(
                        _buildColorItem,
                        childCount: _colors.length,
                    ),
                ),
            ),
        ],
    ),
    ...
```

Save và chạy lại phát, nếu trên màn hình không có gì thay đổi so với khi clone về, chúng ta đã thành công trong việc chuyển GridView sang dùng sliver rồi :D
Bây giờ việc thêm pull to refresh khá đơn giản, chúng ta chỉ việc thêm `CupertinoSliverRefreshControl`  lên trên SliverGrid và viết thêm hàm để refresh data thôi. Bạn có thể đọc thêm các thuộc tính của `CupertinoSliverRefreshControl` nếu muốn custom các icon khi pull xuống/loading nhé :D

```dart:lib/main.dart
    Future<void> _refresh() async {
        // Clear hết data cũ đi
        _colors.clear();
        
        // Reset page về 1
        _nextPage = 1;
        
        // Lấy data mới
        await _getColors();
    }

    @override
    Widget build(BuildContext context) {
        ...
        body: CustomScrollView(
            slivers: <Widget>[
                CupertinoSliverRefreshControl(
                    onRefresh: _refresh
                ),
                SliverPadding(
                    padding: EdgeInsets.all(16),
                    sliver: SliverGrid(
                        ...
                    ),
                ),
            ],
        ),
        ...
    }
```

## Load more

Với cách làm của mình, thực chất chúng ta sẽ luôn hiển thị icon loading ở cuối của Grid, chỉ khi không còn data để load nữa thì sẽ ẩn nó đi. Vì vậy chúng ta sẽ phải làm các bước như sau:

- Thêm một state tên `loading` dạng `bool`, sẽ mang giá trị `true` nếu đang lấy data từ server vềm ngược lại là `false`, để ngăn không cho load thêm nếu như đang load rồi
- Thêm một state tên `canLoadMore` dạng `bool`, sẽ mang giá trị `true` nếu server vẫn còn data để có thể load tiếp, ngược lại là `false`, từ đó sẽ ẩn/hiện icon loading ở cuối Grid
- Thêm một `ScrollController` vào `CustomScrollView` để nắm được trạng thái scroll của Grid, từ đó sẽ quyết định có load more hay không
- Hiển thị icon loadmore phía cuối Grid

Đầu tiên, có thể dễ dàng thêm`loading` và `canLoadMore`, set trạng thái khi lấy dữ liệu về cũng như khi refresh:

```dart:lib/main.dart
class _MyHomePageState extends State<MyHomePage> {
    ...
    int _nextPage = 1;
    bool _loading = true;
    bool _canLoadMore = true;

    ...
    
    Future<void> _getColors() async {
        _loading = true;
        ...
            
        setState(() {
            ...
            if (newColors.length >= _itemsPerPage) {
                _nextPage++;
            } else {
                _canLoadMore = false;
            }
            
            _loading = false;
        });
    }
    
    Future<void> _refresh() async {
        _canLoadMore = true;
        ...
    }

    ...
}
```

Sau đó tạo một `ScrollController` và detect khi nào sẽ load thêm dữ liệu:

```dart:lib/main.dart
class _MyHomePageState extends State<MyHomePage> {
    static const double _endReachedThreshold = 200; // Khi chỉ còn cách phía dưới Grid 200dp thì sẽ load more

    ...
    final ScrollController _controller = ScrollController();
    ...
    
    @override
    void initState() {
        _controller.addListener(_onScroll);
        
        ...
    }
    
    void _onScroll() {
        if (!_controller.hasClients || _loading) return; // Chỉ chạy những dòng dưới nếu như controller đã được mount vào widget và đang không loading

        final thresholdReached = _controller.position.extentAfter < _endReachedThreshold; // Check xem đã đạt tới _endReachedThreshold chưa
        
        if (thresholdReached) {
            // Load more!
           _getColors();
        }
    }
    
    @override
    Widget build(BuildContext context) {
        ...
        body: CustomScrollView(
            controller: _controller,
            slivers: <Widget>[
                ...
            ],
        ),
        ...
    }
}
```

Cuối cùng,  ta thêm icon loading vào bên dưới Grid. Ta dùng `SliverToBoxAdapter` để biến widget thường thành sliver widget và dùng state `canLoadMore` để ẩn/hiện loading
```dart:lib/main.dart
    ...
    @override
    Widget build(BuildContext context) {
        ...
        body: CustomScrollView(
            controller: _controller,
            slivers: <Widget>[
                ...
                SliverPadding(
                    padding: EdgeInsets.all(16),
                    sliver: SliverGrid(...),
                ),
                SliverToBoxAdapter(
                    child: _canLoadMore
                        ? Container(
                            padding: EdgeInsets.only(bottom: 16),
                            alignment: Alignment.center,
                            child: CircularProgressIndicator(),
                          )
                        : SizedBox(),
                ),
            ],
        ),
        ...
    }
    ...
```

Vậy là xong rồi. Cũng không có gì phức tạp nhỉ :D

Bạn có thể tham khảo source code hoàn chỉnh tại https://github.com/scitbiz/flutter_gridview_pulltorefresh_loadmore_example, branch `master` nhé :D