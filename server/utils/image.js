const getFilePath = (file) => {
    const filePath = file.path;
    const fileSplit = filePath.split("/")

    // Obtiene la ruta relativa a './uploads/profile'
    const fileRelativePath = fileSplit.slice(-2).join("/");

    return fileRelativePath;
}
module.exports = {
    getFilePath
}