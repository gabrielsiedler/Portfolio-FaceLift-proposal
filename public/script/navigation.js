$(document).ready(init);
function init() {
    /* ========== DRAWING THE PATH AND INITIATING THE PLUGIN ============= */

    $.fn.scrollPath("getPath", {
        scrollSpeed: 80, // Default is 50
        rotationSpeed: Math.PI / 10 // Default is Math.PI / 15
    })
            // Move to 'start' element
            .moveTo(400, -100, {callback: function() {
            showContent(0);
        }, name: "start"}) //S

            .lineTo(470, -100, {//C0
        callback: function() {
            checkPoint(0);
        }
    })

            .arc(700, -80, 225, Math.PI, 2 * Math.PI, true) //Arc from START to UK

            .lineTo(950, -150, {//C1
        callback: function() {
            checkPoint(1);
        }
    })

            .rotate(-Math.PI / 2, {
        callback: function() {
            showContent(1);
        },
        name: "uk"
    })

            .lineTo(1020, -150, {//C1
        callback: function() {
            checkPoint(1);
        }
    })

            .arc(2080, -150, 800, Math.PI, 2 * Math.PI, false) //Arc from UK to SK

            .lineTo(3300, 270, {//C2
        callback: function() {
            checkPoint(2);
        }
    })

            .lineTo(3400, 270, {
        callback: function() {
            showContent(2);
        },
        name: "skorea"
    })

            .lineTo(3100, 250, {//C2
        callback: function() {
            checkPoint(2);
        }
    })

            .rotate(-3 * Math.PI / 2)

            .lineTo(-600, 120)

            .lineTo(-790, 230, {//C3
        callback: function() {
            checkPoint(3);
        }
    })

            .rotate(-2 * Math.PI, {
        callback: function() {
            showContent(3);
        },
        name: "usa1"
    })

            .lineTo(-850, 230, {//C3
        callback: function() {
            checkPoint(3);
        }
    })

            .arc(-615, 230, 275, Math.PI, 2 * Math.PI, true) //Arc from USA1 to USA2


            .rotate(-Math.PI / 2, {//C4
        callback: function() {
            checkPoint(4);
        }
    })

            .lineTo(-350, 125, {
        callback: function() {
            showContent(4);
        },
        name: "usa2"
    })

            .lineTo(-200, 105, {//C4
        callback: function() {
            checkPoint(4);
        }
    })

            .lineTo(1085, 0)

            .lineTo(1185, -80, {//C5
        callback: function() {
            checkPoint(5);
        }
    })

            .rotate(-2 * Math.PI, {
        callback: function() {
            showContent(5);
        },
        name: "germany"
    })

            .lineTo(1000, 100, {//C5
        callback: function() {
            checkPoint(5);
        }
    })

            .rotate(3 * Math.PI / 4)

            .lineTo(100, 1300)

            .lineTo(15, 1470, {//C6
        callback: function() {
            checkPoint(6);
        }
    })

            .rotate(2 * Math.PI, {//B
        callback: function() {
            showContent(6);
        },
        name: "clients"
    })

            .lineTo(150, 1470, {//C6
        callback: function() {
            checkPoint(6);
        }
    })

            .lineTo(800, 1470, {//C7
        callback: function() {
            checkPoint(7);
        }
    })

            .lineTo(1015, 1470, {
        callback: function() {
            showContent(7);
        },
        name: "location"
    })

            .lineTo(900, 1270, {//C7
        callback: function() {
            checkPoint(7);
        }
    })


            .lineTo(400, 100)

            .lineTo(400, 0, {//C0
        callback: function() {
            checkPoint(0);
        }
    })

            .lineTo(400, -100);

    // We're done with the path, let's initate the plugin on our wrapper element
    $(".wrapper").scrollPath({
        drawPath: true,
        wrapAround: true
    });
    // Add scrollTo on click on the navigation anchors
    $("nav").find("a").each(function() {
        var target = $(this).attr("href").replace("#", "");
        $(this).click(function(e) {
            e.preventDefault();
            // Include the jQuery easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/)
            // for extra easing functions like the one below
            $.fn.scrollPath("scrollTo", target, 500, "easeInOutSine");
        });
    });
    /* ===================================================================== */

    $(".settings .show-path").click(function(e) {
        $(".settings .sp-canvas").show();
        e.preventDefault();
        $(".sp-canvas").show();/*
         }).toggle(function() {
         $(this).text("Hide Path");
         }, function() {
         $(this).text("Show Path");*/
    });
}

