A. Authenticate & password
I. Password: use strong password
- Users may not like it, enforcing password requirements such as a minimum of around eight characters, including an uppercase letter and number will help to protect their information. Need use strong passwords to server and website admin area, but equally also important to insist on good password practices for users to protect the security of their accounts.
- Passwords should always be stored as encrypted values, using a one way hashing algorithm such as SHA. For extra website security it is a good idea to salt the passwords, using a new salt per password. 
Bad practice: use origin password as "HappyDay1" and use SHA to encoding it, somebody can easy to get origin password. Good practice "HappyDay1" -> "{current_time}_HappyDay1" -> SHA. 
- Schedule for change password and support user when they forgot them.

II. Use Two factor authentication
Is an extra layer of security that is known as "multi factor authentication" that requires not only a password and username but also something that user has on them. For example: a piece of information only they should know or have immediately to hand - such as a physical token.  

- Push notification.
- Hardware token.
- SMS code.
- Calling via phone.

III. Define security level
Website shoud define into some level for security. For example:
- Basic level: read normally information, just pass authenticate filter, correct access token.
- Medium level: change information, pass basic authen and check CSRF token
- High level: execute high risk task, need check confirm OTP code from hardware ...

IV. Store ip address, devide and time user login.
Warning user when they login form exchange ip and device.
Show history login for users when they want to check.

B. About source code:
I. Check Sql injection: SQL injection attacks are when an attacker uses a web form field or URL parameter to gain access to or manipulate your database. So we need avoid query like:
statement = "SELECT * FROM table WHERE column = '" + parameter + "';"

II. Preventing Cross-site request forgery (CSRF)
CSRF is an attack where a malicious site sends a request to a vulnerable site where the user is currently logged in.
For example:
1. user logs into www.example.com using forms authentication
2. server authenticates user. The response from server includes an authentication cookie
3. Then user visit another website. In this website contains HTML code like below
```
<h1>You Are a Winner!</h1>
  <form action="http://example.com/api/account" method="post">
    <input type="hidden" name="Transaction" value="withdraw" />
    <input type="hidden" name="Amount" value="1000000" />
  <input type="submit" value="Click Me"/>
</form>
```
The user clicks the submit button. The browser includes the authentication cookie with the request and the request can pass authenticate on server.
CSRF attacks are possible against web sites that use cookies for authentication.

To help prevent CSRF attacks, we can use request verification token as hidden form token to prevent as below
```
<form action="/api/account" method="post">
    <input name="csrf_token" type="hidden" value="6fGBtLZmVBZ59oUad1Fr33BuPxANKY9q3Srr5y[...]" />    
    ....
</form>
```

III. Error message:
Provide only enought meaning messsage when errors happen to help users can understand they need to do. Make sure that all exception error catch by common logic and hidden security information like API keys; database host ip, password .... Keep detailed errors in server logs.

IV. Validate on both sides: client side and server side
The browser can catch simple failures like fields that are empty, min, max or regex check. However, These can be bypassed, so we need make sure check for these validation and deeper validation on server side as failing to prevent malicious code or scripting code being inserted into the database or could cause undesirable results in website.

V. File uploads
Allowing users to upload files to website can be a big website security risk, even if it’s simply to change their avatar. The risk is that any file uploaded could contain a script that when executed on server.
To prevent this issued, we could:
1.  Stop users from being able to execute any file they upload
- Rename the file on upload to ensure the correct file extension
- Or to change the file permissions, for example: use chmod 0666 so it can't execute.
2. Prevent direct access to uploaded files. 
Any files uploaded to website are stored in a folder outside of the webroot or in the database as a blob or stored them in 3th services as aws.
3. Highest security for upload files, encrypt them with user private key.
User don't want to another people can understand their files. Bad suituation, uploaded files could be took by unexpected man, he couldn't read uploaded file.
Beside, with encrypt file, malicious code or scripting code will be prevented.

VI. Use Https
HTTPS is a protocol used to provide security over the Internet. HTTPS guarantees  that users are talking to the server they expect, and that nobody else can intercept or change the content they're seeing in transit.

VII. Support user history and roll back action when possible.
User can view their action and in some case, they can roll back action if possible.

C. Database and configure server
- Database should running on a different server to that of your web server. Prevent database server cannot be accessed directly from the outside world, only website server can access it, minimising the risk of your data being exposed (use firewall, white list)
- Configure user and role permission for database.
- Ensure we have a firewall setup, blocking all non essential ports. If possible setting up a DMZ (Demilitarised Zone) only allowing access to port 80 and 443 from the outside world. Although this might not be possible if you don't have access to your server from an internal network as you would need to open up ports to allow uploading files and to remotely log in to your server over SSH or RDP.
- If you are allowing files to be uploaded from the Internet only use secure transport methods to your server such as SFTP or SSH.
- Don't forget about restricting physical access to your server.
- Finally, we should check configure on website frequently to make sure that nobody try to change configure on website, For example: open port, add admin user ...


After develop, We could use some security tool for test website. For example: https://geekflare.com/online-scan-website-security-vulnerabilities/