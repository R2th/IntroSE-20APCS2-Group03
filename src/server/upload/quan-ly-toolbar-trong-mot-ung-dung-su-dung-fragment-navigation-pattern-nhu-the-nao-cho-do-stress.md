## Quản lý toolbar trong một ứng dụng sử dụng Fragment Navigation Pattern như thế nào cho đỡ stress?

Chắc hẳn các bạn đã nghe đến Fragment Navigation Pattern. Những ứng dụng áp dụng pattern này sẽ chỉ có duy nhất một Activity và Activity này sẽ có nhiệm vụ chính là host các Fragment - là các thành phần hiển thị chính của ứng dụng. Nếu bạn đang nghĩ là sẽ không định làm ứng dụng kiểu này thì hãy đọc hết nội dung ưu điểm trước khi close bài viết nhé:

- Ưu điểm:

  - **AndroidManifest.xml dễ đọc và dễ maintain hơn**: Đơn giản là do ứng dụng chỉ có một Activity nên chúng ta sẽ không còn phải làm việc cập nhật lại file AndroidManifest.xml mỗi khi thêm Activity mới nữa :p. Điều này thể hiện rõ ở các ứng dụng lớn với nhiều Activity

  - **VIệc điều hướng giữa các man hình được quản lý tập trung**: Việc điều hướng, logging, quản lý backstack...có thể được xử lý tập trung tại một chỗ, giả sử như là một lớp tên là ```NavigationManager``` đi. Khi làm như vậy thì chúng ta đã tách biệt hẳn các xử lý liên quan đến việc chuyển màn hình với các business logic của ứng dụng. Giả sử chúng ta muốn start một màn hình là một list nhân viên, trong màn hình đó chúng ta có thể chọn một số items. Trước khi start thì chúng ta cũng muốn truyền vào một số tham số với vai trò là tiêu chí lọc như: giới tính, tuổi, chức vụ...
    Nếu mỗi màn hình là 1 activity thì chúng ta sẽ viết như sau:

    ```java
    Intent intent = new Intent();
    intent.putExtra("age", 40);
    intent.putExtra("occupation", "developer");
    intent.putExtra("gender", "female");
    startActivityForResult(intent, 100);
    ```
    Và đâu đó chúng ta sẽ phải xử lý kết quả trả về:

    ```java
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
    }
    ```

    Một vấn đề phiền phức chúng ta gặp phải nếu làm như trên là ở màn hình được start chúng ta sẽ phai kiểm tra "extra" nào được truyền vào và cái nào không. Ngoài ra thì giả sử nếu chúng ta bị bắt phải bỏ chức năng lọc bằng tuổi thì chúng ta sẽ phải tìm kiếm tất cả những chỗ chúng ta sắp sửa start Activity và đảm bảo rằng không có "extra" nào là tuổi sẽ được truyền vào.

    Ngoài ra thì chẳng phải sẽ tốt hơn nếu kết quả chúng ta được trả lại được thể hiện dưới dạng ```List``` hơn là từ dạng dữ liệu được serialized và sẽ cần được deserialized sao? Trong trường hợp sử dụng Fragment Navigation Pattern thì mọi chuyện sẽ đơn giản hơn rất nhiều. Tất cả những gì chúng ta cần làm là viết một phương thức trong ```NavigationManager``` gọi hàm startPersonSelectorFragment() cùng với các tham số đầu vào cần thiết cùng một callback:

    ```java
    mNavigationManager.startPersonSelectorFragment(40, "developer", "female",
          new PersonSelectorFragment.OnPersonSelectedListener() {
              @Override
              public boolean onPersonsSelected(List<Person> selection) {
           [do something]
                  return false;
              }
          });
    ```

    Viết lại dưới dạng lambda cho sướng con mắt:

    ```java
    mNavigationManager.startPersonSelectorFragment(40, "developer", "female", selection -> [do something]);

    ```

  - **Giao tiếp giữa các màn hình tốt hơn:** Việc giao tiếp giữa hai Activity chủ yếu thông qua Bundle, nhược điểm của Bundle là nó chỉ có thể giữ các dữ liệu primitives và các dữ liệu được serialized. Trong khi đó thì việc giao tiếp giữa các Fragment sẽ không gặp giới hạn này (xem ví dụ trên :v)

  - **Việc khởi tạo một Fragment ít tốn kém về mặt chi phí performance hơn khi so với việc khởi tạo một Activity:** Ưu điểm này có thể thấy rõ nhất nếu ứng dụng sử dụng đến Drawer. Giả sử mỗi màn hình đều có Drawer và ứng dụng chỉ sử dụng thuần Activity thì mỗi màn hình sẽ phải khởi tạo một drawer của riêng nó.


