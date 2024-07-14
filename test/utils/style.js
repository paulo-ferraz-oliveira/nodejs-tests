const colors = {
  green: '[32m',
  red: '[31m',
  cyan: '[36m',
  white: '[37m',
}

const styles = {
  bold: '[1m',
  bright: '[37;1m',
}

function color(code) {
  code = colors[code]
  return function (text, options) {
    text = `\x1b${code}${text}\x1b[0m`

    options = options || {}
    if (options.bold) {
      text = bold(text)
    }
    if (options.bright) {
      text = bright(text)
    }

    return text
  }
}

function style(code) {
  code = styles[code]
  return function (text) {
    return `\u001b${code}${text}\u001b[0m`
  }
}

function bold(text) {
  return style('bold')(text)
}

function bright(text) {
  return style('bright')(text)
}

module.exports = {
  cyan: color('cyan'),
  green: color('green'),
  red: color('red'),
  white: color('white'),
}
