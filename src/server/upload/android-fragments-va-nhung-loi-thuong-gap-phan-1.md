![](https://images.viblo.asia/c0d1afc1-a914-49bb-a8b9-93f16f353fbe.png)
## 1. Giới thiệu
Fragment là một phần giao diện người dùng hoặc hành vi của một ứng dụng. Fragment có thể được đặt trong Activity hoặc một Fragment khác. Một lợi thế rất lớn của Fragment là nó đơn giản hóa việc tạo UI cho phép nhiều Fragment trên một màn hình. <br>
Fragment thì đã xuất hiện từ rất lâu các bài giới thiệu về Fragment cũng rất nhiều rồi các bạn có thể tìm hiểu vòng đời của Fragment cũng như cách triển khai với từng trường hợp. <br>
Vì vậy tại bài viết này mình xin tập trung vào phần chính là những lỗi chúng ta thường gặp phải khi sử dụng Fragment:
* FragmentManager: getSupportFragmentManager and getChildFragmentManager khi nào thì dùng và tránh rò rỉ bộ nhớ khi sử dụng.
* Callback from DialogFragment, ChildFragment, BottomSheetFragment to parent fragment.
* Khi nào thì sử dụng ViewPager, FragmentStateAdapter hay FragmentPagerAdapter.
* Fragment receivers, broadcasts and memory leaks.
* Fragment BottomBarNavigation and drawer. Làm thế nào để xử lý những điều này?
* commit() and commitAllowingStateLoss()
* Fragment option menus.
* Fragment getActivity(), getView() and NullPointers Exceptions.
* onActivityResult with nested fragments.
* Fragment and Bundle.
* Back Navigation.
Cũng khá khá các vấn đề rồi. Sau đây mình xin phép đi chi tiết từng cái một. Nếu thấy vẫn còn thiếu các bạn có thể bổ sung ở phần comment cho mình nhé.
## 2. Các vấn đề thường gặp phải
#### 2.1 FragmentManager: getSupportFragmentManager and getChildFragmentManager
FragmentManager là Class được cung cấp bởi framework được sử dụng để tạo ra các transactions dùng để add, remove hay replace fragments. <br>
**getSupportFragmentManager**: được liên kết với Activity coi nó như một FragmentManager cho Activity của bạn. <br>
Vì vậy, bất cứ khi nào bạn đang sử dụng ViewPager, bottomSheetFragment và DialogFragment trong một Activity, bạn sẽ sử dụng getSupportFragmentManager. <br>
ví dụ: <br>
```
BottomDialogFragment bottomSheetDialog = bottomDialogFragment. getInstance (); 
bottomSheetDialog.show (getSupportFragmentManager (), "Bảng dưới cùng tùy chỉnh" );
```
**getChildFragmentManager** được liên kết với Fragment. <br>
Bất cứ khi nào bạn là ViewPager bên trong Fragment, bạn sẽ sử dụng getChildFragmentManager. <br>
ví dụ: <br>
```
FragmentManager cfManager=getChildFragmentManager();
viewPagerAdapter = new ViewPagerAdapter(cfManager);
```
Để hiểu rõ hơn điều này các bạn có thể xem [tại đây](https://developer.android.com/reference/android/support/v4/app/FragmentManager.html) . <br>
Bây giờ đến những lỗi phổ biến mà mọi người mắc phải khi họ đang sử dụng ViewPager bên trong Fragment. Khi mà không sử dụng **getSupportFragmentManager** với fragment manager trong activity nó sẽ gây ra các vấn đề như memory leaks, ViewPager không được update  vv.... <br>
Lý do là khi chúng ta sử dụng getSupportFragmentManager các fragment sẽ được lưu vào stack của Activity tức là Parent Fragment chứa Viewpager. khi bạn kill Parent Fragment đi thì  tất cả các child Fragments trong activity đó cũng sẽ không thể bị destroy vì tất cả chúng đều nằm trong bộ nhớ, nó vẫn còn tồn tại trong memory heap vì vậy sẽ gây tốn rất nhiều bộ nhớ<br>
Đừng bao giờ thử sử dụng getSupportFragmentManager trong Fragment.

#### 2.2  Callback from DialogFragment, ChildFragment, BottomSheetFragment to parent fragment
Đây là vấn đề rất phổ biến mà mọi người gặp phải khi họ sử dụng bottomSheetFragment hoặc DialogFragment hoặc ChildFragment. <br>
Ví dụ: <br>
Add a child fragment <br>
```
FragmentTransaction ft = getChildFragmentManager().beginTransaction();
Fragment1Page2 fragment = new Fragment1Page2();
ft.replace(R.id.contentLayoutFragment1Page2, fragment);
ft.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_FADE);
ft.addToBackStack(null);
ft.commit();
```
Một ví dụ khác bottomSheetFragment: <br>
```
BottomSheetDialogFragment fragment = BottomSheetDialogFragment.newInstance();
fragment.show(getChildFragmentManager(), fragment.getTag());
```
Hầu hết mọi người đều sử dụng interface để có thể callback lại với class parent của các fragments này. Tuy nhiên con đường tốt nhất chúng ta nên sử dụng **getParentFragment()** để có thể truyền callback.

```
dialogFragment.show(ParentFragment.this.getChildFragmentManager(), "dialog_fragment");
```
sau đó thiết lập callback cho fragment parent thêm đoạn mã sau vào đoạn con. <br>
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
bây giờ bạn có thể gọi lại cho parent fragments của bạn một cách dễ dàng. <br>
Sử dụng cùng một cách bạn có thể tạo callback từ fragment con trong ViewPager đến fragment parent đang chứa ViewPager .

#### 2.3 Khi nào thì sử dụng ViewPager, FragmentStateAdapter hay FragmentPagerAdapter
**FragmentPagerAdapter** lưu trữ toàn bộ fragment  trong bộ nhớ và có thể tăng chi phí bộ nhớ nếu sử dụng một lượng lớn các fragment trong ViewPager. <br>
**FragmentStatePagerAdapter** chỉ lưu vào savedInstanceState  của fragment và sẽ destroy tất cả khi mất forcus tại fragment này. <br>
Vì vậy, khi bạn sắp có nhiều Fragment, hãy sử dụng FragmentStatePagerAdapter nếu ViewPager sẽ có ít hơn ba fragment thì sử dụng FragmentPagerAdapter. <br>
**Các vấn đề thường gặp phả**i:
- Update ViewPager not working: <br>
Điều này thưởng xảy ra do FragmentManager giữ lại instance của tất cả các fragments trong ViewPager.
Một ý tưởng để làm mới lại fragment khi các config của bạn trong viewpager là đúng.
```
List<String> strings = new ArrayList<>();
strings.add("1");
strings.add("2");
strings.add("3");
viewPager.setAdapter(new PagerFragAdapter(getSupportFragmentManager(), strings));
strings.add("4");
viewPager.getAdapter().notifyDataSetChanged();
```
- Access current Fragment from ViewPager: <br>
Có một cách đơn giản để giải quyết vấn đề này. Chúng ta sẽ sử dụng **setPrimaryItem** <br>
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
Các bạn có thể xem một examples về fragment trong viewpager đơn giản [tại đây](https://github.com/amodkanthe/ViewPagerTest)
#### 2.4 Fragment receivers, broadcasts and memory leaks.
Những sai lầm mà mọi người thường làm khi sử dụng các receivers bên trong một đoạn bị bỏ quên để hủy đăng ký receivers trong onPause hoặc OnDestroy. Nếu bạn đang đăng ký bên trong onCreate hoặc OnResume, bạn sẽ phải hủy đăng ký bên trong onPause hoặc onDestroy nếu không sẽ gây memory leak.
```
LocalBroadcastManager.getInstance(getActivity()).unregisterReceiver(mYourBroadcastReceiver);
```
**Chú ý**: Bạn có một list fragments đang đăng ký receivers thì hãy đảm bảo rằng chúng được đăng ký và hủy trong onResume và onPause. Bở vì nếu theo chúng ta vẫn thường làm là đăng ký tại onCreate và hủy tại onDestroy sẽ dẫn tới các Fragment khác không thể nhận được receivers vì Fragment này không bị destroy.
## 3. Tổng kết
Phần 1 của bài viết này mình xin phép dừng tại đây các lỗi thường gặp của Fragment thì còn rất nhiều mình xin phép để phần 2 mình tiếp tục.<br>
Cảm ơn các bạn đã đọc bài viết. <br>

- **Nguồn** : <br>
https://proandroiddev.com/android-fragments-common-queries-common-mistakes-df2014da0b50

**Bye see you again**