**GIỚI THIỆU**
 
 Mình xin phép sử dụng Floatingsearchview của tác giả arimorty. <br>Đây là một material search view được giới lập trình đánh giá khá cao.<br> Các bạn có thể xem tại Github: https://github.com/arimorty/floatingsearchview
 
 Mình sẽ sử dụng thư viện retrofit để truy cập mạng. À hiện tại thì retrofit có sẵn okhttp rồi nên các bạn khỏi tải thêm :grinning::grinning:<br>
 Đây là một thư viện mạnh mẽ để sử lý các tác vụ liên quan đến webAPI.<br>
 Các bạn có thể xem tại https://square.github.io/retrofit/
 
 Trong bài này yêu cầu bạn cần có kiến thức về Interface, xử lý bất đồng bộ (ASYN), okhttp, JSON.
 
**TIẾN HÀNH**

Đầu tiên mình sẽ implementation 2 thư viện floatingsearchview và retrofit2
```
dependencies {
    implementation 'com.github.arimorty:floatingsearchview:2.1.1'
    implementation 'com.squareup.retrofit2:retrofit:2.5.0'
}
```
Trong phần drawable mình sẽ thêm ảnh "voice". Các bạn có thể lấy ảnh từ trong chính thư viên đó tại đây https://github.com/arimorty/floatingsearchview/blob/master/sample/src/main/res/drawable-hdpi/ic_keyboard_voice_black_24dp.png <br> và mình tạo flie menu_search_view <br>
```
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools" tools:context=".MainActivity">
    <item android:id="@+id/action_voice_rec"
        android:title="voice"
        android:orderInCategory="1"
        app:showAsAction="always"
        android:icon="@drawable/ic_keyboard_voice_black_24dp"/>
</menu>
```

