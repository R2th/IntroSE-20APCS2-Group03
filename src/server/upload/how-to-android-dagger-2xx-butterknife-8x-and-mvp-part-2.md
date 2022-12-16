## Introduction
Chào mừng đến với hướng dẫn hoàn thiện nhằm làm cho Dagger.Android(2.11-2.17), ButterKnife(8.7 - 8.8), và Model-View-Presenter hoạt động cùng với nhau một cách hòa hợp.

Đây là phần 2 của chuỗi 3 phần:

1. Tạo một project, từ đầu, sử dụng Dagger.Android (2.11 - 2.17) dependency injection(DI) framework mới hỗ trợ các phạm vị **@Singleton**, **@PerActivity**, **@PerFragment**, và **@PerChildFragment**. [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22A%3A+dagger.android%22)]
2. Sử dụng ButterKnife(8.7 - 8.8) nhằm thay thế rất nhiều mã nguồn viết tay cho quá trình view binding. [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22B%3A+butterknife%22)]
3. Tái cấu trúc mã nguồn cho Model-View-Presenter nhằm tăng cường khả nwang kiểm thử, khả năng bảo trì, và khả năng mở rộng. [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp/issues?q=is%3Aissue+is%3Aclosed+sort%3Acreated-asc+label%3A%22C%3A+mvp%22)]

**UPDATE**:
* Bài viết này và project đi kèm với nó thỉnh thoảng được cập nhật và làm cho tương thích với các phiên bản mới của Dagger2(2.11 - 2.17) cũng như ButterKnife(8.7 - 8.8).
* **Kotlin** branches cũng có sẵn: [[master-kotlin](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/67)], [[master-support-kotlin](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/68)]
* Đã cập nhật cho **Android Studio 3.2.0 canary 5** (từ 2.3.3).

## Before we begin...
Bài viết này giả định rằng bạn đã đọc [phần 1](https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-1-eb0f6b970fd) của chuỗi 3 bài này. Bạn vẫn nên theo dõi bài viết này, và có thể tìm thấy sự hữu ích của nó, mà không phải đọc các phần trước đó. Tuy nhiên, nó được khuyến nghị rằng bạn nên [đọc phần 1](https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-1-eb0f6b970fd) trước.

## Companion GitHub project
Github project cho chuỗi bài viết này có tại: https://github.com/vestrel00/android-dagger-butterknife-mvp, cái được xây dựng đặc biệt cho hướng dẫn này. Mỗi phần của hướng dẫn tương ứng với một issue, cái được closed bằng một PR đơn và được gắn thẻ theo thời gian.

