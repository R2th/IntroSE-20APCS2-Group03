# Giới thiệu
Có lẽ regex đã quá quen thuộc với các bạn đã làm việc nhiều với các project cần xử lí nội dung văn bản, verify data ví dụ như : bạn cần lọc bỏ các kí tự html trong đoạn văn bản, kiểm tra trường do user nhập vào có đúng chuẩn hay không .... Có rất nhiều cách thực hiện khác nhau khi gặp các bài toán trên tuy nhiên khi bạn biết về regex thì dường như nó là cách giải quyết tốt nhất và đỡ đau đầu nhất. Trong bài viết này mình không hướng đến việc giới thiệu regex, hay cách sử dụng mà mình tập trung vào việc sử dụng regex giải quyết 2 bài toán mình gặp phải trong project vừa làm :
*  Kiểm tra 1 địa chỉ là IPv6, hay IPv4
*  Xử lí 1 văn bản Html chuyển thành dạng view native.
Để tiếp cận hai bài toán trên mình xin phép giới thiệu qua về regex 
# Regular Expression là gì?
Regular expressions (hay còn gọi là Biểu thức chính quy – viết tắt là RegEx) là một chuỗi ký tự đặc biệt được dùng làm mẫu (pattern) để phân tích sự trùng khớp (match) của một tập hợp các chuỗi con cần lấy ra từ một chuỗi cha.
## Vậy sử dụng regex ra sao ? Quy ước regex như thế nào ?
Đã có rất nhiều bài viết giới thiệu về regex trên viblo cũng như trên các trang lập trình khác nên bạn có thể vào tham khảo mình có thể dẫn ra ở đây :
1. https://viblo.asia/p/hoc-regular-expression-va-cuoc-doi-ban-se-bot-kho-updated-v22-Az45bnoO5xY
2. https://viblo.asia/p/tim-hieu-ve-regular-expression-yMnKMARmK7P
3. https://www.cheatography.com/davechild/cheat-sheets/regular-expressions/

Bạn có thể test regex trên các trang web online test regex.
1. https://www.regexpal.com/ ( Mình hay sử dụng trang này)
2. https://regex101.com/
3. http://regexr.com/
4. https://rubular.com/
## Thư viện hỗ trợ trên Java, Android
Hầu hết các ngôn ngữ lập trình đều cung cấp thư viện hoặc hàm để chúng ta có thể làm việc nhanh chóng với Regex. Mình xin phép nói chi tiết về việc sử dụng trên java.
Trong java cung cấp bộ thư viện java.util.regex để bạn làm việc với regex , 2 class bạn hay dùng đó là 
```
import java.util.regex.Matcher;
import java.util.regex.Pattern;
```
Việc sử dụng regex mình sẽ nói tiếp trong việc xử lí 2 bài toán mình nhắc tới trong phần giới thiệu.
# Bài toán 1 : Xử lí văn bản html sang native.
Trong dự án hiện tại mình gặp 1 vấn đề khá khoai khi cần xử lí chuyển đổi 1 view từ app trước xử dụng webview để hiện thị content từ url sang UI native nhằm tăng tốc độ load trang cũng như tăng tốc độ xử lí view, nhưng yêu cầu cần giữ nguyên được cấu trúc trang như bên webview hiển thị. Cụ thể ở đây là mình cần hiển thị nội dung 1 bài báo thể thao từ dạng UI webview về native . Sau khi đã xử lí được hầu hết các UI về dạng native mình gặp vấn đề ở việc làm sao hiển thị nội dung bài báo đang được trả về là 1 đoạn content html. 
Ví dụ như sau :
```
<p>Nhận định về trận chiến với MU, huyền thoại Liverpool, Jamie Carragher không ngần ngại cho rằng Quỷ đỏ sẽ là “miếng mồi ngon” của Liverpool. Ông cho rằng việc MU dồn lên tấn công sẽ tạo điều kiện cho The Kop dễ đá hơn và hướng tới chiến thắng.</p>
<img style="margin:0;" title="410523daa49b4dc5148a.jpg" src="https://icdn.dantri.com.vn/thumb_w/640/2019/02/23/410523-daa-49-b-4-dc-5148-a-1550922077583.jpg" alt="410523daa49b4dc5148a.jpg" data-original="https://icdn.dantri.com.vn/2019/02/23/410523-daa-49-b-4-dc-5148-a-1550922077583.jpg" data-photo-id="393807" />
<p>Cũng như nhiều CĐV Liverpool, Jamie Carragher đang rất mong ngóng về chiến thắng ở Old Trafford lần đầu tiên sau 5 năm. Thậm chí, theo nhiều chuyên gia, trận chiến với MU có thể quyết định trực tiếp tới chức vô địch của The Kop.</p>
<p>Nhưng mọi chuyện có dễ dàng như vậy?</p>
```

