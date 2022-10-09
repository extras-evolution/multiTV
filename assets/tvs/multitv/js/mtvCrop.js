/**
 *
 * mtvCrop 1.0.5
 * Author: zatomant zatomant@gmaill.com
 *
 * use Cropper.js, jQuery UI,
 * Dual licensed under the MIT and GPL licenses
 *
 */

function cropModal(options) {
    let _this = options.this;
    let mtvImage = jQuery(_this).attr('data-cropof');
    if (typeof(mtvImage) == 'undefined'){
        alert('data-cropof is empty!');
        return;
    }
    mtvImage = jQuery('#'+mtvImage);

    let str = jQuery(_this).attr('data-aspectratio');
    let x = str.split('x')[0];
    let y = str.split('x')[1];

    let temp = jQuery('#' + options.input).val().split(',');

    let initCropData = {};
    for (let i = 0; i < temp.length; i++) {
        let t = temp[i].split(":");
        initCropData[t[0]] = parseInt(t[1]);
    }

    if (!initCropData) initCropData = null;
    let dlgBody = '\
            <div id="dlgCropper" data-target="' + options.input + '" data-imgdata="">\
                <div class="mx-auto w-100 h-100">\
                <img id="imageForCrop" src="/' + mtvImage.val() + '" style="display:block;max-width:100%;">\
                </div>\
            </div>';
    jQuery("body").find("#dlgCropper").remove();
    jQuery(dlgBody).appendTo(_this);
    jQuery("#dlgCropper").dialog({
        autoOpen: true,
        draggable: false,
        resizable: false,
        closeOnEscape: false,
        height: 670,
        width: 890,
        modal: true,
        classes: {
            "ui-dialog": "ui-corner-all",
            "ui-dialog-titlebar": "d-none",
            "ui-dialog-buttonset": "row float-none m-0"
        },
        buttons: [
            {
                text: options.txtSave,
                class: 'btn btn-success',
                id: 'mtvCropperSave',
                click: function () {
                    const target = jQuery(this).attr("data-target");
                    const imgdata = jQuery(this).attr("data-imgdata");
                    let obj;
                    try {
                        obj = JSON.parse(imgdata);
                    } catch (e) {
                    }
                    if (obj) {
                        const ret = 'x:' + Math.floor(obj.x) + ',y:' + Math.floor(obj.y) + ',width:' + Math.floor(obj.width) + ',height:' + Math.floor(obj.height);
                        jQuery("#" + target).val(ret);
                        jQuery("#" + target).keyup();
                    }
                    jQuery(this).dialog('destroy').remove();
                }
            },
            {
                text: options.txtCancel,
                class: 'btn btn-secondary',
                click: function () {
                    jQuery(this).dialog('destroy').remove();
                }
            }
        ],
        create: function (event, ui) {
            jQuery(this).siblings('.ui-dialog-buttonpane').prependTo(jQuery('#dlgCropper').parent()).addClass('my-0 p-0').removeClass('ui-widget-content');
            jQuery('<div class="col text-center align-self-center font-weight-bold" id="imageInfo"></div>').prependTo(jQuery(this).siblings('.ui-dialog-buttonpane').children('.ui-dialog-buttonset'));
            jQuery(this).closest(".ui-dialog")
                .find(".ui-button:first") // the first button
                .removeClass("ui-button ui-corner-all ui-widget");
        }
    });
    let $image = jQuery("#imageForCrop");
    $image.cropper({
        viewMode: 1,
        aspectRatio: x / y,
        data: initCropData,
        crop: function (event) {
            const _dlg = jQuery(this).parents("#dlgCropper");
            const cropData = {x: event.detail.x, y: event.detail.y, width: event.detail.width, height: event.detail.height};
            jQuery(_dlg).attr("data-imgdata", JSON.stringify(cropData));
            const imageData = $image.cropper('getImageData');
            const f_x = cropData.x <= 0 ? '<span class="text-primary">' + Math.floor(cropData.x) + '</span>' : Math.floor(cropData.x);
            const f_y = cropData.y <= 0 ? '<span class="text-primary">' + Math.floor(cropData.y) + '</span>' : Math.floor(cropData.y);
            jQuery('#imageInfo').html('<span class="float-left">' + imageData.naturalWidth + ' x ' + imageData.naturalHeight + '</span> X ' + f_x + '+' + Math.floor(cropData.width) + ' Y ' + f_y + '+' + Math.floor(cropData.height));
        },
    });
}

