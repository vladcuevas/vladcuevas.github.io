
$(function () {
  // Vars.

  var	$window = $(window)

  var $body = $('body')

  // Breakpoints.

  // Disable animations/transitions until everything's loaded.

  $body.addClass('is-loading')

  $window.on('load', function () {
    $body.removeClass('is-loading')
  })

  // Poptrox.

  $window.on('load', function () {

  })
})
