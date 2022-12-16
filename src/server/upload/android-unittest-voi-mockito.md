# Giới thiệu 
Như chúng ta đã biết, ngày nay việc code ' sạch ' ngày càng trở nên quan trọng. Mọi cấu trúc, mọi framework đều hướng đến những mục tiêu làm cho code có thể dễ dàng được triển khai, phát triển và bảo trì. Đối với Android cũng vậy. Một trong những phương pháp nâng cao chất lượng code chính là làm giảm tối thiểu sự phụ thuộc giữa giao diện và business logic. Nhờ đó mà việc test các logic code trở nên dễ dàng hơn.

Trong bài viết này, mình sẽ trình bày 1 số khái niệm cũng như cách đơn giản để chúng ta có thể viết UnitTest trong Android với Mockito.

# Khái niệm cơ bản
## 1. Mock 
Mock là phương pháp tạo ra 1 đối tượng giả. Chúng ta sẽ dùng đối tượng này để test nhưng phần logic của app mà nó có tham gia. Trên thực tế, những đối tượng được mock thường là những phần để khởi tạo tường minh nó thường khó khăn hoặc tốn tài nguyên, hay cũng có thể là những đối tượng mà chủ đích của ta không phải là test logic của nó nhưng vẫn cần có nó. Phần này có thể khó hiểu với những bạn mới. MÌnh có thể ví dụ như sau.


Khi chúng ta cần test logic của 1 function a(). Và trong fun này có sự tham gia của 1 đối tượng X.
```
private fun a() {
    if (X.check()) {
        //logic
    }
}
```

Mấu chốt của phần này là cần test đoạn logic trong hàm if. Tuy chúng ta không cần test logic của function check() nhưng vẫn cần đến sự tham gia cũng như trả về giá trị của nó.

Trong trường hợp này, ta sẽ mock đối tượng X. Bây giờ chỉ cần giả định mọi trừờng hợp trả về của check() để kiểm tra xem đoạn logic trong if() có hoạt động đúng hay không.

## Spy 
Tương tự như mock thì spy cũng dùng để tạo ra 1 đối tượng. Tuy nhiên đối tượng này không phải "giả hoàn toàn".

CHúng ta cần phân biệt giữa mock và spy. KHi dùng mock tạo đối tượng, thì đối tượng đó hoàn toàn không phải đối tượng thật. Chúng ta có thể truy cập đến các biến và các phương thức của nó, tuy nhiên chúng đều là null hoặc không thực hiện gì. Đó chính là lý do chúng ta cần giả lập giá trị, mình sẽ nói ở dưới.

CÒn với spy, chúng ta vẫn có thể giả định các biến hay kết quả trả về của đối tượng giống như mock. TUy nhiên, với những phần mà chúng ta không giả định thì chúng vẫn sẽ mang những giá trị hay sự thực thi mà chúng ta đã code cho nó.

Ví dụ:
```
class A {
    fun printString() {
        //print "mockito"
    }
}
```

Giả sử mình có đoạn code trên với class A. Bây giờ sẽ mock A 

```
var a = mock(A::Class.java) 
a.printString()
```

Có thể các bạn nghĩ sau khi gọi function như trên thì dòng "mockito" sẽ được in ra. Nhưng thực tế thì không phải do a ở đây như mình nói là giả, nó sẽ không thực hiện gì cho tới khi chúng ta giả lập nó.

Còn nếu chúng ta khai báo
```
var a = spy(A::Class.java)
```
thì khi gọi function, dòng "mockito" vẫn sẽ được in ra như đúng những gì ta thực thi.

# Lưu ý
Mockito có 1 đặc điểm là chúng không thực thi cho các đối tượng final.

Vì vậy, nếu các bạn đang sử dụng Kotlin thì cần lưu ý. Do mặc định các class hay function của Kotlin đều là final nên chúng ta có thể import dependence sau vào file gradle để giải quyết vấn đề này:
```
testImplementation 'org.mockito:mockito-inline:2.13.0'
```

# Thực hiện test 
## 1. Import dependences 
```
    implementation "org.mockito:mockito-core:2.7.19"
    testImplementation "android.arch.core:core-testing:1.1.1"
    testImplementation 'org.mockito:mockito-inline:2.13.0'
```

## 2. Mock

```
class StoryRepoTest {

   @Mock
   private lateinit var mStoryApi: StoryApi

   @Spy
   private lateinit var storyMapper: StoryEntityMapper

   private lateinit var repo: StoryRepositoryImpl
   
   @Before
   fun init() {
       MockitoAnnotations.initMocks(this)
       repo = StoryRepositoryImpl(mStoryApi, storyMapper)
   }

   @Test
   fun testGetTopStoriesComplete() {
       //test logic
   }
}

```

Ví dụ trên là class test cho Repository. Chúng ta cần test logic cho việc fetch data từ api. 
Trước tiên mình sẽ giải thích 1 số anotation đã sử dụng:
1. @Mock  
    Dùng anotation này để mock cho đối tượng cần thiết. Trong ví dụ này, chúng ta cần test logic của Repository. Mà để chạy được function fetch data thì chúng ta cần tới đối tương api ( hiện tại mình đang dùng retrofit để fetch data ).
    Do đó sẽ dùng @Mock cho StoryApi. Và các bạn cần lưu ý, như mình đã nói ở đầu, đây là mock nên sẽ phải có giả định cho các function của nó. Mình sẽ làm ở bước sau.
