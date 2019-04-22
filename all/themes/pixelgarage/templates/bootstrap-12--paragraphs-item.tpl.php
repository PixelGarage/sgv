<?php
/**
 * @file
 * Bootstrap 5-7 template for Display Suite.
 */

if (!empty($paragraphs_item->field_anchor_menu_title)) {
  $anchor_title = $paragraphs_item->field_anchor_menu_title[LANGUAGE_NONE][0]['value'];
  $layout_attributes .= ' data-anchor-title="' . $anchor_title . '"';
}
?>


<<?php print $layout_wrapper; print $layout_attributes; ?> class="<?php print $classes; ?>">
  <?php if (isset($title_suffix['contextual_links'])): ?>
    <?php print render($title_suffix['contextual_links']); ?>
  <?php endif; ?>
  <div class="row">
    <<?php print $central_wrapper; ?> class="col-sm-12 <?php print $central_classes; ?>">
      <?php print $central; ?>
    </<?php print $central_wrapper; ?>>
  </div>
</<?php print $layout_wrapper ?>>


<!-- Needed to activate display suite support on forms -->
<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>
