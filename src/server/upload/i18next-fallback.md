Bài viết được dịch từ ngồn https://www.i18next.com/principles/fallback.html

# Fallback

## Language fallback
Mặc định có chứa tập lệnh sẽ thực hiện bản dịch từ tệp ngôn ngữ thuần túy nếu không tìm thấy.

```
en-GB.json

{
  "i18n": "Internationalisation"
}

en.json

{
  "i18n": "Internationalization",
  "i18n_short": "i18n"
}
```

Ví dụ:

```
// fallback to one language
i18next.init({
    lng: 'en-GB'
}, () => {
  i18next.t('i18n'); // -> "Internationalisation"
  i18next.t('i18n_short'); // -> "i18n" (from en.json)

  // force loading en
  i18next.t('i18n', { lng: 'en' ); // -> "Internationalization"
});
```

## Fallback language
Nếu bạn không thể cung cấp ngôn ngữ cho người dùng, bạn có thể chỉ định ngôn ngữ dự phòng.

```
// fallback to one language
i18next.init({
    fallbackLng: 'en'
});

// fallback ordered
i18next.init({
    fallbackLng: ['fr', 'en']
});

// fallback depending on user language
i18next.init({
    fallbackLng: { 
        'de-CH': ['fr', 'it'], 
        'zh-HANT': ['zh-HANS', 'en'],
        'es': ['fr'],
        'default': ['en']
    }
});
```

Mặc định được đặt thành dev có nghĩa là ngôn ngữ của developer. Lúc đầu, điều này có vẻ kỳ lạ khi đặt mặc định cho một ngôn ngữ nhưng điều này cho phép thiết lập tính năng saveMissing để gửi các khoá mới cho ngôn ngữ cụ thể của developer. Từ đó người dịch của bạn có thể sửa đổi các văn bản sang một tập tin dịch có chứa ví dụ. tiếng Anh thích hợp bao gồm các thuật ngữ đã được xác định. Đối với sản xuất chỉ cần đặt fallbackLng sang một ngôn ngữ hiện có.

## Namespace fallback

i18next mỗi mặc định tải nó dịch từ một tập tin có tên dịch. Nhưng bạn có thể thiết lập và cấu trúc nó để tải từ nhiều tệp, chúng tôi gọi các namespaces tên tệp này.

Bổ sung để xác định nhiều namespaces để tải bạn cũng có thể đặt namespaces dự phòng. Vì vậy, nếu một key để dịch được không tìm thấy trong không gian tên, nó trông nó trong fallbacks.

```
app.json

{
  "title": "i18next"
}

common.json

{
  "button": {
    "save": "save"
  }
}
```

Ví dụ:

```
i18next.init({
    // files to load
    namespaces: ['app', 'common'],

    // default namespace (needs no prefix on calling t)
    defaultNS: 'app',

    // fallback, can be a string or an array of namespaces
    fallbackNS: 'common'
}, () => {
    i18next.t('title') // -> "i18next"

    i18next.t('button.save') // -> "save" (fallback from common)

    // without fallbackNS you would have to prefix namespace 
    // to access keys in that namespace
    i18next.t('common:button.save') // -> "save"
});

```

## Key fallback

Nếu một key không trả về một giá trị thì ket acts đóng vai trò như dự phòng:

```
i18next.t('notExistingKey'); // -> "notExistingKey"
```

Vì vậy, bạn có thể config i18next để có key là dự phòng thay vì tải một ngôn ngữ dự phòng:

```
de.json

{
  "No one says a key can not be the fallback.": "Niemand sagt ein key kann nicht als Ersatz dienen."
}

i18next.init({
  lng: 'de',

  // allow keys to be phrases having `:`, `.`
  nsSeparator: false,
  keySeparator: false,

  // do not load a fallback
  fallbackLng: false
});

i18next.t('No one says a key can not be the fallback.')
// -> "Niemand sagt ein key kann nicht als Ersatz dienen."


i18next.t('This will be shown if the current loaded translations to not have this.');
// -> "This will be shown if the current loaded translations to not have this."

```

Việc này và có thể giảm tệp để tải, việc quản lý bản dịch sẽ khó khăn hơn nhiều vì bạn sẽ cần phải cập nhật thay đổi giá trị dự phòng trong code và tệp json.

Có thể - nhưng không nên.

## Calling with fallback key

Gọi hàm t với một mảng các key cho phép bạn dịch các khóa động cung cấp giá trị dự phòng không cụ thể.

Là một mẫu suy nghĩ về một mã lỗi bạn nhận được và bạn muốn hiển thị một cảnh báo cụ thể trong một số trường hợp:

```
translation.json

{
  "error": {
    "unspecific": "Something went wrong.",
    "404": "The page was not found."
  }
}

Sample

// const error = '404';
i18next.t([`error.${error}`, 'error.unspecific']) // -> "The page was not found"

// const error = '502';
i18next.t([`error.${error}`, 'error.unspecific']) // -> "Something went wrong"
```

Cảm ơn và hi vọng bài viêt có ích cho công việc của bạn.