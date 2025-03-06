
export function capitalizeFirst(text) {
    if(text.length > 0 && typeof text == 'string') {
        return text.substring(0,1).toUpperCase() + text.substring(1, text.length)
    }
    else {
        return ''
    }

}

export function separateHyphens(text) {
    if(text.includes('-')) {
        let tmp = text.indexOf('-')
        return capitalizeFirst(text.substring(0, tmp)) + " " + capitalizeFirst(text.substring(tmp+1, text.legnth))
    }
    else {
        return capitalizeFirst(text)
    }
}

export function getEnglishFlavorText(flavor_text_array) {
    for(let text of flavor_text_array){
        if(text.language.name == 'en') {
            return text.text
        }
    }
    return 'No english flavor text'
}

export function togglePlay(audio, setPlaying, playing) {
    if (playing) {
      audio.current.pause();

    } else {
      audio.current.play();

    }
    setPlaying(!playing);
}
