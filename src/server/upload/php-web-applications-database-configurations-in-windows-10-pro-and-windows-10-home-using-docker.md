# Windows 10 and Windows 10 Pro database configuration for PHP Web Apps using Docker

If you wish to develop in Windows 10, there are configurations you need to know if you want to develop PHP Web Applications using Docker.

> Note:
<br>
Make sure you have Docker in your machine.
<br>
If you are using Windows 10 Home, install Docker Toolbox ([Docker documentation for installing Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/)). If you are using Windows 10 Pro, install Docker Desktop [Docker documentation for installing Docker Desktop](https://docs.docker.com/docker-for-windows/install/).

## Connecting to database
If you are using MySQL for development, you should have something like below in your docker-compose.yml file.

```
...
...
mysql:
    image: mysql:5.7
    environment:
      MYSQL_DATABASE: <your-database-name>
      MYSQL_USER: <your-user>
      MYSQL_PASSWORD: <your-user-password>
      MYSQL_ROOT_PASSWORD: <your-root-password>
      ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
...
...
```
<br>

Under `ports` is the mapping of your **host port** and **container port** (`<host-port>:<container-port>`). The default mysql port is *3306*; if in any case you encounter an error stating your *host-port* is already in use, you can opt to change to other port numbers like *3307*.

### Connecting to Database using Pure PHP would be something like below:

**For Docker Desktop:**
```
<?php
$HOST = "mysql";
$USER = <your-user>;  //or can be root
$PASS = <your-user-password>; //or <your-root-password> if you used root as $USER
$DB_NAME = <your-db-name>;

$conn = mysqli_connect($HOST, $USER, $PASS, $DB_NAME)or die("Database connection failed: " . mysqli_connect_error());
?>
```

`$HOST` is `mysql` because we use the `mysql` docker container we put in our `docker.compose.yml` file.

<br>

**For Docker Toolbox:**
```
<?php
$HOST = "192.168.99.100:3306";
$USER = <your-user>;  //or can be root
$PASS = <your-user-password>; //or <your-root-password> if you used root as $USER
$DB_NAME = <your-db-name>;

$conn = mysqli_connect($HOST, $USER, $PASS, $DB_NAME)or die("Database connection failed: " . mysqli_connect_error());
?>
```

`$HOST` is `192.168.99.100` because if we open Docker Desktop, we will see there a message saying "Docker is configured to use the default machine with IP 192.168.99.100 ...".

![](https://images.viblo.asia/15f13ea9-78d7-450e-8bfd-b3a2c980f8b4.PNG)
    
Then, we added port `3306` since we defined in our ports in `docker-compose.yml` file like below:
<br>
```
ports:
      - "3306:3306"
```
The right `3306` here is the port of our docker container that is being mapped to our host container - located at the left side.

### Using Laravel Framework
Your `.env` file's database configuration should be like below:
    
**For Docker Desktop:**

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=<your-database-name>
DB_USERNAME=<your-user>
DB_PASSWORD=<your-user-password>
```
In our `.env` file, we used `mysql` for `DB_HOST` because we use the `mysql` docker container we put in our `docker.compose.yml` file. Also, the `DB_PORT` should be the *container port*.

**For Docker Toolbox:**
```
DB_CONNECTION=mysql
DB_HOST=192.168.99.100
DB_PORT=3306
DB_DATABASE=<your-database-name>
DB_USERNAME=<your-user>
DB_PASSWORD=<your-user-password>
```
For Docker Toolbox, our `DB_HOST` is `192.168.99.100` because for Docker Toolbox, docker is configured to use the default machine with IP 192.168.99.100. Fnally, for the `DB_PORT` we also used the *container port*.