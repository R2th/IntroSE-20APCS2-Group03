![Image 1](https://images.viblo.asia/90f2880a-8ae2-40a0-8066-bca4eb6d1b1a.jpg)

MySQL is used over a large number of applications. And, it is out there
for quite a while. The ecosystem is quite mature. Although, every once in a while
developers like us stumble on trivial issues, which, in turn, becomes time consuming
to resolve. And, this often happens when the application needs to be deployed, maybe
just during the deployment on a staging server.

This happens often because applications get complicated while they gain maturity. And,
deployment sometimes turn into rituals, because of the obvious difference between the
context of deployment and development. While we encounter development phase on a regular
basis, the deployment phase is encountered occasionally, and most of the times we just
leave it to the automation tools (e.g. CICD) once configured. And, this is why, an infra. team is often
required, even for a seemingly trivial application, cause otherwise we'll have to spend
some valuable time over investigating the potential deployment options. Considering
deployment, just the concept of scalability can make things even more complicated than
it already is.

Since, RDBMS like MySQL has a bad reputation when it comes to scalability, not to
mention it's considerably inconvenient to hook it up to the scalability and relevant automation
aiding tools.

In this article, we'll go through some basic but crucial deployment phases of MySQL.

This article considers a `systemd` based Debian host system, and uses MySQL server 5.7
for demonstration. All the procedures has been tested and verified under *Ubuntu Server
18.04*.

## Basic Installation

The basic MySQL installation can be performed by following the steps below.

First, update the repository cache on the target machine.

```sh
apt update
```

Now, we need to install the server.

```sh
apt install mysql-server-5.7
```

Once the server is installed successfully, we are going to run `mysql_secure_installation`
in order to make the installation secure. This tool will prompt for the configuration update
of some security related parameters. It is recommended that you continue with the defaults.
The following steps are recommended.

- select password type *hard*
- generate a strong password using `pwgen -sy 16 1` (installable through `apt install pwgen`)
- remove anonymous user
- remove root login remotely
- remove test database and access to it
- reload changes

MySQL has several authentication modes, and supports a number of authentication plugins. The
most significant ones that we are going to encounter, includes,

- `auth_socket`: A UNIX specific authentication plugin, which enables connection to the server
through a UNIX socket.
- `sha256_password`: This authentication method implements SHA-256 hashing for the account
passwords, and by nature of it's cryptography, during the time of writing of this post, it's
a strong authentication method.
- `mysql_native_password`: MySQL native password is the native format, as the name suggests.
It's a relatively weak authentication method.

It is important to note that on some host systems (including the one we are using), the default
authentication is set to `auth_socket` for the `root` user account.

We need to make another change to our configuration, if our database server expects remote
client (which is almost always the case). By default, MySQL server only listens to `localhost`
(the loopback address `127.0.0.1`,
to be specific.). In order to enable remote clients, edit the MySQL server configuration file (the
primary configuration file is usually located in `/etc/mysql/mysql.conf.d/mysql.cnf` on Debian
systems, but you may choose any of the existing configuration files or even create your own),
and update the `bind-address` parameter under the `[mysqld]` section, by setting it to the
external IP address of the host machine.

And, finally, reload the changes by restarting the service as follows.

```sh
systemd restart mysql.service
```

Just don't forget to keep your MySQL port (`3306`, by default) open on the server firewall, if there's any.

## Basic Client Communication

We finished the basics of server installation phase. And, now we are ready to connect our
client. Since, `auth_socket` is configured as the `root` authentication, by default,
we simply cannot connect using,

```sh
mysql -uroot -p
```

A successful connection will require invoking `mysql` from the root prompt to authenticate through
Unix socket,

```sh
mysql
```

And, now we're in the MySQL root shell! Yey! :D

During the `mysql_secure_installation` phase, we blocked our root user from any remote login
attempt. So, we need to create another user account that we'll be able to access remotely.

```sql
CREATE USER <USERNAME> IDENTIFIED BY <PASSWORD>;
```

The above SQL statement will create a new user, and will implicitly use
`mysql_native_password` plugin for authentication.

The users and the authentication plugin used by each user can be checked by running the
following statement.

```sql
mysql> SELECT User,plugin FROM mysql.user;
+------------------+-----------------------+
| User             | plugin                |
+------------------+-----------------------+
| root             | auth_socket           |
| mysql.session    | mysql_native_password |
| mysql.sys        | mysql_native_password |
| debian-sys-maint | mysql_native_password |
| user1            | mysql_native_password |
+------------------+-----------------------+
5 rows in set (0.00 sec)
```

As we can see that our new user `user1` was created with `mysql_native_password` plugin,
although we haven't explicitly specify it. And, now we are free to the invoke server using our
newly created user as follows.

**From the local system**

```sh
mysql -uuser1 -p
```

**From a remote system**

```sh
mysql -h 192.168.1.10 -uuser1 -p
```

We successfully initiated a client session for our server!
But, there's a downside to our approach, so far. Guess what ...

Let's move on the to the next section to explore what we are really missing! ;)

## Configuring Server for Secure Client Communication

![Image 2](https://images.viblo.asia/58fceef5-77a4-4a0a-aebe-8b40426c76e0.jpg)

With a MySQL configuration like the above, considering the communication
takes place between two nodes on a public network, the authentication and data exchange
sessions are plaintext, so subject to eavesdropping. This is a serious security issue,
for a production grade application. We must encrypt our communication sessions to
achieve full protection.

MySQL has several supported connection modes.
- **Plaintext**
- **SSL**
- **X509 over SSL**

So far, we have encountered the **plaintext** communication mode, which is setup by
default.

Encrypted communications (communication over SSL) requires some asymmetric credentials
to be generated. We run the following command to generate the required key pairs.

```sh
mysql_ssl_rsa_setup
```

One point to note here is that, the command above generates a CA and self signs the
key pairs using the generated CA credentials. Considering security of a production
grade database, we should use a globally accepted CA and sign it. Cause, self
generated CA is by nature, weak.

Considering the fact that you'll be able to sign your key pairs using a globally
accepted CA whenever you need to, we can just proceed with the self signed CA for
the time being.

Key pairs are generated and stored in `/var/lib/mysql` directory. Now, we need to
reference the necessary key files to our configuration file. In order to do that,
Copy over the following files from `/var/lib/mysql/` directory to `/etc/mysql/`
directory and do `chown mysql:mysql /etc/mysql/*.pem`.

- `ca.pem`
- `server-cert.pem`
- `server-key.pem`

Now, in the primary server configuration file, uncomment and update the following
options (which resides in `[mysqld]` section). (On Ubuntu based systems, this is
usually located in the `/etc/mysql/mysql.conf.d/` directory as `mysqld.cnf`.
Although, any of the existing configuration files with `[mysqld]` section can be used.

```conf
# /etc/mysql/mysql.conf.d/mysql.cnf

# ...
[mysqld]
# ...
ssl-ca=/etc/mysql/ca.pem
ssl-cert=/etc/mysql/server-cert.pem
ssl-key=/etc/mysql/server-key.pem
# ...
```

Additionally, further enforcement of protocol can be performed by restricting TLS
and ciphers to a limited set, as follows,

```conf
# /etc/mysql/mysql.conf.d/mysql.cnf

# ...
[mysqld]
# ...
tls_version=TLSv1.2
ssl_cipher=DHE-RSA-AES128-GCM-SHA256 # More cipher suite support can be added by separating them with `;`
# ...
```

And, finally, restart the server for the changes to take effect.

```sh
systemctl restart mysql.service
```

## Communicating with Client over Secure Channel

Now our server supports SSL connection and ready to accept *SSL* and *X509* requests
from the client.

Remember, for secure communication, we have two options.

- **SSL communication**
- **X509 over SSL communication**

For, the first one, we may use our already generated user `user1` to communicate
in a secured way. But, for the latter one, client must present a valid set of
certificate and client key-pair for a successful communication to take place.

### Client Side Concerns

Depending on how we want to enforce the secure communication, client communication
may be classified into two different modes,

- *Permissive mode*
- *Restrictive mode*

**Permissive Mode**

Permissive mode allows fail over. If the encrypted connection fails, a permissive
connection will fail over to unencrypted communication channel. The following
is a permissive mode example.

```sh
mysql -h 192.168.1.10 --ssl-mode=PREFERRED -uuser1 -p
```

**Restrictive Mode**

On the other hand, the restrictive mode will only allow an encrypted connection. If
SSL communication fails, the connection will fail immediately.

```sh
mysql -h 192.168.1.10 --ssl-mode=REQUIRED -uuser1 -p
```

X509 connection mode is also restrictive communication mode by nature, since it only
works over SSL. An, X509 enabled server invocation might look as follows.

```sh
mysql -h <HOST_ADDRESS> -u<USERNAME> --ssl-ca=/path/to/ca.pem --ssl-cert=/path/to/client-cert.pem --ssl-key=/path/to/client-key.pem -p
```

All the credentials mentioned in the example above, becomes readily available since when
`mysql_ssl_rsa_setup` is run for the first time (the credentials can be extracted from
`/var/lib/mysql` directory).

### User Account Related Dependencies

The two different modes above briefs how client communicates with server in a secured
way. But, that's just part of the authentication flow. Authentication also
depends on the user account configuration. Several authentication parameters
can be directly set against the user account, sometimes which is alone sufficient
for securing the communication flow.

Let's have a look at several significant user account configurations.

- **#1 host independent**

    ```sql
    CREATE USER 'user1' IDENTIFIED WITH sha256_password BY 'pas$wORd'
    REQUIRE NONE WITH MAX_USER_CONNECTIONS 3 PASSWORD EXPIRE DEFAULT;
    ```

- **#2 localhost only**

    ```sql
    CREATE USER 'user2'@'localhost' IDENTIFIED WITH sha256_password BY 'pas$wORd'
    REQUIRE NONE WITH MAX_USER_CONNECTIONS 0 PASSWORD EXPIRE DEFAULT;
    ```

- **#3 specific remote host only**

    ```sql
    CREATE USER 'user3'@'<REMOTE_IP>' IDENTIFIED WITH sha256_password BY 'pas$wORd'
    REQUIRE NONE WITH MAX_USER_CONNECTIONS 3 PASSWORD EXPIRE DEFAULT;
    ```

- **#4 host independent, native password**

    ```sql
    CREATE USER 'user4' IDENTIFIED BY 'pas$wORd';
    ```

- **#5 host independent, native password, explicit**

    ```sql
    CREATE USER 'user5' IDENTIFIED WITH mysql_native_password BY 'pas$wORd'
    REQUIRE NONE WITH MAX_USER_CONNECTIONS 3;
    ```

- **#6 host independent, X509 required**

    ```sql
    CREATE USER 'user6' IDENTIFIED WITH sha256_password BY 'pas$wORd'
    REQUIRE X509 WITH MAX_USER_CONNECTIONS 3 PASSWORD EXPIRE DEFAULT;
    ```

- **#7 specific network only, SSL required**

    ```sql
    CREATE USER 'user7'@'<NETWORK_IP>/<SUBNET_MASK>' IDENTIFIED WITH sha256_password BY 'pas$wORd'
    REQUIRE SSL WITH MAX_USER_CONNECTIONS 3 PASSWORD EXPIRE DEFAULT;
    ```

Let's go through the configurations for a bit.

*Configuration #1* does not specify any host, and by default no restriction is enforced.
So, in effect, any host may connect to this user. We are also using `sha256_password`
plugin instead of `mysql_native_password`, cause it's a better fit for security
concerning applications.

*Configuration #2* specifies `localhost` as it's only host. This in effect restricts the
user to localhost only. Notice something else? We set `MAX_USER_CONNECTIONS` to `0`,
which allows any number of concurrent connections for this particular user.

*Configuration #3* specifies a specific remote host, which is identical to configuration
 #2.

*Configuration #4* and *configuration #5* are almost identical, except for the
`MAX_USER_CONNECTIONS` constraints. This is because, configuration #4 implicitly sets
the authentication plugin to `mysql_native_password`.

*Configuration #6* specifies X509 as a requirement, which implies that any connection
request for `user6` must be made through SSL, and additionally valid key pairs need
to be presented for X509.

*Configuration #7* specifies a network as a binding. So, any host within that network
can connect to `user7`. Additionally, `REQUIRE SSL` specifies that, a SSL connection
is required, and any plain connection will be rejected.

A user can be bound to specific host(s), as shown above. The user binding feature can
be summarized as follows.

- **Binding to network**: `'<USERNAME>'@'<IP_ADDR>/<SUBNET_MASK>';`
- **Binding to IP**: `'<USERNAME>'@'<IP_ADDR>'`
- **Binding to domain**: `'<USERNAME>'@'<DOMAIN>'`
- **Binding to domain with wildcard**: `'<USERNAME>'@'%.<DOMAIN_SEG_1>.<TLD>'`
- **Wildcard, match everything**: `'<USERNAME>'@'%'` or, `'<USERNAME>'`

**NOTE**: A single username can be used to bind with different hosts (which in effect,
acts like different users, since you may grant privileges on a username-hostname pair,
instead of just a username :D ). For an example, `CREATE USER 'username' ...`, and
`CREATE USER 'username'@'<HOST>'` queries can be executed successively, which will
create two different entities with an identical name but different host bindings. :)

## Database Backup and Restore

MySQL has several database backup and restore strategies. But, in this article we
are only going to focus on `mysqldump`. Let's go through this strategy in brief.

![Image 3](https://images.viblo.asia/523d47cc-9b5e-4444-bad3-d7c52640fb46.jpg)

### Backup

- **All databases**: `mysqldump --all-databases > /path/to/dump.sql`
- **Specific databases**: `mysqldump --databases <DB_NAME1> [DB_NAME2 ...] > /path/to/dump.sql`
- **A specific database**: `mysqldump <DB_NAME> > /path/to/dump.sql`
- **Specific database tables**: `mysqldump <DB_NAME> [TABLE1 TABLE2 ...] > /path/to/dump.sql`

### Restore
  - **CLI Piping**: `mysql < dump.sql`
  - **From within `mysql` CLI**: `source dump.sql`

### Notes

While using any of the followings as the backup format, `mysqldump` includes `CREATE DATABASE ...` and
`USE` statement in the dump, which conditionally creates database if not exists already, and selects it.

- `mysqldump --all-databases > /path/to/dump.sql`
- `mysqldump --databases <DB_NAME1> [DB_NAME2 ...] > /path/to/dump.sql`

But, this is not the case for the remaining formats. So, if you use any of the following formats to dump database,
it remains your responsibility to ensure that the database exists, and selected.

- `mysqldump <DB_NAME> > /path/to/dump.sql`
- `mysqldump <DB_NAME> [TABLE1 TABLE2 ...] > /path/to/dump.sql`

## Some Trivial But Handy Cheats

- **Show user details**
  - `SELECT * from mysql.user WHERE User IN('username1', 'username2');`
- **Destroying an User**: `DROP USER <USERNAME>;`
- **Account Locking / Unlocking**
  - Locking: `ALTER USER <USERNAME> ACCOUNT LOCK;`
  - Unlocking: `ALTER USER <USERNAME> ACCOUNT UNLOCK;`
- **Update an existing user's authentication method** (significant methods only)
  - Change to UNIX Socket: `ALTER USER <USERNAME> IDENTIFIED WITH auth_socket;`
  - Change to Native Password: `ALTER USER <USERNAME> IDENTIFIED BY <PASSWORD>;`
  - Change to SHA256 Password: `ALTER USER <USERNAME> IDENTIFIED WITH sha256_password BY <PASSWORD>;`
  - Allow all connections (unencrypted and encrypted): `REQUIRE NONE`
  - Allow SSL connection only (CA is optional): `REQUIRE SSL`
  - Allow SSL with X509 (CA) only: `REQUIRE X509`
- **DB / Table / Entry - Create / Destroy / View**
  - Create DB: `create DATABASE <DB_NAME>;`
  - Display DBs: `SHOW DATABASES;`
  - Select a DB to work with: `USE <DB_NAME>;`
  - Show currently selected DB (and misc. info.): `\s`
  - Create table: `CREATE TABLE <TABLE_NAME> ([COL_NAME1 COL_TYPE1, COL_NAME2 COL_TYPE2, ...]);`
  - Show Tables: `SHOW TABLES;`
  - Show Table schema: `DESCRIBE <TABLE_NAME>;`
  - Create entry: `INSERT INTO <TABLE_NAME> VALUES (C1_VAL1, C2_VAL1, ...), (C1_VAL2, C2_VAL2, ...);`
  - Show Entries: `SELECT * FROM <TABLE_NAME>;`
  - Remove entry: `DELETE FROM <TABLE_NAME> WHERE [CONDITION]` (e.g. `name = 'Bad Vlad');`
  - Remove table: `DROP TABLE <TABLE_NAME>;`
  - Destroy DB: `DROP DATABASE <DB_NAME>;`
- **Access granting and revoking**
  - Show grants for specific user: `SHOW GRANTS FOR <USERNAME>;`
  - Grant full access to a specific DB: `GRANT ALL ON <DB_NAME>.<TABLE_NAME> TO <USERNAME>;` (table name can be replaced with `*` as a wildcard, to grant for all tables of a specific database)
  - Grant selective access to specific DBs: `GRANT <PRIV_TYPE> ON <DB_NAME>.* TO <USERNAME>;`
  - Revoke selective access from specific DBs: `REVOKE <PRIV_TYPE> ON <DB_NAME>.* FROM <USERNAME>;`
  - Revoke all access from a specific DB: `REVOKE ALL ON <DB_NAME>.* FROM <USERNAME>;`
- **Checking if current connection uses encryption** (empty value implies unencrypted connection)

  ```SQL
  SHOW SESSION STATUS LIKE 'Ssl_cipher';
  ```
  
  - As an alternative , `\s` can be used to get a full connection status.
- **Show current user**: `SELECT CURRENT_USER();`

---

So far, we covered a lots of ground on the MySQL deployment, including *installation*,
*basic client communication*, *secure channel configuration*, *secure communication*, *backup
and restore* and more. But, still, we are missing one very important part. Guess what,
..., Yep, **scaling** MySQL. By its nature, MySQL is not scalable. It often requires
additional tools to deal with the scaling process. Since the scaling itself deserves an
entire article series of it's own sort, we couldn't cover it in this article for obvious reasons.  We'll
cover scaling on an upcoming post! Till then, happy deploying! :D

## References

- Reference manual: https://dev.mysql.com/doc/refman/5.7/en/
- Account management:
  - https://dev.mysql.com/doc/refman/5.6/en/account-management-sql.html
  - https://dev.mysql.com/doc/refman/5.7/en/alter-user.html
  - Account naming: https://dev.mysql.com/doc/refman/5.7/en/account-names.html
  - https://dev.mysql.com/doc/mysql-secure-deployment-guide/5.7/en/secure-deployment-configure-authentication.html
  - https://dev.mysql.com/doc/mysql-secure-deployment-guide/5.7/en/secure-deployment-user-accounts.html
- Socket authentication: https://dev.mysql.com/doc/refman/5.7/en/socket-pluggable-authentication.html
- Secure Transport: https://dev.mysql.com/doc/mysql-secure-deployment-guide/5.7/en/secure-deployment-secure-connections.html
- Comic: https://blog.gabriela.io/2014/12/07/data-warehouse-experimenting/