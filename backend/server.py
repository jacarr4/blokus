from flask import Flask, jsonify, redirect, request, session, url_for
import os

class Game:
    def __init__(self, gameId):
        self._players = set()
        self._gameId = gameId

    def addPlayer(self, username):
        if username in self._players:
            raise ValueError( "Username %s already playing this game." % username )
        if len(self._players) >= 4:
            raise ValueError( "Game #%s is full." % self._gameId )
        self._players.add(username)

class Application:
    def __init__(self, static_folder, webport):
        self._app = self.create_flask_app(static_folder)
        self._webport = webport
        self._games = []
        self._gameCount = 0
    
    def joinGame(self, gameId, username):
        if gameId >= len(self._games):
            return 'Cannot join game #%s. Game does not exist.' % gameId
        self._games[gameId].addPlayer(username)

    def createGame(self, gameId, username):
        self._games.append(Game(gameId))
        self._games[gameId].addPlayer(username)
        self._gameCount += 1

    def create_flask_app(self, static_folder):
        app = Flask(__name__, static_folder = static_folder)
        app.secret_key = os.urandom(16)

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
                except Exception as e:
                    return "Error: %s" % str( e )

                print('adding player %s to game %s' % (session['username'], gameId))
                return redirect(url_for('play'))
            return app.send_static_file('join.html')
        
        @app.route('/play', methods = ['GET'])
        def play():
            return app.send_static_file('play.html')
        
        @app.route('/api/update_game_state', methods = ['POST'])
        def update_game_state():
            return jsonify('updating game state')
        
        @app.route('/api/check_game_state', methods = ['GET'])
        def check_game_state():
            msg = "There are %s games. " % len(self._games)
            for gameId in range(len(self._games)):
                msg += "Game %s has players %s. " % (gameId, str(self._games[gameId].players))
            return jsonify(msg)

        @app.route('/')
        @app.route('/<path:path>')
        def index(path = None):
            if path:
                return app.send_static_file(path)
            else:
                return redirect(url_for('login'))
        
        return app
    
    def run(self):
        self._app.run(port = webport)

if __name__ == '__main__':
    static_folder = '../frontend'
    webport = 5050

    application = Application(static_folder, webport)
    
    application.run()