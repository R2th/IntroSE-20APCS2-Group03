Fragment là một trong những thành phần phổ biến nhất trong Android mà mọi lập trình viên đều phải biết sử dụng. Fragment được sử dụng để xây dựng nên những giao diện người dùng linh hoạt và cần được sử dụng bên trong Activity. Điểm mạnh lớn nhất của việc sử dụng fragment là đơn giản hóa công việc tạo UI cho nhiều kích cỡ màn hình khác nhau.
Ở bài viết này, mình xin được trình bày một số vấn đề khi sử dụng fragment mà các lập trình viên có thể gặp phải.
Lưu ý rằng, ở bài viết này, mình giả định bạn đã có kiến thức cơ bản về fragment, vòng đời, cách sử dụng của nó.
# Những trở ngại khi dùng fragment
Sau đây là một vài những trở ngại liên quan tới việc dùng fragment mà chắc chắn ai trong chúng ta cũng đã từng gặp phải hoặc sẽ gặp phải trong tương lai:
* `FragmentManager`: `getSupportFragmentManager` và `getChildFragmentManger`. Nên sử dụng cái nào và khi nào và tránh sử bị memory leak khi sử dụng.
* Callback từ `DialogFragment`, `ChildFragment`, `BottomSheetFragment` tới fragment cha.
* Các fragment khi sử dụng `ViewPager` và khi nào sử dụng `FragmentStateAdapter` và `FragmentPagerAdapter`.
* Khi nào sử dụng `add` và `replace`.
* Fragment receiver, broadcast và memory leak.
* Cách để sử lý các fragment trong `BottomBarNavigation` và `NavigationDrawer`.
* `commit` và `commitAllowingStateLoss`
* Fragment option menu.
* `getActivity()`, `getView()` và `NullPointerException`.
# getSupportFragmentManager và getChildFragmentManger
`FragmentManager` là một lớp được cung cấp bởi Android Framework, được sử dụng để tạo các transaction cho việc add, remove, replace fragment.
* `getSupportFragmentmanger` được liên kết với một activity. Có thể coi nó như một `FragmentManager` cho activity của chúng ta.
Vậy nên, bất cứ khi nào ta sử dụng `ViewPager`, `BottomSheetFragment`, hay `DialogFragment` trong một activity, ta sẽ sử dụng `getSupportFragmentManager`
* `getChildFragmentManager` được liên kết với các fragment.
Bất kỳ khi nào ta sử dụng `ViewPager` bên trong một fragment, ta sẽ cần sử dụng `getChildFragmentManager`.
Đây là [đường dẫn](https://developer.android.com/reference/android/support/v4/app/FragmentManager.html) để bạn có thể hiểu sâu hơn.
Một trong những lỗi thường gặp là khi sử dụng `ViewPager` bên trong fragment, ta lại sử dụng getSupportFragmentManager, khiến cho những lỗi xảy ra như là memory leak hay ViewPager không được update đúng.
Lỗi nghiêm trọng nhất gây ra bởi việc sử dụng `getSupportFragmentManager` không đúng cách là memory leak. Ta có một stack các fragment được sử dụng bởi `ViewPager`, và khi tất cả các fragment này được đưa vào stack của activity khi ta gọi phương thức getSupportFragmentManager. Sau đó, nếu ta đóng fragment cha, nó sẽ bị đóng nhưng không bị hủy bởi tất cả fragment con của nó vẫn đang active và nằm trong bộ nhớ, dẫn tới memory leak. Không chỉ fragment cha mà các fragment con cũng bị vấn đề này. Do đó, không gọi phương thức `getSupportFragmentManger` ở trong fragment.
# Callback từ DialogFragment, ChildFragment, BottomSheetFragment tới fragment cha.
Đây là một lỗi rất phổ biến mà ta gặp phải khi sử dụng `BottomSheetFragment`, `DialogFragment` hay `ChildFragment`.
Ví dụ, thêm một child fragment:
```
FragmentTransaction ft = getChildFragmentManager().beginTransaction();
Fragment1Page2 fragment = new Fragment1Page2();
ft.replace(R.id.contentLayoutFragment1Page2, fragment);
ft.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_FADE);
ft.addToBackStack(null);
ft.commit();
```
Và một ví dụ khác về `BottomSheetFragment`:
```
BottomSheetDialogFragment fragment = BottomSheetDialogFragment.newInstance();
fragment.show(getChildFragmentManager(), fragment.getTag());
```
Bây giờ, giả sử ta muốn một callback từ những child fragment này fragment cha. Hầu hết mọi người sẽ tạo một kết nối giữa hai fragment bằng một activity. Một số ít sẽ tạo một interface listener như một tham số truyền vào cho fragment. Cách tốt nhất là gọi `getParentFragment` từ child fragment để tạo một callback. Ví dụ:
```
dialogFragment.show(ParentFragment.this.getChildFragmentManager(), "dialog_fragment");
```
Sau đó, set callback tới parent fragment bằng cách thêm đoạn code sau vào child fragment:
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
Vậy là ta đã có thể đưa một callback tới parent fragment.
# Các fragment khi sử dụng ViewPager và khi nào sử dụng FragmentStateAdapter và FragmentPagerAdapter
`FragmentPagerAdapter` lưu trữ toàn bộ các fragment ở trong bộ nhớ và do đó làm phình to bộ nhớ khi một số lượng lớn fragment được sử dụng trong `ViewPager`. `FragmentStatePagerAdapter` chỉ lưu trữ `savedInstaceState` của fragment và sẽ hủy tất cả fragment khi chúng lost focus.
Vậy nên, khi ta có nhiều fragment, sử dụng `FragmentStatePagerAdapter`. Nếu `ViewPager` có ít hơn ba fragment, sử dụng `FragmentPagerAdapter`.
Hãy cùng xem xét một vài vấn đề thường gặp phải:
## ViewPager không cập nhật được
Hãy nhớ rằng các fragment trong `ViewPager` được quản lý bởi `FragmentManager`, bất kể là ở fragment hay activity, và `FragmentManager` giữ instance của tất cả các fragment trong `ViewPager`.
Vậy nên, khi `ViewPager` không được cập nhật, chắc chắn là do các instance cũ của các fragment vẫn được giữ bởi `FragmentManager`. Ta cần phải tìm ra tại sau `FragmentManager` lại đang giữ những instance đó.  Kiểm tra có bị memory leak hông. Có thể dùng đoạn code sau để kiểm tra cập nhật `ViewPager`.
```
List<String> strings = new ArrayList<>();
strings.add("1");
strings.add("2");
strings.add("3");
viewPager.setAdapter(new PagerFragAdapter(getSupportFragmentManager(), strings));
strings.add("4");
viewPager.getAdapter().notifyDataSetChanged();
```
## Truy cập Fragment hiện tại từ ViewPager
Đây cũng là một vấn đề rất phổ biến mà chúng ta hay gặp phải. Nếu bạn gặp phải, hãy tạo một list các fragment bên trong adapter hoặc thử truy cập vào fragment bằng cách sử dụng tag. Tuy nhiên, có một cách khác là cả `FragmentStateAdapter` và `FragmentPagerAdapter` đều cung cấp phương thức `setPrimaryItem`. Phương thức này có thể được sử dụng để set fragment hiện tại:
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
# Khi nào sử dụng add và replace
Trong activity, chúng ta có một container với những fragment được hiển thị trong đó.
Phương thức `add` sẽ đơn giản là thêm một fragment vào container đó. Giả sử rằng ta add FragmentA và FragmentB vào container, container sẽ có FragmentA và FragmentB và nếu container là FrameLayout, fragment sẽ được add chồng lên nhau.
Phương thức `replace` sẽ đơn giản là thay một fragment ở trên top của container bằng một fragment khác. Giả sử ta tạo FragmentC và gọi replace FragmentB ở top, FragmentB sẽ bị xóa khỏi container (nếu ta không gọi tới `addToBackStack`) và FragmentC sẽ nằm trên top của container.
#  Fragment receiver, broadcast và memory leak
Khi sử dụng receiver bên trong một fragment, một lỗi phổ biến là ta quên unregister receiver tại `onPause` và `onDestroy`. Nếu ta register một fragment ở `onCreate` và `onResume`, ta cần phải unregister nó, Nếu không, sẽ xảy ra memory leak.
Cùng với đó, nếu ta có nhiều fragment cùng sử dụng một `BroadcastReceiver`, cần chắc chắn rằng ta chỉ register và unregister tại onResume và onPause. Nếu ta thực hiện ở `onCreate` và `onDestroy`, những fragment khác sẽ không thể nhận được broadcast khi fragment này bị hủy.
# Cách để sử lý các fragment trong BottomBarNavigation và NavigationDrawer
Khi sử dụng `BottomBarNavigation` và `NavigationDrawer`, một vấn đề thường xuyên gặp phải là các fragment được khởi tạo lại hay cùng một fragment được thêm nhiều lần.
Trong trường hợp này, ta có thể sử dụng fragment transaction để gọi tới phương thức `show` và `hide` thay vì `add` và `replace`
# commit và commitAllowingStateLoss
Nêu activity đang không ở trạng thái resumed và ta cố gắng commit một fragment, ứng dụng sẽ bị crash. Để tránh việc này diễn ra, ta cần check activity hay fragment có ở trạng thái resumed hay không với phương thức `isAdded` / `isResumed`.
Một giải pháp khác, nếu ta không quan tâm tới trạng thái của fragment, ta có thể sử dụng phương thức `commitAllowingStateLoss`. Điều này đảm bảo fragment được add và replace dù cho activity đang không ở trạng thái resumed.
# Fragment option menu
Khi sử dụng option menu bên trong fragment, hãy ghi nhớ thêm dòng lệnh sau:
```
@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
    }
```
Khi sử dụng toolbar bên trong fragment, ta có thể inflate menu bằng đoạn code:
```
getToolbar().inflateMenu(R.menu.toolbar_menu_gmr);
```
Ngoài ra, ta cũng có thể ghi đè phương thức `createOptionsMenu`.
# getActivity(), getView() và NullPointerException
Nếu bất kỳ background process nào post một kết quả và fragment không ở trong stack hay không ở trạng thái resumed, truy cập vào view của fragment sẽ gây nên một `NullPointerException`. Vậy nên, bất cứ khi nào ta truy cập vào `getView` hay `getActivity` sau một background process hay một khoảng delay, cần phải chắc chắn rằng tất cả background process đều phải bị hủy khi kết thúc.
```new Handler().postDelayed(new Runnable() {
    @Override
    public void run() {
        if(getActivity() != null && getView() != null && isAdded) {
            PagerFragAdapter pagerFragAdapter = (PagerFragAdapter) viewPager.getAdapter();
            pagerFragAdapter.getBlankFragment().setLabel();
        }
    }
}, 500);
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
# Tổng kết
Fragment khi mới sử dụng có vẻ khá dễ dàng nhưng càng sử dụng ta càng nhận ra có nhiều vấn đề đối với chúng. Do đó, hãy cẩn thận khi sử dụng các fragment và chú ý tới những vấn đề như memory, điều hướng, callbacks, ... Cảm ơn bạn đã đọc bài viết.

Bài viết này được tham khảo từ bài viết "Android Fragments: Common Queries & Mistakes", bạn có thể xem [tại đây](https://medium.com/better-programming/android-fragments-common-queries-mistakes-1c42e9f6b44f)