if (typeof(APP) == "undefined"){
    APP = {}
}
APP['base'] = {
    "init": function(){
        $.ajaxPrefilter(function(options, originalOptions, jqXHR){
            if (options['type'].toLowerCase() === "post" || options['type'].toLowerCase() === "put") {
                jqXHR.setRequestHeader('X-CSRFToken', APP.base.get_cookie('csrftoken'));
            }
        });
        $(".navbar-toggler").click(function(){
            if ($(this).attr("aria-expanded") == "true"){
                $("body").addClass("dont_scroll")
                } else {
                $("body").removeClass("dont_scroll")
            }
        })
    },
    "sleep": function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    "keyboard_disable": function disable(){
        document.onkeydown = function (e){
            return false;
        }
    },
    "keyboard_enable": function enable(){
        document.onkeydown = function (e) {
            return true;
        }
    },
    "get_url_parameter": function getUrlParameter(sParam) {
        var sURLVariables = window.location.search.substring(1);
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    },
    "show_avatar": function show_avatar(avatar){
        if (avatar == null){
            return "/front-end/static/assets/img/default-user-image.png"
        }
        return avatar
    },
    "convert_to_DDMMYYYY": function convertToDDMMYYYY(time_str) {
        var timestamp = Date.parse(time_str);
        if (isNaN(timestamp)) {
            return null; // or handle invalid date string
        }
    
        var date = new Date(timestamp);
        var day = ("0" + date.getDate()).slice(-2); // Adds leading zero if needed
        // var month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is 0-based
        var month = date.getMonth() + 1
        var year = date.getFullYear();

        const months = [
            'Jan', 'Feb', 'Mar', 
            'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 
            'Oct', 'Nov', 'Dec'
        ];
    
        return months[month - 1] + " " + day + " " + year;
    },
    "parse_time": function parse_time(time_str){
        date = Date.parse(time_str)
        now = Date.now()
        diff = now - date
        diff_seconds = diff / (1000)
        diff_minutes = diff / (1000 * 60)
        diff_hours = diff / (1000 * 60 * 60)
        diff_days = diff / (1000 * 60 * 60 * 24)
        diff_months = diff / (1000 * 60 * 60 * 24 * 30)
        diff_year = diff / (1000 * 60 * 60 * 24 * 30 * 12)
        var res;
        // if (diff_year >= 2){
        //     res = `${Math.floor(diff_year)} years ago`
        // } else if (diff_year >= 1){
        //     res = `${Math.floor(diff_year)} year ago`
        // }else if (diff_months >= 2){
        //     res = `${Math.floor(diff_months)} months ago`
        // }else if (diff_months >= 1){
        //     res = `${Math.floor(diff_months)} month ago`
        // }else if (diff_days >= 2){
        //     res = `${Math.floor(diff_days)} days ago`
        // }else if (diff_days >= 1){
        //     res = `${Math.floor(diff_days)} day ago`
        // }else if (diff_hours >= 2){
        //     res = `${Math.floor(diff_hours)} hours ago`
        // }else if (diff_hours >= 1){
        //     res = `${Math.floor(diff_hours)} hour ago`
        // }else if (diff_minutes >= 2){
        //     res = `${Math.floor(diff_minutes)} minutes ago`
        // }else if (diff_minutes >= 1){
        //     res = `${Math.floor(diff_minutes)} minute ago`
        // }else if (diff_seconds >= 2){
        //     res = `${Math.floor(diff_seconds)} seconds ago`
        // }else if (diff_seconds >= 0){
        //     res = `${Math.floor(diff_seconds)} second ago`
        // }
        if (diff_days >= 1){
            res = APP.base.convert_to_DDMMYYYY(time_str)
        }else if (diff_hours >= 2){
            res = `${Math.floor(diff_hours)} hours ago`
        }else if (diff_hours >= 1){
            res = `${Math.floor(diff_hours)} hour ago`
        }else if (diff_minutes >= 2){
            res = `${Math.floor(diff_minutes)} minutes ago`
        }else if (diff_minutes >= 1){
            res = `${Math.floor(diff_minutes)} minute ago`
        }else if (diff_seconds >= 2){
            res = `${Math.floor(diff_seconds)} seconds ago`
        }else if (diff_seconds >= 0){
            res = `${Math.floor(diff_seconds)} second ago`
        }
        return res
    },
    "parse_article_content": function parse_article_content(content) {
        return content;
    },
    "get_cookie": function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },
    "calculate_size": function calculateSize(img, maxWidth, maxHeight) {
        let width = img.width;
        let height = img.height;

        // calculate the width and height, constraining the proportions
        if (width > height) {
            if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
            }
        }
        return [width, height];
    },
    "scroll_to_top": function scrollToTop() {
        window.scrollTo(0, 0);
    },
    "displaySelectedImage": async function(event, displayElement, maxSizeMB=0.5, maxWidthOrHeight=1024){
        const selectedImage = $(displayElement)[0];
        const fileInput = event.target;
        if (fileInput.files && fileInput.files[0]) {
            const compressedFile = await APP.base.compress_image(fileInput.files[0], maxSizeMB, maxWidthOrHeight)
            const reader = new FileReader();
            reader.onload = function(e) {
                selectedImage.src = e.target.result;
            };
            reader.readAsDataURL(compressedFile);
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(compressedFile);
            event.target.files = dataTransfer.files;
            
        }
    },
    "compress_image": async function(original_file, maxSizeMB, maxWidthOrHeight){
        if (!original_file) { return null }
        var processingFile = original_file
        try {
            if (original_file["type"] == "image/heic" || original_file["type"] == "image/heif"){
                const convertedFile = await heic2any({ blob: original_file, toType: 'image/jpeg' });
                processingFile = new File([convertedFile], original_file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
            }
            // Compress the image
            const options = {
                maxSizeMB: maxSizeMB,
                maxWidthOrHeight: maxWidthOrHeight,
                useWebWorker: true,
                initialQuality: 1,
                exifOrientation: true,
                maxIteration: 10,
                fileType: 'image/jpeg',
            };
            const compressedBlob = await imageCompression(processingFile, options);
            const compressedFile = new File([compressedBlob], processingFile.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg', lastModified: Date.now() });
            return compressedFile
        } catch (error) {
            console.error('Error compressing the image:', error);
            return null
        }
    }
}


  

