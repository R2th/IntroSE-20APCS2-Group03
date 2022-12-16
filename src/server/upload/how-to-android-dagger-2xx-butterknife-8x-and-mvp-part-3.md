## Introduction
Chào mừng đến với hướng dẫn hoàn thiện nhằm làm cho Dagger.Android(2.11-2.17), ButterKnife(8.7 - 8.8), và Model-View-Presenter hoạt động cùng với nhau một cách hòa hợp.

Đây là phần 3 của chuỗi 3 phần:

1. Tạo một project, từ đầu, sử dụng Dagger.Android (2.11 - 2.17) dependency injection(DI) framework mới hỗ trợ các phạm vị **@Singleton**, **@PerActivity**, **@PerFragment**, và **@PerChildFragment**. [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22A%3A+dagger.android%22)]
2. Sử dụng ButterKnife(8.7 - 8.8) nhằm thay thế rất nhiều mã nguồn viết tay cho quá trình view binding. [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22B%3A+butterknife%22)]
3. Tái cấu trúc mã nguồn cho Model-View-Presenter nhằm tăng cường khả năng kiểm thử, bảo trì, và mở rộng. [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22C%3A+mvp%22)]

**UPDATE**:
* Bài viết này và project đi kèm với nó thỉnh thoảng được cập nhật và làm cho tương thích với các phiên bản mới của Dagger2(2.11 - 2.17) cũng như ButterKnife(8.7 - 8.8).
* **Kotlin** branches cũng có sẵn: [[master-kotlin](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/67)], [[master-support-kotlin](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/68)]
* Đã cập nhật cho **Android Studio 3.2.0 canary 5** (từ 2.3.3).
## Before we begin…
Bài viết này giả định rằng bạn đã đọc [phần 1](https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-1-eb0f6b970fd) và [[phần 2](https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-2-6eaf60965df7)] của chuỗi 3 bài này. Bạn vẫn nên theo dõi bài viết này, và có thể tìm thấy sự hữu ích của nó, mà không phải đọc các phần trước đó. Tuy nhiên, nó được khuyến nghị rằng bạn nên [đọc phần 1](https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-1-eb0f6b970fd) và [[phần 2](https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-2-6eaf60965df7)] trước.
## Companion GitHub project
Github project cho chuỗi bài viết này có tại: https://github.com/vestrel00/android-dagger-butterknife-mvp, cái được xây dựng đặc biệt cho hướng dẫn này. Mỗi phần của hướng dẫn tương ứng với một issue, cái được closed bằng một PR đơn và được gắn thẻ theo thời gian.

Nếu bạn là một nhà phát triển có kinh nghiệm làm việc với Dagger2 và ButterKnife, bạn có lẽ có thể bỏ qua bài viết này và khám phá [Github Project](https://github.com/vestrel00/android-dagger-butterknife-mvp).

Bài viết này sẽ đi theo [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22C%3A+mvp%22)].

**Note**: Android-dagger-butterknife-mvp project là một cái nhỏ, được chuyển hóa từ một project lớn. Một mục đích chính của project này là giới thiệu/hướng dẫn một cách cụ thể từng phần về kiến trúc của một project lớn. Hãy xem project lớn, một ví dụ thế giới thực về làm thế nào để áp dụng Dagger Android (2.11 - 2.17), ButterKnife(8.7 - 8.8), Clean Architecture, MVP, MVVM, Kotlin, Java Swing, RxJava, RxAndroid, Retrofit2, Jackson, AutoValue, Yelp Fusion(v3) REST API, Google Maps API, monolithic repo project managerment with Gradle, JUnit4, AssertJ, Mockito2, Robolectric3, Espresso2, và Java best practices and design patterns.

https://github.com/vestrel00/business-search-app-java

## Restructuring the code to [Model-View-Presenter (MVP)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter) to increase testability, maintainability, and scalability. [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22C%3A+mvp%22)]
Với tất cả điều đó, giờ là thời điểm chúng ta đến với phần 3, cái được tách thành 8 bước:
1. Setting up the MVP framework. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/29)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.1-setup-mvp-framework)]
2. Moving the main activity start activity logic into a Navigator. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/31)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.2-refactor-main-activity-to-navigator)]
3. Refactoring main activity to MVP. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/32)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.3-refactor-main-activity-to-mvp)]
4. Refactoring example 1 to MVP. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/33)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.4-refactor-example-1-to-mvp)]
5. Refactoring example 2 to MVP. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/34)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.5-refactor-example-2-to-mvp)]
6. Refactoring example 3 to MVP. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/35)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.6-refactor-example-3-to-mvp)]
7. Refactoring utils to use new MVP modules. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/37)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.7-refactor-utils-to-use-new-mvp-modules)]
8. Cleaning up unused leftovers from MVP migration. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/38)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.8-cleanup-unused-leftovers-from-mvp-migration)]


