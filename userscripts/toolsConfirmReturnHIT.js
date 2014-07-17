// Prompts you when you're retuning a HIT

$(document).ready(function () {
    if (localStorage && localStorage.getItem('AMTTools.confirmReturnHIT') > 0) {
        console.log('AMT Tools Confirm Return HIT loaded');

        $('img[src="/images/return_hit.gif"]').parent().click(function () {
            return confirm('Are you sure you want to return this HIT?\r\nPress OK to return the HIT or press Cancel to continue working on the HIT.');
        });
    }
});