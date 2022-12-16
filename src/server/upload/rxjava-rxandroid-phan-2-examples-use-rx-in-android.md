Khi bạn đã có kiến thức về Reactive Programming, RxJava, RxAndroid đã giới thiệu ở [Phần 1](https://viblo.asia/p/rxjava-rxandroid-phan-1-nhung-khai-niem-co-ban-YWOZr2rPZQ0). Chúng ta hãy đi vào một số ví dụ code để hiểu các khái niệm tố hơn.
## 1. Adding Dependencies

Để bắt đầu thì bạn cần thêm các dependencies của RxJava và RxAndroid vào project ở file build.gradle và sync chúng.
```Java
// RxJava
implementation 'io.reactivex.rxjava2:rxjava:2.x.y'
// RxAndroid
implementation 'io.reactivex.rxjava2:rxandroid:2.z.t'
```
Hiện tại thì version mới nhất của RxJava là 2.2.8 của RxAndroid là 2.1.1

## 2. Bước cơ bản nhất.
1. Tạo một Observable để phát ra dữ liệu. Bên dưới là mình tạo ra một Observabe để phát ra một danh sách tên các cầu thủ bóng đá. Toán tử Just ở đây được sử dụng để làm điều đó.
```Java
Observable<String> footballPlayersObservable = Observable.just("Messi", "Ronaldo", "Modric", "Salah", "Mbappe");
```

2. Tạo một Observer để lắng nghe Observable. Observer cung cấp các phương thức dưới đây để nắm bắt được trạng thái của Observable:
. onSubscribe(): Phương thức này sẽ được gọi khi một Observer đăng ký (subscribes) tới Observable.
. onNext(): Phương thức này được gọi khi Observable bắt đầu phát dữ liệu.
. onError(): Trong trường hợp có bất kỳ lỗi nào, phương thức này sẽ được gọi.
. onComplete(): Khi một Observable hoàn thành việc phát ra các items data, onComplete() sẽ được gọi.

```Java
Observer<String> footballPlayersObserver = getFootballPlayersObserver();
 
private Observer<String> getFootballPlayersObserver() {
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

3. Làm Observer đăng ký (subscribe) to Observable để nó có thể bắt đầu nhận dữ liệu. Ở đây bạn có thể nhận thấy 2 phương thức nữa là onServerOn() và onSubcribeOn().
. subcribeOn(Schedulers.io()): Điều này bảo Observable chạy task tron background thread
. observeOn(AndroidSchedulers.mainThread()): Điều này báo cho Observer nhận data ở Android Main Thread để bạn có thể thực hiện các hành động liên quan đến UI.
```Java
footballPlayersObservable
        .subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe(footballPlayesObserver);
```
Nếu bạn chạy chương trình và log ra thì đây là kết quả
```Java
onSubscribe
Name: Messi
Name: Ronaldo
Name: Modric
Name: Salah
Name: Mbappe
All items are emitted!
```
Trên là bạn vừa viết chương trình RxJava đầu tiên. Chúng ta sẽ tìm hiểu thêm về Schedulers và Observers trong các bài viết tiếp theo. Nhưng hiện tại ta có thể bắt đầu với các ví dụ đơn giản sau:

## 3. Example 1: Basic Observable, Observer

Đây là code hoàn chỉnh của ví dụ trên. Chay Activity và kiểm tra log
```Java
public class Example1Activity extends AppCompatActivity {
 
    /**
     * Basic Observable, Observer, Subscriber example
     * Observable emits list of football players names
     */
 
    private static final String TAG = Example1Activity.class.getSimpleName();
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_example1);
 
        // observable
        Observable<String> footballPlayesObservable = getFootballPlayesObservable();
 
        // observer
        Observer<String> footballPlayesObserver = getFootballPlayesObserver();
 
        // observer subscribing to observable
        animalsObservable
                .observeOn(Schedulers.io())
                .subscribeOn(AndroidSchedulers.mainThread())
                .subscribe(footballPlayesObserver);
    }
 
    private Observer<String> getFootballPlayessObserver() {
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
 
    private Observable<String> getFootballPlayesObservable() {
        return Observable.just("Messi", "Ronaldo", "Modric", "Salah", "Mbappe");
    }
}
```
log:
```Java
onSubscribe
Name: Messi
Name: Ronaldo
Name: Modric
Name: Salah
Name: Mbappe
All items are emitted!
```
## 4. Example 2: Introducing Disposable

Trong ví dụ này mình sẽ giới thiệu một thành mới có tên là Disposable.
Disposable được dùng để loại bỏ đăng ký (subcription) khi Observer không còn muốn lắng nghe Observable nữa. Trong Android Disposable rất hữu ích trong việc tránh rò rỉ bộ nhớ (memory leaks)

Ví dụ bạn thực hiện một cuộc truy vấn internet lâu dài và vừa cập nhật UI. Khi công việc giao tiếp với internet kết thúc, nếu Activity và Fragment đã bị destroy, vì Observer đăng ký vẫn sống, nó cố gắng cập nhật UI của Activity/Fragment đã destroy, trong trường hợp này có thể dẫn đến memory leaks. Vì vậy nên dùng Disposable để hủy đăng ký (un-subscription) khi Activity/Fragment bị destroy.
```Java
public class Example2Activity extends AppCompatActivity {
 
