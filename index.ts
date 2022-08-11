#!/usr/bin/env node

import prompts from 'prompts'
import fs from 'node:fs/promises'
import path from 'node:path'

async function getAliasFromConfig(configPath) {
  const config = await import(configPath)
  // get alias configs
  const alias = config['alias']
  if (!!alias && !!Object.keys(alias).length) {
    console.error('Can not find alias config.')
    process.exit(1)
  }
  return alias
}

async function getLocalImport(aliasConfig, exportComponentPath: string) {
  const componentContentStr = (await fs.readFile(path.resolve(exportComponentPath))).toString()
  const importPaths = componentContentStr
    .split('\n')
    .filter((item) => item.indexOf('import') !== -1)
  const localImport = []
  importPaths.forEach((item) => {
    const [importName, importPath] = item.split('import')[1].split('from')
    // compare aliasConfig has importPath, push it importName and importPath to a object in localImport
  })
}

async function init() {
  let inputPath: {
    importProject: string
    exportProject: string
    exportComponentPath: string
  }

  try {
    inputPath = await prompts([
      {
        name: 'importProject',
        type: 'text',
        message: 'The project path where the components needs to be imported: '
      },
      {
        name: 'exportProject',
        type: 'text',
        message: 'The project config path where the components needs to be exported: '
      },
      {
        name: 'exportComponentPath',
        type: 'text',
        message: 'The component entry path that needs to be exported: '
      }
    ])
    const importAliasConfig = getAliasFromConfig(inputPath.importProject)
  } catch (cancelled) {
    console.log(cancelled.message)
    process.exit(1)
  }
}

init().catch((e) => {
  console.error(e)
})
