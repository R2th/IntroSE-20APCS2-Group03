Khi mình làm với những cách làm như hướng dẫn trước đây thì đều chỉ hỗ trợ đến API 23 và bị lỗi trên API 24 trở nên -> Chính vì vậy hôm nay mình sẽ viết bài hướng dẫn làm đa ngôn ngữ đúng trên tất cả các API

# 1. Tạo class MyContextWrapper
Đây là class chính để thay đổi default locale của app. Mình sẽ xử lý với 3 phần API >= 24, API < 17 và 23 >= API >= 17

```
package com.family.multi.language.utils.language;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Build;
import android.os.LocaleList;

import java.util.Locale;

public class MyContextWrapper extends ContextWrapper {
    public MyContextWrapper(Context base) {
        super(base);
    }

    @TargetApi(Build.VERSION_CODES.N)
    public static ContextWrapper wrap(Context context, Locale newLocale) {
        Resources res = context.getResources();
        Configuration configuration = res.getConfiguration();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            configuration.setLocale(newLocale);
            LocaleList localeList = new LocaleList(newLocale);
            LocaleList.setDefault(localeList);
            configuration.setLocales(localeList);
            context = context.createConfigurationContext(configuration);
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            Locale.setDefault(newLocale);
            configuration.setLocale(newLocale);
            context = context.createConfigurationContext(configuration);
        } else {
            Locale.setDefault(newLocale);
            configuration.locale = newLocale;
            res.updateConfiguration(configuration, res.getDisplayMetrics());
        }
        return new ContextWrapper(context);
    }
}

```
# 2. Tạo class BaseActivity

Chúng ta chỉ cần extend BaseActivity là được

```
package com.family.multi.language.activity;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;

import com.family.multi.language.utils.language.LanguageUtils;
import com.family.multi.language.utils.language.MyContextWrapper;

import java.util.Locale;

public abstract class BaseActivity extends AppCompatActivity {
    // change language of app
    @Override
    protected void attachBaseContext(Context newBase) {
        Locale languageType = LanguageUtils.getLanguageType();
        super.attachBaseContext(MyContextWrapper.wrap(newBase, languageType));
    }
}
```
# 3. Tạo class utils LanguageUtils
Dưới đây là 2 function chính : thay đổi config locale và lấy ra locale hiện tại

```
 public static void changeLanguageType(Locale locale) {
        Resources resources = App.getInstance().getResources();
        DisplayMetrics dm = resources.getDisplayMetrics();
        Configuration config = resources.getConfiguration();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            config.setLocale(locale);
        } else {
            config.locale = locale;
            resources.updateConfiguration(config, dm);
        }
    }

    public static Locale getLanguageType() {
        Resources resources = App.getInstance().getResources();
        Configuration config = resources.getConfiguration();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            return config.getLocales().get(0);
        } else {
            return config.locale;
        }
    }
```

Các bạn có thể xem chi tiết hơn tại link: [MultiLanguage](https://github.com/FamilyVN/MultiLanguage)