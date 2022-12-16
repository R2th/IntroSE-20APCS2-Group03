Nội dung bài viết dựa theo [tech.actindi.net](https://tech.actindi.net/2018/10/30/093000) của tác giả Ohata

# Fabric là gì?
[Fabric](http://www.fabfile.org/)  là 1 tool để deploy viết bằng Python.

Nó khá là giống với Capistrano của Ruby, tuy nhiên bài này sẽ được sử dụng ở các điều kiện sau:

- Không làm thứ quá to tát.
- Sử dụng Ansible chính nó (sử dụng Python).
- Bản thân ứng dụng là js (không sử dụng Ruby).

Khi dùng thử Fabric thì những ấn tượng đầu tiên là:

- Một công cụ khá hữu ích để vận hành các ứng dụng.
- Khá là gần vai trò của Fastlane

Hãy lấy thử nó về vạch vọc ở đây: https://get.fabric.io/

# Chuẩn bị
## Cài Python
(Bình luận: Oh s***! Blog này đc viết thí nghiệm trên Mac :cry: sinh viên nghèo tới lap thường còn ko mua nổi nữa là Táo )
 
 Trước tiên, chạy lệnh sau:
 ```
$ brew install pyenv
 ```
 Check danh sách version và chọn cài đặt 3.7
 ```
 $ pyenv install --list
$ pyenv install 3.7.0
 ```
 Nếu xcode không có sẵn sẽ xảy ra lỗi. Trong trường hợp đó hãy  chạy `xcode-select --install` (lỗi **zipimport.ZipImportError: can't decompress data; zlib not available'**, cách sửa ở đây: https://qiita.com/zreactor/items/c3fd04417e0d61af0afe)
 
 Sau khi xong chạy tiếp
 ```
 $ pyenv global 3.7.0
$ python --version
 ```
 Cài đặt của Python ở hệ thống sẽ có vài phần không có sẵn nên hãy ghi phần sau vào `~/.bash_profile`
 ```
 eval "$(pyenv init -)"
 ```
 ```
 $ python --version
Python 3.7.0
 ```
 Ngon rồi nhé các bạn
 ## Cài Fabric
 Tác giả trong bài chạy lệnh sau
 ```
 $ pip install fabric
 ``` 
 Và được cái kết quả khá vui tươi là fabric.api không chạy
 ![](https://images.viblo.asia/0299f92d-94af-4de0-b2af-f716b62b0e3a.png)
 Vì cũng mới học Python nên mình cũng méo thấu đc cái lỗi bác ấy nói là cái gì. Cơ mà giải pháp là: 
 ```
 $ pip install fabric3
 ```
 ## Build ứng dụng
 Bài này sẽ làm ứng dụng Vue.js theo các bước tuần tự như sau:
 1. Tạo thư mục để triển khai trong môi trường cục bộ
 2. Clone hoặc pull từ github
 3. Xây dựng ứng dụng vue
 4. Đẩy lên server
 ### Cấu trúc thư mục
 Cấu trúc của Python thôi
 ```
 fabfile
  |- __init__.py
  |- enviroments.py
  |- deploy.py
 ```
 ### `init.py`
 ```python
 from fabfile.enviroments import prod, dev
from fabfile.deploy import build, deploy
 ```
 ### `enviroments.py`
 ```python
 from fabric.api import env
from fabric.decorators import task

repo_name = 'hoge' #githubのリポジトリ名
github_url = "git@github.com:hoge/hogehoge.git" #githubのリポジトリ

@task
def prod():
    env.repo_name = repo_name
    env.environment = "prod"
    env.github = github_url
    env.branch = 'master'
    env.deploy_user = 'deploy_user'
    env.deploy_hosts = ['xxx.xxx.xxx.xxx']
    env.work_dir = '/tmp/hoge/prod/'
    env.app_name = 'hoge_vue'

@task
def dev():
    env.repo_name = repo_name
    env.environment = "dev"
    env.github = github_url
    env.branch = 'develop'
    env.deploy_user = 'deploy_user'
    env.deploy_hosts = ['xxx.xxx.xxx.xxx']
    env.work_dir = '/tmp/hoge/dev/'
    env.app_name = 'hoge_vue'    
 ```
 ### `deploy.py`
 ```python
 from fabric.api import run, abort, env, cd, local, lcd, settings, put
from fabric.decorators import task

class Build(object):

    def web(self):
        app_name = env.app_name
        self.__work_dir()
        with lcd(env.work_dir):
            self.__pull_github()
            with lcd(env.repo_name):
                self.__build_apps()

    def __work_dir(self):
        local('mkdir -p {}'.format(env.work_dir))

    def __pull_github(self):
        with settings(warn_only=True):
            if local('ls -la {}'.format(env.repo_name)).failed:
                local('git clone {}'.format(env.github))
            with lcd(env.repo_name):
                local('git checkout {}'.format(env.branch))
                local('git pull')

    def __build_apps(self):
        with lcd(env.repo_name):
            local('npm install')
            local('npm run build')

class Deploy(object):

    def web(self):
        app_name = env.app_name
        put("{0}/{1}/{2}/dist/*".format(env.work_dir, env.repo_name, app_name), "/var/www/{}/".format(app_name))

    def restart_server(self):
        with cd('/var/www/{}/'.format(env.app_name)):
            run('forever start')

@task #@task ここに記載したものがコマンド実行時のタスク
def build():
    local = Build()
    local.web()
    print("build success!!")

@task
def deploy():
    local = Build()
    local.web()
    remote = Deploy()
    remote.web()
    remote.restart_server()
    print("deploy success!!")
 ```
 ## Chạy thử
 ### Build
 ```
 fab dev build
 ```
 ### Deploy
 ```
 fab dev deploy
 ```
 # Cảm nhận của tác giả Ohata
 Dịch nôm na là cũng dễ sử dụng và rất nhanh
 (Phần còn lại là quảng cáo cho clb bóng rổ của cty)
# Tham khảo
- Bài gốc: https://tech.actindi.net/2018/10/30/093000
- Trang chủ Fabric: http://www.fabfile.org/