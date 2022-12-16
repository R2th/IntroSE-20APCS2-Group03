Sau khi ứng dụng của bạn xuất hiện trên Google Play, xếp hạng và đánh giá ứng dụng là những yếu tố rất quan trọng để thúc đẩy nhiều lượt tải xuống hơn.

Để đạt được điều này, chúng ta thường yêu cầu người dùng đánh giá ứng dụng bằng cách hiển thị hộp thoại có một vài nút và chuyển hướng họ đến Google Play.

Với trải nghiệm này, có khả năng người dùng sẽ không quay lại ứng dụng của bạn nữa sau khi được chuyển hướng đến Google Play. 

Ngoài ra, một người dùng mới bắt đầu cảm thấy khó đánh giá ứng dụng trên Google Play.

May mắn thay, Google đã cung cấp một API gọi là [In-App Review](https://developer.android.com/guide/playcore/in-app-review) để hiển thị tiện ích xếp hạng trong chính ứng dụng mà người dùng không cần rời khỏi ứng dụng.

In-App Review là một phần của thư viện Android.

Khi nó được tích hợp, chúng ta có thể thấy giao diện đánh giá app được hiển thị như sau :

![](https://images.viblo.asia/13bd4ef6-b82b-4820-985b-ea78e58c6e94.jpg)

## Thông tin chung về In-App Review API

- Đánh giá trong ứng dụng chỉ hoạt động trên các thiết bị Android chạy Android 5.0 (API cấp 21) trở lên đã cài đặt Google Play.

- API đánh giá trong ứng dụng phải tuân theo hạn ngạch. API quyết định tần suất hiển thị tiện ích đánh giá cho người dùng. 
Chúng ta không nên gọi API này thường xuyên vì sau khi đạt đến hạn ngạch người dùng, giao diện  sẽ không được hiển thị cho người dùng, điều này có thể ảnh hưởng đến trải nghiệm người dùng. 

- Quy trình đánh giá sẽ được kiểm soát bởi chính API. Chúng ta không nên cố gắng thay đổi thiết kế hoặc đặt nội dung phù hợp lên trên giao diện của nó. 

- Quy trình đánh giá không cho biết liệu người dùng đã xem xét ứng dụng hay chưa, thậm chí nó sẽ không cho chúng ta biết liệu giao diện đã hiển thị cho người dùng hay chưa.

## Tích hợp In-App Review API

1. In-App Review API là một phần của Play Core API, vì vậy bạn phải đưa thư viện vào build.gradle của ứng dụng. 

Ở đây tôi đang thêm thư viện Material Design cũng như tôi muốn hiển thị hộp thoại xếp hạng dự phòng nếu có bất kỳ lỗi nào trong In-App Review API.

**app/build.gradle**

```
// Play core library
implementation "com.google.android.play:core:1.8.0"
 
// optional material library to show the fallback rate us dialog
implementation "com.google.android.material:material:1.3.0-alpha02"
```

2. Bước tiếp theo là tạo biến của ReviewManager. Lớp này cung cấp các phương thức cần thiết để bắt đầu luồng review.

Khi biến được tạo ra, chúng ta cần gọi requestReviewFlow() để trả về đối tượng ReviewInfo khi đánh giá thành công.

Sử dụng đối tượng ReviewInfo, chúng ta cần gọi phương thức launchReviewFlow () để bắt đầu luồng đánh giá.

Vì một số lý do, nếu requestReviewFlow() không thành công, chúng ta có thể khởi chạy hộp thoại Xếp hạng ứng dụng thông thường chuyển hướng người dùng đến Google Play.

Dưới đây, phương thức showRateApp() bắt đầu quy trình đánh giá trong ứng dụng. 
Phương thức showRateAppFallbackDialog() hoạt động như phương thức dự phòng nếu requestReviewFlow gây ra lỗi. 

Phương thức dự phòng này hiển thị hộp thoại material thông thường với ba nút để chuyển hướng người dùng đến ứng dụng Google Play.

**MainActivity.java**

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

![](https://images.viblo.asia/399806a1-bef8-457c-b6bb-d63fe712096b.jpg)


## Tổng kết

Như vậy, trong bài viết này mình đã hướng dẫn các bạn sử dụng [In-App Review](https://developer.android.com/guide/playcore/in-app-review) để hiển thị tiện ích xếp hạng trong chính ứng dụng mà người dùng không cần rời khỏi ứng dụng.

Đây là một API rất hay, giúp đỡ các bạn rất nhiều trong việc thăng hạng App của mình trên Google Play.