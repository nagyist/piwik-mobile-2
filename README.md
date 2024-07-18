# Matomo Mobile 2 - matomo.org

## Description

[Matomo](http://matomo.org/) (formerly Piwik) is a downloadable, open source (GPL licensed) real time web analytics
software program.  It provides you with detailed reports on your website
visitors: the search engines and keywords they used, the language they speak,
your popular pages... and so much more.

Matomo aims to be an open source alternative to Google Analytics.

[Matomo Mobile](https://matomo.org/mobile/) is the official Matomo app for iOS and Android phones and tablets.
The reports generated by Matomo are accessible by using this mobile client. Our
vision is to keep the Matomo Mobile app as close as possible to the website.
That means same functionality and same look and feel.

## Mission Statement

> « To create, as a community, the leading international Free/Libre web analytics application, providing access to all functionality through open components and open APIs. »

Or in short:
> « Liberate Web Analytics »

## License

Matomo Mobile is released under the GPL v3 license, see [LICENSE](LICENSE).

## Changelog

See https://matomo.org/blog/category/piwik-mobile-changelog/

## How to build

If you don't have Titanium SDK installed on your system have a look at [From zero to app - Install Titanium Mobile](https://fromzerotoapp.com/how-to-install-appcelerator-titanium/). See [Titanium CLI docs](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Guide/Titanium_Command-Line_Interface_Reference/) for the CLI commands.

### Quick Titanium setup:
* install nodejs (14 or 16)
* run `sudo npm i -g titanium alloy` to install the Titanium CLI
* `ti sdk install latest --default` to install the Titanium SDK

### Build the app
* `ti build -p ios` or `ti build -p android` to build the app

### Build for release on Android

```
ti build -p android -b -K $pathKeyStoreFile -P $keystorePassword -L $alias -D production -T dist-playstore -O $outputDirectory 
```

## Contact

https://matomo.org

hello@matomo.org
