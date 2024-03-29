from backend.game import Game

from flask import Flask, jsonify, redirect, request, session, url_for
from flask_socketio import SocketIO, send, emit
import os

class Application:
    def __init__(self, static_folder, webport, debug = False):
        self._app = self.create_flask_app(static_folder)
        self._webport = webport
        self._games = []
        self._gameCount = 0

    def joinGame(self, gameId, username):
        if gameId >= len(self._games):
            return 'Cannot join game #%s. Game does not exist.' % gameId
        session[ 'username' ] = username
        session[ 'gameId' ] = gameId
        self._games[gameId].addPlayer(username)

    def createGame(self, gameId, username):
        self._games.append(Game(gameId))
        self._games[gameId].addPlayer(username)
        self._gameCount += 1
        print( 'ADDING PLAY>ER', username)
        session[ 'username' ] = username
        session[ 'gameId' ] = gameId
        return ''

    def create_flask_app(self, static_folder):
        app = Flask(__name__, static_folder = static_folder)
        app.secret_key = os.urandom(16)
        self.socketio = SocketIO( app )

        @app.route('/login', methods = ['GET', 'POST'])
        def login():
            if request.method == 'POST':
                session['username'] = request.form['username']
                return redirect(url_for('join'))
            return app.send_static_file('login.html')

        @app.route('/join', methods = ['GET', 'POST'])
        def join():
            if request.method == 'POST':
                username = session['username']
                try:
                    if len(request.form) != 0:
                        # join game
                        gameId = int(request.form.get('gameId'))
                        retMsg = self.joinGame(gameId, username)
                    else:
                        # create game
                        gameId = self._gameCount
                        retMsg = self.createGame(gameId, username)

                    if retMsg:
                        return "Error: %s" % retMsg
                    session['gameId'] = gameId
                    session['player'] = self._games[gameId].numPlayers() - 1
                except Exception as e:
                    return "Error: %s" % str( e )

                print('adding player %s to game %s' % (session['username'], gameId))
                return redirect(url_for('play'))
            return app.send_static_file('join.html')

        @app.route('/api/get_player', methods = ['GET'])
        def get_player():
            return jsonify(session['player'])

        @app.route('/api/get_gameid', methods = ['GET'])
        def get_gameid():
            return jsonify(session['gameId'])

        @app.route( '/api/get_username', methods = [ 'GET' ] )
        def get_username():
            return jsonify( session[ 'username' ] )

        @self.socketio.on('connect')
        def echo_socket(msg):
            print( msg )
            print( 'ECHO SOCKET CALLED' )
            send( 'hello' )
            # while not ws.closed:
                # message = ws.receive()
                # print( message )
                # ws.send(message)

        @self.socketio.on('my event')
        def my_event_socket( msg ):
            print( msg )

        @self.socketio.on('join')
        def on_join( data ):
            print( data )
            username = data[ 'username' ]
            room = data[ 'room' ]
            print( f'user {username} is joining room {room}' )

        @app.route('/play', methods = ['GET'])
        def play():
            if debug:
                session['username'] = 'jake'
                session['gameId'] = 0
                session['player'] = 1
                self.createGame( 0, 'jake' )
            return app.send_static_file('play.html')

        @app.route('/api/update_game_state', methods = ['GET', 'POST'])
        def update_game_state():
            # get properties of state change
            name = session['username']
            gameId = session['gameId']
            position = (request.json['x'], request.json['y'])
            player = request.json['player']
            piece = request.json['piece']

            # apply state to the user's game
            self._games[gameId].placePiece(player, piece, position)

            return jsonify([])

        @app.route('/api/check_game_state', methods = ['GET'])
        def check_game_state():
            msg = "There are %s games. " % len(self._games)
            for gameId in range(len(self._games)):
                msg += "Game %s has players %s. " % (gameId, str(self._games[gameId].players))
            return jsonify(msg)

        @app.route('/api/get_game_state', methods = ['GET'])
        def get_game_state():
            gameId = session['gameId']
            game = self._games[gameId]
            resp = game.getPieces()
            resp['turn'] = game.getTurn()
            return jsonify(resp)

        @app.route('/')
        @app.route('/<path:path>')
        def index(path = None):
            if path:
                return app.send_static_file(path)
            else:
                return redirect(url_for('login'))

        return app

        @app.after_request
        def after_request(response):
            response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
            response.headers["Pragma"] = "no-cache"
            response.headers["Expires"] = "0"
            return response

    def run(self):
        # self._app.run(port = webport)
        self.socketio.run( self._app, port = webport )

if __name__ == '__main__':
    static_folder = '../frontend'
    webport = 5050

    debug = False

    if os.getenv('DEBUG'):
        debug = True

    application = Application(static_folder, webport, debug)

    application.run()