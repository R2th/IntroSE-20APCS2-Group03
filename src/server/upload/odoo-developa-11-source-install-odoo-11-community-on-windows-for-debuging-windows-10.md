### Double verbalism

> Henlo, i'm new blogger at viblo, i do'nt like English much but i must 
> 
> study it so will use english for writting this. Hope it's easy to undarstand.
> 
> :D
> 

![Hình ảnh](https://images.viblo.asia/02d1d4c7-fbb4-408d-b4ac-af1bcdc214a4.jpg)

### Required softwares:

> You must install this software befor we start
> 
> you can google for dowload link and if install them
> 
> I successed install odoo with bellow version
> 

1. Git 2.17
2. Nodejs 8.11
3. Posgresql 9.6 (remenber postgres password)
4. Python 3.6 (32 bit)
5. Pycharm Community
6. [psycopg](http://www.stickpeople.com/projects/python/win-psycopg/) for python 3.6 32 bit

### Steps

I'm using `C:\Code\` folder for install and code odoo. Create `C:\Code\` by this command.

```bash
mkdir "C:\Code\"
```

> **Hey: Run cmd as Administrator**

1. Download Odoo 11 Source, mở cmd gõ:

    ```bash
    cd "C:\Code\"
    ```

    ```bash
    git clone -b 11.0 http://github.com/odoo/odoo.git
    ```
    
    or use this if you had no time
    
    ```bash
    git clone --depth=1 -b 11.0 http://github.com/odoo/odoo.git
    ```
    
2. Create postgres user odoo/odoo:

    ```bash
    cd "C:\Program Files\PostgreSQL\9.6\bin"
    ```
    
    `C:\Program Files\PostgreSQL\9.6\bin` is the default path of postgres, if you didn't use it, replace that.
    
    ```bash
    psql -U postgres
    ```
    
    type postgres password and run this command
    
    ```sql
    CREATE USER odoo WITH encrypted password 'odoo'; 
    ALTER USER odoo WITH SUPERUSER;
    ```
    
    quit by 
    
    ```
    \q
    ```
    
3. Install less

    ```bash
    npm install -g less
    ```
    
4. install python lib:

    ```bash
    pip3 install Cython Babel decorator docutils ebaysdk feedparser gevent greenlet html2text Jinja2 lxml Mako MarkupSafe mock num2words ofxparse passlib Pillow psutil pydot pyparsing PyPDF2 pyserial python-dateutil pytz pyusb PyYAML qrcode reportlab requests suds-jurko vatnumber vobject Werkzeug XlsxWriter xlwt xlrd pywin32
    ```
    
5. Create odoo config file:

    ```bash
    copy "C:\Code\odoo\debian\odoo.conf" "C:\Code"
    ```
    
    open with notepad
    
    ```bash
    start notepad "C:\Code\odoo.conf"
    ```
    
    paste this
    
    ```bash
    [options]
    ; This is the password that allows database operations:
    ; admin_passwd = admin
    db_host = localhost
    db_port = 5432
    db_user = odoo
    db_password = odoo
    addons_path = ./addons, ./odoo/addons, ../myaddon
    ```
    
    create your own addon folder
    
    ```bash
    mkdir "C:\Code\myaddon"
    ```
    
6. Run Pycharm, and do this.

    #### Pic. 1.
    ![](https://images.viblo.asia/2bde7813-1d61-4ea6-8e8e-9ee2d41bc6b3.png)

    #### Pic. 2.
    ![](https://images.viblo.asia/a5963906-ad96-4e2d-ad1b-4632bf23ba1e.png)

    #### Pic. 3.
    ![](https://images.viblo.asia/d4055972-ef25-4494-a482-8dff6307787e.png)

    #### Pic. 4.
    ![](https://images.viblo.asia/5e85ebd4-7826-4624-8184-68f664712f4d.png)
    
    `Run` or `[Shift] + [F10]` to start Odoo.
    Go to `localhost:8069` and create the new database.
    
    
    Goodluck!