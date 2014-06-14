$(document).ready(function(){
  // Navbar affix
  $('.navbar').affix({
    offset: {
      top: -20
    }
  });
  // $('body').scrollspy({ target: '#navigation-bar .nav' })
  $('body').scrollspy({ target: '.navbar-example' })

  // Smooth Scrolling
  // http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('a[href*=#]:not([href=#]):not(.dropdown-toggle):not(.tab-link):not(.carousel-control)').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top // - $('.navbar').height()
        }, 1000);
        return false;
      }
    }
  });
  
  // $('#intro').carousel(0)
  $('#intro').carousel({
    interval: false
  });
  $(".fancybox").fancybox();
  
  $('#faq .container .list-group .list-group-item:nth-child(odd)').click(function(){
    var answer_node = $(this).next()
    console.log(answer_node.css('display'))
    if (answer_node.css('display') == 'none'){
      $(this).addClass('active')
    }else{
      $(this).removeClass('active')
    }
    $(answer_node).slideToggle(300)
  })

  // Initialize Parse with your Parse application & javascript keys
  Parse.initialize("C3g0y75F4fgJzxTUI7Wt6ewYL8JwwWFYh5Q8UOEq", "GF7v31DkGdpjPL0Qq27vYkhKiyao9FGS2scWyTS4");
   
  // Setup the form to watch for the submit event
  $('form').submit(function(e){
    e.preventDefault();
    
    // Grab the elements from the form to make up
    // an object containing name, email and message
    var data = {
      // name: document.getElementById('name').value,
      name: 'contact_us form',
      email: document.getElementById('inputEmail3').value,
      message: document.getElementById('inputMessage3').value
    }
    
    $('form .form-group.alerts .alert').hide()
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ((data['email'].length == 0 && data['message'].length == 0)||
        (!re.test(data['email']))){
      $('form .form-group.alerts .alert.alert-warning').fadeIn(250);
      return false
    }
    
    $('form input[type=submit]').button('loading')
    // Run our Parse Cloud Code and
    // pass our 'data' object to it
    Parse.Cloud.run("sendEmail", data, {
      success: function(object) {
        console.log('sent');
        $('form .form-group.alerts .alert.alert-success').fadeIn(250);
        $('form input[type=submit]').button('reset')
      },
      
      error: function(object, error) {
        console.log(error);
        $('form .form-group.alerts .alert.alert-danger').fadeIn(250);
        $('form input[type=submit]').button('reset')
      }
    });
  });

});
