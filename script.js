(function(){
    var script = {
 "backgroundPreloadEnabled": true,
 "defaultVRPointer": "laser",
 "layout": "absolute",
 "paddingTop": 0,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "start": "this.playAudioList([this.audio_C5CCA77C_D72D_0C87_41E2_970B092FC720]); this.init()",
 "children": [
  "this.MainViewer",
  "this.Container_DFBEBB79_D24C_4407_41E5_791C5C15FA37",
  "this.Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC"
 ],
 "scrollBarMargin": 2,
 "scripts": {
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "existsKey": function(key){  return key in window; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "registerKey": function(key, value){  window[key] = value; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getKey": function(key){  return window[key]; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "unregisterKey": function(key){  delete window[key]; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); }
 },
 "downloadEnabled": false,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "width": "100%",
 "borderRadius": 0,
 "paddingBottom": 0,
 "borderSize": 0,
 "minHeight": 20,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "100%",
 "overflow": "visible",
 "scrollBarWidth": 10,
 "minWidth": 20,
 "desktopMipmappingEnabled": false,
 "definitions": [{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DA305D1D_D797_A64E_41E3_179AFFF22713",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.34,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D89F5FAF_D797_A249_41D1_C74629CAF74C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 156.25,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DAC96C77_D797_A6D9_41E5_907C17D37F0C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 25.24,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D867E178_D797_DED7_41D8_0C210C893EFA",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.9,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 93.86,
   "backwardYaw": -58.26,
   "distance": 1,
   "panorama": "this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_EA4707A2_CD1D_6AAD_41E3_A8C2A074C3FA"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_t.jpg",
 "label": "F3",
 "id": "panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 2.99,
   "backwardYaw": -152.53,
   "distance": 1,
   "panorama": "this.panorama_DC61E73A_CD35_2B92_41E8_B023F2407848"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 100.16,
   "backwardYaw": -111.9,
   "distance": 1,
   "panorama": "this.panorama_C396E8BA_CD13_E69D_41B9_97455311D726"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DDE24B65_CD14_DBB7_41DA_3E16F5EFE2DD",
  "this.overlay_DCFF6228_CD0D_25BD_41E4_6DDC75178522"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_t.jpg",
 "label": "A1",
 "id": "panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 129.12,
   "backwardYaw": 140.14,
   "distance": 1,
   "panorama": "this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E82AF9A1_CD17_E6AE_41D7_C79DCD7172A3"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_t.jpg",
 "label": "E4",
 "id": "panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 30.17,
   "backwardYaw": -3.56,
   "distance": 1,
   "panorama": "this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -58.99,
   "backwardYaw": -128.93,
   "distance": 1,
   "panorama": "this.panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D5BA5D11_CD1D_3F6E_41BD_4C4140C6C63A",
  "this.overlay_DA7FC03C_CD13_2596_41E4_6944479945FB",
  "this.overlay_FF5E42A2_CD17_2AB2_41B2_3577077EBD70"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_t.jpg",
 "label": "C3",
 "id": "panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D844B124_D797_DE7E_41B1_93C2B53F1926",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.48,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DA62ED6B_D797_A6CA_41E9_8DBB65FD9737",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -105.36,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DABD52DB_D797_E3C9_41D5_9AE95D1C71A8",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 16.3,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -161.33,
   "backwardYaw": 113.7,
   "distance": 1,
   "panorama": "this.panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 109.89,
   "backwardYaw": -23.75,
   "distance": 1,
   "panorama": "this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_ED3F433D_CD3D_EB97_41D7_F61C5FDC443D",
  "this.overlay_ED468E45_CD3D_3DF7_41E2_F95CFD8FEB8B"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_t.jpg",
 "label": "D4",
 "id": "panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DAC83306_D797_E23B_41E3_FCB459635D16",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.18,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_C787D1B2_D797_DE5A_41A2_68B1DE4C9657",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.14,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -16.41,
   "backwardYaw": 0.25,
   "distance": 1,
   "panorama": "this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 152.63,
   "backwardYaw": -38.25,
   "distance": 1,
   "panorama": "this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -163.7,
   "backwardYaw": 1.72,
   "distance": 1,
   "panorama": "this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.1,
   "backwardYaw": -154.76,
   "distance": 1,
   "panorama": "this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D6C3BB32_CD15_DBAD_41D1_62F30CE5A327",
  "this.overlay_D537CF20_CD14_FBAE_41BE_C6EA8E2D0290",
  "this.overlay_D4FF7358_CD17_2B9D_41DD_EEFFD4F51339",
  "this.overlay_D70A726A_CD13_25BD_419A_CF8591D41AEC",
  "this.overlay_D03D565E_CD0D_ED95_41E2_B8C41A02BE30",
  "this.overlay_EDCE344A_CD0F_2DFD_41E8_C4474F6C927C"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_t.jpg",
 "label": "D1",
 "id": "panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D88FAF8C_D797_A24F_41EA_63F4C56BAA9A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -66.3,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -146.34,
   "backwardYaw": 55.12,
   "distance": 1,
   "panorama": "this.panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 113.7,
   "backwardYaw": -161.33,
   "distance": 1,
   "panorama": "this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E7751B68_CD1C_DBBD_41DF_9453EBDF6F72",
  "this.overlay_E02F87B4_CD1D_6A93_41E0_37842272FE3C"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_t.jpg",
 "label": "G2",
 "id": "panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DAAFDC29_D797_A676_41E2_4ECD5EA29755",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.75,
  "pitch": 0
 }
},
{
 "class": "MediaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_C5CCA77C_D72D_0C87_41E2_970B092FC720.mp3",
  "oggUrl": "media/audio_C5CCA77C_D72D_0C87_41E2_970B092FC720.ogg"
 },
 "id": "audio_C5CCA77C_D72D_0C87_41E2_970B092FC720",
 "data": {
  "label": "Wild West"
 },
 "autoplay": true
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 140.14,
   "backwardYaw": 129.12,
   "distance": 1,
   "panorama": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.25,
   "backwardYaw": -16.41,
   "distance": 1,
   "panorama": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_EC7E65C0_CD34_EEEE_41E1_A67A2B55D3BB",
  "this.overlay_EC9CA29B_CD37_2A93_41D1_C853CC2D47F0",
  "this.overlay_EC949294_CD37_6A96_41CF_06093517A25B",
  "this.overlay_EE2031F8_CD35_269D_4193_7061083DD6AA"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_t.jpg",
 "label": "E3",
 "id": "panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 91.66,
   "backwardYaw": -173.19,
   "distance": 1,
   "panorama": "this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_EBBCE18C_CD13_6775_41D3_16A9D2848406"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_t.jpg",
 "label": "E2",
 "id": "panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C396E8BA_CD13_E69D_41B9_97455311D726_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DAED4CAA_D797_A64A_41E4_65746AB2715F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.26,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DAFC8CC2_D797_A63B_41CA_4F0F5F513384",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.67,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DADBFC93_D797_A659_41B0_25C44341F38E",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -50.93,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 129.07,
   "backwardYaw": -170.97,
   "distance": 1,
   "panorama": "this.panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_EB9BD403_CD15_6D72_41CA_2EB295412014"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_t.jpg",
 "label": "E8",
 "id": "panorama_C04DE176_CD37_2795_41C4_2A238F646BD6",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D8F33091_D797_DE56_41D0_EEDA1B2D8BC8",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 163.59,
  "pitch": 0
 }
},
{
 "class": "PanoramaPlayer",
 "buttonCardboardView": "this.IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553",
 "displayPlaybackBar": true,
 "gyroscopeVerticalDraggingEnabled": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "gyroscopeEnabled": true,
 "mouseControlMode": "drag_acceleration"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -152.53,
   "backwardYaw": 2.99,
   "distance": 1,
   "panorama": "this.panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -0.31,
   "backwardYaw": 177,
   "distance": 1,
   "panorama": "this.panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DCDC175D_CDF3_6B96_41CD_E0AD0E5D7774",
  "this.overlay_F9F4A938_CD0D_279D_41DB_9094DEF36E03"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_t.jpg",
 "label": "A3",
 "id": "panorama_DC61E73A_CD35_2B92_41E8_B023F2407848",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D918EE8A_D797_A24B_41DE_DF4174F19073",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.03,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DA0E7CD5_D797_A7D9_41DF_93F9DE11BACC",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -41.82,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D9A78DDD_D797_A1C9_41DA_C05B83B2AB6D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 68.1,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 74.64,
   "backwardYaw": -56.47,
   "distance": 1,
   "panorama": "this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DE4A6E00_CDF3_7D6E_41D1_E739983685E2"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_t.jpg",
 "label": "B3",
 "id": "panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D80310AC_D797_DE4F_41E7_F564FF1C6EC0",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.01,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D94B9F00_D797_A237_41E0_7DFF9D74AB0C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.52,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D82260DA_D797_DFCB_41CB_677FF891C2F4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.48,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DA999C06_D797_A63B_41D2_88C1737BE3B1",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 123.53,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D9D7AE20_D797_A277_41E4_78A30C0F0FDD",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -61.22,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D93B2ED9_D797_A3D6_41E3_2064407E4BEB",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -70.11,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D854A152_D797_DEDA_41CD_A72177F568C2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.21,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 138.18,
   "backwardYaw": -120.59,
   "distance": 1,
   "panorama": "this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -3.56,
   "backwardYaw": 30.17,
   "distance": 1,
   "panorama": "this.panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -58.26,
   "backwardYaw": 93.86,
   "distance": 1,
   "panorama": "this.panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DA13B618_CD1C_ED9E_41BD_E15942AA3E9A",
  "this.overlay_DB405DB5_CD1D_3E97_41D7_93879D43059F",
  "this.overlay_FDFE9AFD_CD13_DA96_41E8_BCF36D0FA69A",
  "this.overlay_FF0D9466_CD15_2DB5_41DD_8A2A223E5E28"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_t.jpg",
 "label": "C2",
 "id": "panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D9856DA2_D797_A67B_41E9_ACE4C304C9B5",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -98.31,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DAA4427B_D797_E2CA_41D1_78A6E2709C19",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 59.41,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -178.52,
   "backwardYaw": -5.85,
   "distance": 1,
   "panorama": "this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 6.33,
   "backwardYaw": 144.1,
   "distance": 1,
   "panorama": "this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -73.39,
   "backwardYaw": 93.09,
   "distance": 1,
   "panorama": "this.panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D819B48B_CD13_2D73_41E0_4F94AEA0CC2B",
  "this.overlay_D8619C63_CD15_5DB2_41DE_9C5F8BE22A48",
  "this.overlay_FFCBD57B_CD1D_EF93_41DC_E84809498E98"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_t.jpg",
 "label": "B5",
 "id": "panorama_C02819F3_CD15_6693_41E1_198D446E07D1",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D9066E60_D797_A2F6_41E9_681F59B87AD7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 18.67,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 118.78,
   "backwardYaw": -169.79,
   "distance": 1,
   "panorama": "this.panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E858840A_CD17_2D7D_41C6_A5CB68A5A496"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_t.jpg",
 "label": "E6",
 "id": "panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D928AEB4_D797_A25F_41E1_1BB431AC6F80",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.89,
  "pitch": 0
 }
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_C396E8BA_CD13_E69D_41B9_97455311D726",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C396E8BA_CD13_E69D_41B9_97455311D726_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_DC61E73A_CD35_2B92_41E8_B023F2407848",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "media": "this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "media": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "media": "this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "media": "this.panorama_C04DE176_CD37_2795_41C4_2A238F646BD6",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "media": "this.panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "media": "this.panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "media": "this.panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "media": "this.panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 0)",
   "media": "this.panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_camera"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DA1E2CEC_D797_A7CF_41E3_D0A4B42E96E2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -27.37,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D96CEF42_D797_A23A_41E7_D7E66AC8CA32",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.44,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DAB0DC43_D797_A639_41EA_40F5F6106AA1",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 141.75,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D9F60E4A_D797_A2CA_41D0_08EDDDF24DDA",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -124.88,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 93.09,
   "backwardYaw": -73.39,
   "distance": 1,
   "panorama": "this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 178.66,
   "backwardYaw": -1.82,
   "distance": 1,
   "panorama": "this.panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_EAE28105_CD13_6777_41E4_937F450979CA",
  "this.overlay_FFA8DEDA_CD37_7A92_41DD_345F3766ADB6"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_t.jpg",
 "label": "F2",
 "id": "panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DAC5EC60_D797_A6F6_41C1_A3045DBE0A3C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.28,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D83230F1_D797_DFD6_41D3_A9914D223486",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -90.81,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D9093E72_D797_A2DA_41E9_3828C3BDBFA6",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -39.86,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -154.76,
   "backwardYaw": 1.1,
   "distance": 1,
   "panorama": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.48,
   "backwardYaw": 176.81,
   "distance": 1,
   "panorama": "this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -64.5,
   "backwardYaw": 1.86,
   "distance": 1,
   "panorama": "this.panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D6C069C2_CD0D_26ED_41C7_F22AEA8EA7BA",
  "this.overlay_D164B287_CD33_2572_41D1_1D9A319D6AA6",
  "this.overlay_D167E4BD_CD35_2E97_41D2_1A41ED7E4DA6",
  "this.overlay_D028FA36_CD37_E595_41A5_0FD9B7051E35",
  "this.overlay_D0E749F4_CD35_2695_41DA_F5615DBA045D",
  "this.overlay_D0DC241A_CD35_6D92_41E9_797F938BAAFC"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_t.jpg",
 "label": "D2",
 "id": "panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DAB512C7_D797_E23A_41C6_7BC86E60EFE6",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -88.34,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "displayMovements": [
  {
   "class": "TargetRotationalCameraDisplayMovement",
   "duration": 1000,
   "easing": "linear"
  },
  {
   "class": "TargetRotationalCameraDisplayMovement",
   "duration": 3000,
   "easing": "cubic_in_out",
   "targetPitch": -17.82,
   "targetStereographicFactor": 0
  }
 ],
 "automaticZoomSpeed": 10,
 "displayOriginPosition": {
  "class": "RotationalCameraDisplayPosition",
  "yaw": -2.12,
  "stereographicFactor": 1,
  "hfov": 165,
  "pitch": -90
 },
 "id": "panorama_C02819F3_CD15_6693_41E1_198D446E07D1_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -2.12,
  "pitch": -17.82
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D8AFFFD6_D797_A1DA_41DF_4CF97831AD26",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.92,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -173.19,
   "backwardYaw": 91.66,
   "distance": 1,
   "panorama": "this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.72,
   "backwardYaw": -163.7,
   "distance": 1,
   "panorama": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_ECBA83D6_CD33_2A95_41D9_3561F4960735",
  "this.overlay_EC800645_CD33_2DF6_41D1_7C38B0687344",
  "this.overlay_EC355F66_CD35_FBB5_41CB_EF9F1C5737D1"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_t.jpg",
 "label": "E1",
 "id": "panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D97D3F66_D797_A2FB_41C3_AF3BC610EF76",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 51.07,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -128.93,
   "backwardYaw": -58.99,
   "distance": 1,
   "panorama": "this.panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 55.12,
   "backwardYaw": -146.34,
   "distance": 1,
   "panorama": "this.panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_E11E375B_CD1C_EB92_41CB_CF97D2EB1D6E",
  "this.overlay_E23CB5D9_CD1F_2E9F_41B4_48F6E2E4C451"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_t.jpg",
 "label": "G1",
 "id": "panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DAC5D2F1_D797_E3D9_41E5_8D9B5DA710E7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 106.61,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D8D08053_D797_DED9_41CA_B4754CB02DA4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 6.81,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DA21CD01_D797_A639_41DA_1575A43941D6",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 112.14,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D9C64E0B_D797_A249_41D6_A8383346DDE7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D8C1A038_D797_DE56_419F_A71D06202F60",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.74,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_D9B66DF1_D797_A1D9_41BA_E0406EAE3565",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.01,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DAAE0295_D797_E259_41E9_6342AC03EA1F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.83,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -56.47,
   "backwardYaw": 74.64,
   "distance": 1,
   "panorama": "this.panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.52,
   "backwardYaw": 177.09,
   "distance": 1,
   "panorama": "this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 171.13,
   "backwardYaw": 81.69,
   "distance": 1,
   "panorama": "this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DEEDEC2C_CDFC_DDB6_41E8_20B4EECEDC70",
  "this.overlay_DB866E3C_CDF4_DD96_41E7_6C97D81100F2",
  "this.overlay_FD2BB190_CD17_276E_41E2_6283FE2E2C22"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_t.jpg",
 "label": "B2",
 "id": "panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -5.85,
   "backwardYaw": -178.52,
   "distance": 1,
   "panorama": "this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -67.86,
   "backwardYaw": 89.19,
   "distance": 1,
   "panorama": "this.panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 177.09,
   "backwardYaw": -2.52,
   "distance": 1,
   "panorama": "this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_D8E211D6_CD0D_2695_41E0_B9D142A13C7A",
  "this.overlay_D9F51375_CD0D_2B96_41B4_245A5B221587",
  "this.overlay_E213A9A2_CD14_E6B2_41E0_1E4C6AFBDBE2"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_t.jpg",
 "label": "B4",
 "id": "panorama_C02686FD_CD15_2A96_41BF_099642BC426D",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -148.74,
   "backwardYaw": 0.11,
   "distance": 1,
   "panorama": "this.panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04DE176_CD37_2795_41C4_2A238F646BD6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -23.75,
   "backwardYaw": 109.89,
   "distance": 1,
   "panorama": "this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 176.81,
   "backwardYaw": -2.48,
   "distance": 1,
   "panorama": "this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_EEB1052B_CD3D_EFB2_41D0_92351AA35E3D",
  "this.overlay_D2284119_CD3F_279F_41E2_46F354F401C6",
  "this.overlay_EFE23B61_CD3C_DBAF_41C3_83AC9B5A40BD",
  "this.overlay_FFB1B509_CD0D_6F7F_41C1_8C992809860A"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_t.jpg",
 "label": "D3",
 "id": "panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DA952238_D797_E256_41E3_10CF5387C83A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.15,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DA91C24D_D797_E2CE_4199_39501AABDCDA",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -35.9,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D8779195_D797_DE5E_41E1_724B63E6A935",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.19,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DAAAA2A9_D797_E249_4191_1180F0CE866C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.14,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -111.9,
   "backwardYaw": 100.16,
   "distance": 1,
   "panorama": "this.panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_C2761F01_CD17_3B6F_41E0_D4EA77D7B27E"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_t.jpg",
 "label": "A2",
 "id": "panorama_C396E8BA_CD13_E69D_41B9_97455311D726",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 120,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D8E08077_D797_DEDA_41B7_CF021FC5DD43",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -50.88,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DA9B3268_D797_E2F6_41DA_7BD541833523",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.91,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -88.68,
   "backwardYaw": 4.08,
   "distance": 1,
   "panorama": "this.panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 81.69,
   "backwardYaw": 171.13,
   "distance": 1,
   "panorama": "this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DC63304D_CDFF_25F6_41B4_54C2D665392C",
  "this.overlay_DE310BD7_CDFD_5A92_41E3_28E65627012A"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_t.jpg",
 "label": "B1",
 "id": "panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -169.79,
   "backwardYaw": 118.78,
   "distance": 1,
   "panorama": "this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04DE176_CD37_2795_41C4_2A238F646BD6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.86,
   "backwardYaw": -64.5,
   "distance": 1,
   "panorama": "this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_EE9AAB03_CD33_3B73_41DF_0C1717B4C5B5",
  "this.overlay_EE62390A_CD33_2772_4143_215627099ACC",
  "this.overlay_EE65AD73_CD33_5F92_41E1_88E67DB6B628",
  "this.overlay_EEE0081D_CD0D_E597_41D5_6CC61348DAF3"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_t.jpg",
 "label": "E5",
 "id": "panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 89.19,
   "backwardYaw": -67.86,
   "distance": 1,
   "panorama": "this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.82,
   "backwardYaw": 178.66,
   "distance": 1,
   "panorama": "this.panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_EBE60163_CD15_27B3_41E0_41ACBB5FDA90",
  "this.overlay_E507EDFE_CD14_DE92_41C7_11492C5F5141"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_t.jpg",
 "label": "F1",
 "id": "panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_D95A0F1D_D797_A249_41CC_B441ABAC6EC7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -79.84,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D8BE4001_D797_DE36_41E8_27184C94ED18",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -8.87,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D813E0C4_D797_DE3F_41D6_8532A7EBA961",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 33.66,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DA404D34_D797_A65F_41E3_6E6C110653C1",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.69,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D9E7FE39_D797_A256_41C5_CEBB293671FE",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 115.5,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -170.97,
   "backwardYaw": 129.07,
   "distance": 1,
   "panorama": "this.panorama_C04DE176_CD37_2795_41C4_2A238F646BD6"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.11,
   "backwardYaw": -148.74,
   "distance": 1,
   "panorama": "this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_EE4AD47B_CD0C_ED93_41E9_13D909F7AFD7",
  "this.overlay_E9D20B4E_CD0F_5BF2_41E8_F2C0F691F10F",
  "this.overlay_E8F88F8C_CD0F_3B75_41D6_ADBE0DE3C7C7",
  "this.overlay_E9411C59_CD0D_5D9F_41E8_E060EDC14993"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_t.jpg",
 "label": "E7",
 "id": "panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 177,
   "backwardYaw": -0.31,
   "distance": 1,
   "panorama": "this.panorama_DC61E73A_CD35_2B92_41E8_B023F2407848"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 4.08,
   "backwardYaw": -88.68,
   "distance": 1,
   "panorama": "this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DCD94C39_CDFC_DD9E_41E4_B020805A770F",
  "this.overlay_FFFB37EB_CD13_6AB3_41DD_14B05BA1E999"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_t.jpg",
 "label": "A4",
 "id": "panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DA529D50_D797_A6D6_41DF_1B2422CC8CA7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 91.32,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C02686FD_CD15_2A96_41BF_099642BC426D_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 144.1,
   "backwardYaw": 6.33,
   "distance": 1,
   "panorama": "this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -120.59,
   "backwardYaw": 138.18,
   "distance": 1,
   "panorama": "this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -38.25,
   "backwardYaw": 152.63,
   "distance": 1,
   "panorama": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D"
  }
 ],
 "class": "Panorama",
 "vfov": 180,
 "overlays": [
  "this.overlay_DB8153DA_CD15_6A9D_41DB_FCF6C8F1B7BC",
  "this.overlay_D6AA87DA_CD14_EA9D_41C7_0860D5BE86F2",
  "this.overlay_FD77C876_CD1F_2595_41D8_A94CBE7A51F1",
  "this.overlay_FF47E5FE_CD1D_2E95_41E8_4FB9618F3319",
  "this.overlay_F9924519_CD33_6F9E_41CE_FA944049BCC1"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_t.jpg",
 "label": "C1",
 "id": "panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA",
 "partial": false,
 "frames": [
  {
   "back": {
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/b/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/f/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/u/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/r/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_t.jpg",
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/d/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "tags": "ondemand",
      "width": 4608,
      "height": 4608,
      "colCount": 9
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "tags": "ondemand",
      "width": 2560,
      "height": 2560,
      "colCount": 5
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/l/4/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "height": 512,
      "colCount": 1
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_D9950DC7_D797_A63A_41E8_D988331AC83A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 27.47,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "id": "camera_DA754D8A_D797_A64B_41E3_06AE7AA545EA",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -2.91,
  "pitch": 0
 }
},
{
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarOpacity": 1,
 "id": "MainViewer",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarOpacity": 1,
 "data": {
  "name": "Main Viewer"
 },
 "vrPointerColor": "#FFFFFF",
 "width": "100%",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 6,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "paddingBottom": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "borderSize": 0,
 "minHeight": 50,
 "transitionMode": "blending",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "paddingRight": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "minWidth": 100,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "height": "100%",
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "class": "ViewerArea",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "toolTipBorderColor": "#767676",
 "playbackBarHeadHeight": 15,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "displayTooltipInTouchScreens": true,
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "3vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "paddingTop": 0,
 "toolTipFontWeight": "bold",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Century Gothic",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "shadow": false,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "progressBottom": 0
},
{
 "bottom": "0%",
 "paddingTop": 0,
 "id": "Container_DFBEBB79_D24C_4407_41E5_791C5C15FA37",
 "left": "0%",
 "children": [
  "this.IconButton_DC3F8679_D234_4C07_41D8_DB36DE3118CE",
  "this.Image_DFBAE108_D254_4405_41DF_83304E52EBA3",
  "this.IconButton_DEA46DEC_D23C_5C1C_41E6_80DD00D0C298",
  "this.Image_C34DE4F0_D735_0D9F_41E6_51255C606DC2"
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "width": "100%",
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "borderSize": 0,
 "minHeight": 1,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "14.674%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "overflow": "scroll",
 "minWidth": 1,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "gap": 10,
 "scrollBarColor": "#000000",
 "layout": "absolute",
 "shadow": false,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Container7465"
 }
},
{
 "paddingTop": 0,
 "id": "Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC",
 "left": "0%",
 "right": "0%",
 "children": [
  "this.Container_AD0DD7F8_BA53_6FC4_41DD_56889CF94F5F",
  "this.IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553"
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingBottom": 0,
 "borderSize": 0,
 "height": "12.832%",
 "propagateClick": true,
 "paddingRight": 0,
 "overflow": "visible",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "verticalAlign": "top",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "gap": 10,
 "scrollBarColor": "#000000",
 "visible": false,
 "layout": "absolute",
 "shadow": false,
 "bottom": "0%",
 "data": {
  "name": "--- MENU"
 },
 "backgroundImageUrl": "skin/Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC.png"
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EA4707A2_CD1D_6AAD_41E3_A8C2A074C3FA",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 20,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.86,
   "hfov": 14.08,
   "pitch": -12.41
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.08,
   "distance": 50,
   "pitch": -12.41,
   "yaw": 93.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 560,
      "height": 442
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D, this.camera_D8C1A038_D797_DE56_419F_A71D06202F60); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DDE24B65_CD14_DBB7_41DA_3E16F5EFE2DD",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 100.16,
   "hfov": 16.64,
   "pitch": -15.89
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_E3C3123A_CD73_2592_41C3_3E29EFCA307D",
   "pitch": -15.89,
   "yaw": 100.16,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.64,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C396E8BA_CD13_E69D_41B9_97455311D726, this.camera_D9A78DDD_D797_A1C9_41DA_C05B83B2AB6D); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DCFF6228_CD0D_25BD_41E4_6DDC75178522",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.99,
   "hfov": 12.24,
   "pitch": -19.49
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_E3C3F23B_CD73_2592_41C0_AD5629619316",
   "pitch": -19.49,
   "yaw": 2.99,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.24,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_DC61E73A_CD35_2B92_41E8_B023F2407848, this.camera_D9950DC7_D797_A63A_41E8_D988331AC83A); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_E82AF9A1_CD17_E6AE_41D7_C79DCD7172A3",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 21,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 129.12,
   "hfov": 16.75,
   "pitch": -27.03
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.75,
   "distance": 50,
   "pitch": -27.03,
   "yaw": 129.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 731,
      "height": 549
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0, this.camera_D9093E72_D797_A2DA_41E9_3828C3BDBFA6); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D5BA5D11_CD1D_3F6E_41BD_4C4140C6C63A",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90.88,
   "hfov": 7.54,
   "pitch": -3
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.54,
   "distance": 50,
   "pitch": -3,
   "yaw": 90.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 293,
      "height": 325
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DA7FC03C_CD13_2596_41E4_6944479945FB",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.99,
   "hfov": 13.95,
   "pitch": -9.37
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47EC209_CD3D_257F_41B7_C3A88FD154C3",
   "pitch": -9.37,
   "yaw": -58.99,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.95,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 02b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9, this.camera_D97D3F66_D797_A2FB_41C3_AF3BC610EF76); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_FF5E42A2_CD17_2AB2_41B2_3577077EBD70",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 30.17,
   "hfov": 14.35,
   "pitch": -23.54
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47E3209_CD3D_257F_41E2_CB9535BB0ED1",
   "pitch": -23.54,
   "yaw": 30.17,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.35,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D, this.camera_D96CEF42_D797_A23A_41E7_D7E66AC8CA32); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_ED3F433D_CD3D_EB97_41D7_F61C5FDC443D",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 109.89,
   "hfov": 23.43,
   "pitch": -22.34
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FF6D0116_CD13_6795_41E6_CC5CBA5A4A5A",
   "pitch": -22.34,
   "yaw": 109.89,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 23.43,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB, this.camera_D89F5FAF_D797_A249_41D1_C74629CAF74C); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_ED468E45_CD3D_3DF7_41E2_F95CFD8FEB8B",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -161.33,
   "hfov": 22.6,
   "pitch": -23.83
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FF6EB116_CD13_6795_41E5_A0B2801A1ED1",
   "pitch": -23.83,
   "yaw": -161.33,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 22.6,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18, this.camera_D88FAF8C_D797_A24F_41EA_63F4C56BAA9A); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D6C3BB32_CD15_DBAD_41D1_62F30CE5A327",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -163.7,
   "hfov": 14.3,
   "pitch": -32.33
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F479920A_CD3D_257D_41DA_05C2C57BE6C6",
   "pitch": -32.33,
   "yaw": -163.7,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.3,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D, this.camera_DAC5EC60_D797_A6F6_41C1_A3045DBE0A3C); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D537CF20_CD14_FBAE_41BE_C6EA8E2D0290",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 20
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -115.57,
   "hfov": 10.27,
   "pitch": -3.69
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.27,
   "distance": 50,
   "pitch": -3.69,
   "yaw": -115.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 400,
      "height": 506
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D4FF7358_CD17_2B9D_41DD_EEFFD4F51339",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.1,
   "hfov": 15.36,
   "pitch": -29.5
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F479320A_CD3D_257D_41E8_6FCC3D93E73A",
   "pitch": -29.5,
   "yaw": 1.1,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.36,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007, this.camera_DAC96C77_D797_A6D9_41E5_907C17D37F0C); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D70A726A_CD13_25BD_419A_CF8591D41AEC",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 152.63,
   "hfov": 16.67,
   "pitch": -30.34
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F478B20A_CD3D_257D_41D5_E394041989B7",
   "pitch": -30.34,
   "yaw": 152.63,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.67,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 05a Right-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA, this.camera_DAB0DC43_D797_A639_41EA_40F5F6106AA1); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D03D565E_CD0D_ED95_41E2_B8C41A02BE30",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.65,
   "hfov": 7.26,
   "pitch": -3.93
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.26,
   "distance": 50,
   "pitch": -3.93,
   "yaw": -58.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 282,
      "height": 314
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EDCE344A_CD0F_2DFD_41E8_C4474F6C927C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -16.41,
   "hfov": 12.13,
   "pitch": -17.91
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F478520A_CD3D_257D_41DF_7C8CDAF99AE7",
   "pitch": -17.91,
   "yaw": -16.41,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.13,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 05a Left"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0, this.camera_DAAFDC29_D797_A676_41E2_4ECD5EA29755); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_E7751B68_CD1C_DBBD_41DF_9453EBDF6F72",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -146.34,
   "hfov": 15.39,
   "pitch": -20.18
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F44D621D_CD3D_2597_41D8_577DC0365F7B",
   "pitch": -20.18,
   "yaw": -146.34,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.39,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9, this.camera_D9F60E4A_D797_A2CA_41D0_08EDDDF24DDA); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_E02F87B4_CD1D_6A93_41E0_37842272FE3C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 113.7,
   "hfov": 18.34,
   "pitch": -35.7
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F44CE21D_CD3D_2597_4151_470DC102F8D2",
   "pitch": -35.7,
   "yaw": 113.7,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.34,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2, this.camera_D9066E60_D797_A2F6_41E9_681F59B87AD7); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EC7E65C0_CD34_EEEE_41E1_A67A2B55D3BB",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 15,
      "height": 18
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 140.14,
   "hfov": 12.88,
   "pitch": -9.01
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.88,
   "distance": 50,
   "pitch": -9.01,
   "yaw": 140.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 506,
      "height": 570
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652, this.camera_D8E08077_D797_DEDA_41B7_CF021FC5DD43); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EC9CA29B_CD37_2A93_41D1_C853CC2D47F0",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.25,
   "hfov": 14.77,
   "pitch": -30.23
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F4442213_CD3D_2593_41E7_BF1A8C7CB0A3",
   "pitch": -30.23,
   "yaw": 0.25,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.77,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B, this.camera_D8F33091_D797_DE56_41D0_EEDA1B2D8BC8); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EC949294_CD37_6A96_41CF_06093517A25B",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -107.3,
   "hfov": 11.12,
   "pitch": -1.53
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.12,
   "distance": 50,
   "pitch": -1.53,
   "yaw": -107.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 432,
      "height": 357
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EE2031F8_CD35_269D_4193_7061083DD6AA",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 107.5,
   "hfov": 7.81,
   "pitch": -3.41
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.81,
   "distance": 50,
   "pitch": -3.41,
   "yaw": 107.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 304,
      "height": 282
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EBBCE18C_CD13_6775_41D3_16A9D2848406",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 91.66,
   "hfov": 16.6,
   "pitch": -32.24
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.6,
   "distance": 50,
   "pitch": -32.24,
   "yaw": 91.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 763,
      "height": 624
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D, this.camera_D8D08053_D797_DED9_41CA_B4754CB02DA4); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EB9BD403_CD15_6D72_41CA_2EB295412014",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 129.07,
   "hfov": 17.74,
   "pitch": -25.38
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.74,
   "distance": 50,
   "pitch": -25.38,
   "yaw": 129.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 763,
      "height": 624
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878, this.camera_D918EE8A_D797_A24B_41DE_DF4174F19073); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "paddingTop": 0,
 "id": "IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553",
 "width": 49,
 "maxWidth": 49,
 "right": 30,
 "maxHeight": 37,
 "horizontalAlign": "center",
 "transparencyActive": true,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "height": 37,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553_rollover.png",
 "borderSize": 0,
 "minHeight": 1,
 "propagateClick": true,
 "paddingRight": 0,
 "mode": "push",
 "minWidth": 1,
 "iconURL": "skin/IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553.png",
 "verticalAlign": "middle",
 "class": "IconButton",
 "paddingLeft": 0,
 "shadow": false,
 "bottom": 8,
 "cursor": "hand",
 "data": {
  "name": "IconButton VR"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DCDC175D_CDF3_6B96_41CD_E0AD0E5D7774",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.31,
   "hfov": 26.58,
   "pitch": -18.33
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C2064ECC_D24C_FC1D_41D3_79CA12E43C60",
   "pitch": -18.33,
   "yaw": -0.31,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 26.58,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_F9F4A938_CD0D_279D_41DB_9094DEF36E03",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -152.53,
   "hfov": 26.05,
   "pitch": -36.22
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C2062ECC_D24C_FC1D_41DD_35A8C7033864",
   "pitch": -36.22,
   "yaw": -152.53,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 26.05,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 02a Left-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6, this.camera_D9B66DF1_D797_A1D9_41BA_E0406EAE3565); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DE4A6E00_CDF3_7D6E_41D1_E739983685E2",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 74.64,
   "hfov": 19.6,
   "pitch": -33.89
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F470E200_CD3D_256D_41E2_E8D7267AE78C",
   "pitch": -33.89,
   "yaw": 74.64,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 19.6,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E, this.camera_DA999C06_D797_A63B_41D2_88C1737BE3B1); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DA13B618_CD1C_ED9E_41BD_E15942AA3E9A",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.56,
   "hfov": 20.36,
   "pitch": -30.73
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47CE208_CD3D_257D_41D4_8BA17A3F932C",
   "pitch": -30.73,
   "yaw": -3.56,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 20.36,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF, this.camera_DAAE0295_D797_E259_41E9_6342AC03EA1F); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DB405DB5_CD1D_3E97_41D7_93879D43059F",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.26,
   "hfov": 8.08,
   "pitch": -3.81
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.08,
   "distance": 50,
   "pitch": -3.81,
   "yaw": -58.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 314,
      "height": 293
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93, this.camera_DAAAA2A9_D797_E249_4191_1180F0CE866C); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_FDFE9AFD_CD13_DA96_41E8_BCF36D0FA69A",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 96.19,
   "hfov": 12.79,
   "pitch": -18.05
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47F8208_CD3D_257D_41D6_184DB51854D8",
   "pitch": -18.05,
   "yaw": 96.19,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.79,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_FF0D9466_CD15_2DB5_41DD_8A2A223E5E28",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 138.18,
   "hfov": 14.27,
   "pitch": -26.34
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47F0209_CD3D_257F_41D9_906412F2DED6",
   "pitch": -26.34,
   "yaw": 138.18,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.27,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA, this.camera_DAA4427B_D797_E2CA_41D1_78A6E2709C19); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D819B48B_CD13_2D73_41E0_4F94AEA0CC2B",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -73.39,
   "hfov": 11.12,
   "pitch": 0.58
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.12,
   "distance": 50,
   "pitch": 0.58,
   "yaw": -73.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 432,
      "height": 346
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405, this.camera_DA9B3268_D797_E2F6_41DA_7BD541833523); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D8619C63_CD15_5DB2_41DE_9C5F8BE22A48",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 44,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.33,
   "hfov": 29.96,
   "pitch": -32.22
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_C33ECEA7_D72D_1D81_41E8_28A1B8B967CB",
   "pitch": -32.22,
   "yaw": 6.33,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 29.96,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 05c Right-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA, this.camera_DA91C24D_D797_E2CE_4199_39501AABDCDA); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_FFCBD57B_CD1D_EF93_41DC_E84809498E98",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.52,
   "hfov": 23.29,
   "pitch": -28.52
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F472E202_CD3D_256D_41D9_215AA3A11723",
   "pitch": -28.52,
   "yaw": -178.52,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 23.29,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D, this.camera_DA952238_D797_E256_41E3_10CF5387C83A); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_E858840A_CD17_2D7D_41C6_A5CB68A5A496",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 20,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 118.78,
   "hfov": 16.65,
   "pitch": -31.97
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.65,
   "distance": 50,
   "pitch": -31.97,
   "yaw": 118.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 763,
      "height": 592
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30, this.camera_D854A152_D797_DEDA_41CD_A72177F568C2); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EAE28105_CD13_6777_41E4_937F450979CA",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.09,
   "hfov": 11.86,
   "pitch": -21.76
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.86,
   "distance": 50,
   "pitch": -21.76,
   "yaw": 93.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 496,
      "height": 410
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1, this.camera_DAC5D2F1_D797_E3D9_41E5_8D9B5DA710E7); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_FFA8DEDA_CD37_7A92_41DD_345F3766ADB6",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 178.66,
   "hfov": 19.43,
   "pitch": -23.64
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F442F21C_CD3D_2595_41E4_961F6A186A00",
   "pitch": -23.64,
   "yaw": 178.66,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 19.43,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69, this.camera_DAC83306_D797_E23B_41E3_FCB459635D16); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D6C069C2_CD0D_26ED_41C7_F22AEA8EA7BA",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -154.76,
   "hfov": 14.19,
   "pitch": -22.67
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47B920B_CD3D_2573_41E3_80F2EFA5779E",
   "pitch": -22.67,
   "yaw": -154.76,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.19,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 05b Left-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B, this.camera_D867E178_D797_DED7_41D8_0C210C893EFA); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D164B287_CD33_2572_41D1_1D9A319D6AA6",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -121.53,
   "hfov": 11.69,
   "pitch": -23.23
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47B020B_CD3D_2573_4179_FE2F8CFB9ECA",
   "pitch": -23.23,
   "yaw": -121.53,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.69,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 05a Right-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D167E4BD_CD35_2E97_41D2_1A41ED7E4DA6",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -64.5,
   "hfov": 15.48,
   "pitch": -29.82
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47B320B_CD3D_2573_41E7_1717215E3755",
   "pitch": -29.82,
   "yaw": -64.5,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.48,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 05b Left-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30, this.camera_C787D1B2_D797_DE5A_41A2_68B1DE4C9657); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D028FA36_CD37_E595_41A5_0FD9B7051E35",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.48,
   "hfov": 13.12,
   "pitch": -21.33
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47AA20B_CD3D_2573_41E8_6CE29BF16818",
   "pitch": -21.33,
   "yaw": -2.48,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.12,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB, this.camera_D8779195_D797_DE5E_41E1_724B63E6A935); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D0E749F4_CD35_2695_41DA_F5615DBA045D",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 18
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -121.28,
   "hfov": 7.81,
   "pitch": -3.53
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.81,
   "distance": 50,
   "pitch": -3.53,
   "yaw": -121.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 304,
      "height": 346
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D0DC241A_CD35_6D92_41E9_797F938BAAFC",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 20
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -78.16,
   "hfov": 8.08,
   "pitch": -3.41
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.08,
   "distance": 50,
   "pitch": -3.41,
   "yaw": -78.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 314,
      "height": 400
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_ECBA83D6_CD33_2A95_41D9_3561F4960735",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -173.19,
   "hfov": 14.99,
   "pitch": -18.24
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.99,
   "distance": 50,
   "pitch": -18.24,
   "yaw": -173.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 613,
      "height": 560
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805, this.camera_DAB512C7_D797_E23A_41C6_7BC86E60EFE6); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EC800645_CD33_2DF6_41D1_7C38B0687344",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.72,
   "hfov": 17.73,
   "pitch": -29.63
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F447C212_CD3D_2592_41D0_33BD56893ABA",
   "pitch": -29.63,
   "yaw": 1.72,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.73,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B, this.camera_DABD52DB_D797_E3C9_41D5_9AE95D1C71A8); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EC355F66_CD35_FBB5_41CB_EF9F1C5737D1",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -103.13,
   "hfov": 8.33,
   "pitch": -6.16
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.33,
   "distance": 50,
   "pitch": -6.16,
   "yaw": -103.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 325,
      "height": 325
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_E11E375B_CD1C_EB92_41CB_CF97D2EB1D6E",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 55.12,
   "hfov": 18.72,
   "pitch": -22.84
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F44DB21C_CD3D_2595_41BF_E8215D5CD180",
   "pitch": -22.84,
   "yaw": 55.12,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.72,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18, this.camera_D813E0C4_D797_DE3F_41D6_8532A7EBA961); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_E23CB5D9_CD1F_2E9F_41B4_48F6E2E4C451",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -128.93,
   "hfov": 19.07,
   "pitch": -22.15
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F44D221D_CD3D_2597_41DD_B5A9AA911B06",
   "pitch": -22.15,
   "yaw": -128.93,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 19.07,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF, this.camera_D80310AC_D797_DE4F_41E7_F564FF1C6EC0); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DEEDEC2C_CDFC_DDB6_41E8_20B4EECEDC70",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.52,
   "hfov": 15.85,
   "pitch": -18.82
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F4713200_CD3D_256D_41D0_A58FAFECF048",
   "pitch": -18.82,
   "yaw": -2.52,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.85,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D, this.camera_DA754D8A_D797_A64B_41E3_06AE7AA545EA); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DB866E3C_CDF4_DD96_41E7_6C97D81100F2",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -56.47,
   "hfov": 12.05,
   "pitch": -23.85
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F4709200_CD3D_256D_41D9_57C228FDAAC8",
   "pitch": -23.85,
   "yaw": -56.47,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.05,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 05b Left-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E, this.camera_DA62ED6B_D797_A6CA_41E9_8DBB65FD9737); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_FD2BB190_CD17_276E_41E2_6283FE2E2C22",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 171.13,
   "hfov": 15.28,
   "pitch": -29.95
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F470F200_CD3D_256D_41E3_2E06C75341AE",
   "pitch": -29.95,
   "yaw": 171.13,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.28,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3, this.camera_D9856DA2_D797_A67B_41E9_ACE4C304C9B5); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D8E211D6_CD0D_2695_41E0_B9D142A13C7A",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -5.85,
   "hfov": 19.83,
   "pitch": -29.5
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F4704201_CD3D_256F_41D1_2AB3CECBA269",
   "pitch": -29.5,
   "yaw": -5.85,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 19.83,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1, this.camera_D82260DA_D797_DFCB_41CB_677FF891C2F4); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D9F51375_CD0D_2B96_41B4_245A5B221587",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 23
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -67.86,
   "hfov": 8.37,
   "pitch": 0.46
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.37,
   "distance": 50,
   "pitch": 0.46,
   "yaw": -67.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 325,
      "height": 474
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69, this.camera_D83230F1_D797_DFD6_41D3_A9914D223486); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_E213A9A2_CD14_E6B2_41E0_1E4C6AFBDBE2",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 177.09,
   "hfov": 21.43,
   "pitch": -44.02
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F473E201_CD3D_256F_41B3_E5AB74E1AFC2",
   "pitch": -44.02,
   "yaw": 177.09,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 21.43,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E, this.camera_D844B124_D797_DE7E_41B1_93C2B53F1926); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EEB1052B_CD3D_EFB2_41D0_92351AA35E3D",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -148.74,
   "hfov": 11.57,
   "pitch": -31.32
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F4459211_CD3D_256F_41D3_CC8C04F2F45F",
   "pitch": -31.32,
   "yaw": -148.74,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.57,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 05a Right-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878, this.camera_D928AEB4_D797_A25F_41E1_1BB431AC6F80); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D2284119_CD3F_279F_41E2_46F354F401C6",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 21
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -111.17,
   "hfov": 6.98,
   "pitch": -4.91
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.98,
   "distance": 50,
   "pitch": -4.91,
   "yaw": -111.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 272,
      "height": 357
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EFE23B61_CD3C_DBAF_41C3_83AC9B5A40BD",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -23.75,
   "hfov": 11.51,
   "pitch": -31.81
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F4453212_CD3D_256D_41DF_FFFEEDAAD411",
   "pitch": -31.81,
   "yaw": -23.75,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.51,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 05a Right-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2, this.camera_D93B2ED9_D797_A3D6_41E3_2064407E4BEB); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_FFB1B509_CD0D_6F7F_41C1_8C992809860A",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.81,
   "hfov": 20.94,
   "pitch": -35.13
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F4448212_CD3D_256D_41D4_30929D47D878",
   "pitch": -35.13,
   "yaw": 176.81,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 20.94,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007, this.camera_D94B9F00_D797_A237_41E0_7DFF9D74AB0C); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_C2761F01_CD17_3B6F_41E0_D4EA77D7B27E",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -111.9,
   "hfov": 15.09,
   "pitch": -15.41
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_E3C2C23A_CD73_2592_41E6_D9D1C712A701",
   "pitch": -15.41,
   "yaw": -111.9,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.09,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6, this.camera_D95A0F1D_D797_A249_41CC_B441ABAC6EC7); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DC63304D_CDFF_25F6_41B4_54C2D665392C",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.69,
   "hfov": 26.24,
   "pitch": -28.74
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47191FF_CD3D_2693_41DF_B3CE1C26AEF5",
   "pitch": -28.74,
   "yaw": 81.69,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 26.24,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E, this.camera_D8BE4001_D797_DE36_41E8_27184C94ED18); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DE310BD7_CDFD_5A92_41E3_28E65627012A",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -88.68,
   "hfov": 19.22,
   "pitch": -18.93
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F471D200_CD3D_256D_41E4_26387309BA6C",
   "pitch": -18.93,
   "yaw": -88.68,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 19.22,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C, this.camera_D8AFFFD6_D797_A1DA_41DF_4CF97831AD26); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EE9AAB03_CD33_3B73_41DF_0C1717B4C5B5",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.79,
   "hfov": 12.92,
   "pitch": -13.92
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.92,
   "distance": 50,
   "pitch": -13.92,
   "yaw": -169.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 517,
      "height": 464
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340, this.camera_D9D7AE20_D797_A277_41E4_78A30C0F0FDD); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EE62390A_CD33_2772_4143_215627099ACC",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -100.83,
   "hfov": 8.9,
   "pitch": -4.48
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.9,
   "distance": 50,
   "pitch": -4.48,
   "yaw": -100.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 346,
      "height": 336
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EE65AD73_CD33_5F92_41E1_88E67DB6B628",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 22
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 121.76,
   "hfov": 5.59,
   "pitch": -6.47
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.59,
   "distance": 50,
   "pitch": -6.47,
   "yaw": 121.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 218,
      "height": 304
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EEE0081D_CD0D_E597_41D5_6CC61348DAF3",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.86,
   "hfov": 19.16,
   "pitch": -40.14
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F4461214_CD3D_2595_41D4_8C0A6C847E60",
   "pitch": -40.14,
   "yaw": 1.86,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 19.16,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007, this.camera_D9E7FE39_D797_A256_41C5_CEBB293671FE); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EBE60163_CD15_27B3_41E0_41ACBB5FDA90",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 22,
      "height": 15
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 89.19,
   "hfov": 16.42,
   "pitch": -19.68
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.42,
   "distance": 50,
   "pitch": -19.68,
   "yaw": 89.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 677,
      "height": 474
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D, this.camera_DA21CD01_D797_A639_41DA_1575A43941D6); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_E507EDFE_CD14_DE92_41C7_11492C5F5141",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.82,
   "hfov": 17.34,
   "pitch": -25.57
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F443421C_CD3D_2595_41A5_5997A50E0359",
   "pitch": -25.57,
   "yaw": -1.82,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.34,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405, this.camera_DA305D1D_D797_A64E_41E3_179AFFF22713); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_EE4AD47B_CD0C_ED93_41E9_13D909F7AFD7",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.11,
   "hfov": 14.24,
   "pitch": -40.56
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F4467215_CD3D_2597_41D9_B63441101347",
   "pitch": -40.56,
   "yaw": 0.11,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.24,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB, this.camera_DAED4CAA_D797_A64A_41E4_65746AB2715F); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_E9D20B4E_CD0F_5BF2_41E8_F2C0F691F10F",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.97,
   "hfov": 11.48,
   "pitch": -10.35
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.48,
   "distance": 50,
   "pitch": -10.35,
   "yaw": -170.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 453,
      "height": 506
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C04DE176_CD37_2795_41C4_2A238F646BD6, this.camera_DADBFC93_D797_A659_41B0_25C44341F38E); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_E8F88F8C_CD0F_3B75_41D6_ADBE0DE3C7C7",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 120.85,
   "hfov": 8.34,
   "pitch": -5.25
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.34,
   "distance": 50,
   "pitch": -5.25,
   "yaw": 120.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 325,
      "height": 304
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_E9411C59_CD0D_5D9F_41E8_E060EDC14993",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.07,
   "hfov": 13.04,
   "pitch": -19.29
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F440821A_CD3D_259D_41E5_C505484C67A7",
   "pitch": -19.29,
   "yaw": -62.07,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.04,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 05a Left-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DCD94C39_CDFC_DD9E_41E4_B020805A770F",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.08,
   "hfov": 21.61,
   "pitch": -27.82
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47611FF_CD3D_2693_41E8_3CB9737127D7",
   "pitch": -27.82,
   "yaw": 4.08,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 21.61,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3, this.camera_DA529D50_D797_A6D6_41DF_1B2422CC8CA7); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_FFFB37EB_CD13_6AB3_41DD_14B05BA1E999",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 177,
   "hfov": 17.28,
   "pitch": -24.62
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_FDDBCECC_CD13_3AF5_41D9_011CD594562E",
   "pitch": -24.62,
   "yaw": 177,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.28,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_DC61E73A_CD35_2B92_41E8_B023F2407848, this.camera_DA404D34_D797_A65F_41E3_6E6C110653C1); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_DB8153DA_CD15_6A9D_41DB_FCF6C8F1B7BC",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -120.59,
   "hfov": 22.6,
   "pitch": -29.2
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F4723202_CD3D_256D_41CF_4050E8427314",
   "pitch": -29.2,
   "yaw": -120.59,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 22.6,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D, this.camera_DA0E7CD5_D797_A7D9_41DF_93F9DE11BACC); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_D6AA87DA_CD14_EA9D_41C7_0860D5BE86F2",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -38.25,
   "hfov": 14.2,
   "pitch": -36.86
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47DA202_CD3D_256D_41DB_A5102C1A2AEE",
   "pitch": -36.86,
   "yaw": -38.25,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.2,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B, this.camera_DA1E2CEC_D797_A7CF_41E3_D0A4B42E96E2); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_FD77C876_CD1F_2595_41D8_A94CBE7A51F1",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 18
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -50.24,
   "hfov": 8.07,
   "pitch": -5.04
  }
 ],
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.07,
   "distance": 50,
   "pitch": -5.04,
   "yaw": -50.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 314,
      "height": 368
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_FF47E5FE_CD1D_2E95_41E8_4FB9618F3319",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -31.03,
   "hfov": 14.66,
   "pitch": -21.35
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47D2202_CD3D_256D_41C4_4CFC23A388EB",
   "pitch": -21.35,
   "yaw": -31.03,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.66,
   "distance": 50
  }
 ],
 "data": {
  "label": "Arrow 05a Left-Up"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "id": "overlay_F9924519_CD33_6F9E_41CE_FA944049BCC1",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 144.1,
   "hfov": 15.49,
   "pitch": -29.77
  }
 ],
 "items": [
  {
   "image": "this.AnimatedImageResource_F47D7208_CD3D_257D_4181_A7AE1500829A",
   "pitch": -29.77,
   "yaw": 144.1,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.49,
   "distance": 100
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1, this.camera_DAFC8CC2_D797_A63B_41CA_4F0F5F513384); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "paddingTop": 0,
 "id": "IconButton_DC3F8679_D234_4C07_41D8_DB36DE3118CE",
 "width": 57.5,
 "maxWidth": 1000,
 "right": "7.24%",
 "maxHeight": 1000,
 "horizontalAlign": "center",
 "transparencyActive": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "height": 57.98,
 "paddingBottom": 0,
 "borderSize": 0,
 "minHeight": 1,
 "propagateClick": false,
 "paddingRight": 0,
 "click": "this.openLink('https://wa.me/9715921219', '_blank')",
 "mode": "push",
 "minWidth": 1,
 "iconURL": "skin/IconButton_DC3F8679_D234_4C07_41D8_DB36DE3118CE.png",
 "verticalAlign": "middle",
 "class": "IconButton",
 "paddingLeft": 0,
 "shadow": false,
 "bottom": "19.61%",
 "cursor": "hand",
 "data": {
  "name": "IconButton7186"
 }
},
{
 "paddingTop": 0,
 "id": "Image_DFBAE108_D254_4405_41DF_83304E52EBA3",
 "left": "0%",
 "maxWidth": 1345,
 "maxHeight": 891,
 "url": "skin/Image_DFBAE108_D254_4405_41DF_83304E52EBA3.jpg",
 "width": "12.653%",
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "top": "0%",
 "borderRadius": 0,
 "minHeight": 1,
 "paddingBottom": 0,
 "borderSize": 0,
 "height": "100%",
 "propagateClick": false,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "class": "Image",
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "shadow": false,
 "data": {
  "name": "Image7815"
 }
},
{
 "paddingTop": 0,
 "id": "IconButton_DEA46DEC_D23C_5C1C_41E6_80DD00D0C298",
 "width": 67,
 "maxWidth": 1000,
 "right": "1.68%",
 "maxHeight": 1000,
 "horizontalAlign": "center",
 "transparencyActive": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "height": 57.55,
 "paddingBottom": 0,
 "borderSize": 0,
 "minHeight": 1,
 "propagateClick": false,
 "paddingRight": 0,
 "click": "this.openLink('https://www.instagram.com/saran_architecture_co?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', '_blank')",
 "mode": "push",
 "minWidth": 1,
 "iconURL": "skin/IconButton_DEA46DEC_D23C_5C1C_41E6_80DD00D0C298.png",
 "verticalAlign": "middle",
 "class": "IconButton",
 "paddingLeft": 0,
 "shadow": false,
 "bottom": "20.99%",
 "cursor": "hand",
 "data": {
  "name": "IconButton5364"
 }
},
{
 "paddingTop": 0,
 "id": "Image_C34DE4F0_D735_0D9F_41E6_51255C606DC2",
 "left": "0%",
 "maxWidth": 1549,
 "maxHeight": 192,
 "url": "skin/Image_C34DE4F0_D735_0D9F_41E6_51255C606DC2.png",
 "width": "100%",
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "top": "11.88%",
 "borderRadius": 0,
 "minHeight": 1,
 "paddingBottom": 0,
 "borderSize": 0,
 "height": "75.248%",
 "propagateClick": false,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "class": "Image",
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "shadow": false,
 "data": {
  "name": "Image6623"
 }
},
{
 "data": {
  "name": "-button set container"
 },
 "paddingTop": 0,
 "id": "Container_AD0DD7F8_BA53_6FC4_41DD_56889CF94F5F",
 "left": "0%",
 "width": 1199,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "height": 51,
 "paddingBottom": 0,
 "minHeight": 1,
 "propagateClick": true,
 "borderSize": 0,
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "minWidth": 1,
 "verticalAlign": "middle",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "paddingLeft": 30,
 "scrollBarVisible": "rollOver",
 "gap": 10,
 "scrollBarColor": "#000000",
 "layout": "horizontal",
 "bottom": "0%",
 "shadow": false
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_E3C3123A_CD73_2592_41C3_3E29EFCA307D",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_E3C3F23B_CD73_2592_41C0_AD5629619316",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F47EC209_CD3D_257F_41B7_C3A88FD154C3",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F47E3209_CD3D_257F_41E2_CB9535BB0ED1",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_FF6D0116_CD13_6795_41E6_CC5CBA5A4A5A",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_FF6EB116_CD13_6795_41E5_A0B2801A1ED1",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F479920A_CD3D_257D_41DA_05C2C57BE6C6",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F479320A_CD3D_257D_41E8_6FCC3D93E73A",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F478B20A_CD3D_257D_41D5_E394041989B7",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 720,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F478520A_CD3D_257D_41DF_7C8CDAF99AE7",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F44D621D_CD3D_2597_41D8_577DC0365F7B",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F44CE21D_CD3D_2597_4151_470DC102F8D2",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F4442213_CD3D_2593_41E7_BF1A8C7CB0A3",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_C2064ECC_D24C_FC1D_41D3_79CA12E43C60",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_C2062ECC_D24C_FC1D_41DD_35A8C7033864",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F470E200_CD3D_256D_41E2_E8D7267AE78C",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F47CE208_CD3D_257D_41D4_8BA17A3F932C",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F47F8208_CD3D_257D_41D6_184DB51854D8",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F47F0209_CD3D_257F_41D9_906412F2DED6",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_C33ECEA7_D72D_1D81_41E8_28A1B8B967CB",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F472E202_CD3D_256D_41D9_215AA3A11723",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F442F21C_CD3D_2595_41E4_961F6A186A00",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F47B920B_CD3D_2573_41E3_80F2EFA5779E",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F47B020B_CD3D_2573_4179_FE2F8CFB9ECA",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F47B320B_CD3D_2573_41E7_1717215E3755",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F47AA20B_CD3D_2573_41E8_6CE29BF16818",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F447C212_CD3D_2592_41D0_33BD56893ABA",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F44DB21C_CD3D_2595_41BF_E8215D5CD180",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F44D221D_CD3D_2597_41DD_B5A9AA911B06",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F4713200_CD3D_256D_41D0_A58FAFECF048",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F4709200_CD3D_256D_41D9_57C228FDAAC8",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F470F200_CD3D_256D_41E3_2E06C75341AE",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F4704201_CD3D_256F_41D1_2AB3CECBA269",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F473E201_CD3D_256F_41B3_E5AB74E1AFC2",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F4459211_CD3D_256F_41D3_CC8C04F2F45F",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F4453212_CD3D_256D_41DF_FFFEEDAAD411",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F4448212_CD3D_256D_41D4_30929D47D878",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_E3C2C23A_CD73_2592_41E6_D9D1C712A701",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F47191FF_CD3D_2693_41DF_B3CE1C26AEF5",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F471D200_CD3D_256D_41E4_26387309BA6C",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F4461214_CD3D_2595_41D4_8C0A6C847E60",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F443421C_CD3D_2595_41A5_5997A50E0359",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F4467215_CD3D_2597_41D9_B63441101347",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F440821A_CD3D_259D_41E5_C505484C67A7",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F47611FF_CD3D_2693_41E8_3CB9737127D7",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_FDDBCECC_CD13_3AF5_41D9_011CD594562E",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F4723202_CD3D_256D_41CF_4050E8427314",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F47DA202_CD3D_256D_41DB_A5102C1A2AEE",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 24,
 "id": "AnimatedImageResource_F47D2202_CD3D_256D_41C4_4CFC23A388EB",
 "colCount": 4
},
{
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "frameCount": 21,
 "id": "AnimatedImageResource_F47D7208_CD3D_257D_4181_A7AE1500829A",
 "colCount": 4
}],
 "verticalAlign": "top",
 "class": "Player",
 "scrollBarOpacity": 0.5,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "mouseWheelEnabled": true,
 "scrollBarColor": "#000000",
 "vrPolyfillScale": 1,
 "gap": 10,
 "shadow": false,
 "data": {
  "name": "Player460"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
