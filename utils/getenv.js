export default {
    "caesarshift": process.env.PERSONALSECRET_CAESAR_SHIFT || 5,
    "processor": process.env.PERSONALSECRET_PROCESSOR || 0b00000001,
    "sqlite-filepath": process.env.PERSONALSECRET_SQLITE_FILEPATH || "~/.config/secret-man/sqlite.db",
}