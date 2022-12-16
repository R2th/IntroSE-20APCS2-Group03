Với *Android*, thuật ngữ `app compatibility`- khả năng tương thích ứng dụng, có nghĩa là ứng dụng của bạn chạy đúng / ổn định trên một phiên bản *android* cụ thể, thường là những phiên bản mới nhất. 

Với mỗi bản *release*, *Android* sẽ thực hiện các thay đổi tích hợp để cải thiện quyền riêng tư (*privacy*), bảo mật (*security*), đồng thời thực hiện các thay đổi nhằm nâng cao trải nghiệm người dùng trên tổng thể hệ điều hành. Đôi khi những thay đổi này có thể sẽ ảnh hưởng đến ứng dụng của bạn, vì vậy điều quan trọng là phải xem xét các thay đổi về hành vi (`behavior changes`) có trong mỗi bản *release*, kiểm tra chúng và *publish* những bản cập nhật khả năng tương thích cho người dùng.

## Tại sao `app compatibility` lại quan trọng?
Khả năng tương thích ứng dụng bắt đầu ảnh hưởng đến người dùng ngay lập tức khi họ cập nhật thiết bị *android* lên phiên bản *android* mới nhất (hoặc mới hơn). Nếu ứng dụng không hoạt động bình thường, điều này có thể gây ra các vấn đề lớn cho cả bạn và cả người dùng.
## Các loại thay đổi hành vi
Có 2 loại thay đổi hành vi `platform behavior changes` 
### Thay đổi cho toàn bộ các ứng dụng (`Changes for all apps`)
> Những thay đổi này ảnh hưởng đến tất cả các ứng dụng chạy trên phiên bản *Android* đó, bất kể bạn *set* `targetSdkVersion` của ứng dụng là bao nhiêu.

Với loại này, bạn nên chủ động kiểm tra khả năng tương thích của ứng dụng với những thay đổi này trong quá trình ra đời các bản `developer preview` và `beta release`. Vì người dùng *pixel* (và 1 số nhà cung cấp *Android* nguyên bản) có khả năng sẽ được trải nghiệm sớm, ngay khi những phiên bản *android* mới được *release*, nên việc chủ động kiểm tra những thay đổi sẽ giúp bạn đảm bảo cho người dùng của mình có thể chuyển đổi liền mạch sang phiên bản mới nhất trên các thiết bị này.
### Thay đổi mục tiêu (`Targeted changes`)
> Những thay đổi này chỉ ảnh hưởng đến các ứng dụng đang set `targetSdkVersion` đến phiên bản *Android* đó.

Với những thay đổi này, bạn nên thực hiện kiểm tra khả năng tương thích khi chuẩn bị thay đổi `targetSdkVersion` lên phiên bản *API* ổn định mới nhất (Ví dụ `API 30- Android 11` tại thời điểm này). Ngay cả khi bạn chưa có kế hoạch thay đổi `target` ngay lúc này, thì cũng nên nhớ rằng việc giải quyết những thay đổi này cần đòi hỏi một lượng thay đổi (*code*) đáng kể, vì vậy nên tìm hiểu càng sớm càng tốt, lý tưởng nhất là trong quá trình phát hành các bản `developer preview` và `beta release`, bạn có thể *test* sơ bộ và cung cấp phản hồi nếu có thể.

## Compatibility framework tools
Từ *Android 11*, có cung cấp những công cụ mới để giúp *developer* *test* và *debug* ứng dụng trước những thay đổi về hành vi trong các phiên bản mới hơn của *Android*. Các công cụ này là một phần của `compatibility framework` cho phép *developer* bật và tắt các thay đổi đột phá (`breaking changes`) một cách riêng lẻ, bằng cách sử dụng `Developer Options` hoặc `ADB command`. Việc sử dụng tính linh hoạt này có ích khi bạn chuẩn bị thay đổi `targetSdkVersion` lên phiên bản ổn định mới nhất của *Android* và kiểm tra ứng dụng của mình với các bản `preview release` của phiên bản mới tiếp theo.

*Android* tự động điều chỉnh *logic* bên trong, vì vậy bạn không cần thay đổi `targetSdkVersion` hoặc biên dịch lại ứng dụng để thực hiện *test* cơ bản. Vì các thay đổi có thể chuyển đổi riêng lẻ, bạn có thể cô lập, *test* và *debug* từng thay đổi hành vi. Hoặc vô hiệu hóa một thay đổi duy nhất gây lỗi nếu cần kiểm tra các thay đổi khác trước.

### Cách xác định những thay đổi nào được bật
Bạn có thể kiểm tra những thay đổi nào đang được bật bằng `developer options, logcat hoặc adb command`. Dùng *developer options* với *UI* trực quan hơn:

