**1. Giới thiệu về Mockito**

   Mokito là thư viện dùng để thực thi Junit test, tương tự như Junit của Android. Thư viện này sử dụng các đối tượng ảo để thực hiện test. Điều này đồng nghĩa với việc chúng ta không cần sử dụng điện thoại hoặc máy ảo Android để test. Hay nói cách khác, các đối tượng liên quan đến nền tảng Android của thiết bị sẽ không đượctạo ảo một cách dễ dàng (nên tránh tạo ảo các đối tượng này).
	
![](https://images.viblo.asia/cb65ecf5-26ef-4753-90bd-272229951944.jpg)

**2. Cài đặt Mockito trong android**

   Khai báo Mockito trong file build Gradle 
   
   ```
 dependencies {
    testCompile 'junit:junit:4.12'
    testCompile 'org.mockito:mockito-core:2.7.22'
    androidTestCompile 'org.mockito:mockito-android:2.7.22'
}
```

**3.  Mock với Mockito**

   Trong Mockito có 2 cách để tạo đối tượng test đó là:
* Mock
* Spy
    
Mock: là một đối tượng thuần ảo nghĩa là không thực hiện được các method mà đối tượng thực có thể thực hiện được, mà thay vào đấy chúng ta phải stub giá trị trước cho nó. Có 2 cách tạo đối tượng Mock là :
*  Sử dụng anotation @Mock.
* Sư dụng phương thức tĩnh mock().

Nếu sử dụng @mock, phải kích hoạt việc tạo ra các đối tượng chú thích. Các MockitoRule cho phép điều này. Nó gọi phương thức tĩnh MockitoAnnotations.initMocks (this) để điền các trường đã chú thích. Ngoài ra, bạn có thể sử dụng @RunWith (MockitoJUnitRunner.class).
 
 Spy: được dùng để tạo một đối tượng spy. Đối tượng spy là đối tượng bán ảo, hay nói cách khác nó vừa là đối tượng thực, vừa là đối tượng ảo. Vừa là đối tượng thực vì nó hoàn toàn có thể thực hiện các method của một đối tượng thực một cách chính xác, không cần stub trước giá trị để trả về như đối tượng mock. Vừa là đối tượng ảo vì nó có thể thực hiện các câu lệnh của một đối tượng mock. Có 2 cách tạo đối tượng Spy là:
* Sử dụng anotation @Spy.
* Sử dụng phương thức tĩnh spy().
        
**4.Mocking Methods với Mockito**
    
   Mockito hỗ trợ một số phương thức giúp tạo ra giá trị trả về hoặc lỗi một cách dễ dàng qua 1 số phương thức sau:
    
   when(...).thenReturn(...): Được sử dụng để xác định một giá trị trả về cho một phương thức với các tham số được xác định trước. Mocks có thể trả về các giá trị khác nhau tùy thuộc vào đối số được truyền vào một phương thức. Ví dụ: 

        when(mReposity.getGenres(ArgumentMatchers.anyString())).thenReturn(Observable.just(genres));
        
   when(...).thenThrow(...): Được sử dụng để xác định trả về một ngoại lệ . Ví dụ: 
        
        Throwable throwable = new Throwable("test");
        when(mReposity.getDetail(anyInt(), anyString())).thenThrow(throwable);
    
   doReturn(...​).when(...​): Giống when(...).thenReturn(...), Nó an toàn cho các phương pháp mock cung cấp một ngoại lệ trong khi gọi. Ví dụ: 

       doReturn("test").when(myClass).anotherMethodInClass();

   doAnswer...when(): khi một hàm void, được gọi trong một hàm khác. Và nhiệm vụ của chúng ta là phải giả thiết hàm void phải trả về một giá trị nào đấy (thông thường trong hàm này sẽ viết callback), thì chúng ta có thể stub giá trị thông qua việc override lại hàm trong interface Answer. Ví dụ: 
   
       doAnswer((Answer) invocation -> {
            Object arg0 = invocation.getArgument(0);
            Object arg1 = invocation.getArgument(1);

            assertEquals(3, arg0);
            assertEquals("answer me", arg1);
            return null;
    }).when(myList).add(any(Integer.class), any(String.class));

   verify(): sử dụng phương thức verify () trên đối tượng mock để xác minh rằng các điều kiện được chỉ định được đáp ứng. Giá trị mặc định của verity() là kiểm tra 1 lần ngoài ra các bạn có thể thêm các điều kiện check : times(x), atLeastOnce() hoặc never(). Ví dụ:

        verify(myList, times(1)).add(1, "real");

   Chúng ta có thể dùng các hàm trong Assert như Assert.assertEqual(), Assert.assert.NotNull(), Assert.assertEqualArray().. để kiểm tra so sánh điều kiện. Ngoài ra trong Mockito cũng hỗ trợ kiểu truyền một giá trị bất kì như Mockito.anyString(), Mockito.anyInt(),.. các giá trị trên thường được dùng khi mock các method có tham số, mà bạn không xác định được giá trị của các tham số đó.

**5.Testing Methods với Mockito**

   Đối với 1 số phương thức có giá trị trả về chúng ta có thể sử dụng when(...).thenReturn(...),when(...).thenThrow(...) để trả về giá trị và so sánh kết quả qua các phương thức Assert hoặc Verify. Ví dụ:

        @Test
        public void whenAddCalledValueCaptured() {
            MyList myList = mock(MyList.class);
            ArgumentCaptor valueCapture = ArgumentCaptor.forClass(String.class);
            doNothing().when(myList).add(any(Integer.class), valueCapture.capture());
            myList.add(0, "captured");

            assertEquals("captured", valueCapture.getValue());
        }

   Đối với 1 số phương thức void Dùng doAnswer nếu chúng ta muốn mock method Ví dụ: 

        @Test
        public void whenAddCalledAnswered() {
            MyList myList = mock(MyList.class);
            doAnswer((Answer) invocation -> {
            Object arg0 = invocation.getArgument(0);
            Object arg1 = invocation.getArgument(1);

            assertEquals(3, arg0);
            assertEquals("answer me", arg1);
            return null;
            }).when(myList).add(any(Integer.class), any(String.class));
            myList.add(3, "answer me");
        }