import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./taildwind.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/service-worker.js")
}
