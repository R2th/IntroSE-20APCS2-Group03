## Giới thiệu chung
* `Fragment` class trong Android được dùng để xây dựng các dynamic UI. 
* `Fragment` được dùng trong `Activity`. 
* Lợi thế lớn nhất của `Fragment` đó là nó đơn giản hoá công việc tạo ra các UI cho nhiều kích cở màn hình khác nhau. 
* Một `Activity` có thể chứa một hoặc nhiều `Fragment`.

Qua đây chúng ta có thể dễ dàng hình dung được việc sử dụng `Fragment` là như thế nào rồi đúng không? Tuy nhiên, có những vẫn đề liên quan và một số lỗi xảy ra trong quá trình chúng ta sử dụng nó. Trong bài viết này mình sẽ khái quát một số vấn đề cũng như một số lỗi mà chúng ta thường gặp. 

Dưới đây là một vài vấn đề liên quan đến `Fragment` mà vài bạn có thể đã gặp hoặc vài bạn có thể sẽ gặp sau này
* `FragmentManager`: `getSupportFragmentManager` và `getChildFragmentManager`. Nên sử dụng cái nào và khi nào để tránh memory leaks trong khi sử dụng chúng.
* Callback từ `DialogFragment`, `ChildFragment`, `BottomSheetFragment` đến parent fragment.
* Fragments với `ViewPager`: `FragmentStateAdapter` và `FragmentPagerAdapter`.
* `FragmentTransaction`: `add` và `replace`.
* Fragment receivers, broadcasts và memory leaks.
* Fragment `BottomBarNavigation` và drawer. Xử lý chúng như thế nào?
* `commit()` và `commitAllowingStateLoss()`
* Fragment option menus.
* Fragment `getActivity()`, `getView()` và `NullPointers Exceptions`.
* `onActivityResult` với các nested fragment.
* Fragment và `Bundle`.
* Back Navigation.

*Nếu bạn đã gặp các vấn đề khác và thấy hay, hãy chia sẻ dưới comment nhé. :D*


## `getSupportFragmentManager` và `getChildFragmentManager`
`FragmentManager` là class cung cấp bởi framework được dùng để tạo các transactions cho việc thêm, xoá hoặc thay thế các fragment.

**`getSupportFragmentManager`** được liên kết với Activity và chúng ta có thể xem nó như là Fragment Manager của Actitity. 
Vậy nên mỗi khi bạn sử dụng `ViewPager`, `BottomSheetFragment` và `DialogFragment` trong một Activity bạn sẽ dùng `getSupportFragmentManager`.
Ví dụ: 
```
BottomDialogFragment bottomSheetDialog = BottomDialogFragment.getInstance();
bottomSheetDialog.show(getSupportFragmentManager(), "Custom Bottom Sheet");
```

**`getChildFragmentManager`** thì được liên kết với Fragment, vì vậy mỗi khi bạn sử dụng  `ViewPager` trong Fragment bạn sẽ dùng `getChildFragmentManager`.
Ví dụ:
```
FragmentManager cfManager=getChildFragmentManager();
viewPagerAdapter = new ViewPagerAdapter(cfManager);
```

