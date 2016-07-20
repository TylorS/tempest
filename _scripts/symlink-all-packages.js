// node requires
const { join } = require('path')
const fs = require('fs')

// package requires
const mkdirp = require('mkdirp')
const symlink = require('symlink-or-copy').sync

// constants
const TEMPEST_DIR=process.cwd()
const PACKAGE_DIR=join(TEMPEST_DIR, 'packages')
const PACKAGES=getDirectories(PACKAGE_DIR)

console.log('Attempting to symlink dependencies of the following packages:')
PACKAGES.forEach(package => console.log(`@tempest/${package}`))
console.log(' ')

PACKAGES.forEach(package => {
  // constants per package
  const CURRENT_PACKAGE_DIR = join(PACKAGE_DIR, package)
  const NODE_MODULES = join(CURRENT_PACKAGE_DIR, 'node_modules')
  const TEMPEST_NODEMODULE_DIR = join(NODE_MODULES, '@tempest')
  const PACKAGEJSON = require(join(CURRENT_PACKAGE_DIR, 'package.json'))
  const DEPENDENCIES = Object.keys(PACKAGEJSON.dependencies)
  const DEVDEPENDENCIES = Object.keys(PACKAGEJSON.devDependencies)

  console.log(`> ${package} :`)

  // make the node_modules directory if it doesn't exist
  makeDir(NODE_MODULES)

  function symlinkDependencies (dependency) {
    // if its a package contained in this monorepo
    if (dependency.indexOf('@tempest') >= 0) {
      // get the 'foo' from @tempest/foo
      const DEP_NAME = strip(dependency)

      // make node_modules/@tempest dir
      makeDir(TEMPEST_NODEMODULE_DIR)

      // the directory we'd like to symlink
      const TARGET = join(TEMPEST_NODEMODULE_DIR, DEP_NAME)

      // only symlink if it doesn't already exist
      try {
        if (isSymbolicLink(TARGET) || isDirectory(TARGET)) {
          console.log(`  - symlink to ${dependency} already exists!`)
        }
      } catch (e) {
        console.log(`  - symlinking to ${dependency}`)
        const PACKAGE_TO_SYMLINK = join(PACKAGE_DIR, DEP_NAME) 
        symlink(PACKAGE_TO_SYMLINK, TARGET, 'dir')
      }
    }
  }

  DEPENDENCIES.forEach(symlinkDependencies)
  DEVDEPENDENCIES.forEach(symlinkDependencies)
})

function getDirectories (path) {
  return fs.readdirSync(path).filter(isDirectoryIn(path))
}

function isDirectoryIn (path) {
  return function isDirectory (dir) {
    return fs.statSync(join(path, dir)).isDirectory()
  }
}

function isDirectory (path) {
  return fs.statSync(path).isDirectory()
}

function isSymbolicLink (path) {
  return fs.lstatSync(path).isSymbolicLink()
}

function makeDir (path) {
  mkdirp(path, (err) => {
    if (err) throw err
  })
}

function strip (dependency) {
  return dependency.replace('@tempest/', '').trim()
}