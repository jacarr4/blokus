from flask import Flask, jsonify, redirect, request, session, url_for
import os

class Application:
    def __init__(self, static_folder, webport):
        self._app = self.create_flask_app(static_folder)
        self._webport = webport
        self._games = []
        self._gameCount = 0

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
                if len(request.form) != 0:
                    gameId = request.form.get('gameId')
                else:
                    gameId = self._gameCount
                print('adding player %s to game %s' % (session['username'], gameId))
                return redirect(url_for('play'))
            return app.send_static_file('join.html')
        
        @app.route('/play', methods = ['GET'])
        def play():
            return app.send_static_file('play.html')

        @app.route('/api/create_game', methods = ['GET'])
        def create_game():
            msg = 'creating game #%s for user %s' % (self._gameCount, session['username'])
            self._gameCount += 1
            print(msg)
            return redirect(url_for('play'))

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