Ở activity_main ( Ở đây mình sử dụng androidx :grinning:)
```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.arlib.floatingsearchview.FloatingSearchView
        android:id="@+id/floating_search_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:floatingSearch_searchBarMarginLeft="@dimen/search_view_inset"
        app:floatingSearch_searchBarMarginTop="@dimen/search_view_inset"
        app:floatingSearch_searchBarMarginRight="@dimen/search_view_inset"
        app:floatingSearch_searchHint="Search..."
        app:floatingSearch_suggestionsListAnimDuration="250"
        app:floatingSearch_showSearchKey="true"
        app:floatingSearch_leftActionMode="showHamburger"
        app:floatingSearch_menu="@menu/menu_search_view"
        app:floatingSearch_close_search_on_keyboard_dismiss="true">
    </com.arlib.floatingsearchview.FloatingSearchView>
</androidx.constraintlayout.widget.ConstraintLayout>
```
Mình sẽ giải thích một tí ở chỗ này <br>
```
 app:floatingSearch_showSearchKey="true"
```
Dòng này giúp bàn phím hiển thị phím "searchkey" <br>
```
 app:floatingSearch_leftActionMode="showHamburger"
```
"showHamburger" dùng cho bạn nào có sử dụng nav nhé.
<br> 
![](https://images.viblo.asia/5f90e8d4-2c26-4bd5-a686-ffabcf2b7f58.gif) <br>
showSearch<br> ![](https://images.viblo.asia/578fd5d5-c66d-49d5-accc-971c5273fb2c.gif)<br>
showHome<br>![](https://images.viblo.asia/31079d59-edcf-4df0-ba6e-505577214a6a.gif)<br>
noLeftAction<br>![](https://images.viblo.asia/b9d109e6-13ae-4ae4-ac4c-600285b6fa4f.gif)<br>
```
 app:floatingSearch_menu="@menu/menu_search_view"
```
Dòng này để đưa button voice lên thanh searchview<br>
Vậy phần tạo giao diện đã xong. 

Trong MainActivity.java <br>
Đầu tiên mình sẽ ánh xạ thanh searchview và button voice
```
 @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mSearchView = findViewById(R.id.floating_search_view);
        
        //Mình sẽ giải thích hàm này ở phía dưới
        checkVoiceRecognition();
        
        //button voice
        mSearchView.setOnMenuItemClickListener(new FloatingSearchView.OnMenuItemClickListener() {
            @Override
            public void onActionMenuItemSelected(MenuItem item) {
                if (item.getItemId() == R.id.action_voice_rec)
                {
                    Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                    intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                            RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);    
                            
                    startActivityForResult(intent, 0);
                }
            }
        });
```
Và mình cần Override hàm onActivityResult để nhận kết quả trả về từ intent <br>
```
 @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        if (requestCode == 0 && resultCode == RESULT_OK) {
            ArrayList<String> results = data.getStringArrayListExtra(
                    RecognizerIntent.EXTRA_RESULTS);
            mSearchView.setSearchFocused(true);
            mSearchView.setSearchText(results.get(0));
        }
        super.onActivityResult(requestCode, resultCode, data);
    }
```
Đôi khi một số quốc gia không hỗ trợ speech to text nên bạn cần hàm kiểm tra
```
public void checkVoiceRecognition() {
        // Check if voice recognition is present
        PackageManager pm = getPackageManager();
        List<ResolveInfo> activities = pm.queryIntentActivities(new Intent(
                RecognizerIntent.ACTION_RECOGNIZE_SPEECH), 0);
        if (activities.size() == 0) {
            Toast.makeText(this, "Voice recognizer not present",
                    Toast.LENGTH_SHORT).show();
        }
    }
```
Và trong hàm onCreate mình sẽ đặt sự kiện cho thanh searchview 
```
mSearchView.setOnQueryChangeListener(new FloatingSearchView.OnQueryChangeListener() {
            @Override
            public void onSearchTextChanged(String oldQuery, String newQuery) {
                if (!oldQuery.equals("") && newQuery.equals("")) {
                    mSearchView.clearSuggestions();
                } else {
                    
          // CHỖ NÀY ĐỢI MÌNH TÍ
                
                }
            }
        });
```
Ý tưởng khi người dùng nhập kí tự liên tiếp, chúng ta cần "suggest" khi người dùng nhập xong ở kí tự cuối. Để giải quyết việc này mình sẽ sử dụng ASYN. Tạo một khoản thời gian đợi nếu người dùng không gõ thêm kí tự gì thì sẽ xử lý. <br>
Vì sử dụng ASYN nên mình dùng Interface để truyền dữ liệu từ asyn.java sang MainActivity.java<br>
Vì để xây dựng suggestion trên floatingsearchview, thư viện yêu cầu trả về đối tượng là List<class> với class được implements SearchSuggestion. <br><br>
    Tạo class Suggestion.java <br>
```
import android.annotation.SuppressLint;
import android.os.Parcel;

import com.arlib.floatingsearchview.suggestions.model.SearchSuggestion;

@SuppressLint("ParcelCreator")
public class Suggestion implements SearchSuggestion {
    private String mName;
    private boolean mIsHistory = false;

    public Suggestion(String mName) {
        this.mName = mName.toLowerCase();
    }

    public void setIsHistory(boolean isHistory) {
        this.mIsHistory = isHistory;
    }

    public boolean getIsHistory() {
        return this.mIsHistory;
    }

    @Override
    public String getBody() {
        return mName;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {

    }
}
```
Tạo class asyn.java<br>
    Mình sẽ giải thích trong code luôn.
```
import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class asyn extends AsyncTask<String, Void, String> {
    
    //Đây là interface khi suggestion được xây dựng xong nó sẽ gọi tới hàm trong MainActivity.java
    MakeSuggestion makeSuggestion ;
       
    public asyn(MakeSuggestion makeSuggestion) {
        this.makeSuggestion = makeSuggestion;
    }
    
    private List<Suggestion> suggestions = new ArrayList<>();

    // Xây dựng okhttp
    OkHttpClient okHttpClient = new OkHttpClient.Builder()
            .connectTimeout(20, TimeUnit.SECONDS)
            .writeTimeout(20, TimeUnit.SECONDS)
            .readTimeout(20, TimeUnit.SECONDS)
            .retryOnConnectionFailure(true)
            .build();

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        try {
    
    //arr_main chính là từ khoá bạn muốn được suggest
    // arr_sub chính là kết quả suggest được trả về từ google
            JSONArray arr_main = new JSONArray(s);
            JSONArray arr_sub = new JSONArray(arr_main.getString(1));
            for (int i = 0; i < arr_sub.length(); i++) {
                suggestions.add(new Suggestion(arr_sub.getString(i))) ;
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        //gởi dữ liệu sang MainActivity.java
        makeSuggestion.getSuggestion(suggestions);
    }

    @Override
    protected String doInBackground(String... strings) {
        try {
            //Thời gian chờ xem thừ người dùng có nhập thêm kí tự nữa hay không.                                                           
            Thread.sleep(250);
                                                                           
            Request request = new Request.Builder()
                    .url(strings[0])
                    .build();
            Response response = okHttpClient.newCall(request).execute();
            return response.body().string();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```
  Tạo MakeSuggtion Interface để truyền dữ liệu <br>
```
import java.util.List;

public interface MakeSuggestion {
    void getSuggestion (List<Suggestion> suggestions) ;
}
```
Quay lại MainActivity.java mình sẽ implements MakeSuggestion và override void getSuggestion,
```
@Override
    public void getSuggestion(List<Suggestion> suggestions) {
     
        mSearchView.swapSuggestions(suggestions);
        mSearchView.hideProgress();
    }
```
và trong phần else mình để ở trên mình sẽ thêm 
```
mSearchView.setOnQueryChangeListener(new FloatingSearchView.OnQueryChangeListener() {
            @Override
            public void onSearchTextChanged(String oldQuery, String newQuery) {
                if (!oldQuery.equals("") && newQuery.equals("")) {
                    mSearchView.clearSuggestions();
                } else {
                    mSearchView.showProgress();
                    if (a!= null){
                        a.cancel(true);
                    }
                    a = (asyn) new asyn(makeSuggestion).execute("http://suggestqueries.google.com/complete/search?output=firefox&hl=vi&q="+newQuery);

                }
            }
        });
```
   Với 2 biến a và makeSugesstion 
```
    private FloatingSearchView mSearchView;
    private asyn a = null;
    MakeSuggestion makeSuggestion = this;
```


Code đầy đủ của MainActivity.java

```
import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;

import android.os.Bundle;
import android.speech.RecognizerIntent;

import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.arlib.floatingsearchview.FloatingSearchView;
import com.arlib.floatingsearchview.suggestions.SearchSuggestionsAdapter;
import com.arlib.floatingsearchview.suggestions.model.SearchSuggestion;



import java.util.ArrayList;
import java.util.List;


public class MainActivity extends AppCompatActivity implements MakeSuggestion {
    private FloatingSearchView mSearchView;
    private asyn a = null;
    MakeSuggestion makeSuggestion = this;
    @Override
    public void getSuggestion(List<Suggestion> suggestions) {
        mSearchView.swapSuggestions(suggestions);
        mSearchView.hideProgress();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mSearchView = findViewById(R.id.floating_search_view);
        final int VOICE_SEARCH_CODE = 3012;
        checkVoiceRecognition();
        final MenuItem mActionVoice = findViewById(R.id.action_voice_rec);

        mSearchView.setOnQueryChangeListener(new FloatingSearchView.OnQueryChangeListener() {
            @Override
            public void onSearchTextChanged(String oldQuery, String newQuery) {
                if (!oldQuery.equals("") && newQuery.equals("")) {
                    mSearchView.clearSuggestions();
                } else {
                    mSearchView.showProgress();
                    if (a!= null){
                        a.cancel(true);
                    }
                    a = (asyn) new asyn(makeSuggestion).execute("http://suggestqueries.google.com/complete/search?output=firefox&hl=vi&q="+newQuery);

                }
            }
        });
        mSearchView.setOnMenuItemClickListener(new FloatingSearchView.OnMenuItemClickListener() {
            @Override
            public void onActionMenuItemSelected(MenuItem item) {
                if (item.getItemId() == R.id.action_voice_rec)
                {
                    Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                    intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                            RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                    //... put other settings in the Intent
                    startActivityForResult(intent, 0);
                }
            }
        });

        mSearchView.setOnBindSuggestionCallback(new SearchSuggestionsAdapter.OnBindSuggestionCallback() {
            @Override
            public void onBindSuggestion(View suggestionView, ImageView leftIcon, TextView textView, SearchSuggestion item, int itemPosition) {

            }
        });

    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        if (requestCode == 0 && resultCode == RESULT_OK) {
            ArrayList<String> results = data.getStringArrayListExtra(
                    RecognizerIntent.EXTRA_RESULTS);
            mSearchView.setSearchFocused(true);
            mSearchView.setSearchText(results.get(0));
        }
        super.onActivityResult(requestCode, resultCode, data);
    }
    public void checkVoiceRecognition() {
        // Check if voice recognition is present
        PackageManager pm = getPackageManager();
        List<ResolveInfo> activities = pm.queryIntentActivities(new Intent(
                RecognizerIntent.ACTION_RECOGNIZE_SPEECH), 0);
        if (activities.size() == 0) {
            Toast.makeText(this, "Voice recognizer not present",
                    Toast.LENGTH_SHORT).show();
        }
    }


}
```

### **TỔNG KẾT** 
    
   Mình xin cảm ơn tất cả các bạn đã đọc bài viết của mình, đây là bài viết đầu tiên nên có thể có nhiều sai xót, mong các bạn góp ý để mình làm tốt hơn. <br>