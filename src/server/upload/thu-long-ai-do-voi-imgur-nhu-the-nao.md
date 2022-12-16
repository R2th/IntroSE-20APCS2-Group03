*Đã bao giờ bạn nghĩ tới việc sẽ thử lòng người yêu, đồng nghiệp hay bất kỳ đối tượng nào bằng một khảo sát (survey) đơn giản? Và hơn nữa chỉ với một file HTML tĩnh, hoàn toàn không có kết nối database hoặc chạy service gì hầm hố, nhưng kết quả trả về luôn rất real-time và chỉ gửi cho mỗi chúng ta.
Hôm nay, mình xin phép hướng dẫn cách tạo một trang survey bằng HTML tĩnh, sau đó chụp lại màn hình bằng HTML2Canvas và sử dụng API upload hình của Imgur vào tài khoản cá nhân.*
### Kiến thức nền
-	HTML, boostrap và JQuery
-	Testing API bằng Postman

### Bước 1: Lấy Access Token
Các bạn hãy truy cập trang https://imgur.com/ và đăng ký cho mình một tài khoản cá nhân.
Sau khi login thành công, truy cập vào trang: https://api.imgur.com/oauth2/addclient để đăng ký quyền truy cập cho Application của chúng ta. Hãy điền theo như hình bên dưới:
+ Application Name: your App name (vd: mySurvey)
+ Authorization Callback URL: https://www.getpostman.com/oauth2/callback
+ Email/Description

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/l81iriz7y3_image.png)

Imgur cho phép Application truy cập tài khoản cá nhân theo hình thức xác thực [OAuth2](https://viblo.asia/p/introduction-to-oauth2-3OEqGjDpR9bL). Sau khi Submit, chúng ta sẽ có được **Client ID** và **Client Secret** như hình (hãy lưu thông tin này lại).

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/kkcykd2h3y_image.png)

Đến bước lấy Access Token, lúc này chúng ta cần phải mở postman ra, và thực hiện từng bước theo như số thứ tự bên dưới.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/3xr7bfir7o_image.png)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/466g3au1o7_image.png)

Điền đầy đủ thông tin theo hình trên nhé. Sau khi **Request Token**, Imgur sẽ yêu cầu chúng ta đăng nhập một lần nữa để cấp quyền (*Allow*) cho App được truy cập vào tài khoản của mình.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/113b56we4d_image.png)

Sau khi Allow thành công, postman sẽ gửi cho chúng ta một **Access Token** (hãy lưu nó lại). Access Token này sẽ có giá trị trong một tháng.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/q2l8qoxion_image.png)

