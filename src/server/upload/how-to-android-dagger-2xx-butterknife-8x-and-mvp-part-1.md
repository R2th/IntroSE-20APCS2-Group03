## Introduction
Chào mừng đến với hướng dẫn hoàn thiện nhằm làm cho Dagger.Android(2.11 - 2.17), ButterKnife(8.7 – 8.8), và Model-View-Presenter(MVP) hoạt động cùng nhau một cách hài hòa.

Đây là phần 1 trong chuỗi 3 phần: 
1.   Quá trình tạo một project, từ bộ khung, sử dụng Dagger.Android(2.11 -2.17) dependency injection framework mới với sự hỗ trợ cho các phạm vi(scopes) @Singleton, @PerActivity, @PerFragment, và @PerChildFragment. [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22A%3A+dagger.android%22)]
2.   Quá trình sử dụng ButterKnife(8.7 - 8.8) nhằm thay thế rất nhiều mã nguồn viết tay cho quá trình gắn view. [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22B%3A+butterknife%22)]
3.  Tái cấu trúc mã nguồn cho Model – View – Presenter(MVP) nhằm tăng cường khả năng kiểm thử, khả năng sửa chữa, và khả năng mở rộng. [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22C%3A+mvp%22)]

Link to Part 2, Part 3.

**UPDATES**

Bài viết này và Github Project cùng nó thỉnh thoảng được cập nhật và được tương thích với các versions mới nhất của Dagger2(2.11 - 2.17) và ButterKnife (8.7 - 8.8). 

Kotlin branches là sẵn có: [[master-kotlin](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/67)], [[master-support-kotlin](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/68)]

[Đã nâng cấp lên Android Studio 3.2.0 canary 5(từ 2.3.3)](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues/70).

## Before we begin...
Có một vài thứ cần làm rõ trước khi chúng ta bắt đầu. 

Đây là một hướng dẫn làm thế nào, không phải một bài học lịch sử. Bài viết này sẽ không trả lời các câu hỏi bên dưới: 
* Dagger2 là gì?
* Dagger khác Dagger2 như thế nào?
* Các thiết lập trhoong thường cho Dagger2 projects trước version 2.10 là gì?
* Có các dependency injection frameworks khác ngoài kia không?
* Dependency injection là gì?

Nếu bạn không biết câu trả lời cho bất cứ câu hỏi trên, thì Google nó. Các câu hỏi này đã sẵn sàng được trả lời rất nhiều lần trước đó bởi rất nhiều người khác nhau. Họ sẽ không được chỉ ra trong hướng dẫn này nhằm đảm bảo sự ngắn gọn.

Chỉ có câu hỏi tôi sẽ trả lời là: Dagger.Android cái được giới thiệu trong version 2.10 là gì? Dagger 2.10 đã giới thiệu Dagger.Android framework cái đơn giản hóa dependency injection một các tuyệt vời trong Android và nhận được rất nhiều mã nguồn mẫu dependency injection cái tồn tại từ những version trước.

**Tip**: Nếu bạn chưa biết, Dagger2 có thể được sử dụng thuần túy, ngoài Android, Java Projects/modules.

Bài viết này tập trung vào quá trình sử dụng Dagger2 2.11, cái chứa một vài lời gọi **@ContributesAndroidInjector** hữu ích(hơn các phiên bản trước).

Hướng dẫn người dùng chính thức của Google cho Dagger.Android có tại https://google.github.io/dagger/android.html. Tuy nhiên, hướng dẫn sử dụng có thể khó hiểu và thiếu đi một số ví dụ hữu ích. Có một vài blogs bên ngoài đã giới thiệu vaf Dagger.Android framework mới với một vài ví dụ nhằm đưa chân bạn nhúng chàm. Tuy nhiên, tôi vẫn chưa đọc được một bài viết cái cố gắng nhằm trả lời một các hoàn hảo câu hỏi bên dưới:

Làm thế nào để tạo một ứng dụng android cái sử dụng Dagger Android(2.11 – 2.17), ButterKnife(8.7 – 8.8), và Model-View-Presenter(MVP) với sự hỗ trợ cho Singleton, Activity, Fragment, và Child Fragment scopes?

Đọc bài viết này để tìm ra câu trả lời.

Bài hướng dẫn này là một hướng dẫn hoàn thiện với các đoạn mã nguồn và các giải thích. Do đó, nó khá là dài. Tuy nhiên, nó sẽ dạy bạn mọi thứ bạn cần để biết về một sự thiết lập hoàn hảo cho Dagger.Android, ButterKnife, và MVP. Như vậy kiếm một ít coffee(hoặc trà) và bắt đầu đọc thôi!

## Companion GitHub project

Github project cho chuỗi bài viết này có tại https://github.com/vestrel00/android-dagger-butterknife-mvp , cái được xây dựng một cách cụ thể hco bài viết này.
Mỗi phần của bài hướng dẫn tương ứng với một vấn đề, cái được đóng bởi một pull request(PR) riêng và được đánh dấu theo thứ tự thời gian.
Nếu bạn là một nhà phát triển có kinh nghiệm với Dagger2, bạn chắc chắn có thể bỏ qua việc đọc và khám phá bài viết này cũng như github project.

Bài hướng dẫn sẽ đi qua những nội dung bên dưới [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22A%3A+dagger.android%22)].

**Note**: The Android-Dagger-ButterKnife-MVP project là một phần nhỏ, bắt nguồn từ một project lớn hơn. Một trong những mục đích chính của project này là để trình bày/hướng dẫn một phần cụ thể về kiến trúc của những dự án lớn. Hãy xem một dự án lớn hơn ở bên dưới cho một ví dụ tốt hơn về thế giới thực về việc làm thế nào để áp dụng Dagger Android (2.11 – 2.17), ButterKnife(8.7 – 8.8), Clean Architecture, MVP, MVVM, Kotlin, Java Swing, RxJava, RxAndroid, Retrofit2, Jackson, AutoVale, Yelp Fusion (v3) REST API, Google Maps API, quản lý nguyên khối kho project với Gradle, Junit 4, AssertJ, Mockito2, Robolectric3, Espresso2, và các mô hình thiết kế, các kế hoạch thực hiện tốt nhất.

https://github.com/vestrel00/business-search-app-java

## A Gist overview
Đối với một cái nhìn khái quát nhanh về các sử dụng Dagger Android 2.11 với sự hỗ trợ cho **@Singleton**, **@PerActivity**, **@PerFragment**, và **@PerChildFragment** scopes, hãy xem tại gist chính này. Kiên nhẫn đọc hướng dẫn hoàn thiện với từng bước thiết lập và các giải thích chính xác. 

## Creating a project, from scratch, using the new dagger.android (2.11) framework
Với tất cả những điều ngoài con đường đi, đã đến lúc đi sâu vào phần một, cái được chia làm 9 bước: 
1.   Quá trình khởi tạo một Android Gradle project. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/18)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.1-initial-project-setup)]
2.   Quá trình thêm Dagger(2.11) dependency vào Gradle build script. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/19)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.2-add-dagger-dependency)]
3.   Quá trình thiết lập Dagger Injection framework. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/20)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.3-setup-dagger-injection-framework)]
4.   Quá trình tạo phạm vi cho các lớp tiện ích(utility classes). [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/21)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.4-create-scoped-utils)]
5.   Quá trình tạo activity chính để di chuyển tới các activities ví dụ khác. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/22)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.5-create-main-activity)]
6.   Quá trình tạo ví dụ 1; một activity với một Fragment. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/23)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.6-create-example-1)]
7.   Quá trình tạo ví dụ 2; một activity với hai Fragments. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/24)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.7-create-example-2)]
8.   Quá trình tạo ví dụ 3; một activity với một Fragment cái chứa một child Fragment. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/25)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.8-create-example-3)]
9.   Quá trình thiết lập lại cấu trúc các thành phần con nhằm sử dụng **@ContributesAndroidInjection** annotation. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/26)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.9-refactor-to-contributesandroidinjector)]

### 1. Initializing the Android Gradle project. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/18)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.1-initial-project-setup)]
Khởi tạo cấu trúc dự án được thiết lập như bên dưới:
<br />
<div align="center"><img src="https://images.viblo.asia/225d5f0f-de18-4426-8773-0455a61d2bcd.png"/></div>
<br />
Không có nhiều điều để nói về điểm này. Đây chỉ là xương sống dự án Android Gradle Project.

**Note**: hướng dẫn này đi qua thiết lập Dagger.Android, ButterKnife, và MVP cho các dự án với **minDSKVersion** 17. Quá trình hỗ trợ các API cấp thấp hơn 17, các đòi hỏi thấp nhất là 14 cho **AppCompatActivity**, hỗ trợ **Fragment**, và các **dagger.android.support APIs**.

Hãy xem [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/49)] này cho hướng dẫn quá trình dịch chuyển nhằm sử dụng sự hỗ trợ các APIs.Thiết lập hỗ trợ API muộn nhất là sẵn có trong [[master-support](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/master-support)] branch.

**Note**: Android Studio 2.3.3 đã được sử dụng ở thời gian viết các bài việt này. Từ 3/12/18, dự án đã được nâng lên Android Studio 3.2.0 canary 5.


### 2. Adding the Dagger (2.11) dependency to the Gradle build script. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/19)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.2-add-dagger-dependency)]
Thêm đoạn code bên dưới vào **app/build.gradle**.

```
dependencies {
    def daggerVersion = '2.11'

    annotationProcessor "com.google.dagger:dagger-compiler:$daggerVersion"
    annotationProcessor "com.google.dagger:dagger-android-processor:$daggerVersion"

    compile "com.google.dagger:dagger:$daggerVersion"
    compile "com.google.dagger:dagger-android:$daggerVersion"
}
```

