from backend.game import Game

from flask import Flask, jsonify, redirect, request, session, url_for
from flask_socketio import SocketIO, send, emit, join_room
import os

class Application:
    def __init__( self, static_folder, webport, debug = False ):
        self._app, self._socketio = self.create_flask_app( static_folder )
        self._webport = webport
        self._games = []
        self._gameCount = 0

    def create_flask_app( self, static_folder ):
        app = Flask( __name__, static_folder = static_folder )
        app.secret_key = os.urandom( 16 )
        socketio = SocketIO( app )

        @socketio.on( 'connect' )
        def on_connect( msg ):
            print( msg )
            send( 'hello' )

        @socketio.on( 'connected' )
        def on_my_event( msg ):
            print( "connected:", msg )

        @socketio.on( 'join game' )
        def join_game( params ):
            gameId = int( params[ 'gameId' ] )
            username = params[ 'username' ]

            self._games[ gameId ].addPlayer( username )

            session[ 'username' ] = username
            session[ 'gameId' ] = gameId

            join_room( str( gameId ) )

            player = self._games[ gameId ].numPlayers() - 1

            emit( 'joined', { 'username': username, 'player': player, 'gameId': gameId } )

        @socketio.on( 'create game' )
        def create_game( params ):
            print( "creating game: ", params )
            gameId = len( self._games )
            username = params[ 'username' ]

            self._games.append( Game( gameId ) )
            self._games[ gameId ].addPlayer( username )

            session[ 'username' ] = username
            session[ 'gameId' ] = gameId

            join_room( str( gameId ) )

            emit( 'joined', { 'username': username, 'player': 0, 'gameId': gameId } )

        @socketio.on( 'update game state' )
        def update_game_state( params ):
            # get properties of state change
            name = session[ 'username' ]
            gameId = session[ 'gameId' ]
            position = ( params[ 'x' ], params[ 'y' ] )
            player = params[ 'player' ]
            piece = params[ 'piece' ]

            # apply state to the user's game
            self._games[ gameId ].placePiece( player, piece, position )
            emit( 'game state update', { 'player': player, 'piece': piece, 'position': position }, to = str( gameId ) )

        @app.route( '/' )
        @app.route( '/<path:path>' )
        def index( path = None ):
            if path:
                return app.send_static_file( path )
            else:
                return redirect( 'index.html' )

        @app.after_request
        def after_request( response):
            response.headers[ "Cache-Control" ] = "no-cache, no-store, must-revalidate"
            response.headers[ "Pragma" ] = "no-cache"
            response.headers[ "Expires" ] = "0"
            return response

        return app, socketio

    def run( self ):
        self._socketio.run( self._app, port = webport )

if __name__ == '__main__':
    static_folder = '../frontend'
    webport = 5050

    debug = False

    if os.getenv( 'DEBUG' ):
        debug = True

    application = Application( static_folder, webport, debug )

    application.run()