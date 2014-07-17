// Adds an 'Accept' button that will automatically accept the HIT. Changes the 'View a HIT in this group' to 'Preview'

$(document).ready(function () {
    if (localStorage && localStorage.getItem('AMTTools.previewAccept') > 0) {
        console.log('AMT Tools Preview & Accept loaded');

        var previewLinks = $('span.capsulelink a');

        previewLinks.each(function () {
            var previewLink = $(this).attr('href');
            if (previewLink && previewLink.split('?')) {
                var previewLinkArray = previewLink.split('?');
                if (previewLinkArray[0] == '/mturk/preview') {
                    var previewAndAcceptLink = previewLinkArray[0] + 'andaccept?' + previewLinkArray[1];

                    $(this).text('Preview this HIT').attr('target', 'mTurkHITPreview');
                    $(this).parent().prepend('<a href="' + previewAndAcceptLink + '" target="mTurkHITAccept" style="margin-right: 0;">Accept this HIT</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;');
                }
            }
        });
    }
});

