Nhiều ứng dụng không xác thực hợp lệ chứng chỉ SSL / TLS , khiến chúng dễ bị tấn công bởi man-in-the-middle (MITM). Nếu một ứng dụng không xác thực đúng cách kết nối của nó với máy chủ, ứng dụng đó dễ bị tấn công MITM bởi một kẻ tấn công mạng đặc quyền. Kiểu tấn công này cung cấp cho thủ phạm khả năng nắm bắt, xem và sửa đổi lưu lượng được gửi và nhận giữa ứng dụng và máy chủ.

# Common Mistake
## Accepting self-signed certificates

Các dev có thể vô hiệu hóa xác nhận chứng chỉ trong các ứng dụng vì nhiều lý do. Một ví dụ là khi nhà phát triển cần kiểm tra code trên production server, nhưng không có domain certificate cho môi trường test. Trong tình huống này, dev có thể thêm code vào thư viện networking để chấp nhận tất cả các certificate là hợp lệ. Tuy nhiên, việc chấp nhận tất cả các certificate là hợp lệ, cho phép kẻ tấn công thực hiện một cuộc tấn công MITM trên ứng dụng chỉ bằng cách sử dụng self-signed certificate. Cách này sẽ vô hiệu hóa SSL / TLS và không cung cấp giá trị nào đối với kết nối văn bản gốc không được mã hóa.

Dưới đây là một ví dụ về mã Android dễ bị tổn thương chấp nhận tất cả các chứng chỉ SSL / TLS là hợp lệ:
```
    TrustManager[] trustAllCerts = new TrustManager[] {
       new X509TrustManager() {
          public java.security.cert.X509Certificate[] getAcceptedIssuers() {
            return null;
          }
          public void checkClientTrusted(X509Certificate[] certs, String authType) {  }

          public void checkServerTrusted(X509Certificate[] certs, String authType) {  }

       }
    };

    //Globally set the broken TrustManager
    SSLContext sc = SSLContext.getInstance("SSL");
    sc.init(null, trustAllCerts, new java.security.SecureRandom());
    HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

    //Make the connection to the server
    URL url = new URL("https://paypal.com");
    HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
    InputStream ins = urlConnection.getInputStream();
    InputStreamReader isr = new InputStreamReader(ins);
    BufferedReader in = new BufferedReader(isr);

    String inputLine;
    in.close();
```

## Setting a permissive hostname verifier

Một lỗi phổ biến khác trong việc triển khai SSL / TLS là thiết lập cho phép xác minh tên máy chủ . Trong trường hợp này, ứng dụng sẽ chấp nhận chứng chỉ tự ký vì chứng chỉ vẫn còn hiệu lực. 
Nhưng nếu một ứng dụng cho phép tất cả các hostname, thì một chứng chỉ được cấp bởi bất kỳ cơ quan chứng nhận hợp lệ (CA) nào cho bất kỳ tên miền nào cũng có thể được sử dụng để thực hiện một cuộc tấn công MITM và sign traffic.

Dưới đây là một ví dụ:

```
    URL url = new URL("https://paypal.com");
    HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
    urlConnection.setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
    InputStream ins = urlConnection.getInputStream();
    InputStreamReader isr = new InputStreamReader(ins);
    BufferedReader in = new BufferedReader(isr);

    String inputLine;
    in.close();
```

# REMEDIATION
Đối với bất kỳ ứng dụng nào xử lý dữ liệu có độ nhạy cảm cao, hãy sử dụng certificate pinning để bảo vệ chống lại các cuộc tấn công MITM. Phần lớn các ứng dụng đã xác định nơi mà chúng kết nối (máy chủ phụ trợ của chúng) và vốn đã tin tưởng vào cơ sở hạ tầng mà chúng kết nối, do đó có thể chấp nhận (và thường an toàn hơn) để sử dụng “private” public-key, tách biệt với các cơ quan chứng nhận công cộng. Với cách tiếp cận này, kẻ tấn công cần private key từ phía máy chủ để thực hiện cuộc tấn công MITM đối với một thiết bị mà chúng không có quyền truy cập vật lý. Nếu certificate pinning không thể được triển khai cho bất kỳ chức năng ứng dụng nào xử lý dữ liệu có độ nhạy cao, hãy thực hiện xác thực certificate phù hợp, bao gồm hai phần:

* Xác thực chứng chỉ: Chứng chỉ được xuất trình cho ứng dụng phải được xác nhận đầy đủ bởi ứng dụng và được ký bởi một CA gốc đáng tin cậy.
* Xác thực tên máy chủ: Ứng dụng phải kiểm tra và xác minh rằng tên máy chủ (Tên chung hoặc CN) được trích xuất từ ​​chứng chỉ khớp với tên của máy chủ mà ứng dụng dự định giao tiếp.