import vine from '@vinejs/vine'


export const registerValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3),
        email: vine.string().email(),
        password: vine.string().minLength(8),
    })
)