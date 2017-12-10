import alternate_alg as alg
import json

again = True

while(again):
	random_12 = alg.get_12_random()
	like_id = []

	for movie in random_12:
		answer = input("Do you like the movie "+ movie['title'] + " ? [y/n]: ")
		if answer in ['Y', 'y']:
			like_id.append(movie['id'])

	movies = alg.get_hipster_movies(like_id)

	print('\n')
	print("Are these movies even vegan?")
	for movie in movies['high']:
		print('\t' + movie['Title'] + " - http://www.imdb.com/title/" + movie['imdbID'])

	print('\n')
	print("Can I get these movies on vinyl?")
	for movie in movies['medium']:
		print('\t' + movie['Title'] + " - http://www.imdb.com/title/" + movie['imdbID'])

	print('\n')
	print("m'ovies")
	for movie in movies['low']:
		print('\t' + movie['Title'] + " - http://www.imdb.com/title/" + movie['imdbID'])

	answer = input("Would you like more recommendations? [y/n]: ")
	if answer in ['Y', 'y']:
		again = True
	else:
		again = False
