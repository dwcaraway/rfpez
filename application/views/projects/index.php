<?php Section::inject('page_title', (Auth::officer() ? 'Everybody\'s Projects' : 'Projects' )) ?>
<?php if (count($projects) > 0): ?>
  <?php Section::start('inside_header'); { ?>
    <small>(<a href="<?php echo route('project_rss', 'rss'); ?>">rss</a> / <a href="<?php echo route('project_rss', 'atom'); ?>">atom</a>)</small>
    <a class="officer-only toggle-my-all-projects" href="<?php echo route('my_projects'); ?>" data-pjax="data-pjax">my projects only</a>
    <div class="search-projects pull-right">
      <input id="filter-projects-input" class="search-query" type="search" placeholder="Filter projects..." />
    </div>
  <?php } ?>
  <?php Section::stop(); ?>
  <table class="table projects-table">
    <thead>
      <tr>
        <th class="type hidden-phone">Type</th>
        <th class="project-title">Project Title</th>
        <th class="agency visible-desktop">Agency</th>
        <th class="due">Bids Due</th>
      </tr>
    </thead>
    <?php foreach($projects as $project): ?>
      <tbody class="project">
        <tr class="project-meta">
          <td class="hidden-phone">
            <img src="<?php echo $project->project_type->image(); ?>" title="<?php echo $project->project_type->name; ?>" alt="<?php echo $project->project_type->name; ?>" />
          </td>
          <td>
            <a class="project-title" href="<?php echo route('project', array($project->id)); ?>" data-pjax="data-pjax"><?php echo $project->title; ?></a>
            <?php if ($project->is_mine()): ?>
              <span class="admin-star">
                <i class="icon-star"></i>
                <a href="<?php echo route('review_bids', array($project->id)); ?>" data-pjax="data-pjax">Review Bids</a>
              </span>
            <?php endif; ?>
            <?php if ($bid = $project->my_bid()): ?>
              <span class="admin-star">
                <i class="icon-star"></i>
                <?php if ($bid->submitted_at): ?>
                  <a href="<?php echo route('bid', array($project->id, $project->my_bid()->id)); ?>" data-pjax="data-pjax">View my bid</a>
                <?php else: ?>
                  <a href="<?php echo route('new_bids', array($project->id)); ?>" data-pjax="data-pjax">Continue Writing Bid</a>
                <?php endif; ?>
              </span>
            <?php endif; ?>
            <p class="project-description-truncated"><?php echo Helper::truncate($project->background, 13); ?></p>
          </td>
          <td class="visible-desktop"><?php echo $project->agency; ?></td>
          <td><?php echo $project->formatted_proposals_due_at(); ?></td>
        </tr>
      </tbody>
    <?php endforeach; ?>
  </table>
<?php else: ?>
  <p><?php echo __("r.projects.index.none"); ?></p>
<?php endif; ?>