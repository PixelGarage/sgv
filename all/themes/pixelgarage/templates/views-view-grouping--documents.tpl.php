<?php

/**
 * @file
 * This template is used to print a single grouping in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $grouping: The grouping instruction.
 * - $grouping_level: Integer indicating the hierarchical level of the grouping.
 * - $rows: The rows contained in this grouping.
 * - $title: The title of this grouping.
 * - $content: The processed content output that will normally be used.
 */
switch ($title) {
  case 'Dokumente für Lehrpersonen und Auszubildende':
    $anchor_title = t('Lehrpersonen');
    break;
  case 'Portfolio':
    $anchor_title = t('Portfolio');
    break;
  case 'Überbetriebliche Kurse':
    $anchor_title = t('Überbetr. Kurse');
    break;
  case 'Fakultative Planungshilfe für Berufsfachschulen':
    $anchor_title = t('Planungshilfen');
    break;
  default:
    $anchor_title = t('PDF Dokumente');
    break;
}
?>
<div class="view-grouping" data-anchor-title="<?php print $anchor_title; ?>">
  <div class="view-grouping-header"><?php print $title; ?></div>
  <div class="view-grouping-content">
    <?php print $content; ?>
  </div>
</div>
