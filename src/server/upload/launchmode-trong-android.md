## I. Task
Trước khi đi vào tìm hiểu launchMode thì chúng ta sẽ đi qua khái niệm Task:<br>Task là tập hợp gồm nhiều activity mà người dùng tương tác với ứng dụng khi thực hiện một công việc nhất định. Các activity được sắp xếp trong một stack (được gọi là Back stack), theo thứ tự mở của mỗi activity.
## II. LaunchMode
Có 4 **launchMode** khác nhau mà bạn có thể sử dụng: `standard`, `singleTop`, `singleTask`, `singleInstance`. Tùy vào mục đích sử dụng như là tạo mới hay sử dụng lại `activity` đã có trước đó mà bạn sẽ sử dụng launchMode sao cho phù hợp. 
#### Sử dụng launchMode
Khi bạn khai báo một activity trong file `AndroidManifest.xml`, bạn có thể chỉ định cách activity sẽ liên kết với các task như nào khi nó được khởi chạy.
<br>Ví dụ:
```
<activity android:name=".Activity_A" android:launchMode="standard">
```
#### Sử dụng Intent Flags
Ngoài việc khai báo launchMode trong `AndroidManifest.xml` thì bạn có thể sử dụng **Intent Flags** khi `startActivity()`.
<br>Ví dụ:
```
Intent intent = new Intent(Activity_A.this, Activity_A.class);
intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
startActivity(intent);
```
Chúng ta sẽ cùng tìm hiểu cụ thể từng launchMode nhé.

### 1. Standard (Mặc định)
Đây là chế độ mặc định. Ở `standard`, khi activity được khởi tạo, activity mới sẽ được đặt lên **đỉnh của stack  trong cùng 1 task.**

**Ví dụ:**

