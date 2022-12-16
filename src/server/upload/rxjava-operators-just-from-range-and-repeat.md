# Giới thiệu
Như các bạn đã biết về Operator dùng để tạo ra Observable. Ngoài ra thì chúng ta còn có rất nhiều Operator khác và được ReactiveX cho vào các category như Transformation, Just, From, Range and Repeat, .. nhằm phục vụ cho các use case khác nhau. Hôm này mình xin tìm hiểu về các case Just, From, Range and Repeat chi tiết hơn nhé.
## 1. Just() 
Toán tử **Just ()** lấy danh sách các đối số và chuyển đổi các mục thành các mục có thể quan sát được. Nó đưa ra các đối số từ 1 đến 10. <br>
Hãy xem xét ví dụ dưới đây. Ở đây, một Observable được tạo bằng cách sử dụng just () từ một loạt các số nguyên. Giới hạn của just() là, bạn không thể vượt qua hơn 10 đối số.

```
Observable.just(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Observer<Integer>() {
                    @Override
                    public void onSubscribe(Disposable d) {
 
                    }
 
                    @Override
                    public void onNext(Integer integer) {
                        Log.d(TAG, "onNext: " + integer);
                    }
 
                    @Override
                    public void onError(Throwable e) {
 
                    }
 
                    @Override
                    public void onComplete() {
 
                    }
                });
```
**Output:**
```
onNext: 1
onNext: 2
.
.
onNext: 9
onNext: 10
```
Ví dụ dưới đây tạo ra một Observable từ một mảng. Ở đây bạn nên chú ý rằng mảng được phát ra dưới dạng một mục thay vì các số riêng lẻ. <br>
Observer phát ra mảng **onNext(Integer[] integers)** <br>
```
Integer[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
 
Observable.just(numbers)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Observer<Integer[]>() {
                    @Override
                    public void onSubscribe(Disposable d) {
 
                    }
 
                    @Override
                    public void onNext(Integer[] integers) {
                        Log.d(TAG, "onNext: " + integers.length);
 
                        // you might have to loop through the array
                    }
 
                    @Override
                    public void onError(Throwable e) {
 
                    }
 
                    @Override
                    public void onComplete() {
 
                    }
                });
```
**Output:**
```
onNext: 12
```
## 2. From()
- Không giống như just(). From() tạo ra một Observable từ việc set items sử dụng Iterable, có nghĩa là các item được trả ra cùng một lúc.
- Lưu ý là trong RxJava2 chúng ta sẽ sử dụng fromArray() chứ không phải **from()** như trước nữa.
```
Integer[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
 
Observable.fromArray(numbers)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Observer<Integer>() {
                    @Override
                    public void onSubscribe(Disposable d) {
 
                    }
 
                    @Override
                    public void onNext(Integer integer) {
                        Log.d(TAG, "onNext: " + integer);
                    }
 
                    @Override
                    public void onError(Throwable e) {
 
                    }
 
                    @Override
                    public void onComplete() {
 
                    }
                });
```
- **Output** :
```
onNext: 1
onNext: 2
.
.
onNext: 11
onNext: 12
```
- Sự khác biệt giữa Just() và From(): Dường như chỉ khác nhau về số lượng items được đẩy ra output. Với Just: onNext(Integer[] integers) còn From: onNext(Integer integer).
###  3. Range()
Range () tạo ra một Observable từ một chuỗi các số nguyên. Nó tạo ra chuỗi số nguyên bằng cách lấy số bắt đầu và độ dài . Vì vậy, các ví dụ tương tự ở trên có thể được sửa đổi là Observable.range (1, 10) .
```
Observable.range(1, 10)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Observer<Integer>() {
                    @Override
                    public void onSubscribe(Disposable d) {
 
                    }
 
                    @Override
                    public void onNext(Integer integer) {
                        Log.d(TAG, "onNext: " + integer);
                    }
 
                    @Override
                    public void onError(Throwable e) {
 
                    }
 
                    @Override
                    public void onComplete() {
 
                    }
                });
```
**Output**:
```
onNext: 1
onNext: 2
.
.
onNext: 9
onNext: 10
```
### 4. Repeat()
Repeat tạo ra một Observable phát ra một item hoặc một loạt các items liên tục.
```
Observable
         .range(1, 4)
         .repeat(3)
         .subscribe(new Observer<Integer>() {
             @Override
             public void onSubscribe(Disposable d) {
                 Log.d(TAG, "Subscribed");
             }
 
             @Override
             public void onNext(Integer integer) {
                 Log.d(TAG, "onNext: " + integer);
             }
 
             @Override
             public void onError(Throwable e) {
 
             }
 
             @Override
             public void onComplete() {
                 Log.d(TAG, "Completed");
             }
         });
```
**Output**:
```
Subscribed
onNext: 1
onNext: 2
onNext: 3
onNext: 4
onNext: 1
onNext: 2
onNext: 3
onNext: 4
onNext: 1
onNext: 2
onNext: 3
onNext: 4
Completed
```

Bài viết tới đây là hết. Cảm ơn các bạn đã đọc. Chúc các bạn thành công trên con đường trinh phục code của minh.
# Tham khảo:
https://www.androidhive.info/RxJava/rxjava-operators-just-range-from-repeat/#just