### 1. Setting up the MVP framework. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/29)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.1-setup-mvp-framework)]
Ngay bây giờ chúng ta hãy hoàn thành quá trình thiết lập MVP framework của mình, pakage **ui.common** của chúng ta trông sẽ như bên dưới.

<br />
<div align="center"><img src="https://images.viblo.asia/baf7986b-9055-4c4f-bbe8-73ee1d56cb29.png" /></div>
<br />

Mục tiêu của chúng ta cho bước này là tạo các MVP interfaces mới và các base classes mà không phá vỡ hoặc thay đổi code hiện tại.

Có 3 lớp bị lặp đó sẽ được trình bày sau bước này đó là **BaseFragment**, **BaseFragmentModule**, và **BaseChildFragmentModule**. Ba lớp bị trùng này chính xác là giống nhau. Thực hiện này theo thứ tự nhằm di chuyển tới MVP trong một cách chi tiết và hợp thời trang. Các phần bị lặp trong **common.view** package sẽ không được sử dụng cho đến khi chúng ta refactor/migrate phần còn lại của ứng dụng nhằm sử dụng MVP fragmework mới của mình.

**Note**: Có một vài flavors/approaches khác nhằm triển khai môt hình MVP. Flavor thông thường/phổ biến nhất của MVP là Passive View cái là những gì chúng ta sẽ làm theo. Trong quá trình thích ứng với MVP của chúng ta, Fragment là View cái chứa tham chiếu tới một Presenter. View là "passive"(thụ động) bởi vì nó đơn giản chỉ thông báo tới Presenter về những sự kiện UI, cũng như clicks. Presenter sẽ hoạt độngt rên các UI events và thực hiện những tính toán logic, thông thường là tạo một lời gọi network nhằm lấy dữ liệu Models từ một REST API và rồi cập nhật view nhằm pho ra Model data.

Activity đơn giản tổ chức một hoặc nhiều Fragments cho quá trình truyền thông liên Fragments. Activity có thể lắng nghe các sự kiện trong Fragment để mà di chuyển tới các Activities thông thường khác bằng cách sử dụng một lớp **Navigator**.

Đầu tiên, tạo một **Presenter** interface và một quá trình triển khai trừu tượng (**BasePresenter**) cho lớp con bởi các presenters cụ thể.

```
public interface Presenter {

    /**
     * Starts the presentation. This should be called in the view's (Activity or Fragment)
     * onCreate() or onViewStatedRestored() method respectively.
     *
     * @param savedInstanceState the saved instance state that contains state saved in
     *                           {@link #onSaveInstanceState(Bundle)}
     */
    void onStart(@Nullable Bundle savedInstanceState);

    /**
     * Resumes the presentation. This should be called in the view's (Activity or Fragment)
     * onResume() method.
     */
    void onResume();

    /**
     * Pauses the presentation. This should be called in the view's Activity or Fragment)
     * onPause() method.
     */
    void onPause();

    /**
     * Save the state of the presentation (if any). This should be called in the view's
     * (Activity or Fragment) onSaveInstanceState().
     *
     * @param outState the out state to save instance state
     */
    void onSaveInstanceState(Bundle outState);

    /**
     * Ends the presentation. This should be called in the view's (Activity or Fragment)
     * onDestroy() or onDestroyView() method respectively.
     */
    void onEnd();
}
```

**Presenter** interface định nghĩa vòng đời của nó, cái ánh xạ tới các sự kiện vòng đời của Fragment giống như là các trạng thái trong Javadocs của mỗi interface method. Presenter thường xuyên sử dụng các sự kiện **onStart** và **onSaveInstanceState** để save/restore trạng thái sử dụng **Bundle**. Các sự kiện **onPause**, **onResume** và **onDestroy** là thường xuyên được sử dụng để tạm dừng, phục hồi, hoặc hủy bất cứ công việc nào đang được thực hiện trong một luồng tách riêng nhằm tránh leaks và crashes. Nhiều sự kiện vòng đời khác có thể là cần đối với từng project.

**Question**: **Presenter** nhìn rất giống một activity hoặc một fragment với vòng đời của nó. Do đó tại sao không có Activity hoặc Fragment triển khai Presenter?