Nội dung hiển thị mình cần được như sau :
![](https://images.viblo.asia/a402d74d-b9ca-4ab2-ad6c-7b6e0bc6be31.png)

Ý tưởng của mình khi gặp vấn đề này đó là sử dụng webview để load phần nội dung này tuy nhiên vấn đề mình gặp phải đó là phần nội dung html có chứa thẻ ảnh và mình không thể control được việc hiển thị ảnh này như ý muốn trên native. Yêu cầu hiển thị ảnh như ý muốn cùng các animation loading , việc hiển thị text xuống dòng cũng như padding trái phải như webview dẫn đến việc mình cần tách được đoạn văn bản trên thành 2 phần : 1 phần content text để hiển thị vào webview, 1 phần content image để hiển thị bằng imageView trên native. Để thực hiện yêu cầu trên mình nghĩ được 2 phương án khả thi
*  P/a 1 : (Tay to (^_^) ) : dò theo độ dài văn bản và cắt theo từng tag để lấy được image và content cần thiết. Cách này trước đây mình khá hay dùng để clone các trang web lấy content :). Nghĩ thôi đã thấy to tay rồi.
*  P/a 2 : Sử dụng regex tách văn bản thành 2 chuỗi text & imge.
Mình sẽ demo cách thực hiện p/a 2 luôn nhé, cách 1 chỉ nghĩ thôi :). 
Nhìn qua nội dung content mình thấy có các khó khăn cần giải quyết :
1. Tách riêng nội dung text, nội dung ảnh.
2. Trong nội dung ảnh ( thẻ img ) không chỉ chứa 1 ảnh mà có thể chứa nhiều ảnh với nhiều độ phân giải của cùng 1 ảnh
3. Nội dung text , ảnh xen kẽ nhau nên cần giữ được thứ tự các đoạn text ảnh để có thể tổ chức view trên native 1 cách hoàn chỉnh.

Dưới đây là phần code mình xử lí :
* B1 : xác định regex sử dụng : Mình sử dụng 2 regex sau
```
String REGEX_SPLIT_WHITOUT_IMG = "<img([\\w\\W]+?)>"; // tìm chính xác thẻ img trong văn bản
String REGEX_SPLIT_IMG_URL = "(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpeg|jpg|gif|png)"; // tìm chính xác url link image
```
* B2 :  Tìm kiếm toàn bộ thẻ img và đẩy vào 1 list để tiền xử lí :

```
List<String> urlImgListTemp = new ArrayList<>();
Pattern pattern2 = Pattern.compile(REGEX_SPLIT_WHITOUT_IMG);
Matcher m2 = pattern2.matcher(html);
while (m2.find()) {
      urlImgListTemp.add(m2.group());
}
```

Sau bước này, nội dung trong urlImgListTemp là các thẻ img cụ thể như trong ví dụ trên đó là :

`<img style="margin:0;" title="410523daa49b4dc5148a.jpg" src="https://icdn.dantri.com.vn/thumb_w/640/2019/02/23/410523-daa-49-b-4-dc-5148-a-1550922077583.jpg" alt="410523daa49b4dc5148a.jpg" data-original="https://icdn.dantri.com.vn/2019/02/23/410523-daa-49-b-4-dc-5148-a-1550922077583.jpg" data-photo-id="393807" />`

* B3 : Lấy nội dung văn bản text :

`String[] paragrap = html.split(REGEX_SPLIT_WHITOUT_IMG);`

Nội dung văn bản được tách thành mảng các String sau khi cắt bỏ thẻ img, cụ thể với vi dụ trên như sau

```
paragrap[0] = "<p>Nhận định về trận chiến với MU, huyền thoại Liverpool, Jamie Carragher không ngần ngại cho rằng Quỷ đỏ sẽ là “miếng mồi ngon” của Liverpool. Ông cho rằng việc MU dồn lên tấn công sẽ tạo điều kiện cho The Kop dễ đá hơn và hướng tới chiến thắng.</p>"
paragrap[1] = "<p>Cũng như nhiều CĐV Liverpool, Jamie Carragher đang rất mong ngóng về chiến thắng ở Old Trafford lần đầu tiên sau 5 năm. Thậm chí, theo nhiều chuyên gia, trận chiến với MU có thể quyết định trực tiếp tới chức vô địch của The Kop.</p>
<p>Nhưng mọi chuyện có dễ dàng như vậy?</p>"
```

* B4 : trong urlImgTemp  với mỗi phần tử ta lấy ảnh url đầu tiên :

```
Pattern pattern = Pattern.compile(REGEX_SPLIT_IMG_URL);
for (int i = 0; i < urlImgListTemp.size(); i++) {
    Matcher m = pattern.matcher(urlImgListTemp.get(i));
    if (m.find()) {
         urlImgList.add(m.group());
    }
}
```

Như vậy paragrap, và urlImgList là 2 dữ liệu ta cần. Sau đây là đoạn code mình xử lí :

