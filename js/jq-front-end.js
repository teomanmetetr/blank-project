$(function () {

    //DEGISKENLER

    var sizew = $(window).width();
    var sizeh = $(window).height();

    //--------------------------------------------------------------------------------------------------------------------------------------//

    // MOBIL - PC AYIRMAK

    var mobile = (/iphone|ipod|ipad|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()))
    if (mobile) {
        $("body").addClass("mobil");
    } else {
        $("body").addClass("desktop");
        smothScroll();
    }

    //--------------------------------------------------------------------------------------------------------------------------------------//

    //TOOLTIP BOOTSTRAP

    $('[data-toggle="tooltip"]').tooltip();

    //--------------------------------------------------------------------------------------------------------------------------------------//

    //POPUPA OLAYLARI

    //READY ACILAN
    if ($(".popupA[data-ready]").length) {
        //POZISYON HESAPLAMA
        var hedef = $(".popupA[data-ready]").attr("data-hedef");
        var yuksek = $(".popupA[data-hedef=" + hedef + "]").outerHeight() / 2;
        $(".popupA[data-hedef=" + hedef + "]").css("margin-top", "-" + yuksek + "px")
        // POPUP ISLEMI
        $(".popupA[data-hedef=" + hedef + "]").fadeToggle(200);
        $(".popupA[data-hedef=" + hedef + "]").find(".kapat").attr("data-hedef", hedef);
        $(".maske").fadeToggle(200);
        $(".maske").attr("data-hedef", hedef);
    }

    //ALERT STILI ACILAN
    var alertClass = "pAlert";
    $.popupAlert = function (alertMessage, title, maske) {
        var alertMessage = typeof alertMessage === 'undefined' ? "Bir hata oluştu!" : alertMessage;
        var title = typeof title === 'undefined' ? null : title;
        var maske = typeof maske === 'undefined' ? true : typeof maske !== 'boolean' ? true : maske; // ture - false
        var hedef = "alert";
        //TEKRAR
        if ($(".popupA[data-hedef='" + hedef + "']").length) $(".popupA[data-hedef='" + hedef + "']").find(".kapat").click();

        $("body").prepend("<div class='popupA " + alertClass + "' data-hedef='" + hedef + "'><div class='kapat flaticon-close47'></div><div class='icerik'>" + alertMessage + "</div></div>")
        if (title) $(".popupA[data-hedef=" + hedef + "]").prepend("<div class='baslik'>" + title + "</div>")

        $(".popupA[data-hedef=" + hedef + "]").fadeIn(200);
        if (maske == true) {
            $(".maske").fadeIn(200);
            $(".maske").attr("data-hedef", hedef);
        }
    }

    //TETIKLEYEREK ACILAN
    $.popupA = function (hedef) {
        $(".popupA[data-hedef=" + hedef + "]").fadeToggle(200);
        $(".maske").fadeToggle(200);
        $(".maske").attr("data-hedef", hedef);
    }
    $.popupAin = function (hedef) {
        $(".popupA[data-hedef=" + hedef + "]").fadeIn(200);
        $(".maske").fadeIn(200);
        $(".maske").attr("data-hedef", hedef);
    }
    $.popupAout = function (hedef) {
        $(".popupA[data-hedef=" + hedef + "]").fadeOut(200);
        $(".maske").fadeOut(200);
        $(".maske").removeAttr("data-hedef");
    }

    //$.popup("hataAlert");
    //$.popupAin("hataAlert");
    //$.popupAout("hataAlert");

    //CLICK ACILAN
    $(document).delegate(".popupAbtn", "click", function () {
        //POZISYON HESAPLAMA
        var hedef = $(this).attr("data-hedef");
        var yuksek = $(".popupA[data-hedef=" + hedef + "]").outerHeight() / 2;
        $(".popupA[data-hedef=" + hedef + "]").css("margin-top", "-" + yuksek + "px")

        // POPUP ISLEMI
        $(".popupA[data-hedef=" + hedef + "]").fadeToggle(200);
        $(".popupA[data-hedef=" + hedef + "]").find(".kapat").attr("data-hedef", hedef);
        $(".maske").fadeToggle(200);
        $(".maske").attr("data-hedef", hedef);
    });

    $(document).delegate(".popupA .kapat", "click", function () {
        var hedef = $(this).parents(".popupA").attr("data-hedef");
        $(".popupA[data-hedef=" + hedef + "]").fadeOut(200);
        $(".maske").fadeOut(200);
        $(".maske").removeAttr("data-hedef");

        // popupAlert ILE OLUSTURULAN ISKELETI SILER
        if ($(".popupA[data-hedef='" + hedef + "']").hasClass(alertClass)) $(".popupA[data-hedef=" + hedef + "]").remove();

    });

    $(document).delegate(".maske", "click", function () {
        if ($(this).attr("data-hedef")) {
            var hedef = $(this).attr("data-hedef");
            $(".popupA[data-hedef=" + hedef + "]").fadeToggle(200);
            $(".maske").fadeToggle(200);
            $(".maske").removeAttr("data-hedef");

            // popupAlert ILE OLUSTURULAN ISKELETI SILER
            if ($(".popupA[data-hedef='" + hedef + "']").hasClass(alertClass)) $(".popupA[data-hedef=" + hedef + "]").remove();
        }
    })

    //--------------------------------------------------------------------------------------------------------------------------------------//

    //TOOGLE BTN OLAYLARI

    $(".toggleBtn").on("click", function (event) {
        $(this).toggleClass("aktif");
        var hedef = $(this).attr("data-hedef");
        $("." + hedef).slideToggle(300);
    });

    //--------------------------------------------------------------------------------------------------------------------------------------//

    //TOOGLE BTN CLASLI OLAYLAR

    $(".toggleAktifBtn").on("click", function (event) {
        var hedef = $(this).attr("data-hedef");
        $("." + hedef).toggleClass("aktif");
    });

    //--------------------------------------------------------------------------------------------------------------------------------------//

    //TAB SISTEMI
    $(".tab-menu .menu").on("click", function () {
        var tabMenu = $(this).parents(".tab-menu");
        var tabTarget = $(this).parents(".tab-menu").attr("data-tabTarget");
        var target = $(this).attr("data-target");
        tabTarget = $(".tab-content#" + tabTarget);

        //MENU ACTIVE SELECT
        tabMenu.find(".menu").removeClass("active");
        $(this).addClass("active");

        //CONTENT ACTIVE SELECT
        tabTarget.find(".content").removeClass("active");
        tabTarget.find(".content." + target).addClass("active");
    });

    // URL #name CONTENT ACTIVE SELECT
    var tabName = window.location.href.slice(window.location.href.indexOf('#'));
    $(".tab-menu .menu[href='" + tabName + "']").click();

    //--------------------------------------------------------------------------------------------------------------------------------------//

    //GENISLIK YUKSEKLIK DEGISTIGINDE

    (function ($) {
        var a = {}, c = "doTimeout", d = Array.prototype.slice;
        $[c] = function () {
            return b.apply(window, [0].concat(d.call(arguments)))
        };
        $.fn[c] = function () {
            var f = d.call(arguments), e = b.apply(this, [c + f[0]].concat(f));
            return typeof f[0] === "number" || typeof f[1] === "number" ? this : e
        };
        function b(l) {
            var m = this, h, k = {}, g = l ? $.fn : $, n = arguments, i = 4, f = n[1], j = n[2], p = n[3];
            if (typeof f !== "string") {
                i--;
                f = l = 0;
                j = n[1];
                p = n[2]
            }
            if (l) {
                h = m.eq(0);
                h.data(l, k = h.data(l) || {})
            } else {
                if (f) {
                    k = a[f] || (a[f] = {})
                }
            }
            k.id && clearTimeout(k.id);
            delete k.id;
            function e() {
                if (l) {
                    h.removeData(l)
                } else {
                    if (f) {
                        delete a[f]
                    }
                }
            }

            function o() {
                k.id = setTimeout(function () {
                    k.fn()
                }, j)
            }

            if (p) {
                k.fn = function (q) {
                    if (typeof p === "string") {
                        p = g[p]
                    }
                    p.apply(m, d.call(n, i)) === true && !q ? o() : e()
                };
                o()
            } else {
                if (k.fn) {
                    j === undefined ? e() : k.fn(j === false);
                    return true
                } else {
                    e()
                }
            }
        }
    })(jQuery);
    $w = $(window),
        $d = $(document),
        $ww = $w.width(),
        $wh = $w.height(),
        $wt = $w.scrollTop(),
        $wb = $wt + $wh;

    var resizedevam = false;
    $w.on("resize", function () {
        if (!resizedevam) {
            $w.trigger("resizeBasinda");
            resizedevam = true;
        }

        $.doTimeout("resizebitir", 190, function () {
            $(window).trigger("resizeSonunda");
            resizedevam = false;
        })
    });
    var ilkWw = 0, ilkWh = 0;
    $w.on("resizeBasinda", function () {
        ilkWw = $ww;
        ilkWh = $wh;
    });
    $w.on("resizeSonunda", function () {
        $ww = $w.width(),
            $wh = $w.height(),
            $wb = $wt + $wh;

        if (ilkWw != $ww) {
            $w.trigger("genDegisti");

            if (ilkWw < $ww)
                $w.trigger("genisledi");
            else
                $w.trigger("daraldi");
        }
        if (ilkWh != $wh) {
            $w.trigger("yukDegisti");

            if (ilkWh < $wh)
                $w.trigger("uzadi");
            else
                $w.trigger("kisaldi");
        }
    });

    $(window).on("genDegisti", function () {
        console.log(sizew);
    })
    $(window).on("yukDegisti", function () {
        console.log(sizeh);
    })

    //--------------------------------------------------------------------------------------------------------------------------------------//

    //SWIPE PARMAK KAYDIRMA HAREKETLERI

    var swipeDeadZone = 50,
        holdTime = 1000;

    var time = {
            down: 0,
            up: 0,
            suAn: 0,
        },
        pos = {
            ilk: {x: 0, y: 0},
            suAn: {x: 0, y: 0},
        },
        mouseDown = false,
        lastTarget,
        data = {};

    Array.prototype.tumu = function () {
        return this.every(function (el) {
            return el
        })
    }

    Array.prototype.biri = function () {
        return this.some(function (el) {
            return el
        })
    }

    var holdTimeOutHandler = function () {

        var sartlar = [
            mouseDown,
            Math.abs(pos.ilk.x - pos.suAn.x) < swipeDeadZone,
            Math.abs(pos.ilk.y - pos.suAn.y) < swipeDeadZone,
            new Date().getTime() - time.down >= holdTime
        ];

        if (sartlar.tumu())
            $(lastTarget).trigger("hold", [data]);

    }

    var downHandler = function (e) {

        if (!mouseDown) {

            mouseDown = true;

            time.down = e.timeStamp;
            time.suAn = e.timeStamp;

            pos.ilk.x = e.clientX || e.originalEvent.touches[0].clientX;
            pos.ilk.y = e.clientY || e.originalEvent.touches[0].clientY;
            pos.suAn.x = e.clientX || e.originalEvent.touches[0].clientX;
            pos.suAn.y = e.clientY || e.originalEvent.touches[0].clientY;

            lastTarget = e.target;

            data.time = time,
                data.pos = pos;
            data.lastTarget = lastTarget;

            $(e.target).trigger("swipeStart", [data]);

            setTimeout(holdTimeOutHandler, holdTime);
        }
    }

    var moveHandler = function (e) {

        if (mouseDown) {

            time.suAn = e.timeStamp;

            pos.suAn.x = e.clientX || e.originalEvent.touches[0].clientX;
            pos.suAn.y = e.clientY || e.originalEvent.touches[0].clientY;

            data.time = time;

            $(lastTarget).trigger("swipe", [data]);

        }
    }

    var upHandler = function (e) {
        if (mouseDown) {

            mouseDown = false;

            time.up = e.timeStamp;
            time.suAn = e.timeStamp;

            var farkX = Math.abs(pos.ilk.x - pos.suAn.x),
                farkY = Math.abs(pos.ilk.y - pos.suAn.y);

            data.time = time;

            $(lastTarget).trigger("swipeEnd", [data]);

            var sartlar = [
                farkX > swipeDeadZone,
                farkY > swipeDeadZone,
            ];

            if (sartlar.biri()) {

                // TRUE = X; FALSE = Y
                var eksenX = farkX > farkY;

                if (eksenX) {

                    if (pos.ilk.x < pos.suAn.x)
                        $(lastTarget).trigger("swipeRight", [data]);
                    else
                        $(lastTarget).trigger("swipeLeft", [data]);

                } else {

                    if (pos.ilk.y < pos.suAn.y)
                        $(lastTarget).trigger("swipeDown", [data]);
                    else
                        $(lastTarget).trigger("swipeUp", [data]);

                }

            }

        }
    }

    var errorHandler = function () {
        mouseDown = false;
    }

    if (typeof $d === 'undefined')
        $d = $(document);

    $d.on("mousedown", downHandler);
    $d.on("touchstart", downHandler);

    $d.on("mousemove", moveHandler);
    $d.on("touchmove", moveHandler);

    $("html").on("mouseout", errorHandler);

    $d.on("mouseup", upHandler);
    $d.on("touchend", upHandler);
    $d.on("touchcancel", upHandler);

    $("body.mobil").on("swipeLeft", function () {
        console.log("swipeLeft")
    });
    $("body.mobil").on("swipeRight", function () {
        console.log("swipeRight")
    });

    //--------------------------------------------------------------------------------------------------------------------------------------//

})   