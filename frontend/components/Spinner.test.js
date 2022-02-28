import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Spinner from './Spinner'


// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
test('sanity', () => {
  expect(true).toBe(false)
})


// test('Check to see that the spinner renders props true', async () => {
//   const spinnerValue = true
//   render(<Spinner on={spinnerValue}/>)
//   const spinner = screen.getByText('please wait...',{exact:false})
//   await waitFor(() => {
//     expect(spinner).toBeInTheDocument()
//   })
// })



// test('Check to see that the spinner renders with a false props', async () => {
//   const spinnerValue = false
//   render(<Spinner on={spinnerValue}/>)
//   const spinner = screen.queryByText(/please wait.../i)
//   await waitFor(() => {
//     expect(spinner).toBeNull()
//   })
// })