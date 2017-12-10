import re
import json
import numpy as np
import operator
import random
from random import randrange
import os 
dir_path = os.path.dirname(os.path.realpath(__file__))

def get_12_random():
    outfile = open(dir_path + '/top_250.json', 'r')

    random_12 = []
    all_movies = []

    for line in outfile:
        movie = json.loads(line)
        all_movies.append(movie)

    random_12 = random.sample(all_movies, 12)

    return random_12

def RepresentsInt(s):
    try: 
        int(s)
        return True
    except ValueError:
        return False 

def get_movie_json_dict(id_list):
    id_json = {}

    for movie_id in id_list:
        if not RepresentsInt(movie_id):
            movie_id = movie_id[2:]

        outfile = open(dir_path + '/top_250.json', 'r')
        for line in outfile:
            movie = json.loads(line)
            
            if movie['id'] == movie_id:
                id_json[int(movie['id'])] = movie
                break

    return id_json

def get_hipster_movies(id_list):
    genres = []

    top_250_json = get_movie_json_dict(id_list)

    length = 0
    year = 0

    for movie_id in top_250_json:
        genres += top_250_json[movie_id]["genres"]
        year += top_250_json[movie_id]["year"]
        runtime = top_250_json[movie_id]["runtimes"][0].split('::')
        if RepresentsInt(runtime[0]):
            length += int(runtime[0])
        else:
            length += 110

    year /= len(id_list)
    length /= len(id_list)
    #count how many instances of each genre were selected

    genre_dict = dict.fromkeys(genres, 0)

    for genre in genre_dict:
        genre_dict[genre] += 1



    outfile = open(dir_path + '/movies.json', 'r')

    id_json = {}

    for line in outfile:
        movie = json.loads(line)
        movie_id = movie["imdbID"]
        
        id_json[movie_id] = movie

    id_genre_score = {}

    for id_val in id_json:
        movie = id_json[id_val]
        
        movie_genre = re.sub(',', '', movie["Genre"])
        movie_genre = set(movie_genre.split())
        num_genres = len(movie_genre)
        
        matching_gens = 0
        genre_weights = 0
        adult = False
        #for each genre
        for g in movie_genre:
            if g == 'Adult':
                adult = True
            if g in genre_dict:
                matching_gens += 1
                genre_weights += genre_dict[g]
        
        genre_score = (matching_gens/(float(num_genres))) * genre_weights
        
        if adult:
            genre_score = -1
        
        id_genre_score[id_val] = genre_score * random.uniform(1.0, 1.1)

    id_len_score = {}
    for id_val in id_json:
        movie = id_json[id_val]   
        time = movie["Runtime"]
        time = time.split()
        
        if len(time) > 0 and not RepresentsInt(time[0]):
            score = 1
        elif len(time) == 0:
            score = 1
        else:
            diff = abs(int(length) - int(time[0]))
            if diff > 50:
                score = 1
            elif diff > 40:
                score = 1.025
            elif diff > 30:
                score = 1.05
            elif diff > 20:
                score = 1.075
            elif diff > 10:
                score = 1.076
            elif diff > 5:
                score = 1.077
            else:
                score = 1.1    
           
        id_len_score[id_val] = score * random.uniform(1.0, 1.025)

    id_debut_score = {}
    for id_val in id_json:
        movie = id_json[id_val]
        score = 0
        this_year = movie["Year"]
        
        if not RepresentsInt(this_year):
           score = 1
        else:
            diff = abs(int(year) - int(this_year))
            if diff > 50:
                score = 1
            elif diff > 40:
                score = 1.025
            elif diff > 30:
                score = 1.05
            elif diff > 20:
                score = 1.075
            elif diff > 10:
                score = 1.076
            elif diff > 5:
                score = 1.077
            else:
                score = 1.1     
        
        id_debut_score[id_val] = score * random.uniform(1.0, 1.05)
        
    id_rating = {}
    for id_val in id_json:
        rating = float(id_json[id_val]["Ratings"][0]["Value"].partition("/")[0])
        
        if not RepresentsInt(rating):
            rating = 1.5
        else:
            rating = float(rating)
            
            rating /= 1.25
        
        id_rating[id_val] = rating * random.uniform(1.0, 1.075)

    id_total_score = {}
    for id_val in id_json:
        genre_score = id_genre_score[id_val]
        length_score = id_len_score[id_val]
        debut_score = id_debut_score[id_val]
        rating_score = id_rating[id_val]
        
        language_multiplier = 1
            
        if id_json[id_val]["Language"] == "English":
            language_multiplier = 2
          
        score = genre_score * length_score * debut_score * rating * language_multiplier
        
        id_total_score[id_val] = score 
        
    del id_debut_score
    del id_len_score
    del id_genre_score 
    del id_rating   
        
    high_id_score = {}
    medium_id_score = {}
    low_id_score = {}
    for id_val in id_json:
        num_votes = id_json[id_val]["imdbVotes"]
        
        if not RepresentsInt(num_votes):
           high_id_score[id_val] = id_total_score[id_val]
        else:
            num_votes = int(num_votes)
            
            if num_votes < 10:
                low_id_score[id_val] = id_total_score[id_val]
            elif num_votes < 100:
                medium_id_score[id_val] = id_total_score[id_val]
            else:
                high_id_score[id_val] = id_total_score[id_val]
                
    sorted_high = sorted(high_id_score.items(), key=operator.itemgetter(1))
    sorted_medium = sorted(medium_id_score.items(), key=operator.itemgetter(1))
    sorted_low = sorted(low_id_score.items(), key=operator.itemgetter(1))

    sorted_high.reverse()
    sorted_medium.reverse()
    sorted_low.reverse()

    buckets = {}

    buckets['high'] = []
    buckets['low'] = []
    buckets['medium'] = []

    for i in range(0,5):
        buckets['high'].append(id_json[sorted_high[i][0]])
        buckets['low'].append(id_json[sorted_low[i][0]])
        buckets['medium'].append(id_json[sorted_medium[i][0]])

    return buckets
    

  
    


    
    
    
    

