// Keeps auto-accept box checked on the HIT page

$(document).ready(function () {
    if (localStorage && localStorage.getItem('AMTTools.autoAcceptCheck') > 0) {
        console.log('AMT Tools Auto-Accept Checked loaded');

        $('input[name="autoAcceptEnabled"]').each(function () {
            $(this).prop('checked', true);
        });
    }
});
