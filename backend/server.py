from flask import Flask, jsonify, request

class Application:
    def __init__(self, static_folder, webport):
        self._app = self.create_flask_app(static_folder)
        self._webport = webport

    def create_flask_app(self, static_folder):
        app = Flask(__name__, static_folder = static_folder)

        @app.route('/api/create_game', methods = ['GET'])
        def create_game():
            print('creating game')
            print(request)
            return jsonify('creating game')

        @app.route('/')
        @app.route('/<path:path>')
        def index(path = None):
            if path:
                return app.send_static_file(path)
            else:
                return app.send_static_file('index.html')
        
        return app
    
    def run(self):
        self._app.run(port = webport)

if __name__ == '__main__':
    static_folder = '../frontend'
    webport = 5050

    application = Application(static_folder, webport)
    
    application.run()