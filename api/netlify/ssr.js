
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { build } from 'esbuild'

const scriptPath = resolve(__dirname, '../../../dist/build/main.js')
const templatePath = resolve(__dirname, '../../../dist/__app.html')
const bundlePath = resolve(__dirname, '../build/bundle.js')

await build({ entryPoints: [scriptPath], outfile: bundlePath, bundle: true })

const bundle = {
    date: new Date,
    script: readFileSync(bundlePath, 'utf8'),
    template: readFileSync(templatePath, 'utf8')
}

const { script, template } = bundle

import { tossr } from 'tossr'

exports.handler = async (event, context) => {
    const qs = Object.entries(event.queryStringParameters)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    const body = await tossr(template, script, `${event.path}?${qs}`);
    return { statusCode: 200, body: body + '\n<!--ssr rendered-->' }
}