*Để chi tiết hơn về FragmentManager bạn có thể tìm hiểu thêm [tại đây](https://developer.android.com/reference/android/support/v4/app/FragmentManager.html)*

Bây giờ chúng ta đến với một lỗi phổ biến mà mọi người hay mắc phải khi sử dụng ViewPager trong Fragment, đó là ở đây chúng ta sử dụng `getSupportFragmentManager` thay vì `getChildFragmentManager`. Vì `getSupportFragmentManager` là Fragment Manager của activity nên nó là nguyên nhân dẫn đến việc memory leaks hay thỉnh thoảng ViewPager không được updated.

Vấn đề quan trọng chính đó là memory leak. Fragment có một stack chứa các fragment và được dùng bởi ViewPager, tất cả các stack này trong Activity hoạt động từ khi `getSupportFragmentManager` được sử dụng. Bây giờ nếu chúng ta close **parent** fragment nó sẽ được close nhưng không được destroyed. Bởi vì tất **child** fragments đều ở trong Activity và chúng sẽ còn tồn tại trong bộ nhớ, dẫn đến việc nó sẽ không được phép destroy **parent** fragment đây là nguyên nhân của việc leak. Đồng thời nó không chỉ leak **parent** fragment mà còn leak tất cả  fragments vì không fragment nào trong số đó được xoá khỏi bộ nhớ heap. 

## Callback từ `DialogFragment`, `ChildFragment`, `BottomSheetFragment` đến parent fragment
Đây là vấn đề rất phổ biến mà mọi người gặp phải khi sử dụng `BottomSheetFragment` hoặc `DialogFragment` hoặc `ChildFragment`.

Ví dụ: Add một child fragment
```
FragmentTransaction ft = getChildFragmentManager().beginTransaction();
Fragment1Page2 fragment = new Fragment1Page2();
ft.replace(R.id.contentLayoutFragment1Page2, fragment);
ft.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_FADE);
ft.addToBackStack(null);
ft.commit();
```

Một ví dụ khác về `bottomSheetFragment`
```
BottomSheetDialogFragment fragment = BottomSheetDialogFragment.newInstance();
fragment.show(getChildFragmentManager(), fragment.getTag());
```

Bây giờ, giải sử chúng ta muốn có một callback từ **child** fragments đến **parent** fragments. Hầu hết mọi người đều tạo kết nối giữa 2 fragment bằng việc sử dụng activity, một vài người khác thì truyền các interface listeners như một parameter vào fragment đây thực sự là một việc không đúng, nên mọi người cần tránh đều này. Cách tốt nhất là `getParentFragment()` từ child fragment để tạo callback, đây là một cách rất đơn giản, bạn hãy xem ví dụ bên dưới
```
dialogFragment.show(ParentFragment.this.getChildFragmentManager(), "dialog_fragment");
```

Sau đó setting callback cho parent fragment, thêm đoạn code sau vào child fragment
```
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    try {
        callback = (Callback) getParentFragment();
    } catch (ClassCastException e) {
        throw new ClassCastException("Calling fragment must implement Callback interface");
    }
}
```
Bây giờ chúng ta có thể callback cho parent fragment một cách dễ dàng.

Bằng việc sử dụng cách này chúng ta có thể tạo một callback từ child fragment bên trong ViewPager cho parent fragment nắm giữ ViewPager này.

##  Fragments với `ViewPager`: `FragmentStateAdapter` và `FragmentPagerAdapter`
`FragmentPagerAdapter` lưu trữ toàn bộ fragment trong bộ nhớ, và có thể tiêu tốn nhiều bộ nhớ hơn nếu số lượng lớn các fragment được sử dụng trong `ViewPager`. `FragmentStatePagerAdapter` chỉ lưu trữ `savedInstanceState` của fragment và destroy tất cả fragments khi chúng mất focus. 
Vì vậy khi chúng ta có nhiều fragment trong ViewPager hãy sử dụng `FragmentStateAdapter`, nhưng trong trường hợp có ít hơn 3 fragments thì chúng ta có thể dùng `FragmentPagerAdapter`.

Các vấn đề thường gặp phải: 

### Update ViewPager không làm việc
Mọi người luôn gặp vấn đề nhớ các fragment trong ViewPager được quản lý bởi Fragment hoặc Activity và Fragment Manager này giữ instance của tất cả fragments trong ViewPager.
Vậy nên khi chúng ta nói ViewPager không được refresh, nó không có gì ngoài những instances cũ của các fragments vẫn đang được giữ bởi `FragmentManager`. 

Vì vậy chúng ta cần tìm hiểu tại sao `FragmentManger` đang giữ instances của Fragment có bất kì leak hay không đúng để refresh, ViewPager code sau đây sẽ làm việc nếu chúng ta không làm điều gì sai.
```
List<String> strings = new ArrayList<>();
strings.add("1");
strings.add("2");
strings.add("3");
viewPager.setAdapter(new PagerFragAdapter(getSupportFragmentManager(), strings));
strings.add("4");
viewPager.getAdapter().notifyDataSetChanged();
```

### Truy cập current Fragment từ ViewPager
Đây cũng là vấn đề chúng ta cũng thường gặp. Mọi người có thể một array list các fragments trong adapter hoặc thử truy cập vào fragment bằng việc sử dụng các tags, tuy nhiên theo mình thì cả 2 phương thức này đều không đáng tin cậy. `FragmentStateAdapter` và `FragmentPagerAdapter`cung cấp phương thức `setPrimaryItem` được dùng để set  current fragment như bên dưới.
```
BlankFragment blankFragment;
@Override
public void setPrimaryItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
    if (getBlankFragment() != object) {
        blankFragment = (BlankFragment) object;
    }
    super.setPrimaryItem(container, position, object);
}
public BlankFragment getBlankFragment() {
    return blankFragment;
}
```
Để nắm rõ hơn, bạn có thể xem thêm ví dụ về ViewPager thông qua [link](https://github.com/amodkanthe/ViewPagerTest) Github này.

##  `FragmentTransaction`: `add` và `replace`.
Giả sử chúng ta có Activity chứa một container và container này chứa các fragment của chúng ta.

**`add`** cơ bản sẽ thêm fragment vào container, ví dụ như chúng ta add `FragmentA` và `FragmentB` vào container. Container sẽ chứa `FragmentA` và `FragmentB`. Đồng thời container là một Framlayout thì các fragment sẽ được thêm cái này trên cái kia. **`replace`** sẽ thay thế fragment trên top của container, vì vậy nếu chúng ta tạo `FragmentC` và gọi `replace`, thì FragmentB hiện đang trên top của container sẽ bị remove và thay thế bằng `FragmentC` trừa khi chúng ta gọi phương thức `addToBackStack` .

Vậy chúng ta nên dùng cái nào khi nào, `replace` sẽ remove fragment đăng tồn tại và và add fragment mới, điều này có nghĩa là khi chúng ta nhấn back button thì fragment đã được replaced sẽ được tạo lại và `onCreateView` sẽ được invoked. Trái lại, `add` sẽ giữ lại fragment hiện tại và thêm một fragment mới, fragment hiện tại sẽ được active và sẽ không được 'paused' trạng thái, do đó khi nhấn back button `onCreateView` sẽ không được gọi lại. Về mặt vòng đời của fragment các sự kiện `onPause`, `onResume`, `onCreateView`  và các sự kiện vòng đời khác sẽ bị invoked trong trường hợp chúng ta sử dụng `replace`. Sẽ không invoked khi ta sử dụng `add`.

Chúng ta sẽ sử dụng `replace` fragment nếu không muốn giữ lại current fragment và current fragment cũng không có yêu cầu gì nhiều hơn. Ngoài ra nếu ứng dụng của chúng ta hạn chế về bộ nhớ, thì nên sử dụng `replace` để thay thế cho `add`.

## Fragment receivers, broadcasts và memory leaks.

Một số lỗi của chúng ta thường gặp khi sử dụng receivers trong fragment đó là quên đi unregister receiver trong `onPause` hoặc `onDestroy`. Nếu chúng ta đã đăng kí fragment để listen receiver tại `onCreate` hoặc `onResume` thì cần unregister nó trong `onPause` hoặc `onDestroy`, nếu không nó sẽ là nguyên nhân của memory leak.
```
LocalBroadcastManager.getInstance(getActivity()).unregisterReceiver(mYourBroadcastReceiver);
```

Cũng như, nếu chúng ta có nhiều fragment đang listen cùng một broadcast receiver hãy đảm bảo rằng register nó trong `onResume` và unregister trong `onPause`. Bởi vì nếu chúng ta thực hiện nó trong `onCreate` và `onDestroy` thì fragment sẽ không nhận được message của broadcast nếu nó không bị destroyed.

## Fragment `BottomBarNavigation` và drawer. Xử lý chúng như thế nào?
Khi sử dụng `BottomBarNavigation` và `NavigationDrawer`, mọi người sẽ gặp các vấn đề như các fragment bị tạo lại, cùng một fragment được bị thêm nhiều lần, v.v...
Trong trường hợp như thế này chú ta có thể sử dụng  fragment transaction `show` và `hide` thay về `add` và `replace`. 
Cũng có một thư viện khá tốt để đảm bảo navigations và tránh recreation các fragments gọi là [FragNav](https://github.com/ncapdevi/FragNav)

## `commit()` và `commitAllowingStateLoss()`
Nếu activity của chúng ta không vào trạng thái resume và chúng ta đang cống gắng commit một fragment, ứng dụng sẽ bị crash để tránh điều này chúng ta cần kiểm tra activity hay fragment trong resume hay không `isAdded()`/`isResumed()`.
Một cách khác nếu chúng ta không quan tâm nhiều về state của fragment chúng có thể gọi `commitAllowingStateLoss`. Điều này sẽ đảm bảo rằng các fragments sẽ được add hoặc replace mặc cho activity đang finish hoặc không ở trạng thái resume.

## Fragment option menus
Khi chúng ta sử dụng option menus trong fragment hãy nhớ thêm dòng sau, nhiều người đã quên thêm nó và tự hỏi option menus ở đâu trong toolbar.
```
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
    }
```

Khi sử dụng toolbar bên trong fragment chúng ta có thể inflate menu bằng việc sử dụng.
```
getToolbar().inflateMenu(R.menu.toolbar_menu_gmr);
```

Một option khác đó là chúng ta có thể override `createOptionsMenu`, nhưng mình thích cách trên hơn vì nó không rely trên super class.

## Fragment `getActivity()`, `getView()` và `NullPointers Exceptions`.
Nếu bất kì tiến trình background nào post các result mà fragment không trong stack hoặc ở trạng thái resume và chúng ta truy cập vào view của fragment nó sẽ là nguyên nhân của ngoại lệ NullPointer. 
Vì vậy mỗi khi chúng ta đang truy cập `getActivity()` hoặc `getView()` sau khi hoạt động trở lại, hoặc delay hãy đảm bảo rằng tất cả background thực hiện đã cancel trong destroy.
Ví dụ:
```
new Handler().postDelayed(new Runnable() {
    @Override
    public void run() {
        if(getActivity() != null && getView() != null && isAdded) {
            PagerFragAdapter pagerFragAdapter = (PagerFragAdapter) viewPager.getAdapter();
            pagerFragAdapter.getBlankFragment().setLabel();
        }
    }
}, 500);
```

## `onActivityResult` với các nested fragment.
`onActivityResult` trong các nested fragment sẽ không được gọi. 
Các việc gọi tuần tự của onActivityResult (trong  Android support library) là:
1. `Activity.dispatchActivityResult()`.
2. `FragmentActivity.onActivityResult()`.
3. `Fragment.onActivityResult()`.

Vì vậy chúng ta phải dùng `onActivityResult()` trong parent fragment hoặc activity và pass result và nested fragment như dưới đây.
```
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
List<Fragment> fragments = getChildFragmentManager().getFragments();
        if (fragments != null) {
            for (Fragment fragment : fragments) {
                fragment.onActivityResult(requestCode, resultCode, data);
            }
        }
    }
```

## Fragment và Bundle
Mỗi khi chúng ta truyền tham số vào fragment hãy chắc chắn rằng chúng ta đang sử dụng Bundle thay vì constructor.
Document của Android:
> Every fragment must have an empty constructor, so it can be instantiated when restoring its activity’s state. It is strongly recommended that subclasses do not have other constructors with parameters, since these constructors will not be called when the fragment is re-instantiated; instead, arguments can be supplied by the caller with setArguments(Bundle) and later retrieved by the Fragment with getArguments().

Theo doc trên thì fragment luôn luôn phải có một constructor rỗng, vì vậy nó có thể đc khởi tạo khi khôi phục trạng thái hoạt động của nó. Chúng ta được khuyến nghị rằng các subclass sẽ không có bất kì tham số nào khác. Vì constructor đó sẽ không được gọi khi fragment được khởi tạo lại. 

Đó là lý do tại sao chúng ta sẽ sử dụng Bundle để thay thế cho constructor trong việc truyền tham số cho fragment. Đây là cách để hệ thống dễ dàng trong việc khôi phục các giá trị khi fragment khởi tạo lại.

## Back Navigation
Chúng ta nên đảm bảo rằng việc nhấn *Back* button trên màn hình chi tiết để sẽ đưa người dùng trở về màn hình chính. Để làm được điều này chúng ta cần gọi addToBackStack() trước khi commit  transaction.
```
getSupportFragmentManager().beginTransaction()
                           .add(detailFragment, "detail")
                           // Add this transaction to the back stack
                           .addToBackStack(null)
                           .commit();
```
Khi có đối tượng `FragmentTransaction` trong back stack và người dùng nhấn *Back* button. Fragment Manager sẽ pop transaction gần nhất trong back stack và thực hiện hành động reverse. 

## Kết luận
Fragment có vẻ như thật dễ dàng với nó, tuy nhiên cũng có nhiều thứ khiến chúng ta cần để ý đến như memory, navigation, callbacks, bundle, v.v... Hi vọng rằng mình có thể note lại được một vài điều mà mọi người hay gặp phải. Hãy để lại comment bên dưới với những điều tuyệt vời mà bạn đã phát hiện ra. `Happy coding :))`

## Tham khảo
1. https://proandroiddev.com/android-fragments-common-queries-common-mistakes-df2014da0b50