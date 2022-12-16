Let's talk about: "*What's the reasons that make `composer` run slowly?*" and "*How to make it run faster?*".

There're 2 main reasons for this problem:

- **Download strategy** is not good;
- and **Download speed** is slow because of the server's distance;

## Download strategy

Thanks to <a href="https://github.com/hirak/prestissimo">hirak/prestissimo</a> package, we can improve the download strategy become better.

This is a composer plugin that downloads packages in parallel to speed up the installation process.

Run command to install package:

```bash
composer global require hirak/prestissimo
```

## Change mirror

You can found mirrors list in this page: <a href="https://packagist.org/mirrors">https://packagist.org/mirrors</a>. Choose a mirror near you and run command to change mirror.

Don't worry about the command syntax. Because in each mirror page, they will provide you the command that you need to run.

Example: command for the <a href="https://packagist.hesse.im/">Germany mirror</a> will look like:

```bash
composer config -g repos.packagist composer https://packagist.hesse.im
```

## Conclusion

Hope that article could help you solve the problem: *composer run slowly*. Please let me know if you have any better solution.

You can read original post here: <a href="http://sang.asia/tips/composer-run-slowly-make-it-run-faster/">Composer run slowly - Make it run faster</a>.