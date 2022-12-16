# Introduction

I'm developing with Python + Django, but if I'm in charge of multiple projects, the versions of Python, Django, and other libraries will differ depending on the project.

In some cases, the same Python version has different versions of different libraries, so versioning with `pyenv` and `venv` is very helpful. This time, I will focus on the minimum necessary functions and describe how to use it.

# Deploy Environment
OS:macOS Big Sur(version 11.2.2)
Shell :zsh

or

OS:CentOS7
Shell:bash

# pyenv
By using pyenv, it is possible to use various versions of Python.

At the time of this article, you can install from 2.1.3 to 3.9.1.

## Install pyenv

In case of mac, it seems that it can be installed using Homebrew.

```
$ brew install pyenv
```
 
 Linux users can make it with git.
 
``` 
 $ git clone git://github.com/yyuu/pyenv.git ~/.pyenv
 ```
 
 ## Edit shell config file
 
 Check your login shell with echo $ SHELL.
zsh → .zshrc (.zsh_profile)
bash → .bash_profile

The following is described in. You can write it directly in vim, but this time we will use echo for simplification.

```
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

Finally, the setting file is reflected.

```
$ source .zshrc   #bashの方は .bash_profile
```

## Install the required version of Python with pyenv

Since pyenv is available in the previous settings, check the available Python version.

```
$ pyenv install --list
```
Those displayed in the list as ○. ○. ○ can be installed.

Install the version of pyenv you want to use.

```
$ pyenv install 3.9.1 # Install 3.9.1 this time
```

## pyenv version switching

Check the current version.

```
$ pyenv versions
```

The system and installed version are displayed.

The version listed next to the "`*`" is the one used in the current directory.

```
* system (set by /○○/○○.pyenv/version)
  3.9.1
  ```
  Switch the version of Python to use.
  
It can be subdivided according to the directory, but it is omitted this time because the main purpose is to use venv.

```
$ pyenv global 3.9.1
```

If you check again with pyenv versions, the default version has been switched. (You can also check by starting Python with the interpreter)

```
 system 
* 3.9.1 (set by /○○/○○.pyenv/version)
```

Now you are ready to create a venv virtual environment with the version you want to use.

# Create venv environment

Since venv is available by default in Python 3 series, there is no need to install it (if you are using 2 series, you can perform similar version control by installing virtualenv).

Execute the following in the directory where you want to create the virtual environment.

```
$ python -m venv venv_project #venv_project is any project name
```
Since the `venv_project` directory is created under it, move it with `cd venv_project` and activate the virtual environment.


```
$ source bin/activate
```
If the execution is successful, it will be displayed before the host name. You are now in the virtual environment.

```
(venv_project)hostname$ 
````
By activating the virtual environment, the libraries to be installed with pip can be managed independently from the local environment.

After that, feel free to install and use the required version of the library.

The last time you return to your environment locally, deactivate it.

```
$ deactivate # Can be executed even if it is not under the project directory
```
With the above, it seems that the minimum version control with python can be done.

# Finally
If you understand both pyenv and venv properly, you can use it more conveniently.

However, if you follow this procedure, the local environment will remain in its original state, so I think you can prevent conflicts in the version.

I hope it will be helpful to anyone.