```
public static int spiltHtml(String html, List<String> urlImgList, List<String> htmlSplitText) {

    List<String> urlImgListTemp = new ArrayList<>();

    String REGEX_SPLIT_WHITOUT_IMG = "<img([\\w\\W]+?)>";
    String REGEX_SPLIT_IMG_URL = "(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpeg|jpg|gif|png)";

    Pattern pattern2 = Pattern.compile(REGEX_SPLIT_WHITOUT_IMG);
    Matcher m2 = pattern2.matcher(html);
    while (m2.find()) {
        urlImgListTemp.add(m2.group());
    }

    Pattern pattern = Pattern.compile(REGEX_SPLIT_IMG_URL);
    for (int i = 0; i < urlImgListTemp.size(); i++) {
        Matcher m = pattern.matcher(urlImgListTemp.get(i));
        if (m.find()) {
            urlImgList.add(m.group());
        }
    }
    String[] paragrap = html.split(REGEX_SPLIT_WHITOUT_IMG);
    htmlSplitText.addAll(Arrays.asList(paragrap));

    return (urlImgList.size() > htmlSplitText.size())
            ? 1
            : 0;
}

public static void addViewHtml(LinearLayout parentView, String html) {
    List<String> urlImgList = new ArrayList<>();
    List<String> htmlSplitText = new ArrayList<>();
    int typeStart = spiltHtml(html, urlImgList, htmlSplitText);

    LinearLayout.LayoutParams layoutParams;
    WebView webView;
    ImageView imageView;

    if (typeStart == 0) {
        for (int i = 0; i < htmlSplitText.size(); i++) {
            // create webview
            webView = new WebView(parentView.getContext());
            layoutParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            parentView.addView(webView, layoutParams);
            webView.getSettings().setJavaScriptEnabled(true);
            webView.loadData(htmlSplitText.get(i), "text/html; charset=utf-8", "utf-8");
            if (i < urlImgList.size()) {
                // create image
                LayoutInflater inflater = LayoutInflater.from(parentView.getContext());
                View v = inflater.inflate(R.layout.item_image, null, false);
                imageView = v.findViewById(R.id.image);
                parentView.addView(v);
                Glide.with(parentView.getContext())
                        .load(urlImgList.get(i))
                        .placeholder(R.drawable.img_noimage1)
                        .fitCenter()
                        .transition(DrawableTransitionOptions.withCrossFade())
                        .into(imageView);
            }
        }
    } else {
        for (int i = 0; i < urlImgList.size(); i++) {
            LayoutInflater inflater = LayoutInflater.from(parentView.getContext());
            View v = inflater.inflate(R.layout.item_image, null, false);
            imageView = v.findViewById(R.id.image);
            parentView.addView(v);
            Glide.with(parentView.getContext())
                    .load(urlImgList.get(i))
                    .placeholder(R.drawable.img_noimage1)
                    .fitCenter()
                    .transition(DrawableTransitionOptions.withCrossFade())
                    .into(imageView);
            if (i < htmlSplitText.size()) {
                webView = new WebView(parentView.getContext());
                layoutParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
                parentView.addView(webView, layoutParams);
                webView.getSettings().setJavaScriptEnabled(true);
                webView.loadData(htmlSplitText.get(i), "text/html; charset=utf-8", "utf-8");
            }
        }
    }
}
```

Và đây là nội dung mình đạt được

![](https://images.viblo.asia/eda55fd2-16a0-4422-b430-3ed71580d871.png)

# Bài toán 2 : check ipv4, ipv6
Phần check ipv4, v6 này thì hoàn toàn dựa vào regex . Mình xin phép được đưa code mọi người tham khảo phần này mình tham khảo thì cũng có khá nhiều ví dụ trên mạng.

```
public static final Pattern IPV4_PATTERN = Pattern.compile(
            "^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\." + "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\."
                    + "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\." + "([01]?\\d\\d?|2[0-4]\\d|25[0-5])$");

    public static final Pattern IPV6_STD_PATTERN = Pattern.compile(
            "^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$");

    public static final Pattern IPV6_HEX_PATTERN = Pattern.compile(
            "^((?:[0-9A-Fa-f]{1,4}(?::[0-9A-Fa-f]{1,4})*)?)::((?:[0-9A-Fa-f]{1,4}(?::[0-9A-Fa-f]{1,4})*)?)$");

    public static final Pattern IPV4_PATTERN_SUBNET = Pattern.compile(
            "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\/\\d+$");

    public static boolean isIPv4(String ip) {
        return ip == null
                ? false
                : IPV4_PATTERN.matcher(ip.trim()).matches();
    }

    public static boolean isIPv6STD(String ip) {
        return ip == null
                ? false
                : IPV6_STD_PATTERN.matcher(ip.trim()).matches();
    }

    public static boolean isIPv4Subnet(String ip) {
        return ip == null
                ? false
                : IPV4_PATTERN_SUBNET.matcher(ip.trim()).matches();
    }

    public static boolean isIPv6HEX(String ip) {
        return ip == null
                ? false
                : IPV6_HEX_PATTERN.matcher(ip.trim()).matches();
    }

    public static boolean isIPv6(String ip) {
        return ip == null
                ? false
                : (isIPv6STD(ip) || isIPv6HEX(ip));
    }
```

# Kết luận
Trên đây mình chia sẻ việc sử dụng regex để giải quyết 2 issue trong dự án mình vừa gặp phải, rất mong các bạn góp ý và chia sẻ. Nội dung code mẫu của mình có thể chưa clean và tốt nhất nên cũng mong các bạn góp ý để mình có thể sửa chưa :).