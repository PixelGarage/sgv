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
      <?php if (!$is_empty) : ?>

        <?php if ($is_single) : ?>

          <?php print $panels[0]['content']; ?>

        <?php else: ?>

          <div class="panel-group <?php print $classes; ?>" id="<?php print $id; ?>">

            <?php foreach ($panels as $index => $panel) : ?>

              <div class="panel panel-default <?php print $panel['classes']; ?>">

                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#<?php print $id; ?>" href="#<?php print $panel['id'] ?>-<?php print $index; ?>">
                      <?php print $panel['label']; ?>
                    </a>
                  </h4>
                </div>

                <div id="<?php print $panel['id'] ?>-<?php print $index; ?>" class="panel-collapse <?php print $panel['collapse']; ?> <?php print $panel['classes']; ?>">
                  <div class="panel-body"><?php print $panel['content']; ?></div>
                </div>

              </div>

            <?php endforeach; ?>

          </div>

        <?php endif; ?>

      <?php endif; ?>
    </<?php print $central_wrapper; ?>>
  </div>
</<?php print $layout_wrapper ?>>


<!-- Needed to activate display suite support on forms -->
<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>
