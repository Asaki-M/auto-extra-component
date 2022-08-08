#!/usr/bin/env node

import prompts from 'prompts'

async function init() {
  let result: {
    componentImportProject?: string
    componentExportProject?: string
  } = {}

  try {
    result = await prompts([
      {
        name: 'componentImportProject',
        type: 'text',
        message: 'The component entry path that needs to be imported: '
      },
      {
        name: 'componentExportProject',
        type: 'text',
        message: 'The component export path that needs to be exported: '
      }
    ])
  } catch (cancelled) {
    console.log(cancelled.message)
    process.exit(1)
  }
  console.log(result)
}

init().catch((e) => {
  console.error(e)
})
