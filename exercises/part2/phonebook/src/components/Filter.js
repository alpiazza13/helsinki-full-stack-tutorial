import React from 'react'

const Filter = ({ text, handler }) => <div> search: <input value={text} onChange={handler}/> </div>

export default Filter