classList = ['.start', '.uk', '.skorea', '.usa1', '.usa2', '.germany', '.clients', '.location'];

function showContent(id) {

    fadeTime = 2000;
    currentContent = classList[id];
    otherClasses = "";
    for (cl in classList) {
        if (cl != id) {
            if (otherClasses === "") {
                otherClasses = otherClasses + classList[cl];
            } else {
                otherClasses = otherClasses + "," + classList[cl];
            }

        }
    }

    $(otherClasses).fadeOut(fadeTime);
    $(currentContent).fadeIn(fadeTime);

}

function checkPoint(id) {

    currentContent = classList[id];
    $(currentContent).fadeOut('fast');

}

// Loading screen
$(function() {
    percHandler = 0;
    $('.progressbar').each(function() {
        var t = $(this),
                dataperc = t.attr('data-perc'),
                barperc = Math.round(dataperc * 3.56);
        t.find('.bar').animate({width: barperc}, dataperc * 25);
        t.find('.label').append('<div class="perc"></div>');

        function perc() {
            var length = t.find('.bar').css('width'),
                    perc = Math.round(parseInt(length) / 3.56),
                    labelpos = (parseInt(length) - 2);
            t.find('.label').css('left', labelpos);
            t.find('.perc').text(perc + '%');

            if (perc === 100) {
                clearInterval(percHandler);
                ldDone();
            }
        }

        percHandler = setInterval(perc, 0);

    });

    function ldDone() {
        $("#loading").delay(1000, function() {
            $(".sp-scroll-bar,header,footer,.wrapper,nav").show(function() {
                $("#loading").fadeOut(2000);
                $("#info").fadeOut(2000);
            });
        });

    }

});

//Location
$(function() {
    $("#loc_world_br,#loc_world_uk,#loc_world_es,#loc_br1,#loc_uk1,#loc_es1").on('click', function() {
        location($(this).attr("id"));
    });

    $(".loc_back").on('click', function() {
        location_back($(this).attr("id"));
    });

    function location(locid) {
        
        open = '';
        close = '';

        switch (locid) {
            case 'loc_world_br':
                open = '#br1';
                close = '#world';
                break;
            case 'loc_world_uk':
                open = '#uk1';
                close = '#world';
                break;
            case 'loc_world_es':
                open = '#es1';
                close = '#world';
                break;
            case 'loc_br1':
                open = '#br2';
                close = '#br1';
                break;
            case 'loc_uk1':
                open = '#uk2';
                close = '#uk1';
                break;
            case 'loc_es1':
                open = '#es2';
                close = '#es1';
                break;
        }
       

        $(close).fadeOut(500);
        $(open).fadeIn(1000);

    }

    function location_back(locid) {
        open = '';
        close = '';

        switch (locid) {
            case 'lock_back_br1':
                open = '#world';
                close = '#br1';
                break;
            case 'lock_back_br2':
                open = '#br1';
                close = '#br2';
                break;
            case 'lock_back_uk1':
                open = '#world';
                close = '#uk1';
                break;
            case 'lock_back_uk2':
                open = '#uk1';
                close = '#uk2';
                break;
            case 'lock_back_es1':
                open = '#world';
                close = '#es1';
                break;
            case 'lock_back_es2':
                open = '#es1';
                close = '#es2';
                break;
        }

        $(close).fadeOut(500);
        $(open).fadeIn(1000);
    }
});