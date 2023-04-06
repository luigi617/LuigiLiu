if (typeof(APP) == "undefined"){
    APP = {}
}
APP['pokemon_database'] = {
    "init": function(){
        $(".pagination .load_more").click(function(){
            page = page + 1
            APP.pokemon_database.load_pokemon(page)
        })
    },
    "load_pokemon": function(page){
        $.ajax({
            method: "GET",
            url: BASE_URL + POKEMON_LIST_ULR + "?page=" + page,
            success: async function(data){
                for (let pokemon of data["results"]){
                    capture_prob = Math.round(parseInt(pokemon["hp"]) * parseInt(pokemon["capture_rate"]) / (3 * parseInt(pokemon["hp"])), 2)
                    pok = `
                        <tr>
                        <td>${pokemon["pokedex_number"]}</td>
                        <td><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon["pokedex_number"]}.png" alt=""></td>
                        <td>${pokemon["name"]}</td>
                        <td>${pokemon["hp"]}</td>
                        <td>${pokemon["attack"]}</td>
                        <td>${pokemon["sp_attack"]}</td>
                        <td>${pokemon["defense"]}</td>
                        <td>${pokemon["sp_defense"]}</td>
                        <td>${pokemon["base_total"]}</td>
                        <td>${capture_prob}%</td>
                        `
                    if (pokemon["type2"] == "nan"){
                        pok = pok + `<td colspan="2">${pokemon["type1"]}</td>`
                    } else {
                        pok = pok + `<td>${pokemon["type1"]}</td> <td>${pokemon["type2"]}</td>`
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