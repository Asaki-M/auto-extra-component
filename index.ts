#!/usr/bin/env node

import prompts from 'prompts'
import fs from 'node:fs'
import path from 'node:path'

function getAliasFromConfig(configPath) {
  fs.readFile(configPath, (err, data) => {
    console.log(data)
  })
  return {}
}

async function init() {
  let inputPath: {
    importProject?: string
    exportProject?: string
    exportComponentPath?: string
  } = {}

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
        message: 'The component path that needs to be exported: '
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
