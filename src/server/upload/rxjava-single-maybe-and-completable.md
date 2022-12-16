![](https://images.viblo.asia/150ce753-f90a-424b-947d-5b572646079f.jpg)


RxJava2 giới thiệu rất nhiều biến thể khác nhau của Observable như: Flowable, Single, Maybe và Completable. Hôm nay chúng ta sẽ tìm hiểu Single, Maybe và Completable một cách ngắn gọn.

Observable có thể  emit ra nhiều item.

Single, Maybe và Completable có thể không hoặc emit ra nhiều item.
# Single
Single là một biến thể của Observable. Nó chỉ emit ra item nếu thành công hoặc ném ra lỗi. Single chỉ emit ra một giá trị và một số operator không có tác dụng khi sử dụng với nó. 
```
interface SingleObserver<T> {
    void onSubscribe(Disposable d);
    void onSuccess(T value);
    void onError(Throwable error);
}
```
Phương thức `onNext()` và `onComplete()` của Observable đã được kết hợp thành phương thức `onSucess()`.

Single giống như promise trong Javascript. Promise là đối tượng chỉ tạo ra một item hoặc ném ra lỗi.

Ví dụ điển hình là khi gọi network. Với Retrofit bạn được trả về Observable hoặc Flowable. Nếu bạn chỉ quan tâm về dữ liệu trả về thì bạn có thể sử dụng `Single<T>` thay thế.
```
public interface APIClient {
    
   @GET("pincode")
   Single<City> getCityFromPincode(@Query("pincode") String  pincode);
}
```
Đây là implement:
```
apiClient.getCityFromPincode("123456")
    .subscribe(city -> {
        // handle data fetched successfully and API call completed
    },Throwable::printStackTrace);
```
Bạn cũng có thể chuyển đổi nó thành một Observable  với operator: `toObservable()`
# Maybe
Maybe cũng tương tự như Single chỉ có khác biệt là nó cho phép không có item nào được emit ra.
```
interface MaybeObserver<T> {
    void onSubscribe(Disposable d);
    void onSuccess(T value);
    void onError(Throwable error);
    void onComplete();
}
```
Chúng ta sẽ nhìn xuống ví dụ bên dưới để xem cách implement:
```
// Some Emission
Maybe<String> singleSource = Maybe.just("single item");

singleSource.subscribe(
        s -> System.out.println("Item received: from singleSource " +  s),
        Throwable::printStackTrace,
        () -> System.out.println("Done from SingleSource")
);

//no emission
Maybe<Integer> emptySource = Maybe.empty();
emptySource.subscribe(
        s -> System.out.println("Item received: from emptySource" + s),
        Throwable::printStackTrace,
        () -> System.out.println("Done from EmptySource")
);
```
Chạy đoạn code bên trên chúng ta sẽ nhận được kết quả như sau:
```
Item received: from singleSource single item
Done from EmptySource
```
# Completable
Completable chỉ quan tâm về hoạt động thực hiện có được hoàn thành hay xảy ra lỗi hay không thôi. Mà không hề quan tâm đến kết quả trả về. 
```
interface CompletableObserver<T> {
    void onSubscribe(Disposable d);
    void onComplete();    
    void onError(Throwable error);
}
```
Completable chỉ quan tâm đến khả năng hoàn thành bởi vậy nó không có phương thức `onNext()` và `onSucess()`

Ví dụ: Ở đây chúng ta có trường hợp mà chỉ quan tâm đến việc hoàn thành hay là lỗi. Giả sử chúng ta update thông tin của user tới server. Và chỉ muốn nhận được thông báo trả về. Chúng ta không cần trả về user vừa rồi vì app đã có sẵn đối tượng đó rồi. 
```
public interface APIClient {

    @PUT("user")
    Completable updateUser(@Body User);
}
```
Gọi ApiClient updateUser:
```
apiClient.updateUser(user)
        .subscribe(() -> {
    // handle the completion server has update the user object
},error -> {
    //handle error 
})
```
Vừa rồi mình đã trình bày ngắn gọn về cách sử dụng: **Single**, **Maybe**, **Completable**. Cảm ơn các bạn đã dành thời gian đọc. Happy coding!!! :grin:

Bài viết có tham khảo tại: https://android.jlelse.eu/rxjava-single-maybe-and-completable-8686db42bac8