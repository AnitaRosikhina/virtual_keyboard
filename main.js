const CODES_NOT_INPUT_BUTTONS = ['ShiftLeft', 'ShiftRight', 'Enter', 'Backspace', 'CapsLock', 'Tab']

const ALL_BUTTONS_SYMBOLS_WITHOUT_SHIFT = Array.from(document.querySelectorAll('.key')).map(el => el.textContent)
const ALL_BUTTONS_SYMBOLS_WITH_SHIFT = Array.from(document.querySelectorAll('.key[data-shift-value]')).map(el => el.attributes['data-shift-value'].value)

const ALL_BUTTONS_SYMBOLS = [...ALL_BUTTONS_SYMBOLS_WITHOUT_SHIFT, ...ALL_BUTTONS_SYMBOLS_WITH_SHIFT]

document.addEventListener('keydown', e => {
    if (e.getModifierState('CapsLock')) {
        document.querySelector('.caps-lock').classList.add('a')
    } else {
        document.querySelector('.caps-lock').classList.remove('a')
    }
    if (e.key === 'Tab') {
        e.preventDefault()
        document.querySelector(`.key[data-key-code='Tab']`).classList.add('a')
    }
    if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
        document.querySelector(`.key[data-key-code='${e.code}']`).classList.add('a')
    } else if (ALL_BUTTONS_SYMBOLS.find(el => el === e.key.toLocaleLowerCase()) && !CODES_NOT_INPUT_BUTTONS.find(el => el === e.code)) {
        const btn = getBtn(e.key)
        btn.classList.add('a')
        document.querySelector('textarea').value += e.key
    }
    if (e.code === 'Backspace') {
        getBtn('Backspace').classList.add('a')
        document.querySelector('textarea').value = document.querySelector('textarea').value.slice(0, -1)
    }
    if (e.code === 'Enter') {
        getBtn('Enter').classList.add('a')
        document.querySelector('textarea').value += `\n`
    }
})
document.addEventListener('keyup', e => {
    if (e.key === 'Tab') {
        document.querySelector(`.key[data-key-code='Tab']`).classList.remove('a')
    }
    if (e.code === 'Backspace') {
        getBtn('Backspace').classList.remove('a')
    }
    if (e.code === 'Enter') {
        getBtn('Enter').classList.remove('a')
    }
    if (e.code === 'ShiftRight' || e.code === 'ShiftLeft') {
        document.querySelector(`.key[data-key-code='${e.code}']`).classList.remove('a')
    } else if (ALL_BUTTONS_SYMBOLS.find(el => el === e.key.toLocaleLowerCase()) && !CODES_NOT_INPUT_BUTTONS.find(el => el === e.code)) {
        const btn = getBtn(e.key)
        btn.classList.remove('a')
    }
})

function getBtn(key) {
    return Array.from(document.querySelectorAll('.key'))
           .find(el => el.textContent === key || el.textContent === key.toLocaleLowerCase())
           || document.querySelector(`.key[data-shift-value='${key}']`)
}