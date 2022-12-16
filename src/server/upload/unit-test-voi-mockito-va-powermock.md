Trong bài viết này mình sẽ chia sẻ với mọi người cách để bắt đầu viết unit test cho Android project.  
Để đạt được mục đích đó chúng ta sẽ cùng nhau đi qua các bước sau nhé.
1. Cách viết testable code cho project của bạn.
2. Vài nét về Unit test và Intergration test 
3. Giới thiệu về Mockito & PowerMock
# I. Cách viết testable code.
Dưới đây là 1 vài lưu ý giúp bạn viết testable code:<br>
**1. Không nên khởi tạo Object cùng với logic ở cùng 1 class**: Trong project bạn nên tách biệt 2 phần khởi tạo và logic ra các class khác nhau: application và factories class. trong đó application sẽ đảm nhận các công việc liên quan tới xử lý logic còn factory class sẽ đảm nhận các công việc liên quan tới khởi tạo với toán tử new chẳng hạn. Nếu bạn khởi tạo object trong application code bạn sẽ không thể thay thế các instance đó bằng mock object bạn khởi tạo trong test class. Còn trong trường hợp bắt buộc bạn có thể cân nhắc sử dụng Abstract Factory. <br>
**2. Sử dụng Dependency Injection (DI)** : Bất cứ Object nào cần được sử dụng trong class bạn nên sử dụng DI để cung cấp nó cho class thông qua constructor. <br>
**3.  Không nên sử dụng global state, static property**: Khi bạn viết unit test bạn sẽ cần phải biết rõ hàm hoặc class đang được test có đầu vào là gì và đầu vào đó cần được mock từ unit test của bạn. Trong trường hợp method đang được test của bạn cần sử dụng biến global mutable cho cả application chẳng hạn bạn sẽ không biết được đầu vào của nó là gì và kết quả ra là gì. Cái này hoàn toàn khác với constant của application nhé đừng nhầm lẫn.<br>
# II. Tìm hiểu về Unit Test vs. Integration Test:
Khi chúng ta tạo 1 project mới với Android studio chúng ta sẽ thấy bên cạnh thư mục main (nơi chúng ta viết code cho project) còn có 2 thư mục khác gồm test và androidTest. <br>
![](https://images.viblo.asia/8cc30e0b-3208-4ae2-b7ac-8af38585f0e2.png)
* Thư mục test: <br>
Chuyên được sử dụng cho các class test khi chạy ko cần thiết bị máy ảo hoặc máy thật. JVM sẽ giúp chúng ta chạy các class test này. <br>
Nó được sử dụng để test 1 đoạn code nhỏ riêng biệt với các phần khác.<br>
Thời gian chạy nhanh<br>
Framework sử dụng: Mockito, Robolectric, PowerMock , ..
* Thư mục androidTest: <br>
Được chạy bằng máy thật hoặc máy ảo của android studio. <br>
Thường được sử dụng khi test sự kết hợp của các class qua lại với nhau và có sự tham gia của server hoặc database... <br>
Thời gian chạy lâu<br>
Framework sử dụng: Espresso


# III. Giới thiệu về unit test android
Bạn có thể tạo 1 class cho unit test như bình thường rồi edit config để run. Hoặc cách nhanh hơn bạn dùng phím tắt: Click vào tên class cần tạo unit test rồi ấn tổ hợp phím Ctrl + Shift + T => sẽ có 1 popup menu bạn chọn Create new test ... Sau đó bạn điền tên class + folder sao cho phù hợp với mục đích của class test. <br> 
Để viết unit test với sự hỗ trợ của các framework hiện nay thông thường chúng ta cần trải qua 3 bước:
* Bước 1 -  Arrange Xác định đoạn code cần viết unit test hay còn gọi là system under test (SUT), method under test hoặc class under test. Sau đó xác định các bước để config các behavior hoặc giá trị trả về cho các dependence <br>
* Bước 2 - Act : Gọi SUT để kiểm tra hành vi hoặc output <br>
* Bước 3 - Assert : Xác nhận kết quả hoạt động của SUT. <br>
Quá trình trải qua 3 bước trên được gọi tắt AAA. Unit test có thể xác nhận SUT pass hoặc fail dựa vào 2 yếu tố chính: state - based hoặc interaction - based. <br>
Đối với state - based: xác định kết quả trả về của SUT có như mong đợi hay không , còn với interaction - based dùng để xác định SUT có tương tác với các hàm nào đó như mong đợi hay không.<br><br>
Thông thường class hoặc method đang được test sẽ gọi tới các hàm hoặc các biến trong hoặc ngoài class nhưng Unit test lại là tập trung vào test các method riêng lẻ độc lập không liên quan tới các đoạn code bên ngoài chính vì vậy chúng ta cần bước Arrange. Bước này sẽ giúp chúng ta sắp đặt trước giá trị trả về cho các phương thức liên quan được gọi tới trong phương thức đang được test. Trong các tài liệu tiếng anh nó được gọi là stub method (một cụm từ rất khó hiểu :() <br>
**Tiếp theo chúng ta sẽ xây dựng unit test cho class DetailViewModel. Link github của project mình để ở cuối bài viết!**
# IV. Mockito
Mockito là Mocking framework, cung cấp cho bạn API viết test đơn giản, dễ dàng.  Giúp bạn test các hàm, class một cách riêng lẻ hay nói cách khác nó được sử dụng cho Unit test. <br>
## 1. Tích hợp Mockito:
Thêm các dòng code sau vào file build.gradle của bạn:
```
android {
  ...
  testOptions {
    unitTests.returnDefaultValues = true
  }
}
dependencies {
    ...
    // unit test for mockito & junit
    testImplementation 'android.arch.core:core-testing:1.1.1'
    androidTestImplementation 'androidx.test:core:1.2.0'
    testImplementation 'junit:junit:4.12'
    testImplementation 'org.mockito:mockito-core:2.8.9'
    ...
}
```
## 2. Mockito annotation
Thêm annotation `@RunWith(MockitoJUnitRunner.class)` vào trước tên class test. Bạn cũng có thể dùng cách khác thay thế cho Annotation này bằng cách thêm `MockitoAnnotations.initMocks(this);` vào trước hàm init(): 
    <br>Chú ý ở đây bạn sẽ thấy @Before: Đây là annotation cho method. Method đi với @Before sẽ được chạy đầu tiên trước tất cả các method với annotation @Test. 
```
@RunWith(MockitoJUnitRunner.class)
public class DetailViewModelTest {
        @Before
        public void init() {
            //MockitoAnnotations.initMocks(this); cách khác
        }
        ....
}
```
Đầu tiên chúng ta sẽ cùng nhau tìm hiểu cách tạo ra các đối tượng giả trong Mockito. Mockito có 4 loại annotation: @Mock, @Spy, @Captor, @InjectMock mỗi annotation sẽ phục vụ trong các trường hợp khác nhau. Các object được đi kèm với annotation này được gọi là **test doubles**. <br>
bạn có thể hiểu Test doubles là các object với vai trò thay thế cho object thực trong test (Nó giống như 1 diễn viên đóng thế trong bộ phim vậy). Để có thể test được các đoạn code nhỏ độc lập riêng biệt thì không thể vắng mặt của các mock object này được. Chúng ta sẽ tìm hiểu các annotation nào nên được sử dụng trong class DetailViewModel dưới đây <br>
```
public class DetailViewModel extends BaseViewModel {

    public static final String GET_DETAIL_MOVIE_FAILURE = "GET_DETAIL_MOVIE_FAILURE";

    private MovieRepository mMovieRepository;

    private MutableLiveData<MovieResponse>  movie = new MutableLiveData<>();

    private MutableLiveData<Boolean> loadDataStatus = new MutableLiveData<>();

    public DetailViewModel(final MovieRepository movieRepository) {
        mMovieRepository = movieRepository;
    }

    public void setMovieRepository(final MovieRepository movieRepository) {
        mMovieRepository = movieRepository;
    }

    public MutableLiveData<MovieResponse> getMovie() {
        return movie;
    }

    public void setMovie(final MovieResponse movie) {
        this.movie.postValue(movie);
    }

    public MutableLiveData<Boolean> getLoadDataStatus() {
        return loadDataStatus;
    }
    public void getDetailMovie(int id){
        subscribe(mMovieRepository.getDetail(id)
                .subscribeOn(Schedulers.newThread())
                .doOnSubscribe(disposable -> getLoadDataStatus().postValue(true))
                .doAfterTerminate(() -> getLoadDataStatus().postValue(false))
                .subscribe(response -> {
                    if (response.getStatus_code() == MovieResponse.STATUS_CODE_SUCCESS) {
                        setMovie(response);
                    } else {
                        EventBus.getDefault().post(new FetchDataStatus(GET_DETAIL_MOVIE_FAILURE));
                    }
                }, throwable -> handleError(throwable)));
    }
}
```
### 2.1. Mock annotation (@Mock)
Đây là annotation được sử dụng phổ biến nhất. Object đi với @Mockito chúng ta sẽ không cần init object đó Mockito sẽ thay chúng ta khởi tạo nó. 2 đoạn code dưới đây cùng khởi tạo 1 mock object như nhau bạn có thể chọn 1 trong 2: <br>
Cách 1:
```
public DetailViewModelTest {
   @Mock
    private MovieRepository mMovieRepository; // KHởi tạo mock object bằng @Mock
}
```
Cách 2:
```
@Test
public void test_getDetailMovie_success {
    MovieRepository mockObject = Mockito.mock(MovieRepository.class); // KHởi tạo Mock object bằng phương thức mock()
}
```
Khi nào chúng ta dùng @Mock: Tất cả các hàm trong Mock object khi được gọi sẽ do chúng ta quy định kết quả trả về thông qua các hàm do mockito cung cấp. Nếu bạn gọi tới hàm của Mock instance trước khi bạn định nghĩa giá trị trả về cho nó bạn sẽ luôn luôn chỉ nhận được giá trị mặc định của từng kiểu trả về (ví dụ như null với Object, false với boolean, 0 với int...) cho dù đầu vào bạn truyền vào cho hàm là gì đi nữa.<br><br>
Ví dụ như trong MovieRepository bạn có hàm:  
```
 public int add(int a, int b) {
        return a + b;
    }
```
Bạn vừa khỏi tạo nó là Mock object và bạn chạy hàm test: 
```
@Test
    public void test() {
        int value = mMovieRepository.add(1, 2);
        System.out.println("value: " + value);
    }
```
chúng ta sẽ được : 
![](https://images.viblo.asia/af0559ea-6462-46ff-8cd9-bf4aa9a5ef00.png)

Còn khi chúng ta định nghĩa trước kết quả trả về (stub) như thế này: 
```
@Test
    public void test2() {
        when(mMovieRepository.add(1, 2)).thenReturn(5); // stub trước giá trị trả về
        int value = mMovieRepository.add(1, 2);
        System.out.println("value: " + value);
    }
```
Chúng ta sẽ được kết quả: 
![](https://images.viblo.asia/572c9bcc-752c-4c72-8f83-40d70d07c244.png)
### 2.2. Spy annotation (@Spy) 
Trong trường hợp bạn sử dụng annotation Mock để tạo instance của 1 class nhưng trong class đó có vài hàm bạn muốn chạy thực thay vì phải định nghĩa trước giá trị trả về. Đây chính lúc bạn cần @Spy. @Spy còn được mô tả như partial mock:  bạn có thể hiểu như là object giả 1 phần. Đối với các hàm không được quy định trước hành vi hoặc giá trị trả về sẽ được gọi thực.
(Bạn có thể tham khảo thêm ở [link](https://stackoverflow.com/questions/14970516/use-mockito-to-mock-some-methods-but-not-others) này để hiểu hơn ví dụ của partial mock + hoàn cảnh sử dụng @Spy)
<br>
Chính vì nửa thực nửa giả nên spy object cũng khai báo khác với @Mock object! <br>
```
@Spy
    private DetailViewModel mDetailViewModel = new DetailViewModel(mMovieRepository);
```
### 2.3. InjectMock annotation (@InjectMock)
Được sử dụng để tạo instance của 1 object bằng cách sử dụng các mock object được tạo bởi @Mock hoặc @Spy. <br>
## 3. Cách Stub method (Arrange)
Mockito cung cấp cho chúng ta rất nhiều các method khác nhau giúp chúng ta định nghĩa hành vi, kết quả trả về cho các hàm liên quan. Dưới đây mình chỉ giới thiệu các phương thức hay được sử dụng bạn có thể tham khảo thêm tại [đây](https://static.javadoc.io/org.mockito/mockito-core/3.0.0/org/mockito/Mockito.html#when-T-)<br>
1. when(mockObject.methodName()).thenReturn(returnValue) <br>
Ví dụ: 
` Mockito.when(mMovieRepository.getDetail(123).thenReturn(Single.just(movieResponse));`
<br> Khi  bạn chạy hàm test và gọi `mDetailViewModel.getDetailMovie(123);` và đặt debug ở mMovieRepository.getDetail(123) bạn sẽ thấy giá trị trả về của nó là chính giá trị bạn định nghĩa trong thenReturn(returnValue). Cụ thể theo như dòng trên sẽ là movieResponse. <br> <br>
2. doReturn(returnValue).when(mockObject).methodName(param)
<br> Hàm này tương tự như hàm trên. <br><br>
3.  when(mockObject.methodName()).thenThrow(Exception class) <br>
`when(mockList.add("one")).thenThrow(IllegalStateException.class);` <br>
Trong trường hợp hàm đang test có thể có exception xảy ra và bạn muốn test với trường hợp đó bạn có thể sử dụng hàm trên để throw 1 cái nào đó ví dụ như IllegalStateException chẳng hạn.<br><br>
4. when(mockObject.methodName()).thenReturn(value).thenThow(Exception) <br>
Định nghĩa giá trị trả về cho các lần gọi liên tiếp: <br>
```
    when(listMock.add("one"))
        .thenReturn(false)
        .thenThrow(IllegalStateException.class);
    listMock.add("one");
    listMock.add("one"); // throw IllegalStateException
``` 
5. doNothing.when(mockObject).methodName(param)<br>
Giúp bạn định nghĩa hành vi cho hàm được gọi. Nó thường được sử dụng với hàm void. <br> <br>
Giờ chúng ta sẽ áp dụng các hàm trên đây để stub các method được gọi trong `getDetailMovie`:trong trường hợp lấy data thành công
```
    // khởi tạo trc các giá trị trả về cho các hàm liên quan
     MovieResponse movieResponse = new MovieResponse();
     movieResponse.setStatus_code(MovieResponse.STATUS_CODE_SUCCESS);
     FetchDataStatus status = new FetchDataStatus(GET_DETAIL_MOVIE_FAILURE);
     mDetailViewModel.setMovieRepository(mMovieRepository);

     Mockito.when(mMovieRepository.getDetail(anyInt())).thenReturn(Single.just(movieResponse));
     Mockito.when(mDetailViewModel.getLoadDataStatus()).thenReturn(loadDataStatus);
     Mockito.when(EventBus.getDefault()).thenReturn(mEventBus);
```
Nếu bạn băn khoăn loadDataStatus và mEvenBus ở đâu ra chờ xíu đoạn dưới sẽ có :) 
## 4. Gọi đoạn code cần test (Act)
Bây giờ chúng ta sẽ sang bước t2: Act đây là bước dễ nhất chúng ta chỉ cần gọi method under test mà thôi. Ở đây chúng ta sử dụng mDetailViewModel để gọi hàm getDetailMovie chạy thực để test logic nhưng bên trên chúng ta cũng cần sử dụng mDetailViewModel như 1 Mock object  để stub giá trị trả về cho hàm getLoadDataStatus chính vì vậy nên mDetailViewModel cần được khởi tạo như Spy object để vừa có thể gọi hàm chạy thực là vừa có thể stub.

`mDetailViewModel.getDetailMovie(131);`
## 5. Xác nhận kết quả test (Assert)
Cuối cùng chúng ta sang bưới 3 - Assert: Trong bước này bạn cũng sẽ sử dụng các hàm của Mockito đễ kiểm tra xem với các kết quả đầu ra của các hàm được định nghĩa trong bước 1 thì hàm getDetailMoviecủa chúng ta có cho ra kết quả đúng như mong đợi hay không. Chúng ta sẽ xem qua các hàm công cụ chúng ta có thể sử dụng, mình sẽ giới thiệu qua các hàm hay dùng, bạn có thể xem chi tiết hơn ở [đây](https://static.javadoc.io/org.mockito/mockito-core/3.0.0/org/mockito/Mockito.html#verify-T-) <br>
1. verify(mockObject).methodName <br> 
Xác nhận hàm methodName của mockObject có được gọi hay không!
như trong hàm getDetailMovie chúng ta muốn xác nhận getLoadDataStatus().postValue(true)) được gọi hay không :
`Mockito.verify(loadDataStatus).postValue(true);`
<br>Chúng ta đã định nghĩa khi mDetailViewModel.getLoadDataStatus() được gọi thì giá trị trả về sẽ là loadDataStatus. Nhưng verify chỉ nhận mockObject làm param vậy nên chúng ta sẽ phải khởi tạo loadDataStatus như 1 Mock object ở đầu class:
```
   @Mock private MutableLiveData<Boolean> loadDataStatus;
```

2.  verify(mockObject, times(timesInteract)).methodName(param) <br>
 Hàm này giúp chúng ta xác nhận có bao nhiêu lần hàm methodName được gọi. Như trong ví dụ dưới đây sẽ giúp chúng ta muốn xác nhận câu lệnh `EventBus.getDefault().post(new FetchDataStatus(GET_DETAIL_MOVIE_FAILURE));` không được gọi tới  <br>
`Mockito.verify(mEventBus, times(0)).post(status);`<br>
Ở đây mEventBus cũng tương tự như loadDataStatus ở trên chúng ta cũng phải định nghĩa nó như 1 Mock object ở đầu class: 
```
   @Mock private EventBus mEventBus;
```
3. verifyZeroInteractions(mockobject)<br>
Xác nhận không có sự tương tác nào với mockObject. Như trong method getDetailMovie() mEventBus thay vì xác nhận nó được gọi 0 lần bạn có thể sử dụng : `Mockito.verifyZeroInteractions(mEventBus);` <br><br>
Chúng ta hãy áp dụng những hàm trên để xác nhận kết quả trả về cho hàm và được kết quả:
```
RunWith(PowerMockRunner.class)
@PrepareForTest({EventBus.class})
public class DetailViewModelTest {

    @Mock
    private MovieRepository mMovieRepository;

    @Mock
    private MutableLiveData<Boolean> loadDataStatus;

    @Mock
    private EventBus mEventBus;

    @Spy
    private DetailViewModel mDetailViewModel = new DetailViewModel(mMovieRepository);

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void test_getDetailMovie_success() {
        mockStatic(EventBus.class);
        MovieResponse movieResponse = new MovieResponse();
        movieResponse.setStatus_code(MovieResponse.STATUS_CODE_SUCCESS);
        FetchDataStatus status = new FetchDataStatus(GET_DETAIL_MOVIE_FAILURE);
        mDetailViewModel.setMovieRepository(mMovieRepository);

        Mockito.when(mMovieRepository.getDetail(131)).thenReturn(Single.just(movieResponse));
        Mockito.when(mDetailViewModel.getLoadDataStatus()).thenReturn(loadDataStatus);
        Mockito.when(EventBus.getDefault()).thenReturn(mEventBus);

        mDetailViewModel.getDetailMovie(131);

        Mockito.verify(loadDataStatus).postValue(true);
        Mockito.verify(loadDataStatus).postValue(false);
        Mockito.verify(mDetailViewModel).setMovie(movieResponse);
        Mockito.verifyZeroInteractions(mEventBus);
//        Mockito.verify(mEventBus, times(0)).post(status);
    }
}
```
Để chạy hàm test_getDetailMovie_success bạn chỉ cần click vào button mũi tên xanh ở 1 trong 2 vị trí:  gần tên class hoặc gần tên hàm. Chúng ta sẽ được kết quả:

![](https://images.viblo.asia/a2737ddf-2648-4fb6-985a-bb143d971c4a.png)

Mong là các bạn đã hiểu được 3 bước Arrang - Act - Assert làm như thế nào và tại sao. Hàm getDetailMovie có gọi tới một vài phương thức static của class khác như `EventBus.getDefault() `chính vì vậy mình cần sử dụng 
```
@RunWith(PowerMockRunner.class)
@PrepareForTest()
mockStatic()
```
đừng băn khoăn mình sẽ giới thiệu tới nó ở bên dưới (PowerMock).  <br>
## 6. Sử dụng tiện ích Matcher 
Mockito là 1 framework rất tiện lợi bên cạnh các Hàm hỗ trợ cho stub method trong bước Arrange và các hàm verify trong bước Assert ra nó còn cung cấp cho chúng ta các hàm static Matcher. Matcher cũng như regex hay các đại diện cho đầu vào hoặc đầu ra thay vì bạn chỉ định nó là 1 giá trị cụ thể ví dụ như thay vì chỉ định giá trị cụ thể là 1 bạn có thể sử dụng anyInt(). Nó được sử dụng cả khi stub giá trị trả về cũng như xác minh kết quả đầu ra. Chính vì vậy chúng ta chia nó thành 2 loại Matcher: Argument Matchers và  Verification Matchers<br>
Cách dùng như nhau với cả 2 loại nên mình sẽ giới thiệu một vài hàm giúp bạn hình dung cách dùng của nó
1. any() <br>
Thay cho mọi object kể cả null: <br>
`when(TextUtils.isEmpty(any()).thenReturn(false);` Khi hàm TextUtils.isEmpty(value) được gọi dù value có mang giá trị gì thì kết quả trả về luôn luôn là false.<br> 
2. any(ClassName.class) <br>
Nó chỉ định giá trị cụ thể hơn cho any(), chỉ chấp nhận các object của ClassName: <br>
 ` Mockito.verify(mDetailViewModel, times(0)).setMovie(any(MovieResponse.class));` <br>
3.  anyInt(), anyBoolean(), anyByte(), anyFloat(), anyList() ....<br>
 Các hàm này sẽ thay thế cho các giá trị tương ứng.<br> <br>
**Chú ý khi sử dụng Matcher** :<br>
Nếu phương thức được stub hoặc được verify có 2 argument trở lên bạn không thể 1 cái sử dụng Matcher và cái còn lại sử dụng giá trị cụ thể ví dụ như:<br>
`when(spyObject.concatenateString("hello", anyString())).thenReturn("hello world!");`
<br>Khi run test chúng ta sẽ nhận được error: `InvalidUseOfMatchersException`. <br><br>
Để khắc phục nó bạn có 2 cách: <br>
**C1**: Sử dụng Matcher cho cả 2:<br> ` when(spyObject.concatenateString(anyString(), anyString())).thenReturn("hello world!");` <br> <br>
**C2**: sử dụng hàm eq() như 1 Argument Matcher bao bọc giá trị của bạn!:<br>
`when(argMatcher.concatenateString(anyString(), eq("world"))).thenReturn("hello world!");`
# V. PowerMock
Bây giờ mình sẽ giới thiệu với các bạn về PowerMock và kết thúc bài viết ở đây :) <br>
Trước tiên cần chúng ta sẽ config nó trước: thên 2 dòng sau vào build.gradle của bạn
```
testCompile group: 'org.powermock', name: 'powermock-api-mockito2', version: '1.7.4'
testCompile group: 'org.powermock', name: 'powermock-module-junit4', version: '1.7.4'
```
PowerMock là 1 framework extend từ các thư việc mock khác với nhiều chức năng hơn. PowerMock cho phép chúng ta mock các static, private, constructors, final class ... nhờ vào việc xây dựng 1 custom class loader riêng và chuyển đổi byte code. Chính vì vậy mình đã sử dụng PowerMock để mock các static method ở trên. Ở đây mình sẽ giới thiệu cách dùng Powermock với private và static method.
Điểm quan trọng trước khi bắt đầu chúng ta cần thêm annotation: `@RunWith(PowerMockRunner.class)` trước trên class. <br>
### PowerMock với Static method 
* Thêm annotation @PrepareForTest(ClassName): bạn cần list các class chứa các static method cần được mock (như trong ví dụ bên trên). Bạn có thể thêm trước tên class hoặc trước hàm test.
* Sử dụng mockStatic(ClassName) đầu tiên trong mỗi hàm test.
* Khi stub static method: `when(ClassName.methodName()).thenReturn(returnValue)`; <br>
Ví dụ như: when(UserManager.getInstance()).thenReturn(mUserManager)
* Khi bạn cần xác nhận tương tác với 1 static method: verifyStatic(ClassName.class, times(1))  <br>
### PowerMock với Private method
* Static và private đều cần thêm @PrepareForTest(ClassName) để yêu cần PowerMock chuẩn bị các class này trước khi test. Đây cũng là các class cần được chuyển sang bytecode khi test. 
* Để stub trên private method : <br>
`when(mockObject, "privateMethodName").thenReturn(value);`
* Để xác minh tương tác: <br>
`verifyPrivate(mockedObject).invoke(“privateMethodName”)`
<br> <br>
### Link project demo [github](https://github.com/tamtt-1725/unit-test-demo) <br>

Bài viết của mình kết thúc ở đây. Mọi ý kiến đóng góp hãy comment vào bên dưới! Cuối cùng cảm ơn mn đã đón đọc ;)