Xin chào các bạn , hôm nay tôi xin hướng dẫn các bạn cách thực hiện truy vấn bất đồng bộ tới Web Service trong Android

Trước tiên , đặt ra 1 câu hỏi : "Tại sao chúng ta lại cần thực hiện truy vấn bất đồng bộ đến Web Service ?"

Câu trả lời đơn giản là đưa ra 1 ví dụ thực tế , giả sử các bạn cần thực hiện một request lên Web Service , Web Service đó yêu cầu Token và Token được lấy từ Server cũng thông qua Web Service.
Vậy tức là , làm gì thì làm , trước tiên tôi phải có Token đã , nếu không có Token thì request cái gì cũng failed ! 
Đó là lúc chúng ta cần Async Request , tức là , chỉ khi nào có Token , mới thực hiện tiếp những task còn lại , nếu không có Token thì báo lỗi để user xử lý

Vậy , trong Android , trước đây chúng ta có cách thực hiện đó là sử dụng AsyncTask để làm điều này 

```
private class getToken extends AsyncTask{

        ProgressDialog mDialog;

        //Ctrl+O


        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            //Khởi tạo dialog 
            mDialog = new ProgressDialog(MainActivity.this,android.R.style.Theme_DeviceDefault_Dialog);
            mDialog.setCancelable(false);
            mDialog.setMessage("Please wait");
            mDialog.show();
        }

        @Override
        protected Object doInBackground(Object[] objects) {
        //Thực hiện việc truy vấn về web Service
            HttpClient client = new HttpClient();
            client.get("http://test.com/token.php", new HttpResponseCallback() {
                @Override
                public void success(final String responseBody) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            //Hide group waiting
                            group_waiting.setVisibility(View.GONE);
                            //Show group payment
                            group_payment.setVisibility(View.VISIBLE);

                            //Set token
                            token = responseBody;
                        }
                    });
                }

                @Override
                public void failure(Exception exception) {
                    Log.d("EDMT_ERROR",exception.toString());
                }
            });
            return null;
        }

        @Override
        protected void onPostExecute(Object o) {
            super.onPostExecute(o);
            mDialog.dismiss();
        }
    }
```

Nhưng hôm nay , tôi muốn giới thiệu tới các bạn 1 cách ngắn gọn , đơn giản , tối ưu hơn ^^ Phù hợp cho cả Kotlin , đó là dùng thư viện Async HTTP Request

Bước 1 , vào Gradle (app module) , thêm đoạn sau để add AsyncHttpClient vào project của bạn

```
implementation 'com.loopj.android:android-async-http:1.4.9'
```

Bước 2 , thay thế class getToken mà kế thừa AsyncTask ở trên thành 1 hàm
```
private void getToken()
{

  //Khởi tạo dialog 
            mDialog = new ProgressDialog(MainActivity.this,android.R.style.Theme_DeviceDefault_Dialog);
            mDialog.setCancelable(false);
            mDialog.setMessage("Please wait");
            mDialog.show();
            
            
AsyncHttpClient client = new AsyncHttpClient();
//Ở đây vì API của tôi trả về String , ko phải Json nên tôi dùng TextHttpResponseHander
        client.get("http://test.com/token.php", new TextHttpResponseHandler() {
            @Override
            public void onFailure(int statusCode, Header[] headers, String responseString, Throwable throwable) {
                      mDialog.dismiss();
                              Log.d("EDMT_ERROR",exception.toString());
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, String responseString) {
               mDialog.dismiss();
                       //Hide group waiting
                            group_waiting.setVisibility(View.GONE);
                            //Show group payment
                            group_payment.setVisibility(View.VISIBLE);

                            //Set token
                            token = responseBody;
                            
            }
        });
}
```

Xong , bạn có thấy việc implement một async request thật sự dễ dàng ^^ Hãy thử áp dụng nó cho dự án của bạn nhé ^^ Qua rồi thời viết code tràn giang đại hải ^^