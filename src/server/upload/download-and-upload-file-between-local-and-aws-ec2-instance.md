Sometimes you need to upload or download file between local and EC2 instance. So the commands following can help you

1. Download From EC2
    ```
    $ cd /path/to/where/store/ec2/pem/file
    $ scp -i {key-file-name}.pem {user}@{ip}:{/path/to/file} {/path/to/where/want/store}
    ```

    Example:
    ```
    $ scp -i test-ec2.pem ec2-user@10.0.0.1:/usr/tmp/temp.sql .
    ```

2. Upload to EC2
    ```
    $ scp -i {key-file-name}.pem {/path/to/file} {user}@xx.xx.xx.xx:{/path/to/where/store}
    ```

{user}:
* For Amazon Linux 2 or the Amazon Linux AMI, the user name is **ec2-user**.
* For CentOS, the user name is **centos**.
* For Debian, the user name is **admin**.
* For Fedora, the user name is **ec2-user** or **fedora**.
* For RHEL, the user name is **ec2-user** or **root**.
* For SUSE, the user name is **ec2-user** or **root**.
* For Ubuntu, the user name is **ubuntu**.
* Otherwise, if ec2-user and root don't work, check with your AMI provider.