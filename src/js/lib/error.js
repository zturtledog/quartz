export function error(title, message) {
    // console.log(typeof message)
    message = message.replaceAll("\n", "\n    ")

    {//colorize
        let recordingstring = false
        let prstr = false
        let endpoint = ""
        for (let i = 0; i < message.length; i++) {
            if (message.charAt(i) == "'" || message.charAt(i) == '"') {
                if (recordingstring) {
                    endpoint += message.charAt(i)
                    endpoint += "\x1b[0m"
                    recordingstring = false
                } else {
                    endpoint += "\x1b[34m"
                    recordingstring = true
                    endpoint += message.charAt(i)
                }
            }
            if (!iiil("1234567890", message.charAt(i))) {
                if (i + 1 < message.length && iiil("1234567890", message.charAt(i + 1))) {
                    endpoint += "\x1b[33m"
                }
                if (i - 1 > -1 && iiil("1234567890", message.charAt(i - 1))) {
                    endpoint += "\x1b[0m"
                }
            }
            if (prstr == recordingstring)
                endpoint += message.charAt(i)

            prstr = recordingstring
        }
        message = endpoint;
    }

    console.error("\x1b[1m\x1b[31m" + title + "\x1b[0m\n  " + message + "\x1b[0m")
}

export function iiil(l, c) {
    for (let i = 0; i < l.length; i++) {
        if (l.charAt(i) == c) {
            return true
        }
    }
    return false
}