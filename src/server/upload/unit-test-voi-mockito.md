## Mở đầu
Mockito là một framework hỗ trợ tạo unit test bằng cách sử dụng các đối tượng giả.

Một đối tượng giả là đối tượng có các thuộc tính của đối tượng thực trong khi bỏ qua các phiền phức của việc tạo một đối tượng thực.

Nguyên nhân chúng ta nên sử dụng đối tượng giả để thực hiện unit test:

- Không cần khởi tạo như các đối tượng thực như vậy sẽ không bị phụ thuộc vào các đối tượng thực trong ứng dụng

- Unit test chạy sẽ nhanh hơn

- Code cũng trông xịn xò hơn

## Unit test với Mockito

Giả sử chúng ta có 1 MovieViewModel như sau:

```
public final class GenreV extends BaseViewModel {
    private MovieRepository movieRepository;
    private boolean isExhaust;
    private int currentPage;
    private MutableLiveData<ListMovieResponse> mutableLiveData = new MutableLiveData<>();

    public boolean isExhaust() {
        return isExhaust;
    }

    public void setExhaust(boolean isExhaust) {
        this.isExhaust = isExhaust;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public void getMovies(@NotNull String key, int page, int typeLoad) {
        currentPage = typeLoad == 1 ? page + 1 : page;
        movieRepository.getMovieByType(key, currentPage)
                .doOnSubscribe((new Consumer<Disposable>() {
                    @Override
                    public void accept(Disposable disposable) throws Exception {
                        getLoadingLiveData().postValue(true);
                    }
                }))
                .doOnTerminate((Action) (new Action() {
                    public final void run() {
                        getLoadingLiveData().postValue(false);
                    }
                })).subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<ListMovieResponse>() {
                    @Override
                    public void accept(ListMovieResponse listMovieResponse) throws Exception {
                        mutableLiveData.postValue(listMovieResponse);
                        setExhaust(listMovieResponse.getPage() == listMovieResponse.getTotalPage());
                        setCurrentPage(listMovieResponse.getPage());
                    }
                });
    }

    @NotNull
    public MutableLiveData getMoviesLiveData() {
        return mutableLiveData;
    }

    public @interface TypeLoad {
        int LOAD_MORE = 1;
        int LOAD_NEW = 0;
    }
}
```

bậy giờ chúng ta cần viêt unit test cho method getMovies(), các bước thực hiện như sau:

###  Thêm Mockito dependence

Để thêm Mockito dependence, ta cần add dòng sau vào trong build.gradle (app)
```
testImplementation 'org.mockito:mockito-core:1.10.19'
```
### Tạo 1 Mock class để thực hiện unit test

Tạo 1 class có tên MovieViewModelUnitTest trong package test

(Lưu ý có 2 thư mục test là "androidTest" và "test", "androidTest" là để chúng ta chạy test trên device thật và "test" là để chúng ta chạy test mà ko cần device. Ở đây chúng ta tạo trong package "test")

```
@RunWith(PowerMockRunner.class)
public class MovieViewModelUnitTest {
    
}
```

### Phân tích đối tượng cần test

> Ở đây chúng ta đang cần test method getMovies() của MovieViewModel, trong method này đang sử dụng MovieRepository, MutableLiveData như vậy chúng ta cần mock 2 đối tượng này để sử dụng

```
@RunWith(PowerMockRunner.class)
public class MovieViewModelUnitTest {
    @Mock
    private MovieRepository movieRepository;
    
    @Mock
    private MutableLiveData<ListMoviveResponse> mutableLiveData;
}
```

### Sử dụng các mock object để định nghĩa các method

```
@RunWith(PowerMockRunner.class)
public class MovieViewModelUnitTest {
    @Mock
    private MovieRepository movieRepository;
    
    @Mock
    private MutableLiveData<ListMoviveResponse> mutableLiveData;
    
    @Spy
    private MovieViewModel viewModel = new MovieViewModel(movieRepository);
    
    @Before
    public void before() {
            viewModel.setRepository(movieRepository);
            viewModel.setMutableLiveData(mutableLiveData);
    }
    
    @Test
    public void getMovies() {
        ListMovieResponse response = new ListMovieResponse();
        response.setTotalPage(1);
        Mockito.when(movieRepository.getMovies(Arguments.anyString(), Arguments.anyInt())).thenReturn(Single.just(response));
        viewModel.getMovies("A", 1, 1);
        Mockito.verify(mutableLiveData).postValue(response);
    }
}
```

Trên đây mình đã hướng dẫn các bạn sơ bộ về cách sử dụng Mockito để thực hiện unit test. Đương nhiên vẫn còn rất nhiều những tình huống khác mà các bạn phải xử lý một cách phức tạp hơn đôi chút nhưng nhìn chung Mockito khá dễ sử dụng vì cơ bản vẫn phải trả qua 3 bước trên. Để tìm hiểu thêm các bạn hãy tham khảo tại [đây](https://site.mockito.org/)