### Bước 2: Tạo một trang khảo sát (Survey) đơn giản
Ở phần đầu bài viết này, mình đang mặc định rằng các bạn đã có kiến thức nền về HTML, boostrap và Jquery nên mình sẽ không nhắc lại, nên nếu bạn nào cần có thể tìm hiểu thêm phần này từ các bài viết khác nhé. 
Các bạn hãy tạo một trang HTML tĩnh tên là *“survey.html”* như đoạn code bên dưới (có thể sử dụng các editor phổ biến như Visual Code, Atom hay Notepad++). Thư viện tạo ra các component cho survey, mình sử dụng **shieldui**, và được dựa vào template tại [đây](http://www.prepbootstrap.com/bootstrap-template/bootstrap-survey).

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <title>SURVEY</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="http://www.shieldui.com/shared/components/latest/css/light-bootstrap/all.min.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
  <script type="text/javascript" src="http://www.shieldui.com/shared/components/latest/js/shieldui-all.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
  <script type="text/javascript">

      jQuery(function ($) {

          var progress1 = $("#progress1").shieldProgressBar({
              value: 50,
              text: {
                  enabled: true,
                  template: "{0} %"
              }
          }).swidget();

          $("#increase1").shieldButton({
              events: {
                  click: function () {
                      progress1.value(progress1.value() + 10);
                  }
              }
          });
          $("#decrease1").shieldButton({
              events: {
                  click: function () {
                      progress1.value(progress1.value() - 10);
                  }
              }
          });

          $("#slider1").shieldSlider({
              cls: "slider",
              min: 0,
              max: 10,
              buttons: true,
              ticks: {
                  enabled: true
              }
          });

          $("#slider2").shieldSlider({
              cls: "slider",
              min: 0,
              max: 10,
              buttons: true,
              ticks: {
                  enabled: true
              }
          });

          $(".results").hide();

      });

      function upload(){}
  </script>

  <style>
      .slider {
          width: 100%;
      }

      body {
        background-color: #002233;
      }

      .container{
          margin: 50px auto 50px auto;
      }
  </style>

</head>
<body>
  <div class="container">
      <div class="col-md-2">
      </div>
      <div class="col-md-8">
          <div class="panel panel-default">
              <div class="panel-heading">Level "sương sương"</div>
              <div class="panel-body">
                  Do you hate me?
                  <br />
                  <div class="btn-group" data-toggle="buttons">
                      <label class="btn btn-default">
                          <input type="radio" autocomplete="off"/> Yes
                      </label>
                      <label class="btn btn-default">
                          <input type="radio" autocomplete="off" /> No
                      </label>
                  </div>
                  <br />
                  <br />

                  Do you miss me?
                  <br />
                  <div class="btn-group" data-toggle="buttons">
                      <label class="btn btn-default">
                          <input type="radio" autocomplete="off" /> Yes
                      </label>
                      <label class="btn btn-default">
                          <input type="radio" autocomplete="off"/> No
                      </label>

                  </div>
                  <br />
                  <br />
              </div>
          </div>

          <div class="panel panel-default">
              <div class="panel-heading">Level "lưng lửng"</div>
              <div class="panel-body">
                  <div class="row">
                      <div class="col-md-4 col-sm-4 col-xs-3">
                          <span style="font-size:15px;">How much do you hate me?</span>
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-9">
                          <input class="slider" id="slider1" value="4" />
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-4 col-sm-4 col-xs-3">
                          <span style="font-size:15px;">How much do you miss me?</span>
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-9">
                          <input class="slider" id="slider2" value="4" />
                      </div>
                  </div>

              </div>
          </div>

          <div class="panel panel-default">
              <div class="panel-heading">Level "đu cột" - How much do you <b>love</b> me?</div>
              <div class="panel-body">
                  <div class="row">
                      <div class="col-md-2 col-sm-2 col-xs-3 text-center">
                          <button id="decrease1" style="width:100%; max-width:35px;">-</button>
                      </div>
                      <div class="col-md-8 col-sm-8 col-xs-8">
                          <div style="width:100%;" id="progress1"></div>
                      </div>
                      <div class="col-md-2 col-sm-2 col-xs-3 text-center">
                          <button id="increase1" style="width:100%; max-width:35px;">+</button>
                      </div>
                  </div>
                  <div class="clearfix"><br /></div>
              </div>
          </div>

          <div class="panel panel-default">
              <div class="panel-heading">
                  <button onclick="upload()">Show results</button>
                  <div class="clearfix"><br /></div>
                  <span style="font-size:15px;color:red;" class="results">Congratulations! Your choices will send to me right now! And I will know your heart. hehe</span>
              </div>

          </div>

      </div>
  </div>
</body>
</html>
```
Các bạn hoàn toàn có thể thay đổi các câu hỏi hoặc template phù hợp với ý muốn của mình.
Sau khi chạy thử trên trình duyệt, ta sẽ được một trang tĩnh như thế này.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ke4u4vvv7p_image.png)

Ở nút (button) “Show results” (Cho thấy kết quả), chúng ta sẽ khai báo sẵn một function có tên là upload (). Chức năng (Function) này sẽ được nói tới ở Bước 3. Ngoài ra ở phần header, ngoài việc include các thư viện cơ bản của boostrap và jquery, còn có thêm thư viện **HTML2Canvas** cho việc chụp màn hình, cũng sẽ được nói tới trong Bước 3.
### Bước 3: Tạo chức năng chụp màn hình và đăng tải (upload) lên Imgur.
Để chụp được màn hình, chúng ta sẽ sử dụng thư viện HTML2Canvas. Thư viện này cho phép bạn chụp màn hình dựa trên DOM. Do vậy, nó có một nhược điểm là chỉ phản ánh theo DOM, không phải thông tin trên màn hình. Một số component được generate từ script, có thể sẽ không được chụp lại.

Để upload hình, chúng ta sử dụng một [API](https://api.imgur.com/3/upload) của Imgur. Các bạn có thể xem thêm [documentation](https://apidocs.imgur.com/?version=latest#intro) các API của Imgur tại đây.

Quay lại function *upload()* đã được đề cập ở trên, chúng ta sẽ thêm đoạn script như sau. Lưu ý, *apiKey* chính là Access Token mà chúng ta đã note ở trên, mỗi người chỉ có một Access Token duy nhất.
```js
function upload(){
        let region = document.querySelector("body"); // whole screen
        var imageId = "";
        var apiKey = "your access token";
        
        
        html2canvas(region, { onrendered: function(canvas) {
              //document.body.appendChild(canvas); //show image captured back to our page
              try {
                  var img = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
              } catch(e) {
                  var img = canvas.toDataURL().split(',')[1];
              }
              // Begin file upload
              console.log('Uploading file to Imgur..');

              var apiUrl = 'https://api.imgur.com/3/upload';

              var settings = {
                async: false,
                crossDomain: true,
                processData: false,
                contentType: false,
                type: 'POST',
                url: apiUrl,
                headers: {
                  Authorization: 'Bearer ' + apiKey,
                  Accept: 'application/json',
                },
                mimeType: 'multipart/form-data',
              };

              var formData = new FormData();
              formData.append('image', img);
              //formData.append('album', 'G7mNnQJ'); //your albumID
              settings.data = formData;

              $('.results').show();

              // Response contains stringified JSON
              // Image URL available at response.data.link
              $.ajax(settings).done(function (response) {
                  console.log(response);
              });

            },
        });

  }
```
Và đây là kết quả:
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/6yemjrt3ca_surveyImgur1.gif)![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/yhal1jbgjn_surveyImgur2.gif)
### Thỏa sức sáng tạo…
Hiện tại, Imgur đang cho phép người dùng **upload 50 images trong mỗi giờ**. Như vậy, cũng được xem tương đối màu mỡ cho anh em dev chúng ta.

Mọi thứ sẽ không dừng lại ở việc chụp hình survey để thử lòng người yêu, sếp, đồng nghiệp,… nữa. Bạn có thể áp dụng công cụ này một cách chuyên nghiệp hơn để chụp hình các data mà User đã điền trong một trang (page). Ở một số web app tương đối khá “vã” về business như trong lĩnh vực tài chính, việc capture lại các data của User trong thực tế nhiều khi thực sự rất cần thiết trong việc testing về workflow. Tuy nhiên cũng chỉ nên áp dụng phương pháp này trong giai đoạn thực sự ngắn, và nên viết một API tự động xóa những hình ảnh này sau một khoảng thời gian nhất định để đảm bảo tính bảo mật cho data.

*Hãy để lại bình luận, nếu các bạn gặp vấn đề gì trong việc “vọc vọc” tìu tó ri ồ (tutorial) này. Hoặc nếu các bạn có ý kiến phản hồi hay góp ý cho bài viết tốt hơn, thì cũng đừng ngại ngần giao lưu với mình nhé.*