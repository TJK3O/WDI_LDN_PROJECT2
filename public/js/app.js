// This jQuery validates forms and slides notifications out of sight after a delay
$(() => {
  $('form').validate();
  $('.notification').delay(2000).slideUp(500);
});
