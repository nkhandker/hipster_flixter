
import logging 
 
from flask import current_app, Flask, redirect, url_for, jsonify, request, render_template
import json
from hipsterflixter import alternate_alg
#from alternate_alg import get_12_random, get_hipster_movies

def create_app(config, debug=False, testing=False, config_overrides=None):
    app = Flask(__name__)
    app.config.from_object(config)

    app.debug = debug
    app.testing = testing

    if config_overrides:
        app.config.update(config_overrides)

    # Configure logging
    if not app.testing:
        logging.basicConfig(level=logging.INFO)

    # Setup the data model.
    with app.app_context():
        model = get_model()
        model.init_app(app)


    # Add a default root route.
    @app.route("/", methods=['GET'])
    def test():
        return jsonify({'message' : 'hipster flixter' })

    @app.route("/hello")
    def hello():
        return render_template('hello.html')

    @app.route("/random", methods=['GET'])
    def random():
        message = alternate_alg.get_12_random()
        #pro conversion of dicts to a dict of arrays using DICT COMPREHENSION 
        new_dict = {item['id']:item for item in message}
        return jsonify(new_dict)

    @app.route("/movies/<jsdata>", methods=['GET'])
    def foo(jsdata):
        data = json.loads(jsdata)
        movie_ids = [x for x in data]
        message = alternate_alg.get_hipster_movies(movie_ids)
        return jsonify(message)

    # Add an error handler. This is useful for debugging the live application,
    # however, you should disable the output of the exception for production
    # applications.
    @app.errorhandler(500)
    def server_error(e):
        return """
        An internal error occurred: <pre>{}</pre>
        See logs for full stacktrace.
        """.format(e), 500

    return app

def get_model():
    model_backend = current_app.config['DATA_BACKEND']
    if model_backend == 'mongodb':
        from . import model_mongodb
        model = model_mongodb
    else:
        raise ValueError(
            "No appropriate databackend configured. "
            "Please specify mongodb")

    return model