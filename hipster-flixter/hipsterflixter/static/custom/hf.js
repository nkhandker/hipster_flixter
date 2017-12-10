

var test_data = [
    {"title": "The Shawshank Redemption", "genres": ["Crime", "Drama"], "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1._SX94_SY140_.jpg", "id": "0111161", "year": 1994, "runtimes": ["142"]}
    ,{"title": "The Godfather", "genres": ["Crime", "Drama"], "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BY2Q2NzQ3ZDUtNWU5OC00Yjc0LThlYmEtNWM3NTFmM2JiY2VhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1._SX98_SY140_.jpg", "id": "0068646", "year": 1972, "runtimes": ["175"]}
    ,{"title": "The Godfather: Part II", "genres": ["Crime", "Drama"], "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjZiNzIxNTQtNDc5Zi00YWY1LThkMTctMDgzYjY4YjI1YmQyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1._SX98_SY140_.jpg", "id": "0071562", "year": 1974, "runtimes": ["202", "220::(The Godfather Trilogy 1901-1980 VHS Special Edition)"]}
    ,{"title": "The Dark Knight", "genres": ["Action", "Crime", "Drama", "Thriller"], "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1._SX95_SY140_.jpg", "id": "0468569", "year": 2008, "runtimes": ["152"]}
    ,{"title": "12 Angry Men", "genres": ["Crime", "Drama"], "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1._SX91_SY140_.jpg", "id": "0050083", "year": 1957, "runtimes": ["96"]}
    ,{"title": "Schindler's List", "genres": ["Biography", "Drama", "History"], "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1._SX93_SY140_.jpg", "id": "0108052", "year": 1993, "runtimes": ["195", "Turkey:185::(TV version)"]}
    ,{"title": "Pulp Fiction", "genres": ["Crime", "Drama"], "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1._SX94_SY140_.jpg", "id": "0110912", "year": 1994, "runtimes": ["154", "178::(original cut)"]}
    ,{"title": "The Lord of the Rings: The Return of the King", "genres": ["Adventure", "Drama", "Fantasy"], "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BYWY1ZWQ5YjMtMDE0MS00NWIzLWE1M2YtODYzYTk2OTNlYWZmXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1._SX94_SY140_.jpg", "id": "0167260", "year": 2003, "runtimes": ["201", "263::(Blu-Ray Extended Edition)", "254::(Special DVD Extended Edition)", "192::(DVD Widescreen Edition)"]}
    ,{"title": "Il buono, il brutto, il cattivo", "genres": ["Western"], "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1._SX92_SY140_.jpg", "id": "0060196", "year": 1966, "runtimes": ["161", "France:186::(dubbed version)", "Spain:182", "179::(2003 extended English version)", "Finland:142::(1968) (cut version)", "UK:148", "USA:178"]}        
]

var selected_movies = [];
var recieved_movies = [];

// this will handle the selection of movies in the gallery and the list
// this is where you want to chagne colors etc for movie cards 
function toggle_selected(id){
    if(selected_movies.includes(id)){
        //removes an id from the selected list
        selected_movies = selected_movies.filter(function(item){
            return item !== id
        })
    }
    else{
        selected_movies.push(id);
    }
}

function create_card(title, poster, id){
    var card;
    card =  "<div class='card horizontal' id='"+ id +"'>" +
            "<div class='card-image'>" +
            "<img src='" + poster + "'>" +       
            "</div>" +
            "<a class='btn-floating halfway-fab waves-effect waves-light red' onclick='toggle_selected("+ id +")'><i class='material-icons'>add</i></a>" +
            "<div class='card-stacked'>" +
            "<div class='card-content'>" +
            "<span class='card-title'>"+ title +"</span>" +
            "</div>"+
            "</div>"+
            "</div>";
    return card;
}

function create_rec(title, poster, plot){
    var card;
    card =  "<div class='card horizontal'>" +
            "<div class='card-image'>" +
            "<img src='" + poster + "'>" +       
            "</div>" +
            "<div class='card-stacked'>" +
            "<div class='card-content'>" +
            "<span class='card-title'>"+ title +"</span>" +
            "<p>" + plot + "</p>" +
            "</div>"+
            "</div>"+
            "</div>";
    return card;
}

function add_recs(movie_dict, obscurity){

    var recs = [] 
    for (var key in movie_dict) {
        if (movie_dict.hasOwnProperty(key)) { // this will check if key is owned by data object and not by any of it's ancestors
            var rec = create_rec(movie_dict[key].Title,movie_dict[key].Poster,movie_dict[key].Plot); 
            recs.push(rec)
        }
    }

    var div = document.getElementById('recommended-gallery');
    if(obscurity == 'high'){
        div.innerHTML += "<h4 class='header'>Is this even Vegan? (Not even Hipster) Rating: <i class='medium material-icons'>whatshot</i></h4>";
    }
    else if(obscurity == 'medium'){
        div.innerHTML += "<h4 class='header'>These on vinyl? (hipper than grandpa's hip replacement) Rating: <i class='medium material-icons'>whatshot</i><i class='medium material-icons'>whatshot</i></h4>";
    }
    else{
        div.innerHTML += "<h4 class='header'>M'ovies Rating: <i class='medium material-icons'>whatshot</i><i class='medium material-icons'>whatshot</i><i class='medium material-icons'>whatshot</i></h4>";
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

} 

function send_selected_movies(){

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
}


$(document).ready(function() {
    get_random_movies();
});