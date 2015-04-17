/**
 * Move an element.
 * @param  {jq|Element} e
 * @param  {Number} x
 * @param  {Number} y
 * @param  {Number} rot
 * @param  {Number} scake
 */
function pos(e, x, y, rot, scale) {
    (e[0] || e).style.transform = (
        'translate3d(' + (x || 0) + 'px, ' + (y || 0) + 'px, 0) ' +
        'rotate(' + (rot || 0) + 'rad) ' +
        'scale(' + (scale || 0) + ')'
    );
};

/**
 * Matt.
 * @param {Element|Selector} container
 * @param {Element|Selector} matt
 */
function Matt(e, matt) {
    this.e = $(e);
    this.matt = $(matt).first().hide();
}

Matt.prototype = {
    runMattRun: function() {
        var count = 50, matts = [];

        var m;
        for (var i = 0; i < count; i++) {
            m = this.clone();
            pos(
                m,
                0,
                25 * -i,
                2 * Math.PI / 50 * i,
                1
            );
            matts.push(m);
            this.e.prepend(m);
        }

        window.requestAnimationFrame(update);

        var dt = 0.04;
        function update(t) {
            t = t / 1000;
            for (var i = 0; i < count; i++) {
                var m = matts[i], p = (count - i) / count;
                pos(
                    m,
                    (400 - i * 5) * Math.sin(t - dt * i),
                    25 * -i,
                    2 * Math.PI / 50 * (i + 15 * t),
                    0.6 + (0.2 + 0.2 * Math.cos(1.5 * t)) * p * p
                );
            }
            window.requestAnimationFrame(update);
        }
    },
    clone: function() {
        return this.matt.clone().show();
    }
};