Nếu bạn là một nhà phát triển có kinh nghiệm làm việc với Dagger2 và ButterKnife, bạn có lẽ có thể bỏ qua bài viết này và khám phá [Github Project](https://github.com/vestrel00/android-dagger-butterknife-mvp).

Bài viết này sẽ đi theo [[ISSUES](https://github.com/vestrel00/android-dagger-butterknife-mvp)].

**Note**: Android-dagger-butterknife-mvp project là một cái nhỏ, được chuyển hóa từ một project lớn. Một mục đích chính của project này là giới thiệu/hướng dẫn một cách cụ thể từng phần về kiến trúc của một project lớn. Hãy xem project lớn, một ví dụ thế giới thực về làm thế nào để áp dụng Dagger Android (2.11 - 2.17), ButterKnife(8.7 - 8.8), Clean Architecture, MVP, MVVM, Kotlin, Java Swing, RxJava, RxAndroid, Retrofit2, Jackson, AutoValue, Yelp Fusion(v3) REST API, Google Maps API, monolithic repo project managerment with Gradle, JUnit4, AssertJ, Mockito2, Robolectric3, Espresso2, và Java best practices and design patterns.

https://github.com/vestrel00/business-search-app-java


## Using Butterknife (8.7) to replace a lot of handwritten boilerplate view binding code
Với tất cả những điều đó, giờ là thời gian đển di chuyển tới phần 2, cái được tách thành 2 bước:
1. Thêm ButterKnife (8.7) dependency vào Gradle build script [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/27)], [[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/b.1-add%E2%80%94butterknife-dependency)].
2. Chuyển qua ButterKnife view binding [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/28)], [[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/b.2-migrate-to-butterknife-view-binding)].

### 1. Adding ButterKnife (8.7) dependency to the Gradle build script [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/27)], [[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/b.1-add%E2%80%94butterknife-dependency)].
Thêm đoạn code bên dưới vào file **build.gradle** trong thư mục gốc của project.

```
dependencies {
    ...
    classpath "com.jakewharton:butterknife-gradle-plugin:8.7.0"
}
```

Sau đó thêm đoạn bên dưới vào file **app/build.gradle**.

```
dependencies {
    def butterKnifeVersion = '8.7.0'
    
    annotationProcessor "com.jakewharton:butterknife-compiler:$butterKnifeVersion"
    
    compile "com.jakewharton:butterknife:$butterKnifeVersion"
} 
```


### 2. Migrating to ButterKnife view binding. [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/28)], [[TAG](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/b.2-migrate-to-butterknife-view-binding)].
Giờ là thời gian xóa bỏ rất nhiều mã nguồn view binding cái chúng ta đã tạo trong các fragments của mình: **MainFragment**, **ExamplexxFragment**, ....

Đầu tiên, cập nhật lại **BaseFragment** với một vài mã nguồn ButterKnife nhằm thiết lập cho các fragments còn lại của chúng ta có khả năng view binding.

```
public abstract class BaseFragment extends Fragment implements HasFragmentInjector {
    ...
    @Nullable
    private Unbinder viewUnbinder;
  
    @SuppressWarnings("ConstantConditions")
    @Override
    public void onViewStateRestored(Bundle savedInstanceState) {
        super.onViewStateRestored(savedInstanceState);
        // No need to check if getView() is null because this lifecycle method will
        // not get called if the view returned in onCreateView, if any, is null.
        viewUnbinder = ButterKnife.bind(this, getView());
    }
    
    @Override
    public void onDestroyView() {
        // This lifecycle method still gets called even if onCreateView returns a null view.
        if (viewUnbinder != null) {
            viewUnbinder.unbind();
        }
        super.onDestroyView();
    }
    
    ...
}
```

Chúng ta đơn giản thêm mã nguồn bên trên vào **BaseFragment** của mình và đó chính là nó. Giờ đây, các Fragments còn lại của chúng ta có khả năng sử dụng sức mạnh của ButterKnife.

Quá trình view binding xảy ra trong **onViewStateRestored** với lời gọi **Butterknife.bind(this, view)**, cái sẽ gắn **BaseFragment** và các lớp con của nó với views, listeners, và resources(strings, colors, drawables, ...) lấy được từ view và cung cấp bởi **getView()**. Phương thức **Butterknife.bind()** trả về tham chiếu tới một đối tượng **Unbinder**, cái chúng ta sẽ sử dụng nhằm **unbind()** các views của mình trong **onDestroyView()**. Quá trình unbind các views thiết lập các tham chiếu tới views thành null. Điều này là hữu ích nhằm tránh leak views trong các fragments bởi vì các fragments khác nhau có vòng đời các views khác với activities.

**Note**: Đối với toàn bộ hướng dẫn về Butterknife, đọc [hướng dẫn này](http://jakewharton.github.io/butterknife/).

Một vài Fragments có thể không cung cấp UI, cái giải thích tại sao chúng ta kiểm tra nếu view là null trước khi thực hiện qua trình binding.

**Question**: Tạo sao thực hiện quá trình binding ở **onViewStateRestored**?

Chúng ta bind views trong **onViewStateReStored** thay vì trong **onCreateView** hoặc **onViewCreated** do đó trạng thái view thay đổi các listeners không được tự động gọi mà không có tương tác người dùng. Nếu chúng ta bind trước phương thức này(ví dụ trong **onViewCreated**) thì bất cứ **onCheckedChangeListener**(cũng như các listeners khác) được bound bởi ButerKnife(hoặc không với ButterKnife) sẽ được gọi trong quá trình khởi tạo fragment(Bởi vì chính bản thân Android saves và restores trạng thái của các views), cái có thể hạn chế những hiệu ứng bên không cần thiết. Xem tại cái chính này cho một ví dụ cụ thể.

Thứ tự vòng đời hiện tại tuân theo(Tương tự nếu thêm vào qua xml hoặc java hoặc nếu duy trì thể hiện là true): **onAttach** => **onCreateView** => **onViewCreated** => **onActivityCreated** => **onViewStateRestored** => **onResume**. Chú ý rằng **onCreate**(và các sự kiện lifecycle khác) bị bỏ qua có chủ đích.

Thông báo trước cho cách thức này đó là các views, listeners, và resources đã bound bởi ButterKnife sẽ null cho đến khi **onViewStateRestored** được gọi. Tuy nhiên điều này sẽ không gây ra bất cứ vấn đề gì với trạng thái hiện tại của project cũng như khi chúng ta thực hiện tái cấu trúc MVP. Cần cẩn thận không sử dụng bất cứ đối tượng đã bound cái sử dụng ButterKnife trước **onViewStateRestored**. Một thông báo trước khác cho cách thức này đó là vị trí scroll của một ListView hoặc RecyclerView sẽ không được duy trì tự động. Lý do đó là list/recycler view adapter cần phải được thiết lập trong **onViewStateRestored**, cái xảy ra sau khi quá trình phục hồi vị trí đã được duy trì bởi OS. Vị trí scroll phải được save/restore bằng tay.

Không có cái gì sai với quá trình bind data vào các view ở **onViewStateRestored**. Quá trình chờ đợi cho đến khi **onViewStateRestored** nhằm bind dữ liệu và thực hiện các trình diễn logic khác có ưu điểm cái mà trạng thái của các views được có thể được hỏi trong suốt quá trình trình diễn. Nếu bạn cần bind các views của mình trước **onViewStateRestored**(như ở **onCreateView**, **onViewCreated**, và **onActivityCreated**) vì lý do gì đó thì hãy thực hiện điều đó. Cần cẩn thận với các side-effects(Cái bạn có thể phải sử dụng theo mục đích thiết kế).

**Note**: Các fragments cái trả về một null View trong **onCreateView** dẫn tới kết quả **onViewCreated** và **onViewStateRestored** không được gọi. Điền này có nghĩa rằng **Butterknife.bind** sẽ không được gọi, điều này là hoàn toàn đúng bởi vì không có view được bind. Thật kì lạ rằng, **onDestroyView** vẫn được gọi trong trường hợp này.

**Note** Phương thức trong vòng đời **onViewStateRestored** chỉ sẵn có bắt đầu với API level 17. Việc hỗ trợ các API levels dưới 17 xuống tới 14 đòi hỏi sử dụng AppCompatActivity, support Fragment, và các dagger.android.support APIs.

Xem tại [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/49)] nhằm chuyển tới việc sử dụng support APIs. Thiết lập support APIs mới nhất đã có trên [[master-support](https://github.com/vestrel00/android-dagger-butterknife-mvp/tree/master-support)] branch.

Tiếp theo, hãy xem các thay đổi trong MainFragment.

<br />
<div align="center"><img src="(https://images.viblo.asia/b220632f-0ba6-4e37-81c9-48fc4478cc17.png" /></div>
<br />
Ở đó có rất nhiều mã nguồn được xóa. **MainFragment** ngắn hơn triển khai **View.OnClickListener**. Quá trình thiết lập các click listeners cho 3 buttons trong **onViewCreated** đã được xóa. Phương thức **onClick** xấu xí với switch statement lớn đã được xóa đi. **OnClickListener** của 3 buttons giờ đây được thiết lập bằng cách sử dụng method annotation **@OnClick** của Butterknife.

**Note**: Cũng giống với Dagger2, các biến thành viên của lớp hoặc phương thức cái được chú thích với các annotations của Butterknife không thể là private.

Cuối cùng, hãy xem các thay đổi của **Example1Fragment**. Các thay đổi cho các fragments ví dụ khác chính xác là giống với những thay đổi trong **Example1Fragment** và do đó được cắt bỏ trong bài viết này cho ngắn gọn. Bạn có thể xem các thay đổi còn lại trong [[PR](https://github.com/vestrel00/android-dagger-butterknife-mvp/pull/28/files)].

<br />
<div align="center"><img src="https://images.viblo.asia/5bb5b0c3-fb68-496b-9936-d893fddbf412.png" /></div>
<br />

Các thay đổi tương tự xảy ra ở đây cũng như với **MainFragment**, cái là quá trình xóa bỏ mã nguồn click listener và sử dụng **@OnClick**. Thay đổi thêm ở đây là việc sử dụng **@BindView** nhằm bind **TextView someText**, cái thay thế cho mã nguồn **@view.findViewById** trong **onViewCreated**.


## Conclusion
Trong [phần 3 ](https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-3-ed5acf40eb19)của chuỗi bài viết, chúng ta sẽ thay thế rất nhiều mã nguồn view binding viết tay sử dụng ButterKinfe(8.7 - 8.8).

Di chuyển tới [phần 3 ](https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-3-ed5acf40eb19)để tìm thấy làm thế nào tái cấu trúc mã nguồn của mình cho Model-View-Presenter nhằm tăng cường khả năng kiểm thử, bảo trì và mở rộng.

Xem lại [phần 1](https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-1-eb0f6b970fd) để xem làm thế nào tạo một project từ đầu sử dụng framework mới Dagger.Android (2.11 - 2.17) dependency injection với việc hỗ trợ các phạm vi: **@Singleton**, **@PerActivity**, **@PerFragment**, và **@PerChildFragment**.

## Source
https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-2-6eaf60965df7

## Reference

https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-1-eb0f6b970fd <br />
https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-2-6eaf60965df7 <br />
https://proandroiddev.com/how-to-android-dagger-2-10-2-11-butterknife-mvp-part-3-ed5acf40eb19