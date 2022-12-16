Trong quá trình phát triển ứng dụng iOS chúng ta không thể tránh khỏi việc phải sử dụng các thư viện của bên thứ ba trong ứng dụng của mình. Trong trường hợp này chúng ta cần có màn hình license agreement trong ứng dụng để đảm bảo các yêu cầu liên quan đến pháp lý.

Có thể thấy các ứng dụng như iBooks, Keynote, Facebook,... và rất nhiều dụng dụng khác nữa, đều chọn cách sử dụng ứng dụng Setting để ngoài việc hiển thị các tùy chọn cài đặt cho người dùng, mà còn để hiển thị License agreement và Acknowledgements. 

![](https://images.viblo.asia/fa0641c3-ca56-4289-a387-44fdeae0e165.PNG)

Rất đơn giản, công việc chỉ là sử dụng file Settings.bundle. Nếu trong project chưa có file này chúng ta có thể thêm bằng cách chọn New File -> Resource (nằm trong mục iOS) -> sau đó chọn Settings.bundle (Đừng đổi tên của file này mà hãy để tên mặc định là ‘Settings’).

Sau khi file Settings.bundle được tạo, tiến hành build và run app. Trong app Setting của hệ điều hành sẽ xuất hiện ứng dụng của chúng ta, sau khi chọn thì sẽ xuất hiện một menu với một vài mục mặc định như sau:

![](https://images.viblo.asia/28b1d246-1ae4-42be-af85-c104df55bc3e.png)

## Root.plist

Để chỉnh sửa cấu trúc của menu, chúng ta cần chỉnh sửa file Root.plist nằm trong file Settings.bundle. 

![](https://images.viblo.asia/9e18d5b7-e8e0-4eb0-b383-18bfde302750.png)

File có phần mở rộng .bundle không phải là một thư mục mà là một file dạng package. Trong Finder, chúng ta có thể làm việc với nội dung bên trong file .bundle bằng cách nhấn chuột phải vào nó và chon Show Package Contents.

File Root.plist dùng để cấu trúc lại menu trong app Setting, còn file Root.strings là file để chúng các chuỗi dùng cho việc Localization.

Ban đầu trong file Root.plist sẽ chứa một số item mặc định như sau:

![](https://images.viblo.asia/5f2b815d-9ac3-430c-bb13-38c749a0314b.png)

Như chúng ta có thể thấy, item đầu tiên là một Group (dùng để quy định rằng các item tiếp theo sau nó sẽ nằm trong một UITableView group), sau đó là các TextField, Toggle Switch và Slider. Chúng ta sẽ remove hết chúng đi, vì chúng ta đang muốn tạo màn hình Licenses và Agreements.

## Tạo Acknowledgements section

Chúng ta có thể chọn cách chỉnh sửa file Root.plist một cách thủ công, hoặc thông mình hơn chúng ta sẽ thiết lập một script để thực hiện tất cả các công việc cần làm một cách tự động. Tôi thích cách thứ hai, nghĩa là chúng ta chỉ cần thêm các file license của 3rd-party library, phần còn lại để script lo.

Giải pháp sau đây được lấy từ một câu trả lời xuất sắc trên Stack Overflow - http://stackoverflow.com/a/6453507

Chúng ta sẽ sử dụng đoạn script sau:

```
#!/usr/bin/perl -w

use strict;

my $out = "../Settings.bundle/en.lproj/Acknowledgements.strings";
my $plistout =  "../Settings.bundle/Acknowledgements.plist";

unlink $out;

open(my $outfh, '>', $out) or die $!;
open(my $plistfh, '>', $plistout) or die $!;

print $plistfh <<'EOD';
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
        <key>StringsTable</key>
        <string>Acknowledgements</string>
        <key>PreferenceSpecifiers</key>
        <array>
EOD
for my $i (sort glob("*.license"))
{
    my $value=`cat $i`;
    $value =~ s/\r//g;
    $value =~ s/\n/\r/g;
    $value =~ s/[ \t]+\r/\r/g;
    $value =~ s/\"/\'/g;
    my $key=$i;
    $key =~ s/\.license$//;

    my $cnt = 1;
    my $keynum = $key;
    for my $str (split /\r\r/, $value)
    {
        print $plistfh <<"EOD";
                <dict>
                        <key>Type</key>
                        <string>PSGroupSpecifier</string>
                        <key>Title</key>
                        <string>$keynum</string>
                </dict>
EOD

        print $outfh "\"$keynum\" = \"$str\";\n";
        $keynum = $key.(++$cnt);
    }
}

print $plistfh <<'EOD';
        </array>
</dict>
</plist>
EOD
close($outfh);
close($plistfh);
```

Nếu sau khi đã tiến hành tất cả các bước trong bài viết này mà bị lỗi khi build thì có thể bạn sẽ phải thêm hai dòng này vào đầu của script trên:

```
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8
```

Sau đây là các bước tiến hành:
1. Tạo một thư mục có tên 'licenses' trong project.
2. Tạo một file cho script trên và đặt trong thư mục vừa tạo.
3. Đặt các file chứa license vào thư mục trên với tên là tên của 3rd-party library và phần mở rộng là .license

![](https://images.viblo.asia/5300175b-d151-4519-a21f-673549a0f5bb.png)

5. Trong project Xcode chọn target
6. Chọn tab Build Phases -> Add Build Phase -> Add Run Script
7. Kéo và thả file script vào phần text area có chứa đoạn "# Type a script or drag a script file from your workspace to insert its path.". Sau đó chỉnh sửa chúng thành cấu trúc như sau:

```
cd $SRCROOT/licenses ($SRCROOT points to the root of your project)
./acknowledgementGenerator.rb
```

8. Hết rồi, không có bước 8.

Tada. Vậy là xong, build và run project và tận hưởng thành quả.

![](https://images.viblo.asia/44bfda77-e940-43d2-9f76-2c6b00d3d71b.png)

Mỗi khi muốn thêm, xóa license chúng ta chỉ việc thêm, xóa file có đuôi .license trong thư mục licenses.