2. @Spy
    Tương tự, anotation này cho phép spy 1 đối tượng. Giải thích 1 chút ở đây tại sao mình lại dùng Spy. Class mapper của mình chứa các code mapper model của class. Chúng ta có thể thấy được nó khác đối tượng api ở trên kia 1 điểm lớn. Đó là muốn chạy được StoryApi ở trên, chúng ta phải khởi tạo cho Retrofit, với các cài đặt phức tạp hơn. Do đó khó mà có thể chạy được api này trong 1 function test logic đơn thuần. Vì vậy mình sẽ mock và giả định dữ liệu cho nó.
    
    
    Tuy nhiên class Mapper này thì khác. Nó chỉ nhận nhiệm vụ xử lý các data class đơn thuần. Chúng ta hoàn toàn có thể dùng thể hiện thật của class này để tham gia vào quá trình test. Và như vậy thì đương nhiên các bạn có thể khởi tạo class này như thông thường thay vì dùng @Spy.
3. @Before
    
    Dùng Anotation này cho function mà chúng ta muốn nó chạy trước mọi function test khác. Thường thì chúng ta sẽ dùng cho function init.
    Như ở ví dụ trên mình đã gọi :
    
    ` MockitoAnnotations.initMocks(this)`
    
    Function này cho phép ta có thể dùng được các Anotation kể trên. Tiếp theo sẽ là khởi tạo cho đối tượng repository.
    
    1 vấn đề các bạn cần lưu ý: **Muốn test logic của đối tương nào thì ta phải có thể hiện thật của đối tượng đó**
    
    Lí do rất đơn giản. Các bạn cần test nó nhưng lại mock nó thì đương nhiên kết quả test sẽ là do các bạn quyết định. Trong khi logic thật vẫn có thể bị sai mà k được phát hiện. Do đó, mình dùng các đói tượng mock đã khai báo để khởi tạo tường minh 1 thể hiện của Repository
4. @Test
    Anotation dùng cho function có nhiệm vụ test. Chúng ta sẽ viết test code trong funcction này.
    
    
 # 3. Viết logic test 
```
fun testGetTopStoriesComplete() {
       `when`(mStoryApi.getTopStories(ArgumentMatchers.anyString())).thenReturn(
               Single.just(createStoryResponse())
       )
       val repotest = repo.getTopStories("input test").test()

       repotest.run {
           assertComplete()
           assertValueCount(1)
           assertValue { it == listOf(createStory()) }
       }
   }
   
    /**
    * Input data by api mock
    */
   private fun createStoryResponse() = StoryWrapperResponse<StoryEntity>("200",
           "copyright", "19/10/2018", "1",
           listOf(StoryEntity()))

   /**
    * Expect value
    */
   private fun createStory() = Story()
}

```

- Trong phần này, logic mình cần test là của function **getTopStories** của Repo. Đây chính là lúc cần giả lập cho dữ liệu trả về từ api mock ở trên. 
       ```when(mStoryApi.getTopStories(ArgumentMatchers.anyString())).thenReturn(Single.just(createStoryResponse()) )```
     Dùng when() với object mock api. Đoạn code trên có thể  hiểu là giả định: cứ khi nào function getTopStories() của StoryApi được gọi thì 1 kết quả là createStoryResponse() sẽ được trả về.
      Đây chính là mấu chốt để ta có thể tạo ra các dữ liệu trả về ứng với thực tế  để test. Ví dụ như dữ liệu hợp lệ, dữ liệu rỗng, hay trả về  lỗi,...
       
- Tiếp theo gọi function có logic cần test: `val repotest = repo.getTopStories("input test").test()`       

    Ở đây tại sao mình lại truyền "input test". Rõ ràng đây là param không đúng. Tuy nhiên ở trên ta đã giả định cho api. Api sẽ luôn trả về giá trị từ **createStoryResponse()** với mọi đầu vào dạng String. Đó chính là tác dụng của **anyString()**

- Bây giờ sẽ kiểm tra các kết quả

   **assertComplete()** : kiểm tra xem kết quả có được trả về thành công hay không
   
   **assertValueCount(1)** : kiểm tra xem dữ liêu trả về có đúng 1 item hay không
   
   **assertValue { it == listOf(createStory()) }** : kiểm tra xem giá trị của item đó có đúng như giá trị mà ta mong muốn không.
   
# Verify
Ở trên mình đã ví dụ về việc test dựa trên so sánh các dữ liệu trả về với **assert** 

Tuy nhiên trong nhiều trường hợp chúng ta cần các test case dạng xác thực xem 1 function có được chạy hay không. Verify sẽ làm nhiệm vụ này.

1. **verify(mockObject).goToLogin()**
: Kiểm tra xem fun goToLogin() có được mockObject gọi hay không 

2.  **verify(mockObject, never()).goToLogin()**
: Kiểm tra xem fun này có phải không bao giờ được gọi hay k.

3. **verify(mockObject, times(2).goToLogin()**
: Kiểm tra xem có được gọi 2 lần k

 4. **verify(mockObject, atLeastOnce()).goToLogin()**: kiểm tra xem func có được gọi ít nhất 1 lần hay không
 
5.  **verify(mockObject, atLeast(2)).goToLogin()**: kiểm tra xem func có được gọi ít nhất 2 lần hay không
 
6.  **verify(mockObject, atMost(3)).goToLogin()**: kiểm tra xem func có được gọi nhiều nhất 3 lần hay không

# Tổng kết 
Bài viết này mình đã trình bày những vấn đề cơ bản về việc viết UnitTest với Mockito trong Android. Hy vọng nó sẽ giúp ích cho các bạn. Nếu bài viết có sai sót rất mong được các bạn đóng góp ý kiến. Good luck !