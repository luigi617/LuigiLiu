if (typeof(APP) == "undefined"){
    APP = {}
}
APP['about_me'] = {
    "init": function(){
        $(".education").click(function(){
            if ($("#collapsed_education").hasClass("shown")){
                $("#collapsed_education").removeClass("shown")
                $("#collapsed_education").collapse("hide")
            } else {
                $("#collapsed_education").addClass("shown")
                $("#collapsed_education").collapse("show")
            }
        })
        $(".work_experience").click(function(){
            if ($("#collapsed_work_experience").hasClass("shown")){
                $("#collapsed_work_experience").removeClass("shown")
                $("#collapsed_work_experience").collapse("hide")
            } else {
                $("#collapsed_work_experience").addClass("shown")
                $("#collapsed_work_experience").collapse("show")
            }
        })
        $(".skills").click(function(){
            if ($("#collapsed_skills").hasClass("shown")){
                // APP.about_me.skills_set_random_position()
                $("#collapsed_skills").removeClass("shown")
                $("#collapsed_skills").collapse("hide")
            } else {
                $("#collapsed_skills").addClass("shown")
                $("#collapsed_skills").collapse("show")
                APP.about_me.skills_set_original_position()
                
                  
            }
        })
    },
    "letter_transition": function(letter, coord){
        letter.css({
            "transform": `translateX(${coord[0]}px) translateY(${coord[1]}px)`,
            "transition": 'transform 1s 0.5s cubic-bezier(0.045, 0.855, 0.100, 0.955)'
        })
    },
    "skills_text_to_span": function(){
        for (let j = 0; j <= $(".skills_div").length; j++){
            var skill_div = $($(".skills_div")[j])
            var skills_text = skill_div.text().trim()
            skill_div.empty()
            skill_div.css({
                "display": "flex",
                "white-space": "pre-wrap"
            })
            for (let i = 0; i <= skills_text.length; i++){
                if (typeof(skills_text[i]) == "undefined") {continue}
                skill_div.append(`<span class="skill_${j}_${i}">${skills_text[i]}</span>`)
            }
        }
    },
    "skills_set_random_position": function(){
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        for (let j = 0; j <= $(".skills_div").length; j++){
            var skill_div = $($(".skills_div")[j])
           
            for (let i = 0; i <= skill_div.children().length; i++){
                var letter = $(`.skill_${j}_${i}`)
                var coord = [getRandomInt(-10, 500), getRandomInt(-50, 50)]
                APP.about_me.letter_transition(letter, coord)
            }
        }
    },
    "skills_set_original_position": function(){
        for (let j = 0; j <= $(".skills_div").length; j++){
            var skill_div = $($(".skills_div")[j])
            for (let i = 0; i <= skill_div.children().length; i++){
                var letter = $(`.skill_${j}_${i}`)
                var coord = [0, 0]
                APP.about_me.letter_transition(letter, coord)
            }
        }
    },
    
}