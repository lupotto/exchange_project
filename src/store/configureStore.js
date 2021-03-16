import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()
const middleware = []

//For redux dev tools
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose

export default function configureStore(preLoadedState){
  return createStore(
    rootReducer,
    preLoadedState,
    composeEnhancers(applyMiddleware(...middleware, loggerMiddleware))
  )
}
