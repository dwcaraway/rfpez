
window.Rfpez || (window.Rfpez = {
  Backbone: {}
});

Rfpez.current_page = function(str) {
  if (str === Rfpez.current_page_string) {
    return true;
  } else {
    return false;
  }
};

$(document).on('click', '[data-toggle=class]', function(e) {
  var newClass, target;
  target = $(this).data('target');
  newClass = $(this).data('class');
  return $(target).toggleClass(newClass);
});

$(document).on('shown', '#signinModal', function() {
  return $("#signinModal #email").focus();
});

$(document).on("click", "a[data-confirm]", function(e) {
  var el;
  e.preventDefault();
  el = $(this);
  if (confirm(el.data('confirm'))) {
    return window.location = el.attr('href');
  }
});

$(document).on("submit", "#new-contract-form", function(e) {
  if (!$(this).find('input[name=solnbr]').val()) {
    return e.preventDefault();
  }
  return $(this).find("button[type=submit]").button('loading');
});

$(document).on("click", "[data-select-text-on-focus]", function(e) {
  return $(this).select();
});

$(document).on("mouseenter", ".helper-tooltip", function(e) {
  $(this).tooltip();
  return $(this).tooltip('show');
});

$(document).on("mouseleave", ".helper-tooltip", function(e) {
  return $(this).tooltip('hide');
});

$(document).on("ready page:load", function() {
  $("[data-onload-focus]:eq(0)").focus();
  $("span.timeago").timeago();
  $('input, textarea').placeholder();
  if ($("body").hasClass('officer')) {
    $('.datepicker-wrapper').datepicker();
    $('.wysihtml5').wysihtml5();
  }
  return Rfpez.current_page_string = $("body").data('current-page');
});
