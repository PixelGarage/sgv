<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */

//
// get extensions of linked documents
$array_document_ext = array();
foreach ($view->result as $index => $document) {
  $filename = $document->field_field_document[0]['raw']['filename'];
  $array_document_ext[$index] = strtoupper(pathinfo($filename, PATHINFO_EXTENSION));
}

?>
<?php if (!empty($title)): ?>
  <div class="column-lang"><h3 class="column-title"><?php print $title; ?></h3>
<?php else: ?>
  <div class="column-lang">
<?php endif; ?>

<?php foreach ($rows as $id => $row): ?>
  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
    <?php print $row; ?>
    <div class="document-ext"><?php print $array_document_ext[$id]; ?></div>
  </div>
<?php endforeach; ?>

</div>
