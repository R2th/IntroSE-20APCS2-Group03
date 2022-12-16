Facebook chắc hẳn là ứng dụng mà tát cả smartphone của các bạn đều có, việc chia sẻ ảnh hay dữ liệu qua nó đang ngày càng trở nên phổ biến. Bài viết dưới đây của mình sẽ hướng dẫn cách share 1 ảnh từ trong thư viện ảnh của máy đơn giản thông qua intent.

### 1. Mở đầu
Share ảnh, link hay text qua Facebook có khá nhiều cách, chắ hẳn những bạn đã từng code làm theo cách Facebook hướng dẫn là import Facebook Sdk vào trong ứng dụng của mình, sau đó sử dụng các class sẵn có của thư viện để thực hiện. Cách này không khó làm tuy nhiên khá lâu và hơi phức tạp. Có 1 cách đơn giản hơn nhiều là sử dụng Intent. Mình sẽ làm ví dụ về 1 app đơn giản, giao diện có 1 button, khi click vào button thì vào thư viện ảnh của máy Andoid, click vào 1 ảnh sẽ chuyển ảnh đó lên giao diện chia sẻ ảnh của Facebook. Cùng bắt đầu nhé. 

### 2. Thực hiện vẽ giao diện và Java code

Đầu tiên là giao diện, rất đơn giản chỉ có duy nhất 1 button để thực hiện click chuyển vào thư viện ảnh
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical">

    <Button
        android:id="@+id/btn_choose_image"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="click me" />

</LinearLayout>

```



Trong Java code, mình có sử dụng 2 intent, 1 intent truyền vào ACTION_PICK và Uri là đường link dẫn đến thư viện ảnh của máy để chọn ra 1 bức ảnh muốn chia sẻ, sử dụng startActivityForResult để lấy Uri của bức ảnh đó chia sẻ lên face :v. Intent còn lại thực hiện việc chia sẻ lên các ứng dụng có thể chia sẻ ảnh như Facebook, Instagram, Gmail, Messenger,... Ở intent này thì truyền Action là ACTION_SEND, putExtra với uri được get ra trong data trong hàm  onActivityResult

```
package com.example.shareimagetofacebook;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import static android.app.Activity.RESULT_OK;

public class ShareImageFragment extends Fragment {
    private static final int RESULT_LOAD_IMAGE = 100;

    private Button mBtnChooseImage;

    public static ShareImageFragment getInstance() {
        return new ShareImageFragment();
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = LayoutInflater.from(getActivity()).inflate(R.layout.fragment_share_image, container, false);
        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mBtnChooseImage = view.findViewById(R.id.btn_choose_image);

        mBtnChooseImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                chooseImageFromGallery();
            }
        });

    }

    public void chooseImageFromGallery() {
        Intent intent = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(intent, RESULT_LOAD_IMAGE);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == RESULT_OK && requestCode == RESULT_LOAD_IMAGE && data != null) {
            Uri uri = data.getData();

            Intent intent = new Intent();
            intent.setAction(Intent.ACTION_SEND);
            intent.setType("image/*");
            intent.putExtra(Intent.EXTRA_STREAM, uri);

            startActivity(intent);
        }
    }
}

```

Đây là kết quả khi build code

![](https://images.viblo.asia/cd287f53-3ad5-4f4c-9afb-bb39538492e2.png)

### 3. Tổng kết

Bên trên mình đã trình bày cách chia sẻ 1 ảnh trong thư viện lên Facebook thông qua Intent rồi, rất đơn giản phải không. Hi vọng sẽ giúp ích được cho bạn đọc. Nếu các bạn có thắc mắc gì hay muốn mình trình bày cách thông qua Facebook SDK thì comment ở dưới nhé.