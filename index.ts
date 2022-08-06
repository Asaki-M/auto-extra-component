#!/usr/bin/env node

import prompts from 'prompts'
(async () => {
  const res = await prompts({
    type: 'number',
    name: 'value',
    message: 'input a number: '
  })
  console.log(res)
})()
