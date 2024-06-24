if (typeof(APP) == "undefined"){
    APP = {}
}
APP['map'] = {
    "init": function(){
        
        var redIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

        var OpenStreetMap =  L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
        OpenStreetMap.addTo(map)
        L.control.zoom({
            position: 'bottomright'
        }).addTo(map);
       
        
        function centerMarkerOnMap(event) {
            var currentPosition = event.target.getCenter()
            currentPositionMarker.setLatLng(currentPosition)
        }
        $("#add_marker").click(function(){
            if ($("#add_marker_form").hasClass("adding")){
                return;
            }
            $("#marker_info").addClass("d-none")
            $("#add_marker_form").addClass("adding")
            $("#add_marker_form").removeClass("d-none")
            currentPositionMarker = new L.marker(map.getCenter(), {icon: redIcon}).addTo(map)
            map.on('move', centerMarkerOnMap)
        })
        $("#add_marker_close").click(function(){
            $("#add_marker_form").removeClass("adding")
            $("#add_marker_form").addClass("d-none")
            map.removeLayer(currentPositionMarker)
            map.off("move")
        })


        $("#marker_info_close").click(function(){
            $("#marker_info").addClass("d-none")
        })

        $(".direction").click(function(){
            var address = $("#marker_info").find(".address").text()
            address = address.replaceAll(" ", "+")
            var win = window.open('https://www.google.com/maps/place/' + address, '_blank');
            if (win) {
                win.focus();
            } else {
                alert('Please allow popups for this website');
            }
        })
        $("#create_marker").click(function(){
            var lon = parseFloat(map.getCenter().lng).toFixed(6)
            var lat = parseFloat(map.getCenter().lat).toFixed(6)
            
            var company_name = $("#input_company_name").val()
            var address = $("#input_address").val()
            var phone_number = $("#input_phone_number").val()
            var tags = $("#input_tags").val()
            var company_image = $("#input_company_image")[0].files[0]
            var week_days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
            var opening_hours = ""
            week_days.forEach(day => {
                opening_hours = opening_hours + day + ":"
                if ($(`#${day}_closed`).prop('checked') == true){
                    opening_hours = opening_hours + "closed"
                } else {
                    if ($(`#${day}_start`).val().length == 0 || $(`#${day}_end`).val().length == 0){
                        opening_hours = opening_hours
                    } else {
                        opening_hours = opening_hours + $(`#${day}_start`).val() + "-" + $(`#${day}_end`).val()
                    }
                }
                opening_hours = opening_hours + ";"
            });
            console.log();
            if (company_name.length == 0 || address.length == 0) { return }
            var fd = new FormData();
            fd.append("lon", lon);
            fd.append("lat", lat);
            fd.append("company_name", company_name);
            fd.append("address", address);
            fd.append("phone_number", phone_number);
            fd.append("tags", tags);
            fd.append("opening_hours", opening_hours);
            fd.append("company_image", company_image);
            console.log(...fd);
            $.ajax({
                method: "POST",
                url: BASE_URL + MARKER_CREATION_URL,
                data: fd,
                processData: false,
                contentType: false,
                success: function(data){
                    window.location.reload()
                }
            })
        })
      
    },

    "load_markers": function(lon_min, lon_max, lat_min, lat_max){
        var blueIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

        function split_first_encountered(string, split_item) {
            for (let i = 0; i<string.length; i++){
                if (string[i] == split_item){
                    return [string.substring(0, i), string.substring(i+1, string.length)]
                }
            }
            return [string]
        }
        $.ajax({
            method: "GET",
            url: BASE_URL + MARKER_LIST_URL,
            success: async function(data){
                console.log(data["results"]);
                for (let i = 0; i < data["results"].length; i++){
                    var lon = parseFloat(data["results"][i]["lon"])
                    var lat = parseFloat(data["results"][i]["lat"])
                 

                    L.marker([lat, lon], {icon: blueIcon}).addTo(map).on('click', function(e) {
                        $("#marker_info").removeClass("d-none")

                        if (data["results"][i]["company_image"] == null){
                            $("#marker_info").find(".company_image").attr("src","https://placehold.co/400x200")
                        } else {
                            $("#marker_info").find(".company_image").attr("src",data["results"][i]["company_image"])
                        }
                        $("#marker_info").find(".company_name").text(data["results"][i]["company_name"])
                        $("#marker_info").find(".address").text(data["results"][i]["address"])
                        $("#marker_info").find(".phone_number").text(data["results"][i]["phone_number"])
                        $("#marker_info").find(".tags_text").text(data["results"][i]["tags"])
                        $(".opening_hours_details").empty()
                        for (let j = 0; j < data["results"][i]["opening_hours"].split(";").length-1; j++){
                            var opening_day_hour = `
                                <div class="row text-center">
                                    <div class="col">${split_first_encountered(data["results"][i]["opening_hours"].split(";")[j], ":")[0]}</div>
                                    <div class="col">${split_first_encountered(data["results"][i]["opening_hours"].split(";")[j], ":")[1]}</div>
                                </div>
                            `
                            $(".opening_hours_details").append(opening_day_hour)
                        }
                    });
                }
            }
        })
    }
    
}