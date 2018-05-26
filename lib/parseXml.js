import { DOMParser } from 'xmldom'
import xpath from 'xpath'
import attributesMap from './attributesMap'

function getNodeValue (doc, path) {
    const nodes = xpath.select(path, doc)
    if (nodes && nodes[0]) {
        return '' + nodes[0].textContent.trim()
    }
    return undefined
}

function getAttributes (doc) {
    output = {}
    const nodes = xpath.select('/outArgs/arg-xml/response/attrib_list/attribute', doc)
    nodes.forEach(node => {
        let key = xpath.select('id', node)
        let value = xpath.select('value', node)
        if (key && value && key[0] && value[0]) {
            key = parseInt(key[0].textContent.trim())
            value = '' + value[0].textContent.trim()
            if (attributesMap[key]) {
                output[attributesMap[key]] = value
            }
        }
    })
    return output
}

export default function (data) {
    var doc = new DOMParser().parseFromString(data)
    const output = {}

    const modelNumber = getNodeValue('/outArgs/arg-xml/modelnumber')
    const serialNumber = getNodeValue('/outArgs/arg-xml/modelnumber')
    if (modelNumber !== undefined) output['RMD_ATTR_MODEL_NUMBER'] = modelNumber
    if (serialNumber !== undefined) output['RMD_ATTR_MODEL_NUMBER'] = serialNumber

    return {...output, ...getAttributes(doc)}
}
