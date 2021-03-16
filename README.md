# Rich Text

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/askvortsov/flarum-rich-text.svg)](https://packagist.org/packages/askvortsov/flarum-rich-text)

A [Flarum](http://flarum.org) extension. Fully integrated Rich Text Editor for Flarum.

![Screenshot](https://i.imgur.com/41pHhED.png)

### Installation

Use [Bazaar](https://discuss.flarum.org/d/5151-flagrow-bazaar-the-extension-marketplace) or install manually with composer:

```sh
composer require askvortsov/flarum-rich-text:*
```

### Updating

```sh
composer update askvortsov/flarum-rich-text
```

### FAQ

#### Is it a bundled extension?

No, at least for now. We might re-evaluate that decision after stable, but for now, it's going to be published and maintained by me personally. That being said, the new editor driver is part of public API, and the editor implementations are mostly pure JS, so it shouldn't experience issues with Flarum updates for the forseeable future.

#### What does it support?

By default, everything from https://s9etextformatter.readthedocs.io/Plugins/Litedown/Syntax/ except indented codeblocks and lines under headers. The tables and checklists extensions add support for https://s9etextformatter.readthedocs.io/Plugins/PipeTables/Syntax/ (currently not for compact tables) and https://s9etextformatter.readthedocs.io/Plugins/TaskLists/Synopsis/.

BBCodes will not be WYSIWYD'ed. However, symbols used for them shouldn't be escaped so you should still be able to use them.

#### What's it written in?

It's based on the excellent [ProseMirror](https://prosemirror.net/) editor framework.

#### Is it extensible?

Yes! The markdown tables and tasklists extensions are meant as a proof of concept of how flexible it is. However, ProseMirror is quite challenging to work with, so these kinds of extensions are quite advanced.

If you're interested in extending it and are very familiar with JS, feel free to reach out.

#### Does it work with mentions, emoji, and fof upload?

Yes.

#### Can users opt out?

Yes, on their settings page there's a preference. You can also enable a setting in the admin dashboard that will add a toggle directly to the editor.

#### Are there any cons?

This extension has substantial bundle size, about 350kb minified (gzipped will be smaller). For most (especially nontechnical) communities this will be worth it, for others, it might not be. We are looking into code splitting opportunities to reduce the TTFB impact, but that is quite challenging and will likely take a while. Note that this is still considerably less than Flarum competitors.

### Links

- [Packagist](https://packagist.org/packages/askvortsov/flarum-rich-text)
- [Github](https://github.com/askvortsov1/flarum-rich-text)
- [Discuss](https://discuss.flarum.org/d/26455-wysiwyg-rich-text-editor)