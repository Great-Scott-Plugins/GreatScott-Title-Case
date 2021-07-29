<?php

namespace GreatScottPlugins\GreatScottTitleCase;

use GreatScottPlugins\WordPressPlugin\Plugin;

/**
 * Class TitleCasePlugin
 *
 * @package GreatScottPlugins\GreatScottTitleCase
 */
class TitleCasePlugin extends Plugin
{
    /**
     * Init method.
     */
    public function init()
    {
        \register_post_meta(
            'post',
            '_gsp_title_case',
            [
                'show_in_rest' => false,
                'single'       => true,
                'type'         => 'string',
            ]
        );
    }

    /**
     * Load assets.
     * @action enqueue_block_editor_assets
     */
    public function loadAssets()
    {
        \wp_enqueue_script(
            'gs-title-case-js',
            self::url('src/assets/js/gs-title-case.js'),
            ['wp-edit-post'],
            filemtime(self::dir('src/assets/js/gs-title-case.js'))
        );
    }
}
