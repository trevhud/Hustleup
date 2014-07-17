// Expands HIT area

$(document).ready(function () {
    if (localStorage && localStorage.getItem('AMTTools.HITExpander') > 0) {
        console.log('AMT Tools HIT Expander loaded');

        var hitHeight = parseInt(localStorage.getItem('AMTTools.HITExpanderValue'));

        if (hitHeight < 1) {
            hitHeight = 7500;
            localStorage.setItem('AMTTools.HITExpanderValue', hitHeight.toString());
        }

        $('iframe').attr('style', 'height: ' + hitHeight + 'px;');
    }
});
