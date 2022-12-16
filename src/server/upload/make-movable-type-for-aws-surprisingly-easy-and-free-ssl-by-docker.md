# Movable Type for AWS
There is an AWS version of Movable Type. You can select a preinstall image when launching an instance on EC2.

[Please refer to Movable Type for AWS (AMI) Getting Started Guide | CMS Platform Movable Type on Amazon EC2 Cloud.](https://www.sixapart.jp/movabletype/aws/how-to-use.html)

Movable Type is free for `nano` and `micro` instances (only EC2 fee is charged). So good!

Moreover, not the CGI version, but the Plack version is fast. We have passed the generation with the idea of borrowing a cheap rental server and installing MT

# SSL is not supported

Movable Type for AWS does not support SSL by default. Nowadays, AOSSL has become mainstream, and since there is authentication of the management screen, it cannot be put into practical use as it is.

SSL is required in some way.

* nginx or Apache support SSL → Purchase a certificate or use Let's Encrypt
* Use ELB / ALB → ACM can also use a free SSL certificate
* Use CloudFront → ACM can also use a free SSL certificate

This is the first time that comes to mind, but this time, we will introduce how to easily make SSL (Let's Encrypt) using Docker.

# steveltn/https-portal
Don't worry if you don't know Docker well, and Let's Encrypt is bothersome as for me as well.

There is a Docker image that makes SSL conversion with Let's Encrypt is suurprisingly easy.

https://hub.docker.com/r/steveltn/https-portal/

# Steps
## EC2 instance startup, DNS setting, port opening

First, start Movable Type 7 EC2 instance and configure DNS so that it can be accessed by domain name.

In this example, it was `ssl-mt.ideamans.com` (← domain name for explanation, so it cannot actually be opened).

In the security group, allow inbound access to ports `22 (SSH)`, `80 (http)`, and `443 (https)`.

Open http://ssl-mt.ideamans.com and you should see the MT setup page.

## Install Docker first

Log in to the EC2 instance with SSH and execute the following command:

```
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
```

## Change nginx listening port to 8080

Immediately after launching an EC2 instance,

> Internet → nginx(:80) → MT(:5000)
> 

MT is used in the route, but will be changed as follows.

> internet → Docker(:80/443) → nginx(:8080) → MT(:5000)
>

Therefore, change the listening port of nginx to 8080 (replace it for Apache).

`sudo vi /etc/nginx/nginx.conf`

Change the port number near the 41st line.

```
 server {
        listen              8080; # changed from 80
        include             /etc/nginx/nginx_common.conf;
    }
```
 Restart nginx
 
 `sudo systemctl restart nginx`
 
 ## Start steveltn/https-portal
 
 Start `steveltn/https-portal` with the following docker command: Replace `DOMAINS = ssl-mt.ideamans.com->` with `your domain`.
 ```
 sudo docker run \
  -e "DOMAINS=ssl-mt.ideamans.com->http://dockerhost:8080" \
  -e "STAGE=production" \
  -d --restart always \
  -p 80:80 -p 443:443 \
  steveltn/https-portal
  ```
  
  Let's wait 2-3 minutes. It takes a while to generate DH, but we have done all the setting already.

The Docker image `steveltn/https-portal` does all the tedious parts of the authentication directory preparation and automatic updates.

# Open by SSL!

You can open MT safely by accessing https://ssl-mt.ideamans.com/ in a browser. This makes installation safe!

And SSL could be easily done like this.

Furthermore, if you add a volume mount like `-v ./https-portal:/var/lib/https-portal` to the `docker run` command, the certificate etc. can be made permanent and the restart will be faster.

It was a story about Docker, which is not a big turn in web production and is far away, but I believe it is helpful for casual usage.