Tiêu chí của MVP là Passive View(View thụ động). View được triển khai bởi Fragment. Bởi vì view là "passive", nghĩa là nó không chứa bất cứ logic nào, chúng ta có thể bỏ qua việc viết kiểm thử cho View(Fragment). Bởi vì chúng ta không thực hiện kiểm thử các Views của mình(Activities, Fragments hoặc chỉ Fragments trong trường hợp này). Chúng ta có thể từ bỏ việc sử dụng một Android Testing Framework đó là [Robolectric](http://robolectric.org/). Unit tests của chúng ta có thể chỉ còn lại [JUnit4](http://junit.org/junit4/) tests cùng với [Mockito](http://site.mockito.org/).

Chúng ta sẽ không giới thiệu unit testing ở trong bài viết này. Đó là một chủ đề tách biệt với chính nó cái mà rất nhiều người đã đụng vào.

**Question**: Tại sao tiền tố của các phương thức vòng đời là **on**? Ví dụ, tại sao không sử dụng **start** thay cho **onStart**?

Tôi chọn quy ước đặt tên đó cho các sự kiện vòng đời bởi tham chiếu. **Start** nghe như là một caller, View đang ra lệnh cho Presenter thực hiện cái gì đó. **OnStart** nghe như View chỉ thông báo cho Presenter rằng sự kiện start đã xảy ra hơn là đang ban hành một mệnh lệnh. Nó tuân theo nguyên tắc của MVP là View đơn giản chỉ thoongbaos các sự kiện UI cho presenter. Nó là chi tiết nhỏ, mà không quan trọng. Tuy nhiên các quy ước và mô hình(không quan trọng nhỏ như thế nào) nên tuân theo để duy trì sự thống nhất và khả năng dễ đọc của codebase.

Quy ước đặt tên tương tự được áp dụng cho các listeners. Listeners lắng nghe các sự kiện. Presenter là một listener cái lắng nghe các sự kiện của View.

**Question**: Chúng ta không thực hiện kiểm thử Acitivities của mình?

Không. Activities nên giữ không chứa logic nhất có thể. Bất cứ logic cái cần cư trú trong Activity nên được ủy thác cho một SOLID class(Một "presenter", "manager", hoặc "util"), cái rồi sẽ được kiểm thử.

Nếu bạn là một cựu binh MVP thì bạn có thể có một vài câu hỏi, bình luận, và/hoặc lo lắng về điểm này.

#### 1. Có các phương thức khác để lưu trữ dữ liệu/trạng thái thông qua quá trình tạo lại ngoài Bundle?

Đầu tiên, sự hạn chế cần để tạo ra giữa dữ liệu và trạng thái trước khi trả lời cho câu hỏi này nhằm tránh sự mơ hồ. Trạng thái là một loại dữ liệu cái diễn tả điều kiện hiện tại của một thể hiện thành phần của ứng dụng như là một Activity hoặc Fragment(vd: Scroll position). Dữ liệu, theo nghĩa rộng hơn, chứa thông tin cái được quản lý/hiển thị bởi ứng dụng liên quan đến trạng thái của thành phần(vd: người dùng hoặc thông tin nội dung).

Dữ liệu nên được lưu trữ trong một lớp/nguồn tách rời như là một [repository](https://msdn.microsoft.com/en-us/library/ff649690.aspx) nơi dữ liệu được lưu trữ trong bộ nhớ hoặc ổ đĩa và được lấy ra bất đồng bộ. Quá trình lưu trữ dữ liệu trong Bundle nên được tránh nếu có thể. Quá trình lưu trữ dữ liệu lớn thiết lập trong Bundle có thể có kết quả chậm hơn quá trình tạo lại Activity/Fragment bởi vì Bundle được lưu lại và nạp bất đồng bộ trong suốt quá trình tạo lại. Một kịch bản thông thường gọi một danh sách các đối tượng hiển thị trong một list/recycler view. Thay vì lưu danh sách các đối tượng trong Bundle, hãy để data repository lưu trữ nó. Repository cung cấp dữ liệu bất đồng bộ nếu dữ liệu không có trong cache(disk hoặc memory). Repository cung cấp dữ liệu bất đồng bộ sử dụng các phương thức callback tương tự như việc sử dụng trong caccs trường hợp bất đồng bộ được gọi trực tiếp nếu dữ liệu có trong cache.

**Note**: Source/Repository(Nguồn/Kho) dữ liệu trong trường hợp này có thể được triển khai với SQLite, OkHttp/Retrofit Cache, Firebase,....

State, mặt khác, cần được lưu trữ và nạp đồng bộ bởi vì nó thường xuyên liên quan tới UI cái được quản lý bởi Activity/Fragment. HƠn nữa, state cần được chỉ rõ cho Activity/Fragment trong lúc tạo lại. Điều này không đáp ứng một nguồn dữ liệu đơn từ khi trở thành một giải pháp phù hợp(Nó là giải pháp có thể nhưng không phù hợp). Các trạng thái lưu trữ cần có sẵn và được phục hồi trước khi pho UI cho người dùng. Có các cách thức khác nhau để lưu trữ/phục hồi trạng thái nhưng cách thức nào tốt hơn là sử dụng cái được cung cấp bởi chính OS? Tôi đang nói về Bundle ở đâu. Android sử dụng Bundle nhằm lưu trữ trạng thái trong **onSaveInstanceState** và phục hồi trạng thái trong **onRestoreInstanceState**(Bundle cũng sẵn có trong suốt các phương thức vòng đời như **onCreate**).

#### 2. Làm thế nào để duy trì các họat động ngầm của  Presenter?

Các hoạt động ngầm được quản lý bởi presenter cần được sống bên ngoài vòng đời của Presenter để cho nó sống sót trong các quá trình tạo lại. Có nhiều cách thức khác nhau để thực hiện điều này phụ thuộc vào framework được sử dụng cho các hoạt động ngầm.

Trong trường hợp của [RxJava](https://github.com/ReactiveX/RxJava), [Subjects](https://blog.mindorks.com/understanding-rxjava-subject-publish-replay-behavior-and-async-subject-224d663d452f) có thể được giữ bởi singleton repository đối với mỗi yêu cầu dữ liệu. Các Subjects sẽ được lưu trong một **Map&lt;K, V&gt;** nơi **K** là các String duy nhất cho các yêu cầu và **V** là thể hiện của Subject. Ví dụ, Presenter P(Cái sống trong một Fragment F) gọi phương thức lấy dữ liệu của Repository R. Repository R rồi tạo ra một **[ReplaySubject](http://reactivex.io/RxJava/javadoc/io/reactivex/subjects/ReplaySubject.html)**, cái là **Observer** O của Presenter P subscribes tới. Trước khi **ReplaySubject** hoàn thành, Fragment F đang trong quá trình tạo lại. Một thể hiện mới của Presenter P rồi được tạo trong một thể hiện Fragment mới và gọi phương thức lấy dữ liệu của Repository R một lần nữa. Repository R xác định rằng một **ReplaySubject** đã tồn tại(Có thể nó không hoàn thiện, hoặc hoàn thiện) và sử dụng cùng subject đó cho một thể hiện mới của **Observer** O của Presenter nhằm đăng kí(subscribe) tới. Ngay sau khi phương thức **onComplete** của Observer O được gọi, **ReplaySubject** của Repository R rồi được tham chiếu lại(xóa khỏi Map<K, V>). Tôi bỏ qua một vài chi tiết khác nhằm giữ cho nó đơn giản nhưng đó là những thứ cơ bản nhất của nó.

Cấu trúc/quy trình tương tự có thể được sử dụng trong trường hợp của AsyncTask. **AsyncTask** sẽ được sử dụng thay thế cho Subjects và callback interfaces sẽ được sử dụng thay cho Observers.

#### 3. Presenter không nên là sự bất khả thi của framework hay không? Rồi tại sao Bundle và @Nullable của Android được sử dụng ở đây?

Đầu tiên, hãy tìm ra tại sao Presenter nên là framework-agnostic(khung-bất khả thi). Đó là Presenter không nên chứa các tham chiếu tới các lớp cái đặc biệt từ framework(Trong trường hợp này là Android). Các Presenters cái chỉ chứa các lớp thuần java(Không phải các lớp của Android) được đảm bảo cho khả năng kiểm thử cái chỉ sử dụng JUnite và Mockito. Điều này cho phép bỏ qua việc sử dụng Robolectric. Điều này là quan trọng bởi vì các kiểm thử Robolectric là rất chậm so với chỉ cá kiểm thử JUnit đơn giản. Điều này là vì Robolectric phải mô phỏng một điểm đầu vào cảu môi trường Android.

**Note**: Một vài người có thể nghĩ rằng một vài lý do cho một Presenter trong agnostic-framework là tính tái sử dụng thông qua các framework khác nhau. Ví dụ, một Presenter được sử dụng trong một ứng dụng thuần Java sẽ được sử dụng trong một ứng dụng Android hoặc Swing Java. Tuy nhiên, trong thực tế, điều này thường xuyên không hoạt động bởi vì sự khác biệt giữa các framework(Và có thể là sự khác biệt giữa các ứng dụng). Cố gắng ánh xạ vòng đời của Swing Window cho vòng đời của Android Activity/Fragment. Nó có thể làm việc cho một vài trường hợp đơn giản nhưng nhiều hơn là điều rất khó.

Vấn đề chính yếu để hiểu được ở đây đó là không có một kịch bản tất cả hoặc không có gì. Trong ứng dụng MVP, Presenters được cho phép sử dụng 2 thực thể của Android là Bundle class và @Nullable annotation. Đồng thời các thực thể này của Android bắt buộc việc sử dụng Robolectric. Bundle có thể đơn giản được giả lập bằng việc sử dụng Mockito2, và @Nullable annotation không ảnh hướng tới tất cả các kiểm thử.

**Question**: Bundle là một final class do đó nó không thể được  giả lập bằng Mockito. [PowerMockito](https://github.com/powermock/powermock/wiki/Mockito) sẽ phải được sử dụng ở đây đúng ko?

Không. Mockito2 hỗ trợ quá trình giải lập các lớp/phương thức final.

**Note**: Tôi đã không kết tập một ví dụ thực tế về quá trình tạo lại trạng thái ở đây nhằm mục đích ngắn gọn. Để có thêm thông tin, đọc bình luận của tôi trong [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues/41#issuecomment-329583039)].

Nếu bạn thực sự muốn tạo những Presenters độc lập với các thực thể của Android thì bạn sẽ phải thay thế sự hỗ trợ **@Nullable** annotation của Android với một annotation tương tự gioogns như một cái từ Guava hoặc RxJava. Rồi trừu tượng hóa Bundle đằng sau một interface, cái sẽ được triển khai bởi mỗi framework nơi Presenter được sử dụng. Tuy nhiên, như tôi đã đề cập trước đó, tôi không thấy điểm đó được thực hiện bởi vì Presenter sẽ không được sử dụng thông qua các framework bằng bất cứ cách thức nào.

```
public abstract class BasePresenter<T extends MVPView> implements Presenter {

    protected final T view;

    protected BasePresenter(T view) {
        this.view = view;
    }

    @Override
    public void onStart(@Nullable Bundle savedInstanceState) {
    }

    @Override
    public void onResume() {
    }

    @Override
    public void onPause() {
    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
    }

    @Override
    public void onEnd() {
    }
}
```

**BasePresenter** là một lớp trừu tượng cái được triển khai bởi Presenter và được đưa cho một generic type T cái kế thừa **MVPView**. Lớp abstract này được thay thế bằng tất cả Presenters của chúng ta nhằm lấy được quyền truy cập tới **protected T view** cũng như tùy chọn từ chối triển khai lại tất cả các phương thức trong **Presenter** interface.

Tiếp theo, tạo **MVPView** interface và một abstract fragment cái triển khai **BaseViewFragment** nhằm cho các fragments khác kế thừa.

```
public interface MVPView {
}
```

**MVPView** không có gì nhưng một interface rỗng cái được sử dụng cho type safety và type resolution.

**Note**: Không có tên cho View bởi vì nó đụng tới android.view.View của Android, cái là lớp thông thường được sử dụng xuyên suốt các ứng dụng Android. Bằng cách tránh sự xung đột này chúng ta cũng tránh được sự nhầm lẫn.

```
public abstract class BaseViewFragment<T extends Presenter> extends BaseFragment
        implements MVPView {

    @Inject
    protected T presenter;

    @Override
    public void onViewStateRestored(Bundle savedInstanceState) {
        super.onViewStateRestored(savedInstanceState);
        // Only start the presenter when the views have been bound.
        // See BaseFragment.onViewStateRestored
        presenter.onStart(savedInstanceState);
    }

    @Override
    public void onResume() {
        super.onResume();
        presenter.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
        presenter.onPause();
    }

    @CallSuper
    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        presenter.onSaveInstanceState(outState);
    }

    @Override
    public void onDestroyView() {
        presenter.onEnd();
        super.onDestroyView();
    }
}
```

**BaseViewFragment** là một lớp con của **view.BaseFragment** và triển khai **MVPView** interface. Nó chứa một generic type T cái kế thừa một **Presenter**. **T presenter** được injected ở đây, do đó các phương thức vòng đời có thể được gọi. Cái này gửi đến các lớp con **T presenter** một cách độc lập và khoogn có gì phải lo lắng về việc gọi các phương thức vòng đời của Presenter.

**Question**: Tại sao có hai lớp base fragment khác nhau; **BaseFragment** và **BaseViewFragment**? Tại sao không kết hợp chúng lại thành một lớp base?

Một số Fragments, như là **MainFragment** của chúng ta, không chứa bất cứ logic nhằm đảm bảo một sự cần thiết cho Presnter. Logic-free Fragment kế thừa **BaseFragment** bởi vì chúng không cần có một Presenter-View cặp đôi. Đối với các fragments cái có logic và cần một presenter nhằm tổ chức xử lý logic, **BaseViewFragment** được sử dụng.

**Note**: Phương thức **Presenter.onStart** được gọi trong **onViewStateRestored** do đó các views của Fragment được gắn trước khi quá trình trình diễn bắt đầu. Điều này đảm bảo rằng không có NullPointException xảy ra nếu Presenter gọi một phương thức của **MVPView** cái sử dụng một view đã được bound.

Hơn nữa, Fragments cái trả về một null View trong **onCreateView** sẽ dẫn tới kết quả là phương thức **onViewStateRestored** không được gọi. Kết quả này dẫn đến **Presenter.onStart** không được gọi. Do đó, non-UI fragments không hỗ trợ việc ghép cặp Presenter-View. Chúng ta có thể chỉnh sửa mã nguồn của mình nhằm hỗ trợ Presenter-View ghép cặp với non-UI Fragments nếu cần. Tuy nhiên, tôi sẽ giữ lại các vấn đề này là bởi vì tôi không thấy nó phù hợp để có một Presenter-View ghép cặp với một non-UI Fragment.

Phải cần thận khi bắt đầu quá trình trình diễn trong **onViewStateRestored** thay vì trong **onViewCreated**. Những điều cần thận trọng này được thảo luận trong [phần 2](https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-2-6eaf60965df7), khi trả lời một câu hỏi khác: "Tại sao thực hiện quá trình binding trong **onViewStateRestored**?

Cuối cùng, chúng ta đơn giản paste một copy của **BaseFragment**, **BaseFragmentModule**, và **BaseChildFragmentModule** từ **ui.common** package tới **ui.common.view** package. Để nhắc lại, điều này được thực hiện để chia tách di chuyển tới MVP cho hợp thời hơn. Những thứ bị lặp trong **common.view** package sẽ không được sử dụng trừ khi chúng ta refactor/migrate phần còn lại của ứng dụng nhằm sử dụng MVP framework của mình.


### 2. Moving the main activity start activity logic into a Navigator. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/31)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.2-refactor-main-activity-to-navigator)]
**MainActivity** của chúng ta chưa một vài logic cái xử lý quá trình bắt đầu các activities khác. Chúng ta sẽ chuyển những logic này tới một lớp **Navigator** nhằm giữ cho activity của chúng ta độc lập về logic. Hơn nữa, chúng ta sẽ có thể tái sử dụng **Navigator** này trong các activities khác nhằm bắt đầu các activities khác thay vì việc viết lại mã nguồn start activities.

```
@Singleton
public final class Navigator {

    @Inject
    Navigator() {
    }

    public void toExample1(Context context) {
        Intent intent = new Intent(context, Example1Activity.class);
        context.startActivity(intent);
    }

    public void toExample2(Context context) {
        Intent intent = new Intent(context, Example2Activity.class);
        context.startActivity(intent);
    }

    public void toExample3(Context context) {
        Intent intent = new Intent(context, Example3Activity.class);
        context.startActivity(intent);
    }
}
```

**Navigator** là một **Singleton** cái chứa logic bắt đầu activity cái trước đó là trong **MainActivity** như nhìn thấy trong thiết lập thay đổi bên dưới.

<br />
<div align="center"><img src="https://images.viblo.asia/e1de3bb7-67c2-484d-afce-696b652d5940.png" /><br />Thay đổi trong MainActivity.java</div>
<br />

**MainActivity** giờ đây sử dụng đối tượng **Navigator** cái đã được injected trong **BaseActivity** giống như bên dưới.

<br />
<div align="center"><img src="https://images.viblo.asia/b8389f16-6453-447e-966e-19d85d7abfc0.png" /><br />BaseActivity.java</div>
<br />

**Question**: Điều gì xảy ra nếu Activity có nhiều tham số cái có thể được thêm vào **Intent**?

Đọc [lời giải thích](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues/13#issuecomment-330789328) này để có câu trả lời.

**Note**: Chúng ta giờ đây có thể giả lập và xác minh **Navigator** trong các kiếm thử của mình nếu cần. Activities và Fragments nên thụ động nhất có thể và bằng cách đó không cẩn phải kiểm thử. Tuy nhiên, giống như bất cứ nguyên tắc nào, thỉnh thoảng chúng ta phá vỡ nó(cho bất cứ lý do gì đó). Trong các trường hợp đó có logic xoay quanh việc start các activities trong một lớp Activity, chúng ta cũng sẽ có thể dễ dàng giả lập và xác minh các lời gọi start activity thông qua **Navigator**.


### 3. Refactoring main activity to MVP. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/32)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.3-refactor-main-activity-to-mvp)]
Bước này đơn giản liên quan đến quá trình di chuyển **MainFragment**, **MainFragmentListener**, và **MainFragmentModule** từ **ui.main** package tới **ui.main.view** package. Rồi **MainFragment** imports **ui.common.view.BaseFragment** thay cho **ui.common.BaseFragment**. Có bấy nhiêu thôi. Chúng ta đã chuyển đổi logic-free **MainFragment** của mình thành MVP.


### 4. Refactoring example 1 to MVP. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/33)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.4-refactor-example-1-to-mvp)]
Đầu tiên, tạo **Example1Presenter** interface và quá trình triển khai **Example1PresenterImpl** trong **ui.example_1.presenter** package và cung cấp nó trong **Example1PresenterModule**.

```
public interface Example1Presenter extends Presenter {
    void onDoSomething();
}
```

**Example1Presenter** kế thừa **Presenter** interface của chúng ta và định nghĩa một phương thức gọi là **onDoSomething()**, cái sẽ được gọi bởi **Example1Fragment** của chúng ta khi **do_something** button được clicked.

```
@PerFragment
final class Example1PresenterImpl extends BasePresenter<Example1View> implements Example1Presenter {

    private final SingletonUtil singletonUtil;
    private final PerActivityUtil perActivityUtil;
    private final PerFragmentUtil perFragmentUtil;

    @Inject
    Example1PresenterImpl(Example1View view, SingletonUtil singletonUtil,
                          PerActivityUtil perActivityUtil, PerFragmentUtil perFragmentUtil) {
        super(view);
        this.singletonUtil = singletonUtil;
        this.perActivityUtil = perActivityUtil;
        this.perFragmentUtil = perFragmentUtil;
    }

    @Override
    public void onDoSomething() {
        // Do something here. Maybe make an asynchronous call to fetch data...
        String something = singletonUtil.doSomething();
        something += "\n" + perActivityUtil.doSomething();
        something += "\n" + perFragmentUtil.doSomething();
        view.showSomething(something);
    }
}
```

**Example1PresenterImpl** triển khai **Example1Presenter** interface và kế thừa **BasePresenter** của chúng ta với View type của **Example1View**, cái sẽ được tạo sau. Lớp này có phạm vi là **@PerFragment** nhằm chỉ ra rằng chỉ một thể hiện của lớp này sẽ sẵn có trong suốt vòng đời của host fragment(**Example1Fragment**). Quá trình triển khai này được injected với các phần phụ thuộc được trình bày trong **Example1Fragment**, **SingletonUtil**, **PerActivity**, và **PerFragmentUtil**.

Phương thức **onDoSomething()** chứa mã nguồn chính xác giống như trình bày trong **Example1Fragment.onDoSomethingClicked()**. Phương thức **view.showSomething** thì được sử dụng nhằm phô ra String something.

**Note**: Chúng ta giờ đây có thể kiểm tra mã nguồn cùng với phương thức **onDoSomething()** bên ngoài một Fragment và đơn giản với một lớp Java đơn thuần. Hơn nữa, chúng ta sẽ có thể giảm thiểu số lượng dòng code trong **Example1Fragment** và giữ cho nó logic-free như là tất cả các Views nên thế.

```
@Module
public abstract class Example1PresenterModule {
    @Binds
    @PerFragment
    abstract Example1Presenter example1Presenter(Example1PresenterImpl example1PresenterImpl);
}
```

**Example1PresenterModule** provides/binds một thể hiện **@PerFragment** của **Example1Presenter** sử dụng **Example1PresenterImpl** của chúng ta.

**Note**: Chúng ta đang sử dụng **@Bind** annotation của Dagger nhằm cung cấp một interface với một thể hiện của một lớp cụ thể. Để có thêm thông tin giải thích sâu hơn về **@Bind** và **@Provides** annotaions, [đọc ở đây](https://medium.com/@vestrel00/giannis-tsironis-this-looks-like-the-same-issue-that-mohamed-alouane-posted-in-https-github-com-a2dbdc55be2c).

Tiếp theo, di chuyển **Example1Fragment** và **Example1FragmentModule** từ **ui.example_1** package tới **ui.example_1.view** package. Rồi tạo **Example1View** interface, cái được **Example1Fragment** triển khai.

```
public interface Example1View extends MVPView {
    void showSomething(String something);
}
```

**Example1View** kế thừa **MVPView** của chúng ta và định nghĩa một phương thức gọi là **showSomething**, cái được sử dụng bởi **Example1PresenterImpl** nhằm phô ra một đối tượng String.

Chúng ta rồi tiến hành nhằm tái cấu trúc **Example1Fragment** nhằm kế thừa **BaseViewFragment** và sử dụng **Example1Presenter**.

<br />
<div align="center"><img src="https://images.viblo.asia/b4731bd7-be5e-4055-9e30-ce9a79c643f7.png" /></div>
<br />

**Example1Fragment** bây giờ kế thức **BaseViewFragment&lt;Example1Presenter&gt;** và triển khai **Example1View**. **SingletonUtil**, **PerActivityUtil** vaf **PerFragmentUtil** được xóa bỏ. Phương thức **onDoSomethingClicked()** giờ đây đơn giản gọi **presenter.onDoSomething()**, nơi **Example1PresenterImpl** thực hiện logic và gọi phương thức **showSomething** của interface cái mà **Example1View** được triển khai ở đây.

Cuối cùng, **Example1FragmentModule** giờ đây thêm vào **Example1PresenterModule** và cung cấp **Example1Fragment** như là quá trình triền khai **@PerFragment** của **Example1View**.

<br />
<div align="center"><img src="https://images.viblo.asia/ae4b8736-1aaf-48d1-80a1-29f0fbc0a2a2.png" /></div>
<br />

**ui.example_1** package giờ trông như bên dưới.

<br />
<div align="center"><img src="https://images.viblo.asia/37520564-15c5-43d0-b8e9-e7082004977d.png" /></div>
<br />

Chỉ có bấy nhiêu thôi. Example1 của chúng ta giờ đây đúng theo ý tưởng của MVP.

**Question**: Tại sao đặt các thực thể của presenter và view trong các packages tách rời? Tại sao không đẩy tất cả các lớp View và Presenter vào cùng một package do đó các lớp khác nữa có thể được đóng gói riêng và được cung cấp sử dụng một Dagger module? Bởi vì có một qua hệ 1-1 giữa presenter và view, tại sao không định nghĩa hiệp ước giữa presenter và view trong cùng một class/interface?

Câu trả lời là tham chiếu. Tôi thích một cấp độ mở rộng hơn về mức chi tiết khi định nghĩa một cặp presenter-view. Hơn nữa, nó cắt ngắn những tính năng cực lớn thành một nửa. Nó cho phép tôi thấy cái lớp presenter nào được sử dụng trong view và ngược lại tạo ra các lớp pakacage riêng tư(private) cùng với một vài public. Hãy xem một ví dụ thực tế hơn, dễ hiểu hơn bên dưới.

<br />
<div align="center"><img src="https://images.viblo.asia/d42e29ac-29b8-4345-89fe-86472b3e99ea.png" /></div>
<br />

Trong image bên trên, chúng ta thấy rằng **BusinessListPresenter** là public bởi vì nó được tham chiếu trong **view** package. Chúng ta cũng thấy rằng **BusinessListView** là public bởi vì nó được tham chiếu trong **presenter** package. Phần còn lại của các lớp public là public cho mục đích dependency injection. Mọi thứ còn lại là package-private.

Đây là cấp độ mở rộng hơn của tính chi tiết là nghi vấn nhưng tôi thích nó. Bởi vì tất cả có nghĩa là, bạn có thể thoát khỏi các presenter/view packages và chỉ đẩy tất cả mọi thứ cùng tính năng vào một package. Cachsthuwcs đó chỉ một mình Dagger Module sẽ cần và rất nhiều lớp khác nữa sẽ là package-private. Hơn nữa, bạn có thể định nghĩa giao ước giữa Presenter-View trên cùng một class/interface thay vì tách rời ra.

Mọi người có thể đồng ý và ưu thích hơn nhằm đặt tất cả các lớp của một tính năng vào cùng một package(Thay cho việc có các presenter/view packages). Nếu tôi được lựa chọn cho một phương thức gần đúng nhất, tôi sẽ đi với sự đồng thuận chung.


### 5. Refactoring example 2 to MVP. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/34)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.5-refactor-example-2-to-mvp)]
Bước này được coi như tương tự với quá trình xử lý trong bước trước. Do đó, tôi sẽ bỏ qua việc giải thích các thay đổi trong bước này vì mục đích ngắn gọn. Đến cuối bước này, **ui.example_2** package sẽ trông giống như bên dưới.

<br />
<div align="center"><img src="https://images.viblo.asia/ee9ce4fb-66dd-4e1f-97a2-539d7fbc1bb9.png" /></div>
<br />

Bạn có thể xem lại toàn bộ thay đổi trong [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/34/files#diff-bdf78f657fdb3fee025cd5717fb24ead)].

### 6. Refactoring example 3 to MVP. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/35)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.6-refactor-example-3-to-mvp)]
Bước này được coi như tương đồng với quá trình xử lý trong bước trước. Do đó, tôi sẽ bỏ qua việc giải thích những thay đổi trong bước này cho ngắn gọn. Cho đến cuối bước này, **ui.example_3** package sẽ trông giống như bên dưới.

<br />
<div align="center"><img src="https://images.viblo.asia/e4a5d677-a3d7-4acd-ba1b-0f39b44ff4da.png" /></div>
<br />

Bạn có thể xem lại toàn bộ những thay đổi trong [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/35)].

### 7. Refactoring utils to use new MVP modules. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/37)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.7-refactor-utils-to-use-new-mvp-modules)]
Trong bước này, chúng ta đơn giản chi thay đổi quá trình import của **ui.common.BaseFragmentModule** thành **ui.common.view.BaseFragmentModule** trong **PerFragmentUtil**. Chúng ta cũng thay đổi việc import của **ui.common.BaseChildFragmentModule** thành **ui.common.view.BaseChildFragmentModule** trong **PerChildFragmentUtil**.


### 8. Cleaning up unused leftovers from MVP migration. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/38)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/c.8-cleanup-unused-leftovers-from-mvp-migration)]
Chúng ta hoàn thành việc xóa 3 lớp base fragment bị lặp cũ là: **ui.common.BaseFragment**, **ui.common.BaseFragmentModule**, và **ui.common.BaseChildFragmentModule**.

Giờ là lúc ăn mừng! Codebase của chúng ta giờ đã được di chuyển hoàn toàn tới MVP Passive View. Cheers!


## Conclusion
Trong phần này của chuỗi 3 phần, chúng ta đã tái cấu trúc mã nguồn của mình phù hợp với MVP nhằm tăng cường khả năng kiểm thử, bảo trì và mở rộng.

Tại thời điểm này, chúng ta đã hoàn thành xứ mệnh tìm ra câu trả lời cho câu hỏi lúc đầu của mình.

***How to create an Android application that uses Dagger Android (2.11-2.17), Butterknife (8.7-8.8), and Model-View-Presenter (MVP) with support for Singleton, Activity, Fragment, and child Fragment scopes?***

## Source
https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-3-ed5acf40eb19

## Reference
https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-1-eb0f6b970fd <br />
https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-2-6eaf60965df7