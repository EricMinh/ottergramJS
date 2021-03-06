var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initNextPrev(thumbList) {
    'use strict';
    document.getElementById("previous").addEventListener("click", function (event) {
        event.preventDefault();
        nextPrev(thumbList, 0);
    });

    document.getElementById("next").addEventListener("click", function (event) {
        event.preventDefault();
        nextPrev(thumbList, 1);
    });
}

function nextPrev(thumbList, flag) {
    var imgList = getThumbnailsArray();
    for (var i = 0; i < imgList.length; i++) {
        imgList[i] = imgList[i].href;
    }
    var position = imgList.indexOf(document.querySelector('.detail-image').src);

    if (flag === 0) {
        if (position === 0) {
            position = imgList.length - 1;
        } else {
            position = position - 1;
        }
    }
    if (flag === 1) {
        if (position === thumbList.length - 1) {
            position = 0
        } else {
            position = position + 1;
        }
    }

    thumbList[position].click();
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    initNextPrev(thumbnails);
}

initializeEvents();
