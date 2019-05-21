const compose = (...fns) =>
    fns.reduceRight((prevFn, nextFn) =>
            (...args) => nextFn(prevFn(...args)),
        value => value
    )

const sortAuthoritiesToLetter = authorities => {
    return authorities.reduce(
        (accum, name) => {
            const letter = name[0]
            const arrByLetter = accum[letter]
            return arrByLetter ?
                {...accum, [letter]: [...arrByLetter, {name:name,checked:false}]} :
                {...accum, [letter]: [{name:name,checked:false}]}
        },
        {}
    )
}

const sortByName = (names) => {
    return [...names].sort((a, b) => {
        return (a.name < b.name) ? -1 : 1
    })
}

export const sortByAlphabet = compose(
    sortAuthoritiesToLetter,
    sortByName
)