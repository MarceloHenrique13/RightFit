function titleize (text ) {
    text = text.charAt(0).toUpperCase() + text.slice(1)
  
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === ' ') {
        const charToUper = text.charAt(i + 1).toUpperCase()
        const sliceBegin = text.slice(0, (i + 1))
        const sliceEnd = text.slice(i + 2)
  
        text = sliceBegin + charToUper + sliceEnd
      }
    }
    return text
  }