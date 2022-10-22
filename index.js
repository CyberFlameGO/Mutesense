var gamesense = require('gamesense-client');
const loudness = require('loudness');
const WindowsTrayicon = require("windows-trayicon");
const path = require("path");
const fs = require("fs");

const MutesenseTray = new WindowsTrayicon({
	title: "Mutesense",
	icon: path.resolve(__dirname, "icon.ico"),
	menu: [ {	id: "item-1",
			caption: "Do Nothing"
		},
		{
			id: "item-2-id-exit",
			caption: "Exit"
		}
	]
});
MutesenseTray.item((id) => {
	switch (id) {
		case "item-1": {break;}
		case "item-2-id-exit": {
			MutesenseTray.exit();
                        client.removeGame();
			process.exit(0);
			break;
		}
		default: {
			break;
		}
	}
});


var endpoint = new gamesense.ServerEndpoint();

endpoint.discoverUrl();

var app = new gamesense.Game('Mutesense', 'Mutesense', 'Dimaguy');

var client = new gamesense.GameClient(app, endpoint);

var muteEvent = new gamesense.GameEvent('IS_MUTED');

client.registerGame().then(bindMuteHandler).then(startMuteEventUpdates).catch(logError);

function bindMuteHandler() {
	var muteColor = new gamesense.Color(255,0,0);
	var muteKeyEventHandler = new gamesense.ColorEventHandler(gamesense.DeviceType.KEYBOARD, gamesense.RgbPerKeyZone.F1, muteColor);
	return client.bindEvent(muteEvent, [muteKeyEventHandler]);

}

function startMuteEventUpdates() {
    setInterval(updateMuteEvent, 500);
}

function updateMuteEvent() {
    loudness.getMuted().then(function(result) {muteEvent.value = result ? 1 : 0});
    //muteEvent.value = blinkEvent.value > 0 ? 1 : 0;
    //console.log('updateBlinkEvent', {blinkEvent: blinkEvent});
    client.sendGameEventUpdate(muteEvent).catch(logError);
}

function logError(error) {
    console.log(error);
}