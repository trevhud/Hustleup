// Wraps extra long qualifications to fit within the HIT window

$(document).ready(function () {
    if (localStorage && localStorage.getItem('AMTTools.qualsWrapper') > 0) {
        console.log('AMT Tools Qualifications Wrapper loaded');

        $('#qualifications\\.tooltip').parent().parent().children('.capsule_field_text').removeAttr('nowrap');
    }
});
