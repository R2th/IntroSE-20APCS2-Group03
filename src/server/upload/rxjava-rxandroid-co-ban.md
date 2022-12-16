# RxJava, RxAndroid cơ bản.
## I. Reactive Programming là gì?
Reactive Programing mà một phương pháp lập trình tập trung vào các luồng dữ liệu không đồng bộ và quan sát sự thay đổi của các luồng dữ liệu không đồng bộ đó, khi có sự thay đổi sẽ có hành động xử lý phù hợp. Vì đây là luồng dữ liệu không đồng bộ nên các module code cùng lúc chạy trên các thread khác nhau từ đó rút ngắn thời gian thực thi mà không làm block main thread.
## II. RxJava
RxJava cơ bản là một thư viện cung cấp các sự kiện không đồng bộ được phát triển theo Observer Pattern. Bạn có thể tạo luồng dữ liệu không đồng bộ trên  bất kỳ thread nào, thay đổi dữ liệu và sử dụng dữ liệu bằng Observer. Thư viện RxJava cung cấp nhiều loại Operator tuyệt vời như map, combine, merge , filter và nhiều thứ khác có thể được áp dụng cho luồng dữ liệu.
## III. RxAndroid
RxAndroid được đặc biệt sử dụng cho nền tảng Android được phát triển dựa trên RxJava. Đặc biệt Schedulers được bổ sung cho RxAndroid nhằm hỗ trợ cho đa luồng trong ứng dụng Android. Schedulers sẽ giúp bạn phân chia luồng chạy cho từng module code sao cho phù hợp. <br>
Một vài luồng chạy phổ biến được sử dụng qua Schedulers.
* Schedulers.io() Được sử dụng để thực hiện các hoạt động không tốn nhiều CPU như thực hiện cuộc gọi mạng, đọc đĩa / tệp, thao tác cơ sở dữ liệu, v.v.
* AndroidSchedulers.mainThread () Cung cấp quyền truy cập vào Android Main Thread / UI Thread.
* Schedulers.newThread () Thread mới sẽ được tạo ra mỗi khi một nhiệm vụ được tạo. 
## IV. Những thành phần quan trọng trong RxJava:
Về cơ bản RxJava có hai thành phần chính: Observable và Observer. Thêm vào đó, có những thứ khác như Schedulers, Operators và Subscription là các thành phần đóng vai trò như đa luồng, thao tác dữ liệu, và kết nối. Chúng ta sẽ cùng làm quen với từng thành phần: <br>
**`Observable`**: Là luồng dữ liệu thực hiện một số công việc và phát ra dữ liệu.<br>
**`Observer`** : Là thành phần đi kèm không thể thiếu của Observable. Nó nhận dữ liệu được phát ra bởi Observable. <br>
**`Subcription`**: Là mối liên kết giữa Observable và Observer. Có thể có nhiều Observer đăng ký một Observable duy nhất. <br>
**`Operator`**: Hỗ trợ cho việc sửa đổi dữ liệu được phát ra bởi Observable trước khi observer nhận chúng. <br>
**`Schedulers`**: Scheduler quyết định thread mà Observable sẽ phát ra dữ liệu và trên thread nào Observer sẽ nhận dữ liệu.
## 1. Cách tạo Observable
Chúng ta có 5 loại Observable đi kèm là 5 loại Observer tương ứng. Mỗi loại Observable được sử dụng trong các trường hợp khác nhau dựa vào số lượng và loại phần tử được Observable phát ra.<br><br>
![](https://images.viblo.asia/652f4b4a-b4da-4f94-911b-8750d6dce2c6.PNG)
<br><br>
Đầu tiên chúng ta sẽ điểm qua một vài phương pháp phổ biến để tạo ra Observable:
* **just:**<br>
Available: Flowable, Observable, Maybe, Single
<br> Tạo một Observable phát ra một item cụ thể.
* **defer**:<br>
Available: Flowable, Observable, Maybe, Single, Completable
<br> không tạo ra Observable cho đến khi có Observer đăng ký, và tạo một Observable mới mỗi khi có Observer mới đăng ký.
* **from**:<br>
Available: Flowable, Observable
<br> Chuyển đổi các đối tượng và kiểu dữ liệu khác thành Observables
* **interval**:<br>
Available: Flowable, Observable.
<br> Định kỳ tạo ra một số vô hạn (Long), ngày càng tăng.
* **fromCallable**:<br>
Available: Flowable, Observable, Maybe, Single, Completable
<br> Khi có observer đăng ký, Callable đã cho được gọi và giá trị trả về của nó (hoặc ném ngoại lệ) được chuyển tiếp đến Observer.
* **create**:<br>
Available: Flowable, Observable, Maybe, Single, Completable
<br> Tạo Observable có thể phát ra dữ liệu trong quá trình xử lý bằng cách gọi `onNext()` tới Observer.
<br>Bạn có thể tham khảo thêm [tại đây](https://github.com/ReactiveX/RxJava/wiki/Creating-Observables)
## 2. Cách tạo Observer
Đối với mỗi loại Observer khác nhau chúng ta có cách tạo và thực thi khác nhau nhưng đều khá đơn giản. 
<br> Đây là ví dụ điển hình nhất để tạo ra Observer:

```
private Observer<String> getAnimalsObserver() {
        return new Observer<String>() {
            @Override
            public void onSubscribe(Disposable d) {
                Log.d(TAG, "onSubscribe");
            }
 
            @Override
            public void onNext(String s) {
                Log.d(TAG, "Name: " + s);
            }
 
            @Override
            public void onError(Throwable e) {
                Log.e(TAG, "onError: " + e.getMessage());
            }
 
            @Override
            public void onComplete() {
                Log.d(TAG, "All items are emitted!");
            }
        };
    }
```

`onSubscribe()`: Phương thức sẽ được gọi khi một Observer đăng ký vào Observable. <br>
`onNext()`: Phương thức này sẽ được gọi khi Observable bắt đầu phát ra dữ liệu. <br>
`onError()`: Trong trường hợp có lỗi, phương thức onError() sẽ được gọi.<br>
`onComplete()`: Khi một Observable hoàn thành việc phát ra dữ liệu, onComplete() sẽ được gọi.
## 3. Tạo Observer theo dõi Observable
Đây là các phương thức cơ bản để khiến cho Observer đăng ký theo dõi Observable.
```
animalsObservable
        .subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe(animalsObserver);
```

`subscribeOn(Schedulers.io ())`: Báo cho Observable chạy nhiệm vụ trên một chuỗi nền.<br>
`observOn(AndroidSchedulers.mainThread ())`: Yêu cầu Observer nhận dữ liệu trên luồng chính để bạn có thể thực hiện các hành động liên quan đến giao diện.

## 4. Disposable
Disposable được sử dụng để hủy sự kết nối của Subserver với Subsevable khi không còn cần thiết việc này rất hữu dụng để tránh việc rò rỉ bộ nhớ.
<br> Khi Observer kết nối được với Observable trong onSubcribe() ta sẽ nhận được Disposable. Để hủy sự kết nối trong onDestroy() của Activity bạn nên gọi hàm dispose() của Disposable.
## 5. Operator
RxJava cung cấp tập hợp lớn các operator hỗ trợ cho việc thao tác với dữ liệu vậy nên operators được phân chia dựa trên loại công việc chúng làm. <br>
Ví dụ như nhóm tạo Observable: create, just, fromArray,... Nhóm lọc dữ liệu: filter, skip, last, take, ... Nhóm tạo Observable từ dữ iệu của Observable khác như: buffer, map, flatmap,...<br>
Lưu ý khi sử dụng nhiều Operator thì kết quả của Operator trước sẽ truyền cho Operator sau.
Bạn có thể tìm hiểu thêm [tại đây](http://reactivex.io/documentation/operators.html#categorized)

## V. Ví dụ:
Sau đây là ví dụ cụ thể cho từng loại Observable được đề cập phía trên:
Trong các ví dụ mình sử dung Custom object Note: 

```
public class Note {
    int id;
    String note;
 
    // getters an setters
}
```

### 1. Observable & Observer:
Được sử dụng nhiều nhất trong số tất cả. Observable có thể phát ra không hoặc nhiều phần tử.<br>

```
public class ObserverActivity extends AppCompatActivity {
 
    private static final String TAG = ObserverActivity.class.getSimpleName();
    private Disposable disposable;
 
    /**
     * Simple Observable emitting multiple Notes
     * -
     * Observable : Observer
     */
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_observer);
 
        Observable<Note> notesObservable = getNotesObservable();
 
        Observer<Note> notesObserver = getNotesObserver();
 
        notesObservable.observeOn(Schedulers.io())
                .subscribeOn(AndroidSchedulers.mainThread())
                .subscribeWith(notesObserver);
    }
 
    private Observer<Note> getNotesObserver() {
        return new Observer<Note>() {
 
            @Override
            public void onSubscribe(Disposable d) {
                Log.d(TAG, "onSubscribe");
                disposable = d;
            }
 
            @Override
            public void onNext(Note note) {
                Log.d(TAG, "onNext: " + note.getNote());
            }
 
            @Override
            public void onError(Throwable e) {
                Log.e(TAG, "onError: " + e.getMessage());
            }
 
            @Override
            public void onComplete() {
                Log.d(TAG, "onComplete");
            }
        };
    }
 
    private Observable<Note> getNotesObservable() {
        final List<Note> notes = prepareNotes();
 
        return Observable.create(new ObservableOnSubscribe<Note>() {
            @Override
            public void subscribe(ObservableEmitter<Note> emitter) throws Exception {
                for (Note note : notes) {
                    if (!emitter.isDisposed()) {
                        emitter.onNext(note);
                    }
                }
 
                // all notes are emitted
                if (!emitter.isDisposed()) {
                    emitter.onComplete();
                }
            }
        });
    }
 
    private List<Note> prepareNotes() {
        List<Note> notes = new ArrayList<>();
        notes.add(new Note(1, "Buy tooth paste!"));
        notes.add(new Note(2, "Call brother!"));
        notes.add(new Note(3, "Watch Narcos tonight!"));
        notes.add(new Note(4, "Pay power bill!"));
        return notes;
    }
 
    @Override
    protected void onDestroy() {
        super.onDestroy();
        disposable.dispose();
    }
}
```

Output:

```
onSubscribe
onNext: Buy tooth paste!
onNext: Call brother!
onNext: Watch Narcos tonight!
onNext: Pay power bill!
onComplete
```

### 2. Single & SingleObsever
Single luôn phát ra chỉ một giá trị hoặc một lỗi. Observable có thể thực hiện được công việc này nhưng Single luôn luôn đảm bảo rằng **luôn luôn có** 1 phần tử được trả về. Chính vì chỉ có 1 phần tử nên SingleObserver không có `onNext()` mà chỉ có `onSuccess()` để nhận dữ liệu trả về.

```
public class SingleObserverActivity extends AppCompatActivity {
 
    private static final String TAG = SingleObserverActivity.class.getSimpleName();
    private Disposable disposable;
 
    /**
     * Single Observable emitting single Note
     * Single Observable is more useful in making network calls
     * where you expect a single response object to be emitted
     * -
     * Single : SingleObserver
     */
 
    // TODO - link to Retrofit  tutorial
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_single_observer);
 
        Single<Note> noteObservable = getNoteObservable();
 
        SingleObserver<Note> singleObserver = getSingleObserver();
 
        noteObservable
                .observeOn(Schedulers.io())
                .subscribeOn(AndroidSchedulers.mainThread())
                .subscribe(singleObserver);
 
    }
 
    private SingleObserver<Note> getSingleObserver() {
        return new SingleObserver<Note>() {
            @Override
            public void onSubscribe(Disposable d) {
                Log.d(TAG, "onSubscribe");
                disposable = d;
            }
 
            @Override
            public void onSuccess(Note note) {
                Log.e(TAG, "onSuccess: " + note.getNote());
            }
 
            @Override
            public void onError(Throwable e) {
                Log.d(TAG, "onError: " + e.getMessage());
            }
        };
    }
 
    private Single<Note> getNoteObservable() {
        return Single.create(new SingleOnSubscribe<Note>() {
            @Override
            public void subscribe(SingleEmitter<Note> emitter) throws Exception {
                Note note = new Note(1, "Buy milk!");
                emitter.onSuccess(note);
            }
        });
    }
 
    @Override
    protected void onDestroy() {
        super.onDestroy();
        disposable.dispose();
    }
}
```
Output
```
onSubscribe
onSuccess: Buy milk!
```
### 3. Maybe & MaybeObserver 
Maybe có thể hoặc không phát ra một giá trị. Maybe được sử dụng khi bạn đang mong đợi một phần tử được phát ra tùy theo từng trường hợp xảy ra. Như khi chúng ta query note by Id trong database nó có thể có hoặc cũng có thể không.

```
public class MaybeObserverActivity extends AppCompatActivity {
 
    private static final String TAG = MaybeObserverActivity.class.getSimpleName();
    private Disposable disposable;
 
    /**
     * Consider an example getting a note from db using ID
     * There is possibility of not finding the note by ID in the db
     * In this situation, MayBe can be used
     * -
     * Maybe : MaybeObserver
     */
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maybe_observer);
 
        Maybe<Note> noteObservable = getNoteObservable();
 
        MaybeObserver<Note> noteObserver = getNoteObserver();
 
        noteObservable.subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(noteObserver);
    }
 
    private MaybeObserver<Note> getNoteObserver() {
        return new MaybeObserver<Note>() {
            @Override
            public void onSubscribe(Disposable d) {
                disposable = d;
            }
 
            @Override
            public void onSuccess(Note note) {
                Log.d(TAG, "onSuccess: " + note.getNote());
            }
 
            @Override
            public void onError(Throwable e) {
                Log.e(TAG, "onError: " + e.getMessage());
            }
 
            @Override
            public void onComplete() {
                Log.e(TAG, "onComplete");
            }
        };
    }
 
    /**
     * Emits optional data (0 or 1 emission)
     * But for now it emits 1 Note always
     */
    private Maybe<Note> getNoteObservable() {
        return Maybe.create(new MaybeOnSubscribe<Note>() {
            @Override
            public void subscribe(MaybeEmitter<Note> emitter) throws Exception {
                Note note = new Note(1, "Call brother!");
                if (!emitter.isDisposed()) {
                    emitter.onSuccess(note);
                }
            }
        });
    }
 
    @Override
    protected void onDestroy() {
        super.onDestroy();
        disposable.dispose();
    }
}
```

### 4.Completable & CompletableObserver
Completable không phát ra bất kỳ dữ liệu nào thay vào đó nó thông báo trạng thái của tác vụ thành công hay thất bại. Được sử dụng khi bạn muốn thực hiện một số nhiệm vụ và không mong đợi bất kỳ giá trị nào trả về. Một trường hợp Completable thường được sử dụng là cập nhật một số dữ liệu trên máy chủ bằng cách thực hiện yêu cầu PUT.

```
public class CompletableObserverActivity extends AppCompatActivity {
 
    private static final String TAG = CompletableObserverActivity.class.getSimpleName();
    private Disposable disposable;
 
    /**
     * Completable won't emit any item, instead it returns
     * Success or failure state
     * Consider an example of making a PUT request to server to update
     * something where you are not expecting any response but the
     * success status
     * -
     * Completable : CompletableObserver
     */
    // TODO - link to Retrofit  tutorial
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_completable_observer);
 
        Note note = new Note(1, "Home work!");
 
        Completable completableObservable = updateNote(note);
 
        CompletableObserver completableObserver = completableObserver();
 
        completableObservable
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(completableObserver);
    }
 
 
    /**
     * Assume this making PUT request to server to update the Note
     */
    private Completable updateNote(Note note) {
        return Completable.create(new CompletableOnSubscribe() {
            @Override
            public void subscribe(CompletableEmitter emitter) throws Exception {
                if (!emitter.isDisposed()) {
                    Thread.sleep(1000);
                    emitter.onComplete();
                }
            }
        });
    }
 
    private CompletableObserver completableObserver() {
        return new CompletableObserver() {
            @Override
            public void onSubscribe(Disposable d) {
                Log.d(TAG, "onSubscribe");
                disposable = d;
            }
 
            @Override
            public void onComplete() {
                Log.d(TAG, "onComplete: Note updated successfully!");
            }
 
            @Override
            public void onError(Throwable e) {
                Log.e(TAG, "onError: " + e.getMessage());
            }
        };
    }
 
    @Override
    protected void onDestroy() {
        super.onDestroy();
        disposable.dispose();
    }
}
```

Output

```
onSubscribe
onComplete: Note updated successfully!
```

### 5. Flowable & Observer
Được sử dụng khi một Observable tạo ra số lượng lớn các sự kiện / dữ liệu mà Observer có thể xử lý. Flowable có thể được sử dụng khi nguồn tạo ra 10k+ sự kiện và Onserver không thể tiêu thụ tất cả.
Flowable sử dụng phương pháp Backpressure để xử lý dữ liệu tránh lỗi MissingBackpressureException và OutOfMemoryError. 
```
public class FlowableObserverActivity extends AppCompatActivity {
 
    private static final String TAG = FlowableObserverActivity.class.getSimpleName();
    private Disposable disposable;
 
    /**
     * Simple example of Flowable just to show the syntax
     * the use of Flowable is best explained when used with BackPressure
     * Read the below link to know the best use cases to use Flowable operator
     * https://github.com/ReactiveX/RxJava/wiki/What%27s-different-in-2.0#when-to-use-flowable
     * -
     * Flowable : SingleObserver
     */
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_flowable_observer);
 
        Flowable<Integer> flowableObservable = getFlowableObservable();
 
        SingleObserver<Integer> observer = getFlowableObserver();
 
        flowableObservable
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .reduce(0, new BiFunction<Integer, Integer, Integer>() {
                    @Override
                    public Integer apply(Integer result, Integer number) {
                        //Log.e(TAG, "Result: " + result + ", new number: " + number);
                        return result + number;
                    }
                })
                .subscribe(observer);
    }
 
    private SingleObserver<Integer> getFlowableObserver() {
        return new SingleObserver<Integer>() {
            @Override
            public void onSubscribe(Disposable d) {
                Log.d(TAG, "onSubscribe");
                disposable = d;
            }
 
            @Override
            public void onSuccess(Integer integer) {
                Log.d(TAG, "onSuccess: " + integer);
            }
 
            @Override
            public void onError(Throwable e) {
                Log.e(TAG, "onError: " + e.getMessage());
            }
        };
    }
 
    private Flowable<Integer> getFlowableObservable() {
        return Flowable.range(1, 100);
    }
 
    @Override
    protected void onDestroy() {
        super.onDestroy();
        disposable.dispose();
    }
}
```
Output

```
onSubscribe
onSuccess: 5050
```