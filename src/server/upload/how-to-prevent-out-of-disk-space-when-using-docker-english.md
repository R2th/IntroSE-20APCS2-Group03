Bài viết tiếng Việt - [Làm thế nào để tránh ổ đĩa bị đầy khi xài Docker?](https://devopsvn.tech/devops/lam-the-nao-de-tranh-o-dia-bi-day-khi-xai-docker)

In this article, we will learn how to prevent Docker from eating up all your disk space. This is a problem that we often encounter when configuring the server to run with Docker.

![](https://i.imgur.com/WsZRCpZ.png)

## Remove `<none>` TAG images
One of the things that take up the most disk space is Docker Image, but what makes the disk out of space is not the image we use to run the program, the main cause comes from the image with `<none>` tag.

Let's check on your server:

```bash
docker images
```

```bash
REPOSITORY                             TAG       IMAGE ID       CREATED         SIZE
postgres                               <none>    5861c038d674   14 months ago   371MB
k8s.gcr.io/ingress-nginx/controller    <none>    bf621a764db5   17 months ago   278MB
k8s.gcr.io/ingress-nginx/controller    <none>    81d7cdfa4169   2 years ago     280MB
```

These images with `<none>` tag are dangling images that are generated during the process of building the image from the Dockerfile. You can remove the image with `<none>` tag to reduce disk space.

Run the following command to list all `<none>` tag images:

```bash
docker images -f "dangling=true"
```

Get `IMAGE ID`:

```bash
docker images -f "dangling=true" -q
```

Run the remove command:

```bash
docker rmi $(docker images -f "dangling=true" -q)
```

For docker 1.13+:

```bash
docker image prune
```

We should configure crontab to run once a day to clear all dangling images, for example with Linux:

```bash
sudo -s
```

```bash
cat <<EOF >> /etc/cron.daily/clear-tag-none
#!/bin/sh
docker rmi $(docker images -f "dangling=true" -q)
EOF
```

```bash
chmod +x /etc/cron.daily/clear-tag-none
```

## Delete Docker Container Log Files
The next thing that takes up disk space is Docker Container Log Files. By default, Docker captures the standard output (and standard error) of all your containers, and writes them in files using the JSON format. If you don't frequently delete log files, it will go up to a dozen or a hundred GB.

To delete Docker Container Log Files, there are several ways:
+ Manual with crontab
+ Using logrotate
+ Build-in logrotate functionality

## Manual deletion with crontab
You can use the following command to delete logs for the logs that are not important:

```bash
cat /dev/null > /var/lib/docker/containers/*/*-json.log
```

Configure crontab:

```bash
sudo -s
```

```bash
cat <<EOF >> /etc/cron.daily/clear-container-logs
#!/bin/sh
cat /dev/null > /var/lib/docker/containers/*/*-json.log
EOF
```

```bash
chmod +x /etc/cron.daily/clear-container-logs
```

## Using logrotate
If you want to keep the logs, you can use `logrotate` to reduce the size of log files. To create a new logrotate config file for your Docker containers simply create a new file in the logrotate folder `/etc/logrotate.d/logrotate-container` and put the following configuration to it:

```
/var/lib/docker/containers/*/*.log {
  rotate 7
  daily
  compress
  missingok
  delaycompress
  copytruncate
}
```

you can test it with the following command:

```bash
logrotate -fv /etc/logrotate.d/logrotate-container
```

By default, the installation of logrotate creates a crontab file inside `/etc/cron.daily` named logrotate, so we don't need to configure crontab manually.

## Build-in logrotate functionality
For Docker `1.8+`, you can use the build-in logrotate functionality of Docker. For example, you can set the logging driver and enable automatic log-rotation for a specific container  by using the `--log-driver` and `--log-opts` flags:

```bash
docker run --log-driver json-file --log-opt max-size=10m nginx
```

If we need to configure the entire container, set the `log-driver` and `log-opts` keys to appropriate values in the `daemon.json` file, which is located in `/etc/docker/` on Linux hosts or `C:\ProgramData\docker\config\` on Windows Server.

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

## Conclusion
The above are some ways to prevent servers run out of disk space when using Docker. I hope it useful to you.