Một câu hỏi đặt ra là giả sử nếu ứng dụng của chúng ta có các thành phần giao diện như toolbar, bottom bar... (mình sẽ gọi chung là navigation) thì chúng ta nên đặt chúng ở đâu và sử dụng như nào cho hiệu quả? Có 2 cách để thêm navigation: chúng ta có thể chỉ cần thêm vào layout của Activity hoặc thêm vào mỗi layout của fragment. Cách thứ nhất tỏ ra khá rắc rối và phức tạp do chúng ta sẽ phải tinh chỉnh lại giao diện của navigation sao cho phù hợp với từng màn hình khi được chuyển đến từ màn hình khác. Giả sử nếu có 5 màn hình thì chúng ta sẽ phải viết code 4 cách đồng bộ navigation cho 1 màn hình khi nó được chuyển đến từ 4 màn hình còn lại.

Giải pháp hiển nhiên là chúng ta sẽ chọn cách còn lại =)), chúng ta sẽ cho mỗi một Fragment một navigation. Ngoài ra thì chúng ta cũng muốn tối thiểu hóa sự thay đổi trong layout của các fragment này. Ví dụ như nếu mỗi fragment cần có toolbar thì chúng ta sẽ không muốn phải thêm dòng dưới đây vào mỗi layout của fragment:

```xml
<include layout=”@layout/layout_with_toolbar”/>
```

Như vậy điều chúng ta mong muốn là hệ thống sẽ có thể tự động thêm navigation vào fragment nếu cần. Ngoài ra thì mong muốn tiếp theo của chúng ta là chúng ta sẽ có khả năng customize thanh toolbar cho mỗi Fragment. Giả sử như chúng ta có một layout phức tạp với một toolbar hoặc một CoordinateLayout gồm một AppBar. Trong trường hợp này chúng ta muốn hệ thống sẽ không assign một toolbar cho layout này nữa. 

Chúng ta sẽ tạo một Fragment class tên là ***NavigationFragment***. Nó sẽ quản lý toàn bộ những gì liên quan đến navigation, Nó sẽ bao gồm nhiều phương thức, nhưng các phương thức quan trọng là các phương thức được sử dụng trong các lớp kế thừa nó:

- ***NavigationBuilder buildNavigation()*** - được sử dụng để thiết lập trạng thái ban đầu cho navigation của fragment được gọi. Tất cả mọi thứ sẽ được khwori tạo theo như cách nó được định nghĩa. Ngoài ra thì nó cũng có thể được dùng để refresh lại navation hiện tại. Khi người dùng muốn thay đổi navigation của Fragment thì họ sẽ gọi hàm ***invalidateNavigation()*** và truyền vào ***buildNavigation()***. Ví dụ:

  ```java
  invalidateNavigation(buildNavigation().toolbarTitle("New title"));
  ```

- ***void prepareToolbar(Toolbar toolbar)*** - được sử dụng nếu người dùng muốn có thêm sự chuẩn bị trước khi toolbar được khởi tạo. Ví dụ như nếu người dùng muốn thêm tab thì họ có thể override phương thức này để làm điều đó.

- ***void prepareBottomNavigation(AHBottomNavigation bottomNavigation)***: tương tự như ***prepareToolbar*** nhưng dùng cho bottom navigation.

