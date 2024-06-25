if (typeof(APP) == "undefined"){
    APP = {}
}
APP['pokemon_database'] = {
    "init": function(){
        $(".pagination .load_more").click(function(){
            page = page + 1
            APP.pokemon_database.load_pokemon(page, filter)
        })
        $(".order").click(function(){
            $(this).find(".bi").addClass("processing")
            $(".order").find(".bi").not(".processing").removeClass("bi-sort-down-alt").removeClass("bi-sort-down").addClass("bi-filter")
            if ($(this).find(".bi").hasClass("bi-filter")){
                $(this).find(".bi").removeClass("bi-filter").addClass("bi-sort-down")
                filter = $(this).data("filter")
            } else if ($(this).find(".bi").hasClass("bi-sort-down")){
                $(this).find(".bi").removeClass("bi-sort-down").addClass("bi-sort-down-alt")
                filter = "-" + $(this).data("filter")
            } else {
                $(this).find(".bi").removeClass("bi-sort-down-alt").addClass("bi-filter")
                filter = "id"
            }
            $(this).find(".bi").removeClass("processing")

            $(".pokemon_table").find('.pokemon_row').remove();
            page = 1
            APP.pokemon_database.load_pokemon(page, filter)
        })
    },
    "load_pokemon": function(page, filter="id"){
        console.log(filter);
        $.ajax({
            method: "GET",
            url: BASE_URL + POKEMON_LIST_ULR + "?page=" + page + "&filter=" + filter,
            success: async function(data){
                for (let pokemon of data["results"]){
                    capture_prob = Math.round(parseInt(pokemon["hp"]) * parseInt(pokemon["capture_rate"]) / (3 * parseInt(pokemon["hp"])), 2)
                    pok = `
                        <tr class="pokemon_row">
                        <td class="fw-light">${pokemon["pokedex_number"]}</td>
                        <td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon["pokedex_number"]}.png" alt=""></td>
                        <td class="fw-light">${pokemon["name"]}</td>
                        <td class="fw-light">${pokemon["hp"]}</td>
                        <td class="fw-light">${pokemon["attack"]}</td>
                        <td class="fw-light">${pokemon["sp_attack"]}</td>
                        <td class="fw-light">${pokemon["defense"]}</td>
                        <td class="fw-light">${pokemon["sp_defense"]}</td>
                        <td class="fw-light">${pokemon["base_total"]}</td>
                        <td class="fw-light">${capture_prob}%</td>
                        `
                    if (pokemon["type2"] == "nan"){
                        pok = pok + `<td class="fw-light" colspan="2">${pokemon["type1"]}</td>`
                    } else {
                        pok = pok + `<td class="fw-light">${pokemon["type1"]}</td> <td class="fw-light">${pokemon["type2"]}</td>`
                    }
                        
                    $(".pokemon_table").append(pok)
                } 
                if (data["next"] == null){
                    $(".pagination .load_more").addClass("d-none")
                }
            }
        })
    }
}