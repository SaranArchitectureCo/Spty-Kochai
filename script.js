(function(){
    var script = {
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "scrollBarOpacity": 0.5,
 "vrPolyfillScale": 1,
 "children": [
  "this.MainViewer",
  "this.IconButton_DC3F8679_D234_4C07_41D8_DB36DE3118CE",
  "this.IconButton_DEA46DEC_D23C_5C1C_41E6_80DD00D0C298",
  "this.Image_DFBAE108_D254_4405_41DF_83304E52EBA3",
  "this.Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC",
  "this.Image_D645B935_D825_B891_41E8_7A86BDAF19E1"
 ],
 "scrollBarVisible": "rollOver",
 "start": "this.playAudioList([this.audio_C5CCA77C_D72D_0C87_41E2_970B092FC720]); this.init()",
 "width": "100%",
 "horizontalAlign": "left",
 "layout": "absolute",
 "defaultVRPointer": "laser",
 "scrollBarWidth": 10,
 "scripts": {
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "existsKey": function(key){  return key in window; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "unregisterKey": function(key){  delete window[key]; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "registerKey": function(key, value){  window[key] = value; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getKey": function(key){  return window[key]; }
 },
 "contentOpaque": false,
 "minHeight": 20,
 "backgroundPreloadEnabled": true,
 "borderRadius": 0,
 "downloadEnabled": false,
 "height": "100%",
 "paddingRight": 0,
 "verticalAlign": "top",
 "minWidth": 20,
 "propagateClick": false,
 "class": "Player",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "D4",
 "hfovMax": 130,
 "id": "panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2",
 "thumbnailUrl": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_ED3F433D_CD3D_EB97_41D7_F61C5FDC443D",
  "this.overlay_ED468E45_CD3D_3DF7_41E2_F95CFD8FEB8B"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18",
   "yaw": -161.33,
   "distance": 1,
   "backwardYaw": 113.7
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB",
   "yaw": 109.89,
   "distance": 1,
   "backwardYaw": -23.75
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 31.26,
  "pitch": 0
 },
 "id": "camera_C8C66DEF_D82C_BBB1_41E3_346FE26606D9",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3,
  "pitch": 0
 },
 "id": "camera_C9B31E8B_D82C_B871_41DD_784F66BD6DFC",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 163.59,
  "pitch": 0
 },
 "id": "camera_CB3A0055_D82C_4891_419F_CAD0B2787A98",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "D2",
 "hfovMax": 130,
 "id": "panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007",
 "thumbnailUrl": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_D6C069C2_CD0D_26ED_41C7_F22AEA8EA7BA",
  "this.overlay_D164B287_CD33_2572_41D1_1D9A319D6AA6",
  "this.overlay_D167E4BD_CD35_2E97_41D2_1A41ED7E4DA6",
  "this.overlay_D028FA36_CD37_E595_41A5_0FD9B7051E35",
  "this.overlay_D0E749F4_CD35_2695_41DA_F5615DBA045D",
  "this.overlay_D0DC241A_CD35_6D92_41E9_797F938BAAFC"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B",
   "yaw": -154.76,
   "distance": 1,
   "backwardYaw": 1.1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB",
   "yaw": -2.48,
   "distance": 1,
   "backwardYaw": 176.81
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30",
   "yaw": -64.5,
   "distance": 1,
   "backwardYaw": 1.86
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.89,
  "pitch": 0
 },
 "id": "camera_CA251EFE_D82C_B993_41C9_06444EF93E63",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -39.86,
  "pitch": 0
 },
 "id": "camera_C9AD6E7E_D82C_B893_41D7_74DE0C23B7D5",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.34,
  "pitch": 0
 },
 "id": "camera_C9098E30_D82C_B8AF_41DD_0E43900DF038",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "E5",
 "hfovMax": 130,
 "id": "panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30",
 "thumbnailUrl": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_EE9AAB03_CD33_3B73_41DF_0C1717B4C5B5",
  "this.overlay_EE62390A_CD33_2772_4143_215627099ACC",
  "this.overlay_EE65AD73_CD33_5F92_41E1_88E67DB6B628",
  "this.overlay_EEE0081D_CD0D_E597_41D5_6CC61348DAF3"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340",
   "yaw": -169.79,
   "distance": 1,
   "backwardYaw": 118.78
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04DE176_CD37_2795_41C4_2A238F646BD6"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007",
   "yaw": 1.86,
   "distance": 1,
   "backwardYaw": -64.5
  }
 ]
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "B2",
 "hfovMax": 130,
 "id": "panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E",
 "thumbnailUrl": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_DEEDEC2C_CDFC_DDB6_41E8_20B4EECEDC70",
  "this.overlay_DB866E3C_CDF4_DD96_41E7_6C97D81100F2",
  "this.overlay_FD2BB190_CD17_276E_41E2_6283FE2E2C22"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E",
   "yaw": -56.47,
   "distance": 1,
   "backwardYaw": 74.64
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D",
   "yaw": -2.52,
   "distance": 1,
   "backwardYaw": 177.09
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3",
   "yaw": 171.13,
   "distance": 1,
   "backwardYaw": 81.69
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -98.31,
  "pitch": 0
 },
 "id": "camera_C95D0E71_D82C_B891_41E9_164558F2BBD6",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "class": "PlayList",
 "items": [
  {
   "media": "this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1",
   "camera": "this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C396E8BA_CD13_E69D_41B9_97455311D726",
   "camera": "this.panorama_C396E8BA_CD13_E69D_41B9_97455311D726_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6",
   "camera": "this.panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_DC61E73A_CD35_2B92_41E8_B023F2407848",
   "camera": "this.panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C",
   "camera": "this.panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3",
   "camera": "this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E",
   "camera": "this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E",
   "camera": "this.panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D",
   "camera": "this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA",
   "camera": "this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D",
   "camera": "this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF",
   "camera": "this.panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B",
   "camera": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007",
   "camera": "this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB",
   "camera": "this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2",
   "camera": "this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D",
   "camera": "this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0",
   "camera": "this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30",
   "camera": "this.panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878",
   "camera": "this.panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805",
   "camera": "this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652",
   "camera": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340",
   "camera": "this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C04DE176_CD37_2795_41C4_2A238F646BD6",
   "camera": "this.panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69",
   "camera": "this.panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405",
   "camera": "this.panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93",
   "camera": "this.panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9",
   "camera": "this.panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 0)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "media": "this.panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18"
  }
 ],
 "id": "mainPlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 51.07,
  "pitch": 0
 },
 "id": "camera_CAA20FCD_D82C_B7F1_41C8_90914F68181F",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.44,
  "pitch": 0
 },
 "id": "camera_CA528FB6_D82C_B793_41DC_87829DD17EF2",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.28,
  "pitch": 0
 },
 "id": "camera_C8934DC8_D82C_BBFF_41C3_7FA9E9924939",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -124.88,
  "pitch": 0
 },
 "id": "camera_C9F7FEBE_D82C_B993_41E1_586A4A158629",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.67,
  "pitch": 0
 },
 "id": "camera_C8D4EDFC_D82C_BB97_41EA_481346D7CE15",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.9,
  "pitch": 0
 },
 "id": "camera_CB492096_D82C_4993_41E1_AA0EEB9B85BD",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "displayMovements": [
  {
   "class": "TargetRotationalCameraDisplayMovement",
   "easing": "linear",
   "duration": 1000
  },
  {
   "class": "TargetRotationalCameraDisplayMovement",
   "easing": "cubic_in_out",
   "duration": 3000,
   "targetPitch": -17.82,
   "targetStereographicFactor": 0
  }
 ],
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -2.12,
  "pitch": -17.82
 },
 "id": "panorama_C02819F3_CD15_6693_41E1_198D446E07D1_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "displayOriginPosition": {
  "class": "RotationalCameraDisplayPosition",
  "hfov": 165,
  "yaw": -2.12,
  "pitch": -90,
  "stereographicFactor": 1
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "E6",
 "hfovMax": 130,
 "id": "panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340",
 "thumbnailUrl": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_E858840A_CD17_2D7D_41C6_A5CB68A5A496"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30",
   "yaw": 118.78,
   "distance": 1,
   "backwardYaw": -169.79
  }
 ]
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "B3",
 "hfovMax": 130,
 "id": "panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E",
 "thumbnailUrl": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_DE4A6E00_CDF3_7D6E_41D1_E739983685E2"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E",
   "yaw": 74.64,
   "distance": 1,
   "backwardYaw": -56.47
  }
 ]
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "F1",
 "hfovMax": 130,
 "id": "panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69",
 "thumbnailUrl": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_EBE60163_CD15_27B3_41E0_41ACBB5FDA90",
  "this.overlay_E507EDFE_CD14_DE92_41C7_11492C5F5141"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D",
   "yaw": 89.19,
   "distance": 1,
   "backwardYaw": -67.86
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405",
   "yaw": -1.82,
   "distance": 1,
   "backwardYaw": 178.66
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -8.87,
  "pitch": 0
 },
 "id": "camera_CAE60006_D82C_4873_41CF_46A8481C4925",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.52,
  "pitch": 0
 },
 "id": "camera_CA3B4F2E_D82C_B8B3_41C7_60DAEEF9BB71",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "C1",
 "hfovMax": 130,
 "id": "panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA",
 "thumbnailUrl": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_DB8153DA_CD15_6A9D_41DB_FCF6C8F1B7BC",
  "this.overlay_D6AA87DA_CD14_EA9D_41C7_0860D5BE86F2",
  "this.overlay_FD77C876_CD1F_2595_41D8_A94CBE7A51F1",
  "this.overlay_FF47E5FE_CD1D_2E95_41E8_4FB9618F3319",
  "this.overlay_F9924519_CD33_6F9E_41CE_FA944049BCC1"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1",
   "yaw": 144.1,
   "distance": 1,
   "backwardYaw": 6.33
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D",
   "yaw": -120.59,
   "distance": 1,
   "backwardYaw": 138.18
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B",
   "yaw": -38.25,
   "distance": 1,
   "backwardYaw": 152.63
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 59.41,
  "pitch": 0
 },
 "id": "camera_C81CF112_D82C_4893_41EA_176232C81090",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 112.14,
  "pitch": 0
 },
 "id": "camera_C93B9E23_D82C_B8B1_41BE_0E14C5519DBD",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 141.75,
  "pitch": 0
 },
 "id": "camera_C88CBDBB_D82C_BB91_41E2_5E6D82891EA2",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "E8",
 "hfovMax": 130,
 "id": "panorama_C04DE176_CD37_2795_41C4_2A238F646BD6",
 "thumbnailUrl": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_EB9BD403_CD15_6D72_41CA_2EB295412014"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878",
   "yaw": 129.07,
   "distance": 1,
   "backwardYaw": -170.97
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.19,
  "pitch": 0
 },
 "id": "camera_CB5EC0A3_D82C_49B1_41DB_AB744D53E13B",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -88.34,
  "pitch": 0
 },
 "id": "camera_C86C2139_D82C_4891_41E9_1F9C9C77A35D",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "F3",
 "hfovMax": 130,
 "id": "panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93",
 "thumbnailUrl": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_EA4707A2_CD1D_6AAD_41E3_A8C2A074C3FA"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D",
   "yaw": 93.86,
   "distance": 1,
   "backwardYaw": -58.26
  }
 ]
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "E1",
 "hfovMax": 130,
 "id": "panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D",
 "thumbnailUrl": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_ECBA83D6_CD33_2A95_41D9_3561F4960735",
  "this.overlay_EC800645_CD33_2DF6_41D1_7C38B0687344",
  "this.overlay_EC355F66_CD35_FBB5_41CB_EF9F1C5737D1"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805",
   "yaw": -173.19,
   "distance": 1,
   "backwardYaw": 91.66
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B",
   "yaw": 1.72,
   "distance": 1,
   "backwardYaw": -163.7
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.74,
  "pitch": 0
 },
 "id": "camera_CAF6D013_D82C_4891_41DF_CC8E4522F605",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "A1",
 "hfovMax": 130,
 "id": "panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6",
 "thumbnailUrl": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_DDE24B65_CD14_DBB7_41DA_3E16F5EFE2DD",
  "this.overlay_DCFF6228_CD0D_25BD_41E4_6DDC75178522"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C396E8BA_CD13_E69D_41B9_97455311D726",
   "yaw": 100.16,
   "distance": 1,
   "backwardYaw": -111.9
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_DC61E73A_CD35_2B92_41E8_B023F2407848",
   "yaw": 2.99,
   "distance": 1,
   "backwardYaw": -152.53
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 25.24,
  "pitch": 0
 },
 "id": "camera_C8E6CDD5_D82C_BB91_41E1_27884E5F71E5",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 27.47,
  "pitch": 0
 },
 "id": "camera_CA194F57_D82C_B891_41C7_4E7A64F1A362",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.91,
  "pitch": 0
 },
 "id": "camera_CA4CFF9E_D82C_B793_41E4_4F11B8698277",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C396E8BA_CD13_E69D_41B9_97455311D726_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -90.81,
  "pitch": 0
 },
 "id": "camera_CAD4902D_D82C_48B1_41E0_545A9AADBC1C",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 18.67,
  "pitch": 0
 },
 "id": "camera_C9C74ECA_D82C_B9F3_41DD_77DEBA4F2EEC",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "G1",
 "hfovMax": 130,
 "id": "panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9",
 "thumbnailUrl": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_E11E375B_CD1C_EB92_41CB_CF97D2EB1D6E",
  "this.overlay_E23CB5D9_CD1F_2E9F_41B4_48F6E2E4C451"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF",
   "yaw": -128.93,
   "distance": 1,
   "backwardYaw": -58.99
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18",
   "yaw": 55.12,
   "distance": 1,
   "backwardYaw": -146.34
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.01,
  "pitch": 0
 },
 "id": "camera_C981DE97_D82C_B991_41C7_116D471A8942"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 6.81,
  "pitch": 0
 },
 "id": "camera_CB6BA07C_D82C_4897_41D2_A5BF2BBD157D",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.14,
  "pitch": 0
 },
 "id": "camera_C866F12C_D82C_48B7_41D8_EA2B6B12034C",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -70.11,
  "pitch": 0
 },
 "id": "camera_CA2BEF16_D82C_B893_41D6_01488030C9F9",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.92,
  "pitch": 0
 },
 "id": "camera_CA904FF9_D82C_B791_41B2_3679CB0E9FEF",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "E2",
 "hfovMax": 130,
 "id": "panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805",
 "thumbnailUrl": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_EBBCE18C_CD13_6775_41D3_16A9D2848406"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D",
   "yaw": 91.66,
   "distance": 1,
   "backwardYaw": -173.19
  }
 ]
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "B4",
 "hfovMax": 130,
 "id": "panorama_C02686FD_CD15_2A96_41BF_099642BC426D",
 "thumbnailUrl": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_D8E211D6_CD0D_2695_41E0_B9D142A13C7A",
  "this.overlay_D9F51375_CD0D_2B96_41B4_245A5B221587",
  "this.overlay_E213A9A2_CD14_E6B2_41E0_1E4C6AFBDBE2"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1",
   "yaw": -5.85,
   "distance": 1,
   "backwardYaw": -178.52
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69",
   "yaw": -67.86,
   "distance": 1,
   "backwardYaw": 89.19
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E",
   "yaw": 177.09,
   "distance": 1,
   "backwardYaw": -2.52
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "B1",
 "hfovMax": 130,
 "id": "panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3",
 "thumbnailUrl": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_DC63304D_CDFF_25F6_41B4_54C2D665392C",
  "this.overlay_DE310BD7_CDFD_5A92_41E3_28E65627012A"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C",
   "yaw": -88.68,
   "distance": 1,
   "backwardYaw": 4.08
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E",
   "yaw": 81.69,
   "distance": 1,
   "backwardYaw": 171.13
  }
 ]
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "E7",
 "hfovMax": 130,
 "id": "panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878",
 "thumbnailUrl": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_EE4AD47B_CD0C_ED93_41E9_13D909F7AFD7",
  "this.overlay_E9D20B4E_CD0F_5BF2_41E8_F2C0F691F10F",
  "this.overlay_E8F88F8C_CD0F_3B75_41D6_ADBE0DE3C7C7",
  "this.overlay_E9411C59_CD0D_5D9F_41E8_E060EDC14993"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04DE176_CD37_2795_41C4_2A238F646BD6",
   "yaw": -170.97,
   "distance": 1,
   "backwardYaw": 129.07
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB",
   "yaw": 0.11,
   "distance": 1,
   "backwardYaw": -148.74
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.15,
  "pitch": 0
 },
 "id": "camera_CA6EAF6F_D82C_B8B1_41D1_600DA91EA38F",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.18,
  "pitch": 0
 },
 "id": "camera_C87F7161_D82C_48B1_41D5_4E27684CDD3F",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -35.9,
  "pitch": 0
 },
 "id": "camera_CA7C9F87_D82C_B871_41E3_082349D3ED16",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -61.22,
  "pitch": 0
 },
 "id": "camera_C991FEA4_D82C_B9B7_4182_7F11EAAC6A09",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "C3",
 "hfovMax": 130,
 "id": "panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF",
 "thumbnailUrl": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_D5BA5D11_CD1D_3F6E_41BD_4C4140C6C63A",
  "this.overlay_DA7FC03C_CD13_2596_41E4_6944479945FB",
  "this.overlay_FF5E42A2_CD17_2AB2_41B2_3577077EBD70"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D",
   "yaw": 30.17,
   "distance": 1,
   "backwardYaw": -3.56
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9",
   "yaw": -58.99,
   "distance": 1,
   "backwardYaw": -128.93
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -2.91,
  "pitch": 0
 },
 "id": "camera_C94FFE64_D82C_B8B7_41E7_B79FEAD5BF8F",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "audio": {
  "mp3Url": "media/audio_C5CCA77C_D72D_0C87_41E2_970B092FC720.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_C5CCA77C_D72D_0C87_41E2_970B092FC720.ogg"
 },
 "class": "MediaAudio",
 "id": "audio_C5CCA77C_D72D_0C87_41E2_970B092FC720",
 "data": {
  "label": "Wild West"
 },
 "autoplay": true
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 123.53,
  "pitch": 0
 },
 "id": "camera_C8B13DA1_D82C_BBB1_41CF_C1B62F5EE15D",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C02686FD_CD15_2A96_41BF_099642BC426D_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.14,
  "pitch": 0
 },
 "id": "camera_CBAEC0B0_D82C_49AF_41B8_AF968E223AD6",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.69,
  "pitch": 0
 },
 "id": "camera_C9199E3D_D82C_B891_41E9_6DD1F7557BCC",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -41.82,
  "pitch": 0
 },
 "id": "camera_C9247E09_D82C_B871_41E8_BAAEF0414DE2",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "F2",
 "hfovMax": 130,
 "id": "panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405",
 "thumbnailUrl": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_EAE28105_CD13_6777_41E4_937F450979CA",
  "this.overlay_FFA8DEDA_CD37_7A92_41DD_345F3766ADB6"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1",
   "yaw": 93.09,
   "distance": 1,
   "backwardYaw": -73.39
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69",
   "yaw": 178.66,
   "distance": 1,
   "backwardYaw": -1.82
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.48,
  "pitch": 0
 },
 "id": "camera_CB24903A_D82C_4893_41D9_D7CDB1DAC6C5",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.83,
  "pitch": 0
 },
 "id": "camera_C81B411F_D82C_4891_41D0_47C3EA68B207",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 33.66,
  "pitch": 0
 },
 "id": "camera_CB1BC06F_D82C_48B1_41EA_29A5393BE3EC",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "D1",
 "hfovMax": 130,
 "id": "panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B",
 "thumbnailUrl": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_D6C3BB32_CD15_DBAD_41D1_62F30CE5A327",
  "this.overlay_D537CF20_CD14_FBAE_41BE_C6EA8E2D0290",
  "this.overlay_D4FF7358_CD17_2B9D_41DD_EEFFD4F51339",
  "this.overlay_D70A726A_CD13_25BD_419A_CF8591D41AEC",
  "this.overlay_D03D565E_CD0D_ED95_41E2_B8C41A02BE30",
  "this.overlay_EDCE344A_CD0F_2DFD_41E8_C4474F6C927C"
 ],
 "pitch": 0,
 "hfov": 360,
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
   "panorama": "this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0",
   "yaw": -16.41,
   "distance": 1,
   "backwardYaw": 0.25
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA",
   "yaw": 152.63,
   "distance": 1,
   "backwardYaw": -38.25
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D",
   "yaw": -163.7,
   "distance": 1,
   "backwardYaw": 1.72
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007",
   "yaw": 1.1,
   "distance": 1,
   "backwardYaw": -154.76
  }
 ]
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "B5",
 "hfovMax": 130,
 "id": "panorama_C02819F3_CD15_6693_41E1_198D446E07D1",
 "thumbnailUrl": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_D819B48B_CD13_2D73_41E0_4F94AEA0CC2B",
  "this.overlay_D8619C63_CD15_5DB2_41DE_9C5F8BE22A48",
  "this.overlay_FFCBD57B_CD1D_EF93_41DC_E84809498E98"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D",
   "yaw": -178.52,
   "distance": 1,
   "backwardYaw": -5.85
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA",
   "yaw": 6.33,
   "distance": 1,
   "backwardYaw": 144.1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405",
   "yaw": -73.39,
   "distance": 1,
   "backwardYaw": 93.09
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 68.1,
  "pitch": 0
 },
 "id": "camera_CA0B7F45_D82C_B8F1_41D6_AD5C442D8206",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 121.01,
  "pitch": 0
 },
 "id": "camera_CB0BC062_D82C_48B3_41E5_D5B07F05CFB2",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -50.93,
  "pitch": 0
 },
 "id": "camera_C8F62DE2_D82C_BBB3_41D1_652F7C5E278F",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 91.32,
  "pitch": 0
 },
 "id": "camera_C969EE4A_D82C_B8F3_41B9_AC24B6F1E90A",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -66.3,
  "pitch": 0
 },
 "id": "camera_CAB24FDF_D82C_B791_41DB_E464C89CE648",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "C2",
 "hfovMax": 130,
 "id": "panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D",
 "thumbnailUrl": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_DA13B618_CD1C_ED9E_41BD_E15942AA3E9A",
  "this.overlay_DB405DB5_CD1D_3E97_41D7_93879D43059F",
  "this.overlay_FDFE9AFD_CD13_DA96_41E8_BCF36D0FA69A",
  "this.overlay_FF0D9466_CD15_2DB5_41DD_8A2A223E5E28"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA",
   "yaw": 138.18,
   "distance": 1,
   "backwardYaw": -120.59
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF",
   "yaw": -3.56,
   "distance": 1,
   "backwardYaw": 30.17
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93",
   "yaw": -58.26,
   "distance": 1,
   "backwardYaw": 93.86
  }
 ]
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "A2",
 "hfovMax": 120,
 "id": "panorama_C396E8BA_CD13_E69D_41B9_97455311D726",
 "thumbnailUrl": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_C2761F01_CD17_3B6F_41E0_D4EA77D7B27E"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6",
   "yaw": -111.9,
   "distance": 1,
   "backwardYaw": 100.16
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 115.5,
  "pitch": 0
 },
 "id": "camera_C9E13EB1_D82C_B991_41A6_430AD2817068",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -105.36,
  "pitch": 0
 },
 "id": "camera_C97FEE57_D82C_B891_41E3_450B55DCAF60",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.21,
  "pitch": 0
 },
 "id": "camera_CB792089_D82C_4871_41E8_B91DE7B6DA4C",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration",
 "viewerArea": "this.MainViewer",
 "class": "PanoramaPlayer",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeEnabled": true,
 "touchControlMode": "drag_rotation",
 "displayPlaybackBar": true,
 "buttonCardboardView": "this.IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 106.61,
  "pitch": 0
 },
 "id": "camera_C8712154_D82C_4897_41DC_A624EAAF8ACF",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 16.3,
  "pitch": 0
 },
 "id": "camera_C86A4146_D82C_48F3_41D9_01D994DB49DA",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "A4",
 "hfovMax": 130,
 "id": "panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C",
 "thumbnailUrl": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_DCD94C39_CDFC_DD9E_41E4_B020805A770F",
  "this.overlay_FFFB37EB_CD13_6AB3_41DD_14B05BA1E999"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_DC61E73A_CD35_2B92_41E8_B023F2407848",
   "yaw": 177,
   "distance": 1,
   "backwardYaw": -0.31
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3",
   "yaw": 4.08,
   "distance": 1,
   "backwardYaw": -88.68
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "E4",
 "hfovMax": 130,
 "id": "panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652",
 "thumbnailUrl": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_E82AF9A1_CD17_E6AE_41D7_C79DCD7172A3"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0",
   "yaw": 129.12,
   "distance": 1,
   "backwardYaw": 140.14
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "G2",
 "hfovMax": 130,
 "id": "panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18",
 "thumbnailUrl": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_E7751B68_CD1C_DBBD_41DF_9453EBDF6F72",
  "this.overlay_E02F87B4_CD1D_6A93_41E0_37842272FE3C"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9",
   "yaw": -146.34,
   "distance": 1,
   "backwardYaw": 55.12
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2",
   "yaw": 113.7,
   "distance": 1,
   "backwardYaw": -161.33
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "D3",
 "hfovMax": 130,
 "id": "panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB",
 "thumbnailUrl": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_EEB1052B_CD3D_EFB2_41D0_92351AA35E3D",
  "this.overlay_D2284119_CD3F_279F_41E2_46F354F401C6",
  "this.overlay_EFE23B61_CD3C_DBAF_41C3_83AC9B5A40BD",
  "this.overlay_FFB1B509_CD0D_6F7F_41C1_8C992809860A"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878",
   "yaw": -148.74,
   "distance": 1,
   "backwardYaw": 0.11
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04DE176_CD37_2795_41C4_2A238F646BD6"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2",
   "yaw": -23.75,
   "distance": 1,
   "backwardYaw": 109.89
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007",
   "yaw": 176.81,
   "distance": 1,
   "backwardYaw": -2.48
  }
 ]
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "E3",
 "hfovMax": 130,
 "id": "panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0",
 "thumbnailUrl": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_EC7E65C0_CD34_EEEE_41E1_A67A2B55D3BB",
  "this.overlay_EC9CA29B_CD37_2A93_41D1_C853CC2D47F0",
  "this.overlay_EC949294_CD37_6A96_41CF_06093517A25B",
  "this.overlay_EE2031F8_CD35_269D_4193_7061083DD6AA"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652",
   "yaw": 140.14,
   "distance": 1,
   "backwardYaw": 129.12
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B",
   "yaw": 0.25,
   "distance": 1,
   "backwardYaw": -16.41
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.75,
  "pitch": 0
 },
 "id": "camera_C8BA4DAE_D82C_BBB3_41DB_4D3CB88C7B53",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.03,
  "pitch": 0
 },
 "id": "camera_C9D5FEE7_D82C_B9B1_41E1_FBF8A4582910",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -50.88,
  "pitch": 0
 },
 "id": "camera_CB2AF047_D82C_48F1_41E6_FC6CA6933C95",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 156.25,
  "pitch": 0
 },
 "id": "camera_CA80DFEC_D82C_B7B7_41E5_FCF3768D97F0",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -27.37,
  "pitch": 0
 },
 "id": "camera_C92B8E16_D82C_B893_41DB_5308D6900ABA",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.48,
  "pitch": 0
 },
 "id": "camera_CAC4D020_D82C_48AF_41CD_A30D53BC67F7",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawSpeed": 7.96,
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/f/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/f/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/u/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/u/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/r/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/r/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/b/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/b/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/d/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/d/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 9,
      "width": 4608,
      "class": "TiledImageResourceLevel",
      "rowCount": 9,
      "height": 4608
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 5,
      "width": 2560,
      "class": "TiledImageResourceLevel",
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 3,
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/l/3/{row}_{column}.jpg",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0/l/4/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "label": "A3",
 "hfovMax": 130,
 "id": "panorama_DC61E73A_CD35_2B92_41E8_B023F2407848",
 "thumbnailUrl": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_t.jpg",
 "class": "Panorama",
 "overlays": [
  "this.overlay_DCDC175D_CDF3_6B96_41CD_E0AD0E5D7774",
  "this.overlay_F9F4A938_CD0D_279D_41DB_9094DEF36E03"
 ],
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C",
   "yaw": -0.31,
   "distance": 1,
   "backwardYaw": 177
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6",
   "yaw": -152.53,
   "distance": 1,
   "backwardYaw": 2.99
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -79.84,
  "pitch": 0
 },
 "id": "camera_CBBC70BC_D82C_4997_41E1_EB11CE28FC36"
},
{
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipTextShadowBlurRadius": 3,
 "id": "MainViewer",
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "toolTipFontWeight": "bold",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "minHeight": 50,
 "playbackBarProgressBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Century Gothic",
 "height": "100%",
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "minWidth": 100,
 "playbackBarBackgroundOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "borderSize": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "transitionDuration": 500,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "class": "ViewerArea",
 "progressBarBorderColor": "#000000",
 "displayTooltipInTouchScreens": true,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "transitionMode": "blending",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "3vmin",
 "paddingTop": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "data": {
  "name": "Main Viewer"
 },
 "paddingBottom": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_DC3F8679_D234_4C07_41D8_DB36DE3118CE",
 "paddingTop": 0,
 "width": 57.5,
 "iconURL": "skin/IconButton_DC3F8679_D234_4C07_41D8_DB36DE3118CE.png",
 "maxWidth": 1000,
 "right": "0.04%",
 "maxHeight": 1000,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "top": "11.43%",
 "minHeight": 1,
 "borderRadius": 0,
 "mode": "push",
 "height": 57.98,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "propagateClick": false,
 "class": "IconButton",
 "minWidth": 1,
 "click": "this.openLink('https://wa.me/9715921219', '_blank')",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton7186"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_DEA46DEC_D23C_5C1C_41E6_80DD00D0C298",
 "paddingTop": 0,
 "width": 67,
 "iconURL": "skin/IconButton_DEA46DEC_D23C_5C1C_41E6_80DD00D0C298.png",
 "maxWidth": 1000,
 "right": "0%",
 "maxHeight": 1000,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "top": "0%",
 "minHeight": 1,
 "borderRadius": 0,
 "mode": "push",
 "height": 57.55,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "propagateClick": false,
 "class": "IconButton",
 "minWidth": 1,
 "click": "this.openLink('https://www.instagram.com/saran_architecture_co?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', '_blank')",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton5364"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "paddingLeft": 0,
 "id": "Image_DFBAE108_D254_4405_41DF_83304E52EBA3",
 "left": "0%",
 "width": "12.637%",
 "maxWidth": 1345,
 "maxHeight": 891,
 "url": "skin/Image_DFBAE108_D254_4405_41DF_83304E52EBA3.jpg",
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "top": "0%",
 "minHeight": 1,
 "borderRadius": 0,
 "height": "14.616%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "propagateClick": false,
 "class": "Image",
 "borderSize": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image7815"
 },
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
},
{
 "paddingLeft": 0,
 "scrollBarMargin": 2,
 "id": "Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "layout": "absolute",
 "children": [
  "this.Container_AD0DD7F8_BA53_6FC4_41DD_56889CF94F5F",
  "this.IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553"
 ],
 "horizontalAlign": "left",
 "backgroundImageUrl": "skin/Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC.png",
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "bottom": "0%",
 "minHeight": 1,
 "borderRadius": 0,
 "height": "12.832%",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "verticalAlign": "top",
 "propagateClick": true,
 "class": "Container",
 "minWidth": 1,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "visible": false,
 "overflow": "visible",
 "data": {
  "name": "--- MENU"
 },
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
},
{
 "paddingLeft": 0,
 "id": "Image_D645B935_D825_B891_41E8_7A86BDAF19E1",
 "left": "0%",
 "width": "100%",
 "maxWidth": 1549,
 "maxHeight": 192,
 "url": "skin/Image_D645B935_D825_B891_41E8_7A86BDAF19E1.png",
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "bottom": "0%",
 "minHeight": 1,
 "borderRadius": 0,
 "height": "9.841%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "propagateClick": false,
 "class": "Image",
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image2985"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB, this.camera_CA80DFEC_D82C_B7B7_41E5_FCF3768D97F0); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 23.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_FF6D0116_CD13_6795_41E6_CC5CBA5A4A5A",
   "pitch": -22.34,
   "yaw": 109.89,
   "distance": 100
  }
 ],
 "id": "overlay_ED3F433D_CD3D_EB97_41D7_F61C5FDC443D",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 23.43,
   "yaw": 109.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -22.34
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18, this.camera_CAB24FDF_D82C_B791_41DB_E464C89CE648); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 22.6,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_FF6EB116_CD13_6795_41E5_A0B2801A1ED1",
   "pitch": -23.83,
   "yaw": -161.33,
   "distance": 100
  }
 ],
 "id": "overlay_ED468E45_CD3D_3DF7_41E2_F95CFD8FEB8B",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 22.6,
   "yaw": -161.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -23.83
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B, this.camera_CB492096_D82C_4993_41E1_AA0EEB9B85BD); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 14.19,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47B920B_CD3D_2573_41E3_80F2EFA5779E",
   "pitch": -22.67,
   "yaw": -154.76,
   "distance": 50
  }
 ],
 "id": "overlay_D6C069C2_CD0D_26ED_41C7_F22AEA8EA7BA",
 "data": {
  "label": "Arrow 05b Left-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.19,
   "yaw": -154.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -22.67
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 11.69,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47B020B_CD3D_2573_4179_FE2F8CFB9ECA",
   "pitch": -23.23,
   "yaw": -121.53,
   "distance": 50
  }
 ],
 "id": "overlay_D164B287_CD33_2572_41D1_1D9A319D6AA6",
 "data": {
  "label": "Arrow 05a Right-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.69,
   "yaw": -121.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ]
   },
   "pitch": -23.23
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30, this.camera_CBAEC0B0_D82C_49AF_41B8_AF968E223AD6); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 15.48,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47B320B_CD3D_2573_41E7_1717215E3755",
   "pitch": -29.82,
   "yaw": -64.5,
   "distance": 50
  }
 ],
 "id": "overlay_D167E4BD_CD35_2E97_41D2_1A41ED7E4DA6",
 "data": {
  "label": "Arrow 05b Left-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.48,
   "yaw": -64.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -29.82
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB, this.camera_CB5EC0A3_D82C_49B1_41DB_AB744D53E13B); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 13.12,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47AA20B_CD3D_2573_41E8_6CE29BF16818",
   "pitch": -21.33,
   "yaw": -2.48,
   "distance": 100
  }
 ],
 "id": "overlay_D028FA36_CD37_E595_41A5_0FD9B7051E35",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.12,
   "yaw": -2.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -21.33
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 304,
      "height": 346
     }
    ]
   },
   "pitch": -3.53,
   "hfov": 7.81,
   "yaw": -121.28
  }
 ],
 "id": "overlay_D0E749F4_CD35_2695_41DA_F5615DBA045D",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.81,
   "yaw": -121.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 18
     }
    ]
   },
   "pitch": -3.53
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_5_0.png",
      "class": "ImageResourceLevel",
      "width": 314,
      "height": 400
     }
    ]
   },
   "pitch": -3.41,
   "hfov": 8.08,
   "yaw": -78.16
  }
 ],
 "id": "overlay_D0DC241A_CD35_6D92_41E9_797F938BAAFC",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.08,
   "yaw": -78.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 20
     }
    ]
   },
   "pitch": -3.41
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340, this.camera_C991FEA4_D82C_B9B7_4182_7F11EAAC6A09); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 517,
      "height": 464
     }
    ]
   },
   "pitch": -13.92,
   "hfov": 12.92,
   "yaw": -169.79
  }
 ],
 "id": "overlay_EE9AAB03_CD33_3B73_41DF_0C1717B4C5B5",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.92,
   "yaw": -169.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -13.92
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 346,
      "height": 336
     }
    ]
   },
   "pitch": -4.48,
   "hfov": 8.9,
   "yaw": -100.83
  }
 ],
 "id": "overlay_EE62390A_CD33_2772_4143_215627099ACC",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.9,
   "yaw": -100.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.48
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 218,
      "height": 304
     }
    ]
   },
   "pitch": -6.47,
   "hfov": 5.59,
   "yaw": 121.76
  }
 ],
 "id": "overlay_EE65AD73_CD33_5F92_41E1_88E67DB6B628",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 5.59,
   "yaw": 121.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 22
     }
    ]
   },
   "pitch": -6.47
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007, this.camera_C9E13EB1_D82C_B991_41A6_430AD2817068); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 19.16,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4461214_CD3D_2595_41D4_8C0A6C847E60",
   "pitch": -40.14,
   "yaw": 1.86,
   "distance": 100
  }
 ],
 "id": "overlay_EEE0081D_CD0D_E597_41D5_6CC61348DAF3",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 19.16,
   "yaw": 1.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -40.14
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D, this.camera_C94FFE64_D82C_B8B7_41E7_B79FEAD5BF8F); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 15.85,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4713200_CD3D_256D_41D0_A58FAFECF048",
   "pitch": -18.82,
   "yaw": -2.52,
   "distance": 100
  }
 ],
 "id": "overlay_DEEDEC2C_CDFC_DDB6_41E8_20B4EECEDC70",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.85,
   "yaw": -2.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -18.82
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E, this.camera_C97FEE57_D82C_B891_41E3_450B55DCAF60); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 12.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4709200_CD3D_256D_41D9_57C228FDAAC8",
   "pitch": -23.85,
   "yaw": -56.47,
   "distance": 50
  }
 ],
 "id": "overlay_DB866E3C_CDF4_DD96_41E7_6C97D81100F2",
 "data": {
  "label": "Arrow 05b Left-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.05,
   "yaw": -56.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -23.85
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3, this.camera_C95D0E71_D82C_B891_41E9_164558F2BBD6); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 15.28,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F470F200_CD3D_256D_41E3_2E06C75341AE",
   "pitch": -29.95,
   "yaw": 171.13,
   "distance": 100
  }
 ],
 "id": "overlay_FD2BB190_CD17_276E_41E2_6283FE2E2C22",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.28,
   "yaw": 171.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -29.95
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30, this.camera_CB792089_D82C_4871_41E8_B91DE7B6DA4C); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 763,
      "height": 592
     }
    ]
   },
   "pitch": -31.97,
   "hfov": 16.65,
   "yaw": 118.78
  }
 ],
 "id": "overlay_E858840A_CD17_2D7D_41C6_A5CB68A5A496",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.65,
   "yaw": 118.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04B63A7_CD37_2AB3_41E6_2A069F0F5340_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 20,
      "height": 16
     }
    ]
   },
   "pitch": -31.97
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E, this.camera_C8B13DA1_D82C_BBB1_41CF_C1B62F5EE15D); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 19.6,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F470E200_CD3D_256D_41E2_E8D7267AE78C",
   "pitch": -33.89,
   "yaw": 74.64,
   "distance": 100
  }
 ],
 "id": "overlay_DE4A6E00_CDF3_7D6E_41D1_E739983685E2",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 19.6,
   "yaw": 74.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -33.89
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D, this.camera_C93B9E23_D82C_B8B1_41BE_0E14C5519DBD); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 677,
      "height": 474
     }
    ]
   },
   "pitch": -19.68,
   "hfov": 16.42,
   "yaw": 89.19
  }
 ],
 "id": "overlay_EBE60163_CD15_27B3_41E0_41ACBB5FDA90",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.42,
   "yaw": 89.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 22,
      "height": 15
     }
    ]
   },
   "pitch": -19.68
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405, this.camera_C9098E30_D82C_B8AF_41DD_0E43900DF038); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 17.34,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F443421C_CD3D_2595_41A5_5997A50E0359",
   "pitch": -25.57,
   "yaw": -1.82,
   "distance": 100
  }
 ],
 "id": "overlay_E507EDFE_CD14_DE92_41C7_11492C5F5141",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 17.34,
   "yaw": -1.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -25.57
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D, this.camera_C9247E09_D82C_B871_41E8_BAAEF0414DE2); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 22.6,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4723202_CD3D_256D_41CF_4050E8427314",
   "pitch": -29.2,
   "yaw": -120.59,
   "distance": 100
  }
 ],
 "id": "overlay_DB8153DA_CD15_6A9D_41DB_FCF6C8F1B7BC",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 22.6,
   "yaw": -120.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -29.2
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B, this.camera_C92B8E16_D82C_B893_41DB_5308D6900ABA); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 14.2,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47DA202_CD3D_256D_41DB_A5102C1A2AEE",
   "pitch": -36.86,
   "yaw": -38.25,
   "distance": 50
  }
 ],
 "id": "overlay_D6AA87DA_CD14_EA9D_41C7_0860D5BE86F2",
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.2,
   "yaw": -38.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -36.86
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 314,
      "height": 368
     }
    ]
   },
   "pitch": -5.04,
   "hfov": 8.07,
   "yaw": -50.24
  }
 ],
 "id": "overlay_FD77C876_CD1F_2595_41D8_A94CBE7A51F1",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.07,
   "yaw": -50.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 18
     }
    ]
   },
   "pitch": -5.04
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 14.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47D2202_CD3D_256D_41C4_4CFC23A388EB",
   "pitch": -21.35,
   "yaw": -31.03,
   "distance": 50
  }
 ],
 "id": "overlay_FF47E5FE_CD1D_2E95_41E8_4FB9618F3319",
 "data": {
  "label": "Arrow 05a Left-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.66,
   "yaw": -31.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ]
   },
   "pitch": -21.35
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1, this.camera_C8D4EDFC_D82C_BB97_41EA_481346D7CE15); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 15.49,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47D7208_CD3D_257D_4181_A7AE1500829A",
   "pitch": -29.77,
   "yaw": 144.1,
   "distance": 100
  }
 ],
 "id": "overlay_F9924519_CD33_6F9E_41CE_FA944049BCC1",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.49,
   "yaw": 144.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -29.77
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878, this.camera_C9D5FEE7_D82C_B9B1_41E1_FBF8A4582910); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 763,
      "height": 624
     }
    ]
   },
   "pitch": -25.38,
   "hfov": 17.74,
   "yaw": 129.07
  }
 ],
 "id": "overlay_EB9BD403_CD15_6D72_41CA_2EB295412014",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 17.74,
   "yaw": 129.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C04DE176_CD37_2795_41C4_2A238F646BD6_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": -25.38
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D, this.camera_CAF6D013_D82C_4891_41DF_CC8E4522F605); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 560,
      "height": 442
     }
    ]
   },
   "pitch": -12.41,
   "hfov": 14.08,
   "yaw": 93.86
  }
 ],
 "id": "overlay_EA4707A2_CD1D_6AAD_41E3_A8C2A074C3FA",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.08,
   "yaw": 93.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 20,
      "height": 16
     }
    ]
   },
   "pitch": -12.41
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805, this.camera_C86C2139_D82C_4891_41E9_1F9C9C77A35D); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 613,
      "height": 560
     }
    ]
   },
   "pitch": -18.24,
   "hfov": 14.99,
   "yaw": -173.19
  }
 ],
 "id": "overlay_ECBA83D6_CD33_2A95_41D9_3561F4960735",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.99,
   "yaw": -173.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -18.24
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B, this.camera_C86A4146_D82C_48F3_41D9_01D994DB49DA); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 17.73,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F447C212_CD3D_2592_41D0_33BD56893ABA",
   "pitch": -29.63,
   "yaw": 1.72,
   "distance": 100
  }
 ],
 "id": "overlay_EC800645_CD33_2DF6_41D1_7C38B0687344",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 17.73,
   "yaw": 1.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -29.63
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 325,
      "height": 325
     }
    ]
   },
   "pitch": -6.16,
   "hfov": 8.33,
   "yaw": -103.13
  }
 ],
 "id": "overlay_EC355F66_CD35_FBB5_41CB_EF9F1C5737D1",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.33,
   "yaw": -103.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.16
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C396E8BA_CD13_E69D_41B9_97455311D726, this.camera_CA0B7F45_D82C_B8F1_41D6_AD5C442D8206); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 16.64,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E3C3123A_CD73_2592_41C3_3E29EFCA307D",
   "pitch": -15.89,
   "yaw": 100.16,
   "distance": 100
  }
 ],
 "id": "overlay_DDE24B65_CD14_DBB7_41DA_3E16F5EFE2DD",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.64,
   "yaw": 100.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -15.89
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_DC61E73A_CD35_2B92_41E8_B023F2407848, this.camera_CA194F57_D82C_B891_41C7_4E7A64F1A362); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 12.24,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E3C3F23B_CD73_2592_41C0_AD5629619316",
   "pitch": -19.49,
   "yaw": 2.99,
   "distance": 100
  }
 ],
 "id": "overlay_DCFF6228_CD0D_25BD_41E4_6DDC75178522",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.24,
   "yaw": 2.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -19.49
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18, this.camera_CB1BC06F_D82C_48B1_41EA_29A5393BE3EC); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 18.72,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F44DB21C_CD3D_2595_41BF_E8215D5CD180",
   "pitch": -22.84,
   "yaw": 55.12,
   "distance": 100
  }
 ],
 "id": "overlay_E11E375B_CD1C_EB92_41CB_CF97D2EB1D6E",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 18.72,
   "yaw": 55.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -22.84
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF, this.camera_CB0BC062_D82C_48B3_41E5_D5B07F05CFB2); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 19.07,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F44D221D_CD3D_2597_41DD_B5A9AA911B06",
   "pitch": -22.15,
   "yaw": -128.93,
   "distance": 100
  }
 ],
 "id": "overlay_E23CB5D9_CD1F_2E9F_41B4_48F6E2E4C451",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 19.07,
   "yaw": -128.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -22.15
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D, this.camera_CB6BA07C_D82C_4897_41D2_A5BF2BBD157D); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 763,
      "height": 624
     }
    ]
   },
   "pitch": -32.24,
   "hfov": 16.6,
   "yaw": 91.66
  }
 ],
 "id": "overlay_EBBCE18C_CD13_6775_41D3_16A9D2848406",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.6,
   "yaw": 91.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C055FFC5_CD35_FAF7_41DB_77DDC8D4A805_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": -32.24
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1, this.camera_CAC4D020_D82C_48AF_41CD_A30D53BC67F7); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 19.83,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4704201_CD3D_256F_41D1_2AB3CECBA269",
   "pitch": -29.5,
   "yaw": -5.85,
   "distance": 100
  }
 ],
 "id": "overlay_D8E211D6_CD0D_2695_41E0_B9D142A13C7A",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 19.83,
   "yaw": -5.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -29.5
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69, this.camera_CAD4902D_D82C_48B1_41E0_545A9AADBC1C); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 325,
      "height": 474
     }
    ]
   },
   "pitch": 0.46,
   "hfov": 8.37,
   "yaw": -67.86
  }
 ],
 "id": "overlay_D9F51375_CD0D_2B96_41B4_245A5B221587",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.37,
   "yaw": -67.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 23
     }
    ]
   },
   "pitch": 0.46
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E, this.camera_CB24903A_D82C_4893_41D9_D7CDB1DAC6C5); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 21.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F473E201_CD3D_256F_41B3_E5AB74E1AFC2",
   "pitch": -44.02,
   "yaw": 177.09,
   "distance": 100
  }
 ],
 "id": "overlay_E213A9A2_CD14_E6B2_41E0_1E4C6AFBDBE2",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 21.43,
   "yaw": 177.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -44.02
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E, this.camera_CAE60006_D82C_4873_41CF_46A8481C4925); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 26.24,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47191FF_CD3D_2693_41DF_B3CE1C26AEF5",
   "pitch": -28.74,
   "yaw": 81.69,
   "distance": 100
  }
 ],
 "id": "overlay_DC63304D_CDFF_25F6_41B4_54C2D665392C",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 26.24,
   "yaw": 81.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -28.74
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C, this.camera_CA904FF9_D82C_B791_41B2_3679CB0E9FEF); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 19.22,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F471D200_CD3D_256D_41E4_26387309BA6C",
   "pitch": -18.93,
   "yaw": -88.68,
   "distance": 100
  }
 ],
 "id": "overlay_DE310BD7_CDFD_5A92_41E3_28E65627012A",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 19.22,
   "yaw": -88.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -18.93
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB, this.camera_C8C66DEF_D82C_BBB1_41E3_346FE26606D9); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 14.24,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4467215_CD3D_2597_41D9_B63441101347",
   "pitch": -40.56,
   "yaw": 0.11,
   "distance": 100
  }
 ],
 "id": "overlay_EE4AD47B_CD0C_ED93_41E9_13D909F7AFD7",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.24,
   "yaw": 0.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -40.56
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C04DE176_CD37_2795_41C4_2A238F646BD6, this.camera_C8F62DE2_D82C_BBB3_41D1_652F7C5E278F); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 453,
      "height": 506
     }
    ]
   },
   "pitch": -10.35,
   "hfov": 11.48,
   "yaw": -170.97
  }
 ],
 "id": "overlay_E9D20B4E_CD0F_5BF2_41E8_F2C0F691F10F",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.48,
   "yaw": -170.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -10.35
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 325,
      "height": 304
     }
    ]
   },
   "pitch": -5.25,
   "hfov": 8.34,
   "yaw": 120.85
  }
 ],
 "id": "overlay_E8F88F8C_CD0F_3B75_41D6_ADBE0DE3C7C7",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.34,
   "yaw": 120.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -5.25
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 13.04,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F440821A_CD3D_259D_41E5_C505484C67A7",
   "pitch": -19.29,
   "yaw": -62.07,
   "distance": 50
  }
 ],
 "id": "overlay_E9411C59_CD0D_5D9F_41E8_E060EDC14993",
 "data": {
  "label": "Arrow 05a Left-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.04,
   "yaw": -62.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ]
   },
   "pitch": -19.29
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 293,
      "height": 325
     }
    ]
   },
   "pitch": -3,
   "hfov": 7.54,
   "yaw": 90.88
  }
 ],
 "id": "overlay_D5BA5D11_CD1D_3F6E_41BD_4C4140C6C63A",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.54,
   "yaw": 90.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -3
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9, this.camera_CAA20FCD_D82C_B7F1_41C8_90914F68181F); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 13.95,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47EC209_CD3D_257F_41B7_C3A88FD154C3",
   "pitch": -9.37,
   "yaw": -58.99,
   "distance": 100
  }
 ],
 "id": "overlay_DA7FC03C_CD13_2596_41E4_6944479945FB",
 "data": {
  "label": "Arrow 02b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 13.95,
   "yaw": -58.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -9.37
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D, this.camera_CA528FB6_D82C_B793_41DC_87829DD17EF2); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 14.35,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47E3209_CD3D_257F_41E2_CB9535BB0ED1",
   "pitch": -23.54,
   "yaw": 30.17,
   "distance": 100
  }
 ],
 "id": "overlay_FF5E42A2_CD17_2AB2_41B2_3577077EBD70",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.35,
   "yaw": 30.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -23.54
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C02819F3_CD15_6693_41E1_198D446E07D1, this.camera_C8712154_D82C_4897_41DC_A624EAAF8ACF); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 496,
      "height": 410
     }
    ]
   },
   "pitch": -21.76,
   "hfov": 11.86,
   "yaw": 93.09
  }
 ],
 "id": "overlay_EAE28105_CD13_6777_41E4_937F450979CA",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.86,
   "yaw": 93.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": -21.76
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69, this.camera_C87F7161_D82C_48B1_41D5_4E27684CDD3F); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 19.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F442F21C_CD3D_2595_41E4_961F6A186A00",
   "pitch": -23.64,
   "yaw": 178.66,
   "distance": 100
  }
 ],
 "id": "overlay_FFA8DEDA_CD37_7A92_41DD_345F3766ADB6",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 19.43,
   "yaw": 178.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -23.64
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D, this.camera_C8934DC8_D82C_BBFF_41C3_7FA9E9924939); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 14.3,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F479920A_CD3D_257D_41DA_05C2C57BE6C6",
   "pitch": -32.33,
   "yaw": -163.7,
   "distance": 50
  }
 ],
 "id": "overlay_D6C3BB32_CD15_DBAD_41D1_62F30CE5A327",
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.3,
   "yaw": -163.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -32.33
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 400,
      "height": 506
     }
    ]
   },
   "pitch": -3.69,
   "hfov": 10.27,
   "yaw": -115.57
  }
 ],
 "id": "overlay_D537CF20_CD14_FBAE_41BE_C6EA8E2D0290",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 10.27,
   "yaw": -115.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 20
     }
    ]
   },
   "pitch": -3.69
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007, this.camera_C8E6CDD5_D82C_BB91_41E1_27884E5F71E5); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 15.36,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F479320A_CD3D_257D_41E8_6FCC3D93E73A",
   "pitch": -29.5,
   "yaw": 1.1,
   "distance": 100
  }
 ],
 "id": "overlay_D4FF7358_CD17_2B9D_41DD_EEFFD4F51339",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.36,
   "yaw": 1.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -29.5
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA, this.camera_C88CBDBB_D82C_BB91_41E2_5E6D82891EA2); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 16.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F478B20A_CD3D_257D_41D5_E394041989B7",
   "pitch": -30.34,
   "yaw": 152.63,
   "distance": 50
  }
 ],
 "id": "overlay_D70A726A_CD13_25BD_419A_CF8591D41AEC",
 "data": {
  "label": "Arrow 05a Right-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.67,
   "yaw": 152.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ]
   },
   "pitch": -30.34
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_4_0.png",
      "class": "ImageResourceLevel",
      "width": 282,
      "height": 314
     }
    ]
   },
   "pitch": -3.93,
   "hfov": 7.26,
   "yaw": -58.65
  }
 ],
 "id": "overlay_D03D565E_CD0D_ED95_41E2_B8C41A02BE30",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.26,
   "yaw": -58.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -3.93
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0, this.camera_C8BA4DAE_D82C_BBB3_41DB_4D3CB88C7B53); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 12.13,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F478520A_CD3D_257D_41DF_7C8CDAF99AE7",
   "pitch": -17.91,
   "yaw": -16.41,
   "distance": 50
  }
 ],
 "id": "overlay_EDCE344A_CD0F_2DFD_41E8_C4474F6C927C",
 "data": {
  "label": "Arrow 05a Left"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.13,
   "yaw": -16.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ]
   },
   "pitch": -17.91
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405, this.camera_CA4CFF9E_D82C_B793_41E4_4F11B8698277); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 432,
      "height": 346
     }
    ]
   },
   "pitch": 0.58,
   "hfov": 11.12,
   "yaw": -73.39
  }
 ],
 "id": "overlay_D819B48B_CD13_2D73_41E0_4F94AEA0CC2B",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.12,
   "yaw": -73.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": 0.58
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA, this.camera_CA7C9F87_D82C_B871_41E3_082349D3ED16); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 29.96,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C33ECEA7_D72D_1D81_41E8_28A1B8B967CB",
   "pitch": -32.22,
   "yaw": 6.33,
   "distance": 50
  }
 ],
 "id": "overlay_D8619C63_CD15_5DB2_41DE_9C5F8BE22A48",
 "data": {
  "label": "Arrow 05c Right-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 29.96,
   "yaw": 6.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 44,
      "height": 16
     }
    ]
   },
   "pitch": -32.22
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C02686FD_CD15_2A96_41BF_099642BC426D, this.camera_CA6EAF6F_D82C_B8B1_41D1_600DA91EA38F); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 23.29,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F472E202_CD3D_256D_41D9_215AA3A11723",
   "pitch": -28.52,
   "yaw": -178.52,
   "distance": 100
  }
 ],
 "id": "overlay_FFCBD57B_CD1D_EF93_41DC_E84809498E98",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 23.29,
   "yaw": -178.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -28.52
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF, this.camera_C81B411F_D82C_4891_41D0_47C3EA68B207); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 20.36,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47CE208_CD3D_257D_41D4_8BA17A3F932C",
   "pitch": -30.73,
   "yaw": -3.56,
   "distance": 100
  }
 ],
 "id": "overlay_DA13B618_CD1C_ED9E_41BD_E15942AA3E9A",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 20.36,
   "yaw": -3.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -30.73
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C070220C_CD37_6576_41DA_FF4F7B3C3D93, this.camera_C866F12C_D82C_48B7_41D8_EA2B6B12034C); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 314,
      "height": 293
     }
    ]
   },
   "pitch": -3.81,
   "hfov": 8.08,
   "yaw": -58.26
  }
 ],
 "id": "overlay_DB405DB5_CD1D_3E97_41D7_93879D43059F",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 8.08,
   "yaw": -58.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -3.81
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 12.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47F8208_CD3D_257D_41D6_184DB51854D8",
   "pitch": -18.05,
   "yaw": 96.19,
   "distance": 100
  }
 ],
 "id": "overlay_FDFE9AFD_CD13_DA96_41E8_BCF36D0FA69A",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.79,
   "yaw": 96.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -18.05
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA, this.camera_C81CF112_D82C_4893_41EA_176232C81090); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 14.27,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47F0209_CD3D_257F_41D9_906412F2DED6",
   "pitch": -26.34,
   "yaw": 138.18,
   "distance": 100
  }
 ],
 "id": "overlay_FF0D9466_CD15_2DB5_41DD_8A2A223E5E28",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.27,
   "yaw": 138.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -26.34
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6, this.camera_CBBC70BC_D82C_4997_41E1_EB11CE28FC36); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 15.09,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_E3C2C23A_CD73_2592_41E6_D9D1C712A701",
   "pitch": -15.41,
   "yaw": -111.9,
   "distance": 100
  }
 ],
 "id": "overlay_C2761F01_CD17_3B6F_41E0_D4EA77D7B27E",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.09,
   "yaw": -111.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -15.41
  }
 ]
},
{
 "paddingLeft": 0,
 "id": "IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553",
 "width": 49,
 "iconURL": "skin/IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553.png",
 "maxWidth": 49,
 "right": 30,
 "maxHeight": 37,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "bottom": 8,
 "minHeight": 1,
 "borderRadius": 0,
 "mode": "push",
 "height": 37,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "rollOverIconURL": "skin/IconButton_AD0D57F8_BA53_6FC4_41D3_5EAE2CEEA553_rollover.png",
 "propagateClick": true,
 "class": "IconButton",
 "minWidth": 1,
 "borderSize": 0,
 "paddingTop": 0,
 "transparencyActive": true,
 "cursor": "hand",
 "data": {
  "name": "IconButton VR"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3, this.camera_C969EE4A_D82C_B8F3_41B9_AC24B6F1E90A); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 21.61,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F47611FF_CD3D_2693_41E8_3CB9737127D7",
   "pitch": -27.82,
   "yaw": 4.08,
   "distance": 100
  }
 ],
 "id": "overlay_DCD94C39_CDFC_DD9E_41E4_B020805A770F",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 21.61,
   "yaw": 4.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -27.82
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_DC61E73A_CD35_2B92_41E8_B023F2407848, this.camera_C9199E3D_D82C_B891_41E9_6DD1F7557BCC); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 17.28,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_FDDBCECC_CD13_3AF5_41D9_011CD594562E",
   "pitch": -24.62,
   "yaw": 177,
   "distance": 100
  }
 ],
 "id": "overlay_FFFB37EB_CD13_6AB3_41DD_14B05BA1E999",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 17.28,
   "yaw": 177,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -24.62
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0, this.camera_C9AD6E7E_D82C_B893_41D7_74DE0C23B7D5); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 731,
      "height": 549
     }
    ]
   },
   "pitch": -27.03,
   "hfov": 16.75,
   "yaw": 129.12
  }
 ],
 "id": "overlay_E82AF9A1_CD17_E6AE_41D7_C79DCD7172A3",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 16.75,
   "yaw": 129.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 21,
      "height": 16
     }
    ]
   },
   "pitch": -27.03
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9, this.camera_C9F7FEBE_D82C_B993_41E1_586A4A158629); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 15.39,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F44D621D_CD3D_2597_41D8_577DC0365F7B",
   "pitch": -20.18,
   "yaw": -146.34,
   "distance": 100
  }
 ],
 "id": "overlay_E7751B68_CD1C_DBBD_41DF_9453EBDF6F72",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 15.39,
   "yaw": -146.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -20.18
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2, this.camera_C9C74ECA_D82C_B9F3_41DD_77DEBA4F2EEC); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 18.34,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F44CE21D_CD3D_2597_4151_470DC102F8D2",
   "pitch": -35.7,
   "yaw": 113.7,
   "distance": 100
  }
 ],
 "id": "overlay_E02F87B4_CD1D_6A93_41E0_37842272FE3C",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 18.34,
   "yaw": 113.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -35.7
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878, this.camera_CA251EFE_D82C_B993_41C9_06444EF93E63); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 11.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4459211_CD3D_256F_41D3_CC8C04F2F45F",
   "pitch": -31.32,
   "yaw": -148.74,
   "distance": 50
  }
 ],
 "id": "overlay_EEB1052B_CD3D_EFB2_41D0_92351AA35E3D",
 "data": {
  "label": "Arrow 05a Right-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.57,
   "yaw": -148.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ]
   },
   "pitch": -31.32
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 272,
      "height": 357
     }
    ]
   },
   "pitch": -4.91,
   "hfov": 6.98,
   "yaw": -111.17
  }
 ],
 "id": "overlay_D2284119_CD3F_279F_41E2_46F354F401C6",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 6.98,
   "yaw": -111.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 21
     }
    ]
   },
   "pitch": -4.91
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2, this.camera_CA2BEF16_D82C_B893_41D6_01488030C9F9); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 11.51,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4453212_CD3D_256D_41DF_FFFEEDAAD411",
   "pitch": -31.81,
   "yaw": -23.75,
   "distance": 50
  }
 ],
 "id": "overlay_EFE23B61_CD3C_DBAF_41C3_83AC9B5A40BD",
 "data": {
  "label": "Arrow 05a Right-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.51,
   "yaw": -23.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ]
   },
   "pitch": -31.81
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007, this.camera_CA3B4F2E_D82C_B8B3_41C7_60DAEEF9BB71); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 20.94,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4448212_CD3D_256D_41D4_30929D47D878",
   "pitch": -35.13,
   "yaw": 176.81,
   "distance": 100
  }
 ],
 "id": "overlay_FFB1B509_CD0D_6F7F_41C1_8C992809860A",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 20.94,
   "yaw": 176.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -35.13
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C0734B22_CD35_5BAD_41E5_E7623BB7C652, this.camera_CB2AF047_D82C_48F1_41E6_FC6CA6933C95); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 506,
      "height": 570
     }
    ]
   },
   "pitch": -9.01,
   "hfov": 12.88,
   "yaw": 140.14
  }
 ],
 "id": "overlay_EC7E65C0_CD34_EEEE_41E1_A67A2B55D3BB",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 12.88,
   "yaw": 140.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 15,
      "height": 18
     }
    ]
   },
   "pitch": -9.01
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B, this.camera_CB3A0055_D82C_4891_419F_CAD0B2787A98); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 14.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4442213_CD3D_2593_41E7_BF1A8C7CB0A3",
   "pitch": -30.23,
   "yaw": 0.25,
   "distance": 100
  }
 ],
 "id": "overlay_EC9CA29B_CD37_2A93_41D1_C853CC2D47F0",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 14.77,
   "yaw": 0.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -30.23
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 432,
      "height": 357
     }
    ]
   },
   "pitch": -1.53,
   "hfov": 11.12,
   "yaw": -107.3
  }
 ],
 "id": "overlay_EC949294_CD37_6A96_41CF_06093517A25B",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 11.12,
   "yaw": -107.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 19,
      "height": 16
     }
    ]
   },
   "pitch": -1.53
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 304,
      "height": 282
     }
    ]
   },
   "pitch": -3.41,
   "hfov": 7.81,
   "yaw": 107.5
  }
 ],
 "id": "overlay_EE2031F8_CD35_269D_4193_7061083DD6AA",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.81,
   "yaw": 107.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -3.41
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 26.58,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2064ECC_D24C_FC1D_41D3_79CA12E43C60",
   "pitch": -18.33,
   "yaw": -0.31,
   "distance": 100
  }
 ],
 "id": "overlay_DCDC175D_CDF3_6B96_41CD_E0AD0E5D7774",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 26.58,
   "yaw": -0.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -18.33
  }
 ]
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6, this.camera_C981DE97_D82C_B991_41C7_116D471A8942); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "hfov": 26.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2062ECC_D24C_FC1D_41DD_35A8C7033864",
   "pitch": -36.22,
   "yaw": -152.53,
   "distance": 50
  }
 ],
 "id": "overlay_F9F4A938_CD0D_279D_41DB_9094DEF36E03",
 "data": {
  "label": "Arrow 02a Left-Up"
 },
 "rollOverDisplay": false,
 "enabledInCardboard": true,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 26.05,
   "yaw": -152.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -36.22
  }
 ]
},
{
 "gap": 10,
 "paddingLeft": 30,
 "scrollBarMargin": 2,
 "id": "Container_AD0DD7F8_BA53_6FC4_41DD_56889CF94F5F",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "width": 1199,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "horizontalAlign": "left",
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "bottom": "0%",
 "minHeight": 1,
 "borderRadius": 0,
 "height": 51,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "propagateClick": true,
 "class": "Container",
 "borderSize": 0,
 "overflow": "scroll",
 "data": {
  "name": "-button set container"
 },
 "paddingBottom": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "shadow": false
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_FF6D0116_CD13_6795_41E6_CC5CBA5A4A5A",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_FF6EB116_CD13_6795_41E5_A0B2801A1ED1",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C07C09BF_CD74_E693_41E8_F38ECDE533F2_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F47B920B_CD3D_2573_41E3_80F2EFA5779E",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 420
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F47B020B_CD3D_2573_4179_FE2F8CFB9ECA",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F47B320B_CD3D_2573_41E7_1717215E3755",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 420
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F47AA20B_CD3D_2573_41E8_6CE29BF16818",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C0732D5B_CD77_7F92_41D3_33CDEE35E007_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F4461214_CD3D_2595_41D4_8C0A6C847E60",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C017AEB8_CD1D_DA9D_41DF_D9260C82ED30_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F4713200_CD3D_256D_41D0_A58FAFECF048",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F4709200_CD3D_256D_41D9_57C228FDAAC8",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 420
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F470F200_CD3D_256D_41E3_2E06C75341AE",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C071C64A_CD15_6DF2_41E6_4BE2A26A927E_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F470E200_CD3D_256D_41E2_E8D7267AE78C",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C02DDEB2_CD15_DA93_41D7_EB6FAA551A4E_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F443421C_CD3D_2595_41A5_5997A50E0359",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C04EDD67_CD37_DFB3_41D1_09DF1C66DC69_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F4723202_CD3D_256D_41CF_4050E8427314",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F47DA202_CD3D_256D_41DB_A5102C1A2AEE",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F47D2202_CD3D_256D_41C4_4CFC23A388EB",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F47D7208_CD3D_257D_4181_A7AE1500829A",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C00CC558_CD17_EF9E_41DE_D0DDD359D6EA_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F447C212_CD3D_2592_41D0_33BD56893ABA",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C1BD1CFD_CD1D_3E97_4191_1A067FBC804D_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_E3C3123A_CD73_2592_41C3_3E29EFCA307D",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_E3C3F23B_CD73_2592_41C0_AD5629619316",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C09A0CF6_CD0D_DE95_41D8_0EA0DB58B2C6_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F44DB21C_CD3D_2595_41BF_E8215D5CD180",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F44D221D_CD3D_2597_41DD_B5A9AA911B06",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C31A2874_CD0F_6596_41C5_49F4D52A8CB9_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F4704201_CD3D_256F_41D1_2AB3CECBA269",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F473E201_CD3D_256F_41B3_E5AB74E1AFC2",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C02686FD_CD15_2A96_41BF_099642BC426D_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F47191FF_CD3D_2693_41DF_B3CE1C26AEF5",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F471D200_CD3D_256D_41E4_26387309BA6C",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C326A0DF_CD15_2692_41C8_AFF46B2B9ED3_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F4467215_CD3D_2597_41D9_B63441101347",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F440821A_CD3D_259D_41E5_C505484C67A7",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C06A6608_CD1D_2D7D_41D4_A547375F6878_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F47EC209_CD3D_257F_41B7_C3A88FD154C3",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F47E3209_CD3D_257F_41E2_CB9535BB0ED1",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C1CD6091_CD17_656F_41C4_CEC64891E1FF_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F442F21C_CD3D_2595_41E4_961F6A186A00",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C074E7E6_CD37_2AB5_41E4_3A2070CB5405_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F479920A_CD3D_257D_41DA_05C2C57BE6C6",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F479320A_CD3D_257D_41E8_6FCC3D93E73A",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F478B20A_CD3D_257D_41D5_E394041989B7",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F478520A_CD3D_257D_41DF_7C8CDAF99AE7",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C3A4F437_CD77_2D93_41D1_1677C0ABAD4B_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 720,
   "height": 420
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_C33ECEA7_D72D_1D81_41E8_28A1B8B967CB",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F472E202_CD3D_256D_41D9_215AA3A11723",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C02819F3_CD15_6693_41E1_198D446E07D1_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F47CE208_CD3D_257D_41D4_8BA17A3F932C",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F47F8208_CD3D_257D_41D6_184DB51854D8",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F47F0209_CD3D_257F_41D9_906412F2DED6",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C1CF01D7_CD17_2693_41D5_641EE2ADFC3D_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_E3C2C23A_CD73_2592_41E6_D9D1C712A701",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C396E8BA_CD13_E69D_41B9_97455311D726_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F47611FF_CD3D_2693_41E8_3CB9737127D7",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_FDDBCECC_CD13_3AF5_41D9_011CD594562E",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C01B2672_CD35_2DAD_41DE_B519B7245D0C_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F44D621D_CD3D_2597_41D8_577DC0365F7B",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F44CE21D_CD3D_2597_4151_470DC102F8D2",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C002F321_CD0F_2BAF_41E3_65BBB6A90B18_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F4459211_CD3D_256F_41D3_CC8C04F2F45F",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_F4453212_CD3D_256D_41DF_FFFEEDAAD411",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F4448212_CD3D_256D_41D4_30929D47D878",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C0740378_CD77_2B9E_41BC_9786E4648FBB_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_F4442213_CD3D_2593_41E7_BF1A8C7CB0A3",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C06F1799_CD1D_6A9F_41C4_635703313CA0_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_C2064ECC_D24C_FC1D_41D3_79CA12E43C60",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_C2062ECC_D24C_FC1D_41DD_35A8C7033864",
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_DC61E73A_CD35_2B92_41E8_B023F2407848_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 400,
   "height": 360
  }
 ]
}],
 "mouseWheelEnabled": true,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "desktopMipmappingEnabled": false,
 "overflow": "visible",
 "data": {
  "name": "Player460"
 },
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
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
