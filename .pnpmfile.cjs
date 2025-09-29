// .pnpmfile.cjs
module.exports = {
  hooks: {
    readPackage(pkg, _context) {
      // Configuraciones específicas de paquetes si son necesarias
      return pkg
    }
  }
}