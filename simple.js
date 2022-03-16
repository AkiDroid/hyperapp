const SSR_NODE = 1
const TEXT_NODE = 3
const EMPTY_OBJ = {}
const EMPTY_ARR = []
const map = [].map
const isArray = Array.isArray

const recycleNode = (node) => {
  node.nodeType === TEXT_NODE
    ? text(node.nodeValue, node)
    : createVNode(node.nodeName.toLowerCase(), EMPTY_OBJ, map.call(node.childNodes, recycleNode), SSR_NODE, node)
}

const patchProperty = () => {
  // TODO
}

const createNode = () => {
  // TODO
}

const patch = (parent, node, oldVNode, newVNode, listner) => {
  // TODO
}

const createVNode = (tag, props, children, type, node) => ({
  tag,
  props,
  key: props.key,
  children,
  type,
  node,
})

export var memo = (tag, memo) => ({ tag, memo })

export var text = (value, node) => createVNode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node)

export var h = (tag, props, children = EMPTY_ARR) => createVNode(tag, props, isArray(children) ? children : [children])

export const app = ({ node, view, init }) => {
  var vdom = node && recycleNode(node)
  var state
  var busy

  const update = (newState) => {
    if (state !== newState) {
      state = newState
      if (view && !busy) {
        busy = true
        setTimeout(render)
      }
    }
  }

  const render = () => {
    busy = false
    node = patch(node.parentNode, node, vdom, (vdom = view(state)), listener)
  }

  const listener = function (event) {
    dispatch(this.events[event.type], event)
  }

  const dispatch = (action) => {
    typeof action === 'function' ? dispatch(action()) : update(action)
  }

  dispatch(init)
  return dispatch
}
