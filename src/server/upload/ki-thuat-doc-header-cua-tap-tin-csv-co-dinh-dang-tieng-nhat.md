### Giới thiệu
Xin chào mọi người, chắc cũng khuya rồi nên nay viết một bài nhẹ nhẹ chia sẻ chút về việc đọc header trong tập tin CSV tiếng Nhật nha (.csv). Thường các tập tin tiếng Nhật có định dạng rất khó chịu khi chúng ta xử lý họ thường đính kèm thêm các chuỗi kí tự lạ vào đầu file hoặc đầu mỗi dòng vì thế chúng ta phải cận thận. Hay gần đây thì mình có gặp file không có đuôi định dạng và được họ compile rồi sau đó yêu cầu chúng ta xử lý với file đó :D 
Lan man thế đủ rồi vào vấn đề chính thôi, mình đã thử đọc header bằng một số thư viện như OpenCSV, CSVParser và lớp có sẵn của Java như Scanner và FileInputStream (đọc trực tiếp) đều gây ra lỗi định dạng kí tự đặc biệt vì thế mình quyết định dùng cách lấy thẳng MultipartFile sau đó parse file đó qua Bytes thì ok tuyệt vời. Sau đây là cách xử lý của mình.

### Xử lý code
```
try {

            byte[] bytes = file.getBytes();

            String body = new String(bytes, StandardCharsets.UTF_8).trim().replaceAll("[\"]", "");

            BufferedReader input = new BufferedReader(new StringReader(body));

            String line;

            int lineIndex = 0;

            while ((line = input.readLine()) != null) {

                if(lineIndex > 1) {

                    break;

                }

                String UTF8_BOM = "\uFEFF";

                if (line.startsWith(UTF8_BOM)) {

                    line = line.substring(1);

                }

                String[] row = line.replaceAll(" ", "").split(",");

                if (lineIndex > 0) {

                    // process with body of CSV file

                }

                else {

                    if (row.length != headerArr.length) {

                        // check number of CSV header

                    }

                    for(int i = 0; i < row.length; i++) {

                        if (!row[i].equals(headerArr[i])) {

                            // check header with list header (validate CSV file is right format or not

                        }

                    }

                }

                lineIndex++;

            }

        }

        catch (Exception e) {

            e.printStackTrace();

        }

    }
```

### Giải thích code
- Ok ha đầu tiên file ở đây là <strong>MultipartFile</strong> còn nếu các bạn truyền vào là File thì các bạn tìm hiểu cách thử xem File thì sẽ sử lý trong tiếng Nhật thế nào nhé. Mình <strong>getBytes()</strong> từ file đó ra thành mảng <strong>byte[]</strong>, sau đó đưa mảng đó về <strong>String</strong> , bỏ dấu cách và các dấu \ thường là format bên Nhật. Tiếp theo sử dụng <strong>BufferedReader</strong> để đọc <strong>chuỗi String</strong> mình vừa parser được ha :D

- Tiếp theo thì ta đọc từng dòng của nó thôi và sử dụng <strong>lineIndex</strong> để check header và phần body của nó. Ở đây là logic code của mình thôi mọi người có thể chính sửa theo ý mọi người, phần mình nhắc đến đầu bài là các kí tự lạ trong tiếng Nhật chúng ta nên open file csv bằng Notepad++ kiểm tra coi phía đầu file có các kí tự được chèn hay không nó được gọi là BOM nếu có thì ta <strong>subString()</strong> dòng đọc của chúng ta nhé. À quên mất đọc từng dòng thì dùng lệnh (<strong><em>line = input.readLine()) != null </em></strong>để check.

- Sau khi đã loại bỏ các kí tự đặc biệt và các chuỗi bị chèn vào thì ta đưa header này vào mảng bằng hàm <strong>split()</strong>. Sau đó mảng header đã có từ đó mà chúng ta lần lượt check các index của header trong mảng có khớp với header format của File yêu cầu hay không nếu đúng thì cho upload file còn không thì thông báo lỗi cho người dùng. 

### Ứng dụng
Ở đây mình ứng dụng cho việc:
+ Validate định dạng File CSV với header
+ Xử lý với các tập tin tiếng Nhật có kí tự lạ
+ Một cách để đọc file được người dùng upload lên server

### Kết luận
Trên đây là chia sẻ và thủ thuật nhỏ của mình, nếu mọi người có đóng góp gì có thể bình luận và chia sẻ, góp ý bên dưới nhé. Cảm ơn tất cả mọi người!

- Link bài viết tham khảo: [https://gociter.wordpress.com/2018/11/30/ki-thuat-doc-header-cua-tap-tin-csv-co-dinh-dang-tieng-nhat/](https://gociter.wordpress.com/2018/11/30/ki-thuat-doc-header-cua-tap-tin-csv-co-dinh-dang-tieng-nhat/)