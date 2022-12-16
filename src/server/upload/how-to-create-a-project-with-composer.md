1.Composer is a tool to mangage package or PHP libray.Composer setup library into a folder in project you work.

About basic side Composer will not set up global because of that It also called Depenency Magager.

2.Install "composer"

Choose the folder you want to set up composer then open terrminal:

 - curl -sS https://getcomposer.org/installer | php

3. Setup / update project php with composer:

To start a project you need a file named composer.json . This file describes the package in your project or metada.

-In composer.json .The point you should pay attention is require key.Easy to understand It is the package that you want to have.

For example:

{

   "require":{

     "monolog/monolog": "1.0.*"

    }

}

Note:

- monolog/monolog is vendor_name/project_name . Composer use this information to search in repository and download it for you and setup.

-1.0.*  is the the version that we request.

To install package (dependency) we use

-   php composer.phar install

After you run this command It will create a folder with the name "vendor" to obtain package and source code  like (vendor/monolog/monolog) .And a composer.log file was born.Composer.log is the place that save information about the package(dependance) that we set up adn a file autoload.php.

-To update package in composer.log we use : php composer.phar update (delte composer.log annd install again.update newwest version)

-To update one  package in composer we use : php composer packagename (package name in this is monolog/monolog)

-To show the package use : php composer.phar show

- To add a package use : php composer.phar require

-To validate file composer.json is suitable or not we use :php composer.phar validate

-To create a package from a package exist : php composer.phar create-project

( packaagist is the repository of composer)