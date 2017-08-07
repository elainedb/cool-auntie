'use strict';

const SimpleIntent = require('../shared/simpleIntent');
const utils = require('../shared/_utils');
const songData = require('./songData');

const INTENT_ID = 'intent.auntie.game.song.choose';

const CONTEXT_CHOOSE_GAME = "context_choose_game";
const DEFAULT_LIFESPAN = 5;

const ENTITY_SONG = "song";

class ChooseSong extends SimpleIntent {

    constructor() {
        super(INTENT_ID);
    }

    trigger(app) {
        // possible songs
        let songs = app.data.songs ? new Set(app.data.songs) : songData.SONGS;

        let startSentence = `${utils.randomFromArray(songData.SENTENCES_SONG_SING)}`;
        let fullResponse = `<speak> ${startSentence} ${utils.getSong(app, app.getArgument(ENTITY_SONG), songs, songData.SONGS_SRC)}
                ${utils.randomFromArray(songData.END_SENTENCES_SONG)} Do you want to sing the same song again, another song or do you want to play another game?</speak>`;
        let writtenResponse = `${startSentence}`;
        if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
            app.ask(app.buildRichResponse()
            .addSimpleResponse({speech: fullResponse,
                                displayText: writtenResponse})
            .addSuggestions(['Again!', 'Another', 'Play another game'])
            );
        } else {
            app.ask(fullResponse);
        }
    }
}

module.exports = ChooseSong;