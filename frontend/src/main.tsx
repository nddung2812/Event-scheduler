import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './providers/api'

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
