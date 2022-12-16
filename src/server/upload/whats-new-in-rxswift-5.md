RxSwift 5 đã được release khá lâu rồi và chưa thấy ai đề cập đến vấn đề này nên mình sẽ chia sẻ với các bạn những thay đổi đáng chú ý nhất được đưa vào phiên bản này.

### * **Relays giờ sẽ được tách ra thành 1 framework riêng — RxRelay**!


![](https://images.viblo.asia/6ec4b9c9-1845-4663-a854-76588e7d9182.png)

<div align="center">

Sơ đồ phụ thuộc trong **RxSwift 4.**

</div>

![](https://images.viblo.asia/0632d2f7-890b-4176-8ce3-ee5aadc54d77.png)


<div align="center">

Sơ đồ phụ thuộc trong **RxSwift 5.**

</div>

Điều này cho phép bạn chỉ sử dụng **RxSwift** và **RxRelay**, mà không phụ thuộc vào **RxCocoa** nếu bạn không cần nó.

### * **TimeInterval → DispatchTimeInterval**!

Schedulers đã được cấu trúc lại trong RxSwift 5 để loại bỏ việc sử dụng **TimeInterval**, thay vào đó là **DispatchTimeInterval**. Điều này hiển thị mức độ chi tiết tốt hơn của **scheduling** và độ ổn định cao hơn khi cần có thời gian phụ thứ hai.
Điều này ảnh hưởng đến tất cả các **operators** dựa trên thời gian như **throttle, timeout, delay, take**,…giúp hiển thị chi tiết tốt hơn về thời gian. 

![](https://images.viblo.asia/cafb9013-47a8-423e-b3ac-0109954012be.png)
<div align="center">

RxSwift 4 sử dụng **TimeInterval**

</div>

![](https://images.viblo.asia/63bcdafc-6265-44e4-a96c-6cfe46eb1c7a.png)

<div align="center">

RxSwift 4 sử dụng **DispatchTImeInterval**

</div>

### * **Variable is deprecated now**!
Thay vào đó chúng ta sẽ sử dụng **BehaviorRelay. BehaviorRelay** nằm trong **RxCocoa**, nhưng nó tương tự như **Variable**, chỉ khác về mặt cú pháp khai báo và sử dụng nó.

![](https://images.viblo.asia/aadfe82b-d6c5-415b-8f9b-5cadfb5e6831.png)
<div align="center">

RxSwift 4.x với **Variable**

</div>

![](https://images.viblo.asia/32d3940d-7fb8-4ff6-98a8-02ae5a99cf6c.png)
<div align="center">

RxSwift 5.x **Variable** được thay thế hoàn toàn bởi **BehaviorRelay**

</div>

### * **Bổ sung thêm do(on:) overloads**!
RxSwift hiện cung cấp không chỉ **do(onNext: )** mà còn sau khi overloads, chẳng hạn như **do(afterNext: ). onNext** đại diện cho thời điểm phần tử được phát ra, trong khi **afterNext**  đại diện cho thời điểm sau khi nó được phát ra.

![](https://images.viblo.asia/86f8418b-4b4e-48b6-9898-190137a2cf23.png)
<div align="center">

RxSwift 4.x với **do(onNext:onError:onCompleted:)**

</div>

![](https://images.viblo.asia/c862c3d6-c9ac-46e4-baa5-9af7268360ad.png)

<div align="center">

RxSwift 5.x với sự bổ sung **do(afterNext:afterError:afterCompleted:)**

</div>

### * **bind(to:) hỗ trợ multiple observers**!

![](https://images.viblo.asia/f7287cd9-1db8-414a-be20-1f8b9c425240.png)
<div align="center">

RxSwift 4 chỉ **binding** được  **1 observer** tại 1 thời điểm

</div>

![](https://images.viblo.asia/797a5efa-4b12-4520-8325-bd7d8387e121.png)

<div align="center">

RxSwift 5 có thể **binding**  **nhiều observers** trong cùng 1 thời điểm

</div>

### * **unwrap with compactMap**!

![](https://images.viblo.asia/31818066-6acd-4841-bd18-f3eec0a00332.png)
<div align="center">

**Unwrapping** các **Elements** trong RxSwift 4

</div>

![](https://images.viblo.asia/459a400a-6531-4c2a-a276-38c93e14da01.png)

<div align="center">

RxSwift 5.x sử dụng **compactMap** để **unwrap**. Rất gọn gàng

</div>

### * **toArray() now returns Single<T>**!

![](https://images.viblo.asia/41adb642-8387-42bf-bde0-785380cfa0b5.png)
<div align="center">

**toArray()** returns an **Observable<T>** in RxSwift 4.x

</div>


![](https://images.viblo.asia/e75373e4-e2c7-489e-917f-77a5b5145358.png)


<div align="center">

**toArray()** returns a **Single<T>** in RxSwift 5.x

</div>
    
### * **Xem xét lại toàn bộ cách đặt tên Generics**!
Ví dụ như **ObservableType.E** là thể hiện cho **generic type** của **Observable stream**.
Điều này vẫn ổn cho đến khi **O** thể hiện cho cả **Observable** và **Observer**, hoặc **S** thể hiện cho cả **Subject** và **Sequence**. Trong những hoàn cảnh khác nhau, điều này dễ gây nhầm lẫn cho các developer.

Việc đổi tên có ảnh hưởng nhất là **E** và **ElementType** thành **Element**.
    
![](https://images.viblo.asia/0c3e9b12-c181-4987-aaff-f7c778ec9a6b.png)
<div align="center">

Extending Observable in RxSwift 4 uses the **E** generic constraint

</div>
    
   ![](https://images.viblo.asia/d71ac3e8-fb73-4da3-b791-8cdd70418a5f.png)
    
<div align="center">

Extending Observable in RxSwift 5 uses the **Element** generic constraint

</div>

Danh sách các **Generics** được rename:
* **E** và **ElementType** được rename thành **Element**.
* **TraitType** được rename thành **Trait**.
* **SharedSequence.S** được rename thành **SharedSequence.SharingStrategy**.
* **O** được rename thành **Observer** và **Source** tuỳ nơi áp dụng.
* **C** và **S** được rename thành **Collection** và **Sequence** tương ứng.
* **S** được rename **Subject**.
* **R** được rename thành **Result**.
* **ReactiveCompatible.CompatibleType** được rename thành **ReactiveCompatible.ReactiveBase**.

    

-----


Hi vọng bài viết này đem lại những kiến thức hữu ích cho các bạn. ^^