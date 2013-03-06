$("#thumbs IMG").bind('click',

          function()
					{
  					select_thumb($(this));
				  }
		);


    $("#main").mousewheel( function(e,d) {
      if(d > 0)
      {
        // on zoome
        new_value = get_zoom() + 40;
      }
      else
      {
        // on dezoome
        new_value = Math.max(get_zoom() - 40, 100);

      }
      $('#main').css('background-size', new_value +"% "+ new_value +"%")
    });


    $("#main").mousedown(
                          function(event) {
                            event.preventDefault();
                            old_pos = new Array(event.clientX, event.clientY);
                            document.body.style.cursor = 'all-scroll';

                            $("BODY").bind("mouseup mouseleave",
                                function()
                                {
                                  $("BODY").off("mousemove");
                                  document.body.style.cursor = 'default';
                                }
                            );

                            $("BODY").mousemove(
                              function(event)
                              {
                                event.preventDefault();
                                res = $('#main').css('background-position').match(/^(-?\d+)px (-?\d+)px/);

                                var X = Math.max(Math.min(parseInt(res[1]) -  (event.clientX - old_pos[0]), 0), -700 * (get_zoom() -100) / 100);
                                var Y = Math.max( Math.min(parseInt(res[2]) -  (event.clientY - old_pos[1]), 0), -400 * (get_zoom() - 100) / 100);

                                $('#main').css('background-position', X +"px "+ Y +"px");

                                old_pos = new Array(event.clientX, event.clientY);
                              });

                          }
     );

     var old_pos = new Array();

    $("#main").dblclick(function()
                          {
                              $('#main').css('-webkit-transition-property', 'all');
                         			$('#main').css('background-size', "100% 100%");
                        			$('#main').css('background-position', "0 0");
                        			setTimeout("$('#main').css('-webkit-transition-property', 'none');", 500);
                }
    );

    $("#thumbs").mousewheel(function(e,d)
          {
            if(d > 0)
            {
              if($('.selected + IMG').length > 0)
              {
                select_thumb($('.selected + IMG'));
              }
            }
            else
            {
              var elt_dom = $('#thumbs_div IMG').not('.selected ~ IMG');

              if(elt_dom.length > 1)
              {
                select_thumb(elt_dom.eq(elt_dom.length - 2));
              }
            }
          });

    function get_zoom()
    {
      res_zoom = $('#main').css('background-size').match(/^(\d+)%/);
      return parseInt(res_zoom[1]);
    }

    function select_thumb(t)
    {
      // on reinitialise les proprietes du background (zoom et positionnement)
			$('#main').css('background-size', "100% 100%");
			$('#main').css('background-position', "0 0");

			$('#main').css('background-image', 'url('+ t.attr('src').replace('thumb/', 'big/') +')');

    	$('.selected').removeClass('selected');
  		t.addClass('selected');

      def_pos_thumbs(t)
    }

    function def_pos_thumbs(t)
    {
      if($('#thumbs').css('position') == "absolute")
      {
        // la barre des thumbs est verticale
        pos_y = $("BODY").innerHeight()/2 - t.position().top - t.innerHeight()/2;
  			$('#thumbs_div').css('margin-top', pos_y  + "px");
  			$('#thumbs_div').css('margin-left', "0px");
      }
      else
      {
        // la barre des thumbs est horizontale
        pos_x = $("BODY").innerWidth()/2 - t.position().left - t.innerWidth()/2;
        $('#thumbs_div').css('margin-left', Math.min(0, pos_x) + "px");
  			$('#thumbs_div').css('margin-top', "0px");
      }

    }

    $(window).resize(function() {
      def_pos_thumbs($('.selected'));
    });


    function rotation_screen()
    {
      $('#thumbs DIV').css('-webkit-transition-property', 'none');
      def_pos_thumbs($('.selected'));
      $('#thumbs DIV').css('-webkit-transition-property', 'all');
    }

    select_thumb($('#thumbs_div IMG:eq(6)'));
