# Giới thiệu
Lần trước tôi đã hướng dẫn change background động dựa theo nội dung đang chọn, Hôm nay tôi sẽ giới thiệu về **ErrorSupportFragment**, đây cũng là một component rất hay được sử dụng trong một ứng dụng Tivi

**ErrorSupportFragment** là một layout được cung cấp bở thư viện leanback, Dùng để hiển thị các thông báo lỗi về mạng, kết nối...
# Implement
Tạo ErrorSupportActivity, ở đây chúng ta sẽ không sử dụng layout cho activity này
```
public class ErrorActivity extends Activity {
 
    private static final String TAG = ErrorActivity.class.getSimpleName();
 
    private ErrorFragment mErrorFragment;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        testError();
    }
 
    private void testError() {
        mErrorFragment = new ErrorFragment();
        getFragmentManager().beginTransaction().add(R.id.main_browse_fragment, mErrorFragment).commit();
    }
}
```
Tạo ErrorFragment extends từ ErrorSupportFragment của thư viện LeanBack
```
public class ErrorFragment extends android.support.v17.leanback.app.ErrorFragment {
 
    private static final String TAG = ErrorFragment.class.getSimpleName();
    private static final boolean TRANSLUCENT = true;
 
    @Override
    public void onCreate(Bundle savedInstanceState) {
        Log.d(TAG, "onCreate");
        super.onCreate(savedInstanceState);
        
        setTitle(getResources().getString(R.string.app_name));
        setErrorContent();
    }
 
    void setErrorContent() {
        setImageDrawable(getActivity().getDrawable(R.drawable.lb_ic_sad_cloud));
        setMessage(getResources().getString(R.string.error_fragment_message));
        setDefaultBackground(TRANSLUCENT);
 
        setButtonText(getResources().getString(R.string.dismiss_error));
        setButtonClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View arg0) {
                getFragmentManager().beginTransaction().remove(ErrorFragment.this).commit();
            }
        });
    }
}
```
Nhớ add ErrorActivity vào manifest
```
    <application>
    ...
 
        <activity android:name=".ErrorActivity" />
    </application>
```
# Sử dụng ErrorFragment
Ở đây tôi sẽ show ErrorFragment mỗi khi click vào một item trong MainFragment
```
MainFragment - ItemViewClickedListenerJava
        @Override
        public void onItemClicked(Presenter.ViewHolder itemViewHolder, Object item, RowPresenter.ViewHolder rowViewHolder, Row row) {
            Intent intent = new Intent(getActivity(), ErrorActivity.class);
            startActivity(intent);
        }

```
# Build and run
![](https://images.viblo.asia/091b5223-754a-4d12-bbc8-dcbbe98e883d.png)

Cảm ơn các bạn đã theo dõi

**Nguồn**: http://corochann.com/android-tv-application-hands-on-tutorial-6-153.html