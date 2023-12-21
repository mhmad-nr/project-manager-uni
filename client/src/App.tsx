import { Suspense } from 'react';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AppRoute from './route';
import { ReduxProvider } from './redux/store';



function App() {

  return (
    <Suspense fallback={<Loading />}>
      <ReduxProvider>

        <AppRoute />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ReduxProvider>
    </Suspense>

  )
}

export default App

const Loading = () => {
  return (
    <div>Loading...</div>
  )
}