- ***void invalidateNavigation(NavigationBuilder newNavigation)***: được sử dụng khi người dùng muốn cập nhật trạng thái của navigation khi nó đang được hiển thị.

### Xây dựng navigation

***NavigationBuilder*** là lớp chính được sử dụng trong việc xây dựng một navigation hoàn chỉnh cho trang fragment. Đầu tiên chúng ta cần biết có 2 cách để xây dựng navigation. Cách đầu tiên là cách tự động, là khi mà chúng ta chỉ cần đưa ra layout của fragment (không cần có navigation) và hệ thống sẽ tự động thêm navigation cho nó. Cách thứ hai là cách thủ công, là khi mà chúng ta phải tự thêm navigation này vào các layout của fragment, lúc này hệ thống sẽ chỉ sử dụng các id mà chúng ta cung cấp trong layout để handle các control liên quan đến chúng. Cả 2 cách này đều cho phép chúng ta thiết lập các thuộc tính như title của toolbar, icon của toolbar...Nhưng chúng cũng có một số cơ chế riêng. Ví dụ như với cách tự động thì người dùng có thể yêu cầu là có hiển thị toolbar, bottom bar hay không, hoặc với cách thủ công thì chúng ta có thể chỉ định id của toolbar hoặc bottom bar.

Để có thể làm được cùng lúc 2 cách trên thì giải pháp của chúng ta là xây dựng một lớp abstract cha là ***NavigationBuilder*** và 2 subclass của nó sao cho các lớp con này có thể thay đổi lẫn nhau. Để thực hiện được điều này thì chúng ta sẽ sử dụng [pattern](http://stackoverflow.com/a/10941465/4052962) này để trong trường hợp khi đang gọi phương thức từ lớp builder cha thì chúng ta vẫn giữ được tham chiều đến lớp builder con. Cơ bản nó sẽ trông như này:

```java
public abstract class NavigationBuilder<T extends NavigationBuilder<T>> {
    ...
    public T toolbarTitle(CharSequence toolbarTitle) {
        this.toolbarTitle = toolbarTitle;
        return getThis();
    }
    protected abstract T getThis();
    ...
}
public final class AutoLayoutNavigationBuilder extends NavigationBuilder<AutoLayoutNavigationBuilder> {
    ...
    public AutoLayoutNavigationBuilder includeToolbar() {
        this.includeToolbar = true;
        return this;
    }
    @Override
    protected AutoLayoutNavigationBuilder getThis() {
        return this;
    }
    ...
}
```

Khi sủ dụng thì chúng ta có thể chain các method như sau:

```java
new AutoLayoutNavigationBuilder()
      .toolbarTitle(“Cool”)
      .includeToolbar()
      .build();
```

### Xây dựng layout

Chúng ta cần phải xác định các cách có thể để xây dựng một layout. Ví dụ như chúng ta mong muốn có thể ra lệnh cho builder là "Hãy dựng layout mà có id như này", "Đây là layout của tao, đừng làm gì cả, chỉ cần đưa tao", "Đây là layout của tao, thêm toolbar với bottom bar hộ tao nhé". Để đáp ứng được mong muốn đó thì chúng ta sẽ có giải pháp như sau:

```java
public interface LayoutFactory {
    View produceLayout(LayoutInflater inflater, @Nullable ViewGroup container);
}
public final class IdLayoutFactory implements LayoutFactory {
    private final int layoutId;
    public IdLayoutFactory(int layoutId) {
        this.layoutId = layoutId;
    }
    @Override
    public View produceLayout(LayoutInflater inflater, @Nullable ViewGroup container) {
        return inflater.inflate(layoutId, container, false);
    }
}
public final class DummyLayoutFactory implements LayoutFactory {
    private final View view;
    public DummyLayoutFactory(View view) {
        this.view = view;
    }
    @Override
    public View produceLayout(LayoutInflater inflater, @Nullable ViewGroup container) {
        return view;
    }
}
public final class NavigationLayoutFactory implements LayoutFactory {
    private final boolean includeToolbar;
    private final boolean includeBottomBar;
    private final LayoutFactory origin;
    public NavigationLayoutFactory(boolean includeToolbar, boolean includeBottomBar, LayoutFactory origin) {
        this.includeToolbar = includeToolbar;
        this.includeBottomBar = includeBottomBar;
        this.origin = origin;
    }
    @Override
    public View produceLayout(LayoutInflater inflater, @Nullable ViewGroup container) {
        LinearLayout parent = new LinearLayout(inflater.getContext());
        parent.setLayoutParams(new ViewGroup.LayoutParams(MATCH_PARENT, MATCH_PARENT));
        parent.setOrientation(VERTICAL);
        View child = origin.produceLayout(inflater, parent);
        LinearLayout.LayoutParams childParams = new LinearLayout.LayoutParams(MATCH_PARENT, MATCH_PARENT);
        if (includeBottomBar) {
            childParams.weight = 1;
        }
        if (includeToolbar) {
            inflater.inflate(R.layout.layout_with_toolbar, parent);
        }
        parent.addView(child, childParams);
        if (includeBottomBar) {
            int height = (int) dp(parent.getContext(), 56);
            AHBottomNavigation bottomNavigation = new AmruBottomNavigation(parent.getContext());
            bottomNavigation.setId(R.id.bottomNavigation);
            parent.addView(bottomNavigation, new LinearLayout.LayoutParams(MATCH_PARENT, height));
        }
        return parent;
    }
}
```

Lớp sau cùng sử dụng Decorator pattern nhằm có thể wrap được layout đã được dựng trước đó, ví dụ như là từ xml. Người cùng có thể inject bất kỳ layout factory nào mà họ viết ra. Để đơn giản thì như ở trên chúng ta đang wrap nó bằng ***LinearLayout***

### Kết quả

Và giờ thì cách dựng navigation và handle control cho mỗi fragment sẽ tương tự như đoạn code dựng toolbar và bottom bar dưới đây. Khá ngắn gọn và dễ đọc :3

```java
@Override
protected NavigationBuilder buildNavigation() {
    return navigation(R.layout.fragment_send_feedback)
            .custom()
            .toolbarId(R.id.my_toolbar_id)
            .toolbarTitleRes(R.string.title_feedback_screen)
            .toolbarNavigationIcon(showCloseIcon ? CLOSE : BACK)
            .menuRes(R.menu.menu_send_feedback,
                     item(R.id.sendMenuItem, this::sendFeedback));
}
@Override
protected NavigationBuilder buildNavigation() {
    return navigation(R.layout.view_pager)
            .toolbarTitleRes(R.string.title_favorites)
            .toolbarNavigationIcon(NOTHING)
            .includeBottomBar()
            .currentBottomBarItem(FAVORITES_PAGE);
}
```

Cách làm "1 fragment 1 toolbar" không phải là lúc nào cũng tốt hơn cách "nhiều fragment chung toolbar". Có những trường hợp mà cách thứ 2 sẽ tốt hơn. Ví dụ như nếu việc chuyển đổi giữa các màn hình mà cần có transition animation ở toolbar thì cách thứ 2 sẽ tốt hơn do sẽ dễ dàng hơn. Ưu điểm của cách "1 fragment 1 toolbar" là người dùng sẽ không phải nghĩ về việc đồng bộ navigation khi các fragment thay đổi.

### Source

Bạn có thể tìm thấy link source demo cách dựng navigation như trên ở [đây](https://github.com/programmerr47/navigation-widgets). Có 2 module trong project là **app** và **navigation**. Module thứ hai chỉ đóng vai tròn như một lib hỗ trợ việc xây dựng fragment có navigation. Module **app** là app mẫu hướng dẫn cách sử dụng module **navigation**

Nguồn: 
https://medium.com/@programmerr47/give-toolbar-to-each-fragment-52c3a996deb5
https://www.toptal.com/android/android-fragment-navigation-pattern