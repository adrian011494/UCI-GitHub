'use strict';
$('head').append('<link crossorigin="anonymous" href="' + chrome.extension.getURL('jquery.msgBox.min.css') + '" media="all" rel="stylesheet">');

// var part1 = "<a href='http://nexus.prod.uci.cu/repository/github-proxy";
// var part2 = "' class='btn btn-outline get-repo-btn' rel='nofollow' data-ga-click='Repository, download zip, location:repo overview'> ★ Descargar UCI-GitHub</a>";
//
// $(".get-repo-modal.dropdown-menu.dropdown-menu-sw .mt-2 .btn.btn-outline.get-repo-btn").each(function(index) {
//     // console.log('AQUII1111');
//     if ($(this).attr('href')) {
//         var url = $(this).attr('href');
//         $(".get-repo-modal.dropdown-menu.dropdown-menu-sw .mt-2").append(part1 + url + part2);
//         // console.log('AQUII');
//         //$( this ).attr('href',"http://nexus.prod.uci.cu/repository/github-proxy"+$( this ).attr('href'))
//     }
// });
$("body").append('<div id="dialog-uci-github"></div>');

function initBody() {
    $("a").each(function (i, el) {
        var href_value = el.href;
        var href_value_uci = href_value.replace("github.com", "nexus.prod.uci.cu/repository/github-proxy");
        if (!$(el).hasClass("uci-github") && /[^\\]*\.(zip|gz|bz2|lz|lzma|lzo|rz|sfark|sz|xz|7z|s7z|ace|afa|alz|apk|arj|b1|ba|bh|cab|car|cfs|dar|dmg|jar|kgb|lzx|pak|rar|sfx|tgz|Z|bz2|tbz2|tlz|war|win|xar|zipx|zz|ar|cpio|tar|lbr|appx|appxbundle|deb|ebuild|orb|pisi|pkg|pup|pet|rpm|snap|appimage|dmg|exe)$/.test(href_value.toLowerCase())) {
            console.log(href_value + " is a file");
            $(el).addClass("uci-github");
            $(el).click(function () {
                $("#dialog-uci-github").msgBox({
                    title: 'Descargar desde:',
                    message: '',
                    buttons: [{
                        text: '★ Descarga UCI-GitHub',
                        callback: function () {
                            window.location.href = href_value_uci;
                        }
                    },
                        {
                            text: 'GitHub',
                            callback: function () {
                                window.location.href = href_value;
                            }
                        }, {
                            text: 'Cancelar',
                            callback: function () {

                            }
                        }

                    ]
                });
                return false;
            });

        } else {
            //console.log(href_value + " is not a file");
        }
    });
};
initBody();

var browser = browser || chrome;
browser.runtime.onMessage.addListener(request => {
    initBody();
});
