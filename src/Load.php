<?php

namespace GreatScottPlugins\GreatScottTitleTools;

use GreatScottPlugins\WordPressPlugin\Plugin;

/**
 * Class Plugin
 *
 * @package GreatScottPlugins\GreatScottTitleTools
 */
class Load extends Plugin
{
    /**
     * Register admin scripts.
     *
     * @action admin_init
     */
    public function registerAdminScripts()
    {
        $build_asset = require(self::dir('build/editor.asset.php'));

        wp_register_script(
            'great-scott-title-tools-editor',
            self::url('build/editor.js'),
            $build_asset['dependencies'],
            $build_asset['version']
        );
    }

    /**
     * Admin enqueue scripts.
     *
     * @action admin_enqueue_scripts
     */
    public function adminEnqueueScripts($hook)
    {
        switch ($hook) {
            case 'post.php':
                wp_enqueue_script('great-scott-title-tools-editor');
                break;
        }
    }
}
