function createTableName() {
    const date = new Date()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${month}-${year}`
}

module.exports = {
    createTableName
};
