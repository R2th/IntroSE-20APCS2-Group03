Có một số cách để kiểm tra một ứng dụng. Một trong những cách quan trọng nhất là tạo UI Tests. Các thử nghiệm này chạy trên thiết bị hoặc trình giả lập và tương tác với màn hình của ứng dụng của bạn, mô phỏng hành vi của người dùng và xác minh kết quả UI.

Mặc dù UI tests chậm và tốn kém, nhưng chúng rất quan trọng vì chúng giúp tránh kết quả không mong muốn hoặc trải nghiệm người dùng xấu bằng cách mô phỏng các tình huống người dùng có thể khác nhau.

Trong hướng dẫn này, bạn sẽ học cách sử dụng Kakao để viết các UI test. UI tests trên Android thường được viết bằng **Espresso**. **Kakao** một thư viện cung cấp một Domain Specific Language (DSL)  để viết các Espresso tests.
# Espresso
**Espresso** là một framework kiểm thử giao diện người dùng, có mã nguồn mở từ Google . Họ đã tạo ra nó để cung cấp API để tạo các UI test với các đặc điểm sau:
*  Small
*  Predictable
*  Easy to learn API


**Kakao** là một thư viện được xây dựng trên Espresso. Agoda, công ty đã tạo ra hơn một nghìn thử nghiệm tự động cho cơ sở mã của họ, đã phát triển nó khi họ nhận ra khả năng đọc mã của các thử nghiệm của họ khá thấp khi sử dụng Espresso. Họ đã phát triển thư viện này theo đuổi những lợi ích sau:
* Readability
* Reusability
* Extensible DSL
 # Getting Started
 Trong hướng dẫn, bạn sẽ làm việc với Công cụ Tìm kiếm, một ứng dụng cho phép người dùng tìm kiếm các công thức nấu ăn và yêu thích chúng.
 Để bắt đầu hãy tải ứng dụng Demo tại đây : [Project](https://koenig-media.raywenderlich.com/uploads/2019/03/ingredisearch-kakao-materials-2.zip)
 <br>Trước khi bạn có thể chạy ứng dụng, bạn cần một khóa API. <br>Ứng dụng này dựa trên API Food2Fork, yêu cầu khóa API. Để thiết lập điều này:
*  Nhận khóa API Food2Fork của bạn bằng cách tạo tài khoản: [Tại đây](https://www.food2fork.com/about/api)
*  Tạo một tệp keystore.properIES trong root project
<br>  ![](https://images.viblo.asia/c1fc1174-d447-467d-a44e-e66fc33798fd.png)
* Thêm nội dung sau vào tệp, đặt khóa API bạn vừa nhận được: ``FOOD2FORK_API_KEY = "API KEY "``

Nếu bạn đã đã cài đặt tất cả. Buid and run để làm quen với nó
![](https://images.viblo.asia/797333d0-77fb-4949-9ead-08db3f3a123b.png)

* MainActivity.kt: chứa màn hình chính.
* SearchActivity.kt: cho phép người dùng nhập thành phần.
* SearchResultsActivity.kt: tìm kiếm công thức nấu ăn bằng API và hiển thị kết quả. Nó cũng cung cấp khả năng thêm hoặc xóa yêu thích.
* RecipeActivity.kt: hiển thị chi tiết công thức.
* FavoritesActivity.kt: hiển thị danh sách yêu thích.
* RecipeRepository.kt: tương tác với API để tìm kiếm công thức nấu ăn. Nó cũng lưu trữ các mục yêu thích trong SharedPreferences.
* RecipeAdapter.kt là một adapter được sử dụng để hiển thị danh sách trong SearchResultsActivity và FavoritesActivity.


# Setup
Bạn cần đảm bảo rằng bạn có tất cả các dependencies và configurations của bạn đã sẵn sàng để bắt đầu testing . Mở build.gradle của ứng dụng và thêm các dependencies sau:


```kotlin
 androidTestImplementation 'androidx.test.espresso:espresso-core:3.1.1'
 androidTestImplementation 'androidx.test:runner:1.1.1'
 androidTestImplementation 'androidx.test:rules:1.1.1'
 androidTestImplementation 'com.agoda.kakao:kakao:2.0.0'
```
Đồng thời thêm dòng testInstrumentationRunner bên dưới vào cùng một tệp. Các dòng android và defaultConfig là để giúp bạn biết vị trí trong tệp để đặt dòng:
```kotlin
android {
  ...
  defaultConfig {
    ...
    testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
```

AndroidJUnitRunner là điểm khởi đầu để chạy toàn bộ bộ kiểm tra thiết bị. Nó kiểm soát môi trường thử nghiệm và APK thử nghiệm và khởi chạy tất cả các thử nghiệm được xác định trong gói androidTest của bạn.
 #  Creating UI Tests
 UI tests bao gồm các bước sau:

1. **Finding the view**: Đầu tiên, bạn sẽ tìm kiếm một view nơi bạn sẽ thực hiện các hành động hoặc xác minh trạng thái. Bạn sẽ sử dụng ViewMatchers cho việc này. Thông thường, bạn sẽ tìm thấy một view theo id của nó.
2. **Performing an action**: Sau khi tìm thấy chế độ xem, bạn sẽ thực hiện một số loại hành động trên đó như nhấp chuột hoặc cử chỉ. Đây là ViewActions. Bước này là tùy chọn và bạn chỉ cần nó nếu có một hành động bạn muốn thực hiện.
3. **Verifying**: Cuối cùng, bạn sẽ kiểm tra một cái gì đó trên màn hình. Ví dụ: bạn có thể kiểm tra xem nó có hiển thị hay không, đã thay đổi vị trí hoặc nếu văn bản hoặc màu thay đổi. Đây là ViewAssertions.

# Creating Your First UI Test
Test đầu tiên của bạn sẽ kiểm tra xem việc tìm kiếm với một văn bản trống sẽ hiển thị một Snackbar có thông báo lỗi.
Đầu tiên, thiết lập như sau. Tạo một class gọi là SearchUITests trong thư mục bạn vừa tạo. Sau đó, đặt class sau vào cùng một tệp phía trên lớp SearchUITests:
```kotlin
class SearchScreen : Screen<SearchScreen>() {
  val searchButton = KButton { withId(R.id.searchButton) }
  val snackbar = KView { 
    withId(com.google.android.material.R.id.snackbar_text) 
  }
}
```
Kakao yêu cầu một lớp kế thừa từ Screen. Trong `Screen` này, bạn thêm các `view` liên quan đến các tương tác của các test. Điều này có thể đại diện cho một phần hoặc toàn bộ giao diện người dùng.

Đoạn mã trên thiết lập `Screen` cho màn hình tìm kiếm. Trong bạn có tham chiếu đến nút tìm kiếm và chế độ xem Snackbar. Bạn tìm thấy cả hai với một ViewMatcher. Trong trường hợp này, bạn tìm thấy nút và Snackbar với id của họ.

Với thiết lập đó. Thay thế lớp SearchUITests bằng cách sau:
```kotlin
// 1
@LargeTest
class SearchUITests {

  // 2
  @Rule
  @JvmField
  var rule = ActivityTestRule(SearchActivity::class.java)

  // 3
  private val screen = SearchScreen()

  // 4
  @Test
  fun search_withEmptyText_shouldShowSnackbarError() {
    // 5
    screen {
      searchButton.click()
      snackbar.isDisplayed()
    }
  }
}
```

* `Annotates @LargeTest`. Điều này là không bắt buộc nhưng được khuyến nghị vì bạn có thể chạy một nhóm các thử nghiệm với chú thích này. Trong các thử nghiệm UI chức năng hệ sinh thái Android được coi là thử nghiệm lớn.
* `Annotates @Rule `và khởi tạo ActivityTestRule. Điều này khởi chạy các hoạt động trước khi chạy mỗi test. Khởi tạo màn hình nơi bạn sẽ thực hiện các hành động và xác minh.
* `Annotates @Test` để cho người chạy thử biết rằng phương thức này là thử nghiệm.
* Sử dụng đối tượng screen, thực hiện nhấp chuột, ViewAction, trên nút và xác minh rằng Snackbar hiển thị, ViewAsserts.

# Running the Test
Có nhiều cách để chạy thử nghiệm. Cách đơn giản nhất là nhấn nút Play :
![](https://images.viblo.asia/130fd883-a0f7-4b9b-bf68-0e37afc5a61c.png)
Bạn cũng có thể đặt con trỏ lên phương thức kiểm tra và sử dụng phím tắt: ^ + ⇧ + R  hoặc Control + Shift + R trên Windows.

Hoặc bạn có thể nhấp chuột phải vào tệp SearchUITests.kt trong chế độ xem project và chọn Chạy ‘SearchUITests.
![](https://images.viblo.asia/9fd56674-481f-4fbd-9ee5-ccfb6661d334.png)

Trong mọi trường hợp, bạn sẽ thấy một cửa sổ bật lên để chạy thử nghiệm trong thiết bị hoặc trình giả lập. Chọn một và bạn sẽ thấy nó khởi chạy SearchActivity, thực hiện nhấp chuột vào nút Tìm kiếm và hiển thị một Snackbar. Nếu bạn chớp mắt, bạn có thể bỏ lỡ nó!
![](https://images.viblo.asia/e09ccac8-36c3-4c50-b87a-5dac41306b66.png)

# Adding Other Tests
Trong bài test tiếp theo, bạn sẽ gõ một số văn bản, nhấp vào nút Tìm kiếm và xác minh Snackbar không hiển thị. Vì bây giờ bạn cần một tham chiếu đến chế độ xem thành phần, hãy thêm phần này vào class SearchScreen:
```kotlin
val ingredients = KEditText { withId(R.id.ingredients) }
```
Bây giờ thêm bài kiểm tra sau, bên dưới bài kiểm tra trước:
```kotlin
 @Test
  fun search_withText_shouldNotShowSnackbarError() {
    screen {
      ingredients.typeText("eggs, ham, cheese")
      searchButton.click()
      snackbar.doesNotExist()
    }
  }
```

Điều này trông khá giống với thử nghiệm trước đây chỉ với một vài điều nhỏ mới. Với Kakao dễ đọc như thế nào, có lẽ bạn đã biết những gì đang diễn ra! Các phần mới bạn sử dụng là:
1. `typeText()` to put some text in the input, a ViewAction.
2. `doesNotExist()` to make sure the Snackbar doesn’t show, a ViewAssertion.


# Verifying Intent Launch
Test tiếp theo bạn viết sẽ xác minh rằng màn hình kết quả sẽ mở sau khi tìm kiếm thành công. Để làm điều này, bạn sẽ kiểm tra ý định cho Intent

Để làm việc với ý định, bạn cần thêm phụ thuộc sau vào app ‣ build.gradle:
```kotlin
androidTestImplementation 'androidx.test.espresso:espresso-intents:3.1.1'
```
Khi thực hiện kiểm tra ý định, bạn cần sử dụng IntentsTestRule, vì vậy hãy thay thế dòng nơi bạn đã khởi tạo ActivityTestRule bằng cách sau:
```kotlin
@JvmField
var rule = IntentsTestRule(SearchActivity::class.java)
```

Bây giờ, thêm test sau vào lớp SearchUITests:
```kotlin
 @Test
  fun search_withText_shouldLaunchSearchResults() {
    screen {
      val query = "eggs, ham, cheese"
      // 1
      ingredients.typeText(query)
      searchButton.click()

      // 2
      val searchResultsIntent = KIntent {
        hasComponent(SearchResultsActivity::class.java.name)
        hasExtra("EXTRA_QUERY", query)
      }
      // 3
      searchResultsIntent.intended()
    }
  }
```

1. Nhập truy vấn vào thành phần EditText và nhấp vào nút Tìm kiếm.
1. Khởi tạo một KIntent sẽ xác minh nó một phiên bản SearchResultsActivity và có EXTRA tương ứng.
1. Cuối cùng, xác minh ý định khởi động.

# Nguồn
Bài viết được dịch theo bài : https://www.raywenderlich.com/1505688-ui-testing-with-kakao-tutorial-for-android-getting-started#toc-anchor-007

-----