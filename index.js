const { createStore, applyMiddleware } = require("redux");
const { delayActionMiddlewares, fetchTodosMiddleware } = require("./middlewares")
const { fetchTodos } = require('./fuctions')

// initial state
const initialState = {
   todos: []
}

// todos reducer 

const todoReducer = (state = initialState, action) => {

   switch (action.type) {
      case "todos/todoAdded":

         return {
            ...state,
            todos: [
               state.todos,
               {
                  title: action.payload,
               }
            ]
         }

      case "todos/todoLoaded":
         return {
            ...state,
            todos: [...state.todos, ...action.payload]
         }

      default:
         break;
   }

}

const store = createStore(todoReducer, applyMiddleware(delayActionMiddlewares, fetchTodosMiddleware))

store.subscribe(() => {
   console.log(store.getState())
   // console.log("abc")
})

// store.dispatch({
//    type: "todos/todoAdded",
//    payload: "Learn Redux"
// });



store.dispatch(fetchTodos);
