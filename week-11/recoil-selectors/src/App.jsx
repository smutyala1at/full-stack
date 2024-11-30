import {notificationsAtom, totalNotificationSelector} from "./store/atoms/linkedinAtoms"
import {useRecoilValue, RecoilRoot} from "recoil"

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  )
}

function MainApp(){

  const notifications = useRecoilValue(notificationsAtom);
  const totalCount = useRecoilValue(totalNotificationSelector)

  return (
    <div>
      <div><button>Home</button></div>
      <div><button>My network ({notifications.network >= 100 ? "99+" : notifications.network})</button></div>
      <div><button>Jobs ({notifications.jobs})</button></div>
      <div><button>Messaging ({notifications.messages})</button></div>
      <div><button>Notifications ({notifications.notifications})</button></div>
      <div><button>Me ({totalCount})</button></div>
    </div>
  )
}

export default App
