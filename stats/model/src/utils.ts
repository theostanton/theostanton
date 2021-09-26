import {v4 as uuidv4} from 'uuid';

export function id(prefix: string | undefined = undefined): string {
    const uuid = uuidv4().substr(0, 8);
    if (prefix) {

        if (prefix.match(/[^a-zA-Z_]+/)) {
            throw new Error(`prefix must be letters + underscores only. Unlike ${prefix}`)
        }

        return `${prefix.toLowerCase()}_${uuid}`
    } else {
        return uuid
    }
}