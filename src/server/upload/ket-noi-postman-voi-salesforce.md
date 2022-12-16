# **Setup Cross-Origin Resource trong Salesforce**

Cần add 2 URL  `https://*.postman.com` và  `https://*.postman.co` vào CORS để Salesforce cho phép các request của Postman.
Từ màn hình Setup, gõ **cors** Trong hộp Quick Find.
1. Click New.
2. Nhập` https://*.postman.com` .
3. Click **Save**.
4. Add thêm  `https://*.postman.co` làm như 1~3
5. Click Save.
![image.png](https://images.viblo.asia/2d548efb-9cea-4fca-93de-071ae704bafa.png)


# **Set Up và Connect Postman**
## Sign Up vào Postman và tạo một Workspace

1. Nếu bạn đã có tài khoản Postman thì [đăng nhập](https://identity.getpostman.com/login) vào Postman bằng tài khoản của bạn, nếu bạn chưa có tài khoản thì [tạo mới](https://identity.getpostman.com/signup?email=duc_nd%40detomo.co.jp) một tài khoản Postman và đăng nhập.
2. Chọn **Workspaces** từ menu.
3. Tạo mới một Workspace.
4. Đặt tên workspace của bạn là **SalesforceCollection**.
5. Chọn **Personal**.
6. Click vào button **Create Workspace**.

## **Fork the Salesforce Collection**

Mở  [public Salesforce Developers](https://www.postman.com/salesforce-developers/workspace/salesforce-developers) workspace và tạo một fork của Salesforce APIs collection.
1. Trong Collections, Chọn Salesforce Platform APIs và expand nó ra.
    ![image.png](https://images.viblo.asia/42f058f9-074e-4762-88b0-9a2de0c9ac32.png)

2. Click vào icon Fork để tạo một  fork của collection này.
3. Nhập **MySalesforceAPIFork**.
4. Keep **SalesforceCollection** as the Workspace.
    ![image.png](https://images.viblo.asia/27c91058-a00a-4dfb-8bc4-a9fc59cec3e9.png)
5. Click button **Fork Collection**.

Bây giờ Salesforce Api collection này đã thực sự ở trong Postman của bạn. Tiếp the chúng ta cần kết nối collection này tới SF qua authorize.

## **Authorize**
Cần authenticate với Salesforce để truy cập APIs..

Phải chắc chắn bạn đang login vào một tài khoản SF trên browser đang mở.
1. Trong Postman, bên dưới Collections, chọn **Salesforce Platform APIs**.
2. Mở tab `Authorization`.
3. Chọn Type  OAuth 2.0.
4. Click button **Get New Access Token**.
5. Màn hình `Authorization` hiện lên

![image.png](https://images.viblo.asia/fdb7b83a-3280-49d7-b05e-99e71e1d65da.png)

6. Cho phép  “Salesforce Platform APIs Collection for Postman” access tới SF của bạn.
7. Click button **Allow** 
8. Dialog Manage Access Tokens hiển thị lên. Trong  Manage Access Tokens hiển thị các thông tin: Token Name, Access Token, Token Type, instance_url, issued_at, signature, and scope
![image.png](https://images.viblo.asia/29e076b4-075d-4e34-99bb-3a26907757a3.png)
9. Copy `instance_url` để sử dụng tại step 12.
10. Click button **Use Token**.
11. Mở tb `Variables`.
12. Dán instance_url đã được copy tại step 9 vào trong dòng ` _endpoint` của cột **CURRENT VALUE**.
13. Lưu lại.

## TEST
![image.png](https://images.viblo.asia/82d10bc7-1465-4459-972b-aa1124b0c032.png)