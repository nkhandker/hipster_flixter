var selected_movies = [];
var recieved_movies = [];

// this will handle the selection of movies in the gallery and the list
// this is where you want to chagne colors etc for movie cards 
function toggle_selected(id){
    if($.inArray(id, selected_movies) == -1){
        selected_movies.push(id);
    }
}

function create_card(title, poster, id){
    var card;
    card =  "<div class='card horizontal' id='"+ id +"'>" +
            "<div class='card-image'>" +
            "<img src='" + poster + "' style='width:100px;height:140px;'>" +       
            "</div>" + 
            "<button id = 'button" + id + "'' class='btn-floating halfway-fab waves-effect waves-light red' onclick='toggle_selected("+ id +")'><i class='material-icons'>add</i></button>" +
            "<div class='card-stacked'>" +
            "<div class='card-content'>" +
            "<span class='card-title'>"+ title +"</span>" +
            "</div>"+
            "</div>"+
            "</div>";
    return card;
}

function create_rec(title, poster, plot, id){
    var card;
    var plot_text;
    var link_text;

    if(plot === "N/A"){
        plot_text = "<p>No plot available for this movie (that's how hipster it is).</p>"; 
    }else{
        plot_text = "<p>" + plot + "</p>";
    }

    var website = "http://www.imdb.com/title/" + id;
    link_text = "<p><a href=" + website + " target=\"_blank\">IMDb Page</a></p>";

    if(poster === "N/A"){
    	card =  "<div class='card horizontal'>" +
            "<div class='card-image'>" +
            "<img src='Hipster_Poster' style='width:300px;height:400px;'>" +       
            "</div>" +
            "<div class='card-stacked'>" +
            "<div class='card-content'>" +
            "<span class='card-title'>"+ title +"</span>" +
            plot_text + link_text + 
            "</div>"+
            "</div>"+
            "</div>";
    }else{
	    card =  "<div class='card horizontal'>" +
	            "<div class='card-image'>" +
	            "<img src='" + poster + "' style='width:300px;height:400px;'>" +       
	            "</div>" +
	            "<div class='card-stacked'>" +
	            "<div class='card-content'>" +
	            "<span class='card-title'>"+ title +"</span>" +
	            plot_text + link_text + 
	            "</div>"+
	            "</div>"+
	            "</div>";
	}

    return card;
}

function add_recs(movie_dict, obscurity){

    var recs = [] 
    for (var key in movie_dict) {
        if (movie_dict.hasOwnProperty(key)) { // this will check if key is owned by data object and not by any of it's ancestors
            var rec = create_rec(movie_dict[key].Title,movie_dict[key].Poster,movie_dict[key].Plot,movie_dict[key].imdbID); 
            recs.push(rec)
        }
    }

    var div = document.getElementById('recommended-gallery');
    if(obscurity == 'high'){
        div.innerHTML += "<h4 class='header'>Are these even Vegan?<br/>Hipster Rating: <i class='small material-icons'>whatshot</i></h4>";
    }
    else if(obscurity == 'medium'){
        div.innerHTML += "<h4 class='header'>Are these on vinyl?<br/>Hipster Rating: <i class='small material-icons'>whatshot</i><i class='small material-icons'>whatshot</i></h4>";
    }
    else{
        div.innerHTML += "<h4 class='header'>Hello, M'ovies<br/>Hipster Rating: <i class='small material-icons'>whatshot</i><i class='small material-icons'>whatshot</i><i class='small material-icons'>whatshot</i></h4>";
    }

    recs.forEach(function(rec) {
        div.innerHTML += rec;
    });
    return recs;
}

function add_cards(movie_list){
    var cards = []
    for (var key in movie_list) {
        if (movie_list.hasOwnProperty(key)) { // this will check if key is owned by data object and not by any of it's ancestors
            cards.push(create_card(movie_list[key].title,movie_list[key].poster,movie_list[key].id))
        }
    }
    //add cards to the div 
    var div = document.getElementById('gallery');
    
    cards.forEach(function(card) {
        div.innerHTML += card;
    });
    
}

function get_random_movies(){
    var get_string = "http://127.0.0.1:8080/random"; 
    
    selected_movies = []
    $("#gallery").empty()

    $.get(get_string,function(data){
        add_cards(data)
        $("#rec-cont").hide();
        $("#gal-cont").show();
    });

    $(window).scrollTop(0);
} 

function send_selected_movies(){
    if(selected_movies.length === 0){
        return;
    }

    var get_string = "http://127.0.0.1:8080/movies/"; 
    
    var temp = selected_movies;
    $("#recommended-gallery").empty()        
    get_string += JSON.stringify(temp)

    $.get(get_string,function(data){
        add_recs(data['high'], 'high')
        add_recs(data['medium'], 'medium')
        add_recs(data['low'], 'low')
        $("#gal-cont").hide();
        $("#rec-cont").show();
    });

    $(window).scrollTop(0);
}

function get_more_movies(){
    $("#gallery").empty()

    var get_string = "http://127.0.0.1:8080/random"; 
    $.get(get_string,function(data){
        add_cards(data)
        $("#rec-cont").hide();
        $("#gal-cont").show();
    });

    $(window).scrollTop(0);
}


$(document).ready(function() {
    get_random_movies();
});