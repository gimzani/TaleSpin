
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCog,
  faDatabase,
  faEdit,
  faHandPointer,
  faLock,
  faMinus,
  faPlus,
  faPowerOff,
  faSave,
  faSearch,
  faSeedling,
  faTimes,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  install(Vue) {
    library.add(
      faAngleDoubleLeft,
      faAngleDoubleRight,
      faAngleLeft,
      faAngleRight,
      faChevronDown,
      faChevronLeft,
      faChevronRight,
      faChevronUp,
      faCog,
      faDatabase,
      faEdit,
      faHandPointer,
      faLock,
      faMinus,
      faPlus,
      faPowerOff,
      faSave,
      faSearch,
      faSeedling,
      faTimes,
      faUser
    );
    Vue.component('font-awesome-icon', FontAwesomeIcon);
  }
}
