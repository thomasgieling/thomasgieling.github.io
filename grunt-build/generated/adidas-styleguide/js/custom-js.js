$(function() {
  window.addEventListener("styleguide:onRendered", function(e) {
    alert('asd');
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('select').selectpicker('mobile');
    } else {
      $('select').selectpicker();
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip({trigger:'hover', container: 'body'})
      })
  });

});