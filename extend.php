<?php

/*
 * This file is part of askvortsov/flarum-rich-text
 *
 *  Copyright (c) 2021 Alexander Skvortsov.
 *
 *  For detailed copyright and license information, please view the
 *  LICENSE file that was distributed with this source code.
 */

namespace Askvortsov\RichText;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\User())->registerPreference('useRichTextEditor', 'boolval', true),
    (new Extend\User())->registerPreference('richTextCompactParagraphs', 'boolval', false),

    (new Extend\Settings())
        ->serializeToForum('toggleRichTextEditorButton', 'askvortsov-rich-text.toggle_on_editor', 'boolval', false),
];
