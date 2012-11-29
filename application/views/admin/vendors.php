<?php Section::inject('no_page_header', true) ?>
<?php echo View::make('admin.partials.subnav')->with('current_page', 'vendors'); ?>
<table class="table table-bordered table-striped admin-vendors-table">
  <thead>
    <tr>
      <th>id</th>
      <th>company_name</th>
      <th>actions</th>
    </tr>
  </thead>
  <tbody id="vendors-tbody">
    <?php foreach ($vendors->results as $vendor): ?>
      <tr>
        <td><?php echo $vendor->id; ?></td>
        <td><?php echo $vendor->company_name; ?></td>
        <td>
          <?php if ($vendor->user->banned_at): ?>
            Banned.
          <?php else: ?>
            <a class="btn btn-danger" href="<?php echo route('admin_ban_vendor', array($vendor->id)); ?>" data-confirm="<?php echo __('r.admin.vendors.ban_vendor_confirmation'); ?>">Ban Vendor</a>
          <?php endif; ?>
        </td>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table>
<div class="pagination-wrapper">
  <?php echo $vendors->links(); ?>
</div>