**Note**: **annotationProcessor** đã được giới thiệu trong Android Gradle plugin phiên bản 2.2, cái thay thế cho các plugins của bên thứ bai bao gồm **apt/android-apt**.

### 3. Setting up the Dagger injection framework. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/20)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.3-setup-dagger-injection-framework)]
Luồng dependency injection được thiết lập như bên dưới:
1. Application injects Activities.
2. Activity injects Fragmens.
3. Fragment injects Child Fragments.

Các phần phụ thuộc được chia sẻ từ trên xuống dưới. Các activities được truy cập từ các phần phụ thuộc **@Singleton** Application. Fragment được truy cập từ các phần phụ thuộc Application **@Singleton** và Activity **@PerActivity**. Child fragments được truy cập từ các phần phụ thuộc Application **@Singleton**, Activity **@PerActivity**, và (parent) Fragment **@PerFragment**. 

**Note**: Hướng dẫn này không trình bài làm thế nào để inject Services, IntentServices, BroadcastReceivers, và ContentProviders nhằm giữ cho bài hướng dẫn có một kích thước hợp lý. Bạn đọc sẽ có thể dễ dàng tìm ra chúng cho mình một khi bạn hoàn thành quá trình đọc bài hướng dẫn này.

Để bắt đầu, hãy xem các loại [base framework types](https://google.github.io/dagger/android.html); [DaggerService](https://github.com/google/dagger/blob/dagger-2.11/java/dagger/android/DaggerService.java), [DaggerIntentService](https://github.com/google/dagger/blob/dagger-2.11/java/dagger/android/DaggerIntentService.java), [DaggerBroadcastReceiver](https://github.com/google/dagger/blob/dagger-2.11/java/dagger/android/DaggerBroadcastReceiver.java), và [DaggerContentProvider](https://github.com/google/dagger/blob/dagger-2.11/java/dagger/android/DaggerContentProvider.java).

Quá trình đạt được điều này là đơn giản.

Đầu tiên, tạo các annotations scope tùy biến: **@PerActivity**, **@PerFragment**, và **@PerChildFragment**.

```
@Scope
@Retention(RetentionPolicy.RUNTIME)
public @interface PerActivity {
}
```

**@PerActivity** scoping annotation chỉ ra rằng tuổi thọ của một dependency là giống với một Activity. Điều này được sử dụng để chú thích các dependencies cái được đối xử giống như một singleton cùng với tuổi thọ của một Activity, Fragment, và Child Fragment thay cho toàn bộ Application.

```
@Scope
@Retention(RetentionPolicy.RUNTIME)
public @interface PerFragment {
}
```

**@PerFragment** annotation tùy biến phạm vi chỉ ra rằng tuổi thọ của một dependency là tương đương với một Fragment. Điều này được sử dụng nhằm chú thích các dependencies cái được đối xử như một singleton cùng với tuổi thọ của một Fragment và Child Fragment thay vì phạm vi toàn cục Application, hoặc Activity.

```
@Scope
@Retention(RetentionPolicy.RUNTIME)
public @interface PerChildFragment {
}
```

Chú thích tùy biến phạm vị **@PerChildFragment** chỉ ra rằng tuổi thọ của một dependency là tương đương với tuổi thọ của child fragment(một fragment bên trong một fragment khác cái được thêm vào bằng các sử dụng **Fragment.getChildFragmentManager())**. Điều này được sử dụng nhằm chú thích các dependencies cái được đối xử như là một singleton cùng với tuổi thọ của một child fragment thay vì toàn bộ Application, Activity hoặc parent fragment.

**Note**: Thiết lập này không hỗ trợ một child fragment cùng với một child fragment bởi vì sự xung đột scopes sẽ xảy ra (compile time error). Các Child Fragments cùng với child fragments nên được tránh. Tuy nhiên, một cấp độ khác của child fragment là cần thiết thì một scope khác sẽ cần được tạo(cõ lẽ là chú thích tùy biến phạm vi **@PerGrandChild**).

Không có chú thích tùy biến phạm vi **@PerApplication**. **@Singleton** được sử dụng nhằm chỉ rõ tuổi thọ của một dependency là tương đương với Application.

**Question**: Tại sao không tạo chú thích tùy biến phạm vi **@PerApplication** thay cho việc sử dụng **@Singleton**?

Các libraries/dependencies của bên thứ bai sử dụng **@Singleton**, một khi họ sử dụng dependency injection. Nếu bạn sử dụng **@PerApplication** thay cho phạm vi chuẩn **@Singleton** thì Dagger sẽ không thể tự động inject các dependencies có phạm vi  **@Singleton**.

Tiếp theo tạo **App**, **AppModule**, và **AppComponent**, cái là điểm đầu vào của thiết lập dependency injection toàn cục.

```
public class App extends Application implements HasActivityInjector {

    @Inject
    DispatchingAndroidInjector<Activity> activityInjector;

    @Override
    public void onCreate() {
        super.onCreate();
        DaggerAppComponent.create().inject(this);
    }

    @Override
    public AndroidInjector<Activity> activityInjector() {
        return activityInjector;
    }
}
```

Điểm đầu vào của tất cả các dependency injection là **App**, cái triển khai **HasActivityInjector** mà cung cấp một dagger injected **DispatchingAndroidInjector/<Activity/>**. Điều này chỉ ra rằng các activities được tham gia trong dagger.android injection.

Cấp injection cao nhất xảy ra trong **onCreate** với **DaggerAppComponent.create().inject(this)**, cái là một lớp được sinh ra bởi Dagger trong thời điểm compile dựa trên **AppComponent**.

**Note**: The **App** có thể được kế thừa **DaggerApplication** thay vì quá trình triển khai **HasActivityInjector**. Tuy nhiên, sự kế thừa nên được tránh do đó lựa chọn kế thừa từ một cái gì đó trước kia là không hạn chế. Ví dụ, the **App** cần được kế thừa **MultiDexApplication**(multidex không phải là ví dụ tốt ở đây bởi vì application có thể cài đặt nó mà không phải kế thừa nó – Nó chỉ là một giả thuyết).

Loại DaggerApplication framework cơ bản chứa đựng nhiều code hơn cái chúng ta có, cái là không cần thiết trừ khí chúng ta cần inject một **Service**, **IntentService**, **BroadcastReceiver**, hoặc **ContentProvider** (đặc biệt là [ContentProvider](https://github.com/google/dagger/blob/dagger-2.11/java/dagger/android/DaggerApplication.java)). Trong trường hợp đó chúng ta cần inject các loại khác ngoài Activity và Fragment hoặc nếu bạn biết rằng **Application** của bạn không cần kế thừa một cái gì khác, thì nó có thể có giá trị để nó chỉ kế thừa **DaggerApplication** thay vì viết nhiều mã dagger hơn.

```
@Module(includes = AndroidInjectionModule.class)
abstract class AppModule {
}
```

The **AppModule** là một lớp abstract cái được chú thích với **@Module** annotation và bao gồm **AndroidInjectionModule**, cái chứa đựng quá trình dàng buộc nhằm đảm bảo sự hữu ích của các lớp dagger.android framework. **AppModule** hiện đang là rỗng nhưng chúng ta sẽ thêm vào một vài thứ cho nó sau đó.

```
@Singleton
@Component(modules = AppModule.class)
interface AppComponent {
    void inject(App app);
}
```

**AppComponent** được chú thích với **@Component** và **@Singleton** nhằm chỉ ra rằng các modules của nó(**AppModule**) là nhằm cung cấp phạm vi **@Singleton** hoặc các dependencies không có phạm vi.

Tiếp theo là tạo các lớp cơ sở nhằm sử dụng thông qua app; **BaseActivity**, **BaseActivityModule**, **BaseFragment**, **BaseFramgentModule**, và **BaseChildFragmentModule**.

```
public abstract class BaseActivity extends Activity implements HasFragmentInjector {

    @Inject
    @Named(BaseActivityModule.ACTIVITY_FRAGMENT_MANAGER)
    protected FragmentManager fragmentManager;

    @Inject
    DispatchingAndroidInjector<Fragment> fragmentInjector;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        AndroidInjection.inject(this);
        super.onCreate(savedInstanceState);
    }

    @Override
    public final AndroidInjector<Fragment> fragmentInjector() {
        return fragmentInjector;
    }

    protected final void addFragment(@IdRes int containerViewId, Fragment fragment) {
        fragmentManager.beginTransaction()
                .add(containerViewId, fragment)
                .commit();
    }
}
```

**BaseActivity** chứa mã nguồn dagger.android cái là rất giống với code trong **App**. Chỉ khác đó là **BaseActivity** triển khai **HasFragmentInjector**, quá trình đó chỉ ra rằng các fragments là để tham gia quá trình dagger.android injection.

**Note**: **BaseActivity** có thể kế thừa **DaggerActivity** thay vì triển khai **HasFragmentInjector**. Tuy nhiên, sự kế thừa nên được tránh do đó lựa chọn nhằm kế thừa thừ một cái khác sau đó là không hạn chế.

**Note**: Để hỗ trợ những người dùng Fragment và AppCompateActivity, xem xét tại đây [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/49)] để di chuyển hướng dẫn tới quá trình sử dụng support APIs. Thiết lập support API mới nhất là sẵn có trong [[master-support](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/master-support)] branch.

**Question**: Tại sao **FragmentManager** đã inject vào **BaseActivity**? Tại sao không chỉ sử dụng phương thức **getFragmentManager()**?

Câu trả lời ngắn gọn là cho phép dễ dàng giả lập và xác thực trong các tests. Đọc cái này [PR] cho một câu trả lời chi tiết hơn.

Quá trình Injection xảy ra trong **onCreate** trước khi gọi tới super.

Một **FragmentManager** được đặt tên **BaseActivityModule.ACTIVITY_FRAGMENT_MANAGER** cũng được injected. Cái tên là cần thiết ở đây nhằm tránh xung đột giữa **FragmentManager** của activity và **ChildFragmentManager** của Fragment trong quá trình injection.

**Note**: Chúng ta cũng có thể tạo **@Qualifier** tùy biến thay cho việc sử dụng **@Named** nhằm phân biệt giữa Activity và Fragment(child) **FragmentManager**. Tôi đã viết một một thảo luận dài về **@Qualifier** và **@Named** cũng như lợi ích/bất lợi của mỗi cái tại [đây](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/20/files).

Phương thức **addFragment** cung cấp các lớp con có thể nhằm thêm vào các fragments. Cái này hiện tại là không được sử dụng nhưng sẽ được sử dụng sau đó.

**Note**: Chú thích **@IdRes** cho **int containerViewID** là gì?

**@IdRes** là một phần của thư viện các Android support annotations cái “biểu thị rằng một tham số integer, field hoặc phương thức trả về giá trị được kì vọng là một tham chiếu id resource”. Đối với một danh sách đầy đủ của support annotations, click vào [đây](https://developer.android.com/reference/android/support/annotation/package-summary.html).

Android hỗ trợ annotations  library cùng cho Dagger  2.11  và ButterKnife 8.7  của chúng  ta.  Tuy  nhiên,  bạn nên  định  nghĩa  việc  hỗ  trợ  annotation library  này  như  là một  phần phụ  thuộc tách  rời.  Xem [official  documentation](https://developer.android.com/studio/write/annotations.html) để tìm hiểu  thêm.

```
@Module
public abstract class BaseActivityModule {

    static final String ACTIVITY_FRAGMENT_MANAGER = "BaseActivityModule.activityFragmentManager";

    @Binds
    @PerActivity
    abstract Context activityContext(Activity activity);

    @Provides
    @Named(ACTIVITY_FRAGMENT_MANAGER)
    @PerActivity
    static FragmentManager activityFragmentManager(Activity activity) {
        return activity.getFragmentManager();
    }
}
```

**BaseActivityModule** cung cấp các activity dependencies, activity context, và activity Fragment Manager được đặt tên là **ACTIVITY_FRAGMENT_MANAGER**. module của các lớp con của **BaseActivity** được yêu cầu thêm vào **BaseAcitivityModule** và cung cấp một quá trình triển khai cụ thể của Acitivity. Một ví dụ của điều này sẽ được trình bày sau.

**Question**: Tôi nhận được một **runtime error**, **IllegalStateException** module được thiết lập, sau khi tạo một vài chỉnh sửa cho project này. Làm thế nào để tôi sửa nó? **@Bind** là cái gì? Nó là khác biệt như thế nào với **@Provides**?

Hầu hết issue giống như thế này đó là bạn đang cố gắng sử dụng **@Provide** trên một non-static method của một abstract module. Đọc thêm về nó ở [đây](https://medium.com/@vestrel00/giannis-tsironis-this-looks-like-the-same-issue-that-mohamed-alouane-posted-in-https-github-com-a2dbdc55be2c). Trong bài viết đó, tôi cũng giải thích **@Bind** là cái gì và nó khác với **@Provides** như  thế nào.

**Note**: Phạm vi của Context **activityContext(Activity activity)** với **@PerAcitivity** là không liên quan bởi vì thể  hiện Activity sẽ luôn là duy nhất(Một thể hiện mới của nó sẽ không được khởi tạo trong bất cứ scope nào khác). Thông thường,  quá trình cung cấp **Application**, **Activity**, **Fragment**, **Service**,... không đòi hỏi các **scoped** annotation bởi vì chung là các thành phần đã được injected và thể hiện của chúng là duy nhất.

Điều tương tự cũng được áp dụng cho **static FragmentManager activityFragmentManager(Activity activity)**. Thể hiện của activity là duy nhất do đó FragmentManager của nó luôn được trả về với cùng Activity. Do đó **@PerActivity** là không cần thiết ở đây, như thể scope được hiểu ngầm là cho activity.

Tuy nhiên việc sử dụng scope annotation trong các trường hợp này làm cho module dễ  đọc. Chúng ta sẽ không thấy được cái gì được cung cấp cùng với thứ tự của nó nhằm hiểu được phạm vi  của  nó. Tôi chọn khả năng đọc hiểu và nhất quán ở [đây](http://. I choose readability and consitency)  dựa trên "[performance/optimization](https://github.com/google/dagger/issues/832#issuecomment-320510038)". Tôi đã đọc trên [DoubleCheck](https://github.com/google/dagger/blob/dagger-2.11/java/dagger/internal/DoubleCheck.java) wrapper xoay quanh phạm vi của các phần phụ thuộc và  [one time synchronization block](https://github.com/google/dagger/blob/dagger-2.11/java/dagger/internal/DoubleCheck.java#L44) của  nó. Tôi vẫn tuân thủ phát ngôn của mình là gửi đến những  tài liệu hỗ trợ bên dưới. Tôi  không  muốn lạc đề thêm nữa nhưng cái giá cho quá trình xử lý bất đồng bộ là cần thiết khi nhiều thread cố gắng truy cập vào cũng một  tài nguyên bị khóa trong cùng  một thời điểm. Hầu hết các dependencies injection được thiết lập để không phải chịu bồi thường cho các quá trình bất đồng bộ này  như thể quá trình injection thường xuyên xảy ra chỉ trên một thread.

```
public abstract class BaseFragment extends Fragment implements HasFragmentInjector {

    @Inject
    protected Context activityContext;

    // Note that this should not be used within a child fragment.
    @Inject
    @Named(BaseFragmentModule.CHILD_FRAGMENT_MANAGER)
    protected FragmentManager childFragmentManager;

    @Inject
    DispatchingAndroidInjector<Fragment> childFragmentInjector;

    @SuppressWarnings("deprecation")
    @Override
    public void onAttach(Activity activity) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            // Perform injection here for versions before M as onAttach(*Context*) did not yet exist
            // This fixes DaggerFragment issue: https://github.com/google/dagger/issues/777
            AndroidInjection.inject(this);
        }
        super.onAttach(activity);
    }

    @Override
    public void onAttach(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            // Perform injection here for M (API 23) due to deprecation of onAttach(*Activity*)
            AndroidInjection.inject(this);
        }
        super.onAttach(context);
    }

    @Override
    public final AndroidInjector<Fragment> fragmentInjector() {
        return childFragmentInjector;
    }

    protected final void addChildFragment(@IdRes int containerViewId, Fragment fragment) {
        childFragmentManager.beginTransaction()
                .add(containerViewId, fragment)
                .commit();
    }
}
```

**BaseFragment** giống như  **BaseActivity** triển khai **HasFragmentInjector** chỉ ra rằng các fragments con là để chia sẻ trong dagger.android injection.

**Note**: **BaseFragment** có thể kế thừa **DaggerFragment** một thể hiện của quá trình triển khai **HasFragmentInjector**. Tuy nhiên, quá trình kế thừa này nên tránh do đó lựa chọn nhằm kế thừa một các gì khác sau này  là một lựa chọn mở.

**Question**: **DialogFragments** thì sao? Làm thế nào để inject nó? Một vài người đã hỏi câu hỏi này ở [đây](https://medium.com/@gtsironis8/is-there-a-way-to-inject-dialogfragments-i-have-tried-to-do-this-the-way-a-simple-fragment-is-897d42777096). Và tôi đã trả  lời ở [đây](https://medium.com/@vestrel00/giannis-tsironis-injecting-dialogfragments-are-no-different-than-injecting-regular-or-support-270d8aa67622).

**Question**: Tại sao activity context và child FragmentManager được inject vào BaseFragment? Tại sao không chỉ sử dụng các phương thức getContext() và getChildFragmentManger() thay thế?

Câu trả lời ngắn gọn là để dễ dàng cho quá trình mocking và verification trong các kiểm thử. Đọc thêm cái [này](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/52) để có câu trả lời chi tiết.

Quá  trình  injection  xảy  ra trong onAttach  trước khi call  super.

**Note**: Chúng ta đặt **AndroidInjection.inject(this)** trong **onAttach(Context)** cho Android version M (API  level  23) trở lên và cũng như trong **onAttach(Activity)** cho Android version L (API level 22) trở xuống. Lý do đó là **onAttach(Context)** không được  dùng nữa từ API level 23. Việc không chỉ thực hiện injection trong **onAttach(Context)** là bởi vì nó sẽ không được gọi bởi các  thiết bị chạy Lollipop(API level  22)  trở xuống, cái sẽ gây ra một **NullPoinException** khi cố gắng truy cập các Fragment dependencies. Tôi có nghiên cứu về các thức khó khăn này. Hãy xem [bug](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues/46) này và các [fix](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/47).

Một vấn đề khác cần chú ý đó là sử dụng support fragment không đòi hỏi việc kiểm tra API level  bên trên. Chúng ta chỉ cần  gọi **AndroidSupportInjection.inject(this)** trong **onAttach(Context)** bởi vì support fragment được gọi trong **onAttach(Context)** ngay cả với API level 22 trở  xuống, điều này có nghĩa là mục tiêu đầu vào của support libs là để cho  có phiên bản thấp hơn của Android Code cái chỉ sẵn có  rong API levels cao hơn.

Hãy xem cái [này](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/49) cho hướng dẫn dịch chuyển nhằm sử dụng support APIs. Thiết lập cuối cùng của support API là  sẵn có trong [[master support](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/master-support)] branch.

Activity Context, cái được cung cấp bởi **BaseActivityModule**, được injected ở đây cũng như một **FragmentManager** được đặt tên là **BaseFragmentModule.CHILD_FRAGMENT_MANAGER**. Như chú thích trước đó trong **BaseActivity**, cái tên ở đây là cần thiết nhằm tránh nhầm lẫn giữa **FragmentManager** của activity, và **FragmentManager** của fragment con trong quá trình injection.

Phương thức addChildFragment có khả năng cung cấp các lớp con nhằm thêm các child fragments. Điều này hiện giờ là  không được sử dụng, nhưng sẽ được sử dụng về sau.

Child Fragments cũng kết thừa BaseFragment nhằm tránh hiện tượng lặp code, cái sẽ trở nên rõ ràng hơn khi tái cấu trúc thành kiến trúc MVP về sau. Sự đánh đổi đó là các fragments con phải truy cập tới **childFragmentManager** và **addChildFragment**, cái không nên được sử dụng bởi các child fragments trừ khi là con cháu của chúng được hỗ trợ(fragment  con của một fragment con). 

```
@Module
public abstract class BaseFragmentModule {

    public static final String FRAGMENT = "BaseFragmentModule.fragment";

    static final String CHILD_FRAGMENT_MANAGER = "BaseFragmentModule.childFragmentManager";

    @Provides
    @Named(CHILD_FRAGMENT_MANAGER)
    @PerFragment
    static FragmentManager childFragmentManager(@Named(FRAGMENT) Fragment fragment) {
        return fragment.getChildFragmentManager();
    }
}
```

**BaseFragmentModule** cung cấp các base fragment dependencies, xa hơn chỉ child FragmentManager được đặt tên là **CHILD_FRAGMENT_MANAGER**. Module của các lớp con của BaseFragment đòi hỏi phải thêm vào **BaseFragmentModule** và cung cấp một quá trình triển khai rõ ràng của Fragment có tên **FRAGMENT**. Một ví dụ về vấn đề này sẽ được trình bày  sau.

**Note**: Tương tự đối với các tên FragmentManager của BaseActivity, BaseFragment, một cái tên khác cho phần Fragment Dependency là cần thiết theo thứ tự nhằm xóa bỏ xự nhập nhằng về cái fragment được cung cấp trong một  child fragment.

Ví  dụ, chúng ta có parent fragment P và child fragment C. Parent Fragment P sẽ cung cấp fragment  tham chiếu sử dụng tên **BaseFragmentModule.FRAGMENT** ở nơi mà fragment con C sẽ cung cấp fragment tham chiếu sử dụng tên **BaseChildFragmentModule.CHILD_FRAGMENT**. 

Nếu nếu các phần fragments phụ thuộc paren/child mà không có tên duy nhất thì child fragment và các phần phụ thuộc của  nó sẽ không biết cái Fragment được cung cấp cho nó bởi vì tất cả các phần phụ thuộc đều có loại giống nhau là Fragment. Nó có thể là parent fragment hoặc child fragment. Do đó, sự nhập nhằng, cái gây ra một compile error "android.app.Fragment is bound  multiple  times".

**Note**: Phương thức Fragment.getChildFragment() chỉ sẵn có bắt đầu với API level 17. Việc hỗ trợ API level 17 trở xuống tới  14 đòi hỏi sử dụng AppCompatActivity, support Fragment, và dagger.android.supportAPIs.

Hãy xem hướng dẫn di chuyển này nhằm sử dụng support APIs. Thiết lập cuối của support APIs là sẵn có trong [[master-support](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/master-support)] branch.

```
@Module
public abstract class BaseChildFragmentModule {
  
    public static final String CHILD_FRAGMENT = "BaseChildFragmentModule.childFragment";
}
```

**BaseChildFragmentModule** cung cấp các phần phụ thuộc base child fragment. Module của các lớp con của  **BaseChildFragment** đòi hỏi phải thêm vào BaseChildFragmentModule và cung cấp một quá trình triển khai đầy đủ của Fragment được đặt tên là **CHILD_FRAGMENT**. Một ví dụ về vấn đề này sẽ được trình bày sau.

### 4. Creating scoped utility classes. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/21)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.4-create-scoped-utils)]
Để kiểm thử các scopes khác nhau này(**@Singleton**, **@PerActivity**, **@PerFragment**, và **@PerChildFragment**), chúng ta sẽ tạo một lớp utility cái được cung cấp cho quá trình sử dụng mỗi scope: SingletonUtil, PerActivityUtil, PerFragmentUtil, và PerChildFragmentUtil.

```
@Singleton
public final class SingletonUtil {

    @Inject
    SingletonUtil() {
    }
  
    public String doSomething() {
        return "SingletonUtil: " + hashCode();
    }
}
```

**SingletonUtil** được chú thích phạm vi với **@Singleton**. Điều này có nghĩa là Application, và tất cả các activities, fragments, và child fragments cũng như các phần phụ thuộc của nó sẽ chia sẻ cùng một thể hiện của lớp này.

Một mặc định, package-private constructor được cung cấp và đánh dấu với **@Inject** để tự động cung cấp một thể hiện của lớp này mà không phải tạo bằng tay một thể hiện mới của nó.

Phương thức **doSomething()** trả về **hashCode** của thể hiện. Điều này sẽ được sử dụng sau nhằm xác minh rằng cùng một thể hiện được sử dụng trong tất cả các acitivites, fragments, và child fragments.

**Question**: Chuyện gì xảy ra nếu tôi muốn **SingletonUtil** để giữ một tham chiếu tới Application/Application Context? Nói cách khác, làm thế nào để tôi cung cấp Application/Application Context từ các Singleton dependencies?

Tôi đã tạo một [[ISSUE](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues/42)] cho câu hỏi này và có một giải pháp được tìm thấy ở đây [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/44)]. Câu trả lời là sử dụng **@BindInstance** trong **AppComponent @Component.Builder** nhằm bind/provide thể hiện của Application.

**UPDATE**: một các tốt hơn nhằm cung cấp Application context đã được tìm thấy. Hãy xem tại [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/45#discussion_r131630787)]. Đây là phiên bản tăng cường sử dụng **AndroidInjectior&lt;App&gt;** và **AndroidInjector.Builder&lt;App&gt;** nhằm cung cấp phương thức **inject(App app)** và thể hiện của Application cho chúng ta thay vì việc tự viết nó như chúng ta đã làm khi sử dụng cách thức **@BindInstance**. Cách thức này là nhiều dòng hơn với **dagger.android.injection** giống như chúng ta sẽ thấy ở phần bên dưới đây của bài viết.

```
@PerActivity
public final class PerActivityUtil {

    private final Activity activity;

    @Inject
    PerActivityUtil(Activity activity) {
        this.activity = activity;
    }

    public String doSomething() {
        return "PerActivityUtil: " + hashCode() + ", Activity: " + activity.hashCode();
    }
}
```

**PerActivityUtil** là phạm vi đi cùng **@PerActivity**. Điều này có nghĩa là Activity đó và tất cả các Fragments, Child Fragments, và các phần phụ thuộc của nó sẽ được chia sẻ với cùng một thể hiện của lớp này. Tuy nhiên, các thể hiện khác của activity sẽ có các thể hiện của riêng nó. Điều này là không sẵn có ở cấp Application.

Phương thức **doSomething()** trả về hashcode của Activity và thể hiện của nó. Điều này sẽ được sử dụng sau nhằm xác minh rằng thể hiện tương đồng được sử dụng trong tất cả các Fragments, Child Fragments của mỗi Acitivity tuy nhiên mỗi Activity sẽ có thể hiện của riêng nó.

```
@PerFragment
public final class PerFragmentUtil {

    private final Fragment fragment;

    @Inject
    PerFragmentUtil(@Named(BaseFragmentModule.FRAGMENT) Fragment fragment) {
        this.fragment = fragment;
    }
  
    public String doSomething() {
        return "PerFragmentUtil: " + hashCode() + ", Fragment: " + fragment.hashCode();
    }
}
```

**PerFragmentUtil** là phạm vi đi cùng **@PerFragment**. Điều này có nghĩa là Fragment đó và thất cả các Fragment con cũng như các phần phụ thuộc của nó sẽ được chia sẻ cùng một thể hiện của lớp. Tuy nhiên, các thể hiện Fragment khác nhau sẽ có những thể hiện của riêng nó. Điều này là không có sẵn ở cấp Activity và Application.

**Note**: Chú ý rằng tên của Fragment trong Constructor là **BaseFragmentModule.FRAGMENT**. Cuộn lên trên để đọc một giải thích xoay quanh cái tên này.

Phương thức **doSomething()** trả về thể hiện và hashcode của Fragment. Cái này sẽ được sử dụng sau nhằm xác minh rằng thể hiện tương đồng được sử dụng trong tất cả các Child Fragments và mỗi (parent) Fragment mặc dù (parent) Fragment sẽ có thể hiện riêng của nó.

```
@PerChildFragment
public final class PerChildFragmentUtil {

    private final Fragment childFragment;

    @Inject
    PerChildFragmentUtil(@Named(BaseChildFragmentModule.CHILD_FRAGMENT) Fragment childFragment) {
        this.childFragment = childFragment;
    }

    public String doSomething() {
        return "PerChildFragmentUtil: " + hashCode()
                + ", child Fragment: " + childFragment.hashCode();
    }
}
```

**PerChildFragmentUtil** là phạm vi đi cùng với **@PerChildFragment**. Điều này có nghĩa là child Fragment đó(một fragment nằm bên trong một fragment cái được thêm vào sử dụng **Fragment.getChildFragmentManager()**) và tất cả các phần phụ thuộc của nó sẽ được chia sẻ cùng một thể hiện của lớp này. Tuy nhiên, các thể hiện của child fragment khác nhau sẽ có thể hiện của riêng nó. Điều này là không sẵn có ở cấp (parent) fragment, Activity, và Application.

**Note**: Chú ý rằng tên của Fragment trong constructor là **BaseChildFragmentModule.CHILD_FRAGMENT**. Cuộn lên trên để đọc một giải thích xoay quanh cái tên này.

Phương thức **doSomething()** trả về thể hiện, hashcode của Child Fragment. Cái này sẽ được sử dụng sau nhằm xác minh rằng không có thể hiện tương đồng được sử dụng trong các child fragments khác.


### 5. Creating the main activity to navigate to the other example activities. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/22)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.5-create-main-activity)]

Bây giờ chúng ta sẽ tạo một activity cái cung cấp một cách thức để di chuyển tới 3 activities ví dụ khác. **MainActivity** sẽ chứa một fragment, **MainFragment** cái chứa 3 buttons, 1 button cho một trong ba activities ví dụ. **MainActivity** đơn giản tổ chức **MainFragment** và lắng nghe sự kiện clicks của các button từ **MainFragment** thông qua một listener interface.

Đầu tiên, bắt đầu bằng cách tạo **MainFragment**, **MainFragmentListener**, **MainFragmentModule**, và **MainFragmentSubcomponent**.

```
public final class MainFragment extends BaseFragment implements View.OnClickListener {

    @Inject
    MainFragmentListener listener;

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.main_fragment, container, false);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // TODO (Butterknife) replace with butterknife view binding
        view.findViewById(R.id.example_1).setOnClickListener(this);
        view.findViewById(R.id.example_2).setOnClickListener(this);
        view.findViewById(R.id.example_3).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.example_1:
                onExample1Clicked();
                break;
            case R.id.example_2:
                onExample2Clicked();
                break;
            case R.id.example_3:
                onExample3Clicked();
                break;
            default:
                throw new IllegalArgumentException("Unhandled view " + v.getId());
        }
    }

    private void onExample1Clicked() {
        listener.onExample1Clicked();
    }

    private void onExample2Clicked() {
        listener.onExample2Clicked();
    }

    private void onExample3Clicked() {
        listener.onExample3Clicked();
    }
}
```

**MainFragment** kế thừa **BaseFragment** của chúng ta và lắng nghe các sự kiện clicks từ 3 buttons được định nghĩa trong **main_fragment** layout. Các phương thức **MainFragmentListener** được gọi tùy theo các sự kiện click.

Tại sao không chỉ đẩy layout của fragment này vào Activity của nó? Chúng ta có thể làm điều đó. Tuy nhiên, chúng ta sẽ thất bại ở khả năng sử dụng lại fragment này cùng với các fragments khác trong các activities khác nhau nếu chúng ta cần tới. Activity chỉ hoạt động giống như là người tổ chức cho một hoặc nhiều fragments nhằm quá trình truyền thông liên fragment. Tất cả các views và logic là trong các fragments. Điều này dẫn đến mã nguồn được tổ chức thành các module và kiến trúc có khả năng tái sử dụng giống như là một MVP architecture đơn giản, cái chúng ta sẽ thực hiện sau.

**Note**: Có rất nhiều view binding code ở đây. Tìm view trong **onViewCreated** nhằm thiết lập các click listeners cho chúng và thực hiện **View.OnClickListener** với một khối switch lớn. Tất cả mã nguồn sẽ trở đơn giản hơn rất nhiều sau khi sử dụng Butterknife.

```
interface MainFragmentListener {

    void onExample1Clicked();

    void onExample2Clicked();

    void onExample3Clicked();
}
```

**MainFragmentListener** đơn giản định nghĩa các phương thức cái được gọi khi các buttons được clicked.

```
@Module(includes = BaseFragmentModule.class)
abstract class MainFragmentModule {

    @Binds
    @Named(BaseFragmentModule.FRAGMENT)
    @PerFragment
    abstract Fragment fragment(MainFragment mainFragment);
}
```

**MainFragmentModule** kết tập **BaseFragmentModule** và cung cấp một fragment cụ thể, trong trường hợp này là **MainFragment**, theo thỏa thuận được chỉ ra trong **BaseFragmentModule**.

```
// TODO (ContributesAndroidInjector) remove this in favor of @ContributesAndroidInjector
@PerFragment
@Subcomponent(modules = MainFragmentModule.class)
public interface MainFragmentSubcomponent extends AndroidInjector<MainFragment> {

    @Subcomponent.Builder
    abstract class Builder extends AndroidInjector.Builder<MainFragment> {
    }
}
```

**MainFragmentSubcomponent** kế thừa **AndroidInjector&lt;MainFragment&gt;** và chỉ ra rằng **MainFragmentModule** được sử dụng để cung cấp các phần phụ thuộc của nó, và Builder đó xây dựng thể hiện của subcomponent cái sẽ inject các phần phụ thuộc đó vào **MainFragment**. Subcomponent được chú thích với **@PerFragment** chỉ ra rằng các modules cụ thể được cung cấp với phạm vị **@PerFragment** và các phần phụ thuộc không có phạm vi.

**MainFragmentSubcomponent** interface này được sử dụng bởi Dagger nhằm inject các phần phụ thuộc cho **MainFragment**. Chú ý rằng **Builder** thực ra là những thứ cơ bản nhất. Cái này sẽ để về sau nhằm sử dụng **@ContributesAndroidInjector** để tự động cung cấp các subcomponent injectors, bởi quá trình xóa bỏ những thứ cần để có các **@Subcomponent** classes.

**Note**: **Builder** là rỗng trong quá trình chúng ta sử dụng nó. Chúng thường được sử dụng khi có các phần phụ thuộc cái cần được inject lúc thực thi thay vì thời điểm biên dịch. Đọc [official user guide](https://google.github.io/dagger//users-guide.html#binding-instances) để tìm hiểu thêm.

Tiếp theo, tạo **MainActivity**, **MainActivityModule**, và **MainActivitySubcomponent**.

```
public final class MainActivity extends BaseActivity implements MainFragmentListener {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        if (savedInstanceState == null) {
            addFragment(R.id.fragment_container, new MainFragment());
        }
    }

    @Override
    public void onExample1Clicked() {
        // TODO start example 1 activity
        Toast.makeText(this, "Launch example 1", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onExample2Clicked() {
        // TODO start example 2 activity
        Toast.makeText(this, "Launch example 2", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onExample3Clicked() {
        // TODO start example 3 activity
        Toast.makeText(this, "Launch example 3", Toast.LENGTH_SHORT).show();
    }
}
```

**MainActivity** kế thừa **BaseActivity** của chúng ta và triển khai **MainFragmentListener** interface nơi một **Toast** được tạo ra cho mỗi lời gọi phương thức của interface. Chúng ta sẽ thay thế các toasts giữ chỗ này với code nhằm bắt đầu các activities của mình sau đây.

**MainFragment** được thêm vào **onCreate** bên trong **fragment_container**.

**Tip**:  Quá trình thêm các fragments cũng có thể được thực hiện hoàn toàn trong xml layout bằng cách định nghĩa fragment class sử dụng **&lt;fragment&gt;** tag.

```
@Module(includes = BaseActivityModule.class,
        subcomponents = MainFragmentSubcomponent.class)
abstract class MainActivityModule {

    // TODO (ContributesAndroidInjector) remove this in favor of @ContributesAndroidInjector
    @Binds
    @IntoMap
    @FragmentKey(MainFragment.class)
    abstract AndroidInjector.Factory<? extends Fragment>
    mainFragmentInjectorFactory(MainFragmentSubcomponent.Builder builder);

    @Binds
    @PerActivity
    abstract Activity activity(MainActivity mainActivity);

    @Binds
    @PerActivity
    abstract MainFragmentListener mainFragmentListener(MainActivity mainActivity);

}
```

**MainActivityModule** kết tập **BaseActivityModule** và chỉ ra rằng **MainFragmentSubComponent** là một subcomponent của module này(do đó truy cập được tới các phần phụ thuộc của activity này cũng như các phần phụ thuộc của Application.

Phương thức **mainFragmentInjectorFactory** được đưa vào trong **MainFragmentSubcomponent.Builder** và trả về **AndroidInjectorFactory**. Cái này cung cấp injector cho **MainFragment**.

Phương thức **activity** được đưa vào trong một activity cụ thể, trong trường hợp này là **MainActivity**, tuân theo thỏa thuận đã được chỉ ra trong **BaseActivityModule**.

**mainFragmentListener** được đặt vào trong **MainActivity**, cái triển khai **MainFragment** interface, và gắn nó vào trong **MainFragment** cái mong đợi một **MainFragmentListener** được injected.

```
// TODO (ContributesAndroidInjector) remove this in favor of @ContributesAndroidInjector
@PerActivity
@Subcomponent(modules = MainActivityModule.class)
public interface MainActivitySubcomponent extends AndroidInjector<MainActivity> {

    @Subcomponent.Builder
    abstract class Builder extends AndroidInjector.Builder<MainActivity> {
    }
}
```

**MainActivitySubcomponent** là khá tương đồng với cấu trúc trong **MainFragmentSubcomponent**. Nó kế thừa **AndroidInjector&lt;MainActivity&gt;** và chỉ ra rằng **MainActivityModule** được sử dụng để cung cấp các phần phụ thuộc của nó và Builder đó xây dựng thể hiện của subcomponent cái sẽ inject các phần phụ thuộc của chúng vào trong **MainActivity**. Subcomponent được chú thích với **@PerActivity**chỉ ra rằng cái đó chỉ rõ module cung cấp các phần phụ thuộc trong phạm vi **@PerActivity** và các phần phụ thuộc không có phạm vi.

Subcomponent này, cùng với tất cả các subcomponent khác được đề cập trước đó, sẽ được thay thế bởi **@ContributesAndroidInjector** về sau này cho ngắn gọn. Nếu bạn muốn thấy 

**Note**: Các vấn đề như thêm activity vào **AndroidManifest.xml**, tạo **main_activity.xml** và **main_fragment.xml** layouts,... đã được lược bỏ trong bài hướng dẫn này. Nếu bạn muốn hiểu các thứ bị loại bỏ này, thì hãy xem tại [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/22)]. Bạn cũng có thể đưa project vào một 
spin(vòng quay) tại trạng thái này bằng cách kiểm tra [[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.5-create-main-activity)]. Thông thường, mọi phần của bài viết có liên quan tới PR và TAG để bạn tiện sử dụng.

Tiếp theo, cập nhật **AppModule** để cung cấp injector cho **MainActivity**.

```
@Module(includes = AndroidInjectionModule.class,
        subcomponents = MainActivitySubcomponent.class)
abstract class AppModule {

    // TODO (ContributesAndroidInjector) remove this in favor of @ContributesAndroidInjector
    @Binds
    @IntoMap
    @ActivityKey(MainActivity.class)
    abstract AndroidInjector.Factory<? extends Activity>
    mainActivityInjectorFactory(MainActivitySubcomponent.Builder builder);
}
```

**mainActivityInjectorFactory** cung cấp injector cho **MainActivity**. **MainActivitySubcomponent** cũng được thêm vào như là một subcomponent trong trường **@Module subcomponets**.

**Question**: Tại sao không đẩy các injector vào trong một "**Builders**" module?

Tôi đã đọc một vài blogs cái trình bày dagger.android injection. Các blogs đó đặt injectors trong một module gọi là **[BuilderModule](https://github.com/Nimrodda/dagger-androidinjector/blob/master/app/src/main/java/org/codepond/daggersample/BuildersModule.java)**, cái được kết tập trong app module. Cái này chỉ hoạt động nếu các injectors đã cung cấp trong **BuildersModule** là tương đồng về phạm vi(ví dụ **@PerActivity**) hoặc không phạm vi.

Do đó, chúng ta đặt các injectors này trong những vị trí chính xác. Activity injectors trong **AppModule**, fragment injectors trong activity modules, và child fragment injectors trong các (parent) fragment modules.

Chạy ứng dụng và xem kết quả, cái hiển thị 3 buttons cái(về sau) sẽ khởi chạy các activities ví dụ.
<br />
<div align="center"><img src="https://images.viblo.asia/ed9097e9-0452-42b8-8fea-3b078a17aa7d.png" /></div>
<br />

### 6. Creating example 1; an Activity with 1 Fragment. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/23)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.6-create-example-1)]
Đối với ví dụ đầu tiên của chúng ta, tôi sẽ tọa một activity cái chứa một fragment đơn. Ví dụ này là rất giống với cái chúng ta đã làm với **MainActivity** và **MainFragment** do đó tôi sẽ chỉ giải thích các phần cái chưa được giải thích để cho ngắn gọn. **Example1Activity** tổ chức **Example1Fragment** cái được injected với phần phụ thuộc **SingletonUtil**, **PerActivityUtil**, và **PerFragmentUtil**. Các hash codes của mỗi đối tượng util được phô ra khi **do_something** button được clicked. Điều này sẽ cho phép chúng ta xác minh phạm vị của các dependencies đã được cung cấp và injected một cách chính xác.

Đầu tiên, bắt đầu bằng việc tạo **Example1Fragment**, **Example1FragmentModule**, **Example1FragmentSubcomponent**.

```
public final class Example1Fragment extends BaseFragment implements View.OnClickListener {

    @Inject
    SingletonUtil singletonUtil;

    @Inject
    PerActivityUtil perActivityUtil;

    @Inject
    PerFragmentUtil perFragmentUtil;

    private TextView someText;
    
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.example_1_fragment, container, false);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // TODO (Butterknife) replace with butterknife view binding
        someText = (TextView) view.findViewById(R.id.some_text);
        view.findViewById(R.id.do_something).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.do_something:
                onDoSomethingClicked();
                break;
            default:
                throw new IllegalArgumentException("Unhandled view " + v.getId());
        }
    }

    private void onDoSomethingClicked() {
        String something = singletonUtil.doSomething();
        something += "\n" + perActivityUtil.doSomething();
        something += "\n" + perFragmentUtil.doSomething();
        showSomething(something);
    }

    private void showSomething(String something) {
        someText.setText(something);
    }
}
```

**SingletonUtil**, **PerActivityUtil**, và **PerFragmentUtil** được injected và sử dụng trong phương thức **onDoSomethingClicked()**, cái nhận được lời gọi khi **do_something** button được clicked. Phương thức **doSomething()** của mỗi đối tượng util rồi được sử dụng nhằm ghép hash codes của các đối tượng **SingletonUtil**, **PerActivityUtil**, và **PerFragmentUtil** cũng như hash codes của activity và fragment. Các hash codes này rồi được hiển thị trong **someText TextView**.

**Example1FragmentModule** và **Example1FragmentCOmponent** là khá giống với **MainFragmentModule** và **MainFragmentComponent** do đó được loại bỏ trong bài viết này để cho ngắn gọn.

**Note**: Để nhắc lại, bạn có thể xem tại [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/23/files)] cho thay đổi toàn diện và kiểm tra [[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.6-create-example-1)] cho code hoàn thiện. Đây là lần nhắc lại điều này cuối cùng cho phần còn lại của bài viết.

Tiếp theo, tạo **Example1Activity**, **Example1ActivityModule**, và **Example1ActivitySubcomponent**.

```
public final class Example1Activity extends BaseActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.example_1_activity);

        if (savedInstanceState == null) {
            addFragment(R.id.fragment_container, new Example1Fragment());
        }
    }
}
```

**Example1Activity**, đơn giản tổ chức **Example1Fragment** như đã thấy ở bên trên.

**Example1ActivityModule** và **Example1ActivityComponent** là khá giống với **MainActivityModule** và **MainActivityComponent** do đó một lần nữa lại được loại bỏ trong bài viết này cho ngắn gọn.

Tiếp theo, cập nhật **AppModule** nhằm cung cấp injector cho **Example1Activity**

```
@Module(includes = AndroidInjectionModule.class,
        subcomponents = {
                MainActivitySubcomponent.class,
                Example1ActivitySubcomponent.class
        })
abstract class AppModule {

    ...
      
    // TODO (ContributesAndroidInjector) remove this in favor of @ContributesAndroidInjector
    @Binds
    @IntoMap
    @ActivityKey(Example1Activity.class)
    abstract AndroidInjector.Factory<? extends Activity>
    example1ActivityInjectorFactory(Example1ActivitySubcomponent.Builder builder);
}
```

Chạy example1 của ứng dụng để phô ra "Do Something" button. Click vào button pho ra hash codes của các đối tượng của chúng ta, activity và fragment.
<br />
<div align="center"><img src="https://images.viblo.asia/3048b56c-7ba5-4350-ac22-3964954fbdbe.png" /></div>
<br />

Không có nhiều điều để nói ở đây bên cạnh thực tế rằng ứng dụng đó làm việc đúng với kì vọng và các dependencies được injected đã làm việc. Hashcode của mỗi đối tượng là khác nhau, nhưng đó là đúng với kì vọng bởi vì chúng thuộc về các lớp khác nhau. Hash code của activity và fragment là khác nhau, dĩ nhiên.

**Note**: Quá trình sử dụng hash codes nhằm xác định định danh và tính duy nhất của đối tượng là đủ cho ứng dụng ví dụ nhỏ này. Bởi vì cái được nêu bởi **[Object.hashCode()](https://docs.oracle.com/javase/7/docs/api/java/lang/Object.html#hashCode%28%29)** javadoc, "Nhiều lý do thực tế, phương thức hashCode định nghĩa bởi Object class trả về các giá trị integer khác biệt cho các đối tượng khác biệt". Tuy nhiên, với số lượng objects đủ trong bộ nhớ(hàng ngàn), Có thể có hash codes bị xung đột. Xem [hashcode-uniqueness](https://stackoverflow.com/questions/1381060/hashcode-uniqueness).

Quan tâm hơn tới ví dụ, và cái mà chứng minh rằng quá trình injection các dependencies của chúng ta được thiết lập làm việc chính xác, sẽ được cung cấp trong ví dụ 2 và 3 do đó hãy tiếp tục đọc.


### 7. Creating example 2; an Activity with 2 Fragments. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/24)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.7-create-example-2)]
Đối với ví dụ thứ hai của chúng ta, chúng ta sẽ tạo một Activity cái chứa 2 fragments. Ví dụ này là rất giống với ví dụ trước. **Example2Activity** tổ chức **Example2AFragment** và **Example2BFragment** cái được injected đồng thời với các phần phụ thuộc **SingletonUtil**, **PerActivityUtil**, và **PerFragmentUtil**. Hash codes của mỗi đối tượng util được phô ra khi **do_something** button của mỗi fragment được clicked.

Đầu tiên, tạo hai Fragments( **Example2AFragment** và **Example2BFragment**) và các module, subcomponent liên quan của chúng. Rồi tạo **Example2Activity** cũng như module và subcomponent của nó.
<br />
<div><img scr="https://images.viblo.asia/8251ead0-3328-4460-836a-41bcc6b42f97.png" /></div>
<br />
**Question**: Tại sao không đặt các modules và subcomponents của Dagger trong một **di** package? Hoặc đẩy tất cả chúng vào một package gọi là **internal/di**?

Tôi đã thấy một vài project làm điều này, thâm chí tôi đã làm điều này. Nó làm cho tôi tự đặt cho mình câu hỏi nếu nó là cách làm chuẩn để thực hiện. Trong bất cứ trường hợp, chúng ta không đặt tất cả các modules và subcomponents của Dagger và cùng một package bởi vì rồi tất cả các dependencies đó phải được cung cấp thông qua application phải được public.

Việc đặt các modules và subcomponents trong cùng một package như là các dependencies chúng inject/provide cho phép tất cả các lớp trở thành package-private(gói đóng) làm tăng cường tính module hóa cho mỗi package. Nó cũng tạo cho bạn hình dung ra được các classes thuộc về package nào một cách có chiến lược và giúp bạn giữ được sự tập trung vào các package đó.

Activity và 2 fragments là khá giống với activity và fragment ở trong ví dụ đầu tiên. Ngoài class names, rất nhiều thứ ở đây được copy và paste từ ví dụ trước. Điều này được thực hiện với mục đích làm sáng sủa.

**Question**: Tại sao copy và paste code thay thế cho việc sử dụng một base class nhằm chia sẻ mã nguồn? Tại sao không đẩy mã nguồn fragment ví dụ có thể shared vào trong một base class?

Quá trình copying và pasting code chỉ được làm trong ví dụ này nhằm làm tăng tính rõ ràng bằng cách tạo mỗi ví dụ độc lập từ một cái khác. Bởi tất cả điều đó có nghĩa là bạn có thể đưa mã nguồn và tái cấu trúc lại được nó nếu bạn muốn. Hướng dẫn này chỉ vi phạm [nguyên tắc DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), vì lợi ích của người đọc.

```
public final class Example2Activity extends BaseActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.example_2_activity);

        if (savedInstanceState == null) {
            addFragment(R.id.fragment_a_container, new Example2AFragment());
            addFragment(R.id.fragment_b_container, new Example2BFragment());
        }
    }
}
```

**Example2Activity** tổ chức **Example2AFragment** và **Example2BFragment**.

```
@Module(includes = BaseActivityModule.class,
        subcomponents = {
                Example2AFragmentSubcomponent.class,
                Example2BFragmentSubcomponent.class
        })
abstract class Example2ActivityModule {

    // TODO (ContributesAndroidInjector) remove this in favor of @ContributesAndroidInjector
    @Binds
    @IntoMap
    @FragmentKey(Example2AFragment.class)
    abstract AndroidInjector.Factory<? extends Fragment>
    example2AFragmentInjectorFactory(Example2AFragmentSubcomponent.Builder builder);

    // TODO (ContributesAndroidInjector) remove this in favor of @ContributesAndroidInjector
    @Binds
    @IntoMap
    @FragmentKey(Example2BFragment.class)
    abstract AndroidInjector.Factory<? extends Fragment>
    example2BFragmentInjectorFactory(Example2BFragmentSubcomponent.Builder builder);

    @Binds
    @PerActivity
    abstract Activity activity(Example2Activity example2Activity);
}
```

**Example2ActivityModule** cung cấp các injectors cho 2 fragments cũng như quá trình triển khai đầy đủ của một Acitivity tuân thủ đúng thỏa thuận được chỉ ra trong **BaseActivityModule**.

Tiếp theo, chúng ta thêm **Example2Activity** injector vào **AppModule** của mình. Có khá nhiều sự tương đồng với ví dụ trước.

```
@Module(includes = AndroidInjectionModule.class,
        subcomponents = {
                MainActivitySubcomponent.class,
                Example1ActivitySubcomponent.class,
                Example2ActivitySubcomponent.class
        })
abstract class AppModule {

    ...

    // TODO (ContributesAndroidInjector) remove this in favor of @ContributesAndroidInjector
    @Binds
    @IntoMap
    @ActivityKey(Example2Activity.class)
    abstract AndroidInjector.Factory<? extends Activity>
    example2ActivityInjectorFactory(Example2ActivitySubcomponent.Builder builder);
}
```

Chạy Exapme 2 của ứng dụng để pho ra 2 fragments cùng chứ một "Do Something" button. Việc click vào các buttons pho ra hash codes của các util objects, activity, và fragments của chúng ta.
<br />
<div align="center"><img src="https://images.viblo.asia/69ba46ea-23ac-4ac9-8a4f-770a776ee4f8.png" /></div>
<br />

**SingletonUtil** được injected vào cả hai fragments là giống nhau( như đã nhìn thấy qua hash codes của chúng). Cả hai Fragments sống trong cùng một activity so đó chúng đồng thời có cùng **PerActivityUtil** và **Activity**. Bởi vì hai Fragments là khác nhau, **PerFragmentUtil** và Fragment Instances của chúng là khác nhau.

**Note**: Quá trình thêm vào các thể hiện khác nhau của cùng một lớp Fragment tới cùng activity sẽ hạn chế các thiết lập khác nhau của các **@PerFragment** dependencies cho thể hiện của Fragment.


### 8. Creating example 3; an Activity with 1 Fragment that contains 1 child Fragment. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/25)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.8-create-example-3)]
Đối với ví dụ thứ ba của chúng ta, chúng ta sẽ tạo một activity cái chứa một fragment, fragment đó chứa một child fragment. **Example3Activity** tổ chức **Example3ParrentFragment**, cái tổ chức **Example3ChildFragment**. Cả parent/child fragments được injected với các phần phụ thuộc **SingletonUtil**, **PerActivityUtil**, và **PerFragmentUtil**. **Example3ChildFragment**, ngoài ra cũng được injected với phần phụ thuộc **PerChildFragment**. Hash codes của mỗi đối tượng util được phô ra khi mỗi button **do_something** của mỗi fragment được clicked.

Đầu tiên, tạo đồng thời parent/child fragment và các modules, subcomponents liên quan. Rồi tạo activity và modules cũng như subcomponent của nó.
<br />
<div align="center"><img src="https://images.viblo.asia/addaf837-8fdd-44f7-b816-a345c746cf43.png" /></div>
<br />
Activity và hai fragments là khá giống với activity và fragment trong các ví dụ trước. Chỉ khác tên classes, rất nhiều thứ được copy/paste từ ví dụ trước. Tuy nhiên có một vài sự khác biệt.

```
public final class Example3ParentFragment extends BaseFragment implements View.OnClickListener {

    ...
      
    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        if (savedInstanceState == null) {
            addChildFragment(R.id.child_fragment_container, new Example3ChildFragment());
        }

        ...
    }
}
```

**Example3ParentFragment** thêm **Example3ChildFragment** như một fragment con.

```
@Module(includes = {
        BaseFragmentModule.class
},
        subcomponents = Example3ChildFragmentSubcomponent.class)
abstract class Example3ParentFragmentModule {

    // TODO (ContributesAndroidInjector) remove this in favor of @ContributesAndroidInjector
    @Binds
    @IntoMap
    @FragmentKey(Example3ChildFragment.class)
    abstract AndroidInjector.Factory<? extends Fragment>
    example3ChildFragmentInjectorFactory(Example3ChildFragmentSubcomponent.Builder builder);

    ...
}
```

**Example3ParentFragmentModule** cung cấp injector cho **Example3ChildFragment**.

```
public final class Example3ChildFragment extends BaseFragment implements View.OnClickListener {

    ...
      
    @Inject
    PerChildFragmentUtil perChildFragmentUtil;

    ...

    private void onDoSomethingClicked() {
        String something = singletonUtil.doSomething();
        something += "\n" + perActivityUtil.doSomething();
        something += "\n" + perFragmentUtil.doSomething();
        something += "\n" + perChildFragmentUtil.doSomething();
        showSomething(something);
    }
    
    ...
}
```

**Example3ChildFragment** được injected với một đối tượng **PerChildFragmentUtil**.

```
@Module(includes = {
        BaseChildFragmentModule.class,
})
abstract class Example3ChildFragmentModule {
    
    @Binds
    @Named(BaseChildFragmentModule.CHILD_FRAGMENT)
    @PerChildFragment
    abstract Fragment fragment(Example3ChildFragment example3ChildFragment);
}
```

**Example3ChildFragmentModule** cung cấp các phần phụ thuộc của nó sử dụng phạm vi **@PerChildFragment**.

```
// TODO (ContributesAndroidInjector) remove this in favor of @ContributesAndroidInjector
@PerChildFragment
@Subcomponent(modules = Example3ChildFragmentModule.class)
public interface Example3ChildFragmentSubcomponent extends AndroidInjector<Example3ChildFragment> {

    @Subcomponent.Builder
    abstract class Builder extends AndroidInjector.Builder<Example3ChildFragment> {
    }
}
```

**Example3ChildFragmentSubcomponent** được chú thích với phạm vi **@PerChildFragment** chỉ ra rằng modules của nó sẽ chỉ cung cấp các phần phụ thuộc với phạm vi **@PerChildFragment** hoặc các phần phụ thuộc không phạm vi.

```
@Module(includes = BaseActivityModule.class,
        subcomponents = Example3ParentFragmentSubcomponent.class)
abstract class Example3ActivityModule {

    // TODO (ContributesAndroidInjector) remove this in favor of @ContributesAndroidInjector
    @Binds
    @IntoMap
    @FragmentKey(Example3ParentFragment.class)
    abstract AndroidInjector.Factory<? extends Fragment>
    example3ParentFragmentInjectorFactory(Example3ParentFragmentSubcomponent.Builder builder);
}
```

**Example3ActivityModule** cung cấp injector cho **Example3ParentFragment**

```
@Module(includes = AndroidInjectionModule.class,
        subcomponents = {
                MainActivitySubcomponent.class,
                Example1ActivitySubcomponent.class,
                Example2ActivitySubcomponent.class,
                Example3ActivitySubcomponent.class
        })
abstract class AppModule {
    ...
    
    // TODO (ContributesAndroidInjector) remove this in favor of @ContributesAndroidInjector
    @Binds
    @IntoMap
    @ActivityKey(Example3Activity.class)
    abstract AndroidInjector.Factory<? extends Activity>
    example3ActivityInjectorFactory(Example3ActivitySubcomponent.Builder builder);
}
```

**AppModule** như thường lệ, cung cấp injector cho activity(**Example3Activity**).

Chạy example 3 của ứng dụng cái show ra parent/child fragments cái chứa một button "Do Something". Việc click vào các buttons pho ra hash codes của các đối tượng util, activity, parent fragment, child fragment của chúng ta.
<br />
<div align="center"><img src="https://images.viblo.asia/324eae5b-2d9d-473f-b7fd-857311470f41.png" /></div>
<br />
Tương tự như ví dụ trước, **SingletonUtil** được inject vào cả hai fragments là tương đồng(như nhìn thấy qua hash code của chúng). Cả hai fragments sống trong cùng activity do đó chúng cho cùng **PerActivityUtil**, và activity.

**PerFragmentUtil** và các thể hiện của fragments là tương tự nhau bởi vì child fragment sống cùng với Parent fragment. **PerChildFragmentUtil** chỉ sẵn có trong child fragment. Child Fragment có hash code khác với parent, dĩ nhiên.

Tại thời điểm này, chúng ta đã chứng minh rằng các thiết lập của mình đã làm việc.


### 9. Refactoring the subcomponent setup to use the **@ContributesAndroidInjector** annotation. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/26)|[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/a.9-refactor-to-contributesandroidinjector)]
Như đã đề cập từ trước, các Dagger Subcomponent của chúng ta là cần thiết và lặp lại khá nhiều, vi phạm [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Để khắc phục điều này, Dagger 2.11 đã cung cấp cho chúng ta **@ContributesAndroidInjector**, cái tự động sinh ra **@Subcomponent** cái mà nếu không có chúng ta phải tự viết. Điều này cho phép cung ta xóa tất cả các lớp Subcomponents của mình.

**Question**: Tại sao lại trình bày tất cả ưu điểm của **AndroidInjector**, **AndroidInjector.Factory**, **@Subcomponent** và **@Subcomponent.Builder**? Chúng ta không thể chỉ sử dụng **@ContributesAndroidInjector** trong tất cả các trường hợp?

Trong một vài trường hợp, chúng ta không thể sử dụng **@ContributesAndroidInjector**. Như các trường hợp kết tập nhiều lần khi bạn cần phải gắn một component instance sử dụng **@BindInstance** như thấy ở bên dưới. Bạn sẽ cần sử dụng **@Subcomponent.Builder** trong trường hợp này.
<br />
<div align="center"><img src="https://images.viblo.asia/015d2fc3-e61b-4fe6-b434-4557403b5a87.png" /></div>
<br />

Các phiên bản trong tương lai của Android Dagger có thể thêm vào các tính năng mở rộng như là điều này cho **@ContributesAndroidInjector** nhưng bởi vì hiện tại, các version 2.11-2.17 vẫn chưa hỗ trợ điều đó.

**Question**: Dứt khoát là khi nào chúng ta có thể sử dụng **@ContributesAndroidInjector**?

Đây là câu trả lời trong một [lời khuyên câu lệ nhỏ trong trang chính thức của Android Dagger](https://google.github.io/dagger/android.html).
<div align="left"><img src="https://images.viblo.asia/84b75f4d-6809-4910-9c6d-a69812d1441a.png" /></div>
<br />

Các ví dụ trong bài viết này phù hợp với tiêu chí nhằm sử dụng **@ContributesAndroidInjector**.

Chuyển thành **@ContributesAndroidInjector** được thực hiện dễ dàng trong 3 bước:

1. Thay **AndroidInjector.Factory** được sử dụng trong tất cả các modules với **@ContributesAndroidInjector**.
2. Xóa tất cả các subcomponent được kết tập vào mỗi module.
3. Xóa tất cả các lớp được chú thích với **@Subcomponent**.

Có rất nhiều những thay đổi giống nhau được thực hiện ở đây do đó sẽ không được trình bày tất cả mà chỉ trình bày làm thế nào để tái cấu trúc example 3 bởi ví nó sử dụng tất cả các scopes khác nhau. Bạn có thể xem lại phần thay đổi còn lại trong [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/26/files)].


Đầu tiên, thay thế **AndroidInjector.Factory** sử dụng trong tất cả các modules bằng **@ContributesAndroidInjector**.

<br />
<div align="center"><img src="https://images.viblo.asia/05264279-a584-4707-b559-14643685cd11.png" alt="AppModule" /><br />AppModule</div>
<div align="center"><img src="https://images.viblo.asia/296e69c1-0041-4c47-96fb-f125d401d6e1.png" alt="Example3ActivityModule" /><br />Example3ActivityModule</div>
<div align="center"><img src="https://images.viblo.asia/cd83266f-2157-4722-a010-0a5ad3811fd7.png" alt="Example3ParentFragmentModule" /><br />Example3ParentFragmentModule</div>
<br />

Chú ý làm thế nào để các scopes của các injectors và modules chúng kết tập bây giờ được cung cấp trong phương thức provides thay thế cho một subcomponent class.

Tiếp theo, xóa tất cả các kết tập **subcomponent** trong mọi module.


<div align="center"><img src="https://images.viblo.asia/551e6f76-d3cc-43b9-a41d-137b7d6e9aa1.png" /><br />AppModule.java</div>
<br />

Chú ý rằng chỉ **Example3ActivitySubcomponent** cần phải xóa bỏ trong ví dụ này.

<br />
<div align="center"><img src="https://images.viblo.asia/e386f0c4-2b07-454c-bfc5-60c2adc826cf.png" /><br />Example3ActivityModule</div>
<div align="center"><img src="https://images.viblo.asia/ffb94d10-5d05-4e44-8d30-4bc0aa6b3bab.png" /><br />Example3ActivityModule</div>
<br />

Cuối cùng, xóa tất cả các lớp được chú thích với **@Subcomponent**. Phần này đòi hỏi quá trình xóa **Example3ActivitySubcomponent**, **Example3ParentFragmentSubcomponent**, và **Example3ChildFragmentSubcomponent**.

Ví dụ 3, ở thời điểm này là không dài hơn quá trình sử dụng subcomponents. Một lần nữa bạn có thể xem phần còn lại của các thay đổi cho main activity, và các ví dụ khác trong [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/26/files)]


## Conclusion
Trong phần 3 của chuỗi bài viết này, chúng ta phải tạo một project, từ đầu, quá trình sử dụng Dagger.Android (2.11-2.17_ dependency injection framework mới với sự hỗ trợ các phạm vi(scopes) **@Singleton**, **@PerActivity**, **@PerFragment**, và **@PerChildFragment**. Nếu bạn đã sử dụng phiên bản trước của Dagger2, bạn nên xem làm thế nào giảm thiểu nhiều nhất mã nguồn Dagger cái liên quan tới những thiết lập mới này.

**Question**: Có một G[oogle sample ](https://github.com/googlesamples/android-architecture/tree/todo-mvp-dagger/)cho quá trình sử dụng Dagger.Android và MVP. Hướng dẫn này có một cấu trúc khác với Google sample.

Điều này hoàn toàn phụ thuộc vào bạn. Hướng dẫn này trình bày một kiến trúc khác sử dụng Dagger-Android, ButterKnife, và MVP. Cũng như với tất cả mọi thứ, không bao giờ có một cách để thực hiện. Lựa chọn một kiến trúc/Câu trúc cái đạt được những thứ bạn cần và một cái có ý nghĩa cho bạn và một cái thoải mái cho bạn. Tôi đề xuất bạn đọc hướng dẫn này một cách trọn vẹn. Tôi đã giải thích tốt nhất những dòng code của mình do đó mọi thứ trở nên có ý nghĩa, cái là cái gì đó có lẽ google sample không cung cấp.

Đọc [phần 2](https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-2-6eaf60965df7), để tìm hiểu làm thế nào để thay thế rất nhiều mã nguồn viết tay mẫu cho quá trình gắn view mà chúng ta đã viết bằng cách sử dụng ButterKnife(8.7-8.8).

Đọc [phần 3](https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-3-ed5acf40eb19), để tìm hiểu làm thế nào để tái cấu trúc mã nguồn của mình cho MVP architecture nhằm tăng cường khả năng kiểm thử, khả năng bảo trì và khả năng mở rộng.

## Source
https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-1-eb0f6b970fd

## Reference
https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-2-6eaf60965df7 <br />
https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-3-ed5acf40eb19