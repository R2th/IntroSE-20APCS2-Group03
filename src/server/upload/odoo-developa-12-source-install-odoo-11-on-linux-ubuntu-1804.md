### Hmmm...
> Hi, me again! :D
> 
> This time, I'm using Ubuntu 18.04 (64 bit)
> 
> I don't have Unikey, so Engrisk plzz...
> 

![](https://images.viblo.asia/02d1d4c7-fbb4-408d-b4ac-af1bcdc214a4.jpg)

### Let's start

***I'll install odoo at `~/code/` folder so you shold create that folder by running this command***

```
mkdir ~/code
``` 

1. Requirements

    ```bash
    sudo apt-get install -y git curl gcc libsasl2-dev python3-dev libldap2-dev libssl-dev python3-pip wkhtmltopdf vim libxml2-dev libxslt-dev python-dev
    ```

2. Install Postgresql 

    I'm using **Ubuntu 18.04** / but you can choose your Linux Distro at here https://www.postgresql.org/download/

    ```bash
    sudo touch /etc/apt/sources.list.d/pgdg.list
    sudo vim /etc/apt/sources.list.d/pgdg.list
    ```
    
    Add this line to `pgdg.list` file.
    
    ```bash
    deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main
    ```
    
    In case you don't know how to use vim: copy the line then back to terminal, press `[i]`, paste it, press `[Esc]` for exit edit mode, then press `[:]` `[w]` `[q]` (:wq) then press `[Enter]`
        
    ```bash
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
    sudo apt-get update
    sudo apt-get install postgresql-9.6
    sudo -i -u postgres
    psql
    CREATE USER odoo WITH encrypted password 'odoo'; ALTER USER odoo WITH SUPERUSER;
    \q
    ```

3. Nodejs and less

    ```bash
    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo npm install -g less
    ```
 
 4. Clone Odoo

    ```bash
    cd ~/code/
    git clone https://github.com/odoo/odoo.git -b 11.0
    ```
    
    Don't forget install python reqrirements lib
    
    ```bash
    sudo pip3 install Babel decorator docutils ebaysdk feedparser gevent greenlet html2text Jinja2 lxml Mako MarkupSafe mock num2words ofxparse passlib Pillow psutil psycopg2-binary pydot pyldap pyparsing PyPDF2 pyserial python-dateutil pytz pyusb PyYAML qrcode reportlab requests suds-jurko vatnumber vobject Werkzeug XlsxWriter xlwt xlrd
    ```
    
5. Odoo config file.

    ```bash
    touch ~/code/odoo.conf
    vim ~/code/odoo.conf
    ```
    
    paste this, In case you don't know how to use vim: copy the lines bellow then back to terminal, press `[i]`, paste it, press `[Esc]` for exit edit mode, then press `[:]` `[w]` `[q]` (:wq) then press `[Enter]`
    
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
    
    create your addon folder
    
    ```bash
    mkdir ~/code/myaddon
    ```
    
6. Run odoo now :D

    ```bash
    python3 ~/code/odoo/odoo-bin -c ~/code/odoo.conf
    ```
    
7. You can use your favorite IDE like Pycharm or VSCode for debug and running Odoo

Open your browser and go to `localhost:8069`, done!

Goodluck.