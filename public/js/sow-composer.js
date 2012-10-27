// Generated by CoffeeScript 1.3.3
(function() {
  var apply_section_cover, hide_already_selected_sections, remove_section_cover, save_sort_order;

  hide_already_selected_sections = function() {
    var selected_section_ids;
    selected_section_ids = [];
    $(".selected-sections .section").each(function() {
      return selected_section_ids.push($(this).data('section-id'));
    });
    return $(".available-sections-table .section").each(function() {
      var el, section_id;
      el = $(this);
      section_id = el.data('section-id');
      if (selected_section_ids.indexOf(section_id) !== -1) {
        return el.hide();
      } else {
        return el.show();
      }
    });
  };

  apply_section_cover = function() {
    var cover, sections_wrapper;
    cover = $("<div class='sections-for-editing-cover'>Saving order...</div>");
    sections_wrapper = $(".sections-for-editing-wrapper");
    cover.css({
      width: sections_wrapper.width(),
      height: sections_wrapper.height()
    });
    return cover.appendTo(sections_wrapper);
  };

  remove_section_cover = function() {
    return $(".sections-for-editing-cover").remove();
  };

  save_sort_order = function() {
    var project_id, sections;
    apply_section_cover();
    project_id = $(".sections-for-editing-wrapper").data('project-id');
    sections = [];
    $(".section").each(function() {
      return sections.push($(this).data('section-id'));
    });
    return $.ajax({
      url: "/projects/" + project_id + "/sections/reorder",
      type: "POST",
      data: {
        sections: sections
      },
      success: function(data) {
        console.log(data);
        return remove_section_cover();
      }
    });
  };

  $(document).on("ready pjax:success sectionsreloaded", function() {
    hide_already_selected_sections();
    $(".sections-for-editing").sortable({
      update: save_sort_order
    });
    return $(".sections-for-editing .category-sections").sortable({
      update: save_sort_order
    });
  });

  $(document).on("click", ".section .remove-button", function(e) {
    var el;
    e.preventDefault();
    el = $(this);
    el.button('loading');
    return $.ajax({
      url: el.data('href'),
      type: "DELETE",
      success: function(data) {
        var new_selected_sections;
        new_selected_sections = $(data.selected_sections_html);
        return $(".selected-sections").replaceWith(new_selected_sections);
      }
    });
  });

  $(document).on("click", ".section .add-button", function(e) {
    var el;
    e.preventDefault();
    el = $(this);
    el.button('loading');
    return $.ajax({
      url: el.data('href'),
      type: "POST",
      success: function(data) {
        var new_selected_sections;
        new_selected_sections = $(data.selected_sections_html);
        $(".selected-sections").replaceWith(new_selected_sections);
        return el.button('reset');
      }
    });
  });

  $(document).on("click", ".add-section-button", function() {
    $("#edit-section-form").resetForm();
    $("#edit-section-modal").find(".modal-header h3").text("Add Section");
    return $("#edit-section-modal").modal('show');
  });

  $(document).on("click", ".edit-section-link", function() {
    var body, category, section, section_id, title;
    section = $(this).closest(".section");
    section_id = section.data('section-id');
    title = section.data('section-title');
    body = section.find(".body").html();
    category = section.closest(".category").data('name');
    $("#edit-section-modal").find(".modal-header h3").text("Edit Section '" + title + "'");
    $("#edit-section-form").find("input[name=section_id]").val(section_id);
    $("#edit-section-form").find("input[name=project_section\\[section_category\\]]").val(category);
    $("#edit-section-form").find("input[name=project_section\\[title\\]]").val(title);
    $("#edit-section-form").find("textarea[name=project_section\\[body\\]]").val(body);
    return $("#edit-section-modal").modal('show');
  });

  $(document).on("submit", "#edit-section-form", function(e) {
    var button, el;
    e.preventDefault();
    el = $(this);
    button = el.find(".save-button");
    button.button('loading');
    return el.ajaxSubmit({
      success: function(data) {
        var new_sections_for_editing;
        new_sections_for_editing = $(data.sections_for_editing_html);
        $(".sections-for-editing").replaceWith(new_sections_for_editing);
        $(document).trigger("sectionsreloaded");
        $("#edit-section-modal").modal('hide');
        return button.button('reset');
      }
    });
  });

}).call(this);
