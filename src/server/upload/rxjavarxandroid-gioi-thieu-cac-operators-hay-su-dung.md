# Giới Thiệu 


RxJava có một bộ sưu tập khổng lồ các toán tử chủ yếu nhằm giúp chúng ta  sửa đổi, lọc, hợp nhất và chuyển đổi dữ liệu được phát ra bởi Observables. Chúng ta có thể tìm thấy danh sách đầy đủ các toán tử trên trang chủ của nó (http://reactivex.io/documentation/operators.html). Nhưng do nó quá đồ sộ nên chúng ta sẽ mất rất nhiều thời gian để có thể hiểu hết được các toán tử này.

Do các toán tử của Rxjava khá đồ sộ nên tìm một toán tử phục vụ một mục đích như (Max, Min ,Filter) rất đơn giản và dẽ dàng , nhưng nếu bạn gặp một bài toán phức tạp hơn mà  không tìm được một toán tử để xử lí dữ liệu mong muốn  thì bạn luôn có thể kết hợp nhiều toán tử với nhau. Áp dụng một toán tử vào một Observable thường trả về một Observable khác, vì vậy bạn chỉ có thể tiếp tục áp dụng các toán tử cho đến khi bạn nhận được các kết quả mà bạn muốn.


Trong bài viết này, chúng ta sẽ tìm hiểu vài toán tử hữu ích thường được sử dụng trong lập trình Rx. Các toán tử này về cơ bản để xử lí tạo ra một một Observable. 

# Let Go 


### 1.Filter

filter () cho phép Observable bắn ra những giá thỏa mãn những điều kiện điều kiện nhất định.

Phương thức filter() thực hiện kiểm tra Predicate và áp dụng điều kiện cho các giá trị trong danh sách.
Trong ví dụ này những giá trị số chẵn sẽ được bắn ra

```java

fun rxJavaJust1() {
        Observable.just(1, 2, 3, 4, 5, 6, 7, 8, 9)
                .filter(object : Predicate<Int> {
                    override fun test(integer: Int?): Boolean {
                        return integer!! % 2 == 0
                    }
                })
                .subscribe(object : DisposableObserver<Int>() {
                    override fun onNext(integer: Int?) {
                        Log.e("antx", "Even: " + integer!!)
                    }
                    override fun onError(e: Throwable) {
                        Log.e("antx", "onError: " + e.message)
                    }
                    override fun onComplete() {
                        Log.e("antx", "onComplete: ")
                    }
                })
    }
```
Kết Quả 

```java
    Even: 2
    Even: 4
    Even: 6
    Even: 8
    onComplete: 
```

Một ví dụ khác với kiểu dữ liệu tùy chỉnh. 
Bên dưới Danh sách User và mình muốn lọc những User có giới tính nữ.

Trong phương thức filter (), mỗi người dùng sẽ được kiểm tra với giới tính nữ bởi 
user.getGender().equalsIgnoreCase(“female”) 

```java
fun rxJavaJust2() {
        val userObservable = getUsersObservable()
        userObservable
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .filter { (_, gender) -> gender.equals("female", ignoreCase = true) }
                .subscribeWith(object : DisposableObserver<User>() {
                    override fun onNext(user: User) {
                        Log.e("antx", user.name + ", " + user.gender)
                    }

                    override fun onError(e: Throwable) {
                        Log.e("antx", "onError: " + e.message)
                    }

                    override fun onComplete() {
                        Log.e("antx", "onComplete: ")
                    }
                })
    }

    private fun getUsersObservable(): Observable<User> {
        val maleUsers = arrayOf("Mark", "John", "Trump", "Obama")
        val femaleUsers = arrayOf("Lucy", "Scarlett", "April")
        var users = ArrayList<User>()
        for (name in maleUsers) {
            users.add(User(name, "male"))
        }
        for (name in femaleUsers) {
            users.add(User(name, "female"))
        }
        return Observable
                .create(ObservableOnSubscribe<User> { emitter ->
                    for (user in users) {
                        if (!emitter.isDisposed) {
                            emitter.onNext(user)
                        }
                    }
                    if (!emitter.isDisposed) {
                        emitter.onComplete()
                    }
                }).subscribeOn(Schedulers.io())
    }
    
    data class User(val name: String, val gender: String)

```

Kết Quả 

```
    Lucy, female
    Scarlett, female
    April, female
    onComplete: 
```


### 2. Skip()

Toán tử Skip (n) bỏ qua n phần tử đầu trong danh sách được bắn ra bởi một Observable.
Giả sử bạn có một Observable phát ra các số nguyên từ 1-10 và skip(4) : nó bỏ qua 4 phần tử đầu và bắn ra các giá trị là :5, 6, 7, 8, 9, 10.

```
fun rxJavaSkip1() {
        Observable
                .range(1, 10)
                .skip(4)
                .subscribe(object : Observer<Int> {
                    override fun onSubscribe(d: Disposable) {
                        Log.e("antx", "Subscribed")
                    }
                    override fun onNext(integer: Int?) {
                        Log.e("antx", "onNext: $integer")
                    }
                    override fun onError(e: Throwable) {
                        Log.e("antx", "onError: " +e.message)
                    }
                    override fun onComplete() {
                        Log.e("antx", "Completed")
                    }
                })
    }
```

Kết Quả 

```java
onNext: 5
    onNext: 6
    onNext: 7
    onNext: 8
    onNext: 9
    onNext: 10
    Completed
```

### 3.skipLast(n)

skipLast (n) bỏ qua N phần tử cuối cùng từ một Observable.
Trong ví dụ tương tự, skipLast (4) bỏ qua các giá trị 7-10 và bắn ra các giá trị là  1, 2, 3, 4, 5, 6

```java
fun skipLast() {
        Observable
                .range(1, 10)
                .skipLast(4)
                .subscribe(object : Observer<Int> {
                    override fun onSubscribe(d: Disposable) {
                        Log.e("antx", "Subscribed")
                    }

                    override fun onNext(integer: Int?) {
                        Log.e("antx", "onNext: " + integer!!)
                    }

                    override fun onError(e: Throwable) {
                        Log.e("antx", "onError +${e.message}")
                    }

                    override fun onComplete() {
                        Log.e("antx", "Completed")
                    }
                })
    }
```

Kết Quả

```java
    onNext: 2
    onNext: 3
    onNext: 4
    onNext: 5
    onNext: 6
    Completed
```


### 4.Take()

take (n) nó đối lập với Skip . Nó chỉ bắn ra n phần tử đầu tiên của một Observable.
Trong ví dụ dưới đây, take(4) lấy 4 phát thải đầu tiên, tức là 1, 2, 3, 4 và bỏ qua phần còn lại.

```java
fun take() {
        Observable
                .range(1, 10)
                .take(4)
                .subscribe(object : Observer<Int> {
                    override fun onSubscribe(d: Disposable) {
                        Log.e("antx", "Subscribed")
                    }

                    override fun onNext(integer: Int?) {
                        Log.e("antx", "onNext: " + integer!!)
                    }

                    override fun onError(e: Throwable) {
                        Log.e("antx", "onError +${e.message}")
                    }

                    override fun onComplete() {
                        Log.e("antx", "Completed")
                    }
                })
    }
```

Kết Quả 

```java
    onNext: 1
    onNext: 2
    onNext: 3
    onNext: 4
    Completed
```

### 5.TakeLast

takeLast (n) bắn ra n giá trị cuối cùng từ một Observable.
Trong cùng một ví dụ, takeLast (4) lấy 4 giá trịn cuối cùng, tức là 7, 8, 9, 10 và bỏ qua phần còn lại.

```java
fun takeLast() {
        Observable
                .range(1, 10)
                .takeLast(4)
                .subscribe(object : Observer<Int> {
                    override fun onSubscribe(d: Disposable) {
                        Log.e("antx", "Subscribed")
                    }

                    override fun onNext(integer: Int?) {
                        Log.e("antx", "onNext: " + integer!!)
                    }

                    override fun onError(e: Throwable) {
                        Log.e("antx", "onError +${e.message}")
                    }

                    override fun onComplete() {
                        Log.e("antx", "Completed")
                    }
                })
    }
```

Kết Quả

```java
    onNext: 7
    onNext: 8
    onNext: 9
    onNext: 10
    Completed
```


### 6.Distinct

 Distinct : Loại bỏ các giá trị trùng lặp được bắn ra từ một Observable

```java
fun distinct() {
        val numbersObservable = Observable.just(10, 10, 15, 20, 100, 200, 100, 300, 20, 100)
        numbersObservable
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .distinct()
                .subscribe(object : Observer<Int> {
                    override fun onSubscribe(d: Disposable) {

                    }

                    override fun onNext(integer: Int?) {
                        Log.e("antx", "onNext: " + integer!!)
                    }

                    override fun onError(e: Throwable) {

                    }

                    override fun onComplete() {

                    }
                })
    }
```

Kết Quả 
```java
    onNext: 10
    onNext: 15
    onNext: 20
    onNext: 100
    onNext: 200
    onNext: 300
```

Toán tử  Distinct sử dụng rất tốt với các kiểu dữ liệu nguyên thủy.
Nhưng nếu muốn sử dụng nó với một kiểu dữ liệu tùy chỉnh, bạn cần ghi đè các phương thức equals () và hashCode (). 
Ví dụ dưới đây tránh các Note trùng lặp được bắn ra bởi một Observable.

```java
fun distinct() {
        val notesObservable = getNotesObservable()
        val notesObserver = getNotesObserver()
        notesObservable.observeOn(Schedulers.io())
                .subscribeOn(AndroidSchedulers.mainThread())
                .distinct()
                .subscribeWith(notesObserver)
    }

    private fun getNotesObserver(): DisposableObserver<Note> {
        return object : DisposableObserver<Note>() {

            override fun onNext(note: Note) {
                Log.e("antx", "onNext: " + note.note!!)
            }

            override fun onError(e: Throwable) {

            }

            override fun onComplete() {
                Log.e("antx", "onComplete")
            }
        }
    }

    private fun getNotesObservable(): Observable<Note> {
        val notes = prepareNotes()
        return Observable.create { emitter ->
            for (note in notes) {
                if (!emitter.isDisposed) {
                    emitter.onNext(note)
                }
            }
            if (!emitter.isDisposed) {
                emitter.onComplete()
            }
        }
    }

    // Preparing notes including duplicates
    private fun prepareNotes(): List<Note> {
        val notes: ArrayList<Note> = ArrayList()
        notes.add(Note(1, "Buy tooth paste!"))
        notes.add(Note(2, "Call brother!"))
        notes.add(Note(3, "Call brother!"))
        notes.add(Note(4, "Pay power bill!"))
        notes.add(Note(5, "Watch Narcos tonight!"))
        notes.add(Note(6, "Buy tooth paste!"))
        notes.add(Note(7, "Pay power bill!"))
        return notes
    }
```

Note
```java
class Note(id: Int, note: String) {
    var id: Int = 0
    var note: String? = null
    init {
        this.id = id
        this.note = note
    }
    override fun equals(obj: Any?): Boolean {
        if (obj === this) {
            return true
        }
        return if (obj !is Note) {
            false
        } else note.equals(obj.note, ignoreCase = true)

    }
    override fun hashCode(): Int {
        var hash = 3
        hash = 53 * hash + if (this.note != null) this.note!!.hashCode() else 0
        return hash
    }
}
```

Kết Quả 

```java
    onNext: Buy tooth paste!
    onNext: Call brother!
    onNext: Pay power bill!
    onNext: Watch Narcos tonight!
    onComplete
```

# Kết

Trong bài viết này mình đã giởi thiệu các toán tử Filter, Skip, SkipLast, Take, TakeLast và Distinct với giải thích chi tiết về chúng 

Hi vọng sáu bài viết này các bạn sẽ biết thêm và hiểu hơn về các Operators trong Rxjava

Thanks for reading :)


# Reference
https://www.androidhive.info/RxJava/rxjava-operators-repeat-skip-take-takeuntil/
 https://www.androidhive.info/RxJava/rxjava-operators-introduction/#all-operators