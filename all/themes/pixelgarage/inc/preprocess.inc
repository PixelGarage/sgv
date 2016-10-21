<?php
/**
 * Created by PhpStorm.
 * User: ralph
 * Date: 06.02.15
 * Time: 17:23
 */

/**
 * Preprocess variables for the html template.
 */
function pixelgarage_preprocess_html(&$vars) {
  // make sure jQuery UI and effects is loaded for anonymous users
  drupal_add_library('system', 'ui');
  drupal_add_library('system', 'effects');

}

/**
 * Override or insert variables for the page templates.
 */
function pixelgarage_preprocess_page(&$vars) {
  // hide titles on login forms
  pg_login_preprocess_page($vars);

  $vars['logo'] = str_replace(array('.jpg', '.png'), '.svg', $vars['logo']);
}


/**
 * Adapts the exposed search form to show placeholders in search fields.
 *
 */
function pixelgarage_preprocess_views_exposed_form(&$vars) {
  //
  // add placeholders to search exposed form items
  $form = &$vars['form'];
  if ($form['#id'] != 'views-exposed-form-members-block') return;

  foreach ($form['#info'] as $id => $info) {
    // add the description as placeholder to the widget
    $placeholder = $info['description'] ? $info['description'] : $info['label'];
    $form[$info['value']]['#attributes']['placeholder'] = $placeholder;
    $form[$info['value']]['#printed'] = false;

    // render widget again
    $field = $form[$info['value']];
    $vars['widgets'][$id]->widget = drupal_render($field);
  }
}


