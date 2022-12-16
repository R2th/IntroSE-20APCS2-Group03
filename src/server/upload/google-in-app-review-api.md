Trước đây với các ứng dụng Android, khi người dùng muốn đánh giá và viết review cho bất kỳ ứng dụng nào thì đều phải vào CHplay và chọn đúng ứng dụng cần viết rồi mới có thể làm các thao tác cần thiết để đăng review, rating hay chỉnh sửa comment trên đó. Điều đó đã thay đổi kể từ khi Google cung cấp cho develop một cung cụ hỗ trợ mới: Google In-app Review API.

API này giúp cho người dùng có thể gửi đi đánh giá và xếp hạng cho ứng dụng của bạn mà không phải chuyển qua CHplay nữa. Việc này không chỉ giúp bạn thu thập được những đánh giá hữu ích trong quá trình phát triển sản phẩm của mình. Đồng thời cũng không gây khó khăn gì hay làm ảnh hưởng tới trai nghiệm của người dùng khi đang sử dụng ứng dụng cả. 

![](https://images.viblo.asia/21a730f8-6951-4b14-998f-97f001944fee.jpg)

### Yêu cầu về device:

* In-app review API chỉ hoạt động trên các thiết bị từ Android 5.0 (API 21) trở lên hoặc cài đặt Chrome OS  và có cài đặt Google Play Store.
* Để thêm API này vào ứng dụng của bạn, ứng dụng của bạn phải sử dụng Play Core với version tối thiểu là 1.8.0

### Khi nào thì nên request một in-app review:

* Trigger in-app review trong ứng dụng sau khi người dùng đã trải nghiệm đủ ứng dụng của bạn để đưa ra phản hồi hữu ích.
* Đừng nhắc người dùng xem xét việc đánh giá này quá nhiều. In-app review API có hạn ngạch nhất định, bình thường là chỉ duy nhất được gọi API này một lần mỗi tháng (thay đổi do Google sẽ không báo trước). Chúng ta không nên gọi APi này thường xuyên vì làm như vậy sẽ tránh làm phiền và gây cảm giác không tốt về ứng dụng của bạn.
* Ứng dụng của bạn không nên hỏi người dùng bất kỳ câu hỏi nào trước hoặc trong khi hiển thị giao diện review của API.

### Hướng dẫn về design:

* Không nên cố gắng thay đổi thiết kế hoặc đặt nội dung bất kỳ lên trên giao diện của nó, bao gồm việc thay đổi kích thước, độ mờ, hình dạng hay bất kỳ thuộc tính nào khác.
* Khi đã hiển thị giao diện của In-app review thì không nên để bất kỳ view nào đè lên hoặc che khuất, giao diện API phải được đặt ở trên cùng. Giao diện API sẽ được loại bỏ dựa theo hành động của người dùng hoặc cơ chế nội bộ của Play Store. Không nên cố gắng tự review nó.

Bên trên là các quy tắc cần tuân thủ để sử dụng In-app review APi. Việc implement API này sẽ được trình bày chi tiết bên dưới đây.

### Tích hợp in-app review API

#### 1. Tạo ReviewManager
ReviewManager là giao diện cho phép ứng dụng của bạn bắt đầu luồng in-app review.

```
ReviewManager manager = ReviewManagerFactory.create(context)
```

#### 2. Request a ReviewInfo object
Trước tiên phải chú ý về thời điểm để gọi In-app review API như đã trình bày ở phần trên.
Sử dụng ReviewManager để tạo một yêu cầu. Nếu thành công, API trả về đối tượng ReviewInfo cần thiết để bắt đầu in-app review

```
ReviewManager manager = ReviewManagerFactory.create(this);
Task<ReviewInfo> request = manager.requestReviewFlow();
request.addOnCompleteListener(task -> {
    if (task.isSuccessful()) {
        // We can get the ReviewInfo object
        ReviewInfo reviewInfo = task.getResult();
    } else {
        // There was some problem, continue regardless of the result.
    }
});
```

Vì một số lý do, nếu requestReviewFlow() không thành công, chúng ta có thể khởi chạy hộp thoại Xếp hạng ứng dụng thông thường chuyển hướng người dùng đến Google Play.

#### 3. Khởi chạy luồng in-app review
Sử dụng ReviewInfo để khởi chạy luồng in-app review. Chờ cho đến khi người dùng hoàn thành việc đánh giá trong ứng dụng trước khi ứng dụng của bạn tiếp tục quy trình người dùng bình thường.
```
Task<Void> flow = manager.launchReviewFlow(activity, reviewInfo);
flow.addOnCompleteListener(task -> {
    // The flow has finished. The API does not indicate whether the user
    // reviewed or not, or even whether the review dialog was shown. Thus, no
    // matter the result, we continue our app flow.
});
```


Dưới đây là ví dụ demo nhỏ để sử dụng In-app review APi theo cách đã hướng dẫn ở trên:

```
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import com.google.android.play.core.tasks.Task;
 
public class MainActivity extends AppCompatActivity {
 
    private ReviewManager reviewManager;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        init();
    }
 
    private void init() {
        reviewManager = ReviewManagerFactory.create(this);
 
        findViewById(R.id.btn_rate_app).setOnClickListener(view -> showRateApp());
    }
 
    /**
     * Shows rate app bottom sheet using In-App review API
     * The bottom sheet might or might not shown depending on the Quotas and limitations
     * https://developer.android.com/guide/playcore/in-app-review#quotas
     * We show fallback dialog if there is any error
     */
    public void showRateApp() {
        Task<ReviewInfo> request = reviewManager.requestReviewFlow();
        request.addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                // We can get the ReviewInfo object
                ReviewInfo reviewInfo = task.getResult();
 
                Task<Void> flow = reviewManager.launchReviewFlow(this, reviewInfo);
                flow.addOnCompleteListener(task1 -> {
                    // The flow has finished. The API does not indicate whether the user
                    // reviewed or not, or even whether the review dialog was shown. Thus, no
                    // matter the result, we continue our app flow.
                });
            } else {
                // There was some problem, continue regardless of the result.
                // show native rate app dialog on error
                showRateAppFallbackDialog();
            }
        });
    }
 
    /**
     * Showing native dialog with three buttons to review the app
     * Redirect user to playstore to review the app
     */
    private void showRateAppFallbackDialog() {
        new MaterialAlertDialogBuilder(this)
                .setTitle(R.string.rate_app_title)
                .setMessage(R.string.rate_app_message)
                .setPositiveButton(R.string.rate_btn_pos, (dialog, which) -> {
 
                })
                .setNegativeButton(R.string.rate_btn_neg,
                        (dialog, which) -> {
                        })
                .setNeutralButton(R.string.rate_btn_nut,
                        (dialog, which) -> {
                        })
                .setOnDismissListener(dialog -> {
                })
                .show();
    }
}
```

![](https://images.viblo.asia/5042fba9-5985-4b86-bb0b-856175bd0bce.jpg)