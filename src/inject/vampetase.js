
(function ($) {

    var self = {
        vampetaseImg: [
            'https://www.fotoefeitos.com/images/202103/08/fotoefeitos.com__final_1318506676524000675_.jpg,qact=54.pagespeed.ce.D_i0i_3jN4.jpg',
            'https://www.fotoefeitos.com/images/202103/08/fotoefeitos.com__final_1318508541040561827_.jpg?act=48',
            'https://www.fotoefeitos.com/images/202103/08/fotoefeitos.com__final_1318509324829369289_.jpg,qact=30.pagespeed.ce.-JqTJFmirb.jpg',
            'https://www.fotoefeitos.com/images/202103/08/fotoefeitos.com__final_1318509896371696447_.jpg?act=77',
            'https://www.fotoefeitos.com/images/202103/08/fotoefeitos.com__final_1318510537268407926_.jpg,qact=33.pagespeed.ce.LWPFPoDbXS.jpg',
            'https://www.fotoefeitos.com/images/202103/08/fotoefeitos.com__final_1318511296881761532_.jpg,qact=82.pagespeed.ce.ZYHZgzSkxd.jpg'
        ],
        handleImages: function (lstImgs, time) {
            $.each($('img'), function (i, item) {
                //Skip if image is already replaced
                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                    var h = $(item).height();
                    var w = $(item).width();

                    //If image loaded
                    if (h > 0 && w > 0) {
                        self.handleImg(item, lstImgs);
                    }
                    else {
                        //Replace when loaded
                        $(item).load(function () {
                            //Prevent 'infinite' loop
                            if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                self.handleImg(item, lstImgs);
                            }
                        });
                    }
                }
            });

            //Keep replacing
            if (time > 0) {
                setTimeout(function () { self.handleImages(lstImgs, time); }, time);
            }
        },
        handleImg: function (item, lstImgs) {
            $(item).error(function () {
                //Handle broken imgs
                self.handleBrokenImg(item, lstImgs);
            });

            self.setRandomImg(item, lstImgs);
        },
        setRandomImg: function (item, lstImgs) {
            var h = $(item).height();
            var w = $(item).width();
            $(item).css('width', w + 'px').css('height', h + 'px');
            $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
        },
        handleBrokenImg: function (item, lstImgs) {

            var brokenImg = $(item).attr('src');
            var index = lstImgs.indexOf(brokenImg);
            if (index > -1) {
                lstImgs.splice(index, 1);
            }
            self.setRandomImg(item, lstImgs);
        },
    };

    //Run on jQuery ready
    $(function () {
        self.handleImages(self.vampetaseImg, 3000);
    });

    //Set global variable
    $.nCage = self;

})(jQuery);
