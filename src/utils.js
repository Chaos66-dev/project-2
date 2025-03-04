
export function capitalizeFirst(text) {
    if(text.length > 0 && typeof text == 'string') {
        return text.substring(0,1).toUpperCase() + text.substring(1, text.length)
    }
    else {
        return ''
    }

}

export function seperateHypens(text) {
    if(text.includes('-')) {
        let tmp = text.indexOf('-')
    }
}