1. [Enable developer options](https://developer.android.com/studio/debug/dev-options#enable)
2. **System > Advanced > Developer options > App Compatibility Changes**

![](https://images.viblo.asia/dd32894a-6688-42ca-94af-c0363b2e9dd6.png)

3. Chọn ứng dụng từ danh sách.
Mỗi thay đổi hành vi (*behavior change*) thường thuộc một trong 2 mục
- (1) Những thay đổi ảnh hưởng để tất cả các ứng dụng, bất kể `targetSdkVersion`, mặc định chúng sẽ được bật (enabled) và liệt kê trong mục `Default Enabled Changes`.
- (2) Những thay đổi chỉ ảnh hưởng đối với ứng dụng đang *target* các phiên bản *Android* nhất định, chúng còn được gọi là những thay đổi được kiểm soát bởi `targetSdkVersion` (`gated by targetSdkVersion`). Những thay đổi này được mặc định bật nếu ứng dụng bạn đang *target* cao hơn phiên bản *API* được liệt kê. VD: Những thay đổi trong *android 11 (API 30)* sẽ được liệt kê trong mục `Enabled for targetSdkVersion > 29 (or >= 30)`.
- (3) Bạn cũng có thể thấy thêm 1 phần là `Default Disabled Changes` - Những thay đổi mặc định *disable* đối với tất cả các ứng dụng. Những thay đổi này có thể phục vụ cho nhiều mục đích khác nhau, trước khi bật/*enable* chúng hãy đọc phần mô tả.

![](https://images.viblo.asia/d41633b7-254c-4841-a2d8-e3a9548fb2f5.png)

### Khi nào nên bật/ tắt thay đổi (ON/OFF)
Mục đích chính của `compatibility framework` là cho phép bạn kiểm soát và linh hoạt để kiểm tra ứng dụng của mình với các phiên bản *Android* mới.
#### Nên tắt (OFF)
Việc quyết định tắt các thay đổi thường phụ thuộc vào việc thay đổi là loại `gated by targetSdkVersion` hay không.

**1. Đối với các thay đổi enable cho tất cả các ứng dụng**

Ví dụ, nếu bạn chuẩn bị *target android 11*, bạn sẽ bắt đầu cài ứng dụng trên *device/emulator* chạy *android 11* và *test* nó. Nếu ứng dụng gặp lỗi (chạy ổn trên các phiên bản trước đó), bạn có thể vào và *disable (OFF)* những thay đổi mà gây lỗi đó để có thể tiếp tục *test* các lỗi khác (Những thay đổi trong mục `(1) Default Enabled Changes` nêu ở trên).

![Screenshot from 2021-07-14 15-08-32.png](https://images.viblo.asia/e37f71b9-5e40-4544-bddb-a4ad33822b17.png)

Vì những thay đổi này áp dụng cho toàn bộ ứng dụng bất kể `targetSdkVersion`, bạn nên *test* và *update* ứng dụng cho những thay đổi này trước những thay đổi `gated by targetSdkVersion`. Điều này đảm bảo rằng *user* của bạn sẽ không bị lỗi khi họ *upgrade* thiết bị của họ lên phiên bản *android* mới.

Bạn nên ưu tiên *test* những thay đổi này vì bạn sẽ không thể tắt (*OFF*) chúng khi *Android public* bản *release*. Lý tưởng nhất thì bạn nên *test* những thay đổi này khi phiên bản này còn đang là bản `preview`.

**2. Những thay đổi `gated by targetSdkVersion`**

Nếu ứng dụng nhắm đến một phiên bản cụ thể, bất cứ thay đổi nào được `gated` (kiểm soát) bởi phiên bản đó sẽ mặc định được *enable*. Vì vậy, nếu bạn thay đổi `targetSdkVersion` của ứng dụng, một loạt các thay đổi sẽ ảnh hưởng đến ứng dụng cùng lúc. Vì thế  bạn nên tắt những thay đổi này lần lượt từng cái khi *test* và *debug* ứng dụng.

VD: Khi chạy ứng dụng *targetSdkVersion 30* trên device *API 31*.

![Screenshot from 2021-07-14 15-12-35.png](https://images.viblo.asia/64aaf8b4-1d4b-4a9e-a5e5-62806d591be4.png)

#### Nên bật (ON)
Những thay đổi bị kiểm soát bởi một phiên bản cụ thể `gated by targetSdkVersion` mặc định sẽ *disable* khi một ứng dụng để *target version* thấp hơn (*gated version*). Thông thường khi chuẩn bị *target* một phiên bản mới, bạn cần phải *list* những thay đổi hành vi mà bạn cần *test* và *debug*.

VD: Khi chạy ứng dụng *targetSdkVersion 30* trên *device API 31*. Các thay đổi trên *API 31* mặc định sẽ *disable*.

![Screenshot from 2021-07-14 15-17-06.png](https://images.viblo.asia/9c850534-32e5-40be-ae5b-fcc548d3889a.png)

Sau khi bật thay đổi, nếu ứng dụng bị lỗi, kiểm tra *log* để xem nguyên nhân, nếu *log* không thực sự rõ ràng thì có thể *disable* lại và *test* lại vùng thay đổi đó để có thể khẳng định lỗi là do sự thay đổi này.

**REFERENCES**
- https://developer.android.com/guide/app-compatibility