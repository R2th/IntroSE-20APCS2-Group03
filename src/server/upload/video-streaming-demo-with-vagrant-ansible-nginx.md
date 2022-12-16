Refer: https://viblo.asia/p/streaming-videos-server-su-dung-nginx-rtmp-va-hls-maGK7q4Llj2

**A. Install + setup vagrant**
1. Download and install vagrant from https://www.vagrantup.com/downloads
2. Install Virtual Box https://www.virtualbox.org/wiki/Downloads
3. ```mkdir video-streaming``` && ```cd video-streaming```
4. ```vagrant init```, then modify
```ruby
Vagrant.configure("2") do |config|
    config.ssh.insert_key = false
    config.vm.box_check_update = false
    config.vm.provider "virtualbox" do |v|
        v.memory = 1024
        v.cpus = 1
    end
    config.vm.define "server_1", primary: true do |vbox|
        vbox.vm.box = "ubuntu/xenial64"
        vbox.vm.network "forwarded_port", guest: 22, host: 2222
        vbox.vm.network "private_network", ip: "192.168.33.10"
    end
    config.vm.provision "shell" do |s|
      ssh_pub_key = File.readlines("#{Dir.home}/.ssh/id_rsa.pub").first.strip
      s.inline = <<-SHELL
        echo #{ssh_pub_key} >> /home/vagrant/.ssh/authorized_keys
        echo #{ssh_pub_key} >> /root/.ssh/authorized_keys
      SHELL
    end
end
```
5. ``` vagrant up ``` 
6. ssh using vagrant default user ```vagrant ssh```
7. ssh using own key 
    
    7.1 ```sudo ssh -p 2222 -i ~/.ssh/id_rsa vagrant@127.0.0.1``` or ```sudo ssh -p 2222 -i ~/.ssh/id_rsa root@127.0.0.1```
    
    7.2 If get ```WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!```, then go to ```/Users/daikadicode/.ssh/known_hosts``` or ``` /var/root/.ssh/known_hosts``` and delete last one with port ```2222``` then ssh again (each time vagrant up, the fingerprint for the ECDSA key for the host change, then have to update it manually)



**B. Install + setup ansible** 
1. ```pip3 install ansible``` (For MacOS)
2. check version ```ansible --version```
3. Create folder tree ```~/ansible/inventories/vagrant/hosts.yml```
 ```yml
  hosts:
    ansible_host_key_checking: false
    cms:
      ansible_ssh_host: 127.0.0.1
      ansible_ssh_port: 2222
      ansible_ssh_private_key_file: ~/.ssh/id_rsa
      ansible_user: vagrant
      ansible_python_interpreter: "/usr/bin/env python3"
```
4. Create a playbook ```~/ansible/vagrant_playbook.yml```
```- hosts: cms
  remote_user: root
  become: yes
```
5. Test it ```ansible-playbook -i ansible/inventories/vagrant/hosts.yml ansible/vagrant_playbook.yml``` ----- connect to host cms succesfully
6. Create folder tree for roles that want to install to the host ```~/ansible/roles/```
7. 1st role: common for all essential packages ```~/ansible/roles/common/tasks/main.yml```
```yml
- name: Update all packages to the latest version
  apt:
    upgrade: yes
    update_cache: yes
- name: Importing Postgres's GPG key to apt
  shell: "wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -"
- name: Add Postgres repository contents to OS
  shell: echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" |sudo tee  /etc/apt/sources.list.d/pgdg.list
- name: Importing Yarn's GPG key to apt
  shell: "curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -"
- name: Add Yarn repository contents to OS
  shell: echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
- name: Install required system packages
    apt: name={{ item }} state=latest update_cache=yes
    with_items:
        - gcc
        - autoconf
        - bison
        - build-essential
        - libssl-dev
        - libyaml-dev
        - libreadline6-dev
        - zlib1g-dev
        - libncurses5-dev
        - libffi-dev
        - libgdbm3
        - libgdbm-dev
        - sqlite3
        - libsqlite3-dev
        - nodejs
        - yarn
        - imagemagick
        - libpq-dev
        - python3
        - python3-pip
        - python3-setuptools
        - postgresql-client-12
        - postgresql-12
        - postgresql-contrib-12
- name: install psycopg2
    become: yes
    pip:
        name: psycopg2
        executable: pip3
- name: install pexpect
    become: yes
    pip:
        name: pexpect
        executable: pip3
```
9. add a new deploy user(dont want to use root user for deploying) ```~/ansible/roles/add_deploy_user/tasks/main.yml```
```yml
- name: Add deploy user
  user:
    name: deploy
    shell: /bin/bash
    #        run this to get hashed password: openssl passwd -salt SomeSalt -1 deploy
    password: $1$SomeSalt$RIIi8geHApvCaCMRjlFZv.
- name: set deploy as sudoer
  command: usermod -aG sudo deploy
- name: Add SSH key to server for deploy user
  authorized_key:
    user: deploy
    #        your public key
    key: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC/PDTfafiC/Cfn3vaE4JgEYyCddWCTzNMBf04zxb+JoRlQCBZZZv4ciTc1JQQwf4qlpSNoIXv4cjpE1VUEwmeNsX2Lk9EGDWUPwRyWLFP45adrAngnPnyEg/36nWL2FQ20v4B8QKBaoLjBLAbywVzXizNvtTDJL9A2Er7/mzokJlybpsjEojM6sanYEfHIos8fzX56n0vFhrvfIqGiH6K+T9vXohzsD0EUvt4YLeOuIPoZJ4TdcrguIOkMEJXiGr5MVJSSvHKE4mHZOgh4e7y54G4BLaWv60QLdH2YTe7BHn0meBKFx2jK8CtufxDDRyevmClXOBDfa2NMIeNvEUC7 daikadicode@Mac-Cafes-MacBook-Pro.local"
```
10. Now update the playbook ```~/ansible/vagrant_playbook.yml``` to apply roles (create vars_files to store customized variables) 
```yml
- hosts: cms
  remote_user: root
  become: yes
  vars_files:
    - inventories/vagrant/host_vars/default.yml

  roles:
    - common
    - add_deploy_user
```
11. Check new user ```ssh``` then ```awk -F: '{ print $1}' /etc/passwd```. And now, you can ssh by deploy user: ```ssh -i ~/.ssh/id_rsa -p 2222 deploy@127.0.0.1```