Giả sử mình có 4 activity đều được khai báo là `standard`: Activity_A, Activity_B, Activity_C, Activity_D.
| Ví dụ 1 | Ví dụ 2 |
| -------- | -------- |
| Khi mình start B, C, D, A từ A thì trong cùng 1 task của mình đang có 5 activities.  | Vậy nếu mình tiếp tục start A thì sao? Khi đó trong cùng 1 task của mình đang có 6 activities. | 
|![](https://images.viblo.asia/8cd1f2b2-cde8-46c3-8a39-062427a320f9.PNG)| ![](https://images.viblo.asia/230f8003-572b-4f82-8b73-41f7fcdfeb68.PNG) |
| - Thứ tự được xếp vào stack sẽ là: <br>A (Base) -> B -> C -> D -> A (Top).<br>- Khi đó số lượng Instance của A: 2 | - Thứ tự được xếp vào stack sẽ là:<br>A (Base) -> B -> C -> D -> A -> A (Top).<br>- Khi đó số lượng Instance của A: 3 |
<br>Thông qua ví dụ trên, chắc bạn đã hiểu cơ chế hoạt động của `standard` như nào rồi đúng không ạ? Thực chất chỉ là việc xếp chồng các `activity` vào `stack` trong cùng 1 task bất kể nó đã tồn tại Instance trước đó hay chưa.
<br> Một số bạn sẽ thắc mắc là tại sao mình nói là chỉ có 1 task mà trong hình ví dụ ở trên lại ghi task là 2. Thì ngay sau khi app của chúng ta được run thì hệ thống đã có 1 root task rồi nhé.

### 2. SingleTop
Cơ chế hoạt động của `singleTop`  khá là giống với `standard`. Tuy nhiên, ở `singleTop` nếu tồn tại 1 Instance của activity cùng loại ở đỉnh của stack. Nó sẽ không tạo activity mới, hệ thống sẽ đưa Intent tới Instance qua lời gọi tới phương thức `onNewIntent()` . 

**Ví dụ:**
<br>Giả sử mình có 1 activity được khai báo là `singleTop`: Activity_A
<br>và 3 activity được khai báo là `standard`: Activity_B, Activity_C,  Activity_D.
| Ví dụ 1 | Ví dụ 2 |
| -------- | -------- |
| Khi mình start B, B, C, D, A  từ A thì trong cùng 1 task của mình đang có 6 activities. | Vậy nếu mình tiếp tục start A thì sao? Khi đó trong cùng 1 task của mình đang có 6 activities. | 
|![](https://images.viblo.asia/583b0d17-9441-451c-a5a9-460e315853b6.PNG)| ![](https://images.viblo.asia/2730a424-89cd-45ed-8ad1-d5232a6b5b8b.PNG) |
| - Thứ tự được xếp vào stack sẽ là:<br>A (Base) -> B -> B  -> C -> D -> A (Top).<br>- Khi đó số lượng Instance của A: 2 | - Thứ tự được xếp vào stack giữ nguyên là:<br>A (Base) -> B -> B -> C -> D -> A (Top).<br>- Khi đó số lượng Instance của A: 2 |

### 3. SingleTask
* Mỗi activity chỉ có 1 Instance tại một thời điểm, nếu activity đã tồn tại Instance thì task chứa activity đó sẽ được đẩy lên đầu, và Instance sẽ được gọi thông qua `onNewIntent()`. Nếu chưa tồn tại Instance nào của Activity thì một task mới sẽ được tạo ra để chứa nó. 
* Nếu trong cùng 1 task, khi gọi đến Instance của activity khai báo `singleTask` thì tất cả các activity đặt trên nó ở trong stack sẽ bị xóa đi.

Tuy nhiên, trong thực tế `singleTask` sẽ không hoạt động như vậy. Và để singleTask hoạt động đúng như mô tả thì bạn cần gán thêm thuộc tính taskAffinity (đầu vào là một string định nghĩa Affinity name).

```
<activity android:name=".Activity_B" android:launchMode="singleTask"
   android:taskAffinity=""/>
```
Mặc định thì các activity trong 1 application có cùng affinity của root activity (package name)

**Ví dụ:**
<br>Giả sử mình có 1 activity được khai báo là `singleTop`: Activity_A,
<br>1 activity được khai báo là `singleTask`: Activity_B
<br>và 2 activity được khai báo là `standard`: Activity_C, Activity_D.
* Trường hợp **không** có `taskAffinity`:

| Ví dụ 1 | Ví dụ 2 |
| -------- | -------- |
| Khi mình start B, C, D, A  từ A thì trong cùng 1 task của mình đang có 5 activities. | Vậy mình sẽ tiếp tục start B thì sao?Khi đó trong cùng 1 task của mình đang có 2 activities | 
|![](https://images.viblo.asia/4b75b12c-6770-4360-9105-669ad17fe05f.PNG)| ![](https://images.viblo.asia/c47bbd77-71bb-494c-81d3-727fd2bedc3a.PNG) |
| - Thứ tự được xếp vào stack sẽ là:<br>A (Base) -> B  -> C -> D -> A (Top).<br>- Khi đó:<br>+ số lượng task: 1<br>+ số lượng Instance của A: 2<br>+ số lượng instance của B: 1 | - Thứ tự được xếp vào stack sẽ là:<br>A (Base) -> B (Top).<br>- Khi đó:<br>+ số lượng task: 1<br>+ số lượng Instance của A: 1<br>+ số lượng instance của B: 1 |
* Trường hợp **có** `taskAffinity`:

| Ví dụ 1 | Ví dụ 2 |
| -------- | -------- |
| Khi mình start B, C, D, A  từ A | Vậy mình sẽ tiếp tục start B thì sao? | 
|![](https://images.viblo.asia/5fe37b38-7f24-42dd-891b-b8ef36d3b18e.PNG)|![](https://images.viblo.asia/fe2adc6d-aeb1-4791-85fa-c3ee6c5841f6.PNG) |
|- Thứ tự được xếp vào stack sẽ là:<br>+ Task 1: A (Base-Top)<br>+ Task 2: B (Base) -> C -> D -> A (Top).<br>- Khi đó:<br>+ số lượng task: 2<br>+ số lượng Instance của A: 2<br>+ số lượng instance của B: 1 | - Thứ tự được xếp vào stack sẽ là:<br>+ Task 1: A (Base-Top)<br>+ Task 2: B (Base-Top)<br>- Khi đó:<br>+ số lượng task: 2<br>+ số lượng Instance của A: 1<br>+ số lượng instance của B: 1<br> |

### 4. SingleInstance
Khá là giống với `singleTask`, ngoại trừ việc hệ thống sẽ không đưa thêm bất kì activity nào vào task đang giữ Instance của activity đó. Tức là mỗi task chỉ có thể có duy nhất một activity. Nếu bất kì activity nào khác được khởi tạo thì nó sẽ được khởi tạo ở task khác.

**Ví dụ:**
<br>Giả sử mình có 2 activity được khai báo là `singleInstance`: Activity_A, Activity_C
<br>1 activity được khai báo là `singleTask`: Activity_B
<br>và 1 activity được khai báo là `standard`: Activity_D.
* Trường hợp **không** có `taskAffinity`:

| Ví dụ 1 | Ví dụ 2 |
| -------- | -------- |
| Khi mình start B, C, A từ A  | Tiếp tục start D, A thì sao? Khi đó D sẽ được tạo từ B | 
|![](https://images.viblo.asia/900729a9-86e4-4e2d-a0e6-547de6500803.PNG)|![](https://images.viblo.asia/de95a26e-1c56-4a1d-96c8-e89c53c3adae.PNG)|
| - Thứ tự được xếp vào stack sẽ là:<br>+ Task 1 (Task Id 43): A (Base-Top)<br>+ Task 2 (Task Id 46): B (Base-Top)<br>+ Task 3 (Task Id 45): C (Base-Top)<br>- Khi đó:<br>+ số lượng task: 3<br>+ số lượng Instance của A: 1<br>+ số lượng instance của C: 1<br> | - Thứ tự được xếp vào stack sẽ là:<br>+ Task 1 (Task Id 43): A (Base-Top)<br>+ Task 2 (Task Id 46): B (Base) -> D (Top)<br>+ Task 3 (Task Id 45): C (Base-Top)<br>- Khi đó:<br>+ số lượng task: 3<br>+ số lượng Instance của A: 1<br>+ số lượng instance của C: 1 |
<br>Ở ví dụ trên bạn có thể thấy có 3 task nhưng chỉ hiện duy nhất 1 task trong Task Manager. Để giải quyết vấn đề trên thì chúng ta sẽ sử dụng  `taskAffinity` tương tự với `singleTask` đã nêu ở phần trên. 
## III. Kết luận
Trên đây là một số kiến thức mà mình tổng hợp được, mình hi vọng thông qua đó mà các bạn có thể hiểu được cơ chế hoạt động của launchMode để có thể linh hoạt trong thiết kế và điều hướng activity sao cho phù hợp với ứng dụng. Mình rất mong nhận được góp ý từ bạn đọc. Xin cảm ơn.
<br><br>Tài liệu tham khảo:
*  Android docs: https://developer.android.com/guide/components/activities/tasks-and-back-stack
*  Blog: https://inthecheesefactory.com/blog/understand-android-activity-launchmode/en