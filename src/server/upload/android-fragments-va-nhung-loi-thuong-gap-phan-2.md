![](https://images.viblo.asia/c0d1afc1-a914-49bb-a8b9-93f16f353fbe.png)
## 1. Giới thiệu
Fragment là một phần giao diện người dùng hoặc hành vi của một ứng dụng. Fragment có thể được đặt trong Activity hoặc một Fragment khác. Một lợi thế rất lớn của Fragment là nó đơn giản hóa việc tạo UI cho phép nhiều Fragment trên một màn hình. 
Fragment thì đã xuất hiện từ rất lâu các bài giới thiệu về Fragment cũng rất nhiều rồi các bạn có thể tìm hiểu vòng đời của Fragment cũng như cách triển khai với từng trường hợp. <br>
Trong [PHẦN 1](https://viblo.asia/p/android-fragments-va-nhung-loi-thuong-gap-phan-1-Qbq5Q4rRlD8) mình đã trình bày một số lỗi thương gặp như: </>
* FragmentManager: getSupportFragmentManager and getChildFragmentManager khi nào thì dùng và tránh rò rỉ bộ nhớ khi sử dụng.
* Callback from DialogFragment, ChildFragment, BottomSheetFragment to parent fragment.
* Khi nào thì sử dụng ViewPager, FragmentStateAdapter hay FragmentPagerAdapter.
* Fragment receivers, broadcasts and memory leaks. <br>

**Tại phần 2 này mình xin tiếp tục các lỗi về:**
* Fragment BottomBarNavigation and drawer. Làm thế nào để xử lý những điều này?
* commit() and commitAllowingStateLoss()
* Fragment option menus.
* Fragment getActivity(), getView() and NullPointers Exceptions.
* onActivityResult with nested fragments.
* Fragment and Bundle.
* Back Navigation.
## 2. Các vấn đề thường gặp phải
#### 2.1 Fragment BottomBarNavigation and drawer. Làm thế nào để xử lý những điều này ?
Khi chúng ta sử dụng **BottomBarNavigation** và **NavigationDrawer**. Chúng ta cũng sẽ phải đối mặt với những vấn đề như việc các Fragment bị tạo lại, lặp lại nhiều lần. <br>
VÌ vậy trong trường hợp như vậy, chúng ta có thể sử dụng fragment transaction: **show** và **hide** thay vì **add** và **replace**. <br>
Ngoài ra có một library FragNav khá tốt để tránh việc xẩy ra những lỗi như trên các làm có thể tham khảo [tại đây](https://github.com/ncapdevi/FragNav)

#### 2.2 commit() and commitAllowingStateLoss()

Nếu acitivty hoặc fragment của chúng ta đang không ở trạng thái isResume nếu tiến hành commit một fragment thì ứng dụng sẽ bị crash. Để tránh điều này chúng ta cần kiểm tra activity hoặc fragment có hay không ở trạng thái **isAdded()** hoặc **isResume()**. <br>
Một cách khác nếu chúng ta muốn bỏ qua state của activity hoặc fragment thì có thể gọi **commitAllowingStateLoss**. Điều này sẽ đảm bảo các fragments sẽ được add hoặc replace mà không gây ra crash.

#### 2.3 Fragment option menus
Khi chúng ta sử dụng option menu trong Fragment hãy nhớ add dòng code sau đây.
```
@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
    }
```
Khi chúng ta sử dụng toolbar trong fragment chúng ta có thể inflate menu bằng cách sử dụng:
```
getToolbar().inflateMenu(R.menu.toolbar_menu_gmr);
```
Ngoài ra còn có một cách nữa chúng ta rất hay sử dụng đó là **override createOptionsMenu**.
#### 2.4 Fragment getActivity(), getView() and NullPointers Exceptions.
Việc bị mất fragment trong stack là điều thương xuyên xảy ra nó gây ra cái exception NullPointer. Vì vậy khi chúng ta sử dụng **getActivity()** hoặc **getView()**. Tránh đều này các bạn có thể tham khảo cách dưới đây:
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
#### 2.5 onActivityResult with nested fragments.
**onActivityResult** trong các nested fragment sẽ không được gọi. Các việc gọi tuần tự của onActivityResult (trong Android support library) là:
 1. Activity.dispatchActivityResult().
 2. FragmentActivity.onActivityResult().
 3. Fragment.onActivityResult().<br>

Vì vậy chúng ta phải dùng onActivityResult() trong parent fragment hoặc activity và pass result và nested fragment như dưới đây.
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
#### 2.6 Fragment and Bundle
> Every fragment must have an empty constructor, so it can be instantiated when restoring its activity’s state. It is strongly recommended that subclasses do not have other constructors with parameters, since these constructors will not be called when the fragment is re-instantiated; instead, arguments can be supplied by the caller with setArguments(Bundle) and later retrieved by the Fragment with getArguments().

Document của Android cũng đã nói rất rõ ràng chúng ta không nên truyền param vào Fragment qua contructor mà hãy thực hiện việc này qua Bundle. <br>
Để lý giải việc này các bạn có thể hiểu rằng Fragment luôn cần một contructor rỗng, vì vậy nó có thể được khơi tạo khi khôi phục trạng thái hoạt động của nó. Chúng ta được khuyến nghị rằng các subclass sẽ không có bất kì tham số nào khác. Vì constructor đó sẽ không được gọi khi fragment được khởi tạo lại. Việc sử dụng Bundle sẽ giúp hệ thống dễ dàng trong việc khôi phục các giá trị khi Fragment khởi tạo lại.
#### 2.7 Back Navigation
Chúng ta nên đảm bảo rằng việc nhấn Back button trên màn hình sẽ đưa người dùng trở về màn hình chính. Để làm được điều này chúng ta cần gọi addToBackStack() trước khi commit transaction.
```
getSupportFragmentManager().beginTransaction()
                           .add(detailFragment, "detail")
                           // Add this transaction to the back stack
                           .addToBackStack(null)
                           .commit();
```
Khi có đối tượng FragmentTransaction trong back stack và người dùng nhấn Back button. Fragment Manager sẽ pop transaction gần nhất trong back stack và thực hiện hành động reverse.
## 3. Tổng kết
Như vậy mình cũng đã tổng hợp xong một số lỗi thường gặp trong Framgnet. Tuy chưa thể liệt kê hết được tất cả các lỗi ra nhưng cũng hy vong giúp đỡ được các bạn phần nào. Cảm ơn các bạn đã đọc bài viết.
* **Nguồn:** <br>
https://proandroiddev.com/android-fragments-common-queries-common-mistakes-df2014da0b50