    /**
     * Basic Observable, Observer, Subscriber example
     * Observable emits list of football players names
     * You can see Disposable introduced in this example
     */
    private static final String TAG = Example2Activity.class.getSimpleName();
 
    private Disposable disposable;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_example2);
 
        // observable
        Observable<String> footballPlayesObservable = getFootballPlayesObservable();
 
        // observer
        Observer<String> footballPlayesObserver = getFootballPlayesObserver();
 
        // observer subscribing to observable
        footballPlayesObservable
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeWith(footballPlayesObserver);
    }
 
    private Observer<String> getFootballPlayesObserver() {
        return new Observer<String>() {
 
            @Override
            public void onSubscribe(Disposable d) {
                Log.d(TAG, "onSubscribe");
                disposable = d;
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
 
    private Observable<String> getFootballPlayesObservable() {
        return Observable.just("Messi", "Ronaldo", "Modric", "Salah", "Mbappe");
    }
 
    @Override
    protected void onDestroy() {
        super.onDestroy();
 
        // don't send events once the activity is destroyed
        disposable.dispose();
    }
}
```
Dùng Disposable bằng câu lệnh disposable.dispose().
Ví dụ này sẽ cho output giống như trước đó.

## 5. Example 3: Introducing Operator

Bây giờ mình sẽ lấy một ví dụ dùng Operator (toán tử) - đối tượng dùng để biến đổi dữ liệu phát ra. Ở ví dụ dưới Filter Operator được dùng để lọc dữ liệu phát ra.
Filter Operator lọc dữ liệu bằng cách áp dụng một câu lệnh có điều kiện. Dữ liệu đáp ứng đủ điều kiện sẽ phát ra còn phần còn lại sẽ bị bỏ qua.

Trong ví dụ dưới đây tên cầu thủ bắt đầu bằng chữ "m" sẽ được lọc
```Java
public class Example3Activity extends AppCompatActivity {
 
    /**
     * Basic Observable, Observer, Subscriber example
     * Observable emits list of football players names
     * You can see Disposable introduced in this example
     */
    private static final String TAG = Example3Activity.class.getSimpleName();
 
    private Disposable disposable;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_example3);
 
        // observable
        Observable<String> footballPlayesObservable = getFootballPlayesObservable();
 
        // observer
        Observer<String> footballPlayesObserver = getFootballPlayesObserver();
 
        // observer subscribing to observable
        footballPlayesObservable
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .filter(new Predicate<String>() {
                    @Override
                    public boolean test(String s) throws Exception {
                        return s.toLowerCase().startsWith("m");
                    }
                })
                .subscribeWith(footballPlayesObserver);
    }
 
    private Observer<String> getFootballPlayesObserver() {
        return new Observer<String>() {
 
            @Override
            public void onSubscribe(Disposable d) {
                Log.d(TAG, "onSubscribe");
                disposable = d;
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
 
    private Observable<String> getFootballPlayesObservable() {
        return Observable.fromArray("Messi", "Ronaldo", "Modric", "Salah", "Mbappe");
    }
 
    @Override
    protected void onDestroy() {
        super.onDestroy();
 
        // don't send events once the activity is destroyed
        disposable.dispose();
    }
}
```
Nếu bạn chạy chương trình thì đầu ra sẽ là
```Java
onSubscribe
Name: Messi
Name: Modric
Name: Mbappe
All items are emitted!
```

## 6. Example 4: Multiple Observers and CompositeDisposable

Hãy xem xét trường hợp bạn có nhiều Observables và Observers. Disposing chúng từng cái một thì rất là không tối ưu và có thể bị lỗi vì bạn quên xử lý. Trong trường hợp này chúng ta sử dụng CompositeDisposable.

CompositeDisposable có thể duy trì các item subription trong một nhóm và có thể dipose tất cả chúng cùng một lúc. Thông thường ta gọi compositeDisposable.clear() trong onDestroy() nhưng bạn có thể gọi ở bất kì đâu trong code.

Trong ví dụ dưới đây bạn có thể thấy 2 Observers là mPlayersObserver và rPlayersObserver đều cùng đăng ký đến một Observable là footbalPlayersObservable. Cả hai đều nhận được dữ liệu giống nhau nhưng dữ liệu thay đổi khi các toán tử khác nhau được áp dụng trên luồng.

mPlayersObserver - Filter Operator được dùng để lọc các cầu thủ có tên chữ đầu tiên là "m"
rPlayersObserver - Filter Operator được dùng để lọc các cầu thủ có tên chữ đầu tiên là "r". Sau đó Map Operator chuyển đổi tên cầu thủ thành tất cả đều là chữ in hoa. Sử dụng nhiều toán tử trên một Observer được gọi là chuỗi toán tử.
```Java
public class Example4Activity extends AppCompatActivity {
 
    /**
     * Basic Observable, Observer, Subscriber example
     * Observable emits list of football players names
     * You can see filter() operator is used to filter out the
     * football players names that starts with letter `m`
     */
    private static final String TAG = Example4Activity.class.getSimpleName();
 
    private CompositeDisposable compositeDisposable = new CompositeDisposable();
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_example4);
 
        Observable<String> footbalPlayersObservable = getFottballPlayersObservable();
 
        DisposableObserver<String> mPlayersObserver = getMPlayersObserver();
 
        DisposableObserver<String> rPlayersObserver = getRPlayersObserver();
 
        /**
         * filter() is used to filter out the football players names starting with `m`
         * */
        compositeDisposable.add(
                footbalPlayersObservable
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .filter(new Predicate<String>() {
                            @Override
                            public boolean test(String s) throws Exception {
                                return s.toLowerCase().startsWith("m");
                            }
                        })
                        .subscribeWith(mPlayersObserver));
 
        /**
         * filter() is used to filter out the football players names starting with 'r'
         * map() is used to transform all the characters to UPPER case
         * */
 
        compositeDisposable.add(
                footbalPlayersObservable
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .filter(new Predicate<String>() {
                            @Override
                            public boolean test(String s) throws Exception {
                                return s.toLowerCase().startsWith("r");
                            }
                        })
                        .map(new Function<String, String>() {
                            @Override
                            public String apply(String s) throws Exception {
                                return s.toUpperCase();
                            }
                        })
                        .subscribeWith(rPlayersObserver));
    }
 
    private DisposableObserver<String> getMPlayersObserver() {
        return new DisposableObserver<String>() {
 
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
 
    private DisposableObserver<String> getRPlayersObserver() {
        return new DisposableObserver<String>() {
 
 
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
 
    private Observable<String> getFottballPlayersObservable() {
        return Observable.fromArray("Messi", "Ronaldo", "Modric", "Salah", "Mbappe");
    }
 
    @Override
    protected void onDestroy() {
        super.onDestroy();
 
        // don't send events once the activity is destroyed
        compositeDisposable.clear();
    }
}
```
Đây là output:
```Java
Name: Messi
Name: Modric
Name: Mbappe
All items are emitted!
Name: RONALDO
All items are emitted!
```

## 7. Example 5: Custom Data Type, Operators

Chúng ta hãy bắt đầu bằng một ví dụ thú vị. Thay vì sử dụng các biến nguyên thủy chúng ta sẽ thay thế bằng đối tượng Note. Ở đây toán tử map() có nhiệm vụ đổi các note từ chữ in thường sang chữ in hoa.
```Java
public class Example4Activity extends AppCompatActivity {
    /**
     * Basic Observable, Observer, Subscriber example
     * Introduced CompositeDisposable and DisposableObserver
     * The observable emits custom data type (Note) instead of primitive data types
     * ----
     * .map() operator is used to turn the note into all uppercase letters
     * ----
     * You can also notice we got rid of the below declarations
     * Observable<Note> notesObservable = getNotesObservable();
     * DisposableObserver<Note> notesObserver = getNotesObserver();
     */
    private static final String TAG = Example4Activity.class.getSimpleName();
 
    private CompositeDisposable disposable = new CompositeDisposable();
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_example4);
 
        // add to Composite observable
        // .map() operator is used to turn the note into all uppercase letters
        disposable.add(getNotesObservable()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .map(new Function<Note, Note>() {
                    @Override
                    public Note apply(Note note) throws Exception {
                        // Making the note to all uppercase
                        note.setNote(note.getNote().toUpperCase());
                        return note;
                    }
                })
                .subscribeWith(getNotesObserver()));
    }
 
    private DisposableObserver<Note> getNotesObserver() {
        return new DisposableObserver<Note>() {
 
            @Override
            public void onNext(Note note) {
                Log.d(TAG, "Note: " + note.getNote());
            }
 
            @Override
            public void onError(Throwable e) {
                Log.e(TAG, "onError: " + e.getMessage());
            }
 
            @Override
            public void onComplete() {
                Log.d(TAG, "All notes are emitted!");
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
 
                if (!emitter.isDisposed()) {
                    emitter.onComplete();
                }
            }
        });
    }
 
    private List<Note> prepareNotes() {
        List<Note> notes = new ArrayList<>();
        notes.add(new Note(1, "buy tooth paste!"));
        notes.add(new Note(2, "call brother!"));
        notes.add(new Note(3, "watch narcos tonight!"));
        notes.add(new Note(4, "pay power bill!"));
 
        return notes;
    }
    
    @Override
    protected void onDestroy() {
        super.onDestroy();
        disposable.clear();
    }
}
```
Note class:
```Java
 class Note {
        int id;
        String note;
 
        public Note(int id, String note) {
            this.id = id;
            this.note = note;
        }
 
        public int getId() {
            return id;
        }
 
        public String getNote() {
            return note;
        }
 
        public void setId(int id) {
            this.id = id;
        }
 
        public void setNote(String note) {
            this.note = note;
        }
    }
```
output:
```Java
Id: 1, note: BUY TOOTH PASTE!
Id: 2, note: CALL BROTHER!
Id: 3, note: WATCH NARCOS TONIGHT!
Id: 4, note: PAY POWER BILL!
All notes are emitted!
```
## 8. Tổng kết
Như vậy thông qua bài viết mình đã giới thiệu qua cách sử dụng cơ bản của RxJava áp dụng trong Android. Mong bài viết này mang lại điều gì đó cho các bạn mới tìm hiểu.
Để thực hiện bài viết này mình đã tham khảo:

http://reactivex.io/

https://github.com/ReactiveX/RxJava

https://github.com/ReactiveX/RxAndroid