**C. Config nginx for HLS**

1. Create ```~/ansible/inventories/vagrant/host_vars/default.yml``` for extra variables
    ```yml
        nginx_location: inventories/vagrant/host_vars/nginx.txt
        index_html_location: inventories/vagrant/host_vars/index.html
        videos_samples_location: ~/Downloads/mp4-samples
    ```
2. Create ```~/ansible/inventories/vagrant/host_vars/nginx.txt``` for nginx template
    ```ruby
          server {
            listen 80;
            server_name "_";
            root /home/deploy;
            index index.html;
            location /hls {
              # CORS setup
              add_header 'Access-Control-Allow-Origin' '*' always;
              add_header 'Access-Control-Expose-Headers' 'Content-Length';
              # Allow CORS preflight requests
              if ($request_method = 'OPTIONS') {
                  add_header 'Access-Control-Allow-Origin' '*';
                  add_header 'Access-Control-Max-Age' 1728000;
                  add_header 'Content-Type' 'text/plain charset=UTF-8';
                  add_header 'Content-Length' 0;
                  return 204;
              }
              types {
                  application/vnd.apple.mpegurl m3u8;
                  video/mp2t ts;
              }
              add_header Cache-Control no-cache;
              alias /home/deploy/videos;
            }
          }

    ```
3. Test nginx ```192.168.33.10``` ---> ```nginx/1.10.3 (Ubuntu)``` (if you ssh to server, then create /home/deploy/test/index.html file with some content, then it will be responsed)
4. Create a role for transfering + transforming videos to server + upload a simple front-end html to show video ```~/ansible/roles/add_index_html/tasks/main.yml```
    ```yml
    - name: copy index html file
      copy:
        src: "{{ index_html_location }}"
        dest: /home/deploy
        owner: deploy
        mode: '0777'
    - name: make videos dir
      command: chdir=/home/deploy mkdir videos
    - name: transfer demo video to server
      copy: 
        src: "{{ item }}"
        dest: /home/deploy/videos
        owner: deploy
        mode: '0777'
      with_fileglob:
        - "{{videos_samples_location}}/*.mp4"
    - name: List all mp4 files
      find:
        paths: /home/deploy/videos
        patterns: "*.mp4"
      register: tmp_glob
    - name: tranfrom videos 
      command: "chdir=/home/deploy/videos ffmpeg -i {{item.path | basename | splitext | first}}.mp4 -profile:v baseline -level 3.0 -s 720x400 -start_number 0 -hls_time 10 -strict -2 -hls_list_size 0 -f hls {{item.path | basename | splitext | first}}.m3u8"
      with_items: 
        - "{{tmp_glob.files}}"
    ```
    And ```~/ansible/vagrant_playbook.yml```
    ```yml
        - hosts: cms
          remote_user: root
          become: yes
          vars_files:
            - inventories/vagrant/host_vars/default.yml

          roles:
            - common
            - add_deploy_user
            - add_index_html
            - nginx
    ```
    
    And a simple front-end html ```~/ansible/inventories/vagrant/host_vars/index.html``` (let say your filename is 1sample)
    ```html  
        <script src="https://cdn.jwplayer.com/libraries/efNGv3Iy.js"></script>
        <div id="myPlayer">This text will be replaced with a player.</div>
        <script>
          jwplayer("myPlayer").setup({
            file: "http://192.168.33.10/hls/1sample.m3u8",
            height: 360,
            width: 640
          });
        </script>
    ```
    
    
**D. Summary**

After those steps, each time u want to test, just run 
1. ```vagrant up ``` 
2. ```ansible-playbook -i ansible/inventories/vagrant/hosts.yml ansible/vagrant_playbook.yml```
3. Go to ```http://192.168.33.10/``` to see the result